# PASS-1 RESEARCH — LENS: GATE REALITY

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `b716b5be` (advanced +4 commits past the prior report's `9dfe285c` — the live-fix batch) · siblings-intact exit 0 (before + after)
**pkg:** `4.2.0` (cut target 5.0.0)
**Method:** device-free gate battery. The fail-fast `gates.mjs --run ci` was discarded (it bails at the first sibling red and masks the truth — `scripts/gates.mjs:2334`). Instead each load-bearing gate driven directly (`node scripts/proof-<g>.mjs` + JSON-artefact status), plus a non-bailing `gatesFor("full")` sweep (heavily CPU-contended by a parallel sibling `--run local` agent, so its tail did not complete — the 4 genuine close reds are established by DIRECT runs, NOT the partial sweep). Cross-referenced against `A-gate-system.md` (the 4.2.0 structural vacuousness audit) + the 5 sibling PASS-1 lenses (clobber, cursor-truth, code-vs-spec, paint-integrity, arch-buildorder) + the live-fix DELTAs (D-1/D-2/D-3). NO browsers.

---

## TL;DR (the load-bearing conclusions)

1. **The 4-red close battery is CONFIRMED at the advanced HEAD `b716b5be`.** The live-fix batch (`07c6e6ec` D-1 / `e40e5095` D-2 / `8947288a` D-3 / `b716b5be` docs) did NOT cure and did NOT add to the close reds. All four directly re-run RED at HEAD: `proof:no-god-module` (ladder.css 527 + shell.css 510 > 500), `proof:no-dead-token` (`--glass-blur-dock` orphan, 1 dead token), `proof:gen-ci-fresh` (ci.yml 660 vs 662, line 436 — `proof:glass-idiom-factor` un-regenerated), `proof:tag-parity` (`proof:category-card-warm` registered `["local"]` without `ci`). These are the SAME 4 the clobber/cursor-truth/code-vs-spec lenses found at `9dfe285c`. The remediation is cheap (re-point/carve/regen/promote) but all four are HARD ci/release blockers.

2. **The recurring disease is LIVE and the gate system has NO standing per-wave sibling-gate sweep.** Each of the 4 reds is the SAME class — "a wave greened its OWN gate and left a registered sibling close-gate un-re-pointed." The 12→cured→4-re-mint history (validation report `ff0933a3` → SYNTH `ea4682c0` → WS3/WS4 re-seed) proves the class RE-MINTS with different artifacts each batch — a hand-picked SWEEP_SET is structurally brittle. Every PENDING band that touches the glass token cascade / `gates.mjs` / `ci.yml` re-opens it.

3. **The keystone PAINT gate (`proof:ba-gestalt`) is GENUINELY re-pointed BC→BG (Stage-0 0.2 real, not vacuous) and born-RED by design — 0/10 surfaces PASS.** The A-gate-system 4.2.0 defect (a BC-frozen roster greening 16/16 vacuously) is closed at the FLOOR: the gate consts now read `docs/tranches/BG/`, `surface-closure.mjs` derives route seeds with HARD-RED teeth, 10 surface `.md` records exist. The RED is intentional (flips only via paint waves + W-REFLECT3). `proof:ship-attestation` is likewise born-RED (the tag-blocker) with a 7/7-leg self-test that has teeth.

4. **The 5 live-render gates that close the A-gate-system structural root causes (RC1/RC2) are ALL ABSENT — scripts AND registration.** `proof:route-navigates`, `proof:field-aurora`, `proof:previews-render`, `proof:uniform-blur`, `proof:safari-parity`: 0 scripts on disk, 0 refs in `gates.mjs`. These are the gates that make the routing/field/preview defects ship-green-IMPOSSIBLE. Until they land (WS7 phase-12, all PENDING), the keystone is still an author-captured-paint gate and the "source-green/visually-broken" gap is structurally re-openable. **This is the largest gate-reality debt and the non-negotiable pre-cut fence.**

5. **The 3 live-fixes (D-1/D-2/D-3) are real + paint-backed, but their gate-lock quality DIVERGES — a gate-reality split worth recording.**
   - **D-3 (dock collapse-balloon)** is the GOOD pattern: a real source fix (`layers.css:92` reads the directional `--dock-expand-t`, not raw `--dock-morph-t`) + a TIGHTENED device-free gate (`proof-dock-engine.mjs:465` pins the `clamp(0, var(--dock-expand-t` blend — a revert REDs E4, verified). Gate-locked AND paint-backed.
   - **D-1 (constellation cursor-tracking)** is the WEAK pattern: a real source fix (`DEFAULT_PARALLAX = 0` at `constants.ts:146`, opt-in) + on-disk before/after PNGs, but **NO device-free gate asserts the parallax default** — `proof:viz-constellation`/`-field`/`-tokens` pass IDENTICALLY whether parallax is 0 or 0.08. The fix is PAINT-ONLY-verified (local π); a silent revert to 0.08 would not RED any device-free gate. **Regression-prone.**
   - **D-2 (paper-grain gray wash)** is DEMO-LOCAL (library grain utility byte-untouched, the gray-tooth-warmth-from-substrate fence held) + adds `paper-glass.vue` to the `proof:demo-radial-calm` RADIAL_KEEP allowlist (the gate's own prescribed remedy). Gates pass non-vacuously, but the fix grew the allowlist — the allowlist-as-escape pattern is worth a recorded eye.

6. **The CI runner is FAIL-FAST** (`process.exit(1)` at first red). A naive `--run ci` bails at `proof:consumers:static` (pos 6, a sibling red that skips in a fresh siblings-absent checkout) and MASKS every downstream red incl. the 4 genuine WS3/WS4 reds. **A green `--run ci` that bailed early is a false read — the close MUST run `--run full` siblings-absent in a fresh `/tmp` throwaway worktree** (per CLAUDE.md W-CLOSE-BATTERY + SIBLING-SAFETY; NEVER touch `~/Programming`). Footgun: standalone `proof-*.mjs` print `status: FAIL` but **exit 0** (the harness reads the JSON artefact, not `$?`) — a fix-agent checking `$?` reads a false green.

---

## §A — THE 4 GENUINE CLOSE-BATTERY REDS (directly re-confirmed at `b716b5be`)

All four exit-RED via direct run at HEAD. None is born-RED-by-design; all are genuine ci/release blockers; all the SAME "greened own gate / left sibling RED" class:

| Gate | tagset | State | Root cause (attributed) | Class |
|------|--------|:-----:|-------------------------|-------|
| `proof:no-god-module` | ci/release | **RED** | `src/styles/glass/ladder.css` **527** (>500, grown 489→527 by `6ec81deb` GLASS-IDIOM-FACTOR) + `src/styles/dock/shell.css` **510** (>500, grown 498→510 by `cd9ce46c` GLASS-BLUR-PEER). NEITHER in `RATCHET_BASELINES` (16 active entries, none ladder/shell). | new god-module ×2 |
| `proof:no-dead-token` | ci/release | **RED** | `--glass-blur-dock` declared (`glass.css:166`, `dark-arm.css:286`) with ZERO `var(--glass-blur-dock)` readers (grep empty, re-verified). GLASS-BLUR-PEER re-pointed `shell.css --dock-surface-blur` → `--glass-blur-resting`, orphaning the composed token. **3-DEEP orphan chain** (see §A.1). | new dead token |
| `proof:gen-ci-fresh` | ci/release | **RED** | `ci.yml` = 660 lines vs `--emit-ci` expects 662; first diff line 436 — `proof:glass-idiom-factor` (added `6ec81deb`) was never regenerated into `ci.yml`. | ci.yml drift |
| `proof:tag-parity` | ci/release | **RED** | `proof:category-card-warm` registered `tags: ["local"]` (`gates.mjs`, added `9e13965d`) — a static src-scan gate missing `ci`, not in `JUSTIFIED_LOCAL_ONLY` (1 violation). | gate mis-registration |

### §A.1 — `--glass-blur-dock` is a 3-DEEP orphan chain + a SILENT saturate regression (the gate-VACUOUSNESS finding for this lens)

A naive "delete the flagged token" fix cascade-reveals a second dead token next sweep AND leaves a live visual change un-asserted. The chain (corroborated with the clobber lens, re-verified by grep):
1. `--glass-blur-dock` (composite) — DEAD (0 readers; the gate flags it).
2. `--glass-saturate-dock` (1.4 light / 1.30 dark) — read ONLY by the dead composite → orphaned-via-dead-reader; `proof:no-dead-token` sees it "alive" today, so deleting only #1 makes #2 dead NEXT sweep.
3. `--glass-blur-dock-radius` (9px) + the `--blur-dock` `@theme` bridge — no live utility consumer → effectively orphaned.

**The silent semantic regression `proof:glass-cal` DELIBERATELY does not check:** before the unify the dock `backdrop-filter` was 9px + `saturate(1.4)` + `brightness(1.12)`; after, it reads `--glass-blur-resting` (8px) + resting saturate. `proof-glass-cal.mjs:99` peer-lock is SCOPED to the radius leg ONLY — *"the saturate-revert is … EXCLUDED from the lock"*. So the gate is GREEN by deliberately not checking the leg that changed. **This is a vacuousness-by-scoping: the gate's own comment proves the author knew the saturate identity changed and chose not to lock it.** Whether the dock should read the resting saturate is UNSIGNED-OFF and no device-free gate will catch it — it needs a dock paint sign-off at W-REFLECT3 against the pre-unify 9px/saturate-1.4 look. The `no-dead-token` fix must delete the WHOLE chain atomically (P2 sibling: it also REDs `glass-cal B3` + cascades to `glass-depth D3` — a 6-gate sweep, not 4).

---

## §B — BORN-RED-BY-DESIGN + SIBLING REDS (intentional — NOT regressions; do not mistake for defects)

- **`proof:ba-gestalt`** — RED 0/10 PASS, born-RED by design. Roster GENUINELY re-pointed BC→BG (`proof-ba-gestalt.mjs` consts → `docs/tranches/BG/audit/reflect/`; 10 surface `.md` on disk; `surface-closure.mjs` routeSeeds HARD-RED). Operative verdicts flip ONLY via paint waves + the non-authoring W-REFLECT3 re-capture. The re-point is real; the RED is the deliverable.
- **`proof:ship-attestation`** — RED `[absent]` SHIP-ATTESTATION.json. The intended tag-blocker; flips when `release.sh --run ship` commits a fresh Metal attestation. 7/7-leg subprocess self-test has teeth (stale/verdict/renderer/digest/webkit/absent forgeries all RED). Genuine, load-bearing.
- **`proof:dock-no-scale-pop`** `[local]` — its live W3/W4 arm fail-closes for lack of a running `:5199` demo (a local-only π arm — the D-3 DELTA records this). `[local]`-tagged → does NOT block the ci/release close. (Caught in the partial sweep at pos 17; not a CI red.)
- **`proof:visual-runner`** W4 — local-paint born-RED to W-REFLECT3 (reported in facts, not a ci-failing violation).
- **Sibling reds (skip/green in a fresh siblings-absent CI):** `proof:consumers:static` (pos 6), `proof:phantom-classes` (pos 8), `proof:consumer-staleness`, `proof:tier-class-staleness` — constellation imports + the retired `ui/Tabs` consumer migration owed at 5.0.0 (THEIR edit, foreign-tree fence). `proof:dock-animation-live` (browser-π, no served demo).

---

## §C — THE 3 LIVE-FIXES THROUGH THE GATE-REALITY LENS (D-1 weak / D-2 demo-local / D-3 gate-locked)

The freshest landings (the +4 commits past the prior report). All three are REAL source fixes with on-disk DELTA PNGs (D-1: 4 before/after PNGs; D-2: pixel-stats.json + DELTA; D-3: DELTA + PNGs), and all are dual-engine-claimed. But their DEVICE-FREE gate-lock quality diverges — the load-bearing distinction for whether each is regression-safe at the cut:

| Fix | Source change verified | Device-free gate teeth? | Verdict |
|-----|------------------------|-------------------------|---------|
| **D-3 dock collapse-dir** | `layers.css:92` `clamp(0, var(--dock-expand-t,1),1)` (directional, not raw `--dock-morph-t`) | **YES** — `proof-dock-engine.mjs:465` E4 pins the `--dock-live` blend reads `var(--dock-expand-t`; a revert REDs (DELTA verified). `proof:dock-engine` PASS. | **keep-verified** — gate-locked + paint-backed (the GOOD pattern) |
| **D-2 paper-grain** | demo-local: `paper-glass.vue`/`paper-texture.vue` warm radial + `contain:paint`; `story-hero.css --story-paper-wash` LIGHT non-transparent; library grain util BYTE-untouched | **partial** — `proof:demo-radial-calm`/`-no-paper-field`/`-category-card-warm` PASS non-vacuously, but the fix GREW the `RADIAL_KEEP` allowlist (the gate's prescribed remedy; allowlist-as-escape) | **keep-verified** (demo-local, fence held) — note the allowlist growth |
| **D-1 constellation** | `constants.ts:146` `DEFAULT_PARALLAX = 0` (opt-in, clean break); `Constellation.vue` reads the single const | **NO** — `proof:viz-constellation`/`-field`/`-tokens` do NOT assert the parallax default (pass identically at 0 or 0.08). PAINT-ONLY (local pointer-sweep π). | **keep-verified** (real fix, paint-backed) — but **regression-prone: machine-lock the parallax-default-OFF in a device-free clause** |

**The D-1 gate gap is a named must-fix for the re-spec:** the user-reported, obvious, HIGH defect was fixed by a one-token change with ZERO device-free guard. The constellation gates verify SDF/instancing/warm-cream but never the interaction default. A `proof:viz-constellation` clause asserting `DEFAULT_PARALLAX <= sub-perceptual` (or `=== 0`) + a self-test bite would make the fix permanent. Without it, the fix rests entirely on a local paint arm no CI runs.

---

## §D — STRUCTURAL: THE A-GATE-SYSTEM ROOT CAUSES ARE ONLY PARTIALLY CLOSED (the live-render debt is the bulk)

The A-gate-system 4.2.0 audit found the keystone vacuous: F1 BC-frozen roster (16/16 vacuous PASS), F2 self-certified surface whitelist, F3 tiny probe boxes, F5 "live" π dodges the field via reducedMotion, F7/F8 routing/field/previews UNGATED, RC1 (gate proves SOURCE+PAPERWORK, self-certifies its PAINT scope), RC2 (the live-pixel layer is structurally severed from the shipping tag).

**Closed at HEAD (the FLOOR):**
- **F1 (frozen roster) — CLOSED.** `proof-ba-gestalt.mjs` consts → `docs/tranches/BG/`; BG reflect roster + 10 surface records on disk; born-RED 0/10.
- **F2 (self-certified whitelist) — PARTIALLY closed.** `surface-closure.mjs` DERIVES route seeds from demo route files with a HARD-RED on a 2-segment route whose `story.vue` is absent — real teeth. But the derivation is ROUTE-EXISTENCE-scoped, NOT the full transitive CSS paint-closure the BG.W-GESTALT-ROSTER-RE-POINT wave specced (auto-including `paper.css`/`AppShell.vue`/`SectionLanding.vue` in every surface's watched set). Verify at WS12 whether the watched set is derived-complete or still narrow.
- **RC4 (close runs the real battery) — addressed in PRINCIPLE.** `proof:close-battery-parity` locks `--run full` siblings-absent into release.sh/release.yml. But it is GREEN as wiring; the binding test is the actual `--run full` run at the cut (and it is RED on the 4 §A reds today).

**NOT closed (the LARGE pending bulk — RC1/RC2/RC3, F7/F8):**
- **All 5 live-render gates ABSENT** (verified: 0 scripts, 0 `gates.mjs` refs): `proof:route-navigates` (12.4), `proof:field-aurora` (12.5), `proof:previews-render` (12.6), `proof:uniform-blur` (12.7), `proof:safari-parity` (12.8). These are RC1/RC2's structural closure — the gates that read real routing/field/preview pixels in CI (DOM-level for route-navigates; π for the others). PENDING by plan (WS7 phase-12), not broken.
- **The FIELD-AURORA proof stands** (corroborated by paint-integrity + cursor-truth): 2.2 shipped device-free-GREEN (`proof:no-gray`/`proof:dark-material`) at **1.04:1** muted over the composited dark field — caught ONLY by re-paint luck. This is the permanent evidence that device-free GREEN ≠ visually correct for field-composited surfaces, and the entire rationale for `proof:field-aurora` (P6). Every PENDING glass surface over the shell field carries the same latent risk; the gestalt verdict + the live gates are the ONLY net.

**Net:** Stage-0 is a real floor (re-point + derivation + ship-discipline + close-battery-parity wiring), NOT a vacuous re-point. But the live-pixel ENFORCEMENT the audit demanded is the LARGE pending bulk. **The cut MUST NOT precede WS7 phase-12 (the 5 live gates) + the W-REFLECT3 gestalt-flip** — they are the only automated net for the field-composited-AA class.

---

## §E — GATE-BUILD DEBT (the PENDING bulk, gate-reality lens)

~364 gates in `gatesFor("full")`. The cursor's `gate` column names many gates that DO NOT EXIST yet — each PENDING wave mints its gate born-RED. Sampling: `proof:dock-orchestrator-single`, `proof:dock-fission`, `proof:no-shadcn-default` EXIST (prior-tranche/early); but `proof:glass-blur-engage`, `proof:siri-island`, `proof:siri-waveform`, `proof:viz-resize-upload-only`, `proof:glass-clip`, `proof:safari-blur`, `proof:de-shadcn`, `proof:story-page-api`, `proof:coherence-census`, `proof:hue-at-l`, `proof:constraint-manifest`, `proof:flip-one`, `proof:bento-specimen`, + the 5 live-render gates are ABSENT. NORMAL — they materialize as their wave builds — but it means the cursor's gate-named reality is established only at build time, not pre-verifiable now. The build-order spine (WS3 → WS2 → WS5/6 → WS4 → WS7 phase-12 → WS8/9 → WS10/11/12) correctly lands the close-machine live gates LAST (after the surfaces they probe exist) — KEEP that ordering.

**`useDockSpring` correctly ABSENT** (`grep` empty; 5 `new SpringProgress` in `dock/` = the WS2 5→1 convergence target) → WS6 SIRI-ISLAND correctly born-RED until WS2 lands. The gate dependency edges are sound.

---

## §F — RISKS AT THE 5.0.0 CUT (gate-reality lens)

1. **★★★ The live-render enforcement debt (RC1/RC2) is the entire pending bulk.** The keystone is a born-RED placeholder; the 5 gates that read real routing/field/preview pixels are ABSENT. A cut before WS7 phase-12 + W-REFLECT3 reproduces the BD source-green/visually-broken close. **Non-negotiable ordering fence.**
2. **★★★ The 4 close reds block `--run full` NOW** and the disease re-mints (12→4 proves a fixed SWEEP_SET is brittle). Mitigation owed: (a) an atomic 6-gate close-fix (R1–R4 + the cascade `glass-cal B3` / `glass-depth D3` from the dead-chain delete), AND (b) a STANDING per-wave sibling-gate sweep enrolling the whole CLASS (a `closeDisease:true` manifest flag), NOT a one-shot fix. Every PENDING glass-cascade/`gates.mjs`/`ci.yml`-touching wave (the vast majority) re-opens it.
3. **★★ Gate-vacuousness by scoping is LIVE on the dock saturate** (§A.1) — `proof:glass-cal` is GREEN by deliberately not checking the leg the unify changed. The dock's resting-saturate identity changed under green gates; only a dock paint sign-off catches it.
4. **★★ The carve-order is INVERTED.** ladder.css (527) + shell.css (510) over-bound NOW; WS8/WS9 grow them further BEFORE the WS4 carve discipline runs. The close reds COMPOUND across the deep-morphism band. Move a cascade carve (or an EXPLICIT ratchet re-pin with rationale) BEFORE WS8/WS9 — or `no-god-module` re-reds on every deep wave.
5. **★★ D-1 constellation fix is device-free-unguarded** (§C) — the user-reported HIGH defect rests on a local paint arm; machine-lock the parallax-default in a `proof:viz-constellation` clause or it can silently regress.
6. **★ The fail-fast footgun + the exit-0-on-FAIL standalone footgun** mask the truth. Trust ONLY `gates.mjs --run full` siblings-absent (fresh `/tmp` worktree, NEVER `~/Programming`).
7. **★ CLAUDE.md `RATCHET_BASELINES == {}` is stale** (BB.W-CARVE5 claim vs 16 live entries, re-populated at BD.W-CUT). The BH canon-home migration must read the LIVE 16-entry state, not copy the `=={}` assertion forward. The ladder/shell additions are the newest symptom — decide drain-vs-accept at the cut, not silent carry.

---

## APPENDIX — commands run (all read-only)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- Direct gate runs at `b716b5be`: `proof-no-god-module` FAIL (ladder 527, shell 510); `proof-no-dead-token` FAIL (`--glass-blur-dock`, 1 dead); `proof-gen-ci-fresh` DRIFT (660 vs 662, line 436); `proof-tag-parity` 1 violation (category-card-warm local-only); `proof-dock-engine` PASS (E4 directional `--dock-expand-t`); `proof-viz-constellation` PASS (C1-C5, no parallax assert); `proof-demo-radial-calm`/`-no-paper-field`/`-category-card-warm` PASS.
- Non-bailing `gatesFor("full")` sweep (364 gates) — CONTENDED with a parallel `--run local` agent; tail did not complete; partial reds {pos6 consumers:static, pos8 phantom-classes, pos17 dock-no-scale-pop[local]} all known/expected. The 4 genuine close reds confirmed by DIRECT run, not the partial sweep.
- 5 proposed live-render gates: ABSENT (0 scripts, 0 gates.mjs refs) — `proof:{route-navigates,field-aurora,previews-render,uniform-blur,safari-parity}`.
- `DEFAULT_PARALLAX = 0` at `constants.ts:146`; D-1/D-2/D-3 DELTA PNGs resolve on disk (`docs/tranches/BG/audit/visual/live-fixes/`).
- `git rev-parse HEAD` → `b716b5be`; tree clean (RESPEC output only).
- Cross-read: `A-gate-system.md`, `pass-1-research-{clobber,cursor-truth,code-vs-spec,paint-integrity,arch-buildorder}.md`, `pass-1-synthesis.md`, `DEFECT-LEDGER.md`.
