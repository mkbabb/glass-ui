# forms/checks — Pass-E SYNTHESIS (binding per-page verdict)

**Route**: `/forms/checks` · **SFC**: `demo/stories/forms/checks.vue` (126 lines) · **Components**: Checkbox · RadioGroup · Switch.
**Inputs reconciled**: `forms-checks-{demo,design,component}.md`.

The three lenses AGREE on the shape: the **atoms are correct and lovely** (real four-state contract, the Switch thumb on a genuine `--spring-snappy` overshoot, the indeterminate model shown, compositor-only, Safari-clean), and the **page is a flat hairline-delimited spec-sheet** that spends almost none of the library's identity. The demo + design lenses are near-identical on the page-composition failures (one monolith card · no aurora · no dock · no protagonist · dead lower-right quadrant); the component lens is the ONLY one that found a genuine SRC defect (the indicator glyph hard-snaps — no entrance). The page is a notch above `forms/inputs` (it at least has ONE body glass plate). No functional bug, no broken demo, no perf/Safari gap.

---

## Reconcile + dedupe

**Agreed across all three (no conflict):**
- Atom motion is RIGHT — do not regress (Switch thumb spring, four-state transitions, indeterminate model). All three say so explicitly.
- The page composition fails the North-Star structure/suffusion/dock bars (demo §2-4, design §3-5). Same five systemic misses as `forms/inputs`.
- Copy carries internal design-system jargon leaked into audience voice (the one-color-event clause in the eyebrow blurb; the hit-target implementation note) — demo §6, design §8 agree verbatim.

**The ONE conflict — the path label:**
- demo §5 calls the `@mkbabb/glass-ui/switch` chip a **PASS** (standardized `/<subpath>` form).
- design §8 calls it **WRONG** (the page demos three families — Checkbox/Radio/Switch — under a chip naming only one; and Checkbox/Switch ship from the root barrel, not a `/switch` subpath).
- **Resolution: design is correct.** The label IS standardized in *form* but WRONG in *referent* — a three-family page must chip the band-canonical import where all three ship. The brief's ask is "standardize the import-path label", and a chip that names 1 of 3 families is the exact mislabel to fix. The correct chip is the root barrel `@mkbabb/glass-ui` (Checkbox/RadioGroup/Switch all re-export from it). Action below.

**The ONE net-new src finding (component lens only):**
- The `CheckboxIndicator`/`RadioGroupIndicator` glyph **hard-appears** — reka force-mounts it and the only state animation is the fill cross-fade; the mark itself snaps. The design lens independently names the same gap ("the toggle is never animated on screen", "indeterminate is a missed protagonist") from the page side; the component lens roots it in the SFC and proves it is a real, fixable, compositor-only, PRM-static, Safari-safe entrance miss. This is the genuine HIGH-animation-affordance defect and the only one that touches `src/`.

**Dropped/merged as low-signal:**
- The `opacity-60` double-dim on disabled rows (demo §7) — cosmetic, fold into the page-redesign cleanup, not its own line.
- The `--switch-*` 4-calc arbitrary-utility wall (component §5) — a transposition opportunity, not a defect; the component lens itself rates it MINOR and byte-faithful. Fold into the de-shadcn control-recipe canon, do not mint a wave for it.

---

## Ranked changes (by impact)

