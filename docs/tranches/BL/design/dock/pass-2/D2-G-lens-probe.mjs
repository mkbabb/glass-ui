// D2-G block test, questions 1 and 2 (REGISTRY §6): the sliding aperture's lens.
//
//   node D2-G-lens-probe.mjs <outDir> [q1|q2|all] [reps]
//
// The smallest aperture: one plate at the reserved footprint carrying the dock's one
// backdrop-filter (the floor's light-arm value, blur(16px) saturate(1.2): patched tree
// shell.css:54-57 with --glass-blur-resting-radius 16px, --glass-level 1), inside two
// nested, translating, rounded `overflow: clip` doors (one per moving edge), each door's
// content counter-translated. Anchor a = 1/2, so both doors move. The plate carries a
// probe tint (rgba(255,40,40,.25)) that is NOT the dock veil: it only lets pixels say
// "plate here" (r - g > 30) over a neutral black/white stripe backdrop (r = g).
//
// Q1 reads, per screenshot, from pixels only (DPR 2, reported in CSS px):
//   E      window extent on the centre row (first..last plated column)
//   arcErr worst |plated boundary - stadium arc| over the cap rows, arc fitted to the
//          measured centre-row edges with r = cross/2 = 28 (a lens or square shows here)
//   leak   plated pixels outside the fitted stadium by > 1 px; hole: unplated inside by > 1 px
//   sharp  peak-to-peak of the green channel over the window interior (stripes 4/4 px):
//          ~190 = unblurred (lens dead), ~0 = blurred (lens live)
//   live   the backdrop is recoloured (white/black -> white/blue) and the interior's
//          mean (b - r) must follow: the filter samples live, it is not a snapshot
// Q2 records video (the compositor's frames), decodes it with ffmpeg at 25 fps, reads the
//   plated extent per frame on the centre row, and reports the longest run of identical
//   mid-flight frames during a 1.2 s busy block at 0.8 s (S-17's calibration, D2-D Q2).
//
// Every WebKit number is Playwright WebKit (the Playwright 1.61.1 build), never Safari.
// No harness shim exists in this probe: every WebKit cell is unshimmed.
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const OUT = path.resolve(process.argv[2] ?? "./d2g-out");
const WHICH = process.argv[3] ?? "all";
const REPS = Number(process.argv[4] ?? 3);
fs.mkdirSync(OUT, { recursive: true });

const VW = 600, VH = 300, DPR = 2;
const FX = 60, FY = 122, W = 480, H = 56, R = 28; // footprint; cross 56, corner 28
const EC = 56; // collapsed: a circle
const FILTER = "blur(16px) saturate(1.2)";
const load = () => os.loadavg().map((x) => +x.toFixed(2));

// Door offsets for extent E at anchor a = 1/2.
const dOf = (E) => (W - E) / 2;

function page(opts = {}) {
    const stripe = opts.stripe ?? 4;
    return `<!doctype html><html><head><style>
    html,body{margin:0;width:${VW}px;height:${VH}px;overflow:hidden}
    body{--ink:#000;background:repeating-linear-gradient(90deg,#fff 0 ${stripe}px,var(--ink) ${stripe}px ${2 * stripe}px)}
    body.blue{--ink:#0000ff}
    .fp{position:absolute;left:${FX}px;top:${FY}px;width:${W}px;height:${H}px}
    .door{position:absolute;top:0;height:${H}px;width:${2 * W}px;overflow:clip;border-radius:${R}px}
    .door.L{left:0}
    .door.R{left:${-W}px}
    .ctr{position:absolute;inset:0}
    .plate{position:absolute;top:0;height:${H}px;width:${W}px;background:rgba(255,40,40,.25);
           backdrop-filter:${FILTER};-webkit-backdrop-filter:${FILTER}}
    .door.L>.ctr>.door.R>.ctr>.plate{left:${W}px}
    .wc .door{will-change:transform}
    .nofilter .plate{backdrop-filter:none;-webkit-backdrop-filter:none}
    .solo{position:absolute;left:${FX}px;top:${FY}px;width:${W}px;height:${H}px}
    .solo .plate{left:0;border-radius:${R}px}
    .cp{clip-path:inset(0 round ${R}px)}
    .ovh{overflow:hidden;border-radius:${R}px}
    .ctl{position:absolute;left:${FX}px;top:${FY}px;height:${H}px;width:${W}px;background:rgba(255,40,40,.6);transform-origin:50% 50%}
    </style></head><body>${opts.body ?? ""}</body></html>`;
}

