# RESPEC — BG+BH 5.0.0 LIVING RE-SPEC

**The evolving master re-spec.** Verified state · keep/amend/restart triage · the amended wave plan · the open clusters.
**Updated:** PASS 1 (2026-06-30) · **HEAD:** `9dfe285c` · **pkg:** 4.2.0 → cut 5.0.0 · **branch:** tranche/BG
**Convergence:** 68% · **readyToDevelop:** NO

> PASS-1 detail: `pass-1-synthesis.md` · `pass-1-spec.md` (baseline) · `pass-1-proto-P{1..6}.md` (prototype reports) · 8 `pass-1-research-*.md` lenses.

---

## A. VERIFIED STATE AT HEAD (re-checked on disk, not on report faith)

| Fact | Verified |
|---|---|
| `verify-siblings-intact --quiet` | exit 0 (no parked siblings) |
| typecheck / build / working tree | exit 0 / exit 0 / clean (only untracked `RESPEC/`) |
| cursor boundary | 35 DONE / 130 PENDING, 18 phases; boundary clean (the 12 "spec CONVERGED" commits are tranche-DEV records) |
| **close battery `--run full`** | **NOT green — 4 live ci/release reds (R1–R4)** + 2 born-RED-by-design tag/paint blockers (excluded) |
| SYNTH fix-wave `ea4682c0` | **landed** after VALIDATION-REPORT (`ff0933a3`); cured the 12 stale reds (`storybook-complete` = pass) |

### The 4 confirmed close reds (R1–R4) — the SAME disease, NEW artifacts vs the cured 12

| # | Gate | Evidence (re-verified) | Root |
|---|---|---|---|
| R1 | `proof:no-god-module` | `ladder.css`=**527L**, `shell.css`=**510L**, both >500; neither in the **16** RATCHET_BASELINES (the 16 ship GREEN at 4.2.0 — `RATCHET==∅` is **doctrine, not a live gate**: status keys on `violations.length`, `ratchetDrained:false` is reported metadata) | 6ec81de + cd9ce46 |
| R2 | `proof:no-dead-token` | `--glass-blur-dock` = **ZERO readers** (verified). Tip of a 2-level dead pair (composite + `--glass-saturate-dock`); the radius+bridge are a **further N+2 dead chain** (zero util consumer) kept alive only by the `--blur-` exemption + frozen-string gates | cd9ce46 |
| R3 | `proof:gen-ci-fresh` | `glass-idiom-factor` ci-tagged but `ci.yml` un-regenerated (drift) | 6ec81de |
| R4 | `proof:tag-parity` | `category-card-warm` registered `["local"]` (verified live FAIL + root message) — a static src-scan gate not promoted to ci | 9e13965d |

**Cascade-reveal (P2):** the R2 atomic delete REDS `proof:glass-cal B3` → cascades to `proof:glass-depth D3`. **The close-red sweep is 6 gates, not 4** (R1–R4 + glass-cal B3 + glass-depth D3 retired in the same diff).

**Silent regression (no gate sees it) — RE-SCOPED to a phantom:** GLASS-BLUR-PEER re-pointed the dock blur to resting. **The saturate did NOT change** (`1.4` light / `1.30` dark was byte-identical to the resting peer — calibrated to match). The ONLY real delta is BRIGHTNESS ±2% (light `1.02→1.0`, dark `1.12→1.14`). Owed: a ±2% dual-engine dock-plate sign-off, NOT an identity-loss fix.

---

## B. TRIAGE — keep / amend / restart (ZERO restart; 8 lenses concur)

### Landed: keep-verified
WS7 Stage-0 (0.1–0.6) · BH [C] (1.1–1.12) · WS1 (2.1–2.6) · WS3 3.1 CARTOON-INK + 3.7 IDIOM-FACTOR(core) · WS4 10.25 CATEGORY-CARD-WARM — all with on-disk dual-engine paint PNGs (Chrome ANGLE-Metal M5 + real WKWebView), byte-distinct engines/modes, **no inflation**.

### Landed: half-baked / amend
| Item | Disposition | Fix (PASS-2 owner) |
|---|---|---|
| WS3 3.6 GLASS-BLUR-PEER | half-baked | atomic R2 delete (whole 2-level pair) + retire glass-cal B3 + decide N+2 dead-chain depth + ±2% dock brightness sign-off (→P2) |
| WS3 3.7 close tail | amend | carve `ladder.css` (→P5) + `gates:emit-ci` (R3) |
| WS4 10.25 gate tag | amend | promote `category-card-warm` to ci (R4) |
| Row 2.7 VT-ROUTE-ENHANCE | amend | re-label DEFERRED-NOT-BUILT; promote to additive PRM-gated wave at W-REFLECT3 (same-doc VT now Baseline incl. FF144) |
| no-god-module ratchet doc-drift | amend | CLAUDE.md asserts `=={}`; live = 16 entries (BD.W-CUT). BH migration must read the LIVE 16, never copy `=={}`. The doctrine is ACCEPTED-residual, not "drained to empty" (→P5) |
| SYNTH-fix MODEL | amend | promote to a STANDING per-band `closeDisease`-manifest sweep (→P3) |
| BH B4b resolver seams | half-baked | `auditCanonHomes` existence-only + unwired + RED (instrument-chassis README absent); make content-real (→P4) |
| BH B5c/B4f CLAUDE-delete | amend | census now exact (18 literal / 16 content / 14 assert / **2 ENOENT-crashers**); scope the structure.md parser rewrite; gate B4f on rg=0 + token-present (→P4) |

