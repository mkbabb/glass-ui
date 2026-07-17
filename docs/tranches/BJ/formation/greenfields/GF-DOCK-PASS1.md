# GF-DOCK — greenfield design, PASS 1 (Fable seat)

One-seat compression of the design-loop charter (`PROMPTS/design-loop-prompt.md`): round-zero
portfolio → codebase research per family → leading-spec draft (wave shape + born-RED gates + π
obligations) → self-critique → honest convergence. TRANCHE-DEVELOPMENT: no source touched; this
doc is the only artifact. No browser (a Playwright suite owns the seat) — every π obligation is
OWED, not discharged, and convergence is capped accordingly.

Authorities read in full: `ios27/IOS27-CODEX.md` (laws 4 + 6), `ios27/MARKS-B.md` (§6 the
Find-My tab bar, §1 the radius table, V4/f-0005→0013), `FEEDBACK-LEDGER.md` (F47/F27/F04/F05/F06),
`REGISTRY.md` family G, `../../BI/addenda/Q051-ASK.md` row 1 + `Q021-FISSION-EVIDENCE.md`
(`DOCK-LADDER` honest-goo bounds), and the shipped dock source (`src/components/dock/`).

---

## 1. Problem statement (from the ledger + registry family G)

The shipped dock is functionally sound but its overflow/affordance layer is broken. Six named
defects, one user-gated fork:

| id | defect | evidence |
|----|--------|----------|
| F47a | horizontally-scrolling item run clips items mid-glyph with no "more items" affordance | `feedback/F47-dock-ux.png` (`Radii` cut mid-R at the left edge; `Overlays &` cut mid-word at the right; loud chevron + double-chevron + stack chrome instead of a subtle cue) |
| F47b | clicking an edge-occluded item does NOT auto-scroll it into view (H and V) | the plain story-tab strip navigates but never recenters — see §2 census |
| F27 | the dock scrolls on its BLOCK axis (a horizontal dock scrolls vertically) | `feedback/F27-dock-vertical-scroll.png` (the pink drag artifact bleeding out the top edge) |
| F04/F05 | outline-circles nested inside the pill tray ("this shape is to be abrogated") | the prev/next nav are circle `DockControl`s inside a pill dock — violates codex law 4 (a card/pill never contains a circle-of-a-different-role as chrome) |
| F06 | transitions between dock pages flash the screen, slow, broken | `/dock/rail` + dock pages generally; registry family G visual-family-6 |
| Q051-r1 | the iOS-27 fission/goo dock was retired (Safari `filter:url()` risk); ratify-or-rebuild is RESERVED to the user | `Q051-ASK.md:21-42`, `Q021-FISSION-EVIDENCE.md` |

User's headline order (F47): *"scrolling dock must show there's more left/right with subtlety;
clicking an edge-occluded item auto-scrolls the dock (vertical and horizontal). The dock likely
needs to be greenfielded, again, with better UX and affordances in mind."*

The codex verdict (`IOS27-CODEX.md:37`, `MARKS-B.md:277-284`): iOS never clips mid-glyph — it uses
**edge-fade / detents / clustering** with a **liquid-sliding selection pill** in a glass tray, and
**no interior scroll** you can feel as a scroll (V4/f-0005→0013, the Find-My tab bar). That is the
model to BEST, not photocopy.

---

## 2. Census — what survives, what the greenfield replaces

The `DockCrossfade` + `useDockSpring` spine is the BI-landed engine and stays. The overflow/
affordance layer is the greenfield's target. Evidence is file:line at HEAD (`codex/bi-p-q-execution`).

### SURVIVES (the spine — reuse, do not re-fork)
- **`useDockSpring.ts`** — the ONE `SpringProgress` owner for the band (`:74-136`; the sole
  `new SpringProgress` site, velocity-continuous re-base at `:87-117`). Every morph in the
  greenfield drives one of these. `DOCK_SPRING = springPreset("dock")` = 0.30/ζ0.82
  (`constants.ts:12-15`), landed + Q051-row-2-recommended-keep.
- **`DockCrossfade.vue`** — the thin controlled face-swap: two-child opacity overlap on `--dock-t`
  (`:164-242`), measure-once peak reserve (`:78-106`), focus-transfer-on-dissolve (`:155-162`).
  The F06 page-transition wave builds ON its opacity floor, does not replace it.
- **`useSelectionIndicator.ts`** — the library's SINGLE traveling-indicator writer (`:16-24`: "the
  dock IS SegmentedTabs wearing chrome"), RO-measured center-anchored transform, velocity travel-
  squish (`--stretch`), PRM-aware. This IS the sliding selection pill primitive — it is already
  built; the greenfield UNIFIES the strip onto it (today only the rail consumes it).
