<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import { Button } from "@glass/components/button";
// ConfirmDialog DEMOTED to a Dialog PRESET (its imperative
// promise-opener was thin — a preset over the Dialog root, not a distinct component).
// The confirm flow is a CONSUMER composition now (presets live in consumers): a glass
// `<DialogContent:show-close="false">` with a title/description + a confirm/cancel
// footer + the loading dismiss-guard. This story IS that preset, shown inline.
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@glass/components/dialog";
import {
    Trash2,
    LogOut,
    Archive,
    CheckCircle2,
    LoaderCircle,
} from "@lucide/vue";
// the feedback band's --section-color-8 ruby identity.

const destructiveOpen = ref(false);
const destructiveLoading = ref(false);
const destructiveLog = ref<string[]>([]);

function onDestructiveConfirm(): void {
    if (destructiveLoading.value) return;
    destructiveLoading.value = true;
    window.setTimeout(() => {
        destructiveLoading.value = false;
        destructiveOpen.value = false;
        destructiveLog.value = [
            `Workspace deleted at ${new Date().toLocaleTimeString()}`,
            ...destructiveLog.value,
        ].slice(0, 4);
    }, 900);
}
// The loading dismiss-guard: reka's DialogContent emits these dismiss intents; while a
// confirm is in-flight we PREVENT the dismiss (the retired ConfirmDialog's guard).
function guardDismiss(event: Event): void {
    if (destructiveLoading.value) event.preventDefault();
}

const benignOpen = ref(false);
const benignLog = ref<string[]>([]);
function onBenignConfirm(): void {
    benignLog.value = [
        `Archived at ${new Date().toLocaleTimeString()}`,
        ...benignLog.value,
    ].slice(0, 4);
    benignOpen.value = false;
}

const signOutOpen = ref(false);
</script>

<template>
    <StoryPage>
        <!-- the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail, both on
             --section-color-8). The page-level color identity, DISTINCT from the
             section labels below — it carries NO heading rung (not an idiom-B
             second header; PH3). -->

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">destructive — delete workspace</p>
            <div
                class="relative min-h-[240px] overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6"
            >
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 text-small text-foreground">
                        <Trash2 class="size-4 text-destructive" />
                        <span>Workspace: <em>fourier-sandbox-42</em></span>
                    </div>
                    <p class="max-w-prose text-small text-muted-foreground">
                        Deleting a workspace removes every analysis, note, and
                        attachment inside it. This cannot be undone — use the
                        destructive pattern.
                    </p>
                    <Dialog v-model:open="destructiveOpen">
                        <div>
                            <DialogTrigger as-child>
                                <Button tone="destructive" class="gap-1.5">
                                    <Trash2 class="size-4" />
                                    Delete workspace
                                </Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent
                            surface="glass"
                            class="w-[calc(100%-2rem)] sm:max-w-sm"
                            :show-close="false"
                            @escape-key-down="guardDismiss"
                            @interact-outside="guardDismiss"
                        >
                            <DialogHeader>
                                <DialogTitle class="font-display font-semibold">
                                    Delete workspace?
                                </DialogTitle>
                                <DialogDescription class="fira-code">
                                    This will permanently remove all analyses, notes, and
                                    attachments inside fourier-sandbox-42. This cannot be
                                    undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter class="gap-2">
                                <Button
                                    class="cursor-pointer rounded-pill"
                                    :disabled="destructiveLoading"
                                    @click="destructiveOpen = false"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    tone="destructive"
                                    class="cursor-pointer gap-1.5 rounded-pill"
                                    :disabled="destructiveLoading"
                                    @click="onDestructiveConfirm"
                                >
                                    <LoaderCircle
                                        v-if="destructiveLoading"
                                        class="size-4 animate-spin"
                                    />
                                    Delete workspace
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <ul
                        v-if="destructiveLog.length"
                        class="mt-2 font-mono text-micro text-muted-foreground"
                    >
                        <li v-for="line in destructiveLog" :key="line">— {{ line }}</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">benign — archive thread</p>
            <div
                class="relative min-h-[200px] overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6"
            >
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 text-small text-foreground">
                        <Archive class="size-4 text-muted-foreground" />
                        <span>Thread: <em>Q2 planning notes</em></span>
                    </div>
                    <p class="max-w-prose text-small text-muted-foreground">
                        Archive is reversible — the confirm button stays
                        default-tone. Keep the guardrail for deliberate
                        intent, not for consequence.
                    </p>
                    <Dialog v-model:open="benignOpen">
                        <div>
                            <DialogTrigger as-child>
                                <Button class="gap-1.5">
                                    <Archive class="size-4" />
                                    Archive thread
                                </Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent
                            surface="glass"
                            class="w-[calc(100%-2rem)] sm:max-w-sm"
                            :show-close="false"
                        >
                            <DialogHeader>
                                <DialogTitle class="font-display font-semibold">
                                    Archive this thread?
                                </DialogTitle>
                                <DialogDescription class="fira-code">
                                    Archived threads move to the Archive tab. You can
                                    restore them any time.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter class="gap-2">
                                <Button
                                    class="cursor-pointer rounded-pill"
                                    @click="benignOpen = false"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    class="cursor-pointer gap-1.5 rounded-pill"
                                    @click="onBenignConfirm"
                                >
                                    Archive
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <ul
                        v-if="benignLog.length"
                        class="mt-2 font-mono text-micro text-muted-foreground"
                    >
                        <li v-for="line in benignLog" :key="line">— {{ line }}</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">custom body + action</p>
            <div
                class="relative min-h-[220px] overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6"
            >
                <div class="flex flex-col gap-3">
                    <p class="max-w-prose text-small text-muted-foreground">
                        A richer body + a custom confirm label — the preset is just
                        Dialog primitives, so consumers frame it however they like.
                    </p>
                    <Dialog v-model:open="signOutOpen">
                        <div>
                            <DialogTrigger as-child>
                                <Button class="gap-1.5">
                                    <LogOut class="size-4" />
                                    Sign out
                                </Button>
                            </DialogTrigger>
                        </div>
                        <DialogContent
                            surface="glass"
                            class="w-[calc(100%-2rem)] sm:max-w-sm"
                            :show-close="false"
                        >
                            <DialogHeader>
                                <DialogTitle class="font-display font-semibold">
                                    Sign out of all devices?
                                </DialogTitle>
                                <DialogDescription class="fira-code">
                                    You'll need to re-authenticate the next time you open
                                    the editor. Local drafts stay on this device.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter class="gap-2">
                                <Button
                                    class="cursor-pointer rounded-pill"
                                    @click="signOutOpen = false"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    class="cursor-pointer gap-1.5 rounded-pill"
                                    @click="signOutOpen = false"
                                >
                                    <span class="inline-flex items-center gap-1.5">
                                        <CheckCircle2 class="size-4" />
                                        Sign me out
                                    </span>
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
