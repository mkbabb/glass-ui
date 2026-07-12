# BI.W-PAGER-A11Y — the pager roving-tabindex contract + the hit-target record

Band B4 (pager greenfield). The keyboard-correct pager: exactly one tab stop, axis-derived Arrow keys,
the deliberate 24px hit-target exemption recorded.

## §Mandate

Discharges (registry rows this wave OWNS):
- **D-PAGER PASS-1 §0 Defect 3** — the pager is keyboard-BROKEN: `PagerDots.vue:219-237` renders plain
  `<button role="tab">` with NO roving tabindex and NO root `@keydown` — 5 independent tab stops, no
  Arrow/Home/End (a WAI-ARIA tabs-pattern violation).
- **D-PAGER §4 G10** — the hit-target + exemption record (24px vs the house 44px floor).

## §Design

Decided mechanism — D-PAGER PASS-1 §2.1 (the SegmentedTabs roving contract mirrored — BB.W-DRAG-MORPH
is the model). NO re-litigating (the contract is a settled pattern in-repo).

- **The roving-tabindex contract on the button grid:** exactly ONE tab stop (the active button
  `tabindex="0"`, the rest `-1`); a root `@keydown` handles AXIS-DERIVED arrows (ArrowRight/Left horizontal ⇄
  ArrowDown/Up vertical, off the orientation) to move focus + activate the adjacent enabled dot; Home/End
  jump; wrapping; disabled-skip. Focus-recovery on window recompute (windowed rail) is KEPT.
- **The ARIA split by pattern is preserved:** `role="tab"`/`aria-selected` for `pattern="tabs"`;
  `role="group"`/`aria-current` for `pattern="group"` / DeckPager; per-dot `aria-label`; `.focus-ring`.
- **The hit-target exemption (G10):** the 24px painted pip meets WCAG 2.5.8 AA (spacing-exempt dot-pager
  case); pad the `<button>` to ≥28px WITHOUT moving the painted pip; the deliberate below-44px exemption is
  RECORDED (not silently below-floor); effective spacing keeps targets ≥24px.

## §Work

- `src/components/custom/pager-dots/PagerDots.vue:219-237` — add the roving-tabindex state (one
  `tabindex="0"`, rest `-1`) + the root `@keydown` axis-derived Arrow/Home/End handler; pad the button to
  ≥28px (padding, not the pip). Composes with W-PAGER-WORM's three-layer split (the INTERACTION layer).
- `src/components/custom/pager-dots/constants.ts` — the hit-target/pad token if a knob is needed.
- `DeckPager.vue` — inherits the contract zero-edit (the shared button grid).
- `docs/tranches/BI/audit/W-PAGER-A11Y-hit-target.md` — the 24px-exemption record (WCAG 2.5.8 pass +
  the deliberate below-44px rationale).

## §Acceptance

Gate: **`proof:pager-a11y`** (NEW; `["local","ci"]`).
Born-RED at HEAD: `PagerDots.vue` renders 5 independent tab stops with no `@keydown` — the roving assert
finds N tabstops ≠ 1 and no arrow handler. GREEN here.
- W1 — exactly ONE `tabindex="0"` on the button grid; the rest `-1` (a live-DOM tabstop count == 1).
- W2 — a root `@keydown` handles the axis-derived arrows + Home/End + wrap + disabled-skip.
- W3 — the pattern ARIA split intact (tabs → aria-selected; group → aria-current); per-dot aria-label.
- W4 — the 24px-exemption record exists on disk; the button hit-box ≥28px with the pip unmoved.
- Self-test bite: a planted second tabstop (two `tabindex="0"`) REDs; a planted missing-arrow-handler REDs.

## §π/DELTA

`tests-visual/pager-worm.spec.ts` (the a11y arm, shared with W-PAGER-WORM) — LOCAL:
- A live keyboard-drive: Tab reaches ONE dot, Arrow moves focus + activates the adjacent dot + drives the
  worm (both orientations), Home/End jump, wrap holds. Both modes.
- An axe `aria-input-field-name` / roving assert on the mounted pager (Chromium).

## §Obligations

- No device run beyond the shared W-PAGER-WORM capture (keyboard is engine-agnostic).
- No cross-repo ask (a pure a11y improvement — a previously keyboard-dead strip becomes keyboard-correct;
  no API-surface change; DeckPager consumers get it on rebuild).

## §Dispositions

- None chronic. The roving contract is the SegmentedTabs precedent applied — a named-pattern land, not a
  deferred row.
