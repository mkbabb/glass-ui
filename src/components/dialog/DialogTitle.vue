<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogTitle as RekaDialogTitle } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface DialogTitleProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<DialogTitleProps>();
</script>

<template>
    <!-- Size and leading are authored in `dialog/styles.css`, derived from the ONE
         fluid body value so the √φ interval with the description holds at the clamp
         floor, through the fluid arm, and at the ceiling. `leading-none` (1.000 on a
         20.35px heading) is gone. -->
    <RekaDialogTitle data-slot="dialog-title" :class="cn(props.class)">
        <slot />
    </RekaDialogTitle>
</template>
