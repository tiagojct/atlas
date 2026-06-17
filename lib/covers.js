import EleventyFetch from "@11ty/eleventy-fetch";
import Image from "@11ty/eleventy-img";

const UA = { headers: { "User-Agent": "tiagojct.eu media page (tiagojacinto@med.up.pt)" } };

// Download a remote cover and emit local responsive JPEGs; return the largest
// local URL. Falls back to the remote URL if processing fails.
async function localize(remoteUrl) {
  if (!remoteUrl) return null;
  try {
    const m = await Image(remoteUrl, {
      widths: [400, 800],
      formats: ["jpeg"],
      outputDir: "dist/img/covers/",
      urlPath: "/img/covers/",
      sharpJpegOptions: { quality: 80, mozjpeg: true },
      cacheOptions: { duration: "30d", fetchOptions: UA },
    });
    return m.jpeg[m.jpeg.length - 1].url;
  } catch (e) {
    return remoteUrl;
  }
}

// Album cover from the iTunes Search API (artist + album).
export async function albumCover(artist, album) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${album}`)}&entity=album&limit=1`;
  try {
    const d = await EleventyFetch(url, { duration: "30d", type: "json" });
    const h = d.results && d.results[0];
    return await localize(h && h.artworkUrl100 ? h.artworkUrl100.replace("100x100bb", "600x600bb") : null);
  } catch (e) { return null; }
}

// Book cover from Open Library (title + author).
export async function bookCover(title, author) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&limit=1&fields=cover_i`;
  try {
    const d = await EleventyFetch(url, { duration: "30d", type: "json" });
    const id = d.docs && d.docs[0] && d.docs[0].cover_i;
    return await localize(id ? `https://covers.openlibrary.org/b/id/${id}-L.jpg` : null);
  } catch (e) { return null; }
}

// Movie poster from the Wikipedia REST summary (article title).
export async function moviePoster(wikiTitle) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`;
  try {
    const d = await EleventyFetch(url, { duration: "30d", type: "json", fetchOptions: UA });
    const remote = (d.thumbnail && d.thumbnail.source) || (d.originalimage && d.originalimage.source) || null;
    return await localize(remote);
  } catch (e) { return null; }
}
