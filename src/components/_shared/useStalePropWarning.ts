// `_shared/useStalePropWarning.ts` — invariant 31 (component props fail-explicit).
//
// Vue 3.5 lets undeclared attributes fall through to a component's root
// element by default. For a primitive whose surface is driven entirely by
// declared props (`Card`'s `tier`/`surface`/`shadow`/`grain`), a consumer who
// passes a STALE prop name — one the primitive used to
// expose, or never did — gets it silently swallowed as an inert DOM attr.
// The primitive then renders its defaults, and the consumer sees a wrong
// surface with no diagnostic (the Qα R3 silent-swallow attribution: a
// `<Card variant="pane">` site fell back to `tier:"resting"` + `shadow:true`,
// the hard black drop-shadow users reported).
//
// This composable is the W2 dev-WARN posture of invariant 31. It inspects
// `useAttrs()` and emits a `console.warn` — naming the stale prop, the
// component, and the canonical replacement recipe — whenever a known-stale
// prop name appears in the fallthrough attrs. It is gated behind
// `import.meta.env.DEV`, so production builds are silent and pay zero cost.
//
// Posture ladder (per Q.W2 spec):
//   W2 — dev-WARN (this composable). Surfaces staleness; does NOT break builds.
//   W6 — typed-reject. Once the fleet is verified `variant=`-free, the stale
//        names migrate into a typed `defineProps` union that `vue-tsc`
//        rejects. The `StalePropName` const below is the extensible seam
//        W6 hardens — add/promote names there, not at each call site.

import { useAttrs, watchEffect } from "vue";

/**
 * Canonical stale / undeclared prop names the glass-ui surface primitives
 * watch for. Each entry pairs the dead prop with the canonical replacement
 * recipe quoted verbatim in the dev-warning.
 *
 * EXTENSIBLE SEAM — W6's typed-reject hardening promotes these into the
 * primitives' `defineProps` unions. Add new stale names here (one place),
 * not at the call sites.
 */
export const STALE_PROP_RECIPES = {
    /** Pre-glass-ui `Card` API axis. Never existed on the glass-ui `Card`. */
    variant: 'variant="pane" → tier="wash" :grain="false"  (variant="cartoon" → surface="cartoon")',
    /** bbnf-buddy `<Card variant="pane" flush>` — `flush` was never a glass-ui prop. */
    flush: 'flush → class="p-0"  (padding is a consumer utility, not a Card prop)',
} as const;

/** Union of the stale prop names — the W6 typed-reject seam. */
export type StalePropName = keyof typeof STALE_PROP_RECIPES;

const ALL_STALE_NAMES = Object.keys(STALE_PROP_RECIPES) as StalePropName[];

/**
 * Dev-mode watcher: warns when a stale prop name falls through to a
 * primitive's `$attrs`. No-op in production (`import.meta.env.DEV` gate).
 *
 * @param componentName  the primitive's display name, used in the warning.
 * @param staleNames     which stale names to watch — defaults to all of
 *                       `STALE_PROP_RECIPES`. A primitive that legitimately
 *                       declares one of these names passes a narrowed list.
 */
export function useStalePropWarning(
    componentName: string,
    staleNames: readonly StalePropName[] = ALL_STALE_NAMES,
): void {
    // Production builds tree-shake the whole body — the warning is a
    // development-only diagnostic.
    if (!import.meta.env.DEV) return;

    const attrs = useAttrs();

    watchEffect(() => {
        for (const name of staleNames) {
            // `name in attrs` catches both `variant="x"` and bare `flush`
            // (which arrives as `flush: ""`).
            if (name in attrs) {
                console.warn(
                    `[glass-ui] <${componentName}> received the stale prop \`${name}\`. ` +
                        `glass-ui's <${componentName}> never declared it, so it falls through ` +
                        `as an inert DOM attribute and the component silently renders its defaults. ` +
                        `Canonical replacement: ${STALE_PROP_RECIPES[name]}.`,
                );
            }
        }
    });
}