### Pending bulk (~110 waves)
**DAG sound — KEEP the order.** Every gating edge validates live (WS8 `[data-glass-field-canvas]` marker present at AppShell:328; WS2 5→1 SpringProgress = exactly 5 sites; `useDockSpring` correctly ABSENT → WS6 born-RED; glass-deep SURVIVES 3.6 → WS8 edge is a sign-off). Per-workstream triage: WS2/WS5/WS6/WS4/WS9/WS10/WS11/WS12 = **keep**; WS3/WS8/WS7/BH[WS12] = **amend the SCHEDULE** (below).

---

## C. THE AMENDED WAVE PLAN

**Build order (KEEP):** `WS1→WS3→WS2→WS5→WS6→WS4→WS7(core)` → `WS8→WS9→WS10→WS11` → `WS12(capstone)` → `BH[WS12] tail`.
**Non-negotiable fence:** the cut MUST NOT precede WS7 phase-12 (5 live-render gates) + W-REFLECT3.

**Five sequencing amendments (prototype-validated PASS 1):**
1. **4-red atomic close-fix FIRST** — it is **6 gates** (R1–R4 + glass-cal B3 + glass-depth D3); whole dock-blur pair deleted atomically; ±2% dock brightness sign-off; run `--run full` siblings-absent in a FRESH `/tmp` worktree (→P2).
2. **Standing `closeDisease`-manifest per-band sweep** — completeness via a manifest flag (the 12→4 re-mint proves a fixed list is brittle); `["local"]` tag; trust JSON-not-`$?` (→P3).
3. **C-SAFARI front-spike** — renderability ESCAPED (Tier-1 WebGL2 on Metal); PASS 2 proves the two-pass texture-sample path within the Δ5 chroma fence (→P1).
4. **WS3 Safari-ceiling (3.3/3.4) + a glass-cascade carve BEFORE WS8** — carve seams real + byte-isomorphic; rebuild the P5 lock born-RED; ACCEPTED-residual doctrine (→P5).
5. **Incremental BH CLAUDE-delete tail** — author canon homes as each WS lands; scope the structure.md parser rewrite; close the 110-wave accumulation gap (→P4).

**Mechanical CONSUMEs:** kf 5.1.0 `DragOptions.snap`/`Oscillator`; value.js 1.2.0 helpers + **bump floor `^1.0.0`→`^1.2.0`** (P6 WCAG import) + repoint the stale BorderProgress `0.13.0 oklchSpectrum` marker; perfect-freehand drop at WS9; W-TAILWIND4-IDIOM = "evaluated, not applicable."

**Fences to HOLD:** WebGL2+WGSL dual-stack (CSS-SVG `feDisplacementMap` dead on Safari); deliberate calm-blur divergence from iOS-27; `contrast-color()` flips the SURFACE not the warm-amber ink; **K2 chroma fence (refraction = DEPTH not hue, dispersion 0.02–0.03) is BINDING**.

---

## D. OPEN CLUSTERS (PASS 2 convergence targets)

1. **C-SAFARI in-situ** — two-pass `field-FBO→textureSampleLevel(uv+disp)` on Metal within the Δ5 0.02–0.03 chroma fence; non-author gestalt over WS1's real field; R3 30s GPU-watchdog (on-screen window loop); dark-AA-over-bright-ridge (C12) content surfaces; land the spike as committed C17 evidence.
2. **SWEEP_SET completeness (P3)** — `closeDisease:true` manifest clause + `["local"]` tag + honest ≥2-consumer; born-RED anchored to the 4-at-HEAD set.
3. **Atomic close-fix finalized (P2)** — `--run full` /tmp siblings-absent; N+2 dead-chain clean-break depth; the 6-gate cascade; ratchet-cut-state honesty; dock ±2% dual-engine sign-off.
4. **P5 lock rebuild + doctrine** — born-RED marker-guard (key iteration); real self-test harness; real wave-corpus resolution; ACCEPTED-residual marker; carve-vs-re-pin clause; api/index.ts cross-tranche sequencing.
5. **P4 CLAUDE-delete** — structure.md parser rewrite (4 ASCII-tree readers); the 110-wave accumulation discipline; CANON_TOKENS drift lock; honest B4b-content sizing (~11 homes).
6. **P6 field-aurora** — a SOUND 2nd consumer (dock-overview unsound); the correct born-RED commit (`b3d65eec~1`, NOT `cb8ecdfc`); the Safari-arm decision; the value.js `^1.2.0` floor; a roster-eligibility precondition.
7. **ba-gestalt close cost (un-prototyped)** — ~16 surface-flips × 2 engines × 2 modes; confirm G1 `pngDimensions` tolerates @1x vs @2x asymmetry.
8. **viz-subpath cross-ownership seam (un-prototyped)** — confirm BG-WS5 carries the SLIDES `/constellation`+`/fourier-field` migration, or a break falls between BH-B7 and BG-WS5; resolve at the post-WS12 re-baseline.

---

## E. PASS LOG

| Pass | Date | Conv% | What changed |
|---|---|---|---|
| 1 | 2026-06-30 | 62→**68** | Baseline established + 6 prototypes. **Resolved the 4-vs-12 close-red contradiction** (SYNTH `ea4682c0` cured the stale 12; WS3/WS4 re-seeded 4 NEW — same class, new artifacts → a fixed sweep is brittle, manifest-flag is the fix). **C-SAFARI floor renderability ESCAPED** on real Metal. **Dock-saturate "regression" → ±2% brightness phantom.** Carve seams byte-isomorphic; CLAUDE census exact (18/16/14/2-ENOENT). New must-resolves surfaced: chroma-fence violation + two-pass texture-sample unproven (P1), SWEEP_SET completeness (P3), P5 lock born-GREEN bug, P4 parser-rewrite + accumulation gap. |
