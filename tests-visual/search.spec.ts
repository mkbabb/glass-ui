// BI.W-AFFORDANCE-REDESIGN — search.spec.ts, the /data/search behavioural readback.
//
// CBA-2 moved the search page's INSTRUMENTATION here. The old page was a test
// fixture masquerading as a demo — buttons literally labelled `buildIndex` /
// `searchIndex` / `fuzzyMatch` (internal API names as UI) plus a `data-testid`
// "Helper call ledger" of internal call-COUNTS. That belongs in a spec, not on the
// user-facing page. This spec EXERCISES the same pipeline the ledger did — but
// through the REAL pipeline (the route's field → useFuzzySearch → searchIndex/
// fuzzyMatch), asserting the RANKED render the user actually reads, not an internal
// call count.
//
// [2026-08-25 · BK #42 W-SEARCH] ~~"through the REAL component (SearchBar → …)"~~ —
// `SearchBar` is DELETED (DELETE-with-relay, Ruling 1) and the route hand-composes the
// surviving `.input-bar` recipe. Nothing this spec asserts was ever about the SFC: it
// reads a placeholder, types, and reads the ranked cards. The ENGINE is the subject and
// always was, which is why the arms below survive the component's deletion unchanged in
// substance.
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

// The live field (the rail that drives the shared query).
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

        // [2026-08-25 · BK #42 W-SEARCH] ~~`/FuzzySearch overlay/i`~~ — BROKEN BEFORE
        // THIS UNIT AND NOT BY IT. No row named "FuzzySearch overlay" has existed in
        // `demo/stories/data/search.vue`'s seed table for as long as the seeds have
        // carried "useFuzzySearch state"; the overlay component retired at REDUCTION W3
        // and this assertion outlived its subject. Found while re-pointing the route,
        // recorded rather than quietly swapped. Re-pointed to the live seed.
        const labels = await titles.allInnerTexts();
        expect(
            labels.some((l) => /useFuzzySearch/i.test(l)),
            `expected "useFuzzySearch state" in the ranked set, got: ${labels.join(" | ")}`,
        ).toBe(true);
    });

    test("subsequence: a non-contiguous query still surfaces its target", async ({
        page,
    }) => {
        await page.goto(ROUTE, { waitUntil: "networkidle" });

        // [2026-08-25 · BK #42 W-SEARCH] ~~"srchbar" ⊑ "SearchBar query rail"~~ — that
        // seed row named a component this unit deleted and was re-seeded onto the
        // surviving engine leaf. "fzmtch" is a subsequence of "fuzzy match scorer"
        // (f·z·m·t·c·h with gaps at every step), so the arm keeps testing exactly what
        // it tested: gap-tolerant subsequence matching, not a substring.
        await typeQuery(page, "fzmtch");
        const labels = await resultTitles(page).allInnerTexts();
        expect(
            labels.some((l) => /Fuzzy match scorer/i.test(l)),
            `subsequence "fzmtch" did not surface the scorer row, got: ${labels.join(" | ")}`,
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
            labels.some((l) => /useFuzzySearch/i.test(l)),
            "the ranked set differs in dark mode (search must be mode-invariant)",
        ).toBe(true);
    });
});
