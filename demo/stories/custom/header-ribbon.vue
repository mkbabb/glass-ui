<script setup lang="ts">
// HeaderRibbon — hover-tracking ribbon anchor (O.W6 Lane A).
//
// Position toggle between "left" and "right" anchor. The component renders
// as a `fixed` overlay; the demo simulates a positioned host using an
// `overflow-hidden` framed showcase so the fixed ribbon stays bounded.
import { ref } from "vue";
import { Bell, GitBranch, Pin, Search } from "lucide-vue-next";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { HeaderRibbon } from "../../../src/components/custom/header-ribbon";

const position = ref<"left" | "right">("left");
const hideTimeoutMs = ref(2000);

function togglePosition(): void {
    position.value = position.value === "left" ? "right" : "left";
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="position toggle"
            blurb="Hover the anchor pill to expand the items wrapper; click to pin. The ribbon is `fixed` to the viewport — the framed showcase below is for visual context only."
        >
            <div class="flex items-center gap-3">
                <Button variant="outline" @click="togglePosition">
                    position = {{ position }}
                </Button>
                <span class="text-mono-caption text-muted-foreground">
                    hideTimeoutMs = {{ hideTimeoutMs }}
                </span>
            </div>

            <ShowcaseFrame pad="lg" class="relative h-48 overflow-hidden">
                <HeaderRibbon :position="position" :hide-timeout-ms="hideTimeoutMs">
                    <template #anchor="{ pinned }">
                        <button
                            class="scale-on-hover flex h-6 items-center gap-1.5 rounded-full bg-card/80 px-3 shadow-sm backdrop-blur-sm border border-border/40"
                            :aria-pressed="pinned"
                        >
                            <Pin class="h-3 w-3" :class="pinned ? 'text-primary' : 'text-muted-foreground'" />
                            <span class="text-mono-caption text-foreground">ribbon</span>
                        </button>
                    </template>
                    <template #items>
                        <button class="h-6 w-6 rounded-full bg-muted grid place-items-center">
                            <Search class="h-3 w-3" />
                        </button>
                        <button class="h-6 w-6 rounded-full bg-muted grid place-items-center">
                            <Bell class="h-3 w-3" />
                        </button>
                        <button class="h-6 w-6 rounded-full bg-muted grid place-items-center">
                            <GitBranch class="h-3 w-3" />
                        </button>
                    </template>
                </HeaderRibbon>

                <div class="grid h-full place-items-center">
                    <code class="fira-code text-mono-caption text-muted-foreground">
                        position={{ position }} · hover the {{ position === "left" ? "top-left" : "top-right" }} anchor
                    </code>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="props surface"
            blurb="Two props bind the ribbon's behaviour; everything else flows through named slots."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">position?: "left" | "right"</code>
                        — viewport corner the ribbon anchors against (default <code class="fira-code">"left"</code>).
                    </li>
                    <li>
                        <code class="fira-code bg-muted px-1 rounded">hideTimeoutMs?: number</code>
                        — collapse delay after the pointer leaves (default <code class="fira-code">2000</code>).
                    </li>
                    <li>
                        Slots: <code class="fira-code">#anchor</code> (always visible, receives <code class="fira-code">{ pinned, toggled }</code>),
                        <code class="fira-code">#items</code> (hover-expanded), <code class="fira-code">#left</code> (sibling logo / brand).
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
