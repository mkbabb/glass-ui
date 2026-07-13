// BI.W-ESC-STACK — esc-stack.spec.ts, the BINDING behaviour readback (the AY
// W-LIVE1 LOCAL-ONLY π half). proof:esc-stack proves the SOURCE (E1-E3 device-free);
// THIS spec proves the LIVE contract:
//
//   (a) THE ESCAPE STACK (dismiss-topmost / LIFO) — open the OUTER expandable, then
//       the INNER one nested inside it (two stacked overlays). The FIRST Escape
//       collapses the INNER (top-most), the SECOND Escape collapses the OUTER — NEVER
//       the outer first (the single-winner regression: a collapsed/earlier container
//       swallowing Escape). The survivor after the first Escape is the OUTER, proving
//       the top-open handler won.
//   (b) THE FULLSCREEN FOCUS MODEL (A11Y-4) — on expand, focus MOVES INTO the panel
//       (FocusScope mount-auto-focus); Tab stays TRAPPED inside it; the inline host is
//       `inert` while fullscreen; on collapse (Escape), focus RESTORES to the
//       `#expand-trigger`.
//
// LOCAL-ONLY (real-browser dev-box; loads :5199). Chromium desktop + coarse-touch run
// it via the `--run pi` enrolled glob; the real-WebKit arm (the cross-engine focus
// contract) is booked for the orchestrator (add to the `webkit` project testMatch).
// Captured to docs/tranches/BI/audit/visual/.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/", import.meta.url),
);

const OUTER = ".esc-stack-outer";
const INNER = ".esc-stack-inner";
const EXPAND = '[data-part="trigger"][data-mode="expand"]';
const OVERLAY = '[data-part="overlay"]';

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(80);
}

// The visible fullscreen overlays teleported to <body>, top-most last (mount order).
async function overlayMarkers(page: Page): Promise<string[]> {
    return page.evaluate((sel) => {
        return Array.from(document.querySelectorAll(sel))
            .filter((el) => (el as HTMLElement).offsetParent !== null ||
                getComputedStyle(el as HTMLElement).position === "fixed")
            .map((el) => (el.textContent ?? "").replace(/\s+/g, " ").trim());
    }, OVERLAY);
}

async function activeInsideOverlay(page: Page): Promise<boolean> {
    return page.evaluate((sel) => {
        const a = document.activeElement;
        const overlays = Array.from(document.querySelectorAll(sel));
        return overlays.some((o) => a instanceof Node && o.contains(a));
    }, OVERLAY);
}

test.beforeEach(async ({ page }) => {
    await page.goto("/containers/expandable-container", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    await page
        .locator(`${OUTER} ${EXPAND}`)
        .first()
        .scrollIntoViewIfNeeded();
});

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    // ── (a) the Escape stack: dismiss-topmost (LIFO), NOT single-winner ──────────
    test(`(a) Escape stack — inner pops first, then outer [${mode}]`, async ({
        page,
    }) => {
        await setDark(page, dark);

        // Open the OUTER expandable.
        await page.locator(`${OUTER} ${EXPAND}`).first().click();
        await page.waitForTimeout(200);
        let markers = await overlayMarkers(page);
        expect(markers.length).toBe(1);
        expect(markers[0]).toContain("outer");

        // Open the INNER expandable (nested inside the outer overlay panel).
        await page.locator(`${OVERLAY} ${INNER} ${EXPAND}`).first().click();
        await page.waitForTimeout(200);
        markers = await overlayMarkers(page);
        expect(markers.length).toBe(2);
        // The top-most (last-mounted) overlay is the inner fullscreen.
        expect(markers[markers.length - 1]).toContain("inner");

        await page.screenshot({
            path: `${VISUAL_DIR}esc-stack-both-open-${mode}.png`,
        });

        // FIRST Escape → the INNER (top-most) collapses; the OUTER survives.
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        markers = await overlayMarkers(page);
        expect(markers.length).toBe(1);
        // The single-winner regression would leave the INNER (outer closed first).
        expect(markers[0]).toContain("outer");
        expect(markers[0]).not.toContain("inner · fullscreen=true");

        // SECOND Escape → the OUTER collapses; the stack is empty.
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        markers = await overlayMarkers(page);
        expect(markers.length).toBe(0);
    });

    // ── (b) the fullscreen focus model: move-in, trap, inert-behind, restore ─────
    test(`(b) focus model — move-in / trap / inert / restore [${mode}]`, async ({
        page,
    }) => {
        await setDark(page, dark);

        const trigger = page.locator(`${OUTER} ${EXPAND}`).first();
        await trigger.focus();

        // Expand — focus MOVES INTO the panel (FocusScope mount-auto-focus).
        await trigger.click();
        await page.waitForTimeout(250);
        expect(await activeInsideOverlay(page)).toBe(true);

        // The inline host is `inert` while fullscreen (page-behind footprint).
        const inert = await page
            .locator(OUTER)
            .first()
            .getAttribute("inert");
        expect(inert).not.toBeNull();

        // Tab stays TRAPPED inside the overlay.
        for (let i = 0; i < 5; i++) await page.keyboard.press("Tab");
        expect(await activeInsideOverlay(page)).toBe(true);

        await page.screenshot({
            path: `${VISUAL_DIR}esc-stack-focus-trapped-${mode}.png`,
        });

        // Collapse via Escape — focus RESTORES to the expand trigger.
        await page.keyboard.press("Escape");
        await page.waitForTimeout(300);
        expect(await overlayMarkers(page)).toHaveLength(0);
        const restored = await page.evaluate((sel) => {
            const a = document.activeElement as HTMLElement | null;
            return !!a && !!a.closest(sel) &&
                a.matches('[data-part="trigger"][data-mode="expand"]');
        }, OUTER);
        expect(restored).toBe(true);
    });
}

test.afterAll(async () => {
    mkdirSync(VISUAL_DIR, { recursive: true });
});
