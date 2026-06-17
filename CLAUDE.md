# CLAUDE.md — Atlas

Guidance for agents working in this repo.

## What this is

**atlas.tiagojct.eu** — a public Zettelkasten ("Atlas") in Portuguese, built with
**Eleventy (11ty) v3** (ESM). The repo **is an Obsidian vault**: notes live in
`src/zettel/*.md` and are edited directly (in Obsidian or any editor). The
Obsidian **Git** plugin auto-commits + pushes; every push triggers the deploy
Action, which rebuilds and ships to GitHub Pages.

## Commands

- `npm run dev` — local live-reload server.
- `npm run build` — production build into `dist/`.
- `npm run search` — Pagefind index over `dist/` (CI runs after build).
- `npm run clean` — remove `dist/`.

## Architecture

- **Config:** `eleventy.config.js`. Input `src/`, output `dist/`. Markdown pipeline
  (markdown-it + attrs/anchor/footnote/sidenote, Shiki Pequod themes, `:::`
  containers) plus the **guarded wikilink rule**: `[[id]]` / `[[id|display]]` →
  `/<id>/`, but only when the id resolves in `globalThis.__zettelIdMap` (built by
  `src/_data/zettel.js`). Otherwise the text is left literal.
- **Single section, root-namespaced** (the domain *is* the section): hub at `/`
  (`src/content/zettel.njk`), notes at `/<id>/` (`src/zettel/zettel.11tydata.js`),
  the graph **"Mapa"** at `/mapa/`, tags at `/tags/` + `/tags/<tag>/`, a random
  note at `/aleatoria/`.
- **Notes** carry front matter: `id` (timestamp), `date`, `maturity`
  (`seedling`/`budding`/`evergreen`), `tags`, `draft`. `draft: true` excludes.
- **Graph:** `src/_data/zettelGrafo.js` feeds the D3 graphs
  (`src/assets/js/zettel/{grafo,mini-grafo}.js`). `window.ZETTEL_BASE = ""` (root).
- **Palette:** single amber (`--accent:#9a5a14` light / `#16110b`+`#e0a860` dark)
  in `src/assets/css/main.scss`; zettel-scoped styles in `src/_scss/_zettel.scss`.
- Fonts: Inter + IBM Plex Mono (self-hosted). `.obsidian/` is ignored by 11ty.

## Conventions

- Single palette, no section switching. Portuguese (pt-PT).
- `dist/` and `node_modules/` are gitignored — never edit built files.
