// BI.W-CONFIG-IN-SHEET — config-in-sheet.spec.ts, the BINDING π readback (the ss-24 /
// ss-25 before/after). proof:config-chassis proves the SOURCE (the concentric reader is
// WIRED, the ONE pad anchor is minted, the bare-div masquerade is gone); THIS spec proves
// the painted RENDER — the gear-sheet configurator sections read as CONCENTRIC CARDS inside
// the sheet clip (a rounded, bordered card, NOT the flush-square hairline block of ss-24),
// and the section inline padding == the sheet chrome inline padding (no indent — ss-25 /
// UF-A5). The AZ P-1 source-green/visually-broken gap is the close-class this π kills.
//
// THE BINDING ARMS:
//   (a) UF-A4 — the first gear section (.configurator-layer) paints a non-zero border-radius
//       (a CARD, not a flush-square block) that stays SUBORDINATE to the sheet's own corner
//       (concentric: inner ≤ outer).
//   (b) UF-A5 / GEO-9 — the section trigger's inline padding == the sheet chrome (SheetHeader)
//       inline padding (ONE --configurator-pad-inline anchor), and the section LABEL's painted
//       left edge aligns with the sheet TITLE's painted left edge (no indent).
//
// At ≥2 viewports, BOTH modes, over the pi-runner project matrix (chromium-headless-new
// desktop + coarse-touch mobile); the real-WebKit cross-engine pass is the reflect wave's
// local Safari run (the `webkit` project's testMatch is scoped to the cross-engine subset).
// Fail-CLOSED: a flush-square section (r < 1) / a padding mismatch / an indented section
// label reds the readback, exit non-zero. Frames captured to docs/tranches/BI/audit/visual/.
// LOCAL-only.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
    await page.waitForTimeout(180);
}

/** Open the gear-hosted PresetEditor via the shipped window event (the SAME path the
 *  SidebarDock gear DockIconButton dispatches — one event, no parallel open). */
async function openConfigurator(page: Page): Promise<void> {
    await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator"));
    });
    await page.locator('[role="dialog"]').first().waitFor({ state: "visible" });
    await page.waitForTimeout(420);
}

function shot(page: Page, name: string): Promise<Buffer> {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}${name}.png`, fullPage: false });
}

interface SheetMetrics {
    sectionRadius: number;
    triggerPadLeft: number;
    headerPadLeft: number;
    sectionLabelLeft: number;
    titleLeft: number;
    found: boolean;
}

async function measure(page: Page): Promise<SheetMetrics> {
    return page.evaluate(() => {
        const nan = {
            sectionRadius: NaN,
            triggerPadLeft: NaN,
            headerPadLeft: NaN,
            sectionLabelLeft: NaN,
            titleLeft: NaN,
            found: false,
        };
        // Scope EVERYTHING to the open dialog (the gear sheet is a [role="dialog"] +
        // data-slot="sheet-content"). A document-wide query would match a page heading.
        const dialog = document.querySelector('[role="dialog"]');
        if (!dialog) return nan;
        const section = dialog.querySelector(".configurator-layer");
        const trigger = dialog.querySelector(".configurator-layer-trigger");
        // The SheetTitle is the aria-labelledby target (robust — the gear overrides its
        // size utility, so a class selector is unreliable; the aria wiring is not).
        const titleId = dialog.getAttribute("aria-labelledby");
        const title = titleId ? document.getElementById(titleId) : null;
        const header = title?.parentElement ?? null;
        const sectionLabel = dialog.querySelector(".configurator-section-label");
        if (!section || !trigger || !title || !header || !sectionLabel) return nan;
        const num = (v: string) => parseFloat(v) || 0;
        return {
            sectionRadius: num(getComputedStyle(section).borderTopLeftRadius),
            triggerPadLeft: num(getComputedStyle(trigger).paddingLeft),
            headerPadLeft: num(getComputedStyle(header).paddingLeft),
            sectionLabelLeft: sectionLabel.getBoundingClientRect().left,
            titleLeft: title.getBoundingClientRect().left,
            found: true,
        };
    });
}

// ── (a) UF-A4 — the gear section reads as a CONCENTRIC CARD (not flush-square) ──────────
test.describe("ss-24 — the gear-sheet section is a concentric card", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            test(`section reads a concentric card @ ${vp.name} ${dark ? "dark" : "light"}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                // The gear (PresetEditor) is mounted GLOBALLY in AppShell — open it over the
                // lightweight home route (the WebGL substrate routes are heavy).
                await page.goto("/", { waitUntil: "networkidle" });
                await setDark(page, dark);
                await openConfigurator(page);

                const m = await measure(page);
                expect(m.found, "the gear sheet must mount a .configurator-layer section").toBe(
                    true,
                );

                // THE BINDING FLOOR — the section is a CARD (non-zero radius), not the ss-24
                // flush-square hairline block. The concentric relay reader (proof:config-chassis
                // bi1) derives max(--radius-floor, --radius-ctx − --radius-inset); over the gear
                // sheet (ctx = --radius-dialog, inset = --overlay-pad-inline) it floors to the
                // ~4px --radius-floor — a soft CARD corner, subordinate to the sheet's own rung,
                // never a stadium pill.
                expect(
                    m.sectionRadius,
                    `the section must paint a non-zero card border-radius (not the ss-24 flush-square block) — measured ${m.sectionRadius}px`,
                ).toBeGreaterThanOrEqual(1);
                expect(
                    m.sectionRadius,
                    `the section corner (${m.sectionRadius}px) must read as a CARD rung, never a stadium pill (Law 2)`,
                ).toBeLessThanOrEqual(20);

                await shot(page, `W-CONFIG-IN-SHEET-card-${dark ? "dark" : "light"}-${vp.name}`);
            });
        }
    }
});

// ── (b) UF-A5 / GEO-9 — the section content aligns with the sheet chrome (no indent) ────
test.describe("ss-25 — the section inline padding == the sheet chrome (no indent)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            test(`section content aligns with chrome @ ${vp.name} ${dark ? "dark" : "light"}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto("/", { waitUntil: "networkidle" });
                await setDark(page, dark);
                await openConfigurator(page);

                const m = await measure(page);
                expect(m.found, "the gear sheet must mount a .configurator-layer section").toBe(
                    true,
                );

                // THE ONE-ANCHOR FLOOR — the section trigger inline padding == the sheet chrome
                // (SheetHeader) inline padding (the ONE --configurator-pad-inline anchor).
                expect(
                    Math.abs(m.triggerPadLeft - m.headerPadLeft),
                    `the section inline padding (${m.triggerPadLeft}px) must equal the sheet chrome inline padding (${m.headerPadLeft}px) — ONE --configurator-pad-inline anchor, UF-A5/GEO-9 dead`,
                ).toBeLessThanOrEqual(1);
                // The painted content aligns — the section label left == the sheet title left
                // (no indent; the ss-25 defect is the section body indenting from the title).
                expect(
                    Math.abs(m.sectionLabelLeft - m.titleLeft),
                    `the section label (left ${m.sectionLabelLeft}) must align with the sheet title (left ${m.titleLeft}) — no indent`,
                ).toBeLessThanOrEqual(2);

                await shot(
                    page,
                    `W-CONFIG-IN-SHEET-align-${dark ? "dark" : "light"}-${vp.name}`,
                );
            });
        }
    }
});
