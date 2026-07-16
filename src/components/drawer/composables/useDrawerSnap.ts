// BB.W-DRAWER-ABROGATE — the THIN house snap engine (the snap math vaul-vue used to
// own, on the HOUSE motion engine).
//
// ONE `SpringProgress` (the dock-morph `linear()`-curve clock, the §6 doctrine —
// `useDockMorph.ts` precedent) writes a `--glass-drawer-t` snap-fraction
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
import { motionTempo } from "../../../composables/motion/motionTempo";
import { DRAWER_FLING_VELOCITY, DRAWER_SNAP } from "../constants";
import type { DrawerSnapContext } from "./drawerSnapContext";

export interface UseDrawerSnapOptions {
    /**
     * Resolve the content sheet element LIVE (the `--glass-drawer-t` host + the drag
     * bound box). A GETTER, never a snapshotted ref — reka's `DialogContent` forwards
     * its root element THROUGH a `<Presence>` swap, so a `$el` captured at first mount
     * is a stale comment placeholder and the writer's `if (el)` guard skips forever
     * (the F5.R2 model↔paint SEVER — `writeScalar` "never fires"). Resolving the element
     * fresh on every write reaches the painted sheet the instant `<Presence>` mounts it.
     */
    contentEl: () => HTMLElement | null;
    /** The handle element (the grip the user drags to cycle detents). */
    handleEl: Ref<HTMLElement | null>;
    /** The provided snap seam (the ladder, open ref, direction, snap-fraction writeback). */
    ctx: DrawerSnapContext;
}

export interface UseDrawerSnapReturn {
    /** Internal Presence hold: true through the closing spring's settle. */
    present: Ref<boolean>;
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
    const present = ref(ctx.open.value);

    // The ONE snap driver — owns its own rAF via `.play(onFrame)`, writes the
    // `--glass-drawer-t` scalar once per frame. Created lazily on the first settle;
    // a re-target mid-flight RE-SEATS from the current (value, velocity) so an
    // interrupted snap stays one continuous trajectory (the iOS interruptible
    // contract). `respectReducedMotion: true` jumps the scalar to target in one
    // frame under `prefers-reduced-motion: reduce` (the deterministic detent seat).
    let spring: SpringProgress | null = null;

    // The two CROSS-SUBTREE `--stage-t` reader roots — the scrim (a PORTAL SIBLING) +
    // the page-wrapper (OUTSIDE the portal). The Drawer root and its private overlay
    // register both through this instance's context. The spring caches only those owned
    // refs for close cleanup; it never searches the document and therefore cannot write
    // another concurrently mounted Drawer's portal.
    let scrimEl: HTMLElement | null = null;
    let wrapperEl: HTMLElement | null = null;
    function applyStageGates(
        wrapper: HTMLElement | null,
        scrim: HTMLElement | null,
        active: boolean,
    ) {
        const stage = ctx.stage.value;
        wrapper?.toggleAttribute(
            "data-stage-scale",
            active && (stage === "scale" || stage === "immersive"),
        );
        scrim?.toggleAttribute(
            "data-stage-immersive",
            active && stage === "immersive",
        );
    }

    function syncStageGates(active: boolean) {
        refreshStageRoots();
        applyStageGates(wrapperEl, scrimEl, active);
    }

    function refreshStageRoots() {
        const nextScrim = ctx.scrimEl.value;
        const nextWrapper = ctx.wrapperEl.value;
        if (nextScrim?.isConnected) scrimEl = nextScrim;
        else if (scrimEl && !scrimEl.isConnected) scrimEl = null;
        if (nextWrapper?.isConnected) wrapperEl = nextWrapper;
        else if (wrapperEl && !wrapperEl.isConnected) wrapperEl = null;
    }

