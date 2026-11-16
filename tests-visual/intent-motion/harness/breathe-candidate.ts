// breathe (W-B.17 R-10, a candidate that FAILED its reading; kept for the record, not in src): the declared idle breath as ONE Web
// Animation on the plate's `::before`, added to whatever the plate's own rule paints.
// Hover, focus and press transition underneath it, so no edge is a cut; standing down
// lets the breath in flight finish at its trough instead of removing it.
import { readReducedMotion } from "@glass/composables/motion/core/useReducedMotion";

/** Start the breath on a `.plate`. Returns the stand-down. */
export function breathe(el: HTMLElement | null): () => void {
    if (!el || readReducedMotion()) return () => {};
    const cs = getComputedStyle(el);
    const amount =
        Number.parseFloat(cs.getPropertyValue("--fill-hover")) /
        Number.parseFloat(cs.getPropertyValue("--fill-selected"));
    const a = el.animate(
        { opacity: [0, amount] },
        {
            pseudoElement: "::before",
            composite: "add",
            duration: Number.parseFloat(cs.getPropertyValue("--skeleton-breathe-duration")) * 1000,
            easing: cs.getPropertyValue("--ease-standard").trim() || "ease-in-out",
            direction: "alternate",
            iterations: Number.POSITIVE_INFINITY,
        },
    );
    return () => {
        const at = a.effect?.getComputedTiming().currentIteration ?? 0;
        a.effect?.updateTiming({ iterations: Math.floor(at / 2) * 2 + 2 });
    };
}
