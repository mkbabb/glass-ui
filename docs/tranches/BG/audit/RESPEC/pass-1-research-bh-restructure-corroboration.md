# PASS-1 RESEARCH — BH RESTRUCTURE COHERENCE (broad-triage corroboration + extension)

**Agent lens:** BH restructure coherence — the export reshape (drop `/api` + 2 sibling asks), `src/subpaths/`
delete, regen-exports (B2.1), CLAUDE.md hard-delete + doc-redistribute (→ `docs/canon` + `docs/design`), the
gate-reader rehome. Coherent, safe, reversible, correctly SEQUENCED for the joint 5.0.0 cut? What breaks consumers?
**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `b716b5be` (was `9dfe285c` at the prior BH-restructure doc)
· siblings-intact exit 0 (verified before + after).
**Method:** independent on-disk re-verification of every load-bearing claim in `pass-1-research-bh-restructure.md`
+ `RESPEC.md §B/§D`; RAN the BH gates (`subpath-classify`, `crossrepo-asks`, `no-god-module`); RAN
`auditCanonHomes()`/`auditDesignHomes()`; precise CLAUDE-reader census with read-mechanism classification;
read-only constellation grep of the live `/api` consumers; the DOCK_SPRING extraction-staleness check.
READ-ONLY; wrote only this file.

> **This file CORROBORATES the existing `pass-1-research-bh-restructure.md` and RESPEC §B/§D.** It is not a
> re-derivation — it independently re-verifies their load-bearing claims at the NEW HEAD `b716b5be` (5 commits
> later, all BG live-fixes — the BH band did NOT advance) and adds three sharper facts the prior pass under-stated.

---

## 0. BOTTOM LINE (unchanged verdict, sharper census)

The BH restructure is **architecturally coherent, the export break is genuinely tiny + grepped-not-guessed, and
the proven mechanisms are the right shape.** I independently re-confirm: ZERO restart candidates; the [C] band is
landed + sound; the reshape break is exactly ONE dropped key (`./api`) + 2 sibling asks. The three coherence
defects the prior pass flagged are REAL and re-verified at HEAD. I sharpen the headline census and surface ONE
new finding the prior pass got backwards.

**The four BH coherence facts that bite at the cut, in priority order:**

1. **The CLAUDE-delete (B4f) hazard is sharper than "16 vs 18 readers" — it is `18 literal / 16 content-assert /
   2 ENOENT-CRASHERS`.** RESPEC §B already absorbed this; I re-verify it precisely. 18 proof scripts carry both a
   `CLAUDE.md` path literal AND a `readFileSync`; of those, **2 use a RAW unguarded `readFileSync(CLAUDE_MD,
   "utf8")` that will THROW on a deleted file** (`proof-claude-structure-sync.mjs:74`, `proof-doc-consistency.mjs:197`),
   and 16 use a guarded `safeRead()`/`read() ?? ""`/`rd()` that produces a NORMAL red (assertion fails because the
   token is gone) — not a crash. **The 2 crashers are the catastrophic ones**: an unhandled throw in
   `proof:close-battery-parity`'s `--run full` union aborts the battery, not just reds one row, at the most
   irreversible moment (after CLAUDE.md is deleted). B4f's own gate text (`rg=0` for readFileSync sites) is correct;
   the load-bearing fact for execution is that the 2 crashers MUST re-home or convert-to-guarded FIRST.

2. **`auditCanonHomes()` is existence-only (not content-real) AND RED at HEAD.** Re-verified: it returns exactly
   1 absent home — `component:instrument-chassis` → `src/components/custom/instrument-chassis/README.md` ABSENT
   (the dir has `InstrumentChassis.vue` + `ChassisDivider.vue` + `index.ts`, NO README). The `CANON_HOMES` map has
   15 keys; **14 resolve, 1 dangles.** The skeleton shipped a map reference ahead of its home. And the resolver only
   does `existsSync` — the plan SPECS "non-empty + contract-token-present," which is NOT built. A canon home could
   exist, be empty/wrong, and the audit passes — the exact silent-contract-loss class the whole migration kills.

3. **The canon homes are 604–2555-byte SKELETON STUBS — B4b-content is ~15% done, ~85% owed.** The cross-cutting
   `docs/canon/*.md` (glass-system 879B, motion-system 847B, conventions 705B, dependencies 604B, design-axes 628B,
   build-and-gates 657B, consumer-wiring 726B, exports-and-subpaths 844B) are scaffolds; the bulk contract prose
   that the ~16 content-asserting gates will read is NOT copied. Component-README coverage is **22 of 50 custom
   dirs** — ~28 missing, exactly as the plan names. By contrast `docs/design/*.md` are real (9–31KB) and
   `auditDesignHomes()` = `[]` (all present). The design extraction is done; the canon redistribution is the long
   pole.

