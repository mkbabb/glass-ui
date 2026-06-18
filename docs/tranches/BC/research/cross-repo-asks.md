# BC Band 10 — Cross-repo asks: the complete grounded ledger

> **The MACHINE/DOCS sweep of every cross-repo ASK + CONSUME.** Sources read at HEAD 2026-06-18: `docs/tranches/BB/coordination/{asks-and-consumes.md,cross-repo-inbound.md}`, `docs/consumer-evidence/*.md`, the user-memory `project_*` files, the live sibling trees (`~/Programming/{speedtest,value.js,keyframes.js,fourier-analysis,sci-report/atlas,slides}`), and the npm registry. Every disposition below is GROUNDED to a file:line, a measured pin, a published version, or a registry probe.

---

## 0 — THE GOVERNING FACT (the timeline reconciliation everything else hangs on)

**The BB 4.1.0 cut NEVER HAPPENED. Only a 4.0.1 hotfix shipped.**

- `npm view @mkbabb/glass-ui version` → **`4.0.1`** (`dist-tags.latest = 4.0.1`). `package.json` version = `4.0.1`.
- The 4.0.1 publish is commit **`2935609d`** (`fix(dist-css): consumer-build hotfix (4.0.1) — @source-anchor comment splice + glass-refract split-url()`), an ANCESTOR of `tranche/BB` HEAD `941aae45`. It touched `package.json`, `scripts/gates.mjs`, the NEW `scripts/proof-dist-css.mjs` (293 lines), `src/styles/glass-refract.css`, `src/styles/glass/material.css`, `src/styles/tokens/property-regs.css`, `vite.style-assets.ts`.
- The BB cut wave `W-CLOSE` (`docs/tranches/BB/waves/BB.W-CLOSE.md`) and `PROGRESS.md:109` row are **still `SPEC`** ("4.1.0 cut; full-set release battery; zero re-book"). The user-task ledger confirms Batch 5 (cross-repo adopt), Batch 6 (chronics+doc), Batch 7 (4.1.0 cut + slides redeploy) are all **`pending`**.

**The consequence for every cross-repo ask:** the BB SOURCE (all primitives, all subpaths, all tokens) IS in the 4.0.1-published tree — every BB primitive subpath is `EXPORTED` in `package.json` (`./border-progress`, `./spa-view`, `./dot-flow-field`, `./concentric`, `./easing`, `./color-swatch`, `./drawer` all present; `./deck` is the lone ABSENT) and the tokens exist (`--instrument-dial-min-block-size-desktop` in `tokens/offsets.css`+`instrument-chassis.css`; `--phase-complete-color` in `instrument-chassis.css`+`InstrumentChassis.vue`). BUT the BB tranche shipped **source-green-but-visually-broken** (the BC mandate). So every CONSUMER that pinned `^4.0.1` is in a HOLD posture: it CAN resolve the primitive surface, but the primitives are visually-broken pending BC's repair. **The cross-repo unblock for BC is: fix the primitives visually → cut the honest 4.x → the consumers adopt.**

---

## 1 — SPEEDTEST (the largest fleet — 9 asks; pinned `^4.0.1` but in adoption HOLD)

### Live pin state (measured `~/Programming/speedtest/package.json`)
- `@mkbabb/glass-ui: ^4.0.1` · `@mkbabb/value.js: ^0.13.0` · `@mkbabb/keyframes.js: ^4.3.0` — **fully peer-aligned**. The "parked-on-BB" posture from the AW relay has collapsed onto `^4.0.1` (not the planned `^4.1.0` — because 4.1.0 never cut). The peer alignment matches glass-ui's own pins exactly (`@mkbabb/value.js: ^0.13.0 || ^1.0.0`, `@mkbabb/keyframes.js: ^4.0.0`).

### The 4.0.1 dist-css fix (DEFECT-LEDGER §"cross-repo coordination" + commit 2935609d)
The dist CSS-comment "Unterminated string" bug (`vite.style-assets.ts` anchored its `@import` folds on `indexOf("@source")` which matched the WORD in comment prose) is **ROOT-FIXED + PUBLISHED at 4.0.1**. The fix: anchor on the line-start at-rule + split the `url()` in `glass-refract.css` + the Drawer→subpath API move. A NEW `proof:dist-css` gate (`scripts/proof-dist-css.mjs`, 293 lines) is the balance-guard. **This is the `BC.W-DIST-COMMENT-FIX` convergence target — ALREADY LANDED at 4.0.1.** The BC home note (DEFECT-LEDGER) says the source comment + guard-gate converge with 4.0.1, which they have; BC.W-DIST-COMMENT-FIX is therefore a CONFIRM-and-retire wave, not a build wave.

