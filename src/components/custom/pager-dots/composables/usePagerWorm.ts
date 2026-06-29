// BD.W-GOO-BARBELL-NECK — the PagerDots goo-morph WORM wiring (carved out of
// PagerDots.vue at BH.B2.4a — the colocation drain; the SFC keeps the dot maps + the
// interaction layer + template + style, this leaf owns the worm geometry + driver).
//
// The active indicator GOO-MORPHS from dot to dot as a true BARBELL: TWO round pip-bodies
// bud apart, a metaball NECK with a concave waist wells up between them, the SVG goo filter
// merges the three, then the bodies coalesce on the target + SETTLE. This leaf owns the
// worm GEOMETRY (`centerOf`/`restSize`) + the travel/settle driver (the `useGooMorph`
// instance + the active/shown watchers). COMPOSITOR-ONLY: the bodies travel on
// `transform: translate`, deform on `scale`, the neck wells on scaleY — NEVER an animated
// width (motion-canon P5).

import type { ComputedRef, Ref } from "vue";
import { nextTick, onMounted, watch } from "vue";
import { useGooMorph } from "../../../../composables/motion/useGooMorph";
import {
    DEFAULT_DOT_PX,
    DEFAULT_DOT_REM,
    DEFAULT_ROOT_PX,
    DEFAULT_WORM_DURATION_S,
    PAGER_NECK_GAP,
    PHI,
    TRAVEL_SETTLE_PAD_MS,
} from "../constants";

export interface UsePagerWormRefs {
    /** The rail root — the worm anchors to this box; the on-rail centers measure relative to it. */
    rootEl: Ref<HTMLElement | null>;
    /** The two round pip-bodies + the welling concave neck (the engine projects all three). */
    bodyAEl: Ref<HTMLElement | null>;
    bodyBEl: Ref<HTMLElement | null>;
    neckEl: Ref<HTMLElement | null>;
    /** The opaque goo-dot silhouette map (keyed by slide index) — the worm reads its centers. */
    gooDotEls: Map<number, HTMLElement>;
    /** The currently-shown (windowed) slide indices. */
    shown: ComputedRef<number[]>;
    /** Whether the rail axis is vertical. */
    vertical: ComputedRef<boolean>;
    /** The active 0-based index (the `v-model:active` ref). */
    active: Ref<number>;
}

/**
 * Wire the pager's goo-morph worm — the barbell geometry (`centerOf`/`restSize`) + the
 * `useGooMorph` instance + the active/shown travel/settle watchers. Installs the watchers
 * + the mount snap; owns no template/style/dot-maps (the SFC keeps those). All motion is
 * compositor-only (the engine writes transform/opacity); NEVER an animated layout property.
 */
export function usePagerWorm(refs: UsePagerWormRefs): void {
    const { rootEl, bodyAEl, bodyBEl, neckEl, gooDotEls, shown, vertical, active } = refs;

    /** The on-rail center (px on the travel axis, relative to the rail content box) of the
     *  painted dot at slide index `i`. MEASURED off the live goo-dot — windowFit-correct on
     *  both axes; at a clipped edge a non-shown index falls back to its nearest shown dot. */
    function centerOf(i: number): number | null {
        const rail = rootEl.value;
        if (!rail) return null;
        let el = gooDotEls.get(i);
        if (!el) {
            // clipped out of the window — anchor on the nearest shown dot center
            const list = shown.value;
            if (list.length === 0) return null;
            const nearest = list.reduce((a, b) =>
                Math.abs(b - i) < Math.abs(a - i) ? b : a,
            );
            el = gooDotEls.get(nearest);
            if (!el) return null;
        }
        const rRect = rail.getBoundingClientRect();
        const dRect = el.getBoundingClientRect();
        return vertical.value
            ? dRect.top + dRect.height / 2 - rRect.top
            : dRect.left + dRect.width / 2 - rRect.left;
    }

    /** The resting slot PITCH (px) on the travel axis — the engine takes D = restSize/φ as the
     *  body diameter, so this returns the dot CELL pitch (φ·dot-size) and D lands back on the
     *  painted pip size. The 24px goo-dot cell is a good proxy for the inter-dot pitch. */
    function restSize(): number {
        const rail = rootEl.value;
        let dot = DEFAULT_DOT_PX;
        if (rail) {
            const raw = getComputedStyle(rail).getPropertyValue("--pager-dot-size").trim();
            if (raw.endsWith("rem")) {
                const root =
                    parseFloat(getComputedStyle(document.documentElement).fontSize) ||
                    DEFAULT_ROOT_PX;
                dot = (parseFloat(raw) || DEFAULT_DOT_REM) * root;
            } else {
                dot = parseFloat(raw) || DEFAULT_DOT_PX;
            }
        }
        // D = pitch/φ should land on the pip diameter → pitch = dot·φ.
        return dot * PHI;
    }

    const worm = useGooMorph({
        barbellRefs: { bodyARef: bodyAEl, bodyBRef: bodyBEl, neckRef: neckEl },
        hostRef: rootEl,
        vertical,
        centerOf,
        restSize,
        // the dot-pip register. The pager bodies near to 0.7·D at the midpoint — a tighter,
        // gooier waist than the wider carousel (a small dot worm reads decisive at a tight gap).
        tokenPrefix: "pager-worm",
        neckGap: PAGER_NECK_GAP,
    });

    // Drive the worm goo-morph on every active change — STRETCH src→target then CONTRACT.
    // `traveling` guards the window-recompute snap from clobbering an in-flight glide: a
    // deck page changes BOTH `active` and `shown` in one flush, so the `shown` watcher must
    // NOT snap-reset `--worm-t` while the travel spring is gliding it.
    let traveling = false;
    let travelToken = 0;
    watch(active, (to, from) => {
        traveling = true;
        const token = ++travelToken;
        void nextTick(() => {
            worm.travel(from ?? to, to);
            // clear the guard after the bouncy clock + tail settles (re-entrancy-safe).
            const rail = rootEl.value;
            const dur = rail
                ? parseFloat(
                      getComputedStyle(rail).getPropertyValue("--pager-worm-duration"),
                  ) || DEFAULT_WORM_DURATION_S
                : DEFAULT_WORM_DURATION_S;
            setTimeout(() => {
                if (token === travelToken) traveling = false;
            }, dur * 1000 + TRAVEL_SETTLE_PAD_MS);
        });
    });
    watch(shown, () => {
        // after a PURE window slide (active unchanged), the active dot's painted center may
        // move — settle the worm. Skipped while a travel glide is in flight (above).
        if (traveling) return;
        void nextTick(() => worm.snap(active.value));
    });

    onMounted(() => {
        void nextTick(() => worm.snap(active.value));
    });
}
