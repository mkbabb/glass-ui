# W-B.4 · Owner glances: one paired capture per conflicting ask, a seat default, the owner's word recorded · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree; docs-only since `f3ad78d0` |
| ships in | 11.0.0 (records; each default is built by its named wave) |
| families | F-15 whole (`audit/REGISTRY.md:342-352`) |
| depends on | W-B.1 (the owner docket), W-A.1 (the capture harness and the one scratch root) |
| dependants | W-I.1 (rim), W-E.4 (overlay cast), W-E.10 (aurora per page, header scale), W-L.1 (`useConfirm`), W-E.7 (coarse hit floor), W-H.1 (slider value mark), W-J.2 (slider engagement) |

## 1 · What it closes

| id | the two asks in conflict, or the words and the divergence | seat default (the wave's terminal unless the owner rules otherwise) |
|---|---|---|
| L05b-15, N-7, O-55 R-2 | AY B.5 "must NOT be baked into the dock" against N-7 "the progress bar … integrated into the bottom of the dock" | BUILD in W-I.1 as an **opt-in plate seat**: never baked into every dock (AY B.5, which concerned the slides deck bar), present when a consumer asks (N-7, the newer words) |
| UIA-KF-069, UIA-F-138, UIA-V-200, -349, -367, -660 | the cartoon register (D-3; `tokens/shadow.css:84-90`, `--shadow-cartoon-lg` three hard offsets) against the consumers' "cluttered" under the owner's own order | KEEP the under-stamp on cards and panes (D-3). The overlay's stack is a defect: `overlay-plate.css:316-318` stacks rim, vivid under-shadow, floating shadow **and** the cartoon under-stamp, which UIA-F-138 reads as a doubled slab. One cast per floating plate: FOLD → W-E.4 |
| R2-06-08 | "a different custom aurora per page" shipped as one background per category (8 of 11 paper or grid); "header text 2× smaller" never executed (`demo/stories/manifest.ts:317-325`) | BUILD both in W-E.10: per-page aurora presets in the demo (the demo is the library's own consumer, E-5), and the header rung one step down the √φ ladder per the owner's factor |
| O-74 §4 (A2-VA-L1-6, A2-FO-L1-9) | the no-`Confirm*` rule (`dialog/DialogContent.vue:21-28`) against "not duplicating any component … fixed at the glass-ui root" (six sites in three apps) | BUILD `useConfirm()` in W-L.1: an imperative promise over the existing Dialog at `dismissal="deliberate"` with a `tone="destructive"` action. No `Confirm*` component symbol is minted, so the rule's reason holds and the duplication goes |
| O-74 §9 (A2-FO-L2-7) | `--slider-touch-target: 1.5rem` (24 px, WCAG 2.5.8, `tokens/sizing.css:290`) against the owner's hit floor ≥ 44 px (O-74 erratum E-2) | FOLD → W-E.7: 44 px coarse **hit** area by slop, the painted track unchanged; the roster's G-23 (COARSE-TARGET-COMPUTED, owed to W-E.7) is the gate |
| L05b-21 | the owner's "rounded knob"; the scrubber paints no visible thumb | FOLD → W-H.1: the value mark in both slider variants is a visible rounded thumb at rest |
| L05a-16 | A01's mobile modal expansion for the slider; HEAD has `SliderVariant = "scrubber" \| "spectrum"` and an engage deform with a loupe | FOLD → W-J.2 (the engaged rung owns what a slider does under the finger) |
| L05a-21 | charter "no Fable seat" against the design loop's Fable routing | ANSWERED by the owner: `CHARTER.md:3-5` ("Use Opus 5.5 for all work hereof, too. Fable is to not be used quite yet."). No glance |

## 2 · The defect at HEAD

- None of the seven glance rows has an owner ruling in BK or BL records, and none has a capture on disk: `test -f docs/tranches/BL/ledger/GLANCES.md` exits 1. `CENSUS.md` §4 OW-7 lists three of them; the other four (O-74 §4, §9, L05b-21, L05a-16) come from the round-8 map (`INBOUND-MAP.md:660,693-694,711`) and round 1.
- The overlay stack of four shadows is in source at `src/styles/glass/overlay-plate.css:316-318` (`var(--glass-material-rim), var(--glass-under-shadow-vivid), var(--glass-shadow-floating), var(--shadow-cartoon-lg)`).

## 3 · The cure

1. For each row, one capture set under `.cache/visual/glances/<row>/`: the surface at 1440 and 390, light and dark, Chromium, with the asks' two readings side by side where the default changes paint (rim: a dock with and without the seat, from D2's pass-2 harness; cast: an open Select listbox with four and with one shadow; aurora: three pages; confirm: the Dialog at `deliberate`; slider: the 24 px and 44 px coarse hit areas outlined; knob: scrubber with and without a thumb). Screenshots plus the paired π readout (the computed box-shadow list, hit-rect sizes, hero font size).
2. `docs/tranches/BL/ledger/GLANCES.md`: one row per glance: the two owner quotes with their sources, the seat default above, the capture paths and sha256, and the owner's verdict with its date, or `pending`. The owner-docket row OW-7 in `LEDGER.md` points here.
3. The glance is put to the owner once, as one page with the seven rows (a private artifact is the delivery; the records are the source). The owner's answer is quoted verbatim. On silence at W-L.8, each default stands as its wave's terminal with "owner not ruled" recorded (PLAN §1).
4. Each default's code gate belongs to the wave named: this wave adds to each destination spec the born-RED it must carry (W-E.4: an open floating plate computes one cast; W-E.10: two stories in one category resolve different aurora presets; W-L.1: `useConfirm` resolves true on the destructive action and false on Esc; W-E.7: G-23; W-H.1: the scrubber's thumb box > 0 at rest).

