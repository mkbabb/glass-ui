# BG-WS7 — Quality · Coverage · Close (SPEC pass 3 — BUILD-AND-COMMIT)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Pass 1 converged the structure (≈73%); pass 2 build-proved the empirical residuals and falsified three of its own headline claims (≈80%); **pass 3 is artifact delivery on committed disk + reproduction**. The spec is converged — the open work is: land the four residuals end-to-end on disk such that each gate runs **green-on-fixed / red-on-broken from a reproduction the building agent did NOT author**.

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0. **This spec INHERITS SPEC-pass2-converged.md whole** and advances ONLY the unconverged frontier: (1) the exact decoder/gate/roster artifacts + the routing-flake hardening + the field design-decoupling, (2) the real-Safari certification path (author-self-cert is rejected, not accepted), (3) the wired ship spine + the matchAll/ordering fix, (4) the committed F0 gate + the DRY leaf. Everything in pass-2 §0″–§I″ stands; this pass makes it BUILDABLE with verified anchors and resolves the seven open risks the research fleet surfaced.

---

## GESTALT GOAL

One sentence: **a version cannot be tagged unless a live in-ceremony render of the real demo, captured on a real GPU and judged by structural pixel predicates the building agent did not hand-author, paints correctly — and every deferred item across BF/AX/BE/BF/in-src is DECIDED in one mechanically-derived ledger before any of it runs.**

The disease (shipped 3×): source-green ≠ paint-truth. The cure is four interlocking machines, built **in this order** (each is a precondition of the next):

1. **F0 fold-ledger** (Band-0, FIRST) — no item silently drops a 4th time. The mechanical floor that the BD/BE/BF "plan-then-never-execute" disease (D11, 3 recurrences) cannot survive.
2. **Band-1 dead-mechanism cut** — DELETE the present-but-dead engines BEFORE the live oracle is re-pointed, so the oracle never certifies code about to be deleted.
3. **Band-2 live-paint oracle** — the decoder + roster + real-GPU PNGs that born-RED on 4.2.0 for the RIGHT (broken-pixel) reason, plus the routing/field/ship gates.
4. **The `--run ship` spine** — the live capture wired as a HARD precondition of `git tag`, the single load-bearing deliverable that closes the tag↔paint severance.

---

## §J — THE PASS-3 ADVANCEMENTS (the unconverged frontier, resolved)

Pass-2 left four residuals "build-owed-not-proven" and seven open risks. Pass-3 resolves each into a concrete buildable mechanism. The advancements over pass-2:

### §J.1 — COMMIT the dangling pass-2 scaffolding FIRST (the "committed disk" bar is unmet even for landed work)

Before any new build, the working tree's half-landed pass-2 work must be committed — leaving it untracked is precisely how the next pass "re-discovers it as absent":

| Path | git state | Action |
|---|---|---|
| `scripts/lib/surface-closure.mjs` | `??` untracked | COMMIT (the §A.6 self-ref leaf both ba-gestalt + ship-attestation import) |
| `scripts/proof-ba-gestalt.mjs` | ` M` modified (BC→BG re-point + surface-closure import) | COMMIT with the decoder-band extension (one diff) |
| `scripts/lib/critical-path-walk.mjs` | ` M` (EDGE_RE export + CSS `@import` arm — the DRY surface-closure consumes) | COMMIT |
| `scripts/proof-de-shadcn.mjs` | `??` untracked, **WS4-owned** (born-RED `.input-pill:disabled{opacity:0.5}` @ control-surfaces.css:153) | **NOT WS7's to home** — record its destination wave (WS4 / BG.W-DESHADCN-SWEEP) as a FOLD-LEDGER row; do NOT register it in WS7. If it is committed-untracked at the WS7 close, the F0 no-orphan must not RED on it (it is outside F0 namespaces). |

### §J.2 — The ROUTING gate hardened against flaky-green (risk #2, the chronic reincarnated)

Pass-2 made **survivor-IDENTITY** the sole born-RED. The risk scan proves this is **NON-DETERMINISTIC** — the stale `<article>` wins a hop only *sometimes* (Vue `whenTransitionEnds` `_endId` staleness orphans the leaving vnode timing-dependently). A gate whose only born-RED is non-deterministic can **flake-GREEN on the close run** = "flaky-green/visually-broken" ships = the exact 3× chronic.

**Advancement — band on the DETERMINISTIC root-cause signature as the PRIMARY born-RED, keep survivor-identity SECONDARY:**

