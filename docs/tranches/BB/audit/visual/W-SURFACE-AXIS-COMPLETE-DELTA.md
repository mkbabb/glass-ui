# BB.W-SURFACE-AXIS-COMPLETE — DELTA (the binding π readback + gestalt verdict)

**Wave**: BB.W-SURFACE-AXIS-COMPLETE — the R8-12 enrollment finished (Toast + Button join the shared {glass·veil·opaque} axis) + the CLAUDE.md doc-lie killed
**Captured**: 2026-06-16 over the W-DARK-MATERIAL-corrected register (Batch 1 landed)
**Route**: `/feedback/toast` + `/display/buttons` (the gestalt-roster glass-feedback band rows) / `/containers/dialog` for the synthetic-fixture π
**Backdrop**: a synthetic 4-stop busy gradient (`#1b2a4a → #7a3b8f → #c14b3a → #d8c14a`) — the floating-tier-collapse worst case
**Frames**: `W-SURFACE-AXIS-rungs-light.png`, `W-SURFACE-AXIS-rungs-dark.png` (the rung capture; the existing BA fixture capture extended by the Toast/Button arms)

## What landed (the source thread)

The shared seam (`_shared/useSurfaceAxis.ts` + `surface-axis.css`) was ALREADY correct
at HEAD (BA.W-SURFACE-AXIS, 4.0.0); this wave THREADS the existing resolver onto the
two surfaces R8-12 named verbatim and stopped short of:

- **Toast** (`Toast.vue`) — `surface?: Surface` (default `glass`) → `surfaceClass(surface, "floating")`
  base + the `:data-surface` binding. ORTHOGONAL to + composes WITH the W-FEEDBACK-TONE
  `variant` tone arm (the tone tint rides ON the resolved glass surface, unchanged). The
  `glass` default emits the bare `glass-floating` — byte-identical to HEAD. The queue field
  `surface?: Surface` (`use-toast.ts` `Toast` interface) forwards through `Toaster.vue`'s
  per-toast `v-bind="toast"` exactly like `variant`.
- **Button** (`Button.vue`) — `surface?: Surface` (default UNSET — `variant` owns Button's
  default) → `:data-surface` binding (the Card attr path) + the bare decoration class
  (`veil-surface` / `glass-opaque`) composed through `cn()` alongside `buttonVariants`. NOT
  a forced `glass-${tier}` base (that would clobber the variant register). `surface="opaque"`
  and the `solid` variant are the SAME `--glass-level:0` endpoint reached from two axes — NOT
  duplicated recipes; `surface` is the cross-cutting axis the variant cannot reach.

No second axis (W1 anti-fork law honored — the seam is unchanged), no new tokens, no alias.
`Surface` was already published on `@mkbabb/glass-ui/api` — the two new consumers reuse the
same union; no new api symbol.

## The π readback (`tests-visual/surface-axis.spec.ts` — extended arms, BOTH modes × 2 viewports)

| arm | assertion | result |
|---|---|---|
| (a-c) | the synthetic floating-tier rungs: glass/veil translucent (α<1), opaque solid (α=1), veil borderless — the nine-surface baseline | PASS (BA, unchanged) |
| (f-toast) | Toast `glass`/`veil` translucent (α<1), `opaque` solid (α=1), `veil` borderless over the busy backdrop | OWED to the close battery (`--run pi` at `:5199`) |
| (f-button) | Button `glass`/`veil` translucent (α<1), `opaque` solid (α=1), `veil` borderless over the busy backdrop | OWED to the close battery |
| (g) | a TONED toast (`feedback-tone-destructive` + `surface="glass"`) reads as colored GLASS — the tone tint rides ON the resolved translucent surface (tone⊥surface) | OWED to the close battery |
| (d)/(e) | skeleton over-glass / control REST tier — the nine-surface baseline | PASS (BA, unchanged) |

The new Toast/Button/toned arms are authored and run under `--run pi` locally against the
live `:5199` demo; the captured live frames + the per-rung α readback are the **close-leg**
(the live paint is the binding visual truth, owed to W-REFLECT3 / the close battery per the
wave's §Hard Gate item 3 — born-RED until the orchestrator's unified π run + capture).

## The device-free CI half (`proof:surface-axis` — GREEN at close)

```
W1 axis factored ONCE         : YES  (forks veil:0 opaque:0)
W2 resolver published         : YES
W3 eleven surfaces thread axis: YES  (count:11 unwalled:YES skel-glass:YES)
W4 Dialog clean break         : YES
W5 control REST tier unified  : YES
W6 paper-ink-mark register    : YES  (consumers:2)
W7 doc claim is HONEST        : YES  (toast:YES button:YES)   ← after the orchestrator applies the claudeMd request
```

- **W3** grew from nine → ELEVEN (the roster-count fact is the anti-evasion floor — a
  re-freeze at nine reds). Toast + Button each thread the axis (a `surfaceClass(` call /
  `data-surface` binding).
- **W7** (new) — the doc-honesty bite: every `<Toast surface=…>` / `<Button surface=…>`
  example in CLAUDE.md must reference a prop the SFC actually DECLARES. RED at HEAD pre-wave
  (CLAUDE.md:400 documented `<Toast surface="veil">` while Toast.vue declared no `surface`
  prop — the P-5 doc lie). The `button` arm of W7 is **orchestrator-pending**: it flips GREEN
  once the orchestrator applies the `claudeMd` sharedFileRequest (adds the `<Button surface=…>`
  example + the eleven-surface enumeration). The `toast` arm is GREEN at close (the existing
  `<Toast surface="veil">` example + the now-declared prop).

## The gestalt verdict (`proof:ba-gestalt` glass-feedback band — owed to W-REFLECT3)

The whole-page glass-feedback band capture (`/feedback/toast` + `/display/buttons`, BOTH
modes, over the real backdrop) + the recorded gestalt VERDICT ("do Toast and Button now
speak the same {glass·veil·opaque} material as the other nine?") is owed to W-REFLECT3
(Batch 7), the single authorized verdict-flipper. The roster row is unchanged (Toast/Button
are already in its routes). Born-RED in the gestalt OR until the Batch-7 capture flips it.
