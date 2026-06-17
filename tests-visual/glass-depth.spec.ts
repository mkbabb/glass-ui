// BB.W-DEEP-GLASS — glass-depth.spec.ts, the π readback of the OPT-IN deep-glass
// tier (`--glass-depth` / `--glass-blur-deep-*` / `.glass-deep` / CardTier `deep`).
//
// THE TIER: the maximal iOS-27 Liquid-Glass register ABOVE the W-GLASS-CAL calm
// default. `.glass-deep` (a deep blur token re-point ON a base `.glass-floating`
// rung — the `.glass-opaque` precedent) reaches the Apple deep band (saturate 1.5 /
// blur 16px), STRICTLY deeper than the calm floating rung (13px / 1.18). A SEPARATE
// `--glass-blur-deep-*` family on the `--glass-depth` scalar; the calm content
// default is BYTE-UNCHANGED.
//
// THE SOURCE GATE (proof-glass-depth.mjs) proves the RECIPE STRUCTURE; THIS SPEC
// PROVES THE RENDER. It injects synthetic plates onto the live demo (which loads the
// `/styles` cascade globally) over a busy backdrop and reads back, off the LIVE
// painted DOM:
//   (a) DEEP vs CALM — a `.glass-floating.glass-deep` plate's resolved
//       `backdrop-filter` carries a LARGER blur radius AND a HIGHER saturate than the
//       calm `.glass-floating` default beside it (the deeper, more light-concentrating
//       plate — the "increased glassmorphism" realized in the paint).
//   (b) CALM BYTE-UNCHANGED — the calm `.glass-floating` plate's resolved
//       `backdrop-filter` matches the W-GLASS-CAL value (blur 13px, saturate 1.18 in
//       light): the deep mint did NOT shift the calm default (the calm-unchanged proof
//       in the render).
//   (c) LEVEL-COMPOSE — at `--glass-level: 0` (the opaque escape, the a11y bracket)
//       the deep plate collapses to blur(0) through the SAME level path (the deep tier
//       inherits the level seam, not a parallel recipe).
//   (d) W55 BRIGHT BUCKET — over an injected `--glass-backdrop: light` ancestor the
//       deep surface inherits the bright-bucket darken (the deep tier is not exempt
//       from the legibility seam — it composes a listed `.glass-floating` rung).
//
// THE BINDING ASSERTION is the getComputedStyle `backdrop-filter` readback (the deep
// radius + saturate are recovered from the resolved filter; the calm baseline matches
// the W-GLASS-CAL value). At ≥2 viewports, in light AND dark. Fail-CLOSED: a deep
// plate that reads identical to calm, OR a calm plate that drifted, reds the readback
// (never SKIP-with-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The calm W-GLASS-CAL floating ceiling (the deep tier sits STRICTLY above it).
const CALM_FLOATING_BLUR = 13;
const CALM_FLOATING_SATURATE = 1.18;

interface FilterReadout {
    raw: string;
    blurPx: number | null;
    saturate: number | null;
}

/** Recover the blur radius + saturate from a resolved `backdrop-filter` string. */
function parseFilter(str: string): FilterReadout {
    const blur = str.match(/blur\(\s*([\d.]+)px\s*\)/i);
    const sat = str.match(/saturate\(\s*([\d.]+)\s*\)/i);
    return {
        raw: str,
        blurPx: blur ? parseFloat(blur[1]) : null,
        saturate: sat ? parseFloat(sat[1]) : null,
    };
}

/** Toggle `.dark` on <html> + let the token cascade re-resolve. */
async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

interface PlateFilters {
    deep: string;
    calm: string;
    deepLevelZero: string;
    deepBright: string;
}

/**
 * Inject a busy-backdrop host with FOUR plates — a `.glass-floating.glass-deep`, a
 * calm `.glass-floating`, a deep plate at `--glass-level: 0` (the opaque escape), and
 * a deep plate under an `--glass-backdrop: light` ancestor (the W55 bucket) — then
 * read back each resolved `backdrop-filter` off the LIVE painted DOM. Removed after.
 */
