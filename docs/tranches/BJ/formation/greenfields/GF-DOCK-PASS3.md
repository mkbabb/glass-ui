# GF-DOCK — greenfield design, PASS 3 (Fable seat, critique-adjudicated)

Third seat over the design-loop charter (`PROMPTS/design-loop-prompt.md`). Inputs read in full:
`GF-DOCK-PASS1.md` (my portfolio + leading spec, 52%), `GF-DOCK-CRIT2.md` (fresh critic, 42%),
`ADJUDICATION-1.md` ruling 4 (the keyboard charge), `ios27/IOS27-CODEX.md` (laws 4/5/6/12),
`FEEDBACK-LEDGER.md` rows F04/F05/F06/F27/F47 + the four screenshots
(`feedback/F04-shape-abrogate.png`, `F05-anim-shift-no-aurora.png`, `F27-dock-vertical-scroll.png`,
`F47-dock-ux.png` — read as images this seat, unlike pass 1), and the dock-referencing sections of
`waves/BAND-REDUCTION.md` (the 4-dead-knob cut + Slider `keepDockOpen`→context) and
`waves/BAND-MATERIAL.md` (the law-4 role table + `--radius-dock` + the shared 7px blur).

TRANCHE-DEVELOPMENT: no source touched, no commits, this doc is the only artifact. **No browser
this seat** (the Playwright suite owns it) — every π obligation is OWED, not discharged, and
convergence is capped accordingly. The pass-3 job is to resolve the critic's architectural and
evidentiary charges on the record, not to paint.

---

## 1. Critique adjudication — every CRIT2 charge, one row, zero silent drops

