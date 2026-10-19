// C-A4 probe (D5 pass 4 critic of route A): two adversarial reads of P-A4's two new mechanisms that no witness drives.
// Not a witness; every cell prints REPORT, PASS or FAIL with its numbers and the 1/5/15-minute load at its end.
//   node ca4-probe.mjs --build <dir> [--engine chromium|webkit] [--only rebound,scrollflash,cardpress]
//   rebound      (P-A4's fill-clock delay on the control bit's light, CK-02/CK-20): a programmatic commit, then the
//                reverse commit G ms later (G = 60, 200), filmed per animation frame for 900 ms: the light layer's
//                opacity × alpha and the model. Each commit edge lights the face (both edges, by the recipe). FAIL
//                when the light, mid-flight (> 0.01), holds still for 60 ms or more (a stall in a moving light: D-1).
//                REPORT the pulse count over the two commits, and the single commit's onset and peak against
//                ACKNOWLEDGE_WINDOW_MS (150).
//   scrollflash  (P-A4's press on `pointerdown`, CK-06/CK-14): a coarse touch that lands on a ToggleGroupItem and
//                moves 48 px up in 6 steps (a scroll), on a page made scrollable. Read per step: the door's press mark,
//                the target's painted background, the page's scroll, and whether the model changed. A scroll that
//                commits FAILs; the press mark's lifetime during the scroll is REPORTed. Playwright WebKit on macOS
//                has no touch scrolling (HARNESS.md §1.4), so its cell reads whether the drag commits, with the scroll
//                UNMEASURED.
// One browser per run, a fresh context per cell, every page and context closed in a finally, the browser at the end.
import { parseArgs, serveTarget, Engine, openPage, openTouchPage, center, load } from "../../../harness/lib.mjs";

const a = parseArgs();
const E = new Engine(a.engine ?? "chromium");
const T = await serveTarget({ build: a.build });
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const want = (k) => !only || only.has(k);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const LIGHT_REST = 0.004;
console.log(`# ca4-probe engine ${E.name} load ${load()} at start`);

const FILM = (gap) => new Promise((res) => {
  const face = () => document.querySelector('[data-e~="target"] .control-bit__face') ?? document.querySelector(".control-bit__face");
  const al = (c) => { const m = c.match(/\/\s*([\d.]+)\)$/) ?? c.match(/rgba\([^)]*,\s*([\d.]+)\)$/); return m ? +m[1] : (c.startsWith("rgb(") || c.startsWith("color(") ? 1 : 0); };
  const rd = () => { const l = face()?.querySelector("[data-engage-light]"); if (!l) return null; const cs = getComputedStyle(l); return +cs.opacity * al(cs.backgroundColor); };
  const fr = []; const t0 = performance.now(); const pre = rd();
  window.__e.commit();
  let flipped = gap == null;
  const tick = () => {
    const t = performance.now() - t0;
    if (!flipped && t >= gap) { window.__e.commit(); flipped = true; fr.push({ t, flip: true }); }
    fr.push({ t, light: rd(), state: JSON.stringify(window.__e.state()) });
    if (t < 900) requestAnimationFrame(tick); else res({ pre, fr });
  };
  requestAnimationFrame(tick);
});

