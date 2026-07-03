// BG.W-SIRI-DOCK-CAPABILITY — NON-AUTHORING Chrome leg (CDP → real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200 for both Siri routes + both modes, polls data-capture-ready,
// records GL_RENDERER, probes the Siri island + waveform, and captures BOTH the static
// (dormant) rest AND the driven ENGAGED bloom (listening + responding) states.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT =
    "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-SIRI-DOCK-CAPABILITY-paint";
const ROUTES = ["/dock/siri-island", "/dock/overview"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };
const CDP = process.env.CDP_URL || "http://localhost:9477";

const slug = (r) => r.replace(/^\//, "").replace(/\//g, "-");

const glProbe = () => {
    try {
        const c = document.createElement("canvas");
        const gl = c.getContext("webgl2") || c.getContext("webgl");
        if (!gl) return "no-webgl";
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
    } catch (e) {
        return "err:" + e.message;
    }
};

// Count live canvases + read the Siri island's computed morph state.
const siriProbe = () => {
    const out = { canvasCount: document.querySelectorAll("canvas").length };
    const island = document.querySelector(".siri-island");
    if (island) {
        const cs = getComputedStyle(island);
        out.island = {
            present: true,
            t: cs.getPropertyValue("--siri-island-t").trim(),
            form: island.className.match(/siri-form-(\w+)/)?.[1] ?? null,
            clipPath: cs.clipPath,
            display: cs.display,
            rect: (() => {
                const r = island.getBoundingClientRect();
                return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
            })(),
        };
        const wave = island.querySelector(".siri-wave-bed");
        if (wave) out.island.waveBedOpacity = getComputedStyle(wave).opacity;
        const waveCanvas = island.querySelector("canvas.siri-waveform-canvas");
        out.island.waveCanvas = !!waveCanvas;
        // waveform GL context live?
        if (waveCanvas) {
            out.island.waveCanvasSize = { w: waveCanvas.width, h: waveCanvas.height };
        }
    } else {
        out.island = { present: false };
    }
    // DockStage / dock present?
    out.dockCount = document.querySelectorAll(".glass-dock").length;
    out.railSlotPresent = !!document.querySelector(".siri-island-in-rail, [data-slot='rail'] .siri-island, .glass-dock-frame .siri-island");
    return out;
};

const browser = await chromium.connectOverCDP(CDP);
const results = [];

for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 });
        await page.waitForFunction(
            () => document.documentElement.hasAttribute("data-capture-ready"),
            { timeout: 25000 },
        );
        await page.waitForTimeout(1500);
        const glRenderer = await page.evaluate(glProbe);
        const restProbe = await page.evaluate(siriProbe);

        // STATIC (dormant) capture.
        const restOut = `${OUT}/chrome-${slug(route)}-${mode}-rest.png`;
        await page.screenshot({ path: restOut, fullPage: false });

        const rec = { route, mode, glRenderer, rest: restProbe, restOut };

        // Drive the ENGAGED bloom on the siri route only (the interactive capability).
        if (route === "/dock/siri-island") {
            try {
                // click the "Search or ask" pill → engage (listening).
                const pill = await page.$(".siri-ask-pill");
                if (pill) {
                    await pill.click();
                    await page.waitForTimeout(900); // let the spring glide --siri-island-t
                    rec.listening = await page.evaluate(siriProbe);
                    const listenOut = `${OUT}/chrome-${slug(route)}-${mode}-listening.png`;
                    await page.screenshot({ path: listenOut, fullPage: false });
                    rec.listenOut = listenOut;

                    // type a query into the ask field then pick the first result → responding.
                    const input = await page.$(".siri-field-input");
                    if (input) {
                        await input.fill("glass");
                        await page.waitForTimeout(400);
                        const firstResult = await page.$(".siri-result");
                        if (firstResult) {
                            await firstResult.click({ force: true, timeout: 3000 }).catch(() => {
                                rec.resultClickForced = "failed";
                            });
                            await page.waitForTimeout(900);
                        } else {
                            rec.noResult = true;
                        }
                    }
                    rec.responding = await page.evaluate(siriProbe);
                    const respondOut = `${OUT}/chrome-${slug(route)}-${mode}-responding.png`;
                    await page.screenshot({ path: respondOut, fullPage: false });
                    rec.respondOut = respondOut;
                } else {
                    rec.pillMissing = true;
                }
            } catch (e) {
                rec.interactiveError = String(e).slice(0, 200);
            }
        }

        results.push(rec);
        console.log(JSON.stringify({ route, mode, glRenderer, islandPresent: restProbe.island.present, canvasCount: restProbe.canvasCount }));
        await ctx.close();
    }
}
await browser.close();

// dump the full probe record for the DELTA.
const fs = require("node:fs");
fs.writeFileSync(`${OUT}/chrome-probe.json`, JSON.stringify(results, null, 2));
console.log("PROBE_WRITTEN", `${OUT}/chrome-probe.json`);
