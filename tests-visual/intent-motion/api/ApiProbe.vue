<script setup lang="ts">
import { ref } from "vue";
import { Presence, follow } from "@glass/composables/motion/presence";
const on = ref(false);
const el = ref<HTMLElement | null>(null);
void follow(el.value);
// @ts-expect-error follow takes one argument
void follow(el.value, 1);
</script>

<template>
    <Presence><p v-if="on">a</p></Presence>
    <Presence swap><p v-if="on">a</p><p v-else>b</p></Presence>
    <!-- @vue-expect-error reclaim is not a prop -->
    <Presence reclaim><p v-if="on">a</p></Presence>
    <!-- @vue-expect-error duration is not a prop -->
    <Presence :duration="100"><p v-if="on">a</p></Presence>
    <!-- @vue-expect-error easing is not a prop -->
    <Presence easing="ease"><p v-if="on">a</p></Presence>
    <!-- @vue-expect-error name is not a prop -->
    <Presence name="fade"><p v-if="on">a</p></Presence>
    <!-- @vue-expect-error group is not a prop -->
    <Presence group><p v-if="on">a</p></Presence>
</template>
