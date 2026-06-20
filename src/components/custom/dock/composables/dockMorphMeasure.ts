import type { Ref } from "vue";

/**
 * BB.W-CARVE4 — the dock morph MEASURE/SEAT helpers, carved out of
 * `dockMorphContext.ts` to hold the no-god-module bound (the aurora→useAurora /
 * goo-blob→useMetaballRenderer / fourier-field→useFourierField colocation pattern).
 * The orchestrator stays the morph DRIVER (it owns the `SpringProgress`, the targets
 * Set, the per-frame `--dock-morph-t` write); these are the PURE geometry + the
 * reserved-footprint measure + the SYNCHRONOUS PRM seat it composes. `DOCK_SPRING` is
 * byte-fenced — it lives in `../constants`, never touched here.
 *
 * The functions take their element/axis/target dependencies as explicit params (the
 * orchestrator's closures collapse onto this seam) — no module-level state, so the
 * extraction is behaviour-identical to the prior inline closures.
 */

/** The minimal morph-target shape the measure/seat helpers read (the orchestrator's
 *  full `MorphTarget` structurally satisfies it). */
export interface MorphMeasureTarget {
    containerEl: Ref<HTMLElement | null>;
    axis: Ref<"horizontal" | "vertical">;
    /** PER-TARGET swap generation — the seat gates its pipeline on its own id. */
    txId: number;
}

export function dimOf(axis: "horizontal" | "vertical"): "width" | "height" {
    return axis === "vertical" ? "height" : "width";
}
export function morphAxisProp(
    axis: "horizontal" | "vertical",
): "inline-size" | "block-size" {
    return dimOf(axis) === "width" ? "inline-size" : "block-size";
}
export function getSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
    return el.getBoundingClientRect()[dimOf(axis)];
}

export function clearMorphVars(el: HTMLElement): void {
    el.style.removeProperty("--dock-morph-from");
    el.style.removeProperty("--dock-morph-to");
}

/**
 * BC.W-LIQUID-MORPH (M3) — the reserve-floor in px (the measure-failure floor). The
 * CSS reserve floors the box at `max(var(--dock-morph-to), var(--dock-morph-min))`
 * (layers.css), but the SCALAR ratio still runs toward `--dock-morph-to`, so a
 * `to:0` mis-measure would interpolate toward a degenerate target. The orchestrator's
 * measure-failure guard seats the measured `to` at THIS px so the morph interpolates
 * toward a visible footprint, never 0 — "visible at the floor," never "white." Reads
 * the element's RESOLVED `--dock-morph-min` (density-scaled), falling back to the WCAG
 * ~44px touch floor when the token is unset / unresolvable. Pure read — no write.
 */
export function morphMinFloorPx(el: HTMLElement | null): number {
    const FALLBACK = 44; // the WCAG 2.5.5 touch floor (~2.75rem at the 16px root)
    if (!el || typeof getComputedStyle !== "function") return FALLBACK;
    const raw = getComputedStyle(el).getPropertyValue("--dock-morph-min").trim();
    if (!raw) return FALLBACK;
    // The token resolves to a px length on a computed read (CSS resolves rem→px); a
    // bare number / an unresolvable value falls back to the floor.
    const n = Number.parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : FALLBACK;
}

/**
 * BA-VJS-1 (valuejs-fold A-1) — the OTHER registered targets whose container is a
 * DOM DESCENDANT of `outerEl` (a nested `<DockLayerGroup>` stack inside the outer
 * `.dock-layers`). These are the pinned inner spans the outer measure must see at
 * their OWN intrinsic `max-content`, not their collapsed pin, or the outer
 * shrink-wraps to ~0.
 */
export function nestedTargetsWithin(
    outer: MorphMeasureTarget,
    outerEl: HTMLElement,
    targets: Iterable<MorphMeasureTarget>,
): MorphMeasureTarget[] {
    const out: MorphMeasureTarget[] = [];
    for (const sib of targets) {
        if (sib === outer) continue;
        const sibEl = sib.containerEl.value;
        // `contains` is true for the element itself; we guarded `sib === outer`,
        // and a sibling's container that is not inside `outerEl` is excluded — so
        // only genuine nested descendants of THIS outer are forced.
        if (sibEl && sibEl !== outerEl && outerEl.contains(sibEl)) out.push(sib);
    }
    return out;
}

/**
 * BA-VJS-1 — force ONE nested target to its own-axis `max-content` (clearing its
 * reserved `--dock-morph-to` footprint so it sizes to content), and return a closure
 * that RESTORES its exact prior inline state. The restore re-writes the precise
 * prior `inline-size`/`block-size` inline value (or removes it if there was none),
 * so the inner's in-flight pin is byte-identical after the outer's measurement —
 * the inner target's own spring/pin pipeline is never disturbed.
 */
