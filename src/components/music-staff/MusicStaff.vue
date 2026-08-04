<script setup lang="ts">
import { computed, useId, watchEffect } from "vue";
import {
    ACCIDENTAL_GLYPHS,
    F_CLEF,
    F_CLEF_DOTS,
    FLAG_DOWN,
    FLAG_UP,
    G_CLEF,
} from "./glyphs";
import {
    engraveMusicStaff,
    LOADING_BEATS,
    LOADING_MOTIF,
    METRICS,
    type MusicStaffBeam,
    type MusicStaffNoteEvent,
    type MusicStaffNoteGeometry,
    type StaffClef,
} from "./staffGeometry";

export type MusicStaffMode = "score" | "loading";
export type MusicStaffMaterial = "folio" | "bare";

export interface MusicStaffProps {
    label: string;
    notes?: readonly MusicStaffNoteEvent[];
    mode?: MusicStaffMode;
    progress?: number;
    clef?: StaffClef;
    material?: MusicStaffMaterial;
    decorative?: boolean;
}

const props = withDefaults(defineProps<MusicStaffProps>(), {
    notes: () => [],
    mode: "score",
    progress: undefined,
    clef: "auto",
    material: "folio",
    decorative: false,
});

const uid = useId();
const inkId = `music-staff-ink-${uid}`;
const clipId = `music-staff-clip-${uid}`;
const maskId = `music-staff-mask-${uid}`;
const fadeId = `music-staff-fade-${uid}`;
const loading = computed(() => props.mode === "loading");

// The loading surface engraves its own motif, composed for the treble staff; a
// forced clef re-reads all fourteen notes in the wrong register (in bass, every
// one of them lands on ledgers). Loud in DEV, per Progress.
watchEffect(() => {
    if (!loading.value || props.clef === "auto") return;
    const message = "[glass-ui] MusicStaff: `clef` does not apply in loading mode — "
        + "the composed motif is engraved for the treble staff.";
    if (import.meta.env.DEV) throw new Error(message);
    console.error(message);
});

const geometry = computed(() => (loading.value
    ? engraveMusicStaff(LOADING_MOTIF, { clef: props.clef, loopBeats: LOADING_BEATS })
    : engraveMusicStaff(props.notes, { clef: props.clef })));

const value = computed(() => (props.progress === undefined
    ? undefined
    : Math.max(0, Math.min(1, props.progress))));
const sealed = computed(() => loading.value && value.value !== undefined && value.value >= 1);
const playheadX = computed(() => geometry.value.noteX0
    + (value.value ?? 0) * (geometry.value.contentEnd - geometry.value.noteX0));

const clefPath = computed(() => (geometry.value.clef === "treble" ? G_CLEF : F_CLEF));
const clefDots = computed(() => (geometry.value.clef === "bass" ? F_CLEF_DOTS : []));

// The reel emerges from behind the initial barline: ink never crosses the parked
// clef, and neither window edge crops a glyph mid-stroke.
const FADE = 1.2;
const gutterX = computed(() => geometry.value.barlines[0].x + METRICS.barlineThin);
const fadeStop = computed(() => FADE / (geometry.value.widthSp - gutterX.value));

// Center-out: the eye anchors at the middle line, so the draw and the breath
// both travel outward from it.
const RULE_ORDER = [2, 1, 0, 1, 2];

const description = computed(() => {
    const notes = geometry.value.notes;
    const clefName = geometry.value.clef === "treble" ? "Treble" : "Bass";
    if (!notes.length) return `${props.label}. Empty ${clefName.toLowerCase()} staff.`;
    const spoken = notes.slice(0, 16).map((note) => `${note.pitchName} ${note.rhythmName}`);
    const rest = notes.length - spoken.length;
    return `${props.label}. ${clefName} staff, ${notes.length} notes: ${spoken.join(", ")}`
        + `${rest > 0 ? `, and ${rest} more` : ""}.`;
});

