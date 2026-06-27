# BG-WS7 — Quality · Coverage · Close (SPEC pass 2)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Pass 1 converged the structure (≈73%). Pass 2 **build-proves the empirical residuals** — and the binding act of this pass is a LIVE pixel read off the running 4.2.0 demo that **falsifies pass-1's own born-RED bar**: 3 of the 5 named defects do NOT reproduce on live HEAD. The spec is the disease it exists to kill if it bands on phantoms. This pass re-grounds every band in measured pixels, corrects the §0 ground-truth (the dead-mechanism reality was inverted in pass 1), and resolves the four spec'd-not-proven residuals against disk + a real serve.

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0. **Pass 2 supersedes pass-1 §0, §B.2, §G.2-G.4; advances §A.5, §D-F0, §E in place.** Everything else in pass 1 stands.

---

## §0′ — HEAD GROUND-TRUTH, RE-DERIVED BY CALL-SITE (pass-1 §0 was inverted on the two biggest files)

Pass-1 §0 hand-asserted dispositions that disk contradicts — the same self-certification disease WS7 exists to kill, reproduced in WS7's own ground-truth table. Every row below is **re-derived empirically** (`git ls-files` + a real `(`-call-site grep excluding the def-line + JSDoc):

| Symbol | Pass-1 §0 claim | **DISK TRUTH @ 71e1c641** | Disposition |
|---|---|---|---|
| `useDockContextSilhouette.ts` | "ABSENT — already deleted" | **PRESENT 551L · 0 real call-sites** (the 1 grep hit is its own JSDoc L269) | **DEAD → DELETE file+ratchet-row+`proof:dock-context` gate, ONE atomic diff** |
| `useDockFission.ts` | "ABSENT" | **PRESENT 604L · 2 src (`GlassDock.vue:374` `:splittable`) + 2 demo** | **LIVE → KEEP engine+gate** (`proof:dock-fission` guards a real facility) |
| `useLiquidMorph.ts` | "PRESENT, 0 consumers" ✓ | **PRESENT 462L · 0 real call-sites** + `liquid-morph.css` 850L (demo-only, mis-placed in `src/styles/`) | **DEAD → DELETE** |
| `useHaptic.ts` | "PRESENT 138L, exported, 0 call-sites" ✓ | **PRESENT 138L · 0 real call-sites · exported** root-barrel + `/api` | **DEAD-but-exported → RETIRE + drop exports** |
| `useCelebrationBurst.ts` | "PRESENT 261L" (wrong path) | **PRESENT at `src/composables/motion/useCelebrationBurst.ts` · gate `["local","ci"]` (NOT release)** | DECIDE wire-≥2 or fold into CompletionSeal (gate already off release) |
| `useBloomUp.ts` | "PRESENT 507L" ✓ | **PRESENT · 2 src + 8 demo** | **LIVE → KEEP** |

