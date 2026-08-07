import type { ComputedRef, Ref } from "vue";

export type SortableId = string | number;

export interface SortableOptions<T> {
    items: Ref<readonly T[]> | ComputedRef<readonly T[]>;
    getId: (item: T) => SortableId;
    getLabel?: (item: T) => string;
    label?: string;
    onReorder: (next: T[]) => void;
    onInsert?: (index: number, item: unknown) => void;
    group?: string;
    handleSelector?: string | null;
}

export interface SortableRowBinding {
    ref: (el: unknown) => void;
    dataAttrs: Record<string, string>;
    disabled: ComputedRef<boolean>;
    onPointerdown: (event: PointerEvent) => void;
    onKeydown: (event: KeyboardEvent) => void;
    /** Release the row's registration — called from the row's unmount. */
    release: () => void;
}

export interface SortableContainerBinding {
    ref: (el: unknown) => void;
    dataAttrs: Record<string, string>;
}

export interface UseSortableReturn {
    registerItem: (id: SortableId, disabled?: () => boolean) => SortableRowBinding;
    container: SortableContainerBinding;
    isDragging: ComputedRef<boolean>;
    dragId: ComputedRef<SortableId | null>;
    dropIndex: ComputedRef<number | null>;
    announcement: ComputedRef<string>;
    getItemLabel: (id: SortableId) => string;
}

export interface InstanceHandle {
    group?: string;
    label: string;
    getContainer: () => Element | null;
    getItems: () => readonly unknown[];
    getId: (item: unknown) => SortableId;
    getElements: () => Map<SortableId, Element | null>;
    setExternalDropIndex: (index: number | null) => void;
    /** The travelling subject's block size, so a receiving list can size its vacancy. */
    setExternalSubjectBlock: (block: number | null) => void;
    /**
     * Where a subject arriving at `index` comes to rest, in viewport coordinates — the
     * endpoint of the release flight. The RECEIVER answers it because the receiver owns
     * the gap; the releasing list has already closed behind the subject. `null` while
     * this list is unarmed or unmounted.
     */
    getVacancyOrigin: (index: number) => { x: number; y: number } | null;
    acceptExternal: (index: number, item: unknown) => void;
    focusItem: (id: SortableId) => void;
}
