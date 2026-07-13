<script setup lang="ts">
// StoryHero — the page-redesign container. Wraps a story page's body in a GLASS
// CARD floating OVER a per-page background substrate. The glass card reads
// glass-first by default (the library's default register), so a page composing
// this DEMONSTRATES the glass it ships: a translucent card over a live aurora /
// constellation field or a liquid-grid, or a quiet paper / blueprint-grid wash.
//
// A page declares its background ONCE on its manifest row (`background:`); the
// page chassis (`StoryPage`) reads that descriptor and passes it here. Two
// registers:
//   - variant="page" (default) — a contained glass card over a calm background;
//     the universal shape every content page wears.
//   - variant="hero"           — a full-bleed glassy hero card floating over the
//     live substrate; the front-door demonstration.
import { computed, ref, watch } from "vue";
import { Card, type CardTier } from "@glass/components/ui/card";
import { Aurora } from "@glass/components/custom/aurora";
import { Constellation } from "@glass/components/custom/constellation";
import { LiquidGrid } from "@glass/components/custom/liquid-grid";
import { LIQUID_GRID_PRESET_SUFFUSE } from "../../stories/substrates/presets";
import { useTokenColor } from "@glass/composables/dom/useTokenColor";
import { useRoutePointer } from "@glass/composables/motion/useRoutePointer";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";
import { cn } from "@glass/utils/cn";
import StoryHeader from "./StoryHeader.vue";
import {
    heroAuroraConfig,
    type HeroPaletteKey,
    type StoryBackground,
} from "./aurora-hero";

interface StoryHeroProps {
    /** The declared background substrate (string shorthand or a tuned object). */
    background?: StoryBackground;
    /** "page" (default) contains the body in a glass card over a calm wash;
     *  "hero" goes full-bleed over the live substrate (the front-door read). */
    variant?: "hero" | "page";
    /** The page title. On a HERO page the chassis renders it as the document
     *  <h1> at the DISPLAY register (AZ.W-SUFFUSE D2-1) — the audacious moment
     *  is a chassis affordance, not per-page bespoke craft. On a page-variant
     *  the chrome <h1> is StoryPage's job (this prop is ignored). */
    title?: string;
    /**
     * BG.W-HERO-FIT (D10, P4-C) — the MANDATORY short hero wordmark. The chassis
     * <h1> renders `displayTitle ?? title`, so a front-door composition declares a
     * SHORT wordmark that fits the height-aware fit-cap; the semantic `title` stays
     * the long nav/breadcrumb label. Unset → the chassis renders `title`.
     */
    displayTitle?: string;
    /**
     * Whether the chassis renders the display-register hero <h1> (AZ.W-SUFFUSE
     * D2-1). Default `true` — the thin substrate hero pages (aurora /
     * constellation / fourier-field / glass-material / paper-glass) that
     * hand-author NO title gain the audacious chassis <h1>. A bespoke
     * front-door composition (intro / hero / auth-shell) that owns its own
     * hero <h1> sets `:hero-title="false"` so the chassis does not double it.
     */
    heroTitle?: boolean;
    /**
     * The mono eyebrow (category · story). On a HERO page the chassis re-homes
     * it into the ordered StoryHeader cluster ABOVE the display <h1>
     * (BB.W-HIERARCHY2 — the reading-order inversion fix); StoryPage suppresses
     * the chrome-header eyebrow on the hero path so the descriptor is shown ONCE.
     */
    eyebrow?: string | null;
    /**
     * The supporting blurb. On a HERO page the chassis re-homes it into the
     * StoryHeader cluster UNDER the display <h1> (the subordinate rung), never
     * split across the chrome/card boundary (BB.W-HIERARCHY2).
     */
    blurb?: string | null;
    /**
     * The explicit Fira-Code subpath chip (BC.W-PAGE-CHASSIS). Threaded to
     * StoryHeader, rendered beneath the eyebrow as the route identity.
     */
    subpath?: string | null;
    /**
     * The hero title size rung (BC.W-PAGE-CHASSIS — the depth-keyed √φ ladder). The
     * hardcoded `text-display-3` is retired; every route resolves a rung ≥ `4`. The
     * `heroClass` computed maps this onto `text-display-${heroScale}`.
     */
    heroScale?: "audacious" | "mega" | "hero" | "5" | "4";
    /** The page-depth tier — passed through for the scroll-shrink + the data-attr. */
    depth?: "D0" | "D1" | "D2" | "D3";
    /** Forwarded class string for the glass card surface. */
    cardClass?: string;
}

