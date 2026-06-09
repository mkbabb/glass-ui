# Research-necessity audit — lane: glass-material (the 5-rung ladder · W54 glass-first · W55 adaptive legibility · W-GLASS cohesion)

**Question.** The material SYSTEM is heavily specced and gated. Is anything left
research-shaped (the `contrast-color()` refinement? the `--glass-backdrop-luma` observer that
"shipped demo-private"?), or is the remaining work the W-A11Y-PERF engagement + tuning?

**Verdict: REFINE-FROM-EXISTING.** The glass material is the single most-researched, most-gated
band in the repo — a SOTA wave already ran (AW.W23), a 32-facet liquid-glass corpus + synthesis
exists (AX), two adversarial hardening passes red-teamed the W54/W55 mechanisms BEFORE they
shipped (PROTO-maximal-glass, PROTO-adaptive-glass), two more red-teamed the as-built (CH-glass-
material, H-glass-cohesion, H-a11y-perf), and the cohesion wave (AY.W-GLASS) has landed its
source. Every remaining item is (a) the fully-specced W-A11Y-PERF execution, (b) the W-GLASS PNG
capture arm, or (c) a refinement derivable from corpus + code with the in-repo π/WCAG harness.
The two candidate "research-shaped" items DISSOLVE on inspection (§5). A fresh SOTA pass here
would re-tread a settled corpus — churn.

---

## 1. The existing corpus (read in full)

| Artefact | What it settles |
|---|---|
| `docs/tranches/AW/waves/AW.W23-glass-material-sota.md` | The original material SOTA wave — the oklab adaptive-tint seam (`--glass-tint-source/strength`) was minted HERE as the zero-delta consumer-push no-op W55 later engaged. |
| `docs/tranches/AX/research/liquidglass-research-corpus.json` (32 facets) + `liquidglass-synthesis.md` | The material model wholesale: D19 edge-over-bloom, `plus-lighter` (HDR-clamped) over `screen`, warm-cream core, rim + under-shadow ladder, the no-glass-on-glass band rule, the lensing posture (Chromium-only PE, never load-bearing), the a11y four-guard floor, the `contrast-color()` platform facts ("Baseline April 2026"; multi-candidate form proposal-stage). |
| `docs/tranches/AX/waves/AX.W52` / `W54` / `W55` + audit JSONs | The shipped three-axis architecture: specular (W52), `--glass-level` opacity+blur (W54), `--glass-tint-*` legibility (W55) — disjoint by construction. |
| `docs/tranches/AX/audit/hardening/CH-glass-material.md` | The pre-landing red-team: C1 specular-parity (→ landed via W-GLASS opt-in scope), C6 per-rung AA calibration (OPEN — §4.3), C7 a11y cascade-guard (OPEN — §4.4). |
| `docs/tranches/AX/audit/hardening/PROTO-adaptive-glass.md` | The W55 mechanism red-team: the `@container style()` strict-ancestor contract (shipped honored — the bucket targets descendant rungs; the spec fixture sets it on the ancestor), the strength-vs-alpha coupling (Ch2 — partially open, §4.3), the demo mounting-site gap (→ `tests-visual/adaptive-glass.spec.ts` synthetic fixture), `contrast-color()` black/white-only identity divergence (Ch4 — shipped anyway as PE; §5.1). |
| `docs/tranches/AX/audit/hardening/PROTO-maximal-glass.md`, `RESEARCH-glass-backgrounds.md`, `GLASS-overlays.md`, `GLASS-custom-components.md` | The W54 maximal-default red-team + the glass-over-rich-background composition recipe (the W55 bucket is its load-bearing legibility partner — already recorded). |
| `docs/tranches/AY/audit/hardening/H-glass-cohesion.md` (F1–F6) | The full 20-surface cohesion matrix; every defect file:line-grounded → AY.W-GLASS. |
| `docs/tranches/AY/audit/hardening/H-a11y-perf.md` (H-1…H-6) | The dormant-W55 / Safari-prefix / specular-thrash / nested-backdrop / stale-oracle set → AY.W-A11Y-PERF. |
| `docs/tranches/AY/waves/AY.W-GLASS.md` + `audit/visual/W-GLASS-DELTA.md` | DEV-COMPLETE source (E1–E9 landed + verified); ONE open arm: the 8 evidence PNGs are NOT on disk. |
| `docs/tranches/AY/waves/AY.W-A11Y-PERF.md` | The five root-fixes (O-1…O-5) fully specced with HEAD-corrected line numbers, gates G1–G5 designed, overlap with W-GLASS reconciled. NOT yet implemented (re-verified this audit). |

