import type { ComputedRef } from "vue";
import { createOptionalContext } from "../../composables/context";

/**
 * Size axis for `<Configurator>` + `<ConfiguratorRow>` (BH.W-SIZE-UNIFY — the
 * clean-break of the size/density collision onto the shared Size ordinal). The old
 * `"mobile"` rung is DROPPED — a coarse-pointer state is a `@media(pointer:coarse)`
 * concern, never a scale rung (axes.ts §sub-range-law).
 *
 * - `"sm"`  — slightly tighter than the default; dense studios (was `"compact"`).
 * - `"md"`  — current default; matches the `gap-1.5 py-2` recipe (was `"comfortable"`).
 * - `"lg"`  — generous gap; demo / settings-page surface (was `"spacious"`).
 *
 * The `<Configurator>` provides its `size` prop to descendants via
 * `provide`/`inject` (key: `configuratorSize`). A `<ConfiguratorRow>` may override
 * locally by setting its own `size` prop — prop wins over inject. When neither is
 * set, the row falls back to `md` and NO `data-size` attribute is emitted, so the
 * bare-row visual is bit-for-bit preserved.
 */
export type ConfiguratorSize = "sm" | "md" | "lg";

/*
 * Paired helpers — AV.W14 (invariant 25 closure, canonical DI factory).
 *
 * The consumer (`<ConfiguratorRow>`) renders bare when no ancestor
 * `<Configurator>` is present — size falls through to `undefined` and no
 * `data-size` attribute is emitted. Semantics are OPTIONAL ONLY (no strict
 * counterpart — it would be dead code, no callsite would tolerate a throw).
 */
const ctx = createOptionalContext<ComputedRef<ConfiguratorSize>>(
    "configuratorSize",
);

export const CONFIGURATOR_SIZE_KEY = ctx.KEY;

export function provideConfiguratorSize(
    size: ComputedRef<ConfiguratorSize>,
): void {
    ctx.provide(size);
}

/**
 * Befitting silent default — returns `null` when there is no ancestor
 * `<Configurator>`. The consumer null-coalesces to `undefined` so the
 * `:data-size` binding emits no attribute (bare-row visual preserved).
 */
export const useOptionalConfiguratorSize = ctx.use;
