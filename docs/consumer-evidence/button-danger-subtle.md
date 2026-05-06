# Consumer Evidence — `buttonVariants.variant.danger-subtle`

**Source**: `src/components/ui/button/index.ts:30`
**Demo consumer**: `demo/stories/data/search.vue:318`
**Glass-ui wire-or-retire pass**: I.W7 absorb (β audit found sub-bar — invariant 11)
**Verdict**: WIRE (sub-bar; clear-cache button consumes danger-subtle for its destructive-but-quiet aesthetic)

## Verification command (run at HEAD)

```bash
rg -n 'variant=.danger-subtle.|variant: .danger-subtle.' src/ demo/
```

Expected hit: `demo/stories/data/search.vue:318` — Clear-cache button.

## Notes

`danger-subtle` is the destructive-tone-but-quiet variant for non-modal destructive actions (cache clearing, soft-delete confirmations). The full `destructive` variant remains for modal/primary destructive paths.
