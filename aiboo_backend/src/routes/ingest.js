const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.MISTRAL_API_KEY,
  baseURL: "https://api.mistral.ai/v1"
});

router.post("/event", async (req, res) => {
  try {
    const eventData = req.body;
    console.log("EVENT RECEIVED:", eventData);

    // ---------------- SEND TO LLM ----------------
    const prompt = `
You are an AI that must ALWAYS return VALID JSON ONLY.
No explanations. No markdown. No code fences. No backticks.
Return ONLY raw JSON and nothing else.

Analyze this Windows process creation event:

${JSON.stringify(eventData, null, 2)}

Respond ONLY with valid JSON in this exact structure:
{
  "severity": "safe | moderate | risky | critical",
  "summary": "short explanation of behavior",
  "reason": "why you classified it this way"
}
    `;

    const response = await client.chat.completions.create({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    let raw = response.choices[0].message.content;

    // Cleanup if model uses markdown
    raw = raw
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch {
      analysis = {
        severity: "unknown",
        summary: raw,
        reason: "Model returned non-JSON output"
      };
    }

    console.log("LLM ANALYSIS:", analysis);

    // ---------------- SAVE TO DB ----------------
    await Event.create({
      agent_id: eventData.agent_id,
      event_type: eventData.event_type,
      data: eventData.data,
      severity: analysis.severity,
      summary: analysis.summary,
      reason: analysis.reason
    });

    res.json({ status: "ok", analysis });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ status: "error", error });
  }
});

module.exports = router;
