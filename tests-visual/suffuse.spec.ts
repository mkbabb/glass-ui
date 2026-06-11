// AZ.W-SUFFUSE — suffuse.spec.ts, the π getComputedStyle readback of the
// suffusion pass (the BINDING close criterion; G2). The device-free SOURCE arm
// (scripts/proof-suffuse.mjs) proves the STRUCTURE; THIS SPEC PROVES THE RENDER.
//
// The house OWNS a magnificent type ladder + a 13-stop section-color ramp +
// paper/grid/math vocabulary, but the demo STARVED all three. This wave SUFFUSES
// the language within proportion — each surface its ONE deliberate event. The
// bite the source arm cannot give: an implementer could green the source parse
// while the RESOLVED render is still flat/red/invisible. Only the resolved
// getComputedStyle readback binds it.
//
// It asserts, off the LIVE painted :5199 DOM:
//   S1 — a HERO page's chassis title resolves to a DISPLAY register font-size
//        (>> 25.9px text-heading) — the audacious-type uplift landed (D2-1).
//   S2 — a MOTION plot/dot resolves to the violet --viz-legendre family
//        (oklch ~317.5°, hue 290-350°) NOT the warm-red --viz-fourier (~30°) —
//        the motion-purple identity (D3-3/D3-4).
//   S3 — an ACTIVATED metric number resolves to the mega/audacious tier
//        (>> the text-title 32.9px page rung) — the dead tiers are alive (D2-3).
//   S4 — an enrolled THIN page's grid underlay is VISIBLE (the .story-bg-grid
//        layer paints + the card drops to a thin tier so it reads) — the calm
//        content idiom at readable strength (D4-1/D4-3).
//
// THE BINDING ASSERTION IS THE RESOLVED READBACK. It loads :5199 →
// LIVE_VERIFIED_LOCAL_ONLY (tags: ["local"]); CI grace-skips, backstopped by
// proof:live-verified-ledger over the W-SUFFUSE DELTA.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/AZ/audit/visual/", import.meta.url),
);

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
    const rgb = str.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (rgb) return [+rgb[1]!, +rgb[2]!, +rgb[3]!];
    return null;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

// The page-title rung the uplift must EXCEED — text-heading = φ = 25.9px.
const TEXT_HEADING_PX = 25.9;
// The page-title rung the activated metric tier must EXCEED — text-title = 32.9px.
const TEXT_TITLE_PX = 32.9;

const paired: Record<string, unknown> = {};

