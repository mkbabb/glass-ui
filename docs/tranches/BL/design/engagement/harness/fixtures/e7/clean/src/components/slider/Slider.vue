<script setup lang="ts">
// E-7 fixture tree (clean). A comment naming data-engaged is prose, not a writer; so is the style block's reader.
// el.setAttribute("data-engaged", "") appears only in this comment.
import { stampEngaged } from "../../composables/motion/engage/useEngage";
defineExpose({ stampEngaged });
</script>

<template>
    <!-- the veil: data-engaged is stamped by the register's owner, not here -->
    <span class="glass-focus-veil" aria-hidden="true" />
</template>

<style>
.glass-focus-veil[data-engaged] { opacity: 1; }
</style>
