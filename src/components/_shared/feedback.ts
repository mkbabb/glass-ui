import type { Size } from "./axes";

// The 7-state feedback union the ONE StatusDot mark renders. It absorbs the
// former Pulse states (active/idle/success + the shared warning) onto the same
// mark — a clean break: `PulseState` is gone, the liveness axis is `motion`, not
// a second component identity.
export const STATUS_DOT_STATES = [
    "active",
    "idle",
    "online",
    "success",
    "warning",
    "error",
    "unknown",
] as const;
export type StatusDotState = (typeof STATUS_DOT_STATES)[number];

export type FeedbackMarkState = StatusDotState;
export type FeedbackSize = Extract<Size, "sm" | "md" | "lg">;
