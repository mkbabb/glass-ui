import { describe, expect, it } from "vitest";
import {
    noteEventsFromMidi,
    noteEventsFromParsedMidi,
    type ParsedMidiDocumentLike,
} from "@glass/components/music-staff";

const parsed: ParsedMidiDocumentLike = {
    header: { ppq: 480 },
    tracks: [
        {
            notes: [
                {
                    midi: 66,
                    time: 0,
                    duration: 0.5,
                    ticks: 0,
                    durationTicks: 240,
                    velocity: 0.61,
                    name: "F#4",
                },
            ],
        },
        {
            notes: [
                {
                    midi: 70,
                    time: 1,
                    duration: 1,
                    ticks: 480,
                    durationTicks: 480,
                    velocity: 0.47,
                    name: "Bb4",
                },
            ],
        },
    ],
};

describe("MusicStaff MIDI adapters", () => {
    it("preserves tracks, ticks, duration, velocity, and chromatic spelling", () => {
        const events = noteEventsFromParsedMidi(parsed);

        expect(events).toHaveLength(2);
        expect(events[0]).toMatchObject({
            id: "track-0-note-0",
            midi: 66,
            startTick: 0,
            durationTicks: 240,
            ticksPerQuarter: 480,
            voice: 0,
            accidental: "sharp",
        });
        expect(events[1]).toMatchObject({ voice: 1, accidental: "flat" });
    });

    it("keeps byte parsing explicit and propagates parser failure", () => {
        const bytes = new ArrayBuffer(4);
        expect(noteEventsFromMidi(bytes, () => parsed)).toHaveLength(2);
        expect(() => noteEventsFromMidi(bytes, () => {
            throw new Error("malformed SMF");
        })).toThrow("malformed SMF");
    });

    it("rejects an invalid parser timing basis", () => {
        expect(() => noteEventsFromParsedMidi({ header: { ppq: 0 }, tracks: [] }))
            .toThrow(/ppq/);
    });
});
