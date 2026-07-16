import type {
    AccordionContentProps,
    AccordionEmits,
    AccordionItemProps,
    AccordionProps,
    AccordionTriggerProps,
    AccordionValue,
} from "@glass/components/accordion";
import type {
    Collapsible,
    CollapsibleContentProps,
    CollapsibleProps,
    CollapsibleTriggerProps,
} from "@glass/components/collapsible";

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

type AccordionContract = [
    Assert<Equal<AccordionValue<"single">, string | undefined>>,
    Assert<Equal<AccordionValue<"multiple">, string[]>>,
    Assert<Equal<AccordionProps["type"], "single" | "multiple">>,
    Assert<Has<"modelValue", AccordionProps>>,
    Assert<Has<"defaultValue", AccordionProps>>,
    Assert<Has<"collapsible", AccordionProps>>,
    Assert<Has<"disabled", AccordionProps>>,
    Assert<Lacks<"as", AccordionProps>>,
    Assert<Lacks<"asChild", AccordionProps>>,
    Assert<Lacks<"orientation", AccordionProps>>,
    Assert<Lacks<"dir", AccordionProps>>,
    Assert<Lacks<"unmountOnHide", AccordionProps>>,
    Assert<Has<"update:modelValue", AccordionEmits<"single">>>,
    Assert<Equal<AccordionEmits<"multiple">["update:modelValue"][0], string[]>>,
];

type AccordionPartContracts = [
    Assert<Equal<AccordionItemProps["value"], string>>,
    Assert<Has<"disabled", AccordionItemProps>>,
    Assert<Lacks<"as", AccordionItemProps>>,
    Assert<Lacks<"asChild", AccordionItemProps>>,
    Assert<Lacks<"unmountOnHide", AccordionItemProps>>,
    Assert<Lacks<"as", AccordionTriggerProps>>,
    Assert<Lacks<"asChild", AccordionTriggerProps>>,
    Assert<Has<"forceMount", AccordionContentProps>>,
    Assert<Lacks<"as", AccordionContentProps>>,
    Assert<Lacks<"asChild", AccordionContentProps>>,
];

type CollapsibleContract = [
    Assert<Has<"open", CollapsibleProps>>,
    Assert<Has<"defaultOpen", CollapsibleProps>>,
    Assert<Has<"disabled", CollapsibleProps>>,
    Assert<Lacks<"as", CollapsibleProps>>,
    Assert<Lacks<"asChild", CollapsibleProps>>,
    Assert<Lacks<"unmountOnHide", CollapsibleProps>>,
    Assert<Has<"onUpdate:open", InstanceType<typeof Collapsible>["$props"]>>,
    Assert<Has<"asChild", CollapsibleTriggerProps>>,
    Assert<Lacks<"as", CollapsibleTriggerProps>>,
    Assert<Has<"forceMount", CollapsibleContentProps>>,
    Assert<Lacks<"as", CollapsibleContentProps>>,
    Assert<Lacks<"asChild", CollapsibleContentProps>>,
];

export type DisclosurePublicContracts = [
    AccordionContract,
    AccordionPartContracts,
    CollapsibleContract,
];
