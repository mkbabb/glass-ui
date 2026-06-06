/**
 * Sortable touch-gesture resolver + pointer-capture optimization.
 *
 * `targetIsHandle` gates whether a pointerdown starts a drag (the grip
 * constraint). `acquirePointerCapture` is the optimization layer: a successful
 * `setPointerCapture` routes move/up events to the captured element, but it is
 * NOT the drag's primary path — the document `pointermove`/`pointerup` listeners
 * carry the drag unconditionally (AV.W1.1b). Capture failure is SURFACED (not
 * swallowed) via the returned boolean + a once-per-process dev warning, so a
 * consumer can observe the degraded-but-correct path.
 */

/**
 * True when the pointerdown target satisfies the grip constraint. `null` selector
 * allows drag from anywhere on the row; otherwise the target must be (or descend
 * from) an element matching the selector.
 */
export function targetIsHandle(
    target: EventTarget | null,
    handleSelector: string | null,
): boolean {
    if (handleSelector === null) return true;
    if (!(target instanceof Element)) return false;
    return target.closest(handleSelector) !== null;
}

/** Dev-warn the capture-unavailable path exactly once per process. */
let warnedCaptureUnavailable = false;

/**
 * Attempt the `setPointerCapture` optimization on the pointerdown host. Returns
 * the resulting `pointerCaptureActive` state: `true` when a capture is held (or
 * when the host has no `setPointerCapture` method at all — no degradation to
 * signal), `false` ONLY when the method is present but THREW — in which case the
 * drag still runs on the document listeners (the unconditional primary path) and
 * the failure is dev-warned once.
 */
export function acquirePointerCapture(
    host: Element | null,
    pointerId: number,
): boolean {
    if (host && "setPointerCapture" in host) {
        try {
            (host as HTMLElement).setPointerCapture(pointerId);
            return true;
        } catch {
            // fail-explicit: befitting — capture is an optimization; the document
            // pointermove/pointerup listeners are the real drag path and run
            // unconditionally. The failure is SURFACED via the return value (not
            // swallowed) and dev-warned once.
            if (import.meta.env.DEV && !warnedCaptureUnavailable) {
                warnedCaptureUnavailable = true;
                console.warn(
                    "[glass-ui] useSortable: setPointerCapture unavailable — " +
                        "dragging via document listeners (pointerCaptureActive=false).",
                );
            }
            return false;
        }
    }
    // No host / no method: capture is not applicable, but the document listeners
    // carry the drag — the state stays `true` (matches the pre-split behavior
    // where the branch was simply not entered).
    return true;
}
