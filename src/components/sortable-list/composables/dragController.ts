import { shallowRef, type ShallowRef } from "vue";

import { findForeignTarget, resolveDropIndexIn } from "./dropResolver";
import type { GhostRenderer } from "./ghostRenderer";
import { acquirePointerCapture } from "./touchGate";
import { SOURCE_DRAGGING_CLASS } from "./transitionTiming";
import type { InstanceHandle, SortableId } from "./types";

type InputMode = "keyboard" | "pointer";

interface Proposal {
    /** Final same-list position, or insertion position for a foreign list. */
    index: number;
    target: InstanceHandle | null;
}

export interface DragControllerDeps {
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    getLabel: (item: unknown) => string;
    elements: Map<SortableId, Element | null>;
    handle: InstanceHandle;
    onReorder: (next: unknown[]) => void;
    horizontal: boolean;
    ghost: GhostRenderer;
    announce: (message: string) => void;
    focusItem: (id: SortableId) => void;
}

export interface DragController {
    dragId: ShallowRef<SortableId | null>;
    pos: ShallowRef<{ x: number; y: number } | null>;
    dropIndex: ShallowRef<number | null>;
    pointerCaptureActive: ShallowRef<boolean>;
    beginPointer: (id: SortableId, event: PointerEvent) => void;
    onKeydown: (id: SortableId, event: KeyboardEvent) => void;
    cancel: () => void;
    dispose: () => void;
}

export function createDragController(deps: DragControllerDeps): DragController {
    const dragId = shallowRef<SortableId | null>(null);
    const pos = shallowRef<{ x: number; y: number } | null>(null);
    const dropIndex = shallowRef<number | null>(null);
    const pointerCaptureActive = shallowRef(true);

    let mode: InputMode | null = null;
    let proposal: Proposal | null = null;
    let sourceEl: HTMLElement | null = null;
    let pointerId: number | null = null;

    function findIndex(id: SortableId): number {
        return deps.getItems().findIndex((item) => deps.getId(item) === id);
    }

    function itemLabel(id: SortableId): string {
        const item = deps.getItems().find((candidate) => deps.getId(candidate) === id);
        return item === undefined ? String(id) : deps.getLabel(item);
    }

    function begin(id: SortableId, input: InputMode): boolean {
        if (dragId.value !== null) return false;
        const index = findIndex(id);
        const element = deps.elements.get(id);
        if (index < 0 || !(element instanceof HTMLElement)) return false;

        dragId.value = id;
        mode = input;
        proposal = { index, target: null };
        dropIndex.value = index;
        sourceEl = element;
        sourceEl.classList.add(SOURCE_DRAGGING_CLASS);
        deps.announce(`Lifted ${itemLabel(id)}, position ${index + 1} of ${deps.getItems().length}.`);
        return true;
    }

    function propose(index: number, target: InstanceHandle | null, speak = false): void {
        const id = dragId.value;
        if (id === null) return;

        if (proposal?.target && proposal.target !== target) {
            proposal.target.setExternalDropIndex(null);
        }

        const size = target ? target.getItems().length + 1 : deps.getItems().length;
        const max = Math.max(0, size - 1);
        const next = Math.min(Math.max(index, 0), max);
        proposal = { index: next, target };

        if (target) {
            target.setExternalDropIndex(next);
            dropIndex.value = null;
        } else {
            dropIndex.value = next;
        }

        if (speak) {
            deps.announce(`${itemLabel(id)}, proposed position ${next + 1} of ${size}.`);
        }
    }

    function cleanup(): void {
        proposal?.target?.setExternalDropIndex(null);
        deps.ghost.destroyGhost();
        sourceEl?.classList.remove(SOURCE_DRAGGING_CLASS);
        sourceEl = null;
        pointerId = null;
        dragId.value = null;
        pos.value = null;
        dropIndex.value = null;
        mode = null;
        proposal = null;
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerCancel);
    }

    function commit(): void {
        const id = dragId.value;
        const nextProposal = proposal;
        if (id === null || nextProposal === null) return;

        const list = deps.getItems();
        const sourceIndex = list.findIndex((item) => deps.getId(item) === id);
        if (sourceIndex < 0) {
            cleanup();
            return;
        }

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
        const id = dragId.value;
        if (id === null) return;
        const index = findIndex(id);
        const label = itemLabel(id);
        cleanup();
        deps.announce(`Cancelled moving ${label}. Position ${index + 1} of ${deps.getItems().length}.`);
        deps.focusItem(id);
    }

    function dispose(): void {
        if (dragId.value !== null) cleanup();
    }

    function beginPointer(id: SortableId, event: PointerEvent): void {
        if (!begin(id, "pointer")) return;
        pointerId = event.pointerId;
        pos.value = { x: event.clientX, y: event.clientY };
        sourceEl && deps.ghost.createGhost(sourceEl, event.clientX, event.clientY);
        pointerCaptureActive.value = acquirePointerCapture(
            event.currentTarget as Element | null,
            event.pointerId,
        );
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUp);
        document.addEventListener("pointercancel", onPointerCancel);
    }

    function onPointerMove(event: PointerEvent): void {
        const id = dragId.value;
        if (id === null || mode !== "pointer" || event.pointerId !== pointerId) return;
        pos.value = { x: event.clientX, y: event.clientY };
        deps.ghost.updateGhost(event.clientX, event.clientY);

        const foreign = findForeignTarget(deps.handle, event.clientX, event.clientY);
        if (foreign) {
            const index = resolveDropIndexIn(
                foreign.getElements(),
                foreign.getItems().map((item) => ({ id: foreign.getId(item) })),
                event.clientX,
                event.clientY,
                deps.horizontal,
            );
            propose(index, foreign);
            return;
        }

        const list = deps.getItems();
        const sourceIndex = findIndex(id);
        const boundary = resolveDropIndexIn(
            deps.elements,
            list.map((item) => ({ id: deps.getId(item) })),
            event.clientX,
            event.clientY,
            deps.horizontal,
        );
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

    function onKeydown(id: SortableId, event: KeyboardEvent): void {
        const key = event.key;
        const isToggle = key === " " || key === "Enter";
        if (isToggle) {
            event.preventDefault();
            if (dragId.value === null) begin(id, "keyboard");
            else if (dragId.value === id && mode === "keyboard") commit();
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
        pos,
        dropIndex,
        pointerCaptureActive,
        beginPointer,
        onKeydown,
        cancel,
        dispose,
    };
}
