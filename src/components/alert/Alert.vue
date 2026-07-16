<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { type AlertVariants, alertVariants } from "./";

defineOptions({ inheritAttrs: false });

type AlertAnnouncement = "off" | "polite" | "assertive";

const props = withDefaults(
    defineProps<{
        class?: HTMLAttributes["class"];
        tone?: AlertVariants["tone"];
        announce?: AlertAnnouncement;
    }>(),
    { announce: "off" },
);

const attrs = useAttrs();
const role = computed(() => {
    if (props.announce === "polite") return "status";
    if (props.announce === "assertive") return "alert";
    return attrs.role as string | undefined;
});
const ariaLive = computed(() => {
    if (props.announce === "polite") return "polite";
    if (props.announce === "assertive") return "assertive";
    return attrs["aria-live"] as "off" | "polite" | "assertive" | undefined;
});
</script>

<template>
    <div
        v-bind="attrs"
        data-slot="alert"
        :data-tone="tone"
        :class="cn(alertVariants({ tone }), props.class)"
        :role="role"
        :aria-live="ariaLive"
    >
        <slot />
    </div>
</template>
