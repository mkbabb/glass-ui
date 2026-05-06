<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { HoverPopover } from "@/components/custom/hover-popover";
import { Button } from "@/components/ui/button";
import { Settings, ArrowLeft, RotateCcw, Square } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <p class="section-label">label · sides</p>
            <div class="flex flex-wrap items-center gap-6">
                <HoverPopover content="Settings" side="top">
                    <Button variant="ghost" size="icon">
                        <Settings class="size-5" />
                    </Button>
                </HoverPopover>
                <HoverPopover content="Back" side="bottom">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft class="size-5" />
                    </Button>
                </HoverPopover>
                <HoverPopover content="Retake" side="right">
                    <Button variant="ghost" size="icon">
                        <RotateCcw class="size-5" />
                    </Button>
                </HoverPopover>
                <HoverPopover content="Stop" side="left">
                    <Button variant="ghost" size="icon">
                        <Square class="size-5" />
                    </Button>
                </HoverPopover>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Hover-triggered floating label. The four sides above auto-flip
                if the trigger sits near a viewport edge — reka-ui's
                collisionAvoidance picks the next-best side without consumer
                wiring. Defer-on-leave keeps the panel through cluster gaps
                (~150ms close timer).
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">richer slot · two lines + kbd</p>
            <HoverPopover side="bottom" align="start">
                <Button variant="outline">Save document</Button>
                <template #content>
                    <div class="flex flex-col gap-1">
                        <span>Save the current document</span>
                        <span class="text-mono-caption text-muted-foreground">⌘ S</span>
                    </div>
                </template>
            </HoverPopover>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">align variants</p>
            <div class="flex flex-wrap gap-6">
                <HoverPopover content="aligned start" side="top" align="start">
                    <Button variant="outline">align=start</Button>
                </HoverPopover>
                <HoverPopover content="aligned center" side="top" align="center">
                    <Button variant="outline">align=center</Button>
                </HoverPopover>
                <HoverPopover content="aligned end" side="top" align="end">
                    <Button variant="outline">align=end</Button>
                </HoverPopover>
            </div>
        </section>
    </StoryPage>
</template>
