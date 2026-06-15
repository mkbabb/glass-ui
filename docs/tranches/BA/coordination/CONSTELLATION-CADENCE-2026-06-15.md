# The constellation cadence (2026-06-15) — the acyclic spine at the BA 4.0.0 cut

**Author**: glass-ui BA session (docs-only reconciliation; the dev/impl boundary holds —
this doc edits no BA wave spec, no source, no test, no CI). **Scope**: the three-repo
acyclic spine at the moment BA cuts 4.0.0, what BA owes each downstream consumer at that
cut, and the UNCOVERED asks the cut must absorb so a downstream's `consume-on-our-land`
wave does not crater on a missing producer fix.

**The spine (consume direction — each consumes the PUBLISHED predecessor one tranche
behind, born-RED-gated downstream, NEVER a `file:` link or vendored copy; the
constellation acyclic-spine law, `cross-repo-dev-resolution.md` + kf K's
charter-binding inv):**

```
glass-ui BA 4.0.0  ──published──▶  value.js N (N.W18 consumes the BA cut; cuts v1.0.0)  ──published──▶  kf K
        ▲                                                                                                  │
        └──────────────── consumes kf spring (peer ^4.x) ◀──────── consumes value.js grammar (0.13.0) ────┘
```

The spine is acyclic by VALUE LAYER, not by repo adjacency: value.js ships VALUES
(grammar, parse/serialize, color science, interp kernels); kf consumes value.js one
tranche behind; glass-ui consumes kf's spring AND value.js's grammar; both siblings
consume glass-ui's COMPONENTS. No cycle — glass-ui never blocks on a downstream, and a
downstream's wait gates only its FINAL pin, never its impl (the source half lands
against a recorded born-RED; the consume edge lights on the publish).

**The published-state snapshot at this authoring** (`npm view`):

| repo | published `latest` | branch / cutting | this-cut role |
|---|---|---|---|
| glass-ui | `3.13.0` (AZ close) | `tranche/BA` → **4.0.0** (H4 DECIDED) | the U-fix-mass PRODUCER |
| value.js | `0.12.0` | `tranche/N` → **v1.0.0** (N.W9′) | the SINK + grammar producer (0.13.0 scroll/ramp) |
| kf | `4.2.0` (J close) | `tranche-j-dev` closed; **K** seeded/executing | the spring producer + the consumer |

---

## §1 — what BA cuts at 4.0.0 (the producer surface the spine consumes)

BA's 4.0.0 is an HONEST MAJOR (H4 DECIDED, `EXECUTION-DAG.md §0` + `BA.md` H4): the disco
retirement, the tabs/pager rebuilds, the `/underline` fold, the tone recompose, the
scroll-fade retirement — clean breaks, no alias (inv-7). Batches 0–6 are CLOSED
(`PROGRESS.md` events); only Batch 7 (W-REFLECT2 → W-CLOSE) remains — the cut itself.

The U-fix mass that the value.js U-ledger (U1–U33) collapses onto "consume the BA cut" is
LANDED across the closed batches:

- **dark-material + no-gray** (W-DARK-MATERIAL live-verified, W-NO-GRAY) — U1 gray/dark.
- **the emission class** (W-EMISSION live-verified, `db1e5688`) — the dead-`@source` P9
  root CLOSED; the Select collision-bound + inner-scroll shipped as precompiled CSS
  (U8/U23); the Slider `size` axis as `[data-size]` CSS (U28); the WatercolorDot `ghost`
  variant (U18/U22); the producer-side emission gate born-RED.
- **the menu-glass font-rung** (W-MENU-GLASS, `19fa2ac2`) — the `SelectTrigger` size→font
  rung writing `--dropdown-text` (U7 / WO-3 / BA-VJS-4).
- **the dock FLIP fix** (W-DOCK-MORPH-INSITU) — BA-VJS-1, the nested-`DockLayerGroup`
  measure-ordering `to:0px → from:40→to:242` four-cycle, `DOCK_SPRING` byte-untouched
  (U6/U16).
