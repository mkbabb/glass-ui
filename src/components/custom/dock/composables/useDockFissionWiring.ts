import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue";
import type { Ref } from "vue";
import {
    useDockFission,
    DOCK_SPLIT_SIGNATURES,
    type DockFissionPieceHandle,
    type DockSplitContext,
    type DockSplitPlacement,
} from "./useDockFission";

/**
 * BG.W-DOCK-DECOMPOSE — the dock FISSION-WIRING cluster, carved off the
 * `GlassDock.vue` god-SFC (the F6.5 one-writer-per-concern seam): the split-signature/
 * placement refs, the fission engine instantiation, the auto-registration of
 * `[data-dock-splittable]` children as fission PIECES (their detach vectors), the
 * drag-to-split pointer state, and the imperative split/merge/toggle surface. It is a
 * CONSUMING seam BESIDE the morph engine (box-INVIOLATE — it composes `useDockFission`
 * off the dock body but never writes the collapse morph scalar `--dock-morph-t`/
 * `--dock-morph-v`; the fission engine owns its OWN `--dock-split-t` cohort).
 *
 * BD.W-DOCK-CORE (A13 / II.2) — armed ONLY when the dock is `:splittable` (additive
 * default-off → the return no-ops and the wiring is inert, byte-identical to a
 * non-splittable dock). The fission spring rides the SAME re-tuned WEIGHTY
 * `DOCK_SPRING` register (no second clock), BESIDE the morph engine.
 */
export interface UseDockFissionWiringOptions {
    /** The dock body root — the fission PIECES live inside it; the vector is measured against its center. */
    rootEl: Ref<HTMLElement | null>;
    /**
     * The non-clipping `.glass-dock-frame` — the fission scalars + the sibling island/
     * neck bridge inherit the cascading `--dock-split-t`/`--island-*`/`--seam-tension`
     * from this common ancestor (OUTSIDE the dock's `contain: paint`), so the frame is
     * the fission scope, NOT the `.glass-dock` root.
     */
    frameEl: Ref<HTMLElement | null>;
    /** Whether the dock is a split facility (read once at wire time). */
    splittable: boolean;
    /** The active split context getter (search|media|nav). */
    splitContext: () => DockSplitContext | undefined;
    /** The placement the detached cluster flies to (beside|above|below). */
    splitPlacement: () => DockSplitPlacement | undefined;
}

export interface UseDockFissionWiringReturn {
    /** True while the dock is fissioned (a computed-false stub on a non-splittable dock). */
    fissioned: Readonly<Ref<boolean>>;
    /** The dock-host `@pointermove` handler (feeds the fission velocity field + commits a drag-split). */
    onDockPointerMove(event: PointerEvent): void;
    /** A `pointerdown` on a `[data-dock-splittable]` control arms the drag origin. */
    onDockPointerDown(event: PointerEvent): void;
    /** Disarm the drag-split origin (pointerup/cancel). */
    onDockPointerUp(): void;
    /** Imperative SPLIT — re-measure the pieces, then run the fission spring 0→1. */
    split(): void;
    /** Imperative RE-MERGE — run the fission spring 1→0 (the SAME loop, target flipped). */
    merge(): void;
    /** Imperative toggle split↔merge from the current state. */
    toggleSplit(): void;
}

/** The pull distance (px) past which a pointer-drag on a split-eligible control commits the fission. */
const DRAG_SPLIT_THRESHOLD_PX = 36;

