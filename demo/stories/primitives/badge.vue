<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Badge } from "@/components/ui/badge";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

const coreVariants: { variant: "default" | "secondary" | "destructive" | "outline"; label: string }[] = [
    { variant: "default", label: "default" },
    { variant: "secondary", label: "secondary" },
    { variant: "destructive", label: "destructive" },
    { variant: "outline", label: "outline" },
];

const vizBadges: { cls: string; label: string }[] = [
    { cls: "bg-viz-fourier text-white", label: "fourier" },
    { cls: "bg-viz-chebyshev text-white", label: "chebyshev" },
    { cls: "bg-viz-legendre text-white", label: "legendre" },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-2">
                Badge primitives
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Variant sweep, viz-basis fills, dot leaders, and size overrides — the bare
                <code class="fira-code">Badge</code> chassis before tone overlays land.
            </p>
            <FlourishDivider tone="section-1" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Built-in variants. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-1)' }">variants</p>
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
            <p class="section-label" :style="{ color: 'var(--section-color-1)' }">viz-basis via inline fill</p>
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
            <p class="section-label" :style="{ color: 'var(--section-color-1)' }">with leading dot</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge variant="outline" class="gap-1.5">
                    <span
                        class="h-1.5 w-1.5 rounded-full"
                        :style="{ background: 'var(--section-color-1)' }"
                    />
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

        <!-- Sizes via utility overrides. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-1)' }">size overrides</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge class="px-1.5 py-0 text-micro">micro</Badge>
                <Badge>default</Badge>
                <Badge class="px-3 py-1 text-sm">large</Badge>
            </div>
        </section>
    </StoryPage>
</template>
