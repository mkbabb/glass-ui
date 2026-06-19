// BC.W-SELECTION-CARD — selection-card.spec.ts, the live π readback for the I5
// `<Card variant="selection" data-hue>` (the ONE new Atlas component). Rides
// BC.W-VISUAL-RECONCILE as the A-2/A-3-on-fixed-floor consume.
//
// THE READ (the gestalt, MEASURED): a row of warm-cream glass cards each glowing at
// its RIM with its OWN data hue (distinct teal/violet/ruby rims — NOT a flooded
// plate); the SELECTED one wrapped in a slow metal-shimmer rim (gold default), the
// unselected ones calm. The plate is translucent warm-cream THROUGHOUT — selection is
// the RIM + the glint, never a saturated fill. This spec asserts that mechanically:
//   (1) three selection cards with DISTINCT hues → each resolved BORDER color carries
//       its own data hue (the --glass-border-accent A-2 seam composes the rim border),
//       the three rims read as three DISTINCT hues, WHILE each plate background stays
//       warm-cream translucent (the BC.W-GLASS-IDENTITY floor un-regressed by accent).
//   (2) the SELECTED card resolves the metal border-image (a swept metal gradient
//       present on its border, ABSENT on the unselected siblings); under
//       prefers-reduced-motion the metal gradient still PAINTS static (the rim reads as
//       metal; only the sweep animation is gone).
//   (3) the accent-strength LIFT on selection is bounded (unselected < selected ≤ the
//       W-GLASS-ACCENT ceiling) — brighter at the rim, not a flooded plate.
//
// ONE colour-math source: the SHARED paint-arm.mjs leaf (statsFromResolvedBg +
// bandForTier → reflect-capture-verify's oklabFromRgb). This spec authors NO second
// decompose (the canvas-unify single-source fence — rule 3).
//
// The cards are INJECTED into a calm route's DOM (not a demo story this wave does not
// own) so the spec exercises the CSS SEAM directly: a `.glass-card` carrying
// `data-variant="selection"` + a per-instance `--glass-accent` hue is exactly the
// resolved surface Card.vue emits (the `:data-variant` attr + the host `--glass-accent`
// write). Born-RED before the cards.css decoration + the rim seam exist; GREEN on the
// fixed floor BC.W-SELECTION-CARD composes.
//
// WebKit/Safari: the rim accent (`--glass-border-accent` color-mix) + the metal
// gradient (`border-image` linear-gradient) are cross-engine (no `backdrop-filter:
// url()`), so the selection identity reads identically on Safari (apple-ios27.md §6).
// The two viewport projects (chromium-headless-new + coarse-touch) carry the readback.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose + the per-tier
// band resolver. No second colour math (rule 3).
import { statsFromResolvedBg, paintBand, bandForTier } from "../scripts/lib/paint-arm.mjs";

// A calm content route that paints the warm-cream floor (the page chassis the
// injected cards sit over). /display/card is OUT of this wave's edit bound — the
// spec only NAVIGATES to it (no edit) and injects the specimens into its DOM.
const CALM_ROUTE = "/display/card";

// Three distinct data hues — the consumer's series ramp (ruby / teal / violet).
// Distinct in OKLab so the three resolved rim borders read as three distinct hues.
const HUES = [
    { id: "ruby", hue: "oklch(0.552 0.192 359.8)" },
    { id: "teal", hue: "oklch(0.542 0.089 222.8)" },
    { id: "violet", hue: "oklch(0.532 0.180 317.5)" },
] as const;

interface CardReadout {
    id: string;
    borderColor: string;
    backgroundColor: string;
    borderImageSource: string;
    accentStrength: string;
    // The directional catch-light RING (the `--glass-material-rim` inset box-shadow):
    // where the SELECTED card's data hue rides (its BORDER is the earned gold metal-
    // image, so `border-color` resolves transparent by construction — the data-hue rim
    // composes onto the box-shadow's top inset stop, not the border). The A-2 rim is TWO
    // resolved things (glass/rim.css): the inset RING (box-shadow) AND the per-rung
    // border; the unselected cards read the hue on the border, the metal-bordered
    // selected card reads it on the ring.
    boxShadow: string;
}

/**
 * Inject a row of selection cards into the calm page and read each card's RESOLVED
 * rim border + plate background + metal border-image + accent-strength. The injected
 * node is a `.glass-card[data-variant="selection"]` carrying a per-instance
 * `--glass-accent` hue (+ `data-selected` on the chosen one) — the EXACT resolved
 * surface Card.vue emits. The selected card composes `.metal-gold-border` (the A-3
 * consume Card adds when `:selected`).
 */
