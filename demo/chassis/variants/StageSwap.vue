<script setup lang="ts">
// StageSwap: what a variant switch changes on the stage. The old content fades out,
// the new fades in, and the box's height travels between the two; reduced motion
// keeps the fade and drops the travel. The box clips only while its height travels,
// when the new content can be taller than the box; at rest a focus ring or a shadow
// on what it holds draws whole.
//
// The fade moves the stage's one element, the pane's child, by its own opacity, so the
// content fades as one layer and no part shows through another. In Chromium an
// ancestor whose opacity is below 1 stops a backdrop-filter sampling what lies behind
// that ancestor: glass that is the stage's element frosts through the whole fade, and
// glass inside a wrapper shows unfrosted until the fade ends, as when the pane faded.
// The travel's clip is an overflow clip where the engine has overflow-clip-margin.
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ swapKey: string }>();

// Both fades start and stop at rest: at 60 frames a second no frame lands more than a
// fifth of either (the leave 0.185 of its 120 ms, the enter 0.111 of its 200 ms). An
// ease-out fade this short lands a quarter or more in its first frame.
const EASE = "cubic-bezier(0.25, 0, 0.75, 1)";

const box = ref<HTMLElement | null>(null);
const travelling = ref(false);
let from = 0;
let travel: Animation | null = null;
const fading = new WeakMap<Element, Animation>();

watch(
    () => props.swapKey,
    () => {
        from = box.value?.offsetHeight ?? 0;
    },
    { flush: "pre" },
);

// What a fade moves: the stage's element, or the pane when the stage puts more than one.
const layer = (pane: Element): Element => (pane.childElementCount === 1 ? pane.firstElementChild! : pane);

// A leave fades the layer from where it stands (mid-fade if a switch lands during one)
// to 0 and holds there until the pane is removed; an enter fades from 0 to what the
// layer would show without it, so its own entrance runs inside the fade.
function fade(pane: Element, out: boolean): Promise<unknown> {
    const el = layer(pane);
    const now = parseFloat(getComputedStyle(el).opacity);
    fading.get(el)?.cancel();
    const frames = out ? [{ opacity: now }, { opacity: 0 }] : [{ offset: 0, opacity: 0 }];
    const run = el.animate(frames, { duration: out ? 120 : 200, easing: EASE, fill: out ? "forwards" : "none", id: "stage-swap-fade" });
    fading.set(el, run);
    afterPaint(run);
    return run.finished.catch(() => undefined);
}

// The frames after a press, and those that first style, lay out and paint a new pane,
// can run long on a first switch, and an animation started before them lands their
// share in one step. So the leave, and the enter's fade and travel, hold at their start
// until two frames have begun since they were asked for, and play from there.
function afterPaint(run: Animation): void {
    run.pause();
    requestAnimationFrame(() =>
        requestAnimationFrame(() => {
            if (run.playState === "paused") run.play();
        }),
    );
}

function onLeave(el: Element, done: () => void): void {
    void fade(el, true).then(done);
}

function onEnter(el: Element, done: () => void): void {
    void fade(el, false).then(done);
    void travelTo();
}

async function travelTo(): Promise<void> {
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
    afterPaint(run);
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
        <Transition mode="out-in" :css="false" @leave="onLeave" @enter="onEnter">
            <div :key="swapKey" class="stage-swap-pane">
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/* While the height travels, what the new content holds past the box is cut 3rem out
   from its edge, past the reach of a shadow on what it holds: the shadow is never cut,
   so nothing appears as the clip lifts. An overflow clip with a margin leaves glass
   inside sampling what is behind the box; WebKit has no overflow-clip-margin, takes
   the same cut as a clip-path, and its glass samples through a clip-path. */
.stage-swap[data-travel] {
    clip-path: inset(-3rem);
}
@supports (overflow-clip-margin: 3rem) {
    .stage-swap[data-travel] {
        clip-path: none;
        overflow: clip;
        overflow-clip-margin: 3rem;
    }
}
</style>
