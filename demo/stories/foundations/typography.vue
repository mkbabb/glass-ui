<script setup lang="ts">
// BB.W-DEMO-DESIGN — the type pane as an EDITORIAL TYPE SPECIMEN, not a flat
// 18-row label/sample table. It leads with ONE focal display word, ACTIVATES the
// audacious mega/hero/audacious tiers the library is proud of (the fast.com peg —
// they were never even shown before), then lays the graded ladder as a designed
// rhythm over the calm grid/paper wash (the StoryHero `cardTier` drop-through the
// `foundations→paper` manifest default declares). The body-pane CASCADE rides
// StoryPage's `.scroll-cascade` host (W-SCROLL-MOTION — each StorySection builds in
// on its own view() timeline; no demo-local @keyframes). The ONE color event is
// the TYPE itself — the ladder stays ink, the wash is the calm neutral grid (the
// one-color-event proportion held).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { cn } from "@glass/components/_shared/class-names";

// The graded display ladder — display → body → admin rail, as a DESIGNED rhythm.
const ladder: { cls: string; label: string; sample: string }[] = [
    { cls: "text-display-5", label: "display-5", sample: "Golden" },
    { cls: "text-display-4", label: "display-4", sample: "Audacious" },
    { cls: "text-display-3", label: "display-3", sample: "Ornament" },
    { cls: "text-display-2", label: "display-2", sample: "Plus Jakarta" },
    { cls: "text-display", label: "display", sample: "Display" },
    { cls: "text-title", label: "title", sample: "Section title" },
    { cls: "text-heading", label: "heading", sample: "Subsection head" },
    { cls: "text-subheading", label: "subheading", sample: "Card title" },
    { cls: "text-prose", label: "prose", sample: "Long-form reading sits at prose — φ line-height, Plus Jakarta Sans." },
    { cls: "text-body", label: "body", sample: "Body copy uses Plus Jakarta Sans at 1rem, 1.5 leading." },
    { cls: "text-small", label: "small", sample: "Metadata and secondary body copy." },
    { cls: "text-caption", label: "caption", sample: "Caption · labels · hints" },
    { cls: "text-micro", label: "micro", sample: "Micro: badges, fine print" },
    { cls: "text-admin-label", label: "admin-label", sample: "ADMIN · UPPERCASE · MONO" },
    { cls: "text-math", label: "math", sample: "f(x) = ∑ aₙ φₙ(x)" },
    { cls: "text-math-body", label: "math-body", sample: "KaTeX-adjacent body math" },
    { cls: "text-mono-small", label: "mono-small", sample: "npm run dev" },
    { cls: "text-mono-caption", label: "mono-caption", sample: "mono · caption · caps" },
];

// The audacious peaks — the tiers the flat table never showed (the visual-load-
// bearing-by-activation rule: the top tiers earn their place by being ACTIVATED
// on a real surface; the type pane is a legitimate consumer). Each is a real ACTIVATED
// specimen, not a label row.
const peaks: { cls: string; label: string; peg: string; word: string }[] = [
    { cls: "text-display-audacious", label: "display-audacious", peg: "352px peak — the fast.com number", word: "352" },
    { cls: "text-display-hero", label: "display-hero", peg: "287px peak — the front-door hero", word: "Hero" },
    { cls: "text-display-mega", label: "display-mega", peg: "177px peak — the metric value", word: "Mega" },
];
</script>

<template>
    <StoryPage>
        <!-- THE FOCAL SPECIMEN — one audacious display word leads the pane. The
             type IS the experience (the ONE color event is the type itself; it
             stays ink so the ladder, the peaks, and the wash never compete). The
             focal word rides the W-SCROLL-MOTION cascade (StoryPage's .scroll-
             cascade host) on its own view() timeline. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">Foundations · Typography</p>
            <div class="text-display-audacious text-foreground">
                Aa
            </div>
            <p class="text-small max-w-prose text-muted-foreground">
                A golden-ratio (√φ) type scale in Plus Jakarta Sans — from the
                fast.com-peg display peaks down to the mono admin rail. The display
                register is a chassis affordance; the ladder below grades, never
                cliffs.
            </p>
        </section>

        <!-- THE AUDACIOUS PEAKS — the mega/hero/audacious tiers ACTIVATED as real
             specimens (the library is proud of these; the flat table never showed
             them). Each is its own focal word, clipped to the frame so the peak
             reads as the experience it is. -->
        <StorySection heading="Audacious peaks">
            <div class="flex flex-col gap-6">
                <ShowcaseFrame
                    v-for="p in peaks"
                    :key="p.label"
                    tier="field"
                    pad="lg"
                    :caption="`.${p.cls} · ${p.peg}`"
                >
                    <div>
                        <span
                            :class="cn(p.cls, 'text-foreground')"
                        >{{ p.word }}</span>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <!-- THE GRADED LADDER — a designed rhythm, NOT a label/sample table. The
             label is a quiet mono caption ABOVE its sample (a designed stack), the
             sample reads ink at full size, the rungs flow over the calm wash. -->
        <StorySection heading="The graded ladder">
            <ShowcaseFrame tier="quiet" pad="lg">
                <div class="flex flex-col gap-6">
                    <div
                        v-for="row in ladder"
                        :key="row.label"
                        class="flex flex-col gap-1"
                    >
                        <span class="text-mono-caption text-muted-foreground">{{
                            row.label
                        }}</span>
                        <span :class="cn(row.cls, 'text-foreground')">{{
                            row.sample
                        }}</span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- The signature glyph — the one designed moment, lifted onto ShowcaseFrame. -->
        <StorySection heading="Signature glyph">
            <ShowcaseFrame tier="field" pad="xl" caption=".fourier-f — Plus Jakarta Sans display italic, viz-fourier red">
                <div class="flex flex-col items-center gap-3">
                    <div class="fourier-f text-display-5">ℱ</div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
