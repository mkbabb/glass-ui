<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ArrowRight, Sparkles } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

const wonkSettings = '"WONK" 1, "SOFT" 0';

const claims = [
    {
        eyebrow: "§ 01",
        title: "Paper & glass",
        body: "Warm cream underpaint, SVG turbulence grain, translucent card surfaces blending multiply over the backdrop.",
    },
    {
        eyebrow: "§ 02",
        title: "Audacious type",
        body: "Fraunces display at WONK 1, Computer Modern body, golden-ratio scale from 11px micro to 110px hero.",
    },
    {
        eyebrow: "§ 03",
        title: "Cartoon shadows",
        body: "3px offset, no blur. Cards translate (-1, -1) on hover. The signature that defines the whole system.",
    },
];
</script>

<template>
    <StoryPage>
        <div
            :class="cn(
                'relative isolate overflow-hidden rounded-[var(--radius-dialog)]',
                'border border-border/40 px-8 py-20 md:px-16 md:py-28',
            )"
            :style="{
                backgroundColor: 'var(--background)',
                backgroundImage: `
                    radial-gradient(
                        ellipse 70% 55% at 12% 8%,
                        color-mix(in srgb, var(--section-color-0, hsl(12 78% 72%)) 55%, transparent) 0%,
                        transparent 60%
                    ),
                    radial-gradient(
                        ellipse 65% 60% at 92% 20%,
                        color-mix(in srgb, var(--section-color-2, hsl(45 85% 70%)) 50%, transparent) 0%,
                        transparent 65%
                    ),
                    radial-gradient(
                        ellipse 80% 70% at 55% 110%,
                        color-mix(in srgb, var(--section-color-5, hsl(195 75% 68%)) 45%, transparent) 0%,
                        transparent 60%
                    )
                `,
            }"
        >
            <div class="relative z-10 flex flex-col gap-8 max-w-4xl">
                <div class="flex items-center gap-3">
                    <Sparkles class="size-4 text-muted-foreground" aria-hidden="true" />
                    <span class="text-admin-label section-label">
                        v0.3 · paper-and-glass forward
                    </span>
                </div>

                <h2 class="text-display-4 tracking-tight">
                    A design system
                    <span
                        class="fourier-f font-display italic"
                        :style="{
                            color: 'var(--viz-fourier, hsl(358 72% 52%))',
                            fontSize: '1.1em',
                            fontVariationSettings: wonkSettings,
                        }"
                    >f</span>or
                    mathematicians, writers &amp; makers.
                </h2>

                <p class="text-prose max-w-2xl">
                    Glass-UI pairs Vue 3.5 primitives with a warm-cream, paper-textured visual
                    identity. Every surface composes translucent glass over a grain underpaint; every
                    heading is set in Fraunces WONK; every card carries a cartoon shadow by default.
                </p>

                <div class="flex flex-wrap items-center gap-3 pt-2">
                    <Button size="lg" class="gap-2">
                        Start building
                        <ArrowRight class="size-4" aria-hidden="true" />
                    </Button>
                    <Button size="lg" variant="ghost">View the source</Button>
                </div>
            </div>
        </div>

        <Card
            :class="cn(
                'border-2 border-foreground/10 transition-transform duration-200',
                'hover:-translate-x-px hover:-translate-y-px',
            )"
            :style="{ boxShadow: 'var(--shadow-cartoon, var(--shadow-card))' }"
        >
            <CardContent class="grid gap-0 p-0 md:grid-cols-3">
                <div
                    v-for="(claim, idx) in claims"
                    :key="claim.title"
                    :class="cn(
                        'flex flex-col gap-3 p-8',
                        idx < claims.length - 1 && 'md:border-r md:border-border/40',
                        idx < claims.length - 1 && 'border-b border-border/40 md:border-b-0',
                    )"
                >
                    <span
                        class="text-admin-label section-label font-mono"
                        :style="{ color: `var(--section-color-${idx * 2}, inherit)` }"
                    >
                        {{ claim.eyebrow }}
                    </span>
                    <h3 class="text-heading">{{ claim.title }}</h3>
                    <p class="text-small text-muted-foreground leading-relaxed">
                        {{ claim.body }}
                    </p>
                </div>
            </CardContent>
        </Card>
    </StoryPage>
</template>
