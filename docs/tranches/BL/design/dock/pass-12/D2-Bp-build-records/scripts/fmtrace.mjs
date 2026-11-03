// fmtrace.mjs (D2 pass 12, BUILDER of D2-B′, REGISTRY §P11-7.3 item 3): the B2 paint hole beside the scene's own per-frame state.
// FM's warm-expand and first-expand (harness/film.mjs, the same SEQ rows, screencast, red/black trigger marker, startLog read,
// strip and lib.mjs holePaint, all unchanged) on a `lanetrace.py --units` build, with the scene's lane trace captured over the
// same run. Beside every cast frame it reports, for the handoff place (the collapsed face's "P" leaving, the full face's "1"
// arriving on its place): each unit's painted interval and seam ramp as the scene wrote them (clip inset and mask-image stops,
// reconstructed from the scene's own writes), its reveal limiter, the gift, and the share of its glyph's ink the written
// clip and mask leave (alpha integrated over the glyph's ink interval, measured on the page at rest; and weighted by the glyph's own
// ink per column, drawn on a canvas in the seat's computed font), with the seat's
// computed opacity read on every rAF. "Both units written to no ink" is a frame where both ink-weighted shares are under 0.1
// (the hole read's own bound, lib.mjs holePaint).
//   node fmtrace.mjs --build <dir> --adapter <a> --engine webkit [--theme dark] --cells warm-expand,first-expand --json <f> --out <dir>
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness";
const { parseArgs, openTarget, launch, screencast, readFrame, waitRest, extentNow, r2, startLog, stopLog, holePaint, loadAvg } = await import(H + "/lib.mjs");
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine; const theme = args.theme === "dark" ? "dark" : null;
if (theme) process.env.DOCK_HARNESS_THEME = "dark";
const TILES = 14, NOISE_PX = 40, MARK_PX = 8, FRAME_MS = 40;
const ALL = {
    "first-expand": { name: "first-expand", scene: "morph", go: [["expand"]] },
    "warm-expand": { name: "warm-expand", scene: "morph", pre: [["expand"], ["collapse"]], go: [["expand"]] },
};
const SEQ = String(args.cells || "warm-expand,first-expand").split(",").map((n) => ALL[n]);
const out = path.resolve(args.out); fs.mkdirSync(out, { recursive: true });
const lum = (img, m) => { let sum = 0, n = 0; for (let y = m.y + 2; y < m.y + m.h - 2; y++) for (let x = m.x + 2; x < m.x + m.w - 2; x++) { const i = (y * img.w + x) * 4; sum += (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3; n++; } return n > 0 ? sum / n : 0; };
const marked = (img, m) => lum(img, m) < 60;
const armed = (img, m) => { let r = 0, g = 0, b = 0, n = 0; for (let y = m.y + 2; y < m.y + m.h - 2; y++) for (let x = m.x + 2; x < m.x + m.w - 2; x++) { const i = (y * img.w + x) * 4; r += img.data[i]; g += img.data[i + 1]; b += img.data[i + 2]; n++; } return n > 0 && r / n > 180 && g / n < 80 && b / n < 80; };
const hook = (page, [fn, a]) => page.evaluate(([fn, a]) => window.__scene[fn](a), [fn, a]);
// glyph ink interval, unit-local main axis px, of the dock seat whose trimmed text is `txt` (read at rest)
const glyphOf = (page, txt) => page.evaluate((txt) => {
    const root = window.__dockProbe.root();
    for (const el of root.querySelectorAll("*")) {
        if ((el.textContent || "").trim() !== txt || el.children.length > 1) continue;
        const seat = el.closest("[data-dock-seat]") || el; const sb = seat.getBoundingClientRect(); if (sb.width < 1) continue;
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (n.textContent.trim()) break; if (!n) continue;
        const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
        // the glyph's own ink per 0.25 px column, unit-local (canvas, the element's computed font, 4 px per CSS px)
        const cs = getComputedStyle(n.parentElement); const S = 4, W = Math.ceil(sb.width * S), Hh = Math.ceil(sb.height * S);
        const cv = document.createElement("canvas"); cv.width = W; cv.height = Hh; const cx = cv.getContext("2d");
        cx.scale(S, S); cx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; cx.textBaseline = "middle"; cx.fillStyle = "#000";
        cx.fillText(n.textContent.trim(), q.left - sb.left, sb.height / 2);
        const px = cx.getImageData(0, 0, W, Hh).data; const col = new Array(W).fill(0);
        for (let y = 0; y < Hh; y++) for (let x = 0; x < W; x++) col[x] += px[(y * W + x) * 4 + 3] / 255;
        return { lo: q.left - sb.left, hi: q.right - sb.left, w: sb.width, col: col.map((v) => +v.toFixed(2)) };
    }
    return null;
}, txt);
// alpha at local x from a unit's written state: visible [v0, v1] local, mask stops (local px, alpha)
const parseMask = (mk) => { if (!mk) return null; const st = [...mk.matchAll(/rgb\(0 0 0 \/ ([0-9.]+)\) (-?[0-9.]+)px/g)].map((m) => [+m[2], +m[1]]); return st.length ? st : null; };
const alphaAt = (x, v0, v1, st) => { if (x < v0 || x > v1) return 0; if (!st) return 1; if (x <= st[0][0]) return st[0][1]; for (let i = 1; i < st.length; i++) if (x <= st[i][0]) { const [x0, a0] = st[i - 1], [x1, a1] = st[i]; return x1 - x0 < 1e-6 ? a1 : a0 + (a1 - a0) * (x - x0) / (x1 - x0); } return st.at(-1)[1]; };
const inkShare = (u, g) => {
    if (!u || !g) return null;
    if (!u.vis) return 0;
    const v0 = u.vis[0] - u.bx[0], v1 = u.vis[1] - u.bx[0]; const st = parseMask(u.mk);
    let s = 0, n = 0; for (let x = g.lo; x <= g.hi; x += 0.25) { s += alphaAt(x, v0, v1, st); n++; }
    return n ? +(s / n).toFixed(3) : null;
};
// the same written clip and mask weighted by the glyph's own ink per column: the share of its rest ink the frame paints
const inkPaint = (u, g) => {
    if (!u || !g?.col) return null;
    if (!u.vis) return 0;
    const v0 = u.vis[0] - u.bx[0], v1 = u.vis[1] - u.bx[0]; const st = parseMask(u.mk);
    let s = 0, t = 0; g.col.forEach((c, i) => { const x = (i + 0.5) / 4; s += c * alphaAt(x, v0, v1, st); t += c; });
    return t ? +(s / t).toFixed(3) : null;
};
const browser = await launch(engine);
const res = { engine, theme: theme || "light", build: target.label, load: loadAvg(), cells: {} };
try {
    for (const q of SEQ) {
        const dir = path.join(out, `cast-${q.name}`);
        let box = null, strip = null, trace = null, gP = null, g1 = null, ops = null;
        const cast = await screencast(browser, target, q.scene, { ctx: { deviceScaleFactor: 1 }, dir, crop: () => box }, async (page, mark) => {
            for (const h of q.pre ?? []) { await hook(page, h); await page.waitForTimeout(200); await waitRest(page, { quiet: 500, cap: 7000 }); }
            await page.waitForTimeout(400);
            gP = await glyphOf(page, "P");
            const e0 = await extentNow(page);
            await page.evaluate(({ s }) => { const m = document.createElement("div"); m.id = "hp-film-mark"; m.style.cssText = `position:fixed;left:0px;top:0px;width:${s}px;height:${s}px;background:#f00;z-index:2147483647;pointer-events:none;`; document.body.appendChild(m); }, { s: MARK_PX });
            await page.waitForTimeout(300);
            await startLog(page, { seats: true, ink: true, glyphs: true }); await page.waitForTimeout(100);
            await page.evaluate(() => {   // the two seats' computed opacity, every rAF (read only)
                window.__laneTrace = []; const root = window.__dockProbe.root(); const hp = window.__hp;
                const find = (t) => [...root.querySelectorAll("[data-dock-seat]")].find((el) => (el.textContent || "").trim() === t);
                const P = find("P"), one = find("1"); const O = window.__ops = [];
                const tick = (ts) => { if (window.__opsStop) return; O.push([ts, P ? +hp.visibleOpacity(P).toFixed(3) : null, one ? +hp.visibleOpacity(one).toFixed(3) : null]); requestAnimationFrame(tick); };
                requestAnimationFrame(tick);
            });
            mark("go");
            await page.evaluate((go) => { window.__hpLog.mark = "go"; document.getElementById("hp-film-mark").style.setProperty("background", "#000", "important"); window.__goPn = performance.now(); for (const [fn, a] of go) window.__scene[fn](a); }, q.go);
            await page.waitForTimeout(1200); await waitRest(page, { quiet: 400, cap: 7000 });
            const fr = await stopLog(page); const i0 = fr.findIndex((f) => f.mk === "go");
            strip = i0 > 0 ? fr.slice(i0 - 1) : fr;
            trace = await page.evaluate(() => { window.__opsStop = true; return { t: window.__laneTrace, ops: window.__ops, goPn: window.__goPn }; });
            g1 = await glyphOf(page, "1");
            const e1 = await extentNow(page); const vp = page.viewportSize();
            const l = Math.max(0, Math.min(e0.l, e1.l) - 24), t = Math.max(0, Math.min(e0.t, e1.t) - 24), r = Math.min(vp.width, Math.max(e0.r, e1.r) + 24), b = Math.min(vp.height, Math.max(e0.b, e1.b) + 24);
            box = { x: l, y: t, width: r - l, height: b - t };
        });
        const imgs = cast.frames.map((f) => readFrame(f));
        const mdir = path.join(dir, "mark"); fs.mkdirSync(mdir, { recursive: true });
        execFileSync("ffmpeg", ["-v", "error", "-i", cast.video, "-vsync", "0", "-vf", `crop=${MARK_PX}:${MARK_PX}:0:0`, path.join(mdir, "m%05d.png")]);
        const mk_ = fs.readdirSync(mdir).filter((f) => /^m\d+\.png$/.test(f)).sort().map((f) => readFrame({ file: path.join(mdir, f), origin: { x: 0, y: 0 } }));
        const m = { x: 0, y: 0, w: MARK_PX, h: MARK_PX };
        const lit = mk_.findIndex((img) => armed(img, m));
        const start = lit < 0 ? -1 : mk_.findIndex((img, i) => i > lit && marked(img, m));
        if (start < 0) { res.cells[q.name] = { error: "no trigger marker" }; continue; }
        const s0 = Math.max(0, start - 1); const pick = cast.frames.slice(s0, s0 + TILES);
        const png = path.join(out, `strip-${engine}-${q.name}.png`); const list = path.join(dir, "strip.txt");
        fs.writeFileSync(list, pick.map((f) => `file '${f.file}'`).join("\n"));
        execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", list, "-vf", `tile=1x${pick.length}:padding=2:color=red`, "-frames:v", "1", png]);
        const hole = holePaint(strip, imgs, { start, frameMs: FRAME_MS, ax: "x" });
        // the scene's frames, from the trigger: per body frame, the two units' written state
        const tGo = strip.find((f) => f.mk === "go")?.t ?? null;
        const ws = trace.t.filter((x) => x.k === "w");
        const scene = ws.filter((x) => x.frame && tGo != null && x.ts >= tGo - 1).map((x) => {
            const P = x.mv.find((u) => u.l === "P"), one = x.mv.find((u) => u.l === "1");
            const op = trace.ops.find((o) => Math.abs(o[0] - x.ts) < 0.5);
            const st = (u) => u ? { vis: u.vis, bx: u.bx, rv: u.rv, gf: u.gf, own: u.own, ex: u.ex, en: u.en, clip: u.clip, mk: u.mk, xp: u.xp ? { r: u.xp.r, d: u.xp.d, heir: u.xp.heir, to: u.xp.path?.to, cut: u.xp.path?.cut } : null } : null;
            return { t: r2(x.ts - tGo), n: x.n, inkP: inkShare(P, gP), ink1: inkShare(one, g1), paintP: inkPaint(P, gP), paint1: inkPaint(one, g1), opP: op?.[1] ?? null, op1: op?.[2] ?? null, P: st(P), one: st(one) };
        });
        const none = scene.filter((s) => (s.paintP ?? s.inkP ?? 0) * (s.opP ?? 1) < 0.1 && (s.paint1 ?? s.ink1 ?? 0) * (s.op1 ?? 1) < 0.1 && s.t <= 300 && (s.P || s.one));
        const worst = scene.filter((s) => s.t <= 300 && (s.P || s.one)).reduce((m, s) => { const v = Math.max((s.paintP ?? 0) * (s.opP ?? 1), (s.paint1 ?? 0) * (s.op1 ?? 1)); return v < m.v ? { v: +v.toFixed(3), t: s.t } : m; }, { v: 9, t: null });
        res.cells[q.name] = { start, hole: hole ? { ok: hole.ok, holeFrames: hole.holeFrames, why: hole.why, frames: hole.frames } : null, glyph: { P: gP, one: g1 }, strip: png, scene, bothNone: none.map((s) => s.t), worstPlace: worst };
        console.log(`${engine} ${theme || "light"} ${q.name}: hole ${hole ? hole.why : "not read"} · scene frames with both units written to no ink (≤ 300 ms): ${none.length ? none.map((s) => s.t).join(", ") : "none"}`);
        fs.rmSync(dir, { recursive: true, force: true });
    }
} finally { await browser.close(); await target.close(); }
fs.writeFileSync(args.json, JSON.stringify(res));
