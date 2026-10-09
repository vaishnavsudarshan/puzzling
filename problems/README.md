# Writing puzzles

Each puzzle is one Markdown file in `problems/<section>/<topic>/<name>.md`.
Add or edit a file, commit, and push — a GitHub Action rebuilds the site
automatically (about a minute later it's live at vaishnavs.net/puzzling).

- **section**: `puzzling` (linguistics) or `training` (AI)
- **topic**: an id from `sections.json` (e.g. `sound`, `order`, `ai-nlp`, `ai-neural`)

## File format

```markdown
---
id: my-unique-id
title: My Puzzle Title
section: puzzling
topic: sound
difficulty: easy        # easy | medium | hard
order: 1                # optional — controls order within a topic
---

The first paragraph is the intro. Write as many paragraphs as you like.

> A line starting with > becomes a highlighted note.

Fenced code blocks become monospace data boxes:

```
some code
or a data table
```

Markdown tables work too:

| A | B |
| --- | --- |
| 1 | 2 |

## Questions

### This heading is a multiple-choice question
- [ ] a wrong option
- [x] the correct option        (mark the right answer with [x])
- [ ] another wrong option

### This is a fill-in question
= accepted answer | another accepted spelling
<!-- use "=" for forgiving matching, "==" for an exact match -->

### This is a matching question
- left item => its correct match
- another left => its match
<!-- the site scrambles the right column automatically -->

### A question can show a formula or code above the answer box
```formula
f(x) = x^2 + 1
```
== 42

### This is an AI-graded (free-response / proof) question
type: ai
grade: |
  Write, as if to an AI grader, how to grade the student's answer. Describe what earns full
  credit, what earns partial credit, and what earns none. Be specific and lenient about wording.
```

## Notes

- `id` must be unique and never change once people have solved it (scores are keyed on it).
- **AI-graded (`type: ai`)** questions give the student a text box; their answer is scored by
  an AI against your `grade:` rubric (0 up to the puzzle's difficulty value — Easy 5 / Med 10 /
  Hard 15), with one submission. Good for short free-response and explanations. Avoid it for
  anything needing *exact* formal checking (grammar derivations, precise parsing) — use the
  deterministic types or code for those.
- Grammar / code-graded puzzles (like "Sentence Trades") need a custom validator,
  so they live in `index.html`, not here.
- To preview locally you don't need anything installed — just push and let the Action build it.
