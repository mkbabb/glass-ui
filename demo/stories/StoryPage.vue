<script setup lang="ts">
import { computed, inject, provide, watch } from "vue";
import { cn } from "@glass/utils/cn";
import { TooltipProvider } from "@glass/components/ui/tooltip";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { SECTION_REVEAL_KEY, useSectionReveal } from "./useSectionReveal";
import { STORY_NESTED_KEY } from "./story-nested";
// BG.W-STORY-PAGE-API (§4-D) — the demo SUB-TYPE field context. StoryPage provides
// its manifest-declared background (the warm field every demo floats over) so a
// nested sub-type (chiefly <DemoStage>) reads "what field am I over?" WITHOUT
// mounting a second GL context (the one-GL-per-route budget).
import { DEMO_FIELD_KEY } from "../chassis/subtype-context";
import StoryHero from "./StoryHero.vue";
import StoryHeader from "./StoryHeader.vue";

// BG.W-DEMO-IA-REDESIGN — the family-collapse nesting seam. When this StoryPage is
// a MEMBER inside a `<FamilyTabs>` family page (which provides STORY_NESTED_KEY), it
// renders BARE — just its slot body, dropping the hero/chrome header + the
// route-enter <article> — so the family page owns the ONE identity header over N
// member bodies (no doubled hero <h1>, no second route-enter root).
const nested = inject(STORY_NESTED_KEY, false);

interface StoryPageProps {
    /** Override the max-width on the content section. */
    contentClass?: string;
    /**
     * Whether the chassis renders the display-register hero <h1> on a hero page
     * (AZ.W-SUFFUSE D2-1). Default `true`. A bespoke front-door composition
     * (intro / hero / auth-shell) that hand-authors its own hero <h1> sets
     * `:hero-title="false"` so the chassis does not double the title.
     */
    heroTitle?: boolean;
    /**
     * BC.W-PAGE-HIERARCHY — the section-delimiter chassis affordance (Part B).
     * Default `true`: consecutive top-level body sections are separated by a
     * visible hairline rule on the dark-adaptive `--configurator-divider` token
     * (so the seam survives the dark glass plate — CLAUDE.md §BA.W-CONFIG-CHASSIS),
     * applied AUTOMATICALLY by the chassis (no per-SFC hand-rolled `<hr>`). A page
     * whose body is its OWN single composition (a bento landing, a front-door
     * grid, a scene with a bespoke interior) sets `:delimited="false"` so the
     * chassis draws no inter-section seams. The user's "delimit sections with hr
     * lines OR in different cards" bar (USER-DEFECTS §C) — the `hr` mode.
     */
    delimited?: boolean;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    heroTitle: true,
    delimited: true,
});

const { current } = useStoryNavigation();

const eyebrow = computed(() => {
    const loc = current.value;
    if (!loc) return null;
    return `${loc.category.title} · ${loc.story.title}`;
});

const title = computed(() => current.value?.story.title ?? "");
// BG.W-HERO-FIT — the MANDATORY short hero wordmark from the manifest row. The
// chassis hero <h1> renders `displayTitle ?? title`; the chrome page-title (and
// the nav/breadcrumb eyebrow) keep the semantic `title`.
const displayTitle = computed(() => current.value?.story.displayTitle);
const blurb = computed(() => current.value?.story.blurb);

// The page declares its background + register on its manifest row; the chassis
// reads it once and renders the body inside a glass card over that substrate.
const background = computed(() => current.value?.story.background);
const variant = computed<"hero" | "page">(() =>
    current.value?.story.hero ? "hero" : "page",
);

// BC.W-PAGE-CHASSIS — the explicit subpath chip + the depth-keyed hero rung resolve
// from the manifest row (the binding per-route table) and thread to the chassis.
const subpath = computed(() => current.value?.story.subpath ?? null);
const heroScale = computed(() => current.value?.story.heroScale ?? "4");
const depth = computed(() => current.value?.story.depth);

// BG.W-SECTION-TYPEWRITER-FADEUP — the ONE shared section-reveal observer, minted
// ONCE at the page chassis + provided to every descendant StorySection (which
// injects it and arms its own heading on mount). The scroller is the AppShell
// `<main>.demo-main-scroller` route port (resolved lazily — the DOM exists by the
// time a section mounts). A route change is fed through `onRouteSettle` (in-app
// nav lands top:0 with no scroll event; the rAF sweep reveals any above-fold
// section); the F5/reload adverse-order strand is closed inside the composable.
const { register, onRouteSettle } = useSectionReveal(() =>
    typeof document === "undefined"
        ? null
        : document.querySelector<HTMLElement>("main.demo-main-scroller"),
);
provide(SECTION_REVEAL_KEY, register);
// The page field the demo sub-type chassis reads (BG.W-STORY-PAGE-API §4-D).
provide(DEMO_FIELD_KEY, background);
watch(current, () => onRouteSettle());
</script>

