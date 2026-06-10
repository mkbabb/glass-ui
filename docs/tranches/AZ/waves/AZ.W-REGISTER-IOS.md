# AZ.W-REGISTER-IOS — de-red the interactive register at the ROOT to the iOS-glassy luminance-lift; retire the demo red overrides

- **Tranche:** AZ (glass-ui)
- **Track:** Band R — the register
- **Type:** impl (CSS-token register redefinition + demo preset retire)
- **Depends on:** W-GATES (Batch 0 — `proof:all` must be runnable before this lands) · runs Batch 1, parallel with W-DOCK-RAIL ‖ W-DOCK-FLICKER ‖ W-ADAPTIVE-AUTO (the S1 quartet)
- **Blocks:** nothing downstream hard-depends; coordinates with W-ADAPTIVE-AUTO (the selected glass plate must stay legible over the bright bucket — shared `.glass-dock` surface, DISJOINT token regions: this wave owns the selected-glyph/accent register, W-ADAPTIVE-AUTO owns the `--glass-tint-*` darken axis)
- **Status:** SPEC

---

## §0 RE-GROUND (mandatory step-0 before any edit)

This wave starts from the fleet's mechanism finding (C4-hover-register, D6-2, D3-2),
NOT a fresh diagnosis. The C4 lane proved the ROOT is ALREADY glass-first and the red
lives in the DEMO preset — but the user said ROOT (R3-6), so the resolution is a ROOT
register redefinition (re-point the library default selected accent off its brand-`--primary`
fallback to a luminance-lift token) AND the demo override retire. Before editing, RE-GREP
every cite below at HEAD — the digest may compress and line numbers drift across the
Batch-1 siblings (W-ADAPTIVE-AUTO shares `.glass-dock` surface files):

1. `grep -n 'demo-nav-accent\|viz-fourier' demo/layout/dock-nav.css` — confirm the red is still
   wired at the three sites (the `--demo-nav-accent: var(--viz-fourier)` mint + the rail-accent
   re-point + the bottom-dock active color/glyph re-point).
2. `grep -n 'dock-active-color\|dock-control-active-bg\|dock-rail-active-accent' src/styles/tokens/offsets-sizing.css src/styles/dock-controls.css` — confirm the ROOT default chain
   (`--dock-active-color: var(--foreground)`, `--dock-control-active-bg: var(--glass-bg-floating)`,
   the `.variant-rail` accent default to `var(--dock-rail-active-accent, var(--primary))`).
3. `grep -n ':active' src/styles/dock-controls.css` — confirm the press register is scale-only
   today (no surface darken), the C4-INV-4 finding.
4. RE-CONFIRM the refuted readings stay refuted: the active SURFACE (`--dock-control-active-bg`
   = `--glass-bg-floating`) is ALREADY the iOS material-lift plate (C4-INV-1) — do NOT "fix" it;
   the hover register (`--dock-control-hover-bg` = `--glass-bg-resting`, scale `--scale-hover-dock`,
   warm-ink) is ALREADY correct + red-free (C4-INV-2) — do NOT touch it. The defect is purely the
   brand-hue GLYPH + the solid accent BAR riding ON TOP of the already-correct plate.

If any cite has moved or the red is no longer wired, the scope-reveal trigger fires — re-derive
the edit-site table before proceeding (do NOT blind-edit a moved line).

---

## Goal criterion

A SELECTED, hovered, or pressed dock control / icon-button / nav-item reads as the iOS 26/27
register at the LIBRARY ROOT: a translucent glass material-lift plate (the already-shipped
`--glass-bg-floating` selected tier), a foreground that stays semantic warm-ink (or lifts
luminance only — NEVER a saturated brand hue), and a brief darken-plus-shrink on press. The
warm-red survives ONLY as static brand ink — the ℱ wordmark, the data-viz strokes, and the
gold/red CTA family — never as an interactive (hover/active/selected) register. The demo's
`--demo-nav-accent → --viz-fourier` glyph/edge-bar overrides retire so the demo consumes the
new neutral root register, and the next consumer that re-points the library inherits the
de-red default, not a red one.

## Completion criterion

The born-RED gate `proof:register-ios` (G1 below) flips GREEN, AND the wave closes on a
captured DELTA via `proof:live-verified-ledger` (a paired light+dark π readback of a selected
dock control proving NO brand-red on the glyph + the glass-plate-only selected register).
Specifically:

