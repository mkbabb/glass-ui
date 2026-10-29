// The context family: reka's ContextMenu primitives. Imported by `ContextMenu.vue` only.
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
    injectContextMenuRootContext,
} from "reka-ui";
import type { MenuFamily } from "./context";

export const CONTEXT_MENU_FAMILY: MenuFamily = {
    trigger: "context",
    parts: {
        Trigger: ContextMenuTrigger,
        Portal: ContextMenuPortal,
        Content: ContextMenuContent,
        Item: ContextMenuItem,
        CheckboxItem: ContextMenuCheckboxItem,
        RadioItem: ContextMenuRadioItem,
        RadioGroup: ContextMenuRadioGroup,
        Group: ContextMenuGroup,
        Separator: ContextMenuSeparator,
        Label: ContextMenuLabel,
        Sub: ContextMenuSub,
        SubTrigger: ContextMenuSubTrigger,
        SubContent: ContextMenuSubContent,
        ItemIndicator: ContextMenuItemIndicator,
    },
    injectRoot: () => injectContextMenuRootContext(null),
};
