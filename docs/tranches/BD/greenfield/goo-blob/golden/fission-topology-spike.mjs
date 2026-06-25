#!/usr/bin/env node
// GooBlob GOLDEN — fission-topology spike (THROWAWAY).
//
// De-risks the boldest move (Move A): does retiring the "satellite never leaves the
// smin reach" clamp + re-basing the orbit to 0.30 actually produce a 2->1->2 connected-
// component cycle WITHOUT blowing the calm-lean ceiling (0.10)?
//
// This is a pure-math question over the SHARED CPU resolveFrame kinematics + the smin
// field — no GPU, no browser. The spike reproduces:
//   - the satellite orbit kinematics (orbitPos, the eccentric ellipse),
//   - the IQ circular smin field (sminCircularG, the library default merge),
//   - a rasterized silhouette + flood-fill connected-component count (mirrors the
//     on-disk blob-studio.spec.ts readback: FG mask -> step-4 downsample -> components
//     with a satellite-sized COMPONENT_MIN floor),
//   - the whole-canvas lean centroid (the proof:blob-render calm-lean metric).
//
// It runs HEAD geometry (orbit 0.17 inside body 0.22, clamp ON) -> proves ALWAYS 1
// component (born-RED) and GOLDEN geometry (orbit 0.30, single bounded fission excursion)
// -> proves 2->1->2 + centroid stays under 0.10.
//
// Run: node docs/tranches/BD/greenfield/goo-blob/golden/fission-topology-spike.mjs

// ── verified-from-source constants (constants.ts / types.ts) ───────────────────────
const POS_SCALE = 1 / 1.6; // 0.625 — every length uniform rides this
const SMOOTH_K = 0.05; // membrane.smoothK (lean-safe library default), POS_SCALE'd in renderer
const BODY_R = 0.22; // geometry.bodyRadius (HELD in both)
const SAT_R = 0.082; // geometry.satelliteRadius
const ECC = 0.05; // geometry.eccentricity (near-circular default)

// BD.W-GOOBLOB-MERCURY-COLONY — the SHIPPED fission constants (constants.ts). The spike
// now drives the REAL `fissionSnap` envelope + the real reach bounds (the DELTA-ASSAY
// C1·R1 fold: NO hand-authored sin, NO apex 0.40 — the SHIPPED apex 0.40 with the snap
// curve, the real lean stack with a synthetic flick toward the apex side).
const FISSION_REACH_MAX = 0.4;
const FISSION_REACH_MIN = 0.18;
const ORBIT_COLONY = 0.3; // the colony-register orbit (NOT the calm-default 0.17)

// The named pinch-off velocity curve (easing.ts fissionSnap) — verbatim transcription so
// the spike sweeps the ACTUAL shipped snap envelope (anticipation → fast snap → recoil).
function fissionSnap(t) {
    const x = t < 0 ? 0 : t > 1 ? 1 : t;
    if (x < 0.3) {
        const a = x / 0.3;
        return -0.06 * Math.sin(a * Math.PI);
    }
    if (x < 0.55) {
        const s = (x - 0.3) / 0.25;
        const eased = 1 - (1 - s) * (1 - s) * (1 - s);
        return eased * 1.12;
    }
    const r = (x - 0.55) / 0.45;
    const ring = Math.cos(r * Math.PI) * 0.12 * (1 - r);
    return 1.0 + ring;
}

// ── the IQ circular smin (metaball.frag.ts sminCircularG, k *= 4.0 IQ-normalized) ──
// Distance form: returns the smooth-min distance of two SDF distances a,b with band k.
function sminCircular(a, b, k) {
    if (k <= 0) return Math.min(a, b);
    const kk = k * 4.0; // IQ normalization (the shader's k *= 4.0)
    const h = Math.max(kk - Math.abs(a - b), 0.0) / kk;
    const m = (h * h) * 0.5;
    const s = m * kk * (1.0 / 2.0);
    return a < b ? a - s : b - s;
}

