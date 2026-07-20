<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { AccordionItem as RekaAccordionItem } from "reka-ui";
import { cn } from "../_shared/class-names";
import { provideDisclosureIds } from "../_shared/disclosure/disclosure-context";

export interface AccordionItemProps {
    /** Stable value represented by this item in the root model. */
    value: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "AccordionItem", inheritAttrs: false });

const props = withDefaults(defineProps<AccordionItemProps>(), {
    disabled: false,
});
defineSlots<{ default?: () => unknown }>();

provideDisclosureIds();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        open: _open,
        defaultOpen: _defaultOpen,
        "default-open": _defaultOpenKebab,
        unmountOnHide: _unmountOnHide,
        "unmount-on-hide": _unmountOnHideKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});
</script>

<template>
    <RekaAccordionItem
        v-bind="forwardedAttrs"
        as="div"
        data-slot="accordion-item"
        :value="value"
        :disabled="disabled"
        :class="cn('disclosure-item', props.class)"
    >
        <slot />
    </RekaAccordionItem>
</template>
