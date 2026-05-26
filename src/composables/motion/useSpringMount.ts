// Spring-driven mount + optional drag-dismiss state machine.
//
// Lands W13 of the AL SLIM plan — the runtime kernel behind <DialogContent>'s
// and <SheetContent>'s `spring` opt-in. The component owns its open Ref
// (via reka-ui's DialogContext); this composable owns the *position* (0 =
// fully mounted, 1 = fully dismissed) and the pointer-drag pipe that re-seats
// the spring target mid-drag.
//
// Reuses `useSpring` (W9-β) end-to-end: entrance is `target = 0` after seeding
// `initial = 1`; drag tracks the pointer delta into target; release decides
// bounce-back (target = 0) vs. dismiss (target = 1 + on-settle close). The
// load-bearing property is SpringProgress mid-flight re-target continuity
// (G-W2-3) — releasing the pointer at any velocity hands off cleanly to the
// spring without a visual jump.
//
// PRM bracket: `useSpring`'s `respectReducedMotion` snaps to target instantly,
// so the entrance is a no-op transform and drag still resolves (the visual
// is linear-equivalent because there is no integration phase).

import {
    computed,
    nextTick,
    onMounted,
    onScopeDispose,
    ref,
    watch,
    type Ref,
} from "vue";
import { useSpring, type SpringRef } from "./useSpring";

/** Named iOS spring presets (mirrors X1 §2.3 / tokens.css §2). */
export type SpringPreset = "smooth" | "snappy" | "bouncy" | "gentle";

const SPRING_PRESETS: Record<SpringPreset, { response: number; dampingFraction: number }> = {
    smooth: { response: 0.5, dampingFraction: 0.86 },
    snappy: { response: 0.35, dampingFraction: 0.85 },
    bouncy: { response: 0.5, dampingFraction: 0.65 },
    gentle: { response: 0.7, dampingFraction: 1.0 },
};

export interface UseSpringMountOptions {
    /**
     * Reactive open-state mirror from the host's DialogContext. Accepts
     * both `Ref<boolean>` and `Readonly<Ref<boolean>>` — reka-ui's
     * DialogContext exposes the readonly variant; our internal use of
     * `.value` is read-only here, so the Readonly satisfies the contract.
     */
    open: Readonly<Ref<boolean>>;
    /** Preset name (default `smooth`). */
    preset?: SpringPreset;
    /** Honor `prefers-reduced-motion`. Default true. */
    respectReducedMotion?: boolean;
    /**
     * Dismiss-position threshold as a fraction of full travel. When pointer
     * release crosses this, the target snaps to 1 and on-settle fires
     * `onDismiss`. Default 0.3 (iOS sheet convention).
     */
    dismissThreshold?: number;
    /** Called once the dismiss-spring has settled. Wire to `onOpenChange(false)`. */
    onDismiss?: () => void;
}

export interface SpringMountRef {
    /** Position 0 (mounted) → 1 (dismissed). Bind to `transform: translateY` or scale. */
    position: SpringRef["value"];
    /** True while pointer is actively dragging. */
    isDragging: Readonly<Ref<boolean>>;
    /**
     * Pointer handlers for the Sheet drag-dismiss gesture. Spread onto the
     * sheet content (`v-bind="dragHandlers"`). Pass a getter for the sheet
     * height so the threshold is computed against real pixels.
     */
    dragHandlers: {
        onPointerdown: (e: PointerEvent) => void;
        onPointermove: (e: PointerEvent) => void;
        onPointerup: (e: PointerEvent) => void;
        onPointercancel: (e: PointerEvent) => void;
    };
}

/**
 * Spring-driven mount with optional pointer drag-dismiss.
 *
 * The spring target lives between 0 (fully mounted) and 1 (fully dismissed).
 * The host watches `open` to seat the entrance (1 → 0). Pointer drags
 * re-seat the target mid-flight; on release the threshold decides bounce
 * vs. dismiss. The mid-flight re-target preserves spring continuity per
 * SpringProgress (G-W2-3 verified).
 */
