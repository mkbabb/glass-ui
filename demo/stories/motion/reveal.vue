<script setup lang="ts">
// v-reveal — the dependency-free entrance-choreography directive. Sets the
// `[data-reveal]` hook + the `--d` stagger-step the scoped CSS keyframes below
// read. `vReveal` is root-barrel safe (no keyframes, no vueuse).
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { vReveal } from "../../../src/composables/motion/vReveal";
import { Button } from "../../../src/components/ui/button";

const playing = ref(true);

function replay() {
    playing.value = false;
    requestAnimationFrame(() => requestAnimationFrame(() => (playing.value = true)));
}

const rows = ["Discover", "Compose", "Refine", "Ship", "Measure", "Iterate"];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                <code class="fira-code">v-reveal</code> writes the
                <code class="fira-code">[data-reveal]</code> hook and the
                <code class="fira-code">--d</code> stagger step the consumer's own
                CSS reads. <code class="fira-code">v-reveal="N"</code> rises;
                <code class="fira-code">v-reveal:fade="N"</code> fades — both
                cascade by <code class="fira-code">--d</code>.
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
        </section>
    </StoryPage>
</template>

<style scoped>
/* The consumer-owned CSS the directive's hooks drive: a fade-rise entrance that
   cascades by the `--d` step the directive sets per row. */
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
