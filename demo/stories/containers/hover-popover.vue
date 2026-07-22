<script setup lang="ts">
// the retired <HoverPopover> folds onto the sealed
// <Popover trigger="hover"> union (the Kronecker fold: 3 overlays → 1). This
// story demonstrates the HOVER trigger arm of the ONE Popover — the fine-hover
// branch is reka's HoverCardRoot (hover-open + defer-on-leave timers), promoted
// to tap-toggle on coarse pointers.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Surface } from "@glass/components/surface";
import { Button } from "@glass/components/button";
import { Settings, ArrowLeft, RotateCcw, Square } from "@lucide/vue";

// reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
</script>

<template>
    <StoryPage>

        <StorySection heading="Sides">
            <Surface
                material="content"
                surface="veil"
                class="flex flex-wrap items-center gap-6 p-6"
            >
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button emphasis="quiet" iconOnly aria-label="Settings">
                            <Settings class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="top"
                        :side-offset="6"
                        class="w-auto"
                    >
                        Settings
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button emphasis="quiet" iconOnly aria-label="Back">
                            <ArrowLeft class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="bottom"
                        :side-offset="6"
                        class="w-auto"
                    >
                        Back
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button emphasis="quiet" iconOnly aria-label="Retake">
                            <RotateCcw class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="right"
                        :side-offset="6"
                        class="w-auto"
                    >
                        Retake
                    </PopoverContent>
                </Popover>
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button emphasis="quiet" iconOnly aria-label="Stop">
                            <Square class="size-5" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="left"
                        :side-offset="6"
                        class="w-auto"
                    >
                        Stop
                    </PopoverContent>
                </Popover>
            </Surface>
            <p class="text-small text-muted-foreground">
                Hover-triggered floating label. The four sides above auto-flip if the
                trigger sits near a viewport edge — reka-ui's collisionAvoidance picks
                the next-best side without consumer wiring. Defer-on-leave keeps the
                panel through cluster gaps (the <code>closeDelay</code> timer).
            </p>
        </StorySection>

        <StorySection
            heading="Richer slot"
            blurb="Two lines plus a keyboard shortcut inside the hover panel."
        >
            <!-- The lone trigger is wrapped in the `flex flex-wrap` idiom so it sizes
                 to its content, never balloons to the article width (the flex-col
                 body uses `align-items: stretch`). -->
            <Surface material="content" surface="veil" class="flex flex-wrap gap-3 p-6">
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button>Save document</Button>
                    </PopoverTrigger>
                    <PopoverContent
                        side="bottom"
                        align="start"
                        class="w-auto"
                    >
                        <div class="flex flex-col gap-1">
                            <span>Save the current document</span>
                            <span class="text-mono-small text-muted-foreground"
                                >⌘ S</span
                            >
                        </div>
                    </PopoverContent>
                </Popover>
            </Surface>
        </StorySection>

        <StorySection
            heading="Open delay"
            blurb="Nested cadence — openDelay tunes the open-defer timer."
        >
            <Surface
                material="content"
                surface="veil"
                class="flex flex-wrap items-center gap-6 p-6"
            >
                <Popover trigger="hover">
                    <PopoverTrigger as-child>
                        <Button>default · 250ms</Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" class="w-auto"
                        >default</PopoverContent
                    >
                </Popover>
                <Popover trigger="hover" :open-delay="80">
                    <PopoverTrigger as-child>
                        <Button>snappy · 80ms</Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" class="w-auto"
                        >snappy</PopoverContent
                    >
                </Popover>
                <Popover trigger="hover" :open-delay="500">
                    <PopoverTrigger as-child>
                        <Button>deferred · 500ms</Button>
                    </PopoverTrigger>
                    <PopoverContent side="top" class="w-auto"
                        >deferred</PopoverContent
                    >
                </Popover>
            </Surface>
            <p class="text-small text-muted-foreground">
                <code class="rounded bg-muted px-1">openDelay</code> tunes the
                open-defer timer (renamed from the retired <code>hoverOpenDelay</code>).
                Snappy reads support cluster-tier hover affordances; deferred reads suit
                deeper-nested popovers where the longer wait avoids accidental fire on
                transit.
            </p>
        </StorySection>
    </StoryPage>
</template>
