<script setup lang="ts">
// DarkModeToggle — passive vs live, size axis, disable-transitions knob.
//
// The `dock` size rung is shown ONLY inside a real <GlassDock>: it resolves
// `--dock-control-size` from the host density, so standalone it would fall
// through to the bare --size-icon-btn fallback and teach nothing. We host it
// across three densities so the size-inheritance IS the teaching point.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { DarkModeToggle } from "@glass/subpaths/controls";
import { GlassDock } from "@glass/components/custom/dock";

// Standalone rungs only — `dock` is excluded here because it inherits its
// size from a GlassDock host (demonstrated in its own section below).
const sizes = ["sm", "md", "lg", "control"] as const;
const dockSizes = ["sm", "md", "xl"] as const;
const disableTransitions = ref(false);
</script>

<template>
    <StoryPage>
        <StorySection
            label="size axis"
            blurb="Standalone rungs: sm (28px) · md (36px, default) · lg (44px) · control (follows the generic --control-size var). All toggle the canonical useGlobalDark singleton."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-center gap-6">
                    <div v-for="size in sizes" :key="size" class="flex flex-col items-center gap-2">
                        <DarkModeToggle :size="size" />
                        <code class="fira-code text-mono-caption text-muted-foreground">{{ size }}</code>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="dock rung — sizes to its GlassDock host"
            blurb="size=&quot;dock&quot; reads --dock-control-size from the surrounding GlassDock, so the toggle matches its dock siblings at every density. Shown standalone it would fall through to a bare 40px fallback and teach nothing — here it rides three live docks."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap items-end gap-6">
                    <div
                        v-for="d in dockSizes"
                        :key="d"
                        class="flex flex-col items-center gap-2"
                    >
                        <GlassDock :size="d" always-expanded>
                            <DarkModeToggle size="dock" />
                        </GlassDock>
                        <code class="fira-code text-mono-caption text-muted-foreground">
                            size="{{ d }}"
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
                    <DarkModeToggle size="md" :disable-transitions="disableTransitions" />
                    <label class="flex items-center gap-2 text-sm">
                        <input v-model="disableTransitions" type="checkbox" />
                        suppress transitions during toggle
                    </label>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="passive mode"
            blurb="passive=true makes the button a no-op trigger — useful for embed-only contexts where the toggle is decorative or driven externally."
        >
            <ShowcaseFrame pad="md">
                <div class="flex items-center gap-4">
                    <DarkModeToggle :passive="true" size="md" />
                    <span class="text-sm text-muted-foreground">passive — does not toggle</span>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
