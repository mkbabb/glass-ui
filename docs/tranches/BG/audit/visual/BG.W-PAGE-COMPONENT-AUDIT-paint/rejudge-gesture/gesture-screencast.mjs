// Faithful gesture frame-series recorder via CDP Page.startScreencast — browser-pushed
// frames at native compositor cadence with real monotonic timestamps (the fps/gap
// histogram measures the DEMO's paint cadence, not the instrument's protocol latency).
// Drives real SPA gestures on the NORMAL demo path (entrance animations BIND) then
// analyzes the meanL signal via scripts/lib/gesture-frame-recorder.mjs.
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
    recordFrameSeries,
    motionVerdict,
    settledVerdict,
    overshootVerdict,
    frameDeltas,
    travelSpan,
} from "../../../../../../../scripts/lib/gesture-frame-recorder.mjs";

const OUT = new URL(".", import.meta.url).pathname + "gesture-sc/";
mkdirSync(OUT, { recursive: true });
const CDP = "http://localhost:9466";
const BASE = "http://localhost:5200";
const meanLpct = (s) => (s ? s.meanL * 100 : NaN);

// Record a screencast window around a trigger. Returns {frames:[{png,tMs}], histogram}.
async function screencast(page, stem, windowMs, trigger) {
    const client = await page.context().newCDPSession(page);
    const raw = [];
    client.on("Page.screencastFrame", async (f) => {
        raw.push({ data: f.data, t: f.metadata.timestamp });
        try { await client.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
    });
    await client.send("Page.startScreencast", { format: "jpeg", quality: 75, everyNthFrame: 1 });
    const t0 = Date.now();
    // fire the trigger ~40ms in so frame 0 is pre-gesture
    setTimeout(() => { trigger().catch(() => {}); }, 40);
    while (Date.now() - t0 < windowMs) await page.waitForTimeout(30);
    await client.send("Page.stopScreencast").catch(() => {});
    await client.detach().catch(() => {});
    if (raw.length === 0) return { frames: [], hist: null, signal: [] };
    const tBase = raw[0].t;
    const frames = raw.map((r, i) => {
        const jpg = `${OUT}${stem}-f${String(i).padStart(3, "0")}.jpg`;
        writeFileSync(jpg, Buffer.from(r.data, "base64"));
        const png = jpg.replace(/\.jpg$/, ".png");
        try { execFileSync("sips", ["-s", "format", "png", jpg, "--out", png], { stdio: "ignore" }); } catch {}
        return { png, tMs: Math.round((r.t - tBase) * 1000) };
    });
    const { signal } = recordFrameSeries(frames.map((f) => f.png), { x: 0.15, y: 0.2, w: 0.7, h: 0.6 }, meanLpct);
    // fps/gap from real screencast timestamps
    const gaps = [];
    for (let i = 1; i < frames.length; i++) gaps.push(frames[i].tMs - frames[i - 1].tMs);
    gaps.sort((a, b) => a - b);
    const span = frames[frames.length - 1].tMs - frames[0].tMs;
    const hist = {
        frameCount: frames.length, spanMs: span,
        fps: span > 0 ? +(((frames.length - 1) / span) * 1000).toFixed(1) : 0,
        gapP50: gaps[Math.floor(gaps.length * 0.5)] ?? null,
        gapP90: gaps[Math.floor(gaps.length * 0.9)] ?? null,
        gapMax: gaps.length ? gaps[gaps.length - 1] : null,
        stallOver100: gaps.filter((g) => g > 100).length,
    };
    return { frames, hist, signal: signal.map((v) => (Number.isFinite(v) ? +v.toFixed(2) : null)) };
}

function verdicts(signal) {
    const opts = { motionFloor: 0.5, travelFloor: 1.0, settleTol: 1.0, band: 0.6 };
    const clean = signal.filter((v) => Number.isFinite(v));
    return {
        travel: +travelSpan(clean).toFixed(2),
        peakDelta: +Math.max(...frameDeltas(clean), 0).toFixed(2),
        motion: motionVerdict(clean, opts),
        settled: settledVerdict(clean, opts),
        overshoot: overshootVerdict(clean, opts),
    };
}

async function run() {
    const b = await chromium.connectOverCDP(CDP);
    const out = {};
    for (const mode of ["light", "dark"]) {
        const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: mode });
        const page = await ctx.newPage();
        out[mode] = { routePageBuild: [] };
        const PAIRS = [["/foundations", "rpb-foundations"], ["/display", "rpb-display"], ["/data", "rpb-data"]];
        for (const [href, stem] of PAIRS) {
            await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 30000 });
            await page.waitForTimeout(1800);
            const rec = await screencast(page, `${stem}-${mode}`, 1200, async () => {
                await page.locator(`a[href="${href}"]`).first().click({ timeout: 5000 });
            });
            const v = rec.signal.length ? verdicts(rec.signal) : {};
            out[mode].routePageBuild.push({ href, stem, hist: rec.hist, signal: rec.signal, ...v });
            console.log(`[${mode}] ${stem}: frames=${rec.hist?.frameCount} fps=${rec.hist?.fps} gapMax=${rec.hist?.gapMax} stall>100=${rec.hist?.stallOver100} travel=${v.travel} peakΔ=${v.peakDelta} motion=${v.motion?.present} settled=${v.settled?.settled} overshoot=${v.overshoot?.overshoot}`);
        }
        await ctx.close();
    }
    await b.close();
    writeFileSync(OUT + "route-page-build-analysis.json", JSON.stringify(out, null, 2));
    console.log("\nwrote route-page-build-analysis.json");
}
run().catch((e) => { console.error(e); process.exit(1); });
