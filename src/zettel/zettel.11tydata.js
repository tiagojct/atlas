// Dados por nota no Atlas. Cada src/zettel/*.md gera uma página em
// /<id>/ (o domínio é a secção).
export default {
  layout: "layouts/zettel-note.njk",
  pagefind: true,
  eleventyComputed: {
    maturity: (data) => data.maturity || "seedling",
    permalink: (data) => (data.draft ? false : `/${data.id}/`),
    backlinks: (data) => (data.zettel?.backlinksMap || {})[data.id] || [],
    linkedNotes: (data) => {
      const arr = data.zettel?.notas || [];
      const current = arr.find((n) => n.id === data.id);
      if (!current) return [];
      return current.links
        .map((lid) => {
          const r = data.zettel?.idMap?.[lid];
          return r ? arr.find((n) => n.id === r.slug) || null : null;
        })
        .filter(Boolean);
    },
  },
};
