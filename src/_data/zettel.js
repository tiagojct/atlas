// Zettelkasten note graph data. Reads the note corpus in src/zettel/,
// builds the id->{title,slug} map (used by the markdown-it wikilink plugin via
// globalThis.__zettelIdMap) and the backlinks map. Eleventy evaluates global
// _data before templates render, so the idMap exists before any markdown body
// is processed.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import matter from "gray-matter";

const NOTAS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "zettel");

function extractLinks(body) {
  const links = [];
  const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let m;
  while ((m = re.exec(body)) !== null) links.push(m[1].trim());
  return links;
}

export default function () {
  if (!existsSync(NOTAS_DIR)) return { notas: [], backlinksMap: {}, idMap: {} };

  const notas = readdirSync(NOTAS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(readFileSync(join(NOTAS_DIR, file), "utf8"));
      return {
        fileSlug: file.replace(/\.md$/, ""),
        id: data.id || file.replace(/\.md$/, ""),
        title: data.title || data.id || file.replace(/\.md$/, ""),
        date: data.date || null,
        tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
        draft: data.draft === true,
        maturity: data.maturity || "seedling",
        aliases: Array.isArray(data.aliases) ? data.aliases : data.aliases ? [data.aliases] : [],
        links: extractLinks(content),
      };
    })
    .filter((n) => !n.draft)
    .sort((a, b) => String(b.id).localeCompare(String(a.id)));

  const idMap = {};
  notas.forEach((n) => {
    idMap[n.id] = { title: n.title, slug: n.id };
    idMap[n.fileSlug] = { title: n.title, slug: n.id };
    n.aliases.forEach((a) => { if (!idMap[a]) idMap[a] = { title: n.title, slug: n.id }; });
  });
  globalThis.__zettelIdMap = idMap;

  const backlinksMap = {};
  notas.forEach((n) => { backlinksMap[n.id] = []; });
  notas.forEach((source) => {
    source.links.forEach((targetId) => {
      const resolved = idMap[targetId];
      if (!resolved) return;
      const key = resolved.slug;
      if (backlinksMap[key] && !backlinksMap[key].some((bl) => bl.id === source.id)) {
        backlinksMap[key].push({ id: source.id, title: source.title, date: source.date, maturity: source.maturity });
      }
    });
  });

  return { notas, backlinksMap, idMap };
}
