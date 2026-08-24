/* DestinyOracle shared engine — deterministic readings, synastry, story cards */

export const SIGNS = [
  { name: "Aries", slug: "aries", glyph: "♈", element: "Fire", modality: "Cardinal", dates: "Mar 21 – Apr 19" },
  { name: "Taurus", slug: "taurus", glyph: "♉", element: "Earth", modality: "Fixed", dates: "Apr 20 – May 20" },
  { name: "Gemini", slug: "gemini", glyph: "♊", element: "Air", modality: "Mutable", dates: "May 21 – Jun 20" },
  { name: "Cancer", slug: "cancer", glyph: "♋", element: "Water", modality: "Cardinal", dates: "Jun 21 – Jul 22" },
  { name: "Leo", slug: "leo", glyph: "♌", element: "Fire", modality: "Fixed", dates: "Jul 23 – Aug 22" },
  { name: "Virgo", slug: "virgo", glyph: "♍", element: "Earth", modality: "Mutable", dates: "Aug 23 – Sep 22" },
  { name: "Libra", slug: "libra", glyph: "♎", element: "Air", modality: "Cardinal", dates: "Sep 23 – Oct 22" },
  { name: "Scorpio", slug: "scorpio", glyph: "♏", element: "Water", modality: "Fixed", dates: "Oct 23 – Nov 21" },
  { name: "Sagittarius", slug: "sagittarius", glyph: "♐", element: "Fire", modality: "Mutable", dates: "Nov 22 – Dec 21" },
  { name: "Capricorn", slug: "capricorn", glyph: "♑", element: "Earth", modality: "Cardinal", dates: "Dec 22 – Jan 19" },
  { name: "Aquarius", slug: "aquarius", glyph: "♒", element: "Air", modality: "Fixed", dates: "Jan 20 – Feb 18" },
  { name: "Pisces", slug: "pisces", glyph: "♓", element: "Water", modality: "Mutable", dates: "Feb 19 – Mar 20" }
];

const THEMES = {
  Fire: {
    climate: "heat, initiative, and a need to be seen doing the thing",
    near: [
      "A door opens because you walk through it, not because it was labeled for you.",
      "The next ten days reward a first move more than a perfect plan.",
      "Someone is waiting for you to name the desire out loud."
    ],
    season: [
      "This season is a forge. What you heat now will hold its shape for months.",
      "Rivalry is information. Follow the heat, not the noise.",
      "A public step — a pitch, a post, a promise — resets the chart."
    ],
    year: [
      "The year asks you to lead a room you used to wait to be invited into.",
      "Courage becomes a habit, then a reputation, then a resource.",
      "By year’s end you will have started something that cannot quietly end."
    ]
  },
  Earth: {
    climate: "patience, craft, and the gravity of real work",
    near: [
      "A practical detail you keep postponing is the hinge of the next chapter.",
      "Money and time want a cleaner container. Draw the line this week.",
      "What you finish — not what you announce — changes the weather."
    ],
    season: [
      "Build the system that lets you rest. The sky is not asking for more strain.",
      "A slow yes is still a yes. Do not let urgency counterfeit importance.",
      "Land, body, and ledger want the same care: fewer leaks."
    ],
    year: [
      "This year compounds. Small, stubborn repetitions outperform inspiration.",
      "A structure you set now will still be paying you in twelve months.",
      "Stability is not a cage here; it is the studio where the work can grow."
    ]
  },
  Air: {
    climate: "language, pattern, and the company you keep thinking with",
    near: [
      "A conversation you have been circling is ready to land. Say the precise sentence.",
      "Two ideas want to meet. Introduce them on paper before you introduce them in public.",
      "Someone’s question is a map. Answer it without performing."
    ],
    season: [
      "This season rewires your network. Choose rooms that sharpen you.",
      "Study is not delay. The model rewards curiosity that becomes a method.",
      "A collaboration will work if the language is shared, not just the ambition."
    ],
    year: [
      "Your year is a thesis. Write it in public, revise it in private.",
      "The right alliance arrives as a sentence, not a spectacle.",
      "By winter you will speak with a voice that no longer needs permission."
    ]
  },
  Water: {
    climate: "memory, tide, and the intelligence of feeling",
    near: [
      "What you feel first is data. Do not sand it down to seem reasonable.",
      "A private ritual — walk, letter, night without the phone — restores the signal.",
      "Someone from the past is not a return; they are a reminder of the current."
    ],
    season: [
      "This season asks for depth over display. Fewer rooms, truer ones.",
      "Grief and appetite travel together. Feed the living part.",
      "Protect the studio of your inner life; that is where the next image forms."
    ],
    year: [
      "The year is a tide chart. You do not have to push the water.",
      "Intimacy — with a person, a craft, or a place — is the real promotion.",
      "What you refuse to abandon will become the story others tell about you."
    ]
  }
};

