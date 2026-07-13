import type { HTMLAttributes } from "vue";
import type { Surface } from "../../ui/_shared/useSurfaceAxis";
import type { ChipVariants } from "./chipVariants";

/**
 * ChipProps — the public prop contract of the folded `<Chip>` (BI.W-CHIP-FOLD).
 * The chip-specific surface; the reka `Toggle` contract (`modelValue` /
 * `defaultValue` / `pressed` / `disabled` …) composes ON TOP via `v-model` and is
 * documented by the reka `Toggle` primitive. `<Chip>` unifies the retired
 * ToggleChip (`shape`, the plain warm-floor toggle) + SelectableChip (`tone`, the
 * contrast-floored tonal-accent register) onto ONE surface.
 */
export interface ChipProps {
    /**
     * The silhouette shape — `pill` (default, the stadium capsule; the retired
     * ToggleChip `variant="chip"`) | `cell` (the square icon+label tile; the
     * retired `variant="cell"`). A SILHOUETTE word, not a scale rung.
     */
    shape?: ChipVariants["shape"];
    /** The structural size rung — `sm` | `md` (default) | `lg`. */
    size?: ChipVariants["size"];
    /**
     * The accent COLOUR identity — a complete `<color>` (e.g.
     * `var(--section-color-7)` or a concrete `oklch(…)`). OPT-IN: unset ⇒ the plain
     * warm-floor glass toggle (the ToggleChip register). Set ⇒ the tonal-accent
     * register — the per-instance plate hue + the contrast-safe INK label (the
     * SelectableChip register). The SEMANTIC choice is a prop; the strength
     * MAGNITUDES are tokens (no over-prop).
     */
    tone?: string;
    /**
     * The shared {glass·veil·opaque} surface-decoration axis (BA.W-SURFACE-AXIS).
     * OPT-IN: unset ⇒ the capsule's own glass material (byte-identical default).
     * Set ⇒ binds `:data-surface`, and the shared `surface-axis.css` seam applies
     * the veil/opaque decoration UNIFORMLY.
     */
    surface?: Surface;
    class?: HTMLAttributes["class"];
}
