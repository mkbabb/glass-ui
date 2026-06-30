# RESPEC — BG+BH 5.0.0 LIVING RE-SPEC

**The evolving master re-spec.** Verified state · keep/amend/restart triage · the amended wave plan · the open clusters.
**Updated:** DEVELOP pass (2026-06-30) · **HEAD:** `6369ad6e` (docs-only above the spec baseline `b716b5be`) · **pkg:** 4.2.0 → cut 5.0.0 · **branch:** tranche/BG
**Convergence:** 86% · **readyToDevelop:** YES → **EXECUTE THE AMENDED PLAN**

> **DEVELOPED PLAN: `AMENDED-WAVE-PLAN.md`** (the executable plan — the KEEP feature build + the 7 close-machine gap fixes as concrete waves with locking gates + the build-phase deferrals). The 7 gaps were resolved+critiqued (G2/G6/G3/G4/G1/G5/G7); the develop pass DECIDED their open design questions (the map re-price + PARITY delete/keep, the value.js `^1.1.1` floor, the named Safari renderability fallback ladder, the corrected 16-site CLAUDE census + de-blinded C2, the W5-not-W4 clause rename, the canon-home-out-of-submodule).
> PASS-1 detail: `pass-1-synthesis.md` (agglomerated — the authoritative pass-1 synthesis) · `pass-1-spec.md` (baseline truth, 70%) · the 6 proto+critique pairs `pass-1-proto-P-{CSAFARI,SWEEP,GESTALT,CLAUDE-DELETE,FIELD-AA}.md` + `P-CLOSE-spike-findings.md` and their `crit-*` / `pass-1-crit-*` siblings · the 4 resolve specs `resolve-G{1,5,7}-*.md` + (G2/G3/G4/G6 resolved in-round) · 8 `pass-1-research-*.md` lenses · `DEFECT-LEDGER.md`.

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

## D. CLOSED CLUSTERS (DEVELOPED — each now a concrete wave + locking gate; see `AMENDED-WAVE-PLAN.md §2`)