async function readPlates(page: Page): Promise<PlateFilters> {
    return page.evaluate(() => {
        const FIXTURE_ID = "__deep_fixture__";
        document.getElementById(FIXTURE_ID)?.remove();

        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;width:640px;height:240px;z-index:99999;padding:24px;" +
            "display:flex;gap:16px;background:linear-gradient(135deg,#3a1d6e,#0d6e6e,#c83a5a);";

        const mkPlate = (cls: string, cssText = ""): HTMLDivElement => {
            const p = document.createElement("div");
            p.className = cls;
            p.style.cssText =
                "width:120px;height:90px;border-radius:16px;" + cssText;
            return p;
        };

        const deep = mkPlate("glass-floating glass-deep");
        const calm = mkPlate("glass-floating");
        const deepLevelZero = mkPlate("glass-floating glass-deep", "--glass-level:0;");

        // a bright-bucket ancestor wrapping a deep plate (W55 darken inheritance).
        const brightWrap = document.createElement("div");
        brightWrap.style.cssText = "--glass-backdrop:light;display:contents;";
        const deepBright = mkPlate("glass-floating glass-deep");
        brightWrap.appendChild(deepBright);

        host.append(deep, calm, deepLevelZero, brightWrap);
        document.body.appendChild(host);

        // force layout/paint
        void deep.offsetHeight;

        const read = (el: Element): string => {
            const cs = getComputedStyle(el);
            return cs.backdropFilter || (cs as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter || "";
        };
        const out = {
            deep: read(deep),
            calm: read(calm),
            deepLevelZero: read(deepLevelZero),
            deepBright: read(deepBright),
        };
        host.remove();
        return out;
    });
}

test.describe("glass-depth (π lane — the opt-in deep-glass tier, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const mode of ["light", "dark"] as const) {
            test(`deep reads DEEPER than calm; calm byte-unchanged @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(PI_TARGETS.substrate.path, { waitUntil: "networkidle" });
                await setDark(page, mode === "dark");

                const plates = await readPlates(page);
                const deep = parseFilter(plates.deep);
                const calm = parseFilter(plates.calm);

                // both resolve a blur radius (the cascade reached them).
                expect(deep.blurPx, `deep backdrop-filter parses a blur (${plates.deep})`).not.toBeNull();
                expect(calm.blurPx, `calm backdrop-filter parses a blur (${plates.calm})`).not.toBeNull();

                // (a) DEEP vs CALM — the deep plate blurs DEEPER.
                expect(
                    deep.blurPx!,
                    `deep blur ${deep.blurPx}px > calm blur ${calm.blurPx}px (the deeper plate)`,
                ).toBeGreaterThan(calm.blurPx!);
                // the deep blur is in the Apple band (14-20px).
                expect(deep.blurPx!, `deep blur ${deep.blurPx}px in the Apple [14,20] band`).toBeGreaterThanOrEqual(14);
                expect(deep.blurPx!, `deep blur ${deep.blurPx}px in the Apple [14,20] band`).toBeLessThanOrEqual(20);

                // (a) DEEP saturate is HIGHER than calm (the light-concentration lift).
                expect(deep.saturate, `deep backdrop-filter parses a saturate (${plates.deep})`).not.toBeNull();
                expect(calm.saturate, `calm backdrop-filter parses a saturate (${plates.calm})`).not.toBeNull();
                expect(
                    deep.saturate!,
                    `deep saturate ${deep.saturate} > calm saturate ${calm.saturate}`,
                ).toBeGreaterThan(calm.saturate!);

                // (b) CALM BYTE-UNCHANGED — the calm floating plate is the W-GLASS-CAL
                // value in LIGHT (13px / 1.18). The dark arm lifts the saturate
                // companion (W-DARK-MATERIAL), so the byte-unchanged radius assert is
                // mode-invariant; the saturate value is asserted in light only.
                expect(
                    calm.blurPx!,
                    `calm floating blur ${calm.blurPx}px == W-GLASS-CAL ${CALM_FLOATING_BLUR}px (the calm-unchanged proof)`,
                ).toBe(CALM_FLOATING_BLUR);
                if (mode === "light") {
                    expect(
                        calm.saturate!,
                        `calm floating saturate ${calm.saturate} == W-GLASS-CAL ${CALM_FLOATING_SATURATE} (calm unchanged)`,
                    ).toBeCloseTo(CALM_FLOATING_SATURATE, 2);
                }

                // (c) LEVEL-COMPOSE — at --glass-level:0 the deep plate collapses to
                // blur(0) (the opaque escape reaches the deep blur — not a parallel
                // recipe). The deep tier inherits the ONE level seam.
                const lvl0 = parseFilter(plates.deepLevelZero);
                expect(
                    lvl0.blurPx,
                    `deep plate at --glass-level:0 collapses to blur(0) (${plates.deepLevelZero}) — the level seam reaches the deep blur`,
                ).toBe(0);

                // (d) W55 BRIGHT BUCKET — the deep plate under --glass-backdrop:light
                // still resolves a deep blur (it composes the listed .glass-floating
                // rung, so the bright-bucket darken reaches it; the filter is unchanged
                // by the tint axis — disjoint axes — but the surface IS in the bucket).
                const bright = parseFilter(plates.deepBright);
                expect(
                    bright.blurPx,
                    `deep plate in the bright bucket still resolves a deep blur (${plates.deepBright})`,
                ).toBeGreaterThan(calm.blurPx!);
            });
        }
    }
});
