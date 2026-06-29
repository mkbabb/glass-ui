<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/ui/tooltip";
import { Button } from "@glass/components/ui/button";
import { IconChip } from "@glass/components/custom/icon-chip";
import { Bold, Italic, Underline, Save, Share2, Info } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
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
            <IconChip :icon="Info" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Tooltip
                </span>
                <p class="text-small text-muted-foreground">
                    Pointer-anchored hint tooltips — the container identity is the
                    ONE color event.
                </p>
            </div>
        </header>

        <TooltipProvider :delay-duration="150">
            <div class="grid gap-12">
                <StorySection heading="Icon toolbar" gap="lg">
                    <p class="text-sm text-muted-foreground">
                        Canonical use case — every icon gets a label.
                    </p>
                    <div
                        class="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1.5 w-fit"
                    >
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button variant="ghost" size="icon">
                                    <Bold class="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Bold · ⌘B</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button variant="ghost" size="icon">
                                    <Italic class="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Italic · ⌘I</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button variant="ghost" size="icon">
                                    <Underline class="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Underline · ⌘U</TooltipContent>
                        </Tooltip>
                    </div>
                </StorySection>

                <StorySection heading="Button annotations" gap="lg">
                    <p class="text-sm text-muted-foreground">
                        Use sparingly for labeled buttons — only when the tooltip
                        carries non-redundant info.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button variant="outline">
                                    <Save class="size-4" /> Save
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Save to local storage · autosaves every 30s
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button>
                                    <Share2 class="size-4" /> Share
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Copies a read-only URL to your clipboard
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </StorySection>

                <StorySection heading="Placement" gap="lg">
                    <p class="text-sm text-muted-foreground">
                        <code class="font-mono text-xs">side</code> preference —
                        Floating UI flips on collision.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <Tooltip v-for="side in sides" :key="side">
                            <TooltipTrigger as-child>
                                <Button variant="outline" class="capitalize">
                                    {{ side }}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent :side="side">
                                side = {{ side }}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </StorySection>
            </div>
        </TooltipProvider>
    </StoryPage>
</template>
