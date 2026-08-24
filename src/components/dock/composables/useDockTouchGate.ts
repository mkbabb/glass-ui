import { watch } from "vue";
import type { Ref } from "vue";
import { useTouchGate } from "../../../composables/dom/useTouchGate";
import { DOCK_COLLAPSE_DELAY_MS } from "../constants";

/**
 * Own collapsed-pill tap/scroll discrimination and collapse-on-deactivate state.
 * Morph scalars remain owned by the Dock orchestrator.
 *
 * The gate distinguishes a tap from vertical scrolling without preventing the
 * browser's compatibility click. A single tap can expand the Dock and activate its
 * control; a scroll cancels the pending tap. No hit-test lookup or synthetic
 * dispatch is used. The same behavior applies to both orientations.
 */
export interface UseDockTouchGateOptions {
    /** The dock's auto-collapse delay (ms) — the gate's deactivation timer.
     * Defaults to `DOCK_COLLAPSE_DELAY_MS`, the same window `useDockState` arms. */
    collapseDelay?: number;
    /** The dock body root — the tap discrimination anchors on it. */
    rootEl: Ref<HTMLElement | null>;
    /* ~~`quiet`: true when every environmental writer is suppressed — an
       always-expanded dock (force-pinned) OR a manual dock~~ —
       [2026-08-12 · BK #47 W1 SURFACE] STRUCK. The flag existed for the `manual`
       pole ALONE, because manual was the one state orthogonal to the two signals
       the gate already reads. With `interaction` struck, `quiet` collapses to
       `alwaysExpanded`, and under `alwaysExpanded` the gate is unreachable
       anyway: `visualExpanded` is true (so the gate never arms) and `isPinned`
       is true (so the deactivate-collapse never fires). Every guard it bought is
       bought twice over — it is now a knob with no state it can decide. */
    /** The painted expand state (`alwaysExpanded || expanded`). */
    visualExpanded: Readonly<Ref<boolean>>;
    /** The raw expand ref (the collapse-on-deactivate guard reads it). */
    expanded: Ref<boolean>;
    /** True while a hold token keeps the dock open (suppresses the deactivate collapse). */
    isPinned: Readonly<Ref<boolean>>;
    /** Expand the dock (fired on a resolved tap). */
    expand: () => void;
    /** Collapse the dock (fired when the gate deactivates with no hold). */
    collapse: () => void;
}

export interface UseDockTouchGateReturn {
    onTouchStart(event: TouchEvent): void;
    onTouchMove(event: TouchEvent): void;
    onTouchEnd(): void;
    /** Force the gate to rest (a collapse flip clears any pending tap). */
    deactivate(): void;
}

export function useDockTouchGate(
    options: UseDockTouchGateOptions,
): UseDockTouchGateReturn {
    const {
        collapseDelay = DOCK_COLLAPSE_DELAY_MS,
        rootEl,
        visualExpanded,
        expanded,
        isPinned,
        expand,
        collapse,
    } = options;

    const touchGate = useTouchGate(collapseDelay);

    function onTouchStart(event: TouchEvent): void {
        if (visualExpanded.value) return;
        const root = rootEl.value;
        const touch = event.touches[0];
        if (!root || !touch) return;
        // Arm the tap/scroll discrimination; the return value is consumed by the
        // gate's own state — the tap is never preventDefault-ed (shape B′).
        touchGate.handleTouchStart(root, touch.clientY);
    }

    /* The gate is armed ONLY by `onTouchStart`, and `handleScrollCheck`/
       `handleTouchEnd` are no-ops on an unarmed gate — so the move/end handlers
       need no posture guard of their own. */
    function onTouchMove(event: TouchEvent): void {
        touchGate.handleScrollCheck(event);
    }

    function onTouchEnd(): void {
        const wasActive = touchGate.isActive.value;
        touchGate.handleTouchEnd();
        if (!wasActive && touchGate.isActive.value && !visualExpanded.value) {
            // Expand on the resolved tap, but let the native compatibility click
            // reach the control — no preventDefault, no stopPropagation (shape B′).
            expand();
        }
    }

    watch(touchGate.isActive, (isActive) => {
        if (!isActive && expanded.value && !isPinned.value) {
            collapse();
        }
    });

    return {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        deactivate: () => touchGate.deactivate(),
    };
}
