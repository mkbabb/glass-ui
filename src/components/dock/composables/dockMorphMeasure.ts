import { onScopeDispose, watch, type Ref } from "vue";

type Axis = "horizontal" | "vertical";

function getSize(el: HTMLElement, axis: Axis): number {
    // Endpoints are layout border boxes. `getBoundingClientRect()` includes the dock's
    // live scale and can expose one stale transformed frame as the morph flag clears.
    return axis === "vertical" ? el.offsetHeight : el.offsetWidth;
}

type Override = readonly [el: HTMLElement, property: string, value: string];

/**
 * Set `overrides` inline, run `read`, restore them. Set, read and restore run in one
 * task, so no frame paints the overridden layout. A property is set `!important` so it
 * beats the stylesheet, except a custom property, which only this module sets inline:
 * WebKit replaces neither an `!important` inline custom property on restore nor the
 * plain one published after it, so the measure's own `--dock-expanded-px` stayed
 * `initial`.
 */
function withOverrides<T>(overrides: readonly Override[], read: () => T): T {
    const saved = overrides.map(
        ([el, property]) =>
            [
                el,
                property,
                el.style.getPropertyValue(property),
                el.style.getPropertyPriority(property),
            ] as const,
    );
    for (const [el, property, value] of overrides) {
        el.style.setProperty(property, value, property.startsWith("--") ? "" : "important");
    }
    try {
        return read();
    } finally {
        for (const [el, property, value, priority] of saved.reverse()) {
            if (value) el.style.setProperty(property, value, priority);
            else el.style.removeProperty(property);
        }
    }
}

/**
 * Run `measure` and give the run back its scroll position. A forced layout that resizes
 * a scroll container clamps its scroll offset in WebKit, which keeps the clamped value
 * after the box is restored, so a scrolled run would jump to its leading edge.
 */
function keepScroll<T>(scroller: HTMLElement, measure: () => T): T {
    const left = scroller.scrollLeft;
    const top = scroller.scrollTop;
    try {
        return measure();
    } finally {
        if (scroller.scrollLeft !== left || scroller.scrollTop !== top) {
            scroller.scrollTo({ left, top, behavior: "instant" });
        }
    }
}

/**
 * The root's box at rest in one posture, read now, in any posture and mid-morph.
 *
 * The root is laid out with the posture's pane in flow and the other pane out of flow,
 * as each posture's own CSS places them (`.dock-layer.is-active` / `:not(.is-active)`),
 * and with the morph's reservation lifted (`--dock-expanded-px` made invalid, so the
 * `[data-morphing]` size rule computes to `auto`). Whatever constrains or stretches the
 * root (the host, a consumer width) applies to it as it would at rest.
 *
 * Two things the current DOM may still carry are not that posture's: the root's padding,
 * which interpolates on `--dock-expand-t` mid-morph, and the rules gated on the posture
 * class (`.collapsed`) when the other posture is the one being read. Both sit in the
 * CHROME, the root less its pane. `chrome` is the posture's own, read at rest; the
 * difference is added to the pane's end margin and the root laid out again, so a
 * content-sized root grows by it while a root the host constrains or stretches does not.
 */
function restSize(
    root: HTMLElement,
    pane: HTMLElement,
    other: HTMLElement,
    axis: Axis,
    chrome: number | null,
): number {
    const margin = axis === "vertical" ? "margin-block-end" : "margin-inline-end";
    return withOverrides(
        [
            [root, "--dock-expanded-px", "initial"],
            [pane, "position", "relative"],
            [pane, "inset", "auto"],
            [other, "position", "absolute"],
        ],
        () => {
            const size = getSize(root, axis);
            if (chrome === null) return size;
            const delta = chrome - (size - getSize(pane, axis));
            if (Math.abs(delta) < 0.5) return size;
            const base = Number.parseFloat(getComputedStyle(pane).getPropertyValue(margin)) || 0;
            return withOverrides([[pane, margin, `${base + delta}px`]], () => getSize(root, axis));
        },
    );
}

export interface UseDockExpandedSizeOptions {
    rootEl: Ref<HTMLElement | null>;
    contentEl: Ref<HTMLElement | null>;
    expandedEl: Ref<HTMLElement | null>;
    collapsedEl: Ref<HTMLElement | null>;
    axis: Ref<Axis>;
}

export interface UseDockExpandedSizeReturn {
    /**
     * Measure the endpoints now. The morph calls this when it arms, after the posture's
     * DOM is patched and before `[data-morphing]` reserves one.
     */
    measure: () => void;
    /**
     * Read the painted boxes the morph starts from: the root, each persistent region and
     * both panes. The morph calls this before the posture's DOM is patched.
     */
    first: () => void;
    /**
     * Pin the morph's origins so its first frame paints the boxes `first` read. The
     * morph calls this once `[data-morphing]` and the start scalar are set.
     */
    anchor: () => void;
    /** Clear the origins `anchor` wrote. The morph calls this when it settles. */
    release: () => void;
}

