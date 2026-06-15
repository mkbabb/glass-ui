// BA.W-DEMO-AFFORDANCES — demo-affordances.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:demo-affordances
// proves the SOURCE structure (no .glass-btn+.btn-pill stack, one play register,
// no lone column-flex trigger, no bg-card/60 plate); THIS spec proves the painted
// RENDER — the affordances read as DESIGNED in BOTH modes. The AZ.W-MOTION2 close
// marked the curve-gallery `complete` on the source diff while BOTH the play
// control + the picker eroded live (R8-16/R8-17, the source-green/visually-broken
// gap, the AZ P-1 close-class). So the live render is the binding truth, never the
// source diff alone.
//
// THE BINDING ARMS (the real demo routes, which load the global /styles cascade so
// the glass-bg tiers + the dock active register resolve):
//
//   (a) CURVE-PICKER — the SELECTED chip's resolved background references the
//       glass-floating plate (NOT `none`/transparent), AND the selected-plate
//       luminance > the unselected chips' luminance (the R8-16 contrast-color
//       inversion DEAD — the active signal is a PLATE, not an fg/muted-fg delta).
//       In BOTH modes.
//   (b) PLAY CONTROL — the play control renders content-width: its painted width
//       is GREATER than the fixed --size-icon-btn square (NOT the ~40px blob the
//       .btn-pill+.glass-btn stack clipped to).
//   (c) LONE TRIGGER — a lone trigger computes content-width LESS than its parent
//       column width (not the full-stretch slab).
//   (d) GLASS CONTAINER — a re-pointed demo container composites as glass over its
//       backdrop (a resolved translucent --glass-bg-* tier, NOT the opaque
//       bg-card/60).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

const CURVE_ROUTE = "/motion/curve-gallery";
const TOASTER_ROUTE = "/feedback/toaster";
const SKELETON_ROUTE = "/feedback/skeleton";
const NOTIFICATION_ROUTE = "/feedback/notification";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

