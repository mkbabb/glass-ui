// The click family: reka's DropdownMenu primitives. Imported by `DropdownMenu.vue` only.
import {
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
    injectDropdownMenuRootContext,
} from "reka-ui";
import type { MenuFamily } from "./context";

export const CLICK_MENU_FAMILY: MenuFamily = {
    trigger: "click",
    parts: {
        Trigger: DropdownMenuTrigger,
        Portal: DropdownMenuPortal,
        Content: DropdownMenuContent,
        Item: DropdownMenuItem,
        CheckboxItem: DropdownMenuCheckboxItem,
        RadioItem: DropdownMenuRadioItem,
        RadioGroup: DropdownMenuRadioGroup,
        Group: DropdownMenuGroup,
        Separator: DropdownMenuSeparator,
        Label: DropdownMenuLabel,
        Sub: DropdownMenuSub,
        SubTrigger: DropdownMenuSubTrigger,
        SubContent: DropdownMenuSubContent,
        ItemIndicator: DropdownMenuItemIndicator,
    },
    injectRoot: () => injectDropdownMenuRootContext(null),
};
