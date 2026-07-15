// BA.W-SUFFUSE2 — suffuse2.spec.ts, the π getComputedStyle readback of the
// per-category color identity spread (the binding browser criterion; G2).
// Device-free assertions cover structure; this scenario covers the render.
//
// The source arm can parse the eyebrow/rail/chip markup while the RESOLVED render
// is still flat (the identity did not take) or rainbow (a second event slipped
// in). Only the resolved getComputedStyle readback binds it — the AZ/P-1
// source-green/visually-broken gap.
//
// It asserts, off the LIVE painted :5199 DOM, in BOTH modes:
//   S1 — a forms page (/forms/checks, stop 3 teal) — the eyebrow color + the rail
//        border-color + the chip backplate resolve to the SAME hue family (the
//        POSITIVE per-category token test, not a ≠-string).
//   S2 — a containers page (/containers/accordion, stop 2 blue) — same three-site
//        coherence on the mapped stop.
//   S3 — a data page (/data/table, stop 9 slate) — same three-site coherence.
//   S4 — a content page's chrome <h1> font-size resolves strictly ABOVE the
//        section <h2> font-size (the HS-2 rung grade).
//   S5 — the motion band (/motion/countup) reads --motion-accent violet (hue
//        290-350°), no warm-red.
//
// THE BINDING ASSERTION IS THE RESOLVED READBACK. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by the
// W-SUFFUSE2 DELTA.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);
try {
    mkdirSync(VISUAL_DIR, { recursive: true });
} catch {
    /* exists */
}

// ── oklab/sRGB plumbing (Chrome serializes oklch()/oklab() — invert to hue) ──────
function lin(c: number): number {
    const x = c / 255;
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function rgbHueDeg(r: number, g: number, b: number): number {
    const R = lin(r),
        G = lin(g),
        B = lin(b);
    const l = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B;
    const m = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B;
    const s = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B;
    const l_ = Math.cbrt(l),
        m_ = Math.cbrt(m),
        s_ = Math.cbrt(s);
    const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
    const Bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
    let h = (Math.atan2(Bb, A) * 180) / Math.PI;
    if (h < 0) h += 360;
    return h;
}
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}
function oklabToRgb(L: number, a: number, b: number): [number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3,
        m = m_ ** 3,
        s = s_ ** 3;
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return [gammaEncode(r), gammaEncode(g), gammaEncode(bl)];
}
function parseColor(str: string): [number, number, number] | null {
    if (!str || str === "transparent" || str === "none") return null;
    const oklch = str.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i);
    if (oklch) {
        const L = oklch[1]!.endsWith("%")
            ? parseFloat(oklch[1]!) / 100
            : parseFloat(oklch[1]!);
        const C = parseFloat(oklch[2]!);
        const h = (parseFloat(oklch[3]!) * Math.PI) / 180;
        return oklabToRgb(L, C * Math.cos(h), C * Math.sin(h));
    }
    const oklab = str.match(/oklab\(\s*([\d.]+%?)\s+(-?[\d.]+)\s+(-?[\d.]+)/i);
    if (oklab) {
        const L = oklab[1]!.endsWith("%")
            ? parseFloat(oklab[1]!) / 100
            : parseFloat(oklab[1]!);
        return oklabToRgb(L, parseFloat(oklab[2]!), parseFloat(oklab[3]!));
    }
    // color(srgb r g b [/ a]) — the form Chrome serializes a color-mix(in srgb …)
    // into (the rail's translucent accent). r/g/b are 0..1; lift to 0..255.
    const colorSrgb = str.match(
        /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/i,
    );
    if (colorSrgb)
        return [
            Math.round(+colorSrgb[1]! * 255),
            Math.round(+colorSrgb[2]! * 255),
            Math.round(+colorSrgb[3]! * 255),
        ];
    const rgb = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (rgb) return [+rgb[1]!, +rgb[2]!, +rgb[3]!];
    return null;
}

