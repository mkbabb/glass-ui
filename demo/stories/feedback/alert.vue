<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody, SpecimenSpec } from "../../chassis/body/story-body";
import { Alert, AlertDescription, AlertTitle } from "@glass/components/alert";
import { IconChip } from "@glass/components/icon-chip";
import { Info, CircleAlert, TriangleAlert, CircleCheck, Sparkles, Bell } from "@lucide/vue";
import type { Component } from "vue";
// The feedback band's ONE coherent --section-color-8 ruby (warm-status) identity.
const FEEDBACK_STOP = 8;

// One Alert specimen — the icon (optional) + title + description compose the CVA
// grid through the default slot; the tone is the CVA `tone` prop.
function alertSpec(a: {
    tone?: string;
    icon?: Component;
    title: string;
    desc: string;
}): SpecimenSpec {
    const children: SpecimenSpec[] = [];
    if (a.icon) children.push({ component: a.icon });
    children.push({ component: AlertTitle, slots: { default: a.title } });
    children.push({ component: AlertDescription, slots: { default: a.desc } });
    return {
        component: Alert,
        props: a.tone ? { tone: a.tone } : {},
        slots: { default: children },
    };
}

const toned = [
    {
        heading: "Default",
        icon: Sparkles,
        title: "New workspace created",
        desc: "Your analyses will autosave to this workspace until you switch.",
    },
    {
        heading: "Destructive",
        tone: "destructive",
        icon: CircleAlert,
        title: "Session expired",
        desc: "Re-authenticate to continue. Unsaved changes are held locally for five minutes.",
    },
    {
        heading: "Warning",
        tone: "warning",
        icon: TriangleAlert,
        title: "Approaching rate limit",
        desc: "You've used 84% of your hourly quota. The window resets in 17 minutes.",
    },
    {
        heading: "Info",
        tone: "info",
        icon: Info,
        title: "Live preview is read-only",
        desc: "Open the editor pane to make changes — this preview reflects the last committed state.",
    },
    {
        heading: "Success",
        tone: "success",
        icon: CircleCheck,
        title: "Deployed to production",
        desc: "Build #2048 is live. Roll back from the deploys page if anything looks off.",
    },
];

const body: StoryBody = {
    kind: "sections",
    sections: [
        ...toned.map((a) => ({
            heading: a.heading,
            specimens: [alertSpec(a)],
        })),
        {
            heading: "Without icon",
            blurb: "Omit the SVG — the CVA grid collapses the icon column.",
            specimens: [
                alertSpec({
                    title: "Heads up",
                    desc: "Short form when the title tone does the work.",
                }),
            ],
        },
    ],
};
</script>

<template>
    <StoryPage :body="body">
        <!-- The feedback-band identity COLOR EVENT (the tinted eyebrow + accent rail
             + focal IconChip, all on --section-color-8). The page-level color
             identity, distinct from the section headings below — no heading rung,
             so it is not a second header. -->
        <header
            class="story-color-event flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
            }"
        >
            <IconChip :icon="Bell" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Alerts
                </span>
                <p class="text-small text-muted-foreground">
                    Status surfaces — the alert tones carry their own variant
                    color; the section identity is the ONE page event.
                </p>
            </div>
        </header>
    </StoryPage>
</template>
