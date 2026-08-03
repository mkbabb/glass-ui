import type {
    MusicStaffMaterial,
    MusicStaffNoteEvent,
    MusicStaffPhase,
    MusicStaffProps,
    StaffClef,
} from "@glass/components/music-staff";

const note = {
    id: "note-1",
    midi: 60,
    start: 0,
    duration: 1,
    accidental: "natural",
} satisfies MusicStaffNoteEvent;

const props = {
    notes: [note],
    label: "Score quotation",
    phase: "enter",
    material: "folio",
    clef: "auto",
} satisfies MusicStaffProps;

export type MusicStaffContractFixtures = [
    typeof props,
    MusicStaffPhase,
    MusicStaffMaterial,
    StaffClef,
];
