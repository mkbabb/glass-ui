<script setup lang="ts">
// Sheet's stage: one trigger, one sheet, from the chosen edge; with detents on, it
// rests at a rung and the grip throws it between them. The page opens it on arrival,
// and a new edge or detent setting opens it again, so each option shows; a card mounts
// it closed.
import { ref, watch } from "vue";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

type Side = "top" | "right" | "bottom" | "left";

const props = withDefaults(
    defineProps<{ side?: Side; detented?: boolean; openOnLoad?: boolean }>(),
    { side: "right", detented: false, openOnLoad: false },
);

const RUNGS = [0.4, 0.7, 1];
const rung = ref<number | null>(RUNGS[0]!);

// A sheet with detents reopens at its first rung, so the rung is what the option shows.
const open = ref(props.openOnLoad);
watch(
    () => [props.side, props.detented],
    () => {
        if (props.detented) rung.value = RUNGS[0]!;
        open.value = true;
    },
);
</script>

<template>
    <div class="sheet-stage">
        <Dialog v-model:open="open">
            <DialogTrigger as-child>
                <Button emphasis="primary">Edit details</Button>
            </DialogTrigger>
            <SheetContent
                :side="side"
                :detents="detented ? RUNGS : undefined"
                v-model:detent="rung"
            >
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>Changes save when you close the sheet.</DialogDescription>
                </DialogHeader>
                <div class="grid gap-2 py-4">
                    <Label for="sheet-stage-name">Name</Label>
                    <Input id="sheet-stage-name" model-value="Field Notes" />
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button emphasis="quiet">Cancel</Button>
                    </DialogClose>
                    <DialogClose as-child>
                        <Button emphasis="primary">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </SheetContent>
        </Dialog>
    </div>
</template>

<style scoped>
.sheet-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-4);
}
</style>
