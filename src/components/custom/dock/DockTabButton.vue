<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { Primitive } from "reka-ui";
import { cn } from "../../../utils";

/**
 * <DockTabButton> — text-tab button for use inside a horizontal GlassDock.
 *
 * Emits the dock tab-button class contract. Interactive styling is owned by
 * src/styles/dock.css. Sibling to <DockIconButton>: DockIconButton is
 * fixed-square for icons; DockTabButton is auto-sized for short text labels.
 *
 * Use `as-child` to render as a <RouterLink> or <a>: the active state
 * automatically activates when the rendered element carries
 * aria-current="page" (which RouterLink sets).
 *
 * K.W6 Lane B — when the consumer attaches `data-tier="primary"`, the
 * button composes the canonical `btn-audacious` utility (the lifted
 * disco-grain + sparkle-sweep + specular-highlight recipe at
 * `utilities.css`). `dock.css` retains the dock-local phase-tinting +
 * structural shell on top of the canonical recipe.
 */
const props = withDefaults(
    defineProps<{
        as?: string;
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { as: "button", asChild: false },
);

const attrs = useAttrs();
const isPrimaryTier = computed(() => attrs["data-tier"] === "primary");

const classes = computed(() =>
    cn("dock-tab-button", isPrimaryTier.value && "btn-audacious", props.class),
);
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="classes">
        <slot />
    </Primitive>
</template>

<style>
/* Density-keyed height knob, parallel to DockIconButton's --dock-control-size.
   When a parent <GlassDock density="…"> sets `--dock-tab-h` (utilities.css),
   the tab-button reserves that row even when the glyph + padding sum would
   ride lower. Default falls through to `--dock-tab-min-height` (kept for
   audacious-tier callers) and finally to `auto`. R3-spec / audit-E P0-3. */
.dock-tab-button {
    min-height: var(--dock-tab-h, var(--dock-tab-min-height, auto));
}
</style>
