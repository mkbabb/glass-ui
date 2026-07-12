# BI CHRONIC / DEFERRED DISPOSITION LEDGER

> **OWNER-NAME RESOLUTION RULE (round-8 R8-F1, binding):** owner names in this ledger written before
> the formation fleet authored the final wave set are PROPOSALS; the mechanical renames to the
> committed 91 IDs are applied in place where the mapping is 1:1, and for any residual un-renamed
> `W-*` proposal the BINDING owner map is `PLAN.md §2` + the ADDENDA tables. Phantom names surviving
> inside ADDENDA left-columns are the historical audit trail, not live targets. The
> `BI.W-LEDGER-DETECTOR-HARDEN` clause (g) gate enforces body-target resolution henceforth.

The COMPLETE deferred-item census for the BI tranche formation. **Every row gets a TERMINAL
disposition** — BUILD (named BI wave) · FOLD (into a named wave) · RETIRE (with rationale). Re-booking
is FORBIDDEN (user mandate UF-P2, 2026-07-11). A row that rode **≥2 published closes un-decided** is a
DISEASE row and is marked ⚠ DISEASE.

**Sources reconciled:** `docs/tranches/BG/FOLD-LEDGER.json` (135 rows) · `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`
(31 rows) · `docs/consumer-evidence/*.md` · a src/scripts grep for bare-word BOOKED/DEFERRED/successor/interim
(the 8 detector-blind bookings round-1 DETECTOR-1 named) · the CLAUDE.md booked-successor set.

**The round-1 lesson driving every LIVENESS PROBE column:** the census gates verify STRUCTURE (row present /
decided / routed) but never LIVENESS (did the DEFER trigger fire? is the ratcheted file still >500? did the
landed adopt discharge the book?). Every row below names the probe a gate must carry so a stale-DEFER cannot
ride green again.

**Tranche close order (for closes-ridden counts):** AT · AU · AV · AW · AX · AY · AZ · BA · BB · BC · BD
(all published) · BE · BF (planning-only, folded into BG) · BG (5.0.0 PENDING). An AT-booked row that is
still un-decided has ridden ~10 published closes.

---

## §0 — Census summary

`⚠ DISEASE` is a FLAG (rode ≥2 closes un-decided), NOT an exclusive class — a disease row still carries a
BUILD/FOLD/RETIRE disposition, so the columns below overlap.

| axis | count | note |
|------|-------|------|
| ⚠ DISEASE flag (≥2 closes un-decided) | 30 | AX 21-book cluster + dock chronic + Safari/Metal device-gate + detector-blind-spot + ratchet + constellation/aurora/async/album-shade/chromatic successors |
| disposition = BUILD → named BI wave | 9 | drag-reattach, radius-grammar, orphan-split, gate-owner-resolve, esc-stack, demo-control-wire, metrics-relocate, tabs-factor, ratchet+detector-harden |
| disposition = FOLD → named wave | 18 | dock-greenfield subsumes (5), Safari/Metal band (5), a11y band (2), demeta/comment-scrub (2), glass-simplify (2), metric-family (2) |
| disposition = RETIRE + rationale | 22 | speculative micro-variants (8-10-close, 0-1 consumers), Baseline standing-books, dead in-src successors, foreign-tree supplier notes |
| disposition = MET / LANDED (flip-with-evidence) | 20 | the round-1 corrections + the 7 wants-it-someday + the AX resolved set + gesture-recorder + WGSL flow chunk + dock-press |
| open_questions (user ruling owed) | 6 | see §6 |

**Distinct ledgered rows: 85** (§1-§5 tables). The ~90 FOLD-LEDGER `COORDINATED`-to-BG rows that LANDED are
terminal-DONE and summarized in §7 (not re-enumerated) — except the 3 that REGRESSED at HEAD, re-homed as the
disease rows dis:ratchet-regrowth / dis:dock-chronic / dis:detector-blind-spot.

---

## §1 — ⚠ DISEASE rows (rode ≥2 closes un-decided — must say so)

### 1a. The AX-register 21-book cluster — re-stamped-never-decided across ~8-10 closes

Each was booked at AT (W0-L4 ledger) or AX (G-4/5/6), carried a `min-consumers` n:2 trigger that re-evaluated
un-MET every close, and was RE-STAMPED (not decided) at every tranche through BG.W-DISPOSITION-RESTAMP. The
register's "honest-hold (L-inv-8)" framing is now overridden by UF-P2 (re-booking forbidden — DECIDE). The
FAM-10 mechanism-distinctness law + UF-P7 Kronecker-factorization + UF-B5/B6 grand-simplification force the call:
a speculative variant with 0-1 consumers unbuilt for 8-10 closes is dead substrate.

