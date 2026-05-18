# Q.Rδ — Legacy + workaround sweep (post-P)

**Lane**: Q round-1 audit δ — legacy code + workaround / quick-fix / fall-through / defensive-bail detection.
**Mode**: READ-ONLY. No source mutations. No mutating git. Planning-phase report.
**Scope window**: `9f774b4..HEAD` (P close → Q open) — the 7-commit post-P shadow cohort + P-era residual re-verification.
**Date**: 2026-05-18.

---

## §1 — Scope

Three audit angles per the Q.Rδ dispatch:

1. **Post-P legacy sweep** — every `legacy|workaround|hack|fixme|todo|temporary|for now|deprecated|fallback|fall-through|defensive|bail` hit in `src/` + `scripts/`, classified, with focus on code touched by the 7 post-P commits.
2. **P-era residual verification** — re-audit 3 P-FINAL.md "ADDRESSED" dispositions that are workaround-suspects: the heap-bump bake (P.W4 Lane A Path B), the `@mkbabb/value.js` devDep (P.W5), and the 3 P.W4 Lane B inline-absorb gate fixes.
3. **Post-P shadow-cohort idiomatic check** — per Q5 (no workarounds) + Q7 (architectural transposition): did the 7 commits land idiomatic gestalt fixes or quick patches?
4. **Defensive-bail + fall-through audit** — silent-swallow `catch`, defensive `??` / `|| {}` defaults; cross-referenced against O invariant 24 (fail-explicit).

The 7 post-P commits: `949474a` (freshness retirement), `099d51e` (dock edge-fade mask), `3cb70db` (timeline gradient), `beec35e` (toggle card variant + dock layer hit-test), `9ba68ca` (metric-stack result register), `1c6c3e5` (data-table responsive), `d244dd5` (metric-stack label clamp).

---

## §2 — Post-P legacy sweep — per-hit classification table

The keyword sweep returned ~95 hits across `src/` + `scripts/`. The overwhelming majority are `fallback` as a noun in legitimate token-resolution / SSR-guard / no-backdrop-filter-`@supports` contexts (e.g. `useTokenColor`, `BouncyToggle.readToken`, `glass-panel--fallback`, the typography calibrated-fallback faces, `AvatarFallback` the reka-ui primitive). Those are **befitting-fallback** by design — the platform genuinely has two code paths and the fallback is the documented graceful-degradation rung. Below are only the hits that warrant classification, with the post-P-touched ones flagged.

