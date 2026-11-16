<script setup lang="ts">
// StageSwap: what a variant switch changes on the stage. The old content fades out,
// the new fades in, and the box's height travels between the two; reduced motion
// keeps the fade and drops the travel.
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ swapKey: string }>();

const box = ref<HTMLElement | null>(null);
let from = 0;

watch(
    () => props.swapKey,
    () => {
        from = box.value?.offsetHeight ?? 0;
    },
    { flush: "pre" },
);

async function onEnter(): Promise<void> {
    await nextTick();
    const el = box.value;
    if (!el || !from) return;
    const to = el.offsetHeight;
    if (Math.abs(to - from) < 1) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const span = Math.abs(to - from);
    const duration = Math.min(450, 200 + span * 0.8);
    el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
    });
}
</script>

<template>
    <div ref="box" class="stage-swap">
        <Transition name="stage-swap" mode="out-in" @enter="onEnter">
            <div :key="swapKey" class="stage-swap-pane">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.stage-swap {
    overflow: clip;
}
.stage-swap-enter-active {
    transition: opacity 200ms var(--ease-out);
}
.stage-swap-leave-active {
    transition: opacity 120ms var(--ease-out);
}
.stage-swap-enter-from,
.stage-swap-leave-to {
    opacity: 0;
}
</style>
