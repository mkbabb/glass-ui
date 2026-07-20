// V-VAPOR node battery — the vaporize-dissolve invariants provable without paint.
// verified-model: claude-fable-5. Extracts /*VAPOR-PHYSICS-BEGIN*/../*VAPOR-PHYSICS-END*/
// from index.html (the SAME code that drives paint) AND decodes the three build-time
// noise-mask PNGs straight out of the CSS. Run: node check.mjs
//
// BAND LAW: [MARKS §n] corpus-derived; [DESIGN] design-law band (roster card 4 /
// codex law 8 / law 14a); [REG-LOCK] regression lock; [STRUCT] structural file assert.

import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const m = html.match(/\/\*VAPOR-PHYSICS-BEGIN\*\/([\s\S]*?)\/\*VAPOR-PHYSICS-END\*\//);
if (!m) { console.error("FAIL: physics block markers not found"); process.exit(1); }
const ctx = vm.createContext({ Math, console });
vm.runInContext(m[1] + "\nthis.VAPOR = VAPOR;", ctx, { filename: "vapor-physics.js" });
const VAPOR = ctx.VAPOR;

let failures = 0;
function check(name, value, lo, hi, note = "") {
  const ok = value >= lo && value <= hi;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name.padEnd(46)} ${String(typeof value === "number" ? +value.toFixed(3) : value).padStart(10)}  band [${lo}, ${hi}] ${note}`);
  return ok;
}

console.log("=== release decision (law 7c velocity projection, tau 0.2s) ===");
const tt = VAPOR.sims.releaseTruthTable();
check("slow drift at 0.30 returns", tt.slowLow, 0, 0, "[DESIGN] projected 0.34 < 0.5");
check("flick at 0.25 commits", tt.flickLow, 1, 1, "[DESIGN] projected 0.61 — flicks go ballistic");
check("thrown back down at 0.60 returns", tt.highDown, 0, 0, "[DESIGN] projection is signed");
check("placed past half commits", tt.highRest, 1, 1, "[DESIGN] position alone suffices at rest");

console.log("\n=== the release snap (law 14a class: duration-stable, velocity absorbed) ===");
const s0 = VAPOR.sims.snapSettle(0), s15 = VAPOR.sims.snapSettle(1.5), s3 = VAPOR.sims.snapSettle(3);
check("settle from v0=0 (ms)", s0.settleMs, 400, 750, "[DESIGN] law-14a settle class");
check("settle from v0=3 (ms)", s3.settleMs, 400, 750, "[DESIGN] same class at a hot seed");
check("duration stability (max/min)", Math.max(s0.settleMs, s15.settleMs, s3.settleMs) / Math.min(s0.settleMs, s15.settleMs, s3.settleMs), 1.0, 1.35, "[DESIGN] the spring absorbs v0 as an initial condition");
check("overshoot at v0=0 (frac)", s0.overshoot, 0, 0.001, "[MARKS C2] zero-seed lands dead — overshoot is velocity-bought");
check("overshoot at v0=3 (frac)", s3.overshoot, 0, 0.10, "[DESIGN] the [0,10%] preset fence");

console.log("\n=== the catch (scrub seizes a live snap — the honest seam claims, M3 cure) ===");
const cc = VAPOR.sims.catchContinuity();
check("catch seed reproduces the caught value", cc.seedErr, 0, 1e-9, "[STRUCT] the d0=d seed law through the pointermove clamp (the old self-compare gate could never fail)");
check("snap max per-frame step (240Hz)", cc.maxFrameStep, 0, 0.03, "[DESIGN] no teleport frame for a scrub to seize mid-jump; the seam itself is C0 BY DESIGN — the finger owns v");
check("catch happens mid-flight", cc.xAtCatch, 0.45, 0.99, "[REG-LOCK] ~80ms into a hot snap");

console.log("\n=== the close order (F5/N8 inversion: content out -> beat -> medium) ===");
const co = VAPOR.sims.closeOrder();
check("content fully out (ms from commit)", co.contentOutMs, 150, 700, "[DESIGN] the ladder completes inside the snap; fired-path re-band toward the ~170-250ms exit class is a pass-3 video decision (DESIGN m1)");
check("empty-medium beat (ms)", co.beatMs, 100, 200, "[MARKS §5, C6-confirmed] the signature moment");
check("medium relax NAKED (ms)", co.mediumTailMs - co.beatMs, 390, 460, "[MARKS §5] relax ~400-450ms class — judged alone, never beat-summed (M7 cure)");
check("medium tail after content (ms)", co.mediumTailMs, 500, 620, "[DESIGN] beat + relax");
{
  const cssBeat = +(html.match(/--beat-ms:\s*([\d.]+)/) || [])[1];
  const cssRelax = +(html.match(/--medium-relax-ms:\s*([\d.]+)/) || [])[1];
  check("CSS beat equals physics (ms)", Math.abs(cssBeat - VAPOR.close.beatMs), 0, 0.5, "[STRUCT] the hand-mirror cannot drift (M7 cure)");
  check("CSS relax equals 3*tau (ms)", Math.abs(cssRelax - 3 * VAPOR.close.mediumTau * 1000), 0, 0.5, "[STRUCT]");
}

console.log("\n=== the ladder (coarse -> mid -> fine; continuous; clean at both ends) ===");
const ls = VAPOR.sims.ladderShape();
check("max per-0.002-step opacity jump", ls.maxStep, 0, 0.02, "[DESIGN] every band is continuous — scrub-reversible");
check("band peak order body<C<M", ls.orderOK, 1, 1, "[DESIGN] the erosion ladder reads coarse to fine");
check("all layers gone at d=1", ls.endsClean, 1, 1, "[DESIGN] content leaves fully before the medium relaxes");
check("rest state clean at d=0", ls.restClean, 1, 1, "[DESIGN] body 1, ghosts 0 — no idle vapor");

console.log("\n=== the build-time masks (decoded from the CSS data URIs) ===");
{
  const uris = [...html.matchAll(/url\("data:image\/png;base64,([A-Za-z0-9+/=]+)"\)/g)].map((x) => x[1]);
  const unique = [...new Set(uris)];
  check("three distinct mask PNGs", unique.length, 3, 3, "[STRUCT] three densities, three static masks");
  function decode(b64) {
    const buf = Buffer.from(b64, "base64");
    const sig = buf.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    const bitDepth = buf[24], colorType = buf[25];
    // collect IDAT
    let off = 8, idat = [];
    while (off < buf.length) {
      const len = buf.readUInt32BE(off), type = buf.subarray(off + 4, off + 8).toString("ascii");
      if (type === "IDAT") idat.push(buf.subarray(off + 8, off + 8 + len));
      off += 12 + len;
    }
    const raw = inflateSync(Buffer.concat(idat));
    const stride = 1 + w * 4;
    let filterOK = true; const alphas = [];
    for (let y = 0; y < h; y++) {
      if (raw[y * stride] !== 0) filterOK = false;
      for (let x = 0; x < w; x++) alphas.push(raw[y * stride + 1 + x * 4 + 3]);
    }
    // grain metric: mean horizontal run length between |delta|>4 alpha edges
    let trans = 0;
    for (let y = 0; y < h; y++)
      for (let x = 1; x < w; x++)
        if (Math.abs(raw[y * stride + 1 + x * 4 + 3] - raw[y * stride + 1 + (x - 1) * 4 + 3]) > 4) trans++;
    const mean = alphas.reduce((a, b) => a + b, 0) / alphas.length / 255;
    const rgb = [raw[1], raw[2], raw[3]];
    return { sig, w, h, bitDepth, colorType, filterOK, mean, runLen: (w * h) / Math.max(1, trans), rgb };
  }
  const decoded = unique.map(decode);
  for (const d of decoded) {
    check(`PNG valid ${d.w}x${d.h}`, d.sig && d.bitDepth === 8 && d.colorType === 6 ? 1 : 0, 1, 1, "[STRUCT] 8-bit RGBA, signature good");
    check(`filter-0 rows ${d.w}x${d.h}`, d.filterOK ? 1 : 0, 1, 1, "[STRUCT] unfiltered — deterministic decode");
  }
  // identify: bodygrain is the 96x96 shallow mask; coarse/mid are 64x64, split by grain
  // (mean run length at a |delta|>4 threshold — the shallow field's deltas live under 32).
  const fine = decoded.find((d) => d.w === 96);
  const [coarse, mid] = decoded.filter((d) => d.w === 64).sort((a, b) => b.runLen - a.runLen);
  check("ladder run lengths coarse > mid > fine (px)", coarse.runLen > mid.runLen && mid.runLen > fine.runLen ? 1 : 0, 1, 1, `[STRUCT] measured ${coarse.runLen.toFixed(1)}/${mid.runLen.toFixed(1)}/${fine.runLen.toFixed(1)} — three real densities`);
  check("coarse mean alpha (full depth)", coarse.mean, 0.3, 0.7, "[STRUCT] a real erosion field, not a veil");
  check("mid mean alpha (full depth)", mid.mean, 0.3, 0.7, "[STRUCT]");
  check("bodygrain mean alpha (shallow)", fine.mean, 0.88, 1.0, "[STRUCT] the body reads clean at rest");
  // MECH minor 5 (JUDGE cure): mask-image consumes the ALPHA channel — the mask PNGs' RGB
  // never paints. The painted cream lives in the ghost CSS; the warmth gate reads THAT.
  const ghostColor = html.match(/\.v-ghost\s*{[^}]*color:\s*rgba\((\d+),\s*(\d+),\s*(\d+)/);
  const ghostBg = html.match(/\.v-ghost\s*{[^}]*background:[^;]*rgba\((\d+),\s*(\d+),\s*(\d+)/);
  const warmPaint = ghostColor && ghostBg && +ghostColor[1] > +ghostColor[3] && +ghostColor[1] >= 240 && +ghostBg[1] > +ghostBg[3];
  check("vapor PAINT is warm cream (ghost CSS)", warmPaint ? 1 : 0, 1, 1, "[STRUCT] R>B where it actually paints — mask RGB is invisible");
}

console.log("\n=== structural asserts (mechanism discipline; comments stripped first) ===");
{
  const code = html.replace(/<!--[\s\S]*?-->/g, ""); // prose never trips a mechanism gate
  check("exactly 3 vapor layers", (code.match(/class="vlayer /g) || []).length, 3, 3, "[STRUCT] body + 2 ghosts, never more");
  check("no runtime turbulence / SVG filter", /feTurbulence|filter:\s*url\(/.test(code) ? 1 : 0, 0, 0, "[STRUCT] the lying-gate law");
  check("no @supports gate", /@supports/.test(code) ? 1 : 0, 0, 0, "[STRUCT] runtime paint-probe gates only");
  check("masks never animate", /transition[^;]*mask|animation[^;]*mask/.test(code) ? 1 : 0, 0, 0, "[STRUCT] mask geometry changes repaint — banned");
  const ghostBlursFixed = /\.v-ghost-c\s*{[^}]*filter:\s*blur\(2px\)/.test(html) && /\.v-ghost-m\s*{[^}]*filter:\s*blur\(4px\)/.test(html) ? 1 : 0;
  check("ghost blur radii fixed (2px/4px)", ghostBlursFixed, 1, 1, "[STRUCT] the LAYER's opacity ramps, never the radius");
  check("scrub scalar named --scrub-t", /--scrub-t/.test(html) ? 1 : 0, 1, 1, "[STRUCT] the FAC shape");
  check("PRM single-step branch present", /prefers-reduced-motion/.test(html) ? 1 : 0, 1, 1, "[STRUCT] single-step removal, state relayed");
  check("ghosts are aria-hidden", (html.match(/v-ghost[^"]*"\s+aria-hidden="true"/g) || []).length, 2, 2, "[STRUCT] duplicates never reach AT");
  const parked = /\.vapor-root\[data-parked="1"\] \.v-ghost\s*{\s*visibility:\s*hidden/.test(html) && /id="vroot" data-parked="1"/.test(html) ? 1 : 0;
  check("ghosts parked at rest", parked, 1, 1, "[STRUCT] layers exist only during dismissal (minor-4 cure)");
  check("no light-dark() inset fragments", /light-dark\([^)]*inset/.test(html) ? 1 : 0, 0, 0, "[STRUCT] the WebKit shadow trap");
  // [P4-AGG D2 cure 2026-07-19] the still-hold age-out — the false-commit class is locked out
  check("STILL_HOLD_MS token in the D2 band", VAPOR.STILL_HOLD_MS, 80, 300, "[D2 law] a still finger's velocity is ZERO; the house ships 120");
  check("release ages the boxcar by wall clock", /performance\.now\(\) - lastMove\.t > VAPOR\.STILL_HOLD_MS\) vel = 0/.test(html) ? 1 : 0, 1, 1, "[D2 cure] prune-in-move-only + un-aged release was the convicted false-commit path");
}

console.log(failures === 0 ? "\nALL CHECKS PASS" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
