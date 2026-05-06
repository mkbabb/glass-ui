<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, ref } from "vue";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ToggleRight,
} from "lucide-vue-next";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleChip } from "@/components/custom/toggle-chip";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";

const bold = ref<boolean>(false);
const marks = ref<string[]>(["bold"]);
const align = ref<string>("left");
const filters = ref<{ fourier: boolean; chebyshev: boolean; legendre: boolean }>({
    fourier: true,
    chebyshev: false,
    legendre: false,
});
type FilterKey = keyof typeof filters.value;
const filterKeys: FilterKey[] = ["fourier", "chebyshev", "legendre"];
const selectedFilters = computed(() => filterKeys.filter((key) => filters.value[key]));
const cell = ref<string>("warm");
</script>

<template>
    <StoryPage>
        <!-- Hero — section-2. The toggle is the smallest commitment. -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-40"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 65% 55% at 88% 18%, color-mix(in srgb, var(--section-color-2) 38%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 75% 60% at 12% 88%, var(--rainbow-pastel-green) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-2)' }">
                    primitives · toggle · § 2
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-2" aria-hidden="true">
                        <ToggleRight />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-3"
                            variation="wonk"
                            class="leading-[0.95]"
                            :style="{ color: 'var(--section-color-2)' }"
                        >
                            On, or otherwise.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            Four idioms on one binary axis: solo
                            <code class="fira-code">&lt;Toggle&gt;</code>; group as
                            <code class="fira-code">multiple</code> (marks) or
                            <code class="fira-code">single</code> (alignment); chip
                            and cell variants for filter rails and segmented pickers.
                            One contract — pressed / not pressed — many shapes.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-2" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <!-- Single toggle. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">single toggle</p>
            <div class="flex items-center gap-4">
                <Toggle v-model:pressed="bold" aria-label="Bold">
                    <Bold class="h-4 w-4" />
                </Toggle>
                <span class="text-mono-caption text-muted-foreground">
                    pressed · {{ bold }}
                </span>
            </div>
        </section>

        <!-- ToggleGroup type=multiple. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">toggle-group · multiple</p>
            <ToggleGroup v-model="marks" type="multiple" variant="outline">
                <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline class="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-caption text-muted-foreground">
                marks · [{{ marks.join(", ") }}]
            </p>
        </section>

        <!-- ToggleGroup type=single. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">toggle-group · single</p>
            <ToggleGroup v-model="align" type="single">
                <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight class="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-caption text-muted-foreground">align · {{ align }}</p>
        </section>

        <!-- ToggleChip: chip variant. -->
        <section class="flex flex-col gap-3" data-testid="toggle-chip-chip-section">
            <p class="section-label">toggle-chip · chip variant</p>
            <div class="flex flex-wrap items-center gap-2">
                <ToggleChip
                    v-for="key in filterKeys"
                    :key="key"
                    v-model="filters[key]"
                    variant="chip"
                    :aria-label="`Toggle ${key} filter`"
                    :data-testid="`toggle-chip-chip-${key}`"
                    data-toggle-chip-variant="chip"
                >
                    {{ key }}
                </ToggleChip>
            </div>
            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="toggle-chip-chip-state"
            >
                chip filters · [{{ selectedFilters.join(", ") || "none" }}]
            </p>
        </section>

        <!-- ToggleChip: cell variant — icon + label. -->
        <section class="flex flex-col gap-3" data-testid="toggle-chip-cell-section">
            <p class="section-label">toggle-chip · cell variant</p>
            <div class="flex flex-wrap items-stretch gap-3">
                <ToggleChip
                    v-for="opt in ['warm', 'cool', 'mono'] as const"
                    :key="opt"
                    :model-value="cell === opt"
                    variant="cell"
                    class="w-24"
                    :aria-label="`Select ${opt} palette`"
                    :data-testid="`toggle-chip-cell-${opt}`"
                    data-toggle-chip-variant="cell"
                    @update:model-value="cell = opt"
                >
                    <span class="h-6 w-6 rounded-full bg-viz-fourier" />
                    <span class="capitalize">{{ opt }}</span>
                </ToggleChip>
            </div>
            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="toggle-chip-cell-state"
            >
                cell · {{ cell }}
            </p>
        </section>
    </StoryPage>
</template>
