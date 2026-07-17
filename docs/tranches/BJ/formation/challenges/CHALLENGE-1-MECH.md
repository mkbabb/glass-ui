# CHALLENGE-1-MECH — the four mechanical bands, adversarially probed

**Seat:** Fable CHALLENGE (BJ formation). **Mode:** TRANCHE-DEVELOPMENT — no source touched; this
doc only. **Scope:** `BAND-GATES`, `BAND-DOC-TRUTH`, `BAND-COLOCATION`, `BAND-PERF`, `BAND-A11Y`
(assume faulty, prove otherwise). Cross-checked against `formation/REGISTRY.md`, `BAND-MATERIAL`,
`BAND-STORY`. Evidence is `file:line` verified on disk at HEAD (`package.json` version `7.0.0`,
untagged).

## Method & the born-RED spot-verification (charter: ≥6; I ran 30+)

Every born-RED probe I sampled fired exactly as the draft claims. The drafts are unusually
well-grounded — this challenge is mostly about **seams between bands**, not fabricated defects.

| Probe (band) | Claim | Disk result |
|---|---|---|
| GATES | `.github/workflows/*` runs `typecheck; test; build`, no `tests-visual\|playwright` | CONFIRMED — `ci.yml` runs exactly those three; grep for visual/playwright in workflows = 0 |
| GATES | `test` = `vitest run`; `verify:package` present | CONFIRMED `package.json:532,534` (draft said `:531`/`:534` — off-by-one on the first) |
| GATES | 6 zero-assert `tests-visual/*.spec.ts` | CONFIRMED — `grep -c 'expect('` = 0 on all six |
| GATES | `drawer/styles.css:379 blur(14px)`; `SortableList.vue:144 999px`; `segmented.css:169/306` raw rem | CONFIRMED verbatim |
| GATES | `glass-chip.css`+`glass-atom.css` exist, `@import`-ed by nobody; 0 rules in shipped `dist` | CONFIRMED — both files present, `grep @import … chip\|atom` = 0, `dist/glass-ui.css` has 0 `glass-chip` |
| GATES | `Card.vue` defaults `grain: true`, `metal: "gold"` | CONFIRMED |
| GATES/MATERIAL | `text-sm` ×118 + `text-xs` ×100 in `demo/` = 218 | CONFIRMED EXACTLY (118 + 100) |
| GATES | `bridges.css` has no `--text-*: initial` ramp reset | CONFIRMED — only `--text-small: var(--type-small)` + comment; no reset |
| DOC-TRUTH | `scheme-spring.css:31` dock row = `(0.68s, ζ=0.64) … WEIGHTY … monotone weighty settle` | CONFIRMED verbatim |
| DOC-TRUTH | `springPresets.ts` dock = response `0.3`, damping `0.82`, "A brisk liquid morph…" | CONFIRMED `:96-99` |
| DOC-TRUTH | `placement.css:93` is the lone `BI.W-` in `src/` | CONFIRMED — exactly 1 hit |
| DOC-TRUTH | `Tooltip.vue` has no `preset` prop | CONFIRMED — props are `open/defaultOpen/delayDuration/disabled` |
| DOC-TRUTH | `--corner-k-soft/-sharp` minted `:118-119`, self-citing comment `:112`; no code consumers | CONFIRMED |
| DOC-TRUTH | `tunable-anim.md:121` states `--glass-reveal-blur 4px`; no `4px` root default in `src/` | CONFIRMED |
| COLOCATION | 5 dead barrels exist; `src/index.ts` imports `./composables/{reactive,dom,glass}` directly (never `./composables`); `SortableList.vue:3` imports `./composables/useSortable` directly | CONFIRMED (`src/index.ts:162-164`; barrel bypassed) |
| COLOCATION | `sidebar/` = 9 files; `_shared/` = 21 entries; `wave/index.ts` "INTERNAL" header | CONFIRMED |
| PERF | `AppShell.vue:11/26/27/28` four top-level static imports; `defineAsyncComponent` = 0 | CONFIRMED |
| PERF | `router.ts` `beforeResolve` awaits every matched lazy chunk | CONFIRMED |
| PERF | `SectionPreviewCard.vue:63` `content-visibility:auto`, `:65` `contain-intrinsic-size:auto 19rem` | CONFIRMED |
| PERF | committed `dist-demo/index.html` = 73 `modulepreload` | CONFIRMED (dist-demo present) |
| A11Y | `AppShell.vue:174 <aside … category-navigation>` no label; `BottomDock.vue:88 <nav aria-label>` | CONFIRMED — the divergence is real |
| A11Y | `GlassDock.vue` role-less div `v-bind="$attrs"` (0 `role`); `SidebarDock.vue:114` stamps the dead `aria-label` | CONFIRMED |
| A11Y | `DockControl.vue:97` emits `aria-pressed` only when `active` truthy | CONFIRMED |
| A11Y | `DialogContent.vue:399` guard is `!sideSpringLive.value`; `:465` anchor `v-if="!isCenter"` | CONFIRMED — the anchor-gating subtlety is real |
| A11Y | placeholders on `--surface-tint-35` (input-pill, tags-input), `opacity:0.68` (field-control) | CONFIRMED; and after repoint, `--surface-tint-35` has only def+dark-arm+bridge left (clean-break claim verified) |
| GATES | `substrate-paints-color.spec.ts` exists; its own comment documents SwiftShader-degrade + silent-SKIP | CONFIRMED (`:14-18`) |
| GATES | contract-head `Object.keys(SliderSurface).toEqual(["Slider"])` is covered by `public-surface.spec.ts:514-519` per-subpath `exactSubpathRuntimeSurfaces` lock | CONFIRMED — the "drop heads, keep bodies" reduction is coverage-safe |

