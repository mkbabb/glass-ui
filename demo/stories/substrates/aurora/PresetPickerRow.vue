<script setup lang="ts">
import { cn } from "@glass/components/_shared/class-names";
import { FadingScroll } from "@glass/components/fading-scroll";
import { PRESET_KEYS, PRESET_META, type PresetKey } from "./presets";

defineProps<{
    current: PresetKey;
    /**
     * Per-preset device-free field as a CSS `background-image` value (a
     * `url("data:image/png…")` raster or a layered radial-gradient stack — the
     * shipped `auroraFallbackGround`). Seeded to "" until the field build resolves;
     * the empty string is the loading-state signal.
     */
    thumbs: Record<PresetKey, string>;
}>();

const emit = defineEmits<{
    (e: "select", key: PresetKey): void;
}>();

// the device-free render fix. The thumbnail well is no
// longer an offscreen-WebGPU <img> bake (the `device not acquired` abort that
// killed all 13 cards); it is the §3 colourful field painted via the shipped
// `auroraFallbackGround` (a CSS background-image — raster or gradient stack), so
// the gallery CANNOT be blank and is identical-enough in Chrome AND Safari.

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
    <!-- the toggle-button preset gallery (the a11y fence:
         ONE pattern — plain type="button" + aria-pressed in a role="group"
         aria-label="Presets" container; NOT role="tab"+aria-selected, an ARIA
         contradiction). The tiles are warm-glass cels (`.glass-capsule`) floating
         over the §3 field-well, NOT opaque bg-card plates. -->
    <div class="flex flex-col gap-3" role="group" aria-label="Presets">
        <p class="text-small text-muted-foreground">Presets</p>
        <FadingScroll
            axis="x"
            class="configurator-gallery-track flex snap-x snap-mandatory gap-3 px-1 py-2 scrollbar-thin"
        >
            <button
                v-for="key in PRESET_KEYS"
                :key="key"
                type="button"
                data-preset-tile
                :class="cn(
                    // The warm-glass cel: `.glass-capsule` is the shared warm-
                    // transmissive lozenge register (the §3 field reads THROUGH the
                    // tile, never a flat bg-card scrim). `.cartoon-cast` host carries
                    // the technicolor drop-cast; `.glass-capsule-hover` is the
                    // shared specular-lift + press-snap. φ-tall: a 16:10 well crowned
                    // by a label band.
                    'configurator-preset-tile group glass-capsule glass-capsule-hover relative flex flex-shrink-0 flex-col snap-start overflow-hidden text-left',
                    'shadow-cartoon-md',
                    'focus-ring',
                    key === current && 'is-active',
                )"
                :aria-pressed="key === current"
                @click="onPick(key)"
                @keydown="(e) => onKey(e, key)"
            >
                <!--
                  Thumbnail well — the §3 colourful field, device-free. The
                  background-image is the shipped `auroraFallbackGround` (raster
                  or gradient stack); the empty string until the field build lands
                  shows the skeleton shimmer.
                -->
                <div
                    class="configurator-preset-well aspect-[16/10] w-full"
                    :class="!thumbs[key] && 'is-loading'"
                    :style="thumbs[key] ? { backgroundImage: thumbs[key] } : undefined"
                    aria-hidden="true"
                />
                <div class="configurator-preset-label flex flex-col gap-0.5 px-3 py-2">
                    <span class="text-small font-medium text-foreground">
                        {{ PRESET_META[key].label }}
                    </span>
                    <span class="text-small text-muted-foreground">
                        {{ PRESET_META[key].sub }}
                    </span>
                </div>
            </button>
        </FadingScroll>
    </div>
</template>
