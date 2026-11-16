<script setup lang="ts" generic="T extends string">
// One editor row holding one select.
import { useId } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import StoryEditorRow from "../../../chassis/editor/StoryEditorRow.vue";

defineProps<{
    label: string;
    options: readonly { label: string; value: T }[];
}>();

const model = defineModel<T>({ required: true });
const id = useId();
</script>

<template>
    <StoryEditorRow :label="label" :for="id">
        <Select v-model="model">
            <SelectTrigger :id="id">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="o in options" :key="o.value" :value="o.value">
                    {{ o.label }}
                </SelectItem>
            </SelectContent>
        </Select>
    </StoryEditorRow>
</template>
