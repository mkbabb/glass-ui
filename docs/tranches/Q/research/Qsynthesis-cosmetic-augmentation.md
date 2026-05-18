# Q audit-augmentation — cosmetic-round synthesis (Qη/θ/ι/κ/λ/μ)

**Round opened**: 2026-05-18 (after Q-open commit `95098d1`).
**Trigger**: user reports keyframes.js demo broken in multiple ways (timeline, play button non-rainbow, hero bold); requests 6-agent parallel sweep across all consumers; fold-in vs revert per finding; augment wave set.
**Status**: 6/6 returned. This file synthesises + maps to wave-augmentation lanes.

## Round map

| Agent | Charter | Findings | Verdicts |
|---|---|---|---|
| Qη | keyframes.js cosmetic forensics (3 named symptoms + sweep) | 9 | 2 substrate REVERT + 4 consumer FOLD-IN + 3 ancillary |
| Qθ | value.js cosmetic sweep | 0 P0/P1 + 6 confirmations | post-P shadow cohort = ZERO consumer surface; user-visible regression is NOT Card-shadow |
| Qι | bbnf-buddy cosmetic sweep | 17 | 9 fold-in + 2 substrate referrals + 6 no-op |
| Qκ | fourier-analysis + words/frontend | 14 | 13 sites of phantom `.glass-{subtle,medium}` (cluster C2 in Qλ) |
| Qλ | speedtest + 43×6 cross-tranche matrix | 0 P0/P1 speedtest; 3 clusters cross 3-consumer threshold | C2 is canonical N-class audit blind-spot; **zero glass-ui-side reverts warranted by Qλ alone** |
| Qμ | Playwright visual re-probe (binding) | 37 screenshots; 6 NEW findings | **Mμ-5 P0 reframes the value.js BLOCKER — picker 0×0, NOT Card-shadow**. Mμ-1 fourier blank (consumer dep). Mμ-4 confirms rainbow missing |

## Root-cause re-synthesis (overturns 2 prior attributions)

### 1. The value.js user-visible BLOCKER is the picker, not Card-shadow

Qα at round-1 attributed value.js's "totally broken" to two symptoms: dist-clobber + 11 `<Card variant="pane">` sites silently swallowing the prop into a hard-black-shadow fallback. Qμ's live probe reframes this:

- **Mμ-5 P0**: the value.js picker pane is collapsed to 0×0 at HEAD. This is the user-visible "totally broken" surface.
- Qα §3 Card-shadow rows are mostly stale or location-mismatched at HEAD (value.js's WIP branch `w.w2.1-value-js-prebuild` already migrated the 11 sites — Qθ confirms).
- Qζ B-1 (value.js cannot boot) RESOLVED IN-FLIGHT: value.js boots cleanly at HEAD post the P.W5 build-of-record.

**Implication**: Q.W1 Lane C is incomplete as specified. Add Lane I — picker 0×0 attribution + fix.

### 2. The keyframes.js "totally broken" is partly substrate-revert, partly consumer-drop

The 3 user-named symptoms decompose to:

- **Hero bold**: TWO defects.
  - Consumer: `font-bold` Tailwind class on `<h1>` at `keyframes.js/demo/@/components/custom/editor-shell/EditorStartScreen.vue:6` → drop the class (consumer FOLD-IN).
  - Substrate: `glass-ui/src/styles/typography.css:196-201` redundantly redeclares `--font-serif` as a `:root` literal AFTER tokens.css + theme.css already bridge it; this **defeats consumer `@theme` overrides** of the typography ladder. Commit `6ce14e5` L.W1 introduced the dup → **REVERT substrate-side**.
- **Play button no rainbow**: commit `b0debec` D.W2.D titled "delete zero-site style-surface orphans" was WRONG about "zero-site" — retired `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` utility recipes while `--rainbow-*` color tokens survive in tokens.css and keyframes.js's demo consumes them. The D.W2.D audit missed the keyframes.js consumption. → **REVERT substrate-side** (re-promote the 3 recipes as `@utility` consuming the surviving tokens).
- **Timeline**: KeyframeTimeline is consumer-internal (no glass-ui timeline). PlaybackRibbon Slider `variant="timeline"` survives source-side. Most likely the visual symptom is downstream of the play-button regression (the play button is INSIDE the timeline chrome). → defer to W5 re-probe after Qη 1.A + 1.B substrate fixes land.

### 3. Cluster C2 (phantom `.glass-{subtle,medium}`) is the canonical N-class blind-spot

Qλ's 43×6 cross-walk identified one P1 silent visual regression that crosses the 3-consumer threshold: 10 sites of `.glass-{subtle,medium}` across keyframes (3) + value.js (2) + fourier (5), plus Qι's bbnf-buddy `preset.css` overrides 12 retired `--glass-{opacity,bg,blur}-{subtle,default,medium,elevated}` tokens (silent no-op fleet-wide).

**Total phantom-class fleet impact: 22+ cumulative references across 4 consumers.** Retired at M.W0 token rename; M.W1's per-consumer audit lanes caught it in words/frontend but not the other 3.

The mechanism is the same pattern that produced P.W2's stash-anti-pattern recurrence + invariant 29's K-invariant-3 recurrence: a prose-only sweep without a tooling gate. Qλ's recommendation: codify **"phantom-class corpus grep"** as a mechanical M-class migration-sweep gate. → **NEW invariant 32**.

### 4. Card grep must broaden (fleet now 18 sites, not 17)

Qι F-3 surfaces a 7th stale `<Card variant="…">` site at `bbnf-buddy/AnimationWorkspace.vue:157` passing `'default' | 'cartoon'` — Q11's original grep only matched `variant="pane"` and missed it. Cumulative fleet: value.js 11 + bbnf-buddy 6 (`pane`) + bbnf-buddy 1 (`default | cartoon`) = **18 sites**.

→ W2 Lane B + C grep widens to `<Card[^>]*variant=` (any variant value).

## Wave augmentation plan

Existing 6 waves W0-W5 stay; each gets new lanes (lettered after the highest existing lane). No new wave inserted — keeps tag cadence + critical path intact.

### W0 — unchanged

Diagnosis lanes (retrospective + dev-resolution contract + proof gate) stand. Cosmetic round adds no W0 work.

### W1 — adds 3 lanes (cosmetic fold-ins land alongside resolver fixes)

| Lane | Source | Action |
|---|---|---|
| **W1 Lane H** | Qη 1.A consumer + Qη §5 swept | keyframes.js consumer-side cosmetic fold-ins: drop `font-bold` on hero (`EditorStartScreen.vue:6`); retire `.dock-play-btn` consumer shim; `text-2xs` → `text-admin-label`; `server.fs.allow` widening per W0 contract |
| **W1 Lane I** | Mμ-5 | value.js picker 0×0 attribution + fix. The actual user-visible value.js regression. Per Qθ §3 the WIP branch already does this — the lane resolves Q-chron-1 (WIP-vs-master) AND fixes Mμ-5 in one stroke |
| **W1 Lane J** | Mμ-1 | fourier-analysis blank-paint fix: missing `extractAnimationOptions` export from `@mkbabb/value.js`. Patch value.js's barrel; verify fourier paints |

### W2 — broadens grep; cumulative fleet 18 (not 17) sites

| Change | Source |
|---|---|
| **W2 Lane B + C** grep widens to `<Card[^>]*variant=` (any value) | Qι F-3 |
| **Cumulative fleet count updates**: value.js 11 + bbnf-buddy 7 = 18 sites | Qι F-3 |
| **Lane A invariant-31 dev-warn** must trigger for the new `'default' | 'cartoon'` site too | Qι F-3 |

### W3 — adds 2 substrate-revert lanes

| Lane | Source | Action |
|---|---|---|
| **W3 Lane E** | Qη 1.B substrate REVERT | Re-promote `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` as `@utility` recipes in `utilities.css`, consuming the surviving `--rainbow-*` tokens. Verify the audit logic that retired them at `b0debec` D.W2.D — restore the keyframes.js consumption that the original audit missed. The L invariant-8 (substrate-without-consumer) still holds: post-revert, the recipes have ≥ 1 consumer (keyframes.js); the revert IS the consumer-rediscovery |
| **W3 Lane F** | Qη 1.A substrate REVERT | Retire `typography.css:196-201` redundant `:root --font-serif` literal. The bridge already exists in tokens.css + theme.css. The dup defeats consumer `@theme` overrides. Trace why `6ce14e5` L.W1 introduced it; if the prior bridge was incomplete at L.W1 but became complete later, the dup is now strictly fossil |

### W4 — adds 4 lanes (consumer cosmetic sweep + bbnf-buddy `preset.css`)

| Lane | Source | Action |
|---|---|---|
| **W4 Lane F** | Qλ cluster C2 + Qκ F-1/F-2 + Qκ W-1 | Fleet-wide phantom-class sweep: 13 sites of `.glass-{subtle,medium}` across fourier (9) + words/frontend (4). Migrate to canonical ladder (`wash/quiet/resting/floating`). Verdict: FOLD-IN (current ladder is canonical, consumer is fossil). Pair with **invariant 32 dispatch** (W5 codifies; W4 demonstrates the corpus-grep gate before codification) |
| **W4 Lane G** | Qι F-1 + F-2 | bbnf-buddy `preset.css` rewrite: 12 retired-token overrides → canonical ladder tokens (one cohesive close); plus fix `SelectionInfo.vue:238` retired `--glass-border-subtle` fallback. Verdict: FOLD-IN |
| **W4 Lane H** | Qι F-5/F-6/F-7 | bbnf-buddy 3-file `:deep()` retreat batch: `EmotionStateSelect ToggleChip active-label`, `EditorPanel ScrollPane viewport`, `ToolsLayer dock-icon-button size+disabled`. Per P.W5-D / CR-5 retreat-via-custom-prop contract. Substrate-side gap: if a custom prop doesn't exist, file at Q.Rh-2 (NEW substrate referral) — possible `--dock-icon-button-size` token gap |
| **W4 Lane I** | Qι F-4 | bbnf-buddy `preset.css:191-194` `--shadow-cartoon` override missing `-md`/`-lg` rungs — restore the lift scale. Verdict: FOLD-IN consumer-side |

### W5 — augments re-probe checklist + adds invariant 32 codification

| Augmentation | Source |
|---|---|
| Re-probe checklist adds: keyframes timeline correctness post Qη 1.B revert; hero font-weight post Qη 1.A; play-button rainbow recipe post Qη 1.B; value.js picker not 0×0 post W1 Lane I; cluster C2 zero phantom-class sites post W4 Lane F; Card fleet zero stale sites post broadened W2 grep | Mμ §5 + Qη §4 |
| **NEW invariant 32 codified**: phantom-class corpus-grep gate. Mechanical-gate analog of the prose-only sweep that produced cluster C2's 4-tranche carry-forward (M → N → O → P → AF). Author `scripts/proof-phantom-classes.mjs` — given a list of RETIRED CSS class names, greps every `@mkbabb/*` consumer + glass-ui's own demo + exits non-zero on any match | Qλ §recommendation |
| **NEW LL entry**: 5th K-class recurrence pattern — "codification without gate is necessary but not sufficient" recurred at glass-subtle-phantom (M-class) just as it did at K-invariant-3 (P → AF.W1) and at stash-anti-pattern (P.W2). The escalation pattern (prose → tooling) becomes itself a precept | Qλ |

## Net ledger delta

12 new IDs at `Q-cos-*` + 1 new invariant + 1 new precept entry:

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-1 | keyframes.js hero `<h1>` `font-bold` drop | W1 (Lane H) | FOLD-IN consumer |
| Q-cos-2 | typography.css:196-201 redundant `:root --font-serif` literal | W3 (Lane F) | REVERT substrate |
| Q-cos-3 | `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` retired at `b0debec` D.W2.D — re-promote | W3 (Lane E) | REVERT substrate |
| Q-cos-4 | keyframes timeline visual — defer-confirm post Qη 1.A + 1.B | W5 (re-probe) | BOTH-PATHS-VIABLE |
| Q-cos-5 | fourier blank — `extractAnimationOptions` missing export from `@mkbabb/value.js` | W1 (Lane J) | FOLD-IN consumer (value.js barrel) |
| Q-cos-6 | value.js picker 0×0 — Mμ-5 | W1 (Lane I) | FOLD-IN consumer (closes Q-chron-1 too) |
| Q-cos-7 | Cluster C2 phantom `.glass-{subtle,medium}` — 13 sites fleet-wide | W4 (Lane F) | FOLD-IN consumer |
| Q-cos-8 | bbnf-buddy `preset.css` 12 retired-token overrides | W4 (Lane G) | FOLD-IN consumer |
| Q-cos-9 | bbnf-buddy `SelectionInfo.vue:238` `--glass-border-subtle` retired fallback | W4 (Lane G) | FOLD-IN consumer |
| Q-cos-10 | bbnf-buddy `AnimationWorkspace.vue:157` 7th stale Card site (`'default' | 'cartoon'`) | W2 (broadened grep) | FOLD-IN consumer + tightens invariant 31 |
| Q-cos-11 | bbnf-buddy `preset.css:191-194` `--shadow-cartoon` lift-scale incomplete | W4 (Lane I) | FOLD-IN consumer |
| Q-cos-12 | bbnf-buddy 3-file `:deep()` retreat | W4 (Lane H) | FOLD-IN consumer + 1 substrate referral (Q.Rh-2) |
| Q-inv-32 | Phantom-class corpus-grep gate (new invariant + new script) | W5 | NEW invariant |
| Q-chron-3 | "Codification without gate" recurrence pattern (5th instance) — precept-LL entry | W5 (precept advance) | DOCUMENT |

## Brittleness check

Mμ-2 P1 keyframes hero `font-weight: 700 @ 96px` confirms Qη 1.A visually. Mμ-4 P1 keyframes play button confirms Qη 1.B visually. These two substrate REVERTs are the only revert verdicts in the entire round — every other finding is consumer FOLD-IN. Per the user's "PROPERLY fold in design items, or revert the changes entirely" framing: 2 substrate-side reverts (W3 Lane E + F), 10 consumer-side fold-ins (across W1/W2/W4), 1 deferred for re-probe (Qη 1.C), 1 new invariant + 1 new precept entry.

The cluster-C2 codification (invariant 32) gives the prose-edict / tooling-gate escalation pattern a third datapoint (K-invariant-3 stash-anti-pattern in P.W2 + K-invariant-3 K-invariant-3-recurrence in W0 + phantom-class blind-spot here). Three datapoints = the pattern itself is a precept (Q-chron-3).

## Net wave-counts (post-augmentation)

| Wave | Pre-aug lanes | Post-aug lanes | Net add |
|---|---|---|---|
| W0 | 3 | 3 | 0 |
| W1 | 7 (A-G) | 10 (A-J) | +3 |
| W2 | 3 (A-C) | 3 (A-C, **migration target REDIRECTED**: `tier="wash"` → `<ScrollPane>` per round-3 Qξ Path D) | 0 |
| W3 | 4 (A-D) | 7 (A-G) | +3 (Lane E rainbow re-promote, Lane F typography literal retire, **Lane G IconTooltip width-stretch revert** added round-3) |
| W4 | 5 (A-E) | 9 (A-I) | +4 |
| W5 | 7 audit + 6 re-audit | 7 audit + 6 re-audit + new invariant 32 + LL entry + augmented checklist | qualitative |

## Round-3 audit returns (user-pivot follow-on, 2026-05-18)

The user pivoted mid-augmentation: "No deferrals of auditing. value.js's card pane variants are critical, and should see usage in speedtest, no? Ensure. The pane variant should properly be folded back in, or an idiomatic solution derived. Look to our past commits for that item — this has existed before."

3 read-only audit agents dispatched (Qν/ξ/ο). Returns reframe the round-2 synthesis materially.

### Qν — speedtest Card pane scan: WEAK-REJECT direct pivot

- 0 direct `<Card variant>` sites in speedtest.
- 13 Card sites consume the canonical `tier` API; speedtest got the `5d914df9` S.W4 one-shot migration value.js + bbnf-buddy missed.
- speedtest is chart-and-meter-heavy (not editor-chrome-heavy) — pane semantics don't naturally land there. 2 weak hand-rolled pane-candidates (`SubnetAddDialog.vue:24` + `DashboardMap.vue:5`); neither is a forced-pane sin.
- Strengthens the case for invariant 31 fail-explicit (substrate-side gate); does NOT strengthen the case for re-introducing `variant="pane"` as a Card variant.

### Qξ — Card pane variant history: PATH D (the pivotal finding)

- `pane` introduced `e8380d7` 2026-03-25 in the initial glass-ui scaffold.
- `pane` removed `3a43a8f` 2026-05-06 — **commit message: "retire variant enum, ship tier API per R1-spec + R3 ladder"**.
- **CRITICAL**: same-day companion commit `e017d53` shipped TWO sibling primitives — `<ScrollPane>` (for `pane`) AND `<CartoonCard>` (for `cartoon`) — as orthogonal-to-the-glass-ladder primitives. `pane` was NOT deleted; it was LIFTED.
- `<ScrollPane>` lives at HEAD at `src/components/ui/scroll-pane/ScrollPane.vue`.
- `CHANGELOG.md` v0.8.0 documents the canonical migration: `<Card variant="pane" class="overflow-hidden">` → `<ScrollPane class="overflow-hidden">`.
- `tier="wash" :shadow="false"` (Qα + Q11 + my W2 round-1 proposal) is **PARTIAL faithful**:
  - bg/blur/border match
  - GRAIN miscalls (`.glass-wash::after` paints grain that legacy pane suppressed)
  - DROPS `<ScrollPane>`'s baked-in `overflow-auto` + `rounded-panel` contract
- `<ScrollPane>` is FAITHFUL across every dimension.
- **RECOMMENDED PATH D**: revise the 18-site fleet migration target from `tier="wash" :shadow="false"` → `<ScrollPane>`. Plus `bbnf-buddy/AnimationWorkspace.vue:157` `variant="'default' | 'cartoon'"` site migrates to `<CartoonCard>`. Plus invariant 31 fail-explicit ships orthogonally as the dev-warn for unknown props (closes the silent-swallow class going forward).

The user's "this has existed before" was correct — the variant existed; the round-1+round-2 mistake was assuming `tier` was the migration target when the same-day companion commit had already lifted pane to its own primitive. The CHANGELOG documents the canonical migration explicitly and we missed it.

### Qο — keyframes timeline re-audit: REVERT substrate (HIGH confidence)

Qη 1.C "defer to W5" verdict OVERTURNED. The timeline visual defect is attributed at confidence HIGH:

- **Dominant defect**: PlaybackRibbon Slider collapsed to 16px nub.
- **Root cause**: commit `25e1b5a` O.W6 Lane D added `<span class="icon-tooltip-trigger">` wrapper with `display: inline-flex; min-width/min-height: 44px` for WCAG 44×44 hit-area enforcement.
- **Unintended consequence**: inline-flex containers don't stretch to fill grid cells AND don't propagate width to `w-full` children. PlaybackRibbon is the only callsite in the constellation wrapping a stretching child (`<Slider variant="timeline">`) inside `<IconTooltip>`. The Slider's `w-full` resolves against zero-width parent → shrinks to thumb-only 16px.
- **Proof**: test fix at runtime — `.icon-tooltip-trigger { width: auto }` + child `width: 100%` — restored the full 318px pill scrub track.
- **Verdict**: REVERT substrate (W3 Lane G NEW). The O.W6 WCAG hit-area mechanism needs to NOT break width stretch — likely via `display: inline-block; padding` rather than `inline-flex; min-width`.
- Qη + Qμ both searched the wrong substrate (timeline tokens / glass tiers); IconTooltip wrap-span was the actual culprit.

### Net round-3 delta

1 new Q-cos ID (Q-cos-13 = IconTooltip width-stretch revert). W2 migration target redirected (no ID change; same Q-cos-10 + 18-site fleet). W3 gets Lane G (IconTooltip revert). The "pane fold-back" pivot resolves as Path D (no Card variant re-introduction; redirect to existing sibling primitives).

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-13 (NEW) | glass-ui IconTooltip `<span class="icon-tooltip-trigger">` wrap-span with `display: inline-flex; min-width: 44px` breaks `w-full` descendants in grid cells (PlaybackRibbon Slider collapse) | W3 (NEW Lane G) | **REVERT substrate** (commit `25e1b5a` O.W6 Lane D); re-implement WCAG 44×44 via padding rather than min-width |

W2 strategy revised (no new ID):
- `<Card variant="pane">` 17 sites → **`<ScrollPane>`** (was: `<Card tier="wash" :shadow="false">`).
- `<Card variant="cartoon">` 1 site → **`<CartoonCard>`** (was: same).
- Invariant 31 fail-explicit ships as the orthogonal dev-warn gate.

> **SUPERSEDED by round-4** — Qπ's adjudication retired `<ScrollPane>`. The final W2 target is `<Card tier="wash" :grain="false">`. See the round-4 section below.

## Round-4 audit returns (user-pivot follow-on, 2026-05-18)

The user raised three points: (1) is `<ScrollPane>` "truly befitting" as a component, or should `pane` be a Card variant — "is the logic/styling worthy of component like that?"; (2) ensure speedtest + value.js are migrated, accounting for their own latest tranches so Q does not duplicate work; (3) the keyframes.js demo is broken well beyond the timeline — bezier selector clipped, t-value scrubber non-functional, rotations dropdown missing progress circles, "many other style losses" — wanting a PROPER and IDIOMATIC glass-ui upgrade with no loss of feature or functionality.

6 read-only audit agents dispatched (Qπ/ρ/σ/τ/υ/φ).

### Qπ — `<ScrollPane>` architecture: DEMOTE-TO-VARIANT (the pivotal round-4 finding)

- `<ScrollPane>` is 43 lines — 11 script, 16 template, 0 style, 8 doc-comment. 100% styling-only: no `ref`, no lifecycle, no observer, no scroll state, no ARIA, no four-state contract. The "scroll" in the name is aspirational — it owns a static `overflow-auto` class; the browser owns scrolling.
- **1 consumer** at HEAD — its own demo story. Zero library consumers, zero compositions. Fails L invariant 8 (substrate-without-consumer) outright.
- Field-for-field expressible as `<Card tier="wash" :grain="false">` — Card already exposes the `grain` prop round-3's Qξ thought made `tier="wash"` only "partial-faithful". Qξ MISSED the `grain` prop. CVA cost to express as a Card config: zero.
- The `3a43a8f`/`e017d53` lift was correct for `CartoonCard` (genuinely off-ladder tokens) but WRONG for ScrollPane — `wash` IS a ladder rung Card already exposes.
- Side finding: ScrollPane ships an a11y regression — `scrollbar-hidden` + `overflow-auto` with no `tabindex` is a scroll container that cannot be keyboard-scrolled.
- **VERDICT: DEMOTE.** The W2 migration target re-pivots a THIRD and final time: `<Card variant="pane">` → `<Card tier="wash" :grain="false">`. `<ScrollPane>` retires (W3 Lane H NEW) — clean break, no alias.

The user's instinct ("is it truly befitting to have an entire component") was correct. The `<ScrollPane>` lift was the overreach; round-3 then mistook the overreach for the canonical answer.

### Qρ/σ/τ — keyframes.js demo: ~95% consumer-side

- **Qρ** (easing + playground): the t-value scrubber's pointer logic is sound — it never works because `EasingTarget` never mounts. `App.vue:106` wraps `<Transition mode="out-in">` around `<KeepAlive>` around `defineAsyncComponent`, crashing the renderer (`getNextHostNode` null-deref) on the transition leave hook. One bug masks the scrubber + bezier editor + presets + duration control. Playground is a non-functional shell. **Zero substrate fixes.**
- **Qσ** (animation scenes): engine + 4 live scenes functionally sound; same `<Transition>`+async crash on cold deep-link; a layer of un-swept dead code (`demo/{boxes,balls,bench,simple}` + standalone scene dupes). **Zero substrate fixes.**
- **Qτ** (shared chrome): the rotations-dropdown option-dots paint transparent — consumer `17adae2` "clean up styles, remove glass-ui overlap" deleted demo-local `.status-dot--*` colour classes (glass-ui ships only the colourless base `.status-dot`). `c7f7c96` deleted demo-local `.rainbow-*` + a preset import → black play button. The `@/components/ui` shadow layer is NOT a drift amplifier (live primitives import glass-ui directly; the 25 `ui/` dirs are dead). `ProgressRing` substrate-gap candidate flagged PROVISIONAL.

Unifying observation: the keyframes demo breakage is one `<Transition>`+async crash + a pair of "cleanup" commits that deleted load-bearing CSS — the EXACT anti-pattern as the substrate-side `b0debec` D.W2.D. Three instances of "cleanup deletes load-bearing artefact" → **NEW invariant 33** (dead-code-removal corpus-grep gate, generalising invariant 32) + **Q-chron-4**.

### Qυ/φ — consumer-tranche reconciliation: Q de-scopes

- **Qυ** (speedtest): 0 `<Card variant>` sites, 0 AF/AG-tranche collisions. speedtest got the `5d914df9` S.W4 tier-API sweep value.js + bbnf-buddy missed. Nothing to migrate. Q.W1 Lane G (resolver sweep) should land before AG's implementation GO — soundness preference, not a blocker.
- **Qφ** (value.js): value.js's own Tranche A already shipped most of what Q planned — A.W0 the un-break (= Q.W1 Lane C), A.W1 the 11-site Card migration to `tier="wash" :shadow="false" :grain="false"` (= the round-4 canonical target — A.W1 even caught the `:grain="false"` the Q plan omitted), A.W1 Lane B the phantom-class fix (= Q.W4-C2 value.js portion). The WIP branch is a strict master ancestor — Q-chron-1 CLOSED. Only the picker 0×0 (Mμ-5) is un-owned — Q.W1 Lane I retains it.

### Round-4 net delta

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-14 | `<ScrollPane>` DEMOTE — retire to `<Card tier="wash" :grain="false">` recipe | W3 (Lane H NEW) | DEMOTE substrate |
| Q-cos-15 | keyframes `App.vue` `<Transition>`+`<KeepAlive>`+async renderer crash | W5 (Lane A) | FOLD-IN consumer |
| Q-cos-16 | keyframes rotations-dropdown `.status-dot--*` deletion (`17adae2`) | W5 (Lane B) | FOLD-IN consumer (adopt `<StatusDot>`) |
| Q-cos-17 | keyframes dead-code purge | W5 (Lane F) | FOLD-IN consumer |
| Q-cos-18 | keyframes idiomatic glass-ui adoption sweep | W5 (Lane D) | FOLD-IN consumer |
| Q-cos-19 | keyframes square-scene + bezier-selector clipping | W5 (Lane E) | FOLD-IN consumer |
| Q-cos-20 | keyframes playground non-functional shell | W5 (Lane F) | FOLD-IN consumer (feature-completion) |
| Q-cos-21 | keyframes `glass-subtle→glass-wash` + missing `bg-background` | W5 (Lane B) | FOLD-IN consumer |
| Q-inv-33 | dead-code-removal corpus-grep gate | W6 | NEW invariant |
| Q-chron-4 | "cleanup commit deletes load-bearing artefact" pattern | W6 | DOCUMENT |

Plus: W1 Lane C + W2 Lane B + W4-Lane-F-value.js-portion RETIRE (value.js Tranche A did them). Q-chron-1 CLOSED. NEW wave W5 (keyframes restoration, 6 lanes); close renumbered W5→W6. 21 Q-cos-* IDs total; invariants 30-33; Q-chron 1-4.

### Why round-4's attributions matter

Across the 4 audit rounds the root-cause model was overturned twice — round-1 blamed a glass-ui substrate regression; round-2 found a cross-repo resolution desync + consumer staleness; round-3 found two genuine substrate reverts; round-4 found the keyframes demo is ~95% consumer-side and `<ScrollPane>` should never have been a component. The lesson (W6 LL entry): a large user-reported regression batch is worth iterative Playwright-binding audit rounds — each deeper probe corrected the prior round's attribution. The user's three pivots ("pane has existed before", "no deferrals", "is it befitting a component") each surfaced a real architectural error the prior round had codified.

## Round-5 audit returns (CartoonCard adjudication + full fleet migration map, 2026-05-18)

The user extended the ScrollPane question to CartoonCard — "CartoonCard should likely just be a variant, too, no?" — and asked for the full consumer-migration map folded in, with complete wave specs.

2 read-only agents (Qχ/ψ).

### Qχ — CartoonCard architecture: DEMOTE-TO-VARIANT

- 36 LOC, **zero own props**, zero behaviour — thinner than the already-demoted ScrollPane (which had a `shadow` prop). A constant function `(slot) => <div class="<constant>">`.
- The round-4 Qπ aside ("the lift was correct for CartoonCard — off-ladder tokens") is OVERTURNED. Half-true: cartoon IS off the opacity-monotonic glass ladder (2px border + offset-stamp shadow + hover-lift — a Memphis register). But FALSE that it owns surface tokens — `--glass-{bg,blur,border}-cartoon` are never defined anywhere in `src/`; the `var(…, --glass-bg-quiet)` fall-throughs are dead code. Cartoon's bg/blur/border ARE the `quiet` rung; its real delta is exactly 3 orthogonal decorations.
- 1 consumer at HEAD (own demo story) — fails L invariant 8, identically to ScrollPane.
- **VERDICT: DEMOTE.** Fold cartoon into Card as a new orthogonal prop `surface="glass" | "cartoon"` — NOT a `tier` rung (a `tier="cartoon"` would force/override sibling props — the same API-corruption Qξ rejected for `pane`). `surface` is orthogonal exactly as `shadow`/`grain` are. Qπ conflated "off the *ladder*" (true) with "off Card's *API*" (false — Card's API is wider than the ladder).
- `<ScrollPane>` + `<CartoonCard>` were the only two components lifted out of Card's `variant` enum at `e017d53`; both adjudicated styling-only-without-consumer; they retire together (W3 Lane H).

### Qψ — fleet cartoon-usage scan: 21 sites, Q owns all

- 29 in-scope hits across 6 consumers + glass-ui demo. COMPONENT 5 (all glass-ui demo-private), STALE-VARIANT 1, RAW-CLASS 20, TOKEN-ONLY 3.
- **1 STALE-VARIANT** — bbnf-buddy `AnimationWorkspace.vue:157` `<Card variant="cartoon">`.
- **20 RAW-CLASS** — all fourier-analysis, `class="cartoon-card"` across 10 files. The `.cartoon-card` class was deleted from glass-ui at **C.W5 `304ac78`**; fourier defines no local recipe — dead CSS, a live cosmetic regression. Another invariant-33 instance (cleanup-deletion without corpus-grep).
- 0 of the 21 sites owned by any consumer tranche — Q owns all 21.
- Migration: bbnf-buddy 1 → W4 Lane G; fourier 20 → W4 Lane F.2.

### Round-5 net delta

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-22 | `<CartoonCard>` DEMOTE — fold cartoon as Card `surface` prop; retire `cartoon-card/` jointly with `<ScrollPane>` | W3 (Lane B re-model + Lane H.2) | DEMOTE substrate |
| Q-cos-23 | fourier-analysis 20 dead `class="cartoon-card"` sites (C.W5 `304ac78` deletion) | W4 (Lane F.2) | FOLD-IN consumer |

Plus: Q-cos-10 retargeted W2→W4 Lane G (the bbnf-buddy cartoon site needs W3's `surface` prop). W2 Lane A posture fixed to dev-WARN. Q.md §4 gains a "Full consumer-migration map" — every pane/cartoon/scroll-pane site across all 7 repos placed.

### The Card API at Q close

`variant` was retired at `3a43a8f` and stays retired. The audit rounds prove the post-`3a43a8f` decomposition was *almost* right — three orthogonal axes (`tier` / `shadow` / `grain`) — but the two `variant` values that became components (`pane`→ScrollPane, `cartoon`→CartoonCard) were over-lifted. Q closes the decomposition properly: `pane` is `tier="wash" :grain="false"` (a plain config — no new API), `cartoon` is the new orthogonal `surface` prop. Final Card API: `tier` + `shadow` + `grain` + `surface`. No `variant`. No sibling components. The user's two questions ("befitting a component?") drove the substrate to its correct gestalt.
