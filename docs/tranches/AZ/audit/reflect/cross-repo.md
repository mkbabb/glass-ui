# AZ REFLECTION — cross-repo

**Lane:** cross-repo · **Auditor:** reflection (read-only; no source/demo/script/git edits) · **Date:** 2026-06-11
**Surface:** the consumer/release coupling — keyframes.js, fourier-analysis, bbnf-lang, slides, speedtest, words — against glass-ui at branch `tranche/AY` HEAD (`58c4265a`, the AZ Batch 5 close). The library version at HEAD is `3.10.1`; the cut is staged at **3.13.0**.

## VERDICT: **PASS** (with one S2 miss routed to the triumvirate — pre-existing, CI-green, un-ledgered speedtest staleness)

The cross-repo coupling is sound and READY for the W-ADOPT/W-DEPLOY hinge. The header-ribbon/glass-panel RESTORE is faithful (the local build serves exactly what keyframes imports — verified at the artefact level AND the live demo render). The fourier 8-class re-points landed, the bbnf hard alias is gone, the protected slides contracts (status-dot, the constellation protected quintet) are byte-intact, and the lineage map is accurate. `proof:resolution`, `proof:no-retired-survivor`, `proof:glass-panel-tiers`, `proof:constellation-gen`, `proof:constellation-substrate-single`, and `verify-export-types` all GREEN. The single open item is a PRE-EXISTING speedtest mis-import (`useRouteTransition` from `/motion-core`, a symbol that has never existed on the glass-ui surface) — un-ledgered, surfaced by `proof:consumer-staleness`'s full d.ts bite; CI-green (siblings absent → skip), local-red. It does not block the gated publish, but it is a genuine consumer-readiness gap → S2 to the triumvirate.

---

## 1 — RECAPITULATION (every cross-repo item × discharging evidence)

| id | item | discharging wave | evidence at HEAD | state |
|---|---|---|---|---|
| KF-A | keyframes' two phantom-SUBPATH imports (`/header-ribbon` + `/glass-panel`) | **W-KF-CONSUMER Arm A DROPPED → W-PRUNE2 RESTORE** | keyframes still imports both (`EasingCurveCanvas.vue:107`, `EditorShell.vue:101`); glass-ui RE-ADDED the subpaths instead of migrating keyframes. The restore is the elegant fix — consumer-truth wins. | ✓ RESTORED |
| KF-B | fourier 8 `.glass-{subtle,medium}` re-points | W-KF-CONSUMER Arm B | grep → 0 remaining; the live ladder classes (`glass-resting`/`glass-quiet`/`glass-floating`) present at the 6 named files/8 sites | ✓ LANDED |
| KF-C | bbnf hard `dist/keyframes.js` alias | W-KF-CONSUMER Arm C | `grep dist/keyframes.js bbnf .../vite.config.ts` → 0; `proof:resolution` exit 0 | ✓ REMOVED |
| RESTORE | header-ribbon/glass-panel un-prune (census missed the live keyframes consumer) | W-PRUNE2 (THE RESTORE) | src dirs + subpath barrels + exports map + demo stories all restored & committed at `58c4265a`; `GlassPanel` exposes `variant="wash"`, `HeaderRibbon` exposes `position="right"` — the exact keyframes contract; `proof:glass-panel-tiers` GREEN (5/5 distinct rungs); MIGRATION claim NARROWED; `proof:no-retired-survivor` re-anchored (RETIRED_CLAIMS = deck-progress/instrument-rail only) | ✓ |
| LINEAGE | the registry stale-lineage divergence | W-CLOSE §X.2 | `3.10.1` (true AY close) → `3.11.0/.1/.2`+`3.12.0` (stale-lineage, registry `latest`=3.12.0; pre-prune, carry all four subpaths, LACK `/underline`, not master) → **`3.13.0`** (true AZ close). Map documented; deprecate-or-supersede is the user's call at the cut. | ✓ ACCURATE |
| ADOPT | slides constellation re-architecture (kill the 547→631-line bespoke engine) | W-ADOPT (STATUS: SPEC) | NOT run — slides still carries `constellation.ts` (631 lines), pinned `^3.9.0`, on `main`. The deck is LIVE today on the bespoke engine + the lib's delegated NEUTRAL substrate (the slides-M interim arm). W-ADOPT is the next-tranche hinge. | ⧗ PENDING (by design) |
| DEPLOY | slides.friday.institute LIVE proof | W-DEPLOY (STATUS: SPEC) | The CURRENT deck is LIVE (HTTP 200, 8 slides, the new "Finding Errors, Waste, and Abuse" deck); the two PPTX artefacts resolve (200, ~7.3MB light + dark). W-DEPLOY is the post-3.13.0 / post-ADOPT capture. | ⧗ PENDING (by design) |
| R5-arms | slides interim arms (R5-1..R5-4) annotated to retire on the bump | the R5 root fixes landed in glass-ui | R5-1/2 (`--dock-mobile-scale` re-declare + `--dock-coarse-scale` 0.78 in `overflow.css`), R5-3 (`useDockClickIntegrity.ts` + the deck-side `DeckView.vue` ~320ms capture-phase guard), R5-7 (the `veil` Card surface). The slides arms WILL retire on the 3.13.0 bump. | ✓ ROOT-FIXED, arms armed |
| PROTECT | the protected slides consumer contracts | held through every redress | `SlideXray.vue` consumes `StatusDot` from `/status-dot`; `constellation.ts` imports the byte-intact protected quintet `{BASE_WIDTH, warpStep, warpTo, …}` — glass-ui `/constellation` exports all of them; `proof:constellation-gen` GREEN (all 6 R5-6 gen items + the quintet byte-compat) | ✓ INTACT |
| CON-GEN | the W-CON-GEN R5-6 generalization verdicts | W-CON-GEN | `proof:constellation-gen` PASS: G1 pinned-node, G2 accent-edge, G3 palette-extend, G4 zero-deck-domain (label stays drawOverlay — the honest book), G5 pinned-drift, G6 warp-release + unit runtime-truth | ✓ |
| STALE | the reverse cross-repo staleness gate | `proof:consumer-staleness` | 7 consumers scanned, 241 files; 5 ALLOWED-WITH-TERMINAL (fourier `UnderlineTabs` ×3, words `BouncyToggle` ×2 — ledgered DEFERRED); **1 UN-LEDGERED VIOLATION** (speedtest `useRouteTransition`) | ⚠ 1 MISS → S2 |

