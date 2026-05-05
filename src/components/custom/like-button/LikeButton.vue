<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Heart } from "lucide-vue-next";
import { cn } from "../../../utils/cn";

/**
 * <LikeButton> — heart-shape toggle. Click flips `modelValue` (v-model).
 * When `count` is provided, the numeric tally renders to the right of
 * the heart in `.text-mono-small`. Color resolves to `--like` when
 * active and `--muted-foreground` when inactive; the heart fills with
 * `currentColor` while active so the entire glyph picks up the tier.
 */
export interface LikeButtonProps {
    modelValue: boolean;
    count?: number;
    /** Accessible label override. */
    label?: string;
    class?: string;
}

const props = defineProps<LikeButtonProps>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

defineOptions({ name: "LikeButton" });

const buttonStyle = computed<CSSProperties>(() => ({
    color: props.modelValue ? "var(--like)" : "var(--muted-foreground)",
}));

const ariaLabel = computed(
    () => props.label ?? (props.modelValue ? "Unlike" : "Like"),
);

function toggle() {
    emit("update:modelValue", !props.modelValue);
}
</script>

<template>
    <button
        type="button"
        :class="
            cn(
                'like-button interactive-item inline-flex items-center gap-1',
                props.class,
            )
        "
        :style="buttonStyle"
        :aria-pressed="modelValue"
        :aria-label="ariaLabel"
        @click="toggle"
    >
        <Heart
            aria-hidden="true"
            :fill="modelValue ? 'currentColor' : 'none'"
        />
        <span v-if="count !== undefined" class="text-mono-small">{{ count }}</span>
    </button>
</template>
