import { computed, ref, watch, onUnmounted } from "vue";
import type { Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";

/**
 * AX.W01 — the dock single-scalar morph: ONE spring, ONE clock, the whole box.
 *
 * Re-derived from first principles (the e8380d7 single-clock high-water; the
 * 479-line VT-fork accretion is gone). The collapse↔expand (and inner pane-swap)
 * morph runs off ONE normalized analytic spring whose progress scalar (0→1) is
 * written once per frame to `--dock-morph-t` on the `.glass-dock` root. EVERY
 * animated axis — inline-size, padding, border-radius, scale, background / border
 * color, AND the child stagger — is a pure `calc()` read off that one scalar in
 * `dock.css`. NO CSS `transition` on the root morph props; NO View-Transitions
 * fork: the live `SpringProgress` ODE is the single authority on every engine, so
 * iOS interruptible-physics + velocity-continuity retarget are universal, not
 * capability-gated.
 *
 * The morph is a FLIP — the from→to size is measured ONCE per swap (the allowed
 * one-time measurement primitive, never a co-driver), written as `--dock-morph-from`
 * / `--dock-morph-to` px vars on the morphing element, and the live scalar
 * interpolates between them in CSS. Content lays out once at natural size;
 * `overflow:clip` on the morph axis (dock.css, gated on `data-morphing`) makes the
 * box the reveal aperture; the spring-keyed stagger fades the children in-step.
 *
 * Velocity-continuity (the ONE load-bearing iOS piece): a re-toggle mid-flight
 * re-bases the live solver onto the new span from its current velocity (the
 * analytic re-seat keyframes.js owns) — inertia carries, no snap-from-rest. The
 * spring constant is the published `--spring-dock` (response 0.32, ζ 0.7, ~+4.6%
 * overshoot), the SAME analytic ODE the build-time linear() token samples.
 *
 * LIGHT-surface only: `SpringProgress` owns its own rAF via `.play(onFrame)` and
 * carries no static value.js edge. NEVER import `AnimationGroup` / the `./engine`
 * boundary — that pulls value.js into the dock bundle.
 */
const DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 } as const;

export interface UseLayerTransitionOptions {
    /** The container element that owns the stacked layer panes. */
    containerEl: Ref<HTMLElement | null>;
    /** The currently active layer id. */
    activeLayer: Ref<string>;
    /**
     * Animation axis. `"horizontal"` morphs the inline axis; `"vertical"` morphs
     * the block axis. Defaults to horizontal when omitted.
     */
    axis?: Ref<"horizontal" | "vertical">;
    /**
     * Retained for API parity with the prior VT-typed signature (consumed by
     * `GlassDock` + `DockLayerGroup`). The single-scalar morph runs ONE symmetric
     * spring on every engine, so the direction hint is no longer a curve fork — it
     * is accepted and ignored. Kept so the call sites need no edit.
     */
    directionTypes?: (from: string, to: string) => string[];
}

export interface UseLayerTransitionReturn {
    /** Attach to `@transitionend` on the container (kept for call-site parity). */
    onTransitionEnd(e: TransitionEvent): void;
    /** The currently active layer id (post-swap). */
    currentLayer: Ref<string>;
    /** The layer id currently fading out, or null. */
    leavingLayer: Ref<string | null>;
}

/**
 * Coordinates the size morph + crossfade between grid-stacked dock layer panes.
 * Reusable at any nesting level (the inner `<DockLayerGroup>` pair AND the outer
 * `GlassDock` collapsed↔expanded pair).
 */
