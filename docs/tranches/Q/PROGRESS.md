# Q — Progress Log

## 2026-05-18 — Tranche open

Q opens against P close `9f774b4` (v1.8.4) + the post-P shadow cohort HEAD `d244dd5` (7 untagged commits). Inherits 29 invariants from P (V 1-20; N 21-23; O 24-27; P 28-29).

Per the user open directive ("This is NOT an implementation phase. Tranche development only."), this open round delivers the planning substrate + dispatched research only. Implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P pattern.

## Headline at Q open

1. **Consumer functional regression** — value.js + keyframes.js report broken dock items / animations / dropdowns / glass-cards. The Q HEADLINE.
2. **Post-P shadow cohort** — 7 untagged commits (`9f774b4..d244dd5`); 4th K-invariant-3 recurrence; 4 of 7 touch dock/toggle/timeline (the broken surfaces).
3. **Playwright online** — the visual-runtime probe (π lane), archived 3×, is now executable. Q.Rζ runs it.

## Open structure

```
docs/tranches/Q/
├── Q.md                          # plan + thesis + invariants — AUTHORED AFTER SYNTHESIS
├── findings.md                   # verbatim directive + inheritance ledger ✓
├── PROGRESS.md                   # this file ✓
├── dispatch/AGENT.md             # extends P template ✓
├── coordination/CONSTELLATION.md # Q-open multi-peer manifest ✓
├── research/                     # 6 round-1 audit deliverables — POPULATED AT ROUND-1 RETURN
│   ├── Qalpha-consumer-breakage-forensics.md
│   ├── Qbeta-core-feature-cohesion.md
│   ├── Qgamma-style-consistency-cascade.md
│   ├── Qdelta-legacy-workaround-sweep.md
│   ├── Qepsilon-recap-chronic-retrospective.md
│   └── Qzeta-visual-runtime-probe.md
├── audit/                        # round-2 consumer audit deliverables — POPULATED AT ROUND-2
└── waves/                        # AUTHORED AFTER SYNTHESIS
```

## Round-1 backend audit dispatch (2026-05-18)

6 read-only agents parallel:

1. **Qα — Consumer-breakage forensics (HEADLINE)** — reproduce + attribute the dock/animation/dropdown/glass-card breakage at value.js + keyframes.js.
2. **Qβ — Core-feature co-location + cohesion** — dock / glass-card / dropdown / animation feature families.
3. **Qγ — Style consistency + cascade** — the 15-file styles/ cascade + tokens + glass ladder.
4. **Qδ — Legacy + workaround sweep** — post-P substrate sweep + P-residual verification.
5. **Qε — Recap + chronic-defer + post-P retrospective (HEADLINE)** — full prompt recap K → Q + the 7-commit retrospective scope.
6. **Qζ — Visual-runtime probe (Playwright; BINDING)** — live browser probe of the broken surfaces.

## 2026-05-18 — Round-1 returned (6/6)

| Lane | Verdict | Headline |
|---|---|---|
| Qα consumer-breakage forensics | REAL-but-CONSUMER-SIDE | Breakage reproduced; NOT a glass-ui regression. value.js: (1) vite config demo-build clobbers its own library `dist/`; (2) 11 `<Card variant="pane">` SFCs use a prop glass-ui's Card never had → silent-swallow → hard black shadow. Dropdown/dock symptoms are layout cascades. glass-ui post-P cohort CLEAN |
| Qβ core-feature cohesion | 4 fractures (all pre-P) | dock `data-density` split-brain (dock.css + utilities.css); `cards.css` near-empty while `.glass-cartoon` lives in glass.css; dropdown lone scoped-style exception; token-home drift. Post-P cohort landed cohesively. Animation/timeline = EXEMPLARY model |
| Qγ style consistency + cascade | SOUND cascade; token defects | 16-sheet cascade principled; glass ladder intact; scoped-vs-global holds. Post-P metric-stack commits introduced an 8-token private SFC dialect (never in tokens.css). CSS budget 92.8% raw / 93.6% gzip — needs rebaseline |
| Qδ legacy + workaround sweep | MINOR; 0 genuine-legacy | Headline: the P.W5 `@mkbabb/value.js` devDep is workaround-debt (phantom dependency); P FINAL mis-declared it ADDRESSED. `beec35e` patched a fix into 2 parallel dock rule-sets (un-consolidated duplication, Q6 violation) |
| Qε recap + chronic + retrospective | recap CLEAN | All K→P prompts ADDRESSED. Post-P cohort = 7 commits / 3 sub-waves; retrospective folder recommended `docs/tranches/AB+2/`. 4th K-invariant-3 recurrence AFTER invariant 29 codified — codification necessary-but-not-sufficient. Chronic-defer: 2 of 9 P-archived items RE-OPEN (PD-3 + π) |
| Qζ visual-runtime probe (Playwright) | RAN — first live probe K→Q | B-1 (P0): value.js cannot boot — vite 500s on glass-ui animation composables because value.js hard-aliases `@mkbabb/keyframes.js` → keyframes.js's DELETED `dist/`. glass-ui demo CLEAN (dock/cards/dropdowns/timeline all render, zero console errors). π lane recommended RETIRE archived → binding canonical lane |

