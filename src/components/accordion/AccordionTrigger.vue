<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    AccordionHeader as RekaAccordionHeader,
    AccordionTrigger as RekaAccordionTrigger,
    injectAccordionItemContext,
} from "reka-ui";
import { ChevronDown } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { useDisclosureIds } from "../_shared/disclosure-context";

export interface AccordionTriggerProps {
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "AccordionTrigger", inheritAttrs: false });

const props = defineProps<AccordionTriggerProps>();
defineSlots<{
    default?: () => unknown;
    icon?: () => unknown;
}>();

const ids = useDisclosureIds();
const itemContext = injectAccordionItemContext();
itemContext.triggerId = ids.trigger;

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
</script>

<template>
    <RekaAccordionHeader as="h3" data-slot="accordion-header" class="disclosure-header">
        <RekaAccordionTrigger
            v-bind="forwardedAttrs"
            as="button"
            data-slot="accordion-trigger"
            :id="ids.trigger"
            :aria-controls="ids.content"
            :class="cn('disclosure-trigger disclosure-group-trigger', props.class)"
        >
            <slot />
            <slot name="icon">
                <ChevronDown
                    aria-hidden="true"
                    class="disclosure-icon transition-disclosure"
                />
            </slot>
        </RekaAccordionTrigger>
    </RekaAccordionHeader>
</template>
