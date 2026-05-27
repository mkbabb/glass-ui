<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { cn } from "../../../src/utils/cn";

const pressed = ref(false);

const vizButtons = [
    { id: "fourier", label: "Fourier", bg: "bg-viz-fourier" },
    { id: "chebyshev", label: "Chebyshev", bg: "bg-viz-chebyshev" },
    { id: "legendre", label: "Legendre", bg: "bg-viz-legendre" },
] as const;

const coreVariants = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "accent",
    "ghost",
    "glass",
    "glass-wash",
    "ai",
    "link",
] as const;

const sizes = ["xs", "sm", "default", "lg"] as const;
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Variants</h2>
            <p class="text-small text-muted-foreground">
                Every <code class="fira-code">buttonVariants</code> entry at default size.
            </p>
            <div class="flex flex-wrap gap-3">
                <Button v-for="v in coreVariants" :key="v" :variant="v">{{ v }}</Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Audacious primary CTA</h2>
            <p class="text-small text-muted-foreground">
                The K.W6 HEADLINE variant. Disco-grain + specular highlight at rest,
                sparkle-sweep on hover. Recipe lifted from
                <code class="fira-code">dock.css</code>'s
                <code class="fira-code">data-tier="primary"</code> with phase-tinting
                dropped — the canonical variant is bound to <code class="fira-code">--primary</code>.
                Reduced-motion suppresses the sparkle.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="primary-audacious" size="lg">Launch sequence</Button>
                <Button variant="primary-audacious">Get started</Button>
                <Button variant="primary-audacious" disabled>Disabled</Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Gold audacious CTA</h2>
            <p class="text-small text-muted-foreground">
                AN.R0 D9 — primary-CTA with gold sweep shimmer on hover.
                Reuses the <code class="fira-code">btn-audacious</code> glass substrate
                (sparkle + ripple) plus a translucent gold gradient sweep via
                <code class="fira-code">btn-audacious-gold</code>. Reduced-motion suppresses
                the sweep; static gold tint remains.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="gold-audacious" size="lg">Next →</Button>
                <Button variant="gold-audacious">Submit</Button>
                <Button variant="gold-audacious" disabled>Disabled</Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Sizes</h2>
            <p class="text-small text-muted-foreground">
                Default variant across the size scale.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Button v-for="size in sizes" :key="size" :size="size">size · {{ size }}</Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Four-state contract</h2>
            <p class="text-small text-muted-foreground">
                Rest, hover, active, disabled, and <code class="fira-code">aria-pressed</code>.
                Hover and active emerge from pointer interaction — shown simulated for reference.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Button>Rest</Button>
                <Button class="bg-primary/90">Hover (sim.)</Button>
                <Button class="scale-[0.97]">Active (sim.)</Button>
                <Button disabled>Disabled</Button>
                <Button
                    :aria-pressed="pressed"
                    variant="glass"
                    @click="pressed = !pressed"
                >
                    {{ pressed ? "Pressed" : "Toggle" }}
                </Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Raw .glass-btn utility</h2>
            <p class="text-small text-muted-foreground">
                Circular icon button from <code class="fira-code">glass.css</code>, rendered
                bare. Supports <code class="fira-code">aria-pressed</code> and
                <code class="fira-code">:disabled</code> out of the box.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <button class="glass-btn" aria-label="plus"><span aria-hidden>+</span></button>
                <button class="glass-btn" aria-label="minus"><span aria-hidden>&minus;</span></button>
                <button class="glass-btn" aria-pressed="true" aria-label="star">
                    <span aria-hidden>&#9733;</span>
                </button>
                <button class="glass-btn" disabled aria-label="disabled">&times;</button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Chromatic · viz basis</h2>
            <p class="text-small text-muted-foreground">
                Fourier / Chebyshev / Legendre — the three basis hues the library exposes as
                <code class="fira-code">bg-viz-*</code> utilities.
            </p>
            <div class="flex flex-wrap gap-3">
                <Button
                    v-for="v in vizButtons"
                    :key="v.id"
                    :class="cn(v.bg, 'text-zinc-900 shadow-cartoon hover:shadow-cartoon-hover hover:-translate-x-px hover:-translate-y-px')"
                >
                    {{ v.label }}
                </Button>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Cartoon shadow</h2>
            <p class="text-small text-muted-foreground">
                The library&rsquo;s signature treatment: a hard offset shadow plus a 1px translate
                on hover. Default card shadow already points at
                <code class="fira-code">--shadow-cartoon</code>.
            </p>
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
        </section>
    </StoryPage>
</template>
