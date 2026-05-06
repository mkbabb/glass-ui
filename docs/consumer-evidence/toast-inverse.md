# Consumer Evidence — `toastVariants.variant.inverse`

**Source**: `src/components/ui/toast/index.ts:23`
**Demo consumer**: `demo/stories/primitives/toast-inverse.vue:47`
**Glass-ui wire-or-retire pass**: I.W1.E (per I invariant 11; per H FINAL deferred)
**Verdict**: WIRE (sub-bar; demo is canonical Storybook-as-oracle consumer)

## Verification command (run at HEAD)

```bash
rg -n 'variant=.inverse.|variant: .inverse.' src/ demo/
```

Expected hits at HEAD: `demo/stories/primitives/toast-inverse.vue:27,47,85,122,128` (one demo file; multiple in-file occurrences across the live mounts and the inline code excerpt).

## Source-of-truth file:line for variant definition

`src/components/ui/toast/index.ts:23` — `inverse: 'bg-foreground text-background border-foreground'` (third axis-value in the `toastVariants` `variant` axis; sibling to `default` and `destructive`).

## Use case

The `inverse` variant flips foreground and background for high-contrast acknowledgement notifications — a deliberate counterpoint to `default` (low-contrast surface) and `destructive` (semantic red). The story exercises the variant via both shapes (`<Toast variant="inverse">` template attribute and `toastVariants({ variant: 'inverse' })` direct CVA invocation), satisfying H W1.C's two-shape methodology.

## Notes

H FINAL (β audit row 244) named this variant "may emit evidence doc in a future tranche" — I.W1.E lands the doc per I invariant 11 (sub-bar CVA variants emit evidence docs OR retire; no more "may emit"). Demo file is the canonical consumer per the Storybook-as-oracle convention. If the proof grep fails at any future audit, the verdict reverts to `library-orphan`.
