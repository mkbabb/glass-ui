# N.W4 α — Plan-vs-Actual Audit (read-only)

**Audit lane**: α (alpha — plan-vs-actual diff)
**Authored**: 2026-05-14
**Scope**: every plan-declared artefact in N.md / waves/W{0,1,2,4}.md / audit/N-prune-ledger.md / audit/N-wiring-targets.md / research/R*.md cross-walked against landings at HEAD.
**Method**: read-only `git log --oneline 78974c0..HEAD`, `git tag -l "v1.1.*"`, proof-doc tree walk, source spot-verification (rg / grep) of each strategic-wire site + W1 sweep + W2 density CVA. Zero writes outside this file.

---

## §1 — Tranche-tip baseline (commit hashes confirmed)

| Marker | Expected (dispatch) | Actual at HEAD | Status |
|---|---|---|---|
| N pre-open baseline (M close) | `54a8acb` | `54a8acb feat(tranche-m/w4): close ceremony …` | PASS |
| N open (planning substrate) | `cbe2d13` | `cbe2d13 docs(tranche-n/open): mobile-aware substrate …` | PASS |
| KISS revision | (not pinned) | `5bdc981 docs(tranche-n/revise): KISS pivot …` | PASS |
| Wiring re-revision | (not pinned) | `78974c0 docs(tranche-n/revise-2): wiring pivot — verdict reversal …` | PASS |
| N.W0 close | `b6c1eed` (v1.1.1) | `b6c1eed feat(tranche-n/w0): strategic 5-wire batch …` | PASS |
| N.W1 close | `b1d5cc9` (v1.1.2) | `b1d5cc9 feat(tranche-n/w1): typography sweep …` | PASS |
| N.W2 close | `ffc02a9` (v1.1.3) | `ffc02a9 feat(tranche-n/w2): Configurator density CVA …` | PASS |

`git tag -l "v1.1.*"` → `v1.1.1`, `v1.1.2`, `v1.1.3` — three tags as expected.
`git log --all --grep="tranche-n/w"` → three commits as expected (W0, W1, W2 closes).

PROGRESS.md §10 records that the v1.0.6 patch tag declared in W0.md §Lane D was bumped to **v1.1.1** because the W0 close absorbed an AB-tranche CSS-bundle rebaseline (load-bearing CSS additions from pulse/aura + progress/sectioned + chassis tokens + dock-shadow canon shipped post-K-W4 baseline). Documented inline at PROGRESS.md "W0 absorb (scope-reveal)". Not a plan-vs-actual drift — the substrate-delta rationale satisfies the patch-bump invariant; the magnitude moved to minor because the bundle envelope expanded.

---

## §2 — Per-wave landing matrix

### W0 HEADLINE — Strategic 5-wire batch (Lanes A/B/C + Lane D release)

| Plan item (W0.md §) | Expected artefact | Actual at HEAD | Verdict |
|---|---|---|---|
| Lane A1 — `useTouchGate` → `<Slider>` | Slider.vue wire + proof | `src/components/ui/slider/Slider.vue:6,79,89` (import + canonical comment + `const touchGate = useTouchGate()`) + `audit/W0-Lane-A1-slider-touchgate-proof.md` | PASS |
| Lane A2 — `MetaballCanvas` → hero.vue | hero.vue mount + proof | `demo/stories/compositions/hero.vue:8,147` (import + `<MetaballCanvas …>` mount with reduced-motion gate) | PASS |
| Lane A3 — `backdrop="paper"` prop on `<Section>` | Section.vue prop + proof | `src/components/ui/section/Section.vue:4,27,53,62,85,90-91` (`PaperBackdrop` import + `backdrop?: "none" \| "paper"` prop + default `"none"` + conditional render) + `audit/W0-Lane-A3-section-paper-backdrop-proof.md` | PASS |
| Lane A4 — `TypewriterText` → hero.vue headline | hero.vue split-headline + proof | `demo/stories/compositions/hero.vue:12,175,193` (two `<TypewriterText>` segments around static italic-f glyph; reduced-motion fallback) — shared proof doc with A2 (`W0-Lane-A2-A4-hero-composition-proof.md`) per W0.md §File bounds note "shared with A2; coordinate" | PASS |
| Lane A5 — `assertDistFresh` → speedtest/vite.config.ts | cross-repo wire + push | `/Users/mkbabb/Programming/speedtest/vite.config.ts:9,14` (`import { assertDistFresh } from "@mkbabb/glass-ui/freshness"` + invocation rooted at `path.resolve(__dirname, "..", "glass-ui")`) | PASS |
| Lane B — Precept canonicalize | submodule advance `46d6cfb → next` | PROGRESS.md cites advance to `b8af314` (invariants 21-23 + audit-failure clause + LESSONS-LEARNED 2026-05-13 entry) + `audit/W0-Lane-B-precept-canonicalize-proof.md` | PASS |
| Lane C — Audit-failure LL entry | LESSONS-LEARNED append + ledger §H annotation | proof at `audit/W0-Lane-C-audit-failure-LL-proof.md` + N-prune-ledger.md §H rewritten (verified §A preamble cites the rewrite) | PASS |
| Lane D — v1.0.6 (re-tagged v1.1.1) | tag pushed | `v1.1.1` present in `git tag -l "v1.1.*"` | PASS (minor-bump rationale doc-only) |

