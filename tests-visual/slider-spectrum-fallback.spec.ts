// AY.W-SLD1 — the slider design-resolution π render arm (single-engine,
// engine-aware), mirroring `squircle-language.spec.ts`.
//
// Two surfaces, ONE engine (chromium-headless-new — the ONLY project in
// playwright.config.ts; webkit/firefox projects do NOT exist):
//
//   (A) STANDARD round knob — the user-judged resolution (b) revert+invert-gate.
//       Reads back the standard `.slider-thumb` computed `border-radius` and
//       asserts it resolves a TRUE CIRCLE (50% → an equal px on a square box).
//       Screenshots the standard knob into W-SLD1-standard-resolved-{scheme}.png.
//
//   (B) SPECTRUM squircle fidelity — the D2 round-fallback fix. The contract is
//       ENGINE-AWARE: on a SUPPORTING engine (CSS.supports('corner-shape',
//       'superellipse(2)')) the computed `corner-shape` MUST resolve a
//       superellipse(2); AND — read UNCONDITIONALLY, since the round
//       `border-radius` is the BASE declaration the @supports block only REFINES
//       — the computed `border-radius` MUST be a GENEROUS fraction of the box
//       (≥ 0.55× the thumb width — the squircle-adjacent floor, NOT the old 10px
//       `--radius-lg` rounded-rect). The border-radius value is the cross-engine
//       fallback truth EVEN on a supporting engine: it reads the fallback
//       contract without a fallback engine. Screenshots the spectrum thumb into
//       W-SLD1-spectrum-{scheme}.png.

import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

