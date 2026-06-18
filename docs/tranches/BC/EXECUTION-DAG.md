# BC — the EXECUTION-DAG (the turnkey build map: topo-ordered build plan + dependency graph + per-band gate battery)

> **What this is.** The single execution-readiness contract for the BC tranche's 70 waves: the BAND
> build-order, the intra-band + cross-band dependency edges (read off every wave's `**Sequence:**`
> line), a topological sort proven ACYCLIC, the parallelizable-vs-serial annotation, and the per-band
> gate battery (the `proof:*` gates + `tests-visual/*.spec.ts` π each band passes before the next
> opens). It is **EXECUTION-PHASE guidance** — BC is tranche-dev-COMPLETE; this map is consumed when
> the user greenlights the build. Authored by iteration-13 DEEPEN-2 (execution-readiness depth).
>
> **Source of truth.** The edge set comes from each wave's `waves/*.md` `**Sequence:**` line — that is
> the BINDING source for every dependency edge below. `WAVE-INDEX.md` is the band/name REGISTRY (the
> 70-wave roster + the band column); its `sequence-after` cells are a convenience summary, NOT binding
> over a wave's own `**Sequence:**` line — where the two diverge the wave Sequence wins (and the stale
> WAVE-INDEX cell is the one to reconcile, never the other way). The band roster matches
> `ORCHESTRATION.md §1`. Every wave-id below resolves on disk in `WAVE-INDEX.md` (cross-checked). The
> gate battery comes from each wave's acceptance (`proof:*` + π specs).
>
> **The binding-order law (recorded once, applied everywhere below).** ORCHESTRATION §1's band roster
> is a THEMATIC grouping, NOT a strict numeric execution order. The **per-wave `Sequence:` line is the
> binding edge** — so a Band-4 wave may CONFORM-TO a Band-6 wave (`BC.W-VIZ-CONFIGURATOR-SUITE` →
> `BC.W-CONFIG-RIGHT`) and a Band-7 token-mint (`BC.W-SPRING-EASE`) may be READ by a Band-1/3 consumer
> without either being a cycle. The DAG below is built from the Sequence edges, then the topo-sort is
> proven acyclic (§4). Where a Sequence edge runs OPPOSITE the band number, it is flagged as a
> **cross-band reconcile** and shown to be acyclic (a conformance/consume-after-mint relation, never a
> back-build).

---

## 1 — The BAND build-order (the spine)

The disease BC kills is "source-green / paint-broken" — gates that verified a SOURCE mechanism while
the GESTALT shipped grey/broken. So the spine is **gates-redesign FIRST, then visual, perf LAST**:

```
Band F  (forensics)        →  the PM matrix + the failure-class taxonomy (feeds Band 0)
Band 0  (gate transposition)  →  gates MEASURE PAINT; per-wave gestalt; the fold ledger  [THE LOAD-BEARING FLOOR]
Band 1  (glass identity)   →  the warm-cream translucent base restored at root (kills the grey-slab)
Band 2  (dock)             →  the buttery compositor-only morph engine + the dock fleet
Band 3  (tabs + underline) →  iOS-27 glass pills + liquid-tab + eased underline
Band 4  (procedural viz)   →  WebGPU-EVERYWHERE + SAFARI-WEBGL first, THEN the 11 per-viz waves
Band 5  (pages)            →  the ONE standardized page chassis + hierarchy + heroes + padding
Band 6  (controls)         →  radio/dropdown/control-smooth + config-right
Band 7  (motion canon)     →  one-clock + spring-ease + affordance-map + tunable-anim
Band 8  (safari)           →  the WebKit context-lifecycle / no-flash breaker
Band 9  (storybook meta)   →  the frontend-design meta-pass over the storybook ITSELF
Band 10 (cross-repo+cut)   →  deck BUILD + the three sibling adopts + the honest 4.x CUT
Band 11 (PERFORMANCE)      →  css-critical + lighthouse + perf-producer (measures the SETTLED floor)
        → then BC.W-CUT (terminal, user-gated)
```

**The two structural inversions from the thematic band number (both binding-correct, both acyclic):**

1. **Band 0 must land before EVERY visual wave (Bands 1-9).** `BC.W-GESTALT-FIRST` + `BC.W-PAINT-GATE`
   are the per-wave pixel-readback harness every Band 1-9 wave closes against. The gate-redesign is
   the FIRST executable work of BC (after Band F supplies the requirements). Build a visual wave
   before the paint gate exists and you re-ship the BB disease.