const props = withDefaults(defineProps<StoryHeroProps>(), {
    variant: "page",
    heroTitle: true,
    heroScale: "4",
});

// BC.W-PAGE-CHASSIS — the hero <h1> size class off the depth-keyed √φ ladder. The
// hardcoded `text-display-3` (the user-mandate-RETIRED floor) is replaced by the
// per-route `heroScale` rung — `text-display-{4,5,mega,hero,audacious}` (≥4 always).
const heroClass = computed(() => `text-display-${props.heroScale}`);

// BG.W-HERO-FIT (D10, P4-C) — the chassis hero <h1> renders the MANDATORY short
// `displayTitle` when declared, else the semantic `title`. The short wordmark is
// the LOAD-BEARING fix: it fits the height-aware fit-cap without hyphenation at
// 375px, where the long semantic title would wrap + hyphenate. The semantic
// `title` stays the nav/breadcrumb/search label (those read `.title`, never this).
const heroDisplayTitle = computed(() => props.displayTitle ?? props.title);

// The chassis hero <h1> renders at the DISPLAY register on a hero page that has
// not opted out (the bespoke front-door heroes own their own title). The rung is
// the per-route depth-keyed `heroScale` (≥ text-display-4 — BC.W-PAGE-CHASSIS; the
// prior hardcoded text-display-3 is RETIRED), the audacious moment on EVERY page.
const showHeroTitle = computed(
    () => isHero.value && props.heroTitle && Boolean(heroDisplayTitle.value),
);

// BB.W-HIERARCHY2 — the ordered StoryHeader cluster renders on a HERO page,
// re-homing the eyebrow + blurb (out of StoryPage's chrome <header>) into ONE
// coherent unit alongside the display <h1> so the reading order is
// eyebrow → title → blurb, never split across the chrome/card boundary. The
// cluster shows whenever the hero band has ANY rung to host (the display title,
// an eyebrow, or a blurb). A bespoke front-door hero (:hero-title="false") owns
// its own header, so its eyebrow/blurb stay in StoryPage's chrome header (the
// content-page reading-order shape — already correct).
const showCluster = computed(
    () =>
        isHero.value &&
        props.heroTitle &&
        Boolean(heroDisplayTitle.value || props.eyebrow || props.blurb),
);

// Normalize the string-shorthand and the object form to one shape.
const descriptor = computed(() => {
    const b = props.background;
    if (!b) return null;
    if (typeof b === "string") return { kind: b } as const;
    return b;
});

const kind = computed(() => descriptor.value?.kind ?? null);

// The Aurora palette — a declared palette, or the brand default.
const auroraPalette = computed<HeroPaletteKey>(() => {
    const d = descriptor.value;
    const p = d && "palette" in d ? d.palette : undefined;
    return (p as HeroPaletteKey | undefined) ?? "rose-indigo-amber";
});

const auroraConfig = computed(() => heroAuroraConfig(auroraPalette.value));

// BA.W-STAGE scope 3 (BG-4) — the contained-live-substrate dark register lift. A
// contained aurora/constellation is the `-z-10` field behind a `wash`/`quiet` card;
// in DARK the W-DARK-MATERIAL near-black page beneath it + the card's wash tint over
// it WASH the field to a dull brown-grey at the light-tuned ceiling. The dark arm
// lifts the ceiling so the contained field READS as the painterly drift it is (the
// FULL-BLEED hero already reads — it's the boxed contained register this fixes). An
// explicit per-page `intensity` always wins (the consumer override is honored).
const { isDark } = useGlobalDark();

