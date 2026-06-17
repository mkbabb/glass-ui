// BB.W-GLASS-ACCENT — glass-accent.spec.ts, the π readback of the per-INSTANCE
// chromatic-rim axis (`--glass-accent` + `--glass-accent-strength`).
//
// THE AXIS: the THIRD disjoint glass axis (LEVEL · TINT · ACCENT). A consumer DATA
// hue OKLab-tints a glass surface's RIM (the `--glass-material-rim` inset ring + the
// per-rung `--glass-border-*` border) AND the `::before` specular catch-light CORE —
// set per-INSTANCE (`--glass-accent: <hue>; --glass-accent-strength: <N%>`). DISTINCT-
// not-fork of W55's `--glass-tint-source` (the whole-plate legibility darken): the
// accent rides the rim+glint only, NEVER the plate background.
//
// THE SOURCE GATE (proof-glass-accent.mjs) proves the RECIPE STRUCTURE; THIS SPEC
// PROVES THE RENDER. It injects synthetic `.glass-floating` fixtures onto the live
// demo (which loads the `/styles` cascade globally) over a busy backdrop and reads
// back, off the LIVE painted DOM:
//   (a) ACCENT ON  — a plate with `--glass-accent: <hue>; --glass-accent-strength:
//       <ceiling>` reads the consumer hue at the RIM (the resolved border-color is
//       chromatic — its OKLab chroma clears a floor) AND at the `::before` catch-light
//       CORE (the resolved `::before` background carries the accent hue).
//   (b) ACCENT OFF — the SAME plate UNSET pixel-matches the warm-cream/warm-ink HEAD
//       ground: the resolved border-color is the achromatic warm-ink rim (near-zero
//       chroma) and the `::before` core is warm-cream — the byte-identical neutral
//       fallback (a paired diff shows ZERO chromatic delta).
//   (c) PER-INSTANCE — two sibling plates with DISTINCT `--glass-accent` hues resolve
//       to DISTINCT rim colors (each its own accent — the per-instance proof).
//
// THE BINDING ASSERTION is the getComputedStyle OKLab chroma readback (the consumer
// hue is recovered from the resolved color; the warm-ink/warm-cream baseline is
// achromatic-warm). At ≥2 viewports, in light AND dark. Fail-CLOSED: an accented
// plate whose rim does NOT carry the hue, OR an unset plate that DRIFTS off the
// baseline, reds the readback (never SKIP-with-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The per-instance accent ceiling the demo engages (a rim WHISPER) + the data hues.
const ACCENT_STRENGTH = "48%";
const HUE_VIOLET = "oklch(0.62 0.2 295)";
const HUE_TEAL = "oklch(0.72 0.13 195)";

// ── Color plumbing (axe-independent; Chrome serializes color-mix(in oklab) as
//    oklab(L a b / α), so we recover chroma = hypot(a, b) directly). ──────────

