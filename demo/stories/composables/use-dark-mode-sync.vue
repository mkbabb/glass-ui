<script setup lang="ts">
// installDarkModeSync — re-runs onSync on dark-mode transitions.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { installDarkModeSync } from "../../../src/composables/dark/installDarkModeSync";
import { useGlobalDark } from "../../../src/composables/dark";

const syncCount = ref(0);
const lastSync = ref<string>("(never)");

installDarkModeSync(() => {
    syncCount.value += 1;
    lastSync.value = new Date().toISOString().slice(11, 23);
});

const { isDark, toggleDark } = useGlobalDark();
</script>

<template>
    <StoryPage>
        <StorySection
            label="re-runs on dark-mode transition"
            blurb="The canonical glue for token-reading compositions. When the theme flips, the registered onSync callback fires, so consumers can re-resolve CSS custom properties or remount canvas paints."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <!-- BA.W-DEMO-AFFORDANCES — the lone toggle sits content-width
                         on its own row, never stretched to the full column. -->
                    <div class="flex items-center gap-3">
                        <Button @click="toggleDark">
                            Toggle (theme: {{ isDark ? "dark" : "light" }})
                        </Button>
                    </div>
                    <div class="grid grid-cols-2 gap-3 text-sm">
                        <div>sync count: <code class="fira-code">{{ syncCount }}</code></div>
                        <div>last: <code class="fira-code">{{ lastSync }}</code></div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
