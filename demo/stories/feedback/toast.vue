<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { defineAsyncComponent, h } from "vue";
import StorySection from "../StorySection.vue";
import FamilyTabs, { type FamilyMember } from "../FamilyTabs.vue";
import { ToastProvider, ToastViewport } from "reka-ui";

// BG.W-DEMO-IA-REDESIGN — the Feedback TOAST family. The imperative `Toaster`
// register folds onto this ONE toast page as a member (bare, STORY_NESTED_KEY)
// via the switcher below.
const familyMembers: FamilyMember[] = [
    {
        id: "toaster",
        label: "Toaster (imperative)",
        component: defineAsyncComponent(() => import("./toaster.vue")),
    },
];
import { Button } from "@glass/components/ui/button";
import {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastTitle,
    useToast,
} from "@glass/components/ui/toast";
import { CheckCircle2, AlertTriangle, XCircle, Info, BellRing } from "@lucide/vue";
import { IconChip } from "@glass/components/custom/icon-chip";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

const { toasts, toast } = useToast();

function fireDefault() {
    toast({
        title: "Saved draft",
        description: "Your changes are synced to this workspace.",
    });
}

function fireSuccess() {
    toast({
        variant: "success",
        title: "Deploy complete",
        description: "Build #2048 is live. Traffic ramping now.",
    });
}

function fireWarning() {
    toast({
        variant: "warning",
        title: "Approaching quota",
        description: "84% of your hourly window is used. Resets in 17 minutes.",
    });
}

function fireInfo() {
    toast({
        variant: "info",
        title: "Live preview is read-only",
        description: "Open the editor pane to make changes.",
    });
}

function fireError() {
    toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Network timed out. We kept the file in local drafts.",
    });
}

function fireDestructive() {
    toast({
        variant: "destructive",
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

// The tone rides the native Toast `variant`
// (success/warning/info/destructive), which resolves the
// `--{success,warning,info}` token plates inside the CVA. The story only maps
// the per-variant ICON (not part of the surface CVA).
const toneIcon: Record<string, typeof CheckCircle2> = {
    default: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
    destructive: XCircle,
};
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail + the focal IconChip, all on
             --section-color-8). The page-level color identity, DISTINCT from the
             StorySection HEADINGs below — it carries NO heading rung (not an
             idiom-B second header; PH3). -->
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="BellRing" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Toasts
                </span>
                <p class="text-small text-muted-foreground">
                    Transient surfaces — the toast tones carry their own variant
                    color; the section identity is the ONE page event.
                </p>
            </div>
        </header>

        <section class="flex flex-col gap-3">
            <p class="section-label">triggers</p>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="outline" @click="fireDefault">Default</Button>
                <Button variant="outline" @click="fireSuccess">Success</Button>
                <Button variant="outline" @click="fireWarning">Warning</Button>
                <Button variant="outline" @click="fireInfo">Info</Button>
                <Button variant="outline" @click="fireError">Error</Button>
                <Button variant="destructive" @click="fireDestructive">Destructive</Button>
                <Button @click="fireWithAction">With action</Button>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">viewport</p>
            <p class="font-mono text-xs text-muted-foreground">
                Toasts render bottom-right on desktop, top on mobile. Swipe or
                close-button dismiss. The tone rides the native Toast
                <code>variant</code> (default / success / warning / info /
                destructive) — the CVA resolves the
                <code>--{success,warning,info}</code> token plates.
            </p>
            <ToastProvider>
                <Toast
                    v-for="t in toasts"
                    :key="t.id"
                    v-bind="t"
                >
                    <div class="flex items-start gap-3">
                        <component
                            :is="toneIcon[t.variant ?? 'default']"
                            class="mt-0.5 size-5 shrink-0"
                        />
                        <div class="grid gap-1">
                            <ToastTitle v-if="t.title">{{ t.title }}</ToastTitle>
                            <ToastDescription v-if="t.description">
                                {{ t.description }}
                            </ToastDescription>
                        </div>
                    </div>
                    <component :is="t.action" v-if="t.action" />
                    <ToastClose />
                </Toast>
                <ToastViewport
                    class="fixed top-0 right-0 z-toast flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:top-auto sm:flex-col md:max-w-[420px]"
                />
            </ToastProvider>
        </section>
        <StorySection heading="Imperative toaster">
            <FamilyTabs :members="familyMembers" aria-label="Toast family" />
        </StorySection>
    </StoryPage>
</template>
