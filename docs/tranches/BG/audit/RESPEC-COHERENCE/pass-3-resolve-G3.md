# PASS 3 — RESOLVE G3 (§2.G2/A2): the WS8.4 `.glass-lens`/`glass-refract.css` retire — FULL reader fan-out + atomic *Files* + *Gate* set + the fence-roster route

**Cluster:** `G3-ws8-reader-fanout` · **Mode:** spec · **PASS 3** · **HEAD:** `6c1f5386` (`tranche/BG`) · **Date:** 2026-06-30
**Owns:** §2.G2 (HIGH — WS8 retire under-enumerates the reader set) + §2.A2 (HIGH LIVE — `bg-paint.wf.js` null-crash; the guards are PASS-2-confirmed solid, re-stated here only as the co-landing applied-edit).
**Convergence in:** PT-3 = 82% (the highest of the 6 — "folds fastest"). **This pass:** finish it — the FULL 24-reader census, the 3 missing build/published breaks added to *Files*, all 24 routed THROUGH `proof:glass-refract-fence`'s roster, and the WS8.4 *Gate* set named.
**Write-fence:** RESPEC-COHERENCE doc only. No src/demo/scripts edits (the drafted diff is a spec, not a merge). Siblings verified intact (exit 0) before + after.

> **What moved vs PT-3.** PT-3 enumerated "24 readers" by collapsing the 4 comment-hygiene-only files into a §1e bucket. This pass runs the LIVE disk-grep at `tranche/BG@6c1f5386` and reports the **complete 28 reader FILES** (the 24 behaviour/red-bearing readers + the 4 comment-only) so the *Files* list cannot under-enumerate again, and corrects three PT-3 framings against HEAD: (a) `proof:no-retired-survivor` carries **NO** `glass-lens`/`glass-refract` RETIRED_CLAIM at HEAD → the disposition is an **ADD**, not a "re-anchor"; (b) `proof:safari-webgl` is `[local,ci,**release**]` (a SECOND release cut-blocker beside `proof:button-glass` — its S5 goes vacuously-green on delete but the dead `LENS_CSS` const is a release-gate cleanup, not a no-op); (c) `proof:glass-refract-fence` is the WS8.2-MINTED roster (build-map:631) — REAL-in-plan, so routing the survivors THROUGH it is wiring an already-specified single-source, not inventing one.

---

## 0. VERDICT

