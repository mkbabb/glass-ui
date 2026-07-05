// BG.W-DOTFLOW-REBUILD — the first-principles STREAMLINE field evaluator (the SINGLE math
// source the WGSL + GLSL fullscreen-fragment passes transcribe line-for-line).
//
// THE REBUILD (USER 07-05 — "a TOTAL MESS, completely unusable"). The free-advected-mote +
// additive-trail-flood architecture (BD.W-DOTFLOW-AURORA-CURRENT) is RETIRED WHOLE (compute
// pass, storage particles, two-pass trail ping-pong — W-PRUNE-CONSOLIDATE, no dual path). The
// frame now reads as the reference IMG_1836: discrete dots strung along EVENLY-SPACED SMOOTH
// STREAMLINES of a curl field — undulating + interweaving like the level curves of a
// procedural function, the dots drifting slowly ALONG their own line.
//
// THE MATH (cited, first-principles):
//
//   The streamlines of a divergence-free 2D flow v = ∇⊥ψ ARE the iso-contours (level curves)
//   of the stream function ψ (Bridson, Houser, Nordenstam, *Curl-Noise for Procedural Fluid
//   Flow*, SIGGRAPH 2007). So EVENLY-SPACED streamlines (Jobard & Lefer, *Creating Evenly-
//   Spaced Streamlines of Arbitrary Density*, 1997) = evenly-spaced iso-contours of ψ at a
//   constant level step Δ — separated by construction, arc-length-beaded by a transverse phase.
//
//   ψ(p,t) is a monotone RAMP (guaranteeing NON-crossing, evenly-spaced level curves — the
//   dSep separation is analytic, not a placement search) undulated by two traveling sines and
//   DOMAIN-WARPED by the shared curlFBM operator (the Bridson curl-noise warp — the streamlines
//   flow + interweave "over the curlFBM field", per the spec). A gaussian cursor push bends the
//   whole field continuously (no vortex chaos). The along-streamline bead phase drifts with
//   time so the dots march ALONG their own line.
//
//   Because the ramp gradient (flowSlope) dominates every undulation/warp gradient, ∂ψ/∂y stays
//   positive everywhere → the level curves NEVER fold or cross chaotically (the "adjacent lines
//   never cross" pass-bar), and their spacing stays even (|∇ψ| ≈ flowSlope). This is the
//   analytic guarantee the mote/trail cloud could never give.
//
// The WGSL `fs_main` (flow-field.wgsl.ts) + the GLSL `main` (flow-field.glsl.ts) transcribe
// `sampleStreamField` EXACTLY; `proof:viz-dotflow` clause S3 round-trips the JS ↔ WGSL ↔ GLSL
// field at a fixed sample set (the transcription-drift trap closed by a round-trip).

/** A 2-vector. */
export interface Vec2 {
    x: number;
    y: number;
}

// ── The shared curl-noise operator (the JS twin of flow.glsl.ts curlFBM — BB.B1) ──────
// The streamlines flow "over the curlFBM field": ψ's sampling coordinate is domain-warped by
// the divergence-free 2D curl of a value-noise fbm potential. Transcribed not re-derived; the
// round-trip gate asserts the JS + WGSL + GLSL paths agree.

/** Central-difference epsilon for the curl (matches the WGSL/GLSL `CURL_EPS`). */
export const CURL_EPS = 0.012;

