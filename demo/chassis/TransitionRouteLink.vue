<script setup lang="ts">
import { computed } from "vue";
import { useRouter, type RouteLocationRaw } from "vue-router";
import { pushRoute } from "./routeTransition";

defineOptions({ inheritAttrs: false });
const props = defineProps<{ to: RouteLocationRaw }>();
const router = useRouter();
const href = computed(() => router.resolve(props.to).href);

function onClick(event: MouseEvent): void {
    const target = (event.currentTarget as HTMLAnchorElement).target;
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        /\b_blank\b/i.test(target)
    ) {
        return;
    }
    event.preventDefault();
    void pushRoute(router, props.to);
}
</script>

<template>
    <a v-bind="$attrs" :href="href" @click="onClick"><slot /></a>
</template>
