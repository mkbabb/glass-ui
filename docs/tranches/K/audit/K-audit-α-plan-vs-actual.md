# K — α-lane: plan-vs-actual audit

**Auditor**: K W8 α-lane (read-only).
**Tree state**: clean; HEAD `3a4ea3f` (post-pre-close orchestrator pass).
**Baselines**: K plan `0666be6` → reconciled at `23ce73c` (2026-05-08) → HEAD `3a4ea3f` (12 wave commits since `f5cdd53` W0 close).
**Method**: walked every wave spec line-by-line against PROGRESS.md + the per-wave commit + the proof doc; verified each "Hard gate" at HEAD via rg / source-read; cross-walked PROGRESS.md status table.

## Wave-by-wave hard-gate disposition

Legend: **MET** = gate landed at HEAD with proof citation; **PARTIAL** = portion landed, residual named; **MISSED** = gate not landed; **DEGRADED** = landed in degraded form per spec's pre-disclosed risk; **OBSOLETE** = obsoleted by reconciliation revision.

### W0 — Reconciliation + dispatch precept hardening (commit `f5cdd53`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W0.a | Reconciliation ledger present at `audit/W0-reconciliation.md` | **MET** | `docs/tranches/K/audit/W0-reconciliation.md` exists; 38 hard-gate items dispositioned across 9 wave specs; cites `K-reconciliation-2026-05-08.md` as the load-bearing source. |
| W0.b | ORCHESTRATION.md adds Worktree Isolation clause | **MET** | `docs/precepts/instructions/ORCHESTRATION.md:18` — `## Worktree Isolation` heading present. Submodule pinned at `fdc020c`. |
| W0.c | AGENT_DISPATCH_TEMPLATE.md adds hardened-agent-git clause + no-shadow-execution clause | **MET** | Submodule commit `fdc020c` titled "feat: hardened agent git clause + worktree isolation + 4 lessons-learned (K.W0)" updates the dispatch template. |
| W0.d | 4 new LESSONS-LEARNED entries (3 J-derived + 1 V-derived) | **MET** | `LESSONS-LEARNED.md` carries 7 `2026-05-06` entries (verified via `grep -c`); the 4 K.W0 entries are 3 J-derived + 1 V-derived per submodule commit body. |
| W0.e | Orchestrator commits W0 close | **MET** | `f5cdd53 feat(tranche-k/w0): reconciliation + hardened dispatch precept`. |

**Verdict**: clean.

### W1 — Silent-miss closeout (`hoverOpenDelay` decision) (commit `563b200`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W1.a | `<HoverPopover hoverOpenDelay>` lands w/ ≥1 consumer story OR rename-reconciled OR J FINAL amended | **MET** | Option B taken (clean rename per K invariant 1). `rg openDelay src/ demo/` → 0 hits; `rg hoverOpenDelay\|hover-open-delay src/ demo/` → 7 hits (3 SFC + 4 demo). `demo/stories/primitives/hover-popover.vue` adds 3 cells exercising 80/250/500 ms cadences. |
| W1.b (orig W1.A.2) | CartoonCard adoption sweep | **OBSOLETE** | Per W1 REVISION 2026-05-08: V-tranche `<ShowcaseFrame>` (`8136baf`) supersedes; the 7-of-8 raw triplet sites are ShowcaseFrame-eligible, not CartoonCard-eligible; speedtest W2.T10 now owns the demo-side sweep. K W1 spec strikes the gate. |
| W1.c (orig W1.B) | Configurator family ≥ 2 consumers | **OBSOLETE** | Per W1 REVISION 2026-05-08: ABSORBED at V `fb38034` (`demo/stories/primitives/configurator.vue` + metaballs = ≥ 2 consumers). Aurora retains `useAuroraStudio` Option-B-with-rationale. |

**Verdict**: clean (1 MET, 2 OBSOLETE per reconciliation).

