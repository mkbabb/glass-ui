# AY.W-SCALE1 — EXTEND `--ui-scale`: a desktop-fluid BODY/CONTROL type ladder

**Tranche:** AY (glass-ui). **Band:** scale/comfort. **State:** OPEN.
**Repo:** `/Users/mkbabb/Programming/glass-ui`.
**Authored pursuant to** `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md`
(defect → objective → file:line edit-sites → evidence-backed HARD GATE; no
grep-only / "API exists" gate for a runtime feature; zero-deferral).
**Hardening inputs:** `audit/hardening/H-touch-scale.md` (Finding 3 — the
desktop half is UNMET), `audit/hardening/H-precept-drift.md` (F2 — EXTEND
`--ui-scale`, do NOT fork a parallel axis), `audit/hardening/H-a11y-perf.md`
(H-5 — the type-scale axis must cover mobile AND desktop per corpus #4).

---

## Goal criterion

The desktop half of corpus item #4 ("font-size general increase on mobile AND
desktop, idiomatic + modern + non-contrived") is satisfied: the BODY/CONTROL
type ladder grows GENTLY with the viewport on a wide desktop screen — a fluid
`clamp()` base on the body/control rungs — so a 27" display paints a measurably
larger control/body font than the fixed-14px-rem baseline, WITHOUT a media-query
staircase, WITHOUT forking a new axis, and WITHOUT disturbing the φ-display
ladder identity or the `--ui-scale` comfort axis already shipped at AX.W51 D18.

## Completion criterion

The HARD GATE below verifies, by artefact: (1) the source extension (the
`clamp()` lands on the body/control `--type-*` rungs only, the φ-display
exclusion + the `--control-text` comfort calc both preserved, no double-vw); (2)
a live π readback at a WIDE viewport measuring the resolved control/body font
LARGER than at a narrow viewport AND larger than the prior fixed-rem baseline (a
captured font-grew DELTA); (3) the `proof:ui-scale` source gate stays GREEN (the
extension did not break the shipped structure, the φ guard, or the comfort
reconcile); (4) the PROGRESS `live-verified` row is backed by a real on-disk PNG
DELTA so `proof:live-verified-ledger` stays GREEN.

---

## The verified defect (file:line)

The `--ui-scale` comfort system SHIPPED at AX.W51 D18 (`tokens.css:1172,
1184-1205, 1785-1788`; `proof:ui-scale` green). It grows every control on the
COARSE-pointer touch axis (the `1.5×` lift at `tokens.css:1785-1790`) — the
MOBILE half of corpus #4. **The DESKTOP half is UNMET.**

1. **The φ-DISPLAY ladder is the ONLY fluid ladder.** `typography.css:108-119`
   the `--type-display-*` rungs are `clamp(<min>, <pref> + <vw>, <max>)` — they
   grow with the viewport. The hero scales on a wide screen.

2. **The BODY/CONTROL rungs are FIXED rem.** `typography.css:99-107`:
   ```
   --type-admin-label: 0.625rem;  /* 10px */
   --type-micro:       0.6875rem; /* 11px */
   --type-caption:     0.75rem;   /* 12px */
   --type-small:       0.875rem;  /* 14px */
   --type-body:        1rem;      /* 16px */
   --type-prose:       1.125rem;  /* 18px */
   --type-subheading:  1.272rem;  /* 20.4px */
   --type-heading:     1.618rem;  /* φ   */
   --type-title:       2.058rem;  /* φ^(3/2) */
   ```
   These do NOT grow with the viewport — fixed at every desktop width.

3. **The painted control font is therefore flat-14px on desktop.**
   `tokens.css:1197` `--control-text: calc(var(--type-small) * var(--ui-scale))`
   = `calc(0.875rem * 1)` = **14px at every desktop viewport** (`--ui-scale`
   stays the identity `1` on fine-pointer; the coarse 1.5× lift is mobile-only).
   A 14px control font on a 27" display is exactly the "font too small on a big
   display" the user flagged (the AX.W51 RED-3 the source comment at
   `tokens.css:1189` cites). The system hands the consumer a knob (`--ui-scale`
   override) but ships the SAME tight desktop default — the un-fixed half.

