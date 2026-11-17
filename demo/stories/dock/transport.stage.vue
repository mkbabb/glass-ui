<script setup lang="ts">
// Transport: Play never leaves; speed, reset and the time open beside it. Folded, the
// dock shows how far the run has gone. The score above it plays: its playhead and
// its ink stand at the current time; Play moves them, Reset returns them.
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Pause, Play, RotateCcw } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { Progress } from "@glass/components/progress";
import { MusicStaff, type MusicStaffNoteEvent } from "@glass/components/music-staff";
import DockScene from "./_parts/DockScene.vue";
import ScenePage from "./_parts/ScenePage.vue";

const LENGTH = 40;
// The phrase: eight notes over two bars, a climb and a settle.
const PHRASE: MusicStaffNoteEvent[] = [
    { id: "e4", midi: 64, beat: 0, beats: 0.5 },
    { id: "f4", midi: 65, beat: 0.5, beats: 0.5 },
    { id: "g4", midi: 67, beat: 1, beats: 1 },
    { id: "a4", midi: 69, beat: 2, beats: 0.5 },
    { id: "b4", midi: 71, beat: 2.5, beats: 0.5 },
    { id: "c5", midi: 72, beat: 3, beats: 1 },
    { id: "b4-2", midi: 71, beat: 4, beats: 1 },
    { id: "g4-2", midi: 67, beat: 5, beats: 3 },
];
const playing = ref(false);
const time = ref(12);
const speed = ref("1");

let timer: number | undefined;
watch(playing, (on) => {
    window.clearInterval(timer);
    if (on) {
        timer = window.setInterval(() => {
            time.value = (time.value + Number(speed.value)) % LENGTH;
        }, 1000);
    }
});
onBeforeUnmount(() => window.clearInterval(timer));

const clock = computed(() => {
    const s = Math.floor(time.value);
    return `0:${String(s).padStart(2, "0")}`;
});
</script>

<template>
    <DockScene place="bottom">
        <template #context>
            <ScenePage shape="figure">
                <div class="transport-score">
                    <MusicStaff :notes="PHRASE" label="Phrase" material="bare" :progress="time / LENGTH" />
                </div>
            </ScenePage>
        </template>
        <GlassDock collapse="closed" fit-content collapsed-label="Open the transport" aria-label="Transport">
            <template #persistent>
                <DockControl
                    :aria-label="playing ? 'Pause' : 'Play'"
                    :aria-pressed="playing"
                    @click="playing = !playing"
                >
                    <Transition name="fade" mode="out-in">
                        <Pause v-if="playing" aria-hidden="true" />
                        <Play v-else aria-hidden="true" />
                    </Transition>
                </DockControl>
            </template>

            <template #collapsed>
                <Progress
                    :model-value="time"
                    :max="LENGTH"
                    size="sm"
                    class="transport-bar"
                    aria-label="Played"
                />
            </template>

            <Select v-model="speed">
                <DockTrigger for="select" aria-label="Speed">
                    <SelectValue class="text-small" />
                </DockTrigger>
                <SelectContent>
                    <SelectItem value="0.5">0.5×</SelectItem>
                    <SelectItem value="1">1×</SelectItem>
                    <SelectItem value="2">2×</SelectItem>
                </SelectContent>
            </Select>
            <DockControl aria-label="Reset" @click="time = 0">
                <RotateCcw aria-hidden="true" />
            </DockControl>
            <DockSeparator />
            <Transition name="metric-swap" mode="out-in">
                <span :key="clock" class="transport-clock text-small tabular-nums">{{ clock }}</span>
            </Transition>
        </GlassDock>
    </DockScene>
</template>

<style scoped>
/* The score fits the Card's body at every width without scrolling: one staff size
   per band of the context's width (a card's context is under 20rem). */
.transport-score {
    --music-staff-space: 0.32rem;
    display: grid;
    place-items: center;
    block-size: 100%;
}

@container scene-context (inline-size >= 20rem) {
    .transport-score {
        --music-staff-space: 0.45rem;
    }
}

@container scene-context (inline-size >= 30rem) {
    .transport-score {
        --music-staff-space: 0.75rem;
    }
}

.transport-bar {
    inline-size: 5rem;
    margin-inline: var(--sp-2);
}

.transport-clock {
    min-inline-size: 3rem;
    padding-inline: var(--sp-2);
    text-align: center;
}
</style>
