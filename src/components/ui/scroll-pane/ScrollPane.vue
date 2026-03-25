<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils";
import Card from "../card/Card.vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    /** Pass through to Card's plain prop */
    plain?: boolean;
}>();
</script>

<template>
    <Card
        :plain="plain"
        :class="
            cn(
                'pane-scroll-fade overflow-y-auto overflow-x-hidden max-h-full min-w-0',
                props.class,
            )
        "
    >
        <slot />
    </Card>
</template>
