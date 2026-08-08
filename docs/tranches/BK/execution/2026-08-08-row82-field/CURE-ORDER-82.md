# CURE-ORDER #82 W-FIELD — driver-ratified residue (2026-08-08)

Adjudicator (Fable, quartet run wf_c6359ba6-468) ruled CURE-REQUIRED. The driver
ratifies all five cures verbatim. What STANDS: the selection (canonical next per ⊕⁶⁰,
g6 FIRED at this cut with ratified default KEEP, #68/#83 preconditions verified on
disk); the cut's substance — C-5 executed (`.glass-control-edge` →
`styles/glass/control-edge.css` with the `--control-edge-inner`/`--control-edge-ring`
slots, `field-surfaces.css` deleted, "≥8 consumers" corrected to the measured 6), the
297-line `_shared/field/control.css` register, NumberField's Content/twin retirement,
the six born-RED lane gates at SEATS +0; the verify gate REPRODUCED at the
adjudicator's own hand (receipt byte-identical, lane 6/6, the 11 foreign failures
exact — the 12th was probe-induced boot-graph mtime skew, green after rebuild); the
fence honest against the step-0 baseline `/tmp/bk-row-baseline-1786193773.diff` (its
first outing under the folded mandate). Challenger B's zero-defect verdict OVERTURNED
on D1/D4/D5 — B never measured the floor.

## Cures

- **CURE-82-1 (D1, code, BLOCKING — the floor is a fiction):** under
  `field-sizing: content` the `rows` attribute is WHOLLY IGNORED — measured rows
  1/3/8 all render one line (26px) while the non-field-sizing control honors
  `rows=3` at 74px. The cut deleted HEAD's real floor (`field-control.css:45`
  `min-block-size: max(5lh,…)`) and shipped NO floor while SIX sites assert "rows is
  the floor" (`control.css:150-153`, `Textarea.vue:16-19`, `textarea/types.ts` ×2,
  `sizing.css:113-114`, the demo textarea story, `manifest.ts:521`) — a
  consumer-visible regression with its falsifier deferred to π while asserted as
  fact. Cure: `Textarea.vue` stamps `--field-rows` inline from `attrs.rows`;
  `control.css`'s textarea rule adds
  `min-block-size: calc(var(--field-rows, 2) * 1lh + <block padding>)` (typed
  `attr()` fails Safari — refused); rewrite all six sites' prose to the shipped
  truth (pre-commit files: direct rewrite, with a dated correction in RECORD); bind
  the node-readable half in G-F6; P7's paint half stays with the π seat.
- **CURE-82-2 (D2, gate):** G-F6 only counts `box-shadow:` occurrences in
  `control-edge.css`, so deleting either C-7 slot leg stays green. Extend G-F6 to
  assert BOTH `var(--control-edge-inner` and `var(--control-edge-ring` appear in the
  file's single declaration list. Born-RED: prove each leg's deletion REDs on a
  scratch copy.
- **CURE-82-3 (D3, code — the law false on the fourth shell):** `TagsInput.vue:58`
  composes `.glass-control-edge` (this row's own adoption) while
  `tags-input/styles.css:19,24` REPLACE the whole `box-shadow` list at
  invalid/focus, deleting the rim — "declared exactly once / append by construction"
  is false there. PRIMARY cure (ratified): tags-input speaks into the slot —
  `--control-edge-ring: var(--invalid-ring)` / `var(--focus-ring-shadow)`, the
  whole-list declarations die, and the no-re-declaration guard extends to cover the
  shell. Fall back to a docstring+RECORD exception-with-route ONLY if the slot fix
  measurably regresses tags-input's invalid/focus paint — state which branch was
  taken and why.
- **CURE-82-4 (D4, hygiene):** `SelectTrigger.vue:39-40`'s comment names the dead
  composite path `_shared/field/ glass/control-edge.css` — delete the stale
  `_shared/field/` fragment.
- **CURE-82-5 (D5, record truth):** `manifest.ts:518-521` + RECORD §2.6 claim the
  textarea story was unrouted/unmeasurable — FALSE: HEAD's `inputs.vue` rendered it
  via FamilyTabs at `/forms/inputs`. Restate the grounds truthfully (no DEDICATED
  route — rendered as a FamilyTabs member inside `/forms/inputs`) with a dated
  RECORD bracket; committed-text sites (manifest is pre-commit here — direct
  rewrite) corrected to match.

## Residue ratified (fold the cheap ones if the file is open; none cure-gating)

Focus-ring alpha flash (`control.css:129` transitions `outline-color` from resting
`currentColor` alpha 1.0 down to the 0.48 ink — Challenger A measured 0.571
mid-flight): FOLD — set a resting `outline-color` at zero alpha so the ring fades
IN, one declaration. The gate file's "ships KNOWN-RED" prose overstates (G-F1/G-F2
green as written): wording correction, fold. Boot-graph rebuild-before-read: standing
lesson, note only. The foreign set unchanged and not claimed (violations:1 = #40's,
drift:1 = #65's, 11 failures #40 ×10 + #7 ×1). Challenger A's screenshot
`row82-rows-floor-DEFECT.png` + `fs-rows-test.html` stay in the scratchpad as D1's
evidence.

## Driver duties at commit (not the cure seat's)

Scoped add per RECORD §9's fence (final-minus-baseline; 44 tracked + 5 new + the
deletions), with the FOUR shared-dirty files split at -U0 (`src/index.ts` +7/−5 ·
`src/styles/index.css` +6/−7 · `tests/public-surface.spec.ts` +8/−3 ·
`tests/styles/radius-role-canon.test.ts` +1/−1 beside #35's residue);
demo:dist:build + FINAL receipt after all seats return (B-D6); leak-check; ⊕-index
derived at commit time from the cursor tail (expect ⊕⁶¹).
