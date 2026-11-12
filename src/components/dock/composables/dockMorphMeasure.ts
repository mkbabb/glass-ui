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
 * CHROME, the root less its layers box. `chrome` is the posture's own, read at rest; the
 * difference is added to the pane's end margin and the root laid out again, so a
 * content-sized root grows by it while a root the host constrains or stretches does not.
 *
 * The chrome is taken against the layers box, not the pane's border box, because the
 * pane's border box is not the slot it fills. A horizontal run hands its reserve back by
 * negative margins and its trailing reserve is a box in its content, so its border box
 * exceeds its slot by a different length expanded (where the expanded posture's
 * `width: 100%` sizes its content box) than read from the collapsed posture (where its
 * content box is its max-content). The layers box is the slot in either posture.
 */
function restSize(
    root: HTMLElement,
    layers: HTMLElement,
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
            const delta = chrome - (size - getSize(layers, axis));
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
     * Pin the morph's origins so its first frame paints the boxes `first` read (a
     * collapse, which starts unscaled, holds its rest instead). The morph calls this
     * once `[data-morphing]` and the start scalar are set.
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
const PANE_SHIFT = "--dock-pane-shift";
/** Two whole-pixel reads of one box under an ancestor `zoom` differ by up to 2 px. */
const ENDPOINT_BAND_PX = 2;

/**
 * What the host constrains the dock's endpoint with, on the morph axis: the parent's
 * content box, the root's own min and max size, and the viewport. Through a morph the
 * root is held at its reserved size, so none of them moves, a parent sized by the dock
 * included; a host that resizes the dock moves at least one. It is compared between
 * morph frames only: at rest a parent sized by the dock is the posture's size.
 */
function constraintOf(root: HTMLElement, axis: Axis): string {
    const cs = getComputedStyle(root);
    const parent = root.parentElement;
    if (!parent) return "";
    // The content box: the client box less the padding, so a host that moves only its
    // padding moves the constraint too.
    const pcs = getComputedStyle(parent);
    return axis === "vertical"
        ? `${parent.clientHeight - parseFloat(pcs.paddingTop) - parseFloat(pcs.paddingBottom)} ${cs.minHeight} ${cs.maxHeight} ${window.innerHeight}`
        : `${parent.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight)} ${cs.minWidth} ${cs.maxWidth} ${window.innerWidth}`;
}

