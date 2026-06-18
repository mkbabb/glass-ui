# BC Band 10 — Cross-repo asks: the complete grounded ledger (live-confirmed 2026-06-18)

> The MACHINE/DOCS sweep of every cross-repo ASK + CONSUME, re-verified against the live registry + the on-disk sibling trees (all 6 siblings PRESENT at `~/Programming/`). Sources read at glass-ui HEAD `1839860e` (branch `tranche/BB`): `docs/tranches/BB/coordination/{asks-and-consumes.md,cross-repo-inbound.md}`, `docs/tranches/BC/audit/{DEFECT-LEDGER.md,USER-DEFECTS.md}`, `docs/tranches/BC/research/cross-repo-asks.md` (the iter-1 harvest), `docs/consumer-evidence/*.md`, the user-memory `project_*` files, the live sibling trees, the npm registry. Every disposition is GROUNDED to a file:line, a measured pin, a published version, or a live registry probe. This iteration **re-confirms** the iter-1 harvest against the live state and pins the band-10 wave-set — no drift found except the one noted below.

---

## 0 — THE GOVERNING FACT (the timeline reconciliation everything hangs on)

**The BB 4.1.0 cut NEVER HAPPENED. Only a 4.0.1 hotfix shipped.** (live-confirmed)

- `npm view @mkbabb/glass-ui version` → **`4.0.1`** (registry LIVE; `dist-tags.latest = 4.0.1`). `package.json` version = `4.0.1`. The published version list is `…3.13.0, 4.0.0, 4.0.1` (the 3.11.x/3.12.0 d6 fork-line interleaved BELOW mainline).
- The 4.0.1 publish is the `fix(dist-css)` hotfix (iter-1 traced it to commit `2935609d`, an ancestor of HEAD). It carries `scripts/proof-dist-css.mjs` (PRESENT + registered in `gates.mjs`) — the balance-guard for the "Unterminated string" dist comment bug.
- The BB cut wave `W-CLOSE` is **still SPEC**; the user-task ledger confirms Batch 5 (cross-repo adopt), Batch 6 (chronics), Batch 7 (4.1.0 cut + slides redeploy) are all **`pending`**.
- `src/deck.ts` is **ABSENT**; `useDeck` has **zero export refs** in `src/`. `BB.W-DECK.md` `**Status**: SPEC`. The deck lift never ran.

**The consequence for every cross-repo ask:** the BB SOURCE (all primitives, all subpaths, all tokens) IS in the 4.0.1-published tree — `package.json` has **89 exports** including `./border-progress`, `./spa-view`, `./dot-flow-field`, `./concentric`, `./easing`, `./color-swatch`, `./drawer`. The lone ABSENT primitive subpath is **`./deck`** (`deck: false`). BUT the BB tranche shipped **source-green-but-visually-broken** (the BC mandate). So every CONSUMER that pinned `^4.0.1` is in a HOLD posture: it CAN resolve the primitive surface, but the primitives are visually-broken pending BC's repair. **The cross-repo unblock for BC is: fix the primitives visually → BUILD W-DECK → cut the honest 4.x → the consumers adopt.**

**THE ONE PLANNING DRIFT (noted, not a defect):** the speedtest AW relay docs (`BB-AGENT-RELAY.md:48,51`, `glass-ui-BB-ask-brief.md:210,254`) STILL say "BB ships ONE 4.1.0 cut; speedtest bumps `^4.1.0` at AW.W7-BB." The live pin reality is **speedtest `^4.0.1`** because 4.1.0 never cut. The version *number* in the relay docs is stale; the consume *model* (one bump, consume-and-delete) is correct. BC's honest cut may be `4.1.0` or a higher `4.x` — the relay docs re-point to whatever BC actually cuts (the no-silent-drop discipline: the version is USER-DOMAIN at the cut).

---

## 1 — SPEEDTEST (the largest fleet — 9 asks; pinned `^4.0.1`, in adoption HOLD)

