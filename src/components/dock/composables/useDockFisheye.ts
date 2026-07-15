import { onMounted, onUnmounted, type Ref } from "vue";

export interface UseDockFisheyeOptions {
    /** Arm gate (default always). A parked-until-DEVICE consumer passes `() => false`. */
    enabled?: () => boolean;
}

export interface UseDockFisheyeReturn {
    /** Re-write each item's layout-time `--x` (call after a content/layout change). */
    remeasure: () => void;
}

/**
 * useDockFisheye — the ONE rAF-coalesced pointermove `--dock-px` writer for the fits-branch
 * pure-CSS Gaussian fisheye (BI.W-DOCK-OVERFLOW, G4). It writes exactly ONE per-frame
 * scalar — `--dock-px` (the pointer's inline position relative to the scroll port, a
 * unitless number) on the dock; each item carries a LAYOUT-TIME `--x` (its center, unitless,
 * (re)written on the RO — NOT per frame). The pure-CSS Gaussian in fisheye.css does the
 * per-item scale. The JS owns NO scale math and NO layout write — it writes two custom
 * properties and adds the `.dock-fisheye-item` marker class.
 *
 * The writer is the ENHANCEMENT layer over the universal native-scroll floor (overflow.css):
 * the CSS gates the scale on `:not([data-dock-overflow])` + `(hover: hover) and (pointer:
 * fine)` + PRM-off, so a scrollable / coarse / reduced-motion dock paints flat regardless of
 * this writer. G9/O5 — this is a `pointermove` listener, NEVER a `scroll` listener.
 */
export function useDockFisheye(
    dockEl: Ref<HTMLElement | null>,
    options: UseDockFisheyeOptions = {},
): UseDockFisheyeReturn {
    const enabled = options.enabled ?? (() => true);
    let ro: ResizeObserver | null = null;
    let rafId = 0;
    let pendingX: number | null = null;
    let armed = false;

    function port(): HTMLElement | null {
        return dockEl.value?.querySelector<HTMLElement>(".dock-layer--full") ?? null;
    }

    function vertical(): boolean {
        return dockEl.value?.classList.contains("vertical") ?? false;
    }

    function items(p: HTMLElement): HTMLElement[] {
        return Array.from(p.children).filter(
            (c): c is HTMLElement => c instanceof HTMLElement,
        );
    }

    /** Layout-time: mark each item + write its center `--x` (unitless px, port-relative). */
    function remeasure() {
        const p = port();
        if (!p) return;
        const isVertical = vertical();
        const portRect = p.getBoundingClientRect();
        const portStart = isVertical ? portRect.top : portRect.left;
        for (const el of items(p)) {
            el.classList.add("dock-fisheye-item");
            const r = el.getBoundingClientRect();
            const center = isVertical ? r.top + r.height / 2 : r.left + r.width / 2;
            el.style.setProperty("--x", String(Math.round(center - portStart)));
        }
    }

    function coarseOrReduced(): boolean {
        if (typeof window === "undefined") return true;
        return (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        );
    }

    function flush() {
        rafId = 0;
        const dock = dockEl.value;
        if (dock && pendingX != null) {
            dock.style.setProperty("--dock-px", String(Math.round(pendingX)));
        }
    }

    function onPointerMove(e: PointerEvent) {
        const p = port();
        if (!p) return;
        const r = p.getBoundingClientRect();
        pendingX = vertical() ? e.clientY - r.top : e.clientX - r.left;
        // rAF-COALESCE — at most ONE `--dock-px` write per frame regardless of move rate.
        if (!rafId) rafId = requestAnimationFrame(flush);
    }

    function onPointerLeave() {
        cancelAnimationFrame(rafId);
        rafId = 0;
        // Seat the pointer "infinitely far" so every Gaussian relaxes to scale 1.
        dockEl.value?.style.setProperty("--dock-px", "-99999");
    }

    function arm() {
        const dock = dockEl.value;
        if (!dock || armed || !enabled() || coarseOrReduced()) return;
        remeasure();
        dock.addEventListener("pointermove", onPointerMove, { passive: true });
        dock.addEventListener("pointerleave", onPointerLeave, { passive: true });
        const p = port();
        ro = new ResizeObserver(() => remeasure());
        ro.observe(dock);
        if (p) ro.observe(p);
        armed = true;
    }

    onMounted(() => arm());

    onUnmounted(() => {
        const dock = dockEl.value;
        dock?.removeEventListener("pointermove", onPointerMove);
        dock?.removeEventListener("pointerleave", onPointerLeave);
        ro?.disconnect();
        cancelAnimationFrame(rafId);
    });

    return { remeasure };
}