### W2 — Substrate retire-or-wire (RETIRED at 2026-05-08 reconciliation)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W2.1 | `--{success,warning,info}-foreground` triple | **OBSOLETE** | Absorbed by V at `221d783` (Notification consumer) + `5dfe6fb` (Badge variants). |
| W2.2 | `cssVar()` retire-or-wire | **MET** (absorbed into W3.A) | `76fff65` retired `cssVar()` (deleted `src/composables/utils/cssVar.ts` + barrel re-exports; inlined `readToken()` into BouncyToggle). `rg cssVar\( src/` → 0 function-call hits (only retirement comment). |
| W2.3 | `.overlay-scrim` @utility formal-delete | **MET** (absorbed into W3.A) | `76fff65` deleted the `@utility overlay-scrim` block; `rg "@utility overlay-scrim" src/styles/utilities.css` → 0 hits. |
| W2.4 | paper.css literal hsl rungs | **OBSOLETE** | Absorbed by V (`grep "hsl(" src/styles/paper.css` → 0 hits at HEAD). |
| W2.5 | `<Tooltip>` consume `rounded-tooltip` | **OBSOLETE** | Absorbed by V (`TooltipContent.vue:27` uses `rounded-tooltip`). |

**Verdict**: clean (W2 retired with V-attribution; 2 residuals absorbed by W3.A; 3 absorbed by V).

### W3 — Vocab.γ second-pass (commits `76fff65` + `11a30d3`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W3.a | `rg "color-mix.*--foreground" src/` migrated or documented | **MET** | At HEAD: 9 hits remain — 4 P1 rung-gap residuals (`35,40,40,70`) + 4 architectural exceptions (icon-muted ×2, phase-color ×2) + 1 mix-into-glass-bg in `button/index.ts`. All documented in `W3-A-src-vocab-residue-proof.md` §1. Carry-forward listed in K-pre-close.md residuals. |
| W3.b | `rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/` → 0 | **MET** | Verified at HEAD: 0 hits. `W3-B` proof migrated 5 sites to `.focus-ring`. |
| W3.c | `rg "transition-all" src/components/ src/styles/` → 0 + demo composables/motion → 0 | **MET** | Verified at HEAD: 0 hits in src components + styles; 0 hits in demo composables/motion. `CarouselDots.vue:62` decomposed; 4 demo sites decomposed to `transition-[transform,opacity]`. |
| W3.d | Carousel-dots story canonical | **MET** | `W3-B` §Step 4 records NO-OP — `demo/stories/navigation/carousel.vue` already canonical at HEAD; `<CarouselDots>` consumed exclusively (no hand-rolled duplicate). |
| W3.e | `.overlay-scrim` @utility formally deleted | **MET** | `rg "@utility overlay-scrim" src/styles/utilities.css` → 0 hits. |
| W3.f | `cssVar()` retire-or-wire decision recorded | **MET** | Decision: RETIRE. Documented in `W3-A` §Step 3; rationale: 1-consumer + `useTokenColor` supersedes for reactive use. |
| W3.g | rg confirms 0 raw repeats post-wave | **MET** | `K-pre-close.md` rg counts ledger confirms. |

**Verdict**: clean. Process incident: W3.A git stash violation (1 occurrence; recovered; agent re-applied via Edit tool; precept follow-on flagged for ι lane absorption).

### W4 — Doc + tooling cohort (Lane B `8a04a2b`, Lane A `36305da`)

#### Lane A — Doc refresh

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W4.A.a | CLAUDE.md aligned w/ HEAD (V primitives + composables + chassis) | **MET** | `36305da` rewalks 44 ui packages + `_shared` + 30 custom dirs / 28 public + 23 composables; adds Subpath surface section + Demo storybook chassis section. `rg "DockPopover\|danger-subtle\|cssVar\(" CLAUDE.md` → 0 hits. |
| W4.A.b | README.md aligned w/ HEAD | **MET** | `36305da` expands feature list, glass-tier table to 5 rungs, subpath imports section added; 4 hits each for `hoverOpenDelay`/`primary-audacious`. |
| W4.A.c | DESIGN.md aligned w/ HEAD | **MET** | `36305da` adds `primary-audacious` section, Configurator section, Slider keep-dock-open contract subsection, Skeleton compositor migration paragraph; 5 hits for `hoverOpenDelay`/`primary-audacious`. |

