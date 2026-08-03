import { GLYPH_EXTENT } from "./glyphs";

export type StaffAccidental = "sharp" | "flat" | "natural";
export type StaffClef = "auto" | "treble" | "bass";
export type StaffHead = "black" | "half" | "whole";

/**
 * The note contract: one timing axis, quarter-note beats. A parser converts its
 * own units once (ticks / ppq) before it reaches the staff.
 */
export interface MusicStaffNoteEvent {
    id: string;
    midi: number;
    /** Onset, in quarter-note beats from the quotation start. */
    beat: number;
    /** Sounding length, in quarter-note beats. */
    beats: number;
    accidental?: StaffAccidental;
}

/**
 * Engraving metrics, in staff spaces (sp). One user unit is one staff space, so
 * every number here is a literal engraving measure at any rendered size.
 */
export const METRICS = {
    staffLineThickness: 0.13,
    stemThickness: 0.12,
    ledgerThickness: 0.16,
    ledgerExtension: 0.4,
    stemLength: 3.5,
    stemAttachX: 0.57,
    stemAttachY: 0.168,
    beamThickness: 0.5,
    beamInboard: 0.75,
    beamMinStem: 2.5,
    barlineThin: 0.16,
    barlineThick: 0.5,
    barlineGap: 0.4,
    dotRadius: 0.2,
    dotGap: 0.5,
    headHalfWidth: 0.59,
    wholeHalfWidth: 0.844,
    clefX: 0.8,
    clefGap: 1.6,
    tail: 1.6,
    playheadRise: 1.4,
    pad: 1,
} as const;

const RHYTHMS = [
    { beats: 4, dots: 0, flags: 0, head: "whole", name: "whole" },
    { beats: 3, dots: 1, flags: 0, head: "half", name: "dotted half" },
    { beats: 2, dots: 0, flags: 0, head: "half", name: "half" },
    { beats: 1.5, dots: 1, flags: 0, head: "black", name: "dotted quarter" },
    { beats: 1, dots: 0, flags: 0, head: "black", name: "quarter" },
    { beats: 0.75, dots: 1, flags: 1, head: "black", name: "dotted eighth" },
    { beats: 0.5, dots: 0, flags: 1, head: "black", name: "eighth" },
    { beats: 0.25, dots: 0, flags: 2, head: "black", name: "sixteenth" },
    { beats: 0.125, dots: 0, flags: 3, head: "black", name: "thirty-second" },
] as const satisfies readonly { beats: number; dots: number; flags: number; head: StaffHead; name: string }[];

export type MusicStaffRhythm = (typeof RHYTHMS)[number];

/** The largest rhythm the sounding length covers; shorter than a 32nd clamps. */
export function rhythmOf(beats: number): MusicStaffRhythm {
    return RHYTHMS.find((row) => row.beats <= beats + 1e-6) ?? RHYTHMS[RHYTHMS.length - 1];
}

const NATURAL_STEP = [0, null, 1, null, 2, 3, null, 4, null, 5, null, 6] as const;
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"] as const;

export interface StaffSpelling {
    /** Diatonic step index: octave * 7 + letter index, C0 = 0. */
    step: number;
    letter: string;
    alter: -1 | 0 | 1;
    octave: number;
}

/**
 * The single authority for both staff position and spoken name. A glyph can no
 * longer contradict its own label, because both read this one result.
 */
export function spell(midi: number, accidental?: StaffAccidental): StaffSpelling {
    const pc = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    const natural = NATURAL_STEP[pc];
    if (natural !== null) {
        return { step: octave * 7 + natural, letter: LETTERS[natural], alter: 0, octave };
    }
    const flat = accidental === "flat";
    const neighbour = NATURAL_STEP[pc + (flat ? 1 : -1)]!;
    return {
        step: octave * 7 + neighbour,
        letter: LETTERS[neighbour],
        alter: flat ? -1 : 1,
        octave,
    };
}

