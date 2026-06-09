<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "../../../src/components/ui/select";
import { Label } from "../../../src/components/ui/label";

const font = ref<string>("plus-jakarta-sans");
const basis = ref<string>("fourier");
const density = ref<string>("");
</script>

<template>
    <StoryPage>
        <!-- Grouped items with labels + separator. -->
        <section class="flex flex-col gap-3 max-w-sm">
            <Label for="sel-font">Font family</Label>
            <Select v-model="font">
                <SelectTrigger id="sel-font">
                    <SelectValue placeholder="Choose a typeface" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Display + serif</SelectLabel>
                        <SelectItem value="plus-jakarta-sans">Plus Jakarta Sans</SelectItem>
                        <SelectItem value="plus-jakarta-sans-fallback">Plus Jakarta Sans Fallback</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                        <SelectLabel>Sans</SelectLabel>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="system-ui">System UI</SelectItem>
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
        </section>

        <!-- Viz-basis select: items inherit fourier/chebyshev/legendre dots. -->
        <section class="flex flex-col gap-3 max-w-sm">
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
        </section>

        <!-- Disabled item inside an otherwise normal select. -->
        <section class="flex flex-col gap-3 max-w-sm">
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
        </section>
    </StoryPage>
</template>
