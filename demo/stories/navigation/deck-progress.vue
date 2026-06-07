<script setup lang="ts">
// AW.W16 (consumer #1) — the deck-position rail.
//
// This story is the LITERAL demonstration of the look-only library surface: the
// position math (`100·(k+1)/N`) AND the pinned chrome (the absolute
// bottom-edge pin) are BOTH owned HERE in the consumer; only the rail LOOK
// (the thin track + leading-edge glow) comes from the library `<DeckProgress>`
// + the `.glass-progress-rail` recipe.
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { DeckProgress } from "../../../src/components/custom/deck-progress";
import { Button } from "../../../src/components/ui/button";

const frames = [
    { title: "Welcome", body: "The first frame of the mini deck." },
    { title: "Concept", body: "Advance the deck — the rail tracks position." },
    { title: "Detail", body: "Each frame bumps the consumer-computed percentage." },
    { title: "Close", body: "The rail reads 100% at the final frame." },
];

const currentIndex = ref(0);

// The position math — IN THE STORY (proving it stays consumer-side).
const pct = computed(() => (100 * (currentIndex.value + 1)) / frames.length);

function prev() {
    if (currentIndex.value > 0) currentIndex.value -= 1;
}
function next() {
    if (currentIndex.value < frames.length - 1) currentIndex.value += 1;
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="deck-position rail"
            blurb="A thin bottom-of-deck position rail. The library owns the rail LOOK (DeckProgress + .glass-progress-rail); the consumer owns the position math (100·(k+1)/N, computed in this story) AND the pinned chrome (the absolute bottom-edge pin below)."
        >
            <ShowcaseFrame pad="none">
                <!-- A relatively-positioned frame so the consumer-pinned rail
                     anchors to its bottom edge. -->
                <div class="relative min-h-72 overflow-hidden rounded-card">
                    <div class="flex min-h-72 flex-col gap-3 p-8">
                        <p class="text-mono-caption text-muted-foreground">
                            frame {{ currentIndex + 1 }} / {{ frames.length }}
                            · {{ Math.round(pct) }}%
                        </p>
                        <h3 class="text-heading">{{ frames[currentIndex].title }}</h3>
                        <p class="text-prose text-muted-foreground">
                            {{ frames[currentIndex].body }}
                        </p>
                        <div class="mt-auto flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="currentIndex === 0"
                                @click="prev"
                            >
                                ← Prev
                            </Button>
                            <Button
                                size="sm"
                                :disabled="currentIndex === frames.length - 1"
                                @click="next"
                            >
                                Next →
                            </Button>
                        </div>
                    </div>

                    <!-- consumer-owned chrome: the rail pinned to the frame's
                         bottom edge. The library ships only the :value-driven
                         LOOK; the pin is this scoped recipe. -->
                    <DeckProgress :value="pct" class="deck-progress-demo-bar" />
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* The consumer-owned pinned chrome — position + bottom edge. In a real
   de-docked deck this is `position: fixed; bottom: env(safe-area-inset-bottom)`
   + a z-index; here it pins to the relatively-positioned story frame. */
.deck-progress-demo-bar {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
}
</style>
