# BG audit — P-be-bf-fold: the BE + BF wave-spec disposition ledger

> **Scope.** The forensic per-WAVE fold of the two planning-only tranches written after the BD
> greenfield: **BE** (38 wave specs + WAVE-LIST + 4-pass convergence, `prototype/liquid-dock`,
> 8 build commits) and **BF** (31 wave specs, the BE→BF "convergence" rework, the 32-row
> DEFERRED-CENSUS, `9a765843` plan-only). Verdict per wave: **LANDED** (the engine/gate shipped
> in the BD-union 4.2.0 cut and is now part of the live-broken slice) · **PARTIAL** (some
> sub-clauses landed, fidelity/integration owed) · **NEVER-BUILT** (spec-only) · **STALE** (the
> spec's own born-RED anchor is invalidated by what BD shipped) · **SUPERSEDED** (a harder BG
> directive overrides it).
>
> Verified against real HEAD (`master @ 998136bb` v4.2.0 + `prototype/liquid-dock`). Default-broken
> skepticism: every claim is grep/read-confirmed.
>
> **Sibling cross-refs (no duplication).** `P-chronic-deferred.md` already folds the BF 32-row
> census at the *deferred-item* granularity (D1..D32 → BG.W-DEFERRED-LEDGER / GESTALT-REPOINT /
> SPIKE-DELETE / JUBILANCE-DECIDE / DEAD-GATE-SWEEP / DISPOSITION-RESTAMP). `P-bd-coverage.md`
> folds the 39 BD greenfield items (→ ROUTE-TRANSITION-UNIFY / FIELD-AURORA / DOCK-MORPH-INPLACE /
> SHELL-DECONTRIVE / HERO-SCALE-RESPONSIVE / CHASSIS-GESTALT-VERIFY). **THIS audit is the missing
> WAVE-SPEC layer**: which of the ~69 developed BE/BF specs is already-shipped, half-shipped, or
> still-owed, so the *developed work is not lost AND not shadow-executed*. The disposition NAMES
> the BG destination for every wave; the build is the siblings'.

---

## THE HEADLINE FINDING (single highest-severity)

**The BD union SHIPPED ~60% of the BE dock-hallmark engines into 4.2.0 — including the
`release`-tagged gates that lock them — but BF's convergence specs (which would have WIRED + PAINTED
+ SAFARI-validated them) were never run, so the engines green their own gates while painting
nothing the user can reach.** Concretely at HEAD:

- `useDockFission.ts` (604L), `useDockContextSilhouette.ts` (551L), `useBloomUp.ts` (507L),
  `useCelebrationBurst.ts` (261L), `DockStack mode="facets"`, `fission-bridge.css` (31KB),
  `railProjection.ts`, the `surface="clear"`/`--glass-fill-tint`/`--glass-bg-sheet` foundation
  tokens, and the `<GooFilter>` mount are **all on disk** (the BE engines LANDED).
- The gates `proof:dock-fission`, `proof:bloom-up`, `proof:celebration-burst`,
  `proof:metaball-bridge2`, `proof:dock-context`, `proof:liquid-morph` are **registered in
  `gates.mjs` with rich notes** (verified `gates.mjs:209,218,227,233,269,1315,1677`) — and most
  carry `release`. They green over **zero real `src/` SFC consumers**: `useHaptic(` = 0 call-sites
  (`useHaptic.ts` ABSENT entirely), `useDockContextSilhouette` = 1 DEMO consumer
  (`AppSwitcher.vue`), the goo `url(#dock-fission-goo)` resolves to the `none` fallback in every
  shipped surface (the only writer is the demo-content `liquid-morph.css`).
- The undeleted spike is REAL on disk: `useLiquidMorph.ts` (20KB) + `liquid-morph.css` (36KB) BOTH
  in `src/` (my earlier path-typo missed them; re-verified present). The double-fork with the wired
  `useDockFission` is live.

