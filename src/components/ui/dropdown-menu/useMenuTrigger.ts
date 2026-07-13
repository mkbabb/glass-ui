// useMenuTrigger — the Menu family's `trigger` axis seam (BI.W-MENU-TRIGGER).
//
// ContextMenu FOLDS onto the Menu family as a `trigger` axis value: `trigger="click"`
// (the default — a button-anchored dropdown) vs `trigger="context"` (right-click /
// long-press anchoring). Both share ONE menu engine — reka's roving-focus + typeahead +
// the shared `menuItemVariants` rows are identical across the DropdownMenu and
// ContextMenu families; only the ANCHORING primitive differs. reka does not publish a
// generic `Menu*` base, so each glass-ui menu part reactively renders the correct reka
// primitive from the injected trigger. The root PROVIDES the trigger; every sub-part
// INJECTS it via `useMenuPart(part)` and renders the paired reka component. Clean break:
// the ContextMenu NAME is retired (no alias) — the reka context substrate stays.

import {
    computed,
    inject,
    provide,
    type ComputedRef,
    type InjectionKey,
    type Component,
    type Ref,
} from "vue";
import {
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuItemIndicator,
    ContextMenuLabel,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuRoot,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuItemIndicator,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuRoot,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "reka-ui";

/** The Menu trigger axis — the sealed Kronecker fold of ContextMenu onto Menu. A
 *  subset of the grammar `TRIGGERS` tuple (`click | hover | context`): a menu has no
 *  hover-open register (that is the Popover overlay fold), so it carries click|context. */
export type MenuTrigger = "click" | "context";

const MENU_TRIGGER_KEY: InjectionKey<Ref<MenuTrigger>> = Symbol("glass-menu-trigger");

/** The root calls this once with its `trigger` ref so every descendant part resolves
 *  the correct reka family. */
export function provideMenuTrigger(trigger: Ref<MenuTrigger>): void {
    provide(MENU_TRIGGER_KEY, trigger);
}

// The default (no ancestor Menu root) is the click register — a bare part outside a
// Menu root is a misuse, but it resolves to the DropdownMenu family rather than throwing.
const DEFAULT_TRIGGER: Ref<MenuTrigger> = computed(() => "click" as MenuTrigger);

/** The trigger ref for the nearest Menu root (defaults to `click`). */
export function useMenuTrigger(): Ref<MenuTrigger> {
    return inject(MENU_TRIGGER_KEY, DEFAULT_TRIGGER);
}

// Every menu PART → its [click reka, context reka] pairing. ONE menu engine, two
// anchoring families; the trigger switches the family, never the roving-focus/typeahead.
// Annotated as Component pairs — the inferred reka prop generics are non-portable in
// declaration emit (TS2883); useMenuPart returns an opaque component either way.
const PART_PAIRS: Record<string, readonly [Component, Component]> = {
    Root: [DropdownMenuRoot, ContextMenuRoot],
    Trigger: [DropdownMenuTrigger, ContextMenuTrigger],
    Portal: [DropdownMenuPortal, ContextMenuPortal],
    Content: [DropdownMenuContent, ContextMenuContent],
    Item: [DropdownMenuItem, ContextMenuItem],
    CheckboxItem: [DropdownMenuCheckboxItem, ContextMenuCheckboxItem],
    RadioItem: [DropdownMenuRadioItem, ContextMenuRadioItem],
    RadioGroup: [DropdownMenuRadioGroup, ContextMenuRadioGroup],
    Group: [DropdownMenuGroup, ContextMenuGroup],
    Separator: [DropdownMenuSeparator, ContextMenuSeparator],
    Label: [DropdownMenuLabel, ContextMenuLabel],
    Sub: [DropdownMenuSub, ContextMenuSub],
    SubTrigger: [DropdownMenuSubTrigger, ContextMenuSubTrigger],
    SubContent: [DropdownMenuSubContent, ContextMenuSubContent],
    ItemIndicator: [DropdownMenuItemIndicator, ContextMenuItemIndicator],
};

/** The menu part names (the PART_PAIRS keys — annotated union, portable in d.ts). */
export type MenuPart =
    | "Root" | "Trigger" | "Portal" | "Content" | "Item" | "CheckboxItem"
    | "RadioItem" | "RadioGroup" | "Group" | "Separator" | "Label"
    | "Sub" | "SubTrigger" | "SubContent" | "ItemIndicator";

/** The reka component for `part`, reactive to the injected trigger. */
export function useMenuPart(part: MenuPart): ComputedRef<unknown> {
    const trigger = useMenuTrigger();
    return computed(() => PART_PAIRS[part][trigger.value === "context" ? 1 : 0]);
}
