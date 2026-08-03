<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import {
    MusicStaff,
    type MusicStaffNoteEvent,
    type MusicStaffPhase,
} from "@glass/components/music-staff";

// A mechanics study rather than a claimed historical quotation. Product
// consumers pass the current work's verified score- or MIDI-derived events.
const study: MusicStaffNoteEvent[] = [
    { id: "pedal-a", midi: 43, start: 0, duration: 2.8 },
    { id: "a", midi: 55, start: 0, duration: 0.5 },
    { id: "b", midi: 60, start: 0.5, duration: 0.25 },
    { id: "c", midi: 64, start: 0.75, duration: 0.25 },
    { id: "d", midi: 67, start: 1, duration: 0.5 },
    { id: "e", midi: 70, start: 1.5, duration: 0.25, accidental: "flat" },
    { id: "f", midi: 67, start: 1.75, duration: 0.25 },
    { id: "g", midi: 64, start: 2, duration: 0.5 },
    { id: "h", midi: 62, start: 2.5, duration: 0.5 },
    { id: "i", midi: 60, start: 3, duration: 0.75 },
    { id: "j", midi: 64, start: 3.75, duration: 0.25 },
    { id: "k", midi: 67, start: 4, duration: 0.5 },
    { id: "l", midi: 72, start: 4.5, duration: 0.75 },
];

const replay = ref(0);
const progress = ref(0.42);
const phase = ref<MusicStaffPhase>("enter");

function replayDraw(): void {
    phase.value = "enter";
    replay.value += 1;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="The quotation writes itself"
            level="heading"
            blurb="Each rule and glyph is vector geometry. The finite arrival writes once onto a cream-glass folio, then becomes still; the blue-pencil line reports stored playback progress without spring lag."
            gap="lg"
        >
            <MusicStaff
                :key="replay"
                :notes="study"
                label="Parser-independent engraving mechanics study"
                :progress="progress"
                :phase="phase"
            />
            <div class="flex flex-wrap gap-3">
                <Button @click="replayDraw">Replay the ink</Button>
                <Button emphasis="quiet" @click="phase = 'rest'">Seat at rest</Button>
                <Button emphasis="quiet" @click="phase = 'exit'">Draw out</Button>
            </div>
            <label class="flex max-w-xl flex-col gap-2 text-small text-muted-foreground">
                Playback progress {{ Math.round(progress * 100) }}%
                <input
                    v-model.number="progress"
                    class="accent-[var(--music-staff-accent)]"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                >
            </label>
        </StorySection>

        <StorySection
            heading="Surface composition"
            blurb="The bare material keeps the same notation and accessibility contract when a product already owns the surrounding glass. The accent is one consumer token, so current-work identity can re-ink elapsed notes without changing geometry."
        >
            <div
                class="glass-resting rounded-panel p-5"
                :style="{ '--music-staff-accent': 'var(--viz-legendre)' }"
            >
                <MusicStaff
                    :notes="study"
                    label="Bare staff with consumer-provided violet editorial ink"
                    :progress="0.7"
                    phase="rest"
                    material="bare"
                />
            </div>
        </StorySection>

        <StorySection
            heading="Decorative use"
            blurb="A decorative loading ornament is removed from the accessibility tree and never accepts focus. An empty staff stays honest when no verified quotation is available."
        >
            <MusicStaff
                :notes="[]"
                label="Decorative neutral staff"
                decorative
                phase="rest"
            />
        </StorySection>
    </StoryPage>
</template>
