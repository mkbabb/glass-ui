import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { startViewTransition } from "../../../../composables/motion/useViewTransition";

/**
 * The dock resize-morph spring (AU.W8.3). MIRRORS the `--spring-dock` PRESETS
 * row in `scripts/regen-spring-tokens.mjs` (response 0.5, ζ 0.5, ~+18.5%
 * overshoot) so the build-time CSS token and the runtime driver sample the
 * SAME analytic ODE — bit-identical motion. A retune MUST touch BOTH this const
 * and the PRESETS row, or the CSS-token and JS-driven curves drift.
 *
 * LIGHT-surface only: `SpringProgress` carries no static value.js edge (it owns
 * its own `RAFPlayback` via `.play(onFrame)`). NEVER import `AnimationGroup` /
 * `loadAnimationEngine` / `CSSKeyframesAnimation` / `.fromString` — those cross
 * the HEAVY `./engine` boundary and pull value.js into the dock bundle
 * (AU-keyframes-coordination.md §2.3).
 */
const DOCK_SPRING = { response: 0.5, dampingFraction: 0.5 } as const;

export interface UseLayerTransitionOptions {
    /** The container element that owns the stacked layer panes. */
    containerEl: Ref<HTMLElement | null>;
    /** The currently active layer id */
    activeLayer: Ref<string>;
    /**
     * Animation axis. `"horizontal"` animates `width`; `"vertical"` animates
     * `height`. Defaults to horizontal when omitted.
     */
    axis?: Ref<"horizontal" | "vertical">;
}

export interface UseLayerTransitionReturn {
    /** Attach to @transitionend on the container */
    onTransitionEnd(e: TransitionEvent): void;
    /** The currently active layer id (post-swap) */
    currentLayer: Ref<string>;
    /** The layer id currently fading out, or null */
    leavingLayer: Ref<string | null>;
}

