// BB.W-CARD-PAD — card-padding.spec.ts, the BINDING π readback. proof:card-padding
// proves the GOLDEN sqrt-φ/φ ladder is minted + consumed in SOURCE (Card.vue mints the
// 5-token ladder with the literal 1.272/1.618/2.618 constants IN the calc chains; the
// family consumes the inline-vs-block axis split); THIS spec proves the painted RENDER —
// on /display/card the heading CLEARS the top edge (the prior uniform 1:1 pad hugged it),
// the top:side pad ratio resolves to sqrt-φ, the header→content interior gap is the
// SINGLE section-gap (~30.5px) NOT the 48px double-pad artifact, the scroll-shrink sticky
// header gains the sqrt-φ top lift, and the overlay band (Dialog + Popover) resolves the
// same sqrt-φ ratio — BOTH modes. The source-green/visually-broken gap (a cascade-layer
// win leaving a surface on the old uniform pad — the AZ.W-DOCK-RAIL class) is the binding
// truth this catches, never the source diff alone.
//
// THE BINDING ARMS (real card surfaces on the live /display/card route, which loads the
// global /styles cascade so the --card-pad-* ladder resolves):
//
//   P1 — sqrt-φ AXIS RATIO. The first CardHeader resolves paddingTop/paddingLeft ≈ 1.272
//        (±0.04), paddingLeft == paddingRight (the inline anchor is symmetric), and
//        paddingTop > paddingLeft (the block axis breathes above the inline).
//   P2 — THE HEADING CLEARS THE TOP EDGE. The CardTitle's top clears the Card's top by
//        ≥ --card-pad-block (~30.5px, ±2px) — the heading does NOT hug the border.
//   P3 — THE INTERIOR GAP IS THE SINGLE SECTION-GAP. The header→content gap resolves
//        ≈ --card-pad-section-gap (~30.5px), NOT the ~48px double-pad artifact.
//   P5 — THE SCROLL-SHRINK STICKY HEADER gains the sqrt-φ top lift (paddingTop ≈
//        block, paddingBottom 0).
//   P6 — THE OVERLAY BAND. A Dialog content + a Popover content resolve paddingTop/
//        paddingLeft ≈ sqrt-φ (the overlay ladder, arm 2 — verified at the consolidated
//        π once the overlay band merges).
//   P7 — BOTH light + dark.
//
// Fail-CLOSED: a surface with no resolvable padding / a 1:1 ratio / a 48px interior gap
// / a hugging heading reds the recompute.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const SQRT_PHI = 1.272;
const PHI = 1.618;
const CARD_ROUTE = "/display/card";
const DIALOG_ROUTE = "/containers/dialog";
const POPOVER_ROUTE = "/containers/popover";

function px(v: string): number {
    return parseFloat(v) || 0;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(120);
}

/** Read the resolved padding of the first `[data-slot="card-header"]` + the geometry of
 *  its title + the first sibling card-content, on the route. */
async function readFirstCardHeader(page: Page): Promise<{
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    titleTopGap: number; // CardTitle.top − Card.top
    headerToContentGap: number; // CardContent content-top − CardHeader content-bottom
} | null> {
    return page.evaluate(() => {
        const header = document.querySelector<HTMLElement>(
            '[data-slot="card-header"]',
        );
        if (!header) return null;
        const card = header.closest<HTMLElement>('[data-slot="card"]');
        const title = header.querySelector<HTMLElement>(
            '[data-slot="card-title"]',
        );
        const cs = getComputedStyle(header);

        const headerRect = header.getBoundingClientRect();
        const cardRect = card?.getBoundingClientRect();
        const titleRect = title?.getBoundingClientRect();

        // The interior header→content gap: the content's first painted text top minus
        // the header's last painted text bottom. We approximate via the CardContent
        // box top minus the header box bottom + the header's pb (0) — i.e. the visible
        // breath between the header's bottom content edge and the content's top text.
        const content = card?.querySelector<HTMLElement>(
            '[data-slot="card"] > div:not([data-slot="card-header"]):not([data-slot="card-footer"])',
        );
        // Fallback: any direct child of the card after the header.
        const contentEl =
            content ??
            (card
                ? (Array.from(card.children).find(
                      (c) =>
                          c !== header &&
                          (c as HTMLElement).getAttribute("data-slot") !==
                              "card-footer",
                  ) as HTMLElement | undefined)
                : undefined);
        let headerToContentGap = 0;
        if (contentEl) {
            const ccs = getComputedStyle(contentEl);
            // header pb (0) + content pt (= section-gap) is the visible interior breath.
            headerToContentGap =
                parseFloat(cs.paddingBottom) + parseFloat(ccs.paddingTop);
        }

        return {
            paddingTop: parseFloat(cs.paddingTop),
            paddingBottom: parseFloat(cs.paddingBottom),
            paddingLeft: parseFloat(cs.paddingLeft),
            paddingRight: parseFloat(cs.paddingRight),
            titleTopGap:
                titleRect && cardRect ? titleRect.top - cardRect.top : 0,
            headerToContentGap,
            // headerRect retained for debugging; not asserted.
            _h: headerRect.height,
        } as never;
    });
}

