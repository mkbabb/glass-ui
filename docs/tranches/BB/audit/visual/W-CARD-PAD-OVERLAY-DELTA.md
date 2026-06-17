# W-CARD-PAD — OVERLAY BAND DELTA (the golden padding ladder lands on the overlay primitives)

<!-- AZ-form freshness headers (the cardinal-lesson freshness clause reads these) -->
<!-- surface-paths: src/components/ui/dialog/DialogContent.vue,src/components/ui/dialog/DialogScrollContent.vue,src/components/ui/sheet/index.ts,src/components/ui/toast/Toast.vue,src/components/ui/popover/PopoverContent.vue,src/components/ui/hover-card/HoverCardContent.vue,src/components/ui/drawer/DrawerHeader.vue,src/components/ui/drawer/DrawerFooter.vue -->
<!-- surface-hash: bbf83e3f8959bd63aca258fd417615b0f2797c889eb8b58955dfa5d430d5255a -->
- **Arm**: 2 — THE OVERLAY BAND (of BB.W-CARD-PAD; arm 1 owns the Card band + the gate)
- **Capture date**: 2026-06-17
- **Branch / base commit**: `tranche/BB` @ `6b0ba06f` (pre-impl HEAD; this arm's edits in the working tree)
- **Gate**: `proof:card-padding` (arm 1 OWNS the gate; this arm's clauses C1-C4 cover the Card family, C5/C6 overlay clauses verify the `*1.272` derivation + the token names at merge)
- **Typecheck**: `npm run typecheck` — GREEN (vue-tsc --noEmit, both tsconfigs clean)

## The diagnosis (the overlay-band half)

Every overlay primitive paints a uniform `p-6` (24px) or `p-4` (16px) on ALL sides — axis
ratio 1:1, no golden relationship. A dialog/sheet/toast heading hugs the top edge because the
top pad equals the side pad. The fix lifts the BLOCK axis by sqrt-phi (`*1.272`) over the
INLINE anchor, so the heading clears the top by ~30.5px (modal band) / ~20.4px (floating band)
against a 24px / 16px side, while the side margin (the anchor) is preserved.

## The ladder applied (the overlay band)

The overlay band mints `--overlay-pad-inline` (the anchor — the ONE knob that retunes the band)
+ `--overlay-pad-block = calc(var(--overlay-pad-inline) * 1.272)` (sqrt-phi-lifted) ON EACH
overlay primitive's root class chain (self-contained, no global token — arm 1's Card band tokens
are not on this band's cascade path). The sqrt-phi constant `1.272` appears in the `calc()` chain
on every surface — never a flat resolved-rem rebake.

| Surface | BEFORE | AFTER | Inline anchor |
|---|---|---|---|
| `DialogContent.vue` | `gap-4 p-6` (24px all sides) | `gap-4 px-(--overlay-pad-inline) py-(--overlay-pad-block)` — block ~30.5px / inline 24px; `gap-4` between sections STAYS | `--spacing(6)` = 24px (modal band) |
| `DialogScrollContent.vue` | `bg-background p-6` (24px all sides, OFF the glass tier) | `glass-floating px-(--overlay-pad-inline) py-(--overlay-pad-block)` — block ~30.5px / inline 24px + the off-glass `bg-background`→`glass-floating` tier fix | `--spacing(6)` = 24px (modal band) |
| `sheet/index.ts` (`sheetVariants` cva base) | `glass-floating p-6` (24px all sides) | `glass-floating px-(--overlay-pad-inline) py-(--overlay-pad-block)` — block ~30.5px / inline 24px; `gap-4` STAYS | `--spacing(6)` = 24px (modal band) |
| `Toast.vue` | `rounded-panel p-6 pr-8` | `rounded-panel px-(--overlay-pad-inline) py-(--overlay-pad-block) pr-8` — block ~30.5px / inline 24px; `pr-8` STAYS (close-button clearance, overrides the trailing inline pad) | `--spacing(6)` = 24px (modal band) |
| `PopoverContent.vue` (×2 — portal + non-portal) | `glass-floating p-4` (16px all sides) | `glass-floating px-(--overlay-pad-inline) py-(--overlay-pad-block)` — block ~20.4px / inline 16px | `1rem` = 16px (floating band) |
| `HoverCardContent.vue` | `glass-floating p-4` (16px all sides) | `glass-floating px-(--overlay-pad-inline) py-(--overlay-pad-block)` — block ~20.4px / inline 16px | `1rem` = 16px (floating band) |

### The Drawer (non-Card surface — self-contained tokens)

The Drawer is a non-Card surface (`.glass-drawer` recipe owns its base). Its header/footer mint
their OWN self-contained overlay tokens + the intra-header / footer cadence tokens:

| Surface | BEFORE | AFTER |
|---|---|---|
| `DrawerHeader.vue` | `grid gap-1.5 p-4` | `grid gap-(--card-pad-title-gap) px-(--overlay-pad-inline) pt-(--overlay-pad-block) pb-0` — block-top ~20.4px / inline 16px / title-gap ~6.1px (`/2.618`, phi-squared-tight); `pb-0` drops the bottom pad so the header→content breath is owned by the body, not doubled |
| `DrawerFooter.vue` | `mt-auto flex flex-col gap-2 p-4` | `mt-auto flex flex-col gap-2 px-(--overlay-pad-inline) pt-(--card-pad-footer) pb-(--overlay-pad-block)` — inline 16px / footer-gap ~12.6px (`/1.618`, phi-stepped settling cadence) / block-bottom ~20.4px |

The Drawer tokens minted (inline anchor `1rem`):
- `--overlay-pad-inline: 1rem`
- `--overlay-pad-block: calc(var(--overlay-pad-inline) * 1.272)`
- `--card-pad-title-gap: calc(var(--overlay-pad-inline) / 2.618)` (DrawerHeader)
- `--card-pad-footer: calc(var(--overlay-pad-block) / 1.618)` (DrawerFooter)

## §0 re-ground drift (the binding honesty note)

- **DrawerContent.vue is OUT of this arm's declared bounds.** The arm brief named the
  DrawerContent root as the mint site for the Drawer's self-contained tokens, but the disjoint
  file bounds list ONLY `DrawerHeader.vue` + `DrawerFooter.vue`. Editing DrawerContent.vue would
  violate the disjoint-bounds rule. RECONCILED: the Drawer's self-contained overlay/cadence
  tokens are minted DIRECTLY on the DrawerHeader + DrawerFooter roots (the elements this arm
  owns) — each consumer mints exactly the tokens it reads. This is self-contained and in-bounds,
  with the same painted result (header/footer are the only two padding consumers; DrawerContent
  itself carries no padding — it is the `.glass-drawer` recipe host + the snap-translate
  transform). The `*1.272` / `/2.618` / `/1.618` derivations match the spec verbatim.
- **The Drawer was JUST rebuilt on reka (BB.W-DRAWER-ABROGATE).** DrawerHeader / DrawerFooter
  are clean house SFCs at HEAD (`grid gap-1.5 p-4` / `mt-auto flex flex-col gap-2 p-4`), as the
  brief noted — no drift from the cited shape.
- **Arm 1 (Card band) has NOT landed yet** — `--card-spacing` is still live on `Card.vue:164`
  and no `--card-pad-*` / `--overlay-pad-*` tokens exist globally at HEAD. The overlay band's
  tokens are therefore self-contained per surface (the correct shape regardless — the overlay
  primitives are portaled and do not inherit a Card root's cascade).
- **The Tailwind v4 mint idiom matches Card.vue** — `[--overlay-pad-inline:--spacing(6)]`
  mirrors the live `[--card-spacing:--spacing(6)]` on `Card.vue:164` (the `--spacing()` native
  function for the modal band; a literal `1rem` for the floating/drawer band per the brief).
- **Popover** reads `--overlay-pad`, NOT the dead `--panel-padding-roomy` (arm 1 deletes that
  token; a grep over the overlay-band files at HEAD found ZERO `panel-padding`/`card-spacing`
  references, so no stale consumer to re-point).

## Verification

- `npm run typecheck` — GREEN (no errors; the class-string edits + the cva base edit are
  type-transparent).
- The orchestrator runs the ONE consolidated `vite build`; this arm did NOT run it (per rule 4).
- Born-RED→GREEN: the gate (arm 1) is born-RED at HEAD (no surface carries the `*1.272` block
  derivation); after this arm's edits every overlay primitive carries the
  `calc(var(--overlay-pad-inline)*1.272)` block axis (C5 overlay clause GREEN at merge).
