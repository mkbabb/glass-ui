<script setup lang="ts">
// BD.W-GOO-CAROUSEL-DECK — the carousel track host + the liquid GOO-MORPH transition.
//
// THE BINDING BAR (the user's verbatim carousel feedback): the carousel transitions
// should be "more GLASSY, have more DISTORTION and INERTIA" and "should MORPH BLOB and
// MEATBALL from one to another" (the Gemini-carousel read). embla owns the ITEM-SCROLL;
// the goo-morph rides ON it as the TRANSITION layer — exactly the way <PagerDots> already
// rides the embla `select` event.
//
// THE MECHANISM (Safari-first, compositor-only — the de-duped `useGooMorph` engine).
// THE KEY FACT (JUDGE-1): a metaball goo-morph needs ≥2 MASSES inside ONE goo filter — a
// single travelling mass has nothing to merge with (no neck, no pinch). So the goo layer
// hosts THREE+ masses, EXACTLY the proven W-PAGER-GOO-MORPH pattern at plate scale:
//   • N STATIC slide-PLATE silhouettes — one opaque warm-cream plate parked at each slide
//     center (the plate-scale twin of the pager's N static `goo-dot` pips). These are the
//     fixed bodies the travelling worm necks INTO and OUT OF;
//   • ONE travelling WORM-plate that morphs between the plate centers (useGooMorph). As it
//     approaches a neighbor plate, the blur→alpha-threshold filter wells a warm-cream NECK
//     bridging the two distinct masses → the worm stretches across the gap → the threshold
//     merges it INTO the incoming plate + pinches OFF the outgoing (the Gemini "morph blob
//     and meatball from one to another" read — a real two-mass metaball merge, NOT a single
//     plate sliding under a lens);
//   • the crisp content rides the EXISTING embla track UNFILTERED on top (text never passes
//     the goo threshold — feColorMatrix would mangle it).
//   • the drive is `useGooMorph(tokenPrefix: "carousel-goo", girthFloor: 0.85)` — on embla
//     `select` it `travel()`s the worm; on `scroll` (the live drag) it `drive()`s the worm
//     continuously off embla `scrollProgress()` (the drag-driven neck). The INERTIA is the
//     `--carousel-goo-flow` `--spring-*`-derived `linear()` + the `useLiquidFlex` squish,
//     NOT embla's flat scroll — the slide change carries weight.
//
// SAFARI / PRM: the goo filter is the regular `filter: url(#glass-goo)` graph (GlassGooFilter
// carries the WebKit-correctness facts); `@supports not (filter: url(#x))` drops the layer to
// a plain cross-fade floor; under reduce the goo layer is `display:none`, the worm snaps.
import type { WithClassAsProps, UnwrapRefCarouselApi } from "./interface";
import { computed, nextTick, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { cn } from "../../../utils";
import { useCarousel } from "./useCarousel";
import { useGooMorph } from "../../../composables/motion/useGooMorph";
import GlassGooFilter from "../../custom/goo-filter/GlassGooFilter.vue";

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<WithClassAsProps>();

const { carouselRef, carouselApi, orientation } = useCarousel();

const vertical = computed(() => orientation === "vertical");

// the content root (the user-gesture listen surface — any pointerdown/keydown inside the
// carousel is a DRIVER; the autoplay timer never dispatches a real DOM gesture).
const rootEl = ref<HTMLElement | null>(null);
// the goo silhouette layer host (the geometry origin + the `--goo-t` transition host),
// the traveling worm-plate, and the N resting plate silhouettes.
const gooLayerEl = ref<HTMLElement | null>(null);
const wormEl = ref<HTMLElement | null>(null);
const snapCount = ref(0);

// the N STATIC slide-PLATE silhouettes — the fixed metaball bodies the worm necks INTO
// and OUT OF (the plate-scale twin of the pager's static `goo-dot` pips). Keyed by slide
// index; positioned at each slide center by `placePlates()`.
const plateEls = new Map<number, HTMLElement>();
function setPlate(i: number, el: Element | null): void {
    if (el) plateEls.set(i, el as HTMLElement);
    else plateEls.delete(i);
}
// the per-slide list the template renders the static plates over.
const plateIndices = computed(() =>
    Array.from({ length: Math.max(0, snapCount.value) }, (_, i) => i),
);

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

/** The resting worm-plate extent (px) on the travel axis — the live slide width (the
 *  step is a good proxy for the slide pitch). */
function restSize(): number {
    const step = slideStep();
    return Math.max(24, step * 0.82);
}

/** Park each STATIC slide-plate silhouette at its slide center (compositor transform —
 *  one transform write, never a layout property). The plates are the fixed metaball
 *  bodies; the active plate dims (the WORM sits over it, so the merged read is the
 *  worm-into-plate neck, not two stacked masses). Only plates within ±1 slot of the
 *  ACTIVE are kept on-screen (the rest translate off the layer) so the goo region stays
 *  tight + the neck reads between the two relevant masses. */
function placePlates(): void {
    const host = gooLayerEl.value;
    if (!host) return;
    const r = host.getBoundingClientRect();
    const viewExtent = vertical.value ? r.height : r.width;
    const W = restSize();
    for (const [i, el] of plateEls) {
        const c = centerOf(i);
        if (c == null) continue;
        const near = Math.abs(i - activeIndex) <= 1;
        // park the plate at its center (transform-origin top/left → translate(center) then
        // -50% recenters); a far plate slides off the visible region (it never necks).
        if (vertical.value) {
            el.style.transform = `translateY(${c.toFixed(2)}px) translateY(-50%)`;
        } else {
            el.style.transform = `translateX(${c.toFixed(2)}px) translateX(-50%)`;
        }
        el.style.setProperty("--plate-w", `${W}px`);
        // dim the plate the worm is currently parked over (the active) so the worm's
        // full-presence mass reads above the plate bed; the off-screen plates hide.
        const onScreen = c > -W && c < viewExtent + W;
        el.style.opacity =
            i === activeIndex ? "0.42" : near && onScreen ? "1" : "0";
    }
}

const goo = useGooMorph({
    morphRef: wormEl,
    hostRef: gooLayerEl,
    vertical,
    centerOf,
    restSize,
    // a LOWER girth floor (0.74 vs the prior 0.85) so the neck PINCHES thinner cross-axis
    // mid-stretch — the decisive "two distinct blobs welling a neck and pinching" read the
    // Gemini-carousel reference implies (JUDGE-2 §3), not a warm tray with wavy edges. The
    // goo filter's fatter blur supplies the mass-to-mass meld so the floored neck still
    // reads as liquid, never a hairline thread.
    tokenPrefix: "carousel-goo",
    girthFloor: 0.74,
});

let activeIndex = 0;

/** Reserve the worm-plate footprint W = the live slide width (so the morph's scaleX =
 *  len/W lands on the correct base). Compositor-safe: a ONE-time `inline-size` reserve
 *  (the settled footprint writer), NEVER a per-frame layout property. */
function setWormGeometry(): void {
    const host = gooLayerEl.value;
    if (!host) return;
    host.style.setProperty("--carousel-worm-w", `${restSize()}px`);
    placePlates();
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
    }, 600);
}
// the carousel region (the `[data-slot="carousel"]` ancestor) — resolved on mount; the
// document-capture gesture gate flags only gestures originating inside it.
let region: Element | null = null;
function onUserGesture(e: Event): void {
    const t = e.target as Node | null;
    if (region && t && region.contains(t)) markUserDriven();
}

