<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

/* The only member of the family that had no registered name — so it showed up in
 * devtools and in every test-utils `findComponent({ name })` lookup as
 * `<Anonymous>`. */
defineOptions({ name: "CommandShortcut" });

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <span data-slot="command-shortcut" :class="cn('command__shortcut', props.class)">
        <slot />
    </span>
</template>
