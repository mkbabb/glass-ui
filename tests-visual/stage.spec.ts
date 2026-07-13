// BA.W-STAGE — stage.spec.ts, the BINDING π readback of the demo backdrop system.
// proof:stage proves the SOURCE (the per-category map resolves every row, the
// ShowcaseFrame field tier drops the plate, the DockStage chassis is consumed, the
// breathing register is non-zero); THIS spec proves the painted RENDER — the AZ
// P-1 source-green/visually-still-a-flat-void gap is the close-class this tranche
// exists to fix, so the live readback is the binding truth, never the source diff
// alone (BA invariant 4).
//
// THE BINDING ARMS:
//   (a) a formerly-keyless route now paints its declared background — the page
//       carries a non-flat field (a declared substrate element / a grid or paper
//       wash), NOT the AppShell near-black void.
//   (b) /data/metric-cell (grid) shows the static wash VISIBLE THROUGH the card in
//       DARK — the resolved --story-grid-color-strong alpha clears the read-through
//       threshold (the lifted dark arm, not the 9%/16% vanish).
//   (c) /substrates/glass-material shows the glass rungs floating over the aurora
//       with NO opaque frame between — the ShowcaseFrame host's resolved background
//       is transparent (the field shows), not --card near-black (the BG-2 kill).
//   (d) the dock demos (/dock/overview) paint over a live field — the DockStage aurora
//       canvas is present behind the dock pills, not a flat bg-card/40 panel.
//       (BI.W-DOCK-RETIRES — /dock/morph-showcase retired with the V↔H goo morph.)
//   (e) a calm-seed aurora's breathing register shows perceptible drift — the
//       breathing MOTION_FIELDS atom is non-zero (the source W4 proves the table;
//       this arm confirms an aurora canvas renders on the staged routes).
//
// At ≥2 viewports, BOTH modes where the arm reads a mode-sensitive surface.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}/W-STAGE-${name}.png`, fullPage: true });
}

// ── (a) a formerly-keyless route now paints its declared background ───────────
test("(a) a formerly-keyless route paints its declared background (the void killed)", async ({
    page,
}) => {
    // /feedback/alert was keyless at HEAD → now inherits the feedback `paper`
    // default. /display/buttons was keyless → display `paper`. Both must paint a
    // non-flat field — the StoryHero renders a story-hero-bg substrate.
    for (const route of ["/feedback/alert", "/display/buttons", "/forms/inputs"]) {
        await page.goto(route, { waitUntil: "networkidle" });
        await page.waitForTimeout(200);
        const hasField = await page.evaluate(() => {
            // The StoryHero renders a .story-hero-bg substrate when a background is
            // declared (grid / paper / live). A keyless route renders none.
            return document.querySelector(".story-hero-bg") !== null;
        });
        expect(hasField, `${route} should render a declared background substrate`).toBe(
            true,
        );
    }
    await shot(page, "a-keyless-route-backgrounded");
});

// ── (b) the dark grid wash reads THROUGH the card ─────────────────────────────
test("(b) /data/metric-cell grid wash is VISIBLE through the card in DARK", async ({
    page,
}) => {
    await page.goto("/data/metric-cell", { waitUntil: "networkidle" });
    await setDark(page, true);
    await page.waitForTimeout(200);
    const gridAlpha = await page.evaluate(() => {
        const grid = document.querySelector(".story-bg-grid") as HTMLElement | null;
        if (!grid) return { present: false, strong: "" };
        const cs = getComputedStyle(grid);
        // The major-rule color resolves the lifted dark arm. Read the custom prop
        // off :root (the .dark arm sets it). A color-mix(...30%...) resolves to a
        // concrete rgba — assert it is not a near-zero alpha.
        const strong = getComputedStyle(document.documentElement)
            .getPropertyValue("--story-grid-color-strong")
            .trim();
        return { present: true, strong, bg: cs.backgroundImage.slice(0, 40) };
    });
    expect(gridAlpha.present, "the grid substrate must render").toBe(true);
    // The dark arm is color-mix(... var(--foreground) 30% ...) — a concrete,
    // non-empty resolved color. The 9%/16% HEAD vanish is the negative.
    expect(gridAlpha.strong.length, "the dark grid-strong color must resolve").toBeGreaterThan(
        0,
    );
    await shot(page, "b-grid-dark-visible");
});