const windowAttrs = computed(() => {
    if (props.decorative) return {};
    if (loading.value) {
        return {
            role: "progressbar",
            // A sealed score is finished: busy is the one thing it is not.
            ...(sealed.value ? {} : { "aria-busy": true }),
            "aria-label": props.label,
            "aria-valuemin": "0",
            "aria-valuemax": "1",
            // Omitting aria-valuenow IS the indeterminate contract.
            ...(value.value === undefined ? {} : {
                "aria-valuenow": String(value.value),
                "aria-valuetext": `${Math.round(value.value * 100)}%`,
            }),
        };
    }
    return { role: "img", tabindex: "0", "aria-label": description.value };
});

// Private consumption vars only. The five public tokens are never declared on
// this element — an element declaration would beat every ancestor override.
const rootStyle = computed(() => ({
    "--_music-staff-progress": String(value.value ?? 0),
    "--_music-staff-staff-top": String(geometry.value.staffTop),
    "--_music-staff-period": String(geometry.value.period),
    "--_music-staff-width": String(geometry.value.widthSp),
    "--_music-staff-height": String(geometry.value.heightSp),
}));

const noteStyle = (note: MusicStaffNoteGeometry) => (loading.value
    ? { animationDelay: `calc(var(--_music-staff-loop-duration) * -${note.strikePhase})` }
    : { "--_music-staff-delay": `calc(${note.revealDelayMs}ms * var(--motion-tempo))` });
const delayStyle = (delayMs: number) => (loading.value
    ? undefined
    : { "--_music-staff-delay": `calc(${delayMs}ms * var(--motion-tempo))` });

const halfWidth = (note: MusicStaffNoteGeometry) => (note.head === "whole"
    ? METRICS.wholeHalfWidth
    : METRICS.headHalfWidth);

// Four cubics per ellipse; the whole note's counter is a real hole (even-odd),
// never a folio-coloured patch over the staff line.
const K = 0.5523;
function ellipse(cx: number, cy: number, rx: number, ry: number, deg: number): string {
    const t = (deg * Math.PI) / 180, cos = Math.cos(t), sin = Math.sin(t);
    const at = (x: number, y: number) => `${cx + x * cos - y * sin} ${cy + x * sin + y * cos}`;
    return `M${at(0, -ry)}C${at(rx * K, -ry)} ${at(rx, -ry * K)} ${at(rx, 0)}`
        + `C${at(rx, ry * K)} ${at(rx * K, ry)} ${at(0, ry)}`
        + `C${at(-rx * K, ry)} ${at(-rx, ry * K)} ${at(-rx, 0)}`
        + `C${at(-rx, -ry * K)} ${at(-rx * K, -ry)} ${at(0, -ry)}Z`;
}
const wholeHead = (note: MusicStaffNoteGeometry) =>
    ellipse(note.x, note.y, METRICS.wholeHalfWidth, METRICS.wholeHeadRy, 0)
    + ellipse(note.x, note.y, METRICS.wholeCounterRx, METRICS.wholeCounterRy,
        METRICS.wholeCounterTilt);

const beamPath = (beam: MusicStaffBeam) => {
    const t = METRICS.beamThickness * (beam.up ? 1 : -1);
    return `M${beam.x1} ${beam.y1}L${beam.x2} ${beam.y2}`
        + `L${beam.x2} ${beam.y2 + t}L${beam.x1} ${beam.y1 + t}Z`;
};
</script>

