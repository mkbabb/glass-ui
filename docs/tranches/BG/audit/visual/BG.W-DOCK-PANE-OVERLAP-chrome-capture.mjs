// BG.W-DOCK-PANE-OVERLAP — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// The DockLayerGroup pane-swap OVERLAPPED-crossfade frame-series judge (route /dock/layers).
//
// NOTE ON PATHS: on /dock/layers EVERY DockLayerGroup is nested inside a <GlassDock> (there
// is NO standalone group on this route). So the box FLIP measured here is the ORCHESTRATOR
// convex-blend box (--dock-live driven by --dock-expand-t), NOT useLayerTransition's
// reserve/clip-reveal (which is standalone-only, correctly absent here).
//
// Per case (standalone-rail = the always-expanded rail group; nested-collapsible = the
// collapsible group) × mode: fresh page, settle, read PRE (expandT, plateW, activeIdx),
// then ONE trusted click on tab index 1 (a pure LAYER SWAP off active tab 0) while a rAF
// probe samples per frame:  --dock-morph-t, --dock-expand-t, VISIBLE plate box W/H, inner
// stack box W/H, entering(.is-active) + leaving(.is-leaving) opacity.  Plus settled +
// mid-swap screenshots. Verdicts computed downstream (verdict.mjs).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUTDIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-PANE-OVERLAP-paint";
const CDP = process.env.CDP_URL || "http://localhost:9466";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const ROUTE = "/dock/layers";

const PROBE_SRC = `
window.__paneProbe = function (groupSel) {
  return new Promise((resolve) => {
    const g = document.querySelector(groupSel);
    if (!g) { resolve({ error: "group-not-found:" + groupSel }); return; }
    const stack = g.querySelector(".dock-layer-stack") || g;
    const plate = g.closest(".glass-dock");
    const paneOp = (cls) => {
      const list = Array.from(stack.querySelectorAll(".dock-layer-item-host." + cls));
      if (!list.length) return { present: false, opacity: null };
      let mx = 0; for (const p of list) { const o = parseFloat(getComputedStyle(p).opacity); if (o > mx) mx = o; }
      return { present: true, opacity: mx };
    };
    const frames = []; let saw = false, cap = 220; const t0 = performance.now();
    const loop = () => {
      const morphing = !!document.querySelector("[data-morphing]");
      const ps = plate ? getComputedStyle(plate) : null;
      const morphT = ps ? parseFloat(ps.getPropertyValue("--dock-morph-t")) : null;
      const expandT = ps ? parseFloat(ps.getPropertyValue("--dock-expand-t")) : null;
      const pr = plate ? plate.getBoundingClientRect() : null;
      const sr = stack.getBoundingClientRect();
      const enter = paneOp("is-active"), leave = paneOp("is-leaving");
      frames.push({
        ms: +(performance.now() - t0).toFixed(1), morphing,
        t: Number.isFinite(morphT) ? +morphT.toFixed(4) : null,
        expandT: Number.isFinite(expandT) ? +expandT.toFixed(4) : null,
        plateW: pr ? +pr.width.toFixed(2) : null, plateH: pr ? +pr.height.toFixed(2) : null,
        stackW: +sr.width.toFixed(2), stackH: +sr.height.toFixed(2),
        enterOpacity: enter.opacity, enterPresent: enter.present,
        leaveOpacity: leave.opacity, leavePresent: leave.present,
      });
      if (morphing) saw = true; cap--;
      if ((saw && !morphing && frames.length > 3) || cap <= 0) { resolve({ frames, sawMorph: saw }); return; }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
};
`;

const CASES = [
    { name: "standalone-rail", note: "always-expanded rail group (nested in GlassDock)", groupSel: '[data-testid="dock-layer-rail-group"]' },
    { name: "nested-collapsible", note: "collapsible group (nested in GlassDock)", groupSel: '[data-testid="dock-nested-collapsible-group"]' },
];

const results = [];
const browser = await chromium.connectOverCDP(CDP);

