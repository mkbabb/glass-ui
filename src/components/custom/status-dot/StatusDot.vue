<template>
    <span
        :role="$attrs['aria-label'] != null ? 'img' : undefined"
        :class="
            cn(
                'inline-flex items-center gap-1.5 align-middle',
                props.class,
            )
        "
    >
        <span
            :class="
                cn(
                    'relative inline-flex shrink-0 rounded-pill',
                    sizeClass,
                )
            "
            :style="dotStyle"
        >
            <span
                v-if="pulse"
                aria-hidden="true"
                class="absolute inset-0 rounded-pill opacity-60 motion-safe:animate-ping"
                :style="ringStyle"
            />
            <span class="relative inline-block h-full w-full rounded-pill" :style="dotStyle" />
        </span>
        <span v-if="label" class="text-xs leading-none text-muted-foreground">
            {{ label }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

type Variant = "active" | "paused" | "idle" | "error" | "custom";
type Size = "xs" | "sm" | "md";

const props = withDefaults(
    defineProps<{
        variant?: Variant;
        color?: string;
        pulse?: boolean;
        size?: Size;
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    {
        variant: "active",
        pulse: false,
        size: "sm",
    },
);

defineOptions({ name: "StatusDot" });

const sizeClass = computed(() => {
    switch (props.size) {
        case "xs":
            return "h-1.5 w-1.5";
        case "md":
            return "h-2.5 w-2.5";
        default:
            return "h-2 w-2";
    }
});

const resolvedColor = computed(() => {
    if (props.variant === "custom") {
        return props.color ?? "var(--muted-foreground)";
    }
    const map: Record<Exclude<Variant, "custom">, string> = {
        active: "var(--color-status-active, hsl(142 71% 45%))",
        paused: "var(--color-status-paused, hsl(48 96% 53%))",
        idle: "var(--color-status-idle, var(--muted-foreground))",
        error: "var(--color-status-error, var(--destructive))",
    };
    return map[props.variant];
});

const dotStyle = computed(() => ({ backgroundColor: resolvedColor.value }));
const ringStyle = computed(() => ({ backgroundColor: resolvedColor.value }));
</script>
