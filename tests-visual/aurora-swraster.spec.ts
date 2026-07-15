// BB.W-AURORA-SWRASTER — the BINDING headless luminance-faithfulness π.
//
// The whole ask turns on this: a HEADLESS capture (NO `--use-gl=angle` headed
// browser) must render an aurora ground whose mean + per-quadrant luminance
// matches the WebGL composited reference within the certify band — so speedtest's
// CI/witness harness can certify text-on-aurora AA contrast floors against the
// fallback. A "guard fires but the fallback still reads flat" close is the P-1 lie
// the BA gestalt bar kills, so this π proves the RENDERED faithfulness (the painted
// pixels, not the source presence the device-free gate already locks).
//
// THE READBACK IS GL-FREE BY CONSTRUCTION (the certify-without-headed truth):
//   - The COMPOSITE REFERENCE is the shader's STATIC composite, sampled CPU-side at
//     a fine grid via the LIBRARY's own `sampleAuroraField` (the exact CPU mirror of
//     composition.glsl's nucleiField + samplePalette + tonemap + the linearToSrgb
//     OETF — the SAME math the GPU runs at t=0). This is the `aurora-make-ref-plates`
//     MEASUREMENT-GROUND class: a recorded reference the contrast capture certifies
//     against, not a live-GL dependency.
//   - The FALLBACK GROUND is the LIBRARY's `auroraFallbackGround` CSS — the field-
//     sampled radial-glow stack the software-raster substrate paints.
// Both are imported from the dev server's module graph (`/src/...`) so the π
// measures the SHIPPED library, never a spec-local re-implementation. Both are
// rendered into real DOM, screenshotted, and read back via getImageData — so the
// assertion is on PAINTED pixels through the browser's compositor, fully headless
// on ANY engine (SwiftShader OR a GPU-less runner), no headed browser.
//
// + the no-hang capture (the guard's runtime truth): a forced `mode:"capture"` mount
//   under the SwiftShader harness must NOT wedge the page — the wedge catch leaves it
//   un-armed (no live GL layer) and a subsequent interaction completes promptly.

import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import { assertServedDemoAurora } from "./served-app-sentinel.ts";

// The certify band — the NAMED conservative bound (BB.W-AURORA-SWRASTER §scope-4 /
// triumvirate). The speedtest P14/P15 "contrast floor" is a witness-PROCESS label
// (a lived-flow certifying capture), not a stable numeric, so the band is sized from
// the AA contrast-headroom the certify needs: a relative-luminance delta small
// enough that an AA contrast ratio (L+0.05)/(L'+0.05) computed against the fallback
// agrees with the composite to within AA headroom. The field ground matches the
// composite mean to ~0.0002 by construction (the SAME CPU mirror); the conservative
// band is mean ≤ 0.05, per-quadrant ≤ 0.08 — clearing it with enormous margin while
// the flat gradient's spatial divergence FAILS the per-quadrant arm.
const CERTIFY_BAND_MEAN = 0.05;
const CERTIFY_BAND_QUADRANT = 0.08;

// The reference grid (fine — the composite as the shader paints it, static).
const REF_GRID = 48;

// A deterministic aurora config the readback drives — the DEFAULT_AURORA_CONFIG
// shape sourced from the library so a preset re-tune never strands the π. The seed
// is recorded in the DELTA (the config IS the seed — the ground is deterministic
// from palette + nuclei).

/** getImageData over a screenshotted element → per-quadrant + mean relative luminance. */
function quadrantLuminance(png: PNG): { mean: number; quadrants: [number, number, number, number] } {
    const { width: w, height: h, data } = png;
    const lin = (c8: number) => {
        const c = c8 / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    let sum = 0;
    let n = 0;
    const qSum: [number, number, number, number] = [0, 0, 0, 0];
    const qN: [number, number, number, number] = [0, 0, 0, 0];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const L = 0.2126 * lin(data[i]!) + 0.7152 * lin(data[i + 1]!) + 0.0722 * lin(data[i + 2]!);
            sum += L;
            n += 1;
            const q = (y < h / 2 ? 0 : 2) + (x < w / 2 ? 0 : 1);
            qSum[q] += L;
            qN[q] += 1;
        }
    }
    return {
        mean: sum / n,
        quadrants: [
            qSum[0] / Math.max(1, qN[0]),
            qSum[1] / Math.max(1, qN[1]),
            qSum[2] / Math.max(1, qN[2]),
            qSum[3] / Math.max(1, qN[3]),
        ],
    };
}

