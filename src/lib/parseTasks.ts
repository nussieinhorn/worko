/* Turns pasted multi-line text into clean task titles. Handles bullet lists
   (-, *, +, •, …), numbered lists (1. / 1)), and checkboxes ([ ], [x]).
   Blank lines are dropped; surrounding list markers are stripped. */
export function parseTaskLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^\s+/, "")
        .replace(/^[-*+•·‣◦▪▸–—]\s+/, "") // bullet markers
        .replace(/^\d+[.)]\s+/, "") // "1." or "1)"
        .replace(/^\[[ xX]?\]\s*/, "") // "[ ]" / "[x]" checkboxes
        .trim(),
    )
    .filter((line) => line.length > 0);
}

/** True when the pasted text resolves to more than one task. */
export function isMultiTaskPaste(text: string): boolean {
  return parseTaskLines(text).length > 1;
}