const RITUALS = {
  Fire: [
    "Speak one unfinished sentence into the open air, then act on the first half of it before noon.",
    "Light a single flame, name what you want, and put the phone face-down for twenty minutes."
  ],
  Earth: [
    "Clear one surface completely. Put only the next true task on it.",
    "Write three numbers: money in, money out, hours left this week. Adjust one."
  ],
  Air: [
    "Draft the message you have been rehearsing. Send the shorter version.",
    "Walk without headphones and collect three sentences you overhear. Keep one."
  ],
  Water: [
    "Write a letter you will not send. Burn or bury the last line.",
    "Drink water slowly. Name the feeling under the feeling. Do not fix it yet."
  ]
};

const WINDOWS = [
  "Dawn to mid-morning — before the room fills with other people's urgency.",
  "Late afternoon — when the day softens and decisions land cleaner.",
  "The hour after sunset — good for confession, craft, and quiet yeses.",
  "Near midnight — for planning only; do not negotiate love or money then."
];

const TODAY_BRIEFS = [
  "The model reads a high-signal day: fewer meetings, clearer asks, one finished loop beats ten starts.",
  "A soft sky. Protect attention. What you refuse today becomes tomorrow's advantage.",
  "Pressure is useful if you aim it. Pick one stubborn problem and apply heat for forty minutes.",
  "Conversations carry more weight than calendars. Listen for the sentence that rearranges the week.",
  "The pattern favors repair: a broken edge, a late reply, a body that wants slower food."
];

const TODAY_TONES = ["Initiating", "Stabilizing", "Communicating", "Deepening", "Expanding", "Structuring"];

const SYNASTRY = {
  same: "Same element — easy recognition, shared weather, risk of echoing each other's blind spots.",
  FireEarth: "Fire meets Earth — spark needs a hearth. Desire works when it becomes craft.",
  FireAir: "Fire meets Air — language fans the flame. Talk first, then move together.",
  FireWater: "Fire meets Water — steam and story. Passion with care for what boils over.",
  EarthAir: "Earth meets Air — blueprint and breeze. Plans sharpen when spoken aloud.",
  EarthWater: "Earth meets Water — garden weather. Slow growth, deep roots, patient harvest.",
  AirWater: "Air meets Water — tide and telegraph. Feelings need words; words need feeling."
};

export function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function rng(seed) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick(rand, list) {
  return list[Math.floor(rand() * list.length) % list.length];
}

export function sunSign(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const md = m * 100 + d;
  if (md >= 321 && md <= 419) return SIGNS[0];
  if (md >= 420 && md <= 520) return SIGNS[1];
  if (md >= 521 && md <= 620) return SIGNS[2];
  if (md >= 621 && md <= 722) return SIGNS[3];
  if (md >= 723 && md <= 822) return SIGNS[4];
  if (md >= 823 && md <= 922) return SIGNS[5];
  if (md >= 923 && md <= 1022) return SIGNS[6];
  if (md >= 1023 && md <= 1121) return SIGNS[7];
  if (md >= 1122 && md <= 1221) return SIGNS[8];
  if (md >= 1222 || md <= 119) return SIGNS[9];
  if (md >= 120 && md <= 218) return SIGNS[10];
  return SIGNS[11];
}

export function classifyQuestion(text) {
  const t = (text || "").toLowerCase();
  if (/(love|heart|partner|relationship|romance|marriage)/.test(t)) return "love";
  if (/(job|career|work|boss|business|studio|art)/.test(t)) return "work";
  if (/(money|cash|wealth|debt|pay|invest)/.test(t)) return "money";
  if (/(health|body|sleep|energy|heal)/.test(t)) return "health";
  return "path";
}

function risingFromHour(hour, sunIndex, unknownTime) {
  if (unknownTime) return SIGNS[sunIndex];
  const idx = (sunIndex + Math.floor((Number(hour) || 12) / 2)) % 12;
  return SIGNS[idx];
}

