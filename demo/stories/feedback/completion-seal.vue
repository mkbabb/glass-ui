<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { CompletionSeal } from "@glass/components/completion-seal";
import { Button } from "@glass/components/button";


// BB.W-SUFFUSE3 — the feedback-band's --section-color-8 ruby identity.
const FEEDBACK_STOP = 8;

// The replay key — bumping it remounts the seals so the one-shot draw re-fires (the
// canonical "a process just completed" moment the consumer fires on completion).
const replay = ref(0);
function fireAgain() {
    replay.value += 1;
}
</script>

<template>
    <StoryPage>
        
        <div class="grid gap-8">
            <div class="flex items-center gap-4">
                <Button variant="outline" @click="fireAgain">
                    Replay the draw
                </Button>
                <p class="text-small text-muted-foreground">
                    Each shape draws ONCE, settles with a small overshoot, and
                    glints with the gold catch-light — then holds static.
                </p>
            </div>

            <!-- The four glyph registers, each re-firing on replay. The seal is the
                 visual seal of the W-PHASE-PALETTE completion event; the ink reads
                 the earned-gold register. The `disc` shape is the composed earned-coin —
                 the face materializes, the ring draws around it, then the check draws
                 in (disc→ring→check). -->
            <div :key="replay" class="grid grid-cols-4 gap-8">
                <div class="grid place-items-center gap-3">
                    <CompletionSeal
                        shape="disc"
                        play
                        label="Run complete"
                        class="h-24 w-24"
                    />
                    <span class="text-small text-muted-foreground">disc</span>
                </div>
                <div class="grid place-items-center gap-3">
                    <CompletionSeal
                        shape="check"
                        play
                        label="Task complete"
                        class="h-24 w-24"
                    />
                    <span class="text-small text-muted-foreground">check</span>
                </div>
                <div class="grid place-items-center gap-3">
                    <CompletionSeal
                        shape="ring"
                        play
                        label="Run complete"
                        class="h-24 w-24"
                    />
                    <span class="text-small text-muted-foreground">ring</span>
                </div>
                <div class="grid place-items-center gap-3">
                    <CompletionSeal
                        shape="wordmark"
                        play
                        label="Task complete"
                        class="h-24 w-24"
                    />
                    <span class="text-small text-muted-foreground">
                        wordmark
                    </span>
                </div>
            </div>

            <!-- The personal-best garnish: the disc coin reads a touch brighter (the
                 earned-gold LIFT) when the result beat the user's historical best. -->
            <StorySection heading="Personal best (earned-gold lift)" gap="md">
                <p class="text-small text-muted-foreground">
                    A result that beat the historical best arms
                    <code>:personalBest</code> — the coin ink lifts onto the
                    brighter earned gold. Gold is EARNED, never a new hue.
                </p>
                <div
                    :key="`best-${replay}`"
                    class="grid grid-cols-2 place-items-center gap-8"
                >
                    <div class="grid place-items-center gap-3">
                        <CompletionSeal
                            shape="disc"
                            play
                            label="Run complete"
                            class="h-24 w-24"
                        />
                        <span class="text-small text-muted-foreground">
                            standard
                        </span>
                    </div>
                    <div class="grid place-items-center gap-3">
                        <CompletionSeal
                            shape="disc"
                            play
                            personal-best
                            label="Personal best"
                            class="h-24 w-24"
                        />
                        <span class="text-small text-muted-foreground">
                            personal best
                        </span>
                    </div>
                </div>
            </StorySection>

            <!-- The completion-register lockstep: a consumer re-inking
                 --phase-complete-color re-inks the seal (here a ruby completion
                 register instead of gold). The seal is token-first. -->
            <StorySection heading="Re-inked completion register" gap="md">
                <p class="text-small text-muted-foreground">
                    A consumer overriding
                    <code>--phase-complete-color</code> re-inks the seal in
                    lockstep — the mark reads the completion register, not a
                    baked gold.
                </p>
                <div
                    :key="`reink-${replay}`"
                    class="grid place-items-center"
                    :style="{
                        '--phase-complete-color': `var(--section-color-${FEEDBACK_STOP})`,
                    }"
                >
                    <CompletionSeal
                        shape="check"
                        play
                        label="Submitted"
                        class="h-24 w-24"
                    />
                </div>
            </StorySection>
        </div>
    </StoryPage>
</template>
