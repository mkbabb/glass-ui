<script setup lang="ts">
// ToneSwatch — semantic-tone swatch reading from --info / --success /
// --warning / --destructive (and their -foreground rungs). Replaces raw
// Tailwind palette literals (bg-emerald-50/90, etc.) across ~25 sites in
// feedback/{notification, toast}, containers/alert, compositions/dashboard.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../src/utils/cn";

export type ToneKey = "info" | "success" | "warning" | "destructive";

interface ToneSwatchProps {
    tone: ToneKey;
    /** Optional caption under the swatch. */
    label?: string;
    /** Also render the matching --tone-foreground rung as a paired chip. */
    showFg?: boolean;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ToneSwatchProps>(), {
    showFg: false,
});

const bgClass = computed(() => `bg-${props.tone}`);
const fgClass = computed(() => `bg-${props.tone}-foreground`);
const fgVar = computed(() => `--${props.tone}-foreground`);
const bgVar = computed(() => `--${props.tone}`);
</script>

<template>
    <div
        :class="
            cn(
                'flex flex-col items-center gap-2',
                props.class,
            )
        "
    >
        <div
            :class="
                cn(
                    'flex size-16 items-center justify-center rounded-md border border-border/40',
                    bgClass,
                )
            "
        >
            <span
                v-if="showFg"
                :class="cn('size-6 rounded-sm', fgClass)"
                :title="fgVar"
            />
        </div>
        <div class="flex flex-col items-center gap-0.5">
            <code class="fira-code text-mono-caption text-foreground">
                {{ bgVar }}
            </code>
            <span v-if="label" class="text-mono-caption text-muted-foreground">
                {{ label }}
            </span>
        </div>
    </div>
</template>
