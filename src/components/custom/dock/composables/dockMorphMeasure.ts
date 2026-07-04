import { onScopeDispose, watch, type Ref } from "vue";
import { DOCK_TAP_FLOOR_PX } from "../constants";

/**
 * BD.W-DOCK-CORE (the width-seizure cure) — the dock morph SIZE measure.
 *
 * THE BUG THIS RETIRES (the year-old seizure): the prior pipeline measured a
 * per-swap `from/to` FLIP ratio and drove the visible size by
 * `--dock-root-scale = max(ratio + (1−ratio)·t, 0.06)` — a FLOOR with NO CEILING.
 * When the morph target measured small (a degenerate `to` racing the content
 * layout), `ratio = from/max(to,1px)` ran to ~56 → `scaleX(56)` = a ~2451px
 * detonation on collapse / an inversion at the spring overshoot peak. The
 * `transform-origin: center` kept the centroid clean (`cxRange 0`), which is
 * exactly why every prior judge measuring the centroid PASSED while the WIDTH
 * detonated. The whole measure-and-arm FLIP machinery
 * (`measureAndArmMorph`/`seatTargetSync`/`rebaseSiblingSpans`/
 * `forceNestedMaxContent`/`nestedTargetsWithin`/`measureTo`/`armRootMorphSpan`/
 * `clearRootMorphSpan`/`morphMinFloorPx`/the per-target generation gating) is
 * DELETED — clean break, no legacy, no floor that masks a bad measurement.
 *
 * THE CURE — a ratio-FREE measure-ONCE convex blend. The dock measures its two
 * KNOWN footprints ONCE per content change (a `ResizeObserver`, NOT a per-swap
 * rAF race): `--dock-expanded-px` (the expanded content width, read behind the
 * clip aperture) and `--dock-collapsed-px` (the collapsed summary box). The
 * visible size is the convex blend `--dock-live = collapsed + (expanded −
 * collapsed)·--dock-morph-t` and `--dock-size-scale = --dock-live / expanded`
 * (layers.css). A convex blend of two POSITIVE endpoints can NEVER exceed the
 * larger nor invert below the smaller — BOUNDED by construction, no ratio, no
 * `scaleX` explosion, regardless of spring overshoot (the `clamp(0,t,1)` caps the
 * size term; the >1 excursion routes to the orthogonal punch channel).
 *
 * THE FRESHNESS GUARD (challenge 3·R2): a measure-ONCE endpoint can still be read
 * stale — before `fonts.ready`, before async icon SVGs lay out, on a
 * `display:none`→0 route swap, or on a `content-visibility:auto` parent (the RO
 * fires 0). A 0 expanded would give `collapsed/0 = ∞`. So FLOOR `--dock-expanded-px`
 * at `max(measured, --dock-collapsed-px)` and re-measure on `fonts.ready` + the
 * FIRST non-zero RO callback + visibility-enter. This is NOT the deleted magic
 * floor (which masked a per-frame measurement); it is a one-shot endpoint
 * sanity bound on a value that is otherwise stable across the whole morph.
 *
 * `DOCK_SPRING` is byte-fenced — it lives in `../constants`, never touched here.
 */

export function dimOf(axis: "horizontal" | "vertical"): "width" | "height" {
    return axis === "vertical" ? "height" : "width";
}
export function getSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
    return el.getBoundingClientRect()[dimOf(axis)];
}

export interface UseDockExpandedSizeOptions {
    /** The `.glass-dock` root the `--dock-expanded-px`/`--dock-collapsed-px` write to. */
    rootEl: Ref<HTMLElement | null>;
    /**
     * The content element whose intrinsic morph-axis span is observed for size
     * changes (the active full-pane container — `.dock-layers`). Its resizes are the
     * RO trigger; the ENDPOINTS are read off the ROOT box (content + chrome), keyed
     * by the dock's at-rest expanded/collapsed state.
     */
    contentEl: Ref<HTMLElement | null>;
    /**
     * The morph axis (a horizontal dock blends width; a vertical dock blends height).
     */
    axis: Ref<"horizontal" | "vertical">;
    /**
     * Whether the dock is currently in its EXPANDED visual state (a `Ref<boolean>`).
     * The endpoint captured at rest is keyed off this: at rest expanded → the root
     * box is the `--dock-expanded-px` endpoint; at rest collapsed → the
     * `--dock-collapsed-px` endpoint. (A reactive read, so a state flip re-captures.)
     */
    expanded: Ref<boolean>;
}

/**
 * The collapsed-endpoint floor in px (the icon-square / WCAG touch floor) read off
 * the live root token, used until the collapsed state has been captured at rest.
 */
function collapsedFloorPx(root: HTMLElement | null): number {
    // BG.NF.1 W-FALLBACK-EXCISE — the floor is the single-sourced `DOCK_TAP_FLOOR_PX`
    // (constants.ts, mirroring `--dock-morph-min`'s 2.75rem), NEVER a bare drift-prone
    // literal duplicated at the read. A missing root (not yet mounted) is the honest
    // not-mounted case → the constant; a MOUNTED root whose token is unreadable is a
    // real bug → fail loud (dev warn) then the constant, no silent literal mask.
    if (!root || typeof getComputedStyle !== "function") return DOCK_TAP_FLOOR_PX;
    const raw = getComputedStyle(root).getPropertyValue("--dock-morph-min").trim();
    const n = Number.parseFloat(raw);
    if (Number.isFinite(n) && n > 0) return n;
    if (import.meta.env?.DEV)
        console.warn(
            "[glass-ui] dock: --dock-morph-min unreadable on a mounted dock root — the token cascade did not reach it (falling back to the WCAG tap floor).",
        );
    return DOCK_TAP_FLOOR_PX;
}

