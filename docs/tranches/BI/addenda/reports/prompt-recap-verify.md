# PROMPT-RECAP.md — completeness verification against execution reality

**Auditor:** prompt-recap completeness auditor (read-only)
**Subject ledger:** `docs/tranches/BI/ledgers/PROMPT-RECAP.md` (630 lines)
**Formation base:** `26c5ae686fd0f1181083aebda1215b00524555f1` (tranche/BI)
**HEAD at audit:** `e5b3a2095b6c3e330b5d82ca3330f1eac4e3c895` on branch `master`
**Commits base..HEAD:** 69 (`git log --oneline 26c5ae68..HEAD | wc -l`)
**Shipped tags reachable from HEAD:** `v5.0.0`, `v6.0.0`. package.json = 6.0.0; CHANGELOG top = "7.0.0 (unreleased)".
**Working tree:** a large uncommitted transaction (7.0.0-in-flight); READ-ONLY, not treated as delivered. Verdicts are judged against committed HEAD (= 6.0.0 shipped) unless noted.

Verdict vocabulary: **DELIVERED** · **PARTIAL** · **ORPHANED** (spec/owner exists, ask not delivered, no live carrier) · **VIOLATED** (edict actively broken) · **UNVERIFIED** (could not confirm either way).

---

## 0. The load-bearing execution fact (context for every P-wave / close verdict)

The formation authored a 134-wave P-graph (`BI.W-P000..P133`, WAVE-INDEX.md) and a
separate set of **104 named `BI.W-*` wave specs** (`docs/tranches/BI/waves/`, the specs the
ledger owner-column actually points at). The receipt/cursor protocol executed **exactly two
waves** and then died:

- `docs/tranches/BI/EXECUTION-PROGRESS.md:20` — `BI.W-P000: DONE at 1c2cda3a…`
- `EXECUTION-PROGRESS.md:21` — `BI.W-P001: DONE on the selected first-parent lineage`
- `EXECUTION-PROGRESS.md:26-28` — **`BI.W-P002 … BI.W-P133: PLANNED`**

After P001 the ~66 remaining commits are conventional (`fix(...)`, `refactor(...)`,
`feat(...)`), carry **no wave receipt**, and there is **no `docs/tranches/BI/FINAL.md`**
(only `FORMATION/FINAL-PRECONDITIONS.md`). EXECUTION-READINESS.md:106-110 forbids release
"until all 134 cursor rows are terminal … all nine owner ACKs bind the candidate tarball …
two clean convergence passes … FINAL/tag/package bytes agree." **None of those conditions
were met, yet 5.0.0 and 6.0.0 were both published.** Consequence: a ledger row whose owner
is a `BI.W-P*` wave beyond P001, or a named `BI.W-*` close wave, has a *spec* but the delivery
must be independently proven in the conventional-commit tree — the owner label is not evidence.

Net: the conventional band **did** deliver the structural + component + prune substance
(see §4), but **all close-battery / acceptance-oracle asks orphaned** (see §2).

---

## 1. EDICTS (standing laws — special attention)

