// The GlassDock morph-WINDOW timing family — the transition-window machinery
// carved out of GlassDock.vue. A pure DOM-timing concern with no template
// dependency: it owns the `isTransitioning` flag's lifecycle (the morph
// generation, the fallback settle timer, and the `transitionend` resolver) plus
// the CSS-time-parse + window-derivation helpers. A GlassDock-internal composable:
// it takes the dock root ref + the `isTransitioning` ref and returns the
// mark/resolve/clear handlers the SFC wires to `watch`/`@transitionend`. NO logic
// edits — the bodies are the byte-for-byte lift of the prior inline timing cluster.

import { onBeforeUnmount, type Ref } from "vue";

function parseTimeMs(value: string): number {
    const trimmed = value.trim();
    if (!trimmed) return 0;
    if (trimmed.endsWith("ms")) return Number.parseFloat(trimmed);
    if (trimmed.endsWith("s")) return Number.parseFloat(trimmed) * 1000;
    return Number.parseFloat(trimmed) || 0;
}

function longestTransitionMs(el: HTMLElement): number {
    const style = getComputedStyle(el);
    const durations = style.transitionDuration.split(",").map(parseTimeMs);
    const delays = style.transitionDelay.split(",").map(parseTimeMs);
    return Math.max(
        0,
        ...durations.map((duration, index) => duration + (delays[index] ?? delays[0] ?? 0)),
    );
}

/* AX.W01 — the morph is now spring-driven (`--dock-morph-t`), NOT a CSS transition,
   so the root carries no `width`/`padding` transition whose `transitionend` would
   resolve `isTransitioning`. The fallback timer is therefore the morph's settle
   ENVELOPE — the `--spring-dock` (0.32, 0.7) curve settles within ~2× the design
   window (`--duration-normal`); we read that token and scale it, with a floor so a
   token-less SSR/test env still gets a sane window. This keeps `isTransitioning`
   high for the whole spring (preventing a mid-morph collapse) and clearing once it
   settles — the same role the prior `longestTransitionMs(root)` played when the
   root still owned the CSS transition. */
function morphWindowMs(el: HTMLElement): number {
    const normal = parseTimeMs(
        getComputedStyle(el).getPropertyValue("--duration-normal") || "0.3s",
    );
    return Math.max(normal > 0 ? normal * 2 : 0, 600);
}

/* The properties whose transitions ARE the resize morph (driven by
   `--dock-motion-resize`). The flag resolves on one of THESE finishing — never
   on a shorter `--dock-motion-standard` property (box-shadow/background/
   border-color), which would skip-fast-forward `isTransitioning` to false while
   the morph is still in flight. */
const RESIZE_MORPH_PROPS = new Set(["width", "height", "padding", "transform"]);

/** The morph-window handlers the GlassDock SFC wires. */
export interface DockMorphWindow {
    markTransitioning: () => void;
    onDockTransitionDone: (event: TransitionEvent) => void;
    clearTransitionTimer: () => void;
}

/**
 * Own the `isTransitioning` flag's morph-window lifecycle. `markTransitioning`
 * (every `visualExpanded` flip) bumps a private generation so any in-flight
 * morph's pending timer / `transitionend` self-cancels (the A→B→A no-skip /
 * no-queue invariant); `onDockTransitionDone` resolves the flag on a resize-morph
 * property finishing. Clears its timer on unmount.
 */
export function useDockMorphWindow(
    dockEl: Ref<HTMLElement | null>,
    isTransitioning: Ref<boolean>,
): DockMorphWindow {
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;
    /* AT.W6-dock-c — the morph GENERATION. `isTransitioning` must track the ACTUAL
       resize morph, never a stale event from a superseded one. Each `markTransitioning`
       (every `visualExpanded` flip) bumps `morphGeneration`; the timer fallback and
       the `transitionend` handler both capture the generation live at fire time and
       no-op when it has moved on. So a ≥2-dock rapid A→B→A re-trigger CANNOT
       skip-fast-forward (a leftover A→B `transitionend` cannot clear the live B→A
       morph) and CANNOT queue (the flag stays true across the whole chain, cleared
       only by the LAST morph's own resolution). */
    let morphGeneration = 0;

    function clearTransitionTimer(): void {
        if (transitionTimer) {
            clearTimeout(transitionTimer);
            transitionTimer = null;
        }
    }

    function markTransitioning(): void {
        const root = dockEl.value;
        if (!root) return;
        // Bump the generation: any in-flight morph's pending timer / transitionend
        // is now stale and self-cancels (the A→B→A no-skip / no-queue invariant).
        const generation = ++morphGeneration;
        clearTransitionTimer();
        isTransitioning.value = true;
        transitionTimer = setTimeout(() => {
            if (generation !== morphGeneration) return;
            isTransitioning.value = false;
            transitionTimer = null;
        }, Math.max(longestTransitionMs(root), morphWindowMs(root)) + 50);
    }

    function onDockTransitionDone(event: TransitionEvent): void {
        if (event.target !== dockEl.value) return;
        // Only the resize-morph properties resolve the flag — a shorter standard-
        // motion property finishing first must NOT drop `isTransitioning` mid-morph.
        if (!RESIZE_MORPH_PROPS.has(event.propertyName)) return;
        clearTransitionTimer();
        // Settle the generation so a later stale timer can't reopen the flag.
        morphGeneration++;
        isTransitioning.value = false;
    }

    onBeforeUnmount(clearTransitionTimer);

    return { markTransitioning, onDockTransitionDone, clearTransitionTimer };
}
