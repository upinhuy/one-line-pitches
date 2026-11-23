// One-Line Pitches — writes a single-sentence pitch to /output/entry.txt.
// Pure Node.js stdlib, no dependencies, no network, no file reads.
// The pitch speaks to a friend who has never coded: plain words, a concrete
// reason to say yes now, and an honest, low-risk promise.
import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "Just describe the app idea you've been carrying around in plain words on make.fun, and an AI agent will build it for you \u2014 free to try, and you can walk away any time if it isn't right.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;
const MAX_CHARS = 240;

function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (/\s{2,}/.test(text)) {
    throw new Error("entry must not contain repeated whitespace");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must be one sentence ending with a period");
  }
  const sentenceEnders = (text.match(/[.!?](?=\s|$)/g) ?? []).length;
  if (sentenceEnders !== 1) {
    throw new Error(`entry must be exactly one sentence, found ${sentenceEnders} sentence enders`);
  }
}

validate(PITCH);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, PITCH, "utf8");
console.log(
  `Wrote ${[...PITCH].length} characters (${Buffer.byteLength(PITCH, "utf8")} bytes) to ${OUT_FILE}`,
);
