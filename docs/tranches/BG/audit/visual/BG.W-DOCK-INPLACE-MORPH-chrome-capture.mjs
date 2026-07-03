// BG.W-DOCK-INPLACE-MORPH — NON-AUTHORING Chrome leg (CDP -> real Chrome.app / Metal GPU).
// Boots ?capture over BUILT :5200, polls data-capture-ready, GL_RENDERER probe, screenshot,
// and probes the IN-PLACE MORPH structural cohort:
//  - the REAL shell dock <aside class="demo-sidebar-rail"> reshapes IN PLACE (no modal,
//    no synthetic dual-DOM, no VT crossfade) with [data-shell-dock-orientation]
//  - the canonical #dock-morph-goo SVG filter mount exists; #shell-dock-morph-goo ABSENT
//  - no morph-path role="dialog" modal stage in the shell
//  - main.children.length, glContextCount, animationTimeline, runningAnims, bodyTextLen
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-INPLACE-MORPH-paint";
const ROUTES = ["/dock/overview", "/dock/morph-showcase"];
const MODES = ["light", "dark"];
const SIZE = { w: 1440, h: 900 };

const results = [];
const browser = await chromium.connectOverCDP("http://localhost:9466");

for (const route of ROUTES) {
    for (const mode of MODES) {
        const ctx = await browser.newContext({
            viewport: { width: SIZE.w, height: SIZE.h },
            deviceScaleFactor: 2,
            colorScheme: mode,
        });
        const page = await ctx.newPage();
        const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
        const tag = route.replace(/^\//, "").replace(/\//g, "_");
        const slug = `inplacemorph-${tag}-chrome-${mode}`;
        let glRenderer = null, probe = null, err = null;
        try {
            await page.goto(url, { waitUntil: "load", timeout: 30000 });
            await page.waitForFunction(
                () => document.documentElement.hasAttribute("data-capture-ready"),
                { timeout: 25000 },
            );
            await page.waitForTimeout(1200);
            glRenderer = await page.evaluate(() => {
                try {
                    const c = document.createElement("canvas");
                    const gl = c.getContext("webgl2") || c.getContext("webgl");
                    if (!gl) return "no-webgl";
                    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
                    return dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "no-debug-ext";
                } catch (e) { return "err:" + e.message; }
            });
            probe = await page.evaluate((routeArg) => {
                const r = document.documentElement;

                // --- the REAL in-place shell dock <aside> (the headline: the morph target) ---
                const aside = document.querySelector("aside.demo-sidebar-rail");
                const sidebarDock = aside ? aside.querySelector(".glass-dock") : null;
                const asideOrientation = aside ? aside.getAttribute("data-shell-dock-orientation") : null;
                // the in-place bridge only mounts DURING a morph; at rest it is absent
                const inplaceBridge = document.querySelector(".dock-morph-bridge--inplace");
                const bridgeTestId = document.querySelector('[data-testid="shell-dock-morph-bridge"]');

                // --- the goo filter mounts (canonical present, modal-local absent) ---
                const dockMorphGoo = document.querySelector("filter#dock-morph-goo") || document.getElementById("dock-morph-goo");
                const shellDockMorphGoo = document.getElementById("shell-dock-morph-goo");

                // --- no morph-path modal stage in the shell (deleted) ---
                // (there IS a Configurator Sheet dialog that can exist closed; we look for a
                //  dock-morph *stage* modal specifically — the deleted synthetic-dual-DOM host)
                const morphStageModal = document.querySelector('[data-testid="dock-morph-stage"][role="dialog"]')
                    || document.querySelector('.dock-morph-modal, [data-dock-morph-modal]');

                // --- the standalone morph-showcase story stage (route 2) ---
                const showcaseStage = document.querySelector('[data-testid="dock-morph-stage"]');
                const showcaseVertical = document.querySelector('[data-testid="dock-morph-vertical"]');
                const showcaseHorizontal = document.querySelector('[data-testid="dock-morph-horizontal"]');

                const main = document.querySelector("main");
                const canvases = Array.from(document.querySelectorAll("canvas"));
                let glCount = 0;
                for (const c of canvases) {
                    try {
                        // a canvas already used for GL reports a GL context via getContext
                        if (c.getContext("webgl2") || c.getContext("webgl")) glCount++;
                    } catch { /* 2d-only canvas throws on GL re-get after 2d — ignore */ }
                }

                const cs = getComputedStyle(r);
                return {
                    route: routeArg,
                    captureReady: r.hasAttribute("data-capture-ready"),
                    captureMode: r.getAttribute("data-capture-mode"),
                    isDark: r.classList.contains("dark"),
                    // in-place morph structural truth
                    asidePresent: !!aside,
                    asideClass: aside ? aside.className.toString().slice(0, 60) : null,
                    sidebarDockInsideAside: !!sidebarDock,
                    asideOrientation,
                    inplaceBridgeAtRest: !!inplaceBridge,
                    bridgeTestIdAtRest: !!bridgeTestId,
                    // goo mounts
                    dockMorphGooPresent: !!dockMorphGoo,
                    shellDockMorphGooAbsent: !shellDockMorphGoo,
                    // no morph modal
                    morphStageModalAbsent: !morphStageModal,
                    // showcase story (route 2)
                    showcaseStagePresent: !!showcaseStage,
                    showcaseVerticalPresent: !!showcaseVertical,
                    showcaseHorizontalPresent: !!showcaseHorizontal,
                    // budget + settle facts
                    mainChildrenLen: main ? main.children.length : null,
                    canvasCount: canvases.length,
                    glContextCount: glCount,
                    animTimelineSupported: (typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: scroll()")),
                    runningAnims: document.getAnimations ? document.getAnimations().filter(a => a.playState === "running").length : null,
                    bodyTextLen: (document.body.innerText || "").length,
                    tokens: {
                        card: cs.getPropertyValue("--card").trim(),
                        foreground: cs.getPropertyValue("--foreground").trim(),
                    },
                };
            }, route);

            await page.screenshot({ path: `${OUT}/${slug}.png`, clip: { x: 0, y: 0, width: SIZE.w, height: SIZE.h } });
        } catch (e) {
            err = e.message;
        }
        results.push({ route, mode, slug, glRenderer, err, probe });
        console.log(`${slug}: ${err ? "ERR " + err : "ok"} | GL=${glRenderer} | aside=${probe?.asidePresent} dockIn=${probe?.sidebarDockInsideAside} orient=${probe?.asideOrientation} goo=${probe?.dockMorphGooPresent} shellGooAbsent=${probe?.shellDockMorphGooAbsent} modalAbsent=${probe?.morphStageModalAbsent} gl=${probe?.glContextCount} mainKids=${probe?.mainChildrenLen} anims=${probe?.runningAnims}`);
        await ctx.close();
    }
}

writeFileSync(`${OUT}/chrome-results-inplacemorph.json`, JSON.stringify(results, null, 2));
console.log("\nWROTE chrome-results-inplacemorph.json");
await browser.close();
