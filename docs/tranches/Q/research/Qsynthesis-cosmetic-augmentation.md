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