/**
 * Coordinates the crossfade + size animation between grid-stacked dock layer
 * panes. Reusable at any nesting level (the inner `<DockLayerGroup>` pair AND
 * the outer GlassDock collapsed↔expanded pair).
 *
 * AQ.W6 §Design 7 — the swap FORKS on View-Transitions support:
 *
 * - **Native path** (`document.startViewTransition` present): the layer swap is
 *   wrapped in `startViewTransition(() => mutate())`. The browser snapshots the
 *   container + panes (tagged `view-transition-name` in `dock.css`) and morphs
 *   the size + crossfades the pane content with ZERO `getBoundingClientRect`
 *   reads. No pin/measure/re-pin dance, no inline size, no rAF.
 *
 * - **Fallback path** (no `startViewTransition`): the axis-aware FLIP, KEPT as
 *   the sole feature-detected fallback (no alias — one path or the other runs per
 *   swap, never both). It is now the ONLY driver that writes inline size on a
 *   non-VT engine (AV.W9.0 retired the `interpolate-size`/`calc-size` CSS arm that
 *   used to second-drive width on Chrome 129+ and freeze the dock):
 *   1. Capture current container size (or the live spring's pixel value on a
 *      retarget)
 *   2. Pin container to that size
 *   3. nextTick → rAF: swap classes (old → leaving, new → active) AND measure new
 *      natural size in ONE frame origin
 *   4. Drive size off ONE `SpringProgress` clock in PIXEL space (its `value` IS
 *      the live width/height)
 *   5. On settle, clear inline size + restore the CSS transition
 *
 *   AV.W9.2 — velocity-continuity: an interrupted swap (a re-toggle while the
 *   spring is still live) RE-SEATS the existing solver's target from its current
 *   `(value, velocity)` instead of dispose+reconstruct-from-rest, so the morph is
 *   continuous through a retarget (the iOS interruptible-spring contract).
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer, axis } = options;

    // Forked once at composable construction — `startViewTransition` support is
    // a stable engine capability, not a per-swap condition.
    const NATIVE_VT =
        typeof document !== "undefined" && "startViewTransition" in document;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );
    const getSize = (el: HTMLElement) => el.getBoundingClientRect()[dim.value];

    const currentLayer = ref(activeLayer.value);
    const leavingLayer = ref<string | null>(null);
    let transitionId = 0;
    let cleanupTimer: ReturnType<typeof setTimeout> | null = null;
    // The live FLIP-fallback driver (AU.W8.3); held on a closure var so a
    // retargeted swap can RE-SEAT it from its current `(value, velocity)` rather
    // than dispose+reconstruct from rest (AV.W9.2, the iOS interruptible-spring
    // contract). The spring drives the container size in PIXEL space directly —
    // its `value` IS the live width/height — so a retarget is the solver's native
    // `set target(newToSize)`, which re-seats the closed-form solution from the
    // current pixel value AND velocity (keyframes.d.ts:800-805). The element it is
    // driving is captured alongside so the live frame loop keeps writing the right
    // box across a retarget.
    let spring: SpringProgress | null = null;
    let springEl: HTMLElement | null = null;

    function disposeSpring() {
        if (spring) {
            spring.dispose();
            spring = null;
        }
        springEl = null;
    }

    function parseTimeMs(value: string): number {
        const trimmed = value.trim();
        if (!trimmed) return 0;
        if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
        if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
        return Number.parseFloat(trimmed) || 0;
    }

    function cleanupDelayMs(el: HTMLElement): number {
        const style = getComputedStyle(el);
        const properties = style.transitionProperty
            .split(",")
            .map((part) => part.trim());
        const durations = style.transitionDuration.split(",").map(parseTimeMs);
        const delays = style.transitionDelay.split(",").map(parseTimeMs);
        const candidates = durations.map((duration, index) => {
            const property = properties[index] ?? properties[0] ?? "all";
            if (property !== "all" && property !== dim.value) return 0;
            return duration + (delays[index] ?? delays[0] ?? 0);
        });
        return Math.max(0, ...candidates) + 50;
    }

    function clearCleanup() {
        if (cleanupTimer) {
            clearTimeout(cleanupTimer);
            cleanupTimer = null;
        }
    }

    function setDim(el: HTMLElement, value: string) {
        el.style.setProperty(dim.value, value);
    }

    function clearDim(el: HTMLElement) {
        el.style.removeProperty(dim.value);
    }

    watch(activeLayer, (newLayer, oldLayer) => {
        if (newLayer === oldLayer) return;

        const el = containerEl.value;
        if (!el) {
            currentLayer.value = newLayer;
            leavingLayer.value = null;
            return;
        }

        // ── Native path (AQ.W6) — the browser owns the size morph + crossfade.
        // Mutate the layer state synchronously inside `startViewTransition` (the
        // callback snapshots old → new); ZERO getBoundingClientRect. The leaving
        // pane is held painted for the duration of the snapshot transition, then
        // cleared on `finished`. `view-transition-name` on the container + panes
        // (set in `dock.css`) drives the morph.
        if (NATIVE_VT) {
            clearCleanup();
            const id = ++transitionId;
            const { finished } = startViewTransition(() => {
                leavingLayer.value = oldLayer;
                currentLayer.value = newLayer;
            });
            finished.finally(() => {
                if (id !== transitionId) return;
                leavingLayer.value = null;
            });
            return;
        }

        // ── prefers-reduced-motion fast-path (AU.W8.1). A single synchronous
        // state swap — no measure/pin/animate dance, no inline size, no rAF, no
        // spring driver. The VT path's PRM is CSS-gated (view-transition.css);
        // the FLIP fallback needs this explicit JS gate. Returns BEFORE any
        // driver is constructed (belt-and-suspenders with the driver's own
        // `respectReducedMotion`).
        const prm =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        if (prm) {
            clearCleanup();
            ++transitionId;
            currentLayer.value = newLayer;
            leavingLayer.value = null;
            return;
        }

        // ── Fallback path — the kept axis-aware FLIP.
        clearCleanup();
        const id = ++transitionId;

        // AV.W9.2 — RETARGET an in-flight spring instead of dispose+reconstruct.
        // If a prior swap's spring is still live (non-null, unsettled, driving
        // THIS container), the morph is being interrupted mid-flight: read its
        // current pixel value as the new `from`, re-seat its target to the new
        // intrinsic size, and carry the in-flight velocity through (the solver's
        // `set target` re-seats the closed-form from the live `(value, velocity)`
        // — keyframes.d.ts:800). Disposing here would zero the velocity and the
        // morph would snap from rest (the non-iOS re-toggle the charter flags).
        const live =
            spring !== null && springEl === el && !spring.settled ? spring : null;

        // 1. Capture current size. On a retarget the live spring's value IS the
        // current painted pixel size (it has been writing it every frame); on a
        // fresh swap, measure the box.
        const fromSize = live ? live.value : getSize(el);

        if (!live) {
            // Fresh swap — dispose any settled/foreign driver, pin the box so the
            // class swap does not snap it, then construct a pixel-space spring.
            disposeSpring();
            setDim(el, `${fromSize}px`);
        }

        // 2. Measure new natural size, then drive the morph. The layer ref swap
        // (→ class-driven opacity) and the width set (→ size morph) must START
        // in the SAME animation frame, so the box never shrinks before items
        // fade (the async-fork the user reported). The swap is therefore
        // DEFERRED into the rAF callback that drives the width — one frame
        // ORIGIN for both (AU.W8.1; gate: proof:dock-motion-single-source).
        nextTick(() => {
            if (id !== transitionId) return;
            if (!el) return;

            requestAnimationFrame(() => {
                if (id !== transitionId) return;

                // Swap DEFERRED into the rAF so class-opacity and width-set
                // start in the SAME frame.
                leavingLayer.value = oldLayer;
                currentLayer.value = newLayer;

                // Measure new natural size (the swap is applied this tick).
                el.style.transition = "none";
                clearDim(el);
                const toSize = getSize(el);

                // Re-pin to the live `from` (the retarget pixel value or the
                // captured fresh size) so the morph runs continuously from there.
                setDim(el, `${fromSize}px`);
                void el.offsetWidth;

                if (!live && Math.abs(toSize - fromSize) < 0.5) {
                    el.style.transition = "";
                    clearDim(el);
                    leavingLayer.value = null;
                    return;
                }

                // 3. Drive size off ONE SpringProgress clock in PIXEL space — its
                // `value` is the live width/height. On a retarget reuse the live
                // solver (velocity carried through `set target`); on a fresh swap
                // construct one seeded at `fromSize`. The JS driver OWNS the
                // container size (transition stays "none" on `el` so the CSS
                // `width var(--dock-motion-resize)` does not fight the per-frame
                // inline set); the pane opacity stays class-driven on the SEPARATE
                // `.dock-layer-item-host` via its `--dock-motion-resize` fade, so
                // size + opacity settle in lockstep by the shared (0.5, 0.5)
                // curve (the token + the driver), continuous across a retarget.
                if (!live) {
                    spring = new SpringProgress({
                        response: DOCK_SPRING.response,
                        dampingFraction: DOCK_SPRING.dampingFraction,
                        initial: fromSize,
                        respectReducedMotion: true,
                    });
                    springEl = el;
                }
                const activeSpring = spring!;
                activeSpring.target = toSize;
                activeSpring.play((w: number) => {
                    if (id !== transitionId) return;
                    setDim(el, `${w}px`);
                    // Opacity stays class-driven via the --dock-motion-resize CSS
                    // transition on `.dock-layer-item-host`; the spring drives
                    // size only.
                    if (activeSpring.settled) {
                        el.style.transition = "";
                        clearDim(el);
                        leavingLayer.value = null;
                        disposeSpring();
                    }
                });

                // Safety: clear inline size + restore the CSS transition after
                // the computed window in case the spring's settle is missed.
                cleanupTimer = setTimeout(() => {
                    if (id !== transitionId) return;
                    el.style.transition = "";
                    clearDim(el);
                    leavingLayer.value = null;
                    disposeSpring();
                }, cleanupDelayMs(el));
            });
        });
    });

    function onTransitionEnd(e: TransitionEvent) {
        const el = containerEl.value;
        if (!el) return;
        if (e.target !== el) return;
        if (e.propertyName !== dim.value) return;

        clearCleanup();
        disposeSpring();
        el.style.transition = "";
        clearDim(el);
        leavingLayer.value = null;
    }

    onUnmounted(() => {
        clearCleanup();
        disposeSpring();
    });

    return { onTransitionEnd, currentLayer, leavingLayer };
}
