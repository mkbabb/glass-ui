// Shared `--motion-tempo` reader for the CSS↔JS one-clock seam.
//
// `--motion-tempo` is the ONE registered inheriting TIME scalar (property-regs.css,
// initial 1.0 identity) that co-scales BOTH the CSS spring clocks (the
// `--spring-<name>-duration` reader reads `calc(var(--spring-<name>-settle) *
// var(--motion-tempo))`, scheme-spring.css) AND the JS spring RESPONSES. A JS spring
// engine reads it HERE at construction and scales `response *= tempo`; because
// `duration ∝ response` (ωₙ = 2π/response), scaling the CSS clock by tempo ≡ scaling
// response by tempo — so the M1 CSS==JS parity holds at ANY tempo (G2).
//
// Element-scoped: pass the morphing element to honour a loud-scope re-pin (the dock /
// drawer surfaces re-pin `--motion-tempo: 1` on their own scope, scheme-motion.css);
// omit it for the global `:root` tempo (the element-agnostic spring engines). This is
// the site-local `getComputedStyle` getter seam `effectiveCap`/`writeVelocityWeight`
// already establish for `--motion-weight` (the sister magnitude scalar).
//
// SSR / off-DOM safe (returns the identity 1), positive-clamped (a malformed or ≤0
// override → 1 — the typed `@property` fail-safe mirrored JS-side). Engine-FREE +
// vueuse-FREE (no `vue`, no `@mkbabb/keyframes.js`) — the /motion-core discipline.
//
// THE NAMING FENCE — `--motion-tempo` (TIME) ⟂ `--motion-weight` (MAGNITUDE) ⟂
// `--ui-scale` (GEOMETRY): three registered inheriting scalars, never folded.

/** The identity tempo — no time scaling (the `@property` initial-value). */
const MOTION_TEMPO_IDENTITY = 1;

/**
 * Read the effective `--motion-tempo` off `el` (or `:root` when omitted). Returns a
 * positive multiplier (the identity `1` off-DOM, on a malformed value, or on any
 * value ≤ 0). Read once at spring construction — a tempo change is a settings-level
 * knob (a re-mount picks it up), never a per-frame read.
 */
export function motionTempo(el?: Element | null): number {
    if (typeof window === "undefined" || typeof getComputedStyle !== "function") {
        return MOTION_TEMPO_IDENTITY;
    }
    const source = el ?? document.documentElement;
    const raw = getComputedStyle(source).getPropertyValue("--motion-tempo").trim();
    const t = Number.parseFloat(raw);
    return Number.isFinite(t) && t > 0 ? t : MOTION_TEMPO_IDENTITY;
}
