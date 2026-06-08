# AX.W44 — Dark-mode semantic-token contrast: lift the dark `--destructive` to the AA floor

**Band** G · A11Y · **Severity** major · **dependsOn** AX.W00 (the π visual-runtime lane — the
fail-CLOSED close machinery + the axe `color-contrast` readback this wave closes on) · sequenced
**BEFORE AX.W39** (so W39's dark-mode a11y arm MEASURES the corrected token, not the broken one)
· **Charter** CONVERGENCE-PLAN.md row W44 (line 22) + the live-truth re-open ordering note (line 58 —
"W44 (D10 dark contrast) … visual-truth, real-device-verified") · **Audit**
`docs/tranches/AX/audit/convergence/D10.md` (the source-grounded root cause + the WCAG contrast table
+ the dual-role tension + the dedup proofs).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on three falsifiable witnesses at HEAD `002bda5`. The live witness is the user's
"Session expired" Alert screenshot (D10, capture 15.02.13): dark-red title text on a near-black card,
illegible.

- **RED witness 1 (the headline — the dark `--destructive` is the shadcn STOCK plate value used as
  TEXT, source-true line-probe).** `src/styles/tokens.css` carries the unmodified shadcn-vue dark
  destructive at TWO co-located declarations:
  - `:1460` — `--destructive: light-dark(hsl(0 72% 50%), hsl(0 62.8% 30.6%))` (the
    `@supports (color: light-dark())` enhancement arm; the dark half is `hsl(0 62.8% 30.6%)`).
  - `:1582` — `--destructive: hsl(0 62.8% 30.6%)` (the `.dark` class fallback floor, §2c).

  That value (L≈30.6) is calibrated for ONE role — a saturated PLATE under a light foreground
  (`bg-destructive text-destructive-foreground`) — and was NEVER calibrated as foreground ink. But
  glass-ui's Alert destructive variant uses `--destructive` AS TEXT over a card by design
  (`src/components/ui/alert/index.ts:14` — `'text-destructive bg-card …
  *:data-[slot=alert-description]:text-destructive/90'`, AW.W25 content-band). **Falsifiable RED:**
  *resolve the dark `--destructive` (`hsl(0 62.8% 30.6%)`) and compute WCAG 2.1 contrast vs `--card`
  (`hsl(24 8% 10%)`, tokens.css:1454/1581-region) — at HEAD it is **1.75:1**, far under the 4.5:1
  body floor (RED). After the wave the dark ink-role value clears ≥4.6:1 over `--card` (GREEN).*
  (Math reproduced this wave: 1.75 text/card, matching D10.)

- **RED witness 2 (the plate reads as a muddy dark rectangle off the page — graphic-distinctness
  floor, source-true).** The same dark `hsl(0 62.8% 30.6%)` is the PLATE background
  (Toast/Badge/Notification/Button-destructive) and the plate sits at only **1.91:1** against the
  dark page `--background`/`--card`-region (`hsl(24 8% 6%)`), under the 3:1 WCAG non-text graphic
  floor. **Falsifiable RED:** *resolve the dark `--destructive` and compute contrast vs the dark page
  — at HEAD it is **1.91:1** < 3.0 (RED); the red plate barely lifts off black (the "unreadable
  dark-red on black" the user described). After the wave the plate clears ≥5:1 vs page (GREEN —
  `hsl(0 80% 60%)` measures 5.03).*

- **RED witness 3 (NO gate guards dark-mode semantic-token contrast — gate-blindspot, structural).**
  `grep -l "proof:dark-semantic-contrast\|proof:dark-token-contrast" scripts/` returns NOTHING; the
  only dark-mode-aware a11y gate is W39's measure-only Lighthouse/axe matrix, which has NO band to
  BOOK a token fix to (D10 dedup §W39). No script parses `tokens.css`, resolves the dark
  `--destructive`, and asserts a WCAG floor. **Falsifiable RED:** *the dark `--destructive` can be any
  illegible value and the entire `proof:*` fleet stays green — there is no contrast assertion over the
  resolved dark semantic token. After the wave `proof:dark-semantic-contrast` parses the dark arm,
  computes the ratio, and FAILS CLOSED under any value < the floors (GREEN — the gate exists and is
  load-bearing).*

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN. The defect is
**dark-mode-ONLY** — the light token `hsl(0 72% 50%)` already clears the floor (Alert text over
`--card` = 4.69:1; D10 parity reference). The light `light-dark()` arm + the light `:357` declaration
stay UNCHANGED.

---

## Goal

The dark-mode `--destructive` clears BOTH a11y floors at once — **≥4.6:1 as text over `--card`** (the
Alert/Label/invalid-ring ink role) AND **≥5:1 as a plate vs the dark page** (the Toast/Badge/
Notification/Button-destructive plate role) — re-resolving every `text-destructive` / `bg-destructive`
site library-wide from ONE token override, with ZERO Alert/Notification/Toast SFC edits and ZERO new
component props. The light arm is untouched.

---

## Scope (the gestalt fix — token-first, dark-arm-only, no component edits)

D10's root cause is ONE token in a DUAL role read at the WRONG luminance for dark mode. The fix is a
small token-first transposition in `tokens.css`, dark-arm-only:

1. **Lift the dark `--destructive` to a brighter red that clears BOTH floors (the single-token path —
   PREFERRED).** The D10 contrast table (reproduced this wave) shows `hsl(0 80% 60%)` is the cleanest
   single-token candidate: **4.60:1 over `--card`** (clears the 4.5 body floor) AND **5.03:1 vs the
   dark page** (clears the 3.0 graphic floor with headroom). It leaves the off-white
   `--destructive-foreground` (`hsl(48 10% 90%)`) at 3.07:1 over the plate — fine for the large
   glyph/short-label text the plates carry (no glass-ui surface paints BODY copy directly on the
   saturated plate; Toast/Badge/Notification carry icons + short labels). Update BOTH arms in lockstep:
   - `:1460` dark half — `light-dark(hsl(0 72% 50%), hsl(0 80% 60%))`.
   - `:1582` `.dark` fallback floor — `hsl(0 80% 60%)`.

   The `:1460`/`:1582` agreement is the §2c fallback-floor contract: the `light-dark()` enhancement
   arm and the `.dark` class floor MUST carry the same dark value or a `@supports`-split browser sees a
   different red than a class-toggle one.

2. **Split to `--destructive-text` ONLY if the single value cannot ratify as body text on the live π
   audit (the two-token fallback — the chart-label precedent).** If the live axe `color-contrast`
   readback shows `hsl(0 80% 60%)` (or the ratified value) reads WRONG as a plate (too pink/washed) OR
   the off-white-on-plate 3.07:1 fails the body-label check on any surface that DOES paint label text
   on the plate, mint a SECOND token for the ink role — exactly the two-token discipline glass-ui
   already ships for `--chart-{phase}` (canvas hue, dark L≈0.85) vs `--chart-{phase}-label` (label ink,
   dark L≈0.85 / light L≈0.40, tokens.css:1497/1617) and `--warning` (luminous plate) vs
   `--warning-foreground` (dark glyph). The plate token `--destructive` keeps the saturated-plate role
   (lifted to ~`hsl(0 72% 58%)`, plate/page 4.73); a new `--destructive-text` carries the AA ink
   value (`hsl(0 80% 60%)`+, ≥4.6 over card). Re-point the ink-role consumers (RED-witness-1 sites
   below) from `text-destructive`/`var(--destructive)` onto the ink token. **DECIDE at the π-ratify
   step** — the single-token path is the gestalt simpler one (one path, no second name) and the math
   says it clears every consumer EXCEPT body-on-plate which no surface does; the two-token split is the
   recorded fallback, NOT the default.

3. **Sweep the sibling semantic reds for the same dark-text-on-surface trap (disposition, not
   necessarily a fix).** `--like` / `--delete` / `--accent-red` are oklch and brighter in dark
   (tokens.css:1624/1628/1605). Confirmed this wave: in `src/` they are reachable ONLY via their
   `@theme` color aliases (`--color-like`/`--color-delete`/`--color-accent-red`, theme.css:248/252/232)
   — there is NO `text-[var(--like)]`-over-card consumer site (they are plate/icon hues). RECORD the
   disposition (lower-risk, plate/icon role, no text-over-card consumer at HEAD); FIX only any that the
   axe readback surfaces as a live text-over-card AA miss.

Token-first, component-over-class preserved: ZERO Alert/Notification/Toast/Label/Combobox/Select SFC
edits in the single-token path (the fix re-resolves every consumer from the one token override). The
two-token fallback adds ink-role re-points but mints NO new component props and NO new component — it
is a token + consumer-class re-point, the chart-label-precedent shape.

### The ink-role consumers (the RED-witness-1 surfaces — confirmed this wave)

Every site that reads `--destructive` AS ink (fails at HEAD in dark; the single-token lift fixes them
all from the one override; the two-token fallback re-points these):

- `src/components/ui/alert/index.ts:14` — `text-destructive` title + `text-destructive/90` description.
- `src/components/ui/label/Label.vue:38` — the `required *` glyph (`text-destructive`).
- `src/components/custom/labeled-field/LabeledField.vue:6,13` — `required *` (`text-destructive`).
- `src/components/ui/combobox/ComboboxInput.vue:33` — `aria-invalid:text-[var(--destructive)]` +
  placeholder.
- `src/components/ui/select/SelectTrigger.vue:42` — `aria-invalid:border-[var(--destructive)]` +
  invalid focus-ring.
- `src/styles/glass.css:531-544` — the `.input-pill` `:user-invalid`/`[aria-invalid]` destructive
  border + ring (`var(--destructive)`).
- `src/styles/utilities.css:67,78` — `--field-label-color: var(--destructive)` (the error-region
  label reddening).
- `src/components/custom/status-dot/StatusDot.vue:78` — `error: "var(--color-status-error,
  var(--destructive))"` (icon hue; the off-card status dot — lower-risk, recorded in the sweep).

---

## GREEN target (the exact value)

The ratified single-token target is **`hsl(0 80% 60%)`** in BOTH dark arms:

```css
/* tokens.css :1460 — the @supports light-dark() enhancement arm */
--destructive:  light-dark(hsl(0 72% 50%), hsl(0 80% 60%));
/* tokens.css :1582 — the .dark class fallback floor (lockstep) */
--destructive:  hsl(0 80% 60%);
```

Measured (this wave, reproducing D10): text/card **4.60:1** (≥4.5 body), plate/page **5.03:1** (≥3.0
graphic, ≥5 target), off-white/plate **3.07:1** (≥3.0 large-glyph). The exact L is RATIFIED at the
π-lane axe readback — if a marginal surface needs more headroom the value walks toward `hsl(0 80% 62%)`
(text/card lifts, off-white/plate drops; re-check at ratify) OR the two-token split lands. The light
arm + `--destructive-foreground` are UNCHANGED.

---

## HardGate (born-RED→GREEN — a device-free SOURCE arm + a fail-CLOSED π live arm)

### `proof:dark-semantic-contrast` (NEW — the two-arm gate)

**Arm A — device-free SOURCE/STRUCTURE (the contrast oracle over the parsed token).** A
`scripts/proof-dark-semantic-contrast.mjs` that:
1. Parses `src/styles/tokens.css`; resolves the DARK `--destructive` from BOTH the `light-dark()`
   enhancement arm (`:1460` — the second `light-dark()` argument) AND the `.dark` fallback floor
   (`:1582`); asserts the two arms carry the **same** dark value (the §2c lockstep — a mismatch FAILS).
2. Resolves the dark `--card` (`hsl(24 8% 10%)`) and the dark page `--background`/`--card`-region
   (`hsl(24 8% 6%)`) the same way.
3. Computes WCAG 2.1 sRGB-relative-luminance contrast (hsl→rgb→linearize→luminance→ratio — the
   canonical formula, NO external dep) and ASSERTS: dark `--destructive` (ink role) vs `--card`
   **≥4.6:1**, AND dark `--destructive` (plate role) vs the page **≥5:1**. Under the two-token split it
   asserts `--destructive-text` ≥4.6 over card AND `--destructive` ≥5 vs page.
4. Sweeps the sibling reds (`--like`/`--delete`/`--accent-red`): for each, if a `text-[var(--X)]`
   over-card consumer EXISTS in `src/` (grep), assert ≥4.5 over `--card`; else record `plate/icon-role,
   no text-over-card consumer` (the recorded disposition — not a forced fix).

   This is a SOURCE-RESOLUTION + COMPUTE gate (it resolves the token cascade and computes a number — a
   precept-valid artefact form, NOT "grep found a string for runtime behaviour"). **Born-RED at HEAD**
   (the resolved dark `--destructive` is 1.75 over card / 1.91 vs page — both under floor); GREEN after
   the lift. Bite-check: revert the dark arm to `hsl(0 62.8% 30.6%)` → the gate reddens; desync the
   `:1460` dark arg from the `:1582` floor → the lockstep clause reddens.

**Arm B — fail-CLOSED π live/render (the axe `color-contrast` readback under `.dark`).** A
`tests-visual/dark-semantic-contrast.spec.ts` (the W00 π workspace; sibling to
`substrate-paints-color.spec.ts`) that, on a real device:
1. Navigates the demo Feedback route, toggles `.dark` on `<html>`, mounts the destructive Alert
   ("Session expired" title + description), the Notification-error, and a Toast-destructive surface.
2. Runs `axe-core` scoped to those nodes and asserts ZERO `color-contrast` violations (the
   programmatic AA check axe performs — fail-CLOSED, exit non-zero on any violation, NEVER
   SKIP-with-EXIT=0 when the workspace is present).
3. As the deterministic secondary (axe-independent): `getComputedStyle` readback of the Alert title's
   resolved `color` and the card's resolved `background-color`, recomputes the WCAG ratio in-test, and
   asserts ≥4.6:1 — the same number Arm A computes from source, now read off the LIVE painted DOM
   (closing the source↔render gap — a token that parses fine but is shadowed by a `.dark` override
   would be caught here).
4. At ≥2 viewports (375×667, 1280×800) under `.dark` (and a light cross-check that the unchanged light
   arm still passes). Captures a paired-π BEFORE (HEAD `hsl(0 62.8% 30.6%)` — the illegible 1.75
   readback) / AFTER (the lifted value — ≥4.6 readback) + a `DELTA.md` per the W00 protocol.

**Born-RED at HEAD** (the live axe run flags `color-contrast` on the dark destructive Alert; the
`getComputedStyle` readback computes 1.75); GREEN on the lifted token. **The wave does NOT close on Arm
A alone** — the executed π axe + readback (the user's "Session expired" Alert rendered legible under
`.dark` at ≥2 viewports, captured as the paired-π BEFORE/AFTER + DELTA) is the binding close criterion
(the cardinal AX lesson: real-device truth, never a headless-green proof). Register
`proof:dark-semantic-contrast` in `package.json` + the W00 meta-gate parity (`proof:gate-script-parity`
bijection).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **`:1460`** — lift the `light-dark()` DARK arg `hsl(0 62.8% 30.6%)` → `hsl(0 80% 60%)` (light arg UNCHANGED). **`:1582`** — lift the `.dark` floor `hsl(0 62.8% 30.6%)` → `hsl(0 80% 60%)` (lockstep). Two-token fallback ONLY if ratified: add `--destructive-text` (both arms) at the AA-ink value + keep `--destructive` at the plate value. NO other token row. |
| `src/components/ui/alert/index.ts` | Touched ONLY under the two-token fallback (`:14` `text-destructive` → the ink token); UNTOUCHED in the single-token path. |
| `src/components/ui/label/Label.vue` · `src/components/custom/labeled-field/LabeledField.vue` · `src/components/ui/combobox/ComboboxInput.vue` · `src/components/ui/select/SelectTrigger.vue` · `src/styles/glass.css` · `src/styles/utilities.css` | The ink-role consumers — touched ONLY under the two-token fallback (re-point `text-destructive`/`var(--destructive)` → the ink token); UNTOUCHED in the single-token path. |
| `scripts/proof-dark-semantic-contrast.mjs` | **NEW** — Arm A (parse + resolve + WCAG compute + lockstep + sibling-sweep). |
| `tests-visual/dark-semantic-contrast.spec.ts` | **NEW** — Arm B (axe `color-contrast` + `getComputedStyle` readback under `.dark` at ≥2 viewports; paired-π BEFORE/AFTER). |
| `tests-visual/pi-manifest.ts` | Register the new spec scene in the SCENES manifest (the W00 source-of-truth manifest). |
| `package.json` | Register `proof:dark-semantic-contrast` + the W00 meta-gate parity match. |
| `docs/tranches/AX/audit/W44-dark-mode-semantic-token-contrast.json` | **NEW** — the born-RED→GREEN audit artefact (the 3 RED witnesses + the contrast table + the single-vs-two-token disposition + the sibling-red sweep + the paired-π DELTA reference). |

**OUT of bounds:** the light `--destructive` arm + the light `:357` declaration (UNCHANGED — already
4.69:1); `--destructive-foreground` (UNCHANGED — off-white, 3.07:1 over the lifted plate is fine for
large glyphs); the `@media (forced-colors: active)` block (`utilities.css` — that is **W36**, a wholly
different axis); any Lighthouse/axe ROUTE-MATRIX harness (**W39** — measure-only); the `--warning`/
`--info`/`--success` semantic plates + their foregrounds (already two-token, already AA — not D10's
defect); the top-layer/card-toggle/glass-panel/metric primitives (**W20/W21**).

---

## Disjointness / DEDUP (why no OTHER wave owns this — the convergence finding proved it)

D10's dedup section is the source proof; restated as the exclusion:

- **vs W36 (forced-colors glass-language skin) — NOT a cover, dark-arm IRRELEVANT.** W36 is strictly
  `@media (forced-colors: active)` / Windows-High-Contrast, where the user's FORCED system palette
  supersedes light/dark — its own scope states the `.dark` arm is **IRRELEVANT under WHC**. W36 swaps
  glass chrome for `CanvasText`/`Canvas`/`Highlight` SYSTEM colors and never touches the normal-mode
  `--destructive` token VALUE (confirmed: W36's RED witnesses are about the ABSENT forced-colors
  structure-survival skin in `utilities.css:1084-1102`, not the destructive token). D10 is normal
  dark-mode token contrast (an ordinary dark-theme user, no WHC) — a different axis. W36 does not and
  must not own it.

- **vs W39 (lighthouse perf/a11y route matrix) — DETECTS but does not FIX (measure-only).** W39 runs
  axe/Lighthouse incl. a dark-mode arm and WOULD flag this as a `color-contrast` violation on the
  Feedback Alert route, but W39 is explicitly MEASURE-ONLY (its close clause does NOT touch any library
  `src/**` style — a sub-budget a11y miss caused by a SHIPPED primitive BOOKS to its band, it is NOT
  patched in W39). W39 has NO band to book this to — D10 is the missing RECEIVER wave. W44 is sequenced
  BEFORE W39 so W39's dark arm measures the CORRECTED token. (W39 `dependsOn` the W44 fix; recorded as
  {detector: W39, fixer: W44} per the zero-loss mandate.)

