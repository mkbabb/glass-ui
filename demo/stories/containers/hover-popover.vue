<script setup lang="ts">
// BI.W-OVERLAY-UNION — the retired <HoverPopover> folds onto the sealed
// <Popover trigger="hover"> union (the Kronecker fold: 3 overlays → 1). This
// story demonstrates the HOVER trigger arm of the ONE Popover — the fine-hover
// branch is reka's HoverCardRoot (hover-open + defer-on-leave timers), promoted
// to tap-toggle on coarse pointers.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Card } from "@glass/components/card";
import { IconChip } from "@glass/components/icon-chip";
import { Button } from "@glass/components/button";
import { Settings, ArrowLeft, RotateCcw, Square, MousePointer2 } from "@lucide/vue";

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
            <IconChip :icon="MousePointer2" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Popover (hover trigger)
                </span>
                <p class="text-small text-muted-foreground">
                    The sealed Popover under <code>trigger="hover"</code> — one
                    primitive, the container identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection heading="Sides">
            <Card surface="veil" class="flex flex-wrap items-center gap-6 p-6">
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button variant="ghost" iconOnly>
                            <Settings class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="top" :side-offset="6" class="w-auto">
                        Settings
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button variant="ghost" iconOnly>
                            <ArrowLeft class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="bottom" :side-offset="6" class="w-auto">
                        Back
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button variant="ghost" iconOnly>
                            <RotateCcw class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="right" :side-offset="6" class="w-auto">
                        Retake
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button variant="ghost" iconOnly>
                            <Square class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="left" :side-offset="6" class="w-auto">
                        Stop
                    </PopoverContent>
                </Popover>
            </Card>
            <p class="text-mono-caption text-muted-foreground">
                Hover-triggered floating label. The four sides above auto-flip
                if the trigger sits near a viewport edge — reka-ui's
                collisionAvoidance picks the next-best side without consumer
                wiring. Defer-on-leave keeps the panel through cluster gaps
                (the <code>closeDelay</code> timer).
            </p>
        </StorySection>

        <StorySection heading="Richer slot" blurb="Two lines plus a keyboard shortcut inside the hover panel.">
            <!-- The lone trigger is wrapped in the `flex flex-wrap` idiom so it sizes
                 to its content, never balloons to the article width (the flex-col
                 body is align-items:stretch — CBA-1/CBA-7). -->
            <Card surface="veil" class="flex flex-wrap gap-3 p-6">
            <Popover trigger="hover">
                <PopoverTrigger as-child>
                    <Button variant="outline">Save document</Button>
                </PopoverTrigger>
                <PopoverContent role="card" side="bottom" align="start" class="w-auto">
                    <div class="flex flex-col gap-1">
                        <span>Save the current document</span>
                        <span class="text-mono-caption text-muted-foreground">⌘ S</span>
                    </div>
                </PopoverContent>
            </Popover>
            </Card>
        </StorySection>

        <StorySection heading="Open delay" blurb="Nested cadence — openDelay tunes the open-defer timer.">
            <Card surface="veil" class="flex flex-wrap items-center gap-6 p-6">
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button variant="outline">default · 250ms</Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="top" class="w-auto">default</PopoverContent>
                </Popover>
                <Popover trigger="hover" :open-delay="80">
                    <PopoverTrigger as-child>
                        <Button variant="outline">snappy · 80ms</Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="top" class="w-auto">snappy</PopoverContent>
                </Popover>
                <Popover trigger="hover" :open-delay="500">
                    <PopoverTrigger as-child>
                        <Button variant="outline">deferred · 500ms</Button>
                    </PopoverTrigger>
                    <PopoverContent role="card" side="top" class="w-auto">deferred</PopoverContent>
                </Popover>
            </Card>
            <p class="text-mono-caption text-muted-foreground">
                <code class="rounded bg-muted px-1">openDelay</code> tunes the
                open-defer timer (renamed from the retired
                <code>hoverOpenDelay</code>). Snappy reads support cluster-tier
                hover affordances; deferred reads suit deeper-nested popovers
                where the longer wait avoids accidental fire on transit.
            </p>
        </StorySection>
    </StoryPage>
</template>
