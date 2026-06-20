<script setup lang="ts">
// BC.W-SPLIT-CHARS — the per-glyph split partner to the shipped `.char-stagger`
// CSS recipe. `<SplitChars>` mints the `.char` spans + `--char-index`/`--char-total`
// customs the recipe reads, and keeps the word as ONE accessible name (the
// `aria-label` on the wrapper, `aria-hidden` glyphs). The shipped CSS staggers the
// glyphs into a kinetic `fade-in` entrance on the per-spring clock; under PRM the
// carve collapses it to in-place (the text is always present — the split is
// structural). The composable (`useCharStagger`) is the producer; the component is
// the face. This pane is the binary in-repo consumer (the hero word + a multi-word
// headline + the AT-label readback).
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { SplitChars } from "../../../src/components/custom/split-chars";
import { Button } from "../../../src/components/ui/button";

// Replaying remounts the SplitChars instances so the `backwards` entrance plays
// again (the CSS animation runs once on mount).
const playKey = ref(0);
function replay(): void {
    playKey.value += 1;
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Per-glyph kinetic entrance"
            label="split-chars"
            blurb="A word splits into per-glyph .char spans, each carrying --char-index, and the shipped .char-stagger CSS staggers them in on the per-spring clock. The whole thing stays accessible: a screen reader hears the word ONCE (the aria-label), never the per-glyph spell-out."
        >
            <div :key="playKey" class="flex flex-col gap-8">
                <!-- The hero word — a single-character split as a display heading.
                     BC.W-SUFFUSE-reconcile — the motion band's ONE color text-event:
                     the hero word in the --motion-accent violet (the motion-purple
                     family, the ONE color event on the display word). -->
                <SplitChars
                    text="Fourier"
                    as="h1"
                    class="text-pane-title"
                    :style="{ color: 'var(--motion-accent)' }"
                />

                <!-- A multi-word headline, split on whitespace (each word is one
                     .char unit; the spacers hold the gap). -->
                <SplitChars
                    text="Compose Refine Ship"
                    by="word"
                    as="h2"
                    class="text-2xl font-semibold"
                />

                <!-- Grapheme mode — the family emoji is ONE .char, never torn. -->
                <SplitChars text="a 👨‍👩‍👧 b" by="grapheme" class="text-xl" />

                <div>
                    <Button variant="secondary" @click="replay">
                        Replay entrance
                    </Button>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
