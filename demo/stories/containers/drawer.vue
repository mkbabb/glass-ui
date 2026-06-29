<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
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
} from "@glass/components/ui/drawer";
import { Button } from "@glass/components/ui/button";
import { IconChip } from "@glass/components/custom/icon-chip";
import { PanelBottom } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const snap = ref<number | string | null>(0.4);
const snapPoints = [0.25, 0.4, 0.7, 1] as const;
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
        
    </StoryPage>
</template>
