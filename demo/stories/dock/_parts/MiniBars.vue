<script setup lang="ts">
// A small bar figure: one bar per value, scaled to the largest. A change of values
// tweens each bar's height; a change of count fades bars in and out. With `played`
// (0 to 1) a playhead stands at that point and the bars past it dim; both tween.
import { computed } from "vue";

const props = withDefaults(
    defineProps<{ values: readonly number[]; label: string; log?: boolean; played?: number }>(),
    { log: false, played: undefined },
);

const heights = computed(() => {
    const v = props.values.map((x) => (props.log ? Math.log10(Math.max(1, x)) : x));
    const max = Math.max(...v, 1e-9);
    return v.map((x) => Math.max(0.04, x / max));
});
</script>

<template>
    <div class="mini-bars" role="img" :aria-label="label">
        <TransitionGroup name="fade">
            <span
                v-for="(h, i) in heights"
                :key="i"
                class="mini-bar"
                :class="{ 'mini-bar--ahead': played !== undefined && i / heights.length >= played }"
                :style="{ blockSize: `${(h * 100).toFixed(2)}%` }"
            />
        </TransitionGroup>
        <span
            v-if="played !== undefined"
            class="mini-playhead"
            :style="{ insetInlineStart: `${(Math.min(1, Math.max(0, played)) * 100).toFixed(2)}%` }"
        />
    </div>
</template>

<style scoped>
.mini-bars {
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 3%;
    block-size: 100%;
    inline-size: 100%;
}

.mini-bar {
    flex: 1 1 0;
    min-inline-size: 0;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    background-color: var(--viz-fourier);
    transition:
        block-size var(--duration-normal) var(--ease-out),
        opacity var(--duration-normal) var(--ease-out);
}

.mini-bar--ahead {
    opacity: 0.35;
}

.mini-playhead {
    position: absolute;
    inset-block: 0;
    inline-size: 2px;
    margin-inline-start: -1px;
    border-radius: 1px;
    background-color: var(--foreground);
    transition: inset-inline-start var(--duration-normal) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
    .mini-bar,
    .mini-playhead {
        transition: none;
    }
}
</style>