| Hit | File:line | Classification | Post-P-touched | Note |
|---|---|---|---|---|
| `legacy` in nested-subpath retire comment | `src/dark.ts:7`, `src/keyboard.ts:6` | cosmetic-comment | no | "L invariant 4 retires the nested form with no legacy alias" — describes the *absence* of legacy, idiomatic. CLEAN. |
| `legacy` execCommand fallback | `src/composables/dom/useClipboard.ts:6` | befitting-fallback | no | `execCommand("copy")` is the genuine pre-`navigator.clipboard` path; documented two-tier. CLEAN. |
| `legacy consumers` event surface | `timeline/__tests__/continuous-structural-split.test.ts:154` | cosmetic-comment (test) | YES (`3cb70db` cohort area) | "so legacy consumers see the same event surface" — describes the `disablePopover` bare-fallback emitting the same `hover`/`hoverEnd`. Naming nit only; the path is a real API-compat surface, not dead code. **Cosmetic — see §6 R1.** |
| `LegacyMediaQueryList` type | `src/composables/motion/useRAFLoop.ts:53,221` | befitting-fallback | no | `addListener`/`removeListener` shim for Safari < 14 `MediaQueryList`. Genuine platform-API legacy; correctly typed + isolated. CLEAN. |
| `.dock-layer` "legacy rules" | `src/styles/dock.css` (`beec35e` body) | **quick-fix-debt (DUPLICATION)** | YES (`beec35e`) | `beec35e` commit message: "Both `.dock-layer-item-host` and the legacy `.dock-layer` rules now set `visibility:hidden`". Two parallel rule-sets express the **same** layer-active/inactive contract. See §4 + §6 R2. |
| `Defensive cleanup` mid-drag | `src/composables/sortable/useSortable.ts:595` | befitting-defensive | no | Scope-teardown cleanup; real lifecycle hazard. CLEAN. |
| `defensive zero-guard avoids NaN` | `src/components/custom/timeline/geometry.ts:82` | befitting-defensive | YES (`3cb70db` touched this file) | `totalWeight` returns `≥1` to guard a `width/totalWeight` divisor. The comment itself flags "the template's `v-if` already short-circuits" — i.e. the guard is belt-and-suspenders. Idiomatic for a pure geometry fn reused outside the SFC. CLEAN. |
| `defensive` shader-compile guards | `frostShader.ts:145`, `useMetaballs.ts:168-182` | befitting-defensive | no | `return null` after `compileShader`/`linkProgram` — comment explicitly says "caught upstream — defensive (throws on COMPILE_STATUS=false post O.W1 Lane B)". Pre-O these were silent bails; O.W1 made them throw upstream and demoted these to documented redundancy. CLEAN. |
| `release.sh` "defensive build" | `scripts/release.sh:28,34,67,105` | cosmetic-comment | no | `prepublishOnly` re-runs build; "defensive build redundancy with documented rationale". The word `legacy` at :67 describes the *prior* release flow being superseded. CLEAN. |
| `fall through to n-gram path` | `typewriter/composables/useTypewriter.ts:91` | befitting (FSM) | no | FSM branch comment; genuine state-machine flow, not a bail. CLEAN. |
| `fall through to the unpatched root` | `src/styles/dock.css:75` | cosmetic-comment | no | Describes the *bug that V.W3.T1 fixed* (comfortable density rung). Historical; CLEAN but see §6 R3 (verbose post-hoc archaeology). |
| `fall-through to default-tier` | `cartoon-card/CartoonCard.vue:10` | befitting-fallback | no | Token cascade `--glass-{bg,blur,border}-cartoon` → default tier. Idiomatic token fall-through. CLEAN. |
| `Token fall-through to quiet-tier` | `src/styles/glass.css:103` | befitting-fallback | no | Same pattern. CLEAN. |

**Genuine-legacy count**: 0. **Quick-fix-debt count**: 1 (`.dock-layer` vs `.dock-layer-item-host` duplication — pre-existing, *amplified* by `beec35e`). **Befitting**: the remainder. **Cosmetic**: 3 verbose-archaeology comments.

No new `TODO` / `FIXME` / `HACK` / `XXX` / `@deprecated` markers were introduced by any of the 7 post-P commits. The sweep returned zero literal `TODO`/`FIXME`/`HACK` tokens in `src/` or `scripts/` at HEAD.

---

## §3 — P-era residual verification

P FINAL.md §8 declares **zero P-residuals**. Three "ADDRESSED" dispositions were re-audited as workaround-suspects.

### 3.1 — Heap-bump bake (Pε-2 / P.W4 Lane A Path B)

**P FINAL claim**: Pε-2 "Heap-bump workaround → ADDRESSED — baked into `package.json.scripts.build` (Path B)". §3 audit-matrix: "heap-bump bake VERIFIED".

**HEAD state**: `package.json:358` — `"build": "NODE_OPTIONS=--max-old-space-size=8192 vite build"`.

**Verdict — DOCUMENTED BASELINE, not a lingering workaround. P framing HOLDS.** CLAUDE.md §Build carries a full root-cause paragraph: the 44-entry `vite-plugin-dts` matrix runs `api-extractor` per entry with `rollupTypes:true`; the per-entry type-graph walk peaks at ≈6.7 GB RSS, exceeding Node's 4 GB default heap. P.W4 profiling attributed the allocation to TypeScript + api-extractor (≈408 MiB sampled). The bump is the **single canonical site** — it replaced the prior pattern where `release.sh` + `ci.yml` each layered the env-var on top of `npm run build`; consumers + CI now inherit it. CLAUDE.md even names the retirement condition (an upstream incremental-rollup fix in `vite-plugin-dts ≥ 5.x`). This is the idiomatic shape for an unavoidable toolchain memory characteristic: root-caused, single-sited, documented, with a named exit. **Not a workaround. CLEAN. No Q action.**

