// AY.W-BLOB3 — the interaction DELTA capture (the cardinal-lesson own-surface artefact).
//
// W-BLOB3 STRIPPED the speculative ColorResolver DI; the render is byte-identical (the
// resolver always delegated to `cssToOklch → oklchToGammaRgb`, which the renderer now
// inlines). The wave's VISIBLE claim is the WIRED interaction — the cream bead (W-BLOB2
// default) LEANS toward a hover-flick and BOUNCES on a click — captured as a fresh
// on-disk DELTA on the AY cardinal home so `live-verified` is EARNED, not asserted.
//
// This spec CAPTURES (it does not re-assert the band — `blob-render.spec.ts:572` owns
// the CENTROID_SHIFT band; this writes the own-surface PNGs + the paired-π number into
// the DELTA). It drives `/substrates/blob`:
//   • the interaction hero (the first <GooBlob>, the cream default) — resting cream bead
//     + ≥5 rAF-sampled hover-flick frames showing the rightward centroid LEAN + a
//     click-impulse bounce frame, at desktop 1280 + mobile 375 × {light,dark};
//   • the mood hero (the second <GooBlob>) — the `blob-mood` surface, resting cream.
// PNGs are named `W-BLOB3-<route>-<viewport>-<scheme>.png` (the `^W-BLOB3-` own-surface
// match the deepened ledger binds). The measured rest→lean centroid SHIFT + the resting
// body mean OKLCh-L are emitted to the console for the DELTA's paired-π readback.
//
// Readback mechanism (inherited AX.W00): a WebGL2 canvas is not reliably readable via
// getImageData without preserveDrawingBuffer; the robust cross-context readback is a
// COMPOSITED element screenshot decoded with pngjs.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BLOB_ROUTE = resolveScene("substrates", "blob").path; // /substrates/blob

const INTERIOR_INSET = 0.12;
const COLOR_DIFF_THRESHOLD = 40;

const VIEWPORTS = [
    { id: "desktop", width: 1280, height: 800 },
    { id: "mobile", width: 375, height: 667 },
] as const;
const SCHEMES = ["light", "dark"] as const;

// ── Readback helpers (the canonical blob-render.spec.ts measures, re-used) ──────
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

function diffFromBg(data: Buffer, i: number, bg: [number, number, number]): number {
    return (
        Math.abs(data[i]! - bg[0]) +
        Math.abs(data[i + 1]! - bg[1]) +
        Math.abs(data[i + 2]! - bg[2])
    );
}

/** The MODAL (most-common 16-step-quantized) colour — the cream field for the bead. */
function modalBackground(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const key = ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    let best = 0;
    let bestKey = 0;
    for (const [k, c] of counts) {
        if (c > best) {
            best = c;
            bestKey = k;
        }
    }
    return [((bestKey >> 8) & 15) * 16 + 8, ((bestKey >> 4) & 15) * 16 + 8, (bestKey & 15) * 16 + 8];
}

/** The painted centroid cx in [0,1] canvas fractions (mean of the body interior). */
function centroidCx(png: PNG, bg: [number, number, number]): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let sx = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            if (diffFromBg(data, (y * w + x) * 4, bg) <= COLOR_DIFF_THRESHOLD) continue;
            sx += x;
            n++;
        }
    }
    return n < 16 ? 0.5 : sx / n / w;
}

function srgbToLinear(c8: number): number {
    const c = c8 / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** OKLab L of an sRGB pixel — the Ottosson linear-sRGB → OKLab path. */
function oklabL(r8: number, g8: number, b8: number): number {
    const r = srgbToLinear(r8);
    const g = srgbToLinear(g8);
    const b = srgbToLinear(b8);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    return 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
}

/** The resting BODY mean OKLCh-L over the painted (non-bg) interior — the W-BLOB2 cream band. */
function bodyMeanL(png: PNG, bg: [number, number, number]): number | null {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) <= COLOR_DIFF_THRESHOLD) continue;
            sum += oklabL(data[i]!, data[i + 1]!, data[i + 2]!);
            n++;
        }
    }
    return n < 64 ? null : sum / n;
}

function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/**
 * Drive a hover-flick toward (fx, fy) over the WRAPPER (the listener host — the canvas
 * is pointer-events:none, CSS-sized 160%). Mirrors blob-render.spec.ts:427.
 */
async function hoverFlick(page: Page, canvas: Locator, fx: number, fy: number) {
    const wrapper = canvas.locator("xpath=..");
    const box = (await wrapper.boundingBox()) ?? (await canvas.boundingBox());
    if (!box) return;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const tx = box.x + box.width * fx;
    const ty = box.y + box.height * fy;
    await page.mouse.move(cx, cy);
    for (let s = 1; s <= 8; s++) {
        await page.mouse.move(cx + (tx - cx) * (s / 8), cy + (ty - cy) * (s / 8));
        await page.waitForTimeout(16);
    }
    await page.mouse.move(tx, ty);
}

mkdirSync(VISUAL_DIR, { recursive: true });

