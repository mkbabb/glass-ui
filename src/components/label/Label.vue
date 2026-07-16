<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue";
import { Label as RekaLabel } from "reka-ui";
import { cn } from "../_shared/class-names";

export type LabelRequirement = "required" | "optional";

export interface LabelProps {
    for?: string;
    class?: HTMLAttributes["class"];
    requirement?: LabelRequirement;
    disabled?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = defineProps<LabelProps>();
const attrs = useAttrs();

const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});

const delegatedProps = computed(() => {
    const {
        class: _class,
        requirement: _requirement,
        disabled: _disabled,
        ...delegated
    } = props;

    return delegated;
});

const annotation = computed(() => {
    if (props.requirement === "required") return "*";
    if (props.requirement === "optional") return "optional";
    return undefined;
});
</script>

<template>
    <RekaLabel
        v-bind="{ ...forwardedAttrs, ...delegatedProps }"
        data-slot="label"
        :data-requirement="requirement"
        :data-disabled="disabled || undefined"
        :class="cn('glass-label', props.class)"
    >
        <slot />
        <span v-if="annotation" class="label-requirement" aria-hidden="true">{{
            annotation
        }}</span>
    </RekaLabel>
</template>

<style scoped>
.glass-label {
    color: var(--foreground);
    font-family: var(--font-text);
    font-size: var(--type-small);
    font-weight: 500;
    line-height: var(--type-leading-small);
}

.glass-label[data-disabled] {
    cursor: not-allowed;
    opacity: var(--opacity-disabled);
}

.label-requirement {
    margin-inline-start: 0.35em;
    color: var(--muted-foreground);
    font-size: var(--type-caption);
    font-weight: 400;
}

.glass-label[data-requirement="required"] .label-requirement {
    color: var(--destructive);
}
</style>
