<script setup lang="ts">
import { computed, useAttrs, useSlots, type HTMLAttributes } from "vue";
import { AvatarRoot } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

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
// CONTRACT FENCE, not a convenience strip (S8). `MIGRATION.md:118` fixes Avatar's
// identity in the typed union — a name arrives through `label`/`labelledBy`/
// `decorative` and lands on the ONE inner `role="img"` node. Letting a caller's
// stray `role`/`aria-*` through to the outer geometry host would silently re-open
// that published record with a second, competing identity. The strip enforces it.
const rootAttrs = computed(() =>
    Object.fromEntries(
        Object.entries(fixedHostAttrs(attrs)).filter(
            ([name]) => name !== "role" && !name.startsWith("aria-"),
        ),
    ),
);
</script>

<template>
    <AvatarRoot
        v-bind="rootAttrs"
        :class="cn('avatar', props.class)"
        :data-size="size"
        :data-shape="shape"
        :data-identity="decorative ? 'decorative' : 'labelled'"
    >
        <span
            class="avatar__identity"
            :role="decorative ? undefined : 'img'"
            :aria-label="decorative ? undefined : props.label"
            :aria-labelledby="decorative ? undefined : props.labelledBy"
            :aria-hidden="decorative || undefined"
        >
            <slot />
        </span>
        <span v-if="slots.status" class="avatar__status" data-slot="avatar-status">
            <slot name="status" />
        </span>
    </AvatarRoot>
</template>

<style src="./styles.css"></style>
