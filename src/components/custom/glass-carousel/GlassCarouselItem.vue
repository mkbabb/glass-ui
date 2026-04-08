<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

const props = withDefaults(
    defineProps<{
        /** Whether this item is the active/highlighted one */
        active?: boolean;
        /** Whether the item grows/shrinks between expanded and collapsed modes */
        expandable?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    {
        active: false,
        expandable: true,
    },
);

const emit = defineEmits<{
    click: [e: MouseEvent];
}>();
</script>

<template>
    <button
        :class="
            cn(
                'glass-carousel-item',
                {
                    'glass-carousel-item--active': active,
                    'glass-carousel-item--expandable': expandable,
                },
                props.class,
            )
        "
        @click="emit('click', $event)"
    >
        <slot />
    </button>
</template>

<style scoped>
.glass-carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--muted-foreground);
    border-radius: var(--radius-pill);
    padding: 0.375rem 0.625rem;
    min-width: 2rem;
    min-height: 2rem;
    transition:
        background var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--spring-snappy),
        flex-basis var(--duration-normal) var(--spring-snappy),
        min-height var(--duration-normal) var(--spring-snappy),
        padding var(--duration-normal) var(--spring-snappy),
        font-size var(--duration-normal) var(--spring-snappy);
}

.glass-carousel-item:hover {
    background: color-mix(in srgb, var(--foreground) 6%, transparent);
    color: var(--foreground);
    transform: scale(1.03);
}

.glass-carousel-item:active {
    transform: scale(0.95);
}

.glass-carousel-item--active {
    background: color-mix(in srgb, var(--foreground) 8%, transparent);
    color: var(--foreground);
}

.glass-carousel-item--active:hover {
    background: color-mix(in srgb, var(--foreground) 10%, transparent);
}
</style>
