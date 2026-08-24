<script setup lang="ts">
// DarkModeToggle — one live command across the size and motion axes.
//
// The `dock` size rung is shown ONLY inside a real <GlassDock>: it resolves
// `--dock-control-size` from the host density, so standalone it would fall
// through to the bare --size-icon-btn fallback and teach nothing. We host it
// across three densities so the size-inheritance IS the teaching point.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import { GlassDock } from "@glass/components/dock";

// Standalone rungs only — `dock` is excluded here because it inherits its
// size from a GlassDock host (demonstrated in its own section below).
const sizes = ["sm", "md", "lg", "control"] as const;
const disableTransitions = ref(false);
</script>

<template>
    <StoryPage>
        <StorySection
            label="size axis"
            blurb="Standalone rungs: sm (28px) · md (36px, default) · lg (44px) · control (follows the generic control size). All toggle the same global dark mode."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center gap-6">
                    <div
                        v-for="size in sizes"
                        :key="size"
                        class="flex flex-col items-center gap-2"
                    >
                        <DarkModeToggle :size="size" />
                        <code
                            class="fira-code text-mono-small text-muted-foreground"
                            >{{ size }}</code
                        >
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="dock rung — sizes to its GlassDock host"
            blurb='size="dock" reads --dock-control-size from the surrounding GlassDock, so the toggle matches its dock siblings. Shown standalone it would fall through to a bare 40px fallback and teach nothing — here it rides a live dock.'
        >
            <!-- [2026-08-12 · BK #47 W1 SURFACE] This section iterated a GlassDock
                 `size` prop across three density rungs. The prop is struck (one density
                 is the base; `[data-preset]` is the geometry override), so the three
                 docks fold to the one that is now the whole axis. -->
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <div class="flex flex-col items-center gap-2">
                        <GlassDock :collapse="false">
                            <DarkModeToggle size="dock" />
                        </GlassDock>
                        <code class="fira-code text-mono-small text-muted-foreground">
                            size="dock"
                        </code>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="disableTransitions knob"
            blurb="When true, suppresses CSS transitions on <html> and descendants during the toggle to avoid mid-flight cascade jank. Pair with a transitions-cascading layout to feel the difference."
        >
            <ShowcaseFrame pad="md">
                <div class="flex items-center gap-4">
                    <DarkModeToggle
                        size="md"
                        :disable-transitions="disableTransitions"
                    />
                    <label class="flex items-center gap-2 text-small">
                        <input v-model="disableTransitions" type="checkbox" />
                        suppress transitions during toggle
                    </label>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
