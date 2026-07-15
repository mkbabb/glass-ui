<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { computed, ref } from "vue";
import { Check, ChevronsUpDown, Search, X } from "@lucide/vue";
import {
    Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger,
} from "@glass/components/combobox";
import { Label } from "@glass/components/label";
import { IconChip } from "@glass/components/icon-chip";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// identity (the cool stop). PH3-safe (inline borderLeft, not the
// border-l-[3px] + <IconChip> double-header shape).
const FORMS_STOP = 3;

interface Option {
    value: string;
    label: string;
    group: "basis" | "palette";
}

const options: Option[] = [
    { value: "fourier", label: "Fourier", group: "basis" },
    { value: "chebyshev", label: "Chebyshev", group: "basis" },
    { value: "legendre", label: "Legendre", group: "basis" },
    { value: "hermite", label: "Hermite", group: "basis" },
    { value: "laguerre", label: "Laguerre", group: "basis" },
    { value: "cream", label: "Warm cream", group: "palette" },
    { value: "rose", label: "Dusty rose", group: "palette" },
    { value: "sage", label: "Sage", group: "palette" },
];

const selected = ref<string>("");

// BI.W-MULTISELECT-FOLD — the multi-select story folds HERE. `<Combobox multiple>`
// is the multi-select mechanism: an array v-model + chips-in-trigger rendered via
// the shared glass-chip capsule register (the TagsInput chip register), read from
// the root's forwarded `modelValue` slot state.
const selectedMulti = ref<string[]>(["fourier", "chebyshev"]);

const labelFor = (value: string) =>
    options.find((o) => o.value === value)?.label ?? value;

const removeValue = (value: string) => {
    selectedMulti.value = selectedMulti.value.filter((v) => v !== value);
};

const summary = computed(() => selectedMulti.value.map(labelFor).join(", "));
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
            <IconChip :icon="Search" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Combobox
                </span>
                <p class="text-small text-muted-foreground">
                    Type-ahead filtered selection — single or
                    <code class="text-mono-caption">multiple</code> — the section
                    identity is the ONE color event.
                </p>
            </div>
        </header>

        <section class="flex flex-col gap-3 max-w-sm">
            <Label for="cbx">Basis or palette</Label>
            <Combobox v-model="selected" by="value">
                <ComboboxAnchor class="w-full">
                    <ComboboxTrigger as-child>
                        <button
                            id="cbx"
                            type="button"
                            class="glass-wash focus-ring flex h-10 w-full items-center justify-between rounded-full px-3 py-2 text-sm outline-none"
                        >
                            <span class="truncate">
                                {{
                                    selected
                                        ? options.find((o) => o.value === selected)?.label
                                        : "Pick one"
                                }}
                            </span>
                            <ChevronsUpDown
                                class="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                        </button>
                    </ComboboxTrigger>
                </ComboboxAnchor>

                <ComboboxList class="w-[var(--reka-combobox-anchor-width)]">
                    <ComboboxInput placeholder="Filter..." />
                    <ComboboxEmpty>Nothing matched.</ComboboxEmpty>

                    <ComboboxGroup heading="Basis">
                        <ComboboxItem
                            v-for="o in options.filter((x) => x.group === 'basis')"
                            :key="o.value"
                            :value="o.value"
                        >
                            {{ o.label }}
                            <ComboboxItemIndicator class="ml-auto">
                                <Check class="h-4 w-4" />
                            </ComboboxItemIndicator>
                        </ComboboxItem>
                    </ComboboxGroup>

                    <ComboboxGroup heading="Palette">
                        <ComboboxItem
                            v-for="o in options.filter((x) => x.group === 'palette')"
                            :key="o.value"
                            :value="o.value"
                        >
                            {{ o.label }}
                            <ComboboxItemIndicator class="ml-auto">
                                <Check class="h-4 w-4" />
                            </ComboboxItemIndicator>
                        </ComboboxItem>
                    </ComboboxGroup>
                </ComboboxList>
            </Combobox>
            <p class="text-mono-caption text-muted-foreground">
                selected · {{ selected || "—" }}
            </p>
        </section>

        <!-- BI.W-MULTISELECT-FOLD — the multiple arm (was ui/multi-select). The
             selected values render as chips-in-trigger on the glass-chip capsule
             register; the trigger opens the same filtered list. -->
        <section class="flex flex-col gap-3 max-w-sm">
            <Label id="cbxm-label">Bases · multiple</Label>
            <Combobox v-model="selectedMulti" multiple>
                <template #default="{ modelValue }">
                    <ComboboxAnchor class="w-full">
                        <div
                            class="flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-input border border-(--control-surface-border) bg-(--control-surface-bg) [backdrop-filter:var(--control-surface-blur)] px-2 py-1.5"
                        >
                            <span
                                v-for="v in (modelValue as string[])"
                                :key="v"
                                class="glass-chip glass-capsule glass-capsule-hover flex h-6 items-center gap-1 pl-2.5 pr-1 text-caption"
                            >
                                {{ labelFor(v) }}
                                <button
                                    type="button"
                                    class="focus-ring relative touch-hit-area flex size-4 items-center justify-center rounded-full opacity-70 hover:opacity-100"
                                    :aria-label="`Remove ${labelFor(v)}`"
                                    @click.stop="removeValue(v)"
                                >
                                    <X class="size-3" />
                                </button>
                            </span>
                            <ComboboxTrigger as-child>
                                <button
                                    type="button"
                                    aria-labelledby="cbxm-label"
                                    class="focus-ring ml-auto inline-flex h-6 items-center gap-1 rounded-full px-2 text-sm outline-none"
                                >
                                    <span
                                        v-if="!(modelValue as string[]).length"
                                        class="text-muted-foreground"
                                    >
                                        Pick one or more…
                                    </span>
                                    <ChevronsUpDown
                                        class="size-4 shrink-0 opacity-50"
                                    />
                                </button>
                            </ComboboxTrigger>
                        </div>
                    </ComboboxAnchor>

                    <ComboboxList class="w-[var(--reka-combobox-anchor-width)]">
                        <ComboboxInput placeholder="Filter..." />
                        <ComboboxEmpty>Nothing matched.</ComboboxEmpty>

                        <ComboboxGroup heading="Basis">
                            <ComboboxItem
                                v-for="o in options.filter((x) => x.group === 'basis')"
                                :key="o.value"
                                :value="o.value"
                            >
                                {{ o.label }}
                                <ComboboxItemIndicator class="ml-auto">
                                    <Check class="h-4 w-4" />
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>

                        <ComboboxGroup heading="Palette">
                            <ComboboxItem
                                v-for="o in options.filter((x) => x.group === 'palette')"
                                :key="o.value"
                                :value="o.value"
                            >
                                {{ o.label }}
                                <ComboboxItemIndicator class="ml-auto">
                                    <Check class="h-4 w-4" />
                                </ComboboxItemIndicator>
                            </ComboboxItem>
                        </ComboboxGroup>
                    </ComboboxList>
                </template>
            </Combobox>
            <p class="text-mono-caption text-muted-foreground">
                {{ selectedMulti.length }} selected · [{{ summary || "—" }}]
            </p>
        </section>
    </StoryPage>
</template>
