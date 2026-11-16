<script setup lang="ts">
// Transport: Play never leaves; speed, reset and the time open beside it. Folded, the
// dock shows how far the run has gone.
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Pause, Play, RotateCcw } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import { Progress } from "@glass/components/progress";
import DockScene from "./DockScene.vue";

const LENGTH = 40;
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