    function crossSubtreeStageRoots(): HTMLElement[] {
        const priorScrim = scrimEl;
        const priorWrapper = wrapperEl;
        refreshStageRoots();
        if (
            present.value &&
            (scrimEl !== priorScrim || wrapperEl !== priorWrapper)
        )
            applyStageGates(wrapperEl, scrimEl, true);
        const roots: HTMLElement[] = [];
        if (scrimEl) roots.push(scrimEl);
        if (wrapperEl) roots.push(wrapperEl);
        return roots;
    }

    // BD.W-OVERLAY-STAGE-COUPLE — the SINGLE writer (fold C1·R2, no dual-scalar
    // desync). ONE call writes BOTH the sheet's per-element translate scalar
    // (`--glass-drawer-t`) AND the SCENE staging scalar (`--stage-t`) atomically, so the
    // surface freeze / scrim deepen / page recede can never desync from the translate on
    // a drag-cancel / fling-overshoot / interrupted snap.
    //
    // BI.W-DRAWER-PERF — `--stage-t` is SCOPED to the three reader roots (the sheet ·
    // the scrim · the page-wrapper), NOT `document.documentElement`. A per-frame
    // `documentElement` write invalidated the inherited-property cache for the WHOLE
    // document (a 120× main-thread lever — 12.53 ms/frame vs 0.104 ms scoped). `--stage-t`
    // is now `inherits: false` (drawer.css), so each scoped write recalcs ONLY its own
    // element — the sheet is the live `contentEl`; the scrim + wrapper are the cached
    // cross-subtree roots.
    function writeScalar(t: number) {
        const sheet = contentEl();
        if (sheet) {
            sheet.style.setProperty("--glass-drawer-t", `${t}`);
            sheet.style.setProperty("--stage-t", `${t}`);
        }
        for (const el of crossSubtreeStageRoots()) {
            el.style.setProperty("--stage-t", `${t}`);
        }
    }

    function clearStageScalars() {
        // BI.W-DRAWER-PERF — clear the scoped inline `--stage-t` on close so each reader
        // root reverts to the registered `initial-value: 0` (drawer.css) and the NEXT
        // open does not latch a stale full-staged value (the stale-latch fix, fold
        // C3·R7). The sheet unmounts with the content; clear the cross-subtree roots +
        // drop the cache so the next open re-resolves a freshly-portaled scrim.
        const sheet = contentEl();
        if (sheet) sheet.style.removeProperty("--stage-t");
        if (scrimEl) scrimEl.style.removeProperty("--stage-t");
        if (wrapperEl) wrapperEl.style.removeProperty("--stage-t");
        scrimEl = null;
        wrapperEl = null;
    }

    function disposeSpring() {
        spring?.dispose();
        spring = null;
        clearStageScalars();
    }

    function finishCloseIfSettled() {
        if (
            ctx.open.value ||
            !spring ||
            spring.target !== 0 ||
            !spring.settled
        )
            return;
        writeScalar(0);
        present.value = false;
        syncStageGates(false);
        clearStageScalars();
    }

    function onSpringFrame(t: number) {
        writeScalar(t);
        finishCloseIfSettled();
    }

