<script setup lang="ts">
// A map hover card, written the way the README tells a consumer to: a computed virtual
// element over the hovered coordinate, handed to PopoverContent's `reference`.
import { computed, ref } from "vue";
import { Popover, PopoverContent, type PopoverVirtualElement } from "../../../../src/components/popover";

const point = ref({ x: 120, y: 80 });
const open = ref(true);
const anchor = computed<PopoverVirtualElement>(() => {
    const { x, y } = point.value;
    return { getBoundingClientRect: () => ({ x, y, width: 0, height: 0, top: y, left: x, right: x, bottom: y }) };
});
</script>

<template>
    <Popover v-model:open="open">
        <PopoverContent :reference="anchor" side="top">Station 12</PopoverContent>
    </Popover>
</template>
