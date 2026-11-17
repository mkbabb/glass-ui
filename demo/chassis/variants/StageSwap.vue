<script setup lang="ts">
// StageSwap: what a variant switch changes on the stage. The old content fades out,
// the new fades in, and the box's height travels between the two; reduced motion
// keeps the fade and drops the travel. The box clips only while its height travels,
// when the new content can be taller than the box; at rest a focus ring or a shadow
// on what it holds draws whole.
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ swapKey: string }>();

const box = ref<HTMLElement | null>(null);
const travelling = ref(false);
let from = 0;
let travel: Animation | null = null;

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
    travel?.cancel();
    const run = el.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
    });
    travel = run;
    travelling.value = true;
    const settle = (): void => {
        if (travel !== run) return;
        travel = null;
        travelling.value = false;
    };
    run.addEventListener("finish", settle);
    run.addEventListener("cancel", settle);
}
</script>

<template>
    <div ref="box" class="stage-swap" :data-travel="travelling || undefined">
        <Transition name="stage-swap" mode="out-in" @enter="onEnter">
            <div :key="swapKey" class="stage-swap-pane">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* While the height travels, what the new content holds past the box is cut 3rem out
   from its edge, past the reach of a shadow on what it holds: the shadow is never cut,
   so nothing appears as the clip lifts. A clip-path, since WebKit has no
   overflow-clip-margin. */
.stage-swap[data-travel] {
    clip-path: inset(-3rem);
}
.stage-swap-enter-active {
    transition: opacity 200ms var(--ease-out);
}
/* The leave starts and stops at rest: at 60 frames a second no frame lands more than
   a fifth of the fade. An ease-out leave this short lands two fifths in its first. */
.stage-swap-leave-active {
    transition: opacity 120ms cubic-bezier(0.25, 0, 0.75, 1);
}
.stage-swap-enter-from,
.stage-swap-leave-to {
    opacity: 0;
}
</style>
