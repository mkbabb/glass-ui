// The contrast-safe INK half of the tonal-accent register (the
// JS half of `.accent-tone`). The value.js QUARANTINE (the sync
// value.js-FREE shell).
//
// This module is value.js-FREE: it carries NO top-level `@mkbabb/value.js` and NO
// `./index` (`/color` barrel) import — both are value.js-bearing, so a static edge
// into either would re-drag value.js into the eager `<Chip>` chunk. The ink SOLVE
// (the only value.js consumer) lives in the dynamically-imported `./accent-tone-solve`
// leaf, reached ONLY behind a dynamic `import()` boundary INSIDE this composable —
// the eager-graph payload move: value.js-bearing math is a code-split chunk, while the sync shell carries the
// var()-passthrough fast path).
//
// Two paths, split by TONE KIND:
//   - The `var(--…)` / unset tone (the HOT path) — fully synchronous, value.js-FREE.
//     A `var(` tone cannot be parsed to OKLCh at author time (it resolves in the
//     cascade), so there is no contrast solve to do: `ink` is `""` and the CSS
//     fallback (`var(--accent-ink-resolved, var(--foreground))`) carries the ink.
//     This is the common case (the library default + every brand-ramp consumer) —
//     it NEVER fires the dynamic import.
//   - The CONCRETE `#hex`/`oklch(…)` tone (the COLD path) — the dynamic boundary.
//     `ink` returns the synchronous interim `""` (the CSS fallback ink) AND kicks
//     off `import("./accent-tone-solve")`; when the value.js chunk resolves it caches
//     the resolved ink and bumps a reactive counter so `ink` re-runs and swaps to the
//     contrast-safe value the next tick (imperceptible on a determinate chip).
//
// The math source is value.js (in the leaf) — glass-ui re-implements ZERO OKLCh
// contrast/lightness math (`proof:single-color-core` holds). The public API
// (`useAccentTone(tone, opts) → { toneStyle, ink }`) +
// the option/return types are byte-preserved; only the value.js math moved behind
// the dynamic boundary.

import { computed, ref, toValue, type ComputedRef, type MaybeRefOrGetter, type Ref } from "vue";

export interface UseAccentToneOptions {
    /** Active band strength (0..1). Default 0.18 (the CSS `--accent-band-strength`). */
    bandStrength?: number;
    /** Target ink-over-band contrast. Default 4.5 (AA). */
    inkContrast?: number;
    /** The surface the accent paints ON (a CSS `<color>`). Default the warm-cream
     *  `--card`. A consumer on a dark/other plate passes its concrete surface so
     *  the ink solves against the right band lightness. */
    surface?: string;
}

export interface UseAccentToneReturn {
    /** The element-level custom-property style object — bind via `:style`. Carries
     *  `--tone` (so the CSS channels resolve) + `--accent-ink-resolved` (the
     *  contrast-safe label colour over the active band). */
    toneStyle: ComputedRef<Record<string, string>>;
    /** The resolved contrast-safe ink as a CSS `oklch(...)` string (for a non-CSS
     *  reader — a canvas label, a test). `""` on the `var()` / unset fast path or
     *  before the concrete-tone solve lands. */
    ink: ComputedRef<string>;
}

// The load-once cache for the dynamic ink solve — keyed by tone + the solve-relevant
// opts. A concrete tone is solved ONCE; a repeated call with the SAME key reads the
// cached ink synchronously (no re-import, no re-solve).
type InkCacheEntry =
    | { state: "pending"; promise: Promise<void> }
    | { state: "fulfilled"; value: string }
    | { state: "failed"; error: unknown }
    | { state: "absent" };

type AccentToneSolveModule = typeof import("./accent-tone-solve");

export const accentToneSolveBoundary = {
    load: () => import("./accent-tone-solve"),
};

