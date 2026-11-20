<script setup lang="ts">
// The Constellation editor: two layers, one open at a time, one control per row.
import { ref } from "vue";
import { ConfiguratorLayer } from "@glass/components/configurator";
import SliderRow from "../shared/SliderRow.vue";
import SwitchRow from "../shared/SwitchRow.vue";
import type { ConstellationStudio } from "./studio";

defineProps<{ config: ConstellationStudio }>();

type Layer = "field" | "behaviour";
const open = ref<Layer | null>("field");
const setOpen = (id: Layer, v: boolean): void => {
    open.value = v ? id : null;
};
</script>

<template>
    <ConfiguratorLayer label="Field" :open="open === 'field'" @update:open="setOpen('field', !!$event)">
        <SliderRow v-model="config.count" label="Points" :min="16" :max="120" :step="1" />
        <SliderRow v-model="config.link" label="Link reach" :min="60" :max="240" :step="2" />
        <SliderRow v-model="config.ceiling" label="Strength" :min="0.2" :max="1" :step="0.01" />
        <SwitchRow v-model="config.accent" label="Accent" />
    </ConfiguratorLayer>

    <ConfiguratorLayer label="Behaviour" :open="open === 'behaviour'" @update:open="setOpen('behaviour', !!$event)">
        <SwitchRow v-model="config.pointer" label="Pointer" />
        <SwitchRow v-model="config.warp" label="Press warp" />
        <SwitchRow v-model="config.wander" label="Wander" />
        <SwitchRow v-model="config.well" label="Gravity" />
        <SwitchRow v-model="config.pinned" label="Pin" />
    </ConfiguratorLayer>
</template>
