import type {
    Command,
    CommandDialogProps,
    CommandListProps,
    CommandProps,
} from "@glass/components/command";
import type { ComboboxValue } from "@glass/components/_shared/selection";

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

const command = { modelValue: "open", open: true } satisfies CommandProps;
// @ts-expect-error Command is deliberately scalar (no multi-select arm)
const multipleCommand = { multiple: true } satisfies CommandProps;

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

export type CommandPublicContracts = [
    CommandContracts,
    typeof command,
    typeof multipleCommand,
];
