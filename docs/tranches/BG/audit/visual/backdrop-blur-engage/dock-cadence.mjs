// BUTTERY cadence harness (BG.W-BACKDROP-BLUR-ENGAGE · USER-07-05 buttery arm).
// LIVE demo (NO ?capture=). Drives each dock gesture window and records a CLEAN
// frame series: the hot rAF loop pushes ONLY performance.now() (zero forced style
// recalc — reading getComputedStyle in-loop would MANUFACTURE the jank we measure)
// plus a cheap inline-style scalar sample (el.style.getPropertyValue is an O(1)
// string read, no recalc) of the primary morph target. A PerformanceObserver
// records longtasks (>50ms main-thread blocks). Analysis brackets the in-gesture
// window and reports fps, gap histogram, gaps>33ms (dropped frames), longtasks,
// and scalar-based first-response latency.
import { chromium } from "playwright";

const CDP = process.env.CDP_URL || "http://localhost:9333";
const route = process.argv[2];
const mode = process.argv[3] || "light";
const gestureName = process.argv[4]; // collapse-expand | morph | pane-swap | rail-fan | hover-press

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch {} }, mode);
await page.goto(`http://localhost:5200${route}`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m) => {
    document.documentElement.classList.toggle("dark", m === "dark");
    document.documentElement.style.colorScheme = m;
}, mode);
await page.waitForTimeout(1500);

// Install the recorder. watchSel/watchProp identify the primary scalar to sample.
async function startRecorder(watchSel, watchProps) {
    await page.evaluate(({ sel, props }) => {
        window.__frames = [];
        window.__long = [];
        window.__marks = {};
        const el = sel ? document.querySelector(sel) : null;
        window.__watchEl = el;
        window.__watchProps = props;
        try {
            const po = new PerformanceObserver((list) => {
                for (const e of list.getEntries()) window.__long.push({ t: e.startTime, dur: e.duration });
            });
            po.observe({ entryTypes: ["longtask"] });
            window.__po = po;
        } catch {}
        window.__running = true;
        function loop(now) {
            let s = 0, has = 0;
            const e = window.__watchEl;
            if (e) for (const p of window.__watchProps) {
                const v = parseFloat(e.style.getPropertyValue(p));
                if (!isNaN(v)) { s = v; has = 1; break; }
            }
            window.__frames.push([now, has ? s : null]);
            if (window.__running) requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }, { sel: watchSel, props: watchProps });
}
async function mark(name) {
    await page.evaluate((n) => { window.__marks[n] = performance.now(); }, name);
}
async function stopAndRead() {
    return await page.evaluate(() => {
        window.__running = false;
        try { window.__po && window.__po.disconnect(); } catch {}
        return { frames: window.__frames, long: window.__long, marks: window.__marks };
    });
}

// ── per-gesture drivers ─────────────────────────────────────────────────────
async function gestureCollapseExpand() {
    // collapsible sidebar dock (data-testid=sidebar-dock-collapsible)
    await startRecorder(".demo-sidebar-dock", ["--dock-morph-t", "--dock-expand-t"]);
    await page.waitForTimeout(300);
    const dock = page.locator(".demo-sidebar-dock").first();
    const box = await dock.boundingBox();
    // expand: hover into the dock
    await mark("in1");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
    await page.waitForTimeout(950);
    // collapse: move far away
    await mark("in2");
    await page.mouse.move(1300, 850, { steps: 3 });
    await page.waitForTimeout(950);
    return [["in1", 950], ["in2", 950]];
}
async function gestureMorph() {
    await startRecorder(".dock-morph-pane", ["--dock-morph-t", "--dock-expand-t", "--stage-t"]);
    await page.waitForTimeout(300);
    await mark("in1");
    // "Morph to horizontal" toggle
    const btn = page.getByRole("button", { name: /morph to (horizontal|vertical)/i }).first();
    await btn.click();
    await page.waitForTimeout(1100);
    await mark("in2");
    const btn2 = page.getByRole("button", { name: /morph to (horizontal|vertical)/i }).first();
    await btn2.click();
    await page.waitForTimeout(1100);
    return [["in1", 1100], ["in2", 1100]];
}
async function gesturePaneSwap() {
    await startRecorder(".glass-dock", ["--dock-morph-t", "--dock-expand-t"]);
    await page.waitForTimeout(300);
    await mark("in1");
    await page.getByRole("button", { name: /^Layers$/ }).first().click();
    await page.waitForTimeout(900);
    await mark("in2");
    await page.getByRole("button", { name: /^Libraries$/ }).first().click();
    await page.waitForTimeout(900);
    return [["in1", 900], ["in2", 900]];
}
async function gestureRailFan() {
    await startRecorder(".dock-stack", ["--dock-morph-t"]);
    await page.waitForTimeout(300);
    // the rail fan is CSS --spring-dock driven (transform); bracket by timing.
    const stack = page.locator(".dock-stack").first();
    const box = await stack.boundingBox();
    await mark("in1");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
    await page.waitForTimeout(900);
    await mark("in2");
    await page.mouse.move(1300, 200, { steps: 3 });
    await page.waitForTimeout(900);
    return [["in1", 900], ["in2", 900]];
}
async function gestureHoverPress() {
    await startRecorder(".demo-sidebar-dock", ["--dock-morph-t"]);
    await page.waitForTimeout(300);
    const btn = page.locator(".dock-icon-button").first();
    const box = await btn.boundingBox();
    await mark("in1");
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 3 });
    await page.waitForTimeout(500);
    await mark("in2");
    await page.mouse.down();
    await page.waitForTimeout(300);
    await page.mouse.up();
    await page.waitForTimeout(500);
    return [["in1", 500], ["in2", 800]];
}

