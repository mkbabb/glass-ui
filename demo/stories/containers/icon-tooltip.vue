<script setup lang="ts">
// IconTooltip — auto-provider tooltip wrapper for label co-location.
// Distinct from the underlying Tooltip family (manual provider, fully
// custom content) — IconTooltip bakes in display typography for the
// canonical "label + question-mark" pattern.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Info, HelpCircle, AlertTriangle } from "@lucide/vue";
import { IconTooltip } from "@glass/components/custom/icon-tooltip";
</script>

<template>
    <StoryPage>
        <StorySection
            label="canonical pattern"
            blurb="A wrapper around <Tooltip> with an auto-provider and baked-in content typography. The slotted child IS the trigger — a bare glyph still gets a comfortable 44×44 hit-area from its inline-flex host."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex items-center gap-6">
                    <IconTooltip text="Spread controls how widely the field disperses.">
                        <span class="inline-flex min-h-11 min-w-11 cursor-help items-center justify-center">
                            <Info class="size-icon-sm text-muted-foreground" />
                        </span>
                    </IconTooltip>
                    <IconTooltip text="Bloom is the diffusion radius of the highlight.">
                        <span class="inline-flex min-h-11 min-w-11 cursor-help items-center justify-center">
                            <HelpCircle class="size-icon-md text-muted-foreground" />
                        </span>
                    </IconTooltip>
                    <IconTooltip text="Reduces motion when the user prefers it.">
                        <span class="inline-flex min-h-11 min-w-11 cursor-help items-center justify-center">
                            <AlertTriangle class="size-icon-lg text-warning" />
                        </span>
                    </IconTooltip>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="vs underlying Tooltip"
            blurb="<Tooltip> requires a TooltipProvider and accepts arbitrary slot content. <IconTooltip> bakes both in for the canonical 'icon + display-text' use case — used internally by LabeledField."
        />
    </StoryPage>
</template>