/**
 * BD.W-DOCK-CORE — capture the two convex-blend endpoints ONCE PER STATE off the
 * ROOT box.
 *
 * The visible morph scales the ROOT (chrome + content), so the two blend endpoints
 * must be the ROOT's OWN expanded/collapsed footprints — NOT the bare content span
 * (which omits the padding/min-width chrome). The endpoints are captured at REST
 * (when `[data-morphing]` is OFF): the dock's settled root box in its current
 * expanded/collapsed state IS that state's endpoint. A `ResizeObserver` on the
 * content re-captures the CURRENT state's endpoint whenever the content reflows
 * (more controls, a font swap), so the blend stays fresh — but it never reads the
 * box MID-MORPH (the scaled box would feed back a degenerate endpoint, the seizure's
 * cousin). The expanded endpoint is FLOORED at `max(captured, collapsed)` — the
 * freshness guard against a 0/degenerate read giving `collapsed/0 = ∞`.
 *
 * The collapsed endpoint starts at the resolved `--dock-morph-min` icon-square floor
 * and is refined to the real collapsed root box the first time the dock rests
 * collapsed; the expanded endpoint is captured the first (and every) time it rests
 * expanded. So the FIRST morph from a freshly-mounted expanded dock already has a
 * real expanded endpoint + a sane collapsed floor — bounded by construction.
 */
export function useDockExpandedSize(options: UseDockExpandedSizeOptions): void {
    const { rootEl, contentEl, axis, expanded } = options;

    let ro: ResizeObserver | null = null;
    // The two captured endpoints (px). Seeded lazily; the collapsed floor backs the
    // collapsed endpoint until a real collapsed rest is observed.
    let expandedPx = 0;
    let collapsedPx = 0;

    function isMorphing(root: HTMLElement): boolean {
        return root.hasAttribute("data-morphing");
    }

    /** Capture the CURRENT-state endpoint off the root box (rest-only), then write both. */
    function capture(): void {
        const root = rootEl.value;
        const content = contentEl.value;
        if (!root || !content) return;
        const a = axis.value;
        const floor = collapsedFloorPx(root);
        if (collapsedPx <= 0) collapsedPx = floor;

        // Only refine an endpoint when the dock is at REST (the box is its true
        // settled footprint; mid-morph the box is mid-scale and would feed back a
        // degenerate value). A bare seed read on a 0-content frame is the freshness
        // guard's job — the floor below catches it.
        if (!isMorphing(root)) {
            const box = getSize(root, a);
            if (box > 0) {
                if (expanded.value) expandedPx = box;
                else collapsedPx = box;
            }
        }

        // The freshness guard — the expanded endpoint is never below the collapsed
        // one, so `collapsed/expanded` is never `collapsed/0 = ∞`. Until expanded has
        // been captured, fall back to the content span (+chrome-free is fine as a
        // pre-capture seed; it floors at collapsed anyway).
        const expandedSeed =
            expandedPx > 0 ? expandedPx : Math.max(getSize(content, a), collapsedPx);
        const finalExpanded = Math.max(expandedSeed, collapsedPx);

        root.style.setProperty("--dock-collapsed-px", `${collapsedPx}px`);
        root.style.setProperty("--dock-expanded-px", `${finalExpanded}px`);
    }

    function attach(root: HTMLElement | null): void {
        if (ro) {
            ro.disconnect();
            ro = null;
        }
        if (!root || typeof ResizeObserver === "undefined") return;
        ro = new ResizeObserver(() => capture());
        if (contentEl.value) ro.observe(contentEl.value);
        // Observe the ROOT too — its settle-resize (the reserved `inline-size`
        // clearing when `[data-morphing]` drops) is the rest-state re-capture trigger
        // (the `capture()` rest-gate reads the now-settled box for the just-entered
        // state). The mid-morph scale is a `transform`, not a layout resize, so the RO
        // does NOT fire per-frame (it fires only on the settle relayout).
        ro.observe(root);
        // Seed the endpoints synchronously so a static (never-morphed) dock paints
        // its reserved footprint immediately.
        capture();
    }

    watch(rootEl, (r) => attach(r), { immediate: true });
    watch(contentEl, () => attach(rootEl.value));
    // A rest-state flip re-captures the just-entered state's endpoint (it fires after
    // the morph settles, so the box is the true settled footprint).
    watch(expanded, () => capture());

    // Re-measure once fonts resolve (async font metrics shift the content width).
    const fonts =
        typeof document !== "undefined" ? (document as Document).fonts : undefined;
    if (fonts) {
        void fonts.ready.then(() => capture());
    }

    onScopeDispose(() => {
        if (ro) ro.disconnect();
        ro = null;
    });
}
