// Reactive read of a CSS custom property's resolved value.
//
// Canvas + Aurora consumers reach for `getComputedStyle(...).getPropertyValue`
// and re-resolve at dark-mode toggles via ad-hoc watchers. The read itself is
// imperative; the watch is hand-rolled per call site. This composable folds
// both halves into one reactive ref that re-resolves on `useGlobalDark`
// transitions and on the `(prefers-color-scheme: dark)` media query.
//
// CSS custom properties don't fire change events on the platform — there's no
// MutationObserver hook on resolved property values. The reactive seam lives
// at the cascade root: dark-mode flips the `<html>.dark` class. We observe that
// class directly (a native `MutationObserver` on `<html>`'s `class` attribute)
// plus the OS `(prefers-color-scheme: dark)` media query, and re-resolve on
// either — vueuse-FREE, so `useTokenColor` stays on the curated root barrel (the
// full `useGlobalDark` machinery is reachable only via the `/dark` subpath; a
// root-barrel composable must not transitively import `@vueuse/core` — the SCC
// trap). A one-shot resolve runs at scope creation; consumers that need a fresh
// read at an arbitrary moment call `refresh()`.

import {
    getCurrentScope,
    onMounted,
    onScopeDispose,
    ref,
    toValue,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { watch } from "vue";

export interface UseTokenColorOptions {
    /** Element to resolve the property against. Defaults to `<html>`. */
    element?: MaybeRefOrGetter<HTMLElement | null | undefined>;
    /** Fallback when the property is unset or `document` is unavailable (SSR). */
    fallback?: string;
}

export interface UseTokenColorControls {
    /** Reactive resolved value. Trimmed; falls back to `options.fallback` when empty. */
    value: Readonly<Ref<string>>;
    /** Force a re-read of the property — useful after manual cascade mutations. */
    refresh: () => void;
}

/**
 * Read a CSS custom property as a reactive ref.
 *
 * The ref re-resolves automatically on dark-mode toggles via `useGlobalDark`
 * and at mount. SSR returns the fallback.
 *
 * @example
 * const stroke = useTokenColor("--meter-track-stroke", { fallback: "#ccc" });
 * watch(stroke, (next) => repaintRingTrack(next));
 *
 * // With an element-scoped resolve (e.g. a themed container):
 * const accent = useTokenColor("--accent", { element: panelEl });
 */
export function useTokenColor(
    token: MaybeRefOrGetter<string>,
    options: UseTokenColorOptions = {},
): UseTokenColorControls {
    const fallback = options.fallback ?? "";
    const value = ref<string>(fallback);

    function read(): string {
        if (typeof document === "undefined") return fallback;
        const name = toValue(token);
        if (!name) return fallback;
        const el = (options.element ? toValue(options.element) : null) ?? document.documentElement;
        if (!el) return fallback;
        const resolved = getComputedStyle(el).getPropertyValue(name).trim();
        return resolved || fallback;
    }

    function refresh(): void {
        value.value = read();
    }

    // First resolve happens once the DOM is mounted — `getComputedStyle`
    // before mount would observe the pre-cascade tree. Setup-time refresh
    // sets the fallback baseline so consumers never read undefined.
    refresh();
    onMounted(refresh);

    // Re-resolve on theme transitions — observe the cascade root directly (the
    // `.dark` class flip on `<html>` + the OS `prefers-color-scheme` query),
    // vueuse-free, so this composable stays on the curated root barrel.
    if (typeof document !== "undefined") {
        const observer = new MutationObserver(refresh);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        const mq =
            typeof window !== "undefined" && window.matchMedia
                ? window.matchMedia("(prefers-color-scheme: dark)")
                : null;
        mq?.addEventListener?.("change", refresh);
        if (getCurrentScope()) {
            onScopeDispose(() => {
                observer.disconnect();
                mq?.removeEventListener?.("change", refresh);
            });
        }
    }

    // Track token-name changes (a ref or getter that swaps the property
    // queried — e.g. switching `--accent-warm` ↔ `--accent-cool`).
    watch(
        () => toValue(token),
        refresh,
    );

    // Track element changes when the consumer passes a ref that mounts late.
    if (options.element !== undefined) {
        watch(
            () => toValue(options.element),
            refresh,
        );
    }

    return { value, refresh };
}