| # | CRIT2 charge | verdict | disposition |
|---|--------------|---------|-------------|
| C1 | §2 — the ADJUDICATION-1 #4 keyboard model is undecided (disqualifying) | **ACCEPTED** | Decided on the record in §3: `role="toolbar"` + roving tabindex + `RouterLink` items with `aria-current="page"`. Surfaces as the one BJ-ASK truth-up (§3 close). |
| C2 | §3.1 — the codex-anointment is INVERTED (β's `scroll` default is the feelable interior scroll the codex rejects; the codex-aligned arm is deferred as γ) | **ACCEPTED** | The "β is codex-anointed" claim is RETRACTED. §4 replaces free scroll with a snap-detented filmstrip (no feelable free scroll); BEST-iOS-27 is re-grounded on occlusion-provability + snap-detent, not on the pill (§7). |
| C3 | §3.2 — elegant-reduction trap at the strategy layer (the codex-required no-scroll work is the deferred hard part) | **ACCEPTED** | The strategy is no longer deferred. §2 collapses α/β/γ into ONE model; the snap-detent traversal IS the strategy layer, specified here, not punted to a fuzzy gap. |
| C4 | §3.3 — G-OCCLUSION is in tension with itself (snap-to-cell-start vs always-visible peek → mid-glyph on the trailing edge) | **ACCEPTED** | The snap/peek geometry is written in §4.3 (census-anchored fade + `scroll-padding-inline-start` leading peek + deliberate trailing fade). The gate is now a clean scalar over `scrollLeft` at `scrollend`. |
| C5 | §3.4a — F05 is mis-assigned; its verdict is animation-shift + missing-aurora, not circles/pills | **ACCEPTED (nuance)** | Correct that the F05 *verdict* is not the circle shape. But the F05 *screenshot IS a dock story page* (STARTS COMPACT / STARTS OPEN docks, black background — read this seat). So: the "improperly shifts the screen" half is a real dock-motion defect → kept as G-NO-LAYOUT-SHIFT (§6); the "no aurora" half leaves the dock → BAND-STORY/aurora surface. F05 is not dropped, it is split correctly. |
| C6 | §3.4b — F04's specific "prev/next nav are circle DockControls" is fabricated from an unread screenshot | **ANSWERED-BY-LEAD + partial-ACCEPT** | ADJUDICATION lead read the corpus: F04 IS the ringed-outline-circles-nested-inside-pill construction, exactly as pass 1 cited it — I confirm it first-hand this seat (each rail nav-icon sits in a thin outline-ring circle inside a stadium pill). The "invented" charge is REFUTED. Partial-accept on precision only: the F04 *rail* shows nav-icon rings; the chevron-circle-in-pill lives in F47/F27's *strip* (`<` `>` `«` `»`, read this seat) — pass 1 cited the phenomenon to the right shape, the wrong screenshot half. Corrected in §5. |
| C7 | §3.4c — law 4 is mis-cited (circle-in-pill is law-4-conformant; law 4's nesting ban is "card never nests in pill"; its cure-list is F09/F12/F15/F17/F45/F48, not F04/F05) | **ACCEPTED** | Confirmed against `BAND-MATERIAL.md:82` ("a card never nests inside a pill; a pill never nests in a near-rect" — a circle tap-target inside a pill is legal). G-RADIUS-GRAMMAR is re-grounded on F04-direct ("this shape is to be abrogated") + KISS (F04's own words) + F47-redundancy, NOT on a law-4 cure. Law 4 is cited only as the positive role grammar the dock conforms to (§5). |
| C8 | §3.5 — the selection pill's "BEST iOS 27" claim is unearned (flat `--stretch` pill vs the DOCK-LADDER §4 eyeglass-lens / breath-of-life liquid-metal register) | **ACCEPTED** | Scoped honestly in §7: the pill unification is REUSE; it delivers the law-6 travel-squish *character* (interruptible spring + `--stretch` neck) but not the refractive eyeglass lens. BEST-iOS-27 rests on the provable occlusion grammar + snap-detent. The eyeglass/metaball-neck register is a flagged enhancement → ASK (§12). |
| C9 | §4 — α (scroll-port) is mis-labelled a "codex-neutral floor"; a scroll port is *further* from the codex, not neutral | **ACCEPTED** | α is re-labelled the "pragmatic non-codex scroll fallback" and RETIRED as the default: the single model (§2) is snap-detent, which is what α's free scroll was reaching for without the detent. α survives only as the `prefers-reduced-motion`/no-`scrollend`-support degradation path, honestly non-codex. |
| C10 | §4 — β is AMEND-not-ADVANCE: owes the keyboard decision, the scroll-vs-cluster reconciliation, the snap/peek math, ownership of the strategy, and the evidence correction | **ACCEPTED** | All five discharged: keyboard §3, reconciliation §2+§4, snap/peek §4.3, strategy owned §2, evidence §5+§6. β is folded into the single model. |
| C11 | §4 — γ's BLOCK conflates *clustering* (codex-anointed "+N" detent tray, law 6/7) with *fission goo* (`filter:url()`, Safari-risky, Q051-gated); reopen cluster-as-detent | **ACCEPTED (disposition)** | The conflation is conceded — clustering ≠ goo-necking. But the snap-detent filmstrip already handles unbounded overflow (the ~100-item case), so the "+N" cluster/detent tray is REOPENED only as an OPTIONAL collapsed-state affordance (§4.4), not the default and not required for convergence. Fission goo stays Q051-gated (C12). This dissolves the artificial α/β/γ split (C3). |
| C12 | §4 — W6 fission fork is faithfully BLOCKED / USER-GATED (Q051 row 1); the honest-goo bounds mirror DOCK-LADDER §3/§8 | **CONCUR (no change)** | The critic agrees pass 1 handled this cleanly. Kept parked both ways (§11). No `filter:url()` enters any non-gated wave. |
| C13 | §5 — re-scored 42% (from 52%), priced for the missing decision, inverted anointment, mis-cited evidence, self-tension | acknowledged | Not a charge — the score. Pass-3 re-scores at §12 after the four architectural debts are paid. |
| C14 | §7 — the seven "pass 3 MUST produce" items | **ACCEPTED** | 1 keyboard→§3; 2 codex-reconcile→§2/§4; 3 own the strategy + spec the cluster tray separate from fission→§2/§4.4; 4 snap/peek math→§4.3; 5 evidence correction→§5/§6; 6 pill scoping→§7; 7 RED baselines + collapse-FSM detail + collapsed affordance→§10/§4.5/§12 (paint still OWED). |

Carried gaps from CRIT2 §6 that are NOT charges but remain OWED: (2) zero paint / RED baselines
un-captured; (3) `useDockItemCensus` double-observe cost; (5) PRM instant-snap + live-Safari paint;
(6) `keepOpen()`-through-glide vs the collapse FSM / touch gate / the new context-driven Slider hold;
(7) collapsed-state affordance. Each is tracked in §12.

---

## 2. The corrected model — ONE dock, the snap-detented filmstrip

The critic's sharpest structural finding (C2/C3/C11): pass 1's α/β/γ split was artificial, and it
awarded "codex-anointed" to the one configuration (free `overflow-x:auto`) the codex rejects. The
fix is not to pick a different family — it is to collapse to a single model that is codex-honest by
construction:

**The dock is a snap-detented filmstrip, not a scroll port and not a cluster popover.** One item run
in a single-line port; block axis provably non-scrollable (F27); inline traversal is
snap-mandatory to cell boundaries, so it detents rather than free-scrolls (the codex "no interior
scroll you can feel as a scroll", `IOS27-CODEX.md:37` + `MARKS-B.md §6`); overflow is signalled by a
census-anchored edge-fade + `--dock-peek` sliver (never mid-glyph); an occluded item recentres on
the dock spring when tapped or focused (F47b). This one model handles every cardinality — the
bounded Find-My case (4 tabs, no overflow, no fade) and the ~100-page category strip (overflow,
fade, snap-advance) — so there is no strategy switch to adjudicate. The old α/β/γ dissolve:

- **α (free scroll)** was the snap-detent model minus the detent → RETIRED as default, kept only as
  the reduced-motion / `scrollend`-absent degradation path (honestly labelled non-codex, C9).
- **β (liquid tray + occlusion grammar)** IS this model's affordance + pill layer → ADOPTED whole.
- **γ (cluster fold)** was the codex overflow topology for a BOUNDED set → REOPENED as an OPTIONAL
  collapsed-state "+N" detent tray (§4.4), separated from Q051 fission goo (C11), not required for
  convergence.

The spine census from pass 1 §2 (SURVIVES / REPLACES / USER-GATED) is unchanged and was verified
SOUND by CRIT2 §1 on disk — `useDockSpring` / `DockCrossfade` / `useSelectionIndicator` /
`useSelectionGroup` / `useDockOverflowFit` survive; the pixel mask + block scroll + `.is-active`
strip + chevron chrome are replaced. The one new primitive stays `useDockItemCensus` (a
`useDockOverflowFit`-shaped RO, CRIT2-confirmed tractable, not a masked rewrite). The 4 dead knobs
(`position`/`autoLuminance`/`containerName`/`viewTransitionName`) die per `BAND-REDUCTION.md:106-111`
(the greenfield inherits the cut). Slider's dock-hold moves to dock context per
`BAND-REDUCTION.md:113-121` — relevant to §4.5's `keepOpen` reference-count.

---

## 3. The decided keyboard model (ADJUDICATION-1 ruling 4 — the charge)

**DECISION, on the record: the dock is a `role="toolbar"` with roving tabindex; its items stay
`RouterLink` route-links carrying `aria-current="page"`, never `role="tab"`.**

This lands exactly on the lead's stated lean ("roving-tabindex + toolbar role", `ADJUDICATION-1.md:20-22`)
while resolving the tension CRIT2 §2 exposed: the two dock halves use different models on disk — the
rail is `role="tablist"`/`tab` + roving (`useSelectionGroup`, CRIT2-verified), the strip is
`RouterLink` + `aria-current="page"` individually-tabbable (`BottomDock.vue:190`). Forcing
`role="tab"` onto route navigation is a false-tabpanel lie (a `tab` implies a `tabpanel`; a story
route is not one — CRIT2 §2.1). `role="toolbar"` is the reconciliation because the ARIA toolbar
pattern *already* carries roving tabindex over a single tab stop, and its items keep their native
role (link or button) — so route items stay honest links, in-dock panel-switch items stay buttons,
and both get one arrow-navigable tab stop.

Concrete, to gate-writable precision:

- **Container:** `role="toolbar"`, `aria-orientation="horizontal"` (strip) | `"vertical"` (rail),
  `aria-label` naming the dock. One new value `toolbar` added to `useSelectionGroup`'s role-per-mode
  menu (`radiogroup | tablist | group`, CRIT2-verified at `useSelectionGroup.ts:35-38`) — the ONE
  addition; it does NOT introduce tab/tabpanel semantics.
- **Items:** `RouterLink` for route docks (strip) with `aria-current="page"` on the active route;
  `<button>` with `aria-pressed`/`aria-current="true"` for in-dock panel switching (rail). The item's
  native role is preserved either way. No `aria-selected` (that is tab semantics — dropped).
- **Roving tabindex:** exactly one item `tabindex="0"` (the active item, else the first),
  all others `tabindex="-1"`. This makes the whole dock a single tab stop; Tab moves out of the dock,
  not between its items. W3 imports `useSelectionGroup`'s roving machine (not its `tablist` role).
- **Arrow semantics:** ArrowRight/ArrowLeft (horizontal) or ArrowDown/ArrowUp (vertical) move roving
  focus to the adjacent item. **No wrap** (a scrolling run's Home/End are its true physical extremes,
  not a wrap-around). ArrowUp/Down on a horizontal dock and ArrowLeft/Right on a vertical dock are
  no-ops (they must not trigger block scroll — ties to G-NO-BLOCK-SCROLL).
- **Focus ⟂ occlusion (the a11y trap resolution):** a focused item is NEVER left under the edge-fade.
  `focusin` on an item the census reports >X%-occluded fires the SAME `useDockSpring` reveal glide as
  a pointer tap (§4.2), so arrowing into an occluded item scrolls it fully into port before it reads
  as focused. The edge-fade and the peek sliver are decorative and non-focusable; focus never lands
  on them. This couples focus and visibility — the keyboard user can never focus an invisible item.
- **Home / End:** first / last item; each recentres to the absolute inline extreme (Home →
  `scrollLeft: 0`; End → `scrollLeft: max`), landing the target snap-aligned.
- **Focus during auto-scroll advance:** a pointer tap on an occluded item moves focus to it AND
  recentres (pointer implies intent). A keyboard arrow-move sets focus to the target then recentres.
  During the spring glide, focus stays on the target cell (which is being scrolled in) — focus never
  chases the intermediate cells that pass under it. `keepOpen()` is held across the glide (§4.5) so
  the idle-collapse timer / touch gate cannot retract the dock mid-scroll.

**BJ-ASK truth-up (per ruling 4's condition):** because this decision *ratifies nav-links* (route
items stay links, not converted to tabs), it triggers the ruling's truth-up clause — family J owns
correcting the now-misleading "the dock IS SegmentedTabs wearing chrome" comment
(`useSelectionIndicator.ts:16-24`, CRIT2-cited): the strip is a `role="toolbar"` of route-links with
a traveling indicator, NOT a tablist. This is the single ASK-surfacing consequence of the decision
(§12). It is a comment/label truth-up, not a re-litigation of the model.

---

## 4. The interior-scroll-inversion resolution (F27 vs F47)

The critic's standing charge: guarantee no interior scrolling in the dock shell (F27) while still
handling overflow via edge-fade occlusion (F47a) + tap-to-recentre auto-advance (F47b). The tension
is real only if "handle overflow" is read as "add a feelable scroll." It is not — the resolution is
a detented advance with a provably dead block axis.

### 4.1 Block axis — provably non-scrollable (F27)
The horizontal dock port is a single flex line with `overflow-y: clip`; the item run never has block
overflow. The recentre call drops `block:'nearest'` (a co-cause of F27, `useSelectionGroup.ts:183-186`)
and uses inline-only programmatic `scrollTo`. **RED today:** `useDockOverflowFit.ts:38-40` measures
`scrollHeight - clientHeight > 1` on the dock and `feedback/F27-dock-vertical-scroll.png` shows the
pink vertical-drag artifact leaking out the top edge (read this seat).

### 4.2 Inline axis — detent, not free scroll (the codex reconciliation)
The port allows touch/trackpad inline pan (so the ~100-item strip is reachable), but is
`scroll-snap-type: inline mandatory` with the scrollbar hidden (`scrollbar-width: none`) — so it
**cannot rest mid-cell**; it detents to cell boundaries. A snap-mandatory pan reads as
paging/clustering, not as a free-momentum scrollable list — that is the precise meaning of the codex
"no interior scroll you can feel as a scroll" (`IOS27-CODEX.md:37`; `MARKS-B.md §6`). Tap or focus of
an occluded cell fires a `useDockSpring` glide that recentres and snap-aligns it (F47b), `keepOpen()`
held (§4.5). This is one behaviour for pointer, touch, and keyboard.

### 4.3 The snap / peek geometry (CRIT2 §3.3 — the owed math)
Cells are not equal width (labels vary: "Radii" vs "Paper & Glass", read from F47), so the port is
NOT width-quantized; snap is per-cell-start regardless of width. `useDockItemCensus(portEl)` (the RO,
zero scroll listener, `useDockOverflowFit.ts:49-72` pattern) publishes each cell's rect in port-scroll
coords, driving three things:

1. **Leading peek** — `scroll-padding-inline-start: var(--dock-peek)`. A snapped cell rests
   `--dock-peek` in from the leading edge, so the prior cell's trailing `--dock-peek` sliver stays
   visible: the honest "there's more to the left" cue.
2. **Boundary-anchored fade** — the edge-fade is NOT a fixed-px `linear-gradient` (today's item-blind
   mask, `overflow.css:82-107`). Its leading stop sits at `--dock-peek` (covering the exposed leading
   sliver); its trailing stop is the census-derived trailing boundary of the last fully-visible cell,
   so the partially-visible trailing cell is entirely under the fade. The fade line always coincides
   with a cell boundary + peek — never bisects a glyph.
3. **Trailing partial cell** — its visible fraction is `portWidth mod Σcells` and IS arbitrary
   (CRIT2 §3.3 is correct), but that is fine because it is deliberately faded (point 2), not sharp-
   clipped; a mandatory snap lets the user bring it flush to read it. So "leading snaps flush-minus-
   peek" and "a peek sliver always shows when overflow exists" are reconciled with no mid-glyph clip
   on either edge — the CRIT2 §3.3 self-tension is resolved by making the fade census-anchored rather
   than fixed-px.

When the census reports a side fully in port (first/last cell whole), that side's fade + peek are
removed — no cue when nothing is hidden (honest; the `overflow.css:39-45` T-52(a) intent, done right).

### 4.4 Overflow topology — the filmstrip is default; the "+N" tray is optional (C11)
The snap-detent filmstrip handles unbounded overflow, so no cluster surface is required for
convergence. The codex-anointed "+N" detent tray (`MARKS-B §6`, `V4/f-0009`; law 6/7) is REOPENED
only as an OPTIONAL affordance for the COLLAPSED dock (where the filmstrip has no room to detent) —
a bounded popover/detent listing the off-screen items, opened on the collapsed pill. It is
explicitly NOT the Q051 fission goo (no `filter:url()`, no metaball neck) — it is a plain detent
sheet (`IOS27-CODEX.md:41` law 7). Whether the collapsed dock needs it at all is an open design
question → ASK (§12), because a collapsed dock may simply expand-then-detent instead.

### 4.5 Reveal vs the collapse FSM / touch gate / Slider hold (carried gap 6)
The reveal glide must not fight idle-collapse or the tap-to-expand gate. Mechanism: the glide takes a
`keepOpen()` reference on the `railHolds` count (`DockLayerGroup.vue:174-182`, CRIT2-verified) at
glide start and releases it at `scrollend`/spring-settle, exactly as the rail already holds through
its own motion. This composes with the Slider dock-hold now moving to dock context
(`BAND-REDUCTION.md:113-121`): both are reference-counts on the same `railHolds`, so a Slider drag
and a reveal glide can hold concurrently without either dropping the dock. Detailed here; paint-
verification against `useDockClickIntegrity` / `useDockTouchGate` is still OWED (§10).

---

## 5. Shape / radius grammar — re-grounded (C6/C7)

The chevron and outline-ring circles ARE removed, but on the correct grounds (CRIT2 §3.4 forced the
regrounding; the removal itself survives):

- **What F04 shows (confirmed this seat + lead-adjudicated):** the vertical rail wraps each nav icon
  (home / compass / shapes / package / navigate) in a thin outline-ring circle inside a stadium pill
  — the "shape to be abrogated" (`FEEDBACK-LEDGER.md:16`, `feedback/F04-shape-abrogate.png`).
- **What F47/F27 show (this seat):** the horizontal strip carries `<` `>` inline chevrons, a `|`
  divider, `«` `»` jump chevrons and a layers-stack icon — each chevron in its own outline circle
  (`feedback/F47-dock-ux.png`, `F27-dock-vertical-scroll.png`; `BottomDock.vue:17-20,161-252`).
- **The regrounded rule (G-RADIUS-GRAMMAR):** delete the decorative per-item outline-ring circles
  (F04-direct: "abrogate this shape" + KISS, `FEEDBACK-LEDGER.md:16`) and delete the chevron controls
  (redundant once tap-reveal + census occlusion + Home/End keyboard land — F47 redundancy, NOT a
  law-4 violation). A circle tap-target inside a pill is law-4-LEGAL (`BAND-MATERIAL.md:82`: the ban
  is "a card never nests in a pill; a pill never nests in a near-rect"); law 4's own cure-list is
  F09/F12/F15/F17/F45/F48, which does not include F04/F05 (CRIT2 §3.4c — accepted). Law 4 is cited
  only as the positive grammar the dock conforms to: the dock shell wears `--radius-dock` (the
  concentric relay, `radius.css:31-95`, owned by BAND-MATERIAL), items are plain hit-targets with no
  decorative ring, and the active-item indicator is the ONE traveling selection pill (§7), not a
  per-item static ring.
- **Deferral:** the dock's blur/material (the shared 7px, `glass.css:138-153`) and the `--radius-dock`
  value are BAND-MATERIAL's to tune (F48/F28); the greenfield consumes the role tokens, does not
  re-mint them.

**RED-at-HEAD:** `BottomDock.vue:161-252` renders the chevron circles; the rail wraps nav icons in
outline rings (F04). GREEN when the strip carries no chevron chrome and no item wears a decorative
ring, verified against the F04/F47 baseline.

---

## 6. Page transition (F06) + no-layout-shift (F05 dock half)

- **F06 flash cure (G-PAGE-NOFLASH):** a dock-page route transition rides `DockCrossfade`'s two-child
  opacity overlap on `--dock-t` (opacity floor ≥ ε throughout, measure-once peak reserve survives,
  `DockCrossfade.vue:78-106,164-242`), origin-anchored from the tapped cell's frame (codex law 5,
  `IOS27-CODEX.md:34`). The dock shell never unmounts (it is persistent chrome); the incoming page
  paints under the outgoing before the outgoing clears, so no blank/unpainted frame. No `filter:url()`,
  no stacked backdrop (Safari-safe). **RED today:** F06 flash (`/dock/rail`, `FEEDBACK-LEDGER.md:18`).
- **F05 dock half (G-NO-LAYOUT-SHIFT):** the dock is an overlay; its collapse/expand and its reveal
  glide must not reflow surrounding page content (CLS = 0 for the dock's own motion). **RED today:**
  `feedback/F05-anim-shift-no-aurora.png` shows the STARTS-COMPACT→OPEN expansion shifting the screen
  (read this seat). The "no aurora" half of F05 is NOT this greenfield's — it leaves to the
  aurora/story surface (C5).

---

## 7. Goo-morph tie-in (law 6) + honest pill scoping (C8)

Codex law 6 (`IOS27-CODEX.md:37`) names the sliding selection pill as the dock's goo-morph nav
surface — "states join by metaball necks, never crossfade." The greenfield delivers the law-6
*motion character* by reuse and scopes the *material* register honestly:

- **Delivered (reuse):** the strip and rail unify onto the single `useSelectionIndicator` writer
  (velocity-continuous, `--stretch` travel-squish, PRM-aware, CRIT2-verified sole writer). The
  `--stretch` squish IS a lightweight neck — the pill elongates along the travel axis between cells,
  briefly bridging source and destination on the interruptible `useDockSpring`, then settles. That is
  the law-6 "neck, not crossfade" character without any `filter:url()`.
- **NOT delivered (scoped out, honestly):** the DOCK-LADDER §4 eyeglass/optical-lens refraction and
  the breath-of-life liquid-metal register are NOT in this reuse. So the greenfield's BEST-iOS-27
  claim rests on (a) the census-anchored occlusion grammar (tokenized + provable where iOS is
  convention-only) and (b) the snap-detent no-feelable-scroll traversal — NOT on the pill surface,
  which is at-parity reuse. The refractive/metaball-neck pill is a flagged enhancement → ASK (§12);
  it intersects the Q051 fission Safari risk if it needs `filter:url()`, so it is not decided here.

---

## 8. Wave shape (updated; bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 survives/replaces; author all born-RED gate scaffolds (all RED at HEAD); inherit the 4-dead-knob cut (`BAND-REDUCTION`) | gate suite compiles + all RED | — |
| **W1** | CENSUS PRIMITIVE + OCCLUSION GRAMMAR | `useDockItemCensus` + boundary-anchored fade + `--dock-peek` + the `--dock-more-*` cohort; replace the `overflow.css` pixel mask | G-OCCLUSION-PEEK, G-MORE-SIGNAL | π-OCCLUSION |
| **W2** | SNAP-DETENT + NO-BLOCK-SCROLL | `scroll-snap-type: inline mandatory`, hidden scrollbar, `overflow-y: clip`; kill the block axis + drop `block:'nearest'` | G-SNAP-DETENT, G-NO-BLOCK-SCROLL | π-SNAP, π-NO-BLOCK |
| **W3** | REVEAL-ON-INTENT + TOOLBAR KEYBOARD | reveal glide on `useDockSpring` (`keepOpen()` held); `role="toolbar"` + roving + `RouterLink`/`aria-current` + focus⟂occlusion (§3); add `toolbar` to the role menu | G-REVEAL, G-KEYBOARD-TOOLBAR, G-FOCUS-VISIBLE | π-REVEAL, π-KEYBOARD |
| **W4** | SELECTION PILL (reuse) | unify strip onto `useSelectionIndicator` (rail ≡ strip), travel-squish, PRM-instant; import the roving machine, NOT the `tablist` role | G-SELECTION-PILL | π-PILL-CONTINUITY |
| **W5** | SHAPE/RADIUS GRAMMAR | remove chevron chrome + decorative item rings (§5); consume `--radius-dock`; defer material to BAND-MATERIAL | G-RADIUS-GRAMMAR | π-SHAPE |
| **W6** | PAGE-TRANSITION + NO-SHIFT (F06/F05) | dock-page route transition on the crossfade floor, origin-anchored; dock-motion CLS = 0 | G-PAGE-NOFLASH, G-NO-LAYOUT-SHIFT | π-PAGE, π-NO-SHIFT |
| **W7** | FISSION FORK (USER-GATED) | PARKED both ways per Q051 row 1: ratify ⇒ retire-with-rationale; rebuild ⇒ DOCK-LADDER §3/§8 honest-goo bounds (≤2-frame waist, no strands, no stacked `filter:url()`) | — (blocked on Q051-r1) | — |
| **W8** | CONSUMER RE-POINT + FINAL | `BottomDock` adopts the filmstrip (drops chevron chrome); optional collapsed "+N" tray IF the ASK greenlights (§4.4); overfitting audit; FINAL.md | G-CONSUMER, overfit-audit | π-BOTTOMDOCK |

---

## 9. Born-RED gate sketches (each states its RED-at-HEAD condition)

- **G-NO-BLOCK-SCROLL** — the horizontal dock has `scrollHeight === clientHeight` at 320px and
  desktop, every content/viewport combination. *RED today:* `useDockOverflowFit.ts:38-40` measures a
  block overflow; F27 shows the pink drag leaking out the top.
- **G-SNAP-DETENT** — after any inline settle (`scrollend`), `scrollLeft` equals a cell snap position
  (within snap tolerance); no resting state leaves a cell bisected by the port's sharp (non-faded)
  edge. *RED today:* `overflow.css` has no `scroll-snap-type` on the port (free `overflow-x:auto`);
  it rests anywhere, and F47a's "Radii"/"Overlays &" mid-glyph clip is exactly a mid-cell rest at a
  sharp edge.
- **G-OCCLUSION-PEEK** — at any snapped offset, an overflowing side shows a `--dock-peek` sliver of
  the adjacent cell under a census-anchored fade whose stop coincides with a cell boundary + peek (no
  glyph bisected). *RED today:* the pixel mask (`overflow.css:82-107`) is item-blind, keyed to a
  fixed px, and clips mid-word (F47a).
- **G-MORE-SIGNAL** — overflow present ⇒ a subtle persistent cue on the overflowing side(s); overflow
  absent ⇒ NO cue (census-driven, honest). *RED today:* a full-strength fixed fade that both
  under-signals and mis-clips.
- **G-REVEAL** — tap OR focus of a >X%-occluded cell fires a spring recentre landing it fully in port,
  snap-aligned, on the inline axis only. *RED today:* only `useSelectionGroup` rails recentre; the
  `BottomDock` strip routes through `goTo()`, never the engine (F47b).
- **G-KEYBOARD-TOOLBAR** — the dock exposes `role="toolbar"` + `aria-orientation`, exactly one item
  `tabindex="0"` (single tab stop), arrow keys move roving focus with no wrap, Home/End hit the
  extremes, and route items keep `aria-current="page"` with no `aria-selected`. *RED today:* the strip
  is individually-tabbable `RouterLink`s with no roving and no toolbar role (`BottomDock.vue:190`); the
  rail is a `tablist` (`useSelectionGroup`) — two divergent models, neither is the decided one.
- **G-FOCUS-VISIBLE** — no focused dock item is ever left >X%-occluded; `focusin` on an occluded item
  triggers the reveal glide before it reads as focused. *RED today:* arrowing/tabbing into an
  edge-faded item leaves it under the fade (no focus⟂occlusion coupling exists).
- **G-SELECTION-PILL** — the selected strip item carries ONE traveling `useSelectionIndicator` pill
  that glides (interruptible) on the dock spring, not a class snap. *RED today:* the strip uses
  `.is-active`/`aria-current` only; solely the rail has the pill (CRIT2-verified).
- **G-RADIUS-GRAMMAR** — no decorative per-item outline-ring circle and no chevron-circle control in
  the dock; the shell wears `--radius-dock`; the active indicator is the single pill. *RED today:*
  `BottomDock.vue:161-252` chevron circles + the F04 rail nav-icon rings.
- **G-PAGE-NOFLASH** — a dock-page route transition paints no blank/unpainted frame; the crossfade
  opacity floor holds ≥ ε throughout. *RED today:* F06 flash.
- **G-NO-LAYOUT-SHIFT** — dock collapse/expand and reveal produce CLS = 0 for surrounding page
  content. *RED today:* F05 shows the expand shifting the screen.
- **G-CONSUMER** — every greenfield primitive has ≥2 sites OR is exported OR is a named private demo
  helper (the overfitting invariant); the filmstrip's consumer #1 = `BottomDock`.

---

## 10. π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)

- **π-OCCLUSION** — capture the F47 strip at start/mid/end snapped offsets; prove boundary-anchored
  fade + `--dock-peek` sliver, no mid-glyph clip. Baseline = the current mid-word clip.
- **π-SNAP** — capture an inline pan release; prove `scrollend` lands `scrollLeft` on a cell boundary
  (no mid-cell rest). Baseline = free scroll rests anywhere.
- **π-NO-BLOCK** — assert `scrollHeight===clientHeight` at 320px + desktop on a horizontal dock.
- **π-REVEAL** — capture a tap AND a keyboard-arrow onto a half-occluded trailing cell → spring
  recentre frames → fully in port. Baseline = cell stays occluded (F47b).
- **π-KEYBOARD** — capture a Tab-into (single stop) + arrow-through + Home/End; prove roving,
  no-wrap, and that no focused cell rests occluded (G-FOCUS-VISIBLE).
- **π-PILL-CONTINUITY** — capture a rapid double-selection; prove the pill re-bases on live velocity
  (no hard cut), the `useDockSpring` interruptible contract.
- **π-PAGE / π-NO-SHIFT** — capture a dock-page route transition; prove no blank frame (paired vs F06)
  and CLS = 0 for the dock's own motion (paired vs F05).
- **π-SHAPE / π-BOTTOMDOCK** — capture the re-pointed `BottomDock` with no chevron circles / item rings.

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band
(device-free gates pass while live π false-FAILS on oklab tokens — paint-arm now parses oklab).

---

## 11. Banked-route dispositions
- **α (free scroll): RETIRED as default, kept as the degradation path** — the snap-detent model IS α
  plus the detent; free scroll survives only where `scroll-snap`/`scrollend` is unsupported or PRM
  demands instant, honestly labelled non-codex (C9). No longer β's "fallback".
- **β (liquid tray + occlusion): ADOPTED whole** — it is the single model's affordance + pill layer.
- **γ (cluster fold): REOPENED as an OPTIONAL collapsed-state "+N" detent tray** (§4.4), separated
  from fission goo; not required for convergence (the filmstrip handles overflow). Its need is an ASK.
- **W7 fission fork: USER-GATED (Q051 row 1)** — parked both ways; no `filter:url()` in any non-gated
  wave; the dock's terminal identity + Band-3 close depend on the ruling (`Q051-ASK.md:41-42`).

---

## 12. Convergence + open questions

**Convergence: 62%** (pass 1 claimed 52%; CRIT2 re-scored 42%). Justification: the four
architectural/evidentiary debts CRIT2 docked are paid on the record — the mandated keyboard model is
DECIDED (§3, toolbar+roving+nav-links, with the ASK truth-up), the inverted codex-anointment is
RETRACTED and replaced by a single snap-detent model that is codex-honest by construction (§2/§4),
the G-OCCLUSION snap/peek self-tension is resolved with written census geometry (§4.3), the evidence
is corrected (F05 split, F04 answered-by-lead + precision-fixed, law-4 cure-list dropped — §5/§6), and
the artificial α/β/γ split is dissolved into one model (§2). That is materially past pass 1's 52%
because the disqualifying gap is closed and the model is now singular and evidence-honest.

It is NOT higher because the seat is still doc-only: **every π obligation in §10 is OWED**, no RED
baseline is captured, the commitment surface GREW (snap-detent, toolbar keyboard, no-layout-shift are
new and un-painted), and Safari paint is unverified. Paint debt is a hard cap per the charter.

**Open questions → BJ ASK (not decided unilaterally):**
1. **Keyboard truth-up (surfaced, per ruling 4):** the decision ratifies nav-links, so family J must
   correct the "SegmentedTabs wearing chrome" comment (`useSelectionIndicator.ts:16-24`) — the dock is
   a toolbar of route-links, not a tablist. Comment/label truth-up only.
2. **Eyeglass/liquid-metal pill enhancement (C8):** deliver the DOCK-LADDER §4 refractive/metaball-neck
   register beyond the `--stretch` reuse, or ratify the reuse as sufficient? Intersects the Q051
   `filter:url()` Safari risk if it needs url-filter goo — a paint-taste + Safari-safety call.
3. **Collapsed-state overflow affordance (§4.4, carried gap 7):** does the collapsed dock need the
   optional "+N" detent tray, or does it expand-then-detent? A design call, not required for the
   filmstrip to converge.
4. **Fission fork (Q051 row 1):** ratify-or-rebuild reserved to the user; the dock's terminal identity
   can't converge until the ruling.

Remaining OWED (non-ASK, discharged by paint in execution, not by decision): the §10 π captures; the
`useDockItemCensus` double-observe cost vs `useDockOverflowFit` (may fold to one observer); PRM
instant-snap + live-Safari paint; the `keepOpen()`-through-glide vs collapse-FSM/touch-gate/Slider-hold
detail (§4.5, specified, not painted).

Per the charter (3+ passes before contemplating convergence, two consecutive clean): pass 3 pays the
architectural debt; a pass-4 seat WITH the browser must capture the RED baselines
(π-OCCLUSION/π-SNAP/π-NO-BLOCK/π-REVEAL/π-KEYBOARD) and re-audit fresh before convergence is claimable.
