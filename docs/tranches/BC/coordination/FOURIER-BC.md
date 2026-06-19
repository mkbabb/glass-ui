# FOURIER-BC — the fourier-analysis-M ↔ glass-ui-BC green handshake (the cross-repo-inbound reconcile)

The single durable record of every fourier-analysis tranche-M cross-repo-inbound ask, its glass-ui-BC disposition (BUILD / BOOK / VERIFY / STRUCK), the in-repo BC wave that lands it, and the consume-and-delete cadence. fourier delivered the consolidated deduplicated inbound list (its `ADOPTION-ASKS.md §11-§12`, intake at `docs/tranches/BC/inbound/FOURIER-INBOUND.md`); this doc RECONCILES the glass-ui-BC side against it — the green handshake. The no-silent-drop law (an ask that loses its disposition or its consumer wave reds the gate) is machine-locked by the per-ask gates (`proof:accent-tone`/`proof:split-chars`/`proof:motion-presets`/`proof:fourier-decides`) + the existing `proof:crossrepo-asks`/`proof:fourier-reconcile` pattern.

The communication is **content-only** (inv-26 — the foreign-tree fence): this doc is a glass-ui-side artefact ONLY. It reads the fourier sibling at its HEAD as AUTHORITY (the version, the inbound list, the `^4.0.0` pin) but edits ZERO fourier files. fourier NEVER writes glass-ui; the by-name ask is the only channel. Each fourier interim carries a no-legacy kill-date = the 4.1.0 ship (the consume-and-delete cadence).

**Boundary with `BC.W-FOURIER-ASK`:** that Band-10 wave owns the DISJOINT fourier cluster — the in-repo `/substrates/fourier` demo defect (Band 4) + the fourier-analysis WEB-workspace `^4.0.0` consumer bump + the R5-11 FourierField-root warm-lean. THIS doc owns the M-tranche cross-repo-INBOUND adoption asks (the FOURIER-INBOUND.md Tier-1..4 list). No double-ownership — the demo/bump/warm-lean cluster is `BC.W-FOURIER-ASK`'s, the adoption-asks list is this doc's + its build waves'.

## Freshness header (AZ-form — the relay is only as fresh as the sibling state it records)

| field | value |
|---|---|
| capture date | 2026-06-18 |
| glass-ui HEAD sha | `3f013523` (branch `tranche/BB`→BC dev); version `4.0.1` (the BC cut targets `4.1.0`) |
| fourier sibling | `web/` workspace `0.1.0`, pins `@mkbabb/glass-ui: ^4.0.0` + `@mkbabb/keyframes.js: ^4.3.0`; repo HEAD `04584a3` (read 2026-06-18); on-mainline (NOT the d6 fork-line); enrolled in `constellation.mjs` (`id:"fourier-analysis/web"`) |
| value.js sibling | `0.13.0` — ships `safeAccentColor`/`computeSafeAccent`/`needsContrastAdjustment`/`getOklchLightness` (`dist/index.d.ts:18`) + `sampleColorRamp`/`mixColorsN` (`:19`); ALREADY a glass-ui peer (the `/color` leaf imports it). No by-name ask owed — value.js shipped the helpers the accent-tone register composes. |
| keyframes.js sibling | `4.3.0` — `springTimingFunction` published (the convergence preset composes it); the KF-OSCILLATOR loop seam BOOKED kf-owned (not blocking) |
| sibling presence | the fourier sibling was PRESENT at this read (`~/Programming/fourier-analysis/web/package.json` + HEAD `04584a3`); the inbound list is the AUTHORITY fourier delivered (`FOURIER-INBOUND.md`, its `ADOPTION-ASKS.md §11-§12`). A re-run with the sibling present re-greps the live HEAD + re-records any drift (the no-silent-drop law). |

### §0 drift recorded (re-grounded at HEAD this authoring)

