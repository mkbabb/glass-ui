<script setup lang="ts">
import type { HTMLAttributes, Component } from "vue";
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { coalesceMetric, type MetricValue } from "../metric/coalesce-metric";

/**
 * MetricRow — a single row inside <MetricStack>.
 *
 * Reads three subgrid tracks from the parent stack: icon | label | value.
 * The value track carries a baseline-aligned inline group of value + unit
 * so the row reads "240 Mbps" as one typographic lockup, not two grid
 * cells. The optional description slot promotes to a full-row block at
 * `@container metric-stack (min-width: 32rem)`.
 *
 * Owns:
 *  - the audacious-poster value clamp (`clamp(4.5rem, 34cqi × 3/max(3,
 *    --digit-count), --type-display-hero)`) — consumers pass digitCount so
 *    4-digit values shrink proportionally and stay inside the column.
 *  - the tabular-nums + ss01 + lnum font-feature register on the value
 *    cell so digits sit on tabular metrics regardless of consumer typography.
 *  - the optional `aura` slot host: the slot sits at `position: absolute;
 *    inset: 0` inside `.metric-row__value`, with the host marked
 *    `position: relative`. Consumers compose <Pulse variant="aura"> there
 *    when the row is the active metric.
 *  - per-row tint via `--phase-color` (inline style on `.metric-row` — set
 *    by the consumer per metric) cascading to value + unit when
 *    `data-color-tinted="true"`.
 *
 * AC.W6d — promoted from speedtest/ResultStack.vue's `.result-row` block.
 * Consumers stop hand-rolling the subgrid + clamp + aura host CSS and
 * instead pass props.
 */

export interface MetricRowProps {
    /**
     * Optional lucide icon component (e.g. `MoveDown`). Renders inside
     * the icon track at 16×16 by default. Pass `null` to omit; the
     * slot named `icon` overrides.
     */
    icon?: Component | null;
    /** Stroke width for the lucide icon. */
    iconStrokeWidth?: number;
    /** Icon pixel size — defaults to 16. */
    iconSize?: number;
    /** Label text — reads through the label slot when set. */
    label?: string;
    /** Value text (the audacious-poster hero number). A valid `0` renders
     *  `"0"`, never the placeholder. */
    value?: MetricValue;
    /** Unit suffix — reads through the unit slot when set. */
    unit?: string;
    /** Placeholder glyph when value is empty/null. Defaults to "—" (the shared
     *  `coalesceMetric` default). */
    placeholder?: string;
    /**
     * Per-row phase colour. Sets `--phase-color` inline so descendant
     * tints (value, unit, aura) consume the colour through the cascade.
     * Consumers that wire tints through Tailwind tokens may pass
     * `var(--chart-download)` etc.
     */
    phaseColor?: string;
    /**
     * Digit-count knob for the value clamp. The value cell shrinks as
     * `3 / max(3, digitCount)` so 4-digit values still fit the cell.
     * Pass the rendered string length; defaults to 3.
     */
    digitCount?: number;
    /**
     * When `true`, descendant value + unit promote from the neutral
     * `--foreground` colour to `var(--phase-color)`. Drives the
     * post-complete colour-tint cascade.
     */
    colorTinted?: boolean;
    /**
     * When `true`, the `aura` slot becomes visible. Consumers wire
     * this to their active-row gating (e.g. the metric being sampled).
     */
    active?: boolean;
    /**
     * BC.W-CONTROL-CUSTOM (CP1, the speedtest-AX `data-protagonist` fold) —
     * marks this row as the ONE focal/protagonist metric per surface. When
     * `true`, the value lifts to the emphasis register (the heavier
     * `--metric-row-value-weight-emphasis` rung) and a `data-protagonist`
     * attribute lands on the row so a consumer can re-tint the focal metric.
     *
     * This is the ONE focal emphasis event per surface (the W-SUFFUSE
     * one-color-event proportion) — exactly one row per <MetricStack> should
     * be the protagonist. The magnitude stays a `--metric-row-*` token read
     * with a fallback, so a `:root`/per-row override of the emphasis weight
     * cascades. A bare (`protagonist`-unset) row is byte-identical.
     */
    protagonist?: boolean;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MetricRowProps>(), {
    iconSize: 16,
    iconStrokeWidth: 2,
    digitCount: 3,
    colorTinted: false,
    active: false,
    protagonist: false,
});

// AZ.W-METRIC-UNIFY — the shared value core (the ONE empty-check + the "—"
// default). A valid `0` renders "0", never the placeholder.
const displayValue = computed(
    () => coalesceMetric(props.value, props.placeholder).display,
);

