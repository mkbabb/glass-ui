<script setup lang="ts">
import { computed, onBeforeUnmount, useAttrs, watch } from "vue";
import { Search } from "@lucide/vue";
import { ComboboxInput as RekaComboboxInput, injectDialogRootContext } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type {
    ComboboxInputEmits,
    ComboboxInputProps,
} from "../_shared/selection";

defineOptions({ name: "CommandInput", inheritAttrs: false });

const props = defineProps<ComboboxInputProps>();
const emit = defineEmits<ComboboxInputEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => ({
    ...fixedHostAttrs(attrs),
    placeholder: props.placeholder,
}));

/* A palette inside a dialog keeps its query through the dialog's exit. reka writes the
   query as the palette closes (a pick writes the picked value, and every close resets
   it), so rows that follow the query would change while the plate fades. Once the dialog
   it sits in has closed, those writes wait: the query clears when the exit has finished
   and the input leaves with the plate, and a dialog reopened before then keeps the query
   it had. */
const dialogRoot = injectDialogRootContext(null);
const leaving = computed(() => (dialogRoot ? !dialogRoot.open.value : false));
let held = false;
function update(value: string): void {
    if (leaving.value) held = true;
    else emit("update:modelValue", value);
}
watch(leaving, (now) => {
    if (!now) held = false;
});
onBeforeUnmount(() => {
    if (held) emit("update:modelValue", "");
});
</script>

<template>
    <div class="command__input-wrapper" data-slot="command-input-wrapper">
        <Search class="command__input-icon" aria-hidden="true" />
        <RekaComboboxInput
            v-bind="forwardedAttrs"
            data-slot="command-input"
            :model-value="props.modelValue"
            :auto-focus="props.autoFocus"
            :disabled="props.disabled"
            :class="cn('command__input', props.class)"
            @update:model-value="update"
        />
    </div>
</template>
