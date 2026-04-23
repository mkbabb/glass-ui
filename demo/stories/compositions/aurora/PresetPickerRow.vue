<script setup lang="ts">
import { computed, ref } from "vue";
import { cn } from "@/utils/cn";
import { BouncyTabs } from "@/components/custom/tabs";
import type { AuroraMedium } from "@/components/custom/aurora";
import { PRESET_KEYS, PRESET_META, type PresetKey } from "./presets";

const props = defineProps<{
    current: PresetKey;
    thumbs: Record<PresetKey, string>;
}>();

const emit = defineEmits<{
    (e: "select", key: PresetKey): void;
}>();

type Filter = "all" | AuroraMedium;
const filter = ref<Filter>("all");

const filterOptions = [
    { label: "All", value: "all" },
    { label: "Smooth", value: "smooth" },
    { label: "Watercolor", value: "watercolor" },
    { label: "Pastel", value: "pastel" },
    { label: "Oil", value: "oil" },
] as const;

const visibleKeys = computed<PresetKey[]>(() =>
    PRESET_KEYS.filter((k) =>
        filter.value === "all" ? true : PRESET_META[k].medium === filter.value,
    ),
);

function onPick(key: PresetKey) {
    emit("select", key);
}

function onKey(e: KeyboardEvent, key: PresetKey) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPick(key);
    }
}
</script>

<template>
    <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between gap-4">
            <p class="text-admin-label text-muted-foreground">Presets</p>
            <BouncyTabs
                v-model="filter"
                :options="[...filterOptions]"
                variant="pill"
            />
        </div>
        <!-- Horizontal scroll row. Mirrors intro.vue's bg-card grid idiom but 1-D. -->
        <div
            class="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 -mx-1 px-1"
            :class="cn('scrollbar-thin')"
        >
            <button
                v-for="key in visibleKeys"
                :key="key"
                type="button"
                :class="cn(
                    'relative flex-shrink-0 snap-start overflow-hidden rounded-card border border-border bg-card text-left',
                    'shadow-cartoon transition-[transform,box-shadow] duration-fast ease-out',
                    'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover',
                    'focus-visible:outline-none focus-visible:shadow-[var(--focus-ring-shadow)]',
                    key === current && 'ring-2 ring-foreground shadow-cartoon-hover -translate-y-px',
                )"
                :style="{ width: '200px' }"
                :aria-pressed="key === current"
                :aria-label="`Preset: ${PRESET_META[key].label}`"
                @click="onPick(key)"
                @keydown="(e) => onKey(e, key)"
            >
                <div class="aspect-[16/10] w-full bg-muted">
                    <img
                        v-if="thumbs[key]"
                        :src="thumbs[key]"
                        alt=""
                        class="block h-full w-full object-cover"
                        draggable="false"
                    />
                </div>
                <div class="flex flex-col gap-0.5 px-3 py-2">
                    <span class="text-small font-medium text-foreground">
                        {{ PRESET_META[key].label }}
                    </span>
                    <span class="text-admin-label text-muted-foreground">
                        {{ PRESET_META[key].sub }}
                    </span>
                </div>
            </button>
        </div>
    </div>
</template>
