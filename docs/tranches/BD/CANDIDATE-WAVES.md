# BD candidate waves — the deduped + merged master list

Every wave below is GENUINE — a real owed item, defect, modernization, or fired-trigger discharge traced to a file:line. Overlapping candidates across the 12 audit dimensions are MERGED (the merge provenance is noted). Each wave carries: band · goal · starting-state (file:line) · rationale · source · the born-RED→GREEN gate + paint-verification sketch.

The audit dimensions: **PvE**=plan-vs-execution · **DF**=deferred-fold · **CRA**=cross-repo-asks · **ARIA**=aria-correction · **PA-a**=pages-audit-a · **PA-b**=pages-audit-b · **PROC**=procedural-animations · **PRE**=precepts-audit · **CMD**=claude-md-coherence.

---

## Band 1 — ARIA conformance (the cut defect)

### BD.W-ARIA-ORIENTATION-GUARD
- **Band:** 1. **Merged from:** ARIA (primary) + CRA (BD.W-ARIA-ORIENTATION-GUARD) + PvE (implicit cut-residue). The ONE merged net-new SFC wave.
- **Goal:** Make `aria-orientation` role-conditional on `SegmentedTabs` — emit it ONLY when the strip renders `role="tablist"` (the `underline` variant), OMIT it on the `role="group"` `pill` default — so the strip stops shipping a WAI-ARIA-prohibited attribute on every default render. Net-new SFC wave (the ONLY wave authorized to touch `SegmentedTabs.vue`; BC.W-TABS-IOS byte-fenced it). Discharges kf-O ASK#2 RE-OPEN; unblocks kf's O.W12 S1-suppression deletion.
- **Starting state:** `src/components/custom/tabs/SegmentedTabs.vue:405` sets `:role="isUnderline ? 'tablist' : 'group'"` (conditional); `:406` sets `:aria-orientation="isVertical ? 'vertical' : 'horizontal'"` (UNCONDITIONAL — the defect, verified at HEAD). `isUnderline`=computed `:141`, `isVertical`=computed `:142`. DEFAULT variant=`pill` (withDefaults `:114-115,121`). In-repo correct precedent: `src/components/custom/pager-dots/PagerDots.vue:124` (`:aria-orientation="pattern === 'group' ? undefined : orientation"` — verified). `scripts/proof-tabs-ios.mjs` T4 (`detectEngineFence`, `:194-250`) is a MARKER-PRESENCE + constant-band fence (asserts `aria-pressed`/`aria-selected`/roving-tabindex/`onStripKeydown` markers + the squish-cap/release constants + the three engine files exist), NOT a content-hash byte-fence (grep for `createHash`/`content-hash`/`sha256` = ZERO); NO orientation-absence clause (grep clean). WAI-ARIA §6.3 / MDN allow-list (verified): used-in {scrollbar,select,separator,slider,tablist,toolbar} + inherits-into {listbox,menu,menubar,radiogroup,tree,treegrid}; `role=group` in NEITHER.
- **The correct edit:** `:aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"` — Vue drops the undefined-bound attr on the pill/group strip, keeps it on the underline/tablist strip (the PagerDots precedent). NOT a role-change (do not route group→radiogroup — that is BB.W-CONTROL-TOKENS's ToggleGroup scope; the pill is DELIBERATELY role=group + aria-pressed). NOT a value-rewrite.
- **Rationale:** `docs/tranches/BC/inbound/KF-O-ARIA-CORRECTION.md` ASK-1′ + ASK-1′-GATE re-open the misidentified BC answer (KF-BC.md:33,38,132 "CONFIRMED EMITTED"). kf's `proof:glassui-aria-ask` is content-aware (mounts published pill, asserts role=group carries `aria-orientation===null`) — a version bump alone does NOT discharge it; the SFC fix must ship in a published cut.
- **Source:** `docs/tranches/BC/inbound/KF-O-ARIA-CORRECTION.md` + `coordination/KF-BC.md:33-43,132` + `inbound/KF-INBOUND.md:13` + MDN aria-orientation allow-list.
- **Gate + paint sketch:** Born-RED gate `proof:aria-orientation` (or a new T-clause in proof:tabs-ios): mount `SegmentedTabs variant=pill`, assert the role=group container `getAttribute('aria-orientation') === null` — FAILS on HEAD (`:406`), GREEN at the fix. + a self-test bite (a synthetic SFC re-introducing the unconditional emit MUST red). + FENCE the underline arm: assert `variant=underline` role=tablist KEEPS aria-orientation matching orientation. **Cross-gate coupling (load-bearing — the truth, NOT a content-hash):** `proof:tabs-ios` T4 is a marker-presence fence, NOT a content-hash, and the one-attribute SFC edit touches NONE of T4's checked markers (`aria-pressed`/`aria-selected`/roving/keydown/the engine constants/the engine files), so T4 stays GREEN by construction — there is NO content-hash to re-snapshot. The only lockstep arm is a DOC reconcile: correct the over-claimed "content-hash assert"/"byte-fenced" language in `KF-BC.md:41,132` to the accurate "marker-presence + constant-band fence" so the next reader does not chase a phantom hash. (Do NOT introduce a content-hash re-snapshot step — it does not exist.) **Paint-π:** ATTRIBUTE readback (getAttribute, not pixel-diff) at /navigation/tabs, both modes: (a) pill/group → no aria-orientation, (b) underline/tablist → aria-orientation present + matches. Zero-pixel-delta wave → per the W-PRUNE-CONSOLIDATE/W-NDA-DECIDE precedent it does NOT earn a proof:ba-gestalt verdict (an attribute readback, not a pixel-diff). **Reconcile at close:** re-open ASK#2 in KF-BC.md from "CONFIRMED EMITTED" to the role-conditional-guard disposition + the shipping version; reconcile asks-and-consumes in lockstep.

---

## Band 2 — Glass material deepening

### BD.W-DEEP-GLASS-20PX
- **Band:** 2. **Source dim:** DF (T6).
- **Goal:** Re-decide and (if budget clears) land the full Apple-nav deep-glass ceiling — push `--glass-blur-deep` 16px→18-20px and `--glass-saturate-deep` 1.5→toward the baked 1.8 ceiling, GATED on a fresh per-frame profile:budget measurement.
- **Starting state:** `src/styles/tokens/glass-deep.css:54` (`--glass-blur-deep-radius: 16px`), `:58` (`--glass-saturate-deep: 1.5`), `:61` (`--glass-saturate-deep-ceiling: 1.8` baked but inactive). BC shipped 16px/1.5; the push was conditionally deferred.
- **Rationale:** `BC.W-GLASS-LEGIBILITY-MEASURED.md:34,67` gated the push on profile:budget clearing + recorded "the full 20px stays booked if the budget bites — no silent over-spend". The user wants iOS-27 increased glass-morphism; apple.com nav (blur 20/sat 1.8) is the live target.
- **Source:** `BC.W-GLASS-LEGIBILITY-MEASURED.md:34,67` + `glass-deep.css:54,58,61` + research/deferral-sweep T6.
- **Gate + paint sketch:** profile:budget is the BINDING gate (backdrop-filter radius = the most expensive idiom). Born-RED: the deep-glass π asserts blur≥18px AND profile:budget per-frame cost UNDER the live ceiling — RED at 16px, GREEN only when both clear. **The recorded conservative fall:** if the budget bites, the full 20px STAYS booked (re-stamp HELD, do not over-spend). **Paint-π:** the .glass-deep surface at the deep route, both modes, the richer refraction visibly reads over the warm-aurora; CLS≈0. proof:ba-gestalt glass/CTA verdict.

### BD.W-GLASS-LENS-CHROMA
- **Band:** 2. **Merged from:** DF (T2 / BD.W-GLASS-CHROMA-RIM) + PROC (BD.W-GLASS-LENS-CHROMA). ONE merged chroma-rim wave.
- **Goal:** Decide and (if it ships, perf-gated) build the chromatic-aberration RGB-split lens rim — the `--glass-lens-chroma` knob (default OFF, 3 per-channel SVG displacement passes) so the lens rim carries the RGB dispersion a real glass edge shows; the booked successor to W-LENSING's monochrome displacement.
- **Starting state:** `src/styles/glass-refract.css:85` (the booked "perceived rim band on a successor re-bake" anchor). CLAUDE.md W-LENSING records "refraction is DEPTH not hue … the chromatic-aberration RGB-split rim is a booked successor". The lens is a single-channel displacement filter; no chroma-rim decision landed in the BC glass band (grep of BC.W-GLASS-LEGIBILITY-MEASURED/BC.W-BUTTON-GLASS-IOS = no T2 decision).
- **Rationale:** T2 BOOKED (BB.W-LENSING R1/R2 TOP-FLOURISH; GL-color seam NOT widened). FOLD-LEDGER routed it to BC.W-GLASS-LEGIBILITY-MEASURED/BC.W-BUTTON-GLASS-IOS to re-decide — but no land/decision is recorded there; it stays an open re-decide owed forward. Shares the dispersion-on-the-rim technique with the goo-blob dispersion (Geeks3D/Maxime Heckel cites).
- **Source:** `glass-refract.css:85` + research/deferral-sweep T2 + DEFERRAL-LEDGER §7 T2.
- **Gate + paint sketch:** RE-DECIDE first — confirm no BC.W-GLASS-LEGIBILITY-MEASURED verdict already closed it. If still booked + perf clears (3 SVG passes is the cost): born-RED proof:glass-chroma asserts the 3 per-channel passes split + the default-OFF no-op floor (chroma=0 byte-matches the monochrome HEAD) + a perf-gate clause. **Paint-π:** the lens-chroma ON reads the RGB dispersion at the rim, OFF byte-matches HEAD, both modes. proof:ba-gestalt glass verdict. If perf bites → re-stamp HELD with the recorded number.

---

## Band 3 — Procedural viz parity + GL-fence tails

### BD.W-VIZ-PARITY-METAL
- **Band:** 3. **Source dim:** PROC (the headline). **Merged note:** subsumes the W-REFLECT3 cross-backend deferral the DF + PROC dims both name.
- **Goal:** Discharge the suite-wide W-REFLECT3 deferral — produce the BINDING real-GPU parity capture-pair for every migrated/born-WebGPU viz: an actual WebGPU swap-chain readback vs a WebGL2 readPixels on real hardware (Metal/dev-box), re-record the EMPIRICAL OKLab ΔE (incl. the real per-GPU `fwidth()` derivative drift on goo-blob/dot-matrix), and replace the structural-proxy rows in gpu-parity-table.md with the live numbers.
- **Starting state:** All five parity records are device-free structural proxies with byte-identical primary==fallback PNGs (verified md5/sha256_16): `docs/tranches/BB/audit/visual/aurora-wgpu-parity/parity-record.json` (deltaE.mean 0, 96×96, methodology "device-free STRUCTURAL proxy — the W-REFLECT3 Metal-GPU capture is the binding live readback"), concentric-parity, goo-blob-wgpu-parity, flow-field-parity, + `docs/tranches/BC/audit/visual/paper-grid-parity/`. gpu-parity-table every note ends "…rides W-REFLECT3".
- **Rationale:** The single biggest owed item. `FINAL.md:23` — every visual wave deferred its binding π to one terminal wave the execution-stop cut. The ΔE bar (mean≤2.0/p99≤5.0) was calibrated against a capture never taken. A WGSL-primary that compiles headless on SwiftShader is NOT proof it matches WebGL2 on real Metal (the goo-blob WGSL shipped broken once — the `var target` reserved-keyword 250×/frame invalid-pipeline).
- **Source:** `docs/tranches/BB/audit/gpu-parity-table.md` + `BC/FINAL.md:23` + DEFERRAL-LEDGER bb-viz-suite-landed/bb-w-reflect3/bb-visual-waves-reflect3.
- **Gate + paint sketch:** This IS the paint wave. Per-viz: real WebGPU readback vs real WebGL2 readback on Metal, OKLab ΔE computed live; the empirical fwidth() drift on goo-blob/dot-matrix may legitimately exceed 0 (the bar accommodates sub-pixel drift; an OETF/alignment error blows past it). proof:gpu-substrate-single's structural-proxy rows REPLACED with the live numbers + the on-disk-resolves anti-evasion floor re-pointed at the real captures. proof:ba-gestalt per-viz verdict on the fresh capture, both modes. **Sequencing:** this runs BEFORE any band-3 wave claims cross-backend parity.

### BD.W-AURORA-WGSL-STROKES
- **Band:** 3. **Source dim:** PROC. **Merged from:** DF (the W-AURORA-WGPU-MEDIUMS-STROKES tail).
- **Goal:** Port the full per-dab Starry-Night STROKE cascade (bestOil/paintOver/StrokeProfile/relight, the ~38KB GLSL engine) to WGSL so `medium:'vangogh'|'oil'|'oil-pastel'` on Safari-26 WebGPU paints the REAL per-dab oil read, not the anisotropic-Kuwahara finish stand-in.
- **Starting state:** `src/components/custom/aurora/constants/shaders/aurora-mediums.wgsl.ts:24-33` (header: the stroke cascade stays the WebGL2 full-fidelity register; in WGSL those three mediums render the Kuwahara finish). The GLSL engine: mediums.glsl.ts (495L) + oil-modes.glsl.ts + vangogh-medium.glsl.ts (258L) + brush.glsl.ts (383L).
- **Rationale:** Booked tail W-AURORA-WGPU-MEDIUMS-STROKES (DEFERRAL-LEDGER T4 / phantom-w-aurora-wgpu-mediums). The §E "WebGPU EVERYWHERE, NO FALLBACKS on Safari" mandate is only partially discharged — a vangogh hero on a WebGPU-only Safari host still gets the smoother Kuwahara read.
- **Source:** `aurora-mediums.wgsl.ts:31-33` + DEFERRAL-LEDGER T4 (line 309) + phantom-w-aurora-wgpu-mediums (line 331).
- **Gate + paint sketch:** GL-fence ABSOLUTE — aurora.frag byte-untouched; the WGSL add matched in lockstep by packAuroraWGPUUniforms or the parity-ΔE blows past the bar. Born-RED proof:aurora-wgsl-strokes asserts the WGSL stroke bodies present + the typed-struct packer parity. **Paint-π:** a vangogh-medium aurora on real WebGPU reads the per-dab brush (not the Kuwahara smooth), captured against the WebGL2 .frag read; the ΔE within bar via BD.W-VIZ-PARITY-METAL's machinery. proof:ba-gestalt aurora verdict.

### BD.W-AURORA-WGSL-CURL
- **Band:** 3. **Source dim:** PROC. **Merged from:** DF (the booked aurora WGSL curl tail).
- **Goal:** Add the `warpMode==3` (Bridson curl-noise) domain-warp branch to aurora.wgsl.ts — splice the already-minted CURL_FBM_WGSL chunk so a `warpMode:'curl'` aurora renders the divergence-free flow warp on WebGPU instead of silently degrading to fbm.
- **Starting state:** `aurora.wgsl.ts:159-184` (`domainWarp()` handles warpMode 0/1/2 only, falls through to fbm; NO `else if (warpMode == 3)` branch). The .frag fallback HAS it (`aurora.frag.ts:290-296`). The WGSL chunk CURL_FBM_WGSL already exists at `src/composables/glass/webgl/shaders/flow.wgsl.ts` (paper-grid is its first consumer).
- **Rationale:** `curl-fbm.md:59-61` — aurora.wgsl stays byte-untouched this cut, degrades curl→fbm; the aurora WGSL curl is the booked tail. The chunk already ships, so this is a mechanical splice — the cross-backend warp-mode parity gap.
- **Source:** `aurora.wgsl.ts:159-184` vs `aurora.frag.ts:290-296` + `docs/consumer-evidence/curl-fbm.md:59-61`.
- **Gate + paint sketch:** Born-RED proof:aurora-curl-warp extends to assert the WGSL warpMode==3 branch present + splices CURL_FBM_WGSL + the default-unchanged fence (warpMode:'fbm' byte-identical). **Paint-π:** a `warpMode:'curl'` aurora on WebGPU reads the curl flow warp (matching the .frag), captured both backends; the default config byte-identical (parity green by construction). proof:ba-gestalt aurora verdict.

### BD.W-AURORA-KUWAHARA-MULTIPASS
- **Band:** 3. **Source dim:** DF (the USER-HINGE). **RISK: USER-HINGE — may be declined.**
- **Goal:** Re-surface (NOT auto-build) the LITERAL multi-pass anisotropic-Kuwahara FBO pipeline (external render-target + Gaussian-smoothed multi-tap structure tensor + FBO-resolve) as a quality uplift over the single-pass procedural Kuwahara BC landed — surface with the live aurora in hand and the user call.
- **Starting state:** `src/components/custom/aurora/constants/shaders/aurora-mediums.wgsl.ts` (the single-pass procedural Kuwahara T4 port landed, no FBO). `BC.W-VIZ-AURORA.md:95` DECIDED-HOLD ("the literal multi-pass FBO pipeline stays a separate future capability with its own consumer + substrate decision — NOT folded here").
- **Rationale:** ay-w-aur-t5-kuwahara USER-HINGE (NEXT-TRANCHE, never user-decided) + the oil/oil-pastel anisotropy/slope residual printed-but-band-not-lowered. The single-pass is sufficient per BC; the multi-pass FBO is the un-decided quality ceiling — needs its OWN consumer + substrate decision.
- **Source:** `BC.W-VIZ-AURORA.md:95` + DEFERRAL-LEDGER ay-w-aur-t5-kuwahara/ay-aurora-arresting-residual-printed/az-aurora-t5-anisotropic.
- **Gate + paint sketch:** A DECISION wave first — surface the live aurora + the FBO-pipeline cost; the user call gates the build. If BUILD: born-RED proof:aurora-kuwahara-multipass asserts the FBO pipeline + the offscreen-pause/PRM discipline preserved (the new FBO must not break invariant 8). **Paint-π:** the multi-pass read vs the single-pass, the no-pinwheel orientation histogram. If DECLINE: re-stamp DECIDED-HOLD with the user verdict recorded (a terminal disposition, not a re-book).

### BD.W-GOOBLOB-SAT-SHADE
- **Band:** 3. **Merged from:** DF (BD.W-GOO-SATELLITE-COLOR) + PROC (BD.W-GOOBLOB-SAT-SHADE). ONE merged per-satellite-shade wave.
- **Goal:** Land the per-satellite derived-shade blob color (uSatColor) — each orbiting satellite carries its own OKLCh-derived shade off the body color, in BOTH backends (the GL color-seam fence widened deliberately).
- **Starting state:** No uSatColor / per-satellite derived-shade uniform in either `src/components/custom/goo-blob/shaders/metaball.wgsl.ts` or `metaball.frag.ts` (grep = 0). `constants.ts:144` + ORBIT_RANDOM_BASE 0.85 carry orbit geometry, no per-satellite color. The shader paints all satellites the body color.
- **Rationale:** Booked tail BA-VJS-5 / C-1 / T15 (DEFERRAL-LEDGER ba-vjs5-satellite-color-4x line 157 + ay-blob-per-satellite-derived-shade line 81): "GL fence NOT widened (arm B)". **The conditional trigger:** "if the WGSL-compile-gate re-touches the shader, widen the fence + discharge the value.js block; else HOLD". Since BD.W-AURORA-WGSL-STROKES + BD.W-GOOBLOB-SQUIRCLE-REFRACT re-touch the shader anyway, **the trigger FIRES** — discharge rather than re-stamp a 5th time. Reads value.js OKLCh (the /color leaf).
- **Source:** `metaball.{wgsl,frag}.ts` (no uSatColor) + DEFERRAL-LEDGER ba-vjs5-satellite-color-4x (line 157) + PROCEDURAL-SUITE.md:102.
- **Gate + paint sketch:** GL-seam widen sanctioned by the re-touch. Born-RED proof:goo-sat-shade asserts uSatColor present in BOTH backends + reads value.js OKLCh (proof:single-color-core stays green — the math source is value.js) + the typed-struct packer parity. **Paint-π:** the CHROMA-keyed satellite shades read distinctly-but-related-to the body hue across an orbit sweep, both modes; the ΔE parity via BD.W-VIZ-PARITY-METAL. proof:ba-gestalt goo verdict.

### BD.W-GOOBLOB-SQUIRCLE-REFRACT
- **Band:** 3. **Source dim:** PROC.
- **Goal:** Switch the goo-blob dome-Z from the spherical sqrt(1-(1-x)²) to Apple's ⁴√(1-(1-x)⁴) squircle bevel (rhyming with the AX.W56 squircle identity), AND attempt the uBackdrop Snell-refraction-through-a-glass-ui-produced-texture (Aurora FBO or baked CSS-gradient sampler) IFF the live blob clears its frame budget — the WWDC-2025 liquid-glass droplet that lenses the backdrop, not the WWDC-2015 self-lit opaque goo.
- **Starting state:** `metaball.frag.ts:180` (`float z = sqrt(max(0.0, 1.0 - (1.0 - interior) * (1.0 - interior)))` — the unit half-sphere; RESEARCH.md:152 names it "the wrong curve" vs Apple's ⁴√). The blob samples NOTHING behind it — `metaball.frag.ts ~497` `fragColor = vec4(rgb*alpha, alpha)` over its own color (RESEARCH.md:141 "the 2025 refraction read is ARCHITECTURALLY absent").
- **Rationale:** Two booked tails: (1) the dome-Z squircle switch (RESEARCH.md:150-153, unconditional + cheap), (2) the uBackdrop Snell refraction (DEFERRAL-LEDGER ay-w-blob-glass-snell line 64 + az-blob-ubackdrop-conditions-unmet line 115: HELD → BC.W-GOOBLOB-MEATBALL only if the live blob clears its frame budget). RESEARCH.md §4.2: the glass-ui escape is a PORTABLE WebGL2 primitive (no DOM-sampling API). With the BC live blob on a rebuilt floor, re-test rather than re-stamp HELD.
- **Source:** `metaball.frag.ts:180` + RESEARCH.md:125-153 (§4.2) + DEFERRAL-LEDGER ay-w-blob-glass-snell/az-blob-ubackdrop-conditions-unmet.
- **Gate + paint sketch:** The squircle switch is unconditional (a re-touch of the shader — coupled with the sat-shade); the refraction arm CONDITIONAL on the frame budget (NOT a DOM-sampling API — samples a glass-ui-produced backdrop texture; one GL/compute context per route preserved). Born-RED proof:goo-squircle asserts the ⁴√ dome-Z in both backends + (if refraction ships) the uBackdrop sampler + the frame-budget clause. **Paint-π:** the droplet reads as a beveled liquid lens (not a self-lit goo), both modes; if refraction shipped, the backdrop visibly lenses through. proof:ba-gestalt goo verdict. If budget bites on refraction → squircle ships, refraction re-stamps HELD.

### BD.W-BLOB-MOTION-TUNE
- **Band:** 3. **Source dim:** DF.
- **Goal:** Surface the blob motion-honesty tunes with the live working blob in hand — the click pulse-zeta underdamp (PULSE_ZETA=0.35 flinches not bounces, no ring-back) and the flick-pseudopod stretch-axis read (~6% within noise): either make the stretch axis genuinely read or honest-down the demo copy.
- **Starting state:** `src/components/custom/goo-blob/constants.ts:132,135` (PULSE_OMEGA=18 / PULSE_ZETA=0.35). DEFERRAL-LEDGER ay-blob-pulse-zeta-bounce (HELD → "a one-constant underdamp tune on the live engine; surface with the working blob") + ay-blob-flick-pseudopod-copy (HELD → "either make the stretch axis read or honest-down the demo copy").
- **Rationale:** Two HELD-with-rationale items explicitly "surface with the working blob, don't re-book blind". BC.W-GOOBLOB-MEATBALL cured the blob-broken base but left these as live-engine refinements gated on the working blob being in hand — the BD condition.
- **Source:** DEFERRAL-LEDGER ay-blob-pulse-zeta-bounce/ay-blob-flick-pseudopod-copy + `constants.ts:132,135`.
- **Gate + paint sketch:** A live-engine tune. Born-RED proof:blob-motion (or extend proof:goo-redress) asserts the chosen pulse-zeta value + the flick-pseudopod decision (read-or-honest-down). **Paint-π:** the click pulse flinch (no ring-back) frame-series + the flick stretch read, both modes. proof:ba-gestalt goo verdict. Either-or per item — if the stretch axis cannot be made to read within budget, the demo copy is honested-down (a recorded decision, not a re-book).

### BD.W-VIZ-COMPUTE-DENSITY
- **Band:** 3. **Merged from:** DF (BD.W-VIZ-COMPUTE-OPTIMIZE) + PROC (BD.W-VIZ-COMPUTE-DENSITY). **GATED — fires only on a real dense-count consumer.**
- **Goal:** Build the GPU spatial-hash compute neighbor-bin path for constellation (O(N) bin instead of CPU all-pairs) AND the analogous fourier compute optimization — the BOOKED dense-register successor that activates ONLY at counts ≫ the overfit default.
- **Starting state:** `constellation/constants.ts:113-114,121` (the GPU spatial-hash compute neighbor-bin is the BOOKED dense-register successor) + `constellationField.ts:259` (overfit at default count=64) + gpu-parity-table constellation note ("compute neighbor-bin BOOKED at N≫256"). fourier migrated to compute+fragment SDF but harmonic density is few-to-dozens. No neighbor-bin kernel in either viz.
- **Rationale:** Named successors W-CONSTELLATION-GPU + W-FOURIER-GPU (PROCEDURAL-SUITE.md:98-101). GATED-not-owed: the all-pairs scan handles count=64 fine; building blind is overfit substrate (J-inv-10). Recorded to satisfy no-silent-drop, NOT to mandate a build.
- **Source:** `constants.ts:113-114,121` + `constellationField.ts:259` + gpu-parity-table + PROCEDURAL-SUITE.md:98-101.
- **Gate + paint sketch:** **TRIGGER-GATED.** Ships ONLY if a real ≥2-binary-consumer or density (N≫256) materializes in BD. If the trigger fires: born-RED proof:viz-compute-density asserts the neighbor-bin kernel + the pure JS math source still transcribed (one math source) + the parity. **Paint-π:** the dense lattice reads (the O(N) path matches the all-pairs read at the dense count). If the trigger does NOT fire: re-stamp HELD-with-rationale (the count that would fire it does not exist) — the correct disposition.

### BD.W-VIZ-FALLBACK-RETIRE-WATCH
- **Band:** 3. **Source dim:** PROC. **WATCH/re-affirm — do NOT delete a fallback.**
- **Goal:** Re-evaluate (NOT execute) the .frag/.glsl WebGL2-fallback retirement — confirm the ~5-10% non-WebGPU tail (Linux Firefox stable, pre-A12 iPhones, flagged Firefox-Android) against the June-2026+ Baseline, re-affirm the fence HOLDS or record the closing trigger. Do NOT delete a fallback this tranche unless the tail demonstrably closed.
- **Starting state:** PROCEDURAL-SUITE.md:104-105 (booked but GATED — forbidden until the tail closes; proof:gpu-substrate-single clause B machine-blocks a premature retirement). Every viz ships both a .wgsl primary AND a .frag/.glsl fallback (aurora.frag.ts 430L, metaball.frag.ts 417L).
- **Rationale:** Named successor + a standing fence. A WATCH/re-affirm candidate — the no-silent-drop discipline requires recording the booked retirement even though the correct disposition is almost certainly HOLD (the tail has not closed). Re-check the Baseline coverage; re-stamp the fence with the current trigger; do NOT silently carry it a 4th tranche.
- **Source:** PROCEDURAL-SUITE.md:104-105 + gpu-parity-table clause B.
- **Gate + paint sketch:** A re-affirm wave (no build, no paint). proof:gpu-substrate-single clause B stays GREEN (the fence holds). The trigger (tail-closed) is re-checked + the disposition re-stamped HELD-with-rationale (almost certain) with the current Baseline number. NO delete — clause B exists to block a premature strand.

---

## Band 4 — Demo PAGES first-half modernization (zero src paint)

### BD.W-PAGE-HEADER-FOLD
- **Band:** 4. **Source dim:** PA-a. **Absorbs:** the former PA-b BD.W-SECTION-HEADER-THREAD (RETIRED — see the band-5 RETIRE note + FOLD-LEDGER Class F). The "disjoint 2-file in-body SECTION header set" the THREAD wave premised is physically false on disk: `data/data-table.vue` + `data/table.vue` carry ONLY their page-identity header (first child of `<StoryPage>`, eyebrow-only, no `<h2>`), so they ARE 2 of THIS wave's 36 — there is NO distinct in-body IconChip-led section-header set. This wave OWNS + extends the StorySectionHeader primitive AND owns the WHOLE dead-mint cure: its 36 folded headers ARE the ≥2 real adopters, and the M9d existence-only → ≥2-real-adopters gate-widen + self-test (the THREAD wave's build) folded into M9e-3.
- **Goal:** Fold the 36-file hand-rolled page-identity header paste onto a single chassis primitive (extend StorySectionHeader.vue to a heading-OPTIONAL shape — the developed spec DECIDES extend-not-sibling, the anti-fork bar), so each forms/containers/navigation/display/feedback/data/compositions page passes :icon/:section/:eyebrow/:blurb and gets the coherent accent-rail + IconChip + tinted eyebrow in ONE composed call.
- **Starting state:** 36 SFCs carry the verbatim inline `<header … borderLeft: '3px solid color-mix(…)'>` + `<IconChip :section bloom reveal>` + `<span class="section-label--tinted text-admin-label">` + `<p class="text-small text-muted-foreground">` paste (`grep -rln "borderLeft:"` = 36, the combined `borderLeft:`+span+IconChip set, VERIFIED; the `section-label--tinted` span-class grep returns 37 but the +1 is `compositions/settings.vue`, whose 4 spans are settings-group labels with NO `<header>`/`<IconChip>` — NOT a page-identity paste; e.g. forms/inputs.vue:24-42, containers/dialog.vue:42-60, display/badge.vue:46-64, … the full 36-file census enumerated in BD.W-PAGE-HEADER-FOLD §2). Chassis home `demo/stories/StorySectionHeader.vue` renders a mandatory `<h2 text-subheading>` heading — the page-header variant is eyebrow-only with NO heading (this wave extends `heading` to optional). Orphan witness: `grep -rln StorySectionHeader demo/stories/**/*.vue` = ZERO real consumers (confirmed).
- **Rationale:** StorySectionHeader.vue's own docstring names this exact debt (the "42nd-paste preventer" for the accent-rail + IconChip + mono-eyebrow shape, storybook-dogfood.md GAP-2). The 36 page-identity headers ARE the 42nd paste, never folded onto the home minted to absorb them.
- **Source:** `demo/stories/StorySectionHeader.vue` (orphan + docstring) + the 36 paste sites + BC.W-STORYBOOK-META / storybook-dogfood.md GAP-2.
- **Gate + paint sketch:** **PH3-SAFE FENCE (load-bearing):** the fold must NOT re-introduce a redundant page-title `<h2>` (BC.W-PAGE-HIERARCHY PH3 forbids a body-level page-title restatement; every paste comment says "PH3-safe (inline borderLeft, not the double-header shape)"). The reconcile: extend the primitive's heading to OPTIONAL, or mint an eyebrow-only StoryPageHeader sibling. Clean break — every inline-borderLeft `<header>` DELETED at the call site, no dual path. Born-RED gate (extend proof:storybook-meta or a new clause): assert ≥2 real adopters of the page-header primitive + zero surviving inline-borderLeft paste in the enrolled set + PH3-safety (no body page-title `<h2>`). **Paint-π:** the folded header reads identically over the page wash, both modes; proof:ba-gestalt per-pane verdict (the demo panes joined the roster). Zero src paint (demo-private).

### BD.W-PAGE-OFFTOKEN-SWEEP
- **Band:** 4. **Source dim:** PA-a.
- **Goal:** Re-point the residual off-token Tailwind colors on viz-basis fills to the warm-cream identity — replace `text-white`/`text-zinc-900` over `bg-viz-*`/`--motion-accent` plates with `text-foreground` (or the correct on-tone foreground token).
- **Starting state:** `foundations/motion.vue:133` (`text-white` over `bg-[var(--motion-accent)]`); `display/buttons.vue:156` (`text-zinc-900`); `display/badge.vue:38-40` (`bg-viz-fourier text-white` ×3) + `:74` (`text-white` on section-color tone badges). All off-token raw Tailwind over brand-hue plates.
- **Rationale:** The warm-cream identity wants the foreground token, never raw white/zinc (the stray-blue idiom-adherence sweep). css-utilities.vue shows the corrected pattern (re-pointed onto --section-color-N). These 6 sites are the residual the sweep missed — a label-legibility + identity defect on real painted surfaces.
- **Source:** CLAUDE.md §Conventions (warm-chroma floor) + foundations/colors.vue D6 fence + the grep cluster.
- **Gate + paint sketch:** **ONE-COLOR-EVENT FENCE:** re-pointing text-white→text-foreground is identity-RESTORING, NOT a new event (the viz-basis FILL stays the single event; body ink untinted; proof:suffuse d1-d3 stays green). Born-RED: assert zero `text-white`/`text-zinc-*` over a brand-hue plate in the enrolled set + a self-test bite. **Paint-π:** the label legibility over the viz fill, both modes; proof:ba-gestalt per-pane.

### BD.W-TOKEN-TOUR-GLASS
- **Band:** 4. **Source dim:** PA-a.
- **Goal:** Modernize the token-tour swatch panes (radii/shadows/section/pulse/motion/separator) to compose ShowcaseFrame or `<Card>` for specimen hosts and consume the BC liquid-glass band primitives (deep-glass, lensing, glass-accent) where a swatch legitimately demos a glass surface — retiring the raw `<div bg-card border bg-card shadow-cartoon>` + hand-rolled `<table>` triplets.
- **Starting state:** foundations/radii.vue:42-49,67-74 (raw swatch divs), shadows.vue:43-50, motion.vue:85-100 (`<table>`) + :108-115, display/section.vue:28,51, pulse.vue:61, status-dot.vue:25,60. None compose ShowcaseFrame (the chassis home for the idiom, "replaces ~25-30 sites" per its docstring).
- **Rationale:** ShowcaseFrame's docstring names the ~25-30 un-folded sites. Separately, the newest BC liquid-glass band (deep-glass/lensing/glass-accent/liquid-hover) is NOT demonstrated on the foundations/display token pages — the demo-consumer role is owed a deeper consumption so the storybook shows the band it shipped.
- **Source:** `ShowcaseFrame.vue` docstring + CLAUDE.md §W-DEEP-GLASS/W-LENSING/W-GLASS-ACCENT/W-LIQUIDHOVER + the raw-triplet grep.
- **Gate + paint sketch:** **ONE-GL-PER-ROUTE FENCE:** foundations/display are static-wash routes (paper/grid) — the deep-glass/lensing demo is a CSS-surface demo, GL-FREE (reads over the static paper/grid wash via ShowcaseFrame tier=field; NOT a second aurora). Born-RED: assert the swatch panes compose ShowcaseFrame/`<Card>` + the glass-band demo present + zero raw-triplet in the enrolled set. **Paint-π:** the glass-band swatches read over the static wash, both modes; proof:ba-gestalt per-pane.

### BD.W-TOC-MENU-GLASS
- **Band:** 4. **Source dim:** PA-a.
- **Goal:** Re-point navigation/toc-tracking.vue's ToC sidebar + scroll-document chrome onto the shipped glass/menu register — replace the `.themed-card` local class + raw `bg-primary/10`/`hover:bg-muted/50`/`text-sm`/`text-xs` rows with `.glass-menu-row` / the glass-tier register (and the `--on-glass-muted` foreground rung).
- **Starting state:** `toc-tracking.vue:125` (`.themed-card` — the only consumer storybook-wide), `:131-136,145-149` (raw ToC button rows `bg-primary/10`/`hover:bg-muted/50`), `:160-188` (raw `text-lg`/`text-sm`/`text-xs`).
- **Rationale:** BA.W-MENU-GLASS canonized `.glass-menu-row` (every menu/picker item reads as glass-quiet hover-lift, NOT flat bg-accent). A ToC nav is the canonical menu-row consumer, yet this page hand-rolls bg-primary/10 + a bespoke `.themed-card` orphan — the un-modernized last navigation page.
- **Source:** CLAUDE.md §Menu glass register + `toc-tracking.vue:125,131-149,160-188`.
- **Gate + paint sketch:** Clean break — `.themed-card` RETIRED, no alias. Born-RED: assert the ToC rows compose `.glass-menu-row` + zero `.themed-card`/`bg-primary/10` flat fill in the page. **Paint-π:** the ToC rows read as glass-quiet hover-lift plates, both modes; proof:ba-gestalt navigation verdict.

### BD.W-FORMS-CARD-FOLD
- **Band:** 4. **Source dim:** PA-a.
- **Goal:** Fold the residual hand-rolled card/section wrappers inside the forms + dialog bodies onto `<Card>` / ShowcaseFrame — the switch-row, confirm-card, and grouped-section blocks still pasting `rounded-card border bg-card p-N` (and dialog.vue:122's raw `rounded-2xl`).
- **Starting state:** `forms/label.vue:67` (`rounded-card border bg-card p-4` switch row), forms/multi-select.vue (raw triplet), `containers/dialog.vue:122` (`rounded-2xl border bg-card p-6` confirm-card — raw `rounded-2xl` off the `--radius-card` alias).
- **Rationale:** Same `rounded-card border bg-card` idiom ShowcaseFrame/`<Card>` own, un-folded — dialog.vue:122 even uses a raw `rounded-2xl` off the semantic alias. Smaller surface than the swatch fold, same component-over-class discipline (Design Axis 2).
- **Source:** `ShowcaseFrame.vue` docstring + forms/label.vue:67, multi-select.vue, dialog.vue:122 + CLAUDE.md Design Axis 2.
- **Gate + paint sketch:** Clean re-point, no alias. Born-RED: assert the enrolled forms/dialog bodies compose `<Card>`/ShowcaseFrame + zero raw `rounded-2xl`/`rounded-card border bg-card` triplet. **Paint-π:** the folded surfaces read identically, both modes; proof:ba-gestalt per-pane.

---

## Band 5 — Demo PAGES second-half modernization (the data-band drain)

### BD.W-DATA-BAND-GLASS
- **Band:** 5. **Source dim:** PA-b.
- **Goal:** Drain the M9A raw-triplet baseline's data-band slice to ∅ — re-thread the 12-of-14 data stories' opaque `rounded-card border bg-card shadow-cartoon` body plates onto `<ShowcaseFrame>` (tier=field for live-glass demos / resting|quiet for opaque-atom specimens) or the `<Card>` glass tier, so the data band reads as warm-cream glass over the per-route field, not gray slabs on charcoal (the AX.W54 glass-first + BG-2 black-plate fix finally reach the data band).
- **Starting state:** data/timeline.vue:56,112 + data-table.vue:193 + timeline-continuous.vue:148,244 + timeline-segmented.vue:139,212 + avatar.vue:81,117 + sortable-list.vue:100,135,169 + table.vue:77,129 + infinite-scroll.vue:89 + virtual-section.vue:102 + metric-stack.vue:66,81 + metric-cell.vue:164,188 + search.vue:248,316. ZERO data stories import ShowcaseFrame; the 12 are the M9A_BASELINE data slice (`scripts/proof-storybook-meta.mjs:269-280`).
- **Rationale:** Discharges idiom-audit §2 M9A residual routed to BC.W-PAGE-PRUNE/HIERARCHY (those shipped but never drained the data band). "The baseline shrinks as the page bands re-thread; it never grows" — BD is the re-thread band. Mirrors W-CARVE4/5 ratchet-to-∅.
- **Source:** `idiom-audit.md §2` (M9a data band) + `proof-storybook-meta.mjs:259-292`.
- **Gate + paint sketch:** **OPAQUE-ATOM ALLOWLIST FENCE:** avatar/table/data-table host opaque-allowlist atoms — use tier=resting|quiet for genuine opaque specimens, tier=field ONLY where the demo shows glassiness (the BG-2 fix is for glass-over-plate occlusion, not legitimately-opaque atoms). **ONE-GL-PER-ROUTE:** data routes inherit the static grid wash; tier=field drops the opaque plate so the existing wash reads through — does NOT stage new GL. **RATCHET LOCKSTEP:** drained files LEAVE M9A_BASELINE (`:267-280`) — never a stale-grandfather. Born-RED: assert the data-band M9A slice = ∅ in the baseline + the re-threaded files compose the glass register. **Paint-π:** the data band reads warm-cream glass over the grid wash, both modes; proof:ba-gestalt data-band verdict (the BB-disease this kills — paint-verify on :5199, not gate-alone).

### BD.W-DATA-BAND-HEADINGS
- **Band:** 5. **Source dim:** PA-b.
- **Goal:** Migrate the 6 data stories still hand-rolling raw `text-admin-label` section headers onto the canonical `<StorySection heading>` rung (the 20.4px text-subheading register).
- **Starting state:** data/timeline.vue:51,111 (raw `<p class="text-admin-label …">`) + 5 more (data band: 7/14 use StorySection, 6 hand-roll). BC.W-PAGE-HIERARCHY migrated ~90 headings storybook-wide but the data band's body section headers were not fully swept.
- **Rationale:** Discharges az-hierarchy-library-wide-migration (the enrolled-set gate prevents regression but the data band's raw headers slipped the set) + GAP-6. The data band is the lone outlier (other 5 bands 10-11/12 migrated).
- **Source:** DEFERRAL-LEDGER az-hierarchy-library-wide-migration + storybook-dogfood.md GAP-6 + the per-band survey.
- **Gate + paint sketch:** Born-RED: extend the StorySection enrolled set to the 6 data stragglers; assert zero raw `text-admin-label` section header in the data band. **Paint-π:** the data-band section headings read at the canonical rung, both modes; proof:ba-gestalt data-band.

**(RETIRED) BD.W-SECTION-HEADER-THREAD → folded into BD.W-PAGE-HEADER-FOLD (Band 4).**
This candidate (PA-b, "the dead-mint cure, library-wide") was RETIRED — not a standing wave, no spec file on disk (the wave count drops 44→43). The disk truth (VERIFIED by reading): the EXACTLY 2 files it claimed as DISTINCT in-body IconChip-led section headers — `data/data-table.vue:159-178` + `data/table.vue:51-70` — carry ONLY their page-identity header (the first child of `<StoryPage>`, eyebrow-only, NO `<h2>`; the heading "Repositories" at `data-table.vue:185` is a SEPARATE `<StorySection heading>`). So those 2 ARE 2 of BD.W-PAGE-HEADER-FOLD's 36 page-identity headers — the "DISJOINT paste-sets" premise is physically false, and the THREAD wave's ≥2-adopter floor has NO consumers outside PAGE-HEADER-FOLD's set. The two multi-header files (`compositions/settings.vue` 4 spans, `feedback/progress.vue` 2 spans) are NOT a substitute set — settings.vue's spans are plain settings-group labels (no IconChip, no accent-rail; settings.vue is the 37th `section-label--tinted` span grep match but carries NO inline-borderLeft header, so it is NOT in PAGE-HEADER-FOLD's 36-file paste set either), progress.vue's 2nd span is a BorderProgress caption — neither is an IconChip-led section header. The cure: the dead-mint's ≥2-real-adopters M9d gate-widen + its 0/1-adopter self-test bite folded into BD.W-PAGE-HEADER-FOLD's M9e-3, which discharges the J-inv-10 substrate-without-consumer floor with its 36 real adopters. FOLD-LEDGER Class F carries the RETIRE-rationale row (no silent drop). The two waves did NOT touch disjoint paste-sets — they were a double-claim of the same DOM node with contradictory heading-absent (M9e-4) vs heading-present (M9d) gate arms; the merge resolves the ownership to ONE wave.

### BD.W-DATA-SUFFUSE
- **Band:** 5. **Source dim:** PA-b.
- **Goal:** Thread the per-section `--section-color-9` data-band identity COLOR EVENT (tinted eyebrow + border-left accent rail + focal IconChip, the BC.W-SUFFUSE-reconcile shape) across the 12 data stories carrying zero identity event — so the whole data band reads with the ONE coherent color event per surface, matching the feedback band's --section-color-8 ruby.
- **Starting state:** Only 2/14 data stories carry the event (data-table.vue:15-18,162-178 + table.vue with DATA_STOP=9); the other 12 (avatar, infinite-scroll, metric-cell, metric-stack, scrolling-text, search, sortable-list, tags-input, timeline×3, virtual-section) = identity-event 0. The feedback band (BB.W-SUFFUSE3, --section-color-8) is the model — all 6 carry it.
- **Rationale:** Discharges ba-icon-pops-w60-breadth / az-suffuse-library-wide for the data band specifically. The proportion fence is respected — the band's identity is the named per-category hue BC.W-SUFFUSE-reconcile already wired for 2 stories; this completes the band, never a four-hue rainbow.
- **Source:** DEFERRAL-LEDGER ba-icon-pops-w60-breadth + az-suffuse-library-wide-w60 + data-table.vue:13-18 DATA_STOP precedent.
- **Gate + paint sketch:** **PROPORTION FENCE:** ONE color event per surface (chip+rail+eyebrow in ONE hue, body ink untinted) — proof:suffuse d1-d3 stays GREEN; a legitimately-documentary route earns no event. **PRESETS-IN-CONSUMERS:** the identity reads the LIBRARY section ramp, never a hand-rolled raw-Tailwind chromatic utility (M7 stray-blue stays closed). Born-RED: extend proof:suffuse's data-band LEDGER to the 12 stories. **Paint-π:** the data band reads the --section-color-9 event coherently, both modes; proof:ba-gestalt data-band.

### BD.W-MISSED-SLAB-CENSUS
- **Band:** 5. **Source dim:** PA-b. **BUILDS (the gate-regex widen).**
- **Goal:** Close the two raw-opaque-slab census ESCAPES the M9A TRIPLET_RE misses — re-thread data/scrolling-text.vue's `rounded-md border bg-card` and data/tags-input.vue's `bg-card shadow-cartoon-sm` slabs onto the glass register, AND widen the M9A detector to catch the rounded-md + shadow-cartoon-sm variants so a future agent cannot smuggle a dated plate past the regex gap.
- **Starting state:** `scrolling-text.vue:65,87,101` (`rounded-md border bg-card` — rounded-md off TRIPLET_RE at `proof-storybook-meta.mjs:264`), `tags-input.vue:49,78,103` (`bg-card shadow-cartoon-sm` — off the regex). Neither in M9A_BASELINE (`:267-292`) — genuinely uncaught dated plates.
- **Rationale:** The M9A regex misses `rounded-md` slabs + `shadow-cartoon-sm` — the anti-gameability floor (the gate's stated purpose) has a hole. Closing it makes the ratchet honest.
- **Source:** `proof-storybook-meta.mjs:264` (TRIPLET_RE) + the grep finding.
- **Gate + paint sketch:** A BUILD wave (src/scripts edit — the gate widen). Born-RED: the widened TRIPLET_RE catches rounded-md + shadow-cartoon-sm; a self-test bite (a synthetic rounded-md+bg-card slab must red). + the two files re-threaded onto the glass register. **Paint-π:** the two re-threaded data stories read as glass, both modes; proof:ba-gestalt data-band.

### BD.W-DATA-RAW-BUTTONS
- **Band:** 5. **Source dim:** PA-b.
- **Goal:** Drain the M9B raw-`<button>` baseline's data-band slice — re-thread the raw `<button>` controls in data/infinite-scroll.vue, timeline-continuous.vue, timeline-segmented.vue, virtual-section.vue onto the shipped glass `<Button>` (the GAP-4 dogfood fix).
- **Starting state:** M9B_BASELINE (`proof-storybook-meta.mjs:330-333`) enumerates exactly these 4 as raw-button residuals routed to the page bands. idiom-audit §2 M9b names them.
- **Rationale:** Discharges idiom-audit §2 M9b data-band residual ("compose the glass `<Button>`") — routed to the RE-THREAD slice, never executed for the data band. Distinct from the dock control-pane raw buttons (allowlisted-by-design bespoke dock affordances, correctly KEPT).
- **Source:** `idiom-audit.md §2` (M9b data band) + `proof-storybook-meta.mjs:326-347`.
- **Gate + paint sketch:** **RATCHET LOCKSTEP:** drained files LEAVE M9B_BASELINE. Born-RED: the data-band M9B slice = ∅ + the controls compose `<Button>`. **Paint-π:** the load-more/jump controls present as glass buttons, both modes; proof:ba-gestalt data-band.

---

## Band 6 — Precept canon

### BD.W-CLOSE-DISCIPLINE-CANON
- **Band:** 6. **Source dim:** PRE.
- **Goal:** Canonize the CI-accurate close discipline as a precept edict in `instructions/tranche/SPEC.md §Close` (+ a LESSONS entry): the close runs `gates.mjs --run full` in a CLEAN CHECKOUT with siblings AND the docs/precepts submodule ABSENT (the real release.yml-runner condition) BEFORE the irreversible tag, never `--run local` (ci ⊂ local masks reds), never submodule-synced (not CI-accurate). Records the three close-time bug CLASSES the all-green cut surfaces: (1) meta-gate self-recursion (gate-manifest-sound spawns `--run local` unboundedly — needs a NESTED env guard); (2) a doc gate reading a private submodule the CI runner cannot init (empty dir → hard-RED — needs the existsSync&&readdir-length skip ONLY on the submodule-reading clause); (3) a volatile tracked artefact dirties the tree → CLEAN-TREE false-RED (gitignore it).
- **Starting state:** `docs/precepts/instructions/tranche/SPEC.md:188-230 §Close` (has the ι integrity-sweep + π lane, NO CI-accurate full-battery-clean-checkout discipline); LESSONS-LEARNED.md last entry 2026-06-10/AY (line 628), zero BB/BC; the lessons live only in glass-ui commits ae3e64e5/9c0e06e2/a021439a; CLAUDE.md BB.W-CLOSE-BATTERY is glass-ui-local, not a precept.
- **Rationale:** The BC cut's most expensive lessons (the irreversible-tag close-time gate-infrastructure bugs + the submodule-absent discipline) are uncanonized; "codification without a gate is necessary-but-not-sufficient" AND its converse — an expensive incident with NO codification WILL recur.
- **Source:** glass-ui commits 9c0e06e2/ae3e64e5/a021439a + `proof-gate-manifest-sound.mjs` + SPEC.md §Close + LESSONS-LEARNED.md.
- **Gate + paint sketch:** **SUBMODULE-COMMIT FENCE:** docs/precepts is a SEPARATE git submodule (clean at c9950089) — the edit is a COMMIT IN THE SUBMODULE + a pointer bump, both EXPECTED (named in the BD plan; the ι integrity-sweep HALTS on an unattributed submodule change). Agents read-only on git; the orchestrator owns the submodule commit + bump. **The canon must NAME the gate/ceremony seam** that makes it load-bearing (the close ceremony invokes it — Q-chron-3: codification without a gate is insufficient). **CI-accurate verify:** the canon itself is verified under CI=true + fresh worktree + submodule ABSENT (a synced local pass is the false-green this kills). Doc-only (no paint, no proof:ba-gestalt).

### BD.W-SUBMODULE-SKIP-POLICY
- **Band:** 6. **Source dim:** PRE.
- **Goal:** Canonize the absent-private-submodule skip-by-policy CONVENTION as a binding gate-authoring rule (`instructions/ORCHESTRATION.md` or a new precept section): a gate clause reading `docs/precepts/*` MUST gate ONLY that clause behind `existsSync(preceptsDir)&&readdirSync(preceptsDir).length>0` → SKIP-BY-POLICY when absent (CI), bite when present (local); every NON-submodule clause keeps biting in BOTH. Record the rule so the NEXT precept-reading gate is authored with the skip from birth.
- **Starting state:** `proof-phase-palette.mjs:101-105` (the comment), `:230` (SKIP-BY-POLICY emit), `:339-342` (submodulePresent check); threaded into proof-precept-current/motion-one-clock/tunable-anim/affordance-map/easing-primitive at 9c0e06e2; NO precept names the convention — only 6 parallel implementations.
- **Rationale:** Six doc gates hard-RED on the v4.1.0 release.yml run because the private submodule cannot init — a class that recurs for EVERY future precept-reading gate unless the authoring convention is canon. The fix is the established convention (proof:colocation already has it) but never written as a rule.
- **Source:** glass-ui commit 9c0e06e2 + `proof-phase-palette.mjs:101-105,230,339-342`.
- **Gate + paint sketch:** **NARROW-CLAUSE-ONLY FENCE:** the guard gates ONLY the submodule-reading clause; every NON-submodule clause KEEPS biting under CI ("No weakening" — never an early gate-wide return masking real src reds). Doc-only canon + (optionally) a self-test that a synthetic gate-wide-skip is forbidden. Submodule-commit fence as BD.W-CLOSE-DISCIPLINE-CANON.

### BD.W-LIVE-ARM-CI-GRACE-CANON
- **Band:** 6. **Source dim:** PRE.
- **Goal:** Canonize the `liveArmCiGraceSkip()` π-arm CI-grace-skip pattern as a precept (extend `gestalt-first-capture.md` P5 or SPEC.md §π-lane): a ['local']-tagged live-π gate's REAL-BROWSER arm must grace-SKIP under CI (process.env.CI set) via the ONE single-source helper, and still run + hard-RED locally. The binding CI proof is the device-free union + the captured DELTA backstopped by proof:live-verified-ledger + the proof:ba-gestalt verdict (CI proves ENROLLMENT, the local close proves the PAINT).
- **Starting state:** `scripts/gate-output.mjs:64-91` (the liveArmCiGraceSkip docstring + impl, returns Boolean(process.env.CI)); 27 live-π [local] gates threaded it at a021439a; gestalt-first-capture.md P5 (`:59-65`) names the CI-ENROLLMENT/local-PAINT split but NOT the CI-grace-SKIP arm mechanism; no precept names the helper.
- **Rationale:** 27 live-π gates lacked the guard the dock trio had and ran+failed under CI=true --run full on a dev box carrying Playwright — the second-largest cut-blocker class. The pattern is the cardinal-lesson split (half-canonized in P5) but the gate-side grace-skip MECHANISM is not written down.
- **Source:** glass-ui commit a021439a + `gate-output.mjs:64-91` + `gestalt-first-capture.md:59-65`.
- **Gate + paint sketch:** **NARROW-ARM FENCE:** the grace-skip governs ONLY the live real-browser arm of a ['local'] gate, NEVER the device-free or ci/release-tagged arms (`gate-output.mjs:86-87`). The canon must NAME the single-source helper seam. Doc-only canon; CI-accurate verify (CI=true). No paint.

### BD.W-HOMEMAP-RESYNC
- **Band:** 6. **Source dim:** PRE. **BUILDS (the gate widen).**
- **Goal:** Resync `design-idioms.md §3` home-map onto the BC src/styles reality AND widen proof:precept-current W2 to catch non-top-level shared-register partials. Add §3 rows for the unhomed BC/BB registers: utilities/metal.css (brand-metal SHARED register, ≥2 consumers incl. completion-seal — BB.W-METAL-SHIMMER), glass/accent-tone.css (3-channel tonal-accent SHARED register — BC.W-ACCENT-TONE), border-progress.css, completion-seal.css, dock/cta-seat.css. Add a `utilities/*.css` home-map glob row (mirroring glass/*.css) so W3 resolves it, and widen W2 (proof-precept-current.mjs) to scan utilities/ + glass/ sub-partials for self-tagged shared registers, not only top-level index.css imports.
- **Starting state:** `design-idioms.md:87-99 §3` (last refreshed BB 2f316c9); MISSING: utilities/metal.css, glass/accent-tone.css, completion-seal.css, border-progress.css, dock/cta-seat.css (grep-confirmed absent). `proof-precept-current.mjs:243-263` W2 (`isSharedRegisterPartial` scans ONLY topLevelImports(indexSrc) — metal.css under utilities/, accent-tone under glass/ invisible to it).
- **Rationale:** design-idioms.md is the BINDING idiom-home (L inv-16) + the §3 home-map is the doc-drift surface proof:precept-current locks, but its W2 top-level-only gap let BC's registers land un-homed — the exact failure the gate's header describes, recurring one level down the tree.
- **Source:** `design-idioms.md:87-99` + `proof-precept-current.mjs:243-263` + `utilities/metal.css:1-8` + `glass/accent-tone.css:1-6`.
- **Gate + paint sketch:** **ROW-SHAPE FENCE:** metal.css + accent-tone.css are SHARED registers (own cohesion-domain row + cascade-position note per §3:121-133); completion-seal/border-progress/cta-seat are COMPONENT-FAMILY partials (fold into the component row) — place each in the CORRECT class, never lump. **GATE-CODE WAVE:** widening W2 is a src/scripts edit (BUILDS, not pure doc) — the §3 row must match the gate's parse shape (`| domain | src/styles/<file> | examples |`, `:104-152`); the synthetic-stale §3 self-test (`:294-300`) stays GREEN. Born-RED: W2 now scans utilities/+glass/ sub-partials; a synthetic un-homed utilities/ register reds. Submodule-commit fence (the §3 doc half) + a src half (the gate). No paint.

### BD.W-PRECEPTS-README-FRESHEN
- **Band:** 6. **Source dim:** PRE.
- **Goal:** Freshen `docs/precepts/README.md §Layout` + `instructions/README.md` so the standing-doc index matches the BC-landed precept set: motion-canon.md is now (P1-P7) not (P1-P6); add affordance-map.md (BC.W-AFFORDANCE-MAP), tunable-anim.md, and instructions/gestalt-first-capture.md to the Layout tree. Optionally lock the README↔file-set parity with a thin proof:precepts-index gate (the precept-current precedent).
- **Starting state:** `README.md §Layout` lists motion-canon.md "(P1-P6)" + omits affordance-map.md / tunable-anim.md / instructions/gestalt-first-capture.md; motion-canon.md goes through `## P7` (`:134`); all three precepts present on disk (BC-dated), none in the README.
- **Rationale:** The README is the entry-point index a fresh agent reads at tranche open; a stale index means the BC-landed binding precepts are discoverable only by directory-listing, and "(P1-P6)" misrepresents the canon (P7 ONE-source-ONE-clock is load-bearing, read by proof:motion-one-clock).
- **Source:** `README.md §Layout` + `motion-canon.md:134` + affordance-map.md/tunable-anim.md/gestalt-first-capture.md.
- **Gate + paint sketch:** Doc-only (submodule commit). If the proof:precepts-index gate ships (optional BUILD): born-RED asserts every precept file is README-indexed; a synthetic un-indexed file reds. No paint.

### BD.W-LESSONS-BB-BC-BACKFILL
- **Band:** 6. **Source dim:** PRE.
- **Goal:** Backfill `instructions/LESSONS-LEARNED.md` with the BB+BC incident ledger (stops at AY — zero BB/BC entries despite two tranches). Each lesson follows Source/Failure/Rule/Check: (a) the BC all-green-cut gate-infrastructure class (recursion guard / submodule-skip / volatile-tracked-artefact / live-arm-CI-grace — cross-referenced to BD.W-CLOSE-DISCIPLINE-CANON); (b) the BB single-terminal-reflect deferral disease (48 specs deferred π to one W-REFLECT3 the stop cut, 65 DELTAs zero verdicts-flipped — canonized as the gestalt-first PRECEPT but absent from the LEDGER); (c) any BB-class lesson the precept doesn't cover.
- **Starting state:** `LESSONS-LEARNED.md:628` (last entry 2026-06-10/AY); `grep -c 'BC\.'` = 0; the BB-disease is a PRECEPT (gestalt-first-capture.md:3-8) but has no LEDGER row; the BC cut-bugs have neither.
- **Rationale:** LESSONS-LEARNED.md is the cross-tranche incident ledger — its purpose is the at-tranche-open read of what bit before. Two tranches of incidents missing. The BB deferral-disease is the most destructive incident in project history yet has no ledger row; a planner opening BD reads a ledger that pretends nothing happened after AY.
- **Source:** `LESSONS-LEARNED.md:628` + `gestalt-first-capture.md:3-8` + glass-ui commits ae3e64e5/a021439a/9c0e06e2.
- **Gate + paint sketch:** Doc-only (submodule commit). Each lesson NAMES the gate/check that makes it load-bearing (cross-referenced to the band-6 canon waves). No paint.

---

## Band 7 — CLAUDE.md coherence

### BD.W-DOC-COUNT-SYNC
- **Band:** 7. **Source dim:** CMD. **BUILDS (the gate widen).**
- **Goal:** Re-sync every numeric structure claim in CLAUDE.md to disk AND extend proof:claude-structure-sync to cover the ui/-dir count, the JS-subpath count, and the composables-sub-tree count (currently only the custom/ block is guarded), so these cannot silently drift again.
- **Starting state:** CLAUDE.md:54 "ui/ … 42 dirs total" (disk=43 — drawer/+focus-scope/ present, VERIFIED); :420 "68 flat JS subpaths / 73 entries total / 72 JS subpath exports" (package.json=**89** JS subpaths, 96 export keys — VERIFIED: 96 keys − 1 `./` root − 6 CSS/font = 89, the gate-canonical `jsSubpathExports()` count); :915+:935 "76-entry per-subpath split" (×2, →89); :164 "9 coherent sub-trees" + :198 "re-exports all 8 sub-trees" (disk composables/=11 — VERIFIED). `proof-claude-structure-sync.mjs` parses only the custom/ block; `proof-subpath-enumeration.mjs` never reads CLAUDE.md.
- **Rationale:** No-silent-drop / structure-ledger coherence: the BC cut shipped 2 new ui/ dirs, ~21 new subpaths, 2 new composables sub-trees, and every prose count trails. The custom/ count (49) is correct ONLY because BA.W-HYGIENE built a gate; the parallel counts have none and have drifted by 1 / 18+ / 2.
- **Source:** CLAUDE.md:54,164,198,420,915,935 + package.json exports + ls counts + `proof-claude-structure-sync.mjs`.
- **Gate + paint sketch:** **DERIVED-NOT-FROZEN FENCE:** the gate extension must preserve the DERIVED-vs-actual discipline (re-sync, never freeze-a-literal — else it greens a frozen number); mirror the gate's header spec (`:12-22`) + the exact tree-prefix parse. Born-RED: the extended gate asserts ui-count + subpath-count + composables-tree-count match disk; a synthetic drift reds. No paint (doc + gate, BB inv-4 no-op-on-paint).

### BD.W-VIRTUAL-RESHIP-RECONCILE
- **Band:** 7. **Source dim:** CMD.
- **Goal:** Resolve the /virtual RETIRED-vs-reshipped CONTRADICTION + the /pager subpath-name mismatch: reconcile CLAUDE.md:422 (says /virtual retired at L.W3) with :196 (the BC.W-VIRTUAL-WINDOW homecoming) + the live ./virtual export; correct :144 "subpath /pager" to the real export ./pager-dots.
- **Starting state:** CLAUDE.md:422 "the /pagination and /virtual subpaths were RETIRED at L.W3" — directly contradicts :196 (BC.W-VIRTUAL-WINDOW the /virtual HOMECOMING) + package.json `./virtual` (present, VERIFIED). :144 names "subpath /pager" but package.json has `./pager-dots` and no `./pager` (VERIFIED).
- **Rationale:** A direct contradiction between two sections of the same doc is the worst coherence failure — a planner reading :422 concludes /virtual is dead while it is a live BC headline. Traces to BC.W-VIRTUAL-WINDOW updating :196 but never reconciling :422 or the /pager naming.
- **Source:** CLAUDE.md:144,196,422 + BC.W-VIRTUAL-WINDOW.md + package.json exports (./virtual present, ./pager absent, ./pager-dots present).
- **Gate + paint sketch:** Doc-only. Born-RED (optional, fold into proof:claude-structure-sync or proof:subpath-enumeration): assert no CLAUDE.md prose claims a live subpath is retired + every "subpath /X" names a real export key. No paint.

### BD.W-DESHADCN-CANON
- **Band:** 7. **Source dim:** CMD.
- **Goal:** Add the missing BC.W-DESHADCN governing-principle canon to CLAUDE.md — the cross-cutting "reka = BEHAVIOR / glass-ui = 100% of the MATERIAL; no shadcn-neutral token survives in the visual layer" invariant + its born-RED proof:no-shadcn-default gate — as a Design-Axes / Component-architecture clause.
- **Starting state:** CLAUDE.md has ZERO mention of shadcn-default/de-shadcn/no-shadcn-default (grep empty). The gate proof:no-shadcn-default IS shipped (package.json scripts) and is the born-RED lock for BC.W-DESHADCN/DIALOG-GLASS/TABS-IOS.
- **Rationale:** BC.W-DESHADCN is the cross-cutting BC headline (the 2026-06-18 user directive "abrogate ANY styling of shadcn and default reka") + mints a born-RED invariant gate — exactly the structural canon CLAUDE.md carries as a binding axis. Its absence means a planner has no recorded statement of the de-shadcn material-first invariant.
- **Source:** `BC.W-DESHADCN.md` (headline + §0) + package.json scripts['proof:no-shadcn-default'].
- **Gate + paint sketch:** Doc-only. The note machine-locks to the existing proof:no-shadcn-default gate. No paint.

### BD.W-BC-COMPONENT-CANON
- **Band:** 7. **Source dim:** CMD.
- **Goal:** Add the missing per-component/register canon for the shipped BC waves with no CLAUDE.md note beyond a structure-ledger one-liner: SELECTION-CARD (Card variant='selection'), GLASS-IDENTITY, DIALOG-GLASS, TABS-IOS, CODE-BLOCKS (Fira-Code register), GHOST-DASHED (the ONE ghost/dashed register), SEPARATOR-FIX, RADIO-FIX, CONTROL-SMOOTH, PADDING-CANON, each machine-locked by its existing proof gate.
- **Starting state:** `Card.vue:81-83` ships variant='selection' but CLAUDE.md names only the CardTier type (:395). No grep hit for code-block/Fira Code/ghost-dashed/dialog-glass/tabs-ios/glass-identity. Gates proof:selection-card/glass-identity/dialog-glass/tabs-ios/code-blocks/ghost-dashed/radio-fix/control-smooth present in package.json. **CAUTION:** BC.W-SEPARATOR-FIX names proof:separator but package.json may not have it (proof:no-gray is present) — verify the actual gate name on disk before citing.
- **Rationale:** Discharges the missing-canon-for-shipped-wave class: these waves introduced new components/registers/gates (SELECTION-CARD is "the only NEW component of the Atlas set") with no canonical home — a future agent cannot discover them, a planner cannot trace their machine-lock.
- **Source:** `BC.W-{SELECTION-CARD,GLASS-IDENTITY,DIALOG-GLASS,TABS-IOS,CODE-BLOCKS,GHOST-DASHED,SEPARATOR-FIX,RADIO-FIX,CONTROL-SMOOTH,PADDING-CANON}.md` + `Card.vue:81-83` + package.json scripts.
- **Gate + paint sketch:** Doc-only. **Verify each cited gate name on disk before writing the canon (do not invent a gate — the proof:separator caveat).** Each note ties to a real proof gate already shipped. No paint (BB inv-4).

### BD.W-BUTTON-GLASS-IOS-NOTE
- **Band:** 7. **Source dim:** CMD.
- **Goal:** Apply the BC.W-BUTTON-GLASS-IOS CLAUDE.md modify directive that was specced but not applied — update §"The lit glass button (BB.W-BUTTON-GLASS)" to the iOS-27 registers (blur 8→floating + press 0.25/0.7 → iOS 0.15/0.86 + the hero-deep route), and add the BC.W-AX-METRIC-HOVER one-line tactile value-lift clause to the metric-badge note.
- **Starting state:** CLAUDE.md §"The lit glass button" documents useSpringPress "response 0.25, ζ 0.7" (the pre-iOS register). BC.W-BUTTON-GLASS-IOS.md carries an explicit non-conditional CLAUDE.md directive. BC.W-AX-METRIC-HOVER.md carries a "modify-IF discoverability" one-line clause (--metric-badge-hover-translate -2px + scale 1.04 + --shadow-cartoon-sm).
- **Rationale:** BC.W-BUTTON-GLASS-IOS is a shipped wave with a non-conditional CLAUDE.md modify directive updating the press/blur numbers — leaving the BB-shaped note stale means the documented spring constants no longer match the shipped Button.
- **Source:** `BC.W-BUTTON-GLASS-IOS.md` (the directive line) + `BC.W-AX-METRIC-HOVER.md` + CLAUDE.md §"The lit glass button".
- **Gate + paint sketch:** Doc-only. **Verify the shipped Button.vue press constants match 0.15/0.86 before writing (the note tracks the code, not the other way).** No paint.

---

## Band 8 — Cross-repo asks + republish-gated consumes (foreign-tree fenced)

### BD.W-KF-OSCILLATOR-CONSUME
- **Band:** 8. **Merged from:** DF (BD.W-KF-OSCILLATOR-CONSUME) + CRA (BD.W-KF-OSCILLATOR-CONSUME). **BOOKED — kf republish-gated.**
- **Goal:** On a kf republish past 4.3.0 that publishes the LIGHT Oscillator/waveformValue in dist, consume it for the viz loop-clock + the EasingPicker `loop` playback seam (the one-source+clock completion). Until then BOOKED — interim = the existing de-synced sine/uTime, KEEP, do not block.
- **Starting state:** kf Oscillator is LOCAL-ONLY in keyframes.js, ABSENT from the published dist (grep 0; asks-and-consumes.md:18). `easing/README.md:62-67` (the loop seam named successor). EasingPicker `loop` default = one-shot rAF travel today.
- **Rationale:** T5 / INFORM-1 booked republish-gated. A by-name kf ask, NO peer-spine widen (spine ^4.0.0). Promotion trigger: kf republishes the LIGHT Oscillator past 4.3.0.
- **Source:** `asks-and-consumes.md:18` + `easing/README.md:62-67` + `inbound/KF-INBOUND.md` INFORM-1 + research/deferral-sweep T5.
- **Gate + paint sketch:** **REPUBLISH-GATE FENCE:** authoring against a not-in-dist export is a contrivance (BC.W-VIZ-CHOREOGRAPHY C6 reds importing the not-in-dist Oscillator) — STAYS BOOKED with the named trigger. NO build this tranche unless kf republishes. If it fires: consume + delete the interim; born-RED proof asserts the Oscillator import + the interim sine GONE. Paint-π only if it fires (the loop-clock visual).

### BD.W-KF-DRAGSNAP-CONSUME
- **Band:** 8. **Merged from:** DF (BD.W-KF-DRAGGABLE-SNAP-CONSUME) + CRA (BD.W-KF-DRAGSNAP-CONSUME). **BOOKED — kf republish-gated.**
- **Goal:** On a kf republish exposing snap/bounds/rubberBand on the published DragOptions, collapse the ~12-line commitSnapOnRelease re-roll in useDragMorph onto the native kf `snap` AND gain the iOS rubberBand overscroll for free (pull the end tab PAST the end → stretches then snaps back). Until then the published-surface interim (reset+decayRest+spring.target) stays — works on 4.3.0 today.
- **Starting state:** `useDragMorph.ts:281-303` carries the live `// CONSUME(kf snap): BC.W-LIQUID-TAB` marker over a working re-roll (DECAY_K=5 + decayRest + spring.target). The kf SOURCE Draggable has snap+rubberBand but the published dist DragOptions does NOT (machine-verified ABSENT).
- **Rationale:** asks-and-consumes Draggable snap row (BOOKED republish-gated): a cheap by-name kf ask, NO peer-spine widen; the rubberBand overscroll is the deferred-polish leg.
- **Source:** `asks-and-consumes.md:20` + `useDragMorph.ts:281` (CONSUME marker).
- **Gate + paint sketch:** REPUBLISH-GATE FENCE as above. NO build unless kf republishes. If it fires: consume + delete the re-roll; the rubberBand overscroll paint-π (pull past end → stretch → snap-back). STAYS BOOKED otherwise.

### BD.W-VALUEJS-COLOR-SUBPATH
- **Band:** 8. **Source dim:** CRA. **BOOKED — value.js /color subpath-gated.**
- **Goal:** On value.js Tranche O publishing the /color subpath in 0.14.x+ dist, re-point the 7 live `@mkbabb/value.js` root-monolith import sites onto `@mkbabb/value.js/color` (the footprint-shrink over the 145 KB monolith). Until then BOOKED — authoring against a non-existent subpath is a contrivance.
- **Starting state:** value.js at 0.13.0; package.json exports keys = [`.`] ONLY (node-verified). 7 monolith import sites: composables/color/useAccentTone.ts, composables/color/index.ts, composables/motion/curves.ts, easing/composables/useEasingPicker.ts, aurora/constants/presets.ts, aurora/composables/color.ts, border-progress/composables/spectrum-walk.ts.
- **Rationale:** INFORM-4(b) booked the /color subpath import as a perf consume. The forward-compat peer (^0.13.0 || ^1.0.0) already admits the 1.0.0 cut the split rides. Promotion trigger: value.js O publishes /color.
- **Source:** `inbound/KF-INBOUND.md` INFORM-4 + `coordination/KF-BC.md` INFORM-4.
- **Gate + paint sketch:** REPUBLISH-GATE FENCE: no re-point against a non-existent subpath. NO peer-spine widen (the peer is already forward-compatible; proof:constellation-spine clause 8 reds dropping ^1.0.0). If it fires: re-point the 7 sites + the budget shrink π. STAYS BOOKED otherwise.

### BD.W-CROSSREPO-ADOPT-SWEEP
- **Band:** 8. **Merged from:** PvE (BD.W-CROSSREPO-ADOPT-EXECUTE) + DF (BD.W-CROSSREPO-ADOPT-SWEEP) + CRA (the Tier-28 tracking). **Drives the sibling adopts; glass-ui edits ZERO sibling tree.**
- **Goal:** Drive the post-cut sibling adopt sweep BC marked pending — SPEEDTEST-ADOPT (the 5-interim consume-and-delete + ^4.x bump), ATLAS-ASK (^3.12.0 deprecated d6 fork-line → ^4.x + the eight-needs delete + the GlassPanel retire green-handshake), FOURIER-ASK (^4.0.0 → ^4.x + the un-applied phantom-classes Q.W4 patch) — each verified by a REAL install+typecheck on the sibling, NOT a paper handshake.
- **Starting state:** `EXECUTION-PROGRESS.md:51-52` (Tier 27 CUT done; Tier 28 SPEEDTEST-ADOPT/FOURIER-ASK/ATLAS-ASK = pending — VERIFIED). `coordination/{SPEEDTEST-BC,ATLAS-BC,FOURIER-BC}.md` hold the by-name consume-and-delete ledgers. 4.1.0 is LIVE (the publish that unblocks the adopts).
- **Rationale:** The cross-repo adopt sweep is EXECUTION-phase-only, sequenced AFTER the cut publishes 4.x. The cut shipped 4.1.0; the sibling re-pins + consume-and-deletes now have a usable mainline 4.x. The stale-binding chronic demands the real install+typecheck sweep.
- **Source:** `EXECUTION-PROGRESS.md:51-52` + `BC.W-CUT.md:31` + `coordination/SPEEDTEST-BC.md/ATLAS-BC.md/FOURIER-BC.md`.
- **Gate + paint sketch:** **FOREIGN-TREE FENCE (absolute):** glass-ui authors ZERO sibling edits — the sibling re-pins + consume-and-deletes land in the SIBLING repos on their ^4.x bump; the by-name ask is the only channel. Per-wave File-Bounds gates (proof:speedtest-adopt S4 reds any ../speedtest write-path; proof:atlas-adopt A4 reds any ../sci-report write-path). **GREEN-HANDSHAKE:** the Atlas GlassPanel retire stays HELD-FOLDED until its 3 SFCs (HoverCard.vue:44,420 · AuroraVeilStage.vue:30,72 · GalleryView.vue:13,175) consume-and-delete `<GlassPanel>` AND the registry-consumer probe re-confirms ZERO live external consumers — a SILENT prune is forbidden (the AY-retire-then-AZ-restore defense). **BINDING-VERIFICATION:** a real install+typecheck on each sibling (the stale-binding chronic — vue-tsc+units MISS a stale binding). **VERSION-RECONCILE:** the cut version is USER-DOMAIN; speedtest AW-relay docs hard-naming 4.1.0 re-point to the ACTUAL cut version AT THE CUT. proof:crossrepo-asks (no-silent-drop completeness + content-only fence). No glass-ui paint (the in-repo half already shipped at BC).

### BD.W-SLIDES-REDEPLOY
- **Band:** 8. **Merged from:** PvE (BD.W-SLIDES-REDEPLOY) + DF (BD.W-SLIDES-REDEPLOY). **HELD — user-gated, irreversible-public, terminal.**
- **Goal:** Drive the slides 3.13.0→4.x adopt (1 pin + 2 edits — retire the .glass-dock-omitting opt-out + the FourierField-root warm-lean fix) and the production redeploy of slides.friday.institute — the last, user-gated H-DEPLOY step held since 2026-06-12.
- **Starting state:** `EXECUTION-PROGRESS.md:94` ("Slides NOT redeployed (user-gated)" — VERIFIED). FOLD-LEDGER mem-slides-production-held-down (site TAKEN DOWN 2026-06-12; M+N bands committed local UNPUSHED) + mem-slides-fc-honesty-unpushed (feedback-coder honesty band committed local b538506, NOT pushed) + mem-fourierfield-root-hero-warm-lean (R5-11, the ONLY red, fix is glass-ui FourierField-ROOT).
- **Rationale:** HELD-with-rationale (user-domain greenlight). The slides redeploy is the terminal, irreversible-public, user-gated leg sequenced LAST after a live-paint gestalt PASS. The N-union + feedback-coder honesty bands are done-but-unpushed; the deploy waits on the user greenlight.
- **Source:** `EXECUTION-PROGRESS.md:94` + FOLD-LEDGER mem-slides-production-held-down/mem-slides-fc-honesty-unpushed/mem-fourierfield-root-hero-warm-lean.
- **Gate + paint sketch:** **USER-GATED FENCE:** the production deploy is the terminal user-domain step — never auto-push/auto-deploy without the explicit greenlight. **FOREIGN-TREE:** the slides W-ADOPT lands in the slides tree (the 1 pin + 2 edits); glass-ui edits ZERO slides tree. **The ONE glass-ui-side red** (FourierField-ROOT warm-lean, R5-11) IS a glass-ui wave — if it has not landed, it is an in-repo fix (verify against HEAD; may already be discharged by the BC viz band). The redeploy itself is sibling+user-domain. No glass-ui paint beyond the FourierField-root fix (if owed).

---

## Band 9 — The fold machine + the standing arms

### BD.W-DISPOSITION-RESTAMP
- **Band:** 9. **Source dim:** DF.
- **Goal:** Re-stamp the 28 standing DISPOSITION-REGISTER min-consumers-n:2 watches reStampedAt:"BD" in-place (no row deletion — L-inv-8), re-running each grep trigger against the BD-HEAD constellation, graduating any that crossed ≥2 consumers and re-stamping the rest HELD-with-rationale.
- **Starting state:** `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` — 31 rows, 28 'book' rows all reStampedAt:"BC" (VERIFIED). Standing watches incl. 6 CSS-feature Baseline books (cross-document-vt, css-scope-state, css-at-function, interestfor-previews, css-text-box-trim, css-interpolate-size, directional-view-transition), 3 control-size books (button-icon-sm/select-size/dock-select-clamp-label), single-consumer pilots (glass-dialog-native-pilot/glass-native-select-pilot/inline-edit-primitive 5-tranche carry/labeled-slider-readout).
- **Rationale:** The chronic-fold machine arm (BB.W-DISPOSITION-RESTAMP): every booked row carries forward with a named trigger and MUST be re-stamped at the new tranche, never silently re-booked a 7th time. proof:disposition-live + proof:nda-decided enforce the floor. The CSS-feature books graduate at Baseline-Widely; the WebGPU mandate proved Baseline can move fast — re-check cross-document-vt/directional-view-transition at BD.
- **Source:** `DISPOSITION-REGISTER.json` (28 book rows reStampedAt BC) + `BC/DEFERRAL-LEDGER.md §9` + CLAUDE.md §BB.W-DISPOSITION-RESTAMP.
- **Gate + paint sketch:** **NO-DELETE FENCE:** a fold is a disposition FLIP in place — a restamp that deletes a row reds the close (L-inv-8). Born-RED via proof:disposition-live's decided-destination soundness clause: every reStampedAt names BD or graduates to resolvedBy; a synthetic phantom-dest reds. + proof:nda-decided's terminal-lock. No paint (register-disposition flip).

### BD.W-WEAK-KEEP-REGRADE
- **Band:** 9. **Source dim:** DF.
- **Goal:** Re-grade the AY weak-KEEP orphans at the BD overfitting audit — sortable-list, typewriter (re-grade-at-next-close notes), watercolor-dot (0 external call-sites, KEEP-EVIDENCED) — each either crosses a real ≥2-consumer bar or is retired-with-rationale into the fold; run the canned overfitting-audit at the BD close.
- **Starting state:** FOLD-LEDGER ay-weak-keeps-stacked-typewriter-sortable (stacked-icons RE-GRADED to a real KEEP at BC; sortable-list/typewriter STAY-held) + ay-watercolor-dot-evidence-keep (the evidence doc stands; re-grade only if value.js blob repatriation ships). src/components/custom/{sortable-list,typewriter,watercolor-dot}/ present.
- **Rationale:** HELD weak-KEEP / KEEP-EVIDENCED with named re-grade-at-next-close triggers (the overfitting-audit precept runs at EVERY close — BB's never ran). These carry the standing re-grade obligation; the BD page-prune orphan sweep is the trigger.
- **Source:** `DEFERRAL-LEDGER.md` ay-weak-keeps-stacked-typewriter-sortable/ay-watercolor-dot-evidence-keep + MEMORY feedback_overfitting_audit.md.
- **Gate + paint sketch:** Run the canned overfitting-audit (`docs/audits/overfitting-audit.md`) at the BD close — every src/ artefact has ≥2 sites OR is exported OR is a private demo helper. Each weak-keep either crosses the bar (graduates) or retires-with-rationale into the fold. No paint (an audit, not a visual change) — unless a retire fires a prune (then the prune is a separate disposition with its registry-consumer probe).

### BD.W-FOLD-LEDGER
- **Band:** 9. **Source dim:** DF (the no-silent-drop machine).
- **Goal:** Author the BD FOLD-LEDGER.json — every owed item from the 12 findings + every BC HELD/BOOKED long-tail carried forward, each with a terminal disposition (a BD wave id, a tracked-hold + trigger, or a retire-with-rationale). The expectedCount/closeUnion machinery the BC ledger carries.
- **Starting state:** `BC/FOLD-LEDGER.json` (213 items, all DECIDED: 99 BUILD, 46 MET, 65 HELD, 2 RETIRE, 1 SUPERSEDED — VERIFIED). The BD findings carry the residual HELD/BOOKED long-tail forward.
- **Rationale:** The no-silent-drop floor (proof:bc-fold-ledger → proof:bd-fold-ledger): the close-union must account for every owed item. This wave IS the ledger; FOLD-LEDGER.md (this tranche's companion doc) is the human-readable map.
- **Source:** `BC/FOLD-LEDGER.json` + the 12 findings.
- **Gate + paint sketch:** Born-RED proof:bd-fold-ledger: the items count == expectedCount + every item has a terminal disposition + the closeUnion accounts for it; a synthetic dropped item reds. No paint (a ledger).

### BD.W-GESTALT-ROSTER-GROW
- **Band:** 9. **Source dim:** DF (the close-oracle prerequisite). **INFRA — the BD close oracle.**
- **Goal:** Grow + re-point `proof:ba-gestalt` to the BD tree so the BC anti-disease law is enforceable for BD repaints (the BB roster-never-grew disease, killed one tranche on). Mint `docs/tranches/BD/audit/reflect/bd-gestalt-roster.md` (17 ROSTER rows — the BC baseline 16 + the new `goo-blob` creature extra) + the 17 per-surface BD freshness records (the 13 REQUIRED + 4 extras, incl. the fresh-authored `goo-blob.md`), re-point the 4 gate consts (`REFLECT_DIR`/`ROSTER`/`WAVES_DIR`/`TRANCHE_DIR`, proof-ba-gestalt.mjs:70-73) BC→BD, re-label G6 BC→BD; born-RED→GREEN with a re-point self-test. The closed BC record stays read-only.
- **Starting state:** `proof-ba-gestalt.mjs:70-73` BC-frozen (`docs/tranches/BC/…`); `docs/tranches/BD/audit/` ABSENT (the BD capture home does not yet exist, VERIFIED). The 13-surface `REQUIRED_SURFACES` array (`:83-99`) is the acceptance roster the BD captures land against.
- **Rationale:** Every band-2/3/4/5 per-wave `proof:ba-gestalt` verdict + W-CUT's terminal whole-tranche gestalt needs an enforcement home in the BD tree. Without the grow, the per-wave verdicts have no BD capture home and the BB "roster never grew" disease recurs. The wave's own §2:25 records the FOLD-LEDGER Class I disposition.
- **Source:** `proof-ba-gestalt.mjs:70-99` + the BC roster-CLOSED handoff + FOLD-LEDGER Class I.
- **Gate + paint sketch:** Born-RED (the consts read BC, the BD roster/freshness records ABSENT) → GREEN at the mint + re-point + a re-point self-test bite (a synthetic BC-const survival reds). Per-surface freshness-record `surface-paths` drift → G7 auto-revoke. No new src paint — the gate INFRA wave the per-wave visual verdicts depend on; the binding paint is each consuming wave's own per-wave delta.

### BD.W-CUT
- **Band:** 9. **Source dim:** PvE/CRA/DF (the terminal). **USER-GATED.**
- **Goal:** The terminal cut — the user-gated 4.x publish (the next minor/patch over 4.1.0) shipping the band-1 aria fix + the band-2/3 glass/viz uplifts + the band-4/5 demo modernization, sequenced LAST after a live-paint gestalt PASS + the full CI-accurate close battery (siblings-AND-submodule-absent per BD.W-CLOSE-DISCIPLINE-CANON).
- **Starting state:** 4.1.0 LIVE; the BD waves land on tranche/BD; the cut is the irreversible tag.
- **Rationale:** The cut publishes the version siblings adopt (BD.W-CROSSREPO-ADOPT-SWEEP) + discharges the aria ask in a PUBLISHED cut (kf's content-aware gate needs the SFC fix shipped, not a version bump alone). The version is USER-DOMAIN (confirm-first).
- **Source:** PvE/DF/CRA terminal + `BC.W-CUT.md` (the cut discipline precedent).
- **Gate + paint sketch:** **THE CI-ACCURATE CLOSE (the BD.W-CLOSE-DISCIPLINE-CANON proof):** `gates.mjs --run full` in a clean checkout, siblings AND docs/precepts submodule ABSENT, BEFORE the irreversible tag. **USER-GATED:** the version + the publish are user-domain (never auto-tag). **AT-CUT RECONCILE:** the speedtest/kf relay docs hard-naming a version re-point to the ACTUAL cut version; re-open KF-BC ASK#2 with the shipping version. The terminal live-paint gestalt PASS (proof:ba-gestalt) over the fresh capture set gates the cut.

---

## Wave count: 43 (across 9 bands)

(Was 44; BD.W-SECTION-HEADER-THREAD RETIRED into BD.W-PAGE-HEADER-FOLD — disk-proven double-claim of the same 2 page-identity headers, the ≥2-adopter gate-widen folded into PAGE-HEADER-FOLD's M9e-3. VERIFIED `ls docs/tranches/BD/waves/*.md | wc -l` = 43 AND `grep -c '^### BD.W-' CANDIDATE-WAVES.md` = 43.)

Merge provenance summary (where ≥2 dimensions named the same wave):
- **BD.W-ARIA-ORIENTATION-GUARD** ← ARIA + CRA + PvE (the cut defect, 3 dims)
- **BD.W-GLASS-LENS-CHROMA** ← DF (T2) + PROC
- **BD.W-VIZ-PARITY-METAL** ← PROC (subsumes the DF + PROC W-REFLECT3 deferral)
- **BD.W-GOOBLOB-SAT-SHADE** ← DF (BD.W-GOO-SATELLITE-COLOR) + PROC
- **BD.W-VIZ-COMPUTE-DENSITY** ← DF (BD.W-VIZ-COMPUTE-OPTIMIZE) + PROC
- **BD.W-KF-OSCILLATOR-CONSUME** ← DF + CRA
- **BD.W-KF-DRAGSNAP-CONSUME** ← DF + CRA
- **BD.W-SECTION-HEADER-THREAD** ← PA-b + the PA-a orphan finding — RETIRED into BD.W-PAGE-HEADER-FOLD (disk-proven double-claim; the dead-mint cure is PAGE-HEADER-FOLD's M9e-3)
- **BD.W-CROSSREPO-ADOPT-SWEEP** ← PvE + DF + CRA
- **BD.W-SLIDES-REDEPLOY** ← PvE + DF
- **BD.W-SUCCESSOR-AND-DOC-RESIDUE** (PvE) ← decomposed into BD.W-DISPOSITION-RESTAMP + BD.W-WEAK-KEEP-REGRADE + the band-6/7 doc waves (not a single wave — the residue spans canon + fold + doc).
