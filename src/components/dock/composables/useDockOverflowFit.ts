import { onMounted, onUnmounted, watch, type Ref } from "vue";

/**
 * useDockOverflowFit resolves fits-vs-scrollable mode for the dock's native scroll
 * track. It toggles `[data-dock-overflow]` on the dock root
 * when content exceeds the horizontal full-layer port or vertical root scroll host.
 * The overflow.css scroll track + FadingScroll edge mask engage ONLY under that attr, so
 * at rest (fits) the mask is `none`.
 *
 * The measure is resize- and content-driven, with no scroll listener (a
 * `ResizeObserver` on the dock + the port, plus a narrowly filtered `MutationObserver`
 * on dock content). It never listens to `scroll` — the traveling indicator (`useSelectionIndicator`)
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
        // A horizontal dock scrolls its full layer; a vertical dock scrolls the root.
        // Measure the actual scroll host on the dock's layout axis.
        const vertical = dock.classList.contains("vertical");
        const scrollHost = vertical ? dock : p;
        // > 1 (not > 0) tolerates sub-pixel rounding so a flush-fitting row never flickers
        // the attr on/off (which would thrash the mask).
        const overflow = vertical
            ? scrollHost.scrollHeight - scrollHost.clientHeight > 1
            : scrollHost.scrollWidth - scrollHost.clientWidth > 1;
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
        // Content can alter the scroll extent without resizing the capped host, so the RO
        // alone would miss it. Observe structural/text changes plus the two semantic
        // attributes that commonly change geometry; inline style stays excluded because
        // motion writers update it per frame. Still ZERO scroll listener.
        if (dock) {
            mo = new MutationObserver(scheduleMeasure);
            mo.observe(dock, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true,
                attributeFilter: ["class", "hidden"],
            });
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
