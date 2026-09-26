// D2-G spec seat, REGISTRY §6 questions 2-5 on the sliding aperture, plus the reserve
// handover. The block test (D2-G-block.md, D2-G-lens-probe.mjs) answered Q1 and Q2's cheap
// form on a bare plate; this probe composes the route's whole mechanism on a static page:
//
//   fp (the reserved footprint, pointer-events: none)
//   ├─ sL / sR   shadow clips: overflow-x: clip, overflow-y: visible, meeting at the window
//   │            centre c = (dL - dR)/2; each holds one transparent stadium caster kL / kR
//   │            (box-shadow only) carried by its own edge. The drop shadow is two halves.
//   ├─ dL        door L (overflow: clip, radius R), carried by the leading edge
//   │  ├─ cL     counter
//   │  │  └─ dR  door R, carried by the trailing edge
//   │  │     ├─ cR  counter
//   │  │     │  └─ plate  the one backdrop-filter, square, at the footprint; border and
//   │  │     │           inset rims on the block axis only (the straights)
//   │  │     └─ capR   the trailing cap: a circle whose ::before is the border ring and
//   │  │               ::after the inset rims, each clipped to its half and to the bands
//   │  │               the plate's straights already paint
//   │  └─ capL        the leading cap, mirrored
//   ├─ pL / pR   persistent seats, carried by their edge
//   └─ fd > fc > seats   the face: fd clips the main axis at the trailing persistent while a
//                morph runs; fc pins the face to the leading edge
//
// Anchor a is the share of Δ = W - E taken on the leading side: dL = a·Δ, dR = (1 - a)·Δ.
// a = 0 is a start-anchored dock, a = ½ a centred one.
//
// The carrier: every lane is a WAAPI `transform` animation whose keyframes are the dock
// spring (ζ 0.88, response 0.30 s, harness DOCK_RUNG) solved in closed form from the lane
// scalar's (x, v), sampled at 120 Hz, all lanes sharing one startTime. A retarget reads
// (x, v) at document.timeline.currentTime from the same closed form, cancels, and re-solves.
//
//   node D2-G-spec-probes.mjs <recordsDir> <scratchDir> <q3|q4|q5|q2x|hand|all> [reps]
//
// Every WebKit number is Playwright WebKit (the Playwright 1.61.1 build), never Safari. The
// probe has no shim: every WebKit cell is unshimmed.
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { analyseMorph, DOCK_RUNG, springSpec } from "../harness/lib.mjs";

const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const REC = path.resolve(process.argv[2] ?? "./D2-G-spec-records");
const SCR = path.resolve(process.argv[3] ?? "./d2g-spec-scratch");
const WHICH = process.argv[4] ?? "all";
const REPS = Number(process.argv[5] ?? 2);
fs.mkdirSync(REC, { recursive: true });
fs.mkdirSync(SCR, { recursive: true });
const load = () => +os.loadavg()[0].toFixed(2);

const VW = 640, VH = 300;
const FX = 80, FY = 122, W = 480, H = 56, R = 28, EC = 56;
const SEAT = 40, PAD = 8, GAP = 8;
const BORDER = 1.5;
const FILTER = "blur(16px) saturate(1.2)";