- **Tier-1 #1 is PARTIALLY transposed at HEAD already.** The overlay band (`glass/ladder.css:212-221`) was MEASURED by fourier as "self-darkens UNCONDITIONALLY" (the 4.0.x state) — but the iteration-0 audit commit `e1b4b44c` ("BC.W-AUDIT pre-fix — the glass grey-slab root-fix"; NOT a wave — a `bc-audit.mjs` pre-fix commit label, per the WAVE-INDEX name-drift map) already re-points it to `--glass-tint-strength: var(--glass-tint-strength-floor)` (the FLOOR by default, the AA darken engaging only under the bright bucket). So the unconditional-darken half is ALREADY closed at HEAD; the BC build half is the CONTINUOUS observer-driven darken (`BC.W-ADAPTIVE-RECONCILE`) + the measured AA bar (`BC.W-GLASS-LEGIBILITY-MEASURED`). The fold-note reconciles into those (the one-block oklab transposition is the continuous-driver half, not a fresh revert).
- **Tier-3 #11 is LARGELY SHIPPED at HEAD.** The Configurator ALREADY exposes `asideWidth` prop (`Configurator.vue:95`) projecting `--configurator-aside-min`/`--configurator-aside-max` (`:161-162`, default 280/360px) AND `--configurator-stage-min` (`tokens/sizing.css:446`, default 18rem — the mobile-height floor) wired into the mobile-column grid (`Configurator.vue:145`). So fourier's #11 ask (the stage-mobile-height + the aside-width token/prop) is mostly STRUCK — the seam is present at HEAD. The residual is the VERIFY (the stage resolves nonzero in the mobile column — confirmed: `min-h-0 overflow-hidden` inside `grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)...]`); fourier's `:deep(.configurator-stage)`/`grid-template-columns` workarounds are ITS OWN legacy that deletes on adopt (the seam closed the gap they fought). Recorded VERIFY → STRUCK-with-residual-note.
- **Tier-3 #10 is NOT struck.** `DockIconButton.vue:32-45` has NO `active`/`aria-pressed`/`data-active` prop (it is stateless — interactive styling is hover/press only). The `--dock-control-active-bg` register EXISTS + paints (`rail-extend.css:382`) but DockIconButton has no way to ENTER the active state. So #10 is a genuine BUILD (add the prop), NOT struck. Recorded VERIFY → BUILD.
- **value.js ships the accent helpers** — no by-name ask owed for `safeAccentColor`/`computeSafeAccent` (0.13.0, already a peer). The `--viz-amber` rebaseline (#13) is the FIRST library-token application of the helper (a baked `oklch()` value, since CSS cannot call value.js at the token tier).

## §1 — The Tier-1 reconcile (the two α asks fourier CANNOT self-fix — DO THESE FIRST)

These two are fourier's most-wanted: an override would need `!important` to beat glass-ui's `:where()` tint (forbidden), so fourier cannot self-fix them. If BC lands just these two, fourier's darkened-dropdown + square-search resolve AT THE SOURCE for every consumer, and M.W5 becomes pure adoption.

### #1 — Overlay-band bright-signal gating → the adaptive band (FOLD-NOTE, no new wave)
**DISPOSITION = BUILD — RECONCILE into `BC.W-GLASS-LEGIBILITY-MEASURED` + `BC.W-ADAPTIVE-RECONCILE`.**
- **The ask:** the overlay band self-darkens UNCONDITIONALLY (fourier measured `ladder.css:200-204` at 4.0.x) while the content tiers gate the AA darken behind `@container style(--glass-backdrop: light)` (`:216-219`). Extend the bright-signal gating to the overlay band — floor `--glass-tint-strength` unconditionally, full AA only under a declared/sampled light backdrop (backdrop-detecting, NOT a blanket revert — dark siblings keep the lift). A one-block transposition on the same oklab axis.
- **The HEAD reconcile:** the unconditional-darken half is ALREADY closed at HEAD (`glass/ladder.css:212-221`, the iteration-0 audit commit `e1b4b44c` floors the overlay band by default — that commit label is a `bc-audit.mjs` pre-fix tag, not a wave). The BC build half is the CONTINUOUS observer-driven darken — `BC.W-ADAPTIVE-RECONCILE` closes the luma observer loop (the overlay band's `--glass-tint-strength` becomes a `clamp(floor .. aa)` lerp off the measured `--glass-backdrop-luma`), so the overlay band floors when the backdrop is calm/dark + darkens only under a measured bright backdrop. `BC.W-GLASS-LEGIBILITY-MEASURED` proves the AA bar (the overlay plate clears 4.5:1 WHILE α < 0.86, both modes). The dropdown over a light app surface darkens just enough to stay legible; over a dark sibling it keeps the W-DARK-MATERIAL lift.
- **FOLD-NOTE for the Index:** thread into `BC.W-ADAPTIVE-RECONCILE` (the overlay band joins the content/dock `:where()` rules driven off `--glass-backdrop-luma`; the §3a / the `glass/ladder.css:212` overlay block re-points from the flat floor onto the continuous clamp — the same oklab calc the content tiers use) AND `BC.W-GLASS-LEGIBILITY-MEASURED` (the overlay plate is ADDED to the measured-AA roster — the dropdown/menu surface clears the bidirectional bar). No new wave; a one-block transposition on the existing adaptive seam.
- **The fourier consume:** M.W5 becomes pure adoption — fourier's darkened-dropdown resolves at the source (it deletes its dropdown-darken workaround on the `^4.1.0` bump).

### #2 — Rounded glass focus-ring + a real Input/SearchField → `BC.W-CONTROL-CUSTOM` + `BC.W-SEARCH-CUSTOM` (FOLD-NOTE + VERIFY)
**DISPOSITION = BUILD/VERIFY — RECONCILE into `BC.W-CONTROL-CUSTOM` + `BC.W-SEARCH-CUSTOM`.**
- **The ask:** 4.0 ships only Tailwind `outline` utilities that square the corner + offset past it (the square/offset search). Ask: an Input/SearchField consuming `--radius-input` + a radius-FOLLOWING `box-shadow` focus-ring (`border-radius: inherit`, contrast-target = the composited glass fill), promoted as a standalone `.focus-ring` utility.
- **The HEAD reconcile:** glass-ui HAS `ui/input` + the `--focus-ring-shadow`/`--invalid-ring` register (`.focus-ring` utility, BB.W-INVALID-RING). The ask is the radius-FOLLOWING ring (`border-radius: inherit` so the ring follows the pill corner, NOT a squared outline) + the composited-fill contrast target (the ring reads ON the glass plate, W-ON-GLASS-FG). VERIFY: the `.input-pill` focus ring is a `box-shadow` (radius-following by construction — a `box-shadow` follows `border-radius`, unlike `outline`) — confirm + record. The SearchField is `BC.W-SEARCH-CUSTOM` (the glassified SearchBar/FuzzySearch with the `--control-*` cohort + the glass surface).
- **FOLD-NOTE for the Index:** (a) thread the radius-following-ring VERIFY into `BC.W-CONTROL-CUSTOM` (the `.input-pill`/`.focus-ring` register confirms `box-shadow` + `border-radius: inherit`-equivalent, NOT a squared `outline`; the contrast-target = the composited glass fill via W-ON-GLASS-FG — RECORD if already-correct, else fix the offset/square); (b) `BC.W-SEARCH-CUSTOM` is the real SearchField (the standalone `<SearchBar>`/`<FuzzySearch>` glassify + the size axis). The `.focus-ring` utility is ALREADY standalone (`utilities.css`, the token-first focus register AW.W26); the promotion ask is met by the existing utility — VERIFY the radius-following + record.
- **The fourier consume:** the square/offset search resolves at the source — fourier adopts `<SearchBar>`/`<FuzzySearch>` (or the `.focus-ring` utility) and deletes its squared-`outline` workaround on the `^4.1.0` bump.

## §2 — The Tier-2 build asks (the net-new primitives — apply the ≥2-bar)

| # | ask | DISPOSITION | wave | ≥2-bar |
|---|---|---|---|---|
| #3 | accent-tone / SelectableChip | **BUILD** | `BC.W-ACCENT-TONE` | MET (ToggleChip + demo + fourier ~57× + value.js palette chips + speedtest tone badges) |
| #4 | AtomDiff | **BOOK** | `BC.W-FOURIER-DECIDES` | UNMET (3 divergent shapes) → promotion trigger recorded |
| #5 | convergence-reveal preset | **BUILD-small** | `BC.W-MOTION-PRESETS` | MET (fourier viz + equation + demo) |
| #6 | SplitChars / useCharStagger | **BUILD** | `BC.W-SPLIT-CHARS` | MET (every hero, by construction) |
| #7 | canvas-anchored-overlay | **BOOK** | `BC.W-FOURIER-DECIDES` | UNMET (1 named binary) → promotion trigger recorded |
| #8 | scroll-reveal=once | **BUILD-small** | `BC.W-MOTION-PRESETS` (+ scroll-recipe boundary with `BC.W-SCROLL-TRIGGER`) | MET (virtualized scrollers + fourier) |

- **#3 (`BC.W-ACCENT-TONE`):** the contrast-floored 3-channel tonal register (`--accent-fill` idle ≥3:1 + `--accent-band`/`-edge`/`-ink`) from one `--tone` via value.js `safeAccentColor` + `<SelectableChip>` (ToggleChip's tonal arm re-points onto the register; the 6× glass-ui-local + fourier ~57× hand-rolls collapse). The idle ≥3:1 floor is the load-bearing new behavior. ALSO folds #13 (`--viz-amber` rebaseline) — the same `safeAccentColor` mechanism, the small token half.
- **#5 + #8 (`BC.W-MOTION-PRESETS`):** the convergence-reveal preset (`--ease-convergence` — prefer the `gentle` reuse unless measurably distinct, no new engine) + the `[data-scroll-reveal-once]` latch (reusing the shipped `once` `IntersectionObserver` machinery). #8's CSS-recipe edit coordinates with `BC.W-SCROLL-TRIGGER` (the scroll READER — file-disjoint at the seam).
- **#6 (`BC.W-SPLIT-CHARS`):** `useCharStagger` + `<SplitChars>` per-glyph split with `--char-index`/`--char-total` + the MANDATORY accessible full-text label (the JS partner to the shipped `.char-stagger` CSS).
- **#4 + #7 (`BC.W-FOURIER-DECIDES`):** BOOK with named promotion triggers (the ≥2-bar genuinely unmet; the no-contrivance line).

## §3 — The Tier-3 refinement fold-notes (additive, into existing component waves)

### #9 — ConfiguratorLayer trailing/actions slot (FOLD-NOTE → a Configurator wave)
**DISPOSITION = BUILD-small (additive slot).**
- **The ask:** a right-aligned header slot inside a `@click.stop` boundary (aligns a panel-wide reset to the title AND retires fourier's `CollapsibleSection.vue`).
- **The HEAD ground:** `ConfiguratorLayer.vue:108-140` renders the section trigger as a `justify-between` `<button>` with `<span class="configurator-section-label">{{ label }}</span>` + optional `sub` on the LEFT and the chevron on the RIGHT (`:140`). A `#actions`/`#trailing` slot inserts a right-aligned region BEFORE the chevron, inside a `@click.stop` boundary (so a reset button in the slot does NOT toggle the section collapse — the trigger `@click="onToggle"` is the `<button>`, so the slot content must NOT be inside the toggle button OR must stop propagation).
- **FOLD-NOTE for the Index:** thread into a Configurator refinement wave (the `BC.W-CONFIG-RIGHT` config wave or a dedicated Configurator-ergonomics wave) — add a `#trailing` / `#actions` slot to `ConfiguratorLayer.vue` rendered as a right-aligned region (the mechanism: the slot sits OUTSIDE the toggle `<button>` as a sibling in the header flex row, OR inside with `@click.stop` — prefer the sibling-outside-the-button form so the slot is not a nested-interactive-in-button a11y violation; a reset `<Button>` inside a section-toggle `<button>` is invalid nesting). The slot retires fourier's `CollapsibleSection.vue`.
- **The fourier consume:** fourier retires `CollapsibleSection.vue` onto `<ConfiguratorLayer>` + the `#actions` slot on the `^4.1.0` bump.

### #10 — DockIconButton `active?` prop (VERIFY → BUILD)
**DISPOSITION = BUILD (the prop is genuinely ABSENT — NOT struck).**
- **The live VERIFY (grepped at HEAD):** `DockIconButton.vue:32-45` props are `compact`/`type`/`as`/`asChild`/`class` ONLY — NO `active`/`aria-pressed`/`data-active`. The component is STATELESS (interactive styling is hover/press via the `.dock-icon-button` recipe). The `--dock-control-active-bg` register EXISTS + paints (`dock/rail-extend.css:382` `background: var(--dock-control-active-bg, var(--glass-bg-floating))`) but DockIconButton has NO way to ENTER the active/selected state (the rail/TabButton enter it, the icon button does not). So a consumer building a selectable dock control (a filter toggle, a mode picker) cannot express "this icon button is selected" — it hand-rolls the active register.
- **DECISION: NOT STRUCK — add the prop.** `active?: boolean` stamps `aria-pressed` (the selectable semantic) + `data-active` (the CSS hook) + reads the EXISTING `--dock-control-active-bg` "selected reads as glass" register (W-REGISTER-IOS — the glass tier, NEVER a saturated brand hue; the negative-predicate guard `proof:register-ios` clause e holds). So the prop is ergonomic sugar + the sane default over the SHIPPED register, not a new paint.
- **FOLD-NOTE for the Index:** thread into a dock wave (`BC.W-DOCK-ENGINE` or a dock-control-ergonomics wave) — add `active?: boolean` to `DockIconButton.vue` stamping `aria-pressed`/`data-active` + the `.dock-icon-button[data-active]` rule reading `--dock-control-active-bg` (the existing register, no new token). The accessible-pressed semantic is the load-bearing half (a stateless icon button cannot announce "selected" to AT).
- **The fourier consume:** fourier's selectable dock controls read `<DockIconButton :active>` on the `^4.1.0` bump (deletes its hand-rolled active register).

### #11 — Configurator stage-mobile-height + aside-width prop (VERIFY → STRUCK-with-residual)
**DISPOSITION = STRUCK (largely shipped at HEAD) — the residual is a VERIFY + fourier's own workaround delete.**
- **The live VERIFY (grepped at HEAD):** (a) `--configurator-stage-min` (`tokens/sizing.css:446`, default 18rem) is wired into the mobile-column grid (`Configurator.vue:145` `grid-rows-[minmax(var(--configurator-stage-min,18rem),auto)_minmax(0,1fr)]`), and `.configurator-stage` is `min-h-0 overflow-hidden` INSIDE that definite track (`:201`) — so the stage resolves a NONZERO flex height in the mobile column (the GooBlob-hero-painting-nothing-on-a-phone collapse is closed by `--configurator-stage-min`). (b) `asideWidth` prop EXISTS (`Configurator.vue:95`) projecting `--configurator-aside-min`/`--configurator-aside-max` (`:161-162`, default 280/360px, retunable via the prop OR the cascade).
- **DECISION: STRUCK.** Both halves of #11 ship at HEAD (the mobile-height floor + the aside-width token/prop). fourier's `:deep(.configurator-stage)` patch + the `grid-template-columns` overrides (the "last inv-30 breaches" it names) are ITS OWN legacy workarounds built to fight the PRE-existing gap — the seam now closes that gap, so they DELETE on adopt (the foreign-tree fence — glass-ui never edits the fourier tree; the workaround delete is the consume).
- **RECORD:** the only residual glass-ui action is the VERIFY (done — the stage resolves nonzero, the aside-width prop is present). No new build. If a re-grep at execution finds a stage-collapse edge (a non-mobile-column path the floor misses), it folds into the same Configurator wave as #9 — but at HEAD the seam is complete.
- **The fourier consume:** fourier deletes its `:deep(.configurator-stage)` + `grid-template-columns` workarounds on the `^4.1.0` bump (the seam closed the gap — byte-equivalent at the default 18rem floor + 280/360 aside band).

## §4 — The consume-contract CONFIRMS (already in BC scope — each SHIPS at the 4.1.0 cut)

fourier depends on but does NOT re-ask for these — they ship at the cut as part of the BC band, and fourier's adoption sequences against them. The five API consumes (registers/components/value.js) are CONFIRMED present at HEAD `3f013523`; the paper-grid dependency is VISUAL (a rendered LOOK reshaped by SPEC waves, NOT an API import — see the row):

| consume | CONFIRMED at HEAD | fourier dependency |
|---|---|---|
| **`W-ON-GLASS-FG`** (muted-fg contrast-target = the composited glass fill) | `--on-glass-muted`/`--input-on-glass`/`--progress-track-on-glass` in `glass/ladder.css` + `tokens.css` | sequences M.W5's glass migration so text doesn't whisper-collapse on the translucent plate |
| **`W-LIQUIDHOVER`** (specular auto-arm) | `createSpecularWriter` + `vSpecular` (`composables/glass/vSpecular.ts` + `useSpecularTracking.ts`) | the tier-root pointer-following gleam (zero call-site wiring) |
| **paper-grid (VISUAL, not an API)** | the LOOK is being reshaped by `BC.W-GRID-SIMPLE` (the static CSS twin) + `BC.W-VIZ-PAPERGRID` (the liquid WGSL sibling) — both SPEC, ship at the cut | the page-background CRAFT the glass floats over — NOT a token/class API import (fourier never asks for it; it consumes the rendered LOOK, not a symbol) |
| **`W-BORDER-PROGRESS`** | `custom/border-progress/` (`BorderProgress.vue` + `useBorderSpectrum`) shipped | the living-chrome border ring (progress IS the element's border) |
| **`W-SCROLL-CARD`** | `ui/card/ScrollCard.vue` + `ScrollCardHeader.vue` shipped | the scroll-shrink card (the `:slotted()` scoped-slot idiom) |
| **value.js `sampleColorRamp` (0.13)** | value.js `0.13.0` ships it (`dist/index.d.ts:19`); the `/color` leaf imports value.js | the brand-spectrum ramp (the BorderProgress `useBorderSpectrum` consumes it; the consume-and-delete re-point) |

**CONFIRM:** the five API consumes (W-ON-GLASS-FG/W-LIQUIDHOVER/W-BORDER-PROGRESS/W-SCROLL-CARD registers + value.js `sampleColorRamp`) are present at HEAD `3f013523` and ship at the 4.1.0 cut — the consume-contracts fourier sequences M.W5 against. The SIXTH, paper-grid, is a VISUAL dependency (the page-background craft the glass floats over), NOT an API import — its LOOK ships via `BC.W-GRID-SIMPLE` + `BC.W-VIZ-PAPERGRID` (both SPEC, reshaping the register at the cut); fourier never asks for a token/class symbol, it consumes the rendered backdrop. The green handshake is the cut shipping them under the `^4.0.0`→`^4.1.0` caret (no breaking re-pin — fourier is on-mainline).

## §5 — The STRUCK items (already shipped at 4.0 — do NOT re-build)

fourier struck these in the inbound (`FOURIER-INBOUND.md:43`); RE-CONFIRM they ship + are not re-asked:

| item | shipped | source |
|---|---|---|
| `dividers` (A-1) | `ConfiguratorLayer` `dividers?: boolean` prop | `configurator.css:64` (`.configurator-layer-body[data-dividers]`) |
| `.configurator-section-label` (A-2) | the √φ subheading section register | `ConfiguratorLayer.vue` (`.configurator-section-label`) |
| `asideSide` (A-3) | `Configurator` `asideSide?: ConfiguratorAsideSide` prop | `Configurator.vue:86` |
| `useSpecularTracking` (the former `useSpecular` ask) | the specular position-write leaf | `composables/glass/useSpecularTracking.ts` |

PLUS the §0/§3 STRUCK-at-HEAD reconciles: **#11** (the Configurator stage-mobile-height + aside-width prop — both halves ship at HEAD, `Configurator.vue:95,145` + `sizing.css:446`); the half of **#1** (the overlay-band unconditional-darken — already floored at HEAD by the iteration-0 audit commit `e1b4b44c`, `ladder.css:212-221`; that label is a `bc-audit.mjs` pre-fix commit, not a wave; the BC build is the CONTINUOUS observer half). These do NOT re-build — the seam is present; the residual is the fourier-side workaround delete + (for #1) the continuous-driver fold.

## §6 — The cross-repo consume-and-delete cadence (the green-handshake summary)

Every BC build/fold ships at the **4.1.0 cut**; fourier consumes + deletes its interim on the **`^4.1.0` bump** (THEIR repo edit — the foreign-tree fence, glass-ui edits zero fourier files). The cadence per ask:

| # | BC deliverable | fourier delete-on-adopt | published-version | delete-trigger |
|---|---|---|---|---|
| #1 | adaptive overlay-band gating (`BC.W-ADAPTIVE-RECONCILE` + `-LEGIBILITY-MEASURED`) | the dropdown-darken workaround | 4.1.0 | `^4.1.0` bump (M.W5 pure adoption) |
| #2 | `<SearchBar>`/`<FuzzySearch>` glassify + radius-ring VERIFY (`BC.W-SEARCH-CUSTOM`/`-CONTROL-CUSTOM`) | the squared-`outline` search workaround | 4.1.0 | `^4.1.0` bump |
| #3 | `--accent-tone` register + `<SelectableChip>` (`BC.W-ACCENT-TONE`) | the ~57× hand-rolled tonal accents + the `:root --viz-amber` override | 4.1.0 | `^4.1.0` bump |
| #5 | `--ease-convergence` (`BC.W-MOTION-PRESETS`) | the hand-rolled partial-sum curve | 4.1.0 | `^4.1.0` bump |
| #6 | `<SplitChars>`/`useCharStagger` (`BC.W-SPLIT-CHARS`) | the hand-rolled per-glyph split | 4.1.0 | `^4.1.0` bump |
| #8 | `[data-scroll-reveal-once]` (`BC.W-MOTION-PRESETS`) | the re-firing-reveal workaround | 4.1.0 | `^4.1.0` bump |
| #9 | `<ConfiguratorLayer>` `#actions` slot (Configurator wave) | `CollapsibleSection.vue` | 4.1.0 | `^4.1.0` bump |
| #10 | `<DockIconButton :active>` (dock wave) | the hand-rolled active register | 4.1.0 | `^4.1.0` bump |
| #11 | (STRUCK — shipped at HEAD) | the `:deep(.configurator-stage)` + `grid-template-columns` workarounds | 4.0.x/4.1.0 | `^4.1.0` bump |
| #4 | (BOOK — `BC.W-FOURIER-DECIDES`) | fourier `/diff` interim stays; consumes `--accent-tone` styling | — | the SHARED-shape convergence trigger (future cut) |
| #7 | (BOOK — `BC.W-FOURIER-DECIDES`) | fourier synthetic-rect canvas-anchor interim stays | — | the 2nd-canvas-anchored-consumer trigger (future cut) |
| #12 | `proof:tier-class-staleness` + the consumer PostCSS recipe (`BC.W-FOURIER-DECIDES`) | n/a (producer-side gate — fourier wires the lint recipe) | 4.1.0 | the gate ships; consumer wires the recipe |
| #13 | `--viz-amber` rebaseline (folded into `BC.W-ACCENT-TONE`) | the `:root --viz-amber` override | 4.1.0 | `^4.1.0` bump (byte-equivalent at rebaseline) |

**No outbound ask owed to value.js or keyframes.js** — value.js 0.13.0 already ships `safeAccentColor`/`sampleColorRamp` (the accent-tone + spectrum helpers); kf 4.3.0 ships `springTimingFunction` (the convergence preset composes it). The KF-OSCILLATOR loop seam stays BOOKED kf-owned (not blocking). The foreign-tree fence is bidirectional — glass-ui reads the siblings as authority, edits neither.
