// BB.W-DRAWER-ABROGATE — the THIN house snap engine (the snap math vaul-vue used to
// own, on the HOUSE motion engine).
//
// ONE `SpringProgress` (the dock-morph `linear()`-curve clock, the §6 doctrine —
// `dockMorphContext.ts:215` precedent) writes a `--glass-drawer-t` snap-fraction
// scalar (0 = closed, 1 = the fullest detent) the content root reads as a
// translate. The drag gesture is a pointer-capture on the peek handle reusing the
// `useDockState`-style velocity decision (a fling past `DRAWER_FLING_VELOCITY`
// advances a detent in the drag direction; a slow release snaps to the NEAREST
// detent). The settle hands off to the spring toward the chosen detent; PRM snaps
// deterministically via `SpringProgress`'s `respectReducedMotion` (the dock-morph
// PRM precedent — a CSS reset cannot reach the spring's rAF, so the engine owns it).
//
// NO bespoke `cubic-bezier(.32,.72,0,1)` transition (that was vaul's); NO second
// motion vocabulary. The drawer's settle is the net-new named `DRAWER_SNAP` register
// (its OWN clock, NOT the dock's `DOCK_SPRING`).

import { onUnmounted, ref, watch, type Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { DRAWER_FLING_VELOCITY, DRAWER_SNAP } from "../constants";
import type { DrawerSnapContext } from "./drawerSnapContext";

export interface UseDrawerSnapOptions {
    /** The content sheet element (the `--glass-drawer-t` host + the drag bound box). */
    contentEl: Ref<HTMLElement | null>;
    /** The handle element (the grip the user drags to cycle detents). */
    handleEl: Ref<HTMLElement | null>;
    /** The provided snap seam (the ladder, open ref, direction, snap-fraction writeback). */
    ctx: DrawerSnapContext;
}

export interface UseDrawerSnapReturn {
    /** Whether a pointer drag is in flight (drives the grip's "live" affordance). */
    dragging: Ref<boolean>;
    /** Programmatically settle to a detent fraction (the open-sheet re-snap seam). */
    snapTo(fraction: number): void;
}

/** Whether the side-lens axis is in play (no detents — a full open/closed slide). */
function isSideAxis(direction: string): boolean {
    return direction === "left" || direction === "right";
}

/** The effective detent ladder — a side-lens slide is the implicit `[0, 1]`. */
function effectiveLadder(snapPoints: readonly number[], direction: string): number[] {
    if (snapPoints.length > 0) return [...snapPoints].sort((a, b) => a - b);
    // A side-lens (empty ladder) is a single full-slide: closed (0) ↔ open (1).
    if (isSideAxis(direction)) return [0, 1];
    // A bottom sheet with no ladder is a single resting position (content-sized) —
    // the engine treats it as fully-open (1) with no intermediate detents.
    return [1];
}

/** Nearest detent fraction to `value` in the ladder. */
function nearestDetent(value: number, ladder: number[]): number {
    let best = ladder[0];
    let bestDist = Math.abs(value - best);
    for (const d of ladder) {
        const dist = Math.abs(value - d);
        if (dist < bestDist) {
            best = d;
            bestDist = dist;
        }
    }
    return best;
}

/** The detent one step toward `dir` (+1 toward-open, −1 toward-closed) from `from`. */
function steppedDetent(from: number, dir: 1 | -1, ladder: number[]): number {
    const idx = ladder.indexOf(from);
    if (idx === -1) return nearestDetent(from, ladder);
    const next = idx + dir;
    if (next < 0 || next >= ladder.length) return from;
    return ladder[next];
}

export function useDrawerSnap(options: UseDrawerSnapOptions): UseDrawerSnapReturn {
    const { contentEl, handleEl, ctx } = options;
    const dragging = ref(false);

    // The ONE snap driver — owns its own rAF via `.play(onFrame)`, writes the
    // `--glass-drawer-t` scalar once per frame. Created lazily on the first settle;
    // a re-target mid-flight RE-SEATS from the current (value, velocity) so an
    // interrupted snap stays one continuous trajectory (the iOS interruptible
    // contract). `respectReducedMotion: true` jumps the scalar to target in one
    // frame under `prefers-reduced-motion: reduce` (the deterministic detent seat).
    let spring: SpringProgress | null = null;

    // BD.W-OVERLAY-STAGE-COUPLE — the SINGLE writer (fold C1·R2, no dual-scalar
    // desync). ONE call writes BOTH the sheet's per-element translate scalar
    // (`--glass-drawer-t` on the content) AND the SCENE staging scalar (`--stage-t`
    // at `:root`) atomically, so the surface freeze / scrim deepen / page recede can
    // never desync from the translate on a drag-cancel / fling-overshoot / interrupted
    // snap. `--stage-t` lives at `:root` (not the content) because the scrim is a
    // PORTAL SIBLING and the page-wrapper is OUTSIDE the portal — neither is a
    // descendant of the content, so only a `:root` (inherited) write reaches them.
    function writeScalar(t: number) {
        const el = contentEl.value;
        if (el) el.style.setProperty("--glass-drawer-t", `${t}`);
        document.documentElement.style.setProperty("--stage-t", `${t}`);
    }

    function disposeSpring() {
        if (spring) {
            spring.dispose();
            spring = null;
        }
        // BD.W-OVERLAY-STAGE-COUPLE — clear the inline `:root --stage-t` on close so
        // the CSS `:root:not(:has(…open…))` reset (drawer.css) takes over and the NEXT
        // open does not inherit a stale full-staged value (the registered-property
        // stale-latch fix, fold C3·R7). An inline write would otherwise out-specify
        // the reset rule and latch the scene at the last detent fraction.
        document.documentElement.style.removeProperty("--stage-t");
    }

    function ensureSpring(): SpringProgress {
        if (spring) return spring;
        spring = new SpringProgress({
            response: DRAWER_SNAP.response,
            dampingFraction: DRAWER_SNAP.dampingFraction,
            initial: currentFraction(),
            respectReducedMotion: true,
        });
        spring.play((t) => writeScalar(t));
        return spring;
    }

    /** The live snap fraction — the active-snap-point coerced to 0..1. */
    function currentFraction(): number {
        const raw = ctx.activeSnapPoint.value;
        if (typeof raw === "number") return raw;
        if (typeof raw === "string") {
            const n = Number.parseFloat(raw);
            if (!Number.isNaN(n)) return n;
        }
        // No active detent yet — seat at the fullest detent of the resolved ladder.
        const ladder = effectiveLadder(ctx.snapPoints.value, ctx.direction.value);
        return ladder[ladder.length - 1] ?? 1;
    }

    /** Settle the spring toward `fraction`, writing back the active-snap-point. */
    function settleTo(fraction: number) {
        const s = ensureSpring();
        s.target = fraction;
        ctx.activeSnapPoint.value = fraction;
    }

    // Public: programmatically re-snap an OPEN sheet to a detent (the house engine
    // owns the snap math — no vaul controllable-shadowing limitation; an external
    // `activeSnapPoint` write round-trips).
    function snapTo(fraction: number) {
        const ladder = effectiveLadder(ctx.snapPoints.value, ctx.direction.value);
        settleTo(nearestDetent(fraction, ladder));
    }

    // ── The drag gesture (pointer-capture on the handle) ──────────────────────
    // The drag delta maps to a fraction delta along the sheet's drag axis; release
    // velocity-decides the detent (the useDockState-style decision). A vertical
    // (bottom/top) sheet reads clientY; a horizontal (left/right) sheet reads
    // clientX. Dragging UP/IN (toward more open) increases the fraction.
    let pointerId: number | null = null;
    let startCoord = 0;
    let startFraction = 0;
    let lastCoord = 0;
    let lastTime = 0;
    let velocity = 0; // px/s along the drag axis (positive = toward-open)

    function axisCoord(e: PointerEvent): number {
        const dir = ctx.direction.value;
        // Bottom sheet: UP (decreasing clientY) is toward-open → negate so a larger
        // value means more open. Top sheet: DOWN (increasing clientY) is toward-open.
        // Left lens: RIGHT (increasing clientX) is toward-open. Right lens: LEFT.
        if (dir === "bottom") return -e.clientY;
        if (dir === "top") return e.clientY;
        if (dir === "left") return e.clientX;
        return -e.clientX; // right
    }

    function dragSpan(): number {
        // The travel span (px) one full fraction of the sheet covers. For a bottom/
        // top sheet that is the content block-size; for a side lens, the inline-size.
        const el = contentEl.value;
        if (!el) return 1;
        const r = el.getBoundingClientRect();
        return isSideAxis(ctx.direction.value) ? r.width || 1 : r.height || 1;
    }

    function onPointerDown(e: PointerEvent) {
        const handle = handleEl.value;
        if (!handle) return;
        // Suspend the spring — the drag drives the scalar directly during the gesture.
        if (spring) spring.stop();
        dragging.value = true;
        pointerId = e.pointerId;
        startCoord = axisCoord(e);
        lastCoord = startCoord;
        lastTime = e.timeStamp;
        startFraction = currentFraction();
        velocity = 0;
        handle.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
        if (pointerId === null || e.pointerId !== pointerId) return;
        const coord = axisCoord(e);
        const dt = (e.timeStamp - lastTime) / 1000;
        if (dt > 0) velocity = (coord - lastCoord) / dt;
        lastCoord = coord;
        lastTime = e.timeStamp;
        // Map the px delta to a fraction delta and write the scalar directly.
        const deltaFraction = (coord - startCoord) / dragSpan();
        const ladder = effectiveLadder(ctx.snapPoints.value, ctx.direction.value);
        const min = ladder[0];
        const max = ladder[ladder.length - 1];
        const next = Math.min(max, Math.max(min, startFraction + deltaFraction));
        writeScalar(next);
    }

    function onPointerUp(e: PointerEvent) {
        if (pointerId === null || e.pointerId !== pointerId) return;
        const handle = handleEl.value;
        handle?.releasePointerCapture?.(e.pointerId);
        pointerId = null;
        dragging.value = false;

        const ladder = effectiveLadder(ctx.snapPoints.value, ctx.direction.value);
        // Where the scalar currently sits (read the live painted scalar).
        const live = readScalar();
        // The useDockState-style velocity decision: a fling past the threshold
        // advances a detent in the drag direction; a slow release snaps to nearest.
        let target: number;
        if (Math.abs(velocity) >= DRAWER_FLING_VELOCITY && ladder.length > 1) {
            const dir: 1 | -1 = velocity > 0 ? 1 : -1;
            target = steppedDetent(nearestDetent(live, ladder), dir, ladder);
        } else {
            target = nearestDetent(live, ladder);
        }
        // A drag that flings the sheet below the smallest detent (a dismiss flick)
        // on a side-lens / single-stop ladder closes it.
        if (target <= 0) {
            ctx.open.value = false;
            return;
        }
        settleTo(target);
    }

    function readScalar(): number {
        const el = contentEl.value;
        if (!el) return currentFraction();
        const v = el.style.getPropertyValue("--glass-drawer-t");
        const n = Number.parseFloat(v);
        return Number.isNaN(n) ? currentFraction() : n;
    }

    // Wire/unwire the pointer listeners on the handle as it mounts/unmounts.
    let detach: (() => void) | null = null;
    function attach(handle: HTMLElement) {
        handle.addEventListener("pointerdown", onPointerDown);
        handle.addEventListener("pointermove", onPointerMove);
        handle.addEventListener("pointerup", onPointerUp);
        handle.addEventListener("pointercancel", onPointerUp);
        detach = () => {
            handle.removeEventListener("pointerdown", onPointerDown);
            handle.removeEventListener("pointermove", onPointerMove);
            handle.removeEventListener("pointerup", onPointerUp);
            handle.removeEventListener("pointercancel", onPointerUp);
            detach = null;
        };
    }

    watch(
        handleEl,
        (el) => {
            detach?.();
            if (el) attach(el);
        },
        { immediate: true },
    );

    // On open, seat the scalar at the opening detent (the consumer's chosen
    // activeSnapPoint, or the fullest detent) and run the open-settle. On close,
    // dispose the spring (the content unmounts; the scalar resets next open).
    watch(
        ctx.open,
        (isOpen) => {
            if (isOpen) {
                // The content may not be mounted yet — defer to the next tick via a
                // microtask so the contentEl ref is populated before the first write.
                queueMicrotask(() => {
                    writeScalar(0);
                    settleTo(currentFraction());
                });
            } else {
                disposeSpring();
            }
        },
        { immediate: true },
    );

    // An EXTERNAL activeSnapPoint write on an ALREADY-OPEN sheet re-snaps it (the
    // vaul controllable-shadowing limitation the house engine dissolves — the
    // engine owns the snap math). The watch ignores its own settleTo writeback by
    // comparing against the live target.
    watch(
        ctx.activeSnapPoint,
        (raw) => {
            if (!ctx.open.value || dragging.value) return;
            const next =
                typeof raw === "number"
                    ? raw
                    : typeof raw === "string"
                      ? Number.parseFloat(raw)
                      : NaN;
            if (Number.isNaN(next)) return;
            // Only re-settle if the spring is not already heading there.
            if (!spring || Math.abs(spring.target - next) > 1e-3) {
                const ladder = effectiveLadder(
                    ctx.snapPoints.value,
                    ctx.direction.value,
                );
                ensureSpring().target = nearestDetent(next, ladder);
            }
        },
    );

    onUnmounted(() => {
        detach?.();
        disposeSpring();
    });

    return { dragging, snapTo };
}
