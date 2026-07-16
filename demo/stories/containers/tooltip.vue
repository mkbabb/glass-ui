<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@glass/components/tooltip";
import { Button } from "@glass/components/button";
import { Bold, Italic, Underline, Save, Share2 } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <StoryPage>

        <TooltipProvider :delay-duration="150">
            <div class="grid gap-12">
                <StorySection heading="Icon toolbar" gap="lg">
                    <p class="text-sm text-muted-foreground">
                        Every icon action remains a named button; the tooltip adds
                        only a terse description. Required help stays visible or
                        programmatically associated because touch does not open a
                        hover tooltip.
                    </p>
                    <div
                        class="flex items-center gap-1 rounded-xl border border-border bg-card/50 p-1.5 w-fit"
                    >
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button emphasis="quiet" iconOnly aria-label="Bold">
                                    <Bold class="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Bold · ⌘B</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button emphasis="quiet" iconOnly aria-label="Italic">
                                    <Italic class="size-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Italic · ⌘I</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button emphasis="quiet" iconOnly aria-label="Underline">
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
                                <Button>
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
                                <Button class="capitalize">
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
