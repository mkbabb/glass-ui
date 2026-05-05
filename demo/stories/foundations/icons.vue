<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Sparkles } from "lucide-vue-next";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
import { cn } from "@/utils/cn";

interface Rung {
    name: string;
    cssVar: string;
    px: number;
    cls: string;
}

const rungs: Rung[] = [
    { name: "xs", cssVar: "--icon-xs", px: 12, cls: "icon-xs" },
    { name: "sm", cssVar: "--icon-sm", px: 14, cls: "icon-sm" },
    { name: "md", cssVar: "--icon-md", px: 16, cls: "icon-md" },
    { name: "lg", cssVar: "--icon-lg", px: 20, cls: "icon-lg" },
    { name: "xl", cssVar: "--icon-xl", px: 24, cls: "icon-xl" },
    { name: "2xl", cssVar: "--icon-2xl", px: 32, cls: "icon-2xl" },
    { name: "3xl", cssVar: "--icon-3xl", px: 48, cls: "icon-3xl" },
    { name: "mega", cssVar: "--icon-mega", px: 72, cls: "icon-mega" },
];

const variants: { label: string; frameClass: string | null; description: string }[] = [
    { label: "plain", frameClass: null, description: "naked SVG, currentColor" },
    { label: "stamp", frameClass: "icon-stamp", description: "cream-warm tile + 2px border" },
    { label: "emboss", frameClass: "icon-emboss", description: "drop-shadow filter" },
];
</script>

<template>
    <StoryPage>
        <!-- Hero — mega icon as protagonist, not afterthought -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute -right-12 -top-12 select-none opacity-[0.18]"
            >
                <Sparkles
                    :size="320"
                    :stroke-width="1.25"
                    style="color: var(--gold)"
                />
            </div>
            <p class="section-label">iconography</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-4">
                Big as type.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Empty-state and feature glyphs are 32–72px, not 16–24px. The
                <code class="fira-code">--icon-mega</code> rung lands at 4.5rem so a
                Lucide icon can carry hero weight without scaling artefacts.
            </p>
            <FlourishDivider tone="gold" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- The full ladder -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">the rung ladder · xs → mega</p>
            <div
                class="flex flex-wrap items-end justify-start gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <div
                    v-for="r in rungs"
                    :key="r.name"
                    class="flex flex-col items-center gap-2"
                >
                    <Sparkles
                        :class="cn(r.cls)"
                        :stroke-width="1.5"
                        style="color: var(--cream-foreground)"
                    />
                    <span class="text-mono-caption text-muted-foreground">
                        {{ r.name }}
                    </span>
                    <span class="text-mono-caption text-foreground/60">
                        {{ r.px }}px
                    </span>
                </div>
            </div>
            <p class="text-small text-muted-foreground italic">
                Tokens: <code class="fira-code">--icon-xs</code> ·
                <code class="fira-code">--icon-sm</code> · … ·
                <code class="fira-code">--icon-mega</code>. Generated utility classes
                <code class="fira-code">.icon-xs</code> through
                <code class="fira-code">.icon-mega</code> set width + height in one go.
            </p>
        </section>

        <!-- Frame variants × size matrix -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">frames · plain · stamp · emboss</p>
            <div
                class="grid gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                style="grid-template-columns: 9rem repeat(4, 1fr)"
            >
                <div></div>
                <div
                    v-for="size in (['md', 'lg', '2xl', '3xl'] as const)"
                    :key="size"
                    class="text-mono-caption text-center text-muted-foreground"
                >
                    {{ size }}
                </div>
                <template v-for="v in variants" :key="v.label">
                    <div class="flex flex-col gap-1">
                        <span class="text-mono-caption text-foreground">{{ v.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">
                            {{ v.description }}
                        </span>
                    </div>
                    <div
                        v-for="size in (['md', 'lg', '2xl', '3xl'] as const)"
                        :key="size + v.label"
                        class="flex items-center justify-center"
                    >
                        <IconStamp
                            v-if="v.frameClass === 'icon-stamp'"
                            :size="size"
                            frame="stamp"
                        >
                            <Sparkles class="h-full w-full" :stroke-width="1.5" />
                        </IconStamp>
                        <IconStamp
                            v-else-if="v.frameClass === 'icon-emboss'"
                            :size="size"
                            frame="emboss"
                        >
                            <Sparkles
                                class="h-full w-full"
                                :stroke-width="1.5"
                                style="color: var(--gold-dark)"
                            />
                        </IconStamp>
                        <Sparkles
                            v-else
                            :class="`icon-${size}`"
                            :stroke-width="1.5"
                            style="color: var(--cream-foreground)"
                        />
                    </div>
                </template>
            </div>
        </section>

        <!-- Mega-tier showcase -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">mega · feature glyph at 72px</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-3">
                <div
                    class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
                >
                    <IconStamp size="mega" frame="plain">
                        <Sparkles
                            class="h-full w-full"
                            :stroke-width="1.25"
                            style="color: var(--section-color-2)"
                        />
                    </IconStamp>
                    <p class="text-subheading">Empty state</p>
                    <p class="text-small text-center text-muted-foreground">
                        plain · 72px · section-2 indigo
                    </p>
                </div>
                <div
                    class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
                >
                    <IconStamp size="mega" frame="stamp" accent="section-5">
                        <Sparkles class="h-full w-full" :stroke-width="1.5" />
                    </IconStamp>
                    <p class="text-subheading">Mascot tile</p>
                    <p class="text-small text-center text-muted-foreground">
                        stamp · 72px · accent="section-5" amber
                    </p>
                </div>
                <div
                    class="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
                >
                    <IconStamp size="mega" frame="emboss">
                        <Sparkles
                            class="h-full w-full"
                            :stroke-width="1.5"
                            style="color: var(--gold-dark)"
                        />
                    </IconStamp>
                    <p class="text-subheading">Feature crown</p>
                    <p class="text-small text-center text-muted-foreground">
                        emboss · 72px · gold
                    </p>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