1. `npm run proof:register-ios` (born-RED, NEW) — the SOURCE arm asserts (a) the library default
   `.variant-rail` active-glyph chain no longer falls back to a saturated brand hue (the
   `var(--dock-rail-active-accent, var(--primary))` warm-ink-or-glass fallback survives, but the
   accent BAR demotes to a translucent luminance-lift token, not a solid `--primary`/brand bar);
   (b) the new `--dock-selected-accent` luminance-lift token exists + is consumed by the rail
   accent + the selected-glyph register; (c) a `--dock-control-press-bg` darken token exists and
   the `:active` rule reads it (the iOS darken-plus-shrink); (d) the demo `dock-nav.css` carries
   NO `--demo-nav-accent: var(--viz-fourier)` mint and NO red glyph/accent re-point (the retire);
   (e) the surviving-red allowlist holds — `--viz-fourier` is still consumed by the ℱ wordmark
   mark, the data-viz strokes, and the gold/red CTA, and by NOTHING in an interactive
   hover/active/selected register.
2. The π DELTA arm (`tests-visual/register-ios.spec.ts`, NEW) — a `getComputedStyle` readback of a
   SELECTED dock control (`/dock/overview` bottom-dock active tab + `/dock/rail` active rail item)
   in BOTH light and dark proves the active glyph `color` resolves to the warm-ink/foreground or
   the luminance-lift token (NOT `oklch(0.579 0.201 30.4)` = `--viz-fourier`), the active plate
   bg resolves to the `--glass-bg-floating` glass tier, and the `::before` accent bar (if present)
   resolves to a translucent luminance-lift, not a solid brand bar.

`vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` + `proof:dock-unify` stay green
(the selected register stays a glass tier off the allowlist — no regression).

---

## H1 fork — how far the de-red goes (the spec arm + the recorded alternatives)

R3-6: "I don't like the red. Tune this to be more iOS inspired and glassy — at the root, within
our icons and buttons." The warm-red SELECTED register was a PRIOR user decision (the NCSU
wordmark + viz-basis Fourier-red identity; CLAUDE.md "presets in consumers"). H1 in `AZ.md`
recommends arm (a). All three arms are specced; the orchestrator confirms the arm at Batch 1.

### Arm (a) — SPEC ARM (recommended): red retires from ALL state registers

The hover/active/selected/pressed register becomes the iOS luminance-lift glass register
EVERYWHERE. Red survives ONLY as brand INK on non-interactive marks: the ℱ wordmark (the
script-F logo glyph), the data-viz strokes (`--viz-fourier`/`--chart-download` on plots and
spectra), and the gold/red CTA family (`gold-audacious`/`primary-audacious`, where `--primary`
is warm-ink not red and the gold is `--color-gold`). The implementation:

1. **ROOT — keep the selected PLATE.** `--dock-control-active-bg: var(--glass-bg-floating)` and
   `--dock-active-bg: var(--dock-control-active-bg)` are UNCHANGED — they ARE the iOS material-lift
   (C4-INV-1, verified at HEAD). Do not touch.
2. **ROOT — mint the luminance-lift accent token.** New `--dock-selected-accent`, defaulting to a
   translucent foreground/white-lift — e.g. `color-mix(in oklab, var(--foreground) 14%, transparent)`
   (the iOS "brighter material" read), auto-flipping with `--foreground` so dark-mode resolves a
   light luminance-lift. The token is the SINGLE knob a consumer retints the selected affordance
   through (token-first).
3. **ROOT — demote the rail accent BAR + selected GLYPH off brand.** The `.variant-rail` active
   `::before` bar `background` and the active-glyph `color` change their default off
   `var(--dock-rail-active-accent, var(--primary))` so the SELECTED read is the glass plate + the
   `--dock-selected-accent` luminance-lift, NOT a saturated stripe. `--dock-active-color` stays
   `var(--foreground)` (already correct at HEAD); the rail-specific override that re-points the
   glyph to a brand fallback is the surface to retune.
4. **ROOT — add the iOS press darken.** Mint `--dock-control-press-bg` (a tier BELOW resting — a
   mix toward foreground ~6-8%, e.g. `color-mix(in oklab, var(--glass-bg-resting), var(--foreground)
   7%)`) and read it on the dock control `:active` alongside the existing `--scale-press-dock`, so
   press lands the iOS "darken + shrink" (today it scales only — C4-INV-4).
5. **DEMO — retire the red overrides.** Delete `--demo-nav-accent: var(--viz-fourier)`
   (dock-nav.css:21) and the two re-points that consume it: the sidebar `.is-active`
   `--dock-rail-active-accent: var(--demo-nav-accent)` (dock-nav.css:58) and the bottom-dock
   `.is-active` `--dock-active-color: var(--demo-nav-accent); color: var(--demo-nav-accent)`
   (dock-nav.css:103-104). The demo consumes the new neutral root register; it does NOT re-tint.