### 3.2 — `@mkbabb/value.js` devDep (P.W5 follow-on)

**P FINAL claim**: "@mkbabb/value.js test-time devDep declaration → ADDRESSED — declared at glass-ui devDep. Note: Test-runner stability against keyframes.js@2.1.0's transitive resolution."

**HEAD state**: `package.json:400` — `"@mkbabb/value.js": "file:../value.js"` in `devDependencies`. Sibling: `"@mkbabb/keyframes.js": "file:../keyframes.js"` at :399 (peer dep `^2.0.0`, ALSO `file:`-linked for dev).

**Verdict — BAND-AID SUSPECT; framing does NOT fully hold. Flag for Q.** Two concerns:

1. **The stated rationale is a transitive-resolution patch.** The FINAL.md note says the devDep exists for "test-runner stability against keyframes.js@2.1.0's transitive resolution" — i.e. `keyframes.js` imports `value.js`, and under the `"development"` conditional-export branch (which resolves to `src/`) the test runner could not resolve the transitive `value.js`. Declaring `value.js` as a glass-ui *direct* devDep so the runner finds it is **papering over a transitive-dependency resolution gap** — the canonical fix is for `keyframes.js` to declare its own `value.js` dependency correctly (or for the dev-condition resolution to walk the real graph), not for the *grand-parent* (glass-ui) to hoist its grand-child's dependency into its own manifest. This is a classic phantom-dependency workaround.

2. **`file:../value.js` is a local-path link, identical to the `file:../keyframes.js` form.** That makes the glass-ui test suite non-reproducible off the author's machine — a CI checkout or a fresh clone has no `../value.js` sibling. `949474a`'s commit body itself records the symptom: "test 364/364 passed (jumped from 122 — was being blocked by pre-existing keyframes.js/value.js resolution issues)". The resolution issue was *worked around*, not root-caused. **This is the strongest single workaround-debt finding in the post-P window** — and it sits at the exact `keyframes.js` / `value.js` seam the Q-open directive names as "totally broken". See §6 R4.

### 3.3 — The 3 P.W4 Lane B inline-absorbs

**P FINAL claim** (§2 W5 follow-on): "P.W4 Lane B inline absorbs (3 stale gates: probe.ts drift + blur-glass-subtle expectation + DockTabButton scoped style) → ADDRESSED inline at W4 Lane B."

Re-audited each at HEAD:

| Inline absorb | File:line | Verdict |
|---|---|---|
| **probe.ts drift** | `scripts/proof-package.mjs:154-166` | **CLEAN.** The probe was updated to the L.W1 vueuse-FREE root-barrel shape (`useGlobalDark` via `/dark`) and the phantom `DockPopover` reference was replaced with the real `DockDropdownTrigger`. The probe now verifies the *actual* published surface. This is a correctness fix, not papering — the prior probe was testing a phantom. CLEAN. |
| **blur-glass-subtle expectation** | `scripts/proof-theme-style.mjs:47-52` | **CLEAN.** `blur-glass-subtle` was a pre-L.W1 utility retired when the 5-rung glass-blur ladder shipped at v1.0; the proof now asserts the canonical `blur-glass-resting` rung. The proof was stale relative to the shipped substrate; correcting the expectation is the right move. CLEAN. |
| **DockTabButton scoped style** | `src/components/custom/dock/DockTabButton.vue:46-52` | **CLEAN.** The prior per-SFC `<style scoped>` block migrated to `src/styles/dock.css` (`.dock-tab-button` rule); the comment documents the migration and the density-keyed `--dock-tab-h` token fallback chain at the canonical dock-styles home. This is co-location *toward* the canonical site — exactly the Q9 cohesion direction. CLEAN. |

