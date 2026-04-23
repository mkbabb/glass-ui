<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/ui/notification";

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

const swatch: Record<Item["type"], string> = {
    info: "bg-blue-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
};
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">feedback · notification</p>
            <h1 class="text-title text-foreground">Notification</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Opinionated stacked toast strip — four tones (info, success,
                warning, error) driven by a single <code class="font-mono-code">notifications</code>
                array. Lighter than <em>Toast</em>: no portal, no swipe dismiss, no
                action slot. Best for quick status pings layered over a full-screen
                app shell.
            </p>
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
            <div class="grid gap-2 rounded-lg border border-border/60 bg-card/60 p-4">
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
            </div>
        </section>

        <Notification :notifications="notifications" @remove="remove" />
    </article>
</template>
