# PT-2 — ADVERSARIAL CRITIQUE (PASS 1) of `pass-1-proto-PT-2.md`

**Role:** adversarial harden · **Verdict on proto:** SOUND but OVER-DETERMINISTIC on the one load-bearing mechanism (precond encoding) · **convergence: 73%**
**Date:** 2026-06-30 · **Branch:** tranche/BG · **HEAD:** `4c761b64` · siblings-intact ✓ (exit 0)

## What I re-verified on disk (proto claims that HOLD)

| Proto claim | Disk truth |
|---|---|
| ladder.css 527, shell.css 510, neither in `RATCHET_BASELINES` | ✓ confirmed — `proof:no-god-module` reds both NOW |
| `--glass-blur-dock` chain in src (glass.css:103,135,166-168; dark-arm.css:285-286; bridges.css:334) | ✓ (chain is slightly WIDER than §1's enumeration — saturate at glass.css:135/168 + dark-arm:285) |
| shell.css:29 `--dock-surface-blur: var(--glass-blur-resting)` already shipped (WS3 3.6 cd9ce46) | ✓ confirmed + :159 consumes it |
| spike `c0f6e1ee` exists, carves 527→470 / 510→459, 20 files | ✓ EXACT — grain cohort wholly in NEW grain-overlay.css, shell tail in shell-regions.css |
| `proof:no-god-module` .css-aware (HARD_LIMIT 500) + tags `["local","ci"]` | ✓ — in the per-wave green set |
| ladder/shell editor roster complete: 3.5 GLASS-TINT-UNIFY (ladder), WS8.1 SUFFUSE-UNIVERSAL (shell), 14.1 PAPER-GRAIN-REAL (ladder+shell) | ✓ — grep across BG + BH confirms NO other pending editor (BH map names neither file) |
| PAPER-GRAIN-REAL re-points `ladder.css` (stale post-carve) | ✓ — line 699 lists `ladder.css`; current ladder grain cohort = 2 occ, all move to grain-overlay |

The corrections A–F are individually correct. Feasibility is not in doubt.

## The HARDENING gaps (what the proto under-secures)

### H1 — [CRITICAL] The loader is an LLM AGENT, not a deterministic parser. The precond-encoding fix is presented as mechanical wiring; it is not.
`bg-bh-execute.wf.js:134-138` — the DAG LOADER is an `agent()` that READS the three maps and RETURNS the DAG_SCHEMA, **inferring** `preconds` from prose ("the wave ids that must be DONE first — cross-WS + intra-band order"). The proto §3b says edits "land in the `*Precond:*` fields (the LOADER's source) so the DAG node's preconds array carries `BG.W-CLOSEFIX-9SITE`" — framing a deterministic regex. **Reality:** correctness = the loader agent faithfully translating "+ BG.W-CLOSEFIX-9SITE" into a `preconds[]` entry. This is the SAME friction-class PT-2 is about (an ordering intent that may not reach the machine), displaced one layer up. The existing `*Precond:*` fields are free prose with sub-row refs ("WS1-GATED", "GU-1 token", "WS3-M3 contain", "STAGE-0 ground-freeze") — the agent already does heavy interpretation, so a clean "+ BG.W-CLOSEFIX-9SITE" token is MORE likely picked up than the current prose — but "likely" is not "encoded". **Cure:** elevate §7-check-4 (load DAG → assert G4 ∈ preconds of all 3 editors) from the 4th of 8 optional verifying checks to a BINDING boot-step assertion, AND make the loader's own return contract assert the edge before proceeding. A single amend-time dry-run does NOT bind a fresh agent run at build-time.

### H2 — [CRITICAL] Wave-id token-match / deadlock risk: CLOSEFIX-9SITE vs GLASS-BLUR-PEER entanglement.
The spike commit titles the 9-site work **"BG.W-GLASS-BLUR-PEER (close)"** and WS3 3.6 is **"BG WS3 (BG.W-GLASS-BLUR-PEER)"** — yet the build-map carve wave is **`BG.W-CLOSEFIX-9SITE`** (line 443) and `BG.W-GLASS-BLUR-PEER` is a SEPARATE [P] wave (line 172). `ready()` does `map[p] && map[p].status==='DONE'` — if the loader assigns G4's node id as anything but the EXACT string `BG.W-CLOSEFIX-9SITE` (e.g. it conflates the two under GLASS-BLUR-PEER, given the commits), then `map['BG.W-CLOSEFIX-9SITE']` is `undefined` → `map[p]&&…` short-circuits FALSE → the 3 editors are blocked **FOREVER** (a deadlock, not just an inversion). The proto never surfaces this naming entanglement. **Cure:** specify the precond token = the EXACT node id the loader emits for G4 + a boot-step assert that `map['BG.W-CLOSEFIX-9SITE']` is DEFINED (not just DONE-gated).

### H3 — [MED] shell.css post-carve headroom is thin against TWO pending editors; the proto doesn't quantify it.
shell.css carves to **459 (41-line headroom)**, then BOTH WS8.1 SUFFUSE-UNIVERSAL (line 616) AND 14.1 PAPER-GRAIN-REAL (line 700) add to `dock/shell.css`. ladder.css carves to 470 (30-line headroom), GLASS-TINT-UNIFY adds (PAPER-GRAIN's ladder add is redirected to grain-overlay per §4). `proof:no-god-module` (§5) reds a re-grow at the landing wave — good, no silent failure — but the in-wave re-carve burden is real and the proto neither quantifies the headroom nor pre-names the shell re-carve target. **Cure:** name shell-regions.css as the standing append-target for a shell re-grow + have the two editor specs reserve a line budget.

### H4 — [LOW] §0-table byte-neutrality claim is currently unverifiable (dist absent).
`dist/glass-ui.css` is ABSENT in the working tree, so "grep -c glass-blur-dock dist = 0 at HEAD" cannot be re-confirmed now. The proto's §2 CORRECTED check (capture-own-precond-baseline) is sound and does NOT depend on the stale grep — but the §0 table presents a build-time fact as a verified live-tree fact. Tighten so the integrator builds-then-greps, never trusts a prior grep.

## Friction-class-repeat verdict
The fix does NOT introduce a fresh defect of a different shape — but on its CORE mechanism (precond ordering) it risks REPEATING PT-2's own disease (ordering-intent that doesn't reach the executor) because it treats an LLM loader as deterministic. The durable cure is a deterministic POST-LOAD assertion of the edge (H1/H2), which converts the prose-fed agent translation into a checked invariant. With that, the fix holds across all 3 editor waves it touches; without it, it holds only probabilistically.
