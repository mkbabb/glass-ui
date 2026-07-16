import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    shallowRef,
    type EffectScope,
    type Ref,
} from "vue";

const QUERY = "(prefers-reduced-motion: reduce)";

const reduced = shallowRef(false);
const sharedReduced = readonly(reduced);
let mediaQuery: MediaQueryList | null = null;
let matchMediaSource: typeof window.matchMedia | null = null;
let listening = false;
const scopedConsumers = new Set<EffectScope>();
let unscopedConsumer = false;

function syncListener(): void {
    const shouldListen =
        mediaQuery !== null && (unscopedConsumer || scopedConsumers.size > 0);
    if (shouldListen === listening || !mediaQuery) return;

    if (shouldListen) mediaQuery.addEventListener("change", syncPreference);
    else mediaQuery.removeEventListener("change", syncPreference);
    listening = shouldListen;
}

function query(): MediaQueryList | null {
    const source =
        typeof window !== "undefined" && typeof window.matchMedia === "function"
            ? window.matchMedia
            : null;
    if (source === matchMediaSource) return mediaQuery;

    if (mediaQuery && listening)
        mediaQuery.removeEventListener("change", syncPreference);
    mediaQuery = source?.call(window, QUERY) ?? null;
    matchMediaSource = source;
    listening = false;
    return mediaQuery;
}

function syncPreference(event: MediaQueryListEvent): void {
    if (event.currentTarget && event.currentTarget !== mediaQuery) return;
    reduced.value = event.matches;
}

/** Read the current OS preference without subscribing (SSR-safe). */
export function readReducedMotion(): boolean {
    return typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(QUERY).matches
        : false;
}

/** Share one reactive OS preference and one MediaQueryList listener. */
export function useReducedMotion(): Readonly<Ref<boolean>> {
    const scope = getCurrentScope();
    if (!scope) {
        unscopedConsumer = true;
    } else if (!scopedConsumers.has(scope)) {
        scopedConsumers.add(scope);
        onScopeDispose(() => {
            scopedConsumers.delete(scope);
            syncListener();
        });
    }

    const media = query();
    syncListener();
    reduced.value = media?.matches ?? false;

    return sharedReduced;
}