4. **The whole reshape/CLAUDE band is a post-WS12 serialized tail** stacked on the single biggest BG paint risk
   (the WS12 coherence capstone + the ~480-capture dual-engine verdict). B2.1-swap, B2.2, B2.3, B2.6, B4b-content,
   B5b, B5c, B4f, B7 all sequence `[WS12]`, with a strict `B4b-content → B5c → B4f` chain. The cut is one long pole,
   not a flush close; a slip in B4b-content stalls B5c → B4f.

**Nothing is a RESTART.** The amendments are process, not spec: (a) re-home/guard the 2 ENOENT-crashers, (b) make
`auditCanonHomes()` content-real before B5c, (c) finish the ~85% canon prose + ~28 READMEs, (d) confirm the BG-WS5
viz-subpath cross-ownership seam, (e) re-run B4c-extraction AFTER WS2 (the extracted motion-canon home is
stale-in-advance — see §5).

---

## 1. RE-VERIFIED AT THE NEW HEAD `b716b5be`

The prior BH-restructure doc was written at `9dfe285c`. HEAD is now `b716b5be`, **5 commits later — ALL BG
live-fixes** (D-1 constellation parallax-off, D-2 paper-grain warm substrate, D-3 dock size-blend, + the
DEFECT-LEDGER/EXECUTION-PROGRESS records + the re-spec Pass-1 record). **The BH [C] band did NOT advance** — every
BH disk fact the prior doc asserts holds unchanged at HEAD. No BH regression from the intervening BG fixes (they
touch viz/paper/dock src, none of the export/doc/gate surface).

| Claim (prior doc) | Re-verified at `b716b5be` | Verdict |
|---|---|---|
| 96 export keys, `./api` present | `node -e` over package.json: 96 keys, `./api` present | ✅ exact |
| `src/subpaths/*.ts` = 79 (delete owed) | `ls` = 79 | ✅ exact |
| `src/api/{index,types-extra}.ts` present (fold owed) | both present (index 32644B, types-extra 18944B) | ✅ exact |
| 10 flat `src/*.ts` barrels (relocate owed) | `ls src/*.ts` = 10 (carousel/dark/forms/index/infinite-scroll/keyboard/motion-core/motion/sidebar/tokens) | ✅ exact |
| `proof:subpath-classify` PASS | RAN: C1 exit 0 EXACT_REPRODUCTION=true failClosed=true fidelityFailed=0; C2/C3 exit 1 | ✅ proven |
| `proof:crossrepo-asks` GREEN | RAN: exit 0, 4 self-test bites fire (no-silent-drop is falsifiable) | ✅ proven |
| `docs/canon/` skeleton + `docs/design/` real | canon 10 files 604–2555B stubs; design 4 files 9–31KB | ✅ exact |
| `auditCanonHomes()` 1 absent (instrument-chassis) | RAN: exactly `[{key:"component:instrument-chassis", rel:"...README.md"}]` | ✅ exact, RED |
| `auditDesignHomes()` NONE absent | RAN: `[]` | ✅ exact |
| `flatten-subpath-types.mjs` present (re-author owed) | present (2407B, mtime 2026-06-06 — pre-restructure, written for the OLD layout) | ✅ confirmed-stale |
| 2 sibling /api asks (muster + speedtest) | read-only grep: 3 live source sites in 2 repos — see §2 | ✅ exact |

---

## 2. THE EXPORT RESHAPE — SAFE, MINIMAL, KEY-PRESERVING (keep-verified, independently grepped)

The consumer-facing break is the smallest possible, and the asks roster is GREPPED, not assumed. My independent
read-only constellation grep of `@mkbabb/glass-ui/api` (excluding `docs/`/`.md`/`.txt` prose-mentions) returns
**exactly 3 live source sites in 2 repos** — matching `coordination/asks-and-consumes.md` verbatim:

- **muster** `frontend/src/composables/useAuroraConfig.ts:47` → `DEFAULT_AURORA_CONFIG`, `AuroraConfig` → `/aurora`.
  (Note: under `frontend/`, NOT `src/` — the roster path is correct; a naïve `~/Programming/muster/src/` grep misses it.)
