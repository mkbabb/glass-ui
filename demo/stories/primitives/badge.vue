<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Badge } from "../../../src/components/ui/badge";
import { cn } from "../../../src/utils/cn";

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
        <!-- Built-in variants. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">variants</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in coreVariants"
                    :key="v.variant"
                    :variant="v.variant"
                >
                    {{ v.label }}
                </Badge>
            </div>
        </section>

        <!-- Viz-basis badges. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">viz-basis via inline fill</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge
                    v-for="v in vizBadges"
                    :key="v.label"
                    :class="cn('border-transparent', v.cls)"
                >
                    {{ v.label }}
                </Badge>
            </div>
        </section>

        <!-- Icon + text compositions. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">with leading dot</p>
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
        </section>

        <!-- Size axis (sm / md / lg). -->
        <section class="flex flex-col gap-3">
            <p class="section-label">size axis</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge size="sm">sm · text-xs</Badge>
                <Badge size="md">md · text-sm (default)</Badge>
                <Badge size="lg">lg · text-base</Badge>
            </div>
        </section>

        <!-- Size axis × variant matrix. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">size × variant</p>
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
        </section>

        <!-- v0.8.6 semantic-tone variants: success / warning / info. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">semantic tones (v0.8.6)</p>
            <p class="text-mono-caption text-muted-foreground">
                Compose --success / --warning / --info plates with their --*-foreground glyph counterparts.
                Pair with status-dot for richer pulse compositions.
            </p>
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
        </section>

        <!-- Inline-with-text alignment proof (md matches text-sm baseline). -->
        <section class="flex flex-col gap-3">
            <p class="section-label">baseline alignment in text-sm context</p>
            <p class="text-sm">
                Row text aligned with
                <Badge variant="outline" size="md">size="md"</Badge>
                badge — baselines coincide because the badge inherits text-sm leading-5.
            </p>
        </section>
    </StoryPage>
</template>
