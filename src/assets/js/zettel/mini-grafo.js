// Mini neighborhood graph — shows current note + its connections
(function () {
  const container = document.getElementById("mini-grafo-container");
  const dataEl = document.getElementById("mini-grafo-data");
  if (!container || !dataEl) return;

  const data = JSON.parse(dataEl.textContent);
  const { center, linked, backlinks } = data;

  // Build nodes: center + all unique linked/backlinked
  const nodeMap = new Map();
  nodeMap.set(center.id, { ...center, type: "center" });
  linked.forEach((n) => {
    if (!nodeMap.has(n.id)) nodeMap.set(n.id, { ...n, type: "linked" });
  });
  backlinks.forEach((n) => {
    if (!nodeMap.has(n.id)) nodeMap.set(n.id, { ...n, type: "backlink" });
  });

  const nodes = Array.from(nodeMap.values());
  if (nodes.length < 2) {
    // Only the center, no connections — show a message
    container.innerHTML =
      '<p style="text-align:center;color:var(--text-muted);padding-top:90px;font-size:0.85rem">Isolated note — no links yet.</p>';
    return;
  }

  // Build links: center → linked, backlinks → center
  const linkSet = new Set();
  const links = [];
  linked.forEach((n) => {
    const key = `${center.id}→${n.id}`;
    if (!linkSet.has(key)) {
      linkSet.add(key);
      links.push({ source: center.id, target: n.id });
    }
  });
  backlinks.forEach((n) => {
    const key = `${n.id}→${center.id}`;
    if (!linkSet.has(key)) {
      linkSet.add(key);
      links.push({ source: n.id, target: center.id });
    }
  });

  const width = container.clientWidth;
  const height = container.clientHeight || 220;

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  // accent marks the current note; neighbours coloured by maturity. CSS vars so
  // it tracks light/dark.
  const css = getComputedStyle(svg.node());
  const cssVar = (name, fallback) => (css.getPropertyValue(name).trim() || fallback);
  const accent = cssVar("--accent", "#2a3a6b");
  const maturity = {
    seedling: cssVar("--maturity-seedling", "#5f8a3f"),
    budding: cssVar("--maturity-budding", "#b07d2b"),
    evergreen: cssVar("--maturity-evergreen", "#2f6f6a"),
  };
  const fillFor = (d) =>
    d.type === "center" ? accent : maturity[d.maturity] || cssVar("--dim", "#9a968e");

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(78),
    )
    .force("charge", d3.forceManyBody().strength(-220))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide(30));

  const link = svg
    .append("g")
    .attr("stroke", "var(--border, #3a3a32)")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 1)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => (d.type === "center" ? 15 : 9))
    .attr("fill", fillFor)
    .attr("stroke", "var(--bg, #1a1a18)")
    .attr("stroke-width", 1.5)
    .attr("cursor", "pointer")
    .on("mouseover", function (_event, d) {
      d3.select(this)
        .transition()
        .duration(100)
        .attr("r", (d.type === "center" ? 18 : 13));
    })
    .on("mouseout", function (_event, d) {
      d3.select(this)
        .transition()
        .duration(100)
        .attr("r", (d.type === "center" ? 15 : 9));
    })
    .on("click", (_event, d) => {
      if (d.id !== center.id) {
        window.location.href = (window.ZETTEL_BASE || "") + "/" + d.id + "/";
      }
    });

  // Labels
  const label = svg
    .append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text((d) => (d.title.length > 11 ? d.title.slice(0, 10) + "…" : d.title))
    .attr("font-size", (d) => (d.type === "center" ? 11 : 8.5))
    .attr("font-weight", (d) => (d.type === "center" ? "600" : "400"))
    .attr("dy", 4)
    .attr("fill", "var(--text-muted, #9a968e)")
    .attr("pointer-events", "none");

  const pad = 14;
  const clampX = (x) => Math.max(pad, Math.min(width - pad, x));
  const clampY = (y) => Math.max(pad, Math.min(height - pad, y));
  simulation.on("tick", () => {
    nodes.forEach((d) => { d.x = clampX(d.x); d.y = clampY(d.y); });
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    // labels sit left of nodes on the right half (avoid clipping the panel edge)
    label
      .attr("text-anchor", (d) => (d.x > width * 0.58 ? "end" : "start"))
      .attr("x", (d) => d.x + (d.x > width * 0.58 ? -(d.type === "center" ? 17 : 12) : (d.type === "center" ? 17 : 12)))
      .attr("y", (d) => d.y);
  });
})();
