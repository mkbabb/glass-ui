<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import type { Component } from "vue";
import { useDockCrossfadeContext } from "./composables/dockCrossfadeContext";

/**
 * <DockLayer> — a named content pane (a "face") inside a <DockCrossfade> /
 * <DockLayerGroup>.
 *
 * BI.W-DOCK-CROSSFADE — the FLIP/registration engine is RETIRED. A face now does one
 * thing: it registers its id + label + icon + host element with the crossfade slot on
 * mount, renders its content in a `.dock-face` host, and reads its active/leaving state
 * off the context. The crossfade slot (`<DockCrossfade>`) owns the two-child opacity
 * overlap, the peak reserve, and the focus-transfer-on-dissolve — this component holds
 * no spring, no measure, no orphan-focus watch (all folded to the ONE crossfade slot).
 */
const props = defineProps<{
    /** Stable identifier — referenced by the crossfade's `active` id. */
    id: string;
    /** Human-readable label; used for tooltip + the switcher rail glyph. */
    label?: string;
    /** Optional icon: a Vue component, or a raw string (rendered as text). */
    icon?: Component | string;
}>();

const ctx = useDockCrossfadeContext();

const hostEl = useTemplateRef<HTMLElement>("hostEl");

onMounted(() => {
    if (hostEl.value) {
        ctx.register({
            id: props.id,
            label: props.label,
            icon: props.icon,
            el: hostEl.value,
        });
    }
});

// Re-register on id/label/icon change (a `v-for` re-key) so the crossfade + rail track
// the live descriptor.
watch(
    () => [props.id, props.label, props.icon] as const,
    (next, prev) => {
        if (prev && prev[0] !== next[0]) ctx.unregister(prev[0]);
        if (hostEl.value) {
            ctx.register({
                id: props.id,
                label: props.label,
                icon: props.icon,
                el: hostEl.value,
            });
        }
    },
);

onBeforeUnmount(() => ctx.unregister(props.id));

const isActive = computed(() => ctx.activeId.value === props.id);
const isLeaving = computed(() => ctx.leavingId.value === props.id);
</script>

<template>
    <div
        ref="hostEl"
        class="dock-face"
        :class="{ 'is-active': isActive, 'is-leaving': isLeaving }"
        :inert="isActive ? undefined : true"
        :aria-hidden="isActive ? undefined : true"
        :tabindex="isActive ? -1 : undefined"
    >
        <!-- G12 — the content-wrapper clip lands on THIS non-interactive wrapper ONLY
             (never the `.dock-face` interactive run), so a face's row that spills past a
             narrowing plate mid-collapse is clipped WITHOUT clipping hover plates (which
             overflow at rest — the clip is `[data-morphing]`-gated). See crossfade.css. -->
        <div class="dock-face-content">
            <slot />
        </div>
    </div>
</template>
