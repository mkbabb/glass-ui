<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import type { FlourishDividerTone } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

const rainbow = [
    { name: "rainbow-red", cssVar: "--rainbow-red" },
    { name: "rainbow-orange", cssVar: "--rainbow-orange" },
    { name: "rainbow-yellow", cssVar: "--rainbow-yellow" },
    { name: "rainbow-green", cssVar: "--rainbow-green" },
    { name: "rainbow-blue", cssVar: "--rainbow-blue" },
    { name: "rainbow-indigo", cssVar: "--rainbow-indigo" },
    { name: "rainbow-violet", cssVar: "--rainbow-violet" },
];

const pastel = [
    { name: "pastel-red", cssVar: "--rainbow-pastel-red" },
    { name: "pastel-orange", cssVar: "--rainbow-pastel-orange" },
    { name: "pastel-yellow", cssVar: "--rainbow-pastel-yellow" },
    { name: "pastel-green", cssVar: "--rainbow-pastel-green" },
    { name: "pastel-blue", cssVar: "--rainbow-pastel-blue" },
    { name: "pastel-indigo", cssVar: "--rainbow-pastel-indigo" },
    { name: "pastel-violet", cssVar: "--rainbow-pastel-violet" },
];

const gold = [
    { name: "gold-light", cssVar: "--gold-light" },
    { name: "gold", cssVar: "--gold" },
    { name: "gold-dark", cssVar: "--gold-dark" },
];

const sections = Array.from({ length: 13 }, (_, i) => i);

const dividerTones: FlourishDividerTone[] = [
    "gold",
    "rainbow",
    "section-0",
    "section-3",
    "section-6",
    "section-9",
];

const stripeUtilities = [
    { cls: "flourish-stripe-rainbow", label: ".flourish-stripe-rainbow" },
    { cls: "flourish-stripe-pastel", label: ".flourish-stripe-pastel" },
    { cls: "flourish-stripe-gold", label: ".flourish-stripe-gold" },
];

const shimmerUtilities = [
    { cls: "text-shimmer-gold", label: "shimmer-gold", sample: "Aurum" },
    { cls: "text-shimmer-blue", label: "shimmer-blue", sample: "Boreal" },
    { cls: "text-shimmer-vivid", label: "shimmer-vivid", sample: "Carnival" },
    { cls: "text-shimmer-pastel", label: "shimmer-pastel", sample: "Daydream" },
];
</script>

<template>
    <StoryPage>
        <!-- Hero — flourishes ARE the design language -->
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <p class="section-label">flourishes</p>
            <DisplayHero
                size="display-mega"
                variation="wonk"
                class="text-shimmer-vivid mt-2 mb-4"
            >
                Colour as commitment.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Rainbow vivid for celebration, rainbow pastel for ambient mood, gold for
                ceremony, the 13-stop section palette for chapter identity. Flourishes
                ship as first-class utilities — consumers don't hand-roll gradients.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- TOKEN SWATCHES -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">tokens · rainbow vivid</p>
            <div class="grid grid-cols-7 gap-2">
                <div
                    v-for="r in rainbow"
                    :key="r.name"
                    class="flex flex-col items-center gap-1"
                >
                    <span
                        class="block h-16 w-full rounded-md border border-border/40"
                        :style="{ background: `var(${r.cssVar})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ r.name.replace("rainbow-", "") }}
                    </span>
                </div>
            </div>

            <p class="section-label mt-[var(--space-phi-2)]">tokens · rainbow pastel</p>
            <div class="grid grid-cols-7 gap-2">
                <div
                    v-for="r in pastel"
                    :key="r.name"
                    class="flex flex-col items-center gap-1"
                >
                    <span
                        class="block h-16 w-full rounded-md border border-border/40"
                        :style="{ background: `var(${r.cssVar})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ r.name.replace("pastel-", "") }}
                    </span>
                </div>
            </div>

            <p class="section-label mt-[var(--space-phi-2)]">tokens · gold family</p>
            <div class="grid grid-cols-3 gap-2 md:max-w-md">
                <div
                    v-for="g in gold"
                    :key="g.name"
                    class="flex flex-col items-center gap-1"
                >
                    <span
                        class="block h-20 w-full rounded-md border border-border/40 shadow-cartoon-sm"
                        :style="{ background: `var(${g.cssVar})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ g.name }}
                    </span>
                </div>
            </div>

            <p class="section-label mt-[var(--space-phi-2)]">tokens · 13-stop sections</p>
            <div
                class="grid gap-1"
                style="grid-template-columns: repeat(13, minmax(0, 1fr))"
            >
                <div
                    v-for="i in sections"
                    :key="i"
                    class="flex flex-col items-center gap-1"
                >
                    <span
                        class="block h-12 w-full rounded-md border border-border/40"
                        :style="{ background: `var(--section-color-${i})` }"
                    />
                    <span class="text-mono-caption text-muted-foreground">{{ i }}</span>
                </div>
            </div>
        </section>

        <!-- Divider flourishes -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">divider flourishes · &lt;FlourishDivider&gt;</p>
            <div
                class="flex flex-col gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <div
                    v-for="tone in dividerTones"
                    :key="tone"
                    class="flex flex-col gap-2"
                >
                    <span class="text-mono-caption text-muted-foreground">
                        tone="{{ tone }}"
                    </span>
                    <FlourishDivider :tone="tone" />
                </div>
            </div>
        </section>

        <!-- Stripe utilities — full-bleed -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">stripe utilities · full-bleed</p>
            <div
                v-for="s in stripeUtilities"
                :key="s.cls"
                class="overflow-hidden rounded-2xl border border-border bg-card shadow-cartoon"
            >
                <div :class="cn(s.cls, 'h-3 w-full')" />
                <div class="flex items-center justify-between px-[var(--space-phi-3)] py-[var(--space-phi-2)]">
                    <code class="fira-code text-small">{{ s.label }}</code>
                    <span class="text-mono-caption text-muted-foreground">
                        full-width gradient banner
                    </span>
                </div>
            </div>
        </section>

        <!-- Shimmer text -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">text shimmer · 4 spectra</p>
            <div class="grid gap-[var(--space-phi-2)] md:grid-cols-2">
                <div
                    v-for="s in shimmerUtilities"
                    :key="s.cls"
                    class="rounded-2xl border border-border bg-cream-warm p-[var(--space-phi-3)] shadow-cartoon-sm"
                >
                    <p class="text-mono-caption mb-2 text-muted-foreground">
                        .{{ s.label }}
                    </p>
                    <p :class="cn(s.cls, 'text-display-3')">{{ s.sample }}</p>
                </div>
            </div>
        </section>

        <!-- Rainbow text + rainbow backgrounds -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">rainbow surfaces &amp; type</p>
            <div class="grid gap-[var(--space-phi-2)] md:grid-cols-2">
                <div
                    class="bg-rainbow rounded-2xl p-[var(--space-phi-4)] text-white shadow-cartoon"
                >
                    <p class="text-mono-caption opacity-80">.bg-rainbow</p>
                    <p class="text-display-3 mt-1">Spectrum, default</p>
                </div>
                <div
                    class="bg-rainbow-vivid rounded-2xl p-[var(--space-phi-4)] text-white shadow-cartoon"
                >
                    <p class="text-mono-caption opacity-80">.bg-rainbow-vivid</p>
                    <p class="text-display-3 mt-1">Spectrum, vivid</p>
                </div>
                <div
                    class="bg-rainbow-pastel rounded-2xl p-[var(--space-phi-4)] text-foreground shadow-cartoon md:col-span-2"
                >
                    <p class="text-mono-caption opacity-80">.bg-rainbow-pastel</p>
                    <p class="text-display-3 mt-1">Pastel canvas — quieter, still committed.</p>
                </div>
                <div
                    class="rounded-2xl border border-border bg-cream-warm p-[var(--space-phi-4)] shadow-cartoon md:col-span-2"
                >
                    <p class="text-mono-caption mb-2 text-muted-foreground">.text-rainbow-pastel</p>
                    <p class="text-rainbow-pastel text-display-mega leading-none">
                        Iridescent.
                    </p>
                </div>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
