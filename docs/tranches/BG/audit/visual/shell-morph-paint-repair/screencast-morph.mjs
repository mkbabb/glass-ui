// BG.W-SHELL-MORPH-PAINT-REPAIR — non-authoring paint judge · CDP Page.startScreencast
// morph frame-series (the D10 fence: painted frames, not a scalar probe).
// For each (route, mode): boots ?capture over BUILT :5200, polls data-capture-ready,
// installs a Date.now() rAF sampler on the shell-dock scalars, records ~1s REST (bridge
// dormant), then drives the REAL shell dock morphTo('horizontal') [leg1 V->H] and
// morphTo('vertical') [leg2 H->V] under a live CDP screencast, pairing every painted
// frame to its sampled --dock-morph-t / --dock-bridge-opacity / settledOrientation /
// main-left by nearest wall-clock. Emits a per-run report + representative frame jpgs +
// a settled-horizontal BAR still.
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/shell-morph-paint-repair";
const CDP = process.env.CDP_URL || "http://localhost:9477";
const RUNS = [
    { route: "/foundations/colors", mode: "light", tag: "colors-light", kind: "content" },
    { route: "/foundations/colors", mode: "dark", tag: "colors-dark", kind: "content" },
    { route: "/dock/overview", mode: "light", tag: "overview-light", kind: "dock" },
    { route: "/dock/overview", mode: "dark", tag: "overview-dark", kind: "dock" },
];

const SAMPLER = () => {
    const w = window;
    w.__mSamples = [];
    const aside = document.querySelector(".demo-sidebar-rail");
    const main = document.querySelector(".demo-main-scroller") || document.querySelector("main");
    function tick() {
        try {
            const cs = aside ? getComputedStyle(aside) : null;
            let t = cs ? parseFloat(cs.getPropertyValue("--dock-morph-t")) : NaN;
            const morphing = aside ? aside.hasAttribute("data-dock-morphing") : false;
            const so = aside ? aside.getAttribute("data-shell-dock-orientation") : null;
            const bridge = aside ? aside.querySelector(".dock-morph-bridge--inplace") : null;
            let bo = 0, bridgePresent = false, bridgePaintedOpacity = 0;
            if (bridge) {
                bridgePresent = true;
                const bcs = getComputedStyle(bridge);
                bo = parseFloat(bcs.getPropertyValue("--dock-bridge-opacity"));
                bridgePaintedOpacity = parseFloat(bcs.opacity);
                if (!isFinite(bo)) bo = 0;
            }
            const ar = aside ? aside.getBoundingClientRect() : null;
            const mr = main ? main.getBoundingClientRect() : null;
            w.__mSamples.push({
                dnow: Date.now(),
                pnow: performance.now(),
                t: isFinite(t) ? t : null,
                morphing,
                so,
                bridgePresent,
                bo,
                bridgePaintedOpacity,
                asideW: ar ? Math.round(ar.width) : null,
                asideH: ar ? Math.round(ar.height) : null,
                asideL: ar ? Math.round(ar.left) : null,
                asideT: ar ? Math.round(ar.top) : null,
                asidePos: aside ? getComputedStyle(aside).position : null,
                mainL: mr ? Math.round(mr.left) : null,
            });
        } catch (e) { /* ignore */ }
        w.__mRAF = requestAnimationFrame(tick);
    }
    tick();
};

