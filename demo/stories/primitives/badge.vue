<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Badge } from "@/components/ui/badge";
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

        <!-- Sizes via utility overrides. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">size overrides</p>
            <div class="flex flex-wrap items-center gap-3">
                <Badge class="px-1.5 py-0 text-micro">micro</Badge>
                <Badge>default</Badge>
                <Badge class="px-3 py-1 text-sm">large</Badge>
            </div>
        </section>
    </StoryPage>
</template>
