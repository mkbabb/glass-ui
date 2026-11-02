// frz.mjs (D2 pass 11, fresh critic of D2-B′, §P10-7.4 "vmorph collapse in paint, both engines, at the leaving pair's frame";
// a reading, enters no row). The re-measure's strips (vmstrip.mjs) are 40 ms tiles: the `s2|s3` frame (45-52 ms in) falls
// BETWEEN two tiles and was never itself painted into a strip. This reads that frame itself.
//
// Method. B′'s scene is stepped by one requestAnimationFrame (useDockBody.ts: "one requestAnimationFrame steps every moving
// quantity"), which writes the frame's inline values. Before the trigger the page's requestAnimationFrame is wrapped: every
// callback whose FRAME timestamp lies at or past trigger + T is held, not called, so the whole frame at T is either run or
// held (all callbacks of one frame share its timestamp). At that moment every Web Animation is paused too. The DOM is then
// the state the scene wrote on its last frame before T, and stays so: the screenshot paints exactly that frame (in WebKit
// too, whatever its paint hold would have shown). A second screenshot 150 ms later must be byte-equal (the freeze held).
// Read on the frozen DOM: every seat's box, painted rect (hp.paintedRect) and opacity, and the landed spliceRow on the
// harness log up to the freeze (its last frame is the frozen one or the one before). Read in paint (deviceScaleFactor 2,
// openScene's default): per seat s2 ("1") and s3 ("2"), the rows of its box whose contrast against the plate exceeds a
// quarter of the seat's own peak, against the same seat's rows at rest (expanded, before the collapse), both relative to
// the seat's own box top. A leaving glyph is CUT in paint when its ink extent on the facing side is short of its rest
// extent by more than one device px (0.5 CSS px), or its whole ink extent is shorter by more than that. Zooms (4×, nearest) of the pair at rest and frozen are kept.
//   env DOCK_HARNESS_THEME=dark node frz.mjs --build <dir> --adapter <file> --engine chromium|webkit --at 46,48,… --runs n
//        --out <png dir> --tag <name> --json <file>
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, openTarget, launch, openScene, waitRest, startLog, stopLog, spliceRow, loadAvg, decodePng } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";

