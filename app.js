"use strict";

/* ---- Data ---------------------------------------------------------------- */

const PIECES = Array.isArray(window.CHANT_PIECES) ? window.CHANT_PIECES : [];
const OPTION_COUNT = Math.min(4, PIECES.length);

/* ---- Elements ------------------------------------------------------------ */

const scoreEl = document.getElementById("score");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const factEl = document.getElementById("fact");
const nextBtn = document.getElementById("next-btn");
const playBtn = document.getElementById("play-btn");
const playNote = document.getElementById("play-note");

const els = {
  streak: document.getElementById("stat-streak"),
  best: document.getElementById("stat-best"),
  accuracy: document.getElementById("stat-accuracy"),
  rounds: document.getElementById("stat-rounds"),
};

/* ---- Stats (best streak persists) ---------------------------------------- */

const BEST_KEY = "chantTrivia.bestStreak";
const stats = { streak: 0, best: readBest(), rounds: 0, correct: 0 };

function readBest() {
  const raw = Number(localStorage.getItem(BEST_KEY));
  return Number.isFinite(raw) && raw > 0 ? raw : 0;
}
function saveBest() {
  try { localStorage.setItem(BEST_KEY, String(stats.best)); } catch (_) { /* ignore */ }
}
function renderStats() {
  els.streak.textContent = stats.streak;
  els.best.textContent = stats.best;
  els.rounds.textContent = stats.rounds;
  els.accuracy.textContent =
    stats.rounds === 0 ? "—" : `${Math.round((stats.correct / stats.rounds) * 100)}%`;
}

/* ---- Helpers ------------------------------------------------------------- */

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick `n` chants: the answer plus distinct distractors.
function buildChoices(answer) {
  const others = shuffle(PIECES.filter((p) => p.id !== answer.id)).slice(0, OPTION_COUNT - 1);
  return shuffle([answer, ...others]);
}

/* ---- Round state --------------------------------------------------------- */

let current = null;      // the answer chant
let visualObj = null;    // abcjs render result, reused for playback
let answered = false;
let synth = null;        // active CreateSynth instance, if any
let audioCtx = null;     // shared AudioContext, created on first play

// Full General MIDI soundfont — includes the church organ (program 19). abcjs's
// built-in default soundfont is piano-only, so the organ voicing needs this one.
const SOUND_FONT_URL = "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/";

function renderScore(piece) {
  scoreEl.innerHTML = "";
  // Inject a church-organ MIDI voicing (GM program 19) for playback, after the
  // K: line. The directive doesn't render visually — it only changes the sound.
  const abc = piece.abc.replace(/(K:[^\n]*\n)/, "$1%%MIDI program 19\n");
  // Fixed staffwidth; CSS (svg{max-width:100%}) scales it down on narrow screens.
  // Avoids the window-resize listener that responsive:"resize" would attach.
  const rendered = window.ABCJS.renderAbc(scoreEl, abc, {
    staffwidth: 620,
    scale: 1.25,
    add_classes: true,
    paddingtop: 6,
    paddingbottom: 6,
  });
  visualObj = rendered && rendered[0] ? rendered[0] : null;

  // abcjs emits a fixed-pixel width with no viewBox; convert to a fluid,
  // aspect-preserving SVG so it scales to the panel (and on tablets).
  const svg = scoreEl.querySelector("svg");
  if (svg) {
    const w = parseFloat(svg.getAttribute("width"));
    const h = parseFloat(svg.getAttribute("height"));
    if (w && h) {
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("width", "100%");
      svg.removeAttribute("height");
    }
  }
}

function renderOptions(choices) {
  optionsEl.innerHTML = "";
  choices.forEach((piece, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.dataset.id = piece.id;
    btn.innerHTML =
      `<span class="opt-num">${i + 1}</span>` +
      `<span class="opt-title"></span>` +
      `<span class="opt-use"></span>`;
    btn.querySelector(".opt-title").textContent = piece.title;
    btn.querySelector(".opt-use").textContent = piece.use;
    btn.addEventListener("click", () => choose(piece, btn));
    optionsEl.appendChild(btn);
  });
}

function newRound() {
  stopPlayback();
  answered = false;
  current = PIECES[Math.floor(Math.random() * PIECES.length)];
  renderScore(current);
  renderOptions(buildChoices(current));

  resultEl.textContent = "";
  resultEl.className = "result";
  factEl.textContent = "";
  nextBtn.hidden = true;
  playBtn.disabled = false;
  playNote.textContent = "";
}

function choose(piece, btn) {
  if (answered) return;
  answered = true;
  stats.rounds += 1;

  const correct = piece.id === current.id;
  const buttons = [...optionsEl.querySelectorAll(".option")];
  buttons.forEach((b) => {
    b.disabled = true;
    if (b.dataset.id === current.id) b.classList.add("correct");
    else if (b === btn) b.classList.add("wrong");
    else b.classList.add("dim");
  });

  if (correct) {
    stats.correct += 1;
    stats.streak += 1;
    if (stats.streak > stats.best) { stats.best = stats.streak; saveBest(); }
    resultEl.textContent = "✓ Correct!";
    resultEl.className = "result good";
  } else {
    stats.streak = 0;
    resultEl.textContent = `✗ It's ${current.title} — ${current.use}`;
    resultEl.className = "result bad";
  }

  const parts = [];
  if (current.era) parts.push(current.era);
  if (current.fact) parts.push(current.fact);
  factEl.textContent = parts.join(" — ");

  renderStats();
  nextBtn.hidden = false;
  nextBtn.focus();
}

/* ---- Playback (abcjs synth) ---------------------------------------------- */

async function stopPlayback() {
  if (synth) {
    try { synth.stop(); } catch (_) { /* ignore */ }
    synth = null;
  }
}

async function play() {
  if (!visualObj) return;
  if (!window.ABCJS.synth.supportsAudio()) {
    playNote.textContent = "Audio isn't supported in this browser.";
    return;
  }
  await stopPlayback();
  playBtn.disabled = true;
  playNote.textContent = "loading sound…";
  try {
    // Create/resume the audio context inside the click gesture (autoplay policy).
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") await audioCtx.resume();

    synth = new window.ABCJS.synth.CreateSynth();
    await synth.init({
      audioContext: audioCtx,
      visualObj,
      options: { soundFontUrl: SOUND_FONT_URL },
    });
    await synth.prime();
    synth.start();
    playNote.textContent = "playing (church-organ voicing)";
  } catch (err) {
    console.error("Playback failed:", err);
    const detail = err && (err.message || err.status) ? (err.message || err.status) : String(err);
    playNote.textContent = `Couldn't play: ${detail}`;
  } finally {
    playBtn.disabled = false;
  }
}

/* ---- Events -------------------------------------------------------------- */

playBtn.addEventListener("click", play);
nextBtn.addEventListener("click", newRound);

document.addEventListener("keydown", (e) => {
  if (!answered) {
    const n = Number(e.key);
    if (n >= 1 && n <= OPTION_COUNT) {
      const btn = optionsEl.querySelectorAll(".option")[n - 1];
      if (btn) btn.click();
    }
  } else if (e.key === "Enter" || e.key === "n" || e.key === "N") {
    newRound();
  }
});

/* ---- Boot ---------------------------------------------------------------- */

if (PIECES.length < 2) {
  scoreEl.textContent = "Add at least two chants in data/chants.js to play.";
  optionsEl.style.display = "none";
} else {
  renderStats();
  newRound();
}
