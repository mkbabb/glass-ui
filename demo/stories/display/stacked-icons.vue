<script setup lang="ts">
// StackedIconGroup — overlapping icon stack with maxVisible / +N overflow.
// Size axis only.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { StackedIconGroup } from "../../../src/subpaths/stacked-icons";
import { Heart, Star, Bookmark, Flag, Pin, Bell, Sparkles } from "@lucide/vue";

interface Avatar {
    id: string;
    label: string;
    color: string;
}

const avatars: Avatar[] = [
    { id: "a", label: "Aja", color: "#f87171" },
    { id: "b", label: "Bo", color: "#60a5fa" },
    { id: "c", label: "Cas", color: "#34d399" },
    { id: "d", label: "Dee", color: "#fbbf24" },
    { id: "e", label: "El", color: "#a78bfa" },
    { id: "f", label: "Fi", color: "#f472b6" },
    { id: "g", label: "Gi", color: "#facc15" },
];

const icons = [Heart, Star, Bookmark, Flag, Pin, Bell, Sparkles];
</script>

<template>
    <StoryPage>
        <StorySection
            label="size axis"
            blurb="Three rungs: sm · md (default) · lg. Hover orchestration uses --duration-fast × --spring-snappy."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <div v-for="size in ['sm', 'md', 'lg'] as const" :key="size" class="flex items-center gap-4">
                        <code class="fira-code w-12 text-mono-caption text-muted-foreground">{{ size }}</code>
                        <StackedIconGroup
                            :items="avatars"
                            :size="size"
                            :max-visible="4"
                            :key-fn="(a) => a.id"
                        >
                            <template #icon="{ item }">
                                <div
                                    class="size-full rounded-pill border-2 border-background"
                                    :style="{ background: item.color }"
                                />
                            </template>
                        </StackedIconGroup>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="direction + reversed"
            blurb="horizontal (default) | vertical, with optional `reversed` to flip the stack order without changing the items array."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex items-start gap-12">
                    <StackedIconGroup
                        :items="icons"
                        size="md"
                        :max-visible="5"
                        direction="horizontal"
                    >
                        <template #icon="{ item: Icon }">
                            <component
                                :is="Icon"
                                class="size-icon-sm"
                            />
                        </template>
                    </StackedIconGroup>
                    <StackedIconGroup
                        :items="icons"
                        size="md"
                        :max-visible="5"
                        direction="vertical"
                    >
                        <template #icon="{ item: Icon }">
                            <component
                                :is="Icon"
                                class="size-icon-sm"
                            />
                        </template>
                    </StackedIconGroup>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="expandOnHover + maxVisible"
            blurb="On group hover, hidden items reveal under the +N chip. The overlap distance honors the size rung."
        >
            <ShowcaseFrame pad="lg">
                <StackedIconGroup
                    :items="avatars"
                    size="lg"
                    :max-visible="3"
                    :expand-on-hover="true"
                    :key-fn="(a) => a.id"
                >
                    <template #icon="{ item }">
                        <div
                            class="size-full rounded-pill border-2 border-background"
                            :style="{ background: item.color }"
                        />
                    </template>
                </StackedIconGroup>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
