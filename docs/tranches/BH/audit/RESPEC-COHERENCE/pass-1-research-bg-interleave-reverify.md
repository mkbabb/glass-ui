# BH PASS-1 RESEARCH — LENS: BG-INTERLEAVE RE-VERIFICATION

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `e550f1b0` (the BG coherence audit fully folded — the second monolithic pass per the user's mandate)
**Lens:** the dominant coherence check — BG just changed materially (7 gap-waves + 7 cluster-amendments). BH's §3 interleave protocol was written against the PRE-coherence-audit BG plan and MUST be re-verified against the amended BG.
**Scope:** PASS 1 (the FIRST BH coherence pass — establish the baseline). READ-MOSTLY; this file is the only write.

> **Inputs read in full:** `SEED-CONTEXT.md` · `docs/tranches/BH/PLAN.md` · `docs/tranches/BG/audit/RESPEC-COHERENCE/COHERENCE.md` (the just-folded BG master) · `AMENDED-COHERENCE-PLAN.md` (the developed BG fold, §5/§2 load-bearing) · `bg-build-map.md` (the G4 block :1182-1208 + the FINAL register) · `EXECUTION-PROGRESS.md` (PHASE 0/1) · `bh-interleave-map.md` (BG's projection of BH PLAN.md §3) · `FINAL.md` (G4 summary). On-disk verified: `package.json` peer/dev deps, `src/composables/motion/useDragMorph.ts`.

---

## 0. HEADLINE VERDICT

The interleave protocol is **structurally sound on the G1 axis** (the CLOSEFIX-9SITE re-sequence does NOT change when any BH `[C]` band can start) but carries **ONE HIGH-severity ONE-SIDED REFERENCE on the G4 axis**: BG's coherence fold placed THREE concrete obligations on the wave it names `BH-B2.1-swap` (the kf-peer bump `^5.0.0 → ^5.1.0`, the L15 budget net-rebaseline, the FINAL ci.yml re-emit + `proof:binding-sweep`), and **neither BH's PLAN.md NOR BG's own `bh-interleave-map.md` (the projection of BH PLAN.md §3) reciprocates** — both still describe B2.1-swap as a pure subpaths-delete/regen wave. BG points at BH; BH doesn't know. A resumed execution that fires BH's plan verbatim ships 5.0.0 with the LIVE broken-gesture defect (`peerDependencies.@mkbabb/keyframes.js = ^5.0.0` while `useDragMorph.ts:58` ships `snap:`, which first ships kf 5.1.0).

A second HIGH one-sided reference rides the same axis: BH PLAN.md `W2-value-destraddle` still claims `→ ^1.2.0`, but the wave LANDED `^1.0.0` (DONE at `0d6b9f8a`), and BG's §2.C2 dropped `^1.2.0` as MOOT. The BH plan text is stale on both the version AND the "all met at the pinned 5.1.0/1.2.0" claim in the W3 note.

**Re-verified interleave table → §3. One-sided references (all HIGH) → §4.**

---

## 1. THE G4 KF-PEER RE-HOME — the exact obligation BG placed, and where it lands (or doesn't)

### 1.1 What BG's fold decided (the BG side — FULLY APPLIED on disk)

`COHERENCE.md §2.C1` (HIGH→MEDIUM, conv 88%, cluster G4) + `AMENDED-COHERENCE-PLAN.md §5.1-1` + `§5.3` + `bg-build-map.md:1182-1208` + `FINAL.md:553/658` all agree, and the fold IS on disk at HEAD `e550f1b0`:

- The kf peer bump `^5.0.0 → ^5.1.0` re-homes onto **`BH-B2.1-swap`** — the FINAL pre-cut `package.json` + ci.yml single-writer, gated STRICTLY AFTER WS5∧WS6∧WS12, STRICTLY BEFORE `BG.W-CUT`. (`B1-W2` is CLOSED on disk at `0d6b9f8a` and CANNOT be the owner — the bump re-homes onto an UNRUN wave.)
- `BH-B2.1-swap` carries THREE adds the device-free close battery is otherwise BLIND to (`bg-build-map.md:1187-1208`):
  1. **The kf peer bump** + the floor-vs-API gate-hardening on `proof:peer-conformance` via `BG.W-GATE-FIELD-AURORA` (the single owner) + **`proof:binding-sweep [local]`** (G7 L1) runs at this bump wave.
  2. **L15 — the net-lift as ONE name-agnostic number** across ALL chunks incl. siri + refract (`BUDGETS` walks 6 of 8; siri + refract ABSENT).
  3. **The FINAL ci.yml emit byte-fresh** (re-run `gates:emit-ci` so `glass-idiom-factor` + `category-card-warm` ride the final gate set).

This is a **BG-side build-map edit, addressed to a BH-NAMED wave.** The fold-agent applied it to `bg-build-map.md`. It did NOT (and structurally could not, in one fold pass) reach into BH's own PLAN.md or the projection map.

### 1.2 The LIVE defect — verified on disk (the SEED-CONTEXT's "first concrete cross-tranche coherence test")

```
package.json:1078   "@mkbabb/keyframes.js": "^5.0.0"      ← peerDependencies (the CONSUMER-facing floor — BROKEN)
package.json:1116   "@mkbabb/keyframes.js": "^5.1.0"      ← devDependencies (masks it LOCALLY)
src/composables/motion/useDragMorph.ts:58   import { Draggable, SpringProgress } from "@mkbabb/keyframes.js";
src/composables/motion/useDragMorph.ts:20-25  // THE NATIVE SNAP (kf 5.1.0 DragOptions.snap) … hands it snap: snapTargets.map(t => t.center)
```

`DragOptions.snap` first ships kf 5.1.0. On a kf-5.0.0 consumer (admitted by the `^5.0.0` peer floor) the drag NEVER snaps to a detent — a LIVE broken-gesture defect. The devDeps `^5.1.0` hides it from glass-ui's own gates; only a real downstream consumer at the floor hits it. `B1-W3` (snap-excise, DONE `ba23c086`) created the dependency (it wired `snap:`); the floor bump that the excise REQUIRES did NOT land with it. This is the SEED-CONTEXT's named "a wave lands the surface change but not the consumer-side adaptation" class — the SAME shape as G2's near-miss + G5's missing parallax arm.

### 1.3 Where the obligation IS reflected — and where it is NOT

| Doc | Carries the G4 kf-peer obligation on B2.1-swap? | Evidence |
|---|---|---|
| `bg-build-map.md` (BG) | ✅ YES — full 3-add spec | `:1182-1208` |
| `FINAL.md` (BG) | ✅ YES — names BH-B2.1-swap | `:553`, `:658` |
| `COHERENCE.md` (BG) | ✅ YES — §2.C1 status board + §3d interleave | `:64`, `:185-189` |
| `AMENDED-COHERENCE-PLAN.md` (BG) | ✅ YES — §5.3 EXACT edit table targets `BH-B2.1-swap :880-888` | `:152` |
| **`bh-interleave-map.md` (BG's projection of BH PLAN.md §3)** | ❌ **NO** — the B2.1-swap row (`:40`) names ONLY glob-swap/delete-subpaths/regen/flatten/rewrite-spec; ZERO kf-peer/binding-sweep/L15; the map mentions G4 NOWHERE | `:40` |
| **`BH/PLAN.md` (BH)** | ❌ **NO** — W-regen-swap (B2.1-swap, `:68`) names ONLY glob-swap/delete/regen/flatten/rewrite-spec | `:68` |

**The gap is precisely the G4 obligations.** The WS5/WS6 surface-change re-baseline (the OTHER thing B2.1-swap owns) IS reciprocal — both BH PLAN.md:68 and bh-interleave-map.md:40 carry "captures WS6 +2 siri, WS5 viz deletes/renames." So this is a TARGETED one-sided reference, not a wholesale desync.

---

## 2. THE G1 RE-SEQUENCE — does CLOSEFIX-9SITE → row 0.7 change WHEN a BH `[C]` band can start?

### 2.1 The re-sequence is APPLIED and well-formed

`EXECUTION-PROGRESS.md:67` homes `BG.W-CLOSEFIX-9SITE` at seq `0.7` in PHASE 0 (post-STAGE-0, before WS1/WS3), with the no-delete back-pointer at `:232` (row 12.0) carrying the `→ see 0.7` NON-status sentinel (the MR-2 dual-row-ambiguity fold). Its preconds are `[STAGE-0, BG.W-GLASS-BLUR-PEER (3.6)]` — both BG-INTERNAL.

### 2.2 VERDICT: NO. It does not move any BH `[C]` start edge.

Three independent confirmations:

1. **No precond edge.** A grep for `precond.*closefix|precond.*0\.7` across `EXECUTION-PROGRESS.md` + `bh-interleave-map.md` finds ZERO BH→0.7 edge. CLOSEFIX is a precond of `[3.5, 13.1/WS8, 14.1/WS9]` (all BG), never of any BH wave.
2. **File-disjoint.** CLOSEFIX-9SITE carves `ladder.css`/`shell.css` + retires the `--glass-blur-dock` chain across `glass.css`/`dark-arm.css`/`bridges.css` + edits gate scripts (all BG-owned `src/styles/` + `scripts/`). Every BH `[C]` band explicitly "dodges BG's write-set" (`bh-interleave-map.md:7`, `EXECUTION-PROGRESS.md:69`) — none touches those files. The `[C]` unblock edge is "dodges BG's write-set," which is satisfied independent of WHERE 0.7 sits in the sequence.
3. **Empirical proof.** At HEAD, PHASE 1 BH `[C]` (rows 1.1-1.12, all of B0/B1/B2.0/B2.1-mech/B2.4a/B4a/B4b-skeleton/B4c-files/B4d-files/B6) are ALL **DONE**, while row 0.7 CLOSEFIX is still **PENDING**. The BH `[C]` bands literally ran to completion BEFORE 0.7 landed — direct evidence that the re-sequence creates no BH-start dependency.

**Why the SEED-CONTEXT raised the question (and why the answer is benign):** the worry was that 0.7 lands EARLY (PHASE 0) carving `ladder.css`/`shell.css`, and a BH `[C]` band that grazed those files would now collide earlier. But no BH `[C]` band touches `ladder.css`/`shell.css`/the glass-blur chain — the only BH carves (`B2.4a`) are `CarouselContent.vue`/`PagerDots.vue`/`useBloomUp.ts` (`custom/` + `composables/`, the one [C]×WS10 graze is `ui/carousel`, unrelated to CLOSEFIX). The re-sequence's WHERE is irrelevant to BH because the WHAT (BH's file-bounds) never overlaps CLOSEFIX's write-set.

**Minor coherence note (LOW):** the WS5/WS6 surface that B2.1-swap re-baselines against is downstream of 0.7's `--glass-blur-dock` retirement, but B2.1-swap is `[WS12]` (after full close), so 0.7's early landing is long-since absorbed by the time B2.1-swap runs. No edge implication.

---

## 3. THE RE-VERIFIED INTERLEAVE TABLE

Every BH wave × its BG-interleave class, re-verified against the AMENDED BG (the cluster-amendments noted). `RECIP` = does the cross-reference reciprocate (both sides' docs agree)?

| BH wave | Class | BG-amended interaction | RECIP | Note |
|---|:---:|---|:---:|---|
| B0 W0-scratch-sweep | [C] | none | ✅ | DONE 1.1 (`7a138008`). Dodges BG write-set. |
| B1 W1-external-payload | [C] | shared `vite.library.ts` w/ WS6 | ✅ | DONE 1.2. File-checkpoint reciprocal (both docs). |
| B1 W2-value-destraddle | [C] | **§2.C2: `^1.2.0` MOOT/DROPPED; landed `^1.0.0`** | ❌ **HIGH** | DONE 1.3 (`0d6b9f8a`). **BH PLAN.md:62 STILL says `→ ^1.2.0`** — see §4-F2. |
| B1 W3-dragmorph-snap-excise | [C] | **§2.C1: created the kf-peer dependency the bump must satisfy** | ❌ **HIGH** | DONE 1.4 (`ba23c086`). BH PLAN.md:63 + interleave:29 STILL say "ZERO upstream asks / all met at pinned 5.1.0/1.2.0" — contradicts the LIVE defect. See §4-F1/F3. |
| B2.0 W-alias-codemod | [C] | none | ✅ | DONE 1.5. |
| B2.1-mech W-regen-mechanism | [C] | none | ✅ | DONE 1.6. → `proof:subpath-classify`. |
| B2.4a W-bh-carves | [C]¹ | [C]×WS10 graze on `ui/carousel/CarouselContent.vue` | ✅ | DONE 1.7. Graze reciprocal (both docs, §2). |
| B2.5 W-dock-leaf-verify | [WS2] | verify GlassDock/fission carved by WS2 + `useDockContextSilhouette` DEFINITION-ABSENT | ✅ | PENDING 5.1. WS2 owns dock god-modules. |
| B2.4b W-leaf-verify-ws4 | [WS4] | verify createCanvasLifecycle/useWebGPUCanvas/useGlassBackdropLuminance/SegmentedTabs | ✅ | PENDING. |
| B2.4c W-leaf-verify-ws5 | [WS5] | verify useBlobSatellites/useGooDotMatrix | ✅ | PENDING. |
| **B2.1-swap W-regen-swap** | [WS12] | **§G4: OWES kf-peer bump + L15 budget + ci.yml emit + proof:binding-sweep** | ❌ **HIGH** | **BH PLAN.md:68 + interleave:40 carry NONE of the 3 G4 adds.** See §4-F1 (the primary lens finding). |
| B2.2 W-api-fold | [WS12] | drop `./api`; 203-symbol re-home; WS5 viz-subpath consumer owned by BG-WS5 | ⚠️ | PENDING. Cross-lens: the 203 count is a 4.2.0 snapshot, re-baselined post-WS12 (PLAN §5-1) — coherent BUT see §5 (export-surface-reverify lens overlap). |
| B2.3 W-curated-relocate | [WS12] | key-preserving | ✅ | PENDING. |
| B2.6 W-styles-colocation | [WS12] | → B4f edge; ~30 gate path-re-points | ✅ | PENDING. |
| B3 δ1-δ6 (demo) | [WS4] | overlaps WS4 chassis-consolidate / WS2 SHELL-DOCK-DRY / `BG.W-MANIFEST-COLOCATE` | ✅ | PENDING. Verify-against, no re-fold. |
| B4a-archive-refresh | [C] | none | ✅ | DONE 1.8. |
| B4b-skeleton | [C] | canon/design resolver seams | ✅ | DONE 1.9. |
| B4b-content | [WS12] | per-component edges: DOCK_SPRING after WS2, glass+READMEs after WS3/WS8, handmark after WS9, de-shadcn after WS10, RATCHET after WS12; **§2.I1: canon-home `docs/canon/build-and-gates.md` (G6)** | ✅ | PENDING. G6 reconciled the home (was `BG/canon/`). |
| B4c-precept-extract | [C]/[WS2]/[WS12] | extraction after WS2 (DOCK_SPRING `0.32/0.7`→`0.68/0.64`) | ✅ | files DONE 1.10. |
| B4d-evidence-prune | [C]/[WS12] | `proof:consumer-evidence-live` | ✅ | files DONE 1.11. |
| B4e-doc-slim | [WS12] | dual-doc w/ B5c (`on-glass-fg`/`surface-axis` read CLAUDE.md+MIGRATION.md) | ✅ | PENDING. |
| **B4f-claude-delete** | [WS12] ABS-LAST | **§2.L13/L14 + G6: gate → `proof:claude-deletable` (16 readers, de-blinded C2)** | ⚠️ | PENDING. **G6 MR-1 corrected the census 15→16** — BH PLAN.md:93 + interleave:151 still describe the gate as `rg -l 'CLAUDE.md' = 0` (the bare form that CANNOT pass at HEAD). See §4-F4. |
| B5a-deps-currency | [WS3] | split `vite.style-assets.ts` | ✅ | PENDING. |
| B5b-gate-manifest-extract | [WS12] | HARD-collision `scripts/gates.mjs` | ✅ | PENDING. |
| B5c-gate-rehome | [WS12] | **§2.I1/G6: 16 (not 15) CLAUDE-readers via canon-doc.mjs; handmark is a HARD reader (G6 MR-2)** | ⚠️ | PENDING. **G6 corrected the count 16** — BH PLAN.md:99 + interleave:72/126/146 say "16" in some places, "~16" elsewhere; the de-blinded-16 + handmark-not-soft + expandable-part:66-exclusion folds are NOT yet in BH-side docs. See §4-F5. |
| B6 W-core-prompts | [C] | none | ✅ | DONE 1.12. |
| B7 W-api-ask-roster | [WS12] | 2 by-name asks (muster→/aurora, speedtest→/timeline); BG-WS5 owns viz-subpath/slides migration; **G7 U1: + bbnf `--glass-blur-dock` retune-no-op B7 row** | ⚠️ | PENDING. **G7 U1-1 adds a 3rd B7 migration row** (bbnf dock-blur) — BH PLAN.md:106 names only the 2 /api asks. See §4-F6. |

¹ carousel arm = the [C]×WS10 graze — land before WS10 rewrites `CarouselContent.vue` or rebase onto it.

**Reciprocal (✅): 18 rows. One-sided / stale (❌ HIGH): 3 rows (W2, W3, B2.1-swap). Cluster-amendment-not-yet-in-BH-docs (⚠️ flagged): 5 rows (B2.2, B4f, B5c, B7, B2.4a-adjacent).**

---

## 4. ONE-SIDED REFERENCES — every BG↔BH cross-reference where the other side's doc does not reciprocate (all flagged per the lens mandate)

### F1 — [HIGH · the PRIMARY lens finding] `BH-B2.1-swap` carries the G4 kf-peer obligation in BG's docs, ZERO in BH's

- **BG side (points at BH):** `bg-build-map.md:1182-1208` + `FINAL.md:553/658` + `AMENDED-COHERENCE-PLAN.md §5.3` + `COHERENCE.md §2.C1` all name `BH-B2.1-swap` as the owner of (a) the kf peer bump `^5.0.0 → ^5.1.0`, (b) the L15 budget net-rebaseline, (c) the FINAL ci.yml emit + `proof:binding-sweep`.
- **BH side (does not reciprocate):** `BH/PLAN.md:68` (W-regen-swap) describes ONLY glob-swap + delete subpaths + regen exports + flatten + rewrite spec. `bh-interleave-map.md:40` (BG's OWN projection of BH PLAN.md §3) likewise carries ZERO kf-peer/L15/binding-sweep, and **mentions G4 NOWHERE in the entire file**.
- **Failure scenario:** a resumed execution fires BH's plan verbatim at the [WS12] tail; B2.1-swap runs the subpaths-delete + regen and STOPS; the kf peer stays `^5.0.0`; 5.0.0 cuts with the LIVE broken-gesture defect (any kf-5.0.0 consumer's drag never snaps). The floor-vs-API hardening on `proof:peer-conformance` (the gate that would catch it) also never lands because its owner (`BG.W-GATE-FIELD-AURORA`) is BG-side and the BH plan never references the coupling.
- **Why it's the load-bearing one:** the interleave-map is the document whose JOB is to bridge BG's timeline and BH's bands (`bh-interleave-map.md:1-9`), and it is blind to the single highest-value G4 add. The bridge doc itself doesn't reciprocate.

### F2 — [HIGH] BH PLAN.md `W2-value-destraddle` claims `→ ^1.2.0`; the wave LANDED `^1.0.0` and BG dropped `^1.2.0` as MOOT

- **BG side:** `COHERENCE.md §2.C2` + `FINAL.md` corrections: "the executed value peer is `^1.0.0` (NOT `^1.2.0`); peer-conformance GREEN; `wcagContrastRatio` zero in-tree callers → the `^1.1.1` floor is MOOT/unjustified." `EXECUTION-PROGRESS.md:75` (row 1.3, DONE `0d6b9f8a`): "`^0.13.0 || ^1.0.0` → single clean `^1.0.0`." On-disk: `package.json:1080/1118` = `^1.0.0`.
- **BH side (stale):** `BH/PLAN.md:17` ("value.js `^0.13.0 || ^1.0.0` straddle") + `:62` (`→ ^1.2.0` (keyframes 5.1.0 transitively deps value `^1.2.0`)) describe a `^1.2.0` target that was DROPPED, against a CLOSED wave.
- **Failure scenario:** a reader trusting BH PLAN.md re-opens the value destraddle to push `^1.2.0` (which would EXCLUDE registry-latest and RED `proof:peer-conformance`'s "admits latest" clause — the exact failure BG's correction prevents). The plan text actively misdirects toward the regression BG caught.

### F3 — [HIGH] The W3-snap-excise note "ZERO upstream asks / all met at pinned 5.1.0/1.2.0" contradicts the LIVE kf-peer defect

- **Both BH PLAN.md:63 AND bh-interleave-map.md:29** carry "the 3 CONSUME interims carry ZERO upstream asks" / "all met at the pinned 5.1.0/1.2.0." This was true for the CODE (the excise wired `snap:`) but FALSE for the FLOOR: the peer is still `^5.0.0`, so the consume is NOT met at the consumer-facing floor. BG's §2.C1 explicitly re-grounds it: "the kf peer is still `^5.0.0` … on a kf-5.0.0 consumer the drag NEVER snaps to a detent (a LIVE broken-gesture defect)."
- **One-sided shape:** BG's COHERENCE.md re-graded the claim to a LIVE defect; the BH docs (and the interleave-map) still carry the pre-audit "all met" framing. The two sides disagree on whether the kf consume is discharged.
- This is the SAME defect-source as F1 (the missing floor bump) viewed from the W3 note rather than the B2.1-swap row — flagged separately because it's a DISTINCT stale string in a DISTINCT location that a fix must also correct.

### F4 — [MEDIUM] B4f gate `rg -l 'CLAUDE.md' = 0` (BH) vs `proof:claude-deletable` de-blinded-16 (BG-G6)

- **BG side:** `COHERENCE.md §2.L14` + G6 §7.2: the B4f gate is `proof:claude-deletable` GREEN (C1/C2-de-blinded-16/C3), NOT the bare `rg -l 'CLAUDE.md' = 0` (which "CANNOT pass at HEAD"). `AMENDED-COHERENCE-PLAN.md §7.3` edits `BH/PLAN.md:93` + B5c to the `proof:claude-deletable` form.
- **BH side (stale):** `BH/PLAN.md:93` + `bh-interleave-map.md:151` describe the gate as `rg -l 'CLAUDE.md' scripts/proof-*.mjs = 0`. The G6 fold names BH PLAN.md:93 as an EXACT edit target — the edit is SPECIFIED in BG's plan but NOT yet applied to BH's doc.
- **One-sided shape:** BG's AMENDED-COHERENCE-PLAN explicitly lists a BH-side edit it has not (and cannot, cross-tranche) applied. The fold owes a BH-doc amendment that the BH plan must absorb.

### F5 — [MEDIUM] The CLAUDE-reader census: BG corrected 15→16 + handmark-is-HARD + expandable-part:66-exclusion; BH docs lag

- **BG side:** `COHERENCE.md` G6 MR-1 "the census is 16 not 15" + MR-2 "handmark is a HARD reader, remove from soft-set" + MR-3 "expandable-part:66 dead-const NOT rewritten." Every BG doc writes 16.
- **BH side:** `BH/PLAN.md:16` ("~16 gates"), `:99` (B5c "16 CLAUDE-readers"), `bh-interleave-map.md:72/126/146` ("~16 reader-gates"). The COUNT mostly agrees (~16/16), but the de-blinded-16 SPECIFIC SET + the handmark-not-soft + expandable-part:66-exclusion refinements (the load-bearing G6 folds) are NOT in BH-side docs. The B5c soft-cleanup derivation `(string-grep ∖ de-blinded-16-hard)` is a BG-G6 construct the BH plan doesn't carry.
- **One-sided shape:** the precise census mechanics live only in BG's fold; BH's B5c will mis-execute (soft-clean a hard reader, e.g. handmark) if it follows its own plan's coarser "16 readers" without the G6 refinement.

### F6 — [MEDIUM] G7 U1 adds a 3rd B7 migration row (bbnf `--glass-blur-dock`); BH B7 names only the 2 /api asks

- **BG side:** `COHERENCE.md §2.U1` + G7 8.1-4 + `bg-build-map.md:1265-1284`: the `--glass-blur-dock` retirement (CLOSEFIX-9SITE) silently no-ops bbnf-buddy's `preset.css:230` override → a by-name `bbnf-glass-blur-dock-retune-no-op` B7 migration row in `docs/tranches/BH/coordination/asks-and-consumes.md` + `proof:retired-token-consumers` born-RED on bbnf:230.
- **BH side:** `BH/PLAN.md:106` (W-api-ask-roster) names "exactly 2 by-name asks: muster→/aurora, speedtest→/timeline." `bh-interleave-map.md:83` likewise. The bbnf token-retune ask is a 3rd B7 row owed but absent from BH's roster.
- **One-sided shape:** G7 routes a NEW B7 deliverable into a BH coordination file (`asks-and-consumes.md`) that BH's plan B7 doesn't enumerate. The "exactly 2 asks" claim in BH PLAN.md §7 is now stale (G7 makes it 3 — though the bbnf one is a TOKEN retune, distinct from the /api key-drop asks).

### F7 — [LOW] B2.2 203-symbol count vs the WS5/WS6 surface delta (cross-lens overlap with export-surface-reverify)

- **Both sides** carry the "203-row /api map is a 4.2.0 snapshot, re-baselined post-WS12 against the landed surface (WS6 +2 siri, WS5 viz deletes/renames)" residual (BH PLAN.md §5-1 + bh-interleave-map.md §2-3). This IS reciprocal. Flagged LOW only because the EXACT count (203) may drift under WS5 viz subpath deletes/renames — a re-verification the parallel export-surface-reverify lens owns; recorded here for cross-lens coherence, not a one-sided reference.

---

## 5. CROSS-LENS NOTES (for the synthesis pass)

- **F1/F2/F3 are ONE defect-cluster** (the kf/value peer coherence on the B1→B2.1-swap axis) with THREE distinct stale-string locations. A fix must touch: BH PLAN.md:62 (value `^1.2.0`→`^1.0.0`-recorded-closed), BH PLAN.md:63 + interleave:29 (the "ZERO upstream asks/all met" note → "the kf FLOOR bump owed at B2.1-swap"), BH PLAN.md:68 + interleave:40 (B2.1-swap → ADD the 3 G4 obligations). The cleanest fold: a BH amendment that mirrors BG's `bg-build-map.md:1182-1208` G4 block into BH's B2.1-swap spec (PLAN §2-#3 already says "Every BH wave declares file-bounds; file-moving bands sequence after the owning BG wave" — the G4 obligation is a NEW file-bound on B2.1-swap that the plan must absorb).
- **F4/F5 are ONE cluster** (the CLAUDE-delete census mechanics, G6) — both resolve when BH absorbs the de-blinded-16 + the `proof:claude-deletable` gate form.
- **G1 (the re-sequence) is CLEAN** — no BH amendment owed on that axis. Record it as VERIFIED-NO-CHANGE so a later pass doesn't re-open it.
- **The interleave-map is the natural fold target** for F1/F3/F6: it is BG's projection of BH PLAN.md §3 and currently lags the amended BG on the kf-peer + bbnf-B7 axes. Updating it (and BH PLAN.md in lockstep) closes the one-sided references — "BOTH sides of the interleave must agree post-fold" (SEED-CONTEXT process note).

---

## 6. SUMMARY FOR THE SYNTHESIS

| # | Finding | Severity | Recurs (friction class) |
|---|---|:---:|---|
| F1 | `BH-B2.1-swap` G4 kf-peer obligation: BG points, BH (+ interleave-map) silent | **HIGH** | Class L (reka/kf binding silent no-op) + the surface-change-without-consumer-adaptation class |
| F2 | BH PLAN.md value `→^1.2.0` stale vs landed `^1.0.0` / BG-dropped-MOOT | **HIGH** | Class S-adjacent (dependency-floor); the stale-plan-text-vs-disk class |
| F3 | W3 note "ZERO upstream asks/all met at 5.1.0/1.2.0" contradicts the LIVE kf-peer defect | **HIGH** | Class L; the consume-claimed-discharged-but-floor-broken class |
| F4 | B4f gate `rg=0` (BH) vs `proof:claude-deletable` de-blinded-16 (BG-G6) | MEDIUM | the CLAUDE.md ENOENT-crasher class (SEED-CONTEXT-named) |
| F5 | CLAUDE-reader census 16-set + handmark-hard + expandable-part:66 folds lag in BH | MEDIUM | gate-vacuity / hand-authored-map drift |
| F6 | G7 U1 3rd B7 row (bbnf `--glass-blur-dock`) absent from BH B7 roster | MEDIUM | Class C (clean-break rename misses a consumer) + Class U1 |
| F7 | 203-symbol /api count vs WS5/WS6 surface delta (cross-lens) | LOW | export-surface-reverify lens owns |

**G1 axis (CLOSEFIX→0.7): VERIFIED — does NOT change any BH `[C]` start edge** (no precond, file-disjoint, empirically all `[C]` DONE while 0.7 PENDING).

**The dominant fold owed:** absorb BG's G4 block into BH's B2.1-swap spec (PLAN.md + interleave-map in lockstep) so the kf-peer floor bump, the L15 budget walk, the ci.yml emit, and `proof:binding-sweep` are BH-side obligations — and reconcile the stale value/kf consume notes (F2/F3) that the audit re-graded to a LIVE defect.