export function forceNestedMaxContent(n: MorphMeasureTarget): () => void {
    const el = n.containerEl.value;
    if (!el) return () => {};
    const prop = morphAxisProp(n.axis.value);
    const prior = el.style.getPropertyValue(prop);
    el.style.setProperty(prop, "max-content");
    return () => {
        if (prior) el.style.setProperty(prop, prior);
        else el.style.removeProperty(prop);
    };
}

/**
 * BB.W-DOCK-MORPH-FAMILY (c) — measure the true `to` for ONE target with the
 * morph axis forced to `max-content` (the same circular-measure escape the rAF
 * path uses), composing the BA-VJS-1 nested-descendant `max-content` ordering so
 * a nested group reads its TRUE intrinsic span (never `to:0`). The element is at
 * the live painted geometry on entry; this forces+reads+restores the axis. PURE
 * measure — no spring, no pin write.
 */
export function measureTo(
    t: MorphMeasureTarget,
    el: HTMLElement,
    targets: Iterable<MorphMeasureTarget>,
): number {
    const axis = t.axis.value;
    const prop = morphAxisProp(axis);
    clearMorphVars(el);
    const nested = nestedTargetsWithin(t, el, targets);
    const restore = nested.map((n) => forceNestedMaxContent(n));
    const prior = el.style.getPropertyValue(prop);
    el.style.setProperty(prop, "max-content");
    const toSize = getSize(el, axis);
    if (prior) el.style.setProperty(prop, prior);
    else el.style.removeProperty(prop);
    for (const r of restore) r();
    return toSize;
}

/** The orchestrator settle callbacks the synchronous seat composes (it clears the
 *  morph vars + nulls the leaving layer, then parks the root/spring once no target
 *  is morphing). */
export interface MorphSeatCallbacks {
    /** Settle ONE target (clear its morph vars + null its leavingLayer). */
    settleTarget(t: MorphMeasureTarget): void;
    /** Park the shared scalar + spring once NO target is morphing. */
    maybeSettleRoot(): void;
}

/**
 * BB.W-DOCK-MORPH-FAMILY (c) — the SYNCHRONOUS PRM seat. Under
 * `prefers-reduced-motion: reduce` there is NO morph to play, so the geometry +
 * the scalar seat at the target in ONE step (the `useDockOrientationMorph.pin()`
 * precedent transplanted onto the collapse/expand path): measure the true `to`
 * (composing the BA-VJS-1 nested ordering), write the box at `to` (the
 * reserved-footprint reads at scale 1), and set `--dock-morph-t` to the endpoint
 * for THIS swap — then clear the morph state immediately (no rAF measure-defer,
 * no spring, no morph window). The box NEVER paints the collapsed `from` sliver
 * with the scalar at 1 (the P0 terminal failure). Endpoint is the per-swap
 * incoming-ness `1` (the new pane is fully in; the directional `--dock-expand-t`
 * resolves to the class endpoint with `[data-morphing]` cleared).
 */
export function seatTargetSync(
    t: MorphMeasureTarget,
    id: number,
    root: HTMLElement | null,
    targets: Iterable<MorphMeasureTarget>,
    cb: MorphSeatCallbacks,
): void {
    if (id !== t.txId) return;
    const el = t.containerEl.value;
    const r = root;
    if (!el || !r) return;
    const axis = t.axis.value;
    // Measure the settled target (the swapped pane is in-flow after the flush).
    const toSize = measureTo(t, el, targets);
    // Seat the box AT the settled footprint with NO live scalar (scale 1) — the
    // reserved-footprint CSS reads `--dock-morph-to`; set `from=to` so the ratio
    // is 1 and any in-flight transform is the identity, then clear the morph
    // state so `[data-morphing]` drops and the rest-state CSS owns the box.
    el.style.setProperty("--dock-morph-from", `${toSize}px`);
    el.style.setProperty("--dock-morph-to", `${toSize}px`);
    // The endpoint scalar — the morph hard-cuts to fully-revealed.
    r.style.setProperty("--dock-morph-t", "1");
    // Force a synchronous layout read so the seated box paints at `to` THIS frame
    // (the box is laid out at `to`, never the collapsed `from`).
    void el.getBoundingClientRect()[dimOf(axis)];
    // Clear immediately — no spring, no morph window; the rest-state CSS holds.
    cb.settleTarget(t);
    cb.maybeSettleRoot();
}

