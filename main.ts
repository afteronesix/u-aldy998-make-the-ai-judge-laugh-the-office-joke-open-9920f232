import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One office joke for "Make the AI Judge Laugh: the Office Joke Open":
// ask IT for a second monitor, get a second ticket number instead.
// The misdirection pays off in the last two words, the detail (a ticket
// number) is specific to office life, and at 69 characters no word is
// wasted — exactly what the judge's brief rewards.
const LINE =
  "I asked IT for a second monitor. They gave me a second ticket number.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-200 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`joke fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-200) and ties break on
// fewer bytes, so the entry is exactly the joke, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
