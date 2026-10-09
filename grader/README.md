# AI grader (free — Cloudflare Workers AI)

This folder holds the serverless function that grades free-response / proof answers.
It runs entirely on **Cloudflare Workers AI** — $0, no credit card, and **no external API
key** (the AI is built into Cloudflare). When the daily free quota is used up it returns 429
and the site falls back to "submitted for grading". It can never cost money.

## One-time setup (all in the Cloudflare dashboard — no terminal, no other accounts)

1. **Create a free Cloudflare account** — https://dash.cloudflare.com → sign up (no card).

2. **Create the Worker**
   - **Workers & Pages** → **Create** → **Create Worker** → name it `puzzling-grader` → **Deploy**.
   - Click **Edit code**, select-all and delete, paste the contents of `worker.js`, then **Deploy**.

3. **Add the AI binding** (this is what gives the Worker access to Cloudflare's AI)
   - On the Worker → **Settings** → **Bindings** → **Add** → **Workers AI**.
   - Variable name must be exactly **`AI`** → **Save / Deploy**.

4. **Copy the Worker URL** (looks like `https://puzzling-grader.<your-subdomain>.workers.dev`)
   and send it to Claude. Claude wires it into the site and adds the `type: ai` problem format.

Notes
- No Google/Gemini account needed — this uses Cloudflare's own Llama model.
- If `@cf/meta/llama-3.3-70b-instruct-fp8-fast` ever errors as unavailable, change `MODEL`
  near the top of `worker.js` to `@cf/meta/llama-3.1-8b-instruct` and redeploy.

## How an AI-graded problem is authored (after wiring)

```markdown
### Prove that the sum of any two even numbers is even.
type: ai
points: 10
grade: |
  Full credit requires: representing two even numbers algebraically (a = 2m, b = 2n),
  computing a + b = 2(m + n), and concluding it is even because (m + n) is an integer.
  Give partial credit for the right idea with algebra slips. Be lenient about notation.
```

The `### …` line is shown to the student; `type: ai` gives them a text box; `grade:` is your
rubric, sent to the AI with their answer. They get a score + one line of feedback.
