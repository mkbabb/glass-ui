<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogDescription as RekaDialogDescription } from "reka-ui";
import { cn } from "../_shared/class-names";

export interface DialogDescriptionProps {
    class?: HTMLAttributes["class"];
}

const props = defineProps<DialogDescriptionProps>();
</script>

<template>
    <!-- Size and ink are authored in `dialog/styles.css`. At 18.608px the text sits
         below the 18.66px large-text bound, so it owes the full 4.5:1 and the muted ink
         measured 3.92:1 on this plate. -->
    <RekaDialogDescription data-slot="dialog-description" :class="cn(props.class)">
        <slot />
    </RekaDialogDescription>
</template>
