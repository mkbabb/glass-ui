// Copied unchanged from atlas (lv-atlas da0528f, src/charts/composables/frame-coalesce.ts) for the witness.
// charts/composables/frame-coalesce.ts — a ResizeObserver callback that writes on the next frame
// (P4-crit-56, P5-filters-37). A callback that measures and writes reactive layout state inside the
// observer's delivery can resize the box it observes in the same delivery; WebKit then raises
// "ResizeObserver loop completed with undelivered notifications" as a page error (/sci and /usf at
// 390). Wrapping the callback runs it once on the next animation frame, outside the delivery, the
// same rule useFrameSize follows.

/** A coalesced, cancellable caller: every call before the next frame runs `fn` once on that frame. */
export interface FrameCoalesced {
    (): void;
    cancel(): void;
}

export function coalesceToFrame(fn: () => void): FrameCoalesced {
    let frame = 0;
    const run = (() => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
            frame = 0;
            fn();
        });
    }) as FrameCoalesced;
    run.cancel = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
    };
    return run;
}
