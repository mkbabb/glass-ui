<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@glass/components/drawer";
import { Button } from "@glass/components/button";
import { IconChip } from "@glass/components/icon-chip";
import { PanelBottom } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const snap = ref<number | string | null>(0.4);
const snapPoints = [0.25, 0.4, 0.7, 1] as const;

// live-behind mode — a detented non-modal sheet over a still-interactive surface.
const liveActiveSnap = ref<number | string | null>(0.12);
const liveOpen = ref(false);
const ctaPresses = ref(0);
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="PanelBottom" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Drawer
                </span>
                <p class="text-small text-muted-foreground">
                    Bottom-sheet drawers, detented and live-behind — the container
                    identity is the ONE color event.
                </p>
            </div>
        </header>

            <StorySection heading="Snap points" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Four snap positions: 25%, 40%, 70%, 100%. Current snap —
                    <code class="font-mono text-xs">{{ String(snap) }}</code>.
                </p>
                <div class="flex flex-wrap gap-3">
                    <Drawer
                        v-model:active-snap-point="snap"
                        :snap-points="[...snapPoints]"
                    >
                        <DrawerTrigger as-child>
                            <Button>Open drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Session details</DrawerTitle>
                                <DrawerDescription>
                                    Drag the handle up or down to switch snap
                                    points.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div class="px-6 pb-4 grid gap-3 text-sm">
                                <div
                                    v-for="p in snapPoints"
                                    :key="p"
                                    class="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono"
                                >
                                    snap = {{ p }}
                                </div>
                            </div>
                            <DrawerFooter>
                                <DrawerClose as-child>
                                    <Button variant="outline">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </StorySection>

            <StorySection heading="Fixed height" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Omit <code class="font-mono text-xs">snapPoints</code> for a
                    single resting position sized by content.
                </p>
                <div class="flex flex-wrap gap-3">
                    <Drawer>
                        <DrawerTrigger as-child>
                            <Button variant="outline">Open fixed drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Quick actions</DrawerTitle>
                                <DrawerDescription>
                                    Content-sized bottom sheet — no snap dragging.
                                </DrawerDescription>
                            </DrawerHeader>
                            <div class="px-6 pb-6 grid gap-2">
                                <Button variant="ghost" class="justify-start">
                                    Edit
                                </Button>
                                <Button variant="ghost" class="justify-start">
                                    Duplicate
                                </Button>
                                <Button
                                    variant="ghost"
                                    class="justify-start text-destructive"
                                >
                                    Delete
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </StorySection>

            <StorySection heading="Live-behind mode" gap="lg">
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">mode="live-behind"</code> flips
                    three defaults at once — reka
                    <code class="font-mono text-xs">:modal="false"</code> +
                    <code class="font-mono text-xs">stage="none"</code> (the page never
                    recedes) + the direction-derived
                    <code class="font-mono text-xs">[0.12, 0.5, 1]</code> ladder — so the
                    surface behind keeps its size, stays keyboard-reachable, and is
                    never hidden from assistive tech. The default modal sheet above traps
                    focus and scales the page; this mode is the opt-in non-modal peer.
                    This specimen sets
                    <code class="font-mono text-xs">--drawer-inset-block-end: 4.5rem</code>,
                    so even Full stops above the labeled menubar reserve.
                </p>
                <div
                    id="verdict-surface"
                    class="relative min-h-[24rem] overflow-hidden rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
                >
                    <div class="space-y-3">
                        <h3 class="text-heading">Verdict — Trattoria No. 4</h3>
                        <p class="max-w-prose text-body text-muted-foreground">
                            The page-behind: under
                            <code>mode="live-behind"</code> it is never scaled down
                            and never receives <code>aria-hidden</code>.
                        </p>
                        <Button
                            id="verdict-cta"
                            variant="accent"
                            @click="ctaPresses++"
                        >
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
                            variant="ghost"
                            size="sm"
                            @click="(liveActiveSnap = 0.12), (liveOpen = true)"
                        >
                            Peek
                        </Button>
                        <Button
                            id="detent-half"
                            variant="ghost"
                            size="sm"
                            @click="(liveActiveSnap = 0.5), (liveOpen = true)"
                        >
                            Half
                        </Button>
                        <Button
                            id="detent-full"
                            variant="ghost"
                            size="sm"
                            @click="(liveActiveSnap = 1), (liveOpen = true)"
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
                        <DrawerTrigger as-child>
                            <Button variant="outline" class="mt-6">
                                Open instrument sheet
                            </Button>
                        </DrawerTrigger>
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
                                    Drag the handle up to half, then full. The page
                                    behind never scales and never loses focusability.
                                </p>
                                <Button variant="ghost">Reorder picks</Button>
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
