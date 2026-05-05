<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { Frown, Meh, Smile, Heart, Cloud, Sun, Snowflake, Flame } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

interface MoodOption {
    value: string;
    label: string;
    icon: typeof Smile;
    color: string;
}

const moodOptions: MoodOption[] = [
    {
        value: "great",
        label: "Great",
        icon: Heart,
        color: "var(--section-color-0)",
    },
    {
        value: "good",
        label: "Good",
        icon: Smile,
        color: "var(--section-color-5)",
    },
    {
        value: "ok",
        label: "OK",
        icon: Meh,
        color: "var(--section-color-3)",
    },
    {
        value: "rough",
        label: "Rough",
        icon: Frown,
        color: "var(--section-color-9)",
    },
];

interface WeatherOption {
    value: string;
    label: string;
    icon: typeof Sun;
}

const weatherOptions: WeatherOption[] = [
    { value: "sun", label: "Sunny", icon: Sun },
    { value: "cloud", label: "Cloudy", icon: Cloud },
    { value: "snow", label: "Snow", icon: Snowflake },
    { value: "fire", label: "Hot", icon: Flame },
];

const mood = ref<string>("good");
const weather = ref<string>("sun");
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">&lt;ToggleGroupItem variant="card"&gt;</p>
            <DisplayHero size="display-mega" variation="wonk" class="mt-2 mb-3">
                Pick one, big.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Card-toggles are the survey-grade input — a glyph, a label, a
                cartoon-sm shadow on selection. Bigger than a chip, smaller than a
                radio, made for "How are you feeling?" and onboarding pickers.
            </p>
            <FlourishDivider tone="rainbow" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- The mood survey -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">survey · "How are you feeling?"</p>
            <CreamSurface tone="cool">
                <DisplayHero size="display-3" variation="wonk" class="mb-2">
                    How are you feeling?
                </DisplayHero>
                <p class="text-small mb-[var(--space-phi-3)] text-foreground/70">
                    Pick one. We won't tell anyone.
                </p>
                <ToggleGroup
                    v-model="mood"
                    type="single"
                    variant="card"
                    class="!grid !gap-[var(--space-phi-2)] sm:!grid-cols-4"
                >
                    <ToggleGroupItem
                        v-for="opt in moodOptions"
                        :key="opt.value"
                        :value="opt.value"
                        :aria-label="opt.label"
                        class="!h-auto !min-h-32 !w-full !flex-col !gap-2 !p-[var(--space-phi-3)]"
                    >
                        <component
                            :is="opt.icon"
                            :size="40"
                            :stroke-width="1.5"
                            :style="{ color: opt.color }"
                        />
                        <span class="text-subheading">{{ opt.label }}</span>
                    </ToggleGroupItem>
                </ToggleGroup>
                <p
                    class="text-mono-caption mt-[var(--space-phi-3)] text-muted-foreground"
                >
                    selected · <code class="fira-code">{{ mood || "—" }}</code>
                </p>
            </CreamSurface>
        </section>

        <!-- Weather picker -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <p class="section-label">survey · "Weather where you are?"</p>
            <CreamSurface>
                <DisplayHero size="display-3" variation="wonk" class="mb-2">
                    What's the weather?
                </DisplayHero>
                <ToggleGroup
                    v-model="weather"
                    type="single"
                    variant="card"
                    class="!grid !gap-[var(--space-phi-2)] sm:!grid-cols-4"
                >
                    <ToggleGroupItem
                        v-for="opt in weatherOptions"
                        :key="opt.value"
                        :value="opt.value"
                        :aria-label="opt.label"
                        class="!h-auto !min-h-28 !w-full !flex-col !gap-2 !p-[var(--space-phi-3)]"
                    >
                        <component
                            :is="opt.icon"
                            :size="36"
                            :stroke-width="1.5"
                        />
                        <span class="text-small">{{ opt.label }}</span>
                    </ToggleGroupItem>
                </ToggleGroup>
                <p
                    class="text-mono-caption mt-[var(--space-phi-3)] text-muted-foreground"
                >
                    selected · <code class="fira-code">{{ weather || "—" }}</code>
                </p>
            </CreamSurface>
        </section>

        <!-- States -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">states · idle / hover / on / disabled</p>
            <div
                class="flex flex-wrap gap-[var(--space-phi-2)] rounded-2xl border border-border bg-card p-[var(--space-phi-4)] shadow-cartoon"
            >
                <ToggleGroup type="single" variant="card">
                    <ToggleGroupItem
                        value="idle"
                        class="!h-auto !flex-col !gap-2 !p-[var(--space-phi-3)]"
                    >
                        <Smile :size="28" :stroke-width="1.5" />
                        <span class="text-mono-caption">idle</span>
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" :default-value="'on'" variant="card">
                    <ToggleGroupItem
                        value="on"
                        class="!h-auto !flex-col !gap-2 !p-[var(--space-phi-3)]"
                    >
                        <Heart :size="28" :stroke-width="1.5" style="color: var(--section-color-0)" />
                        <span class="text-mono-caption">on</span>
                    </ToggleGroupItem>
                </ToggleGroup>
                <ToggleGroup type="single" variant="card">
                    <ToggleGroupItem
                        value="disabled"
                        disabled
                        class="!h-auto !flex-col !gap-2 !p-[var(--space-phi-3)]"
                    >
                        <Frown :size="28" :stroke-width="1.5" />
                        <span class="text-mono-caption">disabled</span>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </section>
    </StoryPage>
</template>
