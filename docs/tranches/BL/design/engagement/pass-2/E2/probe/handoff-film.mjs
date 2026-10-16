#!/usr/bin/env node
// P-E2: film the keyboard hand-off A → B on the probe app's slider2 scene, every frame for 700 ms: A's scale, whether A
// is still on the stage (popover open), and the veil's opacity. Answers "does A leave the top layer before its exit ends".
//   node handoff-film.mjs --build <out>/builds/<label>-probe [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey } from "../../../harness/lib.mjs";
const a = parseArgs(); const engine = typeof a.engine === "string" ? a.engine : "chromium";
await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine);
try {
  const P = await openPage(E, T, "slider2");
  try {
    const { page } = P;
    await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
    const pr = page.evaluate((ms) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => {
      const A = document.querySelector('[data-t="slider-a"] .glass-slider'), B = document.querySelector('[data-t="slider-b"] .glass-slider'), v = document.querySelector("body > .glass-focus-veil");
      fr.push({ t: Math.round(performance.now() - t0), a: A.getBoundingClientRect().width / A.offsetWidth, aPop: A.matches(":popover-open"), aEng: A.hasAttribute("data-engaged"), b: B.getBoundingClientRect().width / B.offsetWidth, bPop: B.matches(":popover-open"), veil: v ? +getComputedStyle(v).opacity : -1, anims: A.getAnimations({ subtree: true }).map((x) => `${x.transitionProperty ?? x.animationName ?? "waapi"}:${x.playState}`).join(",") });
      if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); }), 700);
    await page.waitForTimeout(32); await page.keyboard.press(tabKey(engine));
    const fr = await pr;
    for (const x of fr.filter((_, i) => i % 3 === 0)) console.log(`t ${x.t} ms · A ×${f(x.a)} pop ${x.aPop} eng ${x.aEng} [${x.anims}] · B ×${f(x.b)} pop ${x.bPop} · veil ${f(x.veil, 2)}`);
    console.log(`A leaves the top layer at ${fr.find((x, i) => i > 0 && !x.aPop)?.t ?? "never"} ms; A reaches ×1.000 at ${fr.find((x) => !x.aEng && Math.abs(x.a - 1) < 0.0005)?.t ?? "never"} ms · ${engine} · load ${load()}`);
  } finally { await P.close(); }
} finally { await E.close(); T.close(); }