// ── the page ────────────────────────────────────────────────────────────────────────
// opts: ink (edge alpha), rims (bool), shadowA (drop alpha), seats (bool), filter (bool),
//       bg (css), plant (string), a (anchor)
function page(o = {}) {
    const ink = o.ink ?? 0.08, shA = o.shadowA ?? 0.14, rimK = o.rimK ?? 1;
    const plant = o.plant ?? "";
    // edge: "band" (the route's primitive: box-shadow bands of width w, which no engine
    // snaps) or "border" (HEAD's `border: 1.5px`, which engines snap: Chromium paints 1 px
    // at DPR 1-3, Playwright WebKit 1.5 px at DPR 2 and 1.33 px at DPR 3, measured here).
    // refEdge: the reference stadium's primitive, "band" or "border".
    const edge = o.edge ?? "band", refEdge = o.refEdge ?? edge;
    const w = o.w ?? BORDER;
    const inkC = `rgba(0,0,0,${ink})`;
    const lit = `rgba(255,255,255,${0.1 * rimK})`, shade = `rgba(0,0,0,${0.06 * rimK})`, side = `rgba(0,0,0,${0.04 * rimK})`;
    const rimsOf = (off, withSide) => o.rims === false ? [] : [`inset 0 ${off}px 0 ${lit}`, `inset 0 -${off}px 0 ${shade}`, ...(withSide ? [`inset ${off}px 0 0 ${side}`] : [])];
    const join = (a) => (a.length ? a.join(", ") : "none");
    // band mode: rims sit at offset w + 1 under the edge band; border mode: 1 px inside the border
    const rOff = edge === "band" ? w + 1 : 1;
    const plateShadow = edge === "band" ? join([`inset 0 ${w}px 0 ${inkC}`, `inset 0 -${w}px 0 ${inkC}`, ...rimsOf(rOff, false)]) : join(rimsOf(1, false));
    const plateBorder = edge === "band" ? "none" : `border-block:${w}px solid ${inkC}`;
    const capRing = edge === "band" ? `box-shadow:inset 0 0 0 ${w}px ${inkC}` : `border:${w}px solid ${inkC}`;
    const capRims = edge === "band" ? `box-shadow:${join(rimsOf(rOff, true))}` : `border:${w}px solid transparent;box-shadow:${join(rimsOf(1, true))}`;
    const band = plant === "capband" ? 0 : w;          // plant: caps repaint the straights' bands
    const rimBand = plant === "capband" ? 0 : w + 1;
    const drop = `0 0 20px rgba(0,0,0,${shA})`;
    const refROff = refEdge === "band" ? w + 1 : 1;
    const refStyle = refEdge === "band" ? `box-shadow:${join([`inset 0 0 0 ${w}px ${inkC}`, ...rimsOf(refROff, true), drop])}` : `border:${w}px solid ${inkC};box-shadow:${join([...rimsOf(1, true), drop])}`;
    const tint = o.tint ?? "rgba(255,40,40,.25)";
    const filt = o.filter === false ? "none" : FILTER;
    const nFace = o.nFace ?? 7;
    const faceSeats = Array.from({ length: nFace }, (_, i) => `<div class="seat f" id="s${i}" style="left:${i * (SEAT + GAP)}px"></div>`).join("");
    const shadowClip = plant === "nosplit" ? "visible" : "clip";
    const doorOv = plant === "ovvis" ? "visible" : "clip";
    return `<!doctype html><html><head><style>
    html,body{margin:0;width:${VW}px;height:${VH}px;overflow:hidden}
    body{${o.bg ?? "background:#e9e9e9"}}
    body.blue{--ink:#0000ff}
    #fp{position:absolute;left:${FX}px;top:${FY}px;width:${W}px;height:${H}px;pointer-events:${plant === "rootauto" ? "auto" : "none"}}
    .sclip{position:absolute;top:-60px;height:${H + 120}px;overflow-x:${shadowClip};overflow-y:visible;pointer-events:none}
    #sL{left:-200px;width:${200 + W / 2}px}
    #sR{left:${W / 2}px;width:${W / 2 + 200}px}
    .kst{position:absolute;top:60px;height:${H}px;width:${2 * W}px;border-radius:${R}px;box-shadow:${o.shadow === false ? "none" : drop}}
    #kL{left:200px}
    #kR{left:${-1.5 * W}px}
    .door{position:absolute;top:0;height:${H}px;width:${2 * W}px;overflow:${doorOv};border-radius:${R}px}
    #dL{left:0}
    #dR{left:${-W}px}
    .ctr{position:absolute;inset:0}
    #plate{position:absolute;top:0;left:${W}px;width:${W}px;height:${H}px;box-sizing:border-box;background:${tint};
       ${plateBorder};box-shadow:${plateShadow};pointer-events:auto;
       backdrop-filter:${filt};-webkit-backdrop-filter:${filt}}
    .cap{position:absolute;top:0;width:${H}px;height:${H}px;pointer-events:none;${plant === "nocaps" ? "display:none;" : ""}}
    .cap::before,.cap::after{content:"";position:absolute;inset:0;border-radius:50%;box-sizing:border-box}
    .cap::before{${capRing}}
    .cap::after{${capRims}}
    #capL{left:0}
    #capL::before{clip-path:inset(${band}px ${R}px ${band}px 0)}
    #capL::after{clip-path:inset(${rimBand}px ${R}px ${rimBand}px 0)}
    #capR{right:0}
    #capR::before{clip-path:inset(${band}px 0 ${band}px ${R}px)}
    #capR::after{clip-path:inset(${rimBand}px 0 ${rimBand}px ${R}px)}
    .seat{position:absolute;top:${PAD}px;width:${SEAT}px;height:${SEAT}px;border-radius:${SEAT / 2}px;background:#00c000;pointer-events:auto}
    #pL{left:${PAD}px}
    #pR{left:${W - PAD - SEAT}px;background:#0060ff}
    #fd{position:absolute;top:0;left:${PAD + SEAT + GAP}px;width:${W - 2 * (PAD + SEAT + GAP)}px;height:${H}px;overflow-x:${o.faceClip === false ? "visible" : "clip"};overflow-y:visible}
    #fc{position:absolute;inset:0}
    #ref{position:absolute;top:${FY}px;height:${H}px;box-sizing:border-box;border-radius:${R}px;background:${tint};
       ${refStyle};display:none}
    body.showref #fp{display:none}
    body.showref #ref{display:block}
    </style></head><body>
    <div id="fp">
      <div class="sclip" id="sL"><div class="kst" id="kL"></div></div>
      <div class="sclip" id="sR"><div class="kst" id="kR"></div></div>
      <div class="door" id="dL"><div class="ctr" id="cL">
        <div class="door" id="dR"><div class="ctr" id="cR"><div id="plate"></div></div><div class="cap" id="capR"></div></div>
      </div><div class="cap" id="capL"></div></div>
      ${o.seats ? `<div class="seat" id="pL"></div><div id="fd"><div id="fc">${faceSeats}</div></div><div class="seat" id="pR"></div>` : ""}
    </div>
    <div id="ref"></div>
    <script>${CARRIER}; window.__A = ${o.a ?? 0.5};</script>
    </body></html>`;
}

