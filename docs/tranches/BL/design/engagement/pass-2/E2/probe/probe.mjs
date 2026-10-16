#!/usr/bin/env node
// P-E2 probe: the paths the H2 harness has no scene for, read in both engines on the probe app (probe/App.vue).
//   node probe.mjs --build <out>/builds/<label>-probe --label <label> [--engine chromium|webkit] [--shots <dir>]
// Cells (PASS/FAIL/REPORT, one line each, with the load):
//   numfield click      a press that does not travel past the slop: no promotion, the caret's field focused
//   numfield scrub      a press that travels: promoted (popover open, data-engaged, veil up), value stepped by
//                       trunc(dx / slop); the value unchanged after release
//   numfield carry      fling minus still: the field's leading edge in the page frame, ≥ 4 px (CK-05's bound)
//   numfield PRM        under reduce: scale ×1 ± 0.002 while scrubbing, the veil kept (the light leg)
//   between landing     a keyed insert between footprint and host during a hold: the footprint re-seated, and the
//                       host's largest one-frame move over the 900 ms after release ≤ 1 px + the same release without
//                       the insert (E-10's bound)
//   dialog escape       a keyboard-engaged slider inside an open Dialog: one Escape disengages and the Dialog stays
//                       open; the second Escape closes it
//   keyfocus            a printable key whose handler focuses the slider by script engages nothing
// Reuses the harness's serving, engine, lock and init (../../harness/lib.mjs). Every browser is closed in finally.
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

const eff = (sel) => (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { s: r.width / (e.offsetWidth || 1), l: r.left, r: r.right, t: r.top, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged") }; };
const veilLevel = () => Math.max(0, ...[...document.querySelectorAll(".glass-focus-veil")].map((v) => +getComputedStyle(v).opacity));
const film = ([sel, ms]) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const e = document.querySelector(sel); const r = e?.getBoundingClientRect(); fr.push({ t: performance.now() - t0, l: r?.left ?? NaN, r: r?.right ?? NaN, y: r?.top ?? NaN }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
const NOM = 1000 / 60;
const maxMove = (fr) => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.y - fr[k].y, x.l - fr[k].l) * NOM) / Math.max(NOM, x.t - fr[k].t)));

