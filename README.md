# Atlas

A public Zettelkasten in Portuguese — a digital garden of atomic notes that link
to one another and grow over time. Live at **[tiagojct.eu/atlas](https://tiagojct.eu/atlas)**.

The repository **is an Obsidian vault**: the notes live in `src/zettel/` and are
edited there. A static site is built from them with [Eleventy](https://www.11ty.dev/)
and published to GitHub Pages on every push to `main`.

## Notes

Each note is a Markdown file whose **filename is its title** (e.g. `Axioma.md`); the
URL is the slugified filename. Front matter:

```yaml
---
date: 2026-06-22
tags: [epistemologia, lógica]
maturity: 1          # 1 = esboço · 2 = a crescer · 3 = consolidada (3 is highest)
draft: false         # true hides the note from the site
aliases: ["Axiom"]   # alternate names that also resolve in links
related: ["Teorema"] # curated links (by title) that feed the graph + footer
---
```

- **Links** between notes use `[[Título]]` (or `[[Título|texto]]`). They resolve by
  filename/alias, the same in Obsidian and on the site.
- **External links** are plain Markdown `[text](https://…)`.
- The graph, backlinks, tags and search are all derived from the notes — there is no
  database, just text files.

## Develop

```bash
npm install
npm run dev      # local live-reload server → http://localhost:8080/atlas/
npm run build    # production build into dist/
npm run search   # Pagefind index over dist/ (run after build)
npm run clean    # remove dist/
```

## Stack

Eleventy (ESM) · [Commit Mono](https://commitmono.com/) (OFL) · D3 for the graph ·
Pagefind for search. See `CLAUDE.md` for the architecture in depth.

## Deploy

Push to `main` → GitHub Action runs `npm ci`, `npm run build`, `npm run search`, and
deploys to GitHub Pages under the `/atlas/` path prefix.
