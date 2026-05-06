<script setup lang="ts">
import { RotateCcw } from "lucide-vue-next";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

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
                    class="text-[0.6875rem] font-mono text-muted-foreground/70 truncate"
                >
                    {{ name }}
                </span>
            </div>
            <button
                v-if="canReset"
                type="button"
                class="inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_color-mix(in_srgb,var(--ring)_30%,transparent)] active:scale-[0.97]"
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
            class="text-[0.6875rem] leading-snug text-muted-foreground/80"
        >
            {{ description }}
        </p>
    </div>
</template>
