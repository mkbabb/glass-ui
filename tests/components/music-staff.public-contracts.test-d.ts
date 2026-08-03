import type {
    MusicStaffMaterial,
    MusicStaffMode,
    MusicStaffNoteEvent,
    MusicStaffProps,
    StaffClef,
} from "@glass/components/music-staff";

const note = {
    id: "note-1",
    midi: 60,
    beat: 0,
    beats: 1,
    accidental: "natural",
} satisfies MusicStaffNoteEvent;

const props = {
    label: "Score quotation",
    notes: [note],
    mode: "score",
    material: "folio",
    clef: "auto",
    progress: 0.4,
} satisfies MusicStaffProps;

const loading = { label: "Loading", mode: "loading" } satisfies MusicStaffProps;

// Clean break: the deleted prop surface must not type-check.
// @ts-expect-error `phase` was replaced by parent-owned lifecycle.
const rejectsPhase = { label: "x", phase: "enter" } satisfies MusicStaffProps;
// @ts-expect-error size is one CSS knob, never a prop.
const rejectsSize = { label: "x", width: 960, height: 184 } satisfies MusicStaffProps;
// @ts-expect-error windowing is one consumer-side slice.
const rejectsWindow = { label: "x", windowStart: 0, maxNotes: 8 } satisfies MusicStaffProps;
// @ts-expect-error the described note limit is an internal constant.
const rejectsLimit = { label: "x", describedNoteLimit: 4 } satisfies MusicStaffProps;
// @ts-expect-error seconds and ticks are gone; beats are the one axis.
const rejectsSeconds = { id: "n", midi: 60, start: 0, duration: 1 } satisfies MusicStaffNoteEvent;
// @ts-expect-error tick fields converted once, in the adapter.
const rejectsTicks = { id: "n", midi: 60, beat: 0, beats: 1, startTick: 0 } satisfies MusicStaffNoteEvent;

export type MusicStaffContractFixtures = [
    typeof props,
    typeof loading,
    typeof rejectsPhase,
    typeof rejectsSize,
    typeof rejectsWindow,
    typeof rejectsLimit,
    typeof rejectsSeconds,
    typeof rejectsTicks,
    MusicStaffMode,
    MusicStaffMaterial,
    StaffClef,
];
