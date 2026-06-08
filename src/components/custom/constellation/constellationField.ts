// AW.W17 — the constellation field engine: a pure, framework-free proximity
// graph. Nodes drift on constant velocities and bounce off the bounds; any two
// within `link` px are joined by a hairline whose opacity falls off with
// distance, so the lattice continually re-triangulates. Pointer steering leans
// the web toward the cursor; taps drop expanding ripples.
//
// This is the MECHANICAL half of the field engine — the FOUR NEUTRAL passes
// (edges, nodes, pointer-web, ripples). There is NO branded skin pass: a focal
// mark / callout is a consumer-supplied `drawOverlay` that runs AFTER these
// passes. Zero deck-domain content lives here.
//
// The palette reads CSS custom properties off the canvas — the FULL
// `--constellation-*` legibility set (node / node-dim / line + the edge-alpha
// multipliers + the field-yields-to-type `--constellation-alpha` knob) with
// neutral fallbacks, so a consumer override or a dark-mode flip re-tints AND
// re-weights the lattice. The tokens are PLAIN-hsl per arm (AX.W17) — Canvas2D
// silently rejects a `light-dark()` value, so the `:root`/`.dark` cascade
// carries two literals, never a `light-dark()` function (the W30 cardinal leak).

/** Reference width the `k` scale factor is keyed to (CSS px). */
export const BASE_WIDTH = 1280;

export interface ConstellationNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    dim: boolean;
}

export interface ConstellationRipple {
    x: number;
    y: number;
    /** `performance.now()` at first draw; -1 until stamped. */
    start: number;
}

/** The pointer position in canvas-local CSS px (`-1` = inactive). */
export interface ConstellationPointer {
    x: number;
    y: number;
}

/**
 * The neutral palette + legibility weights resolved off the canvas custom
 * properties (the FULL `--constellation-*` set — AX.W17). `node`/`nodeDim`/
 * `line` are the colors; `edgeAlpha`/`edgeFocusAlpha`/`alpha` are the per-mode
 * legibility multipliers (replacing the `0.17`/`0.24` magic literals).
 */
export interface ConstellationPalette {
    node: string;
    nodeDim: string;
    line: string;
    /** The hairline-edge alpha multiplier (was the `0.17` literal). */
    edgeAlpha: number;
    /** The focus-proximity edge multiplier (consumer skins may read it). */
    edgeFocusAlpha: number;
    /** The field-yields-to-type translucency knob (the global field dimmer). */
    alpha: number;
}

/**
 * The per-axis critically-damped warp spring on the focal node (AX.W17). The
 * focal mark's position is `(x, y)`; `vx`/`vy` its velocity; `targetIdx` the
 * LIVE node index it chases (re-read each frame so it tracks a DRIFTING target,
 * not a frozen click-time snapshot). `-1` = no active warp (the focal mark
 * rides its node's drift directly — the identity-ride at settle).
 */
export interface ConstellationWarp {
    x: number;
    y: number;
    vx: number;
    vy: number;
    /** The chased node's INDEX (live target), or -1 when inactive. */
    targetIdx: number;
}

/**
 * The field state the component exposes to its `drawOverlay` consumer so a
 * skin can pin itself to a real field node. `k` is the `width / BASE_WIDTH`
 * scale, `dpr` the device-pixel ratio applied by the substrate.
 *
 * The focal node (AX.W17) is a FIRST-CLASS library concept: `focalIndex` names
 * which node is focal (consumer-owned via `warpTo`), and the engine OWNS its
 * position via the `warp` spring stepped inside `stepField`. A `drawOverlay`
 * paints the focal mark at `field.warp.{x,y}` (the spring-eased position) —
 * node-position mutation `drawOverlay` structurally cannot express, resolved by
 * ONE first-class concept (warp + drift unify; no second parallel hook).
 */
export interface ConstellationField {
    nodes: ConstellationNode[];
    /** The host canvas — for `getComputedStyle` token reads in an overlay. */
    canvas: HTMLCanvasElement | null;
    w: number;
    h: number;
    k: number;
    dpr: number;
    /**
     * The designated focal node's INDEX, or `-1` when none is pinned. Re-points
     * on each `warpTo`; node count is conserved (it is a designation, not a new
     * node). A `drawOverlay` reads `field.warp.{x,y}` for the spring-eased mark.
     */
    focalIndex: number;
    /** The per-axis warp spring the engine steps inside `stepField` (AX.W17). */
    warp: ConstellationWarp;
}

/**
 * The `<Constellation>` consumer prop surface (the public type a consumer types
 * a wrapper against). The `drawOverlay` seam is the branded-skin injection — it
 * runs AFTER the neutral passes with the live field.
 */
