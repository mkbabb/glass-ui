# O-23 + O-32 — driver rulings (2026-09-22, Fable)

Inbound: **O-23** `coordination/fourier-to-glass-2026-09-17-nwo1-bh-relay.md` (fourier F.W1 NWO-1; pin
8.0.0 @ 17a11bc5; §1 residual, §2 twenty-one strikes, §3 L-1..L-7, §4 negatives, §5 asks) and **O-32**
`coordination/value-to-glassui-2026-09-DD-fw4-relay.md` (F.W4 relay; §1.1/§1.2, §2.1-2.4, §3.1-3.4,
§4.1-4.3, the 2026-09-22 erratum, addendum A-1..A-3). Evidence of record: the eight seat JSONs in
`seats/` (wf_1b70278c-f61, four clusters × investigator + ASSUME-WRONG verifier; verifier verdicts
per row). Datum: master `cbc1c979` (the 10.0.0 tree, all five register-wave lanes landed; CI green).
Word sets as the O-20/O-26 ledgers. Where the verifier overturned or amended, the verifier's figure is
the figure of record unless a ruling below says otherwise. Cures land at HEAD for the 10.0.0 cut;
BREAKING cures are lawful there and are marked.

## §A · Rulings by row

### O-32 §2 + addendum + O-23 L-4 (contrast-tokens)
- **§2.1** ANSWER (verified): graphical half cured at HEAD by Lane T (3.30/3.27 on --card); text-bearing
  4.5 declined under C-1 (foreground ink is the terminal contract; no `--success-ink`); symbolic tier
  closes with B-7's ramp (stop 4 → 4.85). **Library residue → CURE-NOW (paint-only):** `Metric`'s
  up-delta paints TEXT in `--success` (`metric/styles.css:99-101`, 3.30 on --card) against C-1. The
  lane measures Metric's delta markup: the delta text takes `--foreground`; polarity paints the
  existing glyph/sign mark in the tone if one exists, otherwise the number and sign carry polarity
  and no tone rides text. Existing metric test witnesses it born-RED.
- **§2.2** ANSWER (verified, amended): `--card`/`--background` differ on purpose (warmth, not L);
  separation is edge + cast; the consumer draws the boundary once with Card's own form. **Docs
  CURE-NOW:** DESIGN.md palette block (real values, one-ink sentence) — Lane R2; the stale figures in
  `color-radius.css:60-72` and `:127-128` — Lane CT (comment bracket, dated).
- **§2.3** CURE-NOW docs (verified, amended): `--border-strong` DECLINED (one-ink law); DESIGN.md gets
  the boundary sentence scoped to **fields and check controls** (Input/Textarea/NumberField/Checkbox/
  Switch/Radio paint `--foreground` at `--ink-perimeter`, 3.1/3.8 on --card). RULING on the side
  reading: SelectTrigger / ToggleGroupItem / `.input-bar` are text-identified controls; 1.4.11 does not
  require a boundary for them; no paint moves; recorded here, not claimed in the doc.
- **§2.4** ANSWER (verified, amended): no 14th stop; B-7's recipe is the citable rule; every light stop
  ≥ 4.52 on --card / ≥ 4.70 on --background at HEAD; after the bump their stop 4/10/11 overrides and
  `.dark` restatements are redundant → delete.
- **A-1** CURE-NOW (verified, Chromium-probed): `ladder.css:234` `:where(.feedback-tone, .glass-capsule,
  .glass-capsule-track)`; born-RED row in `contrast-computed.test.ts` (≥ 4.5 over the quiet plate on
  --card, both arms). Lane CT.
- **A-3** CURE-NOW (verified, Chromium-probed): `segmented.css` before the underline `:hover` rule:
  `.segmented-tabs--underline .segmented-tab:not([data-active]) { color: var(--muted-foreground); }`
  (the guard is required — probed); born-RED contrast row. Lane CT.
- **L-4** ANSWER (verified, amended): tier tint's home is glass-ui (`--tier-featured/--tier-saved` +
  bridges), a tint not a text ink; of GAB-2(a)'s options the second: no tone axis on `<Metric>`, tier
  rides a mark/plate beside a `--foreground` numeral (drop `class="text-tier-*"` from `<Metric>`); the
  3.26 rung is the deleted MetricBadge's /80 label, not a band; alpha-muted `--muted-foreground` as
  text is a defect. RULING: the tier light arm (1.53/2.72) stays — no library reader, the N-2 census
  principle; graphical-floor composition is the consumer's. **Library residue → CURE-NOW:** the three
  alpha-muted TEXT sites (`ConfiguratorRow.vue` /70 and /80, `ConfiguratorLayer.vue` /70) drop the
  alpha (5.01 on --card); the /60 icon and aria-hidden numerals stay. Lane CT.

