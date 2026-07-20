<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { CollapsibleRoot as RekaCollapsibleRoot } from "reka-ui";
import { cn } from "../_shared/class-names";
import { provideDisclosureIds } from "../_shared/disclosure/disclosure-context";

export interface CollapsibleProps {
    /** Controlled disclosure state. */
    open?: boolean;
    /** Initial state for an uncontrolled disclosure. */
    defaultOpen?: boolean;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

export interface CollapsibleEmits {
    "update:open": [value: boolean];
}

defineOptions({ name: "Collapsible", inheritAttrs: false });

const props = withDefaults(defineProps<CollapsibleProps>(), {
    defaultOpen: false,
    disabled: false,
});
const emit = defineEmits<CollapsibleEmits>();
defineSlots<{
    default?: (props: { open: boolean }) => unknown;
}>();

provideDisclosureIds();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        unmountOnHide: _unmountOnHide,
        "unmount-on-hide": _unmountOnHideKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});
</script>

<template>
    <RekaCollapsibleRoot
        v-bind="forwardedAttrs"
        v-slot="{ open: currentOpen }"
        as="div"
        data-slot="collapsible"
        data-disclosure="collapsible"
        :open="open"
        :default-open="defaultOpen"
        :disabled="disabled"
        :class="cn('disclosure', props.class)"
        @update:open="emit('update:open', $event)"
    >
        <slot :open="currentOpen" />
    </RekaCollapsibleRoot>
</template>

<style src="../_shared/disclosure/disclosure.css"></style>