The 7 gaps were resolved+critiqued and DEVELOPED to executable waves. **Each open design question is now DECIDED** (the develop pass's value-add) — the residual is build-phase proof (de-risked, with a named proving wave) + execution-verify, NOT feasibility unknowns or design restarts.

| # | Cluster | Conv | Wave + locking gate (DECIDED — see `AMENDED-WAVE-PLAN.md §2`) |
|---|---|---|---|
| **G4** | **9-SITE atomic close-fix** — clears R1–R4 | **90** | `BG.W-CLOSEFIX-9SITE` (amendment 1, FIRST). FULL RETIREMENT of `--glass-blur-dock`; 2 carves (ladder 527→470, shell 510→459); 9 sites not 6 (+dock-shrink-blur S3 re-point + theme-style + the InstrumentChassis unit test + glass-cal.spec). Ran `--run full` siblings-absent GREEN, dist byte-identical. Deferral: grain-tail π → W-REFLECT3. |
| **G3** | **standing closeDisease sweep** | **83** | `BG.W-CLOSE-SWEEP` (WS7), `proof:close-sweep` born-RED `["local"]`. Decided: commit-hook tranche-env-gated (not hot-file-fires); canon home OUT of the docs/precepts submodule; C5 path-match; the HARD P-CLOSE→P-SWEEP edge. Self-test 9/9. |
| **G2** | **ba-gestalt cursor↔roster** — the keystone | **80** | `BG.W-GESTALT-CURSOR-PARITY` (WS7) + amend STAGE-0 roster. `surfaceClosure = collectPaintClosure(SHELL_SEED ∪ routeSeeds(s)) ∩ wave.Files` (re-priced: 22/105 all-10, 82 NONE → PARITY-C is the net, PARITY-B DELETE, PARITY-A weak-kept); SHELL_SEED += demo/main.ts; SiriIsland orphan-decision (enroll surface + scoped accept-residual); `bg-paint.wf.js` fence widen → reflect/; canonical-capture = first `/cat/story` token; Safari → separate `proof:safari-parity`; mobile rides coarse-touch pi-runner. Deferral: WS12 late capture sweep. |
| **G6** | **field-composited-AA gate** | **78** | `BG.W-GATE-FIELD-AURORA` (WS7) + `BG.W-EYEBROW-LIGHT-POLISH` (WS3, NEW — the phantom-coupling-now-real wave). Consumer #2 = compositions/gate-pattern; value.js floor `^1.1.1` (not `^1.2.0`); F2 dark-AA demoted to fidelity-floor + bound to dual-engine C18; verbatim recorded fixtures. Deferral: F-AA-LIVE re-shoot at `ebf6e45b` → W-REFLECT3. |
| **G7** | **viz-subpath cross-ownership** | **80** | Lock-1 = `proof:crossrepo-asks` **W5**-viz-disposition (NOT W4 — that clause exists, the inv-26 fence); Lock-2 = live `proof:subpath-classify` (gates.mjs:377, GREEN). WS5 keys all preserved → visual re-baseline only. Deferral: post-WS12 re-pin + the human siri-waveform PUBLISH/INTERNAL call → BH-B2.1-swap. |
| **G5** | **CLAUDE-delete safety** | **78** | BH-B5c→B4f, `proof:claude-deletable` born-RED→GREEN-at-delete. Census CORRECTED to **16** readers (+close-battery-parity / doc-override-idiom BYTE-PARITY / on-glass-fg / readme-meta-clean); C2 DE-BLINDED (flag any `read(…)` of the literal); canon home OUT of submodule; legacy-accumulation widened to 76 anchors. Deferral: `--run full` /tmp dry-run + the rm (B4f, last act). |
| **G1** | **C-SAFARI in-situ refraction** — the dominant cut-risk ★★★ | **70** | WS8 `BG.W-GLASS-REFRACT-WEBGL` (`proof:glass-refract-fence` on **uChromatic**, `["local"]`→ci at calibration) + `BG.W-GLASS-BACKDROP-SAMPLE` (keystone) + WS7 `BG.W-SAFARI-PARITY-GATE`. Decided: the `uChromatic` operator + calibration algebra; C12 folds in as F2; the **named fallback ladder** full→drapery-dropped→flat-blur (each gated); CPU field-buffer raster spec; 5 GL sites enumerated. Deferral (build, no Metal at audit): the renderability/AA/dock-blur sign-off on real Safari/WebKit 26 → WS9/M9 + BG.W-CUT `--run ship`. |

---

## E. PASS LOG

| Pass | Date | Conv% | What changed |
|---|---|---|---|
| 1 | 2026-06-30 | 62→**68** | Baseline established + 6 prototypes (P1–P6). **Resolved the 4-vs-12 close-red contradiction** (SYNTH `ea4682c0` cured the stale 12; WS3/WS4 re-seeded 4 NEW — same class, new artifacts → a fixed sweep is brittle). **C-SAFARI floor renderability ESCAPED** on Metal. **Dock-saturate "regression" → ±2% brightness phantom.** Carve seams byte-isomorphic; CLAUDE census exact. |
| 1·spec | 2026-06-30 | **70** | Re-verified the whole baseline LIVE at the FRESH HEAD `b716b5be` with the 3 live-fixes incorporated; 8 lenses concur, ZERO restart. Confirmed the 4 close reds + the 6-gate cascade + ba-gestalt 0/10 + the FIELD-AURORA 1.04:1 device-free-green proof. |
| 1·agglom | 2026-06-30 | 70→**72** | **Agglomerated the 6 re-run proto+critique pairs** (P-CSAFARI/CLOSE/SWEEP/GESTALT/CLAUDE-DELETE/FIELD-AA). **Re-verified 3 crux refutations on disk:** G4 FULL-RETIREMENT safe (dock paints blur via `--glass-blur-resting`, 0 orphan readers); **G1 the spike's fence number is on the WRONG uniform** (ship `uChromatic` abs-offset vs invented `uDispersion` — the dominant cut-risk did NOT advance + the ship pass/perf/C12 never rendered); G2 the wave→surface map is DERIVABLE (`surface-closure.mjs` exports the join). Net **+2**: G4/G5 near-closed (~80/~78 by the implement-spikes), offset by **G6 REGRESSED 68→53** (unsound `/display/card` consumer + gate-not-green-at-HEAD 4.15 eyebrow + hollow self-test) and G2 joinery wrong (hand-authored map / PARITY-B unsat / fence forbids reflect/). Per-cluster: G4 80 · G5 78 · G3 62 · G2 58 · G6 53 · G1 50 · G7 40. **readyToDevelop FALSE** — the dominant C-SAFARI cut-risk + the regressed field-aurora gate + the keystone's unbuilt joinery remain. |
| **DEVELOP** | 2026-06-30 | 72→**86** | **The 7 gaps resolved+critiqued + DEVELOPED to executable waves** (`AMENDED-WAVE-PLAN.md`). Each open design question DECIDED: G2 surfaceClosure re-priced (SHELL_SEED-inclusive; 22/105 all-10 + 82 NONE → PARITY-C is the net, PARITY-B DELETE) + SiriIsland orphan-decision + fence-widen; G6 consumer #2 = compositions/gate-pattern + value.js `^1.1.1` (NOT `^1.2.0`) + the EYEBROW-LIGHT-POLISH phantom-now-real wave; G1 the `uChromatic` operator + the named full→drapery-dropped→flat-blur fallback ladder; G5 census CORRECTED to **16** readers + C2 de-blinded + canon-home-out-of-submodule; G3 commit-hook tranche-env-gated + canon home parent-tracked; G7 the **W5**-not-W4 clause (the W4 inv-26 fence exists on disk) + Lock-2 live. Per-gap (planning): G4 90 · G3 83 · G2 80 · G7 80 · G5 78 · G6 78 · G1 70. Build-phase deferrals (de-risked, named proving wave): C-SAFARI ★★★ Metal capture, the WS12 late sweep, F-AA-LIVE re-shoot, the /tmp CLAUDE-delete dry-run. **readyToDevelop TRUE → EXECUTE.** |