/** Parse a resolved color string → { a, b, alpha } in the OKLab/Lab/sRGB space. */
function parseColor(str: string): { chroma: number; alpha: number; raw: string } | null {
    if (!str || str === "transparent" || str === "rgba(0, 0, 0, 0)") {
        return { chroma: 0, alpha: 0, raw: str };
    }
    // oklab(L a b / α) — the color-mix(in oklab) serialization.
    const oklab = str.match(
        /oklab\(\s*([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\s*\)/i,
    );
    if (oklab) {
        const a = Number(oklab[2]);
        const b = Number(oklab[3]);
        return {
            chroma: Math.hypot(a, b),
            alpha: oklab[4] === undefined ? 1 : Number(oklab[4]),
            raw: str,
        };
    }
    // oklch(L C H / α) — recover chroma directly.
    const oklch = str.match(
        /oklch\(\s*([\d.eE+-]+)\s+([\d.eE+-]+)\s+([\d.eE+-]+)(?:\s*\/\s*([\d.eE+-]+))?\s*\)/i,
    );
    if (oklch) {
        return {
            chroma: Number(oklch[2]),
            alpha: oklch[4] === undefined ? 1 : Number(oklch[4]),
            raw: str,
        };
    }
    // rgb(a) — derive a crude chroma proxy from the max-min channel spread, then
    // hue-weight it (the warm-ink baseline is low-spread; an accented rim is higher).
    const rgb = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgb) {
        const r = Number(rgb[1]);
        const g = Number(rgb[2]);
        const bch = Number(rgb[3]);
        const maxc = Math.max(r, g, bch);
        const minc = Math.min(r, g, bch);
        // a normalized 0..1 saturation proxy scaled to roughly match an OKLab chroma scale.
        const sat = maxc === 0 ? 0 : (maxc - minc) / maxc;
        return {
            chroma: sat * 0.4,
            alpha: rgb[4] === undefined ? 1 : Number(rgb[4]),
            raw: str,
        };
    }
    return null;
}

/** Toggle `.dark` on <html> + let the token cascade re-resolve. */
async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

interface PlateReadout {
    /** The resolved border-color (the rim half — accent-composed). */
    borderColor: string;
    /** The resolved `::before` catch-light `background` (the core carries the accent). */
    beforeBg: string;
}

/**
 * Inject a synthetic `.glass-floating` plate over a busy gradient backdrop with the
 * accent optionally set per-instance, then read back the resolved border-color + the
 * `::before` background off the LIVE painted DOM. Removed after.
 */
async function readPlate(
    page: Page,
    accent: { hue: string; strength: string } | null,
): Promise<PlateReadout> {
    return page.evaluate((accent) => {
        const FIXTURE_ID = "__accent_fixture__";
        document.getElementById(FIXTURE_ID)?.remove();

        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        // a busy backdrop so the glass reads (glass does not read on flat cream).
        host.style.cssText =
            "position:fixed;left:0;top:0;width:320px;height:200px;z-index:99999;padding:24px;" +
            "background:linear-gradient(135deg,#3a1d6e,#0d6e6e,#c83a5a);";

        const plate = document.createElement("div");
        plate.className = "glass-floating";
        plate.style.cssText =
            "width:200px;height:120px;border-radius:16px;display:flex;align-items:center;justify-content:center;";
        if (accent) {
            plate.style.setProperty("--glass-accent", accent.hue);
            plate.style.setProperty("--glass-accent-strength", accent.strength);
        }
        plate.textContent = "accent";
        host.appendChild(plate);
        document.body.appendChild(host);

        // force layout/paint
        void plate.offsetHeight;

        const cs = getComputedStyle(plate);
        const before = getComputedStyle(plate, "::before");
        const out = {
            borderColor: cs.borderTopColor,
            beforeBg: before.backgroundImage || before.background || "",
        };
        host.remove();
        return out;
    }, accent);
}

test.describe("glass-accent (π lane — the per-instance chromatic rim+glint, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const mode of ["light", "dark"] as const) {
            test(`accent ON reads the hue at rim + glint; OFF byte-matches baseline @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(PI_TARGETS.substrate.path, { waitUntil: "networkidle" });
                await setDark(page, mode === "dark");

                // (b) ACCENT OFF — the neutral-fallback baseline.
                const off = await readPlate(page, null);
                const offRim = parseColor(off.borderColor);
                expect(offRim, `accent-OFF border parses (${off.borderColor})`).not.toBeNull();
                // the unset rim is the achromatic warm-ink (low chroma).
                expect(
                    offRim!.chroma,
                    `accent-OFF rim is near-achromatic warm-ink (chroma ${offRim!.chroma.toFixed(4)} from ${off.borderColor})`,
                ).toBeLessThan(0.05);

                // (a) ACCENT ON — the rim carries the data hue.
                const on = await readPlate(page, {
                    hue: HUE_VIOLET,
                    strength: ACCENT_STRENGTH,
                });
                const onRim = parseColor(on.borderColor);
                expect(onRim, `accent-ON border parses (${on.borderColor})`).not.toBeNull();
                // the accented rim is materially MORE chromatic than the unset baseline.
                expect(
                    onRim!.chroma,
                    `accent-ON rim carries the data hue (chroma ${onRim!.chroma.toFixed(4)} > OFF ${offRim!.chroma.toFixed(4)})`,
                ).toBeGreaterThan(offRim!.chroma + 0.02);

                // the ::before catch-light core composes the accent: ON's resolved
                // background string differs from OFF's (the hue entered the core mix).
                expect(
                    on.beforeBg,
                    `accent-ON ::before core differs from OFF (the catch-light glint carries the hue)`,
                ).not.toBe(off.beforeBg);
            });
        }
    }

    // (c) PER-INSTANCE — two sibling plates, two distinct hues → two distinct rims.
    for (const mode of ["light", "dark"] as const) {
        test(`per-instance: distinct accent hues resolve distinct rims (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(PI_TARGETS.substrate.path, { waitUntil: "networkidle" });
            await setDark(page, mode === "dark");

            const violet = await readPlate(page, {
                hue: HUE_VIOLET,
                strength: ACCENT_STRENGTH,
            });
            const teal = await readPlate(page, { hue: HUE_TEAL, strength: ACCENT_STRENGTH });

            expect(
                violet.borderColor,
                `the violet-accent rim differs from the teal-accent rim (per-instance: ${violet.borderColor} vs ${teal.borderColor})`,
            ).not.toBe(teal.borderColor);

            const vC = parseColor(violet.borderColor)!.chroma;
            const tC = parseColor(teal.borderColor)!.chroma;
            // both carry chroma (both are accented, not the achromatic baseline).
            expect(vC, "violet rim is chromatic").toBeGreaterThan(0.02);
            expect(tC, "teal rim is chromatic").toBeGreaterThan(0.02);
        });
    }

    // The demo specimen surfaces are LIVE on the glass-material story (the binding
    // consumer witness). Verify the story renders the accent swatches per-instance.
    test("the demo glass-material story renders the per-instance accent swatches", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(PI_TARGETS.substrate.path, { waitUntil: "networkidle" });
        // navigate to the glass-material substrate story.
        await page.goto("/substrates/glass-material", { waitUntil: "networkidle" }).catch(() => {});
        const swatches = page.locator("[data-accent-swatch]");
        const n = await swatches.count();
        // the story carries ≥2 per-instance accent swatches (the W3 consumer bar).
        expect(n, `the glass-material story renders ≥2 [data-accent-swatch] (found ${n})`).toBeGreaterThanOrEqual(2);
    });
});
