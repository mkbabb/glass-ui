<script setup lang="ts">
import { TagsInputItem as RekaTagsInputItem } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { Chip } from "../chip";

export interface TagsInputItemProps {
    value: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemProps>();
</script>

<template>
    <RekaTagsInputItem
        :value="props.value"
        :disabled="props.disabled"
        data-slot="tags-input-item"
        :class="cn('tags-input__item', props.class)"
    >
        <Chip mode="static" size="sm" data-tags-input-item class="tags-input__chip">
            <slot />
        </Chip>
    </RekaTagsInputItem>
</template>
