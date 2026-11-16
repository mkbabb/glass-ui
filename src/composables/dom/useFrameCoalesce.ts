import { onScopeDispose } from "vue";

/**
 * One emit per animation frame for a control that streams a value under a drag.
 *
 * A pointer drag delivers input faster than the display paints (a 240 Hz pointer lands
 * two or more moves per frame), and each move that reaches the consumer runs its whole
 * synchronous path for a value the frame never shows. `push` keeps only the latest value
 * and hands it to `deliver` once, at the start of the next frame, before that frame
 * paints. `flush` delivers the pending value now: the end of a gesture calls it before
 * its commit, so the commit never outruns the last value. Input that is not a drag (a
 * key step) never goes through here; it delivers synchronously.
 *
 * The frame is cancelled with its scope; a value still pending at teardown is dropped,
 * because nothing is left to receive it.
 */
export interface UseFrameCoalesceControls<T> {
    /** Hold `value` as the latest; deliver it on the next frame (once per frame). */
    push: (value: T) => void;
    /** Deliver the pending value now, if any, and cancel the frame. */
    flush: () => void;
    /** Whether a value is waiting for its frame. */
    pending: () => boolean;
}

export function useFrameCoalesce<T>(
    deliver: (value: T) => void,
): UseFrameCoalesceControls<T> {
    let held: { value: T } | null = null;
    let frame = 0;

    function run(): void {
        frame = 0;
        if (!held) return;
        const { value } = held;
        held = null;
        deliver(value);
    }

    function push(value: T): void {
        held = { value };
        if (!frame) frame = requestAnimationFrame(run);
    }

    function flush(): void {
        if (frame) cancelAnimationFrame(frame);
        run();
    }

    onScopeDispose(() => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        held = null;
    });

    return { push, flush, pending: () => held !== null };
}
