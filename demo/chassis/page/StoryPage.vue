<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TooltipProvider } from "@glass/components/tooltip";
import { useScrollChrome } from "@glass/composables/motion/scroll/useScrollChrome";
import StoryBodyRenderer from "../body/StoryBodyRenderer.vue";
import StoryHeader from "../hero/StoryHeader.vue";
import StoryHero from "../hero/StoryHero.vue";
import TransitionRouteLink from "../TransitionRouteLink.vue";
import { STORY_NESTED_KEY } from "../family/story-nested";
import { useStoryNavigation } from "../useStoryNavigation";
import type { StoryBody } from "../body/story-body";

interface StoryPageProps {
    contentClass?: string;
    /** A bespoke composition that supplies its own h1 opts out of the chassis title. */
    heroTitle?: boolean;
    /** Optional data-driven body for uniform specimen pages. */
    body?: StoryBody;
}

const props = withDefaults(defineProps<StoryPageProps>(), {
    heroTitle: true,
});

const nested = inject(STORY_NESTED_KEY, false);
const route = useRoute();
const { current } = useStoryNavigation();

const title = computed(() => current.value?.story.title ?? "");
const displayTitle = computed(() => current.value?.story.displayTitle);
const blurb = computed(() => current.value?.story.blurb);
const background = computed(() => current.value?.story.background);
const heroScale = computed(() => current.value?.story.heroScale ?? "4");
const depth = computed(() => current.value?.story.depth);
const variant = computed<"hero" | "page">(() =>
    current.value?.story.hero ? "hero" : "page",
);

// ── THE PAGE CHROME THAT SHRINKS (BK #73 W-SCROLL-SHRINK) ────────────────────
//
// The ≥50-say edict names five clauses for every page — title, subtitle,
// scroll-to-shrink, glass-card, procedural background — and four of them landed
// years of waves ago. This is the fifth, which had ZERO sites: the only near-hit
// in the whole repo was a comment in the dock's density sheet.
//
// It is an ADOPTION, not a mint. `useScrollChrome` IS the collapse-state machine
// and `.scroll-chrome` IS its compositor recipe; the reader's own doc-record names
// "a page header" as one of the four chromes it exists for. Seating it here — in
// the chassis, once — is what makes the clause true of every ordinary story rather
// than of one bespoke page.
const chromeEl = ref<HTMLElement | null>(null);

// The route scroller is `<main>`. The shell says so in one place ("`<main>` owns
// route scroll now — the shell itself is a fixed viewport frame") and the layout
// canon pins that scroller to the `main` grid area, so resolving the port by the
// ELEMENT rather than by `.demo-main-scroller` reads the same law without the
// chassis learning a shell-private class name. Resolved once on mount, from the
// chrome's own position in the tree; the reader re-attaches when it arrives.
const scrollPort = ref<HTMLElement | null>(null);
onMounted(() => {
    scrollPort.value = chromeEl.value?.closest("main") ?? null;
});

// Collapse is the explicit opt-in — the machine is persistent by default (the
// iOS-27 lesson it carries in its own header). Every other figure it takes is the
// library's ruled default: the collapse range, the snap midpoint, the shrink and
// rise depths are all decided in `scroll-chrome.css`, and a consumer that restates
// one has written a second definition that will drift from the first.
//
// A hero route has no chrome (the `<header>` is `v-if`-ed away), so `chromeEl`
// stays null, nothing is ever written, and `collapseT` rests at 0. The reader
// still attaches its ONE passive rAF-coalesced listener on those routes; that is
// the machine's shape, not a defect this chassis should route around with a second
// mechanism.
useScrollChrome(scrollPort, { collapseOnScroll: true, chromeRef: chromeEl });
</script>

<template>
    <!-- Family members contribute only their body; the family route owns identity. -->
    <div v-if="nested" class="story-nested-body">
        <slot />
        <StoryBodyRenderer v-if="props.body?.kind === 'sections'" :body="props.body" />
    </div>

    <!-- The article is this story's WINDOW: the route grammar flies the tapped card onto
         this rect, and flies it back off the same one. §9.5's "stops at the content
         column's gutter" is not a rule we enforce here — it is what naming the ARTICLE
         rather than `<main>` means. -->
    <!-- ONE article width, not two. The old inline `:style` branched between
         `--story-article-w` (declared nowhere on disk, so it resolved to the
         initial value and the cap was silently absent on every ordinary story) and
         `--story-page-max-inline` (72rem). An inline style also outranks any sheet,
         so the article's width was unreachable from CSS by construction. The
         article law in `layout.css` caps it once at `--article-max`. -->
    <article
        v-else
        class="story-article w-full"
        :data-route-window="route.path"
        :data-variant="variant"
    >
        <TooltipProvider :delay-duration="250">
            <!-- Ordinary stories keep identity quiet: one title, one lede.
                 It is also the page CHROME (#73): it sticks to the top of the
                 route scroller and shrinks as content rises past it, on the
                 library's `.scroll-chrome` recipe. -->
            <header
                v-if="variant === 'page'"
                ref="chromeEl"
                class="story-page-chrome scroll-chrome"
            >
                <!-- The return leg. Without it the grammar's `collapse` class is
                     unreachable from any story — an unbuilt constant behind a green
                     gate — and a reader who arrived by tapping a cell has no way back
                     to the section but the browser's own button. -->
                <TransitionRouteLink
                    v-if="current"
                    :to="`/${current.category.id}`"
                    class="focus-ring interactive-item transition-control text-small text-muted-foreground inline-flex w-fit items-center gap-1 hover:text-foreground"
                >
                    <span aria-hidden="true">&#8592;</span>
                    {{ current.category.title }}
                </TransitionRouteLink>
                <StoryHeader
                    :blurb="blurb"
                    class="story-hero-cluster"
                    :data-depth="depth"
                >
                    <h1
                        v-if="title"
                        data-route-label
                        class="story-hero-title story-chrome-title"
                    >
                        {{ title }}
                    </h1>
                </StoryHeader>
            </header>

            <!-- THE CEL FIELD. The inline `gap` binding is gone: an inline style
                 wins over the sheet, so the field's own gap could never apply while
                 it was there — the field would have been a grid with a
                 flex-column's rhythm. -->
            <section
                v-if="variant === 'page'"
                class="story-cels"
                :class="props.contentClass"
            >
                <slot />
                <StoryBodyRenderer
                    v-if="props.body?.kind === 'sections'"
                    :body="props.body"
                />
            </section>

            <!-- True hero routes keep their subject-specific field or ornament. -->
            <StoryHero
                v-else
                :background="background"
                :title="title"
                :display-title="displayTitle"
                :blurb="blurb"
                :hero-scale="heroScale"
                :depth="depth"
                :hero-title="props.heroTitle"
            >
                <template #title-ornament>
                    <slot name="title-ornament" />
                </template>

                <section class="story-sections" :class="props.contentClass">
                    <slot />
                </section>
            </StoryHero>
        </TooltipProvider>
    </article>
</template>