- **vs W20/W21 (primitive fix/recategorize) — disjoint.** Those touch top-layer/card-toggles/
  glass-panel/metric reconcile, not the destructive token or the Alert recipe. No shared file.

- **No existing wave owns dark-mode SEMANTIC-TOKEN contrast.** D10 verified: `grep destructive
  docs/tranches/AX/waves/` returns only W32 (slides) + W25a (god-module gate) — neither touches the
  token VALUE. Re-confirmed this wave: no `proof:dark-semantic-contrast`/`proof:dark-token-contrast`
  script exists; the dark `--destructive` is unguarded. This is a genuine gap.

The gate is file-disjoint from its band-G siblings (W36 owns the forced-colors block; W44 owns the
dark `--destructive` token rows + the new gate + the new π spec). The only shared concern is the π
workspace (`tests-visual/` — W00's; W44 adds a sibling `.spec.ts`, never co-edits another wave's spec).

---

## Dependencies (dependsOn + sequencing)

- **AX.W00 (π visual-runtime lane) — HARD.** Arm B rides the W00 fail-CLOSED π workspace
  (`tests-visual/` + Playwright + the axe `color-contrast` readback); the live-render close is the
  binding criterion. W00 stands up the lane W44 closes on (the `substrate-paints-color.spec.ts` sibling
  pattern, the `pi-manifest.ts` SCENES source-of-truth, the paired-π BEFORE/AFTER + DELTA protocol).