### O-32 §3 + A-2 + O-23 L-6/L-7 (dom-a11y)
- **§3.1 + erratum** ANSWER (verified, amended): the node is reka's Toast FocusProxy through our
  `<Toaster>`; fourier's own `toast("Admin mode activated")` is up during every admin axe pass; no reka
  release changes it; we patch no reka DOM; remedies: axe after the toast closes, or the exclusion
  selector. RULING: no upstream note is filed by glass-ui (not a glass-ui cure); ANSWER, not ROUTE.
- **§3.2** CURE-NOW (verified, tested on a patched dist): `DialogContent.vue` + `SheetContent.vue` stamp
  `:aria-modal="dialogRoot.modal.value ? 'true' : undefined"`; witnesses in `dialog-attrs.test.ts` +
  the Sheet pair. Lane DA.
- **§3.3** CURE-NOW **BREAKING** (verified, witness run): `useSidebarFollow.ts` exempts
  `[data-toc-id], [data-sidebar-follow-exempt]`, the class match goes (no dual selector); docblock;
  born-RED happy-dom unit. RULING: the attribute name is `data-sidebar-follow-exempt`; the letter carries
  it so fourier's latex-paper letter can ask for the same name. MIGRATION row (R2). Lane DA.
- **§3.4** CURE-NOW **BREAKING** (verified): `parentId` = direct parent, `null` for roots; `rootId`
  unchanged; `useScrollTracker.activeRootId` reads `rootId`; `types.ts` docblock; `useScrollTo.test.ts:32`
  fixture to `null`; born-RED witnesses in `useTreeIndex.test.ts` + `useScrollTracker.test.ts`.
  MIGRATION row (R2). Lane DA.
