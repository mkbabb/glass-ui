# BG-WS7 — Quality · Coverage · Close (SPEC pass 4 — BUILD-AND-COMMIT, the empirical residuals)

> The close ORACLE must read **live paint**, the release TAG must **require** it on EVERY publish path, and **no deferred item may silently drop**. Pass 3 converged the structure + mechanism to ≈86% and left four empirical residuals build-owed. **Pass 4 is execution: land each residual on COMMITTED `tranche/BG` disk, registered in `gates.mjs`, green-on-fixed / red-on-broken from a reproduction the building agent did NOT author.** This spec INHERITS SPEC-pass3-converged.md whole (§J + §K stand, re-verified on disk this pass) and advances the unconverged frontier in §L — the new disk-verified findings that turn the converged design into a build that cannot ship broken a 4th time.

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0. Every file:line below re-verified against real disk this pass.

**The disk truth pass 4 starts from (re-verified @ 71e1c641):** the §J.1 scaffolding is STILL dangling (`scripts/lib/surface-closure.mjs` `??`, `scripts/proof-ba-gestalt.mjs` ` M` BG-re-pointed but uncommitted, `scripts/lib/critical-path-walk.mjs` ` M`); `scripts/proof-de-shadcn.mjs` `??` (WS4-owned). Every NEW gate is ABSENT (`proof-bg-deferred-ledger`, `proof-route-navigates`, `proof-field-aurora`, `proof-safari-parity`, `proof-ship-attestation`, `proof-constraint-manifest`, `lib/fold-ledger-core.mjs`); `runShip`/`--run ship`/`UNMASKED_RENDERER`/`PI_ANGLE` = **0 hits in `gates.mjs`**; `docs/tranches/BG/{waves,audit/reflect,FOLD-LEDGER.*,CONSTRAINTS.md,bg-gestalt-roster.md,DEFECT-LOCALIZATION-MAP.md,SHIP-ATTESTATION.json}` all ABSENT. The decoder extension is UNBUILT (`grep meanHue|chromaMax|lVar|topBarStrip` in `reflect-capture-verify.mjs` = 0).

---

## GESTALT GOAL

One sentence: **no `@mkbabb/glass-ui` version can be published — on the Mac `release.sh` path OR the `git push --tags`→`release.yml` path — unless a live in-ceremony render of the real demo, captured on a real GPU (`PI_ANGLE=metal`) and judged by structural pixel predicates the building agent did not hand-author, paints correctly AND a CI-verifiable freshness attestation proves that render is current; and every deferred item across BF/AX/BE/BF/in-src is DECIDED in one mechanically-derived ledger before any of it runs.**

The disease (shipped 3×): source-green ≠ paint-truth, and the live-pixel layer never touched the tag. The cure is four interlocking machines built in this order, every artifact on committed `tranche/BG` disk:

1. **F0 fold-ledger** (Band-0, FIRST) — no item silently drops a 4th time.
2. **Band-1 dead-mechanism cut** — DELETE/REHOME/COORDINATE the present-but-dead engines BEFORE the live oracle re-points (so it never certifies them).
3. **Band-2 live-paint oracle** — the decoder + roster + real-GPU PNGs that born-RED on 4.2.0 for the RIGHT (broken-pixel) reason from a non-self-authored capture, plus routing/field/ship.
4. **The `--run ship` spine + the freshness attestation** — the live capture wired as a HARD precondition of BOTH publish paths, fail-CLOSED.

---

## §L — THE PASS-4 ADVANCEMENTS (the disk-verified frontier, advancing §K)

§J + §K stand verbatim. §L is the binding refinement set pass 4 adds — each resolves a contradiction or closes a hole the build would otherwise hit. Every §L item is anchored to a re-verified disk fact.

### §L.0 — THE TAG-PUSH BYPASS IS THE #1 STRUCTURAL HOLE; close it FIRST (the load-bearing pass-4 advance)

Verified: `release.yml:30` is `runs-on: ubuntu-latest`, `:55` runs `node scripts/gates.mjs --run full` ONLY, `:57` runs `npm publish --provenance`. The maintainer's established publish path (MEMORY `project_publish_ci_broken`: "push the v* tag, release.yml does the gated provenance publish" — how 4.0.0/BC shipped) creates the tag via `git tag && git push`, which triggers `release.yml` and **BYPASSES `release.sh`'s ship-block entirely**. The Mac `--run ship` Metal capture lives ONLY in `release.sh`. **Therefore a Mac-only ship-block does NOT close C-PAINT — the tag-push path stays exactly as bypassable as the 3× disease.**

The closure is a TWO-ARM cardinal-lesson split applied to SHIP (the `proof:live-verified-ledger` precedent transposed: one arm proves the PAINT, the other proves the FRESHNESS device-free):

- **Arm A — the PAINT (Mac-only, by physics).** `release.sh`'s `--run ship` block captures live Metal paint over the BG roster and writes the per-region pixel DIGEST + `webkit.{glass,goo}` verdict + the DERIVED `surfaceHash` (sha256 over the surface-closure SOURCE bytes at the captured commit) into `docs/tranches/BG/SHIP-ATTESTATION.json`, then `git add`s + commits it. CI=SwiftShader cannot paint, so this arm is `release.sh`-local by necessity.