export function musicPitchName(midi: number, accidental?: StaffAccidental): string {
    const { letter, alter, octave } = spell(midi, accidental);
    return `${letter}${alter === 1 ? "♯" : alter === -1 ? "♭" : ""}${octave}`;
}

const BOTTOM_STEP = { treble: 4 * 7 + 2, bass: 2 * 7 + 4 } as const;

/** Diatonic steps above the bottom staff line. */
export function staffPos(midi: number, clef: "treble" | "bass", accidental?: StaffAccidental): number {
    return spell(midi, accidental).step - BOTTOM_STEP[clef];
}

/** Gould proportional spacing with compression: the space a rhythmic gap earns. */
export function advanceOf(beats: number): number {
    return 1.6 + 3.5 * beats ** 0.6;
}

function ledgersFor(position: number): number[] {
    const lines: number[] = [];
    for (let k = -2; k >= position; k -= 2) lines.push(k);
    for (let k = 10; k <= position; k += 2) lines.push(k);
    return lines;
}

export interface MusicStaffNoteGeometry {
    id: string;
    midi: number;
    beat: number;
    beats: number;
    accidental?: StaffAccidental;
    staffPos: number;
    x: number;
    y: number;
    head: StaffHead;
    dots: number;
    dotX: number;
    dotY: number;
    ledgerYs: number[];
    accidentalGlyph?: StaffAccidental;
    accidentalX: number;
    revealDelayMs: number;
    strikePhase: number;
    pitchName: string;
    rhythmName: string;
}

export interface MusicStaffStem {
    id: string;
    x: number;
    y1: number;
    y2: number;
    up: boolean;
    delayMs: number;
}

export interface MusicStaffFlag {
    id: string;
    x: number;
    y: number;
    up: boolean;
    delayMs: number;
}

export interface MusicStaffBeam {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    up: boolean;
    level: 1 | 2 | 3;
    delayMs: number;
}

export interface MusicStaffGeometry {
    clef: "treble" | "bass";
    /** Absolute y of the top staff line, after the content-derived offset. */
    staffTop: number;
    staffLines: number[];
    widthSp: number;
    heightSp: number;
    viewBox: string;
    clefX: number;
    clefY: number;
    noteX0: number;
    contentEnd: number;
    /** Reel period, in sp; loading engravings only. */
    period: number;
    /** Parked reading line, in sp; loading engravings only. */
    readingX: number;
    notes: MusicStaffNoteGeometry[];
    stems: MusicStaffStem[];
    flags: MusicStaffFlag[];
    beams: MusicStaffBeam[];
    barlines: { x: number; width: number }[];
}

export interface EngraveMusicStaffOptions {
    clef?: StaffClef;
    /** Beats per cycle; set only for the looping loading reel. */
    loopBeats?: number;
}

function assertNote(note: MusicStaffNoteEvent): void {
    if (!note.id) throw new TypeError("MusicStaff note ids must be non-empty.");
    if (!Number.isInteger(note.midi) || note.midi < 0 || note.midi > 127) {
        throw new RangeError(`MusicStaff note ${note.id} has a MIDI pitch outside 0–127.`);
    }
    if (!Number.isFinite(note.beat) || note.beat < 0) {
        throw new RangeError(`MusicStaff note ${note.id} has an invalid beat.`);
    }
    if (!Number.isFinite(note.beats) || note.beats <= 0) {
        throw new RangeError(`MusicStaff note ${note.id} has an invalid beats length.`);
    }
}

const frac = (value: number): number => ((value % 1) + 1) % 1;
const round = (value: number): number => Math.round(value * 1000) / 1000;

const QUANTIZED_RISE = [-1, -0.5, -0.25, 0, 0.25, 0.5, 1] as const;

