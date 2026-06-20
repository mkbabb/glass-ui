<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Check, ChevronsUpDown } from "@lucide/vue";
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
} from "../../../src/components/ui/combobox";
import { Label } from "../../../src/components/ui/label";


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
    </StoryPage>
</template>
