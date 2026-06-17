<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { ConfirmDialog } from "../../../src/components/custom/confirm-dialog";
import { Trash2, LogOut, Archive, CheckCircle2, ShieldQuestion } from "@lucide/vue";
import { IconChip } from "../../../src/components/custom/icon-chip";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

const destructiveOpen = ref(false);
const destructiveLoading = ref(false);
const destructiveLog = ref<string[]>([]);

function onDestructiveConfirm(): void {
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

const benignOpen = ref(false);
const benignLog = ref<string[]>([]);
function onBenignConfirm(): void {
    benignLog.value = [
        `Archived at ${new Date().toLocaleTimeString()}`,
        ...benignLog.value,
    ].slice(0, 4);
}

const signOutOpen = ref(false);
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity event family (the tinted
             eyebrow + the accent rail + the focal IconChip, all on --section-color-8).
             The confirm flows carry their own destructive/benign button registers;
             the section identity is the ONE page event. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ShieldQuestion" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Confirm
                </span>
                <p class="text-small text-muted-foreground">
                    Destructive and benign confirmation flows — the button tones
                    are the component's; the section identity is the page event.
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
                            variant="destructive"
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

                <ConfirmDialog
                    v-model:open="destructiveOpen"
                    title="Delete workspace?"
                    description="This will permanently remove all analyses, notes, and attachments inside fourier-sandbox-42. This cannot be undone."
                    confirm-label="Delete workspace"
                    destructive
                    :loading="destructiveLoading"
                    @confirm="onDestructiveConfirm"
                />
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

                <ConfirmDialog
                    v-model:open="benignOpen"
                    title="Archive this thread?"
                    description="Archived threads move to the Archive tab. You can restore them any time."
                    confirm-label="Archive"
                    @confirm="onBenignConfirm"
                />
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">slot override — custom body + action</p>
            <div
                class="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 min-h-[220px]"
            >
                <div class="flex flex-col gap-3">
                    <p class="max-w-prose text-sm text-muted-foreground">
                        Default + action slots let consumers swap copy and the
                        confirm label for richer framing.
                    </p>
                    <div>
                        <Button variant="outline" class="gap-1.5" @click="signOutOpen = true">
                            <LogOut class="size-4" />
                            Sign out
                        </Button>
                    </div>
                </div>

                <ConfirmDialog
                    v-model:open="signOutOpen"
                    title="Sign out of all devices?"
                    confirm-label="Sign out"
                >
                    <p>
                        You'll need to re-authenticate the next time you open
                        the editor. Local drafts stay on this device.
                    </p>
                    <template #action>
                        <span class="inline-flex items-center gap-1.5">
                            <CheckCircle2 class="size-4" />
                            Sign me out
                        </span>
                    </template>
                </ConfirmDialog>
            </div>
        </section>
    </StoryPage>
</template>