// the goo glass bridge fades IN during travel + OUT a beat after the morph settles.
let travelOffTimer: ReturnType<typeof setTimeout> | null = null;
function markTraveling(): void {
    const host = gooLayerEl.value;
    if (!host) return;
    host.setAttribute("data-traveling", "");
    // the calm-auto-motion seam: an auto-advance (no user signal) flags `data-autoplay` so
    // the `--motion-weight: 0` observer (CSS below) mutes the cartoon punch; a user swipe
    // clears it (the weighty driver reads the full punch).
    if (userDriven) host.removeAttribute("data-autoplay");
    else host.setAttribute("data-autoplay", "");
    if (travelOffTimer) clearTimeout(travelOffTimer);
    const durMs =
        (parseFloat(
            getComputedStyle(host).getPropertyValue("--carousel-goo-duration"),
        ) || 0.95) * 1000;
    travelOffTimer = setTimeout(() => {
        host.removeAttribute("data-traveling");
        travelOffTimer = null;
    }, durMs + 120);
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
    const last = Math.max(1, snapCount.value - 1);
    const prog = Math.min(1, Math.max(0, api.scrollProgress()));
    // mark traveling while mid-scroll (the live drag bridge); the timer clears it after
    // the settle so a momentum drag keeps the glass bridge alive then fades.
    if (prog > 0.001 && prog < 0.999) markTraveling();
    // re-park the static plates each drag frame so the neighbor plate the worm is necking
    // toward stays painted (the two-mass merge holds through a live drag).
    placePlates();
    goo.drive(prog * last);
}

