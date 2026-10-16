#!/usr/bin/env node
// C-E2 probe (D5 pass 2, critic of P-E2): paths the H2 battery films but does not grade, on P-E2's probe app
// (pass-2/E2/probe/App.vue, built unmodified against the patched worktree).
//   node ce2-probe.mjs --build <out>/builds/<label>-probe --label <label> [--engine chromium|webkit] [--shots <dir>]
// Cells (one line each, with the load):
//   handoff pin fwd    Tab into A, +600 ms, Tab to B: per frame, each host's page-frame box and its gap from ITS OWN
//                      footprint (the span the stage put before it). A promoted host must sit on its own footprint in
//                      every frame (gap ≤ 1 px) and move ≤ 4 px in any one frame (per 16.7 ms) while it hands over.
//                      CK-20 (D-1: no one-frame discontinuity on an engagement path), CK-15 (the outgoing exit)
//   handoff pin rev    the same from the after-sentinel with Shift+Tab: B first, then A (A is EARLIER in tree order)
//   hand over keys     Tab into A, +600 ms, then a pointer press on B's thumb held 400 ms: the same reads
//   noveil veil        Tab into A: the veil popover's open state, opacity and computed backdrop-filter (P-E2 §7 item 3)
//   forced colors      (Chromium) Tab into A under forced-colors: active: the veil's display, A's scale, popover state
//   reduced transp.    (Chromium, CDP media feature) the same under prefers-reduced-transparency: reduce
// Every browser is closed in finally; the harness lock serializes it with every D5 harness run.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const shots = typeof a.shots === "string" ? path.resolve(a.shots) : null;
if (shots) fs.mkdirSync(shots, { recursive: true });
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60;
const PIN = 1, STEP = 4;
const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";

// per frame: for hosts A and B, the box, :popover-open, data-engaged, and the gap from the host's own footprint
const film = (ms) => new Promise((ok) => {
  const sel = ['[data-t="slider-a"] .glass-slider', '[data-t="slider-b"] .glass-slider'];
  const fr = []; const t0 = performance.now();
  const tick = () => {
    const row = { t: performance.now() - t0, h: [] };
    for (const s of sel) {
      const e = document.querySelector(s);
      const r = e.getBoundingClientRect();
      const fp = e.previousElementSibling?.classList.contains("engage-footprint") ? e.previousElementSibling : null;
      const q = fp?.getBoundingClientRect();
      const w0 = parseFloat(getComputedStyle(e).width) || r.width;
      // the scale-free gap: the host's box centre against its own footprint's centre
      const gap = q ? Math.hypot((r.left + r.right) / 2 - (q.left + q.right) / 2, (r.top + r.bottom) / 2 - (q.top + q.bottom) / 2) : null;
      row.h.push({ x: r.left + window.scrollX, y: r.top + window.scrollY, cy: (r.top + r.bottom) / 2, s: r.width / w0, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), gap });
    }
    row.fps = document.querySelectorAll(".engage-footprint").length;
    fr.push(row);
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
const maxMove = (fr, i) => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.h[i].x - fr[k].h[i].x, ((x.h[i].cy - fr[k].h[i].cy))) * NOM) / Math.max(NOM, x.t - fr[k].t)));
const maxGap = (fr, i) => Math.max(0, ...fr.filter((x) => x.h[i].pop && x.h[i].gap != null).map((x) => x.h[i].gap));
const popFrames = (fr, i) => fr.filter((x) => x.h[i].pop).length;
const both = (fr) => fr.filter((x) => x.h[0].pop && x.h[1].pop).length;

