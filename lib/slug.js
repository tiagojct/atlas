// Shared slug: lowercase, strip diacritics, drop non-word chars, spaces -> hyphens.
// Used by the wikilink rule / topicSlug filter (eleventy.config.js), the note
// index (src/_data/zettel.js) and per-note permalinks (zettel.11tydata.js) so the
// URL of a note is one deterministic function of its filename (= its title).
export function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default slugify;
