import { onScopeDispose, watch, type Ref } from "vue";

function getSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
    // Endpoints are layout border boxes. `getBoundingClientRect()` includes the dock's
    // live scale and can expose one stale transformed frame as the morph flag clears.
    return axis === "vertical" ? el.offsetHeight : el.offsetWidth;
}

export interface UseDockExpandedSizeOptions {
    rootEl: Ref<HTMLElement | null>;
    contentEl: Ref<HTMLElement | null>;
    expandedEl: Ref<HTMLElement | null>;
    collapsedEl: Ref<HTMLElement | null>;
    axis: Ref<"horizontal" | "vertical">;
    expanded: Ref<boolean>;
}

/**
 * Measure the dock's two rendered pane compositions. The inactive pane remains
 * laid out (visibility, never display, hides it), so the first morph can derive
 * both endpoints from real content—coarse controls bring their own 44px floor;
 * non-interactive visuals receive no invented one.
 */
export function useDockExpandedSize(options: UseDockExpandedSizeOptions): void {
    const { rootEl, contentEl, expandedEl, collapsedEl, axis, expanded } = options;
    let observer: ResizeObserver | null = null;
    let expandedPx = 0;
    let collapsedPx = 0;
    let disposed = false;

    function capture(): void {
        const root = rootEl.value;
        const content = contentEl.value;
        const full = expandedEl.value;
        const summary = collapsedEl.value;
        if (!root || !content || !full || !summary) return;

        // A transformed, mid-flip root is not an endpoint. Preserve the two settled
        // measurements until the spring clears its morph flag; the root observer then
        // captures the newly seated posture.
        if (root.hasAttribute("data-morphing")) return;

        const a = axis.value;
        const rootSize = getSize(root, a);
        const fullSize = getSize(full, a);
        const summarySize = getSize(summary, a);
        if (rootSize <= 0 || fullSize < 0 || summarySize < 0) return;

        if (expanded.value) expandedPx = rootSize;
        else collapsedPx = rootSize;

        // Everything outside the active pane—persistent controls, gaps and chrome—
        // stays in the composition. Swap only the measured pane span.
        const activeSize = expanded.value ? fullSize : summarySize;
        const chrome = Math.max(0, rootSize - activeSize);
        const expandedEndpoint = expandedPx || chrome + fullSize;
        const collapsedEndpoint = collapsedPx || chrome + summarySize;
        if (expandedEndpoint <= 0 || collapsedEndpoint <= 0) return;

        root.style.setProperty("--dock-collapsed-px", `${collapsedEndpoint}px`);
        root.style.setProperty(
            "--dock-expanded-px",
            `${Math.max(expandedEndpoint, collapsedEndpoint)}px`,
        );
    }

    function attach(): void {
        observer?.disconnect();
        observer = null;
        const root = rootEl.value;
        if (!root) return;
        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(capture);
            for (const el of [
                root,
                contentEl.value,
                expandedEl.value,
                collapsedEl.value,
            ]) {
                if (el) observer.observe(el);
            }
        }
        capture();
    }

    watch([rootEl, contentEl, expandedEl, collapsedEl, axis], attach, {
        immediate: true,
    });
    watch(expanded, capture);

    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (fonts) void fonts.ready.then(() => !disposed && capture());

    onScopeDispose(() => {
        disposed = true;
        observer?.disconnect();
        observer = null;
    });
}
