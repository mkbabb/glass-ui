# BA.W-GESTALT-GATE — the gestalt acceptance bar minted + the live-gate port residue swept

**Name**: W-GESTALT-GATE - the holistic per-surface acceptance gate + live-gate port hygiene
**Opens after**: BA tranche open / Batch 0 (runs ‖ W-SHELL-HOLD ‖ W-HYGIENE ‖ W-CARVE2 — disjoint file bounds per EXECUTION-DAG §8)
**Agents**: 1
**Hard gate**: `proof:ba-gestalt` (born-RED against the 19 R8 ground captures) — a roster of named surfaces each owed a whole-page capture in BOTH modes over its real backdrop + a recorded gestalt verdict; PLUS `proof:gate-manifest-sound`'s NO-5173 clause widened to forbid EVERY non-:5199 default (born-RED on the three surviving `:5175` dock-gate defaults + the `:5173` profile-aurora residue), all four re-pointed to `:5199`.
**Status**: SPEC

## Goal criterion

The BA tranche has a HOLISTIC acceptance bar in place before any visual wave runs — `proof:ba-gestalt`, a per-surface roster gate ABOVE the per-mechanism π readback that demands a whole-page capture in BOTH modes plus a recorded gestalt verdict, born-RED against the R8 state so the P-1 close-class failure (mechanisms green, page wrong) cannot recur by construction — and the live-gate fleet defaults to the correct `:5199` server with the port-residue blind spot closed so every later wave's live verification runs against the right instance.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's two grounded root causes — the P-1 close-class verdict and the CHR-1 port residue — not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before authoring the gate or touching a port default, the impl agent re-greps each anchor below at HEAD and confirms the mechanism still holds; if any cite has drifted (a port already re-pointed, a clause already widened, a ground capture renamed), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the diagnosis.

Grounding findings:

- **P-1 [S1] (precepts-conformance.md:42-86)** — the chronic gate-green / user-rejected close. AZ FINAL §4 (`docs/tranches/AZ/FINAL.md:119-131`) marked all 9 reflection surfaces PASS; the user re-audited the published 3.13.0 tree the SAME DAY (R8) and re-opened ≥7 of them. The recorded cause: the per-mechanism π verifies the LOCAL mechanism the fleet root-caused in isolation (a pixel ΔL, an `h1Overlap:false`) but cannot verify the GESTALT the user reads ("totally mis-aligned" is a placement/relationship judgement, not a contrast delta). The remedy direction the lane seeds: a GESTALT acceptance gate ABOVE the per-mechanism π readback — a holistic per-surface "does this look right as a whole, in BOTH modes, at real device scale" verdict, tied to the `complete` vs `complete_with_misses` decision. This wave MINTS that gate; W-REFLECT2 (Batch 7) is its binding operative consumer (BA invariant 4).
- **DC-CHR-1 [CHRONIC · S2] (deferred-census.md:142-157)** — the `:5175` live-gate residue, the `:5173`-sweep's blind spot. AZ.W-GATES swept `:5173` → `:5199` and authored `proof:gate-manifest-sound` with a NO-5173 clause whose regex matches `:5173` ONLY, so THREE dock gates still default the OTHER legacy port `:5175` and sailed past:
  - `scripts/proof-dock-clip-reveal.mjs:300` — `process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5175"`
  - `scripts/proof-dock-big-dock.mjs:304` — `process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5175"`
  - `scripts/proof-dock-layering-polish.mjs:451` — `process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5175"`
  - `scripts/profile-aurora.mjs:24` — `process.env.GLASS_UI_AURORA_BASE_URL ?? "http://127.0.0.1:5173"` (a profile script, outside the live-gate set — lower priority, same class)
  - The NO-5173 clause: `scripts/proof-gate-manifest-sound.mjs:131` — `const DEFAULT_5173 = /\?\?\s*(["']https?:\/\/[^"']*:5173["']|5173\b)/;` (the regex that forbids `:5173` only; widen it to forbid any non-:5199 default). The clause walks `liveGateScripts()` (`proof-gate-manifest-sound.mjs:71-77` — globs every `scripts/proof-*.mjs` + `tests-visual/playwright.config.ts`), so the three `:5175` dock gates are ALREADY in the script set the clause reads — only the regex misses them.

