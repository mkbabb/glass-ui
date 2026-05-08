<script setup lang="ts">
// useStoryDemo — canonical play/reset/status harness for storybook demos.
// V.W4.T5 — mirrors useStagger's timer-set discipline for the cleanup token.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useStoryDemo } from "../../../src/composables/useStoryDemo";

const demo = useStoryDemo<boolean[]>(new Array(8).fill(false));

demo.onPlay(async (cleanup) => {
    for (let i = 0; i < 8; i++) {
        const idx = i;
        const handle = setTimeout(() => {
            demo.state.value = demo.state.value.map((v, j) => (j === idx ? true : v));
        }, idx * 100);
        cleanup(() => clearTimeout(handle));
    }
    await new Promise((r) => setTimeout(r, 8 * 100));
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="play / reset / status discipline"
            blurb="Canonical state harness for storybook demos. The play handler receives a cleanup(fn) registrar — every disposer registered via that callback fires on reset() AND on onScopeDispose. Async-aware: status flips to 'complete' on resolve / 'idle' on reject."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-wrap items-center gap-3">
                        <Button @click="demo.play">Play</Button>
                        <Button variant="outline" @click="demo.reset">Reset</Button>
                        <span class="text-mono-caption text-muted-foreground">
                            status: <code class="fira-code">{{ demo.status.value }}</code>
                        </span>
                    </div>
                    <div class="grid grid-cols-4 gap-3 sm:grid-cols-8">
                        <div
                            v-for="(flag, idx) in demo.state.value"
                            :key="idx"
                            class="flex aspect-square items-center justify-center rounded-md border border-border bg-card transition-all duration-300"
                            :class="flag ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-30'"
                        >
                            <span class="font-mono text-sm">{{ idx + 1 }}</span>
                        </div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="API"
            blurb="Generic over T. Returns { state: Ref<T>, status: ComputedRef<'idle'|'running'|'complete'>, onPlay, play, reset }."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const { state, status, onPlay, play, reset } = useStoryDemo&lt;boolean[]&gt;(
  new Array(8).fill(false),
);

onPlay(async (cleanup) =&gt; {
  for (let i = 0; i &lt; 8; i++) {
    const handle = setTimeout(() =&gt; { /* reveal slot i */ }, i * 100);
    cleanup(() =&gt; clearTimeout(handle));
  }
  await new Promise((r) =&gt; setTimeout(r, 800));
});</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