W0 close hard-gate (a)-(f): all six gates satisfied per PROGRESS.md §"Hard gate (W0)".

### W1 — GlassPanel verify + text-micro + typography sweep (Lanes A/B/C)

| Plan item (W1.md §) | Expected artefact | Actual at HEAD | Verdict |
|---|---|---|---|
| Lane A — GlassPanel `"resting"` rendering verify | DESIGN.md canonical translucent+frosted block + proof | `audit/W1-Lane-A-glass-panel-frosted-verify-proof.md` + PROGRESS.md §"W1 close artefacts" cites DESIGN.md `## Glass Surfaces` extended | PASS (no new tier — spot-verification caught the "promote to new tier" false-positive; verify-only landing) |
| Lane B — `@utility text-micro` promotion | typography.css `@utility text-micro` + theme bridge | spot-verified pre-existing at `src/styles/typography.css:235` + `src/styles/theme.css:14` — no new utility; lane absorbed as VERIFY per invariant 22; proof at `audit/W1-Lane-B-text-micro-utility-verify-proof.md` | PASS (verify-only; per N invariant 22 audit-verdict spot-verification gate) |
| Lane C — typography literal sweep | ≥80% of `text-[Xrem]` literals swept; N-4 (26 timeline errors) absorbed | `rg "text-\[0\.6875rem\]" src/ demo/` returns **0** (100% sweep, 9/9 sites); ConfiguratorRow.vue + ConfiguratorLayer.vue + PresetEditor.vue + PresetEditorField.vue rewritten to `text-micro`; N-4 26 errors absorbed; `rg -l "text-micro" src/components/custom/configurator` returns ConfiguratorLayer.vue + ConfiguratorRow.vue (2 sites); proof at `audit/W1-Lane-C-typography-sweep-N4-absorb-proof.md` | PASS |

W1 close hard-gate (a)-(h): all eight gates satisfied per PROGRESS.md §"Hard gate (W1)". Lane C agent self-disclosed a `git stash`/`git stash pop` round-trip — documented inline; orchestrator-side `git stash list` walk clean; flagged for ι integrity sweep.

### W2 — Configurator density CVA + N7 dock-blur audit (Lanes A/B)

| Plan item (W2.md §) | Expected artefact | Actual at HEAD | Verdict |
|---|---|---|---|
| Lane A.1 — viewport-meta | `demo/index.html` NEW with viewport-meta | viewport-meta lives at **root** `./index.html:5` (pre-N; project inception) — `demo/index.html` does NOT exist; the W2 spec assumption was a false-positive caught at orchestrator-side spot-verification per invariant 22; Lane A re-scoped to density-only | PASS (false-positive caught + scope narrowed) |
| Lane A.2 — `density` CVA on `<Configurator>` + `<ConfiguratorRow>` | density prop + provide/inject + `data-density` attribute | `src/components/custom/configurator/ConfiguratorRow.vue:52` (`density?: ConfiguratorDensity` prop) + `:71` (`:data-density="resolvedDensity"`) + `:60-64` (prop-wins-over-inject) + `:117-132` (4 CSS branches for mobile/compact/comfortable/spacious) + dedicated `density.ts` module + proof at `audit/W2-Lane-A-configurator-density-CVA-proof.md` | PASS |
| Lane A.3 — 8 density tokens | `tokens.css` §8b 4 gap + 4 padding-block rungs | `src/styles/tokens.css:657-660` (4 gap rungs: mobile 0.25rem, compact 0.3125rem, comfortable 0.375rem, spacious 0.75rem) + `:662-665` (4 py rungs: 0.25/0.375/0.5/0.875rem) = **8 tokens total** | PASS |
| Lane A.4 — `configurator-mobile.vue` story | mobile-proof story registered | `demo/stories/primitives/configurator-mobile.vue` exists | PASS |
| Lane B — N7 dock-blur perceptual audit | NO-OP rationale OR cascade adjustment | proof at `audit/W2-Lane-B-dock-blur-N7-audit-proof.md` (NO-OP per compositor-floor `--glass-blur-dock-radius: 0px`); DESIGN.md extended with source-of-truth comparison table | PASS |