**THE INVERSION (load-bearing for Band 1):** the dead-gate set is NOT "gates over absent code" (pass-1's premise). It is **release-gated PRESENT-but-dead engines**. `proof:dock-context` guards a present-and-dead 551L engine → the cleanest atomic delete (file + ratchet row + gate in ONE diff). `proof:dock-fission` guards a present-and-LIVE engine → KEEP. **A naive "downgrade the release-tagged dead gates" would strip enforcement from `dock-fission`/`bloom-up`/`metaball-bridge2` (all live).** The F6 gate→symbol map MUST be derived by `gates.mjs` parse, and the per-gate disposition computed from **real `(`-call-sites (src AND demo)**, NEVER name-presence. The §0′ table is itself a DERIVED artifact (a self-test re-greps it), not transcription.

---

## §B′ — THE LIVE CALIBRATION (the largest residual, BUILD-PROVEN this pass)

I served the running 4.2.0 demo (`npm run dev`, the demo imports `src/` == 4.2.0; `reducedMotion:no-preference`, light), captured 5 roster routes + a 6-hop walk, and pixel-read them with the repo decoder leaf (`oklabFromRgb`) plus the pass-2 hue/chroma-max/top-bar extension. **The measured reproduction table — this is the binding born-RED reality, not the pass-1 hand-list:**

| Pass-1 named born-RED defect | Live measurement | Verdict |
|---|---|---|
| **Field non-warm cast** | root field `meanHue 9-11°` (RED, center+full AGREE), substrates `350°/4.4°` (magenta-red), forms `61-64°` (warm-OK) — all `meanChroma 0.018-0.052` | **REPRODUCES (HUE cast) on root + substrates** → band on `meanHue ∈ [25,95]` **with a chroma-gate + region-agreement** |
| **Metallic field `chroma 0.115-0.155`** | every field region `meanChroma 0.018-0.052`; `chromaMax` peaks 0.16-0.18 are **isolated legit aurora/swatch pixels** | **DOES NOT reproduce as a regional MEAN** → the field defect is **HUE, not chroma-magnitude**; `chromaCeiling` is a CONTENT guard, not the cast detector |
| **Dock edge-cast `rgb(49,0,0)`** | dock left-edge `meanHue 42-77°` warm, no `R≫G≈B≈0` signature, edgeCastFraction ≈0 on every live route | **PHANTOM on live HEAD** → re-localize to the exact cartoon-shadow surface/state OR DECIDE-fixed + ledger-trigger |
| **Top-bar strip** | `topDelta 0.16-0.20` on root/foundations/forms, `0.03-0.08` on dock/substrates | **REPRODUCES on static-wash routes** → band on `topBarStrip topDelta ≥ 0.10`, but must localize defect-hairline vs legit masthead |
| **Routing strand (articles≠1)** | ALL 5 routes + ALL 6 hops: `mainArticles==1`, `mainChildren==2` ([scroll-progress, article]) | **PHANTOM on live HEAD** → predicate fix + self-test-driven born-RED (not the live tree) |

**THE CONVERGENCE-CRITICAL CONSEQUENCE:** pass-1's born-RED bar would have **born-GREEN on 3 of 5 named defects** (edge-cast, metallic-chroma-mean, routing-strand) — failing the convergence bar ("MUST fail the broken UX"). Banding on a phantom is theater. Pass 2 re-states the bar around **what actually reproduces** and quarantines the phantoms.

### §B.1′ — The decoder, hardened (the measurement-validity fix)

`reflect-capture-verify.mjs::pngRegionStats` discards per-pixel `a,b` at L269. The pass-2 extension accumulates them (`meanA/meanB → meanHue = atan2(b,a)·180/π`) + a running `chromaMax` + the strip/edge spatial helpers — ~one decoder, no new color-math (the canvas-unify discipline). **Three corrections over pass-1's predicate table, each anchored to the live numbers:**

| Predicate | Pass-2 math (corrected) | Live anchor |
|---|---|---|
| `meanHue=lo..hi` | reported **ONLY where `meanChroma ≥ 0.025` AND `\|center−full\| ≤ 15°` (region-agreement)**, else `meanHue=undefined` and the band SKIPS | dock-overview center reads `249°` and full reads `346°` at chroma 0.019 — **noise**; the gate must not band on it. root center `9°`/full `11°` AGREE at chroma 0.035 — a **real** red cast |
| `chromaCeiling<=v` | a CONTENT-leak guard on the field probe (`meanChroma ≤ 0.10`), NOT the cast detector | every field mean ≤ 0.052; a saturated swatch leaking into a field probe (chromaMax 0.18) would lift the mean past 0.10 — the guard catches a mis-placed probe, not the metallic field |
| `edgeCastFraction` | fraction of pixels in a **tight ≤6px band outside the plate bbox** matching `R∈[25,90] ∧ g≤20 ∧ b≤25 ∧ R>2.5g ∧ R>2b` | a wide band dilutes the real `rgb(49,19,8)` cast to 0.02 (the clean boundary); **tight band only**; synthetic `rgb(49,0,0)`=1.0, clean<0.02 |
| `topBarStrip` | `\|row(y=1) − row(y≈6%h)\|` content-width DELTA-vs-field, NOT absolute chroma | RED `≥0.10`; root/foundations/forms `0.16-0.20`, dock/substrates `0.03-0.08` |
| `cornerClip` / `glassyByBleed` | DERIVE live from the dock-pill + scroll-card roster (variance-over-busy-backdrop, never an α test) | plate stdev 0.074 / blob 0.118 / aurora 0.217 |

Each predicate ships a born-RED self-test bite (synthetic violator MUST RED, clean control MUST pass) **AND a measurement-validity bite**: a low-chroma warm plate (`chroma 0.03`, hue noise) must NOT trip a `meanHue=56..68` band (pass-1's predicate would have read noise and false-RED'd every translucent glass surface).

### §B.2′ — The DEFECT-LOCALIZATION-MAP is the new binding deliverable

`BG.W-PAINT-IS-THE-GATE`'s acceptance artifact is **`docs/tranches/BG/audit/reflect/DEFECT-LOCALIZATION-MAP.md`**: per band, the exact `(route, fractional-region, colorScheme, interaction-state)` where it reds on a live served capture, the measured number, and the calibrated threshold-with-margin. The bands are **calibrated from this map, never hand-set**. Rules:

- A named defect that reproduces somewhere → a roster row with the localized probe + the live-calibrated band (the field-HUE cast on `/` and `/substrates/aurora`; the top-bar strip on the static-wash routes).
- A named defect that reproduces **NOWHERE** (edge-cast, routing-strand, metallic-chroma-mean at HEAD) → **DECIDED `MET`/`FIXED-OR-PHANTOM` in the FOLD-LEDGER with a re-enable trigger** (the self-test bite keeps the predicate honest so a regression re-reds), **removed from the live born-RED bar**. No banding on a phantom.
- The born-RED proof is **the field-HUE cast + the top-bar strip reproduced on a fresh served capture the building agent did not author** — the convergence bar is met by a REAL reproduction, not a synthetic PNG and not a phantom.

---

## §A.4′/§G′ — REAL SAFARI + THE BUILT-DIST SERVE (the §A.4 mechanism does not exist at HEAD)

**Pass-1's §A.4/§G.4 premise is FALSE at HEAD:** there is no autoprefixer, the demo imports `src/` (unprefixed), and **there is NO demo-consumes-dist target** — `dist/styles/index.css` carries **0** `-webkit-backdrop-filter` pairs (only `dist/glass-ui.css` carries the build-injected pairs, via `vite.style-assets.ts:497`). "Serve the BUILT dist so the `-webkit-` pair is the surface under test" has no working mechanism. Two corrections:

- **§A.4′ — Build the demo-dist target (the real fix).** `BG.W-SAFARI-PARITY-GATE` ships a minimal `demo/vite.demo-dist.config.ts` that aliases `@mkbabb/glass-ui → dist` and imports the built `@mkbabb/glass-ui/styles`, plus a `vite preview`-able build of the demo against it (there is no `preview` script today — `package.json scripts.preview` is undefined; add `demo:dist:build`/`demo:dist:serve`). The **real-Safari arm serves THIS target** so the shipped `-webkit-backdrop-filter` path is what Safari computes. The **live-PAINT arm (the paint oracle / `--run pi`) serves the SRC demo** (the authored UX a consumer builds) — the two surfaces are split by concern and the split is stated, not pretended away.
- **§G.2′ — The real-Safari arm is FEASIBLE; the version-coverage gap is recorded.** `safaridriver` is present (`/usr/bin/safaridriver → /System/Cryptexes/App/usr/bin/safaridriver`), Safari **26.4** / macOS **26.4.1** — the exact engine the directive wants. The arm runs `safaridriver`/WebDriver against real Safari on the Mac close machine (Phase-1 only; `release.yml` ubuntu has no Safari), reading **computed `backdrop-filter` on every `.glass-*` tier** (wash/quiet/resting/floating/overlay + dock + control-surface), asserting `/blur\(/` (the var()-in-`-webkit-` reality, MDN #25914), confirming goo paints (`GooFilter` regular `filter:url()` — WebKit-safe), and recording lens-degrades-gracefully (`@supports(backdrop-filter:url())` FALSE → blur base intact, bug 245510 OPEN). **Preconditions are a documented close-machine setup, NOT in-ceremony steps:** one-time `sudo safaridriver --enable` + Safari Develop → "Allow Remote Automation"; single-session sequential (no parallel). If `safaridriver` is non-deterministic in the ceremony, a **documented manual real-Safari capture** stands in (the verdict still writes into the attestation). **The version-coverage caveat is binding:** certifying var()-in-`-webkit-backdrop-filter` on Safari 26.4 ALONE does not cover Safari ≤18 — `CONSTRAINTS.md` records the **Safari-version matrix** (the close machine's version + the §G.3 constraint scoped to "the recorded version"); a single-version point-sample greening a fix that doesn't hold on ≤18 is its own green-lie. If the computed read REDs on real Safari, that is a **WS3 literal-bake fix** (resolve `var(--glass-blur-*)` to a literal in the shipped `-webkit-` arm; honest trade — Safari loses per-instance `--glass-level` retune but KEEPS the blur floor), recorded as a FOLD-LEDGER row, never waved through.
- **§G.8′ — Quarantine the falsified "appears FIXED."** Any prior-art spec/test asserting "modern WebKit ACCEPTS `backdrop-filter:url()`, renders equivalent to Chromium" (the Playwright-proxy green-lie) is DELETED. The Playwright `webkit` project stays SCOPED to its proxy role (CI no-flash + WebGL-degrade); it MUST NOT certify the lens decision or the C-SAFARI directive. The CUT requires the **real-Safari** `webkit.glass==pass AND webkit.goo==pass` verdict, never the proxy.

---

## §A.5′ — THE SHIP-SEQUENCING, WIRED (deadlock-resolved)

`release.sh`: porcelain clean-check L60 (TOP) → `--run full` L84 → `git tag` L93. `--run ship` dirties the tree (writes `SHIP-ATTESTATION.json`) → it must land **before** the porcelain check, with its own commit re-cleaning the tree. The wired order (a NEW block inserted before L59):

```
release.sh (Mac, CI UNSET):
  1. fresh /tmp worktree (siblings + precepts-submodule absent)
  2. build dist + build demo-dist target (§A.4′)
  3. gates.mjs --run ship              ← serves SRC demo (paint) + demo-dist (Safari);
                                          writes SHIP-ATTESTATION.json to docs/ (OUTSIDE
                                          every surface-path closure — §A.6 self-ref guard,
                                          so its commit cannot G7-revoke a surface)
  4. git add docs/.../SHIP-ATTESTATION.json && git commit   ← tree re-clean
  5. [existing] git status --porcelain clean check (L60)    ← now passes
  6. [existing] gates.mjs --run full (L84)                  ← re-validates the committed tree
  7. user gate · git tag (L93) · push
release.yml (ubuntu, post-tag, device-free):
  gates.mjs --run full → proof:ship-attestation (NEW, between L55 and publish L57) → npm publish --provenance
```

`proof:ship-attestation` (release-tagged, **does NOT import `liveArmCiGraceSkip` — absence-is-FAIL not skip-is-pass**): SHIP-ATTESTATION.json EXISTS; recompute the DERIVED paint-source `surfaceHash` at HEAD === the embedded hash; **re-apply the BG band grammar (`parseExpect`/`evalBand`, pure) to the EMBEDDED per-surface pixel digest** (a forged JSON's numbers fail the re-applied bands OR the hash); `webkit.glass==pass AND webkit.goo==pass`; the self-reference guard (the attestation path is outside every surface closure). A self-test proves: (a) the ordering does not deadlock, (b) a `--run full`-only / re-stamp-only close REDs (extend `proof-close-battery-parity.mjs`'s detector to require a `--run ship` arm beside `--run full`, AND RED a close that short-circuits at the `test` step — the live BD P10a defect: 4.2.0 shipped with 17 failing unit tests + the battery short-circuiting at `test`).

**§A.2′ — Trust anchor, resolved (theater-or-anchor fork → answered).** Phase-2 binds `runnerIdentity` to the OIDC `id-token: write` `release.yml` **already carries** (L33, for `--provenance`) — `authoredBy` (git committer) ≠ the OIDC actor is genuinely same-identity-fenced at CI; the same-identity-REDs self-test is build-provable against that field. **Phase-1 (Mac close) has NO orchestrator-injected write-fenced token** (grep `runnerIdentity`/`CLOSE_TOKEN` empty). Per the spec's own fork: **DROP the `authoredBy≠runnerIdentity` check on the Phase-1 path with an explicit FOLD-LEDGER trigger row** (re-enable when an orchestrator token lands) rather than ship an always-pass theater field. The trust spine on Phase-1 is the embedded-digest re-application + the content-hash, which a hand-write cannot forge without a real shoot.

---

## §D′ — F0 FORWARD-COMPLETENESS, ACCESSOR-DISAMBIGUATED (the "32" is the bug it warns about)

The corpus is DERIVED at gate time, never transcribed. The pass-1 brief's "AX=32 not 31" is **itself a drift** — it counts the JSON's `selfTest` fixture (which carries its own `id`) as a disposition row. Disk: `items[].length === 31`; `grep '"id"' === 32`. **F0 pins ONE accessor per corpus and ships the brief's wrong "32" as the FIRST self-test bite** (a hand-authored count disagreeing with the disk accessor MUST RED):

| Corpus | Accessor (DERIVED) | Count @ HEAD |
|---|---|---|
| AX register | `JSON.parse(REGISTER).items.map(i=>i.id)` — **EXCLUDE `selfTest`** | **31** (not 32) |
| BF DEFERRED-CENSUS | `D[0-9]+` regex over `BF/audit/DEFERRED-CENSUS.md`, unique | **32** (D1–D32) |
| BE+BF wave-ids | `readdir(BE/waves)+readdir(BF/waves)` `^B[EF].W-` | **70** (39+31; prose's 69 stale) |
| in-src books | strict `CONSUME(` (1) + `BOOKED:` (2 files) markers — **EXCLUDE bare `successor`** (7 noise hits, narrative prose) | grep-DERIVED |

`expectedCount = |bfCensusIds ∪ axRegisterIds ∪ waveSpecIds ∪ inSrcMarkers|` — a DERIVED invariant, RED if any derived id lacks a DECIDED FOLD-LEDGER row. Self-test bites: the AX `selfTest` fixture id MUST NOT become a required row; a prose "the booked successor" sentence MUST NOT become a required row; the brief's literal `32` for AX MUST RED. The rest of F1–F7 (clone `proof-bc-fold-ledger.mjs`'s `waveSpecExists`/band-DERIVED/register-derived primitives FORWARD, `file#marker` not `file:LINE`, the F6 gate-parse meta-clause) is pass-1's, unchanged. **The hard `EXPECTED_COUNT=213` in the BC clone is the exact anti-pattern F0 replaces with the derived invariant.**

---

## §E′ — THE DEAD-MECHANISM RECKONING, RE-DERIVED (the §0′ inversion drives Band 1)

Atomic delete+gate-retire pairs, dispositions computed from §0′ call-sites:

- **DELETE clean (0 real call-sites, atomic file+gate+ratchet diff):** `useDockContextSilhouette.ts` (551L — drains its `proof-no-god-module.mjs` ratchet row AND retires `proof:dock-context` in ONE diff; do NOT delete only the gate — pass-1's plan would leave 551L dead+untracked); `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L, also REHOME — it is demo-only CSS mis-placed in `src/styles/`, move to `demo/stories/dock/`). **Two missed dead CSS files** (0 consumers, ship/import live): `src/styles/glass/liquid-enter.css` (252L, +drop `glass.css:73` @import), `src/styles/motion/morph-field.css` (229L, +drop `index.css:180` @import). The dead `useMorphField()` function body (~196L, exported-but-0-call-sites) — gut it, re-home the live `MORPH_SIGNATURES` table to `morphSignatures.ts`, drop the dead-engine re-exports. The dead tokens (`--corner-k-soft/-sharp`, `--corner-shape-card/-pill`, the 3 `--spring-timeline-*` CSS twins, all 0 `var()` reads) + their pinning gate clauses. The `selectableChipVariants.ts` alias shim.
- **RETIRE + drop exports (published-yet-dead):** `useHaptic.ts` (138L — drop the `src/index.ts:285` + `api/index.ts:370` exports; close the "exported" overfitting escape-hatch for vaporware).
- **KEEP (LIVE — pass-1 would have wrongly de-gated these):** `useDockFission` (2 src/2 demo), `useBloomUp` (2 src/8 demo), `metaball-bridge2` (live via `useDockOrientationMorph`). `proof:dock-fission`/`proof:bloom-up`/`proof:metaball-bridge2` guard real facilities — KEEP on release. `useCelebrationBurst` (PRESENT, gate already `["local","ci"]`) → DECIDE wire-≥2 or fold into CompletionSeal; the gate is already off release so no de-gate needed.
- **F6 meta-clause:** the gate→symbol map is DERIVED by parsing `gates.mjs` registrations+tags (multi-line objects — a hand-grep returns empty, the empirical proof of the parse mandate); the per-gate disposition is computed from real `(`-call-sites (src AND demo; per the overfitting-audit rule a private-demo consumer counts, which keeps fission/bloom-up live). A `release` gate over a <2-live-consumer symbol REDs.
- **The FLIP-ONE DRY collapse** (4 engines re-fork the `ElementMorph+springTimingFunction` rAF loop while the published kf `flipShared` is imported-and-ignored at `suite.ts:42`) is a **DECIDED FOLD-LEDGER disposition** pointing at a coordinated wave — WS7 names the gestalt, it does not unilaterally rewrite engines WS2/WS6 build on (risk #6).

**Band 1 lands BEFORE Band 2** (the oracle re-point) so the new live oracle never certifies code about to be deleted.

---

## §C′ / §F′ / §H′ / §I′ — UNCHANGED FROM PASS 1 (stated for completeness)

- **§C (roster surface-paths DERIVED)** stands: re-point `proof-ba-gestalt.mjs:70-73` BC→BG, surface-paths DERIVED by walking the router → SFC import graph → `@import` CSS graph → shader leaves (a route file outside the closure REDs; the `dock.css` 21-`@import` root and the `aurora.ts` 1-line barrel byte-stable-stale paths are killed). Shared with §A.6's self-reference exclusion.
- **§F (AX re-stamp)** stands, count-corrected: the **26 BC-stamped rows** (distribution BB:3/BC:26/BD:2 = 31) flip BC→BG **in place** (no delete, DERIVED-count loop), every `n:2` trigger re-evaluated, the 2 pending flips verified (`css-relative-color`→BB.W-DARK-INK-WARM, `styles-critical-split`→BB.W-CSS-CRITICAL — note BB, the audits' "BC.W-CSS-CRITICAL" is a phantom-dest the F2 clause catches). Re-stamp-without-decide REDs.
- **§H (constraint manifest + lighthouse)** stands, + the §G.3 Safari-version-matrix note + the one-GL-per-route ↔ Safari-no-flash coupling (WS1's "field everywhere" must be ONE offscreen-paused shell aurora or a static wash, never a 2nd live GL context). Re-pin lighthouse at the achieved number ONLY after WS1–WS6 land; promote `proof:lighthouse` + `proof:no-layout-animation` (CI-only today — the CLS root) into the release-eligible ship arm.
- **§I (new-capability census)** stands: DATE-CALENDAR BUILD-IF-CONSUMER-else-DEFER, CHART-FAMILY DEFER-with-trigger, DS-COMPLETE the census artifact — each verdict a FOLD-LEDGER row against the ≥2-consumer bar.

---

## FILES TOUCHED (delta over pass-1 §FILES)

**New:** `scripts/proof-bg-deferred-ledger.mjs` + `docs/tranches/BG/FOLD-LEDGER.{json,md}`; `scripts/proof-ship-attestation.mjs` + the `--run ship` dispatch; `scripts/proof-route-navigates.mjs` + spec; `scripts/proof-field-aurora.mjs`/`-previews-render.mjs`/`-uniform-blur.mjs` + π specs; `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + **`DEFECT-LOCALIZATION-MAP.md`** (the new born-RED witness); `scripts/proof-constraint-manifest.mjs` + `docs/tranches/BG/CONSTRAINTS.md` (incl. the Safari-version matrix); `scripts/proof-safari-parity.mjs` (SOURCE arm) + the real-`safaridriver` close arm; **`demo/vite.demo-dist.config.ts`** + `demo:dist:build`/`serve` scripts (the §A.4′ mechanism); `docs/tranches/BG/audit/DS-COMPLETENESS-census.md`; `docs/tranches/BG/waves/BG.W-*.md`.

**Modified:** `scripts/reflect-capture-verify.mjs` (hue+chromaMax+strip/edge helpers + **the chroma-gate + region-agreement guard**; the digest emitter); `scripts/proof-ba-gestalt.mjs` (BC→BG, DERIVED surface-paths, live in-process capture, the corrected predicates); `scripts/release.sh` (the §A.5′ ship-block before porcelain); `.github/workflows/release.yml` (`proof:ship-attestation` before publish, OIDC `runnerIdentity`); `scripts/gates.mjs` (register new gates; `--run ship`; the F6-parse dead-gate diff); `scripts/proof-close-battery-parity.mjs` (require `--run ship` + RED short-circuit-at-`test`); `package.json`; `scripts/lighthouse/floor.baseline.json` + `proof:lighthouse` tag promotion; `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (re-stamp in place); `tests-visual/playwright.config.ts` (webkit SCOPED to proxy).

**Deleted (clean break):** `useLiquidMorph.ts` + `liquid-morph.css` (rehome); **`useDockContextSilhouette.ts`** (atomic with its gate+ratchet row); `liquid-enter.css` + `morph-field.css` + their @imports; the dead `useMorphField()` body; `selectableChipVariants.ts`; the dead tokens + pin-clauses; the F6-identified dead-engine gate registrations; the `useHaptic` exports.

---

## THE BG.W-* WAVE BREAKDOWN (delta over pass-1)

**Band 0 (no-silent-drop, FIRST):** `BG.W-DEFERRED-LEDGER` (F0 DERIVED, accessor-disambiguated: AX `items[].id`=31 not 32, the "32" the first self-test bite) · `BG.W-BE-BF-LEDGER` (70 parity) · `BG.W-DISPOSITION-RESTAMP` (26 BC-rows BC→BG, n:2 re-eval, 2 flips verified).

**Band 1 (dead-mechanism, §0′-corrected, BEFORE Band 2):** `BG.W-SPIKE-DELETE` (silhouette 551L + liquid-morph 462L + liquid-enter 252L + morph-field 229L + useMorphField body + tokens + alias shim — atomic file+gate+ratchet diffs; rehome liquid-morph.css to demo) · `BG.W-JUBILANCE-DECIDE` (RETIRE useHaptic + drop exports; DECIDE useCelebrationBurst; record FLIP-ONE) · `BG.W-DEAD-GATE-SWEEP` (F6 gate-parse; DELETE `proof:dock-context` (dead engine) atomically; **KEEP** dock-fission/bloom-up/metaball-bridge2 (live); register-or-delete `proof:de-shadcn`).

**Band 2 (live-paint oracle, born-RED on what REPRODUCES):** `BG.W-PAINT-IS-THE-GATE` (the decoder + chroma-gate + **the DEFECT-LOCALIZATION-MAP** — the field-HUE cast on `/`+`/substrates` and the top-bar strip on static routes are the born-RED; edge-cast/routing-strand/metallic-chroma-mean DECIDED-phantom-with-trigger) · `BG.W-GESTALT-ROSTER-RE-POINT` · `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` (the §A.5′ wired spine + demo-dist serve + skip-REDs inversion + Phase-1 trust-anchor-DROPPED-with-trigger) · `BG.W-GATE-ROUTING-LIVE` (predicate FIXED: single `<article>`==1 not single-child `<main>`; poll-for-stability; the strand is a self-test born-RED, the live tree is GREEN today) · `BG.W-GATE-FIELD-AURORA` (warm-amber hue band, chroma-gated; retire `paper.css` conic/feTurbulence onto ONE offscreen-paused shell aurora) · `BG.W-GATE-PREVIEWS-RENDER` · `BG.W-GATE-UNIFORM-BLUR`.

**Band 3 (floors):** `BG.W-SAFARI-PARITY-GATE` (real-`safaridriver` arm + demo-dist serve + computed-`backdrop-filter` per tier + version-matrix + WS3-ledger-on-RED + proxy SCOPED + falsified-"FIXED" quarantined) · `BG.W-CONSTRAINT-MANIFEST` (+ Safari version matrix + GL↔flash coupling; lighthouse re-pin + tag promotion; `proof:no-layout-animation` → release).

**Band 4 (census):** `BG.W-DATE-CALENDAR` · `BG.W-CHART-FAMILY` · `BG.W-DS-COMPLETE` — each a FOLD-LEDGER verdict.

**Band 5 (honest re-cut, LAST):** `BG.W-CUT` (tag fires only after the ship arm passes against the served demos over the BG roster with the localized predicates, siblings-AND-precepts-submodule-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` verdict + the user gate; closes the BD P10a/P10c tail — 17 failing unit tests + short-circuit-at-`test` + the harden tail).

---

## THE ACCEPTANCE / REAL-PAINT-π BAR (re-grounded on measured pixels)

**Born-RED on the shipped 4.2.0 tree (against ACTUAL live captures, §B′):**
- `proof:ba-gestalt`/`proof:field-aurora` FAIL over the live `/` + `/substrates/aurora` field (`meanHue 9-11°`/`350°` outside `[25,95]`, chroma-gated + region-agreed — the REAL reproducing cast) and the static-route top-bar strip (`topDelta 0.16-0.20`).
- `proof:route-navigates` is **born-GREEN on the live tree** (articles==1 on all 6 hops); its born-RED is the **self-test bite** (a `page.setContent` stranded-heading fixture MUST flag oldGone) — the predicate is single-`<article>`, NOT single-child-`<main>` (which is permanently 2).
- The edge-cast, metallic-chroma-mean, and routing-strand predicates are **DECIDED phantom-with-trigger** in the FOLD-LEDGER — their self-test bites stay armed so a regression re-reds; they are NOT in the live born-RED bar.
- `proof:bg-deferred-ledger` FAILS (the DERIVED corpus is UN-DECIDED; the AX-`32`-literal and the prose-`successor` and the `selfTest`-fixture self-tests all RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / webkit verdict absent).

**GREEN only when** the field paints warm-amber `[25,95]` ≤ chroma-ceiling · the top-bar strip is gone · routing keeps single-`<article>` over ≥6 hops · every DERIVED deferred item is DECIDED · every `release` gate (DERIVED from the parse) locks a ≥2-consumer mechanism · **real Safari** paints blur on every `.glass-*` tier + goo (lens degrades-gracefully, version recorded) · the constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar. The committed-PNG path retires once that downstream re-application lands.

---

## OPEN RISKS (post pass-2)

1. **The top-bar strip: defect vs legitimate masthead.** `topDelta 0.16-0.20` reproduces, but the prototype must confirm whether `y=1px` is the `.demo-scroll-progress` invalid-`scroll()` hairline (a real defect) or the legit warm header band (not a defect). **Falsifier:** localize the strip's height; if it is the masthead, DECIDE-not-a-defect with a trigger.
2. **The real-Safari version coverage.** Safari 26.4 may resolve var()-in-`-webkit-backdrop-filter` (greening a fix that fails on ≤18). **Falsifier:** the computed read on the close machine + the recorded version; a RED is a WS3 ledger row.
3. **safaridriver determinism in the ceremony.** Preconditions are manual; the arm may need the documented-manual-capture fallback. **Falsifier:** run `safaridriver` end-to-end in the close ceremony once.
4. **The §A.5′ sequencing on the close machine.** The ship-write→commit→re-validate ordering must not deadlock the porcelain check. **Falsifier:** run release.sh's ship-block end-to-end.
5. **The field-cast probe must read FIELD, not content.** `field_full` blends cards + field; the localized probe must sample where only the field shows (margins/corners) so a warm card doesn't mask a red field. **Falsifier:** a corner-only probe vs the full-page probe on `/`.
6. **Sequencing (risk #6, unchanged).** Band 1 before Band 2; BG.W-CUT last.
