<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconTooltip } from "@/components/custom/icon-tooltip";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { Info, CircleHelp, Sparkles } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-9)' }"
            >
                § 9 · Hover preview
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-9)' }"
            >
                Peek without commit
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Hover-card is the inline-link preview — author profile on @-mention,
                metric explainer on a stat, attribution pop on a citation. Tunes
                delay-duration to feel like a peek; the IconTooltip preset shrinks
                that to label-only Fraunces body.
            </p>
            <FlourishDivider
                tone="section-9"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Profile preview</h2>
                <p class="text-sm text-muted-foreground">
                    Hover the underlined trigger.
                </p>
                <p class="text-base">
                    Work by
                    <HoverCard>
                        <HoverCardTrigger as-child>
                            <button
                                type="button"
                                class="font-display underline decoration-dotted underline-offset-4 hover:decoration-solid"
                            >
                                @joseph-fourier
                            </button>
                        </HoverCardTrigger>
                        <HoverCardContent class="w-80">
                            <div class="flex gap-4">
                                <Avatar class="size-12">
                                    <AvatarImage src="" alt="Fourier" />
                                    <AvatarFallback>JF</AvatarFallback>
                                </Avatar>
                                <div class="grid gap-1">
                                    <p class="font-display text-base">
                                        Jean-Baptiste Joseph Fourier
                                    </p>
                                    <p class="text-xs text-muted-foreground">
                                        Heat diffusion, harmonic analysis, one
                                        rather ambitious series.
                                    </p>
                                    <p class="font-mono text-xs text-muted-foreground">
                                        joined · an 1768
                                    </p>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    on the analytic theory of heat.
                </p>
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Icon tooltips</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">IconTooltip</code> is a
                    preset of the tooltip primitive — Fraunces body text, hover
                    on an icon button.
                </p>
                <div class="flex items-center gap-3">
                    <IconTooltip text="Inline help">
                        <Button variant="ghost" size="icon">
                            <CircleHelp class="size-5" />
                        </Button>
                    </IconTooltip>
                    <IconTooltip text="Surface details">
                        <Button variant="ghost" size="icon">
                            <Info class="size-5" />
                        </Button>
                    </IconTooltip>
                    <IconTooltip text="Run the magic sparkles">
                        <Button variant="glass" size="icon">
                            <Sparkles class="size-5" />
                        </Button>
                    </IconTooltip>
                </div>
            </div>
            </div>
        </CreamSurface>
    </StoryPage>
</template>
