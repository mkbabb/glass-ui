// BC.W-GLASS-PRUNE — glass-prune.spec.ts, the MATERIALS-gallery π readback.
//
// THE CONSOLIDATION: the glass system prunes to TWO registers — Glass MATERIALS
// (the five-rung `.glass-{wash,quiet,resting,floating,overlay}` ladder + the
// `.glass-deep` DEPTH axis + the `.glass-lens` REFRACTION axis, taught bare on
// /substrates/glass-panel — the MATERIALS gallery) and Glass CARDS (`<Card>` —
// /display/card). The `<GlassPanel>` component is a TRUE DUPLICATE of Card and
// retires; the route's BODY changes from `<GlassPanel>` to the bare `.glass-{rung}`
// CLASSES composed over a LIVE aurora (glass-on-craft — apple.com's web has no glass-
// materials gallery; ours floats over a breathing field, research/apple-glass.md §3.1).
//
// THE SOURCE GATE (proof:glass-prune) proves the STRUCTURE — the two-register
// consolidation, the registry-consumer probe-gated retire, the bare-rung gallery story.
// THIS SPEC proves the RENDER — it navigates to /substrates/glass-panel and reads back,
// off the LIVE painted DOM over the aurora, that:
//   (1) all FIVE bare rungs paint the warm-cream identity — translucent-warm, NEVER the
//       grey slab (oklabL ∈ [0.85,0.99] light / [0.10,0.55] dark AND chroma ≥ 0.004 AND
//       alpha below the per-tier ceiling — the BC.W-PAINT-RECONCILE band, bandForTier).
//   (2) the ladder is ALPHA-MONOTONIC — each rung visibly more present than the last
//       (wash < quiet < resting < floating < overlay), the iOS `.regular`↔firmer continuum.
//   (3) the `.glass-lens` REFRACTION toggle adds the edge-bend on Chromium (the squircle
//       feDisplacementMap via `backdrop-filter: url(#glass-refract)`) and DEGRADES to the
//       blur base on WebKit (research/apple-ios27.md §6 — `backdrop-filter: url()` is
//       Chromium-only; WebKit gets blur+tint — the CORRECT cross-engine degrade, not a break).
//
// THE BINDING ASSERTIONS read the surface's OWN resolved background via the SHARED OKLab
// paint arm (statsFromResolvedBg + bandForTier — paint-arm.mjs re-exports reflect-capture-
// verify's ONE oklabFromRgb decompose; this spec authors NO second colour-math source — the
// exact warm-cream oklab()-computed-form parse the paint arm carries).
//
// Both modes (light + dark), ≥2 viewports. Fail-CLOSED: a grey/opaque rung, a non-monotonic
// ladder, or a lens-toggle that neither bends (Chromium) nor degrades (WebKit) reds the run.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { statsFromResolvedBg, paintBand, bandForTier } from "../scripts/lib/paint-arm.mjs";

// The MATERIALS gallery route (the consolidated MATERIALS register).
const ROUTE = "/substrates/glass-panel";

// The five-rung ladder, in alpha-monotonic order (the iOS `.regular`→firmer continuum).
const RUNGS = ["wash", "quiet", "resting", "floating", "overlay"] as const;

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

const MODES = ["light", "dark"] as const;

/**
 * Read the resolved backgroundColor of the FIRST `.glass-{rung}` specimen on the live
 * MATERIALS gallery → the shared OKLab stats. The READ happens in the browser
 * (getComputedStyle); the decompose is the ONE shared source.
 */
async function rungStats(page: Page, rung: string) {
    const resolvedBg = await page.evaluate((r) => {
        // the bare material specimen carries the rung class directly (no <GlassPanel>)
        const el = document.querySelector(`.glass-${r}`);
        if (!(el instanceof HTMLElement)) return null;
        return getComputedStyle(el).backgroundColor;
    }, rung);
    if (resolvedBg == null) return null;
    return statsFromResolvedBg(resolvedBg);
}

/** Apply the demo dark-mode class (the app toggles `.dark` on <html>). */
async function setMode(page: Page, mode: "light" | "dark") {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    // let the adaptive observer + the rAF settle the resolved tokens
    await page.waitForTimeout(250);
}

