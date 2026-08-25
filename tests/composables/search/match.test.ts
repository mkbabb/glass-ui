// The hardened test floor over the canonical client fuzzy
// pipeline (the silent-regression guard the dock depends on). The scorer is
// BYTE-UNTOUCHED; these units PIN its behaviour so a future refactor cannot
// silently regress the matcher.
import { afterEach, describe, expect, it } from "vitest";
import {
    buildIndex,
    searchIndex,
    fuzzyMatch,
    clearSearchCache,
} from "@glass/composables/search/match";
import type { SearchableItem } from "@glass/composables/search/types";

afterEach(() => clearSearchCache());

function item(id: string, label: string, text = "", type?: string): SearchableItem {
    return { id, label, text, type };
}

describe("fuzzyMatch — the VSCode subsequence scorer (6 bonuses)", () => {
    it("returns null when a pattern char is missing or out of order", () => {
        expect(fuzzyMatch("xyz", "abc")).toBeNull();
        expect(fuzzyMatch("ba", "abc")).toBeNull(); // out of order
        expect(fuzzyMatch("abcd", "abc")).toBeNull(); // pattern longer than text
    });

    it("matches an empty pattern with score 0 and no matches", () => {
        expect(fuzzyMatch("", "anything")).toEqual({ score: 0, matches: [] });
    });

    it("the +8 start-of-string bonus: a start match outranks a mid-string match", () => {
        const atStart = fuzzyMatch("a", "abc")!; // index 0 → +8 +3(prefix-align) +1
        const midString = fuzzyMatch("a", "xba")!; // index 2, no boundary bonus
        expect(atStart.score).toBeGreaterThan(midString.score);
        expect(atStart.matches).toEqual([0]);
    });

    it("the +7 word-separator bonus outranks a plain mid-string match", () => {
        const afterSep = fuzzyMatch("z", "ab zoo")!; // 'z' at index 3, prev is space → +7
        const midPlain = fuzzyMatch("z", "abzoo")!; // 'z' at index 2, prev is 'b' (no boundary)
        expect(afterSep.score).toBeGreaterThan(midPlain.score);
    });

    it("the +6 camelCase boundary outranks a plain lowercase run position", () => {
        // fuzzyMatch is case-sensitive (the index lowercases upstream); camelCase
        // fires only on a literal lower→upper boundary with a matching upper pattern.
        const camel = fuzzyMatch("C", "fooCat")!; // 'C' at idx 3, prev 'o' lower→upper → +6
        const plain = fuzzyMatch("a", "fooaat")!; // 'a' at idx 3, prev 'o' (no boundary)
        expect(camel.score).toBeGreaterThan(plain.score);
    });

    it("the +5 consecutive-run bonus: a contiguous match outranks a scattered one", () => {
        const run = fuzzyMatch("se", "search")!; // s,e consecutive → run bonus on 'e'
        const scattered = fuzzyMatch("sh", "search")!; // s..h, not consecutive
        expect(run.score).toBeGreaterThan(scattered.score);
    });

    it("the -0.1 excess penalty: a tighter match outranks a looser one for the same chars", () => {
        const tight = fuzzyMatch("ab", "ab")!; // 0 excess
        const loose = fuzzyMatch("ab", "axxxxxxxxxb")!; // many excess chars
        expect(tight.score).toBeGreaterThan(loose.score);
    });

    it("the relative bonus ranking: start > word-sep > camelCase > plain mid-string", () => {
        // each fixture isolates ONE bonus: the matched char lands at the position
        // that triggers exactly that bonus, with no prefix-align/run interference.
        const start = fuzzyMatch("z", "zxx")!.score; // idx 0 → +8 (+3 prefix-align)
        const sep = fuzzyMatch("z", "xx zx")!.score; // idx 3, prev space → +7
        const camel = fuzzyMatch("Z", "xxZx")!.score; // idx 2, lower→upper → +6
        const plain = fuzzyMatch("z", "xxzx")!.score; // idx 2, prev 'x' → no bonus
        expect(start).toBeGreaterThan(plain);
        expect(sep).toBeGreaterThan(plain);
        expect(camel).toBeGreaterThan(plain);
        // start (8) beats word-sep (7) beats camelCase (6)
        expect(start).toBeGreaterThan(sep);
        expect(sep).toBeGreaterThan(camel);
    });
});

