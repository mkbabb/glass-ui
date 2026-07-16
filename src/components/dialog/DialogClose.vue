<script setup lang="ts">
import { DialogClose as RekaDialogClose } from "reka-ui";
import type { PrimitiveProps } from "../_shared/primitive";

export interface DialogCloseProps extends PrimitiveProps {}

const props = defineProps<DialogCloseProps>();
</script>

<template>
    <RekaDialogClose v-bind="props">
        <slot />
    </RekaDialogClose>
</template>
