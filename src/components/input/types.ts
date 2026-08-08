import type { HTMLAttributes, InputHTMLAttributes } from "vue";
import type { ControlSize } from "../_shared/control";

export interface InputProps {
    autocomplete?: string;
    class?: HTMLAttributes["class"];
    defaultValue?: string | number;
    disabled?: boolean;
    enterkeyhint?: InputHTMLAttributes["enterkeyhint"];
    form?: string;
    inputmode?: InputHTMLAttributes["inputmode"];
    invalid?: boolean;
    maxlength?: InputHTMLAttributes["maxlength"];
    minlength?: InputHTMLAttributes["minlength"];
    modelValue?: string | number;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    size?: ControlSize;
    type?: "email" | "password" | "search" | "tel" | "text" | "url";
}
