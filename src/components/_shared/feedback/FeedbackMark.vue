<script setup lang="ts">
import type { FeedbackMarkState } from "./feedback";

withDefaults(
    defineProps<{
        state?: FeedbackMarkState;
        motion?: boolean;
    }>(),
    {
        state: "active",
        motion: false,
    },
);
</script>

<template>
    <span
        class="feedback-mark"
        :data-state="state"
        :data-motion="motion && state === 'active' ? '' : undefined"
        aria-hidden="true"
    />
</template>

<style scoped>
.feedback-mark {
    --feedback-state-color: var(--info);
    --feedback-state-ink: var(--info-foreground);
    position: relative;
    display: inline-grid;
    inline-size: var(--feedback-mark-size, 0.625rem);
    block-size: var(--feedback-mark-size, 0.625rem);
    flex: none;
    place-items: center;
    color: var(--feedback-mark-color, var(--feedback-state-color));
}

.feedback-mark::before,
.feedback-mark::after {
    content: "";
    position: absolute;
    box-sizing: border-box;
}

.feedback-mark::before {
    inset: 0;
    border: 1px solid currentColor;
    border-radius: 50%;
    background: currentColor;
}

.feedback-mark[data-state="idle"] {
    --feedback-state-color: var(--muted-foreground);
}

.feedback-mark[data-state="idle"]::before {
    background: transparent;
}

.feedback-mark[data-state="success"] {
    --feedback-state-color: var(--success);
    --feedback-state-ink: var(--success-foreground);
}

.feedback-mark[data-state="success"]::after {
    inline-size: 45%;
    block-size: 25%;
    border-block-end: 1px solid var(--feedback-state-ink);
    border-inline-start: 1px solid var(--feedback-state-ink);
    rotate: -45deg;
}

.feedback-mark[data-state="warning"] {
    --feedback-state-color: var(--warning);
    --feedback-state-ink: var(--warning-foreground);
}

.feedback-mark[data-state="warning"]::before {
    inset: 8%;
    border-radius: 18%;
    rotate: 45deg;
}

.feedback-mark[data-state="warning"]::after {
    inline-size: 1px;
    block-size: 45%;
    border-radius: var(--radius-pill);
    background: var(--feedback-state-ink);
}

.feedback-mark[data-state="error"] {
    --feedback-state-color: var(--destructive);
    --feedback-state-ink: var(--destructive-foreground);
}

.feedback-mark[data-state="error"]::before {
    border-radius: 22%;
}

.feedback-mark[data-state="error"]::after {
    inset: 21%;
    background:
        linear-gradient(45deg, transparent 42%, var(--feedback-state-ink) 42% 58%, transparent 58%),
        linear-gradient(-45deg, transparent 42%, var(--feedback-state-ink) 42% 58%, transparent 58%);
}

.feedback-mark[data-state="online"] {
    --feedback-state-color: var(--success);
    --feedback-state-ink: var(--success-foreground);
}

.feedback-mark[data-state="online"]::after {
    inset: 29%;
    border: 1px solid var(--feedback-state-ink);
    border-radius: 50%;
}

.feedback-mark[data-state="unknown"] {
    --feedback-state-color: var(--muted-foreground);
}

.feedback-mark[data-state="unknown"]::before {
    border-style: dashed;
    background: transparent;
}

.feedback-mark[data-state="unknown"]::after {
    inline-size: 22%;
    block-size: 22%;
    border-radius: 50%;
    background: currentColor;
}

.feedback-mark[data-motion]::after {
    inset: -30%;
    inline-size: auto;
    block-size: auto;
    border: 1px solid currentColor;
    border-radius: 50%;
    background: transparent;
    opacity: 0;
    animation: feedback-mark-pulse 1.8s ease-out infinite;
}

@keyframes feedback-mark-pulse {
    0% { scale: 0.72; opacity: 0.5; }
    55%, 100% { scale: 1.08; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
    .feedback-mark[data-motion]::after {
        animation: none;
        scale: 1;
        opacity: 0.28;
    }
}

@media (forced-colors: active) {
    .feedback-mark {
        --feedback-state-color: CanvasText;
        --feedback-state-ink: Canvas;
        forced-color-adjust: none;
        color: CanvasText;
    }

    .feedback-mark[data-state="idle"]::before,
    .feedback-mark[data-state="unknown"]::before {
        background: Canvas;
    }

    .feedback-mark[data-state="unknown"]::after {
        background: CanvasText;
    }

    .feedback-mark[data-motion]::after {
        border-color: CanvasText;
        background: transparent;
    }
}
</style>
