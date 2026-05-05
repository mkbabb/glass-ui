<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Card, CardContent } from "@/components/ui/card";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { Quote } from "lucide-vue-next";
import { cn } from "@/utils/cn";
</script>

<template>
    <StoryPage>
        <!-- Card variant="cream" — proves the cream noun lands as a Card variant -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Card variant="cream"</p>
            <Card variant="cream">
                <DisplayHero
                    size="display-3"
                    variation="wonk"
                    class="mt-0 mb-[var(--space-phi-2)]"
                    :style="{ color: 'var(--section-color-3)' }"
                >
                    Cardstock substrate
                </DisplayHero>
                <p class="text-prose text-foreground/80">
                    The cream Card variant resolves to <code class="fira-code">.cream-surface</code> —
                    warm-cream background, paper-grain overlay, hairline cream-edge border, cartoon-sm
                    shadow. No per-consumer recipe.
                </p>
            </Card>
        </section>

        <!-- Two-tone (warm/cool) side-by-side -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">CreamSurface · two-tone</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <CreamSurface tone="warm" class="relative overflow-hidden">
                    <p class="text-mono-caption text-muted-foreground">tone="warm"</p>
                    <DisplayHero
                        size="display-3"
                        class="mt-2 mb-[var(--space-phi-2)]"
                        :style="{ color: 'var(--section-color-1)' }"
                    >
                        Hue&nbsp;40
                    </DisplayHero>
                    <p class="text-prose text-foreground/80">
                        The warm tone leans gold — cardstock for editorial covers, hero panels, and
                        dictionary entries.
                    </p>
                    <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
                </CreamSurface>

                <CreamSurface tone="cool" class="relative overflow-hidden">
                    <p class="text-mono-caption text-muted-foreground">tone="cool"</p>
                    <DisplayHero
                        size="display-3"
                        class="mt-2 mb-[var(--space-phi-2)]"
                        :style="{ color: 'var(--section-color-5)' }"
                    >
                        Hue&nbsp;54
                    </DisplayHero>
                    <p class="text-prose text-foreground/80">
                        The cool tone leans white — paper for documentation, math typography, and
                        long-form reading.
                    </p>
                    <FlourishDivider tone="section-5" class="mt-[var(--space-phi-3)]" />
                </CreamSurface>
            </div>
        </section>

        <!-- Cream-on-paper showcase -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Cream against the paper-textured page</p>
            <div
                :class="cn(
                    'paper-grain-overlay rounded-[var(--radius-2xl)] p-[var(--space-phi-4)]',
                    'border border-border/40',
                )"
                :style="{ background: 'color-mix(in srgb, var(--cream-cool) 70%, transparent)' }"
            >
                <CreamSurface tone="warm" class="relative">
                    <Card variant="pane" flush class="mb-[var(--space-phi-3)] p-[var(--space-phi-2)]">
                        <span class="text-mono-caption text-muted-foreground inline-flex items-center gap-2">
                            <Quote class="size-3.5" aria-hidden="true" />
                            warm cream sits on cool paper
                        </span>
                    </Card>
                    <DisplayHero
                        size="display-3"
                        variation="stretch"
                        :style="{ color: 'var(--section-color-3)' }"
                    >
                        It looks like a card on paper.
                    </DisplayHero>
                    <p class="text-prose mt-[var(--space-phi-2)] text-foreground/80">
                        Two cream tones share canon naming — only the hue rotates. Consumers stop
                        reaching for <code class="fira-code">bg-white</code>; the substrate is named
                        in the design language.
                    </p>
                    <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
                </CreamSurface>
            </div>
        </section>

        <!-- Card variant="cream" content composition -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Card variant="cream" · multi-block content</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <Card variant="cream">
                    <CardContent class="p-0">
                        <p class="text-mono-caption text-muted-foreground">§ 01 · The substrate</p>
                        <h3 class="text-heading mt-1 mb-[var(--space-phi-2)]">
                            Warm-cream identity
                        </h3>
                        <p class="text-prose text-foreground/80">
                            Cream isn't a paint color — it's the page. Every other surface composes
                            translucently against this substrate.
                        </p>
                    </CardContent>
                </Card>
                <Card variant="cream">
                    <CardContent class="p-0">
                        <p class="text-mono-caption text-muted-foreground">§ 02 · The signature</p>
                        <h3 class="text-heading mt-1 mb-[var(--space-phi-2)]">
                            Cartoon-sm shadow
                        </h3>
                        <p class="text-prose text-foreground/80">
                            2px offset, no blur. The shadow makes the card feel stamped, not floated —
                            modern skeuomorphism without bevel vocabulary.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
    </StoryPage>
</template>
