// Shell-vh-morph via the REAL morph button (aria-label "demonstrate the vertical-horizontal…").
// Full-viewport screencast, both legs, both modes. On /display/atoms (a CONTENT route).
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import {
    recordFrameSeries, motionVerdict, settledVerdict, overshootVerdict, frameDeltas, travelSpan,
} from "../../../../../../../scripts/lib/gesture-frame-recorder.mjs";

const OUT = new URL(".", import.meta.url).pathname + "gesture-shell/";
mkdirSync(OUT, { recursive: true });
const meanLpct = (s) => (s ? s.meanL * 100 : NaN);

async function screencast(page, stem, windowMs, trigger, region) {
    const client = await page.context().newCDPSession(page);
    const raw = [];
    client.on("Page.screencastFrame", async (f) => {
        raw.push({ data: f.data, t: f.metadata.timestamp });
        try { await client.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
    });
    await client.send("Page.startScreencast", { format: "jpeg", quality: 70, everyNthFrame: 1 });
    const t0 = Date.now();
    setTimeout(() => { trigger().catch(() => {}); }, 40);
    while (Date.now() - t0 < windowMs) await page.waitForTimeout(25);
    await client.send("Page.stopScreencast").catch(() => {});
    await client.detach().catch(() => {});
    if (!raw.length) return { hist: null, signal: [] };
    const tBase = raw[0].t;
    const frames = raw.map((r, i) => {
        const jpg = `${OUT}${stem}-f${String(i).padStart(3, "0")}.jpg`;
        writeFileSync(jpg, Buffer.from(r.data, "base64"));
        const png = jpg.replace(/\.jpg$/, ".png");
        try { execFileSync("sips", ["-s", "format", "png", jpg, "--out", png], { stdio: "ignore" }); } catch {}
        return { png, tMs: Math.round((r.t - tBase) * 1000) };
    });
    const { signal } = recordFrameSeries(frames.map((f) => f.png), region, meanLpct);
    const gaps = [];
    for (let i = 1; i < frames.length; i++) gaps.push(frames[i].tMs - frames[i - 1].tMs);
    gaps.sort((a, b) => a - b);
    const span = frames[frames.length - 1].tMs - frames[0].tMs;
    const hist = {
        frameCount: frames.length, fps: span > 0 ? +(((frames.length - 1) / span) * 1000).toFixed(1) : 0,
        gapMax: gaps.length ? gaps[gaps.length - 1] : null, stallOver100: gaps.filter((g) => g > 100).length,
    };
    return { hist, signal: signal.map((v) => (Number.isFinite(v) ? +v.toFixed(2) : null)), frames };
}
function verd(signal) {
    const o = { motionFloor: 0.5, travelFloor: 1.0, settleTol: 1.5, band: 0.6 };
    const c = signal.filter((v) => Number.isFinite(v));
    return { travel: +travelSpan(c).toFixed(2), peakDelta: +Math.max(...frameDeltas(c), 0).toFixed(2),
        travelFrames: frameDeltas(c).filter((d) => d >= 0.4).length,
        motion: motionVerdict(c, o).present, settled: settledVerdict(c, o).settled, overshoot: overshootVerdict(c, o).overshoot };
}

const b = await chromium.connectOverCDP("http://localhost:9466");
const out = {};
for (const mode of ["light", "dark"]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: mode });
    const page = await ctx.newPage();
    await page.goto("http://localhost:5200/display/atoms", { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(2600);
    out[mode] = {};
    const morphBtn = page.locator('[aria-label*="vertical-horiz" i]').first();
    const region = { x: 0.0, y: 0.0, w: 1.0, h: 1.0 };
    // LEG 1
    const l1 = await screencast(page, `shell-l1-${mode}`, 1500, async () => { await morphBtn.click({ timeout: 5000 }); }, region);
    out[mode].leg1 = { hist: l1.hist, ...(l1.signal.length ? verd(l1.signal) : {}), signal: l1.signal };
    await page.waitForTimeout(700);
    // LEG 2 (reverse — click again)
    const l2 = await screencast(page, `shell-l2-${mode}`, 1500, async () => { await morphBtn.click({ timeout: 5000 }).catch(async()=>{ await page.locator('[aria-label*="vertical-horiz" i]').first().click({timeout:5000}); }); }, region);
    out[mode].leg2 = { hist: l2.hist, ...(l2.signal.length ? verd(l2.signal) : {}), signal: l2.signal };
    console.log(`[${mode}] LEG1: frames=${out[mode].leg1.hist?.frameCount} travelFrames=${out[mode].leg1.travelFrames} travel=${out[mode].leg1.travel} motion=${out[mode].leg1.motion} settled=${out[mode].leg1.settled} stall>100=${out[mode].leg1.hist?.stallOver100}`);
    console.log(`[${mode}] LEG2: frames=${out[mode].leg2.hist?.frameCount} travelFrames=${out[mode].leg2.travelFrames} travel=${out[mode].leg2.travel} motion=${out[mode].leg2.motion} settled=${out[mode].leg2.settled} stall>100=${out[mode].leg2.hist?.stallOver100}`);
    await ctx.close();
}
await b.close();
writeFileSync(OUT + "shell-morph-analysis.json", JSON.stringify(out, null, 2));
console.log("wrote shell-morph-analysis.json");
