// V.W2 T4 — empty-wrapper decisions:
// Tooltip / TooltipTrigger / TooltipProvider are pure forwarding wrappers
// around reka-ui's TooltipRoot / TooltipTrigger / TooltipProvider. Per
// B3 §2.6: Vue SFCs cannot be 1-line re-exports. Decision: KEEP all three
// — TooltipProvider in particular is scope-providing (sets the delayDuration
// + skipDelayDuration context for child tooltips), and the typed prop+emit
// forwarding via useForwardPropsEmits is non-trivial behaviour.
export { default as Tooltip } from './Tooltip.vue'
export { default as TooltipContent } from './TooltipContent.vue'
export { default as TooltipTrigger } from './TooltipTrigger.vue'
export { default as TooltipProvider } from './TooltipProvider.vue'
