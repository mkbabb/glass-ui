import { onBeforeUnmount, shallowRef, watch, type Ref } from "vue";

/* THE BAR SHAPE (U/B7 G1-7). A control on its rung is a stadium. Past its rung it
 * is a bar, and a bar takes `--radius-bar` (the panel corner, 12px): the owner's
 * order of 2026-10-19 says a pill that large is too round.
 *
 * A control is past its rung when its label wraps, when its box is taller than the
 * rung (its own `min-block-size`, which every rung-sized control declares), or when
 * it is wider than 20rem. The element carries `data-shape="bar"` while that holds;
 * the component's own CSS maps the attribute to the corner. A ResizeObserver keeps
 * it live, so a label that wraps at a narrow viewport and unwraps at a wide one
 * changes shape with it. */

/** The inline size past which a control reads as a bar, in rem. */
const BAR_INLINE_REM = 20;

/** Whether `el` is past its rung. */
function isPastRung(el: HTMLElement): boolean {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const rem = parseFloat(getComputedStyle(el.ownerDocument.documentElement).fontSize) || 16;
    if (rect.width > BAR_INLINE_REM * rem + 0.5) return true;
    const rung = parseFloat(style.minBlockSize);
    return Number.isFinite(rung) && rung > 0 && rect.height > rung + 0.5;
}

/** `"bar"` while the element is past its rung, `undefined` otherwise: bind it to
 *  `data-shape`. */
export function useBarShape(target: Ref<HTMLElement | null>): Readonly<Ref<"bar" | undefined>> {
    const shape = shallowRef<"bar" | undefined>(undefined);
    let observer: ResizeObserver | null = null;

    const measure = (el: HTMLElement) => {
        shape.value = isPastRung(el) ? "bar" : undefined;
    };

    watch(
        target,
        (el) => {
            observer?.disconnect();
            observer = null;
            if (!el || typeof ResizeObserver === "undefined") return;
            observer = new ResizeObserver(() => measure(el));
            observer.observe(el);
            measure(el);
        },
        { flush: "post", immediate: true },
    );

    onBeforeUnmount(() => {
        observer?.disconnect();
        observer = null;
    });

    return shape;
}
