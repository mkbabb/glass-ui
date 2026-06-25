/*
 * critical-partition.mjs — the CRITICAL_PARTITION boundary manifest
 * (BB.W-CSS-CRITICAL — the render-blocking `/styles` split).
 *
 * The SINGLE source of the critical/deferred partition of the resolved
 * `@mkbabb/glass-ui/styles` draw. The build (vite.style-assets.ts
 * publishStyleAssets) reads it to emit `dist/styles/critical.css` +
 * `dist/styles/deferred.css`; the gate (scripts/proof-css-critical.mjs) reads
 * it to assert the partition is byte-complete + manifest-driven. There is NO
 * second hand-extracted critical block (W4 — the manifest is the sole source).
 *
 * The partition is drawn at the EXISTING thin-root-over-partials cascade
 * boundary (AY.W-CSS1) — whole `src/styles/index.css` @import partials are
 * bucketed, never a partial-content re-author (the partial CONTENTS are
 * untouched; a cross-partial rule move is a triumvirate trigger, see the wave
 * spec §Triumvirate). The two emitted files each @import their bucket's
 * partials in the SAME cascade order the monolith index.css declares (load
 * order is load-bearing), and CRITICAL loads BEFORE DEFERRED in the consumer
 * so the deferred component recipes still cascade-correctly over the critical
 * glass ladder.
 *
 * CRITICAL (./styles/critical) — the above-the-fold paint surface a consumer's
 * FIRST PAINT requires: the whole token cascade (every visual axis is a custom
 * property the chrome reads), the √φ typography scale + semantic type classes,
 * the @theme aliases + the `.dark` variant selector, and the 5-rung glass
 * ladder + specular/refract. Small (the token + ladder + type surface, not the
 * component recipes) — under the recorded gzip ceiling (W3).
 *
 * DEFERRED (./styles/deferred) — the below-the-fold + late-mount tail: every
 * component recipe + the transitions/animations/scroll-driven/scroll-chrome/
 * view-transition grammar + utilities + the menu/configurator/instrument-chassis/
 * hover-popover/drawer/segmented-tabs/select/icon-chip/border-progress/
 * completion-seal component partials, PLUS the folded SFC `<style scoped>`
 * payload (`../glass-ui.css`) and the emitted Tailwind component-utility surface
 * (`components.css`). These decorate components that mount after first paint or
 * sit below the fold; their late arrival shifts no above-the-fold pixel (the
 * FOUC-safe floor, W5). The BC-added `scroll-chrome.css` (the scroll-driven
 * floating-CHROME collapse recipe — a late-mount surface decoration) and
 * `completion-seal.css` (the one-shot earned-gold feedback seal — a focal opt-in
 * surface that mounts on a completion event) are BOTH deferred: neither paints
 * an above-the-fold first-paint chrome pixel. The BD-added `motion/morph-field.css`
 * (the ONE `useMorphField` goo recipe — the body/neck/waist silhouette + the
 * dedicated squish channel) is likewise DEFERRED: it is gated to `[data-morphing]`
 * and paints only while a morph drive is live (a late-mount compositor decoration),
 * never a steady-state first-paint chrome pixel.
 *
 * The `paper.css` partial is bucketed DEFERRED — the paper underpaint/grain
 * utilities pair with glass for paper-on-glass compositions that mount with the
 * content surfaces (below-the-fold), not the chrome's first paint.
 */

/**
 * The two non-fold buckets — each entry is a `src/styles/*.css` partial that the
 * monolith `src/styles/index.css` @imports at the top level (lines 149-182).
 * The order within each list mirrors the monolith's declared cascade order.
 */
export const CRITICAL_PARTIALS = Object.freeze([
    "tokens.css",
    "typography.css",
    "theme.css",
    "glass.css",
    "glass-specular-track.css",
    "glass-refract.css",
]);

