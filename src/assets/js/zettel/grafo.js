// Full graph page — force-directed layout of all notes
(function () {
  const dataEl = document.getElementById("grafo-data");
  if (!dataEl) return;

  const { nodes, links } = JSON.parse(dataEl.textContent);
  if (!nodes.length) return;

  const svg = d3.select("#grafo-svg");
  const tooltip = d3.select("#grafo-tooltip");

  const maturityPt = { seedling: "seedling", budding: "budding", evergreen: "evergreen" };

  const container = svg.node().parentNode;
  const width = container.clientWidth;
  const height = Math.max(500, window.innerHeight * 0.7);

  svg.attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g");

  // Zoom + pan. Wheel zooms anywhere; drag pans empty space (node drag still works
  // because the filter ignores drags that start on a circle).
  const zoom = d3
    .zoom()
    .scaleExtent([0.35, 5])
    .filter((event) => event.type === "wheel" || !event.target.closest("circle"))
    .on("zoom", (event) => g.attr("transform", event.transform));
  svg.call(zoom).style("cursor", "grab");

  const controls = d3.select(container).append("div").attr("class", "grafo-controls");
  const ctrl = (label, title, fn) =>
    controls.append("button").attr("type", "button").attr("class", "grafo-ctrl")
      .attr("aria-label", title).attr("title", title).text(label).on("click", fn);
  ctrl("+", "Aproximar", () => svg.transition().duration(200).call(zoom.scaleBy, 1.4));
  ctrl("−", "Afastar", () => svg.transition().duration(200).call(zoom.scaleBy, 1 / 1.4));
  ctrl("↺", "Repor", () => svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity));

  // Colour by maturity (muted hues, read from CSS vars so the graph tracks
  // light/dark); the ink-blue accent is reserved for hover. Node size encodes
  // connectedness (radius scales with degree).
  const css = getComputedStyle(svg.node());
  const cssVar = (name, fallback) => (css.getPropertyValue(name).trim() || fallback);
  const maturityColor = {
    seedling: cssVar("--maturity-seedling", "#5f8a3f"),
    budding: cssVar("--maturity-budding", "#b07d2b"),
    evergreen: cssVar("--maturity-evergreen", "#2f6f6a"),
  };
  const accent = cssVar("--accent", "#2a3a6b");
  const fillFor = (d) => maturityColor[d.maturity] || cssVar("--dim", "#9a968e");

  // Only the most-connected notes are labelled by default (anchors); the rest
  // reveal their label on hover — keeps a dense map readable instead of a hairball.
  const deg = (d) => (d.degree || 0) + (d.degreeIn || 0);
  [...nodes].sort((a, b) => deg(b) - deg(a)).slice(0, Math.min(8, nodes.length)).forEach((n) => { n._lab = true; });

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(80),
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius((d) => d.radius + 4));

  const link = g
    .append("g")
    .attr("stroke", "var(--border, #3a3a32)")
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 1)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = g
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => d.radius)
    .attr("fill", fillFor)
    .attr("stroke", "var(--bg, #1a1a18)")
    .attr("stroke-width", 1.5)
    .attr("cursor", "pointer")
    .on("mouseover", function (event, d) {
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>${d.title}</strong><br>
           <small>${maturityPt[d.maturity] || d.maturity || ""} · ${d.tags ? d.tags.slice(0, 3).join(", ") : ""}</small>`,
        );
      d3.select(this)
        .transition()
        .duration(150)
        .attr("r", d.radius * 1.4)
        .attr("fill", accent);
      label.filter((l) => l === d).attr("opacity", 1);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.offsetX + 15 + "px")
        .style("top", event.offsetY - 10 + "px");
    })
    .on("mouseout", function (_event, d) {
      tooltip.style("opacity", 0);
      d3.select(this)
        .transition()
        .duration(150)
        .attr("r", d.radius)
        .attr("fill", fillFor(d));
      label.filter((l) => l === d).attr("opacity", d._lab ? 1 : 0);
    })
    .on("click", (_event, d) => {
      window.location.href = (window.ZETTEL_BASE || "") + "/" + d.id + "/";
    })
    .call(
      d3
        .drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }),
    );

  // Labels for every node; only the anchors (_lab) start visible, the rest on hover
  const label = g
    .append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text((d) => d.title.length > 22 ? d.title.slice(0, 20) + "…" : d.title)
    .attr("font-size", 9)
    .attr("dx", (d) => d.radius + 4)
    .attr("dy", 3)
    .attr("fill", "var(--text-muted, #9a968e)")
    .attr("opacity", (d) => (d._lab ? 1 : 0))
    .attr("pointer-events", "none");

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    label.attr("x", (d) => d.x).attr("y", (d) => d.y);
  });
})();