- **speedtest** `src/features/speedtest/ui/PhaseTimeline.vue:52` → `TimelineSegment` (type) → `/timeline`. CONFIRMED
  on disk (`import type { TimelineSegment } from "@mkbabb/glass-ui/api"`).
- **speedtest** `vite.config.mjs:1033` — the dead optimizeDeps `/api` string (folded into the same ask, drop it).

The raw grep hits 25 files, but ~22 are `docs/tranches/audits/*.md` historical prose — NOT live imports. The
roster correctly distilled this to 2 asks. `proof:crossrepo-asks` GREEN with the self-test bites firing (phantom
consumer, sibling-path, missing-disposition all FLAG). The roster ALSO explicitly flags the unowned BG-WS5
viz-subpath seam (`/constellation`, `/fourier-field`, slides consumer) — the one cross-ownership risk (see §4).

**Reversibility:** clean break (no aliases, the no-backwards-compat law) → NOT consumer-reversible, by 5.0.0-major
design intent. Internally reversible: every move is glob/codemod-driven off `subpath-policy.mjs` (the single-source,
21 exports, 10 required), so regen reproduces or reverts deterministically. EXACT_REPRODUCTION=true is the proof.

---

## 3. THE CLAUDE.md DELETE + DOC-REDISTRIBUTE — THE COHERENCE FRONTIER (re-verified, census sharpened)

### 3a. The reader census — PRECISE (the B4f fence)

`rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = **27 scripts**. Classified by read-mechanism (independent grep):

- **18 HARD readers** carry a `CLAUDE.md` path literal AND a `readFileSync`. Of these:
  - **2 ENOENT-CRASHERS (raw unguarded read):** `proof-claude-structure-sync.mjs:74` (`readFileSync(CLAUDE_MD,
    "utf8").split(...)`), `proof-doc-consistency.mjs:197` (`const claudeMd = readFileSync(CLAUDE_MD, "utf8")`).
    These THROW on a deleted file.
  - **16 GUARDED readers** use `safeRead(path)` / `read("CLAUDE.md") ?? ""` / `rd("CLAUDE.md")`: accent-tone,
    dock-unify, dropdown-fix, easing-primitive, expandable-part, handmark, on-glass-fg, phase-palette,
    readme-meta-clean, spa-view, split-chars, surface-axis, close-battery-parity, doc-override-idiom, +
    (crossrepo-asks/dock-rail-realize reference it but via guarded paths or comment). These RED gracefully (the
    asserted token is gone → assertion fails as a normal violation, no crash).
- **9 COMMENT-only mentions** (`bc-fold-ledger`, `page-chassis`, `page-hierarchy`, `peer-optional`, `scroll-trigger`,
  `spring-tokens-synced`, `storybook-meta`, `visual-runner`, `viz-configurator-suite`) — prose-only, no read. Not a
  break on delete; a staleness sweep is owed (they cite a vanished file).

**The bite, precisely:** B5c must re-home ALL 18 hard readers, but the 2 ENOENT-crashers are PRIORITY — a crash in
`--run full` aborts the close battery (worse than a red). The plan's original "16" undercounts the hard set by 2 AND
elides the crash-vs-red distinction. RESPEC §B already records "18/16/14/2-ENOENT"; this corroborates it with the
exact two file:line crashers.

### 3b. The redistribution is EXISTENCE-checked, not CONTENT-checked — and RED now (re-verified)

`auditCanonHomes()` returns 1 absent home (`component:instrument-chassis`). The map has 15 keys; 14 resolve. The
resolver does `existsSync` only — the specced "non-empty + contract-token-present" stronger check is NOT built.
Consequence: a home can exist empty/wrong and the audit passes; the per-gate re-pointed assertion at B5c is the ONLY
real fidelity floor, and it rests on the "re-point, never weaken" discipline. **The skeleton shipped a dangling map
reference** — proving the `CANON_HOMES` map is AHEAD of the homes and B4b-content has real, unbuilt work.

### 3c. B4b-content is ~15% done (~85% owed) — quantified

The canon stubs are 604–2555B scaffolds; the bulk glass-system/motion-system/conventions prose is NOT copied. Of
the 5 referenced per-component READMEs, 4 exist (dock 25KB, easing 3.7KB, handmark 4KB, spa-view 3KB) + 1 absent
(instrument-chassis). Repo-wide, 22 of 50 custom dirs have a README → ~28 missing per the plan. The design half is
done (`docs/design/*` real, 4/4 present). So the redistribution fidelity is uneven: design extracted, canon
~15% scaffolded.

### 3d. The fail-explicit design is GOOD (keep)

`readCanon`/`readDesign` THROW ENOENT in strict mode — a re-homed gate REDs loud on a vanished doc, never passes
silently. The correct floor for the silent-loss class. It guarantees the home EXISTS, not that the CONTENT is
faithful (that is 3b). Keep the seam exactly as designed.

---

## 4. SEQUENCING COHERENCE FOR THE JOINT 5.0.0 CUT (re-confirmed acyclic; one long pole)

The DAG is acyclic and the `[C]` vs `[WSn]` vs `[WS12]` partition is correct: the [C] band genuinely did not touch
BG's write-set (the 5 intervening BG fixes left every BH disk fact intact). But the restructure's center of mass is
`[WS12]`. **Must-not-skip ordering (the binding edges), re-confirmed:**

1. `WS2 → B4c-precept-extraction` — WS2 rewrites the dock spring preset; the extracted motion-canon home must
   follow or it ships a stale prose value (see §5 — the extracted home is ALREADY stale-in-advance at HEAD).
2. `WS5/WS6 landed → B2.1-swap regen re-baseline` — capture WS6's +2 siri subpaths + WS5's viz deletes/renames via
   the generator, NEVER the 4.2.0 snapshot. Gate-FORCED but human-in-the-loop (PUBLISH-vs-INTERNAL for a novel dir
   is a judgement the fail-closed gate cannot pre-make).
3. `B2.2 (/api drop) → B7 asks issue` — the asks need the final export diff.
4. `B4b-content (all content-asserting tokens homed + auditCanonHomes content-check GREEN) → B5c (re-point + GUARD/
   re-home the 2 ENOENT-crashers) → B4f (delete)`.
5. `B5c re-emit ci.yml + proof:gen-ci-fresh GREEN` BEFORE the cut (a drifted generated ci.yml refuses to publish —
   this is also R3 in RESPEC §A, a live close-red at HEAD).
6. `--run full siblings-absent close battery GREEN` — the WS3 god-module reds (R1: `ladder.css` 527, `shell.css`
   510) MUST clear first; they block the tag regardless of BH. `src/api/index.ts` 505 self-resolves at the B2.2
   fold-delete (confirmed: it is a ratchet baseline, not a live violation; the prose at proof-no-god-module.mjs:135
   names it for the carve-then-delete cadence).

**Cross-ownership seam (the un-owned risk):** BH owns the `/api`-drop asks. **BG-WS5 owns any viz-subpath
delete/rename consumer migration** (slides consumes `/constellation` + `/fourier-field`). The B7 roster FLAGS this
but does NOT own it. If WS5 drops a viz key and does not carry the slides ask, a real consumer break falls through
the seam. The post-WS12 export-delta surfaces any key drop — but only if someone diffs it. **Must-not-skip: confirm
BG-WS5 carries the viz-subpath consumer migration, or fold it into B7 at re-baseline.** (RESPEC §D open-cluster #8.)

---

## 5. NEW FINDINGS THIS PASS SHARPENS / CORRECTS

### 5a. CORRECTION — `useBloomUp.ts` is MULTI-consumer, NOT "likely single-consumer relocate"

The prior doc + the plan (B2.4a) call `useBloomUp.ts` "audit-then-relocate → likely single-consumer relocate
(AppSwitcher-only signal)." **This is BACKWARDS.** Independent grep: `useBloomUp` has **15+ consumers** — 8 demo
dock stories (dock-gallery, liquid-playground, DockExampleTile, Notification/VolumeHUD/Spotlight/AppleMusic/
AppSwitcher), `demo/layout/AppShell.vue`, `src/styles/glass/{liquid-enter,liquid-morph}.css`,
`src/api/types-extra.ts`, AND it is EXPORTED via `src/composables/motion/index.ts`. It is a published, multi-
consumer shared motion primitive. **Disposition: KEEP IN `composables/motion/` — do NOT relocate.** The "AppSwitcher-
only signal" premise is false; relocating a 15-consumer published primitive would be a churn with no benefit and a
public-surface risk. The B2.4a open sub-item resolves to a recorded KEEP, not a move.

### 5b. SHARPER — the B4c-extraction `DOCK_SPRING` staleness is a PROSE drift, not a code divergence

`src/components/custom/dock/constants.ts:85` derives `DOCK_SPRING` from `springPreset("dock")` (the SPRING_PRESETS
table) — NOT a hardcoded literal. So WS2's "0.32/0.7→0.68/0.64 rewrite" edits the spring table row, and
`DOCK_SPRING` re-resolves automatically — no code edit to constants.ts. **BUT** the extracted
`docs/design/motion-canon.md:195` hardcodes `DOCK_SPRING (0.32, 0.7)` as a DOCUMENTATION LITERAL — extracted at the
OLD value, already stale-in-advance at HEAD. Seven gates read motion-canon.md (`proof:dock-engine`,
`carousel-glass-atoms`, `design-docs-files`, `motion-one-clock`, `no-layout-animation`, `underline-tune`,
`spring-ease`). If B4c-extraction is not RE-RUN after WS2, the motion-canon home ships `(0.32, 0.7)` while the live
preset says `(0.68, 0.64)` — a contract/code divergence the migration exists to prevent. **Amend: re-run
B4c-extraction (or hand-patch the motion-canon prose value) AFTER WS2 lands the spring-table rewrite.** This makes
the `WS2 → B4c-extraction` edge load-bearing for doc-accuracy, not just freshness.

### 5c. CONFIRMED — `flatten-subpath-types.mjs` is present but STALE (re-author owed)

mtime `2026-06-06` (pre-restructure) — written for the pre-delete `src/subpaths/` layout. The B2.1-swap re-author
is owed; if skipped, the colocated dts emit drops and `verify-export-types` reds. (RESPEC §C residual #3.)

---

## 6. PENDING-BULK TRIAGE (BH restructure lens)

**No RESTART candidates** — the export-reshape mechanism (single-source policy + fail-closed regen +
EXACT_REPRODUCTION) is proven, the consumer break is grepped-minimal, the doc-migration is fail-explicit.

| BH item | Status | Disposition | Why |
|---|---|---|---|
| B0 scratch-sweep | landed | **keep-verified** | porcelain clean; the 3 tracked test-results + .browserslistrc gone (prior verified) |
| B1 payload/destraddle/snap | landed | **keep-verified** | `@lucide/vue` in libraryExternal:84 (dead `lucide-vue-next`/`vaul-vue` noted); value `^1.0.0` single-leg (no straddle) |
| B2.0 @glass-alias + codemods | landed | **keep-verified** | `proof:alias-codemod` GREEN (prior); 719 rewrites |
| B2.1-mech (fail-CLOSED regen) | landed | **keep-verified** | RAN PASS: C1 EXACT_REPRODUCTION; C2/C3 teeth bite; `subpath-policy.mjs` single-sources |
| B2.4a carves | landed (1 sub-item) | **amend → KEEP-IN-PLACE** | useCarouselWorm/usePagerWorm PRESENT; **useBloomUp is 15-consumer published — record KEEP, NOT relocate (§5a correction)** |
| B4b-skeleton | landed | **half-baked** | `auditCanonHomes()` existence-only + RED (instrument-chassis); upgrade to content-check + author the missing README |
| B4c-files (design extract) | landed | **keep-verified** | `docs/design/*` real 9–31KB; `auditDesignHomes()=[]`; **but re-run extraction after WS2 — prose value stale (§5b)** |
| B6 prompts | landed | **keep-verified** | 3 prompts + README; `proof:core-prompts` GREEN (prior) |
| B2.1-swap (subpaths-delete) | `[WS12]` unbuilt | **keep spec; amend** | re-baseline regen post-WS12; re-author the STALE `flatten-subpath-types.mjs` (§5c) |
| B2.2 (/api-fold) | `[WS12]` unbuilt | **keep-verified spec** | roster grepped + gated; 3 orphan re-homes + the `./api` TYPES_OVERRIDE manual removal named |
| B2.3 (flat-barrel relocate) | `[WS12]` unbuilt | **keep spec** | key-preserving, source-only |
| B4b-content (prose copy) | `[WS12]` ~15% done | **amend** | ~85% owed; ~28 missing READMEs; gate on the content-check |
| B5c (gate-rehome) | `[WS12]` unbuilt | **amend** | re-home 18 hard readers; PRIORITIZE the 2 ENOENT-crashers; cross-ref the B2 deletion set (accent-tone reads `src/subpaths/selectable-chip.ts`) |
| B4f (CLAUDE delete) | `[WS12]` absolute-last | **keep spec; amend precondition** | gate on `rg=0` readFileSync sites AND the 2 crashers re-homed/guarded AND every asserted token present in its new home |
| B7 asks | authored + gated | **keep-verified** | `proof:crossrepo-asks` GREEN, 2-ask roster grepped-correct, BG-WS5 seam flagged |

---

## 7. RISKS AT THE 5.0.0 CUT (BH-restructure lens)

1. **2 ENOENT-crashers → close-battery CRASH (not just red) after B4f.** `proof-claude-structure-sync.mjs:74` +
   `proof-doc-consistency.mjs:197` use raw `readFileSync` — they THROW on a deleted CLAUDE.md, and a throw in the
   `--run full` union can abort the battery at the irreversible moment. Re-home/guard these FIRST.
2. **Existence-only redistribution check → silent contract loss.** `auditCanonHomes()` passes on empty homes; RED at
   HEAD (instrument-chassis dangling map ref); the per-gate assertion is the only real fidelity floor and rests on
   "re-point, never weaken." Make the check content-real before B5c.
3. **The whole restructure is a post-WS12 serialized tail** stacked on the biggest BG paint risk (the ~480-capture
   capstone). One long pole; a slip in B4b-content (~85% owed) stalls B5c → B4f.
4. **Cross-ownership seam (BG-WS5 viz-subpath migration).** If WS5 drops `/constellation` or `/fourier-field` and
   does not carry the slides ask, a real consumer break slips between BH-B7 and BG-WS5. Confirm at re-baseline.
5. **Post-WS12 re-baseline needs a human PUBLISH-vs-INTERNAL call** for any novel WS5/WS6 dir the fail-closed gate
   surfaces. Mechanical re-run is specced; the classification is judgement at the compressed moment.
6. **DOCK_SPRING prose drift in motion-canon.md** (§5b) — extracted at the old `(0.32, 0.7)`; 7 gates read it; re-run
   B4c-extraction after WS2 or ship a contract/code divergence.
7. **`flatten-subpath-types.mjs` re-author owed** (stale, mtime 2026-06-06) — skipping it drops the colocated dts
   emit and reds `verify-export-types`.
8. **god-module ratchet drift interacts with BH.** 14 grandfathered baselines + 2 live WS3 violations (ladder 527,
   shell 510 — `proof:no-god-module` reports FAIL but exits 0, so it is a doctrine-not-live gate keyed on
   `violations.length`). `src/api/index.ts` 505 self-resolves at B2.2. The CLAUDE-prose `RATCHET=={}` is a
   doc-drift — BH migration must read the LIVE 14, NEVER copy `=={}`.

---

## 8. EVIDENCE INDEX (commands run, all read-only)

- `verify-siblings-intact --quiet` exit 0 (before + after).
- `git log 9dfe285c..HEAD` = 5 commits, ALL BG live-fixes (D-1/D-2/D-3 + re-spec records); BH band unchanged.
- `package.json` exports = 96 keys, `./api` present.
- `proof:subpath-classify` RAN PASS: C1 exit 0 EXACT_REPRODUCTION=true failClosed=true fidelityFailed=0; C2/C3 exit 1.
  policy module exports = 21 (10 required).
- `proof:crossrepo-asks` RAN GREEN; 4 self-test bites fire.
- `proof:no-god-module` RAN FAIL (exit 0): ladder.css 527, shell.css 510 live; 14 baselines incl. api/index.ts 505.
- `auditCanonHomes()` = 1 absent (`component:instrument-chassis`); 14 of 15 keys resolve; stubs 604–2555B.
- `auditDesignHomes()` = `[]`; `docs/design/*` = 4 files 9–31KB real content.
- CLAUDE-reader census: 27 scripts mention; 18 hard (2 raw-readFileSync ENOENT-crashers + 16 guarded); 9 comment-only.
- Live `/api` source consumers: 3 sites in 2 repos (muster `frontend/.../useAuroraConfig.ts:47`, speedtest
  `PhaseTimeline.vue:52` + `vite.config.mjs:1033`) — matches the roster exactly.
- `useBloomUp` consumers: 15+ (8 demo dock stories + AppShell + 2 css + api/types-extra + motion/index export) —
  CORRECTS the "single-consumer relocate" premise.
- `DOCK_SPRING` = `springPreset("dock")` derived (constants.ts:85); motion-canon.md:195 hardcodes `(0.32, 0.7)`
  prose (stale-in-advance).
- `flatten-subpath-types.mjs` present (2407B, mtime 2026-06-06, written for pre-delete layout — re-author owed).
- 22 of 50 custom dirs have a README (~28 missing).
