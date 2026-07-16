const PHI = 1.618033988749895;

const bell = (progress: number, power = 1): number =>
    Math.sin(Math.PI * Math.min(1, Math.max(0, progress))) ** power;

export interface DeckBarbellGeometry {
    bodyA: number;
    bodyB: number;
    midpoint: number;
    neckSpan: number;
    neckGirth: number;
    stretch: number;
    arc: number;
}

export function bodyDiameter(step: number): number {
    return Math.max(1, step) / PHI;
}

export function projectDeckBarbell(
    from: number,
    to: number,
    progress: number,
    step: number,
    weight: number,
): DeckBarbellGeometry {
    const p = Math.min(1, Math.max(0, progress));
    const diameter = bodyDiameter(step);
    const midpoint = (from + to) / 2;
    const separation = 1 - bell(p) * 0.15;
    const half = ((to - from) / 2) * separation;
    const neckGirth = bell(p, 1.5);
    const bodyA = midpoint - half;
    const bodyB = midpoint + half;
    const stretch = 1 + bell(p) * 0.12 * weight;
    return {
        bodyA,
        bodyB,
        midpoint,
        neckSpan: Math.abs(bodyB - bodyA) / diameter,
        neckGirth,
        stretch,
        arc: -diameter * 0.06 * bell(p) * weight,
    };
}

export function bodyTransform(
    center: number,
    arc: number,
    stretch: number,
): string {
    return `translateX(${center.toFixed(2)}px) translateY(${arc.toFixed(2)}px) translate(-50%, -50%) scaleX(${stretch.toFixed(4)}) scaleY(${(1 / stretch).toFixed(4)})`;
}

export function neckTransform(
    center: number,
    span: number,
    girth: number,
): string {
    return `translateX(${center.toFixed(2)}px) translateX(-50%) scaleX(${span.toFixed(4)}) scaleY(${girth.toFixed(4)})`;
}
