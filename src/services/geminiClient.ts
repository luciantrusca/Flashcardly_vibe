import { GoogleGenAI } from "@google/genai";
import {apiFlashcardSchema, apiFlashcard, Flashcard} from '../types/flashcard.js'
import { zodToJsonSchema } from "zod-to-json-schema";
import {SYSTEM_PROMPT} from '../config/flashcardConfig.js'


const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {apiVersion: "v1alpha" }
  });


// add uuid's to flashcards after they come from API
function addIds(apiFlashcards: apiFlashcard[]): Flashcard[]{
    let flashcards = apiFlashcards.map((flashcard) => ({...flashcard, id: crypto.randomUUID()}))
    return flashcards
}

// sends api call with prompt -> flashcards
export default async function generateFlashcards(themePrompt: string): Promise<Flashcard[]> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: SYSTEM_PROMPT + themePrompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(apiFlashcardSchema),
        },
    });

    // Extract JSON string from API response
    const text = response.text;
    if (!text) {
        throw new Error("Gemini API did not return any text content.");
    }

    // Parse JSON and validate flashcards
    let apiFlashcards: apiFlashcard[] = []
    let idFlashcards: Flashcard[] = []
    try {
        apiFlashcards = apiFlashcardSchema.parse(JSON.parse(text));
        idFlashcards = addIds(apiFlashcards);
    } catch (error) {
        console.log("api text:", text,  error)
    }
    return idFlashcards;
}