// The in-page carrier. Lanes are functions of the window extent E (one scalar), so a
// single solved curve drives every lane; each lane gets its own keyframe list.
const CARRIER = `
const W = ${W}, RESP = ${DOCK_RUNG.response}, Z = ${DOCK_RUNG.dampingFraction};
const w0 = 2 * Math.PI / RESP, wd = w0 * Math.sqrt(1 - Z * Z);
function err(e0, v0, t) { return Math.exp(-Z * w0 * t) * (e0 * Math.cos(wd * t) + ((v0 + Z * w0 * e0) / wd) * Math.sin(wd * t)); }
function derr(e0, v0, t) { const h = 1e-6; return (err(e0, v0, t + h) - err(e0, v0, t - h)) / (2 * h); }
function laneMap(E) {
  const a = window.__A, D = W - E, dL = a * D, dR = (1 - a) * D, c = (dL - dR) / 2;
  const m = { dL, cL: -dL, dR: -dR, cR: dR, sL: c, kL: dL - c, sR: c, kR: -dR - c };
  if (window.pL) Object.assign(m, { pL: dL, pR: -dR, fd: -dR, fc: dL + dR });
  return m;
}
function setStatic(E) { const m = laneMap(E); for (const [id, v] of Object.entries(m)) document.getElementById(id).style.transform = 'translateX(' + v + 'px)'; }
// The landing is dead (REGISTRY §5 Q-5 default (a)): once the solved curve reaches the
// target it is pinned there, so ζ 0.88's 0.3 % overshoot never paints. window.__noClamp
// (a plant) leaves the analytic overshoot in.
function solve(x0, v0, to) {
  const e0 = x0 - to, pts = [], dt = 1 / 120;
  let t = 0, sgn = 0;
  for (;;) {
    let e = err(e0, v0, t);
    if (!window.__noClamp) { const s = Math.sign(e); if (t > 0 && sgn && s && s !== sgn) { pts.push({ t, x: to }); break; } if (s) sgn = s; }
    pts.push({ t, x: to + e });
    if ((Math.abs(e) < 0.05 && Math.abs(derr(e0, v0, t)) < 5 && t > 0.05) || t > 3) break;
    t += dt;
  }
  pts[pts.length - 1].x = to;
  return pts;
}
window.__C = { anims: [], ep: null, retargetMs: [] };
function play(x0, v0, to, slow = 1, now = document.timeline.currentTime) {
  const C = window.__C, t0 = performance.now();
  for (const a of C.anims) a.cancel();
  const pts = solve(x0, v0, to), T = pts[pts.length - 1].t * 1000 * slow;
  const ids = Object.keys(laneMap(x0));
  const frames = Object.fromEntries(ids.map((id) => [id, []]));
  for (const p of pts) { const m = laneMap(p.x); for (const id of ids) frames[id].push({ transform: 'translateX(' + m[id] + 'px)', offset: Math.min(1, p.t * 1000 * slow / T) }); }
  C.anims = ids.map((id) => { const an = document.getElementById(id).animate(frames[id], { duration: T, easing: 'linear', fill: 'forwards' }); an.startTime = now; return an; });
  C.ep = { x0, v0, to, now, slow, T, lanes: ids.length, keyframes: pts.length };
  C.retargetMs.push(+(performance.now() - t0).toFixed(3));
  return C.ep;
}
function stateAt(now) {
  const ep = window.__C.ep, tau = Math.max(0, (now - ep.now) / 1000 / ep.slow), e0 = ep.x0 - ep.to;
  if (tau * 1000 * ep.slow >= ep.T) return { x: ep.to, v: 0 };
  return { x: ep.to + err(e0, ep.v0, tau), v: derr(e0, ep.v0, tau) / ep.slow };
}
function windowRect() {
  const a = dL.getBoundingClientRect(), b = dR.getBoundingClientRect(), p = plate.getBoundingClientRect();
  return { l: Math.max(a.left, b.left, p.left), r: Math.min(a.right, b.right, p.right), t: p.top, b: p.bottom };
}
`;

// ── pixels ──────────────────────────────────────────────────────────────────────────
const decode = (buf) => PNG.sync.read(buf);
const px = (img, x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };

function framesOf(video, dir) {
    fs.mkdirSync(dir, { recursive: true });
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", video, "-vf", "fps=25", path.join(dir, "f%04d.png")]);
    return fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(dir, f));
}
// Red-tint run on the centre row (the plate), video px = CSS px.
function tintRun(img, y = Math.round(FY + H / 2)) {
    let L = -1, Rr = -1;
    for (let x = 0; x < img.width; x++) { const p = px(img, x, y); if (p[0] - p[1] > 30 && p[0] - p[2] > 30) { if (L < 0) L = x; Rr = x; } }
    return L < 0 ? null : { l: L, r: Rr + 1, w: Rr - L + 1 };
}
// Leftmost green seat pixel on the seat row (the face's first seat), video px.
function greenLeft(img, y = Math.round(FY + H / 2)) {
    for (let x = 0; x < img.width; x++) { const p = px(img, x, y); if (p[1] - p[0] > 60 && p[1] - p[2] > 40) return x; }
    return null;
}

