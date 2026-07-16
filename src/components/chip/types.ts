import type { HTMLAttributes } from "vue";
import type { Surface } from "../_shared/axes";
import type { ChipVariants } from "./chipVariants";

export type ChipMode = "static" | "selectable" | "action" | "removable";

interface ChipVisualProps {
    /** Geometry only; never changes semantics. */
    shape?: ChipVariants["shape"];
    size?: ChipVariants["size"];
    tone?: string;
    surface?: Surface;
    class?: HTMLAttributes["class"];
}

export interface StaticChipProps extends ChipVisualProps {
    /** Noninteractive content is the default. */
    mode?: "static";
    modelValue?: never;
    defaultValue?: never;
    disabled?: never;
    name?: never;
    required?: never;
    removeLabel?: never;
}

export interface SelectableChipProps extends ChipVisualProps {
    mode: "selectable";
    modelValue?: boolean | null;
    defaultValue?: boolean;
    disabled?: boolean;
    name?: never;
    required?: never;
    removeLabel?: never;
}

export interface ActionChipProps extends ChipVisualProps {
    mode: "action";
    disabled?: boolean;
    modelValue?: never;
    defaultValue?: never;
    name?: never;
    required?: never;
    removeLabel?: never;
}

export interface RemovableChipProps extends ChipVisualProps {
    mode: "removable";
    disabled?: boolean;
    /** Accessible name for the sole remove button in removable mode. */
    removeLabel: string;
    modelValue?: never;
    defaultValue?: never;
    name?: never;
    required?: never;
}

/** Mode-discriminated semantics; visual axes are shared, behavior is not. */
export type ChipProps =
    | StaticChipProps
    | SelectableChipProps
    | ActionChipProps
    | RemovableChipProps;