/**
 * Measure the dock's two endpoints, `--dock-expanded-px` and `--dock-collapsed-px`.
 *
 * An endpoint is the root's box at rest in its posture, laid out from the live DOM on
 * every capture (`restSize`). Nothing is latched but each posture's chrome, the root
 * less its layers box, read only from a root at rest in that posture (no `[data-morphing]`).
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
    let crossObserver: ResizeObserver | null = null;
    let mutations: MutationObserver | null = null;
    let hostStyle: MutationObserver | null = null;
    let expandedChrome: number | null = null;
    let collapsedChrome: number | null = null;
    let collapsedPx: number | null = null;
    let restEndpoint: number | null = null;
    let restConstraint = "";
    let hostMoved = false;
    let disposed = false;

    function capture(): void {
        const root = rootEl.value;
        const layers = contentEl.value;
        const full = expandedEl.value;
        const summary = collapsedEl.value;
        if (!root || !layers || !full || !summary) return;

        const a = axis.value;
        const expanded = full.classList.contains("is-active");
        // At rest the root is laid out in its own posture, so that posture's endpoint is
        // the root's box as it stands: `restSize` would set overrides that change nothing
        // and force the page through two more layouts to read the same number. A capture
        // runs on every content change in either pane (a dashboard's section label as it
        // scrolls), so only the other posture's endpoint pays for the overrides (U/B7d M1).
        const morphing = root.hasAttribute("data-morphing");
        const rootNow = morphing ? 0 : getSize(root, a);
        if (!morphing) {
            const chrome = rootNow - getSize(layers, a);
            if (expanded) expandedChrome = chrome;
            else collapsedChrome = chrome;
        }

        let expandedPx =
            !morphing && expanded
                ? rootNow
                : keepScroll(full, () =>
                      restSize(root, layers, full, summary, a, expandedChrome),
                  );
        // THE ENDPOINT A MORPH STARTS FROM HOLDS until the host moves it, and the hold
        // is keyed on the cause, not the size. At rest the reading is the endpoint. The
        // morph's first capture notes what constrains the dock (`constraintOf`), and
        // while nothing of it has moved since, a reading within the rounding band of the
        // endpoint is the same box read off another pixel phase (an ancestor `zoom` in
        // WebKit rounds the box the morph is moving 1 px either way, frame to frame), so
        // the morph keeps the endpoint and the run keeps its yield. Once the
        // host moves a constraint, by any amount, the morph takes every reading: the
        // endpoint follows it, and so does the run's yield, read from the rest port, on
        // the frame it lands, a 1-2 px host change across the fit edge included, which
        // the band alone would hold until the settle. A reading past the band with
        // no constraint moved (the pane's content changed) is taken as well.
        if (!morphing) {
            restEndpoint = expandedPx;
            restConstraint = "";
            hostMoved = false;
        } else {
            const constraint = constraintOf(root, a);
            if (!restConstraint) restConstraint = constraint;
            hostMoved ||= constraint !== restConstraint;
            if (
                !hostMoved &&
                restEndpoint !== null &&
                Math.abs(expandedPx - restEndpoint) <= ENDPOINT_BAND_PX
            ) {
                expandedPx = restEndpoint;
            }
        }
        publishYield(
            root,
            full,
            morphing && expandedPx !== restEndpoint && expandedChrome !== null && runEdge !== null
                ? expandedPx - expandedChrome - runEdge
                : undefined,
        );
        if (!expanded) {
            collapsedPx = !morphing
                ? rootNow
                : keepScroll(full, () =>
                      restSize(root, layers, summary, full, a, collapsedChrome),
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

    /*
     * WHETHER THE RUN'S SEATS FIT ITS PORT, `data-run-fits` on the root: present when
     * the seats' span along the run's scroll axis is no longer than the port. It is the
     * one source of record for "the run hides nothing", and run.css reads it twice. On a
     * horizontal run it sets `--dock-run-yield` to 1 (THE RESERVE YIELDS), so the two
     * reserve boxes shrink into the room the seats leave, down to the ring's reach. On a
     * vertical run whose seats fit it also writes `--dock-run-room-block`, half the room
     * they leave, which the run's block padding yields to. On either axis it takes the cut
     * cap's scroll-driven animations off the plate and the run (THE CAP RUNS ONLY ON A
     * RUN THAT HIDES SOMETHING), so a run whose seats all show rests round, and a run
     * whose overflow vanished while it was scrolled does not hold the keyframe its
     * inactive timeline last resolved. The span is read from the seats' layout boxes
     * (`offset*`), and neither it nor the port depends on the yield, so the flag is a
     * pure reading of the layout. It is read wherever an endpoint is, since the same
     * observers see the port and the seats change.
     *
     * IT IS THE EXPANDED RUN'S READING AT REST, in every frame. It is read only while
     * the full pane is the active one. At rest (an expand's arm, post-flush and before
     * `[data-morphing]`; at rest expanded; once more when a morph settles, `release`) the
     * port is the run's own. Through a morph the reading is held, so no seat moves when a
     * morph starts or settles, and the panes the morph moves never see the run's
     * padding change under them (a bottom-anchored dock under an ancestor `zoom` in
     * WebKit). It moves mid-morph only when the host moves the endpoint itself (a clamp,
     * a stage resize, by any amount; `capture`): then the port is the rest port
     * (`restPort`), the new endpoint less the expanded chrome and the run's edge
     * (`runEdge`, the layers box less the port), both read at rest. So the flag and the
     * room move on the frame the host's change lands, where the morph carries it, not at the
     * settle. While collapsing the full pane is out of flow, and the reading it held
     * expanded stays until the next expand re-reads it.
     */
    let yieldPublished = "";
    let runEdge: number | null = null;

    function publishYield(root: HTMLElement, run: HTMLElement, restPort?: number): void {
        if (!run.classList.contains("is-active")) return;
        const morphing = root.hasAttribute("data-morphing");
        if (morphing && restPort === undefined) return;
        const horizontal = axis.value === "horizontal";
        let start = Infinity;
        let end = -Infinity;
        for (const seat of run.children) {
            if (!(seat instanceof HTMLElement) || seat.offsetParent !== run) continue;
            const offset = horizontal ? seat.offsetLeft : seat.offsetTop;
            start = Math.min(start, offset);
            end = Math.max(end, offset + (horizontal ? seat.offsetWidth : seat.offsetHeight));
        }
        const client = horizontal ? run.clientWidth : run.clientHeight;
        const layers = contentEl.value;
        if (!morphing && layers) runEdge = getSize(layers, axis.value) - client;
        const port = restPort ?? client;
        const fits = end > start && end - start <= port;
        // The vertical reserve yields as padding (run.css THE VERTICAL RESERVE YIELDS AS
        // PADDING): half the room the seats leave in the port. The port is the run's
        // padding box, which its margins fix, so the padding this writes does not move it.
        const room = !horizontal && fits ? `${Math.floor(((port - (end - start)) / 2) * 100) / 100}px` : "";
        const value = `${fits ? "1" : "0"} ${room}`;
        if (value === yieldPublished) return;
        yieldPublished = value;
        if (room) root.style.setProperty("--dock-run-room-block", room);
        else root.style.removeProperty("--dock-run-room-block");
        root.toggleAttribute("data-run-fits", fits);
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

    /*
     * THE PLATE'S CROSS EXTENT, `--dock-plate-cross-px`: the plate's block size on a
     * horizontal dock, its inline size on a vertical one. The stadium's rest corner is
     * half of it (run.css `--dock-cap-rest`), a length, so the corner is a circle of the
     * plate's own height on every box and at every point of the cut-cap timeline. It is
     * read from the plate's layout box (`offset*`), so the morph's `scale` never reaches
     * it, from the ResizeObserver's border box, which is fractional and delivered after
     * layout and before paint, so the first painted frame already carries it and the
     * attach forces no layout inside Vue's flush. Without an observer it is read once,
     * at attach.
     */
    function publishCross(root: HTMLElement, inline: number, block: number): void {
        const px = axis.value === "vertical" ? inline : block;
        root.style.setProperty("--dock-plate-cross-px", `${px}px`);
    }

    function observeCross(root: HTMLElement): void {
        const plate = root.querySelector<HTMLElement>(":scope > .dock-plate");
        if (!plate) return;
        if (typeof ResizeObserver === "undefined") {
            publishCross(root, plate.offsetWidth, plate.offsetHeight);
            return;
        }
        crossObserver = new ResizeObserver(([entry]) => {
            const box = entry?.borderBoxSize?.[0];
            if (box) publishCross(root, box.inlineSize, box.blockSize);
        });
        crossObserver.observe(plate);
    }

    function attach(): void {
        observer?.disconnect();
        observer = null;
        crossObserver?.disconnect();
        crossObserver = null;
        mutations?.disconnect();
        mutations = null;
        hostStyle?.disconnect();
        hostStyle = null;
        yieldPublished = "";
        runEdge = null;
        restEndpoint = null;
        restConstraint = "";
        hostMoved = false;
        const root = rootEl.value;
        if (!root) return;
        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(() => capture());
            observe();
        }
        observeCross(root);
        if (typeof MutationObserver !== "undefined") {
            // A pane's content changed: re-observe its children. With an observer, the
            // re-observe IS the capture: every target's initial delivery runs after this
            // frame's layout and before its paint. A capture here, in the microtask, read a
            // layout the patch had just dirtied, so it forced one inside the scroll: the phone
            // bar's Sections cell changes on each section crossing (glass `getSize` was the top
            // self-time function of the /sci phone scroll walk, 107 ms; U/B8 PF). Without an
            // observer the microtask is the last moment before paint, so it captures.
            mutations = new MutationObserver(() => {
                observe();
                if (!observer) capture();
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
            // A host that loosens the root's own constraint mid-morph (its `style` or
            // `class`: a larger max size) resizes nothing observed, since the root is held
            // at its reserved size. The morph reads it on the record, if it moved what
            // `constraintOf` reads, a 1-2 px growth across the fit edge included.
            hostStyle = new MutationObserver(() => {
                // Once the host has moved, the morph already takes every reading, and the
                // capture's own `--dock-*-px` writes must not re-enter it.
                if (hostMoved || !restConstraint || !root.hasAttribute("data-morphing")) return;
                if (constraintOf(root, axis.value) !== restConstraint) capture();
            });
            hostStyle.observe(root, { attributes: true, attributeFilter: ["style", "class"] });
        }
        // The first capture rides the observer's initial delivery, which runs after the
        // frame's layout and before its paint, so the endpoints are on the root for the
        // first paint without a layout forced inside Vue's flush. On a dashboard every
        // figure's corner dock attaches during the scroll that brings it in, and the
        // in-flush capture was one forced layout per dock (about 80 ms on /sci phone
        // scroll, U/B7d M1; G-M1-6). Without an observer there is no later frame to wait
        // for, so the capture runs now.
        if (!observer) capture();
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
        crossObserver?.disconnect();
        crossObserver = null;
        mutations?.disconnect();
        mutations = null;
        hostStyle?.disconnect();
        hostStyle = null;
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
     * Each origin is instead the fixed point of the map from the box the morph lays out
     * (`anchor`) to a box it must paint, so every frame moves each edge linearly between
     * the box the frame before the morph painted (`first`) and its rest. In an element's
     * own coordinates, with `s` the root's scale at that box, the root's origin is
     * `(painted - laid) / (1 - s)`: the anchored edge for an edge-anchored dock, the
     * centre for a centred one, read from the layout rather than told.
     *
     * The box it must paint is the FIRST box whenever the first frame scales (an expand,
     * or any reversal). A collapse starts unscaled (`s = 1`: the reserved box is the box
     * it painted), where every origin is a fixed point, so its origins come from the END
     * box instead: the root laid out at rest in the posture it collapses to, read in the
     * same task with the reservation lifted and the scalar at its end. Either way the
     * other end is the reserved layout itself, so both ends hold.
     *
     * A persistent region (rigid, the same box in both postures) takes the origin that
     * holds its own box at that same end, so a region on the anchored side stays put and
     * one on the open side rides the moving edge, inside the plate on every frame. The
     * layers take the root's own fixed point, so the root's scale and theirs cancel and a
     * pane lays out where the reserved layout puts it; each pane is then shifted to the
     * box it paints: the leaving pane to the box it painted, at the first frame; the
     * entering pane of a collapse to its rest, at the last frame, whether the collapse
     * starts unscaled or reverses an expand mid-morph (an expand's entering pane already
     * paints its rest there, at scale 1).
     */
    let firstBoxes: FirstBoxes | null = null;
    /*
     * THE LEAVING RUN HOLDS THE SCROLL IT PAINTED, as the leaving pane holds its box.
     * Between the swap and the arm the root lays out in the new posture with no
     * reservation (the measure reads it there), so a collapsing run's port grows for one
     * forced layout and shrinks back when `[data-morphing]` reserves the box. WebKit
     * re-snaps a `mandatory` run on that return and can land it at its scroll end
     * (a coarse vertical run 20 px short of fitting: 0 to 20, every seat stepping 20 px
     * on the first frame). `first` reads the offset painted before the swap, and `anchor`,
     * the arm's last layout read, gives it back to a leaving run that moved.
     */
    let firstScroll: { left: number; top: number } | null = null;

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
        const run = expandedEl.value;
        firstScroll = run ? { left: run.scrollLeft, top: run.scrollTop } : null;
    }

    function release(): void {
        const root = rootEl.value;
        if (!root) return;
        for (const el of [root, ...rigidRegions(root), contentEl.value]) el?.style.removeProperty(ORIGIN);
        for (const pane of panes()) pane.style.removeProperty(PANE_SHIFT);
        // At a settle (the morph flag already cleared) the run is at rest again.
        if (expandedEl.value) publishYield(root, expandedEl.value);
    }

    function anchor(): void {
        const run = expandedEl.value;
        const held = firstScroll;
        firstScroll = null;
        try {
            anchorPanes();
        } finally {
            if (
                run?.classList.contains("is-leaving") &&
                held &&
                (run.scrollLeft !== held.left || run.scrollTop !== held.top)
            ) {
                run.scrollTo({ left: held.left, top: held.top, behavior: "instant" });
            }
        }
    }

    function anchorPanes(): void {
        const root = rootEl.value;
        const layers = contentEl.value;
        const boxes = firstBoxes;
        firstBoxes = null;
        release();
        if (!root || !layers || !boxes || !boxes.get(root)) return;

        const a = axis.value;
        const rigid = rigidRegions(root);
        const painted = span(root, a);
        const unscaled = [root, ...rigid, layers].map((el) => [el, "scale", "none"] as const);
        const read = () =>
            new Map([root, ...rigid, layers, ...panes()].map((el) => [el, span(el, a)] as const));
        // The laid-out boxes: the root's and the regions' morph scale lifted, in one task.
        const laid = withOverrides(unscaled, read);
        const box = laid.get(root)!;
        const local = getSize(root, a);
        // Viewport px per root-local px (an ancestor's transform).
        const k = box.size / local;
        if (!(k > 0)) return;
        const unit = (s: number) => Math.abs(1 - s) < 1e-4;

        // The rest boxes, read for every collapse (its entering pane is shifted to its
        // rest, from an unscaled start and from a reversal alike) and for any unscaled
        // start, whose origins hold them. The DOM is the posture's: a collapse is the
        // full pane no longer active.
        let s = painted.size / box.size;
        const collapsing = !expandedEl.value?.classList.contains("is-active");
        const end =
            collapsing || unit(s)
                ? withOverrides(
                      [
                          ...unscaled,
                          [root, "--dock-expanded-px", "initial"],
                          [root, "--dock-morph-t", "1"],
                      ],
                      read,
                  )
                : null;
        // The end the origins hold: the first boxes, or for an unscaled start the rest.
        let target: Map<Element, Span> = boxes;
        if (end && unit(s)) {
            target = end;
            s = end.get(root)!.size / box.size;
        }
        if (!Number.isFinite(s)) return;

        const toLocal = (viewport: number) => (viewport - box.start) / k;
        const fixedPoint = (to: number, from: number) => (unit(s) ? null : (to - from) / (1 - s));
        const centre = (b: Span) => toLocal(b.start + b.size / 2);
        // The root's origin, root-local; a no-op scale takes any (the centre).
        const origin = fixedPoint(toLocal(target.get(root)!.start), 0) ?? local / 2;
        const percent = (px: number, size: number) => `${(px / size) * 100}%`;
        root.style.setProperty(ORIGIN, percent(origin, local));

        for (const region of rigid) {
            const to = target.get(region);
            const now = laid.get(region)!;
            const size = getSize(region, a);
            if (!to || !(size > 0)) continue;
            // The origin that holds the region's centre at its target box at scale `s`
            // (the region is rigid, so its centre is its box; a glyph floor that sizes it
            // differently per posture splits the difference evenly).
            const held = fixedPoint(centre(to), centre(now));
            region.style.setProperty(
                ORIGIN,
                percent((held === null ? origin : origin - held) - toLocal(now.start), size),
            );
        }

        const layersSize = getSize(layers, a);
        if (layersSize > 0) {
            layers.style.setProperty(
                ORIGIN,
                percent(origin - toLocal(laid.get(layers)!.start), layersSize),
            );
        }

        // Each pane is shifted so that it paints its box at the end of the morph where it
        // is opaque. The leaving pane is opaque at the first frame, where it paints its
        // laid box, since the origins were just derived from that layout. The entering pane
        // of a collapse is opaque at the last frame, so its shift is read there: the pane
        // painted at the end scalar, with the origins now written. Its laid box is not used,
        // because the root's padding interpolates on the scalar and moves the layers
        // under their origin, so a pane's laid box at the start is not where it paints at
        // the end. The shift is written as a percentage of the pane's own box, as every
        // origin is: a `px` length is not zoom-neutral. Under an ancestor CSS `zoom`,
        // WebKit zooms a registered `<length>` custom property where it computes and
        // again where `translate` uses it, so the pane moved `k` times its shift (critique-7
        // D-1). A percentage resolves against the pane's laid box, which carries the zoom
        // once, in every engine.
        for (const pane of panes()) {
            const leaving = pane.classList.contains("is-leaving");
            const to = leaving ? boxes.get(pane) : end?.get(pane);
            const size = getSize(pane, a);
            if (!to || !(size > 0)) continue;
            const now = leaving
                ? laid.get(pane)
                : withOverrides([[root, "--dock-morph-t", "1"]], () => span(pane, a));
            if (!now) continue;
            pane.style.setProperty(PANE_SHIFT, percent((to.start - now.start) / k, size));
        }
    }

    return { measure: capture, first, anchor, release };
}
