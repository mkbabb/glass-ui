// AZ.W-REGISTER-IOS — register-ios.spec.ts, the π light+dark readback of a SELECTED
// dock control (the BINDING close criterion for the de-red; G2).
//
// R3-6: "I don't like the red. Tune this to be more iOS inspired and glassy — at the
// root, within our icons and buttons." THE DEFECT was the warm-red (`--viz-fourier`)
// SELECTED register — the rail accent BAR + the bottom-dock active GLYPH painted a
// saturated NCSU-red on the interactive state. W-REGISTER-IOS (arm-a) retires the red
// from EVERY interactive register at the LIBRARY ROOT: the selected control reads as
// the iOS-26/27 glass material-lift plate (`--glass-bg-floating`) + a translucent
// luminance-lift accent (`--dock-selected-accent`), the glyph stays warm-ink
// `--foreground`. Red survives ONLY as static brand ink (wordmark/viz/CTA).
//
// THE SOURCE GATE (proof-register-ios.mjs) proves the RECIPE STRUCTURE; THIS SPEC
// PROVES THE RENDER reads NO brand-red on a selected dock control in light+dark (the
// cardinal AX lesson — a green CPU gate over a still-red live render is the gap). It
// reads back, off the LIVE painted `:5199` DOM:
//   - the active rail item (`/dock/rail`, the first entry is active on load) — its
//     glyph `color` and its `::before` accent-bar `background`.
//   - a SELECTED dock icon-button (`/dock/overview`, aria-pressed forced in-test) —
//     its glyph `color` + its active plate `background`.
// and asserts (in BOTH light and dark, ≥2 viewports):
//   (1) the active glyph `color` is NOT `--viz-fourier` (oklch(0.579 0.201 30.4)
//       light / oklch(0.693 0.151 28.1) dark) — it resolves to the warm-ink/foreground.
//   (2) the active plate `background` is the `--glass-bg-floating` glass tier (the
//       `--dock-control-active-bg` material-lift) — translucent, not a solid brand fill.
//   (3) the rail `::before` accent bar `background` is a TRANSLUCENT luminance-lift
//       (< 1 alpha — the white/foreground shows through), NOT a solid brand stripe,
//       and is NOT `--viz-fourier`.
//
// THE BINDING ASSERTION IS THE getComputedStyle READBACK (axe-independent). Fail-CLOSED:
// a brand-red selected glyph/bar reds the readback, exit non-zero (never SKIP-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── oklab/sRGB plumbing (mirrors adaptive-glass.spec.ts — Chrome serializes the
// color-mix(in oklab, …) accent as oklab(); the readback must invert it) ──────────

function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}

function oklabToRgba(
    L: number,
    a: number,
    b: number,
    alpha: number,
): [number, number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return [gammaEncode(r), gammaEncode(g), gammaEncode(bl), alpha];
}