1. **Card-per-section bento over a colorful aurora — the user's headline structural + suffusion ask, in ONE move.** Replace the single `glass-resting` monolith + `.story-sections--delimited` hairlines with a `surface="veil"` glass card PER family, arranged as a bento (Switch protagonist large ~1.5-2×; Checkbox + Radio a 2-up supporting row), over a vivid multi-nuclei aurora (offscreen-paused, one GL context/route, budget-safe). Closes four asks at once: own cards · bigger main area used · glass-over-colorful-field · §L1 tier-selection (veil is the permeable tier whose JOB is to let the backdrop read through; `glass-resting` is the over-reach with nothing to refract). Both demo + design rank this #1.
2. **Indicator-POP — the one real src animation defect.** Spring scale-in + stroke-draw on the Checkbox check + Radio dot (and stage the indeterminate→checked→unchecked cycle as a focal one-shot), on the `--spring-snappy` clock the Switch thumb already uses; compositor-only, PRM-static, `@starting-style`/keyframe. Plus the page-level toggle demonstration: the protagonist Switch idle-toggles on a slow PRM-gated loop. This is "HIGH animation affordance for EVERY component" made real.
3. **Leverage the dock APIs for contextual family switching.** A `DockStack mode="facets"` (or `DockLayerGroup`) that crossfades the protagonist across Checkbox→Radio→Switch, plus `.scroll-cascade` gravity-entrance landing per-card — the contextual-switching/animating capability the brief names and the page wholly lacks. (Fuller API exercise — `ToggleGroup type="single"` radio-semantics arm + `ToggleGroupItem variant="card"` tile + a size axis — rides this same redesign as the "show the families at their BEST" arm.)
4. **Fix the path label.** Chip the band-canonical `@mkbabb/glass-ui` (where all three families ship), not the misleading single-family `/switch`.
5. **Tighten copy.** Strip the one-color-event jargon from the eyebrow blurb; trim the hit-target implementation note; delete the internal-changelog SFC header comment; compress each section caption to one showcase line of the control's *feel*. Keep the Switch when-to-use guidance (it teaches a choice). Optionally add a poster-rung state word ("ON/OFF" / "N selected" tally) behind the protagonist in the `--type-display-mega` rung.

---

## Tranche actions

