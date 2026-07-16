<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, type StyleValue } from "vue";
import { cn } from "../_shared/class-names";
import type {
    InstrumentChassisBoundary,
    InstrumentChassisProps,
} from "./types";

defineOptions({ name: "InstrumentChassis", inheritAttrs: false });

const props = withDefaults(defineProps<InstrumentChassisProps>(), {
    state: "ready",
    proportion: "golden",
    boundaries: () => [],
    reserve: "none",
});

const attrs = useAttrs();
const style = computed<StyleValue>(() => [
    attrs.style as StyleValue,
    props.tone
        ? ({ "--instrument-tone": props.tone } as CSSProperties)
        : undefined,
]);

function hasBoundary(boundary: InstrumentChassisBoundary): boolean {
    return props.boundaries.includes(boundary);
}
</script>

<template>
    <div
        v-bind="$attrs"
        :class="cn('instrument-chassis', $props.class)"
        :style="style"
        :data-state="state"
        :data-proportion="proportion"
        :data-reserve="reserve"
        :aria-busy="state === 'loading' || undefined"
    >
        <div
            class="instrument-composition"
            :data-has-inspector="$slots.inspector ? '' : undefined"
            :data-boundary="hasBoundary('stage-inspector') && $slots.inspector ? '' : undefined"
        >
            <div class="instrument-stage">
                <slot name="stage" />
            </div>
            <div v-if="$slots.inspector" class="instrument-inspector">
                <slot name="inspector" />
            </div>
        </div>
        <div
            v-if="$slots.action"
            class="instrument-action"
            :data-boundary="hasBoundary('inspector-action') && $slots.inspector ? '' : undefined"
        >
            <slot name="action" />
        </div>
    </div>
</template>