### Synthesised root-cause model

The consumer breakage is **NOT a glass-ui substrate regression**. It is a **cross-repo dev-resolution contract desync**: the AD.W4 `development`-conditional-exports flip changed the dev-time module-resolution model, but consumer Vite configs (hard `dist/` aliases) + build configs (demo build clobbering library `dist/`) were never re-swept. Compounded by value.js's stale `<Card variant="pane">` API usage. The post-P shadow cohort is CLEAN (and is a separate K-invariant-3 process concern).

## Round-2 consumer audit dispatch (2026-05-18)

2 agents (round-1 already exhausted value.js + keyframes.js):
- **Q11** — consumer resolver-config sweep across the 4 un-audited consumers (fourier-analysis / bbnf-buddy / words/frontend / speedtest) for the same latent desync.
- **Q12** — cross-repo dev-resolution contract architecture deep-dive (the gestalt remediation design).

## 2026-05-18 — Round-2 returned (2/2) + synthesis

| Lane | Verdict | Headline |
|---|---|---|
| Q11 consumer resolver sweep | FLEET-WIDE BREAKAGE | All 4 swept consumers (fourier-analysis / bbnf-buddy / words/frontend / speedtest) CURRENTLY broken on `npm run build` + typecheck — identical `Failed to resolve "@mkbabb/keyframes.js"`. Single root cause: keyframes.js `package.json` `exports` points at `dist/` files AD.W4 deleted. The fix belongs in keyframes.js, not each consumer. bbnf-buddy ALSO carries 6 `<Card variant="pane">` sites |
| Q12 dev-resolution architecture | ONE defect, not four | The 4 round-1 band-aid-candidates are one architectural defect — the AD.W4 `development` conditional-exports model applied publisher-side, never resolver-side. Gestalt remediation = 7 one-line fossil-deletions across 3 repos + a precept edict + `proof-resolution-contract.mjs` gate. The phantom devDep RETIRES |

### Synthesis — Q.md + 6 wave specs (W0-W5) authored

| Q wave | Headline | Tag |
|---|---|---|
| W0 HEADLINE | Post-P retrospective (`docs/tranches/AB+2/`) + dev-resolution contract + `proof-resolution-contract.mjs` gate + precept edict | v1.8.5 |
| W1 HEADLINE | Fleet-wide consumer un-break — keyframes.js `exports` keystone + value.js alias/clobber + glass-ui phantom-devDep retiral + 5-consumer resolver sweep | v1.8.6 |
| W2 | Card cohesion — glass-ui `Card` props fail-explicit (invariant 31) + value.js 11-site + bbnf-buddy 6-site `variant="pane"` migration | v1.8.7 |
| W3 | Core-feature cohesion transpositions (Qβ 4 fractures + `beec35e` dock-duplication) | v1.9.0 minor |
| W4 | Style + token co-location (Qγ 6) + CSS budget rebaseline + legacy cosmetic sweep | v1.9.1 |
| W5 close | 13-lane audit + visual-runtime re-probe (π BINDING) + invariants 30-31 + FINAL.md | aggregate |

2 NEW invariants at Q: 30 (cross-repo dev-resolution contract) + 31 (component props fail-explicit). π visual-runtime lane RE-ACTIVATES from archived → binding canonical (Playwright confirmed online).

## 2026-05-18 — Audit-augmentation round-2 (cosmetic-regression cohort)

User opens round-2: keyframes.js demo broken (timeline, play button non-rainbow, hero bold); audit all consumers with 6 parallel agents; fold-in vs revert per finding; augment wave set. Strict planning-only.

6 read-only agents dispatched in parallel:

| Agent | Charter | Verdict |
|---|---|---|
| Qη | keyframes.js cosmetic forensics (HEADLINE) | 9 regressions; 2 substrate REVERT (rainbow utilities + typography `:root` literal) + 4 consumer FOLD-IN |
| Qθ | value.js cosmetic sweep | 0 P0/P1 cosmetic; post-P shadow cohort touches ZERO value.js surface; 2 cohort commits net-positive |
| Qι | bbnf-buddy cosmetic sweep | 17 findings; F-1 HEADLINE 12-token `preset.css` retired-override + F-3 7th stale Card site (fleet 18) |
| Qκ | fourier + words/frontend cosmetic | 14 findings; cluster phantom `.glass-{subtle,medium}` 13 sites across 2 consumers |
| Qλ | speedtest + 43×6 cross-tranche matrix | 0 P0/P1 speedtest; 3 clusters cross 3-consumer threshold; cluster C2 = canonical N-class blind-spot |
| Qμ | Playwright re-probe (binding) | 37 screenshots; 6 NEW findings; **Mμ-5 reframes value.js BLOCKER (picker 0×0, NOT Card-shadow)**; Mμ-4 confirms rainbow missing |

### Round synthesis

`research/Qsynthesis-cosmetic-augmentation.md` authored. 12 new IDs at `Q-cos-*` + 1 new invariant 32 (phantom-class corpus-grep gate) + 1 new chronic-defer item Q-chron-3 (5th-instance "codification without gate" recurrence pattern).

### Wave augmentation

Surgical edits to existing wave specs (no new wave inserted — keeps tag cadence intact):

| Wave | Pre-aug lanes | Post-aug lanes |
|---|---|---|
| W0 | 3 | 3 (no change) |
| W1 | 7 (A-G) | 10 (A-J — added Lane H keyframes cosmetic fold-ins, Lane I value.js picker fix, Lane J fourier export fix) |
| W2 | 3 (A-C) | 3 (broadened grep) **— PENDING-REVISION per user audit-aug round-2 pivot: pane variant should be folded back as substrate, not migrated away from** |
| W3 | 4 (A-D) | 6 (A-F — added Lane E rainbow re-promote, Lane F typography `:root` literal retire) |
| W4 | 5 (A-E) | 9 (A-I — added Lane F cluster-C2 sweep, Lanes G/H/I bbnf-buddy preset.css + `:deep` retreat + cartoon-shadow lift) |
| W5 | 7 audit + 6 re-audit | augmented re-probe checklist + invariant 32 codification + Q-chron-3 LL entry |

### User pivot round-3 (2026-05-18) — pane fold-back + no-defer + timeline re-audit

User correction received mid-augmentation: "value.js's card pane variants are critical, and should see usage in speedtest, no? Ensure. The pane variant should properly be folded back in, or an idiomatic solution derived. Look to our past commits for that item — this has existed before." Plus: "No deferrals of auditing."

3 read-only audit agents dispatched in parallel:

| Agent | Charter | Verdict |
|---|---|---|
| Qν | speedtest Card-variant + pane-equivalent scan | **WEAK-REJECT direct pivot** — 0 `<Card variant>` sites; speedtest got the `5d914df9` S.W4 sweep value.js+bbnf-buddy missed; chart-heavy not editor-chrome-heavy |
| Qξ | Card pane-variant git history forensics | **PATH D — pane was lifted, not deleted**. `e8380d7` introduced; `3a43a8f` retired the enum BUT **same-day companion commit `e017d53` shipped `<ScrollPane>` (for `pane`) + `<CartoonCard>` (for `cartoon`) as sibling primitives**. `CHANGELOG.md` v0.8.0 documents canonical migration. `tier="wash"` is partial-faithful; `<ScrollPane>` is faithful |
| Qο | keyframes timeline re-audit (no defer) | **REVERT substrate (HIGH confidence)** — root cause is NEW Q-cos-13 IconTooltip wrap-span (`25e1b5a` O.W6 Lane D `inline-flex; min-width: 44px`) breaking `w-full` descendants in grid cells. PlaybackRibbon Slider collapses to 16px nub. NOT timeline tokens / NOT play-button — Qη + Qμ both searched wrong substrate |

### Round-3 wave delta

1 new Q ID (Q-cos-13 = IconTooltip width-stretch substrate revert; W3 Lane G NEW). W2 migration target REDIRECTED (no ID change; same 18-site fleet, target = `<ScrollPane>` / `<CartoonCard>` not `tier="wash"`). Q-cos-4 keyframes timeline RESOLVED as a manifestation of Q-cos-13 (no longer defer to W5).

