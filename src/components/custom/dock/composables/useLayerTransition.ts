import { ref, computed, watch, nextTick, onUnmounted } from "vue";
import type { Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { startViewTransition } from "../../../../composables/motion/useViewTransition";

/**
 * The dock resize-morph spring (AU.W8.3). MIRRORS the `--spring-dock` PRESETS
 * row in `scripts/regen-spring-tokens.mjs` (response 0.32, ζ 0.7, ~+4.6%
 * overshoot — the AW.W2 iOS-control retune off the prior +18.5% playful
 * register) so the build-time CSS token and the runtime driver sample the SAME
 * analytic ODE — bit-identical motion. A retune MUST touch BOTH this const and
 * the PRESETS row, or the CSS-token and JS-driven curves drift.
 *
 * LIGHT-surface only: `SpringProgress` carries no static value.js edge (it owns
 * its own `RAFPlayback` via `.play(onFrame)`). NEVER import `AnimationGroup` /
 * `loadAnimationEngine` / `CSSKeyframesAnimation` / `.fromString` — those cross
 * the HEAVY `./engine` boundary and pull value.js into the dock bundle
 * (AU-keyframes-coordination.md §2.3).
 */
const DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 } as const;

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
    /**
     * AW.W3 — typed directional View-Transitions. Maps a swap `(from, to)` to
     * the `types` array passed to `startViewTransition`, so
     * `:active-view-transition-type(<t>)` CSS can author DIRECTION-specific
     * curves (snappier exit, softer entry-overshoot — the iOS-feel asymmetry).
     * The outer collapsed↔expanded pair resolves `dock-expand` / `dock-collapse`;
     * the inner DockLayerGroup pane swap resolves `layer-forward` / `layer-back`.
     * Omit to run the single symmetric curve. Feature-detected — degrades to the
     * symmetric curve on an engine without the `types` overload (Firefox 144).
     */
    directionTypes?: (from: string, to: string) => string[];
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
 *
 * AV.W7 perf folds:
 *   - F3 — on-demand `will-change`: the morphing box gets `will-change:<dim>`
 *     ONLY for the gesture's duration (set just before the spring drives it,
 *     cleared to `auto` on settle/`transitionend`). NEVER a standing hint — a
 *     permanent `will-change` holds a compositor layer + VRAM for an idle dock.
 *   - F5 — inheritance-bomb guard (CONVENTION): this driver animates ONLY the
 *     element's own `width`/`height` (the spring's pixel-space `value`) and the
 *     pane opacity rides a class-driven CSS transition on the SEPARATE
 *     `.dock-layer-item-host`. NO INHERITED custom property (`--phase-color` /
 *     `--shadow-color`) is TWEENED per frame here — animating an inherited
 *     custom property forces a whole-subtree style recalc every frame (the
 *     inheritance bomb). Phase/shadow colors are SET on a discrete state change,
 *     never interpolated frame-by-frame. Keep new motion on `transform`/`opacity`
 *     /`width`/`height`; route any color shift through a discrete class swap.
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer, axis, directionTypes } = options;

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

    // AV.W7 F3 — on-demand `will-change` lifecycle. A STANDING `will-change`
    // holds a compositor layer + VRAM for an idle surface, and the dock is
    // interactive/idle-mostly (not the always-animating goo-blob canvas, where
    // a standing hint is defensible). So the hint is promoted ONLY for the
    // duration of a morph: set on the animated `dim` (`width`/`height`) at
    // gesture START (just before the spring drives the box), cleared to `auto`
    // on the spring-SETTLE / `transitionend` so it never stands. The clear fires
    // on settle (after the final paint), NOT before — so it cannot race the
    // spring's last frame and flash.
    function setWillChange(el: HTMLElement) {
        el.style.willChange = dim.value;
    }

    function clearWillChange(el: HTMLElement) {
        el.style.willChange = "auto";
    }

    // AW.W2 — the clip-reveal aperture lifecycle. `data-morphing` is set on the
    // morphing container's GlassDock root at gesture START and cleared on SETTLE,
    // so dock.css holds the single-axis `overflow: clip` for the whole morph (the
    // box IS the reveal aperture) and lifts it to `overflow: visible` only at rest
    // (`.expanded:not([data-morphing])`). It rides the SAME set/clear seam as the
    // `will-change` hint — one attribute, established lifecycle. The attribute
    // lands on the nearest `.glass-dock` ancestor (the clip shell): for the outer
    // pair the container IS inside the root; for the inner DockLayerGroup the
    // stack sits inside the dock root, so the clip-bearing element is the root.
    function morphRoot(el: HTMLElement): HTMLElement | null {
        return el.closest(".glass-dock");
    }

    function setMorphing(el: HTMLElement) {
        morphRoot(el)?.setAttribute("data-morphing", "");
    }

    function clearMorphing(el: HTMLElement) {
        morphRoot(el)?.removeAttribute("data-morphing");
    }

    // AW.W3 — the spring-keyed child stagger. The SINGLE size spring's normalized
    // progress (0 at the start size → 1 at the target size) is written to the
    // container as `--dock-morph-progress` every frame. dock.css keys each child's
    // opacity onset off a per-child threshold against this scalar, so the cascade
    // rides the PHYSICAL morph — a fast flick and a slow hover-open both
    // choreograph correctly and an interrupted morph carries the cascade with it
    // (no orphaned `setTimeout`s). This is a per-CHILD opacity onset INSIDE the
    // active pane (the pane itself stays statically opacity:1, revealed by the
    // aperture — the W2 clip-reveal contract is NOT regressed). `data-revealing`
    // arms the staggered children; cleared on settle so they paint at full opacity
    // at rest. Suppressed under PRM (the FLIP fast-path / the spring's
    // `respectReducedMotion` never run the cascade; the CSS arms the children only
    // while `data-revealing` is set, and the synchronous swap never sets it).
    function setStaggerProgress(el: HTMLElement, progress: number) {
        // Clamp to [0,1]; an overshooting spring would push past 1 (the children
        // are already fully revealed by then — clamping keeps the onset monotone).
        const p = progress < 0 ? 0 : progress > 1 ? 1 : progress;
        el.style.setProperty("--dock-morph-progress", `${p}`);
    }

    function armStagger(el: HTMLElement) {
        el.setAttribute("data-revealing", "");
        el.style.setProperty("--dock-morph-progress", "0");
    }

    function clearStagger(el: HTMLElement) {
        el.removeAttribute("data-revealing");
        el.style.removeProperty("--dock-morph-progress");
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
            // AW.W2 — set the clip aperture synchronously inside the VT callback
            // (the browser owns the morph; the clip holds for its duration).
            setMorphing(el);
            // AW.W3 — typed directional intent. The driver maps the swap
            // `(from, to)` to the `types` array so `:active-view-transition-type`
            // CSS authors a snappier exit / softer entry-overshoot. Empty/absent
            // → the symmetric `.gl-dock-layer` curve (the kept default). The
            // helper feature-detects the object-with-`types` overload, so on an
            // engine without it the call degrades to the plain symmetric form.
            const vtTypes = directionTypes?.(oldLayer, newLayer);
            const { finished } = startViewTransition(
                () => {
                    leavingLayer.value = oldLayer;
                    currentLayer.value = newLayer;
                },
                vtTypes && vtTypes.length > 0 ? { types: vtTypes } : undefined,
            );
            finished.finally(() => {
                if (id !== transitionId) return;
                leavingLayer.value = null;
                clearMorphing(el);
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
                    clearWillChange(el);
                    clearMorphing(el);
                    clearStagger(el);
                    leavingLayer.value = null;
                    return;
                }

                // Promote the morphing box for the gesture's duration (cleared on
                // settle / transitionend below — never standing). AW.W2 — set the
                // clip aperture at the same gesture-START seam. AW.W3 — arm the
                // spring-keyed child stagger (progress 0 at gesture start).
                setWillChange(el);
                setMorphing(el);
                armStagger(el);

                // AW.W3 — the morph span, captured once so the per-frame spring
                // value maps to a normalized [0,1] progress for the child stagger.
                // A retarget re-reads `toSize`/`fromSize` above, so the span is the
                // live one (the cascade carries through an interrupt).
                const morphSpan = toSize - fromSize;

                // 3. Drive size off ONE SpringProgress clock in PIXEL space — its
                // `value` is the live width/height. On a retarget reuse the live
                // solver (velocity carried through `set target`); on a fresh swap
                // construct one seeded at `fromSize`. The JS driver OWNS the
                // container size (transition stays "none" on `el` so the CSS
                // `width var(--dock-motion-resize)` does not fight the per-frame
                // inline set). AW.W2 — the active pane is REVEALED by the clip
                // aperture (statically opacity:1, no fade); only the LEAVING pane
                // fades, class-driven on the SEPARATE `.dock-layer-item-host` via
                // its `--dock-motion-resize` fade, so the leaving fade + the size
                // morph settle in lockstep by the shared (0.32, 0.7) curve (the
                // token + the driver), continuous across a retarget.
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
                    // AW.W3 — write the SINGLE size spring's normalized progress so
                    // the child stagger rides the physical morph. `morphSpan` is the
                    // live (retarget-aware) span; a zero span (rare) pins progress
                    // at 1 (already revealed). The cascade is monotone in this
                    // scalar — no fixed-ms timer.
                    if (Math.abs(morphSpan) > 0.5) {
                        setStaggerProgress(el, (w - fromSize) / morphSpan);
                    } else {
                        setStaggerProgress(el, 1);
                    }
                    // Opacity stays class-driven via the --dock-motion-resize CSS
                    // transition on `.dock-layer-item-host`; the spring drives
                    // size only.
                    if (activeSpring.settled) {
                        el.style.transition = "";
                        clearDim(el);
                        // Clear the compositor hint AND the clip aperture AFTER the
                        // final paint (settle), so they never race the spring's last
                        // frame (F3 / AW.W2 — the clip lifts to `overflow:visible`
                        // only after the morph has fully painted). AW.W3 — disarm
                        // the child stagger so the children rest at full opacity.
                        clearWillChange(el);
                        clearMorphing(el);
                        clearStagger(el);
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
                    clearWillChange(el);
                    clearMorphing(el);
                    clearStagger(el);
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
        clearWillChange(el);
        clearMorphing(el);
        clearStagger(el);
        leavingLayer.value = null;
    }

    onUnmounted(() => {
        clearCleanup();
        disposeSpring();
    });

    return { onTransitionEnd, currentLayer, leavingLayer };
}
