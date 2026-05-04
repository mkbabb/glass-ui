<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/**
 * <RegionDivider> — twin-line hairline groove, the chassis signature detail.
 *
 * Two 1px lines stacked: top reads as a sub-pixel catch-light, bottom as a
 * sub-pixel under-shadow. Together they describe a hairline groove between
 * stacked instrument panels — the Braun T-1000 / Bang & Olufsen at-rest
 * vocabulary the chassis carries throughout.
 *
 * Orientation flips the geometry from a horizontal divider (default — the
 * dividers between strip / dial / control regions) to a vertical groove
 * (the desktop divider between the dial canvas and the readout column).
 * Mobile inverts the dial-region divider via the chassis stylesheet's
 * `@media (max-width: 720px)` rule; the orientation prop carries no
 * runtime cost there.
 */
const props = withDefaults(
    defineProps<{
        orientation?: "horizontal" | "vertical";
        class?: HTMLAttributes["class"];
    }>(),
    { orientation: "horizontal" },
);

const classes = computed(() =>
    cn("region-divider", `region-divider--${props.orientation}`, props.class),
);
</script>

<template>
    <div :class="classes" :data-orientation="orientation" aria-hidden="true">
        <span class="bezel-line top" />
        <span class="bezel-line bottom" />
    </div>
</template>
