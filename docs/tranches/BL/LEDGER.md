# BL — the ledger

| field | value |
|---|---|
| seat | formation LEDGER seat (run `wf_68eb18d6-b21`). Writes this file only |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b2fb3042` (read from `dabfc26f` on; the task named `f3ad78d0`; every commit between is docs-only, `git diff --stat dabfc26f HEAD -- src demo tests package.json` empty). `git diff --stat v10.1.0 HEAD -- src demo tests package.json` prints nothing, so `src` is the published 10.1.0 (`npm view @mkbabb/glass-ui version` → `10.1.0`). `git diff --stat v10.0.1 v10.1.0 -- src` → 5 files, +117/−9 (the Configurator only), so the census's HEAD words, taken on the 10.0.1 bytes, stand except where a row names the Configurator |
| inputs, read in full | `CHARTER.md`; `FORMATION-PROGRESS.md` (the carried obligations, lines 30-49, and the dated rulings, lines 75-80); `PLAN.md`; `waves/INDEX.md`; the "What it closes" and ledger sections of all 90 wave specs, and the cure sections of W-B.1, W-B.2, W-0.3, W-0.4, W-I.1, W-L.1, W-L.8; `ledger/CENSUS.md` and its three seat files; `BK/FINAL.md` §7; `audit/PROMPT-RECAP-SEED.md`; `audit/INBOUND.md`; `audit/INBOUND-MAP.md` (every row table, parsed by script: 442 rows); `audit/REGISTRY.md` (F-11 to F-15, the round-6 gap corrections) |
| commands run here | `plutil -p ~/Library/WebDriver/com.apple.Safari.plist` → `AllowRemoteAutomation => false`, mtime `Sep 17 18:51:49 2026`; `npm view @mkbabb/value.js version` → `4.0.0`; `test -f docs/tranches/BL/design/material/REGISTRY.md` → absent (D3 has no registry); a parser over `INBOUND-MAP.md` (442 rows, 0 duplicate ids) and a matcher of every row id against the 90 wave specs, with abbreviated lists (`UIA-V-85, -263, -512`) expanded |
| fences | no source edit, no git write, no build; the one write is this file |

Short cites: `a:n`, `b:n`, `c:n` are lines of `ledger/census-register-a.md`, `census-register-b.md`, `census-carries-recap.md`; `CEN:n` is `ledger/CENSUS.md`; `CUR:n` is `FORMATION-PROGRESS.md`; `IN:n` is `audit/INBOUND.md`; `IMAP:n` is `audit/INBOUND-MAP.md`; `FIN:n` is `BK/FINAL.md`; `CH:n` is `CHARTER.md`; `W-x.n §k` is a section of `waves/W-x.n.md`.

## 0 · How to read

**Columns** are W-B.1's (§3.1): `| row | source | HEAD word | terminal | wave | ruler | rationale |`. A row whose items land in different waves is split into item rows (`#51a`, `#51b`), as W-B.1 §3.1 requires.

**Terminals.** One of four words, as the brief states them (CH:44):

- **BUILD** in the named wave, which must exist in `waves/INDEX.md` and whose spec carries the item;
- **FOLD** into the named wave (the item is held, ruled or measured there, not built as its own subject);
- **BANKED** with a named re-trigger;
- **RETIRE** with the rationale. The rationale opens with its class where one applies: CURED (landed, measurement cited), ANSWERED, DECLINE, or NOT-REPRODUCED.

W-B.1's checker (§3.2) lists six terminal words: BUILD, FOLD, RETIRE, ANSWERED, DECLINE, CURED. It has no BANKED, which the charter names (CH:44). This file uses the charter's four and carries ANSWERED, DECLINE and CURED as RETIRE classes. W-B.1's checker must accept this vocabulary (§8, finding F-1).

**UNPLACED** marks a row this seat could not place in a wave that covers it. It is not a terminal. Each one is in §8 with the reason and the act it needs.