| # | Change | Action | Wave |
|---|---|---|---|
| 1 | Card-per-section bento + aurora backdrop + protagonist staging + bigger-area-used | **NEW** | **`BD.W-FORMS-PAGE-REDESIGN`** (Band 16 — net-new "demo-page DEEP redesign", distinct from Band 4's zero-paint FOLD scope). Demo-private (zero src paint). Gate: `proof:forms-page-redesign` born-RED — asserts (a) ≥3 discrete glassy `surface="veil"` cards (not ONE monolith + hairlines), (b) a live `<Aurora>` canvas present behind the bento (canvas-count ≥1; the demo §3 / design §3 `canvas=0` defect), (c) a protagonist scale-contrast (the focal card ≥1.4× a satellite), (d) `<DockStack>`/`<DockLayerGroup>` present (the contextual-switch ask), (e) the `.story-sections--delimited` hairline-stack ABSENT. + the `proof:ba-gestalt` forms-band verdict on a fresh capture, both modes. This is the home for the demo §1-§4 + design §1-§5 page asks. **Note**: `BD.W-FORMS-CARD-FOLD` is the WRONG home — its goal is folding `rounded-card border bg-card` triplets onto `<Card>` (label/multi-select/dialog rows), NOT a card-per-section aurora redesign of checks.vue (checks.vue is not even in its enrolled set). MODIFY `BD.W-FORMS-CARD-FOLD` only to add a one-line cross-ref pointing checks.vue's deep redesign at the NEW wave. |
| 2 | Indicator-POP (check/dot entrance) + idle-toggle demonstration | **NEW** | **`BD.W-CHECKS-INDICATOR-POP`** (Band 1 — the SRC animation arm; the component lens's exact recommendation). The ONLY wave authorized to paint Checkbox/RadioGroup indicators. Three arms: (1) spring scale-in + stroke-draw on the `data-[state=checked]`/indeterminate indicator (compositor-only, PRM-static, shares `--spring-snappy`); (2) sub-perceptual hover-register pre-arm; (3) the coupled `--switch-press-t` track-brightness leg (lowest priority). Born-RED `proof:checks-indicator-pop` over the indicator entrance + self-test bite; `proof:no-layout-animation` stays GREEN; `proof:ba-gestalt` forms verdict. The page-level idle-toggle-loop demonstration rides the NEW redesign wave (#1), driven by this wave's now-animated indicators. |
| 3 | Dock contextual switching + fuller API | **AUGMENT** #1 | Folds into `BD.W-FORMS-PAGE-REDESIGN` as gate clause (d) above — not a separate wave (it is page-composition, zero src). |
| 4 | Path-label chip → `@mkbabb/glass-ui` | **AUGMENT** | `BD.W-PAGE-HEADER-FOLD` already owns the per-page identity-header chip across the 36-file paste set (checks.vue IS in that set — `forms/inputs.vue` is its sibling reference). Add the chip-referent-correctness arm: a multi-family page chips the band-canonical root barrel, not a single-family subpath. Extend its detector to flag a chip naming 1-of-N demoed families. |
| 5 | Tighten copy + drop SFC changelog comment + opacity-60 + poster word | **AUGMENT** #1 | Page-copy is demo-private; folds into `BD.W-FORMS-PAGE-REDESIGN` (the redesign rewrites the body, so the captions/eyebrow/comment/opacity-60 cleanup lands in the same diff). No separate `W-LANG` wave — it would touch the same file twice. |
| — | `--switch-*` 4-calc utility wall → `.switch-track` recipe | **FOLD** | Into `BD.W-DESHADCN-CANON` as a control-recipe note (the `.input-pill` precedent). MINOR, byte-identical, idiom-only. Not its own wave. |
| — | `bg-background` slab thumb (already retired BC.W-CONTROL-SMOOTH) | **PRUNE** | No BD action — shipped. |

**Net: TWO new waves** — `BD.W-FORMS-PAGE-REDESIGN` (Band 16, page deep-redesign, zero src paint) + `BD.W-CHECKS-INDICATOR-POP` (Band 1, the SRC indicator-entrance arm). Everything else AUGMENTS an existing wave or FOLDS. The `BD.W-FORMS-PAGE-REDESIGN` gate is the cardinal one — it is the per-page binding lock for the whole user-ask cluster (cards · aurora · dock · protagonist), and it generalizes: the sibling `forms/inputs` (and likely the whole forms band) needs the SAME redesign, so Band 16 should be specced as a forms-band SWEEP, not a one-page wave.

---

## Convergence call

**NOT close — needs several more loops on the PAGE, but the page is structurally well-understood (one loop to spec, ~2-3 to converge).** The atoms are done; the diagnosis is unanimous and concrete; the redesign is a known shape (veil-card bento + aurora + dock + protagonist — the same move every weak forms page needs). But it is a real net-new redesign, not a fold, so: loop 1 = spec `BD.W-FORMS-PAGE-REDESIGN` + `BD.W-CHECKS-INDICATOR-POP` with born-RED gates; loop 2 = build + the first `proof:ba-gestalt` capture (likely `complete_with_misses` — bento proportion + aurora chroma in dark mode are the usual second-pass tunes); loop 3 = the protagonist-staging + idle-toggle polish + the gestalt flip to PASS. The path-label + copy are one-shot AUGMENTs that land in loop 1-2. **This page is a Band-16 archetype** — converging it cleanly sets the pattern for the rest of the forms band.

---

## Do-not-regress (carried from all three lenses)

- Atom four-state + Switch thumb `--spring-snappy` overshoot + indeterminate checkbox model.
- The `.scroll-cascade` entrance + dark-adaptive divider seam (inherited from chassis — but the dividers themselves go when the cards arrive).
- Compositor-only / no-layout-animation / Safari-clean posture (`color-mix(in srgb)` + `backdrop-filter` + `linear()` springs + `data-[state]` selectors).
- The one-color-event proportion (the teal `--section-color-3` IconChip + tinted eyebrow; controls stay ink/violet-dark) — keep the restraint, just give the teal an aurora + cards to sit against.
