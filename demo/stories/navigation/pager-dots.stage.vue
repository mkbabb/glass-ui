<script setup lang="ts">
// Pager Dots' stage: one rail of six pages, which fits a phone at touch size.
import { ref } from "vue";
import { PagerDots } from "@glass/components/pager-dots";

const active = ref(2);
</script>

<template>
    <PagerDots v-model:active="active" :count="6" aria-label="Pages" />
</template>
