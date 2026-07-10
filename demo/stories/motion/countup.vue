<script setup lang="ts">
// useCountup — the editorial count-up animator. Walks `[data-countup]` figures
// under a host and tweens their text content 0 → target via the keyframes LIGHT
// `NumericAnimation` engine (value.js-free callable easing).
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import { useCountup } from "@glass/composables/motion/useCountup";
import { Button } from "@glass/components/ui/button";

const host = ref<HTMLElement | null>(null);

// A bouncy ease-out so the figure overshoots slightly before settling.
const easeOutBack = (p: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
};

const { runActive, settle, cancel } = useCountup(host, { easeFn: easeOutBack });
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                <code class="fira-code">useCountup</code> walks
                <code class="fira-code">[data-countup]</code> figures under the
                active region and tweens each
                <code class="fira-code">textContent</code> from 0 → its target.
                The tween rides the keyframes
                <code class="fira-code">NumericAnimation</code> engine — the
                engine owns the rAF loop, the composable owns the DOM write and
                the teardown.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button variant="default" @click="runActive">Run</Button>
                <Button variant="outline" @click="settle">Settle</Button>
                <Button variant="ghost" @click="cancel">Cancel</Button>
            </div>

            <!-- BA.W-SUFFUSE2 — the motion band's ONE coherent violet event
                 (--motion-accent, the demo-local --viz-legendre twin): a leading
                 accent bar above each counting figure. The value+unit stay ink. -->
            <div ref="host">
                <div data-state="active" class="grid grid-cols-3 gap-6">
                    <div class="glass-card flex flex-col items-center gap-1 p-6">
                        <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                        <span
                            class="text-display fira-code tabular-nums"
                            data-countup="1280"
                            data-countup-dur="1400"
                        >0</span>
                        <span class="text-small text-muted-foreground">requests</span>
                    </div>
                    <div class="glass-card flex flex-col items-center gap-1 p-6">
                        <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                        <span
                            class="text-display fira-code tabular-nums"
                            data-countup="98"
                            data-countup-dur="1200"
                            data-countup-delay="200"
                        >0</span>
                        <span class="text-small text-muted-foreground">% uptime</span>
                    </div>
                    <div class="glass-card flex flex-col items-center gap-1 p-6">
                        <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                        <span
                            class="text-display fira-code tabular-nums"
                            data-countup="4200"
                            data-countup-dur="1600"
                            data-countup-delay="400"
                        >0</span>
                        <span class="text-small text-muted-foreground">ms saved</span>
                    </div>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