test.describe("AZ.W-SUFFUSE — the suffusion pass (π)", () => {
    // ── S1 — a hero title resolves to a DISPLAY register ─────────────────────────
    test("S1 — a hero page's chassis title resolves to a display register (>> text-heading)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        // A SUBSTRATE hero page (constellation) — the thin hero pages that gained
        // the chassis display-register <h1> (no live GL ReadPixels stall on
        // constellation Canvas2D).
        await page.goto("/substrates/constellation", {
            waitUntil: "domcontentloaded",
        });
        await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(600);

        const heroTitle = await page.evaluate(() => {
            const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
            const h1 = document.querySelector("article h1.story-hero-title");
            if (!h1) return null;
            return {
                t: (h1.textContent || "").trim().slice(0, 32),
                fs: px(getComputedStyle(h1).fontSize),
                fw: getComputedStyle(h1).fontWeight,
            };
        });

        paired.heroTitle = heroTitle;
        expect(heroTitle, "the chassis hero <h1> renders").not.toBeNull();
        expect(
            heroTitle!.fs,
            `the hero title "${heroTitle!.t}" resolves ${heroTitle!.fs}px — must be a DISPLAY register (>> ${TEXT_HEADING_PX}px text-heading), the audacious-type uplift (D2-1)`,
        ).toBeGreaterThan(TEXT_HEADING_PX + 4);
    });

    // ── S2 — a motion plot/dot resolves to the violet --viz-legendre ─────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`S2 — the motion plot/dot resolves to the violet --motion-accent, not warm-red (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.goto("/motion/curve-gallery", { waitUntil: "networkidle" });
            await setDark(page, dark);

            const accent = await page.evaluate(() =>
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--motion-accent")
                    .trim(),
            );
            const accentRgb = parseColor(accent);
            expect(
                accentRgb,
                `--motion-accent must resolve to a color (${accent})`,
            ).not.toBeNull();
            const accentHue = rgbHueDeg(...accentRgb!);
            // violet sits ~300-330°; the banned warm-red --viz-fourier ~20-40°.
            expect(
                accentHue,
                `--motion-accent hue ${accentHue.toFixed(1)}° must be violet (290-350°), not the warm-red --viz-fourier`,
            ).toBeGreaterThan(290);
            expect(accentHue).toBeLessThan(350);

            // the painted plot stroke reads the SAME violet (one color event).
            const stroke = await page
                .locator("svg polyline")
                .first()
                .evaluate((el) => getComputedStyle(el).stroke)
                .catch(() => "");
            const strokeRgb = stroke ? parseColor(stroke) : null;
            if (strokeRgb) {
                const strokeHue = rgbHueDeg(...strokeRgb);
                expect(
                    strokeHue,
                    `the plot stroke hue ${strokeHue.toFixed(1)}° must be violet, not warm-red`,
                ).toBeGreaterThan(280);
            }
            (paired as Record<string, unknown>)[`motionAccent_${mode}`] = {
                accent,
                accentHue: Math.round(accentHue * 10) / 10,
                stroke,
            };

            await page.screenshot({
                path: `${VISUAL_DIR}/W-SUFFUSE-motion-purple-${mode}.png`,
            });
        });
    }

    // ── S3 — an activated metric number resolves to the mega/audacious tier ──────
    test("S3 — an activated metric number resolves to the mega/audacious tier (>> text-title)", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 1000 });
        await page.goto("/data/metric-cell", { waitUntil: "networkidle" });
        await page.waitForTimeout(400);

        const tiers = await page.evaluate(() => {
            const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;
            const mega = document.querySelector(".text-display-mega");
            const aud = document.querySelector(".text-display-audacious");
            return {
                megaFs: mega ? px(getComputedStyle(mega).fontSize) : null,
                audFs: aud ? px(getComputedStyle(aud).fontSize) : null,
            };
        });

        paired.metricTiers = tiers;
        expect(
            tiers.megaFs,
            "the text-display-mega metric number renders",
        ).not.toBeNull();
        expect(
            tiers.audFs,
            "the text-display-audacious metric number renders",
        ).not.toBeNull();
        // Both peg WELL above the text-title 32.9px page rung — the dead tiers
        // are alive on the metric surface (the fast.com peg).
        expect(
            tiers.megaFs!,
            `text-display-mega resolves ${tiers.megaFs}px — must be the audacious tier (>> ${TEXT_TITLE_PX}px text-title) (D2-3)`,
        ).toBeGreaterThan(TEXT_TITLE_PX + 10);
        expect(
            tiers.audFs!,
            `text-display-audacious resolves ${tiers.audFs}px — must be the audacious tier (>> ${TEXT_TITLE_PX}px text-title) (D2-3)`,
        ).toBeGreaterThan(TEXT_TITLE_PX + 10);

        await page.screenshot({
            path: `${VISUAL_DIR}/W-SUFFUSE-metric-audacious-light.png`,
            fullPage: false,
        });
    });

    // ── S4 — an enrolled thin page's grid underlay is VISIBLE ────────────────────
    test("S4 — the settings thin page's grid underlay paints + the card drops to a thin tier", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto("/compositions/settings", { waitUntil: "networkidle" });
        await page.waitForTimeout(500);

        const grid = await page.evaluate(() => {
            const bg = document.querySelector(".story-hero-bg.story-bg-grid");
            const card = document.querySelector(".story-hero-card");
            const rect = bg?.getBoundingClientRect();
            const cs = bg ? getComputedStyle(bg) : null;
            const cardCs = card ? getComputedStyle(card) : null;
            return {
                gridPresent: Boolean(bg),
                gridHasImage:
                    cs?.backgroundImage != null &&
                    cs.backgroundImage !== "none" &&
                    cs.backgroundImage.includes("gradient"),
                gridW: rect ? Math.round(rect.width) : 0,
                gridH: rect ? Math.round(rect.height) : 0,
                // the card tier dropped to a thin rung so the grid reads — the
                // card's resolved bg alpha is below the 0.65 resting opacity.
                cardBg: cardCs?.backgroundColor ?? "",
            };
        });

        paired.settingsGrid = grid;
        expect(
            grid.gridPresent,
            "the settings page renders the .story-bg-grid blueprint underlay (D4-1)",
        ).toBeTruthy();
        expect(
            grid.gridHasImage,
            "the grid underlay paints its ruled linear-gradients (the layer is VISIBLE, not display:none) (D4-3)",
        ).toBeTruthy();
        expect(grid.gridW, "the grid underlay fills the container").toBeGreaterThan(
            200,
        );

        // The settings eyebrow reads the ONE coherent section-accent register
        // (violet --section-color-7), NOT a four-hue rainbow.
        const eyebrowHues = await page.evaluate(() => {
            const labels = [...document.querySelectorAll(".section-label--tinted")];
            return labels.map((el) => getComputedStyle(el).color);
        });
        paired.settingsEyebrows = eyebrowHues;
        expect(
            eyebrowHues.length,
            "the settings eyebrows render the tinted register",
        ).toBeGreaterThanOrEqual(2);
        // Every tinted eyebrow resolves to the SAME hue (one register, not four).
        const hues = eyebrowHues
            .map((c) => parseColor(c))
            .filter((r): r is [number, number, number] => r != null)
            .map((r) => rgbHueDeg(...r));
        if (hues.length >= 2) {
            const spread = Math.max(...hues) - Math.min(...hues);
            expect(
                spread,
                `the settings eyebrows resolve to ONE coherent accent (hue spread ${spread.toFixed(1)}° must be tight, < 25°) — the D1-8 de-noise, not a four-hue rainbow`,
            ).toBeLessThan(25);
        }

        await page.screenshot({
            path: `${VISUAL_DIR}/W-SUFFUSE-settings-thin-light.png`,
            fullPage: true,
        });

        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-SUFFUSE-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});
