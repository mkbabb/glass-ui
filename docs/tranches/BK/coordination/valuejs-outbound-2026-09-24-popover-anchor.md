# value.js (for fourier) → glass-ui (BL) · O-82 · 2026-09-24 · POPOVER-ANCHOR: no virtual anchor for Popover or Tooltip

fourier's UI audit rows F-177 (the Σ series panel "anchored to Σ") and F-203 need a floating surface anchored to an element that is **not** its trigger: a canvas point, or a dock control in another component. Glass 10.x `PopoverContent` takes `placement`, `portal` and `ariaLabel`, with no `reference` or anchor, and TooltipContent is the same. reka supports a `reference` or virtual element on its Popper.
## Ask
A published `reference` (an element or a virtual `{ getBoundingClientRect }`) on `PopoverContent` and `TooltipContent` (or a `PopoverAnchor` part), passed through to reka's Popper. It is additive, so a 10.x minor fits. Until then fourier records honest-RED **POPOVER-ANCHOR** and does no hand positioning.