2. **Band 4's substrate floor (`BC.W-WEBGPU-EVERYWHERE` + `BC.W-SAFARI-WEBGL`) lands before the 11
   per-viz waves — and `BC.W-SAFARI-WEBGL` is *physically* Band 8.** The per-viz Safari-π no-flash
   arm GATES on the Band-8 breaker landing (every per-viz Sequence line says so verbatim — "the
   Safari π's no-flash arm GATES on this Band-8 breaker landing, NOT inherited via the substrate").
   So `BC.W-SAFARI-WEBGL` is **pulled forward** to land WITH `BC.W-WEBGPU-EVERYWHERE` at the head of
   Band 4, not deferred to its nominal Band-8 slot. (Band 8 stays the home of the wave; its execution
   is hoisted to the Band-4 substrate floor — this is the single most important cross-band hoist.)

**The cross-band reconciles (Sequence edge opposite band number, proven acyclic in §4):**

| reconcile | edge direction | why it is NOT a cycle |
|---|---|---|
| `BC.W-SAFARI-WEBGL` (B8) hoisted to Band-4 head | B8 → B4-viz | the breaker is a substrate-floor prerequisite; it depends only on Band 0 + `BC.W-WEBGPU-EVERYWHERE`, never on a per-viz wave — pure forward hoist |
| `BC.W-VIZ-CONFIGURATOR-SUITE` (B4) CONFORMS-TO `BC.W-CONFIG-RIGHT` (B6) | B4 → B6 | CONFORMANCE (verified-after), not a build gate: `<Configurator asideSide='right'>` already defaults right at HEAD, so the viz studio is a first exemplar; CONFIG-RIGHT standardizes the LIBRARY component, the studios host it — one-directional, no back-build |
| `BC.W-SPRING-EASE` (B7) READ by `BC.W-BUTTON-GLASS-IOS` (B1) / `BC.W-LIQUID-TAB` (B3) / `BC.W-UNDERLINE-TUNE` (B3) | B7 → B1/B3 | consume-after-mint: SPRING-EASE is a TOKEN-ONLY wave (no consumer edit), so its `snappy`/`press` mint can land EARLY; the consumers DECLARE they read the eased curve, and the spring-reading π ARM of each consumer is the only leg that waits on the mint (the geometry/material legs do not). SPRING-EASE depends on NONE of them → acyclic |
| `BC.W-SPRING-EASE` (B7) READ by `BC.W-DOCK-ENGINE` (B2) | B7 → B2 | consume-after-mint (the SAME R1/R5 treatment): SPRING-EASE OWNS the `dock` SPRING_PRESETS row + the generated `--spring-dock`/`--spring-dock-duration` tokens; DOCK-ENGINE CONSUMES them (its body confirms the read; its own `**Sequence:**` is downstream of SPRING-EASE). The edge is one-directional INTO DOCK-ENGINE (SPRING-EASE depends on NONE of the dock waves → acyclic). The `dock` row is byte-FROZEN (SPRING-EASE's S4 content-hash), so DOCK-ENGINE need not wait on a curve CHANGE — but it DOES read the token (`--spring-dock`/`--spring-dock-duration`), so the build/verify edge stands. See §3 R2 |
| `BC.W-PAGE-PRUNE` (B5) BEFORE `BC.W-PAGE-CHASSIS` (B5) | intra-band reorder | prune dead routes/copy FIRST so the chassis is applied to kept copy, not re-threaded onto dead routes — an intra-band ordering, not a cross-band issue |

---

## 2 — The dependency graph (per-wave edges; `A → B` ≡ "B depends on A / A builds first")

Read off every `waves/*.md` `**Sequence:**` line. Grouped by band; the `⇒` marks the gating edge INTO
the next band. Within a band, `[‖]` = parallelizable, `[→]` = serial-after.

### Band F — Forensics (4 waves)
```
BC.W-PM-BB ──┐
BC.W-PM-BA ──┼──→ BC.W-PM-SYNTHESIS   (consumes all three PM wrappers)
BC.W-PM-AZ ──┘
```
- `BC.W-PM-BB` is FIRST (no predecessor). `BC.W-PM-BA`, `BC.W-PM-AZ` are SIBLINGS of BB (no hard dep — `[‖]` all three).
- `BC.W-PM-SYNTHESIS` is serial-after all three `[→]`; it GATES Band 0 (its requirements are the Band-0 acceptance clauses).
- **`⇒ Band 0`**: `BC.W-PM-SYNTHESIS` → `{BC.W-GESTALT-FIRST, BC.W-PAINT-GATE, BC.W-FOLD-LEDGER}`.

### Band 0 — Verification transposition (3 waves) — THE LOAD-BEARING FLOOR
```
BC.W-PM-SYNTHESIS ──→ BC.W-GESTALT-FIRST ──┐
                  ──→ BC.W-PAINT-GATE    ──┼──→ (every Band 1-9 visual wave closes against these)
                  ──→ BC.W-FOLD-LEDGER   ──┘
```
- The three land TOGETHER `[‖]` (the harness transposition) — siblings, no intra-band edge.
- `BC.W-FOLD-LEDGER` consumes the 4 PM wrappers + `DEFERRAL-LEDGER.md`; mints `FOLD-LEDGER.json`. Its `proof:bc-fold-ledger` is a CLOSE oracle (Band 6 + the cut gate on it).
- **`⇒ Band 1`** (via `BC.W-PAINT-GATE`'s real-paint harness + `BC.W-GESTALT-FIRST`'s per-wave reader) and **`⇒ Band 4`** (`BC.W-WEBGPU-EVERYWHERE`'s gate is built on `BC.W-PAINT-GATE`'s harness).

### Band 1 — Glass identity rebuild (7 waves)
```
BC.W-BLACK-BAR  (FIRST of Band 1 — the rim→catch-light token)
   ├──→ BC.W-GLASS-IDENTITY  (warm-cream FLOOR; reads the corrected rim)
   │       ├──→ BC.W-ADAPTIVE-RECONCILE  (close the observer loop above the floor)
   │       │       └──→ BC.W-GLASS-LEGIBILITY-MEASURED  (measures the AA bar on the closed loop)
   │       └──→ BC.W-GLASS-PRUNE  (consolidate to Glass CARDS + Glass MATERIALS; needs IDENTITY+ADAPTIVE landed)
   │               ├──→ BC.W-DIALOG-GLASS       (specimen of the consolidated grammar)
   │               └──→ BC.W-BUTTON-GLASS-IOS   (specimen; also reads SPRING-EASE press register — see §3)
   └──→ (BC.W-BUTTON-GLASS-IOS also reads BC.W-BLACK-BAR rim directly)
```
- Serial spine: `BLACK-BAR → GLASS-IDENTITY → ADAPTIVE-RECONCILE → GLASS-LEGIBILITY-MEASURED`.
- `GLASS-PRUNE` is `[→]` after `{IDENTITY, BLACK-BAR, ADAPTIVE-RECONCILE}`; `DIALOG-GLASS` + `BUTTON-GLASS-IOS` `[‖]` after GLASS-PRUNE.
- `GLASS-LEGIBILITY-MEASURED` is the Band-1 ratify wave (synthesis/measurement). It can run `[‖]` with GLASS-PRUNE since both only need ADAPTIVE-RECONCILE.
- **`⇒ Band 2`**: `BLACK-BAR` + `ADAPTIVE-RECONCILE` → `BC.W-DOCK-ENGINE` (the dock reads the corrected rim + stops reading grey).
- **`⇒ Band 3`**: `BLACK-BAR` + `GLASS-IDENTITY` + `ADAPTIVE-RECONCILE` → `BC.W-TABS-IOS`.
- **`⇒ Band 4`**: `GLASS-IDENTITY` + `ADAPTIVE-RECONCILE` → `BC.W-VIZ-AURORA` (the glass over the field reads warm, not grey).
- **`⇒ Band 5`**: Band 1 (the ONE chassis card hosts the rebuilt warm-cream glass) → `BC.W-PAGE-CHASSIS`.
- **`⇒ the VISUAL-RECONCILE`**: the whole Band-1 glass set → `BC.W-VISUAL-RECONCILE` (re-walk the BB band over the fixed floor).

### Band 2 — Dock (7 waves)
```
BC.W-DOCK-ENGINE  (FIRST of Band 2 — the ONE-clock buttery engine; after BLACK-BAR + ADAPTIVE-RECONCILE)
   ├──→ BC.W-DOCK-ARBITRARY    ──→ BC.W-LIQUID-MORPH  (hardens ARBITRARY against degeneracy — never white)
   ├──→ BC.W-DOCK-VERTICAL-FIX ──→ BC.W-DOCK-COLLAPSED-BOTH ──→ BC.W-DOCK-STACK-RAIL  (the rail hangs off a working+collapsible dock)
   └──→ BC.W-DOCK-SHRINK-BLUR  (disjoint root: the resting self-blur; [‖] with the morph waves)
```
- `DOCK-ENGINE` is the root; `ARBITRARY`, `VERTICAL-FIX`, `SHRINK-BLUR` all `[→]` after it (and `[‖]` with each other).
- `LIQUID-MORPH` `[→]` after `{DOCK-ENGINE, DOCK-ARBITRARY}` (the headline expressive wave).
- `COLLAPSED-BOTH` `[→]` after `{DOCK-ENGINE, DOCK-VERTICAL-FIX, BLACK-BAR}`.
- `DOCK-STACK-RAIL` is LAST `[→]` after `{DOCK-ENGINE, DOCK-VERTICAL-FIX, COLLAPSED-BOTH, BLACK-BAR}` (the chronic AZ→BA→BB rail).
- **`⇒ Band 4`**: `LIQUID-MORPH` → `BC.W-SAFARI-WEBGL` (the cross-engine arm references the Chromium-proven morph stability).
- **`⇒ Band 10`**: Band-2 dock stable → `BC.W-DECK` (the deck composes the dock surface) + → `BC.W-SAFARI-WEBGL`.
- **`⇒ Band 11`**: `DOCK-ENGINE` + `LIQUID-MORPH` (the settled morph geometry) → `BC.W-PERF-PRODUCER`.

### Band 3 — Tabs + underline (3 waves)
```
BC.W-TABS-IOS  (FIRST — material+geometry; after Band-1 glass; NO spring read)
   ├──→ BC.W-LIQUID-TAB      (pull-morph; reads the eased snappy from SPRING-EASE — see §3)
   └──→ BC.W-UNDERLINE-TUNE  (lockstep with SPRING-EASE on the indicator-clock half — see §3)
```
- `TABS-IOS` `[→]` after Band 1. `LIQUID-TAB` + `UNDERLINE-TUNE` `[‖]` after TABS-IOS (disjoint materials).
- Both read the eased `snappy` curve → the consume-after-mint edge from `BC.W-SPRING-EASE` (§3).
- **`⇒ Band 10`**: Band-3 PagerDots/pager surface → `BC.W-DECK` (the deck composes the windowed pager).

### Band 4 — Procedural viz (18 waves: 6 cross-cutting + 11 per-viz + GRID-SIMPLE)
The substrate floor lands FIRST (with `BC.W-SAFARI-WEBGL` hoisted in), THEN the per-viz waves fan out.
```
                          ┌────────────────────────────────────────────────────┐
Band 0 (PAINT-GATE) ──→   │  BC.W-WEBGPU-EVERYWHERE  (FIRST of Band 4)           │  THE SUBSTRATE FLOOR
Band 2 (LIQUID-MORPH) ──→ │  BC.W-SAFARI-WEBGL      (hoisted from Band 8)        │  (both gate every per-viz wave)
                          └────────────────────────────────────────────────────┘
   ├──→ BC.W-VIZ-INTERACTION   (the shared usePointerVelocityField; after WEBGPU + PAINT-GATE)
   ├──→ BC.W-VIZ-CHOREOGRAPHY  (the ONE kf clock; after WEBGPU + VIZ-INTERACTION + MOTION-ONE-CLOCK)
   ├──→ BC.W-TEAL-NAVY-PURGE   (cross-cutting; WITH the per-viz waves; after WEBGPU)
   │
   ├──→ BC.W-VIZ-AURORA        ─┐
   ├──→ BC.W-GOOBLOB-PLAIN ──→ BC.W-GOOBLOB-MEATBALL ─┐
   ├──→ BC.W-VIZ-DOTFLOW       ─┤                       │
   ├──→ BC.W-VIZ-CONCENTRIC    ─┤  (each per-viz wave [‖] after the substrate floor;
   ├──→ BC.W-VIZ-FOURIER       ─┤   each pairs with VIZ-INTERACTION + VIZ-CHOREOGRAPHY +
   ├──→ BC.W-VIZ-CONSTELLATION ─┤   TEAL-NAVY-PURGE + CONFIG-RIGHT(conform) + PAGE-CHASSIS)
   ├──→ BC.W-VIZ-WATERCOLOR    ─┤        (WATERCOLOR mounts NO drawing context — WEBGPU is N/A;
   ├──→ BC.W-VIZ-PAPERGRID  ──→ BC.W-GRID-SIMPLE   needs only GESTALT-FIRST + GHOST-DASHED + SAFARI flash arm)
   ├──→ BC.W-VIZ-DOTMATRIX  ──→ BC.W-VIZ-HYBRID  (HYBRID reuses DOTMATRIX's dot-rasterizer
   │                            ▲                  AND GOOBLOB-MEATBALL's SDF field)
   │    BC.W-GOOBLOB-MEATBALL ──┘
   │
   └──→ BC.W-VIZ-CONFIGURATOR-SUITE  (the shared per-viz studio+demo discipline + gate;
                                      after WEBGPU + PAGE-CHASSIS; CONFORMS-TO CONFIG-RIGHT;
                                      folds in EVERY per-viz wave's configurator+demo)

BC.W-VISUAL-RECONCILE  (Band-4 cross-cutting; after Band-1 glass + GESTALT-FIRST — the BB-band re-walk)
```
- Per-viz `[‖]` set (after the substrate floor): AURORA, DOTFLOW, CONCENTRIC, FOURIER, CONSTELLATION, WATERCOLOR, PAPERGRID, DOTMATRIX, GOOBLOB-PLAIN.
- Per-viz serial `[→]` chains: `GOOBLOB-PLAIN → GOOBLOB-MEATBALL`; `VIZ-PAPERGRID → GRID-SIMPLE`; `DOTMATRIX → VIZ-HYBRID`; `{GOOBLOB-MEATBALL, DOTMATRIX} → VIZ-HYBRID` (HYBRID has TWO parents).
- `VIZ-CONFIGURATOR-SUITE` is LAST of Band 4 `[→]` (the suite gate folds in every per-viz configurator+demo); it CONFORMS-TO `CONFIG-RIGHT` (Band 6).
- `GRID-SIMPLE` is pure CSS (no GL) — `[→]` after `PAGE-CHASSIS` + `[‖beside]` `VIZ-PAPERGRID` (shared `--grid-*` rhythm).
- `VISUAL-RECONCILE` `[→]` after the Band-1 glass set + `GESTALT-FIRST` (it is the harness's first cross-band consumer).
- **`⇒ Band 5`**: `GRID-SIMPLE` + `VIZ-PAPERGRID` (the per-page procedural bg) → `BC.W-PAGE-CHASSIS`. *(Note: a soft mutual — PAGE-CHASSIS needs the bg recipes; the viz studios need the chassis idiom. Resolved in §4: the static `GRID-SIMPLE`/`VIZ-PAPERGRID` recipe lands the bg; PAGE-CHASSIS hosts it; the heavier per-viz STUDIOS conform to the chassis after — no cycle on the recipe leg.)*
- **`⇒ Band 10`**: `BC.W-VIZ-FOURIER` → `BC.W-FOURIER-ASK` (the in-repo "ONE fourier view" lands before the cross-repo re-pin); `BC.W-VIZ-AURORA` (the warm-lean root) → `BC.W-FOURIER-ASK`.
- **`⇒ Band 11`**: `BC.W-VIZ-AURORA` + `BC.W-GOOBLOB-PLAIN` (the DPR cap + one-canvas invariant ride on the rebuilds) → `BC.W-PERF-PRODUCER`.

### Band 5 — Page standardization (9 waves)
```
BC.W-PAGE-PRUNE  (BEFORE the chassis — kill dead routes/copy first)
   └──→ BC.W-PAGE-CHASSIS  (the ONE standardized page idiom; after Band 1 + Band-4 bg recipes + PAGE-PRUNE)
           ├──→ BC.W-PAGE-HIERARCHY   ──→ BC.W-CODE-BLOCKS      (the technical-value code rung; after HIERARCHY)
           │                          ──→ BC.W-GHOST-DASHED     (after HIERARCHY + GLASS-IDENTITY + BLACK-BAR)
           │                          ──→ BC.W-SEPARATOR-FIX    (after HIERARCHY + GLASS-IDENTITY + BLACK-BAR)
           ├──→ BC.W-HERO-AUDACIOUS   (sets per-category heroScale; after PAGE-CHASSIS + Band 1)
           │       └──→ BC.W-COMPOSITIONS-HERO  (kill the homepage-duplicate; alongside HERO-AUDACIOUS)
           └──→ BC.W-PADDING-CANON    (the φ ladder; after GLASS-IDENTITY + BLACK-BAR; coordinates DIALOG-GLASS)
```
- `PAGE-PRUNE` is FIRST `[→]` (prune dead routes; COMPOSITIONS-HERO depends on the orphan deletion).
- `PAGE-CHASSIS` is the Band-5 root `[→]` after `{PAGE-PRUNE, Band 1, GRID-SIMPLE/VIZ-PAPERGRID}`.
- `PAGE-HIERARCHY`, `HERO-AUDACIOUS`, `PADDING-CANON` `[‖]` after PAGE-CHASSIS.
- `CODE-BLOCKS`, `GHOST-DASHED`, `SEPARATOR-FIX` `[‖]` after PAGE-HIERARCHY (+ their Band-1 reads).
- `COMPOSITIONS-HERO` `[→]` after `{HERO-AUDACIOUS, PAGE-PRUNE}`.
- `PADDING-CANON` coordinates with `DIALOG-GLASS` on `DialogContent.vue` (padding ladder vs transparency — disjoint legs, no cycle).
- **`⇒ Band 4 studios`**: `PAGE-CHASSIS` → `BC.W-VIZ-CONFIGURATOR-SUITE` (the shrinks-on-scroll + subpath + ONE-card idiom every viz studio obeys).
- **`⇒ Band 9`**: the whole Band-5 set → `BC.W-STORYBOOK-META`.
- **`⇒ Band 11`**: the page cascade settles → `BC.W-CSS-CRITICAL` (re-measures the partition over the settled draw) + `BC.W-LIGHTHOUSE`.

### Band 6 — Controls (4 waves)
```
BC.W-RADIO-FIX  (FIRST — a binding bug; after Band 1 glass)
   ├──→ BC.W-DROPDOWN-FIX   (shares the picker live-verify session; after RADIO-FIX; [‖] otherwise)
   └──→ BC.W-CONTROL-SMOOTH (owns the CLOCK across controls; after RADIO-FIX; coordinates SPRING-EASE + AFFORDANCE-MAP)
BC.W-CONFIG-RIGHT  (after {RADIO-FIX, DROPDOWN-FIX, CONTROL-SMOOTH} — the controls inside the aside must work first)
```
- `RADIO-FIX` is FIRST `[→]` after Band 1. `DROPDOWN-FIX` + `CONTROL-SMOOTH` `[‖]` after RADIO-FIX.
- `CONTROL-SMOOTH` reads `SPRING-EASE` (the re-timed register) + `AFFORDANCE-MAP` (the affordance contract) — a cross-band consume (§3).
- `CONFIG-RIGHT` `[→]` after all three Band-6 controls (+ reads BLACK-BAR rim + PAGE-CHASSIS studio header).
- **`⇒ Band 4 studios`**: `CONFIG-RIGHT` → `BC.W-VIZ-CONFIGURATOR-SUITE` (CONFORMS-TO — verified-after, not a back-build).

### Band 7 — Motion canon + interaction affordances (4 waves)
```
BC.W-MOTION-ONE-CLOCK  (FIRST — the one-clock SOURCE audit over the whole repo)
   ├──→ BC.W-SPRING-EASE     (re-tunes SPRING_PRESETS; mints the iOS press register — TOKEN-ONLY)
   │       └──→ BC.W-AFFORDANCE-MAP  (rides the eased springs + the press register)
   └──→ BC.W-TUNABLE-ANIM    (LAST — indexes the one-clock; exposes the eased curves + affordances)
```
- `MOTION-ONE-CLOCK` is FIRST `[→]` (reads the Band-2 dock engine + Band-3 liquid-tab as canonical consumers, but does NOT block on them — it is a SOURCE audit). **Do NOT promote `MOTION-ONE-CLOCK` to a hard dock predecessor** (it audits the dock engine, does not gate it): once the `SPRING-EASE → DOCK-ENGINE` edge is honored (R2), a `MOTION-ONE-CLOCK ← DOCK-ENGINE` build edge would close a cycle (`MOTION-ONE-CLOCK → SPRING-EASE → DOCK-ENGINE → MOTION-ONE-CLOCK`). The SOURCE-audit framing is the hinge that keeps Band-7↔Band-2/3 acyclic — MOTION-ONE-CLOCK reads its consumers as evidence, it never waits on them.
- `SPRING-EASE` `[→]` after MOTION-ONE-CLOCK; its `snappy`/`press` mint is READ by Band-1/2/3/6 consumers (§3) — but it depends on NONE of them (consume-after-mint).
- `AFFORDANCE-MAP` `[→]` after `{SPRING-EASE, MOTION-ONE-CLOCK}`; feeds `CONTROL-SMOOTH` (Band 6).
- `TUNABLE-ANIM` is LAST `[→]` after `{MOTION-ONE-CLOCK, SPRING-EASE, AFFORDANCE-MAP}`; feeds VIZ-CONFIGURATOR-SUITE + STORYBOOK-META.
- **`⇒ Band 6`**: `SPRING-EASE` + `AFFORDANCE-MAP` → `BC.W-CONTROL-SMOOTH`.
- **`⇒ Band 4`**: `MOTION-ONE-CLOCK` → `BC.W-VIZ-CHOREOGRAPHY` (the viz-layer one-clock instance).
- **`⇒ Band 1/3`**: `SPRING-EASE` press/snappy mint → BUTTON-GLASS-IOS / LIQUID-TAB / UNDERLINE-TUNE (§3 consume-after-mint).

### Band 8 — Safari (1 wave — but its EXECUTION is hoisted to the Band-4 head)
```
BC.W-SAFARI-WEBGL  (after Band 0 PAINT-GATE + BC.W-WEBGPU-EVERYWHERE; pairs with LIQUID-MORPH)
```
- Depends on `BC.W-PAINT-GATE` (the on-host real-paint harness it extends to a WebKit project), `BC.W-WEBGPU-EVERYWHERE` (the picker async-probe), and `BC.W-LIQUID-MORPH` (the Chromium-proven morph stability it proves on WebKit).
- **The hoist**: every Band-4 per-viz wave GATES its Safari-π no-flash arm on this breaker landing, so it executes WITH `BC.W-WEBGPU-EVERYWHERE` at the head of Band 4, not at its nominal Band-8 slot. Its three prerequisites all land by the Band-4 head (PAINT-GATE = Band 0; WEBGPU-EVERYWHERE = Band-4 head; LIQUID-MORPH = Band 2 — all before the per-viz fan-out).
- **`⇒ Band 4 per-viz`**: `BC.W-SAFARI-WEBGL` → every per-viz wave's Safari-π no-flash arm.

### Band 9 — Storybook meta-design (1 wave)
```
BC.W-STORYBOOK-META  (after the whole Band-5 page set + Band 1 + Band 6; built on Band-0 PAINT-GATE/GESTALT-FIRST)
```
- Depends on the FULL Band-5 set (the per-page waves) + Band 1 (glass) + Band 6 (controls) + TUNABLE-ANIM (the `/motion` storybook). The whole-storybook synthesis pass.
- **`⇒ the CUT`**: `STORYBOOK-META` → `BC.W-CUT` (the storybook is the shipping proof surface; its frontend-design quality is a binding close acceptance).

### Band 10 — Cross-repo + close (6 waves)
```
BC.W-DIST-COMMENT-FIX  (EARLY — CONFIRM-and-harden; no visual-rebuild dep; runs ‖ all Band-10)
BC.W-DECK  (BUILD-phase; after Band 0 + Band-2 dock + Band-3 PagerDots; BEFORE the cut + speedtest-adopt)
                                              │
BC.W-CUT  (TERMINAL; after ALL bands + DECK + FOLD-LEDGER + DIST-COMMENT-FIX; user-gated)
   ├──→ BC.W-SPEEDTEST-ADOPT  ─┐
   ├──→ BC.W-FOURIER-ASK      ─┼─ EXECUTION-phase adopt sweep, ALL [‖] (sibling-disjoint trees);
   └──→ BC.W-ATLAS-ASK        ─┘   after the cut publishes 4.x; the slides redeploy is LAST (in CUT)
```
- `DIST-COMMENT-FIX` is EARLY `[‖]` (a build-integrity confirm; can fold into Band 0).
- `DECK` is the ONE band-10 wave that authors `src/` — BUILD-phase `[→]` after `{Band 0, Band-2 dock, Band-3 PagerDots}`; BEFORE the cut + speedtest-adopt (both blocked on the unbuilt deck).
- `CUT` is TERMINAL `[→]` after EVERY band + `{DECK, FOLD-LEDGER, DIST-COMMENT-FIX}` + every band's `proof:ba-gestalt` GREEN; user-gated.
- The three sibling adopts `[‖]` after the CUT (`SPEEDTEST-ADOPT`, `FOURIER-ASK`, `ATLAS-ASK` — sibling-disjoint trees; the foreign-tree fence inv-26 binding); `FOURIER-ASK` additionally `[→]` after `BC.W-VIZ-FOURIER` + `BC.W-VIZ-AURORA`.
- `ATLAS-ASK` + `SPEEDTEST-ADOPT` depend on Bands 1-4 (the wide surface the siblings consume is visually-repaired before they migrate).

### Band 11 — PERFORMANCE (3 waves) — sequences LAST among build bands
```
BC.W-CSS-CRITICAL  (FIRST of Band 11; after the visual bands settle the cascade — Bands 1-7 + 9)
   └──→ BC.W-LIGHTHOUSE  (after CSS-CRITICAL + PERF-PRODUCER + the visual bands; the never-run live score)
BC.W-PERF-PRODUCER  (after Band-2 dock + Band-4 aurora/blob rebuilds; file-disjoint from CSS-CRITICAL)
   └──→ BC.W-LIGHTHOUSE
```
- `CSS-CRITICAL` is FIRST `[→]` after the visual bands stop churning `index.css` (the partition boundary re-measured over the SETTLED draw).
- `PERF-PRODUCER` `[→]` after `{Band-2 dock (DOCK-ENGINE/LIQUID-MORPH), Band-4 aurora/blob (VIZ-AURORA/GOOBLOB-PLAIN)}`; `[‖]` with CSS-CRITICAL (file-disjoint: the `/styles` carve vs per-frame runtime cost).
- `LIGHTHOUSE` is LAST `[→]` after `{CSS-CRITICAL, PERF-PRODUCER, the visual bands}` — the score measured on the SETTLED rebuilt floor.
- **`⇒ the CUT`**: `LIGHTHOUSE` (+ `CSS-CRITICAL` + `PERF-PRODUCER`) → `BC.W-CUT` (the cut runs `proof:lighthouse`).

---

## 3 — The cross-band reconcile edges (the consume-after-mint + conformance relations, in full)

These are the Sequence edges that run OPPOSITE the band-number spine. Each is shown ACYCLIC. They are
the executor's "watch these — the data flows backward across the band wall, but the build order does
not cycle" list.

### R1 — `BC.W-SPRING-EASE` (B7) is READ by Band 1/3 spring consumers (consume-after-mint)
- **Edge**: `SPRING-EASE → {BUTTON-GLASS-IOS (B1), LIQUID-TAB (B3), UNDERLINE-TUNE (B3)}`.
- **The data**: SPRING-EASE re-tunes the `snappy` curve (fills its clock) + MINTS the `press` SPRING_PRESETS row (response 0.15 / ζ 0.86, the iOS interactive register). `BUTTON-GLASS-IOS` reads the `press` register; `LIQUID-TAB`'s fling reads the eased `snappy`; `UNDERLINE-TUNE`'s indicator reads the eased `snappy`.
- **Why acyclic**: SPRING-EASE is a **TOKEN-ONLY** wave — "NO consumer edit; the consumers READ the eased tokens by name; this wave LANDS it under them." It depends on `MOTION-ONE-CLOCK` (Band 7) ONLY, never on a consumer. So the edge is one-directional INTO the consumers.
- **The executor resolution**: SPRING-EASE's mint can land EARLY (it touches only `springPresets.ts` + `regen-spring-tokens.mjs` + `useSpringPress.ts` defaults). The Band-1/3 consumers build their geometry/material legs on the band-spine schedule; their **spring-reading π ARM** (e.g. `button-glass.spec.ts` BG-IOS-3 "press composes the iOS interactive spring response ~0.15"; `liquid-tab.spec.ts` "the fling reads liquid"; `underline-tune.spec.ts` "the glide fills the clock") is the only leg that requires the mint landed first. So: either pull SPRING-EASE's mint to the front of the build (token-only, cheap), OR verify the spring-reading π arms after SPRING-EASE lands. The wave specs name the BOOK explicitly ("if BC.W-SPRING-EASE has not minted the press preset, this wave books it there and consumes; never a button-local spring").
- **`UNDERLINE-TUNE` ↔ `SPRING-EASE` are LOCKSTEP** (co-equal): UNDERLINE-TUNE OWNS the indicator-clock half of the `snappy` re-derive; SPRING-EASE owns it globally. They "land together" — ONE source (`SPRING_PRESETS` + `regen-spring-tokens.mjs`), no duplicate prescription. This is a co-mint, not a cycle.

### R2 — `BC.W-SPRING-EASE` (B7) is READ by `BC.W-DOCK-ENGINE` (B2) (consume-after-mint)
- **Edge**: `SPRING-EASE → DOCK-ENGINE`. The edge EXISTS (one-directional, acyclic — the SAME R1/R5 treatment), it is NOT ∅. The binding source settles it: SPRING-EASE's `**Sequence:**` line names DOCK-ENGINE among "the consumers that READ the eased curves … `BC.W-DOCK-ENGINE` (Band 2 — the morph reads the eased `dock` register)," and DOCK-ENGINE's body confirms the CONSUME (it READS the `--spring-dock`/`--spring-dock-duration` tokens, never re-emits them — the registry-owner ↔ consumer split).
- **The data**: SPRING-EASE OWNS the `SPRING_PRESETS.dock` row + the generated `--spring-dock`/`--spring-dock-duration` tokens (its emitted artifact). `dock` is a recorded KEEP — the emitted `--spring-dock` string is byte-FROZEN (SPRING-EASE's S4 content-hash; value.js/kf-fenced). DOCK-ENGINE READS those tokens; it does NOT regenerate the `linear()` (its gestalt fix unifies the dock morph CSS legs onto the JS-driven `--dock-morph-t`/`--dock-expand-t` scalar).
- **Why acyclic**: SPRING-EASE depends on `MOTION-ONE-CLOCK` (Band 7) ONLY, never on a dock wave → the edge is one-directional INTO DOCK-ENGINE. The §4 topo already honors it (DOCK-ENGINE Tier 8, after SPRING-EASE Tier 7′).
- **The clarifying note (the "frozen curve" argument, kept correct)**: because the `dock` row is byte-frozen, DOCK-ENGINE need not WAIT on a curve *change* (there is no change to wait on — no conflicting curve prescription). But DOCK-ENGINE STILL READS the token, so the build/verify edge stands (a consumer of a frozen token is still a consumer). The earlier "resolves to ∅ / NO edge at all" framing is RETIRED — it conflated "no curve change" with "no edge," and contradicted both binding Sequence lines. The frozen-curve fact narrows the edge to a CONSUME-and-verify, it does not delete it.
- **Do NOT confuse the two scalars.** DOCK-ENGINE's E2 envelope-fill asserts the JS `--dock-morph-t` scalar's sampled envelope (which the `DOCK_SPRING` `SpringProgress` glides) — it does NOT parse `--spring-dock`'s emitted `linear()` stops (frozen byte-unchanged by SPRING-EASE; no collision with its S4). The edge is the token READ + the duration-clock consume, not a curve re-bake.

### R3 — `BC.W-VIZ-CONFIGURATOR-SUITE` (B4) CONFORMS-TO `BC.W-CONFIG-RIGHT` (B6)
- **Edge**: `CONFIG-RIGHT → VIZ-CONFIGURATOR-SUITE` (the suite conforms the viz studios onto the standardized layout).
- **Why acyclic**: CONFORMANCE, verified-after, not a build gate. `<Configurator asideSide='right'>` already defaults right at HEAD, so a viz studio is a first exemplar on the existing default while CONFIG-RIGHT standardizes the LIBRARY component. CONFIG-RIGHT depends on the Band-6 controls (RADIO/DROPDOWN/CONTROL-SMOOTH), never on a viz wave → one-directional.
- **The executor resolution**: the per-viz studios author their configurator on the existing right-default; after CONFIG-RIGHT lands the standardized two-column library layout, VIZ-CONFIGURATOR-SUITE's gate verifies every viz studio hosts it (a conformance check, not a re-author).

### R4 — `BC.W-SAFARI-WEBGL` (B8) hoisted to the Band-4 head
- **Edge**: `SAFARI-WEBGL → every Band-4 per-viz wave` (the Safari-π no-flash arm gates on the breaker).
- **Why acyclic + the hoist**: SAFARI-WEBGL depends only on `{PAINT-GATE (B0), WEBGPU-EVERYWHERE (B4-head), LIQUID-MORPH (B2)}` — all of which land before the per-viz fan-out. So pulling its EXECUTION forward to the Band-4 head (beside WEBGPU-EVERYWHERE) satisfies the per-viz gate without any back-build. Band 8 stays the wave's nominal home; its build is hoisted.

### R5 — `BC.W-CONTROL-SMOOTH` (B6) reads `BC.W-SPRING-EASE` + `BC.W-AFFORDANCE-MAP` (B7)
- **Edge**: `{SPRING-EASE, AFFORDANCE-MAP} → CONTROL-SMOOTH`.
- **Why acyclic**: CONTROL-SMOOTH reads the re-timed spring register + the affordance contract; it does NOT re-author springs (the one-clock fence). SPRING-EASE + AFFORDANCE-MAP depend on MOTION-ONE-CLOCK, never on CONTROL-SMOOTH → one-directional. Same consume-after-mint pattern as R1: the Band-7 motion canon can land its tokens/contract before the Band-6 CONTROL-SMOOTH verifies against them.

### R6 — `BC.W-VISUAL-RECONCILE` (B4) reads the Band-1 glass set + `BC.W-SPRING-EASE`
- **Edge**: `{GLASS-IDENTITY, ADAPTIVE-RECONCILE, BLACK-BAR, GLASS-PRUNE, GLASS-LEGIBILITY-MEASURED, GESTALT-FIRST} → VISUAL-RECONCILE`; its press half coordinates with `SPRING-EASE`/`MOTION-ONE-CLOCK` (does NOT re-tune a spring).
- **Why acyclic**: VISUAL-RECONCILE is a pure CONSUMER (the BB-band re-walk over the fixed floor) — it re-authors nothing, depends on the Band-1 set + the harness, and is depended on by NOTHING upstream → a pure sink in its sub-DAG.

---

## 4 — The topological sort (proven ACYCLIC; 70 waves in a valid build order)

A valid topo order exists ⟺ the graph is a DAG. The order below is a CONCRETE valid linearization
(respecting every Sequence edge incl. the §3 cross-band reconciles); the existence of this complete
linearization with NO wave appearing before a predecessor is the constructive proof of acyclicity.

**Tier 0 (no predecessors / Band F):** `BC.W-PM-BB`, `BC.W-PM-BA`, `BC.W-PM-AZ`
**Tier 1:** `BC.W-PM-SYNTHESIS`
**Tier 2 (Band 0):** `BC.W-GESTALT-FIRST`, `BC.W-PAINT-GATE`, `BC.W-FOLD-LEDGER` · (`BC.W-DIST-COMMENT-FIX` may fold here)
**Tier 3 (Band 1 root):** `BC.W-BLACK-BAR`
**Tier 4:** `BC.W-GLASS-IDENTITY`
**Tier 5:** `BC.W-ADAPTIVE-RECONCILE`
**Tier 6 (Band 1 fan-out):** `BC.W-GLASS-PRUNE`, `BC.W-GLASS-LEGIBILITY-MEASURED`
**Tier 7 (Band 1 specimens):** `BC.W-DIALOG-GLASS`, `BC.W-BUTTON-GLASS-IOS`†
**Tier 7′ (Band 7 motion canon — lands here so its tokens precede the spring-reading π of Bands 1/3/6):** `BC.W-MOTION-ONE-CLOCK` → `BC.W-SPRING-EASE`‡ → `BC.W-AFFORDANCE-MAP` → `BC.W-TUNABLE-ANIM`
**Tier 8 (Band 2 root):** `BC.W-DOCK-ENGINE`
**Tier 9 (Band 2 fan-out):** `BC.W-DOCK-ARBITRARY`, `BC.W-DOCK-VERTICAL-FIX`, `BC.W-DOCK-SHRINK-BLUR`
**Tier 10:** `BC.W-LIQUID-MORPH`, `BC.W-DOCK-COLLAPSED-BOTH`
**Tier 11:** `BC.W-DOCK-STACK-RAIL`
**Tier 12 (Band 3 root):** `BC.W-TABS-IOS`
**Tier 13 (Band 3 fan-out — read the eased snappy from Tier 7′):** `BC.W-LIQUID-TAB`, `BC.W-UNDERLINE-TUNE`
**Tier 14 (Band 4 substrate floor — SAFARI-WEBGL hoisted in):** `BC.W-WEBGPU-EVERYWHERE`, `BC.W-SAFARI-WEBGL`
**Tier 15 (Band 4 cross-cutting):** `BC.W-VIZ-INTERACTION`, `BC.W-VIZ-CHOREOGRAPHY`, `BC.W-TEAL-NAVY-PURGE`, `BC.W-VISUAL-RECONCILE`
**Tier 16 (Band 4 per-viz [‖]):** `BC.W-VIZ-AURORA`, `BC.W-GOOBLOB-PLAIN`, `BC.W-VIZ-DOTFLOW`, `BC.W-VIZ-CONCENTRIC`, `BC.W-VIZ-FOURIER`, `BC.W-VIZ-CONSTELLATION`, `BC.W-VIZ-WATERCOLOR`, `BC.W-VIZ-PAPERGRID`, `BC.W-VIZ-DOTMATRIX`
**Tier 17 (per-viz dependents):** `BC.W-GOOBLOB-MEATBALL` (after PLAIN), `BC.W-VIZ-HYBRID` (after MEATBALL + DOTMATRIX)
**Tier 20.5 (the page-leg dependent — pulled below Tier 20 so the slot honors its own annotation):** `BC.W-GRID-SIMPLE` — Tier 17 (recipe rhythm: the static `--grid-*` twin beside `BC.W-VIZ-PAPERGRID`) / Tier 20+ (page leg: its `**Sequence:**` is AFTER `BC.W-PAGE-CHASSIS`, so it lands here, after the Tier-20 chassis). The two legs are the recipe/page split §1/§4 already record; the wave linearizes at Tier 20.5 to respect the binding page-leg edge.
**Tier 18 (Band 6 controls):** `BC.W-RADIO-FIX` → `BC.W-DROPDOWN-FIX`, `BC.W-CONTROL-SMOOTH` → `BC.W-CONFIG-RIGHT`
**Tier 19 (Band 5 prune):** `BC.W-PAGE-PRUNE`
**Tier 20 (Band 5 chassis):** `BC.W-PAGE-CHASSIS`
**Tier 21 (Band 5 fan-out):** `BC.W-PAGE-HIERARCHY`, `BC.W-HERO-AUDACIOUS`, `BC.W-PADDING-CANON`
**Tier 22 (Band 5 content):** `BC.W-CODE-BLOCKS`, `BC.W-GHOST-DASHED`, `BC.W-SEPARATOR-FIX`, `BC.W-COMPOSITIONS-HERO`
**Tier 23 (Band 4 suite gate — conforms to CONFIG-RIGHT @ Tier 18, hosts PAGE-CHASSIS @ Tier 20):** `BC.W-VIZ-CONFIGURATOR-SUITE`
**Tier 24 (Band 9):** `BC.W-STORYBOOK-META`
**Tier 25 (Band 11 perf — measures the settled floor):** `BC.W-CSS-CRITICAL`, `BC.W-PERF-PRODUCER` → `BC.W-LIGHTHOUSE`
**Tier 26 (Band 10 deck BUILD):** `BC.W-DECK`
**Tier 27 (TERMINAL, user-gated):** `BC.W-CUT`
**Tier 28 (EXECUTION-phase adopt sweep, post-cut [‖]):** `BC.W-SPEEDTEST-ADOPT`, `BC.W-FOURIER-ASK`, `BC.W-ATLAS-ASK`

> † `BC.W-BUTTON-GLASS-IOS`'s glass-paint legs land at Tier 7; its press-spring π ARM verifies after
> `BC.W-SPRING-EASE` (Tier 7′) — the two can interleave (Tier 7′ is shown after Tier 7 only to keep
> the spring tokens minted before the consumers' spring-reading π runs; the BUTTON glass-paint does
> not block on it). The executor may equally land Tier 7′ BEFORE Tier 7 (it depends only on
> MOTION-ONE-CLOCK, which depends on nothing downstream) — the topo order admits both, which is itself
> a no-cycle witness.
>
> ‡ `BC.W-SPRING-EASE` is placed at Tier 7′ (between the Band-1 specimens and the Band-2 dock) so its
> `snappy`/`press` mint precedes the spring-reading π of LIQUID-TAB/UNDERLINE-TUNE (Tier 13) and
> CONTROL-SMOOTH (Tier 18). It depends ONLY on MOTION-ONE-CLOCK; it could float as early as Tier 7′
> or as late as just-before-Tier-13 — any placement after MOTION-ONE-CLOCK and before the
> spring-reading π is valid. This float-window with no lower bound from a consumer is the constructive
> proof that R1/R2/R5 introduce no cycle.

**ACYCLICITY VERDICT: the graph is a DAG (with the `SPRING-EASE → DOCK-ENGINE` edge EXPLICIT).** A
complete 70-wave linearization exists with every wave after all its predecessors (above). The six
cross-band reconciles (§3 R1-R6, now including the explicit `SPRING-EASE → DOCK-ENGINE` consume-after-mint
edge) are each one-directional (SPRING-EASE/MOTION-ONE-CLOCK depend on nothing downstream; SAFARI-WEBGL
depends only on the Band-4 head + Band-0/2; VIZ-CONFIGURATOR-SUITE→CONFIG-RIGHT is a conformance
verified-after; VISUAL-RECONCILE is a pure sink; SPRING-EASE → DOCK-ENGINE is a token CONSUME with
SPRING-EASE depending on no dock wave — DOCK-ENGINE Tier 8 already sits after SPRING-EASE Tier 7′). No
back-edge closes a loop (MOTION-ONE-CLOCK stays a SOURCE audit, never a hard dock predecessor — see §2
Band 7). **No cycle found — no gapsFound BLOCKER on the DAG axis.**

---

## 5 — Parallelizable-vs-serial annotation (the concurrency map)

The executor runs ≤3 agents concurrent (the rate-wall discipline). Per tier, the `[‖]` waves can build
in one batch; the `[→]` waves are serial-after their predecessor.

| tier / batch | waves that can build CONCURRENTLY `[‖]` | serial gate INTO the batch |
|---|---|---|
| Band F | `PM-BB`, `PM-BA`, `PM-AZ` (3) | none (start here) |
| Band F sink | `PM-SYNTHESIS` (1) | after all 3 PM wrappers |
| Band 0 | `GESTALT-FIRST`, `PAINT-GATE`, `FOLD-LEDGER` (3) + `DIST-COMMENT-FIX` (early, disjoint) | after PM-SYNTHESIS |
| Band 1 spine | `BLACK-BAR` → `GLASS-IDENTITY` → `ADAPTIVE-RECONCILE` (serial chain) | after Band 0 |
| Band 1 fan | `GLASS-PRUNE`, `GLASS-LEGIBILITY-MEASURED` (2 `[‖]`) | after ADAPTIVE-RECONCILE |
| Band 1 specimens | `DIALOG-GLASS`, `BUTTON-GLASS-IOS` (2 `[‖]`) | after GLASS-PRUNE |
| Band 7 motion | `MOTION-ONE-CLOCK` → `SPRING-EASE` → `AFFORDANCE-MAP` / `TUNABLE-ANIM` (chain; AFFORDANCE/TUNABLE `[‖]` after) | after the Band-2/3 consumers DECLARE (SOURCE audit); mint early |
| Band 2 fan | `DOCK-ARBITRARY`, `DOCK-VERTICAL-FIX`, `DOCK-SHRINK-BLUR` (3 `[‖]`) | after DOCK-ENGINE |
| Band 2 tail | `LIQUID-MORPH`, `DOCK-COLLAPSED-BOTH` (2 `[‖]`) → `DOCK-STACK-RAIL` | after the fan |
| Band 3 | `LIQUID-TAB`, `UNDERLINE-TUNE` (2 `[‖]`) | after TABS-IOS |
| Band 4 floor | `WEBGPU-EVERYWHERE`, `SAFARI-WEBGL` (2 `[‖]` — SAFARI hoisted) | after Band-0 PAINT-GATE + Band-2 LIQUID-MORPH |
| Band 4 cross-cut | `VIZ-INTERACTION`, `VIZ-CHOREOGRAPHY`, `TEAL-NAVY-PURGE`, `VISUAL-RECONCILE` (4 `[‖]`) | after the floor |
| Band 4 per-viz | the 9-wave `[‖]` set (AURORA/DOTFLOW/CONCENTRIC/FOURIER/CONSTELLATION/WATERCOLOR/PAPERGRID/DOTMATRIX/GOOBLOB-PLAIN) — **the widest concurrency band; run in batches of 3** | after the floor + cross-cut |
| Band 4 per-viz tail | `GOOBLOB-MEATBALL` (after PLAIN), `VIZ-HYBRID` (after MEATBALL+DOTMATRIX), `GRID-SIMPLE` (after PAPERGRID+PAGE-CHASSIS) | serial after their parents |
| Band 6 | `RADIO-FIX` → {`DROPDOWN-FIX`, `CONTROL-SMOOTH`} `[‖]` → `CONFIG-RIGHT` | after Band 1 |
| Band 5 | `PAGE-PRUNE` → `PAGE-CHASSIS` → {`PAGE-HIERARCHY`, `HERO-AUDACIOUS`, `PADDING-CANON`} `[‖]` → {`CODE-BLOCKS`, `GHOST-DASHED`, `SEPARATOR-FIX`, `COMPOSITIONS-HERO`} `[‖]` | after Band 1 + Band-4 bg recipes |
| Band 4 suite | `VIZ-CONFIGURATOR-SUITE` (1) | after every per-viz + PAGE-CHASSIS + CONFIG-RIGHT |
| Band 9 | `STORYBOOK-META` (1) | after Band 5 + Band 1 + Band 6 |
| Band 11 | {`CSS-CRITICAL`, `PERF-PRODUCER`} `[‖]` → `LIGHTHOUSE` | after the visual bands settle |
| Band 10 deck | `DECK` (1) | after Band 0 + Band-2 dock + Band-3 pager |
| CUT | `CUT` (1) | TERMINAL — after ALL bands; user-gated |
| adopt sweep | `SPEEDTEST-ADOPT`, `FOURIER-ASK`, `ATLAS-ASK` (3 `[‖]`) | EXECUTION-phase after CUT |

**The widest concurrency window is the Band-4 per-viz fan (9 waves `[‖]`)** — run in 3 batches of 3
(the rate-wall floor). The deepest serial chain is Band F→0→1-spine→2→3 then the viz floor; the
critical path runs roughly `PM-BB → PM-SYNTHESIS → PAINT-GATE → BLACK-BAR → GLASS-IDENTITY →
ADAPTIVE-RECONCILE → DOCK-ENGINE → LIQUID-MORPH → WEBGPU-EVERYWHERE → {per-viz} → VIZ-CONFIGURATOR-SUITE
→ STORYBOOK-META → LIGHTHOUSE → CUT` (the longest dependency chain — ~14 serial hops).

---

## 6 — The PER-BAND GATE BATTERY (the proof:* + π each band passes before the next opens)

Each band closes when EVERY wave's `proof:*` gate is GREEN AND its `tests-visual/*.spec.ts` π reads
PAINT on a real GPU device (`node scripts/gates.mjs --run pi`) AND the band's `proof:ba-gestalt`
surface verdicts are GREEN on a FRESH capture. Per-band gate sets read off each wave's acceptance:

### Band F — Forensics
- **Gates**: `proof:bc-fold-ledger` (the PM matrix feeds it) + the PM-wrapper forensic gates re-run as evidence-of-record: `proof:ba-gestalt` (the paint-blind-gate forensic), `proof:adaptive-glass`/`proof:adaptive-glass-live`/`proof:flow-field`/`proof:aurora-swraster` (the BB/BA/AZ paint-broken witnesses re-run RED-on-the-broken-floor as the forensic anchor), `proof:dock-sections`/`proof:rail3`/`proof:register-ios` (the AZ divergence witnesses).
- **π**: `tests-visual/adaptive-glass-live.spec.ts` (the AZ grey-glass origin capture, the forensic ground).
- **Exit criterion**: the 29-class taxonomy → the Band-0 gate-redesign requirements recorded; no build paint.

### Band 0 — Verification transposition (THE FLOOR)
- **Gates**: `proof:ba-gestalt` (re-authored: pixel-read + ci-blocking + auto-revoke + no-terminal-reflect), `proof:live-verified-ledger`, `proof:visual-runner` (`BC.W-GESTALT-FIRST`); `proof:adaptive-glass`/`proof:adaptive-glass-live`/`proof:adaptive-observer`/`proof:aurora-swraster`/`proof:flow-field`/`proof:gpu-substrate-single`/`proof:lighthouse`/`proof:observer-loop`/`proof:substrate-paints-color` (`BC.W-PAINT-GATE` — the paint-arm machinery every Band-1-4 gate consumes); `proof:bc-fold-ledger`/`proof:crossrepo-asks`/`proof:disposition-live` (`BC.W-FOLD-LEDGER`).
- **π**: `tests-visual/adaptive-glass-live.spec.ts` (the harness's own self-proof — it reads PAINT).
- **Exit criterion (LOAD-BEARING)**: `proof:ba-gestalt` is now `["local","ci","release"]`-tagged + measures PAINT not source; `node scripts/gates.mjs --run pi` GREEN on a real GPU device is the binding close-paint for every subsequent visual wave. **No Band 1-9 visual wave opens until this exits.**

### Band 1 — Glass identity
- **Gates**: `proof:black-bar` (`BLACK-BAR`); `proof:glass-identity` + `proof:adaptive-glass-live` (`GLASS-IDENTITY`); `proof:adaptive-observer` + `proof:adaptive-reconcile` (`ADAPTIVE-RECONCILE`); `proof:adaptive-glass-live` + `proof:glass-legibility` (`GLASS-LEGIBILITY-MEASURED`); `proof:glass-prune` + `proof:glass-panel-tiers` + `proof:glass-cal` + `proof:no-dual-path` + `proof:lineage-probe` + `proof:claude-structure-sync` + `proof:fading-scroll` + `proof:subpath-enumeration` (`GLASS-PRUNE`); `proof:dialog-glass` (`DIALOG-GLASS`); `proof:button-glass` + `proof:glass-cal` + `proof:glass-card-tiers` + `proof:glass-cohesion` (`BUTTON-GLASS-IOS`).
- **π**: `black-bar`, `glass-identity`, `glass-legibility`, `glass-prune`, `dialog-glass`, `button-glass` (each `.spec.ts`).
- **Exit criterion**: the warm-cream translucent base reads at root (grey-slab GONE), the rim is a catch-light (oklab-L > 0.8 on the top edge), the AA bar holds over the composited plate; `proof:ba-gestalt` glass-band verdicts GREEN. **GATES Band 2/3/4/5** (they all read the fixed glass).

### Band 2 — Dock
- **Gates**: `proof:dock-engine` + `proof:no-layout-animation` + `proof:spring-tokens-synced` (`DOCK-ENGINE`); `proof:dock-arbitrary` + `proof:no-layout-animation` (`DOCK-ARBITRARY`); `proof:dock-vertical-clickable` (`DOCK-VERTICAL-FIX`); `proof:dock-collapsed-both` (`COLLAPSED-BOTH`); `proof:dock-stack-rail` + `proof:no-layout-animation` (`DOCK-STACK-RAIL`); `proof:dock-shrink-blur` (`SHRINK-BLUR`); `proof:liquid-morph` + `proof:no-layout-animation` (`LIQUID-MORPH`).
- **π**: `dock-engine`, `dock-arbitrary`, `dock-vertical-clickable`, `dock-collapsed-both`, `dock-stack-rail`, `dock-shrink-blur`, `liquid-morph`.
- **Exit criterion**: the morph reads buttery (the JS scalar's sampled envelope ≥0.40 by clock midpoint, no ~16% plateau), the vertical dock is CLICKABLE, the morph is NEVER white/invisible, the rail is to-spec; `proof:no-layout-animation` GREEN (compositor-only, no resting will-change); `proof:ba-gestalt` dock verdict GREEN. **GATES `SAFARI-WEBGL` + `DECK` + `PERF-PRODUCER`.**

### Band 3 — Tabs + underline
- **Gates**: `proof:tabs-ios` (`TABS-IOS`); `proof:liquid-tab` + `proof:no-layout-animation` (`LIQUID-TAB`); `proof:underline-tune` + `proof:animation-coherence` + `proof:spring-tokens-synced` (`UNDERLINE-TUNE`).
- **π**: `tabs-ios`, `liquid-tab`, `underline-tune`.
- **Exit criterion**: the pills are small stadium glass (not squared, not reka-flat), the liquid-tab pull morphs+squishes+flings, the underline glide fills its clock (eased, not abrupt); `proof:ba-gestalt` navigation verdict GREEN. **GATES `DECK` (the pager).**

### Band 4 — Procedural viz
- **Substrate-floor gates (land FIRST)**: `proof:gpu-substrate-single` + `proof:webgpu-everywhere` (`WEBGPU-EVERYWHERE`); `proof:safari-webgl` + `proof:visual-runner` (`SAFARI-WEBGL`).
- **Cross-cutting gates**: `proof:pointer-velocity` + `proof:viz-interaction` + `proof:no-layout-animation` + `proof:offscreen-pause` (`VIZ-INTERACTION`); `proof:viz-choreography` + `proof:offscreen-pause` (`VIZ-CHOREOGRAPHY`); `proof:teal-navy-purge` (`TEAL-NAVY-PURGE`); `proof:visual-reconcile` + `proof:liquid-reveal` + `proof:lensing` + `proof:press-unify` + `proof:button-glass` + `proof:ba-gestalt` (`VISUAL-RECONCILE`).
- **Per-viz gates** (each + `proof:gpu-substrate-single` + `proof:offscreen-pause` + `proof:no-layout-animation`): `proof:viz-aurora` + `proof:aurora-atoms-roundtrip` + `proof:single-color-core` (AURORA); `proof:gooblob-plain` + `proof:flow-field` (PLAIN); `proof:gooblob-meatball` + `proof:ba-gestalt` (MEATBALL); `proof:flow-field` (DOTFLOW); `proof:concentric` (CONCENTRIC); `proof:fourier-field` (FOURIER); `proof:constellation-gpu` + `proof:constellation-substrate-single` + `proof:webgl-substrate-single` (CONSTELLATION); `proof:emission` (WATERCOLOR); `proof:paper-grid` + `proof:flow-field` + `proof:colocation` + `proof:claude-structure-sync` + `proof:subpath-enumeration` (PAPERGRID); `proof:dot-matrix` + `proof:flow-field` (DOTMATRIX); `proof:goo-dot` (HYBRID); `proof:grid-simple` (GRID-SIMPLE); `proof:viz-configurator-suite` + `proof:ba-gestalt` (CONFIGURATOR-SUITE).
- **π**: `webgpu-everywhere`, `safari-webgl`, `viz-interaction`, `viz-choreography`, `teal-navy-purge` (+ `no-gray`), `viz-aurora`, `gooblob-plain`, `gooblob-meatball`, `flow-field`, `concentric`, `fourier-field`, `constellation`, `emission`, `paper-grid`, `dot-matrix`, `goo-dot`, `grid-simple`, `viz-configurator-suite`, `button-glass` (RECONCILE).
- **Exit criterion**: every viz PAINTS on WebGPU (WGSL primary) + degrades clean to WebGL2 + is Safari-stable (no flash), reacts to pointer velocity+accel, runs on ONE kf clock, ships a full configurator + comprehensive demo, no teal/navy literal; the per-viz Safari-π no-flash arm GREEN (gated on the breaker); `proof:ba-gestalt` aurora/dock/viz verdicts GREEN. **GATES `PERF-PRODUCER` + `FOURIER-ASK`.**

### Band 5 — Pages
- **Gates**: `proof:page-prune` + `proof:ba-gestalt` + `proof:claude-structure-sync` (`PAGE-PRUNE`); `proof:page-chassis` + `proof:no-layout-animation` (`PAGE-CHASSIS`); `proof:page-hierarchy` (`PAGE-HIERARCHY`); `proof:code-blocks` + `proof:hierarchy` + `proof:suffuse` (`CODE-BLOCKS`); `proof:hero-audacious` + `proof:icon-chip` + `proof:single-color-core` + `proof:suffuse` (`HERO-AUDACIOUS`); `proof:compositions-hero` (`COMPOSITIONS-HERO`); `proof:card-padding` (`PADDING-CANON`); `proof:ghost-dashed` + `proof:no-gray` (`GHOST-DASHED`); `proof:separator` + `proof:no-gray` (`SEPARATOR-FIX`).
- **π**: `page-chassis`, `page-hierarchy`, `code-blocks`, `hero-audacious`, `compositions-hero`, `card-padding`, `ghost-dashed`, `separator`.
- **Exit criterion**: every page reads the ONE standardized chassis (audacious hero + subpath + scroll-shrink + ONE card + procedural bg), the hierarchy is suffused, the φ padding paints, no "view source"/platitude/orphan-route survives; `proof:ba-gestalt` per-page verdicts GREEN. **GATES `STORYBOOK-META` + `CSS-CRITICAL`/`LIGHTHOUSE`.**

### Band 6 — Controls
- **Gates**: `proof:radio-fix` (`RADIO-FIX`); `proof:dropdown-fix` + `proof:menu-glass` (`DROPDOWN-FIX`); `proof:control-smooth` + `proof:animation-coherence` + `proof:no-layout-animation` (`CONTROL-SMOOTH`); `proof:config-right` + `proof:emission` (`CONFIG-RIGHT`). **Plus `proof:bc-fold-ledger` (the close oracle Band 6 gates on).**
- **π**: `radio-fix`, `dropdown-fix`, `control-smooth`, `config-right`.
- **Exit criterion**: radios toggle on every input path with a clear glass selected-state, the dropdown opens no-shift+aligned with the dot reading, controls respond quick (no lag) with rounded borders, every configurator is controls-on-the-RIGHT two-column on desktop.

### Band 7 — Motion canon
- **Gates**: `proof:motion-one-clock` + `proof:animation-coherence` + `proof:no-layout-animation` + `proof:offscreen-pause` + `proof:precept-current` (`MOTION-ONE-CLOCK`); `proof:spring-ease` + `proof:spring-tokens-synced` (`SPRING-EASE`); `proof:affordance-map` + `proof:glass-cohesion` + `proof:no-layout-animation` + `proof:precept-current` (`AFFORDANCE-MAP`); `proof:tunable-anim` + `proof:animation-coherence` (`TUNABLE-ANIM`).
- **π**: `motion-one-clock`, `spring-ease`, `affordance-map`, `tunable-anim`.
- **Exit criterion**: keyframes.js is the ONE source+clock (no ad-hoc setTimeout), every spring fills its clock (90%-travel in [0.55,0.70] not 0.16), the `press` register is minted (0.15/0.86) + wired, affordances are baked into every interactive element; `proof:spring-tokens-synced` GREEN (the `dock` row byte-frozen). **R1/R5 mints land here — read by Bands 1/3/6.**

### Band 8 — Safari (executed at the Band-4 head)
- **Gates**: `proof:safari-webgl` + `proof:visual-runner` (`SAFARI-WEBGL`).
- **π**: `safari-webgl` (the WebKit playwright project; the no-flash arm + the cross-engine morph-stable readback).
- **Exit criterion**: the Safari flash is KILLED (the `webglcontextlost` circuit-breaker), the liquid morph is stable on WebKit, the WebKit degrade-floor reads. **GATES every Band-4 per-viz Safari-π no-flash arm.**

### Band 9 — Storybook meta-design
- **Gates**: `proof:storybook-meta` + `proof:storybook-complete` + `proof:demo-design` + `proof:card-padding` + `proof:no-gray` + `proof:suffuse` + `proof:ba-gestalt` (`STORYBOOK-META`).
- **π**: `storybook-meta`.
- **Exit criterion**: the whole storybook reads as a frontend-design-grade artifact (padding/usability/spacing/occlusion/fontsize/idiom adherence), the cross-page residuals the per-page waves leave are caught; `proof:ba-gestalt` per-pane verdicts GREEN. **A binding CUT acceptance** (the storybook is the consumer's first read of glass-ui).

### Band 10 — Cross-repo + cut
- **DECK gates**: `proof:deck` + `proof:colocation` + `proof:subpath-enumeration` + `proof:vueuse-free-root` + `proof:resolution` + `proof:crossrepo-asks` + `proof:all` + `proof:ba-gestalt` (`DECK`).
- **DIST-COMMENT-FIX gates**: `proof:dist-css` + `proof:dist-css-balanced`.
- **CUT gates**: `proof:bc-cut` + `proof:bc-fold-ledger` + `proof:close-battery-parity` + `proof:full` (the deduped local∪ci∪release union, siblings-absent) + `proof:ba-gestalt` (every band's verdict GREEN on a fresh capture) + `proof:lighthouse` + `proof:single-color-core`.
- **adopt-sweep gates**: `proof:speedtest-adopt` + `proof:card-tier-alpha` + `proof:desktop-reserve` + `proof:crossrepo-asks` (SPEEDTEST); `proof:fourier-reconcile` + `proof:constellation-spine` + `proof:crossrepo-asks` + `proof:lineage-probe` (FOURIER); `proof:atlas-adopt` + `proof:crossrepo-asks` + `proof:lineage-probe` (ATLAS).
- **π**: `deck` (the DECK paint; the adopt waves are coordination — no in-repo π).
- **Exit criterion**: the `/deck` subpath ships+resolves, the dist-comment balance holds, the honest 4.x cut runs `--run full` siblings-absent → gated-provenance tag → the consumer adopt sweep → the slides redeploy LAST (user-gated). `proof:lineage-probe` GREEN THROUGHOUT (the d6 lesson).

### Band 11 — PERFORMANCE
- **Gates**: `proof:css-critical` + `proof:lighthouse` + `proof:resolution` (`CSS-CRITICAL`); `proof:lighthouse` + `proof:live-verified-ledger` + `proof:no-layout-animation` (`LIGHTHOUSE`); `proof:perf-producer` + `proof:gpu-substrate-single` + `proof:webgl-substrate-single` + `proof:offscreen-pause` + `proof:live-verified-ledger` + `proof:ba-gestalt` (`PERF-PRODUCER`).
- **π**: `css-critical`, `perf-producer`.
- **Exit criterion**: the `/styles` critical/deferred split holds over the SETTLED cascade (FOUC-safe), the never-run Lighthouse score RUNS + re-pins via `--rebaseline`, the four producer fixes survive the Band-2/4 rebuilds (dock contain/deferReposition, GooBlob one-canvas+dispose, aurora sub-2×-DPR cap, density glyph), the headed-GPU runtime π GREEN. **Measures the SETTLED floor — GATES the CUT's `proof:lighthouse`.**

### The GLOBAL gate set (the cross-band oracles that fire at EVERY band close + the cut)
- **`proof:ba-gestalt`** — THE gestalt OR (the `complete` vs `complete_with_misses` decision): per surface, FOUR content-real dimension-correct viewport-faithful captures in BOTH modes over a FRESH surface + a recorded gestalt VERDICT. Every VISUAL wave (Bands 1-9) closes against its surface verdict, not the per-mechanism π alone. Re-authored in `BC.W-GESTALT-FIRST` (pixel-read, ci-blocking, `["local","ci","release"]`). The cut demands EVERY band's verdict GREEN on a fresh capture.
- **`proof:bc-fold-ledger`** — the no-silent-drop floor (mints `FOLD-LEDGER.json` in `BC.W-FOLD-LEDGER`): every chronic / prior-tranche deferral folded + DECIDED; F2 decided-destination soundness (any disposition names a real wave-spec); F2.b band-string rejection. A CLOSE oracle (Band 6 + the cut gate on it).
- **`proof:visual-runner`** — the enrollment-soundness gate: every committed non-private `tests-visual/*.spec.ts` is enrolled-or-excluded-with-rationale + the `--run pi` runner is invokable. CI proves ENROLLMENT; the local `--run pi` GREEN on a real device proves the PAINT.
- **`proof:no-layout-animation`** — the compositor-only floor (extended in place): no `@keyframes`/`transition`/`<Transition>` animates a reflow-set property off the narrow named allowlist; the universal-PRM-carve. Fires across Bands 2/3/4/5/7/11.
- **`proof:gpu-substrate-single`** — the ONE-lifecycle-leaf floor (the WebGPU/WebGL2/Canvas2D backends all compose `createCanvasLifecycle`). Fires across every Band-4 viz.
- **`proof:offscreen-pause`** — the rAF-park-when-hidden floor. Fires across every Band-4 viz + the motion canon.
- **`proof:no-gray`** / **`proof:suffuse`** / **`proof:precept-current`** — the warm-chroma + one-color-event + precept-home oracles, fired by the page/control/storybook bands.

---

## 7 — The executor's one-screen summary

1. **Band F → Band 0 FIRST.** The gate-redesign (`PAINT-GATE` + `GESTALT-FIRST` + `FOLD-LEDGER`) is the
   load-bearing floor — NO visual wave opens until `proof:ba-gestalt` measures PAINT (not source) and
   `--run pi` reads PAINT on a real GPU device.
2. **Hoist `BC.W-SAFARI-WEBGL` to the Band-4 head** (beside `WEBGPU-EVERYWHERE`) — every per-viz
   Safari-π gates on it.
3. **Mint `BC.W-SPRING-EASE` early** (token-only, after `MOTION-ONE-CLOCK`) so the `snappy`/`press`
   curves precede the spring-reading π of `BUTTON-GLASS-IOS`/`LIQUID-TAB`/`UNDERLINE-TUNE`/`CONTROL-SMOOTH`
   — AND `DOCK-ENGINE`, which CONSUMES the `--spring-dock`/`--spring-dock-duration` tokens (R2: a real
   consume-after-mint edge, `SPRING-EASE → DOCK-ENGINE`). The `dock` row is byte-frozen, so DOCK-ENGINE
   need not wait on a curve CHANGE — but it reads the token, so the edge stands (DOCK-ENGINE Tier 8
   after SPRING-EASE Tier 7′). DOCK-ENGINE's morph-leg fix reads the JS `--dock-morph-t` scalar, not the
   frozen `linear()`.
4. **Run the Band-4 per-viz fan (9 waves `[‖]`) in 3 batches of 3** — the widest concurrency window.
5. **`CONFIG-RIGHT` before `VIZ-CONFIGURATOR-SUITE`** (conformance, verified-after — not a back-build).
6. **`PADDING-CANON` after the glass material; `PAGE-PRUNE` before `PAGE-CHASSIS`** (prune dead routes
   first); the viz studios host the chassis idiom after `PAGE-CHASSIS` lands.
7. **Band 11 perf LAST among build bands** — it measures the SETTLED floor; `LIGHTHOUSE` is the
   terminal verification of the never-run live score.
8. **`BC.W-CUT` is TERMINAL + user-gated** — `--run full` siblings-absent → gated-provenance tag →
   the post-cut adopt sweep (`SPEEDTEST-ADOPT`/`FOURIER-ASK`/`ATLAS-ASK` `[‖]`) → slides redeploy LAST.
9. **The DAG is ACYCLIC** (§4) — a complete 70-wave linearization exists; the six cross-band
   reconciles (§3 R1-R6, incl. the explicit `SPRING-EASE → DOCK-ENGINE` consume-after-mint) are each
   one-directional. No cycle, no BLOCKER on the DAG axis.

> Every wave-id in this document resolves on disk in `WAVE-INDEX.md` (the 70 canonical waves). The
> band membership matches `ORCHESTRATION.md §1`. The edges are read off each `waves/*.md`
> `**Sequence:**` line. The gate battery is read off each wave's acceptance (`proof:*` + π specs).
