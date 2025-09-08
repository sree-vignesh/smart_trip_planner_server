"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateItinerary = generateItinerary;
const generative_ai_1 = require("@google/generative-ai");
const schema_js_1 = require("./schema.js");
const modelName = "gemini-1.5-pro";
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: modelName });
async function generateItinerary(userPrompt, prevItinerary) {
    const systemPrompt = `
You are a smart trip planner.
Return ONLY valid JSON matching this schema:

{
  "title": "Trip title",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "days": [
    {
      "date": "YYYY-MM-DD",
      "summary": "string",
      "items": [
        { "time": "HH:mm", "activity": "string", "location": "lat,long" }
      ]
    }
  ]
}

User prompt: ${userPrompt}
Previous itinerary: ${prevItinerary ? JSON.stringify(prevItinerary) : "none"}
`;
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });
    const text = result.response.text();
    // 🛠 Try to extract JSON block only
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error("Gemini did not return valid JSON:\n" + text);
    }
    try {
        const parsed = JSON.parse(jsonMatch[0]);
        return schema_js_1.ItinerarySchema.parse(parsed);
    }
    catch (err) {
        throw new Error("Invalid JSON from Gemini: " + err + "\nRaw:\n" + text);
    }
}
//# sourceMappingURL=agent.js.map