async function run(browser, { route, mode, tag, kind }) {
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
    // confirm the shell dock + the morph seam exist on this route
    const seam = await page.evaluate(() => ({
        hasAside: !!document.querySelector(".demo-sidebar-rail"),
        hasSeam: !!(window.__shellDockMorph && typeof window.__shellDockMorph.morphTo === "function"),
        asideRect: (() => { const a = document.querySelector(".demo-sidebar-rail"); if (!a) return null; const r = a.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), l: Math.round(r.left), t: Math.round(r.top) }; })(),
    }));

    // Install the sampler
    await page.evaluate(SAMPLER);
    await page.waitForTimeout(900); // ~1s REST baseline (bridge dormant)

    // CDP screencast
    const cdp = await page.context().newCDPSession(page);
    const frames = [];
    cdp.on("Page.screencastFrame", async (ev) => {
        if (ev && typeof ev.data === "string" && ev.metadata) frames.push({ ts: ev.metadata.timestamp, data: ev.data });
        try { await cdp.send("Page.screencastFrameAck", { sessionId: ev.sessionId }); } catch {}
    });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, everyNthFrame: 1 });

    // ── leg1: V -> H ──
    const leg1Trigger = await page.evaluate(() => { const d = Date.now(); window.__shellDockMorph.morphTo("horizontal"); return d; });
    await page.waitForTimeout(1700);
    const settledH = await page.evaluate(() => {
        const a = document.querySelector(".demo-sidebar-rail");
        const m = document.querySelector(".demo-main-scroller") || document.querySelector("main");
        const ar = a.getBoundingClientRect(); const mr = m.getBoundingClientRect();
        return {
            so: a.getAttribute("data-shell-dock-orientation"),
            asidePos: getComputedStyle(a).position,
            asideW: Math.round(ar.width), asideH: Math.round(ar.height), asideL: Math.round(ar.left), asideT: Math.round(ar.top),
            mainL: Math.round(mr.left), morphing: a.hasAttribute("data-dock-morphing"),
        };
    });
    // settled-horizontal BAR still
    await page.screenshot({ path: `${OUT}/chrome-endpoint/${tag}-B-settled-horizontal.png`, fullPage: false });

    // ── leg2: H -> V ──
    const leg2Trigger = await page.evaluate(() => { const d = Date.now(); window.__shellDockMorph.morphTo("vertical"); return d; });
    await page.waitForTimeout(1700);
    const settledV = await page.evaluate(() => {
        const a = document.querySelector(".demo-sidebar-rail");
        const m = document.querySelector(".demo-main-scroller") || document.querySelector("main");
        const ar = a.getBoundingClientRect(); const mr = m.getBoundingClientRect();
        return {
            so: a.getAttribute("data-shell-dock-orientation"),
            asidePos: getComputedStyle(a).position,
            asideW: Math.round(ar.width), asideH: Math.round(ar.height), asideL: Math.round(ar.left), asideT: Math.round(ar.top),
            mainL: Math.round(mr.left), morphing: a.hasAttribute("data-dock-morphing"),
        };
    });
    await page.screenshot({ path: `${OUT}/chrome-endpoint/${tag}-A-rest-vertical.png`, fullPage: false });

    await cdp.send("Page.stopScreencast");
    const samples = await page.evaluate(() => { cancelAnimationFrame(window.__mRAF); return window.__mSamples; });

    // ── pair each painted frame to its nearest-wall-clock sample ──
    function nearest(ts_ms) {
        let best = null, bd = Infinity;
        for (const s of samples) { const d = Math.abs(s.dnow - ts_ms); if (d < bd) { bd = d; best = s; } }
        return best ? { ...best, pairDelta: bd } : null;
    }
    const paired = frames.map((f) => {
        const ts_ms = f.ts * 1000;
        const sha = createHash("sha1").update(f.data).digest("hex").slice(0, 12);
        return { ts_ms, sha, data: f.data, s: nearest(ts_ms) };
    });

    // Split legs by trigger timestamps; a "gesture window" = trigger .. trigger+~1200ms
    const GEST = 1300;
    const leg1Frames = paired.filter((p) => p.ts_ms >= leg1Trigger && p.ts_ms <= leg1Trigger + GEST);
    const leg2Frames = paired.filter((p) => p.ts_ms >= leg2Trigger && p.ts_ms <= leg2Trigger + GEST);

    function analyzeLeg(fr, trigger) {
        // distinct painted frames whose paired t is a genuine travel value
        const travel = fr.filter((p) => p.s && p.s.t != null && p.s.t > 0.02 && p.s.t < 0.98);
        const distinctTravel = new Set(travel.map((p) => p.sha)).size;
        const teardropWin = travel.filter((p) => p.s.t > 0.18 && p.s.t < 0.82);
        const teardropWithBridge = teardropWin.filter((p) => p.s.bridgePresent && p.s.bo > 0.01);
        // inter-frame gaps within the gesture window (buttery cadence)
        const tss = fr.map((p) => p.ts_ms).sort((a, b) => a - b);
        const gaps = [];
        for (let i = 1; i < tss.length; i++) gaps.push(Math.round(tss[i] - tss[i - 1]));
        const maxGap = gaps.length ? Math.max(...gaps) : null;
        const gapsOver33 = gaps.filter((g) => g > 33).length;
        const gapsOver50 = gaps.filter((g) => g > 50).length;
        const gapsOver100 = gaps.filter((g) => g > 100).length;
        // first responding frame after input: first frame whose paired t left the endpoint
        const firstResp = fr.find((p) => p.s && p.s.t != null && ((trigger === leg1Trigger && p.s.t > 0.03) || (trigger === leg2Trigger && p.s.t < 0.97)));
        const firstRespLatency = firstResp ? Math.round(firstResp.ts_ms - trigger) : null;
        // re-margin transition: find where mainL flips across the gesture, record bo/t there
        const withMain = fr.filter((p) => p.s && p.s.mainL != null);
        let reMargin = null;
        for (let i = 1; i < withMain.length; i++) {
            const a = withMain[i - 1].s, b = withMain[i].s;
            if (Math.abs((a.mainL ?? 0) - (b.mainL ?? 0)) > 30) {
                reMargin = { fromL: a.mainL, toL: b.mainL, at_t: b.t, at_bo: b.bo, at_bridge: b.bridgePresent, at_so: b.so, at_morphing: b.morphing, ts_after_trigger: Math.round(withMain[i].ts_ms - trigger) };
                break;
            }
        }
        // frame count & duration
        const durMs = tss.length ? tss[tss.length - 1] - tss[0] : 0;
        const fps = durMs > 0 ? +(tss.length / (durMs / 1000)).toFixed(1) : null;
        return { frameCount: fr.length, distinctTravel, teardropWinCount: teardropWin.length, teardropWithBridge: teardropWithBridge.length, maxBridgeOpacity: travel.reduce((m, p) => Math.max(m, p.s.bo || 0), 0), maxGap, gapsOver33, gapsOver50, gapsOver100, firstRespLatency, reMargin, fps, gapHistogram: histogram(gaps) };
    }
    function histogram(gaps) {
        const b = { "0-16": 0, "17-33": 0, "34-50": 0, "51-100": 0, ">100": 0 };
        for (const g of gaps) { if (g <= 16) b["0-16"]++; else if (g <= 33) b["17-33"]++; else if (g <= 50) b["34-50"]++; else if (g <= 100) b["51-100"]++; else b[">100"]++; }
        return b;
    }

    // rest samples (before leg1 trigger) — bridge dormant check
    const restSamples = samples.filter((s) => s.dnow < leg1Trigger - 50);
    const restBridgeVisible = restSamples.filter((s) => s.bridgePresent && s.bo > 0.01).length;
    // settled samples (after leg2 settle) — bridge dormant at t=0 endpoint
    const settleSamples = samples.filter((s) => s.dnow > leg2Trigger + 1400);
    const settleBridgeVisible = settleSamples.filter((s) => s.bridgePresent && s.bo > 0.01).length;

    const leg1 = analyzeLeg(leg1Frames, leg1Trigger);
    const leg2 = analyzeLeg(leg2Frames, leg2Trigger);

    // save representative travel frames (leg1 + leg2), sampled across t
    function saveRep(fr, legLabel) {
        const travel = fr.filter((p) => p.s && p.s.t != null).sort((a, b) => (legLabel === "leg1" ? a.s.t - b.s.t : b.s.t - a.s.t));
        const picks = [];
        const wants = [0.05, 0.2, 0.35, 0.5, 0.65, 0.8, 0.95];
        for (const wt of wants) {
            let best = null, bd = 1;
            for (const p of travel) { const d = Math.abs(p.s.t - wt); if (d < bd) { bd = d; best = p; } }
            if (best && !picks.includes(best)) picks.push(best);
        }
        picks.forEach((p, i) => {
            const t = (p.s.t ?? 0).toFixed(2), bo = (p.s.bo ?? 0).toFixed(2);
            writeFileSync(`${OUT}/chrome-screencast/${tag}-${legLabel}-f${String(i).padStart(2, "0")}_t${t}_bo${bo}.jpg`, Buffer.from(p.data, "base64"));
        });
        return picks.length;
    }
    const savedL1 = saveRep(leg1Frames, "leg1");
    const savedL2 = saveRep(leg2Frames, "leg2");

    const report = { route, mode, tag, kind, seam, leg1Trigger, leg2Trigger, totalFrames: frames.length, totalSamples: samples.length, settledH, settledV, restSamples: restSamples.length, restBridgeVisible, settleBridgeVisible, leg1, leg2, savedL1, savedL2 };
    writeFileSync(`${OUT}/chrome-screencast/${tag}-report.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ tag, l1_distinct: leg1.distinctTravel, l1_teardrop: leg1.teardropWithBridge, l1_maxGap: leg1.maxGap, l1_o50: leg1.gapsOver50, l1_resp: leg1.firstRespLatency, l1_remargin: leg1.reMargin, l2_distinct: leg2.distinctTravel, l2_teardrop: leg2.teardropWithBridge, l2_remargin: leg2.reMargin, settledH: { w: settledH.asideW, h: settledH.asideH, so: settledH.so, pos: settledH.asidePos, mainL: settledH.mainL }, restBridgeVisible, settleBridgeVisible }));
    await cdp.detach().catch(() => {});
    await ctx.close();
    return report;
}

(async () => {
    mkdirSync(`${OUT}/chrome-screencast`, { recursive: true });
    mkdirSync(`${OUT}/chrome-endpoint`, { recursive: true });
    const browser = await chromium.connectOverCDP(CDP);
    const reports = [];
    for (const r of RUNS) {
        try { reports.push(await run(browser, r)); }
        catch (e) { console.log(JSON.stringify({ tag: r.tag, error: String(e && e.message || e), stack: String(e && e.stack || "").split("\n").slice(0, 4) })); }
    }
    writeFileSync(`${OUT}/chrome-screencast/ALL-reports.json`, JSON.stringify(reports, null, 2));
    await browser.close();
})();
