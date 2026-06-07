// AW.W17 — the pure constellation field engine (the MECHANICAL lift).
//
// The drifting-nodes / distance-falloff-edges / pointer-web / ripple lattice,
// lifted from the slides constellation engine as free functions over the field.
// This is the NEUTRAL skeleton: NO anomaly pass, NO branded skin — the branded
// content (the slides NC-red anomaly ring + the dashed Fira-Code callout) is a
// CONSUMER `drawOverlay` pass, never shipped in `src/`.
//
// Palette reads from CSS vars (`--constellation-node` / `--constellation-line`
// with neutral fallbacks) so the consumer / a dark-flip re-tints the lattice.

/** Base width the per-step scale `k` normalizes against (matches the slides field). */
export const BASE_W = 1280;

/** A drifting field node — no `anomaly` flag (that is skin, not mechanism). */
export interface ConstellationNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    dim: boolean;
}

/** A live tap ripple (an expanding ring fading over ~0.9s). */
export interface ConstellationRipple {
    x: number;
    y: number;
    start: number;
}

/** The pointer position in canvas-local CSS px (`-1` = inactive). */
export interface ConstellationPointer {
    x: number;
    y: number;
}

/** The neutral palette the draw passes read (CSS-var-resolved, dark-adaptive). */
export interface ConstellationPalette {
    node: string;
    nodeDim: string;
    line: string;
    /** Field-wide alpha so the lattice yields to overlaid type. */
    alpha: number;
    /** Neutral edge base weight (distance-falloff multiplier). */
    edgeAlpha: number;
}

/**
 * The field state the overlay seam receives — enough to pin a consumer skin to a
 * node, NOT the engine internals.
 */
export interface ConstellationField {
    nodes: ConstellationNode[];
    w: number;
    h: number;
    /** Per-step scale (`w / BASE_W`) — lengths multiply by it so the field scales. */
    k: number;
    dpr: number;
}

/**
 * Seed a field of `count` nodes within `w`×`h`, each on a constant velocity at a
 * random heading. The slides `seed()` MINUS the `n[0]` anomaly pinning (that is
 * skin). `rng` is the glass-ui `prng` (`mulberry32`) or `Math.random`.
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
            dim: rng() < 0.3,
        });
    }
    return nodes;
}

/**
 * Advance the field one step: drift each node on its velocity, bounce off the
 * walls, and (when the pointer is live) curve nodes within reach GENTLY toward
 * the cursor without changing their speed. The slides `step()` MINUS the anomaly
 * `drift()` (skin).
 */
export function stepField(
    field: ConstellationField,
    pointer: ConstellationPointer | null,
): void {
    const { nodes, w, h, k } = field;
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
    // Pointer steering — nodes within reach lean toward the cursor but keep speed.
    if (pointer && pointer.x >= 0) {
        const infl = 180 * k;
        for (let i = 0; i < nodes.length; i++) {
            const p = nodes[i];
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d > 0.5 && d < infl) {
                const sp = Math.hypot(p.vx, p.vy) || Math.hypot(p.vx, p.vy);
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

/** Pass 1 — hairline edges between any two nodes within `link` px (NO anomaly branch). */
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
            ctx.globalAlpha = palette.edgeAlpha * t * palette.alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }
    }
    ctx.globalAlpha = 1;
}

/** Pass 2 — ambient node dots (every node; the anomaly is a consumer overlay). */
export function drawNodes(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    palette: ConstellationPalette,
): void {
    const { nodes, k } = field;
    ctx.globalAlpha = palette.alpha;
    for (let m = 0; m < nodes.length; m++) {
        const p = nodes[m];
        ctx.fillStyle = p.dim ? palette.nodeDim : palette.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * k, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

/** Pass 3 — the cursor joins the web: faint links to every node within reach + a soft cursor node. */
export function drawPointerWeb(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
    pointer: ConstellationPointer | null,
): void {
    if (!pointer || pointer.x < 0) return;
    const { nodes, k } = field;
    const cl = link * k;
    const cl2 = cl * cl;
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 1 * k;
    for (const p of nodes) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > cl2) continue;
        ctx.globalAlpha = (1 - d2 / cl2) * 0.24 * palette.alpha;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
    ctx.globalAlpha = 0.55 * palette.alpha;
    ctx.fillStyle = palette.node;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 2.6 * k, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

/** Pass 4 — tap ripples: expanding rings fading over ~0.9s (mutates `ripples` in place). */
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
        ctx.globalAlpha = (1 - t) * 0.5 * palette.alpha;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, (8 + t * 130) * k, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
