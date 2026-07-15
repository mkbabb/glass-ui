// BI.W-PAGER-WORM — the PagerDots liquid dot-MORPH worm wiring (the colocated leaf
// PagerDots imports back; the BH.B2.4a colocation carve re-based onto the two-edge
// lead/trail driver — the σ8 filter-annihilation empty-pill defect cured at the root).
//
// The active indicator GOO-MORPHS from dot to dot as a two-edge worm: a LEAD edge
// springs toward `centerOf(active)`, a TRAIL edge lags then catches up (`useLeadTrail`,
// the ONE shared two-edge driver). The gap between the edges is the worm's live
// elongation; the barbell (bodyA at `lo`, a welling neck, bodyB at `hi`) is projected
// off the (lo, hi) edges each frame and merged by the `#pager-worm-goo` filter (Arm A,
// the shipped register) — the un-merged clip-path barbell is the `@supports`-not degrade
// floor (Arm B). Interruption is FREE (a rapid re-select re-seats the lead target, the
// velocity carries); release-at-arrival is EMERGENT (the trail catching the lead — no
// `--pager-worm-duration` timer). COMPOSITOR-ONLY: the bodies travel on the individual
// `translate` property, deform on the CSS `scale: var(--stretch)` (the `useLiquidFlex`
// LOW-cap squish), the neck spans/wells on the individual `scale` — NEVER an animated
// width (motion-canon P5).

import type { ComputedRef, Ref } from "vue";
import { nextTick, onMounted, watch } from "vue";
import { useLeadTrail, type LeadTrailEdges } from "../../../composables/motion/useLeadTrail";
import { useLiquidFlex } from "../../../composables/motion/useLiquidFlex";
import { useResizeObserver } from "../../../composables/dom/useResizeObserver";
import {
    DEFAULT_DOT_PX,
    DEFAULT_DOT_REM,
    DEFAULT_ELONGATED_PX,
    DEFAULT_MAX_STRETCH,
    DEFAULT_ROOT_PX,
    PAGER_NECK_GIRTH,
} from "../constants";

export interface UsePagerWormRefs {
    /** The rail root — the token reads + the resize re-seat anchor to this box. */
    rootEl: Ref<HTMLElement | null>;
    /** The worm layer — the bodies/neck's positioning context (the coordinate origin). */
    wormLayerEl: Ref<HTMLElement | null>;
    /** The two round pip-bodies + the welling concave neck (the three worm masses). */
    bodyAEl: Ref<HTMLElement | null>;
    bodyBEl: Ref<HTMLElement | null>;
    neckEl: Ref<HTMLElement | null>;
    /** The bed pip map (keyed by slide index) — the worm reads its painted centers. */
    bedDotEls: Map<number, HTMLElement>;
    /** The currently-shown (windowed) slide indices. */
    shown: ComputedRef<number[]>;
    /** Whether the rail axis is vertical. */
    vertical: ComputedRef<boolean>;
    /** The active 0-based index (the `v-model:active` ref). */
    active: Ref<number>;
}

/** Read a `--token` off `el` → px, resolving a rem via the document root font-size. */
function readPx(el: HTMLElement | null, token: string, fallbackPx: number): number {
    if (!el) return fallbackPx;
    const raw = getComputedStyle(el).getPropertyValue(token).trim();
    if (!raw) return fallbackPx;
    if (raw.endsWith("rem")) {
        const root =
            parseFloat(getComputedStyle(document.documentElement).fontSize) ||
            DEFAULT_ROOT_PX;
        return (parseFloat(raw) || DEFAULT_DOT_REM) * root;
    }
    return parseFloat(raw) || fallbackPx;
}

/**
 * Wire the pager's two-edge worm — the barbell projection off the lead/trail edges +
 * the `useLeadTrail` driver + the active/shown/resize watchers. Installs the watchers
 * + the mount snap; owns no template/style/bed-maps (the SFC keeps those). All motion
 * is compositor-only; NEVER an animated layout property.
 */