- **`useSelectionGroup.ts`** — roving focus + role-per-mode + the recenter call
  `scrollIntoView({inline:'nearest', block:'nearest'})` on select (`:183-185`). The greenfield
  GENERALIZES this recenter to any dock item (W2), and drops `block:'nearest'` on horizontal docks
  (a co-cause of F27's block jump).
- **`useDockShellProps.ts`** — the ONE prop shape (no `variant` discriminant). The greenfield adds
  at most one overflow-strategy axis value, no new shape zoo.
- **`useDockState.ts` / `useDockClickIntegrity.ts` / `useDockTouchGate.ts`** — collapse FSM,
  captured-identity click guard, tap-to-expand gate. The reveal spring (W2) must `keepOpen()`
  through its glide (the `railHolds` reference-count idiom, `DockLayerGroup.vue:175-190`).
- **`FadingScroll` component** — the scroll-driven edge-fade keyframes (`gl-fade-start-in`/
  `-end-out`) survive AS A COMPONENT; what dies is the dock's PIXEL-arbitrary use of them.

### REPLACED (the greenfield's target — clean break, no alias)
- **`overflow.css` `.dock-scroll-x` + the FadingScroll mask** (`:61-105`) — the mask is a pixel
  `linear-gradient` keyed to `--fade-scroll-width`, item-BLIND. It clips `Radii`/`Overlays &`
  mid-glyph (F47a) because the fade start is a fixed px offset, not a cell boundary. REPLACED by
  the boundary-snapped occlusion grammar (§4 W1).
- **`useDockOverflowFit.ts`** — the fits-vs-scrollable RO (`:28-42`) SURVIVES as the overflow-
  presence signal, but its coupling to the pixel mask is severed; it feeds the new cell-census
  (`useDockItemCensus`, W1) instead.
- **The block-axis scroll** — `useDockOverflowFit` measures `scrollHeight - clientHeight > 1` on a
  vertical dock (`:38-40`), and `scrollIntoView({block:'nearest'})` (`useSelectionGroup:184`) can
  nudge the page. On a HORIZONTAL dock the block axis must be provably non-scrollable (F27). W2
  gate.
- **Demo `BottomDock.vue` chevron chrome** — `ChevronLeft/Right` + `ChevronsLeft/Right`
  `DockControl`s (`:17-20, :161-233`) are the F04/F05 outline-circles-in-a-pill. Once tap-reveal +
  occlusion signaling land, single-page chevrons are redundant chrome; REMOVED/re-expressed (W4).
- **The `.is-active` class selection on the strip** — the story-tab strip toggles a class
  (`DockControl :active`), NOT the traveling pill. The rail has the pill; the strip does not.
  UNIFIED onto `useSelectionIndicator` (W3).

### USER-GATED (do not decide here)
- **Fission / Siri-island / V↔H goo** — `DEFINITION-ABSENT` (`GlassDock.vue:10-11, :446-447`;
  `Q021-FISSION-EVIDENCE.md` §A). Q051 row 1 reserves ratify-vs-rebuild to the user. This
  greenfield PARKS the fork as W6 both ways (§5) and takes no position.

---

## 3. Portfolio — three orthogonal families (round zero)

Keyed by ARCHITECTURAL CENTER, not by surface. Two routes that share a center share a family.

### Family α — SCROLL-PORT (retain-and-fix); center = continuous scroll position
The whole item run stays a native inline scroll port; the greenfield fixes the AFFORDANCE only.
- **Mechanism:** keep `overflow-x:auto`, but (1) `scroll-snap-type: inline mandatory` on cell
  starts so no cell is ever partially clipped except a deliberate fixed-width peek; (2) a subtler,
  cell-anchored edge fade; (3) `scrollIntoView` generalized to any tapped item; (4) kill the block
  axis. Selection stays a class toggle.
- **Codebase fit:** minimal — `overflow.css` retune + one composable generalization. Rides
  `useDockOverflowFit` (`:28-42`) and the existing FadingScroll keyframes unchanged in kind.
- **Research verdict:** cheapest, honors the user's literal "scrolling dock" words. GAP: no
  liquid-weight selection (violates the liquid-weight edict + codex law 6); still reads as a scroll
  strip, not the Find-My tray. It fixes F47a/b/F27 but not the "greenfield, again" spirit.
- **Disposition: BANKED-ALIVE** as the low-risk floor and the unbounded-strip fallback for β.

### Family β — LIQUID TRAY (selection-centric); center = the traveling selection pill + a provable occlusion GRAMMAR
The center is `useSelectionIndicator`'s pill unified across rail AND strip, riding a **decomposition
that separates occlusion affordance from overflow strategy** (the greenfield's real contribution).
- **Mechanism (the four decoupled primitives):**
  1. **Occlusion grammar** — a `useDockItemCensus` RO measures the item run's child cell rects; the
     edge occlusion is BOUNDARY-SNAPPED (fade begins at the last-full-cell boundary; a fixed
     `--dock-peek` sliver of the next cell always shows under the fade when overflow exists). Never
     mid-glyph, by construction.
  2. **Reveal-on-intent** — tap/focus any >X%-occluded cell → a `useDockSpring` glide recenters it
     with the recenter gutter (generalizes `useSelectionGroup:183`), `keepOpen()` held through the
     glide.
  3. **Sliding selection pill** — the strip adopts `useSelectionIndicator` (velocity-continuous,
     travel-squish), one writer, rail ≡ strip.
  4. **Overflow-strategy axis** — `scroll` (default, unbounded) | `cluster` (bounded rails). The
     grammar + reveal + pill are strategy-AGNOSTIC.
- **Codebase fit:** strong — every primitive has a landed root to extend (`useSelectionIndicator`,
  `useSelectionGroup` recenter, `useDockOverflowFit` RO, `useDockSpring`). The one NEW primitive is
  `useDockItemCensus` (a flex-children RO — tractable, NOT equal-difficulty to the problem).
- **Research verdict:** the codex-anointed model (`IOS27-CODEX.md:37`; `MARKS-B.md:277-284`).
  BEST-iOS-27 because the occlusion grammar is TOKENIZED + provable where iOS is convention-only.
- **Disposition: LEADING** — full spec §4.

### Family γ — GOO-MORPH CLUSTER (topology-centric); center = a metaball overflow fold, NO scroll
Codex law 6 taken literally: dock ∪ pager ∪ overflow-more are ONE goo-morph nav surface.
- **Mechanism:** overflow items collapse into a trailing "+N" metaball cluster (V4/f-0009 the "+3"
  overflow pill); tapping it morphs the cluster open into a secondary tray/sheet on one
  `useDockSpring` scalar. No scroll port at all — F27 dies by construction.
- **Codebase fit:** the morph engine exists (`useDockSpring`, `DockCrossfade`), but the cluster-
  OPEN needs a secondary presentation surface (a sheet/detent tray) that does not exist for the
  dock — a missing primitive of roughly equal difficulty ("and then a 100-item cluster presents
  as… what?"). The retired fission goo is the cautionary precedent (`Q021-FISSION-EVIDENCE.md` §A:
  the stacked `filter:url()`×`backdrop-filter` Safari risk lives exactly in metaball-necking).
- **Research verdict:** most novel, but the load-bearing "cluster presents as a secondary surface"
  step is unspecified and Safari-risk-adjacent.
- **Disposition: BLOCKED** — reopens only if someone proposes the secondary-surface primitive
  (and it intersects the Q051 fission fork; do not resolve independently).

---

## 4. Leading spec — GF-DOCK-β "Liquid Tray + Occlusion Grammar"

### 4.1 The load-bearing decomposition
The greenfield's thesis: **occlusion affordance ⊥ reveal-on-intent ⊥ selection pill ⊥ overflow
strategy.** Today all four are fused into one pixel mask + one class toggle + one strategy (scroll)
+ prev/next chevrons. Splitting them lets any overflow strategy inherit the same provable "there's
more" signal and the same tap-to-reveal, and lets the strategy be a token axis instead of a rewrite.
This is what makes it BEST-iOS-27 (provable) rather than a photocopy of Find-My.

### 4.2 The one new primitive
`useDockItemCensus(portEl)` — a `ResizeObserver` + narrowly-filtered `MutationObserver` (the exact
pattern of `useDockOverflowFit.ts:49-72`, ZERO scroll listener) that publishes the item run's child
cell rects in port-scroll coordinates. Drives (a) the boundary-snapped occlusion mask, (b) the
peek-sliver width reservation, (c) the reveal recenter target. This is the census the pixel mask
lacks. Cost concern (double-observing beside `useDockOverflowFit`) is an OPEN GAP (§6).

### 4.3 Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 survives/replaces; author all born-RED gate scaffolds (all RED at HEAD) | gate suite compiles + all RED | — |
| **W1** | OCCLUSION GRAMMAR | `useDockItemCensus` + boundary-snapped edge occlusion + `--dock-peek` + the `--dock-more-*` signal token cohort; replace `overflow.css` pixel mask | G-OCCLUSION, G-MORE-SIGNAL | π-OCCLUSION |
| **W2** | REVEAL-ON-INTENT + NO-BLOCK-SCROLL | generalize recenter to any tapped/focused occluded item on `useDockSpring`, `keepOpen()` held; kill the block axis (drop `block:'nearest'` on horizontal; assert non-scrollable block) | G-REVEAL, G-NO-BLOCK-SCROLL | π-REVEAL, π-NO-BLOCK |
| **W3** | SLIDING SELECTION PILL | unify the strip onto `useSelectionIndicator` (rail ≡ strip); velocity-continuous, travel-squish, PRM-instant | G-SELECTION-PILL | π-PILL-CONTINUITY |
| **W4** | RADIUS/SHAPE GRAMMAR | remove the outline-circle chevron nav (redundant once reveal+occlusion land); enforce codex law-4 role table in the dock | G-RADIUS-GRAMMAR | π-SHAPE |
| **W5** | PAGE-TRANSITION (F06) | dock-page route transition on the `DockCrossfade` opacity floor / origin-anchored morph; no unpainted frame | G-PAGE-NOFLASH | π-PAGE |
| **W6** | FISSION FORK (USER-GATED) | PARKED both ways: ratify ⇒ retire-with-rationale; rebuild ⇒ carry `DOCK-LADDER` §3/§8 honest-goo bounds (≤2-frame waist, no strands, clean CSS/canvas, no stacked `filter:url()`) | — (blocked on Q051-r1) | — |
| **W7** | CONSUMER RE-POINT + FINAL | demo `BottomDock` adopts the new overflow (drops chevron chrome); overfitting audit (≥2 sites/exported/private-helper); FINAL.md | G-CONSUMER, overfit-audit | π-BOTTOMDOCK |

### 4.4 Born-RED gates (each states its RED-at-HEAD condition; kept small per the gates-abrogation mandate)

- **G-OCCLUSION** — at any scroll offset, the leading/trailing item is EITHER fully visible OR
  occluded strictly past its last full glyph (fade begins at a cell boundary; a fixed `--dock-peek`
  sliver of the next cell shows). *RED today:* the pixel mask clips `Radii`/`Overlays &` mid-word
  (`overflow.css:91-105`, F47a).
- **G-MORE-SIGNAL** — overflow present ⇒ a subtle persistent "more" cue on the overflowing side(s);
  overflow absent ⇒ NO cue (honest, per `overflow.css:39-45` T-52(a) intent). *RED today:* the cue
  is a full-strength pixel fade that both under-signals and mis-clips.
- **G-REVEAL** — tap/focus of a cell occluded > X% triggers a spring recenter landing it fully in
  port with the gutter, on both axes' analog (horizontal recenter for a horizontal dock). *RED
  today:* only `useSelectionGroup` rails recenter; the plain story-tab strip (`BottomDock`) never
  does (it routes through `goTo()`, not the engine) — F47b.
- **G-NO-BLOCK-SCROLL** — a horizontal dock has `scrollHeight === clientHeight` at every
  viewport/content combination (no block-axis scroll). *RED today:* `useDockOverflowFit.ts:38-40`
  measures a block overflow and F27 shows it leaking.
- **G-SELECTION-PILL** — the selected strip item carries ONE traveling `useSelectionIndicator` pill
  that glides on the dock spring between selections (interruptible), NOT a class snap. *RED today:*
  the strip uses `.is-active` (`DockControl :active`), only the rail has the pill.
- **G-RADIUS-GRAMMAR** — no circle-role control nests as chrome inside the pill tray; nav follows
  the codex law-4 role table. *RED today:* `BottomDock.vue:161-233` circle chevrons in the pill
  (F04/F05).
- **G-PAGE-NOFLASH** — a dock-page route transition paints no unpainted/blank frame; the crossfade
  opacity floor holds ≥ ε throughout. *RED today:* F06 flash.
- **G-CONSUMER** — every greenfield primitive has ≥2 sites OR is exported OR is a named private
  demo helper (the overfitting-audit invariant); the strategy axis has consumer #1 = `BottomDock`.

### 4.5 π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)
- **π-OCCLUSION** — capture the F47 strip at start/mid/end scroll offsets; prove boundary-aligned
  fade + `--dock-peek` sliver, no mid-glyph clip. Baseline = current mid-word clip.
- **π-REVEAL** — capture a tap on a half-occluded trailing tab → spring recenter frames → fully in
  port. Baseline = tab stays occluded.
- **π-NO-BLOCK** — assert `scrollHeight===clientHeight` at 320px + desktop on a horizontal dock.
- **π-PILL-CONTINUITY** — capture a rapid double-selection; prove the pill re-bases on live velocity
  (no hard cut), the `useDockSpring` interruptible contract.
- **π-PAGE** — capture a dock-page route transition; prove no blank/flash frame (paired vs F06).
- **π-SHAPE / π-BOTTOMDOCK** — capture the re-pointed `BottomDock` without chevron circles.

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band
(device-free gates pass while live π false-FAILS on oklab tokens — paint-arm now parses oklab).

---

## 5. Banked-route dispositions
- **α (scroll-port retrofit): BANKED-ALIVE** — the low-risk floor and β's unbounded-strip fallback.
  Advanced far enough to expose its gap (no liquid-weight selection). Kept alive for the 100-page
  strip case where β's pill model is unproven (§6 gap 1).
- **γ (goo-morph cluster): BLOCKED** — reopens only on a materially new secondary-surface primitive;
  intersects Q051-r1, do not resolve independently.
- **W6 fission fork: USER-GATED (Q051 row 1)** — parked both ways; the dock's terminal identity and
  Band-3 close depend on the ruling (`Q051-ASK.md:41-42`). No position taken.

---

## 6. Self-critique (failure-mode checklist)
- **Vacuous convergence:** avoided — this is PASS 1, ~52%, not a convergence claim.
- **Spec-cites-itself circularity:** the occlusion grammar cites codex law 4/6 + MARKS-B V4 frames
  + shipped file:line, not itself. Clean.
- **Gates that cannot fail:** each gate names its RED-at-HEAD condition with a file:line. G-NO-BLOCK
  is a hard scalar equality. G-OCCLUSION's "boundary" risk (fuzzy?) is closed by scroll-snap to cell
  starts + a FIXED `--dock-peek` — provable, not hand-wavy.
- **Elegant-reduction trap ("and then the hard part"):** the load-bearing step is
  `useDockItemCensus`. Named, scoped as a flex-children RO on the `useDockOverflowFit` pattern —
  tractable, NOT equal-difficulty to the original problem. The peek-sliver reservation is concrete.
  β passes this test; γ FAILS it (its cluster-open step is unspecified → BLOCKED, honestly).
- **Legacy aliases / masked fallbacks:** clean break, no alias (no-backwards-compat); the occlusion
  works in paint or fails loud (no fallback hiding a dead mask).
- **Unverified gestalt:** REAL — no browser this seat; every π obligation is OWED against an
  un-captured RED baseline. This is the primary convergence cap.
- **Consumer-less substrate:** each β primitive has consumer #1 (`BottomDock` + the rail story);
  overfit audit at W7. The γ cluster + W6 fission are consumer-less/user-gated — flagged, not hidden.

## 7. Convergence + open gaps
**Convergence: 52%.** The decomposition (§4.1) and the census-driven occlusion primitive are
architecturally sound and codebase-grounded; the gates are born-RED and small. What is NOT earned:

1. **Unbounded-strip degradation (the sharpest gap).** β's sliding-pill center is proven for
   BOUNDED sets (Find-My's 4 tabs, the rail). For the demo's ~100-page category strip, does the
   pill model degrade gracefully to scroll, or does it force a strategy switch to α? The
   scroll↔cluster strategy boundary is fuzzy. Unresolved.
2. **Zero paint verification.** Doc-only seat; every π obligation is OWED. No RED baseline captured.
3. **`useDockItemCensus` cost** — double-observing beside `useDockOverflowFit`'s RO/MO is
   unmeasured; may need to fold into one observer.
4. **Fission (Q051-r1)** — user-gated; the terminal identity can't converge until the ruling. W6
   parks both ways but the dock's final shape is genuinely undecided.
5. **PRM + Safari** — boundary-snapped scroll-snap + spring recenter need PRM instant-snap AND a
   live-Safari paint; the dock's Safari paint is separately still owed (`Q021-FISSION-EVIDENCE.md`
   §B, MD-1 / REGISTRY H-4). Unverified.
6. **Collapse-FSM interaction** — reveal-on-intent must not fight the idle-collapse timer / touch
   gate; the `keepOpen()`-through-glide is asserted but not detailed against
   `useDockClickIntegrity` / `useDockTouchGate`.
7. **Collapsed-state affordance** — occlusion/more-signal only exist expanded; the collapsed-pill
   edge case is unhandled.

Per the charter, PASS 1 runs of 3+ before contemplating convergence. Next pass should:
prototype `useDockItemCensus` + capture the RED baselines (π-OCCLUSION/π-REVEAL/π-NO-BLOCK), and
resolve gap 1 (fix the scroll↔cluster strategy boundary — the one thing that could re-order α vs β).
