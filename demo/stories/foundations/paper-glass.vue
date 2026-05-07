<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { onMounted, ref } from "vue";
import { GlassPanel } from "../../../src/components/custom/glass-panel";
import { useGlassRenderer, type GlassTier } from "../../../src/composables/glass";
import { cn } from "../../../src/utils/cn";

interface Tile {
    tier: string;
    cls: string;
    opacityVar: string;
    blurVar: string;
    role: string;
}

// v0.8 5-rung surface ladder. The retired v0.7 vocabulary
// (`default | medium | elevated`) was excised in v0.8.6.
type GlassPanelVariant =
    | "wash"
    | "quiet"
    | "resting"
    | "floating"
    | "overlay";

interface PanelExample {
    id: string;
    title: string;
    tier: GlassTier;
    variant: GlassPanelVariant;
    rendering: string;
    blur: number;
    refraction: number;
    chromaticAberration: boolean;
    accent: string;
}

const tiers: Tile[] = [
    {
        tier: "wash",
        cls: "glass-wash",
        opacityVar: "--glass-opacity-wash",
        blurVar: "--glass-blur-wash",
        role: "dock, input bg, hover overlays",
    },
    {
        tier: "quiet",
        cls: "glass-quiet",
        opacityVar: "--glass-opacity-quiet",
        blurVar: "--glass-blur-quiet",
        role: "ambient panels, secondary surfaces",
    },
    {
        tier: "resting",
        cls: "glass-resting",
        opacityVar: "--glass-opacity-resting",
        blurVar: "--glass-blur-resting",
        role: "cards, popovers, dropdowns, floating panels",
    },
    {
        tier: "floating",
        cls: "glass-floating",
        opacityVar: "--glass-opacity-floating",
        blurVar: "--glass-blur-floating",
        role: "dialogs, command palette, modals",
    },
    {
        tier: "overlay",
        cls: "glass-overlay",
        opacityVar: "--glass-opacity-overlay",
        blurVar: "--glass-blur-overlay",
        role: "scrims, modal substrates, sheet backings",
    },
];

const panelExamples: PanelExample[] = [
    {
        id: "css-resting",
        title: "CSS frost layer",
        tier: "css",
        variant: "resting",
        rendering: "backdrop-filter blur + tokenized resting glass",
        blur: 14,
        refraction: 0.18,
        chromaticAberration: false,
        accent: "var(--viz-fourier)",
    },
    {
        id: "svg-floating",
        title: "Refractive lens",
        tier: "svg-filter",
        variant: "floating",
        rendering: "SVG displacement map + floating glass shell",
        blur: 18,
        refraction: 0.42,
        chromaticAberration: true,
        accent: "var(--viz-fourier)",
    },
    {
        id: "fallback-quiet",
        title: "Fallback plate",
        tier: "fallback",
        variant: "quiet",
        rendering: "opaque token surface for unsupported backdrop filters",
        blur: 8,
        refraction: 0,
        chromaticAberration: false,
        accent: "var(--viz-chebyshev)",
    },
];

const { tier: detectedGlassTier } = useGlassRenderer();

// Live token values are read on mount and exposed for display.
const values = ref<Record<string, string>>({});
const grainOpacity = ref<string>("");

