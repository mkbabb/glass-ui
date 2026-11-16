<script setup lang="ts">
// Dialog's stage: one trigger, one dialog. The dismissal rung picks what the dialog
// asks; the scrim weight sets the page's scrim token while this stage is mounted.
import { computed, onBeforeUnmount, watchEffect } from "vue";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    type DialogDismiss,
} from "@glass/components/dialog";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type ScrimWeight = "subtle" | "default" | "strong";

const props = withDefaults(defineProps<{ dismiss?: DialogDismiss; scrim?: ScrimWeight }>(), {
    dismiss: "free",
    scrim: "default",
});

const SCRIM: Record<ScrimWeight, string | null> = {
    subtle: "var(--overlay-scrim-subtle)",
    default: null,
    strong: "var(--overlay-scrim-strong)",
};

// The scrim is portalled to the body, so the token is set there.
watchEffect(() => {
    const value = SCRIM[props.scrim];
    if (value) document.body.style.setProperty("--overlay-scrim", value);
    else document.body.style.removeProperty("--overlay-scrim");
});
onBeforeUnmount(() => document.body.style.removeProperty("--overlay-scrim"));

const trigger = computed(
    () => ({ free: "Rename", deliberate: "Delete project", locked: "Review terms" })[props.dismiss],
);
</script>

<template>
    <div class="dialog-stage">
        <StageSwap :swap-key="dismiss">
        <Dialog>
            <DialogTrigger as-child>
                <Button
                    :emphasis="dismiss === 'deliberate' ? 'secondary' : 'primary'"
                    :tone="dismiss === 'deliberate' ? 'destructive' : undefined"
                >
                    {{ trigger }}
                </Button>
            </DialogTrigger>

            <DialogContent v-if="dismiss === 'free'">
                <DialogHeader>
                    <DialogTitle>Rename workspace</DialogTitle>
                    <DialogDescription>Pick a name your team will recognise.</DialogDescription>
                </DialogHeader>
                <div class="grid gap-2">
                    <Label for="dialog-stage-name">Name</Label>
                    <Input id="dialog-stage-name" model-value="Field Notes" />
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button emphasis="quiet">Cancel</Button>
                    </DialogClose>
                    <DialogClose as-child>
                        <Button emphasis="primary">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

            <DialogContent v-else-if="dismiss === 'deliberate'" dismiss="deliberate">
                <DialogHeader>
                    <DialogTitle>Delete this project?</DialogTitle>
                    <DialogDescription>Every note and draft inside it goes too.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button emphasis="quiet">Keep it</Button>
                    </DialogClose>
                    <DialogClose as-child>
                        <Button emphasis="primary" tone="destructive">Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

            <DialogContent v-else dismiss="locked">
                <DialogHeader>
                    <DialogTitle>Terms of use</DialogTitle>
                    <DialogDescription>Accept the terms to continue.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button emphasis="primary">Accept</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </StageSwap>
    </div>
</template>

<style scoped>
.dialog-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
}
</style>
