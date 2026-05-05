<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { BezierCurveCanvas, type Point } from "@/components/custom/bezier-canvas";
import { useRAFLoop } from "@/composables/motion";
import { NAMED_EASING_BEZIER } from "@/tokens";

type EasingName = keyof typeof NAMED_EASING_BEZIER;

const presetNames = Object.keys(NAMED_EASING_BEZIER) as EasingName[];

const selected = ref<EasingName>("apple-spring");

const p1 = ref<Point>([
    NAMED_EASING_BEZIER[selected.value][0],
    NAMED_EASING_BEZIER[selected.value][1],
]);
const p2 = ref<Point>([
    NAMED_EASING_BEZIER[selected.value][2],
    NAMED_EASING_BEZIER[selected.value][3],
]);

watch(selected, (name) => {
    const [a, b, c, d] = NAMED_EASING_BEZIER[name];
    p1.value = [a, b];
    p2.value = [c, d];
});

const cssExpression = computed(
    () =>
        `cubic-bezier(${p1.value[0].toFixed(3)}, ${p1.value[1].toFixed(3)}, ${p2.value[0].toFixed(3)}, ${p2.value[1].toFixed(3)})`,
);

// rAF-driven progress dot — 1.5s loop
const progress = ref(0);
const DURATION = 1500;
const start = ref<number | null>(null);

const raf = useRAFLoop(({ now }) => {
    if (start.value === null) start.value = now;
    const elapsed = (now - start.value) % DURATION;
    progress.value = elapsed / DURATION;
});

onUnmounted(() => raf.dispose());

function presetP1(name: EasingName): Point {
    const [a, b] = NAMED_EASING_BEZIER[name];
    return [a, b];
}
function presetP2(name: EasingName): Point {
    const [, , c, d] = NAMED_EASING_BEZIER[name];
    return [c, d];
}
</script>

<template>
    <StoryPage>
        <!-- Preset rail -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Named-easing presets · NAMED_EASING_BEZIER</p>
            <div class="grid gap-[var(--space-phi-2)] sm:grid-cols-2 lg:grid-cols-3">
                <button
                    v-for="name in presetNames"
                    :key="name"
                    type="button"
                    class="group flex flex-col gap-[var(--space-phi-1)] rounded-[var(--radius-2xl)] border-2 p-[var(--space-phi-2)] text-left transition-[transform,box-shadow]"
                    :class="selected === name
                        ? 'border-foreground shadow-[var(--shadow-cartoon-md)]'
                        : 'border-border hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-sm)]'"
                    :style="{
                        background: 'var(--cream-warm)',
                    }"
                    :aria-pressed="selected === name"
                    @click="selected = name"
                >
                    <span class="text-mono-caption text-muted-foreground">
                        {{ name }}
                    </span>
                    <BezierCurveCanvas
                        :p1="presetP1(name)"
                        :p2="presetP2(name)"
                        :width="120"
                        :height="120"
                        :show-grid="false"
                        :readonly="true"
                        :aria-label="`${name} easing preview`"
                        class="self-center"
                        :style="{
                            color: selected === name
                                ? 'var(--section-color-3)'
                                : 'var(--foreground)',
                            '--easing-accent': selected === name
                                ? 'var(--section-color-3)'
                                : 'var(--foreground)',
                        }"
                    />
                    <span class="fira-code text-micro text-foreground/70">
                        {{ NAMED_EASING_BEZIER[name].map((v) => v.toFixed(2)).join(', ') }}
                    </span>
                </button>
            </div>
        </section>

        <!-- Interactive editor -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Interactive · drag the handles</p>
            <CreamSurface tone="cool" class="relative overflow-hidden">
                <div class="grid items-center gap-[var(--space-phi-4)] lg:grid-cols-[auto_1fr]">
                    <div
                        class="self-center justify-self-center"
                        :style="{ '--easing-accent': 'var(--section-color-3)' }"
                    >
                        <BezierCurveCanvas
                            v-model:p1="p1"
                            v-model:p2="p2"
                            :width="320"
                            :height="320"
                            :show-grid="true"
                            :show-progress="true"
                            :progress="progress"
                            aria-label="Editable bezier curve"
                        />
                    </div>
                    <div class="flex flex-col gap-[var(--space-phi-3)]">
                        <div class="flex flex-col gap-[var(--space-phi-1)]">
                            <span class="text-mono-caption text-muted-foreground">
                                CSS cubic-bezier
                            </span>
                            <code
                                class="fira-code text-prose break-all rounded-[var(--radius-md)] border border-border bg-[var(--cream)] p-[var(--space-phi-2)]"
                            >
                                {{ cssExpression }}
                            </code>
                        </div>
                        <div class="grid grid-cols-2 gap-[var(--space-phi-2)]">
                            <div class="flex flex-col gap-1">
                                <span class="text-mono-caption text-muted-foreground">P1</span>
                                <span class="fira-code text-prose">
                                    ({{ p1[0].toFixed(3) }}, {{ p1[1].toFixed(3) }})
                                </span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-mono-caption text-muted-foreground">P2</span>
                                <span class="fira-code text-prose">
                                    ({{ p2[0].toFixed(3) }}, {{ p2[1].toFixed(3) }})
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-1">
                            <span class="text-mono-caption text-muted-foreground">
                                progress · {{ (progress * 100).toFixed(0) }}%
                            </span>
                            <div
                                class="h-2 w-full overflow-hidden rounded-full"
                                :style="{
                                    background: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
                                }"
                            >
                                <div
                                    class="h-full rounded-full"
                                    :style="{
                                        width: `${progress * 100}%`,
                                        background: 'var(--section-color-3)',
                                        transition: 'none',
                                    }"
                                />
                            </div>
                        </div>
                        <p class="text-small text-foreground/70">
                            The progress dot rides the curve at a fixed 1.5s loop, regardless of the
                            handle positions. <code class="fira-code">prefers-reduced-motion</code>
                            pauses the rAF loop.
                        </p>
                    </div>
                </div>
            </CreamSurface>
        </section>
    </StoryPage>
</template>