// BI.W-FIELD-CORE / BI.W-CONSTELLATION-DEDUPE — the interactive-BACKGROUND standard. StoryHero is
// the ROUTE chassis, so it installs the ONE capture-phase window pointer broadcaster
// (`useRoutePointer`) per route + PROVIDES it. Every full-bleed `pointer-events:none` background viz
// below reads this one instance and feeds its own field — the canvases stay `pointer-events:none`
// (they cannot listen for themselves), yet the backgrounds react to the pointer:
//   - Constellation reads it via `:background-interactive` (a SUBTLE well over the shared field).
//   - Aurora is threaded HERE via `setCursor` (the cursor-swirl attractor; no aurora-component edit).
const route = useRoutePointer();

// The aurora full-bleed background reads the route pointer via its `setCursor` seam (the cursor
// mechanism is W-FIELD-CORE's; this only FEEDS it). The canvas stays `pointer-events:none` — the
// broadcaster captures at the window, so the aurora never occludes the page. A modest strength keeps
// the background swirl subtle; the aurora field smooths it. `active === false` (PRM / off-viewport)
// relaxes the swirl.
const auroraRef = ref<InstanceType<typeof Aurora> | null>(null);
watch([() => route.pointer.value, () => route.active.value], ([pointer, active]) => {
    if (kind.value !== "aurora") return;
    auroraRef.value?.setCursor(pointer.x, pointer.y, active ? 0.6 : 0);
});

// The per-page opacity ceiling — how far back the live substrate recedes behind
// the card content. A hero sits richer; a contained page sits quieter; DARK lifts
// both so the field is not suppressed by the near-black page + the wash tint.
const opacityCeiling = computed(() => {
    const d = descriptor.value;
    if (d && "intensity" in d && typeof d.intensity === "number") {
        return d.intensity;
    }
    if (isDark.value) {
        // The dark lift — a contained field needs more presence to read against
        // the deepened page. Full-bleed heroes already read (the field IS the page
        // bg) so the lift is gated to the CONTAINED case; the bleed hero keeps the
        // calmer ceiling so the headline scrim still reads over it.
        if (fullBleed.value) return props.variant === "hero" ? 0.6 : 0.4;
        return props.variant === "hero" ? 0.78 : 0.62;
    }
    return props.variant === "hero" ? 0.6 : 0.4;
});

// Resolve --primary to a concrete color so the constellation overlay can paint
// it (a Canvas2D fill cannot resolve a var()). Re-resolves on a dark flip.
const { value: focalColor } = useTokenColor("--primary", { fallback: "#1c1714" });

// The constellation focal pulse — a glass-ui-toned ring on node[0].
function drawFocal(
    ctx: CanvasRenderingContext2D,
    field: { nodes: { x: number; y: number }[]; k: number },
    now: number,
): void {
    const focal = field.nodes[0];
    if (!focal) return;
    const k = field.k;
    const phase = (now % 2600) / 2600;
    ctx.strokeStyle = focalColor.value;
    ctx.globalAlpha = (1 - phase) * 0.5;
    ctx.lineWidth = 1.4 * k;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, (12 + phase * 22) * k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, 15 * k, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = focalColor.value;
    ctx.beginPath();
    ctx.arc(focal.x, focal.y, 4.2 * k, 0, Math.PI * 2);
    ctx.fill();
}

const isHero = computed(() => props.variant === "hero");

// A GooBlob is a CONTAINED creature (aspect-ratio:1), NOT a full-bleed page-field
// like the aurora/constellation drift surfaces — so it is NOT a story
// background kind (W-BLOB-REBUILD: the prior `blob` page-background was a category
// error that blew the contained creature out to the full article width and buried
// the page). The blob's home is its contained studio + the empty-states mascot.
const liveBackdrop = computed(
    () =>
        kind.value === "aurora" ||
        kind.value === "constellation" ||
        kind.value === "liquid-grid",
);

// The suffusion liquid-grid config (a near-invisible large-pitch slow-warp grid behind
// page content — the §E site-wide subtle background; presets-in-consumers).
const liquidGridConfig = LIQUID_GRID_PRESET_SUFFUSE;

// A STATIC declared backdrop — the calm blueprint-grid / paper-grain wash. Not a
// live GL field, but a real declared background that is the WHOLE-PAGE wash BEHIND
// the content.
const staticBackdrop = computed(() => kind.value === "grid" || kind.value === "paper");

