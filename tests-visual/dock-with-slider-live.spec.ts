// AY.W-DOCK3 — the dock-with-slider keepDockOpen LIVE drag DELTA (π lane).
//
// The cross-substrate `keepDockOpen` contract is statically locked by the mount
// gate `proof:dock-hold-contract` (a @vue/test-utils bite that dispatches a real
// pointerdown and asserts `keepOpen()` fired + `data-held` painted on both roots).
// That proves the WIRING. It does NOT prove the LIVE/VISUAL register the user
// reports ("the dock-with-a-slider is broken"): a real pointer drag on a real
// collapsible dock, holding it open through the gesture while the pointer is OFF
// the dock, with the thumb-halo + substrate tier-shade lit.
//
// This spec drives the REAL `/compositions/dock-with-slider` story (the canonical
// proof story the CLAUDE.md Slider section points at) with REAL `page.mouse.*`
// events — NOT synthetic dispatches — so the native `pointerdown`/window-`pointerup`
// hold path in `useDockHold` is exercised end-to-end:
//
//   1. EXPAND the collapsible dock (hover) so idle-collapse has something to
//      suppress (a fresh dock starts collapsed; the hold only matters once open).
//   2. press-and-HOLD a slider thumb (`page.mouse.down()` on the thumb centre).
//   3. MOVE the pointer OFF the dock — the gesture is live but the cursor has left
//      the dock, the exact condition that idle-collapses an un-held dock.
//   4. ASSERT mid-gesture: `data-held` is PRESENT on BOTH the `.glass-dock` root
//      AND the `.glass-slider` root, and the dock stayed `.expanded` (NOT collapsed).
//   5. RELEASE (`page.mouse.up()`) — ASSERT `data-held` CLEARS on both roots.
//   6. SCREENSHOT the held frame + the released frame into the visual DELTA dir
//      ({light,dark}) so a fresh auditor SEES the hold, not a prose claim.
//
// Bite: disarm the hold (`:keep-dock-open="false"` on the story slider, or orphan
// the `useDockHold` native listener) → the mid-drag `data-held` assertion fails AND
// the dock idle-collapses mid-hold → spec RED.

import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const ROUTE = "/compositions/dock-with-slider";

// The collapsible dock cell (the keep-dock-open proof). The GlassDock root forwards
// `data-testid` to the `.glass-dock` element; a plain testid (NOT `containerName`,
// which co-applies `container-type: inline-size` and FREEZES the morph — the §F1
// AT.W7 / 3.4.0 trap; see W-DOCK1-DELTA.md §F1).
const DOCK_SEL = '.glass-dock[data-testid="dock-slider-hold-root"]';
const SLIDER_SEL = `${DOCK_SEL} [data-slot="slider"]`;
const THUMB_SEL = `${SLIDER_SEL} [role="slider"]`;

const THEMES = ["light", "dark"] as const;
const VIEWPORTS = [
    { id: "desktop", width: 1440, height: 900 },
    { id: "mobile", width: 390, height: 844 },
] as const;

/** Read `data-held` presence on the dock root + the slider root in one round-trip. */
async function readHeld(page: import("@playwright/test").Page) {
    return page.evaluate(
        ({ dockSel, sliderSel }) => {
            const dock = document.querySelector(dockSel) as HTMLElement | null;
            const slider = document.querySelector(sliderSel) as HTMLElement | null;
            return {
                dockHeld: dock?.hasAttribute("data-held") ?? false,
                sliderHeld: slider?.hasAttribute("data-held") ?? false,
                dockExpanded: dock?.classList.contains("expanded") ?? false,
                dockCollapsed: dock?.classList.contains("collapsed") ?? false,
            };
        },
        { dockSel: DOCK_SEL, sliderSel: SLIDER_SEL },
    );
}

