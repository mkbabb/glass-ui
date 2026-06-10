/**
 * geometry.ts — SEMANTIC shape → pencil-boil centerlines (L1, pure; SPEC §3).
 * ─────────────────────────────────────────────────────────────────────────────
 * A shape is a pure mapper: (semantic target) → L1 geometry. The renderer never
 * knows what it drew — it sees only `Point[]`. Adding a shape = adding one switch
 * arm; nothing downstream changes (texture + animation are shape-blind). This is
 * the generality lever (Brush ⟂ Path).
 *
 * The marking coordinate space is 0..100 × 0..40, with `preserveAspectRatio="none"`
 * so the <svg> stretches to the slotted word box (the SPEC §6.2 width-invariance
 * contract). Two usage modes:
 *   - text mode (box == null): use the full viewBox (single-line underline/strike)
 *   - positioned mode (box = {x,y,w,h}): map an explicit rect (circle a datum)
 *
 * The circle arm rides pencil-boil 0.4.0's `ellipsePoints` (the hand-circle
 * overshoot ring — the sole upstream geometry delta this component required).
 */
import {
    catmullRomToBezier,
    ellipsePoints,
    perturbPoints,
    perturbPointsClosed,
    pointsToLinear,
    wobbleLinePoints,
    type WobbleOptions,
} from "@mkbabb/pencil-boil";
import type { HandShape, MarkBox } from "./types";

export const VB_W = 100;
export const VB_H = 40;

/** A shape maps to one or more centerlines (open polylines) or one closed ring. */
export interface ShapeGeom {
    lines: [number, number][][];
    closed: boolean;
}

/** Semantic shape → { lines, closed } in the marking space (or a positioned box). */
export function shapeGeom(
    shape: HandShape,
    opts: WobbleOptions,
    box: MarkBox | null = null,
): ShapeGeom {
    const pad = 4;
    const x1 = box ? box.x : pad;
    const x2 = box ? box.x + box.w : VB_W - pad;
    const cy = box ? box.y + box.h / 2 : VB_H / 2;
    const yBase = box ? box.y + box.h * 0.92 : VB_H - 8;
    const seed = opts.seed ?? 1;

    const L = (a: number, b: number, c: number, d: number, ds = 0): [number, number][] =>
        wobbleLinePoints(a, b, c, d, { ...opts, seed: seed + ds });

    switch (shape) {
        case "underline":
            return { lines: [L(x1, yBase, x2, yBase)], closed: false };
        case "strikethrough":
            return { lines: [L(x1, cy, x2, cy)], closed: false };
        case "highlight":
            // weight + multiply make the band; the centerline rides the box middle.
            return { lines: [L(x1, cy, x2, cy)], closed: false };
        case "box": {
            const y1 = box ? box.y : pad;
            const y2 = box ? box.y + box.h : VB_H - pad;
            return {
                lines: [
                    L(x1, y1, x2, y1, 0),
                    L(x2, y1, x2, y2, 1),
                    L(x2, y2, x1, y2, 2),
                    L(x1, y2, x1, y1, 3),
                ],
                closed: false,
            };
        }
        case "bracket": {
            const y1 = box ? box.y : pad;
            const y2 = box ? box.y + box.h : VB_H - pad;
            const ext = (x2 - x1) * 0.22;
            return {
                lines: [
                    L(x1 + ext, y1, x1, y1, 0),
                    L(x1, y1, x1, y2, 1),
                    L(x1, y2, x1 + ext, y2, 2),
                ],
                closed: false,
            };
        }
        case "circle": {
            const cx = box ? box.x + box.w / 2 : VB_W / 2;
            const ccy = box ? box.y + box.h / 2 : VB_H / 2;
            const rx = (box ? box.w / 2 : VB_W / 2) - 3;
            const ry = (box ? box.h / 2 : VB_H / 2) - 3;
            return { lines: [ellipsePoints(cx, ccy, rx, ry, opts)], closed: true };
        }
        case "path":
            // caller supplies props.path — the renderer short-circuits to it.
            return { lines: [], closed: false };
        default:
            return { lines: [L(x1, yBase, x2, yBase)], closed: false };
    }
}

/** Boil one geometry: re-perturb the CACHED centerlines (anchored → no draw-on pop). */
export function boilLines(
    { lines, closed }: ShapeGeom,
    amount: number,
    seed: number,
): [number, number][][] {
    return lines.map((pts, i) => {
        if (closed) return perturbPointsClosed(pts, amount, seed + i);
        const a = pts[0];
        const z = pts[pts.length - 1];
        return perturbPoints(pts, a[0], a[1], z[0], z[1], amount, seed + i);
    });
}

/** Serialize centerlines → one SVG `d` (multi-line shapes concat with a space). */
export function serialize(lines: [number, number][][], jagged = false): string {
    return lines
        .map((pts) => (jagged ? pointsToLinear(pts) : catmullRomToBezier(pts)))
        .join(" ");
}
