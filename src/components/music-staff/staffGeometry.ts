export type StaffAccidental = "sharp" | "flat" | "natural";
export type StaffClef = "auto" | "treble" | "bass";

/**
 * The small, parser-independent note contract consumed by MusicStaff.
 * Seconds are the universal fallback timing axis; Standard MIDI tick data may
 * accompany them when a caller needs tempo-independent spacing.
 */
export interface MusicStaffNoteEvent {
    id: string;
    midi: number;
    start: number;
    duration: number;
    startTick?: number;
    durationTicks?: number;
    ticksPerQuarter?: number;
    voice?: string | number;
    velocity?: number;
    accidental?: StaffAccidental;
}

export interface MusicStaffNoteGeometry extends MusicStaffNoteEvent {
    x: number;
    y: number;
    stemEndY: number;
    stemUp: boolean;
    ledgerYs: number[];
    revealDelayMs: number;
    openHead: boolean;
    flagCount: number;
    normalizedStart: number;
}

export interface MusicStaffGeometry {
    width: number;
    height: number;
    paddingX: number;
    staffTop: number;
    staffBottom: number;
    clef: Exclude<StaffClef, "auto">;
    staffLines: number[];
    duration: number;
    notes: MusicStaffNoteGeometry[];
}

export interface EngraveMusicStaffOptions {
    width?: number;
    height?: number;
    paddingX?: number;
    lineSpacing?: number;
    clef?: StaffClef;
    staggerMs?: number;
}

const PITCH_CLASS_TO_DIATONIC = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6] as const;
const TREBLE_BOTTOM_DIATONIC = 4 * 7 + 2;
const BASS_BOTTOM_DIATONIC = 2 * 7 + 4;

function assertFinitePositive(value: number, name: string): void {
    if (!Number.isFinite(value) || value <= 0) {
        throw new RangeError(`MusicStaff ${name} must be a finite positive number.`);
    }
}

function assertNote(note: MusicStaffNoteEvent): void {
    if (!note.id) throw new TypeError("MusicStaff note ids must be non-empty.");
    if (!Number.isInteger(note.midi) || note.midi < 0 || note.midi > 127) {
        throw new RangeError(`MusicStaff note ${note.id} has a MIDI pitch outside 0–127.`);
    }
    if (!Number.isFinite(note.start) || note.start < 0) {
        throw new RangeError(`MusicStaff note ${note.id} has an invalid start.`);
    }
    assertFinitePositive(note.duration, `note ${note.id} duration`);
    if (note.startTick !== undefined && (!Number.isFinite(note.startTick) || note.startTick < 0)) {
        throw new RangeError(`MusicStaff note ${note.id} has an invalid startTick.`);
    }
    if (note.durationTicks !== undefined) {
        assertFinitePositive(note.durationTicks, `note ${note.id} durationTicks`);
    }
    if (note.ticksPerQuarter !== undefined) {
        assertFinitePositive(note.ticksPerQuarter, `note ${note.id} ticksPerQuarter`);
    }
}

function diatonicIndex(midi: number): number {
    const octave = Math.floor(midi / 12) - 1;
    return octave * 7 + PITCH_CLASS_TO_DIATONIC[((midi % 12) + 12) % 12];
}

function ledgerLines(
    y: number,
    staffTop: number,
    staffBottom: number,
    spacing: number,
): number[] {
    const lines: number[] = [];
    if (y >= staffBottom + spacing) {
        for (let lineY = staffBottom + spacing; lineY <= y + 0.1; lineY += spacing) {
            lines.push(lineY);
        }
    }
    if (y <= staffTop - spacing) {
        for (let lineY = staffTop - spacing; lineY >= y - 0.1; lineY -= spacing) {
            lines.push(lineY);
        }
    }
    return lines;
}

/** Deterministically engrave one bounded five-line quotation staff. */
export function engraveMusicStaff(
    source: readonly MusicStaffNoteEvent[],
    options: EngraveMusicStaffOptions = {},
): MusicStaffGeometry {
    const width = options.width ?? 960;
    const height = options.height ?? 184;
    // The clef owns the opening column. The first onset begins after it rather
    // than colliding with its drawn contour.
    const paddingX = options.paddingX ?? 128;
    const lineSpacing = options.lineSpacing ?? 10;
    const staggerMs = options.staggerMs ?? 44;
    assertFinitePositive(width, "width");
    assertFinitePositive(height, "height");
    assertFinitePositive(lineSpacing, "lineSpacing");
    if (!Number.isFinite(paddingX) || paddingX < 0 || paddingX * 2 >= width) {
        throw new RangeError("MusicStaff paddingX must leave a positive drawable width.");
    }
    if (!Number.isFinite(staggerMs) || staggerMs < 0) {
        throw new RangeError("MusicStaff staggerMs must be a finite non-negative number.");
    }

    source.forEach(assertNote);
    const staffTop = (height - lineSpacing * 4) / 2;
    const staffBottom = staffTop + lineSpacing * 4;
    const usesTicks = source.length > 0 && source.every((note) => note.startTick !== undefined);
    const positionOf = (note: MusicStaffNoteEvent) => usesTicks ? (note.startTick ?? 0) : note.start;
    const extentOf = (note: MusicStaffNoteEvent) => usesTicks
        ? (note.startTick ?? 0) + (note.durationTicks ?? 1)
        : note.start + note.duration;
    const notes = [...source].sort(
        (left, right) => positionOf(left) - positionOf(right) || left.midi - right.midi,
    );
    const duration = Math.max(1, ...notes.map(extentOf));
    const drawableWidth = width - paddingX * 2;
    const medianMidi = notes.length
        ? [...notes].sort((left, right) => left.midi - right.midi)[Math.floor(notes.length / 2)].midi
        : 64;
    const clef = options.clef === "bass" || (options.clef !== "treble" && medianMidi < 60)
        ? "bass"
        : "treble";
    const bottomDiatonic = clef === "bass" ? BASS_BOTTOM_DIATONIC : TREBLE_BOTTOM_DIATONIC;
    const onsetRanks = new Map<number, number>();
    for (const note of notes) {
        const onset = positionOf(note);
        if (!onsetRanks.has(onset)) onsetRanks.set(onset, onsetRanks.size);
    }

    return {
        width,
        height,
        paddingX,
        staffTop,
        staffBottom,
        clef,
        staffLines: Array.from({ length: 5 }, (_, index) => staffTop + index * lineSpacing),
        duration,
        notes: notes.map((note, index) => {
            const position = positionOf(note);
            const x = paddingX + (position / duration) * drawableWidth;
            const normalizedStart = position / duration;
            const y = staffBottom
                - (diatonicIndex(note.midi) - bottomDiatonic) * (lineSpacing / 2);
            const stemUp = y >= (staffTop + staffBottom) / 2;
            const beats = note.durationTicks !== undefined && note.ticksPerQuarter
                ? note.durationTicks / note.ticksPerQuarter
                : note.duration;
            return {
                ...note,
                x,
                y,
                stemUp,
                stemEndY: y + (stemUp ? -32 : 32),
                ledgerYs: ledgerLines(y, staffTop, staffBottom, lineSpacing),
                revealDelayMs: 190 + Math.min(900, (onsetRanks.get(position) ?? index) * staggerMs),
                openHead: beats >= 2,
                flagCount: beats < 0.5 ? 2 : beats < 1 ? 1 : 0,
                normalizedStart,
            };
        }),
    };
}

export function musicPitchName(
    midi: number,
    accidental?: StaffAccidental,
): string {
    const names = accidental === "sharp"
        ? ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"]
        : ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
    return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}
