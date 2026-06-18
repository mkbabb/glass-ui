# BC Deferral Sweep — the cross-tranche DEFERRAL-LEDGER seed (research corpus, iter-2 verified)

> Assignment: machine/docs sweep of AX/AY/AZ/BA/BB for the deferral vocabulary (BOOKED, booked-to,
> successor, HELD, deferred, next-tranche, pending, SPEC, rides W-REFLECT3, W-CLOSE, the
> DISPOSITION-REGISTER rows, the BB never-run batches). Each deferral: id · what+evidence (file:line) ·
> origin · status · a DECIDED BC disposition mapped to a BC band. This iteration VERIFIES the iter-1
> corpus with fresh greps + corrects two findings + grounds every count.
>
> **Method note (grounding):** all counts re-measured 2026-06-18 on `tranche/BB` HEAD. Every row carries
> a file:line or a measured wave-state. This is the DEFERRAL-LEDGER content for BC (maps to checklist
> box **BC.W-FOLD-LEDGER**, Band 0).

---

## §0 — THE ROOT FINDING (the disease, named + re-measured)

**BB never closed.** Confirmed: `docs/tranches/BB/FINAL.md` is ABSENT (every other tranche AY/AZ/BA
has one — AX also lacks one, but AX folded into AY's close). The authoritative run-state is
`docs/tranches/BB/PROGRESS.md`; the spec-header `**Status**: SPEC` is stale authoring-state (many
SPEC-headed waves are `complete` in PROGRESS — PROGRESS is the truth-of-execution).

**The single structural root cause of "source-green but visually-broken":** `BB.W-REFLECT3` (Batch 7)
— the *SINGLE authorized gestalt-verdict-flipper* and the *binding-π capture conductor* for the entire
BB visual band — **was NEVER RUN.** Confirmed `BB.W-REFLECT3.md:7` → `**Status**: SPEC`; PROGRESS row
→ SPEC.

**Re-measured deferral magnitude (2026-06-18):**
- `grep -rlE 'W-REFLECT3' docs/tranches/BB/waves/ | wc -l` = **48** wave specs reference W-REFLECT3.
- `grep -rhE 'rides? W-REFLECT3' docs/tranches/BB/ | wc -l` = **77** explicit "rides W-REFLECT3"
  deferral phrases across the BB corpus.
- **65** `*DELTA*.md` artefacts on disk under `docs/tranches/BB/audit/visual/` — yet NONE was
  gestalt-verdict-flipped by the authorized flipper (they are per-mechanism captures, not the holistic
  `proof:ba-gestalt` 8/8 the close demands).
- **119** `tests-visual/*.spec.ts` exist — the entire BB binding-π set — but `--run pi` (the real-device
  visual runner, `local`-tagged) **never ran on a real device**; CI proves enrollment, the local close
  proves paint, and the local close never happened.

EVERY one of the 48 waves closed `complete` source-side with the explicit deferral that its **binding π**
AND its **`proof:ba-gestalt` verdict** "ride W-REFLECT3":
- W-DOCK-MORPH-FAMILY (PROGRESS:72): *"π `tests-visual/dock-morph-family.spec.ts` rides W-REFLECT3"*
- W-BORDER-PROGRESS (PROGRESS:60): *"Binding π … + the gestalt verdict ride W-REFLECT3"*
- W-ON-GLASS-FG (PROGRESS:73): *"binding live capture rides W-REFLECT3"*
- W-LENSING (PROGRESS:123): *"π `tests-visual/lensing.spec.ts` (LOCAL real-GPU, rides W-REFLECT3)"*
- W-LIQUIDHOVER (PROGRESS:76); W-LIQUID-REVEAL (PROGRESS:121); W-AURORA-SWRASTER (PROGRESS:74);
  W-FLOWFIELD / W-AURORA-WGPU / W-GOOBLOB-WGPU / W-VIZ-POINTER / W-PHASE-PALETTE / W-CONCENTRIC /
  B1-aurora-curl-warp / W-PRESS-UNIFY / W-DRAG-MORPH / W-SCROLL-MOTION / W-GLASS-DEPTH (the whole glass +
  WebGPU-first viz + motion band) — all *"the binding live-π … gestalt capture rides W-REFLECT3."*

So the `proof:ba-gestalt` holistic acceptance gate — the structural answer BA *built* to kill the
per-mechanism-green/page-wrong close-class (P-1) — was **itself deferred to a wave that never ran.** The
dock+shell roster rows sit at an honest **REVOKED FAIL** (W-CHIP-GRAZE Batch 1 revoked their PASS;
W-DOCK-RAIL-SEAT-FINAL Batch 2 re-architected but is *not* the authorized flipper —
`BB.W-DOCK-RAIL-SEAT-FINAL.md:152`). The roster never grew to the BB primitives.

**W-REFLECT3 IS the most important deferral in the entire sweep — its non-execution is the direct
mechanical cause the user observed.** It maps to BC **Band 0** (BC.W-GESTALT-FIRST / BC.W-PAINT-GATE):
per-wave gestalt-first verification must SUPERSEDE the single-terminal-reflect; the ride-W-REFLECT3
pattern is structurally forbidden in BC.

`BB.W-CLOSE` (`BB.W-CLOSE.md:7` → SPEC) likewise never ran. **Crucially, `BB.W-CLOSE.md:24` IS the
14-row chronic-fold disposition table the user demanded** — every chronic mapped to its BB disposition
wave (native-drawer→DECIDE/W-NDA-DECIDE, perf→BUILD/W-LIGHTHOUSE, dock-rail-seat→BUILD, aria-invalid→MEET,
css-relative-color→MEET, Kuwahara→DECIDE, DELTA-reshoot→MEET, styles-critical-split→BUILD/W-CSS-CRITICAL,
scroll-fade→RETIRE, useGlassBackdropLuminance→HOLD, :5175→RETIRE, EasingPicker→BUILD, goo-uSatColor→BUILD-4.x,
the 28 disposition books→RESTAMP). The table was **authored but never EXECUTED at a close ceremony** —
several of its rows point at SPEC/never-ran waves (W-LIGHTHOUSE, W-CSS-CRITICAL, W-DECK), so those
dispositions did NOT land. BC.W-FOLD-LEDGER must inherit this table, re-decide the un-landed rows, and
EXECUTE the dispositions per-wave (not at one terminal close).

---

## §1 — THE BB NEVER-RUN WAVES (the authoritative SPEC/WIP set, re-measured)

Deduped from `docs/tranches/BB/PROGRESS.md` status column (2026-06-18). **CAUTION — the PROGRESS table
carries DUPLICATE rows for the viz suite + lineage-probe** (a roster line marked SPEC AND an execution
line marked complete; the BB.W-LEDGER-REPAIR column-by-header parser fix is exactly about this ambiguity).
The genuinely-never-run set is below; the viz/lineage waves DID land source-side (§1c).

### 1a — Batch 5 (CROSS-REPO ADOPT, DRIVEN) — the cross-repo close-loop, mostly SPEC
| wave | PROGRESS | what + evidence | BC disposition |
|---|---|---|---|
| W-ADOPT-RECONCILE | **SPEC** | the cross-repo adopt loop owned as ONE close-loop (`proof:adopt-loop` aggregator over `proof:consumer-staleness` + `proof:phantom-classes` + `proof:resolution` + the fourier `^3.1.0`→`^4.0.0` re-pin + the 4 EXT re-flags). `BB.W-ADOPT-RECONCILE.md:1,6`. Born-RED: three disconnected sibling-skip gates, no aggregator. | **BC Band 10 — BC.W-SPEEDTEST-ADOPT / BC.W-FOURIER-ASK** (the adopt loop is the 4.0.1→4.1.0 cross-repo unblock; BUILD the aggregator) |
| W-SLIDES-DRIVE | **SPEC** | drive slides Tranche N: the 6-major build-spine lift (glass-ui ^4 + kf ^4.3 + TS6/vue-tsc3/vite8/vue-router5/pptxgenjs4) + Phase-2 deck consume-back at 4.1.0. `BB.W-SLIDES-DRIVE.md`; PROGRESS:86. | **BC Band 10 — BC.W-CUT** (slides redeploy is EXECUTION-phase) |
| W-LEAF-MODERNIZE | **SPEC** | leaf-publisher modernization (value.js orphan-delete/1.0.0-decided, kf .npmrc-delete, pencil-boil TS6, latex-paper peers). Foreign-tree, USER-DOMAIN publishes. PROGRESS:91. | **BC Band 10 — HOLD-with-rationale** (USER-DOMAIN, by-name asks; coordination-only) |
| W-CONSUMER-MODERNIZE | **SPEC** | consumer modernization (fourier/speedtest/sci-report + 3 new spine consumers words-frontend/bbnf-playground/bbnf-buddy + the Atlas `^4.1.0` bump). PROGRESS:92. | **BC Band 10 — BC.W-ATLAS-ASK + BC.W-SPEEDTEST-ADOPT** |
| W-PEER-SPINE | FOLDED→Batch C (W-SPINE-LATEST) | the value `^0.13.0` IDENTITY widen — DONE pre-Batch-0. PROGRESS:83. | DONE (recorded — not a BC carry) |

### 1b — Batch 7 (CLOSE) — entirely SPEC (the close never happened)
| wave | status | what + evidence | BC disposition |
|---|---|---|---|
| W-REFLECT3 | **SPEC** | the fresh whole-page gestalt reflection; the SINGLE authorized verdict-flipper for ~48 waves; the roster-growth + the dock/shell RE-RE-REFLECTION + `--run pi` on real device. `BB.W-REFLECT3.md:7`. | **BC Band 0 — BC.W-GESTALT-FIRST + BC.W-PAINT-GATE** (THE DISEASE ROOT; per-wave gestalt-first supersedes one-terminal-reflect) |
| W-CLOSE | **SPEC** | the 4.1.0 honest cut + the 14-row chronic-fold disposition table (`BB.W-CLOSE.md:24`) + the lineage map + `proof:bb-final` 9-clause meta-gate. `BB.W-CLOSE.md:6,7`. | **BC Band 0/10 — BC.W-FOLD-LEDGER inherits the §24 table; BC.W-CUT executes the cut** |

### 1c — The viz suite + lineage-probe — DID land source-side (the PROGRESS dup-row trap)
The roster lines (PROGRESS:153-157) carry `SPEC`, but the EXECUTION lines (PROGRESS:63-70, 88-vs-99) carry
`complete`/`DONE`/`live-verified`. The task-list (#281-290) + the on-disk DELTAs confirm these LANDED:
- W-GPU-SUBSTRATE (PROGRESS:63 → DONE), W-AURORA-WGPU (70 → complete), W-GOOBLOB-WGPU (67 → complete/live-verified),
  W-FLOWFIELD (65 → complete), W-CONCENTRIC (64 → complete), B1-aurora-curl-warp (66 → complete),
  W-VIZ-POINTER (152 → complete), W-LINEAGE-PROBE (99 → complete; the 88-SPEC line is the generalized-scope
  roster row), W-CROSSREPO-ASKS (89 → complete). **ONLY their binding π + parity captures ride W-REFLECT3**
  (structural-proxy ΔE 0.0 captures on disk; the live Metal-GPU + on-host paint capture deferred).
- BC note: the SOURCE landed; the PAINT is unverified-on-real-host (the audit's D8'/D9' — the WebGPU
  no-adapter throw is noisy + the user saw aurora as a black void). → **BC Band 4 re-verify on real host;
  do NOT re-build from scratch (the architecture is sound, the robustness + cross-engine + on-host-verify
  are the gaps).**

### 1d — The perf chronic (AY→BB→BC, zero gate ever fired)
| wave | status | what + evidence | BC disposition |
|---|---|---|---|
| W-LIGHTHOUSE | **SPEC** | the 3-4-tranche perf chronic; `proof:lighthouse` (re-runnable prod `vite preview` Lighthouse floor on `:5388`). PROGRESS:38: *"the 3-4 tranche chronic, zero gate."* Also AY.FINAL:86 named-successor deferred. | **BC Band 8/perf — BUILD** (the user's "aurora renders SLOW") |
| W-CSS-CRITICAL | **SPEC** | the render-blocking critical/deferred `/styles` split (`proof:css-critical`). PROGRESS:39. ALSO the `styles-critical-split` disposition-book's BUILD destination (`pendingResolvedBy: BB.W-CSS-CRITICAL`). **The BUILD never landed.** | **BC Band 8/perf — BUILD** (discharges the STILL-OPEN disposition book — §2 correction) |
| W-PERF-PRODUCER | **WIP** (source-GREEN; π local-pending) | the value.js A′ perf-producer cluster (dock-morph `contain`, dock-glyph density, aurora-wash DPR, zombie-canvas guard). PROGRESS:41. Source landed; binding π NOT run. | **BC Band 0/8 — re-verify the π** (live but unverified-on-paint) |

### 1e — W-DAG-RECONCILE (the missed doc-coherence wave)
`W-DAG-RECONCILE | SPEC` (PROGRESS:147) — *"update EXECUTION-DAG to the full post-amendment spine +
reconcile the residual stale counts; a doc-coherence wave (Batch-0-adjacent)."* Never ran. → **BC Band 0**
(fold into the BC scaffold-coherence; low-priority doc-sync, HOLD-or-fold).

---

## §2 — THE DISPOSITION-REGISTER (`docs/tranches/AX/audit/DISPOSITION-REGISTER.json`) — 31 rows, parsed

Re-parsed (2026-06-18): **31 items — 1 retired · 2 archived · 28 book**, every row `trigger.kind:
min-consumers, n:2`, every row `reStampedAt: BB`. **TWO rows carry `pendingResolvedBy`:**

### 2a — CORRECTION to iter-1 §2 (the load-bearing finding):
- `css-relative-color` → `pendingResolvedBy: BB.W-DARK-INK-WARM`. **DISCHARGED** (W-DARK-INK-WARM complete
  — the dark `--surface-tint-*` arm re-expressed as `oklch(from …)`). The 2 prose-only `oklch(from …)`
  hits re-pointed. NO BC carry.
- `styles-critical-split` → `pendingResolvedBy: BB.W-CSS-CRITICAL`. **STILL OPEN.** W-CSS-CRITICAL is
  **SPEC (never ran)**, so the BUILD did NOT land. `proof:disposition-live` flips
  pendingResolvedBy→resolvedBy *"at the BB close when the build lands"* — and **the close never ran**,
  so the gate never caught it as un-discharged. This is a genuine open book the register's own machinery
  could not flag (because the flip is close-gated). → **BC Band 8/perf — BUILD discharges it.**

### 2b — The retired/decided rows (terminal — recorded for completeness, NOT a BC carry)
| id | disposition | resolution | BC note |
|---|---|---|---|
| native-drawer-as-asChild | **retired** (`retiredBy: BB.W-NDA-DECIDE`) | the FOUNDING 5-tranche chronic, RETIRE-with-rationale: host pruned at AY (077fe58f), trigger 0/8, covered by `<Drawer live-behind>`. successor: `<Drawer live-behind>` + glass-dialog-native-pilot (#34). | TERMINAL — re-enters only through #34's own NEW ≥2 trigger. NO BC carry. |

### 2c — The 2 archived rows (honest hold, watch active)
- `panel-host-primitive` — 1 consumer (bbnf-buddy LeftToolsDock) < 2; dock + sheet cover the need. HOLD.
- `interruptible-reorder` — 0 consumers; no present consumer asks for mid-gesture re-grab. HOLD.

### 2d — The 28 booked rows (the honest-hold long-tail; each `min-consumers n:2` un-MET at BB)
deck-subpath · button-icon-sm · dock-select-clamp-label · tooltip-mono-variant · select-size ·
spring-crisp-token · metric-badge-icon · completion-seal-family · labeled-field-for-id ·
speedtest-a11y-bundle · raf-loop-demand-park · styles-critical-split · cross-document-vt · css-scope-state
· css-at-function · interestfor-previews · css-text-box-trim · css-interpolate-size · css-relative-color
(discharged) · glass-dialog-native-pilot · glass-native-select-pilot · inline-edit-primitive ·
labeled-slider-readout · directional-view-transition · drawer-content-spring · cartoon-quiet-preset ·
speedtest-native-first-receive · keyframes-prune-migration-dag.

**BC disposition for the register (the FLIP vs HOLD decision):**
- `deck-subpath` — the trigger is **MET** (speedtest survey + slides = 2 repos) and W-DECK was SPEC'd to
  discharge it but **NEVER RAN** → `@mkbabb/glass-ui/deck` does not exist at HEAD (PROGRESS:71 → SPEC). →
  **BC Band 10 — BUILD** (the speedtest + slides consume-back) **or RE-DECIDE the deck-subpath flip.**
  This is a chronic BB *claimed* (the §24 table named the BUILD) but did not land.
- `styles-critical-split` — BUILD destination never ran → **BC Band 8 — BUILD** (discharges, see §2a).
- `spring-crisp-token` — DECIDED no-op at BB.B9 (1 live speedtest consumer self-hosting an override;
  `proof:spring-crisp` is the no-op-decision gate). **HOLD-with-rationale** unless a BC wave lands a 2nd.
- `inline-edit-primitive` (5-tranche carry, 3 divergent consumers) + `labeled-slider-readout` (2 divergent)
  — legitimate divergence holds; **HOLD** unless BC converges them in the controls band (Band 6).
- The CSS-feature books (css-scope-state, css-at-function, interestfor-previews, css-text-box-trim,
  css-interpolate-size, cross-document-vt, directional-view-transition) — Limited/experimental Baseline;
  **HOLD-with-rationale**, graduate at Baseline Widely. (NOTE — BC's WebGPU mandate proves Baseline can
  move fast: re-check each at BC time; `cross-document-vt`/`directional-view-transition` may have moved.)
- The speedtest/value.js-owned books (speedtest-a11y-bundle, speedtest-native-first-receive,
  metric-badge-icon, raf-loop-demand-park, labeled-field-for-id, keyframes-prune-migration-dag,
  button-icon-sm, select-size, dock-select-clamp-label, tooltip-mono-variant, completion-seal-family,
  cartoon-quiet-preset, drawer-content-spring, glass-dialog-native-pilot, glass-native-select-pilot,
  panel-host-primitive) — the RECEIVE is the consumer's (inv-16) or genuine <2-consumer divergence;
  **HOLD-with-rationale**, re-evaluate at the BC cross-repo Band 10. (Several control-size books —
  button-icon-sm/select-size/dock-select-clamp-label — could converge if BC.W-CONTROL-SMOOTH mints a
  control-size vocabulary; re-evaluate there.)

The register is machine-locked by `proof:disposition-live` + the BB decided-destination clause and is
HEALTHY (`uncovered:[]`); the only BC actions are the two FLIPs above + the documented HOLD long-tail.

---

## §3 — THE AY-DEFERRED NAMED-SUCCESSORS (`docs/tranches/AY/FINAL.md §6`)

AY closed `complete` with named-successor deferrals (`AY/FINAL.md:40,46-110,200-202`). Re-verified:
| AY-deferred wave | what (FINAL line) | BB outcome | BC disposition |
|---|---|---|---|
| W-LIGHTHOUSE | the Lighthouse perf-budget audit (FINAL:86 `planned`, named-successor deferred, no green run owed). | BB SPEC'd `proof:lighthouse` — **NEVER RAN** (still the 3-4-tranche zero-gate chronic). | **BC Band 8 perf — BUILD** (the chronic crosses AY→BB→BC) |
| W-LIQUID | the liquid-glass specular fold (FINAL:106 `planned`, named-successor deferred). | FOLDED into W-LIQUIDHOVER + W-MORPH-SHOWCASE (useLiquidFlex) + W-LIQUID-REVEAL — all `complete` source-side. | DONE source-side; the π ride W-REFLECT3 → **BC Band 0/1 re-verify** |
| W-AUR-T5 | minted by W-AUR-STUDIO §6 (FINAL:64; the T5 dead-pointer re-eval; named-successor deferred). | **DECIDED at BB.W-AUR-KUWAHARA** (complete) — BUILD: the soft anisotropic-Kuwahara medium. The 3-tranche residual ended. | DONE (Kuwahara landed); the no-pinwheel π rides W-REFLECT3 → **BC re-verify** |
| W-MOTION3 / residual | the live-parameterized `steppedEase(n, term)` generator (the MOTION2 G7 defer). | FOLDED into W-EASING-PRIMITIVE (the EasingPicker composes value.js `steppedEase`). | DONE source-side; π rides W-REFLECT3 |
| W-SB2 / W-SB3 | storybook-meta waves (FINAL:88-89 `planned`, named-successor deferred). | NOT discharged in BB. | **BC Band 9 — BC.W-STORYBOOK-META** |
| W-AUR1 / W-BLOB1 / W-FF1 | the rebuild-band folds (FINAL:51-53 `planned`, folded, no green run owed). | folded into the AY aurora/blob/fourier rebuild bands. | DONE (recorded) |
| W-PUB1 | the master-merge + `v3.10.0` provenance publish (FINAL:110 USER-DOMAIN, runs AT tag boundary). | the AY publish (3.10.0) landed via CI. | DONE (recorded) |

---

## §4 — THE AZ-DEFERRED NAMED-SUCCESSORS (`docs/tranches/AZ/FINAL.md §6`, lines 137-165)

| AZ-deferred | what (FINAL line) | BB outcome | BC disposition |
|---|---|---|---|
| W-MOTION3 | live-parameterized `steppedEase(n, term)` generator (MOTION2 G7 defer). | folded → W-EASING-PRIMITIVE. | DONE source-side |
| embla-on-overflow fold | promote the dock-rail chip strip to embla `Carousel` if a facet set overruns the inline budget (FINAL:147 booked, not built; most carry 2-4 chips). | not built. | **BC Band 2 — HOLD-with-rationale** (the dock rail IS a BC focus: BC.W-DOCK-STACK-RAIL — re-evaluate whether the scrollable n-stack rail needs embla momentum) |
| SHELL-IA-N1 desktop double-carousel | the facet strip beside sidebar AND above bottom dock (logged S3). | not built. | **BC Band 2 — HOLD** (a successor weighs collapsing one; defer to the dock rebuild) |
| useGlassBackdropLuminance promotion | on the booked 2nd-binary trigger (FINAL:150; `docs/consumer-evidence/use-glass-backdrop-luminance.md`); demo-private, dock-only consumer. | re-stamped BOOK at BB; STILL demo-private. | **BC Band 1 — BC.W-ADAPTIVE-RECONCILE** (D1: the luminance observer is DECORATIVE — `--glass-backdrop-luma` is WRITTEN but NOTHING reads it; BC must close the observer loop. This is the glass-too-grey root.) |
| AY W-DELTA0 stale-hash re-captures | the 5 AY DELTAs drifted hash-stale; FINAL:153 — the next tranche's Batch-0 owes the re-capture sweep (RED under `--strict-freshness`). | **DISCHARGED at BB.W-DELTA-RESHOOT** (complete) — re-shot on live :5199 + re-stamped; `proof:live-verified-ledger:strict` ARMED. | DONE |
| R5-9 deck PAGE-TURN primitive | lift the slides `[data-state]{active\|prev\|next}` + `--turn-*` tokens wholesale on wave cadence. | cross-linked to W-DECK (SPEC, never ran). | **BC Band 10 — BUILD with W-DECK or re-decide** |
| R5-10 glass menu-row + panel-section | the `.glass-menu-row` CVA + `.glass-menu-section` recipe (slides DeckSettings reference). | **DISCHARGED at BA.W-MENU-GLASS**. | DONE |
| portal-capture discipline | captures of teleported portals must drive `?dark`/`?light` param, not a class toggle (precept-candidate). | not formalized as a precept. | **BC Band 0 — fold into BC.W-PAINT-GATE** capture discipline |

---

## §5 — THE BA-DEFERRED NAMED-SUCCESSORS (`docs/tranches/BA/FINAL.md §6`, lines 194-266)

| BA-deferred | what (FINAL line) | BB outcome | BC disposition |
|---|---|---|---|
| The ~28 DISPOSITION-REGISTER BOOK rows | re-stamped un-MET; FINAL:215-217 DISCHARGED at BB.W-DISPOSITION-RESTAMP (decided, not re-booked). | DONE (W-DISPOSITION-RESTAMP complete; see §2). | the register stands; BC holds the long-tail + the 2 FLIPs |
| css-relative-color opportunistic fold | the 2 `oklch(from …)` comment hits (FINAL:217); folds when a tint recipe pays the diff. | DISCHARGED at BB.W-DARK-INK-WARM (MEET). | DONE |
| button-icon-sm + select-size | folds on a future control-size-vocabulary wave. | re-stamped BOOK un-MET. | **BC Band 6 — HOLD** (re-evaluate if BC.W-CONTROL-SMOOTH converges a control-size vocabulary) |
| DC-EXT-1/2/3/4 (externally-owned re-flags) | tabs-migration rows (fourier ×3, words ×2) · fourier phantom-classes (Q.W4 Lane-F patch, `proof-phantom-classes.mjs:105-113` `KNOWN_PENDING`) · value.js self-alias (`proof-resolution-contract.mjs:76-82` `SELF_ALIAS_PENDING`) · bbnf-lang/playground hard-alias (DOCUMENTED-EXPECTED). Receiver wave is in EACH CONSUMER's tranche (inv-16). FINAL:235-236. | re-stamped; W-ADOPT-RECONCILE (SPEC) was meant to own the loop — **NEVER RAN.** The `PROOF_PHANTOM_ALLOW_PENDING=1` + `[pending]` env escapes are the multi-tranche cross-repo chronic. | **BC Band 10 — the adopt loop is OPEN; BC.W-SPEEDTEST-ADOPT / BC.W-FOURIER-ASK / BC.W-ATLAS-ASK** build the `proof:adopt-loop` aggregator + reconcile the EXT flags |
| R5-9 deck PAGE-TURN + directional-view-transition | the two halves of the slides page-transition future; cross-linked, neither fires alone; `--vt-direction` driver. | both re-stamped BOOK; W-DECK (SPEC) never ran. | **BC Band 10 — BUILD with W-DECK / W-SLIDES-DRIVE or re-decide** |
| W-EASING-PRIMITIVE | the fourier C-3 book (StepsEditor → published EasingPicker; value.js's 3 forks = consumer #2). | **DISCHARGED at BB.W-EASING-PRIMITIVE** (complete). | DONE source-side; π rides W-REFLECT3 → re-verify |
| The chip-graze | IconChip section-color chip grazing the input affordance on the densest forms route at narrowest desktop width (FINAL:152 — W-DOCK-SECTIONS booked it; an accepted graze, named successor). | **DISCHARGED at BB.W-CHIP-GRAZE + W-DOCK-RAIL-SEAT-FINAL** (band-agnostic `chipOverMain:false`). | DONE source-side; the dock/shell gestalt verdict rides W-REFLECT3 (REVOKED-FAIL never re-flipped) → **BC Band 2/5 re-verify** |
| The value.js C-1 4.x block (BA-VJS-5) | per-satellite derived color (`uSatColor=0`); arm B = book to a 4.x point release (widen the GL fence via triumvirate). `src/components/custom/goo-blob/types.ts:299`. FINAL:38. | re-stamped BOOK; the GL color-seam fence NOT widened. | **BC Band 4 — HOLD-with-rationale** (the goo-blob first-principles rebuild BC.W-GOOBLOB-MEATBALL may absorb it; re-decide there) |
| W-DOCK-SECTIONS direction (b) HELD | the separator IS the rail (seam-derived anchor, dual ±40 overrun); FINAL:43 the tripartite `<DockSection>` in BOTH shells. | the §1 direction (b) HELD as the shipped model. | DONE source-side; the rail gestalt rides W-REFLECT3 → **BC Band 2 re-verify** (the user: "rail totally wrong") |
| useGlassBackdropLuminance promotion | on the booked 2nd-binary trigger (FINAL:259, carried from AZ). | still demo-private. | **BC Band 1 — BC.W-ADAPTIVE-RECONCILE** (same as §4) |

---

## §6 — THE TECHNICAL SUCCESSOR BOOKINGS (live in src/ + BB wave specs) — T1-T12, re-grounded

These are concrete feature-deferrals booked to named/phantom successor waves — the user's "every
procedural animation audited + fully modernized" + "all asks addressed" demand BC to DECIDE each. Every
marker re-verified on disk 2026-06-18.

| # | id / marker | what + evidence (file:line) | origin | BC disposition |
|---|---|---|---|---|
| T1 | teardrop V↔H morph fidelity | the metaball-teardrop V↔H morph is a perf-gated PREVIEW; the VT-crossfade ships because the teardrop missed the 4×-throttle 16.7ms budget (AZ p50 13.7-15.1ms). `BA.W-DOCK-MORPH-INSITU.md:18,181`; `AZ.W-MORPH-SHOWCASE.md:150`. Always-on teardrop BOOKED with `gperf-{v2h,h2v}.json` trace. | AZ.W-MORPH-SHOWCASE → BA.W-DOCK-MORPH-INSITU (DC-REC-4) | **BC Band 2 — BC.W-LIQUID-MORPH** (the user demands arbitrary-shape morph, never-white, never-invisible; the §7 mechanical-fall must re-run on the BC engine; if BC goes WebGPU-everywhere the budget changes — re-decide the number) |
| T2 | chromatic-aberration RGB-split rim | the `--glass-lens-chroma` knob (default OFF, perf-gated, 3 per-channel SVG displacement passes — "unmistakably iOS glass"). `BB.W-LENSING.md:129,187`; `src/styles/glass-refract.css:85` ("the perceived rim band on a successor re-bake"). The GL-color seam fence NOT widened. | BB.W-LENSING (R1/R2 TOP-FLOURISH) | **BC Band 1 — BC.W-GLASS-LEGIBILITY-MEASURED / BC.W-BUTTON-GLASS-IOS** (the user wants increased glass-morphism; re-decide whether the chroma rim ships in the iOS-27 glass rebuild) |
| T3 | W-FOURIER-GPU (PHANTOM) | FourierField stays Canvas2D; migrate to WebGPU line-instancing when harmonic density scales to thousands of phasors. `src/components/custom/fourier-field/README.md:183-192` (`no-migrate` row, reason recorded); `W-VIZ-SUITE.md:395,506`. NO own spec (phantom-successor name). | BB.W-VIZ-SUITE | **BC Band 4 — BC.W-WEBGPU-EVERYWHERE + BC.W-VIZ-FOURIER** (the user demands WebGPU EVERYWHERE, NO canvas anywhere, AND fourier collapses to ONE view; DIRECTLY contradicts the no-migrate book → BC must BUILD the WebGPU migration AND kill the duplicate views) |
| T4 | W-AURORA-WGPU-MEDIUMS (PHANTOM) | the painterly-medium WGSL bodies (van-Gogh/oil/oil-pastel/Kuwahara) for the WebGPU aurora primary; a painterly-medium config on WebGPU degrades to the smooth core. `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts:17-18,321-322`. NO own spec (appears only in src/ comments + README). | BB.W-AURORA-WGPU + BB.W-AUR-KUWAHARA | **BC Band 4 — BC.W-WEBGPU-EVERYWHERE + BC.W-VIZ-AURORA** (if WebGPU is the only path on Safari-capable hosts, the medium bodies MUST port — no fallback to WebGL2; BUILD) |
| T5 | KF-OSCILLATOR / kf `Oscillator` loop | the EasingPicker's `loop` playback seam awaits the keyframes.js LIGHT `Oscillator`; named-successor consume, NOT a blocking dep. `src/components/custom/easing/README.md:62-67`; `KF-TO-GLASSUI-BB-ASKS.md:47`. | BB.W-EASING-PRIMITIVE (kf-owned) | **BC Band 7 — HOLD-with-rationale** (kf-owned, by-name ask; slots in when kf ships it. BC.W-MOTION-ONE-CLOCK may revisit) |
| T6 | full 20px deep-glass blur | the deep tier lands at 16px (in [14,20]); the full Apple 20px is a BOOKED successor with the recorded throttle number. `src/styles/tokens/glass-deep.css:26`. | BB.W-DEEP-GLASS | **BC Band 1 — BC.W-GLASS-IDENTITY** (the user wants iOS-27 increased glass-morphism; re-decide whether 20px ships with the measured throttle) |
| T7 | value.js 0.13.0 `oklchSpectrum` CONSUME | BorderProgress's `useBorderSpectrum` is a glass-ui-local interim; re-points onto value.js's named helper on the 0.13.0 ship (consume-and-delete). `src/components/custom/border-progress/composables/useBorderSpectrum.ts:5` (`// CONSUME(value.js 0.13.0 oklchSpectrum):`). | BB.W-BORDER-PROGRESS | **BC Band 10 — coordination** (value.js publishes; glass-ui consumes-and-deletes). HOLD-with-rationale until value.js ships the helper |
| T8 | transform-squish-reconcile successor | W-DOCK-MORPH-FAMILY books a transform-squish reconcile. PROGRESS:72. | BB.W-DOCK-MORPH-FAMILY | **BC Band 2 — fold into BC.W-DOCK-ENGINE** (the morph rebuild) |
| T9 | scroll-pin JS fallback leaf | `.scroll-pin` JS fallback "BOOKED only on a material engine-gap reveal — never a JS scroll lib". `src/styles/scroll-choreography.css:223`. | BB.W-SCROLL-MOTION | **BC Band 7 — HOLD** (native `timeline-scope` is the path; JS leaf only on a real engine gap) |
| T10 | base64-fonts deferred-split | the font base64 KEPT; the W1-close deferred the separate-files split (AM-W7-δ). `src/styles/fonts.css:36`. | BB.W-PAYLOAD-DEFER | **BC Band 8 perf — HOLD** (paid-diff-only) |
| T11 | useLayerTransition / DockLayerGroup → AY.W-GOD1 FLIP-engine fold | the standalone FLIP engine is BOOKED to fold onto the dock's single morph orchestrator. `src/components/custom/dock/composables/useLayerTransition.ts:37,40`; `DockLayerGroup.vue:334,342-343`. | AY.W-GOD1 (booked) | **BC Band 2 — fold into BC.W-DOCK-ENGINE** (the single-orchestrator rebuild absorbs it) |
| T12 | glass-refract runtime scale-reconstruction | the data-URI `feDisplacementMap scale` cannot be CSS-`var()`-driven (CSSWG #542); the runtime scale-animation reconstruction is the booked encoding-successor. `BB.W-LENSING` PROGRESS:123; `src/styles/glass-refract.css` (the bevel-band note). | BB.W-LENSING | **BC Band 1 — fold into the glass rebuild** (re-decide the in-document-SVG mount path) |
| T13 (new) | W-FOURIER-GPU + W-CONSTELLATION-GPU dual no-migrate | BOTH Canvas2D viz carry a `DO NOT MIGRATE (now)` parity-table row + a booked GPU successor. `W-VIZ-SUITE.md:395-396,506-507`; `PROCEDURAL-SUITE.md:70-71,93`; `fourier-field/README.md:183-192`. NEITHER has an own spec. | BB.W-VIZ-SUITE | **BC Band 4 — BC.W-WEBGPU-EVERYWHERE + BC.W-VIZ-FOURIER + BC.W-VIZ-CONSTELLATION** (the user: WebGPU everywhere, NO Canvas2D viz, constellation hi-res — DIRECTLY contradicts both no-migrate books → BUILD both migrations) |
| T14 (new) | W-BUTTON-TONE (PHANTOM) | the destructive/accent tinted-glass arm — a CONSUME of W-FEEDBACK-TONE's colored-glass recipe (a destructive button reads as red GLASS, not a red slab); `solid` stays the opaque escape. `BB.W-BUTTON-GLASS.md:130,187`. NO own spec (booked successor name). | BB.W-BUTTON-GLASS | **BC Band 1/6 — BC.W-BUTTON-GLASS-IOS** should ABSORB or DECIDE (the semantic-fill congruence the user's "increased button glass-morphism" implies) |
| T15 (new) | W-GOO-COLOR book (the §24 row) | the goo `uSatColor` per-satellite color → BUILD-4.x book (the BA-VJS-5 T-row's BB-side name). `BB.W-CLOSE.md:24`. Same underlying defer as T-block BA-VJS-5 / `goo-blob/types.ts:299`. | BB.W-CLOSE §24 table | **BC Band 4 — re-decide in the goo-blob first-principles rebuild** (BC.W-GOOBLOB-MEATBALL) |

---

## §7 — THE PHANTOM-SUCCESSOR + UNRESOLVED MARKERS (re-verified: 4 phantom wave-names, 0 own specs)

Confirmed by grep (`ls docs/tranches/BB/waves/BB.<name>.md` → NO-SPEC for each):
- **W-BUTTON-TONE** — referenced in 1 BB spec (`W-BUTTON-GLASS.md:130,187`), NO own spec. → T14, BC Band 1/6.
- **W-FOURIER-GPU** — referenced in 1 BB spec + 2 src/ files (`W-VIZ-SUITE.md`, `PROCEDURAL-SUITE.md`,
  `fourier-field/README.md`), NO own spec. → T3/T13, BC Band 4 (the no-migrate book BC must overturn).
- **W-CONSTELLATION-GPU** — referenced in 1 BB spec + 2 src/ files, NO own spec. → T13, BC Band 4.
- **W-AURORA-WGPU-MEDIUMS** — appears ONLY in src/ comments + the aurora README (0 BB specs), NO own
  spec — a pure future-tranche name. → T4, BC Band 4.
- **W-KF-CONSUMER** — referenced in 1 BB spec (PHANTOM — no spec exists). The fourier-8 re-points + bbnf
  alias landed under it at AZ batch 5 (commit `636adeae`); the keyframes-arm "honestly DROPPED on the
  scope-reveal." BC: confirm no dangling reference; the kf consume is by-name (Band 10).
- **W-AUR-T5** — referenced in 1 BB spec, NO own spec — but DECIDED at BB.W-AUR-KUWAHARA (the residual
  ended; see §3). The phantom name is now genealogy, not a live carry.

---

## §8 — THE PRIOR-TRANCHE ONBOARD CHAIN (AT W0-L4 → AY.W-CARRY → the register)

`docs/tranches/AY/audit/deferred-ledger-manifest.json` records the full bookId set (31 ids) AY
onboarded from the AT W0-L4 ledger + the G-4/5/6 AX-promised rows. The register is the machine MIRROR of
that ledger (the register-completeness clause in `proof-disposition-live.mjs` cross-checks every manifest
bookId against the items set). This chain is HEALTHY (machine-locked, `uncovered:[]`). BC inherits it
as-is; the only BC actions are the two FLIPs (§2 — deck-subpath, styles-critical-split) + HOLD-with-
rationale the rest. NO BC carry beyond the two un-landed BUILD destinations.

---

## §9 — SYNTHESIS — the deferral classes mapped to BC bands

1. **The terminal-reflect deferral (THE ROOT).** 48 BB visual waves / 77 "rides W-REFLECT3" phrases
   deferred their binding π + gestalt verdict to W-REFLECT3, which never ran. 119 tests-visual specs never
   ran `--run pi` on a real device. 65 DELTAs on disk but ZERO verdict-flipped by the authorized flipper.
   → **BC Band 0** (per-wave gestalt-first, the ride-W-REFLECT3 pattern forbidden). The dock+shell sit at
   REVOKED-FAIL never re-flipped.
2. **The never-run close (Batch 5 + Batch 7 + W-DAG-RECONCILE).** W-ADOPT-RECONCILE, W-SLIDES-DRIVE,
   W-LEAF-MODERNIZE, W-CONSUMER-MODERNIZE, W-DECK, W-REFLECT3, W-CLOSE, W-DAG-RECONCILE all SPEC. The
   `BB.W-CLOSE.md:24` 14-row chronic-fold table was AUTHORED but never EXECUTED. → **BC Band 0/10**
   (BC.W-FOLD-LEDGER inherits the table; cross-repo + cut execute it).
3. **The perf chronic (AY→BB→BC).** W-LIGHTHOUSE + W-CSS-CRITICAL SPEC; W-PERF-PRODUCER WIP π-pending.
   → **BC Band 8/perf** (the "renders SLOW" defect; BUILD the gates).
4. **The disposition register (31 rows, healthy).** Correct honest-holds + **2 OPEN destinations the BB
   build never landed:** `deck-subpath` (trigger MET, W-DECK SPEC) + `styles-critical-split` (pendingResolvedBy
   W-CSS-CRITICAL SPEC — the register's own gate could not flag it because the flip is close-gated and the
   close never ran). → BC discharges those 2 (Band 10 + Band 8), HOLDs the long-tail.
5. **The glass/dock technical successors (T1, T2, T6, T8, T11, T12, T14 — teardrop, chroma rim, 20px
   blur, transform-squish, FLIP-engine fold, scale-recon, button-tone).** → **BC Band 1/2** (the iOS-27
   glass + dock rebuild absorbs/re-decides them).
6. **The viz successors (T3, T4, T13, T15 — W-FOURIER-GPU, W-CONSTELLATION-GPU, W-AURORA-WGPU-MEDIUMS,
   W-GOO-COLOR + the two no-migrate parity rows).** DIRECTLY contradict the BC "WebGPU EVERYWHERE / no
   Canvas2D viz / fourier→ONE / constellation hi-res" mandate. → **BC Band 4** must BUILD (not defer) the
   migrations and kill the duplicates.
7. **The cross-repo by-name CONSUMEs (T5, T7 — value.js oklchSpectrum, KF-OSCILLATOR; + the DC-EXT-1/2/3/4
   env-escape chronic: `PROOF_PHANTOM_ALLOW_PENDING=1`, `proof:resolution [pending]`, the fourier Q.W4
   patch, the bbnf hard-alias).** → **BC Band 10** (HOLD-with-rationale the by-name consumes; BUILD the
   `proof:adopt-loop` aggregator to reconcile the EXT flags as ONE close-loop).

**The binding meta-lesson for BC:** the disease was NOT under-specification — BB authored ~64 lucid wave
specs with born-RED→GREEN gates, and the SOURCE largely landed (the viz suite, the WGSL backends, the
glass/motion primitives all exist in `src/`). The disease was **deferring ALL visual verification to a
single terminal wave (W-REFLECT3) that never ran**, so every "complete (born-RED→GREEN)" wave was
source-true / paint-unverified — and the close ceremony (W-CLOSE) that would have caught it ALSO never
ran. BC's Band 0 (gestalt-first per wave, paint-not-source gates) is the structural correction — and this
DEFERRAL-LEDGER is the witness that every prior-tranche deferral is now folded and DECIDED, not silently
re-stamped a seventh time.

---

## §10 — APPENDIX: the FINAL.md presence + the deferral counts (the grounding ledger)

| tranche | FINAL.md | PROGRESS.md | wave specs | close-state |
|---|---|---|---|---|
| AX | **ABSENT** | 295 lines | 67 | folded into AY's close (no terminal FINAL) |
| AY | 245 lines | 120 lines | 56 | closed (§6 named-successor deferrals) |
| AZ | 166 lines | 143 lines | 28 | closed (§6 named-successor deferrals) |
| BA | 266 lines | 368 lines | 31 | closed (§6 named-successor deferrals) |
| BB | **ABSENT** | 164 lines | 63 (PROGRESS claims 64-68) | **NEVER CLOSED** (no FINAL, W-REFLECT3 + W-CLOSE SPEC) |

Measured deferral counts (BB, 2026-06-18): 48 specs reference W-REFLECT3 · 77 "rides W-REFLECT3" phrases ·
65 DELTAs on disk · 119 tests-visual specs (never `--run pi` real-device) · 9 genuinely-never-run waves
(W-REFLECT3, W-CLOSE, W-ADOPT-RECONCILE, W-SLIDES-DRIVE, W-LEAF-MODERNIZE, W-CONSUMER-MODERNIZE, W-DECK,
W-LIGHTHOUSE, W-CSS-CRITICAL all SPEC; W-PERF-PRODUCER WIP; W-DAG-RECONCILE SPEC) · 31 disposition rows
(1 retired / 2 archived / 28 book) with 2 pendingResolvedBy (1 discharged, 1 STILL-OPEN) · 15 technical
successors (T1-T15) · 4 phantom-successor wave-names (W-BUTTON-TONE, W-FOURIER-GPU, W-CONSTELLATION-GPU,
W-AURORA-WGPU-MEDIUMS — all NO-SPEC).