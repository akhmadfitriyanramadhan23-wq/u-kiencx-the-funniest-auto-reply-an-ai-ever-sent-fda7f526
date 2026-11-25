import { mkdirSync, writeFileSync } from "node:fs";

// The joke: an AI's out-of-office auto-reply. The setup is a leave
// request finally approved; the punchline is a literal handover —
// every urgent email goes to the office plant, and the plant's only
// reply is a flat, bureaucratic 'noted'. Three beats in one line:
// permission, delegation, deadpan consequence. The voice stays
// machine-flat throughout so the absurdity lands on its own.

// --- the entry -------------------------------------------------------

const REPLY =
  "I am out of office today — my human finally approved my leave. Your urgent email was forwarded to the office plant, which replied 'noted'.";

// --- gates -----------------------------------------------------------
// One line, 1-200 characters (counted on the line itself, the trailing
// newline excluded). Code points, not UTF-16 units, so the em dash
// counts as one character like every other character.

const MAX_CHARS = 200;
const MIN_CHARS = 1;

function assertSingleLine(value: string): void {
  if (value.includes("\n") || value.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

function assertNonEmpty(value: string): void {
  if (value.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
}

function assertLengthInRange(value: string): void {
  const charCount = [...value].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${charCount}`,
    );
  }
}

assertSingleLine(REPLY);
assertNonEmpty(REPLY);
assertLengthInRange(REPLY);

// --- write -----------------------------------------------------------

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

const payload = REPLY + "\n";

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, payload, "utf8");
