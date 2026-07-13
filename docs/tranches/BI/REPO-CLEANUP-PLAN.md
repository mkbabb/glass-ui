# BI REPO-CLEANUP PLAN — DELETE-PENDING-APPROVAL (pass-3 FINAL)

> **Intended repo home:** `docs/tranches/BI/REPO-CLEANUP-PLAN.md`. Staged in scratchpad; pass-3 is
> READ-ONLY on the repo — the user/orchestrator lands it.
> **NOTHING in this plan executes without the user's explicit approval. Every deletion is
> DELETE-PENDING-APPROVAL.**
>
> **Pinned SHA:** `cce6853f` (tranche/BI HEAD; `git rev-parse HEAD` verified; working tree CLEAN =
> `git status --porcelain`→0). The draft pinned `cae697cc`; HEAD has since advanced ONE commit
> (`cce6853f` "atlas §9 append — zero new asks", a docs/atlas-inbox append). The spine re-verifies at
> `cce6853f` unchanged EXCEPT one self-resolution: **the easter-eggs gate deletion, caught mid-flight by
> the two-clean critic in a dirty tree, has LANDED** (§0c). Registry lineage: v1→v2→v3→this fold
> (3 confirmation lanes V1/V2/V3 + 2 pass-3 critics c3-two-clean 90% / c3-user-readiness 80%).
> **Confidence:** **H** disk/command-verified · **M** one open dependency · **L** fenced probe.
>
> **RED-COLLATERAL is NOT the interim "7 DELETE + 2 REPOINT" survivor-split.** The V1 lane RAN every
> gate and read each body: **8 live RED = 3 DELETE + 3 REPOINT + 2 ESCALATE (+1 a11y rider)** (the 9th,
> easter-eggs, self-deleted). Three carry a *live guard arm* → gate-EDITs, not deletes. Two are not
> clean deletes (superseded-spec / spring-parity overlap) → orchestrator. See §0c + §3.

---

## 0. PASS-3 CONFIRMATION RESULTS (the RUN mandate — earned by execution, not existsSync)

The v3 census inferred liveness from `existsSync`+regex and never ran a gate. Pass-3 RAN them
(`npm run -s proof:<id>`, FS-only). Second-consecutive-clean met: no v3 *class* reversed; spine
CONFIRMED (finals, glass-panel-tiers, reclaim aggregate); one block CLEARED (13 B28-provisionals GREEN);
one owed item CURED (verify-siblings wiring); the CONTESTED row SHARPENED (RED-COLLATERAL body-read
dispositioned per-gate). Every hit the two critics raised was additive/freshness — folded below.

### 0a. Census re-pin at cce6853f
| metric | draft (@cae697cc) | cce6853f MEASURED |
|---|---|---|
| manifest path | — | `scripts/gates.manifest.mjs` |
| manifest line count | 2319 | **2313** (−6: easter-eggs row removed) |
| total gate rows (`GATES.length`) | 402 | **401** (−1: easter-eggs landed §0c) |
| empty-tag `tags:[]` finals | 4 | **4** ✓ (au:588 · az:600 · ba:612 · ay:618, all `tags:[]`) |
| tag distribution | local:370 · ci:346 · release:125 | unchanged (docs-only advance) |

- **4 DEAD-VERSION finals CONFIRMED** — present, `tags:[]`, asserting dead cut versions vs in-tree
  **5.0.0**: au (3.2.0) · ay (3.9/3.10) · az (3.10.1/3.13.x) · ba (`PRE_CUT=3.13.0`/`CUT=4.0.0`,
  proof-ba-final.mjs:121-122). All 4 EXIT=1 bite-run. → **W-FINALS-DELETE** stands.
- **glass-panel-tiers FULLY ATOMIC-DELETED** (v3 predicted): script ABSENT + 0 pkg + 0 manifest. No residual.

### 0b. The 13 PROVISIONAL-PENDING-B28 — RUN, all GREEN → block CLEARED
`proof:fold-delete` · `proof:variant-residual` · `proof:api-lockstep` · `proof:surface-axis` ·
`proof:glass-prune` (guard) — **all EXIT=0**. B28's deletion set (glass-panel, hover-popover,
selectable-chip, toggle-chip, confirm-dialog, context-menu, hover-card, multi-select, sheet +
subpaths/styles — `b28-deleted.txt`) landed clean. → PROVISIONAL-PENDING-B28 = **0**.

### 0c. RED-COLLATERAL — 8 live RED; V1 body-read disposition (the 9th self-resolved)
**easter-eggs (was the 9th, REPOINT) has LANDED as a DELETE.** A concurrent lane the two-clean critic
caught mid-flight (dirty tree) has since committed: at `cce6853f` `scripts/proof-easter-eggs.mjs`,
the pkg entry, the manifest row, AND the entire `demo/eggs/` subject tree are GONE (E2-E6 relocated:
NotFound→demo/shell, fGlyphPoints→demo/stories/substrates). The plan's earlier REPOINT verdict is
OVERTAKEN by reality — it self-executed as ALREADY-LANDED-DELETE. GATES.length 402→401 confirms. No
pending action remains for it.

The **8 remaining** gates all EXIT=1 at clean `cce6853f`. All are **past-tranche** (AY/AZ/BB/BC/BE/BG —
none a scheduled BI wave; grep of `docs/tranches/BI/`→OWNED-IN-FLIGHT=0), all **ci/release-tagged** → a
RED here is a **hard BI-close blocker** whatever the disposition. V1 split by *what the RUN flagged*:

