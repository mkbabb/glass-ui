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
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "reka-ui";

/** How the menu is anchored. */
export type MenuTrigger = "click" | "context";

const MENU_TRIGGER_KEY: InjectionKey<Ref<MenuTrigger>> = Symbol("glass-menu-trigger");

export function provideMenuTrigger(trigger: Ref<MenuTrigger>): void {
    provide(MENU_TRIGGER_KEY, trigger);
}

export function useMenuTrigger(): Ref<MenuTrigger> {
    const trigger = inject(MENU_TRIGGER_KEY, null);
    if (!trigger) {
        throw new Error("DropdownMenu parts must be used within DropdownMenu");
    }
    return trigger;
}

// Reka exposes separate click and context primitives. Each public part selects the
// matching primitive while the public Glass family stays singular.
export type MenuPart =
    | "Trigger"
    | "Portal"
    | "Content"
    | "Item"
    | "CheckboxItem"
    | "RadioItem"
    | "RadioGroup"
    | "Group"
    | "Separator"
    | "Label"
    | "Sub"
    | "SubTrigger"
    | "SubContent"
    | "ItemIndicator";

const PART_PAIRS: Record<MenuPart, readonly [Component, Component]> = {
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

export function useMenuPart(part: MenuPart): ComputedRef<unknown> {
    const trigger = useMenuTrigger();
    return computed(() => PART_PAIRS[part][trigger.value === "context" ? 1 : 0]);
}
