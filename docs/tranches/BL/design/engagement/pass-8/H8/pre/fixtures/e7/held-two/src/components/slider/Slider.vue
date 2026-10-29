<script setup lang="ts">
// E-7 fixture tree (clean). A comment naming data-engaged is prose, not a writer; so is the style block's reader.
// el.setAttribute("data-engaged", "") and el.dataset.held = "pointer" appear only in this comment.
import { stampEngaged } from "../../composables/motion/engage/useEngage";
// readers are not writers: a selector string, a presence test, a comparison
const isHeld = (el: HTMLElement) => el.dataset.held !== undefined || el.matches("[data-press]") || el.dataset.commit === "a";
defineExpose({ stampEngaged, isHeld });
</script>

<template>
    <!-- the veil: data-engaged is stamped by the register's owner, not here -->
    <span class="glass-focus-veil" aria-hidden="true" />
</template>

<style>
.glass-focus-veil[data-engaged] { opacity: 1; }
.slider[data-held] { cursor: grabbing; }
</style>