| gate | RUN first-violation | subject state | VERDICT |
|---|---|---|---|
| morph-showcase | M1/M2/M3/M5 all NO | useDockOrientationMorph.ts/morph-bridge.css/morph-showcase.vue ALL retired (`967811e4`/`ae71daa0`/`98b52613`) | **DELETE-WITH-SUBJECT** |
| metaball-bridge2 | "fission-bridge.css ABSENT" | fission-bridge.css `ae71daa0` (B3 W-DOCK-SPINE) | **DELETE-WITH-SUBJECT** |
| siri | all 5 SFC/css absent | siri.css `ae71daa0` · SiriDockCapability.vue `b8d92e14` · useSiriDock.ts `967811e4` · SiriWaveform/siri-island `98b52613` (G10 terminal) | **DELETE-WITH-SUBJECT** |
| glass-glow-fix | pulse-aura ✓ / morph-bridge-plate ✗ | `.pulse-aura` LIVE (animations.css); `.dock-morph-bridge-plate` retired `ae71daa0` | **REPOINT** (drop morph-bridge arm; KEEP pulse-aura guard) |
| motion | R2 did NOT flag DockIconButton | LIVE retire-guard; R2 fixture DockIconButton.vue retired `976c8326`; useLiquidPress→DockControl.vue | **REPOINT** (re-target R2 bite→DockControl.vue) |
| liquid-morph | M1/M2/M5 PASS; M3+M4 fail | --dock-morph-t LIVE (view-transition.css:56); dockMorphMeasure.ts PRESENT; M4 teardrop=morph-bridge.css retired; M3 44px floor absent | **REPOINT** (drop M4; keep M1/M2/M5) **+ ESCALATE M3** |
| perf-producer | W1 useLayerTransition; DOCK_SPRING changed | useLayerTransition.ts retired `353b1c35`; DOCK_SPRING **0.3/0.82 vs booked 0.68/0.64** | **ESCALATE** (overlaps M1 spring-parity break — possible REAL-RED) |
| glass-material-unified | .glass-overlay rim + specular cohort unmet | subjects ALL LIVE; material model redesigned `db861d71` (BI B0) + BG glass; overlay excluded (material.css:66) | **ESCALATE — SUPERSEDED-SPEC** |

Three PASS part of their assertion against a LIVE subject (pulse-aura halo containment; the
--dock-morph-t model; the R2 press consumer) — a whole-gate delete loses that live guard, so they are
gate-EDITs. → CONTESTED disposition-open = **0** (all 8 ruled); **3 clean deletes**, 3 gate-EDITs, 2 escalate.

### 0d. verify-siblings-intact close-battery wiring — the owed file:line (v3 H5, CURED)
Not edict-only. Anchors: **executable invoker** `scripts/worktree-gc.mjs:36` →
`sh("node",["scripts/verify-siblings-intact.mjs","--quiet"])`, runs FIRST + aborts on RED (:6,:38);
**close-protocol** `BI.W-CLOSE.md:18` + `BI.W-DIFFERENTIAL-CLOSE.md:50` + `BD.W-PRECEPT-CANON.md:76`;
**canon** `docs/canon/build-and-gates.md:37`. NOT a pkg script, NOT a manifest row. → **KEEP-through-close, cured.**