/** The p3-hash mirror (the WGSL/GLSL `hash21`) — one noise basis across all three paths. */
export function hash21(x: number, y: number): number {
    let px = (x * 0.1031) % 1;
    let py = (y * 0.1031) % 1;
    let pz = (x * 0.1031) % 1;
    if (px < 0) px += 1;
    if (py < 0) py += 1;
    if (pz < 0) pz += 1;
    const d = px * (py + 33.33) + py * (pz + 33.33) + pz * (px + 33.33);
    px += d;
    py += d;
    pz += d;
    let v = ((px + py) * pz) % 1;
    if (v < 0) v += 1;
    return v;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

/** Quintic-faded 2D value noise (matches the WGSL/GLSL `valueNoise`). */
export function valueNoise(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    const uy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    const a = hash21(ix, iy);
    const b = hash21(ix + 1, iy);
    const c = hash21(ix, iy + 1);
    const d = hash21(ix + 1, iy + 1);
    return lerp(lerp(a, b, ux), lerp(c, d, ux), uy);
}

/** A 3-octave scalar fbm potential (the host noise basis the curl operator wraps). */
export function potentialFBM(x: number, y: number): number {
    let v = 0;
    let amp = 0.5;
    let freq = 1;
    let px = x;
    let py = y;
    for (let i = 0; i < 3; i++) {
        v += amp * valueNoise(px * freq, py * freq);
        // FBM_ROT mat2(0.8, 0.6, -0.6, 0.8) — same rotation as the shared chunk.
        const rx = 0.8 * px - 0.6 * py;
        const ry = 0.6 * px + 0.8 * py;
        px = rx;
        py = ry;
        freq *= 2.0;
        amp *= 0.5;
    }
    return v;
}

/** The divergence-free 2D curl of the scalar fbm potential (the JS twin of `curlFBM`). */
export function curlFBM(p: Vec2): Vec2 {
    const dx =
        potentialFBM(p.x + CURL_EPS, p.y) - potentialFBM(p.x - CURL_EPS, p.y);
    const dy =
        potentialFBM(p.x, p.y + CURL_EPS) - potentialFBM(p.x, p.y - CURL_EPS);
    const gx = dx / (2 * CURL_EPS);
    const gy = dy / (2 * CURL_EPS);
    // ∇×ψ in 2D — rotate the gradient 90°: (∂ψ/∂y, −∂ψ/∂x).
    return { x: gy, y: -gx };
}

/**
 * The per-frame DERIVED scalars the stream field reads — the flat set the WGSL/GLSL uniform
 * lanes carry (so the JS math + the shaders read the SAME numbers, byte-for-byte). Computed
 * once per frame in `uniformBridgeWGPU.ts` from the author `FlowFieldConfig`.
 */
export interface StreamFieldParams {
    /** Elapsed seconds (the field breathes on the sine/curl-drift clock). */
    time: number;
    /** The stream-ramp slope — dominates every gradient (the non-crossing guarantee); drives
     *  the streamline count (≈ 2·flowSlope / lineSpacing across the [-1,1] y span). */
    flowSlope: number;
    /** Primary undulation (x-traveling; ZERO y-gradient so it never folds the ramp). */
    undAmp: number;
    undFreq: number;
    undSpeed: number;
    /** Interweave (a 2nd direction; its y-gradient stays < flowSlope so the ramp holds). */
    weaveAmp: number;
    weaveFreq: number;
    weaveSpeed: number;
    weaveDirX: number;
    weaveDirY: number;
    /** The Bridson curl-noise domain warp (bends the ramp into flowing/interweaving lines). */
    curlWarp: number;
    curlScale: number;
    curlDrift: number;
    /** The gaussian cursor push (a smooth radial domain bend — no snap, no vortex chaos). */
    pointerX: number;
    pointerY: number;
    pointerStrength: number;
    pointerRadius: number;
    pointerActive: number;
}

/**
 * The stream function ψ(p) — the SCALAR whose evenly-spaced iso-contours ARE the streamlines.
 * The ONE math source: the WGSL `sampleStreamField` + the GLSL `sampleStreamField` transcribe
 * this EXACTLY (the S3 round-trip anchor). `p` is aspect-corrected domain space.
 *
 * A monotone ramp (`flowSlope · wy`, the even-spacing + non-crossing guarantee) plus two
 * traveling undulations, sampled at a coordinate `w` DOMAIN-WARPED by the curl-noise + the
 * gaussian cursor push — so the level curves flow, interweave, and bend around the cursor while
 * staying evenly spaced and never crossing.
 */
export function sampleStreamField(p: Vec2, s: StreamFieldParams): number {
    // The Bridson curl-noise domain warp — the sampling coordinate flows over the curlFBM field.
    const c = curlFBM({
        x: p.x * s.curlScale + s.time * s.curlDrift,
        y: p.y * s.curlScale - s.time * s.curlDrift,
    });
    let wx = p.x + c.x * s.curlWarp;
    let wy = p.y + c.y * s.curlWarp;

    // The gaussian cursor push — a radial domain bend near the pointer (critically-damped by
    // the composable's velocity-scaled `pointerStrength`; inert when the pointer is inactive).
    if (s.pointerActive > 0.5) {
        const dx = p.x - s.pointerX;
        const dy = p.y - s.pointerY;
        const r2 = dx * dx + dy * dy;
        const radius = Math.max(s.pointerRadius, 1e-3);
        const fall = Math.exp(-r2 / (radius * radius));
        const d = Math.sqrt(r2) + 1e-4;
        wx += (dx / d) * s.pointerStrength * fall;
        wy += (dy / d) * s.pointerStrength * fall;
    }

    // The monotone ramp (even, non-crossing level curves) + the two traveling undulations.
    return (
        s.flowSlope * wy +
        s.undAmp * Math.sin(s.undFreq * wx - s.time * s.undSpeed) +
        s.weaveAmp *
            Math.sin(
                s.weaveFreq * (wx * s.weaveDirX + wy * s.weaveDirY) -
                    s.time * s.weaveSpeed,
            )
    );
}

/** The fixed streamline level step Δ (the iso-contour spacing in ψ-units — the dSep analog). */
export const FLOW_LINE_SPACING = 1.0;

/**
 * The along-streamline BEAD phase at `p` — a transverse coordinate (the domain x) whose
 * iso-lines cross the streamlines, DRIFTING with time (`- t·beadDrift`) so the bead-lines sweep
 * along the flow and the dots march ALONG their own line. A dot sits where a streamline
 * iso-contour (ψ ≈ n·lineSpacing) crosses a bead iso-line (beadPhase ≈ m+0.5). Transcribed by
 * both shaders (the S3 round-trip).
 */
export function beadPhase(
    p: Vec2,
    beadSlope: number,
    beadDrift: number,
    timeSec: number,
): number {
    return p.x * beadSlope - timeSec * beadDrift;
}