// circle SDF in uv space (already POS_SCALE'd positions/radii)
function sdCircle(px, py, cx, cy, r) {
    return Math.hypot(px - cx, py - cy) - r;
}

// ── orbit kinematics (useBlobSatellites orbitPos: eccentric ellipse) ────────────────
function orbitPos(angle, orbitR, ecc) {
    const rx = orbitR;
    const ry = orbitR * (1 + ecc);
    return { x: Math.cos(angle) * rx, y: Math.sin(angle) * ry };
}

// ── the field SDF for a body + N satellites at given positions (uv, NOT yet POS_SCALE'd
//    here — we scale on raster). Mirrors the shader's accumulate-with-smin. ──────────
function fieldSDF(px, py, body, sats, k) {
    let d = sdCircle(px, py, body.x, body.y, body.r);
    for (const s of sats) {
        if (s.opacity <= 0.01) continue;
        const sd = sdCircle(px, py, s.x, s.y, s.r * s.scale);
        d = sminCircular(d, sd, k);
    }
    return d;
}

// ── rasterize the silhouette to a grid + flood-fill connected components ────────────
// Mirrors blob-studio.spec.ts: a coarse grid (downsampled), components below a
// satellite-sized floor are dropped (AA specks / watercolor fringe).
const GRID = 120; // raster resolution across uv [-0.5, 0.5]
const COMPONENT_MIN_CELLS = 12; // satellite-sized floor at this raster (a sat r~0.05 paints ~50+ cells)

function componentCount(body, sats, k) {
    const mask = new Uint8Array(GRID * GRID);
    for (let gy = 0; gy < GRID; gy++) {
        for (let gx = 0; gx < GRID; gx++) {
            const px = (gx + 0.5) / GRID - 0.5;
            const py = (gy + 0.5) / GRID - 0.5;
            // inside the field (with the shader's AA-edge ~at d<0)
            mask[gy * GRID + gx] = fieldSDF(px, py, body, sats, k) < 0 ? 1 : 0;
        }
    }
    // flood fill (4-conn)
    const seen = new Uint8Array(GRID * GRID);
    let count = 0;
    const stack = [];
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] && !seen[i]) {
            let cells = 0;
            stack.length = 0;
            stack.push(i);
            seen[i] = 1;
            while (stack.length) {
                const c = stack.pop();
                cells++;
                const cx = c % GRID;
                const cy = (c / GRID) | 0;
                const nb = [];
                if (cx > 0) nb.push(c - 1);
                if (cx < GRID - 1) nb.push(c + 1);
                if (cy > 0) nb.push(c - GRID);
                if (cy < GRID - 1) nb.push(c + GRID);
                for (const n of nb) {
                    if (mask[n] && !seen[n]) {
                        seen[n] = 1;
                        stack.push(n);
                    }
                }
            }
            if (cells >= COMPONENT_MIN_CELLS) count++;
        }
    }
    return count;
}

// ── the whole-canvas lean centroid (proof:blob-render calm-lean metric) ─────────────
// The mass-weighted centroid of the silhouette, magnitude in uv. Calm-lean ceiling 0.10.
function leanCentroid(body, sats, k) {
    let sx = 0, sy = 0, n = 0;
    for (let gy = 0; gy < GRID; gy++) {
        for (let gx = 0; gx < GRID; gx++) {
            const px = (gx + 0.5) / GRID - 0.5;
            const py = (gy + 0.5) / GRID - 0.5;
            if (fieldSDF(px, py, body, sats, k) < 0) {
                sx += px; sy += py; n++;
            }
        }
    }
    if (n === 0) return 0;
    return Math.hypot(sx / n, sy / n);
}

