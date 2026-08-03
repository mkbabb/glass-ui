import type { MusicStaffNoteEvent, StaffAccidental } from "./staffGeometry";

export interface ParsedMidiNoteLike {
    midi: number;
    time: number;
    duration: number;
    ticks: number;
    durationTicks: number;
    velocity?: number;
    name?: string;
}

export interface ParsedMidiTrackLike {
    notes: readonly ParsedMidiNoteLike[];
}

export interface ParsedMidiDocumentLike {
    header: { ppq: number };
    tracks: readonly ParsedMidiTrackLike[];
}

export type MidiByteParser = (bytes: ArrayBuffer) => ParsedMidiDocumentLike;

function accidentalFromName(name: string | undefined): StaffAccidental | undefined {
    if (name?.includes("#")) return "sharp";
    if (name?.includes("b")) return "flat";
    return undefined;
}

/**
 * Adapt a parsed Standard MIDI document without coupling glass-ui to a parser.
 * Tone.js `Midi`, Web MIDI importers, and server-side SMF readers satisfy this
 * structural contract.
 */
export function noteEventsFromParsedMidi(
    midi: ParsedMidiDocumentLike,
): MusicStaffNoteEvent[] {
    if (!Number.isFinite(midi.header.ppq) || midi.header.ppq <= 0) {
        throw new RangeError("Parsed MIDI ppq must be a finite positive number.");
    }
    return midi.tracks.flatMap((track, trackIndex) =>
        track.notes.map((note, noteIndex) => ({
            id: `track-${trackIndex}-note-${noteIndex}`,
            midi: note.midi,
            start: note.time,
            duration: note.duration,
            startTick: note.ticks,
            durationTicks: note.durationTicks,
            ticksPerQuarter: midi.header.ppq,
            voice: trackIndex,
            velocity: note.velocity,
            accidental: accidentalFromName(note.name),
        })),
    );
}

/** Parse bytes with the caller's chosen SMF reader, then normalize the notes. */
export function noteEventsFromMidi(
    bytes: ArrayBuffer,
    parse: MidiByteParser,
): MusicStaffNoteEvent[] {
    return noteEventsFromParsedMidi(parse(bytes));
}
