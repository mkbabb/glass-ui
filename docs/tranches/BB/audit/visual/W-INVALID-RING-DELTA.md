# W-INVALID-RING — the four divergent aria-invalid recipes collapse onto ONE register

The `aria-invalid` destructive ring was THREE divergent recipes for ONE register
(the AW.W26 chronic, audit lane L28) plus a latent fourth gap. This wave mints
ONE token — `--invalid-ring`, the `--focus-ring-shadow` sibling — and routes every
form-control surface through it.

## §0 RE-GROUND (re-grepped at HEAD `881f27d`)

The four divergences confirmed as recorded (no drift on the source anchors):

| # | recipe | file:line (HEAD) | the divergence |
|---|---|---|---|
| 1 | `.input-pill` focus-gated ring (the register home) | `glass/surfaces.css:290-294` | the canonical recipe, ring `35%`/`--focus-ring-width` spelled INLINE (the first of four hand-copies); the token to factor lived nowhere |
| 2 | SelectTrigger inline arbitrary | `select/SelectTrigger.vue:112` | the SAME `0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) 35%, transparent)` re-spelled as a Tailwind arbitrary; ALWAYS-ON (not focus-gated), `[aria-invalid]` attr ONLY |
| 3 | ComboboxInput text-only tint | `combobox/ComboboxInput.vue:37` | a different register — `text-destructive` + `60%` placeholder tint, NO ring/border/bg |
| 4 | TagsInput — the FOURTH gap | `tags-input/TagsInput.vue:26` | the `--control-surface-*` REST consumer carried ZERO invalid arm (`grep -c "aria-invalid\|user-invalid" → 0`) — silently no ring |

The mint target (`tokens/scale-paper.css:65-68`, `--focus-ring-shadow`) and the gate
(`scripts/proof-input-invalid-aria.mjs`, AW.W18, `.input-pill`-scoped) confirmed at
HEAD. **§0 drift: none** — every cite landed where the spec recorded it (the
SelectTrigger arbitrary at `:112`, the ComboboxInput tint at `:37`, the TagsInput
root at `:26`, the mint sibling at `:65-68`).

## The unify (this wave — structural factor-out, byte-identical paint)

1. **`--invalid-ring` minted ONCE** (`tokens/scale-paper.css`, the `--focus-ring-shadow`
   sibling, same `:root`):
   ```css
   --invalid-ring-tint: 35%;                /* the documented retint knob */
   --invalid-ring: 0 0 0 var(--focus-ring-width)
       color-mix(in srgb, var(--destructive) var(--invalid-ring-tint), transparent);
   ```
   Reuses the SAME `--focus-ring-width` geometry (one ring, two tints), parameterized
   on ONE knob (`--invalid-ring-tint`, default `35%` so the focused-Input ring is
   byte-identical), resolves `var(--destructive)` so W-DARK-INK-WARM's dark
   `--destructive` re-anchor flows through automatically (coordination only — no edit owed).

2. **The `.input-pill` ring arm reads the token** (`glass/surfaces.css:290-294`) — the
   inline `box-shadow: 0 0 0 var(--focus-ring-width) color-mix(…)` → `box-shadow:
   var(--invalid-ring)`. The `:279-282` at-rest `8%` glass-tint bg arm STAYS surface-local
   (it is the resting decoration, not the shared ring). The inheritors (Input/Textarea/
   NumberField) compose `.input-pill` — NO per-SFC edit.

## The §Divergence-decisions resolutions

| axis | the decision (resolved at execution) |
|---|---|
| **ring gating** | UNIFIED onto the `.input-pill` `:focus-visible` gate as the family default. SelectTrigger's always-on ring → `focus-visible:aria-invalid:`/`focus-visible:user-invalid:` (a long form is not a wall of always-on red rings — the over-loud register `:user-valid` is kept subtle to avoid). The at-rest destructive BORDER stays so an invalid picker reads before focus. |
| **trigger group** | UNIFIED onto the three-member group wherever the surface supports it. SelectTrigger + TagsInput carry `aria-invalid:` + `user-invalid:` (the widened group); `.input-pill` keeps its full `:where(:user-invalid, .user-invalid-fallback, [aria-invalid="true"])` (AW.W18, unchanged). Reka renders Primitive roots that forward the consumer's `aria-invalid` attr to the styleable node, so the attr arm reaches; `user-invalid:` (Tailwind v4 built-in) covers native-constraint validity. |
| **supplementary cue** | The RING is the shared register. ComboboxInput's `text-destructive` + `60%` placeholder tint STAYS as the supplementary non-color-redundant cue (NOT a substitute for the ring — the divergence being closed). The `.input-pill` `8%` glass-tint bg stays surface-local. |

