// field.mjs — the PAINTED-FIELD instrument.
// Transcribes the shipped smin verbatim from src/components/blob/shaders/metaball.wgsl.ts:116-140
// so every separation measurement is against the field the engine actually paints,
// not against a re-derived idealisation. Config-UV space throughout (POS_SCALE applied
// only where a canvas-edge claim is made).

export function sdCircle(px, py, cx, cy, r) {
    return Math.hypot(px - cx, py - cy) - r;
}

// metaball.wgsl.ts:116-124 — sminQuadraticG, value leg
export function sminQuadratic(a, b, k0) {
    const k = k0 * 4.0;
    const h = Math.max(k - Math.abs(a - b), 0.0) / k;
    const m = h * h * k * 0.25;
    return Math.min(a, b) - m;
}

// metaball.wgsl.ts:126-135 — sminCircularG, value leg
export function sminCircular(a, b, k0) {
    const k = k0 * (1.0 / (1.0 - Math.sqrt(0.5)));
    const h = Math.max(k - Math.abs(a - b), 0.0) / k;
    const m = k * 0.5 * (1.0 + h - Math.sqrt(1.0 - h * (h - 2.0)));
    return Math.min(a, b) - m;
}

export function fieldAt(px, py, bodies, k0, circular = false) {
    const smin = circular ? sminCircular : sminQuadratic;
    let d = Infinity;
    for (const b of bodies) {
        const di = sdCircle(px, py, b.x, b.y, b.r);
        d = d === Infinity ? di : smin(d, di, k0);
    }
    return d;
}

/**
 * Connected-component census of the painted field.
 * extent = half-width of the square sampled region (config-UV).
 * Returns { n, areas } where areas are in px, components below minPx are dropped
 * (the standing canvas-bbox rule: sub-pixel specks are not bodies).
 */
export function components(bodies, k0, { grid = 192, extent = 0.8, minPx = 12, circular = false } = {}) {
    const N = grid;
    const inside = new Uint8Array(N * N);
    const step = (2 * extent) / (N - 1);
    for (let j = 0; j < N; j++) {
        const py = -extent + j * step;
        for (let i = 0; i < N; i++) {
            const px = -extent + i * step;
            inside[j * N + i] = fieldAt(px, py, bodies, k0, circular) <= 0 ? 1 : 0;
        }
    }
    const label = new Int32Array(N * N).fill(-1);
    const areas = [];
    const stack = [];
    let next = 0;
    for (let s = 0; s < N * N; s++) {
        if (!inside[s] || label[s] >= 0) continue;
        const id = next++;
        let area = 0;
        stack.length = 0;
        stack.push(s);
        label[s] = id;
        while (stack.length) {
            const c = stack.pop();
            area++;
            const ci = c % N, cj = (c / N) | 0;
            if (ci > 0 && inside[c - 1] && label[c - 1] < 0) { label[c - 1] = id; stack.push(c - 1); }
            if (ci < N - 1 && inside[c + 1] && label[c + 1] < 0) { label[c + 1] = id; stack.push(c + 1); }
            if (cj > 0 && inside[c - N] && label[c - N] < 0) { label[c - N] = id; stack.push(c - N); }
            if (cj < N - 1 && inside[c + N] && label[c + N] < 0) { label[c + N] = id; stack.push(c + N); }
        }
        areas.push(area);
    }
    const kept = areas.filter((a) => a >= minPx).sort((a, b) => b - a);
    return { n: kept.length, areas: kept, raw: areas.length };
}

/** Neck width across the saddle between two bodies, sampled perpendicular to the centre line. */
export function neckWidth(bA, bB, k0, { samples = 400, circular = false } = {}) {
    const dx = bB.x - bA.x, dy = bB.y - bA.y;
    const d = Math.hypot(dx, dy);
    if (d < 1e-9) return NaN;
    const ux = dx / d, uy = dy / d;
    const nx = -uy, ny = ux;
    // saddle sits where the two SDFs are equal
    const t = (d + bA.r - bB.r) / 2;
    const sx = bA.x + ux * t, sy = bA.y + uy * t;
    let w = 0;
    const span = 0.6;
    for (let i = 0; i <= samples; i++) {
        const o = (i / samples) * span;
        if (fieldAt(sx + nx * o, sy + ny * o, [bA, bB], k0, circular) > 0) break;
        w = o;
    }
    return 2 * w;
}
