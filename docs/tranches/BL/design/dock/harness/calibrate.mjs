// calibrate.mjs · the instrument facts H2's bounds rest on, re-measured on demand.
//
//   node calibrate.mjs [--engine chromium|webkit|all] [--out <dir>]
//
// PF-1   does page.screenshot() show a running transition's in-flight frame? A registered
//        custom property (@property --t, the carrier W1's WebKit morph cells used to sample)
//        and a plain `width` transition, each 1 s linear, read 300 ms in: DOM width, then two
//        screenshots, then DOM again; once running and once with every animation paused.
//        A shot that reads the END width while the DOM reads mid-flight is the PF-1 defect.
// CAST   the screencast the harness samples Playwright WebKit morphs with (lib.mjs screencast):
//        a static r-28 stadium and a static r-16 card on white, recorded and ffmpeg-decoded
//        exactly as a witness does; per frame, W1's corner read (stadium: r = cross/2; card:
//        fitted r) and the faces read's green level. The maxima set BOUND_SCREENCAST_PX,
//        CARD_SCREENCAST_PX and FACE_DOM_SCREENCAST; a moving stadium (1 s linear) shows the
//        screencast sees in-flight widths.
// Every number is printed with the 1-minute load average and written to <out>/calibrate.json.
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { playwright, parseArgs, engines, loadAvg, decodePng, magentaCoverage, interiorGreen, cornerRead, r2 } from "./lib.mjs";

const args = parseArgs();
const outRoot = path.resolve(args.out ?? process.env.DOCK_HARNESS_OUT ?? path.join(process.env.TMPDIR ?? "/tmp", "dock-harness"));
const out = path.join(outRoot, "calibrate"); fs.mkdirSync(out, { recursive: true });
const rows = [];
const log = (r) => { r.load = loadAvg(); rows.push(r); console.log(`${r.what.padEnd(8)} ${r.engine.padEnd(18)} ${r.summary}  [load ${r.load}]`); };
const LABEL = { chromium: "Chromium", webkit: "Playwright WebKit" };

const PF1 = `<body style="margin:0;background:#fff"><style>@property --t{syntax:"<number>";inherits:false;initial-value:0}
#a{position:absolute;left:100px;top:100px;height:56px;width:calc(100px + 300px * var(--t));background:#f0f;transition:--t 1s linear}
#a.on{--t:1}
#b{position:absolute;left:100px;top:200px;height:56px;width:100px;background:#f0f;transition:width 1s linear}
#b.on{width:400px}</style><div id=a></div><div id=b></div>`;
const rowWidth = (buf, cssY, vpW) => { const p = decodePng(buf); const y = Math.round(cssY * p.h / 400); let n = 0; for (let x = 0; x < p.w; x++) { const i = (y * p.w + x) * 4; if (p.data[i] > 150 && p.data[i + 1] < 100 && p.data[i + 2] > 150) n++; } return r2(n * vpW / p.w); };

const STATIC = `<body style="margin:0;background:#fff"><style>
#s{position:absolute;left:100px;top:100px;width:320px;height:56px;border-radius:28px;background:#f0f}
#c{position:absolute;left:100px;top:260px;width:320px;height:120px;border-radius:16px;background:#f0f}
#m{position:absolute;left:100px;top:460px;width:100px;height:56px;border-radius:28px;background:#f0f;transition:width 1s linear}
#m.on{width:400px}</style><div id=s></div><div id=c></div><div id=m></div>`;
function cropCov(img, x0, y0, w, h) {
    const sub = { w, h, data: Buffer.alloc(w * h * 4) };
    for (let y = 0; y < h; y++) img.data.copy(sub.data, y * w * 4, ((y0 + y) * img.w + x0) * 4, ((y0 + y) * img.w + x0 + w) * 4);
    return sub;
}

