const QUOTES = [
  "Small steps still move the needle.",
  "Done is better than perfect.",
  "Clear list, clear head.",
  "Start with the task you're avoiding.",
  "One thing at a time, all the way through.",
  "Progress hides in the boring tasks.",
  "You don't need motivation, just the next step.",
  "Cross one off before you add another.",
];

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