/* Eight design-language explorations exclusive to this foundations story.
   Each rule was previously a global utility; H.W1 collapsed single-demo
   utilities to story-local scope per the inline-and-remove pattern. */

.text-shimmer-blue {
    background: linear-gradient(
        90deg,
        hsl(220 80% 35%),
        hsl(200 100% 75%),
        hsl(210 90% 55%),
        hsl(200 100% 75%),
        hsl(220 80% 35%)
    );
    background-size: 250% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shimmer-slide var(--shimmer-duration, var(--duration-shimmer)) linear infinite;
}

.text-shimmer-vivid {
    background: linear-gradient(
        90deg,
        var(--rainbow-red),
        var(--rainbow-orange),
        var(--rainbow-yellow),
        var(--rainbow-green),
        var(--rainbow-blue),
        var(--rainbow-indigo),
        var(--rainbow-violet),
        var(--rainbow-red)
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shimmer-slide var(--shimmer-duration, var(--duration-shimmer)) linear infinite;
}

.text-shimmer-pastel {
    background: linear-gradient(
        90deg,
        var(--rainbow-pastel-red),
        var(--rainbow-pastel-orange),
        var(--rainbow-pastel-yellow),
        var(--rainbow-pastel-green),
        var(--rainbow-pastel-blue),
        var(--rainbow-pastel-indigo),
        var(--rainbow-pastel-violet),
        var(--rainbow-pastel-red)
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gold-shimmer-slide var(--shimmer-duration, var(--duration-shimmer)) linear infinite;
}

.bg-rainbow-pastel {
    background: linear-gradient(
        135deg,
        var(--rainbow-pastel-red),
        var(--rainbow-pastel-orange),
        var(--rainbow-pastel-yellow),
        var(--rainbow-pastel-green),
        var(--rainbow-pastel-blue),
        var(--rainbow-pastel-indigo),
        var(--rainbow-pastel-violet)
    );
    background-size: 200% 200%;
}

.text-rainbow-pastel {
    background: linear-gradient(
        90deg,
        var(--rainbow-pastel-red),
        var(--rainbow-pastel-orange),
        var(--rainbow-pastel-yellow),
        var(--rainbow-pastel-green),
        var(--rainbow-pastel-blue),
        var(--rainbow-pastel-indigo),
        var(--rainbow-pastel-violet)
    );
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.flourish-stripe-rainbow {
    background: linear-gradient(
        90deg,
        var(--rainbow-red),
        var(--rainbow-orange),
        var(--rainbow-yellow),
        var(--rainbow-green),
        var(--rainbow-blue),
        var(--rainbow-indigo),
        var(--rainbow-violet)
    );
    height: 4px;
}

.flourish-stripe-pastel {
    background: linear-gradient(
        90deg,
        var(--rainbow-pastel-red),
        var(--rainbow-pastel-orange),
        var(--rainbow-pastel-yellow),
        var(--rainbow-pastel-green),
        var(--rainbow-pastel-blue),
        var(--rainbow-pastel-indigo),
        var(--rainbow-pastel-violet)
    );
    height: 4px;
}

.flourish-stripe-gold {
    background: linear-gradient(
        90deg,
        var(--gold-dark),
        var(--gold-light),
        var(--gold),
        var(--gold-light),
        var(--gold-dark)
    );
    height: 4px;
}
</style>