async function readSelectionCards(page: Page, selectedId: string): Promise<CardReadout[]> {
    return page.evaluate(
        ({ hues, selectedId }) => {
            const host = document.createElement("div");
            host.style.cssText = "position:fixed;top:0;left:0;display:flex;gap:24px;padding:24px;z-index:99999;";
            host.setAttribute("role", "radiogroup");
            for (const { id, hue } of hues) {
                const card = document.createElement("div");
                const isSelected = id === selectedId;
                // The resolved selection surface: the warm-cream glass-card material +
                // the `data-variant="selection"` decoration + the per-instance accent
                // hue host write. The selected card also composes `.metal-gold-border`
                // (the A-3 class Card adds when :selected).
                card.className = isSelected ? "glass-card metal-gold-border" : "glass-card";
                card.setAttribute("data-variant", "selection");
                if (isSelected) card.setAttribute("data-selected", "true");
                card.setAttribute("role", "radio");
                card.setAttribute("aria-checked", String(isSelected));
                card.style.setProperty("--glass-accent", hue);
                card.style.width = "220px";
                card.style.height = "120px";
                card.textContent = `${id} series — the data-keyed rim`;
                host.appendChild(card);
            }
            document.body.appendChild(host);
            // Force a layout pass so the computed styles resolve.
            void host.getBoundingClientRect();
            const out: {
                id: string;
                borderColor: string;
                backgroundColor: string;
                borderImageSource: string;
                accentStrength: string;
                boxShadow: string;
            }[] = [];
            const cards = Array.from(host.children) as HTMLElement[];
            cards.forEach((card, i) => {
                const cs = getComputedStyle(card);
                out.push({
                    id: hues[i].id,
                    borderColor: cs.borderTopColor || cs.borderColor,
                    backgroundColor: cs.backgroundColor,
                    borderImageSource: cs.borderImageSource,
                    accentStrength: cs.getPropertyValue("--glass-accent-strength").trim(),
                    boxShadow: cs.boxShadow,
                });
            });
            // Leave the host in place for any follow-on capture; the orchestrator's
            // paint arm captures the live surface.
            host.setAttribute("data-testid", "selection-card-specimen");
            return out;
        },
        { hues: HUES as unknown as { id: string; hue: string }[], selectedId },
    );
}

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => {
        document.documentElement.classList.toggle("dark", m === "dark");
    }, mode);
    await page.waitForTimeout(120);
}

/** Parse a percentage token (`16%`) to a number, or null. */
function pct(v: string): number | null {
    const m = v.match(/([\d.]+)%/);
    return m ? Number(m[1]) : null;
}

