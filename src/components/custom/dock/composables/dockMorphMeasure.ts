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
