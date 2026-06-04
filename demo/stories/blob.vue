<script setup lang="ts">
/**
 * Blob — a procedural metaball field, sibling to the Aurora flat story.
 *
 * Aurora paints a painterly gradient medium; Blob paints a soft-body
 * metaball field over the same configurator idiom. A canvas of N drifting
 * nuclei sums their radial falloffs into a single gooey threshold so the
 * blobs merge + split as they pass each other. Every visual axis reads off
 * the live config (count / viscosity / glow / palette / grain), so the
 * stage SHOWS the configurator rather than printing it.
 *
 * The renderer is self-contained (canvas 2D, token-driven colours) — it is
 * the demo medium, a sibling to aurora's WebGL stage, not a library
 * primitive. Composes the canonical <Configurator> + useConfiguratorState
 * + useRAFLoop substrate so it sits inside the same studio shell.
 */
import { computed, onMounted, ref, watch } from "vue";
import { cn } from "../../src/utils/cn";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../src/components/custom/configurator";
import { ExpandableContainer } from "../../src/components/custom/expandable-container";
import {
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "../../src/components/custom/labeled-field";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import {
    useRAFLoop,
    type RAFLoopTiming,
} from "../../src/composables/motion/useRAFLoop";
import { useTokenColor } from "../../src/composables/dom";

interface BlobConfig {
    palette: string;
    count: number;
    viscosity: number; // drift speed, 0-100
    glow: number; // threshold softness / bloom, 0-100
    grain: boolean;
}

const palettes = ["lagoon", "ember", "orchid"] as const;

// Each palette is a triad of pastel tokens; the field tints its nuclei by
// cycling through the triad. Token names only — no raw hex (the house rule).
const PALETTE_TOKENS: Record<string, readonly [string, string, string]> = {
    lagoon: [
        "--rainbow-pastel-blue",
        "--rainbow-pastel-green",
        "--rainbow-pastel-indigo",
    ],
    ember: [
        "--rainbow-pastel-orange",
        "--rainbow-pastel-red",
        "--rainbow-pastel-yellow",
    ],
    orchid: [
        "--rainbow-pastel-violet",
        "--rainbow-pastel-indigo",
        "--rainbow-pastel-red",
    ],
};

const presets: readonly ConfiguratorPreset<BlobConfig>[] = [
    {
        key: "still",
        label: "Still",
        config: { palette: "lagoon", count: 4, viscosity: 18, glow: 30, grain: false },
    },
    {
        key: "drift",
        label: "Drift",
        config: { palette: "orchid", count: 6, viscosity: 45, glow: 55, grain: true },
    },
    {
        key: "boil",
        label: "Boil",
        config: { palette: "ember", count: 9, viscosity: 82, glow: 78, grain: true },
    },
];

const studio = useConfiguratorState<BlobConfig>({
    presets,
    initialPreset: "drift",
});

const paletteOpen = ref(false);

// Resolve the active palette triad to live rgb strings, re-reading on dark
// transitions via useTokenColor (the canonical token-reading composable).
const tokenNames = computed(
    () => PALETTE_TOKENS[studio.config.palette] ?? PALETTE_TOKENS.lagoon!,
);
const c0 = useTokenColor(computed(() => tokenNames.value[0]!));
const c1 = useTokenColor(computed(() => tokenNames.value[1]!));
const c2 = useTokenColor(computed(() => tokenNames.value[2]!));
const triad = computed(() => [c0.value.value, c1.value.value, c2.value.value]);

// ── Canvas metaball field ──────────────────────────────────────────────
const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Nucleus {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    tint: number; // index into the triad
}

const nuclei: Nucleus[] = [];

function seedNuclei(n: number, w: number, h: number) {
    nuclei.length = 0;
    for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 + Math.random();
        const dist = 0.18 + Math.random() * 0.2;
        nuclei.push({
            x: w * (0.5 + Math.cos(angle) * dist),
            y: h * (0.5 + Math.sin(angle) * dist),
            vx: (Math.random() - 0.5),
            vy: (Math.random() - 0.5),
            r: Math.min(w, h) * (0.16 + Math.random() * 0.1),
            tint: i % 3,
        });
    }
}

let dpr = 1;
function fitCanvas() {
    const cv = canvasRef.value;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.max(1, Math.round(rect.width * dpr));
    cv.height = Math.max(1, Math.round(rect.height * dpr));
    if (nuclei.length === 0) seedNuclei(studio.config.count, cv.width, cv.height);
}