export interface ConstellationProps {
    /** Node count. Default 64. */
    count?: number;
    /** Link distance in px (the falloff reach). Default 132. */
    link?: number;
    /** Drift speed. Default 0.16. */
    speed?: number;
    /** Seed for a reproducible field (number or hashed string); omit for `Math.random`. */
    seed?: number | string;
    /** Steer-toward-cursor + tap ripples. Default true; auto-off under reduced-motion. */
    pointerReactive?: boolean;
    /**
     * Click-to-warp (AX.W17): a click warps the focal node to the nearest
     * drifting node + springs it there. INDEPENDENT of `pointerReactive` (warp
     * works on a non-ripple lattice). Default false; auto-off under
     * reduced-motion (the focal mark stays put — the stated PRM policy).
     */
    warpOnClick?: boolean;
    class?: string;
    /** The skin seam — paints the consumer's focal mark on the live field. */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}

export const DEFAULT_PALETTE: ConstellationPalette = {
    node: "#b4afa3",
    nodeDim: "#cdc8bd",
    line: "#1c1714",
    // The fallbacks mirror the §5c light-arm token defaults so an SSR / no-token
    // mount still reads recessive-but-legible (the H.W4 floor fix).
    edgeAlpha: 0.22,
    edgeFocusAlpha: 0.34,
    alpha: 0.8,
};

/**
 * Resolve the FULL neutral palette + legibility weights off a canvas's resolved
 * custom properties (AX.W17). The colors AND the alpha multipliers route through
 * the same `getComputedStyle` probe, so a dark-mode flip re-resolves BOTH the
 * `:root`/`.dark` color arms AND the per-mode alpha defaults in one read.
 */
export function readPalette(canvas: HTMLCanvasElement): ConstellationPalette {
    if (typeof window === "undefined") return { ...DEFAULT_PALETTE };
    const cs = getComputedStyle(canvas);
    const read = (name: string, fallback: string): string =>
        cs.getPropertyValue(name).trim() || fallback;
    const readNum = (name: string, fallback: number): number => {
        const raw = cs.getPropertyValue(name).trim();
        if (!raw) return fallback;
        const n = Number.parseFloat(raw);
        return Number.isFinite(n) ? n : fallback;
    };
    return {
        node: read("--constellation-node", DEFAULT_PALETTE.node),
        nodeDim: read("--constellation-node-dim", DEFAULT_PALETTE.nodeDim),
        line: read("--constellation-line", DEFAULT_PALETTE.line),
        edgeAlpha: readNum("--constellation-edge-alpha", DEFAULT_PALETTE.edgeAlpha),
        edgeFocusAlpha: readNum(
            "--constellation-edge-focus-alpha",
            DEFAULT_PALETTE.edgeFocusAlpha,
        ),
        alpha: readNum("--constellation-alpha", DEFAULT_PALETTE.alpha),
    };
}

/**
 * Seed `count` drifting nodes inside `w × h`. `rng` is a `() => number` in
 * `[0, 1)` (the glass-ui `mulberry32`/`Math.random`); a seeded `rng` lays out a
 * reproducible field. Every node drifts; a focal node IS pinnable (AX.W17) — the
 * `field.focalIndex` designation + the engine-owned `warp` spring chase a node,
 * but the underlying node still drifts (warp re-points an EXISTING node, never
 * adds one, so node count is conserved).
 */
export function seedField(
    rng: () => number,
    count: number,
    w: number,
    h: number,
    speed: number,
): ConstellationNode[] {
    const nodes: ConstellationNode[] = [];
    for (let i = 0; i < count; i++) {
        const a = rng() * Math.PI * 2;
        nodes.push({
            x: rng() * w,
            y: rng() * h,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            r: 1.6 + rng() * 1.6,
            dim: rng() < 0.45,
        });
    }
    return nodes;
}

/**
 * Advance the field one step: drift + wall-bounce every node, then (if the
 * pointer is live) lean nodes within reach toward the cursor WITHOUT changing
 * their speed (the slow geometric drift is preserved). `k` is the scale factor.
 *
 * `dt` (seconds since the previous frame) advances the focal-node warp spring
 * via `warpStep` INSIDE this single per-frame call (AX.W17) — NO second rAF,
 * NO `useSpring`. The warp rides the substrate's ONE parked rAF; a `dt` of `0`
 * (omitted / first frame) leaves the spring untouched.
 */
