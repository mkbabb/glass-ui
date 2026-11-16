<script setup lang="ts">
// Music Staff's stage: one staff, engraved still or streaming as a loading surface.
import { MusicStaff, type MusicStaffMode, type MusicStaffNoteEvent } from "@glass/components/music-staff";
import StageSwap from "../../chassis/variants/StageSwap.vue";

withDefaults(defineProps<{ mode?: MusicStaffMode }>(), { mode: "score" });

const STUDY: readonly MusicStaffNoteEvent[] = [
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
</script>

<template>
    <div class="music-staff-stage">
        <StageSwap :swap-key="mode">
            <MusicStaff v-if="mode === 'loading'" mode="loading" label="Loading the archive" />
            <MusicStaff v-else :notes="STUDY" label="A short study in G" />
        </StageSwap>
    </div>
</template>

<style scoped>
/* The staff's one size knob, set on its host. */
.music-staff-stage {
    --music-staff-space: 1rem;
    display: grid;
    grid-template-columns: minmax(0, auto);
    place-content: center;
    block-size: 100%;
    padding: var(--sp-4);
}
@container (inline-size < 56rem) {
    .music-staff-stage {
        --music-staff-space: 0.5rem;
        padding: var(--sp-4);
    }
}
@container (inline-size < 26rem) {
    .music-staff-stage {
        --music-staff-space: 0.375rem;
    }
}
</style>
