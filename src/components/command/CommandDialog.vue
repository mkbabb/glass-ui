<script setup lang="ts">
import { computed } from "vue";
import Command from "./Command.vue";
import Dialog from "../dialog/Dialog.vue";
import DialogContent from "../dialog/DialogContent.vue";
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
        <!-- `deliberate` — no built-in ✕. The palette's own search field owns the top-right
             of the plate, and the shipped ✕ painted 27px INSIDE it; no padding axis can fix
             that, because the ✕ is positioned off the plate's pad and the field's pad is
             already 0. Dropping the ✕ is the only remedy the geometry allows, and it hands
             initial focus to the input where a palette wants it. Esc and outside-press
             still dismiss. -->
        <DialogContent
            :surface="props.surface"
            dismiss="deliberate"
            class="command-dialog__content"
        >
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
