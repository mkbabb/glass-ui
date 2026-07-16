<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
    injectTagsInputItemContext,
    TagsInputItemDelete as RekaTagsInputItemDelete,
} from "reka-ui";
import { X } from "@lucide/vue";
import { cn } from "../_shared/class-names";

export interface TagsInputItemDeleteProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputItemDeleteProps>();
const itemContext = injectTagsInputItemContext();
const removeLabel = computed(() => `Remove ${itemContext.displayValue.value}`);
</script>

<template>
    <RekaTagsInputItemDelete
        data-slot="tags-input-item-delete"
        :aria-label="removeLabel"
        :class="cn('tags-input__delete focus-ring', props.class)"
    >
        <slot>
            <X aria-hidden="true" />
        </slot>
    </RekaTagsInputItemDelete>
</template>