**Verdict — all 3 inline absorbs are clean fixes, not papered-over.** They were genuine drift corrections (stale proofs / a migrated style block), each moving the substrate toward canonical shape. P framing HOLDS for §3.3.

---

## §4 — Post-P shadow-cohort idiomatic check

Per Q5 (no workarounds) + Q7 (architectural transposition for elegance). Each commit's diff was read in full.

| Commit | Idiomatic verdict | Rationale |
|---|---|---|
| `949474a` freshness retirement | **IDIOMATIC — gestalt** | A −342 LOC *deletion*. The freshness apparatus predated the `"development"` conditional-exports branch; with dev consumers resolving to `src/` directly a stale `dist/` cannot mislead them, so the runtime gate is dead weight. Removed at the root (helper + 3 scripts + test + subpath + `prebuild` script + vite entry). Net public-surface shrinkage. This is the textbook Q7 architectural transposition — retire the apparatus when the platform idiom subsumes it. CLEAN. |
| `099d51e` dock edge-fade mask | **IDIOMATIC — gestalt** | Retires a `mask-image` scroll-feather left over from the retired `overflow:auto` era. Commit reasoning is exemplary: a scroll feather on a surface that never scrolls is "pure cosmetic damage", removed "at the root for both axes rather than have each consumer mask the symptom". `--mask-fade-width` is *kept* because `utilities.css` still consumes it for genuine scroll-masks — no over-deletion. CLEAN. **Directly addresses the Q-open "dock items broken" report** (the mask bled a transparent ramp onto the last dock control, reading as a stray shadow). |
| `3cb70db` timeline stitched gradient | **IDIOMATIC — gestalt** | Replaces per-region `{from,to}` gradients (a hard seam at every phase boundary, contradicting the `continuous` variant name) with one rail-spanning stitched gradient windowed per-region via `background-size`/`background-position`. Dead `continuousRegionBackground` removed. Dot becomes a real glass primitive with 4 CSS-var knobs (no `:deep` reach). All new knobs are tokens. Tests added (`continuous-stitched-gradient.test.ts`). This is a conceptual-model correction, not a patch. CLEAN. |
| `beec35e` toggle card + dock hit-test | **MIXED — toggle arm IDIOMATIC; dock arm has DUPLICATION debt** | **Toggle arm**: the `card` variant lost its fixed `h-10` clamp via a `compoundVariants` rule re-asserting `h-auto` — this is the *canonical CVA mechanism* for resolving a cross-axis source-order race (compound classes emit last). Idiomatic. **Dock arm**: `visibility:hidden` for inactive layers (out of hit-test, kept in layout flow for FLIP measurement) is the correct fix — `opacity:0` alone left a dead control answering `elementFromPoint()`. BUT the fix was applied to **two parallel rule-sets** — `.dock-layer-item-host` *and* the "legacy `.dock-layer`" rules — both expressing the identical active/inactive/leaving contract. The commit message itself calls one set "legacy". Fixing a bug in two copies of the same rule is quick-fix-debt: the root issue is the un-consolidated duplication. See §6 R2. |
| `9ba68ca` metric-stack result register | **IDIOMATIC** | Adds a `register` prop (`audacious` default / `result` compact) mirrored to `data-register`; routes the previously hard-coded `34cqi` clamp middle-arm through a new `--metric-row-value-clamp-cqi` token. Additive, back-compatible (default writes no new tokens), token-first per the J invariant. The diff comment correctly diagnoses *why* the endpoint tokens alone were insufficient (the cqi arm is the binding term against a wide container). CLEAN. |
| `1c6c3e5` data-table responsive | **IDIOMATIC** | Container-driven card-per-row projection via `useElementSize` ("the same seam the chart components use"). `width > 0` guards the pre-measure frame (no card-layout flash). Select + context-menu behaviour preserved across both layouts. Note: the diff *also* silently de-escapes `—`/`↑` unicode escapes to literal glyphs in `getCellValue`/`sortIndicator` — a cosmetic drive-by unrelated to the commit subject, harmless but undeclared. CLEAN (drive-by noted). |
| `d244dd5` metric-stack label clamp | **IDIOMATIC** | Empirical re-challenge found the *label* (not value) is the binding row-height term; routes the label clamp through a parallel `--metric-row-label-clamp-{min,cqi,max}` token family, same shape as the value clamp. Defaults preserve audacious bit-for-bit. Consistent token grammar. CLEAN. This is a follow-up tuning commit to `9ba68ca` — itself a faint signal the result register shipped under-verified (two commits 27 min apart to land one feature). |

