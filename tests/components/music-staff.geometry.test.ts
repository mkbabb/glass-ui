import { describe, expect, it } from "vitest";
import {
    ACCIDENTAL_GLYPHS,
    F_CLEF,
    F_CLEF_DOTS,
    FLAG_DOWN,
    FLAG_UP,
    G_CLEF,
    G_CLEF_EYE,
    GLYPH_EXTENT,
} from "@glass/components/music-staff/glyphs";
import {
    advanceOf,
    engraveMusicStaff,
    LOADING_BEATS,
    LOADING_MOTIF,
    METRICS,
    musicPitchName,
    rhythmOf,
    spell,
    staffPos,
    type MusicStaffNoteEvent,
} from "@glass/components/music-staff/staffGeometry";

/** Sample path data (M/L/C/V/H) so a glyph is gated on what it draws. */
function samplePath(d: string): [number, number][] {
    const tokens = d.match(/[MLCVHZ][^MLCVHZ]*/gi) ?? [];
    const points: [number, number][] = [];
    let cx = 0, cy = 0, sx = 0, sy = 0;
    for (const token of tokens) {
        const op = token[0].toUpperCase();
        const v = (token.slice(1).match(/-?\d*\.?\d+/g) ?? []).map(Number);
        if (op === "M") {
            [cx, cy] = v as [number, number];
            sx = cx; sy = cy;
            points.push([cx, cy]);
        } else if (op === "L") {
            for (let i = 0; i < v.length; i += 2) { cx = v[i]; cy = v[i + 1]; points.push([cx, cy]); }
        } else if (op === "H") {
            for (const x of v) { cx = x; points.push([cx, cy]); }
        } else if (op === "V") {
            for (const y of v) { cy = y; points.push([cx, cy]); }
        } else if (op === "C") {
            for (let i = 0; i < v.length; i += 6) {
                const [x1, y1, x2, y2, x, y] = v.slice(i, i + 6);
                for (let t = 0; t <= 1.0001; t += 0.05) {
                    const u = 1 - t;
                    points.push([
                        u ** 3 * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x,
                        u ** 3 * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y,
                    ]);
                }
                cx = x; cy = y;
            }
        } else if (op === "Z") { cx = sx; cy = sy; }
    }
    return points;
}

function bbox(d: string) {
    const points = samplePath(d);
    return {
        x0: Math.min(...points.map((p) => p[0])),
        x1: Math.max(...points.map((p) => p[0])),
        y0: Math.min(...points.map((p) => p[1])),
        y1: Math.max(...points.map((p) => p[1])),
    };
}

const near = (actual: number, expected: number) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(0.15);

const study: MusicStaffNoteEvent[] = [
    { id: "a", midi: 64, beat: 0, beats: 1 },
    { id: "b", midi: 67, beat: 1, beats: 0.5 },
    { id: "c", midi: 71, beat: 1.5, beats: 0.5 },
];

