<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
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
 */
const props = withDefaults(
    defineProps<{
        as?: string;
        asChild?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    { as: "button", asChild: false },
);

const classes = computed(() => cn("dock-tab-button", props.class));
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="classes">
        <slot />
    </Primitive>
</template>
