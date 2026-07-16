<script lang="ts" setup>
// BB.W-DRAWER-ABROGATE — the title on the HOUSE reka `DialogTitle` (off vaul's). The
// type-bind + the typography class are PRESERVED; only the component identity changes.
import { DialogTitle as RekaDialogTitle } from "reka-ui";
import type { HtmlHTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

export interface DrawerTitleProps {
    class?: HtmlHTMLAttributes["class"];
}

const props = defineProps<DrawerTitleProps>();
</script>

<template>
    <RekaDialogTitle
        :class="cn('text-subheading leading-none tracking-tight', props.class)"
    >
        <slot />
    </RekaDialogTitle>
</template>
