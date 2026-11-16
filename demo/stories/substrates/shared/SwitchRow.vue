<script setup lang="ts">
// One editor row holding one switch.
import { useId } from "vue";
import { Switch } from "@glass/components/switch";
import StoryEditorRow from "../../../chassis/editor/StoryEditorRow.vue";

defineProps<{ label: string }>();

const model = defineModel<boolean>({ required: true });
const id = useId();
</script>

<template>
    <StoryEditorRow :label="label" :for="id">
        <Switch :id="id" v-model="model" />
    </StoryEditorRow>
</template>