test.describe("selection-card (the I5 <Card variant=selection> data-hue rim + earned metal-on-select)", () => {
    for (const mode of ["light", "dark"] as const) {
        test(`${mode}: three distinct data-hue rims, warm-cream plate untouched, metal-on-select`, async ({ page }) => {
            await page.goto(CALM_ROUTE, { waitUntil: "networkidle" });
            await setMode(page, mode);

            const selectedId = "teal";
            const readouts = await readSelectionCards(page, selectedId);
            expect(readouts.length, "three selection cards injected").toBe(3);

            // (1) the plate background stays warm-cream translucent (the BC.W-GLASS-IDENTITY
            // floor un-regressed by the accent — the accent rides the RIM, not the plate).
            // ONE shared OKLab decompose + the .glass-card content band (paint-arm.mjs).
            for (const r of readouts) {
                const stats = statsFromResolvedBg(r.backgroundColor);
                expect(
                    stats,
                    `${mode} ${r.id}: could not decompose plate bg "${r.backgroundColor}" (degenerate)`,
                ).not.toBeNull();
                const verdict = paintBand(stats, bandForTier(".glass-card", mode));
                expect(
                    verdict.pass,
                    `${mode} ${r.id}: the selection-card PLATE "${r.backgroundColor}" is NOT warm-cream translucent — ${verdict.reasons.join("; ")}. Selection rides the RIM + glint (the --glass-accent A-2 seam), it must NEVER flood the plate (the rim-not-fill discipline; the BC.W-GLASS-IDENTITY floor is inviolate).`,
                ).toBe(true);
            }

            // (2) each card's data hue reaches its RIM (the A-2 `--glass-accent` seam
            // composes the hue onto the rim) AND the three rims read as three DISTINCT
            // hues. The A-2 rim is TWO resolved paints (glass/rim.css): the per-rung
            // BORDER (`--glass-border-accent`) AND the directional catch-light RING (the
            // `--glass-material-rim` inset box-shadow). An UNSELECTED card reads its hue
            // on the BORDER; the SELECTED card's border is the EARNED gold metal-image
            // (the A-3 consume — `border-image` makes `border-color` resolve transparent
            // BY CONSTRUCTION), so its data hue rides the box-shadow catch-light RING. We
            // therefore read each card's hue from its LOAD-BEARING rim source: the metal-
            // bordered card from the ring's top inset stop, the rest from the border.
            // (Not a loosening — the hue must STILL reach a real rim paint per card; the
            // grey-no-hue case still REDs, the disease anti-bar holds.)
            const isMetalBordered = (r: CardReadout) =>
                r.borderImageSource !== "none" && /gradient/i.test(r.borderImageSource);
            // The first resolved-color stop of the box-shadow value (the top inset catch-
            // light RING — `--glass-material-rim`'s leading stop carries the accent mix).
            const firstShadowColor = (boxShadow: string): string | null => {
                const m = boxShadow.match(
                    /oklab\([^)]*\)|oklch\([^)]*\)|color\(srgb[^)]*\)|rgba?\([^)]*\)/i,
                );
                return m ? m[0] : null;
            };
            const rimStats = readouts.map((r) => {
                // The card's load-bearing rim paint: the catch-light RING for the metal-
                // bordered (selected) card, the BORDER for the unselected siblings.
                const rimColor = isMetalBordered(r)
                    ? (firstShadowColor(r.boxShadow) ?? r.borderColor)
                    : r.borderColor;
                return {
                    id: r.id,
                    rimColor,
                    via: isMetalBordered(r) ? "ring" : "border",
                    ...(statsFromResolvedBg(rimColor) ?? { oklabL: NaN, chroma: NaN, alpha: NaN }),
                };
            });
            for (const b of rimStats) {
                expect(
                    Number.isFinite(b.chroma),
                    `${b.id}: rim ${b.via} color "${b.rimColor}" could not be decomposed`,
                ).toBe(true);
                expect(
                    b.chroma,
                    `${b.id}: the selection-card rim (${b.via}: "${b.rimColor}") carries NO chroma (chroma ${b.chroma}) — the --glass-accent data hue did not reach the rim (the A-2 seam consume failed)`,
                ).toBeGreaterThan(0.004);
            }
            // The three rims are distinct: their resolved rim-source colours must differ
            // (a flooded single accent would collapse them to one). Each card's hue rides
            // its own load-bearing rim paint, so assert no two are byte-identical.
            const rimColors = rimStats.map((b) => b.rimColor);
            const uniqueRims = new Set(rimColors);
            expect(
                uniqueRims.size,
                `the three selection-card rims must read as three DISTINCT hues — got ${rimColors.join(" / ")} (a flooded single accent would collapse them)`,
            ).toBe(3);

            // (3) the SELECTED card resolves the metal border-image (a swept gradient
            // present on its border); the unselected siblings carry none. `none` is the
            // resolved value when no border-image is set.
            const selected = readouts.find((r) => r.id === selectedId)!;
            const unselected = readouts.filter((r) => r.id !== selectedId);
            expect(
                selected.borderImageSource !== "none" && /gradient/i.test(selected.borderImageSource),
                `the SELECTED card must resolve the metal border-image (a swept metal gradient) — got "${selected.borderImageSource}". The .metal-gold-border A-3 consume did not reach the selected rim.`,
            ).toBe(true);
            for (const u of unselected) {
                expect(
                    u.borderImageSource === "none" || !/gradient/i.test(u.borderImageSource),
                    `${u.id}: an UNSELECTED selection card must carry NO metal border-image — got "${u.borderImageSource}". Gold is EARNED for the chosen item only (BA.W-PHASE-PALETTE).`,
                ).toBe(true);
            }

            // (4) the accent-strength LIFT on selection is bounded (unselected < selected
            // ≤ the W-GLASS-ACCENT ceiling). The selected card is brighter at the rim,
            // not a flooded plate. (Read the resolved --glass-accent-strength per card.)
            const selStrength = pct(selected.accentStrength);
            const unselStrength = pct(unselected[0].accentStrength);
            expect(selStrength, `selected accent-strength resolved ("${selected.accentStrength}")`).not.toBeNull();
            expect(unselStrength, `unselected accent-strength resolved ("${unselected[0].accentStrength}")`).not.toBeNull();
            expect(
                selStrength! > unselStrength!,
                `the selected accent-strength (${selStrength}%) must be GREATER than the unselected (${unselStrength}%) — selection lifts the rim glow`,
            ).toBe(true);
            // The bounded ceiling — selection is a rim whisper, never a flooded plate
            // (the W-GLASS-ACCENT rim/glint ceiling ~55%, well above the calm/selected pair).
            expect(
                selStrength! <= 55,
                `the selected accent-strength (${selStrength}%) must stay ≤ the W-GLASS-ACCENT rim ceiling (55%) — a flooded-plate strength reds`,
            ).toBe(true);
        });
    }

    // The PRM-static bracket: under prefers-reduced-motion the metal gradient still
    // PAINTS static (the rim reads as metal; only the sweep animation is gone). The
    // border-image-source is present regardless of motion preference — only the
    // `animation` is gated (utilities/metal.css §PRM bracket).
    test("PRM-static: the selected metal rim paints static under prefers-reduced-motion", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(CALM_ROUTE, { waitUntil: "networkidle" });
        await setMode(page, "light");

        const readouts = await readSelectionCards(page, "teal");
        const selected = readouts.find((r) => r.id === "teal")!;
        expect(
            selected.borderImageSource !== "none" && /gradient/i.test(selected.borderImageSource),
            `under prefers-reduced-motion the selected metal rim must STILL paint static (the gradient is the load-bearing visual; only the sweep animation is gated) — got "${selected.borderImageSource}"`,
        ).toBe(true);
    });
});
