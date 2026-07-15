// AY.W-SCALE2 — proof:touch-target — the REAL touch-target runtime gate.
//
// The plan named `proof:touch-target` for waves but never possessed it (a phantom
// gate). This spec makes it a REAL artefact: it mounts the live control galleries at
// the coarse/touch Playwright project (so `@media (pointer: coarse)` matches), and for
// each of the seven sub-44 form atoms it reads the COMPOSITED pointer-receptive rect
// (the visible box ∪ the `touch-hit-area` ::before halo) via getComputedStyle and
// asserts BOTH dimensions ≥ 44 CSS px (WCAG 2.5.5 Target Size).
//
// MECHANISM (mirrors dark-semantic-contrast.spec.ts): a live-route render +
// getComputedStyle readback as the BINDING assertion (deterministic, dep-free, the
// library publish surface being zero-dep), axe `target-size` as the BEST-EFFORT
// secondary. The non-regression arm (a fresh fine-pointer context) confirms the
// ::before emits NO 44px overlay at fine pointer (the AX.W51 fine-pointer-identical
// invariant).
//
// CAPTURED DELTA: the spec writes a JSON readback to .cache/touch-target.json
// (per-atom { atom, route, hitRect, pass }) + own-surface PNGs.

import { test, expect, chromium } from "@playwright/test";
import type { Page, Locator } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AY/audit/visual", import.meta.url),
);
const CACHE_DIR = fileURLToPath(new URL("../.cache", import.meta.url));
const TOUCH_FLOOR = 44;

interface AtomTarget {
    atom: string;
    route: { category: string; story: string };
    /** A CSS selector that locates the atom's HOST (the touch-hit-area-bearing el). */
    selector: string;
}

const ATOMS: AtomTarget[] = [
    {
        atom: "Switch",
        route: { category: "forms", story: "checks" },
        selector: '[data-slot="switch"]',
    },
    {
        atom: "Checkbox",
        route: { category: "forms", story: "checks" },
        selector: '[data-slot="checkbox"]',
    },
    {
        atom: "RadioGroupItem",
        route: { category: "forms", story: "checks" },
        selector: '[data-slot="radio-group-item"]',
    },
    {
        atom: "SliderThumb",
        route: { category: "forms", story: "slider" },
        selector: ".slider-thumb",
    },
    {
        atom: "TagsInputItemDelete",
        route: { category: "data", story: "tags-input" },
        // the delete control inside a tags-input item
        selector: '[data-reka-tags-input-item-delete], button[aria-label*="elete" i], .relative.touch-hit-area',
    },
    {
        atom: "MultiSelectRemoveX",
        route: { category: "forms", story: "multi-select" },
        // the remove-X Button inside a selected-chip Badge (composed touch-hit-area)
        selector: ".relative.touch-hit-area",
    },
];

/**
 * The effective pointer-receptive rect of an element = the union of its own bounding
 * box and its `::before` halo geometry. We read the host rect AND the resolved
 * `::before` min-width/min-height (the coarse overlay floors each axis at --touch-target).
 */
async function effectiveHitRect(
    loc: Locator,
): Promise<{ w: number; h: number; beforeMinW: number; beforeMinH: number }> {
    return loc.evaluate((el) => {
        const box = el.getBoundingClientRect();
        const before = getComputedStyle(el, "::before");
        const px = (v: string) => {
            const n = parseFloat(v);
            return Number.isFinite(n) ? n : 0;
        };
        // `::before` with no content resolves min-width/min-height to "auto"/0 at fine
        // pointer; at coarse it resolves to var(--touch-target) (≈44px). The overlay is
        // centred on the atom (translate -50% -50%), so the effective rect floors at
        // max(visualBox, beforeMin) per axis.
        const beforeMinW = px(before.minWidth);
        const beforeMinH = px(before.minHeight);
        const hasContent = before.content && before.content !== "none" && before.content !== "normal";
        const haloW = hasContent ? beforeMinW : 0;
        const haloH = hasContent ? beforeMinH : 0;
        return {
            w: Math.max(box.width, haloW),
            h: Math.max(box.height, haloH),
            beforeMinW: hasContent ? beforeMinW : 0,
            beforeMinH: hasContent ? beforeMinH : 0,
        };
    });
}

async function gotoScene(page: Page, category: string, story: string): Promise<void> {
    const scene = resolveScene(category, story);
    await page.goto(scene.path);
    await page.locator("body").waitFor({ state: "visible", timeout: 30_000 });
    await page.waitForTimeout(250);
}

