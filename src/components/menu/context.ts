import {
    inject,
    provide,
    type Component,
    type InjectionKey,
    type Ref,
} from "vue";

/** How the menu is anchored: a button (`DropdownMenu`) or a region (`ContextMenu`). */
export type MenuTrigger = "click" | "context";

// Reka exposes separate click and context primitives. The public parts are one family;
// each root provides the table of its own primitives, so a part imports neither family
// and a page that renders only `DropdownMenu` never bundles reka's ContextMenu.
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

/** The live root state a part needs: open, modal, and the root's own close channel. */
export interface MenuRootState {
    readonly open: Readonly<Ref<boolean>>;
    readonly modal: Readonly<Ref<boolean>>;
    onOpenChange: (open: boolean) => void;
}

/** One reka menu family: its anchoring, its primitives, and its root-context reader. */
export interface MenuFamily {
    readonly trigger: MenuTrigger;
    readonly parts: Readonly<Record<MenuPart, Component>>;
    /** Read the reka root context. Call it in a part's setup, inside the root. */
    readonly injectRoot: () => MenuRootState | null;
}

const MENU_FAMILY_KEY: InjectionKey<MenuFamily> = Symbol("glass-menu-family");

export function provideMenuFamily(family: MenuFamily): void {
    provide(MENU_FAMILY_KEY, family);
}

export function useMenuFamily(): MenuFamily {
    const family = inject(MENU_FAMILY_KEY, null);
    if (!family) {
        throw new Error("Menu parts must be used within DropdownMenu or ContextMenu");
    }
    return family;
}

export function useMenuPart(part: MenuPart): Component {
    return useMenuFamily().parts[part];
}
