# PASS-1 RESEARCH — BH RESTRUCTURE COHERENCE (broad triage)

**Agent lens:** BH restructure coherence — the export reshape (drop `/api` + 2 sibling asks),
`src/subpaths/` delete, regen-exports (B2.1), CLAUDE.md hard-delete + doc-redistribute
(→ `docs/canon` + `docs/design`), the gate-reader rehome. Coherent, safe, reversible,
correctly SEQUENCED for the joint 5.0.0 cut? What breaks consumers?
**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · siblings-intact exit 0 (before + after).
**Method:** read `docs/tranches/BH/PLAN.md` + the proto roster/regen artifacts; verify the LANDED [C] band on disk;
RUN the BH gates (`subpath-classify`, `crossrepo-asks`, `no-god-module`); grep the real CLAUDE-reader set vs the
plan's count; resolve the canon/design home maps against disk. READ-ONLY; wrote only this file.

---

## 0. BOTTOM LINE

The BH restructure is **architecturally coherent and the export break is genuinely small + grepped, not guessed.**
The proven mechanisms (the fail-CLOSED regen, the two fail-explicit resolver seams) are the right shape: the export
surface regenerates from ONE single-source policy with EXACT_REPRODUCTION, and the doc-migration throws ENOENT-loud
rather than silently passing on a vanished doc. The [C] concurrent-safe band is LANDED and sound.

**Three coherence defects that bite at the cut, in priority order:**

1. **The CLAUDE-reader count is UNDERSTATED — plan says "16 readers," disk says ~18 hard readers + 9 comment
   mentions = 27 total references.** B4f (CLAUDE.md delete) is gated on B5c re-homing EVERY hard reader. An
   undercount of 2 means 2 gates could be missed → B4f produces an ENOENT close-battery break at the most
   irreversible moment (after the file is gone). This is the single load-bearing fence and its census is stale.

2. **The redistribution is enforced by EXISTENCE, not CONTENT — and is RED right now.** `auditCanonHomes()` only
   does `existsSync` (the plan specs "non-empty + the contract token present"). And it FAILS at HEAD:
   `component:instrument-chassis` → `src/components/custom/instrument-chassis/README.md` is ABSENT. The resolver
   map references a home that does not exist. Caught by the audit (good fail-explicit design), but it proves the
   map is AHEAD of the homes and that B4b-content has real, unbuilt work.

3. **The ENTIRE file-moving/export/gate/CLAUDE band is `[WS12]` — a long serialized tail stacked on top of the
   biggest BG paint risk** (WS12 coherence capstone + the 480-capture dual-engine verdict). The post-WS12
   re-baseline (regen against WS5 viz deletes + WS6 +2 siri) is gate-FORCED but human-in-the-loop, and B4f is the
   absolute-last act with a strict B4b-content → B5c → B4f chain. The cut is one long pole, not a flush close.

Nothing here is a RESTART. The specs are sound; the amendments are (a) fix the reader census, (b) make the
content-completeness check real, (c) confirm two cross-ownership seams before the cut.

---

## 1. THE LANDED [C] BAND — KEEP-VERIFIED (with two half-baked sub-items)

The concurrent-safe band ran without touching BG's write-set, exactly as §3 promised. Disk-verified at HEAD:

| Wave | Disk evidence | Verdict |
|------|--------------|---------|
| **B0 scratch-sweep** | `git ls-files \| rg 'test-results/\|.browserslistrc'` = 0; porcelain clean | keep-verified |
| **B1 payload/destraddle/snap** | `proof:external-payload`/`peer-conformance`/`drag-morph` GREEN (sibling research); value single-leg `^1.0.0` | keep-verified |
| **B2.0 @glass-alias + codemods** | `proof:alias-codemod` GREEN; 719 `@glass` rewrites survive (492 demo + 227 tests) | keep-verified |
| **B2.1-mechanism (fail-CLOSED regen)** | `proof:subpath-classify` PASS: C1 exit 0 EXACT_REPRODUCTION=true failClosed=true fidelity 0-fail; C2/C3 exit 1. `scripts/lib/subpath-policy.mjs` (30 exports) single-sources `libraryEntryMap()` + the generator | **keep-verified — the load-bearing mechanism is proven** |
| **B2.4a carves** | `useCarouselWorm.ts` + `usePagerWorm.ts` PRESENT under their colocated `composables/`; `proof:no-god-module` shader-exemption shape | keep-verified (one half-done sub-item — see below) |
| **B4b-skeleton** | `docs/canon/` (10 files) + `scripts/lib/canon-doc.mjs` + `design-docs.mjs` (both fail-explicit) landed; `structure.md` generated-from-disk | **half-baked — see §3** |
| **B4c-precept-extract (files)** | `docs/design/` has all 4 with real content (design-idioms 31KB, motion-canon 16KB, affordance-map 15KB, tunable-anim 9KB); `auditDesignHomes()` = NONE absent | keep-verified |
| **B6 prompts** | `prompts/{LEGACY-EXCISION,RESTRUCTURE-BACKEND,RESTRUCTURE-FRONTEND}.md` present; `proof:core-prompts` GREEN | keep-verified |

