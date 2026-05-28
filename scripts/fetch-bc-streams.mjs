const albums = [
  { title: "Живот", id: 2889438942, url: "https://laditeo.bandcamp.com/album/--2" },
  { title: "ЗвукоГрад", id: 1231863933, url: "https://laditeo.bandcamp.com/album/--3" },
  { title: "808", id: 3760153090, url: "https://laditeo.bandcamp.com/album/808" },
  { title: "クラス", id: 2453211782, url: "https://laditeo.bandcamp.com/album/-" },
];

function parseTralbum(html) {
  const match = html.match(/data-tralbum="([^"]+)"/);
  if (!match) return null;
  return JSON.parse(
    match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'")
  );
}

const output = {
  generated: new Date().toISOString(),
  albums: {},
};

for (const album of albums) {
  const res = await fetch(album.url);
  const html = await res.text();
  const tralbum = parseTralbum(html);
  if (!tralbum) {
    console.error("No tralbum data for", album.title);
    continue;
  }

  output.albums[String(album.id)] = {
    title: album.title,
    url: album.url,
    tracks: tralbum.trackinfo.map((track) => ({
      title: track.title,
      stream: track.file?.["mp3-128"] || null,
    })),
  };
}

const fs = await import("node:fs");
const path = await import("node:path");
const outPath = path.join(import.meta.dirname, "..", "bandcamp-streams.json");
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");
console.log("Wrote", outPath);
