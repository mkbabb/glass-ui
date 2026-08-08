import type { HTMLAttributes, TextareaHTMLAttributes } from "vue";
import type { ControlSize } from "../_shared/control";

/**
 * The DRAG HANDLE, and only the drag handle.
 *
 * `"content"` left the union: it was a non-CSS enum member conflating the handle
 * with the sizing axis, and while it was the only way to ask for content sizing,
 * `rows` was dead on every other member (the register floored every textarea at
 * 5lh regardless). Growth is now the register's unconditional default — floored at
 * `rows` line boxes via the `--field-rows` stamp `Textarea.vue` writes (the
 * attribute itself is ignored under `field-sizing: content`), capped by
 * `--textarea-content-max` — so the handle is free to mean what its name says.
 */
export type TextareaResize = "vertical" | "horizontal" | "both" | "none";

/** Typed for the caller, invisible to `defineProps` — see `input/types.ts` for the
 *  `/* @vue-ignore *\/` mechanism and why the full `TextareaHTMLAttributes` is not
 *  the base. `rows` is the load-bearing member: it is the growth FLOOR now that the
 *  register sizes to content by default. It rides `$attrs` to the element AND is
 *  stamped into `--field-rows` by `Textarea.vue`, because `field-sizing: content`
 *  ignores the attribute outright — the stamp is the half the floor is built on. */
interface TextareaNativeAttrs {
    cols?: TextareaHTMLAttributes["cols"];
    form?: string;
    maxlength?: TextareaHTMLAttributes["maxlength"];
    minlength?: TextareaHTMLAttributes["minlength"];
    name?: string;
    placeholder?: string;
    required?: boolean;
    rows?: TextareaHTMLAttributes["rows"];
    wrap?: TextareaHTMLAttributes["wrap"];
}

export interface TextareaProps extends /* @vue-ignore */ TextareaNativeAttrs {
    class?: HTMLAttributes["class"];
    /** Feeds the one state machine (`data-state`), so it is a prop, not an attr. */
    disabled?: boolean;
    /** App-driven validity. Native constraint validation and a bare
     *  `aria-invalid` reach the same one grammar without it. */
    invalid?: boolean;
    modelValue?: string | number;
    /** Feeds the one state machine (`data-state`), so it is a prop, not an attr. */
    readonly?: boolean;
    resize?: TextareaResize;
    size?: ControlSize;
}
