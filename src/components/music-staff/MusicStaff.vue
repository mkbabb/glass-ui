<script setup lang="ts">
import { computed } from "vue";
import {
    engraveMusicStaff,
    musicPitchName,
    type MusicStaffNoteEvent,
    type StaffClef,
} from "./staffGeometry";

export type MusicStaffPhase = "enter" | "rest" | "exit";
export type MusicStaffMaterial = "folio" | "bare";

export interface MusicStaffProps {
    notes: readonly MusicStaffNoteEvent[];
    label: string;
    progress?: number;
    phase?: MusicStaffPhase;
    decorative?: boolean;
    clef?: StaffClef;
    windowStart?: number;
    windowEnd?: number;
    maxNotes?: number;
    width?: number;
    height?: number;
    material?: MusicStaffMaterial;
    describedNoteLimit?: number;
}

const props = withDefaults(defineProps<MusicStaffProps>(), {
    progress: 0,
    phase: "enter",
    decorative: false,
    clef: "auto",
    maxNotes: 128,
    width: 960,
    height: 184,
    material: "folio",
    describedNoteLimit: 16,
});

const visibleNotes = computed(() => props.notes.filter((note) => {
    const position = note.startTick ?? note.start;
    return (props.windowStart === undefined || position >= props.windowStart)
        && (props.windowEnd === undefined || position < props.windowEnd);
}).slice(0, Math.max(0, props.maxNotes)));
const geometry = computed(() => engraveMusicStaff(visibleNotes.value, {
    clef: props.clef,
    width: props.width,
    height: props.height,
}));
const clampedProgress = computed(() => Math.max(0, Math.min(1, props.progress)));
const playheadX = computed(
    () => geometry.value.paddingX
        + clampedProgress.value * (geometry.value.width - geometry.value.paddingX * 2),
);
const description = computed(() => {
    if (!visibleNotes.value.length) {
        return `${props.label}. Empty five-line staff with no pitched notes.`;
    }
    const described = visibleNotes.value
        .slice(0, Math.max(0, props.describedNoteLimit))
        .map((note) => musicPitchName(note.midi, note.accidental));
    const remainder = visibleNotes.value.length > described.length ? ", and more" : "";
    return `${props.label}. Showing ${visibleNotes.value.length} of ${props.notes.length} notes: ${described.join(", ")}${remainder}.`;
});

function navigateViewport(event: KeyboardEvent): void {
    const viewport = event.currentTarget as HTMLElement;
    if (viewport.scrollWidth <= viewport.clientWidth) return;
    const step = Math.max(80, viewport.clientWidth * 0.72);
    let left: number | undefined;
    if (event.key === "ArrowLeft") left = viewport.scrollLeft - step;
    if (event.key === "ArrowRight") left = viewport.scrollLeft + step;
    if (event.key === "Home") left = 0;
    if (event.key === "End") left = viewport.scrollWidth;
    if (left === undefined) return;
    event.preventDefault();
    viewport.scrollTo({ left, behavior: "auto" });
}
</script>