function scores(rand, element, focus) {
  const base = {
    love: 42 + rand() * 28,
    work: 44 + rand() * 28,
    fortune: 40 + rand() * 30,
    timing: 48 + rand() * 26
  };
  if (element === "Fire") base.work += 10;
  if (element === "Earth") base.fortune += 10;
  if (element === "Air") base.timing += 8;
  if (element === "Water") base.love += 10;
  if (focus === "love") base.love += 12;
  if (focus === "work") base.work += 12;
  if (focus === "money") base.fortune += 12;
  if (focus === "health") base.timing += 8;
  const clamp = (n) => Math.min(96, Math.round(n));
  return {
    love: clamp(base.love),
    work: clamp(base.work),
    fortune: clamp(base.fortune),
    timing: clamp(base.timing)
  };
}

function insightFor(focus, sign, rising, rand) {
  const map = {
    love: `Affection wants a clearer form. ${sign.name} can mistake intensity for proof; ${rising.name} rising asks you to show up as you are, not as the myth.`,
    work: `The work that fits you will not look like a ladder. It will look like a craft ${sign.name} already knows how to tend — if ${rising.name} rising stops performing competence and starts practicing it.`,
    money: `Cash follows containers. ${sign.name} leaks through unfinished loops; ${rising.name} rising can close one this month and feel the chart change.`,
    health: `The body is the first instrument. ${sign.name} overruns it when meaning feels scarce. Restore a daily edge — sleep, walk, salt, silence — before you ask the sky for more.`,
    path: `You are not lost. You are between two honest lives. ${sign.name} sun and ${rising.name} rising disagree about pace; let them take turns instead of fighting for the wheel.`
  };
  const extra = [
    "A name you keep almost saying is the next coordinate.",
    "Do not outsource the decision to a more certain person. Certainty is not the same as truth.",
    "The model finds a repeating motif: you leave just before the work becomes visible."
  ];
  return `${map[focus]} ${pick(rand, extra)}`;
}

export function dayOfCycle(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

export function moonPhase(date) {
  const synodic = 29.53058867;
  const known = new Date("2000-01-06T18:14:00Z").getTime();
  const days = (date.getTime() - known) / 86400000;
  const age = ((days % synodic) + synodic) % synodic;
  if (age < 1.85) return "New moon";
  if (age < 7.38) return "Waxing crescent";
  if (age < 9.23) return "First quarter";
  if (age < 14.77) return "Waxing gibbous";
  if (age < 16.61) return "Full moon";
  if (age < 22.15) return "Waning gibbous";
  if (age < 24.0) return "Last quarter";
  return "Waning crescent";
}

export function lifePath(dateStr) {
  const digits = (dateStr || "").replace(/\D/g, "");
  let n = [...digits].reduce((a, d) => a + Number(d), 0);
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0);
  }
  return n || 9;
}

export function todaysSky(date = new Date()) {
  const seed = hash32(date.toISOString().slice(0, 10));
  const rand = rng(seed);
  const sign = sunSign(date);
  return {
    dateLabel: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }),
    brief: pick(rand, TODAY_BRIEFS),
    tone: `${pick(rand, TODAY_TONES)} · ${sign.name} season`,
    window: pick(rand, WINDOWS),
    moon: moonPhase(date),
    sign
  };
}

export function readingFrom(input) {
  const unknownTime = Boolean(input.unknownTime) || input.time === "" || input.time == null;
  const birth = new Date(`${input.date}T${unknownTime ? "12:00" : input.time}`);
  const sign = sunSign(birth);
  const sunIndex = SIGNS.findIndex((s) => s.name === sign.name);
  const hour = unknownTime ? 12 : Number(String(input.time).split(":")[0]);
  const rising = risingFromHour(hour, sunIndex, unknownTime);
  const focus = classifyQuestion(input.question || input.focus || "");
  const seed = hash32(
    [input.name, input.date, unknownTime ? "unknown" : input.time, input.place, input.question, String(dayOfCycle(birth))].join("|")
  );
  const rand = rng(seed);
  const theme = THEMES[sign.element];
  const values = scores(rand, sign.element, focus);
  const confidence = Math.round(
    68 + (!unknownTime ? 10 : 0) + (input.place ? 6 : 0) + (input.question ? 7 : 0) - rand() * 6
  );

  return {
    name: input.name || "Seeker",
    date: input.date,
    time: unknownTime ? null : input.time,
    place: input.place || "",
    question: input.question || "",
    unknownTime,
    sign,
    rising,
    focus,
    confidence,
    values,
    lifePath: lifePath(input.date),
    oracle: insightFor(focus, sign, rising, rand),
    near: pick(rand, theme.near),
    season: pick(rand, theme.season),
    year: pick(rand, theme.year),
    ritual: pick(rand, RITUALS[sign.element]),
    window: pick(rand, WINDOWS),
    climate: theme.climate,
    id: seed.toString(36)
  };
}