describe("music-staff glyphs", () => {
    // The extents the spec fixes; GLYPH_EXTENT must agree, and the path data
    // must draw inside them. Neither the table nor the bytes self-certify.
    const gates = {
        gClef: { d: G_CLEF, gate: { x0: 0, x1: 2.68, y0: -4.39, y1: 2.63 } },
        fClef: { d: F_CLEF, gate: { x0: 0, x1: 2.74, y0: -1.05, y1: 2.54 } },
        flagUp: { d: FLAG_UP, gate: { x0: 0, x1: 1.05, y0: 0, y1: 3.1 } },
        flagDown: { d: FLAG_DOWN, gate: { x0: 0, x1: 1.05, y0: -3.1, y1: 0 } },
        flat: { d: ACCIDENTAL_GLYPHS.flat, gate: { x0: 0, x1: 0.7, y0: -1.75, y1: 0.7 } },
        sharp: { d: ACCIDENTAL_GLYPHS.sharp, gate: { x0: 0, x1: 1.04, y0: -1.4, y1: 1.4 } },
        natural: { d: ACCIDENTAL_GLYPHS.natural, gate: { x0: 0, x1: 0.63, y0: -1.35, y1: 1.35 } },
    };

    it.each(Object.entries(gates))("anchors %s inside its engraving extent", (_name, { d, gate }) => {
        const box = bbox(d);
        near(box.x0, gate.x0);
        near(box.x1, gate.x1);
        near(box.y0, gate.y0);
        near(box.y1, gate.y1);
    });

    it("closes the G-clef spiral on the G line and straddles the F line with dots", () => {
        const eye = samplePath(G_CLEF).filter((p) => Math.hypot(p[0] - G_CLEF_EYE.x, p[1]) < 0.6);
        expect(eye.length).toBeGreaterThan(20);
        near(eye.reduce((sum, p) => sum + p[1], 0) / eye.length, 0);
        expect(F_CLEF_DOTS.map((dot) => dot.y)).toEqual([-0.5, 0.5]);
        expect(F_CLEF_DOTS.every((dot) => dot.r === 0.24 && dot.x >= 3 && dot.x <= 3.3)).toBe(true);
    });

    it("declares extents that match the drawn paths", () => {
        near(bbox(G_CLEF).x1, GLYPH_EXTENT.gClef.x1);
        near(bbox(FLAG_UP).y1, GLYPH_EXTENT.flag.y1);
        near(bbox(ACCIDENTAL_GLYPHS.sharp).x1, GLYPH_EXTENT.sharp.x1);
    });
});

describe("spelling", () => {
    it("puts a flat one diatonic step above its enharmonic sharp", () => {
        expect(spell(63, "flat").step).toBe(spell(63, "sharp").step + 1);
        expect(musicPitchName(63, "flat")).toBe("E♭4");
        expect(musicPitchName(63, "sharp")).toBe("D♯4");
    });

    it("names chromatic pitches from the same authority that places them", () => {
        expect(musicPitchName(66, "sharp")).toBe("F♯4");
        expect(musicPitchName(66, "flat")).toBe("G♭4");
        expect(staffPos(64, "treble")).toBe(0);
        expect(staffPos(71, "treble")).toBe(4);
        expect(staffPos(77, "treble")).toBe(8);
        expect(staffPos(43, "bass")).toBe(0);
        expect(staffPos(50, "bass")).toBe(4);
    });
});

describe("rhythm", () => {
    it("round-trips the table, dots included", () => {
        expect(rhythmOf(4)).toMatchObject({ head: "whole", dots: 0, flags: 0 });
        expect(rhythmOf(3)).toMatchObject({ head: "half", dots: 1 });
        expect(rhythmOf(1.5)).toMatchObject({ head: "black", dots: 1, flags: 0 });
        expect(rhythmOf(0.75)).toMatchObject({ dots: 1, flags: 1 });
        expect(rhythmOf(0.5)).toMatchObject({ flags: 1 });
        expect(rhythmOf(0.25)).toMatchObject({ flags: 2 });
        expect(rhythmOf(0.125)).toMatchObject({ flags: 3 });
    });

    it("clamps below a thirty-second instead of matching nothing", () => {
        expect(rhythmOf(0.03)).toMatchObject({ flags: 3, name: "thirty-second" });
    });
});

