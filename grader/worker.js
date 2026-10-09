// Cloudflare Worker — grades a student's free-response answer using Cloudflare Workers AI.
// $0: runs on Cloudflare's free plan with its built-in AI. NO external API key.
// Setup: paste into a new Worker, then add a "Workers AI" binding named exactly  AI
// (Worker → Settings → Bindings → Add → Workers AI). See grader/README.md.
//
// When the daily free AI quota is used up, run() errors and this returns 429, so the
// site falls back to "submitted for grading". It can never cost money.

const ALLOWED_ORIGINS = ["https://vaishnavs.net", "http://localhost:8788"];
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast"; // swap to "@cf/meta/llama-3.1-8b-instruct" if unavailable
const CAP = 4000; // max chars per field

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}
function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors(origin) },
  });
}
function extractJson(text) {
  if (!text) return null;
  let t = String(text).replace(/```json/gi, "").replace(/```/g, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a >= 0 && b > a) t = t.slice(a, b + 1);
  try { return JSON.parse(t); } catch { return null; }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST") return json({ error: "POST only" }, 405, origin);
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: "forbidden origin" }, 403, origin);

    let body;
    try { body = await request.json(); } catch { return json({ error: "bad json" }, 400, origin); }

    const question  = String(body.question || "").slice(0, CAP);
    const rubric    = String(body.rubric   || "").slice(0, CAP);
    const answer    = String(body.answer   || "").trim().slice(0, CAP);
    const maxPoints = Math.max(1, Math.min(100, parseInt(body.maxPoints, 10) || 10));
    if (!answer) return json({ error: "empty answer" }, 400, origin);
    if (!env.AI) return json({ error: "grader not configured" }, 500, origin);

    const system =
`You are a fair grader. Follow the author's grading instructions exactly. Do not reveal a full model solution.
Respond with ONLY JSON of the form {"score": <integer 0 to ${maxPoints}>, "feedback": "<one or two sentences to the student>"}.`;
    const user =
`PROBLEM:
${question}

GRADING INSTRUCTIONS (from the problem's author):
${rubric}

STUDENT'S ANSWER:
${answer}`;

    let out;
    try {
      out = await env.AI.run(MODEL, {
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.2,
        max_tokens: 400,
      });
    } catch (e) {
      const msg = String((e && e.message) || "");
      if (/capacity|limit|quota|429|rate/i.test(msg)) return json({ error: "quota_exceeded" }, 429, origin);
      return json({ error: "grader_error" }, 502, origin);
    }

    const text = (out && (out.response ?? out.result ?? out.text ?? "")) || "";
    const parsed = extractJson(text);
    let score, feedback;
    if (parsed && Number.isFinite(Number(parsed.score))) {
      score = Math.round(Number(parsed.score));
      feedback = String(parsed.feedback || "");
    } else {
      // best-effort fallback if the model didn't return clean JSON
      const m = String(text).match(/(\d+)\s*(?:\/|out of)\s*\d+/i) || String(text).match(/score["\s:]+(\d+)/i);
      if (!m) return json({ error: "grader_parse",
        _shape: (out && typeof out === "object") ? Object.keys(out) : typeof out,
        _text: String(text).slice(0, 500),
        _out: JSON.stringify(out).slice(0, 500) }, 502, origin);
      score = parseInt(m[1], 10);
      feedback = String(text).slice(0, 600);
    }
    score = Math.max(0, Math.min(maxPoints, score || 0));
    feedback = feedback.slice(0, 600);
    return json({ score, max: maxPoints, feedback }, 200, origin);
  },
};