// BB.W-CONTROL-TOKENS (METRIC) — the leading glyph reads
// `--metric-row-icon-color` (CSS, see `.metric-row__icon`). For byte-identical
// back-compat, the per-row `phaseColor` prop seeds the token here (the prior
// inline `color: phaseColor` becomes a token write), so today's consumers paint
// exactly as before; a consumer wanting a DISTINCT icon ink from the phase tint
// sets `--metric-row-icon-color` from its OWN stylesheet (`:root`/parent/per-row)
// with no `:deep()` reach. When `phaseColor` is unset the token is unset and the
// CSS fallback (`inherit`) keeps the icon on the inherited cascade — unchanged.
const rowStyle = computed(() => ({
    ...(props.phaseColor ? { "--phase-color": props.phaseColor } : {}),
    ...(props.phaseColor ? { "--metric-row-icon-color": props.phaseColor } : {}),
    "--digit-count": String(props.digitCount),
}));
</script>

<template>
    <div
        :class="cn('metric-row', 'result-row', $props.class)"
        :data-color-tinted="colorTinted ? 'true' : 'false'"
        :data-row-active="active ? 'true' : 'false'"
        :data-protagonist="protagonist ? 'true' : undefined"
        :style="rowStyle"
    >
        <slot name="icon">
            <component
                :is="icon"
                v-if="icon"
                class="metric-row__icon result-icon"
                :size="iconSize"
                :stroke-width="iconStrokeWidth"
                aria-hidden="true"
            />
        </slot>
        <slot name="label">
            <span class="metric-row__label result-label">{{ label }}</span>
        </slot>
        <span class="metric-row__value result-value tabular-nums">
            <slot name="aura" />
            <span class="metric-row__value-text relative">
                <slot name="value">{{ displayValue }}</slot>
            </span>
            <slot name="unit">
                <span
                    v-if="unit"
                    class="metric-row__unit result-unit font-mono italic text-muted-foreground"
                    >{{ unit }}</span
                >
            </slot>
        </span>
        <slot name="description" />
    </div>
</template>

<style scoped>
/* Subgrid inheritance — the row reads the parent stack's 3 tracks.
   `grid-template-rows: auto auto` opens row 2 for the optional
   description slot; `grid-auto-flow: row dense` lets the description
   self-promote to a full-row span without re-ordering the row-1 trio. */
.metric-row {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: auto auto;
    grid-auto-flow: row dense;
    grid-column: 1 / -1;
    padding-block: clamp(0.125rem, 0.5cqi, 0.5rem);
    min-width: 0;
}

.metric-row > .metric-row__icon,
.metric-row > .metric-row__label,
.metric-row > .metric-row__value {
    align-self: baseline;
    grid-row: 1;
}

/* AE.W1 Cluster A — the label clamp routes through the same
   `--metric-row-label-clamp-{min,cqi,max}` token family as the value
   clamp. In the compact `result` register the label — not the value —
   is the binding row-height term (uppercase + a tall line-box), so a
   consumer that opts the value register down must be able to tame the
   label in lockstep. Defaults live in tokens.css §17 METRIC (the
   audacious-poster register); MetricStack's `[data-register="result"]`
   selector retunes them register-locally. */
.metric-row__label {
    text-transform: uppercase;
    /* BB.W-CONTROL-TOKENS (METRIC) — the label alignment is a consumer knob.
       Default `left` is byte-identical to today; a cert-grid consumer building a
       labelled ledger sets `--metric-row-label-align: right` at `:root`/per-row
       for a right-aligned fixed seam, WITHOUT a `:deep(.metric-row__label)` reach
       (the Design-Axis-2 component-over-class bar). The token-with-fallback is
       the ONLY `text-align` declaration on this rule so the override always wins
       (no hardcoded shadowing). */
    text-align: var(--metric-row-label-align, left);
    font-size: clamp(
        var(--metric-row-label-clamp-min),
        calc(
            var(--metric-row-label-clamp-cqi) *
                var(--result-row-scale, 1)
        ),
        var(--metric-row-label-clamp-max)
    );
    letter-spacing: 0.18em;
    font-weight: 500;
    color: var(--muted-foreground);
    white-space: nowrap;
}

/* Audacious-poster value register. `--digit-count` shrinks the clamp
   proportionally as digits accrue. The text-align is left so the value
   sits at the LEFT edge of its track (reading order: label → value →
   unit). The aura slot mounts at position: absolute; the host is
   relative so the inset resolves locally.

   P.W5 Lane E.3 (substrate extension): the clamp endpoints route through
   `--metric-row-value-clamp-{min,max}` tokens so consumers shrinking the
   register (e.g. words/frontend's compact metric cells targeting
   text-title…text-4xl ≈ 1.5rem…2.25rem) can retint at `:root` or per-row
   without forking the SFC.

   AE.W1 Cluster A: the clamp's MIDDLE arm — the `cqi` coefficient — is
   the BINDING term against a wide container (~34cqi of a ~660px stack
   resolves to ~225px, defeating any consumer that only retunes the
   endpoints). The `--metric-row-value-clamp-cqi` token routes that
   coefficient too, so a consumer can opt the whole register down.

   Q.W4 Lane A: the full `--metric-row-*-clamp-*` family is declared in
   tokens.css §17 METRIC (audacious-poster register defaults); this
   recipe consumes them bare. */