// ── Q3 · the velocity handoff (H-3c's reversal row, per rAF from DOM) ─────────────────
async function logRun(pg, script) {
    return pg.evaluate(async (script) => {
        const frames = []; let mk = "expand"; let stop = false;
        const ch = new MessageChannel(); let n = 0;
        ch.port1.onmessage = (ev) => { if (ev.data[1] !== n) return; const r = windowRect(); frames.push({ t: ev.data[0], mk, e: [r.l, r.t, r.r, r.b].map((v) => +v.toFixed(3)), m: !!window.__m }); };
        const tick = (ts) => { if (stop) return; n++; ch.port2.postMessage([ts, n]); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        await new Promise((r) => requestAnimationFrame(r));
        await new Promise((r) => requestAnimationFrame(r));
        const setMk = (m) => { mk = m; };
        await (new Function("setMk", "return (async () => {" + script + "})()"))(setMk);
        await new Promise((r) => setTimeout(r, 600));
        stop = true;
        return { frames, retargetMs: window.__C.retargetMs, ep: window.__C.ep };
    }, script);
}

// The window flag rides the carrier's clock: open from the play to the 2 % band of the
// current episode (the pinned rung's settle, 214.2 ms from rest; from a retarget it is the
// solved curve's own 2 % entry).
const REV_SCRIPT = (plant) => `
  setStatic(${EC});
  await new Promise((r) => requestAnimationFrame(r));
  window.__m = true;
  let now = document.timeline.currentTime;
  play(${EC}, 0, ${W}, 1, now);
  const at = ${EC} + 0.35 * ${W - EC};
  await new Promise((res) => { const f = () => { const s = stateAt(document.timeline.currentTime); if (s.x >= at) return res(); requestAnimationFrame(f); }; requestAnimationFrame(f); });
  now = document.timeline.currentTime;
  const s = stateAt(now);
  setMk("reverse");
  window.__handoff = { x: s.x, v: s.v, now };
  play(s.x, ${plant === "wall" ? 0 : "s.v"}, ${EC}, 1, now);
  // close the window at the 2 % band of the retargeted episode (|e| <= 0.02 * its travel)
  const ep = window.__C.ep, D = Math.max(Math.abs(ep.x0 - ep.to), 1);
  const e0 = ep.x0 - ep.to; let tb = 0; for (let t = 0; t < 3; t += 0.0005) if (Math.abs(err(e0, ep.v0, t)) > 0.02 * D) tb = t;
  await new Promise((r) => setTimeout(r, tb * 1000));
  window.__m = false;
  await new Promise((r) => setTimeout(r, 400));
`;

async function q3(engineName, launcher, rep) {
    const out = [];
    for (const plant of ["handoff", "wall", "noclamp"]) {
        const browser = await launcher.launch();
        const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
        const pg = await ctx.newPage();
        await pg.setContent(page({ seats: true }));
        await pg.evaluate((plant) => { setStatic(56); window.__noClamp = plant === "noclamp"; }, plant);
        await pg.waitForTimeout(300);
        const l0 = load();
        const r = await logRun(pg, REV_SCRIPT(plant));
        const handoff = await pg.evaluate(() => window.__handoff);
        await browser.close();
        const frames = r.frames;
        const a = analyseMorph(frames, DOCK_RUNG, { ax: "x", reversal: { mark: "reverse", to1: W }, seats: false });
        // Painted velocity (px/ms) across the retarget, from consecutive frame lengths.
        const iR = frames.findIndex((f) => f.mk === "reverse");
        const len = (f) => f.e[2] - f.e[0];
        const vel = (i) => (len(frames[i]) - len(frames[i - 1])) / (frames[i].t - frames[i - 1].t);
        const vBefore = iR > 1 ? +vel(iR - 1).toFixed(3) : null, vAt = iR > 0 ? +vel(iR).toFixed(3) : null, vAfter = iR + 1 < frames.length ? +vel(iR + 1).toFixed(3) : null;
        const cell = {
            engine: engineName, rep, plant, frames: frames.length, dropped: frames.dropped, handoff: { x: +handoff.x.toFixed(2), vPxPerMs: +(handoff.v / 1000).toFixed(3) },
            velocityAcross: { before: vBefore, atRetarget: vAt, after: vAfter }, continuity: a.continuity, landing: a.landing, window: a.window, trajectory: a.trajectory, terminal: a.terminal,
            pass: a.continuity.ok && a.trajectory.ok && a.terminal.ok && a.landing.ok && a.window.ok, retargetCostMs: r.retargetMs, lanes: r.ep?.lanes, keyframes: r.ep?.keyframes, loadBefore: l0, loadAfter: load(),
        };
        out.push(cell);
        console.log(engineName, "q3 rep", rep, plant, cell.pass ? "PASS" : "FAIL", "v", JSON.stringify(cell.velocityAcross), "traj", a.trajectory.why, "| cont ×" + a.continuity.ratio, "| land", a.landing.why, "| window", a.window.duration, "allow", a.window.allowMs, a.window.why, "| term", a.terminal.why, "| cost", JSON.stringify(r.retargetMs), "load", l0);
    }
    return out;
}

// Q3 in the compositor's frames: the same reversal slowed ×8, read from the screencast.
async function q3v(engineName, launcher, rep) {
    const out = [];
    const SLOW = 8;
    for (const plant of ["handoff", "wall"]) {
        const vdir = path.join(SCR, "q3v", `${engineName}-${plant}-r${rep}`);
        fs.rmSync(vdir, { recursive: true, force: true });
        const browser = await launcher.launch();
        const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, recordVideo: { dir: vdir, size: { width: VW, height: VH } } });
        const pg = await ctx.newPage();
        await pg.setContent(page({ seats: false, filter: false }));
        await pg.waitForTimeout(400);
        const l0 = load();
        const info = await pg.evaluate(async ({ plant, SLOW }) => {
            setStatic(56);
            await new Promise((r) => setTimeout(r, 300));
            const tStart = performance.now();
            play(56, 0, 480, SLOW);
            const at = 56 + 0.35 * 424;
            await new Promise((res) => { const f = () => { const s = stateAt(document.timeline.currentTime); if (s.x >= at) return res(); requestAnimationFrame(f); }; requestAnimationFrame(f); });
            const now = document.timeline.currentTime; const s = stateAt(now);
            const tRet = performance.now();
            play(s.x, plant === "wall" ? 0 : s.v * SLOW, 56, SLOW, now);   // solve() runs in spring time: un-slow the velocity
            await new Promise((r) => setTimeout(r, 3500));
            return { retargetAfterMs: tRet - tStart, x: s.x, vPxPerMs: s.v / 1000 };
        }, { plant, SLOW });
        await ctx.close(); await browser.close();
        const video = fs.readdirSync(vdir).find((f) => f.endsWith(".webm"));
        const fr = framesOf(path.join(vdir, video), path.join(vdir, "frames"));
        const E = fr.map((f) => { const r = tintRun(decode(fs.readFileSync(f))); return r ? r.w : 0; });
        // the motion: first frame off 56, the peak (the reversal), and the per-frame steps around it
        const iRest = E.findIndex((w) => w > 0 && w <= EC + 2);
        const first = E.findIndex((w, i) => i > iRest && w > EC + 2);
        let iPk = first; for (let i = first; i < E.length; i++) if (E[i] > E[iPk]) iPk = i;
        const steps = E.slice(Math.max(first, iPk - 4), iPk + 6).map((w, k, arr) => (k ? w - arr[k - 1] : null)).slice(1);
        // model: the handed-off spring (slowed) against the frames after the peak
        const cell = { engine: engineName, rep, plant, slow: SLOW, handoff: info, frames: E.length, first, peakFrame: iPk, peak: E[iPk], stepsAroundPeakPx: steps, widths: E, loadBefore: l0, loadAfter: load() };
        out.push(cell);
        console.log(engineName, "q3v rep", rep, plant, "peak", E[iPk], "at", iPk, "steps", JSON.stringify(steps), "load", l0);
    }
    return out;
}

