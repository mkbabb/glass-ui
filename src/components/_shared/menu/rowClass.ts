/* The ONE menu-row class register — Select options, Command rows.
 *
 * THE LAW THIS FILE EXISTS TO KEEP: **no class token may ever sit inside an
 * interpolation.** Two complete literal strings, frozen, keyed by indicator —
 * never a base string spliced with `${…}`.
 *
 * The gutter (`ps-7`) had never painted in any consumer, and the mechanism was
 * this file's previous shape. Two independent scanners must see every token:
 *   · the DEMO's Tailwind content scan (`demo/demo.css`, `@source`), and
 *   · the LIBRARY's utility emitter (`vite.utility-emit.ts`), whose candidate
 *     tokenizer walks quoted runs with ONE character class for `"`, `'` and
 *     backtick — so the opening backtick of a template literal pairs with the
 *     next `"` and every subsequent pair desynchronizes. Tokens that fall in the
 *     GAPS between those mis-paired runs are never emitted.
 * A plain literal is reachable by both. An interpolated one is reachable by
 * neither reliably. Hence the frozen record: adding a row state means adding a
 * whole string, not splicing one.
 */
export type MenuRowIndicator = "none" | "start";

/* The two complete rows. The shared prefix is duplicated ON PURPOSE — the
 * duplication is the invariant, and `rowClass.test.ts` pins that neither string
 * is assembled. Inline pads ride the canonical space series (option pad 4/8);
 * the indicator arm reserves `ps-7` = 28px so the mark clears the label — the
 * gutter G2 measures. Logical properties (`ps`/`pe`), so an RTL listbox reserves
 * the gutter on the correct side. */
const MENU_ROW_CLASS: Readonly<Record<MenuRowIndicator, string>> = Object.freeze({
    none: "interactive-item glass-menu-row relative flex w-full cursor-default select-none items-center py-1 px-2 text-dropdown data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
    start: "interactive-item glass-menu-row relative flex w-full cursor-default select-none items-center py-1 ps-7 pe-2 text-dropdown data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none data-[disabled]:opacity-disabled",
});

export function rowClass(indicator: MenuRowIndicator = "none"): string {
    return MENU_ROW_CLASS[indicator];
}