// Door L at page x = FX + dL; its content counter-translated back; inside it door R
// laid out at [FX - W, FX + W] and translated by -dR, its content counter-translated;
// the plate lives at [FX, FX + W] in page coordinates whatever the doors do.
const APERTURE = `<div class="fp" id="fp"><div class="door L" id="dL"><div class="ctr" id="cL">
  <div class="door R" id="dR"><div class="ctr" id="cR"><div class="plate" id="plate"></div></div></div>
</div></div></div>`;

function setRest(E) {
    return `(() => { const d = ${dOf(E)};
      dL.style.transform = 'translateX(' + d + 'px)'; cL.style.transform = 'translateX(' + (-d) + 'px)';
      dR.style.transform = 'translateX(' + (-d) + 'px)'; cR.style.transform = 'translateX(' + d + 'px)'; })()`;
}

// WAAPI on the four boxes: the doors move, their contents counter-move, one timeline.
function animScript(E0, E1, dur, easing, extra = "") {
    const d0 = dOf(E0), d1 = dOf(E1);
    return `(() => {
      const o = { duration: ${dur}, easing: ${JSON.stringify(easing)}, fill: 'forwards' };
      const k = (a, b) => [{ transform: 'translateX(' + a + 'px)' }, { transform: 'translateX(' + b + 'px)' }];
      window.__anims = [
        dL.animate(k(${d0}, ${d1}), o), cL.animate(k(${-d0}, ${-d1}), o),
        dR.animate(k(${-d0}, ${-d1}), o), cR.animate(k(${d0}, ${d1}), o) ];
      ${extra}
    })()`;
}

// The dock spring (ζ 0.88, response 0.30 s) as a linear() easing over 600 ms.
function springLinear(zeta = 0.88, response = 0.3, dur = 0.6, n = 60) {
    const w0 = (2 * Math.PI) / response, wd = w0 * Math.sqrt(1 - zeta * zeta);
    const pts = [];
    for (let i = 0; i <= n; i++) {
        const t = (i / n) * dur;
        const x = 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
        pts.push(i === n ? "1" : x.toFixed(4));
    }
    return `linear(${pts.join(", ")})`;
}

// ── pixel reading ───────────────────────────────────────────────────────────────────
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