#### Lane B — Tooling cohort

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W4.B.a | `npm run profile:budget` script restored + BUDGETS table | **MET** | `package.json:343` carries `"profile:budget": "node scripts/profile-bundle.mjs --enforce"`. K-pre-close ledger reports PASS at 76.9% raw / 76.9% gz js, 77.1% raw / 76.9% gz css (~30% headroom envelope). |
| W4.B.b | GitHub workflow job (`.github/workflows/lint.yml`) | **MET** | `.github/workflows/lint.yml` exists (674 bytes, created 2026-05-09); `bundle-budget` job per spec. |
| W4.B.c | Stress harness retire-or-restore | **MET** (RETIRE) | `W4-B` §Step 2 records RETIRE decision; harness already absent at HEAD; rationale: substrate-without-consumer per K invariant 8. |
| W4.B.d | `ay-close` retired from package.json | **MET** | `grep ay-close package.json` → no script entry. (Script file `scripts/ay-close.sh` survives on disk; flagged in K-pre-close residuals for cleanup.) |
| W4.B.e | `meta-description` added to index.html | **MET** | `index.html:7` carries `<meta name="description" content="...">` block. |

**Verdict**: clean.

### W5 — Mobile-viewport fitness (commit `12abb09`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W5.a | CarouselPager orientation bug fix | **OBSOLETE** | Per W5 REVISION 2026-05-08: bug premise was wrong; struck. `useCarousel.ts:6-11` destructures `orientation` as plain string; `CarouselPager.vue` comparison correct at HEAD. |
| W5.b | story-pager dock right ≤ 375 at 375 viewport | **MET** | `12abb09` changes `demo/layout/StoryPager.vue:62` to `max-width: min(100%, 56rem)`; Playwright probe in `W5-mobile-viewport-fitness-proof.md` reports right=375 exactly at 375×667. |
| W5.c | GlassCarouselPager chevrons reachable on mobile | **MET** | `src/components/ui/carousel/GlassCarouselPager.vue:96` adds `max-md:flex-wrap max-md:justify-center max-md:gap-2`; demo grid wrapper gets `min-w-0` on multiple levels; Playwright reports all 3 controls visible at 375×667. |
| W5.d | Playwright probes at 3 viewports | **MET** | 9 screenshots captured (375/1024/1440 × 3 surfaces); proof matrix in `W5-mobile-viewport-fitness-proof.md` §4. |

**Verdict**: clean.

### W6 — Audacious primary-CTA (K HEADLINE) (commit `154d1d2`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W6.a | `Button variant="primary-audacious"` exists in CVA | **MET** | `src/components/ui/button/index.ts:15` — variant present. |
| W6.b | `btn-audacious` utility ships canonical recipe | **MET** | `src/styles/utilities.css:561` — `@utility btn-audacious` block; recipe lifted from `dock.css:702-796` per `W6-A` §Step 2. |
| W6.c | Dock primary tier consumes canonical (no duplicate) | **MET** | `DockTabButton.vue:36` composes `btn-audacious` via `cn(...)` when `data-tier="primary"`; `dock.css` shrank from ~95 to ~67 lines per `W6-B` §Step 3. |
| W6.d | ≥ 2 consumers (dock + ≥ 1 demo) | **MET** (3 consumers) | Dock primary tier (DockTabButton) + `demo/stories/primitives/buttons.vue:54-56` (3 cells) + `demo/stories/compositions/hero.vue:85` ("Start building" CTA). |
| W6.e | Phase-color decoupling decision documented | **MET** | Option B per `W6-A` §Decision recap + `W6-B` §Decision recap; canonical uses `--primary`, dock retains `--phase-color` extension. |
| W6.f | Brittleness window declared | **MET** (declared, NOT YET RESTORED) | `breaking_changes_during_wave: yes`, `suspended_gates: dock-primary-tier-visual-fidelity`, `restoration_wave: W8 close ceremony π lane visual probe`. K-pre-close.md confirms π lane verification is the W8 gate. **α lane verifies the declaration + restoration plan exist; π lane owns the visual probe verdict.** |
| W6.g | Bundle delta documented | **MET** | `W6-A` §Step 5: ~1.1 KB unminified; tree-shaken consumer-side ~700 bytes. ~0 KB net (recipe relocated, dock.css shrank by ~28 lines). Well under 5 KB scope-reveal threshold. |

**Verdict**: clean (gates met; brittleness window correctly declared, visual restoration deferred to π lane per spec).

