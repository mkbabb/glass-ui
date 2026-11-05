// The field-paint signal: one event, dispatched on a canvas each time glass's canvas
// lifecycle draws a frame on it.
//
// A glass surface over a field canvas (the dock's backdrop-luminance observer) needs to
// know when the pixels under it change. Polling the canvas on a frame loop costs a frame
// callback every frame for as long as the field exists, including the long stretches in
// which the field is still and the next sample would read the same pixels. The
// lifecycle already knows when it draws, so it says so: listeners sample on the
// announcement and stay idle while the field is parked or settled.
//
// The event does not bubble. Listeners subscribe on `document` in the capture phase,
// which every dispatch on a connected canvas passes through, so a listener never has
// to track which canvas the consumer mounts or when it mounts it.

/** The event type dispatched on a canvas after the lifecycle draws one frame. */
export const GLASS_FIELD_PAINT_EVENT = "glass-field-paint";

/** Announce one drawn frame on `canvas`. */
export function announceFieldPaint(canvas: HTMLCanvasElement): void {
    canvas.dispatchEvent(new Event(GLASS_FIELD_PAINT_EVENT));
}