export function stepField(
    field: ConstellationField,
    k: number,
    speed: number,
    pointer: ConstellationPointer | null,
    dt = 0,
): void {
    const { nodes, w, h } = field;
    for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx * k;
        p.y += p.vy * k;
        if (p.x < 0) {
            p.x = 0;
            p.vx *= -1;
        } else if (p.x > w) {
            p.x = w;
            p.vx *= -1;
        }
        if (p.y < 0) {
            p.y = 0;
            p.vy *= -1;
        } else if (p.y > h) {
            p.y = h;
            p.vy *= -1;
        }
    }
    if (pointer && pointer.x >= 0) {
        const infl = 180 * k;
        for (let i = 0; i < nodes.length; i++) {
            const p = nodes[i];
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d > 0.5 && d < infl) {
                const sp = Math.hypot(p.vx, p.vy) || speed;
                const pull = (1 - d / infl) * 0.08;
                const nvx = p.vx + (dx / d) * pull * sp;
                const nvy = p.vy + (dy / d) * pull * sp;
                const nsp = Math.hypot(nvx, nvy) || 1;
                p.vx = (nvx / nsp) * sp;
                p.vy = (nvy / nsp) * sp;
            }
        }
    }
    // Advance the focal-node warp spring on the SAME frame (AX.W17). The drift
    // happened above, so the LIVE target node has already moved this frame — the
    // spring chases its post-step position (it tracks a moving target, not a
    // frozen snapshot). One rAF, no useSpring.
    warpStep(field, dt);
}

// ── Focal node + warp spring (AX.W17) ────────────────────────────────────────
// The design thesis: drift and warp are THE SAME mechanic — "spring the focal
// node toward a target NODE" — differing only in what PICKS the target (a click
// for warp, a periodic auto-pick for drift). ONE focal-node position spring + a
// pluggable target-source (`field.warp.targetIdx`). NO `useSpring` (it spawns a
// second rAF bound to a reactive ref, which would DEFEAT the parked-substrate
// offscreen/tab-hidden/PRM freeze the whole `useCanvas2D` substrate provides) —
// instead a dt-stepped 2nd-order critically-damped integrator advanced inside
// the substrate's ONE rAF. The keyframes.js `(response, dampingFraction)` PARAM
// model is reused (ω₀ = 2π/response, ζ = dampingFraction) but NOT its rAF.

/** Warp spring tuning — gentle critically-damped (no overshoot on a focal mark). */
const WARP_RESPONSE = 0.55; // seconds; the settle window
const WARP_ZETA = 1.0; // critically damped — a focal mark must NOT ring/overshoot
const WARP_OMEGA = (2 * Math.PI) / WARP_RESPONSE;
/** dt clamp (s) — guards a tab-throttle / offscreen-park-resume gap from teleporting. */
const WARP_DT_CLAMP = 0.05; // ≈50ms; a clamped dt resolves the park-mid-warp teleport for free.

/**
 * The nearest DRIFTING node to `(px, py)` in canvas-local px — a linear O(count)
 * min-d² scan (count 64 default — negligible; matches the O(count²) edge pass).
 * "Lattice point" = the nearest drifting NODE (the constellation has NO fixed
 * lattice). `excludeIdx` drops a node from the candidate set (the focal node
 * excludes ITSELF, so a cursor-on-focal warp no-ops). Returns `-1` if no
 * eligible node exists (empty field, or only the excluded node).
 */
export function nearestNode(
    field: ConstellationField,
    px: number,
    py: number,
    excludeIdx = -1,
): number {
    const { nodes } = field;
    let best = -1;
    let bestD2 = Infinity;
    for (let i = 0; i < nodes.length; i++) {
        if (i === excludeIdx) continue;
        const n = nodes[i];
        const dx = n.x - px;
        const dy = n.y - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD2) {
            bestD2 = d2;
            best = i;
        }
    }
    return best;
}

/**
 * Advance the focal-node warp spring one `dt` (seconds). A per-axis 2nd-order
 * critically-damped integrator over `field.warp.{x,y}` toward the LIVE position
 * of `field.nodes[field.warp.targetIdx]` — re-read EACH frame, so the spring
 * CHASES a drifting target and arrives ON it (the identity-ride). No-ops when no
 * warp is active (`targetIdx < 0`). `dt` is clamped to {@link WARP_DT_CLAMP} so a
 * tab-throttle / offscreen-park-resume gap cannot teleport the mark.
 *
 *   x += v·dt ;  v += (−2ζω·v − ω²·(x − target))·dt
 *
 * Reuses the keyframes.js `(response, dampingFraction)` param model
 * (ω = 2π/response, ζ = dampingFraction) but NOT its rAF — the FORBID-useSpring
 * contract (a second rAF would defeat the parked-substrate one-path freeze).
 */