// The shortest angular distance between two hues (0..180).
function hueDelta(a: number, b: number): number {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// Read the three-site identity on an enrolled page: the tinted eyebrow color, the
// rail (the header's border-inline-start-color), and the IconChip glyph color.
async function readThreeSite(page: Page): Promise<{
    eyebrow: string;
    rail: string;
    chipGlyph: string;
    chipPlate: string;
} | null> {
    return page.evaluate(() => {
        // The section-accent RAIL is the story's own header carrying border-l-[3px]
        // — NOT StoryPage's chrome <header> (article > header, classes
        // "flex flex-col gap-2"), which is earlier in document order and would win a
        // comma-list querySelector while carrying border-left-width:0 + the warm-ink
        // default border color (the per-category accent never reaches it).
        const header = document.querySelector(
            "article header.border-l-\\[3px\\]",
        ) as HTMLElement | null;
        const eyebrowEl = document.querySelector(
            "article .section-label--tinted",
        ) as HTMLElement | null;
        const chip = document.querySelector(
            "article .icon-chip",
        ) as HTMLElement | null;
        const glyph = chip?.querySelector(".icon-chip__glyph") as HTMLElement | null;
        if (!header || !eyebrowEl || !chip || !glyph) return null;
        const cs = getComputedStyle(header);
        return {
            eyebrow: getComputedStyle(eyebrowEl).color,
            rail:
                cs.borderInlineStartColor ||
                cs.borderLeftColor ||
                cs.getPropertyValue("border-left-color"),
            chipGlyph: getComputedStyle(glyph).color,
            chipPlate: getComputedStyle(chip).backgroundColor,
        };
    });
}

const paired: Record<string, unknown> = {};

// Each enrolled category page → its mapped --section-color stop's nominal hue.
// (--section-color-3 teal ≈ 220°, -2 blue ≈ 268°, -9 slate ≈ 239°, light/dark
// arms keep the same hue.)
const PER_CATEGORY = [
    { route: "/forms/checks", category: "forms", stop: 3 },
    { route: "/containers/accordion", category: "containers", stop: 2 },
    { route: "/data/table", category: "data", stop: 9 },
];

test.describe("BA.W-SUFFUSE2 — the per-category color identity (π)", () => {
    // ── S1-S3 — the per-category three-site coherence in BOTH modes ──────────────
    for (const { route, category, stop } of PER_CATEGORY) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`${category} (${route}) — eyebrow + rail + chip resolve to the SAME --section-color-${stop} hue (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: 1280, height: 900 });
                await page.goto(route, { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(250);

                const sites = await readThreeSite(page);
                expect(
                    sites,
                    `${route}: the eyebrow + rail + chip identity renders`,
                ).not.toBeNull();

                // The mapped stop's resolved hue (the page-root --section-color-N).
                const stopColor = await page.evaluate((n) => {
                    const probe = document.createElement("span");
                    probe.style.color = `var(--section-color-${n})`;
                    document.body.appendChild(probe);
                    const c = getComputedStyle(probe).color;
                    probe.remove();
                    return c;
                }, stop);
                const stopRgb = parseColor(stopColor);
                expect(stopRgb, `--section-color-${stop} resolves`).not.toBeNull();
                const stopHue = rgbHueDeg(...stopRgb!);

                // The eyebrow + chip glyph read the FULL stop hue (≤25° apart).
                const eyebrowRgb = parseColor(sites!.eyebrow);
                const glyphRgb = parseColor(sites!.chipGlyph);
                const railRgb = parseColor(sites!.rail);
                expect(eyebrowRgb, "the eyebrow resolves a color").not.toBeNull();
                expect(glyphRgb, "the chip glyph resolves a color").not.toBeNull();
                expect(railRgb, "the rail resolves a color").not.toBeNull();

                const eyebrowHue = rgbHueDeg(...eyebrowRgb!);
                const glyphHue = rgbHueDeg(...glyphRgb!);
                const railHue = rgbHueDeg(...railRgb!);

                (paired as Record<string, unknown>)[`${category}_${mode}`] = {
                    stopHue: Math.round(stopHue * 10) / 10,
                    eyebrowHue: Math.round(eyebrowHue * 10) / 10,
                    glyphHue: Math.round(glyphHue * 10) / 10,
                    railHue: Math.round(railHue * 10) / 10,
                };

                expect(
                    hueDelta(eyebrowHue, stopHue),
                    `${category} eyebrow hue ${eyebrowHue.toFixed(1)}° must match --section-color-${stop} ${stopHue.toFixed(1)}°`,
                ).toBeLessThan(25);
                expect(
                    hueDelta(glyphHue, stopHue),
                    `${category} chip glyph hue ${glyphHue.toFixed(1)}° must match the SAME stop ${stopHue.toFixed(1)}°`,
                ).toBeLessThan(25);
                expect(
                    hueDelta(railHue, stopHue),
                    `${category} rail hue ${railHue.toFixed(1)}° must match the SAME stop ${stopHue.toFixed(1)}° (the coherent identity — not a per-site rainbow)`,
                ).toBeLessThan(25);

                await page.screenshot({
                    path: `${VISUAL_DIR}/W-SUFFUSE2-${category}-${mode}.png`,
                    fullPage: true,
                });
            });
        }
    }

    // ── S4 — the content <h1> dominates the section <h2> (the rung grade) ────────
    test("S4 — the content chrome <h1> font-size resolves strictly ABOVE the section <h2>", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 1000 });
        await page.goto("/forms/checks", { waitUntil: "networkidle" });
        await page.waitForTimeout(250);

        const sizes = await page.evaluate(() => {
            const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
            const h1 = document.querySelector("article > header h1") as HTMLElement | null;
            const h2 = document.querySelector("article section h2") as HTMLElement | null;
            return {
                h1: h1 ? px(getComputedStyle(h1).fontSize) : null,
                h2: h2 ? px(getComputedStyle(h2).fontSize) : null,
            };
        });
        paired.rungGrade = sizes;
        expect(sizes.h1, "the content chrome <h1> renders").not.toBeNull();
        expect(sizes.h2, "a section <h2> renders").not.toBeNull();
        expect(
            sizes.h1!,
            `the content <h1> (${sizes.h1}px) must dominate the section <h2> (${sizes.h2}px) — the HS-2 rung grade`,
        ).toBeGreaterThan(sizes.h2! + 4);
    });

    // ── S5 — the motion band reads ONE coherent violet, no warm-red ──────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`S5 — the motion band reads --motion-accent violet, no warm-red (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/countup", { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page.waitForTimeout(250);

            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--motion-accent")
                    .trim(),
            );
            const accentRgb = parseColor(accent);
            expect(accentRgb, `--motion-accent resolves (${accent})`).not.toBeNull();
            const accentHue = rgbHueDeg(...accentRgb!);
            (paired as Record<string, unknown>)[`motion_${mode}`] = {
                accent,
                accentHue: Math.round(accentHue * 10) / 10,
            };
            expect(
                accentHue,
                `--motion-accent hue ${accentHue.toFixed(1)}° must be violet (290-350°), not the warm-red --viz-fourier`,
            ).toBeGreaterThan(290);
            expect(accentHue).toBeLessThan(350);

            // a painted motion marker reads the SAME violet.
            const marker = await page
                .locator("article .bg-\\[var\\(--motion-accent\\)\\]")
                .first()
                .evaluate((el) => getComputedStyle(el).backgroundColor)
                .catch(() => "");
            const markerRgb = marker ? parseColor(marker) : null;
            if (markerRgb) {
                const markerHue = rgbHueDeg(...markerRgb);
                expect(
                    hueDelta(markerHue, accentHue),
                    `the motion marker hue ${markerHue.toFixed(1)}° reads the SAME violet as --motion-accent`,
                ).toBeLessThan(25);
            }
        });
    }
});