W2 close hard-gate (a)-(g): all gates satisfied per PROGRESS.md §"Hard gate (W2)" except (e) — Playwright runtime probe at 3 viewports DEFERRED to N.W4 π lane (Playwright-MCP was disconnected at W2 close session; verified statically via source-of-truth). Documented as PARTIAL, not a regression. Falls to W4 π if the runtime probe must close.

### W4 — Close ceremony (in-flight)

This audit is one of the seven W4 audit lanes. The wave is OPEN at HEAD; no W4 close artefacts yet expected at this lane's authoring time.

---

## §3 — Per-N-directive cross-walk

The plan declares N6, N7, N8, N9, N10, N11 (per N.md §3 + Rε-N-directives-synthesis.md + PROGRESS.md §"Status").

| Directive | Plan disposition | Actual landing | Verdict |
|---|---|---|---|
| **N6** — storybook mobile + configurators + spacing/padding expressiveness | W2 Lane A | Configurator density CVA + 8 density tokens + configurator-mobile.vue story landed at `ffc02a9`. viewport-meta confirmed pre-N at root index.html (Lane A.1 false-positive caught). | PASS (landed) |
| **N7** — dock blur perceptual audit | W2 Lane B (likely no-op) | NO-OP rationale documented in DESIGN.md + proof at `audit/W2-Lane-B-dock-blur-N7-audit-proof.md`. Dock `--glass-blur-dock-radius: 0px` confirmed at compositor floor; user perception traces to page-composition stacking, not dock filter. | PASS (landed as NO-OP per expected outcome) |
| **N8** — `<DockMobileToggle>` new primitive | DEFER pending explicit user authorization | DEFERRED per N.md §3 + PROGRESS.md §"Deferred". Zero implementation artefacts at HEAD. Carry-forward candidate for O. | PASS (deferred per plan; not a finding) |
| **N9** — glass-panel frosted-default + typography audit | W1 Lanes A + B + C | GlassPanel verify-only (no new tier) at Lane A; `@utility text-micro` verify-pre-existing at Lane B; typography literal sweep (9/9 sites) at Lane C. | PASS (landed) |
| **N10** — bidirectional 7-axis style audit at tranche open | research/Rγ + research/Rδ | `research/Rgamma-style-audit-self.md` (11 drift + 4 gaps + 3 union candidates) + `research/Rdelta-style-audit-consumers.md` (889 drift instances aggregated; 6 consumers) at N-open. | PASS (landed at N open) |
| **N11** — 6-agent consumer-audit post-N substrate | W4 (sequential after N10) | KISS-revision-era fan-out at `audit/N11-Lane-{a..f}-*.md` (6 files present); W4 re-run is the W4 work. | PARTIAL — KISS-era 6 deliverables landed; the W4 "re-run post-N substrate" is in-flight at this audit-lane authoring time. Expected to close in W4 alongside the 7-agent strengthened audit. |

No N-new invariant claimed-but-not-landed:
- Invariant 21 (bidirectional style-audit canonical at tranche open) — codified at precept submodule per Lane B proof.
- Invariant 22 (audit-verdict spot-verification gate) — codified at precept + cited inline in W1 Lane B + W2 Lane A re-scoping rationale.
- Invariant 23 (wire-before-retire posture) — codified at precept + drives the W0 wire-batch disposition.

---

## §4 — Strategic-wire spot-verification (A1 / A2 / A3 / A4 / A5)

Each wire spot-verified against the canonical wire pattern declared in W0.md §"Lane A":

