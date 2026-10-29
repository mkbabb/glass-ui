<script setup lang="ts">
// E-7 fixture tree (spread, CK-08 / X-6): a second writer of data-engaged hides in a v-bind object spread.
import { computed, ref } from "vue";
const held = ref(false);
const bag = computed(() => ({ "data-engaged": held.value ? "" : undefined, role: "toolbar" }));
</script>

<template>
    <div class="dock" v-bind="bag" />
</template>