// ── scenario runner: sweep a cycle, report min/max component count + max lean ──────
function runScenario(name, opts) {
    const { orbitR, fission } = opts;
    const body = { x: 0, y: 0, r: BODY_R * POS_SCALE };
    const k = SMOOTH_K * POS_SCALE;
    const SAT_COUNT = 3;
    const FRAMES = 48;

    let minComp = Infinity, maxComp = -Infinity, maxLean = 0;
    let sawDisconnected = false, sawConnected = false;
    // BD.W-GOOBLOB-MERCURY-COLONY — the snap-velocity witness (G2): the fission satellite's
    // reach time-derivative. The SNAP must be FAST (a butter-morph that reaches 2 comps
    // slowly REDS G2). We track the max |Δreach/Δframe| over the snap band.
    let maxReachVel = 0;
    let prevReach = null;
    // The flicked-lean worst case (G3 / C1·R1): a synthetic pointer-flick toward the
    // fissioning apex side, aligned to the snap frame — the documented worst case the
    // static-ellipse 0.0127 mis-claimed. Modeled as an extra centroid offset from the
    // body's pointer-lean uv shift (pointerStrength 0.10 · POS_SCALE, smoothstepped).
    const FLICK_LEAN_UV = 0.10 * POS_SCALE; // pointerStrength · POS_SCALE, the body shift cap
    let maxFlickLean = 0;

    for (let f = 0; f < FRAMES; f++) {
        const phase = (f / FRAMES) * Math.PI * 2;
        const ftBeat = f / FRAMES;
        const sats = [];
        let fissionReach = null;
        let fissionDir = { x: 1, y: 0 };
        for (let i = 0; i < SAT_COUNT; i++) {
            const base = (i / SAT_COUNT) * Math.PI * 2;
            // baseline: orbit at fixed radius (HEAD: always inside the band reach).
            let r = orbitR;
            let opacity = 1;
            if (fission && i === 0) {
                // GOLDEN (rebuilt — C1·R1): ONE satellite rides the REAL `fissionSnap`
                // envelope across the beat. ft sweeps 0..1 over the cycle; the reach is
                // FISSION_REACH_MIN + span·fissionSnap(ft) — the SHIPPED snap curve
                // (anticipation → FAST snap past the body skin → damped recoil), NOT a
                // hand sin. The neck thins past the smin reach in the snap window so the
                // gap exceeds the reach → pinch-off.
                const reachT = fissionSnap(ftBeat);
                r = FISSION_REACH_MIN + (FISSION_REACH_MAX - FISSION_REACH_MIN) * reachT;
                fissionReach = r;
            }
            const pos = orbitPos(base + phase * 0.3, r, ECC);
            if (fission && i === 0) {
                const d = Math.hypot(pos.x, pos.y) || 1;
                fissionDir = { x: pos.x / d, y: pos.y / d };
            }
            sats.push({
                x: pos.x * POS_SCALE,
                y: pos.y * POS_SCALE,
                r: SAT_R * POS_SCALE,
                scale: 1,
                opacity,
            });
        }
        const comp = componentCount(body, sats, k);
        const lean = leanCentroid(body, sats, k);
        minComp = Math.min(minComp, comp);
        maxComp = Math.max(maxComp, comp);
        maxLean = Math.max(maxLean, lean);
        if (comp >= 2) sawDisconnected = true;
        if (comp === 1) sawConnected = true;

        if (fission && fissionReach !== null) {
            // snap velocity (reach derivative over the beat).
            if (prevReach !== null) {
                maxReachVel = Math.max(maxReachVel, Math.abs(fissionReach - prevReach));
            }
            prevReach = fissionReach;
            // worst-case flicked lean: add the body's pointer-lean uv shift TOWARD the
            // fissioning apex direction (the worst alignment) on top of the silhouette
            // centroid, and take the magnitude. This is the pointer-idle-frame ceiling
            // the gate asserts against (NOT the static-ellipse lean).
            const flickedX = (lean * fissionDir.x) + FLICK_LEAN_UV * fissionDir.x;
            const flickedY = (lean * fissionDir.y) + FLICK_LEAN_UV * fissionDir.y;
            maxFlickLean = Math.max(maxFlickLean, Math.hypot(flickedX, flickedY));
        }
    }

    const topologyChanges = sawConnected && sawDisconnected;
    const leanSafe = maxLean <= 0.10;
    const flickLeanSafe = !fission || maxFlickLean <= 0.10;
    // The snap is "fast" if the peak reach-velocity clears a butter-morph floor (a pure
    // slow sine over the same beat peaks at ~span·π/FRAMES ≈ 0.014/frame; the snap curve
    // concentrates the rise in a 0.25-wide window so it must exceed that).
    const SNAP_VEL_FLOOR = 0.020;
    const snapFast = !fission || maxReachVel >= SNAP_VEL_FLOOR;
    console.log(`\n── ${name} ──`);
    console.log(`  orbit reach: ${orbitR ?? "fission-modulated"} (body ${BODY_R})`);
    console.log(`  component count over cycle: min=${minComp} max=${maxComp}`);
    console.log(`  saw CONNECTED (1 comp, merged):    ${sawConnected ? "yes" : "no"}`);
    console.log(`  saw DISCONNECTED (>=2 comp, split): ${sawDisconnected ? "yes" : "no"}`);
    console.log(`  topology CHANGES (2<->1, the split): ${topologyChanges ? "YES" : "NO"}`);
    console.log(`  max lean centroid (silhouette):    ${maxLean.toFixed(4)} (ceiling 0.10) -> ${leanSafe ? "LEAN-SAFE" : "OVER CEILING"}`);
    if (fission) {
        console.log(`  max FLICKED lean (worst-case, G3):  ${maxFlickLean.toFixed(4)} (ceiling 0.10) -> ${flickLeanSafe ? "LEAN-SAFE" : "OVER CEILING"}`);
        console.log(`  max snap velocity (reach Δ/frame):  ${maxReachVel.toFixed(4)} (floor ${SNAP_VEL_FLOOR}) -> ${snapFast ? "FAST SNAP" : "BUTTER (slow)"}`);
    }
    return { topologyChanges, leanSafe: leanSafe && flickLeanSafe, snapFast, maxLean, maxFlickLean, maxReachVel, minComp, maxComp };
}