describe("searchIndex — ranking, prefix-narrowing cache, multi-token AND", () => {
    const items: SearchableItem[] = [
        item("1", "Search index", "fuzzy scoring", "helper"),
        item("2", "Glass panel", "surface tokens", "component"),
        item("3", "Glassy dock", "navigation rail", "component"),
        item("4", "Index builder", "lowercased entries", "helper"),
    ];

    it("ranks the start-aligned/tightest match first", () => {
        const idx = buildIndex(items);
        const results = searchIndex(idx, "glass");
        expect(results.length).toBeGreaterThan(0);
        // "Glass panel" (start-aligned, exact prefix) outranks "Glassy dock"
        expect(results[0].item.id).toBe("2");
    });

    it("returns matchIndices as the matched-char positions in the label", () => {
        const idx = buildIndex(items);
        const results = searchIndex(idx, "glass");
        const panel = results.find((r) => r.item.id === "2")!;
        // "glass panel" — g(0) l(1) a(2) s(3) s(4)
        expect(panel.matchIndices).toEqual([0, 1, 2, 3, 4]);
    });

    it("the multi-token query is AND-logic: BOTH tokens must fuzzy-match", () => {
        const idx = buildIndex(items);
        // "search index" — only id 1's label "Search index" contains both tokens.
        const both = searchIndex(idx, "search index");
        expect(both.map((r) => r.item.id)).toContain("1");
        // a token absent from every field drops the entry entirely.
        const none = searchIndex(idx, "glass zzzzz");
        expect(none.length).toBe(0);
    });

    it("the prefix-narrowing cache narrows from the prior query's result set", () => {
        const idx = buildIndex(items);
        // Seed "gla" → 2 matches (Glass panel, Glassy dock). Then "glas" narrows
        // FROM that 2-candidate set, never re-scanning the full 4-item index.
        const gla = searchIndex(idx, "gla");
        expect(gla.length).toBe(2);
        const glas = searchIndex(idx, "glas");
        // the narrowed query can only return a SUBSET of the prefix's matches.
        const glasIds = new Set(glas.map((r) => r.item.id));
        const glaIds = new Set(gla.map((r) => r.item.id));
        for (const id of glasIds) expect(glaIds.has(id)).toBe(true);
        expect(glas.length).toBeLessThanOrEqual(gla.length);
    });

    it("an empty/whitespace query returns no results", () => {
        const idx = buildIndex(items);
        expect(searchIndex(idx, "")).toEqual([]);
        expect(searchIndex(idx, "   ")).toEqual([]);
    });
});

describe("searchIndex — the 200-item fuzzy query (the dock-scale π)", () => {
    function build200(): SearchableItem[] {
        const types = ["component", "composable", "helper", "primitive", "container"];
        const out: SearchableItem[] = [];
        for (let i = 0; i < 200; i++) {
            const t = types[i % types.length];
            out.push(
                item(
                    `row-${i}`,
                    `${t} ${i} ${i % 7 === 0 ? "Glass surface" : "panel rail"}`,
                    `row ${i} body text describing the ${t} entry`,
                    t,
                ),
            );
        }
        return out;
    }

    it("returns ranked subsequence matches with match-index highlighting over 200 items", () => {
        const idx = buildIndex(build200());
        const results = searchIndex(idx, "glass", 30);
        expect(results.length).toBeGreaterThan(0);
        expect(results.length).toBeLessThanOrEqual(30); // capped by maxResults
        // descending score order (the ranking contract the dock renders).
        for (let i = 1; i < results.length; i++) {
            expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
        }
        // every returned result is a genuine subsequence match with highlight spans.
        // [2026-08-25 · BK #42 W-SEARCH · MATCHER REPAIR] ~~`expect(r.score)
        // .toBeGreaterThan(0)`~~ — STRUCK, because it asserted the defect. It was a
        // TAUTOLOGY over the old `if (best <= 0) return null` filter: every returned
        // result had a positive score BY CONSTRUCTION, so the line could never fail and
        // pinned the exact behaviour §PRESENCE below convicts. Score is a ranking
        // value and is free to be negative; what a returned row owes is that it is
        // genuinely present in its own label or body, which is what replaces it.
        for (const r of results) {
            expect(r.matchIndices.length).toBeGreaterThanOrEqual(0);
            const hay = `${r.item.label} ${r.item.text} ${r.item.type ?? ""}`;
            expect(
                fuzzyMatch("glass", hay.toLowerCase()),
                `returned a row that is not a subsequence match at all: ${r.item.label}`,
            ).not.toBeNull();
        }
        // the top match's matchIndices index into its label.
        const top = results[0];
        for (const mi of top.matchIndices) {
            expect(mi).toBeGreaterThanOrEqual(0);
            expect(mi).toBeLessThan(top.item.label.length);
        }
    });

    it("respects the maxResults cap", () => {
        const idx = buildIndex(build200());
        expect(searchIndex(idx, "panel", 5).length).toBeLessThanOrEqual(5);
    });
});