- **Sequenced BEFORE AX.W39.** W39's dark-mode a11y arm must measure the CORRECTED token; if W44 ran
  after W39, W39 would book a `color-contrast` miss with no receiver. {detector: W39, fixer: W44}.
- **No downstream src consumer** beyond the re-resolved `--destructive` reads (the single-token path
  needs no consumer edit; the two-token fallback re-points the ink-role sites listed above — all
  in-repo, no cross-repo leg).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** On the live demo under `.dark`, re-confirm the three
   RED witnesses: the `getComputedStyle` Alert-title readback computes ~1.75 over `--card`; the plate
   reads ~1.91 vs page; no contrast gate guards it. Capture the BEFORE π render (the illegible
   "Session expired" Alert) as the born-RED baseline in
   `audit/W44-dark-mode-semantic-token-contrast.json`. Re-run the contrast math against HEAD's exact
   `--destructive`/`--card`/page values; do NOT proceed on the finding's word — re-prove.
2. **Author the born-RED gate (both arms).** `proof-dark-semantic-contrast.mjs` (Arm A — parse +
   resolve + WCAG compute + lockstep + sibling-sweep) + `dark-semantic-contrast.spec.ts` (Arm B — axe
   `color-contrast` + `getComputedStyle` readback under `.dark`); register in `package.json` +
   `pi-manifest.ts` + the W00 meta-gate. Confirm BOTH FAIL at HEAD.
