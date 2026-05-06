<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";
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
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

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
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-2">
                Filter, group, choose
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                A glass-pill anchor over a grouped, filterable list — basis functions and palette
                tokens cohabit, separated only by section heading.
            </p>
            <FlourishDivider tone="section-4" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <section class="flex flex-col gap-3 max-w-sm">
            <Label for="cbx" :style="{ color: 'var(--section-color-4)' }">Basis or palette</Label>
            <Combobox v-model="selected" by="value">
                <ComboboxAnchor class="w-full">
                    <ComboboxTrigger as-child>
                        <button
                            id="cbx"
                            type="button"
                            class="glass-subtle focus-visible:shadow-[var(--focus-ring-shadow)] flex h-10 w-full items-center justify-between rounded-full px-3 py-2 text-sm outline-none"
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
                selected ·
                <span :style="{ color: 'var(--section-color-4)' }">{{ selected || "—" }}</span>
            </p>
        </section>
    </StoryPage>
</template>
