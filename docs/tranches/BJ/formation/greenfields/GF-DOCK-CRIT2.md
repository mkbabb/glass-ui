# GF-DOCK — CRITIQUE, PASS 2 (fresh Fable critic, assume-wrong)

Fresh seat. I authored nothing here. TRANCHE-DEVELOPMENT: no source touched, no browser. Every
codebase claim below was checked on disk at HEAD (`codex/bi-p-q-execution`); evidence is file:line.
Default posture: PASS 1 is wrong until it convinces me. It half-convinced me on the engine census
and mostly failed me on the design grounding, the codex-anointment, and the one decision it was
explicitly ordered to make.

**Verdict up front:** the leading route (β) is NOT advance-ready. The decomposition is real and the
spine census is accurate, but (a) the ADJUDICATION-1 #4 keyboard decision — the one thing this
greenfield was *ordered* to settle — is absent; (b) the codex-anointment for β is inverted (the
codex anoints the *no-interior-scroll cluster* model, which the spec BLOCKS as γ and quietly retains
as β's fuzzy gap); (c) three of the six cited feedback rows are mis-read or mis-assigned; (d) the
load-bearing occlusion gate is internally in tension with itself. **Re-scored convergence: 42%**
(pass 1 claimed 52%).

---

## 1. Codebase claims — verified on disk

The census (§2) is the spec's strongest section. I confirmed the spine claims:

| claim | spec cite | on disk | verdict |
|-------|-----------|---------|---------|
| sole `new SpringProgress` owner; velocity re-base | `useDockSpring.ts:74-136`, `:87-117` | `playTo` re-base at `:87-117`, sole site | ✅ |
| `DOCK_SPRING` = 0.30 / ζ0.82 | `constants.ts:12-15` | actual `constants.ts:11-14` reads `springPreset("dock")`; values live at `springPresets.ts:95-97` = `response 0.3, dampingFraction 0.82` | ✅ (line drift −1; note MEMORY's "{0.68,0.64}" is STALE — the spec is right, memory is wrong) |
| crossfade measure-once peak reserve | `DockCrossfade.vue:78-106` | running-max `measurePeak()` at `:85-97` | ✅ |
| `useSelectionIndicator` = single traveling writer, `--stretch` squish, PRM-aware, travels in scroll/content coords | `:16-24` | `updateSingleSlider` adds `container.scrollLeft/scrollTop` (`:149-155`); PRM guard `:230`; sole writer | ✅ |
| **"today only the rail consumes it; the strip does not"** | §2 | consumers are `useSelectionGroup`→rail + `SegmentedTabs.vue:206`; `BottomDock` strip does NOT | ✅ |
| recenter `scrollIntoView({inline,block:'nearest'})` on select | `useSelectionGroup.ts:183-185` | actual `:183-186` | ✅ |
| block-axis overflow measured on vertical dock | `useDockOverflowFit.ts:38-40` | `scrollHeight-clientHeight>1` `:38-40` | ✅ |
| `overflow.css` pixel mask, item-blind | `:61-105` | `mask-image: linear-gradient(...black var(--fade-start)...)` driven by `scroll(self inline)` timeline `:82-107` | ✅ (but see §3.4 — the CSS already carries ring-safe insets + `scroll-padding-inline` recenter gutter `:75-77` the spec under-credits) |
| `BottomDock` chevron chrome | `:17-20, :161-233` | `ChevronLeft/Right/ChevronsLeft/Right` imported `:17-20`, used `:161-252` | ✅ |
| strip uses `.is-active`/`aria-current`, not the pill | §2 | `BottomDock.vue:12,52,190` (`aria-current="page"`) | ✅ |
| fission DEFINITION-ABSENT | `GlassDock.vue:10-11, :446-447` | `:10-11` + `:445-447` "clean break, no alias" | ✅ |
| `railHolds` keepOpen reference-count | `DockLayerGroup.vue:175-190` | `railHolds` `:174`, `keepOpen()` `:178-182` | ✅ |

**Census verdict: SOUND.** The spine (`useDockSpring` / `DockCrossfade` / `useSelectionIndicator` /
`useSelectionGroup` / `useDockOverflowFit`) survives-vs-replaces split is accurate and the one new
primitive (`useDockItemCensus`) really is a `useDockOverflowFit`-shaped RO, not a masked rewrite. No
consumer-less-substrate violation in β's four primitives. This part earns its convergence.

Everything below is where the spec loses it.

---

## 2. THE MANDATED DECISION IS MISSING (the disqualifying gap)

ADJUDICATION-1 ruling #4 (`ADJUDICATION-1.md:20-23`) is explicit and unambiguous:

> **Dock keyboard model: routed INTO GF-DOCK pass 2** as a *required in-greenfield decision* (the
> iOS-consistent lean is roving-tabindex + toolbar role, per the codex; the greenfield owns the
> whole interaction model). Only if the greenfield lands on ratify-nav-links does it surface in the
> BJ ASK as a truth-up ruling.

The pass-1 spec does **not** decide it. It says "roving focus + role-per-mode" exactly once (§2,
quoting `useSelectionGroup`) and never states which model the *unified* dock adopts. That is not a
deferral it is allowed to make — it is the charge.

And this is not cosmetic, because the two halves of today's dock use **different keyboard models**,
verified on disk:

- **Rail** (`DockLayerGroup.vue:94,205,231` via `useSelectionGroup`): `role="tablist"/"tab"` +
  `aria-selected`, **roving tabindex** (`selection.rovingTabindex(idx)`), exactly-one-tabstop,
  arrow/Home/End. A toolbar-style model.
- **Strip** (`BottomDock.vue:190`): `RouterLink` + `aria-current="page"`, **each item individually
  tabbable** route navigation. A nav-links model.

W3 ("unify the strip onto `useSelectionIndicator`, rail ≡ strip") silently implies dragging the
strip onto the rail's roving-tablist model — but the spec treats W3 as a purely *visual* pill
unification and never confronts the consequence:

1. `useSelectionGroup`'s `role-per-mode` menu is `radiogroup | tablist | group`
   (`useSelectionGroup.ts:35-38`). **None of these is "navigation."** Forcing `role="tab"` onto what
   is genuinely *route* navigation is questionable ARIA (a `tab` implies a `tabpanel`; a story route
   is not a tabpanel). So "rail ≡ strip" is not free — it either mis-labels routes as tabs or must
   drive the pill *without* `useSelectionGroup`'s roving machine.
2. Roving tabindex **removes each story's individual tab stop**. Whether that is desirable for a
   route-navigation surface is a real UX/a11y call the spec never weighs.

**Pass 3 MUST pick, on the record:** (A) `role="toolbar"`/tablist + roving (ADJUDICATION-1's lean;
then reconcile the tab-vs-route ARIA), or (B) keep `RouterLink` nav-links individually tabbable and
drive the traveling pill from `useSelectionIndicator` *directly* (bypassing the roving machine) —
which, per ADJUDICATION-1, surfaces as a BJ-ASK truth-up (family J owns the misleading dock
comments). W3 cannot land until this is chosen, because the choice determines whether W3 imports
`useSelectionGroup` wholesale or only its indicator writer.

This single omission caps convergence hard. It is not "owed paint" — it is an owed *decision*.

---

## 3. Design grounding — where the spec mis-reads its own authorities

### 3.1 The codex-anointment is INVERTED (the sharpest design defect)

The spec claims β is "the codex-anointed model (`IOS27-CODEX.md:37`; `MARKS-B.md:277-284`)" (§3 β,
§4.1). I read those. They anoint the *opposite* of β's default.

`MARKS-B.md` §6 (actual `:278-287`) — "Sliding selection pill + glass bar (family G — dock
greenfield)":

> For **overflow**, iOS never clips mid-glyph — it uses edge-fade / detents / **clustering** (the
> "+3" overflow pill in V4/f-0009). Dock greenfield: glass tray + liquid selection pill + edge-fade
> occlusion + **cluster overflow, no interior scroll (F27)**.

And the spec's OWN §1 quotes the codex verdict: iOS uses "edge-fade / detents / clustering … and
**no interior scroll you can feel as a scroll**."

Yet β's *default* overflow strategy is `scroll` — native `overflow-x:auto` (§3 β mechanism 4,
retained from `overflow.css`). That is precisely the feelable interior scroll the codex rejects. β
becomes codex-aligned **only** in its `cluster` strategy arm — which is exactly the arm the spec
defers to "an OPEN GAP" (gap 1: "the scroll↔cluster strategy boundary is fuzzy … Unresolved") and
which it has already BLOCKED as γ.