3. **π-ratify the value (single vs two-token).** Render the candidate `hsl(0 80% 60%)` under `.dark`;
   run the axe readback over Alert / Notification-error / Toast-destructive; confirm the plate reads as
   RED (not washed) and the off-white-on-plate large glyphs pass. DECIDE single-token (preferred) vs
   the `--destructive-text` split. Record the ratify in the audit json.
4. **Lift the dark arms in lockstep.** `tokens.css:1460` dark arg + `:1582` floor → `hsl(0 80% 60%)`
   (or the ratified value); two-token split + ink-role re-points ONLY if ratified. Lint + typecheck.
5. **Sibling-red sweep.** Confirm `--like`/`--delete`/`--accent-red` carry no text-over-card consumer
   (plate/icon role); record the disposition; fix only an axe-surfaced miss.
6. **Gates GREEN + VISUAL-TRUTH.** Confirm Arm A passes (resolved dark `--destructive` ≥4.6 over card /
   ≥5 vs page); run Arm B (the live axe + readback under `.dark` at ≥2 viewports — the "Session
   expired" Alert legible); capture the paired-π BEFORE/AFTER + `DELTA.md`; write the audit json GREEN.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to)

- **token-first (J invariant).** The entire fix is ONE token value in `tokens.css` re-resolving every
  `text-destructive`/`bg-destructive` site library-wide from a single override — the canonical
  token-first axis. NO consumer edits library source for styling (single-token path); the two-token
  fallback stays token-first (a new token + a class re-point, the chart-label precedent shape).
- **NEVER `hsl(var(--token))` / alpha via `color-mix in srgb`.** The lifted value is a complete `hsl()`
  color consumed directly as `var(--destructive)`; the existing `color-mix(in srgb, var(--destructive)
  N%, transparent)` invalid-ring/description-softening sites (glass.css, SelectTrigger,
  ComboboxInput, alert `/90`) re-resolve correctly off the lifted base — no token-wrapping anti-pattern
  introduced.
- **no-backwards-compat / clean break (MEMORY).** The stock shadcn dark value is REPLACED, not aliased
  — no `--destructive-legacy`, no deprecation shim. The two-token fallback (if ratified) is the clean
  chart-label-precedent split, not a compat bridge.
- **presets-in-consumers (MEMORY).** The lifted dark `--destructive` is the LIBRARY's own identity
  evolution (the dark semantic-red the library ships), not a consumer preset — `src/styles/tokens.css`
  is exactly where the lib's own token identity changes.
- **overfitting bar.** No new substrate without ≥2 consumers: the single-token path adds ZERO
  artefacts; the two-token `--destructive-text` (if ratified) has ≥2 ink-role consumers (Alert + Label
  + LabeledField + the invalid rings) — it clears the bar by construction.
- **π visual-runtime lane / cardinal lesson.** The wave closes on the EXECUTED live axe + readback
  under `.dark` (the user's actual "Session expired" Alert rendered legible), never on Arm A's headless
  compute alone — the binding close criterion is the real-device paint, captured as the paired-π
  BEFORE/AFTER + DELTA.

---

## Archaeology (the git lineage the finding cited)

- **`659458b`** (`feat(styles): AQ.W2 color/theming`) — where the unmodified shadcn-vue stock
  dark-destructive `hsl(0 62.8% 30.6%)` was minted at BOTH the `light-dark()` arm and the `.dark`
  floor (the dual-arm provenance — the value calibrated for a plate, used as ink).
- **AW.W25** (`alert/index.ts:14`) — where the Alert destructive variant became `text-destructive
  bg-card` (the "content-band, not a loud saturated plate" design that makes `--destructive` the INK
  role over a card — the design choice that exposes the dark token's ink-role contrast failure).
- **The chart-label two-token precedent** (`tokens.css:823/1497/1617`, O.W6 Lane D) — the canonical
  two-token discipline (`--chart-{phase}` canvas hue vs `--chart-{phase}-label` label ink, per-mode L)
  the `--destructive` split mirrors if the single value cannot ratify.
- **HEAD `002bda5`** (the convergence audit baseline) — the dark `--destructive` 1.75-over-card /
  1.91-vs-page is live here; the user's "Session expired" Alert screenshot (D10 capture 15.02.13) is
  the live witness.
