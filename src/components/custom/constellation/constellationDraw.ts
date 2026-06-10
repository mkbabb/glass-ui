// The constellation DRAW passes — the FOUR NEUTRAL passes (edges, nodes,
// pointer-web, ripples) + the palette read they consume, carved out of the field
// engine. Pure Canvas2D paint code: it reads a resolved `ConstellationField` + a
// `ConstellationPalette` and strokes/fills the 2D context. NO logic edits — the
// bodies are the byte-for-byte lift of the prior in-engine draw cluster. The
// palette read feeds ONLY this pass, so it travels with it.
//
// The palette reads CSS custom properties off the canvas — the FULL
// `--constellation-*` legibility set (node / node-dim / line + the edge-alpha
// multipliers + the field-yields-to-type `--constellation-alpha` knob) with
// neutral fallbacks, so a consumer override or a dark-mode flip re-tints AND
// re-weights the lattice. The tokens are PLAIN-hsl per arm (AX.W17) — Canvas2D
// silently rejects a `light-dark()` value, so the `:root`/`.dark` cascade
// carries two literals, never a `light-dark()` function (the W30 cardinal leak).

import type {
    ConstellationField,
    ConstellationPalette,
    ConstellationPointer,
    ConstellationRipple,
} from "./constellationField";

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

// AY.W-COHERE E3 — the per-instance outer-envelope recession knob. EVERY draw
// pass scales its painted alpha by `opacityCeiling` OVER the mode-tuned
// `--constellation-alpha` base, so a <Constellation :opacity-ceiling="0.4"> hero
// RECEDES behind content exactly as its aurora (`opacityCeiling`) + fourier
// (`intensity`) siblings do — the ONE recession contract the four live substrates
// share. `--constellation-alpha` stays the mode-tuned base recession; this is the
// per-instance loudness envelope OVER it. Default `1` (the byte-identity canary):
// `globalAlpha * 1` is the byte-identical pre-envelope draw, so an
// `opacity-ceiling`-absent constellation paints exactly as HEAD.

/** Pass 1 — hairline edges between any two nodes within `link` px (alpha falls off with distance). */
export function drawEdges(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
    opacityCeiling = 1,
): void {
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The hairline edge alpha = the per-mode `--constellation-edge-alpha`
    // multiplier scaled by the field-yields-to-type `--constellation-alpha`
    // dimmer (AX.W17 — replaces the `0.17` magic literal), then the per-instance
    // `opacityCeiling` recession envelope (E3).
    const edge = palette.edgeAlpha * palette.alpha * opacityCeiling;
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
    opacityCeiling = 1,
): void {
    const { nodes, k } = field;
    // E3 — the recession envelope. At `opacityCeiling=1` this is `globalAlpha=1`,
    // byte-identical to the prior implicit full-alpha node fill; a recessed hero
    // dims the dots in lockstep with the edges/web.
    ctx.globalAlpha = opacityCeiling;
    for (let m = 0; m < nodes.length; m++) {
        const p = nodes[m];
        ctx.fillStyle = p.dim ? palette.nodeDim : palette.node;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * k, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

/** Pass 3 — the cursor joins the web: faint links to nodes within reach + a soft cursor node. */
export function drawPointerWeb(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    link: number,
    palette: ConstellationPalette,
    pointer: ConstellationPointer | null,
    opacityCeiling = 1,
): void {
    if (!pointer || pointer.x < 0) return;
    const { nodes, k } = field;
    const reach = link * k;
    const reach2 = reach * reach;
    // The cursor-web links read a touch stronger than the ambient edges (the
    // pointer is the active focus), scaled by the same field-yields-to-type
    // `--constellation-alpha` dimmer (AX.W17 — replaces the `0.24` literal), then
    // the per-instance `opacityCeiling` recession envelope (E3).
    const web = palette.edgeFocusAlpha * palette.alpha * opacityCeiling;
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
    ctx.globalAlpha = 0.55 * opacityCeiling;
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
    opacityCeiling = 1,
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
        // E3 — the recession envelope rides the ripple fade too.
        ctx.globalAlpha = (1 - t) * 0.5 * opacityCeiling;
        ctx.lineWidth = 1.4 * k;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, (8 + t * 130) * k, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
