# R-overfitting — Overfitting + substrate-without-consumer inventory (AX step-back)

Read-only inventory. HEAD `77c08c5` (3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59,
pass-3 ledger). Runs the standing precept (`docs/audits/overfitting-audit.md`, §Invariant 5 /
L invariant 8): **every `src/` artefact has ≥2 distinct usage sites OR is exported on the
public surface OR is a demo-private/test helper** — and the strengthened library-orphan rung
(exported-but-zero-consumers, including demo, is the strongest overfitting signal). Scope per
the lane brief: post-W19 prune state, fourier-field (W43), liquid-morph (W42), and the new
W53-W59 surfaces. All counts cite the grep.

## Verdict distribution (this inventory's deltas vs the AU.W10 zero-orphan baseline)

| verdict | count | artefacts |
|---|---|---|
| keep (clear ≥2 / exported-with-real-consumer) | majority | SegmentedTabs, useTabIndicator, useCanvas2D, FourierField, Constellation, DeckProgress, Slider+sliderVariants, squircle tokens, metric family, btn-glass, pulse-aura, fourier math leaf |
| **DEFERRED-prune (wave-owned, blocked on cross-repo)** | 1 | `header-ribbon` → W19 in-repo prune, gated on W35 migrate-before-prune |
| **first-class GAP (partial-land — subpath only)** | 1 | `fourier-field` (W43): subpath leg landed, api-seat + demo story + README NOT done |
| **RETIRE candidate (wave-owned, L-inv-8 violator)** | 2 | `GlassDialogNative` (W20 F0), `glass-panel` (W20 F2) |
| true dead code (delete-unused) | **0** | — |
| genuinely-new orphan introduced this band | **0** | — |

Net: **the W53-W59 + W43 + W37 band introduced ZERO new orphans.** Every disposition-bearing
finding is an EXISTING wave-owned item (W19/W20/W35/W43) that must fold into this tranche, not
a fresh overfit.

---

## A. Post-W19 prune state — header-ribbon is DEFERRED, not done

W19 ("primitive prune A: header-ribbon + glyph-face + disco-glyph") is `live-verified (DEVELOPED)`
in PROGRESS but **only 2 of its 3 excisions are integrated to HEAD**:

- **glyph-face** — GONE. `ls -d src/components/custom/glyph-face` → absent;
  `grep -c "glyph-face" src/index.ts package.json` → `0` / `0`. Clean.
- **disco-glyph** — GONE. Same; the glyph-face↔disco-glyph silhouette DI coupling severed. Clean.
- **header-ribbon** — **STILL PRESENT.** `ls -d src/components/custom/header-ribbon` → EXISTS;
  `src/subpaths/header-ribbon.ts` present; `grep -c "header-ribbon" package.json` → `5`
  (exports block + typesVersions). It is NOT on the root barrel (`grep -n header-ribbon src/index.ts`
  → empty) but IS a published `/header-ribbon` subpath.

**This is CORRECT, not a miss.** W19's own doc (lines 405-413, 446-450) corrects its premise:
header-ribbon is NOT zero-consumer cross-repo. The live binary consumer is keyframes.js's
`EditorShell.vue` (constellation `result[11]`/`result[21]`) — and this inventory found a SECOND
live consumer: **bbnf-lang playground** (`../bbnf-lang/playground/src/components/layout/NavBar.vue:5`
imports `HeaderRibbon`, used at `:176`/`:226`). Per the §4-note-8 migrate-before-prune class, the
in-repo prune PUBLISHES only after **W35** migrates the cross-repo consumers off it. Until W35
lands, header-ribbon's subpath + package.json + demo (`navigation/header-ribbon.vue`) + api seat
are load-bearing. **Disposition: header-ribbon excision FOLDS into W19/W35 — do not prune at HEAD.**

> Grep: `grep -rln "HeaderRibbon" ../bbnf-lang/playground/src` → `NavBar.vue` (import + 2 uses).

---

## B. fourier-field (W43) — PARTIAL land; first-class citizenship is a GAP

fourier-field is the lane's headline finding. It is **exported** (clears the precept bar) and has
a **real cross-repo binary consumer** (slides `feedback-coder/slides/Slide05.vue:23`
`import { FourierField } from "@mkbabb/glass-ui/fourier-field"`, used at `:43`) — so it is NOT an
orphan. BUT the W43 wave that makes it a first-class citizen is only HALF landed, exactly as its
own RED witnesses predicted (wave doc §RED-4):