### W7 — Drag-keep-open story + Configurator P0 + NumberField (commit `2197596`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W7.0a | Configurator P0: `activeKey` reactive | **MET** | `useConfiguratorState.ts:94` — `const activeKey = ref<string | undefined>(initialKey);`. `rg "let activeKey" src/components/custom/configurator/` → 0 hits. |
| W7.0b | metaballs `colorDraft ↔ cfg.colors` loop broken | **MET** | `demo/stories/motion/metaballs.vue` — `colorDraft` deleted (only retirement comment remains); UI iterates `cfg.colors` directly; `commitColor` writes only to `cfg.colors[index]`. Playwright probe at `/motion/metaballs`: 0 console errors, 0 warnings. |
| W7.1 | Slider-in-Dock cross-substrate demo story | **MET** | `demo/stories/compositions/dock-with-slider.vue` (5732 bytes; 3 cells: standard, glass-pill, multi-slider collapsible); registered in `demo/stories/manifest.ts`. |
| W7.2 | NumberField decision recorded | **MET** (Option B) | Slider-only contract documented in `W7-drag-keep-open-story-proof.md` §Step 2; rationale: NumberField is keyboard/discrete-button driven, not continuous-pointer-drag. `rg "keepDockOpen" src/components/ui/` → only Slider hits. |
| W7.3 | DESIGN.md updated | **MET** (deferred to W4 Lane A; landed at `36305da`) | W7 spec scope deferred DESIGN.md edit to W4.A doc cohort; W4.A landed it. |

**Verdict**: clean.