export function warpStep(field: ConstellationField, dt: number): void {
    const { warp, nodes } = field;
    // No active warp (no spring, or no target) → no-op. The `warp` guard keeps a
    // hand-built field literal that omits the spring from crashing.
    if (!warp || warp.targetIdx < 0 || warp.targetIdx >= nodes.length) return;
    if (!(dt > 0)) return;
    const h = Math.min(dt, WARP_DT_CLAMP);
    const target = nodes[warp.targetIdx];
    // Per-axis critically-damped step (semi-implicit Euler — velocity first,
    // then position, for stability at the clamped dt).
    const ax =
        -2 * WARP_ZETA * WARP_OMEGA * warp.vx - WARP_OMEGA * WARP_OMEGA * (warp.x - target.x);
    const ay =
        -2 * WARP_ZETA * WARP_OMEGA * warp.vy - WARP_OMEGA * WARP_OMEGA * (warp.y - target.y);
    warp.vx += ax * h;
    warp.vy += ay * h;
    warp.x += warp.vx * h;
    warp.y += warp.vy * h;
}

/**
 * Point the warp at a node INDEX (the live target-source seam). The focal node
 * re-points to `idx`; the spring chases `nodes[idx]`'s LIVE position FROM the
 * focal mark's CURRENT position (`warp.{x,y}`) — a continuous spring-eased path,
 * never a snap. The component seeds `warp.{x,y}` at field-center on first layout,
 * so even the first warp springs from a real start point. `idx < 0` clears the
 * warp (the focal mark is removed). Re-pointing does NOT zero the velocity, so a
 * mid-flight re-target curves smoothly toward the new node.
 */
export function setWarpTarget(field: ConstellationField, idx: number): void {
    const { warp, nodes } = field;
    if (idx < 0 || idx >= nodes.length) {
        warp.targetIdx = -1;
        field.focalIndex = -1;
        return;
    }
    field.focalIndex = idx;
    warp.targetIdx = idx;
}

/**
 * Warp the focal node to the nearest drifting node to a canvas-LOCAL px point
 * (the `warpTo(point)` primitive). The DEGENERATE case — the click's UNCONSTRAINED
 * nearest node is already the current focal (cursor on/closest to the focal mark)
 * — NO-OPS (returns the current focal; a click on yourself does not re-warp). Any
 * OTHER click re-points to the nearest node, with the focal EXCLUDED from the
 * candidate set (you never re-warp to yourself; the next-nearest wins). Returns
 * the chosen node index, or `-1` when no eligible node exists. The component's
 * `warpTo(clientX, clientY)` sugar maps client→local px via `toLocal` first.
 */
export function warpTo(field: ConstellationField, px: number, py: number): number {
    // Degenerate no-op: the click is closest to the focal node itself → no warp.
    const raw = nearestNode(field, px, py, -1);
    if (raw >= 0 && raw === field.focalIndex) return field.focalIndex;
    const idx = nearestNode(field, px, py, field.focalIndex);
    if (idx < 0) return -1;
    setWarpTarget(field, idx);
    return idx;
}

/** Pass 1 — hairline edges between any two nodes within `link` px (alpha falls off with distance). */
export function drawEdges(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
): void {
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The hairline edge alpha = the per-mode `--constellation-edge-alpha`
    // multiplier scaled by the field-yields-to-type `--constellation-alpha`
    // dimmer (AX.W17 — replaces the `0.17` magic literal).
    const edge = palette.edgeAlpha * palette.alpha;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.0 * k;
    for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > reach2) continue;
            const t = 1 - d2 / reach2;
            ctx.globalAlpha = edge * t;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
}

/** Pass 2 — ambient node dots. */
export function drawNodes(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    palette: ConstellationPalette,
): void {
    const { nodes, k } = field;
    for (let m = 0; m < nodes.length; m++) {
        const p = nodes[m];
        ctx.fillStyle = p.dim ? palette.nodeDim : palette.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * k, 0, Math.PI * 2);
        ctx.fill();
    }
}

/** Pass 3 — the cursor joins the web: faint links to nodes within reach + a soft cursor node. */
export function drawPointerWeb(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
    pointer: ConstellationPointer | null,
): void {
    if (!pointer || pointer.x < 0) return;
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The cursor-web links read a touch stronger than the ambient edges (the
    // pointer is the active focus), scaled by the same field-yields-to-type
    // `--constellation-alpha` dimmer (AX.W17 — replaces the `0.24` literal).
    const web = palette.edgeFocusAlpha * palette.alpha;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.0 * k;
    for (const p of nodes) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > reach2) continue;
        ctx.globalAlpha = (1 - d2 / reach2) * web;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = palette.node;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 2.6 * k, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

/** Pass 4 — tap ripples: expanding rings that fade over ~0.9s; consumed entries are spliced. */
export function drawRipples(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    now: number,
    ripples: ConstellationRipple[],
    palette: ConstellationPalette,
): void {
    const { k } = field;
    ctx.strokeStyle = palette.line;
    for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        if (rp.start < 0) rp.start = now;
        const t = (now - rp.start) / 900;
        if (t >= 1) {
            ripples.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = (1 - t) * 0.5;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, (8 + t * 130) * k, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
