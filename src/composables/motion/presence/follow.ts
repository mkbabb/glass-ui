// follow (W-B.17 R-8): a box whose content changed reaches its new size by one tween.
//
// The one writer in glass that animates a size. One shot per change, on the smallest
// box, on the `present` clock read from the same tokens the CSS legs read. Under
// reduced motion it does not run: the box lands in one frame and what arrived fades.
import { nextTick } from "vue";
import { readReducedMotion } from "../core/useReducedMotion";

const ID = "follow";

interface Box {
    w: number;
    h: number;
    /** The block-start margin, which a line that gives its room back also changes. */
    m: number;
}
const box = (el: HTMLElement): Box => ({
    w: el.offsetWidth,
    h: el.offsetHeight,
    m: Number.parseFloat(getComputedStyle(el).marginBlockStart) || 0,
});

/** The clock grows with the distance: the `present` clock up to 40 px, rising to
 *  `--duration-slow` at 320 px. The curve is `--ease-standard`, which leaves rest at no
 *  speed and reaches its end exactly, so the last frame is under half a pixel. */
function clock(el: HTMLElement, px: number): { duration: number; easing: string } {
    const cs = getComputedStyle(el);
    const lo = Number.parseFloat(cs.getPropertyValue("--spring-present-settle"));
    const hi = Number.parseFloat(cs.getPropertyValue("--duration-slow"));
    const tempo = Number.parseFloat(cs.getPropertyValue("--motion-tempo"));
    const k = Math.min(1, Math.max(0, (px - 40) / 280));
    return {
        duration: (lo + (hi - lo) * k) * tempo * 1000,
        easing: cs.getPropertyValue("--ease-standard").trim(),
    };
}

/** Width is tweened only on a box whose text cannot wrap; lines never re-break. */
const fixedLines = (el: HTMLElement): boolean => getComputedStyle(el).whiteSpace.includes("nowrap");

function size(el: HTMLElement, from: Box, to: Box, extra?: PropertyIndexedKeyframes): Animation {
    const wide = from.w !== to.w && fixedLines(el);
    const px = Math.max(wide ? Math.abs(to.w - from.w) : 0, Math.abs(to.h - from.h));
    return el.animate(
        {
            overflow: ["clip", "clip"],
            ...(wide && { inlineSize: [`${from.w}px`, `${to.w}px`] }),
            ...(from.h !== to.h && { blockSize: [`${from.h}px`, `${to.h}px`] }),
            ...(from.m !== to.m && { marginBlockStart: [`${from.m}px`, `${to.m}px`] }),
            ...extra,
        },
        { id: ID, ...clock(el, px) },
    );
}

const same = (a: Box, b: Box): boolean =>
    Math.abs(a.w - b.w) < 0.5 && Math.abs(a.h - b.h) < 0.5 && Math.abs(a.m - b.m) < 0.5;
const live = new WeakMap<HTMLElement, { from: Box; to: Box; anim: Animation }>();

function run(el: HTMLElement, from: Box, to: Box): Animation {
    const anim = size(el, from, to);
    live.set(el, { from, to, anim });
    return anim;
}

/** Call BEFORE the change. Resolves when the box has settled. */
export async function follow(el: HTMLElement | null): Promise<void> {
    if (!el || readReducedMotion()) return;
    const from = box(el);
    await nextTick();
    const prev = live.get(el);
    const at = prev?.anim.playState === "running" ? Number(prev.anim.currentTime) : null;
    for (const a of el.getAnimations()) if (a.id === ID) a.cancel();
    const to = box(el);
    if (same(from, to)) return;
    let anim: Animation;
    if (prev && at !== null && same(to, prev.from)) {
        // Sent back to where it came from: the same tween, played backward from here.
        anim = run(el, prev.from, prev.to);
        anim.currentTime = at;
        anim.reverse();
    } else anim = run(el, from, to);
    await anim.finished.catch(() => {});
}

/** `<Presence swap>`: the seat (the parent) follows when the two contents differ in
 *  size. Its size is read as the old content starts to leave and again as the new one
 *  is inserted. */
const seats = new WeakMap<HTMLElement, Box>();
export const swapHooks = {
    onBeforeLeave(el: Element): void {
        const seat = el.parentElement;
        if (seat) seats.set(seat, box(seat));
    },
    onEnter(el: Element): void {
        const seat = el.parentElement;
        const from = seat && seats.get(seat);
        if (!seat || !from) return;
        seats.delete(seat);
        const to = box(seat);
        if (!same(from, to)) run(seat, from, to);
    },
};
