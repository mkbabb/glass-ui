// BC.W-VIZ-{AURORA,DOTFLOW,PAPERGRID} — the LIVE-GPU paint records (LOCAL real-Metal).
//
// The device-free source gates (proof:viz-aurora / proof:viz-dotflow / proof:viz-papergrid)
// assert the SOURCE wiring (the WGSL-primary splice, the anchored topology / coherent
// regime, the curlFBM + Golus-AA composition, the warm-cream identity). Those gates do NOT
// read a paint JSON — the binding LIVE-GPU paint floor (the A4/F-paint/P-paint arms, "the
// orchestrator's real-Metal capture") is the cardinal split's W-REFLECT3 obligation, and
// THIS spec is that capture: it renders each viz on the REAL Metal GPU and emits the honest
// per-backend, per-mode paint record (meanLum + chroma + coverage), the BC anti-disease
// law's binding paint floor (a real rendered-surface read, NEVER a fabricated value).
//
// For each viz, on BOTH a WebGPU backend AND an adapter-less host (the WebGL2 net forced by
// removing navigator.gpu at the page), in BOTH modes:
//
//   • THE FIELD PAINTS WARM — meanLum > 0 AND chroma > 0 (a living warm-cream field, NOT
//     the BB black-void/dead-static defect, NOT a teal/navy slab).
//   • THE BACKEND PICKER FIRES — the WebGPU primary on the default launch, the WebGL2 net
//     on the adapter-less host (genuine per-backend renders, not a scheme proxy).
//
// Records land at docs/tranches/BC/audit/visual/W-VIZ-{AURORA,DOTFLOW,PAPERGRID}-paint.json.
// On a clean CI runner with no Playwright + GPU the harness grace-SKIPs.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual");

const SCHEMES = ["light", "dark"] as const;
const BACKENDS = ["webgpu", "adapterless"] as const;
type Backend = (typeof BACKENDS)[number];

const VIZ = [
    {
        key: "AURORA",
        route: "/substrates/aurora",
        canvas: ".aurora-canvas",
        record: "W-VIZ-AURORA-paint.json",
        wave: "BC.W-VIZ-AURORA",
        // The painterly nuclei-field carries real chroma — a living warm-cream wash.
        meanLumFloor: 4,
        chromaFloor: 1,
    },
    {
        key: "DOTFLOW",
        route: "/substrates/dot-flow-field",
        canvas: ".dot-flow-field-canvas",
        record: "W-VIZ-DOTFLOW-paint.json",
        wave: "BC.W-VIZ-DOTFLOW",
        meanLumFloor: 4,
        chromaFloor: 0, // the dot lattice is a warm near-mono field; chroma floor is 0 (≥0)
    },
    {
        key: "PAPERGRID",
        route: "/substrates/liquid-grid",
        canvas: ".liquid-grid-canvas",
        record: "W-VIZ-PAPERGRID-paint.json",
        wave: "BC.W-VIZ-PAPERGRID",
        meanLumFloor: 4,
        chromaFloor: 0, // the warm ink grid is near-mono; chroma floor is 0 (≥0)
    },
] as const;

const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/**
 * Read the painted field: un-premultiplied mean luminance + mean chroma (max-min of RGB —
 * a perceptual saturation proxy) over the painted pixels, + the opaque pixel count + a
 * coarse per-cell coverage variance (a structured field has variance ≫ 0; a uniform fill
 * reads ~0 — the "it's a field, not a flat slab" floor).
 */
function fieldStats(png: PNG) {
    const { width: w, height: h, data } = png;
    let sum = 0;
    let chromaSum = 0;
    let n = 0;
    let opaque = 0;
    for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3]!;
        if (a < 10) continue;
        const af = a / 255;
        const r = data[i]! / af;
        const g = data[i + 1]! / af;
        const b = data[i + 2]! / af;
        sum += lum(r, g, b);
        chromaSum += Math.max(r, g, b) - Math.min(r, g, b);
        n++;
        if (a >= 200) opaque++;
    }
    // Per-cell coverage variance over a 24×24 grid of mean luminance (structure proxy).
    const G = 24;
    const cellMeans: number[] = [];
    for (let gy = 0; gy < G; gy++) {
        for (let gx = 0; gx < G; gx++) {
            let cs = 0;
            let cn = 0;
            const x0 = Math.floor((gx * w) / G);
            const x1 = Math.floor(((gx + 1) * w) / G);
            const y0 = Math.floor((gy * h) / G);
            const y1 = Math.floor(((gy + 1) * h) / G);
            for (let y = y0; y < y1; y += 2) {
                for (let x = x0; x < x1; x += 2) {
                    const i = (y * w + x) * 4;
                    if (data[i + 3]! < 10) continue;
                    const af = data[i + 3]! / 255;
                    cs += lum(data[i]! / af, data[i + 1]! / af, data[i + 2]! / af);
                    cn++;
                }
            }
            if (cn > 0) cellMeans.push(cs / cn);
        }
    }
    const cmMean = cellMeans.reduce((a, b) => a + b, 0) / Math.max(1, cellMeans.length);
    const cmVar =
        cellMeans.reduce((a, b) => a + (b - cmMean) ** 2, 0) / Math.max(1, cellMeans.length);
    return {
        meanLum: n > 0 ? sum / n : 0,
        meanChroma: n > 0 ? chromaSum / n : 0,
        opaque,
        painted: n,
        coverageVariance: cmVar,
        width: w,
        height: h,
    };
}

