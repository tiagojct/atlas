# CLAUDE.md — Atlas

Guidance for agents working in this repo.

## What this is

A public Zettelkasten ("Atlas") in Portuguese, built with **Eleventy (11ty) v3**
(ESM) and served as a GitHub **project page** under `tiagojct.eu/atlas`
(`pathPrefix: /atlas/`). The repo **is an Obsidian vault**: notes live in
`src/zettel/*.md` and are edited directly (in Obsidian or any editor). The
Obsidian **Git** plugin auto-commits + pushes; every push triggers the deploy
Action, which rebuilds and ships to GitHub Pages.

## Commands

- `npm run dev` — local live-reload server (`serve` is an alias).
- `npm run build` — production build into `dist/`.
- `npm run search` — Pagefind index over `dist/` (CI runs after build).
- `npm run clean` — remove `dist/`.

## Architecture

- **Config:** `eleventy.config.js`. Input `src/`, output `dist/`. Markdown pipeline
  (markdown-it + attrs/anchor/footnote/sidenote, Shiki Pequod themes, `:::`
  containers: callouts `note/tip/warning/important/caution`, `aside`,
  `tabset`/`tab`, generic `{.class}` div) plus the **guarded wikilink rule**:
  `[[id]]` / `[[id|display]]` → `/<id>/`, but only when the id resolves in
  `globalThis.__zettelIdMap` (built by `src/_data/zettel.js`). Otherwise the text
  is left literal.
- **Path prefix:** `pathPrefix: "/atlas/"` + `EleventyHtmlBasePlugin` rewrite
  root-relative `href`/`src` to `/atlas/…` at build. Author/link notes
  root-relative (`/<id>/`); the plugin prefixes them. Client graph nav reads
  `window.ZETTEL_BASE = "/atlas"`.
- **Assets:** CSS cache-busting via global `assetv` (md5 of `main.scss` + `_scss/*`).
  `icon` shortcode emits inline SVG from local Iconify JSON packs (no network).
- **Single section** (routes authored root-relative, see *Path prefix*): hub at `/`
  (`src/content/zettel.njk`), notes at `/<id>/` (`src/zettel/zettel.11tydata.js`),
  the graph **"Mapa"** at `/mapa/`, tags at `/tags/` + `/tags/<tag>/`, a random
  note at `/aleatoria/`. Collections `zettelNotes` + `zettelTags` (in
  `eleventy.config.js`) drive the listings.
- **Notes** carry front matter: `id` (timestamp), `date`, `maturity`
  (`seedling`/`budding`/`evergreen`), `tags`, `draft`, `aliases` (alternate ids
  that also resolve in wikilinks). `draft: true` excludes.
- **Graph:** `src/_data/zettelGrafo.js` feeds the D3 graphs
  (`src/assets/js/zettel/{grafo,mini-grafo}.js`). `window.ZETTEL_BASE = "/atlas"`.
- **Palette:** single amber (`--accent:#9a5a14` light / `#16110b`+`#e0a860` dark)
  in `src/assets/css/main.scss`; zettel-scoped styles in `src/_scss/_zettel.scss`.
- Fonts: Inter + IBM Plex Mono (self-hosted). `.obsidian/` is ignored by 11ty.
- **`lib/`:** `shiki-pequod.js` (Shiki themes), `build-stats.js` (page-count plugin).
  `covers.js` is **vestigial** — unused, imports `@11ty/eleventy-fetch`/`-img` which
  aren't in `package.json` (leftover from the parent tiagojct.eu site); don't wire it in.
- **Deploy:** `.github/workflows/deploy.yml` — push to `main` → Node 22 → `npm ci`
  → `npm run build` (`ELEVENTY_ENV=production`) → `npm run search` (Pagefind) →
  `actions/deploy-pages`. Invariant: Pagefind runs **after** build (needs `dist/`).

## Conventions

- Single palette, no section switching. Portuguese (pt-PT).
- `dist/` and `node_modules/` are gitignored — never edit built files.
