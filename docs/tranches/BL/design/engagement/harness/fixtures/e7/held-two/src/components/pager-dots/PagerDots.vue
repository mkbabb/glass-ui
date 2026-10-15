<script setup lang="ts">
// E-7 fixture tree (held-two, CK-08): a component writes data-held outside the register's owner (GlassDock.vue:346 at HEAD).
import { ref } from "vue";
const hand = ref<string | null>(null);
</script>

<template>
    <div class="pager" :data-held="hand ?? undefined" />
</template>
