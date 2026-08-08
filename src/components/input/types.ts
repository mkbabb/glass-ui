import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { ControlSize } from "../_shared/control";

/**
 * The native form/constraint surface — TYPED for the caller, and NOT a runtime
 * prop. The `/* @vue-ignore *\/` on the extends clause below is the whole
 * mechanism: `vue-tsc` sees these, `defineProps` does not, so every one of them
 * rides `$attrs` to the element and the component never re-binds a single one.
 *
 * What died with it: a 15-line `nativeProps` computed that re-declared these as
 * props and then hand-copied them back onto the element — an over-declaration
 * `inheritAttrs: false` forced into existence, and a list that had to be extended
 * by hand every time the platform was found to have an attribute nobody had
 * transcribed yet.
 *
 * The whole `InputHTMLAttributes` is deliberately NOT the base: its 225 members
 * blow the props union past `tsc`'s complexity bound (TS2590, measured) and drag
 * in `hidden`/`width`/`height` overloads that collide with `ComponentCustomProps`.
 * A text field's real native surface is this.
 */
export interface InputNativeAttrs {
    // A space-separated token list per the HTML spec ("shipping address-line1"),
    // not an enum — Vue's ~50-member literal union crossed with this file's other
    // unions is what pushes `defineProps` past `tsc`'s complexity bound (TS2590,
    // reproduced at this seat), and it was never able to type the real grammar.
    autocomplete?: string;
    enterkeyhint?: InputHTMLAttributes["enterkeyhint"];
    form?: string;
    inputmode?: InputHTMLAttributes["inputmode"];
    list?: string;
    max?: InputHTMLAttributes["max"];
    maxlength?: InputHTMLAttributes["maxlength"];
    min?: InputHTMLAttributes["min"];
    minlength?: InputHTMLAttributes["minlength"];
    name?: string;
    pattern?: string;
    placeholder?: string;
    required?: boolean;
    step?: InputHTMLAttributes["step"];
}

export interface InputProps extends /* @vue-ignore */ InputNativeAttrs {
    class?: HTMLAttributes["class"];
    /** Feeds the one state machine (`data-state`), so it is a prop, not an attr. */
    disabled?: boolean;
    /** App-driven validity. Native constraint validation and a bare
     *  `aria-invalid` reach the same one grammar without it. */
    invalid?: boolean;
    modelValue?: string | number;
    /** Feeds the one state machine (`data-state`), so it is a prop, not an attr. */
    readonly?: boolean;
    size?: ControlSize;
    /**
     * TEXT-SHAPED natives only, and the fence is the design.
     *
     * `number` is Reka's NumberField (locale parse/format + a spinbutton);
     * `range` is Slider's geometry; `file` and `color` are non-text chrome this
     * register would paint absurdly; `hidden` never paints at all. The five
     * temporal values ARE text-shaped — they carry a caret, a placeholder and a
     * text baseline — and were a genuine typed hole, so they are in.
     *
     * Every other native input attribute (`autocomplete`, `form`, `maxlength`,
     * `minlength`, `name`, `pattern`, `placeholder`, `required`, `inputmode`,
     * `enterkeyhint`, …) is UNDECLARED on purpose: it rides `$attrs` to the
     * element, which is what the platform already does correctly.
     */
    type?:
        | "date"
        | "datetime-local"
        | "email"
        | "month"
        | "password"
        | "search"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
}
