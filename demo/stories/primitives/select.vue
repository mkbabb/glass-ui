<script setup lang="ts">
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
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const font = ref<string>("computer-modern");
const basis = ref<string>("fourier");
const density = ref<string>("");
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · select</p>
            <h1 class="text-title text-foreground">Select</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Glass pill trigger, portaled glass-elevated content, grouped items with
                section labels and separators. Compound of
                <code class="font-mono-code">Select</code> · <code class="font-mono-code">Trigger</code> ·
                <code class="font-mono-code">Value</code> · <code class="font-mono-code">Content</code> ·
                <code class="font-mono-code">Group</code> · <code class="font-mono-code">Label</code> ·
                <code class="font-mono-code">Item</code>.
            </p>
        </header>

        <!-- Grouped items with labels + separator. -->
        <section class="flex flex-col gap-3 max-w-sm">
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
    </article>
</template>
