// BB.W-EYEBROW-UNION — eyebrow-union.spec.ts, the BINDING π readback. proof:eyebrow-union
// proves the vocabulary is declared ONCE in source (`text-mono-caption` is the canon
// `.section-label` composes via `@apply`); THIS spec proves the painted RENDER — every
// eyebrow surface across the library resolves the ONE voice: the mono family, the
// `--type-caption` size, the `--type-tracking-caps` (0.1em) tracking, and uppercase,
// BYTE-EQUAL across the enrolled surfaces, in BOTH modes. The source-green/visually-
// broken gap (a cascade-layer-win leaving a surface on its old drifted tracking — the
// AZ.W-DOCK-RAIL class) is the binding truth this catches, never the source diff alone.
//
// THE BINDING ARMS (real eyebrow surfaces on a live demo route, which loads the global
// `/styles` cascade so `text-mono-caption` + `.section-label` resolve):
//
//   (a) ONE FAMILY — every enrolled eyebrow resolves a mono `font-family`.
//   (b) ONE TRACKING — every enrolled eyebrow resolves the SAME `letter-spacing`
//       (the reconciled `--type-tracking-caps`, NOT the retired `--type-tracking-wider`).
//   (c) ONE TRANSFORM — every enrolled eyebrow resolves `text-transform: uppercase`.
//   (d) ONE SIZE — the `.section-label` + `text-mono-caption` caption surfaces resolve
//       the SAME `font-size` (the resolved `--type-caption` clamp). `text-admin-label`
//       (the distinct 0.625rem micro register, a KEEP) is EXCLUDED — it is not an
//       eyebrow duplicate.
//
// At ≥1 viewport, BOTH modes. Fail-CLOSED: a divergent tracking / a non-mono family /
// a non-uppercase eyebrow / a section-label-vs-caption size desync reds the recompute.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

// A story route that mounts both a `.section-label` breadcrumb eyebrow AND a
// `text-mono-caption` caption (MetricBadge/ColorSwatch family). The metric-badge
// display story carries both registers over the global cascade.
const HOST_ROUTE = "/display/metric-badge";

function trackingPx(v: string): string {
    // letter-spacing resolves to px; normalize "normal" to a sentinel.
    return v === "normal" ? "normal" : v;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(120);
}

/** Collect the resolved eyebrow vocabulary for every enrolled eyebrow on the page. */
async function readEyebrows(page: Page): Promise<
    Array<{
        cls: string;
        fontFamily: string;
        fontSize: string;
        letterSpacing: string;
        textTransform: string;
    }>
> {
    return page.evaluate(() => {
        // Enrolled eyebrow surfaces: the colored canon (.section-label, EXCLUDING the
        // distinct-size text-admin-label) + the color-agnostic vocabulary
        // (.text-mono-caption). The Tailwind @utility emits a literal `.text-mono-caption`
        // class on the element.
        const nodes = Array.from(
            document.querySelectorAll<HTMLElement>(
                ".section-label, .text-mono-caption",
            ),
        ).filter((el) => !el.classList.contains("text-admin-label"));
        return nodes.slice(0, 24).map((el) => {
            const cs = getComputedStyle(el);
            return {
                cls: el.className,
                fontFamily: cs.fontFamily,
                fontSize: cs.fontSize,
                letterSpacing: cs.letterSpacing,
                textTransform: cs.textTransform,
            };
        });
    });
}

test.describe("eyebrow-union (π — the ONE mono-caption eyebrow voice, fail-CLOSED)", () => {
    for (const dark of [false, true]) {
        test(`one eyebrow voice — ${dark ? "dark" : "light"}`, async ({
            page,
        }) => {
            await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);
            const eyebrows = await readEyebrows(page);

            // Fail-CLOSED on no surfaces (a route change must not vacuously green).
            expect(
                eyebrows.length,
                "no .section-label / .text-mono-caption eyebrow on the route",
            ).toBeGreaterThan(0);

            for (const e of eyebrows) {
                // (a) ONE FAMILY — mono.
                expect(e.fontFamily.toLowerCase()).toMatch(
                    /mono|fira|consolas|menlo|courier/,
                );
                // (c) ONE TRANSFORM — uppercase.
                expect(e.textTransform).toBe("uppercase");
            }

            // (b) ONE TRACKING — every eyebrow shares the reconciled caps tracking.
            const trackings = new Set(
                eyebrows.map((e) => trackingPx(e.letterSpacing)),
            );
            expect(
                trackings.size,
                `divergent letter-spacing across eyebrows: ${[...trackings].join(
                    ", ",
                )}`,
            ).toBe(1);

            // (d) ONE SIZE — the caption-register eyebrows resolve one font-size.
            const sizes = new Set(eyebrows.map((e) => e.fontSize));
            expect(
                sizes.size,
                `divergent font-size across eyebrows: ${[...sizes].join(", ")}`,
            ).toBe(1);
        });
    }
});
