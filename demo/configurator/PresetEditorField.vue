<script setup lang="ts">
import { RotateCcw } from "lucide-vue-next";
import { Label } from "../../src/components/ui/label";
import { cn } from "../../src/utils/cn";

interface Props {
    label: string;
    name?: string;
    description?: string;
    canReset?: boolean;
    class?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{ reset: [] }>();
</script>

<template>
    <div :class="cn('flex flex-col gap-1.5 py-2', props.class)">
        <div class="flex items-baseline justify-between gap-3">
            <div class="flex items-baseline gap-2 min-w-0">
                <Label class="text-sm font-medium text-foreground truncate">
                    {{ label }}
                </Label>
                <span
                    v-if="name"
                    class="text-micro font-mono text-muted-foreground/70 truncate"
                >
                    {{ name }}
                </span>
            </div>
            <button
                v-if="canReset"
                type="button"
                class="focus-ring inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-foreground hover:bg-foreground/5 active:scale-[var(--scale-press-btn)]"
                :aria-label="`Reset ${label}`"
                @click="emit('reset')"
            >
                <RotateCcw class="h-3 w-3" aria-hidden="true" />
            </button>
        </div>
        <div class="flex items-center">
            <slot />
        </div>
        <p
            v-if="description"
            class="text-micro leading-snug text-muted-foreground/80"
        >
            {{ description }}
        </p>
    </div>
</template>
