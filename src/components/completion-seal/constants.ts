// BC.W-AX-COMPLETION-SEAL — the completion-seal primitive constants.
//
// The colocation-home for the seal glyph defs + the spring register choice (the
// AY.W-COLOCATE convention — a feature-dir carries its magic numbers in `constants.ts`,
// not as module-scope `const N = <number>` in the composables, so `proof:colocation`
// clause (b) holds). Every visual axis is a CSS custom property a consumer retunes
// (token-first — the gold ink is the W-PHASE-PALETTE register, the glint the
// W-AX-METAL-GLOW catch-light, the springs the SPRING-EASE clock); these are the
// JS-side glyph geometry the SFC renders.

/**
 * The seal glyph axis — the mark the gold stroke draws:
 *  - `check` (default) — a checkmark (the canonical "done" garnish).
 *  - `ring`  — a ring/circle around the completion (a seal around the event).
 *  - `disc`  — the composed earned-coin gesture: a filled gold disc FACE with the ring
 *    stroke-draw affirmation around it and the check draw-in inside, SEQUENCED
 *    disc→ring→check (the hero completion coin — BG.W-SEAL-DISC / SPEEDTEST-AX #1).
 *  - `wordmark` — a self-contained seal mark (a stylized seal glyph).
 *
 * `check`/`ring`/`wordmark` share the ONE gold-draw mechanism (the `--seal-draw`
 * stroke-reveal on the `--seal-ink` gold stroke) — a `shape`-scoped path, NOT a second
 * recipe. `disc` COMPOSES that same mechanism across three layers (the disc face fades
 * in, then the ring RE-USES the ring geometry to draw around, then the check RE-USES the
 * check path to draw in) — no fourth recipe, the layers stagger on animation-delay off
 * the `--seal-ring-delay`/`--seal-check-delay` seam. The seal is the GOLD-DRAW completion
 * register, distinct from the HandMark hand-voice family.
 */
export type CompletionSealShape = "check" | "ring" | "disc" | "wordmark";

/** The default seal glyph — the checkmark "done" garnish. */
export const COMPLETION_SEAL_DEFAULT_SHAPE: CompletionSealShape = "check";

/**
 * The normalized SVG viewBox the glyphs are authored in. The mark `pathLength="100"`
 * normalizes every glyph's draw length so the `stroke-dashoffset` wipe is path-agnostic
 * (the recipe reads `--seal-draw` 0..100% against the normalized length).
 */
export const COMPLETION_SEAL_VIEWBOX = "0 0 64 64";

/**
 * The per-shape SVG path/element the gold stroke draws. `check`/`wordmark` are <path>
 * `d`-strings; `ring` is drawn as a <circle> and `disc` COMPOSES the ring geometry + the
 * check path (the SFC branches on shape), so neither authors its own path here. Authored
 * in the 64×64 viewBox, `pathLength="100"` normalized at the element.
 */
export const COMPLETION_SEAL_PATHS: Record<
    Exclude<CompletionSealShape, "ring" | "disc">,
    string
> = {
    // The checkmark — a clean two-segment tick centred in the box.
    check: "M16 33 L28 45 L48 19",
    // The wordmark seal — a stylized banner-check (a tick over an underscore sweep).
    wordmark: "M14 30 L26 42 L50 16 M14 50 L50 50",
};

/**
 * The `ring` glyph geometry (a <circle>) — the centre + radius in the 64×64 viewBox.
 * A near-perimeter ring so the seal reads hero-scale. The `disc` shape REUSES this same
 * circle for its stroke-draw affirmation ring (one geometry, two reads).
 */
export const COMPLETION_SEAL_RING = { cx: 32, cy: 32, r: 24 } as const;

/**
 * The `disc` glyph FACE geometry (a filled <circle>) — the earned-coin face the ring
 * draws around. Inset 3px inside the ring radius so the drawn ring reads as a clean rim
 * around the coin (the disc→ring→check gesture: face → rim → mark). The check path
 * (COMPLETION_SEAL_PATHS.check) fits inside this radius.
 */
export const COMPLETION_SEAL_DISC = { cx: 32, cy: 32, r: 21 } as const;

/**
 * The SPRING register the draw rides (SPRING-EASE / W-MOTION-CANON P2 enter-bouncy):
 *  - the SETTLE leg (the spatial overshoot) rides `--spring-bouncy` (an ENTER may
 *    overshoot on arrival);
 *  - the DRAW + GLINT legs ride the `--spring-snappy` CLOCK (the snappy settle duration)
 *    so the gold inks crisply, not languidly.
 * The seal mints NO new spring token — it READS the SPRING-EASE register (the no-new-clock
 * fence). These names are the recorded register choice; the actual curves live in the
 * cascade (tokens/scheme-motion.css) and the recipe (completion-seal.css) reads them.
 */
export const COMPLETION_SEAL_SETTLE_SPRING = "--spring-bouncy";
export const COMPLETION_SEAL_DRAW_SPRING = "--spring-snappy";