function syncCount(): void {
    const api = carouselApi.value;
    // the SLIDE count (slideNodes) — robust to peek/basis layouts where the snap count
    // differs; the worm necks between slide centers read live off slideNodes().
    snapCount.value = api ? api.slideNodes().length : 0;
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
</script>

<template>
    <!-- The relative wrapper hosts the embla viewport + the goo overlay as SIBLINGS. The
         goo layer must NOT be a CHILD of `carouselRef` — embla-carousel-vue treats the
         viewport's FIRST child as its scroll container, so any sibling injected before the
         track breaks embla's layout (the track stops scrolling). The overlay is therefore
         an absolutely-positioned sibling OVER the viewport. -->
    <div ref="rootEl" class="carousel-content-root">
        <!-- the library goo <filter> mount (Safari-safe, static). ONE per carousel. The
             blur is bumped to 10 + the threshold steepened (slope 24 / offset -11) so the
             two plate fringes MELD into a fatter neck then the threshold PINCHES it off
             crisply — the decisive "two distinct blobs welling a neck and pinching" read
             (JUDGE-2 §3). STATIC literals (Safari-safe). -->
        <GlassGooFilter :blur="10" :threshold-slope="24" :threshold-offset="-11" />

        <!-- THE GOO SILHOUETTE LAYER — the traveling warm-cream worm-plate, wrapped in the
             static SVG goo filter. aria-hidden + pointer-events:none (the crisp track owns
             content + interaction). The worm sits at the active slide center; on
             select/drag it STRETCHES toward the neighbor, its blurred fringe wells up a
             warm-cream metaball NECK across the gap (the goo threshold), then pinches off +
             re-forms at the destination — the Gemini "morph blob and meatball" read. The
             layer opacity is the ONE translucency (the opaque-layer technique). -->
        <div
            ref="gooLayerEl"
            class="carousel-goo-layer"
            :class="orientation === 'vertical' ? 'carousel-goo-layer--vertical' : ''"
            aria-hidden="true"
        >
            <!-- THE N STATIC SLIDE-PLATE SILHOUETTES — the fixed metaball bodies the worm
                 necks INTO and OUT OF (the plate-scale twin of the pager's static goo-dots).
                 Parked at each slide center by placePlates(); the active one dims (the worm
                 sits over it). Without these there is only ONE mass and nothing to merge. -->
            <span
                v-for="i in plateIndices"
                :key="i"
                :ref="(el) => setPlate(i, el as Element | null)"
                class="carousel-goo-plate"
            />
            <!-- the traveling worm-plate — transform-driven (useGooMorph). It necks across
                 the gap, merging the outgoing plate into the incoming plate. -->
            <span ref="wormEl" class="carousel-goo-worm" />
        </div>

        <!-- THE EMBLA VIEWPORT — `carouselRef`; its ONLY child is the scroll track (NEVER
             inject a sibling before it — embla treats the first child as the container). -->
        <div
            ref="carouselRef"
            data-slot="carousel-content"
            class="carousel-viewport overflow-hidden"
        >
            <!-- THE CRISP CONTENT — the embla track, UNFILTERED, above the goo layer. -->
            <div
                :class="
                    cn(
                        'carousel-track flex',
                        orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                        props.class
                    )
                "
                v-bind="$attrs"
            >
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* The relative wrapper anchors the goo overlay over the embla viewport. */
.carousel-content-root {
    position: relative;
}
.carousel-viewport {
    position: relative;
    z-index: 1; /* the crisp slides above the goo overlay */
}

/* THE GOO SILHOUETTE LAYER — the translucent warm-GLASS metaball bridge that travels
   OVER the slides during the transition (z-index 2, above the crisp content). It is a
   LIQUID GLASS lens: warm-cream, NEVER gray (BA.W-NO-GRAY). At REST it is invisible
   (`opacity: 0`); while traveling (`[data-traveling]`) it fades to the morph opacity, so
   the worm-plate necks across the gap as a glassy bridge bending the content behind it.
   The goo filter merges the worm into ONE metaball silhouette. */
.carousel-goo-layer {
    position: absolute;
    inset: 0;
    z-index: 2; /* ABOVE the crisp slides — the glass bridge travels over them */
    pointer-events: none;
    filter: var(--carousel-goo-filter, url(#glass-goo)); /* the metaball merge */
    opacity: 0; /* invisible at rest; fades in only during travel */
    transition: opacity var(--duration-fast) var(--ease-out);
    /* the warm-cream glass ink (NEVER gray — BA.W-NO-GRAY): warm MATERIAL at the warm
       hue. The worm reads as a luminous warm-glass bridge, not a charcoal blob. */
    color: color-mix(in oklab, var(--card), white 8%);
    /* BD.W-CAROUSEL-DECK-GLASS §5 — the DRIVER weight. The carousel-Next/drag is a DRIVER
       (the user touched a pixel): full cartoon weight `--goo-weight: 1.0` → `--motion-weight`
       reads the SHIPPED cartoon-cast register. The `[data-autoplay]` ambient seam (below)
       zeroes it for calm auto-motion; PRM zeroes it too (the `--motion-weight: 0` carve). */
    --goo-weight: 1;
    --motion-weight: var(--goo-weight);
    will-change: transform, opacity; /* force a compositor layer — Safari re-raster */
    contain: layout style; /* scope restyle, NOT paint — `contain: paint` clips the
       metaball neck at the layer box (JUDGE-1 §3); the SVG filter region (-50%/200%) +
       the worm-peak span are what bound the goo, not a paint clip. */
    isolation: isolate; /* scope the filter, not the page */
    /* NO `overflow: clip` — the goo neck must extend past the gap to read between the two
       masses near the slide edges. The crisp embla viewport (z-index 1) is the legible
       content boundary; the goo bridge floats over it. */
}
/* BD.W-CAROUSEL-DECK-GLASS §5 — the CALM AUTO-MOTION seam. An auto-advance flags
   `data-autoplay` on the host (CarouselContent's `markTraveling`): zero `--motion-weight`
   so the cartoon-cast/punch self-extinguish — ambient drift never reads as a loud
   deliberate flip. A USER swipe clears the attr → the weighty driver punch returns. */
.carousel-goo-layer[data-autoplay] {
    --motion-weight: 0;
}
/* fade the glass bridge IN during travel — the morph opacity (a translucent warm lens
   so the slide content reads through the bridge). */
.carousel-goo-layer[data-traveling] {
    opacity: var(--carousel-goo-layer-opacity, 0.55);
}
/* BD.W-CAROUSEL-DECK-GLASS §4 — the moving CARTOON-CAST (REUSES the SHIPPED
   `--shadow-cartoon-*` warm cel stamp — DRY, no second shadow system). The cast must NOT
   live inside the goo-filtered layer (its `feColorMatrix` threshold would crush the soft
   shadow alpha), so it rides the NON-filtered `.carousel-content-root::before` and reads
   the goo host's weight via `:has()`. It PUNCHES opposite the morph direction (down-left,
   away from the upper-right `--glass-key`), scaled by `--goo-weight` (read off the goo host
   through `--motion-weight`), and snaps back on settle. Muted under `[data-autoplay]`/PRM. */
.carousel-content-root::before {
    content: "";
    position: absolute;
    inset: 12%;
    z-index: 0; /* behind the crisp viewport (z-1) + the goo layer (z-2) — the cel anchor */
    border-radius: var(--radius-card);
    pointer-events: none;
    box-shadow: var(--shadow-cartoon-md);
    /* the weight is read off the goo host (which owns `--goo-weight`/`--motion-weight` +
       the `[data-autoplay]` mute); the root mirrors it via the carousel-goo-weight echo. */
    --carousel-cast-travel: calc(6px * var(--carousel-cast-weight, 0));
    translate: calc(-1 * var(--carousel-cast-travel)) var(--carousel-cast-travel);
    opacity: 0; /* the cast lives with the travel gate */
    transition:
        translate calc(var(--duration-normal) * 1.15) var(--ease-cartoon-punch),
        opacity var(--duration-fast) var(--ease-out);
}
/* the gate: while the goo host travels, the cast PUNCHES in; an auto-advance host carries
   `[data-autoplay]` → the weight echo stays 0 (calm); a user swipe → full weight. */
.carousel-content-root:has(.carousel-goo-layer[data-traveling])::before {
    opacity: 1;
    --carousel-cast-weight: 1;
}
.carousel-content-root:has(.carousel-goo-layer[data-traveling][data-autoplay])::before {
    --carousel-cast-weight: 0; /* calm auto-motion — the ink anchor stays put */
}
/* THE DARK REGISTER — luminous warm transmissive glass, never a gray-brown halo.
   In dark mode `--card` is L≈0.30; the worm/plate radial-gradient reads it as
   currentColor and composites to a dim taupe HALO (effective L≈0.31). This `.dark`
   arm lifts the fill toward the WARM DARK-INK elevation register (W-DARK-MATERIAL):
   `oklch(from var(--card) 0.68 0.05 h)` keeps the warm hue (live H≈59°), pins L→0.68
   (the warm-ink elevation), and RE-SATURATES C→0.05 (~2.5× the BA.W-NO-GRAY STRONG
   floor) — a warm lift, NOT a gray `white N%` mix. The transmissive companion
   (`saturate(1.3) brightness(1.3)` appended AFTER `url(#glass-goo)` on the shorthand
   — plain CSS-filter functions, Safari-native, NOT in the SVG graph) makes the warm
   chroma read as LIT glass and pushes the composited mass over L 0.5 — a glowing
   warm membrane with the dark aurora glowing THROUGH it. */
.dark .carousel-goo-layer {
    color: oklch(from var(--card) 0.68 0.05 h);
    filter: var(--carousel-goo-filter, url(#glass-goo)) saturate(1.3)
        brightness(1.3);
}
.carousel-goo-layer--vertical {
    flex-direction: column;
    margin-inline-start: 0;
    margin-block-start: -1rem; /* mirror the vertical track's -mt-4 */
}

/* THE N STATIC SLIDE-PLATE SILHOUETTES — the fixed metaball bodies. FULL alpha (the goo
   threshold needs opacity:1; the layer opacity supplies the glass translucency). Parked at
   each slide center by placePlates() (transform translate). Same warm-cream domed-droplet
   fill as the worm so a worm-into-plate merge reads as ONE continuous warm mass. The
   per-plate opacity (active dims, off-screen hides) is written inline by placePlates. */
.carousel-goo-plate {
    position: absolute;
    top: 0;
    left: 0;
    inline-size: var(--plate-w, var(--carousel-worm-w, 60%));
    block-size: 100%;
    border-radius: var(--radius-card);
    background:
        radial-gradient(
            120% 90% at 50% 18%,
            color-mix(in oklab, currentColor, white 18%),
            currentColor 70%
        );
    transform-origin: center;
    opacity: 0; /* placePlates() sets the live presence (active 0.42 / neighbor 1 / off 0) */
    will-change: transform, opacity;
}

/* THE WORM-PLATE — the traveling opaque plate. It RESERVES a resting footprint ONCE
   (one plate cell); the travel + elongation are ALL transform (translate + scale),
   written by useGooMorph off the `--goo-t` flow. The squish reads `--stretch`
   reciprocally (axis-derived). NEVER an animated width/height (motion-canon P5). */
.carousel-goo-worm {
    position: absolute;
    top: 0;
    left: 0;
    /* the resting footprint W = the live slide width (written by `setWormGeometry` so the
       scaleX = len/W the morph computes lands on the correct base). Falls back to the
       layer width. transform-origin LEFT so the JS translate(center) translate(-50%)
       lands the worm center exactly. */
    inline-size: var(--carousel-worm-w, 100%);
    block-size: 100%;
    border-radius: var(--radius-card);
    /* FULL alpha (the goo merge needs opacity:1) — the warm-cream goo medium with a soft
       inner catch-light gradient so the bridge reads as a domed LIQUID GLASS droplet (the
       iOS-27 inner catch-light layer), not a flat fill. The layer opacity makes the whole
       bridge translucent (the six-layer optical read survives the merge threshold). */
    background:
        radial-gradient(
            120% 90% at 50% 18%,
            color-mix(in oklab, currentColor, white 18%),
            currentColor 70%
        );
    transform-origin: center;
    /* the volume-preserving travel-velocity swell — paired reciprocally, axis-derived
       (the SegmentedTabs indicator law). The worm transform carries the lenRatio scale;
       `--stretch` is the EXTRA velocity swell on top (released at arrival). */
    scale: var(--stretch, 1) calc(1 / var(--stretch, 1));
    will-change: transform;
}
.carousel-goo-layer--vertical .carousel-goo-worm {
    scale: calc(1 / var(--stretch, 1)) var(--stretch, 1);
}

/* THE CRISP CONTENT — the embla track, above the goo layer. */
.carousel-track {
    position: relative;
    z-index: 1;
}

/* @supports gate — on a non-supporting/buggy engine DROP the goo filter; the plates +
   worm-plate still cross-fade as the correct floor (no metaball merge). */
@supports not (filter: url(#glass-goo)) {
    .carousel-goo-layer {
        filter: none;
        opacity: 0; /* without the merge the bare plates would just be a flat bg block;
                       the crisp embla track is the legible floor on a gap engine. */
    }
}

@media (prefers-reduced-motion: reduce) {
    /* P6 — the goo layer is DROPPED (a static blur+threshold is pure cost with no travel
       to merge); the worm snaps (useGooMorph early-returns). The crisp embla scroll is
       the legible floor; only the embla translate survives (no goo, no squish). */
    .carousel-goo-layer {
        display: none;
        /* zero the cartoon weight in ONE assignment (the cast travel collapses to rest). */
        --motion-weight: 0;
    }
}
</style>
