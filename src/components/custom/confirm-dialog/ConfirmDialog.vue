<template>
    <!-- BC.W-DIALOG-GLASS (move 5 / de-shadcn A2) — the confirm modal re-bases off
         the hand-rolled OPAQUE `bg-card text-card-foreground border` scaffold onto the
         house `<Dialog surface="glass">` so it reads the SAME warm-cream translucent
         glass material the rest of the overlay band does — ONE material, no hand-rolled
         opaque fork. reka = behavior (DialogRoot owns the focus trap, Escape dismiss,
         portal, ARIA, click-outside), glass-ui = 100% material. The behavior contract
         is unchanged: `v-model:open`, the confirm/cancel actions, the body + #action
         slots, the loading guard (dismiss blocked while loading). -->
    <Dialog v-model:open="open">
        <DialogContent
            surface="glass"
            class="w-[calc(100%-2rem)] sm:max-w-sm"
            :show-close="false"
            @escape-key-down="onDismiss"
            @interact-outside="onDismiss"
        >
            <DialogHeader>
                <DialogTitle class="font-display font-semibold">
                    {{ title }}
                </DialogTitle>
                <DialogDescription class="fira-code">
                    <slot>{{ description }}</slot>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter class="gap-2">
                <Button
                    variant="outline"
                    class="cursor-pointer rounded-pill"
                    :disabled="loading"
                    @click="open = false"
                >
                    Cancel
                </Button>
                <Button
                    :variant="destructive ? 'destructive' : 'default'"
                    class="cursor-pointer gap-1.5 rounded-pill"
                    :disabled="loading"
                    @click="onConfirm"
                >
                    <LoaderCircle
                        v-if="loading"
                        class="size-4 animate-spin"
                    />
                    <slot name="action">{{ confirmLabel }}</slot>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { LoaderCircle } from "@lucide/vue";
import { Button } from "../../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../../ui/dialog";

const props = defineProps<{
    title: string;
    description?: string;
    confirmLabel: string;
    destructive?: boolean;
    loading?: boolean;
}>();

const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits<{ confirm: [] }>();

function onConfirm() {
    if (props.loading) return;
    emit("confirm");
    open.value = false;
}

// The loading guard: reka's DialogContent emits these dismiss intents; while a
// confirm is in-flight (`loading`) we PREVENT the dismiss (the prior scaffold's
// `!loading && (open = false)` guard), otherwise reka's own update:open closes it.
function onDismiss(event: Event) {
    if (props.loading) event.preventDefault();
}
</script>
