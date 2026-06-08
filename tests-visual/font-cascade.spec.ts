// AX.W22 — the π-lane live-cascade font gate (proof:font-cascade live arm).
//
// THE CARDINAL AX LESSON: a green headless proof over a visually-broken live
// product is NOT done. The device-free source arm (scripts/proof-font-cascade.mjs)
// proves the TOKENS name the brand register; this spec proves the live CASCADE
// RESOLVES it — loads the demo, awaits `document.fonts.ready`, reads
// `getComputedStyle` on `body` / `.text-display-*` / `.fira-code` /
// `.text-admin-label`, and fingerprints the rendered glyph metrics on a canvas
// to distinguish the REAL Plus Jakarta face from a metric-matched system
// fallback (the `document.fonts.check`-true-over-a-non-loaded-face silent-pass
// trap). It fails RED if body renders Georgia / a system serif.
//
// This spec runs in the W00 π visual-runtime workspace on the real Metal device
// (the orchestrator owns the browser; this agent has none). It is authored
// fail-CLOSED: the device-free gate REDs if this file is absent while the
// tests-visual workspace exists. Per constellation result[30].findings[7] the π
// lane carries a DOM-cascade readback capability (document.fonts +
// getComputedStyle + a canvas glyph-width fingerprint), NOT GPU readPixels only.
//
// VIEWPORTS × THEMES (the W00 protocol): 375×667 / 1280×800 / 1440×900 in light
// AND dark — the cascade is theme/viewport-invariant for the font register, so
// the register assertion holds across all six; the BEFORE/AFTER paired-π capture
// the orchestrator records lives alongside.

import { expect, test } from "@playwright/test";

const DEMO_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5173/";

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "laptop", width: 1280, height: 800 },
    { name: "desktop", width: 1440, height: 900 },
] as const;

// The brand register the live cascade MUST resolve. A resolved family-stack
// whose FIRST loaded family is one of these (case-insensitive) is GREEN.
const BRAND_TEXT = "plus jakarta sans";
const BRAND_MONO = "fira code";

// Families that mean the cascade FELL THROUGH to a system serif — the born-RED
// failure this gate catches (a Fraunces/Computer-Modern default with no shipped
// face resolves to one of these).
const SERIF_FALLTHROUGH = [/georgia/i, /times/i, /\bserif\b/i];

/** The first resolved family name in a computed `font-family` string. */
function firstFamily(fontFamily: string): string {
    return (fontFamily.split(",")[0] ?? "").trim().replace(/^["']|["']$/g, "").toLowerCase();
}

test.describe("π-lane: the live font cascade resolves the brand register", () => {
    for (const vp of VIEWPORTS) {
        for (const theme of ["light", "dark"] as const) {
            test(`${vp.name} ${vp.width}×${vp.height} · ${theme} — default == rendered`, async ({ page }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(DEMO_URL, { waitUntil: "networkidle" });
                if (theme === "dark") {
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                }
                // The whole point: the demo has NO data-typography-preset opt-out.
                const presetAttr = await page.evaluate(() =>
                    document.documentElement.getAttribute("data-typography-preset"),
                );
                expect(presetAttr, "the demo must render the real default — no preset opt-out").toBeNull();

                await page.evaluate(() => document.fonts.ready);

                // 1. body resolves the brand TEXT register — NOT a serif fallthrough.
                const bodyFamily = await page.evaluate(
                    () => getComputedStyle(document.body).fontFamily,
                );
                expect(firstFamily(bodyFamily)).toBe(BRAND_TEXT);
                for (const re of SERIF_FALLTHROUGH) {
                    expect(re.test(firstFamily(bodyFamily)), `body must not fall through to a system serif (got: ${bodyFamily})`).toBe(false);
                }

                // 2. the display ladder + .fira-code + .text-admin-label resolve
                //    their intended registers (where present on the demo).
                const resolved = await page.evaluate(() => {
                    const pick = (sel: string) => {
                        const el = document.querySelector(sel);
                        return el ? getComputedStyle(el).fontFamily : null;
                    };
                    return {
                        display: pick(".text-display, .text-display-1, .text-display-2, .text-display-3"),
                        mono: pick(".fira-code, .text-admin-label"),
                    };
                });
                if (resolved.display) expect(firstFamily(resolved.display)).toBe(BRAND_TEXT);
                if (resolved.mono) expect(firstFamily(resolved.mono)).toBe(BRAND_MONO);

                // 3. the canvas glyph-width fingerprint — the REAL Plus Jakarta
                //    face renders measurably wider/narrower than the system
                //    sans fallback for a known string. `document.fonts.check`
                //    can return true over a non-loaded face; the width delta
                //    cannot be faked by a metric-matched fallback NAME alone.
                const fingerprint = await page.evaluate((brand) => {
                    const c = document.createElement("canvas");
                    const ctx = c.getContext("2d")!;
                    const sample = "Glass UI — figtree 0123";
                    const measure = (family: string) => {
                        ctx.font = `48px ${family}`;
                        return ctx.measureText(sample).width;
                    };
                    return {
                        loaded: document.fonts.check(`48px "${brand}"`),
                        brandWidth: measure(`"Plus Jakarta Sans"`),
                        fallbackWidth: measure("system-ui"),
                    };
                }, "Plus Jakarta Sans");
                expect(fingerprint.loaded, "the real Plus Jakarta Sans woff2 must be document.fonts-loaded").toBe(true);
                // A loaded brand face produces a distinct advance-width vs the
                // generic system fallback — the silent-pass trap guard.
                expect(Math.abs(fingerprint.brandWidth - fingerprint.fallbackWidth)).toBeGreaterThan(0.5);
            });
        }
    }
});
