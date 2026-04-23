<script setup lang="ts">
import { cn } from "@/utils/cn";

const shadows: { cls: string; label: string }[] = [
    { cls: "shadow-xs", label: "xs" },
    { cls: "shadow-sm", label: "sm" },
    { cls: "shadow-md", label: "md" },
    { cls: "shadow-lg", label: "lg" },
    { cls: "shadow-xl", label: "xl" },
    { cls: "shadow-2xl", label: "2xl" },
    { cls: "shadow-cartoon", label: "cartoon" },
    { cls: "shadow-cartoon-hover", label: "cartoon-hover" },
    { cls: "shadow-modal", label: "modal" },
    { cls: "shadow-soft", label: "soft" },
    { cls: "shadow-elevated", label: "elevated" },
];
</script>

<template>
    <section class="flex flex-col gap-12">
        <!-- Grid of static shadow demos -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Elevation</p>
            <div
                class="grid grid-cols-2 gap-8 px-2 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
                <div
                    v-for="s in shadows"
                    :key="s.label"
                    class="flex flex-col items-center gap-3"
                >
                    <div
                        :class="
                            cn(
                                'h-[90px] w-[140px] rounded-card border border-border/60 bg-card',
                                s.cls
                            )
                        "
                    />
                    <span class="text-mono-caption text-muted-foreground">{{
                        s.label
                    }}</span>
                </div>
            </div>
        </div>

        <!-- Interactive cartoon-mechanic: hover to lift. -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Cartoon lift · hover the card
            </p>
            <div class="flex flex-wrap items-center gap-8 px-2 py-8">
                <button
                    type="button"
                    :class="
                        cn(
                            'glass-card flex h-32 w-56 flex-col items-start justify-between rounded-card border border-border p-5 text-left',
                            'shadow-cartoon transition-transform duration-fast ease-out',
                            'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover',
                            'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]'
                        )
                    "
                >
                    <span class="text-admin-label text-muted-foreground">hover me</span>
                    <span class="text-subheading text-foreground">Lifts 1px</span>
                </button>
                <p class="text-prose max-w-md text-muted-foreground">
                    The cartoon mechanic — a hard offset shadow plus a 1px translate on
                    hover — gives cards a paper-on-paper personality without any real
                    depth. It's the library's signature surface affordance.
                </p>
            </div>
        </div>
    </section>
</template>
