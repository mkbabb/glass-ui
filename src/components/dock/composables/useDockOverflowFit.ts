import { onMounted, onUnmounted, watch, type Ref } from "vue";

/**
 * useDockOverflowFit — the fits-vs-scrollable mode resolution for the dock's native
 * scroll track (BI.W-DOCK-OVERFLOW, PASS-1 §2.5). A MEASURED branch (the wave's "single
 * container-query / measured branch"): it toggles `[data-dock-overflow]` on the dock root
 * when the active full layer's over-cap inline content exceeds its clamped port width.
 * The overflow.css scroll track + FadingScroll edge mask engage ONLY under that attr, so
 * at rest (fits) the mask is `none` (T-52 a — no 0px-fade shave) and the fisheye is FREE
 * (fisheye.css gates on `:not([data-dock-overflow])`, the exclusive-mode ruling).
 *
 * G9 / O5 — ZERO SCROLL LISTENER. The measure is RESIZE- and CONTENT-driven (a
 * `ResizeObserver` on the dock + the port, plus a `MutationObserver` on the port's
 * content). It never listens to `scroll` — the traveling indicator (`useSelectionIndicator`)
 * lives inside the scroll port and travels WITH scroll in content coordinates, needing no
 * scroll listener; this fit measure adds none either.
 *
 * The scroll port is discovered from the dock root (`.dock-layer--full`) so the composable
 * needs only the dock element — no extra template ref threads through GlassDock.
 */
export function useDockOverflowFit(dockEl: Ref<HTMLElement | null>) {
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;
    let rafId = 0;

    function port(): HTMLElement | null {
        return dockEl.value?.querySelector<HTMLElement>(".dock-layer--full") ?? null;
    }

    function measure() {
        const dock = dockEl.value;
        const p = port();
        if (!dock || !p) return;
        // Inline overflow: the port's over-cap content exceeds its clamped client box.
        // > 1 (not > 0) tolerates sub-pixel rounding so a flush-fitting row never flickers
        // the attr on/off (which would thrash the mask + fisheye gate).
        const overflow = p.scrollWidth - p.clientWidth > 1;
        dock.toggleAttribute("data-dock-overflow", overflow);
    }

    function scheduleMeasure() {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(measure);
    }

    onMounted(() => {
        const dock = dockEl.value;
        const p = port();
        scheduleMeasure();
        if (dock) {
            ro = new ResizeObserver(scheduleMeasure);
            ro.observe(dock);
            if (p) ro.observe(p);
        }
        // A content change (items added/removed) can change scrollWidth without resizing
        // the capped port box, so the RO alone would miss it — a light MutationObserver on
        // the port catches it. Still ZERO scroll listener.
        if (p) {
            mo = new MutationObserver(scheduleMeasure);
            mo.observe(p, { childList: true, subtree: true, characterData: true });
        }
    });

    // Re-measure when the port element itself swaps in (a collapsed→expanded flip mounts
    // the full layer). The dock RO catches box changes; this catches the port appearing.
    watch(
        () => dockEl.value,
        () => scheduleMeasure(),
    );

    onUnmounted(() => {
        ro?.disconnect();
        mo?.disconnect();
        cancelAnimationFrame(rafId);
    });

    return { measure };
}
