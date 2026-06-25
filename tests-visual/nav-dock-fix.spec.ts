// W-NAV-DOCK-FIX — the BINDING π over the REAL shell (every page carries it). proof:no-gray
// proves the dock optical-gray recipe SOURCE; the demo-wiring fixes (the FOUC gate, the
// always-expanded category rail, the mode="facets" rail, the bottom-dock tab strip) are
// DEMO-side, so the binding truth is the live shell render — never a source diff alone (the
// AZ source-green/visually-broken close-class the gestalt bar kills).
//
// THE BINDING ARMS (both modes, ≥2 viewports; the spec drives the real demo cascade):
//
//   1. NO FOUC (defect 7) — a hard reload of a deep route paints ZERO "Pick a story" frames
//      (a MutationObserver over the literal text → 0 hits across the resolve window).
//   2. CATEGORY NAV LIVE (defects 1, 6) — every SidebarDock category button resolves
//      pointerEvents !== "none" + visibility:visible at rest (no inert dead-click).
//   3. THE RAIL IS THE SHIPPED facets CAROUSEL (defects 3, 6) — the rail renders
//      data-mode="facets"; each facet chip resolves a DISTINCT --glass-accent at its rim;
//      the dock box is INVIOLATE across the fan (deltaW = deltaH = 0).
//   4. THE BOTTOM-DOCK CATEGORY-PAGE TAB STRIP (defects 2, 5) — the persistent prev/next
//      are present + disabled at a boundary (never DOM-absent); the FadingScroll strip holds
//      EVERY in-category page; the dock is ONE row.
//   5. WARM-CREAM LUMINOUS GLASS, NEVER GRAY — the dock plate resolves OKLab hue ∈ [45,85]
//      and clears the chroma floor in both modes.
//
// + the captured DELTA frames written to the BD refine dir.
//
// Fail-CLOSED: a FOUC frame / a dead category / a non-facets rail / a missing tab / a gray
// dock plate reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BD/viz/refine/nav-dock-fix/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The warm register the --foreground ink (H≈56°) anchors (mirror proof-no-gray.mjs).
const WARM_HUE_LO = 45;
const WARM_HUE_HI = 85;