const inkCache = new Map<string, InkCacheEntry>();
const cacheSubscribers = new Map<string, Set<Ref<number>>>();
let accentToneLoader: Promise<AccentToneSolveModule | null> | undefined;
const cacheKey = (toneCss: string, opts: UseAccentToneOptions) =>
    `${toneCss}|${opts.surface ?? ""}|${opts.inkContrast ?? ""}|${opts.bandStrength ?? ""}`;

function loadAccentToneSolve(): Promise<AccentToneSolveModule | null> {
    return (accentToneLoader ??= accentToneSolveBoundary.load().catch(() => null));
}

function observeCacheKey(key: string, signal: Ref<number>): void {
    const subscribers = cacheSubscribers.get(key) ?? new Set<Ref<number>>();
    subscribers.add(signal);
    cacheSubscribers.set(key, subscribers);
}

function settleCacheKey(key: string, entry: Exclude<InkCacheEntry, { state: "pending" }>): void {
    inkCache.set(key, entry);
    const subscribers = cacheSubscribers.get(key);
    cacheSubscribers.delete(key);
    for (const signal of subscribers ?? []) signal.value++;
}

/**
 * `useAccentTone(tone, opts)` — resolve the contrast-safe label ink for the tonal
 * register. A `var(--…)` / unset tone is value.js-free (`""` ink, the CSS fallback);
 * a concrete tone loads the value.js `./accent-tone-solve` leaf behind a dynamic
 * import and upgrades the ink the next tick. PRM-irrelevant (a colour, not an
 * animation). DOM-free + deterministic.
 */
export function useAccentTone(
    tone: MaybeRefOrGetter<string>,
    opts: UseAccentToneOptions = {},
): UseAccentToneReturn {
    // The reactive upgrade slot: bumped when a concrete-tone async solve lands, so
    // the `ink` computed re-runs and reads the now-populated inkCache.
    const solveVersion = ref(0);

    const ink = computed(() => {
        // Establish the reactive dependency on the async-solve landing.
        void solveVersion.value;

        const toneCss = toValue(tone) || "var(--primary)";

        // HOT path — a `var(--…)` tone resolves in the cascade, not at author time,
        // so there is no contrast solve to do. Return `""` synchronously; the CSS
        // `var(--accent-ink-resolved, var(--foreground))` fallback carries the ink.
        // NEVER fires the dynamic import (the value.js-free fast path).
        if (/var\(/.test(toneCss)) return "";

        // COLD path — a CONCRETE `#hex`/`oklch(…)` tone. If already solved, read the
        // cache synchronously. Otherwise return the interim `""` now and load the
        // value.js-bearing solve leaf; cache + bump the version when it resolves.
        const key = cacheKey(toneCss, opts);
        const cached = inkCache.get(key);
        if (cached?.state === "fulfilled") return cached.value;
        if (cached?.state === "absent") return "";
        if (cached?.state === "failed") throw cached.error;
        if (cached?.state === "pending") {
            observeCacheKey(key, solveVersion);
            return "";
        }

        observeCacheKey(key, solveVersion);

        // Attach both fulfillment and rejection handling before publishing the
        // promise in the cache. An absent optional value.js leaf is a terminal
        // process-local result: subsequent consumers reuse the CSS fallback and
        // never create a retry storm or an unhandled rejection.
        const pending = loadAccentToneSolve().then(
            (module) => {
                if (!module) {
                    settleCacheKey(key, { state: "absent" });
                    return;
                }
                try {
                    // lazy-boundary: value.js-free fast path; the concrete-tone ink solve is the ONLY value.js consumer
                    settleCacheKey(key, { state: "fulfilled", value: module.solveAccentInk(toneCss, opts) });
                } catch (error) {
                    settleCacheKey(key, { state: "failed", error });
                }
            },
        );
        inkCache.set(key, { state: "pending", promise: pending });
        void pending;
        return "";
    });

    const toneStyle = computed<Record<string, string>>(() => {
        const style: Record<string, string> = {
            "--tone": toValue(tone) || "var(--primary)",
        };
        const resolved = ink.value;
        if (resolved) style["--accent-ink-resolved"] = resolved;
        return style;
    });

    return { toneStyle, ink };
}