| Wave | Round-2 lanes | Round-3 lanes | Net delta |
|---|---|---|---|
| W2 | 3 (target was `tier="wash"`) | 3 (target REDIRECTED to `<ScrollPane>` / `<CartoonCard>`) | 0 lane count; target revised |
| W3 | 6 (A-F) | 7 (A-G) | +1 lane (Lane G IconTooltip revert) |

### Cumulative wave delta vs round-1 Q open

| Wave | Round-1 lanes | Final post-round-3 lanes |
|---|---|---|
| W0 | 3 | 3 |
| W1 | 7 | 10 |
| W2 | 3 | 3 (target redirected) |
| W3 | 4 | 7 |
| W4 | 5 | 9 |
| W5 | 7 audit + 6 re-audit | 7 audit + 6 re-audit + invariant 32 + LL entry + augmented checklist |

Plus 2 new invariants (30 + 31 from round-1; 32 from round-2). 13 Q-cos-* IDs total (Q-cos-1 through Q-cos-13). 1 chronic-defer item Q-chron-3.

## 2026-05-18 — Audit-augmentation round-4 (ScrollPane adjudication + keyframes deep audit + consumer-tranche reconciliation)

User directives: (1) is `<ScrollPane>` "truly befitting" as a component vs a Card variant; (2) ensure speedtest + value.js migrated, accounting for their own latest tranches to avoid duplicate work; (3) the keyframes.js demo is broken well beyond the timeline — bezier selector clipped, t-value scrubber non-functional, rotations dropdown missing progress circles, "many other style losses" — a PROPER and IDIOMATIC glass-ui upgrade with no loss of feature/functionality.

6 read-only agents dispatched in parallel:

| Agent | Charter | Verdict |
|---|---|---|
| Qπ | `<ScrollPane>` architecture adjudication | **DEMOTE-TO-VARIANT** — 43 lines, 100% styling-only, 1 consumer; fails L invariant 8; expressible as `<Card tier="wash" :grain="false">`. The W2 target re-pivots a THIRD time (final); `<ScrollPane>` retires |
| Qρ | keyframes easing scene + playground | t-value scrubber sound but never mounts — `App.vue:106` `<Transition>`+`<KeepAlive>`+async crashes the renderer. **Zero substrate fixes**; playground is a non-functional shell |
| Qσ | keyframes animation scenes | engine + 4 scenes functionally sound; same `<Transition>`+async crash on cold deep-link; dead-code layer. **Zero substrate fixes** |
| Qτ | keyframes shared chrome | rotations dropdown dots transparent — consumer `17adae2` cleanup commit deleted demo-local `.status-dot--*` classes; same anti-pattern as substrate `b0debec`. `ProgressRing` substrate-gap candidate (provisional) |
| Qυ | speedtest tranche reconciliation | 0 pane sites; 0 AF/AG collisions — speedtest needs no migration; got the `5d914df9` S.W4 tier-API sweep |
| Qφ | value.js tranche/WIP reconciliation | value.js Tranche A.W0+A.W1 already shipped Q's W1 Lane C + W2 Lane B + W4-C2; WIP is a master ancestor (Q-chron-1 CLOSED). Only the picker 0×0 is un-owned |

### Round-4 wave delta

- **W2 target FINAL** — `<Card variant="pane">` → `<Card tier="wash" :grain="false">` (NOT `<ScrollPane>`; Qπ DEMOTE). value.js Lane B RETIRES (A.W1 already did it, to the canonical recipe). bbnf-buddy Lane C stands (7 sites).
- **W1 Lane C RETIRES** — value.js A.W0 shipped the un-break. Lane I (picker 0×0) survives as the one value.js write. W1: 10→9 lanes (8 proof docs).
- **W3 +Lane H** — `<ScrollPane>` package retirement (component → Card recipe). W3: 7→8 lanes.
- **W4 Lane F** — value.js phantom-class portion retires (A.W1 Lane B did it).
- **NEW W5 — keyframes.js demo restoration** (6 lanes: scene-transition crash fix, cleanup-commit CSS restoration, hero cosmetic, idiomatic glass-ui adoption, layout fixes, dead-code purge + playground). Close wave renumbered W5→**W6**.
- **NEW invariant 33** — dead-code-removal corpus-grep gate (generalises 32 to all "cleanup" commits, substrate + consumer). **NEW Q-chron-4** — "cleanup commit deletes load-bearing artefact" pattern.