export function useLayerTransition(
    options: UseLayerTransitionOptions,
): UseLayerTransitionReturn {
    const { containerEl, activeLayer, axis } = options;

    const dim = computed<"width" | "height">(() =>
        axis?.value === "vertical" ? "height" : "width",
    );
    const morphAxisProp = computed(() =>
        dim.value === "width" ? "inline-size" : "block-size",
    );
    const getSize = (el: HTMLElement) => el.getBoundingClientRect()[dim.value];

    const currentLayer = ref(activeLayer.value);
    const leavingLayer = ref<string | null>(null);
    let transitionId = 0;

    // The single live morph driver, held on a closure var so a re-toggle mid-flight
    // RE-BASES it onto the new span from its current velocity rather than
    // reconstructing from rest (the iOS interruptible-spring contract). The scalar
    // runs 0→1 normalized; the per-frame `value` IS `--dock-morph-t`.
    let spring: SpringProgress | null = null;
    let springEl: HTMLElement | null = null;

    function disposeSpring() {
        if (spring) {
            spring.dispose();
            spring = null;
        }
        springEl = null;
    }

    /** The `.glass-dock` root that carries the morph scalar + clip aperture. */
    function morphRoot(el: HTMLElement): HTMLElement {
        return (el.closest(".glass-dock") as HTMLElement | null) ?? el;
    }

    function clearMorphVars(el: HTMLElement) {
        el.style.removeProperty("--dock-morph-from");
        el.style.removeProperty("--dock-morph-to");
    }

    function settle(el: HTMLElement, root: HTMLElement) {
        clearMorphVars(el);
        root.style.removeProperty("--dock-morph-t");
        root.removeAttribute("data-morphing");
        leavingLayer.value = null;
        disposeSpring();
    }

    watch(activeLayer, (newLayer, oldLayer) => {
        if (newLayer === oldLayer) return;

        const el = containerEl.value;
        if (!el) {
            currentLayer.value = newLayer;
            leavingLayer.value = null;
            return;
        }

        const root = morphRoot(el);
        const id = ++transitionId;

        // The live solver still driving THIS container is the retarget seam: carry
        // its in-flight velocity through the re-base rather than snap from rest.
        const live =
            spring !== null && springEl === el && !spring.settled ? spring : null;
        const inheritedVelocity = live ? live.velocity : 0;

        // 1. Capture the from-size. On a retarget the box is mid-morph; its painted
        // pixel size is the live `calc(from + (to-from)*t)` — re-measuring it gives
        // the exact px the new span must start from. On a fresh swap, measure the box.
        const fromSize = getSize(el);

        // 2. Swap the layer refs SYNCHRONOUSLY (class-driven opacity flips now), then
        // measure the new natural size off the post-swap layout in the SAME tick.
        // The box never snaps because its CSS size reads `--dock-morph-from` (pinned
        // to `fromSize`) until the scalar moves — ONE frame origin for the ref-swap,
        // the measure, and the spring start (the desync the prior nextTick→rAF
        // deferral introduced is structurally gone).
        leavingLayer.value = oldLayer;
        currentLayer.value = newLayer;

        // Measure the post-swap natural size with the morph vars cleared so CSS
        // resolves the intrinsic size (no inline pin fighting the measurement).
        clearMorphVars(el);
        root.style.removeProperty("--dock-morph-t");
        const toSize = getSize(el);

        // No span — a same-size swap, nothing to morph. Land flush at rest.
        if (Math.abs(toSize - fromSize) < 0.5) {
            settle(el, root);
            return;
        }

        // 3. Pin the morph span as CSS pixel vars on the morphing element and arm
        // the clip aperture + the scalar on the root. The box size, padding, radius,
        // color, and child stagger ALL read `--dock-morph-t` off this one scalar
        // (dock.css; the CSS picks the morph axis off the orientation class). Set
        // t=0 before the first frame so the box holds at `fromSize` until the
        // spring drives it.
        el.style.setProperty("--dock-morph-from", `${fromSize}px`);
        el.style.setProperty("--dock-morph-to", `${toSize}px`);
        root.style.setProperty("--dock-morph-t", "0");
        root.setAttribute("data-morphing", "");

        // 4. Drive ONE SpringProgress 0→1. The scalar always re-bases to 0 on the
        // NEW [from,to] span (the box's current px IS the new span's origin); a
        // retarget carries the inherited velocity through the re-seat so the
        // trajectory stays continuous (no snap to rest — the analytic re-seat
        // keyframes.js owns). A fresh swap starts at rest.
        if (!live) {
            disposeSpring();
            spring = new SpringProgress({
                response: DOCK_SPRING.response,
                dampingFraction: DOCK_SPRING.dampingFraction,
                initial: 0,
                respectReducedMotion: true,
            });
            springEl = el;
        }
        const activeSpring = spring!;
        activeSpring.reset(0, inheritedVelocity);
        activeSpring.target = 1;
        activeSpring.play((t: number) => {
            if (id !== transitionId) return;
            root.style.setProperty("--dock-morph-t", `${t}`);
            if (activeSpring.settled) settle(el, root);
        });
    });

    // Kept for call-site parity (`@transitionend` on the container). The morph no
    // longer runs on a CSS transition, so there is no size-morph transitionend to
    // consume; this is a defensive settle if a stray transition fires after the
    // spring has already settled.
    function onTransitionEnd(e: TransitionEvent) {
        const el = containerEl.value;
        if (!el) return;
        if (e.target !== el) return;
        if (e.propertyName !== morphAxisProp.value && e.propertyName !== dim.value)
            return;
        if (spring && spring.settled) settle(el, morphRoot(el));
    }

    onUnmounted(disposeSpring);

    return { onTransitionEnd, currentLayer, leavingLayer };
}
