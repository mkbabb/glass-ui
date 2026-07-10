<script setup lang="ts">
// Spring Orchestrator (AZ.W-MOTION-SUITE) — the SHIPPED named-spring registers,
// driven off the SINGLE-SOURCE `SPRING_PRESETS`/`springPreset()` (no local fork).
//
// The former local `damped(stiffness, damping)` closed-form is DEAD — the
// orchestrator now reads the canonical `springTimingFunction({response, ζ})` twin
// straight from the keyframes.js suite over the SAME (response, dampingFraction)
// pair `springLinearStops` solves the CSS `linear()` from, so the demo teaches the
// SHIPPED curves and can never drift from the token vocabulary. A live Spring
// Playground lets the user author a spring (response/ζ → linear() readout). The
// animated block reads `--motion-accent` (the glass-ui violet twin), not warm-red.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import StoryPlayButton from "../../chassis/play/StoryPlayButton.vue";
import { computed, ref, shallowRef } from "vue";
import {
    useNumericTransition,
    springTimingFunction,
    springLinearStops,
    SPRING_PRESETS,
    springPreset,
    type SpringSnapshot,
    type SpringPresetName,
} from "@glass/composables/motion";
import { Button } from "@glass/components/ui/button";
import { Label } from "@glass/components/ui/label";
import { LabeledSlider } from "@glass/components/custom/labeled-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/ui/select";
import { Check, Copy } from "@lucide/vue";
import { cn } from "@glass/utils/cn";

// ── The named presets, straight off the SINGLE source ───────────────────────────
// `SPRING_PRESETS` is the no-second-authority register table; `springTimingFunction`
// is the SAME solver `springLinearStops` derives the CSS `linear()` token from.
type PresetId = Exclude<SpringPresetName, "dock">; // dock is the in-dock morph register
const PRESET_IDS = SPRING_PRESETS.map((p) => p.name).filter(
    (n): n is PresetId => n !== "dock",
);

function presetFn(id: PresetId) {
    const row = springPreset(id);
    return springTimingFunction({
        response: row.response,
        dampingFraction: row.dampingFraction,
    });
}

// ── Animation state ─────────────────────────────────────────────────────────────
type Keys = "x" | "rotate" | "hue";
const from: SpringSnapshot<Keys> = { x: 0, rotate: 0, hue: 0 };
const to: SpringSnapshot<Keys> = { x: 360, rotate: 18, hue: 60 };

const card = shallowRef<HTMLElement | null>(null);
const preset = ref<PresetId>("smooth");

const presetRow = computed(() => springPreset(preset.value));

function applySnapshot(values: SpringSnapshot<Keys>): void {
    const el = card.value;
    if (!el) return;
    el.style.setProperty("--demo-x", `${values.x}px`);
    el.style.setProperty("--demo-rotate", `${values.rotate}deg`);
    // hue drives a lightness wobble on the SAME violet accent (one color event).
    el.style.setProperty("--demo-l", `${0.46 + values.hue / 600}`);
}

// Re-create the orchestrator on preset change so it picks up the new SHIPPED twin.
const orchestrator = computed(() =>
    useNumericTransition<Keys>({
        from,
        to,
        duration: 1100,
        timingFunction: presetFn(preset.value).fn,
        onFrame: applySnapshot,
    }),
);

function play(): void {
    applySnapshot(from);
    orchestrator.value.start();
}

function reset(): void {
    orchestrator.value.stop();
    applySnapshot(from);
}

// ── The live Spring Playground (response/ζ → springTimingFunction → linear()) ────
const playResponse = ref(0.5);
const playDamping = ref(0.86);

const playStops = computed(() =>
    springLinearStops({
        response: playResponse.value,
        dampingFraction: playDamping.value,
    }),
);
const playFn = computed(() =>
    springTimingFunction({
        response: playResponse.value,
        dampingFraction: playDamping.value,
    }),
);
const playOvershoot = computed(() => {
    let max = 0;
    for (let i = 0; i <= 64; i++) max = Math.max(max, playFn.value.fn(i / 64));
    return ((max - 1) * 100).toFixed(1);
});

function loadPlaygroundPreset(name: PresetId): void {
    const row = springPreset(name);
    playResponse.value = row.response;
    playDamping.value = row.dampingFraction;
}

const playCard = shallowRef<HTMLElement | null>(null);
let playRaf = 0;
function playgroundPlay(): void {
    const el = playCard.value;
    if (!el) return;
    cancelAnimationFrame(playRaf);
    const start = performance.now();
    const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        el.style.transform = `translateX(${(playFn.value.fn(t) * 280).toFixed(2)}px)`;
        if (t < 1) playRaf = requestAnimationFrame(tick);
    };
    playRaf = requestAnimationFrame(tick);
}