- **PRIMARY (deterministic):** during the transition window (NOT only at settle), assert `max-coexistent <article> count == 1` AND the leaving heading unmounts within a small grace (no orphan past ~2× the transition duration). D-routing F1 proves this is *deterministic*: the `<article>` count goes 2→3 and two coexist the full ~1.2s window on EVERY default-mode hop — that is the AppShell.vue:404 `<Transition name="fade-slide">`-with-no-`mode="out-in"` race, reproducible 100% of the time. This is what born-REDs on 4.2.0.
- **SECONDARY (the user-visible symptom):** the settled `<article>` heading === destination heading over ≥6 hops, poll-to-stable, heading detector `h1, h2, .story-hero-title`.
- **ANTI-FLAKE acceptance:** run the gate **N=20×** on the live tree and prove pass-rate == 0% on broken HEAD (deterministic coexistence guarantees it) AND 100% on the fixed tree (out-in unmounts atomically). A `page.setContent` stranded-heading fixture is the deterministic self-test bite (MUST flag `oldGone:false` + a coexistence; a clean-detach fixture MUST pass).
- CI-headless DOM (no GPU) → `proof:route-navigates` is `["ci","release"]`-tagged and backs the release path even though the pixel gate is Mac-local. **Release-teeth BLOCKED-ON nothing** (routing is a pure DOM-structure proof; it does not need the served-demo provisioning — it runs against `npm run dev` :5199 or a `webServer` start).

### §J.3 — The FIELD gate de-coupled from the design choice (risk #6)

Pass-2's corner-field-variance π encodes "field = live-aurora variance-signature (stdev≈0.217)". But WS1's converged solution MAY ship a calm static warm CSS field on dense routes (the one-GL-per-route budget + the aurora "renders SLOW" defect may force it). If WS1 ships a non-aurora field as correct, an aurora-stdev born-RED **false-REDs forever** — WS7 would over-constrain WS1's solution space.

**Advancement — split the field gate into a binding SOURCE arm + a calibrated SECONDARY π:**

- **PRIMARY (the binding born-RED, device-free, CI-able):** `proof:field-aurora` SOURCE arm asserts **ONE field system reaches the painted root**. Born-RED on the 3-stack at HEAD: `AppShell.vue:360` mounts `<PaperBackdrop field>` UNCONDITIONALLY (z `-11`) + `StoryHero.vue:267-321` per-route bg (z `-10`/`-5`) + `DockStage.vue:60-93` aurora (z `-1`) + the `[data-paper-field]` opt-in gate is a PHANTOM (set NOWHERE — `paper.css:113`). The gate counts the competing field-painting layers reachable on a route and REDs when > 1. This is deterministic and does not pin a paint signature.
- **SECONDARY (local-GPU calibration, the *symptom* not the *cause*):** the corner-field-variance π runs `--run pi` on a real GPU and asserts the field corner stdev MATCHES **whatever WS1 ships** — the threshold is calibrated FROM WS1's committed field (a live aurora reads stdev≈0.217; a *correct* calm CSS wash reads its own lower-but-nonzero value; a *broken* 3-stack metallic cel-plane reads the metallic-weave signature). The π's RED threshold is set in `DEFECT-LOCALIZATION-MAP.md` against WS1's committed capture, NEVER hand-pinned to aurora-stdev. **Confirm the field=aurora-vs-calm-wash decision with WS1 before pinning the π threshold** (open coordination, §RISK).
- The `meanHue` band survives ONLY as a chroma-gated + region-agreed content guard (§J.4) — the field is hue-WARM, a hue band catches the designed hero gradient + every translucent glass plate and false-REDs.

### §J.4 — The DECODER extension (the exact in-place build, ONE decoder, no new color-math)

