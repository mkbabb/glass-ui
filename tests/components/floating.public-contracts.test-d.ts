import type {
    Popover,
    PopoverContent,
    PopoverContentProps,
    PopoverProps,
    PopoverTriggerMode,
    PopoverTriggerProps,
} from "@glass/components/popover";
import type {
    Tooltip,
    TooltipContent,
    TooltipContentProps,
    TooltipProps,
    TooltipProviderProps,
    TooltipTriggerProps,
} from "@glass/components/tooltip";

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

type PopoverContract = [
    Assert<Equal<PopoverTriggerMode, "click" | "hover">>,
    Assert<Has<"open", PopoverProps>>,
    Assert<Has<"defaultOpen", PopoverProps>>,
    Assert<Has<"openDelay", PopoverProps>>,
    Assert<Has<"closeDelay", PopoverProps>>,
    Assert<Has<"keepDockOpen", PopoverProps>>,
    Assert<Lacks<"modal", PopoverProps>>,
    Assert<Has<"onUpdate:open", InstanceType<typeof Popover>["$props"]>>,
    Assert<Has<"asChild", PopoverTriggerProps>>,
    Assert<Lacks<"as", PopoverTriggerProps>>,
    Assert<Lacks<"reference", PopoverTriggerProps>>,
];

type PopoverContentContract = [
    Assert<Has<"side", PopoverContentProps>>,
    Assert<Has<"sideOffset", PopoverContentProps>>,
    Assert<Has<"align", PopoverContentProps>>,
    Assert<Has<"alignOffset", PopoverContentProps>>,
    Assert<Has<"portal", PopoverContentProps>>,
    Assert<Has<"surface", PopoverContentProps>>,
    Assert<Lacks<"role", PopoverContentProps>>,
    Assert<Has<"ariaLabel", PopoverContentProps>>,
    Assert<Lacks<"as", PopoverContentProps>>,
    Assert<Lacks<"asChild", PopoverContentProps>>,
    Assert<Lacks<"forceMount", PopoverContentProps>>,
    Assert<Lacks<"collisionBoundary", PopoverContentProps>>,
    Assert<Lacks<"sticky", PopoverContentProps>>,
    Assert<Has<"onEscapeKeyDown", InstanceType<typeof PopoverContent>["$props"]>>,
    Assert<Has<"onPointerDownOutside", InstanceType<typeof PopoverContent>["$props"]>>,
    Assert<Has<"onOpenAutoFocus", InstanceType<typeof PopoverContent>["$props"]>>,
    Assert<Has<"onCloseAutoFocus", InstanceType<typeof PopoverContent>["$props"]>>,
];

type TooltipContract = [
    Assert<Has<"open", TooltipProps>>,
    Assert<Has<"defaultOpen", TooltipProps>>,
    Assert<Has<"delayDuration", TooltipProps>>,
    Assert<Has<"disabled", TooltipProps>>,
    Assert<Lacks<"disableHoverableContent", TooltipProps>>,
    Assert<Lacks<"disableClosingTrigger", TooltipProps>>,
    Assert<Lacks<"ignoreNonKeyboardFocus", TooltipProps>>,
    Assert<Has<"onUpdate:open", InstanceType<typeof Tooltip>["$props"]>>,
    Assert<Has<"delayDuration", TooltipProviderProps>>,
    Assert<Has<"skipDelayDuration", TooltipProviderProps>>,
    Assert<Lacks<"content", TooltipProviderProps>>,
    Assert<Lacks<"disabled", TooltipProviderProps>>,
    Assert<Has<"asChild", TooltipTriggerProps>>,
    Assert<Lacks<"as", TooltipTriggerProps>>,
    Assert<Lacks<"reference", TooltipTriggerProps>>,
];

type TooltipContentContract = [
    Assert<Has<"side", TooltipContentProps>>,
    Assert<Has<"sideOffset", TooltipContentProps>>,
    Assert<Has<"align", TooltipContentProps>>,
    Assert<Has<"alignOffset", TooltipContentProps>>,
    Assert<Has<"surface", TooltipContentProps>>,
    Assert<Has<"ariaLabel", TooltipContentProps>>,
    Assert<Lacks<"as", TooltipContentProps>>,
    Assert<Lacks<"asChild", TooltipContentProps>>,
    Assert<Lacks<"forceMount", TooltipContentProps>>,
    Assert<Lacks<"collisionBoundary", TooltipContentProps>>,
    Assert<Has<"onEscapeKeyDown", InstanceType<typeof TooltipContent>["$props"]>>,
    Assert<Has<"onPointerDownOutside", InstanceType<typeof TooltipContent>["$props"]>>,
];

export type FloatingPublicContracts = [
    PopoverContract,
    PopoverContentContract,
    TooltipContract,
    TooltipContentContract,
];
