<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { onMounted, ref } from "vue";
import { cn } from "@/utils/cn";

interface Tile {
    tier: string;
    cls: string;
    opacityVar: string;
    blurVar: string;
    role: string;
}

const tiers: Tile[] = [
    {
        tier: "subtle",
        cls: "glass-subtle",
        opacityVar: "--glass-opacity-subtle",
        blurVar: "--glass-blur-subtle",
        role: "dock, input bg, hover overlays",
    },
    {
        tier: "default",
        cls: "glass-default",
        opacityVar: "--glass-opacity-default",
        blurVar: "--glass-blur-default",
        role: "cards, content containers",
    },
    {
        tier: "medium",
        cls: "glass-medium",
        opacityVar: "--glass-opacity-medium",
        blurVar: "--glass-blur-medium",
        role: "popovers, dropdowns, floating panels",
    },
    {
        tier: "elevated",
        cls: "glass-elevated",
        opacityVar: "--glass-opacity-elevated",
        blurVar: "--glass-blur-elevated",
        role: "dialogs, command palette, modals",
    },
];

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
                            'paper-grain-overlay relative flex h-48 flex-col justify-between rounded-card border border-[var(--glass-border-default)] p-5'
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