| id | ask digest | owner | verdict | evidence |
|----|-----------|-------|---------|----------|
| gates-abrogation | 404 named gates → 40-60 invariants | P000 / BI.W-AXES-GATES | **DELIVERED** | `docs/tranches/BI/FORMATION/invariants.json` = exactly **40** invariant families; `scripts/verify.mjs` loads them; commit `1c2cda3a feat(bi-p000): replace the legacy gate mesh with one fail-closed verifier`. 40 ∈ [40,60]. |
| CLAUDE.md stays deleted | never recreate CLAUDE.md | B9/cut | **DELIVERED** | no CLAUDE.md at HEAD (`git ls-tree HEAD` root) nor on disk. |
| tailwind-first | @theme/@utility, no raw pasted CSS | B2/B9 | **DELIVERED (structural)** | 66 `@utility` decls in src; `src/styles/theme.css`, colocated component CSS via ms7 (`4bf29831 refactor(styles/ms7)`). Fidelity not paint-checked. |
| E-5 no-legacy / no-backwards-compat | clean breaks, no aliases/shims | standing | **DELIVERED (near)** | many alias-excision commits: `b7b25f51 excise zero-consumer compatibility aliases`, `80654800 remove two deprecated return-shape aliases`, `c0577fba retire owner-internal component members`, `062a2b12 retire redundant public portal owners`. Residual: 15 `goo-blob` legacy comment refs survive (e.g. `src/composables/color/index.ts:5`, `src/components/aurora/constants/budget.ts:5-82`) — cosmetic, non-load-bearing. |
| E-2 liquid-weight-universal | inertia/bounce/squish/coupled-fade on ALL motion; dot goo-morph | B4/B7 | **PARTIAL** | codified structurally: `motion.single-clock`+`motion.spring-language` invariants; commits `8765d77f share generated spring horizon`, `b803de39 sheet scrims on global tempo clock`, `8fec6dd2 pressables one interaction owner`; dot-morph shipped as `src/components/pager-dots/composables/usePagerWorm.ts`. **Fidelity per-surface (UF-G1..G10 register drift) never device-verified** — no paint battery ran (see H-2). |
| E-1 no-masking-fallback | primary paints or fails loud; no state-masking fallback | B10 gate-harden | **ORPHANED (enforcement)** | detector `scripts/no-masking-manifest.mjs` (17KB, real) exists but is referenced by **nothing** — not `scripts/verify.mjs`, not `prepublishOnly`, not `.github/workflows/*`. The `proof:no-masking-fallback` gate was abrogated with the 403; no successor wired. Edict survives as prose, not as a live gate. |
| E-3 demo no-meta | never reference tranches/kf/waves on any demo page; scrub comments | B6 BI.W-DEMETA | **VIOLATED / ORPHANED** | **No demeta/scrub commit exists** (`git log … | grep -iE 'meta\|demeta\|scrub'` → none). The exact META-1 flagship still ships to dist: `src/composables/motion/useDragMorph.ts:36-37,179` embed `BD.W-ANIM-IOS27-TUNE`. **152** meta refs remain in `demo/` (BG.W-*, BI.W-*, "tranche"), e.g. `demo/router.ts:11,58,88`, `demo/main.ts:15,112`. |
| E-4 greenfield no-meta | no ported-from/version-history in greenfield artifacts | B6 lexicon gate | **UNVERIFIED** | no lexicon gate found in the runnable verifier; overlaps E-3 violation. |
| UF-P6 no legacy/shims/masking gestalt | = WS7-04/05, E-1/E-5 | standing | **PARTIAL** | alias-excision strong (E-5 DELIVERED-near) but the masking arm (E-1) is unenforced. |

---

## 2. "Rides the close" owners — the B10 close band + acceptance oracles

Every row here has a *spec* under `docs/tranches/BI/waves/`. None reached delivery: the close
battery never ran because the protocol died (§0) and `prepublishOnly`/`release.yml` gate only
typecheck+build+test.

