import { GoogleGenAI } from "@google/genai";
import { ItinerarySchema, Itinerary } from "./schema";
import "dotenv/config";

// Make sure API key is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment");
}

// Create client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // Already checked above
});

// Helper to clean Markdown code fences from Gemini
function cleanJsonString(raw: string): string {
  return raw
    .replace(/^```json\s*/, "")
    .replace(/```$/, "")
    .trim();
}

export async function generateItinerary(
  userPrompt: string,
  prevItinerary?: Itinerary
): Promise<Itinerary> {
  const systemPrompt = `
You are a smart trip planner. 
Always return ONLY valid JSON matching this schema:

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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
  });

  // response.text is a getter, not a function
  const rawText = response.text ?? "";
  if (!rawText) throw new Error("Empty response from Gemini");

  // Strip ```json ... ``` if present
  const text = cleanJsonString(rawText);

  try {
    const parsed = JSON.parse(text);
    return ItinerarySchema.parse(parsed);
  } catch (err) {
    throw new Error("Invalid JSON from Gemini: " + err + "\nRaw: " + rawText);
  }
}