3. **SelectTrigger** (`SelectTrigger.vue`) — `aria-invalid:shadow-[…35%…]` → `focus-visible:aria-invalid:shadow-(--invalid-ring)` + `focus-visible:user-invalid:shadow-(--invalid-ring)`, keeping `aria-invalid:border-(--destructive)` + adding `user-invalid:border-(--destructive)`.

4. **ComboboxInput** (`ComboboxInput.vue`) — the borderless `bg-transparent` input has no own border to ring, so the shared `--invalid-ring` is ROUTED onto the ring-bearing WRAPPER ROW (it carries `border-b`) via `:has([aria-invalid='true'])`/`:has(:user-invalid)` reaching the descendant input's attr — `has-[[aria-invalid='true']]:shadow-(--invalid-ring)` + the `:user-invalid` twin + the matching `border-(--destructive)` arms + `rounded-input` so the ring reads as a rounded box. The input's `text-destructive`/`60%` placeholder tint STAYS as the supplementary cue. This is the §Divergence-decisions recorded route for the borderless input — NOT a kept text-only fork (the Triumvirate Dispatch shape-reveal did NOT fire: the wrapper row carries a coherent destructive cue off the SAME token, no net-new recipe).

5. **TagsInput** (`TagsInput.vue`) — the fourth-gap close: `aria-invalid:border-(--destructive) user-invalid:border-(--destructive) aria-invalid:shadow-(--invalid-ring) user-invalid:shadow-(--invalid-ring)` on the `--control-surface-*` root. The `[aria-invalid]` attr is the trigger floor (reka does not surface a `:user-invalid` pseudo on the styleable non-form `div` root); `user-invalid:` is carried for engines that do.

## Verification

- `proof:input-invalid-aria` born-RED→GREEN. **Born-RED at HEAD: 11 violations** (W1
  the token does not exist, W2 all four surfaces carry the inline recipe / no ring,
  W3 SelectTrigger+TagsInput attr-only-or-none, W4 TagsInput no arm). **GREEN at close**:
  AW.W18 `.input-pill` three-member group + destructive-intact PASS (the base superset
  preserved); W1 minted-once-in-scale-paper + `--focus-ring-shadow`-shape PASS; W2 all
  four surfaces read `--invalid-ring` + ZERO inline ring re-spell PASS; W3 three-member
  group where supported PASS; W4 TagsInput invalid arm PASS; self-test bite holds.
- **The W2 anti-evasion bite** — `INLINE_RESPELL_RE` is SCOPED to the box-shadow RING
  geometry (`0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) …)`, any
  whitespace incl. newlines), so it bites a fifth ring re-paste (the self-test proves it
  flags a synthetic SelectTrigger re-spell) WITHOUT false-flagging the `.input-pill` `8%`
  bg arm or ComboboxInput's kept `60%` placeholder TEXT tint (both verified: GREEN, no
  false hit).
- `npm run typecheck` (vue-tsc, both configs) GREEN — the three SFC class-string edits
  compile (`shadow-(--invalid-ring)` is the house arbitrary-property-via-custom-property
  form, cf. `bg-(--…)` in TabsIndicator/alert; `user-invalid:` is a Tailwind v4.3.1
  built-in variant; `has-[[aria-invalid='true']]:` is the standard `:has()` form).
- `npm run proof:gate-script-parity` GREEN — no new gate key (extension), 0 new orphan/dangling.

## The binding π

Per BA inv-4 the binding live capture + the `proof:ba-gestalt` forms-band gestalt
verdict ride **W-REFLECT3 (Batch 7)** with the AZ-form surface-hash freshness header.
The π readback: a live `/forms/*` capture with each of the four control surfaces driven
`aria-invalid="true"`, both modes, and a paired `getComputedStyle` readback proving the
RESOLVED `box-shadow` (or the routed wrapper-row ring) carries `var(--destructive)` at
the `--invalid-ring-tint` strength across ALL FOUR — Input, SelectTrigger, ComboboxInput,
TagsInput reading the SAME destructive ring (the reka-binding-miss silent-no-op class
reds: the ring wired in CSS but the attr never reaching the styleable node). The
per-mechanism gate GREEN + typecheck GREEN are this token-consolidation wave's close
floor; the painted-truth π + the gestalt verdict are W-REFLECT3's binding evidence.
