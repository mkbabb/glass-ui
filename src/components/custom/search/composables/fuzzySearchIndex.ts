/**
 * Generic fuzzy search index — builds a flat searchable index from items
 * and scores queries with VSCode-style fuzzy matching.
 * Pure functions, no Vue reactivity.
 */
import type { SearchableItem, SearchResult } from "./types";

// ── Internal index entry ────────────────────────────────────

interface IndexEntry<T extends SearchableItem> {
    item: T;
    /** Pre-lowercased fields, built once at index time. */
    _lc: {
        label: string;
        text: string;
        type: string;
    };
}

/** Opaque index handle. */
export type SearchIndex<T extends SearchableItem = SearchableItem> = IndexEntry<T>[];

// ── Fuzzy matching (VSCode-style subsequence scorer) ─────────

/**
 * Scores a fuzzy subsequence match of `pattern` against `text`.
 * Every character in `pattern` must appear in `text` in order.
 * Returns null if no match, otherwise { score, matches }.
 *
 * Scoring bonuses:
 *   +8  match at index 0 (start of string)
 *   +7  match after a word separator (space, -, _, ., /, \, :)
 *   +6  camelCase boundary (lowercase -> uppercase)
 *   +5  consecutive characters in a run
 *   +3  pattern index === text index (prefix alignment)
 *   +1  base per-character match
 *  -0.1 per excess character in text (prefer tighter matches)
 */
export function fuzzyMatch(
    pattern: string,
    text: string,
): { score: number; matches: number[] } | null {
    const pLen = pattern.length;
    const tLen = text.length;
    if (pLen === 0) return { score: 0, matches: [] };
    if (pLen > tLen) return null;

    const matches: number[] = [];
    let pi = 0;
    let score = 0;
    let prevIdx = -2;

    for (let ti = 0; ti < tLen && pi < pLen; ti++) {
        if (pattern[pi] !== text[ti]) continue;

        matches.push(ti);
        let cs = 1;

        if (prevIdx === ti - 1) cs += 5;

        if (ti === 0) {
            cs += 8;
        } else {
            const prev = text[ti - 1];
            if (" -_./\\:()".includes(prev)) {
                cs += 7;
            } else if (
                text[ti] >= "A" &&
                text[ti] <= "Z" &&
                prev >= "a" &&
                prev <= "z"
            ) {
                cs += 6;
            }
        }

        if (pi === ti) cs += 3;

        score += cs;
        prevIdx = ti;
        pi++;
    }

    if (pi < pLen) return null;

    score -= Math.max(0, (tLen - pLen) * 0.1);

    return { score, matches };
}

// ── Multi-token fuzzy search ─────────────────────────────────

interface TokenMatch {
    score: number;
    matches: number[];
}

/**
 * Matches a query against a single text field. The query is split into
 * whitespace tokens; every token must fuzzy-match independently (AND logic).
 */
function multiTokenFuzzy(
    queryTokens: string[],
    text: string,
): TokenMatch | null {
    if (!text) return null;
    let total = 0;
    const allMatches: number[] = [];

    for (const token of queryTokens) {
        const m = fuzzyMatch(token, text);
        if (!m) return null;
        total += m.score;
        for (const idx of m.matches) allMatches.push(idx);
    }

    return { score: total, matches: allMatches };
}

/**
 * Scores one query against one entry. Tries each field with different
 * weights and returns the best composite score.
 */
function scoreEntry<T extends SearchableItem>(
    tokens: string[],
    entry: IndexEntry<T>,
): { score: number; matches: number[] } | null {
    let best = 0;
    let bestMatches: number[] = [];

    const fields: [string, number][] = [
        [entry._lc.label, 12],
        [entry._lc.type, 10],
        [entry._lc.text, 3],
    ];

    for (const [text, weight] of fields) {
        if (!text) continue;
        const m = multiTokenFuzzy(tokens, text);
        if (m && m.score * weight > best) {
            best = m.score * weight;
            bestMatches = text === entry._lc.label ? m.matches : [];
        }
    }

    if (best <= 0) return null;
    return { score: best, matches: bestMatches };
}

// ── Index construction ───────────────────────────────────────

/** Build a search index from a list of items. */
export function buildIndex<T extends SearchableItem>(items: T[]): SearchIndex<T> {
    return items.map((item) => ({
        item,
        _lc: {
            label: item.label.toLowerCase(),
            text: item.text.toLowerCase(),
            type: item.type?.toLowerCase() ?? "",
        },
    }));
}

// ── Search function ──────────────────────────────────────────

type CachedResults = SearchResult<SearchableItem>[];

/** Query result cache scoped by index instance. */
let _cacheByIndex: WeakMap<object, Map<string, CachedResults>> = new WeakMap();

function getCache<T extends SearchableItem>(
    index: SearchIndex<T>,
): Map<string, SearchResult<T>[]> {
    let cache = _cacheByIndex.get(index) as Map<string, SearchResult<T>[]> | undefined;

    if (!cache) {
        cache = new Map<string, SearchResult<T>[]>();
        _cacheByIndex.set(index, cache as unknown as Map<string, CachedResults>);
    }

    return cache;
}

/** Search the index for items matching `query`. */
export function searchIndex<T extends SearchableItem>(
    index: SearchIndex<T>,
    query: string,
    maxResults = 30,
): SearchResult<T>[] {
    const q = query.toLowerCase().trim();
    if (!q) {
        return [];
    }

    const cache = getCache(index);
    const cached = cache.get(q);
    if (cached) return cached.slice(0, maxResults);

    if (cache.size > 200) cache.clear();

    const tokens = q.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    // Narrow from prefix cache if available
    let candidates: IndexEntry<T>[] = index;
    if (q.length > 1) {
        const prefix = q.slice(0, -1);
        const prefixResults = cache.get(prefix);
        if (prefixResults) {
            // Re-wrap previous results back into IndexEntry form
            candidates = prefixResults.map((r: SearchResult<T>) => ({
                item: r.item,
                _lc: {
                    label: r.item.label.toLowerCase(),
                    text: r.item.text.toLowerCase(),
                    type: r.item.type?.toLowerCase() ?? "",
                },
            }));
        }
    }

    const scored: SearchResult<T>[] = [];
    for (const entry of candidates) {
        const m = scoreEntry(tokens, entry);
        if (m) {
            scored.push({ item: entry.item, score: m.score, matchIndices: m.matches });
        }
    }

    scored.sort((a, b) => b.score - a.score);
    cache.set(q, scored);
    return scored.slice(0, maxResults);
}

/** Clear search caches. Pass an index to clear only that instance. */
export function clearSearchCache(index?: SearchIndex): void {
    if (index) {
        _cacheByIndex.delete(index);
        return;
    }

    _cacheByIndex = new WeakMap();
}
