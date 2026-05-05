<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    BookOpen,
    Compass,
    Layers,
    Library,
    Package,
    Sparkles,
    Star,
    Type,
    Wand2,
} from "lucide-vue-next";
import type { Component } from "vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
import type { IconStampAccent, IconStampSize, IconStampFrame } from "@/components/custom/icon-stamp";

const sizes: IconStampSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "mega"];
const frames: IconStampFrame[] = ["plain", "stamp", "emboss"];

interface AccentRow {
    accent: IconStampAccent;
    label: string;
    icon: Component;
}

const accents: AccentRow[] = [
    { accent: "section-0", label: "rose", icon: Star },
    { accent: "section-2", label: "indigo", icon: Compass },
    { accent: "section-3", label: "teal-cyan", icon: Library },
    { accent: "section-5", label: "amber", icon: Sparkles },
    { accent: "section-6", label: "tomato", icon: Wand2 },
    { accent: "section-7", label: "violet", icon: Layers },
    { accent: "section-8", label: "ruby", icon: Package },
    { accent: "section-11", label: "ocean", icon: BookOpen },
    { accent: "section-12", label: "periwinkle", icon: Type },
];
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">&lt;IconStamp&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Stamp it.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                The frame primitive for Lucide. Wraps any inline SVG in a cream-warm
                tile + 2px border + cartoon-sm shadow, retints via section accent, or
                forwards naked size for emboss / plain frames.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Frame × size matrix -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">frames × sizes</p>
            <div
                class="overflow-x-auto rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
            >
                <table class="border-separate border-spacing-x-6 border-spacing-y-4">
                    <thead>
                        <tr>
                            <th class="text-mono-caption text-left text-muted-foreground">
                                frame
                            </th>
                            <th
                                v-for="s in sizes"
                                :key="s"
                                class="text-mono-caption text-center text-muted-foreground"
                            >
                                {{ s }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="frame in frames" :key="frame">
                            <td class="text-small text-foreground">{{ frame }}</td>
                            <td v-for="s in sizes" :key="s + frame" class="text-center">
                                <IconStamp :frame="frame" :size="s">
                                    <Sparkles
                                        class="h-full w-full"
                                        :stroke-width="1.5"
                                    />
                                </IconStamp>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Accent grid -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">section accents · stamp + 3xl</p>
            <div
                class="grid gap-[var(--space-phi-3)] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
            >
                <div
                    v-for="row in accents"
                    :key="row.accent"
                    class="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
                >
                    <IconStamp :accent="row.accent" frame="stamp" size="3xl">
                        <component
                            :is="row.icon"
                            class="h-full w-full"
                            :stroke-width="1.5"
                        />
                    </IconStamp>
                    <span class="text-subheading">{{ row.label }}</span>
                    <span class="text-mono-caption text-muted-foreground">
                        accent="{{ row.accent }}"
                    </span>
                </div>
            </div>
        </section>

        <!-- Mega showcase -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">mega · accent="section-5"</p>
            <div
                class="flex items-center gap-[var(--space-phi-4)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <IconStamp accent="section-5" frame="stamp" size="mega">
                    <Sparkles class="h-full w-full" :stroke-width="1.5" />
                </IconStamp>
                <div class="flex flex-col gap-2">
                    <DisplayHero size="display-3" variation="wonk">
                        Empty state, lit.
                    </DisplayHero>
                    <p class="text-prose max-w-prose text-foreground/80">
                        Stamp + mega + amber accent = a glyph that holds its own next to
                        a display heading. Compose this with
                        <code class="fira-code">&lt;DisplayHero&gt;</code> for any hero
                        slot that needs more than a 24px chevron.
                    </p>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
