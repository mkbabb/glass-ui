<script setup lang="ts">
import { cn } from "@/utils/cn";
import { Skeleton } from "@/components/ui/skeleton";
import { PRESET_KEYS, PRESET_META, type PresetKey } from "./presets";

defineProps<{
    current: PresetKey;
    thumbs: Record<PresetKey, string>;
}>();

const emit = defineEmits<{
    (e: "select", key: PresetKey): void;
}>();

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
        <p class="text-admin-label text-muted-foreground">Presets</p>
        <!--
          Horizontal scroll row. The scroll container's overflow-x-auto would
          clip outset focus / active rings (one-axis scroll forces the other
          axis to `auto` per CSS spec), so the active and focus indicators are
          drawn as INSET shadows. The inner aspect-ratio wrapper owns the
          rounded clip so the thumbnail's edges meet the border-radius cleanly
          and no `bg-muted` strip leaks at the top.
        -->
        <div class="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scrollbar-thin scroll-fade-mask">
            <button
                v-for="key in PRESET_KEYS"
                :key="key"
                type="button"
                :class="cn(
                    'group relative flex-shrink-0 snap-start rounded-card border border-border bg-card text-left',
                    'shadow-cartoon transition-[transform,box-shadow] duration-fast ease-out',
                    'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover',
                    'focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ring)]',
                    key === current && 'shadow-[inset_0_0_0_2px_var(--foreground)] -translate-y-px',
                )"
                :style="{ width: '200px' }"
                :aria-pressed="key === current"
                :aria-label="`Preset: ${PRESET_META[key].label}`"
                @click="onPick(key)"
                @keydown="(e) => onKey(e, key)"
            >
                <!--
                  Thumbnail well. `bg-transparent` + Skeleton placeholder
                  replaces the prior `bg-muted` strip that read as a top
                  black bar in dark-mode during the cold-load thumbnail
                  bake (R2 §B). `usePresetThumbnails` seeds `thumbs[key]`
                  to "" until the bake resolves, so the v-if/v-else swap
                  is the loading-state signal.
                -->
                <div class="aspect-[16/10] w-full overflow-hidden rounded-t-card bg-transparent">
                    <img
                        v-if="thumbs[key]"
                        :src="thumbs[key]"
                        alt=""
                        class="block h-full w-full object-cover"
                        draggable="false"
                    />
                    <Skeleton
                        v-else
                        variant="shimmer"
                        class="h-full w-full rounded-none"
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
