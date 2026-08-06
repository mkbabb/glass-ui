<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
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
import { Surface } from "@glass/components/surface";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";
import { Textarea } from "@glass/components/textarea";

// reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +

// the side sheet is its own component: `<SheetContent side>`
// (same reka DialogRoot + FocusScope; the slide is paint, not mechanism). The four
// sides are the anchored edges.
type SidePlacement = "top" | "right" | "bottom" | "left";
const sides: readonly SidePlacement[] = ["top", "right", "bottom", "left"] as const;

// The shared {glass·veil·opaque} surface axis — the folded Sheet's surface register.
type SheetSurface = "glass" | "veil" | "opaque";
const surfaces: readonly SheetSurface[] = ["glass", "veil", "opaque"] as const;

// The DETENT ladder — the drawer family, folded in as a prop. A rung is a fraction of
// the anchored axis the sheet occupies, so the footer sits on the visible edge at every
// one of them and `0` is a rung the drag can actually reach.
const rungs = [0.25, 0.4, 0.7, 1];
const rung = ref<number | null>(0.4);

// The live-behind ladder: `<Dialog :modal="false">` is reka's own non-modal arm, so the
// page behind keeps focus and pointer events while the sheet rests at a rung.
const peekRungs = [0.12, 0.5, 1];
const peekRung = ref<number | null>(0.12);
const peekOpen = ref(false);
const votes = ref(0);
</script>

<template>
    <StoryPage>
        <StorySection heading="Four sides" gap="lg">
            <p class="text-small text-muted-foreground">
                Each trigger opens its own side sheet — identical body, different
                <code class="font-mono text-micro">side</code> prop.
            </p>
            <div class="flex flex-wrap gap-3">
                <Dialog v-for="side in sides" :key="side">
                    <DialogTrigger as-child>
                        <Button class="capitalize"> Open {{ side }} </Button>
                    </DialogTrigger>
                    <SheetContent :side="side" scroll>
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
                    </SheetContent>
                </Dialog>
            </div>
        </StorySection>

        <StorySection heading="Detents" gap="lg">
            <p class="text-small text-muted-foreground">
                Four rungs: 25%, 40%, 70%, 100%. Drag the grip — or the header, or a
                list already scrolled to its top — and release: the throw is integrated
                through the same spring that catches it, so a hard fling and a slow
                nudge land on different rungs. Throwing it past the first rung dismisses
                it. Current rung —
                <code class="font-mono text-micro">{{ String(rung) }}</code
                >.
            </p>
            <div class="flex flex-wrap gap-3">
                <Dialog>
                    <DialogTrigger as-child>
                        <Button>Open detented sheet</Button>
                    </DialogTrigger>
                    <SheetContent side="bottom" :detents="rungs" v-model:detent="rung">
                        <DialogHeader>
                            <DialogTitle>Session details</DialogTitle>
                            <DialogDescription>
                                Drag the grip, or focus it and use Arrow, Home and End.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-3 text-small">
                            <div
                                v-for="r in rungs"
                                :key="r"
                                class="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono"
                            >
                                rung = {{ r }}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button data-testid="sheet-detent-action">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </SheetContent>
                </Dialog>
            </div>
        </StorySection>

        <StorySection heading="Live-behind detents" gap="lg">
            <p class="text-small text-muted-foreground">
                <code class="font-mono text-micro">:modal="false"</code> leaves the page
                behind interactive and unblurred while the sheet rests at peek, half or
                full — reka's own non-modal arm, no second mode enum.
            </p>
            <div
                class="relative min-h-[22rem] overflow-hidden rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <div class="space-y-3">
                    <h3 class="text-heading">Verdict — Trattoria No. 4</h3>
                    <p class="max-w-prose text-body text-muted-foreground">
                        Keep casting votes while the sheet is open.
                    </p>
                    <Button id="verdict-cta" @click="votes++">
                        Cast vote ({{ votes }})
                    </Button>
                </div>
                <div class="mt-4 flex items-center gap-2">
                    <span class="text-caption text-muted-foreground">Open at:</span>
                    <Button
                        v-for="[label, value] in [
                            ['Peek', 0.12],
                            ['Half', 0.5],
                            ['Full', 1],
                        ] as [string, number][]"
                        :key="label"
                        emphasis="quiet"
                        size="sm"
                        @click="((peekRung = value), (peekOpen = true))"
                    >
                        {{ label }}
                    </Button>
                    <span class="text-caption text-muted-foreground">
                        active: {{ peekRung }}
                    </span>
                </div>
                <Dialog v-model:open="peekOpen" :modal="false">
                    <DialogTrigger as-child>
                        <Button class="mt-6">Open instrument sheet</Button>
                    </DialogTrigger>
                    <SheetContent
                        side="bottom"
                        :detents="peekRungs"
                        v-model:detent="peekRung"
                    >
                        <DialogHeader>
                            <DialogTitle>Instrument</DialogTitle>
                            <DialogDescription>
                                Peek · half · full — the verdict stays live behind.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="space-y-3">
                            <p class="text-body text-muted-foreground">
                                Drag the grip to reach half, then full. The page behind
                                never scales and never loses focusability.
                            </p>
                            <Button emphasis="quiet">Reorder picks</Button>
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button>Done</Button>
                            </DialogClose>
                        </DialogFooter>
                    </SheetContent>
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
                    <SheetContent side="right" :surface="s">
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
                    </SheetContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger as-child>
                        <Button emphasis="quiet" disabled>Disabled trigger</Button>
                    </DialogTrigger>
                    <SheetContent side="right">
                        <DialogHeader>
                            <DialogTitle>Never reached</DialogTitle>
                        </DialogHeader>
                    </SheetContent>
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
