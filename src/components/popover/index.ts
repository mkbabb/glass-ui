// V.W2 T4 — empty-wrapper decisions:
// Popover / PopoverTrigger are pure forwarding wrappers around reka-ui's
// PopoverRoot / PopoverTrigger. Per B3 §2.6: Vue SFCs cannot be 1-line
// re-exports. Decision: KEEP both. PopoverContent (named in T4 spec but
// inspected here) carries class composition and is NOT empty — KEEP as
// a content-shaping primitive. PopoverAnchor (named in T4 spec) does not
// ship in this package — no decision needed.
export { default as Popover } from './Popover.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'
export { default as PopoverContent } from './PopoverContent.vue'