type Span = { start: number; size: number };

function span(el: Element, axis: Axis): Span {
    const r = el.getBoundingClientRect();
    return axis === "vertical" ? { start: r.top, size: r.height } : { start: r.left, size: r.width };
}

/** The boxes `first` reads, keyed by element: what the frame before the morph painted. */
type FirstBoxes = Map<Element, Span>;

const ORIGIN = "--dock-morph-origin";
const LEAVE_SHIFT = "--dock-leave-shift";

/**
 * Measure the dock's two endpoints, `--dock-expanded-px` and `--dock-collapsed-px`.
 *
 * An endpoint is the root's box at rest in its posture, laid out from the live DOM on
 * every capture (`restSize`). Nothing is latched but each posture's chrome, the root
 * less its pane, read only from a root at rest in that posture (no `[data-morphing]`).
 * The chrome holds padding, border, gaps and the persistent regions, none of which
 * depends on the host. So an endpoint follows the pane and the host in every posture and
 * through a morph (O-101, O-101a).
 *
 * The expanded endpoint is read in both postures, since a morph reserves it in both
 * directions. The collapsed endpoint is read while the dock is collapsed, where its pane
 * lays out; while expanded it keeps the last value, which the next collapse re-reads
 * when it arms. The posture is the DOM's (the full pane's `.is-active`), never the
 * posture ref, which flips before the DOM is patched: no endpoint can be read from a
 * box laid out in the other posture (the W7 MORPH guard, BK #47).
 *
 * The capture runs when the morph arms (`measure`), on a ResizeObserver hit on the root,
 * its parent (the host constraint), the layers, both panes or any pane's direct child,
 * on a MutationObserver record in either pane, on a window resize (in the resize step,
 * before the frame's layout), and once fonts are ready.
 */