**Cohort verdict**: 6 of 7 commits are idiomatic gestalt work — notably `949474a`, `099d51e`, `3cb70db` are model-quality. The single substrate debt is the `beec35e` dock arm's **`.dock-layer` / `.dock-layer-item-host` duplication** (pre-existing; the commit amplified it by patching both copies). No quick-fix-or-workaround was introduced by the cohort other than that. The cohort's *process* failure (untagged shadow work, 4th K-invariant-3 recurrence) is Qε's lane, not Qδ's.

---

## §5 — Defensive-bail + fall-through audit

**Silent-swallow `catch`**: the sweep for `catch {}` / `catch (e) {}` / `catch (...) { return` in `src/` returned **zero** empty-catch blocks. The only `catch`-with-`return` is `useAurora.ts:57-67`, which is explicitly compliant with **O invariant 24 (fail-explicit)**: it re-wraps the error, hands it to a consumer-supplied `onInitError` *if provided* (documented opt-in to silent fallback), and **otherwise rethrows** so the failure surfaces to the consumer's error boundary. This is the correct fail-explicit shape, not a silent swallow. CLEAN.

**`?? true` / defensive-default suspects**: `useMetaballs.ts` + `MetaballCanvas.vue` carry `?? true` on `canvasRef.value?.isSupported`. The surrounding comments (`useMetaballs.ts:168-179`, `MetaballCanvas.vue:31-45`) document this as a *deliberate* unmount-race guard with an O.W1 / F-ε-3 disposition trail — when `canvasRef` becomes `null` mid-teardown, `?? true` prevents a spurious "unsupported" flash. It is a documented, dispositioned defensive default, not a failure-mask. CLEAN.

**Token-resolution `?? fallback` / `|| fallback`**: `useTokenColor`, `BouncyToggle.readToken`, `ConfiguratorLayer.fallbackId`, `glyph-face/keys.ts` — all are SSR/`document`-absent guards or genuine "property unset" two-tier resolutions. These are befitting fallbacks, not bails. CLEAN.

**`fall through` flow comments**: `useTypewriter.ts:91` (FSM branch) + `dock.css:75` + `glass.css:103` + `cartoon-card` — all describe genuine state-machine flow or token cascades, none mask an error. CLEAN.

**Verdict — no silent-swallow / failure-masking pattern in `src/` at HEAD.** O invariant 24 holds across the post-P window. The post-P commits introduced no new error-handling code.

---

## §6 — Recommended Q-wave remediations