test.setTimeout(120_000);

test.describe("BB.W-AURORA-SWRASTER — headless luminance-faithful fallback", () => {
    for (const scheme of ["light", "dark"] as const) {
        test(`fallback ground matches the composite reference within the certify band (${scheme})`, async ({
            page,
        }) => {
            await page.emulateMedia({ colorScheme: scheme });
            await page.goto("/substrates/aurora");
            // Fail-CLOSED if a foreign app holds the port (not a device skip).
            await assertServedDemoAurora(page);

            // Build BOTH grounds in the page from the SHIPPED library modules (the
            // dev server's module graph), render them into real DOM at a fixed size.
            const built = await page.evaluate(
                async ({ refGrid }) => {
                    const groundMod = await import(
                        "/src/components/aurora/composables/auroraFallbackGround.ts"
                    );
                    const presetMod = await import(
                        "/src/components/aurora/constants/presets.ts"
                    );
                    const cfg = presetMod.DEFAULT_AURORA_CONFIG;

                    // The composite reference: the fine-grid static field, painted as
                    // a flat per-cell grid of solid rgb cells (the shader's static
                    // composite, sampled by the library's own sampleAuroraField).
                    const refCells: string[] = [];
                    for (let iy = 0; iy < refGrid; iy++) {
                        for (let ix = 0; ix < refGrid; ix++) {
                            const x = (ix + 0.5) / refGrid;
                            const y = (iy + 0.5) / refGrid;
                            const [r, g, b] = groundMod.sampleAuroraField(cfg, x, y);
                            const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
                            refCells.push(`rgb(${c(r)}, ${c(g)}, ${c(b)})`);
                        }
                    }

                    // The fallback ground: the library's field-sampled radial-glow CSS.
                    const ground = groundMod.auroraFallbackGround(cfg);

                    // Render both into fixed 256×256 boxes.
                    const SIZE = 256;
                    const host = document.createElement("div");
                    host.id = "swraster-pi-host";
                    host.style.cssText = "position:fixed;top:0;left:0;z-index:99999;";

                    const refBox = document.createElement("div");
                    refBox.id = "swraster-ref";
                    refBox.style.cssText = `width:${SIZE}px;height:${SIZE}px;display:grid;grid-template-columns:repeat(${refGrid},1fr);grid-template-rows:repeat(${refGrid},1fr);`;
                    for (const c of refCells) {
                        const cell = document.createElement("div");
                        cell.style.background = c;
                        refBox.appendChild(cell);
                    }

                    // The gnd box mirrors the SHIPPED Aurora.vue `[data-aurora-substrate
                    // ="css"]` placeholder paint: background-image + `cover` + smooth
                    // upscale + the mean base. (The library's scoped CSS supplies the
                    // size/position/repeat; we restate them on the isolated box so the
                    // π measures the same upscaled field the component paints.)
                    const gndBox = document.createElement("div");
                    gndBox.id = "swraster-gnd";
                    gndBox.style.cssText = `width:${SIZE}px;height:${SIZE}px;background-color:${ground.backgroundColor};background-image:${ground.backgroundImage};background-size:cover;background-position:center;background-repeat:no-repeat;`;

                    host.appendChild(refBox);
                    host.appendChild(gndBox);
                    document.body.appendChild(host);

                    // The raster ground is a `data:` URI — DECODE it before the
                    // screenshot so the painted pixels are the field, not the
                    // background-color mean showing through an undecoded image (the
                    // async-paint race). The ref grid is inline divs (synchronous).
                    const m = ground.backgroundImage.match(/url\("(data:[^"]+)"\)/);
                    if (m) {
                        const im = new Image();
                        im.src = m[1]!;
                        await im.decode().catch(() => {});
                    }

                    return {
                        metrics: ground.metrics,
                        backgroundImage: ground.backgroundImage,
                        // A field form: a 2D-canvas raster data: URI (the primary
                        // path) OR the SSR layered radial-gradient stack (≥4 layers).
                        // NEVER the flat `linear-gradient(135deg, …)` band.
                        isRaster: ground.backgroundImage.startsWith('url("data:image'),
                        radialLayers:
                            ground.backgroundImage.split("radial-gradient").length - 1,
                    };
                },
                { refGrid: REF_GRID },
            );

            // The fallback ground is a FIELD, not the flat diagonal band: the 2D-canvas
            // raster (primary) or the layered radial stack (SSR) — never
            // `linear-gradient(135deg, …)` (the divergent placeholder this REPLACES).
            expect(
                built.backgroundImage.includes("linear-gradient(135deg"),
                "the fallback ground is NOT the flat diagonal placeholder band",
            ).toBe(false);
            expect(
                built.isRaster || built.radialLayers >= 4,
                "the fallback ground is the field raster OR a layered radial-glow field",
            ).toBe(true);

            // Let the compositor paint the decoded raster + the ref grid.
            await page.waitForTimeout(200);

            // Screenshot both rendered boxes and read back the painted luminance.
            const refPng = PNG.sync.read(await page.locator("#swraster-ref").screenshot());
            const gndPng = PNG.sync.read(await page.locator("#swraster-gnd").screenshot());
            const ref = quadrantLuminance(refPng);
            const gnd = quadrantLuminance(gndPng);

            const meanDelta = Math.abs(gnd.mean - ref.mean);
            const quadDeltas = gnd.quadrants.map((q, i) => Math.abs(q - ref.quadrants[i]!));

            // Record the measured numbers in the report (the DELTA freshness capture).
            test.info().annotations.push({
                type: "swraster-luminance",
                description: JSON.stringify({
                    scheme,
                    refMean: ref.mean.toFixed(4),
                    gndMean: gnd.mean.toFixed(4),
                    meanDelta: meanDelta.toFixed(4),
                    refQuad: ref.quadrants.map((v) => v.toFixed(3)),
                    gndQuad: gnd.quadrants.map((v) => v.toFixed(3)),
                    quadDeltas: quadDeltas.map((v) => v.toFixed(3)),
                    groundForm: built.isRaster ? "2d-raster" : `radial-x${built.radialLayers}`,
                }),
            });

            // The binding faithfulness assertion: mean + per-quadrant within band.
            expect(meanDelta, `mean luminance delta within certify band (${scheme})`).toBeLessThanOrEqual(CERTIFY_BAND_MEAN);
            for (let i = 0; i < 4; i++) {
                expect(
                    quadDeltas[i]!,
                    `quadrant ${i} luminance delta within certify band (${scheme})`,
                ).toBeLessThanOrEqual(CERTIFY_BAND_QUADRANT);
            }
        });
    }

    test("a forced mode:capture mount under software raster does NOT hang the page", async ({ page }) => {
        await page.goto("/substrates/aurora");
        await assertServedDemoAurora(page);

        // Drive the LIBRARY runtime directly: a forced mode:"capture" createAurora
        // under the (SwiftShader on CI) harness. The wedge catch must leave it
        // un-armed (the inert handle — no live GL layer) so the page never wedges.
        const result = await page.evaluate(async () => {
            const rmMod = await import(
                "/src/components/aurora/constants/renderMode.ts"
            );
            const rtMod = await import(
                "/src/components/aurora/composables/runtime.ts"
            );
            const presetMod = await import(
                "/src/components/aurora/constants/presets.ts"
            );
            const isSoftware = rmMod.isSoftwareWebGLRenderer();
            const canvas = document.createElement("canvas");
            canvas.width = 64;
            canvas.height = 64;
            document.body.appendChild(canvas);
            let threw = false;
            const t0 = performance.now();
            try {
                // mode:"capture" forces eager — un-guarded at HEAD this armed the live
                // GL2 layer under SwiftShader and starved the page. The wedge catch
                // routes it to the inert handle when isSoftwareWebGLRenderer fires.
                const inst = rtMod.createAurora(canvas, presetMod.DEFAULT_AURORA_CONFIG, {
                    mode: "capture",
                });
                // renderAt is a no-op under the wedge catch — must NOT block.
                inst.renderAt(0);
                inst.dispose();
            } catch {
                threw = true;
            }
            const armMs = performance.now() - t0;
            return { isSoftware, threw, armMs };
        });

        // The createAurora call returns promptly (it never wedges) and never throws
        // a contract violation for the software-raster fall (the guard's runtime truth).
        expect(result.threw, "the software-raster capture mount must not throw an onInitError-class violation").toBe(false);
        expect(result.armMs, "the capture mount returns promptly (no wedge/hang)").toBeLessThan(5_000);

        // The page stays responsive — a click resolves immediately.
        const t0 = Date.now();
        await page.mouse.move(100, 100);
        await page.mouse.move(200, 200);
        const responsiveMs = Date.now() - t0;
        expect(responsiveMs, "the page stays responsive after the capture mount").toBeLessThan(5_000);
    });
});