// [2026-08-25 · BK #42 W-SEARCH · MATCHER REPAIR] PRESENCE ≠ RANK.
//
// CWT-2 §SEARCH amends row #42's ground to "the matcher needs REPAIR (it silently
// nulls present subsequences)". This is the arm that holds the repair down. The
// mechanism, restated so a reader need not re-derive it: `fuzzyMatch` subtracts
// `0.1` per EXCESS character, unbounded in the text length, and `scoreEntry` used
// `best = 0` as both the not-found sentinel and a floor — so a real match went
// invisible the moment the arithmetic crossed zero.
//
// The thresholds are COMPUTED here, never hardcoded, so the arm cannot rot into a
// pinned constant if the bonus table is ever retuned: for a plain mid-string single
// character the score is exactly `1 - (tLen - 1) * 0.1`, which reaches 0 at 11.
describe("scoreEntry — a present subsequence is never silently dropped", () => {
    /** The shortest text at which a plain q-char match scores <= 0 — derived. */
    function vanishLength(q: string): number {
        let n = q.length;
        while (n < 4096) {
            const text = `${"x".repeat(n - q.length)}${q}`;
            const m = fuzzyMatch(q, text)!;
            if (m.score <= 0) return n;
            n++;
        }
        throw new Error("no vanish length found — the penalty term changed shape");
    }

    it("the vanishing thresholds are real and are the ones the spec convicted", () => {
        // CWT-2 §SEARCH: "a present subsequence drops at text length 11/72/133/255
        // for 1/2/3/5-char queries". Re-derived from the live scorer, not asserted.
        expect(vanishLength("a")).toBe(11);
        expect(vanishLength("ab")).toBe(72);
    });

    it("a long body still surfaces its row (the 1-char case, at the threshold)", () => {
        // Text long enough that the single matched char scores exactly <= 0.
        const len = vanishLength("q");
        const body = `${"x".repeat(len - 1)}q`;
        expect(fuzzyMatch("q", body)!.score).toBeLessThanOrEqual(0);

        const idx = buildIndex([item("1", "zzzz", body, "zzzz")]);
        const results = searchIndex(idx, "q");
        expect(
            results.map((r) => r.item.id),
            "a present subsequence was dropped because its RANK was non-positive",
        ).toEqual(["1"]);
    });

    it("ranks correctly across the zero line — a tight match still outranks a loose one", () => {
        const tightBody = "q";
        const looseBody = `${"x".repeat(400)}q`;
        const idx = buildIndex([
            item("tight", "zzzz", tightBody, "zzzz"),
            item("loose", "zzzz", looseBody, "zzzz"),
        ]);
        const results = searchIndex(idx, "q");
        expect(results.map((r) => r.item.id)).toEqual(["tight", "loose"]);
        // The repair does not floor anything: the loose row's rank IS negative, and
        // the descending sort orders it correctly anyway.
        expect(results[1].score).toBeLessThan(0);
    });

    it("a genuine non-match is still absent — the repair rescues nothing extra", () => {
        const idx = buildIndex([item("1", "alpha", "beta gamma", "delta")]);
        expect(searchIndex(idx, "zzzz")).toEqual([]);
        // out-of-order is not a subsequence, at any length
        expect(searchIndex(idx, "ahpla")).toEqual([]);
    });
});

describe("clearSearchCache", () => {
    it("clears the per-index cache so a re-query re-scores", () => {
        const idx = buildIndex([item("1", "Glass panel")]);
        const a = searchIndex(idx, "glass");
        clearSearchCache(idx);
        const b = searchIndex(idx, "glass");
        expect(a.map((r) => r.item.id)).toEqual(b.map((r) => r.item.id));
    });
});
