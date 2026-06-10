<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
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
} from "../../../src/components/ui/dialog";
import { Button } from "../../../src/components/ui/button";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { ConfirmDialog } from "../../../src/components/custom/confirm-dialog";
import { GlassDialogNative } from "../../../src/components/custom/dialog-native";

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

// The native top-layer opt-in: a real <dialog> on the .glass-top-layer entry
// grammar, opened declaratively via commandfor where the browser supports it,
// else the JS showModal() fallback.
const settingsDlg = ref<InstanceType<typeof GlassDialogNative> | null>(null);
const supportsCommand =
    typeof HTMLButtonElement !== "undefined" &&
    "command" in HTMLButtonElement.prototype;
</script>

<template>
    <StoryPage>
        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="text-subheading">Standard dialog</h2>
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
                <h2 class="text-subheading">Confirm dialog</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">ConfirmDialog</code> — destructive
                    flag, async loading state, emits <code class="font-mono text-xs">@confirm</code>.
                    Confirmed {{ confirmed }} time(s).
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

            <div class="grid gap-4">
                <h2 class="text-subheading">Native top-layer</h2>
                <p class="text-sm text-muted-foreground">
                    A real native dialog element on the top layer. Its entry and
                    exit are pure CSS — the glass-top-layer starting-style grammar
                    — and a backdrop click or Esc dismisses it. The trigger opens
                    it declaratively with commandfor where the browser supports
                    invoker commands, and falls back to a scripted open otherwise.
                </p>
                <div class="flex flex-wrap gap-3">
                    <button
                        v-if="supportsCommand"
                        commandfor="settings-dlg"
                        command="show-modal"
                        class="glass-btn"
                    >
                        Open settings
                    </button>
                    <Button v-else @click="settingsDlg?.showModal()">
                        Open settings
                    </Button>
                </div>

                <GlassDialogNative
                    id="settings-dlg"
                    ref="settingsDlg"
                    labelledby="settings-dlg-title"
                >
                    <template #default="{ close }">
                        <div class="grid gap-4">
                            <h3 id="settings-dlg-title" class="text-subheading">
                                Settings
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                Click the backdrop or press Esc to dismiss.
                            </p>
                            <div class="flex justify-end">
                                <Button variant="outline" @click="close()">Close</Button>
                            </div>
                        </div>
                    </template>
                </GlassDialogNative>
            </div>
        </div>
    </StoryPage>
</template>