## 2. The as-built (verified at HEAD this audit; line-cites live)

- **The ladder + the three axes are SHIPPED and coherent.** Five rungs each compose
  `color-mix(in oklab, var(--glass-bg-*), var(--glass-tint-source) var(--glass-tint-strength))`
  (`src/styles/glass.css:288,308,319,335,346`); `--glass-level` threads BOTH seams at their single
  sites (`src/styles/tokens.css:736-751` blur radii, `:806-817` bg alphas); the W55 bucket at
  `glass.css:371-382`; the `contrast-color()` PE flip at `glass.css:395-407`; the a11y brackets ride
  the level (`glass.css:919-925` reduce→0, `:940-946` contrast-more→0.3 + tint-to-ink); the WHC skin
  `glass.css:968-1075` (now including `.glass-drawer`); the `@supports not` opaque fallback
  `glass.css:1079-1098`.
- **W-GLASS source is LANDED.** Drawer re-authored onto `glass-overlay`
  (`src/styles/drawer.css:45-58` — oklab tint + `--glass-blur-overlay` + ladder shadow + hand-authored
  webkit pair); the moving-specular transition is OPT-IN-scoped (`glass.css:175-193`; the always-on
  `::before` group `:90-161` carries an explicit "transition NOT declared here" note `:156-160`);
  Slider range routes `--glass-blur-quiet`; Notification rides `glass-floating`; the dock-shell
  exemption is named in prose (`glass.css:47-57`) and gated (`dock-shell-exempt`).
  `proof:glass-cohesion` exists (343 lines, `package.json:675`); `proof:glass-one-model` is REMOVED
  (`grep -c glass-one-model package.json` → 0). `tests-visual/glass-cohesion.spec.ts` (206 lines)
  exists.
- **W-A11Y-PERF defects re-confirmed live.** The bucket is DORMANT — zero `--glass-backdrop`
  setters in `demo/` or `slides/src/` (greps empty this audit; `src/` hits are the `@container`
  READERS only). `dist/styles/glass.css` ships **15 `backdrop-filter` / 1 `-webkit-`** (re-measured).
  `useSpecularTracking.ts` still mints a fresh `matchMedia` per pointermove (`:42` via `:51`) +
  forces layout per event (`:54` `getBoundingClientRect`), no rAF. No `proof:webkit-backdrop` /
  `proof:nested-backdrop-budget` in `package.json`. The dark-contrast oracle still computes vs solid
  `--card`.
- **The luma companion has ZERO consumers.** `--glass-backdrop-luma` is minted empty
  (`tokens.css:905,927`); no observer exists in `src/`, `demo/`, or slides (greps empty).
- **In-flight caveat:** `Slider.vue` is touched by FIVE AY waves (B2-readiness:246-264) and a Batch-2
  finisher is concurrently writing slider/dock-story source — slider cites above are from the
  committed corpus state (W-GLASS as-built notes), not re-pinned to the in-flight working tree.

## 3. README state — **STALE (three sites)**

There is no `src/styles/README.md`; the de-facto README is the CLAUDE.md canon sections + the
`glass.css` header prose. Graded against as-built:

1. **CLAUDE.md:330 (W54 canon)** — "Machine-locked by `proof:glass-level` + `proof:glass-one-model`".
   `proof:glass-one-model` was REMOVED by W-GLASS and SUPERSEDED by `proof:glass-cohesion`
   (`package.json:675`; the deletion-proof holds). Stale gate cite.
