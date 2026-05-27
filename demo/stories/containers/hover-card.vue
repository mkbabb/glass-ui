<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../../../src/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../src/components/ui/avatar";
import { Button } from "../../../src/components/ui/button";
import { IconTooltip } from "../../../src/components/custom/icon-tooltip";
import { Info, CircleHelp, Sparkles } from "@lucide/vue";
</script>

<template>
    <StoryPage>
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
                    preset of the tooltip primitive — Plus Jakarta Sans body text,
                    hover on an icon button.
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
    </StoryPage>
</template>
