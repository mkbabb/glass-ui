// vmstrip.mjs (D2 pass 11, B′ re-measure, REGISTRY §P10-7.3 item 3; a reading, enters no row): `vmorph` collapse in PAINT.
// FM's strip (harness/film.mjs: the same screencast at 25 fps, one video px per CSS px, the same red→black trigger marker and
// the same 14 tiles of 40 ms from one frame before the marker) of the plain collapse on the vertical morph scene, which no FM
// sequence drives. Beside it, on the same run's frame log (lib.mjs startLog seats/ink/glyphs from the trigger's task): the
// landed spliceRow (the `s2|s3` leaving pair C10 §5.1 reads, with its gap and offset) and stubRow (a glyph cut hard inside
// the plate). For the eye: a 4× zoom (nearest neighbour) of the region of the first splice pair's two boxes on the marker
// frame and the four after it (0-160 ms; the pair's frame, 47-61 ms in, lies between the second and the third), plus a 3×
// zoom of the same tiles over the whole plate. The landed harness is not edited; this copies FM's capture path.
//   env DOCK_HARNESS_THEME=dark node vmstrip.mjs --build <dir> --adapter <file> --engine chromium|webkit --runs 3 --out <dir>
//        --tag <name> --json <file>
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs, openTarget, launch, screencast, readFrame, waitRest, extentNow, startLog, stopLog, spliceRow, stubRow, loadAvg } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";