**COUPLING CORRECTION (supersedes v3 §4's flat DELETE of worktree-gc.mjs):** worktree-gc.mjs is the
sole executable invoker of verify-siblings-intact.mjs AND the purpose-built sibling-safe pruner
(`--prune` never force-removes non-ancestors). It is unwired (no gate row), so v3's DELETE-case is
coherent — but deleting it drops W-WORKTREE-GC's sibling pre-flight. → **KEEP + USE `--prune`** (favored);
USER/orchestrator decides (D2).

### 0e. Fence + QUIESCE record (honest — the risk materialized, then cleared)
Pass-3 wrote **0 repo files** (only `.cache/gates/*.json` + scratchpad; value.js worktree UNTRAVERSED;
read-only git/grep/wc/ls). The QUIESCE-TREE risk the draft named **materialized**: at the `cae697cc`
snapshot a concurrent live-verify lane held ~30 dirty files (the two-clean critic's count) including an
in-flight easter-eggs gate delete + AY/BG PNGs. That lane has since **committed and quiesced** —
`cce6853f` is CLEAN (`git status --porcelain`→0). The easter-eggs delete landed (§0c); the PNG churn
settled. → the **QUIESCE-TREE law (§4) is validated by this episode**: run any GC/rewrite/delete only
with concurrent lanes stopped, at a clean-at-rest HEAD.

---

## 1. VERDICT REGISTRY — ITEMIZED (counts header + per-item evidence + confidence)

| class | count |
|---|---|
| DELETE-PENDING-APPROVAL | **6** |
| RED-COLLATERAL (ci/release-tagged; hard close-precondition) | **8** = 3 DELETE + 3 REPOINT + 2 ESCALATE (+1 M3 rider); the 9th (easter-eggs) LANDED |
| HARVEST-THEN-DELETE | **4** |
| UPDATE | **5** |
| KEEP-PROVEN / KEEP-BY-PROCESS | **15 groups** |
| ARCHIVE **2** · COLLAPSE **1** · STILL-USER **3** |
| PROVISIONAL-PENDING-B28 | **0 (RESOLVED §0b)** |
| CONTESTED **1** (worktree-gc.mjs) · DEFER **2** · NO-ACTION **1 group** |

### 1a. DELETE-PENDING-APPROVAL (6)
| item | size | evidence | conf |
|---|---|---|---|
| 62 dead scripts (`wf-*.js`/`.mjs` + probe residue) | ~468 KB | grep=0 pkg/import/manifest; parity-EXEMPT (non-`proof-*`) | H |
| `docs/consumer-evidence/dock-search.md` | 4 KB | virtual-window reads `use-virtual-section-window.md:53`, not this | H |
| `.changeset` (README+config) | 8 KB | 4 readers all `tags:[]`; `@changesets/cli`=0; finals assert 3.2.0 vs 5.0.0 | H |
| BG chrome-profiles (Op A1-A3) | 467 MB | 2,050 tracked (`git ls-files docs/tranches/**/.chrome-profile*`) + 84 MB ignored | H |
| `.chrome-profile-fourier.log` | 68 KB | untracked junk | H |
| 4 `*-final` gates (atomic 4×3) | ~nil | au:588/az:600/ba:612/ay:618 `tags:[]`, dead-version asserts §0a | H |

### 1b. RED-COLLATERAL (8 — enumerated §0c; drives §3.W-RED-COLLATERAL)
DELETE-WITH-SUBJECT (3): morph-showcase · metaball-bridge2 · siri. REPOINT (3): glass-glow-fix · motion ·
liquid-morph. ESCALATE (2 + rider): perf-producer · glass-material-unified · [liquid-morph M3]. easter-eggs
= LANDED (§0c). **conf H** on the RUN (all 8 EXIT=1) + provenance (all past-tranche); **M** on the final
per-gate repoint-vs-delete call (dock wave-owner + user).

### 1c. HARVEST-THEN-DELETE (4 — each with a §3 wave + reclaim)
worktrees (37 present, harvest 3 — §3.W-WORKTREE-GC) · `validate-consumers.sh` (+`package.json:1033`
alias; sole wiring the alias, 2 wrapped proofs LIVE via `ci.yml:46-47`, unrun since 2026-05-02) · ~22
cited root images (of 89 root pngs / 26 MB — §3.W-ROOT-JUNK-SWEEP) · `scripts/aurora-make-ref-plates.mjs`
(12 KB — §3.W-ROOT-JUNK-SWEEP). **conf H.**

### 1d. UPDATE (5)
canon/README · CONTRIBUTING · `gates.manifest.mjs` note-prose (30 stale π-notes) · `files:["dist"]` narrow ·
`proof:git-hygiene` H6-H10 (+`overfitting-audit.md:88` rider). **conf H.** (Detail §5.)

### 1e. KEEP-PROVEN / KEEP-BY-PROCESS (15 groups) · ARCHIVE (2) · COLLAPSE (1) · STILL-USER (3) · DEFER (2) · NO-ACTION
Terse §7. One CONTESTED: **worktree-gc.mjs** (KEEP-as-GC-tool favored §0d).

---

## 2. USER DECISION SHEET

### ★ SAFE-RECLAIM-NOW = ≈ 27.8 GB — approvable NOW, ZERO edict, ZERO SHA rewrite
| approve-now item | reclaim | gate |
|---|---|---|
| worktree harvest-3-then-prune-37 | **27.3 GB** working (`du` = 27,933 MB; *re-measured — v3 §7 stated 27.2*) | harvest 3 FIRST |
| BG chrome-profiles Op A1-A3 | **467 MB** (census judge 180 + rerun 203 = **383 MB** tracked/2,050 files + 84 MB ignored) | none (junk) |
| 62 dead scripts | 468 KB | parity-exempt |
| root-junk sweep (~22 root pngs + aurora-plates + fourier-log + dock-search.md + .changeset) | ~26.1 MB (harvest 3 first) | atomic/harvest |
| validate-consumers.sh (+alias) · 4 dead finals | ~nil | atomic |
| **TOTAL** | **≈ 27.8 GB** *(v3 §7: 27.7 — the +0.1 is the worktree re-`du`)* | no edict, no rewrite |

**HELD (NOT reclaim):** **12** live `bi-*` lanes (≥46 GB; the 46 GB was measured at 10 — the 2 new
`bi-p5-glass`/`bi-p5-pager` lanes add more) = in-flight B2/B8; retire with their own waves.
**One question:** *approve the ≈27.8 GB safe-reclaim bucket?* → unblocks W-WORKTREE-GC + W-BG-JUNK(A1-A3)
+ W-SCRIPT-SWEEP + W-ROOT-JUNK-SWEEP + validate-consumers + W-FINALS-DELETE. Everything below is fenced OFF it.

### ★ RED-COLLATERAL CLOSE-PRECONDITION — approvable, NOT junk (hard BI-close blocker)
The 8 ci/release-RED gates (§0c) block the BI close whatever their disposition. This plan OWNS 6 of them;
2 route to D4. **These need EXECUTION approval separate from the junk bucket** (they touch enrolled gates,
not disk clutter):
| action | gates | surface | approve? |
|---|---|---|---|
| DELETE-WITH-SUBJECT (3) | morph-showcase · metaball-bridge2 · siri | atomic 3-surface each (§3, lines named) | ▢ |
| REPOINT gate-edit (3) | glass-glow-fix · motion · liquid-morph | single-surface edit, KEEP the live arm (§3) | ▢ |
| ESCALATE (2 + M3 rider) | perf-producer · glass-material-unified · [liquid-morph M3] | → **D4** (orchestrator, not this plan) | see D4 |

**Question:** *approve the 3 DELETE + 3 REPOINT gate-hygiene actions (W-RED-COLLATERAL)?*

### Decision D1 — BG image/prose (the 3-op matrix; NO recommendation)
| axis | A · STATUS-QUO+ | B · IMAGE-SEVER | C · FULL-RELOCATE |
|---|---|---|---|
| target | chrome-profiles (467 MB) | 2,388 delta PNG (3.65 GB) | BG prose (24.6 MB) |
| working reclaim | 467 MB | ~3.65 GB | ~25 MB (pixels untouched) |
| .git reclaim | 383 MB *(A4; tracked figure, not a packed-history du)* | ~3.7 GB *(rewrite/LFS)* | trivial |
| load-bearing gate re-points | 0 | **0** (3 non-read caveats) | **9 scripts, 5 release-tagged** |
| release-ceremony touch | no | no | **yes** (`SHIP_ATTESTATION_REL`) |
| in-repo-only reclaim? | A1-A3 yes | `git rm` = 3.65 GB working, no rewrite — **OQ1 gates it** | prose move = 25 MB |
| edict gate | none (junk) | **OQ1 pixels-vs-prose** | **OQ2 relocatable-at-all** |
| headline risk | near-zero | history rewrite + 5.0.0 tag | 5-release-gate RED + born-RED ceremony |

- **C-1/C-2 facts (validated):** `SHIP-ATTESTATION.json` is **BORN-ABSENT** (`git ls-files`→∅, never
  committed); `release.sh:89`→`runShip()` is a trap-clean STUB (exit 1, "No attestation written"). The
  write ceremony is UNLANDED. `proof-pi-attestation` references BG's json in a COMMENT only (:71); real
  I/O is `BI/PI-ATTESTATION.json` (:72). SHIP-ATTESTATION.json has ONE reader (proof-ship-attestation).
- **Op-C forward-coupling (the hidden hard part):** re-pointing `SHIP_ATTESTATION_REL`
  (proof-ship-attestation.mjs:52) now means the *future* ceremony must ALSO target the new path — an
  unbounded coupling to code that does not yet exist. "1 line + 9 files" understates OQ2. Op C reclaims
  ~25 MB, pixels untouched → **NOT a byte trade; coherent only bundled with B.**
- **AY independence:** a BG-only sever does NOT trip `proof-strict-freshness-armed.mjs:72-75` (seeds an
  **AY** png). AY-REPOINT-FIRST binds only AY moves.
- **`.git` rewrite** (A4/Op B) strands 37 worktrees + invalidates the 5.0.0 provenance-tag ancestry → GC
  FIRST (REWRITE-AFTER-GC), USER/orchestrator sign-off.

**OQ1 (crisp):** *does "tranche history stands" bind PIXELS or only PROSE?* YES→pixels-locked, keep 3.65
GB; NO→Op B reclaims 3.65 GB working at 0 gate re-points (rewrite for .git). **USER.**
**OQ2 (crisp):** *is BG relocatable at all?* Op C = 25 MB / 9-gate / 5-release-tag + the unlanded-ceremony
forward coupling; a policy call, not a byte trade. **USER.**

### Decision D2 — worktree-gc.mjs: KEEP-as-GC-tool vs DELETE
KEEP (favored §0d): the sibling-safe pruner W-WORKTREE-GC should USE (`--prune`) + the sole executable
verify-siblings invoker. DELETE (v3): unwired, redundant with raw git — but then W-WORKTREE-GC loses the
sibling pre-flight. *Keep it and use `--prune`, or delete it and prune with raw git?* **USER/orchestrator.**

### Decision D3 — value.js/glass-ui-pinned worktree (HEAD 2e559f7a) — FENCED
Foreign value.js tree, do-not-traverse honored; cannot confirm it holds no un-landed co-land. *Clear to
prune, or holds un-landed work?* **USER.**

### Decision D4 — RED-COLLATERAL ESCALATIONS (route to dock wave-owner, not this plan)
Not cleanup deletes: **perf-producer** — is DOCK_SPRING 0.3/0.82 vs booked 0.68/0.64 a real spring
regression (the M1 parity break) or a stale gate arm? **glass-material-unified** — repoint the AW/AX
contract to the landed `db861d71` glass redesign, or cull the ci-only gate? **liquid-morph M3** — did the
44px WCAG touch-floor migrate to `proof:dock-spine`/a11y, or is it a real gap? All 3 still ci-RED-block
the BI close. **DOCK WAVE-OWNER + USER.**

---

## 3. DELETION MANIFESTS AS WAVES (ATOMIC-DELETION checklists — EXECUTE ONLY ON USER APPROVAL)

Every gate DELETE removes `{ proof-*.mjs + package.json "proof:*" entry + gates.manifest.mjs row }` in
ONE commit, else trips `proof:gate-script-parity` (bijection clauses A/B/C) + ENOENTs. Run in a **quiesced
tree** (§0e/§4). Landing proof named per wave.

### W-SCRIPT-SWEEP — 62 dead scripts · ~468 KB · B8-PRUNES — EXECUTE ONLY ON USER APPROVAL
- **Delete:** the 62 non-`proof-*` scripts (**37 `wf-*.js` + 11 `wf-*.mjs` = 48 wf-* at cce6853f** +
  probe/misc remainder). *(Correction: the draft said "48 wf-*.js" — the extension splits .js/.mjs; all
  48 are non-`proof-*` so parity-exempt either way.)*
- **Triple rows:** none (non-`proof-*` → OUTSIDE the parity bijection; **parity-EXEMPT**).
- **Liveness:** ARCHIVE-LIVENESS-FILTER (existsSync/glob; exclude dead `wf-*` cross-refs + `//` comments).
- **Landed-clean proof:** `proof:gate-script-parity` still GREEN (no `proof-*` touched) + `git status`
  shows only the 62 removed.

### W-FINALS-DELETE — 4 gates × 3 surfaces = 12 edits, ONE commit · B8-PRUNES — EXECUTE ONLY ON USER APPROVAL
| final | `.mjs` | pkg cmd | manifest row (`tags:[]`) | SOFT-sweep (same commit, inert if orphaned) |
|---|---|---|---|---|
| au | scripts/proof-au-final.mjs | package.json:745 | :588 | proof-tag-parity.mjs JUSTIFIED:86 · proof-au-w1-design.mjs FLEET:46 · AU.W1c doc row |
| ay | scripts/proof-ay-final.mjs | package.json:746 | :618 | proof-tag-parity.mjs:104 |
| az | scripts/proof-az-final.mjs | package.json:655 | :600 | proof-tag-parity.mjs:111 |
| ba | scripts/proof-ba-final.mjs | package.json:656 | :612 | (no direct JUSTIFIED row; tags:[] skips aggregates) |
- **Born-RED evidence:** all 4 present + `tags:[]` + assert dead cut versions vs 5.0.0 (§0a); each EXIT=1
  bite-run; probe-final-gates-delete = no live reader beyond self.
- **CAUTION (prose-only, non-blocking):** `proof:ba-gestalt`(tag-parity:99) + `proof:az-reflect`(:110)
  cite "the au-final precedent" as prose — harmless; the sweep must NOT rewrite them.
- **Landed-clean proof:** `proof:gate-script-parity` GREEN (all 3 legs per row gone together).

### W-RED-COLLATERAL — 8 gates · disposition §0c · HARD BI-close precondition · B8-PRUNES — EXECUTE ONLY ON USER APPROVAL
- **(a) DELETE-WITH-SUBJECT (3, ATOMIC 3-surface — rows NAMED at cce6853f):**
  | gate | `.mjs` | pkg entry | manifest row |
  |---|---|---|---|
  | morph-showcase | scripts/proof-morph-showcase.mjs | package.json:646 | :147 |
  | metaball-bridge2 | scripts/proof-metaball-bridge2.mjs | package.json:647 | :159 |
  | siri | scripts/proof-siri.mjs | package.json:1019 | :2119 |

  Each coupled to its already-landed retirement (mechanism culled B3/B5; the gate is the straggler).
  Born-RED: RUN EXIT=1, subject `git ls-files`→absent.
- **(b) REPOINT (3, gate-EDIT — NOT a delete; a delete loses a live invariant):**
  - `proof:glass-glow-fix` — drop the `.dock-morph-bridge-plate` arm; KEEP the live `.pulse-aura`
    halo-containment guard (animations.css).
  - `proof:motion` — re-target the R2 bite from retired DockIconButton.vue → **DockControl.vue** (the
    live useLiquidPress consumer). Body is a live retirement-guard; do NOT delete.
  - `proof:liquid-morph` — drop the M4 teardrop clip-path arm (morph-bridge.css retired); keep M1/M2/M5
    (--dock-morph-t model LIVE). M3 → D4 rider.
  - *(easter-eggs, the 4th REPOINT in the draft, already LANDED as DELETE §0c — no action.)*
- **(c) ESCALATE (D4, orchestrator — NOT this plan):** `proof:perf-producer` (DOCK_SPRING 0.3/0.82 vs
  0.68/0.64, possible M1 spring-parity REAL-RED) · `proof:glass-material-unified` (SUPERSEDED by `db861d71`).
- **Recurrence cure:** this class ESCAPED the LANDED W-DOCK-GATE-CULL because its roster gate GC2 is
  `proof-dock-*`-prefix-scoped; these gates carry other names. **Do NOT mint a second cull** — the fix is
  the generic `proof:git-hygiene` H10 (subject-liveness regardless of name-prefix; §5).
- **Landed-clean proof:** all 8 gates GREEN after (a) deletes / (b) repoints / (c) orchestrator; H10 GREEN;
  BI close-battery ci-gate set GREEN.

### W-WORKTREE-GC — harvest-3-then-prune-37 · 27.3 GB · PREFLIGHT #81 — EXECUTE ONLY ON USER APPROVAL
1. **HARVEST 3 to scratch FIRST** (route to lead, THEN prune):
   - `wf_9252eaa6-1c8-5` → `src/components/ui/surface/{Surface.vue, resolveSurfacePlate.ts}` (~7.5 KB,
     real lib PLATE primitive, NOT in BI, no consumer) → **W-GLASS-DEDUP lead** (LANDED → rider follow-up).
   - `wf_821d41f7-0eb-30` → `codemod-flatten.mjs`(102L)+`codemod-scripts.mjs`(23L), md5-distinct from
     landed `flatten-subpath-types.mjs` → **B9-FLATTEN-PREP** (harvest-and-hold).
   - `wf_9252eaa6-1c8-8` → `demo/chassis/{SpecimenFrame.vue, body/*}` harness (~280L) — **CONDITIONAL:
     diff vs the live `bi-p4b-story` `demo/chassis/body/` before either lands** → demo lead.
2. **PRUNE 37 present wf_ lanes** (34 clean + 3 post-harvest) via **`worktree-gc.mjs --prune`** (sibling-safe;
   D2) — NOT raw `git worktree remove`. **Do NOT prune the 12 live `bi-*` lanes** (bi-glass-proto,
   bi-head-verify, bi-fourier-ribbon, bi-p4b-{dock-a,dock-b,factor,glass,motion,pager,story}, bi-p5-glass,
   bi-p5-pager).
3. **Prune ~13 absent admin entries** (3 locked-absent wf_ + 10 /tmp/scratchpad, ~0 bytes). *(`git worktree
   list` shows 40 wf_ = 37 on-disk present + 3 locked-absent; 62 total = 1 primary + 1 value.js-pinned +
   12 bi-* + 40 wf_ + admin.)*
- **REWRITE-AFTER-GC:** completes before ANY BG Op A4/Op B `.git` rewrite (the 37 pin pre-rewrite SHAs).
- **Landed-clean proof:** `proof:git-hygiene` H8 (worktree-count ≤ ceiling) flips GREEN.

### W-BG-JUNK — Op A1-A3 · 467 MB · independent, any time · B8/PREFLIGHT — EXECUTE ONLY ON USER APPROVAL
- **A1:** `git rm --cached -r` the 2,050 tracked census chrome-profiles (judge 180 MB + rerun 203 MB).
- **A2:** `rm -rf` the 84 MB `.chrome-profile-1783264701`.
- **A3:** widen `.gitignore:57` (`docs/tranches/BG/audit/visual/.chrome-profile-*/`, non-recursive) →
  recursive `docs/tranches/**/.chrome-profile*/` (currently misses `census/.chrome-profile-{judge,rerun}`).
- **A4 (optional, USER-GATED):** filter-repo 383 MB from `.git` — SHA rewrite, binds REWRITE-AFTER-GC.
- **Landed-clean proof:** `proof:git-hygiene` H7 (0 tracked chrome-profiles) + H9 (recursive ignore) GREEN.

### W-ROOT-JUNK-SWEEP — root images + 3 stray files · ~26.1 MB · B8/PREFLIGHT — EXECUTE ONLY ON USER APPROVAL
- **HARVEST-THEN-DELETE:** ~22 stale root `*.png` (of **89** root pngs / **26 MB** total; `ls *.png`=89) —
  harvest any still-cited ref, then delete; the 12 BI-active pngs relocate/allowlist (§5 H6). ·
  `scripts/aurora-make-ref-plates.mjs` (12 KB — harvest the plate-gen intent, then delete; no CI/gate ref).
- **DELETE (junk, no harvest):** `.chrome-profile-fourier.log` (68 KB, untracked) · `docs/consumer-evidence/
  dock-search.md` (4 KB; virtual-window reads `use-virtual-section-window.md:53`) · `.changeset` (8 KB;
  README+config, `@changesets/cli`=0, 4 readers all `tags:[]`).
- parity-EXEMPT (no `proof-*` touched). **Landed-clean proof:** `proof:git-hygiene` H6 (root-png ≤ allowlist) GREEN.

### validate-consumers.sh — atomic .sh + alias · B8-PRUNES — EXECUTE ONLY ON USER APPROVAL
`scripts/validate-consumers.sh` (12 L) + `package.json:1033` alias, ONE commit. Harvest the wrapper's
intent (the 2 wrapped proofs LIVE + independent via `ci.yml:46-47`), then delete both. parity-EXEMPT (.sh).

---

## 4. SEQUENCING LAWS (binding DAG edges)

- **ATOMIC-DELETION** — every gate DELETE removes `{.mjs + pkg proof: entry + manifest row}` in ONE commit,
  or trips `proof:gate-script-parity` + ENOENTs. **Edge:** binds W-FINALS-DELETE (4×3), W-RED-COLLATERAL
  (3 DELETE ×3 + 3 REPOINT single-surface edits), validate-consumers, every component-delete. W-SCRIPT-SWEEP
  (48 wf-* + residue) + W-ROOT-JUNK-SWEEP are parity-EXEMPT.
- **REWRITE-AFTER-GC** — W-WORKTREE-GC completes BEFORE any `.git` rewrite (BG Op A4/Op B). **Edge:**
  `W-WORKTREE-GC → {A4, Op B}`. The 37 lanes pin pre-rewrite SHAs.
- **ARCHIVE-LIVENESS-FILTER** — tranche-archive + W-SCRIPT-SWEEP state existsSync/readFileSync/glob-only
  liveness (exclude dead `wf-*` refs, `${SL}` pointers, `//` comments). **Edge:** gates W-SCRIPT-SWEEP +
  single-letter ARCHIVE.
- **AY-REPOINT-FIRST** — re-point `proof-strict-freshness-armed.mjs:72-75` (an AY png) before any **AY**
  move. **Edge:** inert this bucket (only a BG-IMAGE Op B trips it).
- **QUIESCE-TREE (validated §0e)** — run any GC/rewrite/delete only with concurrent live-verify lanes
  stopped, at a clean-at-rest HEAD. The easter-eggs episode (dirty→landed→clean) is the worked example.
  **Edge:** precondition on ALL waves above.

---

## 5. HYGIENE GATE — EXTEND `proof:git-hygiene` with H6-H10 (born-RED spec)

**Correction to the charter's "proof:repo-hygiene":** the gate already EXISTS as
`scripts/proof-git-hygiene.mjs` (231 L; H1-H5 = the BH scratch-sweep). H6-H10 are an **EXTENSION**, NOT a
new gate. Each is BORN-RED at cce6853f and GREENs when its cleanup wave lands.

| clause | predicate (born-RED @ cce6853f) | GREEN-by | flipped-by wave |
|---|---|---|---|
| **H6** root-image clutter | `ls *.png` root ≤ allowlist (RED @ **89** / 26 MB) | ~22 harvest-then-delete + 12 BI-active relocated/allowlisted | W-ROOT-JUNK-SWEEP |
| **H7** unregistered scratch dirs | `git ls-files 'docs/tranches/**/.chrome-profile*'`==0 (RED @ **2050**) | A1 untrack | W-BG-JUNK |
| **H8** worktree-count ceiling | `git worktree list` ≤ ceiling (RED @ **62**; ceiling = primary + value.js-pinned + **12** live bi-* + margin) | prune 37 | W-WORKTREE-GC |
| **H9** ignore-rule presence | `.gitignore` carries recursive `docs/tranches/**/.chrome-profile*/` (RED: :57 narrow) | A3 widen | W-BG-JUNK |
| **H10** no-orphan-subject gate | no enrolled `proof-*.mjs` `existsSync`-asserts a `git ls-files`-absent `src/`/`demo/` subject (RED @ the 8) | RED-COLLATERAL delete/repoint | W-RED-COLLATERAL |

- **Self-test bites (mirror the H1-H5 anti-de-fang pattern):** H6 planted extra root png reds + clean
  allowlist passes · H7 planted tracked-profile reds · H8 synthetic count > ceiling reds · H9 planted
  narrow-glob reds + recursive passes · **H10 a synthetic gate asserting an absent subject reds AND a legit
  retirement-guard that asserts ABSENT PASSES** (the motion/guard false-positive guard).
- **H10 SUBSUMES the W-DOCK-GATE-CULL GC2 name-prefix gap generically** — the single generalization that
  both catches the 8 collateral misses AND prevents recurrence (subject-liveness regardless of prefix).
- **Ignore-rule set (H9):** recursive `docs/tranches/**/.chrome-profile*/` (replaces the narrow `:57`
  glob); the H3 scratch-dir guards (`test-results/`, `.tmp/`, `.playwright/`) stay.
- **Amendment targets:** header comment 26-38 · `detect()` 114-165 · `selfTest()` 168-187.

---

## 6. WAVE-DAG AMENDMENTS (exact spec-file targets from V3)

### New wave spec files (`docs/tranches/BI/waves/`; each an ATOMIC-DELETION checklist, house format)
`BI.W-SCRIPT-SWEEP.md` (B8) · `BI.W-FINALS-DELETE.md` (B8) · `BI.W-RED-COLLATERAL.md` (B8, disposition-§0c)
· `BI.W-BG-JUNK.md` (B8/PREFLIGHT) · `BI.W-ROOT-JUNK-SWEEP.md` (B8/PREFLIGHT) · `BI.W-WORKTREE-GC.md`
(PREFLIGHT) · `BI.W-DOCS-INSTRUCTIONS-COLLAPSE.md` (B9) · `BI.W-TRANCHE-ARCHIVE.md` (B9).

### `docs/tranches/BI/PLAN.md`
- §2 roster line **84** (B8-PRUNES) — append `· SCRIPT-SWEEP · FINALS-DELETE · RED-COLLATERAL · BG-JUNK · ROOT-JUNK-SWEEP`.
- §2 roster line **87** (B9-STRUCTURE) — append `· DOCS-INSTRUCTIONS-COLLAPSE · TRANCHE-ARCHIVE`.
- §1 DAG line **54** — B8-PRUNES count `(15)`→`(20)`; add a repo-hygiene + "worktree hygiene → PREFLIGHT" note.

### `docs/tranches/BI/EXECUTION-PROGRESS.md`
- Band-8 row line **55** (`14:`)→`19:` (+SCRIPT-SWEEP·FINALS-DELETE·RED-COLLATERAL·BG-JUNK·ROOT-JUNK-SWEEP).
  *(NB: DAG says B8=15, this row says 14 — a pre-existing drift; carry V3's targets, don't relitigate.)*
- Band-9 row line **56** — note +DOCS-INSTRUCTIONS-COLLAPSE·TRANCHE-ARCHIVE.
- Band-0 PREFLIGHT #81 line **47** — expand "worktree hygiene" → "W-WORKTREE-GC: harvest-3-then-prune-37, REWRITE-AFTER-GC".

### Existing-wave riders (do NOT re-open landed waves)
- `BI.W-STRUCTURE-RESEQUENCE.md` — §D-new + roster: docs/instructions COLLAPSE (→canon/conventions.md) +
  single-letter ARCHIVE (ARCHIVE-LIVENESS-FILTER) + codemod-flatten harvest-hold→W-FLATTEN-PREP.
- `BI.W-GLASS-DEDUP.md` (LANDED) — §Obligations rider: the harvested `Surface.vue`/`resolveSurfacePlate.ts`
  plate as a follow-up, not a re-open.
- `BI.W-DOCK-GATE-CULL.md` (LANDED) — census amendment (`audit/W-DOCK-GATE-CULL-census.md`): name the 8
  collateral-miss gates + the retired mechanism each locked; cross-ref that H10 cures GC2's prefix gap;
  note easter-eggs self-resolved via a concurrent lane.
- `scripts/proof-git-hygiene.mjs` — H6-H10 (§5).

### UPDATE-class riders (no new wave)
- `docs/audits/overfitting-audit.md:88` — `(verifies §Invariant 5)` → `enforced by proof:component-orphan`.
- `scripts/gates.manifest.mjs` — 30 stale π-spec `note:` fields citing absent `tests-visual/<name>.spec.ts`.
- `package.json files:["dist"]` — narrow-tarball UPDATE (standalone).
- verify-siblings — CURED (§0d): KEEP-through-close, anchored worktree-gc.mjs:36 + BI.W-CLOSE.md:18 +
  build-and-gates.md:37 (honest-anchor KEEP over a synthetic wire).

---

## 7. STANDING-REGISTRY-CARRYOVER (no approval drama — terse)

- **KEEP-PROVEN / KEEP-BY-PROCESS (15 groups):** docs/{canon(12+README), design(4), consumer-evidence(24,
  minus dock-search.md)} · .cache · .githooks/commit-msg · .github/{ci,release}.yml · .gitmodules ·
  .retired-classes.txt · components.json · index.html · ~24 LIB entries · config constellation (12, R5
  zero-change) · CHANGELOG (`## 5.0.0` anchor) · MIGRATION (PROVISIONAL) · docs/audits (wired via
  build-and-gates close-battery: canon-doc.mjs:43→proof:doc-consistency; consumer proof-close-sweep.mjs:263,300,
  manifest:361) · verify-siblings-intact (wiring CURED §0d) · profile:aurora (dev-tool) · demo :5199
  (release-load-bearing, release.sh:90/101) · retirement guards `proof:{frostShader-deleted,blob-rename,
  dock-retire-terminal,glass-prune}` (LIVE+GREEN).
- **UPDATE (5):** §5 + §6 riders.
- **ARCHIVE (2):** single-letter tranches E/J/K/L/M/N/O/P (~0 GB, ARCHIVE-LIVENESS-FILTER; gates.manifest=0
  for K/L/M/O) · docs/archive.
- **COLLAPSE (1):** docs/instructions → canon/conventions.md (B9-STRUCTURE).
- **STILL-USER (3):** BG OQ1 · BG OQ2 · value.js fenced worktree (D1/D3).
- **CONTESTED (1):** worktree-gc.mjs KEEP-as-GC-tool (favored) vs DELETE (D2).
- **DEFER (2):** 404→40-60 gate-collapse (B5d-gated, `--list` byte-identical) · retirement-guard no-meta
  successor-tranche direction.
- **NO-ACTION:** executed BH bands (B0/B1/B2mech/B4/B5b/B6); B5d detector-kit deferred.
- **CONFIRMED-SOUND (do NOT relitigate):** files:["dist"] narrow · BG chrome-profile glob
  `.chrome-profile*`-scoped (never `BG/**/*.png`) · b2b8-vs-flatten seam DISJOINT · AY W-DOCK1 pixel
  load-bearing · .ruff_cache self-ignored. *(dock-search.md · .changeset · root images now carry a §3
  wave — moved out of settled-only.)*

---

## 8. OPEN GAPS (post-pass-3)

1. **OQ1** — BG pixels-vs-prose edict scope (Op B ~3.65 GB @ 0 gate re-points). **USER (D1).**
2. **OQ2** — BG relocatable at all (Op C = 25 MB / 9-gate / 5-release-tag + unlanded-ceremony coupling). **USER (D1).**
3. **RED-COLLATERAL final per-gate call** — 3 DELETE + 3 REPOINT ruled (§0c) + approvable (§2); the 2
   ESCALATE + liquid-morph M3 route to the dock wave-owner + user (D4). Hard BI-close precondition (8 ci-RED).
4. **worktree-gc.mjs** — KEEP-as-GC-tool (favored) vs DELETE. **USER/orchestrator (D2).**
5. **value.js/glass-ui-pinned worktree** (HEAD 2e559f7a) — fenced; un-landed co-land unconfirmable. **USER (D3).**
6. **QUIESCE the tree** before any GC/rewrite — validated by the easter-eggs episode (§0e); operational, not a verdict.

*(CLOSED by pass-3: 13 PROVISIONAL-PENDING-B28 → RUN GREEN §0b · RED-COLLATERAL "7+2 plausible" → 8
confirmed RED + body-read 3D/3R/2E §0c (easter-eggs self-resolved as LANDED-DELETE) · verify-siblings
wiring owed → CURED §0d · census freshness → re-pinned at cce6853f §0a (401 rows / 2313 L) · every
c3-user-readiness additive hit folded: RED-COLLATERAL §2 line · aurora-plates + ~22 root images + 3 orphan
deletes → W-ROOT-JUNK-SWEEP · DELETE-WITH-SUBJECT triples named · arithmetic 383 · re-measure delta noted ·
bi-* 10→12 · wf-* .js/.mjs split.)*
