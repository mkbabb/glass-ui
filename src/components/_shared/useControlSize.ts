// _shared/useControlSize.ts — the ONE shared control-SIZE axis the input
// register (Input / Switch / Textarea / NumberFieldInput) threads
// (BC.W-CONTROL-CUSTOM).
//
// The size prop SELECTS a rung of the EXISTING `--control-h-*` / `--control-text`
// cohort (tokens/sizing.css §control) — the SAME cohort Button/Badge/NumberField
// already read. It does NOT mint a new magnitude register: the prop chooses WHICH
// rung, the absolute height/font stay the `--control-*` tokens so a consumer still
// retunes them from `:root` (the DON'T-over-prop / token-beats-prop fence).
//
// The ONLY indirection this seam mints is the `--control-pill-h` / `--control-pill-
// text` element-override pair: `controlSizeClass(size)` re-points them per rung,
// and the `.input-pill` recipe (glass/surfaces.css) reads `var(--control-pill-h,
// var(--control-h-md))` / `var(--control-pill-text, var(--control-text))` — so a
// bare control (size unset / "md") is byte-identical to HEAD (the override is
// absent, the cohort default wins), and a `size="lg"`/`"sm"` retunes the height +
// font on the cohort. ONE substitution rung, no recipe fork (the same
// substitution-over-redeclaration discipline `--glass-bg-dock`/`--dock-scale`
// teach).

/**
 * The shared control-size axis — three rungs, ONE grammar. The meaningful
 * control-size hierarchy rungs the input register needs (Button's `xs`/icon rungs
 * are Button-specific — an input has no icon-only register, so they are NOT here).
 *
 *   sm      — the quieter/secondary control: the `--control-h-sm` height +
 *             `--control-text-sm` font (shorter + quieter).
 *   md      — the canonical golden pill: the `--control-h-md` height +
 *             `--control-text` font (byte-identical to HEAD).
 *   lg      — the primary/emphatic control: the `--control-h-lg` height with the
 *             base `--control-text` font (taller, same workhorse weight — matching
 *             Button's `lg`, where only the height grows).
 */
export type ControlSize = "sm" | "md" | "lg";

/**
 * Resolve a `ControlSize` to the element-level token-override class string the
 * `.input-pill` recipe reads. The `md` rung emits NO override (so the recipe
 * falls back to the cohort `--control-h-md` / `--control-text` — byte-identical to
 * HEAD); `sm`/`lg` re-point `--control-pill-h` / `--control-pill-text` to the
 * chosen cohort rung.
 *
 *   controlSizeClass()        → ""                                              (golden md rung)
 *   controlSizeClass("sm")    → "[--control-pill-h:var(--control-h-sm)] [--control-pill-text:var(--control-text-sm)]"
 *   controlSizeClass("lg")    → "[--control-pill-h:var(--control-h-lg)]"
 *
 * @param size the control-size rung (`sm` · `md` · `lg`)
 */
export function controlSizeClass(size: ControlSize = "md"): string {
    if (size === "sm")
        return "[--control-pill-h:var(--control-h-sm)] [--control-pill-text:var(--control-text-sm)]";
    if (size === "lg") return "[--control-pill-h:var(--control-h-lg)]";
    return "";
}

/**
 * The Switch geometry rung. A Switch is a control-height-DERIVED geometry (the
 * track/thumb/throw are NOT the bare cohort height — a switch track is shorter
 * than an input), so it derives its `--switch-track-h` from the chosen
 * `--control-h-*` rung (×0.6, the iOS proportion) and the rest of the
 * `--switch-*` quad follows in Switch.vue:
 *
 *   --switch-thumb   = --switch-track-h − 0.25rem   (the 2px×2 track border)
 *   --switch-track-w = --switch-track-h × 11/6      (the iOS track aspect)
 *   --switch-throw   = --switch-track-w − --switch-thumb − 0.25rem
 *
 * The `md` rung (`--control-h-md`) resolves the HEAD `h-6 w-11` track +
 * `h-5 w-5` thumb + `translate-x-5` throw EXACTLY (byte-identical). `sm`/`lg`
 * re-point the anchor `--switch-track-h` so the whole quad scales in lockstep.
 *
 * @param size the control-size rung (`sm` · `md` · `lg`)
 */
export function switchSizeClass(size: ControlSize = "md"): string {
    if (size === "sm")
        return "[--switch-track-h:calc(var(--control-h-sm)*0.6)]";
    if (size === "lg")
        return "[--switch-track-h:calc(var(--control-h-lg)*0.6)]";
    return "";
}