const TILES = 14, MARK_PX = 8, FRAME_MS = 40, ZOOM = 4;
const args = parseArgs();
const engine = args.engine ?? "chromium", runs = Number(args.runs ?? 3), out = path.resolve(args.out), tag = args.tag ?? "run";
fs.mkdirSync(out, { recursive: true });
const lumOf = (img, m) => { let r = 0, g = 0, b = 0, n = 0; for (let y = m.y + 2; y < m.y + m.h - 2; y++) for (let x = m.x + 2; x < m.x + m.w - 2; x++) { const i = (y * img.w + x) * 4; r += img.data[i]; g += img.data[i + 1]; b += img.data[i + 2]; n++; } return n ? [r / n, g / n, b / n] : [0, 0, 0]; };
const marked = (img, m) => { const [r, g, b] = lumOf(img, m); return (r + g + b) / 3 < 60; };
const armed = (img, m) => { const [r, g, b] = lumOf(img, m); return r > 180 && g < 80 && b < 80; };
const target = await openTarget(args);
const browser = await launch(engine);
const res = [];
try {
  for (let k = 1; k <= runs; k++) {
    const load = loadAvg();
    const dir = path.join(out, `cast-${tag}-r${k}`);
    try {
      let box = null, strip = null;
      const cast = await screencast(browser, target, "vmorph", { ctx: { deviceScaleFactor: 1 }, dir, crop: () => box }, async (page, mark) => {
        await page.evaluate(() => window.__scene.expand()); await page.waitForTimeout(200); await waitRest(page, { quiet: 500, cap: 7000 });
        await page.waitForTimeout(400);
        const e0 = await extentNow(page);
        await page.evaluate((s) => { const m = document.createElement("div"); m.id = "hp-film-mark"; m.style.cssText = `position:fixed;left:0;top:0;width:${s}px;height:${s}px;background:#f00;z-index:2147483647;pointer-events:none;`; document.body.appendChild(m); }, MARK_PX);
        await page.waitForTimeout(300);
        await startLog(page, { seats: true, ink: true, glyphs: true }); await page.waitForTimeout(100);
        mark("go");
        await page.evaluate(() => { window.__hpLog.mark = "go"; document.getElementById("hp-film-mark").style.setProperty("background", "#000", "important"); window.__scene.collapse(); });
        await page.waitForTimeout(1200); await waitRest(page, { quiet: 400, cap: 7000 });
        const fr = await stopLog(page); const i0 = fr.findIndex((f) => f.mk === "go");
        strip = i0 > 0 ? fr.slice(i0 - 1) : fr;
        const e1 = await extentNow(page); const vp = page.viewportSize();
        const l = Math.max(0, Math.min(e0.l, e1.l) - 24), t = Math.max(0, Math.min(e0.t, e1.t) - 24), r = Math.min(vp.width, Math.max(e0.r, e1.r) + 24), b = Math.min(vp.height, Math.max(e0.b, e1.b) + 24);
        box = { x: l, y: t, width: r - l, height: b - t };
      });
      const mdir = path.join(dir, "mark"); fs.mkdirSync(mdir, { recursive: true });
      execFileSync("ffmpeg", ["-v", "error", "-i", cast.video, "-vsync", "0", "-vf", `crop=${MARK_PX}:${MARK_PX}:0:0`, path.join(mdir, "m%05d.png")]);
      const mk = fs.readdirSync(mdir).filter((f) => /^m\d+\.png$/.test(f)).sort().map((f) => readFrame({ file: path.join(mdir, f), origin: { x: 0, y: 0 } }));
      if (mk.length !== cast.frames.length) throw new Error(`the marker decode has ${mk.length} frames against ${cast.frames.length}`);
      const m = { x: 0, y: 0, w: MARK_PX, h: MARK_PX };
      const lit = mk.findIndex((img) => armed(img, m));
      const start = lit < 0 ? -1 : mk.findIndex((img, i) => i > lit && marked(img, m));
      if (start < 0) throw new Error("the video shows no trigger marker");
      const s0 = Math.max(0, start - 1);
      const pick = cast.frames.slice(s0, s0 + TILES);
      const png = path.join(out, `strip-${tag}-r${k}.png`), list = path.join(dir, "strip.txt");
      fs.writeFileSync(list, pick.map((f) => `file '${f.file}'`).join("\n"));
      execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-vf", `tile=${pick.length}x1:padding=2:color=red`, "-frames:v", "1", png]);
      // the frame log: the splice law and the glyph stub, on the strip's frames from the trigger
      const sp = spliceRow(strip, "y"), st = stubRow(strip, "y");
      const t0 = strip[1]?.t ?? strip[0].t;
      const perFrame = strip.slice(0, 40).map((f) => ({ t: +(f.t - strip[0].t).toFixed(1), mk: f.mk, e: f.e, s: (f.s ?? []).filter((q) => q[9] > 0.05).map((q) => ({ id: "s" + q[0], box: [q[2], q[4]], paint: [q[6], q[8]], o: q[9] })), st: f.st ?? null }));
      // the zoom: the first splice pair's two boxes (else s2|s3 by id), on the marker frame and the three after it
      const fs0 = sp.firstSplice ? strip.find((f) => +(f.t - strip[0].t).toFixed(1) === sp.firstSplice.atMs) : null;
      const ids = sp.firstSplice ? sp.firstSplice.units : ["s2", "s3"];
      const ref = fs0 ?? strip[Math.min(strip.length - 1, 5)];
      const qs = (ref.s ?? []).filter((q) => ids.includes("s" + q[0]));
      const org = cast.frames[0].origin, fw = readFrame(cast.frames[0]);
      let zoom = null, zoomPlate = null;
      const zt = cast.frames.slice(start, start + 5);
      if (qs.length) {
        const zx = Math.max(0, Math.floor(Math.min(...qs.map((q) => q[1])) - 12 - org.x)), zy = Math.max(0, Math.floor(Math.min(...qs.map((q) => q[2])) - 12 - org.y));
        const zw = Math.min(fw.w - zx, Math.ceil(Math.max(...qs.map((q) => q[3])) + 12 - org.x) - zx), zh = Math.min(fw.h - zy, Math.ceil(Math.max(...qs.map((q) => q[4])) + 12 - org.y) - zy);
        zoom = path.join(out, `zoom-${tag}-r${k}.png`);
        const zl = path.join(dir, "zoom.txt"); fs.writeFileSync(zl, zt.map((f) => `file '${f.file}'`).join("\n"));
        execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", zl, "-vf", `crop=${zw}:${zh}:${zx}:${zy},scale=iw*${ZOOM}:ih*${ZOOM}:flags=neighbor,tile=${zt.length}x1:padding=4:color=red`, "-frames:v", "1", zoom]);
      }
      zoomPlate = path.join(out, `zoomplate-${tag}-r${k}.png`);
      const zp = path.join(dir, "zoomplate.txt"); fs.writeFileSync(zp, zt.map((f) => `file '${f.file}'`).join("\n"));
      execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", zp, "-vf", `scale=iw*3:ih*3:flags=neighbor,tile=${zt.length}x1:padding=4:color=red`, "-frames:v", "1", zoomPlate]);
      const rec = { engine, tag, run: k, load, loadEnd: loadAvg(), markerFrame: start, tiles: pick.length, strip: path.basename(png), zoom: zoom && path.basename(zoom), zoomPlate: path.basename(zoomPlate),
        zoomTiles: "marker frame and the four after it (cast frames start..start+4; the log's time of cast frame k is the trigger + (k - start) × 40 ms, lib.mjs holePaint)",
        splice: { n: sp.spliceFrames, sliver: sp.sliverFrames, first: sp.firstSplice, firstSliver: sp.firstSliver, why: sp.why },
        stub: st ? { ok: st.ok, n: st.stubFrames ?? null, why: st.why, first: st.first ?? null } : null,
        pairAtSplice: qs.map((q) => ({ id: "s" + q[0], box: [q[2], q[4]], paint: [q[6], q[8]], o: q[9], adv: q[10] })), perFrame };
      res.push(rec);
      console.log(`vmorph collapse ${tag} r${k} splice ${sp.spliceFrames}${sp.firstSplice ? " " + sp.firstSplice.units.join("|") + " gap " + sp.firstSplice.gapPx + " at " + sp.firstSplice.atMs : ""} sliver ${sp.sliverFrames} stub ${st ? (st.ok ? "ok" : "STUB " + st.why) : "-"} marker ${start} strip ${path.basename(png)} [load ${load}]`);
      for (const f of fs.readdirSync(dir)) if (/^f\d+\.png$/.test(f)) fs.rmSync(path.join(dir, f));
    } catch (e) { console.log(`vmorph collapse ${tag} r${k} ERROR ${String(e).split("\n")[0].slice(0, 200)} [load ${load}]`); res.push({ engine, tag, run: k, load, error: String(e).slice(0, 300) }); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(res, null, 1));
process.exit(0);
