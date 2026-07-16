<script setup lang="ts">
// BI.W-OVERLAY-UNION — HoverCard folded onto the sealed <Popover trigger="hover">
// union (the Kronecker fold: 3 overlays → 1). A hover-reveal preview card is the
// union under trigger="hover" (role="group" + aria-label). Tooltip
// SURVIVES the fold as a distinct, terse description mechanism.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@glass/components/avatar";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
</script>

<template>
    <StoryPage>

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
                        <PopoverContent aria-label="Fourier profile" class="w-80">
                            <div class="flex gap-4">
                                <Avatar label="Joseph Fourier" class="size-12">
                                    <AvatarImage src="" />
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
    </StoryPage>
</template>
