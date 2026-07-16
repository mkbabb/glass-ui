import type { Size } from "./axes";

export const PULSE_STATES = ["active", "idle", "success", "warning"] as const;
export type PulseState = (typeof PULSE_STATES)[number];

export const STATUS_DOT_STATES = ["online", "warning", "error", "unknown"] as const;
export type StatusDotState = (typeof STATUS_DOT_STATES)[number];

export type FeedbackMarkState = PulseState | StatusDotState;
export type FeedbackSize = Extract<Size, "sm" | "md">;
