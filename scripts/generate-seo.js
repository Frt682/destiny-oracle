const fs = require("fs");
const path = require("path");

const signs = [
  ["aries", "Aries", "♈", "Fire", "Mar 21 – Apr 19"],
  ["taurus", "Taurus", "♉", "Earth", "Apr 20 – May 20"],
  ["gemini", "Gemini", "♊", "Air", "May 21 – Jun 20"],
  ["cancer", "Cancer", "♋", "Water", "Jun 21 – Jul 22"],
  ["leo", "Leo", "♌", "Fire", "Jul 23 – Aug 22"],
  ["virgo", "Virgo", "♍", "Earth", "Aug 23 – Sep 22"],
  ["libra", "Libra", "♎", "Air", "Sep 23 – Oct 22"],
  ["scorpio", "Scorpio", "♏", "Water", "Oct 23 – Nov 21"],
  ["sagittarius", "Sagittarius", "♐", "Fire", "Nov 22 – Dec 21"],
  ["capricorn", "Capricorn", "♑", "Earth", "Dec 22 – Jan 19"],
  ["aquarius", "Aquarius", "♒", "Air", "Jan 20 – Feb 18"],
  ["pisces", "Pisces", "♓", "Water", "Feb 19 – Mar 20"]
];

const blurbs = {
  Fire: "Initiative rises. Name the desire before noon and take one public step.",
  Earth: "Stabilize the container. Finish one unfinished loop and protect the ledger.",
  Air: "Language rearranges the week. Send the shorter message.",
  Water: "Depth over display. Fewer rooms, truer ones, slower food."
};

const root = path.join(__dirname, "..");
const dir = path.join(root, "astrology");
fs.mkdirSync(dir, { recursive: true });

const indexLinks = signs
  .map(([slug, name, g]) => `  <a href="${slug}-today.html">${g} ${name} today</a>`)
  .join("\n");

fs.writeFileSync(
  path.join(dir, "index.html"),
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Zodiac Pages · DestinyOracle</title>
  <meta name="description" content="Indexable daily astrology pages for every zodiac sign. English, global DestinyOracle sky reports.">
  <link rel="canonical" href="https://frt682.github.io/destiny-oracle/astrology/">
  <link rel="stylesheet" href="../styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&family=Sora:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="site page">
    <nav class="nav"><a href="../">DestinyOracle</a><span>Signs</span></nav>
    <h1>Daily sign sky</h1>
    <p class="lede">Programmatic English pages for every zodiac — built for global search intent and daily return visits.</p>
    <div class="sign-grid">
${indexLinks}
    </div>
  </div>
</body>
</html>`
);

for (const [slug, name, glyph, element, dates] of signs) {
  const title = `${name} Horoscope Today · DestinyOracle`;
  const desc = `${name} (${dates}) daily sky report from DestinyOracle — English astrology for a global audience. Element: ${element}.`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="https://frt682.github.io/destiny-oracle/astrology/${slug}-today.html">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article","headline":"${name} Horoscope Today","inLanguage":"en","author":{"@type":"Organization","name":"DestinyOracle"},"dateModified":"2026-08-24"}
  </script>
  <link rel="stylesheet" href="../styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&family=Sora:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
  <div class="site page">
    <nav class="nav"><a href="../">DestinyOracle</a><a href="./">All signs</a></nav>
    <p class="today-kicker">Daily sky · English · Global</p>
    <h1>${glyph} ${name} today</h1>
    <p class="meta">${dates} · ${element} · Daily sky forecast</p>
    <p class="oracle" id="brief">${blurbs[element]}</p>
    <div class="chapters" style="margin-top:1.6rem">
      <div><h3>Climate</h3><p id="climate">Loading personalized near weather…</p></div>
      <div><h3>Season counsel</h3><p id="season"></p></div>
      <div><h3>Ritual</h3><p id="ritual"></p></div>
      <div><h3>Lucky window</h3><p id="window"></p></div>
    </div>
    <div class="cta" style="margin-top:2rem">
      <a class="btn" href="../#reading">Cast your full chart</a>
      <a class="link" href="../#synastry">Try synastry</a>
    </div>
  </div>
  <script type="module">
    import { signTodayReading } from '../js/oracle.js';
    const r = signTodayReading('${slug}');
    document.getElementById('brief').textContent = r.brief;
    document.getElementById('climate').textContent = r.climate + '. Moon: ' + r.moon + '.';
    document.getElementById('season').textContent = r.season;
    document.getElementById('ritual').textContent = r.ritual;
    document.getElementById('window').textContent = r.window;
  </script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, `${slug}-today.html`), html);
}

const base = "https://frt682.github.io/destiny-oracle";
const urls = [
  "",
  "/privacy.html",
  "/guides/birth-chart-reading.html",
  "/astrology/",
  ...signs.map(([slug]) => `/astrology/${slug}-today.html`)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url><loc>${base}${u || "/"}</loc><changefreq>daily</changefreq><priority>${u === "" ? "1.0" : "0.8"}</priority></url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
);

console.log("OK", signs.length, "sign pages + sitemap");
