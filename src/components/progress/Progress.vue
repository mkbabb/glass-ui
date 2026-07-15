<script setup lang="ts">
import { type HTMLAttributes, watchEffect } from "vue";
import type { ProgressRootProps } from "reka-ui";
import ProgressDefault from "./ProgressDefault.vue";
import ProgressGradient from "./ProgressGradient.vue";
import ProgressLiquid from "./ProgressLiquid.vue";
import ProgressSectioned from "./ProgressSectioned.vue";
import type { ProgressSegment } from "./useProgressGeometry";

type ProgressVariant = "default" | "gradient" | "liquid" | "sectioned";

/**
 * Progress — the thin variant dispatcher over four orthogonal designs:
 *   - `default`   → ProgressDefault   (plain rail + translateX intake-pulse)
 *   - `gradient`  → ProgressGradient  (lifecycle motion grammar + indeterminate)
 *   - `liquid`    → ProgressLiquid    (the shared .glass-liquid-fill glass cylinder;
 *                                      the phase-colour meter — BG.W-LIQUID-FILL)
 *   - `sectioned` → ProgressSectioned (phase-bus cells + spring active fill)
 *
 * The dispatcher carries an EXPLICIT prop-boundary contract: incompatible prop
 * combinations are refused OUT LOUD (a dev throw) rather than silently producing
 * a wrong paint. The historical break this closes: a consumer passing
 * `:model-value` to the sectioned variant had it SILENTLY overridden by the
 * cumulative cell-fill aggregate, so the bar ignored the value the consumer
 * thought drove it. The contract below makes that misuse a loud error — the
 * sectioned variant derives its own a11y value from the cells; `modelValue` is
 * not its truth.
 */
const props = withDefaults(
    defineProps<
        ProgressRootProps & {
            class?: HTMLAttributes["class"];
            /**
             * 'default'   = bg-secondary rail + bg-primary indicator.
             * 'gradient'  = rail respects --progress-track; indicator respects
             *               --progress-fill; the W4 lifecycle motion grammar layers on.
             * 'liquid'    = the shared .glass-liquid-fill glass-cylinder meter
             *               (BG.W-LIQUID-FILL) — the fill tints off --progress-fill
             *               (or --liquid-fill-tint) with zero per-site glass knowledge.
             * 'sectioned' = phase-bus (AB.W3.T2). N colour-coded cells with gradient
             *               seams; the active cell carries a spring fill. The per-cell
             *               state map is the truth — NOT `modelValue`.
             */
            variant?: ProgressVariant;
            /** Sectioned only — ordered segment list. */
            segments?: ProgressSegment[];
            /** Sectioned only — key of the currently active segment. */
            currentSegmentKey?: string | null;
            /** Sectioned only — 0..1 fill of the active segment. */
            activeProgress?: number;
            /** Gradient only — indeterminate sweep opt-in. */
            indeterminate?: boolean;
        }
    >(),
    {
        modelValue: 0,
        variant: "default",
        segments: () => [],
        currentSegmentKey: null,
        activeProgress: 0,
        indeterminate: false,
    },
);

// ── Prop-boundary contract ────────────────────────────────────────
// Refuse incompatible combinations out loud. A dev throw surfaces the misuse at
// its source (the consumer's template) instead of a silent wrong paint; in
// production the throw is downgraded to a console.error so a contract slip never
// hard-crashes a shipped app, but the signal is never swallowed.
function refuse(message: string): void {
    const full = `[glass-ui] Progress: ${message}`;
    if (import.meta.env.DEV) throw new Error(full);
    // fail-explicit: production downgrade — surfaced, never swallowed.
    console.error(full);
}

watchEffect(() => {
    const sectioned = props.variant === "sectioned";

    // `segments` only mean something on the sectioned variant. Passing them to a
    // default/gradient bar is a silent no-op otherwise — refuse it.
    if (!sectioned && props.segments.length > 0) {
        refuse(
            `\`segments\` is only valid on variant="sectioned" (got variant="${props.variant}"). ` +
                `The default/gradient variants are driven by \`modelValue\`.`,
        );
    }

    // The sectioned variant derives its own value from the cell state map; a
    // consumer-supplied `modelValue` is NOT its truth and used to be SILENTLY
    // overridden. Refuse a non-zero modelValue on sectioned (the default 0 is the
    // "not supplied" sentinel) so the misuse can no longer paint a wrong value.
    if (sectioned && (props.modelValue ?? 0) !== 0) {
        refuse(
            `variant="sectioned" ignores \`modelValue\` — its value derives from the ` +
                `per-cell state map (segments + currentSegmentKey + activeProgress). ` +
                `Drive the fill via \`activeProgress\`/\`currentSegmentKey\`, not \`modelValue\`.`,
        );
    }

    // The indeterminate sweep is a gradient-variant motion story; it has no meaning
    // on the sectioned phase-bus (whose motion is the per-cell sweep).
    if (sectioned && props.indeterminate) {
        refuse(
            `\`indeterminate\` is not compatible with variant="sectioned". ` +
                `The sectioned variant's living motion is the active-cell sweep.`,
        );
    }
});
</script>

<template>
    <ProgressSectioned
        v-if="props.variant === 'sectioned'"
        :segments="props.segments"
        :current-segment-key="props.currentSegmentKey"
        :active-progress="props.activeProgress"
        :class="props.class"
    />
    <ProgressGradient
        v-else-if="props.variant === 'gradient'"
        :model-value="props.modelValue"
        :indeterminate="props.indeterminate"
        :class="props.class"
    />
    <ProgressLiquid
        v-else-if="props.variant === 'liquid'"
        :model-value="props.modelValue"
        :class="props.class"
    />
    <ProgressDefault v-else :model-value="props.modelValue" :class="props.class" />
</template>
