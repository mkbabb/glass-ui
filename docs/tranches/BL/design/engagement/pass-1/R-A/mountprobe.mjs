#!/usr/bin/env node
// R-A · PORTFOLIO §6 D5-A Q-2: does a state-keyed commit fire on MOUNT? Four mechanisms, injected as CSS onto a
// build of the harness scene app (no library edit), on the Switch mounted checked and the selectable Chip mounted on.
// Each variant puts its pop on `transform` (which multiplies with the component's own `scale`), so the HEAD paint is
// the baseline (V0). Per variant and scene: the mount cell (?on=1&defer=1, sampled 800 ms across __e.mount()) must
// stay quiet (scale range < 0.002), and the commit cell (mounted off, then __e.commit()) must still pop: a guard
// that silences the commit too is vacuous.
//   node mountprobe.mjs <build dir> [chromium|webkit]
import { INIT, Engine, serveTarget, load, f, quiet } from "../../harness/lib.mjs";

const build = process.argv[2]; const engine = process.argv[3] ?? "chromium";
const SEL = { switch: '[role="switch"]', chip: ".glass-chip" };
const ON = { switch: '[data-state="checked"]', chip: ':is([data-state="on"], [aria-pressed="true"])' };
const KF = `@keyframes rA-pop { 35% { transform: scale(1.05); } 60% { transform: scale(0.99); } }
@keyframes rA-pop-off { 35% { transform: scale(1.05); } 60% { transform: scale(0.99); } }`;
const anim = (sel, on, gate = "") => `${KF}
${gate}${sel}${on} { animation: rA-pop var(--spring-panel-duration) var(--ease-standard); }
${gate}${sel}:not(${on}) { animation: rA-pop-off var(--spring-panel-duration) var(--ease-standard); }`;
const VARIANTS = {
  V0_head: () => "/* none: the HEAD paint */",
  V1_keyframes: (s, o) => anim(s, o),
  V2_keyframes_starting_style: (s, o) => anim(s, o) + `\n@starting-style { ${s} { transform: none; } }`,
  V3_keyframes_ready_guard: (s, o) => anim(s, o, "[data-engage-ready]"),
  V4_registered_transition: (s, o) => `@property --rA-c { syntax: "<number>"; inherits: false; initial-value: 0; }
${s} { --rA-c: 0; transform: scale(calc(1 + 0.02 * sin(var(--rA-c) * 180deg))); transition: --rA-c var(--spring-panel-duration) var(--spring-panel); }
${s}${o} { --rA-c: 1; }`,
};
// V3's guard: the attribute a component would stamp one frame after its own mount
const READY = () => new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.querySelectorAll) for (const e of [n, ...n.querySelectorAll("*")]) if (e.matches?.('[role="switch"], .glass-chip')) requestAnimationFrame(() => requestAnimationFrame(() => e.setAttribute("data-engage-ready", ""))); }).observe(document, { childList: true, subtree: true });

const T = await serveTarget({ build }); const E = new Engine(engine); const b = await E.browser();
console.log(`# R-A mountprobe · ${engine} ${E.version} · load ${load()}`);
async function cell(scene, variant, mode) {
  const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage(); await page.addInitScript(INIT); await page.addInitScript(READY);
  const q = mode === "mount" ? "&on=1&defer=1" : "";
  await page.goto(`${T.url}?scene=${scene}&theme=light${q}`, { timeout: 180000 });
  await page.waitForFunction(() => window.__e?.ready === true, null, { timeout: 60000 });
  await page.addStyleTag({ content: VARIANTS[variant](SEL[scene], ON[scene]) });
  await page.waitForTimeout(400);
  const sel = SEL[scene];
  const fr = await page.evaluate(async ([sel, mode]) => { const p = window.__sample(sel, null, 800); if (mode === "mount") await window.__e.mount(); else window.__e.commit(); return p; }, [sel, mode]);
  const attrs = await page.evaluate((sel) => { const e = document.querySelector(sel); return e ? [...e.attributes].filter((a) => /state|pressed|ready/.test(a.name)).map((a) => `${a.name}=${a.value}`).join(" ") : "absent"; }, sel);
  await ctx.close();
  const Q = quiet(fr); const s = fr.filter((x) => x.a).map((x) => x.a.s);
  return { range: Q.range, peak: Math.max(...s), trough: Math.min(...s), attrs, frames: fr.length };
}
for (const scene of ["switch", "chip"]) for (const v of Object.keys(VARIANTS)) {
  const m = await cell(scene, v, "mount"); const c = await cell(scene, v, "commit");
  const mountQuiet = m.range < 0.002; const commitPops = c.range >= 0.015;
  console.log(`${scene.padEnd(6)} ${v.padEnd(28)} mount range ${f(m.range)} ${mountQuiet ? "QUIET" : "POPS"} · commit range ${f(c.range)} peak ${f(c.peak)} ${commitPops ? "POPS" : "SILENT"} · [${m.attrs}] · load ${load()}`);
}
await E.close(); T.close();
