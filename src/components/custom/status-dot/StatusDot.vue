<template>
    <span
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
                    'relative inline-flex shrink-0 rounded-full',
                    sizeClass,
                )
            "
            :style="outerStyle"
        >
            <span
                v-if="pulse"
                aria-hidden="true"
                class="absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping"
                :style="ringStyle"
            />
            <span
                v-if="variant === 'progress'"
                aria-hidden="true"
                class="relative inline-block h-full w-full rounded-full"
                :style="progressStyle"
            />
            <span
                v-else
                class="relative inline-block h-full w-full rounded-full"
                :style="dotStyle"
            />
        </span>
        <span v-if="label" class="text-xs leading-none text-muted-foreground">
            {{ label }}
        </span>
    </span>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, type HTMLAttributes } from "vue";
import { cn } from "../../../utils/cn";

type Variant = "active" | "paused" | "idle" | "error" | "custom" | "progress";
type Size = "xs" | "sm" | "md";

const props = withDefaults(
    defineProps<{
        variant?: Variant;
        color?: string;
        pulse?: boolean;
        size?: Size;
        label?: string;
        /** Progress value in [0, 1]; consumed when `variant="progress"`. */
        modelValue?: number;
        class?: HTMLAttributes["class"];
    }>(),
    {
        variant: "active",
        pulse: false,
        size: "sm",
        modelValue: 0,
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
    if (props.variant === "progress") {
        return props.color ?? "var(--easing-accent)";
    }
    const map: Record<Exclude<Variant, "custom" | "progress">, string> = {
        active: "var(--color-status-active, hsl(142 71% 45%))",
        paused: "var(--color-status-paused, hsl(48 96% 53%))",
        idle: "var(--color-status-idle, var(--muted-foreground))",
        error: "var(--color-status-error, var(--destructive))",
    };
    return map[props.variant];
});

const dotStyle = computed<CSSProperties>(() => ({
    backgroundColor: resolvedColor.value,
}));

const ringStyle = computed<CSSProperties>(() => ({
    backgroundColor: resolvedColor.value,
}));

const progressClamped = computed(() =>
    Math.max(0, Math.min(1, props.modelValue ?? 0)),
);

const outerStyle = computed<CSSProperties | undefined>(() => {
    if (props.variant !== "progress") {
        return { backgroundColor: resolvedColor.value };
    }
    const p = progressClamped.value;
    const glowAlphaPct = (25 + p * 45).toFixed(0);
    const blur = (2 + p * 6).toFixed(1);
    return {
        "--dot-p": String(p),
        "--dot-deg": `${(p * 360).toFixed(2)}deg`,
        boxShadow: `0 0 ${blur}px color-mix(in srgb, ${resolvedColor.value} ${glowAlphaPct}%, transparent)`,
    } as CSSProperties;
});

const progressStyle = computed<CSSProperties>(() => {
    const c = resolvedColor.value;
    const track = `color-mix(in srgb, ${c} 18%, transparent)`;
    return {
        background: `conic-gradient(from -90deg, ${c} var(--dot-deg, 0deg), ${track} 0)`,
    };
});
</script>
