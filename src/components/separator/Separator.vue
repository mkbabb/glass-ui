<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs, useId } from "vue";
import { Separator as RekaSeparator } from "reka-ui";
import type { Orientation } from "../_shared/axes";
import { cn } from "../_shared/class-names";

defineOptions({ inheritAttrs: false });

export interface SeparatorProps {
    orientation?: Orientation;
    decorative?: boolean;
    class?: HTMLAttributes["class"];
    label?: string;
}

const props = withDefaults(defineProps<SeparatorProps>(), {
    orientation: "horizontal",
    decorative: false,
});

const attrs = useAttrs();
const labelId = `${useId()}-label`;
const visibleLabel = computed(() => props.label?.trim());
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
    const { class: _class, label: _label, ...delegated } = props;
    return delegated;
});

const labelledAttrs = computed(() => {
    const {
        role: _role,
        "aria-orientation": _orientation,
        "aria-label": rawAriaLabel,
        "aria-labelledby": rawAriaLabelledby,
        ...rest
    } = forwardedAttrs.value;

    if (props.decorative) {
        return {
            ...rest,
            role: "none",
            "data-orientation": props.orientation,
        };
    }

    const ariaLabel =
        typeof rawAriaLabel === "string" && rawAriaLabel.trim()
            ? rawAriaLabel
            : undefined;
    const ariaLabelledby =
        typeof rawAriaLabelledby === "string" && rawAriaLabelledby.trim()
            ? rawAriaLabelledby
            : ariaLabel
              ? undefined
              : labelId;

    return {
        ...rest,
        role: "separator",
        "data-orientation": props.orientation,
        "aria-orientation":
            props.orientation === "vertical" ? ("vertical" as const) : undefined,
        "aria-label": ariaLabelledby ? undefined : ariaLabel,
        "aria-labelledby": ariaLabelledby,
    };
});
</script>

<template>
    <div
        v-if="visibleLabel"
        v-bind="labelledAttrs"
        data-slot="separator"
        :class="cn('separator separator-labelled', props.class)"
    >
        <span class="separator-segment" aria-hidden="true" />
        <span :id="labelId" class="separator-label">{{ visibleLabel }}</span>
        <span class="separator-segment" aria-hidden="true" />
    </div>

    <RekaSeparator
        v-else
        v-bind="{ ...forwardedAttrs, ...delegatedProps }"
        data-slot="separator"
        :class="cn('separator', props.class)"
    />
</template>

<style scoped>
.separator {
    flex: none;
    background: var(--separator-ink);
}

.separator[data-orientation="horizontal"] {
    inline-size: 100%;
    block-size: 1px;
}

.separator[data-orientation="vertical"] {
    inline-size: 1px;
    block-size: 100%;
}

.separator-labelled {
    display: flex;
    align-items: center;
    background: transparent;
}

.separator-labelled[data-orientation="horizontal"] {
    gap: 0.75rem;
}

.separator-labelled[data-orientation="vertical"] {
    flex-direction: column;
    inline-size: max-content;
    gap: 0.5rem;
}

.separator-segment {
    flex: 1 1 auto;
    background: var(--separator-ink);
}

[data-orientation="horizontal"] > .separator-segment {
    min-inline-size: 1rem;
    block-size: 1px;
}

[data-orientation="vertical"] > .separator-segment {
    inline-size: 1px;
    min-block-size: 1rem;
}

.separator-label {
    flex: none;
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-caption);
    line-height: var(--type-leading-caption);
}
</style>
