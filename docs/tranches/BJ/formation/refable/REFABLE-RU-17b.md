# REFABLE RU-17b — round-1 residual lenses, second half (four opus artifacts)

verified-model: claude-fable-5 (system-context model ID, returned verbatim)
unit: RU-17b · date: 2026-07-18 · HEAD: 2df6a5a5 · re-verified at 16e72a49 (delta = refable
salvage docs only; spot-checks 1.2/2.2/2.3/2.6/4.1/4.5/4.7 + the crosswalk prose all re-confirm;
roll-up tally corrected 22→23 — the enumerated rows were always 23)
protocol: ANEW (opus unread, primary sources only) → SCRUTINY (assume-incorrect) → UNION
(per-claim verdicts, ROUTING proposed only)

Boundary moment: the full ANEW pass ran first — FEEDBACK-LEDGER + ASK.md + ASK-REDUCTION +
PROMPTS + ASSEMBLY-CROSSWALK read and re-tallied; the demo/ census re-derived from manifest.ts +
the stories tree; the load-perf graph re-derived from main.ts/router.ts/AppShell + the dist-demo
build; RU-10's union (FABLE-STORY-FRAMEWORK.md) mapped for what it re-proved. Only then were the
four opus artifacts opened. Every 2B claim was re-verified on disk by hand at HEAD.

---

## Unit 1 — prompt-recap completeness (round-1 opus, 3 claims)

### ANEW (before reading the opus)