/** Engrave one staff. Every extent below is derived from what is drawn. */
export function engraveMusicStaff(
    source: readonly MusicStaffNoteEvent[],
    options: EngraveMusicStaffOptions = {},
): MusicStaffGeometry {
    source.forEach(assertNote);
    const notes = [...source].sort((a, b) => a.beat - b.beat || a.midi - b.midi);

    // Clef: the one that minimises the worst ledger stack, then the total.
    const cost = (candidate: "treble" | "bass") => {
        const counts = notes.map((n) => ledgersFor(staffPos(n.midi, candidate, n.accidental)).length);
        return [Math.max(0, ...counts), counts.reduce((a, b) => a + b, 0)];
    };
    let clef: "treble" | "bass" = "treble";
    if (options.clef === "bass" || options.clef === "treble") {
        clef = options.clef;
    } else if (notes.length) {
        const [tMax, tSum] = cost("treble");
        const [bMax, bSum] = cost("bass");
        clef = bMax < tMax || (bMax === tMax && bSum < tSum) ? "bass" : "treble";
    }

    const clefExtent = clef === "treble" ? GLYPH_EXTENT.gClef : GLYPH_EXTENT.fClef;
    const clefYRel = clef === "treble" ? 3 : 1;
    const nominalX0 = METRICS.clefX + clefExtent.x1 + METRICS.clefGap;
    const barX0 = nominalX0 - METRICS.clefGap / 2;

    // Columns: same-beat notes share one x and one stem.
    const columns: { beat: number; members: MusicStaffNoteEvent[] }[] = [];
    for (const note of notes) {
        const last = columns[columns.length - 1];
        if (last && Math.abs(last.beat - note.beat) < 1e-6) last.members.push(note);
        else columns.push({ beat: note.beat, members: [note] });
    }

    const loop = options.loopBeats;
    const spans = columns.map((column, index) => {
        const next = columns[index + 1];
        if (next) return next.beat - column.beat;
        if (loop !== undefined) return loop + columns[0].beat - column.beat;
        return Math.max(...column.members.map((m) => m.beats));
    });

    const yOf = (position: number) => (8 - position) / 2;
    const middleY = yOf(4);
    const glyphOf = (note: MusicStaffNoteEvent): StaffAccidental | undefined => {
        const { alter } = spell(note.midi, note.accidental);
        return alter === -1 ? "flat" : alter === 1 ? "sharp"
            : note.accidental === "natural" ? "natural" : undefined;
    };

    const metrics = columns.map((column) => {
        const rhythm = rhythmOf(Math.min(...column.members.map((m) => m.beats)));
        const positions = column.members.map((m) => staffPos(m.midi, clef, m.accidental));
        const half = rhythm.head === "whole" ? METRICS.wholeHalfWidth : METRICS.headHalfWidth;
        // Ink either side of the column's x: an accidental leads, a dot trails.
        const lead = half + Math.max(0, ...column.members.map((note, i) => {
            const glyph = glyphOf(note);
            if (!glyph) return 0;
            return 0.2 + (ledgersFor(positions[i]).length ? 0.4 : 0) + GLYPH_EXTENT[glyph].x1;
        }));
        const trail = half + (rhythm.dots
            ? METRICS.dotGap + (rhythm.dots - 1) * METRICS.dotGap + METRICS.dotRadius
            : 0);
        return { rhythm, positions, half, lead, trail };
    });

    // Proportional spacing, expanded only where ink actually demands it — so an
    // accidental never lands on the barline and a dot never lands on a head.
    const CLEARANCE = 0.42;
    const xs: number[] = [];
    let edge = barX0 + METRICS.barlineThin;
    for (let index = 0; index < columns.length; index += 1) {
        const nominal = index === 0 ? nominalX0 : xs[index - 1] + advanceOf(spans[index - 1]);
        const x = Math.max(nominal, edge + CLEARANCE + metrics[index].lead);
        xs.push(x);
        edge = x + metrics[index].trail;
    }
    const noteX0 = xs[0] ?? nominalX0;
    const period = columns.length
        ? Math.max(
            xs[xs.length - 1] + advanceOf(spans[spans.length - 1]),
            edge + CLEARANCE + metrics[0].lead,
        ) - noteX0
        : 0;
    const readingX = noteX0 + (1 - 1 / ((1 + Math.sqrt(5)) / 2)) * period;

    const outNotes: MusicStaffNoteGeometry[] = [];
    const stems: MusicStaffStem[] = [];
    const flags: MusicStaffFlag[] = [];
    const beams: MusicStaffBeam[] = [];

    const columnData = columns.map((column, index) => {
        const { rhythm, positions } = metrics[index];
        const extreme = positions.reduce((a, b) => (Math.abs(b - 4) > Math.abs(a - 4) ? b : a));
        return {
            column,
            x: xs[index],
            rhythm,
            positions,
            up: extreme < 4,
            delayMs: 190 + Math.min(900, index * 44),
            index,
            tipY: undefined as number | undefined,
        };
    });

    // Beam groups: runs of flagged columns inside one beat, chunked at four.
    const grouped = new Set<number>();
    for (let index = 0; index < columnData.length;) {
        const head = columnData[index];
        if (head.rhythm.flags === 0) { index += 1; continue; }
        const run = [head];
        while (
            run.length < 4
            && columnData[index + run.length]?.rhythm.flags
            && Math.floor(columnData[index + run.length]!.column.beat) === Math.floor(head.column.beat)
        ) run.push(columnData[index + run.length]!);
        if (run.length < 2) { index += 1; continue; }
        run.forEach((member) => grouped.add(member.index));

        const lead = run.reduce((a, b) => {
            const aFar = Math.max(...a.positions.map((p) => Math.abs(p - 4)));
            const bFar = Math.max(...b.positions.map((p) => Math.abs(p - 4)));
            return bFar > aFar ? b : a;
        });
        const up = lead.up;
        run.forEach((member) => { member.up = up; });
        const tipOf = (member: typeof head) => {
            const edge = up ? Math.max(...member.positions) : Math.min(...member.positions);
            return yOf(edge) + (up ? -METRICS.stemLength : METRICS.stemLength);
        };
        const first = run[0], last = run[run.length - 1];
        const rawRise = tipOf(last) - tipOf(first);
        const rise = QUANTIZED_RISE.reduce((a, b) => (Math.abs(b - rawRise) < Math.abs(a - rawRise) ? b : a));
        const slope = rise / (last.x - first.x);
        const anchor = run.reduce((best, member) => {
            const candidate = tipOf(member) - slope * (member.x - first.x);
            return up ? Math.min(best, candidate) : Math.max(best, candidate);
        }, up ? Infinity : -Infinity);
        const beamY = (x: number) => anchor + slope * (x - first.x);
        const delayMs = Math.max(...run.map((member) => member.delayMs)) + 90;

        for (const level of [1, 2, 3] as const) {
            const inboard = (level - 1) * METRICS.beamInboard * (up ? 1 : -1);
            let start = 0;
            while (start < run.length) {
                if (run[start].rhythm.flags < level) { start += 1; continue; }
                let end = start;
                while (end + 1 < run.length && run[end + 1].rhythm.flags >= level) end += 1;
                if (level > 1 && end === start) {
                    // A lone secondary beam stubs inward from its own stem.
                    const stub = (start === 0 ? 1 : -1) * 0.9;
                    beams.push({
                        id: `${run[start].column.members[0].id}-b${level}`,
                        x1: run[start].x, y1: beamY(run[start].x) + inboard,
                        x2: run[start].x + stub, y2: beamY(run[start].x + stub) + inboard,
                        up, level, delayMs,
                    });
                } else if (end > start || level === 1) {
                    beams.push({
                        id: `${run[start].column.members[0].id}-b${level}`,
                        x1: run[start].x, y1: beamY(run[start].x) + inboard,
                        x2: run[end].x, y2: beamY(run[end].x) + inboard,
                        up, level, delayMs,
                    });
                }
                start = end + 1;
            }
        }
        run.forEach((member) => { member.tipY = beamY(member.x); });
        index += run.length;
    }

    for (const data of columnData) {
        const { column, x, rhythm, positions, up, delayMs, index } = data;
        const halfWidth = rhythm.head === "whole" ? METRICS.wholeHalfWidth : METRICS.headHalfWidth;
        const beamed = grouped.has(index);
        const stemId = column.members[0].id;

        column.members.forEach((note, memberIndex) => {
            const position = positions[memberIndex];
            const y = yOf(position);
            const glyph = glyphOf(note);
            const ledgerYs = ledgersFor(position).map(yOf);
            const shift = ledgerYs.length ? 0.4 : 0;
            outNotes.push({
                id: note.id,
                midi: note.midi,
                beat: note.beat,
                beats: note.beats,
                accidental: note.accidental,
                staffPos: position,
                x,
                y,
                head: rhythm.head,
                dots: rhythm.dots,
                dotX: x + halfWidth + METRICS.dotGap,
                dotY: position % 2 === 0 ? y - 0.5 : y,
                ledgerYs,
                accidentalGlyph: glyph,
                accidentalX: x - halfWidth - 0.2 - shift - (glyph ? GLYPH_EXTENT[glyph].x1 : 0),
                revealDelayMs: delayMs,
                strikePhase: loop === undefined ? 0 : frac((x - readingX) / period),
                pitchName: musicPitchName(note.midi, note.accidental),
                rhythmName: rhythm.name,
            });
        });

        if (rhythm.head === "whole") continue;
        const edge = up ? Math.max(...positions) : Math.min(...positions);
        const anchorY = yOf(edge) + (up ? -METRICS.stemAttachY : METRICS.stemAttachY);
        const natural = yOf(edge)
            + (up ? -1 : 1) * (METRICS.stemLength + Math.max(0, rhythm.flags - 1) * METRICS.beamInboard);
        const tipY = data.tipY !== undefined
            ? data.tipY
            : up ? Math.min(natural, middleY) : Math.max(natural, middleY);
        stems.push({
            id: stemId,
            x: x + (up ? METRICS.stemAttachX : -METRICS.stemAttachX),
            y1: anchorY,
            y2: tipY,
            up,
            delayMs,
        });
        if (!beamed && rhythm.flags > 0) {
            for (let level = 0; level < rhythm.flags; level += 1) {
                flags.push({
                    id: `${stemId}-f${level}`,
                    x: x + (up ? METRICS.stemAttachX : -METRICS.stemAttachX),
                    y: tipY + level * METRICS.beamInboard * (up ? 1 : -1),
                    up,
                    delayMs,
                });
            }
        }
    }

    const lastX = xs.length ? xs[xs.length - 1] : noteX0;
    const contentEnd = loop === undefined ? lastX + METRICS.tail : noteX0 + period * 4;
    const barlines = loop === undefined
        ? [
            { x: barX0, width: METRICS.barlineThin },
            { x: contentEnd, width: METRICS.barlineThin },
            { x: contentEnd + METRICS.barlineThin + METRICS.barlineGap, width: METRICS.barlineThick },
        ]
        : [{ x: barX0, width: METRICS.barlineThin }];
    const widthSp = loop === undefined
        ? contentEnd + METRICS.barlineThin + METRICS.barlineGap + METRICS.barlineThick
        : contentEnd;

    const ys = [
        0, 4,
        -METRICS.playheadRise, 4 + METRICS.playheadRise,
        clefYRel + clefExtent.y0, clefYRel + clefExtent.y1,
        ...outNotes.flatMap((note) => [
            note.y - 0.5, note.y + 0.5,
            ...note.ledgerYs,
            ...(note.accidentalGlyph
                ? [note.y + GLYPH_EXTENT[note.accidentalGlyph].y0, note.y + GLYPH_EXTENT[note.accidentalGlyph].y1]
                : []),
        ]),
        ...stems.map((stem) => stem.y2),
        ...flags.map((flag) => flag.y + (flag.up ? GLYPH_EXTENT.flag.y1 : -GLYPH_EXTENT.flag.y1)),
        ...beams.flatMap((beam) => {
            const thickness = METRICS.beamThickness * (beam.up ? 1 : -1);
            return [beam.y1, beam.y2, beam.y1 + thickness, beam.y2 + thickness];
        }),
    ];
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    const offset = METRICS.pad - yMin;
    const heightSp = yMax - yMin + METRICS.pad * 2;

    // Emitted coordinates are rounded once, here: the SVG carries engraving
    // measures, not floating-point exhaust.
    for (const note of outNotes) {
        note.x = round(note.x);
        note.y = round(note.y + offset);
        note.dotX = round(note.dotX);
        note.dotY = round(note.dotY + offset);
        note.accidentalX = round(note.accidentalX);
        note.ledgerYs = note.ledgerYs.map((value) => round(value + offset));
    }
    for (const stem of stems) {
        stem.x = round(stem.x);
        stem.y1 = round(stem.y1 + offset);
        stem.y2 = round(stem.y2 + offset);
    }
    for (const flag of flags) { flag.x = round(flag.x); flag.y = round(flag.y + offset); }
    for (const beam of beams) {
        beam.x1 = round(beam.x1);
        beam.x2 = round(beam.x2);
        beam.y1 = round(beam.y1 + offset);
        beam.y2 = round(beam.y2 + offset);
    }

    return {
        clef,
        staffTop: round(offset),
        staffLines: [0, 1, 2, 3, 4].map((index) => round(offset + index)),
        widthSp: round(widthSp),
        heightSp: round(heightSp),
        viewBox: `0 0 ${round(widthSp)} ${round(heightSp)}`,
        clefX: METRICS.clefX,
        clefY: round(clefYRel + offset),
        noteX0: round(noteX0),
        contentEnd: round(contentEnd),
        period: round(period),
        readingX: round(readingX),
        notes: outNotes,
        stems,
        flags,
        beams,
        barlines: barlines.map((bar) => ({ x: round(bar.x), width: bar.width })),
    };
}