| ID | Finding | Severity | Recommended destination |
|---|---|---|---|
| **R1** | `continuous-structural-split.test.ts:154` comment says "so legacy consumers see the same event surface". The `disablePopover` bare-fallback path is a *current* API surface, not legacy — the word mis-frames it. | COSMETIC | Q-wave style-sweep lane — rephrase to "so popover-disabled consumers see the same event surface" (drop `legacy`). One-line comment edit in a test file. |
| **R2** | **`.dock-layer` and `.dock-layer-item-host` are two parallel rule-sets** in `dock.css` expressing the identical layer active/inactive/leaving contract; `beec35e` patched the `visibility` fix into **both**. The commit message calls `.dock-layer` "legacy". This is un-consolidated duplication — quick-fix-debt. | SUBSTRATE (genuine) | Q-wave dock-cohesion lane (pairs with Qβ co-location findings). Determine whether `.dock-layer` still has live consumers; if not, **retire it** (substrate-without-consumer is binary per L invariant 8). If both are live, consolidate the shared active/inactive/leaving contract into one rule-set or a shared `@apply`/custom-property recipe so a future fix lands once. NO LEGACY CODE (Q6) — a rule-set the author's own commit calls "legacy" is a Q6 violation. |
| **R3** | `dock.css:75` carries a verbose post-hoc archaeology comment ("the 4-rung prop type used to fall through to the unpatched root..."). Harmless but it documents a *fixed* bug at length. | COSMETIC | Q-wave style-sweep lane — trim to a one-line rationale; the V.W3.T1 fix needs no narrative. Low priority. |
| **R4** | **`@mkbabb/value.js` (and `@mkbabb/keyframes.js`) as `file:../` devDeps.** The `value.js` devDep was declared to paper over a `keyframes.js@2.1.0` transitive-resolution gap under the `"development"` export condition. `file:../` links make the glass-ui test suite non-reproducible off the author's machine (no `../value.js` sibling on a CI checkout / fresh clone). This is a phantom-dependency workaround sitting at the exact `value.js`/`keyframes.js` seam the Q-open directive names "totally broken". | WORKAROUND-DEBT (headline) | Q-wave consumer-substrate lane (pairs with Qα consumer-breakage forensics). Root-cause the transitive resolution: `keyframes.js` must declare `value.js` correctly, OR the dev-condition resolution must walk the real dependency graph. Pin both devDeps to a *published* range (or document the `file:` link as a deliberate workspace-monorepo setup with a reproducible-CI alternative). The current shape is not idiomatic (Q5) and is the most credible Qδ-lane contributor to the consumer-breakage report. |

No R-item requires implementation in this round (Q10 — planning only). R2 + R4 are the genuine substrate items; R1 + R3 are cosmetic style-sweep fodder.

---

## §7 — Verdict + status

**Post-P legacy sweep**: **MINOR.** Zero genuine-legacy code introduced by the 7 post-P commits; zero new `TODO`/`FIXME`/`HACK`/`@deprecated` markers. One pre-existing duplication debt (`.dock-layer` vs `.dock-layer-item-host`) was *amplified* by `beec35e` (R2). Three cosmetic verbose-archaeology comments (R1, R3, and similar).

**P-era residual verification**: **MINOR — one P-FINAL framing does NOT fully hold.** The heap-bump bake (§3.1) and the 3 inline absorbs (§3.3) are correctly dispositioned — P framing HOLDS, CLEAN. BUT the `@mkbabb/value.js` devDep (§3.2) was declared "ADDRESSED" by P FINAL when it is in fact a phantom-dependency workaround for a `keyframes.js` transitive-resolution gap (R4). P FINAL.md's zero-residuals declaration is **technically inaccurate on this one item** — it ADDRESSED the symptom (test runner finds `value.js`) without root-causing the cause. This is the single Qδ-lane finding that contradicts the P close-honesty claim.

**Post-P shadow-cohort idiomatic check**: **CLEAN (6/7) + MINOR (1/7).** `949474a` / `099d51e` / `3cb70db` are model-quality gestalt work; `9ba68ca` / `1c6c3e5` / `d244dd5` are idiomatic. `beec35e` is mixed — toggle arm idiomatic, dock arm carries the R2 duplication debt.

**Defensive-bail + fall-through audit**: **CLEAN.** No silent-swallow `catch`, no failure-masking default in `src/` at HEAD. O invariant 24 holds. The post-P cohort added no error-handling code.

**Overall Qδ verdict**: **MINOR.** No BLOCKER. 0 genuine-legacy artefacts shipped post-P; the post-P cohort is substantively idiomatic. Two genuine carry items for the Q plan — **R2** (dock rule-set duplication / Q6 "legacy" violation) and **R4** (`value.js` devDep workaround — the headline, and a credible consumer-breakage contributor). R1 + R3 are cosmetic. R4 also flags a P close-honesty gap for Qε to corroborate.

**Status**: Qδ round-1 audit COMPLETE. Read-only; no source mutated; no mutating git. Findings handed to the Q orchestrator for synthesis into the Q plan.
