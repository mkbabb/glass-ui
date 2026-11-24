// useScrollChrome, as proposed (BM pass 2). A design sketch, not library source.
// The bar's collapse is a state, not a scrub: the scroll direction, once it has held for `flip` px, sets
// `data-collapsed` on the bar, and the stylesheet plays the change on accelerated properties. Nothing is
// written per frame, nothing snaps at a stop, and reduced motion is the stylesheet's fade.
import { onBeforeUnmount, onMounted, toValue, type MaybeRefOrGetter } from "vue";

export function useScrollChrome(
    scroller: MaybeRefOrGetter<HTMLElement | Window | null>,
    bar: MaybeRefOrGetter<HTMLElement | null>,
    { flip = 8, top = 8 }: { flip?: number; top?: number } = {},
): void {
    let last = 0, dir: "up" | "down" | null = null, run = 0, src: HTMLElement | Window | null = null;
    const read = () => (src instanceof HTMLElement ? src.scrollTop : window.scrollY);
    const onScroll = () => {
        const y = read(), d = y - last;
        last = y;
        const el = toValue(bar);
        if (!el) return;
        if (y <= top) { el.removeAttribute("data-collapsed"); dir = "up"; run = 0; return; }
        const now = d > 0 ? "down" : d < 0 ? "up" : dir;
        run = now === dir ? 0 : run + Math.abs(d);
        if (dir === null || (now !== dir && run >= flip)) {
            dir = now; run = 0;
            el.toggleAttribute("data-collapsed", now === "down");
        }
    };
    onMounted(() => {
        src = toValue(scroller);
        last = read();
        src?.addEventListener("scroll", onScroll, { passive: true });
    });
    onBeforeUnmount(() => src?.removeEventListener("scroll", onScroll));
}