/**
 * One composed phrase, in-staff by construction: paired eighths, a four-16th run
 * that earns a double beam, a dotted note, a lone flag, and quarters. It is the
 * loading surface's whole score — deliberate, not generated.
 */
export const LOADING_MOTIF: readonly MusicStaffNoteEvent[] = [
    { id: "m01", midi: 67, beat: 0, beats: 0.5 },
    { id: "m02", midi: 71, beat: 0.5, beats: 0.5 },
    { id: "m03", midi: 74, beat: 1, beats: 0.5 },
    { id: "m04", midi: 76, beat: 1.5, beats: 0.5 },
    { id: "m05", midi: 74, beat: 2, beats: 0.25 },
    { id: "m06", midi: 72, beat: 2.25, beats: 0.25 },
    { id: "m07", midi: 71, beat: 2.5, beats: 0.25 },
    { id: "m08", midi: 69, beat: 2.75, beats: 0.25 },
    { id: "m09", midi: 67, beat: 3, beats: 1 },
    { id: "m10", midi: 64, beat: 4, beats: 0.5 },
    { id: "m11", midi: 67, beat: 4.5, beats: 0.5 },
    { id: "m12", midi: 69, beat: 5, beats: 1.5 },
    { id: "m13", midi: 71, beat: 6.5, beats: 0.5 },
    { id: "m14", midi: 67, beat: 7, beats: 1 },
];

export const LOADING_BEATS = 8;
