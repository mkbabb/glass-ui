# BB.W-INVALID-RING — the aria-invalid destructive ring is ONE register, minted ONCE the --focus-ring-shadow way; the four divergent recipes collapse onto it

**Name**: W-INVALID-RING - one invalid-ring token, no divergent recipes
**Opens after**: Batch 4 open (runs ‖ W-CARVE3 ‖ W-CANVAS-UNIFY ‖ W-DARK-INK-WARM ‖ W-EYEBROW-UNION — component-family-disjoint bounds per EXECUTION-DAG §4). Depends on Batch 0 landed (a trustworthy gate floor — `proof:input-invalid-aria` runs under the repaired harness).
**Agents**: 1 (a single token-mint + the four-surface re-point; the bounds are a tight, cohesive set — no parallel split warranted)
**Hard gate**: `proof:input-invalid-aria` EXTENDED (born-RED on the extension) — the destructive invalid ring resolves ONE shared token (`--invalid-ring`, minted the `--focus-ring-shadow` way), every form surface (Input/Textarea/NumberField via `.input-pill`, SelectTrigger, ComboboxInput, TagsInput) reads THAT token rather than re-spelling the `color-mix(in srgb, var(--destructive) 35%, transparent)` recipe inline, and the THREE-member trigger group (`:user-invalid` · `.user-invalid-fallback` · `[aria-invalid="true"]`) holds on every surface that supports it. + the binding π readback (each surface paints the SAME destructive ring on `[aria-invalid]`, both modes).
**Status**: SPEC

## Goal criterion

The `aria-invalid` destructive ring is ONE register expressed ONCE. A single shared token — `--invalid-ring` (and its `--invalid-ring-width`/`--invalid-ring-tint` knobs), minted in `tokens/scale-paper.css` as the literal sibling of `--focus-ring-shadow` — carries the ring recipe, and every form-control surface reads `box-shadow: var(--invalid-ring)` (plus the shared `border-color: var(--destructive)`) instead of re-spelling `0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) 35%, transparent)` inline. The three divergent recipes that the charge names (the `.input-pill` focus-gated ring, SelectTrigger's always-on inline arbitrary, ComboboxInput's text-only tint) — plus the fourth latent gap (TagsInput has NO invalid arm at all) — collapse onto the ONE register. A consumer retints every invalid ring library-wide from a single `:root { --invalid-ring-tint: … }` override, the exact token-first axis `--focus-ring-shadow` already grants the focus ring. The chronic since AW.W26 (the divergence the audit lane L28 re-flagged) is MET, not re-booked.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the audit lane's ONE diagnosis (L28 — "the `aria-invalid` destructive ring is THREE divergent recipes for ONE register, chronic since AW.W26"), not a blind re-diagnose (BB invariant — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the four recipes still diverge as recorded; if a cite has drifted (a sibling Batch-4 edit moved a line, a W-DARK-INK-WARM `--destructive` re-anchor touched the token), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the census.

HEAD-verified anchors (re-grepped this authoring — the four divergent recipes for the ONE register):

