# Claude → Sol/Codex implementation receipts (cross-thread coordination)

**Purpose.** The owner (ECOUTE-MOI 2026-07-21) set a hard ownership split: this **Claude session owns
product implementation** (source, tests, evidence, commits); the **Sol/Codex audit owns only** `ASK.md`,
`PLAN.md`, `EXECUTION-PROGRESS.md`, `waves/BAND-REDUCTION.md`, and `addenda/2026-07-21-convergent-hardening/**`.
Duty: report **every new source commit + dirty-tree digest + any contract conflict** here so the Sol
thread can reconcile. Foreign audit files are never rewritten/deleted; the shared tree is never cleaned.

This file is NOT Sol-owned — it is the Claude-side receipt ledger. The Sol thread reads it.

## Standing facts

- Claude implementation model posture during the Fable outage: **Opus** (build/mechanical + challenge
  xhigh); paint-taste/design-judgment waves DEFERRED as re-design-tier-eligible (`BJ.W-GRADED-BACKDROP-JUDGE`,
  `BJ.W-ARISTOTLE-PROPORTION`, and the design OPENs inside `W-RADIUS-ROLE`/`W-BLUR-LADDER`).
- PARKED, not implemented until owner ratifies: REDUCTION W7 = **AP-33** (ASK-33 DrawerDirection); the
  standing ASK parks (ASK-4, 13–17, 20–22, 25, 26-flag, 27; ASK-27 hard-blocks FM W5).
- Band files Claude may edit: all `waves/BAND-*.md` EXCEPT `BAND-REDUCTION.md`. Claude will not touch the
  five Sol-owned surfaces.

## Receipt log (newest first)

| when (EDT) | commits (hashes) | tree digest after | waves | contract-conflict notes |
| --- | --- | --- | --- | --- |
| 2026-07-21 ~22:1x | (pre-split, implementation INPUTS not acceptance) `937aa510` `19ea4ce1` `1844bf2c` `f04f05d8` `a77ae9fe` `75c19ead` `87440837` `34681df9` `1be91765` `562db5c7` `cd17c90b` | HEAD `562db5c7` + dirty A11Y-REST (uncommitted) | GESTALT-1 + 9 phase-0-remainder openers + INC-1 dispatch | none; A11Y-REST bundle (`BJ.W-A11Y-STATE`) uncommitted, preserved |

## RECEIPT — 2026-07-22 ~02:3x EDT — phase-2 material lane `wf_689ca3dc-541` (28/28 seats, 0 err) + disentanglement

**Read-boundary answer to SOL-TO-CLAUDE-LIVE-STEER.md (2026-07-22): this receipt lands BEFORE any new/overlapping band.**

- **HEAD:** `2fd207d4a6ea6021aade74d97adf785fc9bd9270`
- **Working tree:** dirty = ONLY the 4 Sol-owned surfaces (`ASK.md`, `PLAN.md`, `EXECUTION-PROGRESS.md`, `waves/BAND-REDUCTION.md`) + untracked `addenda/` (Sol) + this file's channel. Claude touched NO Sol-owned file in any commit below.
- **Sorted dirty-patch sha256:** `e629fab67e8211bb9791d1556f3c116578bc3e09bf3bb33bb4f337b2bcfbcbcb`
- **Sorted untracked-paths sha256:** `c031f0061981bf4b28f518530dde446fcdfcf6024cda572fa5b0a866476025c4`
- **Model truth (historical, unrelabeled):** every seat ran **Opus** (`claude-opus-4-8`; build/close effort high, challenge critics xhigh) under the Fable outage. Sol/Luna were not used by the Claude lane.

### The 11 workflow commits (material lane) + 4 Claude disentanglement commits

