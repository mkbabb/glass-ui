import { onScopeDispose, watch, type Ref } from "vue";

function getSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
    // Endpoints are layout border boxes. `getBoundingClientRect()` includes the dock's
    // live scale and can expose one stale transformed frame as the morph flag clears.
    return axis === "vertical" ? el.offsetHeight : el.offsetWidth;
}

/**
 * A pane's natural span on the morph axis: its border box laid out at `max-content`.
 * The pane's own box is not it. The inactive pane is absolutely positioned over the
 * root (`inset: 0`), and the expanded full pane fills the box (`width: 100%`), so both
 * report the box they stretch to, not the content they hold. The size is set inline,
 * read, and restored in the same task: no frame paints it, and no computed value a
 * transition watches (a seat's own `inline-size`) changes.
 */
function naturalSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
    const property = axis === "vertical" ? "block-size" : "inline-size";
    const value = el.style.getPropertyValue(property);
    const priority = el.style.getPropertyPriority(property);
    el.style.setProperty(property, "max-content", "important");
    const size = getSize(el, axis);
    if (value) el.style.setProperty(property, value, priority);
    else el.style.removeProperty(property);
    return size;
}

export interface UseDockExpandedSizeOptions {
    rootEl: Ref<HTMLElement | null>;
    contentEl: Ref<HTMLElement | null>;
    expandedEl: Ref<HTMLElement | null>;
    collapsedEl: Ref<HTMLElement | null>;
    axis: Ref<"horizontal" | "vertical">;
    expanded: Ref<boolean>;
}

export interface UseDockExpandedSizeReturn {
    /**
     * Measure both endpoints now. The morph calls this when it arms, after the posture's
     * DOM is patched: with no morph in flight the root is read as the settled box of the
     * posture it opens onto; with one in flight (a reversal) both endpoints re-base on
     * the panes' live spans (O-101).
     */
    measure: () => void;
}

/**
 * Measure the dock's two endpoints from its two rendered pane compositions. The
 * inactive pane remains laid out (visibility, never display, hides it), so either
 * endpoint can be derived from real content in either posture—coarse controls bring
 * their own 44px floor; non-interactive visuals receive no invented one.
 *
 * Each endpoint is a posture's FRAME (the root's box less its active pane's natural
 * span: padding, border, gaps, persistent regions, any host slack) plus that pane's
 * live natural span. A frame is taken only from a root laid out at rest in its
 * posture; the spans are read on every capture. So an endpoint follows its pane in
 * every posture and through a morph, and is never a box latched before the pane
 * changed (O-101).
 */