**Closes.** A close is a BK release cut that closed a register batch: 8.0.0 (#66 CLOSE, 2026-08-09), 9.0.0 (the batch close-work `49673cb8`, 2026-08-29) and 10.0.0 (the tranche close, 2026-09-22; FIN:238, FIN:18, FIN:43). The 90-row register was complete at the 8.0.0 close (FIN:18), so every carried register row rode 3 closes. The ⊕⁸⁰ carries (FIN:19) were open at the 9.0.0 and 10.0.0 closes: 2.

**DISEASE** marks a row that rode 2 or more closes with its remainder undecided: HEAD word OPEN, BLOCKED or OWNER-GATED, or a remainder that waited on a ruling nobody was seated to make, or one routed to no family (CH:23). The rationale names the deciding wave and says **own** when that wave exists to decide the row, **shared** when the decision is one item of a wider wave. Shared ones are listed in §8 (finding F-3), since the charter asks for a wave of its own.

**HEAD word** is the census's (register rows, carries, recap) or INBOUND-MAP's status (witness rows).

**Ruler** is `seat` unless an owner act or owner answer decides the row; those name their docket row (§4).

**Coverage tags** (appendix A only): `[N]` the wave's spec names the row; `[G]` the spec names the letter group ("O-74's F-22 rows"); `[M]` placed by family mechanism, the spec does not name the row, and by INBOUND-MAP's rule the row's surface joins that wave's born-RED set (IMAP:11); `[R]` a RETIRE or BANKED row whose answer rides W-B.2's reply letter, which carries every inbound row with its terminal (W-B.2 §3.8). In §1 to §7 an `[M]` in the rationale marks the same case.

## 1 · BK register carries (67 rows, `CEN:22`)

Every row below rode 3 closes. Word changes against BK's census are the census's (`CEN:27`).

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| #3a | a:26 | PARTIAL | BUILD | W-F.6 | seat | the tab indicator's `width`/`height` transitions (`segmented.css:256-258`); W-F.6 §9 names #3's indicator clause |
| #3b | a:26 | PARTIAL | RETIRE | — | seat | the owed "seal ruling" and the withdrawn π-2 credit are BK ceremony: no row inherits a status word (F-12, W-L.8 §3.1), and W-F.6 ships its own π and DELTA (F-06) |
| #6 | a:27 | BLOCKED | BUILD | W-A.6 | seat · owner act OW-3 | DISEASE, 3 closes, decided in W-A.6 (own). The code cure holds (`color-mix-endpoints.test.ts` green); the real-Safari paint pair waits on step 0, which reads `AllowRemoteAutomation => false` at `dabfc26f`. W-A.6 §8 names #6 |
| #7a | a:28 | PARTIAL | FOLD | W-H.2 | seat | GAP-1: `filter: brightness()` on the lens carrier (`icon-button.css:92`); W-H.2 §8 holds it as a hold line ("cured in paint at HEAD") under the nested-lens arm |
| #7b | a:28 | PARTIAL | BUILD | W-C.2 | seat | the `proof:no-layout-animation` cite at `icon-button.css:89` (0 executables); W-C.2 §8 names "#7's F-63 cite" |
| #8a | a:29 | PARTIAL | BUILD | W-L.3 | seat | the consumer matrix and the live theme bleed (`bridges.css:28-29`); W-L.3 §8 names #8, gate G-L3-1 |
| #8b | a:29 | PARTIAL | FOLD | W-A.2 | seat | the G-THEME-BLEED seat: a roster entry or recorded not carried (W-A.2 §8) |
| #10a | a:30 | PARTIAL | RETIRE | W-A.2 | seat | F-06: the #10 sink retires as a routing target and its in-tree pointers are struck (W-A.2 §8) |
| #10b | a:30 | PARTIAL | BUILD | W-H.1 | seat | the five dark-α ink and fill measurements (`dark-arm.css` 0 `--ink-*`/`--fill-*`); W-H.1 §8 |
| #10c | a:30 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | BI.W-DOCK-DEVICE's real Safari and Metal runs; W-A.6 §8 |
| #17a | a:31 | PARTIAL (regressed) | BUILD | W-C.2 | seat | the comment diet (38.9 %, 379 prose-class hits); W-C.2 §8 closes #17 |
| #17b | a:31 | PARTIAL | FOLD | W-A.2 | seat | the `comment-ratio.test.ts:209` latch becomes an owed roster entry and a born-RED growth invariant owned by W-C.2 (W-A.2 §1, §8) |
| #18a | a:32 | PARTIAL | BUILD | W-E.10 | seat | the compositions prune (5 stories); W-E.10 §8 |
| #18b | a:32 | PARTIAL | FOLD | W-L.7 | seat | RT-18E: atlas and speedtest migrate off the five deleted subpaths inside their packets [M] |
| #20 | a:33 | OPEN | BUILD | W-C.4 | seat | DISEASE, 3 closes, decided in W-C.4 (own: the 300 literal `var(--x, <literal>)` fallbacks are its first item, W-C.4 §1) |
| #21a | a:34 | PARTIAL | BUILD | W-D.1 | seat | M02 and `dialog`↔`sheet`; W-D.1 §9 (loop D1) |
| #21b | a:34 | PARTIAL | FOLD | W-L.6 | seat | `./blob-config`: W-L.6 §8 rules KEEP (the census's "0 consumers" corrected) |
| #23 | a:35 | PARTIAL | BUILD | W-E.8 | seat | re-seat the 12 px readers; the role invariant replaces the `radius-role-canon.test.ts:458` latch (W-E.8 §8) |
| #24a | a:36 | PARTIAL | FOLD | W-H.3 | seat · OW-9 | DISEASE, 3 closes, decided in W-H.3 (own DECIDE wave): RT-24C and RT-24D, each BUILT with a born-RED or RETIRED with an owner quote (W-H.3 §8) |
| #24b | a:36 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | RT-24B's device cell (W-A.6 §8) |
| #24c | a:36 | PARTIAL | FOLD | W-B.3 | seat | the carry: W-B.3 §8 carries #24's subject rows to W-H.3 |
| #25 | a:37 | OPEN | BUILD | W-H.2 | seat | DISEASE, 3 closes (BLOCKED through BK on riders that had all landed, `CEN:301`), decided in W-H.2 (shared: loop D3; the transmissive well is its first item). W-H.2 §8 |
| #26a | a:38 | PARTIAL | BUILD | W-C.3 | seat | RT-26C: the canon teaches four deleted springs (`DESIGN.md:76-80`); W-C.3 §8 |
| #26b | a:38 | PARTIAL | BUILD | W-F.1 | seat | RT-26F: unledgered per-primitive springs; W-F.1 §9 |
| #26c | a:38 | PARTIAL | BUILD | W-L.3 | seat | RT-26G: struck `--ease-spring-*` utilities (F-67) [M] |
| #26d | a:38 | PARTIAL | FOLD | W-A.2 | seat | RT-26A/B: seat bindings (W-A.2 §8 names #26) |
| #26e | a:38 | PARTIAL | RETIRE | W-A.2 | seat | RT-26D folded to the #10 sink, which F-06 retires; W-F.1 ships its own π |
| #26f | a:38 | PARTIAL | BUILD | W-F.3 | seat | RT-26E; W-F.3 §9 |
| #27 | a:39 | PARTIAL | BUILD | W-J.2 | seat | DISEASE, 3 closes, its remainder routed to no family (GAP-2), decided in W-J.2 (own; loop D5, which has no portfolio, §8 U-12). T1 GROW, the slider exemplar, the rungless set; the `engage-ladder.test.ts:134` latch becomes an owed entry (W-A.2) |
| #28a | a:40 | PARTIAL | RETIRE | — | seat | RT-28B CURED at HEAD: 0 `animate-spin` in `src` and `demo` (a:40) |
| #28b | a:40 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | RT-28C's Safari cell (W-A.6 §8) |
| #28c | a:40 | PARTIAL | BUILD | W-B.8 | seat | DISEASE, 3 closes, decided in W-B.8 (own): BUILD the DotRing export with the direct-wrap arm (RT-28D, RT-28E) |
| #29a | a:41 | PARTIAL | BUILD | W-K.7 | seat | RT-29C: popstate through the route transition; W-K.7 §8 |
| #29b | a:41 | PARTIAL | BUILD | W-C.3 | seat | RT-29B's canon figure; W-C.3 §8 |
| #29c | a:41 | PARTIAL | FOLD | W-A.2 | seat | RT-29A: seat binding (W-A.2 §8 names #29) |
| #30 | a:42 | LANDED | RETIRE | — | seat | CURED: `40d7b08f`, `dissolve.test.ts` green. The subject's live defects are other rows: `DISSOLVE_DIALECTS` prose (W-C.2), the toast exit's PRM carve (W-E.2) |
| #31a | a:43 | PARTIAL | FOLD | W-A.2 | seat | the four a11y seats become roster entries G-22, G-23, G-25, G-34 (W-A.2 §8) |
| #31b | a:43 | PARTIAL | BUILD | W-I.2 | seat | RT-31B: the dock keyboard model and π-KEYBOARD (W-I.2 §8) |
| #31c | a:43 | PARTIAL | RETIRE | W-K.6 | seat | RT-31C CURED at HEAD: one h1 on each of 80 routes; K6-G13 is its hold line (W-K.6 §2) |
| #31d | a:43 | PARTIAL | BUILD | W-C.3 | seat | RT-31D; W-C.3 §8 |
| #31e | a:43 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | RT-31E's Safari cell (W-A.6 §8) |
| #31f | a:43 | PARTIAL | UNPLACED | — | — | RT-31F (F-41): no spec carries it (§8 U-6) |
| #31g | a:43 | PARTIAL | UNPLACED | — | — | RT-31G (F-23's rendered-contrast invariant): W-H.1 builds the invariant but sends "#31 items routed to F-23" to band K, and no band-K spec names them (§8 U-7) |
| #32a | a:44 | PARTIAL | BUILD | W-K.7 | seat | the owed captures (the eyeglass fringe at rest and moving) and the console clause; W-K.7 §8 |
| #32b | a:44 | PARTIAL | BUILD | W-F.2 | seat | the retarget deform; W-F.2 §9 |
| #32c | a:44 | PARTIAL | RETIRE | — | seat | RT-32A retired in code (a:44) |
| #33a | a:45 | PARTIAL | BUILD | W-H.2 | seat | π cells 5-7 (G3 on `/feedback/alert`) and G-NO-WHITE-SPECULAR against `--glass-material-rim` (a hold line, cured at HEAD); W-H.2 §8 |
| #33b | a:45 | PARTIAL | UNPLACED | — | — | the `ToastTitle.vue:14` weight collision (F-41): W-E.5 does not carry it (§8 U-6) |
| #33c | a:45 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | WebKit cells 8-9 (W-A.6 §8) |
| #34 | a:46 | OPEN | BUILD | W-E.5 | seat | DISEASE, 3 closes, decided in W-E.5 (own: W-TOAST); W-E.5 §8 |
| #38a | a:47 | PARTIAL | BUILD | W-H.2 | seat | RT-38C: the veil blur against the canon band, the dark rim (G10); W-H.2 §8 |
| #38b | a:47 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | P15 Safari (W-A.6 §8) |
| #38c | a:47 | PARTIAL | FOLD | W-A.2 | seat | G-SCRIM-NO-BLUR (W-A.2 names it) |
| #38d | a:47 | PARTIAL | BUILD | W-C.3 | seat | RT-38E and RT-38G; W-C.3 §8 |
| #38e | a:47 | PARTIAL | RETIRE | — | seat | RT-38D CURED at HEAD (a:47) |
| #39a | a:48 | PARTIAL | BUILD | W-E.3 | seat | RT-39F (the dock covers the sheet's action at 390×844) and the fixed 40/120 px halo stops; W-E.3 §8 |
| #39b | a:48 | PARTIAL | BUILD | W-H.4 | seat | RT-39C: the halo's cost, unbiased (G2); W-H.4 §8 |
| #39c | a:48 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | the Safari pair (W-A.6 §8) |
| #39d | a:48 | PARTIAL | BUILD | W-H.2 | seat | RT-39G (GAP-1): the library-wide nested-lens sweep; W-H.2 §8 |
| #41a | a:49 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | π-41 blocks on Safari by its own terms (W-A.6 §8) |
| #41b | a:49 | PARTIAL | FOLD | W-L.6 | seat | RT-41A: `dropIndex` with no reader; W-L.6 §8 names it |
| #41c | a:49 | PARTIAL | FOLD | W-H.2 | seat | the sortable list's 20 px frost under the one frost detector [M] |
| #43 | a:50 | OPEN | BUILD | W-E.6 | seat | DISEASE, 3 closes, decided in W-E.6 (own: W-CHIP, with F-26 and F-27); W-E.6 §8 |
| #44 | a:51 | OPEN | RETIRE | W-B.7 | seat | DISEASE, 3 closes, decided in W-B.7 (own): the subject was deleted at `a8a6f66b`, 0 consumers across siblings; W-B.7 removes its tombstones from `src` |
| #45a | a:52 | OPEN | BUILD | W-B.9 | seat | DISEASE, 3 closes, decided in W-B.9 (own): BUILD on the one engine with two live consumers |
| #45b | a:52 | OPEN | BUILD | W-G.1 | seat | the constellation off `useCanvas2D` onto the one engine (B9-G1, B9-G2); W-G.1 §9 |
| #46a | a:53 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | the real-Safari and 390×844 coarse cells (W-A.6 §8) |
| #46b | a:53 | PARTIAL | FOLD | W-B.10 | seat · OW-6 | DISEASE, 3 closes, decided in W-B.10 (own): the Σwidth denominator kept (OW-6 docket), `useAnisotropicExtent` handed to loop D2 |
| #46c | a:53 | PARTIAL | RETIRE | — | seat | "STAYS DIRTY" is false at HEAD (`git status --porcelain src` empty; F-12) |
| #47a | a:54 | PARTIAL | BUILD | W-I.1 | seat | `data-dock-state`, the `g-dock-lattice.test.ts:925` latch subject, and the ten enqueued π cells in the frame strips; W-I.1 §8 |
| #47b | a:54 | PARTIAL | BUILD | W-C.4 | seat | the dead `--dock-morph-max-stretch` and the phantom `--dock-vertical-*` reads; W-C.4 §8 |
| #48 | a:55 | OPEN | BUILD | W-I.1 | seat | DISEASE, 3 closes, decided by loop D2's Q-9 ruling and landed in W-I.1 (shared). The zero-width morph window goes with it |
| #49a | a:56 | PARTIAL (W0 only) | BUILD | W-G.4 | seat | DISEASE, 3 closes, decided in W-G.4 (own: "the disease row decided", W-G.4 §9); π-FIELD is its capture |
| #49b | a:56 | PARTIAL | BUILD | W-G.1 | seat | R9's delete half and D5 (the two probe contexts on mount); W-G.1 §9 |
| #49c | a:56 | PARTIAL | BUILD | W-E.9 | seat | R11, the starved configurator (C-13c); W-E.9 §8 |
| #49d | a:56 | PARTIAL | RETIRE | W-B.5 | seat | V-A95: see C-4 |
| #49e | a:56 | PARTIAL | UNPLACED | — | — | F1, the pause question at `demo/chassis/hero/aurora-hero.ts:278-281` (F-42): W-K.6 does not name it (§8 U-8) |
| #49f | a:56 | PARTIAL | BUILD | W-H.1 | seat | F2, the dark claims: L03b-06, the demo hero configs take a dark twin (`aurora-hero.ts:250,333`); W-H.1 §1 |
| #49g | a:56 | PARTIAL | RETIRE | — | seat | F3 CURED at HEAD (`useKeyboardShortcuts.ts:298`) |
| #50a | a:57 | PARTIAL (W0 only) | BUILD | W-G.1 | seat | W1, the GLSL excise and its paired capture (C-11); W-G.1 §9 |
| #50b | a:57 | PARTIAL | BUILD | W-G.5 | seat | DISEASE, 3 closes, decided in W-G.5 (own): W2-W8; W-G.5 §9 |
| #50c | a:57 | PARTIAL | FOLD | W-L.6 | seat | `./blob-config`, as #21b |
| #51a | a:58 | PARTIAL | FOLD | W-B.6 | seat · OW-4 | DISEASE, 3 closes, decided in W-B.6 (own): the two colour windows RETIRE into the composite invariant, π-SCROLL KEEP by its own criterion (C-5, C-6, C-7) |
| #51b | a:58 | PARTIAL | FOLD | W-L.7 | seat | the atlas 6.0.0 hold (W-B.6 §1) |
| #51c | a:58 | PARTIAL | RETIRE | W-C.3 | seat | the evidence doc's dead grep path and lapsed date: the consumer-evidence corpus retires (W-C.3 §8) |
| #51d | a:58 | PARTIAL | BUILD | W-K.7 | seat | HandMark's second draw on `fonts.ready` (R3-01-05); W-K.7 §8 |
| #52 | a:59 | PARTIAL | BUILD | W-E.10 | seat | MOVE 1-4, the gallery split with the `PresetPickerRow` deletion, the `#transport` slot, and the rem-floored stage (`configurator/styles.css:283-289`); W-E.10 §8 |
| #53a | b:43 | PARTIAL | BUILD | W-A.4 | seat | the field's paint on a GPU (F-08's leg names fourier); W-A.4 §8 |
| #53b | b:43 | PARTIAL | BUILD | W-E.10 | seat | the routed `#transport` slot (with #52) |
| #53c | b:43 | PARTIAL | UNPLACED | — | — | `live`/`inertReason`/`note` on FourierField never landed; no spec names them (§8 U-9) |
| #53d | b:43 | PARTIAL | BUILD | W-F.1 | seat | `clock.ts:71-75` integrates its own spring; W-F.1 §9 |
| #53e | b:43 | PARTIAL | FOLD | W-L.7 | seat | the fourier adopt [M] |
| #53f | b:43 | PARTIAL | RETIRE | W-L.6 | seat | the zero-consumer surface item: refuted at HEAD (W-L.6 §8) |
| #54a | b:44 | OPEN | BUILD | W-G.1 | seat | DISEASE, 3 closes, decided in W-G.1 (own: W-ONE-ENGINE; 236 `webgl2` lines in 40 files); W-G.1 §9 |
| #54b | b:44 | OPEN | UNPLACED | — | — | leg (v), the glass-material 1.0× tile DPR, not re-measured and named by no spec (§8 U-10) |
| #55 | b:45 | LANDED | RETIRE | — | seat | CURED: the docs rider `0241154e` landed; RT-55B retired (1:1 CSS pixels, `HandMark.vue:6-7`) |
| #55a | b:45 | LANDED | BUILD | W-C.2 | seat | the `BK #55` tags left in the tree; W-C.2 §1 |
| #55b | b:45 | LANDED | FOLD | W-L.7 | seat | RT-55A rides the packets [M] |
| #55c | b:45 | LANDED | BUILD | W-C.4 | seat | the token residue; W-C.4 §8 |
| #56a | b:46 | PARTIAL | BUILD | W-E.10 | seat | the opaque-frame sweep (ShowcaseFrame's resting tier) and the DRY fold of `plateField`; W-E.10 §8 |
| #56b | b:46 | PARTIAL | FOLD | W-G.5 | seat | the seed ceiling (G-CHROMA, G-MOOD-STILL), folded by W-E.10 §8 into W-G.5 §9 |
| #56c | b:46 | PARTIAL | BUILD | W-D.1 | seat | `deriveBlobPalette`'s placement (P3-R1(a)); W-D.1 §9 |
| #56d | b:46 | PARTIAL | FOLD | W-H.2 | seat | the σ admissibility of welled specimens under the frost detector [M] |
| #57 | b:47 | LANDED | RETIRE | — | seat | CURED: the four owed cells measure as the row's table states (b:47) |
| #58a | b:48 | PARTIAL | BUILD | W-E.10 | seat | the preview ladder (10 of 80 cards) and the OKLCH stills (F-25); W-E.10 §8 |
| #58b | b:48 | PARTIAL | BUILD | W-E.10 | seat | the latch subjects `story-preview-card.test.ts:487` (10 unrowed story SFCs) and `:556` (`heading="Aurora"`); the latch form retires in W-A.2 |
| #58c | b:48 | PARTIAL | RETIRE | W-L.6 | seat | its F-66 item, refuted at HEAD, the placement routed to W-D.1 (W-L.6 §8) |
| #59a | b:49 | PARTIAL | BUILD | W-E.9 | seat | the three `layout-canon` kills (viewport variants, the width `matchMedia`, raw `vh`); W-E.9 §8 |
| #59b | b:49 | PARTIAL | BUILD | W-E.7 | seat | `/motion/deck` at 390, the row budget (W-E.7 §1 "two demo routes pan horizontally") |
| #59c | b:49 | PARTIAL | FOLD | W-L.7 | seat | §11 LIB-SEAM rides the packets [M] |
| #60a | b:50 | OPEN | BUILD | W-H.4 | seat | DISEASE, 3 closes (BI, BJ and BK OPEN, W-H.4 kind line), decided in W-H.4 (own): the boot shell |
| #60b | b:50 | OPEN | BUILD | W-G.3 | seat | the quiescence arm (the idle loops); W-G.3 §9 |
| #60c | b:50 | OPEN | BUILD | W-G.1 | seat | the one-context arm; W-G.1 §9 closes it (W-H.4 §8 cites W-G.6 for it, a stale cross-cite, §8 F-7) |
| #61 | b:51 | OPEN | BUILD | W-C.3 | seat | DISEASE, 3 closes, decided in W-C.3 (own: W-DOC-TRUTH). R-14A retires under F-11's law |
| #62 | b:52 | OPEN | BUILD | W-D.1 | seat | DISEASE, 3 closes, decided in W-D.1 (own; loop D1, W-D.1 §9) |
| #63 | b:53 | OPEN | BUILD | W-C.1 | seat | DISEASE, 3 closes, decided in W-C.1 (own). The history rewrite stays declined (BK g8) |
| #64a | b:54 | OPEN | BUILD | W-C.2 | seat | the DECLARATION column: 27 shadcn provenance lines; W-C.2 §1 |
| #64b | b:54 | OPEN | RETIRE | W-B.12 | seat | DISEASE, 3 closes, decided in W-B.12 (own): the IDIOM-CLEARED column retires, three roster invariants hold it (GAP-B2b) |
| #64c | b:54 | OPEN | BUILD | W-C.5 | seat | GAP-B2a: typewriter 20, constellation 2, aurora 1 `Math.random` onto the seeded PRNG; W-C.5 §8 |
| #64d | b:54 | OPEN | BUILD | W-C.4 | seat | the shadcn-default `--radius` ladder; W-C.4 §1 |
| #65 | b:55 | PARTIAL | BUILD | W-A.2 | seat | 45 unbound seats behind the literal pins, and the `nameIsLive` hole (F-02); W-A.2 §8 |
| #66a | b:56 | PARTIAL | FOLD | W-L.7 | seat | the re-pin gate; W-L.7 §8 |
| #66b | b:56 | PARTIAL | BUILD | W-A.3 | seat | C-13 restored to "the visual suite enters CI"; W-A.3 §8 |
| #66c | b:56 | PARTIAL | FOLD | W-B.1 | seat | the fresh-census gate: this ledger and its checker (W-B.1 §8) |
| #66d | b:56 | PARTIAL | BUILD | W-L.8 | seat | the `FINAL.md` gate for BL; W-L.8 §8 |
| #67a | b:57 | OPEN | BUILD | W-I.1 | seat | DISEASE, 3 closes, decided by loop D2 and landed in W-I.1 (shared): hallmarks 1, 2 and 5 and OWED-3 (G21) |
| #67b | b:57 | OPEN | BUILD | W-J.2 | seat | hallmark 6, momentum for all components; W-J.2 §8 |
| #67c | b:57 | OPEN | FOLD | W-B.10 | seat | W-2, `useAnisotropicExtent`, handed to loop D2 (W-B.10 title) |
| #67d | b:57 | OPEN | FOLD | W-I.1 | seat · OW-5 | the three R-7 captures (W-I.1 §3.3 item 9) |
| #69 | b:58 | OPEN | BUILD | W-H.4 | seat | DISEASE, 3 closes, decided in W-H.4 (own: count gates, the low-power register decide) |
| #71a | b:59 | PARTIAL | FOLD | W-H.3 | seat · OW-9 | DISEASE, 3 closes (no owner quote on record), decided in W-H.3 (own DECIDE wave): RT-71A, the dispersion rims |
| #71b | b:59 | PARTIAL | RETIRE | — | seat | RT-71C ANSWERED: `tests/**` is in the battery (b:59) |
| #71c | b:59 | PARTIAL | RETIRE | — | seat | RT-71D: `dropdown-menu.contract` no longer exists (b:59) |
| #71d | b:59 | PARTIAL | BUILD | W-K.7 | seat | `useSelectionIndicator.ts:223-224` measures through transforms (R4-01-08); W-K.7 §8 |
| #71e | b:59 | PARTIAL | BUILD | W-F.2 | seat | `:313`, the deform reads the previous target (R4-01-03); W-F.2 §9 |
| #73 | b:60 | PARTIAL | BUILD | W-F.3 | seat | the shrink advances by position; W-F.3 §9 |
| #74 | b:61 | LANDED | RETIRE | — | seat | CURED: J-9 holds in paint (probe `/feedback/progress`, b:61) |
| #76a | b:62 | PARTIAL | FOLD | W-L.7 | seat | the adopts; W-L.7 §8 |
| #76b | b:62 | PARTIAL | BUILD | W-L.1 | seat | the canvas-anchored overlay's virtual anchor (G-L1-7); W-L.1 §3.6 |
| #76c | b:62 | PARTIAL | RETIRE | W-C.3 | seat | the 18 consumer-evidence docs with dead cites: the corpus retires (W-C.3 §8) |
| #76d | b:62 | PARTIAL | FOLD | W-A.2 | seat | the unplugged forcing gate: a roster entry or recorded not carried |
| #77a | b:63 | PARTIAL | BUILD | W-J.2 | seat | DISEASE, 3 closes, its remainder routed to no family (GAP-B1), decided in W-J.2 (own; loop D5, §8 U-12): the census arm |
| #77b | b:63 | PARTIAL | RETIRE | — | seat | its capture half lost its sink with F-06; W-J.2 ships its own π |
| #77c | b:63 | PARTIAL | BUILD | W-F.3 | seat | the `useLeadTrail` law defect; W-F.3 §9 |
| #78 | b:64 | BLOCKED | RETIRE | W-B.11 | seat | DISEASE, 3 closes, decided in W-B.11 (own): the salvaged body and emitter retire; the canon is derived in W-C.3 |
| #80 | b:65 | PARTIAL | BUILD | W-H.1 | seat | dark primary and secondary render alike (R2-08-02), the primary's ring at 2.96-2.98:1 (R3-02-04), the CommandItem ring gap; W-H.1 §8 |
| #81a | b:66 | PARTIAL | BUILD | W-K.2 | seat | the Command's composition; W-K.2 §8 |
| #81b | b:66 | PARTIAL | BUILD | W-K.5 | seat | two lit rows; W-K.5 §8 |
| #81c | b:66 | PARTIAL | BUILD | W-H.1 | seat | the fill-only cursor (R3-02-02); W-H.1 §1 |
| #81d | b:66 | PARTIAL | BUILD | W-L.3 | seat | the utility emitter pairs any quote with any other (`vite.utility-emit.ts:105`, F-67) [M] |
| #82a | b:67 | PARTIAL | BUILD | W-H.2 | seat | G-F2, the opaque fill leaves the field's blur inert; W-H.2 §8 |
| #82b | b:67 | PARTIAL | BUILD | W-C.4 | seat | G-F1's dead `.input-pill` selectors; W-C.4 §1 |
| #83a | b:68 | PARTIAL | BUILD | W-K.4 | seat | the forced-colours rows (R3-02-10, R3-02-05); W-K.4 §8 |
| #83b | b:68 | PARTIAL | BUILD | W-H.1 | seat | the unchecked edge at 2.93:1, the perimeter derivation; W-H.1 §8 |
| #84a | b:69 | PARTIAL | BUILD | W-E.2 | seat | P4's contrast, the paint layering (R3-02-08); W-E.2 §8 |
| #84b | b:69 | PARTIAL | BUILD | W-J.1 | seat | two-line items on the stadium; W-J.1 §8 |
| #84c | b:69 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | the Safari column (W-A.6 §8) |
| #85a | b:70 | PARTIAL | BUILD | W-A.5 | seat | the absent public-surface pins; W-A.5 §8 |
| #85b | b:70 | PARTIAL | BUILD | W-C.4 | seat | the dead `data-reparse-ok` seam; W-C.4 §1 |
| #85c | b:70 | PARTIAL | BUILD | W-A.3 | seat | the unwired visual suite; W-A.3 §8 |
| #86a | b:71 | PARTIAL | BUILD | W-E.2 | seat | `contain: paint` on the resting rungs clips a seated halo (R2-06-15); W-E.2 §8 |
| #86b | b:71 | PARTIAL | BUILD | W-C.5 | seat | the scoped `color-scheme` paints light muted ink (R2-08-12); W-C.5 §8 |
| #87 | b:72 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | the two Safari-mandatory cells (W-A.6 §8) |
| #88a | b:73 | PARTIAL | BUILD | W-A.6 | seat · OW-3 | π10's cross-engine cell (W-A.6 §8) |
| #88b | b:73 | PARTIAL | FOLD | W-L.7 | seat | atlas on 6.0.0 |
| #89 | b:74 | LANDED | RETIRE | — | seat | CURED: both residues landed (`bca22bd9`) |
| #89r | b:74 | LANDED | BUILD | W-E.4 | seat | the seam's z rung, edge clearance and dismissal membership; SelectContent composes by hand; W-E.4 §8 names "#89's residue" |
| #90a | b:75 | OWNER-GATED | FOLD | W-I.1 | seat · OW-5 | DISEASE, 3 closes, decided in W-I.1 §3.3 item 9 (shared): the three R-7 captures, seat recommendation "rule them unneeded", the owner's word on the OW-5 docket |
| #90b | b:75 | OWNER-GATED | FOLD | W-B.11 | seat | the canon LAND, closed with #78 (W-B.11 §8) and derived in W-C.3 |
| #90c | b:75 | OWNER-GATED | BUILD | W-A.6 | seat · OW-3 | the Safari cells (W-A.6 §8) |
| #90d | b:75 | OWNER-GATED | FOLD | W-I.1 | seat | device fps and loupe L-3, with #67 |
| #90e | b:75 | OWNER-GATED | BUILD | W-K.7 | seat | the row-42 fringe, with #32's captures |

## 2 · BK FINAL §7 named carries (20 rows, `CEN:23`)

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| C-1 | c:26 | OWNER-GATED | BUILD | W-B.13 | owner (OW-1) | 1 close (register-wave RULINGS). The owner enables the Trusted Publisher; if it has not happened at W-L.8, it is recorded as W-B.13's terminal state with the act named (PLAN §1), not re-booked |
| C-2 | c:27 | RETIRED | RETIRE | — | owner | DECLINE by the owner: "No rotation necessary." (CH:9, 2026-09-23). Same fact as N-4 |
| C-3 | c:28 | OWNER-GATED | BUILD | W-B.13 | owner (OW-2) | delete `NPM_TOKEN` after the first OIDC publish, and the paired `release.yml:65-66` `env:` edit; gated on C-1 |
| C-4 | c:29 | OPEN | RETIRE | W-B.5 | seat | DISEASE, 3 closes, decided in W-B.5 (own): seven non-reproductions (six BK, one through Chromium's input path, W-B.5 §2). Re-trigger: a real-pointer reproduction with a capture; a tracked drag e2e guards it |
| C-5 | c:30 | OPEN | RETIRE | W-B.6 | seat | DISEASE, 2 closes, decided in W-B.6 (own): the dark band window was set on the token ground; the composite invariant in W-H.1 holds the subject |
| C-6 | c:31 | OPEN | RETIRE | W-B.6 | seat | DISEASE, 2 closes, decided in W-B.6 (own): a spec defect, the sRGB chroma ceiling at L 0.86, h 270 is 0.06847 under a 0.08 floor |
| C-7 | c:32 | OWNER-GATED | FOLD | W-B.6 | owner (OW-4) | DISEASE, 2 closes, decided in W-B.6 (own): π-SCROLL KEEP by its own criterion; owner-reserved, docket OW-4 |
| C-8 | c:33 | PARTIAL | BUILD | W-E.2 | seat | DISEASE, 2 closes, decided in W-E.2 (shared): the layer contract's one `content-box` gated there (E2-G15), closing when W-I.1 lands |
| C-9 | c:34 | OPEN | BUILD | W-K.5 | seat | DISEASE, 2 closes, decided in W-K.5 (shared, its first item): options take their focus model from the listbox; the pin inverts |
| C-10 | c:35 | BLOCKED | BUILD | W-A.6 | seat · OW-3 | DISEASE, 2 closes, decided in W-A.6 (own): the two α cells in R2-01's battery |
| C-11 | c:36 | BLOCKED | BUILD | W-G.1 | seat | DISEASE, 2 closes, decided with #50 in W-G.5 (own); the excise and π-W1 run in W-G.1 §9 |
| C-12 | c:37 | BLOCKED | BUILD | W-G.5 | seat | DISEASE, 2 closes, decided in W-G.5 (own): the seven W2-W6 cells |
| C-13a | c:38 | BLOCKED | BUILD | W-G.1 | seat | DISEASE, 2 closes, decided with #49 in W-G.4 (own). R9's delete half is W-G.1's; its paint half W-G.4's |
| C-13b | c:39 | OPEN | BUILD | W-G.4 | seat | DISEASE, 2 closes, decided in W-G.4 (own): `DEP_MIN` (0 hits in `src`) |
| C-13c | c:40 | OPEN | BUILD | W-E.9 | seat | DISEASE, 2 closes, decided in W-E.9 (shared): the configurator envelope at 390×844 |
| C-14 | c:41 | RETIRED | RETIRE | — | seat | a smell without a reproduction is not a finding (BK EP:6242-6243); 0 `run.css` commits at 15:29:40 |
| C-15 | c:42 | RETIRED | RETIRE | — | seat | the same law; 0 hits in the α records |
| C-16 | c:43 | OPEN | BUILD | W-A.4 | seat | both capture-death signatures onto the GPU leg, no retry policy; W-A.4 §8 |
| C-17 | c:44 | OPEN | RETIRE | W-C.3 | seat | 1 close. The `docs/precepts` copy retires on glass-ui's side with a relay letter to precepts, a sibling tree (P-7); W-C.3 §8 |
| C-18 | c:45 | RETIRED | RETIRE | — | seat | ANSWERED: the Q051 rows were dispositioned into BK rows (`BK/PORT.md:31-34`) |

## 3 · Prompt-recap rows (48, `CEN:24`) and the charter's laws

Recap rows are standing edicts or 2026-09-23 asks; none rode a close, so none is marked DISEASE.

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| E-1a | c:51 | PARTIAL | BUILD | W-D.1 | seat | one symbol, one door (B9, D1-G4/G5); W-D.1 §9 |
| E-1b | c:51 | PARTIAL | BUILD | W-G.1 | seat | the dual engine arms deleted; W-G.1 |
| E-1c | c:51 | PARTIAL | BUILD | W-B.13 | owner (OW-2) | the token beside OIDC; W-B.13 §8 |
| E-1d | c:51 | PARTIAL | FOLD | W-A.2 | seat | the NO-SHIM arm's narrowness (F-02): G-13's widened scope (W-A.2 §8) |
| E-2a | c:52 | OPEN | BUILD | W-G.1 | seat | the engine half: recognized init failures stop falling silently to WebGL2; W-G.1 §9 |
| E-2b | c:52 | OPEN | BUILD | W-C.4 | seat | the fallback half: the literal-fallback detector is E-2's enforcement; W-C.4 §8 |
| E-3 | c:53 | PARTIAL | FOLD | W-C.2 | seat | the tombstone residue (247 `~~` lines) goes in W-C.2 §8; the latches in W-A.2; the law is held by PLAN §1's three-gestalt-pass rule |
| E-4 | c:54 | PARTIAL | BUILD | W-C.4 | seat | legacy engine ladders (W-C.4 §8); the unscanned demo spelling is F-02's, W-A.2 |
| E-5 | c:55 | LANDED | FOLD | W-A.2 | seat | no enforcement at HEAD; one roster line (W-A.2 §8) |
| E-6 | c:56 | PARTIAL | FOLD | W-L.7 | seat | the relay half; W-L.7 §8 |
| E-7 | c:57 | PARTIAL | BUILD | W-L.6 | seat | the spirit: 94 of 321 value exports with no reader; W-L.6 §8 |
| E-8 | c:58 | OPEN | BUILD | W-A.2 | seat | one tracked roster of 40-60 invariants; W-A.2 §8 |
| E-9 | c:59 | LANDED | FOLD | W-A.2 | seat | the absence line (G-52, W-A.2 §8); the two script comments citing CLAUDE.md are W-C.2's |
| E-10 | c:60 | OPEN | BUILD | W-C.2 | seat | 279 provenance lines in 121 `src` files; enforcement C2-G1 (W-C.2 §8) |
| E-11 | c:61 | PARTIAL | BUILD | W-L.2 | seat | typed fallthrough and emits; the `strictTemplates` consumer fixture (W-L.2 §8) |
| E-12 | c:62 | LANDED | FOLD | W-A.2 | seat | enforced by `trap-gates.test.ts:176`; the gate stays in the roster (W-A.2 names it) |
| E-13 | c:63 | LANDED | FOLD | W-A.2 | seat | enforced by `trap-gates.test.ts:166`; the gate stays in the roster (W-A.2 names it) |
| D-1a | c:64 | OPEN | BUILD | W-F.1 | seat | one liquid weight: the hand-rolled loops onto the one spring authority (W-F.1 §9) |
| D-1b | c:64 | OPEN | BUILD | W-F.2 | seat | the interruption clause (W-F.2 §9) |
| D-1c | c:64 | OPEN | BUILD | W-E.12 | seat | the pager worm reads its dot as a length (the goo-morph clause; W-F.3 holds the trail) |
| D-1d | c:64 | OPEN | BUILD | W-I.1 | seat | the dock's extent (W-I.1) |
| D-2 | c:65 | PARTIAL | BUILD | W-J.2 | seat | the engaged rung component-wide (GAP-2); loop D5 has no portfolio (§8 U-12) |
| D-3 | c:66 | PARTIAL | BUILD | W-B.3 | seat | the eight laws get one text of record under `docs/canon/`, or a ruling that an existing canon document answers them (GAP-C1); W-B.3 §8 |
| D-4 | c:67 | BLOCKED | BUILD | W-A.6 | seat · OW-3 | step 0 reads `AllowRemoteAutomation => false` at `dabfc26f`; until it passes every Safari cell is UNMEASURED |
| P-1 | c:68 | PARTIAL | FOLD | W-L.8 | seat | PLAN §1 requires three gestalt passes per implemented wave; 44 of 90 specs carry a gestalt-pass section (`grep -c '## .* Gestalt passes (P-1)'`), and the close reads each wave record (W-L.8 §1). Specs without the section are §8 F-5 |
| P-2 | c:69 | OPEN | FOLD | W-A.3 | seat | enforcement is W-A.3's wired set plus each spec's §6 (W-A.2 §8, W-A.3 §8) |
| P-3 | c:70 | PARTIAL | BUILD | W-A.2 | seat | the finite checklist as a tracked file (W-A.2 §8) |
| P-4 | c:71 | PARTIAL | BUILD | W-L.8 | seat | the close checklist gets an executable (W-L.8 §8) |
| P-5 | c:72 | LANDED | RETIRE | — | seat | ANSWERED: enforced by a review step (each seat charter reads its corpus whole). PLAN:361 says its gate stays in W-A.2's roster; there is no gate (§8 F-6). Re-trigger: a seat that plans from a partial read |
| P-6a | c:73 | OPEN | BUILD | W-L.6 | seat | the census half: the artefact (W-L.6 §8) |
| P-6b | c:73 | OPEN | BUILD | W-L.8 | seat | the close item that cites it (W-L.8 §8) |
| P-7 | c:74 | LANDED | RETIRE | — | seat | ANSWERED: enforced by the seat fences (no sibling moved; this seat read siblings only). Re-trigger: a sibling tree moved or written |
| P-8 | c:75 | LANDED | RETIRE | — | seat | ANSWERED: enforced by the seat charters (one browser seat in sequence; W-A.6 serializes its session). Re-trigger: two concurrent browser seats |
| N-1a | c:76 | OPEN | BUILD | W-D.1 | seat | the frontend half, with the placement seal as a gate (G-42); W-D.1 §9 (loop D1) |
| N-1b | c:76 | OPEN | BUILD | W-D.2 | seat | the backend and periphery half (D2-G1, B10); W-D.2 §9 |
| N-2 | c:77 | OPEN | BUILD | W-B.1 | seat | this ledger (DISEASE marks, deciding waves) and its checker B1-G2 |
| N-3 | c:78 | PARTIAL | BUILD | W-B.3 | seat | W-RECAP-CARRY; the recap detector bound (W-B.3 §8) |
| N-4 | c:79 | RETIRED | RETIRE | — | owner | ANSWERED by the owner: "No rotation necessary." (CH:9, 2026-09-23). The deletion half is C-3 |
| N-5 | c:80 | LANDED | RETIRE | — | seat | ANSWERED: the look was taken (lenses L15a, L15b, INBOUND-MAP's 442 rows); what it found is in F-68, F-69, F-71, F-72 |
| N-6a | c:81 | PARTIAL | FOLD | W-L.7 | seat | the relay half (W-L.7 §8) |
| N-6b | c:81 | PARTIAL | BUILD | W-B.2 | seat | the intake half: one inbox and the live relay (W-B.2) |
| N-7a | c:82 | OPEN | BUILD | W-I.1 | seat | compact-on-scroll and the rim as an opt-in plate seat (W-I.1 §8) |
| N-7b | c:82 | OPEN | FOLD | W-B.4 | owner (OW-7) | the conflict with AY B.5, seat default "opt-in plate seat" (W-B.4 §1) |
| N-8a | c:83 | OPEN | BUILD | W-I.1 | seat | the dock morph (W-I.1 §8) |
| N-8b1 | c:84 | OPEN | BUILD | W-I.1 | seat | the producer half: the pills' plate (W-I.1 §8) |
| N-8b2 | c:84 | OPEN | BUILD | W-L.2 | seat | the consumer half: the removed `variant` binding rejected by the fixture (W-L.2 §8; W-L.7 relays it) |
| N-8c | c:85 | OPEN | BUILD | W-G.5 | seat | the blob's look (W-G.5 §9) |
| N-8d | c:86 | OPEN | BUILD | W-K.7 | seat | one owner per arrival (W-K.7 §8) |
| N-8e | c:87 | PARTIAL | RETIRE | W-B.2 | seat | ANSWERED: the ground is maroon, not black (R2-03-08); the live aurora defects are W-G.1's and W-G.4's rows (W-B.2 §8) |
| N-9 | c:88 | OPEN | BUILD | W-J.1 | seat | the tile primitive (W-J.1 §8; loop D4) |
| N-10a | c:89 | LANDED | RETIRE | — | seat | ANSWERED: the audit ran in formation (R2-02, R3-01); the broken rows are live in their families |
| N-10b | c:90 | RETIRED | RETIRE | W-B.2 | seat | ANSWERED: not glass-owned, the amiga scene composes on keyframes' own three.js path (W-B.2 §8) |
| N-10c | c:91 | PARTIAL | BUILD | W-B.2 | seat | the inbox dir and the live relay (W-B.2 §8) |
| N-11a | c:92 | OPEN | BUILD | W-E.2 | seat | the containment row (W-E.2 §8) |
| N-11b | c:93 | OPEN | BUILD | W-L.1 | seat | the spectrum fill hook (W-L.1 §3.4); the value mark is W-H.1's G12 (GAP-C2) |
| N-11c | c:94 | OPEN | BUILD | W-L.1 | seat | the DarkModeToggle menu-item form (W-L.1 §3.5) |
| N-12 | c:95 | OPEN | BUILD | W-I.1 | seat | the plate a stadium at every rest (W-I.1 §8) |
| N-13a | c:96 | OPEN | BUILD | W-0.1 | seat | the light-grey half (W-0.1 §8; loop D3) |
| N-13b | c:96 | OPEN | BUILD | W-H.2 | seat | the remainder: the dark dock plate within 0.015 of the page (W-H.2 §8) |
| N-14 | c:97 | OPEN | BUILD | W-I.1 | seat | the scroll port apart from the paint layer (W-I.1 §8) |
| N-15 | c:98 | OPEN | BUILD | W-I.1 | seat | the dock's small-to-large morph (W-I.1 §8) |
| CH-1 | CEN:196 | — | RETIRE | — | owner | ANSWERED: each seat asserts its model id; the owner's instruction is recorded (CH:3-5). Re-trigger: a seat that inherits a model |
| CH-2 | CEN:197 | — | BUILD | W-B.1 | seat | enforcement: B1-G2, run by every band-B wave and at the close (W-B.1 §8) |
| CH-3 | CEN:198 | — | RETIRE | — | seat | ANSWERED: the registry met it at rounds 9 and 10 (`01abb5d3`, `e0330baf`; CUR:64, CUR:66); each design loop's agglomerate holds it for its own gate |

## 4 · Owner docket (the OW items, `CEN:218-234`)

W-B.1 §3.1 puts the owner docket in this file. `pending` means no owner word is on record at `dabfc26f`.

| row | question | seat default | owner answer, verbatim, with date | terminal | wave |
|---|---|---|---|---|---|
| OW-1 | enable the npm Trusted Publisher for `@mkbabb/glass-ui` (C-1) | none: an owner act | pending | BUILD | W-B.13 |
| OW-2 | delete the `NPM_TOKEN` secret after the first OIDC publish (C-3) | none: an owner act; the paired `release.yml` edit is glass-ui's | rotation waived: "No rotation necessary." (CH:9, 2026-09-23); deletion pending | BUILD | W-B.13 |
| OW-3 | tick Safari's Allow Remote Automation (and the simulator's) | none: an owner act. Machine check at `dabfc26f`: `AllowRemoteAutomation => false` | pending | BUILD | W-A.6 |
| OW-4 | π-SCROLL: keep or kill the 0.36 px ink lag under the 1.5 px cap | KEEP by its own criterion (W-B.6) | pending | FOLD | W-B.6 |
| OW-5 | supply the three R-7 captures or rule them unneeded | rule them unneeded (W-I.1 §3.3 item 9) | pending | FOLD | W-I.1 |
| OW-6 | the Σwidth denominator for GF-TIMELINE | kept (W-B.10) | pending | FOLD | W-B.10 |
| OW-7 | the F-15 glances: the rim, the cartoon under-stamp, one aurora per category and the header size, O-74 §4 and §9 | per W-B.4 §1 | pending | FOLD | W-B.4 |
| OW-8 | the W-FROST-II glance: a light frost at every level with F48's blur ladder | D3's converged ladder, paired π (W-H.2 G10) | pending | FOLD | W-H.2 |
| OW-9 | an owner quote for any RETIRE of an owner ask | per wave: W-B.14 RETIRE recommended; W-B.15 R11 RETIRE, R56 FOLD; W-H.3, W-I.4 and W-G.4 per subject | pending | FOLD | W-B.14, W-B.15, W-H.3, W-I.4 |
| OW-10 | close the registry on the evidence instead of more rounds | — | moot: rounds 9 and 10 minted nothing (CUR:63, CUR:66) | RETIRE | — |
| OW-11 | an early 10.x minor for O-68 and O-75 | — | "And this should be in 10.0" (relayed by value-js-0c, 2026-09-24, CUR:37); 10.1.0 LIVE at `d8bda2a9` | RETIRE | — |
| DOCKET-10.2.0-TAG | the in-session go for the 10.2.0 tag | — | ruling "yes" to the minor (CUR:48, 2026-09-24); the tag go itself pending (CUR:78) | FOLD | W-0.7 |
| DOCKET-11.0.0-TAG | the in-session go for the 11.0.0 tag | — | pending | FOLD | W-L.8 |
| DOCKET-Q-10 | D2 re-rules Q-10 (the collapsed summary's square) against 10.2.0's O-84 cure | per W-I.1 §3.1 item 2 | pending | FOLD | W-I.1 |
| DOCKET-Q063 | the 07-27 exemplar recording preservation | RETIRE, shown to the owner (W-L.8 §3.3) | pending | RETIRE | W-L.8 |

W-I.4's OW-9 subset (R2-06-01) and W-H.3's (R2-06-02) retire only with the owner's words; W-B.1's checker enforces that.

## 5 · Carried obligations (`CUR:30-49`, dated rulings `CUR:75-80`) and formation gaps (PLAN §6)

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| CUR:32 | CUR:32 | open | FOLD | W-I.1 | seat | the O-64 R-6 probe promised to value-js-30: REFUTED on the static page, the headed gh-build cell UNMEASURED; the answer rides W-B.2's reply (W-I.1 §8) |
| CUR:33 | CUR:33 | open | FOLD | W-I.1 | seat | O-65 as a witness every family passes (W-I.1 §1) |
| CUR:34 | CUR:34 | open | FOLD | W-0.1 | seat | the O-66 §1 witness measured in paint in light theme (W-0.1 §8) |
| CUR:35 | CUR:35 | open | FOLD | W-I.1 | seat | O-66 §2's witness scope in the three consumer docks; cells without a real GPU UNMEASURED (W-I.1 §1) |
| CUR:36 | CUR:36 | open | FOLD | W-I.1 | seat | O-67 as a witness family (W-I.1 §1) |
| CUR:37 | CUR:37 | closed | RETIRE | — | owner (OW-11) | CURED: O-68 `#actions` and O-75 `layout="detached"` shipped in 10.1.0; the Configurator wave keeps P-1 only, which is CUR:39 |
| CUR:38 | CUR:38 | open | FOLD | W-I.1 | seat | the hardened dock harness with planted-defect selftests and unshimmed WebKit results, a loop D2 precondition (W-I.1 §1) |
| CUR:39 | CUR:39 | open | FOLD | W-L.1 | seat | O-65 P-1 ANSWERED (measured against 10.1.0's `layout="detached"`, W-L.1:94), P-2 DECLINE with a recipe (W-L.1 §3.1, §3.2) |
| CUR:40a | CUR:40 | open | FOLD | W-B.4 | owner (OW-7) | O-74 §4, the confirm: seat default `useConfirm()`, built in W-L.1 §3.19 |
| CUR:40b | CUR:40 | open | RETIRE | W-L.1 | seat | O-74 §5, slug identity: DECLINE with a recipe (W-L.1 §3.8) |
| CUR:40c | CUR:40 | open | RETIRE | W-L.1 | seat | O-74 §7, the page gutter: ANSWERED, `--space-section` (W-L.1 §3.9) |
| CUR:40d | CUR:40 | open | FOLD | W-B.4 | owner (OW-7) | O-74 §9, the slider coarse floor: seat default 44 px hit area by slop in W-E.7 |
| CUR:40e | CUR:40 | open | RETIRE | W-L.1 | seat | O-74 §13, `./search`: DECLINE (W-L.1 §3.10) |
| CUR:40f | CUR:40 | open | BUILD | W-E.7 | seat | erratum E-2, one coarse-pointer type model (W-E.7 §8) |
| CUR:40g | CUR:40 | open | FOLD | W-B.2 | seat | the CURED@HEAD claims confirmed or refuted by measurement (W-B.2 §3.7; A2-VA-L2-6 withdrawn by E-1) |
| CUR:40h | CUR:40 | open | FOLD | W-B.2 | seat | a landing version per group, in the reply (W-B.2 §3.8) |
| CUR:41 | CUR:41 | open | BUILD | W-B.2 | seat | the reply letter to value-js-30 and lot-assay-e0 (W-B.2 §8) |
| CUR:42 | CUR:42 | done | RETIRE | — | seat | CURED: round 6's registry seat folded the census gaps (`844eddc1`; the round-6 corrections at `audit/REGISTRY.md:277, 320, 340, 562, 667-668, 1274, 1409`) |
| CUR:43 | CUR:43 | open | FOLD | W-I.1 | seat | the rim's owner-record conflict read as an opt-in plate seat; the glance is W-B.4's (OW-7) |
| CUR:44 | CUR:44 | open | BUILD | W-0.4 | seat | the menu contract's fixed 30 ms wait replaced by a wait on the focus event (W-0.4 §8) |
| CUR:45 | CUR:45 | open | BUILD | W-0.2 | seat | O-76 folds with the O-66 grey measure; landing version set by W-0.7 (W-0.2 §8, W-0.7 §8) |
| CUR:47 | CUR:47 | open | FOLD | W-0.7 | seat | every consumer on 10.1.0 exact; "O-62 unscheduled" superseded by 10.2.0; any surface still contrast-unreachable returns as a measured O-62 addendum through the relay (W-0.7 §8) |
| CUR:48 | CUR:48 | open | BUILD | W-0.7 | seat · docket | the 10.2.0 cut with the owner's in-session go, the relay, the per-consumer trap census offered (W-0.7 §8) |
| CUR:49 | CUR:49 | open | FOLD | W-J.1 | seat | the D4 family-B critic split, ruled on measurements by loop D4's pass-2 agglomerate (CUR:64), which gates W-J.1. W-J.1's spec does not name it [M] |
| CUR:75 | CUR:75, 78 | ruled | UNPLACED | — | — | O-83 into band 0 (10.2.0): no band-0 wave exists for it (§8 U-1) |
| CUR:76 | CUR:76, 78 | ruled | UNPLACED | — | — | O-77a amends W-0.3; W-0.3's spec contradicts it (§8 U-3) |
| CUR:79 | CUR:79 | ruled | UNPLACED | — | — | O-84 and O-84a into band 0's dock-surface wave, which INDEX lacks (§8 U-1) |
| CUR:80a | CUR:80 | ruled | UNPLACED | — | — | O-74b into band 0 as `--type-title`: no wave (§8 U-2) |
| CUR:80b | CUR:80 | ruled | UNPLACED | — | — | O-85 into the 11.0.0 dock band with O-65: W-I.1 does not name it (§8 U-4) |
| CUR:80c | CUR:80 | ruled | RETIRE | W-L.1 | seat | O-86: DECLINE with a recipe, the shape ruled against the Slider-marks split (W-L.1 §3.20) |
| PLAN-§6-D5 | PLAN:336 | open | UNPLACED | — | — | loop D5 has no portfolio; no seat or wave opens it (§8 U-12) |
| PLAN-§6-D3 | PLAN:337 | open | FOLD | W-0.1 | seat | D3 has no REGISTRY at `dabfc26f` (measured); W-0.1, W-H.1 and W-H.2 wait on the D3 gate, and 10.2.0 waits on W-0.1 |
| PLAN-§6-R2-05 | PLAN:338 | open | BUILD | W-A.2 | seat | the R2-05 roster is re-derived (W-A.2 §1) |
| PLAN-§6-O-65 | PLAN:339 | open | FOLD | W-L.1 | seat | P-1 measured against 10.1.0 before ruling (W-L.1:94) |

## 6 · Rows the wave specs ask this ledger to write

### 6.1 W-B.1 §3.3: the seven orphan route names, and BG's onward block (§3.5)

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| W-CONTROL-REGISTER | W-B.1 §3.3 | orphan | FOLD | W-C.4 | seat | the dead `.input-pill` selectors (22 lines, 0 producers); W-C.4 §1 names the W-B.1 folds |
| W-GLASS-DEDUP | W-B.1 §3.3 | orphan | RETIRE | — | seat | CURED at HEAD: `glass-panel` retired, one plate; its provenance comment is W-C.2's |
| W-CONTROL-CHASSIS | W-B.1 §3.3 | orphan | FOLD | W-C.4 | seat | a third control-size authority (`controlSizeClass`, `--control-pill-h`); W-C.4 §1 names it |
| W-BLUR-LADDER | W-B.1 §3.3 | orphan | FOLD | W-H.2 | seat | the F48 blur ladder (OW-8); W-H.2 §1 |
| W-SLIDER-PROGRESS | W-B.1 §3.3 | orphan | FOLD | W-H.1 | seat | `Progress.vue:138`, the value mark and the progress fill [M] |
| DIRECTORY-SHAPE | W-B.1 §3.3 | orphan | FOLD | W-D.1 | seat | the directory shape (loop D1) |
| CT-7 | W-B.1 §3.3 | orphan | FOLD | W-A.5 | seat | CSS partials in `dist` that no published entry reaches: surface exactness over every subpath [M] |
| BG-ONWARD-1 | W-B.1 §3.5 | deferred | FOLD | W-G.1 | seat | the default-Safari WebGPU promote (W-G.1 §1 names the W-B.1 folds) |
| BG-ONWARD-2 | W-B.1 §3.5 | deferred | RETIRE | — | seat | the in-shader squircle corner: the corner is the surface's CSS radius; no consumer or owner line names it |
| BG-ONWARD-3 | W-B.1 §3.5 | deferred | FOLD | W-G.1 | seat | the `flow.wgsl.ts` curl tail and its GLSL twin (W-G.1 §1) |
| BG-ONWARD-4 | W-B.1 §3.5 | deferred | BANKED | — | seat | the iOS-27 gyroscope specular feed: `requestPermission()` inside a user gesture is not a library's to own; 0 `deviceorientation` sites. Re-trigger: a consumer ask |
| BG-ONWARD-5 | W-B.1 §3.5 | deferred | RETIRE | — | seat | the deckle torn-paper param: BG fenced it (skeuomorphic restraint); no consumer names it |
| BG-ONWARD-6 | W-B.1 §3.5 | deferred | RETIRE | — | seat | anisotropic crayon grain: the paper register is `--paper-grain-tooth` with `--paper-grain-relief` |
| BG-ONWARD-7 | W-B.1 §3.5 | deferred | RETIRE | — | seat | the raster paper fallback: a masking fallback (E-2) |
| BG-ONWARD-8 | W-B.1 §3.5 | deferred | FOLD | W-C.4 | seat | the GU-1 holdout (`--shadow-sm…2xl`): a shadcn-default ladder (W-C.4 §1) |
| BG-ONWARD-9 | W-B.1 §3.5 | deferred | RETIRE | — | seat | CURED elsewhere: LENS-SAFARI → BI P132 (L04-F21) |
| BG-ONWARD-10 | W-B.1 §3.5 | deferred | RETIRE | — | seat | the metallic aurora, retired at BI (`BI/PLAN.md:127`) |
| BG-ONWARD-11 | W-B.1 §3.5 | deferred | RETIRE | — | seat | perfect-freehand, declined (L04-F21) |
| BG-ONWARD-12 | W-B.1 §3.5 | deferred | RETIRE | — | seat | CURED: the goo-blob rename shipped at 5.0.0 (L04-F21) |

### 6.2 Rows other specs hand to this ledger

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| F-69 | W-L.4 §8 | open | BUILD | W-L.4 | seat | the census holds no row: scaena's vendored 8.0.3 and the drag-morph fix upstreamed, each fork leg with a terminal (W-L.4 §3.5); the repin is scaena's act |
| F-72 | W-L.5 §8 | open | BUILD | W-L.5 | seat | the census holds no row: every malformed colour throws `GlassColorError`; the cut waits on value.js 4.1.0 (`npm view` → 4.0.0), the publish ask relayed |
| #70 | W-L.8 §3.3 | duty | RETIRE | W-L.8 | seat | archaeology regeneration per close: `FINAL.md` §1-§2 print the `git log` commands, one record |
| #15 | W-L.8 §3.3 | duty | RETIRE | W-L.8 | seat | provenance hooks: BI deleted the hook farm (`d17153ec`); provenance is the SLSA attestation; the stale `core.hooksPath` is unset at the close |
| Q063 | W-L.8 §3.3 | duty | RETIRE | W-L.8 | owner (docket) | unverified since 07-28; shown to the owner in the close confirmation |
| REKA-TRAP-WALKER | W-K.1 §8 | outbound ask | FOLD | W-K.1 | seat | the report to reka that FocusScope's walker does not descend shadow roots (reka 2.10.1 `FocusScope/utils.js:42`); W-K.1 owns it |
| VREVEAL-HOOK | W-0.4 §3 decision 3 | open | FOLD | W-L.6 | seat | the exported `vReveal` directive's `data-reveal` hook (0 sibling consumers): W-L.6's per-symbol census rules every published symbol; W-L.6 does not name it [M] |
| WEBKIT-ACCORDION-CRASH | W-I.3 §8 | recorded | UNPLACED | — | — | Playwright WebKit crashed when a tap opened the Accordion; W-I.3 routes it to W-A.1 for a minimal reproduction, and W-A.1 does not carry it (§8 U-11) |
| B-5 | W-B.2 §8, W-L.1 §8 | promise | BUILD | W-L.1 | seat | the DarkModeToggle decorative seat promised on #64 (L11-05) |

### 6.3 W-B.2's intake: letters that never reached INBOUND (W-B.2 §2, §3.6)

These carry the sender's id (`value.js:O-nn`), since the glass and value.js id spaces collide.

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| value.js:O-28 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | read against BK's O-26 ledger (`o26-disposition/LEDGER.md:885`, KF.W7) and answered by that line where it answers |
| value.js:O-30 | W-C.5 §8 | unrowed | BUILD | W-C.5 | seat | four colour resolvers, `resolveTokenColor`'s docblock; W-C.5 §8 closes O-30 |
| value.js:O-31 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | as O-28 |
| value.js:O-36 | W-L.5 §8 | unrowed | BUILD | W-L.5 | seat | the value.js colour boundary (F-72) |
| value.js:O-47 | W-L.1 §8 | unrowed | BUILD | W-L.1 | seat | the field readout seam |
| value.js:O-48 | W-D.1 §9 | unrowed | FOLD | W-D.1 | seat | `./avatar`, answered by W-D.1's door rule |
| value.js:O-49 | W-G.4 §9 | unrowed | BUILD | W-G.4 | seat | a strip-scale aurora on the CSS substrate |
| value.js:O-50 | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | carried, re-measured and ruled at intake by §3.4 (no route named yet) |
| value.js:O-51 | W-L.1 §8 | unrowed | BUILD | W-L.1 | seat | the search cancel glyph with Input's adornment |
| value.js:O-52 | W-G.5 §9 | unrowed | BUILD | W-G.5 | seat | the blob renders sRGB on a p3 display |
| value.js:O-63 | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | FW14U: 48 routed rows plus three new, rowed at intake |
| value.js:O-65 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | FW14H-OA50, routed by W-B.2 to W-J.1; W-J.1's spec does not name it, so it stays on the intake until W-J.1 carries it |
| value.js:O-67 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | TILE-PRIMITIVE, routed to W-J.1; as O-65 |
| value.js:O-69 | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | the 33 KFA rows read against 10.0.1; the KFA rows themselves are appendix A's |
| value.js:O-70 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | UIA-KF-078, the Select selected mark, re-measured at intake |
| value.js:O-71 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | UIA-V-537, `Dialog placement="right"` translucent, routed to W-E.2 with W-H.2; W-E.2 does not name it |
| value.js:O-72 | W-L.2 §8 | unrowed | BUILD | W-L.2 | seat | the Tooltip's `delayed-open` state (R4-01-18) |
| value.js:O-73 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | the dock ring colour seam, routed to W-K.4; W-K.4 does not name it |
| COHESION-4a | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | the 27 producer rows of value.js `X/COHESION.md` §4a (F3-*, KFW12-*, F10-*), rowed at intake; KFW12-2..5 are W-L.1's (W-L.1 §8) |
| ATLAS-BATCH | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | the atlas 2026-08-03 batch, 20 rows (L11-04) |
| SCI-BEAD | W-B.2 §2 | unrowed | FOLD | W-B.2 | seat | `W-BEAD-TABLE` and `W-BEAD-CHIP` (L11-09) |
| chicago:N-2 | W-B.2 §3.6 | unrowed | FOLD | W-B.2 | seat | recovered from run `wf_515fb0e4` at intake, or RETIRE "content not on record" quoting the letter line |

### 6.4 Owner asks carried as chronics (F-14, registry members)

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| R2-06-01 | W-I.4 §1 | 11 asks, 0 symbols | FOLD | W-I.4 | owner (OW-9) | DISEASE: rode BI, BJ and BK (W-I.4 kind line), decided in W-I.4 (own DECIDE wave) |
| R2-06-02 | W-H.3 §1 | 19 asks | FOLD | W-H.3 | owner (OW-9) | DISEASE: rode BI, BJ and BK, decided in W-H.3 (own) |
| R2-06-03 | W-B.14 §1 | 7 asks | FOLD | W-B.14 | owner (OW-9) | DISEASE, decided in W-B.14 (own): RETIRE under E-5, the owner's words asked for |
| R3-01-16 | W-B.15 §1 | BDU R11, R56 | FOLD | W-B.15 | owner (OW-9) | DISEASE, decided in W-B.15 (own): R11 RETIRE recommended, R56 FOLD to the dock loop (W-I.1 does not yet name the glide, §8 F-8) |
| R2-06-04 | W-B.9 §1, W-G.4 §1 | decide row | FOLD | W-G.4 | seat | the viz interaction contract; the constellation half decided in W-B.9 |
| R2-06-08 | W-B.4 §1 | never executed | BUILD | W-E.10 | owner (OW-7) | per-page aurora presets and the header one rung down, seat default (W-B.4 §1, W-E.10 §8) |
| L05b-01 | W-B.3 §1 | 89 of 261 BI rows | BUILD | W-B.3 | seat | every owner ask mapped to a BL family or a DECLINE quoting the owner |

## 7 · Inbound rows outside INBOUND-MAP

INBOUND-MAP maps O-53 to O-80 and C-2 (442 rows, appendix A). The letters and sub-rows below arrived later or sit in INBOUND.md only.

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| O-59 | IN:15 | letter | FOLD | W-B.2 | seat | 290 rows, each in appendix A; the reply answers each |
| O-60 | IN:16 | letter | FOLD | W-B.2 | seat | 33 rows, each in appendix A |
| O-74 | IN:28 | letter | FOLD | W-B.2 | seat | 65 map rows in appendix A; the rulings are CUR:40a-h (§5) |
| O-74 E-2 | IN:28 | erratum | BUILD | W-E.7 | seat | one coarse-pointer type model (W-E.7 §8) |
| O-74 E-5 | IN:28 | erratum | BUILD | W-E.7 | seat | value.js's 11 px `text-micro` joins the micro floor (A2-KE-L2-14's row) |
| O-74 E-6 | IN:28 | erratum | FOLD | W-B.2 | seat | the sender's open-at-HEAD statuses are source readings on 7.0.0; W-B.2 re-measures (§3.7) |
| O-81 (1) | IN:35 | confirmed | BUILD | W-I.1 | seat | DOCK-END-INSET, a D2 pass-3 checklist row (W-I.1 §8) |
| O-81 (2) | IN:35 | confirmed | BUILD | W-I.1 | seat | DOCK-FIRST-EXPAND (W-I.1 §8) |
| O-81 (3) | IN:35 | confirmed | BUILD | W-I.1 | seat | DOCK-MOBILE-SCALE-COARSE, reading W-E.7's coarse model (W-I.1 §8) |
| O-81 (4) | IN:35 | confirmed | BUILD | W-0.4 | seat | DATA-REVEAL-COLLISION: the seam's attribute namespaced (W-0.4 §8) |
| O-81 (5) | IN:35 | confirmed | BUILD | W-0.6 | seat | SEEDFIELD-DRAW-ORDER: `z` from its own stream; the opt-in to the old order declined as a dual path (W-0.6 §8) |
| O-82 | IN:36 | confirmed | BUILD | W-L.1 | seat | POPOVER-ANCHOR: one declared `reference` on PopoverContent and TooltipContent (G-L1-6, W-L.1 §3.6). Ruled into band 0 (IN:36, CUR:79), which has no wave for it, so it lands at 11.0.0 unless band 0 gains it (§8 U-5) |
| O-83 | IN:37 | confirmed | UNPLACED | — | — | DOCK-CAP-ELLIPSE (§8 U-1) |
| O-84 | IN:38 | confirmed | UNPLACED | — | — | DOCK-SUMMARY-SQUARE (§8 U-1) |
| O-84a | IN:39 | confirmed | UNPLACED | — | — | METRIC-TOKEN-JOIN (§8 U-1) |
| O-74b | IN:40 | confirmed | UNPLACED | — | — | CARD-TITLE-RUNG (§8 U-2) |
| O-85 | IN:41 | confirmed | UNPLACED | — | — | DOCK-PRIORITY-OVERFLOW (§8 U-4) |
| O-86 | IN:42 | confirmed | RETIRE | W-L.1 | seat | DECLINE with a recipe: play/pause + speed + Slider-with-marks composes it (W-L.1 §3.20) |
| O-77a | IN:43 | confirmed | UNPLACED | — | — | LAYER-HEADER-NO-ELLIPSIS (§8 U-3) |

## 8 · Rows not placed, and why

Twelve rows or row groups have no wave in `waves/INDEX.md` whose spec covers them. Each needs the act named; none is re-booked by this file.

| id | rows | why it cannot be placed | the act it needs |
|---|---|---|---|
| U-1 | O-83, O-84, O-84a (CUR:75, 79) | ruled into "band 0's dock-surface wave" before W-0.7 (CUR:79, IN:37-39). INDEX has seven band-0 waves and none is that wave; W-I.1 depends on it by name (`W-I.1.md:11`) and W-I.1 §3.4 disposes of its cures. W-0.7's dependency list and CHANGELOG plan omit the three rows | a band-0 wave spec (cap rest as a measured length; the summary square lock dropped with the min-size floor kept; `.metric__value` content-sized), its INDEX row, and W-0.7's dependency |
| U-2 | O-74b (CUR:80) | ruled into band 0 as `--type-title` at the existing size (IN:40); no spec names `--type-title` or `card-title` in this sense (0 hits) | a band-0 wave row (or an amendment to an existing band-0 spec) with the witness IN:40 states |
| U-3 | O-77a (CUR:76) | it supersedes O-77's ask: neither header line ellipsizes, stacked when it does not fit (IN:43). W-0.3's cure keeps `truncate` on the name and lets the sub-label truncate (W-0.3 §3), which is the behaviour O-77a rejects | a re-spec of W-0.3 with O-77a's born-RED witness (no ellipsis on either line at any header width) |
| U-4 | O-85 (CUR:80) | ruled to the 11.0.0 dock band with O-65 (IN:41). W-I.1 does not name it and `design/dock/REGISTRY.md` has 0 hits for O-85 or a priority fold | a D2 witness row and a W-I.1 scope line |
| U-5 | O-82's landing | placed in W-L.1 (11.0.0), which carries the prop; ruled for 10.2.0 (IN:36, CUR:79) with no band-0 wave | the same band-0 act as U-1, or an owner-visible note that it lands at 11.0.0 |
| U-6 | #31f RT-31F, #33b the ToastTitle weight collision | F-41 items; W-E.5's scope is store, queue, announce channel, named items and placement, and its spec does not mention a title weight | a W-E.5 scope line |
| U-7 | #31g RT-31G | W-H.1 builds the rendered-contrast invariant but says "the #31 items routed to F-23 close in band K" (W-H.1 §1); PLAN §7 row K names them; no band-K spec does | W-H.1 closing it on its invariant, or a band-K spec naming it |
| U-8 | #49e, the aurora F1 pause question (`aurora-hero.ts:278-281`) | routed to F-42 (a:56); W-K.6 does not name it | a W-K.6 row |
| U-9 | #53c, FourierField's `live`/`inertReason`/`note` | routed with #52 to F-34 (b:43); W-E.10 builds `#transport` only | a W-E.10 line, or a RETIRE with rationale |
| U-10 | #54b, leg (v): the glass-material 1.0× tile DPR | not re-measured by the census (b:44) and named by no spec | a measurement, then a W-G.1 line or a RETIRE |
| U-11 | WEBKIT-ACCORDION-CRASH | W-I.3 §8 routes it to W-A.1; W-A.1 closes F-05's six members and does not carry it | a W-A.1 row (a minimal reproduction; the Accordion's WebKit cell stays UNMEASURED until then) |
| U-12 | PLAN-§6-D5 | W-J.2 is placed and depends on the D5 gate, but no loop D5 exists: no portfolio, no seat (PLAN:336). #27, #77a, D-2 and GAP-2 wait on it | a formation act: open D5 with a round-0 portfolio, or an owner ruling that puts the rung in D4's or D2's scope |

Other findings from placing the rows (not unplaced rows):

- **F-1. BANKED is missing from W-B.1's checker.** W-B.1 §3.2 accepts six words and would reject the eight BANKED rows here; the charter names "banked with a named re-trigger" (CH:44).
- **F-2. Rows placed by mechanism only.** 87 appendix rows carry `[M]`, among them W-E.7 41, W-E.4 19, W-L.2 6, W-E.2 5, W-E.3 4, W-L.7 4. Each wave closes its family, and INBOUND-MAP says a FAMILY row's surface joins the wave's born-RED set (IMAP:11), but no spec lists the rows. The hand tables add twelve `[M]` items (#18b, #26c, #41c, #53e, #55b, #56d, #59c, #81d, W-SLIDER-PROGRESS, CT-7, VREVEAL-HOOK, CUR:49). The formation critic should check that each wave's born-RED set reaches them.
- **F-3. Disease rows decided inside a shared wave:** #25 (W-H.2), #48, #67a and #90a (loop D2 in W-I.1), C-8 (W-E.2), C-9 (W-K.5), C-13c (W-E.9). The charter asks for a wave of its own (CH:23).
- **F-4. Conflicting terminals between specs.** A2-VA-L1-7 is CURE in W-B.2 §3.5 and DECLINE in W-L.1 §3.8; this file takes W-L.1's (the owning wave).
- **F-5. P-1 in the specs.** 44 of 90 specs carry a gestalt-pass section; PLAN §1 requires the three passes of every implemented wave.
- **F-6. PLAN:361** says the gates of P-5, P-7 and P-8 stay in W-A.2's roster; those laws have review steps, not gates, and W-A.2 names only E-12 and E-13.
- **F-7. W-H.4 §8** cites #60's one-context arm to W-G.6; W-G.1 §9 closes it.
- **F-8. Hand-offs the target spec does not carry:** W-B.15's R56 glide → W-I.1; W-I.4's S1 verb → W-K.6; W-H.3's S10 → W-B.3; W-B.2's value.js O-65/O-67 → W-J.1, O-71 → W-E.2, O-73 → W-K.4 (held on W-B.2's intake in §6.3).
- **F-9. HEAD.** The task named `f3ad78d0`; this file was read from `dabfc26f` and checked at `b2fb3042`. Every commit between is under `docs/`.

## 9 · Counts

Counted by a script over this file's row tables (§4 is the docket and is counted apart). No row id repeats.

| section | BUILD | FOLD | BANKED | RETIRE | UNPLACED | rows |
|---|---|---|---|---|---|---|
| §1 register carries (67 census rows, as item rows) | 108 | 33 | 0 | 25 | 6 | 172 |
| §2 BK §7 carries | 11 | 1 | 0 | 8 | 0 | 20 |
| §3 recap rows and charter laws | 43 | 11 | 0 | 10 | 0 | 64 |
| §5 carried obligations and PLAN §6 gaps | 6 | 16 | 0 | 6 | 6 | 34 |
| §6 rows the specs hand to the ledger | 12 | 31 | 1 | 12 | 1 | 57 |
| §7 inbound outside the map | 8 | 4 | 0 | 1 | 6 | 19 |
| Appendix A, INBOUND-MAP | 298 | 32 | 7 | 105 | 0 | 442 |
| **total** | **486** | **128** | **8** | **167** | **19** | **808** |

The 19 UNPLACED item rows are the twelve groups of §8. Rows marked DISEASE: 44. Owner docket: 15 lines, 13 pending an owner word.

Appendix A by coverage tag: `[N]` 270, `[M]` 87, `[R]` 67, `[G]` 18. By INBOUND-MAP status: FAMILY 360, CURED-AT-HEAD 52, CONSUMER-SIDE 21, NOT-REPRODUCED 6, NEW 3.

## Appendix A · INBOUND-MAP rows (442)

One row per map row, in the map's order. The id is the map's first cell, verbatim, so W-B.1's checker can read the set from `INBOUND-MAP.md`. The map's `C-2 (1)`..`C-2 (3)` are chicago's letter rows, distinct from BK's carry C-2 (§2).

| row | source | HEAD word | terminal | wave | ruler | rationale |
|---|---|---|---|---|---|---|
| UIA-V-60 | O-59 · IMAP:121 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-V-92 | O-59 · IMAP:122 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED under D4 Q-10 (b) and the role table: a one-line pill stays a stadium; paired capture put to the owner in the W-B.4 docket (W-J.1 §1) [N] |
| UIA-V-136 | O-59 · IMAP:123 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED under D4 Q-10 (b) and the role table: a one-line pill stays a stadium; paired capture put to the owner in the W-B.4 docket (W-J.1 §1) [N] |
| UIA-V-152 | O-59 · IMAP:124 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:124; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-153 | O-59 · IMAP:125 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:125; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-180 | O-59 · IMAP:126 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-KF-046 | O-59 · IMAP:127 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-KF-047 | O-59 · IMAP:128 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-F-85 | O-59 · IMAP:129 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-F-100 | O-59 · IMAP:130 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-V-219 | O-59 · IMAP:131 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED: the dock radii are on canon; the nested read is the one-line pill rule (W-J.1 §1) [N] |
| UIA-V-332 | O-59 · IMAP:132 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-V-360 | O-59 · IMAP:133 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED: the dock radii are on canon; the nested read is the one-line pill rule (W-J.1 §1) [N] |
| UIA-V-377 | O-59 · IMAP:134 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:134; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-KF-111 | O-59 · IMAP:135 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-KF-156 | O-59 · IMAP:136 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED under D4 Q-10 (b) and the role table: a one-line pill stays a stadium; paired capture put to the owner in the W-B.4 docket (W-J.1 §1) [N] |
| UIA-F-141 | O-59 · IMAP:137 | FAMILY | BUILD | W-J.1 | seat | F-30b; the wave names the row [N] |
| UIA-V-510 | O-59 · IMAP:138 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED under D4 Q-10 (b) and the role table: a one-line pill stays a stadium; paired capture put to the owner in the W-B.4 docket (W-J.1 §1) [N] |
| UIA-V-515 | O-59 · IMAP:139 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED under D4 Q-10 (b) and the role table: a one-line pill stays a stadium; paired capture put to the owner in the W-B.4 docket (W-J.1 §1) [N] |
| UIA-V-6 | O-59 · IMAP:145 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:145); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-24 | O-59 · IMAP:146 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:146); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-KF-032 | O-59 · IMAP:147 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-F-6 | O-59 · IMAP:148 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-F-8 | O-59 · IMAP:149 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:149; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-F-10 | O-59 · IMAP:150 | NOT-REPRODUCED | BANKED | W-B.2 | seat | NOT-REPRODUCED at HEAD (IMAP:150). Re-trigger: a consumer capture that reproduces it; the reply names the nearest live mechanism [R] |
| UIA-F-11 | O-59 · IMAP:151 | NOT-REPRODUCED | BANKED | W-F.2 | seat | NOT-REPRODUCED as stated; live sibling R4-01-06 cured in W-F.2. Re-trigger: a reproduction after W-F.2 lands (W-F.2 §9) [N] |
| UIA-V-67 | O-59 · IMAP:152 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-68 | O-59 · IMAP:153 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-75 | O-59 · IMAP:154 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:154); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-76 | O-59 · IMAP:155 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-78 | O-59 · IMAP:156 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:156; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-85 | O-59 · IMAP:157 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-KF-052 | O-59 · IMAP:158 | FAMILY | FOLD | W-I.1 | seat | the tone seat is a D2 checklist item (W-B.2 §3.5) [M] |
| UIA-F-78 | O-59 · IMAP:159 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-80 | O-59 · IMAP:160 | FAMILY | BUILD | W-I.1 | seat | closed with R4-01-15 in W-I.1 (W-I.3 §1) [N] |
| UIA-F-88 | O-59 · IMAP:161 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:161; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-F-94 | O-59 · IMAP:162 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-201 | O-59 · IMAP:163 | FAMILY | RETIRE | W-J.1 | seat | ANSWERED: the dock radii are on canon; the nested read is the one-line pill rule (W-J.1 §1) [N] |
| UIA-V-235 | O-59 · IMAP:164 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-236 | O-59 · IMAP:165 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-251 | O-59 · IMAP:166 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-263 | O-59 · IMAP:167 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-V-395 | O-59 · IMAP:168 | FAMILY | BUILD | W-F.2 | seat | F-78; the wave names the row [N] |
| UIA-KF-112 | O-59 · IMAP:169 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-KF-131 | O-59 · IMAP:170 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-150 | O-59 · IMAP:171 | FAMILY | BUILD | W-K.3 | seat | F-38; the wave names the row [N] |
| UIA-F-125 | O-59 · IMAP:172 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-132 | O-59 · IMAP:173 | FAMILY | FOLD | W-I.1 | seat | W-I.1 seats W-B.8's exported DotRing (W-B.2 §3.5) [M] |
| UIA-F-137 | O-59 · IMAP:174 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-475 | O-59 · IMAP:175 | NOT-REPRODUCED | BANKED | W-B.2 | seat | NOT-REPRODUCED at HEAD (IMAP:175). Re-trigger: a consumer capture that reproduces it; the reply names the nearest live mechanism [R] |
| UIA-V-500 | O-59 · IMAP:176 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:176); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-504 | O-59 · IMAP:177 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| UIA-V-512 | O-59 · IMAP:178 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-V-522 | O-59 · IMAP:179 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-546 | O-59 · IMAP:180 | FAMILY | FOLD | W-B.2 | seat | measured at intake: reproduced → W-I.1 born-RED; not → ANSWER with the probe (W-B.2 §3.5) [N] |
| UIA-KF-236 | O-59 · IMAP:181 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-240 | O-59 · IMAP:182 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-243 | O-59 · IMAP:183 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-258 | O-59 · IMAP:184 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-215 | O-59 · IMAP:185 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:185; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-F-216 | O-59 · IMAP:186 | FAMILY | BUILD | W-0.1 | seat | closes on M-1's dock row (W-0.1 §1; W-H.2 §1 "closed elsewhere") [N] |
| UIA-F-226 | O-59 · IMAP:187 | FAMILY | BUILD | W-E.2 | seat | F-21; the wave names the row [N] |
| UIA-V-2 | O-59 · IMAP:193 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-5 | O-59 · IMAP:194 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-44 | O-59 · IMAP:195 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-139 | O-59 · IMAP:196 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-157 | O-59 · IMAP:197 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:197; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-208 | O-59 · IMAP:198 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-209 | O-59 · IMAP:199 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:199; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-213 | O-59 · IMAP:200 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:200; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-214 | O-59 · IMAP:201 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-220 | O-59 · IMAP:202 | FAMILY | FOLD | W-E.4 | seat | recorded by W-K.6 §1 as FOLD → W-E.4 (Select list block ceiling and scroll cue); W-E.4's spec does not name the rows [M] |
| UIA-V-365 | O-59 · IMAP:203 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-381 | O-59 · IMAP:204 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-388 | O-59 · IMAP:205 | FAMILY | BUILD | W-E.2 | seat | F-21; the wave names the row [N] |
| UIA-V-392 | O-59 · IMAP:206 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-138 | O-59 · IMAP:207 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-V-472 | O-59 · IMAP:208 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-476 | O-59 · IMAP:209 | FAMILY | FOLD | W-E.4 | seat | recorded by W-K.6 §1 as FOLD → W-E.4 (Select list block ceiling and scroll cue); W-E.4's spec does not name the rows [M] |
| UIA-V-482 | O-59 · IMAP:210 | NOT-REPRODUCED | BANKED | W-B.2 | seat | NOT-REPRODUCED at HEAD (IMAP:210). Re-trigger: a consumer capture that reproduces it; the reply names the nearest live mechanism [R] |
| UIA-V-601 | O-59 · IMAP:211 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:211); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-612 | O-59 · IMAP:212 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-613 | O-59 · IMAP:213 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-222 | O-59 · IMAP:214 | FAMILY | BUILD | W-E.2 | seat | F-21 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-268 | O-59 · IMAP:215 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-V-29 | O-59 · IMAP:221 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:221; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-88 | O-59 · IMAP:222 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:222; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-97 | O-59 · IMAP:223 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-V-113 | O-59 · IMAP:224 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-58 | O-59 · IMAP:225 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-221 | O-59 · IMAP:226 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-222 | O-59 · IMAP:227 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-225 | O-59 · IMAP:228 | FAMILY | BUILD | W-E.7 | seat | F-29; the wave names the row [N] |
| UIA-V-254 | O-59 · IMAP:229 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-V-261 | O-59 · IMAP:230 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-271 | O-59 · IMAP:231 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-293 | O-59 · IMAP:232 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-306 | O-59 · IMAP:233 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-113 | O-59 · IMAP:234 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-130 | O-59 · IMAP:235 | FAMILY | RETIRE | W-E.8 | seat | CURED at HEAD (off-ladder half, `row: 10`) and ANSWERED (concentric half, W-E.8 §3.4) [N] |
| UIA-KF-136 | O-59 · IMAP:236 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-F-126 | O-59 · IMAP:237 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-F-127 | O-59 · IMAP:238 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-128 | O-59 · IMAP:239 | FAMILY | FOLD | W-H.1 | seat | recorded by W-K.6 §1 as FOLD → W-H.1 (the menu row's current leg); W-H.1's spec does not name the row [M] |
| UIA-V-511 | O-59 · IMAP:240 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-517 | O-59 · IMAP:241 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-V-518 | O-59 · IMAP:242 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:242; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-520 | O-59 · IMAP:243 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-523 | O-59 · IMAP:244 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-539 | O-59 · IMAP:245 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:245; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-KF-247 | O-59 · IMAP:246 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-F-217 | O-59 · IMAP:247 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-32 | O-59 · IMAP:253 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-34 | O-59 · IMAP:254 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-V-54 | O-59 · IMAP:255 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-13 | O-59 · IMAP:256 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-069 | O-59 · IMAP:257 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-F-56 | O-59 · IMAP:258 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-77 | O-59 · IMAP:259 | FAMILY | BUILD | W-E.4 | seat | F-71; the wave names the row [N] |
| UIA-V-229 | O-59 · IMAP:260 | FAMILY | BANKED | W-I.3 | seat | NOT REPRODUCED at HEAD; G5 is the hold line. Re-trigger: G5 goes red, or a consumer capture reproduces it (W-I.3 §8) [N] |
| UIA-V-262 | O-59 · IMAP:261 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-287 | O-59 · IMAP:262 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-457 | O-59 · IMAP:263 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-KF-144 | O-59 · IMAP:264 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:264; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-F-122 | O-59 · IMAP:265 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-F-146 | O-59 · IMAP:266 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-485 | O-59 · IMAP:267 | FAMILY | RETIRE | W-E.8 | seat | CURED at HEAD (off-ladder half, `row: 10`) and ANSWERED (concentric half, W-E.8 §3.4) [N] |
| UIA-V-558 | O-59 · IMAP:268 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:268; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-564 | O-59 · IMAP:269 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:269; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-676 | O-59 · IMAP:270 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-219 | O-59 · IMAP:271 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-220 | O-59 · IMAP:272 | FAMILY | BANKED | W-I.3 | seat | NOT REPRODUCED at HEAD; G5 is the hold line. Re-trigger: G5 goes red, or a consumer capture reproduces it (W-I.3 §8) [N] |
| UIA-KF-005 | O-59 · IMAP:278 | FAMILY | BUILD | W-E.3 | seat | F-32 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-27 | O-59 · IMAP:279 | FAMILY | BUILD | W-0.1 | seat | plate half closes on M-1's Dialog row (W-0.1 §1); its 3.2:1 ink half is W-H.1's (W-H.1 §1) [N] |
| UIA-F-44 | O-59 · IMAP:280 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-115 | O-59 · IMAP:281 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:281; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-KF-058 | O-59 · IMAP:282 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-107 | O-59 · IMAP:283 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-296 | O-59 · IMAP:284 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:284); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-297 | O-59 · IMAP:285 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-V-325 | O-59 · IMAP:286 | FAMILY | BUILD | W-E.2 | seat | F-21 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-328 | O-59 · IMAP:287 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-410 | O-59 · IMAP:288 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-441 | O-59 · IMAP:289 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:289; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-444 | O-59 · IMAP:290 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-216 | O-59 · IMAP:291 | FAMILY | FOLD | W-E.3 | seat | recorded by W-K.6 §1 as FOLD → W-E.3 (a grab handle with a tap opener); W-E.3's spec does not name the rows [M] |
| UIA-F-123 | O-59 · IMAP:292 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-124 | O-59 · IMAP:293 | FAMILY | BUILD | W-E.3 | seat | F-71; the wave names the row [N] |
| UIA-F-148 | O-59 · IMAP:294 | FAMILY | RETIRE | W-K.3 | seat | CURED at HEAD; hold line in W-K.3 (W-K.3 §8) [N] |
| UIA-V-548 | O-59 · IMAP:295 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-633 | O-59 · IMAP:296 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:296; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-636 | O-59 · IMAP:297 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-239 | O-59 · IMAP:298 | FAMILY | BUILD | W-K.3 | seat | F-38; the wave names the row [N] |
| UIA-KF-252 | O-59 · IMAP:299 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-KF-253 | O-59 · IMAP:300 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| UIA-KF-255 | O-59 · IMAP:301 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-F-229 | O-59 · IMAP:302 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-38 | O-59 · IMAP:308 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-114 | O-59 · IMAP:309 | FAMILY | BUILD | W-H.1 | seat | F-23; the wave names the row [N] |
| UIA-V-159 | O-59 · IMAP:310 | FAMILY | BUILD | W-I.1 | seat | F-18; the wave names the row [N] |
| UIA-V-165 | O-59 · IMAP:311 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-075 | O-59 · IMAP:312 | FAMILY | BUILD | W-H.1 | seat | F-23; the wave names the row [N] |
| UIA-V-292 | O-59 · IMAP:313 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-347 | O-59 · IMAP:314 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-350 | O-59 · IMAP:315 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-V-399 | O-59 · IMAP:316 | FAMILY | BUILD | W-I.1 | seat | F-18; the wave names the row [N] |
| UIA-F-131 | O-59 · IMAP:317 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-133 | O-59 · IMAP:318 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-F-147 | O-59 · IMAP:319 | FAMILY | BUILD | W-E.7 | seat | F-71; the wave names the row [N] |
| UIA-V-544 | O-59 · IMAP:320 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:320; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-549 | O-59 · IMAP:321 | FAMILY | BUILD | W-E.7 | seat | F-71; the wave names the row [N] |
| UIA-V-618 | O-59 · IMAP:322 | FAMILY | BUILD | W-I.1 | seat | F-18; the wave names the row [N] |
| UIA-V-666 | O-59 · IMAP:323 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-286 | O-59 · IMAP:324 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-221 | O-59 · IMAP:325 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-112 | O-59 · IMAP:331 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-91 | O-59 · IMAP:332 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-224 | O-59 · IMAP:333 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-253 | O-59 · IMAP:334 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-259 | O-59 · IMAP:335 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-299 | O-59 · IMAP:336 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-314 | O-59 · IMAP:337 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-389 | O-59 · IMAP:338 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-445 | O-59 · IMAP:339 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-192 | O-59 · IMAP:340 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-254 | O-59 · IMAP:341 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-222 | O-59 · IMAP:342 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-90 | O-59 · IMAP:348 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-106 | O-59 · IMAP:349 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-V-234 | O-59 · IMAP:350 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-V-246 | O-59 · IMAP:351 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:351); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-309 | O-59 · IMAP:352 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:352; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-311 | O-59 · IMAP:353 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:353; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-312 | O-59 · IMAP:354 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:354; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-315 | O-59 · IMAP:355 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:355; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-329 | O-59 · IMAP:356 | FAMILY | BUILD | W-H.1 | seat | F-23; the wave names the row [N] |
| UIA-V-344 | O-59 · IMAP:357 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: one consumer; Surface + `useDropZone` + the house focus ring (W-B.2 §3.5) [N] |
| UIA-V-431 | O-59 · IMAP:358 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-KF-166 | O-59 · IMAP:359 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:359; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-F-129 | O-59 · IMAP:360 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-V-562 | O-59 · IMAP:361 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:361); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-568 | O-59 · IMAP:362 | FAMILY | BUILD | W-H.1 | seat | F-23; the wave names the row [N] |
| UIA-KF-042 | O-59 · IMAP:368 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-84 | O-59 · IMAP:369 | FAMILY | BUILD | W-J.2 | seat | F-71; the wave names the row [N] |
| UIA-KF-106 | O-59 · IMAP:370 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-135 | O-59 · IMAP:371 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-V-465 | O-59 · IMAP:372 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:372; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-594 | O-59 · IMAP:373 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-226 | O-59 · IMAP:374 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-KF-280 | O-59 · IMAP:375 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: a keyframe rail is keyframes.js's editor; SortableList + Slider compose it (W-B.2 §3.5) [N] |
| UIA-F-230 | O-59 · IMAP:376 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-V-166 | O-59 · IMAP:382 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:382; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-417 | O-59 · IMAP:383 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:383; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-436 | O-59 · IMAP:384 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:384; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-440 | O-59 · IMAP:385 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:385; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-452 | O-59 · IMAP:386 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:386; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-456 | O-59 · IMAP:387 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-554 | O-59 · IMAP:388 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:388); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-669 | O-59 · IMAP:389 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:389; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-144 | O-59 · IMAP:395 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:395; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| UIA-V-148 | O-59 · IMAP:396 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:396); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-V-149 | O-59 · IMAP:397 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-151 | O-59 · IMAP:398 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-KF-167 | O-59 · IMAP:399 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-F-136 | O-59 · IMAP:400 | FAMILY | BUILD | W-E.9 | seat | F-33 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-304 | O-59 · IMAP:401 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-46 | O-59 · IMAP:407 | FAMILY | BUILD | W-G.4 | seat | F-47; the wave names the row [N] |
| UIA-V-47 | O-59 · IMAP:408 | FAMILY | BUILD | W-G.5 | seat | F-50; the wave names the row [N] |
| UIA-V-48 | O-59 · IMAP:409 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: value.js HeroBlob's wall-clock park, 2000 + 3300 ms (R2-03-05; W-B.2 §3.5) [N] |
| UIA-V-55 | O-59 · IMAP:410 | FAMILY | BUILD | W-G.1 | seat | F-47; the wave names the row [N] |
| UIA-V-154 | O-59 · IMAP:411 | FAMILY | BUILD | W-G.4 | seat | F-47; the wave names the row [N] |
| UIA-V-164 | O-59 · IMAP:412 | FAMILY | BUILD | W-G.5 | seat | F-48; the wave names the row [N] |
| UIA-V-186 | O-59 · IMAP:413 | FAMILY | RETIRE | W-B.2 | seat | ANSWERED: the dark field derives maroon, L 0.18-0.42 (R2-03-08; W-B.2 §3.5) [N] |
| UIA-V-192 | O-59 · IMAP:414 | FAMILY | BUILD | W-G.1 | seat | F-47; the wave names the row [N] |
| UIA-V-199 | O-59 · IMAP:415 | FAMILY | BUILD | W-G.5 | seat | F-48; the wave names the row [N] |
| UIA-V-337 | O-59 · IMAP:416 | NOT-REPRODUCED | BUILD | W-G.1 | seat | NOT-REPRODUCED as "retries init every frame"; present as a per-frame validation flood, closed by G1-G7 (W-G.1 §9) [N] |
| UIA-V-386 | O-59 · IMAP:417 | FAMILY | BUILD | W-G.5 | seat | F-50; the wave names the row [N] |
| UIA-V-50 | O-59 · IMAP:423 | FAMILY | BUILD | W-K.7 | seat | F-43; the wave names the row [N] |
| UIA-KF-015 | O-59 · IMAP:424 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-016 | O-59 · IMAP:425 | FAMILY | BUILD | W-F.4 | seat | F-76; the wave names the row [N] |
| UIA-F-41 | O-59 · IMAP:426 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-43 | O-59 · IMAP:427 | FAMILY | BUILD | W-L.2 | seat | F-70 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-48 | O-59 · IMAP:428 | FAMILY | BUILD | W-E.2 | seat | F-21; the wave names the row [N] |
| UIA-F-51 | O-59 · IMAP:429 | FAMILY | BUILD | W-E.5 | seat | F-41; the wave names the row [N] |
| UIA-V-174 | O-59 · IMAP:430 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:430); the reply states it (W-B.2 §3.4, §3.8) [R] |
| UIA-KF-055 | O-59 · IMAP:431 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: a Monaco theme is a consumer preset (E-5) (W-B.2 §3.5) [N] |
| UIA-KF-073 | O-59 · IMAP:432 | FAMILY | BUILD | W-K.6 | seat | F-42; the wave names the row [N] |
| UIA-F-60 | O-59 · IMAP:433 | FAMILY | RETIRE | W-K.2 | seat | RETIRE the Command popper arm; the Popover composition is the answer (W-K.2 §8) [N] |
| UIA-F-72 | O-59 · IMAP:434 | FAMILY | BUILD | W-B.8 | seat | F-71; the wave names the row [N] |
| UIA-F-105 | O-59 · IMAP:435 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-194 | O-59 · IMAP:436 | FAMILY | BUILD | W-E.8 | seat | F-30a mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-198 | O-59 · IMAP:437 | FAMILY | BUILD | W-H.2 | seat | F-31; the wave names the row [N] |
| UIA-V-200 | O-59 · IMAP:438 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-V-349 | O-59 · IMAP:439 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-V-354 | O-59 · IMAP:440 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-V-367 | O-59 · IMAP:441 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-V-397 | O-59 · IMAP:442 | FAMILY | BUILD | W-E.10 | seat | F-34 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-145 | O-59 · IMAP:443 | FAMILY | RETIRE | W-K.6 | seat | ANSWERED: the consumer's alias bypasses the formatter (W-K.6 §1 row 4) [N] |
| UIA-KF-146 | O-59 · IMAP:444 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-KF-147 | O-59 · IMAP:445 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-170 | O-59 · IMAP:446 | FAMILY | BUILD | W-H.1 | seat | F-23; the wave names the row [N] |
| UIA-KF-201 | O-59 · IMAP:447 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-KF-215 | O-59 · IMAP:448 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-KF-221 | O-59 · IMAP:449 | FAMILY | FOLD | W-E.5 | seat | named items; the tone glyph in the viewport's item (W-B.2 §3.5) [M] |
| UIA-F-130 | O-59 · IMAP:450 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-F-134 | O-59 · IMAP:451 | FAMILY | RETIRE | W-B.2 | seat | CURED at 10.1.0: `#actions` shipped (tag `v10.1.0` at `d8bda2a9`) (W-B.2 §3.5) [N] |
| UIA-F-139 | O-59 · IMAP:452 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-F-140 | O-59 · IMAP:453 | FAMILY | BUILD | W-E.6 | seat | F-26 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-142 | O-59 · IMAP:454 | FAMILY | BUILD | W-E.5 | seat | F-41; the wave names the row [N] |
| UIA-F-143 | O-59 · IMAP:455 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-144 | O-59 · IMAP:456 | FAMILY | BUILD | W-H.1 | seat | F-24; the wave names the row [N] |
| UIA-F-145 | O-59 · IMAP:457 | FAMILY | FOLD | W-D.1 | seat | ANSWER + FOLD: root exports exist (`src/index.ts:81,94,101,310`); per-component subpaths by W-D.1's door rule (W-B.2 §3.5, W-D.1 §9) [N] |
| UIA-F-149 | O-59 · IMAP:458 | FAMILY | BUILD | W-E.8 | seat | F-30a mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-639 | O-59 · IMAP:459 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| UIA-V-660 | O-59 · IMAP:460 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | F-15; the wave names the row [N] |
| UIA-KF-241 | O-59 · IMAP:461 | FAMILY | BUILD | W-K.4 | seat | F-39; the wave names the row [N] |
| UIA-F-224 | O-59 · IMAP:462 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: one consumer; Card + type roles (W-B.2 §3.5) [N] |
| UIA-F-225 | O-59 · IMAP:463 | FAMILY | BUILD | W-C.5 | seat | F-65; the wave names the row [N] |
| UIA-F-227 | O-59 · IMAP:464 | FAMILY | BUILD | W-E.5 | seat | F-41 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-F-57 | O-59 · IMAP:470 | FAMILY | BUILD | W-L.3 | seat | F-67 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| UIA-V-326 | O-59 · IMAP:471 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-KF-128 | O-59 · IMAP:472 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-545 | O-59 · IMAP:473 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-550 | O-59 · IMAP:474 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-581 | O-59 · IMAP:475 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-V-583 | O-59 · IMAP:476 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-KF-322 | O-59 · IMAP:477 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-218 | O-59 · IMAP:478 | FAMILY | BUILD | W-C.4 | seat | F-64; the wave names the row [N] |
| UIA-F-223 | O-59 · IMAP:479 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| UIA-F-228 | O-59 · IMAP:480 | FAMILY | BUILD | W-C.3 | seat | F-63; the wave names the row [N] |
| KFA-7 | O-60 · IMAP:490 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-8 | O-60 · IMAP:491 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-11 | O-60 · IMAP:492 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:492; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-13 | O-60 · IMAP:493 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-23 | O-60 · IMAP:494 | FAMILY | BUILD | W-G.3 | seat | F-50; the wave names the row [N] |
| KFA-27 | O-60 · IMAP:495 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:495; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-37 | O-60 · IMAP:496 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:496; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-50 | O-60 · IMAP:497 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-51 | O-60 · IMAP:498 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:498; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-52 | O-60 · IMAP:499 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:499; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-53 | O-60 · IMAP:500 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-61 | O-60 · IMAP:501 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:501); the reply states it (W-B.2 §3.4, §3.8) [R] |
| KFA-74 | O-60 · IMAP:502 | FAMILY | BUILD | W-G.3 | seat | F-50; the wave names the row [N] |
| KFA-78 | O-60 · IMAP:503 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:503; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-95 | O-60 · IMAP:504 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:504); the reply states it (W-B.2 §3.4, §3.8) [R] |
| KFA-109 | O-60 · IMAP:505 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:505; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-110 | O-60 · IMAP:506 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| KFA-111 | O-60 · IMAP:507 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:507; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-112 | O-60 · IMAP:508 | NOT-REPRODUCED | BANKED | W-F.2 | seat | NOT-REPRODUCED as stated; live sibling R4-01-06 cured in W-F.2. Re-trigger: a reproduction after W-F.2 lands (W-F.2 §9) [N] |
| KFA-115 | O-60 · IMAP:509 | FAMILY | BUILD | W-F.7 | seat | F-73; the wave names the row [N] |
| KFA-132 | O-60 · IMAP:510 | FAMILY | BUILD | W-F.1 | seat | F-44; the wave names the row [N] |
| KFA-133 | O-60 · IMAP:511 | FAMILY | BUILD | W-G.1 | seat | F-47; the wave names the row [N] |
| KFA-134 | O-60 · IMAP:512 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:512); the reply states it (W-B.2 §3.4, §3.8) [R] |
| KFA-136 | O-60 · IMAP:513 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:513); the reply states it (W-B.2 §3.4, §3.8) [R] |
| KFA-163 | O-60 · IMAP:514 | FAMILY | BUILD | W-E.2 | seat | F-21 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| KFA-164 | O-60 · IMAP:515 | FAMILY | BUILD | W-G.6 | seat | F-51; the wave names the row [N] |
| KFA-168 | O-60 · IMAP:516 | FAMILY | BUILD | W-F.1 | seat | F-44; the wave names the row [N] |
| KFA-188 | O-60 · IMAP:517 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:517; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-189 | O-60 · IMAP:518 | FAMILY | BUILD | W-I.1 | seat | F-16 mechanism; joins the wave's born-RED set (IMAP:11) [N] |
| KFA-202 | O-60 · IMAP:519 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:519; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-221 | O-60 · IMAP:520 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:520; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-222 | O-60 · IMAP:521 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD per IMAP:521; the consumer adopts at its repin (W-L.7 packet); the reply states it (W-B.2 §3.8) [R] |
| KFA-228 | O-60 · IMAP:522 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: consumer-side, no producer mechanism (IMAP:522); the reply states it (W-B.2 §3.4, §3.8) [R] |
| O-53 R-1 | O-53 · IMAP:530 | FAMILY | BUILD | W-G.7 | seat | BUILT as `./aurora-palette`; `resolveRenderMode` answered as deleted (W-G.7 §9) [N] |
| O-53 R-2 | O-53 · IMAP:531 | FAMILY | FOLD | W-B.2 | seat | ANSWERED: the removals were meant; W-B.2 adds the missing MIGRATION 7.0.0 `.btn-interactive` line (W-B.2 §3.5, §3.9) [N] |
| O-54 R-1 | O-54 · IMAP:532 | FAMILY | FOLD | W-G.2 | seat | ANSWERED: no seam; `destroy()` re-arms under the one subscription (W-G.2 §9) [N] |
| O-55 R-1 | O-55 · IMAP:533 | FAMILY | BUILD | W-I.1 | seat | the opt-in scroll-compact state (W-I.1 §1) [N] |
| O-55 R-2 | O-55 · IMAP:534 | FAMILY | BUILD | W-I.1 | seat | the rim as an opt-in plate seat; the conflict half is W-B.4's (W-I.1 §1, W-B.4 §1) [N] |
| O-55 R-3 | O-55 · IMAP:535 | FAMILY | FOLD | W-L.7 | seat | consumer pins notice; the relay and packets (W-L.7), pins measured at 10.2.0 by W-0.7 [M] |
| O-56 G-1 | O-56 · IMAP:536 | FAMILY | BUILD | W-I.1 | seat | HEAD-DEFECT, F-16 (W-I.1 §1) [N] |
| O-56 G-2 | O-56 · IMAP:537 | FAMILY | BUILD | W-I.1 | seat | producer half (R2-03-01); the consumer half is W-L.2's (N-8b) [N] |
| O-56 G-3 (look) | O-56 · IMAP:538 | FAMILY | BUILD | W-G.5 | seat | the blob's look (W-G.5 §9) [N] |
| O-56 G-3 (animation) | O-56 · IMAP:539 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: value.js HeroBlob's park; the settle seam is W-G.5's (W-B.2 §3.5) [N] |
| O-56 G-4 | O-56 · IMAP:540 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: maroon, never black, at both versions (R2-03-08; W-B.2 §3.5) [N] |
| O-56 R-5 | O-56 · IMAP:541 | FAMILY | RETIRE | W-B.2 | seat | ANSWERED: G-1..G-3 land at 11.0.0; the reply states the landing version (W-B.2 §3.8) [R] |
| O-57 R-1 | O-57 · IMAP:542 | FAMILY | BUILD | W-L.2 | seat | typed native fallthrough (W-L.2 §8) [N] |
| O-57 R-2 | O-57 · IMAP:543 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | ANSWERED: `.cartoon-cast` ships in `glass-atom.css:37`; `.cartoon-surface` is an `@utility` reached by the consumer's Tailwind scan, compiled by W-L.3's css leg (W-B.2 §8) [N] |
| O-58 | O-58 · IMAP:544 | FAMILY | BUILD | W-J.1 | seat | the tile primitive and radius (W-J.1 §8) [N] |
| O-61 R-1 | O-61 · IMAP:545 | FAMILY | BUILD | W-E.2 | seat | the containment row (W-E.2 §8) [N] |
| O-61 R-2 | O-61 · IMAP:546 | FAMILY | BUILD | W-L.1 | seat | the spectrum fill hook (API, W-L.1 §3.4); the value mark is W-H.1's G12 [N] |
| O-61 R-3 | O-61 · IMAP:547 | FAMILY | BUILD | W-L.1 | seat | the DarkModeToggle menu-item form (W-L.1 §3.5) [N] |
| O-62 | O-62 · IMAP:548 | FAMILY | BUILD | W-0.1 | seat | the light veil recut at the token (W-0.1 §8) [N] |
| O-63 | O-63 · IMAP:549 | FAMILY | BUILD | W-I.1 | seat | the run as scroll port apart from the paint layer (W-I.1 §1) [N] |
| C-2 (1) | C-2 · IMAP:550 | FAMILY | BUILD | W-H.1 | seat | the live dock veil legible with no DOM readback (W-H.1 G4, M-5); luma publisher W-G.1, subscriber W-G.3 [N] |
| C-2 (2) | C-2 · IMAP:551 | FAMILY | BUILD | W-I.1 | seat | width transition and hover transform arm the cap (W-I.1 §8) [N] |
| C-2 (3) | C-2 · IMAP:552 | CONSUMER-SIDE | FOLD | W-I.1 | seat | consumer-side workaround; retires when W-I.1 lands (W-I.1 §8 "C-2 rows 2 and 3"); named for retirement in W-L.7's chicago letter [N] |
| O-64 R-1 | O-64 · IMAP:585 | FAMILY | BUILD | W-I.1 | seat | the poisoned first endpoint (W-I.1 §1) [N] |
| O-64 R-2 | O-64 · IMAP:586 | FAMILY | BUILD | W-I.1 | seat | the content-width morph (W-I.1 §1) [N] |
| O-64 R-3 | O-64 · IMAP:587 | FAMILY | BUILD | W-I.1 | seat | the integer endpoint (W-I.1 §1) [N] |
| O-64 R-4 | O-64 · IMAP:588 | FAMILY | BUILD | W-I.1 | seat | the settle tail; its clock half is W-F.1's (W-I.1 §1) [N] |
| O-64 R-5 | O-64 · IMAP:589 | FAMILY | BUILD | W-K.7 | seat | one owner per arrival, gate K7-G13 (W-K.7 §8) [N] |
| O-64 R-6 | O-64 · IMAP:590 | FAMILY | FOLD | W-I.1 | seat | the promised confirm-or-refute probe (CUR:32): REFUTED on the static page, the headed gh-build cell UNMEASURED; answer carried by W-B.2's reply (W-I.1 §8) [N] |
| O-56 G-3, quiescence ask (corrections, `15409ece`) | O-56 · IMAP:591 | FAMILY | FOLD | W-G.5 | seat | ANSWERED: `settled` is the energy predicate; park with `drive` → 0; the seam is built (W-G.5 §9) [N] |
| O-65 R-1 DOCK-COLLAPSED-FORM | O-65 · IMAP:619 | FAMILY | BUILD | W-I.1 | seat | one collapsed form (W-I.1 §1) [N] |
| O-65 P-1 detached Configurator pane | O-65 · IMAP:620 | FAMILY | RETIRE | W-L.1 | seat | ANSWERED: `layout="detached"` shipped in 10.1.0; the inset is the page gutter (W-L.1 §3.1) [N] |
| O-65 P-2 edge drawer under a content surface | O-65 · IMAP:621 | FAMILY | RETIRE | W-L.1 | seat | DECLINE with a recipe (W-L.1 §3.2) [N] |
| O-65 notice | O-65 · IMAP:622 | FAMILY | FOLD | W-L.7 | seat | consumers hold honest-RED until the landing repin (W-L.7) [M] |
| O-66 §1 GLASS-SELECT-GREY, the trigger | O-66 · IMAP:623 | FAMILY | BUILD | W-0.1 | seat | one field surface (W-0.1 §8) [N] |
| O-66 §1, the selected or highlighted menu item | O-66 · IMAP:624 | FAMILY | BUILD | W-0.1 | seat | the light row off the veil-ink plate (W-0.1 §8); dark, PRT and PCM cells are W-H.1's [N] |
| O-66 §1, the pane's clipped left-edge shadow | O-66 · IMAP:625 | FAMILY | FOLD | W-E.2 | seat | the containment row with O-61 R-1 (`contain: paint` removed, W-E.2); W-E.2's spec names O-61 R-1, not this row [M] |
| O-66 §2 every dock motion, witness scope | O-66 · IMAP:626 | FAMILY | FOLD | W-I.1 | seat | the witness scope (CUR:35; W-I.1 §1) [N] |
| O-66 notice | O-66 · IMAP:627 | FAMILY | FOLD | W-L.7 | seat | consumers hold RED until the landing repin (W-L.7) [M] |
| O-66a the two composites | O-66a · IMAP:628 | FAMILY | BUILD | W-0.1 | seat | the two composites made one (W-0.1 §8) [N] |
| O-67 R-1 the side dock's edge does not close | O-67 · IMAP:629 | FAMILY | BUILD | W-I.1 | seat | edges whole (W-I.1 §1) [N] |
| O-67 R-2 no gutter above the plate | O-67 · IMAP:630 | FAMILY | BUILD | W-I.1 | seat | the gutter (W-I.1 §1) [N] |
| O-67 R-3 a reserved badge seat | O-67 · IMAP:631 | FAMILY | BUILD | W-I.1 | seat | the badge seat decided as a dock seat (W-I.1 §8) [N] |
| O-67 side, vertical and canvas docks as a witness family | O-67 · IMAP:632 | FAMILY | FOLD | W-I.1 | seat | witness family (CUR:36; W-I.1 §1) [N] |
| O-67 notice | O-67 · IMAP:633 | FAMILY | FOLD | W-L.7 | seat | consumers hold RED until the landing repin (W-L.7) [M] |
| O-68 R-1 CONFIGURATOR-HEADER-ACTIONS | O-68 · IMAP:634 | FAMILY | RETIRE | W-B.2 | seat | CURED at 10.1.0: `#actions` (tag `v10.1.0` at `d8bda2a9`, release.yml run 36053041265; CUR:37) [N] |
| O-68 early 10.x minor | O-68 · IMAP:635 | FAMILY | RETIRE | W-B.2 | seat | CURED: the owner ruled the minor (OW-11, "And this should be in 10.0", CUR:37); 10.1.0 LIVE [R] |
| A2-KE-L2-2 | O-74 · IMAP:672 | FAMILY | BUILD | W-E.2 | seat | F-21 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| A2-KE-L2-1 | O-74 · IMAP:673 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L2-3 | O-74 · IMAP:674 | FAMILY | BUILD | W-E.3 | seat | F-32 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| A2-KE-L2-7 | O-74 · IMAP:675 | FAMILY | FOLD | W-E.3 | seat | recorded by W-K.6 §1 as FOLD → W-E.3 (a grab handle with a tap opener); W-E.3's spec does not name the rows [M] |
| A2-VA-L2-6 | O-74 · IMAP:676 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | withdrawn by the sender's erratum E-1; its compact half is A2-KE-L2-6 (W-E.7) (W-B.2 §3.7) [N] |
| A2-KE-L2-6 | O-74 · IMAP:677 | FAMILY | BUILD | W-E.7 | seat | F-29; the wave names the row [N] |
| A2-VA-L2-7 | O-74 · IMAP:678 | FAMILY | BUILD | W-I.1 | seat | F-18; the wave names the row [N] |
| A2-FO-L2-2 | O-74 · IMAP:679 | NEW | BUILD | W-E.1 | seat | F-85 (W-E.1 §8 "O-74's F-85 rows") [N] |
| A2-VA-L2-12 | O-74 · IMAP:680 | NEW | BUILD | W-E.1 | seat | F-85 (W-E.1 §8) [N] |
| A2-KE-L2-15 (erratum E-4) | O-74 · IMAP:681 | NEW | BUILD | W-E.1 | seat | F-85 (W-E.1 §8) [N] |
| A2-KE-L2-16 | O-74 · IMAP:682 | FAMILY | BUILD | W-I.1 | seat | F-18; the wave names the row [N] |
| A2-KE-L2-8 | O-74 · IMAP:683 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| A2-FO-L2-13 | O-74 · IMAP:684 | FAMILY | BUILD | W-I.1 | seat | F-16; the wave names the row [N] |
| A2-FO-L2-15 | O-74 · IMAP:685 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED IN PART at HEAD (`run.css:44-51`); its paint fault is F-18's in W-I.1 (W-B.2 §3.7) [N] |
| A2-VA-L2-1 | O-74 · IMAP:686 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-12 | O-74 · IMAP:687 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L2-12 | O-74 · IMAP:688 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-VA-L2-3 | O-74 · IMAP:689 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L2-17 | O-74 · IMAP:690 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L1-27 | O-74 · IMAP:691 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-8 | O-74 · IMAP:692 | FAMILY | BUILD | W-E.4 | seat | F-22 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-VA-L1-6 | O-74 · IMAP:693 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | ruling row: seat default BUILD `useConfirm()` in W-L.1 (W-B.4 §1, W-L.1 §3.19) [N] |
| A2-FO-L1-9 | O-74 · IMAP:694 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | ruling row, merged with A2-VA-L1-6: `useConfirm()` in W-L.1 (W-B.4 §1) [N] |
| A2-KE-L3-17 | O-74 · IMAP:695 | FAMILY | BUILD | W-K.5 | seat | F-40; the wave names the row [N] |
| A2-KE-L1-25 | O-74 · IMAP:696 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-VA-L1-7 | O-74 · IMAP:697 | FAMILY | RETIRE | W-L.1 | seat | DECLINE with a recipe (W-L.1 §3.8). W-B.2 §3.5 lists A2-VA-L1-7 as CURE in the slot grammar; W-L.1, the owning wave, rules DECLINE [N] |
| A2-FO-L1-17 | O-74 · IMAP:698 | FAMILY | RETIRE | W-L.1 | seat | DECLINE with a recipe (W-L.1 §3.8). W-B.2 §3.5 lists A2-VA-L1-7 as CURE in the slot grammar; W-L.1, the owning wave, rules DECLINE [N] |
| A2-KE-L2-13 | O-74 · IMAP:699 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-VA-L1-2 (condense) | O-74 · IMAP:700 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD: `card/CardHeader.vue:20-51`; confirmed at `19bf6569` (W-B.2 §3.7) [N] |
| A2-VA-L1-2 (veil) | O-74 · IMAP:701 | FAMILY | BUILD | W-L.1 | seat | CURE: the scroll veil under a condensed header (W-L.1 §3.3) [N] |
| A2-VA-L3-2 | O-74 · IMAP:702 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-FO-L3-8 | O-74 · IMAP:703 | FAMILY | BUILD | W-0.3 | seat | its `#actions` half CURED at 10.1.0; its truncation half closes in W-0.3 (W-0.3 §8) [N] |
| A2-VA-L3-3 | O-74 · IMAP:704 | FAMILY | BUILD | W-E.10 | seat | F-34 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| A2-FO-L3-7 | O-74 · IMAP:705 | FAMILY | BUILD | W-E.9 | seat | F-33 mechanism; joins the wave's born-RED set (IMAP:11) [M] |
| A2-FO-L3-5 | O-74 · IMAP:706 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-FO-L3-6 | O-74 · IMAP:707 | FAMILY | RETIRE | W-L.1 | seat | ANSWERED: the page gutter is `--space-section` (W-L.1 §3.9) [N] |
| A2-KE-L3-1 | O-74 · IMAP:708 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-6 | O-74 · IMAP:709 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-14 | O-74 · IMAP:710 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-7 | O-74 · IMAP:711 | FAMILY | FOLD | W-B.4 | owner docket (OW-7) | ruling row: seat default FOLD → W-E.7, 44 px coarse hit area by slop (W-B.4 §1) [N] |
| A2-FO-L1-16 | O-74 · IMAP:712 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: `update:modelValue` then `valueCommit` bracket a scrub; recipe in the Slider README (W-B.2 §3.5) [N] |
| A2-KE-L1-9 | O-74 · IMAP:713 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: a keyframe rail is keyframes.js's editor; SortableList + Slider compose it (W-B.2 §3.5) [N] |
| A2-FO-L1-15 | O-74 · IMAP:714 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-KE-L2-9 | O-74 · IMAP:715 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L1-28 | O-74 · IMAP:716 | FAMILY | BUILD | W-C.4 | seat | F-64; the wave names the row [N] |
| A2-VA-L2-9 | O-74 · IMAP:717 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at HEAD: `tokens/light-dark.css:11-20`; confirmed (W-B.2 §3.7) [N] |
| A2-KE-L3-4 | O-74 · IMAP:718 | FAMILY | BUILD | W-0.1 | seat | cites O-66a and closes with it (W-H.2 §1 "Closed elsewhere") [N] |
| A2-FO-L3-1 | O-74 · IMAP:719 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-VA-L3-6 | O-74 · IMAP:720 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L3-2 | O-74 · IMAP:721 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L3-14 | O-74 · IMAP:722 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-VA-L3-1 | O-74 · IMAP:723 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-KE-L2-14 | O-74 · IMAP:724 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L2-18 | O-74 · IMAP:725 | FAMILY | BUILD | W-E.7 | seat | F-29 mechanism; joins the wave's born-RED set (IMAP:11) [G] |
| A2-FO-L1-14 | O-74 · IMAP:726 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-FO-L1-2 | O-74 · IMAP:727 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: one consumer; composes from the `useSidebar*` composables and menu rows (W-B.2 §3.5) [N] |
| A2-FO-L1-18 | O-74 · IMAP:728 | FAMILY | FOLD | W-K.7 | seat | arrival scroll (W-B.2 §3.5) [M] |
| A2-FO-L1-4 | O-74 · IMAP:729 | FAMILY | RETIRE | W-L.1 | seat | DECLINE: the search field is Input's adornment seats (W-L.1 §3.10) [N] |
| A2-KE-L1-8 | O-74 · IMAP:730 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-FO-L1-27 | O-74 · IMAP:731 | FAMILY | BUILD | W-L.1 | seat | F-71; the wave names the row [N] |
| A2-FO-L1-28 | O-74 · IMAP:732 | FAMILY | BUILD | W-B.8 | seat | F-71; the wave names the row [N] |
| A2-KE-L1-29 | O-74 · IMAP:733 | FAMILY | RETIRE | W-B.2 | seat | DECLINE: Button + `useClipboard` + DotRing + the Check glyph (W-B.2 §3.5) [N] |
| A2-KE-L1-26 | O-74 · IMAP:734 | FAMILY | BUILD | W-G.4 | seat | the VizStudio interaction contract (W-G.4 §9) [N] |
| A2-KE-L1-22 | O-74 · IMAP:735 | CONSUMER-SIDE | RETIRE | W-B.2 | seat | ANSWERED: HELD by the sender; no ask until keyframes measures a gap; F-39 (W-K.4) is the home if it does (W-K.4 §8) [N] |
| E-3 EasingCurve marker and preset strip | O-74 · IMAP:736 | FAMILY | BUILD | W-L.1 | seat | CURE (a break) (W-L.1 §3.13) [N] |
| O-75 CONFIGURATOR-DETACHED | O-75 · IMAP:742 | FAMILY | RETIRE | W-B.2 | seat | CURED at 10.1.0: `layout="detached"` (CUR:37; W-B.2 §3.5) [N] |
| O-76 TOGGLE-PRESSED-TINT | O-76 · IMAP:743 | FAMILY | BUILD | W-0.2 | seat | per-item `--toggle-tint` (W-0.2 §8); if W-0.1 has not converged it rides W-H.1 at 11.0.0 under G1 (W-0.2 §8) [N] |
| O-77 LAYER-HEADER-LABEL | O-77 · IMAP:744 | FAMILY | BUILD | W-0.3 | seat | the label keeps its width (W-0.3 §8). Superseded in part by O-77a, which W-0.3's spec does not cover (§8 U-3 of this file) [N] |
| O-78 MENU-STACKING | O-78 · IMAP:745 | FAMILY | BUILD | W-0.4 | seat | menu content on `z-popover` (W-0.4 §8) [N] |
| O-79 (1) the aged-paper line | O-79 · IMAP:746 | FAMILY | BUILD | W-0.5 | seat | MIGRATION paper line (W-0.5 §8) [N] |
| O-79 (2) the Button variant table | O-79 · IMAP:747 | FAMILY | BUILD | W-0.5 | seat | MIGRATION variant table (W-0.5 §8) [N] |
| O-80 DOCK-OVERFLOW-LAYOUT | O-80 · IMAP:748 | CURED-AT-HEAD | RETIRE | W-B.2 | seat | CURED at 10.0.0 by deletion (`964535cb`); a residual per-frame cost comes back as a measured addendum (W-B.2 §8) [N] |