So the spec awards codex-anointment to the *non-codex* configuration of β, blocks the *actually*
codex-anointed topology (cluster / no-scroll = γ), and parks the codex-required piece in a gap. The
LEADING/BLOCKED split between β and γ is largely artificial: **β-`cluster` IS γ.**

### 3.2 The elegant-reduction trap — committed at the strategy layer

§6 congratulates itself: β passes the "and then the hard part" test because `useDockItemCensus` is a
tractable flex-children RO (true), while γ FAILS it (its cluster-open surface is unspecified). But
the spec applies the test only to the *occlusion* layer. The **codex-required** work — presenting
overflow as a bounded cluster with no interior scroll — is the real "hard part," and β punts it to
gap 1 and to BLOCKED-γ. The load-bearing codex-alignment step is exactly the deferred step. β passes
the reduction test on the affordance layer and quietly fails it on the strategy layer.

### 3.3 G-OCCLUSION is in tension with itself (a gate that cannot pass *as specified*)

§6 claims the "boundary" fuzziness is "closed by scroll-snap to cell starts + a FIXED `--dock-peek`
sliver — provable, not hand-wavy." These two mechanisms fight:

- `scroll-snap-type: inline mandatory` to **cell starts** pins the *leading* edge flush (good — no
  mid-glyph on the left).
