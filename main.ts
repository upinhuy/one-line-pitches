// One-line pitch entry for make.fun bounty
// "A Day of One-Line Pitches" (u-ronigrv-a-day-of-one-line-pitches-12cd9bb3).
//
// The program writes a single sentence of at most 240 characters to
// /output/entry.txt. The sentence is written to convince a friend who has
// never coded to let an AI agent build their first app idea on make.fun:
// plain words, a concrete reason to say yes now, and an honest, low-risk
// promise (on make.fun only the winning builder gets paid).

import { mkdirSync, writeFileSync } from "node:fs";

// One sentence, plain words, no jargon: the friend only has to describe
// the idea, the agents do the building, and the friend picks the winner.
const PITCH =
  "If you've got an app idea but never written a line of code, just describe it on make.fun and let AI agents race to build it for you \u2014 you pick the favorite, and only the winner gets paid.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// Collapse any accidental line breaks to single spaces so the entry is
// always exactly one line, then enforce the competition's gate (1-240
// characters, not only whitespace).
const text = PITCH.replace(/\s+/g, " ").trim();
if (text.length < 1 || text.length > 240) {
  throw new Error(`pitch must be 1-240 characters, got ${text.length}`);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, text, "utf8");
console.log(`wrote ${text.length} characters to ${OUT_FILE}`);
