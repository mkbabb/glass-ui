import type { AriaAttributes, ComputedRef, InjectionKey } from "vue";
import type { ControlSize } from "../_shared/control";

export interface NumberFieldContext {
    ariaInvalid: ComputedRef<AriaAttributes["aria-invalid"]>;
    required: ComputedRef<boolean>;
    /** The one size rung, threaded to the input AND the steppers so the stepper
     *  box and the field height cannot disagree. */
    size: ComputedRef<ControlSize>;
}

export const numberFieldContextKey: InjectionKey<NumberFieldContext> = Symbol(
    "glass-ui-number-field",
);