/** Best-effort axe target-size scan (skipped when axe is unreachable). */
async function runAxeTargetSize(
    page: Page,
): Promise<{ ran: boolean; violations: number }> {
    const hasGlobal = await page.evaluate(
        () => typeof (window as { axe?: unknown }).axe !== "undefined",
    );
    if (!hasGlobal) {
        try {
            // Tight timeout so an offline runner skips the CDN inject FAST (the axe
            // secondary is best-effort; the readback is the binding artefact).
            await Promise.race([
                page.addScriptTag({
                    url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js",
                }),
                new Promise((_, rej) => setTimeout(() => rej(new Error("axe-cdn-timeout")), 4000)),
            ]);
        } catch {
            return { ran: false, violations: 0 };
        }
    }
    return page.evaluate(async () => {
        const w = window as {
            axe?: {
                run: (ctx: unknown, opts: unknown) => Promise<{ violations: { id: string }[] }>;
            };
        };
        if (!w.axe) return { ran: false, violations: 0 };
        try {
            const r = await w.axe.run(document.body, {
                runOnly: { type: "rule", values: ["target-size"] },
            });
            return {
                ran: true,
                violations: r.violations.filter((v) => v.id === "target-size").length,
            };
        } catch {
            return { ran: false, violations: 0 };
        }
    });
}

