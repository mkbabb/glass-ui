# BG RESPEC-COHERENCE · PASS 1 · LENS = GATE COMPOSITION COHERENCE

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `6c1f5386` (the "BG coherence Pass 1 (66% converged)" commit — ADVANCED past the `4c761b64` fold the prior gate-composition draft read) · **Agent:** gate-composition research (PASS 1 baseline, re-verified at current HEAD)

**Method.** Re-ran the live diagnostic meta-gates + keystone close gates at the CURRENT HEAD (`6c1f5386`, not the prior draft's `4c761b64`), enumerated the `gatesFor` tag sets from `scripts/gates.mjs` (2640 LOC), censused every gate that the 9-site close-fix and the WS8 glass-refraction retirement touch, and traced the 7 gap-wave gates across script/package.json/registry. Every claim is file:line or live-run backed. Siblings verified intact (`verify-siblings-intact --quiet` exit 0) at start. This pass CONFIRMS the prior draft's C1/V1–V3 at the new HEAD AND adds one HIGH new finding (the WS8 `.glass-lens`-retire under-enumeration) the prior pass missed, plus a precision correction to the `--run ci` red-set.

---

## 0. ONE-LINE ANSWER TO EACH CHARTER QUESTION

1. **Do two gates assert contradictory things?** YES. One HIGH standing contradiction (`proof:ba-gestalt` G8 forbids the "rides W-REFLECT3" deferral the RESPEC fold wrote ~29× across BG docs — already live, 2 violations) + one HIGH **NEW** retire-coordination contradiction (WS8.4 deletes `.glass-lens`, but TWO surviving battery gates — `proof:button-glass` B4 `[local,ci,release]` + `proof:visual-reconcile` a1 `[local,ci]` — ASSERT the Button composes `.glass-lens`, neither enumerated in the WS8 file/gate lists) + 3 transient fold-checkpoint drifts.
2. **Does `node scripts/gates.mjs --run ci` (device-free) pass at HEAD?** **NO.** Three ci-tagged reds halt it fail-fast: `proof:ba-gestalt` (0/10 + 2 G8), `proof:ship-attestation` (absent), `proof:tag-parity` (1 mis-tag). (`gates:verify-ci` is `["release"]`-tagged, so its drift reds `--run release`/`--run full`, NOT `--run ci` — a precision the prior draft conflated.)
3. **Is any gate vacuous?** YES, three PLAN-ACKNOWLEDGED proxy arms (gestalt-cursor-parity PARITY-A, field-aurora-aa F-AA-ROSTER, glass-refract-fence F1/F4) whose binding teeth are deferred to `[local]`/live arms — and those live arms route through W-REFLECT3, the wave `proof:ba-gestalt` G8 forbids (the verification architecture's teeth funnel into the wave its own keystone reds).
4. **7 gap-wave gates cross-check?** All 7 CLEANLY ABSENT (no `.mjs`, no `package.json` key, no `gatesFor` row) — `proof:gate-manifest-sound` GATE-MANIFESTED arm is GREEN, so no half-registration. Their SPEC'd composition is sound except the inherited W-REFLECT3 deferral (finding C1) and the two self-acknowledged vacuities (V1/V2).

---

## 1. THE GATE MATRIX (BG-relevant subset; full registry = ~374 `full`-set gates, manifest GREEN)

### 1a. STAGE-0 + landed gates run LIVE this pass (current HEAD)

| Gate | Tags | HEAD state (live) | Asserts | Composition note |
|---|---|---|---|---|
| `proof:ba-gestalt` | local,ci,release | **RED 0/10 + 2 G8** | per-surface gestalt verdict (live paint) + **G8 no-terminal-reflect scan** of `BG/waves/*.md`+`BG/**/PROGRESS*.md` | KEYSTONE. G8 contradicts the plan's W-REFLECT3 idiom (C1). 2 live G8 hits at `EXECUTION-PROGRESS.md:38,:113`. Roster now **10 surfaces** (dock·configurators-goo·aurora·glass-feedback·shell·motion-fourier·dark-register·**tabs-segmented**·**page-band**·cross-repo) — NOT the CLAUDE.md-named 8; SiriIsland NOT yet enrolled. |
| `proof:ship-attestation` | ci,release | **RED (absent)** | freshness of `BG/SHIP-ATTESTATION.json` (real-Metal ceremony) | born-RED tag-blocker BY DESIGN; reds `--run ci`/`--run full` for the tranche duration |
| `proof:tag-parity` | local,ci | **RED (1)** | every static src-scan gate carries `ci` | flags `category-card-warm` `[local]`-only; CLOSEFIX-9SITE R4 resolves. **ci-tagged** → it IS in `--run ci`. |
| `proof:category-card-warm` | **local** | **PASS 4/4** | SectionLanding bento carries a recessive warm field (light + dark ember) | FIX LANDED; only mis-tagged. R4 promotes to `[local,ci,release]` (safe — green) |
| `proof:gate-manifest-sound` | local | **RED** (4 arms) | manifest completeness + tag-parity + freshness-hash + R6 + clean-tree | **GATE-MANIFESTED arm GREEN** (manifest sound). Reds: tag-parity cascade (C4), 3 stale AZ freshness hashes (NEW — §2 C6), dock-animation cached fail, clean-tree (test artifact — §6). `[local]` → reds `--run full`/`--run local`, not `--run ci`. |
| `gates:verify-ci` | **release** | **RED (drift)** | ci.yml ≡ manifest ci set | `glass-idiom-factor` MISSING from emitted ci.yml. **release-tagged** → reds `--run release`/`--run full`, NOT `--run ci` (prior-draft correction). |
| `proof:glass-cal` | local,ci | PASS | 8px resting radius peer-lock + spring clocks | CLOSEFIX retires B3 (a `--glass-blur-dock` reader) — double-edit with GLASS-BLUR-PEER |
| `proof:glass-depth` | local,ci,release | reads `--glass-blur-dock` | D3 reads the dock blur tier | CLOSEFIX retires D3 in-diff |
| `proof:dock-shrink-blur` | local,ci,release | PASS (9px present) | S3 fences `--glass-blur-dock-radius: 9px` "byte-frozen, the glass material" | **semi-vacuous** — `glass.css:103` STILL declares `9px` but the live dock paints via `shell.css:29 --dock-surface-blur: var(--glass-blur-resting)` = 8px → S3 fences a value the dock no longer reads (C5). |
| `proof:visual-reconcile` | local,ci | (not run; static) | a1: Button composes `.glass-lens` (`:134`) | **NEW C-NEW-1** — WS8.4 deletes `.glass-lens`; this surviving ci gate asserts its presence, UNenumerated in WS8. |
| `proof:button-glass` | local,ci,release | (not run; static) | B4: `consumesRefractAxis = /glass-lens/.test(vue)` (`:298`) | **NEW C-NEW-1** — second surviving battery gate asserting `.glass-lens`. |
| `proof:subpath-classify` | local,ci | LIVE+green | C1 EXACT_REPRODUCTION / C2 inject / C3 break-fidelity | G7 Lock-2, already live — a novel WS6 siri dir reds C1 |

### 1b. The 7 NEW gap-wave gates — ABSENT on disk (no half-registration)

| Gate | Gap | Planned tags | Spec'd assertion | Composition risk |
|---|---|---|---|---|
| `proof:close-sweep` | G3 | local (born-RED) | `closeDisease:true`-derived SWEEP_SET + dual-signal `sweepVerdict`; 9-bite self-test; `--run sweep`/`sweep-fast` dispatch (absent in `runMode` at HEAD) | canon home PARENT-TRACKED (out of `docs/precepts` submodule). Sound. |
| `proof:gestalt-cursor-parity` | G2 | device-free | DERIVES wave→surface from `surface-closure.mjs`; PARITY-A/C | **PARITY-A vacuous for 82/105 waves** by the plan's own re-price (V1) |
| `proof:field-aurora` + `-aa` | G6 | ci,release + `[local]` F-AA-LIVE | simultaneous-painter count + composited-AA | **F-AA-ROSTER "passes the literal {bar:4.5, born-RED} forever"** (V2); teeth in `[local]` live |
| `proof:safari-parity` | G1 | local,ci,release | RED-on-broken `backdrop-filter:url()` + the C18 fallback ladder | reads on-device compile-time probe; the ★★★ chronic |
| `proof:glass-refract-fence` | G1 | local→ci@keystone | F1 differential ΔC / F3 operator-is-`uChromatic` / F4 op-budget | F1=regression fence, F4="op-COUNT floor, NOT renderability" (plan's words) — proxy (V3) |
| `proof:claude-deletable` | G5 | born-RED whole tranche | C1 homes / C2 zero hard readers / C3 file-is-last-act | C2 de-blinded for the 16-reader census; sound IF 16 complete |

---

## 2. CONTRADICTIONS FOUND (ranked)

### C1 · HIGH · `proof:ba-gestalt` G8 forbids the "rides W-REFLECT3" deferral the RESPEC fold re-wrote everywhere

**The two contradicting artifacts (both inside the BG doc set):**
- **The gate + protocol (the BG model).** `proof-ba-gestalt.mjs` G8a clause `G8A_RE = /\brides?\s+(?:the\s+)?W-REFLECT\d/i` scans `BG/waves/*.md` + `BG/**/PROGRESS*.md` and REDs any unquoted "rides W-REFLECT3", reason: "a BG verdict is mechanically derived at the wave's OWN close; there is no terminal reflect wave to defer to." Confirmed canonical (`EXECUTION-PLAN.md:104`, `real-paint-protocol.md`). **No `BG/waves/*reflect*` file exists** — W-REFLECT3 is a phantom carried from BB/BC.
- **The RESPEC-folded plan.** "rides W-REFLECT3" / "Proven by W-REFLECT3" appears **7× in bg-build-map.md, 10× in EXECUTION-PROGRESS.md, 8× in AMENDED-WAVE-PLAN.md, 4× in FINAL.md** (re-counted at HEAD). The build-map's build-phase-deferral table names W-REFLECT3 as the proving wave for D-G4/D-G6/D-CSAFARI — and even the CLOSEFIX-9SITE wave-spec body (`bg-build-map.md:468`) writes the forbidden phrase.

**Already live, already biting.** At HEAD `proof:ba-gestalt` reports `[G8-NO-TERMINAL-REFLECT/G8a]` violations at `EXECUTION-PROGRESS.md:38` and `:113` — both unquoted "rides W-REFLECT3" lines the fold wrote. The keystone close gate is partly red because of the plan's own deferral prose. **Blast radius:** 61 `[P]` paint-gated waves owe a paint verdict the build-map routes via W-REFLECT3; each becomes a fresh G8a hit as the engine transcribes it into a `waves/*.md`/PROGRESS row. This is the friction-history **paint-claim-deferral** class resurfacing under a new name. The fix is a plan amendment re-homing every "rides W-REFLECT3" onto BG's per-wave self-close model, not a string-quote dodge.

### C-NEW-1 · HIGH · WS8's `.glass-lens` retirement breaks ≥2 surviving battery gates the build-map never enumerates

**This is the NEW finding the prior gate-composition draft missed.** WS8.1 (`BG.W-GLASS-SUFFUSE-UNIVERSAL`) declares a 3-gate retire matrix — `proof:glass-material-sota` / `proof:lensing` / `proof:glass-prune` RETIRED, mint `proof:glass-specular-angle`. WS8.4 (`BG.W-GLASS-SOTA-LADDER`) then **DELETES `.glass-lens` / `glass-refract.css`** and asserts "retired-paths DEFINITION-ABSENT (grep src+demo+scripts)". But TWO surviving gates assert the Button COMPOSES `.glass-lens`:
- **`proof:button-glass`** (`["local","ci","release"]` — a FULL battery gate, `gates.mjs:1251`): clause **B4** at `proof-button-glass.mjs:298` — `facts.b4.consumesRefractAxis = /['"`]glass-lens['"`]/.test(vue)` — requires `Button.vue` to carry the `.glass-lens` string.
- **`proof:visual-reconcile`** (`["local","ci"]`, `gates.mjs:1949`): clause **a1** at `proof-visual-reconcile.mjs:134` — `composesLens = /['"`]glass-lens['"`]/.test(buttonCode)` — same requirement, and REDs a live `class="glass-refract"` (the old dead class).

`Button.vue:220` currently emits `props.liquid ? 'glass-lens' : undefined` (composesLens=true). The BG build-map has **ZERO mention of `proof:button-glass` or `proof:visual-reconcile`**; its only `:liquid`/`btn-glass` reference (WS3 `GLASS-BLUR-PEER:172`) is the unrelated blur-peer demote. WS8.2/8.4 file lists EXCLUDE `Button.vue`. So WS8's refraction retirement is in a coordination bind: if it drops the button's `.glass-lens` consumption (the stated intent — refraction moves to the GL `useGlassRefraction.ts` dual-stack), `button-glass` B4 + `visual-reconcile` a1 RED in `--run ci`/`--run full`; if it leaves the class string to keep them green, `glass-refract.css` is gone and the DEFINITION-ABSENT grep + `no-dead-token`/`no-retired-survivor` flag a dead class. **This is the EXACT G4 "9-sites-not-6" frozen-string-reader pattern recurring at WS8, un-costed** — the broader fan-out (`proof:safari-webgl`×11, `proof:theme-style`, `proof:no-dead-token`, `proof:liquid-glass-tokens` all reference `glass-lens`/`glass-refract`) must be triaged the same way the 9-site close-fix triaged the `--glass-blur-dock` readers. The build-map's WS8 retire matrix names 3 gates; the real reader set is larger and includes a `[local,ci,release]` battery gate.

### C2 · MEDIUM · The device-free `ci`/`release`/`full` battery is RED for the tranche duration — the CLAUDE.md tag note is stale

`proof:ba-gestalt` + `proof:ship-attestation` are both `[ci,release]` AND born-RED, so `--run ci`/`--run release`/`--run full` cannot pass until the close. INTENDED (the verification∧release re-coupling, the BB·BC·BD lesson). Two coherence consequences:
- The CLAUDE.md `BA.W-GESTALT-GATE` canon still says ba-gestalt is "tagged `["local"]` so it does NOT block ci/release mid-tranche" — directly contradicted by the live `[local,ci,release]`. The G2 plan reconciles only the BB.W-GESTALT-GATE2 *mobile* note, not this *tag* note. (Low standing impact — CLAUDE.md is BH-deleted — but a live doc⊥registry drift.)
- The per-wave commit cadence CANNOT use `--run ci` green as a signal — every wave's commit shows a red ci battery. The execution engine MUST run a narrowed per-wave set excluding the born-RED trio (ba-gestalt, ship-attestation, the planned close-sweep). If any workflow gates a wave on `--run ci` green, the tranche deadlocks. (Handoff to the DAG/friction lenses to confirm `bg-bh-execute.wf.js` honors a narrowed set.)

### C3 · MEDIUM · `ci.yml` is DRIFTED — `proof:glass-idiom-factor` in the registry, missing from the emitted workflow

`gates:verify-ci` RED at HEAD: "MISSING from ci.yml: proof:glass-idiom-factor". The gate landed in `gatesFor` pre-fold tagged `[local,ci,release]` but `gates:emit-ci` was never re-run, so GitHub Actions does NOT execute it — actual CI ≠ local registry. CLOSEFIX-9SITE R3 (`gates:emit-ci` regen) is specced to clear it, BUT R3 must pick up a gate it did NOT add (glass-idiom-factor landed pre-CLOSEFIX) — a build-phase verify (open question §5).

### C4 · LOW (transient) · `proof:tag-parity` RED — `category-card-warm` mis-tag

`category-card-warm` is `[local]` but a static src-scan gate, so tag-parity reds (1 violation). The gate PASSES 4/4 (fix landed). CLOSEFIX-9SITE R4 promotes to `[local,ci,release]` — safe (green). This red ALSO cascades into `proof:gate-manifest-sound`'s PARITY-HARDENED arm (one red, two surfaces).

### C5 · LOW (transient) · `proof:dock-shrink-blur` S3 fences a value the live dock no longer reads

S3 (`proof-dock-shrink-blur.mjs:149-160`) asserts `--glass-blur-dock-radius: 9px` byte-frozen; `glass.css:103` STILL declares `9px`. But the dock backdrop now paints `shell.css:29 --dock-surface-blur: var(--glass-blur-resting)` = 8px. S3 fences an orphan token's value — semi-vacuous against actual paint. CLOSEFIX-9SITE site (5) re-points S3 onto `--dock-surface-blur`→resting→8px. Plan-tracked.

### C6 · LOW (transient, NEW) · Three stale AZ freshness hashes red `proof:gate-manifest-sound`'s FRESHNESS arm

Live this pass: `W-DOCK1-DELTA.md` / `W-DOCK2-DELTA.md` / `W-CON1-DELTA.md` surface-hashes recompute stale (declared ≠ current bytes). These AZ-era tracker deltas red the content-hash freshness arm of `gate-manifest-sound` (`[local]` ∈ `--run full`/`--run local`). The `--strict-freshness` close arm (BB.W-DELTA-RESHOOT) is the mechanism that catches them, but the BG plan does NOT name a re-capture/re-stamp of these three AZ deltas. A fold-checkpoint drift class beside C3 — pre-existing, an open question whether CLOSEFIX/close clears it or it rides red to the cut.

---

## 3. VACUITIES FOUND (proxy-by-design; PLAN-ACKNOWLEDGED — the watch is the teeth route through C1)

### V1 · `proof:gestalt-cursor-parity` PARITY-A — toothless for 82/105 waves
The plan HONESTLY re-prices (`AMENDED-WAVE-PLAN.md:123`, `bg-build-map.md:509-519`): under `full`, 22/105 waves map all-10 and **82 map to NONE**, so PARITY-A (cursor-DONE ⇒ roster-PASS) is vacuously true for the majority. The load-bearing net is PARITY-C (orphan census) + the gate's own freshness. The EXACT vacuity shape the lens hunts (G2's original hand-authored-map sin), self-flagged + shifted onto PARITY-C — but PARITY-A remains a near-no-op a reader could mistake for coverage.

### V2 · `proof:field-aurora-aa` F-AA-ROSTER — "passes the literal {bar:4.5, born-RED} forever"
Verbatim from `EXECUTION-PROGRESS.md:113` + `bg-build-map.md:566`: the device-free ROSTER arm cannot enforce the eyebrow lift; it passes a frozen literal regardless of paint. The binding teeth are `[local]` F-AA-LIVE. So `[ci,release]` field-aurora-aa is a presence-check, not a contrast-check — vacuous as a CI gate for the thing it names.

### V3 · `proof:glass-refract-fence` F1 + F4 — regression/op-count proxies, not the renderability proof
F1 is "an anti-future-rainbow REGRESSION fence (transcription errors cancel)"; F4 is "a no-regression op-COUNT floor, NOT the renderability proof" (`bg-build-map.md:636`). The binding renderability + AA verdict binds to the on-device C18 leg. The device-free gate cannot fail on the actual cut-risk (Safari shader-compile / AA-over-ridge). Correct per the cardinal-lesson split, but a proxy.

### V4 (synthesis) · the teeth of V1–V3 all defer to `[local]`/live arms — which route through W-REFLECT3 (C1)
Healthy pattern: device-free arm = proxy, `[local]`/live arm = binding. BG follows it. The INCOHERENCE: the binding `[local]`/live arms' build-phase π is deferred throughout the build-map to **W-REFLECT3** — the wave `proof:ba-gestalt` G8 forbids. The verification architecture's actual teeth funnel to a wave the keystone reds. C1 and V4 are one disease from two ends.

### V-watch · the residual hand-authored roster
`bg-gestalt-roster.md` surface-PATHS are DERIVED (good), but the surface ENROLLMENT list, verdict cells, the SiriIsland addition, and the accept-residual allowlist (`PaperBackdrop`/`useDockOrientationMorph`) are hand-curated — the same hand-list class the gestalt-cursor-parity gate kills, displaced one level up into the roster. Bounded by the disposition-register precedent (rationale-bearing). PASS-2 watch.

---

## 4. DOES `--run ci` PASS AT HEAD? (definitive, with precise tag-sets)

**NO.** The `--run ci` set is the ci-tagged gates run fail-fast sequentially. The ci-tagged reds:
1. `proof:ba-gestalt` (ci) — 0/10 + 2 G8 (born-RED + C1).
2. `proof:ship-attestation` (ci) — absent (born-RED).
3. `proof:tag-parity` (local,ci) — 1 violation (category-card-warm mis-tag, C4).

`--run ci` halts at the first in manifest order. Reds 1–2 are red BY DESIGN (the tag cannot fire until close); red 3 is transient (CLOSEFIX R4).

**Precision correction (vs the prior draft):** `gates:verify-ci` (ci.yml drift, C3) is `["release"]`-tagged and `proof:gate-manifest-sound` (C6 freshness, C4 cascade) is `["local"]`-tagged — so they red `--run release`/`--run full`/`--run local`, NOT strictly `--run ci`. The full failure picture:
- `--run ci` → reds {ba-gestalt, ship-attestation, tag-parity}.
- `--run release`/`--run full` → ALSO {verify-ci drift, gate-manifest-sound: tag-parity-cascade + 3 stale-freshness + dock-animation-cache}.
- `--run local` → {gate-manifest-sound, ba-gestalt, …}.

**The manifest itself is SOUND** — `proof:gate-manifest-sound` GATE-MANIFESTED arm GREEN ("every proof:* key manifested or allowlisted"). The 7 new gap-wave gates are cleanly absent (no dangling registration).

---

## 5. THE 7 GAP-WAVE GATES — TARGETED CROSS-CHECK (newest, least battle-tested)

- **G4 `proof:category-card-warm`** (landed piece): GREEN 4/4, mis-tagged `[local]` (C4). The 9-site `--glass-blur-dock` census holds (confirmed: S3/theme-style/glass-cal/glass-depth/no-gray/unit-test/glass-cal.spec; `proof-no-gray:748` self-adapts, not a missed reader). No 10th site found for the blur chain. **But see C-NEW-1: the SAME unenumerated-frozen-string-reader risk recurs at WS8's `.glass-lens` retire, where the build-map names 3 gates and the real reader set is ≥5 (incl. the `[local,ci,release]` `proof:button-glass`).**
- **G3 `proof:close-sweep`** (absent): spec sound; canon home correctly PARENT-TRACKED out of the submodule; the `--run sweep`/`sweep-fast` dispatch is absent from `runMode` at HEAD (planned). `runMode` is fail-fast — the sweep's spawn-all-names-ALL-reds dispatch is genuinely new.
- **G2 `proof:gestalt-cursor-parity`** (absent): PARITY-A vacuity (V1); PARITY-C is the real net but depends on the hand-curated accept-residual allowlist (V-watch).
- **G6 `proof:field-aurora(-aa)`** (absent): F-AA-ROSTER vacuity (V2); the 5 stale `^1.2.0` strings the plan reconciles to `^1.1.1` are a dependency-floor watch (cross-lens with friction). HEAD `package.json` value.js floor = `^1.0.0` (pre-bump) — the `^1.1.1` CONSUME fires at the cut.
- **G1 `proof:safari-parity` + `proof:glass-refract-fence`** (absent): F1/F4 proxy (V3); operator correctly keyed to `uChromatic` not the invented `uDispersion`. The ★★★ renderability verdict is on-device by design.
- **G5 `proof:claude-deletable`** (absent): C2 de-blinded for the corrected 16-reader census; sound IF 16 complete — the submodule-canon-home + "16 not 12" corrections both reflected in the build-map.

**All 7 inherit C1** (their build-phase π routes to W-REFLECT3). That is the single cross-cutting defect across the gap set.

---

## 6. NEW SINCE THE PRIOR PASS / METHODOLOGY NOTES

1. **C-NEW-1 (HIGH)** — the WS8 `.glass-lens`-retire under-enumeration: `proof:button-glass` B4 (`[local,ci,release]`) + `proof:visual-reconcile` a1 (`[local,ci]`) both assert the Button composes `.glass-lens`, neither in the WS8 file/gate lists. The prior gate-composition draft did not surface this.
2. **C6 (LOW, NEW)** — 3 stale AZ freshness hashes (W-DOCK1/W-DOCK2/W-CON1) red `gate-manifest-sound`'s FRESHNESS arm; un-named in the BG plan.
3. **Roster-shape correction** — `proof:ba-gestalt` live shows **10** surfaces (adds tabs-segmented + page-band over the CLAUDE.md-named 8); SiriIsland is NOT yet enrolled (the G2 orphan-decision wave hasn't executed) — a roster⊥CLAUDE-canon count drift, and the SiriIsland enrollment is still owed.
4. **`--run ci` vs `--run release` tag precision** — corrected the prior draft's listing of verify-ci/gate-manifest-sound as `--run ci` reds (they are release/local-tagged).
5. **Concurrent-audit gate-pollution (methodology)** — `proof:gate-manifest-sound`'s CLEAN-TREE arm RED-flagged the 3 sibling research files (`friction-history`, `page-wave-coverage`, `wave-dag-coherence`) the PARALLEL pass-1 agents are mid-writing. This is a TEST ARTIFACT of running a clean-tree gate during a concurrent audit, NOT a source defect — flag for synthesis so it is not mis-counted as a real red.

---

## 7. OPEN QUESTIONS FOR PASS 2 / SYNTHESIS

1. **C1 fix shape:** does re-homing "rides W-REFLECT3" onto the per-wave self-close model require editing all 61 [P] build-map rows + the deferral table, or can one canonical "BG per-wave close" phrase replace the funnel? (Prototype: sed + re-run `proof:ba-gestalt` G8.)
2. **C-NEW-1 enumeration:** the WS8 retire matrix must be widened from 3 gates to the full `.glass-lens`/`glass-refract`-class reader set (button-glass B4, visual-reconcile a1, + triage safari-webgl/theme-style/no-dead-token/liquid-glass-tokens for class-vs-token). What is the actual N? (Mirror the G4 9-site enumeration.)
3. **C2 engine check (DAG handoff):** does `bg-bh-execute.wf.js` gate any wave on `--run ci` green, or run a narrowed per-wave set excluding the born-RED trio? If the former, the tranche deadlocks.
4. **C6 freshness:** does CLOSEFIX/the close re-capture+re-stamp the 3 stale AZ deltas, or do they ride red to the cut?
5. **C3 regen ordering:** confirm CLOSEFIX-9SITE's `gates:emit-ci` R3 re-emits glass-idiom-factor (it landed pre-CLOSEFIX, so R3 must pick up a gate it did not add).
6. **V-watch:** should the accept-residual allowlist be DERIVED (from `meta.focal`/route-render data) rather than hand-curated, closing the last hand-list?

---

## APPENDIX · EVIDENCE INDEX (file:line / live runs at HEAD `6c1f5386`)

- G8 clause: `scripts/proof-ba-gestalt.mjs` `G8A_RE`; live violations `EXECUTION-PROGRESS.md:38,:113`.
- W-REFLECT3 counts (re-grepped): build-map 7 / EXECUTION-PROGRESS 10 / AMENDED-WAVE-PLAN 8 / FINAL 4; no `BG/waves/*reflect*` file.
- C-NEW-1: `proof-button-glass.mjs:298` (B4 `consumesRefractAxis`), `gates.mjs:1251` (`["local","ci","release"]`); `proof-visual-reconcile.mjs:131-134` (a1 `composesLens`), `gates.mjs:1949` (`["local","ci"]`); `Button.vue:220` (`'glass-lens'`); WS8.4 `bg-build-map.md:678-681` (delete `.glass-lens`/`glass-refract.css`); zero `visual-reconcile`/`button-glass` mention in build-map/progress.
- glass-lens/glass-refract surviving-gate fan-out: button-glass(25), safari-webgl(11), visual-reconcile(16), theme-style(3), no-dead-token(2), liquid-glass-tokens(2), dist-css(2), no-retired-survivor(1).
- C3: `gates:verify-ci` live RED "MISSING from ci.yml: proof:glass-idiom-factor"; tags `["release"]` (`gates.mjs:2135`).
- C5: `proof-dock-shrink-blur.mjs:149-160` (9px fence); `src/styles/tokens/glass.css:103` (`9px`); `src/styles/dock/shell.css:29` (`--dock-surface-blur: var(--glass-blur-resting)`).
- C6: `proof:gate-manifest-sound` live FRESHNESS-CONTENT-HASH reds on W-DOCK1/W-DOCK2/W-CON1 deltas.
- Tag sets: `gatesFor("full")` = deduped union local∪ci∪release (`gates.mjs:2305-2317`); `runMode` fail-fast sequential (`:2320-2340`); `--run sweep` absent.
- Manifest soundness: `proof:gate-manifest-sound` GATE-MANIFESTED arm GREEN.
- Dep floor: `package.json:1078` value.js `^1.0.0`, keyframes `^5.0.0`; cut bumps value.js→`^1.1.1` / keyframes→`^5.1.0`.
- Live gate runs: ba-gestalt (FAIL 0/10 + 2 G8), ship-attestation (FAIL absent), tag-parity (FAIL 1), category-card-warm (PASS 4/4), gates:verify-ci (FAIL drift), gate-manifest-sound (FAIL: GATE-MANIFESTED-green + tag-parity-cascade + 3-freshness + R6 + clean-tree-artifact).
- 7 gap-wave gates: all absent (no `.mjs`, no `package.json` key, no `gatesFor` row).
