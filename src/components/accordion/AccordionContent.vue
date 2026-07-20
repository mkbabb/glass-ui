<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    AccordionContent as RekaAccordionContent,
    injectCollapsibleRootContext,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { useDisclosureIds } from "../_shared/disclosure/disclosure-context";

export interface AccordionContentProps {
    /** Keep the region mounted while closed, for measurement or external animation. */
    forceMount?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "AccordionContent", inheritAttrs: false });

const props = withDefaults(defineProps<AccordionContentProps>(), {
    forceMount: false,
});
defineSlots<{ default?: () => unknown }>();

const ids = useDisclosureIds();
const rootContext = injectCollapsibleRootContext();
rootContext.contentId = ids.content;

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
    <RekaAccordionContent
        v-bind="forwardedAttrs"
        as="div"
        data-slot="accordion-content"
        data-disclosure="accordion"
        :force-mount="forceMount"
        :id="ids.content"
        :aria-labelledby="ids.trigger"
        class="disclosure-content"
    >
        <div :class="cn('disclosure-content-body', props.class)">
            <slot />
        </div>
    </RekaAccordionContent>
</template>