### Live pin state (measured `~/Programming/speedtest/package.json`)
- `@mkbabb/glass-ui: ^4.0.1` · `@mkbabb/value.js: ^0.13.0` · `@mkbabb/keyframes.js: ^4.3.0` — **fully peer-aligned**, matching glass-ui's own pins (`value.js ^0.13.0 || ^1.0.0`, `keyframes.js ^4.0.0`). The "parked-on-BB" posture collapsed onto `^4.0.1` (not `^4.1.0` — 4.1.0 never cut).

### The 4.0.1 dist-css fix → `BC.W-DIST-COMMENT-FIX` (ALREADY LANDED — confirm-and-retire)
The dist CSS-comment "Unterminated string" bug (`vite.style-assets.ts` anchored its `@import` folds on `indexOf("@source")` which matched the WORD in comment prose) is **ROOT-FIXED + PUBLISHED at 4.0.1**. The fix anchored on the line-start at-rule + split the `url()` in `glass-refract.css` + the Drawer→subpath API move. The balance-guard gate `scripts/proof-dist-css.mjs` is **PRESENT + registered in `gates.mjs`** (live-verified). **`BC.W-DIST-COMMENT-FIX` is a CONFIRM-and-retire wave, not a build wave** — the source comment + guard-gate already converged with the fleet's fix at 4.0.1.

### The 9 speedtest primitive asks (status: source-published-in-4.0.1, adoption HELD)

| ID | ask | source status (glass-ui 4.0.1) | speedtest adoption (live-measured) |
|---|---|---|---|
| **BorderProgress** | progress IS the card border; masked-conic ring, OKLCH/shorter-hue spectrum, 10–14px envelope | BUILT (`./border-progress` exported; `--border-progress-width` default 12px = the AMENDED A1 10–14px band) | **NOT ADOPTED.** `speedtest/src/features/speedtest/ui/PhaseTimeline.vue:49` still `import { GlassTimeline } from "@mkbabb/glass-ui/timeline"` + hand-rolls `--border-progress-value` `::after` interim (`:12,:36,:164`); the re-point is BOOKED at `:74`. |
| **Deck** (`./deck`) | the slides deck primitive lifted into glass-ui (`useDeck`/`DeckPager`/`useDeckKeyboard` + focus-contract + aria-live + `--spring-deck`) | **NOT BUILT** — the ONE absent subpath (`deck: false`); `useDeck` has 0 refs; `W-DECK` SPEC. The donor `slides/src/deck/` is on-disk (~1108 LoC: `DeckPager.vue`/`DeckView.vue`/`deckKeys.ts`/`pagerWindow.ts`/`deckSpring.ts`/`reveal.ts`/`slideContext.ts`) and names itself the glass-ui `/deck` donor. | **BLOCKED on the unbuilt lift.** speedtest survey-deck is the booked consumer; slides consumes-back (N phase-2). |
| **B3 desktop-reserve** | wide-axis InstrumentChassis `min-block-size` reserve, desktop dial, CLS≈0 | BUILT (`W-DESKTOP-RESERVE`; `--instrument-dial-min-block-size-desktop` token) | **NOT ADOPTED.** `speedtest/src/App.vue:659` still carries `--instrument-dial-min-height-mobile: var(--chassis-max-block-size)` + `min-block-size` interim; `:669` books the R-CONSUME delete. Deletes byte-equivalently. |
| **B7 spaview-cache** | `<SpaView :max>` bounded view-cache (KeepAlive+Transition, out-in) | BUILT (`./spa-view` exported; `consumer-evidence/spa-view.md`) | **NOT ADOPTED (explicit HOLD).** `speedtest/src/layouts/AdminDashboardLayout.vue:137` comment: *"HOLD: glass-ui ships SpaView/cached-view…"* — the hand-rolled view-swap awaits the primitive. |
| **B8 card-tier-alpha-pin** | per-tier glass alpha canonical at the primitive | BUILT (`--glass-opacity-{tier}` named; `proof:card-tier-alpha`) | **NOT ADOPTED.** speedtest `src/design/{tokens.css,register.css}` carry local alpha overrides (instrument 0.72 / document 0.78 / wash 0.55 / overlay 0.70 — the named dark-AA preset). Re-pin to canonical deletes byte-equivalently. |
| **C1 phase-complete-color** | `--phase-complete-color` celebration seam, no baked gold | BUILT-CONFIRMED (`W-PHASE-PALETTE`; default `var(--color-gold)` at chassis root) | speedtest SETS the token in its OWN repo (`CompleteHeadline` reads it). |
| **C2 vSpecular** | `vSpecular` on `/glass`, arms non-dock glass tiers | BUILT-CONFIRMED (`W-LIQUIDHOVER`/`W-LENSING`) | speedtest arms a non-dock glass tier with `v-specular`. |
| **C4 --ease-out-expo** | the SOTA arrival ease published name | BUILT-CONFIRMED (`cubic-bezier(0.16,1,0.3,1)`); A2 (`--ease-expo-out` alias) WITHDRAWN-stale | speedtest binds the existing token. |
| **B1/B4/B5/B6/A3 procedural** | aurora-curl-warp `.frag` (B1), `usePointerVelocityField` (B4), paper-grid-breathe (B5), DotBlob (B6), `sdf-core.wgsl` (A3) | B1-`.frag` BUILT (`curlFBM` in `flow.glsl.ts`); B4 BUILT (`usePointerVelocityField`); A3 ACTIONED (note); B5/B6/B1-WGSL BOOKED (procedural tail) | speedtest consumes on bump; the `?aurora=css` interim deletes when aurora-swraster lands clean. |

