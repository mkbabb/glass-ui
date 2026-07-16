import type {
    Combobox,
    ComboboxInputProps,
    ComboboxItemProps,
    ComboboxListProps,
    ComboboxModelValue,
    ComboboxProps,
    ComboboxTriggerProps,
    ComboboxValue,
} from "@glass/components/combobox";
import type {
    Command,
    CommandDialogProps,
    CommandListProps,
    CommandProps,
} from "@glass/components/command";

type Assert<Condition extends true> = Condition;
type Equal<Left, Right> =
    (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right
        ? 1
        : 2
        ? true
        : false;
type Has<Key extends PropertyKey, Shape> = Key extends keyof Shape ? true : false;
type Lacks<Key extends PropertyKey, Shape> = Has<Key, Shape> extends false
    ? true
    : false;

const single = {
    modelValue: null,
    defaultValue: "first",
} satisfies ComboboxProps;
const multiple = {
    multiple: true,
    modelValue: ["first", 2],
    defaultValue: [],
} satisfies ComboboxProps;
// @ts-expect-error array state requires the explicit multiple arm
const implicitMultiple = { modelValue: ["first"] } satisfies ComboboxProps;
// @ts-expect-error a multiple selection cannot contain the single empty state
const nullableMultiple = { multiple: true, modelValue: [null] } satisfies ComboboxProps;
// @ts-expect-error the explicit single arm cannot receive array state
const arraySingle = { multiple: false, modelValue: ["first"] } satisfies ComboboxProps;

const command = { modelValue: "open", open: true } satisfies CommandProps;
// @ts-expect-error Command is deliberately scalar; use Combobox multiple for arrays
const multipleCommand = { multiple: true } satisfies CommandProps;

type RootContracts = [
    Assert<Equal<ComboboxValue, string | number | null>>,
    Assert<
        Equal<
            ComboboxModelValue,
            string | number | null | Array<string | number>
        >
    >,
    Assert<Has<"modelValue", ComboboxProps>>,
    Assert<Has<"defaultValue", ComboboxProps>>,
    Assert<Has<"open", ComboboxProps>>,
    Assert<Lacks<"by", ComboboxProps>>,
    Assert<Lacks<"as", ComboboxProps>>,
    Assert<Lacks<"asChild", ComboboxProps>>,
    Assert<Lacks<"orientation", ComboboxProps>>,
    Assert<Has<"onUpdate:modelValue", InstanceType<typeof Combobox>["$props"]>>,
];

type PartContracts = [
    Assert<Has<"asChild", ComboboxTriggerProps>>,
    Assert<Has<"disabled", ComboboxTriggerProps>>,
    Assert<Lacks<"as", ComboboxTriggerProps>>,
    Assert<Has<"modelValue", ComboboxInputProps>>,
    Assert<Has<"placeholder", ComboboxInputProps>>,
    Assert<Lacks<"displayValue", ComboboxInputProps>>,
    Assert<Equal<ComboboxItemProps["value"], string | number>>,
    Assert<Lacks<"as", ComboboxItemProps>>,
    Assert<Has<"side", ComboboxListProps>>,
    Assert<Has<"align", ComboboxListProps>>,
    Assert<Lacks<"forceMount", ComboboxListProps>>,
    Assert<Lacks<"collisionBoundary", ComboboxListProps>>,
    Assert<Lacks<"hideWhenEmpty", ComboboxListProps>>,
];

type CommandContracts = [
    Assert<Equal<CommandProps["modelValue"], ComboboxValue | undefined>>,
    Assert<Has<"surface", CommandProps>>,
    Assert<Lacks<"multiple", CommandProps>>,
    Assert<Lacks<"by", CommandProps>>,
    Assert<Lacks<"searchTerm", CommandProps>>,
    Assert<Lacks<"as", CommandProps>>,
    Assert<Has<"open", CommandDialogProps>>,
    Assert<Has<"modal", CommandDialogProps>>,
    Assert<Lacks<"as", CommandDialogProps>>,
    Assert<Has<"surface", CommandListProps>>,
    Assert<Lacks<"position", CommandListProps>>,
    Assert<Has<"onUpdate:modelValue", InstanceType<typeof Command>["$props"]>>,
];

export type ComboboxCommandPublicContracts = [
    RootContracts,
    PartContracts,
    CommandContracts,
    typeof single,
    typeof multiple,
    typeof implicitMultiple,
    typeof nullableMultiple,
    typeof arraySingle,
    typeof command,
    typeof multipleCommand,
];
