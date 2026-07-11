<script setup lang="ts">
// Card :pressable — the tappable list-card (BB.W-PRESS-UNIFY consumer #2, the
// BG.W-ANIMATION-CONGRUENCE Card-press π home). A `<Card as="button">` is interactive,
// so it PRESSES: `useLiquidPress` drives the reciprocal X/Y squish + the `--card-press-t`
// drive the `.glass-press` brightness leg reads, on the SHARED `press` spring clock
// (one spring family — the exact clock Button presses on, no per-surface fork).
//
// A11Y (the a11y-fixed prerequisite the gate cell names): a pressable card is a real
// `<button>` — it carries an accessible NAME (aria-label) and its content is
// NON-interactive (no button-in-button); the native `<button>` is keyboard-operable
// (Enter/Space) + focus-visible by construction. A static (non-`as`/`role`) card never
// presses — the `motion` axis is the opt-DOWN, the interactivity is the opt-IN.
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@glass/components/ui/card";
import { Package, Layers, Library } from "@lucide/vue";

interface TapCard {
    id: string;
    title: string;
    blurb: string;
    icon: typeof Package;
}

const cards: TapCard[] = [
    { id: "assets", title: "Assets", blurb: "Images, fonts, and static bundles.", icon: Package },
    { id: "layers", title: "Layers", blurb: "The composited render stack.", icon: Layers },
    { id: "libraries", title: "Libraries", blurb: "Shared component packages.", icon: Library },
];

// A tiny live witness the press is real (the card is a button; activating it selects).
const selected = ref<string>("assets");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Tappable list-cards"
            label="<Card as=&quot;button&quot;> — the interruptible spring-press"
            blurb="An interactive card (as=&quot;button&quot;) PRESSES: press-and-hold and the plate squishes on the shared iOS press spring, the --card-press-t drive lifts the surface brightness in lockstep (one drive, both legs, on the spring's own settle clock), and a rapid re-press mid-release inherits the first press's momentum. A static content card never presses. Compositor-only + PRM-instant."
        >
            <ShowcaseFrame pad="md">
                <div class="flex flex-col gap-3">
                    <Card
                        v-for="c in cards"
                        :key="c.id"
                        as="button"
                        tier="resting"
                        :aria-label="`Open ${c.title} — ${c.blurb}`"
                        :aria-pressed="selected === c.id ? 'true' : 'false'"
                        class="tap-card w-full text-left"
                        @click="selected = c.id"
                    >
                        <CardHeader>
                            <div class="flex items-center gap-3">
                                <component
                                    :is="c.icon"
                                    class="size-5 shrink-0 text-muted-foreground"
                                    aria-hidden="true"
                                />
                                <div class="flex flex-col gap-0.5">
                                    <CardTitle class="text-base font-semibold">{{ c.title }}</CardTitle>
                                    <CardDescription>{{ c.blurb }}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent class="text-small text-muted-foreground">
                            {{ selected === c.id ? "Selected — press again to re-confirm." : "Press to select." }}
                        </CardContent>
                    </Card>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* The pressable card is a real <button>: neutralize the native button appearance so
   the glass tier + the press register are the only visual language. The glass plate
   (background/border/radius) is painted by the Card's own `glass-resting` classes —
   this rule ONLY strips the UA button chrome, it does NOT re-paint the surface. */
.tap-card {
    appearance: none;
    font: inherit;
    cursor: pointer;
}
</style>