for (const engine of engines(args)) {
    if (engine === "webkit") await holdWebkit();
    const b = await playwright[engine].launch({ headless: true });
    try {
        // PF-1
        for (const mode of ["running", "paused"]) {
            const ctx = await b.newContext({ viewport: { width: 800, height: 400 }, deviceScaleFactor: 2 });
            const p = await ctx.newPage(); await p.setContent(PF1); await p.waitForTimeout(200);
            await p.evaluate(() => { document.getElementById("a").classList.add("on"); document.getElementById("b").classList.add("on"); });
            await p.waitForTimeout(300);
            if (mode === "paused") await p.evaluate(() => document.getAnimations().forEach((x) => x.pause()));
            const dom = await p.evaluate(() => ["a", "b"].map((id) => document.getElementById(id).getBoundingClientRect().width));
            const s1 = await p.screenshot({ scale: "device" }), s2 = await p.screenshot({ scale: "device" });
            const dom2 = await p.evaluate(() => ["a", "b"].map((id) => document.getElementById(id).getBoundingClientRect().width));
            const shot = { reg: [rowWidth(s1, 128, 800), rowWidth(s2, 128, 800)], plain: [rowWidth(s1, 228, 800), rowWidth(s2, 228, 800)] };
            const completes = (dom0, shotW) => dom0 < 390 && shotW >= 399;
            log({ what: "PF-1", engine: LABEL[engine], mode, domBefore: dom.map(r2), domAfter: dom2.map(r2), shot,
                registeredCompletes: completes(dom[0], shot.reg[0]), plainCompletes: completes(dom[1], shot.plain[0]),
                summary: `${mode}: registered --t: DOM ${r2(dom[0])} → shots ${shot.reg.join("/")} → DOM ${r2(dom2[0])}; plain width: DOM ${r2(dom[1])} → shots ${shot.plain.join("/")} → DOM ${r2(dom2[1])} (end = 400; a shot at 400 over a mid-flight DOM is PF-1)` });
            await ctx.close();
        }
        // CAST
        const dir = path.join(out, `cast-${engine}`); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
        const vp = { width: 800, height: 600 };
        const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 2, recordVideo: { dir, size: vp } });
        const p = await ctx.newPage(); await p.setContent(STATIC); await p.waitForTimeout(1200);
        await p.evaluate(() => document.getElementById("m").classList.add("on"));
        await p.waitForTimeout(1400);
        await ctx.close();
        const video = fs.readdirSync(dir).find((f) => f.endsWith(".webm"));
        execFileSync("ffmpeg", ["-v", "error", "-i", path.join(dir, video), "-vsync", "0", path.join(dir, "f%05d.png")]);
        const files = fs.readdirSync(dir).filter((f) => /^f\d+\.png$/.test(f)).sort();
        const st = [], cd = [], mv = [], gDom = [];
        for (const f of files) {
            const img = decodePng(fs.readFileSync(path.join(dir, f)));
            if (img.w !== vp.width) continue;
            const g = interiorGreen(img);
            const S = cropCov(img, 80, 80, 360, 96); const cs = cornerRead(magentaCoverage(S, g), S.w, S.h, 1, "x");
            const C = cropCov(img, 80, 240, 360, 160); const cc = cornerRead(magentaCoverage(C, g), C.w, C.h, 1, "x", { fitR: true });
            const M = cropCov(img, 80, 440, 440, 96); const cm = cornerRead(magentaCoverage(M, g), M.w, M.h, 1, "x");
            if (cs.empty || cc.empty) continue;
            st.push(cs.maxErr); cd.push(cc.rExpected); if (!cm.empty) mv.push(cm.w);
            // the faces read's noise: green dominance on the white page around the static stadium
            let dom = 0; for (let y = 0; y < S.h; y++) for (let x = 0; x < S.w; x++) { const i = (y * S.w + x) * 4; const r = S.data[i], gg = S.data[i + 1], bb = S.data[i + 2]; dom = Math.max(dom, gg - Math.max(r, bb)); }
            gDom.push(dom);
        }
        const distinct = new Set(mv.map((w) => Math.round(w))).size;
        log({ what: "CAST", engine: LABEL[engine], frames: st.length, stadiumMaxErr: r2(Math.max(...st)), cardR: [r2(Math.min(...cd)), r2(Math.max(...cd))], cardSpread: r2(Math.max(...cd) - Math.min(...cd)), greenDomMax: Math.max(...gDom), movingDistinctWidths: distinct,
            summary: `${st.length} decoded frames at 25 fps: static r-28 stadium corner ≤ ${r2(Math.max(...st))} px; static r-16 card fitted r ${r2(Math.min(...cd))}-${r2(Math.max(...cd))} (spread ${r2(Math.max(...cd) - Math.min(...cd))}); green dominance on white ≤ ${Math.max(...gDom)}/255; a 1 s width transition shows ${distinct} distinct widths` });
    } finally { await b.close(); }
}
fs.writeFileSync(path.join(outRoot, "calibrate.json"), JSON.stringify({ when: new Date().toISOString(), rows }, null, 1));
