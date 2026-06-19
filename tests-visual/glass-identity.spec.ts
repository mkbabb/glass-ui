// BC.W-GLASS-IDENTITY — glass-identity.spec.ts, the live CALM-PAGE identity π readback
// (the warm-cream-translucent assertion over a calm-light backdrop; the BIDIRECTIONAL
// bound the monotonic gate lacked).
//
// THE DISEASE (postmortem/az.md §1-§2): the AZ.W-ADAPTIVE-AUTO unconditional 20%-AA darken
// greyed the warm-cream plate into the user's hated grey slab (`oklab(0.695 0.002 0.006 /
// 0.536)`), and it rode AZ→BA→BB UNTOUCHED for three tranches because the gate that should
// have caught it (`proof:adaptive-glass-live`) is MONOTONIC: a grey slab scores BETTER on
// `contrastRatio >= 4.5` + `deltaL >= 0.08` than the correct warm-cream plate. ZERO upper
// bound, ZERO warmth/chroma assertion.
//
// THE FIX (this spec, the π arm): over a CALM-LIGHT page every glass surface's OWN resolved
// background MUST read warm + translucent — oklab-L > 0.85 AND oklab-chroma > 0.004 AND
// alpha < 0.72 — NOT the grey slab. This is the BIDIRECTIONAL twin of the synthetic-white
// contrast arm in adaptive-glass-live.spec.ts: a grey slab PASSES the white arm (darkening
// over white raises contrast) yet FAILS here; the warm-cream identity passes BOTH. Born-RED
// on HEAD's grey dock; GREEN only on the warm-cream floor this wave ratifies.
//
// ONE colour-math source: the SHARED paint-arm.mjs leaf (statsFromResolvedBg + paintBand →
// reflect-capture-verify's oklabFromRgb) — the SAME band logic the device-free source gate
// (proof:glass-identity I3) and the live π arm read. This spec authors NO second decompose
// (the canvas-unify single-source fence).
//
// WebKit/Safari: the warm-cream base is `background` + `backdrop-filter: blur()+saturate()`
// (cross-engine — no `backdrop-filter: url()`), so the identity paints identically on Safari
// (apple-ios27.md §6). The cross-engine assertion is the source form (the device-free gate's
// reach is the no-url() fence), not a separate browser project — the two viewport projects
// (chromium-headless-new + coarse-touch) carry the live readback.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose + the per-tier band
// resolver (paint-arm.mjs re-exports reflect-capture-verify's oklabFromRgb). No second
// colour math. bandForTier is the ONE per-tier band the three live π specs share.
import { statsFromResolvedBg, paintBand, bandForTier } from "../scripts/lib/paint-arm.mjs";

// The calm-light identity band is now PER-TIER (paint-arm.mjs bandForTier — the warm-cream
// ladder is alpha-MONOTONIC by design, so a single flat alpha ceiling cannot bound the whole
// ladder: the content rungs sit translucent, the OVERLAY band rides heavier "modal-heavy").
// Every tier: oklab-L ∈ [0.85,0.99] light (light, not blown-out), chroma ≥ 0.004 (warm, not
// neutral grey — the warm-cream floor out-warms apple.com's cool #f5f5f7 ≈ chroma 0; every
// tier reads ~0.0065, the over-tight 0.01 was never the warm-cream value), alpha below the
// tier's ceiling (content < 0.72, overlay < 0.86 — the iOS "let content through" L6 clamp).
// Born-RED on HEAD's grey dock oklab(0.695 0.002 0.006 / 0.536): L too low (0.695 < 0.85),
// fails EVERY tier's band on L regardless of the alpha ceiling (the anti-disease invariant).

// The enrolled calm-page routes (the spec's named floor — /display/card, /dock/overview,
// /containers/dialog over a calm light page). /substrates/glass-material is OMITTED: it is a
// busy-aurora route (manifest `background: aurora`, hero: true), so its glass plates carry
// the adaptive darken (the observer writes a non-zero --glass-tint-strength over the bright
// field, pulling the card to L≈0.73 — the LEGITIMATE dynamic-range shift, NOT the calm-light
// REST identity). The busy-field treatment is the dock-at-REST read below (AURORA_ROUTE),
// twinned across both aurora-backed routes; the over-busy darken itself is W-ADAPTIVE-RECONCILE's.
const ROUTES = [
    "/display/card",
    "/dock/overview",
    "/containers/dialog",
] as const;

