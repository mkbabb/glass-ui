<script setup lang="ts">
// Named and custom previews share managed playback and spring projection;
// this story owns no frame scheduler.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import StoryPlayButton from "../../chassis/play/StoryPlayButton.vue";
import { computed, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { NumericAnimation, type TimingFunction } from "@mkbabb/keyframes.js";
import {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetName,
} from "@glass/composables/motion/spring/springPresets";
import { springProjection } from "@glass/composables/motion/spring/springProjection";
import { motionTempo } from "@glass/composables/motion/core/motionTempo";
import { useClipboard } from "@glass/composables/dom/useClipboard";
import { Button } from "@glass/components/button";
import { Label } from "@glass/components/label";
import { LabeledSlider } from "@glass/components/labeled-field";
import {
    Configurator,
    ConfiguratorLayer,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
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
type PreviewKey = "progress";
const from: Snapshot<PreviewKey> = { progress: 0 };
const to: Snapshot<PreviewKey> = { progress: 1 };

const RESPONSIVE_TRAVEL =
    "calc(var(--preview-progress, 0) * max(0px, min(var(--preview-cap), calc((100cqi - var(--preview-start) - var(--preview-end) - var(--preview-envelope)) / var(--preview-peak)))))";

function setPreviewProgress(element: HTMLElement | null, progress: number): void {
    element?.style.setProperty("--preview-progress", `${progress}`);
}

const card = shallowRef<HTMLElement | null>(null);
const preset = ref<PresetId>("press");

const presetRow = computed(() => springPreset(preset.value));
const presetProjection = computed(() => springProjection(presetRow.value));
const presetPeak = computed(() => presetProjection.value.peak);
const namedTempo = ref(1);
const namedDuration = computed(
    () => presetProjection.value.settleSeconds * 1000 * namedTempo.value,
);

const namedPreview = useManagedPreview<PreviewKey>(({ progress }) =>
    setPreviewProgress(card.value, progress),
);

function play(): void {
    namedTempo.value = motionTempo(card.value);
    setPreviewProgress(card.value, 0);
    void namedPreview.play(
        [from, to],
        namedDuration.value,
        presetProjection.value.timingFunction,
    );
}

function reset(): void {
    namedPreview.stop();
    setPreviewProgress(card.value, 0);
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
const playPeak = computed(() => playProjection.value.peak);
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
const playOvershoot = computed(() => ((playPeak.value - 1) * 100).toFixed(1));

function loadPlaygroundPreset(name: PresetId): void {
    const row = springPreset(name);
    playResponse.value = row.response;
    playDamping.value = row.dampingFraction;
}

// The seed gallery projected to the <Configurator> preset row — each named
// register is a preset chip that loads its response/ζ into the live authoring
// controls. `config` carries the register id so the standard's select-preset
// event round-trips through loadPlaygroundPreset.
const seedPresets = computed<ConfiguratorPreset<PresetId>[]>(() =>
    PRESET_ROWS.map((row) => ({
        key: row.name,
        label: row.name,
        sub: `${row.response}s · ζ${row.dampingFraction}`,
        config: row.name,
    })),
);
const activeSeed = computed(() => matchingPreset.value?.name);

// The @reset hook — back to the shipped `press` seed (the born default of the
// authoring pair), stopping any in-flight preview.
function resetPlayground(): void {
    loadPlaygroundPreset("press");
}

// The <Configurator> select-preset event carries the chip key as a bare string;
// every seed key is a PresetId by construction (seedPresets maps PRESET_ROWS).
function onSeedPreset(key: string): void {
    loadPlaygroundPreset(key as PresetId);
}

const playCard = shallowRef<HTMLElement | null>(null);
const playTempo = ref(1);
const playDuration = computed(
    () => playProjection.value.settleSeconds * 1000 * playTempo.value,
);
const playgroundPreview = useManagedPreview<PreviewKey>(({ progress }) =>
    setPreviewProgress(playCard.value, progress),
);

watch([playResponse, playDamping], () => {
    playgroundPreview.stop();
    setPreviewProgress(playCard.value, 0);
});

function playgroundPlay(): void {
    if (!playCard.value) return;
    playTempo.value = motionTempo(playCard.value);
    setPreviewProgress(playCard.value, 0);
    void playgroundPreview.play(
        [from, to],
        playDuration.value,
        playProjection.value.timingFunction,
    );
}

const { status: copyStatus, copy, invalidate: invalidateCopy } = useClipboard({
    resetMs: 1400,
});
const copyLabel = computed(() => {
    if (copyStatus.value === "pending") return "Copying stops";
    if (copyStatus.value === "success") return "Copied";
    if (copyStatus.value === "failure") return "Retry copying linear() stops";
    return "Copy linear() stops";
});
const copyMessage = computed(() => {
    if (copyStatus.value === "pending") return "Copying stops…";
    if (copyStatus.value === "success") return "Stops copied.";
    if (copyStatus.value === "failure") {
        return "Copy failed. Select the stops above and copy manually.";
    }
    return "";
});

function copyStops(): void {
    if (copyStatus.value === "pending") return;
    const stops = playStops.value;
    void copy(stops);
}

watch(playStops, invalidateCopy);
</script>

<template>
    <StoryPage>
        <!-- The motion title arrives at the
             DISPLAY register with the --motion-accent violet as the ONE color
             text-event (the existing motion-purple family UNIFIED onto the
             masthead — the plots/dots/spring already carry it; this is the SAME
             event, not a second hue). Within proportion: the violet lands on the
             title masthead, never a body <p>/section <h2> (the d1 ink floor). -->
        <header class="flex flex-col gap-1">
            <span class="text-small text-muted-foreground">Motion · Spring Orchestrator</span>
            <span
                class="text-display-3 font-display leading-tight"
                :style="{ color: 'var(--motion-accent)' }"
            >
                Springs
            </span>
        </header>

        <StorySection
            label="Named registers"
            blurb="Each named motion character balances response and damping for a distinct feel. Play the samples together or one at a time to compare their arrivals."
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
                    <Button @click="reset">Reset</Button>

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
                    :style="{
                        containerType: 'inline-size',
                        '--preview-cap': '360px',
                        '--preview-start': '1.5rem',
                        '--preview-end': '1.5rem',
                        '--preview-inline-size': '7rem',
                        '--preview-block-size': '5rem',
                        '--preview-envelope':
                            'calc(var(--preview-inline-size) / 2 + hypot(var(--preview-inline-size) / 2, var(--preview-block-size) / 2))',
                        '--preview-peak': presetPeak,
                    }"
                >
                    <div
                        ref="card"
                        class="absolute top-1/2 flex items-center justify-center rounded-panel text-small font-medium text-white shadow-cartoon"
                        :style="{
                            insetInlineStart: 'var(--preview-start)',
                            inlineSize: 'var(--preview-inline-size)',
                            blockSize: 'var(--preview-block-size)',
                            transform: `translate(${RESPONSIVE_TRAVEL}, -50%) rotate(calc(var(--preview-progress, 0) * 18deg))`,
                            backgroundColor:
                                'oklch(calc(0.46 + var(--preview-progress, 0) * 0.1) 0.18 317.5)',
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
                        <span class="text-caption text-muted-foreground"
                            >family</span
                        >
                        <span class="fira-code text-small text-foreground">
                            {{ preset }} · {{ presetRow.response }}s / ζ{{
                                presetRow.dampingFraction
                            }}
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-caption text-muted-foreground"
                            >authority</span
                        >
                        <span class="fira-code text-small text-foreground">
                            NumericAnimation ·
                            {{ namedPreview.playing.value ? "playing" : "settled" }}
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-caption text-muted-foreground"
                            >generated clock</span
                        >
                        <span class="fira-code text-small text-foreground">
                            {{ (presetProjection.settleSeconds * 1000).toFixed(0) }}ms ×
                            {{ namedTempo.toFixed(2) }} =
                            {{ namedDuration.toFixed(0) }}ms
                        </span>
                    </div>
                    <div class="glass-quiet flex flex-col gap-1 rounded-panel p-3">
                        <span class="text-caption text-muted-foreground"
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

        <!-- Custom authoring adopts the ONE configurator anatomy (BJ.W-CONFIGURATOR-STD
             G-CFG-1): a preset seed row (the named registers) + a live stage + a
             right-hand inspector of grouped <ConfiguratorLayer> sections. The `heading`
             at level="title" sets the section two rungs above the default body register
             so the page reads a real type ladder (hero ≫ section title ≫ layer heading
             ≫ row label ≫ token) — the story section stays a rung above the configurator
             section labels it contains. -->
        <StorySection
            heading="Custom spring authoring"
            level="title"
            blurb="Tune response and damping, then play the custom curve. Seed from a named register up top; the inspector reads its measured settling time and projected shape."
        >
            <Configurator
                class="story-stage"
                :presets="seedPresets"
                :active-preset="activeSeed"
                @select-preset="onSeedPreset"
                @reset="resetPlayground"
            >
                <template #stage>
                    <!-- live travel stage — the --motion-accent violet spent within
                         proportion (the track reads the family hue at low alpha
                         alongside the travelling dot). -->
                    <div
                        class="configurator-specimen paper-grain-overlay relative flex h-full w-full items-center justify-center overflow-hidden p-6"
                    >
                        <div
                            class="relative h-12 w-full max-w-[440px] overflow-hidden rounded-pill border bg-[var(--surface-tint-1)]"
                            :style="{
                                containerType: 'inline-size',
                                borderColor:
                                    'color-mix(in srgb, var(--motion-accent) 35%, transparent)',
                                '--preview-cap': '360px',
                                '--preview-start': '0.5rem',
                                '--preview-end': '0.5rem',
                                '--preview-inline-size': '2rem',
                                '--preview-block-size': '2rem',
                                '--preview-envelope': 'var(--preview-inline-size)',
                                '--preview-peak': playPeak,
                            }"
                        >
                            <div
                                ref="playCard"
                                class="absolute top-1/2 rounded-pill bg-[var(--motion-accent)]"
                                :style="{
                                    insetInlineStart: 'var(--preview-start)',
                                    inlineSize: 'var(--preview-inline-size)',
                                    blockSize: 'var(--preview-block-size)',
                                    transform: `translate(${RESPONSIVE_TRAVEL}, -50%)`,
                                }"
                            />
                        </div>
                        <div
                            class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1"
                        >
                            <span class="text-micro font-mono text-muted-foreground">
                                overshoot {{ playOvershoot }}%
                            </span>
                            <span
                                class="text-micro font-mono text-muted-foreground/60"
                                aria-live="polite"
                            >
                                {{ playgroundPreview.playing.value ? "playing" : "settled" }}
                                · {{ playDuration.toFixed(0) }}ms
                            </span>
                        </div>
                    </div>
                </template>

                <template #controls>
                    <ConfiguratorLayer label="Spring" sub="--spring-*">
                        <LabeledSlider
                            v-model="playResponse"
                            label="response (s)"
                            description="The spring's period — larger is slower / looser."
                            :min="0.1"
                            :max="1.2"
                            :step="0.01"
                        />
                        <LabeledSlider
                            v-model="playDamping"
                            label="dampingFraction ζ"
                            description="ζ=1 fully damps with no overshoot; below 1 overshoots, above 1 over-damps."
                            :min="0.2"
                            :max="1.5"
                            :step="0.01"
                        />
                    </ConfiguratorLayer>

                    <ConfiguratorLayer label="Output" sub="linear()">
                        <p class="text-small text-muted-foreground">
                            {{
                                matchingPreset
                                    ? `Seeded --spring-${matchingPreset.name}`
                                    : "Custom linear()"
                            }}
                            · {{ playProjection.sampleCount }} samples ·
                            {{ playProjection.settleSeconds.toFixed(2) }}s settle
                        </p>
                        <div
                            class="glass-card flex items-start gap-2 rounded-card px-3 py-2"
                        >
                            <code
                                class="min-w-0 flex-1 break-all text-micro leading-snug text-foreground"
                                >{{ playStops }}</code
                            >
                            <button
                                type="button"
                                class="shrink-0 rounded-pill p-1.5 text-muted-foreground transition-colors hover:bg-[var(--surface-tint-1)] hover:text-foreground"
                                :aria-label="copyLabel"
                                :aria-disabled="
                                    copyStatus === 'pending' ? 'true' : undefined
                                "
                                @click="copyStops"
                            >
                                <Check
                                    v-if="copyStatus === 'success'"
                                    class="size-4 text-(--motion-accent)"
                                />
                                <Copy v-else class="size-4" />
                            </button>
                        </div>
                        <p
                            v-if="copyMessage"
                            class="text-small"
                            :class="
                                copyStatus === 'failure'
                                    ? 'text-destructive'
                                    : 'text-muted-foreground'
                            "
                            role="status"
                            aria-live="polite"
                        >
                            {{ copyMessage }}
                        </p>
                        <p
                            v-if="matchingPreset"
                            class="text-small"
                            :class="tokenMatches ? 'text-success' : 'text-destructive'"
                            role="status"
                        >
                            {{
                                tokenMatches
                                    ? "Byte-exact shipped token"
                                    : "Token mismatch"
                            }}
                            · {{ playStops.length }} bytes
                        </p>
                        <p v-else class="text-small text-muted-foreground">
                            Custom authoring · no shipped token claimed
                        </p>
                    </ConfiguratorLayer>
                </template>

                <template #footer="{ reset }">
                    <div class="flex flex-wrap items-center gap-3">
                        <StoryPlayButton @play="playgroundPlay" />
                        <Button emphasis="quiet" @click="reset">Reset</Button>
                        <span
                            class="text-small text-muted-foreground"
                            aria-live="polite"
                        >
                            {{ playgroundPreview.playing.value ? "playing" : "settled" }}
                            · {{ playDuration.toFixed(0) }}ms at
                            {{ playTempo.toFixed(2) }}×
                        </span>
                    </div>
                </template>
            </Configurator>
        </StorySection>
    </StoryPage>
</template>
