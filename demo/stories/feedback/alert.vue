<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import type { StoryBody, SpecimenSpec } from "../../chassis/body/story-body";
import { Alert, AlertDescription, AlertTitle } from "@glass/components/alert";
import { Info, CircleAlert, TriangleAlert, CircleCheck, Sparkles } from "@lucide/vue";
import type { Component } from "vue";
// The feedback band's ONE coherent --section-color-8 ruby (warm-status) identity.

// One Alert specimen — the icon (optional) + title + description compose the CVA
// grid through the default slot; the tone is the CVA `tone` prop.
function alertSpec(a: {
    tone?: string;
    announce?: "off" | "polite" | "assertive";
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
        props: {
            ...(a.tone && { tone: a.tone }),
            ...(a.announce && { announce: a.announce }),
        },
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
        {
            heading: "Announcement policy",
            blurb: "Persistent alerts are silent by default. Opt into polite status updates or reserve assertive announcements for urgent interruption.",
            specimens: [
                alertSpec({
                    announce: "off",
                    title: "Silent by default",
                    desc: "Existing page content does not re-announce itself.",
                }),
                alertSpec({
                    announce: "polite",
                    tone: "info",
                    title: "Background sync complete",
                    desc: "Polite updates wait for the current announcement to finish.",
                }),
                alertSpec({
                    announce: "assertive",
                    tone: "destructive",
                    title: "Connection lost",
                    desc: "Assertive delivery is explicit and reserved for urgent failures.",
                }),
            ],
        },
    ],
};
</script>

<template>
    <StoryPage :body="body">
        <!-- The feedback-band identity COLOR EVENT (the tinted eyebrow + accent rail
             on --section-color-8). The page-level color
             identity, distinct from the section headings below — no heading rung,
             so it is not a second header. -->
    </StoryPage>
</template>