function draw(deltaMs: number) {
    const cv = canvasRef.value;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const w = cv.width;
    const h = cv.height;
    const cfg = studio.config;

    // Drift — viscosity scales speed; nuclei bounce off the soft walls.
    const speed = (0.012 + (cfg.viscosity / 100) * 0.06) * Math.min(deltaMs, 48);
    for (const p of nuclei) {
        p.x += p.vx * speed * Math.min(w, h);
        p.y += p.vy * speed * Math.min(w, h);
        if (p.x < p.r * 0.4 || p.x > w - p.r * 0.4) p.vx *= -1;
        if (p.y < p.r * 0.4 || p.y > h - p.r * 0.4) p.vy *= -1;
        p.x = Math.max(p.r * 0.4, Math.min(w - p.r * 0.4, p.x));
        p.y = Math.max(p.r * 0.4, Math.min(h - p.r * 0.4, p.y));
    }

    ctx.clearRect(0, 0, w, h);
    // Glow softens each blob's edge falloff + lifts the additive bloom.
    const soft = 0.4 + (cfg.glow / 100) * 0.55;
    const tints = triad.value;
    ctx.globalCompositeOperation = "lighter";
    for (const p of nuclei) {
        const col = tints[p.tint] || tints[0] || "rgb(160 180 220)";
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, withAlpha(col, 0.9));
        g.addColorStop(soft, withAlpha(col, 0.45));
        g.addColorStop(1, withAlpha(col, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
}

// rgb(...) → rgba with the given alpha. useTokenColor yields `rgb(r g b)`
// or `hsl(...)`; wrap via color-mix-free manual alpha by switching to the
// modern `rgb(... / a)` slash syntax when the value is an rgb() triple,
// else fall back to a layered opacity through globalAlpha-free blending.
function withAlpha(color: string, alpha: number): string {
    const m = color.trim();
    // `rgb(r g b)` or `rgb(r, g, b)` → `rgb(r g b / a)`
    if (m.startsWith("rgb(")) {
        const inner = m.slice(4, -1).replace(/,/g, " ").trim();
        return `rgb(${inner} / ${alpha})`;
    }
    if (m.startsWith("hsl(")) {
        const inner = m.slice(4, -1).replace(/,/g, " ").trim();
        return `hsl(${inner} / ${alpha})`;
    }
    return m;
}

const loop = useRAFLoop(
    (timing: RAFLoopTiming) => {
        // First frame reports delta 0; clamp to a sane step so the field
        // does not jump on the opening tick.
        draw(timing.delta || 16);
    },
    { immediate: false },
);

onMounted(() => {
    fitCanvas();
    loop.start();
    window.addEventListener("resize", fitCanvas);
});

// Re-seed when the nucleus count changes; refit when the palette/canvas
// changes are handled by the live draw reading studio.config each frame.
watch(
    () => studio.config.count,
    (n) => {
        const cv = canvasRef.value;
        if (cv) seedNuclei(n, cv.width, cv.height);
    },
);

const hintText = [
    "Nuclei drift and merge — viscosity sets the boil, glow the bloom.",
    "Switch presets to retune the field; expand for fullscreen.",
];
</script>

<template>
    <TooltipProvider :delay-duration="300">
        <section class="flex flex-col gap-8">
            <div class="relative overflow-clip">
                <!-- Pastel wash behind the inline frame, mirrors aurora.vue. -->
                <div
                    aria-hidden="true"
                    class="absolute -inset-6 -z-10 rounded-card opacity-50 blur-2xl"
                    :style="{
                        background:
                            'radial-gradient(ellipse 70% 55% at 25% 25%, color-mix(in srgb, var(--rainbow-pastel-blue) 32%, transparent), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, color-mix(in srgb, var(--rainbow-pastel-violet) 28%, transparent), transparent 58%)',
                    }"
                />
                <ExpandableContainer button-position="left">
                    <template #default="{ fullscreen }">
                        <Configurator
                            scroll-mode="never"
                            :class="cn(
                                'blob-studio',
                                fullscreen
                                    ? 'h-screen w-screen rounded-none border-0'
                                    : 'h-[min(78vh,720px)] shadow-cartoon',
                            )"
                            :presets="presets"
                            :active-preset="studio.activePreset.value"
                            @select-preset="studio.selectPreset"
                            @reset="studio.resetCurrent"
                        >
                            <template #stage>
                                <div class="relative h-full w-full overflow-hidden bg-card/30">
                                    <canvas
                                        ref="canvasRef"
                                        class="absolute inset-0 h-full w-full"
                                        aria-hidden="true"
                                    />
                                    <div
                                        v-if="studio.config.grain"
                                        aria-hidden="true"
                                        class="paper-grain-overlay absolute inset-0 opacity-60"
                                    />
                                    <div
                                        class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                                    >
                                        <span class="text-micro font-mono text-muted-foreground">
                                            {{ studio.config.palette }}
                                        </span>
                                        <span class="text-micro font-mono text-muted-foreground/60">
                                            {{ studio.config.count }} nuclei · visc {{ studio.config.viscosity }}
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <template #controls>
                                <ConfiguratorLayer label="Field" sub="--blob-*">
                                    <ConfiguratorRow label="Palette">
                                        <LabeledSelect
                                            v-model="studio.config.palette"
                                            v-model:is-open="paletteOpen"
                                            :items="palettes as unknown as readonly string[]"
                                            label="palette"
                                            tooltip="Triad of pastel tokens the nuclei cycle through."
                                        />
                                    </ConfiguratorRow>
                                    <ConfiguratorRow label="Count">
                                        <LabeledSlider
                                            v-model="studio.config.count"
                                            :min="2"
                                            :max="12"
                                            :step="1"
                                            label="count"
                                            tooltip="Number of metaball nuclei."
                                        />
                                    </ConfiguratorRow>
                                    <ConfiguratorRow label="Viscosity">
                                        <LabeledSlider
                                            v-model="studio.config.viscosity"
                                            :min="0"
                                            :max="100"
                                            :step="1"
                                            label="viscosity"
                                            tooltip="Drift speed — how fast the field boils."
                                        />
                                    </ConfiguratorRow>
                                    <ConfiguratorRow label="Glow">
                                        <LabeledSlider
                                            v-model="studio.config.glow"
                                            :min="0"
                                            :max="100"
                                            :step="1"
                                            label="glow"
                                            tooltip="Edge softness + additive bloom."
                                        />
                                    </ConfiguratorRow>
                                    <ConfiguratorRow label="Grain">
                                        <LabeledSwitch
                                            v-model:checked="studio.config.grain"
                                            label="grain"
                                            tooltip="Layer the paper grain overlay."
                                        />
                                    </ConfiguratorRow>
                                </ConfiguratorLayer>
                            </template>
                        </Configurator>
                    </template>
                </ExpandableContainer>
            </div>

            <aside class="flex flex-col gap-1 text-small text-muted-foreground">
                <p v-for="(line, i) in hintText" :key="i">{{ line }}</p>
            </aside>
        </section>
    </TooltipProvider>
</template>
