// Builds puzzles.js from the markdown files in problems/.
// Zero dependencies — runs on any Node 18+ (including GitHub Actions runners).
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ============================================================
   parseProblem(text) -> puzzle object
   This function is pure (string in, object out) so the exact same
   logic can be unit-tested in a browser console. Keep it dependency-free.
   ============================================================ */
export function parseProblem(text, fileLabel = '') {
  text = text.replace(/\r\n/g, '\n');
  // ---- frontmatter ----
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta = {};
  let rest = text;
  if (fm) {
    for (const line of fm[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    rest = text.slice(fm[0].length);
  }
  const required = ['id', 'title', 'section', 'topic', 'difficulty'];
  for (const k of required) if (!meta[k]) throw new Error(`${fileLabel}: missing frontmatter "${k}"`);

  // ---- split body / questions ----
  const lines = rest.split('\n');
  let qStart = lines.findIndex(l => /^##\s+questions\s*$/i.test(l.trim()));
  const bodyLines = qStart === -1 ? lines : lines.slice(0, qStart);
  const questionLines = qStart === -1 ? [] : lines.slice(qStart + 1);

  const body = parseBlocks(bodyLines, true);
  const items = parseQuestions(questionLines, fileLabel);

  const DIFF = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  const diff = DIFF[meta.difficulty.toLowerCase()];
  if (!diff) throw new Error(`${fileLabel}: difficulty must be easy/medium/hard`);

  const out = {
    id: meta.id, topic: meta.topic, title: meta.title, diff,
    order: meta.order ? Number(meta.order) : 100,
    body, items,
  };
  return { section: meta.section, puzzle: out };
}

// Parse a run of markdown lines into body blocks. If isBody, the first
// paragraph becomes a "lead" block; later ones are "text".
function parseBlocks(lines, isBody) {
  const blocks = [];
  let para = [];
  let seenLead = false;
  const flushPara = () => {
    if (!para.length) return;
    const textVal = para.join(' ').trim();
    if (textVal) {
      const type = (isBody && !seenLead) ? 'lead' : 'text';
      if (type === 'lead') seenLead = true;
      blocks.push({ type, text: textVal });
    }
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const t = line.trim();
    // fenced block
    const fence = t.match(/^```(.*)$/);
    if (fence) {
      flushPara();
      const info = fence[1].trim().toLowerCase();
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) { buf.push(lines[i]); i++; }
      if (info === 'formula') blocks.push({ type: 'formula', tex: buf.join('\n').trim() });
      else blocks.push({ type: 'data', lines: buf });
      continue;
    }
    // blockquote -> note
    if (t.startsWith('>')) {
      flushPara();
      const buf = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, '')); i++;
      }
      i--;
      blocks.push({ type: 'note', text: buf.join(' ').trim() });
      continue;
    }
    // table (header row followed by a |---| separator)
    if (t.includes('|') && i + 1 < lines.length && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1]) && lines[i + 1].includes('-')) {
      flushPara();
      const splitRow = r => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) { rows.push(splitRow(lines[i])); i++; }
      i--;
      blocks.push({ type: 'table', head, rows });
      continue;
    }
    if (!t) { flushPara(); continue; }
    para.push(t);
  }
  flushPara();
  return blocks;
}

function parseQuestions(lines, fileLabel) {
  // split into chunks at "### "
  const chunks = [];
  let cur = null;
  for (const line of lines) {
    const h = line.match(/^###\s+(.*)$/);
    if (h) { cur = { q: h[1].replace(/^Q:\s*/i, '').trim(), rest: [] }; chunks.push(cur); }
    else if (cur) cur.rest.push(line);
  }
  return chunks.map(c => parseItem(c, fileLabel));
}

function parseItem(chunk, fileLabel) {
  const { q, rest } = chunk;
  const pre = [];
  const choices = [];
  const matches = [];
  let fill = null;
  for (let i = 0; i < rest.length; i++) {
    const line = rest[i];
    const t = line.trim();
    if (!t) continue;
    const fence = t.match(/^```(.*)$/);
    if (fence) {
      const info = fence[1].trim().toLowerCase();
      const buf = [];
      i++;
      while (i < rest.length && !rest[i].trim().startsWith('```')) { buf.push(rest[i]); i++; }
      if (info === 'formula') pre.push({ type: 'formula', tex: buf.join('\n').trim() });
      else pre.push({ type: 'data', lines: buf });
      continue;
    }
    const choice = t.match(/^-\s*\[( |x|X)\]\s+(.*)$/);
    if (choice) { choices.push({ text: choice[2].trim(), correct: choice[1].toLowerCase() === 'x' }); continue; }
    const match = t.match(/^-\s+(.*?)\s*=>\s*(.*)$/);
    if (match) { matches.push({ left: match[1].trim(), right: match[2].trim() }); continue; }
    const f = t.match(/^(==?)\s*(.*)$/);
    if (f) { fill = { strict: f[1] === '==', answers: f[2].split('|').map(s => s.trim()).filter(Boolean) }; continue; }
  }
  const item = { q };
  if (pre.length) item.pre = pre;
  if (choices.length) {
    item.type = 'choice';
    item.options = choices.map(c => c.text);
    item.answer = choices.findIndex(c => c.correct);
    if (item.answer < 0) throw new Error(`${fileLabel}: choice "${q}" has no correct option ([x])`);
  } else if (matches.length) {
    item.type = 'match';
    item.left = matches.map(m => m.left);
    const rights = matches.map(m => m.right);
    const display = [...rights].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    item.right = display;
    item.answer = rights.map(r => display.indexOf(r));
  } else if (fill) {
    item.type = 'fill';
    item.a = fill.answers.join('|');
    if (fill.strict) item.strict = 'exact';
  } else {
    throw new Error(`${fileLabel}: question "${q}" has no answer (need [x] options, => matches, or an = answer line)`);
  }
  return item;
}

/* ============================================================
   Node-only: walk problems/, build PUZZLE_DATA, write puzzles.js
   ============================================================ */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function main() {
  const sections = JSON.parse(readFileSync(join(ROOT, 'sections.json'), 'utf8'));
  const data = {};
  for (const [sid, s] of Object.entries(sections)) data[sid] = { hero: s.hero, topics: s.topics, puzzles: [] };

  const files = walk(join(ROOT, 'problems'));
  for (const file of files) {
    const label = file.slice(ROOT.length + 1);
    const { section, puzzle } = parseProblem(readFileSync(file, 'utf8'), label);
    if (!data[section]) throw new Error(`${label}: unknown section "${section}"`);
    if (!data[section].topics.some(t => t.id === puzzle.topic)) throw new Error(`${label}: unknown topic "${puzzle.topic}" for section ${section}`);
    data[section].puzzles.push(puzzle);
  }

  // order puzzles by topic order, then explicit order, then title
  for (const [sid, s] of Object.entries(data)) {
    const topicIdx = Object.fromEntries(s.topics.map((t, i) => [t.id, i]));
    s.puzzles.sort((a, b) =>
      (topicIdx[a.topic] - topicIdx[b.topic]) || (a.order - b.order) || a.title.localeCompare(b.title));
    s.puzzles.forEach(p => delete p.order);
  }

  const banner = '// AUTO-GENERATED from problems/*.md by scripts/build.mjs — do not edit by hand.\n';
  writeFileSync(join(ROOT, 'puzzles.js'), banner + 'window.PUZZLE_DATA = ' + JSON.stringify(data, null, 2) + ';\n');
  const count = Object.values(data).reduce((n, s) => n + s.puzzles.length, 0);
  console.log(`Built puzzles.js — ${count} puzzles from ${files.length} markdown files.`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('build.mjs')) main();
