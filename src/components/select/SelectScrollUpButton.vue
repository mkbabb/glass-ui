<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { SelectScrollUpButton as RekaSelectScrollUpButton } from "reka-ui";
import { ChevronUp } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectScrollUpButton", inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaSelectScrollUpButton
        v-bind="forwardedAttrs"
        :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
    >
        <slot>
            <ChevronUp class="h-4 w-4" />
        </slot>
    </RekaSelectScrollUpButton>
</template>