/**
 * The swap-while-morphing sibling re-base. The shared scalar resets to 0 for the
 * new span; if SIBLING targets are mid-morph, re-base their `from` to their CURRENT
 * painted px first, so resetting the scalar keeps them visually continuous (they
 * interpolate fresh from where they are, toward their unchanged `to`) rather than
 * snapping back to their old `from`. PURE over the swapping target + the target set.
 */
export function rebaseSiblingSpans(
    swapping: MorphMeasureTarget,
    targets: Iterable<MorphMeasureTarget>,
): void {
    for (const sib of targets) {
        if (sib === swapping) continue;
        const sibEl = sib.containerEl.value;
        if (sibEl && sibEl.style.getPropertyValue("--dock-morph-to")) {
            const cur = getSize(sibEl, sib.axis.value);
            sibEl.style.setProperty("--dock-morph-from", `${cur}px`);
        }
    }
}

/**
 * BC.W-DOCK-ROOT-MORPH — clear the ROOT box's own morph span (the `inline-size` =
 * f(scalar) recipe in layers.css reads `--dock-root-morph-from/to`; clearing them
 * hands the box back to the at-rest shrink-wrap once the morph settles). PURE on
 * the root element — no orchestrator closure.
 */
export function clearRootMorphSpan(root: HTMLElement | null): void {
    if (!root) return;
    root.style.removeProperty("--dock-root-morph-from");
    root.style.removeProperty("--dock-root-morph-to");
}

/**
 * BC.W-DOCK-ROOT-MORPH — pin the ROOT box's own from→to span on the dock root.
 *
 * THE SNAP ROOT CAUSE: the inner `.dock-layers` reserves its SETTLED `to`
 * footprint (`inline-size: var(--dock-morph-to)`, layers.css — the E4-frozen
 * CDP-Layout-flat mechanism) and morphs VISUALLY via `transform: scaleX()`. A
 * `transform` is paint-only — a parent does NOT shrink-wrap to a scaled child —
 * so the root `.glass-dock` (display:inline-flex) shrink-wraps to the inner's
 * RESERVED full `to` width and SNAPS to full on frame 0, while the inner's scaled
 * box rides the spring smoothly. The gate (and the page) measure the ROOT box, so
 * the root must ALSO ramp. The layers.css recipe reads
 * `inline-size: calc(from + (to−from)·--dock-morph-t)` (the SAME scalar the spring
 * glides, NO CSS transition — proof:no-layout-animation stays GREEN; a `calc()`
 * over the registered `--dock-morph-t` is not a transition). PURE on the root.
 */
export function armRootMorphSpan(
    root: HTMLElement | null,
    rootFrom: number,
    rootTo: number,
): void {
    if (!root) return;
    root.style.setProperty("--dock-root-morph-from", `${rootFrom}px`);
    root.style.setProperty("--dock-root-morph-to", `${rootTo}px`);
}

/** The orchestrator callbacks the rAF measure-and-arm window composes — the arm
 *  step re-pins the per-target + root spans on the shared scalar. */
export interface MorphMeasureArmCallbacks {
    /** Arm the per-target `--dock-morph-from/to` span + ensure the shared spring. */
    armTarget(t: MorphMeasureTarget, id: number, fromSize: number, toSize: number): void;
}

/**
 * BC.W-DOCK-ROOT-MORPH / BA-VJS-1 / BC.W-LIQUID-MORPH (M3) — the rAF measure-and-arm
 * window: ONE rAF (post-flush) later, lift the pin for a single synchronous
 * measurement of the now-correct shrink-wrapped to-size, then re-pin + start the
 * spring IN THE SAME FRAME. The measurement + arm are gated on THIS target's own
 * `txId`, so a sibling target swapping in the same tick does NOT clobber it.
 *
 * BA-VJS-1 — the nested-`DockLayerGroup` measure-ORDERING fix: force every OTHER
 * registered target whose container is a DOM descendant of this outer's container
 * to its own-axis `max-content` (clearing its pinned calc span) for the single
 * synchronous measurement, then RESTORE its exact prior inline state, so the outer
 * shrink-wraps around the inner's TRUE intrinsic content, not its pinned collapse.
 *
 * BC.W-DOCK-ROOT-MORPH — for the OUTER target, LIFT the root's own pinned span for
 * the duration of this synchronous measure (clearing `--dock-root-morph-from/to`,
 * which the layers.css recipe constrains the root by) so the root shrink-wraps to
 * its TRUE expanded width, read it DIRECTLY (sidestepping the chrome-offset
 * arithmetic + the empty-summary `inner-to:0` trap), then RESTORE the pin and
 * arm the root from→to span so its `inline-size` ramps on the SAME scalar.
 *
 * BC.W-LIQUID-MORPH (M3) — the measure-failure guard: a `to:0` mis-measure (a
 * mid-morph re-grab, a nested collapsible still pinned, a race the ordering fix
 * missed) seats the measured `to` at the resolved floor (`--dock-morph-min`,
 * density-scaled, WCAG ~44px fallback) so the morph interpolates toward a visible
 * footprint, never toward 0 — "visible at the floor," never "white." Inert on a
 * healthy measurement.
 *
 * PURE over its explicit deps (the orchestrator passes the live element/targets/
 * outer identity + the `armTarget` re-pin callback) — no module-level state, so the
 * extraction is behaviour-identical to the prior inline rAF closure.
 */
