# W-B.2 · W-MAIL-INTAKE and the reply letter: one inbox, one key per letter, every row ruled and answered · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree (docs-only since `f3ad78d0`); `src` is the published 10.1.0. Sibling trees read only (value.js `docs/tranches/V/coordination/INBOX.md`) |
| ships in | 11.0.0 (the reply is sent when this wave closes; each row's landing version is in the letter) |
| families | F-71, the intake and reply split (`audit/REGISTRY.md:1511-1526`). The API-ask cures named in PLAN §3 W-L.1 are W-L.1's; this wave rules every other F-71 row |
| depends on | W-B.1 (the ledger the rows land in) |
| dependants | W-L.1 (builds the CUREs ruled here), W-L.7 (the landing packets cite the reply) |

## 1 · What it closes

| id | what |
|---|---|
| L11-01, L15a-F1 | ten value.js letters to glass (value.js ids O-28, O-30, O-31, O-36, O-47..O-52) never carried |
| L11-02 | 27 producer rows in value.js `X/COHESION.md` §4a (F3-*, KFW12-*, F10-*) never sent; R2-06-12 measured 19 of them |
| L11-04, L11-05 | the atlas 2026-08-03 batch (20 rows, `BK/coordination/ATLAS-BATCH-ROUTING.md`) routed, never answered; the promises parked on #64 (B-5, the DarkModeToggle decorative mode) |
| L11-06, L05a-13 | O-53..O-56 registered, unanswered |
| L11-08 | four field-seam asks (O-47 readout, KFW12-3, KFW12-4, KFW12-5) |
| L11-09 | the canvas-anchored overlay's BUILD-OWED (#76) and SCI-BEAD's `W-BEAD-TABLE`/`W-BEAD-CHIP` books, never ruled |
| L11-10 | chicago's "N-2 rides BL" (`BK/coordination/chicago-inbound-2026-09-22-button-stadium-pad.md:91`), content only in a workflow run |
| L11-12, L15a-F7 | INBOUND seeded from the receiver's own dir; live producer gaps unanswered |
| R2-03-05, R2-03-08, R2-06-12, R9-02-15 | the ANSWER rows (O-56 G-3 animation, G-4), the §4a measurements, SelectTrigger's inline arm (ruled in W-L.1) |
| L11-04's companion N-10c | "route all glass changes to the glass session": BL has no inbox dir |

## 2 · The defect at HEAD

- **No BL inbox.** `test -d docs/tranches/BL/inbox` exits 1. `audit/INBOUND.md:6` says the letters "sit in `docs/tranches/BK/coordination/`", the closed tranche's folder.
- **No shared key with the senders.** value.js rows its outbound mail in `docs/tranches/V/coordination/INBOX.md` under its own ids; glass re-rows under glass ids and the two diverge (glass O-74 is value.js O-69, `INBOUND.md:28`). `grep -cE '\| *value\.js:O-[0-9]+' docs/tranches/BL/audit/INBOUND.md` gives **0**. The value.js ledger has 46 glass-addressed entries (ids O-23 .. O-82, duplicates for addenda, measured with `awk` over its table at seat time); joining them to glass INBOUND by letter filename matches **0 of 46**, because the sender names its own copy (`X-ALL-BK-…`) and glass names the mirror (`valuejs-outbound-…`).
- **Letters that never arrived.** Read against the value.js ledger at seat time, 18 glass-addressed entries have no glass INBOUND row: O-28, O-30, O-31, O-36, O-47, O-48, O-49, O-50, O-51, O-52 (L11-01's ten) and eight later addenda, value.js O-63 (FW14U: 48 routed rows plus three new, R-t-1 among them), O-65 (FW14H-OA50: BL-FW14OA50-1 Button/Badge stadium radius, -2 a list-row primitive), O-67 (TILE-PRIMITIVE, beside O-58), O-69 (the 33 KFA rows read against 10.0.1), O-70 (KFW13VU; UIA-KF-078 Select selected mark), O-71 (UIA-V-537, `Dialog placement="right"` paints translucent with no backdrop), O-72 (TOOLTIP-REVEAL-STATE), O-73 (the dock ring colour seam). The gate loop over L11-01's ten ids stops at the first: `missing O-28`. Two of the 18 subjects are known to the registry under other ids (O-72 is R4-01-18 in F-70, `REGISTRY.md:1491`); the letters themselves are not rowed or answered.
- **No reply.** `ls docs/tranches/BL/outbox/*reply*.md` matches nothing. The cursor owes it (`FORMATION-PROGRESS.md:41`): O-53..O-68, O-74 and C-2, to value-js-30 and lot-assay-e0. O-75..O-82 landed since.
- **A notice answered by nothing.** O-53 R-2 asks whether the `490cc46e` removals were meant. `git grep -c btn-interactive -- src` is 0 and `grep -c btn-interactive MIGRATION.md` is **0**: the 7.0.0 cut removed the utility (`git show 490cc46e`, the DESIGN line "`.btn-interactive`—scale-based four-state + focus ring" deleted) with no MIGRATION line.

## 3 · The cure

1. **One inbox, one outbox.** `docs/tranches/BL/inbox/` holds every letter addressed to BL: the BL-era letters now under `BK/coordination/` (O-53..O-82 and C-2) move there with `git mv`, and the 18 uncarried letters are copied in from the sender's tree (the sender keeps its original; the copy's first line names the source path and sender id). `docs/tranches/BL/outbox/` holds the replies. `INBOUND.md` points to the new paths.
2. **A sender key on every row.** `INBOUND.md` gains a `sender-ref` column, `<repo>:<sender id>` (`value.js:O-69`, `chicago:C-2`, `atlas:2026-08-03#12`). A letter the sender never rowed gets `<repo>:unrowed:<file>`.
3. **`scripts/tranche/verify-inbound.mjs <tranche-dir> --sender value.js=<path to INBOX.md> …`** reads each sender ledger (read-only), selects rows whose addressee column names glass-ui, and exits 1 when one has no INBOUND row with its `sender-ref`, or when an INBOUND row has no LEDGER terminal (B1-G2's checker, `--rows`). Senders: value.js `V/coordination/INBOX.md`, value.js `X/COHESION.md` §4a, the atlas communiqué (`sci-report/atlas/docs/tranches/Q/audit/2026-08-03-codex-dev-audit/GLASS-UI-COMMUNIQUE.md`), chicago's letters. The script reads siblings and never writes them (P-7).
4. **The decision rule for an inbound row**, applied to every row below and to every row the intake adds:
   - a row whose cause is a defect mechanism → **CURE** in its family's wave;
   - an API ask that removes glass behaviour duplicated in two or more consumers, or that a consumer cannot express without restyling library internals → **CURE**, built in W-L.1 unless a subject wave holds the surface;
   - an API ask one consumer can compose from shipped parts with no internal access → **DECLINE** with the composition recipe (E-5: presets and compositions live in consumers);
   - a row with no producer mechanism → **ANSWER** with the measurement;
   - a row whose cause the sender did not isolate → measured at intake on the Chromium lane; routed by the result, or ANSWERED "not reproduced" with the probe cited.
5. **The 65 F-71 rows of `INBOUND-MAP.md`, ruled.** W-L.1's own list (O-65 P-1 and P-2, A2-VA-L3-2 CardHeader `#actions`, O-61 R-2's fill hook, O-61 R-3 / UIA-V-254 / A2-KE-L2-13 the theme menu row, #76 and UIA-V-34 the anchor, A2-FO-L3-1, O-74 §5 A2-FO-L1-17, §7 A2-FO-L3-6, §13 A2-FO-L1-4) is ruled there; the reply states "ruled and built in W-L.1, 11.0.0". The rest:

   | row | terminal | wave or answer |
   |---|---|---|
   | UIA-KF-052 DockControl tone | FOLD | W-I.1: the tone seat is a D2 checklist item |
   | UIA-F-132 DockControl loading | FOLD | W-I.1 seats W-B.8's exported DotRing |
   | UIA-V-546 dock collapsed after a dock-launched Dialog | measured at intake | reproduced → W-I.1 born-RED; not → ANSWER with the probe |
   | UIA-V-97 DropdownMenuItem tone | CURE | W-L.1: the house `tone` axis on the menu row |
   | UIA-KF-136, A2-KE-L1-25, A2-VA-L1-7 | CURE | W-L.1: one menu-row slot grammar (`#leading`, `#description`, the indicator seat) |
   | UIA-F-77 Popover content-fit width | FOLD | W-E.4: the inline measure is content-fit up to the block ceiling |
   | UIA-F-124 takeover variant | FOLD | W-E.3: a Sheet at its top detent is the takeover, with square viewport corners from the anchored-edge bleed |
   | UIA-F-133 loading Button two glyphs | CURE | W-L.1: the loading mark replaces the leading seat |
   | UIA-F-147 start-aligned list row | FOLD | W-E.7: the row budget and label-slot rule |
   | A2-FO-L1-2 TocTree | DECLINE | one consumer; composes from the `useSidebar*` composables and menu rows |
   | UIA-V-549 Cancel underline differs by width | measured at intake | producer → W-E.7; else ANSWER |
   | UIA-F-106 Input adornment slot | CURE | W-L.1 (`./search` is W-L.1's §13) |
   | UIA-V-344 FileDrop | DECLINE | one consumer; Surface + vueuse `useDropZone` + the house focus ring (the UA-blue ring is the consumer not using it) |
   | UIA-F-84 Slider loupe | FOLD | W-J.2 owns the loupe (the engaged rung); its ink is W-H.1's invariant |
   | UIA-KF-280, A2-KE-L1-9 draggable marks | DECLINE | a keyframe rail is keyframes.js's editor; SortableList + Slider compose it |
   | UIA-V-151, UIA-KF-167 preset row repeated | CURE | W-L.1: an EasingPicker prop that omits the preset Select |
   | E-3 marker on the stroke path, one curve catalogue | CURE | W-L.1: two consumers |
   | UIA-V-48 | ANSWER | value.js HeroBlob's wall-clock park, 2000 + 3300 ms (R2-03-05) |
   | UIA-V-186, O-56 G-4 | ANSWER | the dark field derives maroon, L 0.18-0.42, h 344-40 (R2-03-08); "near-black" as a taste ask is an owner glance, not a producer defect |
   | UIA-KF-055 code-syntax tokens | DECLINE | a Monaco theme is a preset for a third-party editor (E-5); the consumer maps the published palette tokens |
   | UIA-F-72, A2-FO-L1-28 DotRing | CURE | W-B.8 |
   | UIA-KF-201, UIA-F-139, A2-KE-L1-8 Badge soft tone | CURE | W-L.1: two consumers |
   | UIA-KF-221 Toast replace-in-place, tone glyph | FOLD | W-E.5 (named items; the tone glyph in the viewport's item) |
   | UIA-F-130 DarkModeToggle glyph slot | CURE | W-L.1, with the menu-item form |
   | UIA-F-134, A2-FO-L3-8, O-68 R-1 | CURED at 10.1.0 | `#actions` shipped (tag `v10.1.0` at `d8bda2a9`); the truncation is W-0.3, the 25.9 px label W-E.7 |
   | UIA-F-145 | ANSWER + FOLD | Accordion, Alert, Avatar, Skeleton are root exports (`src/index.ts:81,94,101,310`); per-component subpaths follow W-D.1's door rule |
   | UIA-V-639, A2-FO-L1-27 Pagination | CURE | W-L.1: two consumers hand-roll it; reka ships the primitive the library binds |
   | UIA-F-224 EmptyState | DECLINE | one consumer; Card + type roles |
   | O-53 R-2 | ANSWER | the removals were meant: the press scale lives on Button's one register; this wave adds the missing MIGRATION 7.0.0 line for `.btn-interactive` |
   | O-56 G-3 (animation) | ANSWER | HeroBlob's park; the settle seam under a manual mood is W-G.5's |
   | O-67 R-3 badge seat | FOLD | W-I.1 |
   | A2-VA-L1-2 (veil) | CURE | W-L.1, with CardHeader's `#actions` seat: the scroll veil under a condensed header |
   | A2-FO-L3-5 ConfiguratorLayer flush arm | CURE | W-L.1 |
   | A2-FO-L1-16 Slider scrub session | DECLINE | `update:modelValue` then `valueCommit` bracket a scrub; the recipe goes in the Slider README |
   | A2-FO-L1-15 | CURE (value field) + FOLD (thumb-plus-fill) | the readout seam on LabeledField, W-L.1 (L11-08's field seams); the visible value mark is W-H.1's |
   | A2-FO-L1-14 single-component tooltip | CURE | W-L.1: a `content` root that composes the parts, since every consumer repeats the four-part composition |
   | A2-FO-L1-18 estimate-then-teleport scroll | FOLD | W-K.7 (arrival scroll) |
   | A2-KE-L1-29 CopyButton | DECLINE | Button + `useClipboard` + DotRing + the Check glyph; the recipe is EasingPicker's own |
   | A2-KE-L1-26 Aurora `followPointer` | FOLD | W-G.4 (the VizStudio interaction contract) |
   | O-75, O-76, O-77 | CURED at 10.1.0 / W-0.2 / W-0.3 | as INBOUND states |
6. **The intake rows** (§2's 18 letters, COHESION §4a's 27, the atlas batch's 20, #64's promises, #76, the SCI-BEAD books, chicago N-2). Each is carried, rowed with its `sender-ref`, re-measured at the wave's HEAD and ruled by §3.4. Known routes: O-47 and KFW12-3/-4/-5 → W-L.1 (field seams, one decision per seam); O-48 `./avatar` → W-D.1's door rule; O-49 aurora strip motion → W-G.4; O-51 search cancel glyph → W-L.1 with the Input adornment; O-52 blob display-p3 → W-G.5; O-36 → W-L.5 (F-72); O-28 and O-31 (KF.W7) are first read against BK's O-26 disposition ledger (`BK/execution/2026-09-18-o26-disposition/LEDGER.md:885` names KF.W7), and ANSWERED by that line where it answers them; value.js O-65 (OA-50) and O-67 (TILE) → W-J.1; O-70's UIA-KF-078 re-measured; O-71 → W-E.2 (surface geometry) with W-H.2's frost; O-72 → W-L.2 (the state vocabulary, R4-01-18); O-73 → W-K.4 (one ring register); B-5 → W-L.1 with the DarkModeToggle; chicago N-2 is recovered from run `wf_515fb0e4` at intake or its row reads RETIRE, "content not on record", quoting the letter line. O-82 (POPOVER-ANCHOR) is already rowed; the next plan pass puts it in band 0 (`INBOUND.md:36`).
7. **The CURED@HEAD claims of O-74**, re-measured at `19bf6569` in `src`: A2-VA-L1-2 (condense) holds (`card/CardHeader.vue:20,38,52,67`); A2-VA-L2-9 holds (`tokens/light-dark.css:18-20`, `--control-floor: var(--touch-target, 2.75rem)` under `pointer: coarse`); A2-FO-L2-15 holds as a source statement (`dock/styles/run.css:44-51`) and its paint fault is F-18's (W-I.1), so the reply says CONFIRMED IN PART; A2-VA-L2-6 is withdrawn by the sender's erratum E-1.
8. **The reply letter.** `docs/tranches/BL/outbox/glass-reply-<date>.md`, one table: every INBOUND row with its `sender-ref`, terminal, wave and landing version (10.2.0 for band 0, 11.0.0 otherwise), and for each ANSWER the measurement. Sent to value-js-30 (for value.js, keyframes.js, fourier-analysis), lot-assay-e0 (chicago) and the atlas session, and relayed live to the running sessions (N-6). The wave records each send.
9. **MIGRATION**: the 7.0.0 section gains `.btn-interactive` removed, successor Button's press register (§7).

## 4 · Files it touches

- New: `docs/tranches/BL/inbox/` (moved and carried letters), `docs/tranches/BL/outbox/glass-reply-<date>.md`, `scripts/tranche/verify-inbound.mjs`.
- Edited: `docs/tranches/BL/audit/INBOUND.md` (paths, `sender-ref`, the new rows), `docs/tranches/BL/LEDGER.md` (the rows), `MIGRATION.md` (one 7.0.0 line).
- Moved: the BL-era letters out of `docs/tranches/BK/coordination/`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B2-G1 · the inbox exists | `test -d docs/tranches/BL/inbox` | exit 0 | **exit 1** |
| B2-G2 · every row keyed to its sender | `grep -cE '\| *value\.js:O-[0-9]+' docs/tranches/BL/audit/INBOUND.md` ≥ the value.js ledger's glass-addressed row count, checked by B2-G6 | count ≥ 46 | **0** |
| B2-G3 · L11-01's ten carried | `for id in O-28 O-30 O-31 O-36 O-47 O-48 O-49 O-50 O-51 O-52; do grep -qw -- "$id" docs/tranches/BL/audit/INBOUND.md \|\| exit 1; done` | exit 0 | **exit 1**: `missing O-28` |
| B2-G4 · the reply exists and covers every row | `ls docs/tranches/BL/outbox/*reply*.md` and every INBOUND id appears in it with a terminal and a version | both | **exit 1**: no match |
| B2-G5 · the notice answered in MIGRATION | `test "$(grep -c btn-interactive MIGRATION.md)" -ge 1` | exit 0 | **exit 1**: 0 |
| B2-G6 · the join | `node scripts/tranche/verify-inbound.mjs docs/tranches/BL --sender value.js=../value.js/docs/tranches/V/coordination/INBOX.md` | exit 0 | absent; measured by hand: 0 of 46 joined, 18 with no row at all |
| B2-G7 · the join bites | the same with one planted glass-addressed row appended to a scratch copy of the sender ledger | exit 1, naming the row | absent |
| B2-G8 · every inbound row terminal | `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows $(ids of INBOUND and INBOUND-MAP)` | exit 0 | **exit 1** (W-B.1's checker absent) |

B2-G3 alone could pass by mentioning an id in prose; B2-G6 requires the `sender-ref` column and the join.

## 6 · π and DELTA obligations

The wave makes no visual claim of its own. Two intake rows are measured in paint before ruling (UIA-V-546, UIA-V-549): Chromium at 1440 and 390, light and dark, screenshot plus the probe's computed readout under `.cache/visual/intake/<row>/`, sha256 in the ledger row. Playwright WebKit cells are labelled so; real-Safari cells UNMEASURED (OW-3).

## 7 · MIGRATION rows

| version | removed | successor |
|---|---|---|
| 7.0.0 | `.btn-interactive` (the scale-based four-state utility) | `<Button>` carries the one press register; there is no utility form |

## 8 · Ledger rows

- F-71's members and the rows in §1 close here, each with its terminal.
- N-10c (route glass changes to the glass session): the inbox dir and the live relay; N-10b (the amiga scene) is ANSWERED in the reply: not glass-owned, the scene composes on keyframes' own three.js path (`census-carries-recap.md:90`).
- N-8e, O-53 R-2, O-54 (the device-loss question, answered with W-G.2's subscription), O-56 G-3 (animation) and G-4, O-57 R-2 (`.cartoon-cast` ships in `styles/glass/glass-atom.css:37`; `.cartoon-surface` is an `@utility` in `card/styles.css:256` emitted only through the consumer's Tailwind scan, which W-L.3's README recipe covers; re-measured in the served cascade at the wave), O-80 (CURED at 10.0.0 by deletion; the residual is a measured addendum if value.js's 10.1.0 re-measure finds one), and O-74's CURED@HEAD confirmations (§3.7).
- The cursor's reply obligation (`FORMATION-PROGRESS.md:41`).