for (const mode of MODES) {
    let glRenderer = null, err = null, structure = null;
    const caseRuns = {};
    // one context per (mode); fresh page per case (clean pre-state)
    try {
        // structural inventory + settled screenshot on a first page
        {
            const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: mode });
            const page = await ctx.newPage();
            const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
            await page.waitForTimeout(2000);
            glRenderer = await page.evaluate(() => {
                try { const c = document.createElement("canvas"); const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl"; const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext"; } catch (e) { return "err:" + e.message; }
            });
            structure = await page.evaluate(() => {
                const groups = Array.from(document.querySelectorAll(".dock-layer-group"));
                const grpInfo = groups.map((g) => ({ testid: g.getAttribute("data-testid"), insideGlassDock: !!g.closest(".glass-dock") }));
                const standaloneCount = grpInfo.filter((x) => !x.insideGlassDock).length;
                const canvases = Array.from(document.querySelectorAll("canvas")); let glCount = 0;
                for (const c of canvases) { try { if (c.getContext("webgl2") || c.getContext("webgl")) glCount++; } catch (e) {} }
                const main = document.querySelector("main");
                let hasOverlapRule = false, hasEnterRule = false, hasReserveRule = false;
                for (const ss of Array.from(document.styleSheets)) { try { for (const r of Array.from(ss.cssRules || [])) {
                    const tx = (r.cssText || "");
                    if (tx.includes("is-leaving") && tx.includes("--dock-morph-t") && tx.includes("0.6")) hasOverlapRule = true;
                    if (tx.includes("is-active") && tx.includes("--dock-morph-t") && tx.includes("0.15")) hasEnterRule = true;
                    if (tx.includes("--dock-stack-morph-reserve") && tx.includes("clip-path")) hasReserveRule = true;
                } } catch (e) {} }
                return { groupCount: groups.length, standaloneGroupCount: standaloneCount, groups: grpInfo, glCount,
                    mainChildren: main ? main.children.length : null, bodyTextLen: (document.body.innerText || "").length,
                    hasOverlapRule, hasEnterRule, hasReserveRule };
            });
            await page.screenshot({ path: `${OUTDIR}/paneloverlap-layers-chrome-${mode}.png`, fullPage: false });
            await ctx.close();
        }

        for (const c of CASES) {
            const ctx = await browser.newContext({ viewport: { width: SIZE.w, height: SIZE.h }, deviceScaleFactor: 2, colorScheme: mode });
            const page = await ctx.newPage();
            const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 25000 });
            await page.waitForTimeout(2500);
            const clickSel = `${c.groupSel} [role="tab"]`;
            const pre = await page.evaluate((gs) => {
                const g = document.querySelector(gs); const plate = g.closest(".glass-dock"); const ps = plate ? getComputedStyle(plate) : null;
                return { expandT: ps ? ps.getPropertyValue("--dock-expand-t").trim() : null,
                    plateW: plate ? +plate.getBoundingClientRect().width.toFixed(2) : null,
                    activeIdx: Array.from(g.querySelectorAll('[role="tab"]')).findIndex((t) => t.getAttribute("aria-selected") === "true") };
            }, c.groupSel);
            await page.evaluate(PROBE_SRC);
            // if not on tab 0, reset (settle), then re-read pre
            let pre2 = pre;
            if (pre.activeIdx !== 0) { await page.locator(clickSel).nth(0).click({ force: true }); await page.waitForTimeout(1200);
                pre2 = await page.evaluate((gs) => { const g = document.querySelector(gs); const plate = g.closest(".glass-dock"); const ps = plate ? getComputedStyle(plate) : null;
                    return { expandT: ps ? ps.getPropertyValue("--dock-expand-t").trim() : null, plateW: plate ? +plate.getBoundingClientRect().width.toFixed(2) : null,
                        activeIdx: Array.from(g.querySelectorAll('[role="tab"]')).findIndex((t) => t.getAttribute("aria-selected") === "true") }; }, c.groupSel);
            }
            const probeP = page.evaluate((gs) => window.__paneProbe(gs), c.groupSel);
            await page.waitForTimeout(20);
            await page.locator(clickSel).nth(1).click({ force: true, timeout: 5000 });
            // mid-swap screenshot on standalone-rail only, once, when morphT mid-range
            if (c.name === "standalone-rail") {
                for (let i = 0; i < 12; i++) {
                    await page.waitForTimeout(20);
                    const midT = await page.evaluate(() => { const r = document.querySelector("[data-morphing] .glass-dock, .glass-dock[data-morphing], [data-morphing]"); if (!r) return null; const t = parseFloat(getComputedStyle(document.querySelector('.glass-dock') || r).getPropertyValue("--dock-morph-t")); return Number.isFinite(t) ? t : null; });
                    if (midT != null && midT > 0.3 && midT < 0.7) { await page.screenshot({ path: `${OUTDIR}/paneloverlap-midswap-chrome-${mode}.png`, fullPage: false }); break; }
                }
            }
            const res = await probeP;
            caseRuns[c.name] = { note: c.note, pre: pre2, sawMorph: res.sawMorph, frames: res.frames };
            await ctx.close();
        }
    } catch (e) { err = String(e && e.message || e); }
    results.push({ mode, engine: "chrome", glRenderer, structure, caseRuns, err });
}

writeFileSync(`${OUTDIR}/chrome-frameseries.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results.map((r) => ({
    mode: r.mode, gl: r.glRenderer, err: r.err,
    standaloneGroupCount: r.structure ? r.structure.standaloneGroupCount : null,
    rules: r.structure ? { overlap: r.structure.hasOverlapRule, enter: r.structure.hasEnterRule, reserve: r.structure.hasReserveRule } : null,
    cases: Object.fromEntries(Object.entries(r.caseRuns).map(([k, v]) => {
        const mf = (v.frames || []).filter((f) => f.morphing);
        const pWs = mf.map((f) => f.plateW).filter((x) => x != null);
        return [k, { pre: v.pre, saw: v.sawMorph, mf: mf.length, plateWmin: pWs.length ? Math.min(...pWs) : null, plateWmax: pWs.length ? Math.max(...pWs) : null }];
    })),
})), null, 2));
await browser.close();
