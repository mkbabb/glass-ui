<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
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
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

const snap = ref<number | string | null>(0.4);
const snapPoints = [0.25, 0.4, 0.7, 1] as const;
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-7)' }"
            >
                § 7 · Bottom sheet
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-7)' }"
            >
                Snap from below
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Drawer rises from the bottom edge — snap-points, drag handle, optional
                non-modal mode. Powered by vaul-vue and tuned to the cartoon-shadow
                tier so the lift feels canon, not generic mobile.
            </p>
            <FlourishDivider
                tone="section-7"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Snap points</h2>
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
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Fixed height</h2>
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
            </div>
            </div>
        </CreamSurface>
    </StoryPage>
</template>