export function useDockExpandedSize(
    options: UseDockExpandedSizeOptions,
): UseDockExpandedSizeReturn {
    const { rootEl, contentEl, expandedEl, collapsedEl, axis } = options;
    let observer: ResizeObserver | null = null;
    let mutations: MutationObserver | null = null;
    let expandedChrome: number | null = null;
    let collapsedChrome: number | null = null;
    let collapsedPx: number | null = null;
    let disposed = false;

    function capture(): void {
        const root = rootEl.value;
        const full = expandedEl.value;
        const summary = collapsedEl.value;
        if (!root || !contentEl.value || !full || !summary) return;

        const a = axis.value;
        const expanded = full.classList.contains("is-active");
        if (!root.hasAttribute("data-morphing")) {
            const chrome = getSize(root, a) - getSize(expanded ? full : summary, a);
            if (expanded) expandedChrome = chrome;
            else collapsedChrome = chrome;
        }

        const expandedPx = keepScroll(full, () =>
            restSize(root, full, summary, a, expandedChrome),
        );
        if (!expanded) {
            collapsedPx = keepScroll(full, () =>
                restSize(root, summary, full, a, collapsedChrome),
            );
        }
        if (expandedPx <= 0) return;

        if (collapsedPx !== null && collapsedPx > 0) {
            root.style.setProperty("--dock-collapsed-px", `${collapsedPx}px`);
        }
        root.style.setProperty(
            "--dock-expanded-px",
            `${Math.max(expandedPx, collapsedPx ?? 0)}px`,
        );
    }

    /**
     * Observe the boxes an endpoint depends on. A pane stretched over the root does not
     * resize when its content does, so its children are observed too, and re-observed
     * whenever the pane's child list changes. The root's parent is observed because a
     * morphing root is held at its reserved size, so a host that resizes under it
     * resizes nothing else observed.
     */
    function observe(): void {
        if (!observer) return;
        observer.disconnect();
        const panes = [expandedEl.value, collapsedEl.value];
        const root = rootEl.value;
        for (const el of [root, root?.parentElement, contentEl.value, ...panes]) {
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
        if (!rootEl.value) return;
        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(() => capture());
            observe();
        }
        if (typeof MutationObserver !== "undefined") {
            // A pane's content changed: the patch is complete when this microtask runs,
            // before the frame lays out or paints.
            mutations = new MutationObserver(() => {
                observe();
                capture();
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

    const onResize = () => capture();
    if (typeof window !== "undefined") window.addEventListener("resize", onResize);

    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (fonts) void fonts.ready.then(() => !disposed && capture());

    onScopeDispose(() => {
        disposed = true;
        observer?.disconnect();
        observer = null;
        mutations?.disconnect();
        mutations = null;
        if (typeof window !== "undefined") window.removeEventListener("resize", onResize);
    });

    /*
     * THE MORPH'S ORIGINS (value.js O-110). The morph reserves the expanded box from its
     * first frame and paints the visible box with `scale` about the root's
     * `transform-origin`; the persistent regions and the layers carry the inverse scale
     * about their own. A fixed `center` origin is right only for a dock centred on its
     * host: an edge-anchored dock (a box pinned to its host's right edge by `right` alone,
     * whose width is the dock's) reserves the expanded box leftward from that edge, and
     * its first frame painted the collapsed box centred in it, its controls centred with
     * it. A seat under the pointer moved between pointerdown and pointerup, and the click
     * went to their common ancestor (fourier /v at 390: "Edit contour" x 317 -> 215).
     *
     * Each origin is instead the fixed point of the map from the box the frame before the
     * morph painted (`first`) to the box the morph lays out (`anchor`), so the first
     * frame paints exactly what was painted and every later frame moves each edge
     * linearly to its rest. In an element's own coordinates, with `s` the root's scale at
     * the start scalar, the root's origin is `(first - laid) / (1 - s)`: the anchored
     * edge for an edge-anchored dock, the centre for a centred one, read from the layout
     * rather than told. A persistent region (rigid, the same box in both postures) takes
     * the origin that holds its own first box, so a region on the anchored side stays put
     * and one on the open side rides the growing edge. The layers take the root's own
     * fixed point, so the root's scale and theirs cancel and the pane lays out where it
     * rests, inside the reserved box; the leaving pane is shifted back to the box it
     * painted and fades there.
     */
    let firstBoxes: FirstBoxes | null = null;

    function rigidRegions(root: HTMLElement): HTMLElement[] {
        return [...root.querySelectorAll<HTMLElement>(":scope > .dock-controls > .dock-persistent")];
    }

    function panes(): HTMLElement[] {
        return [expandedEl.value, collapsedEl.value].filter((el): el is HTMLElement => !!el);
    }

    function first(): void {
        const root = rootEl.value;
        if (!root) return;
        const a = axis.value;
        firstBoxes = new Map(
            [root, ...rigidRegions(root), ...panes()].map((el) => [el, span(el, a)] as const),
        );
    }

    function release(): void {
        const root = rootEl.value;
        if (!root) return;
        for (const el of [root, ...rigidRegions(root), contentEl.value]) el?.style.removeProperty(ORIGIN);
        for (const pane of panes()) pane.style.removeProperty(LEAVE_SHIFT);
    }

    function anchor(): void {
        const root = rootEl.value;
        const layers = contentEl.value;
        const boxes = firstBoxes;
        firstBoxes = null;
        release();
        if (!root || !layers || !boxes) return;
        const before = boxes.get(root);
        if (!before) return;

        const a = axis.value;
        const rigid = rigidRegions(root);
        const painted = span(root, a);
        // The laid-out boxes: the root's and the regions' morph scale lifted, in one task.
        const laid = withOverrides(
            [root, ...rigid, layers].map((el) => [el, "scale", "none"] as const),
            () =>
                new Map([root, ...rigid, layers, ...panes()].map((el) => [el, span(el, a)] as const)),
        );
        const box = laid.get(root)!;
        const local = getSize(root, a);
        // Viewport px per root-local px (an ancestor's transform), and the root's scale.
        const k = box.size / local;
        const s = painted.size / box.size;
        if (!(k > 0) || !Number.isFinite(s)) return;

        const toLocal = (viewport: number) => (viewport - box.start) / k;
        const fixedPoint = (from: number, to: number) =>
            Math.abs(1 - s) < 1e-4 ? null : (from - to) / (1 - s);
        // The root's origin, root-local; a no-op scale takes any (the centre).
        const origin = fixedPoint(toLocal(before.start), 0) ?? local / 2;
        const percent = (px: number, size: number) => `${(px / size) * 100}%`;
        root.style.setProperty(ORIGIN, percent(origin, local));

        for (const region of rigid) {
            const was = boxes.get(region);
            const now = laid.get(region)!;
            const size = getSize(region, a);
            if (!was || !(size > 0)) continue;
            const start = toLocal(now.start);
            // The origin that holds the region's centre at its first box at scale `s`
            // (the region is rigid, so its centre is its box; a glyph floor that sizes it
            // differently per posture splits the difference evenly).
            const held = fixedPoint(
                toLocal(was.start + was.size / 2),
                toLocal(now.start + now.size / 2),
            );
            region.style.setProperty(
                ORIGIN,
                percent((held === null ? origin : origin - held) - start, size),
            );
        }

        const layersSize = getSize(layers, a);
        if (layersSize > 0) {
            layers.style.setProperty(
                ORIGIN,
                percent(origin - toLocal(laid.get(layers)!.start), layersSize),
            );
        }

        for (const pane of panes()) {
            const was = boxes.get(pane);
            const now = laid.get(pane);
            if (!was || !now || !pane.classList.contains("is-leaving")) continue;
            pane.style.setProperty(LEAVE_SHIFT, `${(was.start - now.start) / k}px`);
        }
    }

    return { measure: capture, first, anchor, release };
}
