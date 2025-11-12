import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({ apiKey });

export default async function generateFlashcards(theme: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Explain how ${theme} works in a few words`,
  });

  const text = response.text;
  if (!text) {
    throw new Error("Gemini API did not return any text content");
  }
  return text;
}

console.log(await generateFlashcards("cows"))