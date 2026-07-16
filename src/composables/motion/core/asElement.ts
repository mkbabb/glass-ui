import type { ComponentPublicInstance } from "vue";

// Resolve a template ref that may point at an element OR a component to its root
// HTMLElement. A `ref` on a `<Component>` yields the public instance, not the element —
// reading `getBoundingClientRect`/`.style` off it silently no-ops or throws; `.$el` is
// the root. A fragment-root component (a leading comment/text sibling, or a v-if on the
// root) has a NON-element `$el`, so this returns null rather than a bad element.
//
// This is the ONE home for the resolver. It lives in engine-free `core/` because the
// keyframes-free `/motion-core` leaves (useScrollChrome, useScrollPin) cannot import from
// the keyframes-bearing `useElementMorph` without pulling the engine onto that subpath —
// the SCC boundary that previously forced three byte-identical copies. `useElementMorph`
// re-exports this symbol so the public `/motion` `asElement` is unchanged.
export function asElement(
    value: HTMLElement | ComponentPublicInstance | null | undefined,
): HTMLElement | null {
    if (!value) return null;
    if (value instanceof HTMLElement) return value;
    const el = (value as ComponentPublicInstance).$el;
    return el instanceof HTMLElement ? el : null;
}