test.describe("dock-with-slider keepDockOpen (π lane — LIVE drag DELTA, fail-CLOSED)", () => {
    test.describe.configure({ timeout: 120_000 });

    for (const viewport of VIEWPORTS) {
        for (const theme of THEMES) {
            test(`hold + clear + capture — ${viewport.id} / ${theme}`, async ({ browser }) => {
                const ctx = await browser.newContext({
                    viewport: { width: viewport.width, height: viewport.height },
                    deviceScaleFactor: 2,
                    colorScheme: theme === "dark" ? "dark" : "light",
                    reducedMotion: "no-preference",
                });
                const page = await ctx.newPage();

                // Force the readable arm — remove startViewTransition before boot so the
                // route morph is the spring-driven path on every engine (no VT noise).
                await page.addInitScript(() => {
                    try {
                        if (Object.prototype.hasOwnProperty.call(document, "startViewTransition"))
                            // @ts-expect-error deliberate removal
                            delete document.startViewTransition;
                        let p: object | null = Object.getPrototypeOf(document);
                        while (p) {
                            if (Object.prototype.hasOwnProperty.call(p, "startViewTransition")) {
                                // @ts-expect-error deliberate removal on proto
                                delete (p as { startViewTransition?: unknown }).startViewTransition;
                                break;
                            }
                            p = Object.getPrototypeOf(p);
                        }
                    } catch {
                        /* non-configurable on this engine */
                    }
                });

                await page.goto(ROUTE, { waitUntil: "networkidle" });
                if (theme === "dark")
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                else await page.evaluate(() => document.documentElement.classList.remove("dark"));

                // The CLAUDE.md-pointer + route resolution proof: the dock cell exists.
                await page.waitForSelector(DOCK_SEL, { timeout: 8000 });
                const dock = page.locator(DOCK_SEL).first();
                // Scroll the dock to viewport CENTRE — `scrollIntoViewIfNeeded` parks
                // it at the page bottom (the cell sits low in the two-cell story), so
                // a 900-tall viewport clips it below the fold and Playwright cannot
                // dispatch a real pointer onto the thumb. Centring it leaves room ABOVE
                // for the off-dock pointer move and keeps the thumb fully in-view.
                await dock.evaluate((el) =>
                    el.scrollIntoView({ block: "center", inline: "center" }),
                );
                await page.waitForTimeout(300);

                // (1) EXPAND the collapsible dock — a real hover (expand-on-hover is
                // immediate), so idle-collapse has something to suppress.
                await dock.hover({ force: true });
                await page.waitForTimeout(700); // let the morph settle to expanded

                // REST readback: BEFORE the press, `data-held` is absent on both roots.
                const atRest = await readHeld(page);
                expect(
                    atRest.dockHeld,
                    "at REST the dock root must NOT carry data-held (no gesture live)",
                ).toBe(false);
                expect(
                    atRest.sliderHeld,
                    "at REST the slider root must NOT carry data-held",
                ).toBe(false);

                // Locate the dock + the first slider thumb centres (the real grab
                // point). Press the pointer onto the dock first (keeping the hover
                // alive) THEN onto the thumb, so the dock stays expanded into the press.
                const dockBox = (await dock.boundingBox())!;
                await page.mouse.move(dockBox.x + dockBox.width / 2, dockBox.y + dockBox.height / 2);
                await page.waitForTimeout(80);

                await page.waitForSelector(THUMB_SEL, { timeout: 8000 });
                const thumb = page.locator(THUMB_SEL).first();
                const thumbBox = await thumb.boundingBox();
                expect(thumbBox, "the slider thumb must have a layout box").not.toBeNull();
                const tx = thumbBox!.x + thumbBox!.width / 2;
                const ty = thumbBox!.y + thumbBox!.height / 2;

                // (2) PRESS-and-HOLD the thumb with a REAL pointer (the native
                // pointerdown the `useDockHold` host listener captures). The press
                // acquisition is the synchronous instant-on edge — confirm it lit
                // BEFORE leaving the dock; one retry absorbs a lost-hover race (the
                // dock idle-collapsing in the gap between hover and the thumb move on
                // a slow frame). The OFF-DOCK hold below is still the binding assert.
                const pressAndConfirm = async (): Promise<boolean> => {
                    await dock.hover({ force: true });
                    await page.waitForTimeout(120);
                    await page.mouse.move(dockBox.x + dockBox.width / 2, dockBox.y + dockBox.height / 2);
                    await page.waitForTimeout(60);
                    await page.mouse.move(tx, ty);
                    await page.mouse.down();
                    await page.waitForTimeout(120);
                    const r = await readHeld(page);
                    return r.dockHeld && r.sliderHeld;
                };
                let acquired = await pressAndConfirm();
                if (!acquired) {
                    await page.mouse.up();
                    await page.waitForTimeout(200);
                    acquired = await pressAndConfirm();
                }
                expect(
                    acquired,
                    "the press must acquire the keepDockOpen token (instant-on: data-held lit on both roots while the pointer is still on the thumb) — the hold is disarmed/dropped at the host listener",
                ).toBe(true);

                // (3) MOVE the pointer OFF the dock — a live gesture, cursor off the
                // dock (the exact idle-collapse trigger for an UN-held dock). The drag
                // also nudges the slider value (a real drag, not a static press). The
                // off-dock target is ABOVE the dock (room exists — the dock is centred).
                const offX = dockBox.x + dockBox.width + 80;
                const offY = dockBox.y - 80;
                await page.mouse.move(tx + 18, ty, { steps: 6 }); // a small in-track drag
                await page.mouse.move(offX, offY, { steps: 10 }); // leave the dock

                // Wait PAST the 600ms collapse-delay — an un-held dock would have
                // idle-collapsed by now; the held dock must stay open.
                await page.waitForTimeout(900);

                // (4) MID-GESTURE readback — the binding behavioural truth.
                const held = await readHeld(page);
                expect(
                    held.dockHeld,
                    "MID-DRAG the dock root MUST carry data-held (keepDockOpen token held) — the hold is disarmed/dropped",
                ).toBe(true);
                expect(
                    held.sliderHeld,
                    "MID-DRAG the slider root MUST carry data-held (it reflects the dock's shared held edge for the thumb-halo)",
                ).toBe(true);
                expect(
                    held.dockExpanded && !held.dockCollapsed,
                    "MID-DRAG the collapsible dock MUST stay .expanded (idle-collapse suppressed past the 600ms delay) — the hold did NOT keep it open",
                ).toBe(true);

                // (5) CAPTURE the held frame.
                const heldPng = resolve(
                    VISUAL_DIR,
                    `W-DOCK3-dock-slider-held-${viewport.id}-${theme}.png`,
                );
                await page.screenshot({ path: heldPng });
                expect(existsSync(heldPng), `${heldPng} did not land on disk`).toBe(true);

                // (6) RELEASE — a real pointerup (window-scoped; reka retargets the
                // captured up to window, ending the hold).
                await page.mouse.up();
                await page.waitForTimeout(300);

                const released = await readHeld(page);
                expect(
                    released.dockHeld,
                    "ON RELEASE the dock root data-held MUST clear (the token released)",
                ).toBe(false);
                expect(
                    released.sliderHeld,
                    "ON RELEASE the slider root data-held MUST clear",
                ).toBe(false);

                // CAPTURE the released frame.
                const releasedPng = resolve(
                    VISUAL_DIR,
                    `W-DOCK3-dock-slider-released-${viewport.id}-${theme}.png`,
                );
                await page.screenshot({ path: releasedPng });
                expect(existsSync(releasedPng), `${releasedPng} did not land on disk`).toBe(true);

                await ctx.close();
            });
        }
    }
});