---

## 2 — RE-VERIFY LIVE (fresh captures + π readbacks + gate runs)

### The keyframes-restore resolution chain (the load-bearing cross-repo proof)

Ran a full `npm run build` (vite arm + the `emit-types` vue-tsc arm). Verified, on artefacts:

- `dist/header-ribbon.js` + `dist/header-ribbon.d.ts` + `dist/glass-panel.js` + `dist/glass-panel.d.ts` all emit; the `.d.ts` are thin `export * from "./components/custom/{header-ribbon,glass-panel}"` barrels.
- `node import('./dist/glass-panel.js')` → `['GlassPanel']`; `import('./dist/header-ribbon.js')` → `['HeaderRibbon']` — the exact symbols keyframes imports.
- `GlassPanel` exposes the `variant` union incl. `"wash"` (keyframes' EasingCurveCanvas case); `HeaderRibbon` exposes `position: "left" | "right"` (keyframes' EditorShell `position="right"` case).
- **keyframes' installed glass-ui is `3.11.2`** (a registry tarball, NOT a file: symlink). 3.11.2 is stale-lineage but PRE-prune, so it carries the subpaths — keyframes builds GREEN today. The RESTORE guarantees forward-continuity: a `~3.11.2` consumer bumping to `3.13.0` keeps the imports working.
- **LIVE demo render (π):** `/substrates/glass-panel` on :5199 mounts **5 GlassPanels**, each at a distinct rung — `data-variant=wash bg α 0.38` → `quiet 0.58` → `resting 0.72` → `floating 0.88` → `overlay 0.96`, all with `backdrop-filter` active. The restored surface PAINTS, not a resolving-but-blank import. (`crossrepo-glass-panel-restored-desktop.png`.) The `/navigation/header-ribbon` story mounts (the hover-tracking ribbon's chrome surfaces on interaction — expected; `crossrepo-header-ribbon-restored-desktop.png`.)

### The live slides production deck (the deployed cross-repo consumer)

- `curl https://slides.friday.institute/til-briefing` → **HTTP 200**; π readback: title "Finding Errors, Waste, and Abuse — slides", **8 slides** (matches W-DEPLOY §0 expected count), no blocking gate.
- The two deploy artefacts resolve: `/exports/til-briefing.pptx` → 200 (7,328,539 b), `/exports/til-briefing-dark.pptx` → 200 (7,339,114 b).
- Desktop 1280×720 (`crossrepo-slides-live-desktop-1280.png`): the cover renders the constellation field (anomaly red pulse-ring + "ANOMALY" callout + wandering node network), the hand-drawn red underline on "errors", the borderless veil-plate "PRESENTED BY" panel (the R5-7 register), the bottom dock pager (home / 1 of 8 / gear).
- Mobile 390×844 (`crossrepo-slides-live-mobile-390.png`): clean responsive reflow, the veil panel + constellation + compact pager intact.
- NOTE: the deck is LIVE on slides' `^3.9.0` (the bespoke constellation engine still in place — W-ADOPT not yet run); the deck is fully functional. The bump to 3.13.0 + the W-ADOPT re-architecture is the NEXT-tranche hinge, not an AZ deliverable.

### The gate roster (run at HEAD, siblings present, full d.ts dist)

| gate | result |
|---|---|
| `proof:resolution` | **PASS** (exit 0) — contract-v2 dev-resolution satisfied across the constellation (the bbnf hard-alias closure) |
| `verify-export-types` | **PASS** — all 71 dist d.ts + every export target valid |
| `proof:no-retired-survivor` | **PASS** — 5 RETIRED claims (narrowed to deck-progress/instrument-rail), 0 violations, self-test bite OK |
| `proof:glass-panel-tiers` | **PASS** — 5/5 svg-filter + 5/5 fallback distinct rungs; glass-panel + card backdrops shipped |
| `proof:constellation-gen` | **PASS** — all 6 R5-6 gen items + protected-quintet byte-compat + unit runtime-truth |
| `proof:constellation-substrate-single` | **PASS** — substrate-exists, prng-single-source, anomaly-is-skin |
| `proof:consumer-staleness` | **1 VIOLATION** (the S2 miss below) — 5 ALLOWED-WITH-TERMINAL + 1 un-ledgered speedtest staleness |
| `proof:phantom-classes` | RED on the documented-pending fourier `cartoon-card`/`glass-elevated` fleet (21 sites) — **NOT this tranche's scope** (the W-KF-CONSUMER 8-class arm landed; the cartoon-card fleet is the named successor, the un-applied Q.W4 Lane-F patch the fourier team owns) |

---

## 3 — THE PERFECTION QUESTION (first-time-auditor "wtf" scan)

Walking the cross-repo surface fresh:

- **The RESTORE reads as deliberate, not a patch.** A first-time auditor sees header-ribbon/glass-panel back as published surfaces WITH consumer-evidence docs naming the keyframes binary consumer, the MIGRATION claim narrowed (not contradicted), and `proof:no-retired-survivor` re-anchored. No "wtf — why is a retired thing back?" — the doc trail is complete and the demo stories restored. PASS.
- **The lineage map is honest.** The registry `latest` is a STALE 3.12.0, and a naive auditor could be confused that local HEAD (3.10.1) is "behind" the registry. But W-CLOSE §X.2 + the MIGRATION narrowing document the divergence precisely (the stale-lineage tarballs are pre-prune publishes off a non-master branch). The "moves to 3.13.0" decision is sound. No "wtf." PASS.
- **The keyframes arm being DROPPED is the RIGHT call, transparently recorded.** A first-time auditor could read "the keyframes migration didn't happen" as a failure — but the RESTORE is the better fix (consumer-truth over a single-demo re-architecture), and the commit message + the evidence docs make it legible. PASS.
- **The one genuine "wtf":** `proof:consumer-staleness` flips RED locally the moment the dist d.ts are present (the B-arm runs). On the watch-built dist (the `build:watch` contract-v2 process keeps the JS fresh but emits no d.ts), the gate soft-skips the B-arm and reports clean — so a casual local run can MISS the speedtest violation. That is the trap I caught: the speedtest `useRouteTransition` import is a symbol that has never existed on glass-ui, un-ledgered, and a `gates.mjs --run local` in the W-CLOSE battery (build-first) WILL surface it. This is the S2 miss.

---

## 4 — MISSES (severity-graded, evidence-anchored)

### CR-1 (S2) — speedtest's un-ledgered `useRouteTransition` mis-import

- **What:** `speedtest/src/composables/useAppNavigation.ts:4` — `import { useRouteTransition as useViewRouteTransition } from "@mkbabb/glass-ui/motion-core"`. `useRouteTransition` does NOT exist anywhere on the glass-ui surface (zero hits in `src/`; not in the installed 3.10.0 dist; `/motion-core` exports `useViewTransition`, not `useRouteTransition`). It is UN-ledgered (the W-CONSUMER-ledger covers only the `UnderlineTabs`/`BouncyToggle` tab-family rows, not this one).
- **Evidence:** `proof:consumer-staleness` (run with siblings present + a built dist) → `DELETED SYMBOL ../speedtest/src/composables/useAppNavigation.ts:4 … (not on the current surface; UN-ledgered)`, 1 violation. The gate is tagged `["local","ci"]` + `sibling:true` — CI-green (siblings absent on the runner → skip), local-red. speedtest is pinned `^3.10.0` (resolving the stale-lineage 3.12.0 today), on `master`.
- **Severity rationale (S2 not S1):** PRE-EXISTING — speedtest's installed 3.10.0 ALREADY lacks the symbol, so the bump to 3.13.0 does not NEWLY break it (it is already mis-imported). It is CI-green, so it does NOT block the gated publish. It does NOT touch the slides/keyframes deploy critical path. But it IS a live consumer armed with a non-resolving glass-ui import, and the W-CLOSE §1.5 local release battery (`gates.mjs --run local`, build-first) flags it.
- **Disposition (triumvirate, NOT this lane):** EITHER speedtest migrates the import to the real surface symbol (the aliased name `useViewRouteTransition` + the `/motion-core` path strongly suggest the intended target is `useViewTransition`), OR a DEFERRED row is added to `docs/tranches/AY/audit/W-CONSUMER-ledger.md` with a `{receiver-wave, close-gate}` terminal. glass-ui ships NO source edit (inv-16). Likely a speedtest-side one-line rename — out of glass-ui's tree but in the cross-repo readiness scope.

### CR-2 (S3) — `proof:phantom-classes` stays RED on the documented-pending fourier `cartoon-card`/`glass-elevated` fleet

- **What:** `proof:phantom-classes` is RED (21 pending sites — fourier `cartoon-card`, `config-card`, `glass-elevated`). The W-KF-CONSUMER §5 gate item #9 claimed this gate would "CLOSE with fourier checked out … `PROOF_PHANTOM_ALLOW_PENDING=1` no longer needed." At HEAD the 8 `.glass-{subtle,medium}` arm DID land (those refs are zero), but the SEPARATE pre-existing `cartoon-card`/`glass-elevated` fleet keeps the gate RED.
- **Evidence:** `proof:phantom-classes` → "PENDING — 21 site(s) in documented-pending repo(s)"; the un-applied `docs/tranches/Q/audit/W4-Lane-F-fourier.patch` is the named handoff.
- **Severity rationale (S3, doc-only):** The gate's RED is the HONEST state of a separate, pre-AZ fleet the fourier team owns (NOT the W-KF-CONSUMER 8-class scope — that wave explicitly named the full re-pin as a successor). The only defect is the §5#9 over-claim in the W-KF-CONSUMER doc prose ("the gate is GREEN without `PROOF_PHANTOM_ALLOW_PENDING`"), which is FALSE at HEAD. No code is wrong; the gate is correctly RED. Disposition: a doc-truth correction to the W-KF-CONSUMER close note (the gate close was honestly DROPPED with the keyframes arm), OR the fourier team applies the Q.W4 Lane-F patch. Not blocking; doc-truth only.

---

## 5 — THE W-ADOPT / W-DEPLOY READINESS CHECKLIST (the final section per the lane edict)

The cross-repo HINGE for the engagement is the 3.13.0 cut → slides W-ADOPT → slides W-DEPLOY. Readiness at HEAD:

| precondition | state | evidence |
|---|---|---|
| **glass-ui local build green** (full `npm run build` + `emit-types`) | ✓ READY | built in ~4.3s vite + vue-tsc dts; 71 d.ts; 152 js chunks |
| **`verify-export-types` green** (subpath dts publication probe) | ✓ READY | all export targets + type resolutions valid |
| **`proof:resolution` green** (contract-v2 — the bbnf alias closure) | ✓ READY | exit 0, 0 publisher + 0 consumer violations |
| **`proof:no-retired-survivor` green** (MIGRATION RETIRED claims resolve) | ✓ READY | 5 claims, 0 violations, narrowed to deck-progress/instrument-rail |
| **the RESTORE serves keyframes** (header-ribbon/glass-panel resolvable + paint) | ✓ READY | symbols export; variant=wash/position=right honored; 5-rung live render; keyframes 3.11.2 + staged 3.13.0 both carry them |
| **the protected slides quintet byte-intact** (`/constellation`) | ✓ READY | BASE_WIDTH/warpStep/warpTo/readPalette/seedField/stepField all exported; `proof:constellation-gen` GREEN |
| **the R5 root fixes landed** (slides interim arms armed to retire) | ✓ READY | R5-1/2 dock-scale, R5-3 useDockClickIntegrity, R5-7 veil all in src |
| **the lineage map flagged for the user at the cut** | ✓ READY | W-CLOSE §X.2: 3.10.1 → 3.11.x/3.12.0 stale → 3.13.0; deprecate-or-supersede is the user's call |
| **slides W-ADOPT** (kill the 631-line bespoke engine, re-pin EXACT 3.13.0) | ⧗ PENDING — STATUS: SPEC | next-tranche hinge; depends on the 3.13.0 publish; slides on `^3.9.0`/`main`, bespoke `constellation.ts` still present |
| **slides W-DEPLOY** (live-200 + before/after DELTA + PPTX probe) | ⧗ PENDING — STATUS: SPEC | depends on W-ADOPT close + the USER push hinge (CF token + merge-to-main, USER-DOMAIN); the CURRENT deck IS live-200 with both PPTX resolving |
| **speedtest CR-1 staleness** (the one open consumer gap) | ⚠ OPEN → S2 | `useRouteTransition` mis-import; speedtest-side migrate OR a DEFERRED ledger row; CI-green (does not block the publish), local-red |

**Readiness summary:** glass-ui is CUT-READY for 3.13.0 — every release/consumer gate green, the RESTORE faithful, the lineage map accurate, the protected contracts intact. The two slides hinge waves (W-ADOPT/W-DEPLOY) are correctly STATUS: SPEC (next-tranche, USER-domain at the deploy push). The one cross-repo readiness gap is the pre-existing speedtest `useRouteTransition` mis-import (CR-1, S2) — non-blocking for the gated publish, but it should be dispositioned (migrated speedtest-side or ledgered) before a `gates.mjs --run local` close battery reads clean.

---

## Capture manifest (fresh, stored beside this record)

| filename | viewport/mode | what it proves |
|---|---|---|
| `crossrepo-slides-live-desktop-1280.png` | 1280×720, live prod | the deployed slides deck (the cross-repo consumer) LIVE: constellation + veil-plate + dock pager, 8 slides |
| `crossrepo-slides-live-mobile-390.png` | 390×844, live prod | the live deck's responsive mobile reflow |
| `crossrepo-glass-panel-restored-desktop.png` | 1280×900, :5199 dark | the RESTORED GlassPanel surface (keyframes' `variant="wash"` consumer) painting all 5 rungs |
| `crossrepo-header-ribbon-restored-desktop.png` | 1280×900, :5199 | the RESTORED HeaderRibbon story mounted (keyframes' `position="right"` consumer surface) |

All paths absolute under `/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/reflect/`.

---

## REDRESS ADDENDUM (orchestrator, post-record)

**XR1 (the un-ledgered speedtest staleness) — DISCHARGED.** The phantom
`useRouteTransition` import (`speedtest/src/composables/useAppNavigation.ts:4` — a symbol that
never existed on `/motion-core`) re-pointed to the real `startViewTransition` substrate: the
call shape is identical (`navigate(cb, { types }) → { finished }` ≡
`startViewTransition(mutate, { types }) → { finished }`), the dead
`useViewRouteTransition()` destructure deleted, the D14 comment re-grounded. The LOCAL
`useRouteTransition.ts` (speedtest's own route-derivation composable) is untouched — only the
glass-ui-surface import was phantom. Verified: speedtest `vue-tsc --noEmit` exit 0;
`proof:consumer-staleness` GREEN, 0 violations (the 5 DEFERRED ledger rows stand). Committed
in speedtest (`0982ceca`) + pushed. The W-ADOPT/W-DEPLOY readiness checklist is now fully green.
