# BG.W-PAGE-COMPONENT-AUDIT (17.6) — COMPLETION AUDIT (audit triumvirate, 2026-07-10)

**Verdict: PAINT FAIL — fix owed, NOT a false-DONE. The wave stays open; the fix is a small, well-localized demo-source edit in `demo/stories/focal.ts`.**

This is the written record of the 17.6 dual-engine paint judge that ran, FAILED, and committed its evidence at `654e5d2e` before the workflow died. The judge's cursor flip (`17.6 → PENDING`) is HONEST — the paint failed and the fix is owed. This audit re-derives the root cause (which the DELTA observed but did not NAME), confirms/falsifies each DELTA claim against the tree, records the completion-integrity verdict (including the one standing close-blocker), and specs the fix.

Every claim below was verified against the working tree on 2026-07-10. Line numbers are HEAD (`tranche/BG`).

---

## 1. What failed

The judge captured 44/44 PNGs (11 routes × {Chromium, WebKit} × {light, dark}) over the BUILT `:5200` bytes, dual-engine (Chrome ANGLE-Metal Apple M5 Max + system WebKit/Apple GPU), both modes, via the C18 `?capture=<route>&mode=<m>` + `data-capture-ready` harness. All 44 resolve on disk, are dimension-correct (Chromium 1440×900, WebKit 2880×1800 @2x), carry a decoded in-pixel engine badge, and are non-blank (body σ 15–61).

The pass-bar is a per-category convergence read: each enrolled route's composited FIELD region must read WARM (dominant warm hue, meanChroma above the warm-cream floor ≈0.018–0.020). **8/11 routes converged; 3 did not.** The three failures are the Pass-E anchors:

| route | chr/L | chr/D | wk/L | wk/D | dominant |
|---|---|---|---|---|---|
| `/navigation/tabs` | 0.0053 | 0.0060 | 0.0067 | 0.0084 | neutral (3/4) |
| `/compositions/hero` | 0.0034 | 0.0036 | 0.0035 | 0.0038 | neutral (4/4, warmFraction=0 in 3) |
| `/motion/scroll` | 0.0043 | 0.0037 | 0.0051 | 0.0041 | neutral (4/4) |

(meanChroma; source `docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT-paint/validate-out.json`, re-read 2026-07-10.) The converged control `/forms/inputs` reads 0.0217–0.0315 warm for contrast.

A second requirement is also unmet: the **gesture FRAME-SERIES** (route-page-build ≥8 entrance frames, shell-vh-morph both legs, drawer-snap-drag, dock facilities, fps/gap histograms). The settled-still C18 harness reads at `data-capture-ready` with `getAnimations().running = 0`, so it structurally cannot produce a frame-series. This is a paint-INSTRUMENT gap, not a source defect (§3, THIRD fix).

---

## 2. Re-derived root cause

The DELTA's observations are all accurate but stop at symptom level ("0 GL canvases", "restore the warm field"). The precise mechanism — a genuine implementation defect in `demo/stories/focal.ts` — is:

**The demo's perceptible warm-cream field is NOT the base page — it is the global shell aurora.** `--background = var(--neutral-0) = hsl(40 30% 98%)` (`src/styles/tokens/color-radius.css:40,57`); at L98 that is gamut-bound to ≈0.005 OKLab chroma — imperceptible, reads NEUTRAL. The warm chroma every converged route shows comes from the shell `<Aurora>` in `AppShell.vue:320-328` (`warmFieldHue` per-category hue, warm-projected into `[25,95]`, `opacity-ceiling: 0.5`), mounted **IFF `shellFieldActive`**.

`shellFieldActive` is `!to.meta.focal` (`router.ts:107`), and `focal` is `isFocalRoute(routeId, background)` (`router.ts:74`). The predicate (`focal.ts:62-68`):

```
focal = (kind !== undefined && GL_BG_KINDS.has(kind)) || SELF_STAGES_GL.has(routeId)
```

