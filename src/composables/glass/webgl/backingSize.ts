// BD.W-SUBSTRATE-SIZE-UNIFY (G1) — the ONE backing-store sizer, carved into this
// colocated leaf at BG.W-COLOCATE (the WS4 canvas-lifecycle carve; ratchet-drain #3).
// `createCanvasLifecycle` COMPOSES it (imports + re-exports the value + its types so
// every consumer reaches the sizer through the lifecycle unchanged). Pure CSS-geometry
// — ZERO closure state, no scheduling, no DOM listeners; the schedule + park + reveal
// machinery live beside it (createCanvasLifecycle + the visibility leaf).

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
 * BD.W-SUBSTRATE-SIZE-UNIFY (G1) — the ONE canonical backing-store sizer.
 *
 * Aurora's PROVEN gBCR-ancestor sizer, lifted into the agnostic leaf so it lives ONCE
 * (DRY) instead of in N drifted consumer `resize()` closures (the three incompatible
 * `clientWidth || 320` / `clientWidth || canvasSize` / one-parent-gBCR conventions the
 * DELTA-ASSAY reproduced as the live 300×150 stuck-canvas).
 *
 * Measures the LAID-OUT border-box via `getBoundingClientRect` — NOT `clientWidth`,
 * which reads 0 under a `content-visibility:auto` skip (the born-skipped trap). Walks
 * ancestors ONLY when our own rect is still zero (truly un-laid-out), and the walk is
 * BOUNDED (H-B): cap depth at 3 AND stop at the first sized / contained / container /
 * positioned ancestor — never an unbounded gBCR storm to `<body>` (O(depth) reflow per
 * tick), never an over-recovered wide flex/grid grandparent that sizes the backing to
 * the viewport. Idempotent: the realloc (which CLEARS the drawing buffer) is skipped
 * when the buffer already matches the box.
 *
 * Pure CSS-geometry — ZERO dependency on which GPU API is live, so it runs SYNCHRONOUSLY
 * at mount before the async WebGPU device resolves (G2). Engine-identical in Chromium +
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
