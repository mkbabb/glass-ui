<script setup lang="ts">
// Named and custom previews use keyframes.js managed playback. Their callable,
// CSS readout, measured settle, density, and rounding share the token generator's
// projection; this story owns no frame scheduler.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import StoryPlayButton from "../../chassis/play/StoryPlayButton.vue";
import { computed, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { NumericAnimation, type TimingFunction } from "@mkbabb/keyframes.js";
import {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetName,
} from "@glass/composables/motion/springPresets";
import { springProjection } from "@glass/composables/motion/springProjection";
import { motionTempo } from "@glass/composables/motion/motionTempo";
import { Button } from "@glass/components/button";
import { Label } from "@glass/components/label";
import { LabeledSlider } from "@glass/components/labeled-field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import { Check, Copy } from "@lucide/vue";
import { cn } from "@glass/components/_shared/class-names";

// Dock is deliberately taught in its product-specific morph lab; every shared row
// remains derived from SPRING_PRESETS without a copied roster or count.
type PresetId = Exclude<SpringPresetName, "dock">;
type Snapshot<K extends string> = Record<K, number>;
const PRESET_ROWS = SPRING_PRESETS.filter(
    (row): row is typeof row & { name: PresetId } => row.name !== "dock",
);

function useManagedPreview<K extends string>(onFrame: (values: Snapshot<K>) => void) {
    let animation: NumericAnimation<Snapshot<K>> | null = null;
    let generation = 0;
    const playing = ref(false);

    async function play(
        frames: Snapshot<K>[],
        duration: number,
        timingFunction: TimingFunction,
    ): Promise<void> {
        const current = ++generation;
        animation?.stop();
        animation = new NumericAnimation(frames, {
            duration,
            timingFunction,
            respectReducedMotion: true,
        });
        playing.value = true;
        try {
            await animation.play(onFrame);
        } finally {
            if (current === generation) playing.value = false;
        }
    }

    function stop(): void {
        generation++;
        animation?.stop();
        animation = null;
        playing.value = false;
    }

    onBeforeUnmount(stop);
    return { play, stop, playing };
}

// ── Animation state ─────────────────────────────────────────────────────────────
type Keys = "x" | "rotate" | "hue";
const from: Snapshot<Keys> = { x: 0, rotate: 0, hue: 0 };
const to: Snapshot<Keys> = { x: 360, rotate: 18, hue: 60 };

const card = shallowRef<HTMLElement | null>(null);
const preset = ref<PresetId>("smooth");

const presetRow = computed(() => springPreset(preset.value));
const presetProjection = computed(() => springProjection(presetRow.value));
const namedTempo = ref(1);
const namedDuration = computed(
    () => presetProjection.value.settleSeconds * 1000 * namedTempo.value,
);

function applySnapshot(values: Snapshot<Keys>): void {
    const el = card.value;
    if (!el) return;
    el.style.setProperty("--demo-x", `${values.x}px`);
    el.style.setProperty("--demo-rotate", `${values.rotate}deg`);
    // hue drives a lightness wobble on the SAME violet accent (one color event).
    el.style.setProperty("--demo-l", `${0.46 + values.hue / 600}`);
}

const namedPreview = useManagedPreview(applySnapshot);

function play(): void {
    namedTempo.value = motionTempo(card.value);
    applySnapshot(from);
    void namedPreview.play(
        [from, to],
        namedDuration.value,
        presetProjection.value.timingFunction,
    );
}

function reset(): void {
    namedPreview.stop();
    applySnapshot(from);
}

watch(preset, reset);

// ── Custom authoring, seeded from (but distinct from) shipped tokens ──────────
const playResponse = ref(0.5);
const playDamping = ref(0.86);

const playParameters = computed(() => ({
    response: playResponse.value,
    dampingFraction: playDamping.value,
}));
const playProjection = computed(() => springProjection(playParameters.value));
const playStops = computed(() => playProjection.value.stops);
const matchingPreset = computed(() =>
    PRESET_ROWS.find(
        (row) =>
            row.response === playResponse.value &&
            row.dampingFraction === playDamping.value,
    ),
);
const shippedToken = computed(() => {
    const row = matchingPreset.value;
    if (!row || typeof getComputedStyle !== "function") return "";
    return getComputedStyle(document.documentElement)
        .getPropertyValue(`--spring-${row.name}`)
        .trim();
});
const tokenMatches = computed(
    () => !!matchingPreset.value && shippedToken.value === playStops.value,
);
const playOvershoot = computed(() => {
    let max = 0;
    for (let i = 0; i <= 64; i++) {
        max = Math.max(max, playProjection.value.timingFunction(i / 64));
    }
    return ((max - 1) * 100).toFixed(1);
});

function loadPlaygroundPreset(name: PresetId): void {
    const row = springPreset(name);
    playResponse.value = row.response;
    playDamping.value = row.dampingFraction;
}

const playCard = shallowRef<HTMLElement | null>(null);
const playTempo = ref(1);
const playDuration = computed(
    () => playProjection.value.settleSeconds * 1000 * playTempo.value,
);
const playgroundPreview = useManagedPreview<"x">(({ x }) => {
    if (playCard.value) {
        playCard.value.style.transform = `translateX(${x.toFixed(2)}px)`;
    }
});

function playgroundPlay(): void {
    if (!playCard.value) return;
    playTempo.value = motionTempo(playCard.value);
    playCard.value.style.transform = "translateX(0px)";
    void playgroundPreview.play(
        [{ x: 0 }, { x: 280 }],
        playDuration.value,
        playProjection.value.timingFunction,
    );
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
            blurb="Every shared SPRING_PRESETS row is discovered from the source table; Dock is intentionally demonstrated in its product-specific morph lab. Play uses keyframes.js managed NumericAnimation, the generated measured-settle horizon, and the current --motion-tempo."
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
                                <SelectItem
                                    v-for="row in PRESET_ROWS"
                                    :key="row.name"
                                    :value="row.name"
                                >
                                    {{ row.name }}
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
                    :class="
                        cn(
                            'relative h-48 overflow-hidden rounded-card border border-border/60 bg-background/40',
                            'paper-grain-overlay',
                        )
                    "
                >
                    <div
                        ref="card"
                        class="absolute left-6 top-1/2 flex h-20 w-28 -translate-y-1/2 items-center justify-center rounded-panel text-small font-medium text-white shadow-cartoon"
                        :style="{
                            transform:
                                'translate(var(--demo-x, 0px), -50%) rotate(var(--demo-rotate, 0deg))',
                            backgroundColor: 'oklch(var(--demo-l, 0.46) 0.18 317.5)',
                        }"
                    >
                        spring
                    </div>
                </div>

                <div
                    class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
                    aria-live="polite"
                >
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-mono-caption text-muted-foreground"
                            >family</span
                        >
                        <span class="fira-code text-small text-foreground">
                            {{ preset }} · {{ presetRow.response }}s / ζ{{
                                presetRow.dampingFraction
                            }}
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-mono-caption text-muted-foreground"
                            >authority</span
                        >
                        <span class="fira-code text-small text-foreground">
                            NumericAnimation ·
                            {{ namedPreview.playing.value ? "playing" : "settled" }}
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-mono-caption text-muted-foreground"
                            >generated clock</span
                        >
                        <span class="fira-code text-small text-foreground">
                            {{ (presetProjection.settleSeconds * 1000).toFixed(0) }}ms ×
                            {{ namedTempo.toFixed(2) }} =
                            {{ namedDuration.toFixed(0) }}ms
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-mono-caption text-muted-foreground"
                            >projection</span
                        >
                        <span class="fira-code text-small text-foreground">
                            {{ presetProjection.sampleCount }} samples ·
                            {{ presetProjection.sampleCount + 2 }} stops ·
                            {{ presetProjection.stops.length }} bytes
                        </span>
                    </div>
                </div>
            </section>
        </StorySection>

        <StorySection
            label="Custom spring authoring"
            blurb="Tune a custom response/ζ pair through the token generator's measured 2%-settle, 10ms rounding, 48-sample projection, and tempo-scaled managed playback. Seeded values are byte-compared with their shipped CSS token; edited values remain explicitly custom."
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
                            overshoot ~<span class="fira-code text-foreground"
                                >{{ playOvershoot }}%</span
                            >
                        </span>
                        <span
                            class="text-small text-muted-foreground"
                            aria-live="polite"
                        >
                            {{
                                playgroundPreview.playing.value ? "playing" : "settled"
                            }}
                            · {{ playDuration.toFixed(0) }}ms at
                            {{ playTempo.toFixed(2) }}×
                        </span>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <span class="text-mono-caption text-muted-foreground"
                        >Seed from a register</span
                    >
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="row in PRESET_ROWS"
                            :key="row.name"
                            type="button"
                            class="rounded-pill border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-[var(--surface-tint-1)] hover:text-foreground"
                            @click="loadPlaygroundPreset(row.name)"
                        >
                            {{ row.name }}
                        </button>
                    </div>

                    <span class="mt-2 text-mono-caption text-muted-foreground">
                        {{
                            matchingPreset
                                ? `Seeded --spring-${matchingPreset.name}`
                                : "Custom linear()"
                        }}
                        · {{ playProjection.sampleCount }} samples ·
                        {{ playProjection.settleSeconds.toFixed(2) }}s settle
                    </span>
                    <div
                        class="glass-card flex items-start gap-2 rounded-card px-3 py-2"
                    >
                        <code
                            class="min-w-0 flex-1 break-all text-[0.7rem] leading-snug text-foreground"
                            >{{ playStops }}</code
                        >
                        <button
                            type="button"
                            class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-[var(--surface-tint-1)] hover:text-foreground"
                            :aria-label="copied ? 'Copied' : 'Copy linear() stops'"
                            @click="copyStops"
                        >
                            <Check
                                v-if="copied"
                                class="size-4 text-(--motion-accent)"
                            />
                            <Copy v-else class="size-4" />
                        </button>
                    </div>
                    <p
                        v-if="matchingPreset"
                        class="text-small"
                        :class="tokenMatches ? 'text-success' : 'text-destructive'"
                        role="status"
                    >
                        {{
                            tokenMatches ? "Byte-exact shipped token" : "Token mismatch"
                        }}
                        · {{ playStops.length }} bytes
                    </p>
                    <p v-else class="text-small text-muted-foreground">
                        Custom authoring · no shipped token claimed
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