async function handoff(E, T, how) {
  const P = await openPage(E, T, "slider2");
  try {
    const { page } = P;
    const c0 = await page.evaluate(() => [...document.querySelectorAll(".glass-slider")].map((e) => Math.round(e.getBoundingClientRect().top)));
    if (how === "rev") { await page.focus('[data-sentinel="after"]'); await page.keyboard.press(shift); }
    else { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
    await page.waitForTimeout(600);
    const pr = page.evaluate(film, 700); await page.waitForTimeout(32);
    if (how === "fwd") await page.keyboard.press(tabKey(engine));
    else if (how === "rev") await page.keyboard.press(shift);
    else { const c = await center(page, '[data-t="slider-b"] [role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); }
    if (shots && how !== "ptr") { await page.waitForTimeout(60); await page.screenshot({ path: path.join(shots, `${label}-${engine}-handoff-${how}-60ms.png`) }); }
    const fr = await pr;
    if (how === "ptr") await page.mouse.up();
    return { fr, rest: c0 };
  } finally { await P.close(); }
}

await acquireLock();
console.log(`C-E2 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (const how of ["fwd", "rev", "ptr"]) {
    const { fr, rest } = await handoff(E, T, how);
    const [o, n] = how === "rev" ? [1, 0] : [0, 1]; // outgoing, incoming
    const name = { fwd: "handoff pin fwd (Tab A → B)", rev: "handoff pin rev (Shift+Tab B → A)", ptr: "hand over keys (Tab A, press B)" }[how];
    const gO = maxGap(fr, o), gN = maxGap(fr, n), mO = maxMove(fr, o), mN = maxMove(fr, n);
    const ok = gO <= PIN && gN <= PIN && mO <= STEP && mN <= STEP;
    cell(name, ok ? "PASS" : "FAIL", `rest tops A ${rest[0]} B ${rest[1]} px · frames ${fr.length}, both promoted in ${both(fr)} · outgoing ${"AB"[o]}: promoted ${popFrames(fr, o)} frames, largest gap from its own footprint ${f(gO, 1)} px, largest one-frame move ${f(mO, 1)} px · incoming ${"AB"[n]}: promoted ${popFrames(fr, n)} frames, gap ${f(gN, 1)} px, move ${f(mN, 1)} px (bounds gap ≤ ${PIN}, move ≤ ${STEP} per 16.7 ms)`);
    // the frames where the gap is open, for the record
    const bad = fr.filter((x) => (x.h[o].pop && x.h[o].gap > PIN) || (x.h[n].pop && x.h[n].gap > PIN)).slice(0, 4).map((x) => `t ${f(x.t, 0)} ms: ${"AB"[o]} y ${f(x.h[o].y, 1)} gap ${f(x.h[o].gap, 1)} pop ${x.h[o].pop} · ${"AB"[n]} y ${f(x.h[n].y, 1)} gap ${f(x.h[n].gap, 1)} pop ${x.h[n].pop}`);
    if (bad.length) cell(`${name} frames`, "REPORT", bad.join(" | "));
  }
  // the veil's state on a keyboard engagement (both arms; the noveil arm's invisible plate)
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
      const r = await page.evaluate(() => { const v = document.querySelector("body > .glass-focus-veil"); const cs = v && getComputedStyle(v); const a = document.querySelector('[data-t="slider-a"] .glass-slider'); const ra = a.getBoundingClientRect(); return { open: v?.matches(":popover-open") ?? null, op: cs?.opacity, bf: cs?.backdropFilter ?? cs?.webkitBackdropFilter, disp: cs?.display, eng: v?.hasAttribute("data-engaged"), s: ra.width / parseFloat(getComputedStyle(a).width), pop: a.matches(":popover-open") }; });
      cell("keyboard veil state", "REPORT", `Tab into A: A promoted ${r.pop} ×${f(r.s)} · veil popover open ${r.open}, data-engaged ${r.eng}, display ${r.disp}, opacity ${r.op}, backdrop-filter ${r.bf}`);
    } finally { await P.close(); }
  }
  if (engine === "chromium") {
    for (const mode of ["forced-colors", "reduced-transparency"]) {
      const P = await openPage(E, T, "slider2");
      try {
        const { page } = P;
        if (mode === "forced-colors") await page.emulateMedia({ forcedColors: "active" });
        else { const s = await page.context().newCDPSession(page); await s.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] }); }
        const m = await page.evaluate(() => ({ fc: matchMedia("(forced-colors: active)").matches, prt: matchMedia("(prefers-reduced-transparency: reduce)").matches }));
        const c = await center(page, '[data-t="slider-a"] [role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(700);
        const r = await page.evaluate(() => { const v = document.querySelector("body > .glass-focus-veil"); const cs = v && getComputedStyle(v); const a = document.querySelector('[data-t="slider-a"] .glass-slider'); const ca = getComputedStyle(a); const ra = a.getBoundingClientRect(); return { open: v?.matches(":popover-open") ?? null, op: cs?.opacity, disp: cs?.display, bf: cs?.backdropFilter, s: ra.width / parseFloat(ca.width), pop: a.matches(":popover-open"), bg: ca.backgroundColor, outline: ca.outlineStyle, fcadj: ca.forcedColorAdjust }; });
        if (shots) await page.screenshot({ path: path.join(shots, `${label}-${engine}-${mode}-held.png`) });
        await page.mouse.up();
        cell(`${mode} held`, "REPORT", `media applied fc ${m.fc} prt ${m.prt} · pointer-held A: promoted ${r.pop} ×${f(r.s)}, background ${r.bg}, forced-color-adjust ${r.fcadj} · veil open ${r.open}, display ${r.disp}, opacity ${r.op}, backdrop-filter ${r.bf}`);
      } finally { await P.close(); }
    }
  }
} finally {
  await E.close(); T.close();
}
console.log(`C-E2 probe ${label} · ${engine} · done · load ${load()}`);