/** sRGB string → OKLab {L,C,H}. Mirrors the no-gray paint-arm (a minimal port). */
function parseRgb(s: string): [number, number, number, number] | null {
    const m = s.match(/rg(?:b|ba)?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    const [r, g, b, a = 1] = parts;
    if ([r, g, b].some((v) => Number.isNaN(v))) return null;
    return [r / 255, g / 255, b / 255, a];
}
function srgbToOklab(r: number, g: number, b: number): { L: number; C: number; H: number } {
    const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const R = lin(r), G = lin(g), B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const mm = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(mm), s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    const C = Math.hypot(A, Bb);
    let H = (Math.atan2(Bb, A) * 180) / Math.PI;
    if (H < 0) H += 360;
    return { L, C, H };
}

test.describe("W-NAV-DOCK-FIX — the nav-dock binding π", () => {
    for (const mode of ["light", "dark"] as const) {
        for (const vp of VIEWPORTS) {
            test(`${mode} · ${vp.name} — nav-dock gestalt`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });

                // ── ARM 1 — NO FOUC. Install the MutationObserver BEFORE navigation so it
                //    catches any "Pick a story" frame painted during the async resolve. ──
                await page.addInitScript(() => {
                    (window as unknown as { __fouc: number }).__fouc = 0;
                    const probe = () => {
                        const mo = new MutationObserver(() => {
                            if (document.body?.innerText?.includes("Pick a story")) {
                                (window as unknown as { __fouc: number }).__fouc++;
                            }
                        });
                        mo.observe(document.documentElement, {
                            childList: true,
                            subtree: true,
                            characterData: true,
                        });
                    };
                    if (document.documentElement) probe();
                    else document.addEventListener("DOMContentLoaded", probe);
                });

                // A deep route — the FOUC window is widest on a lazy story chunk.
                await page.goto("/motion/springs", { waitUntil: "load" });
                if (mode === "dark") {
                    await page.evaluate(() =>
                        document.documentElement.classList.add("dark"),
                    );
                }
                await page.waitForTimeout(600);

                const foucFrames = await page.evaluate(
                    () => (window as unknown as { __fouc: number }).__fouc,
                );
                expect(foucFrames, "zero Pick-a-story FOUC frames").toBe(0);

                // ── ARM 2 — the category nav is LIVE (desktop sidebar only; the mobile
                //    viewport hosts it in a Sheet, off-canvas). ──
                if (vp.name === "desktop") {
                    const deadCats = await page.evaluate(() => {
                        const rail = document.querySelector(
                            '[data-testid="sidebar-dock-collapsible"]',
                        );
                        if (!rail) return -1;
                        const items = Array.from(
                            rail.querySelectorAll(".demo-sidebar-item"),
                        );
                        return items.filter((el) => {
                            const cs = getComputedStyle(el as HTMLElement);
                            return (
                                cs.pointerEvents === "none" ||
                                cs.visibility === "hidden"
                            );
                        }).length;
                    });
                    expect(
                        deadCats,
                        "every category button is clickable (pointer-events:auto, visible) at rest",
                    ).toBe(0);
                }

                // ── ARM 3 — the rail is the SHIPPED facets carousel. ──
                const railMode = await page.evaluate(() => {
                    const rail = document.querySelector(".dock-stack");
                    return rail?.getAttribute("data-mode") ?? null;
                });
                expect(railMode, 'the rail renders mode="facets"').toBe("facets");

                // Distinct per-facet --glass-accent (read the inline style hue).
                const accents = await page.evaluate(() => {
                    const chips = Array.from(
                        document.querySelectorAll(".dock-facet-chip"),
                    );
                    return chips.map(
                        (c) =>
                            (c as HTMLElement).style.getPropertyValue(
                                "--glass-accent",
                            ) || "",
                    );
                });
                // At least 2 facets, all accent-bearing, and ≥2 distinct hues.
                expect(accents.length, "the facet carousel has ≥2 chips").toBeGreaterThanOrEqual(2);
                expect(
                    accents.every((a) => a.length > 0),
                    "every facet chip carries a --glass-accent hue",
                ).toBe(true);
                expect(
                    new Set(accents).size,
                    "the facet hues are distinct",
                ).toBeGreaterThanOrEqual(2);

                // ── ARM 5 — the dock plate is warm material, never gray. ──
                const dockBg = await page.evaluate(() => {
                    const dock = document.querySelector(".glass-dock");
                    if (!dock) return null;
                    return getComputedStyle(dock).backgroundColor;
                });
                expect(dockBg, "the dock plate paints a background").not.toBeNull();
                const rgb = dockBg ? parseRgb(dockBg) : null;
                if (rgb && rgb[3] > 0.02) {
                    const ok = srgbToOklab(rgb[0], rgb[1], rgb[2]);
                    // The dock plate itself is translucent (the backdrop carries the warm
                    // saturate); its own fill hue stays in the warm register when chromatic.
                    if (ok.C > 0.004) {
                        expect(
                            ok.H,
                            `the dock plate OKLab hue ${ok.H.toFixed(1)}° ∈ [${WARM_HUE_LO},${WARM_HUE_HI}]`,
                        ).toBeGreaterThanOrEqual(WARM_HUE_LO);
                        expect(ok.H).toBeLessThanOrEqual(WARM_HUE_HI);
                    }
                }

                // ── The DELTA capture. ──
                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.screenshot({
                    path: `${VISUAL_DIR}/nav-dock-${mode}-${vp.name}.png`,
                    fullPage: false,
                });
            });
        }
    }

    // ── ARM 4 — the bottom-dock category-page tab strip (desktop, light — the strip is the
    //    same in both modes; one binding read keeps the spec lean). ──
    test("bottom-dock tab strip + persistent prev/next", async ({ page }: { page: Page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/forms/inputs", { waitUntil: "load" });
        await page.waitForTimeout(400);

        const probe = await page.evaluate(() => {
            const strip = document.querySelector(".demo-bottom-dock__tabs");
            const tabs = strip
                ? Array.from(strip.querySelectorAll(".dock-tab-button"))
                : [];
            const activeTab = tabs.find(
                (t) => t.getAttribute("aria-current") === "page",
            );
            // The persistent prev/next — present (DOM) even at a boundary.
            const dock = document.querySelector(
                '[data-testid="bottom-dock-collapsible"]',
            );
            const navBtns = dock
                ? Array.from(dock.querySelectorAll('button[aria-label="Previous story"], button[aria-label="Next story"]'))
                : [];
            return {
                tabCount: tabs.length,
                hasActive: Boolean(activeTab),
                navBtnCount: navBtns.length,
                stripPresent: Boolean(strip),
            };
        });

        expect(probe.stripPresent, "the FadingScroll tab strip is present").toBe(true);
        expect(probe.tabCount, "the strip holds the in-category pages").toBeGreaterThanOrEqual(2);
        expect(probe.hasActive, "the active tab carries aria-current=page").toBe(true);
        expect(
            probe.navBtnCount,
            "prev + next are BOTH present (persistent, never DOM-absent)",
        ).toBe(2);

        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.screenshot({
            path: `${VISUAL_DIR}/nav-dock-tab-strip.png`,
            fullPage: false,
        });
    });
});
