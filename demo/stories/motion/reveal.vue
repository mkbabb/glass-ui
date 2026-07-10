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
import { Button } from "@glass/components/ui/button";

const playing = ref(true);

function replay() {
    playing.value = false;
    requestAnimationFrame(() => requestAnimationFrame(() => (playing.value = true)));
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
        <StorySection heading="v-reveal · staggered entrance">
            <p class="text-small text-muted-foreground max-w-prose">
                <code class="fira-code">v-reveal</code> writes the
                <code class="fira-code">[data-reveal]</code> hook and the
                <code class="fira-code">--d</code> stagger step the consumer's own CSS
                reads. <code class="fira-code">v-reveal="N"</code> rises;
                <code class="fira-code">v-reveal:fade="N"</code> fades — both cascade
                by <code class="fira-code">--d</code>.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button variant="default" @click="replay">Replay</Button>
            </div>

            <div v-if="playing" class="reveal-stage flex flex-col gap-3">
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
            blurb="The iOS-27 surface that materializes FROM its trigger — scale + fade + a backdrop blur(4px)→0 decongest on the snappy spring, anchored at the trigger's rect. PRM snaps to a fade only."
        >
            <div class="relative flex flex-col items-start gap-4">
                <Button ref="triggerRef" variant="primary-audacious" @click="toggleBloom">
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
    </StoryPage>
</template>

<style scoped>
/* The CONSUMER-owned CSS the v-reveal directive drives — a fade-rise entrance that
   cascades by the `--d` step the directive sets per row. The directive ships NO
   keyframes (it is root-barrel safe — the consumer owns the entrance CSS); these
   are that documented consumer pattern, NOT a fork of a sibling-wave pop-entrance. */
.reveal-stage [data-reveal] {
    animation: reveal-rise 0.5s var(--spring-bouncy, ease-out) both;
    animation-delay: calc(var(--d, 0) * 80ms);
}

.reveal-stage [data-reveal="fade"] {
    animation-name: reveal-fade;
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
