/**
 * The sortable drag transaction — propose / commit / cancel, and the vacancy.
 *
 * THE VACANCY IS THE INDICATOR. There is no drawn insertion line, no caret, no bar:
 * the rows between the source and the proposed position translate by one row's block
 * size, which opens a gap exactly where the row would land, and the lifted row's own
 * (unpainted) slot travels into it. One spatial account, one copy of the row, nothing
 * to keep in sync — the 7.0.0 gold shimmer bar had a mass 9.4× the indicator rung and
 * still could not say where an EMPTY list would receive.
 *
 * THE TRANSACTION IS PRESERVED BYTE-FOR-BYTE. The four announcements, the focus
 * retention, the single `reorder` emit, the O(rows) midpoint scan and the cross-list
 * transfer are the good half of this component and are not redesigned here. What
 * changed around them: a gesture must EARN the transaction (8px or the hold) before
 * a single word is announced, and the ghost is now taken before the source is marked.
 *
 * THE ROWS CARRY THEIR OWN CLOCK. `.sortable-item` transitions `transform` on the
 * dock curve unconditionally, so opening the vacancy and closing it are the same
 * mechanism read in two directions — there is no "parting mode" to enter and leave,
 * and clearing a transform animates home instead of snapping.
 */

import { createGhost, type Ghost } from "./ghost";
import {
    ACTIVATION_HOLD_MS,
    ACTIVATION_SLOP_PX,
    VelocitySampler,
    flyProgress,
    type Flight,
} from "./motion";
import {
    findForeignTarget,
    resolveBoundary,
    snapshotRows,
    type ListRects,
} from "./resolve";
import type { InstanceHandle, SortableId } from "./types";
import { shallowRef, type ShallowRef } from "vue";

type InputMode = "keyboard" | "pointer";

const VACANCY_ATTR = "data-sortable-vacancy";
const LIFTED_ATTR = "data-sortable-lifted";
const ARMED_ATTR = "data-sortable-armed";
/** The reversal clock: a cancel is not a proposal, so the vacancy closes on `press`. */
const CLOSING_ATTR = "data-sortable-closing";
const VACANCY_BLOCK_PROP = "--sortable-vacancy-block";
const FLOATING_CLASS = "glass-floating";

interface Proposal {
    /** Final same-list position, or insertion position for a foreign list. */
    index: number;
    target: InstanceHandle | null;
}

/** A viewport top-left — where a plate is, or where it is going. */
interface Origin {
    x: number;
    y: number;
}

/**
 * A receiving list's resting geometry, taken when its arm OPENS — before a single row
 * of it carries a parting transform. Held as an OFFSET from the container box rather
 * than in viewport coordinates: the container never carries a transform, so re-reading
 * it at release survives a scroll AND cannot pick up a row's mid-transition position,
 * which is the same reason the source snapshots its own rows once at lift (E4).
 */
interface Arrival {
    dx: number;
    dy: number;
    /** This list's own row pitch — the arriving subject's block is a separate figure. */
    pitch: number;
}

interface Pending {
    id: SortableId;
    pointerId: number;
    /** The press point — fixed, so both the slop and the grab offset read the same origin. */
    x: number;
    y: number;
    hold: ReturnType<typeof setTimeout>;
}

export interface DragControllerDeps {
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    getLabel: (item: unknown) => string;
    elements: Map<SortableId, Element | null>;
    handle: InstanceHandle;
    onReorder: (next: unknown[]) => void;
    announce: (message: string) => void;
    focusItem: (id: SortableId) => void;
}

export interface DragController {
    dragId: ShallowRef<SortableId | null>;
    dropIndex: ShallowRef<number | null>;
    beginPointer: (id: SortableId, event: PointerEvent) => void;
    onKeydown: (id: SortableId, event: KeyboardEvent) => void;
    /** A sibling instance parts THIS list's rows for an incoming subject. */
    partForExternal: (index: number | null, block: number | null) => void;
    /** Where a subject arriving at `index` comes to rest — the releasing list's ask. */
    vacancyOrigin: (index: number) => Origin | null;
    cancel: () => void;
    dispose: () => void;
}

