<script setup lang="ts">
// useGlobalDark — singleton dark-mode store (createGlobalState wrapper).
// Demonstrates the singleton invariant: two component-mount sites both
// read the same store, not independent copies.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useGlobalDark } from "../../../src/composables/dark";

// Two parallel call-sites. Both should report identical state.
const siteA = useGlobalDark();
const siteB = useGlobalDark();
</script>

<template>
    <StoryPage>
        <StorySection
            label="singleton invariant"
            blurb="useGlobalDark is createGlobalState-wrapped — calling it from N places returns the same store, not N copies. The two site readouts below stay in lockstep no matter who toggles."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <!-- BA.W-DEMO-AFFORDANCES — the lone toggle sits content-width
                         on its own row, never stretched to the full column. -->
                    <div class="flex items-center gap-3">
                        <Button variant="default" @click="siteA.toggleDark">
                            Toggle (theme: {{ siteA.isDark ? "dark" : "light" }})
                        </Button>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="rounded-md border border-border bg-card p-3">
                            <code class="fira-code text-mono-caption">site A</code>
                            <p class="text-sm">isDark: {{ siteA.isDark }}</p>
                        </div>
                        <div class="rounded-md border border-border bg-card p-3">
                            <code class="fira-code text-mono-caption">site B</code>
                            <p class="text-sm">isDark: {{ siteB.isDark }}</p>
                        </div>
                    </div>
                    <p class="text-mono-caption text-muted-foreground">
                        siteA === siteB · {{ siteA === siteB }}
                    </p>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="API"
            blurb="Returns { isDark, toggleDark, disableTransitions, setDisableTransitions }. Mirrors color-scheme to <html> style for Safari cascade reliability."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const { isDark, toggleDark, disableTransitions, setDisableTransitions }
  = useGlobalDark();</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