### The 9 speedtest primitive asks (status: source-published-in-4.0.1, adoption HELD)
From `speedtest/docs/tranches/AW/coordination/{glass-ui-BB-ask-brief.md, BB-AGENT-RELAY.md}` (the AW v3 relay) + `asks-and-consumes.md §2`:

| ID | ask | source status (glass-ui 4.0.1) | speedtest adoption status (measured) |
|---|---|---|---|
| **BorderProgress** (C2) | progress IS the card border; masked-conic ring, OKLCH/shorter-hue spectrum, 10–14px envelope | BUILT (`src/components/custom/border-progress/`, `./border-progress` exported); `proof:border-progress` GREEN; `--border-progress-width` default 12px (the AMENDED A1 10–14px band) | **NOT ADOPTED.** `speedtest/src/features/speedtest/ui/PhaseTimeline.vue:49` still imports `GlassTimeline` from `@mkbabb/glass-ui/timeline` + hand-rolls a `--border-progress-value` `::after` interim (`:12,:74,:164,:282`). Comment :74 books the re-point. The floating `PhaseTimeline` rail is NOT retired. |
| **Deck** (`./deck`, C6) | the slides deck primitive lifted into glass-ui (`useDeck`/`DeckPager`/`useDeckKeyboard` + focus-contract + aria-live + `--spring-deck`) | **NOT BUILT.** `./deck` is the ONE absent subpath; `useDeck`/`DeckCore`/`DeckPager` do NOT exist in `src/`. `W-DECK` (`docs/tranches/BB/waves/BB.W-DECK.md`, `PROGRESS.md:71`) is **SPEC**. The donor (`slides/src/deck/`, ~1600 LoC) names ITSELF the glass-ui `/deck` donor; the AX `deck-subpath` disposition-book TRIGGERED (speedtest survey + slides = ≥2 repos) but the lift never ran. | **BLOCKED on the unbuilt lift.** speedtest WV2 survey-deck is the booked consumer; slides consumes-back (N phase-2). |
| **B3 desktop-reserve** | wide-axis InstrumentChassis `min-block-size` reserve, desktop dial, CLS≈0 | BUILT (`W-DESKTOP-RESERVE` complete; `--instrument-dial-min-block-size-desktop` in `tokens/offsets.css`, `@container chassis (min-width:45rem)` reserve in `instrument-chassis.css`; `proof:desktop-reserve` GREEN) | **NOT ADOPTED.** `speedtest/src/App.vue:659-741` still carries the local `--instrument-dial-min-height-mobile: var(--chassis-max-block-size)` + `min-block-size` interim. Deletes byte-equivalently on consume. |
| **B7 spaview-cache** | `<SpaView :max>` bounded view-cache (KeepAlive+Transition, out-in) | BUILT (`W-SPAVIEW-CACHE` complete; `src/components/custom/spa-view/SpaView.vue`, `./spa-view` exported; `consumer-evidence/spa-view.md`) | **NOT ADOPTED (explicit HOLD).** `speedtest/src/layouts/AdminDashboardLayout.vue:137` comment: *"HOLD: glass-ui ships SpaView/cached-view…"* — the hand-rolled view-swap awaits the primitive. |
| **B8 card-tier-alpha-pin** | per-tier glass alpha canonical at the primitive | BUILT (`W-CARD-TIER-ALPHA`; `--glass-opacity-{tier}` named in `tokens/glass.css`; `proof:card-tier-alpha`) | **NOT ADOPTED.** `speedtest/src/design/{tokens.css,register.css}` carry the local alpha overrides (instrument 0.72 / document 0.78 / wash 0.55 / overlay 0.70 — the named dark-AA preset, presets-in-consumers). A re-pin to the library canonical deletes byte-equivalently. |
| **C1 phase-complete-color** | `--phase-complete-color` celebration seam, no baked gold | BUILT (`W-PHASE-PALETTE` complete; 8 references in `instrument-chassis.css`; `--phase-complete-color: var(--color-gold)` default at chassis root) — **CONFIRMED** in the AW relay | speedtest SETS the token in its OWN repo at consume (`CompleteHeadline` reads it). |
| **C2 vSpecular** | `vSpecular` on `/glass`, arms non-dock glass tiers | BUILT (`W-LIQUIDHOVER`/`W-LENSING` complete; 3 references in `composables/glass/index.ts`) — **CONFIRMED** | speedtest arms a non-dock glass tier by adding `v-specular`. |
| **C4 --ease-out-expo** | the SOTA arrival ease published name | BUILT (`W-MOTION-CANON` complete; `scheme-motion.css` = `cubic-bezier(0.16,1,0.3,1)`) — **CONFIRMED**; A2 (`--ease-expo-out` alias) WITHDRAWN-stale (a second alias would red `proof:animation-coherence`) | speedtest binds the existing token. |
| **B1/B4/B5/B6/A3 procedural** | aurora-curl-warp `.frag` (B1), `usePointerVelocityField` (B4), paper-grid-breathe (B5), DotBlob (B6), `sdf-core.wgsl` note (A3) | B1-`.frag` BUILT (`W-AUR-KUWAHARA`/aurora-curl-warp; `curlFBM` shared chunk in `flow.glsl.ts`); B4 BUILT (`usePointerVelocityField` on `/motion-core`+root barrel); A3 ACTIONED (note in `BB-AMENDMENT-viz.md`); B5/B6/B1-WGSL BOOKED (procedural tail) | speedtest consumes on bump; the `?aurora=css` interim (`App.vue:369`) deletes when aurora-swraster lands clean. |

