# BG+BH 5.0.0 Re-Spec — PASS 1 SYNTHESIS

**Date:** 2026-06-30 · **HEAD:** `9dfe285c` · **pkg:** 4.2.0 (cut 5.0.0) · **branch:** tranche/BG
**Inputs synthesized:** 8 research lenses + the synth re-spec (`pass-1-spec.md`, 62%) + 6 prototype+critique pairs (P1–P6)
**Fence:** read-mostly; this agent verified findings on disk + records. Wrote only under `RESPEC/`.
**Aggregate convergence this pass: 68%** (WHAT-is-built triage ~92% · HOW-the-bulk-converges ~62%).

---

## 0. THE LOAD-BEARING RECONCILIATION (the disagreement this pass resolved)

The single contradiction across the corpus was the **close-red inventory**: the clobber lens + the synth spec say **4 reds at HEAD**; the P3 critique cites a **VALIDATION-REPORT with 12 `realDefect` reds** and accuses the proposed sweep of "missing 9." **Both are true at different commits — the conflation is the stale artifact, and resolving it strengthens the re-spec.**

Verified on disk:
- `VALIDATION-REPORT.md` is anchored at HEAD **`ff0933a3`** and enumerates 12 `realDefect=TRUE` reds (clusters A–F).
- **`ea4682c0` "BG SYNTH fix-wave: remediate the 12 validation realDefect gate reds" landed AFTER `ff0933a3`** (git log confirms the order: `ff0933a3` → `ea4682c0` → `331df934` → … → HEAD `9dfe285c`).
- **The SYNTH wave cured them:** `proof:storybook-complete` (VALIDATION row #4 / fix #4) reads **`status: pass`** at HEAD from its cache JSON. The clobber lens independently verified the SYNTH-wave re-points GREEN.
- **WS3/WS4 then re-seeded 4 NEW reds by HEAD** — *same disease class, different artifacts*:
  - `no-god-module`: was `useGlassBackdropLuminance.ts 559L` (fix #10, cured) → now **`ladder.css 527 + shell.css 510`** (verified live FAIL).
  - `no-dead-token`: was `--story-hero-rise` (fix #11, cured) → now **`--glass-blur-dock`** (verified **ZERO readers** — `grep var(--glass-blur-dock) src demo` empty).
  - `gen-ci-fresh`: cured for `alias-codemod`, **re-drifted** for `glass-idiom-factor`.
  - `tag-parity`: **NEW** — `category-card-warm` registered `["local"]` (verified live FAIL; root-cause message confirmed).

**Consequence for the re-spec (this is the prize):** the recurring disease (`wave greens own gate / leaves sibling RED`) re-seeds with **different artifacts each batch** (12 at ff0933a3 → cured → 4 new at 9dfe285c). A hand-picked SWEEP_SET is therefore structurally brittle — **the P3 critique's deliverable (a `closeDisease:true` manifest flag enrolling the whole CLASS, not the current instances) is the correct and necessary fix**, and the "12 vs 4" reconciliation is the empirical proof that the class re-mints. The P3 critique was wrong on the live HEAD inventory but **right on the deliverable**.

---

## 1. WHAT-IS-BUILT TRIAGE — converged ~92% (firmed this pass)

Zero restart candidates (8 lenses concur). The landed bands are keep-verified with on-disk dual-engine paint and no inflation. Two items moved this pass:

| Landed wave | Disposition | Pass-1 change |
|---|---|---|
| WS7 Stage-0 (0.1–0.6) · BH [C] (1.1–1.12) · WS1 (2.1–2.6) · WS3 3.1/3.7 · WS4 10.25 | **keep-verified** | unchanged; paint PNGs resolve, byte-distinct engines/modes, no inflation |
| **WS3 3.6 GLASS-BLUR-PEER dock-saturate "regression"** | **DOWNGRADED to a ±2% brightness sign-off** | **P2 critique resolved the "identity loss" as a PHANTOM** — `--glass-saturate-dock` was `1.4` light / `1.30` dark, **byte-identical to the resting peer it now reads** (the W-NAV-DOCK-FIX comment confirms the dock saturate was *calibrated to match resting*). The ONLY real delta is BRIGHTNESS: light `1.02→1.0`, dark `1.12→1.14` (±2%). The contingent `--dock-surface-saturate` additive is **dropped** (fixes nothing). `proof:no-gray` already migrated its dock-gray witness onto `--dock-surface-blur→resting` (49/49 pass) — device-free gray coverage survives. |
| **C-SAFARI deep-glass renderability** | **floor ESCAPED (renderable on real Metal)** | **P1 spike proved Tier-1 WebGL2 squircle-rim refraction compiles + renders + composites + captures** on real Apple M5 Metal via off-screen WKWebView, deterministic over 2 runs, by a non-author. WGSL/WebGPU Tier-2 compiles clean and is reachable by DEFAULT in WKWebView 26.4. CSS-SVG `feDisplacementMap` re-confirmed DEAD on Safari. **The architecture (WebGL2+WGSL dual-stack) is validated.** |

**The standing WS1 caveat holds (all lenses):** 2.2 FIELD-AURORA shipped device-free-GREEN at **1.04:1** over the composited field (dark mode), caught only by re-paint luck. This is the permanent proof that **device-free GREEN ≠ visually correct for field-composited surfaces** and is the entire rationale for P6.

---

## 2. HOW-THE-BULK-CONVERGES — ~62% (5 prototype designs converged, each with a bounded must-resolve)

The DAG is sound (KEEP the build order `WS1→WS3→WS2→WS5→WS6→WS4→WS7core → WS8→WS9→WS10→WS11 → WS12 → BH[WS12] tail`). The 5 sequencing amendments are validated; each prototype advanced its amendment and surfaced concrete build-holes:

### P1 — C-SAFARI front-spike (critique 58%) — floor escaped, HARD legs unproven
**Converged:** renderability of the WebGL2 floor + composite + off-screen capture + the FBO-`readPixels` metric shape (sidesteps the live `getImageData`-zero-off-screen constraint). KEEP amendment #3 (front-load before the ~50-wave investment).
**OPEN (must resolve PASS 2):**
- The spike rendered a **PROCEDURAL backdrop inside the fragment shader** — it **NEVER rendered the actual two-pass `field→FBO→textureSampleLevel(fieldTex, uv+displacement)` path** the wave ships (the part most likely to drift on Metal: texture filtering, sRGB-texture sampling, LOD uniformity, RGBA8 gamma completeness). R4/R9 stay "STUB-build-proven, UNPROVEN in-situ."
- **CHROMA-FENCE VIOLATION:** the capture is a full prismatic RAINBOW at `uDispersion 0.5` (~27% R-B), **~16–25× over the binding Δ5 fence (0.02–0.03 thin-rim)** and over the K2 "ZERO chroma injection / refraction is DEPTH not hue / 100% luminance modulation of ONE warm hue" identity. A non-authoring verdict would FAIL it.
- **Author-graded gestalt** (forbidden); needs a NON-authoring verdict against the real `liquid-metal-…01.jpg` reference over WS1's REAL shell-aurora field.
- **R3 GPU watchdog** (the WebKit ~2s ceiling over a sustained 2880×1800 two-pass N-glass composite) is **unprobed** (the 1.8s synchronous CPU draw-queue is not a watchdog test).
- **Dark-AA-over-bright-ridge (C12)** — the chronic's hardest leg — declared "out of scope"; the committed evidence shows content fails 4.5:1 (4.04/4.10/2.11), the 9.7:1 hand-math RETRACTED.
- Do **NOT** act on the "promote Δ1 / WebGPU-by-default" recommendation — WKWebView ≠ Safari.app; it would re-open the settled conservative C16/K10 fence. Treat it only as corroboration that Tier-1 is the safe universal floor.
- **Land the spike fixture as committed evidence** (fold into the C17 born-GREEN `glass-field-lens.spec.ts`), not a vanishing throwaway-worktree prove (the M2 cardinal-lesson trap).

### P2 — 4-red atomic close-fix (critique 73%) — recipe proven, depth + union owed
**Converged:** all 4 reds reproduced + cleared atomically; the **cascade-reveal is REAL** — the no-dead-token delete REDS `proof:glass-cal B3` (which positively asserts the dark dock composite reads `saturate(--glass-saturate-dock) brightness(1.12)`), which cascades to `proof:glass-depth D3`. **The close-red sweep touches 6 gates, not 4** (R1–R4 + glass-cal B3 + glass-depth D3). Retire glass-cal B3 in the SAME diff.
**OPEN (must resolve PASS 2):**
- **Run `gates.mjs --run full` siblings-absent in a FRESH `/tmp` throwaway worktree** (per SIBLING-SAFETY — NEVER touch `~/Programming`), NOT the 9 individual JSONs. The tag-flip (R4) / ci.yml-regen (R3) / gate-script-parity are mutually coupled — confirm no 7th red surfaces.
- **The N+2 dead-chain decision (the prototyper MISSED this):** post-delete, `--glass-blur-dock-radius` (9px) + the `--blur-dock` @theme bridge are a DEAD chain — ZERO runtime reader, ZERO `blur-dock`/`backdrop-blur-dock` utility consumer in src/demo/dist; alive only on the `--blur-` prefix exemption + frozen-string gates. This is no-legacy/no-dual-path shelf-ware and the next cascade-reveal a future sweep surfaces. **Decide clean-break depth:** (a) full atomic dock-blur-tier retirement (delete radius+bridge, update dock-shrink-blur S3 / theme-style blur-dock list / glass-depth FROZEN_BASE_RADII in the same wave), OR (b) record radius+bridge as known-dead-exempt and SCHEDULE their drain with the WS4 carve. Do not silently keep.
- **Re-scope the dock sign-off** to the ±2% brightness phantom (above) — DUAL-engine (Chrome+Safari), not "Metal only."
- **Ratchet cut-state correction:** `RATCHET==∅` is NOT a live gate (`proof-no-god-module` status keys only on `violations.length`; 14 entries ship GREEN at 4.2.0; `ratchetDrained:false` is reported metadata, not enforced). The +2 grandfather of ladder/shell is gate-green; it does NOT "fail the close-state invariant." The carve is still OWED under the monotonic-drain + no-legacy law — confirm whether it's a HARD pre-cut blocker or lands in the fix wave.
- Sequencing: flip category-card-warm tag (R4) BEFORE `gates:emit-ci` (R3); rebuild dist before typecheck (the `fourier-math` ENOENT is a stale-dist worktree artifact, absent at main HEAD — a false-red trap); verify worktree base == `9dfe285c` before any fix-agent (the prototyper seeded at the stale `998136bb`).

### P3 — standing per-band close sweep (critique 50%) — mechanism solid, completeness IS the deliverable
**Converged mechanism:** the `gatesFor("sweep")` special-case, the dual-signal `sweepVerdict` (execSync-throw catches exit-nonzero AND `gen-ci-fresh` which writes NO JSON; the JSON-status leg catches a future exit-0-on-fail — both empirically necessary), the cache-filename map, the env-driven commit-msg hook idiom, the clause-5 synthetic-fixture differential.
**OPEN (must resolve PASS 2):**
- **SWEEP_SET completeness is the deliverable, not an OQ.** Derive it from the class definition ("every device-free meta-gate a wave-diff can clobber while greening its own deliverable") via a `closeDisease:true` manifest flag applied to ALL such gates NOW, and make a clause assert *every `closeDisease` gate ∈ SWEEP_SET*. The "12-vs-4" reconciliation (§0) is the proof the class re-mints — a fixed 6-gate list false-greens the next batch.
- **Reconcile the born-RED anchor:** §0 establishes the HEAD-true set = the 4 (R1–R4). The P3 critique's "9 missed" was the STALE ff0933a3 inventory (cured by `ea4682c0`). The born-RED demo + the completeness census both rest on the *4-at-HEAD* set.
- **Mint `proof:close-sweep` as `["local"]`** (matching `proof:close-battery-parity` + `proof:gate-manifest-sound`, both verified local-only and still riding `--run full`), NOT `["local","ci"]` — a ci tag RE-SEEDS R3 (a new ci-tagged gate forces `gates:emit-ci` + ci.yml commit). If ci is kept, make ci.yml regen an explicit minting step.
- **Honest ≥2-consumer accounting:** only the commit-msg hook is automated, it is INERT unless the engine exports `GLASS_UI_ACTIVE_TRANCHE` (verified NOT exported in `bg-bh-execute.wf.js`), and it fires only on orchestrator commits (agents never commit). Either BUILD the engine env-export + a per-wave flip-stamp assertion, or stop labeling the documented disciplines "automated consumers."
- **Re-cost T0/T1 against the COMPLETE set** (the cheap ~1s/~2min figures assume the 6-gate sample; storybook-complete's demo-tree scan + the ledger-JSON gates push the complete set toward `--run full` cost — decide the tier design).
- **`gate-manifest-sound` audit false-red:** its HEAD red is `realDefect=FALSE` (π runs overwrite PNGs; orchestrator owns `git checkout`). Scope it to T2/close, not the standing per-flip gate, or a π run cries-wolf-blocks a legitimate flip.

### P4 — CLAUDE.md-delete de-risk (critique 71%) — census exact, parser-rewrite + accumulation-gap owed
**Converged:** the exact census (**14 presence-asserting / 2 ENOENT-crashers / 16 content-readers / 18 literal-touchers** — corrects the plan's "16"); the 2 ENOENT-crashers (`proof-claude-structure-sync.mjs:74`, `proof-doc-consistency.mjs:197` — `readFileSync` with NO fallback → THROW/crash, not RED); `auditCanonHomes` is **unwired** (zero gates import canon-doc.mjs) AND dangling (instrument-chassis README absent); the phase-palette W4 two-token re-home confirmed; the authored instrument-chassis README carries both tokens; the B4f born-RED-LAST-act gate (`proof:claude-deletable`) shape is correct.
**OPEN (must resolve PASS 2):**
- **The structure.md PARSER REWRITE (the unscoped §5 hole):** 4 §Structure readers (`structure-sync.parseDoc`, `split-chars:289`, `accent-tone:353`, `doc-consistency:89/97`) parse the CLAUDE.md **ASCII box-drawing tree** with regexes (`/^│\s+│\s+├──\s+(name)\//`) that match NOTHING in the GENERATED `structure.md` flat-bullet list (`- name/`). §5 mislabels these "regex unchanged" — they are per-reader parser rewrites. Either rewrite each to the flat format, or make `regen-structure.mjs` ALSO emit a tree block. **This is the single biggest unscoped work item.**
- **The HEAD-snapshot-vs-110-wave accumulation hole (the deepest):** CLAUDE.md is the LIVE canon mutated by every BG wave with a `claudeMdNote` until B4f deletes it. C2 (live-tree reader scan) self-updates for new READERS, but C1's CANON_TOKENS is a FROZEN HEAD manifest — a contract minted by WS5/WS6/WS8/WS9 that appends to CLAUDE.md has no home and is SILENTLY LOST at delete with the gate green. Specify a per-wave discipline (claudeMdNote → canon home + a CANON_TOKENS entry per minted contract) OR a B4f-time CLAUDE.md-delta reconciliation.
- **CANON_TOKENS drift contradiction:** "declared once, cannot drift" is false while §5 keeps each gate's own regex copy. Either refactor gates to `import CANON_TOKENS[key]` (then "regexes unchanged" is wrong) OR drop the claim + add a `canonTokensMatchGateAsserts()` lock.
- **Re-size B4b-content honestly:** the dock README is MISSING `#persistent` (verified — §2b "dock likely carries its tokens" is false on disk); ~11 homes need authoring, not "instrument-chassis + ~15%." Drop the dead `MIN_CANON_BYTES=200` floor (stubs are 527–775 non-ws; it never bites) or raise it above skeleton size.
- Confirm the WS12-tail vs C3-LAST-act ordering against amendment #5 (incremental home authoring must not let C3 pre-green; B4f stays the single final irreversible act).

### P5 — WS3-spine completion + carve ordering + ratchet doctrine (critique 67%) — carve solid, LOCK broken
**Converged:** the carve seams are real, cohesive, tail-positioned, order-preserving, byte-isomorphic (`ladder.css 462–525` grain tail → `glass/grain-overlay.css` 527→461; `shell.css 438–509` placement/region tail → `dock/shell-regions.css` 510→437; reader gates use `readMonolith`/`readDockCss` concatenation so they FOLLOW the carve — ZERO gate edits). Byte-isomorphism (build-diff empty) is the correct binding π. The drain-vs-accept decision (11 drain booked to named waves + 5 residual) is sound in shape. The Safari-ceiling rows (3.3/3.4) are already correctly ordered before WS8.
**OPEN (must resolve PASS 2):**
- **The §4 marker-guard is born-GREEN, not born-RED** (the lock half is broken): it iterates the root-relative `displayPath` (`src/styles/...`) but the RATCHET_BASELINES keys carry NO `src/` prefix (`styles/...`), so `keyIdx === -1` for EVERY row → vacuous pass. It re-creates the exact `void baselinePaths` inert-guard it claims to kill. Fix: iterate the KEYS directly, verify born-RED on 16+2=18.
- **There is NO `--self-test` arm to "append to"** (`run()` invoked directly, no argv parse). BUILD the harness (argv dispatch + synthetic-fixture-over-tmpdir, the disposition-live shape).
- **The wave-resolution bite names a non-existent `docs/tranches/*/waves/`** dir — re-point onto the REAL corpus (`execution/bg-build-map.md` + the `converge/BG-WS*/` SPEC tree + the ledgers); confirm each of the 11 BOOK wave-ids resolves there.
- **Re-frame IRREDUCIBLE → ACCEPTED-residual:** `metaball.wgsl.ts`/`.frag.ts`/`flow-field.glsl.ts` are template-string `.ts` (carveable per the BB.W-CARVE5 byte-identical-splice precedent); `property-regs.css` holds 45 order-independent `@property` names (splittable). At least 3 of the 5 "IRREDUCIBLE" are accepted-not-un-carveable. The marker must read `// ACCEPTED(<grep-lock|cohesive-unit|low-value>):` (re-evaluable) — "IRREDUCIBLE" is a permanent-floor lie a future agent trusts.
- **The gate does NOT force CARVE over re-pin** (a booked re-pin passes the §4 guard) — so "carve NOW" rests on P2 discipline, not a machine lock. Add a no-re-pin-for-ladder/shell clause OR say carve-vs-re-pin is a discipline P5 cannot enforce.
- **api/index.ts (#16) cross-tranche sequencing:** pick ONE of "DRAIN (BH B2.2)" vs "accept after /api-fold." B2.2 runs in the BH tail (after WS12) — its BOOK must name a wave that drains BEFORE the cut, and the wave-resolution bite must accept the forward BH reference. Coordinate with P4.

### P6 — proof:field-aurora composited-AA gate (critique 68%) — thesis confirmed, 5 build-holes
**Converged + STRENGTHENED:** I read WS7's converged spec — `proof:field-aurora`'s designed arms are (a) a simultaneous-painter COUNT + (b) a design-agnostic field meanChroma CEILING. The 2.2 broken state had LOW field chroma (C 0.015–0.046) — its failure was pure DARK-MODE AA. **So WS7's chroma-ceiling arm would have PASSED the broken 2.2 state — P6's AA-over-composite arm IS the genuinely-missing third measurement.** The mechanism is de-risked (the 2.2 DELTA script really median-rejects + WCAG-over-composite; the visual-runner CI-armed/local-paint split is precedented).
**OPEN (must resolve PASS 2):**
- **Consumer #2 (dock-overview) is UNSOUND on two axes** — the ≥2-bar is at risk: (a) `.dock-label` is FICTIONAL (DockIconButton renders a bare `<slot/>` SVG icon; a glyph is a graphical-object at 3:1, not text at 4.5); (b) the +24px adjacent-patch sampler leaves the SMALL dock plate onto the raw field — a confident WRONG ratio (silent-wrong-answer). Drop dock-overview OR replace with a second SOUND raw-field/large-plate consumer + add a plate-membership check + the graphical-object 3:1 bar for icon glyphs.
- **The born-RED LIVE anchor commit is WRONG:** `cb8ecdfc` is POST-fix (verified NOT an ancestor of `b3d65eec`; it contains the FIXED field) → re-shooting it captures GREEN. Correct to `b3d65eec~1` (`ebf6e45b`) or an earlier pre-dark-aware commit.
- **Safari field-AA NOT covered** (on the ★★★ chronic): the Chrome-only Playwright capture can't see the WebKit composite, which collapsed DIFFERENTLY (Safari 1.91 / L0.55 vs Chrome 1.04 / L0.70). Decide: add a wkshot-live WKWebView arm to F-AA-LIVE, OR scope the gate to "Chrome composite; Safari deferred to proof:safari-parity/ba-gestalt" and reflect it in the name.
- **value.js floor mis-framed:** WCAG `wcagContrastRatio` is a value.js **1.2.0** feature (seed line 102); package.json floor is `^1.0.0`. A ci/release hard-import module-throws on a fresh install resolving <1.2.0. Bump the floor to `^1.2.0` (clean-break, coupled to the BorderProgress 0.13.0-marker re-point).
- **WS7 reconciliation + roster eligibility:** P6 reintroduces a design-sensitive per-pixel read WS7 §L.1 deliberately demoted — state + defend it (fixed WCAG bar, not a design choice) + add a machine-checkable roster-eligibility precondition (sampled field C ≤ recessive ceiling, fail-LOUD) so a FOCAL-vivid surface (WS5/WS6) appended at standing-enrollment can't false-RED or silently escape.
- Build-order: only the device-free clauses (SOURCE count + F-AA-SELFTEST) are early-buildable; F-AA-LIVE needs the WS1 field frozen + Metal captures. State which clauses land at M4 vs the WS7 Metal slot.

---

## 3. THE AMENDED WAVE PLAN (KEEP the DAG; the 5 sequencing amendments, now prototype-validated)

| # | Amendment | Status after PASS 1 | Carries-forward to PASS 2 |
|---|---|---|---|
| 1 | **Clear the 4 close reds FIRST in ONE atomic sweep** | **VALIDATED + DEEPENED** — it's **6 gates** (R1–R4 + cascade glass-cal B3, glass-depth D3), and the dock sign-off is a ±2% brightness check not an identity loss | run `--run full` siblings-absent in /tmp; decide N+2 dead-chain depth; ratchet-cut-state honesty |
| 2 | **Standing per-band close-battery sweep** | **VALIDATED + RE-SCOPED** — completeness via `closeDisease:true` manifest flag (the "12→4 re-mint" proves a fixed list is brittle); `["local"]` tag; honest ≥2-consumer | build the manifest-flag completeness clause; engine env-export OR drop "automated" labels |
| 3 | **Front-load the C-SAFARI spike** | **VALIDATED — floor ESCAPED** (renderable on Metal) | the spike proved the EASY leg; PASS 2 must prove the two-pass texture-sample path + the Δ5 chroma fence + non-author gestalt + R3 watchdog + dark-AA |
| 4 | **Complete WS3 Safari-ceiling + move a glass-cascade carve BEFORE WS8** | **VALIDATED — carve seams real + byte-isomorphic** | rebuild the P5 lock (born-RED not born-GREEN); ACCEPTED-residual doctrine; carve-vs-re-pin discipline clause |
| 5 | **Incrementalize the BH CLAUDE-delete tail** | **VALIDATED — census now exact (18 literal / 16 content / 14 assert / 2 ENOENT)** | scope the structure.md parser rewrite; close the HEAD-snapshot-vs-110-wave accumulation gap |

**Build order (KEEP):** `WS1→WS3→WS2→WS5→WS6→WS4→WS7(core)` → `WS8→WS9→WS10→WS11` → `WS12(capstone)` → `BH[WS12] restructure tail`.

**Non-negotiable ordering fence:** the cut MUST NOT precede WS7 phase-12 (the 5 live-render gates) + the W-REFLECT3 gestalt-flip — they are the only automated net for the field-composited-AA class.

**Mechanical CONSUMEs (keep-as-spec'd, low uncertainty):** kf 5.1.0 `DragOptions.snap`/`Oscillator`; value.js 1.2.0 `sampleColorRamp`/`interpolateHue('shorter')`/`wcagContrastRatio` (**repoint the stale BorderProgress `0.13.0 oklchSpectrum` marker**; **bump the value.js floor to `^1.2.0`** per P6); perfect-freehand drop at WS9; W-TAILWIND4-IDIOM = "evaluated, not applicable."

**SOTA/identity fences to HOLD:** WebGL2+WGSL dual-stack is the correct cross-browser bet (CSS-SVG `feDisplacementMap` is Chromium-only, re-confirmed dead on Safari); record the deliberate calm-blur divergence from iOS-27; `contrast-color()` flips the SURFACE not the warm-amber ink; **the K2 chroma fence (refraction is DEPTH not hue, dispersion 0.02–0.03) is binding** — the P1 spike's 0.5 rainbow is a fixture artifact, not the ship target.

---

## 4. OPEN CLUSTERS (what PASS 2 must converge)

1. **C-SAFARI in-situ:** render the two-pass `field-FBO→textureSampleLevel(uv+displacement)` on Metal within the Δ5 0.02–0.03 chroma fence (thin R/B fringe, NOT the 0.5 rainbow); non-author gestalt verdict over WS1's real field; R3 30s GPU-watchdog on an on-screen window loop; dark-AA-over-bright-ridge (C12) for content surfaces; land the spike as committed C17 evidence.
2. **SWEEP_SET completeness (P3):** the `closeDisease:true` manifest-flag clause + the `["local"]` tag + honest consumer accounting; reconcile to the 4-at-HEAD born-RED anchor.
3. **Atomic close-fix finalized (P2):** `--run full` siblings-absent in /tmp; the N+2 dead-chain clean-break depth; the 6-gate cascade; ratchet-cut-state honesty; dock ±2% brightness dual-engine sign-off.
4. **P5 lock rebuild + doctrine:** born-RED marker-guard (key iteration), real self-test harness, real wave-corpus resolution, ACCEPTED-residual marker, carve-vs-re-pin clause, api/index.ts cross-tranche sequencing.
5. **P4 CLAUDE-delete:** the structure.md parser rewrite (4 ASCII-tree readers), the 110-wave accumulation discipline, CANON_TOKENS drift lock, honest B4b-content sizing (~11 homes).
6. **P6 field-aurora:** a sound 2nd consumer, the correct born-RED commit (`b3d65eec~1`), the Safari-arm decision, the value.js `^1.2.0` floor, the roster-eligibility precondition.
7. **ba-gestalt close cost (un-prototyped, OPEN):** estimate the cut against **~16 surface-flips × 2 engines × 2 modes** still owed; confirm G1 `pngDimensions` tolerates Chrome-desktop @1x (1440×900) vs Safari @2x (2880×1800) asymmetry, or a strict dimension assert trips at the close.
8. **Cross-ownership seam (un-prototyped, OPEN):** confirm BG-WS5 carries the viz-subpath (`/constellation`, `/fourier-field`) consumer migration (SLIDES named) when it drops/renames a key, or a real break falls between BH-B7 and BG-WS5; resolve at the post-WS12 export-delta re-baseline.

---

## 5. CONVERGENCE ACCOUNTING

| Axis | Pre-pass | Post-pass | Driver |
|---|---|---|---|
| WHAT-is-built triage | 90% | **~92%** | 4-vs-12 reconciled; dock-saturate phantom resolved; C-SAFARI floor renderability escaped |
| HOW-the-bulk-converges | 55% | **~62%** | 5 prototype designs converged (P2 73 · P4 71 · P6 68 · P5 67 · P1 58 · P3 50) — each with a bounded must-resolve, not an open question |
| Gaps closed / advanced | — | 1 closed (dock-saturate phantom), 5 design-converged, 2 fully open (gestalt cost, viz seam) | — |
| **Blended** | **62%** | **68%** | critique mean 64.5 + synth 62 + the dominant C-SAFARI-floor de-risk, offset by the chroma-fence + texture-sample + sweep-completeness new must-resolves |

**readyToDevelop: FALSE** — 8 open clusters remain; the dominant C-SAFARI cut-risk is de-risked at the floor but its hard legs (two-pass texture-sample, chroma fence, dark-AA, watchdog) are unproven; ba-gestalt close cost + the viz cross-ownership seam are un-prototyped.

**PASS 2 focus:** prove the C-SAFARI in-situ two-pass refraction within the chroma fence (the dominant cut-risk's hard legs); finalize the atomic close-fix recipe (6-gate cascade + N+2 depth + /tmp `--run full`); build the P3 closeDisease-manifest completeness clause; rebuild the P5 lock born-RED; scope the P4 structure.md parser rewrite + accumulation discipline; sound the P6 2nd consumer + correct born-RED commit; and prototype the two un-touched gaps (ba-gestalt close cost, viz cross-ownership seam).
