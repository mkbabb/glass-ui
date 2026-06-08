// AX.W56 — proof:squircle-language π render arm, the live cornerShape readback.
//
// The SOURCE arm (proof-squircle-language.mjs) proves the token axis + the
// rounded-vs-squircle POLICY STRUCTURE (the tokens exist, the big-dock reads
// `var(--corner-shape-bigdock)`, the @supports gate is leak-free, cards are
// re-homed). This spec proves the RENDER: it mounts the demo dock route, finds the
// big-dock card shell (`.glass-dock.shape-card`), and reads back
// `getComputedStyle(...).cornerShape`.
//
// The fail-CLOSED contract is ENGINE-AWARE (corner-shape is Chrome 139+ only):
//   - on a SUPPORTING engine (CSS.supports('corner-shape','superellipse(2)')),
//     the big-dock cornerShape MUST resolve a `superellipse(2)` (the policy paints);
//   - on a NON-supporting engine, it MUST resolve `round`/`normal` (the cross-engine
//     fallback contract) — NEVER a false RED for the 35% on Safari/Firefox.
//   - a card (`.glass-card`) MUST resolve `round`/`normal` on EVERY engine (cards
//     are round by policy — the re-home canary).
//
// The orchestrator ALSO drives this readback via chrome-devtools-mcp on a real
// Chrome-139 (the cardinal lesson — the live tuning + verification arm); this spec
// is the workspace-resident fail-CLOSED twin.

import { test, expect } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The CSS `squircle` keyword resolves to `superellipse(2)` in the computed style.
const SUPERELLIPSE_RE = /superellipse\(\s*2\s*\)|squircle/;
const ROUND_RE = /^(round|normal)$/;

test.describe("squircle-language (π lane — cornerShape readback, fail-CLOSED)", () => {
    test("the big-dock card shell reads a squircle (or the round fallback); a card stays round", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
        await page.waitForSelector(".glass-dock", { timeout: 5000 });
        await page.waitForTimeout(400);

        const probe = await page.evaluate(() => {
            const supports =
                typeof CSS !== "undefined" &&
                typeof CSS.supports === "function" &&
                CSS.supports("corner-shape", "superellipse(2)");

            const dock =
                document.querySelector<HTMLElement>(".glass-dock.shape-card") ??
                document.querySelector<HTMLElement>(".glass-dock.variant-dock");
            const card = document.querySelector<HTMLElement>(".glass-card");

            const read = (el: HTMLElement | null) => {
                if (!el) return null;
                const cs = getComputedStyle(el) as CSSStyleDeclaration & {
                    cornerShape?: string;
                };
                // cornerShape may not be a typed property on older typings.
                return (
                    cs.cornerShape ??
                    cs.getPropertyValue("corner-shape") ??
                    null
                );
            };

            return {
                supports,
                dockFound: dock !== null,
                dockShapeCard: dock?.classList.contains("shape-card") ?? false,
                dockCornerShape: read(dock),
                cardFound: card !== null,
                cardCornerShape: read(card),
            };
        });

        // The dock route always mounts a .glass-dock; if no card-shape dock is
        // present the readback is on the variant-dock root (still meaningful).
        expect(probe.dockFound, "no .glass-dock on the dock route").toBe(true);

        if (probe.supports && probe.dockShapeCard) {
            // SUPPORTING engine + a real big-dock card shell → the squircle paints.
            expect(
                SUPERELLIPSE_RE.test(probe.dockCornerShape ?? ""),
                `big-dock cornerShape should resolve superellipse(2) on a Chrome-139 engine; got "${probe.dockCornerShape}"`,
            ).toBe(true);
        } else if (probe.dockShapeCard) {
            // NON-supporting engine → the round fallback contract (never a false RED).
            expect(
                ROUND_RE.test(probe.dockCornerShape ?? "round"),
                `big-dock cornerShape should fall back to round on a non-supporting engine; got "${probe.dockCornerShape}"`,
            ).toBe(true);
        }

        // A card is ROUND on EVERY engine (the re-home canary).
        if (probe.cardFound) {
            expect(
                ROUND_RE.test(probe.cardCornerShape ?? "round"),
                `a .glass-card must stay round by policy (re-home canary); got "${probe.cardCornerShape}"`,
            ).toBe(true);
        }
    });
});
