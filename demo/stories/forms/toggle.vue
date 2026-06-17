<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, ref } from "vue";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, ToggleLeft } from "@lucide/vue";
import { Toggle } from "../../../src/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../../src/components/ui/toggle-group";
import { ToggleChip } from "../../../src/components/custom/toggle-chip";
import { IconChip } from "../../../src/components/custom/icon-chip";
// BA.W-SUFFUSE2 — the forms band's ONE coherent --section-color-3 teal identity.
const FORMS_STOP = 3;

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
        <!-- BA.W-SUFFUSE2 — the forms-band identity event family on --section-color-3. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ToggleLeft" :section="FORMS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Toggles
                </span>
                <p class="text-small text-muted-foreground">
                    On/off and grouped toggles — the control glyphs stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <!-- Single toggle. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">single toggle</p>
            <div class="flex items-center gap-4">
                <Toggle v-model="bold" aria-label="Bold">
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
