<script lang="ts" setup>
// The description on the HOUSE reka `DialogDescription` (off
// vaul's). The type-bind + the typography class are PRESERVED; only the component
// identity changes.
import { DialogDescription as RekaDialogDescription } from "reka-ui";
import type { HtmlHTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

export interface DrawerDescriptionProps {
    class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
    <RekaDialogDescription :class="cn('text-small text-muted-foreground', props.class)">
        <slot />
    </RekaDialogDescription>
</template>