<template>
    <figure
        class="music-staff"
        :data-material="material"
        :data-mode="mode"
        :data-sealed="sealed || undefined"
        :aria-hidden="decorative || undefined"
        :style="rootStyle"
    >
        <div
            class="music-staff__window"
            :class="{ 'glass-resting': material === 'folio' }"
            v-bind="windowAttrs"
        >
            <!-- Staff furniture lives in window space, so the rules span the whole
                 folio however wide the host is, and the reel can never run dry. -->
            <div class="music-staff__furniture" aria-hidden="true">
                <div
                    v-for="(lineY, index) in geometry.staffLines"
                    :key="lineY"
                    class="music-staff__line"
                    :style="{
                        '--_music-staff-rule-index': RULE_ORDER[index],
                        '--_music-staff-y': lineY - METRICS.staffLineThickness / 2,
                        '--_music-staff-rise': METRICS.staffLineThickness,
                    }"
                />
                <div
                    v-for="bar in geometry.barlines"
                    :key="bar.x"
                    class="music-staff__barline"
                    :style="{
                        '--_music-staff-x': bar.x,
                        '--_music-staff-run': bar.width,
                        '--_music-staff-y': geometry.staffTop,
                        '--_music-staff-rise': 4,
                    }"
                />
                <div
                    v-if="loading"
                    class="music-staff__reading"
                    :style="{
                        '--_music-staff-x': geometry.readingX - 0.05,
                        '--_music-staff-run': 0.1,
                        '--_music-staff-y': geometry.staffTop - METRICS.playheadRise,
                        '--_music-staff-rise': 4 + METRICS.playheadRise * 2,
                    }"
                />
                <div v-if="loading && value !== undefined" class="music-staff__progress-ink" />
            </div>

            <svg :viewBox="geometry.viewBox" aria-hidden="true" focusable="false">
                <defs>
                    <path :id="`${inkId}-flag-up`" :d="FLAG_UP" />
                    <path :id="`${inkId}-flag-down`" :d="FLAG_DOWN" />
                    <path
                        v-for="(d, name) in ACCIDENTAL_GLYPHS"
                        :id="`${inkId}-${name}`"
                        :key="name"
                        :d="d"
                    />
                    <clipPath v-if="!loading && value !== undefined" :id="clipId">
                        <rect
                            class="music-staff__clip-edge"
                            :x="-geometry.widthSp"
                            y="0"
                            :width="geometry.widthSp"
                            :height="geometry.heightSp"
                            :style="{ transform: `translateX(${playheadX}px)` }"
                        />
                    </clipPath>
                    <template v-if="loading">
                        <linearGradient
                            :id="fadeId"
                            gradientUnits="userSpaceOnUse"
                            :x1="gutterX"
                            y1="0"
                            :x2="geometry.widthSp"
                            y2="0"
                        >
                            <stop offset="0" stop-color="#000" />
                            <stop :offset="fadeStop" stop-color="#fff" />
                            <stop :offset="1 - fadeStop" stop-color="#fff" />
                            <stop offset="1" stop-color="#000" />
                        </linearGradient>
                        <mask
                            :id="maskId"
                            maskUnits="userSpaceOnUse"
                            :x="gutterX"
                            y="0"
                            :width="geometry.widthSp - gutterX"
                            :height="geometry.heightSp"
                        >
                            <rect
                                :x="gutterX"
                                y="0"
                                :width="geometry.widthSp - gutterX"
                                :height="geometry.heightSp"
                                :fill="`url(#${fadeId})`"
                            />
                        </mask>
                    </template>
                </defs>

                <g :transform="`translate(${geometry.clefX} ${geometry.clefY})`">
                    <g class="music-staff__clef">
                        <path :d="clefPath" />
                        <circle
                            v-for="dot in clefDots"
                            :key="dot.y"
                            :cx="dot.x"
                            :cy="dot.y"
                            :r="dot.r"
                        />
                    </g>
                </g>

                <g class="music-staff__transport" :mask="loading ? `url(#${maskId})` : undefined">
                    <g class="music-staff__reel">
                        <g :id="inkId" class="music-staff__layer">
                            <path
                                v-for="beam in geometry.beams"
                                :key="beam.id"
                                class="music-staff__beam"
                                :style="delayStyle(beam.delayMs)"
                                :d="beamPath(beam)"
                            />
                            <rect
                                v-for="stem in geometry.stems"
                                :key="stem.id"
                                class="music-staff__stem"
                                :data-up="stem.up || undefined"
                                :style="delayStyle(stem.delayMs)"
                                :x="stem.x - METRICS.stemThickness / 2"
                                :y="Math.min(stem.y1, stem.y2)"
                                :width="METRICS.stemThickness"
                                :height="Math.abs(stem.y2 - stem.y1)"
                            />
                            <use
                                v-for="flag in geometry.flags"
                                :key="flag.id"
                                class="music-staff__flag"
                                :href="`#${inkId}-flag-${flag.up ? 'up' : 'down'}`"
                                :style="delayStyle(flag.delayMs)"
                                :x="flag.x"
                                :y="flag.y"
                            />
                            <g
                                v-for="note in geometry.notes"
                                :key="note.id"
                                class="music-staff__note"
                                :data-note-id="note.id"
                                :style="noteStyle(note)"
                            >
                                <rect
                                    v-for="ledgerY in note.ledgerYs"
                                    :key="ledgerY"
                                    class="music-staff__ledger"
                                    :x="note.x - halfWidth(note) - METRICS.ledgerExtension"
                                    :y="ledgerY - METRICS.ledgerThickness / 2"
                                    :width="(halfWidth(note) + METRICS.ledgerExtension) * 2"
                                    :height="METRICS.ledgerThickness"
                                />
                                <use
                                    v-if="note.accidentalGlyph"
                                    class="music-staff__accidental"
                                    :href="`#${inkId}-${note.accidentalGlyph}`"
                                    :x="note.accidentalX"
                                    :y="note.y"
                                />
                                <ellipse
                                    v-if="note.head !== 'whole'"
                                    class="music-staff__head"
                                    :class="{ 'music-staff__head--open': note.head === 'half' }"
                                    :cx="note.x"
                                    :cy="note.y"
                                    :rx="note.head === 'half' ? METRICS.halfHeadRx : METRICS.blackHeadRx"
                                    :ry="note.head === 'half' ? METRICS.halfHeadRy : METRICS.blackHeadRy"
                                    :transform="`rotate(${METRICS.headTilt} ${note.x} ${note.y})`"
                                />
                                <path
                                    v-else
                                    class="music-staff__head music-staff__head--whole"
                                    fill-rule="evenodd"
                                    :d="wholeHead(note)"
                                />
                                <circle
                                    v-for="dot in note.dots"
                                    :key="dot"
                                    class="music-staff__dot"
                                    :cx="note.dotX + (dot - 1) * METRICS.dotGap"
                                    :cy="note.dotY"
                                    :r="METRICS.dotRadius"
                                />
                            </g>
                        </g>
                        <template v-if="loading">
                            <use
                                v-for="copy in geometry.reelCopies"
                                :key="copy"
                                :href="`#${inkId}`"
                                :x="copy * geometry.period"
                            />
                        </template>
                    </g>
                </g>

                <template v-if="!loading && value !== undefined">
                    <use
                        :href="`#${inkId}`"
                        class="music-staff__layer music-staff__layer--accent"
                        :clip-path="`url(#${clipId})`"
                    />
                    <g
                        class="music-staff__playhead"
                        :style="{ transform: `translateX(${playheadX}px)` }"
                    >
                        <rect x="-0.05" :y="geometry.staffTop - 1.2" width="0.1" :height="6.4" />
                        <circle cx="0" :cy="geometry.staffTop - METRICS.playheadRise" r="0.35" />
                    </g>
                </template>
            </svg>

            <!-- The seal is the component's own element: the window wears a glass
                 rung, whose ::before/::after belong to the ladder. -->
            <div v-if="sealed" class="music-staff__seal" aria-hidden="true" />
        </div>
    </figure>
</template>