- **Arm B — the FRESHNESS (CI/anywhere, the bypass-closer).** `proof:ship-attestation` is registered **`["ci","release"]`** so `release.yml`'s existing `--run full` RUNS it on every tag-push publish. It REDs on:
  - **absent** — no `SHIP-ATTESTATION.json` → the tag-push path has no live-paint proof → RED (the 3× disease, now blocked on the path the maintainer uses);
  - **stale** — the embedded `surfaceHash` !== the `surfaceHash` recomputed over the CURRENT HEAD surface-closure SOURCE bytes → a re-stamp/frozen attestation against a changed surface (the BD 77-re-point shortcut) → RED;
  - **failed/skip/unverified verdict** — the embedded per-region digest fails the re-applied BG band predicates, or `webkit.glass/goo` !== pass → RED.

  Arm B is device-free (it re-applies `parseExpect`/`evalBand` to the EMBEDDED digest + recomputes a hash — no GPU), so it is a legitimate `ci`/`release` gate. It is the ONLY enforcer that binds the `git push --tags`→`release.yml`→`npm publish` path. **Without Arm B registered in the ci/release set, C-PAINT is theater.**

This makes the Mac-only-release friction EXPLICIT and intentional: every release whose captured surfaces' SOURCE changed needs a fresh `release.sh --run ship` ceremony on the Mac before the tag, because Arm B REDs a stale digest. A pure tag-push of a surface-changed HEAD without a fresh Mac ceremony cannot pass `--run full`. Recorded as a DECISION in `CONSTRAINTS.md` (§L.6), not a surprise at the cut.

### §L.1 — The field/metallic born-RED is the CHROMA-CEILING, not hue-band, not corner-variance (de-risks the WS1 coupling)

The reference research is decisive and resolves the open WS1 coordination: **the broken-4.2.0 metallic field is a CHROMA defect, not a hue defect.** The `paper.css:167-180` brown slab resolves OKLab C≈0.108–0.128 at H≈35–67° — WARM-hued, the SAME family as the cream `--card`. So:

- **hue-band CANNOT catch the metallic** (the slab is in-band warm) → `meanHue` is a chroma-gated CONTENT guard, never the field born-RED.
- **corner-variance CANNOT separate brown-slab from calm-aurora** (the slab has conic + radials + drift + grain → it ALSO has corner stdev) → `pngFieldVariance` demotes to a SECONDARY anti-FROZEN liveness check that fires ONLY after WS1 confirms a LIVE aurora (it separates live-GL from SwiftShader-frozen, NOT metallic from calm).
- **the robust, design-AGNOSTIC discriminator is the meanChroma CEILING.** The calm fixed field sits C ≤ ~0.05 (`--card` 0.0147; calm warm aurora over glass ~0.03–0.05); the metallic slab is ~0.12. The ceiling lands at the MEASURED ~0.06–0.08 (2× above the calm field, ~2× below the slab — the BC band's own 0.07 upper already rejects the slab). This is INSENSITIVE to WS1's aurora-vs-wash choice (both calm fields sit below it; only the metallic slab breaches it), so the field-π no longer waits on WS1 to pin its primary born-RED.

**Card-chroma recalibration (verified disk fact):** HEAD `--card = hsl(30 85% 96%)` → C=0.0147 H=70.9° — HEAD DOUBLED the chroma vs the CLAUDE.md-documented `hsl(36 48% 97%)` (C=0.0062). A ceiling/floor pinned to the OLD value false-REDs the current card. The warm-cream band must span the near-neutral card (C~0.015) AND a calm chromatic field (C~0.03–0.05) in the OKLab hue window [56°,76°], BOTH modes (dark `--card` L~0.28, dark page L=0.146). Bind to the HEAD token, MEASURED — never the stale CLAUDE.md figure.

The chroma-ceiling is the Metal-only field SYMPTOM-π; `proof:field-aurora`'s SOURCE arm (§L.2) is the device-free CI/release born-RED. The two are complementary.

### §L.2 — `proof:field-aurora` SOURCE arm counts SIMULTANEOUS field painters, not raw refs

Verified 3-stack: `AppShell.vue:360` UNCONDITIONAL `<PaperBackdrop field :field-hue="fieldHue" class="fixed inset-0 -z-10" />` (every route) + `StoryHero.vue:267/274/283` per-route `<Aurora>`/`<Constellation>`/`<FourierField>` (MUTUALLY EXCLUSIVE — one kind paints per route) + `DockStage.vue:59` `<Aurora class="dock-stage-field">`. The SOURCE arm must count **field systems that can SIMULTANEOUSLY paint the route root** — the AppShell unconditional full-bleed `-z-10` plane + ANY route-level field = > 1 → RED. A naive grep over StoryHero's 3 branches OVER-counts (they are exclusive). The arm reads: "≥1 unconditional shell field" + "≥1 route-reachable field" ⇒ RED. Device-free, deterministic, born-RED at HEAD, CI/release-able.

### §L.3 — The top-bar-strip predicate is L-delta-PRIMARY both modes (resolves the 0.069-vs-0.16 contradiction)

The D5 hairline (`AppShell.vue:393 .demo-scroll-progress` + `scroll-driven.css:45` emit an invalid `scroll(--demo-main-progress block)` → `animation-timeline: auto` → `scaleX(1)` full-width 2px @ op0.85). The predicate is `topDelta` = |meanL(top-strip) − meanL(row-just-below)|, PRIMARY in BOTH modes:
- LIGHT: warm-ink near-black bar L=0.216 over warm page L~0.95 → topDelta ≈ 0.73.
- DARK: legendre-violet bar (`dark-arm.css:92` `--primary` oklch(0.739 0.134 318)) L=0.739 over near-black page L=0.146 → topDelta ≈ 0.59, PLUS chroma-spike (0.135 vs ~0.006) PLUS hue-out-of-warm-band (318° magenta).

`topDelta` (L-delta) is the PRIMARY both modes (a pure-chroma predicate misses the light near-black bar); chroma-spike + hue-out-of-band are dark-mode CORROBORATORS. The threshold is MEASURED from the broken-vs-fixed Metal pair, recorded in `DEFECT-LOCALIZATION-MAP.md` — the 0.069-vs-0.16 pass-1/pass-2 contradiction is resolved by measuring `topDelta`, not an absolute.

### §L.4 — The routeSeeds HARD-RED gap in the landed P6 leaf (reconcile in the §J.1 commit diff)

Verified `surface-closure.mjs:153-167`: `routeSeeds()` matches `/cat` or `/cat/story` and **silently skips** a 2-segment `/cat/story` that resolves to no SFC (line 161 `if (existsSync(...)) seeds.add`; the docstring even documents the skip as intended for prose like "the shell BottomDock"). The §C″ HARD-RED demands a route file OUTSIDE the derived closure RED. The reconcile (lands in the §J.1 commit, since the leaf is committing now): **a cell token matching the 2-segment `/cat/story` story pattern whose SFC does NOT exist on disk is a HARD-RED** (a real story slug MUST resolve — a typo'd route must not vanish from the watched surface), while a 1-segment `/cat`→SectionLanding stays fine and free prose WITHOUT the slash-pattern produces no match (the legit "BottomDock" case). The discriminator is the 2-segment match × `!existsSync`; the self-test plants a `/dock/typoo` HARD-RED and a "the shell BottomDock" GREEN.

### §L.5 — Band-1 "dead deletes" are ENTANGLED — re-scope to three shapes (verified)

The audit's "DELETE dead engines" framing understates entanglement. Three verified shapes:

- **`useDockContextSilhouette.ts` (551L, 0 real imports — only a COMMENT at `AppSwitcher.vue:3`) IS the Siri context-switch state-machine** (`proof:dock-context@269` frames it as the engine driving fission+bloom; `DynamicIslandCall.vue`/`AppSwitcher.vue` are the Siri-island surfaces — WS6 C-SIRI's exact domain). → a **DECIDED coordinated-wave FOLD-LEDGER row** (dest a coordinated `BG.W-*` shared with WS6), NOT a unilateral WS7 delete. If WS6 has no live consumer at its close, the coordinated row resolves to RETIRE; until then WS7 records the coordination, does not unilaterally cut. The gate `proof:dock-context` rides the same DECIDED row.

- **`useMorphField()` is NOT dead** — `MORPH_SIGNATURES` (lines 56-161) has 5 src consumers (`useGooMorph.ts`, `GooFilter.vue`, `useDockFission.ts`, `core/index.ts`, `src/index.ts`). → a **gut-and-rehome refactor** (extract the ~100L `MORPH_SIGNATURES` data block to `morphSignatures.ts`, re-point the 5 consumers + the `src/index.ts:242` export, delete the ~307L dead `useMorphField()` body + handle + its dead public exports), ONE diff. NOT a clean delete.

- **`useHaptic.ts` is PRESENT (6325B, verified) and `proof-haptic.mjs` is PRESENT** (the `proof:haptic-couple` cmd resolves to `scripts/proof-haptic.mjs`, NOT the absent `proof-haptic-couple.mjs` — the gate is NOT a phantom-script; the tranche-history "ABSENT" claim is the stale path-typo class). → **adjudicate with a REAL `useHaptic(`-call-site grep**; if zero real binary consumers (the J-inv-10 bar — the gate's H5 claims ≥2 via a consumer-evidence DOC, which the adjudication must VERIFY against actual call-sites), RETIRE-with-rationale + drop the `src/index.ts:285` + `api/index.ts:370` exports (clean break, no alias). Correct the stale "ABSENT" verdict in the ledger.

KEEP (verified LIVE): `useBloomUp` (9 importers), `useDockFission` (4), `useCelebrationBurst` (2). `selectableChipVariants.ts` (pure alias) deletes clean. `liquid-morph.css` (850L, verified demo-only) rehomes to `demo/stories/dock/`.

### §L.6 — Safari: RE-MEASURE the P4 set, version-scope the answer, record the Mac-release decision

- **P4 figure is UNVERIFIED — RE-MEASURE.** `grep "color-mix(in oklab"` in `src/styles` = **103 total / 10 with `transparent`** (the spec's "8" and the codebase-deep "53" are both wrong for THIS scope). The P4 detector targets a GRADIENT with a bare 0-alpha/`transparent` stop (the WebKit premultiply-toward-black trap), NOT a standalone single-`color-mix`. The allowlist count is DERIVED from the detector's actual scope at build time and the green-on-clean run output enumerates EVERY matched site — never a hardcoded "8". Green-on-clean must NOT RED on any of the 10 single-mix sites.
- **P3 landmine (verified):** `glass-fx.css:137 --glass-edge-light-dark: inset 0 0 0 0.75px hsl(0 0% 100% / 0.22)` is a token NAMED `…-light-dark` with an inset VALUE, NOT a `light-dark()` FUNCTION call; ~10 `light-dark(...inset...)` occurrences in `src/styles` are all explanatory COMMENTS. P3 `stripComments` first (reuse `proof-safari-webgl.mjs:70`), then match the `light-dark(` FUNCTION with `inset` INSIDE the parens — never the token name nor a comment.
- **CONSTRAINTS.md** records: var()-resolution GREEN version-26.4-scoped; container-style-query `@container style(--glass-backdrop: light)` landmine triggers only Safari <18 (the WS3 literal-bake trigger); `backdrop-filter: url()` is Safari-IMPOSSIBLE (bug 245510 OPEN 2026-06-12, re-confirmed) → the lens is `@supports`-gated PE (already correct at `glass-refract.css:106`) and the goo/fission/pager-worm paint on Safari via REGULAR `filter: url()` (already correct, `fission-bridge.css:27` &c.); the Mac-only-release decision (§L.0).
- **safaridriver-or-DROP** — attempt `sudo safaridriver --enable` + Allow-Remote-Automation end-to-end; if blocked non-interactively (the realistic outcome — AllowRemoteAutomation UNSET at HEAD), the Safari PAINT verdict is DROP-WITH-TRIGGER + the SOURCE arm only (`webkit.glass/goo` ride P1-P5), never a self-cert screenshot.

### §L.7 — The close-battery clause-3 + prefix-anchor (both clauses, verified)

Verified `proof-close-battery-parity.mjs:73` (clause 2, `releaseSh.match(/scripts\/gates\.mjs\s+--run\s+\w+/)?.[0]`) AND `:79` (clause 3, `releaseYml.match(/gates\.mjs\s+--run\s+\w+/)?.[0]`) — BOTH use `.match()?.[0]` first-match. Once `--run ship` precedes `--run full`, BOTH false-RED. Pass-3 named only clause-2; pass-4 fixes BOTH with `matchAll` requiring `ship ∧ full` both present. ADDITIONALLY: clause-3's regex has NO `scripts/` prefix while clause-2's DOES — anchor the prefix consistently so a bare `gates.mjs --run X` is not silently dropped (a latent false-GREEN). Upgrade clause-5 from source-presence to the §J.7 synthesize-a-short-circuit-at-`test`-and-assert-REDs structural self-test.

### §L.8 — The demo serve port + demo:dist scripts land BEFORE the ship-block demands them

Verified: `package.json` has only `dev=>vite` (vite defaults :5173); `runPi`/`runShip` assume `:5199` via `GLASS_UI_DEMO_URL ?? :5199` and fail-CLOSE on an empty/foreign port. `demo:dist:build` is genuinely absent (`set -euo pipefail` aborts `release.sh`). LANDING ORDER (the §K.4 sequence, made concrete): land `demo:dist:build` + a serve recipe that binds `:5199` explicitly (`vite --port 5199`/`vite preview --port 5200` for demo-dist) + `runShip()` + `proof:ship-attestation` FIRST; the `release.sh` ship-block + the close-battery `--run ship` requirement land LAST (born-RED→GREEN against a real ceremony).

### §L.9 — The born-RED ground-freeze precedes WS1/WS3 integration (RISK 3, sequencing)

The born-RED needs broken-4.2.0 PAINT, but WS1 routing/field + WS3 gray/blur land on the SAME `tranche/BG` branch. **Capture + COMMIT the Metal born-RED PNGs at `71e1c641` (or shoot from the pinned `998136bb` 4.2.0 build) BEFORE any sibling-WS fix integrates** — the broken ground evaporates the moment WS1/WS3 land. Persist as committed `DEFECT-LOCALIZATION-MAP` fixtures with the measured `meanChroma`/`topDelta` margins. Confirm `chromium-headless-new` emits exactly 1280-wide desktop captures (else relax/document `DESKTOP_FULL_WIDTH=1280` at `reflect-capture-verify.mjs:58` so the RED fires for broken-paint, not narrow-capture → a circular born-RED for the wrong reason).

### §L.10 — Band-4 census verdicts (build-or-defer, each a genuinely-adjudicated FOLD-LEDGER row)

- **BG.W-CHART-FAMILY → BUILD** a thin token-driven SVG chart primitive consuming the existing `--chart-*`/`--viz-*` ramp + the phase-bus (Recharts/Tremor are React + own-tokens — adopting them breaks the Vue/token-first identity; the SOTA lesson is "own the SVG, consume the ramp"). ≥2-consumer bar: demo + the booked speedtest cross-repo consume.
- **BG.W-DATE-CALENDAR → BUILD** on reka-ui's headless `Calendar`/`DatePicker`/`RangeCalendar` (the SAME substrate as Dialog/Select — DRY), the iOS roll-wheel signature; do NOT port react-day-picker (React, v9≠v8 churn).
- **The tail** (Kbd/Breadcrumb/Stepper/TreeView/AspectRatio/Resizable/ScrollArea/FileUpload/Rating/Menubar/Pagination) → **DEFER** with recorded rationale (no ≥2 consumer at HEAD).

These ride PAST the four close residuals (they are coverage, not the close machine); their FOLD-LEDGER rows land with verdicts, the BUILDs are Band-4 work after Band-2/3.

---

## MECHANISM (the build order, §K + §L folded)

**Band 0 (no-silent-drop, FIRST):**
- §J.1 commit the dangling scaffolding (`surface-closure.mjs` + the BG-re-pointed `proof-ba-gestalt.mjs` + `critical-path-walk.mjs`) in ONE diff that INCLUDES `bg-gestalt-roster.md` (else `proof:ba-gestalt` `["local","ci","release"]` RED-fails `--run full`/CI on `[ROSTER-PRESENT]`). Fold §L.4 routeSeeds HARD-RED into the same diff. A fresh-clone import check (`proof-ba-gestalt.mjs:75` already imports the untracked leaf) is the acceptance bite.
- §K.5 + §L.5: extract `fold-ledger-core.mjs`, refactor BC onto it (green @ 213, no clone), build `proof-bg-deferred-ledger.mjs` (DERIVED corpus 136, AX 31-vs-32 first-bite, disjoint-namespace `expectedCount === Σ`, F0-scoped no-orphan, `file#KIND#slug`, canonical `CONSUME(...)`/`BOOKED:` grammar scoped to `.ts`/`.vue`), register Band-0 `["local","ci","release"]`, emit the genuinely-adjudicated `FOLD-LEDGER.{json,md}` (every row BUILD/RETIRE/MET/COORDINATED with a `(`-call-site grep + a destination-sound `BG.W-*` spec — never blanket-DEFER).

**Band 1 (dead-mechanism cut, BEFORE Band 2):**
- §L.5: `useMorphField` gut-and-rehome (5-site); `useHaptic` RETIRE (real-grep adjudicated) + drop exports; `selectableChipVariants.ts` alias delete; `liquid-morph.css` 462→demo rehome; `useLiquidMorph.ts` delete. `useDockContextSilhouette` + `proof:dock-context` = a DECIDED **coordinated-WS6** FOLD-LEDGER row (not a unilateral cut). KEEP bloom-up/dock-fission/celebration-burst/metaball-bridge2. F6 gate→symbol map by IMPORTing `gates.mjs` `GATES` behind `isMain`.

**Band 2 (live-paint oracle, born-RED on a non-self-authored reproduction):**
- §K.1: prove `runPi()` GREEN on a passing per-mechanism spec, BOTH projects (`chromium-headless-new` + `coarse-touch`), served on `:5199`.
- §K.2 + §L.1/§L.3/§L.9: decoder extension (meanHue/chromaMax/lVar + 3 region helpers + 3 guards, 15 bites, ONE decoder) + `DEFECT-LOCALIZATION-MAP.md` (MEASURED chroma-ceiling ~0.06–0.08 + `topDelta` margins from broken-vs-fixed Metal) + persisted real-GPU PNGs → `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction the agent did NOT author. Field SYMPTOM-π = chroma-ceiling (design-agnostic); corner-variance = secondary anti-frozen.
- §L.2: `proof:field-aurora` device-free SOURCE arm (SIMULTANEOUS-painter count) + the Metal symptom-π.
- §K.3: `proof:route-navigates` (`main > article` direct-child scope, real `--duration-fast=0.2s` leave, orphan-grace 2× resolved token, real green-on-fixed N=20==100%, committed + registered Band-2 `["ci","release"]`, CI-headless DOM).
- §K.4 + §L.0/§L.7/§L.8: the ship spine — in-tree edits, fail-CLOSED `runShip()`, `proof:ship-attestation` **registered `["ci","release"]`** (the §L.0 bypass-closer) with paint-teeth + freshness, `matchAll` BOTH close-battery clauses + prefix-anchor, `demo:dist:build`/serve scripts, sequenced born-RED→GREEN.

**Band 3 (floors):**
- §K.6 + §L.6: `proof-safari-parity.mjs` committed + registered Band-3, green-on-clean against the RE-MEASURED P4 set + the P3 light-dark-token landmine; `demo/vite.demo-dist.config.ts` (honest hybrid header, exercised once on Chromium :5200); `CONSTRAINTS.md` (six constraints + Safari version matrix + ≤18 WS3-bake trigger + Mac-only-release decision + GL↔flash coupling); `proof:constraint-manifest`. safaridriver-or-DROP. Promote `proof:lighthouse` (`["local"]`→+release) + `proof:no-layout-animation` (`["ci"]`→+release) release-eligible; re-pin `floor.baseline.json` at the BG-achieved number (median-of-N) ONLY after WS1–WS6 land.

**Band 4 (census):** §L.10 — DATE-CALENDAR / CHART-FAMILY (BUILD) / DS-COMPLETE (build-or-defer verdicts), each a genuinely-adjudicated FOLD-LEDGER row.

**Band 5 (honest re-cut, LAST):** BG.W-CUT — the tag fires only after `--run ship` passes against the served demos over the BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` (safaridriver-or-DROP) + the user gate. Closes the BD P10a tail.

---

## FILES TOUCHED (the committed-disk deliverable set)

**Band-0 commit (§J.1, FIRST):** `scripts/lib/surface-closure.mjs` (untrack→commit, + the routeSeeds HARD-RED arm §L.4) · `scripts/proof-ba-gestalt.mjs` (commit; purge the BC `REQUIRED_SURFACES` L94-110 + all "BC"/"BC-touched" comments — re-derive the required-surface set from the BG roster routes, §K) · `scripts/lib/critical-path-walk.mjs` (commit) · `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (+ per-surface `<surface>.md` hash records, surface-paths DERIVED).

**Band-0 F0:** `scripts/lib/fold-ledger-core.mjs` (NEW, extracted) · `scripts/proof-bc-fold-ledger.mjs` (refactor onto core, green @213) · `scripts/proof-bg-deferred-ledger.mjs` (NEW) · `docs/tranches/BG/FOLD-LEDGER.{json,md}` (NEW) · `gates.mjs` (register Band-0) · `package.json` (proof:bg-deferred-ledger script).

**Band-1:** `src/composables/motion/morphSignatures.ts` (NEW, extracted) + the 5 re-points + `useMorphField.ts` gut · `src/composables/motion/core/useHaptic.ts` delete + `src/index.ts:285`/`api/index.ts:370` export drops · `src/components/custom/selectable-chip/selectableChipVariants.ts` delete + 2 re-points · `demo/stories/dock/liquid-morph.css` (move) + `demo.css:125`/`dock.css:59`/`critical-partition.mjs:174` re-points · `src/composables/motion/useLiquidMorph.ts` delete · `gates.mjs` (coordinated-WS6 `proof:dock-context` row decision) · ratchet rows.

**Band-2:** `scripts/reflect-capture-verify.mjs` (decoder extension IN-PLACE: meanHue/chromaMax/lVar in `pngRegionStats`'s loop + 3 region helpers + 3 guards; relax/document `DESKTOP_FULL_WIDTH`) · `scripts/proof-field-aurora.mjs` (NEW) · `scripts/proof-route-navigates.mjs` (NEW) · `scripts/proof-ship-attestation.mjs` (NEW, FIRST) · `scripts/lib/gl-renderer-probe.mjs` (NEW, UNMASKED_RENDERER) · `scripts/gates.mjs` (`runShip()` dispatch before L2472, Mac-only fail-CLOSED; register the 4 gates; `proof:ship-attestation` `["ci","release"]`) · `scripts/proof-close-battery-parity.mjs` (matchAll BOTH clauses + prefix-anchor + clause-5) · `docs/tranches/BG/DEFECT-LOCALIZATION-MAP.md` (NEW, measured) · `docs/tranches/BG/audit/reflect/*-{light,dark}-desktop-full.png` (Metal born-RED, committed) · `package.json` (demo:dist:build/serve, the 4 proof scripts).

**Band-2 release.sh:** `scripts/release.sh` (ship-block before L60 porcelain) — LAST in the Band-2 sequence.

**Band-3:** `scripts/proof-safari-parity.mjs` (NEW) · `demo/vite.demo-dist.config.ts` (NEW) · `docs/tranches/BG/CONSTRAINTS.md` (NEW) · `scripts/proof-constraint-manifest.mjs` (NEW) · `gates.mjs` (register Band-3; promote lighthouse + no-layout-animation release) · `scripts/lighthouse/floor.baseline.json` (re-pin, after WS1-6) · `package.json`.

**Band-4:** `src/components/custom/chart/*` (NEW) · `src/components/custom/calendar/*` (reka-ui) · `docs/tranches/BG/DS-COMPLETENESS-census.md` (NEW) · FOLD-LEDGER rows.

**All waves:** `docs/tranches/BG/waves/BG.W-*.md` (the dir does not exist — create each wave spec; the F0 destination-soundness clause REDs on a phantom dest).

---

## THE BG.W-* WAVE BREAKDOWN (each carries its validated mechanism + real-paint-π bar + folded deferred items)

**Band 0:**
- **BG.W-DEFERRED-LEDGER** (§K.5+§L.5) — DRY `fold-ledger-core.mjs`, DERIVED corpus 136, AX 31-vs-32 first-bite, disjoint-namespace assert, F0-scoped no-orphan, canonical-marker grammar (`.ts`/`.vue` scoped — `border-progress/README.md:37` EXCLUDED), `file#KIND#slug`, genuinely-adjudicated `FOLD-LEDGER.{json,md}`. **π bar:** born-RED on the UN-DECIDED corpus + the AX-32-literal / non-canonical-book / selfTest-fixture / phantom-D99 self-tests; GREEN when every derived id is DECIDED with real evidence; the entangled Band-1 rows carry their REAL shapes (silhouette=COORDINATED-WS6, useMorphField=gut, useHaptic=RETIRE-real-grep).
- **BG.W-BE-BF-LEDGER** — 70-wave parity (39 BE + 31 BF; LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** — 31 BC→BG in place (DERIVED-count loop), n:2 re-eval, the 2 pending flips (`css-relative-color`→BB.W-DARK-INK-WARM, `styles-critical-split`→**BB**.W-CSS-CRITICAL with the BC-phantom F2 catch). Re-stamp-without-decide REDs.

**Band 1:**
- **BG.W-SPIKE-DELETE** — `useLiquidMorph` 462L delete + `useMorphField` gut-and-rehome (`morphSignatures.ts` + 5 re-points) + `selectableChipVariants` alias delete + `liquid-morph.css` 850L demo-rehome, atomic file+gate+ratchet diffs.
- **BG.W-JUBILANCE-DECIDE** — RETIRE `useHaptic` (real-grep adjudicated; `proof-haptic.mjs` exists so the gate is real — DECIDE the gate's fate WITH the mechanism) + drop exports; DECIDE `useCelebrationBurst` (KEEP, 2 consumers); record FLIP-ONE as a DECIDED coordinated-wave row.
- **BG.W-DEAD-GATE-SWEEP** — F6 gate→symbol map by IMPORT; `proof:dock-context` = COORDINATED-WS6 row (NOT a unilateral delete); KEEP dock-fission/bloom-up/metaball-bridge2 (live); the de-shadcn destination RECORDED (WS4/BG.W-DESHADCN-SWEEP), NOT homed in WS7.

**Band 2:**
- **BG.W-PAINT-IS-THE-GATE** (§K.1+§K.2+§L.1/§L.3/§L.9) — the `runPi()` instrument proven; the decoder + chroma-gate + measurement-validity bite + `DEFECT-LOCALIZATION-MAP` (MEASURED chroma-ceiling + topDelta) + persisted real-GPU PNGs. **π bar:** `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction the agent did NOT author (top-bar D5 `topDelta` ≥ measured margin; field meanChroma-CEILING ≥ measured); the all-PASS-re-shot-broken-UX regression bite STILL REDs (BD 77-re-point shortcut blocked); edge-cast / field-HUE-as-cast DECIDED-phantom-with-trigger.
- **BG.W-GESTALT-ROSTER-RE-POINT** (§C″+§K.2.4+§L.4) — surface-paths DERIVED from route files (routeSeeds HARD-RED), the roster `.md` shipped + run end-to-end, over-revoke disclosure, PNG↔hash scope boundary stated.
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** (§K.4+§L.0/§L.7/§L.8) — in-tree edits, fail-CLOSED `runShip()`, `proof:ship-attestation` **`["ci","release"]`** (the tag-push bypass-closer) with paint-teeth + freshness, `matchAll` BOTH clauses + prefix-anchor, `demo:dist` scripts, sequenced born-RED→GREEN against a non-self-authored ceremony, forgery-overclaim DROP-WITH-TRIGGER.
- **BG.W-GATE-ROUTING-LIVE** (§K.3) — `main > article` scope, 0.2s real leave, real-nav variant + startViewTransition resolution (same-category hops), real green-on-fixed, N=20 anti-flake one-time, committed + registered Band-2.
- **BG.W-GATE-FIELD-AURORA** (§L.1/§L.2/§K.7) — device-free SOURCE arm (SIMULTANEOUS-painter count, 3-stack born-RED) + chroma-ceiling Metal symptom-π (design-agnostic) + corner-variance SECONDARY anti-frozen (WS1-calibrated, fires only on a confirmed live aurora).
- **BG.W-GATE-PREVIEWS-RENDER** · **BG.W-GATE-UNIFORM-BLUR**.

**Band 3:**
- **BG.W-SAFARI-PARITY-GATE** (§K.6+§L.6) — committed + registered Band-3; green-on-clean re-proven against the `glass-fx.css:137` light-dark-token + the RE-MEASURED oklab single-mix landmine (10 in `src/styles`, enumerated); honest demo-dist hybrid header exercised once; safaridriver-or-DROP ladder; var()-resolution GREEN version-scoped; PAINT claims quarantined.
- **BG.W-CONSTRAINT-MANIFEST** — `CONSTRAINTS.md` (six binding constraints + Safari version matrix + ≤18 trigger + Mac-only-release decision §L.0 + GL↔flash coupling + iOS-26 a11y ceilings) + `proof:constraint-manifest` over live tokens; lighthouse re-pin + no-layout-animation→release promotion.

**Band 4:** **BG.W-DATE-CALENDAR** (reka-ui BUILD) · **BG.W-CHART-FAMILY** (token-SVG BUILD) · **BG.W-DS-COMPLETE** — each a genuinely-adjudicated FOLD-LEDGER row with a build-or-defer verdict.

**Band 5:** **BG.W-CUT** — the tag fires only after `--run ship` passes over the BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` + the user gate; closes the BD P10a tail. The falsified "appears FIXED"/"lens APPLIES" must NOT propagate into the CUT.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Each residual closes ONLY when the artifact is on COMMITTED `tranche/BG` disk AND registered in `gates.mjs` AND the gate runs green-on-fixed / red-on-broken from a reproduction the building agent did NOT author** (§K.0).

**The tag-push closure is the primary acceptance fact (§L.0):** `proof:ship-attestation` is registered `["ci","release"]`; `node scripts/gates.mjs --run full` REDs (CI-shape, no Mac) when `SHIP-ATTESTATION.json` is absent OR its embedded `surfaceHash` !== HEAD-recomputed-over-source. This is the ONLY device-free enforcer on the `git push --tags`→`release.yml`→`npm publish` path; without it C-PAINT is theater.

**Born-RED on the shipped 4.2.0 tree:**
- `proof:field-aurora` SOURCE arm FAILS (≥1 shell field + ≥1 route field, SIMULTANEOUS, device-free, CI-able) · `proof:ba-gestalt` top-bar D5 (`topDelta` ≥ MEASURED margin) + the Metal field meanChroma-CEILING (≥ MEASURED ~0.06–0.08) — NOT a `meanHue` band (the field is hue-warm; hue is a chroma-gated content guard with the measurement-validity bite).
- `proof:route-navigates` FAILS via `max(main > article) > 1` during the 0.2s window (100% reproducible, N=20 pass-rate==0%) + the secondary survivor-identity; the nested-`<article>` fixture must NOT false-RED.
- `proof:bg-deferred-ledger` FAILS (DERIVED corpus UN-DECIDED; the AX-`32`-literal, non-canonical-book, selfTest-fixture, phantom-`D99` self-tests RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / `webkit` verdict absent / `runShip()` skeleton FAIL-verdict / stale surfaceHash).
- `proof:close-battery-parity` FAILS (release.sh has no `--run ship` / first-match-bug-fixed-but-ship-absent, BOTH clauses).
- `proof:safari-parity` FAILS RED-on-broken (a planted `backdrop-filter: url(#glass-goo)` → P1 FAIL with bug-245510 message) but GREEN-on-clean against the live landmines (P3 token + the 10 oklab single-mixes).

**GREEN only when** the field paints ONE field system (SOURCE arm) + the corner-variance matches WS1's committed live aurora on Metal + the meanChroma stays below the ceiling · the top-bar hairline is gone (`topDelta` collapses) · routing keeps single-`main > article` coexistence + the destination-heading survivor over ≥6 hops (N=20 pass-rate 100% on the fixed tree) · every DERIVED deferred item is genuinely DECIDED with real evidence · every `release` gate locks a ≥2-consumer mechanism · real Safari resolves var() to literal blur (version recorded) + safaridriver-OR-DROP certifies glass+goo paint (lens degrades-gracefully) · `--run ship` runs end-to-end in `/tmp` with porcelain clean after + the tag reconciles + `proof:ship-attestation` GREENs on the fresh digest · constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD on Metal** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar + the surfaceHash freshness recompute (the bounded trust: re-stamp/frozen/skip/stale REDs; malicious hand-forge is out of the Phase-1 threat model, DROP-WITH-TRIGGER).

---

## FOLDED DEFERRED ITEMS (the DROP-WITH-TRIGGER + DECIDED register, into the F0 ledger)

- **C-PAINT forgery-beyond-re-stamp** → DROP-WITH-TRIGGER (surfaceHash over SOURCE bytes catches re-stamp/frozen/skip/stale — the 3× chronic — not a malicious hand-forge; re-enable at capture-signing/OIDC-capture-identity).
- **Phase-1 `authoredBy≠runnerIdentity`** → DROP-WITH-TRIGGER (no orchestrator write-fenced token on the Mac close; re-enable Phase-2 with OIDC).
- **Safari PAINT certification** → safaridriver-end-to-end IF the close-machine enable is proven this pass, ELSE DROP-WITH-TRIGGER (webkit.glass/goo ride the SOURCE arm only; a documented-manual screenshot is audit evidence, never the gate GREEN).
- **Safari ≤18 var()-bake** → WS3 literal-bake trigger (a 26.4 GREEN does not cover ≤18; recorded in CONSTRAINTS.md). The container-style-query `@container style()` landmine triggers only Safari <18.
- **Safari backdrop-refraction lens** → Safari-IMPOSSIBLE via `backdrop-filter: url()` (bug 245510 OPEN 2026-06-12); the `@supports` gate keeps the THIN Chromium enhancement; the cross-browser `filter: url()`-on-a-same-rect-layer re-architecture is a booked WS8 glass-deep wave, NOT a WS7 fallback.
- **edge-cast `rgb(49,0,0)` / metallic-chroma-mean as cast / field-HUE-as-cast** → DECIDED-phantom-with-trigger (the source-read over-claims; bites stay armed for a regression; the metallic born-RED is the chroma-CEILING, not the cast).
- **FLIP-ONE** (useBloomUp/useLiquidReveal/useDockCtaReceive/useCelebrationBurst re-fork ElementMorph+springTimingFunction while kf `flipShared` is imported-and-ignored) → DECIDED coordinated-wave (named, WS2/WS6 build on these engines).
- **useDockContextSilhouette + proof:dock-context** → DECIDED COORDINATED-WS6 (the Siri context-switch state-machine; resolves to RETIRE at WS6's close if no live consumer, recorded NOT unilaterally cut).
- **proof-de-shadcn destination** → WS4 / BG.W-DESHADCN-SWEEP (recorded, NOT homed in WS7; F0 no-orphan must not RED on the committed-untracked file).
- **The Mac-only-release friction** → DECIDED (not deferred): a CI-only / tag-push of a surface-changed HEAD cannot pass `--run full` without a fresh Mac `--run ship` ceremony; recorded in CONSTRAINTS.md (§L.0).

---

## OPEN RISKS (post-pass-4)

1. **The tag-push bypass closure (§L.0) is the single highest-leverage deliverable.** If `proof:ship-attestation` is not registered `["ci","release"]` with a freshness recompute, the Mac ship-block is bypassable on the path the maintainer uses and C-PAINT stays theater. Falsifier: `--run full` GREENs in CI-shape with an absent/stale `SHIP-ATTESTATION.json`.
2. **The chroma-ceiling must discriminate metallic from calm field on REAL Metal paint.** The whole field-oracle thesis rests on meanChroma(metallic ~0.12) > ceiling > meanChroma(calm ~0.03–0.05). Falsifier: a calm WS1 field reads ≥ the ceiling, or the broken slab reads < it, on a real Metal capture.
3. **`--run ship` end-to-end is unproven + load-bearing.** The live-paint tag-block lives here by physics. Falsifier: a deadlock (porcelain dirty after), a green skeleton, a :5173 fail-close, or the tag not reconciling in a fresh `/tmp` worktree.
4. **The born-RED ground evaporates on the shared branch (§L.9).** WS1/WS3 fixes land on `tranche/BG`. Falsifier: the broken Metal PNGs are not committed before integration and the born-RED cannot reproduce.
5. **Band-1 entanglement (§L.5).** A unilateral `useDockContextSilhouette` delete collides with WS6; a `useMorphField` "delete" breaks 5 consumers; a `useHaptic` RETIRE without a real call-site grep mis-adjudicates. Falsifier: a WS6 demo breaks, or `vue-tsc` REDs on a dangling `MORPH_SIGNATURES` import.
6. **Safari real-paint stays DROP-WITH-TRIGGER.** AllowRemoteAutomation UNSET. Falsifier: a safaridriver session creates end-to-end after the documented enable; absent that, the SOURCE arm is the honest ceiling.
7. **The P4 re-measure (§L.6).** A detector calibrated to the stale "8" false-REDs the 10 (this-scope) / 53 (repo) legit single-mixes. Falsifier: green-on-clean REDs on any verified-legitimate `color-mix(in oklab,…,transparent)` site.
8. **F0 adjudication-vs-restamp (§K.5).** Each of the 136 rows needs REAL evidence; a rushed pass reproduces the BB.W-NDA-DECIDE chronic.
9. **Band 1 before Band 2; BG.W-CUT last** (sequencing, unchanged).