**Why the naive fixes are wrong (the two traps the spec must avoid):**

- **TRAP A — fork a parallel axis.** Minting a new `--touch-target`/font axis
  re-lands the AX.W51 system and violates F2 + the user's reconcile intent ("the
  retro-reconcile, NOT a parallel 1.5×") + the DRY/no-parallel-recipe precept.
  The fix MUST extend the existing `--type-*` → `--control-text` path.
- **TRAP B — double-vw under coarse.** If the fluid term lands as
  `--control-text: calc(clamp(…vw…) * var(--ui-scale))`, then under coarse
  (`--ui-scale = 1.5`) the viewport term itself is multiplied 1.5× — the font
  grows on BOTH the viewport axis AND the comfort axis at once on a wide tablet,
  an over-scale. The vw term must live in EXACTLY ONE place (the `--type-*`
  rung) and the comfort scalar must multiply it EXACTLY ONCE.

**The φ-display exclusion that the fix must honor.** `tokens.css:1157-1161`
deliberately EXCLUDES the φ-display ladder (`--type-display-*` / `--type-title`
/ `--type-heading` / `--type-subheading`) from `--ui-scale` — "a hero/title is a
TYPOGRAPHIC identity, NOT a touch target." `proof:ui-scale` check #7
(`display-ladder-untouched`, `scripts/proof-ui-scale.mjs:226-240`) FAILS if a
`var(--ui-scale)` factor leaks into any of those rungs. The fluid body extension
is on a DIFFERENT axis (viewport `vw`, not the `--ui-scale` comfort factor), so
it does NOT trip that guard — but the spec records the reconcile explicitly: the
body/control rungs gain a `clamp(…vw…)` (a TYPOGRAPHIC fluid base), the
`--ui-scale` factor stays OUT of every `--type-*` rung (it multiplies LATER, at
`--control-text`), and the φ-display rungs are untouched.

---

## Objective

Land a fluid `clamp()` base on EXACTLY the four BODY/CONTROL `--type-*` rungs —
`--type-caption` (`typography.css:101`), `--type-small` (`:102`), `--type-body`
(`:103`), `--type-prose` (`:104`) — so the control/body register grows gently with
the viewport on desktop, reconciled with BOTH (NOT the surrounding φ-identity rungs
`--type-subheading`/`--type-heading`/`--type-title` at `:105-107`, NOR the
micro-labels `--type-admin-label`/`--type-micro` at `:99-100`):

- the φ-display exclusion (the vw fluidity is on the typographic base, NOT the
  `--ui-scale` comfort factor; the φ-display rungs stay as they are), AND
- `--ui-scale` (the comfort scalar continues to multiply the resolved
  `--type-small`/`--type-caption` ONCE at `--control-text`/`--control-text-sm`;
  the vw term lives ONCE in the rung — no double-vw under coarse).

This is an EXTENSION of the shipped AX.W51 system, not a new axis.

---

## Edit-sites (exact)

### E1 — `src/styles/typography.css` — fluid EXACTLY the four BODY/CONTROL rungs

The body/control + φ-identity rungs share the contiguous `99-107` block at HEAD
(verified):

```
99:  --type-admin-label: 0.625rem;  /* 10px — LEAVE (sub-control micro) */
100: --type-micro:       0.6875rem; /* 11px — LEAVE */
101: --type-caption:     0.75rem;   /* 12px — FLUID (--control-text-sm source) */
102: --type-small:       0.875rem;  /* 14px — FLUID (--control-text source) */
103: --type-body:        1rem;      /* 16px — FLUID (global body cascade) */
104: --type-prose:       1.125rem;  /* 18px — FLUID (long-form prose) */
105: --type-subheading:  1.272rem;  /* 20.4px — LEAVE (φ identity) */
106: --type-heading:     1.618rem;  /* 25.9px — LEAVE (φ identity) */
107: --type-title:       2.058rem;  /* 32.9px — LEAVE (φ identity) */
108+: --type-display-* clamp(…) — LEAVE (φ display, already fluid)
```

