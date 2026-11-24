// BM pass 8 (Q12, D16; DESIGN §10.5): the script a native-scroll detented sheet keeps, a design sketch, not library
// source. Its stylesheet is sheet-scroll.next.css. The platform scrolls, snaps and carries momentum; this file only
// opens the sheet at its first rung, reports the rung it rests on, and closes it when the panel leaves the scroller.
// One IntersectionObserver on the panel, rooted on the scroller, so the scroller's own entrance (`translate` on
// `bloom`'s single curve) moves root and panel together and never reads as a close. Its thresholds sit at the edges between the
// rungs' basins (the midpoints) and just above closed, so the last crossing before the snap lands names the rung the
// sheet rests on: a threshold at a rung itself would not fire on landing there. Nothing reads a scroll position, and
// a callback comes when a threshold is crossed, not each frame.
import { onMounted, onScopeDispose, type Ref } from "vue";

export function useSheetScroll(opts: {
    scroller: Ref<HTMLElement | null>;
    panel: Ref<HTMLElement | null>;
    rungs: () => readonly number[]; // ascending fractions of the viewport, e.g. [0.4, 0.9]
    rung: Ref<number | null>; // v-model:detent
    requestClose: () => void;
}) {
    let io: IntersectionObserver | null = null;
    onMounted(() => {
        const sc = opts.scroller.value, panel = opts.panel.value;
        if (!sc || !panel) return;
        const rungs = [0, ...opts.rungs()];
        const H = sc.clientHeight, P = panel.offsetHeight;
        sc.scrollTop = (opts.rung.value ?? rungs[1]) * H; // before the first paint
        const edges = [0.001 * (P / H), ...rungs.slice(1).map((r, i) => (rungs[i] + r) / 2)];
        io = new IntersectionObserver(
            ([e]) => {
                if (e.intersectionRatio < 0.001) { opts.requestClose(); return; }
                const share = (e.intersectionRatio * P) / H;
                opts.rung.value = rungs.reduce((a, b) => (Math.abs(b - share) < Math.abs(a - share) ? b : a));
            },
            { root: sc, threshold: [0, ...edges.map((x) => Math.min(1, (x * H) / P))] },
        );
        io.observe(panel);
    });
    onScopeDispose(() => io?.disconnect());
    // Close from a control (Escape, a button): the platform's smooth scroll to the closed rung; the observer closes.
    return { close: () => opts.scroller.value?.scrollTo({ top: 0, behavior: "smooth" }) };
}
