// V-DOTREL node battery — the dot-matrix-relay invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*DOTREL-PHYSICS-BEGIN*/../*DOTREL-PHYSICS-END*/
// from index.html (the SAME code that drives paint). Run: node check.mjs
//
// BAND LAW: [MARKS §n] corpus-derived; [DESIGN] design-law band (roster card 8 /
// codex law 11 / row K law); [REG-LOCK] regression lock; [STRUCT] structural file
// assert. Paint truth is QUEUED-PAINT (PROBE-NOTES.md).

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*DOTREL-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*DOTREL-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.DOTREL = DOTREL;", ctx, { filename: "dotrel-physics.js" });
const DOTREL = ctx.DOTREL;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== the law-11 lifecycle (rise ~0.7s, decay ~3s, peak +16%) ===");
const e = DOTREL.sims.envelope();
check("rise to peak (ms)", e.risePeakMs, 550, 850, "[DESIGN] codex law 11 — rise ~0.7s");
check("decay to 10% after peak (ms)", e.decayTo10Ms, 2500, 4500, "[DESIGN] codex law 11 — decay ~3s class");
check("envelope peak-normalized", e.peakIsOne, 1, 1, "[REG-LOCK] amplitude is the AMP token's alone");
const pa = DOTREL.sims.pulseAmp();
check("luminance peak over ground (ratio)", pa.ratio, 1.155, 1.165, "[DESIGN] law 11 — peak ~+16%, never a strobe");
const co = DOTREL.sims.continuity();
check("max per-60Hz-frame luminance step", co.maxStep, 0, 0.02, "[DESIGN] breathes, never ticks");

console.log("\n=== the wave (a phase field — order, bounds, determinism) ===");
const wo = DOTREL.sims.waveOrder();
check("distance-order violations beyond jitter", wo.violations, 0, 0, "[DESIGN] farther dots never lead the message");
check("jitter bounded by the declared token", wo.jitterBounded, 1, 1, "[DESIGN] parameter-not-sample (H-VOICE P2)");
check("all delays non-negative", wo.delaysNonNeg, 1, 1, "[DESIGN] no dot fires before the relay");
const det = DOTREL.sims.determinism();
check("same seed, same lattice (count)", det.sameCount, 1, 1, "[DESIGN] deterministic across runs");
check("same seed, same jitter (max diff)", det.maxDiff, 0, 0, "[DESIGN] mulberry32, never Math.random");

console.log("\n=== the event window (relay -> park; ZERO idle rAF) ===");
const ew = DOTREL.sims.eventWindow();
check("event duration for the panel (s)", ew.durS, 4, 8, "[DESIGN] travel + rise + decay, then the rAF dies");
check("residual pulse at park", ew.residual, 0, 0.05, "[DESIGN] the still frame is honestly still");
check("hue settled at park (all dots)", ew.settledHue, 1, 1, "[DESIGN] the message fully arrives before rest");
const hs = DOTREL.sims.handshake();
check("--medium-t starts at 0", hs.startsAtZero, 1, 1, "[DESIGN] the co-owned handshake begins with the event");
check("--medium-t monotone", hs.monotone, 1, 1, "[DESIGN] front coverage never retreats");
check("--medium-t ends at 1", hs.endsAtOne, 1, 1, "[DESIGN] the handshake completes");

console.log("\n=== the budget (dot count capped by viewport area) ===");
const b = DOTREL.sims.budget();
check("panel-size lattice (dots)", b.small, 150, 900, "[DESIGN] a real lattice inside the budget");
check("huge viewport hits the hard cap", b.capped, 1, 1, "[DESIGN] the cap is enforced, not aspirational");

console.log("\n=== the hue arc (shortest path — color never travels the long way) ===");
const ha = DOTREL.sims.hueArc();
check("350->10 crosses zero at midpoint", ha.wrapAtZero, 1, 1, "[DESIGN] shortest-arc interpolation");
check("350->10 lands exactly", ha.lands, 10, 10, "[DESIGN] endpoints are exact");
check("midpoint far from the long-way arc", ha.longWay, 1, 1, "[DESIGN] never through the back of the wheel");

