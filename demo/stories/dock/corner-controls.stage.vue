<script setup lang="ts">
// A page's controls in its bottom corner. One action is a plain capsule; several fold
// behind a glyph that opens on a press, as a column under 30rem. The puzzle above
// spells a word at rest: Shuffle slides its tiles to new places; Undo slides them back
// to the order before the last shuffle.
import { ref } from "vue";
import { Share2, Shuffle, SlidersHorizontal, Undo2 } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import DockScene from "./_parts/DockScene.vue";
import ScenePage from "./_parts/ScenePage.vue";

withDefaults(defineProps<{ several?: boolean }>(), { several: false });

const order = ref<string[]>(["P", "L", "A", "N", "E", "T", "S"]);
const history: string[][] = [];

// A seeded shuffle, so the run is the same on every load; it never returns the order
// it was given.
let seed = 7;
const rand = (): number => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
function shuffle(): void {
    const prev = order.value;
    let next: string[];
    do {
        next = prev.slice();
        for (let i = next.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [next[i], next[j]] = [next[j]!, next[i]!];
        }
    } while (next.every((v, i) => v === prev[i]));
    history.push(prev);
    order.value = next;
}
function undo(): void {
    const prev = history.pop();
    if (prev) order.value = prev;
}
</script>

<template>
    <DockScene place="bottom-end">
        <template #context>
            <ScenePage shape="figure">
                <div class="puzzle">
                    <TransitionGroup name="tile" tag="div" class="puzzle-row">
                        <span v-for="letter in order" :key="letter" class="scene-tile">{{ letter }}</span>
                    </TransitionGroup>
                </div>
            </ScenePage>
        </template>
        <template #default="{ narrow }">
            <Transition name="fade" mode="out-in">
                <div v-if="!several" key="one" class="scene-swap">
                    <GlassDock
                        :collapse="false"
                        fit-content
                        aria-label="Page controls"
                    >
                        <DockControl shape="tab" @click="shuffle">
                            <span class="seat-face">
                                <Shuffle class="h-4 w-4" aria-hidden="true" />
                                Shuffle
                            </span>
                        </DockControl>
                    </GlassDock>
                </div>
                <div v-else :key="`several-${narrow}`" class="scene-swap">
                    <GlassDock
                        collapse="closed"
                        expand-on="press"
                        :orientation="narrow ? 'vertical' : 'horizontal'"
                        fit-content
                        collapsed-label="Page controls"
                        aria-label="Page controls"
                    >
                        <template #collapsed>
                            <SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
                        </template>
                        <DockControl aria-label="Shuffle" @click="shuffle"><Shuffle aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Undo" @click="undo"><Undo2 aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Share"><Share2 aria-hidden="true" /></DockControl>
                    </GlassDock>
                </div>
            </Transition>
        </template>
    </DockScene>
</template>

<style scoped>
/* Seven square tiles in a row, each a fill mixed from the ink with its letter knocked
   out in the display face; the row answers its own width. */
.puzzle {
    container-type: inline-size;
    display: grid;
    place-items: center;
    block-size: 100%;
}

.puzzle-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: var(--sp-2);
    inline-size: min(100%, 34rem);
}

.scene-tile {
    display: grid;
    place-items: center;
    aspect-ratio: 1;
    border-radius: var(--radius-md);
    background-color: color-mix(in srgb, var(--foreground) 85%, transparent);
    color: var(--background);
    font-family: var(--font-display);
    font-size: min(5.5cqi, 2.4rem);
    line-height: 1;
}

/* A shuffle slides each tile from its old place to its new one. */
.tile-move {
    transition: transform var(--duration-normal) var(--ease-out);
}

@media (prefers-reduced-motion: reduce) {
    .tile-move {
        transition: none;
    }
}

/* An icon and a word in one seat, a small gap between them. */
.seat-face {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}
</style>
