<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../../src/components/ui/tooltip";
import { Button } from "../../../src/components/ui/button";
import { Bold, Italic, Underline, Save, Share2 } from "@lucide/vue";

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <StoryPage>
        <TooltipProvider :delay-duration="150">
            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Icon toolbar</h2>
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
                </div>

                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Button annotations</h2>
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
                </div>

                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Placement</h2>
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
                </div>
            </div>
        </TooltipProvider>
    </StoryPage>
</template>
