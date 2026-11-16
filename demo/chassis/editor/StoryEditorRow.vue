<script setup lang="ts">
// One editor row on one line: the label on the left, the control on the right.
defineProps<{ label: string; for?: string }>();
</script>

<template>
    <div class="story-editor-row">
        <label :for="$props.for" class="story-editor-row-label">{{ label }}</label>
        <div><slot /></div>
    </div>
</template>