.metric-row__value {
    --digit-count: 3;
    position: relative;
    /* D7 — value + unit conjoin into ONE baseline-aligned inline group
       inside this single track, so "240" + "Mbps" reads as one lockup
       rather than two grid cells. `gap` is the hairline between number
       and unit. */
    display: inline-flex;
    align-items: baseline;
    gap: var(--metric-row-value-unit-gap, 0.25em);
    font-size: clamp(
        var(--metric-row-value-clamp-min),
        calc(
            var(--metric-row-value-clamp-cqi) *
                var(--result-row-scale, 1) * 3 /
                max(3, var(--digit-count))
        ),
        var(--metric-row-value-clamp-max)
    );
    line-height: 0.95;
    /* BC.W-CONTROL-CUSTOM (CP1) — the value weight reads
       `--metric-row-value-weight` (default 400, byte-identical). The
       `[data-protagonist]` rule below lifts it to the emphasis register
       (`--metric-row-value-weight-emphasis`) — token-first, so a consumer
       retunes either rung from `:root`/per-row. */
    font-weight: var(--metric-row-value-weight, 400);
    letter-spacing: var(--type-tracking-tight);
    font-feature-settings: "ss01", "tnum", "lnum";
    font-variant-numeric: tabular-nums lining-nums;
    color: var(--foreground);
    transition: color var(--duration-fast) var(--ease-standard);
    text-align: left;
    min-width: 0;
}

/* The unit is now an inline member of the value lockup, baseline-aligned
   against the number. It keeps its own (smaller) clamp so it reads a
   tier below the value it qualifies. */
.metric-row__unit {
    font-size: clamp(
        var(--metric-row-unit-clamp-min),
        calc(6cqi * var(--result-row-scale, 1)),
        var(--metric-row-unit-clamp-max)
    );
    line-height: 1;
    font-weight: 500;
    color: var(--muted-foreground);
    transition: color var(--duration-fast) var(--ease-standard);
    white-space: nowrap;
}

/* AJ-W1-γ-pub — split the VALUE / UNIT color cascade so consumers can
   demote the unit register independently of the value register. The
   default for both stays `var(--phase-color)` so existing single-rung
   consumers (words/frontend metric cells, plus the prior speedtest
   complete-state ResultStack) continue to read the unified colour —
   ZERO breakage for any consumer that doesn't set the new knob.

   Speedtest's W1-γ ResultStack consumer sets
   `--metric-row-unit-color: var(--muted-foreground)` inline to restore
   the canon UNIT rung (DESIGN.md §1387-1389 — LABEL desaturated, VALUE
   saturated, UNIT muted-foreground italic). Future consumers that want
   the analogous value-register override can opt into
   `--metric-row-value-color` per the same cascade-variable contract. */
.metric-row[data-color-tinted="true"] .metric-row__value {
    color: var(--metric-row-value-color, var(--phase-color));
}

.metric-row[data-color-tinted="true"] .metric-row__unit {
    color: var(--metric-row-unit-color, var(--phase-color));
}

/* BC.W-CONTROL-CUSTOM (CP1, the speedtest-AX `data-protagonist` fold) — the
   focal/protagonist metric lifts to the EMPHASIS register: the value weight rises
   to `--metric-row-value-weight-emphasis` (default 650, a heavier rung than the
   bare 400) — token-first, reading the EXISTING `--metric-row-*` cohort, no new
   magnitude register beyond the emphasis rung. A `:root`/per-row override of
   either weight token cascades. This is the ONE focal emphasis event per surface
   (the W-SUFFUSE one-color-event proportion — exactly one protagonist row per
   stack); a bare (un-protagonist) row is byte-identical (weight unchanged). */
.metric-row[data-protagonist="true"] .metric-row__value {
    font-weight: var(--metric-row-value-weight-emphasis, 650);
}

.metric-row__icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    /* BB.W-CONTROL-TOKENS (METRIC) — the leading-glyph ink is a consumer knob
       (the MetricCell `iconColor`→IconChip precedent, mirrored here as a token
       since MetricRow ships a raw `<component :is>` not an IconChip). The
       `phaseColor` prop seeds `--metric-row-icon-color` inline (rowStyle) for
       byte-identical back-compat; the fallback `inherit` keeps an un-tinted icon
       on the inherited cascade. A consumer wanting a distinct icon ink overrides
       `--metric-row-icon-color` with no `:deep(.metric-row__icon)` reach. */
    color: var(--metric-row-icon-color, inherit);
}

/* Description slot promotion at ≥ 32rem container width. The slot
   self-paints (consumers provide `<MetricRow><template #description>
   {{ m.description }}</template></MetricRow>`); the primitive just
   reserves grid row 2 + the promotion gate. */
.metric-row :slotted(.metric-row__description),
.metric-row :slotted(.result-description) {
    display: none;
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: var(--type-small);
    color: var(--muted-foreground);
    line-height: 1.4;
    margin-block-start: 0.125rem;
}

@container metric-stack (min-width: 32rem) {
    .metric-row :slotted(.metric-row__description),
    .metric-row :slotted(.result-description) {
        display: block;
    }
}
</style>
