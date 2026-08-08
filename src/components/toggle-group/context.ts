import type { ComputedRef } from "vue";
import { createOptionalContext } from "../../composables/context";
import type { SelectionValue } from "../_shared/selection";

/* The ITEM REGISTRY — the price of engine adoption, paid once (BK #84 W-TOGGLE-ROW).
 *
 * `useSelectionGroup` wants `options` and `buttonRefs` index-aligned, both
 * non-optional. A slot-projected compound has neither: the group never sees its
 * items as data, only as vnodes. So each item publishes itself here on mount and
 * withdraws on unmount, and the group derives both arrays from the registry in DOM
 * order. That is the whole reason this file exists — it used to be a variant/size
 * relay for two axes that this cut deleted, and the name it carried
 * (`toggleGroupContext.ts`) restated its own directory (DAG-RULINGS:275).
 *
 * DOM order, not registration order: `onMounted` fires child-first and a group whose
 * items are wrapped, conditional, or projected from more than one parent can mount
 * out of visual order. Arrow keys that walk a different sequence than the eye reads
 * are the defect that would follow, so the group sorts by `compareDocumentPosition`
 * and never trusts the order it was handed. */

/** What an item publishes to its group. The element is the roving/recenter target. */
export interface ToggleItemEntry {
    /** The item's stable identity — the library's ONE scalar (never narrowed here). */
    readonly value: SelectionValue;
    /** Read live: an item may become disabled after it registers. */
    readonly disabled: () => boolean;
    /** The item's host button, or `null` before mount / after unmount. */
    el: HTMLElement | null;
}

/** What the group publishes back — every per-item answer, none of it re-derived. */
export interface ToggleGroupContext {
    register: (entry: ToggleItemEntry) => void;
    unregister: (entry: ToggleItemEntry) => void;
    /** `true` when the item's value is in the model (one for `single`, N for `multiple`). */
    isSelected: (value: SelectionValue) => boolean;
    /** Role-per-mode ARIA from the engine — `radio`/`aria-checked` or `aria-pressed`. */
    itemAttrs: (value: SelectionValue) => Record<string, string>;
    /** The roving tabindex: exactly one `0` in the group, `-1` everywhere else. */
    tabindex: (entry: ToggleItemEntry) => number;
    /** Commit — the engine's ONE selection path (model write + recenter). */
    select: (entry: ToggleItemEntry) => void;
    /** The group's disabled axis, so an item need not read two sources. */
    disabled: ComputedRef<boolean>;
}

const ctx = createOptionalContext<ToggleGroupContext>("glass-ui:toggle-group");

export function provideToggleGroupContext(context: ToggleGroupContext): void {
    ctx.provide(context);
}

export const useOptionalToggleGroupContext = ctx.use;