// The library root is one dir up from tests-visual (the workspace); the visual
// audit dir is rooted there so the captures land beside the DELTA, not under
// tests-visual/ (the playwright cwd a bare relative path would resolve against).
const LIBRARY_ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${LIBRARY_ROOT}docs/tranches/AY/audit/visual`;
const SLIDER = resolveScene("forms", "slider");

const SUPERELLIPSE_RE = /superellipse\(\s*2\s*\)|squircle/;

// Parse a computed `border-radius` (e.g. "11.2px" or "11.2px 11.2px ...") to its
// first px value.
function firstPx(value: string): number {
    const m = value.match(/([\d.]+)px/);
    return m ? Number.parseFloat(m[1]!) : Number.NaN;
}

// Resolve a per-corner `border-radius` to its effective px radius on a box of
// width `w`. A `50%` round knob keeps the percentage form in the computed style
// (Chromium does not normalize a symmetric % to px for the per-corner longhand),
// so a `<n>%` resolves to `n% × w`. A px form resolves directly.
function radiusPx(value: string, w: number): number {
    const pct = value.match(/([\d.]+)%/);
    if (pct) return (Number.parseFloat(pct[1]!) / 100) * w;
    return firstPx(value);
}

for (const scheme of ["light", "dark"] as const) {
    test.describe(`slider design resolution (π lane — ${scheme})`, () => {
        test(`standard knob is a TRUE CIRCLE + spectrum fallback reads squircle-adjacent (${scheme})`, async ({
            page,
        }) => {
            await page.emulateMedia({ colorScheme: scheme });
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(SLIDER.path, { waitUntil: "networkidle" });
            // The demo toggles `.dark` on <html> via the color-scheme; force it so
            // the captured PNG reads the dark token cascade (not just UA scheme).
            await page.evaluate((s) => {
                document.documentElement.classList.toggle("dark", s === "dark");
            }, scheme);
            await page.waitForSelector(".glass-slider .slider-thumb", { timeout: 5000 });
            await page.waitForTimeout(300);

            const probe = await page.evaluate(() => {
                const supports =
                    typeof CSS !== "undefined" &&
                    typeof CSS.supports === "function" &&
                    CSS.supports("corner-shape", "superellipse(2)");

                // (A) STANDARD knob — the first non-spectrum slider's thumb.
                const stdRoot = document.querySelector<HTMLElement>(
                    '.glass-slider:not([data-variant="spectrum"])',
                );
                const stdThumb = stdRoot?.querySelector<HTMLElement>(".slider-thumb") ?? null;
                const stdCS = stdThumb ? getComputedStyle(stdThumb) : null;
                const stdRect = stdThumb?.getBoundingClientRect() ?? null;

                // (B) SPECTRUM thumb.
                const specRoot = document.querySelector<HTMLElement>(
                    '.glass-slider[data-variant="spectrum"]',
                );
                const specThumb = specRoot?.querySelector<HTMLElement>(".slider-thumb") ?? null;
                const specCS = specThumb
                    ? (getComputedStyle(specThumb) as CSSStyleDeclaration & {
                          cornerShape?: string;
                      })
                    : null;
                const specRect = specThumb?.getBoundingClientRect() ?? null;

                return {
                    supports,
                    std: stdThumb
                        ? {
                              borderRadius: stdCS!.borderRadius,
                              borderTopLeftRadius: stdCS!.borderTopLeftRadius,
                              width: stdRect!.width,
                              height: stdRect!.height,
                          }
                        : null,
                    spectrum: specThumb
                        ? {
                              borderRadius: specCS!.borderRadius,
                              borderTopLeftRadius: specCS!.borderTopLeftRadius,
                              cornerShape:
                                  specCS!.cornerShape ??
                                  specCS!.getPropertyValue("corner-shape") ??
                                  "",
                              width: specRect!.width,
                              height: specRect!.height,
                          }
                        : null,
                };
            });

            // ── (A) STANDARD round knob — the user-judged resolution (b) ──
            expect(probe.std, "no standard .slider-thumb on the forms/slider route").not.toBeNull();
            const std = probe.std!;
            // A 50% radius on a square box resolves to ≈ half the box. The knob
            // is a TRUE CIRCLE: the resolved radius is ≥ ~45% of the box (50%
            // minus sub-px rounding), NOT a slim pill-cap fraction. The computed
            // value may be a `%` (the circle keeps the percentage form) or px.
            const stdRadiusPx = radiusPx(std.borderTopLeftRadius, std.width);
            expect(
                stdRadiusPx,
                `standard knob border-radius "${std.borderTopLeftRadius}" must resolve a circle (≥45% of the ${std.width}px box); got ${stdRadiusPx}px`,
            ).toBeGreaterThanOrEqual(std.width * 0.45);
            // Square footprint (the 50% paints a circle, not an ellipse): width ≈ height.
            expect(
                Math.abs(std.width - std.height),
                `standard knob must be square (1:1) so the 50% radius is a circle; got ${std.width}×${std.height}`,
            ).toBeLessThanOrEqual(1.5);

            // ── (B) SPECTRUM squircle fidelity — engine-aware ──
            expect(probe.spectrum, "no spectrum .slider-thumb on the forms/slider route").not.toBeNull();
            const spec = probe.spectrum!;
            if (probe.supports) {
                // SUPPORTING engine (chromium-headless-new is Chrome-139+) → the
                // squircle PE tier paints.
                expect(
                    SUPERELLIPSE_RE.test(spec.cornerShape),
                    `spectrum corner-shape should resolve superellipse(2) on a supporting engine; got "${spec.cornerShape}"`,
                ).toBe(true);
            }
            // UNCONDITIONAL — the round border-radius is the cross-engine fallback
            // truth even on a supporting engine. It must be a GENEROUS fraction of
            // the box (≥ 0.55× the thumb WIDTH — the squircle-adjacent floor, NOT
            // the old 10px --radius-lg rounded rect).
            const specRadiusPx = radiusPx(spec.borderTopLeftRadius, spec.width);
            const floor = spec.width * 0.55;
            expect(
                specRadiusPx,
                `spectrum fallback border-radius "${spec.borderTopLeftRadius}" must be ≥ 0.55× the ${spec.width.toFixed(1)}px box width (${floor.toFixed(1)}px) to read squircle-adjacent — the old 10px --radius-lg rounded-rect must be gone; got ${specRadiusPx}px`,
            ).toBeGreaterThanOrEqual(floor);
            // And materially above the old 10px --radius-lg value (the bite).
            expect(
                specRadiusPx,
                `spectrum fallback border-radius must exceed the old 10px --radius-lg; got ${specRadiusPx}px`,
            ).toBeGreaterThan(10);

            // ── Capture the own-surface PNGs (the ledger evidence) ──
            // RG3-A — a PADDED clip off the section boundingBox so the FULL knob
            // silhouette shows (the prior leaf-section screenshot AMPUTATED the
            // lower third of the floating knob; now the knob is inscribed in the
            // thick cylinder, but the padded clip guarantees the full capsule).
            const stdSection = page
                .locator("section:not(:has(section))", {
                    has: page.locator(".section-label", { hasText: /^standard$/ }),
                })
                .first();
            await stdSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(120);
            const stdBox = (await stdSection.boundingBox())!;
            await page.screenshot({
                path: `${OUT}/W-SLD1-standard-resolved-${scheme}.png`,
                clip: {
                    x: Math.max(0, stdBox.x - 12),
                    y: Math.max(0, stdBox.y - 12),
                    width: stdBox.width + 24,
                    height: stdBox.height + 24,
                },
            });
            const specSection = page
                .locator("section:not(:has(section))", {
                    has: page.locator(".section-label", {
                        hasText: /spectrum variant/,
                    }),
                })
                .first();
            await specSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(120);
            const specBox = (await specSection.boundingBox())!;
            await page.screenshot({
                path: `${OUT}/W-SLD1-spectrum-${scheme}.png`,
                clip: {
                    x: Math.max(0, specBox.x - 12),
                    y: Math.max(0, specBox.y - 12),
                    width: specBox.width + 24,
                    height: specBox.height + 24,
                },
            });

            // Surface the numbers for the DELTA paired-π readback.
            console.log(
                `[W-SLD1 ${scheme}] supports=${probe.supports} | std knob: ${std.width}×${std.height} r=${std.borderTopLeftRadius} (${stdRadiusPx}px ≥ ${(std.width * 0.45).toFixed(1)}px) | spectrum: ${spec.width.toFixed(1)}×${spec.height.toFixed(1)} r=${spec.borderTopLeftRadius} (${specRadiusPx}px ≥ floor ${floor.toFixed(1)}px) corner-shape="${spec.cornerShape}"`,
            );
        });
    });
}
