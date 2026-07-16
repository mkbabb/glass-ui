<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { TagsInputItemText as RekaTagsInputItemText } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface TagsInputItemTextProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemTextProps>();
</script>

<template>
    <RekaTagsInputItemText
        data-slot="tags-input-item-text"
        :class="cn('tags-input__text', props.class)"
    />
</template>
