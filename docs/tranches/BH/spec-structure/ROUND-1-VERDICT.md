# ROUND-1 VERDICT — The Constellation Structure Standard

**Synthesizer:** agglomerating close, round 1. **Convergence floor:** 60%.
**Verdict:** **STEER TO ROUND 2.** The spec's *spine* is sound and proto-proven; its *load-bearing joints* fail decidability at three points, proportionality at two, and its flagship worked example (Appendix A1) is factually wrong on 7 of 8 folds — independently verified below. Convergence clears the 60% floor (60/62/60/62) but only just, and every lens ships the same core blocker set. The canonical `STRUCTURE-SPEC.md` folds in every blocker with a clear answer; the genuinely contested matters become round-2 directives.

---

## Scores

| Lens | Convergence | One-line |
|---|---|---|
| aristotelian-proportion | 60% | Framework sound (two-vices law, local-until-shared spine, recursion-resets-depth); load-bearing thresholds not decidable (T3, line-count) and the flagship mis-applies the divining rod. |
| performance-mechanics | 62% | Subpath-decouples-path + single-manifest-preserves-order + flatten-is-depth-neutral all proto-confirmed; §2.6 CSS move and §2.5 re-export mechanic break the publish/bundle as written. |
| migration-enforcement | 60% | Clean-break compliant, codemod feasible on the import axis; the enforcement corpus is physically coupled to the tier it locks and the migration is not sequenced atomically. |
| dx-readability | 62% | FLATTEN direction right; the *readability mechanism* for 92 flat peers is deferred, un-gated, and the navigation aid (README) mostly doesn't exist yet. |

---

## The verified-fact ledger (independent ground-truthing)

I re-checked every contested factual claim against the real tree rather than trusting the protos — one proto claim was false and it changed the flagship verdict.

| Claim | Source | Verdict | Evidence |
|---|---|---|---|
| `morphSignatures` does not exist | proto 1 | **FALSE** | Lives at `src/composables/motion/morphSignatures.ts`; `MORPH_SIGNATURES` real-imported by sibling `useGooMorph.ts` (line 43) + root barrel `src/index.ts` + `motion/core/index.ts`. |
| A1: "all 8 dock-only composables fold into dock/" | ROUND-1-SPEC §A1 | **FALSE, 7 of 8** | Only `useDockCtaReceive` folds (see adjudication below). |
| `useScrollTo` is dock | §A1 | **FALSE** | `src/composables/sidebar/useScrollTo.ts` — a SIDEBAR-family leaf, composed by sibling `useClickDelegate.ts`/`useLazyLoader.ts`. |
| The house line-gate counts *logic* lines | §1.4 | **FALSE** | `proof-no-god-module.mjs:76` counts `source.split("\n")` = RAW lines; RATCHET_BASELINES keys are raw counts. |
| `proof-colocation` hard-roots at the tier | perf/migration | **TRUE** | `resolve(SRC,"components/custom")` (line 37), `readdirSync(CUSTOM)` (line 60), + literal `components/ui/carousel` refs. |
| 229 gate scripts / 861 literal tier refs | migration | **TRUE (exact)** | `grep -rlE 'components/(custom|ui)' scripts/` = 229 files, 861 lines. |
| CSS publish = wholesale `cpSync(src/styles → dist/styles)` + live `./X.css` @imports | performance | **TRUE** | `vite.style-fold.ts:97`; every `index.css` rung is `./border-progress.css` etc.; `injectWebkitBackdrop`/`inlineFonts` are `readdirSync(distStyles)`-coupled. |
| `@glass/*` alias covers 891 src+demo sites depth-independently | migration | **FALSE for src** | `@glass/*`→`./src/*` defined (tsconfig:18) but src uses it **0×** (all relative imports); demo uses it **170×**. The import-mechanism is SPLIT: relative-in-src, aliased-in-demo. |
| `tabs` collides across tiers | migration/dx | **TRUE** | Both `src/components/ui/tabs` and `src/components/custom/tabs` exist. |

### A1 re-adjudication (the verified census)