### Arm (b) — RECORDED ALTERNATIVE: red survives as the selected-GLYPH tint over a glass plate

Keep the glass material-lift plate (step 1) but allow the SELECTED glyph to carry a brand-hue
tint (the demo's `--viz-fourier`) — the accent BAR still demotes to the luminance-lift, but the
active glyph stays semantically branded. Rejected as the spec arm because R3-6 says the red on
hover/click is the dislike "at the root" — a glyph tint is still a saturated brand hue on the
interactive register the user named. Recorded for the orchestrator's H1 decision.

### Arm (c) — RECORDED ALTERNATIVE: full de-red everywhere

Strip `--viz-fourier` from EVERY consumer including the static wordmark, data-viz strokes, and
the CTA family — a single neutral/glass identity. Rejected: the ℱ wordmark + the Fourier-red
viz identity is a load-bearing brand mark (the NCSU/Fourier identity, a prior user decision); the
one-color-event rule (D3) keeps the brand red as a DELIBERATE static event on those marks. Full
de-red would strip the brand's color identity, which the user did NOT ask for (R3-6 scopes the
dislike to "hovered/click state"). Recorded.

---

## The defect (file:line-grounded — RE-GREP at HEAD per §0)

| id | surface | mechanism | evidence (file:line at digest time) |
|---|---|---|---|
| C4-INV-3 / D3-2 / D6-2 | demo dock active | THE RED is a DEMO preset, not a library default. `--demo-nav-accent: var(--viz-fourier)` (NCSU-red) re-points the rail accent + bottom-dock active glyph. Library default for both is `--primary` (warm-ink) / `--foreground`. | `demo/layout/dock-nav.css:21` (`--demo-nav-accent: var(--viz-fourier)`), `:58` (`--dock-rail-active-accent: var(--demo-nav-accent)`), `:103-104` (bottom-dock active `--dock-active-color` + `color: var(--demo-nav-accent)`); `src/styles/tokens/color-radius.css:226` (`--viz-fourier: oklch(0.579 0.201 30.4)`) |
| C4-INV-1 | ROOT selected plate | ALREADY correct — `--dock-control-active-bg: var(--glass-bg-floating)`, the iOS material-lift. KEEP. | `src/styles/tokens/offsets-sizing.css:301-302` (hover→resting, active→floating), `:347-351` (`--dock-active-bg`/`--dock-active-color: var(--foreground)`) |
| C4-DRAFT / D6-2 | ROOT rail accent default | The `.variant-rail` active glyph + `::before` bar fall back to `var(--dock-rail-active-accent, var(--primary))` — a brand/`--primary` saturated read; demote to the luminance-lift. | `src/styles/dock-controls.css:611-615` (active-glyph color chain), `:623-634` (the `::before` solid accent bar) |
| C4-INV-4 | ROOT press register | Press scales only — no surface darken; the iOS "darken + shrink" is half-met. | `src/styles/dock-controls.css` (icon-button `:active` scale-only, no `background` darken — RE-GREP `:active`) |
| C4-INV-2 / C4-INV-5 | ROOT hover + Button CVA | ALREADY correct + red-free — hover→`--glass-bg-resting` + warm-ink + scale 1.1; Button default = glass-wash/btn-glass, no red. DO NOT touch. | `src/styles/dock-controls.css:318-323,504-509`; `src/components/ui/button/index.ts:34-78` |

**The named surviving-red surfaces (the allowlist the gate asserts):**
- the ℱ script-F wordmark mark (the static logo glyph — `text-viz-fourier`, a non-interactive identity);
- the data-viz strokes (`--viz-fourier` / `--chart-download` on Fourier plots, spectra, timeline/metric phase tints);
- the gold/red CTA family (`gold-audacious` gold-sweep + `primary-audacious`, where `--primary` is warm-ink, the gold is `--color-gold`).

---

## Scope (numbered — concrete change/deletion only; arm (a))

1. Mint `--dock-selected-accent` in `src/styles/tokens/offsets-sizing.css` (the dock token home),
   defaulting to a translucent foreground/white-lift (`color-mix(in oklab, var(--foreground) 14%,
   transparent)`); document it as the single retint knob for the selected affordance.
2. Mint `--dock-control-press-bg` in the same token file (a darken-toward-foreground ~7% mix off
   `--glass-bg-resting`) for the iOS press-darken.
