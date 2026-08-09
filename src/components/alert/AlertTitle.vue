<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <!-- THE TYPE LADDER. The title binds `--type-body` and the description `--type-small`
         — both content-scale tokens, neither multiplied by `--ui-scale`. That matters
         more than the two sizes do: the alert root used to bind `--control-text`
         (= `--type-small` × `--ui-scale`), which the title inherited while the
         description bound the bare token, so the title:body ratio was 1.00 on a fine
         pointer and 1.50 on a coarse one. A ratio that moves with the pointer class is
         not a ladder. Reading both steps off the content scale pins it at 1.143 at the
         floor and 1.134 at 1440 — the ≈1.13 content step — at BOTH pointer classes.

         A direct size bind rather than the `text-body` utility, because that utility
         also declares `font-weight: 400` and would collide with the weight below.

         No `line-clamp-1`: a truncated title is a lost sentence on a surface whose whole
         job is to say one thing once. It was inherited, not designed, and it is struck —
         and the coarse-pointer pressure that made it look necessary is gone with the
         `--ui-scale` bind, which dropped the 390px title from 24.6px to the 16px floor. -->
    <div
        data-slot="alert-title"
        :class="
            cn(
                'col-start-2 min-h-4 text-[length:var(--type-body)] font-semibold tracking-tight',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
