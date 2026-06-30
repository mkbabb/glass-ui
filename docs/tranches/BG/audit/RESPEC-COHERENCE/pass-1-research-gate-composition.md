# BG RESPEC-COHERENCE · PASS 1 · LENS = GATE COMPOSITION COHERENCE

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64` (the RESPEC FOLD) · **Agent:** gate-composition research (PASS 1 baseline)

**Method.** Read the SEED + `AMENDED-WAVE-PLAN.md` + the full 1021-line `bg-build-map.md` + the live `scripts/gates.mjs` registry (2640 LOC). Enumerated the tag sets programmatically (`gatesFor`), ran the diagnostic meta-gates + the keystone close gates live at HEAD (device-free only — no GPU paint), and censused every token/gate that the 9-site close-fix and the 7 gap waves touch. Findings are evidence-backed (every claim has a file:line or a live gate run). Siblings verified intact (exit 0) at start.

---

## 0. THE ONE-LINE ANSWER TO EACH CHARTER QUESTION

1. **Do two gates assert contradictory things?** YES — one HIGH (the W-REFLECT3 / G8 deferral contradiction, already live), plus three coordination tensions (CI-battery-red-by-design, ci.yml drift, the 9-site close-fix double-edits the same gates).
2. **Does `node scripts/gates.mjs --run ci` (device-free) pass at HEAD post-fold?** **NO.** Four independent reds: `proof:ba-gestalt` (0/10, born-RED + 2 live G8 violations), `proof:ship-attestation` (attestation absent), `proof:tag-parity` (1 mis-tag), `gates:verify-ci` (ci.yml drift). The first two are red BY DESIGN (tag-blockers); the latter two are FOLD-CHECKPOINT drift the plan defers to CLOSEFIX-9SITE.
3. **Is any gate vacuous?** YES — but the load-bearing ones (gestalt-cursor-parity PARITY-A, field-aurora-aa F-AA-ROSTER, glass-refract-fence F1/F4) are PLAN-ACKNOWLEDGED proxy arms whose teeth are deferred to `[local]`/live arms. The catch: those live teeth route through W-REFLECT3 — the idiom finding #1's gate forbids. The verification architecture's teeth are deferred to a funnel its own keystone reds.
4. **7 gap-wave gates cross-check?** All 7 are CLEANLY ABSENT on disk (no script, no package.json key, no registry row) — no half-registration reds the manifest. Their SPEC'd composition is sound except the W-REFLECT3 deferral language they inherit (#1) and the two self-acknowledged vacuities (#V1/#V2).

---

## 1. THE GATE MATRIX (the BG-relevant subset; full registry = 374 `full`-set gates)

### 1a. STAGE-0 + WS3-partial gates ALREADY LANDED (on disk, run live this pass)

| Gate | Tags | HEAD state | Asserts | Composition note |
|---|---|---|---|---|
| `proof:ba-gestalt` | local,ci,release | **RED 0/10** | per-surface gestalt verdict (live paint) + **G8 no-terminal-reflect scan** of `BG/waves/*.md`+`BG/**/PROGRESS*.md` | THE KEYSTONE. G8 CONTRADICTS the plan's own W-REFLECT3 deferral idiom (#1). 2 live G8 violations. |
| `proof:ship-attestation` | ci,release | **RED (absent)** | freshness of `BG/SHIP-ATTESTATION.json` (real-Metal ceremony) | born-RED tag-blocker BY DESIGN; reds `--run ci`/`--run full` for the whole tranche |
| `proof:tag-parity` | (meta) | **RED (1)** | every static src-scan gate carries `ci` | flags `category-card-warm` `[local]`-only; resolved by CLOSEFIX-9SITE R4 |
| `proof:category-card-warm` | **local** | **PASS 4/4** | SectionLanding bento carries a recessive warm field | FIX ALREADY LANDED; only mis-tagged. R4 promotes to `[local,ci,release]` (safe — green) |
| `proof:glass-idiom-factor` | local,ci,release | PASS (src) | `--glass-plate-tinted` declared once + dead-token deletes | **but `ci.yml` is DRIFTED — this gate is MISSING from the emitted CI workflow** (#3) |
| `proof:glass-cal` | local,ci | PASS | 8px resting radius peer-lock + spring clocks | 8px landed via GLASS-BLUR-PEER. CLOSEFIX retires B3 — second edit of this gate |
| `proof:glass-depth` | local,ci,release | (reads `--glass-blur-dock`) | D3 reads the dock blur tier | CLOSEFIX retires D3 in-diff (a `--glass-blur-dock` reader) |
| `proof:dock-shrink-blur` | local,ci,release | PASS | S3 fences `--glass-blur-dock-radius: 9px` "byte-frozen, the glass material" | **semi-vacuous NOW** — the live dock paints 8px (resting peer), so S3 fences a token the dock no longer reads (#5) |
| `proof:no-gray` | local,ci | PASS | dock blur source carries `saturate()` | SELF-ADAPTING (`:748` reads the live `--dock-surface-blur` source, falls back to `glass-blur-dock`) — NOT a missed retirement site |
| `proof:subpath-classify` | local,ci | LIVE+green | C1 EXACT_REPRODUCTION / C2 inject / C3 break-fidelity | G7 Lock-2, already live — a novel WS6 siri dir reds C1 |
| `proof:close-battery-parity` | local | (reads CLAUDE.md:149) | the `--run full` close-battery canon | G5 census reader #13 (the spike missed it) — re-homes in BH |

### 1b. The 7 NEW gap-wave gates — ABSENT on disk, SPEC'd in the build-map (clean — no half-registration)

| Gate | Gap | Planned tags | Spec'd assertion | Composition risk |
|---|---|---|---|---|
| `proof:close-sweep` | G3 | local (born-RED) | `closeDisease:true`-derived SWEEP_SET + dual-signal `sweepVerdict`; 9-bite self-test | canon home PARENT-TRACKED (out of `docs/precepts` submodule). Sound. |
| `proof:gestalt-cursor-parity` | G2 | device-free | DERIVES wave→surface from `surface-closure.mjs`; PARITY-A/C | **PARITY-A weak/vacuous for 82/105 waves by the plan's own admission** (#V1) |
| `proof:field-aurora` + `proof:field-aurora-aa` | G6 | ci,release + `[local]` F-AA-LIVE | simultaneous-painter count + composited-AA | **F-AA-ROSTER "passes the literal {bar:4.5, born-RED} forever"** — vacuous device-free (#V2); teeth in `[local]` live |
| `proof:safari-parity` | G1 | local,ci,release | RED-on-broken `backdrop-filter:url()` + the C18 renderability fallback ladder | reads on-device compile-time probe; the ★★★ chronic |
| `proof:glass-refract-fence` | G1 | local→ci@keystone | F1 differential ΔC / F3 operator-is-`uChromatic` / F4 op-budget | **F1 is a regression fence only; F4 is "a no-regression op-COUNT floor, NOT the renderability proof"** (plan's words) — proxy (#V3) |
| `proof:claude-deletable` | G5 | born-RED whole tranche | C1 homes / C2 zero hard readers / C3 file-is-last-act | C2 de-blinded for the 16-reader census; sound IF the 16 census is complete |

---

## 2. CONTRADICTIONS FOUND (ranked)

### C1 · HIGH · `proof:ba-gestalt` G8 forbids the W-REFLECT3 deferral the RESPEC fold re-introduced everywhere

**The two contradicting artifacts (both inside the BG doc set):**
- **The gate + the protocol docs (the BG model).** `proof-ba-gestalt.mjs:340-396` ships a G8a clause: `G8A_RE = /\brides?\s+(?:the\s+)?W-REFLECT\d/i`, scanning `docs/tranches/BG/waves/*.md` + `docs/tranches/BG/**/PROGRESS*.md` (the `g8ScopedFiles()` walk at `:414`). It REDs any unquoted "rides W-REFLECT3" with the reason "a BG verdict is mechanically derived at the wave's OWN close … there is NO terminal reflect wave to defer to." `EXECUTION-PLAN.md:104` and `real-paint-protocol.md:91-92` CONFIRM this is the canonical BG model ("there is NO terminal W-REFLECT funnel — `proof:ba-gestalt` G8 reds a wave that defers its verdict").
- **The RESPEC-folded plan (the BB/BC-era idiom).** `bg-build-map.md` (7×), `AMENDED-WAVE-PLAN.md` (8×), `EXECUTION-PROGRESS.md` (10×), `FINAL.md` (4×) route build-phase π via "rides W-REFLECT3" / "Proven by **W-REFLECT3**". The build-map's entire build-phase-deferral table (D-G4, D-G6, D-CSAFARI at `:951-957`) names **W-REFLECT3** as the proving wave — for a wave that does not exist (no `BG/waves/*reflect*` file; W-REFLECT3 is a phantom carried over from BB/BC).

**Already live, already biting.** At HEAD `proof:ba-gestalt` reports `[G8-NO-TERMINAL-REFLECT/G8a]` violations at `EXECUTION-PROGRESS.md:38` and `:113` — both unquoted "rides W-REFLECT3" lines the RESPEC fold wrote. The fold REGRESSED G8: `BG.W-PAINT-IS-THE-GATE` closed "G8 clean" at `7fa3156b` (per `EXECUTION-PROGRESS.md:60`), then the later fold added the two violations. The keystone close gate is now red partly because of the plan's own deferral prose.

**Blast radius.** 61 `[P]` paint-gated waves in the build-map. Each owes a paint verdict the build-map currently routes via "rides W-REFLECT3". As the engine transcribes each wave's π-deferral note into a `waves/*.md` or `EXECUTION-PROGRESS` row, each becomes a fresh G8a violation. The G8a-exempt-1 (backtick/quote span) + exempt-2 (RETIRE-context line) escapes mean some could dodge by quoting — but the CONCEPTUAL break stands: the plan defers ~30 binding π's to a wave that BG abolished, while the gate that fires the tag forbids the reference.

**This is the friction-history "paint-claim deferral" class resurfacing under a new name** (SEED §friction: paint-claim inflation; [[feedback-live-verify-capture]]). The fix is not a string-quote — it is a plan amendment that re-homes every "rides W-REFLECT3" onto BG's per-wave self-close model (the `EXECUTION-PLAN.md:104` model) so the build-map, the deferral table, and the EXECUTION-PROGRESS rows speak the gate's language.

### C2 · MEDIUM · The whole device-free CI battery is RED for the tranche duration — and the CLAUDE.md note that promised otherwise is stale

`proof:ba-gestalt` and `proof:ship-attestation` are both `[ci,release]` AND born-RED (confirmed live: ba-gestalt 0/10, ship-attestation "absent"). So `--run ci` and `--run full` cannot pass from now until the close. This is INTENDED (the plan §0 truth 2 acknowledges ba-gestalt is `[local,ci,release]` 0/10; the verification∧release re-coupling is the BB·BC·BD lesson). BUT two coherence consequences:
- The CLAUDE.md `BA.W-GESTALT-GATE` canon still says ba-gestalt is "tagged `["local"]` so it does NOT block ci/release mid-tranche" — directly contradicted by the live `[local,ci,release]` tagging. The G2 wave plan reconciles only the BB.W-GESTALT-GATE2 *mobile* note, not this *tag* note. (Low-impact since CLAUDE.md is BH-deleted, but it is a live doc⊥registry drift a reader will trip on.)
- The per-wave commit-cadence cannot use `--run ci` as a green signal — every wave's commit will show a red ci battery. The execution engine must run a NARROWED per-wave gate set that EXCLUDES the born-RED-by-design trio (ba-gestalt, ship-attestation, the planned close-sweep). If any workflow naively gates a wave on `--run ci` green, it deadlocks. (Flagged for the DAG/friction lenses to confirm the engine honors a narrowed set.)

### C3 · MEDIUM · `ci.yml` is DRIFTED at the fold checkpoint — `proof:glass-idiom-factor` in the registry, missing from the emitted workflow

`gates:verify-ci` is RED at HEAD: "MISSING from ci.yml: proof:glass-idiom-factor". The gate landed in the `gatesFor` registry pre-fold (commit `6ec81deb`) tagged `[local,ci,release]`, but `gates:emit-ci` was never re-run, so the GitHub Actions workflow does NOT execute it. The actual CI ≠ the local registry. The build-map (CLOSEFIX-9SITE R3) KNOWS both `category-card-warm` AND `glass-idiom-factor` need the emit-ci regen — but glass-idiom-factor landed BEFORE CLOSEFIX, so the fold checkpoint is not self-consistent. CLOSEFIX-9SITE (lands first) resolves it; until then the emitted CI silently under-runs.

### C4 · LOW (transient) · `proof:tag-parity` RED — `category-card-warm` mis-tag

`category-card-warm` is `[local]` but is a static src-scan gate, so tag-parity reds ("RED on master / green in CI is the class this forbids"). The gate itself PASSES 4/4 (the fix landed). CLOSEFIX-9SITE R4 promotes it to `[local,ci,release]` — safe because it is green. No standing contradiction beyond the transient red.

### C5 · LOW (transient) · `proof:dock-shrink-blur` S3 fences a value the live dock no longer reads

S3 (`proof-dock-shrink-blur.mjs:149-160`) asserts `--glass-blur-dock-radius: 9px` is "byte-frozen, the glass material" and reds if absent/changed. But GLASS-BLUR-PEER (landed) moved the live dock to `--glass-blur-resting` (8px); the dock backdrop is now 8px, not the 9px S3 fences. S3 is fencing a now-orphan token's value — semi-vacuous against the actual paint. CLOSEFIX-9SITE site (5) re-points S3 onto `--dock-surface-blur`→resting→8px. Transient, plan-tracked.

---

## 3. VACUITIES FOUND (proxy-by-design; all PLAN-ACKNOWLEDGED — the watch is that the teeth route through C1)

### V1 · `proof:gestalt-cursor-parity` PARITY-A — toothless for 82/105 waves
The plan itself (`AMENDED-WAVE-PLAN.md:123`, `bg-build-map.md:509-519`) HONESTLY re-prices it: under `full`, 22/105 waves map to all-10 surfaces and **82 map to NONE**, so the PARITY-A implication (cursor-DONE ⇒ roster-PASS) is vacuously true for the majority. "`full` UNDER-covers the MAJORITY — it is NOT maximally conservative." The load-bearing net is PARITY-C (the orphan census) + the gate's own freshness. This is the EXACT vacuity shape the lens hunts (G2's original hand-authored-map sin), now self-flagged and shifted onto PARITY-C — but PARITY-A remains a near-no-op arm that a reader could mistake for coverage.

### V2 · `proof:field-aurora-aa` F-AA-ROSTER — "passes the literal {bar:4.5, born-RED} forever"
Verbatim from `EXECUTION-PROGRESS.md:113` + `bg-build-map.md:566`: the device-free ROSTER arm cannot enforce the eyebrow lift; it passes a frozen literal regardless of paint. The binding teeth are the `[local]` F-AA-LIVE arm. So the `[ci,release]` field-aurora-aa is a presence-check, not a contrast-check — vacuous as a CI gate for the thing it names.

### V3 · `proof:glass-refract-fence` F1 + F4 — regression/op-count proxies, not the renderability proof
The plan states F1 is "an anti-future-rainbow REGRESSION fence (transcription errors cancel)" and F4 is "a no-regression op-COUNT floor, NOT the renderability proof" (`AMENDED-WAVE-PLAN.md:164`, `bg-build-map.md:636`). The binding renderability + AA verdict is bound to the on-device C18 leg. So the device-free `proof:glass-refract-fence` cannot fail on the actual cut-risk (Safari shader-compile / AA-over-ridge) — those are deferred. Acknowledged + correct per the cardinal-lesson split, but the device-free gate is a proxy.

### V4 (the synthesis) · the teeth of V1–V3 are all deferred to `[local]`/live arms — which route through W-REFLECT3 (C1)
The healthy pattern is: device-free arm = proxy, `[local]`/live arm = binding. BG follows it. The INCOHERENCE is that the binding `[local]`/live arms' build-phase π is, throughout the build-map, deferred to **W-REFLECT3** — the very wave `proof:ba-gestalt` G8 forbids. So the verification architecture's actual teeth are routed to a funnel the keystone reds. C1 and V4 are the same disease seen from the two ends: the proxies are honest, but their binding completions cite a forbidden wave.

### V-watch · the residual hand-authored roster
`bg-gestalt-roster.md` surface-PATHS are DERIVED (good — `BG.W-GESTALT-ROSTER-RE-POINT`), but the surface ENROLLMENT list, the verdict cells, the SiriIsland addition, and the accept-residual allowlist (`PaperBackdrop`/`useDockOrientationMorph`) are hand-curated. The plan bounds this with the disposition-register precedent (rationale-bearing, bounded) — acceptable, but it is the same hand-list class the gestalt-cursor-parity gate was built to kill, now displaced one level up into the roster. PASS-2 watch item.

---

## 4. DOES `--run ci` PASS AT HEAD? (definitive)

**NO.** Four independent device-free reds, confirmed live:
1. `proof:ba-gestalt` — 0/10 roster FAIL + 2 G8 violations (born-RED + C1).
2. `proof:ship-attestation` — `SHIP-ATTESTATION.json` absent (born-RED tag-blocker).
3. `proof:tag-parity` — 1 violation (`category-card-warm` mis-tag, C4).
4. `gates:verify-ci` — ci.yml drift (`glass-idiom-factor` missing, C3).

Reds 1–2 are red BY DESIGN (the re-coupled verification∧release axes; the tag cannot fire until close). Reds 3–4 are FOLD-CHECKPOINT drift that CLOSEFIX-9SITE (lands first) is specced to clear. **The manifest itself is SOUND** — all 379 `proof:*` package.json keys resolve to a `gatesFor` row or the COMPOSITE_OR_RUNNER allowlist (the 12 "unmanifested" are `proof:all`/`proof:full`/the `*-final` trackers/the per-tranche ledger arms — all legitimate). The 7 new gap-wave gates are cleanly absent (no dangling registration).

---

## 5. THE 7 GAP-WAVE GATES — TARGETED CROSS-CHECK (newest, least battle-tested)

- **G4 `proof:category-card-warm`** (the landed piece): GREEN 4/4, mis-tagged `[local]` (C4). The 9-site `--glass-blur-dock` census is SOUND — I grepped all 28 readers across src/scripts/tests/demo; the 7 gate/test readers are dock-shrink-blur, theme-style, glass-cal, glass-depth, no-gray, the InstrumentChassis unit test, glass-cal.spec. The build-map's 9-site list names 6 of the 7; `proof-no-gray` is the apparent 7th-not-listed but is SELF-ADAPTING (`:748` reads the live `--dock-surface-blur` source) — NOT a missed reader. **The census holds; no 10th site found.** Risk: CLOSEFIX double-edits glass-cal (B3) and glass-depth (D3) which GLASS-BLUR-PEER already rebaselined — a coordination, not a contradiction.
- **G3 `proof:close-sweep`** (absent): spec sound; canon home correctly PARENT-TRACKED out of the submodule.
- **G2 `proof:gestalt-cursor-parity`** (absent): PARITY-A vacuity (V1) is the open wart; PARITY-C is the real net but depends on the hand-curated accept-residual allowlist (V-watch).
- **G6 `proof:field-aurora(-aa)`** (absent): F-AA-ROSTER vacuity (V2); the 5 stale `^1.2.0` strings the plan flags for reconcile to `^1.1.1` are a dependency-floor watch (cross-lens with the friction `^1.1.1` correction).
- **G1 `proof:safari-parity` + `proof:glass-refract-fence`** (absent): F1/F4 proxy (V3); operator correctly keyed to `uChromatic` not the invented `uDispersion`. The ★★★ renderability verdict is on-device by design.
- **G5 `proof:claude-deletable`** (absent): C2 de-blinded for the corrected 16-reader census; sound IF 16 is complete — the seed's "submodule canon-home" and "16 not 12" corrections are both reflected in the build-map.

**All 7 inherit C1** (their build-phase π is routed to W-REFLECT3 in the build-map). That is the single cross-cutting defect across the gap set.

---

## 6. OPEN QUESTIONS FOR PASS 2 / SYNTHESIS

1. **C1 fix shape:** does re-homing "rides W-REFLECT3" onto the per-wave self-close model require touching all 61 [P] build-map rows + the deferral table, or can a single canonical "BG per-wave close" phrase replace the funnel? (A prototype agent should try the sed + re-run `proof:ba-gestalt` G8.)
2. **C2 engine check (DAG-lens handoff):** does `bg-bh-execute.wf.js` gate any wave on `--run ci` green, or does it run a narrowed per-wave set that excludes the born-RED trio? If the former, the tranche deadlocks.
3. **The double-edit coordination (glass-cal B3 / glass-depth D3):** GLASS-BLUR-PEER rebaselined them to 8px; CLOSEFIX retires them. Confirm the retirement diff does not strand a half-rebaselined assertion.
4. **V-watch:** should the accept-residual allowlist be DERIVED (e.g. from `meta.focal`/route-render data) rather than hand-curated, closing the last hand-list?
5. **ci.yml regen ordering:** confirm CLOSEFIX-9SITE's `gates:emit-ci` R3 actually re-emits glass-idiom-factor (it landed pre-CLOSEFIX, so R3 must pick up a gate it did not add).

---

## APPENDIX · evidence index (file:line / live runs)

- G8 clause: `scripts/proof-ba-gestalt.mjs:340-396` (`G8A_RE`), `:414-429` (scope), `:785-809` (self-test bites).
- BG model docs: `EXECUTION-PLAN.md:104`, `real-paint-protocol.md:91-92`, `EXECUTION-PROGRESS.md:60`.
- Live G8 violations: `EXECUTION-PROGRESS.md:38`, `:113` (confirmed via `npm run proof:ba-gestalt`).
- W-REFLECT3 counts: build-map 7 / AMENDED-WAVE-PLAN 8 / EXECUTION-PROGRESS 10 / FINAL 4; no `BG/waves/*reflect*` file exists.
- Tag classification: `gatesFor` enumeration (ba-gestalt=local,ci,release; ship-attestation=ci,release; category-card-warm=local).
- Live runs: `proof:ba-gestalt` (FAIL 10/10 + 2 G8), `proof:ship-attestation` (FAIL absent), `proof:tag-parity` (FAIL 1), `proof:category-card-warm` (PASS 4/4), `proof:glass-cal` (PASS), `gates:verify-ci` (FAIL drift).
- `--glass-blur-dock` census: 28 refs / 11 files (4 src + 7 gate/test); `proof-no-gray.mjs:748` self-adapt; `proof-dock-shrink-blur.mjs:149-160` S3 9px fence.
- Manifest soundness: 379 proof:* keys, 367 registered, 12 composite/runner-exempt.
- [P] wave count (G8 blast radius): 61 in `bg-build-map.md`.
