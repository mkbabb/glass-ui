// The sole backing-store sizer. `createCanvasLifecycle` composes and re-exports it.
// This leaf owns pure CSS geometry with no closure state, scheduling, or listeners.

/**
 * The freshly-measured backing geometry the leaf hands the consumer's `resize`. The
 * consumer no longer MEASURES (the leaf owns the gBCR + the bounded ancestor walk +
 * the DPR clamp + the NEVER-300×150 floor, ONE implementation); it only UPLOADS these
 * dims to its viewport/uniforms. `changed` is `false` when the buffer already matched
 * (an idempotent same-box tick — the consumer can skip a redundant uniform upload).
 */
export interface BackingSize {
    w: number;
    h: number;
    dpr: number;
    changed: boolean;
}

/**
 * The consumer's DPR policy — either a flat multiplier or a box-aware resolver (e.g.
 * aurora's 1.5× wash ceiling vs goo-blob's 2× focal `resolveBudgetDpr`). The leaf owns
 * the MEASUREMENT + the floor; the consumer owns ONLY the DPR number.
 */
export type DprPolicy = number | ((box: { w: number; h: number }) => number);

/**
 * The canonical backing-store sizer.
 *
 * The shared ancestor-aware sizer replaces per-consumer `resize()` conventions.
 *
 * Measures the LAID-OUT border-box via `getBoundingClientRect` — NOT `clientWidth`,
 * which reads 0 under a `content-visibility:auto` skip (the born-skipped trap). Walks
 * ancestors ONLY when our own rect is still zero (truly un-laid-out), and the walk is
 * Bounded: cap depth at 3 and stop at the first sized, contained, container-positioned
 * ancestor — never an unbounded gBCR walk to `<body>` (O(depth) reflow per
 * tick), never an over-recovered wide flex/grid grandparent that sizes the backing to
 * the viewport. Idempotent: the realloc (which CLEARS the drawing buffer) is skipped
 * when the buffer already matches the box.
 *
 * Pure CSS-geometry — ZERO dependency on which GPU API is live, so it runs SYNCHRONOUSLY
 * at mount before the async WebGPU device resolves. Engine-identical in Chromium and
 * WebKit (gBCR reflects the real box across a CV skip in both).
 */
export function sizeBacking(
    canvas: HTMLCanvasElement,
    dprPolicy: DprPolicy,
): BackingSize {
    const rect = canvas.getBoundingClientRect();
    let cw = rect.width;
    let ch = rect.height;
    let el = canvas.parentElement;
    let depth = 0;
    const hasCS = typeof getComputedStyle !== "undefined";
    while ((cw === 0 || ch === 0) && el && depth < 3) {
        const pr = el.getBoundingClientRect();
        cw = cw || pr.width;
        ch = ch || pr.height;
        // Stop at the first ancestor that DEFINES a box — its size is the real
        // containing block; walking past it risks the viewport over-recovery (H-B).
        if (hasCS) {
            const cs = getComputedStyle(el);
            if (
                cs.contain.includes("size") ||
                cs.containerType !== "normal" ||
                cs.position !== "static"
            ) {
                break;
            }
        }
        el = el.parentElement;
        depth++;
    }
    const box = { w: Math.max(1, cw), h: Math.max(1, ch) };
    const dpr = Math.max(
        1,
        typeof dprPolicy === "function" ? dprPolicy(box) : dprPolicy,
    );
    const w = Math.max(1, Math.round(box.w * dpr));
    const h = Math.max(1, Math.round(box.h * dpr));
    const changed = canvas.width !== w || canvas.height !== h;
    if (changed) {
        // Idempotent: skip the realloc (which would CLEAR the drawing buffer) when the
        // buffer already matches — a same-box RO/wake tick costs nothing.
        canvas.width = w;
        canvas.height = h;
    }
    return { w, h, dpr, changed };
}