export function synastryFrom(a, b) {
  const left = readingFrom(a);
  const right = readingFrom(b);
  const e1 = left.sign.element;
  const e2 = right.sign.element;
  let key = "same";
  let bond = 70;
  if (e1 !== e2) {
    const pair = [e1, e2].sort().join("");
    const map = {
      EarthFire: "FireEarth",
      AirFire: "FireAir",
      FireWater: "FireWater",
      AirEarth: "EarthAir",
      EarthWater: "EarthWater",
      AirWater: "AirWater"
    };
    key = map[pair] || "same";
    bond = 58 + (hash32(`${left.id}|${right.id}`) % 28);
  } else {
    bond = 72 + (hash32(`${left.id}|${right.id}`) % 20);
  }
  const rand = rng(hash32(`${left.id}:${right.id}`));
  const counsel = [
    `${left.name} (${left.sign.name}) and ${right.name} (${right.sign.name}) meet as ${e1} and ${e2}.`,
    SYNASTRY[key] || SYNASTRY.same,
    pick(rand, [
      "The chart favors honest schedules over grand promises.",
      "One person leads with language; the other with presence. Trade roles weekly.",
      "A shared ritual — walk, meal, silence — will outlast any dramatic plan."
    ])
  ].join(" ");

  return { left, right, bond, counsel, key };
}

export function encodeReading(payload) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(payload))))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeReading(token) {
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    return JSON.parse(decodeURIComponent(escape(atob(pad))));
  } catch {
    return null;
  }
}

export function siteBase() {
  const path = window.location.pathname;
  if (path.includes("/astrology/") || path.includes("/guides/")) {
    return path.replace(/\/(astrology|guides)\/[^/]*$/, "/");
  }
  if (path.endsWith("share.html") || path.endsWith("privacy.html") || path.endsWith("history.html")) {
    return path.replace(/[^/]+$/, "");
  }
  return path.endsWith("/") ? path : path.replace(/[^/]+$/, "");
}

export function sharePageUrl(payload) {
  const token = encodeReading(payload);
  return `${window.location.origin}${siteBase()}share.html?r=${token}`;
}

