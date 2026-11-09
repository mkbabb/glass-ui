// The data-viz entrance register: which named spring lands each kind of chart mark, and
// how far apart a cascade of them is spaced. No new spring; every entry is a row of
// SPRING_PRESETS, with its CSS twin in `glass/viz-enter.css` (`.viz-mark`, `.viz-bar`,
// `.viz-ripple` on `--spring-<row>`) and its JS twin through `springPreset(row)`.
//
//   mark    a point, a dot, a glyph landing in place          `present` (lands dead)
//   bar     a bar or area growing from its baseline           `panel`, revealed from the
//           baseline so the rebound never draws past the value
//   ripple  a radial field, a map pulse                       `bloom`
//
// THE STAGGER. One spacing, `--motion-stagger-default` (80 ms), capped so the whole
// cascade starts inside one `panel` duration: a series of n marks is spaced
// `min(80 ms, panel / n)`. Twelve bars cascade at 37.5 ms; three at 80.

import { springPreset, type SpringPresetName } from "../spring/springPresets";
import { motionTempo } from "../core/motionTempo";

/** The register: a kind of chart entrance → the named spring that lands it. */
export const VIZ_ENTRANCE = {
    mark: "present",
    bar: "panel",
    ripple: "bloom",
} as const satisfies Record<string, SpringPresetName>;

export type VizEntrance = keyof typeof VIZ_ENTRANCE;

/** The canonical stagger, the JS twin of `--motion-stagger-default`. */
export const STAGGER_DEFAULT_MS = 80;

/**
 * The settle of a row, in ms, from the closed-form step response of the row's
 * (response, ζ) pair (ωₙ = 2π / response) over the row's own band, rounded to 10 ms
 * as the `--spring-<row>-settle` tokens are. This module ships on the engine-free
 * `/motion-core` surface, so it solves the response itself; a test holds it to the
 * engine's settle for every row.
 */
function settleMs(name: SpringPresetName): number {
    const { response, dampingFraction: z, settleBand } = springPreset(name);
    const w = (2 * Math.PI) / response;
    const step = (t: number): number => {
        if (z < 1) {
            const wd = w * Math.sqrt(1 - z * z);
            return (
                1 -
                Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t))
            );
        }
        return 1 - Math.exp(-w * t) * (1 + w * t);
    };
    let last = 0;
    for (let t = 0.0005; t < 5; t += 0.0005) {
        if (Math.abs(1 - step(t)) >= settleBand) last = t;
    }
    return Math.round(last * 100) * 10;
}

let panelSettleMs: number | null = null;

/**
 * The spacing for a cascade of `count` items: the canonical stagger, tightened so the
 * last item starts inside one `panel` duration (at the effective `--motion-tempo`).
 */
export function cascadeStaggerMs(count: number): number {
    if (count <= 1) return STAGGER_DEFAULT_MS;
    panelSettleMs ??= settleMs(VIZ_ENTRANCE.bar);
    return Math.min(STAGGER_DEFAULT_MS, (panelSettleMs * motionTempo()) / count);
}
