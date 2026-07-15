<script setup lang="ts">
import { computed, type CSSProperties, type HTMLAttributes } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../_shared/class-names";
import { resolveValueFraction, resolveValueMarks } from "../_shared/valueDomain";

/**
 * Liquid progress variant (BG.W-LIQUID-FILL) — the meter's fill is the ONE shared
 * `.glass-liquid-fill` register, the glass-cylinder fill EXTRACTED from Slider. The
 * rail is the recessed `--progress-track` channel; the indicator is a warm glass
 * cylinder that grows with `modelValue` via `translateX`.
 *
 * PHASE-COLOUR COMPOSABLE, ZERO PER-SITE GLASS KNOWLEDGE. The tint rides the ONE
 * `--liquid-fill-tint` knob, which this variant seeds from the EXISTING
 * `--progress-fill` token (the progress family's colour contract) in the scoped
 * block below — so a consumer re-tints the liquid meter by setting `--progress-fill`
 * (or `--liquid-fill-tint`) with NO knowledge of the blur / rim / under-shadow the
 * register owns. The thin `Progress` dispatcher routes here for `variant="liquid"`.
 */
const props = defineProps<
    ProgressRootProps & {
        class?: HTMLAttributes["class"];
        marks?: readonly number[];
    }
>();

const max = computed(() => props.max ?? 100);
const fraction = computed(() => resolveValueFraction(props.modelValue, 0, max.value));
const marks = computed(() => resolveValueMarks(props.marks, 0, max.value));
const rootStyle = computed(
    () =>
        ({
            "--progress-value-percent": `${fraction.value * 100}%`,
        }) as CSSProperties,
);

const delegatedProps = computed(() => {
    const { class: _, marks: _m, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :class="
            cn(
                'relative h-4 w-full overflow-hidden rounded-pill bg-[var(--progress-track,var(--progress-track-on-glass))]',
                props.class,
            )
        "
        :style="rootStyle"
    >
        <span v-if="marks.length" class="progress-value-marks" aria-hidden="true">
            <span
                v-for="mark in marks"
                :key="mark.value"
                class="progress-value-mark"
                :style="{ '--value-mark-position': `${mark.position * 100}%` }"
            />
        </span>
        <ProgressIndicator
            class="glass-liquid-fill progress-liquid-fill progress-value-fill h-full w-full flex-1 transition-transform"
        />
    </ProgressRoot>
</template>

<style src="./valueMarks.css"></style>

<style scoped>
/* The phase/tint colour is the ONLY per-site knowledge — the surface reads the
   existing `--progress-fill` token (the family colour contract) into the shared
   register's `--liquid-fill-tint` knob; the `.glass-liquid-fill` register owns
   every glass mechanic (blur / rim / under-shadow / warm floor). A consumer re-tints
   the liquid meter by setting `--progress-fill` (or `--liquid-fill-tint`) — no glass
   knowledge needed (BG.W-LIQUID-FILL). */
.progress-liquid-fill {
    --liquid-fill-tint: var(--progress-fill, var(--primary));
}
</style>
