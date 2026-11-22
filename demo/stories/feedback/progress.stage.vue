<script setup lang="ts">
// Progress's stage: one bar that fills and drains on a loop, eased at both ends. The
// loop runs on twice the library's indeterminate clock; under reduced motion it holds.
import { onMounted, onUnmounted, ref } from "vue";
import { Progress } from "@glass/components/progress";
import { loopProgressValue } from "./loop-driver";

const value = ref(62);
let raf: number | undefined;

function loopPeriodMs(): number {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--duration-shimmer-fast",
    );
    return Number.parseFloat(raw) * 1000 * 2;
}

function start(): void {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const period = loopPeriodMs();
    const t0 = performance.now();
    const frame = (now: number): void => {
        value.value = loopProgressValue((now - t0) / period);
        raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
}

onMounted(start);
onUnmounted(() => {
    if (raf !== undefined) cancelAnimationFrame(raf);
});
</script>

<template>
    <div class="progress-stage">
        <Progress
            :model-value="value"
            :marks="[25, 50, 75]"
            size="lg"
            aria-label="Upload"
        />
    </div>
</template>

<style scoped>
.progress-stage {
    inline-size: min(40rem, 100cqi);
}
</style>
