import type {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemProps,
    DropdownMenuContent,
    DropdownMenuContentProps,
    DropdownMenuGroupProps,
    DropdownMenuItem,
    DropdownMenuItemProps,
    DropdownMenuLabelProps,
    DropdownMenuProps,
    DropdownMenuRadioGroup,
    DropdownMenuRadioGroupProps,
    DropdownMenuRadioItem,
    DropdownMenuRadioItemProps,
    DropdownMenuSeparatorProps,
    DropdownMenuShortcutProps,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubContentProps,
    DropdownMenuSubProps,
    DropdownMenuSubTriggerProps,
    DropdownMenuTriggerAction,
    DropdownMenuTriggerProps,
    MenuTrigger,
} from "@glass/components/dropdown-menu";

type Assert<Condition extends true> = Condition;
type Equal<Left, Right> =
    (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right
        ? 1
        : 2
        ? true
        : false;
type Has<Key extends PropertyKey, Shape> = Key extends keyof Shape ? true : false;
type Lacks<Key extends PropertyKey, Shape> =
    Has<Key, Shape> extends false ? true : false;

const clickState = { open: true } satisfies DropdownMenuProps;
const contextState = { trigger: "context" } satisfies DropdownMenuProps;
// @ts-expect-error a context menu has no anchor before a native invocation
const controlledContext = { trigger: "context", open: true } satisfies DropdownMenuProps;
// @ts-expect-error an initially open context menu has no meaningful coordinates
const defaultOpenContext = { trigger: "context", defaultOpen: true } satisfies DropdownMenuProps;

type RootContract = [
    Assert<Equal<MenuTrigger, "click" | "context">>,
    Assert<Has<"open", DropdownMenuProps>>,
    Assert<Has<"defaultOpen", DropdownMenuProps>>,
    Assert<Has<"dir", DropdownMenuProps>>,
    Assert<Has<"modal", DropdownMenuProps>>,
    Assert<Has<"trigger", DropdownMenuProps>>,
    Assert<Lacks<"pressOpenDelay", DropdownMenuProps>>,
    Assert<Lacks<"as", DropdownMenuProps>>,
    Assert<Lacks<"asChild", DropdownMenuProps>>,
    Assert<Has<"onUpdate:open", InstanceType<typeof DropdownMenu>["$props"]>>,
];

type TriggerContract = [
    Assert<Equal<DropdownMenuTriggerAction, "click" | "pointerdown">>,
    Assert<Has<"asChild", DropdownMenuTriggerProps>>,
    Assert<Has<"disabled", DropdownMenuTriggerProps>>,
    Assert<Has<"action", DropdownMenuTriggerProps>>,
    Assert<Has<"class", DropdownMenuTriggerProps>>,
    Assert<Lacks<"as", DropdownMenuTriggerProps>>,
    Assert<Lacks<"reference", DropdownMenuTriggerProps>>,
];

type ContentContract = [
    Assert<Has<"side", DropdownMenuContentProps>>,
    Assert<Has<"sideOffset", DropdownMenuContentProps>>,
    Assert<Has<"align", DropdownMenuContentProps>>,
    Assert<Has<"alignOffset", DropdownMenuContentProps>>,
    Assert<Has<"surface", DropdownMenuContentProps>>,
    Assert<Has<"class", DropdownMenuContentProps>>,
    Assert<Lacks<"as", DropdownMenuContentProps>>,
    Assert<Lacks<"asChild", DropdownMenuContentProps>>,
    Assert<Lacks<"forceMount", DropdownMenuContentProps>>,
    Assert<Lacks<"collisionBoundary", DropdownMenuContentProps>>,
    Assert<Lacks<"loop", DropdownMenuContentProps>>,
    Assert<Lacks<"portal", DropdownMenuContentProps>>,
    Assert<Has<"onEscapeKeyDown", InstanceType<typeof DropdownMenuContent>["$props"]>>,
    Assert<
        Has<"onPointerDownOutside", InstanceType<typeof DropdownMenuContent>["$props"]>
    >,
    Assert<Has<"onFocusOutside", InstanceType<typeof DropdownMenuContent>["$props"]>>,
    Assert<
        Has<"onInteractOutside", InstanceType<typeof DropdownMenuContent>["$props"]>
    >,
    Assert<Has<"onCloseAutoFocus", InstanceType<typeof DropdownMenuContent>["$props"]>>,
];

type ItemContracts = [
    Assert<Has<"disabled", DropdownMenuItemProps>>,
    Assert<Has<"textValue", DropdownMenuItemProps>>,
    Assert<Has<"inset", DropdownMenuItemProps>>,
    Assert<Has<"class", DropdownMenuItemProps>>,
    Assert<Lacks<"as", DropdownMenuItemProps>>,
    Assert<Lacks<"asChild", DropdownMenuItemProps>>,
    Assert<Has<"onSelect", InstanceType<typeof DropdownMenuItem>["$props"]>>,
    Assert<
        Equal<
            NonNullable<DropdownMenuCheckboxItemProps["modelValue"]>,
            boolean | "indeterminate"
        >
    >,
    Assert<Has<"disabled", DropdownMenuCheckboxItemProps>>,
    Assert<Lacks<"as", DropdownMenuCheckboxItemProps>>,
    Assert<Lacks<"asChild", DropdownMenuCheckboxItemProps>>,
    Assert<Has<"onSelect", InstanceType<typeof DropdownMenuCheckboxItem>["$props"]>>,
    Assert<
        Has<
            "onUpdate:modelValue",
            InstanceType<typeof DropdownMenuCheckboxItem>["$props"]
        >
    >,
    Assert<
        Equal<NonNullable<DropdownMenuRadioGroupProps["modelValue"]>, string | number>
    >,
    Assert<
        Has<
            "onUpdate:modelValue",
            InstanceType<typeof DropdownMenuRadioGroup>["$props"]
        >
    >,
    Assert<Equal<DropdownMenuRadioItemProps["value"], string | number>>,
    Assert<Has<"disabled", DropdownMenuRadioItemProps>>,
    Assert<Lacks<"as", DropdownMenuRadioItemProps>>,
    Assert<Lacks<"asChild", DropdownMenuRadioItemProps>>,
    Assert<Has<"onSelect", InstanceType<typeof DropdownMenuRadioItem>["$props"]>>,
];

type FixedPartContracts = [
    Assert<Lacks<"as", DropdownMenuGroupProps>>,
    Assert<Lacks<"asChild", DropdownMenuGroupProps>>,
    Assert<Has<"inset", DropdownMenuLabelProps>>,
    Assert<Lacks<"as", DropdownMenuLabelProps>>,
    Assert<Lacks<"asChild", DropdownMenuLabelProps>>,
    Assert<Lacks<"as", DropdownMenuSeparatorProps>>,
    Assert<Lacks<"asChild", DropdownMenuSeparatorProps>>,
    Assert<Lacks<"as", DropdownMenuShortcutProps>>,
    Assert<Lacks<"asChild", DropdownMenuShortcutProps>>,
];

type SubmenuContracts = [
    Assert<Has<"open", DropdownMenuSubProps>>,
    Assert<Has<"defaultOpen", DropdownMenuSubProps>>,
    Assert<Lacks<"as", DropdownMenuSubProps>>,
    Assert<Has<"onUpdate:open", InstanceType<typeof DropdownMenuSub>["$props"]>>,
    Assert<Has<"disabled", DropdownMenuSubTriggerProps>>,
    Assert<Has<"textValue", DropdownMenuSubTriggerProps>>,
    Assert<Lacks<"as", DropdownMenuSubTriggerProps>>,
    Assert<Lacks<"asChild", DropdownMenuSubTriggerProps>>,
    Assert<Has<"sideOffset", DropdownMenuSubContentProps>>,
    Assert<Has<"alignOffset", DropdownMenuSubContentProps>>,
    Assert<Lacks<"as", DropdownMenuSubContentProps>>,
    Assert<Lacks<"asChild", DropdownMenuSubContentProps>>,
    Assert<Lacks<"forceMount", DropdownMenuSubContentProps>>,
    Assert<Lacks<"collisionBoundary", DropdownMenuSubContentProps>>,
    Assert<Lacks<"loop", DropdownMenuSubContentProps>>,
    Assert<
        Has<"onEscapeKeyDown", InstanceType<typeof DropdownMenuSubContent>["$props"]>
    >,
    Assert<
        Has<
            "onPointerDownOutside",
            InstanceType<typeof DropdownMenuSubContent>["$props"]
        >
    >,
    Assert<
        Has<"onOpenAutoFocus", InstanceType<typeof DropdownMenuSubContent>["$props"]>
    >,
    Assert<
        Has<"onCloseAutoFocus", InstanceType<typeof DropdownMenuSubContent>["$props"]>
    >,
    Assert<Has<"onEntryFocus", InstanceType<typeof DropdownMenuSubContent>["$props"]>>,
];

export type DropdownMenuPublicContracts = [
    RootContract,
    TriggerContract,
    ContentContract,
    ItemContracts,
    FixedPartContracts,
    SubmenuContracts,
    typeof clickState,
    typeof contextState,
    typeof controlledContext,
    typeof defaultOpenContext,
];
