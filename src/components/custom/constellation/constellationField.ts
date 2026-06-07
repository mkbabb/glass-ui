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
// The palette reads CSS custom properties off the canvas (`--constellation-node`
// / `--constellation-node-dim` / `--constellation-line`) with neutral fallbacks,
// so a consumer override or a dark-mode flip re-tints the lattice.

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

/** The neutral palette resolved off the canvas custom properties. */
export interface ConstellationPalette {
    node: string;
    nodeDim: string;
    line: string;
}

/**
 * The field state the component exposes to its `drawOverlay` consumer so a
 * skin can pin itself to a real field node. `k` is the `width / BASE_WIDTH`
 * scale, `dpr` the device-pixel ratio applied by the substrate.
 */
export interface ConstellationField {
    nodes: ConstellationNode[];
    /** The host canvas — for `getComputedStyle` token reads in an overlay. */
    canvas: HTMLCanvasElement | null;
    w: number;
    h: number;
    k: number;
    dpr: number;
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
};

/** Resolve the neutral palette off a canvas's resolved custom properties. */
export function readPalette(canvas: HTMLCanvasElement): ConstellationPalette {
    if (typeof window === "undefined") return { ...DEFAULT_PALETTE };
    const cs = getComputedStyle(canvas);
    const read = (name: string, fallback: string): string =>
        cs.getPropertyValue(name).trim() || fallback;
    return {
        node: read("--constellation-node", DEFAULT_PALETTE.node),
        nodeDim: read("--constellation-node-dim", DEFAULT_PALETTE.nodeDim),
        line: read("--constellation-line", DEFAULT_PALETTE.line),
    };
}

/**
 * Seed `count` drifting nodes inside `w × h`. `rng` is a `() => number` in
 * `[0, 1)` (the glass-ui `mulberry32`/`Math.random`); a seeded `rng` lays out a
 * reproducible field. No node is pinned — every node drifts (pinning a focal
 * node is consumer skin, not field mechanics).
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
 */
export function stepField(
    field: ConstellationField,
    k: number,
    speed: number,
    pointer: ConstellationPointer | null,
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
            ctx.globalAlpha = 0.17 * t;
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
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1.0 * k;
    for (const p of nodes) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > reach2) continue;
        ctx.globalAlpha = (1 - d2 / reach2) * 0.24;
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