<template>
    <figure
        class="music-staff"
        :data-phase="phase"
        :data-material="material"
        :aria-hidden="decorative || undefined"
    >
        <div
            class="music-staff__viewport"
            :role="decorative ? undefined : 'img'"
            :tabindex="decorative ? undefined : 0"
            :aria-label="decorative ? undefined : description"
            :aria-keyshortcuts="decorative ? undefined : 'ArrowLeft ArrowRight Home End'"
            @keydown="navigateViewport"
        >
            <svg
                :viewBox="`0 0 ${geometry.width} ${geometry.height}`"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                focusable="false"
            >
                <g class="music-staff__paper">
                    <path
                        v-for="(lineY, index) in geometry.staffLines"
                        :key="`line-${index}`"
                        class="music-staff__line"
                        :style="{ '--music-staff-rule-delay': `calc(${index} * var(--music-staff-rule-stagger))` }"
                        :d="`M 42 ${lineY} H ${geometry.width - 42}`"
                    />
                </g>

                <g
                    v-if="geometry.clef === 'treble'"
                    class="music-staff__clef"
                    aria-hidden="true"
                >
                    <path d="M66 112 C44 95 52 61 75 50 C92 42 97 58 87 72 C78 85 57 86 55 105 C53 123 70 135 84 124 C97 114 90 94 73 97 C58 100 57 118 68 129 C76 138 77 147 70 152" />
                    <circle cx="69" cy="149" r="5.5" />
                </g>
                <g
                    v-else
                    class="music-staff__clef music-staff__clef--bass"
                    aria-hidden="true"
                >
                    <path d="M58 73 C65 53 92 52 97 72 C102 94 78 113 57 126 C72 109 87 91 84 73 C82 62 67 62 65 75" />
                    <circle cx="106" cy="75" r="3.2" />
                    <circle cx="106" cy="94" r="3.2" />
                </g>

                <g
                    v-for="note in geometry.notes"
                    :key="note.id"
                    class="music-staff__note"
                    :class="{ 'is-past': note.normalizedStart <= clampedProgress }"
                    :style="{ '--music-staff-note-delay': `calc(${note.revealDelayMs}ms * var(--motion-tempo, 1))` }"
                    :data-note-id="note.id"
                >
                    <g v-if="note.accidental" class="music-staff__accidental" aria-hidden="true">
                        <path
                            v-if="note.accidental === 'sharp'"
                            :d="`M ${note.x - 22} ${note.y - 12} V ${note.y + 11} M ${note.x - 15} ${note.y - 14} V ${note.y + 9} M ${note.x - 25} ${note.y - 4} L ${note.x - 12} ${note.y - 7} M ${note.x - 25} ${note.y + 5} L ${note.x - 12} ${note.y + 2}`"
                        />
                        <path
                            v-else-if="note.accidental === 'flat'"
                            :d="`M ${note.x - 20} ${note.y - 15} V ${note.y + 9} C ${note.x - 8} ${note.y + 2}, ${note.x - 9} ${note.y - 7}, ${note.x - 20} ${note.y - 2}`"
                        />
                        <path
                            v-else
                            :d="`M ${note.x - 22} ${note.y - 13} V ${note.y + 9} M ${note.x - 14} ${note.y - 9} V ${note.y + 13} M ${note.x - 22} ${note.y} L ${note.x - 14} ${note.y - 3} M ${note.x - 22} ${note.y + 8} L ${note.x - 14} ${note.y + 5}`"
                        />
                    </g>
                    <path
                        v-for="ledgerY in note.ledgerYs"
                        :key="ledgerY"
                        class="music-staff__ledger"
                        :d="`M ${note.x - 12} ${ledgerY} H ${note.x + 12}`"
                    />
                    <path
                        class="music-staff__head"
                        :class="{ 'music-staff__head--open': note.openHead }"
                        :d="`M ${note.x - 8} ${note.y + 2} C ${note.x - 8} ${note.y - 3}, ${note.x + 7} ${note.y - 6}, ${note.x + 8} ${note.y - 1} C ${note.x + 8} ${note.y + 4}, ${note.x - 7} ${note.y + 7}, ${note.x - 8} ${note.y + 2} Z`"
                    />
                    <path
                        class="music-staff__stem"
                        :d="note.stemUp
                            ? `M ${note.x + 7} ${note.y} V ${note.stemEndY}`
                            : `M ${note.x - 7} ${note.y} V ${note.stemEndY}`"
                    />
                    <path
                        v-for="flagIndex in note.flagCount"
                        :key="`flag-${flagIndex}`"
                        class="music-staff__flag"
                        :d="note.stemUp
                            ? `M ${note.x + 7} ${note.stemEndY + (flagIndex - 1) * 7} C ${note.x + 21} ${note.stemEndY + 8 + (flagIndex - 1) * 7}, ${note.x + 19} ${note.stemEndY + 18 + (flagIndex - 1) * 7}, ${note.x + 9} ${note.stemEndY + 23 + (flagIndex - 1) * 7}`
                            : `M ${note.x - 7} ${note.stemEndY - (flagIndex - 1) * 7} C ${note.x - 21} ${note.stemEndY - 8 - (flagIndex - 1) * 7}, ${note.x - 19} ${note.stemEndY - 18 - (flagIndex - 1) * 7}, ${note.x - 9} ${note.stemEndY - 23 - (flagIndex - 1) * 7}`"
                    />
                </g>

                <g class="music-staff__playhead" :transform="`translate(${playheadX} 0)`">
                    <path :d="`M 0 ${geometry.staffTop - 28} V ${geometry.staffBottom + 28}`" />
                    <circle :cy="geometry.staffTop - 32" r="3.5" />
                </g>
            </svg>
        </div>
    </figure>
</template>