console.log("=".repeat(72));
console.log("GooBlob GOLDEN — fission-topology spike (CPU smin field + cc readback)");
console.log("=".repeat(72));

// HEAD: orbit 0.17 INSIDE body 0.22, the never-leaves-reach clamp -> permanently merged
const head = runScenario("HEAD (orbit 0.17, clamp ON — the lump)", {
    orbitR: 0.17,
    fission: false,
});

// GOLDEN: re-based orbit + ONE bounded fission excursion -> 2<->1 topology, lean-safe
const golden = runScenario("GOLDEN (single bounded fission excursion — the colony)", {
    orbitR: 0.30,
    fission: true,
});

console.log("\n" + "=".repeat(72));
console.log("VERDICT");
console.log("=".repeat(72));
const headBornRed = !head.topologyChanges; // HEAD must NOT split (born-RED)
const goldenGreen = golden.topologyChanges && golden.leanSafe && golden.snapFast;
console.log(`  HEAD is born-RED (never splits, always 1):  ${headBornRed ? "PASS" : "FAIL"}`);
console.log(`  GOLDEN splits (2<->1 topology):             ${golden.topologyChanges ? "PASS" : "FAIL"}`);
console.log(`  GOLDEN stays lean-safe (flicked, <=0.10):   ${golden.leanSafe ? "PASS" : "FAIL"}`);
console.log(`  GOLDEN snap is FAST (G2, not butter):       ${golden.snapFast ? "PASS" : "FAIL"}`);
const ok = headBornRed && goldenGreen;
console.log(`\n  SPIKE ${ok ? "VALIDATES" : "REJECTS"} Move A: ` +
    (ok
        ? "the bounded single-fission excursion produces a real 2<->1 split WITHOUT\n" +
          "  blowing the calm-lean ceiling — the headline mechanism is de-risked."
        : "the geometry does NOT cleanly split or breaks the lean ceiling — re-tune."));
process.exit(ok ? 0 : 1);
