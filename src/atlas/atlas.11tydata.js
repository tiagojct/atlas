// Dados por nota no Atlas. Cada src/zettel/*.md gera uma página em /<slug>/,
// onde slug = slugify(nome-do-ficheiro) e o nome do ficheiro É o título.
import { slugify } from "../../lib/slug.js";
import { maturity as normMaturity } from "../../lib/maturity.js";

export default {
  layout: "layouts/zettel-note.njk",
  pagefind: true,
  eleventyComputed: {
    maturity: (data) => normMaturity(data.maturity),
    title: (data) => data.title || data.page.fileSlug,
    slug: (data) => slugify(data.page.fileSlug),
    permalink: (data) => (data.draft ? false : `/${slugify(data.page.fileSlug)}/`),
    backlinks: (data) => (data.zettel?.backlinksMap || {})[slugify(data.page.fileSlug)] || [],
    linkedNotes: (data) => {
      const arr = data.zettel?.notas || [];
      const sl = slugify(data.page.fileSlug);
      const current = arr.find((n) => n.slug === sl);
      if (!current) return [];
      const seen = new Set();
      return current.links
        .map((lid) => {
          const r = data.zettel?.idMap?.[lid];
          return r ? arr.find((n) => n.slug === r.slug) || null : null;
        })
        .filter((n) => n && n.slug !== sl && !seen.has(n.slug) && seen.add(n.slug));
    },
    externalLinks: (data) => {
      const arr = data.zettel?.notas || [];
      const cur = arr.find((n) => n.slug === slugify(data.page.fileSlug));
      return cur ? cur.externalLinks || [] : [];
    },
  },
};
