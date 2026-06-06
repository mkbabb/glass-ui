import { getCurrentScope, onScopeDispose, ref, type Ref } from "vue";

/**
 * Scope-aware `document.visibilityState` leaf (AV.W14) — the single source for
 * the `visibilitychange → document.hidden` pattern that the motion composables
 * (`useRAFLoop`, `useIntersectionPause`) and the WebGL substrate hand-rolled
 * four times over. Returns a `Ref<boolean>` `hidden` that flips on
 * `visibilitychange`; SSR-safe (defaults `false` when `document` is absent) and
 * self-disposing (the listener is removed on scope teardown).
 *
 * KISS: a per-call listener bound to the calling scope — NOT a global singleton.
 * Each consumer's reactive `hidden` ref is independent, so a consumer's own
 * pause policy (which `hidden`-true states it actually reacts to) is never
 * fragmented by a shared global flag; the de-dup is the listener boilerplate +
 * disposal, not the policy.
 */
export interface UseDocumentVisibilityReturn {
    /** Reactive `document.hidden` — `false` under SSR / when the API is absent. */
    hidden: Ref<boolean>;
}

function getDocument(): Document | null {
    return typeof document === "undefined" ? null : document;
}

export function useDocumentVisibility(): UseDocumentVisibilityReturn {
    const doc = getDocument();
    const hidden = ref(Boolean(doc?.hidden));

    if (!doc) {
        return { hidden };
    }

    const onVisibilityChange = (): void => {
        hidden.value = Boolean(doc.hidden);
    };

    doc.addEventListener("visibilitychange", onVisibilityChange);

    const dispose = (): void => {
        doc.removeEventListener("visibilitychange", onVisibilityChange);
    };

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return { hidden };
}