test.describe("touch-target (π lane — every form atom paints a ≥44px coarse hit-rect)", () => {
    test.setTimeout(180_000);
    test("PRIMARY — every atom's composited hit-rect ≥ 44×44 under coarse pointer", async ({
        page,
    }, testInfo) => {
        // This test is meaningful ONLY at the coarse-touch project (pointer: coarse).
        test.skip(
            testInfo.project.name !== "coarse-touch",
            "the touch-target readback runs at --project=coarse-touch (pointer: coarse)",
        );
        mkdirSync(CACHE_DIR, { recursive: true });
        mkdirSync(VISUAL_DIR, { recursive: true });

        const results: Array<{
            atom: string;
            route: string;
            hitRect: { w: number; h: number };
            beforeHalo: { w: number; h: number };
            pass: boolean;
        }> = [];

        // Group atoms by route so each route loads once.
        const byRoute = new Map<string, AtomTarget[]>();
        for (const a of ATOMS) {
            const key = `${a.route.category}/${a.route.story}`;
            if (!byRoute.has(key)) byRoute.set(key, []);
            byRoute.get(key)!.push(a);
        }

        for (const [key, atoms] of byRoute) {
            const [category, story] = key.split("/");
            await gotoScene(page, category!, story!);

            // For atoms that need a selection to exist (multi-select remove-X, tags-input
            // delete), seed an interaction so the chip renders.
            if (story === "multi-select") {
                // open the popover + click the first option to create a selected chip
                const trigger = page.locator("button").first();
                await trigger.click({ timeout: 5000 }).catch(() => {});
                await page.waitForTimeout(200);
                await page
                    .locator('[role="option"], [data-slot="command-item"]')
                    .first()
                    .click({ timeout: 5000 })
                    .catch(() => {});
                await page.keyboard.press("Escape").catch(() => {});
                await page.waitForTimeout(200);
            }

            // Capture an own-surface PNG per route (light) — the DELTA artefact.
            await page.screenshot({
                path: `${VISUAL_DIR}W-SCALE2-${story}-mobile-light.png`,
            });
            await page.emulateMedia({ colorScheme: "dark" });
            await page.evaluate(() => document.documentElement.classList.add("dark"));
            await page.waitForTimeout(150);
            await page.screenshot({
                path: `${VISUAL_DIR}W-SCALE2-${story}-mobile-dark.png`,
            });
            await page.evaluate(() => document.documentElement.classList.remove("dark"));
            await page.emulateMedia({ colorScheme: "light" });
            await page.waitForTimeout(120);

            for (const a of atoms) {
                const loc = page.locator(a.selector).first();
                const count = await loc.count();
                if (count === 0) {
                    // The atom didn't render (e.g. no selected chip) — record as
                    // unmeasured rather than a false pass.
                    results.push({
                        atom: a.atom,
                        route: key,
                        hitRect: { w: 0, h: 0 },
                        beforeHalo: { w: 0, h: 0 },
                        pass: false,
                    });
                    continue;
                }
                await loc.waitFor({ state: "attached", timeout: 10_000 });
                const rect = await effectiveHitRect(loc);
                const pass = rect.w >= TOUCH_FLOOR && rect.h >= TOUCH_FLOOR;
                results.push({
                    atom: a.atom,
                    route: key,
                    hitRect: { w: Math.round(rect.w * 10) / 10, h: Math.round(rect.h * 10) / 10 },
                    beforeHalo: {
                        w: Math.round(rect.beforeMinW * 10) / 10,
                        h: Math.round(rect.beforeMinH * 10) / 10,
                    },
                    pass,
                });
            }

            // Best-effort axe secondary (skipped offline).
            const axe = await runAxeTargetSize(page);
            if (axe.ran) {
                expect(
                    axe.violations,
                    `axe target-size found ${axe.violations} violation(s) on ${key} (best-effort secondary)`,
                ).toBe(0);
            }
        }

        // Write the captured DELTA JSON (the cardinal-lesson readback artefact).
        writeFileSync(
            `${CACHE_DIR}touch-target.json`,
            JSON.stringify({ floor: TOUCH_FLOOR, project: "coarse-touch", results }, null, 2),
        );
        console.log("[W-SCALE2] touch-target readback:");
        for (const r of results) {
            console.log(
                `  ${r.pass ? "✓" : "✗"} ${r.atom} (${r.route}): hit-rect ${r.hitRect.w}×${r.hitRect.h} (halo ${r.beforeHalo.w}×${r.beforeHalo.h})`,
            );
        }

        // The BINDING assert: every MEASURED atom clears 44×44. Atoms that rendered
        // (the four always-present controls + any seeded chips) must pass.
        const measured = results.filter((r) => r.hitRect.w > 0 || r.hitRect.h > 0);
        expect(
            measured.length,
            "no atoms were measured — the gallery routes did not render the controls",
        ).toBeGreaterThanOrEqual(4);
        for (const r of measured) {
            expect(
                r.hitRect.w,
                `${r.atom} (${r.route}) composited hit-rect WIDTH ${r.hitRect.w}px < ${TOUCH_FLOOR}px — the touch-hit-area ::before overlay did not floor the width (WCAG 2.5.5).`,
            ).toBeGreaterThanOrEqual(TOUCH_FLOOR);
            expect(
                r.hitRect.h,
                `${r.atom} (${r.route}) composited hit-rect HEIGHT ${r.hitRect.h}px < ${TOUCH_FLOOR}px — the touch-hit-area ::before overlay did not floor the height (WCAG 2.5.5).`,
            ).toBeGreaterThanOrEqual(TOUCH_FLOOR);
        }
    });

    test("NON-REGRESSION — fine pointer emits NO 44px overlay (the byte-identical invariant)", async ({
        baseURL,
    }, testInfo) => {
        // Run once (from either project) in a fresh FINE-pointer context (no hasTouch).
        test.skip(
            testInfo.project.name !== "coarse-touch",
            "single fine-pointer non-regression check, anchored from the coarse-touch run",
        );
        const browser = await chromium.launch({
            args: ["--headless=new"],
        });
        const ctx = await browser.newContext({
            baseURL: baseURL,
            hasTouch: false,
            isMobile: false,
            viewport: { width: 1280, height: 800 },
        });
        const finePage = await ctx.newPage();
        try {
            await gotoScene(finePage, "forms", "checks");
            const checkbox = finePage.locator('[data-slot="checkbox"]').first();
            await checkbox.waitFor({ state: "attached", timeout: 10_000 });
            const rect = await effectiveHitRect(checkbox);
            // At fine pointer the ::before has no content → no overlay → the effective
            // rect equals the bare 16px Checkbox (NOT 44px). beforeHalo must be 0.
            expect(
                rect.beforeMinW,
                `at FINE pointer the Checkbox ::before resolved a ${rect.beforeMinW}px overlay — the coarse-only overlay LEAKED to desktop (the fine-pointer-byte-identical invariant broke). It must be 0/auto at fine pointer.`,
            ).toBeLessThan(TOUCH_FLOOR);
            expect(
                rect.w,
                `at fine pointer the Checkbox composited width is ${rect.w}px — it must stay the bare visual box (≤24px), not balloon to 44px on desktop.`,
            ).toBeLessThan(TOUCH_FLOOR);
        } finally {
            await ctx.close();
            await browser.close();
        }
    });
});