### The speedtest A1 time-critical amend (CLOSED at spec)
BorderProgress thickness `6–8px → 10–14px` was **time-critical** (the born-RED gate would have locked the wrong envelope). ACTIONED in `BB.W-BORDER-PROGRESS.md` BEFORE the wave ran — `--border-progress-width` default = 12px. CLOSED.

### BC disposition for SPEEDTEST → **`BC.W-SPEEDTEST-ADOPT`** (Band 10)
The 9-ask set is SOURCE-COMPLETE in 4.0.1 EXCEPT W-DECK (unbuilt) — but the consumer adoption is BLOCKED because (a) the primitives are visually-broken (the BC mandate), and (b) the Deck lift was never built. **BC must:** (1) repair every primitive visually (Bands 1–4), (2) BUILD W-DECK, (3) cut the honest 4.x, (4) drive speedtest's `^4.x` bump + the **5-interim consume-and-delete sweep** (PhaseTimeline→BorderProgress, AdminDashboardLayout→SpaView, App.vue desktop-reserve delete, register.css alpha delete, `?aurora=css` delete). The foreign-tree fence holds: those edits land in the speedtest repo on ITS bump, not in glass-ui.

---

## 2 — value.js (3 asks; 0.13.0 SHIPPED; one consume RE-POINTABLE-NOW, one BOOKED)