const drivers = {
    "collapse-expand": gestureCollapseExpand,
    "morph": gestureMorph,
    "pane-swap": gesturePaneSwap,
    "rail-fan": gestureRailFan,
    "hover-press": gestureHoverPress,
};
const windows = await drivers[gestureName]();
const data = await stopAndRead();

// ── analysis ────────────────────────────────────────────────────────────────
const frames = data.frames; // [t, scalar]
function analyzeWindow(startMark, durMs) {
    const t0 = data.marks[startMark];
    const t1 = t0 + durMs;
    const inWin = frames.filter((f) => f[0] >= t0 && f[0] <= t1);
    const deltas = [];
    for (let i = 1; i < inWin.length; i++) deltas.push(inWin[i][0] - inWin[i - 1][0]);
    const gaps33 = deltas.filter((d) => d > 33.34);
    const gaps50 = deltas.filter((d) => d > 50);
    const maxGap = deltas.length ? Math.max(...deltas) : 0;
    const meanDelta = deltas.length ? deltas.reduce((a, b) => a + b, 0) / deltas.length : 0;
    const fps = meanDelta ? 1000 / meanDelta : 0;
    const longIn = data.long.filter((l) => l.t + l.dur >= t0 && l.t <= t1 && l.dur > 50);
    // first-response: first frame after t0 where scalar differs from the frame at/just before t0
    let firstRespMs = null;
    const scalars = frames.filter((f) => f[1] != null);
    if (scalars.length) {
        const before = [...frames].reverse().find((f) => f[0] <= t0 && f[1] != null);
        const baseV = before ? before[1] : null;
        if (baseV != null) {
            const moved = frames.find((f) => f[0] > t0 && f[1] != null && Math.abs(f[1] - baseV) > 0.001);
            if (moved) firstRespMs = +(moved[0] - t0).toFixed(1);
        }
    }
    // gap histogram buckets (ms)
    const hist = { "<=17": 0, "17-33": 0, "33-50": 0, ">50": 0 };
    for (const d of deltas) {
        if (d <= 17.5) hist["<=17"]++;
        else if (d <= 33.34) hist["17-33"]++;
        else if (d <= 50) hist["33-50"]++;
        else hist[">50"]++;
    }
    return {
        frames: inWin.length,
        fps: +fps.toFixed(1),
        maxGap: +maxGap.toFixed(1),
        droppedFrames_gt33: gaps33.length,
        gaps_gt50: gaps50.length,
        longtasks_gt50: longIn.length,
        longtaskMaxDur: longIn.length ? +Math.max(...longIn.map((l) => l.dur)).toFixed(1) : 0,
        firstRespMs,
        gapHistogram: hist,
    };
}

const out = { route, mode, gesture: gestureName, windows: {} };
for (const [m, dur] of windows) out.windows[m] = analyzeWindow(m, dur);
console.log(JSON.stringify(out, null, 2));
await page.close();
await browser.close();
