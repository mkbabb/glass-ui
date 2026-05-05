<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { FlourishDivider } from "@/components/custom/flourish-divider";

interface Rung {
    cls: string;
    label: string;
    sample: string;
    defaultSoft: number;
    defaultWdth: number;
}

// Per-rung defaults from typography.css (W1):
//   display-1  WONK 1, SOFT 0,   wdth 100
//   display-2  WONK 1, SOFT 25,  wdth 102
//   display-3  WONK 1, SOFT 50,  wdth 105
//   display-4  WONK 1, SOFT 75,  wdth 108
//   display-5  WONK 1, SOFT 100, wdth 110
//   display-mega   WONK 1, SOFT 100, wdth 112
//   display-ultra  WONK 1, SOFT 100, wdth 115
const rungs: Rung[] = [
    { cls: "text-display",   label: "display",   sample: "Aa", defaultSoft: 0,   defaultWdth: 100 },
    { cls: "text-display-2", label: "display-2", sample: "Aa", defaultSoft: 25,  defaultWdth: 102 },
    { cls: "text-display-3", label: "display-3", sample: "Aa", defaultSoft: 50,  defaultWdth: 105 },
    { cls: "text-display-4", label: "display-4", sample: "Aa", defaultSoft: 75,  defaultWdth: 108 },
    { cls: "text-display-5", label: "display-5", sample: "Aa", defaultSoft: 100, defaultWdth: 110 },
    { cls: "text-display-mega",  label: "display-mega",  sample: "Aa", defaultSoft: 100, defaultWdth: 112 },
    { cls: "text-display-ultra", label: "display-ultra", sample: "Aa", defaultSoft: 100, defaultWdth: 115 },
];

const wonk = ref<0 | 1>(1);

function fvs(soft: number, wdth: number): string {
    return `"WONK" ${wonk.value}, "SOFT" ${soft}, "wdth" ${wdth}`;
}
</script>

<template>
    <StoryPage>
        <!-- WONK toggle -->
        <CreamSurface tone="warm" class="sticky top-4 z-10">
            <div class="flex items-center justify-between gap-[var(--space-phi-3)]">
                <div>
                    <p class="text-mono-caption text-muted-foreground">axis · WONK</p>
                    <p class="text-prose text-foreground/80">
                        Toggle the wonkiness across every rung at once. Per-rung
                        <code class="fira-code">SOFT</code> and <code class="fira-code">wdth</code>
                        defaults stay locked to typography.css.
                    </p>
                </div>
                <div class="flex items-center gap-3">
                    <button
                        type="button"
                        class="rounded-full border-2 px-4 py-2 text-mono-caption transition-colors"
                        :class="wonk === 0 ? 'bg-foreground text-background' : 'border-border'"
                        @click="wonk = 0"
                    >
                        WONK 0
                    </button>
                    <button
                        type="button"
                        class="rounded-full border-2 px-4 py-2 text-mono-caption transition-colors"
                        :class="wonk === 1 ? 'bg-foreground text-background' : 'border-border'"
                        @click="wonk = 1"
                    >
                        WONK 1
                    </button>
                </div>
            </div>
        </CreamSurface>

        <!-- Per-rung axis triptych: low · medium · high SOFT -->
        <section
            v-for="rung in rungs"
            :key="rung.cls"
            class="flex flex-col gap-[var(--space-phi-2)]"
        >
            <header class="flex items-baseline justify-between">
                <p class="section-label">{{ rung.label }}</p>
                <p class="text-mono-caption text-muted-foreground">
                    default · SOFT {{ rung.defaultSoft }} · wdth {{ rung.defaultWdth }}
                </p>
            </header>
            <div
                class="grid items-baseline gap-[var(--space-phi-3)] md:grid-cols-3"
            >
                <!-- LOW SOFT -->
                <div class="flex flex-col gap-[var(--space-phi-1)]">
                    <span class="text-mono-caption text-muted-foreground">SOFT 0</span>
                    <span
                        :class="rung.cls"
                        :style="{ fontVariationSettings: fvs(0, rung.defaultWdth) }"
                    >
                        {{ rung.sample }}
                    </span>
                </div>
                <!-- MEDIUM SOFT -->
                <div class="flex flex-col gap-[var(--space-phi-1)]">
                    <span class="text-mono-caption text-muted-foreground">SOFT 50</span>
                    <span
                        :class="rung.cls"
                        :style="{ fontVariationSettings: fvs(50, rung.defaultWdth) }"
                    >
                        {{ rung.sample }}
                    </span>
                </div>
                <!-- HIGH SOFT (per-rung default) -->
                <div class="flex flex-col gap-[var(--space-phi-1)]">
                    <span class="text-mono-caption text-muted-foreground">
                        SOFT {{ rung.defaultSoft }} · default
                    </span>
                    <span
                        :class="rung.cls"
                        :style="{ fontVariationSettings: fvs(rung.defaultSoft, rung.defaultWdth) }"
                    >
                        {{ rung.sample }}
                    </span>
                </div>
            </div>
            <FlourishDivider tone="section-3" class="opacity-60" />
        </section>

        <!-- Audacious sizes go softer + slightly wider — proof -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Why audacious sizes go softer + wider</p>
            <CreamSurface tone="cool">
                <p class="text-prose text-foreground/80">
                    The display ladder doesn't just scale — it tunes Fraunces's
                    <code class="fira-code">SOFT</code> from 0 to 100 and
                    <code class="fira-code">wdth</code> from 100 to 115 as size grows. Without per-rung
                    axes, mega + ultra sizes feel pinched and brittle. With them, they feel
                    cinematic.
                </p>
                <div class="mt-[var(--space-phi-3)] flex flex-col gap-[var(--space-phi-2)]">
                    <span class="text-display-ultra leading-none">
                        Glass.
                    </span>
                </div>
                <p class="text-mono-caption mt-[var(--space-phi-2)] text-muted-foreground">
                    display-ultra · WONK 1 · SOFT 100 · wdth 115
                </p>
            </CreamSurface>
        </section>
    </StoryPage>
</template>
