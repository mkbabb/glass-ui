import type {
    ConstellationEdge,
    ConstellationField,
    ConstellationPalette,
    ConstellationPointer,
    ConstellationRipple,
} from "./constellationTypes";
import { parallaxNodePos } from "./constellationField";
import { DEFAULT_K_FLOOR, DEFAULT_PALETTE } from "./constants";

/** Visual sizes floor independently from field geometry. */
export function kVisOf(field: ConstellationField): number {
    return Math.max(field.k, field.kFloor ?? DEFAULT_K_FLOOR);
}


/** Resolve the neutral palette and legibility weights from the canvas tokens. */
export function readPalette(canvas: HTMLCanvasElement): ConstellationPalette {
    if (typeof window === "undefined") return { ...DEFAULT_PALETTE };
    const style = getComputedStyle(canvas);
    const read = (name: string, fallback: string): string =>
        style.getPropertyValue(name).trim() || fallback;
    const readNumber = (name: string, fallback: number): number => {
        const value = Number.parseFloat(style.getPropertyValue(name));
        return Number.isFinite(value) ? value : fallback;
    };
    return {
        node: read("--constellation-node", DEFAULT_PALETTE.node),
        nodeDim: read("--constellation-node-dim", DEFAULT_PALETTE.nodeDim),
        line: read("--constellation-line", DEFAULT_PALETTE.line),
        accent: read("--constellation-accent", DEFAULT_PALETTE.accent),
        alpha: readNumber("--constellation-alpha", DEFAULT_PALETTE.alpha),
        edgeAlpha: readNumber(
            "--constellation-edge-alpha",
            DEFAULT_PALETTE.edgeAlpha,
        ),
        edgeFocusAlpha: readNumber(
            "--constellation-edge-focus-alpha",
            DEFAULT_PALETTE.edgeFocusAlpha,
        ),
        edgeAccentAlpha: readNumber(
            "--constellation-edge-accent-alpha",
            DEFAULT_PALETTE.edgeAccentAlpha,
        ),
        edgeFloor: readNumber(
            "--constellation-edge-floor",
            DEFAULT_PALETTE.edgeFloor,
        ),
    };
}

/** Paint the edge rows produced by the field's single `buildEdges` scan. */
export function drawEdges(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    edges: readonly ConstellationEdge[],
    palette: ConstellationPalette,
    opacity = 1,
): void {
    const scale = kVisOf(field);
    const dim = palette.alpha * opacity;
    for (const edge of edges) {
        if (edge.focus) {
            ctx.strokeStyle = palette.line;
            ctx.lineWidth = scale;
            ctx.globalAlpha = edge.alpha * palette.edgeFocusAlpha * dim;
        } else if (edge.accent) {
            ctx.strokeStyle = palette.accent;
            ctx.lineWidth = 1.1 * scale;
            ctx.globalAlpha = edge.alpha * palette.edgeAccentAlpha * dim;
        } else {
            ctx.strokeStyle = palette.line;
            ctx.lineWidth = scale;
            ctx.globalAlpha = (edge.alpha * palette.edgeAlpha + palette.edgeFloor) * dim;
        }
        ctx.beginPath();
        ctx.moveTo(edge.ax, edge.ay);
        ctx.lineTo(edge.bx, edge.by);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

/** Paint ambient nodes, applying only the visual parallax offset. */
export function drawNodes(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    palette: ConstellationPalette,
    opacity = 1,
    pointer: ConstellationPointer | null = null,
    parallax = 0,
): void {
    const scale = kVisOf(field);
    ctx.globalAlpha = opacity;
    for (const node of field.nodes) {
        const position = parallaxNodePos(
            node,
            pointer,
            field.w,
            field.h,
            parallax,
        );
        ctx.fillStyle = node.dim ? palette.nodeDim : palette.node;
        ctx.beginPath();
        ctx.arc(position.x, position.y, node.r * scale, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

/** Paint the pointer node after its focus edges. */
export function drawPointer(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    pointer: ConstellationPointer | null,
    palette: ConstellationPalette,
    opacity = 1,
): void {
    if (!pointer || pointer.x < 0) return;
    ctx.globalAlpha = 0.55 * opacity;
    ctx.fillStyle = palette.node;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 2.6 * kVisOf(field), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

/** Paint and retire tap/flick ripples. */
export function drawRipples(
    ctx: CanvasRenderingContext2D,
    field: ConstellationField,
    now: number,
    ripples: ConstellationRipple[],
    palette: ConstellationPalette,
    opacity = 1,
): void {
    const scale = kVisOf(field);
    ctx.strokeStyle = palette.line;
    for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        if (ripple.start < 0) ripple.start = now;
        const phase = (now - ripple.start) / 900;
        if (phase >= 1) {
            ripples.splice(i, 1);
            continue;
        }
        ctx.globalAlpha = (1 - phase) * 0.5 * opacity;
        ctx.lineWidth = 1.4 * scale;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, (8 + phase * 130) * scale, 0, Math.PI * 2);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}