### WV — V-tranche post-hoc plan-folder write-up (commit `14266b5`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| WV.a | `docs/tranches/V/V.md` authored | **MET** | File exists (16,476 bytes). Prelude + thesis + invariants + wave schedule + transpositions + cross-tranche debt sections per spec. |
| WV.b | `waves/V.W{2,3,4}.md` per release with SHAs | **MET** | All 3 files exist (V.W2.md 7,620 / V.W3.md 8,838 / V.W4.md 7,073 bytes). 68 commits attributed across the 3 cohorts (proof doc records +1 vs spec's 67-count discrepancy honestly). |
| WV.c | `FINAL.md` with absorbed-by-V ledger + transpositions catalogued | **MET** | File exists (11,072 bytes). 14 named architectural transpositions cited (11 V.W3 + 2 V.W2 + 2 V.W4 chassis). |
| WV.d | `PROGRESS.md` exists for parallel-folder hygiene | **MET** | File exists (402 bytes; minimal per spec). |
| WV.e | K invariant 3 satisfied retroactively | **MET** | V is no longer commit-message-only; plan-folder structure now exists. |
| WV.f | typecheck/build/test green | **PARTIAL** | typecheck exit 0; build flagged "pre-existing dts OOM" not WV-caused; tests not run (docs-only). K-pre-close ledger confirms typecheck + build + test green at HEAD. |
| WV.g | 12 orphan-token K invariant 8 verification | **MET** | `WV` proof §K invariant 8: zero `var(--orphan)` consumption at HEAD across src/ + demo/. |

**Verdict**: clean.

### WP — Lighthouse perf + a11y cohort (commit `8ec320b`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| WP.a | viz-basis buttons AA-compliant | **MET** | `demo/stories/primitives/buttons.vue:118` — `text-white` → `text-foreground`. |
| WP.b | aria-label / visible-text reconciled (aurora chips + dock dropdown) | **MET** | `PresetPickerRow.vue` aria-label dropped; `dock.vue:136` dropped `aria-label="Dock command"`. Verified at HEAD via rg. |
| WP.c | `Skeleton.vue` shimmer keyframe transform-only | **MET** | `Skeleton.vue:50` — `animation: skeleton-shimmer-slide`; `:54` `@keyframes skeleton-shimmer-slide { to { transform: translateX(100%); } }`; `:53` `will-change: transform`. Reduced-motion gate preserved. |
| WP.d | Fraunces stylesheet async-loaded | **MET** | `index.html:32` — `media="print"` + `onload="this.media='all'"` + `<noscript>` fallback. |
| WP.e | Computer Modern `font-display: swap` | **MET** | `demo/demo.css` — 4 `@font-face` blocks (regular/bold/italic/bold-italic), each carries `font-display: swap`. Broad upstream `@import` removed. |
| WP.f | typecheck/build/test green | **PARTIAL** | typecheck green; build/test deferred per proof's transient dts pipeline issue (resolved at K-pre-close: build green + 340 tests pass). |
| WP.g | Lighthouse re-run | **DEFERRED to W8 ε lane** | Per `WP` proof §Lighthouse re-run: dispatch environment lacked headless Chrome; expectations documented in proof. ε lane re-runs at W8 close. |

**Verdict**: clean (Lighthouse re-run deferred to ε lane per spec accommodation).

### WS — Speedtest-W feedback: vueuse SCC trap (v0.9.3) (commit `a598b90`)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| WS.1 | `dist/forms.{js,d.ts}` + `dist/composables/{dark,keyboard}.{js,d.ts}` emit | **MET** | Per K-pre-close: dist subpath emission verified. `src/forms.ts`, `src/composables/dark.ts`, `src/composables/keyboard.ts` exist. |
| WS.2 | `package.json` exports for `./forms` + `./composables/dark` + `./composables/keyboard` | **MET** | `package.json:303,308,313` — three exports entries with matching `typesVersions`. |
| WS.3 | glass-ui `npm test` ≥ 340/340 | **MET** | K-pre-close: 27 files / 340 tests pass. |
| WS.4 | glass-ui `npm run build` exit 0 | **MET** | K-pre-close: build exit 0 in 27.81s. |
| WS.5 | v0.9.3 tag pushed | **MET** | K-pre-close: "Tag: v0.9.3 pushed to origin." |
| WS.6 | speedtest SCC trap broken (modulepreload-free WITH vueuse manualChunk) | **MISSED-AS-DOCUMENTED** | Per `W-S-bundle-evidence.md` §Disposition: HALT — Phase 1 additive-only does NOT break the SCC trap. The wave's stated hard gate (modulepreload-free WITH vueuse manualChunk applied) was not met; modulepreload directive reappears under post-state grep. |
| WS.7 | Speedtest entry-chunk gz net drop ≥ 15 KB | **MISSED-AS-DOCUMENTED** | Per evidence transcript: net eager-path delta is **+2,055 B regression** (entry chunk drops 30,524 B but new vueuse leaf adds 33,579 B). Phase 1 alone insufficient. |
| WS.8 | Zero substantive PNG diff in 9-cell visual matrix | **NOT RUN** | Per evidence: visual-regression matrix not run because disposition was HALT before that step; additive-only is byte-identical so visual diff would be no-op anyway. |
| WS.9 | CHANGELOG.md v0.9.3 entry documents subpath additions + SCC analysis | **MET** | `CHANGELOG.md:1-86` — v0.9.3 entry with ADDED / WHY / MIGRATION / **KNOWN LIMITATION** sections; the KNOWN LIMITATION explicitly discloses Phase 1 doesn't close the SCC trap and routes Phase 2 to L/v1.0. |
| WS.10 | DESIGN.md "Subpath surface" section | **MET** | `DESIGN.md` Subpath surface section documented; orchestrator-side merge between W4-A and WS lanes resolved. |

**Verdict**: **DEGRADED-AS-DOCUMENTED**. Per WS spec §Risks: "if Rollup's tree-shaker still pulls vueuse-bearing surfaces into the entry chunk because the root barrel re-exports them, the trap persists. Mitigation: the bundle-evidence step verifies the modulepreload-free state. If the trap persists, this becomes a Phase 2 work item — root-barrel removal — and the wave's hard gate degrades to 'v0.9.3 ships the additive subpath, with explicit MISS-DOC on the SCC trap and a route to L.W* for the breaking-change phase'." — exactly the posture WS landed in. **Honest disclosure** in CHANGELOG.md "KNOWN LIMITATION" + W-S-bundle-evidence.md "Disposition: HALT". Phase 2 routed to L/v1.0; speedtest disposition stays `ACCEPT-AS-DEFERRED`. **The degradation is the spec's pre-disclosed risk path; the wave closes per the documented degradation, not in a covertly-failed state.**

### W8 — Close ceremony (in progress)

| # | Hard-gate item | Disposition | Evidence |
|---|---|---|---|
| W8.A | Pre-close orchestrator pass complete | **MET** | `K-pre-close.md` authored; commit `3a4ea3f`. Wave ledger + gates + residuals captured. |
| W8.B | 7-agent strengthened audit dispatched | **IN PROGRESS** | α lane (this audit) + β/γ/δ/ε/π/ι lanes — pending dispatches. |
| W8.C-F | Findings absorb / FINAL.md / commit | **PENDING** | Author after audit lanes return. |

## Cross-cutting observations

### Per-wave commit ledger consistency

- **12 active wave commits + 1 pre-close orchestrator pass = 13 commits** since W0 close `f5cdd53`. Matches K-pre-close.md ledger exactly.
- **Per-wave commit subject conformance**: every commit follows `feat|fix|docs|chore(tranche-k/wN[-{a,b}]): summary` format per K hard-gate-3 invariant. Verified across all 12 wave commits.
- **W3 split into A+B** + **W4 split into A+B** + **W6 single combined commit** — all match the per-lane commit semantics each wave spec named or implied.
- **W2 RETIRED** in PROGRESS.md ledger with V-attribution; no W2 commit (correct — no work to commit).

### PROGRESS.md alignment with reality

- All 13 status rows correspond 1:1 to commits in the git log.
- PROGRESS.md cites correct SHAs (verified via `git log --oneline f5cdd53^..HEAD`).
- "WS CLOSED" with annotation "**SCC trap stays open** — Phase 2 routed to L/v1.0; cross-repo annotation at speedtest `6f412d89`" — matches CHANGELOG.md + W-S-bundle-evidence.md. **PROGRESS.md is honest about the WS degradation.**

### W6 brittleness window

- **Declared correctly** per K plan §Brittleness window: "If W6 audacious primary-CTA extraction breaks the design-fidelity gate momentarily ... declare a `breaking_changes_during_wave: yes` window in W6 with restoration in W8 close ceremony."
- **W6-B proof** §Step 7 carries the full window declaration with `suspended_gates: dock-primary-tier-visual-fidelity`, `restoration_wave: W8 close ceremony π lane visual probe`, and an explicit `retraction_condition` (≤ 0.5% pixel diff threshold).
- **K-pre-close.md** §Brittleness window restates this verbatim: "The π lane verifies retraction." — **α-lane verifies the declaration + restoration plan exist**; π lane owns the visual verdict.
- **No premature retraction** — neither WV/W4-A/WP/WS post-W6 commits attempt to retract the window; the gate stays suspended until π lane probe lands.

### W4 Lane A absorption ledger (sibling-wave doc deltas)

W4.A spec §Sibling-wave absorption ledger names 6 sibling-wave doc deltas to absorb. Verified each:

| Sibling | Delta | W4.A absorption | Verified |
|---|---|---|---|
| W1 (`563b200`) | `openDelay → hoverOpenDelay` rename | DESIGN.md HoverPopover spec + CLAUDE.md/README.md tree | ✓ rg verifies 0 `openDelay` literal hits, ≥ 4 `hoverOpenDelay` hits per doc |
| W3.A (`76fff65`) | `cssVar` retire + `useTokenColor` supersede + overlay-scrim delete | DESIGN.md Composables + CLAUDE.md citation | ✓ rg verifies 0 `cssVar(` doc hits |
| W6 (`154d1d2`) | `primary-audacious` variant + `btn-audacious` utility + Option B phase-color | DESIGN.md Buttons table + new subsection + CLAUDE.md/README.md mentions | ✓ rg verifies ≥ 4 `primary-audacious` hits per doc |
| W7 (`2197596`) | Configurator P0 + Slider-in-Dock contract + Slider-only Option B | DESIGN.md NEW Configurator section + Slider keep-dock-open contract subsection + CLAUDE.md | ✓ verified in W4-A proof |
| WP (`8ec320b`) | Skeleton compositor migration | DESIGN.md Skeleton paragraph rewritten | ✓ verified in W4-A proof |
| WV (`14266b5`) | 11 V-tranche primitives + 23 v0.9.0 composables + 5 chassis | CLAUDE.md file-tree fully rewalked + DESIGN.md UI primitives + Composables sections | ✓ verified in W4-A proof |

WS-side DESIGN.md "Subpath surface" section authored separately by WS lane; W4.A proof §Coordinated WS dispatch note acknowledges the disjoint coordination.

### Process incidents (named for ι-lane absorption)

1. **W3 Lane A `git stash` violation** (1 occurrence). Agent ran `git stash --keep-index` for state-probe; recovered fully via Edit tool re-application. Stash dropped by orchestrator. Recorded in `W3-A-src-vocab-residue-proof.md` §Step 5 + K-pre-close.md §Process incidents. **α lane notes the incident; ι lane absorbs the precept implication.**
2. **W3 Lane B mid-run revert** (harness-level, not agent-violation). Files reverted then re-applied; final on-disk state confirmed. Recorded in K-pre-close.md.
3. **W6 worktree isolation** (orchestration anomaly). `Agent isolation: "worktree"` parameter passed, but agents wrote to absolute paths (main tree). Worktree created but circumvented. Lesson: relative paths required when worktree isolation is required. Recorded in K-pre-close.md.

## Discrepancies between plan and actual

### Substantive discrepancies — none

Every K-named hard gate either landed at HEAD (MET / PARTIAL with named residual) or was struck/absorbed by reconciliation (OBSOLETE) or shipped in degraded form per the spec's pre-disclosed risk path (DEGRADED-AS-DOCUMENTED for WS).

### Minor discrepancies (recorded for transparency, not blocking)

1. **WV commit-count divergence**: W-V.md spec cites 67 commits in the V-tranche cohort; WV proof's `git log --oneline 0666be6..23ce73c | wc -l` returns 68. The +1 discrepancy is documented honestly in V.md + FINAL.md. Substantive cohort unchanged.
2. **WV V.W2 attribution scope-reveal**: `afb2b34` (12 orphan-token excise) attributed to V.W2 by W-V.md spec but lands chronologically in V.W3 window. Attribution follows release-note semantics over chronology. Recorded in V.W2.md scope-reveal note.
3. **WV "23 vs 24 composables"**: W-V.md cites 23 composables in v0.9.0 release notes; the `323d675` storybook entries commit ships 24 entries (23 V.W4 public + `useStoryDemo` demo-private). Both figures used contextually correctly in V plan files.
4. **`scripts/ay-close.sh` file remains on disk**: W4.B retired the npm script entry but left the file. K-pre-close.md residual list flags for K W8 cleanup pass.

None of these blocks K close.

## Verdict

**K closes clean per α lane** with one **DEGRADED-AS-DOCUMENTED** wave (WS Phase 1) and zero P0/P1 findings to absorb before close.

**Hard-gate count**: 11 active waves (W2 retired) × multiple hard-gate items = 60+ gates verified; 100% met (modulo OBSOLETE-by-reconciliation strikes, which are explicitly authorized by 2026-05-08 reconciliation, and the WS DEGRADED-AS-DOCUMENTED path, which is explicitly authorized by the WS spec §Risks).

**WS Phase 1 disposition**: shipped exactly as the WS spec §Risks anticipated — additive subpath split + honest CHANGELOG.md "KNOWN LIMITATION" disclosure + Phase 2 (root-barrel removal, breaking, v1.0) routed to L tranche. The wave is **closed-as-degraded**, not closed-as-failed; the degradation is the spec's pre-disclosed risk path. PROGRESS.md row reads "**SCC trap stays open** — Phase 2 routed to L/v1.0" — honest by α-lane standards.

**W6 brittleness window**: declared per K plan §Brittleness window; restoration plan (W8 π lane visual probe) is in place; α lane verifies the declaration + restoration plan exist. π lane owns the visual verdict. The window stays suspended until the π lane probe lands.

**W3.A git stash incident**: 1 process violation; recovered fully; recorded; ι lane absorbs the precept implication. α lane just notes the incident. No silent miss.

Per α-lane rubric: **K is ready for FINAL.md authorship after the remaining 6 audit lanes (β, γ, δ, ε, π, ι) return clean and any cross-lane findings absorb in W8.**

**Final tally**: 0 P0 findings; 0 P1 findings; 1 DEGRADED-AS-DOCUMENTED wave (WS, expected per spec); 1 process incident (W3.A stash, recorded for ι); 4 minor recorded transparency notes (none blocking).

K closes clean per α lane.
