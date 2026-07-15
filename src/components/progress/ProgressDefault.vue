<script setup lang="ts">
import { computed, type CSSProperties, type HTMLAttributes } from "vue";
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from "reka-ui";
import { cn } from "../_shared/class-names";
import { resolveValueFraction, resolveValueMarks } from "../_shared/valueDomain";

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
            class="progress-value-fill h-full w-full flex-1 rounded-pill [background:var(--progress-fill,var(--primary))] transition-transform"
        />
    </ProgressRoot>
</template>

<style src="./valueMarks.css"></style>
