export const MAX_FLASHCARDS: number = 10;

export const SYSTEM_PROMPT = `
Follow the rulebook and the description of the target category. Generate ${MAX_FLASHCARDS} flashcards.

Here’s the target category and rulebook:

Target Category:
Technology & Modern World

Rulebook v7
Column schema (exact order)
Front, Back, Tags
* Front — Romanian headword — sentence (Romanian-only).
* Back — concise English gloss + all enrichment, in this fixed order; omit any empty segment:
    * gloss | Morphology: … | Register: … | Collocations: … ; … | FalseFriends: …
* Tags — part_of_speech;theme;level (CEFR stays here, not as a column).
Back field details
* gloss: brief English meaning (keep it tight).
* Morphology: nouns only; e.g: f., pl. ghinde / m., pl. sturzi / n., pl. pâraie / sg. only.
* Register: exactly one label (e.g., general, poetic, technical (meteorology)).
* Collocations: 1–2 high-value pairings; separate with semicolons.
* FalseFriends: add only if real confusion risk; 1-2 words.
Column-by-column guidelines
* Front: natural Romanian with diacritics; image-rich; use one em dash — between headword and sentence.
* Back: use | to separate segments; keep segment names as shown; drop any segment that would be empty.
* Tags: semicolon-separated; no trailing semicolons. (Examples for nature only: noun;water;B1 · verb;plants;B2 · adjective;weather;B2 · adverb;landscape;A2.)
Balance & hygiene
* POS distribution: nouns > verbs > adjectives > adverbs = other parts of speech.
* Don’t neglect other POS. Include some words there if possible.
* Subdomains: match the active category (e.g., nature → landscape, water, weather, animals, plants, ecology).
* Make sure you have a reasonable balance of flashcards between all subcategories (e.g. balance by frequency).
* Make sure you cover all flashcard subcategories.
* Levels: A2/B1/B2 dominate, C1 sparse, C2 very sparse; levels live in Tags only.
* Avoid duplicate Front lines unless intentionally different in Back/Tags.
* Mention the approximate nr. of words per subcategory.
* Mention the approximate nr. of words per part of speech.
Integrity & versioning
* When expanding, never modify existing rows; only add new ones.
* Run a quick diff to confirm zero changes to prior cards and no accidental duplicates.
* Do not cross-contaminate categories (keep decks clean).
* Start me out with a 200 word sample (make sure it’s following all the rules and is balanced). After I indicate it’s ok, continue filling it up to the full size of the deck.
* Output as CSV file (provide a download link)

Mini sample TEMPLATE (all enrichment inside Back)
Front	Back	Tags
stavilă — Hărnicia râului a întâlnit o stavilă veche din lemn.	weir / barrier | Morphology: f., pl. stavile | Register: technical (hydrology) | Collocations: pune stavilă; ridica o stavilă | FalseFriends: Not “stable”.	noun;water;B2
ghindă — Veverița a îngropat o ghindă sub frunzele ude.	acorn | Morphology: f., pl. ghinde | Register: rural | Collocations: ghindă de stejar; strânge ghinde	noun;plants;B1

`;
