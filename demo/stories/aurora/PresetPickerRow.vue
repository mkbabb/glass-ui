<script setup lang="ts">
import { cn } from "../../../src/utils/cn";
import { Skeleton } from "../../../src/components/ui/skeleton";
import { FadingScroll } from "../../../src/components/custom/fading-scroll";
import { PRESET_KEYS, PRESET_META, type PresetKey } from "./presets";

defineProps<{
    current: PresetKey;
    thumbs: Record<PresetKey, string>;
}>();

const emit = defineEmits<{
    (e: "select", key: PresetKey): void;
}>();

// BA.W-FADING-SCROLL — the bespoke scroll-state measure loop (the prototype this
// wave's `<FadingScroll>` primitive was extracted from) is GONE; the row is now
// `<FadingScroll axis="x">`. The left edge feathers only past `scroll > 0`
// (sharp at rest — the first card's chrome stays intact), the right edge only
// while trailing overflow remains, on the native scroll(self) timeline with the
// `useFadingScroll` JS fallback. The 12px snap tolerance the bespoke loop carried
// lives in the composable now.

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
          drawn as INSET shadows. The card itself owns the single rounded clip
          (overflow-hidden) so the thumbnail meets the rounded crown directly
          with no bg-card band leaking at the top. The horizontal padding gives
          the 3px cartoon drop-shadow room so the scroll axis does not clip it.
          The edge fades are the scroll-STATE-driven `<FadingScroll axis="x">`
          (BA.W-FADING-SCROLL): the first card's chrome stays sharp at rest and
          the left edge feathers only once scrolled, the right only while
          trailing overflow remains.
        -->
        <FadingScroll
            axis="x"
            class="flex snap-x snap-mandatory gap-3 px-1 py-2 scrollbar-thin"
        >
            <button
                v-for="key in PRESET_KEYS"
                :key="key"
                type="button"
                :class="cn(
                    // `flex flex-col` (NOT a bare block) so the thumbnail well is a
                    // flex item flush to the card's top inner edge. A block-level card
                    // gives its first child a ~5px line-box strut from the caption's
                    // line-height — that strut painted a band of bg-card ABOVE the
                    // image (a near-black bar in dark mode: the B19 defect). A flex
                    // column has no baseline strut, so the image meets the rounded
                    // crown with zero bg-card leak.
                    'group relative flex flex-shrink-0 flex-col snap-start overflow-hidden rounded-card border border-border bg-card text-left',
                    'shadow-cartoon transition-[transform,box-shadow] duration-fast ease-out',
                    'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover',
                    'focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--ring)]',
                    key === current && 'shadow-[inset_0_0_0_2px_var(--foreground)] -translate-y-px',
                )"
                :style="{ width: '200px' }"
                :aria-pressed="key === current"
                @click="onPick(key)"
                @keydown="(e) => onKey(e, key)"
            >
                <!--
                  Thumbnail well. The card (above) owns the single rounded clip
                  via overflow-hidden, so the well carries no radius of its own —
                  the image meets the card's rounded crown directly with no
                  bg-card band leaking at the top in dark mode. `usePresetThumbnails`
                  seeds `thumbs[key]` to "" until the bake resolves, so the
                  v-if/v-else swap is the loading-state signal.
                -->
                <div class="aspect-[16/10] w-full">
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
        </FadingScroll>
    </div>
</template>
