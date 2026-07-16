// Dock-as-native-dynamic-search-bar seam.
//
// Tap the collapsed dock pill and it MORPHS — continuously, via the dock's own
// `--dock-morph-t`/`--dock-t` plate glide, not a hard swap — into a
// search field; type and the fuzzy dropdown ranks live; ArrowDown/Up walks the results,
// Enter routes; a result-select scrolls-to-and-warms the windowed target; tap away and
// the dock returns to a compact PERSISTENT bar. The morph is the reward (the iOS-27
// retained delight); the dock NEVER auto-collapses on a passive scroll (the iOS-27
// lesson — that costs a tap).
//
// `useDockSearch` is a
// search mode BESIDE the dock state machine + the morph engine, NOT an edit to either:
//   - it COMPOSES `useDockState` (the existing 3-state machine) — `armSearch()` is
//     `onClickCollapsed()` (collapsed → pinned) + `keepOpen()` (the ref-counted hold so
//     the dock stays open through the search gesture); `disarmSearch()` is `release()`.
//     NO new state machine.
//   - it does NOT import `useDockMorph`/`dockMorphMeasure`/`DOCK_SPRING` for an
//     EDIT (the box-inviolate fence). The pill→field morph rides the dock's OWN
//     `--dock-morph-t`/`--dock-t` plate glide — NO second spring.
//
// The composable is headless: consumers author the field and portaled results surface.
// The library owns only the optional `ensureTargetWindow` callback seam; demo
// compositions may satisfy it with their demo-local windower.
//
// THE ONE-OF-EACH DISCIPLINE. The matcher is `useFuzzySearch` (the VSCode subsequence
// scorer — composed, NEVER re-forked); the optional scroll reader is
// `useScrollChrome` → `useScrollTrigger` (the
// ONE native dual-path reader — NO hand-rolled `addEventListener("scroll")`, the words
// `useSearchBarScroll` supersession); result selection invokes the consumer's
// optional warm callback before `useScrollTo`. No second of any.
//
// THE WORDS SUBSUME (the foreign-tree fence, inv-26). The words app's `SearchBar.vue` +
// its ~7 search composables RETIRE onto `<GlassDock search>` on the `^4.x` consume —
// THEIR repo edit. The network orchestration (`useLookupSearch` abort/generation) stays
// words-LOCAL, plugged via the pluggable async `onSearch(query, signal)` data source:
// the consumer owns the abort/network race-guard, the dock owns the gesture/shrink/
// dropdown. The dock's own thin abort cancels the prior `AbortController` on a new query.

