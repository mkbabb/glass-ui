<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { defineAsyncComponent, onMounted, ref } from "vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";
import { cn } from "@glass/components/_shared/class-names";

// BG.W-DEMO-IA-REDESIGN — the Foundations PAPER chapter. The paper-texture tour
// folds onto this ONE paper page as a member (bare, STORY_NESTED_KEY) via the
// switcher below.
const familyMembers: FamilyMember[] = [
    {
        id: "paper-texture",
        label: "Paper texture",
        component: defineAsyncComponent(() => import("./paper-texture.vue")),
    },
];

// The paper-vs-glass tour declares a paper-grain wash on its manifest row; the
// page chassis renders it behind a glassy hero card, so the tier tiles read
// translucent over the warm-cream grain the page is about.

interface Tile {
    tier: string;
    cls: string;
    opacityVar: string;
    blurVar: string;
    role: string;
}

// Each rung-over-colour plate carries its own paper-grain so the same five tiers
// read as five distinct translucent surfaces over a vivid field rather than five
// identical white rectangles.
interface PaperGlassPlate {
    id: string;
    title: string;
    cls: string;
    role: string;
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

const paperGlassPlates: PaperGlassPlate[] = [
    {
        id: "wash",
        title: "Ambient wash",
        cls: "glass-wash",
        role: "the thinnest rung — the field reads almost clean through it",
        accent: "var(--viz-fourier)",
    },
    {
        id: "resting",
        title: "Resting card",
        cls: "glass-resting",
        role: "the everyday card surface — a translucent plate over the colour",
        accent: "var(--viz-fourier)",
    },
    {
        id: "floating",
        title: "Floating dialog",
        cls: "glass-floating",
        role: "the firmest rung — the field softens to a colour cast behind it",
        accent: "var(--viz-chebyshev)",
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
        <!-- The five glass tier tiles, reading translucent over a recessive WARM
             PAPER FIELD (D2 — BG.W-PAPER-GRAIN-OPTIN retired the universal warm
             `.paper-field` plane, so a `paper-grain-overlay` glass tile over the
             bare recessive shell aurora composited GRAY/metallic — the gray tooth
             desaturated the faint-warm plate below the no-gray floor, C≈0.009). The
             `paper-glass-tier-field` carries a static warm CSS radial behind the
             grid (the W-CATEGORY-CARD-WARM precedent, NO live GL), so the
             translucent glass+grain tiles composite WARM-cream — the warm-cream
             grain the page is about. -->
        <div class="paper-glass-tier-field">
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

        <!-- The tier ladder over a vivid in-region colour field, so each rung
             reads as a distinct translucent plate rather than a white box. -->
        <StorySection
            label="Glass tiers over colour"
            heading="The ladder, against something"
            gap="lg"
            data-testid="paper-glass-section"
        >

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
                    style="background-image: linear-gradient(90deg, var(--surface-tint-8) 1px, transparent 1px), linear-gradient(var(--surface-tint-8) 1px, transparent 1px); background-size: 34px 34px;"
                />

                <div class="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div
                        v-for="plate in paperGlassPlates"
                        :key="plate.id"
                        data-testid="paper-glass-card"
                        :class="
                            cn(
                                plate.cls,
                                'paper-grain-overlay min-h-56 rounded-card p-5',
                                'flex flex-col justify-between overflow-hidden border border-[var(--glass-border-quiet)]',
                            )
                        "
                    >
                        <div class="flex items-start justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <p class="text-admin-label text-muted-foreground">
                                    {{ plate.id }} tier
                                </p>
                                <p class="text-subheading text-foreground">
                                    {{ plate.title }}
                                </p>
                            </div>
                            <span
                                class="h-3 w-3 shrink-0 rounded-full shadow-cartoon-sm"
                                :style="{ backgroundColor: plate.accent }"
                                aria-hidden="true"
                            />
                        </div>

                        <p class="text-small text-muted-foreground">
                            {{ plate.role }}
                        </p>
                    </div>
                </div>
            </div>
        </StorySection>

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
        <StorySection heading="Paper texture & grain">
            <FamilyTabs :members="familyMembers" aria-label="Paper family" />
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* D2 / metallic-wash fold — the recessive WARM PAPER FIELD behind the tier-tile
   grid. BG.W-PAPER-GRAIN-OPTIN retired the universal warm `.paper-field` plane, so
   a `glass-{tier} paper-grain-overlay` tile over the bare recessive shell aurora
   composited GRAY (the saturate=0 grain tooth desaturated the faint-warm plate
   below the BA.W-NO-GRAY floor C 0.02 — measured C 0.009). This gives the
   translucent glass+grain tiles a warm-cream substrate to transmit, so they read
   WARM-cream (the page's own "translucent over warm-cream grain" promise). A static
   warm CSS radial — NO live GL (the one-GL-per-route budget held) — keyed off the
   warm field hue 62 ([25,95] band default), mirroring SectionLanding's
   `.section-bento::before` (the W-CATEGORY-CARD-WARM precedent). Plain per-mode
   `.dark` arm (the light-dark() inset-shadow trap + the scoped :global() drop). */
.paper-glass-tier-field {
    position: relative;
    isolation: isolate;
}
.paper-glass-tier-field::before {
    content: "";
    position: absolute;
    inset: -0.5rem;
    z-index: -1;
    pointer-events: none;
    border-radius: var(--radius-card);
    background:
        radial-gradient(
            120% 95% at 12% 0%,
            oklch(0.91 0.11 68 / 0.6),
            oklch(0.91 0.11 68 / 0) 64%
        ),
        radial-gradient(
            120% 115% at 100% 100%,
            oklch(0.88 0.12 52 / 0.52),
            oklch(0.88 0.12 52 / 0) 68%
        ),
        oklch(0.92 0.068 62);
}
/* warm-EMBER dark floor — low L, chroma KEPT (the W-DARK-MATERIAL luminous-dark
   model), so the tiles transmit a warm glow over the near-black page, NEVER a
   charcoal/metallic slab. */
.dark .paper-glass-tier-field::before {
    background:
        radial-gradient(
            120% 95% at 12% 0%,
            oklch(0.42 0.08 68 / 0.58),
            oklch(0.42 0.08 68 / 0) 64%
        ),
        radial-gradient(
            120% 115% at 100% 100%,
            oklch(0.36 0.09 52 / 0.5),
            oklch(0.36 0.09 52 / 0) 68%
        ),
        oklch(0.26 0.055 62);
}
@media (prefers-reduced-transparency: reduce) {
    /* the field drops to the warm-SOLID floor (STILL warm, never gray). */
    .paper-glass-tier-field::before {
        background: oklch(0.93 0.05 62);
    }
    .dark .paper-glass-tier-field::before {
        background: oklch(0.25 0.045 62);
    }
}
</style>
