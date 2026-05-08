<script setup lang="ts">
// IconTooltip — auto-provider tooltip wrapper for label co-location.
// Distinct from the underlying Tooltip family (manual provider, fully
// custom content) — IconTooltip bakes in display typography for the
// canonical "label + question-mark" pattern.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Info, HelpCircle, AlertTriangle } from "lucide-vue-next";
import { IconTooltip } from "../../../src/components/custom/icon-tooltip";
</script>

<template>
    <StoryPage>
        <StorySection
            label="canonical pattern"
            blurb="A wrapper around <Tooltip> with auto-provider + baked-in font-display + text-base content typography. The trigger is the slotted icon; the text prop drives the floating label."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex items-center gap-6">
                    <IconTooltip text="Spread controls how widely the field disperses.">
                        <Info class="size-icon-sm text-muted-foreground" />
                    </IconTooltip>
                    <IconTooltip text="Bloom is the diffusion radius of the highlight.">
                        <HelpCircle class="size-icon-md text-muted-foreground" />
                    </IconTooltip>
                    <IconTooltip text="Reduces motion when the user prefers it.">
                        <AlertTriangle class="size-icon-lg text-warning" />
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