| id | ask digest | owner | verdict | evidence |
|----|-----------|-------|---------|----------|
| H-2 / C-PAINT / WS7-01 | real-paint-verify must BLOCK the tag; judge on fresh capture | BI.W-PI-IN-CLOSE | **ORPHANED** | `git show HEAD:package.json` → `prepublishOnly = typecheck && build && test`. `.github/workflows/release.yml:29-35` = typecheck / build / `npm test` / `npm publish`. **No pi, paint, DELTA, or gestalt step anywhere in the release path.** Two cuts shipped with zero paint gate. The 147-spec binding-π suite was abrogated with the 403 and no tag-blocking successor exists. |
| H-8 / PE-GESTALT (GA-9) | 3-axis Fable acceptance verdict per surface; flip 30 PENDING cells before tag | BI.W-GESTALT-LEDGER-FILE | **ORPHANED** | no filed BI gestalt acceptance ledger (`git ls-tree HEAD | grep -i gestalt` → only historical AY/BA artifacts). `demo.gestalt` exists as a device-free invariant name only; the non-authoring-Fable PASS oracle never ran. No gestalt commit in base..HEAD. |
| PE-FABLE (GA-3) | DesignSync PASS from a Fable instance as a CLOSE PRECONDITION | BI.W-GESTALT-LEDGER-FILE | **ORPHANED** | same as H-8 — the PASS oracle is unfilled; no DesignSync receipt bound to the cut. |
| PE-COMPOSITED (GA-2) | composited-whole dominant-hue paint gate over a route region | B10 (BI.W-AXES-GATES) | **ORPHANED** | no composited-hue gate in `scripts/verify.mjs` invariants nor release path; warm-identity convergence never measured at cut. |
| H-9 | profile:budget FAILS while cut claims ready; rebaseline blob ceiling | BI.W-BUDGET-REBASELINE | **ORPHANED / UNVERIFIED** | `scripts/profile-bundle.mjs` exists but is not in any CI/release gate; no BI budget baseline committed (only historical AP/BD/BG baselines). The blob-gzip-129% ceiling has no recorded resolution. |
| E-1 masking sweep | W-MASKING-OWNER-RESOLVE + broad-sweep | BI.W-AXES-GATES | **ORPHANED** | see §1 E-1 — manifest unwired. |
| H-12 / LEDGER-1/2 | ledger true-up + trigger-fired liveness probes (structure≠liveness) | BI.W-LEDGER-DETECTOR-HARDEN | **ORPHANED / UNVERIFIED** | no liveness-probe harness in the shipped verifier; the ledger's own owner-map (§0) is the live example of structure-recorded-but-not-live. |
| Decision-0 | HOLD 5.0.0; ship exactly ONE cut at the BI close | B10 | **VIOLATED** | `git tag --merged HEAD` → **both** `v5.0.0` and `v6.0.0`; CHANGELOG carries a third "7.0.0 (unreleased)" section. Three cuts, not one; the hold was not held. |
| EXEC-READINESS release contract | 134 rows terminal + FINAL + 9 ACKs + 2 clean passes before release | B10 | **VIOLATED** | P002-P133 = PLANNED (§0); no BI FINAL.md; no committed convergence-pass digests; yet published. |

---

## 3. DISEASE rows (§H) — the ≥2-close chronics

| # | disease | owner | verdict | evidence |
|---|---------|-------|---------|----------|
| H-1 | dock band greenfield from iOS-27 first principles | BI.W-DOCK-SPINE | **PARTIAL** | dock is incrementally repaired, not ground-up rebuilt: `70a7be9a make morph geometry and CTA receipt measurable`, `e3a10ab8 seed collapsed morphing from tap-floor`, `95b0d20f close active fans without reopening`, + 7.0.0 prune of DockSection/DockStack/fisheye. 44 files under `src/components/dock/` retaining GlassDock/DockLayerGroup/DockCrossfade — an evolution of the pre-existing architecture, no greenfield commit. |
| H-2 | paint-verify never blocks the tag | BI.W-PI-IN-CLOSE | **ORPHANED** | §2 H-2. |
| H-3 | goo-blob→blob rename DONE-but-UNEXECUTED | BI.W-BLOB-RENAME-LAND | **DELIVERED** | dir is `src/components/blob/` (no `goo-blob` dir); no `./goo-blob` subpath in package.json. The lie is cured. Residual: 15 `goo-blob` *comment* refs (E-5 cosmetic). |
| H-4 | no-god-module ratchet regrowth (C-ENCAP) | BI.W-ENCAP-REDRAIN / W-STYLE-REDRAIN | **PARTIAL / regrown** | old offenders drained (surfaces/dark-arm/segmented-tabs/DockLayerGroup/GlassDock all now <500) but **9 files still >500L**, several new/worse: `src/components/slider/Slider.vue` 641, `src/components/aurora/composables/atoms.ts` 592, `src/components/pager-dots/PagerDots.vue` 580, `.../blob/composables/useMetaballRenderer.ts` 547, `.../easing/EasingPicker.vue` 541, blob shader strings 537/527, `aurora/composables/runtime.ts` 520, `dock/styles/shell.css` 505. The class is not structurally held. |
| H-5 | Safari parity never verified | round-2 + B3 | **ORPHANED** | zero Safari commits in base..HEAD; no Safari gate/artifact in the shipped tree (only historical BC/BD/BE/BF audit docs). UF-C3/C5 ("morph does not work at all in Safari") carry no BI-era verification. |
| H-6 | "No gray" recurring | B2 D-GLASS | **PARTIAL / UNVERIFIED** | glass substrates simplified structurally (§4); no gray/entrance paint verification (H-2 absent). UF-E10 palette-derived entrance owner `BI.W-E10-AURORA-ENTRANCE.md` is a spec only. |
| H-7 | viz condemned after 30+ attempts | BI.W-VIZ-DELETIONS + BI.W-FOURIER-RIBBON | **DELIVERED** | `src/components/` has no dot-flow/concentric/dot-matrix (deleted per UF-E8); fourier rebuilt with first-principles ribbon: `src/components/fourier-field/shaders/fourier-field.ribbon.ts` + compute/render WGSL. |
| H-8 | PE-GESTALT acceptance ledger zero-filed | BI.W-GESTALT-LEDGER-FILE | **ORPHANED** | §2 H-8. |
| H-9 | profile:budget FAILS while cut claims ready | BI.W-BUDGET-REBASELINE | **ORPHANED** | §2 H-9. |
| H-10 | dock dead-engine decide (5 springs, 2 morph, silhouette) | B3 + B9 | **PARTIAL** | `BI.W-DOCK-SPRING-UNIFY.md` spec exists; 7.0.0 CHANGELOG prunes fisheye + DockSection/DockStack; `useDockContextSilhouette` decision not confirmed at HEAD. |
| H-11 | persistent ℱ brand section removal | B3 D-DOCK | **DELIVERED** | `demo/shell/SidebarDock.vue:119` "the persistent ℱ brand wordmark is GONE (BG.W-DOCK-PERSISTENT-CUT)". |
| H-12 | bookkeeping-drift (structure≠liveness) | BI.W-LEDGER-DETECTOR-HARDEN | **ORPHANED** | §2 H-12. |

