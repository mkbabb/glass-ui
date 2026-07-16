import type { HTMLAttributes, TextareaHTMLAttributes } from "vue";
import type { ControlSize } from "../_shared/control-size";

export type TextareaResize = "vertical" | "horizontal" | "both" | "none" | "content";

export interface TextareaProps {
    class?: HTMLAttributes["class"];
    cols?: TextareaHTMLAttributes["cols"];
    defaultValue?: string | number;
    disabled?: boolean;
    form?: string;
    invalid?: boolean;
    maxlength?: TextareaHTMLAttributes["maxlength"];
    minlength?: TextareaHTMLAttributes["minlength"];
    modelValue?: string | number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    resize?: TextareaResize;
    rows?: TextareaHTMLAttributes["rows"];
    size?: ControlSize;
    wrap?: TextareaHTMLAttributes["wrap"];
}
