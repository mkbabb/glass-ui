# BK ROW #16 · R-7 — the 109-wave PORT §1.3 reproduction + the 21-evidence-dir homing walk

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`; #11's labor law L-2).
**Seat:** the R-7 follow-on lane that `ORPHAN-ROWS-CLOSE.md:572` (§7, R-7) declares OPEN and owed.
**Owner:** Claude Code (⊕¹⁸). **Executed:** 2026-08-03/04, doc-side only — zero `src/` bytes, zero
git write ops, no browser, no build, cursor untouched.
**HEAD walked: `6e505703`** (`git rev-parse --short=8 HEAD`, run this seat).
**Model of method:** `docs/tranches/BK/execution/2026-08-03-row12-bg-close-reconcile/BG-CLOSE-RECONCILE.md`
— every unit walked one-by-one, a re-derivable detector per verdict, verdict classes declared up
front with counts that sum exactly, no figure without its instrument.

**The two remits, verbatim from the adjudication**
(`docs/tranches/BK/execution/2026-08-03-phi3-close/SEXTET-RECLOSE-ADJUDICATION.json`, row `#16`,
item `16-4 / R-7`):

1. *"the 109-wave EXECUTED-or-SUPERSEDED wave-by-wave reproduction of PORT §1.3"* —
   `docs/tranches/BK/PORT.md:74-84` (§1.3).
2. *"the 21-evidence-dir name→roster-row walk"* — added by the ⊕²⁵ cure at
   `ORPHAN-ROWS-CLOSE.md` §4.4.

Both run here, complete. **No sampling, no representative subset:** every one of the 109 waves and
every one of the 21 directories carries its own line.

**CITE HYGIENE — stated up front, because #16 was convicted on exactly this once (⊕²⁵).** Every
line-cite in this file resolves against **committed** content at `6e505703` *except* two files that
are dirty in the shared worktree from concurrent lanes:
`ORPHAN-ROWS-CLOSE.md` (` M`) and `MOMENTUM-CENSUS.md` (` M`). Cites into those two — `:314-317`,
`:330`, `:419-421`, `:572`, `MOMENTUM-CENSUS.md:193-200` — are **worktree readings** and are flagged
as such wherever they appear (§7). Every other cited artifact is clean at HEAD, verified this seat:
`PORT.md` · `TERMINAL-ROSTER.md` · `BG-CLOSE-RECONCILE.md` · all five `BJ/waves/BAND-*.md` · and the
whole of `docs/tranches/BI/waves/` (`git status --porcelain docs/tranches/BI/waves/ | wc -l` → 0),
which is the corpus §2 walks. **No verdict in §2 or §5 depends on a dirty file.**

Codex-era posture, stated once: this row cites **zero** codex seals (0/87, VOID on QUALITY grounds
— ⊕¹²/⊕¹⁴), quotes **no** code-side gate-register figure (⊕¹³ᵃ standing — §4's `proof:` counts are
`package.json` runner counts, not a register), and has zero dependency on the graph-v3 arc.

---

## §0 · Corpus derivation — the 109, proven, not assumed

PORT §1.3 (`PORT.md:74-77`) asserts: *"109 waves (111 − W-ENGAGE-AFFORD ported − W-SLIDER-ENGAGE
superseded in place, §1.2) — **EXECUTED or SUPERSEDED as a class**."* The arithmetic reproduces
exactly at HEAD; **the true total IS 109**, and here is the proof in three commands:

```
ls docs/tranches/BI/waves/ | wc -l                    → 111
git ls-files docs/tranches/BI/waves/ | wc -l          → 111   (all tracked; no untracked member)
ls docs/tranches/BI/waves/ | sed 's/\.md$//' \
  | grep -vE '^(BI\.W-ENGAGE-AFFORD|BI\.W-SLIDER-ENGAGE)$' | wc -l   → 109
```

The two subtractions are re-verified on disk this seat, not taken on PORT's word:

*(the two subtracted names are written bolded below, never in the bare `` `BI.W-…` `` cell form §2
uses — so the §2 tally commands cannot accidentally scrape this table.)*

| subtracted | PORT's ground | reproduced at `6e505703` |
|---|---|---|
| **BI.W-ENGAGE-AFFORD** | `PORT.md:65` §1.2 — *"PORTED — absorbed whole, re-based off HEAD"* → **#27** | TR:177 `#27 W-ENGAGE-LADDER+AFFORD \| WAVES:631 + **BI.W-ENGAGE-AFFORD absorbed** + O-19` — the roster carries it by name |
| **BI.W-SLIDER-ENGAGE** | `PORT.md:66` §1.2 — *"SUPERSEDED in place ✦ ('FOLDED 2026-07-16' at its own H1)"* | `head -1 docs/tranches/BI/waves/BI.W-SLIDER-ENGAGE.md` → `# BI.W-SLIDER-ENGAGE — SUPERSEDED (folded into BI.W-ENGAGE-AFFORD)` |

**The walked set in §2 is byte-identical to that 109-name list.** Falsifier, run this seat, output
empty:

