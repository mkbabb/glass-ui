/**
 * ink.ts — the BRUSH stage: centerline + Brush → SVG fragment (pure; SPEC §4.1).
 * ─────────────────────────────────────────────────────────────────────────────
 * `ink()` is the union of the three sibling renderers, gated by brush FIELDS —
 * KISS, one path, ZERO instrument-name conditionals (SPEC §12 acc-1). Only field
 * reads decide the medium:
 *
 *   - `ribbon` picks the L2 body: 'stroke' (pen/crayon — plain stroked <path>) vs
 *     'hull' (the opt-in vendored perfect-freehand variable-width fill — the
 *     highlighter's BA.W-HANDMARK C-1(b) slab).
 *   - `passes` + `passOpacity` → the crayon offset-overdraw heavy-core look.
 *   - `grain > 0` flips on the L3 filter (texture.ts); 0 ⇒ no filter (pen is free).
 *   - `blend` unlocks highlighter ('multiply'); no other field needs it.
 *   - `cap` (C-1(d)) is plumbed onto the emitted `InkPath.cap` → the DOM
 *     `stroke-linecap` (the fork dropped it on the floor here).
 *   - `stamp` (SPEC §5) REPLACES the built-in ink stage only — it inherits draw-on
 *     + boil + the seeded variant for free.
 *
 * THE SEED RECONCILE (BA.W-HANDMARK [S2]): the per-pass jitter rng is the HOUSE
 * `mulberry32` (src/utils/prng.ts — the AV.W14 single-source), NOT pencil-boil's
 * mulberry32. ONE seed leaf in glass-ui code.
 *
 * The renderer emits a fragment the SFC binds; it owns no DOM and no reactivity.
 */
import { perturbPoints, catmullRomToBezier, pointsToLinear } from "@mkbabb/pencil-boil";
import { mulberry32 } from "../../../utils/prng";
import type { Brush, InkPath } from "./brush";
import { getStroke, getSvgPathFromStroke } from "./freehand";
import { grainFilter, hasGrain } from "./texture";

export interface SVGFragment {
    paths: InkPath[];
    filterId: string | null;
    defs: string[];
}

/** Total arc length of a centerline (for stamp spacing). */
function arcLength(pts: [number, number][]): number {
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
        len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    }
    return len;
}

/** Add seeded [x,y,pressure] pressure to a centerline for the pf hull body. */
function addPressure(
    pts: [number, number][],
    b: Brush,
    seed: number,
): [number, number, number][] {
    const rng = mulberry32(seed >>> 0);
    return pts.map((p, i) => {
        const t = i / Math.max(1, pts.length - 1);
        // a seeded low-freq swell × a mild per-sample jitter (the crayon body)
        const swell = 0.5 + 0.35 * Math.sin(Math.PI * t) + (rng() - 0.5) * b.weightJitter * 0.4;
        return [p[0], p[1], Math.max(0.05, Math.min(1, swell))];
    });
}

/** perfect-freehand taper easing per the TaperSpec.ease field. */
function easeFor(kind: "linear" | "out-cubic"): (t: number) => number {
    return kind === "out-cubic" ? (t) => 1 - Math.pow(1 - t, 3) : (t) => t;
}

/**
 * ink — the only stage the brush fully drives. `jagged` serialises the stroke body
 * with angular kinks (pointsToLinear) instead of the smooth Catmull-Rom bezier.
 */
export function ink(
    centerline: [number, number][],
    b: Brush,
    seed: number,
    color: string,
    filterId: string,
    jagged = false,
): SVGFragment {
    // ── ESCAPE HATCH (SPEC §5) — replaces the built-in ink stage only. ──
    if (b.stamp) {
        const rng = mulberry32(seed >>> 0);
        const frag = b.stamp({
            centerline,
            brush: b,
            rng,
            seed,
            length: arcLength(centerline),
            color,
        });
        return {
            paths: frag.paths,
            filterId: frag.filterId ?? null,
            defs: frag.defs ?? [],
        };
    }

    const paths: InkPath[] = [];
    const serialize = (pts: [number, number][]): string =>
        jagged ? pointsToLinear(pts) : catmullRomToBezier(pts);

    for (let k = 0; k < b.passes; k++) {
        // each pass is its own seeded dry stroke, lightly offset (the overdraw brick)
        const a = centerline[0];
        const z = centerline[centerline.length - 1];
        const jittered = perturbPoints(
            centerline,
            a[0],
            a[1],
            z[0],
            z[1],
            b.weight * 0.06,
            seed + 991 * k,
        );
        const opacity = b.opacity * (1 - b.passOpacity * k);

        if (b.ribbon === "hull") {
            // ── L2 variable-width body (opt-in, vendored perfect-freehand) ──
            const pressured = addPressure(jittered, b, seed + 7 * k);
            const outline = getStroke(pressured, {
                size: b.weight,
                thinning: b.thinning,
                streamline: Math.max(0.1, 0.55 - b.roughness * 0.1),
                last: true,
                start: { taper: b.taper.start, easing: easeFor(b.taper.ease) },
                end: { taper: b.taper.end, easing: easeFor(b.taper.ease) },
            });
            paths.push({
                d: getSvgPathFromStroke(outline),
                fill: color,
                opacity,
                blend: b.blend,
                cap: b.cap,
            });
        } else {
            // ── default: plain stroked path (pen / the shipped stroke-crayon) ──
            paths.push({
                d: serialize(jittered),
                stroke: color,
                opacity,
                blend: b.blend,
                cap: b.cap,
            });
        }
    }

    const filter = hasGrain(b) ? grainFilter(filterId, b, seed) : "";
    return {
        paths,
        filterId: filter ? filterId : null,
        defs: filter ? [filter] : [],
    };
}
