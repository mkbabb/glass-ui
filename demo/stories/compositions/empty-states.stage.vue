<script setup lang="ts">
// Empty States' stage: one view's placeholder card in one of four states. A state
// change cross-fades the card and tweens its height.
import { computed } from "vue";
import { Inbox, SearchX, TriangleAlert, type LucideIcon } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { Card, CardContent } from "@glass/components/card";
import { Skeleton } from "@glass/components/skeleton";
import StageSwap from "../../chassis/variants/StageSwap.vue";

export type EmptyState = "empty" | "loading" | "error" | "no-results";

const props = withDefaults(defineProps<{ state?: EmptyState }>(), { state: "empty" });

interface Face {
    icon: LucideIcon;
    title: string;
    line: string;
    action: string;
    tone: string;
}

const FACES: Record<Exclude<EmptyState, "loading">, Face> = {
    empty: {
        icon: Inbox,
        title: "No projects yet",
        line: "Projects you create will show up here.",
        action: "New project",
        tone: "var(--section-color-3)",
    },
    error: {
        icon: TriangleAlert,
        title: "Projects didn't load",
        line: "Check your connection and try again.",
        action: "Retry",
        tone: "var(--section-color-6)",
    },
    "no-results": {
        icon: SearchX,
        title: "No matches",
        line: "Try another search or clear the filters.",
        action: "Clear filters",
        tone: "var(--section-color-9)",
    },
};

const face = computed(() => (props.state === "loading" ? null : FACES[props.state]));
</script>

<template>
    <div class="empty-stage">
        <StageSwap :swap-key="state" class="empty-stage-swap">
            <Card class="empty-stage-card">
                <CardContent
                    v-if="face"
                    class="empty-stage-face"
                    :role="state === 'error' ? 'alert' : undefined"
                >
                    <component
                        :is="face.icon"
                        :size="36"
                        :stroke-width="1.75"
                        :style="{ color: face.tone }"
                        aria-hidden="true"
                    />
                    <h2 class="text-heading">{{ face.title }}</h2>
                    <div class="empty-stage-line">{{ face.line }}</div>
                    <Button :emphasis="state === 'error' ? 'primary' : 'secondary'" size="sm">
                        {{ face.action }}
                    </Button>
                </CardContent>
                <CardContent
                    v-else
                    class="empty-stage-face"
                    aria-busy="true"
                    aria-label="Loading projects"
                >
                    <Skeleton shimmer class="size-9 rounded-full" />
                    <Skeleton shimmer class="h-6 w-1/2" />
                    <Skeleton shimmer class="h-4 w-3/4" />
                    <Skeleton shimmer class="h-8 w-28 rounded-full" />
                </CardContent>
            </Card>
        </StageSwap>
    </div>
</template>

<style scoped>
.empty-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
}

.empty-stage-swap {
    inline-size: min(30rem, 100%);
}

.empty-stage-card {
    inline-size: 100%;
}

.empty-stage-face {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-3);
    padding-block: var(--sp-5);
    text-align: center;
}

.empty-stage-line {
    max-inline-size: 22rem;
    color: var(--foreground);
}
</style>
