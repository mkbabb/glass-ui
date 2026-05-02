<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { h } from "vue";
import { ToastProvider, ToastViewport } from "reka-ui";
import { Button } from "@/components/ui/button";
import {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastTitle,
    useToast,
} from "@/components/ui/toast";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-vue-next";

const { toasts, toast } = useToast();

function fireDefault() {
    toast({
        title: "Saved draft",
        description: "Your changes are synced to this workspace.",
    });
}

function fireSuccess() {
    toast({
        title: "Deploy complete",
        description: "Build #2048 is live. Traffic ramping now.",
    });
}

function fireWarning() {
    toast({
        title: "Approaching quota",
        description: "84% of your hourly window is used. Resets in 17 minutes.",
    });
}

function fireError() {
    toast({
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

const toneClass: Record<string, string> = {
    default:
        "border-border/70 bg-card/95 text-foreground [&_[data-tone-icon]]:text-muted-foreground",
    success:
        "border-emerald-500/40 bg-emerald-50/90 text-emerald-950 dark:border-emerald-400/40 dark:bg-emerald-950/70 dark:text-emerald-50 [&_[data-tone-icon]]:text-emerald-600 dark:[&_[data-tone-icon]]:text-emerald-300",
    warning:
        "border-amber-500/40 bg-amber-50/90 text-amber-950 dark:border-amber-400/40 dark:bg-amber-950/70 dark:text-amber-50 [&_[data-tone-icon]]:text-amber-600 dark:[&_[data-tone-icon]]:text-amber-300",
    error:
        "border-red-500/50 bg-red-50/90 text-red-950 dark:border-red-400/40 dark:bg-red-950/70 dark:text-red-50 [&_[data-tone-icon]]:text-red-600 dark:[&_[data-tone-icon]]:text-red-300",
};

const toneIcon: Record<string, typeof CheckCircle2> = {
    default: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
};

function toneFor(id: string): keyof typeof toneClass {
    const lower = id.toLowerCase();
    if (lower.includes("deploy") || lower.includes("saved")) return "success";
    if (lower.includes("quota") || lower.includes("warn")) return "warning";
    if (lower.includes("fail") || lower.includes("error")) return "error";
    return "default";
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <p class="section-label">triggers</p>
            <div class="flex flex-wrap items-center gap-3">
                <Button variant="outline" @click="fireDefault">Default</Button>
                <Button variant="outline" @click="fireSuccess">Success</Button>
                <Button variant="outline" @click="fireWarning">Warning</Button>
                <Button variant="outline" @click="fireError">Error</Button>
                <Button variant="destructive" @click="fireDestructive">Destructive</Button>
                <Button @click="fireWithAction">With action</Button>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">viewport</p>
            <p class="font-mono text-xs text-muted-foreground">
                Toasts render bottom-right on desktop, top on mobile. Swipe or
                close-button dismiss. Tone is inferred from the title here to
                extend beyond the native <code>default</code> / <code>destructive</code>
                split without forking the component.
            </p>
            <ToastProvider>
                <Toast
                    v-for="t in toasts"
                    :key="t.id"
                    v-bind="t"
                    :class="t.variant === 'destructive' ? undefined : toneClass[toneFor(t.title ?? '')]"
                >
                    <div class="flex items-start gap-3">
                        <component
                            :is="toneIcon[toneFor(t.title ?? '')]"
                            data-tone-icon
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
    </StoryPage>
</template>
