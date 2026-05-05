// Pointer-attraction composable for the canon Blob primitive.
//
// Maps a canvas-relative pointer position into NDC and exposes a
// critically-damped attraction force vector for the satellite state
// machine. Coarse-pointer devices auto-disable unless the consumer opts
// in via `force: true` — touch users get the moodful breath without a
// cursor-chase loop.
//
// SPEC.md §6 ("Pointer model").

import { useEventListener } from "@vueuse/core";
import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";

export interface PointerState {
    /**
     * Pointer position in normalized device coordinates relative to the
     * canvas (-1..1 along each axis). `null` when the pointer is off-canvas
     * or when the device matches `(pointer: coarse)` and `force` was not
     * set.
     */
    pointerNDC: Readonly<Ref<{ x: number; y: number } | null>>;
    /**
     * Critically-damped attraction force vector. Tracks `pointerNDC`
     * (treating `null` as the origin) via a Hookean integration on rAF;
     * decays smoothly to zero on pointer-leave.
     */
    attractionForce: Readonly<Ref<{ x: number; y: number }>>;
}

const SPRING_K = 0.15;

function clamp(n: number, lo: number, hi: number): number {
    return Math.max(lo, Math.min(hi, n));
}

function getCoarsePointerMatch(): boolean {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
        return false;
    }
    return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Track pointer position over a canvas and produce a critically-damped
 * attraction force vector. The force vector advances on rAF; pointer
 * position updates on event.
 *
 * SPEC.md §6 ("Pointer model").
 */
export function useBlobPointer(
    canvasRef: Ref<HTMLCanvasElement | null>,
    options?: { force?: boolean },
): PointerState {
    const force = options?.force === true;
    const disabled = !force && getCoarsePointerMatch();

    const pointerNDC = ref<{ x: number; y: number } | null>(null);
    const attractionForce = ref({ x: 0, y: 0 });

    if (disabled) {
        // Coarse-pointer auto-disable: leave both refs at their resting
        // values and skip listener installation entirely.
        return {
            pointerNDC: readonly(pointerNDC),
            attractionForce: readonly(attractionForce),
        };
    }

    function handleMove(event: PointerEvent): void {
        const canvas = canvasRef.value;
        if (!canvas) return;
        const width = canvas.width || 1;
        const height = canvas.height || 1;
        const x = clamp((event.offsetX / width) * 2 - 1, -1, 1);
        const y = clamp((event.offsetY / height) * 2 - 1, -1, 1);
        pointerNDC.value = { x, y };
    }

    function handleLeave(): void {
        pointerNDC.value = null;
    }

    useEventListener(canvasRef, "pointerenter", handleMove);
    useEventListener(canvasRef, "pointermove", handleMove);
    useEventListener(canvasRef, "pointerleave", handleLeave);

    // Critically-damped Hookean integration on rAF. Decays toward zero
    // when the pointer leaves; settles continuously toward `pointerNDC`
    // otherwise. The composable owns its own rAF — the integration runs
    // ~once per pointer-event burst, not driven by the renderer loop, so
    // consumers reading `attractionForce` get a smooth-decaying value
    // even when the renderer is paused (e.g. PRM).
    let rafId = 0;
    let rafActive = false;

    function tick(): void {
        const target = pointerNDC.value;
        const tx = target?.x ?? 0;
        const ty = target?.y ?? 0;
        const cur = attractionForce.value;
        const nx = cur.x + (tx - cur.x) * SPRING_K;
        const ny = cur.y + (ty - cur.y) * SPRING_K;
        const settled =
            target === null &&
            Math.abs(nx) < 1e-4 &&
            Math.abs(ny) < 1e-4;
        attractionForce.value = settled ? { x: 0, y: 0 } : { x: nx, y: ny };
        if (settled) {
            rafActive = false;
            rafId = 0;
            return;
        }
        rafId = requestAnimationFrame(tick);
    }

    function ensureRunning(): void {
        if (rafActive) return;
        if (typeof requestAnimationFrame !== "function") return;
        rafActive = true;
        rafId = requestAnimationFrame(tick);
    }

    // Wake the integrator whenever the target changes — pointer enters,
    // moves, or leaves (leave still needs decay-to-zero animation).
    watch(pointerNDC, () => {
        ensureRunning();
    });

    onScopeDispose(() => {
        if (rafId && typeof cancelAnimationFrame === "function") {
            cancelAnimationFrame(rafId);
        }
        rafId = 0;
        rafActive = false;
    });

    return {
        pointerNDC: readonly(pointerNDC),
        attractionForce: readonly(attractionForce),
    };
}

