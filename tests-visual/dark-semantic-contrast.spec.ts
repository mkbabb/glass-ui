// AX.W44 — proof:dark-semantic-contrast (Arm B), the fail-CLOSED π live/render arm.
//
// Arm A (proof-dark-semantic-contrast.mjs) PARSES tokens.css and computes the dark
// `--destructive` contrast from SOURCE. This spec proves the RENDER: it mounts the
// demo Feedback/Alert route, toggles `.dark` on <html>, finds the destructive Alert's
// title ("Session expired"), reads back its RESOLVED `color` and the card's resolved
// `background-color` off the LIVE painted DOM, recomputes the WCAG 2.1 ratio in-test,
// and asserts ≥4.6:1 — the SAME number Arm A computes from source, now read off the
// real paint (closing the source↔render gap: a token that parses fine but is shadowed
// by a `.dark` override would be caught here).
//
// THE BINDING ASSERTION IS THE getComputedStyle WCAG RECOMPUTE (axe-independent).
// axe-core is NOT a workspace dependency (the library publish surface is zero-dep, and
// tests-visual carries only Playwright + pngjs). The spec runs an axe `color-contrast`
// scan as a BEST-EFFORT secondary ONLY when an axe build is reachable (a global
// `window.axe` or a CDN inject succeeds); when it is not, the deterministic readback
// recompute is the close criterion (the wave's "deterministic secondary,
// axe-independent" — promoted here to primary, since it needs no external dep). This is
// fail-CLOSED on the readback: an illegible dark `--destructive` reds the recompute.
//
// At ≥2 viewports (375×667, 1280×800) under `.dark`, plus a light cross-check that the
// unchanged light arm still passes.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The WCAG ink floor (Arm A's INK_FLOOR; the 4.5 body floor + headroom).
const INK_FLOOR = 4.6;

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

/**
 * Parse a computed-style color into [r,g,b,a] (rgb 0..255, alpha 0..1). Handles BOTH
 * the `rgb()`/`rgba()` form AND the `color(srgb r g b / a)` form (Chrome serializes a
 * translucent glass-wash `color()` token in the srgb space, channels 0..1).
 */
function parseColor(str: string): [number, number, number, number] | null {
    if (!str) return null;
    const srgb = str.match(
        /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i,
    );
    if (srgb) {
        return [
            Math.round(Number(srgb[1]) * 255),
            Math.round(Number(srgb[2]) * 255),
            Math.round(Number(srgb[3]) * 255),
            srgb[4] === undefined ? 1 : Number(srgb[4]),
        ];
    }
    const rgb = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgb) {
        return [
            Number(rgb[1]),
            Number(rgb[2]),
            Number(rgb[3]),
            rgb[4] === undefined ? 1 : Number(rgb[4]),
        ];
    }
    return null;
}

/** Alpha-composite `over` (with its alpha) onto opaque `base` — the source-over rule. */
function composite(
    over: [number, number, number, number],
    base: [number, number, number],
): [number, number, number] {
    const a = over[3];
    return [
        Math.round(over[0] * a + base[0] * (1 - a)),
        Math.round(over[1] * a + base[1] * (1 - a)),
        Math.round(over[2] * a + base[2] * (1 - a)),
    ];
}

/**
 * Composite the readback's translucent `layers` (top-to-bottom) over the opaque `base`
 * into the EFFECTIVE opaque background the title is read against. Returns null if the
 * base cannot be parsed.
 */
function effectiveBackground(
    layers: string[],
    base: string,
): [number, number, number] | null {
    const baseRgba = parseColor(base);
    if (!baseRgba) return null;
    let out: [number, number, number] = [baseRgba[0], baseRgba[1], baseRgba[2]];
    // layers[0] is closest to the title (topmost), so composite from the bottom up.
    for (let i = layers.length - 1; i >= 0; i--) {
        const layer = parseColor(layers[i]!);
        if (layer) out = composite(layer, out);
    }
    return out;
}

/** sRGB channel [0..255] → linear-light (WCAG 2.1 linearization). */
function linearize(c: number): number {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance. */
function relLuminance([r, g, b]: [number, number, number]): number {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio between two rgb triples. */
function contrastRatio(
    a: [number, number, number],
    b: [number, number, number],
): number {
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}

/** Toggle the `.dark` class on <html> (the demo's global dark switch). */
async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    // let the token cascade re-resolve + the glass backdrop settle
    await page.waitForTimeout(200);
}

/**
 * Read the destructive Alert title's resolved `color` and the STACK of background
 * layers behind it. The W54 glass-first Alert paints a translucent glass-WASH surface
 * (`--glass-bg-wash`, a `color(srgb …/0.38)`), NOT an opaque `bg-card` plate — so the
 * effective background the eye reads the title against is the wash composited over the
 * opaque page/card beneath. We return the title color + every backgroundColor from the
 * title up to (and including) the first fully-opaque ancestor; the test composites
 * them top-to-bottom into the true effective background.
 */
async function readAlertContrast(page: Page) {
    return page.evaluate(() => {
        // The destructive Alert title carries `data-slot="alert-title"` + the
        // `text-destructive` ink. Prefer the "Session expired" destructive title.
        const titles = Array.from(
            document.querySelectorAll<HTMLElement>('[data-slot="alert-title"]'),
        );
        const title =
            titles.find((t) => /session expired/i.test(t.textContent ?? "")) ??
            titles[0] ??
            null;
        if (!title) return { found: false } as const;

        const color = getComputedStyle(title).color;

        // Collect every painted background layer from the title up to the first
        // fully-opaque ancestor (the page/card under the glass wash). A
        // `transparent`/zero-alpha layer is skipped; a translucent wash is KEPT (it
        // tints the composite); an opaque layer terminates the walk.
        const isTransparent = (bg: string) =>
            !bg ||
            bg === "transparent" ||
            /rgba?\([^)]*,\s*0(\.0+)?\s*\)/.test(bg) ||
            /\/\s*0(\.0+)?\s*\)/.test(bg);
        const isFullyOpaque = (bg: string) =>
            !isTransparent(bg) &&
            !/rgba?\([^)]*,\s*0?\.\d+\s*\)/.test(bg) &&
            !/\/\s*0?\.\d+\s*\)/.test(bg);

        const layers: string[] = [];
        let el: HTMLElement | null = title;
        let base = "";
        while (el) {
            const bg = getComputedStyle(el).backgroundColor;
            if (!isTransparent(bg)) {
                if (isFullyOpaque(bg)) {
                    base = bg;
                    break;
                }
                layers.push(bg); // translucent layer — tints the composite
            }
            el = el.parentElement;
        }
        if (!base) {
            base =
                getComputedStyle(document.body).backgroundColor ||
                getComputedStyle(document.documentElement).backgroundColor;
        }

        return { found: true, color, layers, base } as const;
    });
}

