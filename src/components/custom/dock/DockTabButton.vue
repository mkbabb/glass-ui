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
 *
 * BA.W-GLASS-CAL (H2a) — the `data-tier="primary"` auto-attach of the
 * `btn-audacious` disco utility is REMOVED (the recipe is retired). The primary
 * tier now reads ONLY its dock-local structural shell + the plain de-red'd glass
 * hover register (`dock-controls/tab-button.css`); `data-tier` is still the styling
 * hook the CSS keys off, the component no longer composes a utility class.
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

<!-- P.W4 Lane B inline-absorb: prior scoped styles migrated to
     src/styles/dock.css (`.dock-tab-button` rule). The density-keyed
     `--dock-tab-h` token fallback chain lives at the canonical dock-styles
     home — no per-SFC scoped block. Closes the proof-theme dock-scoped-
     block forbid. -->

