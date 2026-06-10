// The constellation POINTER wiring — the hover-web / click-warp / held-well
// listener machinery carved out of Constellation.vue's onMounted. ONE
// pointer-interaction wiring concern: the deck-scale client→canvas-local mapper
// (`toLocal`) + the three INDEPENDENT listener blocks (ripple steer, click-warp,
// held gravity-well). A component-internal composable: it takes the host/canvas
// elements, the live field + pointer + ripple state, the substrate handle, and
// the resolved prop flags, then registers the listeners on the host. NO logic
// edits — the bodies are the byte-for-byte lift of the prior inline wiring.

import type { Ref } from "vue";
import { warpTo as warpToField } from "../constellationInteraction";
import type {
    ConstellationField,
    ConstellationPointer,
    ConstellationRipple,
} from "../constellationField";

/** The substrate handle the wiring reads (`wake` re-arms a parked surface). */
interface CanvasHandle {
    wake: () => void;
    reducedMotion: boolean;
}

export interface UseConstellationPointerOptions {
    host: HTMLElement | null;
    canvas: HTMLCanvasElement;
    field: ConstellationField;
    pointer: ConstellationPointer;
    ripples: ConstellationRipple[];
    handle: CanvasHandle;
    /** The hoisted client→canvas-local mapper ref the exposed `warpTo(clientX,clientY)` reads. */
    toLocalRef: Ref<
        ((e: { clientX: number; clientY: number }) => ConstellationPointer | null) | null
    >;
    pointerReactive: boolean;
    warpOnClick: boolean;
    gravityWell: boolean;
    /** The deterministic-capture predicate — a frozen capture registers NO listeners. */
    isFrozen: boolean;
}

/**
 * Wire the constellation pointer listeners on the host. Sets the hoisted
 * `toLocal` mapper (the deck-scale invariant — BOTH the ripple path AND the warp
 * path read this ONE mapper), then registers the three independent listener
 * blocks gated by their respective prop flags (each PRM-gated + capture-gated).
 * No teardown is returned: the listeners ride the component's lifetime (the host
 * element is torn down with the component), matching the prior inline behaviour.
 */
export function useConstellationPointer(opts: UseConstellationPointerOptions): void {
    const {
        host,
        canvas,
        field,
        pointer,
        ripples,
        handle,
        toLocalRef,
        pointerReactive,
        warpOnClick,
        gravityWell,
        isFrozen,
    } = opts;

    // `toLocal` is HOISTED out of the pointerReactive block (AX.W17) — it is a
    // pure `getBoundingClientRect` → canvas-local-px mapper with NO
    // pointerReactive/PRM dependency. BOTH the ripple path AND the warp path read
    // this ONE mapper, so a click lands in canvas-local px under any CSS
    // scale/zoom (the deck-scale invariant). Accepts client coords (a
    // PointerEvent or a bare {clientX, clientY}); returns canvas-local px or null
    // when the point falls outside the canvas / the canvas has no extent.
    const toLocal = (
        e: { clientX: number; clientY: number },
    ): ConstellationPointer | null => {
        const r = canvas.getBoundingClientRect();
        if (!r.width || !r.height) return null;
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        if (nx < 0 || ny < 0 || nx > 1 || ny > 1) return null;
        return { x: nx * field.w, y: ny * field.h };
    };
    toLocalRef.value = toLocal;

    // Pointer reactivity — listen on the host (the canvas itself may be behind
    // type), map to canvas-local px via the hoisted mapper. Disabled under
    // reduced-motion AND under a deterministic capture (`isFrozen` — a frozen
    // capture takes no input; the same listener-not-registered policy as PRM,
    // AY.W-CON3).
    if (pointerReactive && host && !isFrozen && !handle.reducedMotion) {
        const onMove = (e: PointerEvent) => {
            const p = toLocal(e);
            if (p) {
                pointer.x = p.x;
                pointer.y = p.y;
            } else {
                pointer.x = -1;
                pointer.y = -1;
            }
            handle.wake();
        };
        const onLeave = () => {
            pointer.x = -1;
            pointer.y = -1;
        };
        const onDown = (e: PointerEvent) => {
            const p = toLocal(e);
            if (p) ripples.push({ x: p.x, y: p.y, start: -1 });
            handle.wake();
        };
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);
        host.addEventListener("pointerdown", onDown);
    }

    // Click-to-warp (AX.W17) — its OWN guard, SEPARATE from the ripple block, so
    // `warpOnClick` and `pointerReactive` are INDEPENDENT axes (warp works on a
    // non-ripple lattice; ripples work without warp). PRM-gated HERE (the click
    // does not warp under reduced-motion — the listener is simply not
    // registered). Resolves toLocal → nearestNode (excluding the focal) → warpTo;
    // the spring is stepped inside stepField (no second rAF, no useSpring).
    // Not registered under a deterministic capture (`isFrozen`, AY.W-CON3).
    if (warpOnClick && host && !isFrozen && !handle.reducedMotion) {
        const onWarp = (e: PointerEvent) => {
            const p = toLocal(e);
            if (!p) return;
            warpToField(field, p.x, p.y);
            handle.wake();
        };
        host.addEventListener("pointerdown", onWarp);
    }

    // Pointer-held GRAVITY-WELL (AY.W-CON2) — its OWN guard, INDEPENDENT of
    // warpOnClick + pointerReactive (a consumer can hold-to-pull on a non-ripple,
    // non-warp lattice). PRM-gated by the WARP precedent: the block is INSIDE
    // `!reducedMotion`, so under reduce the held-timer is never registered and the
    // well never arms (the listener-not-ramped precedent). Reuses the SAME `toLocal`
    // mapper (the deck-scale invariant) and `field.well` state; the well force is
    // composed inside stepField (no second rAF). The held-timer is the only new
    // event piece — `onDown` arms the well after `holdMs`, `onMove` tracks it to the
    // held pointer, and `release` eases it back to 0 (the field then cools).
    if (gravityWell && host && field.well && !isFrozen && !handle.reducedMotion) {
        const well = field.well;
        let holdTimer: number | undefined;
        const onDown = (e: PointerEvent) => {
            const p = toLocal(e);
            if (!p) return;
            well.x = p.x;
            well.y = p.y;
            holdTimer = window.setTimeout(() => {
                well.target = 1;
                handle.wake();
            }, well.cfg.holdMs);
            handle.wake();
        };
        const onMove = (e: PointerEvent) => {
            // track the well to the held pointer once it has armed.
            if (well.target > 0) {
                const p = toLocal(e);
                if (p) {
                    well.x = p.x;
                    well.y = p.y;
                }
            }
        };
        const release = () => {
            if (holdTimer !== undefined) {
                clearTimeout(holdTimer);
                holdTimer = undefined;
            }
            well.target = 0; // ease back to 0 → the field cools to `speed`
            handle.wake();
        };
        host.addEventListener("pointerdown", onDown);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerup", release);
        host.addEventListener("pointerleave", release);
        host.addEventListener("pointercancel", release);
    }
}
