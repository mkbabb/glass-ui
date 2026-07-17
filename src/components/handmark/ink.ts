/**
 * ink.ts — the BRUSH stage: centerline + Brush → SVG fragment (pure; SPEC §4.1).
 * ─────────────────────────────────────────────────────────────────────────────
 * `ink()` is the union of the three sibling renderers, gated by brush FIELDS —
 * KISS, one path, ZERO instrument-name conditionals (SPEC §12 acc-1). Only field
 * reads decide the medium:
 *
 *   - `ribbon` picks the L2 body: 'stroke' (pen/pencil/ring — a plain stroked <path>)
 *     vs 'hull' (the opt-in vendored perfect-freehand variable-width fill — the boil/
 * crayon/marker/highlighter voices, the (b) slab). The hull body
 *     carries the se-GUARD: a degenerate near-point outline falls back to a stroked
 * path so a tiny-datum hull mark never vanishes ((b)).
 *   - `passes` + `passOpacity` → the crayon offset-overdraw heavy-core look.
 *   - `grain > 0` flips on the L3 filter (texture.ts); 0 ⇒ no filter (pen is free).
 *   - `blend` unlocks highlighter ('multiply'); no other field needs it.
 *   - `cap` (C-1(d)) is plumbed onto the emitted `InkPath.cap` → the DOM
 *     `stroke-linecap` (the fork dropped it on the floor here).
 *   - `stamp` (SPEC §5) REPLACES the built-in ink stage only — it inherits draw-on
 *     + boil + the seeded variant for free.
 *
 * THE SEED RECONCILE ([S2]): the per-pass jitter rng is the HOUSE
 * `mulberry32` (src/composables/glass/procedural/prng.ts — the single-source), NOT pencil-boil's
 * mulberry32. ONE seed leaf in glass-ui code.
 *
 * The renderer emits a fragment the SFC binds; it owns no DOM and no reactivity.
 */
import { perturbPoints, catmullRomToBezier, pointsToLinear } from "@mkbabb/pencil-boil";
import { mulberry32 } from "../../composables/glass/procedural/prng";
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

/** ONE Catmull-Rom pre-smooth pass — fair the raw value-noise so the curvature read
 *  sees a faired curve, not raw per-vertex jitter (the compose-order pin: noise →
 *  ONE smooth → curvature→pressure → hull). Endpoints are anchored. */
function preSmooth(pts: [number, number][]): [number, number][] {
    const n = pts.length;
    if (n < 3) return pts;
    const out: [number, number][] = [pts[0]];
    for (let i = 1; i < n - 1; i++) {
        const a = pts[i - 1];
        const c = pts[i + 1];
        const p = pts[i];
        // a gentle 3-tap fair (1/4·a + 1/2·p + 1/4·c) — one pass, weight on the centre.
        out.push([
            0.25 * a[0] + 0.5 * p[0] + 0.25 * c[0],
            0.25 * a[1] + 0.5 * p[1] + 0.25 * c[1],
        ]);
    }
    out.push(pts[n - 1]);
    return out;
}

/** Discrete unsigned curvature at each vertex (turning angle / arc, 0 on straights). */
function curvatureAt(pts: [number, number][], i: number): number {
    const n = pts.length;
    if (i <= 0 || i >= n - 1) return 0;
    const a = pts[i - 1];
    const p = pts[i];
    const c = pts[i + 1];
    const v1x = p[0] - a[0];
    const v1y = p[1] - a[1];
    const v2x = c[0] - p[0];
    const v2y = c[1] - p[1];
    const l1 = Math.hypot(v1x, v1y);
    const l2 = Math.hypot(v2x, v2y);
    if (l1 === 0 || l2 === 0) return 0;
    // cross / (|v1||v2|) = sin(turn) — unsigned turning magnitude in [0,1].
    const cross = Math.abs(v1x * v2y - v1y * v2x) / (l1 * l2);
    return Math.min(1, cross);
}

/**
 * Add seeded [x,y,pressure] pressure to a centerline for the pf hull body —
 * CURVATURE-COUPLED (the "pen line not wiggly line" truth: a hand presses HARDER on
 * the straights, LIGHTER through a tight wobble). The compose order is pinned: the
 * centerline is faired by ONE pre-smooth pass FIRST (so curvature reads a faired
 * curve, not raw jitter), then high local curvature → low pressure → thin; straight
 * → high pressure → thick. A mild seeded per-sample jitter keeps the body alive. The
 * profile is clamped 0.05..1; the seed leaf is the HOUSE `mulberry32`.
 *
 * On a low-curvature centerline (the highlighter's near-flat slab) the curvature term
 * is ~0, so the pressure floors to the straight baseline — the highlighter-fence
 * holds (a flat brush is essentially a no-op).
 */
const CURVATURE_GAIN = 2.5; // how much a tight wobble thins the line (the body variation)
const PRESSURE_BASE = 0.9; // the straight-segment pressure (a firm press)

function addPressure(
    pts: [number, number][],
    b: Brush,
    seed: number,
): [number, number, number][] {
    const rng = mulberry32(seed >>> 0);
    // Fair the line ONCE to read curvature off a smooth curve (the compose-order pin);
    // the emitted coords stay the ORIGINAL points — the fairing informs pressure, it
    // does not move the painted line.
    const faired = preSmooth(pts);
    return pts.map((p, i) => {
        const k = curvatureAt(faired, i);
        // straight (k→0) ⇒ PRESSURE_BASE; tight wobble (k→1) ⇒ thinned by the gain.
        const swell =
            PRESSURE_BASE * (1 - CURVATURE_GAIN * k) + (rng() - 0.5) * b.weightJitter * 0.4;
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
            // streamline (pf low-pass) keyed off `roughness` — a ROUGH brush (boil's
            // 0.9, the curvature-rich value-noise) gets a LOW streamline (~0.20) so the
            // irregular wander survives the low-pass; a smooth brush (the highlighter's
            // 0.5) keeps ~0.50 (the audited slab, A8-preserved). The line through
            // (roughness 0.5 → 0.50, 0.9 → 0.20), floored at 0.12.
            const streamline = Math.max(0.12, Math.min(0.6, 0.875 - 0.75 * b.roughness));
            const outline = getStroke(pressured, {
                size: b.weight,
                thinning: b.thinning,
                streamline,
                last: true,
                start: { taper: b.taper.start, easing: easeFor(b.taper.ease) },
                end: { taper: b.taper.end, easing: easeFor(b.taper.ease) },
            });
            const hullD = getSvgPathFromStroke(outline);
            // ── (b) THE HULL se-GUARD (SPEC §3 residual b) ──
            // `getSvgPathFromStroke` returns "" when `outline.length < 4` (a degenerate
            // short/tiny-datum centerline → a near-point hull), so a bare `<path d="">`
            // renders NOTHING — the highlighter/marker/crayon/boil hull marks all VANISH
            // over a 1ch box-mode datum. A missing mark must never silently disappear:
            // on a degenerate outline, FALL BACK to the plain stroked body (switch `kind`
            // to stroke) so the mark ALWAYS paints a visible band. The full-span case is
            // byte-untouched (outline.length ≥ 4 → the filled hull as before).
            if (outline.length < 4 || hullD === "") {
                paths.push({
                    d: serialize(jittered),
                    stroke: color,
                    opacity,
                    blend: b.blend,
                    cap: b.cap,
                });
            } else {
                paths.push({
                    d: hullD,
                    fill: color,
                    opacity,
                    blend: b.blend,
                    cap: b.cap,
                });
            }
        } else {
            // ── default: plain stroked path (pen/pencil/ring — the clean stroke voices) ──
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
