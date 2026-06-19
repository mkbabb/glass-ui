<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { CompletionSeal } from "../../../src/components/custom/completion-seal";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { Button } from "../../../src/components/ui/button";
import { Award } from "@lucide/vue";

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
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Award" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Completion Seal
                </span>
                <p class="text-small text-muted-foreground">
                    The hero-scale earned-GOLD completion mark — a one-shot
                    gold-draw seal that inks itself, settles, and glints once.
                    Gold because completion is EARNED.
                </p>
            </div>
        </header>

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
            <div class="grid gap-3">
                <h2 class="text-subheading">Re-inked completion register</h2>
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
            </div>
        </div>
    </StoryPage>
</template>
