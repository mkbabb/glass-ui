<script setup lang="ts">
import { computed } from "vue";
import Command from "./Command.vue";
import { Dialog, DialogContent } from "../dialog";
import { provideCommandDialogContext } from "./dialogContext";
import type { CommandDialogEmits, CommandDialogProps } from "./types";

defineOptions({ name: "CommandDialog", inheritAttrs: false });

const props = withDefaults(defineProps<CommandDialogProps>(), {
    surface: "glass",
});
const emit = defineEmits<CommandDialogEmits>();

provideCommandDialogContext(() => emit("update:open", false));

const dialogProps = computed(() => {
    const { surface: _, modelValue: __, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <Dialog v-bind="dialogProps" @update:open="emit('update:open', $event)">
        <DialogContent :surface="props.surface" class="command-dialog__content">
            <Command
                :model-value="props.modelValue"
                class="command-dialog__command"
                @update:model-value="emit('update:modelValue', $event)"
            >
                <slot />
            </Command>
        </DialogContent>
    </Dialog>
</template>