- **the tabs overhaul + centering** (W-TABS, `6cf5c318`) — ONE engine, pill+underline,
  the oval-blob dead, the BA-VJS-3 indicator-center acceptance row (U21).
- **the spring-clock vocabulary** (W-GLASS-CAL, `364e3d94`) — the `--spring-*-duration`
  tokens (U6/U12/U23 producer root) + the DISCO retirement (H2a).
- **the surface axis** (W-SURFACE-AXIS) — `<Skeleton surface="glass">` (D-1/U20a), the
  Dialog `variant`→`surface` move.
- **the breathing register** (W-STAGE, `a54dcfd2`) — BA-VJS-2 non-zero drift (U33).
- **the goo renderer half** (W-GOO-REDRESS, `b0060bdf`) — the satellite bridge + the
  pointer wake (R8-7); BA-VJS-5 / C-1 per-satellite `uSatColor` taken as **arm B (booked
  to 4.x)** per its conditional gate.

**The cut-notes BY NAME** (the atlas register-D discipline) are scoped in W-CLOSE: scope 4
(MIGRATION append), scope 13 (the value.js adopt book), scope 12 (the atlas close set),
scope 11 (the slides book). The value.js-impacting rows — tabs / Dialog / menu-row /
Select / Slider — are flagged by name (W-CLOSE scope 13a). **This carries the bulk of the
U-fix mass.** The verdict below is about the REMAINDER.

---

## §2 — what BA owes each consumer at the 4.0.0 cut

### §2.1 — value.js N (N.W18 → v1.0.0): the largest consume edge

value.js holds its close pin at the BA cut (`inv-N-6` amended "3.13.0" → "the BA cut";
value.js `WAVES-2.md` §N.W18.A + §N.W9′). N.W18 is value.js's `consume-on-their-land`
wave: it re-pins EXACT to 4.0.0, runs the full `inv-N-10` abrogation sweep against BA's
retired set (`btn-audacious`, Dialog `variant`, the tabs breaks, `.scroll-fade-*`), and
adopt-π-verifies the producer U-fixes. **value.js N.W18.A enumerates EXACTLY what it
expects to consume from the BA cut** — and that enumeration includes the addendum cluster
(see §3). N.W9′ cuts **v1.0.0**, the pin discharged by W18.A.

BA owes value.js at the cut:

1. **The named cut-notes** (W-CLOSE scope 13a) — COVERED. tabs / Dialog / menu-row /
   Select / Slider by name; the interim-arm retirements (`breathing`→`drifting`, the
   bespoke `PaletteCardSkeleton.vue`, the trigger-only font override); the C-1 4.x block.
2. **The producer U-fixes** — COVERED for the original-letter registers A/B/C/D
   (§1 above); UNCOVERED for the addendum (§3).
3. **The cross-repo C-3 easing primitive** — value.js N.W18.B consumes a published
   `<EasingConfigurator>` when glass-ui publishes it. BA took **arm B** (demo-only
   `StepsEditor`, `<EasingPicker>` BOOKED to W-EASING-PRIMITIVE — `W-FOURIER-STUDIO`
   commit `f220a497`). So value.js's W18.B consume edge has NO producer at the 4.0.0 cut;
   it stays on its W16.B interim (`EasingSelector.vue` restyled-in-place) until the booked
   primitive ships. **This is a known, named book — not a silent drop** (W-CLOSE scope 13
   names it via the C-1/C-3 disposition), but the cadence must state it plainly: **value.js
   cannot retire its easing interim at the 4.0.0 cut.**

### §2.2 — kf K (K.W1 consumes glass-ui; the spring producer)

kf is glass-ui's UPSTREAM for spring (glass-ui peers `@mkbabb/keyframes.js`) AND a
glass-ui consumer (the demo + components consume glass-ui primitives). kf K's consume
edge:

- **K.W1** re-pins glass-ui `~3.11.2 → ~3.13.0` (`keyframes.js/docs/tranches/K/waves/K.W1.md`
  §1). The K.W1 audit verified every 3.13.0 breaking seam DISJOINT from kf's consume
  surface, all 18 subpath imports resolve, and **the peer range is kf-compatible**: glass-ui
  3.13.0 declares `@mkbabb/keyframes.js: "^2.2.0 || ^3.0.0 || ^4.0.0"` — kf at 4.2.0
  satisfies `^4.0.0` (`K.W1.md` §State-verified; glass-ui `package.json:817`).
- **The 4.0.0 obligation to kf**: BA's 4.0.0 MUST preserve a kf-compatible peer range.
  The current `package.json:817` admits `^4.0.0` — kf's current 4.2.0 and K's cut both
  satisfy it. **BA owes: do NOT narrow `@mkbabb/keyframes.js` below `^4.0.0` at the cut.**
  This is a SILENT obligation today (no W-CLOSE clause asserts the kf peer range is
  preserved across the major bump). See §3 (the kf-peer-preservation row).
- **K's EasingPicker (the L-SEED boundary law)**: kf is the DONOR for the C-3
  `<EasingConfigurator>` (math = value.js · time/spring = kf · component = glass-ui).
  K's L-SEED hands the editor COMPONENT to glass-ui. Because BA booked W-EASING-PRIMITIVE
  (arm B), kf's donor study + the eventual re-point (kf's L tranche) has NO glass-ui
  producer at the 4.0.0 cut. **No action owed at THIS cut — the boundary law holds, the
  publish is a post-4.0.0 point release** — but the cadence records that the cross-repo
  primitive is authored by NEITHER the 4.0.0 cut NOR K, and the book (W-EASING-PRIMITIVE)
  is the named home.

### §2.3 — the leaf consumers (atlas / slides / speedtest)

COVERED by W-CLOSE: the atlas close set (scope 12 — the d6 lineage retirement, the by-name
A/B/C tables, the fork-close protocol), the slides adopt/deploy book (scope 11), the
disco-retirement re-pin for speedtest+slides (scope 13 / H2). Not the spine's middle/sink
nodes; recorded for completeness.

---

## §3 — the UNCOVERED asks (the coverage gap)

The value.js N2 letter has TWO layers: the original body (registers A–E, 2026-06-12 ~13:37)
and the **S2-critic ADDENDUM** (register A′ the perf producer cluster + register F the
standing `N.md §8` carries, appended later same day). The BA fold analysis
(`audit/fleet/valuejs-fold.md`, timestamped 17:35) covers ONLY the original body — its
coverage matrix has rows for A-1..A-5, B, C-1..C-3, D, E, but **ZERO rows for A′-1..A′-6
or F-1..F-4**. A HEAD grep across all 30 BA wave specs confirms none fold the addendum
mechanisms.

value.js N.W18.A EXPLICITLY lists the addendum items as BA-cut consume expectations
(verbatim from `value.js/docs/tranches/N/WAVES-2.md` §N.W18.A): *"GooBlob visibility/PRM +
zombie canvas (letter A′-1/A′-2), card-shrink composited keyframes (A′-3), the
`--dock-morph-t` cascade narrowing (A′-4), the aurora DPR cap (A′-5), the per-density dock
glyph (A′-6), `AuroraConfig` descriptor (Register F)."* So the gap is not academic — a
downstream's consume wave names these as producer fixes it adopts at the cut.

### The gap table

