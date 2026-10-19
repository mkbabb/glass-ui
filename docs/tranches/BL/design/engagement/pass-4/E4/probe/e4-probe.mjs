#!/usr/bin/env node
// P-E4 probe (D5 pass 4, route E on F5'' + P-A4-light): P-E3's probe (pass-3/E3/probe/e3-probe.mjs) forked, with
// pass 4's changes (REGISTRY §P3-8.1 route E):
//   · the films take NO mid-film screenshot (§P3-7 item 7: a WebKit screenshot stalls the frames it films);
//   · `consumer anchor restored · escape|blur` drives the release to its END (§P3-7 item 6, CK-27): a consumer's inline
//     position-anchor on A, Tab engages, Escape or Tab away, polled until A is off the stage (not engaged, not in the
//     top layer, ×1 ± 0.002), then +300 ms: the consumer's value must be back;
//   · Q-3's pointer arm, read from the label (`every` | `coarse`): `pointer arm fine hold` (a mouse hold: promoted on
//     every, IN PLACE on coarse: engaged, grown ≥ ×1.03, no footprint, not in the top layer, no veil) and `pointer arm
//     touch hold` (promoted on both); the mouse cells that assumed a promotion (scrub, PRM scrub, the re-render landing,
//     forced colours) read the arm's expectation.
// Not a scoring read of a CK witness.
//   node e4-probe.mjs --build <out>/builds/probe-<label> --label <veil|noveil>-<every|coarse> [--engine chromium|webkit] [--shots <dir>]
// Cells (PASS/FAIL/REPORT, one line each, with the load):
//   handoff pin fwd/rev/ptr   C-E2's: Tab A → B; Shift+Tab B → A; Tab A then a pointer press on B. Per frame, each
//                      promoted host's gap from ITS OWN footprint ≤ 1 px and its largest one-frame move ≤ 4 px per
//                      16.7 ms (CK-20: no teleport on any hand-off path)
//   consumer anchor    the same Tab A → B with two consumer elements AFTER the sliders in tree order naming
//                      `--engage-footprint` (pass 2's shared name) and `--engage-footprint-1` as their anchors: neither
//                      captures a promoted control (CK-22, CK-20)
//   numfield click     a press on the input that does not travel past the slop: no promotion, the field focused
//   numfield scrub     a press on the input that travels 60 px: promoted, engaged, ×≥ 1.03, value stepped by
//                      trunc(60 / pitch), the pitch read from the input's computed `--scrub-pitch` (CK-12); NO veil
//                      (level < 0.05, the plate `visibility: hidden`: CK-25)
//   numfield value kept / carry / PRM   P-E2's, the PRM cell now graded on a light leg (≥ 1 paint property of the
//                      field or its input changes while scrubbing) instead of the veil the scrub no longer raises
//   numfield step drift a press on the increment step button that drifts 60 px before release: the button's click
//                      (value +1), no scrub, no promotion (CK-22: the scrub's arming surface)
//   numfield coarse    a touch drag on the input: held, promoted, stepped trunc(60 / pitch), kept after release (a
//                      platform pan that cancels the scrub after its first move FAILs it)
//   between landing, dialog escape, keyfocus, keyfocus then acting key   P-E2's (CK-20, CK-22, CK-04)
//   keyboard veil      Tab into A: the stage veil's state. veil arm: data-engaged, visible, opacity > 0.5. noveil arm:
//                      no data-engaged, `visibility: hidden` (no live backdrop-filter plate: §P2-7 class 11)
//   forced colors / reduced transparency   (Chromium) the stage veil computes display none; the held control stays
//                      promoted (CK-13)
// Shots (CK-25): the scrub's glance set (rest, pressed, held, engaged = Tab focus, committed 90 ms after release,
// released 900 ms after; light and dark; fine and coarse), viewport frames so the world is in them; the keyboard
// engaged and hand-off frames (Q-3). Every page, context and browser closed in finally (lib.mjs openPage/Engine);
// the WebKit engine relaunches every NAV_CAP (60) navigations (H3-1).
import fs from "node:fs";
import path from "node:path";
import { parseArgs, serveTarget, Engine, openPage, openTouchPage, acquireLock, load, f, tabKey, center, paintDiff } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const shots = typeof a.shots === "string" ? path.resolve(a.shots) : null;
const veilArm = !/noveil/.test(label);
const every = /every/.test(label);
if (!every && !/coarse/.test(label)) { console.error(`label ${label} names no pointer arm (every|coarse)`); process.exit(2); }
if (shots) fs.mkdirSync(shots, { recursive: true });
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60;
const PIN = 1, STEP = 4;
const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";
const shotFile = (name) => path.join(shots, `${label}-${engine}-${name}.png`);
const VP = { x: 0, y: 0, width: 700, height: 500 };

