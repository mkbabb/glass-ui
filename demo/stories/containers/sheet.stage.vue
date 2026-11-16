<script setup lang="ts">
// Sheet's stage: one trigger, one sheet, from the chosen edge; with detents on, it
// rests at a rung and the grip throws it between them.
import { ref } from "vue";
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

withDefaults(defineProps<{ side?: Side; detented?: boolean }>(), {
    side: "right",
    detented: false,
});

const RUNGS = [0.4, 0.7, 1];
const rung = ref<number | null>(0.4);
</script>

<template>
    <div class="sheet-stage">
        <Dialog>
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
