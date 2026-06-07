<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils";

/**
 * <CardAction> — the shadcn-2025 top-right action slot of the Card family.
 * When present inside a <CardHeader>, the header reflows to a two-column grid
 * (title/description column + this action column) via the `@container/card-header`
 * `has-data-[slot=card-action]` query on CardHeader. Self-aligns to the start of
 * the header's first two rows, justified to the end.
 */
const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <div
        data-slot="card-action"
        :class="cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', props.class)"
    >
        <slot />
    </div>
</template>
