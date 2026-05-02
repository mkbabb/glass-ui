<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    CheckCircle2,
    CloudOff,
    Compass,
    FileQuestion,
    SearchX,
    TriangleAlert,
    type LucideIcon,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface EmptyState {
    id: string;
    kind: "search" | "onboarding" | "error" | "offline" | "first-run" | "complete";
    icon: LucideIcon;
    title: string;
    blurb: string;
    cta: string;
    ctaVariant: "default" | "outline" | "ghost" | "secondary";
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
        ctaVariant: "outline",
        section: 0,
    },
    {
        id: "onboarding",
        kind: "onboarding",
        icon: Compass,
        title: "Start your first project",
        blurb: "A project is a self-contained workspace for your code, configuration, and secrets.",
        cta: "Create project",
        ctaVariant: "default",
        section: 3,
    },
    {
        id: "error",
        kind: "error",
        icon: TriangleAlert,
        title: "Something went sideways",
        blurb: "We couldn't load this view. The team has been notified; reloading usually helps.",
        cta: "Reload page",
        ctaVariant: "secondary",
        section: 1,
    },
    {
        id: "offline",
        kind: "offline",
        icon: CloudOff,
        title: "You are offline",
        blurb: "Your last sync still shows. We will reconcile local changes the moment you reconnect.",
        cta: "Retry connection",
        ctaVariant: "outline",
        section: 6,
    },
    {
        id: "first-run",
        kind: "first-run",
        icon: FileQuestion,
        title: "Nothing here yet",
        blurb: "This space fills up as your teammates add content. Want to be the first?",
        cta: "Add something",
        ctaVariant: "ghost",
        section: 9,
    },
    {
        id: "complete",
        kind: "complete",
        icon: CheckCircle2,
        title: "You're all caught up",
        blurb: "No open tasks, no pending reviews, no unread messages. Go take a walk.",
        cta: "View archive",
        ctaVariant: "ghost",
        section: 4,
    },
];
</script>

<template>
    <StoryPage>
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Card
                v-for="state in states"
                :key="state.id"
                :class="cn(
                    'border-2 border-foreground/10 transition-transform duration-200',
                    'hover:-translate-x-px hover:-translate-y-px',
                )"
            >
                <CardContent class="flex flex-col items-center gap-[calc(1rem_+_var(--density-gap,0rem))] px-[calc(1.5rem_+_var(--density-pad,0rem))] py-[calc(2.5rem_+_var(--density-pad,0rem))] text-center">
                    <span
                        class="flex size-14 items-center justify-center rounded-full"
                        :style="{
                            filter: 'hue-rotate(var(--hue-shift, 0deg))',
                            backgroundColor: `color-mix(in srgb, var(--section-color-${state.section}, var(--muted)) 25%, transparent)`,
                            color: `var(--section-color-${state.section}, var(--muted-foreground))`,
                        }"
                    >
                        <component :is="state.icon" class="size-6" aria-hidden="true" />
                    </span>
                    <h3 class="text-heading">{{ state.title }}</h3>
                    <p class="text-small text-muted-foreground max-w-xs leading-relaxed">
                        {{ state.blurb }}
                    </p>
                    <Button :variant="state.ctaVariant" size="sm" class="mt-2">
                        {{ state.cta }}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </StoryPage>
</template>
