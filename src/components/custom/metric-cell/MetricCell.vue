<script setup lang="ts">
import type { Component, FunctionalComponent, HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn, coalesceMetric, type MetricValue } from "../../../utils";

/**
 * Permissive icon type — Vue's `Component` type ships across multiple
 * package boundaries (vue / @vue/runtime-core duplication when consumers
 * symlink-resolve through workspace links). Accept the structural shape
 * a Vue render expression handles: any `Component`, `FunctionalComponent`,
 * or a generic object/function. The `<component :is>` binding receives
 * the value transparently.
 */
type IconLike = Component | FunctionalComponent | object | null;

/**
 * MetricCell — compact metric card (icon-on-label, stacked value + unit) on
 * a wash-tier glass surface.
 *
 * AC.W8e (glass-ui v1.7.0) — promoted from speedtest's
 * `<ResultDetailSheet>` 4-card grid (download / upload / ping / jitter).
 * The original consumer had the same 11-class string repeated four times:
 *
 *     <div class="glass-wash rounded-lg p-3">
 *         <div class="text-micro text-muted-foreground flex items-center gap-1.5">
 *             <component :is="icon" :size="14" :stroke-width="2" />
 *             <span>Download</span>
 *         </div>
 *         <div class="text-mono-prose font-semibold tabular-nums">
 *             {{ fmt(row.download, "Mbps") }}
 *         </div>
 *     </div>
 *
 * The shape is generic enough that any dashboard / detail-sheet / summary
 * surface composing icon + label + value + unit on a tile hits the same
 * gestalt; the primitive collapses the 4-site duplication onto one consume.
 *
 * Owns:
 *  - the wash-tier surface (`.glass-wash rounded-lg p-3`) by default; the
 *    `appearance="bare"` variant drops the surface for consumers that host
 *    the cell inside a larger panel.
 *  - the label row (`.text-micro .text-muted-foreground flex items-center
 *    gap-1.5`) with icon prefix + label text.
 *  - the value row (`.text-mono-prose .font-semibold .tabular-nums`) with
 *    optional unit suffix.
 *  - tabular-numeric digit metrics + lining figures via `tabular-nums`.
 *
 * The `compact` appearance trades `text-mono-prose` for `text-mono-caption`
 * + smaller padding so the cell composes inside dense grids.
 */

export type MetricCellAppearance = "dashboard" | "compact" | "bare";

export interface MetricCellProps {
    /**
     * Optional lucide icon component. Renders at 14px stroke-2 inside
     * the label row. Pass `null` to omit; the `icon` slot overrides.
     */
    icon?: IconLike;
    /** Stroke width for the lucide icon. Defaults to 2. */
    iconStrokeWidth?: number;
    /** Icon pixel size — defaults to 14 (matches `text-micro` cap height). */
    iconSize?: number;
    /**
     * Optional accent colour for the LEADING GLYPH ONLY (e.g. a semantic
     * `var(--chart-download)` viz colour). Tints the icon — the one
     * deliberate colour event for the cell — while the label, value, and unit
     * stay neutral ink (the one-color-event proportion rule, AZ.W-SUFFUSE D3).
     * Unset (default) keeps the glyph the neutral `--muted-foreground` of the
     * label row.
     */
    iconColor?: string;
    /** Label text — reads through the `label` slot when set. */
    label?: string;
    /** Value — primary metric. Reads through the `value` slot when set. A valid
     *  `0` renders `"0"`, never the placeholder. */
    value?: MetricValue;
    /** Unit suffix appended after the value (e.g. "Mbps", "ms"). */
    unit?: string;
    /** Placeholder glyph when value is empty/null. Defaults to em-dash (the
     *  shared `coalesceMetric` default). */
    placeholder?: string;
    /**
     * Visual register.
     * - `dashboard` (default) — wash-tier surface, `text-mono-prose`
     *   value, `p-3`.
     * - `compact` — wash-tier surface, `text-mono-small` value, `p-2`.
     * - `bare` — no surface, no padding; the cell composes inside a
     *   pre-styled host.
     */
    appearance?: MetricCellAppearance;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MetricCellProps>(), {
    iconSize: 14,
    iconStrokeWidth: 2,
    appearance: "dashboard",
});

const rootClass = computed(() => {
    switch (props.appearance) {
        case "compact":
            return "glass-wash rounded-lg p-2";
        case "bare":
            return "";
        default:
            return "glass-wash rounded-lg p-3";
    }
});

const valueClass = computed(() => {
    switch (props.appearance) {
        case "compact":
            return "text-mono-small font-semibold tabular-nums";
        default:
            return "text-mono-prose font-semibold tabular-nums";
    }
});

// AZ.W-METRIC-UNIFY — the shared value core (the ONE empty-check + the "—"
// default). A valid `0` renders "0", never the placeholder.
const displayValue = computed(
    () => coalesceMetric(props.value, props.placeholder).display,
);
</script>

<template>
    <div
        :class="cn('metric-cell', rootClass, $props.class)"
        :data-appearance="appearance"
    >
        <div
            class="metric-cell__label text-micro text-muted-foreground flex items-center gap-1.5"
        >
            <slot name="icon">
                <component
                    :is="icon"
                    v-if="icon"
                    :size="iconSize"
                    :stroke-width="iconStrokeWidth"
                    :style="iconColor ? { color: iconColor } : undefined"
                    aria-hidden="true"
                />
            </slot>
            <slot name="label">
                <span>{{ label }}</span>
            </slot>
        </div>
        <div :class="['metric-cell__value', valueClass]">
            <slot name="value">{{ displayValue }}</slot>
            <template v-if="unit">
                <span class="metric-cell__unit"> {{ unit }}</span>
            </template>
        </div>
    </div>
</template>
