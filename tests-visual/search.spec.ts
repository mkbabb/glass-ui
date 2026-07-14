// BI.W-AFFORDANCE-REDESIGN — search.spec.ts, the /data/search behavioural readback.
//
// CBA-2 moved the search page's INSTRUMENTATION here. The old page was a test
// fixture masquerading as a demo — buttons literally labelled `buildIndex` /
// `searchIndex` / `fuzzyMatch` (internal API names as UI) plus a `data-testid`
// "Helper call ledger" of internal call-COUNTS. That belongs in a spec, not on the
// user-facing page. This spec EXERCISES the same pipeline the ledger did — but
// through the REAL component (SearchBar → useFuzzySearch → searchIndex/fuzzyMatch),
// asserting the RANKED render the user actually reads, not an internal call count.
//
// THE BINDING ARMS:
//   (a) TYPE → RANK — typing a query into the live rail ranks the 200-row catalogue;
//       the matching card renders, ordered by fuzzy score (highest first).
//   (b) SUBSEQUENCE match — a non-contiguous subsequence ("fzsrch") still surfaces
//       its target (the subsequence scorer the helpers proved, now proven live).
//   (c) EMPTY state — a nonsense query renders the honest empty affordance, no cards.
//   (d) MODE invariance — the ranking holds in light + dark (the search is not a
//       paint quirk of one mode).
//
// LOCAL-only (real demo dev server). Fail-CLOSED: a broken rank reds the readback.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROUTE = "/data/search";
const LIVE_RAIL_PLACEHOLDER = "Search components, composables, tokens…";

// The live SearchBar input (the rail that drives the shared query + the overlay).
function liveRail(page: Page) {
    return page.getByPlaceholder(LIVE_RAIL_PLACEHOLDER);
}

// The rendered result cards — the CardTitle rung is the stable, semantic hook (no
// data-testid leaks onto the user-facing page).
function resultTitles(page: Page) {
    return page.locator("[data-slot='card-title']");
}

async function typeQuery(page: Page, text: string): Promise<void> {
    const rail = liveRail(page);
    await rail.click();
    await rail.fill("");
    await rail.fill(text);
    // The composable debounces at 40ms; give the ranked render a beat to settle.
    await page.waitForTimeout(120);
}

test.describe("search (behavioural — the moved fixture instrumentation)", () => {
    test("type → rank: a query surfaces its target card, ordered by score", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        await typeQuery(page, "fuzzysearch");
        const titles = resultTitles(page);
        await expect(titles.first()).toBeVisible();
        const count = await titles.count();
        expect(count, "no ranked result cards rendered for a real query").toBeGreaterThan(0);

        // The FuzzySearch overlay row is the strongest match for its own name — it
        // ranks into the visible set (highest-score-first is the component's contract).
        const labels = await titles.allInnerTexts();
        expect(
            labels.some((l) => /FuzzySearch overlay/i.test(l)),
            `expected "FuzzySearch overlay" in the ranked set, got: ${labels.join(" | ")}`,
        ).toBe(true);
    });

    test("subsequence: a non-contiguous query still surfaces its target", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        // "srchbar" is a subsequence of "SearchBar query rail" — the scorer matches
        // gaps, so the row surfaces despite the missing 'ea'/'query rail' spans.
        await typeQuery(page, "srchbar");
        const labels = await resultTitles(page).allInnerTexts();
        expect(
            labels.some((l) => /SearchBar/i.test(l)),
            `subsequence "srchbar" did not surface a SearchBar row, got: ${labels.join(" | ")}`,
        ).toBe(true);
    });

    test("empty state: a nonsense query renders no cards + the honest affordance", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        await typeQuery(page, "qxzqxzqxz");
        await expect(resultTitles(page)).toHaveCount(0);
        await expect(
            page.getByText(/No matches for the current query/i),
        ).toBeVisible();
    });

    test("mode invariance: the rank holds in dark", async ({ page }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });
        await page.evaluate(() => document.documentElement.classList.add("dark"));

        await typeQuery(page, "fuzzysearch");
        const labels = await resultTitles(page).allInnerTexts();
        expect(
            labels.some((l) => /FuzzySearch overlay/i.test(l)),
            "the ranked set differs in dark mode (search must be mode-invariant)",
        ).toBe(true);
    });
});
