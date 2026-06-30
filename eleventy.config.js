import * as sass from "sass";
import path from "node:path";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import mdAttrs from "markdown-it-attrs";
import mdAnchor from "markdown-it-anchor";
import mdContainer from "markdown-it-container";
import mdFootnote from "markdown-it-footnote";
import mdSidenote from "markdown-it-sidenote";
import Shiki from "@shikijs/markdown-it";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { pequodLight, pequodDark } from "./lib/shiki-pequod.js";
import buildStats from "./lib/build-stats.js";
import { slugify } from "./lib/slug.js";

const CALLOUTS = ["note", "tip", "warning", "important", "caution"];

export default async function (eleventyConfig) {
  // Ignore Obsidian's vault config (the repo IS the vault; src/zettel/ is opened
  // in Obsidian): don't process it, and don't trigger watch rebuilds on its churn.
  eleventyConfig.ignores.add("**/.obsidian/**");
  eleventyConfig.watchIgnores.add("**/.obsidian/**");
  // Obsidian note template lives in the vault but must not be published
  eleventyConfig.ignores.add("src/atlas/_templates/**");

  // ── Markdown-it pipeline ──────────────────────────────────────────────────
  const shiki = await Shiki({
    themes: { light: pequodLight, dark: pequodDark },
  });
  eleventyConfig.amendLibrary("md", (md) => {
    md.set({ typographer: true, linkify: true });
    md.use(mdAttrs);
    md.use(mdAnchor, { level: [2, 3, 4] }); // id only — headings are not links
    md.use(mdFootnote);
    md.use(mdSidenote);
    md.use(shiki);

    // Zettelkasten wikilinks: [[id]] / [[id|display]] -> /<slug>/
    // Guarded: only rewrite when the id resolves in the note map, so [[…]]-like
    // text elsewhere is left literal. Tagged `.wikilink` (markdown-it-attrs).
    md.core.ruler.before("normalize", "wikilink", (state) => {
      if (!state.src.includes("[[")) return;
      const map = globalThis.__zettelIdMap || {};
      state.src = state.src.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, target, display) => {
        const entry = map[target.trim()];
        if (!entry) return m;
        return `[${(display || entry.title).trim()}](/${entry.slug}/){.wikilink}`;
      });
    });

    // Callouts: ::: note Optional title
    for (const type of CALLOUTS) {
      md.use(mdContainer, type, {
        validate: (p) => p.trim().split(" ")[0] === type,
        render(tokens, idx) {
          const t = tokens[idx];
          if (t.nesting === 1) {
            const title = t.info.trim().slice(type.length).trim() ||
              type.charAt(0).toUpperCase() + type.slice(1);
            return `<div class="callout callout-${type}"><div class="callout-title">${md.utils.escapeHtml(title)}</div><div class="callout-body">\n`;
          }
          return `</div></div>\n`;
        },
      });
    }
    // Margin aside: ::: aside
    md.use(mdContainer, "aside", {
      render: (tokens, idx) =>
        tokens[idx].nesting === 1 ? `<aside class="aside-note">\n` : `</aside>\n`,
    });
    // Tabset / tab (nav built client-side from data-tab)
    md.use(mdContainer, "tabset", {
      render: (tokens, idx) =>
        tokens[idx].nesting === 1 ? `<div class="tabset" data-tabset>\n` : `</div>\n`,
    });
    md.use(mdContainer, "tab", {
      validate: (p) => p.trim().split(" ")[0] === "tab",
      render(tokens, idx) {
        const t = tokens[idx];
        if (t.nesting === 1) {
          const label = t.info.trim().slice(3).trim() || "Tab";
          return `<section class="tabset-panel" data-tab="${md.utils.escapeHtml(label)}">\n`;
        }
        return `</section>\n`;
      },
    });
    // Generic passthrough div: ::: {.class}
    md.use(mdContainer, "div", {
      validate: () => true,
      render(tokens, idx) {
        const t = tokens[idx];
        if (t.nesting === 1) {
          const cls = (t.info.match(/\.([\w-]+)/g) || []).map((c) => c.slice(1)).join(" ");
          return `<div${cls ? ` class="${cls}"` : ""}>\n`;
        }
        return `</div>\n`;
      },
    });
  });

  // ── SCSS ──────────────────────────────────────────────────────────────────
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      const parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) return;
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir, "src/_scss", "node_modules"],
        style: process.env.ELEVENTY_ENV === "production" ? "compressed" : "expanded",
      });
      return async () => result.css;
    },
  });
  eleventyConfig.addWatchTarget("src/_scss/");
  eleventyConfig.addWatchTarget("src/assets/css/");

  // ── Build stats (page count, build time, duration) ──────────────────────
  eleventyConfig.addPlugin(buildStats);

  // ── HTML base: rewrite root-relative href/src to the /atlas path prefix ────
  // (served as a GitHub project page under tiagojct.eu/atlas)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // ── Asset cache-busting ───────────────────────────────────────────────────
  const cssVersion = (() => {
    const h = createHash("md5");
    h.update(readFileSync("src/assets/css/main.scss"));
    for (const f of readdirSync("src/_scss").sort()) {
      h.update(readFileSync(path.join("src/_scss", f)));
    }
    return h.digest("hex").slice(0, 8);
  })();
  eleventyConfig.addGlobalData("assetv", cssVersion);

  // ── Passthrough static assets ─────────────────────────────────────────────
  if (existsSync("src/atlas/assets")) {
    eleventyConfig.addPassthroughCopy({ "src/atlas/assets": "assets" });
  }
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });

  // ── Collections ───────────────────────────────────────────────────────────
  eleventyConfig.addFilter("topicSlug", slugify);

  // Zettelkasten (repo-managed notes in src/atlas/, edited as an Obsidian vault).
  // Notes have no id — the filename is the title; sort by date, newest first.
  const zettelNotes = (api) =>
    api.getFilteredByGlob("src/atlas/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => new Date(b.data.date || 0) - new Date(a.data.date || 0));
  eleventyConfig.addCollection("zettelNotes", zettelNotes);
  eleventyConfig.addCollection("zettelTags", (api) => {
    const map = new Map();
    for (const p of zettelNotes(api)) for (const t of (p.data.tags || [])) {
      if (!map.has(t)) map.set(t, { tag: t, count: 0, items: [] });
      const e = map.get(t); e.count++; e.items.push(p);
    }
    return [...map.values()].sort((a, b) => a.tag.localeCompare(b.tag, "pt"));
  });

  // ── Filters ───────────────────────────────────────────────────────────────
  eleventyConfig.addFilter("isoDate", (d) => (d ? new Date(d).toISOString().slice(0, 10) : ""));
  // PT-PT short date for the notes (e.g. "24 mai 2026")
  eleventyConfig.addFilter("zettelDate", (d) => {
    if (!d) return "";
    const dt = new Date(d);
    const m = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    return `${dt.getUTCDate()} ${m[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
  });
  // random note: return its url (notes no longer carry an id)
  eleventyConfig.addFilter("randomId", (arr) =>
    (arr && arr.length ? arr[Math.floor(Math.random() * arr.length)].url : "/"));
  eleventyConfig.addFilter("year", (d) => (d ? new Date(d).getFullYear() : ""));
  eleventyConfig.addFilter("head", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : arr));
  eleventyConfig.addFilter("readableDate", (d) =>
    d ? new Date(d).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" }) : "");

  // Group zettelTags by first letter (uses .tag)
  eleventyConfig.addFilter("groupByLetterZettel", (arr) => {
    const sorted = [...arr].sort((a, b) => a.tag.localeCompare(b.tag, "pt"));
    const groups = new Map();
    for (const t of sorted) {
      const key = /^[a-zA-Z]/.test(t.tag) ? t.tag[0].toUpperCase() : "#";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(t);
    }
    const keys = [...groups.keys()].sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    });
    return keys.map(k => ({ letter: k, items: groups.get(k) }));
  });

  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    pathPrefix: "/atlas/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "scss"],
  };
}
