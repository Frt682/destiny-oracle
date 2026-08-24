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
  decodeReading,
  annualRitualText,
  annualUnlocked,
  recordShare,
  getReferral,
  setReadingOutcome,
  todaysChallenge,
  getChallengeState,
  completeChallenge,
  trackEvent
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
  renderReferralHint();
}

function renderReferralHint() {
  const el = document.getElementById("referralHint");
  if (!el) return;
  const ref = getReferral();
  const unlocked = annualUnlocked();
  if (unlocked) {
    el.textContent = "Annual ritual unlocked — share or streak already opened the gate.";
  } else {
    el.textContent = `Share ${Math.max(0, 3 - (ref.shares || 0))} more reading${3 - (ref.shares || 0) === 1 ? "" : "s"} (or reach a 7-day streak) to unlock your Annual ritual.`;
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

function renderAnnual(data) {
  const unlocked = annualUnlocked();
  const text = document.getElementById("annualText");
  const lock = document.getElementById("annualLock");
  const block = document.getElementById("annualBlock");
  if (!text || !lock || !block) return;
  block.classList.toggle("locked", !unlocked);
  if (unlocked) {
    text.textContent = annualRitualText(data);
    lock.textContent = "";
  } else {
    text.textContent = "A longer year-cycle counsel waits behind the gate.";
    lock.textContent = "Unlock with 3 shares or a 7-day streak.";
  }
}

function renderReading(data, scroll = true) {
  lastReading = data;
  const box = document.getElementById("result");
  box.classList.add("open", "reveal");
  document.getElementById("signName").textContent = `${data.sign.glyph} ${data.sign.name}`;
  document.getElementById("signMeta").innerHTML =
    `${data.sign.element} · ${data.sign.modality} · Life path ${data.lifePath}<br>` +
    `Rising ${data.rising.name}${data.unknownTime ? " (approx.)" : ""} · Confidence ${data.confidence}%<br>` +
    `Climate: ${data.climate}.`;
  document.getElementById("chartMount").innerHTML = chartSvg(data);
  document.getElementById("oracle").textContent = data.oracle;
  document.getElementById("near").textContent = data.near;
  document.getElementById("season").textContent = data.season;
  document.getElementById("year").textContent = data.year;
  document.getElementById("ritual").textContent = data.ritual;
  document.getElementById("window").textContent = data.window;
  renderAnnual(data);
  fillBars(data.values);
  renderReferralHint();
  trackEvent("reading_view", { sign: data.sign.name, id: data.id });
  if (scroll) box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function outcomeLabel(outcome) {
  if (outcome === "true") return "Landed true";
  if (outcome === "false") return "Missed";
  if (outcome === "open") return "Still open";
  return "Mark outcome";
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
    .slice(0, 10)
    .map(
      (item) => `<div class="history-row" data-id="${item.id}">
        <button type="button" class="history-item" data-open="${item.id}">
          <span>${item.glyph} ${item.sign}</span>
          <span>${item.name} · ${new Date(item.savedAt).toLocaleDateString("en-US")}</span>
        </button>
        <div class="outcome-row">
          <span class="hint">${outcomeLabel(item.outcome)}</span>
          <button type="button" class="chip" data-outcome="true" data-id="${item.id}">True</button>
          <button type="button" class="chip" data-outcome="false" data-id="${item.id}">Missed</button>
          <button type="button" class="chip" data-outcome="open" data-id="${item.id}">Open</button>
        </div>
      </div>`
    )
    .join("");

  mount.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = list.find((x) => x.id === btn.dataset.open);
      if (!item?.payload) return;
      lastPayload = item.payload;
      renderReading(readingFrom(item.payload));
    });
  });

  mount.querySelectorAll("[data-outcome]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      setReadingOutcome(btn.dataset.id, btn.dataset.outcome);
      renderHistory();
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
  box.classList.add("open", "reveal");
  document.getElementById("synastryBond").textContent = `${result.bond}% bond strength`;
  document.getElementById("synastryPair").textContent =
    `${result.left.sign.glyph} ${result.left.name}  ×  ${result.right.sign.glyph} ${result.right.name}`;
  document.getElementById("synastryCounsel").textContent = result.counsel;
  trackEvent("synastry", { bond: result.bond });
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

function flash(el, text) {
  if (!el) return;
  el.hidden = false;
  el.textContent = text;
  setTimeout(() => {
    el.hidden = true;
  }, 2200);
}

function renderChallenge() {
  const challenge = todaysChallenge();
  const done = Boolean(getChallengeState()[challenge.day]);
  document.getElementById("challengePrompt").textContent = challenge.prompt;
  document.getElementById("challengeMeta").textContent = done
    ? `Completed for ${challenge.day}. Come back tomorrow.`
    : `Today’s ${challenge.hashtag} · finishes when you cast or share.`;
  document.getElementById("challengeStatus").textContent = done ? "Done" : "";
}

async function onShare(kind) {
  if (!lastPayload || !lastReading) return;
  const url = sharePageUrl(lastPayload);
  lastReading.shareUrl = url;
  if (kind === "link") {
    try {
      await navigator.clipboard.writeText(url);
      flash(document.getElementById("shareStatus"), "Share link copied.");
    } catch {
      window.prompt("Copy this reading link:", url);
    }
  } else {
    flash(document.getElementById("shareStatus"), "Preparing story card…");
    await downloadStoryCard({ ...lastReading, shareUrl: url });
    flash(document.getElementById("shareStatus"), "Story card downloaded.");
  }
  recordShare(lastReading.id);
  renderAnnual(lastReading);
  renderReferralHint();
  const challenge = todaysChallenge();
  completeChallenge(challenge.day);
  renderChallenge();
}

function setupSwipeCast(form) {
  const zone = document.getElementById("swipeCast");
  if (!zone) return;
  let startY = null;
  const start = (y) => {
    startY = y;
  };
  const end = (y) => {
    if (startY == null) return;
    if (startY - y > 56) {
      zone.classList.add("swiped");
      if (form.reportValidity()) form.requestSubmit();
    }
    startY = null;
  };
  zone.addEventListener("touchstart", (e) => start(e.changedTouches[0].clientY), { passive: true });
  zone.addEventListener("touchend", (e) => end(e.changedTouches[0].clientY), { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  paintSky(document.getElementById("stars"));
  renderToday();
  renderProofAndStreak();
  renderHistory();
  renderChallenge();
  trackEvent("page_view", { path: location.pathname });

  const form = document.getElementById("chart");
  const unknown = document.getElementById("unknownTime");
  const timeInput = document.getElementById("time");
  setupSwipeCast(form);

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
      renderReading(readingFrom(payload), false);
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
    saveReading(data);
    renderReading(data);
    renderHistory();
    renderProofAndStreak();
    const challenge = todaysChallenge();
    completeChallenge(challenge.day);
    renderChallenge();
    history.replaceState(null, "", sharePageUrl(payload).replace(/share\.html/, "index.html"));
  });

  document.getElementById("shareBtn")?.addEventListener("click", () => onShare("link"));
  document.getElementById("cardBtn")?.addEventListener("click", () => onShare("card"));

  document.getElementById("synastryForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    renderSynastry(
      synastryFrom(
        {
          name: fd.get("a_name"),
          date: fd.get("a_date"),
          time: "",
          place: "",
          question: "relationship",
          unknownTime: true
        },
        {
          name: fd.get("b_name"),
          date: fd.get("b_date"),
          time: "",
          place: "",
          question: "relationship",
          unknownTime: true
        }
      )
    );
  });

  document.getElementById("challengeGo")?.addEventListener("click", () => {
    document.getElementById("reading")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("question")?.focus();
  });

  document.getElementById("challengeShare")?.addEventListener("click", async () => {
    const challenge = todaysChallenge();
    const text = `${challenge.prompt}\n\n${challenge.hashtag}\nhttps://frt682.github.io/destiny-oracle/`;
    try {
      await navigator.clipboard.writeText(text);
      flash(document.getElementById("challengeStatus"), "Challenge copied.");
    } catch {
      window.prompt("Copy challenge:", text);
    }
    completeChallenge(challenge.day);
    renderChallenge();
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
});