### Live state (measured)
- `npm view @mkbabb/value.js version` → **`0.13.0`** (registry LIVE; matches glass-ui's `^0.13.0 || ^1.0.0` peer exactly). value.js sibling present on disk.

| ask # | ask | disposition | live verification |
|---|---|---|---|
| 1 | the OKLCH/shorter-hue spectrum helper `sampleColorRamp(from,to,n,{space,hueMethod})` (no chroma trough) | **SHIPPED at 0.13.0** | `value.js/src/index.ts:158` exports `sampleColorRamp`; `value.js/src/units/color/mix.ts:150` is the impl (`space`/`hueMethod` options, `n≥2`). **CONSUME PENDING.** glass-ui's `useBorderSpectrum.ts:18` is STILL on the local interim (`import { interpolateHue } from "@mkbabb/value.js"`, NOT `sampleColorRamp`); the `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker at `:5-6` books the re-point. **0.13.0 IS published → the consume-and-delete trigger is MET — but the wave hasn't run.** |
| 2 | pin glass-ui `4.0.0`→the cut | value.js's own consume (recorded, not built here) | value.js re-pins at the honest cut — which hasn't happened (only 4.0.1 shipped). |
| 3 | the VJ grammar (scroll-timeline + perceptual ramp) lands 0.13.0 | SHIPPED at 0.13.0 | glass-ui consumes only the perceptual-ramp leg (= ask #1's substrate). |

### The easing/GradientPane cross-consume (W-EASING-PRIMITIVE)
`<EasingPicker>` (`/easing`, BUILT) names value.js's `GradientPane` as the booked SECOND consumer (ease-along-the-ramp). BOOKED, not landed (`consumer-evidence/easing.md` re-audit 2026-09-01). The boundary law (curve MATH=value.js · playback/spring=kf · editor=glass-ui) is mutually AFFIRMED + made code.

### BC disposition for value.js
**No new wave needed; folds into `BC.W-CUT` + a consume-and-delete clause.** (1) Re-point `useBorderSpectrum.ts` onto value.js's published `sampleColorRamp` (trigger MET — 0.13.0 is live) — this is the SINGLE re-pointable-NOW consume in the whole cross-repo system. (2) value.js re-pins glass-ui at the honest cut. (3) GradientPane→/easing stays BOOKED (foreign-tree). The dep graph is acyclic (everyone consumes the published predecessor).

---

## 3 — keyframes.js (3 asks; ALL satisfied/affirmed; kf is now a CONSUMER)

### Live state (measured)
- `npm view @mkbabb/keyframes.js version` → **`4.3.0`** (registry LIVE; matches glass-ui's `^4.0.0` peer; the W-SPINE-LATEST union `^2||^3||^4`→clean `^4`). kf sibling present on disk.

| ask # | ask | disposition |
|---|---|---|
| 5 | confirm `springTimingFunction` (W-DECK's `--spring-deck`) | **✅ SATISFIED** — a LIGHT value.js-free published export; `{fn, css}` where `css` is a `linear()` stops string. Consumable NOW, no kf change. (`KF-TO-GLASSUI-BB-ASKS.md:13`) |
| 6 | the KF-OSCILLATOR shared-oscillator phase (speedtest idle-breath) | **🟡 BOOKED (kf-owned)** — a LIGHT `Oscillator`/phase-clock, value.js-free, non-blocking. The W-EASING-PRIMITIVE picker `loop` seam is the named-successor consume; the default one-shot rAF ships now. |
| 7 | the boundary law | **✅ AFFIRMED** (`KF-TO-GLASSUI-BB-ASKS.md:15,47-48`) — kf owns spring/playback, does not encroach on curve-math or editor. Made code in W-EASING-PRIMITIVE. |

### kf is now a 4th CONSUMER of glass-ui (the inbound confirm)
kf adopted glass-ui `~4.0.0` (the 2026-06-16 dock cure — it hit the SAME 3.13.0 dock defects BA 4.0.0 cured) and re-pins at the cut. kf is enrolled in `scripts/constellation.mjs` CONSUMERS (`id:"keyframes.js"`, line 77) AND is the named 2nd consumer of `W-DOCK-MORPH-FAMILY` (the ≥2 visual-load-bearing bar by-construction with speedtest).

### BC disposition for keyframes.js
**No outbound ask owed; all satisfied/affirmed.** kf is the named dock-morph 2nd consumer — so the **BC dock rebuild (Band 2) must keep kf's dock-cure contract intact** (the collapsed-pill circle, the hover-expand no-flash, the compositor-transform morph). The `--spring-deck` consume rides the unbuilt W-DECK (so it's blocked on the deck lift). The Oscillator `loop` seam stays BOOKED. Folds into `BC.W-MOTION-ONE-CLOCK` (keyframes.js as the ONE animation source+clock — the user's directive) + W-CUT.

---

## 4 — Atlas / sci-report (the d6 lineage consumer — STRANDED on the DEPRECATED fork-line)

### THE CRITICAL FINDING (live-grounded, the d6 lesson made concrete)
- `sci-report/atlas` (package name **`usf-web`**) is PRESENT on disk and pins **`@mkbabb/glass-ui: ^3.12.0`** (measured) — the EXACT off-mainline fork-lineage version the d6 lesson is about (`feat/d6-library-3.10`→3.11.x/3.12.0).
- `npm view @mkbabb/glass-ui@3.12.0 deprecated` → **LIVE deprecation**: *"d6 fork-lineage publish (off-mainline; invariant 11). Superseded by 4.0.0, which restores the full A-list on the gated mainline — see CHANGELOG. Migrate: npm i @mkbabb/glass-ui@^4"* (registry-confirmed this iteration).
- **The Atlas is STRANDED on the deprecated fork-line** — it has NOT migrated to `^4.x`. It is enrolled in `constellation.mjs` (`id:"sci-report/atlas"`, line 139) as the L3 registry-lineage anchor + in `proof:lineage-probe` (`D6_REQUIRED_CONSUMERS = ["slides", "sci-report/atlas"]`).

### What the Atlas consumes (the wide surface BC is rebuilding)
The Atlas imports `aurora, button, constellation, controls, dark, dock, expandable-container, glass-panel, handmark, hover-popover, metric-badge, motion-core, paper-backdrop, popover, select, slider, switch, toggle-group` + the root barrel + `/styles`. This is precisely the dock/constellation/aurora/glass-panel surface BC Band 1–4 is repairing.

### The Atlas's booked consume-and-delete (the seven-needs map, all glass-ui-direct, zero forks)
From `docs/tranches/BB/audit/atlas-expand/UNIFIED-BRIEF.md` (PRESENT on disk):
- **BB-1 dock-vertical-morph** → W-DOCK-MORPH-FAMILY sub-ask f (COMPLETE source). The Atlas's vertical rail just sets `:always-expanded="false"`.
- **BB-4 deck-morph** → clause under BB-1 (COMPLETE source).
- **BB-3 glass-accent-seam** → W-GLASS-ACCENT (`--glass-accent` chromatic rim axis, COMPLETE source). The Atlas's hand-rolled accent threading folds onto the seam.
- **BB-5 metallic-shimmer** → W-METAL-SHIMMER (bronze quad + parameterized shimmer, COMPLETE source).
- **BB-2 drawer-direction-ladder** → W-DRAWER-ABROGATE (vaul abrogated, COMPLETE source). **Live workaround:** `atlas/src/platform/chrome/filter/FilterPanel.vue:20,208,221` uses `:snap-points="[]"` → `hasSnapPoints=false` → plain full-slide for the right lens — the EXACT consume-and-delete target the native direction-ladder retires.
- **MARKS/silver carry** → named-consumer fold (4.0.0 HandMark + silver quad).
- The Atlas `^4.x` bump + the fallback-branch deletes are W-CONSUMER-MODERNIZE (SPEC).

### BC disposition for Atlas → **`BC.W-ATLAS-ASK`** (Band 10)
The Atlas is the live d6-lineage proof: a real on-disk consumer STRANDED on a deprecated fork-line pin. **BC must:** (1) keep the lineage-probe + constellation-completeness asserts GREEN (the d6 lesson is structural — `proof:lineage-probe` L1-L3 + the synthetic `/dock`-RETIRED self-test), (2) repair the wide surface the Atlas consumes (dock/constellation/aurora/glass-panel — Bands 1–4), (3) at W-CUT drive the Atlas's `^3.12.0`→`^4.x` bump + the consume-and-delete sweep (`:snap-points="[]"` delete, the dock-vertical CSS shim delete, the glass-accent threading fold). The seven-needs are all glass-ui-direct (zero Atlas forks) and all COMPLETE in source — the adopt is the gap. The foreign-tree fence holds.

---

## 5 — slides (the un-closed deploy hinge; production HELD DOWN)

### Live state (from `project_slides_tranche_n_union.md`, verified)
- **slides.friday.institute is TAKEN DOWN** (2026-06-12, *"we cannot have that publicly facing"*) — it serves a **noindex holding page** (wrangler direct-upload over the `slides` Pages production branch; no git change).
- Tranche N (the union of til-briefing + feedback-coder through ONE glass-ui adopt) is committed LOCAL at `b538506` (branch `main`) but **UNPUSHED** — any push auto-redeploys via `deploy-pages.yml`, so the push is HELD for the user's explicit greenlight.
- The remaining N waves are HINGE-GATED: **H-BA** (glass-ui BA 4.0.0 publishing — DONE, 4.0.0 is live) gates W-FC3 + W-ADOPT; **H-DEPLOY** (the user's re-publication greenlight) gates W-DEPLOY.
- **W-ADOPT is tiny (1 pin + 2 edits):** `DeckGate.vue:70` `primary-audacious`→`solid` + DELETE the gray-arm opt-out `deck.css:1013-1023`. The `/underline`→HandMark "break" is a PHANTOM (slides imports zero `/underline`).
- slides is the ONE driven consumer (W-SLIDES-DRIVE; the deck consume-back is N phase-2 after the glass-ui deck lift lands). Enrolled in `constellation.mjs` (`id:"slides"`, line 126) + `proof:lineage-probe` `D6_REQUIRED_CONSUMERS`.

### BC disposition for slides → folds into **`BC.W-CUT`** (EXECUTION-phase only)
**slides is USER-DOMAIN + EXECUTION-phase.** BC is tranche-DEVELOPMENT only (no implementation until greenlight). The slides redeploy is gated on (a) the honest 4.x cut, (b) the deck lift (so slides can consume-back the deck — N phase-2), (c) the user's H-DEPLOY greenlight. **BC must:** record the slides hinge as a W-CUT acceptance clause (the W-ADOPT 1-pin-2-edit + the push-held-on-greenlight) but NOT execute it. The deck-consume-back is blocked on the unbuilt W-DECK.

---

## 6 — fourier-analysis (no outbound asks; clean `^4.0.0` pin)

- `~/Programming/fourier-analysis/web/package.json` pins `@mkbabb/glass-ui: ^4.0.0` (measured; on-mainline, current). The repo-root `package.json` has no glass-ui pin (the `web/` workspace is the consumer). Enrolled in `constellation.mjs` (`id:"fourier-analysis/web"`, line 89).
- **No outbound ask ON glass-ui found.** fourier-analysis has coordination docs (`docs/tranches/A/coordination/CONSTELLATION.md`, `docs/tranches/B/coordination/CONFORMANCE-MATRIX.md`) but NO ask-brief, NO `*glass-ui*ask*` file. The BC user-defect ledger's FOURIER item ("totally duplicative — several fourier views → ONE view") is an **IN-REPO glass-ui demo-redesign defect** (`/substrates/fourier`), NOT a cross-repo ask FROM fourier-analysis.
- The fourier-analysis `^4.0.0` consumer bump rides the family-caret; it modernizes under W-CONSUMER-MODERNIZE at the cut.

### BC disposition for fourier → **`BC.W-FOURIER-ONE`** is an IN-REPO demo wave (Band 4), NOT a cross-repo ask
The fourier asks the user names are all glass-ui's OWN `/substrates/fourier` demo (collapse to ONE view, kill the duplicates). No fourier-analysis-side ask is owed. The fourier-analysis `^4.0.0` consumer bump folds into W-CONSUMER-MODERNIZE at the cut.

---

## 7 — The publish-CI history + the un-closed hinges (the close-class lessons)

### Publish-CI state (from `project_publish_ci_broken.md` + `project_glassui_400_published.md`)
- **CI publish WORKS now.** glass-ui's tag-triggered `release.yml` PUBLISHES cleanly with provenance (`NPM_TOKEN` seeded, `--run release` converged, `--provenance` OIDC, `repository` field). 4.0.0 + 4.0.1 both published via CI on a `v*` tag push. keyframes.js (4.0.0+ via CI, run 27078313231) + value.js publish the same model. The early "publish must be local" claim is STALE (corrected 2026-06-04/06-07).
- **THE CLOSE-CLASS LESSON (recurring, binding for BC's cut):** the BA cut was declared "complete" on `gates.mjs --run local` which EXCLUDES release-tagged gates → the tag push surfaced a build-blocker (`@mkbabb/pencil-boil` statically imported but optional-peer → `TS2307` on clean `npm ci`) + a stale lockfile + allowlist drift + 5 drifted release-only gates, ONE CI round-trip at a time. **Fix: at the BC cut run `gates.mjs --run full` (the deduped union, W-CLOSE-BATTERY) siblings-absent in a clean worktree BEFORE tagging.** BB already built this: `proof:close-battery-parity` (W-CLOSE-BATTERY; `--run full` ≈ 202 gates).

### The un-closed hinges (all USER-DOMAIN, EXECUTION-phase)
1. **The honest 4.x cut** — `W-CLOSE` SPEC. The BB tranche shipped source-green-but-visually-broken; BC repairs it then cuts. This is the cross-repo unblock that gates EVERY consumer adopt.
2. **slides redeploy** — production held DOWN on user greenlight (W-DEPLOY).
3. **The consumer adopt sweep** — Batch 5/6/7 (cross-repo adopt / chronics / close) all `pending`; speedtest/Atlas/value.js/kf/slides/fourier all re-pin + consume-and-delete at the cut.

---

## 8 — The DECIDED BC dispositions (the band-10 wave-set, mapped)

| ask cluster | BC home | BC disposition |
|---|---|---|
| speedtest 9-ask fleet (BorderProgress/Deck/desktop-reserve/spaview/card-tier-alpha + 4 confirms) | **BC.W-SPEEDTEST-ADOPT** | source-complete-in-4.0.1 EXCEPT W-DECK (unbuilt). BC repairs primitives visually → builds W-DECK → cuts 4.x → drives speedtest `^4.x` + the 5-interim consume-and-delete sweep. |
| **W-DECK (the deck lift)** | **BC.W-DECK** (new — the single largest UNBUILT cross-repo ask) | BUILD the `/deck` SIBLING subpath (lift `slides/src/deck/`, ~1108 LoC; `useDeck`/`DeckPager`/`useDeckKeyboard` focus-guarded + aria-live + `--spring-deck`=kf springTimingFunction). The donor names itself the donor; `<DeckPager>` composes `PagerDots`' `pagerWindow` (no third re-fork). Unblocks speedtest survey-deck + slides consume-back (N phase-2). |
| value.js (sampleColorRamp consume + GradientPane book) | **BC.W-CUT** + consume-clause | re-point `useBorderSpectrum.ts:18` onto value.js 0.13.0's published `sampleColorRamp` (trigger MET — the ONLY re-pointable-NOW consume); value.js re-pins at the cut; GradientPane→/easing stays BOOKED. |
| keyframes.js (springTimingFunction/Oscillator/boundary-law + kf-as-consumer) | **BC.W-MOTION-ONE-CLOCK** + W-CUT | all satisfied/affirmed; keep kf's dock-cure contract intact in the dock rebuild; Oscillator loop seam stays booked; kf re-pins at the cut. |
| Atlas (the d6-lineage stranded consumer) | **BC.W-ATLAS-ASK** | keep lineage-probe/constellation GREEN; repair the wide surface the Atlas consumes; at W-CUT drive Atlas `^3.12.0`→`^4.x` + the `:snap-points="[]"`/dock-shim/glass-accent consume-and-delete. Seven-needs all glass-ui-direct + COMPLETE; the adopt is the gap. |
| slides (production held down) | **BC.W-CUT** (EXECUTION-only) | record the W-ADOPT 1-pin-2-edit + the held push as a W-CUT clause; do NOT execute (tranche-dev only); deck consume-back blocked on W-DECK. |
| fourier (no outbound ask) | **BC.W-FOURIER-ONE** (in-repo demo, Band 4) | the "ONE fourier view" is glass-ui's own demo redesign, not a fourier-analysis-side ask; fourier `^4.0.0` bumps under W-CONSUMER-MODERNIZE. |
| dist-css comment fix | **BC.W-DIST-COMMENT-FIX** | ALREADY LANDED at 4.0.1 (`proof:dist-css` PRESENT+registered); BC CONFIRMS + retires the convergence note (not a build wave). |
| the honest 4.x cut | **BC.W-CUT** (EXECUTION-only) | run `--run full` siblings-absent before tag (the close-class lesson); the cut is the cross-repo unblock gating every consumer adopt. |

---

## 9 — The no-silent-drop completeness check (every ask has a terminal disposition)

The `proof:crossrepo-asks` no-silent-drop law is the binding floor. Every ask above carries a TERMINAL disposition: BUILT-in-source / NOT-BUILT (W-DECK) / SATISFIED / AFFIRMED / BOOKED / CONSUME-PENDING / ADOPTION-HELD. **The two genuine GAPS (not just adoption-held):**
1. **W-DECK is the ONE unbuilt cross-repo primitive** — the `/deck` subpath is absent (`deck: false`), `useDeck` does not exist (0 refs), the wave is SPEC; the ~1108-LoC slides donor is on-disk and self-names. It gates speedtest survey-deck + slides consume-back. This is the **single largest band-10 build item**.
2. **The value.js `sampleColorRamp` consume is re-pointable NOW** (0.13.0 published, `value.js/src/units/color/mix.ts:150` is the export) but glass-ui's `useBorderSpectrum.ts:18` is still on the `interpolateHue` interim with the `CONSUME(...)` marker at `:5-6`. The trigger is MET; the consume-and-delete just needs to run.

Everything else is either **source-complete-pending-visual-repair** (the BC mandate — repair the primitives, then the consumers adopt) or **adoption-held-on-the-honest-cut** (the 5 speedtest interims + the Atlas `^3.12.0` deprecated-pin + the slides held push + value.js/kf/fourier re-pins). The cross-repo system is COHERENT — no mismatch flagged; **the single honest 4.x cut + the consume-and-delete cadence is the unblock.**

### The one drift recorded (for the re-run discipline)
The speedtest AW relay docs still hard-name `4.1.0` as the cut version (`BB-AGENT-RELAY.md:48`); the live pin reality is `^4.0.1` (4.1.0 never cut). The version *number* re-points to whatever BC's honest cut actually is — USER-DOMAIN at the cut, NOT a silent reconcile here.

---

## 10 — The dep graph (acyclic spine, transcribed + reconciled against live versions)

```
value.js 0.13.0 (SHIPPED) ──sampleColorRamp──► glass-ui useBorderSpectrum  [CONSUME PENDING — trigger MET, wave unran]
keyframes.js 4.3.0 (SHIPPED) ──springTimingFunction (LIGHT)──► glass-ui W-DECK (--spring-deck)  [✅ SATISFIED — blocked on the unbuilt deck lift]
                            ──KF-OSCILLATOR (LIGHT, booked)──► glass-ui W-EASING-PRIMITIVE (loop seam)  [🟡 BOOKED kf-owned]
slides src/deck/ (~1108 LoC) ──donor (lift)──► glass-ui W-DECK (/deck)  [NOT BUILT — the band-10 build gap]
glass-ui 4.0.0/4.0.1 (PUBLISHED) ──dock cure / register fixes──► kf adopt · slides N.W-ADOPT · value.js pin · Atlas (STRANDED on ^3.12.0)
glass-ui honest 4.x (BC cut, UNRAN) ──repaired primitives + W-DECK──► speedtest ^4.x · kf re-pin · slides re-pin · value.js re-pin · Atlas ^4.x
```

Everyone consumes the PUBLISHED predecessor; no cycle (the constellation acyclic-spine discipline). The version cut + the npm re-pins stay USER-DOMAIN (confirm-first). The content-only fence (inv-26) holds: this corpus + the band-10 waves are glass-ui-side ONLY; every sibling edit (speedtest consume-and-delete, Atlas `^4.x` bump, slides W-ADOPT, value.js/kf re-pins) lands in the SIBLING's own tree on its bump — the by-name ask is the only channel.