<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { SelectScrollDownButton as RekaSelectScrollDownButton } from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ name: "SelectScrollDownButton", inheritAttrs: false });

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaSelectScrollDownButton
        v-bind="forwardedAttrs"
        :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
    >
        <slot>
            <ChevronDown class="h-4 w-4" />
        </slot>
    </RekaSelectScrollDownButton>
</template>