## 4 · Files it touches

- New: `docs/tranches/BL/ledger/GLANCES.md`; captures under `.cache/visual/glances/` (the scratch root, untracked).
- Edited: `docs/tranches/BL/LEDGER.md` (OW-7 and the rows); the destination wave specs, one born-RED line each.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B4-G1 · the glance record exists | `test -f docs/tranches/BL/ledger/GLANCES.md` | exit 0 | **exit 1** |
| B4-G2 · every glance captured | for each GLANCES row, every cited capture exists and its sha256 matches | exit 0 | absent |
| B4-G3 · every glance has a verdict line | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows OW-7,L05b-15,UIA-KF-069,R2-06-08,A2-VA-L1-6,A2-FO-L2-7,L05b-21,L05a-16,L05a-21` | exit 0 (a `pending` verdict passes; `--close` at W-L.8 prints it) | **exit 1**: checker absent, no rows |
| B4-G4 · the overlay stack (handed to W-E.4) | count of comma-separated layers in the computed `box-shadow` of an open `.glass-overlay-plate` on the Chromium engine lane | ≤ 2 (rim + one cast) | at source, 4 layers (`overlay-plate.css:316-318`); the engine reading is taken in the wave |

## 6 · π and DELTA obligations

| surface | themes | engines | π |
|---|---|---|---|
| each of the seven glance rows (§3.1) | light and dark | Chromium; Playwright WebKit labelled as such; real Safari UNMEASURED (OW-3) | the paired readout named in §3.1, beside each screenshot |

## 7 · MIGRATION rows

None here; `useConfirm` is additive and its CHANGELOG line is W-L.1's.

## 8 · Ledger rows

- F-15's members and inbound rows (§1) close with their terminals. OW-7 closes on the owner's verdicts or, at W-L.8, on the recorded defaults.
- O-74 §4 and §9 (the rulings owed, `FORMATION-PROGRESS.md:40`).
- N-7's conflict half (its build is W-I.1's).
