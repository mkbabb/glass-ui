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

    /**
     * `"layout"` — the root has actually laid out in the posture `expanded` names, so
     * its border box IS that posture's endpoint. Only a ResizeObserver callback and the
     * initial attach can claim this.
     *
     * `"flip"` — the posture ref just changed and NOTHING has re-laid out yet.
     */
    type CaptureSource = "layout" | "flip";

    function capture(source: CaptureSource = "layout"): void {
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

        /* THE PRE-MEASURE GUARD, and the endpoint poisoning it stops.
           [2026-08-24 · BK #47 W7 MORPH]

           ~~`if (expanded.value) expandedPx = rootSize; else collapsedPx = rootSize;`,
           run unconditionally including from the `watch(expanded, …)` flip~~ — the flip
           arm is REFUSED here, and it was the bug.

           On a collapsed→expanded flip the watcher fires in the same tick the ref
           changes: `expanded.value` is already `true` while the root is still laid out
           at its COLLAPSED span. The old line read that collapsed number and stored it
           as `expandedPx` — the EXPANDED endpoint seeded with the collapsed box. The
           morph then armed against it and ran to the wrong target, held there while the
           spring settled, and snapped to the real span the moment the ResizeObserver
           delivered an honest measurement. That is precisely the traced defect: the
           expand runs to 186 of 311, holds ~350ms past settle, then jumps +125px in a
           single frame at t≈657 — the largest motion defect in the component.

           A posture flip is therefore not a measurement event; it is the event a
           measurement must already have PRECEDED. The endpoints move only on `"layout"`
           captures, whose root size and posture actually agree. The flip arm still runs
           the rest of this function so a content change between morphs re-publishes the
           two custom properties — it just no longer invents one of them.

           Nothing is masked by this: the fallback path below (`chrome + fullSize`)
           reads the FULL PANE'S OWN rendered span, which is real from mount because the
           inactive pane stays laid out under `visibility`. The old flip write was
           strictly worse than the fallback it overrode. */
        if (source === "layout") {
            if (expanded.value) expandedPx = rootSize;
            else collapsedPx = rootSize;
        }

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
            // A ResizeObserver callback is by definition a post-layout event: the box
            // it reports has already been laid out at the size it reports. That is what
            // makes it — and only it — entitled to move an endpoint. Passed as a lambda
            // so the observer's `(entries, observer)` arguments cannot arrive as the
            // `source` parameter.
            observer = new ResizeObserver(() => capture("layout"));
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
    watch(expanded, () => capture("flip"));

    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (fonts) void fonts.ready.then(() => !disposed && capture("layout"));

    onScopeDispose(() => {
        disposed = true;
        observer?.disconnect();
        observer = null;
    });
}
