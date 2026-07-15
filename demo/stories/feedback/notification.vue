<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { ref } from "vue";
import type { Component } from "vue";
import { Button } from "@glass/components/button";
import { Notification } from "@glass/components/notification";
import { AlertTriangle, CheckCircle2, Info, XCircle, BellDot } from "@lucide/vue";
import { IconChip } from "@glass/components/icon-chip";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

// BI.W-SYNONYM-RENAMES — the status `type` synonym is the shared `tone` axis
// (`error` absorbed into `destructive`, clean break no alias).
interface Item {
    id: string;
    tone: "success" | "warning" | "info" | "destructive";
    message: string;
}

const notifications = ref<Item[]>([]);

let counter = 0;
function push(tone: Item["tone"], message: string): void {
    const id = `n-${++counter}`;
    notifications.value = [...notifications.value, { id, tone, message }];
    window.setTimeout(() => {
        remove(id);
    }, 4000);
}

function remove(id: string): void {
    notifications.value = notifications.value.filter((n) => n.id !== id);
}

function fireInfo() {
    push("info", "Workspace switched to Chebyshev basis.");
}
function fireSuccess() {
    push("success", "Deploy finished — build #2048 is live.");
}
function fireWarning() {
    push("warning", "You have 3 minutes left in your preview session.");
}
function fireError() {
    push("destructive", "Couldn't reach the analysis service. Retrying…");
}

// BB.W-DEMO-DESIGN — the tones table teaches the REAL surface: each sample is an
// actual mini colored-glass `.feedback-tone` row (the shared tinted-glass recipe
// the Notification/Toast/Alert surfaces share — a tone-tinted translucent wash + a
// tone-keyed rim + a full-chroma glyph), NOT a 10px solid dot. The glyph maps the
// tone to its lucide icon; the `toneClass` field is the `.feedback-tone-<name>` class.
const samples: {
    tone: Item["tone"];
    label: string;
    message: string;
    icon: Component;
    toneClass: string;
}[] = [
    { tone: "info", label: "Info", message: "Workspace switched to Chebyshev basis.", icon: Info, toneClass: "feedback-tone-info" },
    { tone: "success", label: "Success", message: "Deploy finished — build #2048 is live.", icon: CheckCircle2, toneClass: "feedback-tone-success" },
    { tone: "warning", label: "Warning", message: "Preview session expires in 3 minutes.", icon: AlertTriangle, toneClass: "feedback-tone-warning" },
    { tone: "destructive", label: "Error", message: "Couldn't reach the analysis service.", icon: XCircle, toneClass: "feedback-tone-destructive" },
];
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail + the focal IconChip, all on
             --section-color-8). The page-level color identity, DISTINCT from the
             section labels below — it carries NO heading rung (not an idiom-B
             second header; PH3). The tone samples below carry their OWN
             component color; the section identity is the ONE page event. -->
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="BellDot" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Notifications
                </span>
                <p class="text-small text-muted-foreground">
                    Status surfaces — the notification tones carry their own
                    tone color; the section identity is the ONE page event.
                </p>
            </div>
        </header>

        <section class="flex flex-col gap-3">
            <p class="section-label">triggers</p>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="outline" @click="fireInfo">Info</Button>
                <Button variant="outline" @click="fireSuccess">Success</Button>
                <Button variant="outline" @click="fireWarning">Warning</Button>
                <Button variant="outline" @click="fireError">Error</Button>
            </div>
            <p class="font-mono text-xs text-muted-foreground">
                Auto-dismiss after 4s. The strip anchors bottom-right of the
                viewport via <code>position: fixed</code>.
            </p>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">tones</p>
            <!-- BB.W-DEMO-DESIGN — the tones table TEACHES the real surface: each
                 sample is a mini colored-glass `.feedback-tone` row (the shared
                 tinted-glass recipe), staged over the field (no opaque card plate
                 occluding the paper wash — the BG-2 fix). The 10px solid dot list is
                 GONE. The rows pop in on the W-SCROLL-MOTION `.scroll-cascade`
                 register. -->
            <ShowcaseFrame tier="field" pad="none">
                <div class="scroll-cascade flex flex-col gap-3">
                    <div
                        v-for="s in samples"
                        :key="s.tone"
                        class="feedback-tone flex items-center gap-4 rounded-card border px-5 py-3.5"
                        :class="s.toneClass"
                    >
                        <component
                            :is="s.icon"
                            class="feedback-tone-glyph shrink-0"
                            :size="20"
                            :stroke-width="1.75"
                            aria-hidden="true"
                        />
                        <span class="w-20 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                            {{ s.label }}
                        </span>
                        <span class="text-sm text-foreground">{{ s.message }}</span>
                    </div>
                </div>
            </ShowcaseFrame>
        </section>

        <Notification :notifications="notifications" @remove="remove" />
    </StoryPage>
</template>