// ── Q4 · the edge and the shadow on the moving silhouette ───────────────────────────
function diff(a, b, box) {
    let max = 0, n8 = 0, n16 = 0, at = null;
    for (let y = box.y0; y < box.y1; y++) for (let x = box.x0; x < box.x1; x++) {
        const i = (y * a.width + x) * 4;
        const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
        if (d > 8) n8++; if (d > 16) n16++;
        if (d > max) { max = d; at = [x, y]; }
    }
    return { max, n8, n16, at };
}
async function q4(engineName, launcher) {
    const out = [];
    const cases = [];
    for (const dpr of [2]) for (const a of [0.5, 0]) for (const E of [EC, 102, 200, W]) cases.push({ dpr, a, E, ink: 0.08, shadowA: 0.14, id: `real-a${a}-E${E}-dpr${dpr}` });
    for (const dpr of [1, 3]) cases.push({ dpr, a: 0.5, E: 200, ink: 0.08, shadowA: 0.14, id: `real-a0.5-E200-dpr${dpr}` });
    // amplified inks: seams and shadow errors made visible
    for (const E of [EC, 102, 200]) cases.push({ dpr: 2, a: 0.5, E, ink: 0.4, shadowA: 0.6, rimK: 5, id: `amp-a0.5-E${E}` });
    cases.push({ dpr: 2, a: 0, E: 200, ink: 0.4, shadowA: 0.6, rimK: 5, id: "amp-a0-E200" });
    // an edge width that is a whole number of device pixels at DPR 1, 2 and 3
    for (const dpr of [1, 2, 3]) { cases.push({ dpr, a: 0.5, E: 200, ink: 0.08, shadowA: 0.14, w: 1, id: `real-w1-a0.5-E200-dpr${dpr}` }); cases.push({ dpr, a: 0.5, E: 200, ink: 0.4, shadowA: 0.6, rims: false, w: 1, id: `amp-norims-w1-E200-dpr${dpr}` }); }
    // the border alone (rims off), to separate the ring's tiling from the rims'
    cases.push({ dpr: 2, a: 0.5, E: 200, ink: 0.4, shadowA: 0.6, rims: false, id: "amp-norims-a0.5-E200" });
    // HEAD's primitive decomposed: a snapped border cannot tile against an exact clip band
    for (const dpr of [1, 2, 3]) cases.push({ dpr, a: 0.5, E: 200, ink: 0.4, shadowA: 0.6, rims: false, edge: "border", id: `border-decomp-amp-norims-dpr${dpr}` });
    cases.push({ dpr: 2, a: 0.5, E: 200, ink: 0.08, shadowA: 0.14, edge: "border", id: "border-decomp-real-dpr2" });
    // the identity delta: the route's band edge against HEAD's border edge (both whole stadiums)
    for (const dpr of [1, 2, 3]) cases.push({ dpr, a: 0.5, E: 200, ink: 0.08, shadowA: 0.14, identity: true, id: `identity-band-vs-border-dpr${dpr}` });
    // paused mid-flight WAAPI (the spring's own keyframes), E ≈ 268
    cases.push({ dpr: 2, a: 0.5, E: null, paused: 0.5, ink: 0.4, shadowA: 0.6, rimK: 5, id: "amp-a0.5-paused" });
    // plants
    for (const plant of ["capband", "nocaps", "nosplit"]) cases.push({ dpr: 2, a: 0.5, E: 200, ink: 0.4, shadowA: 0.6, rimK: 5, plant, id: `plant-${plant}` });
    const browser = await launcher.launch();
    const only = process.env.D2G_CASES ? new RegExp(process.env.D2G_CASES) : null;
    for (const c of cases) {
        if (only && !only.test(c.id)) continue;
        const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: c.dpr });
        const pg = await ctx.newPage();
        await pg.setContent(page({ a: c.a, ink: c.ink, shadowA: c.shadowA, rimK: c.rimK ?? 1, rims: c.rims, w: c.w, edge: c.identity ? "band" : c.edge, refEdge: c.identity ? "border" : c.edge, filter: false, plant: c.plant, tint: "rgba(255,255,255,.35)" }));
        let E = c.E;
        if (c.paused != null) {
            E = await pg.evaluate((f) => { setStatic(56); play(56, 0, 480); for (const an of window.__C.anims) { an.pause(); an.currentTime = an.effect.getTiming().duration * f; } const r = windowRect(); return r.r - r.l; }, 0.35);
        } else await pg.evaluate((E) => setStatic(E), E);
        await pg.waitForTimeout(120);
        const win = await pg.evaluate(() => windowRect());
        const A = decode(await pg.screenshot());
        await pg.evaluate((w) => { ref.style.left = w.l + "px"; ref.style.width = (w.r - w.l) + "px"; document.body.classList.add("showref"); }, win);
        await pg.waitForTimeout(120);
        const B = decode(await pg.screenshot());
        await ctx.close();
        if (process.env.D2G_DUMP) { fs.writeFileSync(path.join(SCR, `q4-${engineName}-${c.id}-A.png`), PNG.sync.write(A)); fs.writeFileSync(path.join(SCR, `q4-${engineName}-${c.id}-B.png`), PNG.sync.write(B)); }
        const s = c.dpr;
        const box = { x0: Math.round((win.l - 40) * s), x1: Math.round((win.r + 40) * s), y0: Math.round((FY - 40) * s), y1: Math.round((FY + H + 40) * s) };
        // regions: the edge band (within 3 px of the stadium boundary), shadow (outside), interior
        const cx0 = win.l + R, cx1 = win.r - R, cy = FY + H / 2;
        const sd = (x, y) => Math.hypot(x - Math.max(cx0, Math.min(cx1, x)), y - cy) - R;
        const reg = { edge: { max: 0, n16: 0 }, shadow: { max: 0, n16: 0 }, interior: { max: 0, n16: 0 } };
        for (let y = box.y0; y < box.y1; y++) for (let x = box.x0; x < box.x1; x++) {
            const i = (y * A.width + x) * 4;
            const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2]));
            const dd = sd((x + 0.5) / s, (y + 0.5) / s);
            const k = Math.abs(dd) <= 3 ? "edge" : dd > 0 ? "shadow" : "interior";
            if (d > reg[k].max) reg[k].max = d; if (d > 16) reg[k].n16++;
        }
        const all = diff(A, B, box);
        const cell = { engine: engineName, ...c, E: +(win.r - win.l).toFixed(2), all, regions: reg, load: load() };
        out.push(cell);
        console.log(engineName, "q4", c.id, "E", cell.E, "max", all.max, "n>16", all.n16, "edge", JSON.stringify(reg.edge), "shadow", JSON.stringify(reg.shadow), "int", JSON.stringify(reg.interior), "load", cell.load);
    }
    await browser.close();
    return out;
}

