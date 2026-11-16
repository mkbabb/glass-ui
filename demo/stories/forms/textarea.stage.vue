<script setup lang="ts">
// Textarea's stage: one labelled field that grows as you type, from a three-row floor.
import { ref } from "vue";
import { Label } from "@glass/components/label";
import { Textarea } from "@glass/components/textarea";

const notes = ref(
    "Met with the print shop about the spring catalogue.\nProofs by Thursday, final files the week after.",
);
</script>

<template>
    <div class="textarea-stage">
        <Label for="textarea-notes">Notes</Label>
        <Textarea id="textarea-notes" v-model="notes" rows="3" size="lg" />
    </div>
</template>

<style scoped>
.textarea-stage {
    display: grid;
    gap: var(--sp-2);
    inline-size: min(100cqi, 34rem);
}
</style>
