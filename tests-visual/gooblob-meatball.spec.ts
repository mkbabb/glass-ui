// BC.W-GOOBLOB-MEATBALL — the STAGE-2 LIT meatball π binding readback (LOCAL real-GPU).
//
// The device-free source gate (proof:gooblob-meatball --source) asserts the ARCHITECTURE
// (the hoisted uniform-flow fwidth(Nh) armer + the byte-preserved lit-glass math + the
// softShadow2D march + the typed-struct SoT lockstep). THIS spec is the BINDING VISUAL
// TRUTH — the BB blob shipped headless-green but the WGSL primary never armed (the
// in-uLit-branch fwidth(N) non-uniform-flow defect), so the full LIT creature never
// painted. The cardinal split's paint floor lives HERE. It proves, on the real
// /substrates/blob device (the STAGE-2 studio meatball — variant="meatball", lit ON,
// shadow ON), on BOTH a WebGPU backend AND an adapter-less host (the WebGL2 net):
//
//   M5(a) THE LIT CREATURE PAINTS — meanLum > 0 over the silhouette (NOT the D9' black
//         void — the WGSL primary armed + the GLSL twin paints).
//
//   M5(b) THE SPECULAR HIGHLIGHT READS — a local luminance PEAK on the dome ≥ 1.3× the
//         body mean (the Blinn-Phong glint + Fresnel rim painted). MODE NOTE: the warm-
//         cream body is BRIGHT in light mode, which COMPRESSES the relative peak ratio
//         (the gleam is the design's "contained warm gleam, never a blown hotspot" — the
//         BLOB_CONFIG_DEFAULTS.surface comment); the glint reads UNAMBIGUOUSLY against the
//         DARK body in dark mode (the peak stands out from the dark interior). So the
//         specular ratio is the BEST (most faithful) reading across the two modes — the
//         lit dressing painted iff the glint clears 1.3× the interior in EITHER mode.
//
//   M5(c) THE SHADOW BAND READS — the softShadow2D march darkens the LOWER/away rim of
//         the silhouette (a self-shadow grounding band, NOT a ground-plane drop shadow —
//         the bead fills its canvas). MODE NOTE: the away-rim darken is a sub-ambient
//         BAND vs the body; it reads UNAMBIGUOUSLY against the BRIGHT body in light mode
//         (a 29% darken), and compresses against the dark body in dark mode. So shadow
//         presence is OR-ed across the two modes — the contact shadow painted iff the
//         away rim is materially darker than the body in EITHER mode.
//
// It EMITS the real-GPU paint record (W-GOOBLOB-MEATBALL-paint.json) the
// proof:gooblob-meatball FULL arm reads — the BB gate-paint-blindness close (a real
// rendered-surface meanLum/specular/shadow, never a file-presence proxy). The WebGPU
// primary is captured on the default ANGLE/Metal launch (--enable-unsafe-webgpu on); the
// adapter-less host is captured by REMOVING navigator.gpu at the page (an init script),
// which forces useGpuSubstrate's WebGL2 net — a genuine per-backend render, NOT a scheme
// proxy. On a clean CI runner with no Playwright + GPU the harness grace-SKIPs.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/BC/audit/visual");
const PAINT_RECORD = resolve(VISUAL_DIR, "W-GOOBLOB-MEATBALL-paint.json");
const BLOB_ROUTE = resolveScene("substrates", "blob").path; // /substrates/blob

const SCHEMES = ["light", "dark"] as const;
const BACKENDS = ["webgpu", "adapterless"] as const;
type Backend = (typeof BACKENDS)[number];

// ── tunables (live-set against the real device) ────────────────────────────────
const ALPHA_T = 150; // alpha ≥ this = a solid blob-body pixel (the bead fills the canvas)
const MEAN_LUM_FLOOR = 4; // 0..255; a real lit cream creature reads well above this
const SPECULAR_PEAK_FLOOR = 1.3; // the dome glint ≥ this × the interior mean (best mode)
const SHADOW_DARKEN_FLOOR = 0.04; // the away-rim band ≥ 4% darker than the body (best mode)
const FRAMES = 8;

const lum = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** RAW per-pixel luminance over the solid body (alpha ≥ ALPHA_T) — no un-premultiply, so
 *  the page-cream corner bleed (partial alpha) does not inflate the interior. */
function bodyStats(png: PNG) {
    const { width: w, height: h, data } = png;
    let sum = 0;
    let n = 0;
    let sx = 0;
    let sy = 0;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            if (data[i + 3]! < ALPHA_T) continue;
            sum += lum(data[i]!, data[i + 1]!, data[i + 2]!);
            n++;
            sx += x;
            sy += y;
        }
    }
    if (n === 0) return null;
    return { meanLum: sum / n, opaque: n, cx: sx / n, cy: sy / n, radius: Math.sqrt(n / Math.PI) };
}