/** Parse a computed color → [r,g,b,a]; handles rgb()/rgba()/color(srgb …)/oklab(). */
function parseColor(str: string): [number, number, number, number] | null {
    if (!str || str === "transparent") return [0, 0, 0, 0];
    const oklab = str.match(
        /oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (oklab) {
        const num = (v: string) =>
            v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
        const L = num(oklab[1]!);
        const a = num(oklab[2]!);
        const b = num(oklab[3]!);
        const alpha = oklab[4] === undefined ? 1 : num(oklab[4]!);
        return oklabToRgba(L, a, b, alpha);
    }
    const oklch = str.match(
        /oklch\(\s*([\d.]+%?)\s+([\d.]+%?)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (oklch) {
        const num = (v: string) =>
            v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
        const L = num(oklch[1]!);
        const C = num(oklch[2]!);
        const hDeg = Number(oklch[3]!);
        const h = (hDeg * Math.PI) / 180;
        const a = C * Math.cos(h);
        const b = C * Math.sin(h);
        const alpha = oklch[4] === undefined ? 1 : num(oklch[4]!);
        return oklabToRgba(L, a, b, alpha);
    }
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

/** Euclidean distance between two rgb triples (0..255 per channel). */
function rgbDist(
    a: [number, number, number, number],
    b: [number, number, number, number],
): number {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

// The two --viz-fourier brand-red anchors (light / dark arm) the de-red retires from
// the interactive register. A selected glyph/bar reading within ~24 ΔE of either is a
// brand-red regression (the binding negative).
const RED_LIGHT = parseColor("oklch(0.579 0.201 30.4)")!;
const RED_DARK = parseColor("oklch(0.693 0.151 28.1)")!;
const RED_TOLERANCE = 24; // ΔE in sRGB — comfortably tighter than the warm-ink/foreground separation.

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

interface SelectedReadout {
    /** the active glyph color (the readback's primary negative — must NOT be red). */
    glyph: string;
    /** the active plate background (must be the --glass-bg-floating glass tier). */
    plateBg: string;
    /** the ::before accent bar background (rail only; "" when none). */
    barBg: string;
    /** the bar's alpha (translucency tell — a luminance-lift is < 1 alpha). */
    barAlpha: number;
}

test.describe("register-ios (π lane — the de-red'd iOS selected register, fail-CLOSED)", () => {
    // ── The RAIL selected item: the accent BAR + the glyph color ─────────────────
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`rail selected item reads iOS glass (no brand-red) @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto("/dock/rail", { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(200);

                const readout = await page.evaluate(() => {
                    // The first rail item is active on load (active = "primitives").
                    const item = document.querySelector(
                        '.glass-dock.variant-rail .dock-icon-button[aria-current="page"]',
                    ) as HTMLElement | null;
                    if (!item) return null;
                    const cs = getComputedStyle(item);
                    const before = getComputedStyle(item, "::before");
                    const barBg = before.backgroundColor;
                    const alphaMatch =
                        barBg.match(/\/\s*([\d.]+)\s*\)/) ??
                        barBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                    return {
                        glyph: cs.color,
                        plateBg: cs.backgroundColor,
                        barBg,
                        barAlpha: alphaMatch ? Number(alphaMatch[1]) : 1,
                    } satisfies SelectedReadout;
                });

                expect(readout, "could not find the active rail item").not.toBeNull();
                const r = readout!;
                const red = dark ? RED_DARK : RED_LIGHT;

                // (1) the glyph is NOT brand-red.
                const glyph = parseColor(r.glyph);
                expect(glyph, `could not parse rail glyph color "${r.glyph}"`).not.toBeNull();
                expect(
                    rgbDist(glyph!, red),
                    `rail selected GLYPH "${r.glyph}" is within ${RED_TOLERANCE} ΔE of --viz-fourier brand-red (${mode}) — the de-red did NOT retire the interactive glyph`,
                ).toBeGreaterThan(RED_TOLERANCE);

                // (3) the accent BAR is a translucent luminance-lift, NOT brand-red.
                const bar = parseColor(r.barBg);
                expect(bar, `could not parse rail bar bg "${r.barBg}"`).not.toBeNull();
                expect(
                    rgbDist(bar!, red),
                    `rail accent BAR "${r.barBg}" is within ${RED_TOLERANCE} ΔE of --viz-fourier brand-red (${mode}) — the bar still paints the brand stripe`,
                ).toBeGreaterThan(RED_TOLERANCE);
                expect(
                    r.barAlpha,
                    `rail accent BAR "${r.barBg}" is opaque (alpha ${r.barAlpha}) — the luminance-lift must stay translucent (a brighter MATERIAL, not a solid stripe)`,
                ).toBeLessThan(0.995);
            });
        }
    }

    // ── A SELECTED dock icon-button: the glass material-lift plate + warm-ink glyph
    // The /dock/overview transport play/pause is the icon-button; force aria-pressed
    // in-test (it starts unpressed) so the active register paints, then read it back.
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`selected dock icon-button reads the glass plate (no brand-red) @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto("/dock/overview", { waitUntil: "networkidle" });
                await setDark(page, dark);

                const readout = await page.evaluate(() => {
                    // Any always-expanded dock icon-button; force the active state.
                    const btn = document.querySelector(
                        ".glass-dock .dock-icon-button",
                    ) as HTMLElement | null;
                    if (!btn) return null;
                    btn.setAttribute("aria-pressed", "true");
                    void btn.offsetHeight;
                    const cs = getComputedStyle(btn);
                    return {
                        glyph: cs.color,
                        plateBg: cs.backgroundColor,
                        barBg: "",
                        barAlpha: 1,
                    } satisfies SelectedReadout;
                });

                expect(readout, "could not find a dock icon-button").not.toBeNull();
                const r = readout!;
                const red = dark ? RED_DARK : RED_LIGHT;

                // (1) the glyph is NOT brand-red.
                const glyph = parseColor(r.glyph);
                expect(glyph, `could not parse icon-button glyph "${r.glyph}"`).not.toBeNull();
                expect(
                    rgbDist(glyph!, red),
                    `selected icon-button GLYPH "${r.glyph}" is within ${RED_TOLERANCE} ΔE of --viz-fourier brand-red (${mode})`,
                ).toBeGreaterThan(RED_TOLERANCE);

                // (2) the active plate is the glass material-lift tier — translucent,
                // not a solid brand fill. (A --glass-bg-floating mix resolves to a
                // < 1 alpha mix; a solid brand fill would be opaque + red.)
                const plate = parseColor(r.plateBg);
                expect(plate, `could not parse icon-button plate bg "${r.plateBg}"`).not.toBeNull();
                expect(
                    rgbDist(plate!, red),
                    `selected icon-button PLATE "${r.plateBg}" is within ${RED_TOLERANCE} ΔE of --viz-fourier brand-red (${mode}) — the active plate is a brand fill, not the glass tier`,
                ).toBeGreaterThan(RED_TOLERANCE);
                expect(
                    plate![3],
                    `selected icon-button PLATE "${r.plateBg}" is opaque (alpha ${plate![3]}) — the iOS material-lift plate must stay translucent glass`,
                ).toBeLessThan(0.995);
            });
        }
    }

    // ── G-CLOSE — capture the de-red DELTA PNGs (the cardinal-lesson artefact;
    // filename ^W-REGISTER-IOS-* per the ledger own-surface clause). The rail dock
    // with its selected item (the glass plate + the luminance-lift bar, no red) at
    // {light,dark}. ──────────────────────────────────────────────────────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`G-CLOSE — capture the rail selected-register DELTA (${mode})`, async ({
            page,
        }) => {
            const { fileURLToPath } = await import("node:url");
            const { mkdirSync } = await import("node:fs");
            const VISUAL_DIR = fileURLToPath(
                new URL("../docs/tranches/AZ/audit/visual/", import.meta.url),
            );
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto("/dock/rail", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);
            const dock = page
                .locator(".glass-dock.variant-rail")
                .first();
            await dock.screenshot({
                path: `${VISUAL_DIR}W-REGISTER-IOS-rail-desktop-${mode}.png`,
            });
        });
    }
});
