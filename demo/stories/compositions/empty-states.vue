<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import {
    CheckCircle2,
    CloudOff,
    Compass,
    FileQuestion,
    SearchX,
    TriangleAlert,
    type LucideIcon,
} from "@lucide/vue";
import { Button, type ButtonEmphasis } from "@glass/components/button";
import { Card, CardContent } from "@glass/components/card";
import { Blob } from "@glass/components/blob";
import { BLOB_CONFIG_DEFAULTS } from "@glass/components/blob/types";
import { Chip } from "@glass/components/chip";
import { cn } from "@glass/components/_shared/class-names";

interface EmptyState {
    id: string;
    kind: "search" | "onboarding" | "error" | "offline" | "first-run" | "complete";
    icon: LucideIcon;
    title: string;
    blurb: string;
    cta: string;
    ctaEmphasis: ButtonEmphasis;
    section: number;
}

const states: EmptyState[] = [
    {
        id: "search",
        kind: "search",
        icon: SearchX,
        title: "No matches for that query",
        blurb: "Try different keywords, remove a filter, or clear the date range and search again.",
        cta: "Clear filters",
        ctaEmphasis: "secondary",
        section: 0,
    },
    {
        id: "onboarding",
        kind: "onboarding",
        icon: Compass,
        title: "Start your first project",
        blurb: "A project is a self-contained workspace for your code, configuration, and secrets.",
        cta: "Create project",
        ctaEmphasis: "secondary",
        section: 3,
    },
    {
        id: "error",
        kind: "error",
        icon: TriangleAlert,
        title: "Something went sideways",
        blurb: "We couldn't load this view. The team has been notified; reloading usually helps.",
        cta: "Reload page",
        ctaEmphasis: "secondary",
        section: 1,
    },
    {
        id: "offline",
        kind: "offline",
        icon: CloudOff,
        title: "You are offline",
        blurb: "Your last sync still shows. We will reconcile local changes the moment you reconnect.",
        cta: "Retry connection",
        ctaEmphasis: "secondary",
        section: 6,
    },
    {
        id: "first-run",
        kind: "first-run",
        icon: FileQuestion,
        title: "Nothing here yet",
        blurb: "This space fills up as your teammates add content. Want to be the first?",
        cta: "Add something",
        ctaEmphasis: "quiet",
        section: 9,
    },
    {
        id: "complete",
        kind: "complete",
        icon: CheckCircle2,
        title: "You're all caught up",
        blurb: "No open tasks, no pending reviews, no unread messages. Go take a walk.",
        cta: "View archive",
        ctaEmphasis: "quiet",
        section: 4,
    },
];
</script>

<template>
    <StoryPage>
        <!-- The mascot — a small pointer-leaning Blob that follows the cursor.
             The page over an empty state earns a little companion (E4). The blob
             leans toward the pointer natively (useBlobPointer); under reduce the
             substrate freezes to a static droplet. -->
        <div class="mascot-stage mb-8 flex flex-col items-center gap-3 text-center">
            <div
                class="relative h-40 w-40"
                aria-hidden="true"
                data-egg="empty-states-mascot"
            >
                <Blob
                    :config="BLOB_CONFIG_DEFAULTS"
                    color="var(--primary, #1c1714)"
                    seed="empty-states-mascot"
                    class="absolute inset-0"
                />
            </div>
            <p class="text-small text-muted-foreground max-w-sm">
                Nothing here yet — but the blob's keeping you company. Move your cursor
                and it leans your way.
            </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card
                v-for="state in states"
                :key="state.id"
                size="sm"
                :class="cn(state.ctaEmphasis === 'quiet' && 'ghost-slot')"
            >
                <CardContent class="flex flex-col items-center gap-4 text-center">
                    <Chip
                        shape="icon"
                        size="lg"
                        :tone="`var(--section-color-${state.section})`"
                    >
                        <component :is="state.icon" class="size-6" aria-hidden="true" />
                    </Chip>
                    <!-- h2, not h3 (A11Y W1-F). The page's only other heading is the
                         StoryPage chassis h1, so an h3 here skipped a level and the
                         outline read h1 → h3 with nothing between. These cards ARE the
                         page's top-level sections; the level says so. `text-heading`
                         carries the size, so nothing about the paint changes. -->
                    <h2 class="text-heading">{{ state.title }}</h2>
                    <p
                        class="text-small text-muted-foreground max-w-xs leading-relaxed"
                    >
                        {{ state.blurb }}
                    </p>
                    <Button :emphasis="state.ctaEmphasis" size="sm" class="mt-2">
                        {{ state.cta }}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </StoryPage>
</template>
