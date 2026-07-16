<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import {
    CollapsibleContent as RekaCollapsibleContent,
    injectCollapsibleRootContext,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { useDisclosureIds } from "../_shared/disclosure-context";

export interface CollapsibleContentProps {
    /** Keep the region mounted while closed, for measurement or external animation. */
    forceMount?: boolean;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "CollapsibleContent", inheritAttrs: false });

const props = withDefaults(defineProps<CollapsibleContentProps>(), {
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
    <RekaCollapsibleContent
        v-bind="forwardedAttrs"
        as="div"
        data-slot="collapsible-content"
        data-disclosure="collapsible"
        :force-mount="forceMount"
        :id="ids.content"
        role="region"
        :aria-labelledby="ids.trigger"
        :class="cn('disclosure-content', props.class)"
    >
        <slot />
    </RekaCollapsibleContent>
</template>
