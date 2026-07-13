// The ℱ (U+2131 SCRIPT CAPITAL F) outline as a hand-traced, closed point set,
// normalized to a unit box centered on the origin. It feeds `dftFromPoints`
// (the forward DFT) so the wordmark egg can reconstruct the glyph as an epicycle
// curve. A hand-traced set (over SVG `getPointAtLength` on a variable font) is
// the robust path — deterministic, no font-metrics dependency, and
// `dftFromPoints` is general so any point set drives it.
//
// The trace walks ONE continuous stroke that reads as an ℱ: down the slanted
// stem, a small foot serif, back up, the top bar, and the middle bar — a single
// closed path the DFT turns into a smooth phasor sum.

/**
 * A closed, evenly-resampled ℱ outline in a centered unit box (roughly
 * x,y ∈ [-0.5, 0.5]; y grows DOWNWARD, screen convention). `samples` controls
 * the resolution fed to the DFT (default 128 — enough harmonics for a crisp ℱ).
 */
export function fGlyphPoints(samples = 128): [number, number][] {
    // Anchor vertices tracing the ℱ as one continuous closed loop. Coordinates
    // are in a 0..100 design box; we normalize + recenter below. The path is
    // authored to read as a script-F: a tall slightly-italic stem, a top bar
    // flaring right, and a middle bar.
    const v: [number, number][] = [
        [62, 6], // top-right of the top bar
        [30, 6], // top-left (stem top)
        [24, 30], // stem upper-mid (slight italic lean)
        [50, 30], // middle bar right
        [44, 42], // middle bar lower-right (bar thickness)
        [20, 42], // stem mid-left after the middle bar
        [10, 94], // stem foot (bottom-left, the descender lean)
        [22, 94], // foot serif right
        [30, 60], // back up the stem inner edge
        [40, 36], // inner notch under the middle bar
        [36, 24], // inner stem under the top bar
        [56, 18], // top bar inner-right
        [62, 6], // close the loop
    ];

    return resampleClosed(recenterUnit(v), samples);
}

/** Recenter a 0..100 design-box polyline to a centered unit box. */
function recenterUnit(pts: [number, number][]): [number, number][] {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
    for (const [x, y] of pts) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    const w = maxX - minX || 1;
    const h = maxY - minY || 1;
    const s = 1 / Math.max(w, h);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    return pts.map(([x, y]) => [(x - cx) * s, (y - cy) * s]);
}

/**
 * Resample a closed polyline to `n` points uniformly by arc length, so the DFT
 * sees an evenly-sampled signal (uneven vertex spacing skews the spectrum).
 */
function resampleClosed(
    poly: [number, number][],
    n: number,
): [number, number][] {
    // Cumulative arc length around the closed loop.
    const seg: number[] = [];
    let total = 0;
    for (let i = 0; i < poly.length - 1; i++) {
        const dx = poly[i + 1][0] - poly[i][0];
        const dy = poly[i + 1][1] - poly[i][1];
        const len = Math.hypot(dx, dy);
        seg.push(len);
        total += len;
    }
    const out: [number, number][] = [];
    for (let k = 0; k < n; k++) {
        const target = (k / n) * total;
        let acc = 0;
        let i = 0;
        while (i < seg.length && acc + seg[i] < target) {
            acc += seg[i];
            i++;
        }
        if (i >= seg.length) {
            out.push([poly[poly.length - 1][0], poly[poly.length - 1][1]]);
            continue;
        }
        const t = seg[i] === 0 ? 0 : (target - acc) / seg[i];
        out.push([
            poly[i][0] + (poly[i + 1][0] - poly[i][0]) * t,
            poly[i][1] + (poly[i + 1][1] - poly[i][1]) * t,
        ]);
    }
    return out;
}
