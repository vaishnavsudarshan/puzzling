// Cloudflare Worker — grades a student's free-response answer with Google Gemini (free tier).
// Paste this into a new Worker in the Cloudflare dashboard, then add an encrypted
// variable named GEMINI_KEY (your Google AI Studio key). See grader/README.md.
//
// Cost: $0. Runs on Cloudflare's free plan and Gemini's free tier. When the daily
// free quota is hit, it returns 429 and the site falls back to "submitted for grading".

const ALLOWED_ORIGINS = ["https://vaishnavs.net", "http://localhost:8788"];
const MODEL = "gemini-2.0-flash";
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

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST") return json({ error: "POST only" }, 405, origin);
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return json({ error: "forbidden origin" }, 403, origin);

    let body;
    try { body = await request.json(); } catch { return json({ error: "bad json" }, 400, origin); }

    const question = String(body.question || "").slice(0, CAP);
    const rubric   = String(body.rubric   || "").slice(0, CAP);
    const answer   = String(body.answer   || "").trim().slice(0, CAP);
    const maxPoints = Math.max(1, Math.min(100, parseInt(body.maxPoints, 10) || 10));
    if (!answer) return json({ error: "empty answer" }, 400, origin);
    if (!env.GEMINI_KEY) return json({ error: "grader not configured" }, 500, origin);

    const prompt =
`You are grading a student's answer to a problem. Follow the author's grading instructions exactly and fairly.

PROBLEM:
${question}

GRADING INSTRUCTIONS (from the problem's author):
${rubric}

STUDENT'S ANSWER:
${answer}

Give an integer score from 0 to ${maxPoints}, then one or two sentences of feedback addressed to the student ("you..."). Do not reveal a full model solution. Respond as JSON.`;

    const gReq = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { score: { type: "INTEGER" }, feedback: { type: "STRING" } },
          required: ["score", "feedback"],
        },
      },
    };

    let gRes;
    try {
      gRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_KEY}`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(gReq) }
      );
    } catch { return json({ error: "grader_unreachable" }, 502, origin); }

    if (gRes.status === 429) return json({ error: "quota_exceeded" }, 429, origin); // daily free limit
    if (!gRes.ok) return json({ error: "grader_error", status: gRes.status }, 502, origin);

    let data; try { data = await gRes.json(); } catch { return json({ error: "grader_parse" }, 502, origin); }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let parsed; try { parsed = JSON.parse(text); } catch { return json({ error: "grader_parse" }, 502, origin); }

    let score = Math.round(Number(parsed.score));
    if (!Number.isFinite(score)) score = 0;
    score = Math.max(0, Math.min(maxPoints, score));
    const feedback = String(parsed.feedback || "").slice(0, 600);
    return json({ score, max: maxPoints, feedback }, 200, origin);
  },
};
