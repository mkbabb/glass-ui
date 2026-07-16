import type {
    AcceptableValue as RekaAcceptableValue,
    AsTag as RekaAsTag,
    CheckboxCheckedState as RekaCheckedState,
    DataOrientation as RekaOrientation,
    FocusOutsideEvent as RekaFocusOutsideEvent,
    FormFieldProps as RekaFormFieldProps,
    ListboxItemSelectEvent as RekaListboxItemSelectEvent,
    PointerDownOutsideEvent as RekaPointerDownOutsideEvent,
    PrimitiveProps as RekaPrimitiveProps,
    SingleOrMultipleType as RekaSingleOrMultipleType,
} from "reka-ui";
import type { BasicColorSchema } from "@vueuse/core";
import type { Orientation } from "@glass/components/_shared/axes";
import type {
    FocusOutsideEvent,
    ListboxItemSelectEvent,
    PointerDownOutsideEvent,
} from "@glass/components/_shared/interaction";
import type {
    AsTag,
    FormFieldProps,
    PrimitiveProps,
} from "@glass/components/_shared/primitive";
import type {
    CheckedState,
    SelectionMode,
    SelectionValue,
} from "@glass/components/_shared/selection";
import type { GlobalColorSchema } from "@glass/composables/dark";

type Assignable<From, To> = [From] extends [To] ? true : false;
type Equivalent<Left, Right> =
    Assignable<Left, Right> extends true ? Assignable<Right, Left> : false;
type Assert<Condition extends true> = Condition;

type PrimitiveContracts = [
    Assert<Assignable<AsTag, RekaAsTag>>,
    Assert<Assignable<PrimitiveProps, RekaPrimitiveProps>>,
    Assert<Assignable<FormFieldProps, RekaFormFieldProps>>,
];

type SelectionContracts = [
    Assert<Assignable<SelectionValue, RekaAcceptableValue>>,
    Assert<Equivalent<CheckedState, RekaCheckedState>>,
    Assert<Equivalent<SelectionMode, RekaSingleOrMultipleType>>,
    Assert<Equivalent<Orientation, RekaOrientation>>,
];

type InteractionContracts = [
    Assert<Equivalent<PointerDownOutsideEvent, RekaPointerDownOutsideEvent>>,
    Assert<Equivalent<FocusOutsideEvent, RekaFocusOutsideEvent>>,
    Assert<
        Equivalent<ListboxItemSelectEvent, RekaListboxItemSelectEvent<SelectionValue>>
    >,
];

type DarkContract = Assert<Equivalent<GlobalColorSchema, BasicColorSchema>>;

export type PublicContractParity = [
    PrimitiveContracts,
    SelectionContracts,
    InteractionContracts,
    DarkContract,
];