| W43 citizenship leg | state at HEAD | evidence |
|---|---|---|
| `/fourier-field` flat subpath | **landed** | `src/subpaths/fourier-field.ts` present; `package.json` `./fourier-field` block + typesVersions (5 refs) |
| `api/index.ts` type seat | **NOT landed** | `grep -n FourierField src/api/index.ts` → only a comment at `:299`; NO `FourierFieldProps` export. The component exposes no props type at all in `index.ts`. |
| demo story (`substrates/fourier-field.vue`) | **NOT landed** | `find demo -iname "*fourier*"` → empty; `grep -rln FourierField demo/` → empty (0 in-repo demo) |
| README | **NOT landed** | `ls src/components/custom/fourier-field/README.md` → absent (Constellation HAS one) |

**Disposition: the api-seat + demo-story + README legs of W43 MUST fold into this tranche.** A
shipped subpath with no demo story and no api discovery-seat is exactly the "first-class on PAPER
only" state W43 was minted to close.

**Sub-finding (over-exposure):** `fourier-field/index.ts` re-exports raw math primitives
(`comp`, `evalFourier`, `positionsAt`, `makeEllipticSpectrum`, `BasisComponent`,
`EllipticSpectrumOptions`) onto the PUBLIC `/fourier-field` subpath. Their only consumers are
`FourierField.vue` (internal) — no demo, no cross-repo math-leaf consumer. This is component-
internal substrate leaking onto the public surface. W43's authoring should decide: keep them
private to the dir (the KISS default), or — if a deliberate "math leaf" subpath is wanted —
justify it with a named consumer. Currently neither; flag for W43 scope.

> Grep: `grep -rln "from.*fourier-field/math" src/` → `index.ts` + `FourierField.vue` only.

---

## C. liquid-morph (W42) — planned-only; NO orphan

W42 ("liquid-morph substrate") is `planned` in PROGRESS, and there is **zero source presence** —
no orphan to find. `grep -rln "liquid-morph\|liquidMorph\|LiquidMorph" src/ demo/ package.json` →
empty; `grep -c liquid-morph package.json src/api/index.ts` → `0`/`0`. The dock-morph reads
`--dock-morph-t` + the `--corner-k-*` band (W56), but no standalone liquid-morph artefact exists.
Nothing to prune; W42 authors net-new. (Note: W42's brief says it reads the same `--corner-k-*`
band W56 minted — confirm at authoring that W42 does not re-mint a parallel scalar.)

---

## D. W20 retire candidates — GlassDialogNative + glass-panel (wave-owned, L-inv-8 violators)

Two confirmed substrate-without-consumer artefacts, BOTH already adjudicated by W20
("primitive fix: native-top-layer + card toggles + GlassPanel retire", `planned`):

**D1. GlassDialogNative — exported NOWHERE, 1 demo consumer (the strongest overfit signal).**
- `grep -rn "GlassDialogNative\|dialog-native" src/api/index.ts src/index.ts package.json src/subpaths/*.ts` → **ZERO**. Not root barrel, not /api, not package.json exports, not a subpath.
- Exactly ONE consumer: its own demo `demo/stories/containers/native-top-layer.vue:7` (deep relative import `../../../src/components/custom/dialog-native`).
- This is a textbook **library-orphan / L-inv-8 violator** (1 consumer, exported nowhere). W20's verdict: FOLD the native-`<dialog>` top-layer capability into reka-ui `<Dialog>` as a `:native` opt-in, then RETIRE `GlassDialogNative`. **Disposition: W20.**

**D2. glass-panel — exported (subpath+api+pkg) + 2 demo stories, 0 production consumers.**
- `package.json` `./glass-panel` block (5 refs) + `src/subpaths/glass-panel.ts` + 7 `GlassPanel` api seats + 2 demo stories (`foundations/paper-glass.vue`, `substrates/glass-panel.vue`).
- ZERO production (non-demo) consumers: `grep -rln GlassPanel src/` (excl own dir) → only `api/index.ts`; cross-repo (speedtest/slides/words/fourier/bbnf) → **0**.
- Under the literal precept "exported = keep" it passes; but W20 F2 already adjudicated it a RETIRE (the 2 demo stories are manufactured consumers; L-inv-8 wants ≥2 *production* consumers OR a named roadmap). **Disposition: W20 (RETIRE + strike subpath/api/pkg/demo).**

---

## E. New W53-W59 + W37 surfaces — all KEEP (clear the bar)