const eff = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { s: r.width / (parseFloat(getComputedStyle(e).width) || e.offsetWidth || 1), l: r.left, r: r.right, t: r.top, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), held: e.hasAttribute("data-held") }; };
const veilState = () => { const v = document.querySelector("body > .glass-focus-veil"); if (!v) return { present: false, op: 0, vis: "none", eng: false, open: false, bf: "" }; const cs = getComputedStyle(v); return { present: true, op: +cs.opacity, vis: cs.visibility, eng: v.hasAttribute("data-engaged"), open: v.matches(":popover-open"), bf: cs.backdropFilter ?? cs.webkitBackdropFilter ?? "", disp: cs.display }; };
const filmBox = ([sel, ms]) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const e = document.querySelector(sel); const r = e?.getBoundingClientRect(); fr.push({ t: performance.now() - t0, l: r?.left ?? NaN, r: r?.right ?? NaN, y: r?.top ?? NaN }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
const maxMoveBox = (fr) => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.y - fr[k].y, x.l - fr[k].l) * NOM) / Math.max(NOM, x.t - fr[k].t)));

// C-E2's hand-off film: per frame, for hosts A and B, the box, :popover-open, and the gap from the host's own footprint
const filmPair = (ms) => new Promise((ok) => {
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
      const gap = q ? Math.hypot((r.left + r.right) / 2 - (q.left + q.right) / 2, (r.top + r.bottom) / 2 - (q.top + q.bottom) / 2) : null;
      row.h.push({ x: r.left + window.scrollX, cy: (r.top + r.bottom) / 2, s: r.width / w0, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), gap, anchor: e.style.getPropertyValue("position-anchor"), fpName: fp?.style.getPropertyValue("anchor-name") ?? "" });
    }
    fr.push(row);
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
const maxMove = (fr, i) => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.h[i].x - fr[k].h[i].x, x.h[i].cy - fr[k].h[i].cy) * NOM) / Math.max(NOM, x.t - fr[k].t)));
const maxGap = (fr, i) => Math.max(0, ...fr.filter((x) => x.h[i].pop && x.h[i].gap != null).map((x) => x.h[i].gap));
const popFrames = (fr, i) => fr.filter((x) => x.h[i].pop).length;
const both = (fr) => fr.filter((x) => x.h[0].pop && x.h[1].pop).length;

