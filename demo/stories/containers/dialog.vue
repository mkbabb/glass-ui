<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
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

            <StorySection heading="Confirm dialog" gap="lg">
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
            </StorySection>
        
    </StoryPage>
</template>