export function usePagerWorm(refs: UsePagerWormRefs): void {
    const {
        rootEl,
        wormLayerEl,
        bodyAEl,
        bodyBEl,
        neckEl,
        bedDotEls,
        shown,
        vertical,
        active,
    } = refs;

    // The squish — the ONE shared engine (`useLiquidFlex`, "linear" law): the stretch
    // rises with the worm's elongation FRACTION, capped LOW off `--pager-worm-max-stretch`
    // (the R10 1.08–1.2 band; the 1.45 taffy value retired). The bodies read it via the
    // CSS `scale: var(--stretch)` reciprocal; we own NO second squish write.
    const liquidSquish = useLiquidFlex({
        from: 0,
        to: 0,
        axis: "width", // squish-only; the bodies travel via `translate`, not a size span
        squishLaw: "linear",
        maxStretch: () =>
            readPx(rootEl.value, "--pager-worm-max-stretch", DEFAULT_MAX_STRETCH) ||
            DEFAULT_MAX_STRETCH,
    });

    /** The on-axis painted center (px, relative to the WORM LAYER origin) of slide `i`.
     *  MEASURED off the live bed pip — windowFit-correct on both axes; measured against
     *  the worm layer (the bodies' offset parent) so the ring padding never skews it.
     *  At a clipped edge a non-shown index anchors on its nearest shown pip. */
    function centerOf(i: number): number | null {
        const layer = wormLayerEl.value;
        if (!layer) return null;
        let el = bedDotEls.get(i);
        if (!el) {
            const list = shown.value;
            if (list.length === 0) return null;
            const nearest = list.reduce((a, b) =>
                Math.abs(b - i) < Math.abs(a - i) ? b : a,
            );
            el = bedDotEls.get(nearest);
            if (!el) return null;
        }
        const lRect = layer.getBoundingClientRect();
        const dRect = el.getBoundingClientRect();
        return vertical.value
            ? dRect.top + dRect.height / 2 - lRect.top
            : dRect.left + dRect.width / 2 - lRect.left;
    }

    /** Project + paint the barbell off the lead/trail edges. `lo`/`hi` are the two
     *  silhouette edges; `gap` is the live elongation (clamped LOW at max-worm). The
     *  bodies travel via `translate` (CSS `scale: var(--stretch)` squishes); the neck
     *  spans `gap/D` on-axis + wells the `PAGER_NECK_GIRTH` bridge cross-axis. */
    function paintWorm(edges: LeadTrailEdges): void {
        const bodyA = bodyAEl.value;
        const bodyB = bodyBEl.value;
        const neck = neckEl.value;
        const layer = wormLayerEl.value;
        if (!bodyA || !bodyB || !neck || !layer) return;

        const vert = vertical.value;
        const D = readPx(rootEl.value, "--pager-dot-size", DEFAULT_DOT_PX);
        const maxWorm = readPx(rootEl.value, "--pager-dot-elongated", DEFAULT_ELONGATED_PX);

        let gap = edges.hi - edges.lo;
        if (gap > maxWorm) gap = maxWorm;
        const mid = (edges.lo + edges.hi) / 2;
        const cA = mid - gap / 2;
        const cB = mid + gap / 2;

        // the LOW velocity-swell — `useLiquidFlex` linear law, travel = the elongation
        // fraction; the bodies read `--stretch` via their CSS `scale` reciprocal.
        liquidSquish.squish(maxWorm > 0 ? gap / maxWorm : 0);
        layer.style.setProperty("--stretch", liquidSquish.stretch.value.toFixed(4));

        // bodies — the individual `translate` property (compositor-only; the CSS `scale`
        // squishes in-place then the translate positions — the well-defined compose order).
        bodyA.style.translate = translatePx(cA, vert);
        bodyB.style.translate = translatePx(cB, vert);

        // neck — span the live gap on-axis (`scaleX(gap/D)`), well the bridge girth
        // cross-axis; the girth-following opacity (visible EXACTLY while it spans).
        const spanScale = D > 0 ? Math.max(gap / D, 0.0001) : 0.0001;
        neck.style.translate = translatePx(mid, vert);
        neck.style.scale = vert
            ? `${PAGER_NECK_GIRTH.toFixed(4)} ${spanScale.toFixed(4)}`
            : `${spanScale.toFixed(4)} ${PAGER_NECK_GIRTH.toFixed(4)}`;
        neck.style.opacity = gap > 0.5 ? "1" : "0";
    }

    /** Compose the on-axis `translate` string (the cross axis stays centred by CSS). */
    function translatePx(center: number, vert: boolean): string {
        return vert ? `0 ${center.toFixed(2)}px` : `${center.toFixed(2)}px 0`;
    }

    const worm = useLeadTrail({ onFrame: paintWorm });

    // Seat the worm on the active pip (instant; mount / resize — never an animation event).
    function seatActive(): void {
        const c = centerOf(active.value);
        if (c != null) worm.seat(c);
    }
    // Drive the worm to the active pip (the lead springs, the trail lags then reels in).
    function driveActive(): void {
        const c = centerOf(active.value);
        if (c != null) worm.drive(c);
    }

    // Every active change RETARGETS the lead (interruption-free — the velocity carries).
    watch(active, () => {
        void nextTick(driveActive);
    });
    // A pure window slide (active unchanged) moves the active pip's painted center —
    // re-drive so the worm settles onto the new center (the lead/trail catches it).
    watch(shown, () => {
        void nextTick(driveActive);
    });
    // A rail resize moves every painted center — re-seat instantly (not an animation).
    useResizeObserver(rootEl, () => {
        void nextTick(seatActive);
    });

    onMounted(() => {
        void nextTick(seatActive);
    });
}
