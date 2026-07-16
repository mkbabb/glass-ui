import { createOptionalContext } from "../../composables/context";

export type ToggleGroupVariant = "default" | "outline";
export type ToggleGroupSize = "sm" | "md" | "lg";

export interface ToggleGroupContext {
    variant?: ToggleGroupVariant | null;
    size?: ToggleGroupSize | null;
}

const ctx = createOptionalContext<ToggleGroupContext>("glass-ui:toggle-group");

export const TOGGLE_GROUP_KEY = ctx.KEY;

export function provideToggleGroupContext(context: ToggleGroupContext): void {
    ctx.provide(context);
}

export const useOptionalToggleGroupContext = ctx.use;
