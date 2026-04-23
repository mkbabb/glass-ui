<script setup lang="ts">
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";

const confirmOpen = ref(false);
const confirming = ref(false);
const confirmed = ref(0);

function onConfirm() {
    confirming.value = true;
    setTimeout(() => {
        confirming.value = false;
        confirmed.value += 1;
    }, 700);
}
</script>

<template>
    <section class="mx-auto max-w-5xl px-8 py-16">
        <header class="mb-12 grid gap-3">
            <p class="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                Containers · Dialog
            </p>
            <h1 class="font-display text-5xl leading-tight">Dialog</h1>
            <p class="max-w-2xl text-lg text-muted-foreground">
                Modal surface anchored to the viewport center with fade + zoom-95
                entry. Header/title/description/footer subcomponents compose; the
                <code class="font-mono text-sm">ConfirmDialog</code> custom wraps
                the common destructive-action pattern.
            </p>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="font-display text-xl">Standard dialog</h2>
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
                        <DialogContent variant="opaque">
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
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Confirm dialog</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">ConfirmDialog</code> — destructive
                    flag, async loading state, emits <code class="font-mono text-xs">@confirm</code>.
                    Confirmed {{ confirmed }} time(s).
                </p>
                <div class="relative isolate rounded-2xl border border-border bg-card p-6">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <p class="font-display text-lg">Delete workspace</p>
                            <p class="text-sm text-muted-foreground">
                                Anchored absolutely inside this card surface.
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            @click="confirmOpen = true"
                        >
                            Delete
                        </Button>
                    </div>
                    <ConfirmDialog
                        v-model:open="confirmOpen"
                        title="Delete workspace?"
                        description="This action cannot be undone. Assets, sessions, and tokens are permanently destroyed."
                        confirm-label="Delete forever"
                        destructive
                        :loading="confirming"
                        @confirm="onConfirm"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