try {
  if (want("rebound")) for (const sc of ["switch", "checkbox"]) for (const theme of ["light", "dark"]) {
    for (const gap of [null, 60, 200]) {
      const P = await openPage(E, T, sc, { theme });
      try {
        await sleep(300);
        const state0 = await P.page.evaluate(() => JSON.stringify(window.__e.state()));
        const { pre, fr } = await P.page.evaluate(FILM, gap);
        const rows = fr.filter((x) => !x.flip && x.light != null);
        const peak = rows.reduce((m, x) => (x.light > m.light ? x : m), { light: -1, t: 0 });
        const flipT = fr.find((x) => x.flip)?.t;
        const trace = rows.filter((_, k) => k % 3 === 0).map((x) => `+${x.t.toFixed(0)} ${x.light.toFixed(3)}${x.state === state0 ? "" : "*"}`).join(" ");
        const onset = rows.find((x) => x.light > LIGHT_REST);
        // pulses: local maxima above 0.02; freeze: the longest run of frames whose light is > 0.01 and unchanged (±0.0005)
        const pulses = rows.filter((x, k) => k > 0 && k < rows.length - 1 && x.light > 0.02 && x.light >= rows[k - 1].light && x.light > rows[k + 1].light).length;
        let fz = 0, f0 = null;
        for (let k = 1; k < rows.length; k++) {
          const flat = rows[k].light > 0.01 && Math.abs(rows[k].light - rows[k - 1].light) <= 0.0005;
          if (flat) { if (f0 == null) f0 = rows[k - 1].t; fz = Math.max(fz, rows[k].t - f0); } else f0 = null;
        }
        if (gap == null) console.log(`  REPORT rebound ${sc} ${theme} single commit · onset (light > ${LIGHT_REST}) +${onset ? onset.t.toFixed(0) : "none"} ms · peak ${peak.light.toFixed(3)} at +${peak.t.toFixed(0)} ms (ACKNOWLEDGE_WINDOW_MS 150) · pulses ${pulses} · ${trace} · load ${load()}`);
        else {
          const bad = fz >= 60;
          console.log(`  ${bad ? "FAIL" : "PASS"}       rebound ${sc} ${theme} reverse at +${gap} ms (state back at +${flipT?.toFixed(0)}) · light frozen mid-flight ${fz.toFixed(0)} ms (D-1 bound < 60) · pulses ${pulses} over two commits · peak ${peak.light.toFixed(3)} at +${peak.t.toFixed(0)} · ${trace} (* = first commit's state) · load ${load()}`);
        }
      } finally { await P.close(); }
    }
  }

  if (want("scrollflash")) for (const theme of ["light", "dark"]) for (let rep = 1; rep <= 3; rep++) {
    const Q = await openTouchPage(E, T, "toggle", { theme });
    try {
      await Q.page.evaluate(() => { document.body.style.minHeight = "3000px"; });
      await Q.page.waitForTimeout(250);
      const sel = '[data-e~="target"]';
      const c = await center(Q.page, sel);
      const rd = () => Q.page.evaluate((s) => { const e = document.querySelector(s); return { p: !!(e.hasAttribute("data-press") || e.closest("[data-press]")), bg: getComputedStyle(e).backgroundColor, y: Math.round(scrollY), st: JSON.stringify(window.__e.state()) }; }, sel);
      const s0 = await rd();
      const steps = [];
      await Q.touch("touchStart", c.x, c.y); const t0 = Date.now();
      await Q.page.waitForTimeout(16); steps.push({ t: Date.now() - t0, ...(await rd()) });
      for (let k = 1; k <= 6; k++) { await Q.touch("touchMove", c.x, c.y - 8 * k); await Q.page.waitForTimeout(16); steps.push({ t: Date.now() - t0, ...(await rd()) }); }
      await Q.touch("touchEnd", c.x, c.y - 48); await Q.page.waitForTimeout(400); const end = await rd();
      const pressMs = steps.filter((x) => x.p).map((x) => x.t);
      const scrolled = Math.max(...steps.map((x) => x.y), end.y) - s0.y;
      const committed = end.st !== s0.st;
      const scrollNote = E.name === "webkit" ? "scroll UNMEASURED (macOS WebKit has no touch scrolling)" : `page scrolled ${scrolled} px`;
      console.log(`  ${committed && scrolled > 0 ? "FAIL" : committed ? "REPORT" : "PASS"}${" ".repeat(6)} scrollflash toggle ${theme} rep ${rep} · ${scrollNote} · committed ${committed} (${s0.st} → ${end.st}) · press mark on ${pressMs.length}/${steps.length} reads${pressMs.length ? ` (+${pressMs[0]}..+${pressMs.at(-1)} ms)` : ""} · rest bg ${s0.bg} · ${steps.map((x) => `+${x.t} ${x.p ? "P" : "-"} y${x.y}`).join(" ")} · end ${end.p ? "P" : "-"} ${end.bg} · load ${load()}`);
    } finally { await Q.close(); }
  }

  // cardpress (CK-06's class on a member no E-5 scene carries): a held coarse touch on the selectable Card, whose press
  // is still `scale: var(--scale-press-sm)` on `:active` (card/styles.css). Read every 25 ms: computed scale, :active,
  // the door's press mark. FAIL when the press's first visible frame lands after ACKNOWLEDGE_WINDOW_MS (150).
  if (want("cardpress")) for (const theme of ["light"]) for (let rep = 1; rep <= 3; rep++) {
    const Q = await openTouchPage(E, T, "gallery", { theme });
    try {
      await Q.page.waitForTimeout(300);
      const sel = '.card[role="option"]';
      const has = await Q.page.evaluate((s) => !!document.querySelector(s), sel);
      if (!has) { console.log(`  UNMEASURED cardpress rep ${rep} · no ${sel} in the gallery scene · load ${load()}`); continue; }
      await Q.page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center" }), sel);
      await Q.page.waitForTimeout(150);
      const c = await center(Q.page, sel);
      const rd = () => Q.page.evaluate((s) => { const e = document.querySelector(s); const cs = getComputedStyle(e); return `${cs.scale}${e.matches(":active") ? " A" : ""}${e.hasAttribute("data-press") ? " P" : ""}`; }, sel);
      const rest = await rd();
      const times = Array.from({ length: 25 }, (_, k) => k * 25);
      const xs = await Q.holdAt(c.x, c.y, times, rd);
      const first = xs.findIndex((v) => v.split(" ")[0] !== rest.split(" ")[0]);
      const runs = []; let prev = null; xs.forEach((v, k) => { if (v !== prev) runs.push(`+${times[k]} ${v}`); prev = v; });
      const on = first < 0 ? null : times[first];
      console.log(`  ${on == null || on > 150 ? "FAIL" : "PASS"}       cardpress ${theme} rep ${rep} · first visible press +${on ?? "never"} ms (ACKNOWLEDGE_WINDOW_MS 150) · rest ${rest} · ${runs.join(" | ")} · load ${load()}`);
    } finally { await Q.close(); }
  }
} finally { await E.close(); T.close(); }