<template>
    <!-- BG.W-DEMO-IA-REDESIGN — the BARE nested body. When this StoryPage is a member
         inside a `<FamilyTabs>` family page, it renders ONLY its slot body (the member's
         own sections) — no hero/chrome header, no route-enter <article> — so the family
         page owns the ONE identity header. Zero member content re-authored. -->
    <div v-if="nested" class="story-nested-body">
        <slot />
    </div>
    <!-- BG.W-ROUTE-TRANSITION — the routed page presents a SINGLE ELEMENT root (this
         <article>) so the AppShell bare keyed `<component class="route-enter">` swap can
         apply the `.route-enter` on-mount entrance to it (a fragment/text-only root
         would not receive the class — the element root is the load-bearing requirement).
         <TooltipProvider> renders a context-only FRAGMENT (no DOM), so it is nested
         INSIDE the <article> root (same tooltip context to all descendants, zero
         layout/visual change). -->
    <article
        v-else
        class="story-page-article mx-auto w-full"
        :data-variant="variant"
        :style="{
            maxInlineSize:
                variant === 'page'
                    ? 'var(--story-article-w)'
                    : 'var(--story-page-max-inline)',
        }"
    >
        <TooltipProvider :delay-duration="250">
            <!-- BG.W-ROUTE-TRANSITION: the route-enter entrance. The <article> is the
             keyed `<component class="route-enter">` root, so the whole page rises +
             fades in as ONE on-mount `@keyframes gl-route-enter` beat (transitions.css)
             — NOT the retired per-child `.scroll-build` stagger (which raced the deleted
             AppShell <Transition> leave window). The reading-ORDER is carried by the
             StoryHero cluster's own eyebrow→title→blurb 3-stage stagger
             (`.story-hero-cluster--enter`, W-HIERARCHY2) inside <StoryHero>; on a HERO
             page the chrome header is suppressed (the descriptor re-homed into that
             cluster). A pure @keyframes-on-mount — NO setTimeout — so the entrance never
             races the AppShell scroll-to-top reset. PRM → keeps the fade, drops the
             rise (the .route-enter reduce arm). -->
        <!-- W-STORY-PAGE-STANDARD — the box-model INVERSION. On a CONTENT page the
             article WIDENS to `--story-article-w` (min(96vw, 87rem) — the φ ladder
             root, killing the prior 1152-cap 288px dead margin) so the page's own
             φ²-dominant glass cels (the slotted `.story-cels` children below) can
             HOIST out of the prose measure as direct article children (a fixed-width
             hoist, NO cqw, NO container-type — the dock-collapse-scar-safe form). A
             HERO page keeps the bounded `--story-page-max-inline` rhythm (the monolith
             StoryHero hero plate is the alive front-door read, untouched). -->
        <!-- BC.W-STORYBOOK-META — the bounded article rhythm survives on the HERO
             path (axis-3); the content path widens to the φ-ladder root. -->
            <!-- BC.W-PAGE-CHASSIS — the chrome <header> hosts the AUDACIOUS hero cluster
                 on a CONTENT page (variant="page"): the ONE standardized page idiom
                 (the user-mandate uniformity — EVERY page carries the LARGE audacious
                 title + the explicit Fira-Code subpath chip that SHRINKS ON SCROLL).
                 The cluster is the StoryHeader unit in reading order (eyebrow → subpath
                 → display <h1> → blurb), the display <h1> at the per-route depth-keyed
                 `heroScale` rung (≥ text-display-4 — the prior text-title 32.9px chrome
                 title is RETIRED), wrapped in the `.story-hero-shrink` sticky register
                 so it shrinks into a slim sticky header on scroll (the iOS-27 large-title
                 collapse). On a HERO page this whole chrome header is suppressed — the
                 descriptor is re-homed INTO the StoryHero cluster over the live field
                 (the D1-4 double-<h1> suppression). -->
            <header v-if="variant === 'page'" :style="{ '--i': 0 }">
                <StoryHeader
                    :eyebrow="eyebrow"
                    :subpath="subpath"
                    :blurb="blurb"
                    class="story-hero-cluster story-hero-shrink"
                    :data-depth="depth"
                >
                    <!-- BD.W-CUT page-chrome — the chrome/hero SCALE SPLIT. The
                         CONTENT-page chrome title is a CALM page LABEL, NOT the
                         protagonist rung: it reads `--chrome-title-rung` (~½ the
                         audacious, the φ^2 display band) via `.story-hero-title`
                         under the chrome <header> (story-hero.css). The prior
                         `text-display-${heroScale}` floor (≥4, ~109px) is RETIRED
                         off the chrome title (clean break, no alias) — the
                         audacious heroScale ladder survives ONLY on the protagonist
                         hero <h1> (variant="hero", StoryHero.vue). -->
                    <h1
                        v-if="title"
                        class="story-hero-title story-hero-title--enter story-chrome-title"
                    >
                        {{ title }}
                    </h1>
                </StoryHeader>
            </header>

            <!-- W-STORY-PAGE-STANDARD — the CONTENT-page body is the box-model
                 INVERSION: NOT one monolith gray StoryHero card with flat sections
                 inside, but a stack of FREE glassy cels (the page's own slotted
                 `.story-cels` children) floating DIRECTLY over the ONE shared warm
                 field ([data-paper-field], mounted globally in AppShell). The cels are
                 hoisted OUT of any prose wrapper (they are direct children of this
                 section, so a wide cel can bleed to the wide article without a cqw
                 container) — each cel transmits the field and carries the warm cartoon
                 cast. The eyebrow + blurb + title live in the chrome <header> above
                 (ONE title); this body owns no second header. -->
            <!-- BG.W-CHASSIS-ADOPT-OR-RETIRE consumed: the retired DemoFrame cel
                 chassis + its retired stylesheet (the punch-arc `--i` mount-stagger)
                 are GONE (zero-importer, retired per proof:demo). The body-cel
                 entrance now rides the ONE `<article>` `.route-enter` on-mount beat
                 above (the whole page rises + fades as one) — NOT a per-cel
                 view-timeline (`.scroll-cascade`), which would miss the above-the-fold
                 protagonist and double-bind the cel. The stack is the calm DELIMITED
                 rhythm (each cel its own glass plate, so no inter-section hairline is
                 needed — the cels ARE the delimiters). -->
            <section
                v-if="variant === 'page'"
                class="story-cels flex flex-col"
                :style="{ gap: 'var(--story-page-section-gap)', '--i': 1 }"
                :class="props.contentClass"
            >
                <slot />
            </section>

            <!-- The HERO page keeps the alive StoryHero front-door read — the
                 monolith glass card floating over the LIVE substrate (the
                 full-bleed aurora/constellation/fourier field IS the page bg). The
                 chassis hosts the ordered eyebrow→title→blurb cluster (the re-homed
                 descriptor) alongside the audacious display <h1>. UNTOUCHED. -->
            <StoryHero
                v-else
                :background="background"
                :variant="variant"
                :title="title"
                :display-title="displayTitle"
                :eyebrow="eyebrow"
                :subpath="subpath"
                :blurb="blurb"
                :hero-scale="heroScale"
                :depth="depth"
                :hero-title="props.heroTitle"
                :style="{ '--i': 0 }"
            >
                <!-- BG.W-HERO-FIT — forward the page's bespoke #title-ornament (the
                     ℱ wordmark) into the ONE chassis <h1>. Absent on most pages → the
                     forwarded slot renders nothing (zero layout change). -->
                <template #title-ornament>
                    <slot name="title-ornament" />
                </template>
                <!-- BB.W-SCROLL-MOTION: the orchestrated section-CASCADE host
                     (supersedes the bare BA.W-ANIMATE `[data-scroll-reveal]` 6px
                     fade — a clean break, no parallel alias). Each direct child (a
                     StorySection block) builds in on entry via its OWN view()
                     timeline keyed off the <main> scroller — the implicit stagger,
                     NO setTimeout cascade — but the entrance is now the spring-clocked
                     coupled transform+opacity build (the SOTA coordinated cascade,
                     scroll-choreography.css `.scroll-cascade`). PRM → static terminal
                     state + non-supporting engines the static layout (the recipe's
                     outer @media + @supports gate). -->
                <!-- BC.W-PAGE-HIERARCHY (Part B) — the section-delimiter chassis
                     affordance. `.story-sections--delimited` draws a visible
                     hairline on the dark-adaptive `--configurator-divider` token
                     BETWEEN consecutive top-level body sections (the `> * + *`
                     adjacent-sibling seam), so the page reads as cleanly DELIMITED
                     sections — never an undelimited gap-stack where every block
                     blurs into the next (USER-DEFECTS §C). The seam is a hairline
                     whisper (the `.glass-menu-section` register precedent), reading
                     the dark-adaptive token so it survives the dark glass plate —
                     NEVER an inline `border-border/N` alpha. The delimiter sits
                     INSIDE the `.scroll-cascade` build (it does not re-author the
                     section-entrance). -->
                <!-- BC.W-STORYBOOK-META — the inter-section gap is the tokenized
                     rhythm (`--story-page-section-gap`, was the hardcoded `gap-10`)
                     so every page's section cadence is the SAME measured rhythm
                     (axis-3; the meta-gate asserts ≥ this minimum, no cramped page). -->
                <!-- BG.W-SECTION-TYPEWRITER-FADEUP — the page-level `.story-sections`
                     DROPS `.scroll-cascade`: the cascade moved DOWN into each
                     StorySection's `.story-section__body` so the two disjoint
                     sibling registers (heading per-glyph reveal × body cascade)
                     never double-bind a whole-section slide over a per-child one.
                     The delimiter seam + the section-gap rhythm are unchanged. -->
                <section
                    class="story-sections flex flex-col"
                    :style="{ gap: 'var(--story-page-section-gap)' }"
                    :class="
                        cn(
                            props.delimited && 'story-sections--delimited',
                            props.contentClass,
                        )
                    "
                >
                    <slot />
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>
