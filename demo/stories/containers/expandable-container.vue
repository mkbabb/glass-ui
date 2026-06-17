<script setup lang="ts">
// ExpandableContainer — in-place vs Teleport-to-body fullscreen, with the
// body-overflow lock-depth counter so adjacent expanded hosts don't collide.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { ExpandableContainer } from "../../../src/components/custom/expandable-container";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { Maximize2 } from "@lucide/vue";
// BA.W-SUFFUSE2 — the containers band's ONE coherent --section-color-2 blue identity.
const CONTAINERS_STOP = 2;
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the containers-band identity event family on --section-color-2. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Maximize2" :section="CONTAINERS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Expandable
                </span>
                <p class="text-small text-muted-foreground">
                    In-place to fullscreen promotion — the content stays ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection
            label="buttonPosition + Teleport fullscreen"
            blurb="The Maximize2 button promotes inline content to a fixed full-viewport host via Teleport. Body overflow is locked while open; the lock-depth counter ensures adjacent expanded containers don't collide."
        >
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ShowcaseFrame pad="md">
                    <ExpandableContainer button-position="right">
                        <template #default="{ fullscreen }">
                            <div
                                class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                            >
                                <code class="fira-code text-sm">
                                    button-position=right · fullscreen={{ fullscreen }}
                                </code>
                            </div>
                        </template>
                    </ExpandableContainer>
                </ShowcaseFrame>

                <ShowcaseFrame pad="md">
                    <ExpandableContainer button-position="left">
                        <template #default="{ fullscreen }">
                            <div
                                class="flex h-48 items-center justify-center rounded-md bg-card text-muted-foreground"
                            >
                                <code class="fira-code text-sm">
                                    button-position=left · fullscreen={{ fullscreen }}
                                </code>
                            </div>
                        </template>
                    </ExpandableContainer>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            label="API"
            blurb="Slot prop `fullscreen: boolean` lets the consumer paint differently in expanded mode (e.g., reveal a richer chart or extra controls)."
        />
    </StoryPage>
</template>
