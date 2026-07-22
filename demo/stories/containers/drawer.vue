<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@glass/components/drawer";
import { DialogClose, DialogTrigger } from "@glass/components/dialog";
import { Button } from "@glass/components/button";

const snap = ref<number | string | null>(0.4);
const snapPoints = [0.25, 0.4, 0.7, 1] as const;

// live-behind mode — a detented non-modal sheet over a still-interactive surface.
const liveActiveSnap = ref<number | string | null>(0.12);
const liveOpen = ref(false);
const ctaPresses = ref(0);
const rightOpen = ref(false);
const checklistItems = ref(3);

const fixedEdges = [
    {
        direction: "left",
        title: "Project index",
        trigger: "Browse projects",
        close: "Close project index",
        items: ["Overview", "People", "Files", "Settings"],
    },
    {
        direction: "right",
        title: "Release activity",
        trigger: "Review releases",
        close: "Close release activity",
        items: Array.from(
            { length: 18 },
            (_, index) => `Build ${18 - index} · verified`,
        ),
    },
] as const;
</script>

<template>
    <StoryPage>
        <StorySection heading="Snap points" gap="lg">
            <p class="text-small text-muted-foreground">
                Four snap positions: 25%, 40%, 70%, 100%. Current snap —
                <code class="font-mono text-micro">{{ String(snap) }}</code
                >.
            </p>
            <div class="flex flex-wrap gap-3">
                <Drawer v-model:active-snap-point="snap" :snap-points="[...snapPoints]">
                    <DialogTrigger as-child>
                        <Button>Open drawer</Button>
                    </DialogTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Session details</DrawerTitle>
                            <DrawerDescription>
                                Drag the handle or focus it and use Arrow, Home, and End
                                to switch snap points.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="px-6 pb-4 grid gap-3 text-small">
                            <div
                                v-for="p in snapPoints"
                                :key="p"
                                class="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono"
                            >
                                snap = {{ p }}
                            </div>
                        </div>
                        <DrawerFooter>
                            <DialogClose as-child>
                                <Button>Close</Button>
                            </DialogClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>

        <StorySection heading="Fixed edge panels" gap="lg">
            <p class="text-small text-muted-foreground">
                Left and right drawers are full-slide panels without a detent grip. The
                longer activity feed scrolls inside its fixed panel while the title and
                close action remain seated.
            </p>
            <div class="flex flex-wrap gap-3">
                <Drawer
                    v-for="edge in fixedEdges"
                    :key="edge.direction"
                    :direction="edge.direction"
                >
                    <DialogTrigger as-child>
                        <Button>{{ edge.trigger }}</Button>
                    </DialogTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{{ edge.title }}</DrawerTitle>
                            <DrawerDescription>
                                {{
                                    edge.direction === "right"
                                        ? "Recent release events."
                                        : "Workspace navigation."
                                }}
                            </DrawerDescription>
                        </DrawerHeader>
                        <ul
                            class="min-h-0 flex-1 space-y-2 overflow-y-auto px-6 pb-6"
                            :tabindex="edge.direction === 'right' ? 0 : undefined"
                            :aria-label="
                                edge.direction === 'right' ? edge.title : undefined
                            "
                            :data-testid="
                                edge.direction === 'right'
                                    ? 'drawer-inner-scroll'
                                    : undefined
                            "
                        >
                            <li
                                v-for="item in edge.items"
                                :key="item"
                                class="rounded-lg border border-border/50 bg-card/50 px-3 py-2 text-small"
                            >
                                {{ item }}
                            </li>
                        </ul>
                        <DrawerFooter>
                            <DialogClose as-child>
                                <Button>{{ edge.close }}</Button>
                            </DialogClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>

        <StorySection heading="Bottom fixed height" gap="lg">
            <p class="text-small text-muted-foreground">
                Omit <code class="font-mono text-micro">snapPoints</code> for a single
                resting position sized by content.
            </p>
            <div class="flex flex-wrap gap-3">
                <Drawer>
                    <DialogTrigger as-child>
                        <Button>Open fixed drawer</Button>
                    </DialogTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Quick actions</DrawerTitle>
                            <DrawerDescription>
                                Content-sized bottom sheet — no snap dragging.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="px-6 pb-6 grid gap-2">
                            <Button emphasis="quiet" class="justify-start">
                                Edit
                            </Button>
                            <Button emphasis="quiet" class="justify-start">
                                Duplicate
                            </Button>
                            <Button
                                emphasis="quiet"
                                class="justify-start text-destructive"
                            >
                                Delete
                            </Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>

        <StorySection heading="Immersive stage" gap="lg">
            <p class="text-small text-muted-foreground">
                <code class="font-mono text-micro">stage="immersive"</code> adds the
                private stage scrim — one fixed 14px backdrop sample scaled by
                <code class="font-mono text-micro">--glass-level</code> (so
                reduced-transparency and forced-colors flatten it), never a per-frame
                radius ramp. The page recedes behind it; the backdrop blurs to a
                spotlight while the dim tracks the pull.
            </p>
            <div class="flex flex-wrap gap-3">
                <Drawer stage="immersive">
                    <DialogTrigger as-child>
                        <Button>Open immersive drawer</Button>
                    </DialogTrigger>
                    <DrawerContent data-testid="drawer-immersive">
                        <DrawerHeader>
                            <DrawerTitle>Immersive session</DrawerTitle>
                            <DrawerDescription>
                                The field behind the sheet is blurred to a fixed
                                14px spotlight — a scene-separation effect, not a
                                glass surface. Close to compare with the plain
                                dim above.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="px-6 pb-6 grid gap-2">
                            <Button emphasis="quiet" class="justify-start">
                                Continue
                            </Button>
                            <DialogClose as-child>
                                <Button emphasis="quiet" class="justify-start">
                                    Dismiss
                                </Button>
                            </DialogClose>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>

        <StorySection heading="Right live-behind · reversible" gap="lg">
            <p class="text-small text-muted-foreground">
                The Review trigger remains reachable while the right panel moves. Use it
                rapidly to reverse direction; adding a checklist item confirms the
                release plan stays interactive behind the panel.
            </p>
            <div
                class="flex min-h-56 flex-wrap content-start items-start gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <Drawer v-model:open="rightOpen" direction="right" mode="live-behind">
                    <DialogTrigger as-child>
                        <Button
                            size="sm"
                            class="w-20"
                            :aria-label="
                                rightOpen
                                    ? 'Close release review'
                                    : 'Open release review'
                            "
                            data-testid="drawer-right-reverse-trigger"
                        >
                            {{ rightOpen ? "Close" : "Review" }}
                        </Button>
                    </DialogTrigger>
                    <DrawerContent
                        :show-overlay="false"
                        style="width: min(22rem, 68vw)"
                        data-testid="drawer-right-live-behind"
                    >
                        <DrawerHeader>
                            <DrawerTitle>Release review</DrawerTitle>
                            <DrawerDescription>
                                Check readiness without blocking edits to the release
                                plan.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="space-y-3 px-6 pb-6 text-small text-muted-foreground">
                            <p>
                                Confirm the final checklist while the plan remains
                                editable.
                            </p>
                            <DialogClose as-child>
                                <Button>Finish review</Button>
                            </DialogClose>
                        </div>
                    </DrawerContent>
                </Drawer>
                <Button emphasis="quiet" @click="checklistItems++">
                    Add checklist item
                </Button>
                <span
                    class="self-center text-mono-small text-muted-foreground"
                    aria-live="polite"
                >
                    {{ checklistItems }} items · review
                    {{ rightOpen ? "open" : "closed" }}
                </span>
            </div>
        </StorySection>

        <StorySection heading="Live-behind mode" gap="lg">
            <p class="text-small text-muted-foreground">
                The sheet pauses at Peek, Half, and Full while the verdict remains
                usable behind it. Even Full stops above the persistent action bar.
            </p>
            <div
                id="verdict-surface"
                class="relative min-h-[24rem] overflow-hidden rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <div class="space-y-3">
                    <h3 class="text-heading">Verdict — Trattoria No. 4</h3>
                    <p class="max-w-prose text-body text-muted-foreground">
                        Keep casting and revising votes while the instrument sheet is
                        open.
                    </p>
                    <Button id="verdict-cta" @click="ctaPresses++">
                        Cast vote ({{ ctaPresses }})
                    </Button>
                </div>

                <!-- Open the sheet at a chosen detent, then DRAG the handle to
                         cycle peek → half → full. The HOUSE snap engine
                         (`useDrawerSnap`) re-snaps an already-open sheet from an
                         external `activeSnapPoint` write, so these buttons set the
                         detent whether the sheet is closed or open. -->
                <div class="mt-4 flex items-center gap-2">
                    <span class="text-caption text-muted-foreground">Open at:</span>
                    <Button
                        id="detent-peek"
                        emphasis="quiet"
                        size="sm"
                        @click="((liveActiveSnap = 0.12), (liveOpen = true))"
                    >
                        Peek
                    </Button>
                    <Button
                        id="detent-half"
                        emphasis="quiet"
                        size="sm"
                        @click="((liveActiveSnap = 0.5), (liveOpen = true))"
                    >
                        Half
                    </Button>
                    <Button
                        id="detent-full"
                        emphasis="quiet"
                        size="sm"
                        @click="((liveActiveSnap = 1), (liveOpen = true))"
                    >
                        Full
                    </Button>
                    <span class="text-caption text-muted-foreground">
                        active: {{ liveActiveSnap }}
                    </span>
                </div>

                <Drawer
                    mode="live-behind"
                    v-model:open="liveOpen"
                    v-model:active-snap-point="liveActiveSnap"
                >
                    <DialogTrigger as-child>
                        <Button class="mt-6"> Open instrument sheet </Button>
                    </DialogTrigger>
                    <DrawerContent
                        :show-overlay="false"
                        class="live-sheet"
                        style="--drawer-inset-block-end: 4.5rem"
                        data-reserve-specimen
                    >
                        <DrawerHeader>
                            <DrawerTitle>Instrument</DrawerTitle>
                            <DrawerDescription>
                                Peek · half · full — the verdict stays live behind.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="space-y-3 p-4">
                            <p class="text-body text-muted-foreground">
                                Drag the handle or use its keyboard controls to reach
                                half, then full. The page behind never scales and never
                                loses focusability.
                            </p>
                            <Button emphasis="quiet">Reorder picks</Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <div
                v-if="liveOpen"
                class="fixed inset-x-0 bottom-0 flex items-center justify-center border-t border-border bg-card text-caption text-muted-foreground"
                :style="{ height: '4.5rem', zIndex: 'var(--z-dock)' }"
                data-drawer-reserve-band
                data-dock-z-witness
            >
                Reserved dock band · 4.5rem
            </div>
        </StorySection>
    </StoryPage>
</template>
