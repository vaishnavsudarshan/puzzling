# AI grader (free — Cloudflare Worker + Google Gemini)

This folder holds the serverless function that grades free-response / proof answers.
It runs on **Cloudflare Workers (free)** and calls **Google Gemini (free tier)** — $0,
no credit card. When the daily free quota is used up it returns 429 and the site falls
back to "submitted for grading" (it can never cost money).

## One-time setup (all in web dashboards — no terminal needed)

1. **Get a free Gemini API key**
   - Go to https://aistudio.google.com → **Get API key** → create one. Free, no card. Copy it.

2. **Create a free Cloudflare account**
   - https://dash.cloudflare.com → sign up. Free, no card.

3. **Create the Worker**
   - Dashboard → **Workers & Pages** → **Create** → **Create Worker**.
   - Name it `puzzling-grader` → **Deploy** (makes a hello-world).
   - Click **Edit code**, delete what's there, paste the contents of `worker.js`, then **Deploy**.

4. **Add your Gemini key as a secret**
   - On the Worker's page → **Settings** → **Variables and Secrets** → **Add**.
   - Type **Secret**, name it exactly **`GEMINI_KEY`**, value = the key from step 1 → **Deploy**.

5. **Copy the Worker URL** (looks like `https://puzzling-grader.<your-subdomain>.workers.dev`)
   and send it to Claude. Claude wires it into the site and adds the `type: ai` problem format.

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
rubric, sent to Gemini with their answer. They get a score + one line of feedback.
