// Normalize a note's maturity. The front matter uses numbers (1/2/3, 3 = highest)
// because they're quick to type; the rest of the site works in the canonical
// names. Accepts numbers, numeric strings, the legacy names, or nothing.
const MAP = { "1": "seedling", "2": "budding", "3": "evergreen" };
const NAMES = new Set(["seedling", "budding", "evergreen"]);

export function maturity(v) {
  const s = String(v ?? "").trim();
  return MAP[s] || (NAMES.has(s) ? s : "seedling");
}

export default maturity;
