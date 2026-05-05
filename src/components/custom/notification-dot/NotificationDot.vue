<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { cn } from "../../../utils/cn";

/**
 * <NotificationDot> — small absolutely-positioned indicator dot for
 * decorating buttons / icons with unread / new-state markers. Drops
 * onto its parent's top-right by default; consumers may override
 * placement via `class` or wrapping container.
 *
 * Pulse animation reuses the existing `@keyframes pulse-ring-spin` is
 * inappropriate; we ship a lightweight ping-style outer ring instead,
 * gated by `prefers-reduced-motion: reduce`.
 */
export type NotificationDotSize = "xs" | "sm" | "md";

export interface NotificationDotProps {
    /** Pixel-scaled visual size. */
    size?: NotificationDotSize;
    /** Color override. Defaults to `--easing-accent`. */
    color?: string;
    /** Show outer ping ring (motion-safe only). */
    pulse?: boolean;
    /** Accessible label (default: "Notification"). */
    label?: string;
    class?: string;
}

const props = withDefaults(defineProps<NotificationDotProps>(), {
    size: "sm",
    pulse: false,
});

defineOptions({ name: "NotificationDot" });

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

const dotStyle = computed<CSSProperties>(() => ({
    backgroundColor: props.color ?? "var(--easing-accent)",
}));
</script>

<template>
    <span
        :class="
            cn(
                'notification-dot absolute top-[-2px] right-[-2px] rounded-full',
                sizeClass,
                props.class,
            )
        "
        :style="dotStyle"
        :aria-label="label ?? 'Notification'"
        role="status"
    >
        <span
            v-if="pulse"
            aria-hidden="true"
            class="absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping"
            :style="dotStyle"
        />
    </span>
</template>
