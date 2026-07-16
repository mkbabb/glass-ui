<script setup lang="ts">
// BB.W-DEMO-DESIGN — the reveal pane: routed through <StorySection heading> (the
// W-HIERARCHY2 census catches the prior hand-rolled top-level text-prose), and
// promoted to the W-LIQUID-REVEAL FLAGSHIP — a bloom-from-source overlay demo
// (the iOS-27 surface that materializes FROM its trigger's rect, composing the
// shipped `useLiquidReveal` leaf — NO demo-local re-implementation) alongside the
// `v-reveal` stagger directive it always documented. The `v-reveal` scoped CSS is
// the CONSUMER-OWNED CSS the directive drives (the directive ships no keyframes by
// design — that consumer CSS is the point of the pane, not a fork of a sibling
// primitive).
import { ref, type ComponentPublicInstance } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { vReveal } from "@glass/composables/motion/vReveal";
import { useLiquidReveal } from "@glass/composables/motion/useLiquidReveal";
import { springPreset } from "@glass/composables/motion/springPresets";
import { springProjection } from "@glass/composables/motion/springProjection";
import { Button } from "@glass/components/button";

const replayKey = ref(0);
const tempo = ref(1);
const revealProjection = springProjection(springPreset("bouncy"));

function replay() {
    // Replacing the keyed subtree cancels the prior CSS cohort and mounts one new
    // cohort in the same Vue patch. No timer/frame chain survives replay or unmount.
    replayKey.value++;
}

const rows = ["Discover", "Compose", "Refine", "Ship", "Measure", "Iterate"];

// ── The W-LIQUID-REVEAL bloom-from-source flagship ────────────────────────────
// The overlay blooms FROM the trigger button's rect (scale + fade + blur-settle on
// the snappy spring), composing the shipped useLiquidReveal leaf — the iOS-27
// materialize-from-source move. The trigger is a `<Button>` COMPONENT, so the ref is
// the component public instance — useLiquidReveal's asElement resolver reads its `.$el`
// (the binding-verification cure; a bare HTMLElement annotation here silently no-oped).
const triggerRef = ref<ComponentPublicInstance | null>(null);
const surfaceRef = ref<HTMLElement | null>(null);
const open = ref(false);
const { reveal, conceal } = useLiquidReveal(surfaceRef, { trigger: triggerRef });

function toggleBloom() {
    open.value = !open.value;
    if (open.value) {
        // The surface mounts this frame; bloom from the trigger on the next.
        requestAnimationFrame(() => reveal());
    } else {
        conceal();
    }
}
</script>

<template>
    <StoryPage>
        <div class="contents" :style="{ '--motion-tempo': tempo }">
            <StorySection heading="v-reveal · staggered entrance">
                <p class="text-small text-muted-foreground max-w-prose">
                    <code class="fira-code">v-reveal</code> writes the
                    <code class="fira-code">[data-reveal]</code> hook and the
                    <code class="fira-code">--d</code> stagger step the consumer's own
                    CSS reads. <code class="fira-code">v-reveal="N"</code> rises;
                    <code class="fira-code">v-reveal:fade="N"</code> fades — both
                    cascade by <code class="fira-code">--d</code>. This specimen pairs
                    <code class="fira-code">--spring-bouncy</code> with its generated
                    <code class="fira-code">--spring-bouncy-duration</code>; both the
                    settle and the
                    <code class="fira-code">--motion-stagger-default</code> interval
                    scale with <code class="fira-code">--motion-tempo</code>.
                </p>

                <div class="flex flex-wrap items-center gap-3">
                    <Button @click="replay">Replay</Button>
                    <Button
                        v-for="value in [0.7, 1, 1.3]"
                        :key="value"
                        size="sm"
                        :emphasis="tempo === value ? 'secondary' : 'quiet'"
                        :aria-pressed="tempo === value"
                        @click="tempo = value"
                    >
                        {{ value.toFixed(2) }}×
                    </Button>
                    <output class="text-small text-muted-foreground" aria-live="polite">
                        replay {{ replayKey + 1 }} ·
                        {{ (revealProjection.settleSeconds * tempo).toFixed(3) }}s
                        settle · stagger scales {{ tempo.toFixed(2) }}×
                    </output>
                </div>

                <div :key="replayKey" class="reveal-stage flex flex-col gap-3">
                    <div
                        v-for="(label, i) in rows"
                        :key="label"
                        v-reveal:fade="i + 1"
                        class="glass-card flex items-center gap-3 px-5 py-3"
                    >
                        <!-- BA.W-SUFFUSE2 — the motion band's ONE coherent violet event
                         (--motion-accent, the demo-local --viz-legendre twin): a
                         leading stagger marker. The row label stays ink. -->
                        <span class="size-2 rounded-pill bg-[var(--motion-accent)]" />
                        {{ label }}
                    </div>
                </div>
            </StorySection>

            <StorySection
                heading="useLiquidReveal · bloom from source"
                blurb="The iOS-27 surface that materializes FROM its trigger — scale + fade + a backdrop blur(4px)→0 decongest on the snappy spring, anchored at the trigger's rect. Reduced motion snaps to a fade only."
            >
                <div class="relative flex flex-col items-start gap-4">
                    <Button
                        ref="triggerRef"
                        emphasis="primary"
                        @click="toggleBloom"
                    >
                        {{ open ? "Conceal" : "Bloom from here" }}
                    </Button>
                    <div
                        v-if="open"
                        ref="surfaceRef"
                        class="glass-floating glass-reveal w-full max-w-sm rounded-card border border-border p-6"
                        data-state="open"
                    >
                        <p class="text-subheading text-foreground">Materialized</p>
                        <p class="text-small text-muted-foreground">
                            This surface bloomed from the trigger's rect — the
                            <code class="fira-code">useLiquidReveal</code> source-rect
                            inversion, compositor-only.
                        </p>
                    </div>
                </div>
            </StorySection>
        </div>
    </StoryPage>
</template>

<style scoped>
/* The CONSUMER-owned CSS the v-reveal directive drives — a fade-rise entrance that
   cascades by the `--d` step the directive sets per row. The directive ships NO
   keyframes (it is root-barrel safe — the consumer owns the entrance CSS); these
   are that documented consumer pattern, NOT a fork of a sibling-wave pop-entrance. */
.reveal-stage [data-reveal] {
    animation: reveal-rise var(--spring-bouncy-duration) var(--spring-bouncy) both;
    animation-delay: calc(
        var(--d, 0) * var(--motion-stagger-default) * var(--motion-tempo)
    );
}

.reveal-stage [data-reveal="fade"] {
    animation-name: reveal-fade;
}

@media (prefers-reduced-motion: reduce) {
    .reveal-stage [data-reveal] {
        animation: none;
    }
}

@keyframes reveal-rise {
    from {
        opacity: 0;
        translate: 0 12px;
    }
}

@keyframes reveal-fade {
    from {
        opacity: 0;
    }
}
</style>
