<template>
    <Transition name="fade">
        <div
            v-if="open"
            class="absolute inset-0 z-[var(--z-popover)] grid place-items-center bg-black/50 rounded-2xl"
            @click.self="!loading && (open = false)"
            @keydown.escape="!loading && (open = false)"
        >
            <Transition name="confirm-panel" appear>
                <div
                    v-if="open"
                    class="w-[calc(100%-2rem)] sm:max-w-sm bg-card text-card-foreground border border-border rounded-2xl shadow-lg"
                >
                    <div class="p-6 grid gap-4">
                        <div class="grid gap-2">
                            <h2 class="font-display text-lg font-semibold leading-none tracking-tight">
                                {{ title }}
                            </h2>
                            <div class="font-mono-code text-sm text-muted-foreground">
                                <slot>{{ description }}</slot>
                            </div>
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                class="cursor-pointer rounded-full"
                                :disabled="loading"
                                @click="open = false"
                            >
                                Cancel
                            </Button>
                            <Button
                                :variant="destructive ? 'destructive' : 'default'"
                                class="cursor-pointer gap-1.5 rounded-full"
                                :disabled="loading"
                                @click="onConfirm"
                            >
                                <LoaderCircle
                                    v-if="loading"
                                    class="size-4 animate-spin"
                                />
                                <slot name="action">{{ confirmLabel }}</slot>
                            </Button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { Button } from "../../ui/button";

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
</script>

<style scoped>
.confirm-panel-enter-active {
    transition: opacity var(--duration-normal) var(--ease-decelerate),
                transform var(--duration-normal) var(--ease-decelerate);
}
.confirm-panel-leave-active {
    transition: opacity var(--duration-fast) var(--ease-accelerate),
                transform var(--duration-fast) var(--ease-accelerate);
}
.confirm-panel-enter-from,
.confirm-panel-leave-to {
    opacity: 0;
    transform: scale(0.95);
}
</style>