---

## 4. What the conventional band DID deliver (spot-check, ~20 rows across B0-B8)

| id | ask digest | owner band | verdict | evidence |
|----|-----------|-----------|---------|----------|
| UF-D1 | scroll progressbar thinner/rounded/rimmed | B0 | **DELIVERED** | `698c2b1d extract the public masked progress primitive`, `d87d0bd1 keep the radius-following band visible`; `ScrollProgressRim` in CHANGELOG 7.0.0. |
| UF-B2 | glass-panel superseded; prune | B2 | **DELIVERED** | no `glass-panel` dir; substrates reduced to `card` / `surface` / `paper-backdrop`. |
| UF-B1/B5 | grand glass-substrate simplification | B2 (BI.W-GLASS-DEDUP) | **DELIVERED (structural)** | substrate census collapsed to 3 dirs above; `b65a5d93 one interaction lens`, `aa34d832 formalize elevation and live backdrop provenance`. |
| UF-J5 | Escape global single-winner | B0 | **PARTIAL** | specs `BI.W-ESC-STACK.md` + `BI.W-DOCK-ESCAPE.md`, test `tests-visual/esc-stack.spec.ts`; `behavior.focus-escape` invariant; commit `95b0d20f` (fan focus restoration). Delivery plausible, not paint-confirmed. |
| UF-F3 | code blocks sized + highlight.js-themed | B6 (BI.W-CODEBLOCK) | **DELIVERED** | `demo/chassis/code/hljs-house-theme.css`, `useCodeHighlight.ts`, `CodeBlock.vue`. |
| UF-E8 | delete dot-flow/concentric/dot-matrix | B5 | **DELIVERED** | absent from `src/components/` (see H-7). |
| UF-E6/E7 | fourier reworked from first principles | B5 | **DELIVERED** | `fourier-field.ribbon.ts` (see H-7). |
| UF-I1 | carousel greenfield + dot→dot morph | B4 | **DELIVERED** | `src/components/carousel/{Carousel,CarouselPager,CarouselContent}.vue`; `pager-dots/composables/usePagerWorm.ts`. |
| WS5-02 / H-3 | goo-blob→blob rename land | B5 | **DELIVERED** | see H-3. |
| UF-K3 | remove /compositions/math-paper | B8 (BI.W-MATH-PAPER-REMOVE) | **DELIVERED** | no math-paper source/demo file at HEAD (only historical audit PNGs in docs). |
| UF-J4 | BorderProgress retire / bottom-edge | B0/B8 | **DELIVERED** | 0 files at `HEAD:src/components/border-progress`; not in package.json exports; `BI.W-BORDER-PROGRESS-RETIRE.md`. |
| WS4-06 / C-DESHADCN | de-shadcn form | LANDED | **DELIVERED** | `architecture.clean-break`/`present-tense-source` invariants; retained from prior. |
| WS3-04/05/06 | glass first-class at root; surface axis; lensing | LANDED | **DELIVERED** | `surface` primitive + material-hierarchy invariant; `8e052be8 make backdrop and layer ownership explicit`. |
| MS2-MS8 | structure flatten / colocation | B9 | **DELIVERED** | `ea3c002c ms2`, `9a8761f0 ms4 flatten`, `bba7b51d ms5`, `bb5c1e5c ms6`, `4bf29831 ms7 CSS colocate`, `f1acf31f ms8 demo rehome`. |
| WS5-16 | constellation first-class primitive | B5 | **DELIVERED** | `7edb2f97 converge on shared Canvas2D lifecycle`, `efae1ea6 name the constellation interaction switch`. |
| UF-A6 | rose badge optical centering | B0 (BI.W-BADGE-ALIGN) | **UNVERIFIED** | `src/components/badge/Badge.vue` present; optical fix not confirmable without paint. |
| UF-J2 | grain Switch dead ref | B0 (BI.W-GRAIN-WIRE) | **UNVERIFIED** | `src/styles/glass/grain-overlay.css` present; the specific dead demo-control wiring not confirmed. |
| UF-G8 | command palette jitter (scrollbar-gutter) | B0 (BI.W-COMMAND-JITTER) | **UNVERIFIED** | `src/components/command/*` present; gutter fix not paint-confirmed. |
| WS4-16/17 | prune orphans; repatriate speedtest metrics | B8 | **PARTIAL** | `c0577fba retire owner-internal members`, `e5164e51 retire false stacked-icons`; speedtest metrics-transfer (STRUCT-8/UF-K1) is a foreign-tree ASK relay, unverifiable here. |
| WS4-18 | restructure storybook sidebar IA | LANDED | **DELIVERED** | `d97e2a05 give display roles and accent rails one semantic owner`; demo IA under `demo/chassis/`. |