### Cumulative wave structure — post-round-4 (7 waves)

| Wave | Round-1 | Final |
|---|---|---|
| W0 | 3 | 3 |
| W1 | 7 | 9 (Lane C retired) |
| W2 | 3 | 2 (Lane B retired; target final) |
| W3 | 4 | 8 |
| W4 | 5 | 9 (value.js portion of Lane F retired) |
| W5 | (was close) | **NEW — keyframes.js demo restoration, 6 lanes** |
| W6 | — | close (was W5; renumbered) |

21 Q-cos-* IDs (Q-cos-1 … Q-cos-21). 4 new invariants (30-33). 4 chronic-defer items (Q-chron 1-4; Q-chron-1 CLOSED). 15 audit deliverables across rounds 2-4 (Qη … Qφ). value.js Q-writing lanes mostly retired as already-done-by-Tranche-A — plan hygiene, not lost work.

## 2026-05-18 — Audit-augmentation round-5 (CartoonCard adjudication + full fleet cartoon-migration map)

User directives: (1) "CartoonCard should likely just be a variant, too, no?"; (2) ensure all consumers properly migrated, folded into the tranche; (3) FULL wave spec, no implementation.

2 read-only agents dispatched in parallel:

| Agent | Charter | Verdict |
|---|---|---|
| Qχ | `<CartoonCard>` architecture adjudication | **DEMOTE-TO-VARIANT** — 36 lines, 0 own props, 1 consumer; thinner than ScrollPane. The `--glass-*-cartoon` tokens its doc-comment claims are never defined in `src/` — cartoon's surface IS `quiet` + 3 decorations. Fold in as a new orthogonal `Card surface` prop. Qπ's round-4 "lift was correct for CartoonCard" aside OVERTURNED |
| Qψ | CartoonCard fleet-wide usage scan | 21 migration sites: 1 bbnf-buddy `<Card variant="cartoon">` + 20 fourier `class="cartoon-card"` (dead — `.cartoon-card` deleted at C.W5 `304ac78`). 0 owned by any consumer tranche; Q owns all 21 |

### Round-5 wave delta

- **W2** — Lane C scoped to bbnf-buddy's 6 `pane` sites only; the 1 `cartoon` site sequenced to W4 Lane G (needs W3's `surface` prop). Lane A posture fixed to dev-WARN (avoids a W2→W4 typecheck-red window). W2: 2 lanes.
- **W3** — Lane B re-scoped: `.glass-cartoon` → `@utility cartoon-surface` + drop the dead `--glass-*-cartoon` fall-through tokens. Lane H expanded: retires `<ScrollPane>` AND `<CartoonCard>` jointly (lifted together at `e017d53`), adds Card's orthogonal `surface` prop. Intra-wave ordering: Lane B before Lane H.
- **W4** — Lane F.2 absorbs fourier's 20 dead `.cartoon-card` sites (a second phantom-class family). Lane G absorbs bbnf-buddy's 1 cartoon site migration. The fleet `<Card variant=>`-zero + `.cartoon-card`-zero asserts become W4 gates.
- **NEW Q-cos-22** (CartoonCard DEMOTE) + **Q-cos-23** (fourier 20 dead cartoon-card). Q-cos-10 retargeted to W4 Lane G.
- **Q.md §4** — NEW "Full consumer-migration map" table: every pane/cartoon/scroll-pane site across all 7 repos placed in a wave + lane + target.

### Cumulative wave structure — post-round-5 (7 waves; FULL spec)

23 Q-cos-* IDs (Q-cos-1 … Q-cos-23). 4 invariants (30-33). 4 chronic-defer (Q-chron 1-4; Q-chron-1 CLOSED). 17 audit deliverables across rounds 2-5 (Qη … Qψ).

Both component lifts from `e017d53` (`<ScrollPane>` + `<CartoonCard>`) DEMOTE — the only two components glass-ui lifted out of Card's `variant` enum, both adjudicated styling-only-without-consumer. The Card API converges to three orthogonal axes (`tier` / `shadow` / `grain`) plus the new `surface` axis; `variant` stays retired.

## Awaiting dispatch authorization

Per the Q-open user directive + the audit-aug round-2/3/4 directives ("NO implementation, this is tranche development"), the augmented planning substrate landed atop the Q-open commit. Implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P precedent.

