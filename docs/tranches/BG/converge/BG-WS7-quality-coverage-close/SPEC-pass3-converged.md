# BG-WS7 — Quality · Coverage · Close (SPEC pass 3 — CONVERGED · BUILD-AND-COMMIT)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Pass 1 converged the structure (≈73%); pass 2 build-proved the residuals and falsified three of its own headline claims (≈80%); pass 3 advanced every residual to a concrete buildable mechanism with verified anchors. **This converged spec folds the six pass-3 prototype critiques — all six returned `refine` (two disqualifying: the ship-spine and Safari deliverables evaporated in throwaway `/tmp` worktrees).** The structure + mechanism are now fully converged and disk-verified; the open frontier is **artifact delivery on committed `tranche/BG` disk + a born-RED from a reproduction the building agent did NOT author**. Convergence ≈ **86%** — the four empirical residuals stay build-owed, and two carry genuine open unknowns (the field-π threshold is coupled to WS1's uncommitted field decision; the Safari real-paint enable is unproven).

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0. **This converged spec INHERITS SPEC-pass3.md whole** (its §J.1–§J.10 anchors stand, re-verified on disk this pass) and advances ONLY the unconverged frontier: the exact folds that turn each prototype from "built-in-`/tmp`" into "committed-on-disk + green-on-fixed / red-on-broken-from-a-reproduction-the-agent-did-not-author".

**The disk truth this pass starts from (re-verified @ 71e1c641, the reason nothing is "done"):** every new gate is ABSENT (`proof-bg-deferred-ledger.mjs`, `proof-route-navigates.mjs`, `proof-field-aurora.mjs`, `proof-safari-parity.mjs`, `proof-ship-attestation.mjs`, `proof-constraint-manifest.mjs`, `fold-ledger-core.mjs`, `demo/vite.demo-dist.config.ts` — all absent); `docs/tranches/BG/waves/` does NOT exist; no `FOLD-LEDGER.{json,md}`, no `CONSTRAINTS.md`, no `bg-gestalt-roster.md`, no `DEFECT-LOCALIZATION-MAP.md`, no `SHIP-ATTESTATION.json`; and the dangling pass-2 scaffolding is STILL uncommitted (`scripts/lib/surface-closure.mjs` `??`, `scripts/proof-ba-gestalt.mjs` ` M`, `scripts/lib/critical-path-walk.mjs` ` M`). **§J.1 — commit the dangling scaffolding FIRST — is therefore the literal first action, not a footnote.** A worktree build that evaporates is the exact §J.1 disease this pass exists to kill; a "green-on-clean 5/5" claim is worthless if the file cannot be audited on `tranche/BG`.

---

## GESTALT GOAL

One sentence: **a version cannot be tagged unless a live in-ceremony render of the real demo, captured on a real GPU (`PI_ANGLE=metal`) and judged by structural pixel predicates the building agent did not hand-author, paints correctly — and every deferred item across BF/AX/BE/BF/in-src is DECIDED in one mechanically-derived ledger before any of it runs.**

The disease (shipped 3×): source-green ≠ paint-truth. The cure is four interlocking machines, built **in this order** (each is a precondition of the next), every artifact landing on committed `tranche/BG` disk:

1. **F0 fold-ledger** (Band-0, FIRST) — no item silently drops a 4th time.
2. **Band-1 dead-mechanism cut** — DELETE the present-but-dead engines BEFORE the live oracle re-points.
3. **Band-2 live-paint oracle** — the decoder + roster + real-GPU PNGs that born-RED on 4.2.0 for the RIGHT (broken-pixel) reason from a non-self-authored capture, plus the routing/field/ship gates.
4. **The `--run ship` spine** — the live capture wired as a HARD precondition of `git tag`, fail-CLOSED.

---

## §K — THE CONVERGED FOLDS (pass-3 critiques → spec, the unconverged frontier resolved)

Each subsection folds the mustFix of one prototype critique into the binding mechanism. The pass-3 §J advancements stand; §K hardens the BUILD + DELIVERY discipline and resolves the contradictions the critiques surfaced.

### §K.0 — The committed-disk bar is the PRIMARY acceptance gate (folds the cross-cutting MUSTFIX of prototypes 2, 4, 6)

Three of six prototypes built in throwaway `/tmp` worktrees and the artifacts do not exist on `tranche/BG`. **A residual closes ONLY when:** (a) the artifact is on COMMITTED `tranche/BG` disk (not a worktree, not untracked); (b) the gate is REGISTERED in `gates.mjs` with its real tag set (an unregistered gate is a non-gate — "trivial, not load-bearing" is rejected); (c) the gate runs **green-on-fixed AND red-on-broken from a reproduction the building agent did NOT author**; (d) `vue-tsc`/the gate battery see it in-tree.

