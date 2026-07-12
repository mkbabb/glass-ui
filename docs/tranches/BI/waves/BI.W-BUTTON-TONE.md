# BI.W-BUTTON-TONE — Button.destructive migrates to the tone axis (destructive IS a tone)

Band B8 (Kronecker factorization). Design: D-FACTOR (PASS-4B ruling 5 — the Button.destructive disposition,
the gate's own scope-mismatch resolved).

## §Mandate

Discharges: UF-P7 (the Kronecker factorization + synonym de-duplication applied to the library's oldest
component). Registry: FAM-10 mechanism-distinctness (a tone concept must be its own axis, not a variant
member). The pass-4b `proof:variant-residual` flagged `button:destructive` as one of its 6 born-RED
residuals — the ruling 5 decision is what GREENs that clause.

## §Design

Decided (PASS-4B ruling 5 — "destructive IS a tone"): Button.destructive migrates to the tone axis
(`tone="destructive"`); `variant` is reserved for STYLE members ONLY (solid/outline/ghost/glass/link). The
Kronecker discipline applies to the library's oldest component too — a destructive intent (a tone) hiding
in a style `variant` is the exact residual the tone axis exists to hold. The pass-1 rename law scoped
`type→tone` to Notification/Alert/Toast/Badge; ruling 5 EXTENDS the tone axis to Button (the decision the
gate's GREEN-condition required and that did not exist before the ruling).

## §Work

- `src/components/ui/button/index.ts` — drop `destructive` from the `variant` CVA map (`:113-114`); add a
  `tone: "neutral" | "destructive"` axis (the destructive fill/hover/active/aria-pressed rules move onto
  the tone arm). `variant` retains solid/outline/ghost/glass/link + the audacious style keys; `default`
  variant unchanged (`:223`).
- Every `<Button variant="destructive">` call site → `<Button tone="destructive">` (clean break, no alias;
  MIGRATION row → W-FACTOR-ASKS).
- `/api`: `ButtonVariants` re-derives; publish the `tone` axis (lockstep → W-SYNONYM-RENAMES).

## §Acceptance

Gate: **`proof:variant-residual`** (authored in W-AXES-GATES; the `button:destructive` residual).
- The `button:destructive` residual (BORN-RED at HEAD — `destructive` is a live `variant` map member):
  GREEN when `destructive` is a `tone` value, DEFINITION-ABSENT from the `variant` map, and no size/tone/
  surface concept hides in the `variant` map.
- Regression: the four-state contract (standard/hover/active/disabled) holds on the destructive tone; the
  A11Y-1 `.text-destructive-foreground` contrast is unaffected (its emission fix is the demo-source-scan
  wave's, not this one).
- Self-test bite: a synthetic re-added `destructive` variant member REDs.

## §π/DELTA

Byte-diff: `<Button tone="destructive">` ≡ the retired `<Button variant="destructive">` at every state,
BOTH modes (0 delta — the CVA rows move, the paint is identical). DELTA folded into `W-SYNONYM-RENAMES-DELTA.md`.

## §Obligations

- None device-specific (compile-time CVA move). The consumer call-site migration → W-FACTOR-ASKS.

## §Dispositions

- Terminalizes the Button.destructive disposition (PASS-4B open decision): **MIGRATED** to `tone="destructive"`;
  `variant` reserved for STYLE members. Clean break, no alias. No re-book.
