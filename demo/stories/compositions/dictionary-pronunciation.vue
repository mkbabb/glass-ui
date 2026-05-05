<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Card } from "@/components/ui/card";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
import { Volume2, BookOpen } from "lucide-vue-next";

interface Syllable {
    glyph: string;
    stress: "primary" | "secondary" | "none";
    accent: string;
}

const word = "halcyon";
const ipa = "/ˈhælsiən/";
const partOfSpeech = "adjective · noun";

const syllables: Syllable[] = [
    { glyph: "hal", stress: "primary",   accent: "var(--section-color-0)" },
    { glyph: "ci",  stress: "none",      accent: "var(--section-color-3)" },
    { glyph: "on",  stress: "secondary", accent: "var(--section-color-7)" },
];

const FVS_DISPLAY_3 = `'WONK' 1, 'SOFT' 75, 'wdth' 108`;
</script>

<template>
    <StoryPage>
        <Card variant="cream" class="relative overflow-hidden">
            <!-- Header — eyebrow + IPA in mono small -->
            <header class="flex items-start justify-between gap-[var(--space-phi-2)]">
                <div>
                    <p class="section-label">entry · halcyon</p>
                    <DisplayHero
                        size="display-mega"
                        variation="wonk"
                        class="mt-[var(--space-phi-1)]"
                    >
                        {{ word }}
                    </DisplayHero>
                    <p
                        class="text-mono-small mt-[var(--space-phi-1)] tracking-tight"
                        :style="{ color: 'var(--section-color-3)' }"
                    >
                        {{ ipa }} · <span class="italic">{{ partOfSpeech }}</span>
                    </p>
                </div>
                <button
                    type="button"
                    class="inline-flex shrink-0"
                    aria-label="Pronounce halcyon"
                >
                    <IconStamp size="2xl" frame="stamp" accent="section-3">
                        <Volume2 aria-hidden="true" />
                    </IconStamp>
                </button>
            </header>

            <FlourishDivider tone="section-3" class="my-[var(--space-phi-3)]" />

            <!-- Pronunciation section · section-label divider + stacked syllables -->
            <section class="flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label">Pronunciation</p>
                <ul class="flex flex-col gap-[var(--space-phi-2)]">
                    <li
                        v-for="(syl, i) in syllables"
                        :key="syl.glyph"
                        class="grid grid-cols-[auto_1fr_auto] items-center gap-[var(--space-phi-3)] rounded-[var(--radius-2xl)] border-2 border-border p-[var(--space-phi-2)]"
                        :style="{
                            background: 'color-mix(in srgb, var(--cream-warm) 60%, transparent)',
                            borderColor: syl.stress === 'primary' ? syl.accent : 'var(--border)',
                        }"
                    >
                        <span class="text-mono-caption text-muted-foreground tabular-nums">
                            {{ String(i + 1).padStart(2, '0') }}
                        </span>
                        <span
                            class="text-display-3"
                            :style="{
                                color: syl.accent,
                                fontVariationSettings: FVS_DISPLAY_3,
                            }"
                        >
                            {{ syl.glyph }}
                        </span>
                        <span
                            class="text-mono-caption uppercase tracking-wider"
                            :style="{ color: syl.accent }"
                        >
                            {{
                                syl.stress === "primary"
                                    ? "ˈ primary"
                                    : syl.stress === "secondary"
                                      ? "ˌ secondary"
                                      : "· unstressed"
                            }}
                        </span>
                    </li>
                </ul>
            </section>

            <FlourishDivider tone="section-3" class="my-[var(--space-phi-3)]" />

            <!-- Example sentence in a dashed well -->
            <section class="flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label">Usage</p>
                <div class="well-dashed">
                    <div class="flex items-start gap-[var(--space-phi-2)]">
                        <IconStamp size="md" frame="emboss" accent="section-7">
                            <BookOpen aria-hidden="true" />
                        </IconStamp>
                        <div class="flex flex-col gap-[var(--space-phi-1)]">
                            <p class="text-prose italic text-foreground/85">
                                “The fleet sailed through
                                <span
                                    class="font-display italic"
                                    :style="{
                                        color: 'var(--section-color-3)',
                                        fontVariationSettings: FVS_DISPLAY_3,
                                    }"
                                >halcyon</span>
                                weeks of unbroken sun, and even the gulls forgot how to grieve.”
                            </p>
                            <p class="text-mono-caption text-muted-foreground">
                                — apocryphal, c. 1908
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <FlourishDivider tone="section-3" class="my-[var(--space-phi-3)]" />

            <!-- Definition strip -->
            <section class="grid gap-[var(--space-phi-2)]">
                <p class="section-label">Definition</p>
                <CreamSurface tone="cool">
                    <ol class="flex flex-col gap-[var(--space-phi-2)]">
                        <li class="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-phi-2)]">
                            <span class="text-mono-caption text-muted-foreground tabular-nums">
                                01.
                            </span>
                            <p class="text-prose text-foreground/90">
                                Denoting a period of time in the past that was idyllically happy and
                                peaceful.
                            </p>
                        </li>
                        <li class="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-phi-2)]">
                            <span class="text-mono-caption text-muted-foreground tabular-nums">
                                02.
                            </span>
                            <p class="text-prose text-foreground/90">
                                A mythical bird, sometimes identified with the kingfisher, said to
                                breed in a nest floating at sea at the winter solstice, charming the
                                wind and waves into calm.
                            </p>
                        </li>
                    </ol>
                </CreamSurface>
            </section>
        </Card>
    </StoryPage>
</template>
