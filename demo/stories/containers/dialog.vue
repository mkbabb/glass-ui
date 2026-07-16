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
} from "@glass/components/dialog";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import { LoaderCircle } from "@lucide/vue";

// reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +

const confirmOpen = ref(false);
const confirming = ref(false);
const confirmed = ref(0);
const backgroundEdits = ref(0);
const releaseChecks = [
    "Public exports",
    "Type declarations",
    "Keyboard order",
    "Focus restoration",
    "Narrow layout",
    "Reduced motion",
    "Light material",
    "Dark material",
    "Pointer dismissal",
    "Escape dismissal",
    "Packed fonts",
    "Consumer install",
] as const;

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
                                    <Button>Cancel</Button>
                                </DialogClose>
                                <DialogClose as-child>
                                    <Button>Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger as-child>
                            <Button>Opaque variant</Button>
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

            <StorySection heading="Behavior states" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The same Dialog anatomy covers nonmodal work, bounded scrolling,
                    nested focus ownership, and compositions with an ordinary explicit
                    close action.
                </p>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="glass-card grid content-between gap-5 rounded-[var(--radius-card)] p-5">
                        <div>
                            <h3 class="text-subheading">Nonmodal notes</h3>
                            <p class="mt-1 text-small text-muted-foreground">
                                The score control remains reachable behind the note.
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <Button emphasis="quiet" @click="backgroundEdits++">
                                Adjust score ({{ backgroundEdits }})
                            </Button>
                            <Dialog :modal="false">
                                <DialogTrigger as-child>
                                    <Button>Open note</Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-sm">
                                    <DialogHeader>
                                        <DialogTitle>Review note</DialogTitle>
                                        <DialogDescription>
                                            Keep the score control available while this
                                            short reference is open.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <p class="text-small text-muted-foreground">
                                        The selected curve settles cleanly at both ends.
                                    </p>
                                    <DialogFooter>
                                        <DialogClose as-child>
                                            <Button>Done</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <div class="glass-card grid content-between gap-5 rounded-[var(--radius-card)] p-5">
                        <div>
                            <h3 class="text-subheading">Long release review</h3>
                            <p class="mt-1 text-small text-muted-foreground">
                                One viewport-bounded content owner, with real overflow.
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger as-child>
                                <Button>Review checks</Button>
                            </DialogTrigger>
                            <DialogContent scroll class="max-h-[32rem] sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Release checks</DialogTitle>
                                    <DialogDescription>
                                        Review every item before publishing the package.
                                    </DialogDescription>
                                </DialogHeader>
                                <ol class="grid divide-y divide-border/50">
                                    <li
                                        v-for="(check, index) in releaseChecks"
                                        :key="check"
                                        class="flex items-center gap-3 py-3 text-small"
                                    >
                                        <span class="w-6 font-mono text-xs text-muted-foreground">
                                            {{ String(index + 1).padStart(2, "0") }}
                                        </span>
                                        <span>{{ check }}</span>
                                    </li>
                                </ol>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button>Finish review</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div class="glass-card grid content-between gap-5 rounded-[var(--radius-card)] p-5">
                        <div>
                            <h3 class="text-subheading">Nested decision</h3>
                            <p class="mt-1 text-small text-muted-foreground">
                                The inner dialog owns its focus and restores it to the
                                outer action.
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger as-child>
                                <Button>Open release plan</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Release plan</DialogTitle>
                                    <DialogDescription>
                                        Review the candidate, then open the nested
                                        publishing decision.
                                    </DialogDescription>
                                </DialogHeader>
                                <div class="rounded-[var(--radius-strip)] border border-border/50 p-4 text-small text-muted-foreground">
                                    Candidate 7.0.0 · 69 public component entries
                                </div>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button emphasis="quiet">Back</Button>
                                    </DialogClose>
                                    <Dialog>
                                        <DialogTrigger as-child>
                                            <Button>Choose publication</Button>
                                        </DialogTrigger>
                                        <DialogContent class="sm:max-w-sm">
                                            <DialogHeader>
                                                <DialogTitle>Publish candidate?</DialogTitle>
                                                <DialogDescription>
                                                    This creates the immutable registry
                                                    artifact.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose as-child>
                                                    <Button>Keep reviewing</Button>
                                                </DialogClose>
                                                <DialogClose as-child>
                                                    <Button>Publish</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div class="glass-card grid content-between gap-5 rounded-[var(--radius-card)] p-5">
                        <div>
                            <h3 class="text-subheading">Explicit close</h3>
                            <p class="mt-1 text-small text-muted-foreground">
                                No corner control; the named footer action is the only
                                visible close affordance.
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger as-child>
                                <Button>Open assignment</Button>
                            </DialogTrigger>
                            <DialogContent :show-close="false" class="sm:max-w-sm">
                                <DialogHeader>
                                    <DialogTitle>Assign reviewer</DialogTitle>
                                    <DialogDescription>
                                        Choose an owner before the release enters review.
                                    </DialogDescription>
                                </DialogHeader>
                                <div class="grid gap-3 py-2">
                                    <Label for="reviewer">Reviewer</Label>
                                    <Input id="reviewer" placeholder="Name or team" />
                                </div>
                                <DialogFooter>
                                    <DialogClose as-child>
                                        <Button emphasis="quiet">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose as-child>
                                        <Button>Assign reviewer</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
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
                        <Dialog v-model:open="confirmOpen">
                            <DialogTrigger as-child>
                                <Button tone="destructive">Delete</Button>
                            </DialogTrigger>
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
                </div>
            </StorySection>

    </StoryPage>
</template>
