# BC.W-AX-METRIC-HOVER — the metric-badge value-lift: `--metric-badge-hover-translate` + the scale/shadow lift
- **Band:** 12 (customizability + golden-defaults) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** beside the other Band-12 customizability waves (`BC.W-CONTROL-CUSTOM`/`BC.W-CUSTOMIZABILITY-CENSUS`). After `BC.W-GLASS-IDENTITY` (the warm floor — the lift reads the corrected glass rungs). A SMALL value-lift on the EXISTING `.metric-badge:hover` slots — NOT new authoring. Before `BC.W-SPEEDTEST-ADOPT`.
- **Owns / closes:** the speedtest-AX intake **BC-W7** (`AX-HANDOFF.md §1`): *"metric-badge hover (add `--metric-badge-hover-translate -2px`, scale `1.02→1.04`, shadow→`--shadow-cartoon-sm`)."* Status PARTIAL — `components.css:50-57` already has the scale + shadow slots; this lifts the defaults + adds the translate slot.

## Goal (the gestalt)
A `.metric-badge` you hover gives a slightly more emphatic VALUE-LIFT — it nudges UP (`--metric-badge-hover-translate: -2px`), scales a hair more (`1.02 → 1.04`), and its shadow lifts to the cartoon-sticker offset (`--shadow-cartoon-sm`) — so a metric pill reads as a tactile, liftable affordance, not a static plate. The lift is a tasteful nudge (a 2px rise + a 4% scale + the cartoon shadow), not a leap. It rides the EXISTING `.metric-badge:hover` slot register (the `--metric-badge-hover-*` cohort already there) — this is a value-lift on the defaults plus ONE new slot (`--metric-badge-hover-translate`), token-first so a consumer retunes or zeroes the lift from `:root`. A reader sees: the metric pill lifts when hovered — a small, lively nudge up, the cartoon shadow casting under it.

## Starting state (measured, file:line)
- **The `.metric-badge:hover` slots EXIST — the lift is partial.** `src/styles/utilities/components.css:50-57`:
  ```css
  .metric-badge:hover {
      border-color: var(--metric-badge-hover-border, var(--glass-border-resting));
      background: var(--metric-badge-hover-bg, var(--glass-bg-resting));
      box-shadow: var(--metric-badge-hover-shadow, 0 2px 10px color-mix(in srgb, var(--shadow-color) 12%, transparent), var(--glass-highlight));
      scale: var(--metric-badge-hover-scale, 1.02);
  }
  ```
  So `--metric-badge-hover-border`/`-bg`/`-shadow`/`-scale` all EXIST as slots. The hover lifts to the `resting` rung (the U.W0.C-c §7.2 ladder step) + scales `1.02`. The `:active` (`components.css:59-61`) scales `0.96` (the press).
