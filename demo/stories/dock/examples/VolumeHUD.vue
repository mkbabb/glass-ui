<script setup lang="ts">
// Volume HUD — the wide horizontal pill BLOOMS into the tall vertical HUD column, on the
// REAL `useBloomUp` engine (audit §W10: "VolumeHUD→<GlassControl>" — that component is
// not shipped; the honest reuse is the bloom, which is the shared-element FLIP this morph
// IS). The facsimile animated `inline-size`/`block-size`/`padding` (three layout
// properties) to morph the pill into the column. Here the column is a SEPARATE overlay
// laid out at its full settled rect that FLIPs from the pill's rect (transform/opacity/
// filter, no layout animation) — the wide→tall reshape is the compositor scale of the
// ElementMorph, not an animated box.
import { ref } from "vue";
import { Volume2, VolumeX } from "@lucide/vue";
import DockExampleTile from "../DockExampleTile.vue";
import { useBloomUp } from "../../../../src/composables/motion/useBloomUp";

const open = ref(false);
const pillRef = ref<HTMLElement | null>(null);
const columnRef = ref<HTMLElement | null>(null);

const bloom = useBloomUp(pillRef, columnRef, { preset: "snappy", blur: 4 });

function toggle(): void {
    if (open.value) {
        bloom.reset();
        open.value = false;
        return;
    }
    open.value = true;
    requestAnimationFrame(() => bloom.bloom());
}
</script>

<template>
    <DockExampleTile label="Volume HUD" hint="wide pill → vertical HUD (useBloomUp)">
        <template #bg>
            <div class="vh-bg" />
        </template>

        <!-- the wide pill — the bloom SOURCE. -->
        <button
            ref="pillRef"
            type="button"
            class="vh-pill"
            :class="{ 'vh-pill--hidden': open }"
            :aria-expanded="open"
            aria-label="Open the volume HUD"
            @click="toggle"
        >
            <span class="vh-pill-icon"><Volume2 class="size-5" /></span>
            <span class="vh-pill-track"><span class="vh-pill-fill" /></span>
        </button>

        <!-- the tall HUD column — a SEPARATE overlay, rendered only while open. Lays out at
             its FULL settled rect; useBloomUp FLIPs it FROM the pill's rect. -->
        <div
            v-if="open"
            ref="columnRef"
            class="vh-column"
            role="dialog"
            aria-label="Volume"
        >
            <button
                type="button"
                class="vh-col-icon vh-col-icon--top"
                aria-label="Close the volume HUD"
                @click="toggle"
            >
                <Volume2 class="size-5" />
            </button>
            <span class="vh-col-track">
                <span class="vh-col-fill"><span class="vh-col-value">60</span></span>
            </span>
            <span class="vh-col-icon vh-col-icon--bottom"><VolumeX class="size-4" /></span>
        </div>
    </DockExampleTile>
</template>

<style scoped>
.vh-bg {
    background:
        radial-gradient(120% 90% at 22% 18%, oklch(0.82 0.1 20 / 0.9), transparent 60%),
        radial-gradient(110% 100% at 88% 84%, oklch(0.8 0.11 8 / 0.82), transparent 55%),
        linear-gradient(150deg, oklch(0.88 0.05 30), oklch(0.81 0.09 12));
}

/* the shared glass plate. */
.vh-pill,
.vh-column {
    color: var(--foreground);
    background: var(--glass-bg-floating);
    -webkit-backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    backdrop-filter: blur(var(--glass-blur-floating-radius, 13px)) saturate(1.35);
    box-shadow:
        inset 0 0 0 0.5px var(--glass-edge-light, rgb(255 255 255 / 0.22)),
        var(--shadow-floating);
}

.vh-pill {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    inline-size: 12rem;
    block-size: 3.4rem;
    padding: 0 1rem;
    border-radius: 1.7rem;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.2s var(--ex-ease);
}
.vh-pill--hidden {
    opacity: 0;
    pointer-events: none;
}
.vh-pill-icon {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    color: var(--foreground);
}
.vh-pill-track {
    flex: 1 1 auto;
    block-size: 0.45rem;
    border-radius: 0.3rem;
    overflow: hidden;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}
.vh-pill-fill {
    display: block;
    inline-size: 60%;
    block-size: 100%;
    border-radius: 0.3rem;
    background: linear-gradient(90deg, oklch(0.72 0.16 18), oklch(0.78 0.13 30));
}

/* the tall HUD column — the bloom DEST. */
.vh-column {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    inline-size: 4.5rem;
    block-size: 15rem;
    padding: 0.9rem 0;
    border-radius: 2.1rem;
}
.vh-col-icon {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    color: var(--foreground);
}
.vh-col-icon--bottom {
    color: var(--muted-foreground);
}
.vh-col-track {
    position: relative;
    flex: 1 1 auto;
    inline-size: 1.6rem;
    border-radius: 0.8rem;
    overflow: hidden;
    background: color-mix(in oklab, var(--foreground) 14%, transparent);
}
.vh-col-fill {
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    block-size: 60%;
    border-radius: 0.8rem;
    background: linear-gradient(0deg, oklch(0.72 0.16 18), oklch(0.79 0.13 32));
    display: grid;
    place-items: start center;
    padding-block-start: 0.5rem;
}
.vh-col-value {
    font-size: 0.78rem;
    font-weight: 650;
    color: white;
    font-variant-numeric: tabular-nums;
}
</style>