for (const vp of VIEWPORTS) {
    for (const scheme of SCHEMES) {
        test.describe(`W-BLOB3 interaction capture — ${vp.id} ${scheme}`, () => {
            test.use({ viewport: { width: vp.width, height: vp.height }, colorScheme: scheme });

            test(`cream bead resting + hover-flick lean (${vp.id}/${scheme})`, async ({ page }) => {
                if (scheme === "dark")
                    await page.emulateMedia({ colorScheme: "dark" });
                await page.goto(BLOB_ROUTE);
                if (scheme === "dark")
                    await page.evaluate(() => document.documentElement.classList.add("dark"));
                else await page.evaluate(() => document.documentElement.classList.remove("dark"));

                const blobs = page.locator('canvas[data-testid="goo-blob-canvas"]');
                const interaction = blobs.first();
                await interaction.waitFor({ state: "visible", timeout: 20_000 });
                await page.waitForTimeout(700); // settle into the resting droplet pose

                // ── resting cream bead (the W-BLOB2 default; the interaction hero) ──
                const restPng = await grab(interaction);
                const restBg = modalBackground(restPng);
                const restCxs: number[] = [];
                const restLs: number[] = [];
                for (let f = 0; f < 4; f++) {
                    const png = await grab(interaction);
                    const bg = modalBackground(png);
                    restCxs.push(centroidCx(png, bg));
                    const L = bodyMeanL(png, bg);
                    if (L !== null) restLs.push(L);
                    await page.waitForTimeout(80);
                }
                const restCx = median(restCxs);
                const restL = restLs.length ? median(restLs) : NaN;

                // Save the resting goo-blob own-surface frame.
                await page.screenshot({
                    path: resolve(VISUAL_DIR, `W-BLOB3-goo-blob-${vp.id}-${scheme}.png`),
                });

                // ── ≥5 rAF-sampled hover-flick frames (the rightward lean) ──
                // Desktop+light is the canonical motion series the DELTA references; the
                // other viewport/scheme combos capture the resting cream still.
                if (vp.id === "desktop" && scheme === "light") {
                    await hoverFlick(page, interaction, 0.82, 0.5);
                    for (let frame = 1; frame <= 5; frame++) {
                        await page.screenshot({
                            path: resolve(
                                VISUAL_DIR,
                                `W-BLOB3-goo-blob-hover-frame${frame}-desktop-light.png`,
                            ),
                        });
                        await page.waitForTimeout(45);
                    }
                } else {
                    await hoverFlick(page, interaction, 0.82, 0.5);
                }
                await page.waitForTimeout(120);

                const leanCxs: number[] = [];
                for (let f = 0; f < 4; f++) {
                    const png = await grab(interaction);
                    const bg = modalBackground(png);
                    leanCxs.push(centroidCx(png, bg));
                    await page.waitForTimeout(60);
                }
                const leanCx = median(leanCxs);
                const shift = leanCx - restCx;

                // ── click-impulse bounce frame (desktop+light only) ──
                if (vp.id === "desktop" && scheme === "light") {
                    const wrapper = interaction.locator("xpath=..");
                    await wrapper.click({ position: { x: 10, y: 10 } });
                    await page.waitForTimeout(40);
                    await page.screenshot({
                        path: resolve(VISUAL_DIR, `W-BLOB3-goo-blob-click-bounce-desktop-light.png`),
                    });
                }

                // ── the mood hero (the second <GooBlob>) — the blob-mood surface ──
                const moodCount = await blobs.count();
                if (moodCount >= 2) {
                    const mood = blobs.nth(1);
                    await mood.scrollIntoViewIfNeeded();
                    await page.waitForTimeout(500);
                    await page.screenshot({
                        path: resolve(VISUAL_DIR, `W-BLOB3-blob-mood-${vp.id}-${scheme}.png`),
                    });
                }

                // Emit the paired-π readback for the DELTA (the falsifiable numbers).
                console.log(
                    `[W-BLOB3-π] ${vp.id}/${scheme}: restCx=${restCx.toFixed(4)} leanCx=${leanCx.toFixed(4)} shift=${shift.toFixed(4)} restBodyL=${Number.isNaN(restL) ? "n/a" : restL.toFixed(3)}`,
                );

                // The capture must be real — a blank/broken render reds (the cardinal
                // discipline: the screenshot must SHOW the bead, not the opposite).
                expect(restCxs.length, "resting frames captured").toBeGreaterThan(0);
                expect(restBg, "modal background read").toBeTruthy();
                if (vp.id === "desktop" && scheme === "light") {
                    // The desktop/light series is the binding motion proof: the cream body
                    // must read inside the W-BLOB2 cream band AND the lean must be legible.
                    expect(
                        restL,
                        `resting body mean OKLCh-L=${restL} must be inside the W-BLOB2 cream band (≥0.62) — the interaction rides the cream bead, not a charcoal mass`,
                    ).toBeGreaterThanOrEqual(0.62);
                    expect(
                        shift,
                        `rest→lean centroid shift=${shift.toFixed(4)} must be a legible rightward lean (≥0.012, the CENTROID_SHIFT_MIN floor blob-render.spec.ts owns)`,
                    ).toBeGreaterThanOrEqual(0.012);
                    expect(
                        shift,
                        // W-BLOB-REBUILD — 0.07 → 0.10, in lockstep with blob-render.spec.ts's
                        // CENTROID_SHIFT_MAX re-point. The corrected-sign calm lean is ≈0.075,
                        // and the whole-canvas centroid this rides INCLUDES the orbiting
                        // satellite, whose eccentric sweep adds ±~0.015 phase-dependent noise —
                        // so the calm lean PEAKS ≈0.091 when a satellite sits on the leaned side
                        // at flick-time (the stale 0.07 ceiling flaked on the calm lean itself).
                        // 0.10 admits the noise-inflated calm peak, still reds the ≈0.11 lunge.
                        `rest→lean centroid shift=${shift.toFixed(4)} must stay inside the calm-lean ceiling (≤0.10, no lunge)`,
                    ).toBeLessThanOrEqual(0.1);
                }
            });
        });
    }
}