export const DEFERRED_PARTIALS = Object.freeze([
    "paper.css",
    "dock.css",
    "dock-controls.css",
    "cards.css",
    "feedback-tone.css",
    "floating-panel.css",
    "transitions.css",
    "animations.css",
    "motion/morph-field.css",
    "jubilance.css",
    "scroll-driven.css",
    "scroll-choreography.css",
    "scroll-chrome.css",
    "view-transition.css",
    "utilities.css",
    "menu.css",
    "configurator.css",
    "instrument-chassis.css",
    "hover-popover.css",
    "drawer.css",
    "segmented-tabs.css",
    "select.css",
    "icon-chip.css",
    "border-progress.css",
    "completion-seal.css",
]);

/**
 * The build-time folds that land in DEFERRED (NOT a `src/styles/*.css` partial;
 * the publishStyleAssets folds appended to the dist copy of index.css). The SFC
 * scoped payload (`../glass-ui.css`) + the Tailwind component-utility surface
 * (`./components.css`) are below-the-fold component decoration — they MUST NOT
 * leak into critical (the W2 byte-complete-in-one-bucket + W3 ceiling bite).
 * Relative to `dist/styles/` (where critical.css/deferred.css are emitted).
 */
export const DEFERRED_FOLDS = Object.freeze([
    "../glass-ui.css",
    "./components.css",
]);

/**
 * The `@source` build-scan backstop directive (the consumer-JIT content-scan
 * reach for glass-ui's own component utilities — a backstop for the
 * components.css self-emit). It backstops the DEFERRED component utilities, so
 * it rides DEFERRED. The value is the exact directive the monolith index.css
 * carries (re-grounded at HEAD: `@source "../*.js";`).
 */
export const DEFERRED_SOURCE_DIRECTIVE = '@source "../*.js";';

