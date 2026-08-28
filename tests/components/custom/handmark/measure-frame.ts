// The synthetic measurement frame both handmark gates read through — and the ONE
// place the ENGINE'S OWN RECT SHAPE is stated.
//
// Not a test file: the runner collects `tests/**/*.{test,spec}.{ts,tsx}` only, so this
// module holds no seat and mints nothing. It exists because a rect stub that lies is
// worse than no stub — the wrapper double-rect (π band, γ-π-3) shipped precisely
// because both gates stubbed `Range.prototype.getClientRects` to a hand-authored list
// in which a `<del>` / `<mark>` wrapper could not possibly double-count. Stating the
// shape once, honestly, is the detector.

/** A line box the slot is measured to occupy, in the synthetic frame's own px. */
export interface Line {
    x: number;
    y: number;
    w: number;
    h: number;
}

export function domRect(x: number, y: number, w: number, h: number): DOMRect {
    return {
        x,
        y,
        width: w,
        height: h,
        top: y,
        left: x,
        right: x + w,
        bottom: y + h,
        toJSON: () => ({}),
    } as DOMRect;
}

type RectList = DOMRect[] & { item: (i: number) => DOMRect | null };

function list(rects: DOMRect[]): RectList {
    return Object.assign(rects.slice(), {
        item: (i: number) => rects[i] ?? null,
    }) as RectList;
}

/**
 * `Range.getClientRects()` as an engine actually returns it: the border box of every
 * element FULLY CONTAINED in the range, IN ADDITION to the text rects it covers. A
 * range anchored on the host's child nodes therefore reports a `<del>` / `<mark>`
 * wrapper twice per line — once as a box, once as its text — while a range whose
 * endpoints sit inside a TEXT NODE contains no element at any depth and yields the
 * text rects alone.
 *
 * The element branch stays live after the cure: it is what REDs if the component ever
 * goes back to ranging over child nodes.
 */
function engineRects(range: Range, rects: DOMRect[]): RectList {
    const host = range.startContainer;
    if (host !== range.endContainer || host.nodeType !== Node.ELEMENT_NODE) return list(rects);
    const contained = Array.from(host.childNodes).slice(range.startOffset, range.endOffset);
    const boxes = contained.filter((n) => n.nodeType === Node.ELEMENT_NODE);
    return list(boxes.flatMap(() => rects).concat(rects));
}

let restore: Array<() => void> = [];

/**
 * The mark's own SVG lands at the origin and the slot occupies `lines`, so the emitted
 * geometry is already in frame coordinates and every number in a `d` is directly
 * comparable to the rect that produced it.
 */
export function installMeasure(lines: Line[]): void {
    const rects = lines.map((l) => domRect(l.x, l.y, l.w, l.h));

    const patch = <T extends object>(target: T, key: string, value: unknown) => {
        const prev = Object.getOwnPropertyDescriptor(target, key);
        Object.defineProperty(target, key, { configurable: true, writable: true, value });
        restore.push(() => {
            if (prev) Object.defineProperty(target, key, prev);
            else Reflect.deleteProperty(target, key);
        });
    };

    patch(Range.prototype, "getClientRects", function (this: Range) {
        return engineRects(this, rects);
    });
    patch(Element.prototype, "getBoundingClientRect", () => domRect(0, 0, 900, 400));
    patch(Element.prototype, "getClientRects", () => list(rects));
}

/** Every patch this module installed, undone. Call from `afterEach`. */
export function restoreMeasure(): void {
    restore.forEach((fn) => fn());
    restore = [];
}
