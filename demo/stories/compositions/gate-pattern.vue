<script setup lang="ts">
// Gate pattern (consumer #1) — the non-dismissable access-modal idiom composed
// ENTIRELY from shipped parts. There is NO new component: the story IS the
// pattern. Two anti-patterns are gone BY CONSTRUCTION —
//   - the close-X suppression is the shipped show-close=false prop, NOT a
//     close-button CSS pierce;
//   - the invalid ring comes from the widened library .input-pill
//     [aria-invalid="true"] selector (AW.W18), NOT a scoped ring re-paint.
// Consumer #2 is the slides DeckGate (H.W2).
import { ref, nextTick } from "vue";
import { Lock } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../../src/components/ui/dialog";
import { Input } from "../../../src/components/ui/input";
import { Button } from "../../../src/components/ui/button";

// The gate is always open while locked — it refuses esc / scrim / close.
const open = ref(true);
const value = ref("");
const error = ref(false);
const shake = ref(false);
const unlocked = ref(false);

// A demo "key" — the right value dismisses; a wrong one paints the ring + shakes.
const KEY = "wolfpack";

async function submit() {
    if (value.value.trim().toLowerCase() === KEY) {
        unlocked.value = true;
        open.value = false;
        return;
    }
    // Wrong key — drive validity imperatively (no native constraint to trip
    // `:user-invalid`), so the WIDENED `[aria-invalid]` ring paints.
    error.value = true;
    shake.value = false;
    await nextTick();
    shake.value = true;
}

function reset() {
    value.value = "";
    error.value = false;
    unlocked.value = false;
    open.value = true;
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="non-dismissable access modal (a blessed composition, not a component)"
            blurb="A form-in-Dialog that refuses esc / scrim / close, carries an error + shake state, and submits a footer action. Composed from Dialog / DialogContent / Input / Button — no new primitive. The invalid ring paints from the widened library .input-pill [aria-invalid] selector (no scoped re-paint); the close-X is suppressed with show-close=false (no close-button CSS pierce). Try a wrong key (any text) to see the ring + shake; the right key is 'wolfpack'."
        >
            <div class="flex flex-wrap items-center gap-4">
                <Button v-if="!open" variant="outline" @click="reset">Re-lock the gate</Button>
                <span v-if="unlocked" class="text-sm text-success">Unlocked.</span>
            </div>

            <Dialog v-model:open="open">
                <DialogContent
                    :show-close="false"
                    class="max-w-sm"
                    :class="{ 'gate-shake': shake }"
                    @escape-key-down.prevent
                    @interact-outside.prevent
                    @pointer-down-outside.prevent
                    @animationend="shake = false"
                >
                    <div class="flex flex-col items-center gap-3 text-center">
                        <span
                            class="grid size-12 place-items-center rounded-full bg-muted text-foreground"
                        >
                            <Lock class="size-6" />
                        </span>
                        <DialogTitle>Access required</DialogTitle>
                        <DialogDescription>
                            Enter the access key to continue. This gate cannot be
                            dismissed — esc, the scrim, and the close button are all
                            suppressed.
                        </DialogDescription>
                    </div>

                    <form class="mt-2 flex flex-col gap-2" @submit.prevent="submit">
                        <Input
                            v-model="value"
                            placeholder="access key"
                            :aria-invalid="error || undefined"
                            aria-label="access key"
                            autocomplete="off"
                            @input="error = false"
                        />
                        <p v-if="error" role="alert" class="text-sm text-destructive">
                            That key is incorrect. Try again.
                        </p>

                        <DialogFooter class="mt-2">
                            <Button type="submit" variant="primary-audacious" class="w-full">
                                Unlock
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* The shake feedback on a wrong key — a short horizontal jitter. This is purely
   the wrong-key motion cue applied to the dialog content root; the invalid ring
   itself comes from the widened library .input-pill selector (no scoped
   re-paint here). */
.gate-shake {
    animation: gate-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes gate-shake {
    10%,
    90% {
        translate: -1px 0;
    }
    20%,
    80% {
        translate: 2px 0;
    }
    30%,
    50%,
    70% {
        translate: -4px 0;
    }
    40%,
    60% {
        translate: 4px 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .gate-shake {
        animation: none;
    }
}
</style>
