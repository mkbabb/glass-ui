// BG.W-VIZ-PREVIEW-LIVE — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// C18 harness over BUILT :5200. Captures the /substrates bento landing (the 11 preview
// cards) in BOTH modes, decodes the in-pixel engine badge for provenance, extracts a
// per-card pixel-hash of each card's viz-still <img> rendered region (proving the 11
// cards read as 11 DISTINCT previews), and runs the COMPUTED-DOM checks the criteria
// name (glContextCount == 0 on the landing / main.children / img count == 11 / each
// still is a data: URI).
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-PREVIEW-LIVE-paint";
const ROUTE = "/substrates";
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

// Read the per-card viz-still evidence + the landing's computed-DOM facts.
async function readLanding(page) {
    return await page.evaluate(() => {
        // count LIVE GL/compute contexts actually attached to the DOM (canvases with a
        // webgl/webgl2/webgpu context). The wave's one-GL-budget: the landing adds ZERO.
        let glContextCount = 0;
        const canvases = Array.from(document.querySelectorAll("canvas"));
        for (const c of canvases) {
            // A canvas already bound to a GL/GPU context returns the SAME context obj;
            // a fresh 2d/none returns null for gl. We can't re-getContext a 2d canvas as gl,
            // so probe defensively.
            try {
                if (c.__glProbed) continue;
            } catch {}
        }
        // Better: enumerate <canvas> and check if getContext('webgl2') returns a live ctx
        // WITHOUT allocating a new one on a 2d canvas (getContext returns null if already 2d).
        glContextCount = canvases.filter((c) => {
            try {
                return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("webgpu"));
            } catch {
                return false;
            }
        }).length;

        const stills = Array.from(
            document.querySelectorAll("img.section-preview-card-viz-still"),
        ).map((img) => {
            const b = img.getBoundingClientRect();
            const src = img.getAttribute("src") || "";
            return {
                isDataUri: src.startsWith("data:image/"),
                srcLen: src.length,
                // a stable fingerprint of the still SOURCE bytes (the data-URI payload);
                // 11 distinct triples => 11 distinct payloads => 11 distinct hashes.
                srcHead: src.slice(0, 48),
                x: +b.x.toFixed(1),
                y: +b.y.toFixed(1),
                w: +b.width.toFixed(1),
                h: +b.height.toFixed(1),
                natW: img.naturalWidth,
                natH: img.naturalHeight,
                alt: img.getAttribute("alt"),
            };
        });

        // The card titles in reading order (to map hash -> card).
        const cards = Array.from(document.querySelectorAll("a.section-preview-card")).map((a) => {
            const t = a.querySelector(".text-subheading");
            const still = a.querySelector("img.section-preview-card-viz-still");
            return {
                to: a.getAttribute("href"),
                title: t ? t.textContent.trim() : null,
                hasStill: !!still,
            };
        });

        return {
            glContextCount,
            canvasCount: canvases.length,
            stillCount: stills.length,
            stills,
            cards,
            mainChildren: document.querySelector("main")?.children.length ?? null,
            route:
                document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router
                    ?.currentRoute?.value?.fullPath ?? null,
            badgeText: document.getElementById("gl-capture-engine-badge")?.textContent ?? null,
        };
    });
}

// Per-card RENDERED-PIXEL hash: crop each card's viz-still region out of the full
// screenshot and sha1 the pixels. Proves the DISPLAYED cards differ (not just the
// src attribute). Uses the still's gBCR at deviceScaleFactor 2.
async function perCardPixelHashes(page, stills, dpr) {
    const hashes = [];
    for (let i = 0; i < stills.length; i++) {
        const s = stills[i];
        if (s.w < 4 || s.h < 4) {
            hashes.push({ i, hash: null, reason: "sub-4px" });
            continue;
        }
        try {
            const buf = await page.screenshot({
                clip: { x: s.x, y: s.y, width: s.w, height: s.h },
            });
            hashes.push({ i, hash: createHash("sha1").update(buf).digest("hex").slice(0, 16), bytes: buf.length });
        } catch (e) {
            hashes.push({ i, hash: null, reason: e.message });
        }
    }
    return hashes;
}

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const mode of MODES) {
    const ctx = await browser.newContext({
        viewport: { width: SIZE.w, height: SIZE.h },
        deviceScaleFactor: 2,
        colorScheme: mode,
    });
    const page = await ctx.newPage();
    const url = `http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=${mode}`;
    const slug = `vpl-substrates-chrome-${mode}`;
    let glRenderer = null, info = null, err = null, cardHashes = null;
    try {
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(1400); // still-raster + memo settle
        glRenderer = await page.evaluate(() => {
            try {
                const c = document.createElement("canvas");
                const gl = c.getContext("webgl2") || c.getContext("webgl");
                if (!gl) return "no-webgl";
                const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                const r = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                gl.getExtension("WEBGL_lose_context")?.loseContext();
                return r;
            } catch (e) { return "err:" + e.message; }
        });
        info = await readLanding(page);
        cardHashes = await perCardPixelHashes(page, info.stills, 2);
        await page.screenshot({ path: `${OUT}/${slug}.png`, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        // full-page tall shot too (the bento can exceed the viewport)
        await page.screenshot({ path: `${OUT}/${slug}-full.png`, fullPage: true });
    } catch (e) { err = e.message; }

    const srcHashes = (info?.stills || []).map((s) =>
        createHash("sha1").update(s.srcHead + ":" + s.srcLen).digest("hex").slice(0, 12),
    );
    const distinctSrc = new Set(srcHashes).size;
    const distinctPix = new Set((cardHashes || []).map((h) => h.hash).filter(Boolean)).size;

    results.push({
        route: ROUTE, mode, slug, glRenderer, err,
        glContextCount: info?.glContextCount,
        canvasCount: info?.canvasCount,
        stillCount: info?.stillCount,
        mainChildren: info?.mainChildren,
        vueRoute: info?.route,
        badgeText: info?.badgeText,
        distinctSrc, distinctPix,
        srcHashes, cardHashes,
        cards: info?.cards,
        stills: info?.stills,
    });
    console.log(
        `[${slug}] ${err ? "ERR " + err : "OK"} | GL=${(glRenderer || "").slice(0, 46)} | glCtx=${info?.glContextCount} canvases=${info?.canvasCount} | stills=${info?.stillCount} distinctSrc=${distinctSrc} distinctPix=${distinctPix} | mainChildren=${info?.mainChildren} | vueRoute=${info?.route}`,
    );
    await ctx.close();
}

writeFileSync(`${OUT}/chrome-results.json`, JSON.stringify(results, null, 2));
console.log("\nWROTE", `${OUT}/chrome-results.json`);
await browser.close();
