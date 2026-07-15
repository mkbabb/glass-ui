<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import { Button } from "@glass/components/button";
// BI.W-DIALOG-PLACEMENT — ConfirmDialog DEMOTED to a Dialog PRESET (its imperative
// promise-opener was thin — a preset over the Dialog root, not a distinct component).
// The confirm flow is a CONSUMER composition now (presets live in consumers): a glass
// `<DialogContent :show-close="false">` with a title/description + a confirm/cancel
// footer + the loading dismiss-guard. This story IS that preset, shown inline.
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@glass/components/dialog";
import { IconChip } from "@glass/components/icon-chip";
import {
    Trash2,
    LogOut,
    Archive,
    CheckCircle2,
    ShieldAlert,
    LoaderCircle,
} from "@lucide/vue";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

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
        <!-- BB.W-SUFFUSE3 — the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail + the focal IconChip, all on
             --section-color-8). The page-level color identity, DISTINCT from the
             section labels below — it carries NO heading rung (not an idiom-B
             second header; PH3). -->
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ShieldAlert" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Confirm Dialog
                </span>
                <p class="text-small text-muted-foreground">
                    The confirm-flow Dialog preset — a glass
                    <code class="font-mono text-xs">Dialog</code> composition, not a
                    distinct component; the destructive tone carries its own button
                    register.
                </p>
            </div>
        </header>

        <section class="flex flex-col gap-3">
            <p class="section-label">destructive — delete workspace</p>
            <div
                class="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 min-h-[240px]"
            >
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 text-sm text-foreground">
                        <Trash2 class="size-4 text-destructive" />
                        <span>Workspace: <em>fourier-sandbox-42</em></span>
                    </div>
                    <p class="max-w-prose text-sm text-muted-foreground">
                        Deleting a workspace removes every analysis, note, and
                        attachment inside it. This cannot be undone — use the
                        destructive pattern.
                    </p>
                    <div>
                        <Button
                            tone="destructive"
                            class="gap-1.5"
                            @click="destructiveOpen = true"
                        >
                            <Trash2 class="size-4" />
                            Delete workspace
                        </Button>
                    </div>
                    <ul
                        v-if="destructiveLog.length"
                        class="mt-2 font-mono text-xs text-muted-foreground"
                    >
                        <li v-for="line in destructiveLog" :key="line">— {{ line }}</li>
                    </ul>
                </div>

                <Dialog v-model:open="destructiveOpen">
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
                                variant="outline"
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
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">benign — archive thread</p>
            <div
                class="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 min-h-[200px]"
            >
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-2 text-sm text-foreground">
                        <Archive class="size-4 text-muted-foreground" />
                        <span>Thread: <em>Q2 planning notes</em></span>
                    </div>
                    <p class="max-w-prose text-sm text-muted-foreground">
                        Archive is reversible — the confirm button stays
                        default-tone. Keep the guardrail for deliberate
                        intent, not for consequence.
                    </p>
                    <div>
                        <Button
                            variant="outline"
                            class="gap-1.5"
                            @click="benignOpen = true"
                        >
                            <Archive class="size-4" />
                            Archive thread
                        </Button>
                    </div>
                    <ul
                        v-if="benignLog.length"
                        class="mt-2 font-mono text-xs text-muted-foreground"
                    >
                        <li v-for="line in benignLog" :key="line">— {{ line }}</li>
                    </ul>
                </div>

                <Dialog v-model:open="benignOpen">
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
                                variant="outline"
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
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">custom body + action</p>
            <div
                class="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 min-h-[220px]"
            >
                <div class="flex flex-col gap-3">
                    <p class="max-w-prose text-sm text-muted-foreground">
                        A richer body + a custom confirm label — the preset is just
                        Dialog primitives, so consumers frame it however they like.
                    </p>
                    <div>
                        <Button variant="outline" class="gap-1.5" @click="signOutOpen = true">
                            <LogOut class="size-4" />
                            Sign out
                        </Button>
                    </div>
                </div>

                <Dialog v-model:open="signOutOpen">
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
                                variant="outline"
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
        </section>
    </StoryPage>
</template>