const copied = ref(false);
async function copyStops(): Promise<void> {
    try {
        await navigator.clipboard.writeText(playStops.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 1400);
    } catch {
        /* clipboard unavailable */
    }
}
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 (b) — the under-activated motion title arrives at the
             DISPLAY register with the --motion-accent violet as the ONE color
             text-event (the existing motion-purple family UNIFIED onto the
             masthead — the plots/dots/spring already carry it; this is the SAME
             event, not a second hue). Within proportion: the violet lands on the
             title masthead, never a body <p>/section <h2> (the d1 ink floor). -->
        <header class="flex flex-col gap-1">
            <span class="section-label">Motion · Spring Orchestrator</span>
            <span
                class="text-display-3 font-display leading-tight"
                :style="{ color: 'var(--motion-accent)' }"
            >
                Springs
            </span>
        </header>

        <StorySection
            label="Named registers"
            blurb="The four SHIPPED spring registers, driven off the single-source SPRING_PRESETS table — each fires the SAME springTimingFunction twin springLinearStops solves the CSS linear() token from. No local spring solver: the demo teaches the canonical curves, so it can never drift from the vocabulary."
        >
            <section class="flex flex-col gap-6">
                <div class="flex flex-wrap items-end gap-4">
                    <div class="flex w-56 flex-col gap-2">
                        <Label for="spring-preset">Register</Label>
                        <Select v-model="preset">
                            <SelectTrigger id="spring-preset">
                                <SelectValue placeholder="Pick a register" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="id in PRESET_IDS" :key="id" :value="id">
                                    {{ id }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <StoryPlayButton @play="play" />
                    <Button variant="secondary" @click="reset">Reset</Button>

                    <p class="text-small text-muted-foreground ml-auto max-w-md">
                        {{ presetRow.comment }}
                    </p>
                </div>

                <!-- Stage -->
                <div
                    :class="cn(
                        'relative h-48 overflow-hidden rounded-card border border-border/60 bg-background/40',
                        'paper-grain-overlay',
                    )"
                >
                    <div
                        ref="card"
                        class="absolute left-6 top-1/2 flex h-20 w-28 -translate-y-1/2 items-center justify-center rounded-panel text-small font-medium text-white shadow-cartoon"
                        :style="{
                            transform:
                                'translate(var(--demo-x, 0px), -50%) rotate(var(--demo-rotate, 0deg))',
                            backgroundColor:
                                'oklch(var(--demo-l, 0.46) 0.18 317.5)',
                        }"
                    >
                        spring
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <!-- BA.W-DEMO-AFFORDANCES — the range cells re-point off the dead
                         bg-card/60 slab onto the quiet glass tier (glass over the
                         staged backdrop, FD-FS X-2). -->
                    <div
                        v-for="(label, key) in { x: 'translateX', rotate: 'rotate', hue: 'lightness' }"
                        :key="key"
                        class="glass-quiet flex flex-col gap-1 rounded-panel p-3"
                    >
                        <span class="text-mono-caption text-muted-foreground">{{ label }}</span>
                        <span class="fira-code text-small text-foreground">
                            {{ from[key as Keys] }} &rarr; {{ to[key as Keys] }}
                        </span>
                    </div>
                </div>
            </section>
        </StorySection>

        <StorySection
            label="Spring playground"
            blurb="Author a spring live — drag response (the spring's period) and damping fraction ζ (1 fully damps with no overshoot, <1 overshoots); the playground feeds the pair straight to springTimingFunction and reads back the exact CSS linear() stops springLinearStops emits. Seed from a named register, then tune."
        >
            <div class="grid gap-4 lg:grid-cols-[1fr_18rem]">
                <div class="flex flex-col gap-5">
                    <LabeledSlider
                        :model-value="playResponse"
                        label="response (s)"
                        tooltip="The spring's period — larger is slower / looser."
                        :min="0.1"
                        :max="1.2"
                        :step="0.01"
                        @update:model-value="(v: number) => (playResponse = v)"
                    />
                    <LabeledSlider
                        :model-value="playDamping"
                        label="dampingFraction ζ"
                        tooltip="ζ=1 fully damps with no overshoot; below 1 overshoots, above 1 over-damps."
                        :min="0.2"
                        :max="1.5"
                        :step="0.01"
                        @update:model-value="(v: number) => (playDamping = v)"
                    />

                    <!-- live travel stage — BA.W-SUFFUSE2: the violet spent HARDER
                         within proportion (the stage frame reads --motion-accent at a
                         low alpha alongside the travelling dot; ONE family hue, no
                         second). -->
                    <div
                        class="relative h-12 overflow-hidden rounded-pill border bg-[var(--surface-tint-1)]"
                        :style="{
                            borderColor:
                                'color-mix(in srgb, var(--motion-accent) 35%, transparent)',
                        }"
                    >
                        <div
                            ref="playCard"
                            class="absolute left-2 top-1/2 size-8 -translate-y-1/2 rounded-pill bg-[var(--motion-accent)]"
                            style="will-change: transform"
                        />
                    </div>

                    <div class="flex flex-wrap items-center gap-3">
                        <StoryPlayButton @play="playgroundPlay" />
                        <span class="text-small text-muted-foreground">
                            overshoot ~<span class="fira-code text-foreground">{{ playOvershoot }}%</span>
                        </span>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <span class="text-mono-caption text-muted-foreground">Seed from a register</span>
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="id in PRESET_IDS"
                            :key="id"
                            type="button"
                            class="rounded-pill border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-[var(--surface-tint-1)] hover:text-foreground"
                            @click="loadPlaygroundPreset(id)"
                        >
                            {{ id }}
                        </button>
                    </div>

                    <span class="mt-2 text-mono-caption text-muted-foreground">linear() readout</span>
                    <div class="glass-card flex items-start gap-2 rounded-card px-3 py-2">
                        <code class="min-w-0 flex-1 break-all text-[0.7rem] leading-snug text-foreground">{{ playStops }}</code>
                        <button
                            type="button"
                            class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-[var(--surface-tint-1)] hover:text-foreground"
                            :aria-label="copied ? 'Copied' : 'Copy linear() stops'"
                            @click="copyStops"
                        >
                            <Check v-if="copied" class="size-4 text-[var(--motion-accent)]" />
                            <Copy v-else class="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
