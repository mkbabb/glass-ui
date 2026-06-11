// AZ.W-DOCK-TAXONOMY — own-surface HG2 capture: a COLLAPSIBLE vertical dock morphs
// its HEIGHT (the machinery the old `variant="rail"` force-pin denied).
//
// Drives the /dock/rail story's `data-testid="dock-vertical-collapsible"` dock:
//   (1) collapsed frame — the resting circle (block-size ≈ the collapsed floor),
//   (2) hover→expanded frame — the dock grown open on its BLOCK axis,
//   (3) the measured block-size delta (collapsed → expanded) proving the height morph,
// light + dark, so the DELTA cites real own-surface frames. Modeled on
// scripts/wf-az-capture-dock-rail.mjs.

import { resolve } from "node:path";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AZ/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";
const ROUTE = "/dock/rail";
const DOCK = '[data-testid="dock-vertical-collapsible"]';

async function setDark(page, dark) {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(120);
}

async function blockSize(page) {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { width: Math.round(r.width), height: Math.round(r.height) };
    }, DOCK);
}

async function run() {
    if (!existsSync(VISUAL_DIR)) mkdirSync(VISUAL_DIR, { recursive: true });
    // Software WebGL (swiftshader) — the headless GPU path crashes the Aurora
    // canvas the /dock/rail story stages; swiftshader renders it (degraded, but the
    // dock geometry — the HG2 subject — is unaffected).
    const browser = await chromium.launch({
        args: ["--disable-gpu", "--use-gl=swiftshader"],
    });
    // deviceScaleFactor 1 — a 2× framebuffer over swiftshader's software WebGL
    // exhausts memory on this headless runner; 1× captures the dock geometry cleanly.
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    // Disable WebGL context creation BEFORE the SPA mounts — the headless swiftshader
    // WebGL crashes the page on the Aurora the /dock/rail story stages. The Aurora is
    // decorative backdrop, NOT the HG2 subject (the dock geometry); `useWebGLCanvas`
    // gracefully no-ops on a null WebGL2 context (the "WebGL2 unavailable" path), so
    // the page renders the docks crash-free.
    await page.addInitScript(() => {
        const orig = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
            if (typeof type === "string" && type.toLowerCase().includes("webgl")) {
                return null;
            }
            return orig.call(this, type, ...rest);
        };
    });
    const results = {};
    try {
        page.on("pageerror", () => {}); // tolerate the WebGL2-unavailable PE
        await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(2500); // SPA client-render + font settle
        await page.waitForSelector(DOCK, { state: "attached", timeout: 15000 });

        for (const mode of ["light", "dark"]) {
            await setDark(page, mode === "dark");
            const dockEl = page.locator(DOCK);
            await dockEl.scrollIntoViewIfNeeded();
            // Force the dock to the COLLAPSED resting state via its exposed API (the
            // idle collapseDelay is 2s; calling collapse() is deterministic and avoids
            // a flaky timer wait between modes).
            await page.evaluate((sel) => {
                const el = document.querySelector(sel);
                const inst = el && el.__vueParentComponent;
                if (inst && inst.exposed && typeof inst.exposed.collapse === "function") {
                    inst.exposed.collapse();
                }
            }, DOCK);
            await page.mouse.move(900, 700); // ensure no hover
            await page.waitForTimeout(700); // settle the collapse morph

            // (1) collapsed — the resting circle.
            const collapsed = await blockSize(page);
            await dockEl.screenshot({
                path: resolve(VISUAL_DIR, `W-DOCK-TAXONOMY-vcollapse-collapsed-${mode}.png`),
            });

            // (2) hover→expanded — the dock grows its BLOCK axis open.
            await dockEl.hover({ position: { x: 20, y: 20 } });
            await page.waitForTimeout(800); // settle the --dock-morph-t spring
            const expanded = await blockSize(page);
            await dockEl.screenshot({
                path: resolve(VISUAL_DIR, `W-DOCK-TAXONOMY-vcollapse-expanded-${mode}.png`),
            });

            // move away so the next mode starts clean.
            await page.mouse.move(900, 700);
            await page.waitForTimeout(300);

            results[mode] = {
                collapsed,
                expanded,
                blockDeltaPx: expanded && collapsed ? expanded.height - collapsed.height : null,
                heightMorphed: expanded && collapsed ? expanded.height > collapsed.height + 8 : false,
            };
        }

        const out = {
            generatedAt: new Date().toISOString(),
            route: ROUTE,
            dockSelector: DOCK,
            claim:
                "HG2 — a collapsible vertical dock morphs its block axis (height) collapsed→expanded; the height grows on hover (the machinery the old variant=rail denied).",
            results,
            pass:
                results.light?.heightMorphed === true &&
                results.dark?.heightMorphed === true,
        };
        writeFileSync(
            resolve(VISUAL_DIR, "W-DOCK-TAXONOMY-vcollapse-readback.json"),
            JSON.stringify(out, null, 2),
        );
        console.log(JSON.stringify(out, null, 2));
    } finally {
        await browser.close();
    }
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