function decode(buf) { return PNG.sync.read(buf); }
const px = (img, x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
const plated = (p) => p[0] - p[1] > 30;

function readShot(img, scale = DPR) {
    const cy = Math.round((FY + H / 2) * scale);
    const x0 = Math.round((FX - 20) * scale), x1 = Math.round((FX + W + 20) * scale);
    let L = -1, Rr = -1;
    for (let x = x0; x < x1; x++) if (plated(px(img, x, cy))) { if (L < 0) L = x; Rr = x; }
    if (L < 0) return { E: 0, arcErr: null, leak: 0, hole: 0, sharp: null };
    const Lc = L / scale, Rc = (Rr + 1) / scale; // CSS px edges
    const E = Rc - Lc;
    const r = Math.min(R, E / 2);
    // Stadium SDF against the fitted edges.
    const cyc = FY + H / 2;
    const sd = (x, y) => { // signed distance in CSS px (<0 inside)
        const ax = Math.max(Lc + r, Math.min(Rc - r, x));
        return Math.hypot(x - ax, y - cyc) - r;
    };
    let arcErr = 0, leak = 0, hole = 0;
    const yA = Math.round((FY - 6) * scale), yB = Math.round((FY + H + 6) * scale);
    for (let y = yA; y < yB; y++) {
        const yc = (y + 0.5) / scale;
        // leftmost / rightmost plated in this row, compared to the arc
        let rl = -1, rr = -1;
        for (let x = x0; x < x1; x++) {
            const p = plated(px(img, x, y));
            const d = sd((x + 0.5) / scale, yc);
            if (p && d > 1) leak++;
            if (!p && d < -1) hole++;
            if (p) { if (rl < 0) rl = x; rr = x; }
        }
        const dy = yc - cyc;
        if (Math.abs(dy) < r - 1 && rl >= 0) {
            const xl = Lc + r - Math.sqrt(r * r - dy * dy), xr = Rc - r + Math.sqrt(r * r - dy * dy);
            arcErr = Math.max(arcErr, Math.abs(rl / scale - xl), Math.abs((rr + 1) / scale - xr));
        }
    }
    // Interior sharpness: green p2p over the window's straight run (or its centre).
    const ia = E > 2 * R + 8 ? Lc + R : Lc + E / 2 - 6, ib = E > 2 * R + 8 ? Rc - R : Lc + E / 2 + 6;
    let gmin = 255, gmax = 0, br = 0, n = 0;
    for (let y = Math.round((cyc - 10) * scale); y <= Math.round((cyc + 10) * scale); y++)
        for (let x = Math.round(ia * scale); x < Math.round(ib * scale); x++) {
            const p = px(img, x, y); gmin = Math.min(gmin, p[1]); gmax = Math.max(gmax, p[1]); br += p[2] - p[0]; n++;
        }
    return { E: +E.toFixed(2), L: +Lc.toFixed(2), R: +Rc.toFixed(2), arcErr: +arcErr.toFixed(2), leak: +(leak / scale / scale).toFixed(1), hole: +(hole / scale / scale).toFixed(1), sharp: gmax - gmin, bMinusR: +(br / n).toFixed(1) };
}

// ── Q1 ──────────────────────────────────────────────────────────────────────────────
async function q1(engineName, launcher) {
    const browser = await launcher.launch();
    const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: DPR });
    const pg = await ctx.newPage();
    const cells = [];
    const shot = async (id, note, expectE) => {
        const img = decode(await pg.screenshot());
        const m = readShot(img);
        cells.push({ engine: engineName, id, note, expectE, ...m, load: load() });
        console.log(engineName, id, JSON.stringify(m), expectE != null ? "expect E " + expectE : "");
        return m;
    };

    // Controls: sharp baseline, live lens, S-28's ancestor clip-path, and an ancestor
    // rounded overflow:hidden (non-translating) as the static cousin of the doors.
    await pg.setContent(page({ body: `<div class="solo nofilter"><div class="plate"></div></div>` }));
    await shot("ctl-nofilter", "plate, no backdrop-filter: the unblurred baseline", W);
    await pg.setContent(page({ body: `<div class="solo"><div class="plate"></div></div>` }));
    await shot("ctl-plate", "plate alone, own border-radius, filter: the live lens", W);
    await pg.setContent(page({ body: `<div class="solo cp"><div class="plate" style="border-radius:0"></div></div>` }));
    await shot("ctl-ancestor-clippath", "ancestor clip-path inset(0 round 28px) (S-28 reproduction)", W);
    await pg.setContent(page({ body: `<div class="solo ovh"><div class="plate" style="border-radius:0"></div></div>` }));
    await shot("ctl-ancestor-ovh", "ancestor overflow:hidden + radius 28, static", W);

    // Planted geometry defects: the reader must fail each (arcErr > 1 or leak/hole > 0).
    const plants = [
        ["plant-square", "doors border-radius 0 (a square corner)", ".door{border-radius:0}", 200, ""],
        ["plant-lens", "doors border-radius 50% (per-axis: the HEAD lens class)", ".door{border-radius:50%}", 200, ""],
        ["plant-desync", "door R's counter-translation off by 6 px at E = 480 (plate slides out of the window)", "", W, "cR.style.transform='translateX(6px)'"],
    ];
    for (const [id, note, css, E, js] of plants) {
        await pg.setContent(page({ body: `<style>${css}</style>${APERTURE}` }));
        await pg.evaluate(setRest(E));
        if (js) await pg.evaluate(js);
        await pg.waitForTimeout(80);
        await shot(id, note, E);
    }

    // The aperture at rest, three extents, plain and layer-promoted.
    for (const wc of ["", "wc"]) {
        for (const E of [EC, 200, W]) {
            await pg.setContent(page({ body: `<div class="${wc}">${APERTURE}</div>` }));
            await pg.evaluate(setRest(E));
            await pg.waitForTimeout(100);
            await shot(`rest-E${E}${wc ? "-wc" : ""}`, `aperture at rest, doors transformed statically${wc ? ", will-change: transform" : ""}`, E);
        }
    }
    // Live sampling at rest: recolour the backdrop, the interior must follow.
    await pg.setContent(page({ body: APERTURE }));
    await pg.evaluate(setRest(300));
    await pg.waitForTimeout(80);
    const a = await shot("rest-E300-live-before", "aperture at rest, white/black backdrop", 300);
    await pg.evaluate(() => document.body.classList.add("blue"));
    await pg.waitForTimeout(80);
    const b = await shot("rest-E300-live-after", "same, backdrop recoloured white/blue", 300);
    cells.push({ engine: engineName, id: "rest-live-delta", bMinusRDelta: +(b.bMinusR - a.bMinusR).toFixed(1), load: load() });

    // Mid-translate, paused: WAAPI on the four boxes, paused at fractions of a linear run.
    for (const f of [0.25, 0.5, 0.75]) {
        await pg.setContent(page({ body: APERTURE }));
        await pg.evaluate(animScript(EC, W, 1000, "linear"));
        await pg.evaluate((f) => { for (const an of window.__anims) { an.pause(); an.currentTime = 1000 * f; } }, f);
        await pg.waitForTimeout(80);
        await shot(`paused-f${f}`, "WAAPI transforms paused mid-flight", +(EC + (W - EC) * f).toFixed(2));
    }

    // Mid-translate, running: a 1.6 s linear run, three in-flight screenshots; expected E
    // from currentTime read just before and after each shot.
    await pg.setContent(page({ body: APERTURE }));
    await pg.evaluate(animScript(EC, W, 1600, "linear"));
    for (const at of [300, 700, 1100]) {
        const t0 = await pg.evaluate(() => window.__anims[0].currentTime);
        const wait = Math.max(0, at - t0);
        await pg.waitForTimeout(wait);
        const ta = await pg.evaluate(() => window.__anims[0].currentTime);
        const img = decode(await pg.screenshot());
        const tb = await pg.evaluate(() => window.__anims[0].currentTime);
        const m = readShot(img);
        const Ea = EC + (W - EC) * Math.min(1, ta / 1600), Eb = EC + (W - EC) * Math.min(1, tb / 1600);
        const cell = { engine: engineName, id: `running-${at}`, note: "WAAPI linear 1600 ms, screenshot in flight", expectE: [+Ea.toFixed(1), +Eb.toFixed(1)], inWindow: m.E >= Ea - 2 && m.E <= Eb + 2, ...m, load: load() };
        cells.push(cell); console.log(engineName, cell.id, JSON.stringify(m), "expect", cell.expectE);
    }
    // Running on the dock spring, with a backdrop recolour mid-flight (live sampling in motion).
    await pg.setContent(page({ body: APERTURE }));
    await pg.evaluate(animScript(EC, W, 2400, springLinear(0.88, 0.3, 0.6, 60)));
    await pg.waitForTimeout(250);
    const c = await shot("spring-running-before", "dock spring (ζ 0.88, 0.30 s) as linear(), slowed ×4 to 2400 ms, in flight, white/black");
    await pg.evaluate(() => document.body.classList.add("blue"));
    await pg.waitForTimeout(120);
    const d = await shot("spring-running-after", "same run, in flight, backdrop recoloured white/blue");
    cells.push({ engine: engineName, id: "running-live-delta", bMinusRDelta: +(d.bMinusR - c.bMinusR).toFixed(1), load: load() });
    await browser.close();
    return cells;
}