**The rebase discipline (folds prototype 2's stale-base MUSTFIX):** every build branches off `tranche/BG @ 71e1c641` (or its descendant), NEVER a stale 4.2.0 worktree base (`998136bb`). The decoder-band extension reconciles WITH the already-landed pass-2 P6 surface-closure re-point in ONE diff — do NOT re-introduce the deleted `freshnessVerdict` import; KEEP `deriveSurfaceClosure`/`isPaintSource` and the `surfaceFreshness(surface, routesCell)` signature; thread `evalCapture` + the region helpers through that landed version.

### §K.1 — The instrument unblock: prove `runPi()` GREEN via the real codepath, both projects (folds prototype 1, 74%)

`--run pi` is the instrument every live-paint deliverable depends on. The unblock is mechanically trivial (root `npm install` hoists the workspace runner; the machine-global browser cache makes `npx playwright install chromium` a no-op; the gates.mjs:2248 root-fallback resolves `PI_PW_BIN`). The folded MUSTFIX:

- **Invoke `runPi()` itself, not bare `playwright test`.** Prove the real spawn/sentinel/report-aggregation codepath the close invokes is GREEN — temporarily narrow `piEnrolledSpecs` (or the manifest) to a single PASSING per-mechanism spec (`substrate-paints-color`), run `node scripts/gates.mjs --run pi`, confirm green, then REVERT. The full 138-suite born-REDs on broken 4.2.0 BY DESIGN (the gestalt/field/routing specs are born-RED), so the binding convergence definition is **"the instrument runs green on a passing per-mechanism spec via the `runPi` codepath"**, NOT "the suite is green". A born-RED full suite is instrument SUCCESS, not failure — state this so the close never mis-reads it.
- **Fan out over BOTH Playwright projects.** `runPi()` runs `chromium-headless-new` AND `coarse-touch` (mobile viewport). The chosen passing spec must pass on both — a mobile-viewport regression silently reds the real `--run pi` otherwise.
- **Park the renderer-falsifier DURABLY as the `runShip()` `UNMASKED_RENDERER` seed.** The §J.5 learning (the ship arm pins on the GL `UNMASKED_RENDERER` string — `Apple M-series`/ANGLE-Metal vs SwiftShader — NOT a pixel-delta) is load-bearing input to the anti-SwiftShader falsifier. Commit the probe (`scripts/lib/gl-renderer-probe.mjs` or inline in `runShip()`), NEVER leave it in volatile `/tmp`.
- **Cite the VERIFIED witness for `PI_PW_BIN` resolution** (root `node_modules/.bin/playwright` exists + the gates.mjs:2248 root-fallback resolves it) — DROP the invalid `--list pi` claim (`listPi()` never touches `PI_PW_BIN`). The loose-witness pattern is exactly what WS7 exists to kill.
- **Record the dependency on WS1–WS6:** a full `--run pi` GREEN is achievable only AFTER the UX fixes land. WS7's binding scope is the instrument + the per-mechanism codepath, not the suite.

### §K.2 — The DECODER + ROSTER + Metal PNGs: the born-RED must be REAL, not circular (folds prototype 2, 42% — the lowest)

The decoder DESIGN is good and kept (the `a,b` are genuinely discarded at `reflect-capture-verify.mjs:269-277`; the extension is ~30 lines on the existing loop + 3 region helpers, harness-clean). But the prototype's born-RED is **CIRCULAR** — the agent authored cream/grey fixtures (`gen-bg.mjs`) and the gate flags grey: agent-encodes-grey → gate-flags-grey does NOT satisfy C-PAINT. The folded MUSTFIX, in build order:

1. **Replace the self-authored synthetic born-RED with a REAL one.** Shoot the ACTUAL 4.2.0 demo on Metal (`--use-gl=angle --use-angle=metal` via the §K.1 `--run pi` pipeline) and prove `proof:ba-gestalt` born-REDs on captures the building agent did NOT author. Until a real-GPU born-RED reproduction exists on disk, BG.W-PAINT-IS-THE-GATE is UNMET. The 4788-byte cream/grey fixtures are audit scaffolding ONLY, never the gate's born-RED.

2. **Split the field born-RED by substrate-capability (folds the device-free-vs-GPU MUSTFIX).** The decoder's `pngFieldVariance` is GPU-ONLY (it reads the live-GL corner structure — the Metal-only SYMPTOM-π). It does NOT give CI/release a deterministic field born-RED (chroma-floor won't fire on a hue-WARM field; `meanHue` is a content guard not a born-RED). Therefore **`proof:field-aurora` carries the DEVICE-FREE field born-RED as a SOURCE arm** (§J.3: count the competing field-painting layers reachable on a route; RED when > 1 — the 3-stack `AppShell.vue:360` unconditional `<PaperBackdrop field>` + `StoryHero.vue:267-321` per-route bg + `DockStage.vue:60-93` aurora). The two are COMPLEMENTARY: the SOURCE arm is the CI/release deterministic born-RED; `pngFieldVariance` is the Metal-only `--run ship` symptom-π calibrated against WS1's committed field.

3. **CALIBRATE every threshold from MEASURED paint, never hand-pinned.** `topBarStrip` (D5) and `fieldVariance` thresholds are derived from real Metal captures of the BROKEN 4.2.0 (the born-RED ground) AND a FIXED tree (the green ground); the margin + the derivation are RECORDED in `DEFECT-LOCALIZATION-MAP.md` (currently absent — this is the binding on-disk witness). The hand-pinned `0.08`/`0.10`/`0.0002` numbers are FORBIDDEN until they come from measured paint — the same bar the prototype correctly set for `fieldVariance` applies to D5. The D5 top-bar number reconciles the pass-1/pass-2 contradiction (`0.069` vs `0.16–0.20`) by measuring, not reporting.

4. **Land the BG scaffolding the gate READS, surface-paths DERIVED from route files.** `docs/tranches/BG/waves/BG.W-*.md` (the dir does not exist), `bg-gestalt-roster.md` (with a routes column), per-surface `<surface>.md` (surface-hash header), and `DEFECT-LOCALIZATION-MAP.md` all land on committed disk. The roster's `surface-paths` are DERIVED from route files via the landed P6 `deriveSurfaceClosure` — a route file OUTSIDE the derived closure must RED (the routeSeeds HARD-RED, §C″). Reconcile with the landed P6 derivation, NOT a `package.json` stand-in.

5. **Fix the landing-time defects the prototype itself flagged:** the `-desktop-` 1280px width floor (any `<1280` capture REDs `[G1-CAPTURE]` and masks the pixel verdict — relax or document the viewport contract); update the `selfTest` console string (it lists 9 bites though the count is now 15 — the chroma-gate/region-agreement/measurement-validity/topBarStrip/edgeCast bites). The `edgeCast` helper + bite stay **DECIDED-phantom-with-trigger ONLY** — never a live predicate in the bar.

