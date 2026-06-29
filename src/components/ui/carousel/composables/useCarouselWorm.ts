// BD.W-GOO-BARBELL-NECK — the carousel goo-morph BARBELL wiring (carved out of
// CarouselContent.vue at BH.B2.4a — the colocation drain; the SFC keeps template +
// style + the refs, this leaf owns the embla scroll/select wiring + barbell geometry).
//
// THE MECHANISM (Safari-first, compositor-only — the de-duped `useGooMorph` BARBELL).
// On embla `select` it `travel()`s the barbell (bodyA + concave neck + bodyB); on `scroll`
// (the live drag) it `drive()`s it continuously off embla `scrollProgress()` (the
// drag-driven neck). The DRIVER-vs-OBSERVER carve (the autoplay seam): a real user gesture
// inside the carousel region flags `userDriven` → full cartoon weight; an auto-advance is
// calm AMBIENT motion (`data-autoplay` zeroes `--motion-weight`). The barbell geometry —
// `slideStep`/`centerOf`/`restSize`/`setWormGeometry` — is the virtual viewport-relative
// model the engine projects.

import type { ComputedRef, Ref } from "vue";
import { nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import type { UnwrapRefCarouselApi } from "../interface";
import { useGooMorph } from "../../../../composables/motion/useGooMorph";

/** The golden ratio — D = restSize/φ lands the barbell body diameter (a BLOB, not a plate). */
const PHI = 1.618033988749895;
/** The driver auto-clear horizon (ms) — a later autoplay tick reads ambient again. */
const USER_DRIVEN_CLEAR_MS = 600;
/** The travel-gate clear pad (ms) past the goo duration — the neck has pinched to ~0 by then. */
const TRAVEL_OFF_PAD_MS = 80;
/** Fallback goo duration (s) when `--carousel-goo-duration` cannot be read. */
const DEFAULT_GOO_DURATION_S = 0.95;

export interface UseCarouselWormRefs {
    /** The content root — the user-gesture listen surface anchor. */
    rootEl: Ref<HTMLElement | null>;
    /** The goo silhouette layer host (the geometry origin + the `--goo-t` transition host). */
    gooLayerEl: Ref<HTMLElement | null>;
    /** The two round barbell bodies + the welling concave neck (the engine projects all three). */
    bodyAEl: Ref<HTMLElement | null>;
    bodyBEl: Ref<HTMLElement | null>;
    neckEl: Ref<HTMLElement | null>;
    /** The live embla API ref (from `useCarousel`). */
    carouselApi: Ref<UnwrapRefCarouselApi>;
    /** Whether the carousel axis is vertical (drives the on-axis measure). */
    vertical: ComputedRef<boolean> | Ref<boolean>;
}

/**
 * Wire the carousel's liquid goo-morph barbell to embla — the select/scroll/reInit
 * handlers, the DRIVER-vs-OBSERVER autoplay seam, and the barbell geometry. Installs the
 * embla listeners + lifecycle hooks; owns no template/style (the SFC keeps those). All
 * motion is compositor-only (the engine writes transform/opacity/filter); NEVER an
 * animated layout property (motion-canon P5).
 */
export function useCarouselWorm(refs: UseCarouselWormRefs): void {
    const { rootEl, gooLayerEl, bodyAEl, bodyBEl, neckEl, carouselApi, vertical } = refs;

    /** The single-slide travel step (px on the axis) — the live slide pitch read off the
     *  first two slide nodes (robust to peek/basis layouts), falling back to the viewport
     *  extent. */
    function slideStep(): number {
        const api = carouselApi.value;
        const host = gooLayerEl.value;
        const nodes = api?.slideNodes() ?? [];
        if (nodes.length >= 2) {
            const a = nodes[0].getBoundingClientRect();
            const b = nodes[1].getBoundingClientRect();
            const step = vertical.value
                ? Math.abs(b.top - a.top)
                : Math.abs(b.left - a.left);
            if (step > 1) return step;
        }
        if (host) {
            const r = host.getBoundingClientRect();
            return Math.max(1, vertical.value ? r.height : r.width);
        }
        return 1;
    }

    /** The on-axis center (px, relative to the goo-layer box) of SLIDE `i` — the VIRTUAL
     *  viewport-relative model: the ACTIVE slide is always centered in the viewport, and slot
     *  `i` is `(i - active) * slideStep` away. Layout-independent (no fragile slide-rect read
     *  through embla's translate), so the worm necks cleanly from the leaving-slide position
     *  to the entering-slide position as `--goo-t`/scrollProgress drives it. */
    function centerOf(i: number): number | null {
        const host = gooLayerEl.value;
        if (!host) return null;
        const r = host.getBoundingClientRect();
        const viewExtent = vertical.value ? r.height : r.width;
        const step = slideStep();
        return viewExtent / 2 + (i - activeIndex) * step;
    }

    /** The resting SLOT pitch (px) on the travel axis — the live slide step. The engine takes
     *  the golden-minor `D = restSize/φ` as the barbell body diameter (a BLOB, not a plate). */
    function restSize(): number {
        return Math.max(24, slideStep());
    }

    const goo = useGooMorph({
        barbellRefs: { bodyARef: bodyAEl, bodyBRef: bodyBEl, neckRef: neckEl },
        hostRef: gooLayerEl,
        vertical,
        centerOf,
        restSize,
        tokenPrefix: "carousel-goo",
        // the bodies near to 0.78·D at the midpoint — a tight, gooey concave waist (the
        // `--carousel-goo-neck-gap` token in CSS overrides if a consumer retunes).
        neckGap: 0.78,
    });

    let activeIndex = 0;

    /** Reserve the body footprint D = the live slide step / φ (so the engine's bare transforms
     *  land on the correct base — the bodies are sized to D, no scale-to-fit). Compositor-safe:
     *  a ONE-time `inline-size` reserve, NEVER a per-frame layout property. */
    function setWormGeometry(): void {
        const host = gooLayerEl.value;
        if (!host) return;
        const D = restSize() / PHI;
        host.style.setProperty("--carousel-body-d", `${D.toFixed(2)}px`);
    }

    // BD.W-CAROUSEL-DECK-GLASS §5 — the DRIVER-vs-OBSERVER carve, the load-bearing autoplay
    // seam. A USER gesture (finger drag / Next / keyboard) is a DRIVER → full weight (the goo
    // host carries `--goo-weight: 1.0`, the cartoon punch reads). An AUTO-advance (the demo's
    // autoplay timer programmatically `scrollNext`s) is calm AMBIENT motion → the host gets
    // `data-autoplay`, which zeroes `--motion-weight` so the cartoon-cast/punch self-extinguish
    // (calm auto-motion never reads as a loud deliberate flip). embla fires `pointerDown` ONLY
    // on a real finger drag; the Next/keyboard paths flip `userDriven` explicitly. A `select`
    // with no recent user signal is therefore an auto-advance.
    let userDriven = false;
    let userDrivenClearTimer: ReturnType<typeof setTimeout> | null = null;
    /** Flag the NEXT select as user-driven (a driver). Called by `onUserGesture` (any
     *  pointerdown/keydown inside the carousel region — drag · Next/Prev click · keyboard
     *  arrow). Auto-clears shortly after so a later autoplay tick is correctly read as
     *  ambient. */
    function markUserDriven(): void {
        userDriven = true;
        if (userDrivenClearTimer) clearTimeout(userDrivenClearTimer);
        userDrivenClearTimer = setTimeout(() => {
            userDriven = false;
            userDrivenClearTimer = null;
        }, USER_DRIVEN_CLEAR_MS);
    }
    // the carousel region (the `[data-slot="carousel"]` ancestor) — resolved on mount; the
    // document-capture gesture gate flags only gestures originating inside it.
    let region: Element | null = null;
    function onUserGesture(e: Event): void {
        const t = e.target as Node | null;
        if (region && t && region.contains(t)) markUserDriven();
    }

    // the goo glass bridge fades IN during travel + OUT ~80ms after the morph settles. The
    // dwell FOLLOWS THE NECK, not a fixed timer: the engine writes the neck's own opacity off
    // `neckGirth` (the bridge is visible EXACTLY while the goo deforms — wells then pinches),
    // so the layer gate need only bracket the travel window + clear ~80ms past settle (the
    // neck has already pinched to ~0 by then — no dead-slab dwell).
    let travelOffTimer: ReturnType<typeof setTimeout> | null = null;
    function markTraveling(): void {
        const host = gooLayerEl.value;
        if (!host) return;
        host.setAttribute("data-traveling", "");
        // the calm-auto-motion seam: an auto-advance (no user signal) flags `data-autoplay` so
        // the `--motion-weight: 0` observer (CSS) mutes the cartoon punch; a user swipe
        // clears it (the weighty driver reads the full punch).
        if (userDriven) host.removeAttribute("data-autoplay");
        else host.setAttribute("data-autoplay", "");
        if (travelOffTimer) clearTimeout(travelOffTimer);
        const durMs =
            (parseFloat(
                getComputedStyle(host).getPropertyValue("--carousel-goo-duration"),
            ) || DEFAULT_GOO_DURATION_S) * 1000;
        // the engine runs `durMs + 80` then coalesces; clear the layer gate right after, so the
        // bridge is gone within ~80ms of settle (kills the live-captured dead-slab dwell).
        travelOffTimer = setTimeout(() => {
            host.removeAttribute("data-traveling");
            travelOffTimer = null;
        }, durMs + TRAVEL_OFF_PAD_MS);
    }

    function onSelect(): void {
        const api = carouselApi.value;
        if (!api) return;
        const to = api.selectedScrollSnap();
        // key the travel gate off embla's OWN authoritative snap deltas — NOT the
        // locally-tracked `activeIndex`, which a rapid double-advance pre-updates so
        // `from === to` and the morph is silently dropped (JUDGE-3 §1c caveat).
        const prev = api.previousScrollSnap();
        activeIndex = to;
        setWormGeometry();
        if (prev === to) {
            goo.snap(to);
        } else {
            markTraveling();
            goo.travel(prev, to);
        }
    }

    function onScroll(): void {
        const api = carouselApi.value;
        if (!api) return;
        // embla scrollProgress is 0..1 over the WHOLE track; map onto a fractional SLIDE
        // index so the worm-plate necks with the live drag (the drag-driven goo). Using the
        // SLIDE count (not the snap count) keeps the neck travelling between slide centers.
        const last = Math.max(1, snapCount - 1);
        const prog = Math.min(1, Math.max(0, api.scrollProgress()));
        // mark traveling while mid-scroll (the live drag bridge); the timer clears it after
        // the settle so a momentum drag keeps the glass bridge alive then fades.
        if (prog > 0.001 && prog < 0.999) markTraveling();
        goo.drive(prog * last);
    }

    let snapCount = 0;
    function syncCount(): void {
        const api = carouselApi.value;
        // the SLIDE count (slideNodes) — robust to peek/basis layouts where the snap count
        // differs; the worm necks between slide centers read live off slideNodes().
        snapCount = api ? api.slideNodes().length : 0;
    }

    type EmblaApi = NonNullable<UnwrapRefCarouselApi>;
    let bound: EmblaApi | null = null;
    function bind(api: UnwrapRefCarouselApi | null | undefined): void {
        if (!api || bound === api) return;
        bound = api;
        syncCount();
        api.on("reInit", syncCount);
        api.on("select", onSelect);
        // `scroll` fires on every embla frame during a drag/momentum — the live goo drive.
        api.on("scroll", onScroll);
        void nextTick(() => {
            activeIndex = api.selectedScrollSnap();
            setWormGeometry();
            goo.snap(activeIndex);
        });
    }

    watch(carouselApi, (api) => bind(api), { immediate: true });
    onMounted(() => {
        void nextTick(() => bind(carouselApi.value));
        // any real user gesture anywhere in the carousel REGION (Next/Prev click, the
        // tabindex=0 region's keyboard arrows handled in Carousel.vue, a drag start) is a
        // DRIVER → the imminent select reads weighty. We listen at document-capture and gate to
        // the carousel region (the `[data-slot="carousel"]` ancestor of our root) so the
        // region-level keydown — which never bubbles DOWN into our content root — is caught
        // too. The autoplay timer fires NO DOM event, so its `select` stays calm (the ambient
        // `data-autoplay` seam).
        region = rootEl.value?.closest('[data-slot="carousel"]') ?? null;
        document.addEventListener("pointerdown", onUserGesture, true);
        document.addEventListener("keydown", onUserGesture, true);
    });
    onBeforeUnmount(() => {
        if (travelOffTimer) {
            clearTimeout(travelOffTimer);
            travelOffTimer = null;
        }
        if (userDrivenClearTimer) {
            clearTimeout(userDrivenClearTimer);
            userDrivenClearTimer = null;
        }
        document.removeEventListener("pointerdown", onUserGesture, true);
        document.removeEventListener("keydown", onUserGesture, true);
        region = null;
        const api = bound;
        if (!api) return;
        api.off("reInit", syncCount);
        api.off("select", onSelect);
        api.off("scroll", onScroll);
        bound = null;
    });
}
