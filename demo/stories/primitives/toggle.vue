<script setup lang="ts">
import { ref } from "vue";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-vue-next";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleChip } from "@/components/custom/toggle-chip";

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
const cell = ref<string>("warm");
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · toggle</p>
            <h1 class="text-title text-foreground">Toggle · Toggle Group · Chip</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Boolean and grouped selectors. <code class="font-mono-code">Toggle</code>
                is a single pressable button; <code class="font-mono-code">ToggleGroup</code>
                bundles multiple under a shared <code class="font-mono-code">type</code>
                (single / multiple); <code class="font-mono-code">ToggleChip</code> is
                a slimmer chip / cell variant for filters and pickers.
            </p>
        </header>

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
        <section class="flex flex-col gap-3">
            <p class="section-label">toggle-chip · chip variant</p>
            <div class="flex flex-wrap items-center gap-2">
                <ToggleChip
                    v-for="key in filterKeys"
                    :key="key"
                    v-model:pressed="filters[key]"
                    variant="chip"
                >
                    {{ key }}
                </ToggleChip>
            </div>
        </section>

        <!-- ToggleChip: cell variant — icon + label. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">toggle-chip · cell variant</p>
            <div class="flex flex-wrap items-stretch gap-3">
                <ToggleChip
                    v-for="opt in ['warm', 'cool', 'mono'] as const"
                    :key="opt"
                    :pressed="cell === opt"
                    variant="cell"
                    class="w-24"
                    @update:pressed="cell = opt"
                >
                    <span class="h-6 w-6 rounded-full bg-viz-fourier" />
                    <span class="capitalize">{{ opt }}</span>
                </ToggleChip>
            </div>
            <p class="text-mono-caption text-muted-foreground">cell · {{ cell }}</p>
        </section>
    </article>
</template>
