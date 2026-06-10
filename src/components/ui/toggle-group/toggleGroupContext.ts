import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "../toggle";
import { createOptionalContext } from "../../../composables/context";

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

/**
 * The MATERIAL register a toggle group wears (E21/E23 — d-glassui M2). `"glass"`
 * moves every item onto the control-glass chip tier (wash-rest, quiet-on-select,
 * one rung quieter than the host hull) WITHOUT each call-site opting into the
 * heavyweight `card` variant. It is the semantic chrome-tier alias for
 * `variant: "glass"`: a group-level register, not a per-item style override.
 * Omitted ⇒ the flat default register (back-compat). An EXPLICIT item/group
 * `variant` still wins over the register (the register only supplies the variant
 * when none is named).
 */
export type ToggleGroupRegister = "glass";

export interface ToggleGroupContext {
    variant: ToggleGroupVariants["variant"];
    size: ToggleGroupVariants["size"];
    /** The material register (E21/E23). Resolves to `variant: "glass"` when set. */
    register?: ToggleGroupRegister;
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
