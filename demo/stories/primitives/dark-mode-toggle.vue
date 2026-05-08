<script setup lang="ts">
// DarkModeToggle — passive vs live, 5-rung size axis, disable-transitions knob.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { DarkModeToggle } from "../../../src/controls";

const sizes = ["sm", "md", "lg", "control", "dock"] as const;
const disableTransitions = ref(false);
</script>

<template>
    <StoryPage>
        <StorySection
            label="size axis"
            blurb="Five rungs: sm (28px) · md (36px, default) · lg (44px) · control (CSS control vars) · dock (GlassDock sizing vars). All toggle the canonical useGlobalDark singleton."
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
