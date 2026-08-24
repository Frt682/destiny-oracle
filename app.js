const SIGNS = [
  { name: "Aries", glyph: "♈", element: "Fire", modality: "Cardinal", from: [3, 21], to: [4, 19] },
  { name: "Taurus", glyph: "♉", element: "Earth", modality: "Fixed", from: [4, 20], to: [5, 20] },
  { name: "Gemini", glyph: "♊", element: "Air", modality: "Mutable", from: [5, 21], to: [6, 20] },
  { name: "Cancer", glyph: "♋", element: "Water", modality: "Cardinal", from: [6, 21], to: [7, 22] },
  { name: "Leo", glyph: "♌", element: "Fire", modality: "Fixed", from: [7, 23], to: [8, 22] },
  { name: "Virgo", glyph: "♍", element: "Earth", modality: "Mutable", from: [8, 23], to: [9, 22] },
  { name: "Libra", glyph: "♎", element: "Air", modality: "Cardinal", from: [9, 23], to: [10, 22] },
  { name: "Scorpio", glyph: "♏", element: "Water", modality: "Fixed", from: [10, 23], to: [11, 21] },
  { name: "Sagittarius", glyph: "♐", element: "Fire", modality: "Mutable", from: [11, 22], to: [12, 21] },
  { name: "Capricorn", glyph: "♑", element: "Earth", modality: "Cardinal", from: [12, 22], to: [1, 19] },
  { name: "Aquarius", glyph: "♒", element: "Air", modality: "Fixed", from: [1, 20], to: [2, 18] },
  { name: "Pisces", glyph: "♓", element: "Water", modality: "Mutable", from: [2, 19], to: [3, 20] }
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

const QUESTIONS = {
  love: "love",
  work: "work",
  money: "money",
  health: "health",
  path: "path"
};

function classifyQuestion(text) {
  const t = text.toLowerCase();
  if (/(love|heart|partner|relationship|romance|marriage)/.test(t)) return "love";
  if (/(job|career|work|boss|business|studio|art)/.test(t)) return "work";
  if (/(money|cash|wealth|debt|pay|invest)/.test(t)) return "money";
  if (/(health|body|sleep|energy|heal)/.test(t)) return "health";
  return "path";
}

function sunSign(date) {
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

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, list) {
  return list[Math.floor(rand() * list.length) % list.length];
}

function risingFromHour(hour, sunIndex) {
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

function dayOfCycle(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function readingFrom(input) {
  const birth = new Date(`${input.date}T${input.time || "12:00"}`);
  const sign = sunSign(birth);
  const sunIndex = SIGNS.findIndex((s) => s.name === sign.name);
  const hour = input.time ? Number(input.time.split(":")[0]) : 12;
  const rising = risingFromHour(hour, sunIndex);
  const focus = classifyQuestion(input.question || input.focus || "");
  const seed = hash32(
    [input.name, input.date, input.time, input.place, input.question, String(dayOfCycle(birth))].join("|")
  );
  const rand = rng(seed);
  const theme = THEMES[sign.element];
  const values = scores(rand, sign.element, focus);
  const confidence = Math.round(72 + (input.time ? 8 : 0) + (input.place ? 6 : 0) + (input.question ? 7 : 0) - rand() * 6);

  return {
    sign,
    rising,
    focus,
    confidence,
    values,
    oracle: insightFor(focus, sign, rising, rand),
    near: pick(rand, theme.near),
    season: pick(rand, theme.season),
    year: pick(rand, theme.year),
    climate: theme.climate
  };
}

function paintSky(canvas) {
  const ctx = canvas.getContext("2d");
  const stars = [];

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    stars.length = 0;
    const count = Math.floor((canvas.width * canvas.height) / 14000);
    for (let i = 0; i < count; i += 1) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 * devicePixelRatio,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 1.6
      });
    }
  }

  function tick(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#071318";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
      const a = 0.25 + Math.abs(Math.sin(t * 0.001 * star.s + star.p)) * 0.7;
      ctx.beginPath();
      ctx.fillStyle = `rgba(243, 234, 216, ${a})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(tick);
}

function renderReading(data) {
  const box = document.getElementById("result");
  box.classList.add("open");
  document.getElementById("signName").textContent = `${data.sign.glyph} ${data.sign.name}`;
  document.getElementById("signMeta").innerHTML =
    `${data.sign.element} · ${data.sign.modality}<br>Rising ${data.rising.name} · Model confidence ${data.confidence}%<br>Climate: ${data.climate}.`;
  document.getElementById("oracle").textContent = data.oracle;
  document.getElementById("near").textContent = data.near;
  document.getElementById("season").textContent = data.season;
  document.getElementById("year").textContent = data.year;

  requestAnimationFrame(() => {
    document.querySelector('[data-fill="love"]').style.width = `${data.values.love}%`;
    document.querySelector('[data-fill="work"]').style.width = `${data.values.work}%`;
    document.querySelector('[data-fill="fortune"]').style.width = `${data.values.fortune}%`;
    document.querySelector('[data-fill="timing"]').style.width = `${data.values.timing}%`;
    document.getElementById("loveN").textContent = `${data.values.love}`;
    document.getElementById("workN").textContent = `${data.values.work}`;
    document.getElementById("fortuneN").textContent = `${data.values.fortune}`;
    document.getElementById("timingN").textContent = `${data.values.timing}`;
  });

  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  paintSky(document.getElementById("stars"));
  const form = document.getElementById("chart");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    renderReading(readingFrom(payload));
  });
});
