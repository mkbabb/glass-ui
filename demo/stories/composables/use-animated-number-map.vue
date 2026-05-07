<script setup lang="ts">
// useAnimatedNumberMap — N-up useAnimatedNumber fan-out behind a Record.
import { computed, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { useAnimatedNumberMap } from "../../../src/composables/motion/useAnimatedNumberMap";
import { Button } from "../../../src/components/ui/button";

const KEYS = ["ping", "jitter", "download", "upload"] as const;

const targets = ref<Record<(typeof KEYS)[number], number | null>>({
    ping: 0,
    jitter: 0,
    download: 0,
    upload: 0,
});

const smoothed = useAnimatedNumberMap({
    keys: KEYS,
    source: (key) => computed(() => targets.value[key]),
    damping: 0.18,
    snapThreshold: 0.05,
});

function scramble(): void {
    targets.value = {
        ping: Math.round(Math.random() * 100),
        jitter: Math.round(Math.random() * 30),
        download: Math.round(Math.random() * 1000),
        upload: Math.round(Math.random() * 500),
    };
}

function reset(): void {
    targets.value = { ping: null, jitter: null, download: null, upload: null };
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                Wraps <code class="fira-code">useAnimatedNumber</code> per key into a single
                <code class="fira-code">Record&lt;K, ComputedRef&lt;number | null&gt;&gt;</code>.
                Replaces the hand-rolled fan-out where consumers declare four
                <code class="fira-code">useAnimatedNumber</code> instances side by side.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button variant="default" @click="scramble">Scramble</Button>
                <Button variant="outline" @click="reset">Reset (null)</Button>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="key in KEYS"
                    :key="key"
                    class="flex flex-col gap-2 rounded-panel border border-border bg-card p-4"
                >
                    <span class="text-mono-caption text-muted-foreground">{{ key }}</span>
                    <span class="font-display text-display-4 text-foreground">
                        {{
                            smoothed[key].value === null
                                ? "—"
                                : smoothed[key].value.toFixed(1)
                        }}
                    </span>
                    <span class="text-small text-muted-foreground">
                        target:
                        <code class="fira-code">{{
                            targets[key] === null ? "null" : targets[key]
                        }}</code>
                    </span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