    function ensureSpring(initial?: number): SpringProgress {
        if (spring) return spring;
        spring = new SpringProgress({
            // BI.W-TEMPO — co-scale the DRAWER_SNAP response by `--motion-tempo` read
            // off the drawer's OWN scope (the content element, which inherits the
            // `.glass-drawer { --motion-tempo: 1 }` loud-scope re-pin, scheme-motion.css)
            // so the snap settle shares ONE clock with its CSS twin at any tempo (P7,
            // G2). Byte-identical at the 1.0 identity. DRAWER_SNAP (constants.ts) stays
            // byte-fenced — this scales the READ, not the register.
            response: DRAWER_SNAP.response * motionTempo(contentEl()),
            dampingFraction: DRAWER_SNAP.dampingFraction,
            // Seed at the caller's endpoint when given (the open path seeds CLOSED so
            // the settle is a real slide-in); else the live resting fraction.
            initial: initial ?? currentFraction(),
            respectReducedMotion: true,
        });
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
        // Assign the target before arming playback. Under reduced motion the target
        // setter settles synchronously; the following play emits that settled endpoint
        // once, so paint and Presence cannot remain latched at the prior target.
        s.target = fraction;
        // Re-arm the per-frame callback — a drag's `spring.stop()` detaches it, so a
        // settle after a gesture must re-bind to resume the rAF loop and PAINT the
        // trajectory (idempotent: no second loop).
        s.play(onSpringFrame);
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

    // BI.W-DRAWER-PERF — the drag travel span (px) one full fraction covers, measured
    // ONCE at gesture start (`onPointerDown`) and cached, NOT per frame. A per-frame
    // `getBoundingClientRect()` in `onPointerMove` is a forced synchronous reflow (the
    // ForcedReflow the trace flagged); the sheet's box is fixed for the gesture, so the
    // pointerdown measure is exact for the whole drag.
    let cachedDragSpan = 1;
    function measureDragSpan(): number {
        // For a bottom/top sheet the span is the content block-size; for a side lens,
        // the inline-size. This is the ONLY `getBoundingClientRect` — called at
        // pointerdown, never on the per-frame move path.
        const el = contentEl();
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
        // A grab can interrupt an in-flight open, close, or re-snap. Start from the
        // scalar actually on screen, not the destination already stored in the model.
        startFraction = readScalar();
        velocity = 0;
        // Measure the drag span ONCE, here — the per-frame move path reads the cache.
        cachedDragSpan = measureDragSpan();
        handle.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
        if (pointerId === null || e.pointerId !== pointerId) return;
        const coord = axisCoord(e);
        const dt = (e.timeStamp - lastTime) / 1000;
        if (dt > 0) velocity = (coord - lastCoord) / dt;
        lastCoord = coord;
        lastTime = e.timeStamp;
        // Map the px delta to a fraction delta and write the scalar directly. Read the
        // pointerdown-cached span — NO per-frame `getBoundingClientRect` (the reflow).
        const deltaFraction = (coord - startCoord) / cachedDragSpan;
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
        // Where the scalar currently sits (read the live painted scalar the drag wrote
        // directly). Re-seat the (stopped) spring at that live position so the release
        // settle animates FROM where the finger left the sheet — not the stale pre-drag
        // value the suspended spring still holds (which would jump the sheet on release).
        const live = readScalar();
        ensureSpring().reset(live, velocity / cachedDragSpan);
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
        const el = contentEl();
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

    // One Presence hold and one spring own both edges. Re-targeting the existing
    // spring preserves its live value and velocity; close unmounts only at t=0 settle.
    watch(
        ctx.open,
        (isOpen) => {
            if (isOpen) {
                present.value = true;
                syncStageGates(true);
                queueMicrotask(() => {
                    if (!ctx.open.value) return;
                    if (!spring) {
                        writeScalar(0);
                        ensureSpring(0);
                    }
                    settleTo(currentFraction());
                });
            } else {
                if (!present.value) return;
                if (!spring) {
                    writeScalar(0);
                    present.value = false;
                    syncStageGates(false);
                    clearStageScalars();
                    return;
                }
                if (dragging.value) {
                    spring.reset(
                        readScalar(),
                        velocity / cachedDragSpan,
                    );
                    if (pointerId !== null) {
                        handleEl.value?.releasePointerCapture?.(pointerId);
                        pointerId = null;
                    }
                    dragging.value = false;
                }
                spring.target = 0;
                spring.play(onSpringFrame);
                finishCloseIfSettled();
            }
        },
        { immediate: true, flush: "sync" },
    );

    watch([ctx.stage, ctx.wrapperEl, ctx.scrimEl], () => {
        if (present.value) syncStageGates(true);
    });

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
                const s = ensureSpring();
                s.target = nearestDetent(next, ladder);
                s.play(onSpringFrame);
            }
        },
    );

    onUnmounted(() => {
        detach?.();
        syncStageGates(false);
        disposeSpring();
    });

    return { present, dragging, snapTo };
}
