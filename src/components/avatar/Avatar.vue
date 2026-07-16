<script setup lang="ts">
import { computed, useAttrs, useSlots, type HTMLAttributes } from "vue";
import { AvatarRoot } from "reka-ui";
import { cn } from "../_shared/class-names";

defineOptions({ name: "Avatar", inheritAttrs: false });

export type AvatarSize = "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

export type AvatarIdentityProps =
    | { label: string; labelledBy?: never; decorative?: false }
    | { label?: never; labelledBy: string; decorative?: false }
    | { label?: never; labelledBy?: never; decorative: true };

export type AvatarProps = AvatarIdentityProps & {
    size?: AvatarSize;
    shape?: AvatarShape;
    class?: HTMLAttributes["class"];
};

const props = defineProps<AvatarProps>();
const attrs = useAttrs();
const slots = useSlots();
const size = computed(() => props.size ?? "sm");
const shape = computed(() => props.shape ?? "circle");
const decorative = computed(
    () => props.decorative === true || (!props.label?.trim() && !props.labelledBy?.trim()),
);
const rootAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(attrs).filter(
            ([name]) => name !== "role" && !name.startsWith("aria-"),
        ),
    ),
);
</script>

<template>
    <AvatarRoot
        v-bind="rootAttrs"
        :class="cn('glass-avatar', props.class)"
        :data-size="size"
        :data-shape="shape"
        :data-identity="decorative ? 'decorative' : 'labelled'"
    >
        <span
            class="glass-avatar__identity"
            :role="decorative ? undefined : 'img'"
            :aria-label="decorative ? undefined : props.label"
            :aria-labelledby="decorative ? undefined : props.labelledBy"
            :aria-hidden="decorative || undefined"
        >
            <slot />
        </span>
        <span v-if="slots.status" class="glass-avatar__status" data-slot="avatar-status">
            <slot name="status" />
        </span>
    </AvatarRoot>
</template>

<style src="./styles.css"></style>
