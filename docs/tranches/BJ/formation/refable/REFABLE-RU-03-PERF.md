# REFABLE RU-03-PERF — BAND-PERF band-redo verdict sidecar

**Unit:** RU-03 band redo, BAND-PERF (family E — eager-boot diet, rAF budgets, per-frame read
hygiene, chunk composition).
**Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
claude-fable-5"). **Date:** 2026-07-18. **HEAD at verification:** 485891a2.
**Target artifact:** `docs/tranches/BJ/waves/BAND-PERF.md` — REWRITTEN IN PLACE as the union
(620 lines); ANEW record fixed at scratchpad `ru03-perf-anew.md` before the draft was opened.
**Protocol:** THRICE — (1) ANEW from PLAN §1/§2-E/§3/§4 + REGISTRY family E + R3A/R3B digests +
FEEDBACK-LEDGER + DOSSIER-F01-F10/F41-F50/A01-A17 + JUDGE J1 + the binding sidecar routings
(RF-5, RU-16 R6, RU-17b routing 6, RU-21 N8/routing 7, RU-03-FEEDBACK-MOTION R6, RU-07 RT6,
RU-08 R7) + the repo, every pin re-proven live; (2) the opus draft read assume-wrong, every
claim re-verified at HEAD; (3) union + this sidecar. ADJUDICATION-1 read only at step 3.

## Boundary moment (end of step 1, verbatim belief)

I believed BAND-PERF is exactly the four PLAN §2 waves — BOOT-DIET, SHELL-FIELD-GOVERN,
DEFERRED-PAINT, ROUTE-PENDING — with these facts freshly proven at HEAD: the eager boot graph is
74 files / 789,398 B with the 284,409 B aurora-hero chunk at 36.03%, dragged by aurora-hero.ts:15's
value import through the aurora barrel; the shell field's suspend machinery is plumbed but
structurally unreachable for a fixed inset-0 node, so effective governance is tab-hidden only; the
blob ForcedReflow fix and the RU-21 N8 pager-worm per-frame getComputedStyle clause belong inside
W2's rAF-budget scope; W3's turbulence work cannot be a naive shared filter def because
per-instance seeds are a designed property, so the deliverable is a measured paint-cost decision
with mechanism open; W4 owns F07 choreography under the law-6 fence with R3b seeds 119ms /
CLS 0.04 / 186ms. I expected the draft to be right on wave names (PLAN canon) but stale or wrong
in pins, and to miss the seed-impossibility and the unreachable-governance sharpening.

## The verdict table

Scoring note: the draft verified far better than the REFABLE base rate — every build-graph number
re-measured EXACT (74 files / 789,398 B / 285 chunks / 3.3M / every named chunk size), and its W2
pause-unreachable analysis independently matched my ANEW derivation. One substantive refutation
(W3-C), five pin-grain errors, one half-false OPEN premise.

### RATIFIED (15 — re-proven at HEAD, not presumed)

| # | Claim | Re-proof |
|---|-------|----------|
| R1 | Four-wave structure W1-W4, names + scopes | PLAN.md:170-182 §FAMILY E; every wave body matches |
| R2 | W1 RED baseline: 73 modulepreloads + 1 entry = 74 eager JS files = 789,398 B ≈ 770KB | re-measured this session from dist-demo/index.html (python sum) — EXACT |
| R3 | Eager CSS 317KB (index-C8_UmRWR.css) + 285 JS chunks / 3.3M | ls: 325,528 B; `ls assets/*.js \| wc -l` = 285; du 3.3M |
| R4 | Top-chunk table: aurora-hero 277KB / index 103 / class-names 86 / DropdownMenuTrigger 40 / SelectItem 30 / floating 25 / routeTransition 25 / value 24 | 284,409 / 105,687 / 88,077 / 41,265 / 30,748 / 26,493 / 25,922 / 25,261 B — all match |
| R5 | The four eager imports | AppShell.vue:11,26,27,28 verified; :125-128 `,` shortcut; :222 `<PresetEditor />`; `grep -c defineAsyncComponent` = 0 |
| R6 | The through-the-barrel drag | aurora-hero.ts:15-16; src/components/aurora/index.ts:1 re-exports Aurora.vue; shellAuroraConfig :274 (dark :318); DEFAULT_AURORA_CONFIG constants/presets.ts:391 |
| R7 | W2 pause-guard-unreachable analysis | useAurora.ts:270-277 (`pauseWhenHidden: false`, only reason `off-screen-io`); useIntersectionPause.ts:61 `ref(true)`; router.ts:115-117; AppShell.vue:146-154 `fixed inset-0` |
| R8 | W3 cede to STORY W5 (edit + static gate; one owning wave per file) | ADJUDICATION-1 ruling 9; BAND-STORY.md:22-24,:394 (G-PRV-3); SectionPreviewCard.vue:63-65; SectionLanding.vue:35-38; IntersectionObserver in demo/ = 0 |
| R9 | W3 13 turbulence hosts + the once-and-cache nuance | colors.vue:47,:91-100; WatercolorDot.vue:157-179 filter, :17-19 once-and-cache doc |
| R10 | W4 blocking-nav facts | router.ts:122-130 beforeResolve await; AppShell.vue:59,:192 comments, :201-203 keyed swap; no Suspense/aria-busy/pending UI |
| R11 | OPEN-P0 ruling (build dist-demo in the test job) + the vitest-only substrate | ADJUDICATION-1 ruling 9; package.json:532 `"test": "vitest run"`; no scripts/gates.mjs or proof-*.mjs |
| R12 | The W2 addendum: blob forced-reflow deliverable + R3b seeds; swap-CLS single-gated at W4 | R3B-DIGEST.md (52,225 RunTasks / 3,115ms; ForcedReflow ~142ms window; CLS 0.04); the STAB2 MAJOR-3 cure text present and correct |
| R13 | The lead seam ruling: W4 OWNS F07 outright | PLAN.md:81-84; DOSSIER-F01-F10.md:292-296 |
| R14 | Route chunks correctly lazy (Blob 94KB / StoryHero 63KB / aurora 59KB) | 94,112 / 62,813 / 59,151 B on disk; router.ts `component: () => import()` |
| R15 | Header source pins (round-2b :49-55 = 73/285/3.3M; ledger :13,14,18,58,84; REGISTRY :108-120) | all re-read at the cited lines |