// ── Q5 · hit testing through the rounded doors ──────────────────────────────────────
async function q5(engineName, launcher) {
    const out = [];
    const browser = await launcher.launch();
    for (const plant of ["", "ovvis", "rootauto"]) {
        for (const state of ["rest-E480", "static-E200", "paused-mid"]) {
            const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 2 });
            const pg = await ctx.newPage();
            await pg.setContent(page({ seats: true, plant }));
            const r = await pg.evaluate(async (state) => {
                if (state === "rest-E480") setStatic(480);
                else if (state === "static-E200") setStatic(200);
                else { setStatic(56); play(56, 0, 480); for (const an of window.__C.anims) { an.pause(); an.currentTime = an.effect.getTiming().duration * 0.12; } }
                await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                const w = windowRect(), cy = (w.t + w.b) / 2;
                const hit = (x, y) => { const e = document.elementFromPoint(x, y); return e ? (e.id || e.tagName.toLowerCase()) : "null"; };
                // a face seat laid out beyond the window's trailing clip (the first whose left > the face door's right)
                // a face seat laid out wholly beyond the window (the face door clips it)
                const beyond = [...document.querySelectorAll(".seat.f")].map((s) => s.getBoundingClientRect()).find((q) => q.left > w.r + 2);
                const pts = {
                    interior: [(w.l + w.r) / 2, w.t + 3],
                    cornerOutsideArc: [w.l + 3, w.t + 3],
                    justInsideArc: [w.l + 28 - 25 * Math.SQRT1_2, cy - 25 * Math.SQRT1_2],
                    reserveOutsideWindow: w.l - 12 > fp.getBoundingClientRect().left ? [w.l - 12, cy] : null,
                    faceSeatBeyondWindow: beyond ? [(beyond.left + beyond.right) / 2, cy] : null,
                };
                const res = {};
                for (const [k, p] of Object.entries(pts)) res[k] = p ? { at: p.map((v) => +v.toFixed(1)), hit: hit(p[0], p[1]) } : null;
                return { window: { l: +w.l.toFixed(2), r: +w.r.toFixed(2) }, res };
            }, state);
            await ctx.close();
            // expected: interior -> plate or a seat; corner outside the arc -> body; just inside the arc -> plate;
            // reserve outside the window -> body; a clipped face seat -> not that seat
            const ok = (k, v) => v == null || (k === "interior" ? /plate|^s\d|pL|pR/.test(v.hit) : k === "justInsideArc" ? /plate|pL/.test(v.hit) : k === "faceSeatBeyondWindow" ? !/^s\d/.test(v.hit) : v.hit === "body");
            const checks = Object.fromEntries(Object.entries(r.res).map(([k, v]) => [k, ok(k, v)]));
            // cornerOutsideArc is RECORDED apart: a rounded overflow clip clips paint, not hit
            // testing, in both engines (hit.mjs isolation in the spec); the rectangle is the claim
            const rectChecks = Object.fromEntries(Object.entries(checks).filter(([k]) => k !== "cornerOutsideArc"));
            const cell = { engine: engineName, plant: plant || "none", state, ...r, checks, passRect: Object.values(rectChecks).every(Boolean), passRound: checks.cornerOutsideArc, pass: Object.values(rectChecks).every(Boolean), load: load() };
            out.push(cell);
            console.log(engineName, "q5", plant || "none", state, cell.passRect ? "RECT-PASS" : "RECT-FAIL", cell.passRound ? "ROUND-PASS" : "ROUND-FAIL", JSON.stringify(r.res), "load", cell.load);
        }
    }
    await browser.close();
    return out;
}