3. In `src/styles/dock-controls.css`, re-point the `.variant-rail` active `::before` bar
   `background` (`:634`) from `var(--dock-rail-active-accent, var(--primary))` to
   `var(--dock-selected-accent)`, and demote the rail active-glyph `color` (`:611-615`) so a
   selected control reads via the glass plate + luminance-lift, NOT a brand stripe/glyph.
4. In `src/styles/dock-controls.css`, add a `background: var(--dock-control-press-bg)` (or a
   `color-mix` darken) to the dock control `:active` rule alongside the existing scale-press.
5. In `demo/layout/dock-nav.css`, DELETE the `--demo-nav-accent: var(--viz-fourier)` mint
   (`:21`), the sidebar `.is-active` `--dock-rail-active-accent: var(--demo-nav-accent)` re-point
   (`:58`), and the bottom-dock `.is-active` `--dock-active-color: var(--demo-nav-accent); color:
   var(--demo-nav-accent)` re-point (`:103-104`); the demo inherits the neutral root register.
6. Author `scripts/proof-register-ios.mjs` (the born-RED source gate, G1) + register it in
   `scripts/gates.mjs` (local+ci) + `ci.yml`.
7. Author `tests-visual/register-ios.spec.ts` (the π DELTA arm, G2).
8. Update `MIGRATION.md` (no consumer API rename, but record the demo-preset retire + the new
   `--dock-selected-accent`/`--dock-control-press-bg` knobs for downstream retinters) + `CLAUDE.md`
   dock nav-pattern contract (the iOS selected register replaces the brand-accent default).

## §3a Triumvirate Dispatch

- **File-bounds expansion** that invalidates the wave: if the de-red requires touching
  `src/components/ui/button/` CVA (the buttons are already red-free, C4-INV-5) or
  `src/styles/glass/ladder.css` (the W-ADAPTIVE-AUTO surface) — those are OUT of bounds; a reveal
  that the selected register cannot be expressed in the dock token + dock-controls files alone
  fires the triumvirate (research the true surface, augment bounds, redress).
- **Hard-gate failure** not local-recoverable: if the π DELTA reads brand-red on the selected
  glyph AFTER the demo retire (a third red source the C4 lane missed), triumvirate — do not
  re-tint blindly.
- **Diagnostic loop**: three iterations isolating where a residual red paints (a cascade-order
  bake like the C1 TabsIndicator utility-beat) without a root cause → triumvirate.

## File Bounds

| File | Access |
|---|---|
| `src/styles/tokens/offsets-sizing.css` | modify (mint 2 tokens) |
| `src/styles/dock-controls.css` | modify (re-point rail accent + add press darken) |
| `demo/layout/dock-nav.css` | modify (delete 3 red overrides) |
| `scripts/proof-register-ios.mjs` | create |
| `scripts/gates.mjs` | modify (register the gate row) |
| `ci.yml` | modify (register the ci gate) |
| `tests-visual/register-ios.spec.ts` | create |
| `MIGRATION.md` | modify |
| `CLAUDE.md` | modify (dock nav-pattern contract clause) |

**Do NOT touch:** `src/components/ui/button/**` (red-free already), `src/styles/glass/ladder.css`
+ `src/styles/dock/{shell,morph}.css` (W-ADAPTIVE-AUTO's `--glass-tint-*` surface — disjoint
register), `src/styles/tokens/color-radius.css` (the `--viz-fourier` brand token STAYS for the
allowlist surfaces), the dock hover register (`--dock-control-hover-bg`, C4-INV-2 correct).

### §4a Disjointness

Single-agent wave (one register, tightly coupled token+CSS edits). No intra-wave write conflict.
Cross-wave: shares `.glass-dock` SURFACE with W-ADAPTIVE-AUTO but DISJOINT token regions (this
wave: `--dock-selected-accent`/`--dock-control-press-bg`/the rail-accent default; W-ADAPTIVE-AUTO:
`--glass-tint-source`/`--glass-tint-strength` on `.glass-dock`). Both touch `scripts/gates.mjs` +
`ci.yml` — sequence the gate-row registrations (one re-byte-lock per Batch-1 close, the
W-A11Y-PERF sibling-gate precedent), NOT a parallel write.

## §5 Agent Units

Single unit.

### AZ.W-REGISTER-IOS.1 The iOS luminance-lift selected register + the demo red retire