export function useDockFissionWiring(
    options: UseDockFissionWiringOptions,
): UseDockFissionWiringReturn {
    const { rootEl, frameEl, splittable, splitContext, splitPlacement } = options;

    const signatureRef = shallowRef(DOCK_SPLIT_SIGNATURES[splitContext() ?? "nav"]);
    watch(splitContext, (ctx) => {
        signatureRef.value = DOCK_SPLIT_SIGNATURES[ctx ?? "nav"];
    });

    const placementRef = shallowRef<DockSplitPlacement>(splitPlacement() ?? "beside");
    watch(splitPlacement, (p) => {
        placementRef.value = p ?? "beside";
    });

    const fission = splittable
        ? useDockFission({
              rootEl: frameEl,
              signature: signatureRef,
              placement: placementRef,
          })
        : null;

    /** The live fissioned flag the template reads (a computed-false stub when not splittable). */
    const fissioned: Readonly<Ref<boolean>> = fission
        ? fission.fissioned
        : computed(() => false);

    /* Auto-register every child marked `data-dock-splittable` as a fission PIECE. The
       detach vector is the child's center relative to the dock center — a radial bloom
       for `search`, a lateral peel for `media`, the inward (negative-radial) merge for
       `nav`. The vector is a GETTER so a live re-measure re-resolves per read (the dock
       geometry can shift on density/orientation). */
    const pieceHandles: DockFissionPieceHandle[] = [];

    function dockCenter(): { x: number; y: number } {
        const el = rootEl.value;
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }

    function registerSplittablePieces(): void {
        const root = rootEl.value;
        if (!root || !fission) return;
        // Clear any prior registration (a re-register after a layout shift).
        for (const h of pieceHandles.splice(0)) h.release();
        const marked = Array.from(
            root.querySelectorAll<HTMLElement>("[data-dock-splittable]"),
        );
        const ctx = splitContext() ?? "nav";
        marked.forEach((el, rank) => {
            el.classList.add("dock-fission-piece");
            const handle = fission.registerPiece({
                el: ref(el),
                rank,
                vector: () => {
                    const c = dockCenter();
                    const r = el.getBoundingClientRect();
                    const ex = r.left + r.width / 2;
                    const ey = r.top + r.height / 2;
                    let dx = ex - c.x;
                    let dy = ey - c.y;
                    // Normalize to a unit-ish vector (the orchestrator scales by --piece-reach).
                    const mag = Math.hypot(dx, dy) || 1;
                    dx /= mag;
                    dy /= mag;
                    // nav = INWARD merge: the negative radial (pieces fold toward center).
                    if (ctx === "nav") {
                        dx = -dx;
                        dy = -dy;
                    }
                    // media = LATERAL peel: bias to the cross (inline) axis.
                    if (ctx === "media") dy *= 0.25;
                    return { dx, dy };
                },
            });
            pieceHandles.push(handle);
        });
    }

    if (fission) {
        onMounted(() => {
            nextTick(registerSplittablePieces);
        });
        onBeforeUnmount(() => {
            for (const h of pieceHandles.splice(0)) h.release();
        });
    }

    /* The drag-to-split pointer state. A pointerdown on a `[data-dock-splittable]`
       control arms the drag origin; a pull past the threshold (in onDockPointerMove)
       commits the fission; pointerup disarms. The keyboard path (Enter/Space on a
       split-eligible control) is the consumer's `toggleSplit()` call. */
    let dragOrigin: { x: number; y: number } | null = null;

    function onDockPointerMove(event: PointerEvent): void {
        fission?.onPointerMove(event);
        // BD.W-DOCK-CORE (A12 / II.3) — the drag IS the split gesture. While a pointer is
        // held down on a split-eligible control, a pull PAST the threshold COMMITS the
        // fission. Compositor-only (the fission translates via transform).
        if (dragOrigin) {
            const dx = event.clientX - dragOrigin.x;
            const dy = event.clientY - dragOrigin.y;
            if (
                Math.hypot(dx, dy) > DRAG_SPLIT_THRESHOLD_PX &&
                fission &&
                !fission.fissioned.value
            ) {
                split();
            }
        }
    }

    function onDockPointerDown(event: PointerEvent): void {
        if (!fission) return;
        const target = event.target as HTMLElement | null;
        if (target?.closest("[data-dock-splittable]")) {
            dragOrigin = { x: event.clientX, y: event.clientY };
        }
    }

    function onDockPointerUp(): void {
        dragOrigin = null;
    }

    /** Imperative split/merge/toggle — re-measure pieces, then run the fission spring. */
    function split(): void {
        if (!fission) return;
        registerSplittablePieces();
        fission.split();
    }
    function merge(): void {
        fission?.merge();
    }
    function toggleSplit(): void {
        if (!fission) return;
        registerSplittablePieces();
        fission.toggle();
    }

    return {
        fissioned,
        onDockPointerMove,
        onDockPointerDown,
        onDockPointerUp,
        split,
        merge,
        toggleSplit,
    };
}
