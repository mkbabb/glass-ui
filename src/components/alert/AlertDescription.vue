<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <!-- The body step of the alert's type ladder — `text-small`, the bare content token,
         against the title's `--type-body`. `text-muted-foreground` resolves the ON-GLASS
         muted register now that the alert root composes `.glass-quiet`: the ladder
         re-points `--muted-foreground` on every rung class, because page-muted is
         calibrated against the opaque canvas and collapses on a translucent plate. -->
    <div
        data-slot="alert-description"
        :class="
            cn(
                'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-small [&_p]:leading-relaxed',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
