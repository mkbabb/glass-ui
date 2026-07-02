import { watch } from "vue";
import type { Ref } from "vue";
import { useTouchGate } from "../../../../composables/dom/useTouchGate";

/**
 * BG.W-DOCK-DECOMPOSE — the dock touch-gate wiring, carved off the `GlassDock.vue`
 * god-SFC (the F6.5 one-writer-per-concern seam). It owns the `useTouchGate`
 * instance + the tap/scroll discrimination handlers + the collapse-on-deactivate
 * watch — ONE structural concern (the collapsed-pill tap-to-expand gesture), NEVER
 * a morph-scalar writer (`--dock-morph-t`/`--dock-morph-v` stay the orchestrator's).
 *
 * AT.W6-dock-b — shape B′ touch-gate. The gate's job is to DISTINGUISH a tap from a
 * vertical scroll on the floating collapsed pill (the 150ms pending window + the
 * >10px scroll-check inside `useTouchGate`), NOT to SWALLOW the tap. It therefore
 * does NOT `preventDefault()`/`stopPropagation()` the activating `touchstart`/
 * `touchend`: the browser's native tap→click compatibility event is allowed to flow
 * to the tapped control, so a SINGLE tap on a collapsed dock control BOTH expands the
 * dock AND activates that control (via the native click) — the iOS Now-Playing
 * mini-bar single-tap-play contract. No `elementFromPoint`, no synthetic dispatch. A
 * scroll gesture cancels the pending tap inside the gate and never emits a tap-click,
 * so vertical scrolling on the pill stays browser-owned. (Swallowing the tap was the
 * root cause of the double-tap field defect — a prevented touch sequence emits no
 * compatibility click, so the control under the finger fired nothing.)
 *
 * AZ.W-DOCK-TAXONOMY — the gate applies to ANY collapsible dock, not just the
 * horizontal one (a vertical dock now collapses too), so it must distinguish a tap
 * from a vertical scroll on its pill as well.
 */
export interface UseDockTouchGateOptions {
    /** The dock's auto-collapse delay (ms) — the gate's deactivation timer. */
    collapseDelay: number;
    /** The dock body root — the tap discrimination anchors on it. */
    rootEl: Ref<HTMLElement | null>;
    /** True when the dock cannot collapse (the gate no-ops — no tap-to-expand). */
    alwaysExpanded: Readonly<Ref<boolean>>;
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
    const { collapseDelay, rootEl, alwaysExpanded, visualExpanded, expanded, isPinned, expand, collapse } =
        options;

    const touchGate = useTouchGate(collapseDelay);

    function shouldGateTouch(): boolean {
        return !alwaysExpanded.value;
    }

    function onTouchStart(event: TouchEvent): void {
        if (!shouldGateTouch() || visualExpanded.value) return;
        const root = rootEl.value;
        const touch = event.touches[0];
        if (!root || !touch) return;
        // Arm the tap/scroll discrimination; the return value is consumed by the
        // gate's own state — the tap is never preventDefault-ed (shape B′).
        touchGate.handleTouchStart(root, touch.clientY);
    }

    function onTouchMove(event: TouchEvent): void {
        if (!shouldGateTouch()) return;
        touchGate.handleScrollCheck(event);
    }

    function onTouchEnd(): void {
        if (!shouldGateTouch()) return;
        const wasActive = touchGate.isActive.value;
        touchGate.handleTouchEnd();
        if (!wasActive && touchGate.isActive.value && !visualExpanded.value) {
            // Expand on the resolved tap, but let the native compatibility click
            // reach the control — no preventDefault, no stopPropagation (shape B′).
            expand();
        }
    }

    watch(touchGate.isActive, (isActive) => {
        if (!isActive && expanded.value && !isPinned.value && !alwaysExpanded.value) {
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