- **The three gaps (the value-lift):**
  1. NO `--metric-badge-hover-translate` slot — the badge scales on hover but does NOT NUDGE UP (no `translateY`). The intake adds `-2px` (the value-lift rise).
  2. The `--metric-badge-hover-scale` default is `1.02` — the intake lifts it to `1.04` (a hair more emphatic).
  3. The `--metric-badge-hover-shadow` default is a soft `0 2px 10px …` — the intake re-points it to `--shadow-cartoon-sm` (the cartoon-sticker offset-stamp shadow — the metric pill's tactile-lift shadow; `--shadow-cartoon-sm` is the smallest cartoon rung, `tokens.css`).
- **The cartoon shadow token exists.** `--shadow-cartoon-sm`/`-md`/`-lg` (the Memphis-sticker offset-stamp shadow — `tokens.css` raw + the `--cartoon-shadow-*` alias → `theme.css` `@theme` bridge → `utilities.css` `.shadow-cartoon-*`). `--shadow-cartoon-sm` is the smallest rung — the metric-badge hover shadow re-points its default onto it (the consumer can still override `--metric-badge-hover-shadow`).
- **The press is on `:active`, compositor-only.** `.metric-badge:active { scale: var(--metric-badge-press-scale, 0.96) }` (`components.css:59-61`) — the press is a `scale` (compositor-safe). The hover lift adds `translate` (also compositor-safe). `proof:no-layout-animation` holds (no layout property; `translate`/`scale`/`box-shadow` are all compositor/paint-safe).

## Target spec (grounded)
A value-lift on the existing slots + ONE new slot.

### T1 — `--metric-badge-hover-translate` (the value-lift rise)
Add a `translate: 0 var(--metric-badge-hover-translate, -2px)` to `.metric-badge:hover` — the badge nudges UP 2px on hover (the value-lift rise). The default is `-2px` (the intake value); the slot lets a consumer retune or zero it (`--metric-badge-hover-translate: 0` keeps the badge flat). Compositor-safe (`translate` is a transform, not a layout property).

### T2 — the scale lift (1.02 → 1.04)
The `--metric-badge-hover-scale` DEFAULT lifts from `1.02` to `1.04` (a hair more emphatic). The slot is unchanged (`scale: var(--metric-badge-hover-scale, 1.04)`); a consumer overriding `--metric-badge-hover-scale` is unaffected. Clean break on the DEFAULT (the old `1.02` value is replaced, no alias — the lift is the new identity).

### T3 — the shadow → `--shadow-cartoon-sm`
The `--metric-badge-hover-shadow` DEFAULT re-points to `var(--shadow-cartoon-sm)` (the cartoon-sticker offset-stamp — the tactile-lift shadow). The slot is unchanged (`box-shadow: var(--metric-badge-hover-shadow, var(--shadow-cartoon-sm), var(--glass-highlight))` — the cartoon shadow + the existing glass highlight). The cartoon shadow is token-adaptive under `.dark` by construction (it rides `--shadow-color: var(--foreground)` — the dark flip re-tints it; no `.dark` re-declaration owed). Clean break on the DEFAULT.

The lift is THREE coupled legs on hover: the `translate` rise (-2px) + the `scale` (1.04) + the cartoon shadow — a tactile value-lift. The hover surface lift (border/bg → resting rung) is UNCHANGED (the existing ladder step). The press (`:active` scale 0.96) is UNCHANGED.

## Mechanism / files
- **`src/styles/utilities/components.css`** (edited — `.metric-badge:hover`, lines 50-57): add `translate: 0 var(--metric-badge-hover-translate, -2px)`; lift the `--metric-badge-hover-scale` default `1.02 → 1.04`; re-point the `--metric-badge-hover-shadow` default to `var(--shadow-cartoon-sm), var(--glass-highlight)`. THREE edits on the existing rule — a value-lift, not new authoring. The border/bg slots + the `:active` press are untouched.
- **`scripts/proof-metric-hover.mjs`** (created, born-RED — device-free `["ci","release"]` — OR fold into an existing Band-12 customizability gate if one owns the metric-badge register; the wave authors a small dedicated gate to keep the value-lift machine-locked):
  - **MH1 — the `--metric-badge-hover-translate` slot exists + defaults `-2px`.** `.metric-badge:hover` writes `translate: 0 var(--metric-badge-hover-translate, -2px)` (the value-lift rise; the slot the consumer retunes). Born-RED: no translate at HEAD.
  - **MH2 — the scale default is lifted to 1.04.** `--metric-badge-hover-scale` defaults `1.04` (NOT the HEAD `1.02`). Born-RED on `1.02`.
  - **MH3 — the shadow default is `--shadow-cartoon-sm`.** `--metric-badge-hover-shadow` defaults to `var(--shadow-cartoon-sm)` (the cartoon-sticker offset — NOT the HEAD soft `0 2px 10px`). Born-RED on the soft shadow.
  - **MH4 — compositor-only + the slots are consumer-retunable.** The lift legs are `translate`/`scale`/`box-shadow` (NO layout property — `proof:no-layout-animation` mirror); every lift value reads a `--metric-badge-hover-*` slot (a consumer zeroes/retunes from `:root`). Self-test: a layout-property lift reds; a hardcoded `-2px`/`1.04`/cartoon-shadow with no slot reds (the token-first floor).
  - **+ a self-test bite per clause.**
- **`scripts/gates.mjs`** — register `proof:metric-hover`, `tags:["ci","release"]`.
- **`tests-visual/metric-hover.spec.ts`** (created — the π readback, both modes, LOCAL real-render): a hovered `.metric-badge` nudges UP 2px (measured `translateY` ≈ -2px), scales `1.04`, casts the cartoon shadow (the offset-stamp); a `--metric-badge-hover-translate: 0` override keeps it flat; the cartoon shadow re-tints under `.dark` (the token-adaptive arm). LOCAL-only (rides the `proof:ba-gestalt` data/custom verdict).
- **CLAUDE.md:** the metric-badge note (if one exists) gains a one-line clause — *"the metric-badge hover is a tactile VALUE-LIFT (BC.W-AX-METRIC-HOVER): `--metric-badge-hover-translate` (-2px rise) + scale 1.04 + `--shadow-cartoon-sm` (the cartoon-sticker offset), token-first (a consumer zeroes the lift from `:root`)."* (a small value-lift note; this is a minor edit, modify-IF per discoverability.)

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt (dev-tools MCP, both modes):** a hover capture of a `.metric-badge` BEFORE (scale 1.02, soft shadow, no rise) vs AFTER (nudges up 2px, scale 1.04, cartoon-sticker shadow casting under it). A reader sees the metric pill lifts when hovered — a tactile, lively nudge. Lands at `docs/tranches/BC/audit/visual/W-AX-METRIC-HOVER-DELTA.md`.
2. **Machine gate `proof:metric-hover`** (born-RED → GREEN): MH1 (the translate slot, -2px), MH2 (scale 1.04), MH3 (cartoon-sm shadow), MH4 (compositor-only + token-first). The self-test bites red the synthetic violations.
3. **π readback `tests-visual/metric-hover.spec.ts`** (both modes, LOCAL real-render): the hover translateY ≈ -2px, scale 1.04, the cartoon shadow; the `--metric-badge-hover-translate: 0` override keeps it flat; the cartoon shadow dark-arm re-tints. The binding PAINT verdict rides the `proof:ba-gestalt` data/custom verdict.

## Fences / invariants (must NOT regress)
- **A VALUE-LIFT, not new authoring.** The `.metric-badge:hover` slots EXIST (`components.css:50-57`); this adds ONE slot (`--metric-badge-hover-translate`) + lifts two defaults (scale `1.02→1.04`, shadow → `--shadow-cartoon-sm`). The hover surface lift (border/bg → resting rung) + the `:active` press are UNTOUCHED.
- **Token-first — every lift leg reads a slot.** The rise/scale/shadow all read `--metric-badge-hover-*` slots; a consumer zeroes (`--metric-badge-hover-translate: 0`) or retunes from `:root` (MH4). NO hardcoded magic literal off a slot.
- **Compositor-only.** The lift is `translate`/`scale`/`box-shadow` — NO layout property animates (`proof:no-layout-animation` mirror, MH4). The press (`:active` scale) is unchanged.
- **The cartoon shadow is token-adaptive under `.dark`.** `--shadow-cartoon-sm` rides `--shadow-color: var(--foreground)` — the dark flip re-tints it (no `.dark` re-declaration owed; the existing cartoon-shadow contract).
- **Clean break on the lifted defaults (no alias).** The old `1.02` scale + the soft `0 2px 10px` shadow are REPLACED (the lift is the new identity — no `--metric-badge-hover-scale-legacy`). A consumer wanting the old values overrides the slot.
- **MIGRATION: none** — a value-lift on the hover (a bare `.metric-badge` gains the more-emphatic lift, a visual upgrade — no public-prop break).

## Folds + the cross-repo consume-seam
- **AX BC-W7 (the metric-badge value-lift)** — **DECIDED — BUILD:** `--metric-badge-hover-translate` (-2px) + scale 1.04 + `--shadow-cartoon-sm`. The intake's exact ask — a value-lift on the existing slots.
- **The cross-repo consume-seam (the speedtest metric pills):** the speedtest fleet's metric badges (the result tiles) inherit the value-lift transparently (they compose `.metric-badge`; the lift is inherited on the bump — a visual upgrade, no speedtest edit). A speedtest preset wanting a different lift overrides `--metric-badge-hover-*` from its `:root` (presets-in-consumers). **Publish-then-consume:** consumable after the BC `4.0.x`/`4.1.0` cut publishes the lift + speedtest re-pins (`^4.x`, `BC.W-SPEEDTEST-ADOPT`). No speedtest-side interim to delete (the lift is an inherited upgrade). Recorded in `docs/tranches/BC/coordination/SPEEDTEST-BC.md` §"speedtest folds".
