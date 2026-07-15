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
    axis?: "x" | "y";
}

export interface SortableRowBinding {
    ref: (el: unknown) => void;
    dataAttrs: Record<string, string>;
    class: ComputedRef<Record<string, boolean>>;
    disabled: ComputedRef<boolean>;
    onPointerdown: (event: PointerEvent) => void;
    onKeydown: (event: KeyboardEvent) => void;
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
    dragPosition: ComputedRef<{ x: number; y: number } | null>;
    dropIndex: ComputedRef<number | null>;
    pointerCaptureActive: ComputedRef<boolean>;
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
    acceptExternal: (index: number, item: unknown) => void;
    focusItem: (id: SortableId) => void;
}
