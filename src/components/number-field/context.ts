import type { AriaAttributes, ComputedRef, InjectionKey } from "vue";

export interface NumberFieldContext {
    ariaInvalid: ComputedRef<AriaAttributes["aria-invalid"]>;
    required: ComputedRef<boolean>;
}

export const numberFieldContextKey: InjectionKey<NumberFieldContext> = Symbol(
    "glass-ui-number-field",
);
