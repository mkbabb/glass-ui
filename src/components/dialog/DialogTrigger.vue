<script setup lang="ts">
import { DialogTrigger as RekaDialogTrigger } from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";

export interface DialogTriggerProps extends PrimitiveProps {}

const props = defineProps<DialogTriggerProps>();
</script>

<template>
    <RekaDialogTrigger v-bind="props">
        <slot />
    </RekaDialogTrigger>
</template>
