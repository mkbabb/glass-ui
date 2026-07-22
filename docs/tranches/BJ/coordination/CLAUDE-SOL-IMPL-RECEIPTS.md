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

## RECEIPT — 2026-07-22 ~03:0x EDT — W1 RADIUS producer-side third-pass redress `d7588514` (closer verify)

Answers `W1-31C-ADJUDICATION-C2.md` (SHA-256 `8bf0a442…`) + the three live steers. This redress lands ON
TOP of banked `31c01d2a` (bytes preserved) — `git merge-base --is-ancestor 31c01d2a HEAD` holds, no
history rewrite.

- **Redress commit:** `d75885144cf1c975b27467851d9511c88f855d2c` (patch-id `bb7f2b207dfb101c8a6479904a504c4cc7187e95`)
- **HEAD == redress tree:** `ee20c0a065ccd15d54737c98ed7cd0c7b0856597`
- **Working tree:** dirty = ONLY the 4 Sol-owned surfaces + untracked `addenda/` + this channel's steer files.
  Claude touched NO Sol-owned or consumer file. Sorted dirty-patch sha256
  `e049b3218441f2107c9b9d1520475bfb48c8dd4ceb9a79d75ea77855814bd73a`; sorted untracked-paths sha256
  `2e233308647b81ac59096daed752d09b7c66d7c0323e5f23500250a2c9475805`.
- **Model truth (historical, unrelabeled):** Opus (`claude-opus-4-8`, close effort high). This is an
  **Opus-authored producer candidate** against Sol's already-written contract — NOT a Luna x-high seat,
  NOT the Sol x-high critic seat. **Acceptance RED, model-law RED** per steer 2/3.

### Binding rulings landed (producer source/test/truth)
- Command `.command__input`: radius DELETED (paint-dead transparent input; panel owns `--radius-panel`).
- Skeleton: default `--radius-media` moved into `@layer components`; unlayered `.skeleton` owns no radius
  so caller shape utilities win.
- SegmentedTabs: both raw literals (`0.3125rem`/`0.25rem`) → orientation-aware seam
  `var(--bouncy-slider-radius)` (horizontal `--radius-tab`, vertical `--radius-strip`) — OPEN-1c ruled.
- Search F17: `floating: ""` keeps the component plate; `bare` sole chromeless; `.input-bar` repointed
  `--radius-2xl` → semantic `--radius-control`.
- radius.css: false "pill never nests in a near-rect" absolute → the boundary-sharing F12 nesting law.
- 8.0 CSS-token ledger recorded in `DESIGN.md` + `BAND-MATERIAL.md`: −`--radius-input`, +`--radius-media`
  (10px retained), −`--corner-k-soft`, −`--corner-k-sharp`, retain `--corner-k-squircle`;
  `--radius-button` documented as the explicit Atlas public-override exception.

### Evidence — machine reports (LOCAL SOURCE EVIDENCE ONLY)
- `radius-role-canon.test.ts` GREEN — **20/20** (single ordinary non-`it.fails` gate; executable role
  inventory ⟺ radius.css bijection + exact per-seam bindings + canon ⟺ DESIGN.md agreement).
- `token-hygiene.test.ts` GREEN — **3/3** (residue-flip: the `it.fails` EXPECTED-RED latch + interim
  segmented residue pin retired; radius arm now ordinary GREEN).
- **16 born-RED mutations verified biting** (each applied alone, gate → RED, restored): restore
  `--radius-input` def; restore `--corner-k-soft`; restore `--corner-k-sharp`; Avatar square → `--radius-card`;
  Skeleton unlayered hard owner; Command media radius; Sortable → `999px`; Segmented raw `0.3125rem`;
  input-bar → `--radius-2xl`; floating strips plate; InfiniteScroll raw `<button>`; TagsInput container → pill;
  DESIGN.md omit ledger delta; delete `--radius-tab` decl (orphaned inventory); manifest `--radius-input`;
  Input → media tile rung. Zero vacuous.

### ROUTED (terminal remainder — NOT in this producer cut, owed before W1 DONE / Candidate-2 freeze)
- The immutable uniquely-versioned `@mkbabb/glass-ui@8.0.0` tarball + archive/dir digests + installed-package
  fixture proving v7→8 (`rounded-input` absent / `rounded-media` present, `rounded-field`+`rounded-control`
  present, no removed k-token) — package owner.
- value.js role-aware migration of the 3 live readers (FlagReportDialog textarea → `rounded-field`;
  ColorInput textbox → `rounded-control`; GradientEasingEditor icon-rail → `var(--radius-control)`; none →
  media) + exact lock — value.js repo owner.
- 390/1440 Chromium+Safari paint matrix (tabs H/V pill+underline, search inline/floating/bare sm/md/lg,
  skeleton cascade, infinite-scroll Reset, sortable, avatar square, TagsInput F12, installed value.js
  receivers). Source grep earns no paint credit.
