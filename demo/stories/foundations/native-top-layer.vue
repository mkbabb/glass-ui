<script setup lang="ts">
// AQ.W6 pilot demo — the native top-layer cluster: the `<GlassDialogNative>`
// pilot (native `<dialog>` + `commandfor` + light-dismiss, consuming the
// `.glass-top-layer` @starting-style grammar) and the `HoverPopover :native`
// `interestfor` opt-in. This story is the SECOND consumer for both gated
// primitives (the muster J.W6 adoption being the first); the disposition is
// recorded for the W8 overfitting audit.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { GlassDialogNative } from "../../../src/components/custom/dialog-native";
import { HoverPopover } from "../../../src/components/custom/hover-popover";
import { Button } from "../../../src/components/ui/button";
import { supportsViewTransitions } from "../../../src/composables/motion/useViewTransition";
import { supportsMoveBefore } from "../../../src/utils";

const settingsDlg = ref<InstanceType<typeof GlassDialogNative> | null>(null);

const supportsCommand =
    typeof HTMLButtonElement !== "undefined" && "command" in HTMLButtonElement.prototype;
const supportsInterest =
    typeof HTMLButtonElement !== "undefined" &&
    "interestForElement" in HTMLButtonElement.prototype;
const supportsAnchor =
    typeof CSS !== "undefined" && CSS.supports?.("position-anchor", "--x");

const caps = [
    { label: "anchor-positioning", on: !!supportsAnchor },
    { label: "view-transitions", on: supportsViewTransitions() },
    { label: "invoker-commands (commandfor)", on: supportsCommand },
    { label: "interest-invokers (interestfor)", on: supportsInterest },
    { label: "moveBefore", on: supportsMoveBefore() },
];
</script>

<template>
    <StoryPage>
        <div class="grid gap-12">
            <section class="grid gap-3">
                <h2 class="font-display text-xl">Platform capability probe</h2>
                <p class="text-sm text-muted-foreground">
                    Each AQ.W6 native path is feature-detected; the kept JS / reka-ui
                    fallback runs where a capability is off.
                </p>
                <ul class="flex flex-wrap gap-2">
                    <li
                        v-for="c in caps"
                        :key="c.label"
                        class="rounded-pill border px-3 py-1 text-xs"
                        :class="c.on
                            ? 'border-success text-success-foreground'
                            : 'border-border text-muted-foreground'"
                    >
                        {{ c.on ? '✓' : '—' }} {{ c.label }}
                    </li>
                </ul>
            </section>

            <section class="grid gap-3">
                <h2 class="font-display text-xl">Native &lt;dialog&gt; pilot</h2>
                <p class="text-sm text-muted-foreground">
                    A real <code>&lt;dialog class="glass-top-layer"&gt;</code> —
                    entry/exit is pure CSS (<code>@starting-style</code> +
                    <code>overlay</code>), light-dismiss is <code>closedby="any"</code>.
                    The trigger opens it via <code>commandfor</code> where supported,
                    else the JS <code>showModal()</code> fallback.
                </p>
                <div class="flex flex-wrap gap-3">
                    <!-- Preferred declarative open (Baseline LIMITED). -->
                    <button
                        v-if="supportsCommand"
                        commandfor="settings-dlg"
                        command="show-modal"
                        class="glass-btn"
                    >
                        Open settings (commandfor)
                    </button>
                    <!-- Kept JS fallback. -->
                    <Button v-else @click="settingsDlg?.showModal()">
                        Open settings (showModal)
                    </Button>
                </div>

                <GlassDialogNative
                    id="settings-dlg"
                    ref="settingsDlg"
                    labelledby="settings-dlg-title"
                >
                    <template #default="{ close }">
                        <div class="grid gap-4">
                            <h3 id="settings-dlg-title" class="font-display text-lg">
                                Settings
                            </h3>
                            <p class="text-sm text-muted-foreground">
                                Click the backdrop or press Esc to dismiss.
                            </p>
                            <div class="flex justify-end">
                                <Button variant="outline" @click="close()">Close</Button>
                            </div>
                        </div>
                    </template>
                </GlassDialogNative>
            </section>

            <section class="grid gap-3">
                <h2 class="font-display text-xl">HoverPopover — interestfor opt-in</h2>
                <p class="text-sm text-muted-foreground">
                    <code>:native="true"</code> renders the trigger with
                    <code>interestfor</code> + a <code>popover="hint"</code> panel
                    where supported; otherwise it falls straight through to the
                    reka-ui HoverCard default — no behaviour change.
                </p>
                <div class="flex flex-wrap gap-6">
                    <HoverPopover :native="true" content="Native interestfor tooltip">
                        <Button variant="outline">Native hover</Button>
                    </HoverPopover>
                    <HoverPopover content="reka-ui HoverCard (default)">
                        <Button variant="outline">Default hover</Button>
                    </HoverPopover>
                </div>
            </section>
        </div>
    </StoryPage>
</template>