```
diff <(awk -F'|' '/^\| `BI\.W-/ {gsub(/[ `]/,"",$2); print $2}' R7-WALK.md | sort) \
     <(ls docs/tranches/BI/waves/ | sed 's/\.md$//' \
        | grep -vE '^(BI\.W-ENGAGE-AFFORD|BI\.W-SLIDER-ENGAGE)$' | sort)
```

---

## §1 · Method, and what a verdict is allowed to rest on

**The primary detector is the landing commit.** BI executed as a banded tranche whose commits name
their wave in the subject (`BI B<n> (BI.W-NAME): …`). For any wave the detector is one command:

```
git log --oneline --no-merges --grep='BI.W-<NAME>'
```

**This is a reproduction, not a re-audit** — and that fence is PORT §1.3's own
(`PORT.md:83-84`): *"Any individual claim against a specific BI wave resolves against
RECONCILIATION.md, never by re-audit."* Row #11's law L-4 and the S8 anti-re-audit fence say the
same. So a row below claims **the wave landed**; it does **not** claim the wave's subject is
defect-free at HEAD. Quality claims are RECONCILIATION's (166 rows, 114 refuted) and ARCHAEOLOGY's
(43/43), and are not restated here.

**Where the grep alone does not decide, a second instrument does, and it is printed in the row.**
Three cohorts needed one, and they are enumerated here so nobody has to guess which rows leaned on
what:

- **14 names return 0 hits** on `git log --no-merges --grep='BI.W-<NAME>' | wc -l` — `DOCK-DEVICE` ·
  `DRAG-REATTACH` · `MS1`…`MS9` (nine) · `SLIDER-ENGAGE` (outside the 109) · `STRUCTURE-RESEQUENCE` ·
  `VALUE-MARKS`. **13 of them are inside the 109.** Nine landed under a *different* subject
  convention and the row names it (`W-DRAG-REATTACH` bare at `2f1f154d`; `refactor(structure/ms2…ms8)`
  at `ea3c002c`/`9f165717`/`9a8761f0`/`bba7b51d`/`bb5c1e5c`/`4bf29831`/`f1acf31f`;
  `feat(progress-slider)` at `298bbbdd`). Three resolve at §3 (`DOCK-DEVICE` OPEN ·
  `STRUCTURE-RESEQUENCE` SUPERSEDED · `MS9` MOOT). One resolves at §3.4 (`MS1`).
- **4 names whose only `BI.W-` hit is a mint or a proposal, not a landing** — `GLASS-SUBTLETY` and
  `GRADED-BACKDROP` (both minted together at the docs commit `e781500b`), `LADDER-DERIVE` (the
  proposal `2a6d1d41`, whose own `:3` reads *"STATUS: PROPOSAL … NOT implemented"*), and
  `BD-UNION-TRUE-UP` (minted-and-dispositioned in one act at `a20060ad`). Each row names the
  instrument that actually decided it: a `git log -S` on the introduced symbol, or a disk absence.
- **5 names whose FIRST hit is a sibling wave's band commit**, resolved by taking the hit that lands
  the wave's own body — `BLOB-SEAMS` (`2bab64ca`, not `1db3ff92`) · `DOCK-GATE-CULL` (`2f30052f`,
  not `f7be02dc`) · `FIELD-CORE` (`60c5b347`, not `db861d71`) · `PRECUT-XR-ASKS` (`90d4d8bf`, not
  `2c6c095d`) · `XR-PRODUCER-REPAIRS` (`81162018`, not `1db3ff92`). ~~**A naive "first grep hit" walk
  would have mis-attributed all five**~~ [⊕²⁷ 2026-08-04 adjudication D3: inverted — under `git log`'s
  default reverse-chronological order the CORRECT commit is the first hit for all five; the
  mis-attribution arises only under `--reverse`, never stated. All five table SHAs are correct;
  only this aggregate sentence was wrong]; the §2 table carries the corrected SHA.

**Verdict classes** (declared up front; the counts at §5 sum to 109):

- **EXECUTED** — a named landing commit, or a live file, is stated.
- **SUPERSEDED** — a named superseding row/ruling is stated.
- **MOOT** — a named abrogation is stated.
- **OPEN** — honest, with what remains and who owns it.

**Read-point discipline.** Every SHA below is short-8 and resolves at `6e505703`. Where a wave took
more than one commit, the row names the one that lands the wave's body and parenthesises the rest.

---

## §2 · THE 109-WAVE WALK

Alphabetical — the same order `ls docs/tranches/BI/waves/` returns, so any row is findable in one
scroll and the set-diff at §0 is trivial to re-run.

| wave | verdict | evidence at `6e505703` | note |
|---|---|---|---|
| `BI.W-ACCORDION-PRESS` | EXECUTED | `86b7955f` | B7 — tap-squish dropped from the full-width disclosure row |
| `BI.W-AFFORDANCE-REDESIGN` | EXECUTED | `26f1eba9` | B68 — built + verified (bi-exec cohort) |
| `BI.W-AURORA-VIBRANCY` | EXECUTED | `ed610a1a` | B5 — warm-vivid chroma lift + setting-sun preset |
| `BI.W-AUTH-SHELL-BG` | EXECUTED | `a94a6a76` | B5 — 4.87MP live-fourier auth page retired onto the shared aurora hero |
| `BI.W-AXES-GATES` | EXECUTED | `850df929` | B28 — three factor gates (all three `proof:*` runners since abrogated) |
| `BI.W-BADGE-ALIGN` | EXECUTED | `5a6187f7` | B1 — badge rungs drop fixed leading for relative leading-[1.1] |
| `BI.W-BD-UNION-TRUE-UP` | EXECUTED | `a20060ad` | minted+dispositioned in one act; the 4 subjects verified ABSENT at HEAD |
| `BI.W-BLOB-RENAME-LAND` | EXECUTED | `13735a99` | B0 — goo-blob→blob rename EXECUTED |
| `BI.W-BLOB-SEAMS` | EXECUTED | `2bab64ca` | B5 — the settled seam + HERO preset (minted at 1db3ff92) |
| `BI.W-BLUR-MUTE` | EXECUTED | `3c2f6e79` | B28 — .btn-glass cohort blur 8px→6px |
| `BI.W-BORDER-PROGRESS-RETIRE` | EXECUTED | `99e4e611` | B68 — built + verified; `src/components/border-progress` ABSENT at HEAD |
| `BI.W-BP-BOTTOM-LINEAR` | EXECUTED | `34f75abf` | B1 — bottom-edge coverage paints a LINEAR leg |
| `BI.W-BUDGET-REBASELINE` | EXECUTED | `bc791c7d` | B0 — budget key goo-blob→blob + ceiling lift |
| `BI.W-BUTTON-TONE` | EXECUTED | `8974a8ca` | B28 — Button.destructive migrates off variant onto tone |
| `BI.W-CAROUSEL-REBUILD` | EXECUTED | `8c6f605a` | B4 — the broken carousel rebuilt |
| `BI.W-CHIP-FOLD` | EXECUTED | `ac71691f` | B28 — ToggleChip + SelectableChip FOLD onto the ONE <Chip> |
| `BI.W-CLEAR-FOLD` | EXECUTED | `5b13da33` | B28 — surface="clear" RETIRED as dead substrate |
| `BI.W-CODEBLOCK` | EXECUTED | `e29a41a1` | B68 — lazy hljs core + 4 grammars |
| `BI.W-COMMAND-JITTER` | EXECUTED | `54c55642` | B7 — menu-row lift rides the spring's own settle |
| `BI.W-COMPOSITIONS-PRUNE` | EXECUTED | `af896274` | B68 — built + verified (bi-exec cohort) |
| `BI.W-CONFIG-IN-SHEET` | EXECUTED | `ff69acd9` | B1 — configurator sections read as concentric |
| `BI.W-CONSTELLATION-DEDUPE` | EXECUTED | `693e3878` | B5 — constellation census + dedup |
| `BI.W-DEMETA` | EXECUTED | `8a63ca11` | B68 — built + verified; companion scrub at 2d1584a5 |
| `BI.W-DEMO-CARD-DECLARE` | EXECUTED | `c396465b` | B0 — /card joins DECLARED_FAMILY_SUBPATHS |
| `BI.W-DEMO-SOURCE-SCAN` | EXECUTED | `ebd4b7ae` | B68 — built + verified (bi-exec cohort) |
| `BI.W-DIALOG-PLACEMENT` | EXECUTED | `c368ccbc` | B28 — Sheet FOLDS onto <DialogContent placement> |
| `BI.W-DOC-CANON-REWRITE` | EXECUTED | `0ae7c21b` | B0 — README 5.0.0 truth rewrite |
| `BI.W-DOCK-CONTROLS` | EXECUTED | `15a38a63` | B3 — the ONE traveling-indicator engine PROMOTED |
| `BI.W-DOCK-CROSSFADE` | EXECUTED | `353b1c35` | B3 — <DockCrossfade :active> replaces useLayer* |
| `BI.W-DOCK-DEVICE` | OPEN | — | device runs never ran; see §3.1 |
| `BI.W-DOCK-ESCAPE` | EXECUTED | `3339127f` | B3 — rail/fan/menu/search escape to the TOP layer |
| `BI.W-DOCK-FOLD` | EXECUTED | `976c8326` | B3 — ui/tabs DELETED whole |
| `BI.W-DOCK-GATE-CULL` | EXECUTED | `2f30052f` | B3 — dock gate fleet culled to the 10-script roster |
| `BI.W-DOCK-INTERACTION-AXIS` | EXECUTED | `c6fdd21c` | feat(dock) — consumer-owned interaction axis minted |
| `BI.W-DOCK-LUMA-SHARE` | EXECUTED | `967811e4` | B5 — 12→3 luminance samplers |
| `BI.W-DOCK-OVERFLOW` | EXECUTED | `f675eaa7` | B3 — native scroll track + fisheye-iff-fits |
| `BI.W-DOCK-RETIRES` | EXECUTED | `98b52613` | B3 — the graveyard deleted TERMINAL |
| `BI.W-DOCK-SPINE` | EXECUTED | `ae71daa0` | B3 — the greenfield spine |
| `BI.W-DOCK-SPRING-UNIFY` | EXECUTED | `e3c35c99` | B3 — the deformation scalar-zoo unified |
| `BI.W-DRAG-REATTACH` | EXECUTED | `2f1f154d` | B68 — landed under the bare name `W-DRAG-REATTACH` (no `BI.` prefix) |
| `BI.W-DRAW-IN` | EXECUTED | `4193bb4f` | B7 — .draw-rule/[data-draw-in] no-overshoot draw |
| `BI.W-DRAWER-PERF` | EXECUTED | `7a9faa07` | B7 — drawer-lag mechanism fixes |
| `BI.W-E10-AURORA-ENTRANCE` | EXECUTED | `c5a8dba8` | B5 — the repulsive-gray route-enter DIES |
| `BI.W-ENCAP-REDRAIN` | EXECUTED | `910dfffd` | B0 — useGlassBackdropLuminance 554→365 via a stateless leaf |
| `BI.W-ENTER-EXIT-LANDING` | EXECUTED | `2e61690f` | B7 — 9 overlay SFCs bind their named registers |
| `BI.W-ESC-STACK` | EXECUTED | `f24577c7` | B68 — LIFO escape-dismiss stack (+ rider 83b0eb80) |
| `BI.W-FACTOR-ASKS` | EXECUTED | `42ec85c5` | B28 — band fold-migration ledger lands on asks |
| `BI.W-FIELD-CORE` | EXECUTED | `60c5b347` | B5 — the viz field hub; useRoutePointer minted |
| `BI.W-FOLDED-REDIRECTS` | EXECUTED | `ce033809` | B68 — built + verified (bi-exec cohort) |
| `BI.W-FOURIER-RIBBON` | EXECUTED | `46a778c1` | B5 — the fullscreen per-pixel SDF |
| `BI.W-GESTALT-LEDGER-FILE` | EXECUTED | `ac998852` | B0 — the operative-close verdict oracle |
| `BI.W-GLASS-DEDUP` | EXECUTED | `2bfcf2b9` | B28 — GlassPanel FAM-10 RETIRED (#13 correction 1 confirms this SHA) |
| `BI.W-GLASS-SUBTLETY` | EXECUTED | `e9589654` | values commit; + 2764f60b corner-bind + 2224f4c4 gate (minted e781500b) |
| `BI.W-GLASS-TOKEN-PRUNE` | EXECUTED | `d685c169` | B28 — the α-band probe RAN as arbiter |
| `BI.W-GRADED-BACKDROP` | EXECUTED | `189ae15c` | graded box-following halo; token cohort at 24b63d01 (minted e781500b) |
| `BI.W-GRAIN-WIRE` | EXECUTED | `47c295a6` | B68 — built + verified (bi-exec cohort) |
| `BI.W-HERO-DEMOTE` | EXECUTED | `7d281f00` | B68 — built + verified (bi-exec cohort) |
| `BI.W-LADDER-DERIVE` | SUPERSEDED | `dc566e34` | PROPOSAL, never registered; product landed as BJ.W-BLUR-LADDER → #22/#68 |
| `BI.W-LEDGER-DETECTOR-HARDEN` | EXECUTED | `2f05d771` | B0 — proof:bg-deferred-ledger gains clauses (gate since abrogated) |
| `BI.W-LIVE-TILES` | EXECUTED | `fedc1289` | B68 — built + verified (bi-exec cohort) |
| `BI.W-MATH-PAPER-REMOVE` | EXECUTED | `5de84d05` | B68 — built + verified; 10 surviving `math-paper` hits are all prose → #17 |
| `BI.W-MENU-TRIGGER` | EXECUTED | `cff82da5` | B28 — ContextMenu FOLDS onto the Menu family |
| `BI.W-METAL-RIM-BAND` | EXECUTED | `9f6d2f8e` | B1 — .metal-*-border border-image DELETED |
| `BI.W-METRICS-DEMO` | EXECUTED | `c90f51f4` | B68 — built + verified (bi-exec cohort) |
| `BI.W-MIGRATION-TRUE-UP` | EXECUTED | `6d1714a7` | B0 — /api re-home table regenerated DISK-TRUE 203→199 |
| `BI.W-MS1-CENSUS-RECOMPUTE` | EXECUTED | `9a8761f0` | executed INSIDE its consumers; see §3.4 |
| `BI.W-MS2-UTILS-DISSOLVE-COMPLETE` | EXECUTED | `ea3c002c` | refactor(structure/ms2) — `src/utils` ABSENT at HEAD |
| `BI.W-MS3-SORTABLE-COLOCATE` | EXECUTED | `9f165717` | `src/composables/sortable` ABSENT; lives at `sortable-list/composables/` |
| `BI.W-MS4-FLATTEN-MOVE` | EXECUTED | `9a8761f0` | refactor(structure/ms4) — no `src/components/{ui,custom}` at HEAD |
| `BI.W-MS5-ROOT-BARREL-DISSOLVE` | EXECUTED | `bba7b51d` | refactor(structure/ms5) |
| `BI.W-MS6-SUBPATHS-DISSOLVE` | EXECUTED | `bb5c1e5c` | refactor(structure/ms6) — `src/subpaths/` ABSENT at HEAD |
| `BI.W-MS7-CSS-COLOCATE` | EXECUTED | `4bf29831` | refactor(styles/ms7) |
| `BI.W-MS8-DEMO-TERMINAL` | EXECUTED | `f1acf31f` | refactor(demo/ms8) |
| `BI.W-MS9-DIFFERENTIAL-CLOSE` | MOOT | — | body was the born-RED differential gate; see §3.3 |
| `BI.W-MULTISELECT-FOLD` | EXECUTED | `ce128594` | B28 — MultiSelect → <Combobox multiple> |
| `BI.W-ORPHAN-BINARY-SPLIT` | EXECUTED | `b9de684f` | B68 — the orphan verdict goes BINARY |
| `BI.W-OVERLAY-UNION` | EXECUTED | `aad5510f` | B28 — the sealed <Popover> union SHIPS |
| `BI.W-PAGER-A11Y` | EXECUTED | `f058cdc6` | B4 — roving tabindex + axis-derived arrows |
| `BI.W-PAGER-RETIRES` | EXECUTED | `3df24bc5` | B4 — the pager-chain terminal retire |
| `BI.W-PAGER-WORM` | EXECUTED | `9b8071d9` | B4 — the goo worm SHIPS; useLeadTrail minted |
| `BI.W-PI-IN-CLOSE` | EXECUTED | `871ed206` | B0 — the binding-π tag-blocker (gates.mjs arm since abrogated) |
| `BI.W-PRECUT-XR-ASKS` | EXECUTED | `90d4d8bf` | B0 — the 5.0.0 outbound relay roster (11 rows) |
| `BI.W-RADIUS-GRAMMAR` | EXECUTED | `92e00ff7` | B1 — proof:geometry-grammar LANDED (gate since abrogated) |
| `BI.W-RATCHET-GROWTH` | EXECUTED | `25f00641` | B0 — the frozen TRANCHE_BASELINE_MANIFEST |
| `BI.W-REGISTER-TABLE` | EXECUTED | `ef3ea646` | B7 — the named enter/exit register table |
| `BI.W-SCROLL-PROGRESS-RIM` | EXECUTED | `ffc90bf9` | B1 — the dock scroll-progress rim |
| `BI.W-SHADOW-GRAMMAR` | EXECUTED | `809b6ff5` | B1 — Law 4 GREEN, the hard cartoon stamp gate |
| `BI.W-SHEET-INTERRUPTIBLE-MOTION` | EXECUTED | `6950cfd4` | feat(dialog) — side-sheet slide onto the interruptible spring |
| `BI.W-SHEET-RADIUS` | EXECUTED | `ae750c9d` | B1 — per-side INNER radius on the dialog rung |
| `BI.W-SHRINK-HERO` | EXECUTED | `03e4d1b1` | B68 — built + verified (bi-exec cohort) |
| `BI.W-SLIDER-THUMB-NAME` | EXECUTED | `85c7f130` | B68 — slider thumbs gain accessible names |
| `BI.W-SPECIMEN-FRAME` | EXECUTED | `20efeb11` | B68 — the 5-KIND Demo* taxonomy FOLDS to Specimen* |
| `BI.W-SPEEDTEST-ONLY-PAIR` | EXECUTED | `b68f3c13` | B68 — built + verified (bi-exec cohort) |
| `BI.W-SPLITCHARS-ARIA` | EXECUTED | `a4793883` | B68 — SplitChars gains the aria-label whole-text arm |
| `BI.W-SPRING-PARITY` | EXECUTED | `75c9e433` | B7 — M1 LANDED, regen passes maxDuration |
| `BI.W-STAB-CLOSE` | EXECUTED | `f1e70862` | B0 — release test step 50 reds/6 errors → 4 route reds |
| `BI.W-STAGE-FIELD-CLAMP` | EXECUTED | `f70d127f` | B5 — the DockStage field clamped |
| `BI.W-STORY-SCHEMA` | EXECUTED | `495d2dc5` | B68 — built + verified (bi-exec cohort) |
| `BI.W-STRUCTURE-RESEQUENCE` | SUPERSEDED | — | PORT §1.2 books it PORTED → #62 · #63 · #64; see §3.2 |
| `BI.W-STYLE-REDRAIN` | EXECUTED | `db861d71` | B0 — 5 CSS monoliths carved under 500L |
| `BI.W-SUBSTRATE-INDEX-TILES` | EXECUTED | `8d9bcb1e` | B68 — built + verified (bi-exec cohort) |
| `BI.W-SURFACE-EXTRACT` | EXECUTED | `5fd114b6` | B28 — <Surface>, the bare tier × decoration primitive |
| `BI.W-SYNONYM-RENAMES` | EXECUTED | `5cc2c27e` | B28 — the tone axis lands library-wide |
| `BI.W-TABS-FACTOR` | EXECUTED | `184bf765` | B3 — EYEGLASS IS THE TABS DEFAULT (#13 correction 2 confirms this SHA) |
| `BI.W-TEMPO` | EXECUTED | `59b7a8bc` | B7 — --motion-tempo @property, identity 1.0 ratified |
| `BI.W-VALUE-MARKS` | EXECUTED | `298bbbdd` | feat(progress-slider) — continuous checkpoint marks; `resolveValueMarks` live |
| `BI.W-VIRTUAL-TRUTH` | EXECUTED | `25692cf2` | B68 — /virtual RETIRED terminal; `src/composables/virtual` ABSENT |
| `BI.W-VIZ-DELETIONS` | EXECUTED | `f7be02dc` | B4/B5 — the user-ordered viz deletions EXECUTED (+ rider 78ffedd4) |
| `BI.W-XR-PRODUCER-REPAIRS` | EXECUTED | `81162018` | B68 — built + verified (minted at 1db3ff92) |

---

## §3 · THE FOUR NON-EXECUTED ROWS, IN FULL

Every wave that is not EXECUTED gets its whole argument here. There are four.

### §3.1 · `BI.W-DOCK-DEVICE` — **OPEN**

**What it was.** *"the visible-Safari.app Metal device-run bundle + the dock gestalt verdict"*
(`BI.W-DOCK-DEVICE.md:1`). Band B3's device-truth wave — *"the ONE device-truth owner where every
sibling wave's Safari π obligation converges"*. It discharges the `dis:safari-metal-verify` chronic
(*"Safari/WebKit + real-Metal p50 NEVER run"* — asked-2 at BC), the `proof:ba-gestalt` dock verdict,
and SAF-1.

**Detector, and what it returns.**

```
git log --oneline --no-merges --grep='BI.W-DOCK-DEVICE'   → 0 landing commits
```

~~The three commits that mention the name are a rescope (`6bc077ac`, *"DOCK-DEVICE rescoped to both
Metal arms"*) and two BJ doc passes.~~ [⊕²⁷ 2026-08-04 adjudication D2: FOUR commits mention the
name (`git log --oneline --grep='DOCK-DEVICE'` → 4) — a rescope (`6bc077ac`), a BI doc pass
(`f1e88fe2`), and two BJ doc passes.] **No commit lands it.**

**What DID land: the instrument, not the runs.** `scripts/safari-probe.mjs` exists at HEAD
(`ls scripts/` → 11 entries; the file is there), tracked at `54d79b96`
(*"feat(scripts): track the Safari WebDriver probe (lane-A A-4 …) — lands the #4 stray toward
G-CITE-COMMITTED"*). That is BK row #4's act, not this wave's: an instrument on disk is not a device
run.

**The gate half is separately MOOT.** `proof:ba-gestalt` cannot be run — `grep -c '"proof:'
package.json` → **0** under the owner gates-abrogation mandate. A moot gate is not a passed gate.

**Read-point reconciliation, so two BK records do not appear to disagree.** BG-CLOSE-RECONCILE §1.1
states `ls scripts/` → **10** at `aee47957`; this seat reads **11** at `6e505703`. Both are true:
the eleventh is `scripts/gate-register.mjs`, added since at `6cf8eb51` (*"land BK row-9 W-GATE-TRUTH
register + detector"*). `safari-probe.mjs` is in **both** trees. Neither reading is a `proof-*.mjs`
count — `ls scripts/ | grep -c '^proof-'` → **0** at both pins.

**What remains, and its owner.** The paint obligation itself: visible-Safari.app + real-Metal runs
of the dock, both modes. Owner: **#10 π-SUITE** — PORT §1.4's Q002 row routes exactly this
(*"its named Safari disease-debt roster rides EXEC-STATE §OWED row 5 (the one live OWED row) via
#10"*), and #10 is itself behind #9's ⊕¹³ᵃ detector recovery. Corroborated independently by #77's
capture half (R-9) and by the standing banked lesson that Playwright-webkit ≠ Safari.app, which is
precisely why the `webkit` project cannot substitute (the wave's own SAF-1/FAM-16 ground).

**Why this is OPEN and not SUPERSEDED.** #10 owns the obligation but has not run it. Booking a
never-run device verdict as SUPERSEDED because a live-but-unstarted row inherited it is the
absorbing-sink form X-3 convicts. It is open, it is homed, and it is stated.

### §3.2 · `BI.W-STRUCTURE-RESEQUENCE` — **SUPERSEDED**

**Superseding ruling, named:** `PORT.md:69` (§1.2, row 5) —
*"`BI/STRUCTURE-ADDENDA.md` · `BI/REPO-CLEANUP-PLAN.md` (**+W-STRUCTURE-RESEQUENCE**) | formed,
unexecuted; both files on disk ✦ | **PORTED** — colocation, granularity, name-strip, test
displacement | **#62 · #63 · #64**"*.

**Detector.** `git log --no-merges --grep='BI.W-STRUCTURE-RESEQUENCE' | wc -l` → **0**. The wave is
a meta/re-scope directive (*"This wave WRITES the re-baselined structure roster"* — its `:3`); it
never had a code body to land. Its roster product is exactly what PORT §1.2 carries into the BK
roster at #62 `W-COLOCATION` / #63 `W-REPO-WEIGHT` / #64 `TIER-3 RESIDUAL`, all three live rows at
~~`TERMINAL-ROSTER.md:242-244`~~ [⊕²⁷ 2026-08-04 adjudication D1: false cite — `:242` is the
RETURNED-LUNA line, `:244` the §A.2 header; the true home is
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:212-214`].

**Not double-counted.** PORT books it at §1.2 *and* the file sits in `waves/`, so it is inside the
109. It is walked here once, as SUPERSEDED, and the §1.2 booking is its ground — not a second life.

### §3.3 · `BI.W-MS9-DIFFERENTIAL-CLOSE` — **MOOT**

**The abrogation, named:** the owner gates-abrogation mandate. Instrument:
`grep -c '"proof:' package.json` → **0**; `ls scripts/` → 11 entries, **none** a `proof-*.mjs`.

**Why the whole wave falls with it.** MS9 has no body of its own — its own §Scope says so:
*"No source edits of its own — the differential is the aggregate assertion over the eight prior MS
waves"*, and its §Acceptance is *"the differential itself — born-RED over the post-repair HEAD,
GREEN once MS1-MS8 have landed"*. A wave whose entire product is a gate, in a tree with zero gate
runners, is MOOT-GATE in exactly the BG-CLOSE sense (§1.1 there).

**Its substance is not dropped.** The eight waves MS9 asserted over all landed with named commits
(§2 rows MS1–MS8; `ea3c002c` · `9f165717` · `9a8761f0` · `bba7b51d` · `bb5c1e5c` · `4bf29831` ·
`f1acf31f`). The differential's *content* is therefore satisfied on disk even though its
*instrument* is gone: `src/utils` ABSENT · `src/subpaths/` ABSENT · `src/components/{ui,custom}`
ABSENT (`ls -d src/components/*/ | wc -l` → 64, flat).

### §3.4 · `BI.W-MS1-CENSUS-RECOMPUTE` — **EXECUTED, inside its consumers** (the one row whose class needs its caveat spelled out)

`git log --no-merges --grep='BI.W-MS1-CENSUS-RECOMPUTE' | wc -l` → **0**, and the only commit naming
`BI.W-MS1` is the mint (`cb9805d6`, *"the 9 MS wave files MINTED … execution HELD"*). So MS1 has no
standalone landing commit.

It is nevertheless EXECUTED, and the instrument is its consumers' commit bodies. MS1's product is
*"recompute every structure census figure on the repaired snapshot … Every downstream count (MS2's
cn-repoint total, MS4's family set + key baseline, MS6's test-import list) is an MS1 OUTPUT, not a
wave constant"*. MS4's landing commit (`9a8761f0`) states re-derived figures in exactly that form —
*"The package projection is exact at 83 keys with no target drift or classification collisions"* and
*"No ui/custom imports or directories remain"* — which is the recompute, performed and reported. Its
`f89e3a9d` confirmation baselines are explicitly *"recompute OUTPUTS … not spec constants"*
(`BI.W-MS1-CENSUS-RECOMPUTE.md:11`), so a recompute reported inside the consuming wave satisfies the
spec as written.

**Stated plainly so nothing is laundered:** MS1 has no commit of its own. Its verdict rests on its
consumers' bodies plus the tree shape. If an adjudicator rejects that, MS1 moves EXECUTED → MOOT
(its acceptance surface, the addenda's hardcoded counts, no longer exists) — it does **not** move to
OPEN, because nothing remains to do.

---

## §4 · Three aggregate facts about the EXECUTED 105, each with its instrument

These are properties of the landed set, not extra verdicts. They do not change any count.

1. **41 of the 109 landing commits name a `proof:*` gate, and every one of those gates is gone.**
   Detector (run from the repo root; re-runnable over this file):
   ```
   F=docs/tranches/BK/execution/2026-08-03-row16-r7-walk/R7-WALK.md
   awk -F'|' '/^\| `BI\.W-/ {gsub(/[ `]/,"",$4); print $4}' "$F" \
     | grep -v '^—$' | sort -u \
     | while read s; do git log -1 --format=%B "$s" | grep -q 'proof:' && echo "$s"; done | wc -l
   ```
   → **41** of the 105 distinct landing SHAs. Against `grep -c '"proof:' package.json` → **0**. **The waves
   executed; the gates they built were later abrogated by owner mandate.** That is a gate-mesh fact,
   not a wave failure, and it is why no row below is downgraded on gate grounds.

2. **16 of the 109 landed under the B68 formula `built + verified per bi-exec/reports/<wave>.md`,
   and those reports do not travel.** Detector:
   ```
   git log --no-merges --grep='built + verified per bi-exec/reports' --format='%s' \
     | grep -oE 'BI\.W-[A-Z0-9-]+' | sort -u | wc -l          → 16
   ```
   The 16: `AFFORDANCE-REDESIGN` · `BORDER-PROGRESS-RETIRE` · `COMPOSITIONS-PRUNE` · `DEMETA` ·
   `DEMO-SOURCE-SCAN` · `FOLDED-REDIRECTS` · `GRAIN-WIRE` · `HERO-DEMOTE` · `LIVE-TILES` ·
   `MATH-PAPER-REMOVE` · `METRICS-DEMO` · `SHRINK-HERO` · `SPEEDTEST-ONLY-PAIR` · `STORY-SCHEMA` ·
   `SUBSTRATE-INDEX-TILES` · `XR-PRODUCER-REPAIRS`.
   The cited reports live at `~/.claude/projects/…/bi-exec/reports/`, **outside the repo** — no clone
   carries them. **Honest consequence:** for these 16 the *commit* is the record of landing and the
   *report* is not re-derivable from the tree. Their EXECUTED verdict rests on the commit alone.
   This is the `G-CITE-COMMITTED` class #16 §6 already ruled on, in its non-actionable form (a commit
   message is not a committed artifact citation). **Recorded, not re-opened.**

3. **Landed-and-renamed residue is prose, not code, in the one case this walk touched.**
   `BI.W-MATH-PAPER-REMOVE` landed at `5de84d05`; `grep -rl "math-paper\|MathPaper" src demo | wc -l`
   → 10 at HEAD, and every one of the 10 is a comment or a story blurb (`surface-axis.css:94,98` ·
   `segmented.css:21,222,230` · `handmark/README.md:53` · `Code.vue:8` · `settings.vue:309,318` ·
   `tabs.vue:211` · `colors.vue:60,107`) — zero live component. Routed to **#17 `W-COMMENT-DIET`**,
   which owns the ONE comment counter. Stated because I probed it; not generalised to the other 108.

---

## §5 · COUNTS OF RECORD — part (a)

Stated once, here. Do not copy them onward; cite this file.

Machine-derived from §2's own table, not hand-tallied:

```
awk -F'|' '/^\| `BI\.W-/ {gsub(/[ *`]/,"",$3); print $3}' R7-WALK.md | sort | uniq -c
```

| verdict | count | where its argument lives |
|---|---|---|
| **EXECUTED** | **105** | §2, one landing SHA per row (106 rows carry a SHA; 105 distinct, because `MS1` and `MS4` share `9a8761f0` — §3.4). The rows that needed a second instrument beyond the name-grep are the three cohorts enumerated at §1 |
| **SUPERSEDED** | **2** | `BI.W-LADDER-DERIVE` (§2 note — PROPOSAL never registered; product landed as `BJ.W-BLUR-LADDER` at `dc566e34`, on disk at `src/styles/tokens/glass.css:85-89`, five ladder-radius primitives + the *"Raw off-ladder `blur(Npx)` is forbidden"* rule at `:81`) · `BI.W-STRUCTURE-RESEQUENCE` (§3.2) |
| **MOOT** | **1** | `BI.W-MS9-DIFFERENTIAL-CLOSE` (§3.3) |
| **OPEN** | **1** | `BI.W-DOCK-DEVICE` (§3.1) |
| **total walked** | **109** | = the §0 corpus, exactly |

**105 + 2 + 1 + 1 = 109.** PORT §1.3's *"EXECUTED or SUPERSEDED as a class"* is **REPRODUCED at
107/109 (98.2%)** and **falsified for two named waves**: one MOOT (`MS9`, a gate the class-claim
could not have anticipated, abrogated after PORT was written) and one **OPEN** (`DOCK-DEVICE`, a
device-truth obligation that never ran and whose owner #10 has not started).

**The correction PORT §1.3 owes**, stated so whoever holds that pen can apply it verbatim:

> `PORT.md:76-77` — ~~"109 waves … **EXECUTED or SUPERSEDED as a class**"~~ **[R-7 walk, 2026-08-03/04:
> the class claim is reproduced wave-by-wave at
> `docs/tranches/BK/execution/2026-08-03-row16-r7-walk/R7-WALK.md` and holds for **107 of 109** —
> 105 EXECUTED, 2 SUPERSEDED. The two exceptions: `BI.W-MS9-DIFFERENTIAL-CLOSE` is **MOOT** (its
> whole body was the born-RED differential gate; `grep -c '"proof:' package.json` → 0), and
> `BI.W-DOCK-DEVICE` is **OPEN** (0 landing commits; the visible-Safari.app/Metal device runs never
> ran; owner **#10 π-SUITE** via EXEC-STATE §OWED row 5).]**

This row does **not** edit `PORT.md` — it is another lane's file and the shared-tree wall stands.

---

## §6 · PART (b) — THE 21-EVIDENCE-DIR NAME→ROSTER-ROW HOMING WALK

**Corpus.** `ls -d docs/tranches/BJ/evidence/*/ | wc -l` → **21**;
`git ls-files 'docs/tranches/BJ/evidence/**' | wc -l` → **160** files, **0** untracked
(`git ls-files --others --exclude-standard docs/tranches/BJ/evidence/ | wc -l` → 0).

**What a home means here.** ORPHAN-ROWS-CLOSE §4.4 states the delta this walk must bite: *"an
evidence directory is a wave-name assertion — 21 names claim a wave ran."* A homing is therefore
`dir-name → the BJ band wave that owns the name → the BK roster row that owns that subject`. The
middle hop is mechanical:

```
grep -rln '<DIR-NAME>' docs/tranches/BJ/waves/
```

and the last hop cites `TERMINAL-ROSTER.md` by line. **Homing is not crediting.** Capture credit is
#10's alone, and #77's STALE-AT-HEAD ruling over all twelve capture-bearing dirs is untouched here.

| dir | png/jpg | BJ wave of record (detector: `grep -rln` over `BJ/waves/`) | **roster home** | ground |
|---|---|---|---|---|
| `GESTALT-1-INC-1` | 0 | **none — not wave-named** (the one such entry) | **#62 `W-COLOCATION`** ∥ #87 `W-MARKS` | `cd17c90b` *"refactor(status-dot): discharge GESTALT-1 — inline FeedbackMark, colocate feedback.ts"*; its own `css-identity.txt:5-6` says the proof is *"the **W-COLO-1-precedented** hash-normalized dist identity"* — the method is the colocation band's, so #62 is the home; the subject (status-dot) is a #87 member (`TERMINAL-ROSTER.md:237` names `status-dot ✦³`) |
| `W-A11Y-LINKAGE` | 0 | `BAND-A11Y.md` | **#31 `W-A11Y`** | `TERMINAL-ROSTER.md:181` — `#31 W-A11Y (**≡BAND-A11Y five**)`, an explicit equivalence; landing `e369be7b`. §4.4 already routed it → #31; confirmed |
| `W-A11Y-STATE-REMAINDER` | 0 | `BAND-A11Y.md` (as `BJ.W-A11Y-STATE`) | **#31 `W-A11Y`** | same ≡; landing `35a30fbb` *"feat(a11y): land BJ.W-A11Y-STATE — state/landmark/contrast remainder (born-RED→GREEN)"* |
| `W-BOOT-DIET` | 1 | `BAND-PERF.md` Wave 1 (`:52`, `:70`) | **#69 `W-PERF`** ∥ #60 `W-BOOT-SHELL` | `TERMINAL-ROSTER.md:219` — `#69 W-PERF (**≡BAND-PERF**)`. `BAND-PERF.md:170` cites **this directory by path** as its verbatim record; landing `5b34bb12` |
| `W-COLO-1` | 0 | `BAND-COLOCATION.md` | **#62 `W-COLOCATION`** | `TERMINAL-ROSTER.md:212` — `#62 W-COLOCATION \| WAVES:840 + DIRECTORY-SHAPE + STRUCTURE-ZONES.md`; landing `7d0c77ac` *"land BJ.W-COLO-1 — _shared carve, aurora/chip moves, dead-barrel purge"* |
| `W-CONFIGURATOR-STD` | 13 | `BAND-STORY.md` Wave 3 (`:53`, `:279`) ∥ `BAND-MATERIAL.md` | **#52 `W-CONFIG-EXPRESS`** ∥ #58 | `TERMINAL-ROSTER.md:202` — `#52 W-CONFIG-EXPRESS \| PROCEDURAL §2.3/§3.4 + PROCEDURAL-APOTHEOSES §CONFIG-EXPRESS`; landing `34681df9`, the same SHA #14 independently confirmed for F11/F29 |
| `W-DOC-TRUTHUP` | 0 | `BAND-DOC-TRUTH.md` | **#61 `W-DOC-TRUTH`** | `TERMINAL-ROSTER.md:211`; §4.4 already routed it → #61; landing `6bcd4c61` *"docs(truth-up): re-true the drifted prose and comment rosters against disk"* |
| `W-FEEDBACK-MOTION-TUNE` | 4 | `BAND-FEEDBACK-MOTION.md` | **#28 `W-FEEDBACK-MOTION`** | `TERMINAL-ROSTER.md:178` — `#28 … WAVES:648 re-trued (F21 CLOSED, **verified `19ea4ce1`**)`, and `19ea4ce1` is this dir's own VERDICTS pin. The roster row and the evidence dir cite the same SHA |
| `W-PAGER-DOT-MORPH` | 6 | `BAND-REDUCTION` ∥ `BAND-PERF` ∥ `BAND-FEEDBACK-MOTION` | **#40 `W-PAGER`** | `TERMINAL-ROSTER.md:190` — `#40 W-PAGER ✦³ \| CWT-2 :386-500s; **`01310c9c` OVERTURNED**; worm on translate+scale`, and `01310c9c` is this dir's closing commit. §4.4 already routed it → #40 |
| `W-PIXEL-FLOOR-CI` | 2 | `BAND-GATES.md` Wave 2 (`:46`) | **#65 `W-GATE-COLLAPSE`** ∥ #10 (the π half) | `BAND-GATES.md:45` Wave 1 **is** `BJ.W-GATE-COLLAPSE` = `TERMINAL-ROSTER.md:215` `#65 W-GATE-COLLAPSE (C-9/C-10) … owns §B.5` — the band's own head wave is the roster row, so every BAND-GATES wave homes there; landing `260c66fc` |
| `W-PROGRESS-RIM-REPLACE` | 3 | `BAND-FEEDBACK-MOTION.md` | **#88 `W-PROGRESS-SEAM`** ∥ #28 | `TERMINAL-ROSTER.md:238` — `#88 W-PROGRESS-SEAM (**+scroll-progress-rim**)`, naming the subject; landing `19ea4ce1` *"feat(scroll-progress-rim): land BJ.W-PROGRESS-RIM-REPLACE — retire the broken conic arc"* |
| `W-REDUCE-DELETE` | 0 | `BAND-REDUCTION.md` Wave 3 (`:362`) | **#18 `W-DELETE`** | `TERMINAL-ROSTER.md:168` — `#18 W-DELETE ⊕²✦³ \| WAVES:323 as amended`; landing `bda718ac` |
| `W-REDUCE-GOO-ENGINE` | 0 | `BAND-REDUCTION.md` Wave 8 (`:812`, the F33 family collapse) | **#18 `W-DELETE`** ∥ #40 `W-PAGER` (the goo half) | landing `85089b3b` *"land BJ.W-REDUCE-GOO-ENGINE — retire DeckPager, delete the deck-story goo clone"*; the deletion is #18's, the surviving goo-morph is #40's (`TERMINAL-ROSTER.md:190`) |
| `W-REDUCE-PROPDIET` | 0 | `BAND-REDUCTION.md` Wave 1 (`:97`) | **#19 `W-DEAD-EXPORT · W-SHIM-PURGE · W-SELECTION-ONE`** | `TERMINAL-ROSTER.md:169` — the dead-surface seat; landings `f04f05d8` + the re-true `a77ae9fe`; the dir's `DEADPROP-SCAN.txt` is `G-DEADPROP-SCAN`'s born-RED (`BAND-REDUCTION.md:295`) |
| `W-REFRACT-LATCH` | 2 | `BAND-MATERIAL` ∥ `BAND-GATES` ∥ `APOTHEOSIS` | **#2 `W-REFRACT-DELETE`** | `TERMINAL-ROSTER.md:152` — `#2 **W-REFRACT-DELETE** (**was W-REFRACT-LATCH**; +W8 I-2/I-3, one wave)`. **The only one of the 21 the roster names by its own string.** §4.4 already flagged the subject as DELETE; landings `44621bb4` → superseded by the deletion at `f025f3db` |
| `W-RESPONSIVE-AUDIT` | 4 | `BAND-STORY.md` Wave 6 (`:56`, `:489`, the F14 audit) | **#59 `W-LAYOUT`** ∥ #58 (band) ∥ #41 `W-SORTABLE` | `TERMINAL-ROSTER.md:209` — `#59 W-LAYOUT \| LAYOUT.md; viewport-fit=cover first`; the dir's contents are a 390/1440 overflow sweep + the sortable-list 2-up cure, so the layout seat is the home and #41 takes the component cure; landing `1be91765` |
| `W-STATIC-HYGIENE` | 0 | `BAND-GATES.md` Wave 3 (`:47`) | **#65 `W-GATE-COLLAPSE`** | same band-head reasoning as `W-PIXEL-FLOOR-CI`; landing `26868000` *"test(gates): three static-hygiene gates that can actually fail"*. Its three born-REDs (`token-hygiene` · `orphan-css-partial` · `refract-lens-never-sharper`) are gate seats and therefore #65's roster arithmetic |
| `W-TOAST-DIALOG-PARITY` | 3 | `BAND-FEEDBACK-MOTION.md` | **#34 `W-TOAST`** ∥ #38 `W-DIALOG` ∥ #28 | `TERMINAL-ROSTER.md:184` (#34) / `:188` (#38); landing `937aa510` *"feat(toast): land BJ.W-TOAST-DIALOG-PARITY — unify toast onto the overlay register"* — the act is toast-side, so #34 is the home and #38 the parity partner |
| `W-TYPE-CODEMOD` | 2 | `BAND-GATES.md` (W4) ∥ `BAND-MATERIAL.md` | **#68 `W-TOKEN-CANON`** ∥ #17 | `TERMINAL-ROSTER.md:218` — `#68 **W-TOKEN-CANON**—ELEVATED`; landing `ddc20dc4` *"land BJ.W-TYPE-CODEMOD ⇄ GATES W4 — migrate the type ramp off text-sm/text-xs"* + the stranded-rung repoint `8786d2c8`. The type ramp is a token register, so the token canon is the home |
| `W1-RADIUS-REDRESS` | 23 | `BAND-MATERIAL.md` Wave 1 = **`BJ.W-RADIUS-ROLE`** (`:52`, `:73`) | **#23 `W-RADIUS-ROLE`** | `TERMINAL-ROSTER.md:173` — `#23 W-RADIUS-ROLE \| WAVES:544 + O-7 + class-names.ts:141`. Name-identity, not inference; landings `31c01d2a` (body) + `22401a90` (the omitted gate) + `b0f2818a` (the paint cures) |
| `W2-BLUR-REDRESS` | 9 | `BAND-MATERIAL.md` Wave 2 = **`BJ.W-BLUR-LADDER`** (`:53`, `:278`) | **#22 `W-FROST`** ∥ #68 `W-TOKEN-CANON` | `TERMINAL-ROSTER.md:172` — `#22 **W-FROST**—the material apex`; blur *is* the frost axis, and #12's own §5 names #22 *"the single largest inheritor of BG's unfinished material work"*. Landings `dc566e34` (body) + `7de2ece1` + `626540ad` + `a0b8eb34` (close) + `868ca251` (paint-proof). **This is also the wave that superseded `BI.W-LADDER-DERIVE`** (§5) — the same commit closes a BI proposal and a BJ wave |

### §6.1 · Homing counts of record

Machine-derived from §6's own table:

```
awk -F'|' '/^\| `(W|GESTALT)/ {if (match($5,/#[0-9]+/)) print substr($5,RSTART,RLENGTH)}' \
    R7-WALK.md | sort | uniq -c | sort -rn
```
(the FIRST `#NN` in the home column = the primary home; the `∥` entries after it are co-cites and
are deliberately not counted — that is what the `match`/`substr` pair enforces)

| | |
|---|---|
| dirs walked | **21** |
| **HOMED to a named roster row** | **21** |
| **UNHOMED (honest)** | **0** |
| dirs named by `TERMINAL-ROSTER.md` in their own string | **1** (`W-REFRACT-LATCH` → #2) |
| dirs with **no** BJ band wave of record | **1** (`GESTALT-1-INC-1` — homed anyway, on its commit and its own method cite) |
| dirs cited by **zero** committed BK artifact before this file | **5** — `W-COLO-1` · `W-REDUCE-DELETE` · `W-REDUCE-GOO-ENGINE` · `W-REDUCE-PROPDIET` · `W-STATIC-HYGIENE` (detector: `grep -rl '<name>' docs/tranches/BK --include='*.md' \| wc -l` → 0 for each, before this walk) |

**Primary-home distribution** (21 rows, one primary each, output of the command above):
**#65**×2 · **#62**×2 · **#31**×2 · **#18**×2 · #2 · #19 · #22 · #23 · #28 · #34 · #40 · #52 · #59 ·
#61 · #68 · #69 · #88 ×1 each — **17 distinct roster rows**, `4×2 + 13 = 21`. No home lands on a
retired seat (#36, #37) and none lands on #16 itself. The heaviest inheritors are the four
band-shaped seats (#65 gates · #62 colocation · #31 a11y · #18 delete), which is what a
band-organised evidence corpus should produce.

**The delta §4.4 asked `G-ROW-HOMED` to bite is now specific and closed:** 21 wave-name assertions,
21 named roster homes, 0 unhomed. The *capture* half is untouched — 12 dirs carry 72 captures, all
STALE-AT-HEAD per #77, all creditable only by **#10**.

---

## §7 · FIGURE CORRECTIONS — one owed, three verified already cured

Checked at HEAD `6e505703`, because the SEXTET adjudication was written against `aee47957` and the
⊕²⁷ sitting landed in between. **The first three rows read `ORPHAN-ROWS-CLOSE.md` /
`MOMENTUM-CENSUS.md` in the WORKTREE** — both are ` M` dirty from concurrent lanes, so those line
numbers do not resolve in any clone yet (the ⊕²⁵ cite-hygiene lesson, applied to myself). The
*substance* of each is independently re-derived from git and disk in the same cell, which is what
makes the verdict safe.

| adjudication item | state at `6e505703` | action |
|---|---|---|
| **16-2** (the "only four hold real captures" / "every one named for a wave" pair) | **CURED, both sites.** `ORPHAN-ROWS-CLOSE.md:419-421` is struck-in-place with the ⊕²⁷ bracket carrying 21/12/72 and the `GESTALT-1-INC-1` exception; `MOMENTUM-CENSUS.md:193-200` carries the same enumeration. Independently re-derived this seat: `git ls-files 'docs/tranches/BJ/evidence/**' \| grep -icE '\.(png\|jpe?g)$'` → **72** across **12** dirs (23·13·9·6·4·4·3·3·2·2·2·1) | none — confirmed, not re-struck |
| **16-1** (the `+BD-CARRY` "RED until PORT gains §0" self-contradiction) | **CURED.** `ORPHAN-ROWS-CLOSE.md:314-317` is struck; `:330` now reads *"What remains open for `+BD-CARRY` is **not** this precondition but R-7's…"* — i.e. it was routed **to this file**, and §2/§5/§6 above discharge it | none |
| **the `:382` "53 of 55 OPEN ids"** unpinned sentence | **CURED** at ⊕²⁷ (struck in place with the re-derivation) | none |
| **PORT.md §1.3 `:76-77`** — *"EXECUTED or SUPERSEDED as a class"* | **FALSE at 2 of 109** | **ONE CORRECTION OWED.** Exact replacement text quoted at §5. `PORT.md` is not this seat's file (shared tree, another lane's pen) |
| **`ORPHAN-ROWS-CLOSE.md:572`** — R-7's own row, *"#16 (this row), **OPEN**"* | accurate when written; **discharged by this file** | **ONE BACK-ANNOTATION OWED** to whoever holds #16's pen: *"R-7 DISCHARGED 2026-08-03/04 at `docs/tranches/BK/execution/2026-08-03-row16-r7-walk/R7-WALK.md` — 109 walked (105 EXECUTED · 2 SUPERSEDED · 1 MOOT · 1 OPEN) + 21/21 evidence dirs homed, 0 UNHOMED."* |

---

## §8 · CLOSING TALLY — the commands the adjudicator re-runs

Run from the repo root at `6e505703`. Six commands; every figure in this file falls out of them.

```
# T1 — the corpus is 111, all tracked
ls docs/tranches/BI/waves/ | wc -l                                  # 111
git ls-files docs/tranches/BI/waves/ | wc -l                        # 111

# T2 — the walked set is exactly the 109, and matches §2 (empty diff)
cd docs/tranches/BK/execution/2026-08-03-row16-r7-walk
diff <(awk -F'|' '/^\| `BI\.W-/ {gsub(/[ `]/,"",$2); print $2}' R7-WALK.md | sort) \
     <(ls ../../../BI/waves/ | sed 's/\.md$//' \
        | grep -vE '^(BI\.W-ENGAGE-AFFORD|BI\.W-SLIDER-ENGAGE)$' | sort)

# T3 — the verdict tally, machine-derived from §2 (105/2/1/1, sum 109)
awk -F'|' '/^\| `BI\.W-/ {gsub(/[ *`]/,"",$3); print $3}' R7-WALK.md | sort | uniq -c

# T4 — any single wave's verdict, re-derived from git in one command
git log --oneline --no-merges --grep='BI.W-<NAME>'

# T5 — the gate-mesh fact behind the MOOT verdict and §4.1
grep -c '"proof:' package.json                                      # 0
ls scripts/ | grep -c '^proof-'                                     # 0

# T6 — part (b): 21 dirs, 72 captures across 12, 0 untracked, 21 homed
ls -d docs/tranches/BJ/evidence/*/ | wc -l                          # 21
git ls-files 'docs/tranches/BJ/evidence/**' | grep -icE '\.(png|jpe?g)$'   # 72
git ls-files --others --exclude-standard docs/tranches/BJ/evidence/ | wc -l # 0
awk -F'|' '/^\| `(W|GESTALT)/ {if (match($5,/#[0-9]+/)) print substr($5,RSTART,RLENGTH)}' \
    R7-WALK.md | wc -l                                              # 21 homed, 0 unhomed
awk -F'|' '/^\| `(W|GESTALT)/ {if (match($5,/#[0-9]+/)) print substr($5,RSTART,RLENGTH)}' \
    R7-WALK.md | sort -u | wc -l                                    # 17 distinct roster rows
```

---

## §9 · WHAT THIS ROW DOES NOT CLAIM

- **No π, no paint verdict, no motion verdict.** §6 homes 21 names; it credits **zero** captures.
  #77's STALE-AT-HEAD ruling stands over all twelve capture-bearing dirs, and the credit is #10's.
- **No re-audit.** A row's EXECUTED verdict says the wave landed, never that its subject is
  defect-free — PORT §1.3's own anti-re-audit clause (`PORT.md:83-84`) and law L-4 both forbid the second
  reading. The one probe I did run past the class (`math-paper`, §4.3) is reported rather than
  generalised.
- **No `src/` edit, no commit, no cursor flip, no git write op of any kind.** The shared-tree wall
  held; the only file this seat wrote is this one.
- **`PORT.md`, `ORPHAN-ROWS-CLOSE.md`, `TERMINAL-ROSTER.md`, `EXECUTION-PROGRESS.md` untouched.**
  Both corrections §7 books are quoted verbatim for their pen-holders instead — the discipline #12,
  #14 and #16 all used.
- **No seal minted.** 0/87 stands. CLOSED is the lead's act after the Challenge-Law pass.
- **No percentage stated outside its instrument.** §5's 98.2% is `107/109` from the same table the
  T3 command tallies, not a burndown figure (row #11's law L-6 reserves those for `BURNDOWN.md`).
- **No code-side gate-register figure quoted** (⊕¹³ᵃ standing). §3.3/§4.1/§8-T5 are `package.json`
  and `ls scripts/` counts.
- **`docs/tranches/BI/` and `docs/tranches/BJ/` are read-only here.** Nothing in another tranche's
  tree was rewritten to make a verdict land.