function readVar(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

onMounted(() => {
    const out: Record<string, string> = {};
    for (const t of tiers) {
        out[t.opacityVar] = readVar(t.opacityVar);
        out[t.blurVar] = readVar(t.blurVar);
    }
    values.value = out;
    grainOpacity.value = readVar("--glass-grain-opacity");
});
</script>

<template>
    <StoryPage>
        <!-- Pastel radial wash backdrop for the four tier tiles. -->
        <div
            :class="
                cn(
                    'relative overflow-hidden rounded-card p-8 md:p-12',
                    'bg-[radial-gradient(ellipse_70%_60%_at_25%_25%,color-mix(in_srgb,var(--rainbow-pastel-yellow)_55%,transparent),transparent_60%),radial-gradient(ellipse_65%_55%_at_80%_70%,color-mix(in_srgb,var(--rainbow-pastel-blue)_50%,transparent),transparent_60%),radial-gradient(ellipse_60%_50%_at_60%_20%,color-mix(in_srgb,var(--rainbow-pastel-red)_40%,transparent),transparent_55%)]'
                )
            "
        >
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="t in tiers"
                    :key="t.tier"
                    :class="
                        cn(
                            t.cls,
                            'paper-grain-overlay relative flex h-48 flex-col justify-between rounded-card border border-[var(--glass-border-quiet)] p-5'
                        )
                    "
                >
                    <div class="flex flex-col">
                        <p class="text-admin-label text-muted-foreground">
                            {{ t.tier }}
                        </p>
                        <p class="text-subheading text-foreground">
                            glass-{{ t.tier }}
                        </p>
                    </div>
                    <p class="text-small text-muted-foreground">{{ t.role }}</p>
                </div>
            </div>
        </div>

        <!-- GlassPanel substrate: component-level renderer tiers. -->
        <section data-testid="glass-panel-section" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p class="text-admin-label text-muted-foreground">
                        GlassPanel · renderer substrate
                    </p>
                    <h2 class="text-subheading text-foreground">
                        Tiered glass panels
                    </h2>
                </div>
                <p
                    data-testid="glass-renderer-readout"
                    class="text-small rounded-panel border border-border/60 bg-card/60 px-3 py-2 text-muted-foreground"
                >
                    detected tier ·
                    <code class="fira-code text-foreground">{{ detectedGlassTier }}</code>
                </p>
            </div>

            <div
                :class="
                    cn(
                        'relative overflow-hidden rounded-card border border-border/60 p-5 md:p-7',
                        'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--viz-fourier)_24%,transparent),transparent_36%),radial-gradient(circle_at_80%_20%,color-mix(in_srgb,var(--viz-chebyshev)_25%,transparent),transparent_32%),var(--background)]',
                    )
                "
            >
                <div
                    class="absolute inset-0 opacity-45"
                    aria-hidden="true"
                    style="background-image: linear-gradient(90deg, color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(color-mix(in srgb, var(--foreground) 8%, transparent) 1px, transparent 1px); background-size: 34px 34px;"
                />

                <div class="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <GlassPanel
                        v-for="panel in panelExamples"
                        :key="panel.id"
                        data-testid="glass-panel-card"
                        :tier="panel.tier"
                        :variant="panel.variant"
                        :blur="panel.blur"
                        :refraction="panel.refraction"
                        :chromatic-aberration="panel.chromaticAberration"
                        :class="
                            cn(
                                'paper-grain-overlay min-h-56 rounded-card p-5',
                                'flex flex-col justify-between overflow-hidden',
                            )
                        "
                    >
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <p class="text-admin-label text-muted-foreground">
                                    {{ panel.variant }} variant
                                </p>
                                <p class="text-subheading text-foreground">
                                    {{ panel.title }}
                                </p>
                            </div>
                            <span
                                class="h-3 w-3 shrink-0 rounded-full shadow-cartoon-sm"
                                :style="{ backgroundColor: panel.accent }"
                                aria-hidden="true"
                            />
                        </div>

                        <div class="grid grid-cols-1 gap-2 text-small">
                            <p class="text-muted-foreground">
                                tier ·
                                <code class="fira-code text-foreground">{{ panel.tier }}</code>
                            </p>
                            <p class="text-muted-foreground">
                                rendering ·
                                <span class="text-foreground">{{ panel.rendering }}</span>
                            </p>
                            <p class="text-muted-foreground">
                                blur/refraction ·
                                <code class="fira-code text-foreground">
                                    {{ panel.blur }}px / {{ panel.refraction }}
                                </code>
                            </p>
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </section>

        <!-- Paper-grain overlay tile: explicit grain utility on a flat surface. -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                paper-grain-overlay · standalone
            </p>
            <div
                :class="
                    cn(
                        'paper-grain-overlay relative flex h-40 flex-col justify-between rounded-card border border-border bg-card p-5 shadow-cartoon'
                    )
                "
            >
                <p class="text-subheading text-foreground">
                    Warm cream + SVG turbulence
                </p>
                <p class="text-small text-muted-foreground">
                    Grain opacity · <code class="fira-code">--glass-grain-opacity</code> =
                    <code class="fira-code">{{ grainOpacity || "…" }}</code>
                </p>
            </div>
        </div>

        <!-- Live token readout. -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Live token values</p>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div
                    v-for="t in tiers"
                    :key="`v-${t.tier}`"
                    class="flex flex-col gap-1 rounded-panel border border-border bg-card/60 p-3"
                >
                    <span class="text-mono-caption text-muted-foreground">{{
                        t.tier
                    }}</span>
                    <span class="text-small text-foreground">
                        opacity · {{ values[t.opacityVar] || "…" }}
                    </span>
                    <span class="text-small text-foreground">
                        blur · {{ values[t.blurVar] || "…" }}
                    </span>
                </div>
            </div>
        </div>
    </StoryPage>
</template>