`reflect-capture-verify.mjs` already decodes RGBA once (`decodePngRgba`), exposes `oklabFromRgb` (returns `{L,a,b,chroma}` per-pixel — the `a,b` are CURRENTLY DISCARDED at L262/271 where only `sumChroma` accumulates), and `pngRegionStats` returns `{meanL,meanChroma,meanAlpha,samples}`. The extension is ~30 lines on the existing per-pixel loop + 3 region helpers reusing the decode — NO second decoder, NO new color source (the canvas-unify discipline; a forked decoder REDs `proof:ba-gestalt` G3's no-re-roll clause):

```js
// pngRegionStats — widen the accumulator + the return (the a,b are already computed
// by oklabFromRgb, just discarded). meanHue = atan2(meanB, meanA)·180/π normalized to
// [0,360); chromaMax = per-region MAX chroma (the saturation-CEILING, not the mean);
// lVar = spatial variance of L (the field-structure detector — a drifting aurora has
// high spatial L-variance; a flat raster does not).
//   sumA += ok.a; sumB += ok.b; sumL2 += ok.L*ok.L; if (ok.chroma > maxChroma) maxChroma = ok.chroma;
//   ... return {
//     meanL, meanChroma, meanAlpha, samples,
//     meanHue: ((Math.atan2(sumB/n, sumA/n) * 180/Math.PI) + 360) % 360,
//     chromaMax: maxChroma,
//     lVar: (sumL2/n) - (sumL/n)**2,   // E[L²] − E[L]²
//   };

// THREE spatial region helpers — each calls the EXISTING pngRegionStats / decodePngRgba,
// no new decode:
//   pngStripDelta(absPath)            → |row(y=1) − row(y≈6%h)| content-width L delta,
//                                        localized to a ≤3px hairline height (D5 top-bar).
//   pngEdgeCastFraction(absPath, box) → fraction of a ≤6px band OUTSIDE the plate bbox
//                                        matching R∈[25,90] ∧ g≤20 ∧ b≤25 ∧ R>2.5g ∧ R>2b
//                                        (DECIDED-phantom-with-trigger; bite stays armed).
//   pngFieldVariance(absPath, corners)→ mean lVar across ≥4 field-only corner probes
//                                        (the field structural detector; real GPU).
```

The gate side (`proof-ba-gestalt.mjs`): `parseExpect` (L216) already SYNTACTICALLY parses `(\w+)=lo..hi` / `(\w+)(>=|<=|>|<)v` — so `meanHue=lo..hi`, `chromaMax<=v`, `lVar>=v`, `topBarStrip>=v` parse for free. `evalBand` (L230) reads `stats[p.key]` → the new keys flow through once `pngRegionStats` returns them. The ONLY new gate logic is the **three guards** (a new eval path, NOT a new band syntax):

- **chroma-gate** — report `meanHue` ONLY where `meanChroma ≥ 0.025`; else `meanHue=undefined` and the band SKIPs (a 0.03-chroma warm plate with hue noise must NOT trip a hue band — pass-1's predicate would false-RED every translucent glass surface).
- **region-agreement** — `meanHue` reported ONLY where `|center − full| ≤ 15°` (a designed gradient / mixed content reads a region-DISAGREEMENT → INVALID/skip, not a cast).
- **measurement-validity bite** — a region decoding to `< N` samples, OR `meanAlpha ≈ 1` when translucency was expected, is INVALID (skip), not PASS.

Each predicate ships a born-RED self-test bite (synthetic-violator REDs + clean-control passes — the existing G5 grey-RED(L0.695)/warm-GREEN(L0.93,c0.04,α0.55) inverse-witness pattern at L617-631), PLUS the measurement-validity bite.

### §J.5 — The SUBSTRATE-BLINDNESS made explicit (risk #3 — the live-paint tag-block is Mac-only BY PHYSICS)

The field-variance π and every BB/BC binding-π REQUIRE a real GPU. CI (`release.yml`, ubuntu) runs SwiftShader → reads the CSS/SwiftShader FALLBACK ground (the §B.1″ proof: byte-identical re-capture proves the headless shoot never armed live GL). **Consequence, stated as a binding spec fact:** the live-paint tag-block lives ENTIRELY in `--run ship` on the close Mac. `release.yml` stays `--run full`-ONLY (no GPU, no `--run ship`). Therefore `--run ship` end-to-end is the **single load-bearing deliverable** — if it is not proven end-to-end with a REAL capture, the tag stays unguarded against pixel rot exactly as 3× before, and the C-PAINT fix is incomplete. The capture substrate is `PI_ANGLE=metal` (playwright.config.ts:33 defaults metal on darwin → `--use-gl=angle --use-angle=metal`); a `--use-angle=swiftshader` shoot certifies the WRONG ground and is forbidden in the ship arm.

### §J.6 — SAFARI: author-self-cert is REJECTED, not accepted (risk #5)

Pass-2 accepted a "documented-manual real-Safari SCREENSHOT" as the GREEN. The risk scan correctly flags this as **author-self-certification — the precise thing C-PAINT/C-SAFARI ban**. Advancement — the certification ladder, in preference order:

1. **PREFERRED — safaridriver end-to-end.** Run the one-time `sudo safaridriver --enable` + Safari Develop → "Allow Remote Automation" + XPC-authorize on the close machine (`defaults read com.apple.Safari AllowRemoteAutomation` is currently EMPTY → session creation WILL fail at HEAD until enabled). Then a re-runnable `safaridriver`-driven capture pixel-reads the goo merge (GooFilter regular `filter:url()` IS WebKit-supported) + the lens-degrades-to-blur. This is a real gate, reproducible from committed disk.
2. **IF blocked — DROP-WITH-TRIGGER, NOT a self-cert green.** If the enable cannot be proven this pass, the Safari PAINT verdict is recorded **DROP-WITH-TRIGGER** in the FOLD-LEDGER (re-enable when safaridriver-or-capture-signing lands) — and `webkit.glass`/`webkit.goo` ride the **SOURCE arm ONLY** (`proof-safari-parity.mjs`: goo via `filter:url()` not `backdrop-filter:url()`; every 0-alpha stop explicit `oklch(L C H / 0)`; engine-agnostic route transition not `startViewTransition`; squircle clip-path floor; `light-dark()` no inset-shadow fragment). A documented-manual screenshot is recorded as **evidence in the audit trail, NEVER as the gate's GREEN**.
3. The var()-RESOLUTION answer stays GREEN (engine read, version-26.4-scoped, ≤18 = WS3 literal-bake trigger in CONSTRAINTS.md) — the Playwright-webkit proxy is VALID for THIS computed-value question only. The "lens APPLIES"/"appears FIXED" claims stay QUARANTINED (CSS.supports ≠ rasterization; WebKit bug 245510 OPEN; lens degrades-gracefully).

`scripts/proof-safari-parity.mjs` RECONCILES with the existing `proof:safari-webgl` (gates.mjs:1827, owns the context-loss breaker S1-S6 + S5 `backdrop-filter:url()` @supports gate) — it adds the CSS-PAINT SOURCE arm ONLY, no second WebGL-degrade fork. `demo/vite.demo-dist.config.ts` (aliases `@mkbabb/glass-ui → dist` + the built `/styles`) serves the REAL demo over dist, not the synthetic 9-div probe.

### §J.7 — The CLOSE-BATTERY first-match bug + ordering, the EXACT fix (verified anchors)

`proof-close-battery-parity.mjs:73` reads `releaseSh.match(/scripts\/gates\.mjs\s+--run\s+\w+/)?.[0]` = the FIRST `--run X`. Once `--run ship` (step 3) precedes `--run full` (step 6), `narrowedBattery` (L35-41) sees `--run ship` → not full, not local/ci/release → returns "declares no `--run full` battery" → FALSE-RED. The fix is `matchAll` + validate the `--run full` invocation specifically:

```js
// Clause 2 (release.sh) — read ALL --run invocations; require BOTH --run ship AND --run full.
const shRuns = [...(releaseSh ?? "").matchAll(/scripts\/gates\.mjs\s+--run\s+(\w+)/g)].map(m => m[1]);
const hasFull = shRuns.includes("full");
const hasShip = shRuns.includes("ship");
if (!hasFull) violations.push("[clause 2] release.sh declares no `--run full` battery");
if (!hasShip) violations.push("[clause 2] release.sh declares no `--run ship` live-paint precondition");
// + ORDERING: the ship-block (--run ship + the SHIP-ATTESTATION git-add/commit) MUST appear
//   BEFORE the L60 porcelain check char-offset (a reorder REDs — string-presence is insufficient).
const shipIdx = releaseSh.search(/--run\s+ship/);
const porcelainIdx = releaseSh.search(/git status --porcelain/);
if (shipIdx < 0 || porcelainIdx < 0 || shipIdx > porcelainIdx)
    violations.push("[clause 2b] the `--run ship` block must run BEFORE the porcelain check (else the attestation write dirties the tree)");
// Clause 3 (release.yml) — release.yml stays --run-full-ONLY (no GPU/Safari); read the FULL
//   invocation specifically (the inconsistent `gates\.mjs` prefix at L79 is unified to `scripts/gates\.mjs`).
const ymlRuns = [...(releaseYml ?? "").matchAll(/scripts\/gates\.mjs\s+--run\s+(\w+)/g)].map(m => m[1]);
if (!ymlRuns.includes("full")) violations.push("[clause 3] release.yml declares no `--run full` battery");
// release.yml MUST NOT carry --run ship (it has no GPU) — a yml --run ship REDs.
if (ymlRuns.includes("ship")) violations.push("[clause 3b] release.yml must not run `--run ship` (CI has no GPU/Safari)");
```

PLUS §A.5.4″ — the test-short-circuit RED: replace the contrived `testSwallow` regex (over a `release.sh` that never runs vitest) with a **structural self-test** that synthesizes a close-path short-circuiting at `test` (a `gatesFor("full")` whose `test` gate exits non-zero but the runner swallows it) and asserts the battery REDs. `test` is already `["local","ci","release"]` → the fix is fail-CLOSED enforcement in `runMode`, not adding the gate.

### §J.8 — The `--run ship` runner mode + the release.sh reorder (the spine, concrete)

`gates.mjs:2471` dispatches `if (arg==="--run" && argv[3]==="pi") runPi(); else if (arg==="--run") runMode(argv[3])`. A `--run ship` falls to `runMode("ship")` → `gatesFor("ship")` = empty → exit(2). Add a `runShip()` runner-mode (modeled on `runPi` L2286, NOT a `gatesFor` aggregate), dispatched BEFORE the `runMode` branch, **Mac-only**:

```js
// gates.mjs dispatch (insert before the runMode branch at L2472):
if (arg === "--run" && argv[3] === "pi") runPi();
else if (arg === "--run" && argv[3] === "ship") runShip();   // NEW — serves+captures+writes attestation
else if (arg === "--run") runMode(argv[3]);
```

`runShip()` (Mac-only; REDs on non-darwin with the platform hint): (1) start the demo dev server (:5199) + the demo-dist server (Safari); (2) invoke the BG.W-PAINT capture pipeline (the same `--run pi` Playwright instrument on `PI_ANGLE=metal`) to shoot the BG roster surfaces fresh, in-ceremony; (3) run `proof:ba-gestalt` / `proof:field-aurora` / `proof:route-navigates` over the FRESH captures; (4) emit the per-region pixel DIGEST + the `webkit.{glass,goo,lens}` verdict into `docs/tranches/BG/SHIP-ATTESTATION.json` (the canonical `ATTESTATION_REL` already wired into `proof-ba-gestalt.mjs:84`, OUTSIDE every surface-path closure per the §A.6 self-ref guard). NEVER consumes a `GLASS_UI_SHIP_DIGEST_SOURCE` env (capture-in-spine).

`release.sh` reorder — insert the ship-block BEFORE the L60 porcelain check:

```
release.sh (Mac, after the version check at L57, BEFORE the L60 porcelain check):
  [NEW] echo "[release] building demo-dist + running the live-paint ship gate..."
  [NEW] npm run demo:dist:build
  [NEW] node scripts/gates.mjs --run ship          # serves SRC demo + demo-dist; captures on Metal;
                                                    # writes docs/tranches/BG/SHIP-ATTESTATION.json
  [NEW] git add docs/tranches/BG/SHIP-ATTESTATION.json && git commit -m "ship: BG paint attestation $VERSION"
  [L60 existing] git status --porcelain clean check   # now passes (attestation committed)
  [L84 existing] node scripts/gates.mjs --run full    # fail-CLOSED on `test` (§J.7)
  [L93 existing] git tag …
```

The no-deadlock proof (§A.5″, sandbox-proven): the build emits gitignored `dist/`; the only tree change is the committed `SHIP-ATTESTATION.json` under `docs/` → after the `git add`+commit the porcelain is EMPTY → L60 passes. Run it end-to-end in a `/tmp` worktree (siblings + precepts-submodule absent) with porcelain clean after to prove no deadlock + the `/tmp`-tag reconciles to the canonical repo.

### §J.9 — The F0 fold-ledger-core extraction (DRY, no BC clone, the DERIVED invariant)

Extract `scripts/lib/fold-ledger-core.mjs` from `proof-bc-fold-ledger.mjs` (448L). The shared MECHANISM to lift (parameterized by tranche root/paths/wave-regex): `extractDocIds` (L77-88), `deriveBand` (L96-107), `waveSpecExists` (L109-115) — **parameterized with a `WAVE_RE`** (the BC clone hardcodes `BC_WAVE_RE` L61), the disposition-validity (L186-196), the destination-or-rationale soundness (L199-219), the run-as-main guard (the BC clone LACKS it — runs on import; ADD `import.meta.url === pathToFileURL(process.argv[1]).href`), the `DISPOSITIONS` set (L52), and the self-test bite harness. **The hard `EXPECTED_COUNT = 213` (L51) is the EXACT anti-pattern the DERIVED invariant replaces** — the core takes a `deriveCorpus()` callback; each caller supplies its own.

`scripts/proof-bg-deferred-ledger.mjs` (registered in `gates.mjs` Band-0, `["local","ci","release"]`) supplies the DERIVED corpus:

| Namespace | Accessor (DERIVED, never transcribed) | Count @ HEAD |
|---|---|---|
| AX register | `JSON.parse(REGISTER).items.map(i=>i.id)` — **EXCLUDE the `selfTest` fixture** | **31** (`items.length===31`; `grep '"id"'===32` because `j.selfTest` carries its own id — **the brief's "AX=32" IS the drift, shipped as F0's FIRST self-test bite**, never silently corrected to 31 in prose) |
| BF DEFERRED-CENSUS | `D[0-9]+` unique over `BF/audit/DEFERRED-CENSUS.md` | **32** (D1–D32) |
| BE+BF wave-ids | `readdir(BE/waves)+readdir(BF/waves)` `^B[EF]\.W-` | **70** (39+31; prose's "69" stale) |
| in-src books | strict canonical `CONSUME(…)` + `BOOKED:` markers, EXCLUDE `.md` + bare `successor` prose | **3** (`useDragMorph.ts:281#CONSUME(kf snap)`, `useLayerTransition.ts:37#BOOKED:AY.W-GOD1`, `DockLayerGroup.vue:334#BOOKED:AY.W-GOD1` — the two AY.W-GOD1 bookings key by `file#KIND#slug`, NOT destination, else they collide) |

- `expectedCount = |bfCensus ∪ axRegister ∪ waveIds ∪ inSrcMarkers| = 136`, a DERIVED invariant; the four namespaces are asserted **DISJOINT** (`expectedCount === Σ counts`, a 1-line bite — by-construction-safe today but a future accessor collision that silently shrinks the union REDs).
- **F1.b no-orphan scoped to F0 NAMESPACES ONLY** — an orphan is a ledger row whose id CLAIMS an F0 namespace (`D#` / `AX-slug` / `BE|BF.W-` / `file#KIND#slug`) but is not produced by that accessor. The census rows (DATE-CALENDAR/CHART-FAMILY/DS-COMPLETE), dead-mech rows (silhouette DELETE, useHaptic RETIRE), the FLIP-ONE row, the Safari-WS3-bake row, and the proof-de-shadcn destination row MUST coexist without RED. Self-tests: a legit non-F0 census row does NOT trip no-orphan; a phantom `D99`/`AX-slug` row DOES.
- **AX data fixes the restamp must catch (F2 phantom-dest):** `css-relative-color.resolvedBy=undefined, pendingResolvedBy="BB.W-DARK-INK-WARM"` (needs flip); `styles-critical-split.resolvedBy="BC.W-CSS-CRITICAL"` is likely a PHANTOM (the real wave is **BB**.W-CSS-CRITICAL per CLAUDE.md — the F2 clause must RED if the BC spec is absent on disk).
- **DRY proof:** refactor `proof-bc-fold-ledger.mjs` to consume the extracted core in the SAME diff (no copy-paste clone survives) and re-run it green at 213 (the extraction must NOT regress the frozen BC ledger). Demote `proof:bc-fold-ledger` release→ci-tracker (mirrors `:ay/:az/:ba` closed-tranche arms) so only ONE fold-ledger mechanism is release-locked forward.
- **Every non-wave row GENUINELY adjudicated** — BUILD-against-a-real-`BG.W-*`-spec / RETIRE / MET — never blanket-DEFER-with-boilerplate (the BB.W-NDA-DECIDE chronic the F0 must not legitimize).

### §J.10 — The feasibility unblock (the instrument every live-paint deliverable depends on)

`tests-visual/` has NO local `node_modules` + `pngjs ^7` unresolved → even LOCAL `--run pi` errors (the `runPi` device-absence path). **Before any live-paint deliverable: `npm i` in `tests-visual` + `npx playwright install chromium` + a served :5199, and prove ONE `--run pi` GREEN on Metal.** Without a working `--run pi`, none of PAINT/SHIP can close. This is the first prototype.

---

## MECHANISM (the idiomatic approach, concrete — the build order)

The four machines, built in dependency order with the §J anchors:

**Band 0 (no-silent-drop, FIRST — D11's 3rd-recurrence cure):**
- Extract `fold-ledger-core.mjs` (§J.9), refactor BC onto it (DRY proof, stays green @ 213), build `proof-bg-deferred-ledger.mjs` with the DERIVED corpus + disjoint-namespace + F0-scoped no-orphan + the AX 31-vs-32 first-bite, register Band-0, emit the genuinely-adjudicated `FOLD-LEDGER.{json,md}`.
- Commit the dangling pass-2 scaffolding (§J.1).

**Band 1 (dead-mechanism cut, BEFORE Band 2 — §0″/§E″):**
- F6 gate→symbol map by IMPORTING `gates.mjs` (the `GATES` export behind the `isMain` guard; a hand-grep returns 0 — multi-line registrations). DELETE `useDockContextSilhouette.ts` (551L, 0 call-sites) + `proof:dock-context` + its ratchet row in ONE atomic diff; `useLiquidMorph.ts` (462L) + rehome `liquid-morph.css` (850L) to `demo/stories/dock/`; the two dead CSS + their @imports; gut `useMorphField()` while re-homing the LIVE `MORPH_SIGNATURES` table to `morphSignatures.ts`; dead tokens + pin-clauses; the `selectableChipVariants.ts` alias. RETIRE `useHaptic` + drop the `src/index.ts:285` + `api/index.ts` exports. KEEP `useDockFission`/`useBloomUp`/`metaball-bridge2` (LIVE). Record FLIP-ONE as a DECIDED coordinated-wave FOLD-LEDGER row (do NOT unilaterally rewrite WS2/WS6 engines).

**Band 2 (live-paint oracle, born-RED on what REPRODUCES under a defensible probe):**
- The decoder extension (§J.4) + `bg-gestalt-roster.md` + `DEFECT-LOCALIZATION-MAP.md` + the real-GPU PNGs, ONE atomic deliverable → `proof:ba-gestalt` born-REDs on a 4.2.0 reproduction the building agent did NOT author (top-bar D5 `topDelta≥0.10`; field SOURCE-arm 3-stack; field corner-variance on Metal). The regression bite: an all-PASS roster of re-shot captures of the broken 4.2.0 UX must STILL RED.
- `proof:field-aurora` (§J.3 SOURCE arm + calibrated SECONDARY π), `proof:route-navigates` (§J.2 deterministic-coexistence PRIMARY + survivor-identity SECONDARY + N=20 anti-flake).
- The §J.7/§J.8 ship spine: the matchAll/ordering fix, the `runShip()` mode, the release.sh reorder, `proof-ship-attestation.mjs` (absent→FAIL, re-applies the BG bands to the embedded digest, `webkit.glass==pass AND webkit.goo==pass`, composes the shared `isPaintSource` guard), the forgery-overclaim DELETED (DROP-WITH-TRIGGER).

**Band 3 (floors):**
- `proof-safari-parity.mjs` (§J.6 SOURCE arm, reconciled with `proof:safari-webgl`) + `demo/vite.demo-dist.config.ts` + `demo:dist:build/serve` scripts + CONSTRAINTS.md (Safari version matrix, ≤18 trigger, one-GL↔flash coupling) + `proof:constraint-manifest`. The safaridriver-or-DROP certification ladder. Promote `proof:lighthouse` + `proof:no-layout-animation` release-eligible; re-pin `floor.baseline.json` at the BG-achieved number (median-of-3/optimistic) ONLY after WS1-WS6 land.

**Band 4 (census):** DATE-CALENDAR / CHART-FAMILY / DS-COMPLETE — each a genuinely-adjudicated FOLD-LEDGER row (build-or-defer verdict against the ≥2-consumer bar).

**Band 5 (honest re-cut, LAST):** BG.W-CUT — the tag fires only after `--run ship` passes against the served demos over the BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` (safaridriver-or-DROP) + the user gate. Closes the BD P10a tail (17 failing unit tests + the short-circuit-at-`test`).

---

## FILES TOUCHED (delta over pass-2 §FILES)

**Commit-first (dangling pass-2):** `scripts/lib/surface-closure.mjs` (??→tracked); `scripts/lib/critical-path-walk.mjs` (M); `scripts/proof-ba-gestalt.mjs` (M + decoder bands).

**New:** `scripts/lib/fold-ledger-core.mjs` · `scripts/proof-bg-deferred-ledger.mjs` · `docs/tranches/BG/FOLD-LEDGER.{json,md}` · `scripts/proof-ship-attestation.mjs` · `scripts/proof-route-navigates.mjs` (+ spec) · `scripts/proof-field-aurora.mjs` · `scripts/proof-safari-parity.mjs` · `demo/vite.demo-dist.config.ts` · `docs/tranches/BG/CONSTRAINTS.md` (+ `scripts/proof-constraint-manifest.mjs`) · `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + per-surface `<surface>.md` (surface-hash header) + `DEFECT-LOCALIZATION-MAP.md` + the persisted Metal-GPU PNGs · `docs/tranches/BG/waves/BG.W-*.md` · `docs/tranches/BG/audit/DS-COMPLETENESS-census.md`.

**Modified:** `scripts/reflect-capture-verify.mjs` (meanHue/chromaMax/lVar + the 3 region helpers, ONE decoder) · `scripts/release.sh` (the §J.8 ship-block before porcelain) · `.github/workflows/release.yml` (proof:ship-attestation before publish; OIDC runnerIdentity Phase-2-only) · `scripts/gates.mjs` (register the new gates; `runShip()` dispatch Mac-only; the F6 dead-gate diff) · `scripts/proof-close-battery-parity.mjs` (matchAll + ordering + ship-beside-full + test-short-circuit RED) · `scripts/proof-bc-fold-ledger.mjs` (consume the extracted core; demote release→ci) · `package.json` (`demo:dist:build/serve`, new proof keys) · `scripts/lighthouse/floor.baseline.json` (+ tag promotion) · `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (re-stamp 31 rows BC→BG in place + the 2 pending flips) · `tests-visual/playwright.config.ts` (webkit SCOPED to var()-resolution proxy).

**Deleted (clean break):** `useDockContextSilhouette.ts` + `proof:dock-context` + ratchet row (atomic) · `useLiquidMorph.ts` · `liquid-enter.css` + `morph-field.css` + @imports · the dead `useMorphField()` body · `selectableChipVariants.ts` · dead tokens + pin-clauses · `useHaptic` exports. **Rehomed:** `liquid-morph.css` → `demo/stories/dock/`.

---

## THE BG.W-* WAVE BREAKDOWN (unchanged from pass-2 §WAVE BREAKDOWN, advanced where §J resolves)

**Band 0:** BG.W-DEFERRED-LEDGER (§J.9 — DRY core, DERIVED corpus, AX 31-vs-32 first-bite) · BG.W-BE-BF-LEDGER (70-wave parity) · BG.W-DISPOSITION-RESTAMP (31 BC→BG in place, 2 flips).
**Band 1:** BG.W-SPIKE-DELETE · BG.W-JUBILANCE-DECIDE (useHaptic RETIRE, FLIP-ONE record) · BG.W-DEAD-GATE-SWEEP (F6-by-import; de-shadcn destination recorded, NOT homed in WS7).
**Band 2:** BG.W-PAINT-IS-THE-GATE (§J.4 decoder + map + Metal PNGs) · BG.W-GESTALT-ROSTER-RE-POINT (routeSeeds HARD-RED, over-revoke disclosure) · BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION (§J.7/§J.8 wired spine) · BG.W-GATE-ROUTING-LIVE (§J.2 deterministic-coexistence + N=20) · BG.W-GATE-FIELD-AURORA (§J.3 SOURCE arm + calibrated π) · BG.W-GATE-PREVIEWS-RENDER · BG.W-GATE-UNIFORM-BLUR.
**Band 3:** BG.W-SAFARI-PARITY-GATE (§J.6 safaridriver-or-DROP ladder) · BG.W-CONSTRAINT-MANIFEST.
**Band 4:** BG.W-DATE-CALENDAR · BG.W-CHART-FAMILY · BG.W-DS-COMPLETE.
**Band 5:** BG.W-CUT.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Each residual closes ONLY when the artifact is on COMMITTED disk AND the gate runs green-on-fixed / red-on-broken from a reproduction the building agent did NOT author.**

**Born-RED on the shipped 4.2.0 tree:**
- `proof:ba-gestalt` / `proof:field-aurora` FAIL via the field SOURCE arm (3-stack > 1 field system) + the top-bar hairline (`topDelta 0.16–0.20`, D5) + the corner-field-variance π on Metal — NOT a `meanHue` band (the field is hue-warm; the hue band is a chroma-gated content guard with the measurement-validity bite).
- `proof:route-navigates` FAILS via the DETERMINISTIC coexistence signal (`max-coexistent <article> > 1` during the window — 100% reproducible on broken HEAD, proven by N=20 pass-rate==0%) + the secondary survivor-identity. The deterministic self-test bite is a `setContent` stranded-heading fixture.
- `proof:bg-deferred-ledger` FAILS (DERIVED corpus UN-DECIDED; the AX-`32`-literal, the non-canonical-book, the `selfTest`-fixture, the phantom-`D99` self-tests RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / `webkit` verdict absent).
- `proof:close-battery-parity` FAILS first-match-bug-fixed-but-ship-absent (release.sh has no `--run ship`).
- edge-cast / metallic-chroma-mean / field-HUE-as-cast are DECIDED-phantom-with-trigger (bites stay armed, NOT in the live bar).

**GREEN only when** the field paints ONE field system (SOURCE arm) + the corner-variance matches WS1's committed field on Metal · the top-bar hairline is gone · routing keeps single-`<article>` coexistence + the destination-heading survivor over ≥6 hops (N=20 pass-rate 100%) · every DERIVED deferred item is genuinely DECIDED · every `release` gate (DERIVED from the import-parse) locks a ≥2-consumer mechanism · real Safari resolves var() to literal blur (version recorded) + safaridriver-OR-DROP certifies glass+goo paint (lens degrades-gracefully) · `--run ship` runs end-to-end in `/tmp` with porcelain clean after · constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD on Metal** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar (the bounded trust: re-stamp/frozen/skip REDs; malicious hand-forge is out of the Phase-1 threat model, DROP-WITH-TRIGGER).

---

## FOLDED DEFERRED ITEMS (the DROP-WITH-TRIGGER + DECIDED-phantom register, into the F0 ledger)

- **C-PAINT forgery-beyond-re-stamp** → DROP-WITH-TRIGGER (surfaceHash over SOURCE bytes catches re-stamp/frozen/skip — the 3× chronic — but not a malicious hand-forge; re-enable at capture-signing/OIDC-capture-identity).
- **Phase-1 `authoredBy≠runnerIdentity`** → DROP-WITH-TRIGGER (no orchestrator write-fenced token on the Mac close; re-enable Phase-2 with OIDC).
- **Safari PAINT certification** → safaridriver-end-to-end IF the close-machine enable is proven this pass, ELSE DROP-WITH-TRIGGER (webkit.glass/goo ride the SOURCE arm only; a documented-manual screenshot is audit evidence, never the gate GREEN).
- **edge-cast `rgb(49,0,0)` / metallic-chroma-mean / field-HUE-as-cast** → DECIDED-phantom-with-trigger (the source-read over-claims; bites stay armed for a regression).
- **FLIP-ONE** (useBloomUp/useLiquidReveal/useDockCtaReceive/useCelebrationBurst re-fork ElementMorph+springTimingFunction while kf `flipShared` is imported-and-ignored) → DECIDED coordinated-wave (named, not unilaterally rewritten — WS2/WS6 build on these engines).
- **proof-de-shadcn destination** → WS4 / BG.W-DESHADCN-SWEEP (recorded, NOT homed in WS7).
- **Safari ≤18 var()-bake** → WS3 literal-bake trigger.

---

## OPEN RISKS (post-pass-3)

1. **`--run ship` end-to-end is the single load-bearing deliverable + is unproven.** The live-paint tag-block lives entirely here by physics (CI=SwiftShader can't read live GL). If it is not proven end-to-end in `/tmp` with porcelain clean + the `/tmp`-tag reconciling to the canonical repo, the C-PAINT fix is incomplete. **Falsifier:** run release.sh's ship-block end-to-end.
2. **The routing predicate must be NON-flaky.** Survivor-identity alone is non-deterministic → the PRIMARY born-RED is the deterministic coexistence signal; prove pass-rate==0% over N=20 on broken HEAD AND 100% on fixed before trusting it. **Falsifier:** N=20 with any pass on broken HEAD.
3. **The field π threshold is design-coupled to WS1.** Pin it to WS1's COMMITTED field capture (aurora OR calm wash), never hand-pinned aurora-stdev. **Falsifier:** if WS1 ships a correct non-aurora field and the π false-REDs. **Coordinate the field=aurora-vs-wash decision with WS1.**
4. **Safari real-paint may stay DROP-WITH-TRIGGER.** AllowRemoteAutomation is currently UNSET → safaridriver session creation fails at HEAD. If the enable is not proven, the Safari PAINT GREEN is DROP-WITH-TRIGGER + SOURCE-arm-only, NOT a self-cert screenshot. **Falsifier:** a safaridriver session creates end-to-end after the documented enable.
5. **The field corner-probe must read live GL (`PI_ANGLE=metal`), not the SwiftShader fallback** — a headless shoot certifies the WRONG ground (byte-identical re-capture proves it). **Falsifier:** byte-identical re-capture across two shoots.
6. **F0 adjudication-vs-restamp.** The ~136 rows each need REAL evidence (a `(`-call-site grep + a destination-sound wave-spec), not hand-stamps; a rushed pass reproduces the BB.W-NDA-DECIDE chronic it exists to kill.
7. **Band 1 before Band 2; BG.W-CUT last** (sequencing, unchanged).