describe("engraveMusicStaff", () => {
    it("is deterministic and orders notes on the one timing axis", () => {
        const source = [study[1], study[0]];
        expect(engraveMusicStaff(source)).toEqual(engraveMusicStaff(source));
        expect(engraveMusicStaff(source).notes.map((note) => note.id)).toEqual(["a", "b"]);
    });

    it("spaces proportionally, monotonically, and never below one head width", () => {
        const geometry = engraveMusicStaff(study);
        const xs = geometry.notes.map((note) => note.x);
        expect(xs[0]).toBeLessThan(xs[1]);
        expect(xs[1]).toBeLessThan(xs[2]);
        expect(xs[1] - xs[0]).toBeCloseTo(advanceOf(1), 6);
        expect(advanceOf(0.125)).toBeGreaterThanOrEqual(1.6);
        expect(advanceOf(0.5)).toBeLessThan(advanceOf(1));
    });

    it("never lets ink collide, however dense the accidentals and dots", () => {
        const dense: MusicStaffNoteEvent[] = [
            { id: "a", midi: 70, beat: 0, beats: 0.25, accidental: "flat" },
            { id: "b", midi: 67, beat: 0.25, beats: 1.5 },
            { id: "c", midi: 61, beat: 1.75, beats: 1 },
            { id: "d", midi: 91, beat: 2.75, beats: 0.5, accidental: "flat" },
        ];
        const geometry = engraveMusicStaff(dense, { clef: "treble" });
        const half = (head: string) => (head === "whole" ? METRICS.wholeHalfWidth : METRICS.headHalfWidth);
        let edge = geometry.barlines[0].x + METRICS.barlineThin;
        for (const note of geometry.notes) {
            const left = note.accidentalGlyph ? note.accidentalX : note.x - half(note.head);
            expect(left).toBeGreaterThan(edge);
            edge = note.dots ? note.dotX + METRICS.dotRadius : note.x + half(note.head);
        }
        expect(edge).toBeLessThan(geometry.contentEnd);
    });

    it("derives the viewBox from what is drawn, with a one-space pad", () => {
        const geometry = engraveMusicStaff([{ id: "high", midi: 91, beat: 0, beats: 1 }], { clef: "treble" });
        const [, , width, height] = geometry.viewBox.split(" ").map(Number);
        expect(width).toBeCloseTo(geometry.widthSp, 3);
        expect(height).toBeCloseTo(geometry.heightSp, 3);
        const note = geometry.notes[0];
        expect(note.y - 0.5 - METRICS.pad).toBeCloseTo(0, 6);
        expect(Math.min(...note.ledgerYs)).toBeGreaterThan(METRICS.pad);
        expect(geometry.staffTop).toBeGreaterThan(0);
        expect(geometry.staffTop + 4).toBeLessThan(geometry.heightSp);
    });

    it("picks the clef that minimises the worst ledger stack", () => {
        const pedal = [43, 45, 47, 43].map((midi, index) => ({
            id: `p${index}`, midi, beat: index, beats: 1,
        }));
        const bass = engraveMusicStaff(pedal);
        expect(bass.clef).toBe("bass");
        expect(bass.notes.every((note) => note.ledgerYs.length === 0)).toBe(true);
        expect(engraveMusicStaff(study).clef).toBe("treble");
        expect(engraveMusicStaff(pedal, { clef: "treble" }).clef).toBe("treble");
    });

    it("paints every demanded ledger and none that is not demanded", () => {
        for (let midi = 64; midi <= 77; midi += 1) {
            const [note] = engraveMusicStaff([{ id: "n", midi, beat: 0, beats: 1 }], { clef: "treble" }).notes;
            expect(note.ledgerYs).toHaveLength(0);
        }
        const far = engraveMusicStaff([{ id: "n", midi: 91, beat: 0, beats: 1 }], { clef: "treble" });
        expect(far.notes[0].staffPos).toBe(16);
        expect(far.notes[0].ledgerYs).toHaveLength(4);
        const low = engraveMusicStaff([{ id: "n", midi: 55, beat: 0, beats: 1 }], { clef: "treble" });
        expect(low.notes[0].staffPos).toBe(-5);
        expect(low.notes[0].ledgerYs).toHaveLength(2);
    });

    it("stems by the middle-line rule, with whole notes bare", () => {
        const middle = engraveMusicStaff([{ id: "m", midi: 71, beat: 0, beats: 1 }], { clef: "treble" });
        expect(middle.stems[0].up).toBe(false);
        const below = engraveMusicStaff([{ id: "l", midi: 69, beat: 0, beats: 1 }], { clef: "treble" });
        expect(below.stems[0].up).toBe(true);
        expect(engraveMusicStaff([{ id: "w", midi: 71, beat: 0, beats: 4 }]).stems).toHaveLength(0);
    });

    it("extends a ledgered note's stem to the middle line", () => {
        const geometry = engraveMusicStaff([{ id: "n", midi: 91, beat: 0, beats: 1 }], { clef: "treble" });
        const [stem] = geometry.stems;
        expect(stem.up).toBe(false);
        expect(stem.y2).toBeCloseTo(geometry.staffTop + 2, 6);
    });

    it("beams a run of four sixteenths into one group with two levels", () => {
        const run = [0, 0.25, 0.5, 0.75].map((beat, index) => ({
            id: `s${index}`, midi: 67 + index, beat, beats: 0.25,
        }));
        const geometry = engraveMusicStaff(run);
        expect(geometry.flags).toHaveLength(0);
        expect(new Set(geometry.beams.map((beam) => beam.level))).toEqual(new Set([1, 2]));
        expect(new Set(geometry.stems.map((stem) => stem.up)).size).toBe(1);
        const [primary] = geometry.beams.filter((beam) => beam.level === 1);
        expect(Math.abs(primary.y2 - primary.y1)).toBeLessThanOrEqual(1.0001);
        expect([0, 0.25, 0.5, 1].some((rise) => Math.abs(Math.abs(primary.y2 - primary.y1) - rise) < 1e-6)).toBe(true);
        for (const stem of geometry.stems) {
            expect(Math.abs(stem.y2 - stem.y1)).toBeGreaterThanOrEqual(METRICS.beamMinStem);
        }
        expect(geometry.beams.every((beam) => beam.x2 > beam.x1)).toBe(true);
    });

    it("keeps a lone flagged note flagged and beams none across a beat boundary", () => {
        const geometry = engraveMusicStaff([
            { id: "x", midi: 67, beat: 0, beats: 0.5 },
            { id: "y", midi: 69, beat: 1, beats: 0.5 },
        ]);
        expect(geometry.beams).toHaveLength(0);
        expect(geometry.flags).toHaveLength(2);
    });

    it("raises a dot off the line it would sit on", () => {
        const onLine = engraveMusicStaff([{ id: "d", midi: 64, beat: 0, beats: 1.5 }], { clef: "treble" }).notes[0];
        expect(onLine.dots).toBe(1);
        expect(onLine.dotY).toBeCloseTo(onLine.y - 0.5, 6);
        const inSpace = engraveMusicStaff([{ id: "d", midi: 65, beat: 0, beats: 1.5 }], { clef: "treble" }).notes[0];
        expect(inSpace.dotY).toBeCloseTo(inSpace.y, 6);
    });

    it("locks the loading reel's strike phases to the parked reading line", () => {
        const geometry = engraveMusicStaff(LOADING_MOTIF, { loopBeats: LOADING_BEATS });
        expect(geometry.notes).toHaveLength(LOADING_MOTIF.length);
        expect(geometry.notes.every((note) => note.strikePhase >= 0 && note.strikePhase < 1)).toBe(true);
        expect(geometry.notes.every((note) => note.ledgerYs.length === 0)).toBe(true);
        expect(geometry.notes.every((note) => note.accidentalGlyph === undefined)).toBe(true);
        expect(geometry.beams.length).toBeGreaterThan(0);
        expect(geometry.readingX).toBeCloseTo(geometry.noteX0 + 0.381966 * geometry.period, 2);
        expect(geometry.contentEnd).toBeCloseTo(geometry.noteX0 + geometry.period * 4, 2);
        // The reading line is the phase origin: the note on it strikes at zero.
        const parked = geometry.notes.reduce((best, note) =>
            (Math.abs(note.x - geometry.readingX) < Math.abs(best.x - geometry.readingX) ? note : best));
        expect(Math.min(parked.strikePhase, 1 - parked.strikePhase)).toBeLessThan(0.1);
    });

    it("fails explicitly on library input it cannot engrave", () => {
        expect(() => engraveMusicStaff([{ id: "bad", midi: 140, beat: 0, beats: 1 }]))
            .toThrow(/outside 0–127/);
        expect(() => engraveMusicStaff([{ id: "bad", midi: 60, beat: 0, beats: 0 }]))
            .toThrow(/beats length/);
        expect(() => engraveMusicStaff([{ id: "", midi: 60, beat: 0, beats: 1 }]))
            .toThrow(/non-empty/);
    });
});
