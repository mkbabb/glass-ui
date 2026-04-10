/**
 * Shared provide/inject key for the <SortableList> hierarchy.
 *
 * Lives in its own module so SortableItem + SortableHandle can
 * both import the symbol without triggering a component cycle
 * through their .vue files.
 */
import type { InjectionKey } from "vue";
import type { UseSortableReturn } from "../../../composables/sortable";

export const SORTABLE_CONTEXT: InjectionKey<UseSortableReturn> =
    Symbol("glass-ui:sortable");
