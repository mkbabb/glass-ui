<script setup lang="ts">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { ChevronRight } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import { useMenuPart } from "./context";

export interface DropdownMenuSubTriggerProps {
    disabled?: boolean;
    textValue?: string;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "DropdownMenuSubTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuSubTriggerProps>(), {
    disabled: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
const SubTriggerComp = useMenuPart("SubTrigger");
</script>

<template>
    <component
        :is="SubTriggerComp"
        v-bind="forwardedAttrs"
        as="div"
        :disabled="disabled"
        :text-value="textValue"
        data-slot="menu-sub-trigger"
        :class="
            cn(
                'menu__sub-trigger interactive-item glass-menu-row',
                props.class,
            )
        "
    >
        <slot />
        <ChevronRight class="menu__sub-chevron" aria-hidden="true" />
    </component>
</template>