Edit ONLY the four FLUID rungs above (`:101`, `:102`, `:103`, `:104`). Replace
each fixed-rem value with a `clamp()` whose `<min>` is the current rem value
(byte-equivalent floor at narrow viewports — no shipped-narrow reflow) and whose
`<max>` grows it on a wide viewport. The pattern mirrors the φ-display ladder's
idiom (`clamp(<rem-min>, <rem> + <vw>, <rem-max>)`) but at the body register's
gentler vw slope (a body/control font must grow SUBTLY — the "non-contrived" bar
— not a hero's aggressive vw):

- `--type-small` (`:102`, the `--control-text` source — the workhorse control
  font, the primary target of the user's "too small" complaint) →
  `clamp(0.875rem, <0.875rem-anchored pref> + <gentle vw>, <~1rem-ish max>)`.
- `--type-caption` (`:101`, the `--control-text-sm` source — the quieter rung).
- `--type-body` (`:103`, the global body cascade the `body { font-size }` rule at
  `typography.css:134` inherits).
- `--type-prose` (`:104`, long-form prose).

The `<min>` of every clamp = the rung's current rem (so narrow/mobile is
byte-identical to today — no regression for the already-shipped narrow case; the
coarse 1.5× still lifts the comfort axis on top). The `<max>` is the
"non-contrived" gentle ceiling (a body register grows ~1-2 steps, NOT a φ
leap). The vw coefficient is the single tuning knob; pick a slope where the
control font reads ~16px at the 1280px π-readback viewport and grows toward the
ceiling past ~1920px (so the 27" case the user flagged paints visibly larger).

**Leave UNTOUCHED (the φ-display exclusion + the identity rungs):**
`--type-admin-label` (`:99`), `--type-micro` (`:100`) — sub-control micro-labels
stay a stable fixed metric, fluiding a 10px label is contrived — and the entire
φ ladder `--type-subheading` (`:105`) / `--type-heading` (`:106`) / `--type-title`
(`:107`) / `--type-display-*` (`:108-119`). These are the typographic identity
the `proof:ui-scale` φ-guard protects; do NOT add a clamp or a `--ui-scale` factor
to any of them. (Note the φ-guard regex captures up to the first `;`, and a
`clamp()` carries no `;`, so adding a clamp to `--type-subheading` would NOT
escape the guard — but the rung is OUT of scope regardless: the φ ladder is a
fixed identity, the user's "desktop font" ask is the CONTROL/BODY register.)

### E2 — `src/styles/tokens.css:1197-1205` — KEEP the `--control-text` comfort calc unchanged (the no-double-vw reconcile)

`--control-text: calc(var(--type-small) * var(--ui-scale))` and
`--control-text-sm: calc(var(--type-caption) * var(--ui-scale))` STAY
byte-identical. After E1, `var(--type-small)` already resolves a `clamp(…vw…)`,
so the comfort scalar multiplies the FLUID base ONCE — the vw term is applied
exactly once (in the rung), the `--ui-scale` factor exactly once (here). This is
the explicit no-double-vw reconcile: do NOT inline a second `clamp()` into
`--control-text`, and do NOT multiply the rung by `--ui-scale` at the rung. The
`--ui-glyph` cohort (`tokens.css:1204-1205`) stays as-is (glyphs ride the
comfort axis, not the viewport — a fluid glyph would desync from a `--ui-glyph`
box). Record the reconcile as a comment at `tokens.css:1189-1196` (the existing
`--control-text` header block): "the fluid viewport base lives in `--type-small`
/ `--type-caption` (typography.css §scale); `--ui-scale` multiplies it ONCE here
— no double-vw."

### E3 — `scripts/proof-ui-scale.mjs` — confirm the φ-guard still distinguishes (no edit expected; verify)

Check #7 `display-ladder-untouched` (`:226-243` at HEAD — the comment header
`:227-229`, the `displayLadder`/`tokensDisplay` regex match `:230-235`, the
`displayLeak` test + `add()` `:236-243`) regexes the φ-display rungs
(`--type-(?:display-\d|display-mega|display-hero|display-audacious|title|heading|
subheading)[^;]*;`) for a `var(--ui-scale)` leak. The E1 rungs (`--type-small` /
`--type-caption` / `--type-body` / `--type-prose`) are NOT in that match set and
the clamp carries NO `var(--ui-scale)` — so the guard stays GREEN unchanged.
Check `control-text-derives-scale` (`:86-90` at HEAD) regexes the EXACT
`/--control-text:\s*calc\(var\(--type-small\)\s*\*\s*var\(--ui-scale\)\)/` form —
E2 preserves it verbatim, so it stays GREEN. **No edit to this script is
expected**; if the extension somehow trips a check, that is a scope-reveal trigger
(the wave's hard gate or file bounds are invalidated) — re-spec, do not relax the
guard.

---

## HARD GATE

**Named:** `proof:live-verified-ledger` (the cardinal-lesson forcing function,
`scripts/proof-live-verified-ledger.mjs`) — the close-gate that makes the
`live-verified` PROGRESS flip UN-MINTABLE without a real on-disk `.png` DELTA.
This wave's `live-verified` row REDs unless its DELTA doc references a real PNG.
The DELTA's substantive evidence is the **font-grew readback** below.

The gate is the conjunction of FOUR artefacts (each evidence-bearing, none
grep-only):

1. **The font-grew DELTA (the cardinal evidence — a measured runtime readback +
   captured PNG).** A π readback over the LIVE demo `foundations/typography`
   scene (the route the existing `tests-visual/font-cascade-live.spec.ts`
   already drives; resolved via `resolveScene("foundations", "typography")`)
   loads the page, awaits `document.fonts.ready`, and reads back the resolved
   `getComputedStyle(...).fontSize` of a `--control-text`-bearing control (a
   `.btn-pill` / `<Button>`) AND `getComputedStyle(document.body).fontSize` at
   TWO viewports:
   - **narrow** (e.g. `375×812`, mobile) — the control/body font resolves at (or
     near) the clamp `<min>` (the byte-identical-to-today floor).
   - **wide** (e.g. `2560×1440`, the 27" case the user flagged) — the
     control/body font resolves MEASURABLY LARGER than the narrow read AND
     larger than the prior fixed-rem baseline (control ≥ 14px → strictly > 14px;
     body ≥ 16px → strictly > 16px). The assert: `wide.controlPx >
     narrow.controlPx` by a clear margin (≥ +1px, not float noise) AND
     `wide.controlPx > 14` AND `wide.bodyPx > 16`.
   - A **negative control** (the gate BITES): inject `:root { --type-small:
     0.875rem; --type-body: 1rem; }` (the pre-wave fixed-rem class) and re-read
     at the wide viewport — assert the control/body font now resolves the flat
     14px/16px (proving the gate reds on exactly the class HEAD shipped: a
     fixed-rem control font that does NOT grow on desktop).
   - The wide-viewport state is captured as an on-disk PNG screenshot under
     `docs/tranches/AY/audit/visual/` and the measured narrow→wide px DELTA +
     the paired-π numbers are recorded in `AY.W-SCALE1-DELTA.md`. This is the
     cardinal-DELTA artefact (a captured DELTA, not a commit-message claim).

   Lives at `tests-visual/desktop-fluid-type.spec.ts` (new spec, the
   `tests-visual/` Playwright π lane). The viewport sweep uses
   `page.setViewportSize({width,height})` between the two reads on the same page
   load.

2. **`proof:ui-scale` stays GREEN** (`npm run proof:ui-scale` — the AX.W51
   source structure arm). The extension must not break: the φ-guard
   (`display-ladder-untouched`), the `control-text-derives-scale` exact-form
   check, the `--control-floor` clamp seam, or the dock reconcile. The gate's
   own artefact (`writeGateArtifact` → the `GATE_UI_SCALE_OUT` JSON) records the
   pass. This is the no-regression arm: the desktop-fluid extension rides ON the
   shipped system without forking it.

3. **The reconcile is recorded (no double-vw, no φ leak) — a document
   reconciliation artefact.** The `tokens.css:1189-1196` comment (E2) states the
   vw term lives once in the rung and `--ui-scale` multiplies once here; the
   `AY.W-SCALE1-DELTA.md` records that under the coarse-pointer emulation the
   font grows by the comfort factor ONCE (not vw×1.5 over-scale) — verifiable by
   a third π read at the wide viewport with `hasTouch:true` coarse emulation
   showing the resolved control font = `clamp-at-wide × 1.5`, NOT
   `clamp-at-wide × 1.5 × extra-vw`. (Sanity arm — the coarse read must not
   exceed the fine-pointer wide read by more than the `--ui-coarse-scale` factor
   within tolerance.)

4. **`proof:live-verified-ledger` GREEN** (`npm run proof:live-verified-ledger`)
   — once `AY.W-SCALE1-DELTA.md` references the real PNG from (1), the PROGRESS
   row may flip to `live-verified` and the ledger gate passes (it RED s a
   `live-verified` row with no on-disk DELTA, and it self-tests its own bite
   every run).

**The gate is INSUFFICIENT if** it only asserts a `clamp()` string exists in
`typography.css` (grep-only — TRAP: a `clamp()` could exist with a degenerate
`<max>` == `<min>` and never grow). The binding truth is the **measured
narrow→wide font-grew px DELTA at runtime** (artefact 1) + the captured PNG; the
source/structure arms (2,3) are the no-regression / reconcile guards, never the
sole evidence.

---

## Write-scope + disjointness

- **`typography.css` — SOLE writer.** No other AY wave edits `typography.css`
  (verified). E1 owns it outright.
- **`tokens.css` — SHARED, edit is comment-only + non-overlapping.** Eight AY
  waves touch `tokens.css` (W-CSS1, W-CON1, W-CON2, W-MOTION, W-DOCK2, W-SB3,
  W-SCALE1, W-SCALE2). W-SCALE1's E2 is a COMMENT-ONLY add at the existing
  `--control-text` header block (`:1189-1196`); it does NOT re-declare any token.
  W-SCALE2 reads `--touch-target`/`--control-floor` but does not edit them. The
  `--ui-scale` master + `--control-text`/`--control-text-sm` calc lines
  (`:1197-1198`) stay byte-identical — so W-SCALE1 and W-SCALE2 do not conflict on
  `tokens.css`. Coordinate the integration so the tokens.css writes land on
  disjoint line ranges (the orchestrator merges; no parallel write to the same
  hunk).
- **No playwright.config.ts edit.** W-SCALE1's π readback (the font-grew DELTA +
  the coarse sanity arm) runs on the EXISTING `chromium-headless-new` project via
  inline `page.setViewportSize` + `hasTouch` emulation — it does NOT add a project,
  so it does not contend with W-SCALE2's new `coarse-touch` project edit.

## Out of scope (named successors)

- The off-axis form-control hit-area (Switch/Checkbox/Radio/Slider-thumb/
  TagsInput/MultiSelect-X/picker rows) + the axe `target-size` runtime gate →
  **AY.W-SCALE2** (the residue + the real axe harness; H-touch-scale Findings
  2, 4, 5).
- The AUDIT-LEDGER row-4 status correction ("system shipped AX.W51 D18; AY
  closes the residue", killing the "no system" inflation) → **AY.W-CLOSE1**
  honesty-pass (H-precept-drift F2 + the chronic stale-base reconcile).
- No new touch-floor token is minted by this wave (the `--touch-target` /
  `--control-floor` reconcile is W-SCALE2's, threading the SAME existing token).
