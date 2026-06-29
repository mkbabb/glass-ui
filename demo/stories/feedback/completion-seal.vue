<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { CompletionSeal } from "@glass/components/custom/completion-seal";
import { Button } from "@glass/components/ui/button";


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

            <!-- The three glyph registers, each re-firing on replay. The seal is the
                 visual seal of the W-PHASE-PALETTE completion event; the ink reads
                 the earned-gold register. -->
            <div :key="replay" class="grid grid-cols-3 gap-8">
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
                        label="Personal best"
                        class="h-24 w-24"
                    />
                    <span class="text-small text-muted-foreground">
                        wordmark
                    </span>
                </div>
            </div>

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
