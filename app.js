import {
  readingFrom,
  synastryFrom,
  todaysSky,
  chartSvg,
  sharePageUrl,
  downloadStoryCard,
  saveReading,
  loadHistory,
  getStreak,
  peopleTodayCount,
  decodeReading
} from "./js/oracle.js";

let lastReading = null;
let lastPayload = null;

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

function renderToday() {
  const sky = todaysSky();
  document.getElementById("todayDate").textContent = sky.dateLabel;
  document.getElementById("todayBrief").textContent = sky.brief;
  document.getElementById("todayTone").textContent = sky.tone;
  document.getElementById("todayWindow").textContent = sky.window;
  document.getElementById("todayMoon").textContent = sky.moon;
}

function renderProofAndStreak() {
  const proof = document.getElementById("socialProof");
  if (proof) {
    proof.textContent = `${peopleTodayCount().toLocaleString("en-US")} seekers read their sky today`;
  }
  const streak = getStreak();
  const streakEl = document.getElementById("streakStat");
  if (streakEl) {
    streakEl.textContent = streak.count
      ? `${streak.count}-day streak · best ${streak.best}`
      : "Start a daily streak with your first reading";
  }
}

function fillBars(values) {
  requestAnimationFrame(() => {
    ["love", "work", "fortune", "timing"].forEach((key) => {
      const fill = document.querySelector(`[data-fill="${key}"]`);
      if (fill) fill.style.width = `${values[key]}%`;
      const n = document.getElementById(`${key}N`);
      if (n) n.textContent = `${values[key]}`;
    });
  });
}

function renderReading(data, scroll = true) {
  lastReading = data;
  const box = document.getElementById("result");
  box.classList.add("open");
  document.getElementById("signName").textContent = `${data.sign.glyph} ${data.sign.name}`;
  document.getElementById("signMeta").innerHTML =
    `${data.sign.element} · ${data.sign.modality} · Life path ${data.lifePath}<br>` +
    `Rising ${data.rising.name}${data.unknownTime ? " (approx.)" : ""} · Model confidence ${data.confidence}%<br>` +
    `Climate: ${data.climate}.`;
  document.getElementById("chartMount").innerHTML = chartSvg(data);
  document.getElementById("oracle").textContent = data.oracle;
  document.getElementById("near").textContent = data.near;
  document.getElementById("season").textContent = data.season;
  document.getElementById("year").textContent = data.year;
  document.getElementById("ritual").textContent = data.ritual;
  document.getElementById("window").textContent = data.window;
  fillBars(data.values);
  if (scroll) box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderHistory() {
  const mount = document.getElementById("historyList");
  if (!mount) return;
  const list = loadHistory();
  if (!list.length) {
    mount.innerHTML = `<p class="hint">Your past readings will appear here on this device.</p>`;
    return;
  }
  mount.innerHTML = list
    .slice(0, 8)
    .map(
      (item) => `<button type="button" class="history-item" data-id="${item.id}">
        <span>${item.glyph} ${item.sign}</span>
        <span>${item.name} · ${new Date(item.savedAt).toLocaleDateString("en-US")}</span>
      </button>`
    )
    .join("");
  mount.querySelectorAll(".history-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = list.find((x) => x.id === btn.dataset.id);
      if (!item?.payload) return;
      lastPayload = item.payload;
      renderReading(readingFrom(item.payload));
    });
  });
}

function formPayload(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  data.unknownTime = Boolean(form.elements.unknownTime?.checked);
  if (data.unknownTime) data.time = "";
  return data;
}

function renderSynastry(result) {
  const box = document.getElementById("synastryResult");
  box.classList.add("open");
  document.getElementById("synastryBond").textContent = `${result.bond}% bond strength`;
  document.getElementById("synastryPair").textContent =
    `${result.left.sign.glyph} ${result.left.name}  ×  ${result.right.sign.glyph} ${result.right.name}`;
  document.getElementById("synastryCounsel").textContent = result.counsel;
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function flash(el, text) {
  el.hidden = false;
  el.textContent = text;
  setTimeout(() => {
    el.hidden = true;
  }, 2200);
}

document.addEventListener("DOMContentLoaded", () => {
  paintSky(document.getElementById("stars"));
  renderToday();
  renderProofAndStreak();
  renderHistory();

  const form = document.getElementById("chart");
  const unknown = document.getElementById("unknownTime");
  const timeInput = document.getElementById("time");

  unknown?.addEventListener("change", () => {
    timeInput.disabled = unknown.checked;
    if (unknown.checked) timeInput.value = "";
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get("r")) {
    const payload = decodeReading(params.get("r"));
    if (payload?.date) {
      Object.entries(payload).forEach(([k, v]) => {
        if (form.elements[k] && typeof v === "string") form.elements[k].value = v;
      });
      if (payload.unknownTime && unknown) {
        unknown.checked = true;
        timeInput.disabled = true;
      }
      lastPayload = payload;
      const data = readingFrom(payload);
      renderReading(data, false);
    }
  } else if (params.get("date") && params.get("name")) {
    ["name", "place", "date", "time", "question"].forEach((key) => {
      if (params.get(key) && form.elements[key]) form.elements[key].value = params.get(key);
    });
    lastPayload = formPayload(form);
    renderReading(readingFrom(lastPayload), false);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = formPayload(form);
    lastPayload = payload;
    const data = readingFrom(payload);
    const streak = saveReading(data);
    renderReading(data);
    renderHistory();
    renderProofAndStreak();
    const streakEl = document.getElementById("streakStat");
    if (streakEl && streak.count) {
      streakEl.textContent = `${streak.count}-day streak · best ${streak.best}`;
    }
    history.replaceState(null, "", sharePageUrl(payload).replace(/share\.html/, "index.html"));
  });

  document.getElementById("shareBtn")?.addEventListener("click", async () => {
    if (!lastPayload) return;
    const url = sharePageUrl(lastPayload);
    try {
      await navigator.clipboard.writeText(url);
      flash(document.getElementById("shareStatus"), "Share link copied.");
    } catch {
      window.prompt("Copy this reading link:", url);
    }
  });

  document.getElementById("cardBtn")?.addEventListener("click", () => {
    if (!lastReading) return;
    downloadStoryCard(lastReading);
    flash(document.getElementById("shareStatus"), "Story card downloaded.");
  });

  document.getElementById("synastryForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const a = {
      name: fd.get("a_name"),
      date: fd.get("a_date"),
      time: "",
      place: "",
      question: "relationship",
      unknownTime: true
    };
    const b = {
      name: fd.get("b_name"),
      date: fd.get("b_date"),
      time: "",
      place: "",
      question: "relationship",
      unknownTime: true
    };
    renderSynastry(synastryFrom(a, b));
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
