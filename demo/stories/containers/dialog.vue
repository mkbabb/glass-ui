<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@glass/components/dialog";
import { Button } from "@glass/components/button";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

// THE DISMISSAL GRAMMAR is the whole story. `dismiss` has three rungs and they replace
// two hand-built compositions — a "confirm dialog" and a "gate pattern" — whose plates
// were identical to this one in all six of blur, background, radius, padding, gap and
// border, and differed only by seven hand-rolled guard bindings. There is nothing to
// build; there is a prop.
const acknowledged = ref(0);
const gateOpen = ref(false);
const key = ref("");
const KEY = "wolfpack";
const wrong = ref(false);

function submitKey() {
    if (key.value.trim().toLowerCase() === KEY) {
        gateOpen.value = false;
        wrong.value = false;
        key.value = "";
        return;
    }
    // The plate's own `locked` rebuff answers Esc and outside-press. A wrong KEY is the
    // consumer's own refusal, and it says so in text that the description is wired to.
    wrong.value = true;
}
</script>

<template>
    <StoryPage>
        <StorySection heading="The dismissal grammar" gap="lg">
            <p class="text-small text-muted-foreground">
                One axis, three rungs. <code class="font-mono text-micro">free</code> is
                a dialog, <code class="font-mono text-micro">deliberate</code> is a
                confirm, <code class="font-mono text-micro">locked</code> is a gate.
                Nothing else changes between them — same plate, same material, same
                proportion.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <!-- free — ✕, Esc and outside-press all dismiss. -->
                <Dialog>
                    <DialogTrigger as-child>
                        <Button emphasis="quiet">free</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Rename workspace</DialogTitle>
                            <DialogDescription>
                                Pick a name your team will recognise. You can change it
                                again whenever you like.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-2">
                            <Label for="ws-name">Workspace name</Label>
                            <Input id="ws-name" model-value="Field Notes" />
                        </div>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button emphasis="quiet">Cancel</Button>
                            </DialogClose>
                            <DialogClose as-child>
                                <Button>Save</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <!-- deliberate — no ✕. Esc and outside-press still work; the decision
                     just cannot be made by a stray 16px click in the corner. -->
                <Dialog>
                    <DialogTrigger as-child>
                        <Button emphasis="quiet">deliberate</Button>
                    </DialogTrigger>
                    <DialogContent dismiss="deliberate">
                        <DialogHeader>
                            <DialogTitle>Delete this project?</DialogTitle>
                            <DialogDescription>
                                Every note, draft and attachment inside it goes with it.
                                This cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button emphasis="quiet">Keep it</Button>
                            </DialogClose>
                            <DialogClose as-child>
                                <Button
                                    tone="destructive"
                                    @click="acknowledged = acknowledged + 1"
                                >
                                    Delete
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <!-- locked — Esc and outside-press are REFUSED, and the refusal is
                     visible: the plate rebuffs. Press Esc twice in a row; it fires both
                     times, which is the whole point. -->
                <Dialog v-model:open="gateOpen">
                    <DialogTrigger as-child>
                        <Button emphasis="quiet">locked</Button>
                    </DialogTrigger>
                    <DialogContent
                        dismiss="locked"
                        :aria-describedby="wrong ? 'gate-error' : undefined"
                    >
                        <DialogHeader>
                            <DialogTitle>Access key required</DialogTitle>
                            <DialogDescription>
                                This surface is gated. Press Escape or click outside and
                                the plate will refuse — twice in a row, if you like.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-2">
                            <Label for="gate-key">Access key</Label>
                            <Input
                                id="gate-key"
                                v-model="key"
                                :data-state="wrong ? 'invalid' : undefined"
                                placeholder="try anything, then try wolfpack"
                                @keydown.enter="submitKey"
                            />
                            <p
                                v-if="wrong"
                                id="gate-error"
                                role="alert"
                                class="text-small text-destructive"
                            >
                                That key does not match. The gate stays closed.
                            </p>
                        </div>
                        <DialogFooter>
                            <Button @click="submitKey">Unlock</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <span
                    v-if="acknowledged > 0"
                    class="text-small text-muted-foreground"
                    aria-live="polite"
                >
                    deleted ×{{ acknowledged }}
                </span>
            </div>
        </StorySection>

        <StorySection heading="Surface" gap="lg">
            <p class="text-small text-muted-foreground">
                The plate rides the shared
                <code class="font-mono text-micro">surface</code> axis — the same grammar
                as Card. The dismissal rung is orthogonal to it.
            </p>
            <div class="flex flex-wrap items-center gap-3">
                <Dialog>
                    <DialogTrigger as-child>
                        <Button emphasis="quiet">opaque</Button>
                    </DialogTrigger>
                    <DialogContent surface="opaque">
                        <DialogHeader>
                            <DialogTitle>Solid surface</DialogTitle>
                            <DialogDescription>
                                The same plate with the glass level zeroed through the
                                one knob — not a parallel solid recipe.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button>Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog :modal="false">
                    <DialogTrigger as-child>
                        <Button emphasis="quiet">non-modal</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Live behind</DialogTitle>
                            <DialogDescription>
                                <code class="font-mono text-micro">:modal="false"</code>
                                leaves the page interactive behind the plate.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose as-child>
                                <Button>Close</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </StorySection>
    </StoryPage>
</template>