Failure-mode sweep result: **no vacuous convergence, no spec-cites-itself circularity in the
retained gates, no legacy aliases, no masked fallbacks** in any of the five bands. The bands
actively hunt these (BAND-GATES kills the `springProjection` self-mirror and the `Object.keys`
heads *because* they are circular/redundant; BAND-COLOCATION refuses to dress refactor-safety gates
as born-RED; BAND-PERF *downgrades* round-1's overstated "13 live feTurbulence" to "13 one-time
mount rasters"; BAND-A11Y encodes an over-application GUARD so the wrong fix cannot land green).
The defects are almost entirely **cross-band ownership seams** — where two drafts edit the same
file / gate the same invariant / cite a sibling wave that isn't drafted.

---

## FINDING 1 (load-bearing) — `design-idioms.md` §3/§7 is DOUBLE-OWNED by DOC-TRUTH W2 and COLOCATION Precept F

Both drafts claim to rewrite the SAME precept sections:

- `BAND-DOC-TRUTH.md:57` — "`design-idioms.md` — **owned entirely by Wave 2**
  (BJ.W-IDIOMS-COLOCATION-REWRITE)"; Wave 2 (`:113-196`) rewrites §3 home-map (I1-I6) + §7 doctrine.
- `BAND-COLOCATION.md:158-176` — **Precept F** rewrites `design-idioms` §3 + §7, and its own
  `OPEN` at `:172` states "ONE wave must own the §3/§7 edit or the two bands **collide on the same
  file** … RECOMMENDATION: own it HERE."

DOC-TRUTH asserts exclusive ownership *without acknowledging the H overlap*; COLOCATION flags the
collision and recommends it owns. This is a direct contradiction, and COLOCATION is correct on the
merits: **COLOCATION's Carve E moves two of the very §3 rows** — `index.css:186`
`_shared/feedback-tone.css → _shared/feedback/feedback-tone.css` and `:203`
`_shared/menu.css → _shared/menu/menu.css` (`BAND-COLOCATION.md:144-146`). If DOC-TRUTH W2 rewrites
the §3 home-map to the *current* `_shared/feedback-tone.css` path (its I1 row), COLOCATION's carve
in the **same tranche** immediately re-drifts the doc — the exact re-drift both bands exist to kill.
The §3/§7 rewrite MUST land co-located with the moves that change the truth.

**Verdict: AMEND BAND-DOC-TRUTH.** Retire Wave 2's §3/§7 rewrite; cede the whole
`BJ.W-IDIOMS-COLOCATION-REWRITE` to **BAND-COLOCATION Precept F** (single owner, post-carve).
BAND-DOC-TRUTH keeps Wave 1 only (the enumerated non-idioms truth-up) and adds a one-line citation
"§3/§7 owned by BAND-COLOCATION Wave 1 Precept F." BAND-COLOCATION is SOUND on this point.
(This also cleanly resolves DOC-TRUTH's OPEN-4/5/6, which are §3/§7 questions that belong to the
band doing the moves.)

## FINDING 2 (load-bearing) — BAND-PERF W3 and BAND-STORY W5 both EDIT `SectionPreviewCard.vue` and both GATE the above-fold exemption

The charter names this seam. It is real:

- `BAND-STORY.md:33` — Wave 5 (`BJ.W-PREVIEW-CARD`) owns `SectionPreviewCard.vue` **exclusively**,
  including "above-fold content-visibility exemption (layout half here)"; its gate **G-PRV-3**
  (`:387`) asserts the exemption on `SectionPreviewCard.vue:63`.
- `BAND-PERF.md:301-302` — Wave 3 lists `SectionPreviewCard.vue` (above-fold exemption) AND `:65`
  (intrinsic-size retune) as its own EXECUTION edits, and authors a **static** `deferred-paint.test.ts`
  above-fold arm on the same `:63` (`:306,313`).

So the identical edit (drop `content-visibility:auto` above-fold on `SectionPreviewCard.vue:63`) is
claimed by two waves, gated twice, and BAND-STORY's own "one owning wave per file" discipline
(`BAND-STORY.md:24-25`) is violated. Worse, BAND-STORY W5 **rewrites** `SectionPreviewCard.vue` for
masonry + live miniatures — a rewrite that changes card height and therefore invalidates BAND-PERF's
`:65` `19rem` intrinsic-size retune if PERF lands first.

The two bands *tried* to split (STORY: "family E owns the perf trace gate"; PERF: "NOT the
preview-card redesign … visual half"), but the split line is inconsistent: STORY assigns the
exemption EDIT to itself and the *trace* gate to E, while PERF assigns the exemption EDIT **and a
static source gate** to itself.

**Verdict: AMEND BAND-PERF W3.** PERF W3 cedes the `SectionPreviewCard.vue` above-fold **edit** and
its **static** above-fold source gate to BAND-STORY W5 (which rewrites the file wholesale). PERF W3
retains: (a) the boot-diet as the real cure (W1), (b) the intrinsic-size number handed to STORY to
apply *after* the masonry rewrite settles the true height, and (c) the **live-trace deferred-paint
gate** (the "perf trace gate" STORY already delegates to E). Net: one wave edits the file, one gate
asserts the exemption, the intrinsic-size retune rides the rewrite that determines the height.
(BAND-STORY W5 is out of my challenge scope but the amendment lands on the in-scope PERF side.)

## FINDING 3 (load-bearing) — BAND-GATES W4 hands the type codemod to "the Family F typography wave," which is NOT drafted

`BAND-GATES.md:351,354` route "the 251-site `text-sm`/`text-xs` codemod + the coupled default-ramp
reset flip + its paint π" to "**the Family F typography wave**," and OPEN-10 says "the two waves
MUST land in the same tranche cut so the gate is never RED-at-tag." But BAND-MATERIAL (Family F) is
scoped to five waves that **do not include** the codemod — and its own `OPEN-B` (`BAND-MATERIAL.md:538-546`)
flags exactly this: "a genuine unassigned obligation … no drafted wave owns the codemod … Fable
must rule." So BAND-GATES W4's coordination handoff points at a wave that does not exist.

This is not a fabricated defect (both bands surface it honestly), but it is a **dangling
cross-band reference on a RED-at-tag gate**: W4's ramp-reset gate is born-RED and stays RED until an
un-owned codemod lands. Also note a scope-clarity nit: W4 uses "218" (demo-only, verified exact)
for the born-RED probe and "251-site" (all sites incl. `src`, the registry figure `REGISTRY.md:236`)
for the coupled flip without stating the two scopes differ — a reader reads it as an inconsistency.

**Verdict: RULING-NEEDED** (the codemod owner is a genuine lead/user assignment: a 6th BAND-MATERIAL
wave `BJ.W-TYPE-CODEMOD`, vs BAND-STORY where the 218 demo sites concentrate, vs BAND-GATES W4
all-in). Until assigned, **AMEND BAND-GATES W4** to (a) not name a non-existent wave as the handoff
target, (b) state the 218-vs-251 scope split explicitly, and (c) hold the ramp-reset FLIP out of any
cut whose codemod owner is unassigned (author the gate born-RED, but do not let it reach the tag RED).

## FINDING 4 — DOC-TRUTH T6 and BAND-MATERIAL W1(B) both edit `radius.css` corner-k

`BAND-DOC-TRUTH.md:50` (T6) corrects the `radius.css:113-118` prose that cites the abrogated
`proof:squircle-language`; `BAND-MATERIAL.md:93-97` (W1-B) **deletes** `--corner-k-soft/-sharp`
(`:118-119`) *and* the stale-gate comment. If MATERIAL deletes the comment, T6's prose correction is
moot (nothing left to correct). DOC-TRUTH T6 half-acknowledges this ("delete … may belong to family
F … cross-ref F") but still lists T6 as an in-scope target with gate G-T6.

**Verdict: AMEND BAND-DOC-TRUTH T6** — defer to BAND-MATERIAL W1's delete as the single owner;
T6 corrects the prose ONLY if F declines the delete (make T6 explicitly conditional, not a
standing born-RED target). Minor; the two bands do not currently line up on who touches `radius.css`.

## FINDING 5 — BAND-GATES prop-granularity gate (W3-C) presumes a Family-C design verdict it does not own

`BAND-GATES.md:232-245` authors `gate:prop-granularity-dead-config` **born-RED** against
`Card.vue` `grain:true`/`metal:"gold"` (verified: 0 overrides in demo). But the band itself says
"the design question (should Card default to gold+grain at all?) is **Family C's ruling**, not this
gate's" (`:245`). A standing Family-A hygiene gate that reds on a default whose defect-status is
still contested is not honestly "born-RED against a violation" — if Family C rules gold+grain is the
intended Card identity, the gate must be **removed**, not flipped green. The gate encodes an unmade
verdict.

**Verdict: AMEND (adopt the band's own OPEN-8 alternative).** Fold prop-granularity into Family C's
overfitting audit / surface purge as a **one-shot audit line**, not a standing Family-A gate, until
the Card default is ruled. token-hygiene (W3-A) and orphan-CSS-partial (W3-B) are unambiguous
violations and stay standing gates; prop-granularity is not in the same class.

---

## Per-band verdicts

### BAND-GATES — **AMEND** (core SOUND; four amendments)

The census is real (I measured ~1600 raw `it/test(` matches across 358 files — an over-count from
`test(` false-positives, but the same order of magnitude as the drafts' 1032/1055; either way ~20×
the 40-60 mandate). The one sound pixel gate (`substrate-paints-color.spec.ts`) genuinely runs in no
workflow. The KEEP-list is verifiable (`public-surface.spec.ts:514-519` really is the per-subpath
lock that makes the contract `Object.keys` heads redundant — the reduction is coverage-safe, NOT an
elegant-reduction trap). Self-test bites are specified for every new gate — no gate-that-cannot-fail.
Amendments: FINDING-3 (W4 dangling reference), FINDING-5 (W3-C prop-granularity fold), OPEN-5
(below), and the graded-backdrop.test.ts disposition (below). Minor: the 6 zero-assert files are
Playwright specs (they never enter the vitest census the "1055→45-55" collapse targets) — the band
conflates two suites slightly; both actions are still correct.

### BAND-DOC-TRUTH — **AMEND** (Wave 1 SOUND; Wave 2 collides)

Wave 1's 8-target sweep is exact and closed — every T-row born-RED probe fired (T1 dock-mirror, T3
BI.W lone hit, T4 uniformBridge, T6 corner-k, T7 MetricBadge, T8 Tooltip-preset). The comment-only
byte-diff guard is honest. Amendments: FINDING-1 (Wave 2 §3/§7 cede to COLOCATION), FINDING-4 (T6
defer to MATERIAL). With those, Wave 1 stands as the enumerated truth-up it claims to be.

### BAND-COLOCATION — **SOUND** (one RULING it already surfaces)

The strongest of the five. Honest gate posture ("almost every gate is refactor-safety, GREEN before
and after; do not dress a refactor gate as born-RED" — `:20-26`), the ONE born-RED (G-BARREL-REACH)
is real (5 barrels verified dead, importers bypass them), the π obligation is correctly INVERTED to a
byte-identity/null-DELTA proof, and it correctly claims §3/§7 ownership (FINDING-1). Wave 2 (the
`./sidebar` drop, the band's one public-API break) is appropriately gated on BOTH a user ruling on
the 7.0.0 window AND a family-B sibling-import census (the header-ribbon undeclared-consumer lesson,
`:284-288`) — exactly the caution the consumer-truth family demands. No amendment needed; the two
OPENs it raises (7.0.0 window, family-C cluster overlap) are legitimately for the lead/user.

### BAND-PERF — **AMEND** (core SOUND; W3 seam)

Boot-diet mechanism verified (74 eager JS files / 73 modulepreloads, four top-level static imports,
`beforeResolve` blocking await — all on disk). The static/live-trace split is disciplined ("no metric
claimed RED without a trace on disk" — honors `live_verify_capture`). Notably self-correcting: W3
downgrades round-1's "13 live feTurbulence" to "13 one-time mount rasters" after reading the
component's once-and-cache doc — adversarial honesty, not inflation. Amendment: FINDING-2 (W3
preview-card edit + static gate cede to STORY W5). Minor: OPEN-P0's build-ceiling arm should build
`dist-demo/` in the test job, not read a committed snapshot that goes stale silently.

### BAND-A11Y — **SOUND**

Every probe reads the RENDERED DOM (honors `glass_ui_binding_verification` — a silent-no-op aria
binding is caught only this way). The two load-bearing subtleties are verified CORRECT and are
genuine improvements over the audit's one-line proposals: (B) the naive `? "true":"false"` fix
over-applies because nav controls would gain `aria-pressed="false"` — I verified `SidebarDock.vue`
category chips and `BottomDock.vue` story tabs use `:aria-current`, **not** `active`, so the
tri-state fix (`active?: boolean` = undefined ⇒ no attr) is correct and the over-application GUARD
probe encodes it so the wrong fix can't land green; (C) extending the focus-return guard alone is
insufficient because `DialogContent.vue:465` gates the anchor `v-if="!isCenter"` (verified), so the
center path also needs the anchor un-gated. The reduced-motion KEEP is correctly carved as a
protected non-goal. No amendment. The rulings it raises (E1 dock keyboard model, D1 token delete) are
correctly routed, not smuggled.

---

## OPEN-5 (BAND-GATES W2) — SwiftShader in CI: the substantive analysis

**The question (`BAND-GATES.md:170-180`):** does SwiftShader paint a non-black aurora inside a
standard GitHub `ubuntu` runner, so the pixel floor has real teeth in CI — or does it SKIP / paint
black, making the wiring theater? The spec's own comment (`substrate-paints-color.spec.ts:14-18`,
verified) already documents the degrade + the "SKIPs befitting-silent when no browser binary is
installed" failure mode.

**What comparable projects do / the technical reality:**

1. **SwiftShader renders WebGL correctly, non-black.** It is Google's software rasterizer and the
   standard headless-Chrome GL fallback; it is *designed* to produce correct pixels without a GPU.
   For a coarse `maxChannel > 0` non-black + coverage-band floor (which is what this gate is — NOT a
   hue/chroma snapshot), SwiftShader output is reliable. The draft is right to wire **only** the
   coarse floors and defer per-preset hue/chroma parity to Family G — parity gates are exactly the
   ones that break across GPU↔SwiftShader rounding; floors do not.
2. **The real risk is the WebGPU/Vulkan-on-SwiftShader path, not WebGL.** The config passes
   `--enable-unsafe-swiftshader --enable-features=Vulkan`, i.e. it wants the WebGPU/Dawn-on-Vulkan
   path. That path is far more fragile and slow on SwiftShader than WebGL; if the aurora's WebGPU
   primary fails to initialize on the runner it either falls back to WebGL (fine) or the context is
   unavailable and the driver **SKIPs** — a GREEN-because-skipped result, the precise
   `gate:unwired-gate-non-execution` disease this band exists to cure.
3. **Industry options for real-GPU CI** are: (a) self-hosted GPU runner, (b) GPU cloud runners,
   (c) SwiftShader for a coarse smoke floor + a nightly/pre-tag real-GPU parity pass, (d) Mesa
   `llvmpipe`. For a *non-black smoke floor*, (c) is the standard and sufficient choice.

**Verdict: AMEND (not a user RULING).** This is an empirical/engineering question the execution wave
settles with one CI probe, not a user preference. Amend W2 to:
- **Fail-on-SKIP.** The job must treat "no GL context / test SKIPped / no browser binary" as **RED**,
  not pass. Assert a context was obtained AND it painted non-black. (Without this, SwiftShader's
  silent-skip re-creates the very unwired-gate defect.)
- **Force the deterministic path** the CI runner will actually execute (prefer the WebGL path for the
  floor, or explicitly assert which path ran) rather than relying on WebGPU-on-SwiftShader.
- **Keep it coarse** (non-black + coverage floor only — already scoped correctly).
- The draft's empirical gate ("MUST NOT claim CI enforcement until a real CI run shows the planted
  black-render bite goes RED on the target runner") is retained as the acceptance.

The **only** part that could escalate to a user ruling: IF the empirical probe shows the coarse floor
cannot paint non-black on the ubuntu runner even on the WebGL path, the fallback choice is
self-hosted GPU runner (infra cost) vs keeping the floor as the pre-tag `release.sh` gate **with a
captured artefact** (not a silent skip). The draft names both; that contingent infra-vs-pretag call
is the lone escalation, and only if the probe fails.

---

## Load-bearing OPEN markers — rulings

| OPEN | Band | Verdict | Resolution |
|---|---|---|---|
| §3/§7 single-owner (DOC-TRUTH W2 ↔ COLO Precept F / COLO OPEN-4) | DOC-TRUTH / COLO | AMEND | Cede to BAND-COLOCATION Wave 1 (FINDING-1) |
| Preview-card split (PERF W3 ↔ STORY W5) | PERF | AMEND | PERF cedes the edit + static gate; keeps boot-diet + trace gate (FINDING-2) |
| Type-codemod owner (GATES W4 OPEN-10 ↔ MATERIAL OPEN-B) | GATES/MATERIAL | RULING-NEEDED | Assign the 251-site codemod owner (6th MATERIAL wave vs STORY vs GATES-W4 all-in) — user/lead (FINDING-3) |
| `./sidebar` drop rides 7.0.0 vs 8.0.0 (COLO Wave 2) | COLO | RULING-NEEDED | Is the 7.0.0 export surface still open for a clean-break drop, or defer to 8.0.0? — user (the drafter cannot settle the window) |
| Dock keyboard model (A11Y OPEN-E1) | A11Y | RULING-NEEDED | Ruling A (toolbar/roving-tabindex → Family G) vs Ruling B (nav-link stance + comment truth-up → Family J) — design decision; determines owning family |
| OPEN-5 SwiftShader (GATES W2) | GATES | AMEND | Fail-on-skip + force deterministic path + keep coarse; infra-vs-pretag only if the empirical probe fails (above) |
| prop-granularity form (GATES OPEN-8) | GATES | AMEND | Fold into Family C overfitting audit, not a standing gate (FINDING-5) |
| corner-k T6 ↔ MATERIAL W1 (DOC-TRUTH OPEN-1) | DOC-TRUTH | AMEND | T6 conditional on F declining the delete (FINDING-4) |
| springProjection guard (GATES OPEN-2) | GATES | SOUND (lean) | Drop the byte-equality; the honest guard is a "generated files up-to-date" CI check (regen + git-diff-clean), not a fabricated physical invariant |
| canon-doc.mjs (GATES OPEN-3) | GATES | SOUND | Retire (orphan-CSS-partial covers the green-over-stub risk) |
| collapse count-guard (GATES OPEN-4) | GATES | SOUND (lean ledger-diff) | A gate-that-counts-gates is the meta-machinery the band sheds; prefer the formation-ledger diff |
| shell-field governance (PERF OPEN-P5) | PERF | SOUND (lean P5a) | Occlusion/idle pause over static-wash — the static wash drops the ambient live field on dense routes, in tension with `breath_of_life`; make the downgrade an explicit reviewed π only if P5a proves infeasible |
| shared feTurbulence (PERF OPEN-P9) | PERF | SOUND (lean drop) | Minor win; a shared filter id breaks the component's zero-plumbing property — gate only the duplication count, keep the once-and-cache path |
| surface-tint-35 delete (A11Y OPEN-D1) | A11Y | SOUND | Delete outright — verified only def+dark-arm+bridge remain after repoint; clean-break per no-backwards-compat |

## Non-load-bearing OPENs (dispositions, not escalations)

GATES OPEN-1 (vitest-fs vs `gates.mjs`) → **SOUND, adopt vitest-fs** (parsimony; zero CI wiring —
the tree genuinely has no `gates.mjs`/`proof-*.mjs`). GATES OPEN-6/7 (allowlists) → execution
detail. COLO OPEN-1/2/3 (dir shapes, `axes.ts` keep) → SOUND leans as drafted (`axes.ts` is the
`/axes` public entry — keep at `_shared/` root, correct). A11Y OPEN-B1/C1/D2/A1 → SOUND as drafted.
PERF OPEN-P1/P2/P3/P4/P8/P10 → execution details with sensible draft leans.

---

## Bottom line

The four (five) mechanical bands are **not faulty in their defect claims** — 30+ born-RED probes
fired on disk with zero misses, and the bands police their own failure modes better than most.
The corrections are **cross-band seams**: three files/sections are double-owned (§3/§7,
`SectionPreviewCard.vue`, `radius.css` corner-k), one gate hands off to a wave that isn't drafted
(the type codemod), and one gate (prop-granularity) and one CI wiring (SwiftShader) need their
honesty tightened. None of these is a REJECT; all resolve by reassigning an owner or tightening a
gate. Three items are true user/lead rulings (codemod owner, 7.0.0 export window, dock keyboard
model).