**Half-baked sub-items inside the landed band:**
- **B2.4a `useBloomUp.ts` relocate is unfinished.** It is still at `src/composables/motion/useBloomUp.ts` (the
  plan's "audit-then-relocate → likely single-consumer relocate" never decided). Not a break; an open sub-item.
- **B4b-skeleton `auditCanonHomes()` is existence-only AND red.** See §3 — the headline coherence defect.

---

## 2. THE EXPORT RESHAPE — SAFE, MINIMAL, KEY-PRESERVING (keep-verified)

The consumer-facing break is the smallest possible and it is GREPPED, not assumed:

- **Exactly ONE dropped key: `./api`.** The regen reproduces **96/96 keys** with zero add/drop/mismatch (proven
  by `proof:subpath-classify` C1 EXACT_REPRODUCTION against the live 4.2.0 surface; `package.json` has 96 keys,
  `./api` present today). `src/subpaths/` (79 mirror barrels) delete + the 10 flat `src/*.ts` barrel relocate
  (B2.3) are **key-preserving** — zero consumer break.
- **The `/api` fold is a 203-symbol re-home** (199 types + 4 consts): 200 pure import-path swaps + 3 orphans that
  ADD an export (`Surface`→/card, `MenuItemVariants`→/command, `ControlSize`→/forms).
- **Exactly 2 sibling asks** (`P3.3-SIBLING-CONSUMER-ROSTER`, read-only grep over the whole constellation):
  muster `useAuroraConfig.ts:47` `/api`→`/aurora`; speedtest `PhaseTimeline.vue:52` `/api`→`/timeline` (+ the dead
  `vite.config.mjs:1033` optimizeDeps string in the same ask). `proof:crossrepo-asks` GREEN — the roster is
  authored, both asks carry a disposition, the foreign-tree fence is machine-locked, and the no-silent-drop
  self-test bites fire.
- **Reversibility:** the reshape is a clean break (no aliases, per the no-backwards-compat law), so it is NOT
  consumer-reversible — but that is the design intent of a 5.0.0 major. It IS internally reversible: every move is
  glob/codemod-driven off the single-source policy, so a regen re-run reproduces or reverts deterministically.

**Cross-ownership seam to confirm (risk):** BH owns the `/api`-drop asks. **BG-WS5 owns any viz-subpath
delete/rename consumer migration** (slides consumes `/constellation` + `/fourier-field`). The roster flags this but
does NOT own it. If WS5 drops a viz key and does not carry the slides ask, a real consumer break falls through the
seam. The post-WS12 export-delta surfaces any key drop — but only if someone diffs it. **Must-not-skip: confirm
BG-WS5 carries the viz-subpath consumer migration, or fold it into B7 at re-baseline.**

---

## 3. THE CLAUDE.md DELETE + DOC-REDISTRIBUTE — THE COHERENCE FRONTIER

This is where the BH band is least-baked and most-load-bearing. The architecture is right; the census + the
content check are not yet trustworthy.

### 3a. The reader census is STALE (the B4f fence undercount)

The plan (§2-#1, B5c) says "the ~16 CLAUDE-reading gates re-home." **Disk says 27 proof scripts reference
CLAUDE.md.** Classified:

- **~18 HARD readers** construct a path/`read("CLAUDE.md")` and assert against its CONTENT (a hard violation):
  `claude-structure-sync`, `doc-consistency`, `doc-override-idiom`, `dock-unify` (F5), `dock-rail-realize` (R5),
  `dropdown-fix` (D3), `easing-primitive` (W5), `expandable-part`, `handmark` (W6), `on-glass-fg`, `phase-palette`
  (W4), `readme-meta-clean`, `spa-view` (W5), `split-chars` (SP6), `surface-axis`, `close-battery-parity`
  (clause 4), `crossrepo-asks`, `accent-tone` (soft/WARN-degrade — the plan correctly DROPS this read).
- **~9 COMMENT-only mentions** (`bc-fold-ledger`, `page-chassis`, `page-hierarchy`, `peer-optional`,
  `scroll-trigger`, `spring-tokens-synced`, `storybook-meta`, `visual-runner`, `viz-configurator-suite`) — they do
  not READ the file, but they reference it in prose. Not a break on delete; a staleness sweep is owed (the comments
  cite a file that no longer exists).

**The bite:** B4f is gated on B5c re-homing every HARD reader. The plan's "16" undercounts the ~18 by 2. The
`canon-doc.mjs` resolver seam is the right DRY mechanism (one map, fail-explicit), but the gates are NOT yet
re-pointed (B5c is `[WS12]`), so all 18 read CLAUDE.md directly at HEAD. If even one hard reader is missed at B5c,
B4f deletes the file AND the close battery ENOENT-breaks. **Amend: re-census to the exact ~18, enumerate each
reader's asserted token + its target home, and gate B4f on `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` returning
0 for readFileSync sites (the plan's own B4f gate text) — which today returns 18.**

### 3b. The redistribution is EXISTENCE-checked, not CONTENT-checked — and RED now

`auditCanonHomes()` (the landed B4b-skeleton seam) filters on `existsSync` ONLY. The plan's B4b-content specs it
"asserts content-complete (non-empty + the contract token present)." That stronger check is NOT built. The
consequence: a canon home could exist, be empty (or carry the wrong prose), and the audit still passes — the
contract token is silently lost, exactly the close-class lie the whole migration is built to kill.

**And the audit FAILS at HEAD:** `auditCanonHomes()` reports `component:instrument-chassis` →
`src/components/custom/instrument-chassis/README.md` ABSENT. The `CANON_HOMES` map references a per-component
README that was never authored. The ~18 hard readers each assert a DISTINCT contract token; the `CANON_HOMES`
map has 14 keys, several of which (surface-axis's `<Toast surface=>`, dropdown-fix's `.scroll-gutter-stable`,
on-glass-fg's MIGRATION.md half, readme-meta-clean's phantom-composable check) have **no obvious topic key yet** —
they are deferred to "add a topic = one line" at B5c. So the redistribution fidelity is enforced ONLY by each
gate's own re-pointed assertion firing at B5c — there is no holistic "every asserted token has a home that
contains it" check.

**Evidence the redistribution is partially-but-unevenly done:** handmark's README DOES already carry the
"three-register fence" token (75L, redistributed early) AND CLAUDE.md still carries it (dual-present, fine — the
README is the new home, B4f deletes the CLAUDE copy later). But the cross-cutting `docs/canon/*.md` are still
600–2500-byte SKELETON stubs — the bulk contract prose (glass-system, motion-system, conventions, …) is NOT
copied. So B4b-content is ~15% done (4 of 5 referenced component READMEs + the design extraction), ~85% owed.

**Amend:** (1) author the instrument-chassis README + the ~28 missing per-component READMEs the plan names;
(2) upgrade `auditCanonHomes()` to the specced non-empty + contract-token-present check BEFORE B5c re-points any
gate; (3) the B5c discipline must be "re-point, never weaken a gate assertion" — a weakened assertion is how a
contract token vanishes through the existence-only floor.

### 3c. The fail-explicit design is GOOD (keep)

`readCanon`/`readDesign` THROW ENOENT in strict mode — a re-homed gate REDs loud on a vanished doc, never passes
silently. This is the correct floor and directly answers the "deleting CLAUDE.md is a silent loss" fence. It does
not, by itself, guarantee CONTENT fidelity (3b) — but it guarantees the home EXISTS, which is the harder half of
the silent-loss class. Keep the seam exactly as designed.

---

## 4. SEQUENCING COHERENCE FOR THE JOINT 5.0.0 CUT

The DAG is acyclic (plan §3) and the `[C]` vs `[WSn]` vs `[WS12]` partition is correct: the [C] band genuinely did
not touch BG's write-set (verified — the band landed concurrently and BG's WS1/WS3 work is intact). But the
restructure's CENTER OF MASS is `[WS12]`, which is a coherence concern in itself:

- **B2.1-swap, B2.2, B2.3, B2.6, B4b-content, B5b, B5c, B4f, B7 — all `[WS12]`.** The entire export reshape +
  subpaths-delete + /api-fold + flat-barrel relocate + styles-colocation + the gate-manifest extract + the
  gate-rehome + the CLAUDE delete + the consumer asks STACK after the full ~110-wave BG build AND the WS12
  coherence capstone (the 480-capture dual-engine both-modes verdict — the single biggest paint risk).
- **The post-WS12 re-baseline is gate-FORCED but human-in-the-loop** (plan §5-#1): the 203-row /api map + the
  fail-closed classification + the `subpath-enumeration` baseline are 4.2.0 snapshots; the 5.0.0 surface (WS5 viz
  deletes/renames + WS6 +2 siri) can only be derived post-WS12. The fail-closed gate FORCES classification of each
  BG-added dir but CANNOT pre-judge PUBLISH-vs-INTERNAL for a novel dir — a human call. Mechanical re-run is
  specced (re-run regen + api-migration, classify, re-pin, re-emit ci.yml) but it is a sequence of careful steps at
  the most compressed moment.
- **B4f's strict chain** (B4b-content → B5c → B4f, plus {B2.6, B4e} → B4f for the dual-doc readers) means the
  CLAUDE delete cannot start until the prose is copied AND ~18 gates re-pointed AND the styles/MIGRATION moves
  done. Any slip in B4b-content (3b) stalls the whole tail.

**Must-not-skip ordering (the binding edges):**
1. `WS2 → B4c-extraction` (DOCK_SPRING rewrite `0.32/0.7`→`0.68/0.64`; extract AFTER or BH ships the stale value).
2. `WS5/WS6 landed → B2.1-swap regen re-baseline` (capture viz deletes + siri adds; never the 4.2.0 snapshot).
3. `B2.2 (/api drop) → B7 asks issue` (the asks need the final export diff).
4. `B4b-content (all ~18 tokens homed + auditCanonHomes content-check green) → B5c (re-point readers) → B4f (delete)`.
5. `B5c re-emit ci.yml + proof:gen-ci-fresh GREEN` BEFORE the cut (a drifted generated ci.yml refuses to publish).
6. `--run full siblings-absent close battery GREEN` (the WS3 ladder/shell/dead-token reds from the sibling
   research MUST clear first — they block the tag regardless of BH).

---

## 5. PENDING-BULK TRIAGE (keep / amend / restart for the BH restructure)

**No RESTART candidates.** The export-reshape mechanism (single-source policy + fail-closed regen + EXACT_REPRODUCTION)
is proven, the consumer break is grepped-minimal, the doc-migration is fail-explicit. The specs are sound.

| BH item | Status | Disposition | Why |
|---------|--------|-------------|-----|
| B0 / B1 / B2.0 / B2.1-mech / B4c-files / B6 | landed | **keep-verified** | gates GREEN, disk-verified, mechanism proven |
| B2.4a carves | landed (1 sub-item open) | **amend** | `useBloomUp.ts` audit-relocate undecided; finish or record single-consumer keep |
| B4b-skeleton seams | landed | **half-baked** | `auditCanonHomes()` existence-only + RED (instrument-chassis); upgrade to content-check, author the missing home |
| B2.1-swap (subpaths-delete) | `[WS12]` unbuilt | **keep spec; amend** | re-baseline regen post-WS12; RE-AUTHOR `flatten-subpath-types.mjs` (present, owed) for the colocated dts emit |
| B2.2 (/api-fold) | `[WS12]` unbuilt | **keep-verified spec** | roster grepped + gated; the 3 orphan re-homes + the `./api` TYPES_OVERRIDE manual removal (§5-#4) are named |
| B2.3 (flat-barrel relocate) | `[WS12]` unbuilt | **keep spec** | key-preserving, source-only |
| B4b-content (prose copy) | `[WS12]` ~15% done | **amend** | enumerate each of the ~18 asserted tokens → its home; author ~28 missing READMEs; gate on the content-check |
| B5c (gate-rehome) | `[WS12]` unbuilt | **amend** | re-census 16→~18 hard readers; cross-reference against the B2 deletion set (accent-tone reads `src/subpaths/selectable-chip.ts` — re-point BOTH arms) |
| B4f (CLAUDE delete) | `[WS12]` absolute-last | **keep spec; amend the precondition** | the precondition fence must verify ALL hard readers re-homed (rg=0) AND every asserted token present in its new home, not just file-gone |
| B7 asks | authored + gated | **keep-verified** | `proof:crossrepo-asks` GREEN, 2-ask roster proven |

**Two AMENDs the landed evidence forces (process, not spec):**
1. **Re-census the CLAUDE-readers to the exact ~18 and enumerate each reader's asserted contract token + target
   home.** The plan's "16" is stale by 2; B4f's safety depends on the exact set.
2. **Make `auditCanonHomes()` content-real before B5c.** Existence-only + the RED instrument-chassis home means a
   migration can currently pass with empty/wrong homes. The plan SPECS the stronger check — it just isn't built.

---

## 6. RISKS AT THE 5.0.0 CUT (BH-restructure lens)

1. **Reader-census undercount → B4f ENOENT break.** Plan "16" vs disk ~18 hard readers. A missed reader breaks the
   close battery AFTER CLAUDE.md is irreversibly deleted (B4f is absolute-last). The B4f gate text (`rg=0`) is
   correct; the planning count feeding B5c is not.
2. **Existence-only redistribution check → silent contract loss.** `auditCanonHomes()` passes on empty homes; the
   per-gate assertion is the only real fidelity floor, and it relies on "re-point, never weaken." `auditCanonHomes`
   is RED at HEAD (instrument-chassis) — the skeleton shipped a dangling map reference.
3. **The whole restructure is a post-WS12 serialized tail** stacked on the biggest BG paint risk (the 480-capture
   capstone). The cut is one long pole; a slip in B4b-content stalls B5c → B4f.
4. **Cross-ownership seam (BG-WS5 viz-subpath migration).** If WS5 drops `/constellation` or `/fourier-field` and
   does not carry the slides ask, a real consumer break slips between BH-B7 and BG-WS5. Confirm at re-baseline.
5. **Post-WS12 re-baseline needs a human PUBLISH-vs-INTERNAL call** for any novel WS5/WS6 dir the fail-closed gate
   surfaces. Mechanical re-run is specced but the classification is a judgement at the compressed moment.
6. **The god-module ratchet drift interacts with BH.** 16 grandfathered + 2 live WS3 violations (ladder 527,
   shell 510). `src/api/index.ts` (505) self-resolves at the B2.2 fold-delete, but the BH carve-ownership count
   ("BG 8, BH 3") needs re-validation against the 18-file over-bound reality before the cut, not silent carry.
7. **`flatten-subpath-types.mjs` re-author is owed** (present today, but written for the pre-delete subpaths layout)
   — a B2.1-swap residual that, if skipped, drops the colocated dts emit and reds `verify-export-types`.

---

## 7. EVIDENCE INDEX (commands run, all read-only)

- `verify-siblings-intact --quiet` exit 0 (before + after).
- `package.json` exports = 96 keys, `./api` present (the only intentional 5.0.0 drop).
- `proof:subpath-classify` PASS: C1 exit 0 EXACT_REPRODUCTION=true failClosed=true fidelityFailed=0; C2/C3 exit 1.
- `proof:crossrepo-asks` GREEN (2-ask roster + 5 self-test bites fire).
- `proof:no-god-module` FAIL: ladder.css 527, shell.css 510 (WS3 reds — block the tag); 16 grandfathered incl.
  `src/api/index.ts` 505 (self-resolves at B2.2).
- `src/subpaths/*.ts` = 79 (delete owed B2.1-swap); `src/api/{index,types-extra}.ts` present (fold owed B2.2);
  10 flat `src/*.ts` barrels present (relocate owed B2.3).
- `docs/canon/` 10 files (skeleton stubs 604–2555B + generated structure.md); `docs/design/` 4 files real content.
- `scripts/lib/{canon-doc,design-docs,subpath-policy}.mjs` present; `scripts/regen-exports.mjs` +
  `scripts/flatten-subpath-types.mjs` present.
- CLAUDE.md 941L/318KB present; **27 proof scripts reference it (~18 hard readers + 9 comment mentions)** — plan
  says "16."
- `auditCanonHomes()` = **1 absent home** (`component:instrument-chassis`); `auditDesignHomes()` = NONE absent.
- B2.4a carves on disk: `useCarouselWorm.ts`, `usePagerWorm.ts` PRESENT; `useBloomUp.ts` still in
  `composables/motion/` (relocate undecided).
