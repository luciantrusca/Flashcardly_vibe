// export default interface Flashcard {
//   id: string;
//   front: string;
//   back: string;
//   tags: string;
//   }
import { z } from "zod";


export const apiFlashcardSchema =
  z.array(
      z.object ({
      id: z.string().uuid(),
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

export type Flashcard = z.infer<typeof apiFlashcardSchema>[0]; // [0] gets the array element type