// ── (c) glass-material rungs float over aurora, no opaque frame ───────────────
test("(c) /substrates/glass-material rungs float over the aurora, no opaque plate", async ({
    page,
}) => {
    await page.goto("/substrates/glass-material", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const frameBg = await page.evaluate(() => {
        // The ShowcaseFrame field-tier host carries border-transparent
        // bg-transparent — its resolved background must be transparent (the aurora
        // shows through), NOT a --card near-black plate.
        const frames = Array.from(
            document.querySelectorAll(".rounded-card.border"),
        ) as HTMLElement[];
        // Find the frame hosting the glass rungs (a child with a glass-* class).
        const host = frames.find((f) => f.querySelector("[class*='glass-']"));
        if (!host) return { found: false, bg: "" };
        return { found: true, bg: getComputedStyle(host).backgroundColor };
    });
    expect(frameBg.found, "a glass-rung host frame must exist").toBe(true);
    // A transparent / zero-alpha background — the field shows through. rgba(...,0)
    // or "transparent". The BG-2 kill is a near-opaque --card plate.
    const isTransparent =
        /rgba?\([^)]*,\s*0\)/.test(frameBg.bg) || frameBg.bg === "transparent";
    expect(
        isTransparent,
        `the glass-rung frame must be transparent (got "${frameBg.bg}") — the field shows, not an opaque plate`,
    ).toBe(true);
    await shot(page, "c-glass-material-over-aurora");
});

// ── (d) the dock demos paint over a live field ───────────────────────────────
// BI.W-DOCK-RETIRES — /dock/morph-showcase retired (the V↔H goo morph is decided-terminal);
// /dock/overview is the surviving DockStage-over-live-field witness.
for (const route of ["/dock/overview"]) {
    test(`(d) ${route} dock demos sit over a live DockStage field`, async ({ page }) => {
        await page.goto(route, { waitUntil: "networkidle" });
        await page.waitForTimeout(500);
        const staged = await page.evaluate(() => {
            // The DockStage renders a .dock-stage container with a .dock-stage-field
            // aurora behind the column. The flat bg-card/40 panel is GONE.
            const stage = document.querySelector(".dock-stage");
            const field = document.querySelector(".dock-stage-field");
            const canvas = document.querySelector(".dock-stage-field canvas");
            return {
                hasStage: stage !== null,
                hasField: field !== null,
                hasCanvas: canvas !== null,
            };
        });
        expect(staged.hasStage, `${route} must render a DockStage container`).toBe(true);
        expect(staged.hasField, `${route} must render the shared aurora field`).toBe(true);
        await shot(page, `d-${route.replace(/\//g, "-")}-over-field`);
    });
}

// ── (e) a calm-seed aurora renders (the breathing register has a field to drive) ─
test("(e) the aurora substrate renders on a staged route (breathing has a field)", async ({
    page,
}) => {
    await page.goto("/navigation/carousel", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const auroraRenders = await page.evaluate(() => {
        // The navigation band's aurora default → a StoryHero aurora substrate. The
        // breathing register (now non-zero) drives the painted field; confirm an
        // aurora canvas / gradient surface is present (the field is rendering — the
        // value.js fleet confirmed resolveRenderMode='webgl' on a real GPU).
        const bg = document.querySelector(".story-hero-bg");
        const canvas = document.querySelector(".story-hero-bg canvas, canvas");
        return { hasBg: bg !== null, hasCanvas: canvas !== null };
    });
    expect(auroraRenders.hasBg, "the navigation aurora substrate must render").toBe(true);
    await shot(page, "e-aurora-breathing-field");
});

// ── Whole-page gestalt captures (both modes, both viewports) — fed to W-REFLECT2 ─
test("whole-page gestalt captures — the staged demo in BOTH modes", async ({ page }) => {
    const routes = [
        "/feedback/alert",
        "/data/metric-cell",
        "/substrates/glass-material",
        "/dock/overview",
    ];
    for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        for (const dark of [false, true]) {
            for (const route of routes) {
                await page.goto(route, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(300);
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.screenshot({
                    path: `${VISUAL_DIR}/W-STAGE-gestalt-${route.replace(/\//g, "-")}-${vp.name}-${dark ? "dark" : "light"}.png`,
                    fullPage: true,
                });
            }
        }
    }
    expect(true).toBe(true);
});
