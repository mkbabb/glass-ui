<script setup lang="ts">
/**
 * Drawer live-behind composition — a detented non-modal bottom sheet.
 *
 * A full-bleed surface stays live AND reachable while a sheet rides over it as a
 * peek / half / full bottom sheet. `<Drawer mode="live-behind">` flips the three
 * relevant defaults at once — reka `:modal="false"` + `shouldScaleBackground: false`
 * + the direction-derived `[0.12, 0.5, 1]` ladder — so the surface behind keeps its
 * size, stays keyboard-reachable, and is not hidden from assistive tech (the HOUSE
 * reka `DialogRoot` substrate delivers the non-modal page-interactive contract
 * natively; vaul-vue is ABROGATED — BB.W-DRAWER-ABROGATE). The modal sheet in the
 * right column DOES trap focus, so the contrast reads as one prop.
 *
 * The sheet snaps to 12% / 50% / 100% of viewport height on drag-release (the house
 * `useDrawerSnap` `SpringProgress` engine); drag the handle to cycle peek → half →
 * full.
 */
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@glass/components/ui/drawer";
import { Button } from "@glass/components/ui/button";

const liveActiveSnap = ref<number | string | null>(0.12);
const liveOpen = ref(false);
const modalOpen = ref(false);
const ctaPresses = ref(0);
</script>

<template>
    <StoryPage>
        <StorySection
            label="live-behind detented sheet — mode='live-behind'"
            blurb="The verdict surface below stays at native size and fully interactive while the instrument sheet rides over it at peek (12%), half (50%), or full (100%). Drag the handle to cycle detents. The CTA behind the sheet stays keyboard-reachable — no focus trap, no page aria-hidden."
        >
            <div
                id="verdict-surface"
                class="relative min-h-[28rem] overflow-hidden rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <div class="space-y-3">
                    <h3 class="text-heading">Verdict — Trattoria No. 4</h3>
                    <p class="max-w-prose text-body text-muted-foreground">
                        Full-bleed verdict copy. This surface is the page-behind:
                        under <code>mode="live-behind"</code> it is never scaled
                        down and never receives <code>aria-hidden</code>.
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
                     (`useDrawerSnap`, on the §6 `SpringProgress` clock) owns the
                     snap math end-to-end now (vaul-vue ABROGATED — BB.W-DRAWER-
                     ABROGATE). It re-snaps an ALREADY-OPEN sheet from an external
                     `activeSnapPoint` write (no vaul controllable-shadowing
                     limitation), so these buttons set the detent whether the sheet
                     is closed OR open. The current fraction round-trips via
                     `v-model:active-snap-point`. -->
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
                    <DrawerContent :show-overlay="false" class="live-sheet">
                        <DrawerHeader>
                            <DrawerTitle>Instrument</DrawerTitle>
                            <DrawerDescription>
                                Peek · half · full — the verdict stays live behind.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="space-y-3 p-4">
                            <hr class="glass-drawer-snap-rule" />
                            <p class="text-body text-muted-foreground">
                                Drag the handle up to half, then full. The page
                                behind never scales and never loses focusability.
                            </p>
                            <hr class="glass-drawer-snap-rule" />
                            <Button variant="ghost">Reorder picks</Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>

        <StorySection
            label="modal sheet — default (mode='modal')"
            blurb="The default modal Drawer for contrast: the page-behind scales down (iOS look), focus is trapped inside the sheet, and the page root receives aria-hidden. This is the correct default for a blocking sheet — the live-behind mode is the opt-in."
        >
            <div
                id="modal-verdict-surface"
                class="relative min-h-[16rem] overflow-hidden rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <p class="text-body text-muted-foreground">
                    Page-behind for the modal sheet.
                </p>
                <Drawer v-model:open="modalOpen">
                    <DrawerTrigger as-child>
                        <Button variant="outline" class="mt-4">
                            Open modal sheet
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent class="modal-sheet">
                        <DrawerHeader>
                            <DrawerTitle>Modal sheet</DrawerTitle>
                            <DrawerDescription>
                                Scales the page, traps focus, hides the page.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div class="p-4">
                            <Button variant="accent">Confirm</Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </StorySection>
    </StoryPage>
</template>