async function handoff(E, T, how, q = {}) {
  const P = await openPage(E, T, "slider2", { q });
  try {
    const { page } = P;
    if (how === "rev") { await page.focus('[data-sentinel="after"]'); await page.keyboard.press(shift); }
    else { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
    await page.waitForTimeout(600);
    const pr = page.evaluate(filmPair, 700); await page.waitForTimeout(32);
    if (how === "rev") await page.keyboard.press(shift);
    else if (how === "ptr") { const c = await center(page, '[data-t="slider-b"] [role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); }
    else await page.keyboard.press(tabKey(engine));
    const fr = await pr;
    if (how === "ptr") await page.mouse.up();
    return { fr, errors: P.errors };
  } finally { await P.close(); }
}

await acquireLock();
console.log(`P-E4 probe ${label} · ${engine} · keyboard arm ${veilArm ? "veil" : "noveil"} · pointer arm ${every ? "every" : "coarse"} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  // ── CK-20: the hand-off on every path, position graded ─────────────────────────────────────────
  for (const [how, q] of [["fwd", {}], ["rev", {}], ["ptr", {}], ["fwd", { consumerAnchor: "1" }]]) {
    const { fr } = await handoff(E, T, how, q);
    const [o, n] = how === "rev" ? [1, 0] : [0, 1];
    const name = q.consumerAnchor ? "consumer anchor (Tab A → B, consumer anchors named --engage-footprint, --engage-footprint-1)" : { fwd: "handoff pin fwd (Tab A → B)", rev: "handoff pin rev (Shift+Tab B → A)", ptr: "hand over keys (Tab A, press B)" }[how];
    const gO = maxGap(fr, o), gN = maxGap(fr, n), mO = maxMove(fr, o), mN = maxMove(fr, n);
    const names = [...new Set(fr.flatMap((x) => x.h.filter((h) => h.pop).map((h) => `${h.anchor}=${h.fpName}`)))].slice(0, 3).join(", ");
    // a mouse press on B (ptr) engages B in place on arm coarse: B is driven when it is engaged, not promoted
    const inPlaceB = how === "ptr" && !every;
    const engFrames = (i) => fr.filter((x) => x.h[i].eng).length;
    const driven = inPlaceB ? popFrames(fr, o) > 0 && engFrames(n) > 0 && popFrames(fr, n) === 0 : both(fr) > 0 || (popFrames(fr, o) > 0 && popFrames(fr, n) > 0);
    const ok = driven && gO <= PIN && gN <= PIN && mO <= STEP && mN <= STEP;
    cell(name, ok ? "PASS" : driven ? "FAIL" : "FAIL NOT DRIVEN", `${inPlaceB ? `arm coarse: B engaged in place in ${engFrames(n)} frames · ` : ""}frames ${fr.length}, both promoted in ${both(fr)} · outgoing ${"AB"[o]}: promoted ${popFrames(fr, o)} frames, largest gap from its own footprint ${f(gO, 1)} px, largest one-frame move ${f(mO, 1)} px · incoming ${"AB"[n]}: promoted ${popFrames(fr, n)} frames, gap ${f(gN, 1)} px, move ${f(mN, 1)} px (bounds gap ≤ ${PIN}, move ≤ ${STEP} per 16.7 ms) · pins ${names}`);
    const bad = fr.filter((x) => (x.h[o].pop && x.h[o].gap > PIN) || (x.h[n].pop && x.h[n].gap > PIN)).slice(0, 3).map((x) => `t ${f(x.t, 0)} ms: ${"AB"[o]} gap ${f(x.h[o].gap, 1)} · ${"AB"[n]} gap ${f(x.h[n].gap, 1)}`);
    if (bad.length) cell(`${name} frames`, "REPORT", bad.join(" | "));
  }

  // ── CK-22 / CK-27: the consumer's own anchor, the release driven to its end ───────────────────
  for (const how of ["escape", "blur"]) {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      const A = '[data-t="slider-a"] .glass-slider';
      const parsed = await page.evaluate((A) => { const e = document.querySelector(A); e.style.setProperty("position-anchor", "--consumer-own"); return e.style.getPropertyValue("position-anchor"); }, A);
      if (parsed !== "--consumer-own") { cell(`consumer anchor restored · ${how}`, "UNMEASURED", `the engine does not parse an inline position-anchor (read back "${parsed}")`); continue; }
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(500);
      const during = await page.evaluate((A) => { const e = document.querySelector(A); return { v: e.style.getPropertyValue("position-anchor"), pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged") }; }, A);
      await page.keyboard.press(how === "escape" ? "Escape" : tabKey(engine));
      const t0 = Date.now(); let end = null;
      while (Date.now() - t0 < 4000) {
        const x = await page.evaluate((A) => { const e = document.querySelector(A); return { pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), s: e.getBoundingClientRect().width / e.offsetWidth }; }, A);
        if (!x.pop && !x.eng && Math.abs(x.s - 1) <= 0.002) { end = Date.now() - t0; break; }
        await page.waitForTimeout(50);
      }
      await page.waitForTimeout(300);
      const after = await page.evaluate((A) => document.querySelector(A).style.getPropertyValue("position-anchor"), A);
      const driven = during.pop && during.eng && end !== null;
      cell(`consumer anchor restored · ${how}`, !driven ? "FAIL NOT DRIVEN" : after === "--consumer-own" ? "PASS" : "FAIL", `A carries --consumer-own · engaged ${during.eng}, top layer ${during.pop}, value while engaged "${during.v}" · ${how === "escape" ? "Escape" : "Tab away"}: off the stage at ${end ?? "never (4 s)"} ms, then +300 ms: "${after || "(removed)"}" (bound: --consumer-own)`);
    } finally { await P.close(); }
  }

  // ── Q-3's pointer arm ─────────────────────────────────────────────────────────────────────────
  const stageOf = (A) => { const e = document.querySelector(A); const fp = e.previousElementSibling?.classList.contains("engage-footprint"); const v = document.querySelector("body > .glass-focus-veil"); const r = e.getBoundingClientRect(); return { pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), held: e.hasAttribute("data-held"), stage: e.hasAttribute("data-engage-stage"), fp: !!fp, sx: r.width / e.offsetWidth, sy: r.height / e.offsetHeight, veil: !!v?.hasAttribute("data-engaged"), veilOp: v ? +getComputedStyle(v).opacity : 0 }; };
  const armLine = (r) => `held ${r.held}, engaged ${r.eng}, on the stage ${r.stage}, top layer ${r.pop}, footprint ${r.fp}, ×${f(r.sx)} inline / ×${f(r.sy)} block, veil engaged ${r.veil} (opacity ${f(r.veilOp, 2)})`;
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      const c = await center(page, '[data-t="slider-a"] [role="slider"]');
      await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(450);
      const r = await page.evaluate(stageOf, '[data-t="slider-a"] .glass-slider');
      await page.mouse.up(); await page.waitForTimeout(900);
      const z = await page.evaluate(stageOf, '[data-t="slider-a"] .glass-slider');
      const grown = Math.max(r.sx, r.sy) >= 1.03;
      const ok = r.held && r.eng && r.stage && grown && (every ? r.pop && r.fp : !r.pop && !r.fp && !r.veil) && !z.stage && !z.pop && Math.abs(z.sx - 1) <= 0.002;
      cell("pointer arm fine hold", ok ? "PASS" : "FAIL", `arm ${every ? "every (want promoted)" : "coarse (want in place: no top layer, no footprint, no veil)"} · a mouse hold on A, +450 ms: ${armLine(r)} · release +900 ms: on the stage ${z.stage}, ×${f(z.sx)}`);
    } finally { await P.close(); }
  }
  {
    const P = await openTouchPage(E, T, "slider2");
    try {
      const { page } = P;
      const c = await center(page, '[data-t="slider-a"] [role="slider"]');
      await P.touch("touchStart", c.x, c.y); await page.waitForTimeout(450);
      const r = await page.evaluate(stageOf, '[data-t="slider-a"] .glass-slider');
      await P.touch("touchEnd", c.x, c.y); await page.waitForTimeout(900);
      const z = await page.evaluate(stageOf, '[data-t="slider-a"] .glass-slider');
      const ok = r.held && r.eng && r.pop && r.fp && Math.max(r.sx, r.sy) >= 1.03 && !z.stage && !z.pop;
      cell("pointer arm touch hold", !P.modeOk ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${P.modeLine} · arm ${every ? "every" : "coarse"} (want promoted on both) · a touch hold on A, +450 ms: ${armLine(r)} · release +900 ms: on the stage ${z.stage}, top layer ${z.pop}`);
    } finally { await P.close(); }
  }

  // ── the NumberField scrub ──────────────────────────────────────────────────────────────────────
  const pitchOf = (page) => page.evaluate(() => parseFloat(getComputedStyle(document.querySelector(".number-field__input")).getPropertyValue("--scrub-pitch")));
  {
    const P = await openPage(E, T, "numfield");
    try {
      const { page } = P;
      const c = await center(page, ".number-field__input");
      await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.mouse.move(c.x + 4, c.y); await page.waitForTimeout(120);
      const mid = await page.evaluate(eff, ".number-field");
      await page.mouse.up(); await page.waitForTimeout(400);
      const after = await page.evaluate(() => ({ v: window.__e.value(), focus: document.activeElement?.className ?? "", fp: document.querySelectorAll(".engage-footprint").length }));
      cell("numfield click", !mid.pop && !mid.eng && after.v === 50 && /number-field__input/.test(after.focus) ? "PASS" : "FAIL", `4 px of travel: popover ${mid.pop}, engaged ${mid.eng}, value ${after.v} (50), focus on the field ${/number-field__input/.test(after.focus)}, footprints ${after.fp}`);
    } finally { await P.close(); }
  }
  const scrub = async (o, fling) => {
    const P = await openPage(E, T, "numfield", o);
    try {
      const { page } = P;
      const pitch = await pitchOf(page);
      const c = await center(page, ".number-field__input");
      const paint0 = await page.evaluate(() => ({ f: window.__paint(".number-field"), i: window.__paint(".number-field__input") }));
      await page.mouse.move(c.x, c.y); await page.mouse.down();
      for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      await page.waitForTimeout(450);
      const held = await page.evaluate(eff, ".number-field");
      const veil = await page.evaluate(veilState);
      const paint1 = await page.evaluate(() => ({ f: window.__paint(".number-field"), i: window.__paint(".number-field__input") }));
      const vHeld = await page.evaluate(() => window.__e.value());
      for (let k = 4; k <= 6; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      if (!fling) await page.waitForTimeout(1000);
      const vRel = await page.evaluate(() => window.__e.value());
      const pr = page.evaluate(filmBox, [".number-field", 900]);
      await page.mouse.up();
      const fr = await pr;
      await page.waitForTimeout(300);
      const end = await page.evaluate(() => ({ v: window.__e.value(), fp: document.querySelectorAll(".engage-footprint").length, pop: document.querySelector(".number-field")?.matches(":popover-open") }));
      const light = [...paintDiff(paint0.f, paint1.f).map((k) => `field ${k}`), ...paintDiff(paint0.i, paint1.i).map((k) => `input ${k}`)];
      return { pitch, held, veil, vHeld, vRel, fr, end, light, errors: P.errors };
    } finally { await P.close(); }
  };
  {
    const fl = await scrub({}, true), st = await scrub({}, false);
    const stepped = fl.vHeld - 50, want = fl.pitch > 0 ? Math.trunc(60 / fl.pitch) : NaN;
    cell("numfield scrub", fl.held.pop === every && fl.held.eng && stepped === want && fl.held.s >= 1.03 && fl.veil.op < 0.05 && !fl.veil.eng && fl.veil.vis !== "visible" ? "PASS" : "FAIL",
      `60 px of travel (a mouse: promoted only on arm every): popover ${fl.held.pop}, engaged ${fl.held.eng}, scale ×${f(fl.held.s)}, value 50 → ${fl.vHeld} (${stepped} steps; pitch ${f(fl.pitch, 2)} px from --scrub-pitch, trunc(60/pitch) = ${want}; the slop would give 7) · veil: data-engaged ${fl.veil.eng}, opacity ${f(fl.veil.op, 2)}, visibility ${fl.veil.vis} (no veil wanted) · console errors ${fl.errors.length}`);
    cell("numfield value kept", fl.end.v === fl.vRel && st.end.v === st.vRel && !fl.end.pop && fl.end.fp === 0 ? "PASS" : "FAIL",
      `fling: ${fl.vRel} at release → ${fl.end.v}; still: ${st.vRel} → ${st.end.v}; off the stage ${!fl.end.pop}, footprints ${fl.end.fp}`);
    const lead = (x) => Math.max(...x.fr.map((q) => q.r)) - x.fr.at(-1).r;
    const d = lead(fl) - lead(st);
    cell("numfield carry", d >= 4 ? "PASS" : "FAIL", `leading edge past its rest, page frame: fling ${f(lead(fl), 2)} px, still ${f(lead(st), 2)} px, differential ${f(d, 2)} px (bound ≥ 4); largest one-frame move on release ${f(maxMoveBox(fl.fr), 1)} px`);
    const pr = await scrub({ prm: true }, true);
    cell("numfield PRM", Math.abs(pr.held.s - 1) <= 0.002 && pr.held.pop === every && pr.held.eng && pr.light.length > 0 ? "PASS" : "FAIL", `under reduce, scrubbing: scale ×${f(pr.held.s)}, promoted ${pr.held.pop} (want ${every}), engaged ${pr.held.eng}, light leg [${pr.light.join(", ")}] (≥ 1 paint property), value 50 → ${pr.vHeld}`);
  }
  {
    const P = await openPage(E, T, "numfield");
    try {
      const { page } = P;
      const c = await center(page, '[data-slot="increment"], .number-field__step--increment');
      await page.mouse.move(c.x, c.y); await page.mouse.down();
      for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      await page.waitForTimeout(200);
      const mid = await page.evaluate(eff, ".number-field");
      await page.mouse.up(); await page.waitForTimeout(400);
      const v = await page.evaluate(() => window.__e.value());
      cell("numfield step drift", !mid.pop && !mid.held && v <= 51 && v >= 50 ? "PASS" : "FAIL", `a press on the increment button drifting 60 px: held ${mid.held}, promoted ${mid.pop}, value 50 → ${v} (the button's own press: 50 or 51; a scrub would step ≥ 6)`);
    } finally { await P.close(); }
  }
  {
    // the coarse scrub: a touch drag on the input (REPORT: what the platform does with a horizontal touch drag)
    const P = await openTouchPage(E, T, "numfield");
    try {
      const { page } = P;
      const c = await center(page, ".number-field__input");
      await P.touch("touchStart", c.x, c.y);
      for (let k = 1; k <= 3; k++) { await P.touch("touchMove", c.x + 20 * k, c.y); await page.waitForTimeout(16); }
      await page.waitForTimeout(450);
      const held = await page.evaluate(eff, ".number-field");
      const v = await page.evaluate(() => window.__e.value());
      const ta = await page.evaluate(() => getComputedStyle(document.querySelector(".number-field__input")).touchAction);
      await P.touch("touchEnd", c.x + 60, c.y); await page.waitForTimeout(500);
      const v2 = await page.evaluate(() => window.__e.value());
      const pitch = await pitchOf(page), want = pitch > 0 ? Math.trunc(60 / pitch) : NaN;
      cell("numfield coarse", !P.modeOk ? "UNMEASURED" : held?.held && held?.pop && v - 50 === want && v2 === v ? "PASS" : "FAIL", `${P.modeLine} · touch drag 60 px on the input: held ${held?.held}, promoted ${held?.pop}, scale ×${f(held?.s)}, value 50 → ${v} (want ${want} steps at pitch ${f(pitch, 2)} px; after release ${v2}); input touch-action ${ta}`);
    } finally { await P.close(); }
  }

  // ── the keyed re-render landing (CK-20) ────────────────────────────────────────────────────────
  {
    const run = async (ins) => {
      const P = await openPage(E, T, "between");
      try {
        const { page } = P;
        const c = await center(page, '[role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(300);
        const holdFilm = page.evaluate(filmBox, [".glass-slider", 400]);
        if (ins) await page.evaluate(() => window.__e.insert());
        const hf = await holdFilm;
        const seat = await page.evaluate(() => { const h = document.querySelector(".glass-slider"); const fp = h?.previousElementSibling?.classList.contains("engage-footprint") ?? false; return { adj: fp, pop: !!h?.matches(":popover-open"), eng: !!h?.hasAttribute("data-engaged"), before: (fp ? h.previousElementSibling.previousElementSibling : h?.previousElementSibling)?.getAttribute("data-t") ?? null }; });
        const pr = page.evaluate(filmBox, [".glass-slider", 900]); await page.waitForTimeout(32);
        await page.mouse.up();
        return { rel: maxMoveBox(await pr), hold: maxMoveBox(hf), seat };
      } finally { await P.close(); }
    };
    const base = await run(false), ins = await run(true);
    // promoted (arm every): the footprint is re-seated and the landing glides. In place (arm coarse): no footprint, and
    // the 40 px the insert moves the held control is travelled, not jumped (largest one-frame move < half of it)
    const ok = every ? ins.seat.adj && ins.rel <= base.rel + 1 : ins.seat.eng && !ins.seat.pop && !ins.seat.adj && ins.hold < 20 && ins.rel <= base.rel + 1;
    cell("between landing", ok ? "PASS" : "FAIL",
      `arm ${every ? "every" : "coarse"} · a keyed insert (40 px) before the held slider: engaged ${ins.seat.eng}, top layer ${ins.seat.pop}, footprint re-seated ${ins.seat.adj} (before it: ${ins.seat.before}); during the hold, largest one-frame move ${f(ins.hold, 1)} px${every ? "" : " (bound < 20)"}; release, largest one-frame move ${f(ins.rel, 1)} px (without the insert ${f(base.rel, 1)} px; bound ≤ that + 1 px)`);
  }
  // ── Escape inside a Dialog (CK-22) ─────────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "dialog");
    try {
      const { page } = P;
      await page.waitForSelector('[role="dialog"]');
      let tabs = 0;
      while (tabs < 8 && !(await page.evaluate(() => document.activeElement?.getAttribute("role") === "slider"))) { await page.keyboard.press(tabKey(engine)); tabs++; }
      await page.waitForTimeout(450);
      const eng = await page.evaluate(() => !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged"));
      await page.keyboard.press("Escape"); await page.waitForTimeout(400);
      const one = await page.evaluate(() => ({ open: window.__e.open(), e: !!document.querySelector(".glass-slider")?.hasAttribute("data-engaged") }));
      await page.keyboard.press("Escape"); await page.waitForTimeout(500);
      const two = await page.evaluate(() => ({ open: window.__e.open() }));
      cell("dialog escape", eng && !one.e && one.open && !two.open ? "PASS" : "FAIL", `${tabs} Tab(s) to the thumb: engaged ${eng}; first Escape: engaged ${one.e}, Dialog open ${one.open}; second Escape: Dialog open ${two.open}`);
    } finally { await P.close(); }
  }
  // ── CK-04: a printable key's handler focuses the slider by script ──────────────────────────────
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
  // ── the keyboard veil's state (Q-3's arm; §P2-7 class 11's open plate) ─────────────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
      const r = await page.evaluate(veilState);
      const ok = veilArm ? r.eng && r.vis === "visible" && r.op > 0.5 : !r.eng && r.vis === "hidden";
      cell("keyboard veil", ok ? "PASS" : "FAIL", `arm ${veilArm ? "veil" : "noveil"} · Tab into A: veil popover open ${r.open}, data-engaged ${r.eng}, visibility ${r.vis}, opacity ${f(r.op, 2)}, backdrop-filter ${r.bf} (${veilArm ? "want engaged, visible" : "want no data-engaged and visibility hidden: no live plate"})`);
      await page.keyboard.press("Escape"); await page.waitForTimeout(900);
      const z = await page.evaluate(veilState);
      cell("veil after release", !z.eng && (z.vis === "hidden" || !z.open) ? "PASS" : "FAIL", `Escape, +900 ms: open ${z.open}, data-engaged ${z.eng}, visibility ${z.vis}, opacity ${f(z.op, 2)}`);
    } finally { await P.close(); }
  }
  // ── CK-13: the stage under forced colours and reduced transparency (Chromium emulates both) ────
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
        const r = await page.evaluate(() => { const v = document.querySelector("body > .glass-focus-veil"); const cs = v && getComputedStyle(v); const a = document.querySelector('[data-t="slider-a"] .glass-slider'); const ra = a.getBoundingClientRect(); return { disp: cs?.display, s: ra.width / parseFloat(getComputedStyle(a).width), pop: a.matches(":popover-open"), bg: getComputedStyle(a).backgroundColor }; });
        if (shots) await page.screenshot({ path: shotFile(`${mode}-held`) });
        await page.mouse.up();
        const applied = mode === "forced-colors" ? m.fc : m.prt;
        const vOk = every ? r.disp === "none" && r.pop : !r.pop && r.s >= 1.03;
        cell(`${mode} held`, applied && vOk ? "PASS" : applied ? "FAIL" : "UNMEASURED", `media applied ${applied} · arm ${every ? "every" : "coarse"} · pointer-held A: promoted ${r.pop} ×${f(r.s)}, background ${r.bg} · veil display ${r.disp} (${every ? "the arm: removed" : "in place: no veil raised, the grow kept"})`);
      } finally { await P.close(); }
    }
  } else cell("forced-colors / reduced-transparency held", "UNMEASURED", "Playwright WebKit applies neither query (the engine's limit, not a pass)");

  // ── CK-25 frames ───────────────────────────────────────────────────────────────────────────────
  if (shots) {
    for (const theme of ["light", "dark"]) {
      // the scrub's glance set, fine
      {
        const snap = async (P, st) => { await P.page.screenshot({ path: shotFile(`fine-${theme}-numfield-${st}`), clip: VP }); };
        let P = await openPage(E, T, "numfield", { theme });
        try {
          const { page } = P;
          const c = await center(page, ".number-field__input");
          await page.mouse.move(c.x + 200, c.y + 150); await page.waitForTimeout(300); await snap(P, "rest");
          await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(120); await snap(P, "pressed");
          for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 20 * k, c.y); await page.waitForTimeout(16); }
          await page.waitForTimeout(450); await snap(P, "held");
          await page.mouse.up(); await page.waitForTimeout(90); await snap(P, "committed");
          await page.waitForTimeout(810); await snap(P, "released");
        } finally { await P.close(); }
        P = await openPage(E, T, "numfield", { theme });
        try {
          const { page } = P;
          await page.focus('[data-sentinel="before"]');
          for (let k = 0; k < 4 && !(await page.evaluate(() => document.activeElement?.classList.contains("number-field__input"))); k++) await page.keyboard.press(tabKey(engine));
          await page.waitForTimeout(450);
          await page.screenshot({ path: shotFile(`fine-${theme}-numfield-engaged`), clip: VP });
        } finally { await P.close(); }
      }
      // the scrub's glance set, coarse (touch)
      {
        const P = await openTouchPage(E, T, "numfield", { theme });
        try {
          const { page } = P;
          const snap = async (st) => { const file = shotFile(`coarse-${theme}-numfield-${st}`); if (P.shot) fs.writeFileSync(file, await P.shot(VP)); else await page.screenshot({ path: file, clip: VP }); };
          const c = await center(page, ".number-field__input");
          await page.waitForTimeout(300); await snap("rest");
          await P.touch("touchStart", c.x, c.y); await page.waitForTimeout(120); await snap("pressed");
          for (let k = 1; k <= 3; k++) { await P.touch("touchMove", c.x + 20 * k, c.y); await page.waitForTimeout(16); }
          await page.waitForTimeout(450); await snap("held"); await snap("engaged");
          await P.touch("touchEnd", c.x + 60, c.y); await page.waitForTimeout(90); await snap("committed");
          await page.waitForTimeout(810); await snap("released");
        } finally { await P.close(); }
      }
      // the keyboard engagement and the hand-off (Q-3), and the pointer hold
      {
        const P = await openPage(E, T, "slider2", { theme });
        try {
          const { page } = P;
          await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
          await page.screenshot({ path: shotFile(`${theme}-keyboard-engaged`) });
          await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(90);
          await page.screenshot({ path: shotFile(`${theme}-keyboard-handoff-90ms`) });
          await page.waitForTimeout(600);
          await page.keyboard.press("Escape"); await page.waitForTimeout(600);
          const c = await center(page, '[data-t="slider-a"] [role="slider"]');
          await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(450);
          await page.screenshot({ path: shotFile(`${theme}-pointer-held`) });
          await page.mouse.up();
        } finally { await P.close(); }
      }
    }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`e4-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
