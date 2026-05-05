<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
import { ArrowRight, Sparkles } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <CreamSurface
            tone="warm"
            class="relative isolate overflow-hidden"
            :class="'p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]'"
        >
            <!-- Atmospheric rainbow underglow -->
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-40"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 60% 50% at 18% 20%, var(--rainbow-pastel-violet) 0%, transparent 60%),
                        radial-gradient(ellipse 70% 55% at 88% 30%, var(--rainbow-pastel-yellow) 0%, transparent 65%),
                        radial-gradient(ellipse 85% 70% at 50% 110%, var(--rainbow-pastel-blue) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col items-center gap-[var(--space-phi-3)] text-center">
                <!-- Mega icon stamp -->
                <IconStamp
                    size="mega"
                    frame="stamp"
                    accent="section-3"
                >
                    <Sparkles aria-hidden="true" />
                </IconStamp>

                <!-- Eyebrow -->
                <p class="section-label">v1.0 · the glass-ui design language</p>

                <!-- Headline — display-mega rung -->
                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    class="leading-[0.92]"
                >
                    Glass&nbsp;UI
                </DisplayHero>

                <!-- Subtitle — prose-lettrine drops a wonky capital -->
                <p class="text-prose-lettrine max-w-2xl text-foreground/85">
                    Bold-maximalist Vue 3.5 components on a warm-cream substrate. Paper texture,
                    cartoon shadows, Fraunces WONK display, math-first typography, and a 13-stop
                    section palette — every axis is named, every flourish is first-class, and the
                    library ships with the audacity intact.
                </p>

                <!-- Rainbow flourish -->
                <FlourishDivider tone="rainbow" class="my-[var(--space-phi-2)] w-full max-w-md" />

                <!-- CTA cluster -->
                <div class="flex flex-wrap items-center justify-center gap-[var(--space-phi-2)]">
                    <Button variant="rainbow" size="lg" class="gap-2">
                        Start building
                        <ArrowRight class="size-5" aria-hidden="true" />
                    </Button>
                    <Button variant="cartoon" size="lg" class="gap-2">
                        Read the source
                    </Button>
                </div>

                <!-- Footer / signature -->
                <p class="text-mono-caption text-muted-foreground">
                    DisplayHero size="display-mega" · IconStamp size="mega" · CreamSurface tone="warm"
                </p>
            </div>
        </CreamSurface>

        <!-- Stamped feature row -->
        <section class="grid gap-[var(--space-phi-3)] md:grid-cols-3">
            <div
                v-for="(feat, i) in [
                    {
                        title: 'Cartoon',
                        body: '3px offset, no blur. Lifts on hover; the canon signature.',
                        accent: 'section-0' as const,
                    },
                    {
                        title: 'Cream',
                        body: 'Warm hue 48. Named noun. Dark mode flips values, not names.',
                        accent: 'section-3' as const,
                    },
                    {
                        title: 'Wonky',
                        body: 'Fraunces WONK 1, SOFT scaled per rung, wdth widened audaciously.',
                        accent: 'section-9' as const,
                    },
                ]"
                :key="feat.title"
                class="paper-card flex flex-col gap-[var(--space-phi-2)]"
            >
                <IconStamp size="lg" frame="stamp" :accent="feat.accent" class="self-start">
                    <span class="text-prose font-bold">{{ String(i + 1).padStart(2, '0') }}</span>
                </IconStamp>
                <h3
                    class="text-display-2 leading-tight"
                    :style="{
                        color: `var(--section-color-${feat.accent.replace('section-', '')})`,
                    }"
                >
                    {{ feat.title }}
                </h3>
                <p class="text-prose text-foreground/80">{{ feat.body }}</p>
            </div>
        </section>
    </StoryPage>
</template>