export function measureAndArmMorph(
    t: MorphMeasureTarget,
    id: number,
    axis: "horizontal" | "vertical",
    fromSize: number,
    rootFromSize: number,
    isOuter: boolean,
    rootEl: HTMLElement | null,
    targets: Iterable<MorphMeasureTarget>,
    cb: MorphMeasureArmCallbacks,
): void {
    if (id !== t.txId) return;
    const elNow = t.containerEl.value;
    const rootNow = rootEl;
    if (!elNow || !rootNow) return;
    clearMorphVars(elNow);
    // The container is laid out at the still-collapsed clip width, so a bare
    // measure reads the CLIPPED size, not the target pane's intrinsic size
    // (circular — the expanded aperture is what the spring solves for). Force
    // `max-content` on the morph axis for the single measurement, then clear it
    // before `armTarget` re-pins the calc span.
    const prop = morphAxisProp(axis);
    // BA-VJS-1 — force nested descendant targets to their OWN intrinsic span for
    // the duration of THIS measure so the outer shrink-wraps around the inner's
    // real content, not its pinned-collapsed clip. Each is restored to its exact
    // prior inline state right after the synchronous read.
    const nested = nestedTargetsWithin(t, elNow, targets);
    const restore = nested.map((n) => forceNestedMaxContent(n));
    // BC.W-DOCK-ROOT-MORPH — for the OUTER target, LIFT the root's own pinned span
    // (the layers.css recipe constrains the root to its pinned width via the
    // `--dock-root-morph-from/to` vars, and the `.dock-layers` grid child carries
    // `min-width: 0` so a root pinned small CLAMPS the child to 0 even at
    // `max-content`). Snapshot + restore around the synchronous measure so the
    // root is free to shrink-wrap to its TRUE expanded width while we read.
    const liftRootPin = isOuter;
    const priorRootFrom = liftRootPin
        ? rootNow.style.getPropertyValue("--dock-root-morph-from")
        : "";
    const priorRootTo = liftRootPin
        ? rootNow.style.getPropertyValue("--dock-root-morph-to")
        : "";
    if (liftRootPin) clearRootMorphSpan(rootNow);
    elNow.style.setProperty(prop, "max-content");
    const measuredTo = getSize(elNow, axis);
    const rootMeasuredTo = liftRootPin ? getSize(rootNow, axis) : 0;
    elNow.style.removeProperty(prop);
    // BC.W-LIQUID-MORPH (M3) — the measure-failure guard (the `||` keeps a real
    // span on a healthy measurement; a 0 mis-measure degrades to the floor).
    const floorPx = morphMinFloorPx(elNow);
    const toSize = measuredTo > 0 ? measuredTo : floorPx;
    const rootToSize =
        !liftRootPin || rootMeasuredTo > 0 ? rootMeasuredTo : morphMinFloorPx(rootNow);
    if (liftRootPin) {
        // Restore the prior (pin-at-from) span so the box keeps holding its
        // collapsed width until armRootMorphSpan re-pins the true to-span below.
        if (priorRootFrom)
            rootNow.style.setProperty("--dock-root-morph-from", priorRootFrom);
        if (priorRootTo)
            rootNow.style.setProperty("--dock-root-morph-to", priorRootTo);
    }
    for (const r of restore) r();
    cb.armTarget(t, id, fromSize, toSize);
    // BC.W-DOCK-ROOT-MORPH — pin the ROOT box's measured from→to span so its
    // `inline-size` ramps on the SAME scalar the spring drives instead of snapping
    // to the inner's reserved `to`. A same-size swap (the inner settled in
    // armTarget) clears the span so the box shrink-wraps at rest.
    if (isOuter) {
        if (Math.abs(rootToSize - rootFromSize) < 0.5) clearRootMorphSpan(rootNow);
        else armRootMorphSpan(rootNow, rootFromSize, rootToSize);
    }
}