### The speedtest A1 time-critical amend (CLOSED at spec)
The AW v3 §0 correction: BorderProgress thickness `6–8px → 10–14px` was **time-critical** (the born-RED gate would have locked the wrong envelope). ACTIONED in `BB.W-BORDER-PROGRESS.md` BEFORE the wave ran — `--border-progress-width` default = 12px, gate W4 + π lock the thicker band. CLOSED.

### BC disposition for SPEEDTEST → **`BC.W-SPEEDTEST-ADOPT`**
The 9-ask set is SOURCE-COMPLETE in 4.0.1 but the consumer adoption is BLOCKED because (a) the primitives are visually-broken (the BC mandate), and (b) the Deck lift (`W-DECK`) was never built. **BC must:** (1) repair every primitive visually (Bands 1–4), (2) BUILD W-DECK (the deck lift — the largest unbuilt cross-repo ask), (3) cut the honest 4.x, (4) drive speedtest's `^4.x` bump + the consume-and-delete sweep (PhaseTimeline→BorderProgress, AdminDashboardLayout→SpaView, App.vue desktop-reserve delete, register.css alpha delete, `?aurora=css` delete). The foreign-tree fence holds: those edits land in the speedtest repo on ITS bump, not here.

---

## 2 — value.js (3 asks; 0.13.0 SHIPPED; one consume PENDING, one BOOKED)