- **Goal:** the ROOT selected/hover/active/pressed register reads iOS-glassy (luminance-lift plate,
  semantic ink, press-darken) and the demo red overrides are gone, so red survives only as static
  brand ink.
- **Mechanism:** mint `--dock-selected-accent` + `--dock-control-press-bg`; re-point the rail accent
  bar + selected-glyph default off `--primary` to the luminance-lift; add the `:active` darken;
  delete the three `dock-nav.css` red re-points.
- **Files:** the File Bounds table above.
- **Sub-gate:** `proof:register-ios` GREEN (source arm a-e) + the π DELTA proving no brand-red on
  a selected control in light+dark.

## §6 Hard Gate

1. **G1 — `npm run proof:register-ios` (born-RED, source arm).** Parses `dock-controls.css` +
   `offsets-sizing.css` + `dock-nav.css`: (a) the rail active `::before` bar reads
   `var(--dock-selected-accent)` not a `--primary`/brand solid; (b) `--dock-selected-accent` +
   `--dock-control-press-bg` are minted + consumed; (c) the dock control `:active` reads the
   press-darken token; (d) `dock-nav.css` has ZERO `--demo-nav-accent`/`--viz-fourier` in an
   interactive (`.is-active`/`[aria-current]`/`[aria-pressed]`) register; (e) the allowlist holds —
   `--viz-fourier` is consumed ONLY by the wordmark/viz/CTA surfaces (a positive grep list), never
   by a hover/active/selected rule. Born-RED: the gate must FAIL on the pre-edit tree (the red is
   wired) and pass after.
2. **G2 — `tests-visual/register-ios.spec.ts` (π DELTA).** Live `:5199` readback of selected dock
   controls in light+dark: active glyph `color` ≠ `oklch(0.579 0.201 30.4)`; active plate bg =
   the `--glass-bg-floating` recipe; accent bar (if present) = the translucent luminance-lift.
   The captured paired-π + screenshots are the close DELTA artefact (`proof:live-verified-ledger`).
3. `vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` + `proof:dock-unify` stay green.

## §7 Format And Lint Cadence

`npm run typecheck` after the token/CSS edits; `npm run build` to confirm the `/styles` bundle
re-emits with the new tokens; `git diff --check` for whitespace. Prettier/stylelint on the
touched CSS at close. The π spec runs against a quiet `:5199` server (the W-GATES `:5199`
convention).

## §8 Verification Artefacts

- `scripts/proof-register-ios.mjs` output (born-RED→GREEN transcript).
- `tests-visual/register-ios.spec.ts` paired-π JSON + light/dark screenshots of selected dock
  controls, saved under `docs/tranches/AZ/audit/visual/W-REGISTER-IOS-DELTA.md`.
- The before/after `dock-nav.css` diff (the red retire).

## §9 Commit Plan

- One implementation commit: `feat(AZ): de-red the interactive dock register to iOS luminance-lift
  (W-REGISTER-IOS) — mint --dock-selected-accent/--dock-control-press-bg, retire the demo
  --viz-fourier overrides; red survives only as wordmark/viz/CTA brand ink`. Body required (the
  register redefinition + the H1 arm chosen + the surviving-red allowlist).
- Gate-row commit folds into the Batch-1 re-byte-lock (`gates.mjs`/`ci.yml`).
- Doc/status commit at close (`MIGRATION.md`/`CLAUDE.md`/PROGRESS).

## §10 Dependencies

- **Depends on:** W-GATES (`proof:all` runnable).
- **Blocks:** nothing hard; coordinates with W-ADAPTIVE-AUTO (shared `.glass-dock` surface,
  disjoint token regions — the selected glass plate must stay legible over the bright bucket).

## §11 Archaeology

Prior attempt: AY.W-DOCK-NAV B2 retired the red `::after` underline + fill on the bottom-nav
active tab, but LEFT the red GLYPH tint (`dock-nav.css:103-104`) and the rail accent BAR. R3-6 is
the completion — kill the residual red GLYPH + the rail accent bar, at the ROOT register this time
(not a per-site demo patch, the new guardrail being the `proof:register-ios` allowlist assert that
catches a red re-introduction on ANY interactive register by ANY future consumer).

## Successor for any deferral

If arm (b) or (c) is chosen at H1, the un-implemented arm's surfaces are recorded here as
permanently-out-of-scope (not deferred) — arm (a) is the clean break. If the press-darken (step 4)
reveals a cross-control inconsistency (the Button CVA vs the dock control press registers diverge),
that reconciliation is NAMED to W-SUFFUSE (the audacious-type + press-register suffusion pass),
NOT silently dropped.
