import { inject, provide, type InjectionKey } from "vue";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "../toggle";

/**
 * ToggleGroup context — surfaces `variant` + `size` to descendant
 * `<ToggleGroupItem>` so each item picks up the group-level variant
 * without per-item prop drilling.
 *
 * O.W2 Lane A — canonical typed-key + helper-pair DI shape per invariant
 * 25; replaces the prior raw `provide("toggleGroup", {...})` + untyped
 * `inject<ToggleGroupVariants>("toggleGroup")` pair.
 */
export type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

export interface ToggleGroupContext {
    variant: ToggleGroupVariants["variant"];
    size: ToggleGroupVariants["size"];
}

export const TOGGLE_GROUP_KEY: InjectionKey<ToggleGroupContext> = Symbol(
    "glass-ui:toggle-group",
);

export function provideToggleGroupContext(context: ToggleGroupContext): void {
    provide(TOGGLE_GROUP_KEY, context);
}

/** Befitting silent default — `<ToggleGroupItem>` can also render bare. */
export function useOptionalToggleGroupContext(): ToggleGroupContext | null {
    return inject(TOGGLE_GROUP_KEY, null);
}