- **A-2** SPLIT (verifier's amendment adopted): CURE-NOW not breaking — a press on a control inside
  `#persistent`/`#persistent-end` passes when press and click land on the same control (the
  `.dock-persistent` closest() arm, no new listener, no `markMorphStart`); the arriving-layer
  (fullscreen) half DECLINED with the await-settle remedy; a prop DECLINED. Witness: a GlassDock SFC
  unit (persistent press mid-morph fires; full-layer press mid-morph still swallowed). RULING on the
  live check: the lane runs one Playwright/Chromium check on the demo dock that a persistent control
  does not slide under a stationary pointer during the hover morph, and records it; Safari not
  required (identity logic, not paint). Lane DA.
  [2026-09-22 · DA STOP re-ruled → (a) LAND AS IS. DA's Chromium check (DA/RECORD.md, "the persistent
  arm") measured the precondition false by a bounded amount: `.dock-persistent` drifts 4 px during the
  morph (the collapsed→expanded pad, 8→12 px) and the control it brings under a pointer resting within
  4 px of its inline edge then shows its hover lift from t = 164 ms — 136 ms before the earliest press
  in the measured window. That is not race (b): no layer swaps, the control's identity is constant, and
  the press lands on a control that is visibly under the pointer with hover feedback. (b) pinning the
  persistent geometry through the morph is DECLINED — it freezes a liquid morph for a 4 px case against
  the liquid-weight and breath-of-life edicts; (c) declining the persistent half leaves fourier's
  reported defect in place. The adjudicator dictates: restore the banked cure and its SFC witness from
  DA/RECORD.md verbatim (`useDockClickIntegrity.ts` arm + `tests/components/custom/dock/
  GlassDock.click-integrity.test.ts`), RED→GREEN re-run recorded; the measured geometry stays in
  RECORD as the known bound ("a press within 4 px of a persistent control's inline edge during the
  morph activates the control it visibly hovers"); the LEDGER and the reply letter carry that bound in
  one sentence. The witness's stationary-pointer live check is recorded as measured, not as a pass.]
- **L-7** ANSWER (verified, amended): token scope follows DOM ancestry; the 8.0.0 counts 44/39/10 and
  the 9.0.0/HEAD counts 40/45/9 both go in the reply; CommandList does not teleport.
- **L-6** CURE-NOW (verified, amended): `offsets.css:93-96` docblock rewritten and `:63` drops
  `tooltip text-sm`; the tooltip arm in `overlay-plate.css` gains `line-height:
  var(--type-leading-caption)`; witness in `overlay-plate-available-height.test.ts`. RULING: the 2.4 px
  block change rides the next live-π band; recorded, no separate probe. Lane DA.

### O-23 §1 + O-32 §4 + O-23 L-2/L-3/L-5 (api-cascade)
- **§1 residual** ANSWER (verified, amended): landed at `46ab4124`; correction: 8.0.0's
  `dist/styles/glass/material.css` fails lightningcss (1:228, comment closed early by `src/**/*.vue`;
  browsers drop the swallowed `contain: paint` rule), cured at `2cfc1124` (in 9.0.0).
- **§4.1** CURE-NOW **BREAKING** (verifier's overturn adopted): `--font-serif-math: serif` declared in
  `bridges.css`'s plain `@theme` block (mints `font-serif-math`); `@utility cm-serif` deleted (an
  alias, forbidden); demo `typography.vue:147` → `font-serif-math`; docblock mentions; born-RED unit
  over the built dist. NEVER the unlayered token root (Chromium-probed: it would repaint fourier's 31
  sites). Roster delta (−`utility cm-serif`, +`theme --font-serif-math`, + the utility row): recorded
  by the lane, **rebound by the driver** with the ratchet at the close. MIGRATION row + the CLASS
  CONTRACT sentence (see §B-1). Lane AC1.
- **§4.2 + L-2** CURE-NOW (verified, amended): (a) the 12 misbucketed `text-*` names gain their true
  buckets (font-size alternation + a `text-shadow` rule before `text-color`); RULING: the same eviction
  class in `shadow` is cured too — the lane measures the roster's `shadow-*` size rungs and splits the
  bucket so a shadow COLOUR no longer evicts a shadow SIZE; (b) the docblock names the fall-through
  families (font-text/font-display, tracking-*, leading-*, semantic border-*/ring-* colours) — (a) is
  not extended to them (keeping both classes is not a defect). Witness: a unit in
  `classNames.test.ts` reading `.published-roster` (a test row in `npm test`, not a gate seat; gates
  stay 60). Lane AC1.
- **§4.3 SegmentedTabs** CURE-NOW (verified): `generic="T extends string = string"`, the seven types to
  `tabs/types.ts` with defaulted parameters, `defineModel<T>`; RULING: `T extends string` (numbers out
  of scope). Born-RED vue-tsc fixture mirroring EquationView. Lane AC1.
- **§4.3 glass-floating** ANSWER (verified).
- **§4.3 L-23** CURE-NOW (verified, amended): `layers.css:300-314` `of :not(.dock-separator)` + the
  bounded deep-middle rule; RULING on direction: the painted edge-in ladder is the intent; the
  `:292-299` "center-out" docblock is the error and is rewritten. Browser witness in the dock suite.
  Lane AC2.
- **§4.3 AC-D-1** ANSWER (verified, amended: the frame is a 4.0.0 fact). **Dead token → CURE-NOW:**
  `--dock-max-inline-size` (0 readers since 9.0.0, still declared/taught) is deleted — `offsets.css:40`
  + its docblock, `demo/stories/dock/overflow.vue:67`; MIGRATION: a late-row removal entry under
  `## 9.0.0` (removed at LATTICE, recorded at 10.0.0) — R2. The no-masking-fallback law. Lane AC2 (src/
  demo) + R2 (docs).
- **L-3** CURE-NOW (verified, amended): six tokens `--slider-track-height-{sm,md,lg}` /
  `--slider-thumb-size-{sm,md,lg}` in `sizing.css`'s unlayered `:root` (the house token shape; the
  declared-nowhere `var()` fallback shape DECLINED — it is the masking shape §4.1 strikes); the rungs
  read them with `min(thumb, track)`; the slider file stays unlayered; born-RED computed-style test
  (wrapper in `@layer glass-overrides`). Reply: overrides on a wrapper/element in any layer, or an
  UNLAYERED `:root`. Lane AC2.
- **L-5** CURE-NOW docs (verified, amended): the 7 subpath-stranded census rows + the 14
  symbol-stranded rows (8 handmark types gone at 9.0.0 → a `## 9.0.0` removal entry; 6 motion/motion-core
  types gone ≤ 8.0.0) marked removed with MEASURED retiring commits (`git log -S`); ControlSize →
  `/input`. Lane R2.

### O-23 L-1, §4.1, O-32 §1.1/§1.2, the strike audit (infinite-scroll-strikes)
- **L-1** CURE-NOW not breaking (verified in three engines on the published bytes): `InfiniteScroll.vue`
  stops passing its own root (root → viewport); `useInfiniteScroll.ts` adds `scrollMargin` = threshold
  beside `rootMargin`; the composable's `scrollContainer` option STAYS; demo comment rewritten;
  born-RED `it` in `infinite-scroll.contract.test.ts`. RULING: no Safari cell before the cut (an engine
  without `scrollMargin` degrades to load-when-visible, never a drain; not a masking fallback);
  recorded. Lane AC2.
- **§4.1** ANSWER: `./pagination` removed at v1.0.0, not a pending carry.
- **§1.1** ANSWER (verified): confirm the 8.0.0 disclosure; retire M-2/B-2; the GREEN-BY-TYPO probe
  note extended to 9.0.0 (2 false hits). **Docs residue → CURE-NOW (R2):** the 9.0.0 GlassDock reshape
  (`startCollapsed`/`interaction`/shell `alwaysExpanded` → `collapse: DockCollapse`, `ac471032`) has no
  MIGRATION or CHANGELOG row — a `## 9.0.0` late-row entry.
- **§1.2** ANSWER: noted; no batch tone at any pin.
- **Strikes S-1..S-21**: every strike STANDS. S-9 and S-12 stand on corrected grounds (S-9: B-3 never
  ruled the black paint; at 8.0.0 the grain is a light multiply, measured; S-12: cite `bca22bd9`
  v8.0.0, not A-9); S-2 (A-3-CLASS executed at HEAD), S-11/S-16 (`--success` moved at HEAD), S-5/S-10/
  S-13/S-18/S-20 (declared cures landed after 9.0.0, ship at 10.0.0) carry a "moved since" note; S-4
  corrects their pin framing (the ring ships in 8.0.0). The reply says **do not re-file** so their §5.3
  rule does not fire. **Erratum on our own I-32 B-2** (`@utility glass-plate` minted 8.0.0 via
  `4b1a9733`, not 9.0.0): a dated bracket in the O-20 LEDGER — R2.

### Driver items raised by the lane adjudicators [2026-09-22]
- **CT residue (out of CT's fence, ruled to ride 10.0.0 in the second wave, lane CT2):**
  `tests/composables/color/use-accent-tone.test.ts:45-46` asserts contrast against the struck card
  values (hsl(36 48% 97%) / hsl(24 8% 16%)) — a false witness; the fixture reads the shipped bytes
  (hsl(30 85% 96%) / hsl(26 22% 17%)) and the test stays born-RED-then-GREEN on the corrected fixture
  only if its assertions still hold (if a row flips, record it, do not retune). `src/styles/tokens/
  dark-arm.css:91-93` stale hsl + "lifted L16 card" → dated comment bracket with the true figures.
  `demo/shell/configurator/PresetEditor.vue:224` (/80) and `:366` (/70) are the L-4 alpha-muted TEXT
  defect in the demo shell → drop the alpha. The "1.28:1" history prose in `sortable-list/styles.css:11`
  and `proportion-register.test.ts:335/:404` STANDS as history. `demo/stories/data/metric.vue:40` and
  the MIGRATION mentions go to R2 as RECORD lists.
- **Metric §2.1 is a rendered-text change, not paint-only:** `:delta="3"` renders `+3`, compact
  `+12.4K`; `coalesceMetric` gains `signed?: boolean`. R2 writes it as a MIGRATION §10.0.0 row and a
  CHANGELOG line; the letter carries one sentence (fourier's GalleryAdminBanner renders `<Metric>`).
- **A-2 after the re-ruling:** RECORD/LEDGER/letter carry the 4 px bound sentence; the Chromium
  stationary-pointer check is recorded as measured, not passed; the CHANGELOG line from DA RECORD's
  FOR THE DRIVER joins §3.2/§3.3/§3.4/L-6 under `## 10.0.0` (R2).

- **AC2 witness engine (ruled at AC2's implement return):** happy-dom drops `@layer` blocks, so the L-23
  and L-3 witnesses launch a real Chromium from vitest. RULING: they launch the Playwright-BUNDLED
  chromium (`chromium.launch()` with no `channel`), never the machine's Google Chrome — a preinstalled
  browser is a runner-image accident, the bundled build is what ci.yml already installs for the pixel
  floor (`npx playwright install --with-deps chromium`). The verify job gains that same step after
  `npm ci`, and release.yml gains the identical step after its `npm ci` because it runs the same
  vitest tree [2026-09-22 · made explicit at AC2 Challenger B F1: BOTH workflows, one step each, no
  conditional]. AC2's fence widens by exactly that: the two witness files' launch line, the one ci.yml
  step and the one release.yml step; the adjudicator dictates it.
- **AC2 out-of-fence residue (ruled at AC2 Challenger B):** `src/components/dock/styles/shell.css`'s
  stagger docblock still teaches the struck `step × (childIndex − 1)` ladder — AC2's fence widens to
  that docblock (comment only, dated bracket, the edge-in ladder as painted). DESIGN.md's Slider axes
  paragraph names the six rung tokens — R2. `demo/stories/dock/overflow.vue`'s stale FadingScroll /
  narrow-cap prose is inside AC2's fence and is cured there.

- **AC2 `playwright` declaration (ruled at AC2's Challenger A):** the two witnesses import `playwright`
  while the root package.json declares neither `playwright` nor `@playwright/test`; the import resolves
  only through the tests-visual workspace hoist — an undeclared dependency, which is a masking shape.
  RULING: the root `devDependencies` declares `playwright` at the exact version the tests-visual
  workspace already resolves (one copy in the lockfile, no second browser download), refreshed with
  `npm install --package-lock-only` (no build, no dist); AC2's fence widens by the `devDependencies`
  entry and the lockfile lines it produces — never the `version` field. The `coarse-target.test.ts`
  re-point is a lawful path correction (the gate's rung derivation follows the L-3 seam; the gate count
  stays 60 and the seat is unchanged).

- **Roster rebind at AC1's implement return (B-3, driver's act):** `.published-roster` rebound in the
  working tree — `utility cm-serif` out, `theme --font-serif-math` in (289 names, sorted, one LF) — so
  AC1's challengers can build and run the dist witness; it commits WITH lane AC1's pathspec. The
  G-NO-ORPHAN-EXPORT "left the roster with no MIGRATION row" arm stays RED for `cm-serif` until R2
  writes the row — expected, recorded, not a lane defect.

- **AC1 path corrections RATIFIED (at AC1 Challenger B):** (1) `src/styles/theme/literals.css` is the
  owner of the plain `@theme` block (bridges.css holds only `@theme inline`), so `--font-serif-math`
  lands there and bridges.css carries a dated pointer only; (2) `useTabDragMorph.ts:13` import path and
  (3) `segmented-tabs.test.ts:229` `findComponent({ name })` are forced consequences of the ruled type
  move and are inside AC1's fence by that reach. The §4.2 depth-0 colon split that sends type-hinted
  arbitrary values (`text-[length:…]`, `shadow-[color:…]`) into a colour catch-all is a regression, not
  a ruled shape: the cure keeps the type hint's family (the adjudicator dictates the exact split).

- **L-23 both-ended bound RATIFIED (at AC2's adjudication):** the ±1/±2 rungs bounded from both ends
  as well as the deep middle is inside the direction ruling (the ruled-only shape paints `2 1 2` on a
  three-control row, mutation-proved); the post-R2 bracket pass puts RECORD's short-row sentence in
  the LEDGER and the letter. The release.yml bundled-Chromium step and the shell.css:87-106 stagger
  docblock bracket (onset `step × min(distance from the nearer edge, 3)`, maximum 0.24, last child
  finishes at 0.64 with the 0.4 window) are applied by the driver and commit with lane AC2.

- **R2 probe (from AC1's adjudication):** one vue-tsc line tells whether `InstanceType<typeof
  SegmentedTabs>` still resolves after the generic (a generic SFC's default export is a function
  type); the §4.3 MIGRATION test-code clause widens only if it errors. No in-repo user.

- **CT2 residue (at CT2's implement return):** `dark-arm.css:84` ("LIFTS L10→L16") is the same stale
  L16 — CT2's fence widens to that one line (dated bracket, L17). A CHANGELOG line for the demo
  configurator alpha drop is DECLINED (the demo does not ship in the package; CHANGELOG records the
  package). The tests-visual `dock-wrap-content-driven.spec.ts` question is ruled separately below.

- **`tests-visual/dock-wrap-content-driven.spec.ts` RETIRED (ruled at CT2):** it asserts
  `overflow="wrap"` (struck at BK #47 W1) against `--dock-max-inline-size` (deleted at AC-D-1); no
  package script, gate seat, CI step or roster binds it (measured: zero references outside the file).
  A spec for a deleted prop is legacy — the file is deleted (`git rm` is the driver's; the lane
  removes it from the tree with `rm`), the CT2 bracket it just received is moot, RECORD notes the
  retirement with the measured zero-binding census. Gates stay 60 (it was never a seat).

## §B · Class rulings
- **B-1 · the token-root contract.** glass-ui's token `:root` is unlayered (the A-3-CLASS exception) and
  beats every layered consumer `:root` (`@theme`, `@layer glass-overrides`). MIGRATION §10.0.0 states
  it: "`:root` token overrides must be unlayered, or set on an element below `:root` in any layer."
  Consumer-settable FONT registers live in the theme layer (`bridges.css` `@theme`, the §4.1 shape);
  every other consumer-settable seam is a plain unlayered `:root` token (the L-3 shape). A
  declared-nowhere `var()` default is never the shape.
- **B-2 · test rows are not gates.** A unit in the `npm test` tree that mints no gate seat is a test
  row; gates stay exactly 60. Every witness below is a test row.
- **B-3 · roster and ratchet are the driver's.** Lanes record deltas; the driver rebinds
  `.published-roster` and `.bundle-ratchet` on the committed tree at the close.

## §C · Lanes (fences disjoint), order, and the author lane
| lane | rows | fence |
| --- | --- | --- |
| CT | A-1, A-3, §2.1 residue (Metric delta), §2.2 comment figures, L-4 residue (Configurator alpha text) | `src/styles/glass/ladder.css`, `src/components/tabs/styles/segmented.css`, `src/styles/tokens/color-radius.css` (comments only), `src/components/metric/**`, `src/components/configurator/ConfiguratorRow.vue` + `ConfiguratorLayer.vue` (the three alpha classes only), `tests/styles/contrast-computed.test.ts`, `tests/components/**/metric*` |
| DA | §3.2, §3.3, §3.4, A-2 (persistent arm), L-6 | `src/components/dialog/DialogContent.vue`, `src/components/sheet/SheetContent.vue`, `src/composables/sidebar/**`, `src/components/dock/composables/useDockClickIntegrity.ts`, `src/styles/tokens/offsets.css` (:63, :93-96 only), `src/styles/glass/overlay-plate.css` (tooltip arm), their tests under `tests/components/dialog`, `tests/components/sheet`, `tests/composables/sidebar`, `tests/components/custom/dock`, `tests/styles/overlay-plate-available-height.test.ts` |
| AC1 | §4.1, §4.2+L-2, §4.3 SegmentedTabs | `src/styles/theme/bridges.css`, `src/styles/typography/utilities.css` + `typography.css` docblocks, `demo/stories/foundations/typography.vue`, `src/components/_shared/class-names.ts`, `src/components/tabs/SegmentedTabs.vue` + `types.ts` + `index.ts` + `useTabResponsive`, `tests/components/_shared/classNames.test.ts`, a vue-tsc fixture under `tests/`, a dist unit for the font declaration |
| AC2 | L-23, AC-D-1 dead token, L-3, L-1 | `src/components/dock/styles/layers.css`, `src/styles/tokens/offsets.css` (:33-40 only), `demo/stories/dock/overflow.vue`, `src/styles/tokens/sizing.css`, `src/components/slider/styles.css`, `src/components/infinite-scroll/**`, `src/composables/**/useInfiniteScroll*`, `demo/stories/data/infinite-scroll.vue`, their tests (`tests/components/custom/dock` stagger file, slider, infinite-scroll contract) |
| R2 | every MIGRATION §10.0.0 row above (incl. B-1's sentence), the `## 9.0.0` late rows (`--dock-max-inline-size`, GlassDock `collapse`, the 8 handmark types), L-5's 21 census rows, DESIGN.md (palette block, §2.3 sentence, tier note), CHANGELOG 10.0.0 additions, the O-20 LEDGER B-2 erratum bracket | `MIGRATION.md`, `CHANGELOG.md`, `DESIGN.md`, `README.md`, `docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` (bracket only) — runs LAST |
| AUTHOR | the LEDGER (`LEDGER.md` beside this file) + the ONE reply letter `coordination/glass-outbound-2026-09-22-fourier-o23-o32-reply.md` | those two files only; runs in parallel with the cure lanes; a final bracket pass after R2 reconciles the letter to what landed |

Order: (CT → AC1) ∥ (DA → AC2) ∥ AUTHOR, then R2, then the driver's roster + ratchet rebind, the
10.0.0 cut. `.published-roster`, `.bundle-ratchet`, `package.json` version: driver only.