**So the BE/BF fold is NOT "developed-but-unexecuted" — it is "half-executed-then-abandoned".** The
dangerous half is the gates: the close oracle certifies dead/demo-private mechanisms green, which is
exactly why the 356-gate `--run full` PASSED while the user sees a broken dock. The fold must
distinguish *landed-engine* (keep, wire, paint) from *landed-gate-over-dead-code* (downgrade/retire)
from *never-built-spec* (re-home to a BG wave or RETIRE).

---

## FINDINGS — the per-wave disposition (verified at HEAD)

### Group A — BE engines that LANDED in 4.2.0 (the dock hallmark; gates shipped, paint owed)

| BE wave | what shipped | HEAD evidence | gate at HEAD | verdict |
|---|---|---|---|---|
| **BE.W-DOCK-FISSION** | `useDockFission` orchestrator + `DOCK_SPLIT_SIGNATURES` + `registerPiece` | `useDockFission.ts` 604L; `--dock-split-t` live; `neckHold` now READ (`useDockFission.ts:128/142/156` — BD wired the dead field BF's D14 flagged) | `proof:dock-fission` registered `release` (`gates.mjs:209`) | **LANDED-broken** — engine real, demo-private; gate greens over `none`-resolving goo |
| **BE.W-METABALL-BRIDGE2** | `fission-bridge.css` N-seam neck + specular sweep | `fission-bridge.css` 31KB; `.dock-fission-piece::before` `inset:0` capsule (`:434-462`) — the body-anchored filament NEVER landed (BF.W-FISSION-FILAMENT's C1 still red) | `proof:metaball-bridge2` (`gates.mjs:233`) | **PARTIAL** — bridge CSS shipped, the neck-spans-gap fidelity owed |
| **BE.W-DOCK-CONTEXT-SILHOUETTE** | `useDockContextSilhouette` declarative descriptor engine | 551L; ONE demo consumer (`AppSwitcher.vue`), ZERO src SFC | `proof:dock-context` `release` (`gates.mjs:269`) | **LANDED-dead** — J-inv-10 violated, gate greens over 1-demo-consumer |
| **BE.W-DOCK-RAIL-REALIZE** | `DockStack mode="facets"` + `railProjection.ts` φ-tier helper | `DockStack.vue:116` `projectFacets(...,1)` HARDCODED; `facetTier()` returns scale/opacity only — `translate` DEAD (BF.W-RAIL-FIDELITY's D15 still red) | `proof:dock-rail-realize` (per BF) | **PARTIAL** — structure landed, φ-tier math dead, expanded carousel never painted |
| **BE.W-BLOOM-UP** | `useBloomUp` shared-element FLIP + 4th color channel | `useBloomUp.ts` 507L; consumed by `AppShell.vue` (the routing-freeze "find-first-non-skeleton-child" hack — `P-bd-coverage` finding #1) | `proof:bloom-up` `release` (`gates.mjs:1315`) | **LANDED-broken** — engine real but wired into the over-contrived route layer that freezes nav |
| **BE.W-GOO-SPLIT-PERF** | `fission-bridge.css` generalizes `morph-bridge` + the `<GooFilter>` mount | `goo-filter/GooFilter.vue` present; `--dock-fission-goo` defs referenced (`fission-bridge.css:111-113`) | (folded into proof:dock-fission) | **PARTIAL** — CSS+mount shipped, the real-Safari-Metal p50 budget NEVER captured |

**Disposition for Group A:** these are NOT re-invents (the spine is fit). They FOLD into the
sibling dock/route BG waves as the *wiring+paint* completion BF specced. The BF convergence specs
(`BF.W-DOCK-INTEGRATE`, `BF.W-FISSION-FILAMENT`, `BF.W-RAIL-FIDELITY`, `BF.W-SILHOUETTE-REALIZE`)
are the **HEAD-accurate fold targets** — they cite real line numbers verified above (unlike the BE
specs whose born-RED anchors say "`useDockFission` does NOT exist" — STALE, invalidated by the BD
ship). Re-home the BF spec BODIES into the BG dock band; do NOT re-run the BE specs.

### Group B — BE/BF glass+liquid material waves (foundation tokens LANDED, consumers owed)

| wave | what landed | HEAD evidence | verdict |
|---|---|---|---|
| **BE.W-CLEAR-VARIANT** | `surface="clear"` 4th union member + `.glass-clear` scrim | `useSurfaceAxis.ts:42` `"clear"` member; `material.css:316-363` scrim rule | **LANDED-dead** — `grep surface="clear"` = only `useSurfaceAxis.ts` (zero real binders) |
| **BE.W-TINTED-CHIP** | `--glass-fill-tint`/`--glass-fill-strength` plate-bg axis | `glass.css` registered; ~10 readers exist (`icon-chip.css`/`glass-atom.css`/`glass-chip.css`) — BD wired SOME | **PARTIAL** — token wired into icon-chip/atom but `<GlassChip :tone>` component NEVER built |
| **BE.W-SHEET-TRANSLUCENT** | `--glass-bg-sheet`/`--glass-opacity-sheet` | `glass.css` + `drawer.css` readers (2) | **PARTIAL** — composed, presence-only; the Sheet self-re-point assert owed |
| **BE.W-DEEP-CEILING** / **BD.W-DEEP-GLASS-20PX** | the 18-20px Apple deep-glass ceiling | `glass-deep.css:25-56` sits at budget-clearing 16px; the full 20px BOOKED (P-chronic Class 3) | **NEVER-BUILT** (the ceiling push); the 16px floor is the shipped default |
| **BE.W-LENS-SAFARI** | the REAL Safari refraction floor (`filter:url(#displace)` over a captured backdrop) | only `proof-lensing.mjs` (Chromium `backdrop-filter:url()`); NO `proof-lensing-safari` | **NEVER-BUILT** — the cardinal "Chrome AND Safari" law unmet |
| **BE.W-LENS-PRISM** / **BD.W-GLASS-LENS-CHROMA** | `--glass-edge-dispersion` chromatic rim wiring | `glass-fx.css:223` token exists; `glass-refract.css:85` RGB-split BOOKED | **NEVER-BUILT** (the rim wire) |
| **BE.W-SQUIRCLE-COVERAGE** / **BF.W-SQUIRCLE** | the cross-engine clip-path superellipse floor | `squircle.css` ships `corner-shape: superellipse` (Chromium-ONLY); the Safari clip-path path ABSENT | **PARTIAL** — Chromium PE shipped, Safari floor owed |
| **BE.W-CONCENTRIC-RADIUS** | `--radius-concentric(parent, inset)` register | not found in `src/styles/tokens/` | **NEVER-BUILT** |
| **BE.W-AMBIENT-TINT** | the OKLCh hue-histogram free-rider on `useGlassBackdropLuminance` | `useGlassBackdropLuminance.ts:448` writes `--glass-ambient-hue` but read by nothing shipped | **PARTIAL** — observer writes the hue, zero src reader (the spike `liquid-morph.css:34` is the only reader, demo-content) |

**Disposition for Group B:** the foundation TOKENS are the BD-shipped identity (keep, evolve in
`src/styles`). The owed work is the **consumer band** (`<GlassChip>`, `<GlassControl>`,
`<DockNowPlaying>`, the IconChip glass register) + the **Safari floors** (lens, squircle). These
are the BF.W-CONSUMER-BAND + BF.W-LENS-PRISM/SQUIRCLE + BF.W-SAFARI-CAPTURE bodies — fold into a BG
glass/Safari band. The DEEP-20px/LENS-CHROMA/CONCENTRIC are DEFER-with-trigger (perf-gated /
no-real-consumer) — carry by-name in the BG deferred ledger, do NOT build speculatively (J-inv-10).

### Group C — BE/BF jubilance + motion primitives (DEAD-on-arrival)

| wave | what landed | HEAD evidence | verdict |
|---|---|---|---|
| **BE.W-CELEBRATE-BURST** | `useCelebrationBurst` one-shot petal bloom | `useCelebrationBurst.ts` 261L; `proof:celebration-burst` `release` (`gates.mjs:227`) | **LANDED-dead** — `useCelebrationBurst(` real call-sites = 0; gate greens over the prose comment `jubilance.css:10` |
| **BE.W-HAPTIC-COUPLE** | `useHaptic` (navigator.vibrate) | `useHaptic.ts` **ABSENT entirely** | **NEVER-BUILT** — the spec, gate-note, and consumer-evidence are all phantom |
| **BE.W-DOCK-JUBILANCE** | fission ripple / merge-splash / magnetic-tendril | the ripple/splash live in `fission-bridge.css` B7 (per `proof:metaball-bridge2` note) | **PARTIAL** — the bridge pseudo-elements shipped, never fired by a real consumer |
| **BE.W-ANTICIPATE-FOLLOW** / **BE.W-ALIVE-IDLE** | anticipation pre-dip + breathing-pill idle | not found as shipped primitives | **NEVER-BUILT** (minors) |
| **D31** `useCelebrationBurst` vs `CompletionSeal` | two earned-moment primitives | both present (`CompletionSeal` shipped BC, `useCelebrationBurst` shipped BD) | **double-fork** — reconcile or record disjoint rationale |

**Disposition for Group C:** the dead jubilance is the **J-inv-10 + phantom-evidence class**
`P-chronic-deferred.md` already routes to **BG.W-JUBILANCE-DECIDE** (wire-to-≥2-or-retire,
BB.W-NDA-DECIDE discipline) + **BG.W-DEAD-GATE-SWEEP** (downgrade the `release` gates that green
over 0-consumer code). This audit CONFIRMS the verdict at the wave granularity: `useHaptic` is a
RETIRE candidate (never even built — its spec is pure aspiration); `useCelebrationBurst` reconciles
into `CompletionSeal` OR wires to the fission merge-splash + a completion; the tendril/anticipate/
idle minors are DEFER-with-trigger (re-enter when a real surface wants them).

### Group D — BE/BF aurora + tabs breadth (NEVER-BUILT)

| wave | HEAD evidence | verdict |
|---|---|---|
| **BE.W-AUR-SATIN** (`uMedium==8`) | `grep satin src/components/custom/aurora/` = 0 | **NEVER-BUILT** |
| **BE.W-AUR-PRISM** (`uMedium==9`) | zero | **NEVER-BUILT** |
| **BE.W-AUR-REACTIVE** (album-hue re-seed + `uShimmer` term) | `uShimmer` grep = 0 (BF.W-CONSUMER-BAND C6 confirms it was never minted) | **NEVER-BUILT** |
| **BE.W-TAB-IOS-CAPSULE** / **BF.W-TAB-IOS-CAPSULE** (DockTabBar + SegmentedTabs fold) | no `DockTabBar`; `SegmentedTabs.vue` shipped the BD capsule (`P-bd-coverage` Band B) | **PARTIAL** — segmented capsule landed, the dock-tab arm + fold NEVER-BUILT |
| **BE.W-ICONCHIP-GLASS** / **BE.W-GLASS-CONTROL** | `icon-chip.css` has NO `backdrop-filter` glass register; no `GlassControl.vue` | **NEVER-BUILT** |

**Disposition for Group D:** these are the genuine **iOS-27 breadth** the user asked for but that
never shipped. They are GL-fence-respecting additive registers (default byte-identical). They are
NOT live-defect-blocking — fold into a BG **breadth band** (aurora-album + tabs-capsule +
consumer-band) gated AFTER the live-defect waves, each born-RED with its own paint. Do not let the
breadth crowd out the linchpin route/dock fixes.

### Group E — BE/BF "betters" + Safari + perf (NEVER-BUILT, the twice-asked validation)

| wave | HEAD evidence | verdict |
|---|---|---|
| **BE.W-SAFARI-CAPTURE** / **BF.W-SAFARI-CAPTURE** | no `proof:safari-liquid`; webkit `testMatch` = BC set | **NEVER-BUILT** — R17 (asked 2×) unmet |
| **BE.W-VIZ-PARITY-METAL** / **BF.W-GOO-SPLIT-PERF** | no real-Metal capture run | **NEVER-BUILT** — DEFER-with-trigger (real Metal box) |
| **BE.W-DESHADCN-SWEEP** / **BF.W-DESHADCN-SWEEP** + **GATE** | only `proof:no-shadcn-default.mjs` (the OLD gate); no `proof:de-shadcn` | **NEVER-BUILT** — Band-9 CRITICAL unmet |
| **BF.W-LIQUID-GROW-ON-EVENT** / **W-SCROLL-FLUIDITY** / **W-ICON-PRESENCE** / **W-CORNER-AA** / **W-LAYER-IN-LIQUID** | the user feel-asks (R14/R11/R12/R8/R15) | **NEVER-BUILT** — these ARE CONTEXT.md live defects #3/#12 |

**Disposition for Group E:** these are the user's explicit feel-asks + the binding validation.
`P-chronic-deferred.md` routes the deferred-item halves; this audit confirms the WAVE bodies are
the right specs to re-home: BF.W-SAFARI-CAPTURE (the Safari band), BF.W-DESHADCN-SWEEP/GATE (the
de-shadcn band), and the feel-ask waves fold into the **sibling dock/aliasing audits** (CONTEXT.md
#3 corner-AA, #12 dock scroll). The perf/Metal items stay DEFER-with-trigger.

### Group F — BE/BF process/close waves (RESOLVED or RE-DO)

| wave | HEAD evidence | verdict |
|---|---|---|
| **BE.W-ARIA-ORIENTATION-GUARD** / **BD.W-ARIA-ORIENTATION-GUARD** | `SegmentedTabs.vue:421` NOW carries the conditional guard; `proof-aria-orientation.mjs` exists | **RESOLVED** (BD landed it) |
| **BE.W-FOLD-LEDGER** / **BF.W-FOLD-LEDGER** | `proof:be-fold-ledger` ABSENT; no `FOLD-LEDGER.json` | **NEVER-BUILT** — the D11 chronic (the disposition machine never built, a THIRD time) |
| **BE.W-GESTALT-ROSTER-BE** / **BF.W-GESTALT-WIRE** | `be-gestalt-roster.md` authored; `proof-ba-gestalt.mjs:70-73` STILL points at BC | **NEVER-BUILT** — the close oracle is blind to 4.2.0 (D6) |
| **BE.W-DISPOSITION-RESTAMP** / **BD.W-DISPOSITION-RESTAMP** | `DISPOSITION-REGISTER.json` `reStampedAt:"BC"` on the tail | **NEVER-BUILT** — register 3 tranches stale |
| **BE.W-PRECEPT-CANON** / **BF.W-REFLECT** / **BF.W-PI-AUTHOR** | the π layer (~8-10 specs) ABSENT; precept-canon docs partial | **NEVER-BUILT** |
| **BE.W-CUT** / **BF.W-CUT** | 4.2.0 already cut (the BD union shipped it) | **SUPERSEDED** — the cut they gated already happened (broken); BG owns the NEXT cut |

**Disposition for Group F:** these are owned 1:1 by the sibling `P-chronic-deferred.md` BG waves
(BG.W-DEFERRED-LEDGER, BG.W-GESTALT-REPOINT, BG.W-DISPOSITION-RESTAMP) + a BG π-author/Safari band.
BE/BF.W-CUT is SUPERSEDED — the version they would publish (4.2/5.0) is the one that already shipped
broken; BG owns the honest re-cut after the live defects are fixed.

---

## ROOT CAUSES (gestalt, first-principles)

1. **The plan-then-half-execute disease, at the tranche-of-tranches scale.** BE planned 38 waves +
   built 8 commits of engines on a side branch; the BD union (a SEPARATE P1-P10 vertical slice)
   cherry-picked the engines + their gates into 4.2.0; BF planned 31 convergence waves to WIRE them
   and was never run. The result is the worst of both: the engines + their `release` gates shipped,
   but the integration/paint/Safari that would make them real did not. **A gate that ships before
   its mechanism has a real consumer becomes a false-green certifier** — the precise reason the
   356-gate close passed over a broken UX.

2. **BF is HEAD-accurate; BE is now STALE.** The BE wave specs anchor their born-RED state against a
   pre-BD-union HEAD ("`useDockFission` does NOT exist"). The BD union ship invalidated those
   anchors. BF's specs were written AFTER, against the shipped tree (they cite `fission-bridge.css:
   291-327`, `useDockFission.ts:299-351`, `railProjection.ts:24-35`, `DockStack.vue:114-118` —
   verified real). **So the BF spec BODIES are the correct fold source; the BE specs are
   provenance/history only.** Re-running a BE spec would re-mint a thing that exists.

3. **Even BF is partly stale — the BD union pre-fixed some BF defects.** BF.W-FISSION-FILAMENT's
   D14 "`neckHold` is DEAD" is now FALSE: `useDockFission.ts:128/142/156` reads it. So the fold
   must RE-VERIFY each BF clause against HEAD, not transcribe BF verbatim — some clauses are already
   closed, the rest are owed.

4. **The user's harder BG directives OVERRIDE the BE/BF compromises.** BF.W-VH-COMPOSE keeps the
   View-Transitions crossfade as an acceptable V↔H register; CONTEXT.md #13 says **remove the
   crossfade/VT variant entirely** + make the morph an **in-place dock button, not a modal**. The
   BG re-architecture is STRICTER than the BF convergence — fold BF's mechanism but apply the BG
   directive (teardrop-only, in-place).

---

## PROPOSED WAVES (the BE/BF fold — re-home, don't re-run)

The fold is CONSOLIDATED into the existing BG wave set (the sibling audits own the build); this
audit's waves are the two that are SPECIFIC to the BE/BF developed-work preservation. Every BE/BF
wave maps to a row below or in a named sibling wave — no silent drop, no shadow execution.

### BG.W-BE-BF-LEDGER — the per-wave fold ledger (rider on BG.W-DEFERRED-LEDGER)
- **Intent:** seed `BG/FOLD-LEDGER.json` (P-chronic owns the D# rows) with the **per-wave layer**:
  one row per BE/BF wave id → `{LANDED | PARTIAL | NEVER-BUILT | STALE | SUPERSEDED | RESOLVED}` +
  the BG destination wave (or RETIRE-with-rationale). So a future agent cannot re-run a LANDED BE
  spec (re-minting a shipped engine) NOR silently drop a NEVER-BUILT breadth wave.
- **Approach:** the Group A-F tables above ARE the seed; `proof:bg-deferred-ledger` (P-chronic's
  gate) gains a wave-id parity clause: every `BE.W-*`/`BF.W-*` spec on disk has a ledger row, and a
  `LANDED` row names no BG build wave (it is the shipped surface a paint wave re-verifies), a
  `NEVER-BUILT` row names a real BG wave or RETIRE. Zero-pixel register wave.
- **Folds:** the whole BE WAVE-LIST + the BF 31-wave roster (provenance preserved, no re-run).

### BG.W-DOCK-LIQUID-INTEGRATE (the Group-A fold — RE-HOME the BF dock bodies)
- **Intent:** wire the LANDED dock engines (`useDockFission`/`useDockContextSilhouette`/
  `DockStack mode=facets`/`useBloomUp`/the goo) into REAL `src/` SFC consumers + PAINT them — the
  BF.W-DOCK-INTEGRATE + W-FISSION-FILAMENT + W-RAIL-FIDELITY + W-SILHOUETTE-REALIZE bodies, re-verified
  against HEAD (drop the already-closed clauses like the `neckHold` wire).
- **Approach:** ship `<DockNowPlaying>` (the goo binding off demo CSS onto `fission-bridge.css`'s
  shipped seam + the `<GooFilter>` mount); make the goo neck a body-anchored spanning filament
  (`fission-bridge.css:434-462` `inset:0`→body-anchored scale); bind `projectFacets(expand)` to live
  state + read the dead φ-tier `translate`; DECIDE `useDockContextSilhouette` (wire-to-≥2-or-retire).
  COMPOSE the shipped primitives — no re-fork, no second spring (DOCK_SPRING byte-fenced).
- **Files:** `DockNowPlaying.vue` (new), `fission-bridge.css`, `DockStack.vue`, `railProjection.ts`,
  `useDockContextSilhouette.ts`, the demo example tiles. **π:** the goo paints in `src/` (filter ≠
  `none`); the split necks; the facet carousel fans tiered; box-INVIOLATE deltaW=deltaH=0; both
  modes + webkit. **Folds:** BE.W-DOCK-FISSION/METABALL-BRIDGE2/CONTEXT-SILHOUETTE/RAIL-REALIZE/
  BLOOM-UP + BF.W-DOCK-INTEGRATE/FISSION-FILAMENT/RAIL-FIDELITY/SILHOUETTE-REALIZE. Overlaps the
  sibling `D-dock-morph-persistent.md` (the V↔H-in-place + ℱ-removal) — coordinate at execution.

> **The V↔H + crossfade-removal is NOT this wave** — it is `P-bd-coverage`'s
> **BG.W-DOCK-MORPH-INPLACE** (kill the modal + the VT crossfade, teardrop-only, in-place button),
> which SUPERSEDES BF.W-VH-COMPOSE (BF kept the crossfade). Fold BF.W-VH-COMPOSE's
> compose-`useDockOrientationMorph`-+-`useDragMorph` mechanism INTO that BG wave, applying the
> harder BG directive.

### BG.W-GLASS-CONSUMER-BAND (the Group-B/D fold — the dead-token consumers + breadth)
- **Intent:** give the LANDED-dead foundation tokens (`surface="clear"`, `--glass-fill-tint`,
  `--glass-ambient-hue`) real `src/` consumers (`<GlassChip>`/`<GlassControl>`/IconChip-glass) +
  ship the iOS-27 breadth (aurora satin/prism `uMedium==8/9`, the DockTabBar capsule fold, the
  lens/squircle Safari floors) — the BF.W-CONSUMER-BAND + W-AUR-*/W-TAB-IOS-CAPSULE/W-LENS-PRISM/
  W-SQUIRCLE bodies, born-RED→GREEN each on its own paint.
- **Approach:** the consumer band (additive, no new token); harden `proof:glass-foundation` from
  presence-only to consumption-aware (≥2 REAL call-sites, never markdown); the aurora mediums behind
  the GL-fence (default byte-identical); the Safari lens/squircle clip-path floors. Sequence AFTER
  the live-defect waves (the breadth must not crowd the linchpin).
- **Files:** `glass-chip/`, `glass-control/` (new dirs), `icon-chip.css`, `aurora.frag.ts` + WGSL,
  `material.css`, `squircle.css`, `glass-fx.css`. **π:** colored-glass reads per-instance hues;
  clear plate bleeds the backdrop; the mediums read on WebGL2+WGSL; both modes + webkit.
  **Folds:** BE/BF.W-CLEAR-VARIANT/TINTED-CHIP/SHEET-TRANSLUCENT/AMBIENT-TINT/ICONCHIP-GLASS/
  GLASS-CONTROL/AUR-SATIN/AUR-PRISM/AUR-REACTIVE/TAB-IOS-CAPSULE/LENS-PRISM/SQUIRCLE.

> The DEEP-20px-ceiling, LENS-CHROMA RGB-split, and CONCENTRIC-RADIUS are **DEFER-with-trigger**
> (perf-gated / no real consumer) — carry by-name in BG.W-DEFERRED-LEDGER, do NOT build speculatively.

### Cross-references (owned by sibling BG audits — folded by naming, not re-spec'd)
- **Group C (dead jubilance)** → `P-chronic-deferred`'s **BG.W-JUBILANCE-DECIDE** (wire `useCelebrationBurst`
  to ≥2 or retire; `useHaptic` is a build-it-or-RETIRE — it was never even built) + **BG.W-DEAD-GATE-SWEEP**
  (downgrade `proof:celebration-burst`/`proof:dock-context`/`proof:bloom-up`/`proof:liquid-morph`/
  `proof:dock-fission` off `release` until each has a binding π).
- **The undeleted spike** (`useLiquidMorph.ts` 20KB + `liquid-morph.css` 36KB) → `P-chronic`'s
  **BG.W-SPIKE-DELETE** (clean cut + relocate; D2/D30).
- **Process waves (Group F)** → `P-chronic`'s **BG.W-DEFERRED-LEDGER** (D11) + **BG.W-GESTALT-REPOINT**
  (D6, the close oracle still BC-pointed) + **BG.W-DISPOSITION-RESTAMP**; the π-author + Safari band
  → a BG paint/Safari wave (BF.W-PI-AUTHOR + W-SAFARI-CAPTURE bodies).
- **Safari/de-shadcn (Group E)** → BF.W-SAFARI-CAPTURE + W-DESHADCN-SWEEP/GATE bodies re-homed to a
  BG Safari band + de-shadcn band; the feel-asks (corner-AA #3, dock-scroll #12) → the sibling
  `D-aliasing-clip.md` / `D-previews-dockscroll.md`.

---

## RETIRE-with-rationale (explicit, no silent drop)

- **BE.W-HAPTIC-COUPLE / `useHaptic`:** RETIRE the SPEC — never built, the gate-note + consumer-evidence
  are phantom. RE-ENTER only if a real surface wants vibration (the `navigator.vibrate` feature-detect
  is trivial to re-mint then; no value in carrying a dead aspirational primitive).
- **BE.W-CUT / BF.W-CUT:** SUPERSEDED — the 4.2.0 cut they gated already shipped (broken). BG owns the
  honest re-cut. The CLOSE-CEREMONY discipline (`--run full` siblings-AND-submodule-absent, the
  FOLD-LEDGER witness, the user-gate) is the keepable content — fold into BG's own W-CUT.
- **The dead `search=radial`/`nav=inward-merge` fission signatures (D16):** RETIRE if n>2 is never
  exercised by a real surface (the dead-signature half of BG.W-SPIKE-DELETE / DOCK-LIQUID-INTEGRATE).
- **BE.W-ANTICIPATE-FOLLOW / BE.W-ALIVE-IDLE:** DEFER-with-trigger (minors) — re-enter when a dock/pill
  surface genuinely wants the idle-breath / anticipation pre-dip (J-inv-10; no speculative build).

---

## No-silent-drop attestation

Every BE wave (38) + BF wave (31) is dispositioned: Group A (6 LANDED dock engines → wire+paint),
Group B (9 glass/material → consumer band + Safari floors), Group C (5 jubilance → JUBILANCE-DECIDE/
DEAD-GATE-SWEEP), Group D (5 aurora/tabs → breadth band), Group E (Safari/de-shadcn/feel-asks →
named sibling bands), Group F (process → P-chronic BG waves; CUT superseded). The BF.W-FOLD-LEDGER
+ BE.W-FOLD-LEDGER (the disposition machine never built, the THIRD recurrence of D11) is closed by
`BG.W-DEFERRED-LEDGER` + the **per-wave parity clause** this audit adds, so a LANDED BE engine can
never be re-minted by a re-run spec AND a NEVER-BUILT breadth wave can never be silently dropped.
The developed work is preserved (BF bodies re-homed, re-verified against HEAD); shadow execution is
prevented (the ledger names every wave's true state).
