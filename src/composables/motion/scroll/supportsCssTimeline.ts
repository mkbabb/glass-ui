// supportsCssTimeline — hardened feature detection for scroll-driven CSS animations.
//
// `CSS.supports` is the canonical probe, but non-rendering environments
// (happy-dom / jsdom in unit tests, and some SSR shims) return `true` for
// EVERY query — including syntactically-invalid garbage. A naive
// `CSS.supports("animation-timeline", "scroll()")` therefore reads "native" in
// a test runner that cannot actually run a scroll-timeline, which would wrongly
// gate OFF the JS fallback writer (the composable) in exactly the environments
// that need it.
//
// The harden: a REAL engine that supports the feature ALSO REJECTS a
// deliberately-invalid value (`supports(valid) === true && supports(garbage)
// === false`), whereas a lying environment returns `true` for both. Requiring
// the negative probe to fail yields `false` under happy-dom / jsdom / SSR (so
// the JS fallback stays the sole writer there) and `true` only on a genuine
// supporting browser (where the CSS recipe owns the compositor path). No deps —
// keyframes-free + vueuse-free, so it rides `/motion-core` + the root barrel.

/**
 * True only when the engine genuinely supports an `animation-timeline` value
 * AND correctly rejects a garbage value (filtering out always-true shims).
 *
 * @param validValue   a real timeline value, e.g. `"scroll()"`.
 * @param garbageValue a deliberately-invalid value the real engine rejects.
 */
function supportsTimelineValue(validValue: string, garbageValue: string): boolean {
    if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
        return false;
    }
    return (
        CSS.supports("animation-timeline", validValue) &&
        !CSS.supports("animation-timeline", garbageValue)
    );
}

/** Genuine support for a `scroll()` timeline (the `.scroll-progress` recipe). */
export function supportsScrollTimeline(): boolean {
    return supportsTimelineValue("scroll()", "gl-not-a-real-timeline");
}

/**
 * Genuine support for a `view()` timeline + `animation-range` (the
 * `[data-scroll-reveal]` recipe). The `view()` value carries the range probe
 * implicitly — an engine new enough for `view()` carries `animation-range`.
 */
export function supportsViewTimeline(): boolean {
    return supportsTimelineValue("view()", "gl-not-a-real-timeline");
}
