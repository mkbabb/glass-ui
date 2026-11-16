<script setup lang="ts">
// Toast's stage: one button per tone, each raising a real toast. The page mounts the
// Toaster that shows them.
import { CircleAlert, CircleCheck, Info, Sparkles, TriangleAlert } from "@lucide/vue";
import type { Component } from "vue";
import { Button } from "@glass/components/button";
import { useToast, type ToastOptions } from "@glass/components/toast";

const { toast } = useToast();

const TONES: readonly { label: string; icon: Component; options: ToastOptions }[] = [
    { label: "Neutral", icon: Sparkles, options: { title: "Draft saved", description: "Your changes are synced." } },
    { label: "Info", icon: Info, options: { tone: "info", title: "Read-only preview", description: "Open the editor to make changes." } },
    { label: "Success", icon: CircleCheck, options: { tone: "success", title: "Published", description: "The new version is live." } },
    { label: "Warning", icon: TriangleAlert, options: { tone: "warning", title: "Nearing your limit", description: "Most of this hour's quota is used." } },
    { label: "Destructive", icon: CircleAlert, options: { tone: "destructive", title: "Upload failed", description: "The file is kept in your drafts." } },
];
</script>

<template>
    <div class="toast-stage">
        <Button v-for="t in TONES" :key="t.label" emphasis="secondary" @click="toast(t.options)">
            <component :is="t.icon" aria-hidden="true" />
            {{ t.label }}
        </Button>
    </div>
</template>

<style scoped>
/* Three across keeps the buttons clear of the toasts' column at the viewport's edge. */
.toast-stage {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    gap: var(--sp-3) var(--sp-4);
}

@container (inline-size < 26rem) {
    .toast-stage {
        grid-template-columns: repeat(2, auto);
    }
}
</style>
