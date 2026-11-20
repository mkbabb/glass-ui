<script setup lang="ts">
// Buttons' stage: every emphasis in each tone, at natural size.
import { Trash2 } from "@lucide/vue";
import { Button, type ButtonEmphasis } from "@glass/components/button";

const EMPHASES: readonly { value: ButtonEmphasis; label: string }[] = [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
    { value: "quiet", label: "Quiet" },
    { value: "text", label: "Text" },
];
</script>

<template>
    <div class="buttons-stage">
        <Button
            v-for="e in EMPHASES"
            :key="`neutral-${e.value}`"
            :data-scenario="`button-neutral-${e.value}`"
            :emphasis="e.value"
        >
            {{ e.label }}
        </Button>
        <Button
            v-for="e in EMPHASES"
            :key="`destructive-${e.value}`"
            :data-scenario="`button-destructive-${e.value}`"
            :emphasis="e.value"
            tone="destructive"
        >
            <Trash2 aria-hidden="true" />
            Delete
        </Button>
    </div>
</template>

<style scoped>
/* Four emphases across, one tone per row; two across where the stage is narrow. The
   tracks are `auto`, so a button is never wider than its track. */
.buttons-stage {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: center;
    justify-items: center;
    gap: 1rem 1.25rem;
}

@container (inline-size < 34rem) {
    .buttons-stage {
        grid-template-columns: repeat(2, auto);
    }
}
</style>