// Q5 isolation: does a rounded overflow clip (or a clip-path) clip hit testing? One box, a
// point outside its corner arc but inside its rectangle, elementFromPoint and a real press.
async function q5iso(engineName, launcher) {
    const variants = { clip: "overflow:clip", hidden: "overflow:hidden", "clip+transform": "overflow:clip;transform:translateX(0.001px)", "clip+will-change": "overflow:clip;will-change:transform", "clip-path": "clip-path:inset(0 round 28px)" };
    const b = await launcher.launch(); const p = await b.newPage(); const out = [];
    for (const [k, css] of Object.entries(variants)) {
        await p.setContent(`<div id=o style="position:absolute;left:100px;top:100px;width:200px;height:56px;border-radius:28px;${css}"><div id=i style="position:absolute;inset:0;background:red"></div></div><script>window.t=[];document.addEventListener('pointerdown',e=>t.push(e.target.id||e.target.tagName.toLowerCase()))</script>`);
        const efp = await p.evaluate(() => [document.elementFromPoint(103, 103)?.id || "body", document.elementFromPoint(200, 128)?.id || "body"]);
        await p.mouse.click(103, 103);
        const press = await p.evaluate(() => window.t[0]);
        const cell = { engine: engineName, clip: k, cornerOutsideArc: efp[0], centre: efp[1], pressOnCorner: press, load: load() };
        out.push(cell); console.log(engineName, "q5iso", JSON.stringify(cell));
    }
    // the used width of `border: 1.5px` (engines snap border widths)
    for (const dpr of [1, 2, 3]) {
        const ctx = await b.newContext({ deviceScaleFactor: dpr }); const q = await ctx.newPage();
        await q.setContent(`<div id=a style="border:1.5px solid red;width:10px;height:10px"></div>`);
        const bw = await q.evaluate(() => getComputedStyle(a).borderTopWidth);
        out.push({ engine: engineName, borderUsed: { authored: "1.5px", dpr, computed: bw } }); console.log(engineName, "border 1.5px at dpr", dpr, "computes", bw);
        await ctx.close();
    }
    await b.close();
    return out;
}

// ── Q2 on the composition: extent and seats under a 1.2 s main-thread block ─────────
const BLOCK_AT = 800, BLOCK_MS = 1200, RUN = 3000;
async function q2x(engineName, launcher, rep) {
    const out = [];
    for (const name of ["composed", "carrier", "ctl-width"]) {
        const vdir = path.join(SCR, "q2x", `${engineName}-${name}-r${rep}`);
        fs.rmSync(vdir, { recursive: true, force: true });
        const browser = await launcher.launch();
        const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, recordVideo: { dir: vdir, size: { width: VW, height: VH } } });
        const pg = await ctx.newPage();
        await pg.setContent(page({ seats: true, bg: "background:repeating-linear-gradient(90deg,#fff 0 8px,#000 8px 16px)" }));
        await pg.waitForTimeout(400);
        const l0 = load();
        await pg.evaluate(({ name, RUN, BLOCK_AT, BLOCK_MS }) => {
            setStatic(480);
            return new Promise((res) => setTimeout(() => {
                if (name === "carrier") {
                    // the carrier itself: solved keyframes with an explicit shared startTime,
                    // slowed ×12 so the block lands mid-flight (does an explicit startTime keep
                    // the compositor path?)
                    setStatic(56); play(56, 0, 480, 12);
                } else if (name === "composed") {
                    // linear over RUN ms, from the carrier's lanes (the travel read needs a linear clock)
                    const ids = Object.keys(laneMap(56)), m0 = laneMap(56), m1 = laneMap(480);
                    window.__C.anims = ids.map((id) => document.getElementById(id).animate([{ transform: "translateX(" + m0[id] + "px)" }, { transform: "translateX(" + m1[id] + "px)" }], { duration: RUN, easing: "linear", fill: "forwards" }));
                } else {
                    fp.style.display = "none";
                    const c = document.createElement("div"); c.style.cssText = "position:absolute;left:80px;top:122px;height:56px;background:rgba(255,40,40,.6)"; document.body.appendChild(c);
                    c.animate([{ width: "56px", transform: "translateX(212px)" }, { width: "480px", transform: "translateX(0px)" }], { duration: RUN, easing: "linear", fill: "forwards" });
                }
                setTimeout(() => { const t = performance.now(); while (performance.now() - t < BLOCK_MS) { } }, BLOCK_AT);
                res();
            }, 300));
        }, { name, RUN, BLOCK_AT, BLOCK_MS });
        await pg.waitForTimeout(RUN + 900);
        await ctx.close(); await browser.close();
        const video = fs.readdirSync(vdir).find((f) => f.endsWith(".webm"));
        const fr = framesOf(path.join(vdir, video), path.join(vdir, "frames"));
        const E = [], G = [];
        for (const f of fr) { const img = decode(fs.readFileSync(f)); const r = tintRun(img); E.push(r ? r.w : 0); G.push(name !== "ctl-width" ? greenLeft(img, Math.round(FY + H / 2)) : null); }
        // the run starts at E = 56 (a one-frame drop from the 480 rest) and ends at 480
        const first = E.findIndex((w) => w > 0 && w < 120), last = E.findLastIndex((w) => w > 0 && w < W - 3);
        // a freeze: consecutive frames within tol px. The extent moves ~5.7 px per 40 ms frame
        // (tol 2, the block test's); the leading seat ~2.8 px per frame, so its tol is 0.
        const freeze = (arr, tol) => { let best = 0, run = 1; for (let i = first + 1; i <= last; i++) { if (arr[i] != null && arr[i - 1] != null && Math.abs(arr[i] - arr[i - 1]) <= tol) { run++; best = Math.max(best, run); } else run = 1; } return best > 1 ? (best - 1) * 40 : 0; };
        const cell = { engine: engineName, rep, case: name, frames: E.length, midFlight: [first, last], freezeMs: freeze(E, 2), travelInBlock: E[first + 49] - E[first + 21], seat: name !== "ctl-width" ? { freezeMs: freeze(G, 0), travelInBlock: (G[first + 49] ?? NaN) - (G[first + 21] ?? NaN) } : null, widths: E, seatLeft: G, loadBefore: l0, loadAfter: load() };
        out.push(cell);
        console.log(engineName, "q2x rep", rep, name, "freeze", cell.freezeMs, "travel", cell.travelInBlock, "seat", JSON.stringify(cell.seat), "load", l0);
    }
    return out;
}

