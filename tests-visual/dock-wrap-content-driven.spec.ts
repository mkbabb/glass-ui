// AX.W04 — proof:dock-wrap-content-driven, the live-rAF arm in the π workspace.
//
// `overflow="wrap"` was a VIEWPORT `@media (min-width: 640px)` toggle, not a content
// strategy: above 640px a wrap dock forced `flex-wrap: nowrap` + `max-width: none`,
// so a wide row NEVER wrapped (a 40-button row at an 800px viewport rendered 1861px
// wide, overflowing the viewport by ~1060px). W04 makes wrap an INTRINSIC over-cap
// flex reflow: `flex-wrap: wrap` is always-on + the dock inline-size caps at
// `min(max-content, --dock-max-inline-size)`, so the row wraps to N rows EXACTLY
// when its intrinsic width exceeds the cap — at ANY viewport width.
//
// This spec is the live RUNTIME truth (the .mjs driver carries the device-free
// SOURCE arm + the fail-CLOSED skip plumbing). It mounts the demo navigation/dock
// `overflow="wrap"` section at a ≥640px viewport — the EXACT width the magic-640
// chain false-passed at — and asserts:
//   - the wrap dock's layer computed `flex-wrap === "wrap"`,
//   - it wrapped to ≥2 ROWS (the over-cap content reflowed),
//   - the dock `right <= window.innerWidth` (no viewport bleed),
//   - the dock `border-radius` resolves to the finite `--dock-card-radius` (a CARD
//     corner, not the stadium `--radius-pill`), and
//   - NO vertical dock carries `.dock-overflow-wrap` (horizontal-only, F5).
//
// Born-RED at HEAD a125d9a: at 1280px the wrap dock is `nowrap` / `rowCount:1` /
// (un-capped) `right > innerWidth`. GREEN after the wave.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The card radius (--radius-dock-card = --radius-3xl) is markedly larger than the
// 16px --radius-2xl the wrap shell used to hardcode. We assert the resolved radius
// is finite (not the stadium half-height) AND clearly above the old 16px literal.
const MIN_CARD_RADIUS_PX = 20;

test.describe("dock-wrap-content-driven (π lane — content-driven reflow, fail-CLOSED)", () => {
    test("the overflow=wrap dock reflows by INTRINSIC content over-cap wrap at a >=640px viewport", async ({
        page,
    }) => {
        // A ≥640px viewport — above the deleted magic-640 breakpoint, where HEAD
        // forced nowrap. The content-driven cap must wrap here regardless.
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock.dock-overflow-wrap", { timeout: 5000 });
        // Let fonts + the morph settle.
        await page.waitForTimeout(500);

        const probe = await page.evaluate(() => {
            const docks = [
                ...document.querySelectorAll<HTMLElement>(
                    ".glass-dock.dock-overflow-wrap",
                ),
            ];
            if (!docks.length) return { error: "no .dock-overflow-wrap dock on the route" };
            const dock = docks[0]!;
            const layer =
                dock.querySelector<HTMLElement>(".dock-layer--full") ?? dock;
            const cs = getComputedStyle(layer);
            const kids = [...layer.children].filter(
                (c) => (c as HTMLElement).getBoundingClientRect().width > 0,
            );
            const tops = kids.map((c) =>
                Math.round((c as HTMLElement).getBoundingClientRect().top),
            );
            const rowCount = new Set(tops).size;
            const r = dock.getBoundingClientRect();
            const dockCS = getComputedStyle(dock);
            // The resolved border-radius (px). For a stadium pill this resolves to
            // half the dock height; for the finite card it is the card-radius.
            const radiusPx = Number.parseFloat(dockCS.borderTopLeftRadius);
            const heightPx = r.height;
            return {
                flexWrap: cs.flexWrap,
                rowCount,
                dockRight: Math.round(r.right),
                innerWidth: window.innerWidth,
                radiusPx,
                heightPx,
                verticalWrapDocks: document.querySelectorAll(
                    ".glass-dock.vertical.dock-overflow-wrap",
                ).length,
            };
        });

        expect(probe.error, probe.error ?? "").toBeFalsy();
        // (1) Content-driven reflow engaged.
        expect(probe.flexWrap, "the wrap layer must compute flex-wrap: wrap").toBe(
            "wrap",
        );
        // (2) It wrapped to >= 2 rows (over-cap content reflowed).
        expect(
            probe.rowCount,
            `the wrap layer rendered ${probe.rowCount} row(s) at 1280px — the over-cap content did not wrap`,
        ).toBeGreaterThanOrEqual(2);
        // (3) No viewport bleed — the dock right edge is inside the viewport.
        expect(
            probe.dockRight,
            `the wrap dock right edge ${probe.dockRight}px overflows the viewport ${probe.innerWidth}px (the 800px-bleed defect)`,
        ).toBeLessThanOrEqual(probe.innerWidth! + 1);
        // (4) The radius is the finite CARD corner, not the stadium pill. A stadium
        // pill radius ≈ half the dock height; the card radius is a fixed value
        // clearly below half-height for a multi-row dock and above the old 16px.
        expect(
            probe.radiusPx,
            `the wrap card radius ${probe.radiusPx}px should be the finite --dock-card-radius (>= ${MIN_CARD_RADIUS_PX}px, not the 16px --radius-2xl)`,
        ).toBeGreaterThanOrEqual(MIN_CARD_RADIUS_PX);
        expect(
            probe.radiusPx,
            `the wrap card radius ${probe.radiusPx}px should NOT be a stadium pill (>= half the ${probe.heightPx}px dock height)`,
        ).toBeLessThan(probe.heightPx! / 2);
        // (5) Horizontal-only (F5).
        expect(
            probe.verticalWrapDocks,
            "no vertical dock may carry .dock-overflow-wrap (wrap is horizontal-only)",
        ).toBe(0);
    });
});