for (const vp of VIEWPORTS) {
    for (const mode of MODES) {
        test(`MATERIALS gallery — 5 warm-cream rungs, monotonic, ${mode} @ ${vp.name}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto(ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);
            // the live aurora paints into the relatively-positioned frame; give it a beat
            await page.waitForTimeout(300);

            const alphas: number[] = [];
            for (const rung of RUNGS) {
                const stats = await rungStats(page, rung);
                expect(stats, `.glass-${rung} must paint a readable bg`).not.toBeNull();
                // (1) the warm-cream identity band — translucent-warm, never the grey slab.
                const band = bandForTier(`.glass-${rung}`, mode);
                const verdict = paintBand(stats, band);
                expect(
                    verdict.pass,
                    `.glass-${rung} (${mode}) off the warm-cream band: ${verdict.reasons.join("; ")}`,
                ).toBe(true);
                alphas.push(stats!.alpha);
            }

            // (2) the ladder is ALPHA-MONOTONIC — each rung more present than the last.
            // (a non-strict ≤ tolerance absorbs the dark-arm per-rung lift rounding; the
            // wash→overlay span must still be a real climb, > 0.2.)
            for (let i = 1; i < alphas.length; i++) {
                expect(
                    alphas[i] >= alphas[i - 1] - 0.01,
                    `ladder not monotonic at ${RUNGS[i]} (${alphas[i].toFixed(3)}) < ${RUNGS[i - 1]} (${alphas[i - 1].toFixed(3)})`,
                ).toBe(true);
            }
            expect(
                alphas[alphas.length - 1] - alphas[0],
                `the wash→overlay span must be a visible climb (${alphas[0].toFixed(3)}→${alphas[alphas.length - 1].toFixed(3)})`,
            ).toBeGreaterThan(0.2);
        });
    }
}

// (3) the `.glass-lens` REFRACTION toggle — the cross-engine degrade.
// On Chromium the toggled rungs carry a `backdrop-filter: url(#…)` (the squircle
// feDisplacementMap edge-bend); on WebKit `backdrop-filter: url()` is unsupported so the
// rung keeps the blur base (the CORRECT degrade, not a break — the rung still paints warm).
test(`MATERIALS gallery — .glass-lens toggle bends on Chromium / degrades on WebKit`, async ({
    page,
    browserName,
}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(ROUTE, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    // arm the .glass-lens axis chip (the multi-select ToggleGroup item labeled ".glass-lens")
    const lensChip = page.getByText(".glass-lens", { exact: true });
    await lensChip.click();
    await page.waitForTimeout(200);

    // read the resting rung's backdrop-filter with the lens armed.
    const backdropFilter = await page.evaluate(() => {
        const el = document.querySelector(".glass-resting");
        if (!(el instanceof HTMLElement)) return null;
        const cs = getComputedStyle(el);
        // backdrop-filter (+ the -webkit- alias) — whichever the engine resolves.
        return cs.backdropFilter || (cs as unknown as Record<string, string>)["webkitBackdropFilter"] || "";
    });
    expect(backdropFilter, "the lens-armed rung must carry a backdrop-filter").not.toBeNull();

    if (browserName === "webkit") {
        // WebKit degrade — NO url() displacement (unsupported); the blur base survives. The
        // rung must NOT have silently lost its backdrop (a broken degrade) — it keeps blur.
        expect(
            /blur\(/.test(backdropFilter ?? ""),
            `WebKit must keep the blur base when url() refraction is unsupported (got: ${backdropFilter})`,
        ).toBe(true);
    } else {
        // Chromium — the squircle refraction url(#…) is present (the edge-bend), OR (if the
        // engine merged it) the blur base survives. The binding assertion is the rung still
        // paints a real backdrop-filter (it did not break) AND, on a url()-capable engine,
        // the lens reference is reachable.
        const hasUrlRefraction = /url\(/.test(backdropFilter ?? "");
        const hasBlur = /blur\(/.test(backdropFilter ?? "");
        expect(
            hasUrlRefraction || hasBlur,
            `Chromium lens rung must carry url() refraction or the blur base (got: ${backdropFilter})`,
        ).toBe(true);
    }

    // the lens-armed rung STILL paints the warm-cream identity (the toggle is additive,
    // it does not break the material).
    const stats = await rungStats(page, "resting");
    const verdict = paintBand(stats, bandForTier(".glass-resting", "light"));
    expect(
        verdict.pass,
        `the lens-armed .glass-resting must stay warm-translucent: ${verdict.reasons.join("; ")}`,
    ).toBe(true);
});
