/**
 * types.ts — the public API surface (SPEC §6). Pure types, 0 runtime.
 * ─────────────────────────────────────────────────────────────────────────────
 * The L5 surface steals rough-notation's *vocabulary* (annotate-style props +
 * ordered groups), not its code. Every prop has a per-brush default, so the
 * common call is one tag: <HandMark>who pays in</HandMark>.
 */
import type { Brush, BrushName } from "./brush";

/** A target rect in the 0..100 × 0..40 marking space (positioned mode). */
export interface MarkBox {
    x: number;
    y: number;
    w: number;
    h: number;
}

export type HandShape =
    | "underline" // text-rect → wobble line along the baseline (the masthead DEFAULT)
    | "strikethrough" // text-rect → wobble line through the middle
    | "highlight" // text-rect → fat ribbon over the box (weight + multiply do the band)
    | "circle" // bbox → ellipsePoints, hand-circle overshoot (positioned mode)
    | "box" // bbox → wobbleRect (four wobbled sides)
    | "bracket" // bbox → two short corner wobble lines (open bracket)
    | "path"; // arbitrary → caller supplies SVG `d` or Point[] (the escape hatch)

export type HandAnimation =
    | "none" // static seeded stroke                               DEFAULT
    | "draw-on" // reveal once on appear (dashoffset for pen, clip-path wipe for grain)
    | "boil" // continuous frame-cycled wobble (no draw-on)
    | "draw-then-boil"; // draw-on, then settle into a gentle boil

export interface HandMarkProps {
    // ── identity ──
    /** 'pen'(default) | preset name | full/partial Brush object. */
    brush?: BrushName | Partial<Brush>;
    /** default 'underline'. */
    shape?: HandShape;
    /** ANY CSS color. default 'currentColor'. */
    color?: string;
    /** procedural variant — deterministic. default 1. */
    seed?: number;
    /** spread over the resolved brush (3rd resolution level). */
    overrides?: Partial<Brush>;

    // ── animation ──
    /** default 'none' (the static-masthead default). */
    animation?: HandAnimation;
    /** draw-on duration. default 800. */
    drawMs?: number;
    /** draw-on start delay. default 0. */
    drawDelayMs?: number;
    /** draw-on trigger. default 'visible' (IntersectionObserver). */
    appear?: "mount" | "visible" | "manual";
    /** boil frame rate. default 8 (≈125ms). */
    boilFps?: number;
    /** distinct boil frames. default 3. */
    boilFrames?: number;

    // ── geometry knobs (pass-through to pencil-boil WobbleOptions) ──
    /** override brush.roughness. */
    roughness?: number;
    /** wobble resolution. default per-brush. */
    segments?: number;
    /** angular kinks vs smooth bezier. default false. */
    jagged?: boolean;
    /**
     * NATURAL-underline excursion knob (BG.W-HANDMARK-PERFECT (c)). Multiplies the
     * scale-relative wobble amplitude (`span × NOISE_AMP_FRAC × amplitude`). Default is
     * unset ⇒ the amplitude is derived from the brush `wobble` scalar (byte-identical at
     * the shipped default); an explicit value WINS (e.g. `1.4` for a bolder hand line,
     * font-proportional). Only the natural/boil underline reads it.
     */
    amplitude?: number;
    /**
     * NATURAL underline morphology (BA.W-HANDMARK C-2). When true (the masthead
     * `boil` voice), the underline geometry goes PROCEDURAL — scale-relative
     * amplitude, an IRREGULAR seeded period count, off the house prng leaf feeding
     * pencil-boil — instead of pencil-boil's single `wobbleLinePoints` line. The
     * `boil` brush auto-engages it; the default underline keeps the pencil-boil line.
     * Ignored on non-underline shapes.
     */
    natural?: boolean;

    // ── modes ──
    /** POSITIONED mode (circle a datum): explicit target rect. */
    box?: MarkBox;
    /** shape:'path' escape hatch — arbitrary SVG `d` (wins over shape). */
    path?: string;
    /** arbitrary point stream → brush ink. */
    points?: [number, number][];
}
