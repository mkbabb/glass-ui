// BM pass 9, corrected from pass 8 (folds B8-1, B8-3, A8-3, A8-12; DESIGN §10.5): the script a native-scroll detented
// sheet keeps, a design sketch, not library source. Its stylesheet is sheet-scroll.next.css.
// The platform scrolls, snaps and carries momentum. This file opens the sheet at its first rung, learns the rung the
// panel is over from one IntersectionObserver (thresholds at the edges between the rungs' basins; nothing reads a
// scroll position), and COMMITS only when the scroll has come to rest:
//   - on `scrollend` where the engine sends it (Safari 26.2), two frames later, once the observer has seen the landing;
//   - before that, after 150 ms with no scroll and no finger down, the stand-in the Carousel's 11.1.2 cure uses.
// So `v-model:detent` never changes under a finger held past a basin's edge or before a smooth scroll lands (pass 8
// wrote it on every crossing: 0.85 under a finger held at 0.64, and 117 to 243 ms before `scrollend`). A watcher that
// scrolls the sheet to a new `v-model` value waits for the same rest, so it never fights a finger.
// The opening write lands before any report is trusted: a report of "closed" before the panel has first been seen open
// is not a close (B8-1).
// The scrim keeps BL's rung law (`scrimDetentOpacity`: 0 when dismissed, rising to 0.28 + 0.44 t at the first rung,
// 0.28 + 0.44 t above it), played by WAAPI on a ScrollTimeline where the engine has one (Safari 26), so nothing is
// written per frame; else it takes the committed rung's value on its own 120 ms transition.
// Under Reduce Motion a close or a rung change by a control is the dip (choice 8 A): out, land while hidden, in.
import { onMounted, onScopeDispose, type Ref } from "vue";

const law = (t: number, first: number) => (t >= first ? 0.28 + 0.44 * t : ((0.28 + 0.44 * first) * t) / first);

export function useSheetScroll(opts: {
    scroller: Ref<HTMLElement | null>;
    panel: Ref<HTMLElement | null>;
    scrim: Ref<HTMLElement | null>;
    rungs: () => readonly number[]; // ascending fractions of the viewport, e.g. [0.4, 0.9]
    rung: Ref<number | null>; // v-model:detent
    requestClose: () => void;
}) {
    let io: IntersectionObserver | null = null, seen = -1, opened = false, down = false, quiet = 0;
    const off: (() => void)[] = [];
    const on = (t: EventTarget, k: string, f: EventListener) => { t.addEventListener(k, f, { passive: true }); off.push(() => t.removeEventListener(k, f)); };
    const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dip = async (land: () => void) => {
        const p = opts.panel.value!;
        await p.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: "ease-out", fill: "forwards" }).finished;
        land();
        p.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100, easing: "ease-in" });
    };
    onMounted(() => {
        const sc = opts.scroller.value, panel = opts.panel.value, scrim = opts.scrim.value;
        if (!sc || !panel) return;
        const rungs = [0, ...opts.rungs()], first = rungs[1], top = rungs[rungs.length - 1];
        const H = sc.clientHeight, P = panel.offsetHeight;
        sc.scrollTop = (opts.rung.value ?? first) * H; // before the first paint; a 1 px rung keeps it in WebKit
        const commit = () => {
            if (down || !opened || seen < 0) return;
            if (seen === 0) { opts.requestClose(); return; }
            if (opts.rung.value !== seen) opts.rung.value = seen;
            if (scrim && !("ScrollTimeline" in window)) scrim.style.opacity = String(law(seen, first));
        };
        const edges = [0.001 * (P / H), ...rungs.slice(1).map((r, i) => (rungs[i] + r) / 2)];
        io = new IntersectionObserver(([e]) => {
            const share = (e.intersectionRatio * P) / H;
            seen = e.intersectionRatio < 0.001 ? 0 : rungs.reduce((a, b) => (Math.abs(b - share) < Math.abs(a - share) ? b : a));
            if (seen > 0) opened = true;
        }, { root: sc, threshold: [0, ...edges.map((x) => Math.min(1, (x * H) / P))] });
        io.observe(panel);
        // An instant scroll ends before the observer has seen where it landed (its records are taken at the next frame's
        // rendering and delivered after it), so the commit waits two frames past `scrollend`.
        if ("onscrollend" in window) on(sc, "scrollend", () => requestAnimationFrame(() => requestAnimationFrame(commit)));
        else {
            on(sc, "touchstart", () => { down = true; });
            on(sc, "touchend", () => { down = false; });
            on(sc, "scroll", () => { clearTimeout(quiet); quiet = window.setTimeout(commit, 150); });
        }
        if (scrim && "ScrollTimeline" in window) {
            const keys = rungs.slice(1).map((r) => ({ offset: r / top, opacity: law(r, first) }));
            // @ts-expect-error ScrollTimeline is not in lib.dom for every target
            scrim.animate([{ offset: 0, opacity: 0 }, ...keys], { timeline: new ScrollTimeline({ source: sc, axis: "block" }), fill: "both" });
        }
    });
    onScopeDispose(() => { io?.disconnect(); off.forEach((f) => f()); clearTimeout(quiet); });
    const goTo = (r: number) => {
        const sc = opts.scroller.value; if (!sc) return;
        const top = r * sc.clientHeight;
        if (reduce()) void dip(() => sc.scrollTo({ top, behavior: "instant" }));
        else sc.scrollTo({ top, behavior: "smooth" });
    };
    // Close from a control (Escape, a button): to the closed rung; the commit at rest closes.
    return { goTo, close: () => goTo(0) };
}