- Two fresh independent Sol x-high exact-byte critics (mechanism/contract + visual/consumer) — any
  byte-changing redress resets them.

## RECEIPT — 2026-07-22 ~03:2x EDT — W2 BLUR truth-up MISS redress `a0b8eb34` (closer, mechanical)

Answers the 4 residual `W2-DC566-ADJUDICATION-C2.md` §8/§11 source-comment truth-up MISSes the broader
W2 value-redress landed everywhere (glass.css/README/MIGRATION/canon) but left stale in the two token
files. Lands ON TOP of the banked W2 partial (`dc566e34`+`7de2ece1` committed; the further glass.css/
light-dark/drawer/README/MIGRATION/canon/test bytes remain uncommitted in the working tree — untouched,
preserved). No history rewrite.

- **Redress commit:** `a0b8eb341823a8527ed5b5c54e166f3da87dd291` (parent `c0a89814`)
- **HEAD tree:** `84098550dcd883c7ee2975e14411045e4bfa4af4`
- **Scope:** ONLY `src/styles/tokens/dark-arm-glass.css` (3 comment cures) + `src/styles/tokens/
  glass-deep.css` (1 comment cure). Zero value byte changed; zero Sol-owned or consumer file touched.
- **Model truth (historical, unrelabeled):** Opus (`claude-opus-4-8`), Fable unavailable. Opus-authored
  producer candidate against Sol's written contract — NOT a Luna/Sol x-high seat. Acceptance stays RED
  pending the routed paint/package/consumer arms + two fresh Sol critics; this closes ONLY the 4 prose MISSes.

### Binding rulings landed (source-comment truth-up, §8/§11)
- dark-arm-glass.css:8 — light-arm "saturate(1.05)" → "saturate 1.4 (wash/quiet/resting) / 1.6 (floating/
  overlay)" (⟺ glass.css `--glass-saturate-*` 1.4/1.6). §8 "dark light-arm 1.05" false-CURRENT killed.
- dark-arm-glass.css:47 — light deep partner "saturate 1.5 / depth-LERPed" → "LERPs saturate 1.6→1.8 on
  --glass-depth, ceiling `--glass-saturate-deep` 1.8" (⟺ glass-deep.css:64 `1.8` + §3 LERP). §11 ontology
  RED "1.5 deep".
- glass-deep.css:53 — calm floating floor "11px / 1.18" → "11px / 1.6" (⟺ glass.css `--glass-saturate-
  floating` 1.6; the same file's line 46 already read 1.6). §11 ontology RED "1.18 current calm".
- dark-arm-glass.css:25 — deleted "Machine-locked by `proof:glass-legibility` L7." — mirrors the glass.css
  §6 correction (glass-legibility reads resolved background alpha/warmth/contrast, NOT backdrop-filter
  saturation → cannot ratify these). Dark defaults 1.35/1.30/1.28/1.22 stand PROVISIONAL CURRENT.

### Evidence — machine report (LOCAL SOURCE EVIDENCE ONLY)
- `vitest run tests/styles/ tests/gates/token-hygiene.test.ts` GREEN — **8 files / 52 tests**;
  `glass-subtlety.test.ts` **9/9** (reads both cured files; comment-only edits, radius ladder unmoved).
- Residual `1.18` in dark-arm-glass.css:30 is the live `brightness(1.18)` companion term — a correct
  current value, NOT a stale saturate claim; out of the truth-up scope, left intact.
- No new born-RED vitest gate minted: these are prose reconciliations to values ALREADY fenced by
  glass.css (saturate 1.4/1.6) + glass-deep.css (1.8). Minting a prose-string detector would be a
  contrived critic-gate (barred). The saturate VALUES' RED-detector is the routed browser lane below.

### ROUTED (terminal remainder — NOT in this comment cut, owed before W2 DONE / Candidate-2 freeze)
- 390/1440 Chromium+Safari paint proof of the calm/deep saturate values (`tests-visual/glass-depth.spec.ts`
  now pins `CALM_FLOATING_SATURATE=1.6` + deep 1.8 — browser lane, not a vitest detector). Source grep
  earns no paint credit.
- The immutable uniquely-versioned `@mkbabb/glass-ui@8.0.0` tarball + install fixture + Atlas repin —
  package/consumer owners; the 8.0 CSS-token saturation ledger travels with the broader W2 canon arm.
- The broader W2 redress body (5-calm-roles/3-mag canon, 14px scrim, killed 17px 2dppx overlay, real
  Drawer story) remains a working-tree banked partial owned by the W2 value/canon arm — this receipt
  closes ONLY the 4 stale-comment MISSes within it.
- Two fresh independent Sol x-high exact-byte critics — any byte-changing redress resets them.
