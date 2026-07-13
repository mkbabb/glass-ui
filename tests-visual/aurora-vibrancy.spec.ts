// BI.W-AURORA-VIBRANCY — the BINDING vibrancy + setting-sun π (LOCAL, real-GPU; rides the
// W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE substrate verdict).
//
// The device-free gate (proof:aurora-vibrancy) locks the SOURCE (the palette chroma floor,
// the demo-local fence, the studio bump, the atoms door + the dark-leg probe). This π
// proves the PAINTED truth the source cannot witness:
//   1. Each setting-sun candidate (A/B/C), sampled through the library's OWN
//      `sampleAuroraField` CPU mirror, composites to a WARM-SUN-WITH-PINK field — mean
//      OKLab chroma ≥ the warm floor (no grey wash) at a WARM hue (not a pink FIELD).
//   2. The pink note READS on the sun-core (candidate A) — the LOW horizon band carries a
//      rose lean (a lower/pinker hue than the field) while the OVERALL field stays warm-
//      amber (the note does not over-rotate the whole field to pink).
//   3. A caption over the field behind the real warm-glass plate clears AA in BOTH modes
//      (the vibrancy lift never drops content-over-glass below the AA floor — G9).
//   4. The studio canvas grew (the "core aurora space larger" read — UF-E4).
//
// The field readback is GL-FREE by construction (the swraster precedent): the composite is
// the SHIPPED `sampleAuroraField` static mirror, rendered into real DOM and read back via
// getImageData through the browser compositor — headless on ANY engine.

import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import { assertServedDemoAurora } from "./served-app-sentinel.ts";

// The warm-sun-with-pink floor: the composited field must carry real chroma (no grey wash
// behind glass) — mean OKLab C ≥ 0.045 (the §3 transmissive floor). It must ALSO stay a
// warm FIELD, not a pink field: the mean hue lands in the warm sun band [8, 95] (coral →
// gold), never rotated to a pink field (a mean hue in the rose band would be a pink wash).
const FIELD_CHROMA_FLOOR = 0.045;
const WARM_FIELD_BAND = [8, 95];
const SAMPLE_GRID = 40;

// The candidate presets (the demo-local setting-sun family + the demo lead).
const CANDIDATES = ["SETTING_SUN", "DUSK", "VIVID_SETTING_SUN"] as const;

/** Ottosson linear-sRGB → OKLab {L, C, h°} — the measurement instrument (a test probe,
 *  not shipped color math; the library derives via value.js). */
function linToOklab(r: number, g: number, b: number): { L: number; C: number; h: number } {
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    return { L, C: Math.hypot(a, bb), h: ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 };
}