// ── Q2 ──────────────────────────────────────────────────────────────────────────────
const BLOCK_AT = 800, BLOCK_MS = 1200, RUN = 3000;
const blockJs = `setTimeout(() => { const t = performance.now(); while (performance.now() - t < ${BLOCK_MS}) {} }, ${BLOCK_AT});`;

function framesOf(video, dir) {
    fs.mkdirSync(dir, { recursive: true });
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", video, "-vf", "fps=25", path.join(dir, "f%04d.png")]);
    return fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(dir, f));
}

// Width of the red run on the footprint's centre row, in video pixels (scale 1).
function widthOf(img) {
    const cy = Math.round(FY + H / 2);
    let L = -1, Rr = -1;
    for (let x = 0; x < img.width; x++) { const p = px(img, x, cy); if (p[0] - p[1] > 30 && p[0] - p[2] > 30) { if (L < 0) L = x; Rr = x; } }
    return L < 0 ? 0 : Rr - L + 1;
}
function sharpOf(img, w) {
    const cy = Math.round(FY + H / 2), cx = FX + W / 2;
    let gmin = 255, gmax = 0;
    const half = Math.max(2, Math.min(40, w / 2 - R));
    for (let y = cy - 6; y <= cy + 6; y++) for (let x = Math.round(cx - half); x < cx + half; x++) { const g = px(img, x, y)[1]; gmin = Math.min(gmin, g); gmax = Math.max(gmax, g); }
    return gmax - gmin;
}