When dispatch authorized: W0 HEADLINE opens — 3 lanes (post-P retrospective `docs/tranches/AB+2/` + dev-resolution contract + proof-gate script).

## 2026-05-18 — W0 HEADLINE close (v1.8.5)

Implementation dispatch authorized. W0 opened — 3 lanes, agent-dispatched parallel (shared tree, bounds-disjoint).

| Lane | Artefact | Verdict |
|---|---|---|
| A | `docs/tranches/AB+2/` retrospective (AB+2.md + 3 sub-wave specs + FINAL.md + PROGRESS.md + CONSTELLATION.md) | 7/7 post-P commits accounted; 3-sub-wave reconstruction T1/T2/T3; cohort accrued NO tag |
| B | `docs/precepts/cross-repo-dev-resolution.md` precept edict + invariant-29 recurrence diagnosis | 4-key publisher shape (`development`/`types`/`import`/`default`); `default` keystone was universally absent; codification necessary-but-not-sufficient |
| C | `scripts/proof-resolution-contract.mjs` fail-closed gate + `proof:resolution` script + ci.yml wiring | W0 baseline: FAIL (exit 1) — 3 publisher violations (glass-ui/keyframes.js/value.js all missing `default`), 0 consumer violations |

Gate matrix: typecheck + build + vitest (372/372) + audit:stash GREEN. `proof:resolution` expected-FAIL at W0 (fleet mid-desync; W1 makes it pass). Precept submodule file authored, held uncommitted until W6 codification.

Tag: v1.8.5.

## 2026-05-18 — W1 HEADLINE close (v1.8.6)

Fleet-wide consumer un-break. keyframes.js keystone landed FIRST + verified, then 6 parallel lanes (disjoint repos).

| Lane | Repo | Outcome |
|---|---|---|
| A+H | keyframes.js | `exports["."]` 4-key shape (`default` key added); self-alias dropped; `resolve.conditions` + `fs.allow`. Build + typecheck GREEN. Committed `6af80ad` |
| B | glass-ui | `@mkbabb/value.js` phantom devDep retired (grep-proven zero imports); `default` exports key; `resolve.conditions` in vite + vitest config. typecheck + vitest 372/372 GREEN |
| D | fourier-analysis | resolver sweep; Lane J premise STALE — fourier has zero `extractAnimationOptions` / `@mkbabb/value.js` usage; real dep was keyframes.js (fixed by keystone). Build GREEN, dev-server renders. Committed `926ca6a` |
| E | bbnf-buddy | resolver sweep. Build + typecheck GREEN (3 keyframes TS2307 → 0). Committed `a0db827` |
| F | words/frontend | mode-aware resolver sweep. Build + typecheck GREEN. Committed `e05e5bf` |
| G | speedtest | resolver sweep + dead manualChunks `@mkbabb/*` branch removal. Build + typecheck GREEN. Committed `b33f58b0` |
| I | value.js | picker 0×0 root-caused (a11y `<main>` landmark broke the percentage-height chain) + fixed via `.pane-main` flex-stretch idiom; `default` exports key. Build GREEN. Lane J: `extractAnimationOptions` confirmed already exported (value.js Tranche A) |