// The aurora routes read the dock-over-busy-field BASE: at REST the dock plate must read
// warm-cream (not pre-greyed — the dock holds the calm floor at rest, the content tiers
// darken); the dynamic darken over the busy field is W-ADAPTIVE-RECONCILE's. Both
// aurora-backed routes (the dedicated aurora + glass-material's hero aurora) carry it.
const AURORA_ROUTES = ["/substrates/aurora", "/substrates/glass-material"] as const;

interface SurfaceReadout {
    selector: string;
    surfaceBg: string;
}

/**
 * Read each in-situ glass surface's OWN resolved background with NO injected ancestor
 * bucket — the calm-light identity must hold via the surface's OWN `:where()` floor rule.
 * The body-bearing discount (mirrors adaptive-glass-live.spec.ts): a panel-sized,
 * text-bearing glass surface — NOT a decorative control affordance (a Switch/Toggle track
 * composes `.glass-wash` but paints a saturated loud-pill fill, not the warm-cream base).
 */
async function readGlassSurfaces(page: Page): Promise<SurfaceReadout[]> {
    return page.evaluate(() => {
        const SELECTORS = [
            ".glass-dock",
            ".glass-card",
            ".glass-resting",
            ".glass-quiet",
            ".glass-wash",
            ".glass-floating",
            ".glass-overlay",
        ];
        const out: { selector: string; surfaceBg: string }[] = [];
        const seen = new Set<Element>();
        function enrolled(el: HTMLElement, isDock: boolean): boolean {
            if (isDock) return true;
            // Skip the loud-pill control affordances (the W54 allowlist) — a Switch/Toggle
            // track paints a saturated checked fill, not the warm-cream base.
            if (el.closest("[role=switch], [data-state], [role=checkbox], button, label")) return false;
            // Skip a `.glass-*` tile whose bg is OVERRIDDEN by a `bg-*` utility (the demo rim/
            // contrast DEVICE — `bg-foreground/[0.18]` paints a dark fill, not the glass material).
            if (/(^|\s)bg-\S/.test(el.className)) return false;
            const rect = el.getBoundingClientRect();
            if (rect.width < 80 || rect.height < 48) return false;
            return (el.textContent ?? "").trim().length >= 8;
        }
        for (const sel of SELECTORS) {
            const isDock = sel === ".glass-dock";
            for (const node of Array.from(document.querySelectorAll(sel)).slice(0, 4)) {
                if (!(node instanceof HTMLElement) || seen.has(node)) continue;
                if (!enrolled(node, isDock)) continue;
                seen.add(node);
                out.push({ selector: sel, surfaceBg: getComputedStyle(node).backgroundColor });
            }
        }
        return out;
    });
}

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

// The per-mode identity band is bandForTier(selector, mode). In LIGHT the warm-cream floor
// reads L ∈ [0.85, 0.99]; in DARK the warm material re-resolves the deep-canvas register (the
// dark `--card` hsl(24 8% 16%), the luminous-dark lift), so the L window shifts down to
// [0.1, 0.55] AND the dark arm lifts each rung's alpha ~+0.08 (the read-weight lift over the
// deeper canvas) — so the dark ceilings sit higher (content < 0.82, overlay < 0.97). chroma
// must STILL be warm (≥ 0.004, NOT a flat neutral). The warmth + translucency invariants are
// mode-invariant (the identity); the bands are the per-tier per-mode twins.