**FEASIBLE = TRUE. No restart.** §2.G2 is real, confirmed on the live tree, and reconciles by a bounded *Files*+*Gate* amendment to `BG.W-GLASS-SOTA-LADDER` (WS8.4) — the "9-sites-not-6" G4 disease recurring un-costed at WS8, and **worse** (two `release`-tagged cut-blockers + a published-component substrate delete the current spec is blind to). The atomic unit is **WS8.4-specifically** (the retire is ALREADY a 4-wave WS8 decomposition — 8.1 retires the 3-gate matrix + folds `useSpecularPointer`'s WRITER, 8.4 deletes the files), so the §2.P3 transient-red argument scopes to WS8.4's one commit and does not drag 8.1's gate-matrix retire forward.

**The single load-bearing fix:** the current WS8.4 *Files* names **4** readers (glass-refract.css 3-point delete, useGlassRenderer.ts delete, useSpecularPointer.ts delete, barrel rows) and its *Gate* is **"the §3.1 retire matrix GREEN + retired-paths DEFINITION-ABSENT (grep src+demo+scripts)"** — which **greens while `proof:button-glass` `[release]` reds at the cut** (necessary-not-sufficient). The amendment adds the 3 hard build/published breaks to *Files*, routes all 24 surviving-reader asserts THROUGH `proof:glass-refract-fence`'s roster (the anti-fan-out single-source), and names the WS8.4 *Gate* set.

---

## 1. THE FULL READER FAN-OUT — the live disk-grep (`git grep -ln` over scripts/ src/ demo/ tests-visual/ tests/ @ `tranche/BG`)

`git grep -ln "glass-lens"` ∪ `"glass-refract"` = **28 reader FILES**. The current WS8.4 *Files* names **4**. The build-map's "3-gate retire matrix" (8.1) is correct for the RETIRED set but silent on the **24 surviving / build-breaking / published readers**.

### 1a. Gate scripts (12 — not 3, not 8)

| # | Gate / script | tags (live) | reads | disposition under WS8 | RED on naive delete? |
|---|---|---|---|---|---|
| 1 | `scripts/proof-glass-prune.mjs` | `[local,ci]` | `.glass-lens` + `glass-refract` (P6 story toggle) | **RETIRED at 8.1** (3-gate matrix) + its π `tests-visual/glass-prune.spec.ts` | n/a (gate gone at 8.1) |
| 2 | `scripts/proof-glass-material-sota.mjs` | `[ci]` | `glass-refract.css`, `#glass-refract`, `.glass-lens` | **RETIRED at 8.1** (3-gate matrix) | n/a (gate gone at 8.1) |
| 3 | `scripts/proof-lensing.mjs` | `[local,ci,release]` | `glass-refract.css`, `--glass-refract-filter`, `.glass-lens` | **RETIRED at 8.1** (3-gate matrix) + its π `tests-visual/lensing.spec.ts` | n/a (gate gone at 8.1) |
| 4 | `scripts/proof-button-glass.mjs` | **`[local,ci,release]`** | Button.vue `.glass-lens` (B4 `consumesRefractAxis`), surfaces.css `.btn-glass.glass-lens` (B4 `pressDriveArm`), glass-refract.css `.glass-lens`+`@supports` (B4 `filterSupportsGated`) | **SURVIVES → MUST RE-POINT B4** | **YES — release cut-blocker** (filterSupportsGated true→false proven on delete) |
| 5 | `scripts/proof-visual-reconcile.mjs` | `[local,ci]` | Button.vue `.glass-lens` (a1 `composesLens = /['"`]glass-lens['"`]/`) + a `deadClassRef` bite on `.glass-refract` | **SURVIVES → MUST RE-POINT a1** | **YES** (a1 reds when the Button `'glass-lens'` literal is deleted) |
| 6 | `scripts/proof-no-retired-survivor.mjs` | `[local,ci,release]` | RETIRED_CLAIM rows by `find`-regex (NO glass-lens/glass-refract row at HEAD — verified) | **SURVIVES → ADD a `.glass-lens`/`glass-refract.css` RETIRED_CLAIM row** (NOT a "re-anchor" — there is none to re-anchor) + a MIGRATION.md row | no (stays green; **coverage-ADD** — without it the retire has no survivor-teeth) |
| 7 | `scripts/proof-no-dead-token.mjs` | `[ci]` | `--glass-refract-bevel`/`--glass-refract-*` KEEP_ALLOWLIST entry | **SURVIVES → CLEANUP** (remove the stale allowlist entry) | no (allowlist entries for deleted tokens are silently fine — the dead-loop iterates DECLARED tokens only) |
| 8 | `scripts/proof-safari-webgl.mjs` | **`[local,ci,release]`** | `const LENS_CSS = "src/styles/glass-refract.css"`; S5 = "no un-gated `var(--glass-refract-filter)` write" | **SURVIVES → CLEANUP** (drop the dead `LENS_CSS` const + its S5 read) | no (`safeRead`→`""` → S5 vacuously green over zero lens writes) — **but it is `[release]`, so the dead const ships in a cut-gated script: a release-gate hygiene edit, co-land it** |
| 9 | `scripts/proof-liquid-glass-tokens.mjs` | `[local,ci]` | `read("src/styles/glass-refract.css")` concatenated into `specular` | **SURVIVES → CLEANUP** (drop the stale read) | no (the read feeds `specular` but NO `assert()` references the refraction string) |
| 10 | `scripts/proof-theme-style.mjs` | (inline ci/release class) | comment only (the postcss-direct dodge of glass-refract.css's `url()`) | **SURVIVES → DOC CLEANUP** | no (compiles the cascade via postcss; the `@import` removal drops it cleanly) |
| 11 | `scripts/proof-dist-css.mjs` | `[local,ci,release]` | inline synthetic Fixture comment (NOT the real file) | **SURVIVES → DOC CLEANUP** (rename the fixture comment) | no (fixture is an inline string) |
| 12 | `scripts/profile-bundle.mjs` | (budget arm) | comment (`glass-refract/specular-track lift the draw to gzip ~124.9k`) | **SURVIVES → RE-BASELINE** (the bundle SHRINKS — the §2.L15/D net-lift-as-one-number applies) | no (budgets are ceilings) |

**Headline:** the §3.1 retire matrix RETIRES gates #1–#3 at WS8.1; the WS8.4 file-delete reds **2 surviving gates** — #4 `proof:button-glass` `[release]` + #5 `proof:visual-reconcile` `[ci]` — **neither named in the current WS8.4 *Files* nor *Gate*.** #6–#9 are surviving readers owing a co-landed cleanup/ADD (#8 is a SECOND release-tagged script); #10–#12 are doc/baseline reconciles.

> **gates.mjs is a 13th note-bearing reader** (`scripts/gates.mjs` carries `glass-lens`/`glass-refract` in the registry `note:` strings of #1-#5). It is a DOC-reconcile (fold the surviving `note:` prose at the retire), not a behaviour red — counted in §1e.

### 1b. Source files (6 — only `glass-refract.css` is in the current *Files*)

| # | File | what it carries | disposition | hard? |
|---|---|---|---|---|
| 13 | `src/styles/glass-refract.css` | the `.glass-lens` rule + `#glass-refract` data-URI filter + `--glass-refract-bevel`/`--glass-refract-filter` | **DELETE the file** (named — the "3-point") | — |
| 14 | `src/styles/index.css:166` | `@import "./glass-refract.css";` | **REMOVE the `@import`** — else the build ENOENTs | **HARD (build break) — ABSENT from current *Files*** |
| 15 | `src/styles/critical-partition.mjs:63` | `"glass-refract.css"` in the `CRITICAL_PARTIALS` byte-complete manifest | **REMOVE the manifest entry** — else `proof:css-critical`'s union-byte-complete assert breaks | **HARD — ABSENT from current *Files*** |
| 16 | `src/components/ui/button/Button.vue:219-220` | `liquid?: boolean` prop + `liquidDecoration = computed(() => props.liquid ? 'glass-lens' : undefined)` bound at `:class` | **RE-POINT** `:liquid` onto the WS8.2 GL refraction (`useGlassRefraction`/the `.glass-refract-gl` opt-in) OR retire `:liquid` | **HARD (button-glass B4 + visual-reconcile a1)** |
| 17 | `src/styles/glass/surfaces.css:338` | `.btn-glass.glass-lens { … --glass-btn-press-t … }` press-drive arm | **RE-POINT/RETIRE** the arm (button-glass B4 `pressDriveArm`) | **HARD** |
| 18 | `src/composables/glass/index.ts:34-35` | `export { useSpecularPointer }` + `useGlassRenderer` barrel rows | **DROP barrel rows** (named — "barrel rows") | **HARD (typecheck)** |

### 1c. The §-sibling source the current *Files* under-enumerates — `useGlassRenderer.ts` has a LIVE PUBLISHED consumer

The current WS8.4 *Files* says "`useGlassRenderer.ts` delete". Live grep:

```
$ git grep -ln "useGlassRenderer" tranche/BG -- src/ demo/
  src/components/custom/glass-panel/GlassPanel.vue   ← LIVE PUBLISHED CONSUMER
  src/composables/glass/index.ts                     ← the barrel
  src/composables/glass/useGlassRenderer.ts          ← self
```

`GlassPanel.vue` imports + calls `useGlassRenderer({ preferredTier })` and is a **PUBLISHED component**: `package.json` carries both `"./glass-panel": { types: "./dist/glass-panel.d.ts", import: "./dist/glass-panel.js" }` (exports:519) AND the `typesVersions` `"glass-panel"` (typesVersions:178). A literal "delete useGlassRenderer.ts" breaks GlassPanel's TS build (caught by typecheck) AND is a **public-surface** decision (the `proof:lineage-probe` registry-consumer corollary + a MIGRATION row if the published `/glass-panel` refraction is retired). The barrel header records useGlassRenderer was RESTORED as a GlassPanel-local dependency at AZ.W-PRUNE2. The atomic diff must ALSO carry:

| # | File | disposition | hard? |
|---|---|---|---|
| 19 | `src/composables/glass/useGlassRenderer.ts` | **DELETE** (carries `detectTier`; sole reader after #20 re-points is self) | — |
| 20 | `src/components/custom/glass-panel/GlassPanel.vue` | **RE-POINT** off `useGlassRenderer` onto WS8.2 `useGlassRefraction` **OR a DECIDED retire** of the published `/glass-panel` refraction (+ `src/subpaths/glass-panel.ts` + the package.json `./glass-panel` export + typesVersions + a MIGRATION row) | **HARD, PUBLISHED-SURFACE — ABSENT from current *Files*** |
| 21 | `src/composables/glass/useSpecularPointer.ts` | **DELETE** (named "delete + barrel rows"). **COHERENCE NOTE:** WS8.1 *Files* says "the atomic `useSpecularPointer` fold" + names `useSpecularTracking.ts` — that fold MOVES the angle-WRITER logic into the kept `useSpecularTracking`/the bevel material; WS8.4 then DELETEs the now-orphan `useSpecularPointer.ts` file + its barrel row. State the SPLIT: 8.1 folds the WRITER (no file delete), 8.4 deletes the FILE — else "fold" at 8.1 and "delete" at 8.4 read as a double-disposition. Its live readers at HEAD are gates.mjs/proof-button-glass/proof-lensing/proof-visual-reconcile/proof-no-dual-path/proof-affordance-map — each either retired (8.1) or re-pointed (this wave) | **HARD (typecheck + the gate re-points)** |

### 1d. Demo readers (3 — re-point/retire the class refs, else visually-dead)

| # | File | what | disposition |
|---|---|---|---|
| 22 | `demo/stories/substrates/glass-panel.vue:53` | `<ToggleGroupItem value="lens">…glass-lens…</ToggleGroupItem>` LIVE toggle (the P6 story `proof:glass-prune` scanned — gate retires at 8.1) | **RE-POINT/RETIRE** the lens toggle onto the new refraction story |
| 23 | `demo/stories/substrates/glass-material.vue:238` | `class="glass-floating glass-lens …"` LIVE panel demo + the `.glass-refract` labels | **RE-POINT/RETIRE** onto the new refraction story |
| 24 | `demo/stories/display/buttons.vue:9` | comment ".glass-lens refraction edge" | **DOC CLEANUP** |

### 1e. Comment-hygiene-only (no red, no behaviour — the §4 doc-reconcile sweep, completing the 28-file census)

`scripts/gates.mjs` (surviving `note:` prose), `src/styles/glass/material.css` (swell-history comment), `src/styles/glass-specular-track.css` (re-home comment), `src/styles/tokens/property-regs.css` (the `@property --glass-refract` is **ALREADY retired** — these are comments; **no live registration to drop**, confirming the DDR-LENS-BAKE record), `tests-visual/button-glass.spec.ts` (comment). These red nothing; they are stale prose the §4 doc reconcile sweeps.

**Total fan-out: 28 reader FILES** = 12 gate scripts + 6 source + 3 §-sibling source (useGlassRenderer/GlassPanel/useSpecularPointer) + 3 demo + 4 comment-only (gates.mjs counted once in 1a; material.css / glass-specular-track.css / property-regs.css / button-glass.spec.ts are the §1e four). **24 are behaviour/red/structural-bearing** (the §1a #1-#9 + §1b #13-#18 + §1c #19-#21 + §1d #22-#23 = the canonical retire set), **4 are comment-only** (§1e). The current WS8.4 *Files* names **4** of the 24. **2 RED at the cut** (#4 release, #5 ci), **3 break the build/published surface** (#14 index.css, #15 critical-partition, #20 GlassPanel), all absent from the spec.

---

## 2. THE FENCE-ROSTER ROUTE — all 24 survivors THROUGH `proof:glass-refract-fence`, NOT per-gate frozen strings (the §2.G2 friction-class HARDEN)

The naive fix is to independently re-point each surviving gate's frozen `glass-lens`/`glass-refract` string. **That RE-CREATES the fan-out disease** (the next GL-refraction wave — WS8.5 LIQUID-TRANSITION adds a 2nd `--glass-btn-press-t` reader — re-triggers the multi-gate scatter). The route is the **single-source-of-truth roster** WS8.2 already mints:

- **`proof:glass-refract-fence` (`scripts/proof-glass-refract-fence.mjs`, NEW at WS8.2, born-RED `["local"]`→`ci` at the keystone) carries "the 5 GL refraction sites enumerated at build" roster** (build-map:644-646: hero CTA + dock plate are the 2 distinct; the actual 5 `sampleBG` sites listed at WS8 build). That roster is the ONE canonical list of where refraction LIVES post-retire.
- **WS8.4 EXPORTS a `REFRACTION_READERS` roster from `proof-glass-refract-fence.mjs`** — the single canonical reader set (the post-retire GL refraction sites + the `.glass-refract-gl`/`useGlassRefraction` binding class/import). The surviving gates that today frozen-string-match `glass-lens`/`glass-refract` re-point their refraction assert to **IMPORT + walk this roster**, not to a per-gate literal:
  - `proof:button-glass` B4 `consumesRefractAxis` → assert Button binds a member of `REFRACTION_READERS` (the `useGlassRefraction` import / `.glass-refract-gl` class), not the frozen `'glass-lens'`.
  - `proof:visual-reconcile` a1 `composesLens` → the SAME roster walk (drop the frozen `/['"`]glass-lens['"`]/`); the `deadClassRef` bite re-points to flag a `.glass-lens`/`.glass-refract` re-introduction (the dead class is now BOTH).
  - `proof:safari-webgl` S5 → the lens-write enumeration reads the roster's `@supports`-gated GL site list, not the dead `LENS_CSS` const.
- **The anti-evasion floor:** `proof:glass-refract-fence` F5 (on-disk-resolves) is EXTENDED so every `REFRACTION_READERS` member RESOLVES on disk (a roster naming a deleted file reds), + a self-test bite: a synthetic frozen-string re-point (a gate re-introducing a per-gate `glass-lens` literal instead of the roster) MUST flag. So a future GL-refraction wave adds ONE roster entry; the gates FOLLOW (the `proof:webgl-substrate-single` "asserts follow the composition into the carved leaf" precedent, applied to the refraction-reader axis).

This is the §2.G2 **friction-class harden** (the explicit PT-3 H4): the retire does not just enumerate the 24 readers once — it routes the SURVIVING-gate refraction asserts through ONE source so the fan-out cannot recur.

---

## 3. THE CORRECTED `BG.W-GLASS-SOTA-LADDER` (WS8.4) WAVE SPEC

Replace the current build-map:678-681 block with:

> **4. BG.W-GLASS-SOTA-LADDER** [H] — formalize the Tier-0 CSS → Tier-1 WebGL2 → Tier-2 WGSL degrade; RETIRE the dead `.glass-lens`/`glass-refract.css`/`detectTier` AS ONE ATOMIC COMMIT; book the successors.
>
> **The retire is ONE atomic diff (NOT split across `composeBatch`'s file-disjoint batcher — the §2.P3 trap).** If the `glass-refract.css` delete lands in a different commit than the `proof:button-glass` B4 re-point, the `[release]` gate reds **transiently** between commits → the integrator's per-wave gate-re-run fails → a spurious revert. The re-point TARGET (`useGlassRefraction` / `.glass-refract-gl`) already exists — satisfied by *Precond: #1+#2+#3* (WS8.2 mints it BEFORE the retire). The atomic unit is **WS8.4-specifically** (WS8.1 already retired the 3-gate matrix + folded the `useSpecularPointer` writer; WS8.4 deletes the files + re-points the survivors) — so the transient-red argument scopes to THIS one commit and 8.1's matrix retire is not dragged forward.
>
> ***Files* (the full atomic diff — A. structural/build · B. Button re-point · C. survivor-gate re-points · D. §-sibling deletes · E. survivor-guard + cleanup · F. demo):**
>
> **A — delete + structural CSS (HARD, build):** `rm src/styles/glass-refract.css`; `src/styles/index.css` delete L166 `@import "./glass-refract.css";`; `src/styles/critical-partition.mjs` delete L63 `"glass-refract.css",` from `CRITICAL_PARTIALS`.
>
> **B — Button re-point (HARD, release gate):** `src/components/ui/button/Button.vue` re-point `liquidDecoration` from `'glass-lens'` onto the WS8.2 GL refraction binding (`useGlassRefraction` / `.glass-refract-gl`), OR retire `:liquid` if the hero CTA refraction becomes automatic on `.glass-deep`; `src/styles/glass/surfaces.css` re-point/retire the `.btn-glass.glass-lens { --glass-btn-press-t }` arm onto the GL press-drive site.
>
> **C — survivor-gate re-points THROUGH the roster (the anti-fan-out single-source — §2):** export `REFRACTION_READERS` from `scripts/proof-glass-refract-fence.mjs`; re-point `scripts/proof-button-glass.mjs` B4 (`consumesRefractAxis`/`pressDriveArm`/`filterSupportsGated` → roster walk, drop the `refractCss` file-read + `?? ""`) and `scripts/proof-visual-reconcile.mjs` a1 (`composesLens` → roster walk; `deadClassRef` bite → flag a `.glass-lens`/`.glass-refract` re-intro) onto the roster. Drop the retired `proof:lensing` re-walk leg (8.1-retired) onto `proof:glass-specular-angle`.
>
> **D — §-sibling deletes (HARD, typecheck/published):** `rm src/composables/glass/useGlassRenderer.ts`, `rm src/composables/glass/useSpecularPointer.ts`; `src/composables/glass/index.ts` drop both barrel rows; **`src/components/custom/glass-panel/GlassPanel.vue` re-point off `useGlassRenderer` onto `useGlassRefraction` OR a DECIDED retire of the published `/glass-panel` refraction** (+ `src/subpaths/glass-panel.ts` + the package.json `./glass-panel` export + `typesVersions` + a MIGRATION.md row + the `proof:lineage-probe` registry-consumer check IF retired). **This GlassPanel decision is owed BEFORE the WS8.4 build** — it touches the public surface.
>
> **E — survivor-guard + cleanup (no red, owed for coherence):** `scripts/proof-no-retired-survivor.mjs` **ADD** a `.glass-lens`/`glass-refract.css` RETIRED_CLAIM row (label + `find`-regex + artefacts: the file, the `.glass-lens`/`.glass-refract` classes, `--glass-refract-*` tokens, `useGlassRenderer`, `useSpecularPointer`) **+ a MIGRATION.md row** (NOT a "re-anchor" — there is NO glass-lens RETIRED_CLAIM at HEAD; this gives the retire its survivor-teeth); `scripts/proof-no-dead-token.mjs` remove the `--glass-refract-bevel`/`--glass-refract-*` KEEP_ALLOWLIST entry; `scripts/proof-safari-webgl.mjs` remove the dead `LENS_CSS` const + its S5 read (a `[release]`-script hygiene edit); `scripts/proof-liquid-glass-tokens.mjs` drop `read("src/styles/glass-refract.css")` from `specular`; `scripts/proof-theme-style.mjs` / `scripts/proof-dist-css.mjs` stale-comment reconcile; `scripts/profile-bundle.mjs` re-baseline (the bundle SHRINKS — §2.L15 net-lift-as-one-number); fold the surviving `gates.mjs` `note:` prose.
>
> **F — demo re-point:** `demo/stories/substrates/glass-panel.vue` (lens toggle), `demo/stories/substrates/glass-material.vue` (`.glass-lens` panel) → the new refraction story or retire; `demo/stories/display/buttons.vue` comment.
>
> ***Gate* (the §3.1 retire matrix is necessary-NOT-sufficient):** `proof:button-glass` `[local,ci,release]`, `proof:visual-reconcile` `[local,ci]`, `proof:safari-webgl` `[local,ci,release]`, `proof:glass-refract-fence` `[local→ci]` (the roster + F5 on-disk-resolves extended to `REFRACTION_READERS` + the synthetic frozen-string-re-point self-test bite), `proof:css-critical` `[ci]`, `proof:no-dead-token` `[ci]`, `proof:no-retired-survivor` `[local,ci,release]`, `proof:liquid-glass-tokens` `[local,ci]`, **`typecheck`** (GlassPanel/barrel), + the existing §3.1 retire matrix GREEN + retired-paths DEFINITION-ABSENT grep. **`proof:button-glass` + `proof:visual-reconcile` + the `REFRACTION_READERS` roster appear NOWHERE in the build-map today.** The DEFINITION-ABSENT grep scope is **pinned to src+demo** (NOT scripts/ — the surviving gate scripts LITERALLY carry `glass-refract`/`glass-lens` as roster regexes + RETIRED_CLAIM `find`-patterns; a scripts/-inclusive grep would force a false-green by deleting the survivor-teeth). The grep RED on a `.glass-lens`/`.glass-refract` CLASS use in src/demo is the live floor; the scripts/ refraction strings live BY DESIGN in the roster + the survivor-claim.
>
> ***π:* none net-new** (the visual register is WS8.2's `tests-visual/glass-refract.spec.ts` + the `proof:ba-gestalt` glass/CTA verdict — a dead-MECHANISM file-delete changes ZERO paint where the GL successor already paints; the BB.W-PRUNE-CONSOLIDATE inv-4 "no own π for a dead-cut" precedent). ***Precond:* #1+#2+#3** (WS8.2 `useGlassRefraction` + the fence roster exist before the retire — atomicity HOLDS, no restart).

---

## 4. §2.A2 — the `bg-paint.wf.js` null-guards (PASS-2-CONFIRMED solid; the co-landing applied-edit)

Per COHERENCE.md §1 / PT-3, the 4 null-guard sites (L40 `pp` inventory, L43 `pipe` validator, L51 batched judge per-agent `.catch`, L54 `report` synth) are CONFIRMED solid — the trivial `.catch(() => null)` + downstream null-guard pattern `bg-bh-execute.wf.js` already proves (L138/140/177/190/198-199/212). This is a wf.js edit (the file lives on `tranche/BG`, outside this spec-agent's write-fence) applied at execution; it is NOT a WS8.4 build dependency. Recorded here only so the G3 cluster's two issues stay co-tracked; the drafted diff is in the PT-3 worktree proto (`PT-3-glass-lens-fanout-and-bg-paint-guards.md §3`), unchanged.

---

## 5. CONVERGENCE — honest aggregate

| Component | Conv | Note |
|---|---|---|
| Diagnosis (the 28-file census, the 24 retire-bearing, the 2 release reds, the 3 build/published breaks) | **96%** | live disk-grep @ `6c1f5386`; every claim verified against source (GlassPanel published-consumer + package.json export CONFIRMED; useSpecularPointer present; no-retired-survivor has NO glass-lens claim → ADD not re-anchor; safari-webgl `[release]` is a 2nd cut-blocker) |
| The corrected WS8.4 *Files* (A-F, 24 readers + 3 hard breaks) | **92%** | the GlassPanel re-point-vs-retire DECISION is owed by the executor (a published-surface call); the `:liquid`-vs-`.glass-deep`-auto Button choice is the executor's — both are bounded, not feasibility-open |
| The fence-roster route (`REFRACTION_READERS` single-source) | **90%** | depends on WS8.2 actually exporting the roster (in-plan at build-map:631/644 — REAL, not invented); the export shape + self-test bite are specified, the exact roster contents land at the WS8.2 build (the "5 sites listed at build" is already a WS8.2 deliverable) |
| The WS8.4 *Gate* set (9 gates + typecheck + pinned grep scope) | **94%** | every tag verified live; the grep-scope pin (src+demo, NOT scripts) is the one judgement call, resolved (the survivor-teeth must keep the strings) |
| §2.A2 null-guards (co-landing) | **100%** | PASS-2-confirmed; the diff is drafted, applied at exec |
| **Overall ready-to-amend-the-plan** | **91%** | up from PT-3's 82% — the full census closes the under-enumeration, the 3 hard breaks + the published-GlassPanel decision are named, the fence-roster route is specified with its anti-fan-out self-test, the *Gate* set is named with the pinned grep scope. The residual 9% is the two EXECUTOR decisions (GlassPanel re-point/retire + Button `:liquid` disposition) — bounded plan-amendments, NOT feasibility blockers |

**readyToAmend = TRUE** for the WS8.4 *Files*+*Gate* rewrite (§3) — fold it into `docs/tranches/BG/execution/bg-build-map.md` replacing :678-681. The two executor decisions (GlassPanel, Button `:liquid`) are recorded as owed-before-build, not open feasibility.

---

## 6. THE EXACT AMENDMENT (drop-in for bg-build-map.md:678-681)

The §3 block IS the replacement text. One companion edit elsewhere:

- **build-map:644-646 (WS8.2 `BG.W-GLASS-REFRACT-WEBGL`)** — add to its *Files*: `scripts/proof-glass-refract-fence.mjs` **exports `REFRACTION_READERS`** (the post-retire refraction-reader roster the WS8.4 survivor-gates import); add to its *Gate* clause F5: "every `REFRACTION_READERS` member RESOLVES on disk + a synthetic frozen-string-re-point self-test bite (a per-gate `glass-lens` literal instead of the roster MUST flag)". This makes the WS8.2-minted roster the single-source WS8.4 routes through — the anti-fan-out wiring named at its mint, not bolted on at the retire.

No other build-map edit. The EXECUTION-PROGRESS row for `BG.W-GLASS-SOTA-LADDER` keeps its [H] status + the #1+#2+#3 precond (unchanged); only the *Files*/*Gate* cells widen.