| artefact | wave | surface | consumers (grep) | verdict |
|---|---|---|---|---|
| `SegmentedTabs` | W53 | `/tabs` subpath + api (`SegmentedTabsProps`/`Variant`/`Option`) | 6 demo SFCs (`navigation/tabs.vue` + 4 aurora-config `*Layer.vue` + `AuroraConfigDock.vue`) | **keep** |
| `useTabIndicator` | W53 | component-internal | 1 (`SegmentedTabs.vue`) | **keep** — de-monolith extract, W10-precedent (orchestrator IS the consumer) |
| Bouncy*/UnderlineTabs/ResponsiveTabs/useBouncySlider | W53 | — | `grep -rln` → 0 (only comments in tabs/) | **clean break DONE** (no alias, no survivor) |
| `useCanvas2D` / `resolveCanvasColor` | W37 | `glass/` sub-tree | ≥2 (`FourierField.vue` + `Constellation.vue`/`constellationField.ts`) | **keep** — substrate-with-2-consumers; fourier-field IS the 2nd consumer that earns it |
| `Constellation` + `ConstellationField`/`Warp` types | W17 | `/constellation` subpath + api (3 seats) | demo (`substrates/constellation.vue`) + slides(8) + fourier-analysis(1) | **keep** |
| `DeckProgress` | W24 | root barrel + `/deck-progress` subpath + api | demo + slides(2) | **keep** |
| `Slider` + `sliderVariants` (variant: standard/spectrum/cylinder, size) | W59 | root barrel + `/slider` subpath + api (`SliderVariants`) | LabeledSlider, IconTooltip, dockContext, 2 demo | **keep** |
| `--corner-k-{squircle,soft,sharp}` + `--corner-shape-*` | W56 | tokens (theme.css) | glass.css, dock.css, slider, GlassDock | **keep** — ≥4 consumers |
| `--glass-level` (W54), `--glass-backdrop-luma` (W55) | W54/W55 | — | NOT built (planned) | n/a — no orphan |
| metric family (`MetricPill`/`MetricBadge`/`MetricCell`/`MetricStack`) | AV | root barrel (pill via ui/) + subpaths (cell/stack/badge) + api | each ≥1 demo + cross-repo; pill on root barrel (`src/index.ts:94`) | **keep** |
| `btn-glass` @utility (W52), `pulse-aura` (W57) | W52/W57 | `/styles` | button/index.ts + glass.css; Skeleton/Pulse/animations/tokens | **keep** |

Subpath↔package.json coherence: all **60** `src/subpaths/*.ts` barrels have a matching
`package.json` export (no dangling subpath, no exported-name-without-barrel). The only custom
dir without a dedicated subpath/root-barrel seat besides GlassDialogNative is `infinite-scroll`,
which is reachable via the curated `src/infinite-scroll.ts` subpath + composables barrel + 2 demo
stories — **keep**.

---

## F. Path forward (planning — folds into existing waves, no new wave)

1. **W43 (fourier-field first-class)** — land the 3 un-done legs: `api/index.ts` type seat
   (`FourierFieldProps`/medium-axis types), `demo/stories/substrates/fourier-field.vue` story,
   and the `README.md`. Decide the math-leaf re-export (`comp`/`evalFourier`/…) — keep private
   or justify the public exposure with a named consumer. This is the lane's primary GAP that
   MUST fold into this tranche.
2. **W19 + W35 (header-ribbon prune)** — keep header-ribbon at HEAD; W35 migrates the keyframes.js
   `EditorShell.vue` AND the bbnf-lang `NavBar.vue` consumers off it (the inventory adds the
   bbnf-lang consumer to W35's migration ledger — verify W35 enumerates BOTH), then W19's in-repo
   excision publishes. migrate-before-prune; no clean-break at HEAD.
3. **W20 (primitive retire)** — discharge the two L-inv-8 violators: fold GlassDialogNative's
   native-`<dialog>` capability into reka `<Dialog :native>` then strike the dir + its sole demo;
   retire glass-panel (strike subpath/api/pkg/demo) once the W52 `.glass-material` CSS-native path
   subsumes its only role.
4. **W33 close** — re-run this overfitting audit at close (the `proof:ax-final` ZERO-ORPHANS
   clause). Expected GREEN once W43/W19/W20 land: every src/ artefact clears ≥2-OR-exported-with-
   real-consumer-OR-demo-private. The standing AU.W10 baseline (zero orphans) holds for the AU
   set; this band added zero new orphans, so the close is reachable by discharging the 4 wave-owned
   items above.

No quick fixes, no aliases, no parallel substrate. The dispositions are all GESTALT (fold the
capability / migrate-then-prune / land the missing first-class legs), per the no-backwards-compat
+ migrate-before-prune precepts.
