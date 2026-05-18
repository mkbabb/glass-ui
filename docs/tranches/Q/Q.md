# Q — Cross-repo dev-resolution contract + consumer un-break (zero-deferral binding)

**Tranche letter**: Q.
**Successor to**: P `9f774b4` (v1.8.4) + post-P shadow cohort HEAD `d244dd5` (7 untagged commits).
**Cohort identity**: restore the consumer fleet to buildable; codify the cross-repo dev-resolution contract that the AD.W4 conditional-exports flip left half-applied; absorb the post-P shadow cohort retrospectively; close the core-feature cohesion + style co-location fractures the audit surfaced. **ZERO DEFERRAL at Q close** (inherited P invariant 28).
**Mode**: planning-only at this open per user directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-18.

## §1 — Thesis

The user opened Q on a functional-regression report: value.js + keyframes.js — dock items, animations, dropdowns, glass-cards "totally broken". The 8-deliverable Q audit (6 round-1 + 2 round-2) attributed the cause precisely, and the attribution overturns the surface impression:

**The breakage is NOT a glass-ui substrate regression.** glass-ui's demo renders every probed surface cleanly (Qζ Playwright probe — first successful live runtime probe in the K→Q span: dock at 3 viewports, the 5-rung glass-card ladder, dropdowns, the post-P continuous timeline — zero console errors). The post-P shadow cohort's code is sound (Qα + Qβ line-by-line review).

**The breakage is a cross-repo dev-resolution contract desync.** One root cause, fleet-wide:

- keyframes.js's `package.json` `exports["."]` advertises `import → ./dist/keyframes.js` + `types → ./dist/keyframes.d.ts`. The AD.W4 freshness-retire wave **deleted both `dist/` artefacts**. keyframes.js's manifest now points at files its own working tree removed.
- Dev servers survive — the `development` export condition routes to `src/`. But `npm run build` (uses `import` → deleted `dist/`) and `vue-tsc` (uses `types` → deleted `dist/`) **fail in all 5 consumers**: value.js, fourier-analysis, bbnf-buddy, words/frontend, speedtest. The intermittent-looking symptom (dev works, build red) is the `development`-condition mask.
- value.js is additionally **dev-broken**: its `vite.config.ts` hard-aliases `@mkbabb/keyframes.js → ../keyframes.js/dist/keyframes.js` (the deleted file), and the alias shadows conditional-exports entirely.
- The deeper architecture: the AD.W4 `"development"` conditional-exports model was applied to the **publisher side** (every `@mkbabb/*` `exports` map) but **never the resolver side** (no repo declares `resolve.conditions`; value.js carries a hostile fossil alias). The model worked in glass-ui + keyframes.js only by Vite's serve-mode auto-injection accident.

Three further audit-surfaced concerns fold into Q:

1. **Stale Card API** — value.js (11 SFCs) + bbnf-buddy (6 SFCs) use `<Card variant="pane">` — a prop glass-ui's `Card` never had (only `tier` / `shadow` / `grain`). glass-ui's `Card` **silently swallows** the unknown prop → falls back to `tier:"resting"` + `shadow:true` → the hard black drop-shadow the user saw. The silent-swallow is a substrate cohesion gap (O invariant 24 fail-explicit was never applied to component props).
2. **Post-P shadow cohort** — 7 untagged commits (`9f774b4..d244dd5`); the 4th K-invariant-3 recurrence, occurring 1-2 days AFTER P.W6 codified invariant 29 against exactly this. The codification is necessary-but-not-sufficient; Q escalates to a tooling-side gate.
3. **Cohesion + style fractures** — 4 pre-P core-feature co-location fractures (Qβ) + token-co-location defects incl. an 8-token private SFC dialect the post-P metric-stack commits introduced (Qγ) + the CSS budget at 93.6% gzip.

Per the user directive ("idiomatic, gestalt approaches ... architectural transpositions ... NO workarounds"): every Q remediation is a **deletion of a fossil that fights an existing mechanism**, not new machinery. The P.W5 `@mkbabb/value.js` phantom devDep — a band-aid for this very desync — RETIRES.

## §2 — Binding invariants (inherited + extended)