// ── the reserve handover at the end of a collapse ───────────────────────────────────
async function hand(engineName, launcher) {
    const browser = await launcher.launch();
    const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    await pg.setContent(page({ seats: false }));
    await pg.waitForTimeout(300);
    const l0 = load();
    const r = await logRun(pg, `
      setStatic(480);
      await new Promise((r) => requestAnimationFrame(r));
      play(480, 0, 102);
      await Promise.all(window.__C.anims.map((a) => a.finished));
      setMk("handover");
      // the reserve shrinks to the landed extent, centred (a = ½), and every lane returns to 0
      fp.style.left = (${FX} + (${W} - 102) / 2) + "px"; fp.style.width = "102px";
      for (const a of window.__C.anims) a.cancel();
      window.__A = 0.5;
      for (const id of Object.keys(laneMap(102))) document.getElementById(id).style.transform = "none";
      dL.style.width = dR.style.width = "204px"; dR.style.left = "-102px"; plate.style.left = "102px"; plate.style.width = "102px";
      sL.style.width = (200 + 51) + "px"; sR.style.left = "51px"; sR.style.width = (51 + 200) + "px"; kL.style.width = kR.style.width = "204px"; kR.style.left = "-153px";
      await new Promise((r) => setTimeout(r, 200));
    `);
    await browser.close();
    const fr = r.frames, iH = fr.findIndex((f) => f.mk === "handover");
    const around = fr.slice(Math.max(0, iH - 3), iH + 4).map((f) => ({ l: f.e[0], r: f.e[2], w: +(f.e[2] - f.e[0]).toFixed(3) }));
    let maxStep = 0; for (let i = Math.max(1, iH - 2); i < Math.min(fr.length, iH + 4); i++) maxStep = Math.max(maxStep, Math.abs(fr[i].e[0] - fr[i - 1].e[0]), Math.abs(fr[i].e[2] - fr[i - 1].e[2]));
    const cell = { engine: engineName, maxEdgeStepAroundHandoverPx: +maxStep.toFixed(3), around, loadBefore: l0, loadAfter: load() };
    console.log(engineName, "hand", JSON.stringify(cell));
    return [cell];
}

const engines = [["chromium", chromium], ["webkit", webkit]];
const result = { probe: "D2-G-spec-probes.mjs", which: WHICH, rung: DOCK_RUNG, rungSpec: springSpec(DOCK_RUNG), footprint: { x: FX, y: FY, w: W, h: H, r: R }, started: new Date().toISOString(), versions: {} };
for (const [n, l] of engines) { const b = await l.launch(); result.versions[n] = b.version(); await b.close(); }
const run = async (key, fn, reps = 1) => { result[key] = []; for (let r = 1; r <= reps; r++) for (const [n, l] of engines) result[key].push(...(await fn(n, l, r))); };
if (WHICH === "q3" || WHICH === "all") { await run("q3", q3, REPS); await run("q3v", q3v, 1); }
if (WHICH === "q4" || WHICH === "all") await run("q4", q4);
if (WHICH === "q5" || WHICH === "all") { await run("q5iso", q5iso); await run("q5", q5); }
if (WHICH === "q2x" || WHICH === "all") await run("q2x", q2x, REPS);
if (WHICH === "hand" || WHICH === "all") await run("hand", hand);
result.finished = new Date().toISOString();
fs.writeFileSync(path.join(REC, `d2g-spec-${WHICH}.json`), JSON.stringify(result, null, 1));
console.log("wrote", path.join(REC, `d2g-spec-${WHICH}.json`));