`GL_BG_KINDS = {aurora, constellation, fourier, liquid-grid}` (`focal.ts:25-30`). The per-category defaults assign `navigation → "aurora"` and `motion → "constellation"` (`manifest.ts:202,206`), resolved onto every keyless row via `background = opts?.background ?? CATEGORY_DEFAULT_BG[cat]` (`manifest.ts:470`). So `/navigation/tabs` (`manifest.ts:947-952`, no explicit background → inherits `aurora`) and `/motion/scroll` (`manifest.ts:1215-1223`, explicit `constellation`) are marked FOCAL by their GL background-kind — and the shell aurora stands down.

**But the predicate assumes a GL background-kind implies the page mounts that field. It does not.** The field is mounted by `StoryHero.vue` (`:303-336`, keyed on kind), and `StoryPage.vue` mounts `StoryHero` **ONLY on `variant === "hero"`** (`:217`, the `v-else`); `variant = story.hero ? "hero" : "page"` (`:70-72`). A page-variant story renders `header` + `story-cels` (`:158`, `:203-210`) and NEVER mounts `StoryHero`. `/navigation/tabs` and `/motion/scroll` carry NO `hero` flag → they are page-variant → StoryHero is never mounted → their promised GL field never instantiates.

The result: the focal flag REMOVES the warm shell aurora, and the page NEVER mounts the GL field the flag assumed. **Zero GL contexts. The probe falls back to the near-white (light) / near-black (dark) neutral base → warm-identity FAIL.** This is the "0 GL canvases mounted" the DELTA observed, mechanistically explained.

It reproduces in dev and in the built dist; the captures correctly show fully-rendered near-white content pages. It is a real systemic defect — it silently strips the warm field from the ENTIRE navigation and motion content bands (every page-variant story in those two categories), not just the two sampled routes.

**`/compositions/hero` is a DIFFERENT mechanism.** It IS a hero (`manifest.ts:1245-1254`: `background: "constellation", hero: true`), so `StoryHero` mounts the constellation full-bleed correctly-as-designed. But a Constellation is achromatic grey line-art over the near-white (light) / near-black (dark) base → warmFraction=0 in light, and a near-black dead void in dark (the "charcoal slab on a dead void" `CLAUDE.md §W-DARK-MATERIAL` forbids). The field mounts correctly; it simply carries no warm-cream identity.

---

## 3. DELTA claims — CONFIRMED / FALSIFIED / STALE

The DELTA under audit is `docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT-DELTA.md` (the NON-AUTHORING PAINT JUDGE block, 2026-07-10). Its observations are all accurate — this is a correct-but-shallow DELTA, unlike the concentric DELTA whose content-visibility root cause was empirically wrong.