test.describe("dark-semantic-contrast (π lane — the dark --destructive ink readback, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        test(`destructive Alert title clears the ${INK_FLOOR}:1 ink floor under .dark @ ${vp.name}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto(PI_TARGETS.feedbackAlert.path, {
                waitUntil: "networkidle",
            });
            await page.waitForSelector('[data-slot="alert-title"]', {
                timeout: 8000,
            });

            // ── DARK arm — the binding assertion ──────────────────────────────────
            await setDark(page, true);
            const dark = await readAlertContrast(page);
            expect(dark.found, "no destructive Alert title on the Feedback route").toBe(
                true,
            );
            if (!dark.found) return;

            const inkColor = parseColor(dark.color);
            const bgRgb = effectiveBackground(dark.layers, dark.base);
            expect(
                inkColor,
                `could not parse the dark Alert-title color "${dark.color}"`,
            ).not.toBeNull();
            expect(
                bgRgb,
                `could not resolve the dark Alert effective background (layers ${JSON.stringify(dark.layers)} over base "${dark.base}")`,
            ).not.toBeNull();

            const inkRgb: [number, number, number] = [
                inkColor![0],
                inkColor![1],
                inkColor![2],
            ];
            const ratio = contrastRatio(inkRgb, bgRgb!);
            // This is the SAME ~4.60 Arm A computes from source — now off the live paint,
            // with the W54 glass-wash composited over the opaque page/card beneath.
            expect(
                ratio,
                `the LIVE dark destructive Alert title is ${ratio.toFixed(2)}:1 over its effective surface (color ${dark.color}; layers ${JSON.stringify(dark.layers)} over ${dark.base}) — under the ${INK_FLOOR}:1 ink floor (the illegible "Session expired" Alert). At HEAD this reads ~1.75; after the W44 lift it clears ${INK_FLOOR}.`,
            ).toBeGreaterThanOrEqual(INK_FLOOR);

            // ── BEST-EFFORT axe color-contrast secondary (skipped if axe absent) ──
            const axe = await runAxeColorContrast(page).catch(() => null);
            if (axe && axe.ran) {
                expect(
                    axe.violations,
                    `axe color-contrast flagged ${axe.violations} violation(s) on the dark destructive Alert`,
                ).toBe(0);
            }

            // ── LIGHT cross-check — the unchanged light arm still passes ───────────
            await setDark(page, false);
            const light = await readAlertContrast(page);
            const lInk = light.found ? parseColor(light.color) : null;
            const lBg = light.found
                ? effectiveBackground(light.layers, light.base)
                : null;
            if (lInk && lBg) {
                const lRatio = contrastRatio([lInk[0], lInk[1], lInk[2]], lBg);
                expect(
                    lRatio,
                    `the LIGHT destructive Alert title regressed to ${lRatio.toFixed(2)}:1 — the light arm must stay UNCHANGED (≥${INK_FLOOR}, ~4.70 at HEAD)`,
                ).toBeGreaterThanOrEqual(INK_FLOOR);
            }
        });
    }
});

/**
 * Best-effort axe-core `color-contrast` scan scoped to the destructive Alert. Returns
 * `{ ran:false }` when no axe build is reachable (the workspace carries no axe dep;
 * the getComputedStyle recompute above is the binding, axe-independent close). Tries a
 * pre-injected `window.axe` first, then a CDN inject (network-gated — silently no-ops
 * offline).
 */
async function runAxeColorContrast(
    page: Page,
): Promise<{ ran: boolean; violations: number }> {
    const hasGlobal = await page.evaluate(
        () => typeof (window as { axe?: unknown }).axe !== "undefined",
    );
    if (!hasGlobal) {
        try {
            await page.addScriptTag({
                url: "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js",
            });
        } catch {
            return { ran: false, violations: 0 };
        }
    }
    const result = await page.evaluate(async () => {
        const w = window as {
            axe?: {
                run: (
                    ctx: unknown,
                    opts: unknown,
                ) => Promise<{ violations: { id: string }[] }>;
            };
        };
        if (!w.axe) return { ran: false, violations: 0 };
        const alert =
            document.querySelector('[role="alert"]') ??
            document.querySelector('[data-slot="alert-title"]')?.closest("div") ??
            document.body;
        const r = await w.axe.run(alert, {
            runOnly: { type: "rule", values: ["color-contrast"] },
        });
        return {
            ran: true,
            violations: r.violations.filter((v) => v.id === "color-contrast").length,
        };
    });
    return result;
}