// ── Full-bleed hero (W-SB-REVERIFY — B16/B22) ────────────────────────────────
// A HERO page over a LIVE substrate paints the field FULL-BLEED behind the WHOLE
// page (the substrate IS the page background — the user's bar: "no sub-container
// on pages like this"). The boxed-card model trapped the substrate inside a glass
// plate that double-washed it to invisible; here the substrate escapes to
// `position: fixed; inset: 0` (the full-bleed fixed-inset idiom) so it fills the
// viewport behind the page header AND the content, and the content sits DIRECTLY
// over the live field on a thin readability plate — no boxing, no wash-out.
//
// BI.W-AUTH-SHELL-BG — a BESPOKE composition (`heroTitle: false` — it hand-authors
// its OWN hero <h1> AND its OWN complete layout) ALSO floats its content directly,
// NEVER inside a chassis card, even over a STATIC wash. auth-shell is the case: it
// retired its 4.87MP live-fourier page-bg for a calm `grid` wash, and its self-owned
// split-panel composition must not be double-framed by a StoryHero card. The live
// heroes (hero.vue/constellation) already float via `liveBackdrop`; this adds the
// static-wash bespoke case (the ONLY `heroTitle: false` static hero is auth-shell).
const fullBleed = computed(
    () =>
        isHero.value &&
        (liveBackdrop.value || (staticBackdrop.value && !props.heroTitle)),
);

// BC.W-GRID-SIMPLE — the BACKGROUND-mount full-bleed condition. The crisp grid /
// paper wash gets the SAME `.story-hero-bg--bleed` (`position: fixed; inset: 0`)
// escape the live substrates have, so the static grid is the WHOLE-PAGE background
// BEHIND the content — NOT a `-z-10` layer clipped inside the rounded `.story-hero`
// box (the "WTF clipped" / "NOT displayed in the card" defect dead). DISTINCT from
// `fullBleed`: `fullBleed` ALSO switches the content to the no-card bleed-content
// float (the LIVE hero read), while a static grid keeps its normal card — the grid
// is the page background, the card a separate plate OVER it, NOT a thin wash card the
// grid reads (and blurs) THROUGH.
const bgFullBleed = computed(() => fullBleed.value || staticBackdrop.value);

// ── The read-through seam (W-SB-STAGE §2.1a / AZ.W-SUFFUSE D4-3) ──────────────
// Over a LIVE substrate the card drops to a THINNER glass rung so the field reads
// THROUGH it. BC.W-GRID-SIMPLE — the STATIC grid / paper backdrops NO LONGER take
// the wash/quiet drop: the crisp grid is now the WHOLE-PAGE full-bleed wash BEHIND
// the content (`bgFullBleed`), NOT a faint underlay the card reads through, so a
// `backdrop-filter: blur()` `wash` plate over it would Gaussian-blur the crisp grid
// lines into the "blurry mess" the user condemned. The static-backdrop card stays on
// its opaque-enough default tier (`floating` hero / `resting` page) — a separate
// plate OVER the page grid, de-blurred by construction. The wash/quiet drop survives
// ONLY for the LIVE substrate read-through. Over NO declared background the tier is
// BYTE-IDENTICAL to HEAD (`floating` hero / `resting` page) — the default-path canary.
const cardTier = computed<CardTier>(() => {
    if (liveBackdrop.value) return isHero.value ? "quiet" : "wash";
    return isHero.value ? "floating" : "resting";
});

// ── BG.W-CORNER-ALIAS-KILL — the bleed layer escapes the route subtree ────────
// A `.story-hero-bg--bleed` layer is `position: fixed; inset: 0` and MUST size to
// the VIEWPORT — but mounted inside the route article it is silently re-parented
// whenever ANY ancestor carries a transform/filter/containment (the `.route-enter`
// entrance held a filled identity transform FOREVER → the "viewport" wash sized to
// the ARTICLE box: an opaque square-cornered plate behind the rounded card — the
// white corner wedges). The bleeding arm therefore TELEPORTS to `<body>`: a
// viewport-fixed field layer NEVER rides inside a (transiently transformed) route
// subtree — correct from frame 0, immune to any future ancestor promotion. The
// boxed arm keeps its in-place `-z-10` seat (`:disabled`). Every token the layers
// read (`--grid-*`, `--story-paper-wash`, the substrate knobs) is `:root`-declared,
// so the teleport loses nothing from the cascade.
const bgTeleported = computed(() =>
    liveBackdrop.value ? fullBleed.value : bgFullBleed.value,
);
</script>

