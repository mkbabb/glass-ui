import type { Size } from "../_shared/axes";

// The 7-state union StatusDot's mark renders. It absorbs the former Pulse states
// (active/idle/success + the shared warning) onto the same mark — a clean break:
// `PulseState` is gone, the liveness axis is `motion`, not a second component
// identity.
//
// The file is `states.ts`. It was `feedback.ts` — a dead family name: there is no
// "feedback" component, no feedback family, and nothing else in the library speaks
// that word. What this file holds is the state union and the size union of one
// component, and it is named for them.
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

// Named at SOURCE, not at the barrel. `FeedbackSize` was renamed to
// `StatusDotSize` on the way out through `index.ts`, so the type had one name in
// the file that declared it and another in every file that consumed it — the
// export line was doing the design's work.
export type StatusDotSize = Extract<Size, "sm" | "md" | "lg">;
