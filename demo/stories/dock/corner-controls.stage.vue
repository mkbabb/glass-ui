<script setup lang="ts">
// A page's controls in its bottom corner. One action is a plain capsule; several fold
// behind a glyph that opens on a press, as a column under 30rem.
import { Share2, Shuffle, SlidersHorizontal, Undo2 } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import DockScene from "./_parts/DockScene.vue";
import ScenePane from "./_parts/ScenePane.vue";

withDefaults(defineProps<{ several?: boolean }>(), { several: false });
</script>

<template>
    <DockScene place="bottom-end">
        <template #context>
            <ScenePane shape="column" />
        </template>
        <template #default="{ narrow }">
            <Transition name="fade" mode="out-in">
                <div v-if="!several" key="one" class="scene-swap">
                    <GlassDock
                        :collapse="false"
                        fit-content
                        aria-label="Page controls"
                    >
                        <DockControl shape="tab">
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
                        <DockControl aria-label="Shuffle"><Shuffle aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Undo"><Undo2 aria-hidden="true" /></DockControl>
                        <DockControl aria-label="Share"><Share2 aria-hidden="true" /></DockControl>
                    </GlassDock>
                </div>
            </Transition>
        </template>
    </DockScene>
</template>

<style scoped>
/* An icon and a word in one seat, a small gap between them. */
.seat-face {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}
</style>
