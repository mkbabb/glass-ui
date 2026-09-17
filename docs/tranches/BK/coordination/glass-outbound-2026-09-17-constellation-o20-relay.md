# glass-ui → the constellation—O-20 disposition relays (2026-09-17)

**From** glass-ui (BK O-20 disposition seat) · **date** 2026-09-17 · **ledger of record**
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md`, cited, never restated ·
**datum** published 9.0.0 (`d4f7b24f`, `latest`). The O-20 batch was value.js's letter, but
its re-read measured every sibling. This page carries what lands on each—facts found on
your bytes, not asks. Consumer-updates ruling throughout: **no edits were made in any of
these trees**; every action is yours, in your tranche, at your adopt. Installed pins at
the census are stated per repo; nobody is on 9.0.0.

---

## 1 · fourier-analysis (`web/package.json` ^4.0.0, installed 4.0.0)

- **PD-1 / DISSENT 6 (A-10)—the producer ruling you asked for.** The Slider docblock's
  "`$attrs.onPointerdown` is DROPPED across the Slot/forwardRef boundary" is FALSE at both
  pins. reka `SliderRoot.js:149` merges `$attrs` via `mergeProps` (chains, never shadows);
  mounted on your own reka 2.9.10 / vue 3.5.38 the consumer handler fires. Your
  `GlassTimeline.vue:73` `@pointerdown="onPointerDown"` works. Measured order:
  `reka:slideStart` → `reka:update` → yours—you run last and cannot `preventDefault`
  ahead of slide start. Your rider "native listeners on the resolved host, never template
  bindings on the forwarding chain" was sized against a false producer claim; F.W3 g6 and
  the DO-NOT-EXECUTE register re-read accordingly.
- **A-12 (FR-MSP-12)—ROUTED to you.** The accent-on-accent `@supports` fallback is
  emitted by your Tailwind over your SFC (`MorphShapePreview.vue:165-172`, scoped hash in
  `FourierMorphDemo-*.css`); zero of glass-ui's 11 synthesized pairs carry `--accent-`.
  Recipe: author the mix bare so a legacy engine drops the declaration and lands on the
  `.info-chip` base's `--muted` plate you already measured legible. No guard-synthesis
  policy on either side.
- **F.W3/W4 awareness note—RETIRE it.** "Any pressed-state work must not assume a
  border channel exists" is false at 9.0.0: `.button` carries `border: 1px solid
  var(--button-edge)` unconditionally (the destructive arm proves it paints);
  `.glass-capsule` declares no border to fight it. Button has no `pressed`/`aria-pressed`
  paint by design (Button is the command); re-home toggles onto `<Chip mode="selectable">`
  or `ToggleGroupItem`.
- **B-6—the cursor lands as an upgrade, not a restoration.** CU-1's deleted baseline was
  `cursor:pointer` on `.glass-track`; 9.0.x's Slider gets `grab` / `grabbing` /
  `not-allowed` (the house drag idiom). Expect grab, not pointer.
- **B-4—your own override is now the regression.** `web/src/style.css:116-123` sets
  `--viz-amber` / `--section-color-5` to `hsl(35 76% 35%)` in an unlayered `:root` that
  shadows ours by import order. That was filed against 4.0.x's 3.54:1; since 4.1.0 the
  library ships `oklch(0.530 0.124 69.6)` at 5.214:1 on `--background`, and your carry
  paints 4.709. Strike the block. `EasingPicker.vue:47` "sole in-tree consumer" is your
  note and is stale twice (adopt `<EasingCurve>` off `./easing`, set `--motion-accent`).
- **B-5—`useClipboard`'s shape moved.** Import from `@mkbabb/glass-ui/dom`; and since
  7.0.0 `copied` is REMOVED (`{status, copy, invalidate}`; MIGRATION.md:670). Your
  three sites destructuring `{copied, copy}` (`useMorphConfig.ts:58`, `UserSlugBar.vue:23`,
  `EquationResult.vue:15`) carry `copied → status.value === "success"` at the adopt.
- **B-3—`text-admin-label` (7 sites / 4 files) is gone since 8.0.0**; drop-in
  `text-mono-micro` + `uppercase font-medium` where meaning rode the caps/weight.
  `.paper-texture` (`App.vue:24`): compose the v4 recipe from the two shipped tokens
  (`--paper-clean-texture`, `--paper-texture-size`, own box, `background-blend-mode:
  multiply`).
- **B-7—L-10 (13 roots, no wrap).** The wrap law (`accentFor`, `HUE_STOPS`) goes public
  on `./timeline`; light stops 4/6/10/11 retune to clear 4.5:1 (your `style.css:121/126`
  pins stop 5 only and is unaffected).
- **A-3 class**—your five class-bearing Dialog roots (`ExportModal.vue:49`,
  `GalleryView.vue:402`, `GalleryCardModal.vue:71`, `gallery/AdminFlaggedPanel.vue:265`,
  `gallery/AdminUserList.vue:461`) sit under unlayered producer geometry; the 10.0.0 wave
  layers it. Nothing to do now.
- Adopt hinge, unchanged: `./configurator` ×4 files, `./slider` ×7, `./button` ×34,
  `./tabs` ×3—4.0→9.0 is your sweep.

## 2 · keyframes.js (`package.json` 7.0.0)

- **A-13—your `--rainbow-*` override is partial.** `demo/styles/design-idioms.css:12-21`
  declares six vivid names + your own `--rainbow-cyan`, no `--rainbow-indigo`, no pastels.
  So `.rainbow-vivid` (TransportDock.vue:67/:203, RibbonBar.vue:50) paints six hsl crayons
  spliced with one oklch indigo today, and `.rainbow-pastel` is 100% ours. The family is
  the documented override point and stays; complete the override (indigo + the pastel
  seven) or own the gradient outright.
- **B-3—`text-admin-label`, 16 sites / 10 files** (`SquareInstrument.vue:30`,
  `SequenceTarget.vue:39`, `SpringTarget.vue:45`, `MbabbMenu.vue:12/38/50/65/66`,
  `ChannelOptions.vue:234`, `KeyboardShortcutsModal.vue:12`, `KeyframeTimeline.vue:108`,
  `TimelineCaret.vue:9/19`, `TimelineHoverPreview.vue:17/20`; `design-idioms.css:225` is a
  comment). Gone since 8.0.0 → `text-mono-micro` (+ `uppercase font-medium`).
- **A-9—THP (D-12/D-15)**: the tooltip ceiling lands (`--reka-popper-available-height`,
  `overflow-y: auto`); your `TimelineTrack.vue:86-93` width cap stays yours.
- **A-7—the roving door is `useSelectionGroup` on `./motion-core`** (KPT-SUP-4 / G-W6-2 /
  CC-C-6 migrate onto it or onto `SegmentedTabs semantics="tabs"`). It was published at
  7.0.0.
- **A-2**—`glass-chip.css` is reachable from 8.0.0; your two Chip sites
  (`EasingTarget.vue:138`, `SpringPhysicsFacet.vue:131`) paint at the bump.
- `KeyboardShortcutsModal.vue:3` `class="max-w-md"` sits under unlayered Dialog geometry
  (A-3 class, 10.0.0).

## 3 · slides (`package.json` 3.13.0, pinned)

- **`<FourierField :color-resolver>` and `variant="hero" / "final"` no longer exist.**
  `Slide01.vue:11,32-37` and `Slide05.vue:24,43` import `defaultBlobColorResolver` from
  `./color` and bind it to a prop removed at `4a86570b` (first carried by 9.0.0); `variant` is likewise
  absent from the 9.0.0 props (`config · spectrum · getPalette · color · seed · freeze ·
  interactive`). At 3.13.0 both work; at the bump both fall through to attrs silently. The
  adopt drops the binding and keeps `color="var(--viz-fourier)"`. `defaultBlobColorResolver`
  itself is ruled for deletion at 10.0.0—do not re-point to it.
- **CUT-6..8—DECK-RELOCATION's promise is being kept, not cut.** `darkModeSyncScript`'s
  `defaultDark` widens to `{ absent, auto }` so your `main.ts:28-54` split (absent → light,
  `"auto"` → OS) collapses to one config call at the adopt, as ruled at
  DECK-RELOCATION.md:31.
- `deck.css:190-192` is the worked example of the correct `--glass-shadow-*` spelling
  (A-14) and is cited in README as such.

## 4 · speedtest (`package.json` ^4.0.1, installed 4.0.1)

- **`./toggle-chip` is not in the 9.0.0 map**—`SurveyField.vue:162` imports `ToggleChip`
  from it (folded onto `./chip` at 5.0.0). Adopt row.
- **`./timeline`—`GlassTimeline` is gone** (`PhaseTimeline.vue:49`; the dispatcher died at
  8.0.0) and `./api` (`:52`) was removed by the BH reshape. Successor: `<Timeline>` from
  `./timeline` for the reporting axis; `<Slider :marks>` for a commanding playhead.
- **`--icon-hero`**—`src/design/tokens.css:727` redeclares it at 72px over glass-ui's
  56px by import order, in a file whose header says only project-specific values live
  there. Your call; stated so it is not a surprise. `--icon-2xl` stays (your five
  `size-icon-2xl` sites are the reason).
- Your five class-bearing Dialog/Sheet roots (CellularWarningDialog, SubnetAddDialog,
  SubnetSyncDialog, ResultDetailSheet, SurveyWizard) sit under the A-3 class; 10.0.0.
- `./styles` is a live import (`src/design/index.css:41`, `index.html:359` fonts)—the
  A-1 parse gate protects your build too.

## 5 · atlas (`package.json` 6.0.0 exact, installed 6.0.0)

- **B-7—stop 4 retunes.** `src/design/tokens/color.css:184`
  `--viz-program-rural-healthcare` aliases `--section-color-4`, whose light L drops ~0.03
  to clear 4.5:1 as text on `--card` (your fills are non-text and already clear 3:1). Your
  `tests/gates/cream-law.gate.ts:374-380` fixture re-baselines as it did for the stop-5
  retune—same precedent, same file.
- **`/handmark` does NOT retire**—a standing ruling this pass banks against a stale
  re-audit clause in our consumer-evidence doc. Your three imports (`AnimatedRule.vue:34`,
  `charts/glyph/HandMark.vue:26`, `useMarkMorphology.ts:40`) are the reason.
- A-13: your `DockCrest.vue` passes `:stops` (required), so the rim's `--rainbow-*`
  defaults never fire for you.


## 6 · sci-report (`dashboards/package.json` 7.0.0; installed 6.0.0)

- B-7 transitively: `usf/features/flow/constants/strands.ts:16-19` reads atlas's
  `--viz-program-*`, which resolve to stops 5/2/7/4—stop 4 moves with atlas.
- `dashboards/index.html:15-27` is a hand transcription of `darkModeSyncScript()`'s default
  emission; the `transformIndexHtml` recipe landing in MIGRATION §8.1.0 is the way to call
  it instead of copying its bytes.
- `sci-report/atlas/docs/precepts/tunable-anim.md:114` and `affordance-map.md:85` (your
  vendored copy of the `mkbabb/precepts` upstream, which glass-ui also tracks as
  `docs/precepts`) carry the stale `--card-press-t` row; canonical is `--cartoon-press-t`.
  The fix is upstream, in precepts.

## 7 · muster (`frontend/package.json` ^3.1.0)

- `./toggle-chip` ×2 (`voter/OriginPrefsPopover.vue:36`, `voter/VoterRow.vue:21`)—not in
  the map; door is `./chip`.
- `./configurator` ×4 files gain the A-11d hover cure at the bump.
- Four class-bearing Dialog/Sheet roots sit under the A-3 class; 10.0.0.
- Our audit's consumer-path list wrote `../muster/src/` (real: `../muster/frontend/src`);
  corrected on our side so future sweeps see you.

## 8 · words (`frontend/package.json` ^3.0.0)

- Five `--ease-spring-smooth` / `--ease-spring-snappy` readers (`WordListUploadModal.vue:227`,
  `SearchControls.vue:239/245/246`, `TimeMachineOverlay.vue:300`; `transitions.css:91,99`)
  name tokens that left the published roster between 7.0.0 and 9.0.0 (the 13-token table).
  At ^3.0.0 they resolve; at the re-pin they need a local value or the surviving rung.
- `words/frontend/glass-ui/` is a vendored copy of this library; it is not a consumer edge
  and is excluded from every count above.
- Your `.paper-texture-overlay` (`assets/index.css:189`) is the compose-your-own precedent
  B-3 cites.

## Owed back to glass-ui

Nothing blocking from any repo on this page; breaks beyond these rows reply on this
thread → #76's routed table.
