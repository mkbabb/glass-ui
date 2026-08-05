/**
 * Sortable input gate + pointer-capture optimization.
 *
 * `targetIsHandle` gates whether a pointerdown starts a drag (the grip
 * constraint); `eventTargetIsGrip` applies the SAME constraint to the delegated
 * keydown. `acquirePointerCapture` is the optimization layer: a successful
 * `setPointerCapture` routes move/up events to the captured element, but it is
 * NOT the drag's primary path — the document `pointermove`/`pointerup` listeners
 * carry the drag unconditionally. Capture failure is surfaced rather than
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

/**
 * The GRIP TEST for a delegated handler (G-KEY-SCOPE).
 *
 * The row's `keydown` is bound on the `<li>`, so EVERY key pressed anywhere inside
 * the row arrives here — and the controller consumes Space and Enter with
 * `preventDefault()`. Only `pointerdown` was asking whether the event started at the
 * grip; `keydown` consumed unconditionally, so a nested `<input>` inside a sortable
 * row could not type a space, and any nested `<button>` had its own Space activation
 * swallowed by the row. A delegated handler must not consume a key the focused
 * control owns; the pointer path already knew that and the key path did not.
 *
 * ONE predicate for both modes, because "what counts as the grip" is one question:
 *   • a handle selector is declared → the grip is the handle (the pointer rule,
 *     verbatim), so only a key that starts at the handle drives the drag;
 *   • no handle selector (`null`, the documented drag-from-anywhere contract) → the
 *     ROW ITSELF is the grip, so the event must start on the row and not on a
 *     descendant that owns its own keys.
 *
 * The `null` branch takes nothing away that worked: with no handle and no author-set
 * `tabindex` the row is not focusable, so a row-targeted keydown could only ever have
 * arrived from a focusable DESCENDANT — which is the case this closes. A row the
 * consumer makes focusable keeps its keyboard drag, on the row.
 */
export function eventTargetIsGrip(
    event: Pick<Event, "target" | "currentTarget">,
    handleSelector: string | null,
): boolean {
    if (handleSelector !== null) return targetIsHandle(event.target, handleSelector);
    return event.target === event.currentTarget;
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