| Leaf | Home today | Real consumer picture | Verdict |
|---|---|---|---|
| `useDockCtaReceive` | motion/ | dock-purpose; the sibling `useBloomUp`/`useElementMorph` references are COMMENTS, not imports; dock already re-exports it | **FOLDS into dock/composables/** ✓ |
| `morphSignatures` | motion/ | `MORPH_SIGNATURES` imported by sibling `useGooMorph` + root barrel | STAYS shared |
| `useScrollTo` | sidebar/ | sidebar-family leaf composed by sibling sidebar leaves | STAYS in sidebar |
| `useLiquidReveal` | motion/ | bloom-family root; on `/motion` + `/api`; dock is one of ≥2 reaches | STAYS shared |
| `useScrollTrigger` | motion/ | composed by sibling `scrollReader.ts` + `useScrollChrome.ts` | STAYS shared |
| `useScrollChrome` | motion/ | on `/api`; scroll-reader family with useScrollTrigger; only dock/useDockSearch is a src consumer | STAYS shared (borderline) |
| `useBloomUp` | motion/ | app-global demo `AppShell.vue` route bloom + composed by sibling `useElementMorph` | STAYS shared |
| `useGlassBackdropLuminance` | glass/ | glass adaptive family; composed by sibling `ambientHueHistogram`/`backdropSampleMath` | STAYS shared |

**The flagship pointed the wrong way.** Exactly one of its eight prescribed folds is legal; the other seven would bury a general/sibling-owned/app-global primitive inside one consumer — the atomization-by-misplacement vice the spec exists to forbid. This is the round's single most important finding: it proves T3's naive family-grep is not a gate.

---

## The decisive blockers

### SETTLED — folded into `STRUCTURE-SPEC.md` this round

- **B1 · A1 re-authored on the verified census.** Only `useDockCtaReceive` folds; the other seven are named STAYS-SHARED with their reason (composition-chain / app-global / sidebar-family).
- **B2 · T3 made decidable.** The family count now specifies its inclusion/exclusion set: INCLUDE composition edges (a leaf composed by a sibling shared leaf belongs to that leaf's shared family → stays shared) and demo/sibling-app usage (app-global stays shared); EXCLUDE provide/inject DI plumbing (proto3 `useGeolocation`) and root-barrel/aggregator re-exports. Overriding rule: **a shared leaf composed by a sibling shared leaf OR used app-globally STAYS shared regardless of component-family count.** G1 ships these as self-test bites.
- **B3 · The §2.5↔G4 contradiction resolved.** The boundary model gains a 4th DAG node: `shared → components → subpath-entries → app`. The curated subpath-entry layer (`src/*.ts`: index/motion/dark/keyboard/...) is EXEMPT from the shared→components prohibition — it alone may reach both directions. proto1 proved this is the only shape that compiles.
- **B4 · Re-exports target the deep LEAF.** Cross-tree/subpath re-exports import the deep colocated path (`export { X } from '../components/dock/composables/X'`), never the component's `index.ts` barrel (which would drag GlassDock + sub-components + shaders into `/motion`). §2.1's barrel-only rule carries this explicit exemption for the subpath-entry layer.
- **B6 · Enforcement migrates atomically.** The flatten wave carries a mechanical enforcement-corpus codemod (re-root `proof-colocation`, drop-segment the 861 literal paths, rewrite RATCHET keys) landing in the SAME wave, + a meta-gate asserting zero surviving `components/(ui|custom)/` literal in `scripts/`. §7's "zero churn" corrected to "zero EXPORT churn; ~230-gate + ~700-file INTERNAL churn."
- **B7 · Line-count pinned to RAW.** §1.3/§1.4 reconciled to the house `split("\n")` raw count; the §8 ratchet baselines are raw and untouched; no logic-line re-derivation.
- **B8 · G4 is a `proof:*` gate, not ESLint** (zero ESLint exists repo-wide; the house locks structure with device-free proof scripts + self-test bites).
- **B11 · §5.1 backend carve.** Distinguish "layer-by-type of DOMAIN LOGIC" (the vice) from a "thin cross-cutting infra ring / adapter kernel around vertical domains" (legitimate — the FE `_shared/` analogue: middleware/, a shared transport core/, a uniform repository base). Named by proto3 (middleware/logging/events) + proto4 (floridify api/core kernel).
- **B12a · Flatten navigation ruled.** Flat peers + a MACHINE-LOCKED `components/README.md` domain-map (the `proof:claude-structure-sync` pattern: every `components/*` dir appears in the map and vice-versa). reka-at-78-flat is the SOTA precedent. The heterogeneity caveat (a 2-file `avatar/` beside a 17-file WebGL `aurora/`) is carried to round 2 as an evidence item, not a re-open of the flatten.

### CONTESTED — round-2 directives

- **B5 · CSS colocation breaks the publish bundle.** §2.6's physical move dangles the @import into the `.d.ts`-only `dist/components/` mirror. Canonical spec sets the CONSERVATIVE default: **documented-ownership** (CSS stays physically at its `src/styles/` rung; a README OWNER field + a `proof:css-ownership` gate name the sole owner) — the zero-risk shippable state. Round 2 decides whether to make the colocation-faithful build change (extend `copyStyleAssets` to walk `src/components/*/styles/` into a dist-resolvable path + rewrite the @import + extend the webkit/font/minify post-process fleet) — which must be PROTOTYPED and the shipped `/styles` diffed byte-for-byte before adoption.
- **B9 · tabs collision.** Canonical spec RULES fold the reka `ui/tabs` primitives INTO `components/tabs/` as internal sub-components (the spec's own recursion model), lone consumer `DockLayerGroup` repaths — but flags it a round-2 confirm since it is an authored design decision, not a mechanical move.
- **B10 · The 500 ceiling escapes cohesion downward but not upward.** The RATCHET_BASELINES mechanism is the house's registered-draining over-ceiling escape today (split-anyway-with-rationale). Round 2: does a genuinely single-responsibility over-500 class earn a PERMANENT complexity-gated exemption (mccabe/PLR0915 per proto4) measured against the god-FUNCTION rather than file length?
- **B12b · `mixed-kind` excess heuristic (§1.4).** Not mechanically decidable from filenames. Round 2: sharpen to a checkable predicate (barrel-presence / homogeneous-folder-kind) OR concede it is an advisory human-review flag, not a gate.
- **B13 · §4 is storybook-only; the scope claims every constellation app.** Round 2 owes a §4-PRODUCT twin (router/ views/ stores/ layouts/ server/) unified on the feature-slice spine (proto3 G1). Without it, consumer apps re-fracture the "one coherent spec."
- **Chunk-graph churn is unmeasured.** `profile:budget` per-entry gzip ceilings are a close-battery gate; any fold adding a second entry-reach re-hoists rollup shared chunks. Round 2 must MEASURE the delta in a full worktree build before execution.

---

## What the prototypes proved / disproved

**Proved (positive):**
- **The §2.5 orthogonality is real and buildable** — proto1 folded `useDockCtaReceive` end-to-end (typecheck GREEN, colocation gate PASS, zero export-surface change). The subpath layer genuinely decouples physical path from public path.
- **The full flatten typechecks GREEN** — proto2 mechanically flattened all 93 families via resolve-and-recompute (500 files / 1007 import lines), 0 vue-tsc errors; it also validated the reka-78-flat precedent against the installed dep.
- **The grammar transposes to backend** — proto4 built a clean 27-file Python service, the gate greened by construction, and it caught 8 real violations + 35 warnings on floridify (the domain-vertical / no-grab-bag / promote-at-≥2 / recursion-resets-depth grammar is language-neutral).
- **The grammar transposes to a product app** — proto3 mapped speedtest with 8 clean transposes; the feature-slice IS the universal unit; T3 discriminated correctly on live data (`useShareResult`→fold, `useRouteTransition`/`useIPInfo`→keep).

**Disproved / corrected:**
- proto1's `morphSignatures`-is-absent claim (it exists; changed the A1 verdict).
- migration lens's "@glass covers 891 src+demo sites" (src uses it 0×; the migration instrument is a HYBRID — resolve-and-recompute for src relative imports, `@glass` segment-drop for demo).
- "pure move, zero churn" (true on the export axis only; ~700-file + ~230-gate internal churn).
- T3 "machine-checkable via the naive family-grep" (the flagship itself is the counter-example).

---

## The bones are excellent

The two-vices framework (guarding god-module AND atomization with equal weight), the local-until-shared spine, the recursion-resets-depth mechanism, the FLATTEN verdict, and the location-vs-publish orthogonality are all sound and factually verified. The failures are in the load-bearing joints — the flagship, the T3 gate mechanics, the §2.5↔G4 boundary model, the CSS publish path, and the enforcement-migration sequencing — every one of which now has either a folded resolution or a sharp round-2 directive. Steer, don't ship.
