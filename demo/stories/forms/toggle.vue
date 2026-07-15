<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, defineAsyncComponent, ref } from "vue";
import FamilyTabs, { type FamilyMember } from "../../chassis/family/FamilyTabs.vue";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, ToggleRight } from "@lucide/vue";
import { Toggle } from "@glass/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import { Chip } from "@glass/components/chip";
import { IconChip } from "@glass/components/icon-chip";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// identity (the cool stop). PH3-safe (inline borderLeft, not the
// border-l-[3px] + <IconChip> double-header shape).
const FORMS_STOP = 3;

// BG.W-DEMO-IA-REDESIGN — the Forms TOGGLES family. The chip toggles (toggle-chip,
// selectable-chip) collapse onto this ONE toggles page as members (bare,
// STORY_NESTED_KEY) via the switcher below.
const familyMembers: FamilyMember[] = [
    {
        id: "toggle-chip",
        label: "Toggle chip",
        component: defineAsyncComponent(() => import("./toggle-chip.vue")),
    },
    {
        id: "selectable-chip",
        label: "Selectable chip",
        component: defineAsyncComponent(() => import("./selectable-chip.vue")),
    },
];

const bold = ref<boolean>(false);
const marks = ref<string[]>(["bold"]);
const align = ref<string>("left");
const density = ref<string>("comfortable");
const densityOptions = ["Compact", "Comfortable", "Spacious", "Touch", "Presentation"];
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
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ToggleRight" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Toggle
                </span>
                <p class="text-small text-muted-foreground">
                    On/off and grouped toggles — the section identity is the ONE
                    color event.
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

        <StorySection
            heading="Narrow horizontal strip"
            blurb="Safe centering keeps the strip balanced when it fits and leaves both scroll edges reachable when it overflows."
        >
            <ToggleGroup
                v-model="density"
                type="single"
                class="w-56 max-w-full overflow-x-auto"
                aria-label="Interface density"
            >
                <ToggleGroupItem
                    v-for="option in densityOptions"
                    :key="option"
                    :value="option.toLowerCase()"
                    class="shrink-0 whitespace-nowrap"
                >
                    {{ option }}
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-caption text-muted-foreground">
                density · {{ density }}
            </p>
        </StorySection>

        <!-- Chip: pill shape. -->
        <section class="flex flex-col gap-3" data-testid="toggle-chip-chip-section">
            <p class="section-label">chip · pill shape</p>
            <div class="flex flex-wrap items-center gap-2">
                <Chip
                    v-for="key in filterKeys"
                    :key="key"
                    v-model="filters[key]"
                    shape="pill"
                    :aria-label="`Toggle ${key} filter`"
                    :data-testid="`toggle-chip-chip-${key}`"
                    data-toggle-chip-variant="chip"
                >
                    {{ key }}
                </Chip>
            </div>
            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="toggle-chip-chip-state"
            >
                chip filters · [{{ selectedFilters.join(", ") || "none" }}]
            </p>
        </section>

        <!-- Chip: cell shape — icon + label. -->
        <section class="flex flex-col gap-3" data-testid="toggle-chip-cell-section">
            <p class="section-label">chip · cell shape</p>
            <div class="flex flex-wrap items-stretch gap-3">
                <Chip
                    v-for="opt in ['warm', 'cool', 'mono'] as const"
                    :key="opt"
                    :model-value="cell === opt"
                    shape="cell"
                    class="w-24"
                    :aria-label="`Select ${opt} palette`"
                    :data-testid="`toggle-chip-cell-${opt}`"
                    data-toggle-chip-variant="cell"
                    @update:model-value="cell = opt"
                >
                    <span class="h-6 w-6 rounded-full bg-viz-fourier" />
                    <span class="capitalize">{{ opt }}</span>
                </Chip>
            </div>
            <p
                class="text-mono-caption text-muted-foreground"
                data-testid="toggle-chip-cell-state"
            >
                cell · {{ cell }}
            </p>
        </section>
        <StorySection heading="The chip toggles">
            <FamilyTabs :members="familyMembers" aria-label="Toggle family" />
        </StorySection>
    </StoryPage>
</template>
