# BG-WS7 — Quality · Coverage · Close (SPEC pass 2 — CONVERGED)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Pass 1 converged the structure (≈73%); pass 2 build-proved the empirical residuals and **its own five critiques falsified three of pass-2's headline empirical claims** — the same green-lie WS7 exists to kill, reproduced inside WS7's own measurements. This converged spec folds every mustFix, corrects the falsified claims against disk + the BG forensic audits, and states honestly where the born-RED is **not yet defensibly reproduced** (the unconverged frontier).

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0. **This converged spec supersedes SPEC-pass2 §B′ (routing + field), §A.4′/§G′ (Safari paint), §A.5′ (ship forgery-resistance + capture wiring); hardens §D′ (F0) and §C (roster) with the folded mustFix.** Everything else in SPEC-pass2 stands. **Convergence ≈ 80%** — the structure is fully hardened; four prototype items carry unmet empirical residuals (the live-paint born-RED defensibility, real-Safari PAINT certification, the ship forgery + capture-wiring, the un-committed F0 gate).

---

## §0″ — HEAD GROUND-TRUTH, RE-VERIFIED ON DISK (the §0′ inversion CONFIRMED, the corpus counts DERIVED)

Every §0′ disposition re-checked against `71e1c641` by `git ls-files` + a real `(`-call-site grep (excluding the def-line + JSDoc). The inversion holds and the counts are now disk-proven, not transcribed:

| Symbol / corpus | DISK TRUTH @ 71e1c641 (re-verified) | Disposition |
|---|---|---|
| `useDockContextSilhouette.ts` | **PRESENT 551L · 0 real call-sites** (confirmed: grep `useDockContextSilhouette(` over src = 0 after def+JSDoc exclusion) · release-tagged `proof:dock-context` | **DEAD → DELETE** file + ratchet-row + gate, ONE atomic diff |
| `useDockFission.ts` | **PRESENT · LIVE** — `GlassDock.vue:373-374` `props.splittable ? useDockFission({…})` + the `src/index.ts:237` recipe note + 2 demo | **LIVE → KEEP** engine + `proof:dock-fission` |
| `useLiquidMorph.ts` | **PRESENT 462L · 0 real call-sites** + `liquid-morph.css` 850L (demo-only, mis-placed in `src/styles/`) | **DEAD → DELETE** (rehome the CSS to demo) |
| `useHaptic.ts` | **PRESENT 138L · 0 real call-sites · exported** root-barrel + `/api` | **DEAD-but-exported → RETIRE + drop exports** |
| `useCelebrationBurst.ts` | **PRESENT · 0 real call-sites · gate `["local","ci"]` (NOT release)** | DECIDE wire-≥2 or fold into CompletionSeal (gate already off release) |
| `useBloomUp.ts` | **PRESENT · 2 real call-sites** | **LIVE → KEEP** |
| AX DISPOSITION-REGISTER | `JSON.parse(REGISTER).items.length === 31`; `grep '"id"' === 32` (the extra id is the `selfTest` fixture's own id; `j.selfTest` key present) | **AX = 31** — the brief's "AX=32 not 31" is itself the drift (see §D″) |
| BE + BF wave-specs | `ls BE/waves \| grep ^BE\.W- === 39`; BF === 31 → **70** | prose's "69" is stale |
| BF DEFERRED-CENSUS | `grep -oE 'D[0-9]+' \| sort -u === 32` (D1–D32) | confirmed |

**THE INVERSION (load-bearing for Band 1, disk-confirmed):** the dead-gate set is NOT "gates over absent code" — it is **release-gated PRESENT-but-dead engines**. `proof:dock-context` guards a present-and-dead 551L engine → the cleanest atomic delete. `proof:dock-fission` guards a present-and-LIVE engine → KEEP. A naive "downgrade the release-tagged dead gates" would strip enforcement from `dock-fission`/`bloom-up`/`metaball-bridge2` (all live). The F6 gate→symbol map MUST be derived by **importing** `gates.mjs` (§E″), and each disposition computed from **real `(`-call-sites (src AND demo)**, never name-presence.

---

## §B″ — THE LIVE CALIBRATION, RE-GROUNDED (pass-2's born-RED claims were partly falsified; this is the honest frontier)

SPEC-pass2 §B′ asserted a binding live-pixel reproduction table. Its own critique (40% [refine]) and the BG forensic audits **falsify three of its five verdicts** — the measurements were unreproduced, sampled the wrong region/moment, and read the wrong substrate. The converged §B″ states what is **defensibly reproduced**, what is **falsified-and-re-localized**, and what is **DECIDED-phantom-with-trigger** — and makes the on-disk artifacts the binding deliverable, because **the central reason pass-2's bar is unmet is that nothing is on disk** (every pass-2 symbol — `fieldHueStats`/`edgeCastFraction`/`topBarStripDelta`/`regionStatsFromDecoded` — is absent from `reflect-capture-verify.mjs`; the roster `.md` is absent so `proof:ba-gestalt` currently FAILs).

### §B.1″ — The corrected reproduction table (the binding born-RED reality)

| Pass-1/2 named defect | Falsification (from the critique + audits) | CONVERGED disposition |
|---|---|---|
| **Field non-warm cast (HUE)** | A fresh same-method/viewport serve of `/` reads **full-page hue 32.8°, region-agreement 26.5° → INVALID/skip** — NOT the pass-2-claimed 7.1° valid-RED. The field **corners** read warm-OK **77–85°** (the field is hue-CORRECT). The red the prototype caught is the **designed hero pink→blue gradient + the centre aurora viz** (CONTENT, not field). And byte-identical re-capture proves the headless shoot read the **SwiftShader/CSS fallback ground**, not the live GL field. | **NOT a defensible HUE born-RED.** Re-localize: a **field-ONLY corner/margin probe** captured with a **real GPU (`--use-gl=angle`)** so the surface under test is the user-visible live-GL paint. The REAL field defect is **structural** (§B.2″, D-field-aurora: 3 stacked competing field systems, metallic paper-field-not-aurora) → gated by a **SOURCE arm + a corner-field-variance π**, NOT a `meanHue` band. The `meanHue` band is kept ONLY as a chroma-gated + region-agreed + real-GPU **content guard** with the measurement-validity bite. |
| **Metallic field chroma 0.115–0.155** | every field region `meanChroma 0.018–0.052`; the 0.16–0.18 `chromaMax` peaks are isolated legit aurora/swatch pixels | **DOES NOT reproduce as a regional MEAN** → `chromaCeiling` is a **content-leak guard** (a mis-placed probe whose mean is lifted past 0.10 by a saturated swatch), never the cast detector. DECIDED-not-the-field-defect. |
| **Dock edge-cast `rgb(49,0,0)`** | dock left-edge `meanHue 42–77°` warm, no `R≫G≈B≈0` signature, `edgeCastFraction ≈0` on every live route | **PHANTOM on live HEAD** → **DECIDED `FIXED-OR-PHANTOM` in the FOLD-LEDGER with a re-enable trigger**; the self-test bite stays armed so a `rgb(49,0,0)` regression re-reds. Removed from the live born-RED bar. |
| **Top-bar strip** | **D5 CONFIRMS the defect** — `.demo-scroll-progress` composes `scroll(--demo-main-progress block)`, but `scroll()` accepts only `root\|nearest\|self`; a named `<dashed-ident>` is invalid → `animation-timeline` computes to **`auto`** → `gl-scroll-grow` completes instantly → the 2px hairline is stuck at **`scaleX(1)` = full-width on every page**. `topDelta 0.16–0.20` on static-wash routes. | **REAL DEFECT (resolves OPEN RISK #1 — it is the broken scroll-rail, NOT the masthead).** Band on `topBarStrip topDelta ≥ 0.10` **localized to a ≤3px hairline** (the predicate measures strip HEIGHT so a legit warm masthead band does not false-RED). The fix is WS1 (BG.W-SCROLL-PROGRESS-RAIL); the WS7 oracle DETECTS it. |
| **Routing strand (survivor identity)** | **D-routing CONTRADICTS pass-2's "phantom".** Pass-2 sampled at REST and found `articles==1` → declared phantom. But that was a **sampling error**: D-routing (live HEAD) proves the stale article coexists for the full 1.2s window AND **the SETTLED survivor is non-deterministically the STALE heading** (url `/substrates`, surviving heading "Glass, paper…"). | **REPRODUCES on the live tree** (non-deterministically) → the predicate is **survivor-IDENTITY** (the settled single `<article>`'s heading === the destination route's heading over ≥6 hops), poll-to-stable — NOT `articleCount==1` (which is permanently true at rest and misses the strand). §B.3″. |

**THE CONVERGENCE-CRITICAL CONSEQUENCE:** pass-2 over-corrected pass-1 — it banded the field on a HUE cast that does not survive a field-only/real-GPU read, AND it wrote off routing as a phantom that the forensic audit proves real. Both errors are the same disease (a measurement that samples the wrong region/moment/substrate and reports a number that drifts from a re-run). The converged bar bands on **what reproduces under a defensible probe**: the top-bar hairline (D5-confirmed), the routing survivor-strand (D-routing-confirmed), and the field **structural** defect (D-field-aurora-confirmed via a SOURCE arm + variance π) — and quarantines the field-HUE-as-cast, the edge-cast, and the metallic-chroma-mean as DECIDED-phantom-with-trigger.

### §B.2″ — The field defect is STRUCTURAL, gated by source + variance (not a hue band)

D-field-aurora proves the real defect: **three competing field systems stack behind every page** — (1) the global `<PaperBackdrop field>` metallic cel-plane mounted UNCONDITIONALLY at `AppShell.vue:360` (z `-11`/`-10`), (2) the per-route StoryHero background (z `-10`/`-5`), (3) the DockStage aurora (z `-1`, flagship dock routes only) — "on most routes the user sees layer (1), the metallic paper field, NOT an aurora." The hue is warm (`--field-hue` is set warm), so a `meanHue` band cannot catch it. `BG.W-GATE-FIELD-AURORA` gates the structural fix:

- **SOURCE arm** — assert ONE field system reaches the painted root (the `paper.css` conic/`feTurbulence` cel-plane retired onto the single offscreen-paused shell aurora; the unconditional `<PaperBackdrop field>` mount removed or folded into the one shell), born-RED on the 3-stack at HEAD.
- **The corner-field-variance π** — a field-only corner/margin probe (where no card/hero/viz shows), captured with a **real GPU**, asserts the **live-aurora structure signature** (variance-over-busy-backdrop, the `glassyByBleed` discipline — aurora stdev ≈0.217 vs a static cel-plane's near-flat) — NOT a hue test. This is the live-paint born-RED for the field, and it is the residual this pass did not yet shoot on a real GPU (see §RESIDUAL).

### §B.3″ — The routing predicate, CORRECTED (identity-over-≥6-hops, born-RED on the live tree)

`BG.W-GATE-ROUTING-LIVE` (`proof:route-navigates`, CI-headless DOM, `release`-tagged): walk ≥6 cross-category hops; per hop, **poll-to-stable** (wait until `.fade-slide-enter/leave-active` count == 0 AND the `<article>` count is stable across N reads — no fixed 1800/500ms timer), then assert: (a) the OLD route's heading is GONE, (b) the settled `<main>` carries exactly one `<article>`, **(c) that surviving `<article>`'s heading === the DESTINATION route's heading** (the survivor-identity check — the real defect is the non-deterministic STALE survivor, D-routing F1). The heading detector is restricted to `h1, h2, .story-hero-title` (not blanket `[data-testid]`). Nav primitive: route-table-derived hop targets + a SidebarDock RouterLink-click fallback (distinguishes dispatch-failure from genuine-no-nav). **Born-RED on the live tree** (the stale survivor reproduces non-deterministically); a `page.setContent` stranded-heading fixture is the deterministic self-test bite (MUST flag `oldGone` AND a stale-survivor; a clean-detach fixture MUST pass). `reducedMotion:'no-preference'` pinned. Release-teeth BLOCKED-ON `BG.W-SHIP-DISCIPLINE` (the served-demo provisioning is the spine's; without it the gate SKIPs on CI).

### §B.4″ — The decoder + the DEFECT-LOCALIZATION-MAP are the binding ON-DISK deliverables

`BG.W-PAINT-IS-THE-GATE`'s acceptance is **not met until the artifacts land on disk and the gate runs end-to-end** (the critique's load-bearing MUSTFIX — a born-RED that cannot be re-run from committed disk + a fixed capture is not a born-RED):

1. **The decoder extension in `reflect-capture-verify.mjs`** — accumulate per-pixel `a,b` (`meanA/meanB → meanHue = atan2(b,a)·180/π`) + `chromaMax` + the strip/edge spatial helpers + the **chroma-gate + region-agreement guard**, ONE decoder, no new color-math (the canvas-unify discipline). Each predicate ships a born-RED self-test bite (synthetic violator REDs, clean control passes) **AND a measurement-validity bite** (a low-chroma warm plate `chroma 0.03` with hue noise must NOT trip a `meanHue` band — pass-1's predicate would have read noise and false-RED'd every translucent glass surface).
2. **`docs/tranches/BG/audit/reflect/DEFECT-LOCALIZATION-MAP.md`** — per band, the exact `(route, fractional-region, colorScheme, interaction-state, GPU-mode)` where it reds on a live served capture, the measured number, and the calibrated threshold-with-margin. **Bands are calibrated from this map, never hand-set; every threshold pins to a committed capture + documented region**, never a report sentence (the top-bar `0.069`-vs-`0.16–0.20` and the field `7.1°`-vs-`32.8°` contradictions are the proof that hand-reported numbers drift).
3. **The persisted PNGs** the map was measured from, captured with a real GPU.
4. **The roster `bg-gestalt-roster.md` shipped TOGETHER with the decoder** so `proof:ba-gestalt` runs end-to-end and born-REDs on 4.2.0 with the self-test bites flagging (today the gate FAILs because the BG roster is absent — the prototype's "16 PASS" was measured against the orphaned BC baseline).

The corrected predicate table:

| Predicate | CONVERGED math | Live anchor / disposition |
|---|---|---|
| `meanHue=lo..hi` | reported ONLY where `meanChroma ≥ 0.025` AND `\|center−full\| ≤ 15°` (region-agreement), captured on a real GPU; else `meanHue=undefined` and the band SKIPS | a **content guard**, not the field-cast detector — the field is hue-warm; this catches a metallic/red/violet CONTENT cast, never a designed gradient or a noise-hue plate |
| `chromaCeiling<=v` | content-leak guard (`meanChroma ≤ 0.10`) | DECIDED-not-the-field-defect; catches a mis-placed probe |
| `edgeCastFraction` | tight ≤6px band outside the plate bbox, `R∈[25,90] ∧ g≤20 ∧ b≤25 ∧ R>2.5g ∧ R>2b` | **DECIDED-phantom-with-trigger** (synthetic `rgb(49,0,0)`=1.0, clean<0.02 — the bite stays armed) |
| `topBarStrip` | `\|row(y=1) − row(y≈6%h)\|` content-width DELTA, **localized to a ≤3px hairline height** | **REAL** (D5) → RED `≥0.10`; the height-localization stops a masthead false-RED |
| `fieldVariance` / `glassyByBleed` | DERIVE live from the field corner + the dock-pill + scroll-card roster (variance-over-busy-backdrop, real GPU, never an α test) | the **field structural** detector (live-aurora stdev ≈0.217 vs static cel near-flat) |
| `routeSurvivorHeading` | poll-to-stable, settled `<article>` heading === destination heading over ≥6 hops | **REAL** (D-routing) |

---

## §A.4″/§G″ — REAL SAFARI: the var()-RESOLUTION answer is GREEN, the PAINT certification is UNVERIFIED (the double-reversal reconciled)

SPEC-pass2 §G.2′ claimed "var()-in-`-webkit-backdrop-filter` RESOLVES on WebKit 26.4, every tier's computed `webkitBackdropFilter` is a literal blur, the lens APPLIES not degrades — spec premise falsified." Its critique (54% [refine]) **falsifies the paint half of that claim**: the read was a `CSS.supports` + `getComputedStyle` computed-value read (PROPERTY-SET, not PAINT), taken via the Playwright-WebKit proxy (NOT real safaridriver Safari), and `safaridriver` session creation was precondition-blocked (never run end-to-end). WebKit bug 245510 is **OPEN** (a render bug). The converged Safari position splits the two answers by what each method can certify, and reconciles with the repo's own prior-art `docs/tranches/BD/viz/critique/safari.md`:

- **§G.2″ — The var()-RESOLUTION answer (engine-level CSS parse) is GREEN, version-scoped.** `var(--glass-blur-*)` inside `-webkit-backdrop-filter` **resolves to a literal `blur(Npx)`** on the close machine's WebKit 26.4 engine (wash `blur(1px)`, quiet `blur(8px)`, resting `blur(10px)`, floating/overlay `blur(13px)`, dock `blur(9px)`, control-surface `blur(8px)`, lens `blur(10px)`). This is an engine-level CSS-resolution fact a `getComputedStyle`/`CSS.supports` read CAN certify (parsing ≠ rasterization), so the Playwright-WebKit proxy is a VALID instrument **for this question only**. `CONSTRAINTS.md` records the **Safari-version matrix**: 26.4 is a POINT sample; a var()-in-`-webkit-` GREEN on 26.4 does **not** cover Safari ≤18 (MDN compat #25914) — a single-version certification greening a fix that fails on ≤18 is its own green-lie, so the §G.3 constraint is scoped to "the recorded version" with the ≤18 gap a **WS3 literal-bake FOLD-LEDGER trigger**.
- **§G.5″ — The PAINT certification (goo merge, lens, glass blur) is UNVERIFIED on real Safari → documented-manual with a trigger.** The "lens APPLIES not degrades" claim is **DELETED** (`CSS.supports` + a set property are not a painted displacement). Reconcile with `BD/viz/critique/safari.md` (the repo's own real-WebKit fence — lens degrades-gracefully real on WebKit; bug 245510 OPEN): the honest verdict is **lens degrades-gracefully** (the pass-1 position RESTORED) and **displacement-PAINT UNVERIFIED** pending a real-Safari SCREENSHOT (pixel-read the displaced backdrop / the metaball merge). The goo metaball is provably WebKit-SAFE by SOURCE (`GooFilter` uses regular `filter:url()`, not `backdrop-filter:url()`) — but "painted" is a screenshot-arm claim, not a computed-style claim.
- **§G.8″ — The Playwright `webkit` proxy is SCOPED to the var()-resolution/computed-value answer ONLY (§G.8′ forbids it from certifying the lens/C-SAFARI).** Every PAINT/raster claim routes through **real `safaridriver`** OR a **documented-manual real-Safari capture**. Because `safaridriver` session creation is precondition-blocked at HEAD, the **in-ceremony branded certification falls to a documented-manual real-Safari capture with an explicit FOLD-LEDGER trigger** (re-enable the automated arm when the one-time close-machine enable — `sudo safaridriver --enable` + Safari Develop → "Allow Remote Automation" — is proven end-to-end once). The verdict still writes `webkit.glass`/`webkit.goo`/`webkit.lens` into the attestation; the CUT requires `webkit.glass==pass AND webkit.goo==pass`, never the proxy.
- **§A.4″ — Serve the actual DEMO against dist (the §A.4′ ask), not a synthetic 9-div probe.** `BG.W-SAFARI-PARITY-GATE` ships `demo/vite.demo-dist.config.ts` (aliases `@mkbabb/glass-ui → dist`, imports the built `@mkbabb/glass-ui/styles`) + `demo:dist:build`/`demo:dist:serve` scripts so the shipped `-webkit-backdrop-filter` pair is the surface under test on real-component (Button/GlassDock) Safari paint. If aliasing the demo's local `../@/` and `../src/` imports onto dist is infeasible, **state it explicitly** and downgrade the per-tier fixture's self-description from "the faithful served surface" to "a per-tier CSS-resolution fixture" (it does not exercise real-component paint). Re-verify the `/styles` vs `/styles.css` correction: `dist/styles/index.css` already `@import`s `styles.css` (the SFC bundle fold) — confirm whether `/styles` alone carries the full `-webkit-` pair coverage before asserting the double-import is required (the redundant import in the probe suggests the correction is overstated).
- **§G.3″ — The base-glass var() reality, recorded.** If the computed read REDs on real Safari (var() un-resolved on some tier or a ≤18 close machine), that is a **WS3 literal-bake fix** (resolve `var(--glass-blur-*)` to a literal in the shipped `-webkit-` arm; honest trade — Safari loses per-instance `--glass-level` retune but KEEPS the blur floor), recorded as a FOLD-LEDGER row, never waved through.
- **Land the mechanism as a real gate, not scratch.** `scripts/proof-safari-parity.mjs` (SOURCE arm — every `filter:url()`/`backdrop-filter:url()` is regular `filter:url()` OR `@supports`-gated with a non-goo floor; every 0-alpha stop explicit `oklch(L C H / 0)`; route transition engine-agnostic CSS not `startViewTransition`; squircle `clip-path` floor; `light-dark()` no inset-shadow fragment) + `demo:dist:build`/`serve` + the `SHIP-ATTESTATION.json` `webkit.{glass,goo,lens}` verdict field, reconciled with the existing `proof:safari-webgl` gate (no second WebGL-degrade fork).

---

## §A.5″ — THE SHIP-SEQUENCING, WIRED + the forgery-resistance overclaim DELETED

The no-deadlock ARCHITECTURE is sound (sandbox-proven: build emits gitignored `dist/` so porcelain stays empty; ship writes the attestation under `docs/` — the only change; `git add` + commit → porcelain EMPTY → the existing L60 check passes). But the §A.5′ prototype **consumed the digest from a `GLASS_UI_SHIP_DIGEST_SOURCE` env var** (not a live in-ceremony shoot) and **overclaimed forgery-resistance**. The converged §A.5″ folds the six mustFix:

```
release.sh (Mac, CI UNSET):
  1. fresh /tmp worktree (siblings + precepts-submodule absent)
  2. build dist + build demo-dist target (§A.4″)
  3. gates.mjs --run ship              ← serves SRC demo (paint) + demo-dist (Safari);
                                          --run ship ITSELF serves + captures (the BG.W-PAINT
                                          capture pipeline) — NEVER consumes a pre-fed digest env;
                                          writes SHIP-ATTESTATION.json to docs/tranches/BG/ (the
                                          canonical ATTESTATION_REL already in proof-ba-gestalt.mjs:84,
                                          OUTSIDE every surface-path closure — §A.6 self-ref guard
                                          via the shared scripts/lib/surface-closure.mjs isPaintSource leaf)
  4. git add docs/tranches/BG/SHIP-ATTESTATION.json && git commit   ← tree re-clean
                                          (justify or remove --no-verify; it bypasses .githooks/commit-msg)
  5. [existing] git status --porcelain clean check (L60)            ← now passes
  6. [existing] gates.mjs --run full (L84) — fail-CLOSED on the `test` gate (no short-circuit-swallow)
  7. user gate · git tag (L93) · push
release.yml (ubuntu, post-tag, device-free — --run-full ONLY, NO --run ship: no GPU/Safari):
  gates.mjs --run full → proof:ship-attestation (NEW, before npm publish) → npm publish --provenance
```

- **§A.5.1″ — Wire the CAPTURE into the ship spine.** `--run ship` SERVES + CAPTURES in-ceremony (invokes the BG.W-PAINT-IS-THE-GATE capture pipeline), producing the digest from a live render — NOT consuming a hand-fed `GLASS_UI_SHIP_DIGEST_SOURCE`. `release.sh`'s ship-block is proven end-to-end with a REAL capture, or the "no deadlock end-to-end" is unproven and `release.sh` fail-closes. (This is BLOCKED-ON §B.4″'s decoder + roster landing — the capture pipeline must exist first.)
- **§A.5.2″ — DELETE the forgery-resistance overclaim.** `surfaceHash` is over SOURCE bytes, so the embedded-digest re-application catches a **LIED verdict-vs-numbers** (the embedded numbers must re-pass the re-applied BG bands) but **NOT a fabricated-green digest** whose numbers happen to pass the bands over consistent source bytes. The LEARNINGS sentence "a hand-write cannot forge without a real shoot" is **DELETED**. The honest Phase-1 trust spine: the in-ceremony live capture + the **re-stamp/frozen/skip-REDs inversion** (`proof:ship-attestation` does NOT import `liveArmCiGraceSkip` — absence-is-FAIL) + the content-hash (a paint source changing after the shoot REDs). This is sufficient against re-stamp/frozen/skip (the C-PAINT chronic that shipped 3×) but NOT against a malicious hand-forge — which is **out of the Phase-1 threat model** (a human operator at the close machine running `release.sh`). C-PAINT forgery-resistance-beyond-re-stamp is recorded **DROP-WITH-TRIGGER** in the FOLD-LEDGER (re-enable when capture-signing or the OIDC capture-identity binding lands).
- **§A.5.3″ — Gate-LOCK the deadlock-free ORDERING + fix the first-match bug.** Extend `proof-close-battery-parity.mjs` to assert the ship-write + commit appears **BEFORE** the L60 porcelain check in `release.sh` (a reorder REDs — a string-presence check of `--run ship` is insufficient). Fix the first-match `.match(/gates\.mjs\s+--run\s+\w+/)?.[0]` bug (clauses 2 & 3 grab the FIRST `--run X` — with both `--run ship` and `--run full` present, the parity check must read the `--run full` invocation specifically, not the first match). **Scope `--run ship` to `release.sh` (Phase-1/Mac) ONLY**; `release.yml` (ubuntu) stays `--run full`-only — confirm clause 3's first-match on `release.yml` is not broken by the change, and the BOTH-full-AND-ship requirement is NOT applied to the yml clause.
- **§A.5.4″ — Fix the test-short-circuit at the root.** `test` is ALREADY `["local","ci","release"]` (in the `--run full` union) — the mustFix is **fail-CLOSED enforcement**: `--run full` must RED (no short-circuit-swallow) when `test` fails (the BD P10a defect: 4.2.0 shipped with 17 failing unit tests + the battery short-circuiting at `test`). Replace the contrived `testSwallow` regex over `release.sh` (which targets a file that never runs vitest) with a structural self-test that plants a close-path short-circuiting at `test` and asserts the battery REDs.
- **§A.5.5″ — Compose the landed leaf, do not re-implement.** Import `scripts/lib/surface-closure.mjs` (`deriveSurfaceClosure`/`isPaintSource`) + the canonical `ATTESTATION_REL = "docs/tranches/BG/SHIP-ATTESTATION.json"` (already wired into `proof-ba-gestalt.mjs:84`, with the §A.6 self-reference guard at the P6(c) clause L728). Fix the `release.sh` `git add` path to the canonical `docs/tranches/BG/SHIP-ATTESTATION.json` (NOT the divergent `docs/tranches/BG/audit/reflect/` location). Do NOT re-implement the self-reference guard — compose the shared predicate.

**§A.2″ — Trust anchor, resolved (theater-or-anchor → answered).** Phase-2 binds `runnerIdentity` to the OIDC `id-token: write` `release.yml` already carries (L33, for `--provenance`) — `authoredBy` (git committer) ≠ the OIDC actor is genuinely same-identity-fenced at CI; the same-identity-REDs self-test is build-provable against that field. **Phase-1 (Mac close) has NO orchestrator-injected write-fenced token** (grep `runnerIdentity`/`CLOSE_TOKEN` empty). Per the spec's own fork: **DROP the `authoredBy≠runnerIdentity` check on the Phase-1 path with an explicit FOLD-LEDGER trigger row** (re-enable when an orchestrator token lands) rather than ship an always-distinct field whose same-identity self-test never fires in normal operation. Also address the siblings-absent `/tmp` worktree ↔ real-repo tag reconciliation (the sandbox proof tagged in `/tmp`; the real ceremony must reconcile the tag back to the canonical repo).

`proof:ship-attestation` (release-tagged, NO grace-skip): SHIP-ATTESTATION.json EXISTS (absent → RED, not skip); recompute the DERIVED paint-source `surfaceHash` at HEAD === the embedded hash; re-apply the BG band grammar (`parseExpect`/`evalBand`, pure) to the EMBEDDED per-surface pixel digest (a forged JSON's numbers fail the re-applied bands OR the hash — the bounded claim, NOT forgery-proof); `webkit.glass==pass AND webkit.goo==pass`; the self-reference guard via the shared leaf.

---

## §D″ — F0 FORWARD-COMPLETENESS, HARDENED (AX=31, the brief's "32" is the first self-test bite)

The corpus is DERIVED at gate time, never transcribed. **The synthesis brief itself carries the drift F0 exists to catch** — it mandates "AX=32 not 31" while disk proves `items[].length === 31` (the `grep '"id"' === 32` counts the `selfTest` fixture's own id). The brief's "32" is the empirical proof of the F0 thesis (hand-authored numbers drift) and ships as F0's **FIRST self-test bite**. Pass-2's prototype derived all counts correctly (ax=31, bf=32, waves=70, in-src-markers=3 → union 136). The folded mustFix:

| Corpus | Accessor (DERIVED) | Count @ HEAD |
|---|---|---|
| AX register | `JSON.parse(REGISTER).items.map(i=>i.id)` — **EXCLUDE `selfTest`** | **31** (the brief's "32" REDs) |
| BF DEFERRED-CENSUS | `D[0-9]+` regex over `BF/audit/DEFERRED-CENSUS.md`, unique | **32** (D1–D32) |
| BE+BF wave-ids | `readdir(BE/waves)+readdir(BF/waves)` `^B[EF]\.W-` | **70** (39+31; prose's 69 stale) |
| in-src books | strict canonical `CONSUME(` + `BOOKED:` markers — EXCLUDE bare `successor` (narrative prose) | grep-DERIVED (3 markers) |

- **F0 corpus-completeness:** `expectedCount = |bfCensusIds ∪ axRegisterIds ∪ waveSpecIds ∪ inSrcMarkers|` — a DERIVED invariant; RED if any derived id lacks a DECIDED FOLD-LEDGER row. The four namespaces are **asserted DISJOINT** inside the gate (`expectedCount === Σ counts`, a 1-line invariant + a bite — by-construction-safe today but unstated, so a future accessor collision that silently shrinks the union REDs).
- **F1.b no-orphan, scoped to F0 NAMESPACES ONLY (the critique's load-bearing mustFix).** An orphan is a ledger row whose id CLAIMS an F0 namespace (`D#` / `AX-slug` / `BE|BF.W-` / `file#KIND`) but is **not** produced by that accessor — NOT any row whatsoever. The census rows (DATE-CALENDAR/CHART-FAMILY/DS-COMPLETE), dead-mechanism rows (useHaptic RETIRE, silhouette DELETE), the FLIP-ONE row, and the Safari-WS3-bake row are spec-mandated (§E″/§I/§A.4″) and MUST coexist without RED. Self-test bites: a legitimate non-F0-namespace census row does NOT trip no-orphan, AND a phantom `D99`/`AX-slug` row DOES.
- **In-src canonical-marker grammar (close the under-derivation hole).** ENFORCE the exact `CONSUME(...)` / `BOOKED:` form — RED any book-shaped in-src comment (a `CONSUME`/`BOOKED` line) NOT in the canonical form (so a future `CONSUME:` or `// books X` RED-fails rather than deriving nothing), with a born-RED self-test planting a non-canonical book. Re-greppable derivation (per §0′ discipline), not a hand-list. RECORD the decision: bare "booked successor" prose books are tracked in their wave specs, NOT here (they are narrative, not src markers).
- **The `sourceRef` id is `file#KIND#slug` (or `file:line`), not `file#KIND`** — so 2+ same-kind markers in one file do not collapse; a self-test with a 2-`CONSUME`-in-one-file fixture proves it.
- **The run-as-main guard** (`import.meta.url === pathToFileURL(process.argv[1]).href`) on the BG gate, so importing it (for the F6 gate-parse) never runs the gate.
- **DRY — extract `scripts/lib/fold-ledger-core.mjs`** (the run-as-main guard, `waveSpecExists`, the DECIDED-set, the F2 disposition / F3 destination-or-rationale logic, the ledger-row schema) and import from BG — **no copy-paste clone of the frozen `proof-bc-fold-ledger.mjs`**. The hard `EXPECTED_COUNT=213` in the BC clone is the exact anti-pattern the DERIVED invariant replaces.
- **Commit the actual gate + emit a REAL ledger.** `scripts/proof-bg-deferred-ledger.mjs` registered in `gates.mjs` (Band-0 wave-1, `["local","ci","release"]`) + `docs/tranches/BG/FOLD-LEDGER.{json,md}` whose **non-wave rows are GENUINELY adjudicated** — BUILD-against-a-real-`BG.W-*`-spec / RETIRE / MET — never blanket-DEFER-with-boilerplate-trigger (the BB.W-NDA-DECIDE chronic: a row that rides deferred forever, never decided, is the soft underbelly F0 must not legitimize).
- **F1–F7 forward** (clone the `waveSpecExists`/band-DERIVED/register-derived primitives FORWARD via the shared leaf; F2 phantom-dest floor; F3 no-undecided/no-`book`/no-re-stamp-only; F4 HELD needs rationale+trigger; F5 one-row-per-source-item; **F6 the gate-parse meta-clause, §E″**; F7 self-test bites).

---

## §E″ — THE DEAD-MECHANISM RECKONING (§0″-corrected; the F6 map by IMPORT, not text-grep)

Atomic delete+gate-retire pairs, dispositions computed from §0″ call-sites. **The F6 mechanism is validated: a hand-grep `id:.*tags:` on one line returns 0 (the registrations are multi-line objects); `gates.mjs` exports `GATES` (360 entries) cleanly behind an `isMain` guard — IMPORTING it IS the idiomatic parse.** Each disposition is computed from real `(`-call-sites (src AND demo; a private-demo consumer counts per the overfitting-audit rule, which keeps fission/bloom-up live).

- **DELETE clean (0 real call-sites, atomic file+gate+ratchet diff):** `useDockContextSilhouette.ts` (551L — drains its `proof-no-god-module.mjs` ratchet row AND retires `proof:dock-context` in ONE diff; do NOT delete only the gate — that leaves 551L dead+untracked); `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L, REHOME to `demo/stories/dock/`); the two dead CSS files `src/styles/glass/liquid-enter.css` (252L, +drop `glass.css:73` @import) + `src/styles/motion/morph-field.css` (229L, +drop `index.css:180` @import); the dead `useMorphField()` body (~196L, gut it, re-home the live `MORPH_SIGNATURES` table to `morphSignatures.ts`, drop the dead-engine re-exports); the dead tokens (`--corner-k-soft/-sharp`, `--corner-shape-card/-pill`, the 3 `--spring-timeline-*` CSS twins, all 0 `var()` reads) + their pinning gate clauses; the `selectableChipVariants.ts` alias shim.
- **RETIRE + drop exports (published-yet-dead):** `useHaptic.ts` (138L — drop the `src/index.ts:285` + `api/index.ts:370` exports; close the "exported" overfitting escape-hatch).
- **KEEP (LIVE — §0″ confirmed):** `useDockFission` (`GlassDock.vue:373` `:splittable`), `useBloomUp` (2 src call-sites), `metaball-bridge2` (live via `useDockOrientationMorph`). `proof:dock-fission`/`proof:bloom-up`/`proof:metaball-bridge2` guard real facilities — KEEP on release. `useCelebrationBurst` (gate already `["local","ci"]`) → DECIDE wire-≥2 or fold into CompletionSeal; no de-gate needed.
- **F6 meta-clause:** the gate→symbol map is DERIVED by **importing** `gates.mjs` registrations+tags; the per-gate disposition is computed from real `(`-call-sites. A `release` gate over a <2-live-consumer symbol REDs.
- **The FLIP-ONE DRY collapse** (4 engines re-fork the `ElementMorph+springTimingFunction` rAF loop while the published kf `flipShared` is imported-and-ignored at `suite.ts:42`) is a **DECIDED FOLD-LEDGER disposition** pointing at a coordinated wave — WS7 names the gestalt, it does not unilaterally rewrite engines WS2/WS6 build on (risk #6).

**Band 1 lands BEFORE Band 2** (the oracle re-point) so the new live oracle never certifies code about to be deleted.

---

## §C″ — THE ROSTER (substantially landed in `proof-ba-gestalt.mjs`; HARDENED with the 5 mustFix)

The surface-path derivation has LANDED (the working-tree `proof-ba-gestalt.mjs` imports `deriveSurfaceClosure`/`isPaintSource`, carries the BG `REFLECT_DIR`/`WAVES_DIR`/`ATTESTATION_REL`, and the §A.6 self-reference guard at P6(c) L728). The folded mustFix:

- **routeSeeds silent-miss → HARD-RED.** A `/cat/story` token in a roster row's routes column that does NOT resolve to a real SFC (the `/cat/story → demo/stories/cat/story.vue` convention) must **HARD-RED** (the roster names a route the gate cannot find), distinct from a prose-only/shell surface (no 2-segment token → a legit shell fallback). The current "empty closure → stale" guard never fires because the shell seed keeps the closure non-empty (479 files). Add a self-test bite feeding a non-existent route that asserts RED — without it a route typo silently degrades a surface to shell-only and re-opens the under-revoke disease.
- **Disclose the TRUE over-revoke breadth.** The whole CSS cascade is in the 479-file shell floor (zero per-surface CSS differentiation), not just `aurora.frag`-via-Konami. The leaf header + the DEFECT-LOCALIZATION-MAP **state explicitly** whether the design accepts **total-CSS-revoke (never-miss, safe)** OR seeds a per-surface CSS sub-closure (the route SFC's own `<style>`/`@import` + component CSS) to localize — the "+27 dock tail" oversells localization and is corrected.
- **State the PNG↔hash scope boundary.** This layer kills byte-stable-stale (a re-point to a byte-stable root — the BD 77-stale-re-point evasion is structurally impossible since the hash covers the transitive closure), but a re-stamp WITHOUT re-shoot still greens the freshness clause. "Re-stamp-only close REDs" is the **ship-attestation digest's job (§A.5″)**, NOT this layer's — do not claim it here.
- **Guard or document phantom-edge pollution.** Displayed import-statement text in story `<template>` literals (proven: `demo/stories/display/card.vue`) injects real `src` edges into the closure. Over-revoke is safe, but note it so the closure SIZE is not mistaken for a true paint dependency.
- **Build the missing deliverables + run end-to-end.** Ship `bg-gestalt-roster.md` with a routes column and run the gate against it before claiming load-bearing (today the gate FAILs — roster absent). The `/cat/story → demo/stories/cat/story.vue` convention is an untested assumption; a deeper-nested or differently-named route would feed the routeSeeds silent-miss above.

Re-point retired the absurd current scope where `aurora` hashes `src/subpaths/aurora.ts` (a 1-line `export *`) and `dock` hashes the `dock.css` `@import`-root (byte-stable when `dock/morph.css` changes). The committed-PNG roster path retires once §A.5″'s digest re-applies the predicates downstream.

---

## §F″ / §H″ / §I″ — UNCHANGED FROM PASS 1/2 (stated for completeness, count-corrected)

- **§F (AX re-stamp)** stands, count-corrected to **31** (not 32): the BC-stamped rows flip BC→BG **in place** (no delete, DERIVED-count loop), every `n:2` trigger re-evaluated, the 2 pending flips verified (`css-relative-color`→BB.W-DARK-INK-WARM, `styles-critical-split`→BB.W-CSS-CRITICAL — note BB; the audits' "BC.W-CSS-CRITICAL" is a phantom-dest the F2 clause catches). Re-stamp-without-decide REDs.
- **§H (constraint manifest + lighthouse)** stands: `CONSTRAINTS.md` (the six binding cross-engine constraints + the iOS-26 numeric ceilings) machine-locked by `proof:constraint-manifest` over LIVE resolved tokens + **the §G.3″ Safari-version matrix** + the one-GL-per-route ↔ Safari-no-flash coupling (WS1's "field everywhere" must be ONE offscreen-paused shell aurora or a static wash, never a 2nd live GL context). Re-pin `scripts/lighthouse/floor.baseline.json` at the achieved number ONLY after WS1–WS6 land; promote `proof:lighthouse` + `proof:no-layout-animation` (CI-only today — the CLS root) into the release-eligible ship arm.
- **§I (new-capability census)** stands: DATE-CALENDAR BUILD-IF-CONSUMER-else-DEFER, CHART-FAMILY DEFER-with-trigger, DS-COMPLETE the census artifact — each verdict a FOLD-LEDGER row against the ≥2-consumer bar (a genuinely adjudicated row per §D″, never blanket-DEFER-boilerplate).

---

## FILES TOUCHED (delta over pass-1/2 §FILES)

**New:** `scripts/proof-bg-deferred-ledger.mjs` + `scripts/lib/fold-ledger-core.mjs` (the shared DRY leaf) + `docs/tranches/BG/FOLD-LEDGER.{json,md}`; `scripts/proof-ship-attestation.mjs` + the `--run ship` dispatch (serves+captures in-ceremony); `scripts/proof-route-navigates.mjs` + spec (survivor-identity); `scripts/proof-field-aurora.mjs` (SOURCE arm + corner-variance π) / `-previews-render.mjs` / `-uniform-blur.mjs` + π specs; `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + **`DEFECT-LOCALIZATION-MAP.md`** (the on-disk born-RED witness) + the persisted real-GPU PNGs; `scripts/proof-constraint-manifest.mjs` + `docs/tranches/BG/CONSTRAINTS.md` (incl. the Safari-version matrix); `scripts/proof-safari-parity.mjs` (SOURCE arm) + the documented-manual real-Safari capture procedure; **`demo/vite.demo-dist.config.ts`** + `demo:dist:build`/`serve` scripts; `docs/tranches/BG/audit/DS-COMPLETENESS-census.md`; `docs/tranches/BG/waves/BG.W-*.md`.

**Modified:** `scripts/reflect-capture-verify.mjs` (hue+chromaMax+strip/edge helpers + the chroma-gate + region-agreement guard + the measurement-validity bite; the digest emitter); `scripts/proof-ba-gestalt.mjs` (the predicate vocabulary + the routeSeeds HARD-RED + the over-revoke disclosure — the BC→BG re-point + surface-closure + self-ref guard already landed); `scripts/release.sh` (the §A.5″ ship-block before porcelain; the canonical git-add path); `.github/workflows/release.yml` (`proof:ship-attestation` before publish; OIDC `runnerIdentity` Phase-2 only); `scripts/gates.mjs` (register new gates; `--run ship` Mac-only; the F6-by-import dead-gate diff); `scripts/proof-close-battery-parity.mjs` (require `--run ship` beside `--run full`; gate-LOCK the ordering before porcelain; fix the first-match bug; RED short-circuit-at-`test`); `package.json`; `scripts/lighthouse/floor.baseline.json` + `proof:lighthouse` tag promotion; `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (re-stamp 31 rows in place); `tests-visual/playwright.config.ts` (webkit SCOPED to the var()-resolution proxy role).

**Deleted (clean break):** `useDockContextSilhouette.ts` (atomic with its gate+ratchet row); `useLiquidMorph.ts` + `liquid-morph.css` (rehome); `liquid-enter.css` + `morph-field.css` + their @imports; the dead `useMorphField()` body; `selectableChipVariants.ts`; the dead tokens + pin-clauses; the F6-identified dead-engine gate registration (`proof:dock-context`); the `useHaptic` exports.

---

## THE BG.W-* WAVE BREAKDOWN (each wave carries its validated mechanism + real-paint-π bar + folded deferred items)

**Band 0 (no-silent-drop, FIRST):**
- **BG.W-DEFERRED-LEDGER** — F0 DERIVED, accessor-disambiguated (AX `items[].id`=31, the brief's "32" the first self-test bite); the four namespaces DISJOINT; F1.b no-orphan scoped to F0 namespaces; the canonical in-src marker grammar; `file#KIND#slug`; the DRY `fold-ledger-core.mjs` leaf; the gate committed + registered + a REAL adjudicated `FOLD-LEDGER.{json,md}`.
- **BG.W-BE-BF-LEDGER** — 70-wave parity (LANDED-names-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** — 31 BC-rows BC→BG in place, n:2 re-eval, 2 flips verified.

**Band 1 (dead-mechanism, §0″-corrected, BEFORE Band 2):**
- **BG.W-SPIKE-DELETE** — silhouette 551L + liquid-morph 462L + liquid-enter 252L + morph-field 229L + useMorphField body + tokens + alias shim, atomic file+gate+ratchet diffs; rehome liquid-morph.css to demo.
- **BG.W-JUBILANCE-DECIDE** — RETIRE useHaptic + drop exports; DECIDE useCelebrationBurst; record FLIP-ONE.
- **BG.W-DEAD-GATE-SWEEP** — F6 gate→symbol map by IMPORT; DELETE `proof:dock-context` (dead engine) atomically; KEEP dock-fission/bloom-up/metaball-bridge2 (live); register-or-delete `proof:de-shadcn`.

**Band 2 (live-paint oracle, born-RED on what REPRODUCES under a defensible probe):**
- **BG.W-PAINT-IS-THE-GATE** — the decoder + chroma-gate + measurement-validity bite + the DEFECT-LOCALIZATION-MAP + the persisted real-GPU PNGs (the on-disk born-RED). The top-bar hairline (D5) + the field corner-variance (D-field-aurora, real GPU) are the live born-RED; edge-cast / metallic-chroma-mean / field-HUE-as-cast are DECIDED-phantom-with-trigger.
- **BG.W-GESTALT-ROSTER-RE-POINT** — the §C″ hardening (routeSeeds HARD-RED, over-revoke disclosure, PNG↔hash scope, phantom-edge note, roster .md shipped + run end-to-end).
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** — the §A.5″ wired spine (capture-in-spine, ordering gate-locked, first-match fixed, forgery-overclaim deleted, test-short-circuit RED'd, OIDC Phase-2-only, Phase-1 anchor DROPPED-with-trigger, the shared leaf composed).
- **BG.W-GATE-ROUTING-LIVE** — survivor-identity over ≥6 hops, poll-to-stable; born-RED on the live tree (the non-deterministic stale survivor, D-routing); the stranded-heading self-test bite.
- **BG.W-GATE-FIELD-AURORA** — the SOURCE arm (ONE offscreen-paused shell aurora; retire paper.css conic/feTurbulence + the unconditional PaperBackdrop mount) + the corner-field-variance π (real GPU).
- **BG.W-GATE-PREVIEWS-RENDER** · **BG.W-GATE-UNIFORM-BLUR**.

**Band 3 (floors):**
- **BG.W-SAFARI-PARITY-GATE** — the var()-RESOLUTION GREEN (engine read, version-matrix-scoped) + the PAINT certification via documented-manual real-Safari capture (lens degrades-gracefully, paint-UNVERIFIED-pending-screenshot, reconciled with BD safari.md) + the demo-dist serve + the SOURCE arm + the proxy SCOPED + the falsified "appears FIXED" / "lens APPLIES not degrades" quarantined.
- **BG.W-CONSTRAINT-MANIFEST** — CONSTRAINTS.md (+ Safari version matrix + GL↔flash coupling) + the iOS-26 ceilings + lighthouse re-pin + `proof:no-layout-animation` → release.

**Band 4 (census):** **BG.W-DATE-CALENDAR** · **BG.W-CHART-FAMILY** · **BG.W-DS-COMPLETE** — each a genuinely-adjudicated FOLD-LEDGER row.

**Band 5 (honest re-cut, LAST):** **BG.W-CUT** — the tag fires only after the ship arm passes against the served demos over the BG roster with the localized predicates, siblings-AND-precepts-submodule-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` verdict + the user gate; closes the BD P10a/P10c tail (17 failing unit tests + short-circuit-at-`test` + the harden tail). The falsified "appears FIXED" / "lens APPLIES" must NOT propagate into the CUT.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR (re-grounded on the corrected measurements)

**Born-RED on the shipped 4.2.0 tree (against ACTUAL live captures, §B″):**
- `proof:ba-gestalt`/`proof:field-aurora` FAIL over the live field via the **corner-field-variance π on a real GPU** (the static cel-plane / 3-stack reads NOT-an-aurora) and the **top-bar hairline** (`topDelta 0.16–0.20`, D5) — NOT a `meanHue` band (the field is hue-warm; the hue band is a chroma-gated content guard with the measurement-validity bite).
- `proof:route-navigates` FAILS via the **survivor-identity** check (the non-deterministic stale heading survives a hop, D-routing) — NOT `articleCount==1` (permanently true at rest). The deterministic self-test bite is a `page.setContent` stranded-heading fixture.
- The **edge-cast, metallic-chroma-mean, and field-HUE-as-cast** predicates are DECIDED-phantom-with-trigger in the FOLD-LEDGER — their self-test bites stay armed so a regression re-reds; they are NOT in the live born-RED bar.
- `proof:bg-deferred-ledger` FAILS (the DERIVED corpus is UN-DECIDED; the AX-`32`-literal, the non-canonical-book, the `selfTest`-fixture, the phantom-`D99` self-tests all RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / webkit verdict absent).

**GREEN only when** the field paints the ONE offscreen-paused shell aurora (corner variance reads live-aurora) · the top-bar hairline is gone · routing keeps the destination-heading survivor over ≥6 hops · every DERIVED deferred item is genuinely DECIDED · every `release` gate (DERIVED from the import-parse) locks a ≥2-consumer mechanism · real Safari resolves var() to a literal blur on every `.glass-*` tier (version recorded) + the documented-manual capture certifies glass+goo paint (lens degrades-gracefully) · the constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD on a real GPU** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar (the bounded trust: re-stamp/frozen/skip REDs; malicious hand-forge is out of the Phase-1 threat model, DROP-WITH-TRIGGER). The committed-PNG path retires once that downstream re-application lands.

---

## RESIDUAL (the unconverged frontier → next pass) — convergence ≈ 80%

The structure is fully hardened and every critique mustFix is folded; two empirical residuals were resolved cleanly this pass (the F0 DERIVED counts + AX=31; the ship-ordering no-deadlock sandbox-proof; the roster surface-closure landed in `proof-ba-gestalt.mjs`). **Four items remain build-owed-not-proven:**

1. **The live-paint born-RED defensibility (BG.W-PAINT-IS-THE-GATE · the critique's 40%).** NOTHING is on disk (decoder extension, DEFECT-LOCALIZATION-MAP.md, persisted PNGs) and the field-HUE born-RED was falsified (corners warm-OK, content-not-field, fallback-not-GL, fresh-serve INVALID/skip). The owed build: land the decoder + map + real-GPU (`--use-gl=angle`) field-ONLY-corner PNGs, ship the roster TOGETHER, run `proof:ba-gestalt` end-to-end and prove it born-REDs on 4.2.0 with the self-test bites flagging. The field defect is re-localized to the structural SOURCE arm + corner-variance π (D-field-aurora), and the top-bar (D5) + routing-survivor (D-routing) born-REDs are confirmed-real but un-committed.
2. **The real-Safari PAINT certification (BG.W-SAFARI-PARITY-GATE · the critique's 54%).** The var()-RESOLUTION answer is GREEN (engine read), but goo-merge / lens-degrade / glass-blur PAINT is UNVERIFIED on real Safari — `safaridriver` session-creation is precondition-blocked. The owed build: either prove one end-to-end `safaridriver` run after the documented close-machine enable, OR land the documented-manual real-Safari SCREENSHOT capture with the FOLD-LEDGER trigger; serve the actual demo against dist (not the synthetic probe); land `proof-safari-parity.mjs` + the version matrix.
3. **The ship forgery + capture-wiring (BG.W-SHIP-DISCIPLINE · the critique's 54%).** The capture is wired into the spine in-spec but not proven end-to-end (the prototype consumed an env-var digest); the forgery-resistance overclaim is deleted (DROP-WITH-TRIGGER) but the ordering gate-lock + first-match fix + test-short-circuit RED + the OIDC Phase-1-drop must be built + a real release.sh ship-block run end-to-end.
4. **The F0 gate not committed (BG.W-DEFERRED-LEDGER · the critique's 68%).** Counts derived + proven, but the gate (`proof-bg-deferred-ledger.mjs`), the DRY `fold-ledger-core.mjs` leaf, the no-orphan F0-namespace scoping, the canonical-marker grammar, the `file#KIND#slug` disambiguation, the disjoint-namespace assert, and a REAL adjudicated `FOLD-LEDGER.{json,md}` are all owed.

**Next-pass brief:** BUILD-AND-COMMIT the four residuals end-to-end on disk — (1) the decoder + DEFECT-LOCALIZATION-MAP + real-GPU field-corner/top-bar/routing PNGs + the roster, run `proof:ba-gestalt` born-RED; (2) one proven real-Safari capture (safaridriver-or-manual) + `proof-safari-parity.mjs` + demo-dist serve + version matrix; (3) the release.sh ship-block run end-to-end (capture-in-spine, ordering gate-locked, test-short-circuit RED'd); (4) `proof-bg-deferred-ledger.mjs` + `fold-ledger-core.mjs` committed + registered + a genuinely-adjudicated FOLD-LEDGER. Each closes its residual when the artifact is on committed disk and the gate runs green-on-fixed / red-on-broken from a reproduction the building agent did not author.

---

## OPEN RISKS (post-converge)

1. **The field corner-probe must read live GL, not the fallback ground.** A headless shoot reads the SwiftShader/CSS aurora ground (byte-identical re-capture proves it); the binding π must capture with `--use-gl=angle` so the surface under test is the user-visible live GL field — else scope the oracle's claim to the fallback ground.
2. **The routing survivor-strand is non-deterministic.** The stale survivor wins a hop only sometimes; the gate must run enough hops/repeats (≥6 cross-category, poll-to-stable) to surface it deterministically, and the deterministic born-RED is the `setContent` self-test bite, not the flaky live tree alone.
3. **safaridriver determinism.** Preconditions are a manual one-time enable; the in-ceremony arm may need the documented-manual capture fallback. **Falsifier:** run `safaridriver` end-to-end once after the enable.
4. **The §A.5″ sequencing on the close machine.** The ship-write→commit→re-validate ordering must not deadlock the porcelain check, AND the `/tmp` worktree tag must reconcile back to the canonical repo. **Falsifier:** run release.sh's ship-block end-to-end.
5. **The total-CSS-revoke breadth.** The shell floor revokes the whole CSS cascade (never-miss but coarse); decide explicitly accept-total-revoke vs per-surface CSS sub-closure (the leaf header states it).
6. **Sequencing (unchanged).** Band 1 before Band 2; BG.W-CUT last.
