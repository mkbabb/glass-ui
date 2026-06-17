<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { Notification } from "../../../src/components/ui/notification";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { BellDot } from "@lucide/vue";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

interface Item {
    id: string;
    type: "success" | "error" | "info" | "warning";
    message: string;
}

const notifications = ref<Item[]>([]);

let counter = 0;
function push(type: Item["type"], message: string): void {
    const id = `n-${++counter}`;
    notifications.value = [...notifications.value, { id, type, message }];
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
    push("error", "Couldn't reach the analysis service. Retrying…");
}

const samples: { type: Item["type"]; label: string; message: string }[] = [
    { type: "info", label: "Info", message: "Workspace switched to Chebyshev basis." },
    { type: "success", label: "Success", message: "Deploy finished — build #2048 is live." },
    { type: "warning", label: "Warning", message: "Preview session expires in 3 minutes." },
    { type: "error", label: "Error", message: "Couldn't reach the analysis service." },
];

// BA.W-FEEDBACK-TONE — the demo teaches the HOUSE tone vocabulary, not a raw-Tailwind
// off-token one. The prior `bg-blue-500`/`bg-emerald-500`/`bg-amber-500`/`bg-red-500`
// swatches (FD-NOTIF-OFFMODEL — the THIRD tone map) re-point to the house
// `.feedback-tone-<name>` register, so each dot reads `var(--tone)` (the same
// `--{info,success,warning,destructive}` tokens the Notification surface tints with).
const swatch: Record<Item["type"], string> = {
    info: "feedback-tone-info bg-(--tone)",
    success: "feedback-tone-success bg-(--tone)",
    warning: "feedback-tone-warning bg-(--tone)",
    error: "feedback-tone-destructive bg-(--tone)",
};
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity event family (the tinted
             eyebrow + the accent rail + the focal IconChip, all on --section-color-8).
             The notification tone surfaces carry their own --feedback-tone content;
             the page identity is the ONE event here (the d3 per-surface discipline). -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="BellDot" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Notifications
                </span>
                <p class="text-small text-muted-foreground">
                    Stacked status tones — each tone rides the glass surface; the
                    section identity is the ONE page event.
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
            <!-- BA.W-DEMO-AFFORDANCES — the tones table re-points off the dead
                 bg-card/60 slab onto the glass-routed <ShowcaseFrame> so it reads
                 as glass over the staged backdrop (FD-FS X-2). -->
            <ShowcaseFrame pad="sm" class="grid gap-2">
                <div
                    v-for="s in samples"
                    :key="s.type"
                    class="flex items-center gap-4 border-b border-border/40 py-2 last:border-b-0"
                >
                    <span
                        class="inline-block size-2.5 rounded-full"
                        :class="swatch[s.type]"
                    />
                    <span class="w-20 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {{ s.label }}
                    </span>
                    <span class="text-sm text-foreground">{{ s.message }}</span>
                </div>
            </ShowcaseFrame>
        </section>

        <Notification :notifications="notifications" @remove="remove" />
    </StoryPage>
</template>