### OPUS-WRONG (8 — corrected in the union)

| # | Claim | Correction |
|---|-------|------------|
| OW1 | **W3 (C): the shared feTurbulence filter def ("one hoisted `<filter>` referenced by all 13 dots") + its filter-duplication gate ("assert the page does not mount N>1 identical defs")** | REFUTED — the substantive kill. Seed distinctness is DESIGNED: WatercolorDot.vue:86 `filterSeed = hashString(props.color + props.seed) % 256`; colors.vue:98 passes distinct `seed="section-ramp-${i}"` per dot; the component doc names the property — "each dot's wet edge is uniquely displaced (no twelve-clones)" (WatercolorDot.vue:21-23). One shared def cannot carry 13 seeds; the draft's optimization would ship the exact clone regression the component was designed against, and its gate would ENFORCE it. Union: arm struck; replaced by a measurement-contingent octave/cap lever + a once-and-cache REGRESSION-FENCE (honestly labeled, not born-RED). The draft's own :22-24 citation contained the refuting sentence two lines below what it quoted |
| OW2 | W3 (A) parenthetical: STORY W5 rewrite = "masonry + live miniatures" | STALE — the live-miniature line is STRUCK (PLAN.md:164-166, per the 0-GL contract + R3b idle-rAF). Union says "masonry + the tile-ladder authorship (live-miniature STRUCK)" |
| OW3 | OPEN-P2 premise: the leaf repoint may need "a new leaf export in the aurora barrel's subpath map" | HALF-FALSE — `@glass/*` → `src/*` is a source alias (vite.config.ts:23, tsconfig.json:18); the demo build needs NO export-map change. Residue narrowed to the Family H deep-leaf-vs-named-leaf canon call |
| OW4 | W1 REGISTRY member pin `:111-112` for eager-boot-graph-bloat | actual `:110-111` (the members list shifted); union corrected |
| OW5 | OPEN-P1 pin: paletteToCssGradient comment at `aurora-hero.ts:23-25` | actual `:10` (the renderMode-auto comment); :22-25 is the RAW_BASE_HERO_PALETTES comment |
| OW6 | `useAurora.ts:288 scheduleAfterFirstPaint` | call site is `:293` (definition `:77`); union corrected |
| OW7 | `main.ts:73` isReady-then-mount | actual `:72`; union corrected |
| OW8 | W2 mount-block pin `AppShell.vue:147-156` | the `<Aurora>` element spans `:146-154` (v-if :147 and class :151 were right); union corrected |

### FABLE-NEW (7 — absent from the draft, landed in the union)

