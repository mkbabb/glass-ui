<script setup lang="ts">
// Gate pattern — the non-dismissable access-modal idiom composed entirely from
// shipped parts. There is no new component: the story IS the pattern.
//   - the close-X is suppressed via the shipped show-close=false prop, not a
//     close-button CSS pierce;
//   - the invalid ring comes from Input's field-control [aria-invalid="true"] contract
//     selector, not a scoped ring re-paint.
//
// The idiom is DEMONSTRATED, not IMPOSED: a contained glass-card preview shows
// what the gate looks like (static, always on the page), and an explicit
// "Open the modal demo" button opens the REAL non-dismissable modal ON DEMAND —
// the visitor experiences the suppressed esc / scrim / close behaviour, then the
// correct key closes it. The page is always reachable; nothing traps the viewport.
import { ref, nextTick } from "vue";
import { Lock, Unlock } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@glass/components/card";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@glass/components/dialog";
import { Input } from "@glass/components/input";
import { Button } from "@glass/components/button";

// The modal starts CLOSED — the demo opens it on demand, never on mount.
const open = ref(false);
const value = ref("");
const error = ref(false);
const shake = ref(false);
const unlocked = ref(false);

// A demo "key" — the right value dismisses; a wrong one paints the ring + shakes.
const KEY = "wolfpack";

// Reset transient form state before the canonical Dialog trigger opens it.
function prepareDemo() {
    value.value = "";
    error.value = false;
}

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

function relock() {
    value.value = "";
    error.value = false;
    unlocked.value = false;
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="non-dismissable access modal (a blessed composition, not a component)"
            blurb="A form-in-Dialog that refuses esc / scrim / close, carries an error + shake state, and submits a footer action. Composed from Dialog / DialogContent / Input / Button — no new primitive. Input owns the invalid field paint while this composition owns its error linkage; the close-X is suppressed with show-close=false. The contained preview below shows the gate; Open the modal demo opens the real non-dismissable modal — type a wrong key to see the ring + shake, or the right key wolfpack to close it."
        >
            <!-- Contained preview frame: a bounded glass card on the page. The gate
                 form renders INSIDE it (static, always reachable) — the visitor sees
                 the idiom without being trapped by it. -->
            <Dialog v-model:open="open">
                <Card tier="floating" class="max-w-sm">
                    <CardHeader class="items-center text-center">
                        <span
                            class="grid size-12 place-items-center rounded-full bg-muted text-foreground"
                        >
                            <Unlock v-if="unlocked" class="size-6 text-success" />
                            <Lock v-else class="size-6" />
                        </span>
                        <CardTitle>{{ unlocked ? "Unlocked" : "Access required" }}</CardTitle>
                        <CardDescription>
                            {{
                                unlocked
                                    ? "The gate accepted the key. This is the contained preview of the access-modal idiom."
                                    : "This is the contained preview of the access-modal idiom. Open the modal demo to experience the suppressed esc / scrim / close behaviour."
                            }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="flex flex-col items-stretch gap-2">
                        <DialogTrigger as-child>
                            <Button
                                emphasis="primary"
                                class="w-full"
                                @click="prepareDemo"
                            >
                                Open the modal demo
                            </Button>
                        </DialogTrigger>
                        <Button v-if="unlocked" class="w-full" @click="relock">
                            Re-lock the gate
                        </Button>
                    </CardContent>
                </Card>

                <!-- The REAL non-dismissable modal — opened on demand. Every dismissal
                     channel stays suppressed (the idiom): show-close=false, esc / scrim /
                     outside-pointer all .prevent'd. The visitor escapes by the correct key. -->
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
                            suppressed. The right key closes it.
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
                            <Button type="submit" emphasis="primary" class="w-full">
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
   itself comes from Input's field-control selector (no scoped
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
