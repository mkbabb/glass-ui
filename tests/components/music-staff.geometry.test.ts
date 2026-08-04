import { describe, expect, it } from "vitest";
import {
    ACCIDENTAL_GLYPHS,
    CLEF_ADVANCE,
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
    type MusicStaffGeometry,
    type MusicStaffNoteEvent,
} from "@glass/components/music-staff/staffGeometry";

/** Sample path data (M/L/C/V/H) one closed subpath at a time, so a glyph is
    gated on what it draws AND on which way each subpath winds. */
function subpathsOf(d: string): [number, number][][] {
    const tokens = d.match(/[MLCVHZ][^MLCVHZ]*/gi) ?? [];
    const subpaths: [number, number][][] = [];
    let current: [number, number][] = [];
    let cx = 0, cy = 0, sx = 0, sy = 0;
    for (const token of tokens) {
        const op = token[0].toUpperCase();
        const v = (token.slice(1).match(/-?\d*\.?\d+/g) ?? []).map(Number);
        if (op === "M") {
            current = [];
            subpaths.push(current);
            [cx, cy] = v as [number, number];
            sx = cx; sy = cy;
            current.push([cx, cy]);
        } else if (op === "L") {
            for (let i = 0; i < v.length; i += 2) { cx = v[i]; cy = v[i + 1]; current.push([cx, cy]); }
        } else if (op === "H") {
            for (const x of v) { cx = x; current.push([cx, cy]); }
        } else if (op === "V") {
            for (const y of v) { cy = y; current.push([cx, cy]); }
        } else if (op === "C") {
            for (let i = 0; i < v.length; i += 6) {
                const [x1, y1, x2, y2, x, y] = v.slice(i, i + 6);
                for (let t = 0.05; t <= 1.0001; t += 0.05) {
                    const u = 1 - t;
                    current.push([
                        u ** 3 * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x,
                        u ** 3 * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y,
                    ]);
                }
                cx = x; cy = y;
            }
        } else if (op === "Z") { cx = sx; cy = sy; }
    }
    return subpaths;
}

const samplePath = (d: string): [number, number][] => subpathsOf(d).flat();

/** Nonzero winding at a point — what `fill-rule: nonzero` actually paints. */
function windingAt(subpaths: [number, number][][], px: number, py: number): number {
    let winding = 0;
    for (const points of subpaths) {
        for (let i = 0; i < points.length; i += 1) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[(i + 1) % points.length];
            const side = (x2 - x1) * (py - y1) - (px - x1) * (y2 - y1);
            if (y1 <= py) { if (y2 > py && side > 0) winding += 1; }
            else if (y2 <= py && side < 0) winding -= 1;
        }
    }
    return winding;
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

/** The corpus the shipped story engraves (demo/stories/display/music-staff.vue):
    the one that produces a lone secondary beam stubbing leftward. */
const demoStudy: MusicStaffNoteEvent[] = [
    { id: "a", midi: 55, beat: 0, beats: 0.5 },
    { id: "b", midi: 60, beat: 0.5, beats: 0.25 },
    { id: "c", midi: 64, beat: 0.75, beats: 0.25 },
    { id: "d", midi: 67, beat: 1, beats: 0.5 },
    { id: "e", midi: 70, beat: 1.5, beats: 0.25, accidental: "flat" },
    { id: "f", midi: 67, beat: 1.75, beats: 0.25 },
    { id: "g", midi: 64, beat: 2, beats: 0.5 },
    { id: "h", midi: 62, beat: 2.5, beats: 0.5 },
    { id: "i", midi: 60, beat: 3, beats: 0.75 },
    { id: "j", midi: 64, beat: 3.75, beats: 0.25 },
    { id: "k", midi: 67, beat: 4, beats: 2 },
    { id: "l", midi: 72, beat: 6, beats: 4 },
];

/** Every beamed stem must END on the beam that joins it — at the STEM's x, not
    at the head centre half a head-width away. This replaces the old `x2 > x1`
    invariant, which a leftward secondary stub violates by construction. */