/**
 * The specular-peak ratio — the brightest small dome window (an 8px box average, within
 * 0.8r of the centre so the rim/corner is excluded) ÷ the interior body mean. A lit
 * Blinn-Phong glint produces a tight bright cluster; the box-average rejects a single AA
 * speck and a flat floor reads ~1.0.
 */
function specularPeakRatio(png: PNG): number {
    const s = bodyStats(png);
    if (!s) return 0;
    const { width: w, height: h, data } = png;
    const at = (x: number, y: number): number | null => {
        if (x < 0 || y < 0 || x >= w || y >= h) return null;
        const i = (y * w + x) * 4;
        if (data[i + 3]! < ALPHA_T) return null;
        return lum(data[i]!, data[i + 1]!, data[i + 2]!);
    };
    const R = 8;
    const lim = (s.radius * 0.8) ** 2;
    let bestWin = 0;
    const ls: number[] = [];
    for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
            const dx = x - s.cx;
            const dy = y - s.cy;
            if (dx * dx + dy * dy > lim) continue;
            const c = at(x, y);
            if (c == null) continue;
            ls.push(c);
            let sw = 0;
            let nn = 0;
            for (let yy = -R; yy <= R; yy += 2) {
                for (let xx = -R; xx <= R; xx += 2) {
                    const p = at(x + xx, y + yy);
                    if (p != null) {
                        sw += p;
                        nn++;
                    }
                }
            }
            if (nn > 0) {
                const m = sw / nn;
                if (m > bestWin) bestWin = m;
            }
        }
    }
    const mean = ls.reduce((a, b) => a + b, 0) / ls.length;
    return mean > 0 ? bestWin / mean : 0;
}

/**
 * The away-rim shadow darken — the softShadow2D march darkens the lower/away rim of the
 * silhouette. We split the rim band (0.7r..0.93r) into 16 angular sectors, take the
 * DARKEST sector mean, and report its relative darken vs the interior body mean. A
 * no-shadow render leaves every rim sector ≈ the body; the contact shadow drives one rim
 * sector materially dimmer.
 */
function awayRimDarken(png: PNG): number {
    const s = bodyStats(png);
    if (!s) return 0;
    const { width: w, height: h, data } = png;
    const at = (x: number, y: number): number | null => {
        const i = (y * w + x) * 4;
        if (data[i + 3]! < ALPHA_T) return null;
        return lum(data[i]!, data[i + 1]!, data[i + 2]!);
    };
    const sect = new Array(16).fill(0);
    const cnt = new Array(16).fill(0);
    const r0 = s.radius * 0.7;
    const r1 = s.radius * 0.93;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const dx = x - s.cx;
            const dy = y - s.cy;
            const r = Math.hypot(dx, dy);
            if (r < r0 || r > r1) continue;
            const L = at(x, y);
            if (L == null) continue;
            let a = Math.atan2(dy, dx);
            if (a < 0) a += 2 * Math.PI;
            const k = Math.floor((a / (2 * Math.PI)) * 16) % 16;
            sect[k] += L;
            cnt[k]++;
        }
    }
    let bs = 0;
    let bn = 0;
    const lim = (s.radius * 0.5) ** 2;
    for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
            const dx = x - s.cx;
            const dy = y - s.cy;
            if (dx * dx + dy * dy > lim) continue;
            const L = at(x, y);
            if (L != null) {
                bs += L;
                bn++;
            }
        }
    }
    const body = bn > 0 ? bs / bn : 0;
    const rim = sect.map((v, i) => (cnt[i] > 50 ? v / cnt[i] : Infinity));
    const rimMin = Math.min(...rim);
    if (!isFinite(rimMin) || body <= 0) return 0;
    return (body - rimMin) / body;
}

/** The first GooBlob on the page is the STUDIO meatball (the LEAD lit/shadow stage). */
function studioCanvas(page: Page): Locator {
    return page.locator(".goo-blob-canvas").first();
}

mkdirSync(VISUAL_DIR, { recursive: true });