### Live state (measured)
- `npm view @mkbabb/value.js version` → **`0.13.0`** (matches glass-ui's `^0.13.0 || ^1.0.0` peer exactly).

| ask # | ask | disposition | live verification |
|---|---|---|---|
| 1 | the OKLCH/shorter-hue spectrum helper `sampleColorRamp(from,to,n,{space,hueMethod})` | **SHIPPED at 0.13.0** (`WAVES-2.md:43-44`, N.W11.D); `value.js/src/index.ts` + `units/color/mix.ts` export `sampleColorRamp` (verified on disk) | **CONSUME PENDING.** glass-ui's `useBorderSpectrum.ts:5-6,18` is STILL on the local interim (imports `interpolateHue` from `@mkbabb/value.js`, NOT `sampleColorRamp`); the `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker at :5 books the re-point. 0.13.0 is published, so the consume-and-delete trigger is MET — but the wave hasn't run. |
| 2 | pin glass-ui `4.0.0`→`4.1.0` at the cut | value.js's own consume (recorded, not built here) | value.js re-pins at the cut — which hasn't happened (only 4.0.1 shipped). |
| 3 | the VJ grammar (scroll-timeline + perceptual ramp) lands 0.13.0 | SHIPPED at 0.13.0 (N.W11′ + N.W11.D) | glass-ui consumes only the perceptual-ramp leg (= ask #1's substrate). |

### The easing/GradientPane cross-consume (W-EASING-PRIMITIVE)
`<EasingPicker>` (`/easing`, BUILT, `W-EASING-PRIMITIVE` complete) names value.js's `GradientPane` as the booked SECOND consumer (the ease-along-the-ramp picker). Verified: `grep glass-ui/easing ~/Programming/value.js/src` → **0 hits** — the GradientPane consume is BOOKED, not landed (re-audit date 2026-09-01 per `consumer-evidence/easing.md`). The boundary law (curve MATH=value.js · playback/spring=kf · editor=glass-ui) is mutually AFFIRMED + made code.

### BC disposition for value.js
**No new wave needed; folds into `BC.W-CUT` + a consume-and-delete clause.** (1) Re-point `useBorderSpectrum` onto value.js's published `sampleColorRamp` (the consume-and-delete the marker books — value.js 0.13.0 is live). (2) value.js re-pins glass-ui at the honest 4.x cut. (3) GradientPane→/easing stays BOOKED (foreign-tree, value.js's own edit). The dep graph is acyclic (everyone consumes the published predecessor).

---

## 3 — keyframes.js (3 asks; ALL satisfied/affirmed; kf is now a CONSUMER)

### Live state (measured)
- `npm view @mkbabb/keyframes.js version` → **`4.3.0`** (matches glass-ui's `^4.0.0` peer; the W-SPINE-LATEST union `^2||^3||^4`→clean `^4`).

| ask # | ask | disposition (sibling response) |
|---|---|---|
| 5 | confirm `springTimingFunction` (W-DECK's `--spring-deck`) | **✅ SATISFIED** — a LIGHT value.js-free published export (`keyframes.js/src/animation/springTimingFunction.ts`); `{fn, css}` where `css` is a `linear()` stops string. Consumable NOW, no kf change. (`KF-TO-GLASSUI-BB-ASKS.md:13`) |
| 6 | the KF-OSCILLATOR shared-oscillator phase (speedtest idle-breath) | **🟡 BOOKED (kf-owned)** — a LIGHT `Oscillator`/phase-clock, value.js-free, non-blocking. The W-EASING-PRIMITIVE picker `loop` seam is the named-successor consume; the default one-shot rAF ships now. |
| 7 | the boundary law | **✅ AFFIRMED** (`KF-TO-GLASSUI-BB-ASKS.md:15,47-48`) — kf owns spring/playback, does not encroach on curve-math or editor. Made code in W-EASING-PRIMITIVE. |

### kf is now a 4th CONSUMER of glass-ui (the inbound confirm)
kf adopted glass-ui `~4.0.0` (the 2026-06-16 dock cure — it hit the SAME 3.13.0 dock defects BA 4.0.0 cured) and re-pins at the cut. kf is enrolled in `scripts/constellation.mjs` CONSUMERS (`id:"keyframes.js"`, line 76) AND is the named 2nd consumer of `W-DOCK-MORPH-FAMILY` (the ≥2 visual-load-bearing bar by-construction with speedtest). The peer-spine admits kf 4.x (W-SPINE-LATEST).

### BC disposition for keyframes.js
**No outbound ask owed; all satisfied/affirmed.** kf is the named dock-morph 2nd consumer — so the BC dock rebuild (Band 2) must keep kf's dock-cure contract intact. The `--spring-deck` consume rides the unbuilt W-DECK (so it's blocked on the deck lift). The Oscillator `loop` seam stays BOOKED (kf delivers when consumed). Folds into `BC.W-MOTION-ONE-CLOCK` (keyframes.js as the ONE animation source+clock — the user's directive) + W-CUT.

---

## 4 — Atlas / sci-report (the d6 lineage consumer — STRANDED on the deprecated fork-line)

### THE CRITICAL FINDING (live-grounded, the d6 lesson made concrete)
- `sci-report/atlas` (package name **`usf-web`**) is PRESENT on disk and pins **`@mkbabb/glass-ui: ^3.12.0`** — the EXACT off-mainline fork-lineage version the d6 lesson is about (`feat/d6-library-3.10`→3.11.x/3.12.0).
- `npm view @mkbabb/glass-ui@3.12.0 deprecated` → **`"d6 fork-lineage publish (off-mainline; invariant 11). Superseded by 4.0.0… Migrate: npm i @mkbabb/glass-ui@^4"`** — the deprecation is LIVE on npm. The published version list shows the fork-line `3.11.0/3.11.1/3.11.2/3.12.0` interleaved with mainline `3.10.x/3.13.0/4.0.0/4.0.1`.
- **The Atlas is STRANDED on the deprecated fork-line** — it has NOT migrated to `^4.x`. It is enrolled in `constellation.mjs` (`id:"sci-report/atlas"`, line 144) as the L3 registry-lineage anchor + in `proof:lineage-probe` (`D6_REQUIRED_CONSUMERS = ["slides", "sci-report/atlas"]`, `scripts/proof-lineage-probe.mjs:58`).

### What the Atlas consumes (the wide surface BC is rebuilding)
`grep -hoE "@mkbabb/glass-ui[a-z/-]*" atlas/src` → `aurora, button, constellation, controls, dark, dock, expandable-container, glass-panel, handmark, hover-popover, metric-badge, motion-core, paper-backdrop, popover, select, slider, switch, toggle-group` + the root barrel + `/styles`. This is precisely the dock/constellation/aurora/glass-panel surface BC Band 1–4 is repairing.

### The Atlas's booked consume-and-delete (the seven-needs map, all glass-ui-direct, zero forks)
From `docs/tranches/BB/audit/atlas-expand/UNIFIED-BRIEF.md §4`:
- **BB-1 dock-vertical-morph** → FOLDED into W-DOCK-MORPH-FAMILY sub-ask f (COMPLETE). The Atlas's vertical rail just sets `:always-expanded="false"`.
- **BB-4 deck-morph** → acceptance clause under BB-1 (COMPLETE).
- **BB-3 glass-accent-seam** → W-GLASS-ACCENT (`--glass-accent` chromatic rim axis, COMPLETE). The Atlas's hand-rolled accent threading folds onto the `--glass-accent` seam.
- **BB-5 metallic-shimmer** → W-METAL-SHIMMER (bronze quad + parameterized shimmer, COMPLETE).
- **BB-2 drawer-direction-ladder** → clause of W-DRAWER-ABROGATE (vaul abrogated, COMPLETE). **Live workaround:** `atlas/src/platform/chrome/filter/FilterPanel.vue:20,208,221` uses `:snap-points="[]"`→`hasSnapPoints=false`→plain full-slide for the right lens — the EXACT consume-and-delete target W-DRAWER-ABROGATE's native direction-ladder retires.
- **MARKS/silver carry** → named-consumer fold (the Atlas consumes 4.0.0 HandMark + silver quad).
- The Atlas `^4.x` bump + the fallback-branch deletes are W-CONSUMER-MODERNIZE (still SPEC).

### BC disposition for Atlas → **`BC.W-ATLAS-ASK`**
The Atlas is the live d6-lineage proof: a real on-disk consumer STRANDED on a deprecated fork-line pin. **BC must:** (1) keep the lineage-probe + constellation-completeness asserts GREEN (the d6 lesson is structural), (2) repair the wide surface the Atlas consumes (dock/constellation/aurora/glass-panel — Bands 1–4), (3) at W-CUT, drive the Atlas's `^4.x` bump + the consume-and-delete sweep (`:snap-points="[]"` delete, the dock-vertical CSS shim delete, the glass-accent threading fold). The seven-needs are all glass-ui-direct (zero Atlas forks) and all COMPLETE in source — the adopt is the gap. The foreign-tree fence holds (the Atlas edits land in sci-report's repo on its bump).

---

## 5 — slides (the un-closed deploy hinge; production HELD DOWN)

### Live state (from `project_slides_tranche_n_union.md` + `project_slides_tranche_m.md`)
- **slides.friday.institute is TAKEN DOWN** (2026-06-12, "we cannot have that publicly facing") — it serves a **noindex holding page** (wrangler direct-upload over the `slides` Pages production branch; no git change).
- Tranche N (the union of til-briefing + feedback-coder through ONE glass-ui adopt) is committed LOCAL at `b538506` (branch `main`) but **UNPUSHED** — any push auto-redeploys via `deploy-pages.yml`, so the push is HELD for the user's explicit greenlight.
- The remaining N waves are HINGE-GATED: **H-BA** (glass-ui BA 4.0.0 publishing — DONE, 4.0.0 is live) gates W-FC3 + W-ADOPT; **H-DEPLOY** (the user's re-publication greenlight) gates W-DEPLOY.
- W-ADOPT is tiny (1 pin + 2 edits): `DeckGate.vue:70` `primary-audacious`→`solid` + DELETE the gray-arm opt-out `deck.css:1013-1023`. The `/underline`→HandMark "break" is a PHANTOM (slides imports zero `/underline`).

### The slides driven-consume (the ONE foreign-tree exception)
slides is the ONE driven consumer (W-SLIDES-DRIVE, SPEC; the deck consume-back is N phase-2 after the glass-ui deck lift lands). slides is enrolled in `constellation.mjs` (`id:"slides"`, line 119) + `proof:lineage-probe` `D6_REQUIRED_CONSUMERS`.

### BC disposition for slides → folds into **`BC.W-CUT`** (EXECUTION-phase only)
**slides is USER-DOMAIN + EXECUTION-phase.** BC is tranche-DEVELOPMENT only (no implementation until greenlight). The slides redeploy is gated on (a) the honest 4.x cut, (b) the deck lift (so slides can consume-back the deck — N phase-2), (c) the user's H-DEPLOY greenlight. **BC must:** record the slides hinge as a W-CUT acceptance clause (the W-ADOPT 1-pin-2-edit + the push held on greenlight) but NOT execute it. The deck-consume-back is blocked on the unbuilt W-DECK.

---

## 6 — fourier-analysis (no outbound asks; clean `^4.0.0` pin)

- `fourier-analysis/web` pins `@mkbabb/glass-ui: ^4.0.0` (on mainline, current). Enrolled in `constellation.mjs` (`id:"fourier-analysis/web"`, line 88).
- **No outbound asks ON glass-ui found** in the fourier docs (no ask-brief, no coordination dir). The BC user-defect ledger's FOURIER item ("totally duplicative — several fourier views → ONE view") is an IN-REPO glass-ui demo-redesign defect (BC.W-FOURIER-ONE, Band 4), NOT a cross-repo ask FROM fourier-analysis.
- The fourier-analysis consume rides the family-caret; it modernizes under W-CONSUMER-MODERNIZE (SPEC) + the W-LEAF-MODERNIZE BEAT-4 latex-paper re-lock (it's one of latex-paper's two dependents).

### BC disposition for fourier → **`BC.W-FOURIER-ASK`** is an IN-REPO demo wave, NOT a cross-repo ask
The fourier asks the user names are all glass-ui's OWN `/substrates/fourier` demo (collapse to ONE view, kill the duplicates). No fourier-analysis-side ask is owed. The fourier-analysis `^4.0.0` consumer bump folds into W-CONSUMER-MODERNIZE at the cut.

---

## 7 — The publish-CI history + the un-closed hinges (the close-class lessons)

### Publish-CI state (from `project_publish_ci_broken.md` + `project_glassui_400_published.md`)
- **CI publish WORKS now.** glass-ui's tag-triggered `release.yml` PUBLISHES cleanly with provenance (`NPM_TOKEN` seeded, `--run release` converged, `--provenance` OIDC, `repository` field). 4.0.0 + 4.0.1 both published via CI on a `v*` tag push. keyframes.js + value.js publish the same model.
- **THE CLOSE-CLASS LESSON (recurring):** the BA cut was declared "complete" on `gates.mjs --run local` which EXCLUDES release-tagged gates → the tag push surfaced a build-blocker (`@mkbabb/pencil-boil` statically imported but optional-peer → `TS2307` on clean `npm ci`) + a stale lockfile + allowlist drift + 5 drifted release-only gates, ONE CI round-trip at a time. **Fix: at the BC cut run `gates.mjs --run full` (the deduped union, W-CLOSE-BATTERY) siblings-absent in a clean worktree BEFORE tagging.** BB already built this: `proof:close-battery-parity` (W-CLOSE-BATTERY complete; `--run full` = 202 gates).

### The un-closed hinges (all USER-DOMAIN, EXECUTION-phase)
1. **The honest 4.x cut** — `W-CLOSE` SPEC. The BB tranche shipped source-green-but-visually-broken; BC repairs it then cuts. This is the cross-repo unblock that gates EVERY consumer adopt.
2. **slides redeploy** — production held DOWN on user greenlight (W-DEPLOY).
3. **The consumer adopt sweep** — Batch 5/6/7 (cross-repo adopt / chronics / close) all `pending`; speedtest/Atlas/value.js/kf/slides/fourier all re-pin + consume-and-delete at the cut.

---

## 8 — The DECIDED BC dispositions (the band-10 wave-set, mapped)

| ask cluster | BC home | BC disposition |
|---|---|---|
| speedtest 9-ask fleet (BorderProgress/Deck/desktop-reserve/spaview/card-tier-alpha + 4 confirms) | **BC.W-SPEEDTEST-ADOPT** | source-complete-in-4.0.1 EXCEPT W-DECK (unbuilt). BC repairs primitives visually → builds W-DECK → cuts 4.x → drives speedtest `^4.x` + the 5-interim consume-and-delete sweep. |
| **W-DECK (the deck lift)** | **BC.W-DECK** (new — the single largest unbuilt cross-repo ask) | BUILD the `/deck` SIBLING subpath (lift `slides/src/deck/`, ~1600 LoC; `useDeck`/`DeckPager`/`useDeckKeyboard` focus-guarded + aria-live + `--spring-deck`=kf springTimingFunction). The donor names itself the donor; `<DeckPager>` composes `PagerDots`' `pagerWindow` (no third re-fork). Unblocks speedtest WV2 + slides consume-back. |
| value.js (sampleColorRamp consume + GradientPane book) | **BC.W-CUT** + consume-clause | re-point `useBorderSpectrum` onto value.js 0.13.0's published `sampleColorRamp` (trigger MET); value.js re-pins at the cut; GradientPane→/easing stays BOOKED. |
| keyframes.js (springTimingFunction/Oscillator/boundary-law + kf-as-consumer) | **BC.W-MOTION-ONE-CLOCK** + W-CUT | all satisfied/affirmed; keep kf's dock-cure contract intact in the dock rebuild; Oscillator loop seam stays booked; kf re-pins at the cut. |
| Atlas (the d6-lineage stranded consumer) | **BC.W-ATLAS-ASK** | keep lineage-probe/constellation GREEN; repair the wide surface the Atlas consumes; at W-CUT drive Atlas `^3.12.0`→`^4.x` + the `:snap-points="[]"`/dock-shim/glass-accent consume-and-delete. Seven-needs all glass-ui-direct + COMPLETE; the adopt is the gap. |
| slides (production held down) | **BC.W-CUT** (EXECUTION-only) | record the W-ADOPT 1-pin-2-edit + the held push as a W-CUT clause; do NOT execute (tranche-dev only); deck consume-back blocked on W-DECK. |
| fourier (no outbound ask) | **BC.W-FOURIER-ONE** (in-repo demo) | the "ONE fourier view" is glass-ui's own demo redesign (Band 4), not a fourier-analysis-side ask; fourier `^4.0.0` bumps under W-CONSUMER-MODERNIZE. |
| dist-css comment fix | **BC.W-DIST-COMMENT-FIX** | ALREADY LANDED at 4.0.1 (commit 2935609d + `proof:dist-css`); BC CONFIRMS + retires the convergence note (not a build wave). |
| the honest 4.x cut | **BC.W-CUT** (EXECUTION-only) | run `--run full` siblings-absent before tag (the close-class lesson); the cut is the cross-repo unblock gating every consumer adopt. |

---

## 9 — The no-silent-drop completeness check (every ask has a terminal disposition)

The `proof:crossrepo-asks` no-silent-drop law is the binding floor. Every ask above carries a TERMINAL disposition: BUILT-in-source / NOT-BUILT (W-DECK) / SATISFIED / AFFIRMED / BOOKED / CONSUME-PENDING / ADOPTION-HELD. **The two genuine GAPS (not just adoption-held):** (1) **W-DECK is the ONE unbuilt cross-repo primitive** — the `/deck` subpath is absent, `useDeck` does not exist, the wave is SPEC; it gates speedtest WV2 + slides consume-back. (2) **The value.js `sampleColorRamp` consume is re-pointable NOW** (0.13.0 published) but glass-ui's `useBorderSpectrum` is still on the `interpolateHue` interim. Everything else is either source-complete-pending-visual-repair (the BC mandate) or adoption-held-on-the-cut. The cross-repo system is COHERENT — no mismatch flagged; the single cut + the consume-and-delete cadence is the unblock.
