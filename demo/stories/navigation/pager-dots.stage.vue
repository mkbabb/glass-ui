<script setup lang="ts">
// Pager Dots' stage: one rail of eight pages.
import { ref } from "vue";
import { PagerDots } from "@glass/components/pager-dots";

const active = ref(2);
</script>

<template>
    <PagerDots v-model:active="active" :count="8" aria-label="Pages" />
</template>