export function createDragController(deps: DragControllerDeps): DragController {
    const dragId = shallowRef<SortableId | null>(null);
    const dropIndex = shallowRef<number | null>(null);

    let mode: InputMode | null = null;
    let proposal: Proposal | null = null;
    let sourceEl: HTMLElement | null = null;
    let sourceRect: DOMRect | null = null;
    let grabX = 0;
    let grabY = 0;
    let pointerId: number | null = null;
    let pending: Pending | null = null;
    let ghost: Ghost | null = null;
    let rects: ListRects | null = null;
    let arrival: Arrival | null = null;
    let flight: Flight | null = null;
    /** The detached plate, held ONLY so an unmount mid-flight can take it with it. */
    let flying: Ghost | null = null;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;
    const sampler = new VelocitySampler();

    function container(): HTMLElement | null {
        const el = deps.handle.getContainer();
        return el instanceof HTMLElement ? el : null;
    }

    function findIndex(id: SortableId): number {
        return deps.getItems().findIndex((item) => deps.getId(item) === id);
    }

    function itemLabel(id: SortableId): string {
        const item = deps.getItems().find((candidate) => deps.getId(candidate) === id);
        return item === undefined ? String(id) : deps.getLabel(item);
    }

    function order(): SortableId[] {
        return deps.getItems().map((item) => deps.getId(item));
    }

    /** The source row's live top-left — the landing for a same-list drop or a reversal. */
    function sourceOrigin(): Origin | null {
        const box = sourceEl?.getBoundingClientRect();
        return box ? { x: box.left, y: box.top } : null;
    }

    // ── the vacancy ─────────────────────────────────────────────────────────────
    /** Write one row's parting offset. `0` clears the write entirely. */
    function shiftRow(id: SortableId, dy: number): void {
        const el = deps.elements.get(id);
        if (!(el instanceof HTMLElement)) return;
        if (dy === 0) el.style.removeProperty("transform");
        else el.style.transform = `translate3d(0, ${dy}px, 0)`;
    }

    function clearShifts(): void {
        for (const el of deps.elements.values()) {
            if (el instanceof HTMLElement) el.style.removeProperty("transform");
        }
    }

    /**
     * Open the vacancy at `final` for a subject lifted from `source`. Rows between the
     * two travel one pitch toward the source's old slot; the subject's own slot travels
     * to the vacancy. Compositor-only — every write is a transform.
     */
    function partLocal(source: number, final: number): void {
        if (!rects) return;
        const pitch = rects.pitch;
        const ids = order();
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i]!;
            if (i === source) shiftRow(id, (final - source) * pitch);
            else if (final > source && i > source && i <= final) shiftRow(id, -pitch);
            else if (final < source && i >= final && i < source) shiftRow(id, pitch);
            else shiftRow(id, 0);
        }
    }

    /** The subject has left for a sibling list: this list closes behind it. */
    function partLeaving(source: number): void {
        if (!rects) return;
        const ids = order();
        for (let i = 0; i < ids.length; i++) {
            shiftRow(ids[i]!, i > source ? -rects.pitch : 0);
        }
    }

    /**
     * Part THIS list for a subject arriving from a sibling instance — and, when the
     * list is empty, BE the vacancy: the container's own min-block-size springs to the
     * subject's block size, so an empty column stops being an invisible target that
     * silently accepts the drop.
     */
    function partForExternal(index: number | null, block: number | null): void {
        const host = container();
        if (!host) return;
        if (index === null) {
            clearShifts();
            arrival = null;
            host.removeAttribute(ARMED_ATTR);
            host.style.removeProperty(VACANCY_BLOCK_PROP);
            return;
        }
        // The anchor is taken ONCE, on the frame the arm opens, while this list is
        // still at rest. Every later call moves the gap within the same geometry.
        if (arrival === null) {
            const resting = snapshotRows(deps.elements, order());
            const first = resting.rows[0];
            const hostBox = host.getBoundingClientRect();
            arrival = first
                ? {
                      dx: first.left - hostBox.left,
                      dy: first.top - hostBox.top,
                      pitch: resting.pitch,
                  }
                : // An EMPTY list has no rows to offset from: it IS the vacancy, and
                  // its own box is where the subject lands.
                  { dx: 0, dy: 0, pitch: 0 };
        }
        const pitch = block ?? rects?.pitch ?? 0;
        host.setAttribute(ARMED_ATTR, "");
        host.style.setProperty(VACANCY_BLOCK_PROP, `${pitch}px`);
        const ids = order();
        for (let i = 0; i < ids.length; i++) shiftRow(ids[i]!, i >= index ? pitch : 0);
    }

    /**
     * Where a subject arriving at `index` comes to rest, in viewport coordinates. The
     * RECEIVER answers this because the receiver owns the gap: the releasing list has
     * closed behind the subject, so its own rows say nothing about where the row went.
     * One formula spans the whole range — `index` runs 0…rows.length, and the last of
     * those is the append slot immediately after the final row.
     */
    function vacancyOrigin(index: number): Origin | null {
        const host = container();
        if (!host || !arrival) return null;
        const hostBox = host.getBoundingClientRect();
        return {
            x: hostBox.left + arrival.dx,
            y: hostBox.top + arrival.dy + index * arrival.pitch,
        };
    }

    /**
     * Re-take the resting snapshot when the viewport moves under a live drag. Rows are
     * un-shifted, measured, and re-shifted inside one turn — the only layout read the
     * gesture performs after lift, and it happens on scroll/resize, never per move.
     */
    function resnapshot(): void {
        if (dragId.value === null || sourceEl === null) return;
        const source = findIndex(dragId.value);
        clearShifts();
        rects = snapshotRows(deps.elements, order());
        sourceRect = sourceEl.getBoundingClientRect();
        if (!proposal) return;
        if (proposal.target === null) {
            partLocal(source, proposal.index);
            return;
        }
        // A FOREIGN proposal parts this list too — `clearShifts()` above has just undone
        // it, so re-applying is not optional; without it the source list stood open at
        // its full height until the next pointermove. The subject's block moved with the
        // re-measure, so the receiver is refreshed with the new figure rather than left
        // holding the pre-scroll one.
        partLeaving(source);
        proposal.target.setExternalSubjectBlock(sourceRect.height);
        proposal.target.setExternalDropIndex(proposal.index);
    }

    // ── the transaction ─────────────────────────────────────────────────────────
    function begin(id: SortableId, input: InputMode): boolean {
        if (dragId.value !== null) return false;
        const index = findIndex(id);
        const element = deps.elements.get(id);
        if (index < 0 || !(element instanceof HTMLElement)) return false;

        if (closeTimer !== null) {
            clearTimeout(closeTimer);
            closeTimer = null;
        }
        container()?.removeAttribute(CLOSING_ATTR);
        rects = snapshotRows(deps.elements, order());
        sourceRect = element.getBoundingClientRect();
        dragId.value = id;
        mode = input;
        proposal = { index, target: null };
        dropIndex.value = index;
        sourceEl = element;
        deps.announce(
            `Lifted ${itemLabel(id)}, position ${index + 1} of ${deps.getItems().length}.`,
        );
        return true;
    }

    function propose(index: number, target: InstanceHandle | null, speak = false): void {
        const id = dragId.value;
        if (id === null) return;

        if (proposal?.target && proposal.target !== target) {
            proposal.target.setExternalDropIndex(null);
            proposal.target.setExternalSubjectBlock(null);
        }

        const size = target ? target.getItems().length + 1 : deps.getItems().length;
        const max = Math.max(0, size - 1);
        const next = Math.min(Math.max(index, 0), max);
        const source = findIndex(id);
        proposal = { index: next, target };

        if (target) {
            target.setExternalSubjectBlock(sourceRect?.height ?? null);
            target.setExternalDropIndex(next);
            dropIndex.value = null;
            partLeaving(source);
        } else {
            dropIndex.value = next;
            partLocal(source, next);
        }

        if (speak) {
            deps.announce(`${itemLabel(id)}, proposed position ${next + 1} of ${size}.`);
        }
    }

    /**
     * Detach the ghost and fly it, on `dock`, to a measured rect carrying the gesture's
     * release velocity. The ghost outlives the transaction on purpose: the 7.0.0 ghost
     * was destroyed synchronously inside cleanup, which is why a 95px drop teleported
     * with ΔY 0.00 over 250ms.
     */
    function releaseGhost(to: Origin | null): void {
        const plate = ghost;
        ghost = null;
        if (!plate) return;
        flight?.stop();
        flying?.destroy();
        flying = plate;
        const from = plate.position();
        // An UNMEASURABLE endpoint still retires the plate — it dissolves where it is.
        // The alternative is the plate outliving the gesture on `document.body`, which
        // is what an early return out of `commit()` used to leave behind.
        const dest = to ?? from;
        const dx = dest.x - from.x;
        const dy = dest.y - from.y;
        const distance = Math.hypot(dx, dy);
        const v = sampler.velocity();
        const along = distance === 0 ? 0 : (v.x * dx + v.y * dy) / distance;
        plate.land();
        const retire = (): void => {
            plate.destroy();
            if (flying === plate) flying = null;
        };
        flight = flyProgress(
            "dock",
            distance,
            along,
            (t) => plate.follow(from.x + dx * t, from.y + dy * t),
            () => {
                plate.plate.dataset.done = "";
                // Removal is the dissolve clock's END, never a synchronous destroy. The
                // timeout is a LEAK FENCE, not a fallback path: both routes run the same
                // `retire`, and the class that needs it is an element detached before
                // its transition can fire.
                plate.plate.addEventListener("transitionend", retire, { once: true });
                setTimeout(retire, 400);
            },
        );
    }

    function cleanup(): void {
        proposal?.target?.setExternalDropIndex(null);
        proposal?.target?.setExternalSubjectBlock(null);
        clearShifts();
        sourceEl?.removeAttribute(VACANCY_ATTR);
        sourceEl?.removeAttribute(LIFTED_ATTR);
        sourceEl?.classList.remove(FLOATING_CLASS);
        sourceEl = null;
        sourceRect = null;
        rects = null;
        pointerId = null;
        dragId.value = null;
        dropIndex.value = null;
        mode = null;
        proposal = null;
        sampler.reset();
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerCancel);
        window.removeEventListener("scroll", resnapshot, true);
        window.removeEventListener("resize", resnapshot);
    }

    function commit(): void {
        const id = dragId.value;
        const nextProposal = proposal;
        if (id === null || nextProposal === null) return;

        const list = deps.getItems();
        const sourceIndex = list.findIndex((item) => deps.getId(item) === id);
        if (sourceIndex < 0) {
            // The subject left the list under the gesture. There is no slot to land in,
            // but the plate must still RETIRE: `cleanup()` never touches the ghost and
            // the next `activate()` overwrites the reference, which stranded a fixed
            // z-9999 plate on `document.body` for the life of the page.
            releaseGhost(sourceOrigin());
            cleanup();
            return;
        }

        // The endpoint is measured while the vacancy is still open — after cleanup the
        // rows have started home and the rect would be the resting one, not the landing.
        // A CROSS-LIST release lands in the RECEIVER's gap: `partLeaving` closes this
        // list behind the subject and so leaves the source row at its own resting slot,
        // which flew every foreign drop back to the list the row had just left.
        releaseGhost(
            nextProposal.target
                ? nextProposal.target.getVacancyOrigin(nextProposal.index)
                : sourceOrigin(),
        );

        const item = list[sourceIndex];
        const label = deps.getLabel(item);
        const target = nextProposal.target;
        const targetIndex = nextProposal.index;
        const targetSize = target ? target.getItems().length + 1 : list.length;
        cleanup();

        if (target) {
            const next = list.slice();
            next.splice(sourceIndex, 1);
            deps.onReorder(next);
            target.acceptExternal(targetIndex, item);
            deps.announce(
                `Moved ${label} from ${deps.handle.label} to ${target.label}, position ${targetIndex + 1} of ${targetSize}.`,
            );
            target.focusItem(id);
            return;
        }

        if (targetIndex !== sourceIndex) {
            const next = list.slice();
            const [moved] = next.splice(sourceIndex, 1);
            next.splice(targetIndex, 0, moved);
            deps.onReorder(next);
        }
        deps.announce(`Dropped ${label}, position ${targetIndex + 1} of ${list.length}.`);
        deps.focusItem(id);
    }

    function cancel(): void {
        clearPending();
        const id = dragId.value;
        if (id === null) return;
        const index = findIndex(id);
        const label = itemLabel(id);
        const host = container();
        host?.setAttribute(CLOSING_ATTR, "");
        if (closeTimer !== null) clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            host?.removeAttribute(CLOSING_ATTR);
            closeTimer = null;
        }, 400);
        if (sourceRect) releaseGhost({ x: sourceRect.left, y: sourceRect.top });
        cleanup();
        deps.announce(
            `Cancelled moving ${label}. Position ${index + 1} of ${deps.getItems().length}.`,
        );
        deps.focusItem(id);
    }

    function dispose(): void {
        clearPending();
        if (closeTimer !== null) clearTimeout(closeTimer);
        flight?.stop();
        ghost?.destroy();
        ghost = null;
        // A plate still in the air when the list unmounts leaves with it — the flight's
        // own retirement can no longer run once its spring is stopped.
        flying?.destroy();
        flying = null;
        if (dragId.value !== null) cleanup();
    }

    // ── activation ──────────────────────────────────────────────────────────────
    function clearPending(): void {
        if (!pending) return;
        clearTimeout(pending.hold);
        pending = null;
        document.removeEventListener("pointermove", onPendingMove);
        document.removeEventListener("pointerup", clearPending);
        document.removeEventListener("pointercancel", clearPending);
    }

    /** Promote the pending gesture into a live drag. */
    function activate(): void {
        const armed = pending;
        if (!armed) return;
        clearPending();
        if (!begin(armed.id, "pointer")) return;
        pointerId = armed.pointerId;
        sampler.reset();
        sampler.push(armed.x, armed.y);
        if (sourceEl && sourceRect) {
            grabX = armed.x - sourceRect.left;
            grabY = armed.y - sourceRect.top;
            // CLONE FIRST. The vacancy mark lands only after the clone exists, so the
            // clone can never inherit it — the whole of D1.
            ghost = createGhost(sourceEl, sourceRect);
            sourceEl.setAttribute(VACANCY_ATTR, "");
        }
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerCancel);
        window.addEventListener("scroll", resnapshot, true);
        window.addEventListener("resize", resnapshot);
    }

    function onPendingMove(event: PointerEvent): void {
        if (!pending || event.pointerId !== pending.pointerId) return;
        const travelled = Math.hypot(event.clientX - pending.x, event.clientY - pending.y);
        if (travelled < ACTIVATION_SLOP_PX) return;
        activate();
        onPointerMove(event);
    }

    function beginPointer(id: SortableId, event: PointerEvent): void {
        if (dragId.value !== null || pending !== null) return;
        pending = {
            id,
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            hold: setTimeout(activate, ACTIVATION_HOLD_MS),
        };
        document.addEventListener("pointermove", onPendingMove);
        document.addEventListener("pointerup", clearPending);
        document.addEventListener("pointercancel", clearPending);
    }

    // ── the pointer path ────────────────────────────────────────────────────────
    function onPointerMove(event: PointerEvent): void {
        const id = dragId.value;
        if (id === null || mode !== "pointer" || event.pointerId !== pointerId) return;
        sampler.push(event.clientX, event.clientY);
        if (ghost) {
            ghost.follow(event.clientX - grabX, event.clientY - grabY);
            ghost.tilt(sampler.velocity().x);
        }

        const foreign = findForeignTarget(deps.handle, event.clientX, event.clientY);
        if (foreign) {
            const foreignRects = snapshotRows(
                foreign.getElements(),
                foreign.getItems().map((item) => foreign.getId(item)),
            );
            propose(resolveBoundary(foreignRects, event.clientY), foreign);
            return;
        }

        if (!rects) return;
        const sourceIndex = findIndex(id);
        const boundary = resolveBoundary(rects, event.clientY);
        propose(boundary > sourceIndex ? boundary - 1 : boundary, null);
    }

    function onPointerUp(event: PointerEvent): void {
        if (event.pointerId !== pointerId) return;
        commit();
    }

    function onPointerCancel(event: PointerEvent): void {
        if (event.pointerId !== pointerId) return;
        cancel();
    }

    // ── the keyboard path ───────────────────────────────────────────────────────
    function onKeydown(id: SortableId, event: KeyboardEvent): void {
        const key = event.key;
        const isToggle = key === " " || key === "Enter";
        if (isToggle) {
            event.preventDefault();
            if (dragId.value === null) {
                if (begin(id, "keyboard") && sourceEl) {
                    // IN PLACE, no clone: a clone has no pointer to follow, so it would
                    // hang static while the rows part beneath it. Same material, same
                    // swell, one copy.
                    sourceEl.setAttribute(LIFTED_ATTR, "");
                    sourceEl.classList.add(FLOATING_CLASS);
                }
            } else if (dragId.value === id && mode === "keyboard") commit();
            return;
        }

        if (dragId.value !== id || mode !== "keyboard") return;
        if (key === "Escape") {
            event.preventDefault();
            cancel();
            return;
        }

        const current = proposal?.index ?? findIndex(id);
        let next = current;
        if (key === "ArrowUp" || key === "ArrowLeft") next -= 1;
        else if (key === "ArrowDown" || key === "ArrowRight") next += 1;
        else if (key === "Home") next = 0;
        else if (key === "End") next = deps.getItems().length - 1;
        else return;

        event.preventDefault();
        propose(next, null, true);
    }

    return {
        dragId,
        dropIndex,
        beginPointer,
        onKeydown,
        partForExternal,
        vacancyOrigin,
        cancel,
        dispose,
    };
}
