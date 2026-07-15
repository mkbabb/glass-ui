import type { ComputedRef } from "vue";

import { createStrictContext } from "../../composables/context";
import type {
    SortableId,
    SortableRowBinding,
    UseSortableReturn,
} from "./composables/types";

const list = createStrictContext<UseSortableReturn>(
    "glass-ui:sortable-list",
    "[glass-ui] <SortableItem> must be used inside <SortableList>",
);

export const provideSortableContext = list.provide;
export const useSortableContext = list.use;

export interface SortableItemContext {
    id: SortableId;
    label: ComputedRef<string>;
    binding: SortableRowBinding;
}

const item = createStrictContext<SortableItemContext>(
    "glass-ui:sortable-item",
    "[glass-ui] <SortableHandle> must be used inside <SortableItem>",
);

export const provideSortableItemContext = item.provide;
export const useSortableItemContext = item.use;