Born-RED evidence for `proof:ba-gestalt`: the 19 R8 ground captures at `docs/tranches/BA/audit/ground/R8-*.png` (verified present at HEAD: `R8-01-dock-rail-misaligned-{a,b}.png`, `R8-03-darkmode-toggle-broken.png`, `R8-04-aurora-configurator-occlusion-{a,b}.png`, `R8-05-speedtest-preview-dim.png`, `R8-06-dock-buttons-cutoff-rail-fanout.png`, `R8-07-goo-configurator-broken.png`, `R8-08-fading-scroll-list.png`, `R8-09-docks-lack-sections.png`, `R8-10-padding-fourier-demos.png`, `R8-11-black-bg-hides-glass.png`, `R8-12-toasts-not-glassy.png`, `R8-13-{button-large-uninteresting,not-glassy-b}.png`, `R8-14-progress-sectioned-broken.png`, `R8-16-awful-scrolling-item.png`, `R8-17-play-button.png`, `R8-18-disco-hover.png`). These are the user's own gestalt-FAIL evidence — the gate is RED at HEAD because every roster surface's recorded verdict resolves to one of these FAIL captures with no PASS replacement.

RE-GROUND command set (run all; confirm each mechanism):

```
grep -n '5175' scripts/proof-dock-clip-reveal.mjs scripts/proof-dock-big-dock.mjs scripts/proof-dock-layering-polish.mjs   # the three :5175 defaults
grep -n '5173' scripts/profile-aurora.mjs                                                                                  # the profile-aurora residue
sed -n '125,140p' scripts/proof-gate-manifest-sound.mjs                                                                     # the NO-5173 clause regex (DEFAULT_5173 at :131)
sed -n '71,77p'  scripts/proof-gate-manifest-sound.mjs                                                                      # liveGateScripts() globs all proof-*.mjs
ls docs/tranches/BA/audit/ground/R8-*.png | wc -l                                                                          # MUST be 19 (the born-RED evidence)
grep -rn 'ba-gestalt' package.json scripts/                                                                                 # MUST be empty pre-wave (the gate does not yet exist)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | P-1 close-class void [S1] | `docs/tranches/AZ/FINAL.md:119-131` (the 9-surface PASS matrix); `docs/tranches/BA/audit/USER-AUDIT-2026-06-11-R8.md` (the same-day re-opening) | the close verified per-mechanism π, not the gestalt; no holistic acceptance gate exists — `grep -rn 'ba-gestalt'` returns 0 |
| 2 | CHR-1 :5175 dock-gate default [S2] | `proof-dock-clip-reveal.mjs:300`; `proof-dock-big-dock.mjs:304`; `proof-dock-layering-polish.mjs:451` | three live dock gates default the foreign `:5175` port the `:5173` sweep + the NO-5173 regex both miss |
| 3 | CHR-1 profile-aurora :5173 residue [S2] | `proof-aurora.mjs` → `profile-aurora.mjs:24` (`?? "http://127.0.0.1:5173"`) | a profile script outside the live-gate set defaults `:5173`; same class, lower priority |
| 4 | CHR-1 NO-5173 regex blind spot [S2] | `proof-gate-manifest-sound.mjs:131` (`DEFAULT_5173 = /…:5173…/`) | the soundness clause forbids `:5173` ONLY; `:5175` (and any future stray port) sails past — the recurrence root the chronic demands closing |

## Scope

1. Mint `scripts/proof-ba-gestalt.mjs` (a NEW source-anchored gate, the comment-strip + pure-detector house pattern mirroring `proof-no-god-module.mjs` / `proof-dock-unify.mjs`) reading a roster LEDGER at `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` (created this wave). The roster enumerates the named acceptance surfaces from the W-REFLECT2 reflection set — **dock** · **configurators+goo** · **aurora** · **glass+feedback** · **shell** · **motion+fourier** · **dark-register-as-a-surface** · **cross-repo** — each row carrying: the surface name, the demo route(s) it covers, the two required capture paths (light + dark whole-page over the real backdrop), the recorded gestalt VERDICT (`FAIL` | `PASS`), and the R8 ground-capture id(s) the FAIL anchors to. The gate ASSERTS the roster is well-formed (every surface has both mode capture paths declared + a verdict + a ground anchor) and that its OPERATIVE state is the OR of the per-surface verdicts. Born-RED: every row's verdict is `FAIL` at HEAD (anchored to the R8 ground captures, no PASS replacement exists).
2. Register `proof:ba-gestalt` in `package.json` scripts (`"proof:ba-gestalt": "node scripts/proof-ba-gestalt.mjs"`) and add the gate row to the `scripts/gates.mjs` registry. Tag it `["local"]` at this wave (it is RED by design until W-REFLECT2 flips the verdicts — it must NOT block `ci`/`release` while the tranche is mid-flight; W-REFLECT2 promotes it to the operative close set when it drives the verdicts GREEN). The row `note` records the P-1 close-class lineage + the gestalt-above-mechanism contract.
3. Re-point the three `:5175` dock-gate defaults to `:5199` — `proof-dock-clip-reveal.mjs:300`, `proof-dock-big-dock.mjs:304`, `proof-dock-layering-polish.mjs:451` — each `?? "http://localhost:5175"` → `?? "http://localhost:5199"` (the env-var override `GLASS_UI_DEMO_URL` is preserved; only the nullish default changes).
4. Re-point the profile-aurora `:5173` default to `:5199` — `profile-aurora.mjs:24`, `?? "http://127.0.0.1:5173"` → `?? "http://127.0.0.1:5199"` (the `GLASS_UI_AURORA_BASE_URL` override preserved).
5. Widen `proof:gate-manifest-sound`'s NO-5173 clause (`proof-gate-manifest-sound.mjs:131`) so it forbids EVERY non-:5199 default, not `:5173` alone. The regex becomes a generic "a `GLASS_UI_*` URL/PORT nullish-default whose port is NOT 5199" detector — it must catch `:5175`, `:5173`, and any future stray port, while leaving the env-var override form and the explanatory comments (the comment-strip already runs before the test at `:138`) GREEN. Rename the clause's labels/variables off the `5173`-specific naming to the generic "NON-:5199 DEFAULT" register so the clause name no longer lies about its reach.
6. Record the gestalt-gate contract + the port-residue closure in `CLAUDE.md` (a short note under the dock/gate-hygiene register) and in `MIGRATION.md` if any consumer-facing gate surface changed (none expected — these are internal CI gates, so MIGRATION likely needs no row; the agent records "no consumer-facing change" if so).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if widening the NO-:5199 clause (scope 5) cannot be done without ALSO matching a LEGITIMATE non-:5199 default elsewhere in the `liveGateScripts()` set (a gate that correctly targets a different known service port, not a live-demo gate) — that is a scope-reveal; triumvirate (research the full default census across the script set + plan-augment the clause's allowlist shape + redress), do NOT unilaterally `:5199`-stamp a port that is correct-by-design.
- **Hard-gate failures not local-edit-recoverable**: if `proof:ba-gestalt`'s roster shape cannot be made simultaneously (a) born-RED at HEAD against the R8 captures AND (b) flip-to-GREEN-able by W-REFLECT2 without a roster-schema change that wave would have to fight — that is a gate-design miss; triumvirate (the roster contract is the load-bearing artefact W-REFLECT2 consumes, and a schema W-REFLECT2 cannot drive is a structural defect, not a value tweak).
- **Diagnostic loop halt**: if the widened NO-:5199 clause reds on a default the agent cannot classify as legitimate-or-stray after three iterations, halt and triumvirate (the `liveGateScripts()` glob reach vs the per-gate intended port is the suspect — the same `@layer`-precedence-class ambiguity that bit AZ.W-DOCK-RAIL, transposed onto the gate set).

## File Bounds

| File | Access |
|---|---|
| `scripts/proof-ba-gestalt.mjs` | create (the born-RED roster gate) |
| `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` | create (the surface-roster LEDGER the gate reads) |
| `scripts/proof-dock-clip-reveal.mjs` | modify-carve (line 300 port default only) |
| `scripts/proof-dock-big-dock.mjs` | modify-carve (line 304 port default only) |
| `scripts/proof-dock-layering-polish.mjs` | modify-carve (line 451 port default only) |
| `scripts/profile-aurora.mjs` | modify-carve (line 24 port default only) |
| `scripts/proof-gate-manifest-sound.mjs` | modify (the NO-5173 clause → generic NON-:5199 clause) |
| `package.json` | modify (register `proof:ba-gestalt` in scripts) |
| `scripts/gates.mjs` | modify (register the `proof:ba-gestalt` registry row) |
| `CLAUDE.md` | modify (record the gestalt-gate + port-residue closure note) |
| `MIGRATION.md` | modify (only if a consumer-facing surface changed — expected none; record the no-op if so) |

Do NOT touch:
- **The shell docks** (`demo/layout/BottomDock.vue`, `demo/layout/SidebarDock.vue`) — W-SHELL-HOLD (Batch 0, parallel) owns the `railContext` writable-computed guard; this wave does not read or write them. EXECUTION-DAG §3 coordination seam.
- **`demo/stories/manifest.ts` + the story chassis** (`StoryHero`/`ShowcaseFrame`/`StoryPage`) — W-STAGE (Batch 6) is the single writer; the gestalt ROSTER names routes but never edits the stories. The roster is a docs ledger, not a demo edit.
- **`scripts/proof-no-god-module.mjs` + the `RATCHET_BASELINES` map** — W-CARVE2 (Batch 0, parallel) owns the typography/constellation carve verdict + the ratchet drain; this wave reuses its pure-detector PATTERN but writes no byte of it.
- **The docs/precepts submodule + the CLAUDE.md §Structure custom/ enumeration + `proof:colocation`** — W-HYGIENE (Batch 0, parallel) owns the submodule commit, the §Structure re-sync, and the colocation TARGET_DIRS derivation; this wave's CLAUDE.md edit is scoped to the gate-hygiene register note ONLY, a disjoint section.
- **Standing fences**: the GL shader internals (`aurora.frag`, `metaball.frag`) — fence-locked except where a named wave touches them (not here); ppmycota purple never enters library tokens; the slides `docs/tranches/M/` docs are foreign (the cross-repo roster ROW names the slides surface as an acceptance target but edits nothing in the slides tree — the adopt/deploy book at W-CLOSE owns that handoff).

### Disjointness

Single agent; no intra-wave path contention. Across Batch 0: W-SHELL-HOLD writes `demo/layout/{BottomDock,SidebarDock}.vue` (this wave does not); W-HYGIENE writes the `docs/precepts` submodule + the CLAUDE.md §Structure block + `proof:colocation` (this wave's CLAUDE.md edit is the disjoint gate-hygiene note, NOT §Structure — confirm no overlapping anchor before the edit); W-CARVE2 writes `typography.css` + the constellation pair + `proof-no-god-module.mjs` (this wave does not). The four port-default scripts + `proof-gate-manifest-sound.mjs` + `scripts/proof-ba-gestalt.mjs` + the BA roster ledger are touched by NO other Batch-0 wave. `package.json` + `scripts/gates.mjs` are shared registration surfaces across Batch-0 waves that mint gates (W-HYGIENE mints `proof:claude-structure-sync`-class, W-CARVE2 may touch the ratchet baseline) — **coordination note**: each Batch-0 gate-minting wave appends its OWN registry row; the orchestrator sequences the `package.json`/`gates.mjs` registration commits (not parallel writes to the same row), OR commits each wave before the next parallelizes per WAVE_SPEC §4b. No two waves write the SAME `package.json` script key or the SAME `gates.mjs` row.

## Agent Units

### BA.W-GESTALT-GATE.1 the gestalt acceptance gate + roster ledger

- Goal: `proof:ba-gestalt` exists, born-RED against the 19 R8 ground captures, with a well-formed per-surface roster ledger W-REFLECT2 can drive to GREEN one surface at a time.
- Mechanism: author `scripts/proof-ba-gestalt.mjs` as a pure source/docs detector (no Playwright at THIS wave — the gate reads the roster ledger's recorded verdicts; the LIVE capture is W-REFLECT2's job, the gate asserts the ledger's CONTRACT). The roster ledger `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` carries one row per named surface (dock · configurators+goo · aurora · glass+feedback · shell · motion+fourier · dark-register-as-a-surface · cross-repo), each declaring: surface name, demo route(s), the light + dark capture paths (under `docs/tranches/BA/audit/reflect/`), the recorded verdict, the R8 ground anchor. The gate asserts: (a) every roster surface is present (the W-REFLECT2 set is complete — no surface silently dropped); (b) every row is well-formed (both mode capture paths + a verdict ∈ {FAIL, PASS} + a ground anchor); (c) the gate's OPERATIVE result is `ok` IFF every verdict is PASS AND every declared capture path resolves on disk (the anti-evasion floor — a PASS with a missing capture is a lie). Born-RED at HEAD: every verdict is FAIL, anchored to its R8 ground capture.
- Files: `scripts/proof-ba-gestalt.mjs` (create), `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` (create), `package.json` + `scripts/gates.mjs` (register).
- Sub-gate: `node scripts/proof-ba-gestalt.mjs` exits NON-ZERO at HEAD (born-RED: ≥8 surfaces FAIL) with the per-surface FAIL list naming each R8 ground anchor; the roster ledger enumerates the full W-REFLECT2 surface set with no missing row; `proof:gate-script-parity` GREEN after the registration (the gate is in the manifest + the script exists + the row is well-formed).

### BA.W-GESTALT-GATE.2 the live-gate port residue swept + the clause widened

- Goal: every live-gate + profile default resolves `:5199`, and `proof:gate-manifest-sound` forbids any non-:5199 default (the recurrence root closed) — born-RED on the three `:5175` defaults + the `:5173` residue, GREEN at close.
- Mechanism: (a) re-point the three `:5175` dock-gate defaults (clip-reveal:300, big-dock:304, layering-polish:451) + the profile-aurora `:5173` (profile-aurora:24) to `:5199`, preserving each env-var override; (b) widen the NO-5173 clause (`proof-gate-manifest-sound.mjs:131`) from the `:5173`-only `DEFAULT_5173` regex to a generic NON-:5199 detector that matches a `GLASS_UI_*` URL/PORT nullish-default whose port ≠ 5199 (catching `:5175`/`:5173`/any stray), still leaving the override form + the explanatory comments GREEN (the comment-strip at `:138` runs first); (c) rename the clause's labels/facts off `5173`-specific naming to the generic NON-:5199 register so the clause name matches its reach. The clause already walks the full `liveGateScripts()` set (`:71-77`), so the widened regex reaches the three `:5175` gates with no script-set change.
- Files: `proof-dock-clip-reveal.mjs:300`, `proof-dock-big-dock.mjs:304`, `proof-dock-layering-polish.mjs:451`, `profile-aurora.mjs:24`, `proof-gate-manifest-sound.mjs` (the clause).
- Sub-gate: `grep -rn ':5175' scripts/proof-dock-*.mjs` returns 0 and `grep -n ':5173' scripts/profile-aurora.mjs` returns 0 (the defaults swept); the widened clause is born-RED on the PRE-sweep tree (a self-test: pointing the clause at the un-swept `:5175` defaults must red — the recurrence-proofing the chronic demands), GREEN on the swept tree; `proof:gate-manifest-sound` exits 0 at close.

## Hard Gate

`proof:ba-gestalt` (born-RED at HEAD, the roster ledger flipped GREEN one surface at a time by W-REFLECT2 — NOT this wave) + `proof:gate-manifest-sound` (the widened clause, GREEN at close after the sweep). Falsifiable witnesses, each red at HEAD pre-wave:

1. **G1 — the gestalt gate exists and is born-RED.** `node scripts/proof-ba-gestalt.mjs` exits NON-ZERO at HEAD with every roster surface FAIL, each FAIL naming its R8 ground anchor. RED at HEAD: `grep -rn 'ba-gestalt' package.json scripts/` returns 0 — the gate does not exist. **Anti-evasion**: the gate's OPERATIVE-PASS requires every declared capture path to RESOLVE ON DISK (a recorded PASS verdict with a missing/zero-byte capture file fails the gate — the close-class lie the AZ matrix told, mechanically forbidden); the roster must carry the FULL W-REFLECT2 surface set (a dropped surface reds the completeness assert — a future agent cannot quietly omit a hard surface).
2. **G2 — the roster ledger is the binding contract, complete + well-formed.** `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` enumerates all named acceptance surfaces (dock · configurators+goo · aurora · glass+feedback · shell · motion+fourier · dark-register-as-a-surface · cross-repo), each with both mode capture paths + a verdict + an R8 ground anchor. RED at HEAD: the ledger does not exist. The gate asserts the ledger's shape — a renamed/dropped column or a verdict outside {FAIL, PASS} reds the well-formedness check.
3. **G3 — the gate is `["local"]`-tagged, not `ci`/`release`.** The `proof:ba-gestalt` registry row carries `tags: ["local"]` (RED-by-design until W-REFLECT2 drives it GREEN; it must NOT block CI/release while the tranche is mid-flight). The row `note` records the P-1 close-class lineage + the gestalt-above-mechanism contract. W-REFLECT2 promotes it to the operative close set when the verdicts flip — that promotion is W-REFLECT2's edit, NOT this wave's.
4. **G4 — the three :5175 defaults are swept.** `grep -rn ':5175' scripts/proof-dock-clip-reveal.mjs scripts/proof-dock-big-dock.mjs scripts/proof-dock-layering-polish.mjs` returns 0; each gate's `GLASS_UI_DEMO_URL` env override is preserved (the nullish-default `:5199` is the only change). RED at HEAD: three `:5175` hits.
5. **G5 — the profile-aurora :5173 default is swept.** `grep -n ':5173' scripts/profile-aurora.mjs` returns 0; `GLASS_UI_AURORA_BASE_URL` override preserved. RED at HEAD: one `:5173` hit at `:24`.
6. **G6 — the NO-:5199 clause is widened + self-tests on the residue.** `proof-gate-manifest-sound.mjs`'s default-detector matches ANY `GLASS_UI_*` nullish-default whose port ≠ 5199 (not `:5173` alone), leaving the override form + comment-strip GREEN. The clause is born-RED on the PRE-sweep tree (a self-test: the widened regex MUST flag the three un-swept `:5175` defaults — proving it catches the chronic the old regex missed) and GREEN on the swept tree. RED at HEAD: the `DEFAULT_5173` regex at `:131` matches `:5173` only, so the three `:5175` defaults pass `proof:gate-manifest-sound` green while the residue lives.

G1-G3 mint the gestalt bar (the P-1 structural fix — born-RED, consumed by W-REFLECT2); G4-G6 close the CHR-1 port residue + its regex blind spot (the recurrence-proofing the chronic demands). This is NOT a visual wave — it ships no rendered surface, so BA invariant 4's π-readback-plus-gestalt-verdict requirement does not apply to W-GESTALT-GATE's OWN close (it has no own-surface to capture); rather, this wave MINTS the gestalt verdict requirement that binds every OTHER visual wave at W-REFLECT2. The gate's own completion is the born-RED source/docs assert (G1-G6), device-free.

## Format And Lint Cadence

`node scripts/proof-ba-gestalt.mjs` born-RED before close (proof it fails at HEAD with every surface FAIL), staying RED at this wave's close by design (W-REFLECT2 flips it); `node scripts/proof-gate-manifest-sound.mjs` born-RED on the pre-sweep tree (the widened clause flags `:5175`), GREEN at close after the sweep; `npm run proof:gate-script-parity` after the `package.json` + `scripts/gates.mjs` registration; `git diff --check` before close. No typecheck/build needed (no `src/` edit; scripts + docs only).

## Verification Artefacts

- `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` — the born-RED surface roster (every verdict FAIL, each anchored to an R8 ground capture).
- The `proof:ba-gestalt` JSON/stdout artefact (born-RED log: ≥8 surfaces FAIL with ground anchors).
- The `proof:gate-manifest-sound` born-RED log (the widened clause flagging the three `:5175` defaults pre-sweep) + the GREEN-at-close log.
- The `proof:gate-script-parity` output post-registration.

## Commit Plan

- gate commit: `test(gates): proof:ba-gestalt born-RED — the holistic per-surface acceptance roster (P-1 close-class fix, BA.W-GESTALT-GATE)` — names the roster contract + the W-REFLECT2 consumer in the body.
- hygiene commit: `fix(gates): sweep the :5175 dock-gate + :5173 profile defaults to :5199 + widen NO-:5199 clause (DC-CHR-1)` — names the four re-pointed defaults + the regex widening in the body.
- doc/status commit: the CLAUDE.md gate-hygiene record + the PROGRESS row.

## Dependencies

- **Depends on**: nothing structurally (Batch 0, disjoint bounds). The 19 R8 ground captures must be present (verified at RE-GROUND — they are committed at HEAD).
- **Blocks**: **W-REFLECT2** (Batch 7) is the binding operative consumer — it re-walks every roster surface live, captures whole-page in both modes, records the gestalt verdict, flips the roster ledger FAIL→PASS one surface at a time, and PROMOTES `proof:ba-gestalt` to the operative close set (BA invariant 4). EVERY visual wave (W-DARK-MATERIAL, the Batch-2 redress band, the Batch-3 dock, the Batch-4 glass grammar, the Batch-6 demo-staging) closes against this gate's verdict requirement, not the per-mechanism π alone — the P-1 close-class fix is structural from this wave forward. The swept `:5199` defaults are the correct live-gate server for the whole tranche's live verification (every later wave's π readback inherits the fix).

## Archaeology

Prior attempt: AZ.W-GATES swept `:5173` → `:5199` and authored `proof:gate-manifest-sound` with a NO-5173 clause — but the regex matched `:5173` ONLY, so the three `:5175` dock-gate defaults sailed past (the chronic CHR-1 carry: AY.W-LIVE1 booked it → AZ.W-GATES partial → BA). The new guardrail: this wave's widened clause forbids any non-:5199 default (not one named port) + self-tests on the residue, so a future stray port cannot recur — the recurrence-proofing the chronic demands. Separately, AZ closed `complete` on a 9-surface per-mechanism PASS matrix the user re-opened the same day (P-1, the 6th consecutive re-opening round R3→R8); the new guardrail is `proof:ba-gestalt` itself — a holistic per-surface acceptance bar ABOVE the per-mechanism π, born-RED against the R8 captures so the close cannot assert a surface PASS without a recorded whole-page gestalt verdict over its real backdrop. The mechanism-green/visually-broken gap is exactly what re-opened R3→R8; this gate is the structural answer.
