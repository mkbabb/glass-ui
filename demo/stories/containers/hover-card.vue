<script setup lang="ts">
// BI.W-OVERLAY-UNION — HoverCard folded onto the sealed <Popover trigger="hover">
// union (the Kronecker fold: 3 overlays → 1). A hover-reveal preview card is the
// union under trigger="hover" role="card" (role="group" + aria-label). Tooltip
// SURVIVES the fold as a distinct mechanism (IconTooltip is its preset).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@glass/components/ui/avatar";
import { Button } from "@glass/components/ui/button";
import { IconTooltip } from "@glass/components/custom/icon-tooltip";
import { IconChip } from "@glass/components/custom/icon-chip";
import { Info, CircleHelp, Sparkles, IdCard } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="IdCard" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Hover card
                </span>
                <p class="text-small text-muted-foreground">
                    Hover-reveal preview cards — the container identity is the ONE
                    color event.
                </p>
            </div>
        </header>

            <StorySection heading="Profile preview" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Hover the underlined trigger.
                </p>
                <p class="text-base">
                    Work by
                    <Popover trigger="hover">
                        <PopoverTrigger as-child>
                            <button
                                type="button"
                                class="font-display underline decoration-dotted underline-offset-4 hover:decoration-solid"
                            >
                                @joseph-fourier
                            </button>
                        </PopoverTrigger>
                        <PopoverContent role="card" aria-label="Fourier profile" class="w-80">
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
                        </PopoverContent>
                    </Popover>
                    on the analytic theory of heat.
                </p>
            </StorySection>

            <StorySection heading="Icon tooltips" gap="lg">
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">IconTooltip</code> is a
                    preset of the tooltip primitive — Plus Jakarta Sans body text,
                    hover on an icon button.
                </p>
                <div class="flex items-center gap-3">
                    <IconTooltip text="Inline help">
                        <Button variant="ghost" iconOnly>
                            <CircleHelp class="size-5" />
                        </Button>
                    </IconTooltip>
                    <IconTooltip text="Surface details">
                        <Button variant="ghost" iconOnly>
                            <Info class="size-5" />
                        </Button>
                    </IconTooltip>
                    <IconTooltip text="Run the magic sparkles">
                        <Button variant="glass" iconOnly>
                            <Sparkles class="size-5" />
                        </Button>
                    </IconTooltip>
                </div>
            </StorySection>
        
    </StoryPage>
</template>
