<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { HoverPopover } from "../../../src/components/custom/hover-popover";
import { Button } from "../../../src/components/ui/button";
import { Settings, ArrowLeft, RotateCcw, Square } from "@lucide/vue";
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

        <section class="flex flex-col gap-3">
            <p class="section-label">hover-open-delay · nested cadence</p>
            <div class="flex flex-wrap items-center gap-6">
                <HoverPopover content="default · 250ms" side="top">
                    <Button variant="outline">default</Button>
                </HoverPopover>
                <HoverPopover content="snappy · 80ms" side="top" :hover-open-delay="80">
                    <Button variant="outline">snappy</Button>
                </HoverPopover>
                <HoverPopover content="deferred · 500ms" side="top" :hover-open-delay="500">
                    <Button variant="outline">deferred</Button>
                </HoverPopover>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                <code class="rounded bg-muted px-1">hoverOpenDelay</code> tunes
                the open-defer timer. Snappy reads support cluster-tier hover
                affordances; deferred reads suit deeper-nested popovers where
                the longer wait avoids accidental fire on transit.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">native interestfor opt-in</p>
            <div class="flex flex-wrap gap-6">
                <HoverPopover :native="true" content="Native interestfor tooltip">
                    <Button variant="outline">Native hover</Button>
                </HoverPopover>
                <HoverPopover content="reka-ui HoverCard (default)">
                    <Button variant="outline">Default hover</Button>
                </HoverPopover>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                <code class="rounded bg-muted px-1">:native</code> renders the
                trigger with the native interestfor attribute and a hint popover
                where the browser supports interest invokers; otherwise it falls
                straight through to the reka-ui HoverCard default — no behaviour
                change.
            </p>
        </section>
    </StoryPage>
</template>
