import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "../toggle";
import { createOptionalContext } from "../../composables/context";

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

// Optional-only (AV.W14): `<ToggleGroupItem>` can also render bare, so no
// strict counterpart is minted.
const ctx = createOptionalContext<ToggleGroupContext>("glass-ui:toggle-group");

export const TOGGLE_GROUP_KEY = ctx.KEY;

export function provideToggleGroupContext(context: ToggleGroupContext): void {
    ctx.provide(context);
}

/** Befitting silent default — `<ToggleGroupItem>` can also render bare. */
export const useOptionalToggleGroupContext = ctx.use;
