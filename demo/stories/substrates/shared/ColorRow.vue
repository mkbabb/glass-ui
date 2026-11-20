<script setup lang="ts">
// One editor row holding one colour well: a swatch over the native picker.
import { useId } from "vue";
import StoryEditorRow from "../../../chassis/editor/StoryEditorRow.vue";

defineProps<{ label: string }>();

/** A hex colour, `#rrggbb`. */
const model = defineModel<string>({ required: true });
const id = useId();
</script>

<template>
    <StoryEditorRow :label="label" :for="id">
        <span class="substrate-swatch focus-ring" :style="{ backgroundColor: model }">
            <input
                :id="id"
                type="color"
                :value="model"
                class="substrate-swatch-input"
                @input="model = ($event.target as HTMLInputElement).value"
            />
        </span>
    </StoryEditorRow>
</template>

<style scoped>
.substrate-swatch {
    position: relative;
    display: inline-flex;
    inline-size: 2rem;
    block-size: 2rem;
    overflow: hidden;
    border-radius: var(--radius-full, 9999px);
    border: 1px solid var(--glass-border-floating);
    transition: background-color var(--duration-fast, 150ms) var(--ease-out);
}

.substrate-swatch-input {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    cursor: pointer;
    opacity: 0;
}
</style>