function expectStemsJoinBeams(geometry: MusicStaffGeometry): void {
    const EPSILON = 1e-3;
    const stemAt = (x: number) => geometry.stems.find((stem) => Math.abs(stem.x - x) < EPSILON);
    expect(geometry.beams.length).toBeGreaterThan(0);
    for (const beam of geometry.beams) {
        const direction = Math.sign(beam.x2 - beam.x1);
        const lead = beam.x1 + direction * METRICS.beamOverhang;
        expect(stemAt(lead), `beam ${beam.id} starts at no stem`).toBeDefined();
        if (beam.level === 1) {
            const trail = beam.x2 - direction * METRICS.beamOverhang;
            expect(stemAt(trail), `beam ${beam.id} ends at no stem`).toBeDefined();
            const slope = (beam.y2 - beam.y1) / (beam.x2 - beam.x1);
            for (const stem of geometry.stems) {
                if (stem.x < Math.min(beam.x1, beam.x2) - EPSILON) continue;
                if (stem.x > Math.max(beam.x1, beam.x2) + EPSILON) continue;
                const beamY = beam.y1 + slope * (stem.x - beam.x1);
                expect(Math.abs(beamY - stem.y2), `stem ${stem.id} misses beam ${beam.id}`)
                    .toBeLessThan(EPSILON);
            }
        }
    }
}

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

    it("declares extents that match the drawn paths, path data and nothing else", () => {
        near(bbox(G_CLEF).x1, GLYPH_EXTENT.gClef.x1);
        near(bbox(F_CLEF).x1, GLYPH_EXTENT.fClef.x1);
        near(bbox(FLAG_UP).y1, GLYPH_EXTENT.flag.y1);
        near(bbox(ACCIDENTAL_GLYPHS.sharp).x1, GLYPH_EXTENT.sharp.x1);
        // Advance is a second measure, in its own table: the bass clef reads as
        // far as its detached dots, the treble clef only as far as its outline.
        expect(CLEF_ADVANCE.treble).toBeCloseTo(GLYPH_EXTENT.gClef.x1, 6);
        expect(CLEF_ADVANCE.bass)
            .toBeCloseTo(Math.max(...F_CLEF_DOTS.map((dot) => dot.x + dot.r)), 6);
        expect(CLEF_ADVANCE.bass).toBeGreaterThan(GLYPH_EXTENT.fClef.x1);
    });

    // Extents are blind to the inside of a glyph: a subpath that winds against
    // its neighbours punches a hole exactly where they overlap, and the bbox is
    // unchanged. These probe what `fill-rule: nonzero` paints.
    const inked: Record<string, { d: string; points: [string, number, number][] }> = {
        gClef: {
            d: G_CLEF,
            points: [
                ["spiral eye", G_CLEF_EYE.x, G_CLEF_EYE.y],
                ["ascender", 1.5, -3.5],
                ["lower bow", 0.9, 2.3],
            ],
        },
        fClef: {
            d: F_CLEF,
            points: [
                ["ball centre", 0.58, 0.1],
                ["ball over body", 0.23, -0.31],
                ["body", 1.6, 1.9],
            ],
        },
        flat: {
            d: ACCIDENTAL_GLYPHS.flat,
            points: [["stem", 0.08, -1], ["bowl", 0.45, -0.25]],
        },
        sharp: {
            d: ACCIDENTAL_GLYPHS.sharp,
            points: [
                ["upper bar × left stem", 0.285, -0.387],
                ["upper bar × right stem", 0.755, -0.513],
                ["lower bar × left stem", 0.285, 0.393],
                ["lower bar × right stem", 0.755, 0.267],
                ["stem", 0.285, 1],
                ["bar", 0.55, -0.45],
            ],
        },
        natural: {
            d: ACCIDENTAL_GLYPHS.natural,
            points: [
                ["upper bar × stem", 0.055, -0.496],
                ["lower bar × left stem", 0.055, 0.284],
                ["lower bar × right stem", 0.575, 0.136],
                ["stem", 0.575, 1],
            ],
        },
        flagUp: { d: FLAG_UP, points: [["body", 0.5, 1]] },
    };

    it.each(Object.entries(inked))("inks every interior of %s, holes included", (_name, { d, points }) => {
        const subpaths = subpathsOf(d);
        for (const [where, x, y] of points) {
            expect(Math.abs(windingAt(subpaths, x, y)), `${where} is paper, not ink`)
                .toBeGreaterThan(0);
        }
    });

    it("winds every subpath of a glyph the same way, so no overlap cancels", () => {
        for (const [name, { d }] of Object.entries(inked)) {
            const subpaths = subpathsOf(d);
            const xs = subpaths.flat().map((p) => p[0]);
            const ys = subpaths.flat().map((p) => p[1]);
            const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
            const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
            const holes: string[] = [];
            for (let i = 0; i < 48; i += 1) {
                for (let j = 0; j < 48; j += 1) {
                    const px = x0 + ((x1 - x0) * (i + 0.5)) / 48;
                    const py = y0 + ((y1 - y0) * (j + 0.5)) / 48;
                    const inside = subpaths.some((sub) => windingAt([sub], px, py) !== 0);
                    if (inside && windingAt(subpaths, px, py) === 0) {
                        holes.push(`${px.toFixed(2)},${py.toFixed(2)}`);
                    }
                }
            }
            expect(holes, `${name} punches holes at ${holes.slice(0, 3).join(" ")}`).toHaveLength(0);
        }
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
        // The quantized rise is measured stem tip to stem tip; the slab overhangs
        // both ends, so its own endpoints carry a hair more.
        const tips = [...geometry.stems].sort((a, b) => a.x - b.x);
        const rise = tips[tips.length - 1].y2 - tips[0].y2;
        expect(Math.abs(rise)).toBeLessThanOrEqual(1.0001);
        expect([0, 0.25, 0.5, 1].some((step) => Math.abs(Math.abs(rise) - step) < 2e-3)).toBe(true);
        for (const stem of geometry.stems) {
            expect(Math.abs(stem.y2 - stem.y1)).toBeGreaterThanOrEqual(METRICS.beamMinStem);
        }
        expectStemsJoinBeams(geometry);
    });

    it("joins every beam to the stems it beams, over the corpora that ship", () => {
        expectStemsJoinBeams(engraveMusicStaff(demoStudy));
        expectStemsJoinBeams(engraveMusicStaff(LOADING_MOTIF, { loopBeats: LOADING_BEATS }));
        // The lone secondary stubs LEFT out of its own stem — the case the old
        // `x2 > x1` invariant declared impossible while the story shipped it.
        const stub = engraveMusicStaff(demoStudy).beams.find((beam) => beam.id === "j-b2");
        expect(stub).toBeDefined();
        expect(stub!.x2).toBeLessThan(stub!.x1);
        expect(engraveMusicStaff(demoStudy).stems.some((stem) =>
            Math.abs(stem.x - (stub!.x1 - METRICS.beamOverhang)) < 1e-3)).toBe(true);
    });

    it("hangs a beam off the stem, never off the head centre", () => {
        const run = [0, 0.25, 0.5, 0.75].map((beat, index) => ({
            id: `s${index}`, midi: 67 + index, beat, beats: 0.25,
        }));
        const geometry = engraveMusicStaff(run);
        const [primary] = geometry.beams.filter((beam) => beam.level === 1);
        const heads = geometry.notes.map((note) => note.x);
        // The slab reaches past the outermost head centres by the stem attachment,
        // which is exactly what "the beam touches the stems" means.
        expect(primary.x1).toBeCloseTo(
            Math.min(...heads) + METRICS.stemAttachX - METRICS.beamOverhang, 3,
        );
        expect(primary.x2).toBeCloseTo(
            Math.max(...heads) + METRICS.stemAttachX + METRICS.beamOverhang, 3,
        );
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
    });

    // The one gate that has to be direction-aware: a phase and its mirror are
    // indistinguishable to any test symmetric in φ ↔ 1 − φ, and the shipped
    // reel fired every note at its mirror image for exactly that reason.
    it("strikes each note at the instant it crosses the reading line", () => {
        const geometry = engraveMusicStaff(LOADING_MOTIF, { loopBeats: LOADING_BEATS });
        const frac = (value: number) => ((value % 1) + 1) % 1;
        const off: string[] = [];
        for (const note of geometry.notes) {
            // The reel carries the note LEFT, so it reaches the parked line here:
            const crossing = frac((note.x - geometry.readingX) / geometry.period);
            // The strike keyframe spikes at its own zero, and animation-delay is
            // −phase · duration, so the note fires at frac(−phase).
            const firing = frac(-note.strikePhase);
            if (Math.abs(firing - crossing) > 1e-6) {
                off.push(`${note.id}: fires ${firing.toFixed(3)}, crosses ${crossing.toFixed(3)}`);
            }
        }
        expect(off).toHaveLength(0);
        expect(geometry.notes.every((note) => note.strikePhase >= 0 && note.strikePhase < 1)).toBe(true);
        // Asymmetric by construction: at least one note is off both 0 and 0.5,
        // so the mirror phase could not satisfy the gate above.
        expect(geometry.notes.some((note) =>
            Math.min(note.strikePhase, Math.abs(note.strikePhase - 0.5)) > 0.05)).toBe(true);
    });

    it("draws one reel copy more than it spans, so the ink never runs dry", () => {
        const geometry = engraveMusicStaff(LOADING_MOTIF, { loopBeats: LOADING_BEATS });
        // At the end of a cycle the belt has travelled one whole period left;
        // what remains inked must still reach the far edge of the engraving.
        const guaranteed = geometry.noteX0 + geometry.reelCopies * geometry.period;
        expect(guaranteed).toBeGreaterThanOrEqual(geometry.widthSp);
        expect(engraveMusicStaff(study).reelCopies).toBe(0);
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
