import type { MusicStaffNoteEvent, StaffAccidental } from "./staffGeometry";

export interface ParsedMidiNoteLike {
    midi: number;
    ticks: number;
    durationTicks: number;
    name?: string;
}

export interface ParsedMidiTrackLike {
    notes: readonly ParsedMidiNoteLike[];
}

export interface ParsedMidiDocumentLike {
    header: { ppq: number };
    tracks: readonly ParsedMidiTrackLike[];
}

function accidentalFromName(name: string | undefined): StaffAccidental | undefined {
    if (name?.includes("#")) return "sharp";
    if (name?.includes("b")) return "flat";
    return undefined;
}

/**
 * Adapt a parsed Standard MIDI document without coupling glass-ui to a parser.
 * Tone.js `Midi`, Web MIDI importers, and server-side SMF readers satisfy this
 * structural contract. Ticks convert to beats exactly once, here.
 */
export function noteEventsFromParsedMidi(
    midi: ParsedMidiDocumentLike,
): MusicStaffNoteEvent[] {
    const ppq = midi.header.ppq;
    if (!Number.isFinite(ppq) || ppq <= 0) {
        throw new RangeError("Parsed MIDI ppq must be a finite positive number.");
    }
    return midi.tracks.flatMap((track, trackIndex) =>
        track.notes.map((note, noteIndex) => ({
            id: `track-${trackIndex}-note-${noteIndex}`,
            midi: note.midi,
            beat: note.ticks / ppq,
            beats: note.durationTicks / ppq,
            accidental: accidentalFromName(note.name),
        })),
    );
}
