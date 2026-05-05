<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Info,
    Sparkles,
    XCircle,
    Zap,
} from "lucide-vue-next";
import { Badge, badgeVariants, badgeToneVariants } from "@/components/ui/badge";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

interface VizRow {
    name: string;
    cssVar: string;
}

const viz: VizRow[] = [
    { name: "fourier", cssVar: "--viz-fourier" },
    { name: "chebyshev", cssVar: "--viz-chebyshev" },
    { name: "legendre", cssVar: "--viz-legendre" },
    { name: "amber", cssVar: "--viz-amber" },
    { name: "green", cssVar: "--viz-green" },
];

const sections = Array.from({ length: 13 }, (_, i) => i);

interface ToneRow {
    tone: "success" | "warning" | "destructive" | "info";
    label: string;
    icon: typeof CheckCircle2;
}

const tones: ToneRow[] = [
    { tone: "success", label: "Deployed", icon: CheckCircle2 },
    { tone: "warning", label: "Approaching limit", icon: AlertTriangle },
    { tone: "destructive", label: "Failed", icon: XCircle },
    { tone: "info", label: "Info", icon: Info },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="cool" class="relative overflow-hidden">
            <p class="section-label">color pill · &lt;Badge&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Two encodings, one body.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                <strong>Color</strong> is categorical — viz basis hues, section palette,
                consumer-driven freeform. <strong>Tone</strong> is semantic — success,
                warning, destructive, info — and ships with default Lucide icons. Both
                live on <code class="fira-code">&lt;Badge&gt;</code>; they compose.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Viz basis pill row -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">color · viz basis</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-2)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <Badge
                    v-for="v in viz"
                    :key="v.name"
                    :class="cn(badgeVariants({ variant: 'color' }))"
                    :style="{ '--badge-color': `var(${v.cssVar})` }"
                >
                    <span
                        class="h-2 w-2 rounded-full"
                        :style="{ background: `var(${v.cssVar})` }"
                    />
                    {{ v.name }}
                </Badge>
            </div>
        </section>

        <!-- Section palette pill grid -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">color · 13-stop section palette</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-2)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <Badge
                    v-for="i in sections"
                    :key="i"
                    :class="cn(badgeVariants({ variant: 'color' }))"
                    :style="{ '--badge-color': `var(--section-color-${i})` }"
                >
                    <span
                        class="h-2 w-2 rounded-full"
                        :style="{ background: `var(--section-color-${i})` }"
                    />
                    section-{{ i }}
                </Badge>
            </div>
        </section>

        <!-- Active state demo -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">color · active state ring</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-2)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <Badge
                    :class="cn(badgeVariants({ variant: 'color' }))"
                    :style="{ '--badge-color': 'var(--viz-fourier)' }"
                >
                    idle
                </Badge>
                <Badge
                    :class="cn(badgeVariants({ variant: 'color' }), 'ring-2 ring-offset-2 ring-offset-card')"
                    :style="{
                        '--badge-color': 'var(--viz-fourier)',
                        '--tw-ring-color': 'var(--viz-fourier)',
                    }"
                >
                    active
                </Badge>
                <Badge
                    :class="cn(badgeVariants({ variant: 'color' }), 'opacity-50')"
                    :style="{ '--badge-color': 'var(--viz-fourier)' }"
                >
                    inactive
                </Badge>
            </div>
        </section>

        <!-- Tone variants with default icons -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">tone · semantic, with default icons</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <div
                    v-for="row in tones"
                    :key="row.tone"
                    class="flex flex-col items-center gap-2"
                >
                    <Badge
                        :class="cn(badgeVariants({ variant: 'outline' }), badgeToneVariants({ tone: row.tone }))"
                    >
                        <component :is="row.icon" class="h-3 w-3" :stroke-width="2" />
                        {{ row.label }}
                    </Badge>
                    <span class="text-mono-caption text-muted-foreground">
                        tone="{{ row.tone }}"
                    </span>
                </div>
            </div>
        </section>

        <!-- Tone × custom icon slot override -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">tone · :icon slot override</p>
            <div
                class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <Badge
                    :class="cn(badgeVariants({ variant: 'outline' }), badgeToneVariants({ tone: 'success' }))"
                >
                    <Activity class="h-3 w-3" :stroke-width="2" />
                    Live · 92ms
                </Badge>
                <Badge
                    :class="cn(badgeVariants({ variant: 'outline' }), badgeToneVariants({ tone: 'warning' }))"
                >
                    <Zap class="h-3 w-3" :stroke-width="2" />
                    Throttled
                </Badge>
                <Badge
                    :class="cn(badgeVariants({ variant: 'outline' }), badgeToneVariants({ tone: 'info' }))"
                >
                    <Sparkles class="h-3 w-3" :stroke-width="2" />
                    Beta
                </Badge>
            </div>
        </section>
    </StoryPage>
</template>
