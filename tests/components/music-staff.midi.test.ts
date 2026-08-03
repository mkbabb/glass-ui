import { describe, expect, it } from "vitest";
import {
    noteEventsFromParsedMidi,
    type ParsedMidiDocumentLike,
} from "@glass/components/music-staff";

const parsed: ParsedMidiDocumentLike = {
    header: { ppq: 480 },
    tracks: [
        { notes: [{ midi: 66, ticks: 0, durationTicks: 240, name: "F#4" }] },
        { notes: [{ midi: 70, ticks: 480, durationTicks: 720, name: "Bb4" }] },
    ],
};

describe("MusicStaff MIDI adapter", () => {
    it("converts ticks to beats exactly once and keeps chromatic spelling", () => {
        const events = noteEventsFromParsedMidi(parsed);

        expect(events).toHaveLength(2);
        expect(events[0]).toEqual({
            id: "track-0-note-0",
            midi: 66,
            beat: 0,
            beats: 0.5,
            accidental: "sharp",
        });
        expect(events[1]).toEqual({
            id: "track-1-note-0",
            midi: 70,
            beat: 1,
            beats: 1.5,
            accidental: "flat",
        });
    });

    it("emits nothing the staff cannot draw", () => {
        const [event] = noteEventsFromParsedMidi(parsed);
        expect(Object.keys(event).sort())
            .toEqual(["accidental", "beat", "beats", "id", "midi"]);
    });

    it("rejects an invalid parser timing basis", () => {
        expect(() => noteEventsFromParsedMidi({ header: { ppq: 0 }, tracks: [] }))
            .toThrow(/ppq/);
        expect(() => noteEventsFromParsedMidi({ header: { ppq: Number.NaN }, tracks: [] }))
            .toThrow(/ppq/);
    });
});
