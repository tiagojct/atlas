// Zettelkasten note graph data. Reads the note corpus in src/zettel/, builds the
// resolver map (used by the markdown-it wikilink plugin via globalThis.__zettelIdMap)
// and the backlinks map. Notes have NO id — the filename IS the title; the canonical
// key/URL is slugify(filename). Eleventy evaluates global _data before templates
// render, so the map exists before any markdown body is processed.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import matter from "gray-matter";
import { slugify } from "../../lib/slug.js";
import { maturity as normMaturity } from "../../lib/maturity.js";

const NOTAS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "atlas");

function extractLinks(body) {
  const links = [];
  const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = re.exec(body)) !== null) links.push(m[1].trim());
  return links;
}

// external markdown links [label](http...) in the body, deduped by URL — fed to
// the note's "Continuar a explorar" sidebar.
function extractExternal(body) {
  const out = [], seen = new Set();
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const url = m[2].trim();
    if (seen.has(url)) continue;
    seen.add(url);
    out.push({ label: m[1].replace(/[*_`]/g, "").trim(), url });
  }
  return out;
}

export default function () {
  if (!existsSync(NOTAS_DIR)) return { notas: [], backlinksMap: {}, idMap: {} };

  const notas = readdirSync(NOTAS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(readFileSync(join(NOTAS_DIR, file), "utf8"));
      const fileSlug = file.replace(/\.md$/, "");
      const slug = slugify(fileSlug);
      return {
        fileSlug,
        slug,
        id: slug, // `id` kept as an alias of slug for templates/graph
        title: data.title || fileSlug,
        date: data.date || null,
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        draft: data.draft === true,
        maturity: normMaturity(data.maturity),
        aliases: Array.isArray(data.aliases) ? data.aliases : data.aliases ? [data.aliases] : [],
        // links = inline [[wikilinks]] + curated `related:` front-matter targets
        links: [...new Set([
          ...extractLinks(content),
          ...(Array.isArray(data.related) ? data.related.map((s) => String(s).trim()) : []),
        ])],
        externalLinks: extractExternal(content),
      };
    })
    .filter((n) => !n.draft)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  // Resolver map: filename (= title), slug, exact title and aliases all -> {title, slug}
  const idMap = {};
  notas.forEach((n) => {
    const target = { title: n.title, slug: n.slug };
    idMap[n.fileSlug] = target;
    idMap[n.slug] = target;
    if (!idMap[n.title]) idMap[n.title] = target;
    n.aliases.forEach((a) => { if (!idMap[a]) idMap[a] = target; });
  });
  globalThis.__zettelIdMap = idMap;

  const backlinksMap = {};
  notas.forEach((n) => { backlinksMap[n.slug] = []; });
  notas.forEach((source) => {
    source.links.forEach((targetRaw) => {
      const resolved = idMap[targetRaw];
      if (!resolved) return;
      const key = resolved.slug;
      if (backlinksMap[key] && !backlinksMap[key].some((bl) => bl.id === source.slug)) {
        backlinksMap[key].push({ id: source.slug, title: source.title, date: source.date, maturity: source.maturity });
      }
    });
  });

  return { notas, backlinksMap, idMap };
}