| ask | P | mechanism (value.js letter) | BA coverage @ HEAD | letter fold-by | status now |
|---|---|---|---|---|---|
| **A′-1** | P1 | GooBlob emits a zombie 2nd canvas (live GL context, 0×0 box) — `L-PERF2 §5` | W-GOO-REDRESS owns bridge+wake+`uSatColor` only; NO canvas-lifecycle clause | before Batch 2 | **UNCOVERED — deadline passed (Batch 2 CLOSED)** |
| **A′-2** | P0 | GooBlob has no visibility/PRM gate — offscreen blob keeps a live RAF loop — `L-PERF3 §54-70` | W-GOO-REDRESS adds a POINTER wake, NOT an IntersectionObserver/`document.hidden`/PRM gate | before Batch 2 | **UNCOVERED — deadline passed; P0** |
| **A′-3** | P0 | `card-*-shrink` keyframes animate layout props (padding/font-size/grid-rows) → CLS 1.03 — `L-PERF3 §93-111` | no wave touches the card-shrink keyframes | by the 4.0.0 cut | **UNCOVERED** |
| **A′-4** | P1 | `--dock-morph-t` write restyles a 10-selector `calc()` group → ~13fps; Popper reflow in the Vue flush — `L-PERF2 §4` | W-DOCK-MORPH-INSITU fixed the `to:0` MEASURE bug; did NOT narrow the `@property` cascade scope / defer the Popper measure | before Batch 2/3 | **UNCOVERED — deadline passed** |
| **A′-5** | P2 | aurora DPR cap in `useAurora` (2880×1800, ~21.8MB for a blurred wash) — `L-PERF1 §3` | W-STAGE touched the breathing TABLE, not the DPR backing | before Batch 6 | **UNCOVERED — deadline passed** |
| **A′-6** | P2 | `--dock-icon-glyph` does not ride the density cascade — `D5 §7` | no wave touches the per-density glyph ratio | by the 4.0.0 cut | **UNCOVERED** |
| **F-1** | — | C-DTS: the dts-emitting `build:watch` (the dts-less dist flap broke value.js visual lanes twice) | W-HYGIENE owns dist-hygiene but no dts-watch clause found | by the 4.0.0 cut | **UNCOVERED** |
| **F-2** | — | the value.js version ranges: glass-ui devDep `^0.10.0` two majors stale → `^0.12.0`; **peer `^0.10.0 \|\| ^0.11.0` does NOT admit 0.12.0** (`package.json:819`) | no wave widens the value.js peer/devDep range | by the 4.0.0 cut | **UNCOVERED — live peer-warning risk for every 0.12.x registry consumer** |
| **F-3** | — | an `AuroraConfig` slider-section descriptor (the BlobPane/AuroraPane re-author substrate) | no wave | by the 4.0.0 cut | **UNCOVERED** |
| **F-4** | — | `.retired-classes.txt` currency at every cut + changelog every subpath/symbol rename (the manifest value.js's inv-N-10 sweep reads) | W-CLOSE scope 4 (MIGRATION by-name tables) is the LIKELY substitute, but the letter F-4 demands the SUBSTITUTION be RECORDED in the cut notes (an assumed substitution is a silent break) | by the 4.0.0 cut | **PARTIAL — substitution unrecorded** |
| **kf-peer** | — | BA's 4.0.0 must preserve `@mkbabb/keyframes.js` peer `≥^4.0.0` so kf 4.2.0 / K's cut keep satisfying it | `package.json:817` currently admits `^4.0.0`; no W-CLOSE clause ASSERTS it survives the major bump | by the 4.0.0 cut | **UNASSERTED — preserved by default, ungated** |

### Severity reading

- **A′-2 (P0) and A′-3 (P0)** are the load-bearing misses: a GL render loop with no
  visibility/PRM gate and layout-animating keyframes at CLS 1.03 are producer-side defects
  the value.js demo measured live, and N.W18.A names them as consume expectations. They
  are NOT folded into any landed wave.
- **A′-1/A′-4/A′-5 (P1/P2)** missed their batch deadlines (Batches 2/3/6 are CLOSED).
  The letter's own routing warned: *"a late fold forces 4.x point releases of items that
  could ride their natural waves."* That outcome is now realized for these rows.
- **F-2 (peer range)** is the one with a LIVE blast radius beyond the spine: glass-ui's
  value.js peer `^0.10.0 || ^0.11.0` does not admit the published `0.12.0`, so every
  registry consumer on 0.12.x already gets a peer warning. The 4.0.0 cut is the natural
  place to widen it — but no wave does.
- **kf-peer** is preserved by default (no narrowing planned), but UNGATED — a structural
  assertion in W-CLOSE would make the spine's upstream-compat survive the major bump on
  purpose rather than by accident.

---

## §4 — the routing recommendation (for the BA lead; this doc does not execute it)

Per the dev/impl boundary, this cadence doc REPORTS the gap; it does not amend a wave
spec. The fold smallest-first idiom (the original letter's routing) suggests, for the BA
lead's consideration at W-CLOSE / a Batch-7 amendment:

1. **The cut-ceremony one-liners** (F-1 dts-watch, F-2 peer-range widen, F-4 substitution
   record, the kf-peer-preservation assertion, A′-6 per-density glyph, F-3 `AuroraConfig`
   descriptor) are W-CLOSE-natural — they ride the version-cut scope (scope 4/10) and the
   adopt-book scope (13). F-2 + the kf-peer row are `package.json` edits at the bump; F-1
   is a `build:watch` clause; F-4 records the MIGRATION-as-substitute decision the letter
   demands.
2. **A′-3 (P0 card-shrink keyframes)** has no owning wave — a net-new small item (or a
   W-CLOSE-adjacent compositor-safe rewrite) is the honest home; it cannot silently drop.
3. **A′-2 (P0 visibility/PRM gate) + A′-1 (zombie canvas) + A′-4 (dock cascade
   narrowing) + A′-5 (DPR cap)** missed their batch windows. The structurally honest
   options are (a) a Batch-7 perf rider that reopens the named seams under §Triumvirate
   (the no-workaround discipline — these are real producer defects, not styling), or
   (b) book them BY NAME to a 4.x point release in the W-CLOSE successors section, so
   value.js N.W18.A knows which fixes land at 4.0.0 vs which wait (the same treatment
   C-1/C-3 already received). **Option (b) is the minimum the no-silent-drop law requires;
   option (a) is preferable for the two P0s.**
4. Either way, **W-CLOSE's value.js adopt book (scope 13) must enumerate the addendum
   disposition** — which A′/F asks land at the 4.0.0 cut and which book to 4.x — so
   value.js's abrogation sweep does not assume a producer fix that is not there. Today the
   adopt book covers registers A–E but is SILENT on A′ and F.

---

## §5 — the coverage verdict

**The BA wave set + the 4.0.0 cut COVER the value.js U-fix MASS** (the original-letter
registers A/B/C/D/E: dark-material, no-gray, the emission class, the dock FLIP, the
tabs/menu/surface/breathing fixes, the named cut-notes, the C-1/C-3 books) **and the
kf-K K.W1 consume edge** (glass-ui 3.13.0→4.0.0 is consume-disjoint from kf's surface, the
peer range admits kf 4.2.0). The acyclic spine holds: value.js N.W18 → v1.0.0 consumes
the BA cut, kf K consumes glass-ui + (born-RED-gated) value.js 0.13.0 grammar, no cycle.

**The gap is the value.js N2 letter's ADDENDUM** — register A′ (the perf producer cluster
A′-1..A′-6) and register F (the standing carries F-1..F-4) — which the BA fold analysis
(`valuejs-fold.md`) never ingested and no wave folds, yet value.js N.W18.A explicitly
names as BA-cut consume expectations. Two of these are P0 (A′-2 the GooBlob visibility/PRM
gate, A′-3 the card-shrink layout keyframes); F-2 (the value.js peer-range non-admission of
0.12.0) has a live blast radius today. The kf upstream-peer preservation is correct by
default but ungated. None can SILENTLY drop at the cut (the atlas/letter no-silent-drop
law); the minimum owed is a BY-NAME disposition in W-CLOSE's value.js adopt book stating
which addendum asks land at 4.0.0 and which book to a 4.x point release.