export function useSpringMount(options: UseSpringMountOptions): SpringMountRef {
    const preset = SPRING_PRESETS[options.preset ?? "smooth"];
    // Always seat the spring AT the off-screen position (1) and let the
    // mount watch drive the target → 0 transition on the first frame. This
    // makes the entrance read consistently — without this, an already-open
    // host would start in-frame with no entrance.
    const target = ref(1);
    const isDragging = ref(false);
    let pointerStartY = 0;
    let sheetHeight = 0;
    let activePointerId: number | null = null;

    // `pendingDismiss` arms when a drag release crosses the threshold; the
    // settle watch consumes it (one-shot) to fire `onDismiss` exactly once.
    // Without this flag, a normal `open=false` exit would also trigger the
    // close callback — but the host's open Ref has already flipped, so we'd
    // re-fire a no-op. The flag is the cleanest single-source signal.
    let pendingDismiss = false;

    const spring = useSpring(target, {
        response: preset.response,
        dampingFraction: preset.dampingFraction,
        initial: 1, // start off-screen / scaled-small
        settleThreshold: 1e-3,
        velocitySettleThreshold: 1e-3,
        respectReducedMotion: options.respectReducedMotion !== false,
    });

    // Arm the entrance on mount: if `open` is already true, drive target to
    // 0 across the next tick (the spring integrates from 1 → 0).
    onMounted(() => {
        if (options.open.value) {
            void nextTick(() => {
                target.value = 0;
            });
        }
    });

    // Mount/dismiss: when `open` flips true, target collapses to 0 (entry);
    // when it flips false outside the drag path, target rides to 1 (exit).
    const stopOpenWatch = watch(
        () => options.open.value,
        (next, prev) => {
            if (next === prev) return;
            if (isDragging.value) return; // drag owns the target while active
            target.value = next ? 0 : 1;
        },
        { immediate: false },
    );

    // On-settle dismiss hook: consumes the one-shot `pendingDismiss` flag.
    const stopSettleWatch = watch(
        () => spring.isSettled.value,
        (settled) => {
            if (settled && pendingDismiss && target.value >= 1) {
                pendingDismiss = false;
                options.onDismiss?.();
            }
        },
    );

    function onPointerdown(e: PointerEvent): void {
        // Only primary-button presses on the host capture (no right-click drags).
        if (e.button !== 0) return;
        const host = e.currentTarget as HTMLElement;
        sheetHeight = host.getBoundingClientRect().height || 1;
        pointerStartY = e.clientY;
        activePointerId = e.pointerId;
        isDragging.value = true;
        host.setPointerCapture(e.pointerId);
    }

    function onPointermove(e: PointerEvent): void {
        if (!isDragging.value || e.pointerId !== activePointerId) return;
        const deltaY = e.clientY - pointerStartY;
        if (deltaY <= 0) {
            target.value = 0; // can't drag upward past mounted position
            return;
        }
        target.value = Math.min(1, deltaY / sheetHeight);
    }

    function releaseDrag(e: PointerEvent): void {
        if (!isDragging.value || e.pointerId !== activePointerId) return;
        const host = e.currentTarget as HTMLElement;
        if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
        isDragging.value = false;
        activePointerId = null;
        const threshold = options.dismissThreshold ?? 0.3;
        if (target.value >= threshold) {
            pendingDismiss = true;
            target.value = 1;
        } else {
            target.value = 0;
        }
    }

    onScopeDispose(() => {
        stopOpenWatch();
        stopSettleWatch();
    });

    return {
        position: spring.value,
        isDragging: computed(() => isDragging.value),
        dragHandlers: {
            onPointerdown,
            onPointermove,
            onPointerup: releaseDrag,
            onPointercancel: releaseDrag,
        },
    };
}
