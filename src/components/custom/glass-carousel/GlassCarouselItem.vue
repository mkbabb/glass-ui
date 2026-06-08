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
        type="button"
        data-slot="glass-carousel-item"
        :data-state="active ? 'active' : 'inactive'"
        :aria-pressed="active"
        :class="
            cn(
                'glass-carousel-item focus-ring tap-squish',
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
    /* AX.W23 F5 — the spring/ease vocabulary re-points off the bespoke
       `--spring-snappy` onto the governed `--spring-dock` register (the
       iOS-control curve the dock family shares; W23 CONSUMES, W05 owns).
       The press-scale is delegated to the `.tap-squish` utility (the
       component-over-CSS-class four-state contract) — this block no longer
       hand-rolls the `:active` transform. */
    transition:
        background var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--spring-dock),
        flex-basis var(--duration-normal) var(--spring-dock),
        min-height var(--duration-normal) var(--spring-dock),
        padding var(--duration-normal) var(--spring-dock),
        font-size var(--duration-normal) var(--spring-dock);
}

.glass-carousel-item:hover {
    background: var(--surface-tint-6);
    color: var(--foreground);
    transform: scale(1.03);
}

.glass-carousel-item--active {
    background: var(--surface-tint-8);
    color: var(--foreground);
}

.glass-carousel-item--active:hover {
    background: var(--surface-tint-10);
}
</style>
