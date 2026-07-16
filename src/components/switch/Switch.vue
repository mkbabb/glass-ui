<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { ControlSize } from "../_shared/control-size";
import type { FormFieldProps } from "../_shared/primitive";

export interface SwitchProps extends FormFieldProps {
    modelValue?: boolean | null;
    defaultValue?: boolean;
    disabled?: boolean;
    id?: string;
    value?: string;
    class?: HTMLAttributes["class"];
    size?: ControlSize;
    invalid?: boolean;
}

const props = withDefaults(defineProps<SwitchProps>(), {
    size: "md",
    invalid: false,
});
const emit = defineEmits<{
    "update:modelValue": [value: boolean];
}>();

const delegatedProps = computed(() => {
    const { class: _class, size: _size, invalid: _invalid, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
    <SwitchRoot
        data-slot="switch"
        v-bind="forwarded"
        :class="cn('switch tap-squish', props.class)"
        :data-size="props.size"
        :data-invalid="props.invalid || undefined"
        :aria-invalid="props.invalid || undefined"
    >
        <span class="switch__track glass-wash" aria-hidden="true">
            <SwitchThumb class="switch__thumb" />
        </span>
    </SwitchRoot>
</template>

<style src="./styles.css"></style>