await acquireLock();
console.log(`P-E2 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  // ── the NumberField scrub ──────────────────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "numfield");
    try {
      const { page } = P;
      const c = await center(page, ".number-field__input");
      await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.mouse.move(c.x + 4, c.y); await page.waitForTimeout(120);
      const mid = await page.evaluate(eff(".number-field"), ".number-field");
      await page.mouse.up(); await page.waitForTimeout(400);
      const after = await page.evaluate(() => ({ v: window.__e.value(), focus: document.activeElement?.className ?? "", fp: document.querySelectorAll(".engage-footprint").length }));
      cell("numfield click", !mid.pop && !mid.eng && after.v === 50 && /number-field__input/.test(after.focus) ? "PASS" : "FAIL", `4 px of travel: popover ${mid.pop}, engaged ${mid.eng}, value ${after.v} (50), focus on the field ${/number-field__input/.test(after.focus)}, footprints ${after.fp}`);
    } finally { await P.close(); }
  }
  const scrub = async (o, fling) => {
    const P = await openPage(E, T, "numfield", o);
    try {
      const { page } = P;
      const c = await center(page, ".number-field__input");
      const r0 = await page.evaluate(eff(".number-field"), ".number-field");
      await page.mouse.move(c.x, c.y); await page.mouse.down();
      for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      await page.waitForTimeout(450);
      const held = await page.evaluate(eff(".number-field"), ".number-field");
      const veil = await page.evaluate(veilLevel);
      const vHeld = await page.evaluate(() => window.__e.value());
      if (shots && !o.prm && fling) await page.screenshot({ path: path.join(shots, `${label}-${engine}-numfield-scrub-held.png`) });
      // the release: a fling drives three more fast moves and lifts at once; a still release stops 1000 ms first
      for (let k = 4; k <= 6; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      if (!fling) await page.waitForTimeout(1000);
      const vRel = await page.evaluate(() => window.__e.value());
      const pr = page.evaluate(film, [".number-field", 900]);
      await page.mouse.up();
      const fr = await pr;
      await page.waitForTimeout(300);
      const end = await page.evaluate(() => ({ v: window.__e.value(), fp: document.querySelectorAll(".engage-footprint").length, pop: document.querySelector(".number-field")?.matches(":popover-open") }));
      return { r0, held, veil, vHeld, vRel, fr, end };
    } finally { await P.close(); }
  };
  {
    const fl = await scrub({}, true), st = await scrub({}, false);
    const stepped = fl.vHeld - 50;
    cell("numfield scrub", fl.held.pop && fl.held.eng && fl.veil > 0.5 && stepped === Math.trunc(60 / 8) && fl.held.s >= 1.03 ? "PASS" : "FAIL",
      `60 px of travel: popover ${fl.held.pop}, engaged ${fl.held.eng}, scale ×${f(fl.held.s)}, veil ${f(fl.veil, 2)}, value 50 → ${fl.vHeld} (${stepped} steps; trunc(60/8) = 7)`);
    cell("numfield value kept", fl.end.v === fl.vRel && st.end.v === st.vRel && !fl.end.pop && fl.end.fp === 0 ? "PASS" : "FAIL",
      `fling: ${fl.vRel} at release → ${fl.end.v}; still: ${st.vRel} → ${st.end.v}; off the stage ${!fl.end.pop}, footprints ${fl.end.fp}`);
    const lead = (x) => Math.max(...x.fr.map((q) => q.r)) - x.fr.at(-1).r;
    const d = lead(fl) - lead(st);
    cell("numfield carry", d >= 4 ? "PASS" : "FAIL", `leading edge past its rest, page frame: fling ${f(lead(fl), 2)} px, still ${f(lead(st), 2)} px, differential ${f(d, 2)} px (bound ≥ 4); largest one-frame move on release ${f(maxMove(fl.fr), 1)} px`);
  }
  {
    const pr = await scrub({ prm: true }, true);
    cell("numfield PRM", Math.abs(pr.held.s - 1) <= 0.002 && pr.veil > 0.5 && pr.held.pop ? "PASS" : "FAIL", `under reduce, scrubbing: scale ×${f(pr.held.s)}, veil ${f(pr.veil, 2)} (the light leg), promoted ${pr.held.pop}`);
  }
  // ── the keyed re-render landing ────────────────────────────────────────────────────────────────
  {
    const run = async (ins) => {
      const P = await openPage(E, T, "between");
      try {
        const { page } = P;
        const c = await center(page, '[role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(300);
        const holdFilm = page.evaluate(film, [".glass-slider", 400]);
        if (ins) await page.evaluate(() => window.__e.insert());
        const hf = await holdFilm;
        const seat = await page.evaluate(() => { const h = document.querySelector(".glass-slider"); return { adj: h?.previousElementSibling?.classList.contains("engage-footprint") ?? false, before: h?.previousElementSibling?.previousElementSibling?.getAttribute("data-t") ?? null }; });
        const pr = page.evaluate(film, [".glass-slider", 900]); await page.waitForTimeout(32);
        await page.mouse.up();
        return { rel: maxMove(await pr), hold: maxMove(hf), seat };
      } finally { await P.close(); }
    };
    const base = await run(false), ins = await run(true);
    cell("between landing", ins.seat.adj && ins.rel <= base.rel + 1 ? "PASS" : "FAIL",
      `a keyed insert before the held slider: footprint re-seated ${ins.seat.adj} (the inserted node ${ins.seat.before === "inserted" ? "now precedes the footprint" : `precedes: ${ins.seat.before}`}); release, largest one-frame move ${f(ins.rel, 1)} px (without the insert ${f(base.rel, 1)} px; bound ≤ that + 1 px); during the hold the control moved with its slot, largest one-frame move ${f(ins.hold, 1)} px`);
  }
  // ── Escape inside a Dialog ─────────────────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "dialog");
    try {
      const { page } = P;
      await page.waitForSelector('[role="dialog"]');
      let tabs = 0;
      while (tabs < 8 && !(await page.evaluate(() => document.activeElement?.getAttribute("role") === "slider"))) { await page.keyboard.press(tabKey(engine)); tabs++; }
      await page.waitForTimeout(450);
      const eng = await page.evaluate(() => ({ e: !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged"), v: Math.max(0, ...[...document.querySelectorAll("body > .glass-focus-veil")].map((x) => +getComputedStyle(x).opacity)) }));
      if (shots) await page.screenshot({ path: path.join(shots, `${label}-${engine}-dialog-slider-keyboard.png`) });
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      const one = await page.evaluate(() => ({ open: window.__e.open(), dlg: !!document.querySelector('[role="dialog"]'), e: !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged") }));
      await page.keyboard.press("Escape"); await page.waitForTimeout(500);
      const two = await page.evaluate(() => ({ open: window.__e.open() }));
      cell("dialog escape", eng.e && !one.e && one.open && !two.open ? "PASS" : "FAIL", `${tabs} Tab(s) to the thumb: engaged ${eng.e} (stage veil ${f(eng.v, 2)}); first Escape: engaged ${one.e}, Dialog open ${one.open}; second Escape: Dialog open ${two.open}`);
    } finally { await P.close(); }
  }
  // ── a printable key's handler focuses the slider by script ─────────────────────────────────────
  {
    const P = await openPage(E, T, "keyfocus");
    try {
      const { page } = P;
      await page.keyboard.press("k"); await page.waitForTimeout(450);
      const r = await page.evaluate(() => ({ focus: document.activeElement?.getAttribute("role"), e: !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged"), pop: !!document.querySelector(".glass-slider")?.matches(":popover-open"), s: (() => { const h = document.querySelector(".glass-slider"); return h ? h.getBoundingClientRect().width / h.offsetWidth : NaN; })() }));
      cell("keyfocus", r.focus === "slider" && !r.e && !r.pop && Math.abs(r.s - 1) <= 0.002 ? "PASS" : "FAIL", `"k" focuses the thumb by script: focus ${r.focus}, engaged ${r.e}, promoted ${r.pop}, scale ×${f(r.s)}`);
      await page.keyboard.press("ArrowRight"); await page.waitForTimeout(450);
      const k = await page.evaluate(() => !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged"));
      cell("keyfocus then acting key", k ? "PASS" : "FAIL", `ArrowRight after it engages (the control acts on it): ${k}`);
    } finally { await P.close(); }
  }
  // ── frames: the keyboard hand-off, both slider states (Q-3) ───────────────────────────────────
  if (shots) {
    for (const theme of ["light", "dark"]) {
      const P = await openPage(E, T, "slider2", { theme });
      try {
        const { page } = P;
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
        await page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-keyboard-engaged.png`) });
        await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(90);
        await page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-keyboard-handoff-90ms.png`) });
        await page.waitForTimeout(600);
        await page.keyboard.press("Escape"); await page.waitForTimeout(600);
        const c = await center(page, '[data-t="slider-a"] [role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(450);
        await page.screenshot({ path: path.join(shots, `${label}-${engine}-${theme}-pointer-held.png`) });
        await page.mouse.up();
      } finally { await P.close(); }
    }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
console.log(`P-E2 probe ${label} ${engine} · ${out.length - fails} pass, ${fails} fail · load ${load()} at end`);
process.exit(fails ? 1 : 0);