// One paint record (both backends; each backend's specular = the best across modes, shadow
// = OR-ed across modes, meanLum = the min across modes — the conservative both-modes read).
type PerScheme = { meanLum: number; specularPeakRatio: number; shadowDarken: number; shadowBandPresent: boolean };
type BackendRec = {
    meanLum: number;
    specularPeakRatio: number;
    shadowBandPresent: boolean;
    opaque: number;
    perScheme: Record<string, PerScheme>;
};
const paintRecord: {
    wave: string;
    route: string;
    note: string;
    backends: Record<string, BackendRec>;
} = {
    wave: "BC.W-GOOBLOB-MEATBALL",
    route: BLOB_ROUTE,
    note:
        "Real-Metal capture of the STAGE-2 lit meatball (variant=meatball, lit+shadow ON). " +
        "webgpu = the WebGPU primary (default ANGLE/Metal launch); adapterless = the WebGL2 net " +
        "(navigator.gpu removed at the page → useGpuSubstrate falls to the GLSL twin). Per backend: " +
        "meanLum = min across light+dark; specularPeakRatio = the dome-glint peak/interior, taken in " +
        "the mode where it reads (the bright cream body compresses the ratio in light; the glint reads " +
        "sharp against the dark body in dark); shadowBandPresent = the softShadow2D away-rim darken " +
        "observed in EITHER mode (the 29% darken reads against the bright body in light).",
    backends: {},
};

for (const backend of BACKENDS) {
    for (const scheme of SCHEMES) {
        test.describe(`W-GOOBLOB-MEATBALL capture — ${backend} · ${scheme}`, () => {
            test.use({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });

            test(`stage-2 lit meatball paints + glints + shadows (${backend} · ${scheme})`, async ({
                page,
            }) => {
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

                await page.goto(BLOB_ROUTE);
                const canvas = studioCanvas(page);
                await canvas.scrollIntoViewIfNeeded().catch(() => {});
                await expect(canvas).toBeVisible();
                // Let the substrate arm (the WebGPU async prelude OR the WebGL2 fall) +
                // paint the lit creature through a few satellite-orbit frames.
                await page.waitForTimeout(900);

                let bestSpec = 0;
                let bestShadow = 0;
                let meanLum = 0;
                let opaque = 0;
                for (let f = 0; f < FRAMES; f++) {
                    const png = await grab(canvas);
                    const s = bodyStats(png);
                    if (s) {
                        meanLum = s.meanLum;
                        opaque = s.opaque;
                    }
                    const spec = specularPeakRatio(png);
                    const sh = awayRimDarken(png);
                    if (spec > bestSpec) bestSpec = spec;
                    if (sh > bestShadow) bestShadow = sh;
                    await page.waitForTimeout(120);
                }

                // ── M5(a) the lit creature paints. ──
                expect(opaque, "the meatball painted solid body pixels").toBeGreaterThan(50);
                expect(
                    meanLum,
                    `[${backend}/${scheme}] the LIT meatball meanLum > 0 (not the D9' black void)`,
                ).toBeGreaterThan(MEAN_LUM_FLOOR);

                const perScheme: PerScheme = {
                    meanLum,
                    specularPeakRatio: bestSpec,
                    shadowDarken: bestShadow,
                    shadowBandPresent: bestShadow >= SHADOW_DARKEN_FLOOR,
                };

                // Merge into the backend record (best spec, OR-ed shadow, min meanLum).
                const key = backend as Backend;
                const prev = paintRecord.backends[key];
                if (!prev) {
                    paintRecord.backends[key] = {
                        meanLum,
                        specularPeakRatio: bestSpec,
                        shadowBandPresent: perScheme.shadowBandPresent,
                        opaque,
                        perScheme: { [scheme]: perScheme },
                    };
                } else {
                    prev.meanLum = Math.min(prev.meanLum, meanLum);
                    prev.specularPeakRatio = Math.max(prev.specularPeakRatio, bestSpec);
                    prev.shadowBandPresent = prev.shadowBandPresent || perScheme.shadowBandPresent;
                    prev.opaque = Math.min(prev.opaque, opaque);
                    prev.perScheme[scheme] = perScheme;
                }
                writeFileSync(PAINT_RECORD, JSON.stringify(paintRecord, null, 2) + "\n");

                // The binding per-(backend,scheme) sanity expectations — at least ONE of the
                // two modes must clear each floor; we assert the cross-mode aggregate at the
                // end via the record, but each scheme must at minimum paint. The specular +
                // shadow cross-mode assertion runs in the final (dark) pass of each backend.
                if (scheme === SCHEMES[SCHEMES.length - 1]!) {
                    const rec = paintRecord.backends[key]!;
                    expect(
                        rec.specularPeakRatio,
                        `[${backend}] the dome specular glint clears ${SPECULAR_PEAK_FLOOR}× the interior in the best mode (lit dressing painted)`,
                    ).toBeGreaterThanOrEqual(SPECULAR_PEAK_FLOOR);
                    expect(
                        rec.shadowBandPresent,
                        `[${backend}] the softShadow2D away-rim contact shadow reads in at least one mode`,
                    ).toBe(true);
                }
            });
        });
    }
}