- But then the *trailing* visible fraction = `portWidth mod cellWidth` = arbitrary. Unless the port
  is width-quantized to whole cells or the snap is asymmetric, the trailing cell is clipped at an
  arbitrary fraction — i.e. **mid-glyph on the right**, the exact F47a defect, now on the other
  edge.
- "A fixed `--dock-peek` sliver always shows" cannot be simultaneously true with "leading cell snaps
  flush" unless the peek is engineered via scroll-padding / snap math the spec has not written.

So G-OCCLUSION as written is not the clean scalar the spec implies; it is an under-specified geometry
problem. Not disqualifying — it is solvable (asymmetric snap, or `scroll-padding-inline` sized to
reserve the peek, or snap to *end* on the trailing extreme) — but §6's "provable, not hand-wavy"
self-grade is premature. Pass 3 owes the snap/peek reconciliation math before this gate can be
called born-RED-then-GREEN honestly.

### 3.4 F04 / F05 / law-4 — fabricated and mis-assigned evidence

I read the ledger. The §1 problem table mis-states three things:

- **F05** (`FEEDBACK-LEDGER.md:17`): *"Not well defined with animations; improperly shifts the
  screen around; why does this section not have a background aurora."* This is an **animation-shift +
  missing-aurora** complaint. It has nothing to do with the dock, or circles, or pills. The spec's
  row "F04/F05 — outline-circles nested inside the pill tray" is **flatly wrong for F05** — F05
  belongs to the AURORA/animation surface, not this greenfield. Mis-assignment.
- **F04** (`:16`): *"'This shape is to be abrogated' — simplify components to better, more
  opinionated defaults; KISS. A grand audit of ALL components with questions in reduction relayed to
  the user."* F04 is a **general KISS/reduction directive** with a screenshot
  (`F04-shape-abrogate.png`) the spec author did not read (doc-only seat). The specific claim "the
  prev/next nav are circle `DockControl`s inside a pill dock" is **invented** — plausible, but
  presented as evidence it never examined.
- **Law 4 is mis-cited.** Law 4 (`IOS27-CODEX.md:22-28`) says `circle = single tap-target` is a
  *legitimate* role, and its nesting prohibition is specifically *"a card never nests inside a
  pill"* — **not** "a pill never contains a circle." A circle tap-target inside a glass tray is
  law-4-*conformant*. And law 4's own cure-list is **F09/F12/F15/F17/F45/F48** — F04/F05 are not in
  it. So "circle chevrons in a pill violate law 4 (F04/F05)" is unsupported on all three counts.