<template>
    <div
        class="story-hero"
        :data-variant="variant"
        :data-full-bleed="bgFullBleed ? 'true' : null"
    >
        <!-- Per-page background substrate. A full-bleed hero pins it
             `position: fixed; inset: 0` (the `.story-hero-bg--bleed` modifier) so
             the live field IS the page background behind the header AND content;
             a contained page keeps it boxed behind the card (`-z-10` inset).
             BG.W-CORNER-ALIAS-KILL — a BLEEDING arm teleports to <body>: a
             viewport-fixed layer inside the route subtree is silently re-parented
             by ANY transformed/contained ancestor (the trapped square-cornered
             wash behind the rounded card — the white corner wedges); the boxed
             arm stays in place (`:disabled`). -->
        <Teleport to="body" :disabled="!bgTeleported">
            <Aurora
                v-if="kind === 'aurora'"
                ref="auroraRef"
                :config="auroraConfig"
                :opacity-ceiling="opacityCeiling"
                :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
                aria-hidden="true"
            />
            <Constellation
                v-else-if="kind === 'constellation'"
                seed="glass-ui"
                :count="56"
                :link="140"
                :opacity-ceiling="opacityCeiling"
                :draw-overlay="drawFocal"
                background-interactive
                :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
            />
            <!-- The SUFFUSION register: a near-invisible LIQUID liquid-grid full-bleed behind
             page content (NOT boxed in the card — the `.story-hero-bg--bleed` escape; the
             "not displayed in the card" fix). The static `grid` kind below stays the
             zero-GL default. -->
            <LiquidGrid
                v-else-if="kind === 'liquid-grid'"
                :config="liquidGridConfig"
                :class="cn('story-hero-bg', fullBleed && 'story-hero-bg--bleed')"
            />
            <!-- BC.W-GRID-SIMPLE — the static crisp grid / paper wash mounts FULL-BLEED
             (`.story-hero-bg--bleed` → `position: fixed; inset: 0`) so it is the
             WHOLE-PAGE background BEHIND the content, NOT a `-z-10` layer clipped
             inside the rounded `.story-hero` and NOT read through a blurred `wash`
             card. The crisp `.grid-bg` recipe (story-hero.css) reads the shared
             `--grid-*` rhythm. -->
            <div
                v-else-if="kind === 'grid'"
                :class="
                    cn('story-hero-bg grid-bg', bgFullBleed && 'story-hero-bg--bleed')
                "
                aria-hidden="true"
            />
            <div
                v-else-if="kind === 'paper'"
                :class="
                    cn(
                        'story-hero-bg story-bg-paper paper-grain-overlay',
                        bgFullBleed && 'story-hero-bg--bleed',
                    )
                "
                aria-hidden="true"
            />
        </Teleport>

        <!-- Full-bleed hero — the content floats DIRECTLY over the live field on a
             thin readability plate (no card box, no double-wash). The W55
             `--glass-backdrop: light` bucket keeps the prose AA over the bright
             drift. -->
        <div
            v-if="fullBleed"
            :style="{ '--glass-backdrop': 'light' }"
            :class="cn('story-hero-bleed-content', cardClass)"
        >
            <!-- BB.W-HIERARCHY2 — the ordered StoryHeader cluster (eyebrow → the
                 display <h1> → blurb, top-to-bottom; the reading-order inversion
                 fixed). The audacious chassis hero <h1> at the DISPLAY register
                 (D2-1) is the cluster's single dominant focal moment; it fade-RISES
                 on the SETTLE register (the `.story-hero-title--enter` keyframe
                 rides --ease-out, NO overshoot — audacious type arrives with
                 GRAVITY, not bounce; PRM → static terminal state). The eyebrow +
                 blurb ride the same GRAVITY register as the cluster's 3-stage
                 stagger (story-hero.css).
                 BD.W-VIZ-BROKEN-FIX D5 — the hero cluster on a HERO/substrate-viz
                 page is `.story-hero-scroll-away`, NOT `.story-hero-shrink`: a giant
                 `text-display-hero` word that STUCK over the viz is the verbatim
                 defect ("the hero text should NOT scroll like this on every page").
                 The viz IS the content here, so the title scrolls UP AND OFF with the
                 body (it does not stick), the field owns the viewport. The sticky
                 large-title-collapse stays the CONTENT-page chrome header's register
                 (StoryPage.vue, variant="page"), where a slim sticky header is genuine
                 nav. -->
            <StoryHeader
                v-if="showCluster"
                :eyebrow="eyebrow"
                :subpath="subpath"
                :blurb="blurb"
                class="story-hero-cluster story-hero-scroll-away"
                :data-depth="depth"
            >
                <h1
                    v-if="showHeroTitle"
                    :data-hero-scale="heroScale"
                    :class="cn('story-hero-title story-hero-title--enter', heroClass)"
                >
                    <!-- BG.W-HERO-FIT — the #title-ornament slot carries a page's
                         bespoke inline ornament (the ℱ wordmark) INSIDE the ONE
                         chassis <h1>, so a front-door composition customizes the
                         title CONTENT without forking the <h1> + its fit-cap. -->
                    <slot name="title-ornament" />{{ heroDisplayTitle }}
                </h1>
            </StoryHeader>
            <slot />
        </div>

        <!-- Contained page / non-live hero — the body sits inside a glass card.
             Glass-first by default; over a LIVE substrate the card takes a THINNER
             rung + the W55 bucket so the field reads through and prose stays AA. -->
        <Card
            v-else
            :tier="cardTier"
            :style="liveBackdrop ? { '--glass-backdrop': 'light' } : undefined"
            :class="
                cn(
                    'story-hero-card',
                    isHero ? 'story-hero-card--hero' : 'story-hero-card--page',
                    liveBackdrop && 'story-hero-card--live',
                    cardClass,
                )
            "
        >
            <!-- BB.W-HIERARCHY2 — the ordered StoryHeader cluster (eyebrow → the
                 display <h1> → blurb, top-to-bottom; the reading-order inversion
                 fixed). The audacious chassis hero <h1> at the DISPLAY register
                 (D2-1) is the cluster's single dominant focal moment; it fade-RISES
                 on the SETTLE register (the `.story-hero-title--enter` keyframe
                 rides --ease-out, NO overshoot — audacious type arrives with
                 GRAVITY, not bounce; PRM → static terminal state). The eyebrow +
                 blurb ride the same GRAVITY register as the cluster's 3-stage
                 stagger (story-hero.css).
                 BD.W-VIZ-BROKEN-FIX D5 — the hero cluster on a HERO/substrate-viz
                 page is `.story-hero-scroll-away`, NOT `.story-hero-shrink`: a giant
                 `text-display-hero` word that STUCK over the viz is the verbatim
                 defect ("the hero text should NOT scroll like this on every page").
                 The viz IS the content here, so the title scrolls UP AND OFF with the
                 body (it does not stick), the field owns the viewport. The sticky
                 large-title-collapse stays the CONTENT-page chrome header's register
                 (StoryPage.vue, variant="page"), where a slim sticky header is genuine
                 nav. -->
            <StoryHeader
                v-if="showCluster"
                :eyebrow="eyebrow"
                :subpath="subpath"
                :blurb="blurb"
                class="story-hero-cluster story-hero-scroll-away"
                :data-depth="depth"
            >
                <h1
                    v-if="showHeroTitle"
                    :data-hero-scale="heroScale"
                    :class="cn('story-hero-title story-hero-title--enter', heroClass)"
                >
                    <!-- BG.W-HERO-FIT — the #title-ornament slot carries a page's
                         bespoke inline ornament (the ℱ wordmark) INSIDE the ONE
                         chassis <h1>, so a front-door composition customizes the
                         title CONTENT without forking the <h1> + its fit-cap. -->
                    <slot name="title-ornament" />{{ heroDisplayTitle }}
                </h1>
            </StoryHeader>
            <slot />
        </Card>
    </div>
</template>