The corpus is 67 rows (50 F + 17 A; grep-confirmed). The charter (PROMPTS/audit-formation-prompt.md)
demands every ask owned or explicitly ledgered, silent drops forbidden. At HEAD the accounting
CLOSES: ASSEMBLY-CROSSWALK reconciled counts 50 LANDED / 5 DECIDED / 3 CLEARED / 10 ASK / 0 ORPHAN /
0 pending (= 67); the five compile-time ORPHANs (F19/F20/F21/F22/F24) are cured by
BAND-FEEDBACK-MOTION (W1-W4 verified on disk, plus W5 `BJ.W-IDLE-BREATH` for A01/A11 and W6
`BJ.W-PAGER-DOT-MORPH` for F33's dots); the 26-row ASK.md carries every user-gated call. The BJ tree
is tracked (FEEDBACK-LEDGER in `git ls-files`).

### SCRUTINY → UNION verdicts

| # | opus claim | verdict | evidence |
|---|-----------|---------|----------|
| 1.1 | registry-outside-committed-record (BJ tree untracked while cherry-picked answers commit) | **RATIFIED — and cured terminally** | True at round-1. The proposed cure landed exactly: the ledger + formation corpus committed at 701fed5c (07-17 15:37), the v7.0.0 tag cut at 4ab12128 (07-17 18:11) — ledger BEFORE tag, the honest ordering the claim demanded |
| 1.2 | family-seed-omission (6 F-rows + 4 A-asks cited by ZERO VISUAL-GESTALT families) | **RATIFIED facts** | All ten greps re-run at HEAD: F02 F07 F13 F14 F19 F23 A07 A10 A11 A14 each = 0 hits in VISUAL-GESTALT.md — exactly as claimed |
| 1.2b | — the claim's causal mechanism | **FABLE-NEW (inversion)** | The predicted drop mechanism inverted in reality: of the six seed-omitted F-rows only F19 actually orphaned; F02/F07/F13/F14/F23 all landed via the REGISTRY/crosswalk anyway. Meanwhile F20/F21/F22/F24 — each CITED in VISUAL-GESTALT (grep = 1 apiece) — became the crosswalk ORPHANs. The real drop point was family→band DRAFTING (a family recognized but never turned into a BAND file), not ledger→family seeding. The opus's remedy (reconcile ledger↔families before waves cut) was still the right medicine — the crosswalk IS that reconciliation and it caught all five |
| 1.3 | recap-carry-unexecuted (metric/instrument-chassis/completion-seal undeleted at the close, re-asked) | **RATIFIED** | All three dirs present at HEAD (`src/components/{metric,instrument-chassis,completion-seal}`). Folded exactly as proposed: F18 → ASK-1 (marked "third-asked" — the carry flag the opus demanded), F26 → ASK-2 with corrected provenance (speedtest ×0; sci-report ×2 + atlas ×2) |

FABLE-NEW (residual): the crosswalk header still reads "the eight band specs" while nine BAND-*.md
exist (BAND-FEEDBACK-MOTION post-dates compile) — a one-line prose truth-up.

Unit verdict: the artifact survives whole. Its three claims verify, its cures all landed, and the
one thing it got wrong — WHERE the silent drop would originate — is a mechanism lesson worth
keeping: seed presence does not protect a row; only a drafted band does.

---

## Unit 2 — story-page structure census (round-1 opus, 6 findings)

### ANEW (from demo/ at HEAD, manifest-derived)

11 categories · 88 manifest story rows · 1 catalog home + 11 section landings + semantic 404 = 101
route records, 100 navigable. 9 `hero: true` rows. 14 embedded non-routed sub-story files, ALL
consumed (atoms hosts 5, inputs 4, text-motion 3, toast 1, paper-glass 1 — the five FamilyTabs
hosts exactly). 4 `.tile.vue` files (display ×2, dock ×1, forms ×1 — RU-10's 4/88 coverage number
re-confirmed). Chassis conformance: StoryPage 85/88 direct + 3 via VizStudio (which wraps StoryPage
— so 88/88 root through it); StorySection 74/88; ShowcaseFrame 21; DockStage 7/8 dock pages.
FamilyTabs TRUE mounts = 5 (timeline/scroll are comment-only mentions — re-proved by `git show` at
the round-1 branch itself: zero imports there either). Depth ladder as documented: D0 = intro alone,
D1 = 11 landings, D2 = first non-front-door story per category, D3 = the rest.

### SCRUTINY → UNION verdicts

| # | opus claim | verdict | evidence |
|---|-----------|---------|----------|
| 2.0 | summary: 100 pages, all rooting through StoryPage | **RATIFIED** | Census above; VizStudio.vue:72 `<StoryPage>` |
| 2.1 | per-type-variant-fragmentation (one hero\|page axis vs ≥6 parallel wrappers; ~23 bespoke-CSS pages) | **RATIFIED** | StoryPage.vue:32-34 single `variant` computed at HEAD; wrappers all real (VizStudio, DockStage, FamilyTabs, StoryBodyRenderer, hand-authored stacks); scoped-style census = EXACTLY 23 of the 88 manifest pages; all five cited line-counts exact (deck 227, dock-search 97, surface 42, settings 37, surface-tints 41) |
| 2.1b | — "FamilyTabs … 7 routes" | **OPUS-WRONG** | 5 true mounts; the other 2 (timeline, scroll) are comment-only grep hits — wrong even at the opus's own branch snapshot (git show codex/bi-p-q-execution: no imports). RU-10 corrected this; re-proved here independently |
| 2.2 | undefined `--story-article-w` no-op | **RATIFIED** | 1 reference (StoryPage.vue:51), 0 definitions repo-wide at HEAD |
| 2.3 | dead-scale hardcode (landings pin hero-scale="4" against manifest `heroScale: "hero"`) | **RATIFIED** | SectionLanding.vue:28 + CatalogLanding.vue:18 literal `"4"`; manifest `sectionLanding()` returns `heroScale: "hero"` — dead data + hierarchy inversion both real |
| 2.4 | studio-idiom-fork (liquid-grid open-codes VizStudio's pattern) | **RATIFIED — but the fix is MOOTED** | liquid-grid.vue: no VizStudio import, open-coded `<Configurator class="h-[min(78vh,720px)] shadow-cartoon">` at :123, module-name heading "LiquidGrid" at :115. FABLE-NEW: BAND-REDUCTION W3 DELETES liquid-grid (RULING 1, zero consumers) — the fold-into-VizStudio remedy dies with it; no wave should be cut from this finding |
| 2.5 | hero-variant heading duplication (StoryHero h1 + VizStudio StorySection h2, same string) | **RATIFIED statically; LIVE-DEFER the paint** | All three studios hero:true in the manifest; VizStudio.vue:73 `<StorySection :heading>`; aurora.vue:122 / blob.vue:477 / fourier-field.vue:319 pass the display name. Both nodes exist in the static tree; whether it READS as duplication is the browser's to settle — the opus itself asked for the live check |
| 2.6 | StoryBody framework at 3 consumers (~97% unadopted) | **RATIFIED** | `:body=` = exactly forms/select, feedback/alert, display/badge at HEAD; select is a family member, not a route |

What RU-10 did NOT re-derive — scrutinized here: the ~23 bespoke-CSS count (now proven exact), the
100-page total, the 14 embedded sub-pages (all consumed — no dead files among them), the five
scoped-style line-counts, and the heading-duplication static truth. All hold. RU-10's own re-proofs
(taxonomy 6, family mounts 5, studio consumers 3, tile coverage 4/88) are consistent with this
census; the opus's proposed 7-type taxonomy is superseded by RU-10's 6-type fold (doc→spec,
catalog→landing, scene contingent on ASK-13) — a refinement, not a refutation.

---

## Unit 3 — story/demo load-perf static analysis (round-1 opus, 5 findings)

### ANEW (entry graph + build truth at HEAD)

Entry: main.ts gates `app.mount` on `router.isReady()` (line 72); router.beforeResolve awaits every
matched lazy chunk before commit (router.ts:122-130). AppShell statically imports Aurora, the dialog
stack, PresetEditor (the whole configurator), both docks, keyboard composables. Story pages are
route-split (import.meta.glob, 88 lazy chunks); tiles lazy; hljs lazy by design (deferred-COLOR —
raw text paints first, four grammar chunks follow); capture.css out of the normal path; the landing
is 0-GL by construction (authored tile → frozen data-URI still → identity ladder).

Build truth (dist-demo, built 07-16 — one day pre-HEAD, indicative): eager = entry + 73
modulepreloads = 770.9 KB uncompressed JS + 317.9 KB render-blocking CSS. Composition: the
aurora-hero chunk alone is 277.7 KB — 36% of eager JS. FABLE-NEW: the aurora chain contains ZERO
dynamic imports — both engine paths ride eagerly, GLSL AND WGSL shader sets together (169.6 KB of
shader-string source across 14 files) plus ~204 KB of composable source; the WebGL/WebGPU fork is
resolved at runtime but paid for twice at boot. 285 JS chunks / ~3.4 MB total assets.

### SCRUTINY → UNION verdicts

| # | opus claim | verdict | evidence |
|---|-----------|---------|----------|
| 3.1 | eager-boot-graph-bloat (~771 KB / 74 chunks + 318 KB CSS before first paint; mount gated) | **RATIFIED — independently re-summed** | My sum: 770.9 KB across 74 eager scripts; index-C8_UmRWR.css 317.9 KB; AppShell imports + both gates verified at HEAD. The "blank white until ~1.1 MB" phrasing is structurally sound (mount IS gated) — the paint experience itself is live territory |
| 3.2 | content-visibility deferred paint (blank 19rem boxes below fold) | **RATIFIED mechanism** | SectionPreviewCard scoped CSS: `content-visibility: auto; contain: content; contain-intrinsic-size: auto 19rem` at HEAD; zero IntersectionObserver in demo/ |
| 3.2b | — "the /foundations landing renders 13 such cards" | **OPUS-WRONG (off-by-one)** | SectionLanding renders one card per MANIFEST story; foundations has 12 rows — the 13th .vue (paper-texture) is an embedded family member, never a card. The evidence method (find over .vue files) over-counted |
| 3.3 | persistent-webgl-shell-loop (fixed inset-0 Aurora, pause unreachable) | **RATIFIED statically; LIVE-DEFER the loop** | Aurora mounted `fixed inset-0 -z-10` behind `shellFieldActive` (AppShell:146-151); useAurora's pre-arm observer writes only "off-screen-io" — an always-intersecting fixed canvas cannot take the pause branch while the tab is visible. Whether the composite actually saturates is paint-side |
| 3.4 | svg-turbulence cost (13 animated WatercolorDots, numOctaves=5) | **RATIFIED statically** | WatercolorDot.vue:164-167 `feTurbulence … numOctaves="5"` + feDisplacementMap, per-instance filter; colors.vue:47 `rainbow = Array.from({ length: 13 })`. The COST is asserted from notoriety, not measurement — live-defer the magnitude |
| 3.5 | blocking-nav-no-feedback (chunk awaited, no skeleton) | **RATIFIED** | beforeResolve await verified; AppShell:59 + :192 comments state "no skeleton `aria-busy`" in so many words; keyed atomic swap at :202 |

Routing note: all three majors are already OWNED — BAND-PERF W1 (`BJ.W-BOOT-DIET`), W3
(`BJ.W-DEFERRED-PAINT`), W4 (`BJ.W-ROUTE-PENDING`) — the crosswalk's F01/F46/A17 landings. The
FABLE-NEW aurora-chain composition (36% single-chunk share; dual shader sets eager; no dynamic seam
anywhere in the chain) belongs INSIDE W-BOOT-DIET's spec as the named first cut.

---

## Unit 4 — the 2B adversarial 8-claim verification (each claim re-verified on disk, at HEAD)

The 2B artifact CONFIRMED all 8 round-1 headliners at the codex/bi-p-q-execution branch. Re-run
here at HEAD (master, post-7.0.0), by hand:

| # | claim | my verdict at HEAD | fresh evidence |
|---|-------|--------------------|----------------|
| 4.1 | chip-CSS orphan (glass-chip.css + glass-atom.css in no @import closure; dist ships 0 rules) | **RATIFIED — still live** | Both partials exist; no @import anywhere in src/styles; dist/glass-ui.css, dist/styles/{index,glass,components}.css each grep 0 for glass-chip; the standalone dist copy sits unimported; emitters live (chipVariants.ts:4/6/14/15, Chip.vue:122/125, badge/index.ts:27). Matches the 7.0.0 known-defect rider |
| 4.2 | literal-mirror test census (180 files / 1055 it / 248 describe; 5 named gates) | **RATIFIED, counts drifted** | 180 files EXACT; 1066 it/test + 243 describe at HEAD (2B: 1055/248 — branch drift, same magnitude, not a refutation); all five gates re-found with their exact literals: glass-subtlety:63-66 toBe(7/7/11/11), graded-backdrop:127 `--glass-halo-blur:\s*20px`, aurora-stage-affordance:101-102 swirl/0.45, springs-story:59-63 `--preview-start` literals, typography:15 the full 0.7861513777574233 ratio |
| 4.3 | `--story-article-w` undefined | **RATIFIED** | Re-proved in unit 2 (2.2) |
| 4.4 | hero-scale="4" hardcode | **RATIFIED** | Re-proved in unit 2 (2.3) |
| 4.5 | scheme-spring stale mirror (dock comment 0.68/ζ0.64 vs source 0.30/0.82; transient missing from table) | **RATIFIED — still live** | scheme-spring.css:31 comment unchanged; springPresets dock row response 0.3 / dampingFraction 0.82; transient in the type union + `--spring-transient` emitted at :101/:145 yet absent from the six-row mirror table; the other five rows DO match the source. Path drift only: springPresets.ts now at src/composables/motion/spring/ (2B cited motion/) |
| 4.6 | AppShell eager static imports + big preload graph | **RATIFIED** | Re-proved in unit 3 (3.1); 73 modulepreloads, 285 JS chunks, ~3.4 MB assets (2B: 3.3M — rounding) |
| 4.7 | corner-k tokens dead + cited gate absent | **RATIFIED, comment since REWRITTEN** | `--corner-k-soft/:sharp` present (radius.css:117-119), zero var() consumers in src/ + demo/, no squircle/gates script in scripts/ or package.json. FABLE-NEW nuance: the comment was rewritten post-2B and now ADMITS "no runtime var() consumer" — yet still asserts the tokens "ARE pinned by proof:squircle-language", a gate that does not exist in the shipped tree. The honesty defect persists in softened form: a live comment citing an absent authority as the reason not to sweep |
| 4.8 | Card ships gold+grain by default, zero consumer overrides | **RATIFIED** | withDefaults: grain: true, metal: "gold"; no `<Card` in demo/ sets either prop (only data-metal spans in glass-material.vue, not Card props). Owned by `BJ.W-REDUCE-CARD` (crosswalk F04) |

2B's own verdict quality: high. Its locational corrections (demo/ not src/demo; test dirs) were
right; nothing it CONFIRMED failed my re-verification; its two count-class numbers (it-blocks,
describes) drifted with the tree as counts do. No claim demoted.

---

## Roll-up

| tally | count | rows |
|-------|-------|------|
| RATIFIED | 23 | 1.1, 1.2, 1.3 · 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 · 3.1, 3.2, 3.3, 3.4, 3.5 · 4.1-4.8 |
| OPUS-WRONG | 2 | 2.1b (FamilyTabs "7 routes" — 5, wrong at its own snapshot) · 3.2b (foundations "13 cards" — 12) |
| FABLE-NEW | 5 | 1.2b (seed-omission mechanism inverted — the drop point is family→band drafting) · 2.4 rider (liquid-grid fix mooted by the REDUCTION W3 delete) · 3.x (aurora eager-chain composition: 277.7 KB / 36% of eager JS, dual GLSL+WGSL sets, zero dynamic seam) · 4.7 rider (radius comment rewritten yet still citing the absent gate as authority) · crosswalk "eight band specs" prose vs nine BAND files |

Both OPUS-WRONG rows are detail-grade inside otherwise-ratified claims; no finding of any of the
four artifacts collapses. The two live shipped defects re-confirmed at HEAD are the chip-CSS orphan
(4.1) and the scheme-spring stale mirror (4.5).

## ROUTING (proposed only — nothing here re-books itself)

1. chip-CSS orphan → needs a NAMED owning wave (a one-@import fix + a dist grep gate born RED);
   nearest home BAND-MATERIAL, else a REDUCTION sweep rider. It is a known-defect rider of the
   7.0.0 close with no wave text found naming it — the one genuine ownership gap this unit surfaced.
2. scheme-spring mirror truth-up (+ the transient row) → BAND-DOC-TRUTH; include the
   springPresets.ts path refresh (motion/spring/).
3. corner-k tokens → BAND-REDUCTION/BAND-GATES coordination: delete the pair + the false
   "pinned by" comment, or re-anchor a real gate; the comment must stop citing an absent proof.
4. Card gold+grain → already owned (`BJ.W-REDUCE-CARD`); ratify, no new wave.
5. `--story-article-w` + hero-scale hardcode + heading duplication + StoryBody retire-or-expand +
   the pageType axis → already BAND-STORY's (OPEN-D6, W1 taxonomy, W5 preview); fold the exact
   file:line evidence from this unit into those wave briefs; drop the liquid-grid half of 2.4.
6. Eager-boot diet → BAND-PERF W1 spec absorbs the aurora-chain composition facts (the 36% chunk,
   the dual shader sets, the no-dynamic-seam finding) as its named first cut; 3.2's first-row
   content-visibility exemption + 3.5's route-pending affordance stay W3/W4.
7. Crosswalk prose ("eight band specs") → one-line BAND-DOC-TRUTH rider.
8. LIVE-DEFER register (paint-only): the heading duplication as SEEN (2.5), the shell-loop
   saturation magnitude (3.3), the turbulence cost magnitude (3.4), the blank-white boot experience
   (3.1's phenomenology). All are structurally proven; only their severity is the browser's call.