const args = parseArgs();
const engine = args.engine ?? "chromium", runs = Number(args.runs ?? 2), out = path.resolve(args.out), tag = args.tag ?? "run";
const AT = String(args.at ?? "46,48,50,52,54,56").split(",").map(Number);
fs.mkdirSync(out, { recursive: true });
const DSF = 2;
const geo = () => { const P = window.__dockProbe, hp = window.__hp; const e = P.extent(); return { e: [e.l, e.t, e.r, e.b], s: P.seats({ all: true }).map((el, i) => { const q = el.getBoundingClientRect(), c = hp.paintedRect(el); return { id: "s" + (i + 1), txt: (el.textContent || "").trim().slice(0, 12), box: [q.left, q.top, q.right, q.bottom], paint: [c.l, c.t, c.r, c.b], o: +hp.visibleOpacity(el).toFixed(3) }; }) }; };
// per seat: the rows (device px, relative to the box top) whose max contrast |L - ground| over the box's columns exceeds frac × peak
function inkRows(img, clip, s, ground) {
  const x0 = Math.max(0, Math.round((s.box[0] - clip.x) * DSF) + 2), x1 = Math.min(img.w, Math.round((s.box[2] - clip.x) * DSF) - 2);
  const y0 = Math.max(0, Math.round((s.box[1] - clip.y) * DSF) - 6), y1 = Math.min(img.h, Math.round((s.box[3] - clip.y) * DSF) + 6);
  const prof = [];
  for (let y = y0; y < y1; y++) { let m = 0; for (let x = x0; x < x1; x++) { const i = (y * img.w + x) * 4; const L = 0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2]; m = Math.max(m, Math.abs(L - ground)); } prof.push(m); }
  const peak = Math.max(...prof); const th = Math.max(12, peak / 4);
  let a = -1, b = -1; prof.forEach((v, k) => { if (v >= th) { if (a < 0) a = k; b = k; } });
  const top = Math.round((s.box[1] - clip.y) * DSF);
  return { peak: +peak.toFixed(1), lo: a < 0 ? null : (y0 + a - top) / DSF, hi: b < 0 ? null : (y0 + b + 1 - top) / DSF };
}
function groundOf(img) { // the plate tone: median luminance of the clip's central column band
  const v = []; const x = img.w >> 1; for (let y = 0; y < img.h; y++) for (let dx = -6; dx <= 6; dx += 3) { const i = (y * img.w + x + dx) * 4; v.push(0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2]); }
  v.sort((p, q) => p - q); return v[v.length >> 1];
}
const target = await openTarget(args);
const browser = await launch(engine);
const res = [];
try {
  for (let k = 1; k <= runs; k++) for (const T of AT) {
    let s; const load = loadAvg();
    try {
      s = await openScene(browser, target, "vmorph", { theme: process.env.DOCK_HARNESS_THEME || null });
      await s.page.evaluate(() => window.__scene.expand()); await s.page.waitForTimeout(200); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(400);
      const g0 = await s.page.evaluate(geo);
      const s2 = g0.s[1], s3 = g0.s[2];
      // the clip: the pair's two boxes, 14 px around, from each state's own boxes (the collapsing plate carries the pair
      // along the axis, so the frozen clip is taken from the frozen boxes)
      const clipOf = (a, b) => { const x = Math.floor(Math.min(a.box[0], b.box[0]) - 14), y = Math.floor(a.box[1] - 14); return { x, y, width: Math.ceil(Math.max(a.box[2], b.box[2]) + 14) - x, height: Math.ceil(b.box[3] + 14) - y }; };
      const clip = clipOf(s2, s3);
      const restPng = path.join(out, `rest-${tag}-T${T}-r${k}.png`);
      fs.writeFileSync(restPng, await s.page.screenshot({ clip }));
      await startLog(s.page, { seats: true, ink: true, glyphs: true }); await s.page.waitForTimeout(100);
      const fz = await s.page.evaluate((T) => new Promise((res) => {
        const raf0 = window.requestAnimationFrame.bind(window); const F = window.__frz = { held: [], on: false, at: null, last: null, t0: null };
        window.requestAnimationFrame = (cb) => raf0((ts) => {
          if (F.t0 != null && (F.on || ts - F.t0 >= T)) { if (!F.on) { F.on = true; F.at = ts - F.t0; for (const a of document.getAnimations()) { try { a.pause(); } catch { } } setTimeout(() => res({ at: F.at, last: F.last, held: F.held.length }), 60); } F.held.push(cb); return; }
          if (F.t0 != null) F.last = ts - F.t0; cb(ts);
        });
        window.__hpLog.mark = "go"; F.t0 = performance.now(); window.__scene.collapse();
      }), T);
      const frozen = await s.page.evaluate(geo);
      const frzPng = path.join(out, `frz-${tag}-T${T}-r${k}.png`);
      const clipF = clipOf(frozen.s[1], frozen.s[2]);
      const b1 = await s.page.screenshot({ clip: clipF }); fs.writeFileSync(frzPng, b1);
      await s.page.waitForTimeout(150);
      const b2 = await s.page.screenshot({ clip: clipF });
      const held = Buffer.compare(b1, b2) === 0;
      const frames = await stopLog(s.page); const i0 = frames.findIndex((f) => f.mk === "go"); const strip = i0 > 0 ? frames.slice(i0 - 1) : frames;
      const sp = spliceRow(strip, "y"); const spLast = strip.length > 1 ? spliceRow(strip.slice(-2), "y") : null;
      const iR = decodePng(fs.readFileSync(restPng)), iF = decodePng(b1);
      const gR = groundOf(iR), gF = groundOf(iF);
      const pair = [1, 2].map((j) => { const r = g0.s[j], f = frozen.s[j]; const ir = inkRows(iR, clip, r, gR), iff = inkRows(iF, clipF, f, gF);
        const cutTop = ir.lo != null && iff.lo != null ? +(iff.lo - ir.lo).toFixed(2) : null, cutBot = ir.hi != null && iff.hi != null ? +(ir.hi - iff.hi).toFixed(2) : null;
        const lenShort = ir.lo != null && iff.lo != null ? +((ir.hi - ir.lo) - (iff.hi - iff.lo)).toFixed(2) : null;
        return { id: f.id, txt: f.txt, lenShort, o: f.o, box: f.box.map((v) => +v.toFixed(2)), paint: f.paint.map((v) => +v.toFixed(2)), paintInBox: [+(f.paint[1] - f.box[1]).toFixed(2), +(f.box[3] - f.paint[3]).toFixed(2)], restInk: ir, frozenInk: iff, inkShortTop: cutTop, inkShortBottom: cutBot }; });
      // the pair's facing edges: s2's bottom (far end of the first) and s3's top; cut in paint if short by > 0.5 CSS px there
      const facingCut = (pair[0].inkShortBottom ?? 0) > 0.5 || (pair[1].inkShortTop ?? 0) > 0.5 || (pair[0].lenShort ?? 0) > 0.5 || (pair[1].lenShort ?? 0) > 0.5;
      const gapNow = +(frozen.s[2].paint[1] - frozen.s[1].paint[3]).toFixed(2);
      const zoom = path.join(out, `zoom-${tag}-T${T}-r${k}.png`);
      execFileSync("ffmpeg", ["-v", "error", "-y", "-i", restPng, "-i", frzPng, "-filter_complex", "[0:v]scale=iw*2:ih*2:flags=neighbor[a];[1:v]scale=iw*2:ih*2:flags=neighbor[b];[a][b]hstack=inputs=2", "-frames:v", "1", zoom]);
      fs.rmSync(restPng); fs.rmSync(frzPng);
      const rec = { engine, tag, T, run: k, load, loadEnd: loadAvg(), frozeAtMs: +fz.at.toFixed(1), lastRunFrameMs: fz.last == null ? null : +fz.last.toFixed(1), freezeHeld: held, logFrames: strip.length,
        splice: { n: sp.spliceFrames, first: sp.firstSplice, lastFrameSplice: spLast ? spLast.spliceFrames > 0 : null }, gapNowPx: gapNow, facingCut, pair, zoom: path.basename(zoom) };
      res.push(rec);
      console.log(`vmorph collapse frz ${tag} T${T} r${k} froze ${rec.frozeAtMs} (last run frame ${rec.lastRunFrameMs}) held ${held} splice ${sp.spliceFrames}${sp.firstSplice ? " " + sp.firstSplice.units.join("|") + " gap " + sp.firstSplice.gapPx + " at " + sp.firstSplice.atMs : ""} lastFrameSplice ${rec.splice.lastFrameSplice} gapNow ${gapNow} ` +
        pair.map((p) => `${p.id}"${p.txt}" o ${p.o} paintInBox ${p.paintInBox.join("/")} ink rest ${p.restInk.lo}-${p.restInk.hi} frozen ${p.frozenInk.lo}-${p.frozenInk.hi} short ${p.lenShort}`).join(" · ") + ` facingCut ${facingCut} [load ${load}]`);
    } catch (e) { console.log(`vmorph collapse frz ${tag} T${T} r${k} ERROR ${String(e).split("\n")[0].slice(0, 200)} [load ${load}]`); res.push({ engine, tag, T, run: k, load, error: String(e).slice(0, 300) }); }
    finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(res, null, 1));
process.exit(0);
