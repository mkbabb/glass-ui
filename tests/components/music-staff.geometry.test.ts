import { describe, expect, it } from "vitest";
import {
    engraveMusicStaff,
    musicPitchName,
    type MusicStaffNoteEvent,
} from "@glass/components/music-staff";

describe("engraveMusicStaff", () => {
    it("is deterministic and orders notes on the shared timing axis", () => {
        const source: MusicStaffNoteEvent[] = [
            { id: "b", midi: 67, start: 1, duration: 1 },
            { id: "a", midi: 64, start: 0, duration: 1 },
        ];
        const first = engraveMusicStaff(source, { width: 640 });
        const second = engraveMusicStaff(source, { width: 640 });

        expect(first).toEqual(second);
        expect(first.notes.map((note) => note.id)).toEqual(["a", "b"]);
        expect(first.notes[0].x).toBeLessThan(first.notes[1].x);
    });

    it("keeps chord delay together, draws ledger lines, and auto-selects bass clef", () => {
        const geometry = engraveMusicStaff([
            {
                id: "low-a",
                midi: 31,
                start: 0,
                duration: 1,
                startTick: 0,
                durationTicks: 480,
                ticksPerQuarter: 480,
            },
            {
                id: "low-b",
                midi: 43,
                start: 0,
                duration: 1,
                startTick: 0,
                durationTicks: 480,
                ticksPerQuarter: 480,
            },
        ]);

        expect(geometry.clef).toBe("bass");
        expect(geometry.notes[0].revealDelayMs).toBe(geometry.notes[1].revealDelayMs);
        expect(geometry.notes[0].ledgerYs.length).toBeGreaterThan(0);
    });

    it("fails explicitly on invalid library input", () => {
        expect(() => engraveMusicStaff([
            { id: "outside-midi", midi: 140, start: 0, duration: 1 },
        ])).toThrow(/outside 0–127/);
        expect(() => engraveMusicStaff([], { paddingX: 400, width: 640 }))
            .toThrow(/drawable width/);
    });

    it("names chromatic pitches according to the supplied spelling", () => {
        expect(musicPitchName(66, "sharp")).toBe("F♯4");
        expect(musicPitchName(66, "flat")).toBe("G♭4");
    });
});