2. **CLAUDE.md:204 (W55 canon)** — "`--glass-backdrop-luma` … ships demo-private". At HEAD NOTHING
   ships: the token is minted (`tokens.css:905,927`) with zero consumers anywhere. Overstated; needs
   the §4.5 disposition.
3. **`glass.css:3-19` header** — the AV.W15 "no-glass-on-glass discipline … a glass surface nested
   INSIDE another glass surface is a discipline violation" prose is in TENSION with the shipped W54
   maximal default, under which `btn-glass` (a real 10px `backdrop-filter`) inside `.glass-card`
   inside a glass Dialog is the COMMON sanctioned composition (the exact stack H-a11y-perf H-4
   budgets). The rule needs re-scoping (plate-in-plate vs control-on-plate), not silent
   contradiction.

Everything else graded ACCURATE: the W54/W55 mechanism descriptions, the strict-ancestor bucket
contract ("on any ancestor"), the `in srgb` surface-tint keep, the Drawer-modes section (no opaque
claim survives), the easing doctrine, the dock-shell exemption prose.

## 4. Divined refinements (NO new research required — corpus + code + the in-repo harness answer all)

1. **Execute W-A11Y-PERF O-1…O-5 as specced.** The wave spec is implementation-grade: HEAD-corrected
   edit-site lines, five born-RED gates (G1–G5) designed, the W-GLASS overlap reconciled by
   sequencing. O-1 (library surfaces carry `--glass-backdrop: light` at `glass.css:333/:344/:511` +
   `dock/shell.css:16`), O-2 (build-pass prefix injection in `vite.style-assets.ts` closeBundle +
   the `glass.css:1079` Safari-17 `@supports` split — the 15/1 dist parity re-measured this audit is
   the born-RED witness), O-3 (rAF-coalesce + cached-PRM in `useSpecularTracking.ts:35-64`, AV.W7
   pattern), O-4 (`contain: paint` + the measured depth/frame-budget gate), O-5 (composite the
   rung-alpha page-bleed into `proof-dark-semantic-contrast.mjs:234-272` — the alpha-composite math
   already exists twice in-repo, `adaptive-glass.spec.ts:117-127`). Pure engineering + live
   measurement; zero external unknowns.
2. **Land the W-GLASS open capture arm.** The 8 PNGs `W-GLASS-DELTA.md:35-42,59-60,88-89` references
   do not exist on disk (`docs/tranches/AY/audit/visual/` holds only the prose DELTA). The DELTA's
   "Verdict: PASS … live-verified" (`W-GLASS-DELTA.md:114`) overstates against the wave's own HARD
   GATE clause 3 — the cardinal-lesson inflation the precept forbids. Capture run only; the harness +
   count-reader exist.
3. **Per-rung AA calibration (CH-glass-material C6, still open).** `--glass-tint-strength-aa: 18%`
   (`tokens.css:929`) is ONE value across rungs starting at 0.30α–0.95α; the π spec's `KINDS`
   (`tests-visual/adaptive-glass.spec.ts:242`) measures only `glass-card`/`glass-resting`/
   `glass-dock` — wash + quiet are UNMEASURED over white. Extend `KINDS` to all five rungs; if 18%
   misses on wash/quiet, derive per-rung `--glass-tint-strength-aa-<rung>` values with the spec's own
   oklab→WCAG plumbing (`:48-150`). This also discharges PROTO-adaptive-glass Ch2's strength-vs-alpha
   coupling empirically (the translucency-floor assert `:314-321` already guards the opaque
   goal-miss).
4. **The a11y cascade-guard (CH-glass-material C7, never shipped).** The brackets set `--glass-level`
   on `:root` (`glass.css:920-924,941-945`); `--glass-level` is `inherits: true` and CLAUDE.md
   DOCUMENTS the ancestor-override pattern — so any consumer ancestor `--glass-level` silently defeats
   the `prefers-reduced-transparency` floor for its subtree. Fix shapes already written
   (CH-glass-material action 4: non-inheriting floor token the recipe `min()`s against, or
   bracket-scoped re-set on the material group); add the synthetic assert
   (`:root{--glass-level:1.5}` + reduce → still solid) to `proof:glass-level` or the π spec.