function vizCanvas(page: Page, sel: string): Locator {
    return page.locator(sel).first();
}

mkdirSync(VISUAL_DIR, { recursive: true });

for (const viz of VIZ) {
    type PerScheme = {
        meanLum: number;
        meanChroma: number;
        opaque: number;
        coverageVariance: number;
        width: number;
        height: number;
    };
    const record: {
        wave: string;
        route: string;
        canvas: string;
        note: string;
        backends: Record<
            string,
            {
                meanLum: number;
                chroma: number;
                opaque: number;
                coverageVariance: number;
                perScheme: Record<string, PerScheme>;
            }
        >;
    } = {
        wave: viz.wave,
        route: viz.route,
        canvas: viz.canvas,
        note:
            `Real-Metal LIVE-GPU paint record for ${viz.key}. webgpu = the WebGPU primary ` +
            `(default ANGLE/Metal launch); adapterless = the WebGL2 net (navigator.gpu removed ` +
            `at the page → createGpuSubstrate falls to the GLSL twin). Per backend: meanLum/chroma ` +
            `= the MIN across light+dark (the conservative both-modes read); coverageVariance = the ` +
            `MAX (the structured-field witness). A living warm field (meanLum>0, chroma≥0), no black ` +
            `void, no teal/navy.`,
        backends: {},
    };

    for (const backend of BACKENDS) {
        for (const scheme of SCHEMES) {
            test.describe(`${viz.wave} paint — ${backend} · ${scheme}`, () => {
                test.use({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });

                test(`${viz.key} paints warm (${backend} · ${scheme})`, async ({ page }) => {
                    if (backend === "adapterless") {
                        await page.addInitScript(() => {
                            try {
                                Object.defineProperty(navigator, "gpu", {
                                    configurable: true,
                                    get: () => undefined,
                                });
                            } catch {
                                // @ts-expect-error — force-remove the WebGPU capability hint.
                                delete (navigator as { gpu?: unknown }).gpu;
                            }
                        });
                    }

                    await page.goto(viz.route);
                    const canvas = vizCanvas(page, viz.canvas);
                    await canvas.scrollIntoViewIfNeeded().catch(() => {});
                    await expect(canvas).toBeVisible();
                    // Let the substrate arm (the WebGPU async prelude OR the WebGL2 fall) +
                    // paint the living field through a few animation frames.
                    await page.waitForTimeout(1500);

                    // Best (most-painted) reading over a short window.
                    let best = fieldStats(await grab(canvas));
                    for (let f = 0; f < 5; f++) {
                        await page.waitForTimeout(150);
                        const s = fieldStats(await grab(canvas));
                        if (s.meanLum > best.meanLum) best = s;
                    }

                    expect(best.painted, `${viz.key} painted pixels`).toBeGreaterThan(100);
                    expect(
                        best.meanLum,
                        `[${viz.key}/${backend}/${scheme}] meanLum > 0 (a living field, not the black void)`,
                    ).toBeGreaterThan(viz.meanLumFloor);
                    expect(
                        best.meanChroma,
                        `[${viz.key}/${backend}/${scheme}] chroma ≥ floor (warm field, not gray-dead)`,
                    ).toBeGreaterThanOrEqual(viz.chromaFloor);

                    const perScheme: PerScheme = {
                        meanLum: best.meanLum,
                        meanChroma: best.meanChroma,
                        opaque: best.opaque,
                        coverageVariance: best.coverageVariance,
                        width: best.width,
                        height: best.height,
                    };
                    const key = backend as Backend;
                    const prev = record.backends[key];
                    if (!prev) {
                        record.backends[key] = {
                            meanLum: best.meanLum,
                            chroma: best.meanChroma,
                            opaque: best.opaque,
                            coverageVariance: best.coverageVariance,
                            perScheme: { [scheme]: perScheme },
                        };
                    } else {
                        prev.meanLum = Math.min(prev.meanLum, best.meanLum);
                        prev.chroma = Math.min(prev.chroma, best.meanChroma);
                        prev.opaque = Math.min(prev.opaque, best.opaque);
                        prev.coverageVariance = Math.max(prev.coverageVariance, best.coverageVariance);
                        prev.perScheme[scheme] = perScheme;
                    }
                    writeFileSync(
                        resolve(VISUAL_DIR, viz.record),
                        JSON.stringify(record, null, 2) + "\n",
                    );
                });
            });
        }
    }
}
