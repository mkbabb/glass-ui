<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";

const font = ref<string>("computer-modern");
const basis = ref<string>("fourier");
const density = ref<string>("");
</script>

<template>
    <StoryPage>
        <!-- Hero — section-11. The disclosure is the gesture. -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-40"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 60% 50% at 88% 18%, color-mix(in srgb, var(--section-color-11) 40%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 75% 60% at 12% 90%, var(--rainbow-pastel-blue) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-11)' }">
                    primitives · select · § 11
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-11" aria-hidden="true">
                        <ChevronDown />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-3"
                            variation="wonk"
                            class="leading-[0.95]"
                            :style="{ color: 'var(--section-color-11)' }"
                        >
                            One slot, many shelves.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            A select is a closet — one slot at the top, organized
                            shelves underneath. Group, label, separate, disable; the
                            content panel carries the structure. The trigger commits to
                            a single value with the chassis quiet behind it.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-11" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <section class="grid grid-cols-1 gap-[var(--space-phi-4)] md:grid-cols-3">
            <!-- Grouped items with labels + separator. -->
            <div class="flex flex-col gap-3">
                <Label for="sel-font">Font family</Label>
                <Select v-model="font">
                    <SelectTrigger id="sel-font">
                        <SelectValue placeholder="Choose a typeface" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Serif</SelectLabel>
                            <SelectItem value="computer-modern">Computer Modern</SelectItem>
                            <SelectItem value="fraunces">Fraunces</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                            <SelectLabel>Sans</SelectLabel>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="general-sans">General Sans</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                            <SelectLabel>Mono</SelectLabel>
                            <SelectItem value="fira-code">Fira Code</SelectItem>
                            <SelectItem value="jetbrains-mono">JetBrains Mono</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p class="text-mono-caption text-muted-foreground">
                    selected · {{ font }}
                </p>
            </div>

            <!-- Viz-basis select: items inherit fourier/chebyshev/legendre dots. -->
            <div class="flex flex-col gap-3">
                <Label for="sel-basis">Orthogonal basis</Label>
                <Select v-model="basis">
                    <SelectTrigger id="sel-basis">
                        <SelectValue placeholder="Pick a basis" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value="fourier"
                            :style="{ '--select-dot-color': 'var(--viz-fourier)' }"
                        >
                            Fourier
                        </SelectItem>
                        <SelectItem
                            value="chebyshev"
                            :style="{ '--select-dot-color': 'var(--viz-chebyshev)' }"
                        >
                            Chebyshev
                        </SelectItem>
                        <SelectItem
                            value="legendre"
                            :style="{ '--select-dot-color': 'var(--viz-legendre)' }"
                        >
                            Legendre
                        </SelectItem>
                    </SelectContent>
                </Select>
                <p class="text-mono-caption text-muted-foreground">basis · {{ basis }}</p>
            </div>

            <!-- Disabled item inside an otherwise normal select. -->
            <div class="flex flex-col gap-3">
                <Label for="sel-density">Density</Label>
                <Select v-model="density">
                    <SelectTrigger id="sel-density">
                        <SelectValue placeholder="Pick a density" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cozy">Cozy</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="brutalist" disabled>
                            Brutalist (coming soon)
                        </SelectItem>
                    </SelectContent>
                </Select>
                <p class="text-mono-caption text-muted-foreground">
                    density · {{ density || "—" }}
                </p>
            </div>
        </section>
    </StoryPage>
</template>