1-29. All 29 invariants from P inherited (V 1-20; N 21-23; O 24-27; P 28-29).
30. **NEW @ Q — Cross-repo dev-resolution contract.** Every `@mkbabb/*` package's `package.json` `exports` declares the canonical condition set; every consumer's resolver config declares explicit `resolve.conditions` and carries ZERO hard `dist/` aliases to sibling `@mkbabb/*` packages. The contract is glass-ui-owned, documented at the precept submodule, and mechanically gated by `scripts/proof-resolution-contract.mjs`. Codify at Q close.
31. **NEW @ Q — Component props fail-explicit.** Component primitives do not silently swallow unknown props. A consumer passing a prop the component does not declare gets a dev-mode warning (or a typed-rejection at the `defineProps` boundary). Extends O invariant 24 (fail-explicit) from composables to the component-prop surface. Codify at Q close.
32. **NEW @ Q (audit-aug round-2) — Phantom-class corpus-grep gate.** When a CSS class is RETIRED from glass-ui, the retiral lands with (a) an entry in `.retired-classes.txt` (or equivalent registry), and (b) a fleet-wide grep across every `@mkbabb/*` consumer + glass-ui's own demo via `scripts/proof-phantom-classes.mjs`. The gate exits non-zero on any match. Mirrors invariants 29 + 30 + the P.W2 stash-script — every NEW invariant ships with its tooling gate at the same tranche. Codified at W6 after W4 Lane F demonstrates the manual sweep.
33. **NEW @ Q (audit-aug round-4) — Dead-code removal corpus-grep gate.** Generalises invariant 32 from RETIRED-class-names to ALL "remove unused" / "cleanup" commits, substrate AND consumer. Any commit deleting a CSS class, token, utility, or component runs a fleet-wide corpus grep first; a commit whose message contains "clean up", "remove unused", "remove overlap", or "delete orphan" carries a mandatory grep-evidence line in its body. Motivated by 3 same-pattern instances: substrate `b0debec` D.W2.D ("delete zero-site orphans" missed keyframes.js's `.rainbow-*`) + consumer `17adae2` + `c7f7c96` (keyframes.js "clean up styles" deleted load-bearing demo-local `.status-dot--*` + `.rainbow-*`). The `proof-phantom-classes.mjs` gate extends to a pre-deletion mode. Codified at W6 alongside 32.

## §3 — Wave schedule (7 waves)

Round-1 opened 6 waves (W0-W5). Audit-aug round-4 inserted **W5 keyframes.js demo restoration** and renumbered the close wave to **W6**.

| Wave | Opens after | Headline | Tag |
|---|---|---|---|
| **W0 HEADLINE** | open | Post-P shadow-cohort retrospective (`docs/tranches/AB+2/`) + cross-repo dev-resolution contract authored + `scripts/proof-resolution-contract.mjs` gate + precept edict draft | v1.8.5 (gate script + contract doc) |
| **W1 HEADLINE** | W0 close | Fleet-wide consumer un-break — keyframes.js `exports` fix + 5-consumer `resolve.conditions` sweep + glass-ui phantom-devDep retiral + value.js picker 0×0 (Lane I) + fourier export (Lane J). Lane C RETIRED — value.js Tranche A.W0 already shipped the value.js un-break | v1.8.6 (glass-ui devDep retiral) |
| **W2** | W1 close | Card cohesion — glass-ui `Card` props fail-explicit (invariant 31) + bbnf-buddy 7-site `<Card variant=>` migration to `<Card tier="wash" :grain="false">` / `<CartoonCard>`. value.js Lane B RETIRED — Tranche A.W1 already migrated to the canonical recipe | v1.8.7 |
| **W3** | W2 close | Core-feature cohesion transpositions + cosmetic substrate REVERTs — dock `data-density` + dropdown scoped-style + `beec35e` dock-dedup + token-home drift + **Lane B cartoon-surface re-model** (`.glass-cartoon` → `@utility cartoon-surface`, dead-token drop) + **Lane E rainbow `@utility` re-promote** (Q-cos-3) + **Lane F typography `:root` literal retire** (Q-cos-2) + **Lane G IconTooltip width-stretch revert** (Q-cos-13) + **Lane H `<ScrollPane>` + `<CartoonCard>` DEMOTE** (Q-cos-14 + Q-cos-22; Card gains `surface` prop) | v1.9.0 minor (substrate transposition + reverts + 2 component retires) |
| **W4** | W3 close | Style + token co-location + consumer cosmetic sweep — metric-stack token-dialect promotion + `-webkit-backdrop-filter` single-source + transitions.css `@layer` + `--scale-press-*` disposition + CSS budget rebaseline + cosmetic sweep + **Lane F cluster-C2 phantom-class fleet sweep** (value.js portion retired) + **Lanes G/H/I bbnf-buddy preset.css + `:deep` retreat + cartoon-shadow lift** | v1.9.1 |
| **W5** | W3 close (may overlap W4) | **keyframes.js demo restoration + idiomatic glass-ui upgrade** — scene-transition crash fix + cleanup-commit CSS-deletion restoration + hero cosmetic + idiomatic glass-ui adoption sweep + layout/clipping fixes + dead-code purge + playground (Q-cos-15 … Q-cos-21) | keyframes.js version bump (consumer-side wave; no glass-ui ship) |
| **W6 close** | W5 close | Strengthened audit (7 lanes) + consumer re-audit (6) + visual-runtime re-probe (π BINDING — Playwright) + FINAL.md + precept advance (invariants 30-33 + π lane re-activation) | aggregate final |

**Critical path**: W0 → W1 → W2 → W3 → {W4 ∥ W5} → W6. The dev-resolution contract (W0) MUST precede the consumer un-break (W1). W5 (keyframes restoration) opens after W3 — it consumes the W3 substrate reverts (rainbow re-promote + IconTooltip revert) — and may run in parallel with W4 (disjoint repos: W4 = glass-ui + fourier/words/bbnf-buddy; W5 = keyframes.js only).

## §4 — Inheritance ledger absorption (every item; zero deferral)

### Consumer breakage (the HEADLINE)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-break-1 | keyframes.js `exports` points at deleted `dist/` — fleet-wide build/typecheck failure | W1 | ADDRESS (keyframes.js `package.json` exports fix) |
| Q-break-2 | value.js hard alias to keyframes.js deleted `dist/` — dev-boot 500 | W1 | ADDRESS (retire the fossil alias) |
| Q-break-3 | value.js `gh-pages` build clobbers its own library `dist/` | W1 | ADDRESS (route demo build to `dist/gh-pages/`) |
| Q-break-4 | glass-ui `@mkbabb/value.js` phantom devDep (P.W5 band-aid) | W1 | RETIRE (the contract enables real nested-graph resolution) |
| Q-break-5 | 5-consumer Vite `resolve.conditions` un-swept post-AD.W4 | W1 | ADDRESS (per-consumer resolver config) |
| Q-card-1 | value.js 11 + bbnf-buddy 6 `<Card variant="pane">` stale API | W2 | ADDRESS (consumer migration to `tier`) |
| Q-card-2 | glass-ui `Card` silently swallows unknown props | W2 | ADDRESS (invariant 31 fail-explicit) |

### Post-P shadow cohort

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-postP-1 | 7-commit post-P cohort retrospective (`docs/tranches/AB+2/`) | W0 | ADDRESS (retrospective folder) |
| Q-postP-2 | 4th K-invariant-3 recurrence AFTER invariant 29 codified — codification necessary-but-not-sufficient | W0 | ADDRESS (diagnose + escalate to tooling gate) |

### Core-feature cohesion (Qβ)

| Q ID | Item | Wave |
|---|---|---|
| Q-coh-1 | dock `data-density` split-brain (dock.css + utilities.css) | W3 |
| Q-coh-2 | `cards.css` near-empty; `.glass-cartoon` misplaced in glass.css | W3 |
| Q-coh-3 | dropdown lone scoped-style exception | W3 |
| Q-coh-4 | token-home drift (no consistent feature-token-home rule) | W3 / W4 |
| Q-coh-5 | `beec35e` patched into 2 parallel dock rule-sets (`.dock-layer` + `.dock-layer-item-host`) | W3 |

### Style + token (Qγ)

| Q ID | Item | Wave |
|---|---|---|
| Q-sty-1 | metric-stack 8-token private SFC dialect → tokens.css promotion | W4 |
| Q-sty-2 | timeline `--timeline-dot-*` private knobs | W4 |
| Q-sty-3 | manual `-webkit-backdrop-filter` violating glass.css single-source policy | W4 |
| Q-sty-4 | transitions.css unlayered class rules (cascade hazard) | W4 |
| Q-sty-5 | `--scale-press-{xs,md,lg}` substrate-without-consumer | W4 |
| Q-sty-6 | CSS budget 93.6% gzip — rebaseline (gated after token promotions) | W4 |

### Legacy + misc (Qδ + Q11)

| Q ID | Item | Wave |
|---|---|---|
| Q-leg-1 | cosmetic comment rephrasings (test-file "legacy consumers", dock.css archaeology) | W4 |
| Q-misc-1 | speedtest `manualChunks` dead `/dist/` match branches | W1 (cohorts with the resolver sweep) |
| Q-misc-2 | consumer build/CI-gate audit (no consumer caught its own red build) | W5 |

### Chronic-defer re-examination (Qε)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-chron-1 | PD-3 (value.js WIP-vs-master split) — **CLOSED at audit-aug round-4** (Qφ): the WIP branch is a strict ancestor of master; value.js Tranche A.W0 absorbed it. No split exists. Delete the WIP branch | W1 | CLOSED — no action beyond branch deletion |
| Q-chron-2 | π visual-runtime lane — Playwright now available; archived purely on tooling-unavailability | W6 | RE-ACTIVATE (archived → binding canonical close lane) |
| Q-chron-3 | **NEW @ audit-aug round-2** — "codification without gate is necessary-but-not-sufficient" recurrence pattern (5th instance at phantom-class M-class blind-spot, after K-invariant-3 stash + K-invariant-3 K-invariant-3-recurrence + invariant 30 + invariant 31) | W6 | DOCUMENT (LL entry; itself becomes a precept: every new invariant ships with gate same-tranche) |
| Q-chron-4 | **NEW @ audit-aug round-4** — "cleanup commit deletes load-bearing artefact" pattern: substrate `b0debec` + consumer `17adae2` + `c7f7c96`. Motivates invariant 33 (dead-code-removal corpus-grep gate) | W6 | DOCUMENT (LL entry) + invariant 33 codified |

### Cosmetic regression cohort (audit-aug round-2 — Qη/θ/ι/κ/λ/μ)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-1 | keyframes.js hero `<h1>` `font-bold` drop (`EditorStartScreen.vue:6`) | W1 (Lane H) | FOLD-IN consumer |
| Q-cos-2 | glass-ui `typography.css:196-201` redundant `:root --font-serif` literal defeats consumer `@theme` overrides | W3 (Lane F) | **REVERT substrate** (commit `6ce14e5` L.W1) |
| Q-cos-3 | glass-ui `b0debec` D.W2.D retired `.rainbow-vivid` + `.rainbow-pastel` + `.btn-interactive` under a false zero-site verdict | W3 (Lane E) | **REVERT substrate** (re-promote as `@utility`; D.W2.D audit logic gap diagnosed) |
| Q-cos-4 | keyframes timeline visual correctness — RESOLVED at round-3: dominant cause is Q-cos-13 IconTooltip wrap-span (NOT the play-button or timeline tokens) | W3 (Lane G via Q-cos-13) | REVERT substrate — see Q-cos-13 |
| Q-cos-5 | fourier-analysis paints blank — `extractAnimationOptions` missing export from `@mkbabb/value.js` | W1 (Lane J) | FOLD-IN consumer (value.js barrel re-export) |
| Q-cos-6 | value.js picker pane collapsed to 0×0 (Mμ-5) — the actual user-visible value.js BLOCKER (Qα attributed wrong symptom) | W1 (Lane I) | FOLD-IN consumer (closes Q-chron-1 in the same lane) |
| Q-cos-7 | Cluster C2 — phantom `.glass-{subtle,medium}` 13-site fleet (fourier 9 + words 4 + keyframes 3 + value 2 verify-at-open) | W4 (Lane F) | FOLD-IN consumer + pairs with invariant 32 codification at W5 |
| Q-cos-8 | bbnf-buddy `preset.css` 12 retired-token overrides — silent no-op fleet-wide | W4 (Lane G) | FOLD-IN consumer |
| Q-cos-9 | bbnf-buddy `SelectionInfo.vue:238` retired `--glass-border-subtle` fallback | W4 (Lane G) | FOLD-IN consumer |
| Q-cos-10 | bbnf-buddy `AnimationWorkspace.vue:157` 7th stale Card site (`'default' | 'cartoon'`) | **W4 Lane G** (round-5: migrates to `<Card :surface=>` — needs W3's `surface` prop; sequenced out of W2) | FOLD-IN consumer + tightens invariant 31 |
| Q-cos-13 | **NEW @ audit-aug round-3** — glass-ui IconTooltip `<span class="icon-tooltip-trigger">` wrap-span (`display: inline-flex; min-width: 44px`) breaks `w-full` descendants; keyframes PlaybackRibbon Slider collapses to 16px nub (the user-named "timeline not correct" symptom) | W3 (NEW Lane G) | **REVERT substrate** (commit `25e1b5a` O.W6 Lane D); re-implement WCAG 44×44 via padding/contents path per Lane G |
| Q-cos-11 | bbnf-buddy `preset.css:191-194` `--shadow-cartoon` lift-scale incomplete (missing `-md`/`-lg` rungs) | W4 (Lane I) | FOLD-IN consumer |
| Q-cos-12 | bbnf-buddy 3-file `:deep()` retreat (EmotionStateSelect ToggleChip + EditorPanel ScrollPane + ToolsLayer dock-icon-button) | W4 (Lane H) | FOLD-IN consumer + possible substrate referrals Q.Rh-1 / Q.Rh-2 |

### Cosmetic regression cohort — audit-aug round-4 (Qπ/ρ/σ/τ/υ/φ)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-14 | `<ScrollPane>` DEMOTE — 43-line styling-only component, 1 consumer (own demo story), fails L invariant 8; retire to `<Card tier="wash" :grain="false">` recipe | W3 (Lane H.1) | **DEMOTE substrate** (component → Card config; clean break, no alias) |
| Q-cos-15 | keyframes `App.vue:106` `<Transition mode="out-in">` wrapping `<KeepAlive>` wrapping `defineAsyncComponent` crashes the renderer (`getNextHostNode` null-deref) — masks t-value scrubber + bezier editor + presets + duration control + square/amiga/easing cold deep-link | W5 (Lane A) | FOLD-IN consumer (`<Suspense>` restructure) |
| Q-cos-16 | keyframes rotations-dropdown option-dots paint transparent — consumer `17adae2` "cleanup" deleted demo-local `.status-dot--*` colour classes | W5 (Lane B) | FOLD-IN consumer (adopt glass-ui `<StatusDot>` component) |
| Q-cos-17 | keyframes dead code — `demo/{boxes,balls,simple}` orphaned+unrunnable; standalone `demo/{amiga,cube,square}` dupes; `SceneNav.vue` orphan; 25 orphaned `@/components/ui/` shadow dirs | W5 (Lane F) | FOLD-IN consumer (purge) |
| Q-cos-18 | keyframes idiomatic glass-ui adoption — hand-rolled scrubber/bezier-canvas/duration-slider/status-dots replaced with glass-ui primitives, zero feature loss | W5 (Lane D) | FOLD-IN consumer (idiomatic upgrade) |
| Q-cos-19 | keyframes square-scene controls panel overlays+clips the animation stage at 390/820px; bezier selector clipped (the user-named symptom) | W5 (Lane E) | FOLD-IN consumer (responsive grid) |
| Q-cos-20 | keyframes playground is a non-functional shell — empty canvas, no Assets tab, no controls (`AssetViewport`/`AssetLayerPanel` query null) | W5 (Lane F) | FOLD-IN consumer (feature-completion — not a regression; nothing lost) |
| Q-cos-21 | keyframes `glass-subtle→glass-wash` un-migrated rename (controls-pane tabs no glass surface) + missing root `bg-background` (transparent checkerboard) | W5 (Lane B) | FOLD-IN consumer |

### Cosmetic regression cohort — audit-aug round-5 (Qχ/ψ)

| Q ID | Item | Wave | Verdict |
|---|---|---|---|
| Q-cos-22 | `<CartoonCard>` DEMOTE — 36-line styling-only component, 0 own props, 1 consumer; the `--glass-*-cartoon` tokens its doc-comment claims are never defined in `src/` (cartoon's bg/blur/border ARE the `quiet` rung). Fold in as a new orthogonal `Card surface="glass"\|"cartoon"` prop; retire `cartoon-card/` jointly with `<ScrollPane>` | W3 (Lane B re-model + Lane H.2 retire) | **DEMOTE substrate** (component → Card `surface` prop; clean break, no alias) |
| Q-cos-23 | fourier-analysis 20 `class="cartoon-card"` sites (10 files) are dead CSS — `.cartoon-card` was deleted from glass-ui at C.W5 `304ac78`; the cartoon surface renders silently absent. 0 sites owned by any fourier tranche | W4 (Lane F.2) | FOLD-IN consumer (migrate to `<Card surface="cartoon">` / `.cartoon-surface`) |

### value.js de-scoping — audit-aug round-4 (Qφ)

| Q ID | Round-4 disposition |
|---|---|
| Q-break-1…5 (value.js portion) | value.js Tranche A.W0 already shipped all 5; Q.W1 Lane C RETIRES |
| Q-card-1 (value.js 11 sites) | value.js Tranche A.W1 (`92fe64d`) already migrated to `tier="wash" :shadow="false" :grain="false"` = the round-4 canonical target; Q.W2 Lane B RETIRES |
| Q-cos-7 (value.js phantom-class portion) | value.js A.W1 Lane B already fixed the 3 undefined classes; Q.W4 Lane F value.js portion RETIRES (re-grep confirms at W4 open) |
| Q-chron-1 (WIP-vs-master) | CLOSED — the WIP branch `w.w2.1-value-js-prebuild` is a strict ANCESTOR of master (merge-base, 21 commits behind); value.js A.W0 absorbed it. Delete the WIP branch as plan hygiene |
| Q-cos-6 (picker 0×0) | SURVIVES — un-owned by any value.js wave; Q.W1 Lane I, the one real value.js write Q retains (cross-repo coordination gate per Qφ §6) |

### Round-4 user-pivot resolution (audit-aug 2026-05-18)

| Q ID | User question/pivot | Round-4 resolution | Final wave |
|---|---|---|---|
| Q-cos-14 (ScrollPane) | "is it truly befitting to have an entire component, rather than a card variant? Is the logic/styling worthy?" | Qπ: NO — `<ScrollPane>` is 43 lines, 0 behaviour, 1 consumer; DEMOTE to `<Card tier="wash" :grain="false">`. The W2 target re-pivots a THIRD time — this is the settled one. `<ScrollPane>` retires at W3 Lane H | W2 (target) + W3 (Lane H retire) |
| speedtest "ensure migrated" | "ensure speedtest is migrated too" | Qυ: speedtest has 0 `<Card variant>` sites + 0 AF/AG tranche collisions — nothing to migrate. The 2 hand-rolled candidates are intentionally-not-panes. No work | (none) |
| value.js "ensure migrated" + "account for the latest value.js tranche" | "ensure value.js migrated; don't duplicate work" | Qφ: value.js Tranche A.W0+A.W1 already shipped the un-break + the 11-site migration (to the round-4 canonical recipe). Q's value.js-writing lanes RETIRE except the picker 0×0 | W1 Lane I (picker only) |
| keyframes "many other problems" | "bezier selector small/clipped, t-value scrubber doesn't work, rotations dropdown no progress circles, many style losses — PROPER and IDIOMATIC upgrade, no loss of feature" | Qρ/σ/τ: ~95% consumer-side. One `App.vue` `<Transition>`+async crash masks four features; two "cleanup" commits deleted load-bearing CSS. NEW wave W5 — keyframes.js demo restoration + idiomatic glass-ui upgrade | W5 (new wave, 6 lanes) |

Qν (speedtest scan) returned WEAK-REJECT for the direct pane-fold-back pivot: speedtest has 0 `<Card variant>` sites (it received the `5d914df9` S.W4 sweep value.js + bbnf-buddy missed) and is chart-and-meter-heavy, not editor-chrome-heavy. The user's intuition was directionally right (pane exists; pane is critical) — but Qπ's round-4 adjudication concluded the architectural answer is a Card recipe, not a component (the `e017d53` `<ScrollPane>` lift was itself the overreach).

### Round-5 user-pivot resolution (audit-aug 2026-05-18)

| Q ID | User question | Round-5 resolution | Final wave |
|---|---|---|---|
| Q-cos-22 (CartoonCard) | "CartoonCard should likely just be a variant, too, no?" | Qχ: YES — DEMOTE. CartoonCard is 36 lines, 0 own props, 1 consumer; even thinner than ScrollPane. Its claimed `--glass-*-cartoon` tokens are never defined — cartoon's surface IS the `quiet` rung + 3 decorations. Folds in as a new orthogonal `Card surface` prop (NOT a `tier` rung — that would corrupt the API). Qπ's round-4 "the lift was correct for CartoonCard" aside OVERTURNED. `<ScrollPane>` + `<CartoonCard>` retire together (lifted together at `e017d53`) | W3 (Lane B + Lane H.2) |
| "ensure all consumers properly migrated" | "ensure all consumers are properly migrated in these changes, folded into the tranche" | Qψ exhaustive fleet scan: 21 cartoon migration sites (1 bbnf-buddy stale-variant + 20 fourier dead `class="cartoon-card"`); 0 owned by any consumer tranche — Q owns all 21. fourier's 20 are dead CSS (`.cartoon-card` deleted at C.W5). All folded: bbnf-buddy → W4 Lane G, fourier → W4 Lane F.2 | W4 (Lane F.2 + Lane G) |

The pane + cartoon + ScrollPane fleet migration is now FULLY specified across the waves — every consumer site has a wave, a lane, and a target. See §4 "Full consumer-migration map" below.

### Full consumer-migration map (audit-aug round-5 — every consumer site placed)

| Consumer | pane sites | cartoon sites | scroll-pane sites | Wave/lane | Notes |
|---|---|---|---|---|---|
| value.js | 11 (10 `pane` + 1 `tier="resting"`) | 0 | 0 | — | Already migrated by value.js Tranche A.W1 to the canonical recipe; Q does nothing |
| bbnf-buddy | 6 `<Card variant="pane">` | 1 `<Card variant="cartoon">` | 0 | W2 Lane C (pane) + W4 Lane G (cartoon) | cartoon site sequenced to W4 — needs W3's `surface` prop |
| fourier-analysis | 0 | 20 `class="cartoon-card"` (dead — C.W5) | 0 | W4 Lane F.2 | migrate to `<Card surface="cartoon">` / `.cartoon-surface` |
| speedtest | 0 | 0 | 0 | — | Got the `5d914df9` S.W4 tier-API sweep |
| keyframes.js | 0 | 0 | 0 | — | (keyframes restoration is W5 — unrelated to pane/cartoon) |
| words/frontend | 0 | 0 | 0 | — | — |
| glass-ui demo | — | 5 `<CartoonCard>` story | 1 `<ScrollPane>` story | W3 Lane H | both stories folded into the Card story |

### Round-3 user-pivot resolution (audit-aug 2026-05-18) — SUPERSEDED by round-4 for the ScrollPane target

| Q ID | User pivot | Round-3 resolution | Final wave |
|---|---|---|---|
| Q-card-1 + Q-cos-10 (W2 strategy) | "pane variant should be folded back in, or an idiomatic solution derived" + "look to past commits — this has existed before" | Qξ Path D: pane was LIFTED to `<ScrollPane>` sibling primitive at `3a43a8f` companion commit `e017d53` (NOT deleted); `CHANGELOG.md` v0.8.0 documents the canonical migration. **W2 migration target redirected**: `<Card variant="pane">` → `<ScrollPane>` (faithful) instead of `tier="wash"` (partial-faithful); `<Card variant="cartoon">` → `<CartoonCard>` | W2 (REVISED) |
| Q-cos-4 (keyframes timeline) | "no deferrals of auditing" | Qο: defect resolved at confidence HIGH — root cause is **NEW Q-cos-13** IconTooltip wrap-span (NOT timeline tokens / NOT play-button). Substrate REVERT lane added at W3 Lane G | W3 (via Q-cos-13) |
| Q-cos-13 (NEW) | (round-3 finding via Qο) | IconTooltip `<span class="icon-tooltip-trigger">` wrap-span (O.W6 Lane D commit `25e1b5a`) breaks `w-full` descendants in grid cells; restore via padding/contents-based WCAG hit-area mechanism | W3 (NEW Lane G) |

Qν (speedtest scan) returned WEAK-REJECT for the direct pane-fold-back pivot: speedtest has 0 `<Card variant>` sites (it received the `5d914df9` S.W4 sweep value.js + bbnf-buddy missed) and is chart-and-meter-heavy, not editor-chrome-heavy. The user's intuition was directionally right (pane exists; pane is critical) but the architectural answer (`<ScrollPane>` sibling primitive) was already shipped in 2026-05-06's `e017d53` — round-1 + round-2 missed the CHANGELOG entry naming it.

## §5 — Cross-repo coordination

Per `coordination/CONSTELLATION.md`. The Q remediation is fleet-wide cross-repo: keyframes.js (the headline `exports` fix) + value.js + fourier-analysis + bbnf-buddy + words/frontend + speedtest all receive resolver-config writes. Per the AGENT.md MULTI-WRITER policy — per-repo lanes, never bundled; orchestrator owns consumer commits + pushes.

## §6 — Risk register

1. **keyframes.js `exports` fix is the fleet keystone** — one `package.json` change unblocks 5 consumers; it MUST land first (W1) + be verified against all 5 before the per-consumer sweeps.
2. ~~value.js WIP-vs-master~~ — CLOSED at audit-aug round-4 (Qφ): the WIP branch is a master ancestor; no split exists. No risk remains.
3. **CSS budget rebaseline ordering** — Q-sty-6 rebaselines AFTER the W4 token promotions so it happens once (Qγ recommendation).
4. **invariant-29 recurrence** — the 4th K-invariant-3 instance happened after codification. W0 must produce a real tooling gate (analog of the P.W2 stash-script escalation), not another prose edict.
5. **π re-activation depends on Playwright stability** — W6 confirms the tooling holds across a final probe before codifying π as binding (4 probes by then: Qζ + Qμ + Qρ/σ/τ + W6).
6. **W4 ∥ W5 parallel execution** — W4 (glass-ui + fourier/words/bbnf-buddy) and W5 (keyframes.js only) touch disjoint repos and may run concurrently; the orchestrator must hold the keyframes.js lane out of W4 (no W4 write touches keyframes.js — verified: W4 Lane F's keyframes phantom-class sites cohort INTO W5's `glass-subtle→glass-wash` migration, not W4).
7. **value.js cross-repo coordination** — value.js's tranche team requested Q not write value.js; Q.W1 Lane I (picker 0×0) is the one retained write. The orchestrator confirms the path with the user at W1 open (Qφ §6).
8. **W5 playground scope** — the keyframes playground is a non-functional shell; "restoration" there is feature-completion, not regression-repair. W5 Lane F sizes it honestly; if it exceeds the wave envelope it files a specified follow-on (not an open TODO — invariant 28 binds).
9. **W2→W4 bbnf-buddy `variant=` window** — bbnf-buddy's 1 `cartoon` Card-variant site stays on the stale `variant=` API from W2 close to W4 close (it needs W3's `surface` prop). W2 Lane A's invariant-31 fix ships as a dev-WARN, not a typecheck-hard-reject, so bbnf-buddy's build stays GREEN across the window. The typed-reject hardening lands at W6 once the fleet is `variant=`-free.
10. **W3 intra-wave ordering** — Lane H.2 (`<CartoonCard>` retire + Card `surface` prop) depends on Lane B (`.cartoon-surface` utility). Lane B lands before Lane H within W3; the other W3 lanes (A/C/D/E/F/G) are bounds-disjoint and parallel.

## §7 — Authority

Plan substrate at Q open: this file + `findings.md` + `PROGRESS.md` + `dispatch/AGENT.md` + `coordination/CONSTELLATION.md` + `research/Q{α-ζ}*.md` (6 round-1) + `audit/Q1{1,2}-*.md` (2 round-2) + `research/screenshots/` (12 Playwright captures) + `waves/W{0-5}.md`.

**Audit-augmentation rounds 2-5 substrate (2026-05-18, post-open user directives)**: `research/Q{η,θ,ι,κ,λ,μ,ν,ξ,ο,π,ρ,σ,τ,υ,φ,χ,ψ}-*.md` (17 audit deliverables across 4 rounds) + `research/Qsynthesis-cosmetic-augmentation.md` (rolling synthesis) + Playwright screenshots `research/screenshots/q-{mu,omicron,rho,sigma,tau}-*.png` + W0-W6/Q.md/PROGRESS.md surgical augmentation. Round-4 inserted W5 (keyframes.js demo restoration) + renumbered the close to W6. Round-5 adjudicated `<CartoonCard>` (DEMOTE) + the full fleet cartoon-migration map. 23 Q-cos-* IDs; invariants 30-33; Q-chron 1-4.

Per the Q-open user directive ("This is NOT an implementation phase. Tranche development only.") + the audit-aug round-2 directive ("NO implementation, this is tranche development"), implementation dispatch awaits explicit subsequent user directive per the K → L → M → N → O → P precedent.