- **The canonical `.input-pill` recipe (the register's home).** `src/styles/glass/surfaces.css:279-294` — the validity vocabulary on `.input-pill` (Input + Textarea + NumberField, which all compose `.input-pill`): the at-rest border+bg arm (`:279-282`, `border-color: var(--destructive)` + `background: color-mix(in srgb, var(--destructive) 8%, var(--glass-bg-quiet))`) and the focus-gated RING arm (`:290-294`, `box-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) 35%, transparent)`). The three-member trigger group `:where(:user-invalid, .user-invalid-fallback, [aria-invalid="true"])` is correct here (the AW.W18 widen). **The ring is FOCUS-GATED** — it paints only on `:focus-visible`.
- **SelectTrigger's inline arbitrary (recipe #2).** `src/components/ui/select/SelectTrigger.vue:112` — `aria-invalid:border-(--destructive) aria-invalid:shadow-[0_0_0_var(--focus-ring-width)_color-mix(in_srgb,var(--destructive)_35%,transparent)]`. Same `35%`/`--focus-ring-width` NUMBERS as `.input-pill`'s focus arm, but: re-spelled inline as a Tailwind arbitrary (the third hand-copy of the same recipe), the ring is ALWAYS-ON (not `:focus-visible`-gated — diverges from `.input-pill`), no `8%` bg tint, and the trigger group is the `aria-invalid` ATTR ONLY (no `:user-invalid`/`.user-invalid-fallback` — diverges from the three-member group).
- **ComboboxInput's text-only tint (recipe #3).** `src/components/ui/combobox/ComboboxInput.vue:37` — `aria-invalid:text-destructive aria-invalid:placeholder:text-[color-mix(in_srgb,var(--destructive)_60%,transparent)]`. A COMPLETELY different register: tints the TEXT and PLACEHOLDER (`60%` placeholder), NO ring, NO border, NO bg. An invalid combobox input reads NOTHING like an invalid Input — the gestalt divergence the user feels.
- **TagsInput — the FOURTH gap (no invalid arm).** `src/components/ui/tags-input/TagsInput.vue:26` composes the `--control-surface-*` REST register (`border-(--control-surface-border) bg-(--control-surface-bg)`) but carries ZERO `aria-invalid`/`:user-invalid` arm (`grep -c "aria-invalid\|user-invalid" → 0`). The control-family-seam REST tier (W-SURFACE-AXIS scope 7) unified the rest material but never the invalid material; TagsInput is the latent fourth divergence (silently NO ring).
- **The sibling pattern (the mint target).** `src/styles/tokens/scale-paper.css:65-68` — `--focus-ring-width: 2px;` + `--focus-ring-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--ring) 30%, transparent), 0 0 8px color-mix(in srgb, var(--ring) 15%, transparent);` + `--focus-ring: var(--focus-ring-shadow);`. This is the EXACT pattern the CLAUDE.md conventions canonize: "ONE token (`--focus-ring-shadow`) re-tints every focus ring library-wide from a single override, the token-first axis." `--invalid-ring` is its destructive twin.
- **The existing gate.** `scripts/proof-input-invalid-aria.mjs` (AW.W18) — parses `glass.css` (via `readMonolith`), asserts the `.input-pill` invalid-ring selector group carries ALL THREE members AND the recipe resolves `var(--destructive)`. Registered `package.json:731` + `scripts/gates.mjs:772-774` (tags `["local","ci","release"]`). It checks `.input-pill` ALONE — it never reaches SelectTrigger/ComboboxInput/TagsInput, so the divergence sailed past it. This wave EXTENDS it (no new gate key) to assert the SHARED register.

RE-GROUND command set (run all; confirm each of the four divergences + the mint target):

```
sed -n '263,295p' src/styles/glass/surfaces.css                       # the canonical .input-pill validity recipe (the register home)
sed -n '108,116p' src/components/ui/select/SelectTrigger.vue          # recipe #2 — the inline always-on arbitrary
sed -n '32,40p'   src/components/ui/combobox/ComboboxInput.vue        # recipe #3 — the text-only tint
sed -n '18,30p'   src/components/ui/tags-input/TagsInput.vue          # the FOURTH gap — no invalid arm
sed -n '62,69p'   src/styles/tokens/scale-paper.css                   # --focus-ring-shadow — the mint sibling
grep -rn "var(--destructive) 35%\|var(--destructive)_35%\|aria-invalid" \
    src/components/ui src/styles/glass src/styles/utilities            # the full divergence surface (catch any 5th re-spell)
sed -n '60,95p'   scripts/proof-input-invalid-aria.mjs                # the gate to extend (no new key)
grep -n "input-pill\|control-surface" \
    src/components/ui/input/Input.vue src/components/ui/textarea/Textarea.vue \
    src/components/ui/number-field/NumberFieldInput.vue                # the .input-pill inheritors (no per-SFC edit owed)
```

## The defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the divergence |
|---|---|---|---|
| 1 | the register's home — focus-gated ring, three-member group, `8%` bg, `35%` ring | `src/styles/glass/surfaces.css:279-294` | the CANONICAL recipe, but the `35%`/`--focus-ring-width` ring is spelled inline (the first of four hand-copies of the same numbers); the token to factor lives nowhere |
| 2 | SelectTrigger inline arbitrary (recipe #2) | `src/components/ui/select/SelectTrigger.vue:112` | the SAME `0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) 35%, transparent)` re-spelled as a Tailwind arbitrary; ALWAYS-ON (not focus-gated), no `8%` bg, `aria-invalid` attr ONLY (no `:user-invalid`/fallback) |
| 3 | ComboboxInput text-only tint (recipe #3) | `src/components/ui/combobox/ComboboxInput.vue:37` | a different register entirely — tints text+placeholder (`60%`), NO ring/border/bg; an invalid combobox reads nothing like an invalid Input |
| 4 | TagsInput — the FOURTH gap (no invalid arm) | `src/components/ui/tags-input/TagsInput.vue:26` | the `--control-surface-*` REST consumer carries ZERO invalid arm; silently shows no ring on `[aria-invalid]` (the latent fourth divergence the three-recipe count missed) |
| 5 | the gate is `.input-pill`-scoped | `scripts/proof-input-invalid-aria.mjs:60-95` | the AW.W18 gate parses `glass.css` for `.input-pill` ONLY — it never reaches the three SFC recipes, so the divergence was machine-invisible |

So the charge's "THREE divergent recipes" is precisely: the `.input-pill` focus-gated ring (recipe #1, in surfaces.css), SelectTrigger's always-on inline arbitrary (recipe #2), ComboboxInput's text-only tint (recipe #3) — and TagsInput is the fourth, a NO-ring gap. ONE register (the destructive invalid affordance on a form control), four ways of (not) spelling it.

## Scope (gestalt, not a per-SFC patch — the token-first unify)

1. **Mint the `--invalid-ring` register ONCE (the `--focus-ring-shadow` sibling).** Add to `src/styles/tokens/scale-paper.css`, immediately after the `--focus-ring*` block (`:65-68`), the destructive twin:
   ```
   --invalid-ring-tint: 35%;                /* the documented retint knob */
   --invalid-ring: 0 0 0 var(--focus-ring-width)
       color-mix(in srgb, var(--destructive) var(--invalid-ring-tint), transparent);
   ```
   It reuses the SAME `--focus-ring-width` primitive (the rings are one geometry, two tints), parameterizes the tint on ONE knob (`--invalid-ring-tint`, defaulting to the existing `35%` so the focused-Input ring is byte-identical), and resolves `var(--destructive)` so a W-DARK-INK-WARM `--destructive` re-anchor flows through automatically. NO second axis — this is `--focus-ring-shadow`'s twin, declared in the same `:root` block, the same way.

2. **Re-point the `.input-pill` ring arm onto the token (the register home).** `surfaces.css:290-294` — replace the inline `box-shadow: 0 0 0 var(--focus-ring-width) color-mix(in srgb, var(--destructive) 35%, transparent)` with `box-shadow: var(--invalid-ring)`. The `:279-282` at-rest border+bg arm (the `8%` glass-tint fill) STAYS — that is the `.input-pill`-LOCAL resting decoration (a glass-tint substrate the bare-ring surfaces do not carry), NOT the shared ring register; the shared piece is the RING. Byte-identical paint (the token resolves to the same value); the inheritors (Input/Textarea/NumberField) need NO edit — they compose `.input-pill` and inherit the re-pointed ring.

3. **Collapse SelectTrigger onto the register (recipe #2 → the token).** `SelectTrigger.vue:112` — the inline `aria-invalid:shadow-[0_0_0_var(--focus-ring-width)_color-mix(in_srgb,var(--destructive)_35%,transparent)]` becomes `aria-invalid:shadow-(--invalid-ring)` (the Tailwind v4 arbitrary-property-via-custom-property form), keeping `aria-invalid:border-(--destructive)`. The DIVERGENCE-DECISIONS this resolves: the ring now reads the shared token (one recipe), AND — per the register's canon — the trigger group is widened to the full three-member set so an app-driven `:user-invalid`/fallback select rings too (a `[aria-invalid="true"]:not(...)`-style at-rest decision recorded below). SelectTrigger is a single-line picker (not a multi-line text field), so it keeps the always-on ring register a picker wants OR adopts the `.input-pill` focus-gate — the §Divergence-decisions table fixes which; the SHARED TOKEN is the invariant either way.

4. **Collapse ComboboxInput onto the register (recipe #3 → the ring).** `ComboboxInput.vue:37` — the text-only tint (`aria-invalid:text-destructive aria-invalid:placeholder:text-[…60%…]`) is the WRONG register for the family (no ring). The combobox INPUT lives inside a glass-floating command shell, so the destructive cue belongs on the input's own affordance: re-point onto `aria-invalid:shadow-(--invalid-ring)` (the shared ring) — keeping the text-destructive tint as the supplementary non-color-redundant cue IF the input has a visible border to ring; if the bare `bg-transparent` input has no ring-bearing border, the §Divergence-decisions table records routing the ring onto the wrapping `[data-slot="command-input"]` row instead. The binding constraint: an invalid ComboboxInput reads the SAME destructive register as an invalid Input, off the SAME token.

5. **Close the TagsInput gap (the fourth, latent divergence).** `TagsInput.vue:26` — add the invalid arm onto the `--control-surface-*` root: `aria-invalid:border-(--destructive) aria-invalid:shadow-(--invalid-ring)` with the three-member trigger group where reka-ui's TagsInputRoot surfaces it (or the `[aria-invalid]` attr arm at minimum — the §Divergence-decisions table records reka's validity-attr reach). The control-family REST seam (W-SURFACE-AXIS scope 7) unified the rest material; this closes the matching invalid material on the same surface.

6. **Extend `proof:input-invalid-aria` to assert the SHARED register (no new gate key).** The AW.W18 gate stays GREEN on its `.input-pill` three-member assert; this wave ADDS witnesses (below) that the ring resolves the SHARED `--invalid-ring` token and that no surface re-spells the `color-mix(in srgb, var(--destructive) 35%, transparent)` ring recipe inline. Record the register canon in CLAUDE.md (the conventions block — the `--invalid-ring` token-first axis, the sibling of the documented `--focus-ring-shadow` axis).

### Divergence-decisions table (the executor RESOLVES each at HEAD; the shared token is the invariant regardless)

The four recipes diverge on THREE orthogonal axes beyond the recipe-spelling. The wave's binding invariant is the ONE `--invalid-ring` token; the per-axis register CHOICE is resolved at execution and recorded in PROGRESS (each choice is a register-coherence call, not a token fork):

| axis | `.input-pill` (canon) | SelectTrigger | ComboboxInput | TagsInput | the decision |
|---|---|---|---|---|---|
| ring gating | `:focus-visible` only | always-on | (none) | (none) | UNIFY onto the `.input-pill` focus-gate as the family default — a wall of always-on red rings on a long form is the same over-loud register `:user-valid` is kept subtle to avoid (surfaces.css:277). A picker that genuinely wants the always-on ring records the exception. |
| trigger group | three-member (`:user-invalid`·fallback·`[aria-invalid]`) | `[aria-invalid]` attr only | `[aria-invalid]` attr only | (none) | UNIFY onto the three-member group wherever the surface supports `:user-invalid` (a native-constraint select/tags input rings without an app `aria-invalid` write). Where reka-ui does not forward the pseudo-class to the styleable node, the `[aria-invalid]` attr arm is the floor (recorded). |
| supplementary cue | border + `8%` bg tint | border | text + placeholder tint | (none) | the RING is the shared register; the per-surface supplementary cue (the `.input-pill` glass-tint bg, the text tint) stays surface-LOCAL where it reads coherently — but never as a SUBSTITUTE for the ring (ComboboxInput's text-only-no-ring is the divergence being closed). |

This table is the gestalt-not-workaround discipline: the wave does not paper over the divergence with a fourth recipe — it DECIDES the register on each axis and routes every surface through the ONE token.

## Triumvirate Dispatch

- **The shared-token shape cannot carry a surface's need** — e.g. ComboboxInput's `bg-transparent` ring-less input has no border to ring, so `var(--invalid-ring)` (a box-shadow) lands on a borderless box and reads weak. If routing the ring onto the wrapping command-input row (scope 4) cannot land a coherent destructive cue without a net-new recipe, that is a SCOPE-REVEAL, not a license to keep the text-only fork: triumvirate (research the combobox-input affordance, plan-augment the token's reach — e.g. a `--invalid-ring` that pairs a border-color floor — redress). The token stays ONE; a fourth recipe is forbidden.
- **reka-ui binding miss** — if the SelectTrigger/TagsInput `aria-invalid`/`:user-invalid` selector does not REACH the styleable node (reka forwards the attr to an inner element, or the pseudo-class does not propagate — the [glass-ui binding verification] class: stale reka bindings silently no-op, vue-tsc+units miss them, only e2e/π catches), the π readback (below) reds. That is a binding scope-reveal: triumvirate to locate the real styleable surface, do NOT loop on the CSS selector. The π is the e2e catch the memory note mandates.
- **W-DARK-INK-WARM coordination** — that wave (Batch 4, parallel) MAY re-anchor `--destructive` (the dark arm). Since `--invalid-ring` resolves `var(--destructive)` by construction, no coordination edit is owed — but if W-DARK-INK-WARM lands a `--destructive` value change mid-wave, re-run the π over the dark register to confirm the ring still reads (BB inv — capture over the corrected register, never the broken one). A `--destructive` token-VALUE edit is W-DARK-INK-WARM's bound, never this wave's.
- **Diagnostic loop halt** — if a surface still does not paint the ring after the token re-point and three iterations have not isolated whether the failure is a missing trigger-group member, an unreached reka node, or a cascade-layer precedence loss (the inline Tailwind arbitrary vs the `@layer components` `.input-pill` rule — the AZ.W-DOCK-RAIL class), halt and triumvirate; the cascade-win is the suspect.

## Hard Gate

`proof:input-invalid-aria` EXTENDED (no new gate key — the wave adds witnesses to the existing AW.W18 gate, which already reads `.input-pill` via `readMonolith` and parses the SFC class strings). Born-RED on the extension at HEAD (the SFCs re-spell the recipe inline; the token does not exist). The AW.W18 three-member + recipe-intact asserts on `.input-pill` STAY (the gate stays a superset, not a replacement). The new falsifiable witnesses, each red at HEAD pre-wave:

1. **W1 — the register is minted ONCE.** The `--invalid-ring` token exists in EXACTLY ONE place (`tokens/scale-paper.css`), declared as the `--focus-ring-shadow` sibling (reuses `--focus-ring-width`, parameterized on `--invalid-ring-tint`, resolves `var(--destructive)`). RED at HEAD: no `--invalid-ring` token exists. Assert shape: the gate greps the token tree for `--invalid-ring:` and asserts exactly one declaration site, in `scale-paper.css`.
2. **W2 — every form surface reads the token, NONE re-spells the recipe.** The `.input-pill` ring arm, SelectTrigger, ComboboxInput, and TagsInput each carry `var(--invalid-ring)` / `shadow-(--invalid-ring)` for their invalid ring, and ZERO of them re-spell `color-mix(in srgb, var(--destructive) 35%, transparent)` inline. RED at HEAD: SelectTrigger:112 + (the focus arm of) surfaces.css:293 carry the inline `35%` recipe; ComboboxInput carries NO ring. **Bite-tightening (anti-evasion)**: the gate scans the four SFC class strings + the `.input-pill` rule and FAILS on any inline `var(--destructive) 35%`/`var(--destructive)_35%` ring re-spell outside the ONE token declaration — a future agent re-pasting the recipe (a fifth divergence) reds. The POSITIVE arm asserts each of the four surfaces references `--invalid-ring`.
3. **W3 — the three-member trigger group holds where the surface supports it.** The `.input-pill` three-member group stays (the AW.W18 assert, unchanged); SelectTrigger + TagsInput carry the widened trigger group per the §Divergence-decisions table (or, where reka does not reach `:user-invalid`, the `[aria-invalid]` attr arm is present and the gate records the documented floor). RED at HEAD: SelectTrigger + ComboboxInput carry the `[aria-invalid]` attr arm ONLY; TagsInput carries no arm. Assert shape: each surface's invalid trigger is present and is NOT a strict subset of the canon that the §table did not sanction.
4. **W4 — TagsInput has an invalid arm.** `TagsInput.vue` carries an `aria-invalid`/`:user-invalid` ring arm reading `--invalid-ring` (the fourth-gap close). RED at HEAD: `grep -c "aria-invalid\|user-invalid" TagsInput.vue → 0`. Assert shape: the gate asserts ≥1 invalid arm on the TagsInput root referencing the shared token.

**The π binding readback** (the cardinal-lesson DELTA — captured own-surface, both modes, AZ-form freshness headers): a live capture of `/forms/inputs` (or the canonical forms route) with each of the four control surfaces driven `aria-invalid="true"`, and a paired π `getComputedStyle` readback proving the RESOLVED `box-shadow` (or the invalid affordance) is the SAME destructive ring across all four — Input, SelectTrigger, ComboboxInput, TagsInput each resolve a box-shadow whose color-mix carries `var(--destructive)` at the `--invalid-ring-tint` strength, both modes. The binding truth a reka-binding-miss (the ring wired in CSS but never reaching the styleable node — the [glass-ui binding verification] silent-no-op class) would RED. Captured to `docs/tranches/BB/audit/visual/W-INVALID-RING-DELTA.md` with before (the four-recipe divergence) / after (the unified register) frames, both modes, the AZ-form surface-hash freshness header.

**The `proof:ba-gestalt` verdict** (the hardened gate, post-W-GESTALT-GATE2): this is a SMALL-SURFACE register-coherence wave (the forms band), captured WHOLE-PAGE on the forms route, both modes, and judged as a gestalt ("do the four control families read ONE invalid register — the same destructive ring, not three dialects?"). The verdict is recorded with the capture; a source-green/visually-broken gap (the AZ failure class — the token wired but a surface still reading its old divergent recipe) does NOT close. W-REFLECT3 (Batch 7) is the binding verdict-flipper.

W1-W4 are the device-free CI half (`proof:input-invalid-aria` extended); the π readback + the gestalt verdict are the binding visual truth. All must hold for a clean close.

## File Bounds

| File | Access |
|---|---|
| `src/styles/tokens/scale-paper.css` | modify (mint `--invalid-ring` + `--invalid-ring-tint` as the `--focus-ring-shadow` sibling) |
| `src/styles/glass/surfaces.css` | modify (re-point the `.input-pill` focus ring arm `:290-294` onto `var(--invalid-ring)`; the `8%` resting bg arm stays surface-local) |
| `src/components/ui/select/SelectTrigger.vue` | modify (collapse the inline `35%` arbitrary onto `shadow-(--invalid-ring)` + the trigger-group decision) |
| `src/components/ui/combobox/ComboboxInput.vue` | modify (collapse the text-only tint onto the shared ring) |
| `src/components/ui/tags-input/TagsInput.vue` | modify (add the invalid arm reading `--invalid-ring` — the fourth-gap close) |
| `scripts/proof-input-invalid-aria.mjs` | modify (extend with W1-W4 — assert the shared register; the AW.W18 `.input-pill` asserts stay) |
| `CLAUDE.md` | modify (record the `--invalid-ring` token-first axis under the conventions block, beside the documented `--focus-ring-shadow` axis) |
| `docs/tranches/BB/audit/visual/W-INVALID-RING-DELTA.md` | create (the four-surface unified-ring π readback + the born-RED→GREEN gate log) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row + the §Divergence-decisions resolutions) |

Read-IF (cohesion, NOT edited):
- `src/components/ui/input/Input.vue` · `src/components/ui/textarea/Textarea.vue` · `src/components/ui/number-field/NumberFieldInput.vue` — they compose `.input-pill` and inherit the re-pointed ring; NO per-SFC edit owed (read to confirm the inheritance holds).
- `scripts/read-css-monoliths.mjs` · `scripts/gate-output.mjs` — the gate's read/output helpers (read to understand the extension shape; not edited).

Do NOT touch:
- **`--destructive` / `--ring` token VALUES** — the `--invalid-ring` token RESOLVES `var(--destructive)` (so a W-DARK-INK-WARM re-anchor flows through), but this wave changes NO color value (BB clean-break does not apply — there is no value delta; this is a structural factor-out, byte-identical paint at the default `35%` tint).
- **W-DARK-INK-WARM's bound** — the dark `--surface-tint-*` arm + the dark `--foreground`/`--destructive` recipe. Coordination only (re-run the π if `--destructive` moves); no edit.
- **W-EYEBROW-UNION's bound** — the `section-label`/`text-mono-caption`/`glass-menu-section-label` eyebrow union (a disjoint register).
- **The `--focus-ring-shadow` token itself** — the focus ring is its own (correct, already-factored) register; `--invalid-ring` is its sibling, not a re-tune of it.
- **The `.control-surface` / `--control-surface-*` REST register** — that is the W-SURFACE-AXIS scope-7 rest material (the bg/border/blur at rest); this wave touches only the INVALID material on those same surfaces.
- **The standing fences** — GL shader internals (none here); ppmycota purple never enters library tokens (the `--invalid-ring` rides the library `--destructive` identity); the slides/value.js/kf foreign trees.

### Disjointness

ONE agent unit, no intra-wave parallel split (the bounds are a tight cohesive set: one token mint + one CSS re-point + three SFC re-points + one gate extension). Across Batch 4: W-CARVE3 (the three god-modules — `offsets-sizing.css`/`base.css`/`FourierField.vue`), W-CANVAS-UNIFY (`useCanvas2D`/`createCanvasLifecycle`), W-DARK-INK-WARM (the dark `--surface-tint-*`/`--foreground` recipe), W-EYEBROW-UNION (the eyebrow registers) — all bound-disjoint from this wave's form-control + `scale-paper.css` token + `proof-input-invalid-aria.mjs` set. The ONE coordination seam is the `--destructive` token (W-DARK-INK-WARM may re-anchor its dark value); this wave reads it through `var(--destructive)` and never writes it. The registry single-owner rule: this wave owns `proof-input-invalid-aria.mjs` (an EXTENSION, not a new gate key — no `package.json`/`gates.mjs` row add, so no registry-owner contention with the Batch-4 sibling that owns those files).

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the three SFC class-string edits (the Tailwind arbitrary-property form must compile); `npm run build` to confirm `scale-paper.css` emits the `--invalid-ring` token into the `/styles` bundle and the SFC scoped CSS compiles; `node scripts/proof-input-invalid-aria.mjs` born-RED on the EXTENSION before the source edits (proof the new W1-W4 witnesses fail at HEAD while the AW.W18 asserts pass), GREEN at close; `npm run proof:gate-script-parity` after the gate extension (the registry stays sound — no row add, the note may update); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-INVALID-RING-DELTA.md` — the four-surface before/after frames (the divergent recipes → the unified ring) + the paired π readback (each surface's resolved invalid box-shadow carries `var(--destructive)` at `--invalid-ring-tint`, both modes), with the AZ-form surface-hash freshness header.
- The `proof:input-invalid-aria` JSON artefact (born-RED extension log — W1-W4 fail at HEAD; GREEN-at-close log — the shared register holds).
- The `gate-script-parity` output post-extension.
- The `proof:ba-gestalt` forms-band capture + recorded verdict (the W-REFLECT3 binding evidence).

## Commit Plan

- token-mint commit: `feat(tokens): the --invalid-ring register — the destructive sibling of --focus-ring-shadow (BB.W-INVALID-RING)` — names the token + the `--invalid-ring-tint` knob in the body.
- unify commit: `refactor(forms): collapse the four divergent aria-invalid recipes onto --invalid-ring — input-pill/select/combobox/tags-input (BB.W-INVALID-RING)` — names the four-surface re-point + the §Divergence-decisions resolutions in the body.
- gate commit: `test(forms): proof:input-invalid-aria extended — assert the ONE shared invalid register (BB.W-INVALID-RING)` — names W1-W4 + the inline-recipe-respell bite.
- doc/status commit: the CLAUDE.md `--invalid-ring` axis record + the DELTA doc + the PROGRESS row.

## Dependencies

- **Depends on**: Batch 0 (W-CI-GREEN — a trustworthy gate floor; `proof:input-invalid-aria` runs under the repaired harness). No structural dependency on a Batch-1/2/3 surface (the form-control invalid ring is independent of the gestalt/perf/finish-BA bands).
- **Blocks**: nothing hard. It pays down the AW.W26 chronic the BB close (Batch 7 W-REFLECT3 / W-CLOSE) would otherwise flush — the divergent invalid register is exactly the per-mechanism-green/gestalt-broken class the hardened gate must not inherit at the cut.

## Archaeology

The divergence is chronic since AW.W26 (the audit lane L28 re-flag): AW.W18 widened the `.input-pill` ring to the three-member group (the right move for Input/Textarea/NumberField), but the SAME wave's SelectTrigger/ComboboxInput recipes were never reconciled onto a shared register, and TagsInput's `--control-surface-*` REST adoption (W-SURFACE-AXIS scope 7) unified the rest material but never the invalid material. So the register accreted four spellings across three tranches. The new guardrail: the wave mints the token the CLAUDE.md-documented `--focus-ring-shadow` way (the conventions block CANONIZES that exact token-first axis), and the EXTENDED gate's W2 inline-recipe-respell bite forbids a fifth divergence — a future agent re-pasting `color-mix(in srgb, var(--destructive) 35%, transparent)` inline reds. The chronic is MET (one register), not re-booked.

## Named successors

None foreseen — the unify is a complete discharge (one token, four surfaces, the gate forbids re-divergence). The ONE conditional: if the §Divergence-decisions ComboboxInput axis hits the Triumvirate Dispatch shape-reveal (the borderless `bg-transparent` input cannot carry a box-shadow ring coherently and routing onto the wrapping row is itself a register choice the wave cannot cleanly land), the recorded outcome is a triumvirate-augmented `--invalid-ring` reach (a border-color-floor companion on the token) WITH the resolution in BB PROGRESS prose — NOT a kept text-only fork (the explicit guard against re-divergence). The recommendation and the expected outcome is the full four-surface collapse onto the ONE token.
