import { useMediaQuery } from "@vueuse/core";
import { onUnmounted, readonly, ref, watch } from "vue";
import type { Ref } from "vue";
import { DOCK_SPRING } from "../constants";
import { useDockSpring } from "./useDockSpring";

/**
 * The dock collapse/expand morph has one job: project the current outer face
 * onto the shared `--dock-morph-t` spring. Controlled face swaps belong to
 * `DockCrossfade`; they do not register with, or resize, the dock shell.
 */
export interface UseDockMorphOrchestratorOptions {
    /** The `.glass-dock` root carrying the shared scalar. */
    rootEl: Ref<HTMLElement | null>;
    /** The outer collapsed/expanded face id. */
    outerActiveLayer: Ref<string>;
    /** Notifies the shell when the spring arms and settles. */
    onMorphActiveChange?: (active: boolean) => void;
    /**
     * Measures the endpoints from the posture just patched in (`useDockExpandedSize`'s
     * `measure`). Called when the morph arms, before `[data-morphing]` reserves one.
     */
    measure: () => void;
}

export interface UseDockMorphOrchestratorReturn {
    /** The outer face that currently owns layout and interaction. */
    outerCurrentLayer: Readonly<Ref<string>>;
    /** The face fading out, or null after settle. */
    outerLeavingLayer: Readonly<Ref<string | null>>;
}

/**
 * Drive the outer collapsed/expanded pair from the sole dock spring. Mid-flight
 * reversals complement both position and velocity so the painted trajectory is
 * continuous; reduced motion seats the same endpoint immediately.
 */
export function useDockMorphOrchestrator(
    options: UseDockMorphOrchestratorOptions,
): UseDockMorphOrchestratorReturn {
    const { rootEl, outerActiveLayer } = options;
    const currentLayer = ref(outerActiveLayer.value);
    const leavingLayer = ref<string | null>(null);
    const dockSpring = useDockSpring({
        response: DOCK_SPRING.response,
        dampingFraction: DOCK_SPRING.dampingFraction,
    });
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    function root(): HTMLElement | null {
        return rootEl.value;
    }

    function settle(): void {
        leavingLayer.value = null;
        const element = root();
        if (element) {
            // Clear the morph flag before the registered scalar so the settled
            // class endpoint wins in the same style recalculation.
            element.removeAttribute("data-morphing");
            element.style.removeProperty("--dock-morph-t");
        }
        options.onMorphActiveChange?.(false);
        dockSpring.dispose();
    }

    watch(prefersReducedMotion, (reduced) => {
        if (reduced && root()?.hasAttribute("data-morphing")) settle();
    });

    function play(): void {
        const element = root();
        if (!element) return;

        options.onMorphActiveChange?.(true);
        element.setAttribute("data-morphing", "");

        const liveScalar = Number.parseFloat(
            element.style.getPropertyValue("--dock-morph-t"),
        );
        const reversing = dockSpring.live && !Number.isNaN(liveScalar);
        const from = reversing ? 1 - liveScalar : 0;

        element.style.setProperty("--dock-morph-t", `${from}`);
        dockSpring.playTo(from, 1, {
            inheritVelocityScale: reversing ? -1 : 1,
            onFrame: (value) => {
                root()?.style.setProperty("--dock-morph-t", `${value}`);
            },
            onSettle: settle,
        });
    }

    // The face swap is pre-flush, so the patch that follows carries it. The ARM is
    // post-flush: by then the new posture and its content are in the DOM, and
    // `measure` reads the root laid out in that posture before `[data-morphing]`
    // reserves an endpoint (O-101). Both land before the frame paints.
    const stopSwap = watch(outerActiveLayer, (next, previous) => {
        if (next === previous) return;

        currentLayer.value = next;
        leavingLayer.value = root() ? previous : null;
    });

    const stopArm = watch(
        outerActiveLayer,
        (next, previous) => {
            if (next === previous || !root()) return;
            options.measure();
            play();
        },
        { flush: "post" },
    );

    onUnmounted(() => {
        stopSwap();
        stopArm();
        dockSpring.dispose();
    });

    return {
        outerCurrentLayer: readonly(currentLayer),
        outerLeavingLayer: readonly(leavingLayer),
    };
}