Spot-check reads as **broadly healthy** for B0-B8 mechanism-local + prune + structure work.

---

## 5. ORPHANED design directive not in §H (surfaced by this audit)

| id | ask digest | owner | verdict | evidence |
|----|-----------|-------|---------|----------|
| §C / UF-H1 | iOS-27 eye-glass tabs select effect → make it the DEFAULT tabs option; cull variants | B1/B7 (tabs) | **ORPHANED** | shipped `src/components/tabs/index.ts:2` declares variants **`pill` (default) · `underline`** only — no eyeglass variant. `grep -rn eyeglass src/` = 14 hits, all the unrelated `eyeglass` **spring-preset** name (`springPresets.ts`, `useLeadTrail.ts`), none in `src/components/tabs/`. A full research→plan→tranche directive (W-EYEGLASS-TABS, 54KB) left no trace in the shipped Tabs. |

---

## 6. Governance note (not a row, but load-bearing)

`scripts/verify.mjs` is a **tranche-state / transaction verifier** keyed to the P-graph receipt
protocol (`--wave-from-commit HEAD`, `authoritativeBootstrapContext`, `validateFormationTreeClosure`).
It runs in `.github/workflows/ci.yml:22` on push to master. Because conventional commits carry no
wave id and P002-P133 are PLANNED, the CI verifier's semantics on the shipped lineage are
questionable (either degraded-to-vacuous or divorced from the actual work). The 40-invariant
abrogation is real and correct in shape, but **it never became a wired product/paint gate** —
it validates tranche bookkeeping, not rendered behavior. This is the mechanism behind every
ORPHANED close-band row: the design asks were folded into wave *specs* that a dead protocol was
supposed to execute, and the conventional band that replaced it shipped without the close battery.

---

*Verification complete. DELIVERED: gates-abrogation, CLAUDE.md-delete, tailwind-first, blob-rename,
viz-prune/fourier-ribbon, glass-dedup, brand-cut, carousel/pager-worm, structure-flatten, and the
B0-B8 mechanism/prune sample. ORPHANED/VIOLATED: the entire close/acceptance battery (paint-in-close,
gestalt-ledger, budget-rebaseline, masking-sweep, ledger-liveness), the demo no-meta edict,
god-module regrowth, Safari parity, the eyeglass-tabs directive, and Decision-0's single-cut hold.*
