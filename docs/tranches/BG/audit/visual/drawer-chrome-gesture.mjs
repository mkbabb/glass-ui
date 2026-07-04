// BG.W-DRAWER-PAINT-BIND — Chrome live-gesture π driver (paint judge instrument).
// Drives a REAL pointer gesture on /compositions/drawer-live-behind and reads the
// LIVE-GESTURE frame series (--glass-drawer-t scalar + composited translateY). NEVER
// a settled capture. Records: open-at-half seat, 1:1 drag, release-snap frames.
import { chromium } from "playwright";

const MODE = process.argv[2] === "dark" ? "dark" : "light";
const OUT = process.argv[3] || `./drawer-chrome-${MODE}`;
const URL = "http://localhost:5200/compositions/drawer-live-behind";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
});
await context.addInitScript((m) => {
    try { localStorage.setItem("vueuse-color-scheme", m); } catch {}
}, MODE);
const page = await context.newPage();
const result = { mode: MODE, glRenderer: null, steps: {} };

try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    // Belt-and-suspenders mode set.
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
        document.documentElement.style.colorScheme = m;
    }, MODE);
    await sleep(1200); // route-enter settle

    result.glRenderer = await page.evaluate(() => {
        try {
            const c = document.createElement("canvas");
            const gl = c.getContext("webgl2") || c.getContext("webgl");
            const dbg = gl && gl.getExtension("WEBGL_debug_renderer_info");
            return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "n/a";
        } catch { return "err"; }
    });

    // Install the frame recorder (rAF sampler of scalar + composited translateY).
    await page.evaluate(() => {
        window.__rec = { on: false, frames: [] };
        const sheetSel = "[data-glass-drawer]";
        function sample() {
            const el = document.querySelector(sheetSel);
            if (el) {
                const cs = getComputedStyle(el);
                const inlineScalar = el.style.getPropertyValue("--glass-drawer-t").trim();
                // decompose the composited transform matrix → translateY px
                const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
                const rect = el.getBoundingClientRect();
                window.__rec.frames.push({
                    t: performance.now(),
                    scalar: inlineScalar === "" ? null : parseFloat(inlineScalar),
                    ty: m.m42,               // translateY px (composited, truth)
                    h: el.offsetHeight,       // sheet layout height
                    top: rect.top,            // painted top edge (viewport px)
                    vh: window.innerHeight,
                });
            }
            if (window.__rec.on) requestAnimationFrame(sample);
        }
        window.__recStart = () => { window.__rec.on = true; requestAnimationFrame(sample); };
        window.__recStop = () => { window.__rec.on = false; };
        window.__recClear = () => { window.__rec.frames = []; };
    });

    // ── STEP 1: open at HALF — record the live open-settle slide-in ──────────
    await page.evaluate(() => { window.__recClear(); window.__recStart(); });
    await page.click("#detent-half");
    await sleep(1400); // capture the full open-settle
    await page.evaluate(() => window.__recStop());
    const openFrames = await page.evaluate(() => window.__rec.frames.slice());
    result.steps.openSettle = analyzeSeries(openFrames);

    // Seated-at-half read (settled endpoint of the live open gesture).
    const seat = await page.evaluate(() => {
        const el = document.querySelector("[data-glass-drawer]");
        if (!el) return null;
        const cs = getComputedStyle(el);
        const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
        return {
            scalar: parseFloat(el.style.getPropertyValue("--glass-drawer-t")),
            ty: m.m42,
            h: el.offsetHeight,
            vh: window.innerHeight,
            tyFracOfVh: m.m42 / window.innerHeight,
            snapPointsAttr: el.getAttribute("data-glass-drawer-snap-points"),
            dir: el.getAttribute("data-glass-drawer-direction"),
        };
    });
    result.steps.seatedHalf = seat;

    // Screenshot the seated-at-half live state.
    await page.screenshot({ path: `${OUT}-seated-half.png` });

    // ── STEP 2: 1:1 DRAG the handle up, recording frames ─────────────────────
    const handleBox = await page.evaluate(() => {
        const h = document.querySelector("[data-glass-drawer-handle]");
        if (!h) return null;
        const r = h.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
    if (!handleBox) throw new Error("handle not found");

    await page.evaluate(() => { window.__recClear(); window.__recStart(); });
    const DRAG_UP = 160; // px, stays inside [0.12,1] from 0.5
    await page.mouse.move(handleBox.x, handleBox.y);
    await page.mouse.down();
    const STEPS = 12;
    for (let i = 1; i <= STEPS; i++) {
        await page.mouse.move(handleBox.x, handleBox.y - (DRAG_UP * i) / STEPS);
        await sleep(45); // slow → low release velocity → nearest-detent snap
    }
    // capture the peak-drag state (finger down, before release)
    const dragPeak = await page.evaluate(() => {
        const el = document.querySelector("[data-glass-drawer]");
        const cs = getComputedStyle(el);
        const m = new DOMMatrixReadOnly(cs.transform === "none" ? "" : cs.transform);
        return { scalar: parseFloat(el.style.getPropertyValue("--glass-drawer-t")), ty: m.m42, vh: window.innerHeight };
    });
    result.steps.dragPeak = dragPeak;
    await page.screenshot({ path: `${OUT}-drag-peak.png` });

    // ── STEP 3: RELEASE — record the snap frames ─────────────────────────────
    await page.mouse.up();
    await sleep(1200); // capture the full release snap
    await page.evaluate(() => window.__recStop());
    const dragFrames = await page.evaluate(() => window.__rec.frames.slice());
    result.steps.dragAndSnap = analyzeDragSnap(dragFrames);
    await page.screenshot({ path: `${OUT}-post-snap.png` });

    result.pass = true;
} catch (e) {
    result.error = String(e && e.stack ? e.stack : e);
    result.pass = false;
}

console.log(JSON.stringify(result, null, 2));
await browser.close();

// ── analysis helpers (injected copies live in-page too where needed) ─────────
function analyzeSeries(frames) {
    const withScalar = frames.filter((f) => f.scalar != null && Number.isFinite(f.scalar));
    const distinct = new Set(withScalar.map((f) => f.scalar.toFixed(4)));
    const scalars = withScalar.map((f) => f.scalar);
    return {
        totalFrames: frames.length,
        writtenFrames: withScalar.length,
        distinctScalarValues: distinct.size,
        first: scalars[0] ?? null,
        last: scalars[scalars.length - 1] ?? null,
        min: scalars.length ? Math.min(...scalars) : null,
        max: scalars.length ? Math.max(...scalars) : null,
        writerAlive: withScalar.length > 0 && distinct.size >= 2,
    };
}
function analyzeDragSnap(frames) {
    // partition drag (monotone travel while pointer down) vs snap (after release).
    // We detect the snap phase as the tail where scalar re-approaches a stable value
    // after the last recorded drag extreme. Report both, plus overshoot.
    const s = frames.filter((f) => f.scalar != null && Number.isFinite(f.scalar));
    if (!s.length) return { writerAlive: false, frames: frames.length };
    const scalars = s.map((f) => f.scalar);
    const peakIdx = scalars.indexOf(Math.max(...scalars));
    const snapTail = s.slice(peakIdx); // from peak drag through release-snap
    const snapScalars = snapTail.map((f) => f.scalar);
    const settled = snapScalars[snapScalars.length - 1];
    const distinctSnap = new Set(snapTail.map((f) => f.scalar.toFixed(4))).size;
    // overshoot beyond viewport = scalar > 1 (sheet past full)
    const maxScalar = Math.max(...scalars);
    return {
        writerAlive: new Set(s.map((f) => f.scalar.toFixed(4))).size >= 2,
        totalWrittenFrames: s.length,
        dragPeakScalar: Math.max(...scalars),
        settledScalar: settled,
        snapFrameCount: snapTail.length,
        distinctSnapValues: distinctSnap,
        maxScalarEver: maxScalar,
        overshootPastViewport: maxScalar > 1.0001,
        firstScalar: scalars[0],
    };
}
