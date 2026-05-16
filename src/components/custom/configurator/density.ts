import { inject, provide, type ComputedRef, type InjectionKey } from "vue";

/**
 * Density axis for `<Configurator>` + `<ConfiguratorRow>` (N.W2 Lane A).
 *
 * - `"mobile"`       — tight gap; for narrow-viewport studios (≤ 480px host).
 * - `"compact"`      — slightly tighter than the default; dense studios.
 * - `"comfortable"`  — current default; matches the pre-N.W2 `gap-1.5 py-2` recipe.
 * - `"spacious"`     — generous gap; demo / settings-page surface.
 *
 * The `<Configurator>` provides its `density` prop to descendants via
 * `provide`/`inject` (key: `configuratorDensity`). A `<ConfiguratorRow>`
 * may override locally by setting its own `density` prop — prop wins over
 * inject. When neither is set, the row falls back to `"comfortable"` and
 * NO `data-density` attribute is emitted, so the pre-N.W2 visual is bit-
 * for-bit preserved.
 */
export type ConfiguratorDensity = "mobile" | "compact" | "comfortable" | "spacious";

/**
 * Provide / inject key for the cascading density value. Carries a
 * `ComputedRef<ConfiguratorDensity>` so descendants stay reactive when
 * the host swaps density (e.g., viewport-driven mobile/desktop branch).
 */
export const CONFIGURATOR_DENSITY_KEY: InjectionKey<
    ComputedRef<ConfiguratorDensity>
> = Symbol("configuratorDensity");

/*
 * Paired helpers — P.W2 Lane A (invariant 25 closure).
 *
 * Per Pδ §2.2: the consumer (`<ConfiguratorRow>`) renders bare when no
 * ancestor `<Configurator>` is present — density falls through to
 * `undefined` and no `data-density` attribute is emitted, preserving the
 * pre-N.W2 visual bit-for-bit. Semantics are therefore OPTIONAL ONLY.
 *
 * No `useConfiguratorDensity()` strict counterpart is shipped — it would
 * be dead code (no callsite would tolerate a throw). Invariant 25 closes
 * "per intent" at this site with provide-helper + optional-helper only.
 */

export function provideConfiguratorDensity(
    density: ComputedRef<ConfiguratorDensity>,
): void {
    provide(CONFIGURATOR_DENSITY_KEY, density);
}

/**
 * Befitting silent default — returns `null` when there is no ancestor
 * `<Configurator>`. The consumer null-coalesces to `undefined` so the
 * `:data-density` binding emits no attribute (pre-N.W2 visual preserved).
 */
export function useOptionalConfiguratorDensity():
    | ComputedRef<ConfiguratorDensity>
    | null {
    return inject(CONFIGURATOR_DENSITY_KEY, null);
}
