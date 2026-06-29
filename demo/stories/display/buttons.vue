<script setup lang="ts">
// BB.W-DEMO-DESIGN — the buttons pane: the BG-2 staging fix + the CTA-presence
// inversion fix. The glass-button rows (glass / glass-wash / primary-audacious /
// gold-audacious + the raw .glass-btn row) are staged over a LIVE field via
// `<ShowcaseFrame tier="field">` (the glass-over-field host the BG-2 black-plate
// kill was minted for — display→paper is a static-wash route, so the paper wash
// reads THROUGH the glass instead of an opaque bg-card plate occluding it; ONE
// route, no added GL context). The W-BUTTON-GLASS material (the W55 oklab darken +
// `contrast-color()` flip + the squishy press + the .glass-lens refraction edge) is
// then VISIBLE over the busy backdrop. The CTA inversion is fixed: the primary-
// audacious CTA leads in a focal hero row at `size="lg"` ABOVE the destructive
// register. The opaque-atom rows (default/destructive/outline/secondary) stay on
// the opaque specimen host (they have no glass to refract — the field is for the
// glass variants only). The press-squish rides the LIBRARY <Button> / .glass-btn
// press register (tap-squish + useSpringPress), never a demo-local fork.
import StoryPage from "../StoryPage.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import { Button } from "@glass/components/ui/button";
import { cn } from "@glass/utils/cn";
import { Aurora } from "@glass/components/custom/aurora";
import { PRESETS } from "../aurora/presets";

const pressed = ref(false);

const vizButtons = [
    { id: "fourier", label: "Fourier", bg: "bg-viz-fourier" },
    { id: "chebyshev", label: "Chebyshev", bg: "bg-viz-chebyshev" },
    { id: "legendre", label: "Legendre", bg: "bg-viz-legendre" },
] as const;

// The OPAQUE-ATOM variants — they stay on the opaque specimen host (no glass to
// refract). The glass variants (glass / glass-wash) move to the field stage below.
const opaqueVariants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "accent",
    "ghost",
    "ai",
    "link",
] as const;

const glassVariants = ["glass", "glass-wash"] as const;

const sizes = ["xs", "sm", "default", "lg"] as const;
</script>

