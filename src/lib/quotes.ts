/* Short, calm break-time quotes. Picked at random when the coffee break opens. */
export const BREAK_QUOTES: Array<{ text: string; author: string }> = [
  { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
  { text: "Rest is not idleness, and to lie sometimes in the grass on a summer's day is by no means a waste of time.", author: "John Lubbock" },
  { text: "Take rest; a field that has rested gives a bountiful crop.", author: "Ovid" },
  { text: "Sometimes the most productive thing you can do is step away.", author: "Unknown" },
  { text: "You can't pour from an empty cup. Take a moment to refill.", author: "Unknown" },
  { text: "Quiet the mind, and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
  { text: "A short rest sharpens a long focus.", author: "WORKO" },
];

export function randomQuote() {
  return BREAK_QUOTES[(Math.random() * BREAK_QUOTES.length) | 0];
}