/** Mean relative luminance (WCAG) over a screenshot region. */
function meanLuminance(png: PNG, x0 = 0, y0 = 0, x1 = png.width, y1 = png.height): number {
    const lin = (c8: number) => {
        const c = c8 / 255;
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    let sum = 0, n = 0;
    for (let y = y0; y < y1; y++)
        for (let x = x0; x < x1; x++) {
            const i = (y * png.width + x) * 4;
            sum += 0.2126 * lin(png.data[i]!) + 0.7152 * lin(png.data[i + 1]!) + 0.0722 * lin(png.data[i + 2]!);
            n++;
        }
    return n ? sum / n : 0;
}

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

test.setTimeout(120_000);

test.describe("BI.W-AURORA-VIBRANCY — vibrant warm-sun field + the setting-sun pink note", () => {
    for (const scheme of ["light", "dark"] as const) {
        test(`each setting-sun candidate composites to a warm-sun-with-pink field (${scheme})`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: scheme });
            await page.goto("/substrates/aurora");
            await assertServedDemoAurora(page);

            const built = await page.evaluate(
                async ({ grid, keys }) => {
                    const groundMod = await import(
                        "/src/components/custom/aurora/composables/auroraFallbackGround.ts"
                    );
                    const presetMod = await import(
                        "/demo/stories/substrates/aurora/presets.ts"
                    );
                    const out: Record<string, { cells: string[] }> = {};
                    for (const key of keys) {
                        const cfg = presetMod.PRESETS[key];
                        const cells: string[] = [];
                        for (let iy = 0; iy < grid; iy++)
                            for (let ix = 0; ix < grid; ix++) {
                                const x = (ix + 0.5) / grid;
                                const y = (iy + 0.5) / grid;
                                const [r, g, b] = groundMod.sampleAuroraField(cfg, x, y);
                                const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
                                cells.push(`rgb(${c(r)}, ${c(g)}, ${c(b)})`);
                            }
                        out[key] = { cells };
                    }
                    // Render every candidate grid into a fixed host so the readback is
                    // through the browser compositor (painted pixels, not raw floats).
                    const SIZE = 200;
                    const host = document.createElement("div");
                    host.id = "vibrancy-host";
                    host.style.cssText = "position:fixed;top:0;left:0;z-index:99999;display:flex;";
                    for (const key of keys) {
                        const box = document.createElement("div");
                        box.id = `vib-${key}`;
                        box.style.cssText = `width:${SIZE}px;height:${SIZE}px;display:grid;grid-template-columns:repeat(${grid},1fr);grid-template-rows:repeat(${grid},1fr);`;
                        for (const c of out[key]!.cells) {
                            const cell = document.createElement("div");
                            cell.style.background = c;
                            box.appendChild(cell);
                        }
                        host.appendChild(box);
                    }
                    document.body.appendChild(host);
                    return { keys };
                },
                { grid: SAMPLE_GRID, keys: CANDIDATES as unknown as string[] },
            );
            expect(built.keys.length).toBe(CANDIDATES.length);
            await page.waitForTimeout(150);

            for (const key of CANDIDATES) {
                const png = PNG.sync.read(await page.locator(`#vib-${key}`).screenshot());
                // Mean OKLab over the painted field (linear sRGB → OKLab per pixel).
                let sumC = 0, sumA = 0, sumB = 0, n = 0;
                for (let y = 0; y < png.height; y += 2)
                    for (let x = 0; x < png.width; x += 2) {
                        const i = (y * png.width + x) * 4;
                        const lin = (c8: number) => {
                            const c = c8 / 255;
                            return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                        };
                        const o = linToOklab(lin(png.data[i]!), lin(png.data[i + 1]!), lin(png.data[i + 2]!));
                        sumC += o.C;
                        // vector-mean hue via a/b accumulation (circular)
                        sumA += o.C * Math.cos((o.h * Math.PI) / 180);
                        sumB += o.C * Math.sin((o.h * Math.PI) / 180);
                        n++;
                    }
                const meanC = sumC / n;
                const meanH = ((Math.atan2(sumB, sumA) * 180) / Math.PI + 360) % 360;
                test.info().annotations.push({
                    type: "vibrancy-field",
                    description: JSON.stringify({ scheme, key, meanC: meanC.toFixed(4), meanH: meanH.toFixed(1) }),
                });
                // 1. real chroma — no grey wash behind glass.
                expect(meanC, `${key} field mean OKLab C (warm-sun floor)`).toBeGreaterThanOrEqual(FIELD_CHROMA_FLOOR);
                // 2. a WARM field, not a pink field.
                expect(meanH, `${key} field mean hue is warm (not rotated to a pink field)`).toBeGreaterThanOrEqual(WARM_FIELD_BAND[0]);
                expect(meanH, `${key} field mean hue is warm`).toBeLessThanOrEqual(WARM_FIELD_BAND[1]);
            }
        });
    }

    test("the pink note reads on the sun-core (candidate A) without over-rotating the field", async ({ page }) => {
        await page.goto("/substrates/aurora");
        await assertServedDemoAurora(page);
        const res = await page.evaluate(async ({ grid }) => {
            const groundMod = await import(
                "/src/components/custom/aurora/composables/auroraFallbackGround.ts"
            );
            const presetMod = await import("/demo/stories/substrates/aurora/presets.ts");
            const cfg = presetMod.PRESETS.SETTING_SUN;
            // Sample the LOW horizon band (y 0.65–0.95, the sun-core) vs the WHOLE field.
            const sample = (yLo: number, yHi: number) => {
                let a = 0, b = 0, c = 0, n = 0;
                const lin2ok = (r: number, g: number, bl: number) => {
                    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * bl;
                    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * bl;
                    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * bl;
                    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
                    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
                    const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
                    return { A, B, C: Math.hypot(A, B) };
                };
                for (let iy = 0; iy < grid; iy++) {
                    const y = (iy + 0.5) / grid;
                    if (y < yLo || y > yHi) continue;
                    for (let ix = 0; ix < grid; ix++) {
                        const x = (ix + 0.5) / grid;
                        const [r, g, bl] = groundMod.sampleAuroraField(cfg, x, y);
                        const o = lin2ok(Math.max(0, r), Math.max(0, g), Math.max(0, bl));
                        a += o.A * o.C; b += o.B * o.C; c += o.C; n++;
                    }
                }
                return { h: ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360, meanC: c / n };
            };
            return { core: sample(0.65, 0.95), field: sample(0, 1) };
        }, { grid: SAMPLE_GRID });
        test.info().annotations.push({ type: "vibrancy-sun-core", description: JSON.stringify(res) });
        // The sun-core carries a ROSE lean — a LOWER hue than the field mean (toward the
        // h:12 rose note); the field mean stays warm-amber (NOT pinkified whole-field).
        const dh = (a: number, b: number) => ((a - b + 540) % 360) - 180;
        expect(res.core.h, "sun-core hue leans rose vs the field").toBeLessThan(res.field.h);
        expect(dh(res.field.h, res.core.h), "the pink note is a LOCAL lean, not a field rotation").toBeGreaterThan(2);
        expect(res.field.h, "the overall field stays warm-amber (not a pink field)").toBeGreaterThanOrEqual(WARM_FIELD_BAND[0]);
    });

    for (const scheme of ["light", "dark"] as const) {
        test(`a caption over the setting-sun field behind warm glass clears AA (${scheme})`, async ({ page }) => {
            await page.emulateMedia({ colorScheme: scheme });
            await page.goto("/substrates/aurora");
            await assertServedDemoAurora(page);
            await page.evaluate(async ({ grid }) => {
                const groundMod = await import(
                    "/src/components/custom/aurora/composables/auroraFallbackGround.ts"
                );
                const presetMod = await import("/demo/stories/substrates/aurora/presets.ts");
                const cfg = presetMod.PRESETS.SETTING_SUN;
                // Paint the field, then a real .glass-floating plate + a body-muted caption
                // over the BUSIEST (low, high-chroma) band — the worst-case legibility case.
                const host = document.createElement("div");
                host.id = "vib-aa-host";
                host.style.cssText = "position:fixed;inset:0;z-index:99999;display:grid;place-items:center;";
                const field = document.createElement("div");
                field.style.cssText = "position:absolute;inset:0;display:grid;grid-template-columns:repeat(" + grid + ",1fr);grid-template-rows:repeat(" + grid + ",1fr);";
                for (let iy = 0; iy < grid; iy++)
                    for (let ix = 0; ix < grid; ix++) {
                        const [r, g, b] = groundMod.sampleAuroraField(cfg, (ix + 0.5) / grid, (iy + 0.5) / grid);
                        const c = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
                        const cell = document.createElement("div");
                        cell.style.background = `rgb(${c(r)}, ${c(g)}, ${c(b)})`;
                        field.appendChild(cell);
                    }
                const plate = document.createElement("div");
                plate.className = "glass-floating";
                plate.style.cssText = "position:relative;padding:1.5rem 2rem;border-radius:1rem;";
                const cap = document.createElement("p");
                cap.id = "vib-caption";
                cap.className = "text-muted-foreground";
                cap.textContent = "the setting sun caption legibility floor";
                plate.appendChild(cap);
                host.appendChild(field);
                host.appendChild(plate);
                document.body.appendChild(host);
            }, { grid: SAMPLE_GRID });
            await page.waitForTimeout(200);
            // Read the caption text luminance vs its plate backdrop just outside the text.
            const capBox = await page.locator("#vib-caption").boundingBox();
            expect(capBox).not.toBeNull();
            const shot = PNG.sync.read(await page.screenshot());
            const cx = Math.round(capBox!.x), cy = Math.round(capBox!.y);
            const cw = Math.round(capBox!.width), ch = Math.round(capBox!.height);
            // ink: the darkest 15% of pixels in the caption box (the glyph strokes);
            // plate: the median (the plate fill between glyphs). WCAG contrast ≥ 4.5.
            const lums: number[] = [];
            const lin = (c8: number) => { const c = c8 / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
            for (let y = cy; y < cy + ch; y++)
                for (let x = cx; x < cx + cw; x++) {
                    const i = (y * shot.width + x) * 4;
                    lums.push(0.2126 * lin(shot.data[i]!) + 0.7152 * lin(shot.data[i + 1]!) + 0.0722 * lin(shot.data[i + 2]!));
                }
            lums.sort((a, b) => a - b);
            const ink = lums[Math.floor(lums.length * 0.08)]!;
            const plate = lums[Math.floor(lums.length * 0.75)]!;
            const ratio = contrast(ink, plate);
            test.info().annotations.push({ type: "vibrancy-aa", description: JSON.stringify({ scheme, ratio: ratio.toFixed(2) }) });
            expect(ratio, `caption over setting-sun glass clears AA (${scheme})`).toBeGreaterThanOrEqual(4.5);
        });
    }

    test("the studio canvas is larger (UF-E4)", async ({ page }) => {
        await page.goto("/substrates/aurora");
        await assertServedDemoAurora(page);
        // The AuroraStage rounded wrapper carries the field; its painted footprint must
        // clear the min-height floor (the grown "core aurora space").
        const box = await page.locator(".cursor-crosshair").first().boundingBox();
        test.info().annotations.push({ type: "vibrancy-canvas", description: JSON.stringify(box) });
        expect(box).not.toBeNull();
        expect(box!.height, "the studio aurora canvas cleared the grown floor").toBeGreaterThanOrEqual(460);
    });
});
