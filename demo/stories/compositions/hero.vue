<script setup lang="ts">
// compositions/hero — the DISTINCT composition showcase (BC.W-COMPOSITIONS-HERO).
//
// This page was a near-verbatim clone of the front-door (`/foundations/intro`): the
// same sequential-typing intro headline + a §01/§02/§03 three-claim grid. The user:
// "/compositions/hero has the EXACT same content as the homepage." So it is re-authored
// with content that is compositions' OWN — a showcase of the real composition specimens
// the band actually carries (the dashboard / auth-shell / math-paper / form scenes), at
// the audacious tier over its own field, the D2 MAIN of the compositions section.
//
// It hand-authors ONE audacious `text-display-hero` <h1> (`:hero-title="false"` so the
// chassis does not double it — the one-<h1> discipline) + a curated bento grid of
// <SectionPreviewCard>s linking the real scenes (each with an inline preview). The
// homepage-clone typewriter + the 3-claim grid + the "View the source"/CTA buttons are
// RETIRED (clean break, no alias). The per-category hue (forest — compositions) lives in
// the IconChip + eyebrow ONLY; the title + body stay warm ink (the one-color-event rule).
import StoryPage from "../StoryPage.vue";
import SectionPreviewCard from "../SectionPreviewCard.vue";
import { categoryHue } from "../category-hero";
import {
    LayoutDashboard,
    KeyRound,
    Sigma,
    SlidersHorizontal,
    ShieldCheck,
    FileQuestion,
} from "@lucide/vue";

// The forest section hue (compositions) is the ONE color event — every card's IconChip
// + the eyebrow read it; the audacious title + the bento bodies stay warm ink.
const hue = categoryHue("compositions");

// The curated showcase — the real scenes the compositions band carries (manifest
// `compositions` category). Each card links its route + carries its own distinct glyph
// (all on the ONE forest hue — distinct glyph, not a per-card rainbow) + an inline
// non-text preview thumbnail. NOT the homepage typewriter, NOT a §01/§02/§03 claims
// grid — the things compositions actually IS.
const scenes = [
    {
        id: "settings",
        title: "Settings dashboard",
        blurb: "A grouped settings shell — sectioned controls over the blueprint grid.",
        subpath: "/compositions/settings",
        icon: LayoutDashboard,
    },
    {
        id: "auth-shell",
        title: "Auth shell",
        blurb: "A full-bleed sign-in scene — glass card centred over the live field.",
        subpath: "/compositions/auth-shell",
        icon: KeyRound,
    },
    {
        id: "math-paper",
        title: "Math paper",
        blurb: "The warm-cream paper idiom — section-accent rail + Fira-Code math block.",
        subpath: "/compositions/math-paper",
        icon: Sigma,
    },
    {
        id: "form-validation",
        title: "Form validation",
        blurb: "The user-invalid / user-valid rungs, the aria-invalid bridge, an error slot.",
        subpath: "/compositions/form-validation",
        icon: ShieldCheck,
    },
    {
        id: "configurator",
        title: "Configurator studio",
        blurb: "Preset row + grouped layers + a live specimen stage — aurora's real consumer.",
        subpath: "@mkbabb/glass-ui/configurator",
        icon: SlidersHorizontal,
    },
    {
        id: "empty-states",
        title: "Empty states",
        blurb: "A contained GooBlob mascot — the pointer-leaning companion for a blank scene.",
        subpath: "/compositions/empty-states",
        icon: FileQuestion,
    },
];
</script>

<template>
    <!-- :hero-title="false" — this main hand-authors its own audacious <h1>, promoted
         to the document <h1>, so the chassis does not double it (one-<h1> discipline). -->
    <StoryPage :hero-title="false">
        <!-- The compositions hero sits glass-first over the live constellation the
             chassis renders behind this card. ONE audacious `text-display-hero` moment
             (the D2 main rung) — the ℱ ornament is an inline serif accent, NOT a
             typewriter sequence. The eyebrow carries the ONE color event (forest); the
             title + the prose stay warm ink. -->
        <section class="px-2 py-12 md:px-6 md:py-20">
            <p class="text-admin-label mb-8 text-muted-foreground">
                <span class="fourier-f italic">ℱ</span> compositions · real scenes
            </p>

            <h1 class="text-display-hero mb-8 max-w-5xl text-foreground">
                Real scenes, assembled from the parts.
            </h1>

            <p class="text-prose max-w-2xl text-foreground/80">
                Dashboards, auth shells, the math-paper idiom — the components composed
                into the surfaces they were built for. Warm cream, cartoon offset shadows,
                translucent glass over a grain underpaint; the golden-ratio scale carries
                every heading.
            </p>
        </section>

        <!-- The composition specimen grid — one SectionPreviewCard per real scene, each
             linking its route WITH an inline non-text preview (the chassis affordance;
             never a text-only link). The forest hue is the ONE color event — every chip
             reads it; the bodies stay warm ink. -->
        <section class="mt-16">
            <p class="text-admin-label mb-4 text-muted-foreground">The scenes</p>
            <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                <SectionPreviewCard
                    v-for="(scene, idx) in scenes"
                    :key="scene.id"
                    :to="scene.subpath.startsWith('/') ? scene.subpath : `/compositions/${scene.id}`"
                    :title="scene.title"
                    :blurb="scene.blurb"
                    :subpath="scene.subpath"
                    :icon="scene.icon"
                    :section="hue"
                    :lead="idx === 0"
                >
                    <template #preview>
                        <div class="composition-scene-thumb">
                            <component
                                :is="scene.icon"
                                :size="34"
                                :stroke-width="1.5"
                            />
                        </div>
                    </template>
                </SectionPreviewCard>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
/* The budget-safe scene thumbnail — a bounded inert glyph-over-tint render (no GL, no
   second live context — the one-GL-per-route budget; the constellation field the chassis
   paints is the page's ONE live context). */
.composition-scene-thumb {
    display: grid;
    place-items: center;
    block-size: 7rem;
    color: color-mix(in oklab, var(--foreground), transparent 55%);
}
</style>
