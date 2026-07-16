// useScrollPin — the headline scroll-pin driver.
//
// Replaces the DEAD `.scroll-pin` named-`scroll-timeline` (which resolved
// `currentTime: null` on EVERY engine — `.scroll-pin` is not a scroll port, so its
// `--gl-pin` timeline never advanced and the bound reveal parked at its `from` keyframe
// forever). This is the JS `--pin-t` writer: a `useScrollScene` bound to the sticky stage,
// `property: "--pin-t"`, driven on `SpringProgress` (the felt reveal overshoots then
// settles — the cartoon slam). Works on EVERY engine including Safari 15 — no timeline
// primitive, no `@supports` gate.
//
// THE PIN-SLICE RATIO (real new measurement — NOT a mechanical lift). The reader gives an
// extent-relative page progress; the pin wants its OWN local progress across the tall
// `.scroll-pin` container's pinned span. We measure it per tick off the container's
// `getBoundingClientRect`: `--pin-t = (0 − rect.top) / (rect.height − viewportH)` — 0 when
// the container top reaches the scroll-port top (the stage just pinned), 1 when its bottom
// reaches the port bottom (the stage unpins). Measured against the resolved scroll port so
// it tracks the SAME source the reader listens on.
//
// KEYFRAMES-BEARING (via useScrollScene) → ships on `/motion`.

import { toValue, type MaybeRefOrGetter, type Ref } from "vue";
import type { ComponentPublicInstance } from "vue";
import { useScrollScene } from "./useScrollScene";
import type { ScrollSource } from "./scrollReader";
import { asElement } from "../core/asElement";

export interface UseScrollPinOptions {
    /**
     * The tall `.scroll-pin` container (a templateRef to the element or a component). Its
     * `getBoundingClientRect` gives the pin-slice ratio; `--pin-t` is written onto it (it
     * `inherits: true` so the sticky stage + phase children read it).
     */
    container: MaybeRefOrGetter<HTMLElement | ComponentPublicInstance | null>;
    /**
     * The scroll source the pin tracks — the demo passes `main.demo-main-scroller`. Passed
     * EXPLICITLY (the reader does not auto-discover). Default: the window/document.
     */
    source?: MaybeRefOrGetter<ScrollSource>;
    /**
     * The pin scrub ∈ [0, 1] — the pin drifts HEAVIER than a control (a scene, not a knob).
     * Defaults to 1/φ² ≈ 0.382 (the golden heavier-drift rest). PRM → 0.
     */
    scrub?: number;
    /** The spring damping ratio ζ for the felt reveal. < 1 overshoots. Default 0.85. */
    dampingFraction?: number;
    /** Honor `prefers-reduced-motion: reduce`. Default true. */
    respectReducedMotion?: boolean;
}

export interface UseScrollPinReturn {
    /** The spring-damped 0..1 pin progress (reactive — mirrors `--pin-t`). */
    pinT: Readonly<Ref<number>>;
    /** Force a re-read (post-resize). */
    recalculate: () => void;
    /** Detach. */
    dispose: () => void;
}

/**
 * Drive `--pin-t` ∈ [0, 1] onto a sticky `.scroll-pin` stage off the real scroll port,
 * spring-damped so the pinned reveal arrives with inertia, overshoots, then settles. The
 * phase recipes (`.scroll-pin-phase-reveal` / `-settle`) read `--pin-t` — no
 * `animation-timeline`, every engine.
 *
 * @example
 * ```ts
 * const pinContainer = ref<HTMLElement | null>(null)
 * useScrollPin({
 *   container: pinContainer,
 *   source: () => document.querySelector<HTMLElement>("main.demo-main-scroller"),
 * })
 * ```
 */
export function useScrollPin(options: UseScrollPinOptions): UseScrollPinReturn {
    const {
        scrub = 0.382,
        dampingFraction = 0.85,
        respectReducedMotion = true,
    } = options;

    // The pin-slice mapper — the container's OWN progress across its pinned span, measured
    // per tick off the live rect against the resolved scroll port height.
    function pinSliceRatio(): number {
        const el = asElement(toValue(options.container));
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        // The scroll-port viewport height the container scrolls through. When the source is
        // an element we measure ITS clientHeight (the rect.top is relative to the viewport,
        // but the pinned span the stage travels equals the container height minus the port
        // height); else the window innerHeight.
        const src = toValue(options.source);
        const portTop =
            src instanceof HTMLElement ? src.getBoundingClientRect().top : 0;
        const portH =
            src instanceof HTMLElement
                ? src.clientHeight
                : typeof window !== "undefined"
                  ? window.innerHeight
                  : 0;
        const span = rect.height - portH;
        if (span <= 0) return 0;
        const travelled = portTop - rect.top;
        const t = travelled / span;
        return t < 0 ? 0 : t > 1 ? 1 : t;
    }

    // Compose the scene SYNCHRONOUSLY at setup time — `useScrollScene` registers its own
    // `onMounted` (attach) + `onScopeDispose` (cleanup); nesting it inside an outer
    // `onMounted` would register those hooks after the component already mounted (they would
    // never fire). The scene's mount-attach measures the live rect off the resolved port.
    const scene = useScrollScene({
        source: options.source ?? (() => null),
        map: () => pinSliceRatio(),
        scrub,
        register: "spring",
        dampingFraction,
        bindEl: () => asElement(toValue(options.container)),
        property: "--pin-t",
        respectReducedMotion,
    });

    return {
        pinT: scene.progress,
        recalculate: scene.recalculate,
        dispose: scene.dispose,
    };
}
