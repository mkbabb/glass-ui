<script setup lang="ts">
// StageSwap: what a variant switch changes on the stage. The old content fades out,
// the new fades in, and the box's height travels between the two; reduced motion
// keeps the fade and drops the travel. The box clips only while its height travels,
// when the new content can be taller than the box; at rest a focus ring or a shadow
// on what it holds draws whole.
//
// A glass surface fades by its own opacity. In Chromium an ancestor whose opacity is
// below 1, or that carries a clip-path, stops a backdrop-filter sampling what lies
// behind that ancestor, so a pane faded whole shows its glass unfrosted for the whole
// fade and frosts it in one frame when the fade ends. The fade therefore moves each
// glass element, and each part that holds no glass, and passes through the bare
// wrappers between them; the travel's clip is an overflow clip where the engine has
// overflow-clip-margin.
import { nextTick, ref, watch } from "vue";

const props = defineProps<{ swapKey: string }>();

// The leave starts and stops at rest: at 60 frames a second no frame lands more than
// a fifth of the fade. An ease-out leave this short lands two fifths in its first.
const LEAVE = { duration: 120, easing: "cubic-bezier(0.25, 0, 0.75, 1)" };
const ENTER_MS = 200;

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

const isGlass = (el: Element): boolean => {
    const bf = getComputedStyle(el).backdropFilter;
    return !!bf && bf !== "none";
};

const hasText = (el: Element): boolean =>
    [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && /\S/.test(n.textContent ?? ""));

// A wrapper paints nothing of its own: no fill, image, edge, shadow, text or pseudo-element.
function isBare(el: Element): boolean {
    const cs = getComputedStyle(el);
    const clear = (c: string) => c === "transparent" || /^rgba\(.*,\s*0\)$/.test(c);
    const edge = ["Top", "Right", "Bottom", "Left"].some(
        (k) => parseFloat(cs.getPropertyValue(`border-${k.toLowerCase()}-width`)) > 0,
    );
    const pseudo = ["::before", "::after"].some((p) => !/^(none|normal)$/.test(getComputedStyle(el, p).content));
    return clear(cs.backgroundColor) && cs.backgroundImage === "none" && !edge && cs.boxShadow === "none" && !hasText(el) && !pseudo;
}

// What a fade moves inside a pane: each glass element, each part that holds no glass,
// and the pane itself when it holds no glass or carries text of its own.
function fadeTargets(pane: Element): Element[] {
    const glass = [...pane.querySelectorAll("*")].filter(isGlass);
    if (!glass.length || hasText(pane)) return [pane];
    const holds = new Set<Element>();
    for (const g of glass) for (let a = g.parentElement; a && a !== pane; a = a.parentElement) holds.add(a);
    const out: Element[] = [];
    const walk = (el: Element): void => {
        for (const c of el.children) {
            const through = getComputedStyle(c).display === "contents" || (holds.has(c) && !isGlass(c) && isBare(c));
            if (through) walk(c);
            else out.push(c);
        }
    };
    walk(pane);
    return out;
}

// A leave fades each target from where it stands (mid-fade if a switch lands during
// one) to 0 and holds there until the pane is removed; an enter fades from 0 to what
// the target would show without it, so a part's own entrance runs inside the fade.
function fade(targets: Element[], to: "out" | "in", timing: { duration: number; easing: string }): Promise<unknown> {
    const runs = targets.map((el) => {
        const now = parseFloat(getComputedStyle(el).opacity);
        fading.get(el)?.cancel();
        const frames = to === "out" ? [{ opacity: now }, { opacity: 0 }] : [{ offset: 0, opacity: 0 }];
        const run = el.animate(frames, { ...timing, fill: to === "out" ? "forwards" : "none", id: "stage-swap-fade" });
        fading.set(el, run);
        return run.finished;
    });
    return Promise.allSettled(runs);
}

function onLeave(el: Element, done: () => void): void {
    void fade(fadeTargets(el), "out", LEAVE).then(done);
}

function onEnter(el: Element, done: () => void): void {
    const easing = getComputedStyle(el).getPropertyValue("--ease-out").trim() || "ease-out";
    void fade(fadeTargets(el), "in", { duration: ENTER_MS, easing }).then(done);
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