console.log("\n=== PRM (still frame with composition preserved) ===");
const pr = DOTREL.sims.prmStill();
check("PRM hue is the target, one step", pr.hueExact, 1, 1, "[DESIGN] state still arrives");
check("PRM has no pulse", pr.noPulse, 1, 1, "[DESIGN] PRM removes physics, never information");

console.log("\n=== our palettes (warm cream ground; sky/dusk accents) ===");
check("calm hue is warm cream", DOTREL.palettes.calm.h, 30, 50, "[DESIGN] our register, not a foreign one");
check("cream hue is warm cream", DOTREL.palettes.cream.h, 30, 50, "[DESIGN]");
check("listening hue is sky", DOTREL.palettes.listening.h, 190, 220, "[DESIGN]");
check("focus hue is dusk violet", DOTREL.palettes.focus.h, 260, 290, "[DESIGN]");
check("palette count (page states)", Object.keys(DOTREL.palettes).length, 3, 6, "[DESIGN] the lattice relays PAGE states only");

console.log("\n=== structural asserts (substrate discipline; comments stripped) ===");
{
  const code = html.replace(/<!--[\s\S]*?-->/g, "");
  check("exactly one canvas, no DOM per dot", (code.match(/<canvas/g) || []).length, 1, 1, "[STRUCT] the procedural-substrate class");
  check("no per-dot elements created", /createElement/.test(code) ? 1 : 0, 0, 0, "[STRUCT] dots are paint, not nodes");
  check("no setInterval, no self-timers", /setInterval|setTimeout/.test(code) ? 1 : 0, 0, 0, "[STRUCT] row K — the lattice never relays itself");
  const parkPath = /raf = 0; paint\(null\)/.test(code) ? 1 : 0;
  check("tick parks on the still frame", parkPath, 1, 1, "[STRUCT] zero idle rAF is written, not hoped");
  const censusScoped = !/function tick[\s\S]*?DOTREL\.build/.test(code.slice(code.indexOf("function tick"), code.indexOf("function relay"))) ? 1 : 0;
  check("census never rebuilt inside tick", censusScoped, 1, 1, "[STRUCT] build/resize only — no per-frame layout reads");
  const resizeOwned = /ResizeObserver\(build\)/.test(code) ? 1 : 0;
  check("resize owns the census", resizeOwned, 1, 1, "[STRUCT] the one licensed layout read");
  const tickBody = code.slice(code.indexOf("function tick"), code.indexOf("// THE ONLY ENTRY"));
  check("no layout reads on the hot path", /getBoundingClientRect|offsetWidth|getComputedStyle/.test(tickBody) ? 1 : 0, 0, 0, "[STRUCT] tick touches canvas + vars only");
  check("no Math.random anywhere", /Math\.random/.test(code) ? 1 : 0, 0, 0, "[STRUCT] seeded jitter only");
  check("no @supports gate", /@supports/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no SVG filter on the hot path", /feTurbulence|filter:\s*url\(/.test(code) ? 1 : 0, 0, 0, "[STRUCT]");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the WebKit shadow trap");
  check("PRM branch present", /prefers-reduced-motion/.test(code) ? 1 : 0, 1, 1, "[STRUCT] still frame, one step");
  const relayEntry = (code.match(/function relay\(/g) || []).length;
  check("one relay entry point", relayEntry, 1, 1, "[STRUCT] page-state controls are the only callers");
  const mediumT = /--medium-t/.test(code) ? 1 : 0;
  check("--medium-t handshake published", mediumT, 1, 1, "[STRUCT] the co-owned scalar rides the event");
  const ariaOK = /role="img"/.test(code) && /role="status"/.test(code) ? 1 : 0;
  check("canvas labeled + status relay present", ariaOK, 1, 1, "[STRUCT] the state speaks in words, not only in dots");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
