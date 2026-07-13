<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@glass/components/ui/dialog";
import { Button } from "@glass/components/ui/button";
import { Input } from "@glass/components/ui/input";
import { Label } from "@glass/components/ui/label";
import { IconChip } from "@glass/components/custom/icon-chip";
import { MessageSquare, LoaderCircle } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const confirmOpen = ref(false);
const confirming = ref(false);
const confirmed = ref(0);

function onConfirm() {
    if (confirming.value) return;
    confirming.value = true;
    setTimeout(() => {
        confirming.value = false;
        confirmed.value += 1;
        confirmOpen.value = false;
    }, 700);
}
// The loading dismiss-guard: while a confirm is in-flight, PREVENT reka's dismiss intents.
function guardConfirmDismiss(event: Event) {
    if (confirming.value) event.preventDefault();
}
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="MessageSquare" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Dialog
                </span>
                <p class="text-small text-muted-foreground">
                    Modal dialog surfaces — the container identity is the ONE color
                    event.
                </p>
            </div>
        </header>

            <StorySection heading="Standard dialog" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Glass variant with a form body and a cancel/submit footer.
                </p>
                <div class="flex flex-wrap gap-3">
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button>Open glass dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename workspace</DialogTitle>
                                <DialogDescription>
                                    Slug must be lowercase, kebab-cased.
                                </DialogDescription>
                            </DialogHeader>
                            <div class="grid gap-3 py-2">
                                <Label for="slug">Slug</Label>
                                <Input id="slug" placeholder="sun-spots" />
                            </div>
                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose as-child>
                                    <Button>Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="outline">Opaque variant</Button>
                        </DialogTrigger>
                        <DialogContent surface="opaque">
                            <DialogHeader>
                                <DialogTitle>Solid surface</DialogTitle>
                                <DialogDescription>
                                    Use when the content needs maximum contrast —
                                    forms with dense typography, code blocks, or
                                    embedded tables.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button>Got it</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </StorySection>

            <StorySection heading="Confirm preset" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The confirm-flow Dialog preset — destructive tone, async loading
                    state, the loading dismiss-guard. A consumer composition over
                    <code class="font-mono text-xs">Dialog</code>, not a distinct
                    component. Confirmed {{ confirmed }} time(s).
                </p>
                <div class="relative isolate rounded-2xl border border-border bg-card p-6">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <p class="text-subheading">Delete workspace</p>
                            <p class="text-sm text-muted-foreground">
                                Anchored absolutely inside this card surface.
                            </p>
                        </div>
                        <Button
                            tone="destructive"
                            @click="confirmOpen = true"
                        >
                            Delete
                        </Button>
                    </div>
                    <Dialog v-model:open="confirmOpen">
                        <DialogContent
                            surface="glass"
                            class="w-[calc(100%-2rem)] sm:max-w-sm"
                            :show-close="false"
                            @escape-key-down="guardConfirmDismiss"
                            @interact-outside="guardConfirmDismiss"
                        >
                            <DialogHeader>
                                <DialogTitle class="font-display font-semibold">
                                    Delete workspace?
                                </DialogTitle>
                                <DialogDescription class="fira-code">
                                    This action cannot be undone. Assets, sessions, and
                                    tokens are permanently destroyed.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter class="gap-2">
                                <Button
                                    variant="outline"
                                    class="cursor-pointer rounded-pill"
                                    :disabled="confirming"
                                    @click="confirmOpen = false"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    tone="destructive"
                                    class="cursor-pointer gap-1.5 rounded-pill"
                                    :disabled="confirming"
                                    @click="onConfirm"
                                >
                                    <LoaderCircle
                                        v-if="confirming"
                                        class="size-4 animate-spin"
                                    />
                                    Delete forever
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </StorySection>
        
    </StoryPage>
</template>