export function useDockExpandedSize(
    options: UseDockExpandedSizeOptions,
): UseDockExpandedSizeReturn {
    const { rootEl, contentEl, expandedEl, collapsedEl, axis, expanded } = options;
    let observer: ResizeObserver | null = null;
    let mutations: MutationObserver | null = null;
    let expandedFrame: number | null = null;
    let collapsedFrame: number | null = null;
    let disposed = false;

    /**
     * `"layout"` — the DOM is patched to the posture `expanded` names, so reading the
     * root lays it out in that posture: with no `[data-morphing]` on it, its border box
     * IS that posture's endpoint and its frame is taken. Only a ResizeObserver callback,
     * a pane mutation (a microtask after the patch), the initial attach and the morph's
     * arm (`measure`) can claim this.
     *
     * `"flip"` — the posture ref just changed and NOTHING has re-laid out yet. It takes
     * no frame; it only re-publishes from the frames already taken.
     */
    type CaptureSource = "layout" | "flip";

    function capture(source: CaptureSource = "layout"): void {
        const root = rootEl.value;
        const content = contentEl.value;
        const full = expandedEl.value;
        const summary = collapsedEl.value;
        if (!root || !content || !full || !summary) return;

        // A morphing root reserves an endpoint (`[data-morphing]` sets its size) and is
        // not one, so it gives no frame. Its panes still lay out at their natural span,
        // so both endpoints re-base on them below: a pane that changes mid-morph
        // retargets the reserved box rather than leaving it.
        const settled = source === "layout" && !root.hasAttribute("data-morphing");

        const a = axis.value;
        const rootSize = getSize(root, a);
        const fullSize = naturalSize(full, a);
        const summarySize = naturalSize(summary, a);
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
           measurement must already have PRECEDED. A frame is taken only by a settled
           `"layout"` capture, whose root size and posture actually agree. The flip arm
           still runs the rest of this function and re-publishes the two custom
           properties — it just no longer invents one of them.

           Nothing is masked by this: the re-base below (frame + the full pane's
           natural span) reads the FULL PANE'S OWN laid-out span, which is real from
           mount because the inactive pane stays laid out under `visibility`.

           [2026-10-21 · 10.1.2 · O-101 DOCK-STALE-EXPANDED-ENDPOINT] ~~The expanded
           endpoint is latched by a `"layout"` capture taken while expanded, and that
           latch is what every later expand reserves.~~ A latch outlives the content
           it measured: a consumer breakpoint that changed the full pane while the dock
           was collapsed left `--dock-expanded-px` at the old pane's span, and the next
           expand reserved it (value.js: 508px reserved at a 390px viewport, the
           document scrolling for ~380 frames, then a snap to 188). The breakpoint
           often expands the dock in the same render, so the morph arms before any
           collapsed re-layout reaches the ResizeObserver; no capture before the arm
           sees the new pane.

           ~~So the expand measures its own endpoint at the arm, and the latch stands
           otherwise.~~ [10.1.2 round 1] The arm-time read cured only a pane that
           changed at rest. A pane that changed mid-morph kept the latch: the capture
           returned early under `[data-morphing]`, and the reversal's arm runs under
           it too, so 1440→390 reserved 592 for a 160 box for ~60 frames, the
           document scrolling sideways, then a snap at settle.

           So no endpoint is latched. A settled `"layout"` capture takes its posture's
           FRAME, the root's box less the active pane's natural span; every capture,
           collapsed, expanded, mid-morph or flip, publishes frame + live span for
           both postures. The ResizeObserver and a MutationObserver on the panes run
           it whenever the content changes, so the endpoint follows the pane in every
           posture. The W7 guard stands: a `"flip"` capture takes no frame, so it can
           never seed one posture's endpoint with the other's box. */
        if (settled) {
            if (expanded.value) expandedFrame = rootSize - fullSize;
            else collapsedFrame = rootSize - summarySize;
        }

        // Before a posture has settled once, its frame is the other posture's: the
        // chrome around the panes is shared, and the first arm in that posture reads
        // the settled box before it reserves anything.
        const eFrame = expandedFrame ?? collapsedFrame;
        const cFrame = collapsedFrame ?? expandedFrame;
        if (eFrame === null || cFrame === null) return;
        const expandedEndpoint = eFrame + fullSize;
        const collapsedEndpoint = cFrame + summarySize;
        if (expandedEndpoint <= 0 || collapsedEndpoint <= 0) return;

        root.style.setProperty("--dock-collapsed-px", `${collapsedEndpoint}px`);
        root.style.setProperty(
            "--dock-expanded-px",
            `${Math.max(expandedEndpoint, collapsedEndpoint)}px`,
        );
    }

    /**
     * Observe the boxes whose size an endpoint depends on: the root, the layers, both
     * panes and every pane's direct child. A pane stretched over the root does not
     * resize when its content does, so its children are observed too, and re-observed
     * whenever the pane's child list changes.
     */
    function observe(): void {
        if (!observer) return;
        observer.disconnect();
        const panes = [expandedEl.value, collapsedEl.value];
        for (const el of [rootEl.value, contentEl.value, ...panes]) {
            if (el) observer.observe(el);
        }
        for (const pane of panes) {
            for (const child of pane?.children ?? []) observer.observe(child);
        }
    }

    function attach(): void {
        observer?.disconnect();
        observer = null;
        mutations?.disconnect();
        mutations = null;
        const root = rootEl.value;
        if (!root) return;
        if (typeof ResizeObserver !== "undefined") {
            // A ResizeObserver callback is by definition a post-layout event: the box
            // it reports has already been laid out at the size it reports. Passed as a
            // lambda so the observer's `(entries, observer)` arguments cannot arrive as
            // the `source` parameter.
            observer = new ResizeObserver(() => capture("layout"));
            observe();
        }
        if (typeof MutationObserver !== "undefined") {
            // A pane's content changed: the patch that changed it is complete when this
            // microtask runs, before the frame lays out or paints, so the endpoint the
            // frame reserves is already the new pane's.
            mutations = new MutationObserver(() => {
                observe();
                capture("layout");
            });
            for (const pane of [expandedEl.value, collapsedEl.value]) {
                if (pane) {
                    mutations.observe(pane, {
                        childList: true,
                        subtree: true,
                        characterData: true,
                    });
                }
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
        mutations?.disconnect();
        mutations = null;
    });

    return { measure: () => capture("layout") };
}
