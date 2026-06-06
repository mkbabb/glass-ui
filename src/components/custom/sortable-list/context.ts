/**
 * Shared provide/inject key + paired helpers for the <SortableList> hierarchy.
 *
 * Lives in its own module so SortableItem + SortableHandle can
 * both import the symbol without triggering a component cycle
 * through their .vue files.
 *
 * P.W2 Lane B — canonical typed-key + helper-pair DI shape per
 * invariant 25. Strict-only by intent: <SortableItem> is meaningless
 * without a parent <SortableList>, so an optional counterpart would
 * be invalid per Pδ §2.2 + invariant 25's "per intent" clause.
 *
 * Paired helpers:
 *  - `provideSortableContext(sortable)` — wraps the raw provide call.
 *  - `useSortableContext()` — strict; throws when used outside <SortableList>.
 *
 * No `useOptionalSortableContext()` is shipped — a <SortableItem>
 * rendered outside a <SortableList> has no registration target and
 * cannot function. The optional helper would be dead code.
 */
import type { UseSortableReturn } from "../../../composables/sortable";
import { createStrictContext } from "../../../composables/context";

// Strict-only (AV.W14): no `useOptionalSortableContext` is exported — a
// `<SortableItem>` outside a `<SortableList>` is meaningless (invariant 25's
// "per intent" clause). The factory's `useOptional` over this key is left
// unexported by design.
const ctx = createStrictContext<UseSortableReturn>(
    "glass-ui:sortable",
    "[glass-ui:sortable] <SortableItem> must be used inside <SortableList>",
);

export const SORTABLE_CONTEXT = ctx.KEY;

export function provideSortableContext(sortable: UseSortableReturn): void {
    ctx.provide(sortable);
}

/** Strict — throws when used outside `<SortableList>`. */
export const useSortableContext = ctx.use;