| # | Addition | Source/evidence |
|---|----------|-----------------|
| N1 | W2 deliverable (c) — per-frame read hygiene: usePagerWorm.ts:133-134 reads getComputedStyle ×2 per rAF frame (wired :167); cure = cache token reads per seat/resize; PERF owns, F-M W6 keeps a do-not-worsen fence; + the gate class "no getComputedStyle inside an onFrame path" | RU-21 N8 + routing 7 (BINDING); RU-03-FEEDBACK-MOTION R6 (BINDING); re-proven at HEAD |
| N2 | W4 law-6 fence on the goo-morph citation: within-body goo is iOS-attested; gooing independent bodies is the DECLARED divergence, taken deliberately or not at all; law-14/15 spring presets named for the transition physics | RU-16 R6 (BINDING routing to this band); IOS27-CODEX.md:19,:44 |
| N3 | W1 named first cut sharpened with the composition facts: 36.0% single-chunk share (284,409/789,398), BOTH shader sets eager, no dynamic-import seam anywhere in the chain; + the GF-AURORA W0 module-size shared referent / W4 REAUTHOR-LEAN adjacency | RU-17b:113-116 routing 6 (BINDING); RU-07 RT6 (BINDING, informational); share re-computed this session |
| N4 | W2 adjacency clause: BJ.W-IDLE-BREATH is compositor-only with a rAF-count-delta-0 gate precisely so it cannot re-inflate W2's idle budget; W2's number is the referent | PLAN.md:71-73 ordering law; JUDGE.md J1 |
| N5 | W2 born-RED premise sharpened to the full suspend-reason census: tab-hidden / off-screen / off-screen-io / manual (runtime.ts:43-52) — none but tab-hidden reachable for the fixed inset-0 node — AND reduced-motion does NOT suspend (no PRM reason; frameLoop.ts:136-147 masterTempo zeroes integration while rAF keeps ticking). "Tab-hidden only, for every user class" | re-derived at HEAD; strictly stronger than the draft's off-screen-io-only argument |
| N6 | The dist-demo staleness caveat: the committed build is 2026-07-16; five commits postdate it (58fba6e6..55f5170d, dialog/halo/token work), none touching the import graph; RED numbers re-measure on the in-job build (OPEN-P0 makes this structural) | git log --since re-check this session |
| N7 | Live-baseline truth-up: the blanket PENDING-R3 language replaced — W1/W2/W4 are R3b-SEEDED (the DEV RED numbers stand; the remaining obligation is the GREEN-side delta on a build); W3's intrinsic-size measure is OWED (R3b never captured card height). Recipe extended with the no-getContext/localhost/pipe-trap disciplines and the blob-mount ForcedReflow read | R3B-DIGEST.md capture inventory vs the draft's markers |

## Structural note

The former bottom-of-file "Lead seam ruling" + "W2 addendum" blocks (old `:505-520`) are FOLDED
into the W4 and W2 bodies (the STAB2-COMPLETENESS NOTE-2 wart — "inline bodies NOT back-edited" —
is cured by this union). A provenance note at the file foot redirects readers arriving from the
stability-pass anchors.

## ROUTING (out-of-band items; nothing here edits another band's file)

1. **Lead amendment (PLAN.md:177-179, §FAMILY E W3 line):** "…+ the shared feTurbulence filter
   def…" must re-word to the corrected arm — "the turbulence-cost ruling (per-instance seeds are
   designed — no shared def; measurement-contingent octave/cap + the once-and-cache fence)".
   PLAN is the lead's file; routed, not edited here. (Consequence of OW1.)
2. **Lead/REGISTRY truth-up (REGISTRY.md:114):** the family-E member line "13 live feTurbulence
   on /foundations/colors" overstates steady-state — the filter rasterizes once + caches
   (WatercolorDot.vue:17-19); suggest "13 per-instance feTurbulence defs (once-and-cache; mount
   cost only)". Same OW1 consequence.
3. **RU-03-STORY seat (BAND-STORY.md:33):** the W5 roster row still reads "LIVE miniatures" —
   contradicts PLAN.md:164-166 (line STRUCK). Flagged for the STORY band redo; not edited here.
4. **Anchor moves for prior sidecars:** RU-16 R6's citation "BAND-PERF.md:393" now lands at
   ~:485-491 (W4 §Design OPEN-P10, where the law-6 fence is landed); RU-13-A01-A17's
   "BAND-PERF.md:92-96" (the barrel-drag premise) now sits at ~:107-116; STAB/CROSSWALK pointers
   to `:505-520` are handled by the in-file provenance note. Informational — the citing files
   are historical records, no edits owed.
5. **ADJUDICATION-1: no ruling re-opened.** Ruling 9's two PERF items (the W3 cede to STORY W5;
   OPEN-P0 build-in-job) are RATIFIED and stand unchanged in the union. OW1 touches no
   adjudicated input — the shared-def arm was never adjudicated, only drafted.
6. **Execution note for the gate author (GATES/PERF seam):** W3's once-and-cache arm is a
   REGRESSION-FENCE (GREEN at introduction, mutation-bitten), not born-RED — it must be counted
   honestly in the born-RED roster (the PLAN §3 discipline), mirroring the COLOCATION W3
   precedent.

## Counts

- OPUS-WRONG: 8 (1 substantive refutation, 1 stale cross-band premise, 1 half-false OPEN
  premise, 5 pin-grain)
- FABLE-NEW: 7 (2 binding-routing landings N1/N2, 1 binding absorption N3, 4 derived
  sharpenings/truth-ups N4-N7)
- RATIFIED: 15 (each re-proven at HEAD this session)
