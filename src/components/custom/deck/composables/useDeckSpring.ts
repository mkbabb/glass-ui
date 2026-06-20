import { DECK_SPRING } from "../constants";

/* useDeckSpring — the deck's motion curve, dogfooded from keyframes.js.

   The slide-to-slide transition and the count-up both ride ONE spring, the SwiftUI
   `.smooth` preset (response 0.5, dampingFraction 0.85 — `DECK_SPRING`). It is the
   SAME family the `--spring-*` tokens derive from (`springLinearStops()` output),
   so the deck inherits the constellation's iOS curve instead of forking a third
   easing vocabulary.

   The CSS half is a TOKEN, not a JS write: `--spring-deck: var(--spring-smooth)`
   (scheme-motion.css) — glass-ui's `springLinearStops()` output for the same
   `.smooth` preset (sub-percent identical), consumed by the slide transition's
   `transition-timing-function`. So only the count-up's JS easing needs the engine:
   `deckEase` is the callable `TimingFunction` (t∈[0,1] → position) for a count-up's
   rAF loop. `installDeckSpring()` swaps it to the engine's
   `springTimingFunction(.smooth)` once keyframes.js resolves, so the count-up
   settles with the same character as the spring the slide rides.

   keyframes.js is loaded LAZILY (dynamic import) so the spring never blocks first
   paint and the count-up degrades to its monotone fallback if the chunk fails to
   load — keeping `/deck` keyframes-FREE on the static graph (the SCC-trap
   discipline; keyframes is the lazy import only). */

/** The deck spring preset, re-exported from the colocated constants for consumers
    sampling the same `(response, ζ)` row. */
export { DECK_SPRING } from "../constants";

/**
 * Count-up easing. Defaults to a monotone cubic-out so a still render (or a failed
 * engine chunk) is always faithful; replaced in-place with the engine's
 * `springTimingFunction(.smooth)` once keyframes.js resolves. Callers read
 * `deckEase.fn` each frame, so the swap is picked up live with no re-wiring.
 */
export const deckEase: { fn: (t: number) => number } = {
    fn: (t) => 1 - Math.pow(1 - t, 3),
};

let installed = false;

/**
 * Swap `deckEase.fn` to the engine's matching JS easing once keyframes.js resolves.
 * Idempotent. No-op off-DOM (SSR / export tooling) and a silent no-op if the engine
 * chunk fails — the count-up keeps its monotone cubic fallback.
 *
 * The slide transition needs no JS write: `--spring-deck: var(--spring-smooth)`
 * (glass-ui's `.smooth` `linear()` token) resolves the declarative half at first
 * paint.
 */
export function installDeckSpring(): void {
    if (installed || typeof document === "undefined") return;
    installed = true;
    // BC.W-DECK — the keyframes.js HEAVY-tier spring engine is loaded on demand so the
    // /deck subpath ships engine-free; the declarative --spring-deck token carries first
    // paint and the count-up keeps its cubic fallback until this resolves.
    void import("@mkbabb/keyframes.js") // lazy-boundary: BC.W-DECK keyframes.js HEAVY-tier engine, demand-loaded; /deck ships engine-free
        .then(({ springTimingFunction }) => {
            // `springTimingFunction` returns the typed `Easing` pair ({ fn, css });
            // we read its callable curve for the count-up's per-frame sample.
            deckEase.fn = springTimingFunction(DECK_SPRING).fn;
        })
        .catch(() => {
            /* engine chunk unavailable — keep the cubic fallback */
        });
}
