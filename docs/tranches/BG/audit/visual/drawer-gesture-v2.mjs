// BG.W-DRAWER-PAINT-BIND — Chrome live-gesture π driver v2. Clean phase separation
// via a release timestamp so criterion-3 (release-snap frames) is NOT conflated with
// the drag frames. Reads --glass-drawer-t + composited translateY per rAF frame.
import { chromium } from "playwright";
const MODE = process.argv[2] === "dark" ? "dark" : "light";
const OUT = process.argv[3] || `./drawer-chrome-${MODE}`;
const URL = "http://localhost:5200/compositions/drawer-live-behind";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await context.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, MODE);
const page = await context.newPage();
const R = { mode: MODE, glRenderer: null };
try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.evaluate((m) => { document.documentElement.classList.toggle("dark", m === "dark"); document.documentElement.style.colorScheme = m; }, MODE);
    await sleep(1100);
    R.prmReduce = await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
    R.glRenderer = await page.evaluate(() => { try { const c = document.createElement("canvas"); const gl = c.getContext("webgl2"); const d = gl && gl.getExtension("WEBGL_debug_renderer_info"); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : "n/a"; } catch { return "err"; } });

    // recorder
    await page.evaluate(() => {
        window.__f = []; window.__on = false; window.__release = null;
        const s = () => {
            const el = document.querySelector("[data-glass-drawer]");
            if (el) {
                const cs = getComputedStyle(el);
                const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
                const inl = el.style.getPropertyValue("--glass-drawer-t").trim();
                window.__f.push({ t: performance.now(), sc: inl === "" ? null : parseFloat(inl), ty: m.m42, vh: innerHeight });
            }
            if (window.__on) requestAnimationFrame(s);
        };
        window.__start = () => { window.__on = true; requestAnimationFrame(s); };
        window.__stop = () => { window.__on = false; };
        window.__mark = () => { window.__release = performance.now(); };
    });

    // open at half
    await page.click("#detent-half");
    await sleep(1100);
    const seat = await page.evaluate(() => {
        const el = document.querySelector("[data-glass-drawer]"); const cs = getComputedStyle(el);
        const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
        return { scalar: parseFloat(el.style.getPropertyValue("--glass-drawer-t")), ty: m.m42, vh: innerHeight, fracOfVh: m.m42 / innerHeight, snapAttr: el.getAttribute("data-glass-drawer-snap-points"), dir: el.getAttribute("data-glass-drawer-direction") };
    });
    R.seatedHalf = seat;
    await page.screenshot({ path: `${OUT}-seated-half.png` });

    // drag + release with a clean release mark
    const hb = await page.evaluate(() => { const h = document.querySelector("[data-glass-drawer-handle]"); const r = h.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await page.evaluate(() => { window.__f = []; window.__start(); });
    const UP = 160, N = 12;
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    for (let i = 1; i <= N; i++) { await page.mouse.move(hb.x, hb.y - (UP * i) / N); await sleep(45); }
    const dragPeak = await page.evaluate(() => { const el = document.querySelector("[data-glass-drawer]"); const cs = getComputedStyle(el); const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform); return { scalar: parseFloat(el.style.getPropertyValue("--glass-drawer-t")), ty: m.m42, vh: innerHeight }; });
    await page.screenshot({ path: `${OUT}-drag-peak.png` });
    await page.evaluate(() => window.__mark());
    await page.mouse.up();
    await sleep(1100);
    await page.evaluate(() => window.__stop());
    await page.screenshot({ path: `${OUT}-post-snap.png` });

    const frames = await page.evaluate(() => ({ f: window.__f, rel: window.__release }));
    const F = frames.f.filter((x) => x.sc != null && Number.isFinite(x.sc));
    const dragF = F.filter((x) => x.t < frames.rel);
    const snapF = F.filter((x) => x.t >= frames.rel);
    const dset = (a) => new Set(a.map((x) => x.sc.toFixed(4))).size;
    // 1:1 drag ratio: Δty vs Δfinger(=UP). Δty over the whole drag.
    const tyStart = dragF.length ? dragF[0].ty : null, tyEnd = dragF.length ? dragF[dragF.length - 1].ty : null;
    R.dragPeak = dragPeak;
    R.drag = {
        frames: dragF.length, distinct: dset(dragF),
        scalarStart: dragF[0]?.sc, scalarEnd: dragF[dragF.length - 1]?.sc,
        tyStart, tyEnd, tyDeltaPx: tyStart != null ? +(tyStart - tyEnd).toFixed(1) : null,
        fingerUpPx: UP,
        ratio: tyStart != null ? +((tyStart - tyEnd) / UP).toFixed(3) : null,
    };
    const snapScalars = snapF.map((x) => x.sc);
    R.releaseSnap = {
        frames: snapF.length, distinct: dset(snapF),
        firstScalar: snapScalars[0], settledScalar: snapScalars[snapScalars.length - 1],
        maxScalar: snapScalars.length ? Math.max(...snapScalars) : null,
        minScalar: snapScalars.length ? Math.min(...snapScalars) : null,
        overshootPastViewport: snapScalars.length ? Math.max(...snapScalars) > 1.0001 : null,
        animatesGte6: dset(snapF) >= 6,
        // no-overshoot past the target detent: for a down-snap to 0.5, min shouldn't dip much below 0.5
        series: snapScalars.slice(0, 24).map((v) => +v.toFixed(4)),
    };
    R.writerAlive = dset(F) >= 2 && F.length > 0;
    R.pass = true;
} catch (e) { R.error = String(e && e.stack ? e.stack : e); R.pass = false; }
console.log(JSON.stringify(R, null, 2));
await browser.close();
