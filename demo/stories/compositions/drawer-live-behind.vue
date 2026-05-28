<script setup lang="ts">
/**
 * Drawer live-behind composition — AN.W3 detented non-modal bottom sheet.
 *
 * The F-side mobile co-location pattern: a full-bleed VERDICT surface stays
 * live AND reachable while an INSTRUMENT rides over it as a peek / half / full
 * bottom sheet. The defaults that the modal Drawer carries fight this pattern
 * (`shouldScaleBackground: true` shrinks the verdict; `modal: true` traps focus
 * and hides the verdict from the a11y tree). `<Drawer mode="live-behind">`
 * flips all three at once — `modal: false` + `shouldScaleBackground: false` +
 * `snapPoints: [0.12, 0.5, 1]` — without breaking the default modal sheet.
 *
 * Proof bindings (the AN.W3 audit drives Playwright against these):
 *   - `#verdict-surface` is the page-behind. Under live-behind it stays at
 *     `transform: none` (NOT scaled), its `#verdict-cta` button stays
 *     keyboard-reachable (no focus trap), and the page root carries no
 *     `aria-hidden`.
 *   - The sheet (`[data-vaul-drawer]`) snaps to 12% / 50% / 100% of viewport
 *     height on drag-release; the active fraction is reflected via the
 *     `v-model:active-snap-point` binding (`liveActiveSnap`).
 *   - The modal comparison sheet (right column) DOES scale the verdict + trap
 *     focus — the contrast is the proof that the mode is the whole difference.
 *
 * NOTE on the detents — the spring snap is a DRAG-RELEASE gesture (vaul-vue owns
 * the snap math + momentum). vaul-vue does NOT reliably re-snap an already-open
 * sheet from an external `activeSnapPoint` write (the controllable ref shadows
 * prop writes once the gesture machinery has run), so this proof opens the sheet
 * at a chosen initial detent and the user drags the handle to cycle peek → half
 * → full. AN.W3 audit §B records the vaul-vue limitation; the drag-snap path —
 * the binding contract — passes at all three detents.
 */
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "../../../src/components/ui/drawer";
import { Button } from "../../../src/components/ui/button";

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

                <!-- Open the sheet at a chosen initial detent, then DRAG the
                     handle to cycle peek → half → full. vaul-vue owns the snap
                     math on drag-release; it does not reliably re-snap an
                     already-open sheet from an external `activeSnapPoint` write,
                     so these buttons set the OPENING detent only. The current
                     fraction is reflected back via `v-model:active-snap-point`. -->
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