5. **`--glass-backdrop-luma` disposition.** Zero consumers (`tokens.css:905,927` mint-only). Either
   retire the token (substrate-without-consumer, L inv 8) or hold it explicitly reserved with a
   corrected CLAUDE.md:204 — building the sampled-luminance observer stays a DECIDED non-goal (the
   declarative bucket + the O-1 library-default engagement cover the cases; "no web API reads pixels
   behind backdrop-filter" is a settled platform fact in the corpus, `tokens.css:872` rationale).
6. **CLAUDE.md gate-cite reconcile.** `:330` `proof:glass-one-model` → `proof:glass-cohesion`; `:204`
   luma claim per §4.5. One-line doc edits.
7. **Re-scope the no-glass-on-glass header.** Amend `glass.css:3-19` to the as-built truth: the rule
   bans PLATE-in-PLATE (a second `.glass-*` panel inside a glass panel); the W54 control-on-plate
   composition (`btn-glass` in `glass-card` in Dialog) is sanctioned AND budget-gated by W-A11Y-PERF
   O-4 (the depth-3 ceiling + `contain: paint`). The gate is the enforcement half; the prose is the
   doc half.
8. **Record the W55 locality counter-move.** PROTO-adaptive-glass Ch1.2: the bucket darkens the whole
   subtree (inherited tint tokens), while the iOS move is local. The derivable counter-move — an inner
   region re-marks `--glass-backdrop: dark` to opt back out — works today through the same
   `@container style()` read; it just needs RECORDING in the CLAUDE.md consumer contract (and one
   negative-control arm in `adaptive-glass.spec.ts`: bucket set ON the rung itself must no-op — the
   strict-ancestor proof, PROTO Ch1 hardening c).

## 5. The two candidate "research-shaped" items — both dissolve

1. **The `contrast-color()` refinement — settled; one optional micro-freshness rider, not a lane.**
   The flip is SHIPPED `@supports`-gated (`glass.css:395-407`), recorded SOLID by H-a11y-perf
   ("correct + Safari-safe — NOT churned"), and the corpus already contains the platform facts
   PROTO-adaptive-glass Ch4 litigated: `contrast-color()` returns black-or-white only; the
   multi-candidate form is proposal-stage; the declarative bucket is the load-bearing floor on all
   engines. The ONLY residue fresh research could add is "has the multi-candidate
   `contrast-color()` syntax shipped since the AX corpus?" — which would let the PE flip return the
   warm-ink pair instead of pure black (the Ch4 identity divergence). That is a ten-minute
   freshness check, non-blocking, and it FOLDS into the already-validated W-LIQUID WWDC26/platform
   delta-check (see `research-necessity/liquid-glass.md` §5.3) — do NOT mint a second research lane
   for it.
2. **The backdrop-luma observer — a decided non-goal plus a disposition decision, not research.**
   The sampling approaches (canvas readback, element-luma averaging) are commodity; the corpus
   already decided against a speculative observer; the as-built reality (zero consumers, §2) makes
   the open item a RETIRE-or-RESERVE decision (§4.5), answerable by the ≥2-consumer invariant, not
   by external study. If W60-class rich-background pages later produce a consumer that cannot
   express the bucket declaratively, the observer becomes an ENGINEERING wave with the contract
   already specced (`tokens.css:905` — "luma < 0.5 maps to the light bucket").

## 6. Research gaps

**None warranting fresh external research.** The remaining work divides cleanly into: the
W-A11Y-PERF execution (engineering against a HEAD-verified spec), the W-GLASS capture arm
(measurement), and the §4 refinements (derivable from corpus + code + the resident π/WCAG
harness). The single optional external touch — the multi-candidate `contrast-color()` shipping
status — rides the W-LIQUID freshness arm at zero marginal cost.