| # | DELTA claim | verdict | evidence |
|---|---|---|---|
| C1 | 44/44 PNGs resolve, dimension-correct, badge-decoded, body σ 15–61 | **CONFIRMED** | `git show --stat 654e5d2e` lists 44 committed `*-desktop-full.png`; `validate-out.json` perCapture carries `badgeOk/nonBlank`, σ 15–61 |
| C2 | 3/11 routes NOT converged (nav/tabs, comp/hero, motion/scroll) read neutral, chroma 0.003–0.008 vs warm floor | **CONFIRMED** | `validate-out.json` re-read 2026-07-10: nav/tabs 0.0053/0.0060/0.0067/0.0084, comp/hero 0.0034–0.0038, motion/scroll 0.0037–0.0051; forms/inputs 0.0217–0.0315 warm |
| C3 | nav/tabs + motion/scroll mount 0 GL canvases though BA.W-STAGE assigns nav→aurora / motion→constellation | **CONFIRMED** | full code path re-derived §2 (`focal.ts:67` → `router.ts:107` → `AppShell.vue:321` suppress; `StoryPage.vue:217` StoryHero only on hero; `manifest.ts:947,1215` page-variant) |
| C4 | comp/hero LIGHT warmFraction=0 (grey constellation over near-white), DARK a near-black dead void | **CONFIRMED** | `validate-out.json` comp/hero chr/L warmFraction=0 chroma=0.0034; dark meanL 0.27–0.30; a genuine hero mounting an achromatic constellation (`manifest.ts:1245-1254`), NOT a missing mount |
| C5 | the 8 warm routes' dark meanL<0.30 is NOT a defect → 8/11 converged | **CONFIRMED** | reasonable-criterion judgment: `warmIdentityVerdict` carries no meanL floor; all 8 dark captures read `domFamily=warm`, warmFraction≈1.0. NOTE the machine `validate.mjs` band read (meanL 0.30..0.99) reports 1/11; the human warm-identity read gives 8/11 — both agree the 3 focal routes fail on CHROMA, not the meanL band |
| C6 | judge-only wave; no src/demo/styles/scripts edited | **CONFIRMED** | `git show --stat 654e5d2e --name-only` filtered of `docs/` paths = zero files; the commit is 44 PNGs + DELTA + `chrome-cap.mjs`/`validate.mjs` + `EXECUTION-PROGRESS.md`, docs-only |
| C7 | the DELTA's root-cause narrative ("restore the warm field", "0 GL canvases") | **CONFIRMED but SHALLOW** | the observations are accurate; the DELTA does NOT name the `focal.ts isFocalRoute` mechanism (focal-suppress + page-variant-no-StoryHero) re-derived here. The one framing to correct: the DELTA's mustFix phrase "the aurora is not compositing" reads as an Aurora RENDER failure — the truth is the aurora is deliberately SUPPRESSED by the focal predicate and never re-mounted, so ZERO auroras are ever instantiated (nothing fails to composite; nothing is asked to) |

**FALSIFIED: none.** **STALE: none** (the DELTA and captures are the current HEAD read; `validate-out.json` re-read 2026-07-10 matches verbatim).

The one correction owed is C7's framing, recorded in the DELTA reconcile block (`BG.W-PAGE-COMPONENT-AUDIT-DELTA.md`, POST-DELTA UPDATE 2026-07-10) so no future agent chases an Aurora-render bug.

---

## 4. Completion-integrity verdict

**The dead run (`654e5d2e`) committed a COMPLETE unit and left NOTHING half-landed.** It is the 17.6 non-authoring paint judge: 44 PNGs + the DELTA + `validate.mjs`/`chrome-cap.mjs` + an honest cursor flip `17.6 → PENDING`. It touched ONLY `docs/` (`git show --stat`: no `src/demo/styles/scripts`). The 17.6 cursor row (`EXECUTION-PROGRESS.md:439`) honestly reads `PENDING (paint FAIL — fix owed …)` and matches the DELTA verbatim. Nothing about 17.6 is a false-DONE.

Checks run 2026-07-10:
- `npm run typecheck` → EXIT 0 clean (rules out the source-red class).
- Gates cited by recently-flipped-DONE waves pass EXIT 0: `proof:warm-identity`, `proof:demo`, `proof:concentric`, `proof:viz-dotflow`, `proof:handmark-audit`, `proof:glass`, `proof:route-enter-visible`, `proof:dark-material`, `proof:no-gray`, `proof:viz-papergrid`.
- Working-tree changes are paint-artifact detritus (a 2026-07-06 PAINT-PASS-LOG append + re-captured CHASSIS-ADOPT PNGs + throwaway capture scripts / `.chrome-profile` dirs / logs), not half-landed source.

### 4.1 The ONE standing close-blocker — `proof:meta` (12 fable-arm-present violations)

`proof:meta` (`scripts/proof-meta.mjs`; registered `gates.mjs:1777` with **tags `["local","ci"]`** — a genuine CI close-gate) **EXITS 1** with 12 `fable-arm-present` violations (verified by run, 2026-07-10). Twelve §1 VISUAL waves lack the mandatory `fableArm / designSyncSurface` plan cell in the EXECUTION-PROGRESS.md section-1 master table:

- **9 marked DONE:** `BG.W-CORNER-ALIAS-KILL`, `BG.W-DARK-READABILITY-REPAIR`, `BG.W-DOCK-RAIL-REINVENT`, `BG.W-DRAWER-PAINT-BIND`, `BG.W-DEMO-IA-REDESIGN`, `BG.W-SECTION-TYPEWRITER-FADEUP`, `BG.W-BLOB-AFFECT-INTERACT`, `BG.W-DOTMATRIX-STABLE`, `BG.W-FOURIER-BEAUTY`.
- **3 PENDING:** `BG.W-COLORS-WATERCOLOR-SWATCH`, `BG.W-PRESET-RIBBON-TOP`, `BG.W-CONCENTRIC-LEVELCURVES`.

**Nuance (load-bearing — this is NOT a per-wave false-DONE):** each of the 9 DONE waves passes its OWN cited functional gate (`proof:glass`, `proof:demo`, `proof:viz-*`, etc., all verified GREEN). The red is a plan-RECORDING completeness gap on a shared GOVERNING close-gate — the `fable / designSync` cell is empty, not the artifact. It is a PRE-EXISTING drift, NOT caused by the `654e5d2e` death: commit `a900a71f` explicitly recorded "2 residual fable-arm-present reds PRE-EXISTING on HEAD, 0 new", and the count grew 2 → 12 as the USER-07-05 defect waves were appended un-armed.

**Why it fits "a DONE row whose governing gate does not hold on disk":** `proof:meta` is CI-tagged and its own note declares "the close cannot proceed" while it reds. The F8 commit series reads "proof:meta GREEN" — those are CLAUSE-scoped (each F8 wave appends+greens its OWN clause; `proof:meta` is a growing multi-clause runner), a house convention that is misleading if read as whole-gate green. **It IS a genuine standing close-blocker the tranche must clear before close.** The fix is to fill the 12 waves' `fableArm / designSyncSurface` cells (owned by the plan/ledger arm, NOT this wave's 17.6 fix); it is orthogonal to the 17.6 paint fix.

**Verdict:** the dead run is clean and honest. There is one pre-existing standing close-blocker (`proof:meta`) unrelated to 17.6, a plan-recording gap, not a source/artifact defect.

---

## 5. The 17.6 fix spec

17.6 is paint-gated. Do NOT retire it — the `focal.ts` bug is a real systemic demo defect and the fix is small and well-localized. Three fixes:

### FIX A (PRIMARY) — `/navigation/tabs` + `/motion/scroll`: thread the hero flag through the focal predicate

The focal predicate marks a GL-background route focal even when the page never mounts its GL field. Make a GL-background route focal ONLY if it actually mounts that field — i.e. it is a HERO page (`StoryHero` renders the field only on `variant === "hero"`).

- **File:** `demo/stories/focal.ts` — `isFocalRoute`. Add a hero-page parameter and gate the GL-kind arm on it:

  ```
  focal = (kind !== undefined && GL_BG_KINDS.has(kind) && isHeroPage) || SELF_STAGES_GL.has(routeId)
  ```

  `SELF_STAGES_GL` stays unconditional (those routes mount their own GL outside the `background` channel).
- **File:** `demo/router.ts` — the two `isFocalRoute` call sites (`:52` the section landing, `:74` the story route) pass the hero flag. The story site threads `story.hero`; the landing site threads its section-landing background's hero-ness (a landing IS a hero-scale surface, so it stays focal when its background is GL — confirm against `SectionLanding`/`category.landing`).

**Effect:** `/navigation/tabs` and `/motion/scroll` (page-variant, no hero) become NON-focal → the global shell warm aurora (`warmFieldHue`, warm-projected `[25,95]`, `AppShell.vue:320`) composites behind them exactly as it already does for the CONVERGED forms/data/containers content pages → the probe reads warm ≥ floor both modes both engines.