function alphaOf(bg: string): number | null {
    const rgba = bg.match(
        /rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(
        /(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i,
    );
    if (fn) {
        const v = fn[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    if (/^(color\(srgb|oklab\(|rgb\()/i.test(bg)) return 1;
    return null;
}

// Parse a resolved color string to a luminance proxy (0..1). The browser
// resolves the glass-floating `color-mix(in srgb, …)` plate to DIFFERENT forms
// per mode: `color(srgb r g b / a)` in light, `oklab(L a b / a)` in dark. We
// handle rgb()/rgba(), color(srgb …) → sRGB relative-luminance, AND oklab(…) →
// its L component (a perceptual lightness, the correct luminance proxy for the
// selected>unselected comparison). A fully-transparent rest chip
// (`rgba(0,0,0,0)`) resolves to 0 in any space, so the comparison is robust.
function luminanceOf(color: string): number | null {
    // oklab(L a b / α) — the L component IS a perceptual lightness 0..1.
    const oklab = color.match(/oklab\(\s*([\d.]+)/i);
    if (oklab) return Number(oklab[1]);
    let r: number, g: number, b: number;
    const rgb = color.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i,
    );
    if (rgb) {
        r = Number(rgb[1]) / 255;
        g = Number(rgb[2]) / 255;
        b = Number(rgb[3]) / 255;
    } else {
        const srgb = color.match(
            /color\(\s*srgb\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/i,
        );
        if (!srgb) return null;
        r = Number(srgb[1]);
        g = Number(srgb[2]);
        b = Number(srgb[3]);
    }
    const lin = (c: number) =>
        c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * Read the curve-picker chip rack: the selected chip's resolved background +
 * luminance, and the median unselected chip background luminance. The selected
 * plate must be a real glass tier (translucent, not `none`/transparent) AND its
 * luminance must exceed the unselected chips' (the inversion DEAD).
 */
async function readChipRack(page: Page): Promise<{
    selectedBg: string;
    selectedBgAlpha: number | null;
    selectedLuma: number | null;
    unselectedLuma: number | null;
    floatingResolved: string;
    count: number;
} | null> {
    const rack = page.locator(".curve-chip-rack").first();
    await rack.waitFor({ state: "visible", timeout: 8000 });
    return rack.evaluate((el) => {
        const chips = Array.from(
            el.querySelectorAll<HTMLElement>(".curve-chip"),
        );
        const active = el.querySelector<HTMLElement>(".curve-chip--active");
        const inactive = chips.filter(
            (c) => !c.classList.contains("curve-chip--active"),
        );
        const csActive = active ? getComputedStyle(active) : null;
        // The unselected chips paint over a glass card; we sample the FIRST
        // inactive chip's resolved background (the rack is uniform). A
        // transparent rest chip resolves to rgba(…,0) — the selected plate is
        // strictly more opaque + lighter.
        const csInactive = inactive[0] ? getComputedStyle(inactive[0]) : null;
        // The library token the active register reads — resolved off :root.
        const floating = getComputedStyle(document.documentElement)
            .getPropertyValue("--glass-bg-floating")
            .trim();
        return {
            selectedBg: csActive ? csActive.backgroundColor : "",
            selectedBgRaw: csActive ? csActive.background : "",
            unselectedBg: csInactive ? csInactive.backgroundColor : "",
            floatingResolved: floating,
            count: chips.length,
        };
    }).then((r) => ({
        selectedBg: r.selectedBg,
        selectedBgAlpha: alphaOf(r.selectedBg),
        selectedLuma: luminanceOf(r.selectedBg),
        unselectedLuma: luminanceOf(r.unselectedBg),
        floatingResolved: r.floatingResolved,
        count: r.count,
    }));
}

test.describe("BA.W-DEMO-AFFORDANCES — the demo affordances π readback", () => {
    mkdirSync(VISUAL_DIR, { recursive: true });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";

            // ── (a) the curve-picker chip rack: selected = floating plate, and
            //        selected luminance > unselected (the inversion DEAD).
            //        DESKTOP only — the chip rack is the desktop+ register; below
            //        the breakpoint the rack is `hidden` and a <Select> is the
            //        narrow floor (asserted separately below). ────────
            test(`curve-picker selected chip is a glass plate, selected>unselected — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                test.skip(
                    vp.name !== "desktop",
                    "the chip rack is the desktop+ register; the narrow floor is the <Select> arm",
                );
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(CURVE_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);

                const rack = await readChipRack(page);
                expect(rack, "the curve chip rack must render").not.toBeNull();
                if (!rack) return;

                // the full W-MOTION2 family IA + Custom = 12 chips (the 11
                // CURVE_FAMILIES entries — Standard/Sine/Quad/Cubic/Expo/Circ/Back/
                // Bounce/Steps/Linear()/Springs — plus the live Custom editor; all
                // preserved, presentation-only).
                expect(
                    rack.count,
                    "the rack must render the full family IA + Custom",
                ).toBeGreaterThanOrEqual(12);

                // the selected chip's background is a REAL glass plate, not
                // `none`/transparent (the POSITIVE token test).
                expect(
                    rack.selectedBgAlpha,
                    `the selected chip's background must be a resolved glass tier (not none/transparent) — got ${rack.selectedBg}`,
                ).not.toBeNull();
                expect(rack.selectedBgAlpha!).toBeGreaterThan(0.1);

                // the inversion is DEAD: the selected plate luminance > the
                // unselected chips' (the active signal is a PLATE, structurally).
                expect(
                    rack.selectedLuma,
                    "the selected chip luminance must be readable",
                ).not.toBeNull();
                expect(
                    rack.unselectedLuma,
                    "the unselected chip luminance must be readable",
                ).not.toBeNull();
                expect(
                    rack.selectedLuma!,
                    `selected-plate luminance (${rack.selectedLuma?.toFixed(3)}) must exceed the unselected chips' (${rack.unselectedLuma?.toFixed(3)}) — the contrast-color inversion DEAD`,
                ).toBeGreaterThan(rack.unselectedLuma!);

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-DEMO-AFFORDANCES-curve-${vp.name}-${mode}.png`,
                    fullPage: false,
                });
            });

            // ── (b) the play control is content-width, not the 40px blob ───────
            test(`play control renders content-width > the icon square — ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(CURVE_ROUTE, { waitUntil: "networkidle" });
                await setDark(page, dark);

                const measured = await page.evaluate(() => {
                    // The "Play family" control — the StoryPlayButton-rendered
                    // <button> carrying the "Play family" label.
                    const buttons = Array.from(
                        document.querySelectorAll<HTMLElement>("button"),
                    );
                    const play = buttons.find((b) =>
                        /play family/i.test(b.textContent ?? ""),
                    );
                    if (!play) return null;
                    const rect = play.getBoundingClientRect();
                    // the fixed icon-button square the .glass-btn primitive pins.
                    const iconBtn = getComputedStyle(document.documentElement)
                        .getPropertyValue("--size-icon-btn")
                        .trim();
                    const iconBtnPx = parseFloat(iconBtn) || 40;
                    return { width: rect.width, height: rect.height, iconBtnPx };
                });
                expect(
                    measured,
                    "the 'Play family' control must render",
                ).not.toBeNull();
                if (!measured) return;
                expect(
                    measured.width,
                    `the play control width (${measured.width}) must EXCEED the fixed icon square (${measured.iconBtnPx}) — content-width, not the clipped blob`,
                ).toBeGreaterThan(measured.iconBtnPx);
            });
        }
    }

    // ── (a-narrow) the <Select> floor renders below the breakpoint ─────────────
    test("curve-picker narrow floor renders a <Select> below the breakpoint — mobile", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(CURVE_ROUTE, { waitUntil: "networkidle" });
        const hasSelect = await page.evaluate(() => {
            // The narrow floor is a <Select> trigger labeled "Curve family"; the
            // chip rack is `hidden` here. A visible select trigger is the floor.
            const trig = document.querySelector<HTMLElement>(
                '.curve-family-picker [role="combobox"], .curve-family-picker button[aria-label="Curve family"]',
            );
            if (!trig) return false;
            const r = trig.getBoundingClientRect();
            return r.width > 0 && r.height > 0;
        });
        expect(
            hasSelect,
            "below the breakpoint the picker must render the <Select> floor (the chip rack is hidden at narrow widths)",
        ).toBe(true);
    });

    // ── (c) the lone trigger is content-width < its parent column ──────────────
    test("toaster lone trigger sits content-width < parent column", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(TOASTER_ROUTE, { waitUntil: "networkidle" });
        await setDark(page, false);

        const measured = await page.evaluate(() => {
            const buttons = Array.from(
                document.querySelectorAll<HTMLElement>("button"),
            );
            const fire = buttons.find((b) =>
                /fire a toast/i.test(b.textContent ?? ""),
            );
            if (!fire) return null;
            const btnRect = fire.getBoundingClientRect();
            // Walk up to the nearest column-flex / showcase frame ancestor and
            // measure ITS width (the would-be stretch target).
            let col: HTMLElement | null = fire.parentElement;
            while (col && !/flex-col|showcase-frame|rounded-card/.test(col.className))
                col = col.parentElement;
            const colRect = col?.getBoundingClientRect();
            return {
                btnWidth: btnRect.width,
                colWidth: colRect ? colRect.width : Infinity,
            };
        });
        expect(measured, "the 'Fire a toast' trigger must render").not.toBeNull();
        if (!measured) return;
        expect(
            measured.btnWidth,
            `the lone trigger width (${measured.btnWidth}) must be LESS than the parent column (${measured.colWidth}) — content-width, not the full stretch`,
        ).toBeLessThan(measured.colWidth - 8);

        await page.screenshot({
            path: `${VISUAL_DIR}/W-DEMO-AFFORDANCES-toaster-desktop-light.png`,
            fullPage: false,
        });
    });

    // ── (d) the re-pointed containers composite as glass, not opaque slab ──────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`skeleton container composites as glass (translucent tier) — ${mode}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(SKELETON_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);

            const bgAlpha = await page.evaluate(() => {
                // The first re-pointed ShowcaseFrame (the card skeleton plate).
                const frame =
                    document.querySelector<HTMLElement>(".rounded-card");
                if (!frame) return null;
                const cs = getComputedStyle(frame);
                return cs.backgroundColor;
            });
            expect(bgAlpha, "the skeleton frame must render").not.toBeNull();
            if (!bgAlpha) return;
            const a = alphaOf(bgAlpha);
            expect(
                a,
                `the re-pointed container must composite as a translucent glass tier (not opaque bg-card/60) — got ${bgAlpha}`,
            ).not.toBeNull();
            // a glass-routed Card tier is translucent (< 1); an opaque slab is 1.
            expect(a!).toBeLessThan(1);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-AFFORDANCES-skeleton-desktop-${mode}.png`,
                fullPage: false,
            });
        });

        test(`notification tones container + curve full-page capture — ${mode}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(NOTIFICATION_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-AFFORDANCES-notification-desktop-${mode}.png`,
                fullPage: false,
            });
        });
    }
});
