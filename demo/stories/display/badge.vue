<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Badge } from "../../../src/components/ui/badge";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { cn } from "../../../src/utils/cn";
import { BadgeCheck } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the display band's ONE coherent --section-color-5
// identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip>
// double-header shape).
const DISPLAY_STOP = 5;

// The section-color tone axis as a documented Badge variant teaching row (the
// display map's "surface the section-color tone as a documented variant axis").
const sectionToneBadges: { stop: number; label: string }[] = [
    { stop: 0, label: "rose" },
    { stop: 3, label: "teal" },
    { stop: 5, label: "amber" },
    { stop: 9, label: "slate" },
    { stop: 12, label: "indigo" },
];

const coreVariants: { variant: "default" | "secondary" | "destructive" | "outline"; label: string }[] = [
    { variant: "default", label: "default" },
    { variant: "secondary", label: "secondary" },
    { variant: "destructive", label: "destructive" },
    { variant: "outline", label: "outline" },
];

const semanticVariants: { variant: "success" | "warning" | "info"; label: string }[] = [
    { variant: "success", label: "success" },
    { variant: "warning", label: "warning" },
    { variant: "info", label: "info" },
];

const vizBadges: { cls: string; label: string }[] = [
    { cls: "bg-viz-fourier text-white", label: "fourier" },
    { cls: "bg-viz-chebyshev text-white", label: "chebyshev" },
    { cls: "bg-viz-legendre text-white", label: "legendre" },
];
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${DISPLAY_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="BadgeCheck" :section="DISPLAY_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Display · Badge
                </span>
                <p class="text-small text-muted-foreground">
                    Loud-pill status badges — the section identity is the ONE
                    color event; the loud pills carry their own register.
                </p>
            </div>
        </header>

        <StorySection
            label="section-color tone axis"
            blurb="Compose a --section-color-N fill as a documented Badge tone — the 13-stop jewel-tone ramp as a saturated-pill teaching axis."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="t in sectionToneBadges"
                    :key="t.stop"
                    class="border-transparent text-white"
                    :style="{ backgroundColor: `var(--section-color-${t.stop})` }"
                >
                    {{ t.label }}
                </Badge>
            </div>
        </StorySection>

        <StorySection label="variants">
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in coreVariants"
                    :key="v.variant"
                    :variant="v.variant"
                >
                    {{ v.label }}
                </Badge>
            </div>
        </StorySection>

        <StorySection label="viz-basis via inline fill">
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in vizBadges"
                    :key="v.label"
                    :class="cn('border-transparent', v.cls)"
                >
                    {{ v.label }}
                </Badge>
            </div>
        </StorySection>

        <StorySection label="with leading dot">
            <div class="flex flex-wrap items-center gap-3">
                <Badge variant="outline" class="gap-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-viz-fourier" />
                    Active
                </Badge>
                <Badge variant="outline" class="gap-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-viz-chebyshev" />
                    Syncing
                </Badge>
                <Badge variant="outline" class="gap-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                    Idle
                </Badge>
                <Badge variant="outline" class="gap-1.5">
                    <span class="h-1.5 w-1.5 rounded-full bg-destructive" />
                    Error
                </Badge>
            </div>
        </StorySection>

        <StorySection label="size axis">
            <div class="flex flex-wrap items-center gap-3">
                <Badge size="sm">sm · text-xs</Badge>
                <Badge size="md">md · text-sm (default)</Badge>
                <Badge size="lg">lg · text-base</Badge>
            </div>
        </StorySection>

        <StorySection label="size × variant">
            <div class="flex flex-col gap-3">
                <div
                    v-for="v in coreVariants"
                    :key="v.variant"
                    class="flex flex-wrap items-center gap-3"
                >
                    <Badge :variant="v.variant" size="sm">sm</Badge>
                    <Badge :variant="v.variant" size="md">md</Badge>
                    <Badge :variant="v.variant" size="lg">lg</Badge>
                    <span class="text-mono-caption text-muted-foreground">{{ v.label }}</span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="semantic tones (v0.8.6)"
            blurb="Compose --success / --warning / --info plates with their --*-foreground glyph counterparts. Pair with status-dot for richer pulse compositions."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in semanticVariants"
                    :key="v.variant"
                    :variant="v.variant"
                >
                    {{ v.label }}
                </Badge>
            </div>
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in semanticVariants"
                    :key="v.variant"
                    :variant="v.variant"
                    class="gap-1.5"
                >
                    <span class="size-1.5 rounded-full bg-current" />
                    {{ v.label }} with dot
                </Badge>
            </div>
        </StorySection>

        <StorySection label="baseline alignment in text-sm context">
            <p class="text-sm">
                Row text aligned with
                <Badge variant="outline" size="md">size="md"</Badge>
                badge — baselines coincide because the badge inherits text-sm leading-5.
            </p>
        </StorySection>
    </StoryPage>
</template>
