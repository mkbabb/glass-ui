<script setup lang="ts">
import { useForwardPropsEmits } from "reka-ui";
import { useMenuPart } from "./useMenuTrigger";

export interface DropdownMenuSubProps {
    open?: boolean;
    defaultOpen?: boolean;
}

export interface DropdownMenuSubEmits {
    "update:open": [value: boolean];
}

defineOptions({ name: "DropdownMenuSub", inheritAttrs: false });

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
    defaultOpen: false,
    open: undefined,
});
const emit = defineEmits<DropdownMenuSubEmits>();
defineSlots<{ default?: () => unknown }>();

const SubComp = useMenuPart("Sub");
const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
    <component :is="SubComp" v-bind="forwarded">
        <slot />
    </component>
</template>
