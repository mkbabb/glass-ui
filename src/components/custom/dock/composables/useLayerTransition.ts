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
 * - **Fallback path** (no `startViewTransition`): the existing axis-aware FLIP
 *   runs verbatim, KEPT as the sole feature-detected fallback (no alias — one
 *   path or the other runs per swap, never both):
 *   1. Capture current container size
 *   2. Pin container to that size
 *   3. Swap classes: old layer → leaving, new layer → active
 *   4. nextTick: measure new natural size, re-pin to old
 *   5. Animate to new size via CSS transition
 *   6. On transitionend(size), clear inline size
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
    // superseded swap's loop is stopped/disposed before the next one arms.
    let spring: SpringProgress | null = null;

    function disposeSpring() {
        if (spring) {
            spring.dispose();
            spring = null;
        }
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
        const properties = style.transitionProperty.split(",").map((part) => part.trim());
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
            currentLayer.value = newLayer;
            leavingLayer.value = null;
            return;
        }

        // ── Fallback path — the kept axis-aware FLIP.
        clearCleanup();
        const id = ++transitionId;

        // Stop/dispose any driver from a superseded swap so its onFrame loop
        // cannot race the live one (AU.W8.3). The transitionId already gates the
        // ID, but disposing frees the rAF immediately rather than on next tick.
        disposeSpring();

        // 1. Capture current size
        const fromSize = getSize(el);

        // 2. Pin size (prevents snap during class swap)
        setDim(el, `${fromSize}px`);

        // 3. Measure new natural size, then drive the morph. The layer ref swap
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

                // Re-pin to the old size so the morph runs from `fromSize`.
                setDim(el, `${fromSize}px`);
                void el.offsetWidth;

                if (Math.abs(toSize - fromSize) < 0.5) {
                    el.style.transition = "";
                    clearDim(el);
                    leavingLayer.value = null;
                    return;
                }

                // 4. Drive width off ONE SpringProgress clock (AU.W8.3) so width
                // + opacity advance off the same solver and converge within one
                // frame at settle. Mirrors useSpring.ts:105-136. The JS driver
                // OWNS the container width (transition stays "none" on `el` so
                // the CSS `width var(--dock-motion-resize)` does not fight the
                // per-frame inline set); the pane opacity stays class-driven (a
                // SEPARATE element — `.dock-layer-item-host` — so its
                // --dock-motion-resize fade is unaffected). Both consume the SAME
                // (0.5, 0.5) curve (the token + the driver), so width + opacity
                // are timing-identical by construction.
                spring = new SpringProgress({
                    response: DOCK_SPRING.response,
                    dampingFraction: DOCK_SPRING.dampingFraction,
                    respectReducedMotion: true,
                });
                const activeSpring = spring;
                activeSpring.target = 1;
                activeSpring.play((p: number) => {
                    if (id !== transitionId) return;
                    const w = fromSize + (toSize - fromSize) * p;
                    setDim(el, `${w}px`);
                    // Default: opacity stays class-driven (the CSS transition on
                    // `.dock-layer-item-host`, lockstep on --dock-motion-resize).
                    // Escalate to inline clamped opacity ONLY if the settle probe
                    // shows drift: clamp01(p) on the active host, 1-clamp01(p) on
                    // the leaving host.
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