async function q2(engineName, launcher, rep) {
    const cases = {
        aperture: { body: APERTURE, go: animScript(EC, W, RUN, "linear") },
        "plant-aperture-nofilter": { body: `<div class="nofilter">${APERTURE}</div>`, go: animScript(EC, W, RUN, "linear") },
        "ctl-transform": { body: `<div class="ctl" id="ctl"></div>`, go: `ctl.animate([{transform:'scaleX(${EC / W})'},{transform:'scaleX(1)'}],{duration:${RUN},easing:'linear',fill:'forwards'})` },
        "ctl-width": { body: `<div class="ctl" id="ctl"></div>`, go: `ctl.animate([{width:'${EC}px', transform:'translateX(${(W - EC) / 2}px)'},{width:'${W}px', transform:'translateX(0px)'}],{duration:${RUN},easing:'linear',fill:'forwards'})` },
    };
    const out = [];
    for (const [name, c] of Object.entries(cases)) {
        const vdir = path.join(OUT, "video", `${engineName}-${name}-r${rep}`);
        fs.rmSync(vdir, { recursive: true, force: true });
        const browser = await launcher.launch();
        const ctx = await browser.newContext({ viewport: { width: VW, height: VH }, deviceScaleFactor: 1, recordVideo: { dir: vdir, size: { width: VW, height: VH } } });
        const pg = await ctx.newPage();
        await pg.setContent(page({ stripe: 8, body: c.body }));
        await pg.waitForTimeout(400);
        const l0 = load();
        await pg.evaluate(`(() => { window.__t0 = performance.now(); ${c.go}; ${blockJs} })()`);
        await pg.waitForTimeout(RUN + 600);
        const blocked = await pg.evaluate(() => performance.now() - window.__t0);
        await ctx.close(); await browser.close();
        const video = fs.readdirSync(vdir).find((f) => f.endsWith(".webm"));
        const frames = framesOf(path.join(vdir, video), path.join(vdir, "frames"));
        const widths = [], sharps = [], imgs = [];
        for (const f of frames) { const img = decode(fs.readFileSync(f)); imgs.push(img); const w = widthOf(img); widths.push(w); sharps.push(name.includes("aperture") ? sharpOf(img, w) : null); }
        // Mid-flight: strictly between the first and last frame at the endpoints' widths.
        // Mid-flight: the animation's first frame off the resting footprint (every case
        // starts at E_c < W - 3 after resting at W) to its last frame short of W - 3.
        const first = widths.findIndex((w) => w > 0 && w < W - 3);
        const last = widths.findLastIndex((w) => w > 0 && w < W - 3);
        let best = 0, run = 1, runStart = first, bestAt = first;
        for (let i = first + 1; i <= last; i++) {
            if (Math.abs(widths[i] - widths[i - 1]) <= 2) { run++; if (run > best) { best = run; bestAt = runStart; } }
            else { run = 1; runStart = i; }
        }
        const freezeMs = best > 1 ? (best - 1) * 40 : 0;
        // The block spans 0.8-2.0 s after the start: frames first+20 .. first+50 at 25 fps.
        const blockSharp = name.includes("aperture") ? sharps.slice(first + 20, first + 51) : null;
        // Travel inside the block window (frames first+21 .. first+49, both strictly inside
        // 0.8-2.0 s): a live compositor moves ~158 px at 424 px / 3 s; a frozen one ~0.
        const travelInBlock = widths[first + 49] - widths[first + 21];
        // Screencast sharpness at both rests: before the run (E = W, doors untransformed) and
        // after landing (E = W, doors at their end transform, animation filled).
        const restSharp = name.includes("aperture") ? { before: sharps[first - 2], after: sharps[Math.min(sharps.length - 1, last + 10)] } : null;
        // Compositor-frame geometry (1x, VP8): the stadium read of readShot on a frame inside
        // the block and on the landed rest.
        const geo = name.includes("aperture") ? Object.fromEntries([["inBlock", first + 35], ["rest", Math.min(imgs.length - 1, last + 10)]].map(([k, i]) => { const m = readShot(imgs[i], 1); return [k, { frame: i, E: m.E, arcErr: m.arcErr, leak: m.leak, hole: m.hole }]; })) : null;
        imgs.length = 0;
        const cell = { engine: engineName, rep, case: name, frames: frames.length, midFlight: [first, last], freezeMs, travelInBlock, restSharp, geo, freezeFromFrame: bestAt, widths, sharpDuringBlock: blockSharp ? { min: Math.min(...blockSharp), max: Math.max(...blockSharp) } : null, loadBefore: l0, loadAfter: load(), pageMs: +blocked.toFixed(0) };
        out.push(cell);
        console.log(engineName, "rep", rep, name, "freeze", freezeMs, "ms", "travelInBlock", travelInBlock, "frames", frames.length, "mid", first, last, restSharp ? "rest " + JSON.stringify(restSharp) + " geo " + JSON.stringify(geo) : "", blockSharp ? "sharp " + JSON.stringify(cell.sharpDuringBlock) : "", "load", l0[0]);
    }
    return out;
}

const engines = [["chromium", chromium], ["webkit (Playwright WebKit)", webkit]];
const result = { probe: "D2-G-lens-probe.mjs", filter: FILTER, footprint: { x: FX, y: FY, w: W, h: H, r: R }, dpr: DPR, started: new Date().toISOString(), versions: {}, q1: [], q2: [] };
for (const [n, l] of engines) { const b = await l.launch(); result.versions[n] = b.version(); await b.close(); }
if (WHICH === "q1" || WHICH === "all") for (const [n, l] of engines) result.q1.push(...(await q1(n, l)));
if (WHICH === "q2" || WHICH === "all") for (let r = 1; r <= REPS; r++) for (const [n, l] of engines) result.q2.push(...(await q2(n, l, r)));
result.finished = new Date().toISOString();
fs.writeFileSync(path.join(OUT, `d2g-${WHICH}.json`), JSON.stringify(result, null, 1));
console.log("wrote", path.join(OUT, `d2g-${WHICH}.json`));
