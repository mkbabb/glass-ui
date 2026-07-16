<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AvatarFallback as RekaAvatarFallback } from "reka-ui";

defineOptions({ name: "AvatarFallback", inheritAttrs: false });

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        delayMs: _delayMs,
        "delay-ms": _delayMsKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});
</script>

<template>
    <RekaAvatarFallback
        v-bind="forwardedAttrs"
        class="glass-avatar__fallback"
        aria-hidden="true"
    >
        <slot />
    </RekaAvatarFallback>
</template>
