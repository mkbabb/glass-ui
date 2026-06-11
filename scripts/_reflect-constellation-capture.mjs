// AZ.W-REFLECT — constellation reflection capture (audit-only, transient).
// Drives the ROOT-hoisted Playwright against the live :5199 demo, captures the
// constellation substrate story + the hero composition (dock floating over the
// lattice) at 2 viewports × both modes, and reads back the W-CON-GEN π values
// (pinned-node-holds, warpSettled, drift, accent palette) off the demo seams.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "docs/tranches/AZ/audit/reflect";
const BASE = "http://localhost:5199";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
];
const MODES = ["light", "dark"];

const report = {};

const browser = await chromium.launch();
try {
    for (const vp of VIEWPORTS) {
        for (const mode of MODES) {
            const ctx = await browser.newContext({
                viewport: { width: vp.width, height: vp.height },
                deviceScaleFactor: 2,
                colorScheme: mode,
            });
            const page = await ctx.newPage();

            // ── substrate story ──────────────────────────────────────────
            await page.goto(`${BASE}/#/substrates/constellation`, {
                waitUntil: "networkidle",
            });
            await page.evaluate((m) => {
                document.documentElement.classList.toggle("dark", m === "dark");
            }, mode);
            await page.waitForTimeout(1400);
            const subPath = `${OUT}/constellation-substrate-${vp.name}-${mode}.png`;
            await page.screenshot({ path: subPath, fullPage: false });

            // capture the generalized pinned-anomaly section in view (scroll)
            const gen = await page.evaluate(() => {
                const el = [...document.querySelectorAll("*")].find((n) =>
                    /pinned anomaly/i.test(n.textContent || "") &&
                    n.children.length < 6,
                );
                if (el) el.scrollIntoView({ block: "center" });
                return !!el;
            });
            await page.waitForTimeout(900);
            if (gen) {
                await page.screenshot({
                    path: `${OUT}/constellation-gen-section-${vp.name}-${mode}.png`,
                });
            }

            // ── hero composition (dock floats over the lattice) ──────────
            await page.goto(`${BASE}/#/compositions/hero`, {
                waitUntil: "networkidle",
            });
            await page.evaluate((m) => {
                document.documentElement.classList.toggle("dark", m === "dark");
            }, mode);
            await page.waitForTimeout(1600);
            const heroPath = `${OUT}/constellation-hero-${vp.name}-${mode}.png`;
            await page.screenshot({ path: heroPath, fullPage: false });

            await ctx.close();
        }
    }

    // ── π READBACK: pinned-node-holds + drift + settled on the gen seam ──
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/#/substrates/constellation`, {
        waitUntil: "networkidle",
    });
    await page.waitForTimeout(1400);

    const pi = await page.evaluate(async () => {
        const h = window.__constellationGen;
        if (!h || !h.field) return { error: "no __constellationGen handle" };
        const f = h.field;
        const idx = f.pinnedIndex;
        const node = f.nodes[idx];
        const start = { x: node.x, y: node.y };
        // sample over ~2s: pinned node holds-or-drifts; others move
        const others0 = f.nodes
            .filter((_, i) => i !== idx)
            .slice(0, 5)
            .map((n) => ({ x: n.x, y: n.y }));
        await new Promise((r) => setTimeout(r, 2200));
        const end = { x: node.x, y: node.y };
        const others1 = f.nodes
            .filter((_, i) => i !== idx)
            .slice(0, 5)
            .map((n) => ({ x: n.x, y: n.y }));
        const pinnedDelta = Math.hypot(end.x - start.x, end.y - start.y);
        const othersDelta =
            others0.reduce(
                (s, o, i) =>
                    s + Math.hypot(others1[i].x - o.x, others1[i].y - o.y),
                0,
            ) / others0.length;
        const w = f.w;
        // pinnedDrift bound: within wanderFrac*w of anchor
        const pd = f.pinnedDrift;
        const anchorBound = pd ? pd.wanderFrac * w : null;
        return {
            pinnedIndex: idx,
            pinnedDelta: +pinnedDelta.toFixed(2),
            meanOthersDelta: +othersDelta.toFixed(2),
            canvasW: w,
            pinnedDriftOn: !!pd,
            anchorBoundPx: anchorBound ? +anchorBound.toFixed(1) : null,
            withinAnchorBound: anchorBound ? pinnedDelta <= anchorBound : null,
            warpSettled:
                typeof h.warpSettled === "function" ? h.warpSettled() : null,
            paletteAccent: h.palette?.accent ?? null,
            paletteEdgeFloor: h.palette?.edgeFloor ?? null,
            paletteEdgeAccentAlpha: h.palette?.edgeAccentAlpha ?? null,
        };
    });
    report.pi = pi;
    await ctx.close();
} finally {
    await browser.close();
}

console.log(JSON.stringify(report, null, 2));