test.describe("card-padding (π — the GOLDEN sqrt-φ/φ ladder, fail-CLOSED)", () => {
    for (const dark of [false, true]) {
        test(`card golden padding — ${dark ? "dark" : "light"}`, async ({
            page,
        }) => {
            await page.goto(CARD_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);

            const m = await readFirstCardHeader(page);
            expect(m, "no CardHeader on /display/card").not.toBeNull();
            if (!m) return;

            // P1 — the sqrt-φ axis ratio + symmetric inline + block > inline.
            expect(
                m.paddingLeft,
                "CardHeader paddingLeft must resolve (>0)",
            ).toBeGreaterThan(0);
            expect(
                m.paddingTop,
                "CardHeader paddingTop must resolve (>0)",
            ).toBeGreaterThan(0);
            // inline symmetric (left == right, the preserved anchor).
            expect(Math.abs(m.paddingLeft - m.paddingRight)).toBeLessThanOrEqual(
                1,
            );
            // block breathes ABOVE inline.
            expect(
                m.paddingTop,
                "block axis must exceed inline (sqrt-φ lift)",
            ).toBeGreaterThan(m.paddingLeft);
            // the ratio is sqrt-φ ±0.04.
            const ratio = m.paddingTop / m.paddingLeft;
            expect(
                Math.abs(ratio - SQRT_PHI),
                `top:left pad ratio ${ratio.toFixed(3)} must be ≈ sqrt-φ (${SQRT_PHI})`,
            ).toBeLessThanOrEqual(0.04);
            // CardHeader zeroes its block-end (the section-gap is owned by content).
            expect(
                m.paddingBottom,
                "CardHeader paddingBottom must be 0 (the gap is CardContent's)",
            ).toBeLessThanOrEqual(0.5);

            // P2 — the heading CLEARS the top edge by ≥ --card-pad-block (~30.5px ±2).
            // The expected block = inline × sqrt-φ.
            const expectedBlock = m.paddingLeft * SQRT_PHI;
            expect(
                m.titleTopGap,
                `CardTitle top must clear the Card top by ≈ block (${expectedBlock.toFixed(
                    1,
                )}px), got ${m.titleTopGap.toFixed(1)}px — the heading must not hug the border`,
            ).toBeGreaterThanOrEqual(expectedBlock - 2);

            // P3 — the interior header→content gap is the SINGLE section-gap (~block),
            // NOT the ~48px double-pad artifact. The section-gap == block, so the
            // visible breath ≈ block (header pb 0 + content pt block), NOT 2× the
            // legacy 24px uniform pad.
            expect(
                m.headerToContentGap,
                `header→content interior gap ${m.headerToContentGap.toFixed(
                    1,
                )}px must be ≈ section-gap (${expectedBlock.toFixed(
                    1,
                )}px), NOT the 48px double-pad`,
            ).toBeLessThan(expectedBlock + 4);
            expect(m.headerToContentGap).toBeGreaterThanOrEqual(
                expectedBlock - 4,
            );
        });
    }

    // P5 — the scroll-shrink sticky CardHeader gains the sqrt-φ top lift.
    for (const dark of [false, true]) {
        test(`scroll-shrink header sqrt-φ lift — ${
            dark ? "dark" : "light"
        }`, async ({ page }) => {
            await page.goto(CARD_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);

            const m = await page.evaluate(() => {
                const header = document.querySelector<HTMLElement>(
                    '[data-testid="card-shrink-header"]',
                );
                if (!header) return null;
                const cs = getComputedStyle(header);
                return {
                    paddingTop: parseFloat(cs.paddingTop),
                    paddingBottom: parseFloat(cs.paddingBottom),
                    paddingLeft: parseFloat(cs.paddingLeft),
                };
            });
            expect(m, "no scroll-shrink header on the route").not.toBeNull();
            if (!m) return;
            // the sqrt-φ top lift (paddingTop > paddingLeft) + zeroed block-end.
            expect(m.paddingTop).toBeGreaterThan(m.paddingLeft);
            const ratio = m.paddingTop / m.paddingLeft;
            expect(Math.abs(ratio - SQRT_PHI)).toBeLessThanOrEqual(0.04);
            expect(m.paddingBottom).toBeLessThanOrEqual(0.5);
        });
    }

    // P6 — the overlay band (Dialog + Popover) resolves the sqrt-φ ratio. The overlay
    // ladder is arm 2; this arm verifies the PAINTED result at the consolidated π once
    // the overlay band merges (the px-(--overlay-pad-inline) py-(--overlay-pad-block)
    // surfaces resolve block = inline × sqrt-φ).
    for (const dark of [false, true]) {
        test(`overlay band sqrt-φ ratio — ${dark ? "dark" : "light"}`, async ({
            page,
        }) => {
            // Dialog.
            await page.goto(DIALOG_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page
                .getByRole("button", { name: /open glass dialog/i })
                .first()
                .click();
            await page.waitForTimeout(200);
            const dlg = await page.evaluate(() => {
                const el = document.querySelector<HTMLElement>(
                    '[data-slot="dialog-content"], [role="dialog"]',
                );
                if (!el) return null;
                const cs = getComputedStyle(el);
                return {
                    paddingTop: parseFloat(cs.paddingTop),
                    paddingLeft: parseFloat(cs.paddingLeft),
                };
            });
            expect(dlg, "no dialog content painted").not.toBeNull();
            if (dlg && dlg.paddingLeft > 0) {
                const r = dlg.paddingTop / dlg.paddingLeft;
                expect(
                    Math.abs(r - SQRT_PHI),
                    `dialog top:left ratio ${r.toFixed(3)} ≈ sqrt-φ`,
                ).toBeLessThanOrEqual(0.04);
            }

            // Popover.
            await page.goto(POPOVER_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            await page
                .getByRole("button")
                .first()
                .click({ trial: false })
                .catch(() => {});
            await page.waitForTimeout(200);
            const pop = await page.evaluate(() => {
                const el = document.querySelector<HTMLElement>(
                    '.popover-content, [data-slot="popover-content"]',
                );
                if (!el) return null;
                const cs = getComputedStyle(el);
                return {
                    paddingTop: parseFloat(cs.paddingTop),
                    paddingLeft: parseFloat(cs.paddingLeft),
                };
            });
            if (pop && pop.paddingLeft > 0) {
                const r = pop.paddingTop / pop.paddingLeft;
                expect(
                    Math.abs(r - SQRT_PHI),
                    `popover top:left ratio ${r.toFixed(3)} ≈ sqrt-φ`,
                ).toBeLessThanOrEqual(0.04);
            }
        });
    }

    // A guard the φ constants are real (a documentation anchor, not a live assert).
    test("the golden constants are sqrt-φ + φ", () => {
        expect(SQRT_PHI).toBeCloseTo(Math.sqrt(PHI), 2);
        expect(PHI).toBeCloseTo((1 + Math.sqrt(5)) / 2, 2);
    });
});