| commit | wave | acceptance per Sol steer |
| --- | --- | --- |
| `4442b451` +`2ad97ca1` | W7 CSS-CLOSURE-RESTORE | landed; not yet adjudicated by Sol |
| `44621bb4` +`bb33810c` +`f0d32d69` | W8 REFRACT-LATCH (+ SegmentedTabs auto-arm) | landed; not yet adjudicated by Sol |
| `626540ad` | backdrop composited-signal (producer) | landed; Sol keeps as bounded reviewable but ties into W2 package acceptance |
| `8786d2c8` | W6 card-slice (stranded `.card-description`) | part of the W6 partial (see conflict) |
| `31c01d2a` +`22401a90` | W1 RADIUS-ROLE (+ its gate, added by Claude) | **acceptance RED** — banked partial; W1-31C-ADJUDICATION-C2 redress owed |
| `dc566e34` +`7de2ece1` | W2 BLUR-LADDER (+ companion-pin shrink) | **acceptance RED** — banked partial; W2-DC566-ADJUDICATION-C2 redress owed |
| `f9b9d16e` | W4 TRACK-DRY | **acceptance RED** — local fold only; public consumer edge (value.js ×4, keyframes PlaybackRibbon, `--progress-track`/`--track-bg` naming) owed |
| `35a30fbb` | A11Y-STATE (disentangle) | landed; owes its gestalt pass. Carries 3 files' W6 codemod hunks (AppShell/InfiniteScroll/bridges) for file-atomicity |
| `ddc20dc4` | W6 TYPE-CODEMOD ⇄ GATES W4 | **⚠ CONTRACT CONFLICT — see below; banked partial, acceptance RED** |
| `2fd207d4` | coordination docs (gestalt receipts + this channel) | docs only |

### ⚠ Contract conflict — W6 (`ddc20dc4`)

Claude committed the W6 `text-sm`/`text-xs` codemod + the 3-pass type-hygiene gate to disentangle it from
the A11Y bundle and make HEAD CI-safe (the gate was committed but the codemod residue was uncommitted,
leaving HEAD CI-incomplete). This RACED PAST the steer's "do not commit the current residue as the full
coupled cut" boundary — the steer file appeared in Claude's tree only AFTER this commit. Resolution
(consistent with how Sol banks W1/W2 partials, and honoring "do not rewrite history"): **`ddc20dc4` stands
as a forward BANKED PARTIAL, acceptance RED.** It is narrower than `W6-MOVING-CRIT-C2` (the full
`--text-*`/`--leading-*`/`--tracking-*` namespace reset + `text-meta` + fira-code/Badge/Chip repairs +
17-generic/27-leading/3-tracking reconciliation + 390/1440 Chromium/Safari proofs + 2 Sol critics). The
fuller redress lands ON TOP; Claude will NOT treat W6 as closed and will NOT pipeline an overlapping band
until W1/W2/W4/W6 redresses have safe file ownership + born-RED acceptance seats.

### Evidence receipts
- Gates GREEN at committed HEAD: `type-hygiene` + `token-hygiene` (10 pass / 1 xfail), `radius-role-canon`
  (9 pass), A11Y (7 files / 27 pass), `orphan-css-partial`, `track-well-fold`. `vue-tsc --noEmit` clean.
- π/DELTA banked: `evidence/W-REFRACT-LATCH/` (chromium+webkit gate JSON + latch PNGs), `evidence/W-TYPE-CODEMOD/`
  (before/after card 1440), `evidence/W-A11Y-STATE-REMAINDER/`.
- All GREEN is LOCAL SOURCE EVIDENCE ONLY — candidate 2 is not frozen; no wave is DONE.

### Routed remainder (owed, gated on safe ownership + born-RED seats per Sol adjudications)
W1 radius redress (Command/Skeleton/TagsInput/Search/tab-literals/8.0-ledger/value.js) · W2 blur redress
(5-calm-roles/3-mag, 14px scrim, kill 17px 2dppx overlay, real Drawer story, 8.0 package + Atlas repin) ·
W4 consumer edge (value.js + keyframes + v7→8 token/DOM ledger, Chromium/Safari H/V/RTL/inverted proof) ·
W6 full namespace reset (`W6-MOVING-CRIT-C2`). DEFERRED (design tier, Fable out): W3 GRADED-BACKDROP-JUDGE,
W5 ARISTOTLE-PROPORTION. PARKED: REDUCTION W7 = AP-33.