| Wire | Plan claim | Source verification | Verdict |
|---|---|---|---|
| **A1** `useTouchGate` → `<Slider>` | mirrors `GlassDock.vue:85` canonical pattern | `src/components/ui/slider/Slider.vue:6` (`import { useTouchGate } from '../../../composables/dom/useTouchGate'`) + `:79` (canonical-wire comment) + `:89` (`const touchGate = useTouchGate()`). Integrates with the existing Slider keep-dock-open contract per CLAUDE.md. | PASS |
| **A2** `MetaballCanvas` → hero.vue ambient backdrop | WebGL-gated + reduced-motion-respecting + palette-matched ambient config | `demo/stories/compositions/hero.vue:8` (import from custom/metaballs) + `:147` (`<MetaballCanvas …>` mount with scoped `:deep(canvas)` re-targeting per inline comment); reduced-motion v-if gate cited inline. | PASS |
| **A3** `<Section backdrop="paper">` | additive `backdrop?: "none" \| "paper"` prop | `src/components/ui/section/Section.vue:4` (`import { PaperBackdrop }`) + `:53` (`backdrop?: "none" \| "paper"`) + `:62` (default `"none"`) + `:85` (`'relative isolate'` when paper) + `:90-91` (`<PaperBackdrop v-if="props.backdrop === 'paper'" class="!absolute inset-0" />`). Purely additive; default preserves pre-N visual. | PASS |
| **A4** `TypewriterText` → hero.vue headline | split around static italic-f glyph; reduced-motion fallback | `demo/stories/compositions/hero.vue:12` (import) + `:175,193` (two `<TypewriterText>` segments; segment 1 → seg 2 on `@complete`; reduced-motion fallback documented in PROGRESS.md). | PASS |
| **A5** `assertDistFresh` → speedtest/vite.config.ts | one-line import + invocation; cross-repo MULTI-WRITER per CONSTELLATION.md | `/Users/mkbabb/Programming/speedtest/vite.config.ts:9` (`import { assertDistFresh } from "@mkbabb/glass-ui/freshness"`) + `:14` (`assertDistFresh({ root: path.resolve(__dirname, "..", "glass-ui") })`). Closes V.W3 wire-claim deferral. | PASS |

All 5 strategic wires landed; all 5 mirror their canonical wire pattern declared in W0.md.

---

## §5 — Findings

**Zero plan-not-backed-by-artefact items.** Every declared wave-lane artefact landed at HEAD or carries an in-plan deferred rationale (N8, N-5 dock-layer regression, J-14 drag-keep-open, 23 broader wire targets — all named-deferred to O per N.md §3 + PROGRESS.md §"Deferred").

Three plan-state observations (NOT findings; documented for ι transparency):

1. **W0 tag bump v1.0.6 → v1.1.1.** W0.md §"Lane D" declared v1.0.6 patch; actual tag is v1.1.1. Rationale in PROGRESS.md §"W0 absorb (scope-reveal)": absorbed an AB-tranche CSS-bundle rebaseline (≈10 KB load-bearing CSS additions shipped post-K-W4 baseline). The bundle envelope rebaseline is substrate-shape-changing, hence minor bump. Doc-only delta; not a regression.
2. **W1 Lane B verify-only outcome.** W1.md declared "@utility text-micro promotion"; orchestrator-side spot-verification (per invariant 22) caught that the utility + theme bridge + 5 consumer sites already existed. Lane absorbed as VERIFY rather than PROMOTE. Documents the invariant-22 cycle working as designed.
3. **W2 Lane A.1 viewport-meta false-positive.** W2.md declared "Add `demo/index.html` viewport-meta"; spot-verification caught viewport-meta already present at root `./index.html:5` since project inception. Lane re-scoped to density-only. Documents invariant 22 catching false-positive a second time within N.
4. **W2 Lane A runtime probe deferred.** Playwright-MCP runtime probe across 3 viewports DEFERRED to N.W4 π lane per PROGRESS.md §"Hard gate (W2)" (e) — Playwright-MCP disconnected at W2 close session; verified statically. PARTIAL gate, not failed gate. π-lane responsibility to close.
5. **N11 partial landing.** KISS-revision-era 6-agent consumer audit fan-out landed at `audit/N11-Lane-{a..f}-*.md`. W4 "re-run post-N substrate" is in-flight at this audit-lane authoring time (parallel with the 7-agent strengthened audit). On track; not a finding.

---

## §6 — Verdict

**CLEAN.**

All three N waves (W0, W1, W2) landed every plan-declared lane artefact with proof doc + commit hash + tag. The 5 strategic wires (A1-A5) all spot-verify against their declared canonical wire pattern. The 6 N-new directives (N6/N7/N8/N9/N10/N11) all reconcile against actual landings or are named-deferred per plan. All 3 N-new invariants (21/22/23) codified at precept submodule. v1.1.1 + v1.1.2 + v1.1.3 tags published.

The two W0 + W1 + W2 "false-positive caught + lane re-scoped" events (text-micro pre-existing, viewport-meta pre-existing) are precisely the **invariant 22 audit-verdict spot-verification gate** working as designed; they validate the codification rather than threaten it.

W4 is in-flight; the 7-agent strengthened audit + N11 6-agent consumer re-audit run in parallel. This α-lane reports CLEAN on plan-vs-actual at HEAD.
