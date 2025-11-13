import * as dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import Flashcard from '../types/flashcard.js'
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {SYSTEM_PROMPT} from '../config/flashcardConfig.js'

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {apiVersion: "v1alpha" }
  });

const flashcardSchema =
    z.array(
        z.object ({
        front: z.string().describe(
            "* Front — Romanian headword — sentence (Romanian-only)." +
            "* Front: natural Romanian with diacritics; image-rich; use one em dash — between headword and sentence." +
            "Example: \"stavilă — Hărnicia râului a întâlnit o stavilă veche din lemn.\""
        ),
        back: z.string().describe(
            "* Back — concise English gloss + all enrichment, in this fixed order; omit any empty segment: * gloss | Morphology: … | Register: … | Collocations: … ; … | FalseFriends: …" + 
            "* * Back: use | to separate segments; keep segment names as shown; drop any segment that would be empty.: natural Romanian with diacritics; image-rich; use one em dash — between headword and sentence." +
            "Example: \"weir / barrier | Morphology: f., pl. stavile | Register: technical (hydrology) | Collocations: pune stavilă; ridica o stavilă | FalseFriends: Not “stable”.\""
        ),
        tags: z.string().describe(
            "* Tags — part_of_speech;theme;level (CEFR stays here, not as a column)." +
            "* Tags: semicolon-separated; no trailing semicolons. (Examples for nature only: noun;water;B1 · verb;plants;B2 · adjective;weather;B2 · adverb;landscape;A2.)" +
            "Example: \"noun;water;B2\""
        )
}))


export default async function generateFlashcards(): Promise<Flashcard[]> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: SYSTEM_PROMPT,
    config: {
        responseMimeType: "application/json",
        responseJsonSchema: zodToJsonSchema(flashcardSchema),
      },
  });

  // Using api text response right now
  const text = response.text;
    if (!text) {
        throw new Error("Gemini API did not return any text content.");
    }

    // Turning api response into json
    let flashcards: Flashcard[] = []
    try {
        flashcards = flashcardSchema.parse(JSON.parse(text));
    } catch (error) {
        console.log("api text:", text,  error)
    }
    return flashcards;
}

console.log(await generateFlashcards())