test.describe("glass-identity (the warm-cream partial-transparency base over a calm-light page)", () => {
    for (const route of ROUTES) {
        test(`light: glass surfaces read warm-cream translucent (NOT grey) — ${route}`, async ({ page }) => {
            await page.goto(route, { waitUntil: "networkidle" });
            await setMode(page, "light");

            const readouts = await readGlassSurfaces(page);
            expect(
                readouts.length,
                `${route}: no in-situ glass surface found (the enrolled calm-page route must paint at least one body-bearing glass tier)`,
            ).toBeGreaterThan(0);

            for (const r of readouts) {
                // ONE shared OKLab decompose + the per-tier band (paint-arm.mjs). No second math.
                const stats = statsFromResolvedBg(r.surfaceBg);
                expect(
                    stats,
                    `${route} ${r.selector}: could not decompose surface bg "${r.surfaceBg}" to OKLab (the calm-light identity read is degenerate)`,
                ).not.toBeNull();
                const verdict = paintBand(stats, bandForTier(r.selector, "light"));
                expect(
                    verdict.pass,
                    `${route} ${r.selector}: surface bg "${r.surfaceBg}" is NOT warm-cream translucent over the calm-light page — ${verdict.reasons.join("; ")}. The grey slab can no longer score BETTER than warm cream (the bidirectional bound the monotonic gate lacked). Born-RED on HEAD's grey oklab(0.695 0.002 0.006 / 0.536); GREEN only on the warm-cream floor BC.W-GLASS-IDENTITY ratifies.`,
                ).toBe(true);
            }
        });

        test(`dark: glass surfaces stay warm + translucent (NOT a flat neutral) — ${route}`, async ({ page }) => {
            await page.goto(route, { waitUntil: "networkidle" });
            await setMode(page, "dark");

            const readouts = await readGlassSurfaces(page);
            expect(readouts.length, `${route}: no in-situ glass surface found (dark)`).toBeGreaterThan(0);

            for (const r of readouts) {
                const stats = statsFromResolvedBg(r.surfaceBg);
                expect(
                    stats,
                    `${route} ${r.selector}: could not decompose surface bg "${r.surfaceBg}" to OKLab (dark identity read degenerate)`,
                ).not.toBeNull();
                const verdict = paintBand(stats, bandForTier(r.selector, "dark"));
                expect(
                    verdict.pass,
                    `${route} ${r.selector}: dark surface bg "${r.surfaceBg}" is NOT warm + translucent — ${verdict.reasons.join("; ")}. The dark material is the lower-L twin of the warm-cream floor (warmth + translucency are mode-invariant).`,
                ).toBe(true);
            }
        });
    }

    // The dock over the busy aurora reads warm-cream at REST: the BASE plate is not
    // pre-greyed (the dynamic darken over the busy field is BC.W-ADAPTIVE-RECONCILE's job).
    // The dock holds the calm floor at REST on BOTH aurora-backed routes (the dedicated
    // aurora + glass-material's hero aurora); the content tiers on those routes carry the
    // earned darken, so only the dock's at-REST plate is the calm-identity assertion here.
    for (const auroraRoute of AURORA_ROUTES) {
        test(`light: the dock over the busy aurora reads warm-cream at REST (the base is not pre-greyed) — ${auroraRoute}`, async ({ page }) => {
            await page.goto(auroraRoute, { waitUntil: "networkidle" });
            await setMode(page, "light");

            const readouts = await readGlassSurfaces(page);
            const dock = readouts.find((r) => r.selector === ".glass-dock");
            expect(dock, `${auroraRoute}: no dock glass surface found (the dock-over-aurora base read)`).toBeTruthy();

            const stats = statsFromResolvedBg(dock!.surfaceBg);
            expect(
                stats,
                `${auroraRoute} ${dock!.selector}: could not decompose "${dock!.surfaceBg}" (the dock-over-aurora base read is degenerate)`,
            ).not.toBeNull();
            const verdict = paintBand(stats, bandForTier(dock!.selector, "light"));
            expect(
                verdict.pass,
                `${auroraRoute} ${dock!.selector}: the dock plate over the aurora is "${dock!.surfaceBg}" — NOT warm-cream at REST (${verdict.reasons.join("; ")}). This wave asserts the BASE is not pre-greyed; the dynamic over-busy darken is BC.W-ADAPTIVE-RECONCILE's.`,
            ).toBe(true);
        });
    }
});
