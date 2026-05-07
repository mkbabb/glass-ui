# Rα — J retrospective + plan-vs-actual deep audit

**Authored**: 2026-05-06.
**Lane**: α — J retrospective + plan-vs-actual deep audit.
**Mode**: READ-ONLY on src/, demo/, tests/, docs/ (write only on this file).
**Baseline**: master HEAD `5bcf1ce` (W7 close ceremony) — chain `5baceb5..5bcf1ce` (8 commits).
**Author**: K-prep research agent, dispatched parallel-α to β/γ/δ/ε/ζ.

This audit is harsher than the W7 α-lane. The W7 α-lane used MET / MET-WITH-AMENDMENT / DEFERRED / MISSED / OUT-OF-SPEC and returned 12/12 passes. This audit uses CANONICAL / AMENDMENT / AMENDMENT-DRIFT / DEFER-WITH-RATIONALE / DEFER-AS-RESIDUAL / EXECUTED-WITH-WORKAROUND / MISSED-SILENTLY against the gestalt-rewrite thesis the user explicitly named. Plan-vs-amendment dispositions that the W7 α-lane scored MET-WITH-AMENDMENT are reclassified here whenever the amendment yielded substrate less gestalt than the original prescription.

---

## §A — Architectural transpositions deep audit (J invariant 2)

### §A.1 — DockPopover → HoverPopover (W3 Lane B)

**Original prescription** (J.md L23 + W3.B): "DockPopover collapses onto Popover with two thin extension props (`keepDockOpen`, `hoverOpenDelay`)."

**Landed substrate** (W0 §F item 3 amendment): `<HoverPopover>` (already on master via `a042b61`) gains a single `keepDockOpen` prop. `<Popover>` is left untouched. `<DockPopover>` retired (256 LOC) per `audit/W3-B-popover-proof.md` L60-72.

**Source verification at HEAD**:
- `rg DockPopover src/ demo/ tests/` — 0 hits ✓
- `src/components/custom/hover-popover/HoverPopover.vue` carries `keepDockOpen?: boolean` + `dockKeepOpen`/`dockRelease`/`glassDockId` injects (verified at the file).
- 3 demo consumers in `demo/stories/navigation/dock.vue:183, 199, 217` (rg confirms).

**Verdict reasoning**: the W0 §F item 3 rationale ("click-anchored popovers don't hold the dock open, so keepDockOpen belongs only on the hover-driven primitive") sounds watertight on its face. Two cracks under harsher scrutiny:

1. **The `hoverOpenDelay` half of the original prop pair was silently DROPPED** during the amendment. J.md L23 named two extension props; W3.B shipped one. The `hoverOpenDelay` value is now hardcoded to reka-ui HoverCard's default (~250ms — verified in π lane samples L66 of `audit/J-audit-π-visual-runtime.md`). Consumers cannot tune the dock-popover open delay independently of every other HoverPopover instance. **MISSED-SILENTLY** on this prop alone.

2. **The "click-anchored popovers don't need keepDockOpen" claim is empirically untested**. The W0 §F item 3 amendment asserts it but cites no consumer-side evidence. A speedtest-style "click to open settings panel inside dock" pattern would want `keepDockOpen` on a click-anchored Popover too — the amendment's logic is "we don't have such a consumer in this repo at this moment", which is a substrate-shape-of-the-day argument, not a gestalt-rooted one. If K introduces such a consumer, `<Popover keepDockOpen>` would have to be added retroactively, undoing the "single primitive owns this contract" benefit.

**Verdict for keepDockOpen**: **AMENDMENT-DRIFT**. The amendment yielded a HoverPopover-only `keepDockOpen`; the original gestalt was "dock-keep-open is a contract any popover-shape primitive can opt into". The amendment chose narrower; if K needs broader, this becomes a wrap-and-rename liability.

**Verdict for hoverOpenDelay**: **MISSED-SILENTLY**. The prop was named in J.md, omitted at W3.B close, and never landed in any residual ledger.

### §A.2 — Configurator unification (W4 Lane A)

**Original prescription** (J.md L24): "Aurora + blob configurators converge to one `<Configurator>` primitive + `useConfiguratorState<T>` composable; the duplicated configurator chrome retires."

**Landed substrate**: New primitive at `src/components/custom/configurator/{Configurator.vue, ConfiguratorLayer.vue, ConfiguratorRow.vue, useConfiguratorState.ts}` (verified `ls` at HEAD). Demo's pre-existing token-editor `Configurator.vue` renamed to `PresetEditor.vue` (W0 §F item 2).

**Source verification at HEAD**:
- `rg "<Configurator " demo/stories/aurora.vue demo/stories/motion/metaballs.vue` — both stories import.
- **But: aurora and metaballs are NOT parallel compositions.** Aurora uses `<Configurator scroll-mode="never">` purely as a chrome wrapper; the actual layered controls live in the PRE-J `AuroraConfigDock.vue` (113 LOC, `demo/stories/aurora/AuroraConfigDock.vue:1-113`), which was preserved unchanged. Aurora never consumes `<ConfiguratorLayer>` or `<ConfiguratorRow>`.
- Metaballs DOES consume the full chain: `<Configurator>` + 7× `<ConfiguratorLayer>` + N× `<ConfiguratorRow>` + `useConfiguratorState<MetaballConfig>`.
- Aurora uses its own `useAuroraStudio` (per-preset clone semantics); metaballs uses `useConfiguratorState` (single-config baseline-restore). Aurora's comment `demo/stories/aurora.vue:25-28` admits the divergence: "differs from `useConfiguratorState`'s single-config baseline-restore semantics".

**Verdict**: **AMENDMENT-DRIFT**. The `<Configurator>` shell is canonical (2 consumers, ≥2 bar passes); but `useConfiguratorState` is METABALLS-ONLY (1 consumer at HEAD, sub-bar). The state-management half of the gestalt failed to absorb aurora's per-preset-clone needs. The duplicated configurator chrome was retired in name only — `AuroraConfigDock.vue` IS the duplicated chrome, just relocated inside a new wrapper.

The original W4.A thesis ("aurora + blob converge to ONE primitive") is half-true: chrome converged, state did not.

