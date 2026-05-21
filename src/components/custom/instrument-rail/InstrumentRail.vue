<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/**
 * <InstrumentRail> — flex-basis cockpit-ratio rail with bezel hairlines
 * and an internal twin-line divider rule between children.
 *
 * Resolves A3 D-4 (cockpit ratio 0.222 → 0.382, the 1/φ² golden gestalt)
 * by carrying the ratio as a typed flex-basis term with min/max clamp
 * safety. Composes inside <InstrumentChassis> alongside a primary panel,
 * or stands alone as the sidekick column of any cockpit composition.
 *
 * Geometry:
 *   - `variant="vertical"` (default) — rail is a column; flex-basis binds
 *     against the parent's main-axis width. min-width 15rem, max-width 28rem.
 *   - `variant="horizontal"` — rail is a row; flex-basis binds against the
 *     parent's main-axis height. min-height 15rem, max-height 28rem.
 *
 * Bezel character:
 *   - `bezelHairlines="true"` (default) draws the engraved-bezel ::before
 *     inner stroke, the same twin-pixel signature that <InstrumentChassis>
 *     carries (catch-light + under-shadow). Resolves FD1 TRANSPOSITION 3's
 *     internal-divider concern by giving the rail its own bezel edge so
 *     it reads as a chassis-internal module, not an unbordered slot.
 *   - `dividerRule="true"` (default) renders a twin-line hairline groove
 *     above every child after the first via the bezel-line idiom (same
 *     `rgb(255 255 255 / α)` + `rgb(0 0 0 / α)` pair the chassis-divider
 *     primitive uses). Sibling-CSS — no slotted dividers needed.
 *
 * Slots:
 *   - default — rail children, stacked along the variant axis.
 *   - `status` — bezel-edge status-light region; pinned to the rail's
 *     opening edge (top for vertical, leading for horizontal). Optional;
 *     omitted slots emit no markup.
 *
 * a11y: layout primitive; emits no ARIA role by default. Consumers compose
 * semantic landmarks (<aside>, <nav>) by wrapping or by passing `as`.
 *
 * PRM: no animation — the primitive is purely geometric. PRM cascades
 * through children (they own their own animation contracts).
 *
 * AK-W2-α — see A3 §8.T-1 + FD1 TRANSPOSITION 6 + G-AK-D9.
 */

export interface InstrumentRailProps {
    /**
     * Rail axis. `"vertical"` (default) stacks children top-to-bottom and
     * binds flex-basis on the inline axis (column rail of a row cockpit).
     * `"horizontal"` stacks left-to-right and binds flex-basis on the
     * block axis (row rail of a column cockpit).
     */
    variant?: "vertical" | "horizontal";
    /**
     * Cockpit ratio — flex-basis fraction of the parent flex container.
     * Defaults to 0.382 (1/φ², the golden-gestalt cockpit ratio per A3
     * §8.T-1). Consumers may pass any ratio in (0, 1); the rail clamps
     * the realised width via `min-width`/`max-width` so a degenerate
     * value still hits a readable register.
     */
    ratio?: number;
    /**
     * Toggle the engraved-bezel ::before inner stroke. Default `true`.
     * Disable when the rail is composed inside another bezel-bearing
     * surface that already carries the stroke (avoid double bezels).
     */
    bezelHairlines?: boolean;
    /**
     * Toggle the internal twin-line divider rule between sibling
     * children. Default `true`. Disable when children carry their own
     * dividers or when a flush composition is desired.
     */
    dividerRule?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<InstrumentRailProps>(), {
    variant: "vertical",
    ratio: 0.382,
    bezelHairlines: true,
    dividerRule: true,
});

const classes = computed(() => cn("instrument-rail", props.class));

const railStyle = computed(() => ({
    "--instrument-rail-ratio": String(props.ratio),
}));
</script>

<template>
    <aside
        :class="classes"
        :data-variant="variant"
        :data-bezel-hairlines="bezelHairlines ? '' : null"
        :data-divider-rule="dividerRule ? '' : null"
        :style="railStyle"
    >
        <header v-if="$slots.status" class="instrument-rail-status">
            <slot name="status" />
        </header>
        <slot />
    </aside>
</template>
