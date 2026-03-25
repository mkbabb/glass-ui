<script setup lang="ts">
import { toRef, useTemplateRef } from "vue";
import { useLayerTransition } from "./composables/useLayerTransition";

const props = defineProps<{
    activeLayer: string;
}>();

const containerEl = useTemplateRef<HTMLElement>("containerEl");

const { layerProps, onTransitionEnd } = useLayerTransition({
    containerEl,
    activeLayer: toRef(props, "activeLayer"),
});
</script>

<template>
    <div ref="containerEl" class="dock-layer-grid" @transitionend="onTransitionEnd">
        <slot :layer-props="layerProps" />
    </div>
</template>