**Fence to hold:** the one-GL-per-route law. A GL-background HERO page still mounts exactly one context (its StoryHero field, shell suppressed); a GL-background CONTENT page now mounts exactly one context (the shell field, no StoryHero) — never two. Verify `proof:focal-complete` C2 (`SELF_STAGES_GL ⊇ the DockStage grep`) stays green and that no route mounts 2 GL canvases after the thread.

*(Coarser alternative, NOT preferred: retarget `CATEGORY_DEFAULT_BG` for navigation/motion to a non-GL warm wash — but that also changes the hero/landing intent for those categories. The `focal.ts` hero-thread is the precise fix.)*

### FIX B (SECONDARY) — `/compositions/hero`: give the constellation a warm compositing layer

The constellation hero mounts correctly but carries no warm-cream identity and reads as a dead void in dark. Restore warm chroma ≥ floor both modes AND kill the W-DARK-MATERIAL dark void — any of:

- (a) keep the warm shell aurora as an UNDERPAINT behind a `kind="constellation"` hero (do not fully suppress the shell for constellation heroes); OR
- (b) switch `compositions/hero` background to a warm `aurora` (`manifest.ts:1245`); OR
- (c) add a warm-cream (light) / luminous-warm-dark (dark) base plate behind the constellation field.

Prefer the warm-field fix over relaxing the roster's warm-chroma floor — the dark-void concern (`§W-DARK-MATERIAL`) argues against accepting an achromatic constellation-hero.

### FIX C (THIRD, paint-INSTRUMENT — not a source fix) — the gesture frame-series harness

The `motion`/`dock`/`drawer` rows owe a frame-series read (route-page-build ≥8 entrance frames, shell-vh-morph both legs ≥12 travel frames, drawer-snap-drag live gesture, dock facilities, fps/gap histograms). The settled-still C18 harness (`getAnimations().running = 0` at `data-capture-ready`) structurally cannot verify these. Build a multi-frame recorder over the entrance/gesture window (CDP `Page.startScreencast` or an rAF sampler — the W-SHELL-MORPH-PAINT-REPAIR / W-DRAWER-PAINT-BIND DELTAs already use this shape); do NOT let a settled capture stand in (the IOS27-MOTION-TRUTH blind-spot rule).

### Gate + re-judge criteria

- **Device-free gate:** `proof:warm-identity` — must stay GREEN (its cross-page baseline is born-RED 0/11 and does NOT flip until the non-authoring judge flips each row on a fresh warm capture; device-free green is INSUFFICIENT to close 17.6).
- **Binding re-judge (paint):** re-capture dual-engine (Chrome ANGLE-Metal + system WebKit) both modes over BUILT `:5200`, re-run `validate.mjs` at the roster probe boxes. The 3 focal routes must read `dominantFamily=warm`, meanChroma ≥ ~0.020 (the warm floor), warmFraction ≥ 0.55, both modes both engines; `/compositions/hero` dark must be luminous-warm-dark, NOT a near-black void; the gesture frame-series must supply ≥8 painted entrance frames per the motion rows. Only then does the non-authoring judge flip the roster rows FAIL → CONVERGED.
- **Independent of 17.6:** clear the `proof:meta` standing red (§4.1) by filling the 12 waves' `fableArm / designSyncSurface` cells (plan/ledger arm) before the tranche close.

---

## 6. The owed gate clause — `proof:focal-complete` greened over this defect class (Task-3)

`proof:focal-complete` (`scripts/proof-focal-complete.mjs`, registered `gates.mjs:768` **tags `["local","ci","release"]`**) is the device-free gate that owns the route-FOCAL enumeration. Its **C3** clause is titled "the resolver is TOTAL" and its comment + PASS message assert **"a focal-without-a-field is impossible — isFocalRoute checks the kind first"** (`:16-18`, `:161`). **That claim is FALSE on disk — the 17.6 defect IS a focal-without-a-field** (`/navigation/tabs` + `/motion/scroll` are focal by their GL `background.kind` yet mount no field). C3 greened over the defect for a mechanical reason:

**C3 is a TAUTOLOGY.** It filters the manifest rows to the GL-kind set (`glRows = rows.filter(r => GL_BG_KINDS.has(r.kind))`, `:151`) and then asserts every such row satisfies `GL_BG_KINDS.has(r.kind) || SELF_STAGES_GL.has(r.routeId)` (`:154`) — the left disjunct is TRUE by construction of the filter, so C3 passes for every possible tree. It verifies that GL-kind rows ARE focal; it **never verifies that a focal route MOUNTS a field.** The real invariant — *no focal route lacks a mounted GL field* — is machine-checked nowhere. (Note C3 also stays vacuously green AFTER the fix: FIX A makes the page-variant GL rows non-focal, but C3 keeps passing regardless, because it reads `GL_BG_KINDS.has(kind)` directly rather than the resolved focal decision.)

### The owed C4 (born-RED, lands WITH FIX A)

Add a `c4` clause to `proof:focal-complete` that checks the RESOLVED focal decision against field-mount, so this class cannot ride again:

- **Invariant:** for every routed manifest row, `isFocalResolved(route) ⟹ mountsField(route)`, where `mountsField(route) = (row.hero === true) || SELF_STAGES_GL.has(routeId)` (a GL field mounts IFF `StoryHero` renders, i.e. `variant==='hero'`, OR the route self-stages GL outside the `background` channel).
- **Source-derive `isFocalResolved`** by parsing `focal.ts` for the hero-gated GL arm — the clause asserts the GL-kind branch of `isFocalRoute` is gated on the hero parameter (the FIX A shape: `kind ∈ GL_BG_KINDS && isHeroPage`) AND the two `router.ts` call sites (`:52` landing, `:74` story) thread the flag — so a regression that drops the hero gate reds C4. Read `row.hero` from the manifest parse the gate already runs for C3.
- **Born-RED at HEAD** (`/navigation/tabs`, `/motion/scroll`, and every page-variant GL-background row in navigation + motion violate it) → **GREEN after FIX A** (those rows resolve non-focal; the shell warm aurora mounts).
- **Self-test bite:** plant a page-variant row with a GL `background.kind` and no `hero` flag → C4 must RED; give it `hero: true` → C4 passes.
- **Fence:** do NOT weaken C3 (its GL-kind-set completeness read is kept); C4 is ADDITIVE. Keep the one-GL-per-route law green (`proof:focal-complete` C2) — a GL-background HERO mounts one field (shell suppressed); a GL-background CONTENT page mounts one field (the shell, no StoryHero); never two.

This clause is RECORDED here (not landed as a source edit) because the FOLD arm does not author the fix: the born-RED C4 lands WITH FIX A (the tranche's born-RED-with-fix discipline), and pre-committing a regex to the un-landed fix's exact source shape from the fold arm would be fragile. The build engine that lands FIX A adds C4 to this precise spec.

### A distinct pre-existing standing red on the same gate (NOT 17.6)

`proof:focal-complete` **EXITS 1 at HEAD** — but on **C2**, not this defect: `dock/siri-island.vue` mounts `<DockStage>` (GL outside the `background` channel) yet is not enrolled in `SELF_STAGES_GL` (the silent shell+DockStage 2-GL drift C2 guards). This is a separate pre-existing miss on a `["local","ci","release"]` gate — a standing close-blocker the tranche must also clear (enroll `dock/siri-island` in `SELF_STAGES_GL`, or drop the `<DockStage>` mount), owned by the dock/siri-island wave, orthogonal to the 17.6 warm-field fix. Recorded here so it is not lost; verified by run 2026-07-10 (`c2-self-stages-superset-of-dockstage-grep` FAIL: `dock/siri-island`).
