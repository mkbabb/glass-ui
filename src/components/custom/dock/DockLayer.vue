<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef, watch } from "vue";
import type { Component } from "vue";
import { useDockLayerGroupContext } from "./composables/dockLayerContext";

/**
 * <DockLayer> — a named content pane inside a <DockLayerGroup>.
 *
 * Layers register themselves with their parent group via provide/inject,
 * so the group can both render a switcher rail (using each layer's
 * label/icon) and coordinate crossfade transitions when the active
 * layer changes.
 *
 * O.W2 Lane A — typed-key DI via `useDockLayerGroupContext()` (strict;
 * throws when used outside `<DockLayerGroup>`). Replaces the prior
 * `inject("dockLayerGroup", null) + manual !group throw` shape.
 */
const props = defineProps<{
    /** Stable identifier — referenced by the parent group's `active` v-model. */
    id: string;
    /** Human-readable label; used for tooltip + fallback rail glyph. */
    label?: string;
    /** Optional icon: a Vue component, or a raw string (rendered as text). */
    icon?: Component | string;
}>();

const group = useDockLayerGroupContext();

onMounted(() => {
    group.register({
        id: props.id,
        label: props.label,
        icon: props.icon,
    });
});

onBeforeUnmount(() => {
    group.unregister(props.id);
});

const isActive = computed(() => group.currentLayerId.value === props.id);
const isLeaving = computed(() => group.leavingLayerId.value === props.id);

const hostEl = useTemplateRef<HTMLElement>("hostEl");

/* AU.W8.4f — post-swap focus routing (MANDATORY; crosswalk §3.2). View
   Transitions (and the FLIP fallback) do NOT manage focus: when the swap hides
   the previously-active pane, a focus that lived inside it is abandoned for
   keyboard/AT users. When THIS layer becomes active, if the document's focus
   was orphaned (no active element, body, or an element now inside an `inert`
   ancestor — i.e. the just-hidden pane), route focus to the revealed host
   (`tabindex="-1"` makes the host programmatically focusable). Applies to BOTH
   the VT native path and the FLIP fallback (the watch fires on either swap). */
watch(isActive, async (active, wasActive) => {
    if (!active || wasActive) return;
    const orphaned =
        typeof document !== "undefined" &&
        (() => {
            const el = document.activeElement;
            if (!el || el === document.body) return true;
            // The previously-focused element is inside a now-inert (hidden) pane.
            return !!el.closest("[inert]");
        })();
    if (!orphaned) return;
    await nextTick();
    hostEl.value?.focus();
});
</script>

<template>
    <div
        ref="hostEl"
        class="dock-layer-item-host"
        :class="{ 'is-active': isActive, 'is-leaving': isLeaving }"
        :inert="isActive ? undefined : true"
        :aria-hidden="isActive ? undefined : true"
        :tabindex="isActive ? -1 : undefined"
    >
        <slot />
    </div>
</template>
