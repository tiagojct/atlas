// lib/build-stats.js
// Exposes {{ buildStats }} (buildTime) and {{ buildStats.buildTime | buildDuration }} filter.
export default function (eleventyConfig) {
  let start;

  eleventyConfig.on("eleventy.before", () => {
    start = Date.now();
  });

  eleventyConfig.addGlobalData("buildStats", () => ({
    buildTime: new Date().toISOString(),
  }));

  eleventyConfig.addFilter("buildDuration", () => {
    if (!start) return "0s";
    const ms = Date.now() - start;
    if (ms < 1000) return `${ms}ms`;
    const s = Math.round(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
  });
}