**value.js commit deferred-to-coordination**: value.js master carries 58 files of the value.js team's uncommitted in-flight tranche work (`App.vue` a11y pass entangled with the picker fix). Per risk-7 (value.js team requested Q not write value.js), the W1 picker + `default`-key fix is APPLIED + VERIFIED but handed over as a patch (`docs/tranches/Q/audit/W1-Lane-I-valuejs.patch`) rather than committed — committing would entangle the team's work. The WIP branch `w.w2.1-value-js-prebuild` is left in place (deleting another team's branch is out of Q's cross-repo scope; Q-chron-1's *finding* — WIP is a master-ancestor — stands).

Gate: `proof:resolution` PASS (was expected-FAIL at W0); typecheck + build + vitest 372/372 + audit:stash GREEN. Consumer repos committed locally; not pushed (cross-repo push held).

Tag: v1.8.6.

## 2026-05-18 — W2 close (v1.8.7)

Card cohesion. 2 lanes, parallel (glass-ui + bbnf-buddy).

| Lane | Outcome |
|---|---|
| A | `Card` props fail-explicit (invariant 31, dev-WARN posture). Shared `_shared/useStalePropWarning.ts` composable — `STALE_PROP_RECIPES` extensible const + `import.meta.env.DEV`-gated `console.warn` naming prop/component/canonical-recipe. Sibling audit: Class A (swallowed prop NAME) = Card + ScrollPane + CartoonCard, all 3 fixed; Class B (bad value to declared `variant`) = 11 primitives, already TS-guarded, out of scope. +5 tests. typecheck + vitest 377/377 GREEN |
| C | bbnf-buddy 6 `<Card variant="pane" flush>` sites → `<Card tier="wash" :shadow="false" :grain="false">` (+ `class="p-0"` on the 3 CardContent-bearing sites). No `overflow-auto`/`tabindex` needed — no Card root is itself a scroll region. 7th cartoon site untouched (W4 Lane G). Build + typecheck GREEN; `variant="pane"` grep ZERO |

Note: W2 Lane A's dev-WARN was added to ScrollPane + CartoonCard too — both are retired at W3 Lane H; the shared composable persists. bbnf-buddy committed `<lane-C>` (local).

Gate: typecheck + build + vitest 377 + audit:stash + proof:resolution GREEN. Tag: v1.8.7.

## 2026-05-18 — W3 close (v1.9.0 minor)

Core-feature cohesion + substrate REVERTs + component DEMOTE. 8 lanes, 2 batches (batch-1 A/B/D/F/G parallel, batch-2 C/E/H parallel — Lane B before Lane H per the cartoon-surface ordering).

| Lane | Outcome |
|---|---|
| A | dock `data-density` block migrated utilities.css → dock.css; cascade-order dependency removed |
| B | `.glass-cartoon` → decoration-only `@utility cartoon-surface` in cards.css; dead `--glass-*-cartoon` phantom tokens dropped; glass.css holds only the 5-rung ladder |
| C | dropdown scoped-style → `floating-panel.css` (menu family uniformly global-CSS; `var(--dropdown-menu-font, inherit)` preserved); `beec35e` dock hit-test duplication consolidated (both `.dock-layer` + `.dock-layer-item-host` are LIVE — the commit's "legacy" label was wrong; shared contract de-duplicated, neither deleted) |
| D | token-home rule authored in DESIGN.md (`§<feature>` block in tokens.css; recipes consume from the feature stylesheet) |
| E | `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` re-promoted as `@utility` recipes; D.W2.D `b0debec` audit-gap diagnosed (corpus omitted keyframes.js) |
| F | redundant `typography.css` `:root` font-stack literals retired (`6ce14e5`); consumer `@theme` overrides flow through unshadowed |
| G | IconTooltip `inline-flex` wrap-span retired (Path C — gestalt); WCAG 44×44 routed through each callsite's own contract; orphan `--icon-tooltip-hit-area` token retired |
| H | `<ScrollPane>` + `<CartoonCard>` retired (clean break); Card gains orthogonal `surface` prop; barrels/CLAUDE.md/`api` updated (`ui/` 44→42 dirs); both demo stories folded into the Card story (+ the ScrollPane `tabindex="0"` a11y fix) |

Gate: typecheck + build + vitest 379/379 + audit:stash + proof:resolution + proof:theme GREEN. Playwright visual probe consolidated into the W6 binding π re-probe.

Tag: v1.9.0.

## 2026-05-18 — W4 close (v1.9.1)

Style/token co-location + consumer cosmetic sweep. 3 agents (glass-ui A-E, bbnf-buddy G/H/I, consumer phantom-sweep F).

| Lane(s) | Outcome |
|---|---|
| A/B | metric-stack 8-token dialect → `tokens.css §metric`; timeline 6 `--timeline-dot-*` knobs → `§timeline` |
| C | manual `-webkit-backdrop-filter` retired across 4 SFCs (single-source via glass.css); `transitions.css` wrapped in `@layer components` |
| D | `--scale-press-{xs,md,lg}` RETIRED (zero fleet consumers — words/frontend P.W4-D landing never happened); CSS budget rebaselined (CSS 43340 raw / 7780 gzip; budget → 48000/8650, ≈10% headroom) |
| E | cosmetic comment sweep (test-file wording, dock.css archaeology) |
| F | words/frontend 4 `.glass-medium` → `.glass-quiet` (committed `0cd458f`); fourier 29-site phantom+cartoon migration authored as `W4-Lane-F-fourier.patch` (fourier's ~100-file in-flight tree — patch handed over, not committed into the dirty tree) |
| G/H/I | bbnf-buddy `eb842af` — preset.css canonical-ladder rewrite + 12 retired-token overrides fixed; last fleet `<Card variant=>` site → `<Card :surface=>`; `:deep()` retreat (EditorPanel ScrollPane→div repairs a broken import; ToolsLayer `--dock-control-*`); `--shadow-cartoon-{md,lg}` lift rungs restored. Substrate referral **Q.Rh-1** filed (ToggleChip active-state token cohort); Q.Rh-2 dissolved on inspection |

Gate: typecheck + build + vitest 379/379 + profile:budget (CSS 90.3%/89.9%) + audit:stash + proof:resolution + proof:theme GREEN. Fleet `<Card variant=>` corpus ZERO. fourier phantom-sweep grep-zero pends the patch application (W6 re-audit).

Tag: v1.9.1.

## 2026-05-18 — W5 close (keyframes.js demo restoration; consumer-side, no glass-ui ship)

6 lanes, 3 sequential agent-groups (W5's lanes are dependency-chained — Lane A unblocks all).

| Lane | keyframes.js commit | Outcome |
|---|---|---|
| A | `84f1659` | scene-transition renderer crash eliminated — `<Suspense>` inserted as the async boundary (Transition > KeepAlive > Suspense > async); every scene mounts on cold deep-link; route drift resolved |
| B/C/E | `5861d18` | rotations dropdown + TopDock selects → glass-ui `<StatusDot>`; play button → `.rainbow-pastel` `@utility`; `glass-subtle`→`glass-wash`; root `bg-background`; hero `font-bold` dropped + `text-2xs`→`text-admin-label`; square-scene controls-layout grid gains a stage track at 390/820px |
| D/F | `e073dac` | t-value scrubber → `<Slider variant="glass-scrubber">`; bezier canvas → `<GlassPanel variant="wash">`; duration slider → `<Slider size="sm">` (all feature-parity verified, zero loss); dead-code purge (demo/{boxes,balls,simple,bench}, standalone cube/amiga/square App.vue dupes, SceneNav, SimpleScene, 24 orphaned ui/ dirs); playground completed in-wave |
| close | `b721a0c` | keyframes.js → 2.1.1; `dist/` untracked (gitignored pre-ignore fossil — contract hygiene) |

Substrate-gap referral **Q.Rh-3** filed (ProgressRing/CircularProgress, provisional — W6 evaluates against the ≥2-consumer test). keyframes.js build + typecheck + gh-pages GREEN.

## 2026-05-18 — W6 close (v1.9.2) — Q CLOSED

13-lane strengthened audit + 6 consumer re-audits + π re-probe + precept advance + FINAL.md. 9 agents.

| Lane group | Verdict |
|---|---|
| α plan-vs-actual / β substrate-without-consumer | MINOR — all 49 Q IDs ADDRESSED/RETIRED; 3 MINOR bookkeeping items |
| γ doc-drift / δ idiomatic-gestalt | MINOR — 2 CLAUDE.md numerals fixed inline (42-entry matrix, 37 ui/ barrels); δ CLEAN |
| ε performance / ι integrity-sweep | CLEAN — bundle within budget; zero agent-attributed mutating git across 7 repos |
| π visual-runtime | BUILD-VERIFICATION FLOOR — Chrome extension disconnected this session; no pixel confirmation; every fix confirmed present in source + all apps build/boot |
| 6 consumer re-audits | 5 PASS + 1 FAIL→FIXED — speedtest `<ScrollPane>` BLOCKER caught + fixed in-wave |
| phantom-class gate | glass-ui + 5 consumers CLEAN; fourier 31 sites pending the handoff patch |

**W6 in-wave remediation** (strengthened audit caught real gaps): speedtest 6-SFC `<ScrollPane>`→`<Card tier="wash">` migration (`d8a004dc`); words/frontend 11-site `glass-default`/`glass-elevated` phantom sweep (`8c82f2b`); keyframes.js gh-pages `outDir` split (`19d1a1b`); the fourier handoff patch corrected to 31 sites.

Precept submodule advanced `3c32fae` (invariants 30-33 + π re-activation + 5 LL entries), pushed; glass-ui pointer bumped. `docs/tranches/Q/FINAL.md` authored — honest residuals declared (fourier + value.js handoff patches; π build-floor; local consumer commits; Q.Rh-1/Q.Rh-3 forward referrals).

Gate: typecheck + build + vitest 379/379 + audit:stash + proof:resolution + proof:theme + profile:budget GREEN.

Tag: v1.9.2. **Q CLOSED.**