import {
    computed,
    onScopeDispose,
    ref,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import type { UseDockStateReturn } from "./useDockState";
import {
    useFuzzySearch,
    type FuzzySearchState,
    type SearchableItem,
    type SearchResult,
} from "../../search/composables";
import {
    useScrollChrome,
    type UseScrollChromeReturn,
} from "../../../composables/motion/scroll/useScrollChrome";

export interface UseDockSearchOptions<T extends SearchableItem = SearchableItem> {
    /** Composes the existing dock state machine (no fork) — `armSearch`/`disarmSearch`
        ride its `onClickCollapsed`/`keepOpen`/`release`. */
    dockState: UseDockStateReturn;
    /**
     * The search items (sync) — a static array or a getter. Drives the composed
     * `useFuzzySearch` matcher. MUTUALLY EXCLUSIVE with `onSearch` (sync XOR async).
     */
    items?: T[] | (() => T[]);
    /**
     * The pluggable async data source (the words network case). The consumer owns the
     * abort/network race-guard; the dock owns the gesture/shrink/dropdown. When set, the
     * dock awaits the source on each query, cancelling the prior request's
     * `AbortController` (the generic thin abort). MUTUALLY EXCLUSIVE with `items`.
     */
    onSearch?: (query: string, signal: AbortSignal) => Promise<T[]>;
    /** Debounce delay in ms forwarded to the matcher / the async source. Default 120. */
    debounceMs?: number;
    /** Maximum results forwarded to the matcher. Default 30. */
    maxResults?: number;
    /**
     * Opt-in collapse-on-scroll — composes `useScrollChrome` (persistent-default, the
     * iOS-27 lesson). DEFAULT FALSE: the dock is PERSISTENT; the morph fires on user
     * intent (tap/focus), never a passive scroll. When true the chrome shrinks+fades on
     * scroll-down + expands on scroll-up (the transform-only `--chrome-collapse-t` ramp).
     */
    collapseOnScroll?: boolean;
    /** The scroll source for the optional collapse-on-scroll (a container or window). */
    scrollContainer?: MaybeRefOrGetter<HTMLElement | Window | null>;
    /** The dock element the collapse-on-scroll writes `--chrome-collapse-t` onto. */
    chromeRef?: MaybeRefOrGetter<HTMLElement | null>;
    /**
     * Result-select hook — wires the ToC subsume: `ensureTargetWindow(id)` (seat the
     * target's bounded render window) + `scrollTo(id)` (the rAF-retry scroll-to-and-land).
     * The dock owns the gesture; the consumer passes the two leaves' bound functions.
     */
    onResultSelect?: (result: SearchResult<T>) => void;
    /**
     * Consumer-provided target-window step. Called BEFORE `scrollTo` on result
     * selection so a windowed target can render before the scroll lands.
     */
    ensureTargetWindow?: (id: string) => void;
    /**
     * The ToC scroll-to (composed `useScrollTo.scrollTo`) — the rAF-retry scroll-to-id.
     * Called AFTER the target-window step on a result-select.
     */
    scrollTo?: (id: string) => void;
}

export interface UseDockSearchReturn<T extends SearchableItem = SearchableItem> {
    /** The composed `useFuzzySearch` handle (query/results/selectedIndex/onKeydown/…). */
    fuzzy: FuzzySearchState<T>;
    /** The ghost-text top-match completion (the unmatched suffix of `results[0].label`). */
    autocompleteText: Ref<string>;
    /** The optional collapse-on-scroll machine (null when `collapseOnScroll` is false). */
    scrollChrome: UseScrollChromeReturn | null;
    /** Tap/focus → expand + hold (composes `onClickCollapsed` + `keepOpen`). */
    armSearch: () => void;
    /** Close → release the hold (composes `release`) + close the fuzzy surface. */
    disarmSearch: () => void;
    /** Tab/Space/ArrowRight → fill the ghost-text into the query. */
    acceptAutocomplete: () => void;
    /** True while the search field is the armed/morphed surface. */
    isSearchArmed: Ref<boolean>;
}

/**
 * The dock-search seam — composes `useDockState` + `useFuzzySearch` (+ optional
 * `useScrollChrome`); the `armSearch`/`disarmSearch`/`autocompleteText`/
 * `acceptAutocomplete` surface; the async `onSearch` adapter; the `onResultSelect` →
 * `ensureTargetWindow` + `scrollTo` wire. Does NOT edit the morph engine
 * (`useDockMorph`/`DOCK_SPRING` byte-untouched — the box-inviolate fence); the
 * pill→field morph is the dock's OWN `--dock-morph-t`/`--dock-t` plate glide, and the
 * results surface is consumer-authored and can be portaled independently of the dock.
 *
 * @example
 * ```ts
 * const dockState = useDockState({ rootEl });
 * const search = useDockSearch({ dockState, items: () => sections.value });
 * // armSearch() on tap → the pill morphs into the field; type → fuzzy dropdown ranks.
 * ```
 */
export function useDockSearch<T extends SearchableItem = SearchableItem>(
    options: UseDockSearchOptions<T>,
): UseDockSearchReturn<T> {
    const { dockState } = options;
    const debounceMs = options.debounceMs ?? 120;
    const maxResults = options.maxResults ?? 30;

    // The async source feeds a reactive results array the matcher reads as its `items`
    // when `onSearch` is set; otherwise the sync `items` flow straight through. The two
    // are mutually exclusive (sync XOR async) — the async path owns the abort.
    const asyncItems = ref<T[]>([]) as Ref<T[]>;
    let abortController: AbortController | null = null;

    // The matcher's item source: the sync `items` when given, else the async buffer the
    // `onSearch` adapter fills. ONE matcher — `useFuzzySearch` (the VSCode scorer); the
    // async source just swaps what feeds it (the dropdown/keyboard-nav is identical).
    const matcherItems: T[] | (() => T[]) = options.items
        ? options.items
        : () => asyncItems.value;

    // The result-select → ToC subsume: seat the target window, then scroll-to-and-land. The dock
    // owns the gesture; the consumer's `onResultSelect`/`ensureTargetWindow`/`scrollTo`
    // are the wired leaves (the words `scrollToSelectedResult` generalized).
    function handleSelect(result: SearchResult<T>): void {
        const id = result.item.id;
        // Seat the target window BEFORE the scroll (ensure the target renders).
        options.ensureTargetWindow?.(id);
        // The rAF-retry scroll-to-and-land AFTER the target is rendered.
        options.scrollTo?.(id);
        // The consumer's own select hook (route/navigate).
        options.onResultSelect?.(result);
    }

    // The composed fuzzy matcher — the dropdown + the keyboard nav (Arrow/Enter/Escape
    // already in `onKeydown`). NO re-implemented subsequence scorer in the dock.
    const fuzzy = useFuzzySearch<T>({
        items: matcherItems,
        debounceMs,
        maxResults,
        onSelect: handleSelect,
    });

    // ── The async `onSearch` adapter (the words network case) ──────────────────────
    // On each query the dock cancels the prior `AbortController` (the generic thin abort)
    // and awaits the consumer's source; a stale resolution (its controller already
    // aborted) is dropped. The consumer owns the network/generation race INSIDE
    // `onSearch`; this is the dock's own minimal abort wiring (no `useAsyncSearch`
    // abstraction until another consumer needs it).
    if (options.onSearch) {
        const runAsync = options.onSearch;
        watch(
            () => fuzzy.query.value,
            (q) => {
                abortController?.abort();
                if (!q) {
                    asyncItems.value = [];
                    return;
                }
                const controller = new AbortController();
                abortController = controller;
                runAsync(q, controller.signal)
                    .then((items) => {
                        if (controller.signal.aborted) return;
                        asyncItems.value = items;
                    })
                    .catch((err) => {
                        if (controller.signal.aborted) return;
                        // A genuine source error clears the stale results (the consumer
                        // surfaces its own error UI through its source).
                        if ((err as { name?: string })?.name !== "AbortError") {
                            asyncItems.value = [];
                        }
                    });
            },
        );
    }

    // ── The autocomplete ghost-text (the words `useAutocomplete` generalized) ────────
    // When `results[0].item.label` starts-with the query (case-insensitive), the
    // ghost-text is the unmatched suffix. Generic over the fuzzy result — NO words type.
    const autocompleteText = computed<string>(() => {
        const q = fuzzy.query.value;
        if (!q) return "";
        const top = fuzzy.results.value[0];
        if (!top) return "";
        const label = top.item.label;
        if (
            label.toLowerCase().startsWith(q.toLowerCase()) &&
            label.length > q.length
        ) {
            return label.slice(q.length);
        }
        return "";
    });

    function acceptAutocomplete(): void {
        const suffix = autocompleteText.value;
        if (!suffix) return;
        fuzzy.query.value = fuzzy.query.value + suffix;
    }

    // ── The gesture: arm/disarm (composes the existing state-machine seam) ───────────
    const isSearchArmed = ref(false);

    function armSearch(): void {
        if (isSearchArmed.value) return;
        isSearchArmed.value = true;
        // collapsed → pinned (the existing expand-on-click seam) + the ref-counted hold
        // so the dock stays open through the search gesture (useDockState.ts:328-345).
        dockState.onClickCollapsed();
        dockState.keepOpen();
        fuzzy.open();
    }

    function disarmSearch(): void {
        if (!isSearchArmed.value) return;
        isSearchArmed.value = false;
        fuzzy.close();
        // Release the ref-counted hold; the dock's own grace-period timer returns it to
        // the compact PERSISTENT bar (NO extra-tap-to-restore).
        dockState.release();
    }

    // ── The optional collapse-on-scroll (composes `useScrollChrome`) ────────────────
    // PERSISTENT by default — `collapseOnScroll` defaults false, so a bare dock-search
    // does NOT collapse (the iOS-27 lesson). The shrink is the native dual-path
    // `--chrome-collapse-t` ramp (NO hand-rolled scroll listener — the words
    // `useSearchBarScroll` supersession onto `useScrollTrigger`).
    let scrollChrome: UseScrollChromeReturn | null = null;
    if (options.collapseOnScroll && options.scrollContainer) {
        scrollChrome = useScrollChrome(options.scrollContainer, {
            collapseOnScroll: true,
            chromeRef: options.chromeRef,
        });
    }

    onScopeDispose(() => {
        if (isSearchArmed.value) dockState.release();
        abortController?.abort();
        abortController = null;
    });

    return {
        fuzzy,
        autocompleteText,
        scrollChrome,
        armSearch,
        disarmSearch,
        acceptAutocomplete,
        isSearchArmed,
    };
}