export function drawStoryCard(data) {
  const w = 1080;
  const h = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#071318");
  g.addColorStop(0.45, "#0b2a2e");
  g.addColorStop(1, "#132018");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 90; i += 1) {
    const x = (hash32(`${data.id}-${i}`) % w);
    const y = (hash32(`y${data.id}-${i}`) % h);
    ctx.fillStyle = `rgba(243,234,216,${0.15 + (i % 5) * 0.08})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + (i % 3), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#c9a227";
  ctx.font = "500 28px Sora, sans-serif";
  ctx.fillText("DESTINYORACLE", 80, 140);

  ctx.fillStyle = "#f3ead8";
  ctx.font = "italic 120px Fraunces, serif";
  ctx.fillText(`${data.sign.glyph} ${data.sign.name}`, 80, 320);

  ctx.fillStyle = "#9bb8b4";
  ctx.font = "400 32px Sora, sans-serif";
  ctx.fillText(`${data.name} · Life path ${data.lifePath}`, 80, 390);
  ctx.fillText(`Rising ${data.rising.name} · ${data.confidence}% confidence`, 80, 440);

  const wrap = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(" ");
    let line = "";
    let yy = y;
    words.forEach((word) => {
      const test = `${line}${word} `;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), x, yy);
        line = `${word} `;
        yy += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line.trim(), x, yy);
    return yy;
  };

  ctx.fillStyle = "#f3ead8";
  ctx.font = "italic 44px Fraunces, serif";
  const afterOracle = wrap(data.oracle.slice(0, 220) + (data.oracle.length > 220 ? "…" : ""), 80, 560, 920, 58);

  ctx.fillStyle = "#c9a227";
  ctx.font = "500 26px Sora, sans-serif";
  ctx.fillText("NEAR WEATHER", 80, afterOracle + 100);
  ctx.fillStyle = "#e6dcc7";
  ctx.font = "400 34px Sora, sans-serif";
  wrap(data.near, 80, afterOracle + 150, 920, 48);

  ctx.fillStyle = "#c9a227";
  ctx.font = "500 26px Sora, sans-serif";
  ctx.fillText("LOVE  " + data.values.love + "   WORK  " + data.values.work + "   FORTUNE  " + data.values.fortune, 80, 1580);

  ctx.fillStyle = "#9bb8b4";
  ctx.font = "400 28px Sora, sans-serif";
  ctx.fillText("Read your own sky → frt682.github.io/destiny-oracle", 80, 1750);
  ctx.fillText("#DestinyOracle", 80, 1810);

  return canvas;
}

export function downloadStoryCard(data) {
  const canvas = drawStoryCard(data);
  const a = document.createElement("a");
  a.download = `destinyoracle-${data.sign.slug || data.sign.name.toLowerCase()}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

export function chartSvg(reading) {
  const cx = 160;
  const cy = 160;
  const r = 120;
  const sunIndex = SIGNS.findIndex((s) => s.name === reading.sign.name);
  const riseIndex = SIGNS.findIndex((s) => s.name === reading.rising.name);
  const angle = (i) => ((i / 12) * Math.PI * 2) - Math.PI / 2;
  const pt = (i, rad) => {
    const a = angle(i);
    return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad];
  };
  const ticks = SIGNS.map((_, i) => {
    const [x1, y1] = pt(i, r - 8);
    const [x2, y2] = pt(i, r);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(243,234,216,0.35)"/>`;
  }).join("");
  const [sx, sy] = pt(sunIndex, r * 0.55);
  const [rx, ry] = pt(riseIndex, r * 0.78);
  return `<svg viewBox="0 0 320 320" class="chart-svg" aria-hidden="true">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(201,162,39,0.55)" stroke-width="1.2"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="none" stroke="rgba(243,234,216,0.18)"/>
    ${ticks}
    <circle cx="${sx}" cy="${sy}" r="7" fill="#c9a227"/>
    <circle cx="${rx}" cy="${ry}" r="5" fill="#f3ead8"/>
    <text x="${cx}" y="${cy + 6}" text-anchor="middle" fill="#f3ead8" font-size="18" font-family="Fraunces, serif">${reading.sign.glyph}</text>
  </svg>`;
}

const HISTORY_KEY = "destinyoracle_history_v1";
const STREAK_KEY = "destinyoracle_streak_v1";

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveReading(reading) {
  const list = loadHistory();
  list.unshift({
    id: reading.id,
    name: reading.name,
    date: reading.date,
    sign: reading.sign.name,
    glyph: reading.sign.glyph,
    oracle: reading.oracle,
    near: reading.near,
    savedAt: new Date().toISOString(),
    payload: {
      name: reading.name,
      date: reading.date,
      time: reading.time || "",
      place: reading.place,
      question: reading.question,
      unknownTime: reading.unknownTime
    }
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 40)));
  return updateStreak();
}

export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  let state = { count: 0, last: null, best: 0 };
  try {
    state = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}") || state;
  } catch {
    /* ignore */
  }
  if (state.last === today) return state;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().slice(0, 10);
  state.count = state.last === y ? (state.count || 0) + 1 : 1;
  state.last = today;
  state.best = Math.max(state.best || 0, state.count);
  localStorage.setItem(STREAK_KEY, JSON.stringify(state));
  return state;
}

export function getStreak() {
  try {
    return JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"best":0}');
  } catch {
    return { count: 0, best: 0 };
  }
}

export function peopleTodayCount() {
  const day = new Date().toISOString().slice(0, 10);
  const base = 8000 + (hash32(day) % 7000);
  const hour = new Date().getHours();
  return base + hour * 173;
}

export function signTodayReading(slug, date = new Date()) {
  const sign = SIGNS.find((s) => s.slug === slug) || SIGNS[0];
  const seed = hash32(`${slug}|${date.toISOString().slice(0, 10)}`);
  const rand = rng(seed);
  const theme = THEMES[sign.element];
  return {
    sign,
    dateLabel: date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    brief: pick(rand, theme.near),
    season: pick(rand, theme.season),
    ritual: pick(rand, RITUALS[sign.element]),
    window: pick(rand, WINDOWS),
    moon: moonPhase(date),
    climate: theme.climate
  };
}
