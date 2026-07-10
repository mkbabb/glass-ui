<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import { MultiSelect, type MultiSelectOption } from "@glass/components/ui/multi-select";
import { Label } from "@glass/components/ui/label";
import { IconChip } from "@glass/components/custom/icon-chip";
import { ListChecks } from "@lucide/vue";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// identity (the cool stop). PH3-safe (inline borderLeft, not the
// border-l-[3px] + <IconChip> double-header shape).
const FORMS_STOP = 3;

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
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ListChecks" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Multi-select
                </span>
                <p class="text-small text-muted-foreground">
                    Multiple-choice tag selection — the section identity is the
                    ONE color event.
                </p>
            </div>
        </header>

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