The PresetEditor rename (W0 §F item 2) absorbed a name collision elegantly — that part is **CANONICAL**. The drift is `useConfiguratorState`.

### §A.3 — StoryChassis (W5 Lane D)

**Original prescription** (J.md L24): "Story-page chassis lifts to `<StoryChassis>` (or `.story-page` utility) — the 15× repeated `<CreamSurface><DisplayHero><FlourishDivider>` pattern from W4 lands as a single substrate."

**Landed substrate**: NONE. Lane D defers per W0 §F item 8 + `audit/W5-D-story-chassis-proof.md`.

**Survey re-verification at HEAD**:
- `rg "rounded-(2xl|card) border .* bg-card .* shadow-cartoon" demo/stories/` returns **11 matches across 8 files** (re-verified at HEAD, matches the survey's `audit/W5-D-story-chassis-survey.md` Pattern Survey table line-for-line).
- `rg "CreamSurface|DisplayHero|FlourishDivider" src/ demo/` — 0 hits ✓ (R3-cited primitives gone).
- `<StoryPage>` at `demo/stories/StoryPage.vue` consumed by **78 demo files** (rg confirms; matches survey).

**Survey breadth check**: The survey query (`rounded-(2xl|card) border .* bg-card .* shadow-cartoon`) targets the *inline content-tile* pattern, NOT the *page-chassis* pattern (which would be `<CreamSurface>...<DisplayHero>...<FlourishDivider>`). The "0 chassis-pattern shape" claim is pedantically correct (the page-chassis primitives are gone, so 0 page-chassis usages) — but the survey conflated two patterns in its disposition: the 8 inline-tile sites are real and represent a `<CartoonCard>` adoption gap, not a StoryChassis gap.

**Verdict**: **DEFER-WITH-RATIONALE**. The substrate Lane D was meant to compose has been retired upstream; building it would be substrate-without-consumer (R3-cited primitives don't exist). The defer is principled. **However**, the 8 inline-tile bypasses identified in the survey are a real K candidate (cartoon-card adoption sweep — see §H K-recommendation P1).

The harsher critique: the W5.D survey could have flagged this as TWO defers — page-chassis (deferred until cream-language primitives return) AND cartoon-card-adoption (forwarded to next vocab.γ wave). The survey did flag it, but it was filed as "out of scope for W5.D" rather than as a named K residual in J FINAL. FINAL.md does not name a destination for the cartoon-card adoption sweep. **MISSED-SILENTLY** for cartoon-card adoption residual.

---

## §B — 18 user-findings re-verification at HEAD

Each row independently checked at HEAD `5bcf1ce`, not trusting PROGRESS.md.

| # | Finding | PROGRESS claim | HEAD verification | Verdict |
|---|---|---|---|---|
| 1 | Dock max-w/h overflow scroll | LANDED W3.C | `--dock-max-{inline,block}-size` defined in `src/styles/tokens.css`; consumed in `src/styles/dock.css:42, 139` (verified). Mask-fade on horizontal + vertical rails confirmed. | CANONICAL |
| 2 | Top-dock collapse cornerstone (jerks) | LANDED W3.A | `useLayerTransition` consumed by `<GlassDock>` (verified `rg useLayerTransition src/components/custom/dock/GlassDock.vue` returns hits); `visibility:hidden` retired; opacity transition; π lane 20-frame Playwright sample shows continuous spring overshoot to 226.66px settling at 216 by t=290ms. | CANONICAL |
| 3 | Dock blurs reduce | LANDED W3.C | `--glass-blur-dock-radius: 0px` at `src/styles/tokens.css` (verified rg). | CANONICAL |
| 4 | Drag slider — dock holds | LANDED W5.C | `useDockState.isHeld` ComputedRef provided; `data-held` attr on `.glass-dock`; Slider injects `dockHeld`. Implementation correct. **BUT no demo story binds `<Slider>` inside `<GlassDock>` to visually demonstrate the cross-substrate halo+dock-bg coupling** (β audit V10 caveat F4). The contract API works; the visual coupling has no story to prove it. | CANONICAL-BUT-NO-DEMO (filed as residual in FINAL) |
| 5a | Vertical rail overflows | LANDED W3.C | `dock.css` overflow-y + scrollbar-thin + mask-fade confirmed. | CANONICAL |
| 5b | Remove dev text | RETIRED-PRE-J | `rg "INTERNAL_CATEGORY|Wrench" demo/stories/manifest.ts` returns 0. **Verified at HEAD independently** (W0 §F item 5 claim was correct). | CANONICAL (prerequisite fix landed pre-J via v0.8.0 consolidation) |
| 6 | DockPopover gestalt | LANDED W3.B | `rg DockPopover src/ demo/ tests/` returns 0; `<HoverPopover>` carries `keepDockOpen` prop; 3 demo consumers. **Drift**: `hoverOpenDelay` prop named in J.md never landed (see §A.1). The "wrap-and-rename" critique: **partially valid** — DockPopover's hover semantics are now in HoverPopover, but `<HoverPopover>` itself wraps reka-ui's `<HoverCard>`. The gestalt collapse is one layer deep. The user's "DRY-reuse our other components" intent is met for hover-mode; click-anchor mode is not addressed (DockPopover supported both). | AMENDMENT-DRIFT |
| 7 | Blob configurator buildout | LANDED W4.C (as metaballs) | `demo/stories/motion/metaballs.vue` consumes `<Configurator>` + 7 layers + 3 presets + `useConfiguratorState`. Verified. | CANONICAL |
| 8 | Aurora configurator scroll-wrapping | LANDED W4.B | Configurator + scroll-fade-y consumed; AuroraConfigDock has overflow-x scrolling pane. Verified. | CANONICAL |
| 9 | Aurora configurator side clips | LANDED W4.B | PaletteLayer absorbed via configurator scroll-fade-y; BouncyToggle gained `overflow="scroll"` prop. Verified. | CANONICAL |
| 10 | Aurora top black bar | LANDED W4.B | PresetPickerRow `bg-muted` → Skeleton variant="shimmer". Verified by π. | CANONICAL |
| 11 | Speedtest aurora preset | LANDED W4.C | `auroraPresets.SPEEDTEST` 12th entry in `demo/stories/aurora/presets.ts:383-480`. Verified. | CANONICAL |
| 12 | Slider padding standardized | LANDED W5.A (CVA size axis) | `sliderVariants` CVA in `src/components/ui/slider/index.ts:26-50` (5 variants × 3 sizes). The "padding standardized" desire is met via the size axis. | CANONICAL |
| 13 | NumberField rounded | LANDED W5.B | `rounded-input` (10px) consumed by NumberField; +/- buttons compose `<Button asChild variant="ghost" size="icon">`. Verified. | CANONICAL |
| 14 | Slider · Glass Track refinement | LANDED W5.A (glass-pill variant) | `glass-pill` variant ships with halo via `--surface-tint-12`, gradient range, scale-press. **β V6 confirms** the user's "invisible at rest" concern is RESOLVED (border `1px solid 0.08α`, halo `0.08α`, gradient `0.15→0.25`). **However**: LESSONS-LEARNED 2026-05-06 "Visual Load-Bearing-ness Bar" cites slider-glass-track invisible at rest as a R6 finding; the new glass-pill variant addresses it via explicit border + halo. The user's desire ("greatly enhanced") is met for the glass-pill variant; the *original* glass-track variant is gone (renamed). The variant family change is a clean break per `feedback_no_backwards_compat`. | CANONICAL |
| 15 | Status badge alignment | LANDED W6.A | Badge `size="md"` in status cell; baseline alignment verified by π (`badge_y_center=303, otherCell_y_center=303 at 1440`). | CANONICAL |
| 16 | DATA · FUZZY SEARCH refinement | LANDED W6.B | `wc -l src/components/custom/search/FuzzySearch.vue` = **158** (≤200 target). Verified at HEAD. | CANONICAL |
| 17 | clearSearchCache rename + contrast | LANDED W6.C.1 | `<Button variant="destructive" size="sm">` 4.70:1 contrast (π V16). `danger-subtle` retired (`rg "danger-subtle" src/ demo/` returns 0). Lib export `clearSearchCache` preserved with consumer alias `as clearCache`. | CANONICAL |
| 18 | Basic horizontal pager weak | LANDED W6.C.2 | `<CarouselPager>`, `<CarouselDots>`, `<GlassCarouselPager>` shipped; basic + audacious pagers retired. **P0 carousel demo bug absorbed in W7** (`demo/stories/navigation/carousel.vue:114-116` re-positioned). | CANONICAL (post-W7 absorb) |

**Re-verification tally**: 16 CANONICAL + 1 AMENDMENT-DRIFT (#6) + 1 CANONICAL-BUT-NO-DEMO (#4).

**Specifically scrutinized**:
- **5b (dev-text)**: VERIFIED INDEPENDENTLY at HEAD. `manifest.ts` 243 lines, 0 hits for INTERNAL_CATEGORY/Wrench. The W0 §F item 5 claim ("already retired during v0.8.0 consolidation") holds. Not assumed — independently re-verified.
- **14 (glass-pill)**: VISUAL FIDELITY VERIFIED via β V6. The user's "invisible at rest" concern is genuinely resolved. The W7 π contrast probe and β load-bearing-ness probe both confirm the glass-pill variant ships visible halo + border + gradient. **Not a wrap-and-rename** — the prior `glass-track` variant string was retired and `glass-pill` is a new recipe with explicit visual reach. **CANONICAL**.
- **6 (DockPopover gestalt)**: WRAP-AND-RENAME CRITIQUE — see §A.1. The HoverPopover keepDockOpen pivot is gestalt-correct for hover-mode but partial for the user's broader intent ("nest many other component types within the dock, animated, idiomatically"). DockPopover supported click + hover; HoverPopover keepDockOpen supports hover only. K should consider: does the user want a `<Popover keepDockOpen>` for click-anchored panels? See §A.1 §H K-recommendation P1.

---

## §C — W0 amendments re-validation (§F items 1-10)

For each amendment, was the spec-vs-HEAD divergence the amendment claimed actually present at the time of W0?

| Item | Premise | Re-verified at HEAD? | Verdict |
|---|---|---|---|
| §F item 1 | 27 stale `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` references at HEAD (v0.8.0 cleanup miss) | `rg "var\(--glass-(bg\|blur\|border\|shadow)-(subtle\|default\|medium\|elevated)" src/ demo/` returns **0 hits at HEAD** post-W2. The amendment's premise was correct (the 27 references existed before W2 absorbed them). | VALID — amendment landed; cleanup verified. |
| §F item 2 | `<Configurator>` name collision: `demo/configurator/Configurator.vue` already exists (356 LOC token-editor) | `git show 5baceb5:demo/configurator/Configurator.vue` would confirm pre-J state. At HEAD, the file is `PresetEditor.vue` (rename completed). Premise was correct. | VALID. |
| §F item 3 | `<HoverPopover>` exists at HEAD (v0.7.0 `a042b61`) and is a more gestalt-correct collapse target than extending `<Popover>` | `<HoverPopover>` exists at `src/components/custom/hover-popover/HoverPopover.vue`. Amendment's premise correct. **But the amendment's reasoning ("click-anchored popovers don't need keepDockOpen") is unproven** — see §A.1. | VALID-BUT-AMENDMENT-DRIFT (see §A.1). |
| §F item 4 | Card variant API retired in v0.8.0; `<ScrollPane>` is the canonical sibling | `<ScrollPane>` exists at `src/components/ui/scroll-pane/`; Card has no variant prop. Premise correct. | VALID — DROP applied. |
| §F item 5 | INTERNAL_CATEGORY already retired at HEAD | Independently re-verified: `rg "INTERNAL_CATEGORY\|Wrench" demo/stories/manifest.ts` returns 0. | VALID — DROP applied. |
| §F item 6 | `--space-phi-{5,6}` undefined at HEAD AND no consumers either | `rg "var\(--space-phi-5\|6\)" src/ demo/` confirms 0 production consumers AT HEAD POST-W1. The 11 R3-cited consumers existed on the planning branch but were never merged. Amendment says "ship as preemptive substrate" — at HEAD post-W1, tokens defined + 0 production consumers. **β audit confirms 0 consumers F5**. | VALID PREMISE — but amendment's "preemptive substrate" justification is now violated by the substrate-with-consumer precept. See §F. |
| §F item 7 | No `sliderVariants` CVA at HEAD; build from scratch with 5 variants × 3 sizes | At HEAD post-W5: `src/components/ui/slider/index.ts` carries `sliderVariants` CVA. Premise correct. | VALID — landed. |
| §F item 8 | Story files cited by R3 (slider-glass-track.vue, audacious-hero.vue, golden-ratio.vue, flourishes.vue, blob-stress.vue) don't exist at HEAD | Independently verified: `ls demo/stories/foundations/flourishes.vue` returns "No such file"; `ls demo/stories/primitives/slider-glass-track.vue` returns "No such file". **Premise correct**. | VALID. |
| §F item 9 | R5 axis-1 row "border-opacity-{light,medium,strong}" claim was wrong (tokens exist) | Not independently re-verified in this audit (low priority — R5 hygiene fix). | VALID-PRESUMED. |
| §F item 10 | flourishes.vue path stale (W1.4) | Verified — file does not exist. W1.4 deferred. | VALID. |

**All 10 amendments had correct premises at the time of W0**. None were based on stale grep targets — but item 6 (`--space-phi-{5,6}` preemptive) was a deliberate violation of substrate-without-consumer that was rationalized as "W5.D + W4 chassis pattern may still need them once StoryChassis lands". W5.D deferred; the consumers never materialized. The substrate is orphan at HEAD.

---

## §D — Process-incident root-cause analysis

### §D.1 — W3 Lane B "external rollback between tool calls"

**Symptom** (per `J-pre-close.md:91`): "the parallel W4 agents' partial writes intersected with W3's dock work mid-flight. Recovered surgically via Edit tool; **no `git stash` use**; no precept violation."

**Diagnosis**: this is a **parallel-agent file-race**. W3 ran on `src/components/custom/dock/*` + `src/styles/dock.css`; W4.A ran on `src/components/custom/configurator/*` + `demo/configurator/*`; W4.B ran on `demo/stories/aurora/*` + `BouncyToggle.vue` + `BouncyTabs.vue`; W4.C ran on `src/components/custom/metaballs/*` + `demo/stories/motion/metaballs.vue`. **Bounds were declared disjoint at dispatch** (J.md L86 wave-concurrency note). However, the W4.A agent's stash incident captured ALL on-disk unstaged changes including W3 and W4.B/C files; the stash pop failed mid-application; recovery via `git checkout stash@{0} -- <files>` may have rewound shared files.

**Root cause**: **all 4 agents were operating on the same unstaged working tree**. Even though file BOUNDS were disjoint, the FILESYSTEM was not. A stash captures by filesystem state, not by declared bounds. When agent W4.A stashed, agents W3 + W4.B + W4.C lost their uncommitted state.

**Could `Agent isolation: worktree` have prevented this?** YES. If each parallel agent operated in a separate `git worktree`, W4.A's stash would only affect its own worktree. The W3 Lane B agent reports "external rollback" — this is the symptom of a stash in a sibling agent's view of the shared tree.

**Prevention for K**: **the dispatch template's Worktree field should be REQUIRED, not informational**. Parallel agents within a wave MUST run in separate `git worktree`s. The orchestrator merges via cherry-pick or rebase at wave close. ORCHESTRATION.md does not currently name this — it only says "use at most 10 agents in a wave" + "assign explicit may-read, may-modify, and must-not-touch paths". The bounds-discipline assumption breaks under parallel-agent shared-tree.

### §D.2 — W1 + W4.A `git stash` violations

**W1 incident** (`audit/W1-vocab-gamma-proof.md` post-script): "during initial verification I ran `git stash` (forbidden per LESSONS-LEARNED 2026-05-04). The stash-pop triggered conflicts; I recovered without further destructive operations by re-applying the missing edits via `Edit` tool, then dropped the stash."

**W4.A incident** (`audit/W4-A-configurator-primitive-proof.md` L196-202): "I ran `git stash --keep-index --include-untracked` followed by `git stash pop` as a state-inspection probe."

**Common trigger**: both agents reached for `git stash` as a **state-inspection probe**, NOT as a recovery mechanism. The current LESSONS-LEARNED 2026-05-04 rule prohibits stash "as a recovery mechanism". An agent reading the rule literally might think "I'm not recovering, I'm inspecting state, so stash is fine".

**Root cause**: **rule is under-specified**. The intent is "don't run any potentially-state-rewinding git command, period". The wording "as recovery mechanism" leaves a state-inspection loophole. The dispatch template (AGENT_DISPATCH_TEMPLATE.md L46-49) carries the same wording.

**Prevention for K**: the dispatch template should name **explicit alternatives** the agent can reach for instead of stash:
- "want to inspect what changed since the last commit?" — `git diff` (read-only).
- "want to verify clean working tree?" — `git status` (read-only).
- "want to test if rolling back fixes a build?" — make Edit-tool reversals one-by-one until you find the offender. Never stash; never `git checkout HEAD --`.

The rule should read: **"never run any `git` subcommand that mutates the working tree. Mutating subcommands include `stash`, `checkout HEAD --`, `reset --hard`, `clean -fd`. Use `git diff` and `git status` for inspection. If you need to revert your own edits, use the Edit tool surgically."** Also: **the orchestrator should commit at wave OPEN as well as close**, so agents have a known-clean checkpoint to compare against without needing stash.

### §D.3 — Index pollution (W3 commit absorbing W4.A's PresetEditor renames)

**Symptom**: `git show deba31d --stat` (W3 close commit) includes `demo/configurator/PresetEditor.vue 356 +++++++++++`, `demo/configurator/PresetEditorField.vue 52 ++`, `demo/configurator/usePresetEditor.ts 657 +++++++++++++++++++++` — these are W4.A artefacts, not W3.

**Diagnosis**: at W3 wave close, the orchestrator ran `git add -A && git commit` (or equivalent) which staged the WHOLE working tree, including W4.A's in-flight rename. Per ORCHESTRATION.md L36-37: "Commit or otherwise checkpoint natural milestones. Do not batch unrelated work behind a vague 'tranche progress' summary." The orchestrator violated this by sweeping W4.A's work into W3's commit.

**Why this is bad**: W3's commit message (`feat(tranche-j/w3): dock cornerstone + DockPopover→HoverPopover + overflow + blur`) does not mention PresetEditor renames. A future bisect that wants to attribute the PresetEditor rename will land on the W3 commit and read a misleading message. The reverse-bisect cost is non-trivial.

**Process failure**: this is an orchestrator-tier discipline failure, not an agent failure. The orchestrator at W3 close should have used `git add -p` or explicit file paths, NOT `git add -A`.

**Prevention for K**: the dispatch template / ORCHESTRATION.md should name "commit per declared file bounds — never `git add -A` at wave close when sibling waves are in-flight". Equivalently: **wait for all parallel waves in the current cohort to declare done before any commits**, OR maintain strict per-wave staging discipline. The worktree-per-agent prescription from §D.1 also obviates this — each worktree commits its own bounds.

---

## §E — J close criteria re-verification at HEAD

The 10 J close criteria from `J.md ## Hard gates`:

| # | Criterion | PROGRESS claim | HEAD verification | Status |
|---|---|---|---|---|
| 1 | Every wave closed per hard gate | PASS | All 8 waves have proof docs + commit + PROGRESS status entries | MET |
| 2 | Zero raw `popover-animate slide-in-from-side` slot-list duplicates | 9 canonical consumers; 0 raw | `rg -c "popover-animate slide-in-from-side" src/` returns 9 hits across canonical components (PopoverContent×2, Tooltip, HoverCard, Combobox, DropdownMenu×2, ContextMenu×2). 0 raw `data-[state=open]:animate-in.*slide-in-from-{top,right,bottom,left}` duplicates. | MET |
| 3 | Zero raw `focus-visible:shadow-[var(--focus-ring-shadow)]` repeats | 0 in src/ | `rg -c "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" src/ demo/` — 0 in src/, **5 hits in demo/** (`CategoryRail.vue:1, combobox.vue:1, shadows.vue:1, intro.vue:1, dock-layers.vue:1`). The criterion says "zero raw repeats" without specifying scope; α audit clarifies "repeats" means src/ canon. **5 demo bypasses survive** as named K residuals per FINAL.md L114. | MET-FOR-SRC, RESIDUAL-IN-DEMO |
| 4 | Zero raw `bg-black/{40,50,80}` overlay scrims | 0 hits | `rg "bg-black/(40\|50\|80)" src/` returns 0 ✓ | MET |
| 5 | Dock collapse animation timing samples confirm continuous interpolation | 50-frame sample per W3-A proof; 20-frame sample per π lane | π lane samples 20 frames, settle by t=290ms; spring overshoot to 226.66 at t=106 settles to 216 by t=290. **No visibility:hidden binary jump.** | MET |
| 6 | clearSearchCache button passes WCAG AA contrast | 4.52:1 light / 8.72:1 dark per W6-C1 proof; 6.55:1 per π | π re-measures at **6.55:1** (button bg vs page bg). Button bg vs button fg: 4.70:1. Both clear AA 4.5:1. | MET |
| 7 | FuzzySearch.vue ≤ 200 LOC + composes only canonical primitives | 158 LOC | `wc -l src/components/custom/search/FuzzySearch.vue` = **158** ✓ | MET |
| 8 | Aurora configurator at 1024×768 + 1440×900 + 375×667 viewports renders without clip/black-bar | Pass per W4-B + π | π lane confirms aurora at 3 viewports renders without clip/black-bar. | MET |
| 9 | 6-agent post-close audit returns clean BEFORE FINAL.md | Strengthened pattern executed; W7 absorbs absorbed | Audit ran; P0/P1 absorbs (carousel, recovery-diary, dock token, PresetEditor recipes) absorbed. FINAL.md authored after. | MET |
| 10 | Binding precept updates landed in `docs/precepts/` | Submodule advanced 67c1412 → 6b8437a | Precept submodule confirmed advanced; SPEC.md ## Close section carries the strengthened multi-viewport π + per-story δ + visual-load-bearing β clauses. | MET |

**Independent rg-count verification of W7-α-cited counts**:
- popover-animate slide-in-from-side: 9 ✓ (matches W7-α's 9)
- focus-visible:shadow raw: 0 in src/ ✓ (W7-α reported 0)
- bg-black/{40,50,80}: 0 in src/ ✓
- DockPopover hits: 0 ✓
- danger-subtle hits: 0 ✓
- glass-{subtle,default,medium,elevated} class strings: 0 ✓
- var(--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}): 0 ✓ (all 27 absorbed)

**All 10 close criteria MET at HEAD**. The W7-α-lane's claims hold up under independent re-verification.

---

## §F — Substrate-without-consumer audit at HEAD

Every J-shipped artefact rg'd at HEAD for current consumer count.

| Artefact | Wave | Production consumers | Bar | Status |
|---|---|---|---|---|
| `--space-phi-5` | W1 | 0 (only `@theme` bridge in `theme.css`) | <1 | **ORPHAN — substrate-without-consumer** |
| `--space-phi-6` | W1 | 0 | <1 | **ORPHAN** |
| `--surface-tint-{4,6,8,10,12,15,18,22,25}` (9 rungs) | W1 | 13 sites (Slider, GlassTimeline, GlassCarouselItem, ProgressiveSidebar, BouncyToggle, button) | ≥2 | KEEP |
| `--overlay-scrim` | W1 | 5 (ConfirmDialog, SheetContent, DialogContent, DialogScrollContent, DrawerOverlay) | ≥2 | KEEP |
| `--overlay-scrim-strong` | W1 | 1 (DrawerOverlay) | <2 | **SUB-BAR** but documented as variant |
| `--overlay-scrim-subtle` | W1 | 1 (DialogScrollContent) | <2 | **SUB-BAR** |
| `--duration-sparkle` | W1 | 1 (`dock.css:763` post-W7-absorb — was 0 pre-W7) | <2 | **SUB-BAR** |
| `--success-foreground` | W1 | 0 (only `@theme` bridge) | <1 | **ORPHAN** |
| `--warning-foreground` | W1 | 0 | <1 | **ORPHAN** |
| `--info-foreground` | W1 | 0 | <1 | **ORPHAN** |
| `--radius-tooltip` | W1 | 1 (TooltipContent.vue) | <2 | **SUB-BAR** (tooltip is the only tooltip primitive) |
| `--muted-soft` | W1 | 0 (only `@theme` bridge) | <1 | **ORPHAN** |
| `--muted-medium` | W1 | 4 (CarouselDots, BouncyToggle, Slider, ProgressiveSidebar) | ≥2 | KEEP |
| `.sheet-animate` `@utility` | W1 | 3 (SheetContent, DialogContent, DialogScrollContent) | ≥2 | KEEP |
| `.overlay-scrim` `@utility` | W1 | 0 (consumed via Tailwind `bg-overlay-scrim` color utility derived from `@theme`, NOT via the `@utility` block) | <1 | **DUPLICATE / ORPHAN** |
| `cssVar()` composable | W1 | 1 (BouncyToggle, ×3 calls in one file) | <2 | **SUB-BAR** |
| `<HoverPopover keepDockOpen>` prop | W3.B | 3 (`demo/stories/navigation/dock.vue`) | ≥2 | KEEP |
| `<Configurator>` shell | W4.A | 2 (aurora.vue, metaballs.vue) | =2 | AT BAR |
| `<ConfiguratorLayer>` | W4.A | 1 (metaballs.vue only — aurora doesn't use it) | <2 | **SUB-BAR** |
| `<ConfiguratorRow>` | W4.A | 1 (metaballs.vue only) | <2 | **SUB-BAR** |
| `useConfiguratorState<T>` | W4.A | 1 (metaballs.vue) | <2 | **SUB-BAR** |
| `<BouncyToggle overflow>` prop (non-default `"scroll"`) | W4.B | 1 (AuroraConfigDock) | <2 | **SUB-BAR** |
| `sliderVariants` CVA | W5.A | substrate; consumed via `<Slider>` (~25 instances) | ≥2 | KEEP |
| `<Slider keepDockOpen>` prop (default true) | W5.C | 25 implicit consumers (default-on); 0 explicit overrides | n/a | KEEP (default-on) |
| `useDockState.isHeld` | W5.C | 2 (Slider injects `dockHeld`; GlassDock binds `data-held`) | ≥2 | KEEP |
| `<Badge size>` axis | W6.A | 4 explicit + 26 implicit (default `md`) | ≥2 | KEEP |
| `<CarouselPager>` | W6.C.2 | 1 (`navigation/carousel.vue`, post-W7 fix) | <2 | **SUB-BAR** |
| `<CarouselDots>` | W6.C.2 | 1 | <2 | **SUB-BAR** |
| `<GlassCarouselPager>` | W6.C.2 | 1 (`containers/glass-carousel.vue`) | <2 | **SUB-BAR** |

**Summary**:
- **6 ORPHAN tokens** (`--space-phi-5`, `--space-phi-6`, `--success-foreground`, `--warning-foreground`, `--info-foreground`, `--muted-soft`) — 0 consumers, only `@theme` bridges.
- **1 ORPHAN @utility** (`.overlay-scrim` block — consumed via Tailwind color utility instead).
- **9 SUB-BAR primitives/props/composables** below the `≥2` consumer bar.

**Is the orphan substrate a J close-criteria violation?** Per ORCHESTRATION.md L17-18 ("Substrate with consumer. New abstractions land with a runtime caller, test, benchmark, or other proof that the abstraction is consumed") AND `feedback_overfitting_audit` — YES, orphan substrate is a precept violation. The W7 β audit flagged 5 of these (F5-F8 + F9), classifying as P2 ("DEFER-TO-K with named justification"). FINAL.md L115-117 names them as residuals to "either wire (Notification.vue refit) in K or formally retire". So they are **named residuals**, technically clearing the "no silent deferrals" precept; but they are NOT cleared from substrate-without-consumer ledger. K must absorb-or-retire.

**β audit's "preemptive substrate" justification (W7 β L120)**: cites `feedback_overfitting_audit` library-orphan triage option (c) "shipped for forward compatibility with a named consumer roadmap entry". The K-tranche entry is named in FINAL.md cross-tranche debt. **But** the precept says "WITH A NAMED CONSUMER ROADMAP ENTRY" — not just "K will decide". FINAL.md does not name a specific consumer; it says "either wire OR retire". That's not a roadmap entry, that's a fork. The orphan ledger is **technically still violating** the substrate-without-consumer precept until K commits to a wire.

---

## §G — Verdict

For each J prescription, assign one classification.

### J architectural transpositions (J invariant 2)
- DockPopover → HoverPopover (W3.B): **AMENDMENT-DRIFT** (keepDockOpen narrow; hoverOpenDelay missed-silently)
- Configurator unification (W4.A): **AMENDMENT-DRIFT** (`<Configurator>` shell canonical; `useConfiguratorState` aurora-incomplete; AuroraConfigDock not retired)
- StoryChassis (W5.D): **DEFER-WITH-RATIONALE** (R3-cited primitives gone; principled defer)

### J binding invariants (12)
1. C-I precepts bind: **AMENDMENT** (2 stash violations are precept hits but recovered; LESSONS-LEARNED reinforcement absorbed)
2. Architectural transposition default: **AMENDMENT-DRIFT** (per above; 2 of 3 transpositions had drift)
3. Cornerstone failures get cornerstone treatment: **CANONICAL** (W3.A useLayerTransition outer pair is gestalt-correct)
4. Vocabulary preconditions land first: **CANONICAL** (W1 substrate-only commit)
5. Audit-lane strengthening binding: **CANONICAL** (precept submodule advanced)
6. No new public components beyond named 3: **CANONICAL** (2 landed + 1 deferred = 3 ceiling)
7. FuzzySearch ≤200 LOC: **CANONICAL** (158 LOC)
8. clearSearchCache rename binary: **CANONICAL** (preserved lib export with consumer alias is canonical per R4 §C)
9. Speedtest preset in consumer: **CANONICAL**
10. Visual-load-bearing-ness β bar: **AMENDMENT** (absorbed into precept; landed gates per audit)
11. Story-fidelity policy: **AMENDMENT** (W2 per-story consumption deferred to W7; landed via δ lane)
12. Configurator scroll-wrap + dock max-w/h same canonical mechanism: **CANONICAL**

### W0 amendments (10)
All 10 had correct premises. Items 1, 2, 4, 5, 7, 8, 9, 10: **CANONICAL** application of premise. Item 3: **AMENDMENT-DRIFT** (correct premise; partial yield per §A.1). Item 6: **EXECUTED-WITH-WORKAROUND** (preemptive substrate justification → orphan substrate at HEAD).

### J close criteria (10)
All 10: **CANONICAL** (verified at HEAD). Criterion 3 has demo residue (5 demo focus-shadow bypasses) but criterion as written ("zero raw repeats") refers to src/.

### Process incidents (3)
- W3 Lane B "external rollback": **EXECUTED-WITH-WORKAROUND** (recovered surgically; root cause not fixed → worktree isolation prescribed for K)
- W1 + W4.A `git stash` violations: **EXECUTED-WITH-WORKAROUND** (recovered; rule is under-specified — see §D.2)
- W3 commit index pollution: **EXECUTED-WITH-WORKAROUND** (orchestrator discipline failure; no rule against it in current ORCHESTRATION.md)

### 18 user findings
- Findings 1, 2, 3, 5a, 5b, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18: **CANONICAL** (16/18)
- Finding 4 (drag-keep-open): **CANONICAL-IMPL + DEFER-AS-RESIDUAL** (no demo story for visual coupling — named in FINAL residuals)
- Finding 6 (DockPopover gestalt): **AMENDMENT-DRIFT** (HoverPopover keepDockOpen is half-gestalt; click-anchored case unaddressed; hoverOpenDelay missed-silently)
- Finding 14 (glass-pill): **CANONICAL** (β V6 confirms visible halo + border + gradient)

### Substrate-without-consumer ledger (per §F)
- 6 ORPHAN tokens + 1 ORPHAN @utility: **EXECUTED-WITH-WORKAROUND** (β audit P2 deferred; FINAL names them as "wire OR retire" — NOT a named-consumer roadmap entry; technically violates substrate-with-consumer precept)
- 9 SUB-BAR artefacts: **DEFER-AS-RESIDUAL** (named in FINAL)

### Tally

| Classification | Count | Notes |
|---|---:|---|
| **CANONICAL** | ~25 | Cornerstone fix; 16 of 18 user findings; vocab preconditions; precept update; close criteria; 8 of 10 W0 amendments |
| **AMENDMENT** | 5 | C-I precept bind (with stash-incident reinforcement); visual-load-bearing β bar absorption; story-fidelity δ lane; clearSearchCache lib-name preservation; 1 of 3 transpositions (Configurator chrome canonical, state isn't) |
| **AMENDMENT-DRIFT** | 4 | DockPopover→HoverPopover (keepDockOpen narrow); Configurator unification (state-management half failed); finding 6 (wrap-and-rename in disguise for click-anchor case); J invariant 2 (transposition default — 2 of 3 had drift) |
| **DEFER-WITH-RATIONALE** | 1 | StoryChassis (R3-cited primitives gone) |
| **DEFER-AS-RESIDUAL** | 11 | 9 sub-bar artefacts; finding 4 demo gap; cartoon-card adoption |
| **EXECUTED-WITH-WORKAROUND** | 7 | W0 §F item 6 (preemptive orphan tokens); W3 external rollback; W1 + W4.A stash; W3 index pollution; orphan tokens × 2 (counted as 1 cohort); orphan `@utility` |
| **MISSED-SILENTLY** | 2 | `hoverOpenDelay` prop never landed; cartoon-card adoption residual not in FINAL named-destinations |

**MISSED-SILENTLY count is the harshest finding**: 2 P0 items the user explicitly asked us to identify. Both are minor in source impact but precept-significant.

---

## §H — K candidacy recommendations

Severity scale: **P0** = K must absorb (precept violation, MISSED-SILENTLY, or substrate orphan with no roadmap); **P1** = K should absorb (gestalt completion, AMENDMENT-DRIFT promotion to canonical); **P2** = K-tranche residual (sub-bar artefacts, demo gaps).

### P0 (must-absorb)

1. **Orphan-token retire-or-wire decision** (§F substrate ledger). The 6 ORPHAN tokens (`--space-phi-{5,6}`, `--success/warning/info-foreground`, `--muted-soft`) plus the 1 ORPHAN `@utility` (`.overlay-scrim`) are precept violations until K commits to a specific consumer. K must EITHER wire each (e.g., `<Notification variant="success">` consuming `--success-foreground`) OR retire the substrate per `feedback_no_backwards_compat`. "Either wire OR retire" in J FINAL is not a roadmap entry; K must close the fork.

2. **`hoverOpenDelay` MISSED-SILENTLY** (§A.1). Either ship `<HoverPopover hoverOpenDelay>` as a typed prop in K (≥1 consumer demonstrates), OR strike the prop from J.md retroactively as never-shipped. The current state is: J.md L23 names a prop the source doesn't carry, and no residual ledger acknowledges it.

3. **Cartoon-card adoption sweep MISSED-SILENTLY** (§A.3, §B finding 4 demo gap). 8 demo stories use raw `rounded-card border bg-card shadow-cartoon` triplet where `<CartoonCard>` is canonical. The W5.D survey flagged this as "out of scope for W5.D" but FINAL.md does NOT name a destination. K wave-spec should run a single `<CartoonCard>` adoption sweep in scope-equivalent to W2 vocab.γ.

### P1 (should-absorb)

4. **Configurator unification gestalt completion** (§A.2). `<ConfiguratorLayer>` + `<ConfiguratorRow>` + `useConfiguratorState` are 1-consumer (metaballs only) at HEAD. AuroraConfigDock (113 LOC) survives as the parallel chrome that the J transposition was meant to retire. K should: either (a) refactor AuroraConfigDock to compose `<ConfiguratorLayer>` + `<ConfiguratorRow>` (extending `useConfiguratorState` with per-preset clone semantics so aurora can adopt), OR (b) formally retire `<ConfiguratorLayer>`/`<ConfiguratorRow>`/`useConfiguratorState` as metaballs-only and rename them appropriately. Either path closes the AMENDMENT-DRIFT.

5. **DockPopover keepDockOpen click-anchored case** (§A.1). Decide: does click-anchored `<Popover>` need `keepDockOpen`? If yes (e.g., a settings panel inside a dock that opens on click), ship `<Popover keepDockOpen>` symmetric to `<HoverPopover keepDockOpen>` and document them as the two opt-in points for the dock-keep contract. If no, document the asymmetry in DESIGN.md (dock-keep is hover-only by design). The current state is silent on this — consumers reading DESIGN.md will assume dock-keep is universal.

6. **Worktree-per-agent prescription for parallel waves** (§D.1). ORCHESTRATION.md should require parallel agents to run in separate `git worktree`s. The current "disjoint file bounds" rule is necessary but insufficient — file bounds + shared filesystem still permit cross-agent state corruption via stash or any working-tree-mutating command. K's W0 should land the precept update in the same shape J.W0 landed the strengthened audit pattern.

7. **Dispatch template stash rule sharpening** (§D.2). Replace LESSONS-LEARNED 2026-05-04 wording "as a recovery mechanism" with "for any reason whatsoever". Add explicit alternatives section (`git diff` for inspection, Edit tool for per-line revert, halt-and-report if rolling back the whole wave is needed).

8. **Orchestrator-side commit discipline** (§D.3). ORCHESTRATION.md should name "commit per declared file bounds — never `git add -A` at wave close when sibling waves are in-flight". Equivalently, sequencing: parallel waves all return their own diffs; orchestrator stages each wave's bounds explicitly; commits per wave; never sweeps unstaged content.

### P2 (K-tranche residual)

9. **5 demo focus-shadow bypasses** — `CategoryRail.vue`, `combobox.vue`, `shadows.vue`, `intro.vue`, `dock-layers.vue`. Mechanical sweep; fold into vocab.γ residue absorb wave.

10. **3 demo `--surface-tint` bypasses** — `aurora/NucleiOverlay.vue:68`, `foundations/paper-glass.vue:184` (×2). Vocab.γ residue.

11. **`--muted-40` library survivor** — `ProgressiveSidebar.vue:209`. One-line fix.

12. **`motion/stagger.vue:59 transition-all` survivor** — single site.

13. **`--overlay-scrim-{strong,subtle}` 1 consumer each** — accept as semantic variants (the variants are semantically distinct from base) OR retire.

14. **`<CarouselPager>`/`<CarouselDots>`/`<GlassCarouselPager>` 1-consumer each** — wait for second consumer (e.g., a demo story that uses CarouselPager outside `<Carousel>` via the `:api`-driven prop pattern β P0 mentioned).

15. **Drag-keep-open story-fidelity gap** (finding 4) — add demo story binding `<Slider>` inside `<GlassDock>` to visually exercise the cross-substrate halo + dock-bg coupling.

16. **`cssVar()` 2nd consumer** — extend or document as WAAPI-only.

17. **Bundle-budget gate re-land** — I invariant 8 enforcement (script + workflow + BUDGETS table). FINAL flagged this; not blocking but should land before K closes.

18. **CLAUDE.md + README.md major refresh** — γ flagged 11+7 drift items; defer to docs-only commit before K opens.

19. **Top story-pager dock 4px overflow at 375 viewport** — π P1 mobile-viewport refinement.

20. **GlassCarousel audacious pager chevrons unreachable on mobile** — π P2 responsive-stack the audacious pager.

21. **Stress harness retire decision** — ε P2.

22. **`ay-close.sh` reappearance** — ε P2 cross-ref.

23. **Audacious primary-CTA variant** — formally deferred to K per J cross-tranche debt.

---

## Cross-references

- J.md (12 invariants + 10 close criteria): `docs/tranches/J/J.md`
- 18 user findings: `docs/tranches/J/findings.md`
- W0 reconciliation (131-row ledger): `docs/tranches/J/audit/W0-reconciliation.md`
- W7 audit lane reports: `docs/tranches/J/audit/J-audit-{α,β,γ,δ,ε,π}-*.md`
- Per-wave proof docs: `docs/tranches/J/audit/W{0..6}-*-proof.md`
- LESSONS-LEARNED: `docs/precepts/instructions/LESSONS-LEARNED.md` (2026-05-04 stash rule, 2026-05-05 binary-scrub rule, 2026-05-06 visual-runtime + per-story + load-bearing rules)
- ORCHESTRATION + dispatch template: `docs/precepts/instructions/{ORCHESTRATION,tranche/AGENT_DISPATCH_TEMPLATE}.md`
- Evidence baseline: master HEAD `5bcf1ce` (W7 close ceremony commit)

## Sibling-lane coordination

This α-lane retrospective focuses on plan-vs-actual deep audit. K-prep sibling lanes own:

- **β** (chronic deferrals): the 11 sub-bar artefacts + 4 deferred-to-K names from FINAL are β's territory.
- **γ** (J FINAL residuals → K candidates): the 13 named residuals in FINAL.md cross-tranche debt section are γ's primary input.
- **δ** (worktree/dispatch friction): §D.1-D.3 root-cause findings here are δ's load-bearing input.
- **ε** (substrate transposition opportunities): the AMENDMENT-DRIFT verdicts (§A.1, §A.2, J invariant 2) are ε's load-bearing input.
- **ζ** (user-prompt recap): the 18 findings disposition table (§B) is ζ's load-bearing input.

K planning should cross-walk this α-lane against β-ζ before synthesizing the K thesis — particularly the substrate-orphan ledger (§F) and the AMENDMENT-DRIFT cohort (§A).
