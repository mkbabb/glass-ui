<script setup lang="ts">
import { computed, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { Slider } from "@glass/components/slider";
import { MusicStaff, type MusicStaffNoteEvent } from "@glass/components/music-staff";

// A mechanics study rather than a claimed historical quotation. Product
// consumers pass the current work's verified score- or MIDI-derived events.
const study: MusicStaffNoteEvent[] = [
    { id: "a", midi: 55, beat: 0, beats: 0.5 },
    { id: "b", midi: 60, beat: 0.5, beats: 0.25 },
    { id: "c", midi: 64, beat: 0.75, beats: 0.25 },
    { id: "d", midi: 67, beat: 1, beats: 0.5 },
    { id: "e", midi: 70, beat: 1.5, beats: 0.25, accidental: "flat" },
    { id: "f", midi: 67, beat: 1.75, beats: 0.25 },
    { id: "g", midi: 64, beat: 2, beats: 0.5 },
    { id: "h", midi: 62, beat: 2.5, beats: 0.5 },
    { id: "i", midi: 60, beat: 3, beats: 0.75 },
    { id: "j", midi: 64, beat: 3.75, beats: 0.25 },
    { id: "k", midi: 67, beat: 4, beats: 2 },
    { id: "l", midi: 72, beat: 6, beats: 4 },
];

// A low walking phrase: auto-clef lands on bass, and the register that used to
// produce a ledger runaway now produces no ledgers at all.
const walk: MusicStaffNoteEvent[] = [
    { id: "w1", midi: 48, beat: 0, beats: 1 },
    { id: "w2", midi: 50, beat: 1, beats: 0.5 },
    { id: "w3", midi: 52, beat: 1.5, beats: 0.5 },
    { id: "w4", midi: 53, beat: 2, beats: 1 },
    { id: "w5", midi: 55, beat: 3, beats: 1.5 },
    { id: "w6", midi: 51, beat: 4.5, beats: 0.5, accidental: "flat" },
    { id: "w7", midi: 43, beat: 5, beats: 3 },
];

const loadingProgress = ref<number[]>([0]);
const scoreProgress = ref<number[]>([42]);
const shown = ref(true);

const loadingValue = computed(() => loadingProgress.value[0] / 100);
const scoreValue = computed(() => scoreProgress.value[0] / 100);

// The parent owns the lifecycle: the staff leaves through its own transition and
// re-enters when that leave has finished — no remount hack, no frame callback.
function replay(): void {
    shown.value = false;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="The staff plays itself"
            level="heading"
            blurb="A parked reading line and a page that streams past it: a player-piano roll claims no percentage, so the indeterminate case is honest by construction. Each note strikes on the beat it crosses the line — phase-locked to the loop, with no clock, no frame loop, and no timer. Give it a value and the rules ink up behind the transport; at one, the reel stalls and the score takes its final barline."
            gap="lg"
        >
            <MusicStaff mode="loading" label="Loading the archive" />
            <!-- A second reel at the same tempo would beat in lockstep with the
                 first; the loop duration is one public token, so the two phrases
                 simply run at different tempi. -->
            <MusicStaff
                mode="loading"
                label="Restoring the session"
                :progress="loadingValue"
                :style="{ '--music-staff-loop-duration': 'calc(11s * var(--motion-tempo))' }"
            />
            <label class="flex max-w-xl flex-col gap-2 text-small text-muted-foreground">
                Determinate value {{ loadingProgress[0] }}%
                <Slider v-model="loadingProgress" :max="100" :step="1" aria-label="Loading value" />
            </label>
        </StorySection>

        <StorySection
            heading="Engraved from the beats"
            blurb="Notes carry an onset and a sounding length in quarter-note beats; heads, dots, flags, and beams are all derived from that one axis. Spacing is proportional-with-compression, so a run of sixteenths crowds without ever colliding. The blue-pencil wipe reports playback: a half-crossed note is half inked, and the playhead retargets on the spring register whose charter is indicators, progress, and reveals."
            gap="lg"
        >
            <Transition name="fade" @after-leave="shown = true">
                <MusicStaff
                    v-if="shown"
                    :notes="study"
                    label="Engraving mechanics study"
                    :progress="scoreValue"
                />
            </Transition>
            <div class="flex flex-wrap items-center gap-3">
                <Button @click="replay">Replay the ink</Button>
            </div>
            <label class="flex max-w-xl flex-col gap-2 text-small text-muted-foreground">
                Playback progress {{ scoreProgress[0] }}%
                <Slider v-model="scoreProgress" :max="100" :step="1" aria-label="Playback progress" />
            </label>
        </StorySection>

        <StorySection
            heading="The clef the music asks for"
            blurb="Left on auto, the staff picks the clef that minimises the worst ledger stack — so a low walking phrase engraves on bass with no ledgers at all. Where ledgers are genuinely demanded, the folio grows to hold every one of them: nothing is clipped, and nothing is drawn that the music did not ask for."
        >
            <MusicStaff :notes="walk" label="Low walking phrase, auto-clef" />
        </StorySection>

        <StorySection
            heading="Surface composition"
            blurb="The bare material keeps the same notation and accessibility contract when a product already owns the surrounding glass. The accent is one consumer token, so current-work identity can re-ink elapsed notes without touching geometry."
        >
            <div
                class="glass-resting rounded-panel p-5"
                :style="{ '--music-staff-accent': 'var(--viz-legendre)' }"
            >
                <MusicStaff
                    :notes="study"
                    label="Bare staff with consumer-provided violet editorial ink"
                    :progress="0.7"
                    material="bare"
                />
            </div>
        </StorySection>

        <StorySection
            heading="Decorative use"
            blurb="A decorative ornament is removed from the accessibility tree and never accepts focus. An empty staff stays honest when no verified quotation is available."
        >
            <MusicStaff :notes="[]" label="Decorative neutral staff" decorative />
        </StorySection>
    </StoryPage>
</template>
