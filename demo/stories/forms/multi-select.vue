<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { MultiSelect, type MultiSelectOption } from "../../../src/components/ui/multi-select";
import { Label } from "../../../src/components/ui/label";


const bases: MultiSelectOption[] = [
    { value: "fourier", label: "Fourier" },
    { value: "chebyshev", label: "Chebyshev" },
    { value: "legendre", label: "Legendre" },
    { value: "hermite", label: "Hermite" },
    { value: "laguerre", label: "Laguerre" },
    { value: "bessel", label: "Bessel" },
];

const tools: MultiSelectOption[] = [
    { value: "vue", label: "Vue 3.5" },
    { value: "reka", label: "reka-ui" },
    { value: "tailwind", label: "Tailwind v4" },
    { value: "vite", label: "Vite" },
    { value: "cva", label: "class-variance-authority" },
];

const selectedBases = ref<string[]>(["fourier", "chebyshev"]);
const selectedTools = ref<string[]>([]);
const lockedTools = ref<string[]>(["vue", "tailwind"]);
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3 max-w-sm">
            <Label>Bases</Label>
            <MultiSelect
                v-model="selectedBases"
                :options="bases"
                placeholder="Pick one or more..."
            />
            <p class="text-mono-caption text-muted-foreground">
                {{ selectedBases.length }} selected
            </p>
        </section>

        <section class="flex flex-col gap-3 max-w-sm">
            <Label>Stack (unbounded)</Label>
            <MultiSelect
                v-model="selectedTools"
                :options="tools"
                :max-display="2"
                placeholder="Pick tools..."
            />
            <p class="text-mono-caption text-muted-foreground">
                maxDisplay · 2 — overflows collapse into (+N)
            </p>
        </section>

        <section class="flex flex-col gap-3 max-w-sm">
            <Label>Disabled</Label>
            <MultiSelect
                v-model="lockedTools"
                :options="tools"
                disabled
                placeholder="Locked"
            />
            <p class="text-mono-caption text-muted-foreground">Non-interactive</p>
        </section>

        <!-- Summary block: echo current selections. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">model summary</p>
            <div
                class="grid grid-cols-1 gap-4 rounded-card border border-border bg-card p-5 sm:grid-cols-2"
            >
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">bases</span>
                    <span class="text-small text-foreground font-mono">
                        [{{ selectedBases.join(", ") || "—" }}]
                    </span>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">stack</span>
                    <span class="text-small text-foreground font-mono">
                        [{{ selectedTools.join(", ") || "—" }}]
                    </span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
