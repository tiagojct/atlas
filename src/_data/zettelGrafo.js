// Force-graph data ({nodes, links, tagGroups}) for /zettelkasten/grafo/.
import buildNotas from "./zettel.js";

export default function () {
  const { notas, idMap } = buildNotas();

  const nodeSet = new Map();
  notas.forEach((n) => {
    nodeSet.set(n.id, {
      id: n.id, title: n.title, tags: n.tags, maturity: n.maturity,
      date: n.date, degree: n.links.length, degreeIn: 0,
    });
  });

  const linkSet = new Set();
  notas.forEach((source) => {
    source.links.forEach((targetRaw) => {
      const resolved = idMap[targetRaw];
      if (!resolved || !nodeSet.has(resolved.slug)) return;
      nodeSet.get(resolved.slug).degreeIn++;
      linkSet.add(`${source.id}→${resolved.slug}`);
    });
  });

  const nodes = [...nodeSet.values()];
  const links = [...linkSet].map((k) => {
    const [source, target] = k.split("→");
    return { source, target };
  });

  const tagGroupMap = {};
  let gi = 0;
  nodes.forEach((n) => { const t = n.tags[0] || "sem-tag"; if (!(t in tagGroupMap)) tagGroupMap[t] = gi++; });
  nodes.forEach((n) => {
    const t = n.tags[0] || "sem-tag";
    n.group = tagGroupMap[t];
    n.radius = Math.max(4, Math.min(20, 5 + (n.degree + n.degreeIn) * 1.5));
  });

  return { nodes, links, tagGroups: Object.keys(tagGroupMap) };
}