The decoder math is unchanged from §J.4 (`meanHue=atan2(meanB,meanA)`, `chromaMax`, `lVar`, the 3 region helpers, ONE decoder, no new color source — a forked decoder REDs G3's no-re-roll clause). The three GUARDS (chroma-gate `meanChroma ≥ 0.025`; region-agreement `|center−full| ≤ 15°`; measurement-validity `samples ≥ N` ∧ `meanAlpha` plausibility) are the only new eval logic; `parseExpect`/`evalBand` already parse the band syntax for free.

### §K.3 — The ROUTING gate: route-root selector, real leave-duration, real green-on-fixed (folds prototype 3, 74%)

The MutationObserver peak-capture mechanism is rock-solid (broken HEAD reads `maxArticles==2` on 100% of hops, N=20, zero flake — the AppShell.vue:405 `<Transition name="fade-slide">`-with-no-`mode="out-in"` race). The folded MUSTFIX:

- **Scope the coexistence selector to the route-root: `main > article` (direct element children of the RouterView/Transition container) — this IS the spec/brief's "single-child `<main>`" predicate.** The prototype's document-wide `querySelectorAll('article')` false-counts NESTED content articles (math-paper / virtual-section render their own `<article>` children) and only passed by accident of hop choice. **Self-test bite:** a destination with a nested `<article>` must NOT false-RED (a clean atomic swap into a page that legitimately contains a nested `<article>` passes).
- **Re-couple `WINDOW_MS` / orphan-grace to the REAL leave duration — `--duration-fast = 0.2s` (verified at `scheme-motion.css:96`), NOT the spec's wrong 1.2s.** The observed coexistence is ~200–480ms over the 0.2s `fade-slide` leave. The orphan-grace is `2× the resolved leave duration` (read the token at runtime), so a future `--duration-fast` retune does not silently break the orphan leg. The pass-2/pass-3 "~1.2s window" prose is CORRECTED to the measured ~0.2s leave.
- **Prove GREEN-on-fixed from a REAL reproduction, not only the synthetic clean-detach `setContent` bite.** `out-in` is FALSIFIED by this very prototype (it dodges the scroll-reset race per AppShell's own comment), so the fixed mechanism is a keyed-wrapper / await-chunk atomic swap with a WORKING enter — construct a minimally-patched fixed AppShell OR coordinate WS1's actual fix, and demonstrate `N=20 pass-rate == 100%` on it. The gate's green threshold is unverified until this exists.
- **Add a real-navigation variant beside the synthetic `pushState`+`popstate`:** a `RouterLink` click / `router.push` through the vue-router guard pipeline. **Resolve the `startViewTransition` question:** AppShell.vue:131/220 wraps cross-category hops in `startViewTransition`, which may overlay VT snapshots that mask the DOM coexistence. Either confirm the gate REDs on a user-visible defect on cross-category hops, OR add **same-category story-to-story hops** (no VT wrapper) where the coexistence flash is unambiguous. The gate walks ≥6 hops mixing both.
- **Cadence, explicit + cheap:** `N=1` deterministic at the release close (coexistence is deterministic, so one run suffices); `N=20` is the ONE-TIME anti-flake validation recorded in the DELTA, NOT run on every tag close (the ~4-min N=20 does not gate the close).
- **Land + register:** commit `scripts/proof-route-navigates.mjs` (+ its spec) to `tranche/BG` HEAD and REGISTER in `gates.mjs` Band-2, `["ci","release"]`, with a deterministic `webServer` spawn-or-assume (today it assumes-running via `GLASS_UI_DEMO_URL`). CI-headless DOM (no GPU) — release-teeth BLOCKED-ON nothing (pure DOM-structure proof; runs against `npm run dev`/`webServer`).

PRIMARY born-RED: `max(main > article) > 1` during the window (deterministic, N=20 pass-rate 0% on broken HEAD). SECONDARY: the settled `main > article` heading === destination heading over ≥6 hops, poll-to-stable, detector `h1, h2, .story-hero-title`.

### §K.4 — The SHIP spine: in-tree edits, fail-CLOSED runShip, paint-teeth in the attestation (folds prototype 4, 47% — disqualifying)

The spine ARCHITECTURE is sound and the `matchAll` bug-fix is correct, but the deliverable failed the bar on disqualifying counts. The folded MUSTFIX:

- **Apply the three source edits to the REAL working tree, not `/tmp`:** (a) `gates.mjs` `runShip()` dispatch (insert before the `runMode` branch at L2472, Mac-only); (b) `release.sh` ship-block; (c) `proof-close-battery-parity.mjs` `matchAll`. At HEAD all three are unmodified — the `/tmp` proof does NOT satisfy the committed-disk bar. The `matchAll` fix + dispatch insertion have ZERO deadlock risk and must land in-tree for `vue-tsc`/gate verification.
- **`runShip()` is FAIL-CLOSED until a real Metal capture + band-predicate re-apply runs.** A skeleton MUST exit non-zero (or write an explicit `FAIL`/`unverified` verdict that `proof:ship-attestation` REDs on) — a GREEN skeleton re-creates the source-green/visually-broken trap at the META level (the disease, transposed to the ship arm). `runShip()` (Mac-only; REDs on non-darwin): (1) start the SRC demo (:5199) + demo-dist server; (2) assert `UNMASKED_RENDERER` is real ANGLE-Metal not SwiftShader (the §K.1 falsifier seed — a SwiftShader shoot certifies the WRONG ground, FORBIDDEN); (3) capture the BG roster fresh in-ceremony on `PI_ANGLE=metal`; (4) re-apply the BG band predicates over the FRESH captures; (5) emit the per-region pixel DIGEST + `webkit.{glass,goo,lens}` verdict into `docs/tranches/BG/SHIP-ATTESTATION.json`. NEVER consumes a `GLASS_UI_SHIP_DIGEST_SOURCE` env (capture-in-spine).
- **Move the paint TEETH out of string-presence into `proof:ship-attestation`.** The close-battery `--run ship` requirement only certifies the spine is WIRED; the actual lock is `proof:ship-attestation` re-applying the BG band predicates to the embedded per-region digest and REDing on re-stamp/frozen/skip/absent-verdict. Build `proof:ship-attestation` BEFORE the close-battery ship-requirement lands, or the gate is theater. (absent→FAIL, recompute the DERIVED `surfaceHash` at HEAD === embedded, re-apply `parseExpect`/`evalBand` to the digest, `webkit.glass==pass AND webkit.goo==pass`, compose the shared `isPaintSource` guard.)
- **Resolve the absent-dependency coupling, sequenced born-RED→GREEN.** `npm run demo:dist:build` does NOT exist (`set -euo pipefail` aborts `release.sh`), and demanding `--run ship` in `release.sh` REDs `proof:close-battery-parity` until the full Band-2/3 chain exists. LANDING ORDER: (1) `demo:dist:build`/`serve` scripts + `runShip()` + `proof:ship-attestation` land FIRST; (2) THEN the `release.sh` ship-block + the close-battery `--run ship` requirement land LAST. The gate goes born-RED→GREEN against a REAL ceremony, never a self-authored ship-block.
- **Re-derive green-on-fixed from a reproduction the building agent did NOT author.** The `/tmp` "fixed tree" was hand-crafted by the same agent (its own `release.sh` + skeleton) — the exact anti-pattern the spec bans, transposed to the ship arm. The end-to-end proof runs against the in-tree edits in a FRESH `/tmp` worktree (siblings + precepts-submodule absent), porcelain clean after, the `/tmp`-tag reconciling to the canonical repo.
- **Harden the regexes (close-battery):** the first-match bug fix is real (`proof-close-battery-parity.mjs:73` `.match()?.[0]` reads the FIRST `--run X`; once `--run ship` precedes `--run full` it false-REDs) → `matchAll` per §J.7. ADDITIONALLY: anchor the prefix so a bare `gates.mjs --run X` (no `scripts/` prefix) is NOT silently missed (latent false-GREEN); anchor clause-2b's `sh.search(/--run\s+ship/)` to the actual INVOCATION line, not a comment match; upgrade clause-5 from source-presence to the §J.7 synthesize-a-short-circuit-at-`test`-and-assert-REDs structural self-test.

`release.sh` reorder (§J.8): the ship-block (`demo:dist:build` → `--run ship` → `git add SHIP-ATTESTATION.json && commit`) inserts BEFORE the L60 porcelain check; `--run full` (fail-CLOSED on `test`, §J.7 §A.5.4″) stays at L84; tag at L93. The no-deadlock proof: the build emits gitignored `dist/`, the only tree change is the committed `SHIP-ATTESTATION.json` under `docs/`, so post-commit porcelain is EMPTY. `release.yml` stays `--run full`-ONLY (no GPU, no `--run ship`).

### §K.5 — The F0 ledger: extract the core, but ADJUDICATE the rows for real (folds prototype 5, 70%)

The gate MECHANISM is verified-good (the DRY extraction is real — `grep` for the function bodies returns 0 in BOTH gates; the `isMain` run-as-main guard is genuinely-new behavior, proven distinct). The DELIVERABLE it produces is the exact boilerplate the spec FORBIDS, and a spec-named clause is missing. The folded MUSTFIX:

- **Extract `scripts/lib/fold-ledger-core.mjs`** from `proof-bc-fold-ledger.mjs` (parameterized by tranche root/paths/`WAVE_RE`; the shared `extractDocIds`/`deriveBand`/`waveSpecExists` bodies live ONCE in the core; both gates import; refactor BC onto it in the SAME diff so no copy-paste clone survives, re-run BC green @ 213). Demote `proof:bc-fold-ledger` release→ci-tracker (mirrors `:ay/:az/:ba`).
- **Emit a GENUINELY-ADJUDICATED ledger, never blanket-DEFER-with-boilerplate (the BB.W-NDA-DECIDE chronic).** Every non-wave row carries a real disposition — BUILD-against-a-real-`BG.W-*`-spec / RETIRE / MET — backed by REAL evidence (a `(`-call-site grep + a destination-sound wave-spec), not a hand-stamp. A row that rides `DEFER` forever with boilerplate is the soft underbelly F0 exists to kill; the gate REDs on it.
- **The DERIVED corpus (the EXACT counts, re-verified on disk this pass):** AX register `JSON.parse(REGISTER).items.map(i=>i.id)` = **31** (`items.length===31`; `grep '"id"'===32` because `j.selfTest` carries its own id — **the brief's "AX=32" IS the drift, shipped as F0's FIRST self-test bite**, NEVER silently corrected to 31 in prose). BF DEFERRED-CENSUS `D[0-9]+` unique = **32** (D1–D32). BE+BF wave-ids `readdir` `^B[EF]\.W-` = **70** (39+31; prose's "69" stale). in-src books strict canonical `CONSUME(…)`/`BOOKED:` = **3** (`useDragMorph.ts#CONSUME(kf snap)`, `useLayerTransition.ts#BOOKED:AY.W-GOD1`, `DockLayerGroup.vue#BOOKED:AY.W-GOD1`). `expectedCount = |union| = 136`, asserted DISJOINT (`expectedCount === Σ counts`, the 1-line bite — the spec-named clause that must be present).
- **F1.b no-orphan SCOPED to F0 namespaces only** — an orphan is a ledger row whose id CLAIMS an F0 namespace (`D#`/`AX-slug`/`BE|BF.W-`/`file#KIND#slug`) but is not produced by that accessor. The census rows (DATE-CALENDAR/CHART-FAMILY/DS-COMPLETE), dead-mech rows, FLIP-ONE, Safari-WS3-bake, and the proof-de-shadcn destination row MUST coexist without RED. Self-tests: a legit non-F0 census row does NOT trip no-orphan; a phantom `D99`/`AX-slug` row DOES.
- **`sourceRef` is `file#KIND#slug`** (not `file#KIND`) — 2+ same-kind markers in one file do not collapse (the two AY.W-GOD1 bookings key by `file#KIND#slug`, not destination, else they collide); a 2-`CONSUME`-in-one-file fixture proves it.
- **The canonical in-src marker grammar** ENFORCES the exact `CONSUME(...)` / `BOOKED:` form — a non-canonical `CONSUME:` or `// books X` REDs (a born-RED self-test plants one). Bare "booked successor" prose books are tracked in their wave specs, NOT here.
- **The AX phantom-dest the restamp must catch (F2):** `css-relative-color.resolvedBy=undefined, pendingResolvedBy="BB.W-DARK-INK-WARM"` (needs flip); `styles-critical-split.resolvedBy="BC.W-CSS-CRITICAL"` is likely PHANTOM (the real wave is **BB**.W-CSS-CRITICAL per CLAUDE.md — F2 REDs if the BC spec is absent on disk).
- **Land + register:** `scripts/proof-bg-deferred-ledger.mjs` committed + registered Band-0, `["local","ci","release"]`, with the run-as-main guard; `docs/tranches/BG/FOLD-LEDGER.{json,md}` on disk, genuinely adjudicated.

### §K.6 — SAFARI: commit + register + re-prove green-on-clean against the LIVE landmines (folds prototype 6, 46% — disqualifying)

The DESIGN is strong and well-anchored (the CSS-paint SOURCE arm is correctly additive — `proof:safari-webgl` owns only S1-S6/S5 and covers NONE of P2-P5; P1↔S5 is genuine belt-and-suspenders on disjoint selector sets). The DELIVERABLE — the entire thesis of pass 3 — is not on the evaluated tree. The folded MUSTFIX:

- **COMMIT the artifacts to `tranche/BG`, not a throwaway worktree:** `scripts/proof-safari-parity.mjs` + `demo/vite.demo-dist.config.ts` + the `package.json` `demo:dist:build`/`serve` + `proof:safari-parity` scripts must be on committed disk and auditable.
- **REGISTER `proof:safari-parity` in `gates.mjs` Band-3** (the appropriate tag set per §Band 3) so it actually runs in `--run full` and is a real release floor. "Trivial, not load-bearing" is rejected — wire it.
- **RE-PROVE born-GREEN-on-clean against the REAL tree as committed self-test evidence, not only synthetic bites.** Two LIVE landmines that MUST NOT false-RED on clean:
  - **P3** must NOT red on `glass-fx.css:137` `--glass-edge-light-dark: inset 0 0 0 0.75px hsl(0 0% 100% / 0.22)` — this is a token NAMED `…-light-dark` carrying an inset VALUE, NOT a `light-dark()` FUNCTION call. The Safari trap is an inset-shadow FRAGMENT inside `light-dark(` parens; P3 matches the `light-dark(` FUNCTION with `inset` INSIDE the parens (reuse `proof-safari-webgl`'s `stripComments` precedent), never the token name.
  - **P4** must NOT red on the 8 `color-mix(in oklab, …, transparent)` single-mix sites (a single `color-mix` with one `transparent` arg is the explicit-0-alpha idiom, not a multi-stop gradient with a bare 0-alpha stop).
  - Provide the green-on-clean run output ON DISK.
- **LAND the Safari version answer on committed disk.** The var()-resolution-GREEN / version-26.4-scoped / ≤18-WS3-bake-trigger record + the Safari-PAINT DROP-WITH-TRIGGER text must exist as a committed artifact in `CONSTRAINTS.md` (which does not exist) AND the FOLD-LEDGER row. The var() answer stays GREEN (engine read — parsing ≠ rasterization, the Playwright-WebKit proxy is VALID for THIS computed-value question only); the "lens APPLIES"/"appears FIXED" claims stay QUARANTINED (CSS.supports ≠ rasterization; WebKit bug 245510 OPEN; lens degrades-gracefully).
- **FIX the demo-dist overclaim — state the HYBRID honestly.** `demo/vite.demo-dist.config.ts` is a HYBRID: the built `dist /styles` cascade + the `src` component JS + the `src` SFC scoped CSS — NOT "the REAL demo over BUILT dist". The config header states this. EXERCISE it once with a real Chromium render/screenshot against `:5200` confirming the demo paints over the dist styles cascade, so the harness is known-good BEFORE safaridriver lands.
- **The certification ladder (§J.6, kept verbatim — do NOT downgrade to a self-cert screenshot):**
  1. PREFERRED — `safaridriver` end-to-end after the documented one-time `sudo safaridriver --enable` + Safari Develop → "Allow Remote Automation" (currently EMPTY → session creation WILL fail at HEAD). A real gate, reproducible from committed disk, pixel-reads the goo merge (`GooFilter` regular `filter:url()` IS WebKit-supported) + the lens-degrades-to-blur.
  2. IF blocked — DROP-WITH-TRIGGER, NOT a self-cert green. `webkit.glass`/`webkit.goo` ride the SOURCE arm ONLY; a documented-manual screenshot is audit evidence, NEVER the gate's GREEN. The cert-ladder falsifier (manual-screenshot → audit-evidence) stays.

`proof-safari-parity.mjs` RECONCILES with `proof:safari-webgl` (gates.mjs:1827) — it ADDS the CSS-PAINT SOURCE arm ONLY (P1 goo-via-`filter:url()`; P2 explicit `oklch(L C H / 0)` stops; P3 `light-dark()`-no-inset-fragment; P4 single-mix transparent; P5 engine-agnostic route transition + squircle clip-path floor), no second WebGL-degrade fork.

### §K.7 — The field gate de-coupled from WS1's design choice (§J.3, the open coordination)

Unchanged from §J.3 and binding: `proof:field-aurora` PRIMARY is the device-free SOURCE arm (ONE field system reaches the painted root; born-RED on the 3-stack at HEAD). The SECONDARY corner-field-variance π runs `--run pi` on Metal and asserts the corner stdev MATCHES **whatever WS1 ships** — the threshold is calibrated FROM WS1's committed field in `DEFECT-LOCALIZATION-MAP.md`, NEVER hand-pinned to aurora-stdev. **OPEN COORDINATION (§RISK 3):** confirm the field=aurora-vs-calm-static-wash decision with WS1 before pinning the π threshold; if WS1 ships a correct non-aurora field, an aurora-stdev born-RED false-REDs forever. The `meanHue` band survives ONLY as the §K.2 chroma-gated + region-agreed content guard.

---

## §J — THE PASS-3 ADVANCEMENTS (inherited whole, re-verified this pass)

§J.1–§J.10 of SPEC-pass3.md stand and are re-verified on disk. The re-verification confirmations:

- **§J.1** — the dangling scaffolding IS still uncommitted (`surface-closure.mjs` `??`, `proof-ba-gestalt.mjs`/`critical-path-walk.mjs` ` M`); commit FIRST. `proof-de-shadcn.mjs` (`??`, WS4-owned) records its destination wave as a FOLD-LEDGER row, NOT registered in WS7; the F0 no-orphan must not RED on it (outside F0 namespaces).
- **§J.2** — routing PRIMARY is the deterministic coexistence signal (hardened in §K.3: `main > article` scope + real 0.2s leave duration).
- **§J.3** — field SOURCE arm + calibrated SECONDARY π (§K.7).
- **§J.4** — the decoder extension (hardened in §K.2: real born-RED, measured thresholds).
- **§J.5** — the live-paint tag-block is Mac-only BY PHYSICS (CI=SwiftShader); `--run ship` on `PI_ANGLE=metal` is the single load-bearing deliverable; the `UNMASKED_RENDERER` falsifier is the §K.1 committed seed.
- **§J.6** — Safari author-self-cert REJECTED; safaridriver-or-DROP ladder (hardened in §K.6).
- **§J.7** — close-battery `matchAll` + ordering + ship-beside-full + test-short-circuit RED (hardened in §K.4: regex anchoring + the structural self-test).
- **§J.8** — `runShip()` Mac-only dispatch + release.sh reorder (hardened in §K.4: fail-CLOSED + landing order).
- **§J.9** — `fold-ledger-core.mjs` DRY extraction + DERIVED corpus (hardened in §K.5: genuine adjudication + the disjoint-namespace clause).
- **§J.10** — the `--run pi` feasibility unblock (hardened in §K.1: invoke `runPi()` + both projects).

---

## MECHANISM (the build order, with the §K folds)

**Band 0 (no-silent-drop, FIRST):**
- §J.1 commit the dangling scaffolding. §K.5: extract `fold-ledger-core.mjs`, refactor BC onto it (green @ 213), build `proof-bg-deferred-ledger.mjs` (DERIVED corpus 136, disjoint-namespace assert, F0-scoped no-orphan, AX 31-vs-32 first-bite, canonical-marker grammar, `file#KIND#slug`), register Band-0, emit the genuinely-adjudicated `FOLD-LEDGER.{json,md}`.

**Band 1 (dead-mechanism cut, BEFORE Band 2):**
- F6 gate→symbol map by IMPORTING `gates.mjs` (the `GATES` export behind `isMain`). DELETE `useDockContextSilhouette.ts` (551L, 0 call-sites) + `proof:dock-context` + ratchet row, ONE atomic diff; `useLiquidMorph.ts` (462L) + rehome `liquid-morph.css` to `demo/stories/dock/`; the two dead CSS + @imports; gut `useMorphField()` re-homing the LIVE `MORPH_SIGNATURES` to `morphSignatures.ts`; dead tokens + pin-clauses; `selectableChipVariants.ts` alias. RETIRE `useHaptic` + drop the `src/index.ts:285` + `api/index.ts` exports. KEEP `useDockFission`/`useBloomUp`/`metaball-bridge2` (LIVE). FLIP-ONE = a DECIDED coordinated-wave FOLD-LEDGER row.

**Band 2 (live-paint oracle, born-RED on a non-self-authored reproduction):**
- §K.1: prove `runPi()` GREEN on a passing per-mechanism spec, both projects. §K.2: the decoder extension + `bg-gestalt-roster.md` + `DEFECT-LOCALIZATION-MAP.md` (measured thresholds) + real-GPU PNGs → `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction the building agent did NOT author. §K.7: `proof:field-aurora` SOURCE arm + calibrated π. §K.3: `proof:route-navigates` (`main > article`, 0.2s leave, real green-on-fixed, N=20 anti-flake, committed + registered). §K.4: the ship spine (in-tree edits, fail-CLOSED `runShip()`, `proof:ship-attestation` paint-teeth, sequenced born-RED→GREEN).

**Band 3 (floors):**
- §K.6: `proof-safari-parity.mjs` (committed + registered Band-3, green-on-clean re-proven against the live landmines) + `demo/vite.demo-dist.config.ts` (honest hybrid header, exercised once on Chromium) + `demo:dist:build/serve` + `CONSTRAINTS.md` (Safari version matrix, ≤18 trigger, one-GL↔flash coupling) + `proof:constraint-manifest`. The safaridriver-or-DROP ladder. Promote `proof:lighthouse` + `proof:no-layout-animation` release-eligible; re-pin `floor.baseline.json` at the BG-achieved number ONLY after WS1-WS6 land.

**Band 4 (census):** DATE-CALENDAR / CHART-FAMILY / DS-COMPLETE — each a genuinely-adjudicated FOLD-LEDGER row (build-or-defer against the ≥2-consumer bar).

**Band 5 (honest re-cut, LAST):** BG.W-CUT — the tag fires only after `--run ship` passes against the served demos over the BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` (safaridriver-or-DROP) + the user gate. Closes the BD P10a tail (17 failing unit tests + short-circuit-at-`test`).

---

## THE BG.W-* WAVE BREAKDOWN (each carries its validated mechanism + real-paint-π bar + folded deferred items)

**Band 0:**
- **BG.W-DEFERRED-LEDGER** (§K.5) — DRY `fold-ledger-core.mjs`, DERIVED corpus 136, AX 31-vs-32 first-bite, disjoint-namespace assert, F0-scoped no-orphan, canonical-marker grammar, `file#KIND#slug`, genuinely-adjudicated `FOLD-LEDGER.{json,md}`, committed + registered Band-0. **π bar:** born-RED on the UN-DECIDED corpus + the AX-32-literal / non-canonical-book / selfTest-fixture / phantom-D99 self-tests; GREEN when every derived id is DECIDED with real evidence.
- **BG.W-BE-BF-LEDGER** — 70-wave parity (LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** — 31 BC→BG in place (DERIVED-count loop), n:2 re-eval, the 2 pending flips verified (`css-relative-color`→BB.W-DARK-INK-WARM, `styles-critical-split`→BB.W-CSS-CRITICAL with the BC-phantom F2 catch). Re-stamp-without-decide REDs.

**Band 1:**
- **BG.W-SPIKE-DELETE** — silhouette 551L + liquid-morph 462L + the dead CSS + useMorphField body + tokens + alias shim, atomic file+gate+ratchet diffs; rehome liquid-morph.css to demo.
- **BG.W-JUBILANCE-DECIDE** — RETIRE useHaptic + drop exports; DECIDE useCelebrationBurst (gate already `["local","ci"]`); record FLIP-ONE as a DECIDED coordinated-wave row.
- **BG.W-DEAD-GATE-SWEEP** — F6 gate→symbol map by IMPORT; DELETE `proof:dock-context` (dead engine) atomically; KEEP dock-fission/bloom-up/metaball-bridge2 (live); the de-shadcn destination RECORDED (WS4/BG.W-DESHADCN-SWEEP), NOT homed in WS7.

**Band 2:**
- **BG.W-PAINT-IS-THE-GATE** (§K.1+§K.2) — the `runPi()` instrument proven; the decoder + chroma-gate + measurement-validity bite + DEFECT-LOCALIZATION-MAP (measured thresholds) + persisted real-GPU PNGs. **π bar:** `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction the agent did NOT author (top-bar D5 `topDelta` measured-margin; field corner-variance on Metal); the all-PASS-re-shot-broken-UX regression bite STILL REDs; edge-cast / metallic-chroma-mean / field-HUE-as-cast DECIDED-phantom-with-trigger.
- **BG.W-GESTALT-ROSTER-RE-POINT** (§C″ + §K.2.4) — surface-paths DERIVED from route files (routeSeeds HARD-RED), the roster `.md` shipped + run end-to-end, over-revoke disclosure, PNG↔hash scope boundary stated.
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** (§K.4) — in-tree edits, fail-CLOSED `runShip()`, `proof:ship-attestation` paint-teeth, `matchAll`+ordering+regex-anchoring, sequenced born-RED→GREEN against a non-self-authored ceremony, forgery-overclaim DROP-WITH-TRIGGER, OIDC Phase-2-only.
- **BG.W-GATE-ROUTING-LIVE** (§K.3) — `main > article` scope, 0.2s real leave duration, real-nav variant + startViewTransition resolution, real green-on-fixed, N=20 anti-flake one-time, committed + registered Band-2.
- **BG.W-GATE-FIELD-AURORA** (§K.7) — device-free SOURCE arm (3-stack born-RED) + WS1-calibrated corner-variance π.
- **BG.W-GATE-PREVIEWS-RENDER** · **BG.W-GATE-UNIFORM-BLUR**.

**Band 3:**
- **BG.W-SAFARI-PARITY-GATE** (§K.6) — committed + registered Band-3; green-on-clean re-proven against the glass-fx.css:137 light-dark-token + the 8 oklab single-mix landmines; honest demo-dist hybrid header exercised once; safaridriver-or-DROP ladder; var()-resolution GREEN version-scoped; PAINT claims quarantined.
- **BG.W-CONSTRAINT-MANIFEST** — CONSTRAINTS.md (six binding constraints + Safari version matrix + ≤18 trigger + GL↔flash coupling + iOS-26 ceilings) + `proof:constraint-manifest` over live tokens; lighthouse re-pin + `proof:no-layout-animation` → release.

**Band 4:** **BG.W-DATE-CALENDAR** · **BG.W-CHART-FAMILY** · **BG.W-DS-COMPLETE** — each a genuinely-adjudicated FOLD-LEDGER row.

**Band 5:** **BG.W-CUT** — the tag fires only after `--run ship` passes over the BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` + the user gate; closes the BD P10a tail. The falsified "appears FIXED" / "lens APPLIES" must NOT propagate into the CUT.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Each residual closes ONLY when the artifact is on COMMITTED `tranche/BG` disk AND registered in `gates.mjs` AND the gate runs green-on-fixed / red-on-broken from a reproduction the building agent did NOT author** (§K.0).

**Born-RED on the shipped 4.2.0 tree:**
- `proof:field-aurora` SOURCE arm FAILS (3-stack > 1 field system, device-free, CI-able) · `proof:ba-gestalt` top-bar D5 (`topDelta` ≥ the MEASURED margin) + the Metal corner-field-variance π — NOT a `meanHue` band (the field is hue-warm; the hue band is a chroma-gated content guard with the measurement-validity bite).
- `proof:route-navigates` FAILS via `max(main > article) > 1` during the 0.2s window (100% reproducible, N=20 pass-rate==0%) + the secondary survivor-identity. The deterministic self-test bite is a `setContent` stranded-heading fixture; the nested-`<article>` fixture must NOT false-RED.
- `proof:bg-deferred-ledger` FAILS (DERIVED corpus UN-DECIDED; the AX-`32`-literal, non-canonical-book, selfTest-fixture, phantom-`D99` self-tests RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / `webkit` verdict absent / `runShip()` skeleton FAIL-verdict).
- `proof:close-battery-parity` FAILS (release.sh has no `--run ship` / first-match-bug-fixed-but-ship-absent).
- `proof:safari-parity` FAILS RED-on-broken (a planted `backdrop-filter: url(#glass-goo)` → P1 FAIL with bug-245510 message) but GREEN-on-clean against the live landmines.

**GREEN only when** the field paints ONE field system (SOURCE arm) + the corner-variance matches WS1's committed field on Metal · the top-bar hairline is gone · routing keeps single-`main > article` coexistence + the destination-heading survivor over ≥6 hops (N=20 pass-rate 100% on the fixed tree) · every DERIVED deferred item is genuinely DECIDED with real evidence · every `release` gate (DERIVED from the import-parse) locks a ≥2-consumer mechanism · real Safari resolves var() to literal blur (version recorded) + safaridriver-OR-DROP certifies glass+goo paint (lens degrades-gracefully) · `--run ship` runs end-to-end in `/tmp` with porcelain clean after + the tag reconciles · constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD on Metal** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar (the bounded trust: re-stamp/frozen/skip REDs; malicious hand-forge is out of the Phase-1 threat model, DROP-WITH-TRIGGER).

---

## FOLDED DEFERRED ITEMS (the DROP-WITH-TRIGGER + DECIDED-phantom register, into the F0 ledger)

- **C-PAINT forgery-beyond-re-stamp** → DROP-WITH-TRIGGER (surfaceHash over SOURCE bytes catches re-stamp/frozen/skip — the 3× chronic — not a malicious hand-forge; re-enable at capture-signing/OIDC-capture-identity).
- **Phase-1 `authoredBy≠runnerIdentity`** → DROP-WITH-TRIGGER (no orchestrator write-fenced token on the Mac close; re-enable Phase-2 with OIDC).
- **Safari PAINT certification** → safaridriver-end-to-end IF the close-machine enable is proven this pass, ELSE DROP-WITH-TRIGGER (webkit.glass/goo ride the SOURCE arm only; a documented-manual screenshot is audit evidence, never the gate GREEN).
- **Safari ≤18 var()-bake** → WS3 literal-bake trigger (a 26.4 GREEN does not cover ≤18; recorded in CONSTRAINTS.md).
- **edge-cast `rgb(49,0,0)` / metallic-chroma-mean / field-HUE-as-cast** → DECIDED-phantom-with-trigger (the source-read over-claims; bites stay armed for a regression).
- **FLIP-ONE** (useBloomUp/useLiquidReveal/useDockCtaReceive/useCelebrationBurst re-fork ElementMorph+springTimingFunction while kf `flipShared` is imported-and-ignored) → DECIDED coordinated-wave (named, not unilaterally rewritten — WS2/WS6 build on these engines).
- **proof-de-shadcn destination** → WS4 / BG.W-DESHADCN-SWEEP (recorded, NOT homed in WS7; F0 no-orphan must not RED on the committed-untracked file).

---

## RESIDUAL (the unconverged frontier → next pass) — convergence ≈ 86%

The structure + mechanism are fully converged and disk-verified; every pass-3 critique mustFix is folded. **The four empirical residuals stay build-owed-not-proven — all six prototypes returned `refine`, and the central pass-3 bar (artifact on committed `tranche/BG` disk + a born-RED from a reproduction the building agent did NOT author) is UNMET because nothing is committed.** Two residuals additionally carry genuine open unknowns:

1. **The live-paint born-RED defensibility (BG.W-PAINT-IS-THE-GATE · 42%).** Nothing on disk (decoder extension, DEFECT-LOCALIZATION-MAP, persisted PNGs); the prototype's born-RED was CIRCULAR (agent-authored cream/grey fixtures). OWED: land the decoder + map (thresholds MEASURED from broken-vs-fixed Metal captures) + real-GPU field-corner/top-bar PNGs, ship the roster (surface-paths DERIVED, reconciled with landed P6), run `proof:ba-gestalt` born-RED on a 4.2.0 Metal reproduction the agent did NOT author with the 15 self-test bites flagging. The device-free field born-RED is `proof:field-aurora`'s SOURCE arm; `pngFieldVariance` is the Metal-only symptom-π.
2. **The real-Safari PAINT certification (BG.W-SAFARI-PARITY-GATE · 46%).** Artifacts in a throwaway worktree; gate unregistered; green-on-clean not re-proven against the live landmines (P3 light-dark-token, P4 oklab single-mix); CONSTRAINTS.md absent; demo-dist overclaim. **OPEN UNKNOWN:** AllowRemoteAutomation is UNSET → safaridriver session creation fails at HEAD; if the enable is not proven, the Safari PAINT GREEN is DROP-WITH-TRIGGER + SOURCE-arm-only.
3. **The ship forgery + capture-wiring (BG.W-SHIP-DISCIPLINE · 47%, disqualifying).** The three source edits are unmade in-tree (`/tmp` only); `runShip()` must be FAIL-CLOSED (a green skeleton re-creates the trap); the paint teeth must live in `proof:ship-attestation` not string-presence; `demo:dist:build` does not exist; green-on-fixed was self-authored. OWED: land the in-tree edits, build `proof:ship-attestation` first, sequence the close-battery requirement born-RED→GREEN, run release.sh's ship-block end-to-end in a fresh `/tmp` worktree.
4. **The F0 gate not committed (BG.W-DEFERRED-LEDGER · 70%).** The mechanism is verified-good but the gate (`proof-bg-deferred-ledger.mjs`), the DRY `fold-ledger-core.mjs` leaf, and a GENUINELY-adjudicated `FOLD-LEDGER.{json,md}` are all owed — the prototype's ledger was the blanket-DEFER boilerplate the spec forbids; the disjoint-namespace clause must be present.

**Next-pass brief:** BUILD-AND-COMMIT the four residuals end-to-end on `tranche/BG`. (1) the decoder + DEFECT-LOCALIZATION-MAP (MEASURED thresholds) + real-GPU field-corner/top-bar PNGs + roster (DERIVED surface-paths), run `proof:ba-gestalt` born-RED on a non-self-authored Metal reproduction; (2) commit + register `proof-safari-parity.mjs` + demo-dist (honest hybrid, exercised once) + CONSTRAINTS.md, re-prove green-on-clean against the live landmines, safaridriver-or-DROP; (3) the three in-tree ship edits + `proof:ship-attestation` (paint-teeth, fail-CLOSED `runShip()`) sequenced born-RED→GREEN, run release.sh's ship-block end-to-end; (4) `proof-bg-deferred-ledger.mjs` + `fold-ledger-core.mjs` committed + registered + a genuinely-adjudicated FOLD-LEDGER. Each closes when the artifact is on committed disk, the gate is registered, and it runs green-on-fixed / red-on-broken from a reproduction the building agent did not author. **One open coordination remains: confirm the field=aurora-vs-calm-wash decision with WS1 before pinning the corner-variance π threshold.**

---

## OPEN RISKS (post-converge)

1. **`--run ship` end-to-end is the single load-bearing deliverable + is unproven.** The live-paint tag-block lives entirely here by physics (CI=SwiftShader). Falsifier: run release.sh's ship-block end-to-end in `/tmp` with porcelain clean + the tag reconciling to the canonical repo.
2. **The routing predicate must be NON-flaky.** `main > article` coexistence is deterministic (N=20 pass-rate==0% broken / 100% fixed); the `startViewTransition` cross-category masking must be resolved (same-category hops where the flash is unambiguous). Falsifier: any pass on broken HEAD over N=20.
3. **The field π threshold is design-coupled to WS1.** Pin it to WS1's COMMITTED field capture, never hand-pinned aurora-stdev. Falsifier: WS1 ships a correct non-aurora field and the π false-REDs. COORDINATE the aurora-vs-wash decision.
4. **Safari real-paint may stay DROP-WITH-TRIGGER.** AllowRemoteAutomation UNSET. Falsifier: a safaridriver session creates end-to-end after the documented enable.
5. **The field corner-probe must read live GL (`PI_ANGLE=metal`).** Falsifier: byte-identical re-capture across two shoots proves the SwiftShader fallback was read.
6. **F0 adjudication-vs-restamp.** Each of the ~136 rows needs REAL evidence (a `(`-call-site grep + a destination-sound wave-spec), not hand-stamps; a rushed pass reproduces the BB.W-NDA-DECIDE chronic.
7. **Band 1 before Band 2; BG.W-CUT last** (sequencing, unchanged).