/**
 * The recorded critical-subset gzip ceiling (bytes), measured on the FULLY
 * RESOLVED consumer draw (the critical partials' @import roots resolved
 * RECURSIVELY through their nested tokens/* + glass/* sub-partials — the real
 * first-paint byte a consumer's bundler emits, NOT the one-level approximation
 * profile-bundle uses for the monolith budget). The committed, reviewed
 * baseline (the profile-bundle read-baseline discipline): a regression that
 * folds a component recipe back into critical climbs the emitted critical.css
 * resolved gzip over this → RED (W3). Re-base via the gate's `--rebaseline`
 * flag with a recorded rationale, never silently.
 *
 * Measured at this authoring (HEAD bdbcd479, post-build): the critical subset
 * resolved to raw 347266 / gzip 105460 — the token cascade (tokens.css gzip
 * ~62KiB) + the 5-rung glass ladder (glass.css gzip ~27KiB) + typography +
 * theme + specular/refract. It is roughly half the monolith's fully-resolved
 * gzip (~230KiB), so the deferred tail (component recipes + SFC scoped payload
 * + components.css utility surface, ~125KiB gzip) loads NON-blocking after
 * first paint — the render-block win. The ceiling carries ~4% headroom over
 * the measured baseline (the profile-bundle re-base convention). If the
 * re-measured render-block under W-LIGHTHOUSE shows this critical subset is
 * STILL over the mobile-ms floor, the inline-critical-head-block path routes to
 * the named BB.W-CSS-CRITICAL-INLINE successor (a triumvirate trigger, NOT a
 * token-value edit here).
 *
 * RE-BASE (BB liquid-glass band): the critical subset grew to raw 427015 / gzip
 * 131469 — NOT a component-recipe leak (the critical bucket is still the 6
 * documented token+glass+type partials; w2 partials-disjoint + w4 hold), but the
 * legitimate GROWTH of the critical token cascade + glass ladder by the BB
 * liquid-glass band: the deep-glass token family (tokens/glass-deep.css), the
 * --glass-accent rim axis, the W-LENSING refract evolution, the W-DARK-MATERIAL
 * dark-arm + the on-glass-fg / surface-axis registers — all of which live in the
 * critical tokens/* + glass/* sub-partials by construction. Ceiling lifted
 * 110000 → 137000 (~4.2% headroom over the measured 131469, the profile-bundle
 * re-base convention) to carry the BB glass-band critical surface.
 *
 * RE-BASE (BC.W-CSS-CRITICAL — re-measured over the SETTLED BC cascade): the
 * critical subset grew to raw 482228 / gzip 149748 — AGAIN not a component-recipe
 * leak (the critical bucket is STILL the 6 documented token+glass+type partials;
 * the BC visual bands 1-7 + 9 re-authored the critical tokens/* + glass/* sub-
 * partials — the warm-cream page chassis tokens, the on-glass-fg/surface-axis
 * registers, the calm/deep glass ladder, the scroll/motion token additions in
 * scale-paper.css — all of which live in the critical token cascade by
 * construction; the two BC-added PARTIALS scroll-chrome.css + completion-seal.css
 * are bucketed DEFERRED, NOT critical). The critical subset is 47.3% of the
 * settled monolith's resolved gzip (316614) — the spec's ~46% small-above-the-
 * fold-subset bar HELD over the settled cascade. Ceiling re-pinned 137000 →
 * 156000 (~4.2% headroom over the measured 149748, the profile-bundle re-base
 * convention — the reviewed write, NEVER a silent component-recipe swallow to
 * stay under the old number). The render-block FLOOR stays W-LIGHTHOUSE's
 * W3-arm-1 mobile-ms gate (the binding perf truth); this ceiling guards against a
 * recipe revert-toward-monolith.
 *
 * RE-BASE (BD greenfield band — re-measured over the SETTLED BD cascade): the
 * critical subset grew to raw 561233 / gzip 174231 — AGAIN not a component-recipe
 * leak into the critical BUCKET (the critical bucket is STILL the SAME 6 documented
 * token+glass+type partials; w2 partials-disjoint + w4 hold, and the two recipe-shaped
 * BD additions that COULD have leaked do NOT: `motion/morph-field.css` is bucketed
 * DEFERRED, `glass-atom.css`/`glass-chip.css` are @import-ed by the DEFERRED
 * `icon-chip.css` (not by `glass.css`), and `liquid-morph.css` is demo-only — it is
 * @import-ed by NO src partial). The growth is the legitimate BD GREENFIELD enrichment
 * of the critical TOKEN CASCADE + glass ladder, which lives in the critical tokens/* +
 * glass/* sub-partials by construction: the NEW `tokens/property-regs.css` (the
 * @property registrations a bare var() interpolates over), the `tokens/scheme-motion.css`
 * --motion-weight × --ease-cartoon-punch motion grammar, the `tokens/shadow.css` cartoon
 * cast rungs, the `tokens/dark-arm.css` dark-mode arms, the `tokens/glass.css` squish/tint
 * axes, and the `tokens/glass-fx.css` / `tokens/scale-paper.css` page-chassis registers —
 * all custom-property registers the chrome reads at first paint. The ONE borderline
 * residual is `glass/liquid-enter.css` (a late-mount entrance @keyframes recipe, ~3.7KiB
 * gzip) which rides `glass.css` over its `reveal.css` `--lq-enter-*` substrate; carving it
 * to a deferred top-level partial is a structural cascade-order change reserved for the
 * named BB.W-CSS-CRITICAL-INLINE successor (a triumvirate trigger, NOT a token-edit here),
 * and it recovers only ~3.7KiB — the bucket would still sit ~170KiB, well over the old
 * 156000. The critical subset is 49.5% of the settled monolith's resolved gzip — the
 * spec's ~46% small-above-the-fold-subset bar HELD over the settled cascade. Ceiling
 * re-pinned 156000 → 182000 (~4.5% headroom over the measured 174231, the profile-bundle
 * re-base convention — the reviewed write, NEVER a silent component-recipe swallow). The
 * render-block FLOOR stays W-LIGHTHOUSE's W3-arm-1 mobile-ms gate (the binding perf truth);
 * this ceiling guards against a recipe revert-toward-monolith.
 */
export const CRITICAL_GZIP_CEILING = 182000;