<template>
    <StoryPage>
        <!-- THE FOCAL CTA — the primary-audacious "Launch sequence" CTA leads the
             pane (the page's protagonist), out-presenting the destructive register
             by focal placement + scale + the lit-glass material over the live field.
             The CTA-presence inversion (destructive louder than the protagonist) is
             fixed by construction: the CTA is FIRST, framed, LARGE; destructive is a
             quiet specimen below. -->
        <section class="flex flex-col gap-4">
            <p class="section-label">Display · Buttons</p>
            <h2 class="text-title">Launch the sequence</h2>
            <p class="text-small max-w-prose text-muted-foreground">
                The headline CTA — a calm liquid-glass button with the
                <code class="fira-code">--glass-specular</code> edge catch-light and a
                restrained <code class="fira-code">--scale-hover-btn</code> lift on the
                library's spring register. Staged over the live field so the lit glass reads.
            </p>
            <!-- BD §3 SPIKE (the buttons-invisible fix) — the glass CTAs staged over a
                 COLORFUL AURORA field so the lit glass actually READS. Warming the glass
                 alone (W-GLASS-ABROGATE-GRAY) is INSUFFICIENT: glass over a flat cream
                 page is invisible-by-construction (the blur has nothing to bend). The
                 demo's own thesis ("staged over the live field so the lit glass reads")
                 was unmet because there was NO field. ONE GL context (within budget).
                 Validates W-PAGE-BACKGROUND (colorful field MANDATORY for glass demos). -->
            <div class="relative overflow-hidden rounded-card">
                <Aurora
                    :config="PRESETS.OPENAI_SKY"
                    :opacity-ceiling="0.72"
                    class="absolute inset-0 pointer-events-none"
                    aria-hidden="true"
                />
                <div class="relative z-10 flex flex-wrap items-center gap-4 p-10">
                    <Button variant="primary-audacious" size="lg">Launch sequence</Button>
                    <Button variant="gold-audacious" size="lg">Next →</Button>
                </div>
            </div>
        </section>

        <!-- THE GLASS VARIANTS — staged over the live field (BG-2 fix). The glass
             material refracts the paper wash behind it instead of collapsing to a
             pale lozenge on an opaque plate. -->
        <StorySection
            heading="Glass register"
            blurb="The glass + glass-wash variants over the page field — lit glass over the busy backdrop, not a pale lozenge on a flat plate."
        >
            <ShowcaseFrame tier="field" pad="lg">
                <div class="flex flex-wrap items-center gap-3">
                    <Button v-for="v in glassVariants" :key="v" :variant="v">{{ v }}</Button>
                    <Button
                        :aria-pressed="pressed"
                        variant="glass"
                        @click="pressed = !pressed"
                    >
                        {{ pressed ? "Pressed" : "Toggle" }}
                    </Button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- THE RAW .glass-btn ROW — also staged over the field so the icon button's
             real backdrop blur reads. The press-squish + the W-LENSING lens-swell
             ride the LIBRARY .glass-btn :active register. -->
        <StorySection
            heading="Raw .glass-btn utility"
            blurb="Circular icon button from glass.css, staged over the field. The press scale + lens-swell ride the library register; supports aria-pressed and :disabled."
        >
            <ShowcaseFrame tier="field" pad="lg">
                <div class="flex flex-wrap items-center gap-3">
                    <button class="glass-btn" aria-label="plus"><span aria-hidden>+</span></button>
                    <button class="glass-btn" aria-label="minus"><span aria-hidden>&minus;</span></button>
                    <button class="glass-btn" aria-pressed="true" aria-label="star">
                        <span aria-hidden>&#9733;</span>
                    </button>
                    <button class="glass-btn" disabled aria-label="disabled">&times;</button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <!-- THE OPAQUE-ATOM VARIANTS — they have no glass to refract, so they stay on
             the opaque specimen host (the W54 legibility allowlist surface). The
             destructive register sits here as a quiet specimen, NOT the page's loud
             protagonist (the CTA inversion fixed — the CTA above out-presents it). -->
        <StorySection
            heading="Opaque variants"
            blurb="The solid-atom variants on the opaque specimen host. The destructive register is a quiet specimen here, never the page protagonist."
        >
            <div class="flex flex-wrap gap-3">
                <Button v-for="v in opaqueVariants" :key="v" :variant="v">{{ v }}</Button>
            </div>
        </StorySection>

        <StorySection
            heading="Sizes"
            blurb="Default variant across the size scale."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button v-for="size in sizes" :key="size" :size="size">size · {{ size }}</Button>
            </div>
        </StorySection>

        <StorySection
            heading="Four-state contract"
            blurb="Rest, hover, active, disabled, and aria-pressed. Hover and active emerge from pointer interaction — shown simulated for reference."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button>Rest</Button>
                <Button class="bg-[var(--glass-bg-resting)] border-[var(--glass-border-resting)]">Hover (sim.)</Button>
                <Button class="scale-[0.97]">Active (sim.)</Button>
                <Button disabled>Disabled</Button>
            </div>
        </StorySection>

        <StorySection
            heading="Chromatic · viz basis"
            blurb="Fourier / Chebyshev / Legendre — the three basis hues the library exposes as bg-viz-* utilities."
        >
            <div class="flex flex-wrap gap-3">
                <Button
                    v-for="v in vizButtons"
                    :key="v.id"
                    :class="cn(v.bg, 'text-zinc-900 shadow-cartoon hover:shadow-cartoon-hover hover:-translate-x-px hover:-translate-y-px')"
                >
                    {{ v.label }}
                </Button>
            </div>
        </StorySection>

        <StorySection
            heading="Cartoon shadow"
            blurb="The library's signature treatment: a hard offset shadow plus a 1px translate on hover."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Button
                    variant="outline"
                    class="bg-card shadow-cartoon transition-transform duration-fast ease-out hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover"
                >
                    Lift on hover
                </Button>
                <Button variant="outline" class="bg-card shadow-cartoon-sm">sm</Button>
                <Button variant="outline" class="bg-card shadow-cartoon-md">md</Button>
                <Button variant="outline" class="bg-card shadow-cartoon-lg">lg</Button>
            </div>
        </StorySection>
    </StoryPage>
</template>