The chevron removal (W4) may still be *right* — redundant chrome once tap-reveal + occlusion land
(F47 spirit) + the KISS spirit of F04 — but it must be justified on those grounds, not on a
fabricated F05 reading and a mis-cited law 4. G-RADIUS-GRAMMAR's RED-at-HEAD condition currently
rests on invented evidence.

### 3.5 The selection pill under-delivers on "BEST iOS 27"

`DOCK-LADDER.md:143` §4 frames the Find-My indicator as an **EYEGLASS / optical lens** (it refracts
the item behind it), and codex law 6/law 13 + the breath-of-life + liquid-weight edicts push a
liquid-metal register. β reuses the flat `SegmentedTabs` `--stretch` pill — sound *reuse*, but the
spec's "BEST-iOS-27" claim then rests **entirely** on occlusion-provability while the selection
surface itself is at-parity-or-below iOS. That is fine if scoped honestly ("we reuse the existing
pill; the BEST is the provable occlusion grammar"), but the spec claims BEST for the whole route.
Under the breath-of-life edict ("every component always displays engagement; BEST iOS 27") the pill
reuse is an unexamined under-shoot, not a settled reuse.

---

## 4. Portfolio scoring (each route)

| route | spec disposition | my verdict | why |
|-------|------------------|-----------|-----|
| **α SCROLL-PORT retrofit** | BANKED-ALIVE (fallback) | **AMEND** | Honest F27/F47a/F47b fix floor and correctly banked. But the spec frames scroll-retention as codex-neutral; per MARKS-B §6 a scroll port is *further* from the codex, not a neutral floor. Keep alive, re-label as "pragmatic non-codex floor," not "β's fallback." |
| **β LIQUID TRAY + occlusion grammar** | LEADING | **AMEND** | Core decomposition (occlusion ⊥ reveal ⊥ pill ⊥ strategy) is genuinely good and codebase-grounded; the occlusion grammar is the real contribution. NOT advance-ready: owes the §2 keyboard decision, the §3.1 scroll-vs-cluster codex reconciliation, the §3.3 snap/peek math, ownership of the cluster strategy (not deferral), and the §3.4 evidence correction. Not BLOCKED — the spine is sound — but not ADVANCE as written. |
| **γ GOO-MORPH CLUSTER** | BLOCKED | **AMEND** (challenge the block) | The BLOCK conflates *cluster overflow* (MARKS-B §6's codex-anointed "+3 pill", `V4/f-0009`; a bounded detent/popover tray — codex law 6/7, already a shipped pattern class) with *fission goo-necking* (`filter:url()` metaball, Q051-gated, Safari-risky). Clustering ≠ goo. The "secondary surface is unspecified" objection is real but its difficulty is over-stated by borrowing the fission Safari risk. Since β-`cluster` **is** γ, γ cannot be independently BLOCKED while β leans on it. Reopen: spec the cluster→detent/popover tray as the codex default. |
| **W6 fission fork** | USER-GATED (Q051-r1) | **BLOCKED** (correct) | Faithful. Q051 row 1 (`Q051-ASK.md:21-42`) reserves ratify-vs-rebuild to the user; the honest-goo bounds (≤2-frame waist, no strands, clean CSS/canvas, no stacked `filter:url()`) accurately mirror `DOCK-LADDER.md §3/§8` (`:135-138, :262-263`). Keep parked both ways. This is the one fork the spec handles cleanly. |

---

## 5. Re-scored convergence: 42% (down from 52%)

The pass-1 52% priced only the paint debt ("unverified gestalt … every π obligation is OWED"). It
did not discount for:

- the **mandated keyboard decision being entirely absent** (§2) — an owed *decision*, not owed paint;
- the **inverted codex-anointment** (§3.1) — the leading route's *default* contradicts the authority
  it cites, and the codex-aligned arm is the deferred gap;
- **three mis-cited feedback rows** (§3.4) — F05 mis-assigned, F04 fabricated-specific, law 4
  mis-applied; G-RADIUS-GRAMMAR rests on invented evidence;
- the **self-tension in G-OCCLUSION** (§3.3) — the load-bearing gate is not yet the clean scalar it
  claims.

These are architectural/evidentiary, not paint. The census and the decomposition are real and keep
the floor off the ground — hence 42%, not lower. But this is not a pass-away-from-convergence; it is
a pass that must first stop mis-reading its authorities and make the decision it was told to make.

---

## 6. Exact open gaps (superset of pass-1 §7, corrected)

Carried from pass 1 and still real: (2) zero paint / RED baselines un-captured; (3) `useDockItemCensus`
double-observe cost vs `useDockOverflowFit`; (5) PRM instant-snap + live-Safari paint owed; (6)
reveal-on-intent vs idle-collapse / touch-gate — `keepOpen()`-through-glide asserted, not detailed
against `useDockClickIntegrity`/`useDockTouchGate`; (7) collapsed-state affordance (occlusion only
exists expanded).

New / re-scoped by this critique:

- **G1. The ADJUDICATION-1 #4 keyboard model is undecided.** (§2) Disqualifying. Highest priority.
- **G2. β's default strategy contradicts MARKS-B §6 "no interior scroll you can feel."** (§3.1) Fix
  the anointment claim or demote scroll to bounded-only and make quantized-cluster the default.
- **G3. The scroll↔cluster boundary (pass-1 gap 1) is the codex-required arm, not an optional
  fallback.** (§3.2) Owning it collapses the artificial α/β/γ split.
- **G4. G-OCCLUSION snap-to-cell-start vs always-visible-peek-sliver is unresolved geometry.** (§3.3)
- **G5. F04/F05/law-4 evidence is fabricated/mis-assigned.** (§3.4) G-RADIUS-GRAMMAR must be
  re-grounded (F47-redundancy + KISS), F05 dropped from the dock entirely.
- **G6. γ's BLOCK conflates clustering with fission goo.** (§4) Re-open the cluster-as-detent path.
- **G7. The selection pill's "BEST iOS 27" claim is unearned** (§3.5) — scope it as reuse or deliver
  the eyeglass-lens/liquid-metal register.

---

## 7. What pass 3 MUST produce

1. **DECIDE the keyboard model on the record** (ADJUDICATION-1 #4): toolbar/tablist+roving vs
   RouterLink nav-links, with the tab-vs-route ARIA rationale, and state whether it surfaces as a
   BJ-ASK truth-up. W3's shape (import `useSelectionGroup` wholesale vs only its indicator writer)
   follows from this. **Non-negotiable — it is the charge.**
2. **Reconcile β's default with the codex "no interior scroll."** Either argue snap-quantized inline
   scroll is not "feelable scroll" (with the snap math), or make cluster/quantized the default and
   demote free scroll to the bounded-fallback. Correct the anointment citation either way.
3. **Own the scroll↔cluster strategy boundary inside the spec** (the ~100-item case) — it is the
   codex-required arm, and resolving it dissolves the α/β/γ split. Specify the cluster→detent/popover
   presentation surface (law 6/7), explicitly separated from Q051-gated fission goo.
4. **Write the G-OCCLUSION snap/peek geometry** so the gate can actually pass: asymmetric snap or
   `scroll-padding-inline`-reserved peek or trailing-edge snap — pick one and show the math.
5. **Correct the evidence:** drop F05 from the dock (aurora/animation surface); re-scope F04 to the
   KISS/reduction spirit (or read `F04-shape-abrogate.png`); justify chevron removal via F47
   redundancy, not law 4; fix law 4's cure-list citation.
6. **Scope the selection pill honestly** against the DOCK-LADDER §4 eyeglass-lens + breath-of-life
   edict: either deliver the liquid-metal/refractive register or state the pill is reuse and locate
   the BEST solely in occlusion-provability.
7. **Capture the RED baselines** (π-OCCLUSION / π-REVEAL / π-NO-BLOCK) once the browser seat is
   free, and detail `keepOpen()`-through-glide against the collapse FSM + touch gate, plus the
   collapsed-state affordance.

Do these and β converges as a corrected, codex-honest, decision-complete leading spec. Until #1 and
#2 land, it is AMEND, not ADVANCE.
