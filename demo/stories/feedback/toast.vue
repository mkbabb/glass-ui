<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { defineAsyncComponent, h } from "vue";
import StorySection from "../../chassis/section/StorySection.vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";

// the Feedback TOAST family. The imperative `Toaster`
// register folds onto this ONE toast page as a member (bare, STORY_NESTED_KEY)
// via the switcher below.
const familyMembers: FamilyMember[] = [
    {
        id: "toaster",
        label: "Toaster (imperative)",
        component: defineAsyncComponent(() => import("./toaster.vue")),
    },
];
import { Button } from "@glass/components/button";
import {
    ToastAction,
    useToast,
} from "@glass/components/toast";
// the feedback band's --section-color-8 ruby identity.

const { toast } = useToast();

function fireDefault() {
    toast({
        title: "Saved draft",
        description: "Your changes are synced to this workspace.",
    });
}

function fireSuccess() {
    toast({
        tone: "success",
        title: "Deploy complete",
        description: "Build #2048 is live. Traffic ramping now.",
    });
}

function fireWarning() {
    toast({
        tone: "warning",
        title: "Approaching quota",
        description: "84% of your hourly window is used. Resets in 17 minutes.",
    });
}

function fireInfo() {
    toast({
        tone: "info",
        title: "Live preview is read-only",
        description: "Open the editor pane to make changes.",
    });
}

function fireError() {
    toast({
        tone: "destructive",
        title: "Upload failed",
        description: "Network timed out. We kept the file in local drafts.",
    });
}

function fireDestructive() {
    toast({
        tone: "destructive",
        title: "Session expired",
        description: "Re-authenticate to continue editing.",
    });
}

function fireWithAction() {
    toast({
        title: "Message archived",
        description: "Moved to archive — you can restore it from the trash.",
        action: h(
            ToastAction,
            {
                altText: "Undo archive",
                class: "cursor-pointer rounded-md border border-border/60 px-3 py-1 text-sm font-medium transition hover:bg-foreground/5",
            },
            () => "Undo",
        ),
    });
}

</script>

<template>
    <StoryPage>
        <!-- the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail, both on
             --section-color-8). The page-level color identity, DISTINCT from the
             StorySection HEADINGs below — it carries NO heading rung (not an
             idiom-B second header; PH3). -->

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">triggers</p>
            <div class="flex flex-wrap items-center gap-3">
                <Button @click="fireDefault">Default</Button>
                <Button @click="fireSuccess">Success</Button>
                <Button @click="fireWarning">Warning</Button>
                <Button @click="fireInfo">Info</Button>
                <Button @click="fireError">Error</Button>
                <Button tone="destructive" @click="fireDestructive">Destructive</Button>
                <Button @click="fireWithAction">With action</Button>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">viewport</p>
            <p class="font-mono text-xs text-muted-foreground">
                Toasts render bottom-right on desktop, top on mobile. Swipe or
                close-button dismiss. The status rides the shared Toast
                <code>tone</code> axis (neutral / success / warning / info /
                destructive) — <code>.feedback-tone-*</code> resolves the
                <code>--{success,warning,info}</code> token plates.
            </p>
            <p class="text-small text-muted-foreground">
                The imperative family member below owns the page's single renderer.
            </p>
        </section>
        <StorySection heading="Imperative toaster">
            <FamilyTabs :members="familyMembers" aria-label="Toast family" />
        </StorySection>
    </StoryPage>
</template>