| id | item | first-booked | closes | evidence (file:line) | TERMINAL disposition | liveness probe a gate must carry |
|----|------|-------------|--------|----------------------|----------------------|-----------------------------------|
| ax:button-icon-sm | Button `size="icon-sm"` CVA rung | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:77 (book, resolved:false, grep `size="icon-sm"`=0 binders) | **RETIRE** — 0 binders / 8-close chronic; a control-size AXIS (UF-P7) re-mints it on a real ≥2, not a standing book | a `book` row re-stamped ≥2 tranches with trigger still un-MET REDs (re-stamp-count ceiling) |
| ax:select-size | SelectTrigger `size` height rung | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:119 (book, grep=0) | **RETIRE** — pairs with icon-sm; the control-size axis (D-FACTOR) is the honest re-entry, never a per-control book | same re-stamp-count ceiling |
| ax:tooltip-mono-variant | TooltipContent `variant="mono"` | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:105 (book, grep=0) | **RETIRE** — 0 consumers, 8-close; a CVA variant nobody binds | re-stamp-count ceiling |
| ax:spring-crisp-token | `--spring-crisp` token | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:133 (book); BB.B9 already DECIDED no-op; `grep --spring-crisp src/styles`=0 | **RETIRE** — BB.B9 decided no-op; formalize terminal (1 speedtest self-hosted override ≠ library trigger) | assert `proof:spring-crisp` no-op-decision stays no-op; a 2nd real surface flips RED→build |
| ax:metric-badge-icon | MetricBadge icon slot | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:147 (book, grep=0 beyond demo) | **FOLD → BI.W-METRICS-DEMO (STAY per XR-3)** — the metric family moves to speedtest (UF-K1); the icon slot goes with it | assert metric-family subpaths absent post-relocate |
| ax:labeled-field-for-id | LabeledField auto for/id a11y binding | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:176 (book, 1 binder) | **FOLD → BI.W-SLIDER-THUMB-NAME + BI.W-SPLITCHARS-ARIA + BI.W-DEMO-SOURCE-SCAN (+ ESC-STACK)** (round-2 a11y lens) — a real a11y-correctness concern, decide against a concrete failing site | axe `label` assert on LabeledField'd inputs |
| ax:raf-loop-demand-park | useRAFLoop `demandPark` ergonomic | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:204 (book, 1 consumer) | **RETIRE** — createCanvasLifecycle owns demand-park; no 2nd independent consumer in 8 closes | re-stamp-count ceiling |
| ax:labeled-slider-readout | LabeledSlider numeric-readout | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:374 (book, 2-divergent) | **RETIRE** — 2 divergent consumers never converged in 8 closes; UF-J1 (value.js color-picker sliders 1:1) supersedes the register | re-stamp-count ceiling |
| ax:cartoon-quiet-preset | named cartoon×quiet surface preset | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:417 (book, 0 library binders, PROSE only) | **RETIRE** — presets-in-consumers by policy; a named library preset was never the right home | re-stamp-count ceiling |
| ax:keyframes-prune-migration-dag | kf prune/migration DAG adopt | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:445 (book, foreign-tree supplier edge) | **RETIRE** — not a glass-ui deferral; a supplier-relationship note (glass-ui re-pins on kf publish). No glass-ui wave owns it | n/a — supplier edge, off the deferral watch |
| ax:speedtest-a11y-bundle | the "3 a11y asks" bundle label | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:190 (book, un-auditable bundle) | **RETIRE the bundle-label** — decompose concrete rows into BI.W-SLIDER-THUMB-NAME + BI.W-SPLITCHARS-ARIA + BI.W-DEMO-SOURCE-SCAN (+ ESC-STACK); a bundle is not a row | assert no un-decomposed `bundle`-kind book survives |
| ax:cross-document-vt | `@view-transition{navigation:auto}` | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:233 (book, Baseline-gated) | **open_question → recommend RETIRE standing-book** (see §6.1) | Baseline-graduation + ≥2 opt-in consumers flips RED→build |
| ax:css-scope-state | `@scope`/`:state()` retire `:deep()` | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:247 (book, Baseline-gated) | **open_question → recommend RETIRE standing-book** (§6.1) | Baseline-wide + a paid SFC touch flips RED→build |
| ax:css-text-box-trim | `text-box-trim` typography lever | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:289 (book, Baseline-gated) | **open_question → recommend RETIRE standing-book** (§6.1) | Baseline-wide + typography touch flips |
| ax:css-interpolate-size | `interpolate-size`/`calc-size(auto)` | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:303 (book, Chromium-only) | **open_question → recommend RETIRE standing-book** (§6.1) | Baseline-wide + a touched SFC pays the diff flips |
| ax:interestfor-previews | `interestfor` action-previews | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:275 (book, Limited) | **open_question → recommend RETIRE standing-book** (§6.1) | Baseline-wide + a preview surface flips |
| ax:glass-dialog-native-pilot | native `<dialog>` pilot (#34) | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:332 (book, 0 binders, demo-gated) | **open_question → recommend RETIRE standing-book** (§6.1) — `<Drawer live-behind>` covers the need | a real ≥2 native-`<dialog>` consumer flips RED→build |
| ax:glass-native-select-pilot | `GlassNativeSelect` (G7) | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:346 (book, pre-Baseline) | **open_question → recommend RETIRE standing-book** (§6.1) — reka Select covers the picker | `appearance:base-select` Baseline + ≥2 flips |
| ax:directional-view-transition | directional VT `--vt-direction` JS driver | AX G-4 | ~5 ⚠ | DISPOSITION-REGISTER.json:388 (book, 0 consumers set `--vt-direction`) | **RETIRE** — the CSS `--vt-*` vocab ships; the JS driver had 0 consumers in 5 closes; re-enters on a real ≥2 | assert no `--vt-direction` writer un-consumed |
| ax:inline-edit-primitive | converged inline-edit primitive | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:360 (book, 3 divergent consumers, convergence-gated) | **open_question → recommend RETIRE-until-convergence** (§6.2) — the ONE genuine convergence-hold, but 10 closes un-converged | assert no converged `/inline-edit` import; a converged 2nd contract flips |
| ax:dock-select-clamp-label | DockSelectTrigger `clampLabel` | AT | ~10 ⚠ | DISPOSITION-REGISTER.json:91 (book, 1 consumer) | **FOLD → D-DOCK greenfield** — the dock is greenfielded from iOS-27 first principles (UF-C1); label-clamp is a native greenfield concern | dock greenfield establishes label policy natively |

### 1b. The dock band — 3rd consecutive tranche re-opening (the flagship disease)

| id | item | first-booked | closes | evidence | TERMINAL disposition | liveness probe |
|----|------|-------------|--------|----------|----------------------|----------------|
| dis:dock-chronic | dock clip/morph/rail/Safari fundamentals re-opened every tranche | BD | 3+ ⚠ | ROUND-1 FAM-3; shell.css:151 `contain:layout style paint` clips plates; BA `--dock-control-safe-inset` IS the sizing hack the user rejected (UF-C6/C7); rail geometry overlap (UF-C2/ss-03); UF-C5 morph Safari; the BA→BG per-mechanism greens never held the gestalt | **BUILD → BI D-DOCK greenfield** (UF-C1: reinvent from iOS-27 first principles, all dock facilities, clipping structurally absent) | a live `elementFromPoint` reachability assert on dock hover plates + a Safari-engine gestalt verdict (not a Chromium-only per-mechanism green) |

### 1c. Verification device-gate + census-machine diseases

| id | item | first-booked | closes | evidence | TERMINAL disposition | liveness probe |
|----|------|-------------|--------|----------|----------------------|----------------|
| dis:safari-metal-verify | Safari/WebKit + real-Metal p50 verification NEVER run (asked-2 at BC; D7/D8/D24/D25/BF.W-GOO-SPLIT-PERF/BE.W-VIZ-PARITY-METAL all "no Metal box") | BC | 3+ ⚠ | FOLD-LEDGER D8/D24/D25:68-71, BF.W-GOO-SPLIT-PERF:131, BE.W-VIZ-PARITY-METAL:115; UF-C3 "broken in safari" | **FOLD → BI.W-DOCK-DEVICE (both Metal arms)** (round-2 real-device band) — one wave owns the WebKit gestalt + the goo-fission/viz-parity p50 capture on a real Metal box | proof:safari-parity RED-on-broken-`backdrop-filter:url()`; the p50 capture artefact must resolve on disk |
| dis:detector-blind-spot | bg-deferred-ledger §G hardening (forbid bare-word BOOKED + `.css` arm) prescribed, NEVER applied; 8 bare-word bookings ride invisible | BF | 2+ ⚠ | ROUND-1 DETECTOR-1; proof-bg-deferred-ledger.mjs:141 matches only `/\bBOOKED:\s*/`, walkSrc scans only `.ts\|.vue`; 8 bare hits (see §3) | **BUILD → BI.W-LEDGER-DETECTOR-HARDEN** — forbid bare-word BOOKED (require the `BOOKED:` label), add the `.css` arm to deriveInSrcMarkers, enroll the 8 as explicit rows + a self-test bite | the detector must flag a planted bare-word `BOOKED` (self-test bite) |
| dis:ratchet-regrowth | no-god-module ratchet drained then re-grew past 500 (GF5 "ratchet normalizes regrowth"); RED at HEAD, violates BG.W-CUT's own `RATCHET_BASELINES=={}` | BG | 2+ ⚠ | ROUND-1 FAM-1/GATE-1; 8 files >500 (segmented-tabs 572, useGlassBackdropLuminance 554, DockLayerGroup 524, shell.css 524, GlassDock 515, ladder 510, surfaces 508, dark-arm 507) +2 grandfathered pointing at DONE wave 17.1 | **BUILD → BI.W-STYLE-REDRAIN + BI.W-ENCAP-REDRAIN + CONTRACT-HARDEN** — carve the 8 <500, drain the 2 grandfathered, and make GROWTH past 500 in a non-baselined file RED the GROWING wave (not a phantom future drain) | growth past 500 in a non-baselined file REDs the growing wave; a grandfather whose successor is a DONE wave REDs |

---

## §2 — BUILD → named BI wave

| id | item | first-booked | closes | evidence | BUILD wave | liveness probe |
|----|------|-------------|--------|----------|-----------|----------------|
| bld:drag-reattach | Tabs `:draggable` "liquid tab" DEAD (reattach() runs once pre-mount; indicator z-0 occluded by tab z-10) | BG | 1 | ROUND-1 UF-H2/MOTION-1; useDragMorph.ts:311/375; segmented-tabs.css:84/234 | **BI.W-DRAG-REATTACH** — watch(el,{immediate}) + raise indicator above buttons during grab | live `elementFromPoint(indicatorCenter)` returns the indicator, and a driven pointerdown arms Draggable |
| bld:radius-grammar | no concentric-radius law / capsule-vs-card guard (vertical track balloons, square sheet, square metal rim) | BE | 2+ ⚠ | ROUND-1 GEO-1/5, UF-A1/A2/A4; --radius-{tab,control,badge,dock} all alias --radius-pill 9999px | **BI.W-RADIUS-GRAMMAR** — concentric-radius token (child=parent−inset) + pill-iff-short-box law + proof:radius-grammar | a multi-row/tall box with a pill token REDs; nested surface radius = parent − inset asserted |
| bld:orphan-binary-split | proof:component-orphan counts demo+internal as consumers (border-progress "consumers:2" siblingHits:0) | AY | 3+ ⚠ | ROUND-1 OFIT-1; .cache/gates/AY-component-orphan.json; border-progress.md ABSENT | **BI.W-ORPHAN-BINARY-SPLIT** — count BINARY (sibling+registry) consumers distinctly; demo-only published subpaths are a named category | a demo-only published subpath reports as demo-only, not silently ≥2 |
| bld:gate-owner-resolve | no-masking Arm E accepts any non-empty owedBy string (`--specular-angle` owed to WS8.4 with no spec on disk) | BG | 1 | ROUND-1 GATE-3; proof-no-masking-fallback.mjs:224; no WS8.4 spec | **BI.W-AXES-GATES (owedBy-resolve clause)** — owedBy must resolve to a real waves/<id>.md (mirror waveSpecExists); land WS8.4/F2.2 or convert to `collapsed` | a phantom owedBy REDs (self-test bite) |
| bld:esc-stack | Escape single-winner (dispatchShortcut first-match-return; 4 containers register unconditional Escape) | BG | 1 | ROUND-1 UF-J5; useKeyboardShortcuts.ts:209; ExpandableContainer.vue:187 | **BI.W-ESC-STACK** — top-open-overlay wins (register Escape only while open) | expanding container #2 + Escape closes #2, not #1 |
| bld:demo-control-wire | grain Switch/slider dead refs (bound to controls, ZERO downstream consumer) | BG | 1 | ROUND-1 UF-J2; settings.vue:31,37 | **BI.W-GRAIN-WIRE** — bind grain/paperGrain to real `--glass-grain-opacity`/`.paper-grain-overlay`; audit ALL story controls for dead refs | flipping a demo control mutates a value the template reads |
| bld:metrics-relocate | metric-cell/stack/badge speedtest-only overfit — move to speedtest (UF-K1) | AX | 2+ ⚠ | ROUND-1 OFIT-4/STRUCT-8; UF-K1; 3 published subpaths, speedtest-only sibling hits | **BI.W-METRICS-DEMO (STAY per XR-3)** — prune the 3 families (inv-11 registry probe) + speedtest ADOPT ask; decide metric-pill (ui/) | the 3 subpath keys absent post-cut; speedtest ADOPT recorded |
| bld:tabs-factor | "million variants essentially the same"; eyeglass should be default; vertical-size config (UF-H1) | BG | 1 | ROUND-1 UF-H1; UF-P7 D-FACTOR | **BI.W-TABS-FACTOR** (part of D-FACTOR) — eyeglass default, one vertical-size axis, retire redundant variants under mechanism-distinctness | variant count drops; each surviving variant owns a distinct mechanism |
| bld:census-detector-harden | (see dis:detector-blind-spot §1c) | BF | 2+ ⚠ | — | **BI.W-LEDGER-DETECTOR-HARDEN** | (see §1c) |

---

## §3 — The 8 detector-blind bare-word BOOKED markers (in-src) → dispositioned

Round-1 DETECTOR-1: `proof-bg-deferred-ledger.mjs` matches only `BOOKED:` (colon-label) and scans only `.ts|.vue`,
so these ride invisible to the no-silent-drop machine. Each gets a terminal call here + is enrolled by
BI.W-LEDGER-DETECTOR-HARDEN.

| id | marker (file:line) | item | closes | TERMINAL disposition | liveness probe |
|----|--------------------|------|--------|----------------------|----------------|
| src:tabs-chromatic-rim | segmented-tabs.css:494-495 | "BOOKED successors: T1 cross-engine clone-loupe, chromatic-aberration RGB-split rim" | 1+ | **FOLD → BI.W-TABS-FACTOR / D-GLASS glass-simplify** — the RGB-split rim folds onto the shipped `--glass-edge-dispersion` axis (surfaces.css:505); the clone-loupe is a tabs-simplify concern | the marker must carry a `BOOKED:` label + an enrolled census row |
| src:tabs-dead-luma-sample | segmented-tabs.css:486 | "useGlassBackdropLuminance observer BOOKED, its animated sample path DEAD on disk" | 1+ | **RETIRE the dead-path note** — a DEAD animated sample path is not a book; strike the marker | no reference to a DEAD-on-disk path survives |
| src:button-press-row | Button.vue:97 | interactiveSpring press BOOKED "in the press SPRING_PRESETS row" | 1 | **MET → FOLD into BI.W-DEMETA/comment-scrub** — the `press` row SHIPS (springPresets.ts:23,53; response 0.15/ζ0.86); the marker is a stale cross-ref | assert the `press` preset row exists (it does); strike the stale BOOKED verb |
| src:constellation-spatial-hash-1 | constellation/constants.ts:114 | "GPU spatial-hash compute neighbor-bin BOOKED (dense-register successor)" | 2+ ⚠ | **RETIRE** — overfit substrate at default count=64; 0 consumers; a dense-register re-enters on a real high-count need | no un-consumed dense-register book survives |
| src:constellation-spatial-hash-2 | constellationField.ts:259 | same GPU spatial-hash successor | 2+ ⚠ | **RETIRE** — as above (the two are one idea) | as above |
| src:dock-persist-rail | DockLayerGroup.vue:352,360 (`BOOKED: AY.W-GOD1`) | persistent switcher rail surviving collapse | 2+ ⚠ | **FOLD → D-DOCK greenfield** — the greenfield establishes the chrome-slot rail natively (D29 routed BG.W-DOCK-DECOMPOSE but the dock re-opened) | dock greenfield provides the persistent rail; the AY.W-GOD1 book resolves |
| src:dock-specular-fold | useDockOrientationMorph.ts:196 | specular fold BOOKED "to its own wave per proof:dock-engine-unify" | 2+ ⚠ | **FOLD → D-DOCK greenfield** — the greenfield subsumes the dock morph engine | dock greenfield's engine census resolves the fold |
| src:dock-flip-fold | useLayerTransition.ts:37,40 (`BOOKED: AY.W-GOD1`) | useLayerTransition→dockMorphContext FLIP-engine fold | 2+ ⚠ | **FOLD → D-DOCK greenfield** — D28 routed BG.W-DOCK-MORPH-UNIFY; the greenfield subsumes (the fold-and-DELETE lands natively) | useLayerTransition DEFINITION-ABSENT post-greenfield |
| src:easing-oscillator | easing/README.md:65 | kf LIGHT `Oscillator` BOOKED (KF-TO-GLASSUI-BB-ASKS.md:47) | 1+ | **RETIRE the standing book** — foreign-tree consume-when-kf-ships; the picker's one-shot rAF travel is the shipped path; re-points when kf publishes Oscillator (by-name, no glass-ui wave owns it) | n/a — supplier edge; the `.md` arm enrolls it as a named external row |

---

## §4 — FOLD / RETIRE (FOLD-LEDGER bf-census + BE/BF DEFER rows + CLAUDE.md successors)

### 4a. Device/perf-gated DEFER rows → FOLD into the Safari/Metal verification band

| id | item | first-booked | closes | evidence | disposition |
|----|------|-------------|--------|----------|-------------|
| D8 | manual real-Safari-26-Metal goo-fission p50 (un-automatable) | BF | 2+ ⚠ | FOLD-LEDGER:52 | **FOLD → BI.W-DOCK-DEVICE (both Metal arms)** |
| D24 | BE.W-VIZ-PARITY-METAL cross-backend capture | BF | 2+ ⚠ | FOLD-LEDGER:68 | **FOLD → BI.W-DOCK-DEVICE (both Metal arms)** |
| D25 | always-on metaball-teardrop VH fidelity (perf-gated) | BC | 3+ ⚠ | FOLD-LEDGER:69 | **FOLD → D-DOCK greenfield** — the VH morph is a dock-greenfield concern (UF-C5); the teardrop fidelity is decided there |
| BF.W-GOO-SPLIT-PERF | goo-split real-Metal p50 | BF | 2+ ⚠ | FOLD-LEDGER:131 | **FOLD → BI.W-DOCK-DEVICE (both Metal arms)** |
| BE.W-VIZ-PARITY-METAL | real-Metal cross-backend viz-parity | BE | 2+ ⚠ | FOLD-LEDGER:115 | **FOLD → BI.W-DOCK-DEVICE (both Metal arms)** |

### 4b. Album-shade GL primitive → RETIRE (0 consumers, GL color-seam un-widened)

| id | item | first-booked | closes | evidence | disposition |
|----|------|-------------|--------|----------|-------------|
| D26 | album-derived per-piece shade as a LIBRARY primitive | BF | 2+ ⚠ | FOLD-LEDGER:70 | **RETIRE** — GL color-seam fence un-widened, 0 consumers; DockNowPlaying (its trigger) never landed; a fresh ≥2 re-enters |
| BE.W-DOCK-NOWPLAYING-PILL | now-playing pill needing album-shade | BE | 2+ ⚠ | FOLD-LEDGER:97 | **RETIRE** — the component was never built; `<Drawer live-behind>`/dock greenfield cover any surviving need |

### 4c. CLAUDE.md booked successors

| id | item | first-booked | closes | evidence (file:line) | disposition |
|----|------|-------------|--------|----------------------|-------------|
| cmd:aurora-medium-lazy | aurora-medium lazy-chunk split (blocked by GL fence — one FRAGMENT_SRC with if(uMedium==N)) | BB | 4+ ⚠ | CLAUDE.md §perf-producer ("BOOKED to a fence-widening successor"); aurora.frag.ts:448 single-src dispatch | **open_question → recommend RETIRE the lazy-split book** (§6.3) — the GL fence is IDENTITY (deep-glass-16px precedent); the mediums splice is the decided shape |
| cmd:wgsl-flow-tail | WGSL curl `flow.wgsl.ts` procedural tail | BB | — | `flow.wgsl.ts` ON DISK, consumed by liquid-grid + concentric + waveField (`CURL_FBM_WGSL`) | **MET (shared chunk landed)** → §5; the aurora-WGSL-curl arm alone stays degrade-to-fbm (RETIRE that arm — WebGPU-degrades-to-fbm is the decided posture) |
| cmd:useAsyncSearch | `useAsyncSearch` race-guard (BC BOOK not-minted) | BC | 3+ ⚠ | useDockSearch.ts:184 "no useAsyncSearch"; BC.W-FUZZY-HARDEN DECISION=BOOK | **RETIRE the standing book** — the client fuzzy needs no abort (no-contrivance fence); a real 2nd async consumer re-enters via a fresh trigger, no glass-ui wave owns it |
| cmd:chromatic-aberration-rim | chromatic-aberration RGB-split rim successor | BB | 3+ ⚠ | surfaces.css:505 `--glass-edge-dispersion` shipped (partial); segmented-tabs.css:495 full-RGB-split still booked | **FOLD → D-GLASS glass-simplify** — the edge-dispersion rim LANDED; the full RGB-split folds into the glass-refract census (or RETIRE if the dispersion rim suffices) |
| cmd:deep-glass-20px | deep-glass Apple 20px push | BB | — | glass-deep.css:3 "retired-at-16px"; :57-60 "16px IS the ceiling — IDENTITY, not debt" | **MET/RETIRED** → §5 (flip BE.W-DEEP-CEILING + BF.W-DEEP-GLASS-WIRE) |
| cmd:gesture-frame-recorder | W-GESTURE-FRAME-RECORDER (17.7) | BG | — | `scripts/lib/gesture-frame-recorder.mjs` ON DISK, consumed by BG.W-PAGE-COMPONENT-AUDIT | **MET (LANDED)** → §5 |
| cmd:dock-third-press | dock control as 3rd useSpringPress/useLiquidPress consumer | BB | — | DockIconButton.vue:12,135 wires useLiquidPress + `--dock-press-t` | **MET (LANDED)** → §5 |
| cmd:kf-snap-adopt | kf `DragOptions.snap` native adopt (=D27) | BF | — | useDragMorph.ts:325 `snap:`; kf `^5.2.0` | **MET (LANDED)** → §5 (flip D27) |
| cmd:glass-dialog-native-34 | native-`<dialog>` #34 pilot (=ax:glass-dialog-native-pilot) | AT | ~10 ⚠ | §1a row | **open_question → RETIRE standing-book** (§6.1) |

---

## §5 — MET / LANDED — flip-with-evidence (the round-1 stale-ledger corrections + already-terminal)

These are DECIDED-terminal; where the FOLD-LEDGER/AX-register still carries a stale DEFER, **flip it** with
the evidence below. A gate must carry the discharge probe so a landed adopt cannot ride green as still-DEFER.

| id | item | stale marker | on-disk truth (evidence) | flip-to | discharge probe |
|----|------|--------------|--------------------------|---------|-----------------|
| D27 | kf snap-option | FOLD-LEDGER:71 "DEFER-with-trigger" | useDragMorph.ts:325 `snap: targetsOf().map(t=>t.center)`; kf `^5.2.0` | **RESOLVED** (resolvedBy BH.B1-W3) | a DEFER-with-trigger whose trigger re-evaluates FIRED REDs |
| BE.W-DEEP-CEILING | deep-glass 20px | FOLD-LEDGER:90 "DEFER-with-trigger" | glass-deep.css:3 "retired-at-16px" | **RETIRED/SUPERSEDED** (by BG.W-DEEP-GLASS-DECIDE) | a DEFER whose idea was terminally-retired elsewhere REDs (dual-book detector) |
| BF.W-DEEP-GLASS-WIRE | deep-glass 20px | FOLD-LEDGER:122 "DEFER-with-trigger" | glass-deep.css:57-60 "16px IS IDENTITY, not debt" | **RETIRED/SUPERSEDED** (by BG.W-DEEP-GLASS-DECIDE) | as above |
| wants:alive-idle | BE.W-ALIVE-IDLE idle-breathe register | — | `grep alive-idle\|breathing-pill src`=0 | **RETIRE verified** | mechanism-absent-on-disk assert |
| wants:anticipate-follow | BE.W-ANTICIPATE-FOLLOW pre-dip register | — | `grep anticipate-follow src`=0 (curve pre-dip refs are the curve's own, not the register) | **RETIRE verified** | mechanism-absent assert |
| wants:aur-prism | BE/BF.W-AUR-PRISM uMedium==9 prism | — | uMedium==9 is now `mediumMetalGradient` (aurora.frag.ts:448) — prism never minted; `grep prism-medium`=0 | **RETIRE verified** | prism-medium-absent assert |
| wants:aur-reactive | BE/BF.W-AUR-REACTIVE uShimmer/album re-seed | — | `grep uShimmer src/components/custom/aurora`=0 | **RETIRE verified** | uShimmer-absent assert |
| wants:aur-satin | BE/BF.W-AUR-SATIN satin medium | — | `grep satin src/components/custom/aurora`=0 | **RETIRE verified** | satin-absent assert |
| wants:tab-ios-capsule | BE/BF.W-TAB-IOS-CAPSULE DockTabBar capsule | — | `grep DockTabBar src`=0 | **RETIRE verified** | DockTabBar-absent assert |
| wants:concentric-radius | BE.W-CONCENTRIC-RADIUS shared register | — | `grep --radius-concentric src/styles`=0; `containerConcentric` per-surface idiom KEPT (segmented-tabs.css:43) | **RETIRE (shared register) verified; KEEP per-surface idiom** | shared-register-absent + per-surface-idiom-present assert |
| ax:deck-subpath | `/deck` | register book | resolvedBy BC.W-DECK; `/deck` ships useDeck/DeckPager | **RESOLVED** | subpath-resolves probe |
| ax:completion-seal-family | CompletionSeal | register book | resolvedBy BC.W-AX-COMPLETION-SEAL; /completion-seal ships (BUT ships demo-only — see §6.4 watch) | **RESOLVED (public-surface graduation)** | subpath-resolves; ≥2-consumer stays a watch |
| ax:css-relative-color | oklch(from…) recipe | register book | resolvedBy BB.W-DARK-INK-WARM; dark-arm.css first live consumer | **RESOLVED** | `oklch(from` live-consumer probe |
| ax:styles-critical-split | /styles critical/deferred | register book | resolvedBy BC.W-CSS-CRITICAL; critical-partition.mjs + subpaths ship | **RESOLVED** | subpath + partition-manifest probe |
| ax:drawer-content-spring | --drawer-spring retune | register book | resolvedBy BB.W-DRAWER-ABROGATE; useDrawerSnap owns the engine (vaul abrogated) | **RESOLVED (premise superseded)** | house DRAWER_SNAP engine present |
| ax:speedtest-native-first-receive | metric-cell/stack receive | register book | resolvedBy BD; speedtest+sci-report import the subpaths (≥2) | **RESOLVED** | min-consumers ≥2 probe |
| ax:native-drawer-as-asChild | native-drawer as/asChild | (founding chronic) | retiredBy BB.W-NDA-DECIDE; host pruned AY 077fe58f; 0 consumers | **RETIRED-TERMINAL** | retired-row-carries-no-watch assert |
| ax:css-at-function | CSS `@function` | register retired | retired BD §P10; Baseline Limited/Chromium-only | **RETIRED-TERMINAL** | terminal-retired assert |
| ax:panel-host-primitive | GlassPanelHost | register archived | folded onto ConfiguratorLayer+dock+sheet; n:2 un-MET (1) | **ARCHIVED-TERMINAL** | archived honest-hold assert |
| ax:interruptible-reorder | interruptible reorder | register archived | useSortable splice-math covers it; n:2 un-MET (0) | **ARCHIVED-TERMINAL** | archived honest-hold assert |

---

## §6 — open_questions (user / orchestrator ruling owed)

1. **The Baseline-gated standing-book batch (8 rows):** cross-document-vt, css-scope-state, css-text-box-trim,
   css-interpolate-size, interestfor-previews, glass-dialog-native-pilot(#34), glass-native-select-pilot,
   directional-view-transition. Each is a native-successor-when-Baseline book, 0-1 consumers, ridden 5-10
   closes. **Recommendation: RETIRE the standing books wholesale** (kill the standing-book disease; re-enter
   via `@supports` the moment a touched SFC pays the diff, per the css-at-function precedent BD §P10). Ruling
   owed because it trades glass-ui's stated "migrate-FIRST-with-@supports-when-touched" policy against UF-P6
   "no legacy / no standing debt" — the honest terminal call is RETIRE, but the intent is worth an explicit
   confirm.

2. **inline-edit-primitive:** 3 divergent consumers (numeric-click / string-dblclick / contenteditable),
   convergence-gated, un-converged for 10 closes. **Recommendation: RETIRE-until-convergence** (the ONE
   genuinely-legitimate convergence-hold, but a decade-of-closes hold is itself the disease UF-P2 forbids). A
   converged 2nd contract re-enters via a fresh trigger. Ruling owed: build the converged primitive now, or
   retire?

3. **aurora-medium lazy-chunk split (cmd:aurora-medium-lazy):** blocked by the GL fence (mediums are spliced
   into ONE FRAGMENT_SRC with `if(uMedium==N)` dispatch; a module split needs a shader-content edit). The
   user's perf mandate (FAM-5) may want the split; the GL fence + the deep-glass-16px "IDENTITY not debt"
   precedent say leave it. **Recommendation: RETIRE the lazy-split book** (the spliced dispatch is the decided
   shape). Ruling owed because it is a perf-vs-fence architectural call.

4. **completion-seal + border-progress "born ≥2 by construction" (OFIT-2/3):** both ship as published subpaths
   with 0-1 real binary consumers; the CLAUDE.md "born ≥2 by construction" claims are FALSE at speedtest HEAD
   (border-progress.md consumer-evidence ABSENT; speedtest hand-rolls its own bar). **Recommendation:** retire
   /border-progress until the speedtest adoption actually lands (or file an honest 1-real-consumer evidence
   doc); keep /completion-seal on the evidenced-orphan WATCHLIST (flag demo-only in cut-notes). Ruling owed:
   retire border-progress now, or hold on the watchlist?

5. **The metrics sextet scope (UF-K1 / OFIT-4):** UF-K1 names metric-cell/metric-stack/instrument-chassis to
   move to speedtest. The lens found the full speedtest-only sextet (+ icon-tooltip, pulse, scrolling-text).
   **Recommendation:** relocate metric-cell/metric-stack (bespoke readouts) firmly; keep
   instrument-chassis/pulse/icon-tooltip/scrolling-text ONLY with an explicit "speedtest-primitive, ≥2 unmet"
   evidence doc, else relocate. Ruling owed: which of the sextet move?

6. **hover-popover Kronecker fold (UF-P7 / OFIT-7 / UF-J6):** the user asks "should hover-popover just become
   hover? melded into a perfected union?" hover-popover is literally reka HoverCard underneath (triplication
   with hover-card/popover) but clears the ≥2-consumer bar (atlas + fourier-analysis). Under the FAM-10
   mechanism-distinctness law its only distinct mechanism is keepDockOpen + label-tier default.
   **Recommendation:** FOLD hover-popover into hover-card as a `trigger="hover"` axis value carrying
   keepDockOpen (D-FACTOR anchored-overlay family), with a consumer migration ask — NOT retire outright.
   Ruling owed because it is the flagship D-FACTOR adjudication the user explicitly raised.

---

## §7 — The ~90 FOLD-LEDGER COORDINATED-to-BG rows (terminal-DONE, summarized not re-enumerated)

The bulk of FOLD-LEDGER.json (D1-D32 minus the DEFER subset, all `COORDINATED` BE.W-*/BF.W-* rows, the
in-src AY.W-GOD1 markers) were routed to a named BG wave that BUILT them — these are terminal-DONE and off the
deferred watch. **Caveat (round-1 FAM-1/FAM-3):** three of the BG waves REGRESSED at HEAD (the ratchet, the
demo-card collision, the dock band re-opened), captured as disease rows dis:ratchet-regrowth (§1c) and
dis:dock-chronic (§1b). The COORDINATED rows whose BG wave's work the dock greenfield SUBSUMES (D3/D4/D12-D22/
D28-D30, the dock/fission/rail/silhouette cluster) are re-homed into D-DOCK greenfield by §3's dock-fold rows —
the greenfield re-establishes them natively, so no separate re-book is owed. The spike-delete RETIREs
(D2/D16/D30/D32 useLiquidMorph/dead-signatures/dead-gates) landed clean per BG.W-SPIKE-DELETE and stay retired.

---

## §8 — Liveness-probe doctrine (the round-1 lesson, codified)

Every disposition above names a LIVENESS probe because the census gates verified STRUCTURE (row present /
decided / routed) but never LIVENESS. BI must add these trigger-fired probes to `proof:bg-deferred-ledger`
(and its BI successor):

- **re-stamp-count ceiling:** a `book` row re-stamped ≥2 tranches with its trigger still un-MET REDs (kills the
  re-stamp-never-decide disease that carried the 21 AX rows 8-10 closes).
- **fired-trigger RED:** a DEFER-with-trigger whose trigger now re-evaluates FIRED (a landed adopt, a Baseline
  graduation, a ≥2-consumer crossing) REDs (D27's stale DEFER is the exemplar).
- **dual-book RED:** an idea simultaneously terminally-RETIRED and still-DEFER REDs (the deep-glass 20px pair).
- **bare-word BOOKED forbidden + `.css` arm:** the §3 detector-harden (self-test bite proves a planted bare
  `BOOKED` flags).
- **binary-vs-demo consumer split:** proof:component-orphan must count binary (sibling+registry) consumers
  distinctly from demo+internal (kills the vacuous ≥2-green that greened border-progress).
- **phantom-owner RED:** a masking/ratchet owedBy/carve-successor that names no real waves/<id>.md REDs.

---

## ADDENDUM 2 (round-5 BI-R5-LEDGER-PHANTOM-ORPHANS reconcile — phantom wave names → the real roster)

| ledger name | real owner |
|---|---|
| BI.W-A11Y-SWEEP | the B8 a11y cluster: BI.W-SLIDER-THUMB-NAME + BI.W-SPLITCHARS-ARIA + BI.W-DEMO-SOURCE-SCAN (+ ESC-STACK's focus-trap arm) |
| BI.W-CENSUS-DETECTOR-HARDEN | BI.W-RATCHET-GROWTH (the detector/ledger-liveness contract) |
| BI.W-DEMO-CONTROL-WIRE | BI.W-GRAIN-WIRE (the story dead-ref audit rides it) |
| BI.W-MASKING-OWNER-RESOLVE | BI.W-AXES-GATES (the owedBy-resolve clause, round-4 addition) |
| BI.W-METRIC-FAMILY-RELOCATE | BI.W-METRICS-DEMO (disposition CORRECTED to STAY per XR-3; the demo redesign is the wave) |
| BI.W-RATCHET-REDRAIN | BI.W-STYLE-REDRAIN + BI.W-ENCAP-REDRAIN (B0) |
| BI.W-SAFARI-METAL-VERIFY | BI.W-DOCK-DEVICE (the visible-Safari batch) |

## ADDENDUM 3 (round-6 sweep-D substance corrections)

| row | corrected owner |
|---|---|
| BI.W-CENSUS-DETECTOR-HARDEN (+ W-LEDGER-TRUE-UP, W-LEDGER-DISCHARGE) | **BI.W-LEDGER-DETECTOR-HARDEN** (minted, B0) — the ADDENDUM-2 RATCHET-GROWTH repoint was substantively wrong and is superseded |
| BI.W-SAFARI-METAL-VERIFY | **BI.W-DOCK-DEVICE** (rescoped to BOTH arms: dock + the substrate-band viz/goo Metal p50; D24 discharges there) |
| ax:labeled-field-for-id + ax:speedtest-a11y-bundle | **BI.W-SLIDER-THUMB-NAME** (round-6 additions) |


## ADDENDUM 4 (closure-read fix — the body TRUE-UP executed)
The 7 phantom disposition targets are now resolved IN THE BODY (the addenda remain as the audit
trail of the reconciliation history). BI.W-LEDGER-DETECTOR-HARDEN clause (g) gates this class
henceforth: every disposition-target in this ledger's body must resolve to a real waves/<id>.md.
