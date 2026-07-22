<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { Button } from "@glass/components/button";
import { Surface } from "@glass/components/surface";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import { Textarea } from "@glass/components/textarea";

// reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +

// the Sheet side-slide FOLDED onto `<DialogContent placement>`
// (same reka DialogRoot + FocusScope; the slide is paint, not mechanism). The four
// non-center placements are the retired Sheet sides.
type SidePlacement = "top" | "right" | "bottom" | "left";
const sides: readonly SidePlacement[] = ["top", "right", "bottom", "left"] as const;

// The shared {glass·veil·opaque} surface axis — the folded Sheet's surface register.
type SheetSurface = "glass" | "veil" | "opaque";
const surfaces: readonly SheetSurface[] = ["glass", "veil", "opaque"] as const;
</script>

<template>
    <StoryPage>
        <StorySection heading="Four sides" gap="lg">
            <p class="text-small text-muted-foreground">
                Each trigger opens its own side sheet — identical body, different
                <code class="font-mono text-micro">placement</code> prop.
            </p>
            <div class="flex flex-wrap gap-3">
                <Dialog v-for="side in sides" :key="side">
                    <DialogTrigger as-child>
                        <Button class="capitalize"> Open {{ side }} </Button>
                    </DialogTrigger>
                    <DialogContent :placement="side" scroll>
                        <DialogHeader>
                            <DialogTitle class="capitalize">
                                {{ side }} sheet
                            </DialogTitle>
                            <DialogDescription>
                                Slides in from the {{ side }} edge. Esc or overlay-click
                                dismisses.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                            <div class="grid gap-2">
                                <Label for="name">Name</Label>
                                <Input id="name" placeholder="workspace-01" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Free-form text…"
                                    rows="4"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button>Cancel</Button>
                            </DialogClose>
                            <DialogClose as-child>
                                <Button>Save changes</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </StorySection>

        <StorySection heading="Surface axis + states" gap="lg">
            <p class="text-small text-muted-foreground">
                The same side sheet across the
                <code class="font-mono text-micro">surface</code> axis (glass · veil ·
                opaque) and the disabled-trigger edge. Any
                <code class="font-mono text-micro">Button</code> variant anchors it.
            </p>
            <Surface
                material="content"
                surface="veil"
                class="flex flex-wrap items-center gap-3 p-5"
            >
                <Dialog v-for="s in surfaces" :key="s">
                    <DialogTrigger as-child>
                        <Button
                            :emphasis="s === 'glass' ? 'primary' : 'secondary'"
                            :aria-pressed="s === 'glass'"
                            class="capitalize"
                        >
                            {{ s }} sheet
                        </Button>
                    </DialogTrigger>
                    <DialogContent placement="right" :surface="s">
                        <DialogHeader>
                            <DialogTitle class="capitalize">
                                {{ s }} surface
                            </DialogTitle>
                            <DialogDescription>
                                The right-edge sheet rendered on the
                                <span class="capitalize">{{ s }}</span> rung of the
                                shared surface axis.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-2 py-4">
                            <Label :for="`field-${s}`">Field</Label>
                            <Input :id="`field-${s}`" placeholder="Value…" />
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button>Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button emphasis="quiet" disabled>Disabled trigger</Button>
                    </DialogTrigger>
                    <DialogContent placement="right">
                        <DialogHeader>
                            <DialogTitle>Never reached</DialogTitle>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </Surface>
        </StorySection>

        <StorySection heading="When to use" gap="lg">
            <ul class="list-disc pl-6 text-small text-muted-foreground grid gap-1">
                <li>
                    Detail / inspector panels that reveal alongside the primary view
                    rather than replacing it.
                </li>
                <li>
                    Multi-field forms where a <code class="font-mono">Dialog</code>
                    would feel cramped.
                </li>
                <li>
                    Host for the demo configurator on the right edge — toggled from the
                    <code class="font-mono">,</code> shortcut.
                </li>
            </ul>
        </StorySection>
    </StoryPage>
</template>
