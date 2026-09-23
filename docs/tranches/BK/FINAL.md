# BK—FINAL (the execution tranche; v7.0.0 → v8.0.0 → v9.0.0 → v10.0.0)

**Tranche letter**: BK—the execution tranche (charter `docs/tranches/BK/PLAN.md:1-5`; plan of record `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md`, `PLAN.md` §1).
**Predecessor close**: none by release. BJ carries no `FINAL.md` (`ls docs/tranches/BJ/FINAL.md` → absent); it was SUPERSEDED-INTO-BK at the cut commit `99706211` (2026-07-28 11:08:40 −0400, `docs: cut tranche BK … BI/BJ supersession banners …`; banner at `docs/tranches/BJ/PLAN.md:3`). The last published version at the open was `7.0.0` (`git show 99706211:package.json` → `"version": "7.0.0"`; tag `v7.0.0` 2026-07-17).
**This close**: `v10.0.0` at `dcb0f711`, published with provenance by `release.yml` run 35804200390 attempt 1 (sigstore logIndex 2912967710, `EXECUTION-PROGRESS.md:7739-7748`), `dist-tags.latest = 10.0.0`.
**Span**: 2026-07-28 11:08:40 −0400 → 2026-09-22 21:13:05 −0400 (`git log --format=%ad --date=iso 99706211 -1`; `git log -1 --format=%ad --date=iso HEAD`)—56 days 10 h wall clock, 57 calendar days.
**Open commit**: `99706211`.
**Close commit**: this commit. The ⊕⁸⁶ record is `7ee206df`; its verifier bracket `d856e136` landed while this file was authored and is the HEAD every figure below was read at.
**Ruling of record**: `PLAN.md:26-34`, the bracket *"[2026-09-22 · RULED under the owner's delegation … **BK CLOSES at 10.0.0** … **The remainder rides a SUCCESSOR tranche (BL)** …]"*, committed at `99e2f0ad`.
**Author seat**: Opus, model id `claude-opus-5-5[1m]` (stated from this seat's own identity).

## §1—Source commit ledger (351 commits, segmented)

`git rev-list --count 99706211..HEAD` = **351**; one merge (`git rev-list --merges --count` → 1, `533be01f` 2026-08-01); first-parent 340. The segments partition the window at the ⊕ record commits; counts are `git rev-list --count <from>..<to>` and sum to 351.

| # | segment | range | commits | what it carries |
|---|---|---|---|---|
| 0 | pre-⊕⁸¹ (Φ0–Φ7, 8.0.0, the 9.0.0 batch) | `99706211..49673cb8` | 278 | the 90-row register through #66's close (8.0.0), the α/β/γ/δ lane units, the π band, the 9.0.0 batch close-work; recorded in ⊕¹–⊕⁸⁰ |
| 1 | ⊕⁸¹ | `49673cb8..81f7db0d` | 7 | ⊕⁸⁰ record `1864a214`, the 9.0.0 cut `d4f7b24f`, the ACT-4 wall bank `3a2329c1`, the census `849c5547`, the records-truth pass `e91b7b7e`, ⊕⁸¹ `887a0db9`, the publish-landed bank `81f7db0d` |
| 2 | ⊕⁸² | `81f7db0d..540aad8b` | 2 | the O-20 disposition pass `2984e377` (5 files, +1143/−6), ⊕⁸² `540aad8b` |
| 3 | ⊕⁸³ | `540aad8b..2113670c` | 10 | the O-20 cure wave, batches 1–5b + rebind `c0d43348`, the O-26 receipt `edccdc44`, ⊕⁸³ `2113670c` |
| 4 | ⊕⁸⁴ | `2113670c..df5c6f44` | 2 | the O-26 disposition `a53d67bc` (3 files, +1832), ⊕⁸⁴ `df5c6f44` |
| 5 | ⊕⁸⁵ | `df5c6f44..e3587ec8` | 7 | the O-26 cure lanes B/A/K/M/M2 + rebind `c6251420`, ⊕⁸⁵ `e3587ec8` |
| 6 | ⊕⁸⁶ | `e3587ec8..HEAD` | 45 | the register wave (6), the O-23/O-32 disposition and waves 1–2, the 10.0.0 release chain, the close ruling `99e2f0ad`, ⊕⁸⁶ `7ee206df`, its verifier bracket `d856e136` (⊕⁸⁶ counted 42 to `d594aed1`, `EXECUTION-PROGRESS.md:7750`) |
| | **total** | `99706211..HEAD` | **351** | |

Segment 0 is not re-ledgered here: its 278 commits are annotated row by row in ⊕¹–⊕⁸⁰ and the Φ tables (`EXECUTION-PROGRESS.md:6626-6760`).

### §1.1—The 8.0.0 release chain (`git log a8a6f66b^..17a11bc5`)

| commit | date (−0400) | stat (`git show --shortstat`) | act | `.bundle-ratchet` |
|---|---|---|---|---|
| `a8a6f66b` | 08-09 02:36 | 86 files, +1432/−966 | `feat(release)!: land BK #66 CLOSE—8.0.0` | 922657 |
| `f11c498d` | 08-09 02:37 | 10, +31/−22 | #66 doc-truth rider | 922657 |
| `4e201a3a` | 08-09 02:55 | 1, +140/−42 | blob floor release-gate repair | 922657 |
| `e7061770` | 08-09 03:01 | 1, +28 | one-off pack-listing diagnostic workflow | 922657 |
| `17a11bc5` | 08-09 03:11 | 7, +80/−44 | G-BUNDLE-RATCHET re-scoped to unpacked content bytes; **= tag `v8.0.0`** | 2633353 |

### §1.2—The 9.0.0 release chain

| commit | date (−0400) | stat | act | `.bundle-ratchet` |
|---|---|---|---|---|
| `49673cb8` | 08-29 16:15 | 3, +30/−9 | batch close-work: MIGRATION §9.0.0 `./search`, ratchet rebind | 2549378 |
| `d4f7b24f` | 08-29 16:25 | 2, +3/−3 | `feat(release)!: cut 9.0.0`; **= tag `v9.0.0`** | 2549378 |
| `3a2329c1` | 08-29 16:44 | 4, +447/−1 | ACT-4 publish wall bank (registry PUT E404) | 2549378 |
| `81f7db0d` | 09-17 16:35 | 4, +60/−4 | ACT-4 publish landed (attempt 3) | 2549378 |

### §1.3—The 10.0.0 release chain (`git log --oneline --grep='chore(release)'` plus the tag and LIVE commits)

| commit | date (−0400) | stat | act | `.bundle-ratchet` |
|---|---|---|---|---|
| `c0d43348` | 09-18 00:26 | 1, +1/−1 | O-20 rebind on the committed tree | 2549378 → 2554360 |
| `c6251420` | 09-18 17:13 | 1, +1/−1 | O-26 rebind on the committed tree | 2554360 → 2562566 |
| `58f0d243` | 09-22 20:40 | 5, +7/−5 | version 9.0.0 → 10.0.0; MIGRATION.md joins `files` | 2562566 → 2915849 |
| `14570f43` | 09-22 20:49 | 1, +3/−3 | §10.0.0 Status sentence struck in place | 2915849 |
| `d3072ce9` | 09-22 20:49 | 1, +1/−1 | rebind for `14570f43`'s MIGRATION bytes (+53 B) | 2915849 → 2915902 |
| `dcb0f711` | 09-22 20:53 | 2, +113/−76 | LEDGER + reply-letter bracket pass; **= tag `v10.0.0`** | 2915902 |
| `fbd8625e` | 09-22 20:57 | 3, +1134 | the close bank | 2915902 |
| `d594aed1` | 09-22 21:05 | 2, +3/−3 | MIGRATION §10.0.0 LIVE bracket + rebind (+261 B) | 2915902 → 2916163 |

## §2—Tag chain

`git tag -l 'v8*' 'v9*' 'v10*' --format='%(refname:short) %(creatordate:iso) %(objectname:short)'` (tag objects) and `git rev-list -n1 <tag>` (commits):

| tag | tag object | created (−0400) | commit | `release.yml` run (`gh run view <id> --json headSha,attempt,conclusion`) | registry publish (`npm view … time`) | provenance / unpacked (`npm view @<v> gitHead dist.unpackedSize dist.attestations.provenance.predicateType`) |
|---|---|---|---|---|---|---|
| `v8.0.0` | `478aa462` | 2026-08-09 03:11:22 | `17a11bc5` | 31300577617, attempt 1, success | 2026-08-09T07:15:47.203Z | slsa v1 · 2,633,353 B · gitHead `17a11bc5` |
| `v9.0.0` | `6d71e663` | 2026-08-29 16:27:41 | `d4f7b24f` | 33273556530, attempt 3, success (attempts 1–2 E404 at the PUT, `PLAN.md:13-17`) | 2026-09-17T20:33:34.848Z | slsa v1 · 2,549,378 B · gitHead `d4f7b24f` · sigstore 2880033507 (`EXECUTION-PROGRESS.md` ACT-4 PUBLISH LANDED bank) |
| `v10.0.0` | `a5b5fa13` | 2026-09-22 20:55:43 | `dcb0f711` | 35804200390, attempt 1, success | 2026-09-23T01:04:23.055Z | slsa v1 · 2,915,902 B · gitHead `dcb0f711` · sigstore 2912967710 |

```
BJ superseded at the BK cut: 99706211 (7.0.0 on the registry; 2026-07-28)
   | 236 commits (99706211..17a11bc5)
v8.0.0   17a11bc5  2026-08-09   run 31300577617
   | 44 commits (17a11bc5..d4f7b24f)
v9.0.0   d4f7b24f  2026-08-29   run 33273556530 attempt 3 (published 2026-09-17)
   | 66 commits (d4f7b24f..dcb0f711)
v10.0.0  dcb0f711  2026-09-22   run 35804200390
   | 5 commits (dcb0f711..HEAD): close bank, LIVE bracket, close ruling, ⊕⁸⁶, verifier bracket
BK close: this commit
```

MIGRATION `## 8.0.0` (`MIGRATION.md:731`) carries no LIVE bracket; the 8.0.0 run and registry facts come from `PLAN.md:7-10` and ⊕⁸¹'s #66 strike (`EXECUTION-PROGRESS.md:6752`), re-measured above.

## §3—Per-wave landing summary

**The datum of record is the 2026-09-17 census** (`docs/tranches/BK/execution/2026-09-17-status-census/CENSUS.md:7-18`, verifier-corrected, workflow `wf_e0e13a3a-c3c`, 28 Opus seats). State words as CENSUS.md read them; not re-censused at this close.

| state | rows | members (`CENSUS.md:11-16`, verbatim) |
|---|---|---|
| SEALED | 21 | #1 · #2 · #4 · #5 · #9 · #11 · #12 · #13 · #14 · #15 · #16 · #19 · #22 · #35 · #40 · #42 · #68 · #72 · #75 · #79 · #91 |
| PARTIAL | 49 | #3 · #7 · #8 · #10 · #17 · #18 · #21 · #23 · #24 · #26 · #27 · #28 · #29 · #30 · #31 · #32 · #33 · #38 · #39 · #41 · #46 · #47 · #49 · #50 · #51 · #52 · #53 · #55 · #56 · #57 · #58 · #59 · #65 · #66 · #71 · #73 · #74 · #76 · #77 · #80 · #81 · #82 · #83 · #84 · #85 · #86 · #87 · #88 · #89 |
| OPEN | 14 | #20 · #34 · #43 · #44 · #45 · #48 · #54 · #60 · #61 · #62 · #63 · #64 · #67 · #69 |
| BLOCKED | 3 | #6 · #25 · #78 |
| OWNER-GATED | 1 | #90 |
| DELETED-OR-DISSOLVED | 2 | #36 · #37 |

Denominator: 90 register rows present, 88 execution-live (#70 BANKED pre-BK, no row; #36/#37 retired in place), `CENSUS.md:18`. First pass read 38 SEALED; verifiers moved 17 to PARTIAL (`CENSUS.md:5`). The census's own summary: code broadly landed, captured paint evidence the structural debt.

**Moved since the census** (none of these re-adjudicates a row state):

| act | commits | what landed |
|---|---|---|
| 9.0.0 publish | run 33273556530 attempt 3 | the tagged-not-published cut reached the registry the same day (ACT-4 PUBLISH LANDED bank) |
| O-20 disposition + cure | `2984e377`; `46ab4124`..`c0d43348` | 24 CURE-NOW landed in twelve lanes (⊕⁸³(a)-(b)); 4 CURE-NEXT-MAJOR held |
| O-26 disposition + cure | `a53d67bc`; `ae17992c`..`6e5a35bc` | 14 CURE-NOW landed in five lanes (⊕⁸⁵(a)-(c)); 2 CURE-NEXT-MAJOR held |
| register wave | RULINGS `695d4925`; lanes C `72d8bd96` · X `6875b1b3` · T `9025efe2` · L `a08143ce` · R `cbc1c979` | §1 the 10.0.0 set (`register-wave/RULINGS.md:14-81`): 10-1 A-3-CLASS, 10-2 `ringsAt`, 10-3 `ColorResolver` + `defaultBlobColorResolver`, 10-4 R-6-LIGHT (c), 10-5 `text-caption` italic retired, 10-6 MIGRATION.md joins `files`; §2 register cures N-1..N-7 (`:82-135`)—pixel-floor ceiling GPU-gated, the 1.4.11 census, the dark-sync read hardened, repo-local prettier, Trusted Publishing readiness, `./drawer`, the 10.0.0 records |
| O-23/O-32 disposition + cure | RULINGS `e5ac97f2`; LEDGER `91c65f89`; DA `fafc9737` · CT `552b5d01` · AC2 `9d8cd728` · AC1 `e853b327` · CT2 `71be2c0b` · R2 `7f9e417c`; bracket pass `dcb0f711` | 21 CURE-NOW rows or limbs, four BREAKING (⊕⁸⁶(b)-(c)) |
| Φ7 close | `58f0d243` → `dcb0f711` → run 35804200390 | 10.0.0 cut and published; this file |

**Rows the ⊕⁸¹–⊕⁸⁶ blocks struck in place** (`grep -E "2026-09-1[7-9]|2026-09-2"` over the Φ-table rows, `EXECUTION-PROGRESS.md:6620-6770`): exactly two.

- **#66 CLOSE + 8.0.0** (`:6752`)—state word `UNSTARTED` struck to **LANDED—THE CLOSE RAN AND 8.0.0 SHIPPED** [2026-09-17 · ⊕⁸¹]; the gate list (`C-13 BLOCKING · G-BATTERY-EXISTS · … · fresh census · re-pin · FINAL.md`) left standing.
- **#18 W-DELETE** (`:6678`)—the RT-18A tags-input route discharged (landed at `a8a6f66b`, 10 `D` paths); the row's own `LANDED-IN-PART` word untouched.

## §4—Net LOC

`git diff --shortstat 99706211..HEAD` → **2430 files changed, +443,498 / −44,151, net +399,347**. Per directory (`git diff --stat 99706211..HEAD -- <dir> | tail -1`):

| directory | files | + | − | net |
|---|---|---|---|---|
| `src` | 585 | 32,822 | 27,677 | +5,145 |
| `tests` | 211 | 29,172 | 5,779 | +23,393 |
| `docs` | 1445 | 368,191 | 428 | +367,763 |
| `demo` | 125 | 5,069 | 5,959 | −890 |
| `tests-visual` | 30 | 1,118 | 3,125 | −2,007 |
| `scripts` | 14 | 3,574 | 449 | +3,125 |
| `.github` | 2 | 26 | 2 | +24 |
| root (the rest: `package.json`, `README.md`, `vite.*.ts`, lock) | 18 | 3,526 | 732 | +2,794 |
| **total** | **2430** | **443,498** | **44,151** | **+399,347** |

The rows sum to the shortstat. `docs/` is 92% of the net; the source tree moved +5,145 net across 585 files. Published size: 7.0.0 → 10.0.0 unpacked is not measured here for 7.0.0; 8.0.0 2,633,353 → 9.0.0 2,549,378 → 10.0.0 2,915,902 B (§2), the 10.0.0 rise including `MIGRATION.md` joining `files` (`58f0d243`, ratchet 2562566 → 2915849).

## §5—Process gaps

| # | lesson | source |
|---|---|---|
| 1 | The records fell 45/23/45 days behind the register (PLAN, ASK, BURNDOWN); a census was needed to see the tranche's shape. First-pass readers over-read SEALED by 17 rows. | ⊕⁸¹ `:6417-6460`; `CENSUS.md:5,123` |
| 2 | Commit subjects are partial: `849c5547`'s subject sums to 84 of 90; `e91b7b7e`'s body says +227 where `git show --numstat e91b7b7e -- docs/tranches/BK/BURNDOWN.md` reads 232 (the commit whole: +260/−6). Figures come from `git`, never from messages. | ⊕⁸¹ `:6417-6475` |
| 3 | The registry wall (E404 at the PUT, tokens bypassing 2FA restricted) held the 9.0.0 tag unpublished for 19 days on one owner input. Trusted Publishing is the durable cure and is still owed (§7). | `PLAN.md:13-19`; ACT-4 banks |
| 4 | A seat's RECORD is the only thing that survives its session; a wall before the RECORD costs the seat's provenance. The successor gets a PREDECESSOR paragraph and re-derives. | ⊕⁸³(d) `:7188-7205` |
| 5 | The workflow watchdog fails a seat after 180 s of no progress, six times; a load-starved seat reads as hung. Pass 2 of O-26 lost 36 spawns to it. Check `uptime` before blaming the API. The driver additionally reports re-spawns under machine load during the 10.0.0 waves; not banked in a BK record at HEAD. | ⊕⁸⁴(e) 1-2 `:7469-7477` |
| 6 | Never share a path between a live seat and a banked file (a re-spawned seat overwrote a banked artefact). | ⊕⁸⁴(e) 3 |
| 7 | The scratchpad is wiped at session restart; the O-26 seat JSONs were lost and RULINGS was replayed from the driver transcript. Bank rulings under `docs/` (O-23/O-32 did: `dce84a28` banked the eight seat JSONs, `e5ac97f2` the RULINGS). | ⊕⁸⁴(e) 4; `o26-disposition/RULINGS.md:3` |
| 8 | Lane verifiers overturn driver rulings on disk (three O-26 rulings re-ruled after lane M; R-11-RIDER-2 ratified as its own row rather than a lane minting scope). Measure mechanisms at HEAD. | ⊕⁸⁵(c) `:7622-7664` |
| 9 | Workflow resume replays only the cached prefix whose order matches; adjudicators read RULINGS at spawn, so a ruling must be banked before the adjudicate seat starts. Both driver-reported at this dispatch; not found in a BK record at HEAD (`grep -rn "order-matched\|at spawn" docs/tranches/BK/` → no such lesson). | driver report, unbanked |
| 10 | The planted pixel-floor arms print failure-looking lines by design: `2 failed` (`release-10.0.0.log:390`) and `1 failed` (`:429`) are the self-tests biting, each followed by `GREEN (self-test …) … the floors bite` (`:394`, `:431`). | close bank log |
| 11 | Every `MIGRATION.md` edit moves the bundle ratchet once the file ships (`files: ["dist","MIGRATION.md"]` since `58f0d243`): `14570f43` +53 B → `d3072ce9`; `d594aed1` +261 B. | §1.3; `package.json` `files` |
| 12 | The master `ci.yml` pixel-floor leg: RED 2026-08-24 → register wave (⊕⁸³(f), 34 runs, 27 ceiling-RED under SwiftShader, 6 `Page.captureScreenshot` deaths); N-1 GPU-gated the ceiling (`72d8bd96`) and master went green (`gh run list --branch master`: `7f9e417c`, `58f0d243`, `9c984489`, `14570f43`, `d3072ce9` all `success`). At `dcb0f711` (run 35804004183) and `fbd8625e` (run 35804259424) attempt 1 FAILED on the FLOOR arm *"blob paints a non-blank droplet"* with `locator.screenshot: Protocol error (Page.captureScreenshot): Unable to capture screenshot` (job logs 107001486523, 107002312817; `verify` green both). Re-run: `fbd8625e` attempt 2 **success**; `dcb0f711` attempt 2 **success** (`gh run view 35804004183 --json attempt,status,conclusion` → `2 completed success`). Runs for `d594aed1`, `99e2f0ad`, `7ee206df`, `d856e136` were in progress at authoring; not measured. This is ⊕⁸³(f)'s third defect, still unowned; it does not touch `release.yml`, which published green. | `gh run view <id> --attempt 1 --json jobs` |

## §6—Consumer-breakage relevance

**8.0.0 breaks** (`MIGRATION.md:731-1005`): the export re-cut `exports` 66 → 70 (two keys retire—`./dropdown-menu` → `./menu`, `./forms` split—six mint, `:733-746`); deletions `TagsInput`, `HeaderRibbon` and, recorded later by O-26 R-11-RIDER-2, `AnimatedDigit`, `CompletionSeal`, `InstrumentChassis`, `LiquidGrid`, `PaperBackdrop`, `Pulse` (a merge into `StatusDot`), `WatercolorDot` (`:751-878`); six composables leave `./motion`/`./motion-core`/root (`:879`); `.dropdown-menu__*` → `.menu__*` (`:893`); thirteen `@theme` names (`:902`); classes/utilities (`:958`); `--glass-cell-backdrop-filter` (`:971`); `--specular-angle` (`:981`); focus off `box-shadow` (`:992`); Alert tone wash (`:1005`).

**9.0.0 breaks** (`MIGRATION.md:376-537`): `./canvas` removed (`:384`); `./search` removed with its room (`:397`); `<FourierField>` `colorResolver` prop removed (`:418`); `<FourierField>` loses `renderAt`, gains `headT` + `flick` (`:449`); `GlassDock` props fold onto `collapse` (`:486`); `--dock-max-inline-size` removed (`:507`); eight `./handmark` types leave (`:517`).

**10.0.0 breaks** (`MIGRATION.md:10-29`): the register wave's—the cascade layer (`@layer components`, A-3-CLASS), the three published names that leave (`ringsAt` off `./fourier-field`, `ColorResolver` and `defaultBlobColorResolver` off `./color`), the `AuroraAtoms` narrowing, `text-caption`'s upright paint (`:12-14`); the O-23/O-32 wave's four—`cm-serif` → `font-serif-math`, `useSidebarFollow` exempts by attribute, `parentId` names the direct parent, `SegmentedTabs` generic (type-level) (`:20-23`).

Every sibling pinned below 9.0.0 at the O-20 pass (value.js 7.0.0 · keyframes.js 7.0.0 · atlas 6.0.0 · sci-report 6.0.0 · slides 3.13.0 · speedtest 4.0.1 · fourier-analysis 4.0.0 · muster 3.1.0 · words 3.0.0 · bbnf-lang `^3.0.0`, ⊕⁸²), so every break above is prospective-on-bump; not re-measured at this close.

**Outbound letters** (`ls docs/tranches/BK/coordination/`; date = `git log --diff-filter=A`):

| letter | added | addressee (letter header) |
|---|---|---|
| `glass-outbound-2026-08-29-valuejs-o20-ack.md` | `3a2329c1` 2026-08-29 | value.js (X formation mail seat) |
| `glass-outbound-2026-09-17-valuejs-o20-disposition.md` | `2984e377` 2026-09-17 | value.js (X formation mail seat) |
| `glass-outbound-2026-09-17-bbnf-lang-9.0.0-addendum.md` | `2984e377` 2026-09-17 | bbnf-lang (the fifth `./search` edge, #76) |
| `glass-outbound-2026-09-17-constellation-o20-relay.md` | `2984e377` 2026-09-17 | the constellation (facts found on each sibling's bytes) |
| `glass-outbound-2026-09-18-valuejs-o26-reply.md` | `a53d67bc` 2026-09-18 | value.js tranche X, Track B |
| `glass-outbound-2026-09-22-consumers-10.0.0.md` | `6875b1b3` 2026-09-22 | slides (the feedback-coder deck) and atlas, each at its next bump |
| `glass-outbound-2026-09-22-fourier-o23-o32-reply.md` | `91c65f89` 2026-09-22 | value.js tranche X, Track C (X·F, the fourier-analysis lane) |

## §7—Carry-forward to BL

Per `PLAN.md:26-34`, the remainder rides BL; nothing rides a band inside BK. **BL's formation is tranche-development from a fresh census of the register at this close, and is not this file's act.** The rows below are named as `CENSUS.md` read them on 2026-09-17; the only re-measurement at HEAD taken here is the Φ-table strike grep (§3).

| class | rows (`CENSUS.md:12-15`) | adjustment since the census |
|---|---|---|
| PARTIAL (49) | #3 · #7 · #8 · #10 · #17 · #18 · #21 · #23 · #24 · #26 · #27 · #28 · #29 · #30 · #31 · #32 · #33 · #38 · #39 · #41 · #46 · #47 · #49 · #50 · #51 · #52 · #53 · #55 · #56 · #57 · #58 · #59 · #65 · #66 · #71 · #73 · #74 · #76 · #77 · #80 · #81 · #82 · #83 · #84 · #85 · #86 · #87 · #88 · #89 | #66 struck to LANDED at ⊕⁸¹ (§3); this file discharges its `FINAL.md` gate; its `fresh census` and `re-pin` gates pass to BL. #18's route discharged, row word unchanged. |
| OPEN (14) | #20 · #34 · #43 · #44 · #45 · #48 · #54 · #60 · #61 · #62 · #63 · #64 · #67 · #69 | none |
| BLOCKED (3) | #6 · #25 · #78 | none |
| OWNER-GATED (1) | #90 | none |

No other row was struck to LANDED by ⊕⁸¹–⊕⁸⁶. Rows whose code the O-20/O-26/O-23/O-32 waves touched keep their census word until BL re-censuses them.

**Also carried, by name:**

- **Owner-only (1)—enable the npm Trusted Publisher** for `@mkbabb/glass-ui` on npmjs.com. `release.yml` already carries the OIDC paragraph (`:13-20`, the Settings → Trusted Publisher path, token kept until the first OIDC publish), `id-token: write` (`:31`), the `npm install -g npm@^11.5.1` step (`:59-62`), and `NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}` (`:66`). `register-wave/RULINGS.md:155-161`.
- **Owner-only (2)—rotate, then delete, `NPM_TOKEN`** after the first OIDC publish. `gh secret list` → `NPM_TOKEN 2026-09-17T20:26:20Z`, the token that shipped 9.0.0 and 10.0.0 and transited a session transcript.
- **V-A95** (aurora reverse-drag): ported as a RETIRE-OR-CONFIRM rider on #49 π-REVERSE-DRAG (`PORT.md:70`); #49 is PARTIAL.
- **⊕⁸⁰'s carried-open register** as ⊕⁸³(h) restated it (`:7294-7308`): γ #51's two colour-window items; π-SCROLL 0.36 px vs 1.5 px; the unlayered-consumer box-sizing exposure (A-3-CLASS moved the layer at 10.0.0; not re-measured); the 12-tab-stop question at Card; the α-scoped Safari block (`/dock/layers`, `/dock/overflow` @430×848); π-W1's after-half (#50 W1); the seven blob cells (#50 W2-W6); the three of twelve π findings still open (`CENSUS.md:221`); two unverified smells owed a source (run.css 15:29:40, α aspect-ratio/flex-basis).
- **The intermittent `Page.captureScreenshot` death** on the CI pixel-floor job (§5 #12), unowned.
- **The `docs/precepts` submodule copy of `affordance-map.md:85`** drift (⊕⁸³(g)), a relay, not an edit.
- Q051 rows carried from BI were dispositioned into BK rows at `PORT.md` §1.1 (`:33`) and ride those rows; no separate carry.

## §8—Audit verdict matrix

| disposition | inbound | rows | CURE-NOW | ANSWER | DECLINE | other | cure-wave commits | reply | state |
|---|---|---|---|---|---|---|---|---|---|
| O-20 | `valuejs-outbound-2026-08-28-o20-authoring-block-batch.md` | A-1..A-14, §B-1..B-7, §C-1, CUT-1..8, HK (`o20-disposition/LEDGER.md:802-810`) | 24 | 5 | items listed, no count published | KILL 8 · ROUTE (items listed, no count) · CURE-NEXT-MAJOR 4 (landed at 10.0.0 via register 10-1/10-2/10-3) | `46ab4124` `c645c393` `a314533a` `43c72339` `dd8a5fe5` `f999c11c` `4501fc77` `c0d43348` | `glass-outbound-2026-09-17-valuejs-o20-disposition.md` (+ ACK 08-29, bbnf-lang addendum, constellation relay) | CLOSED |
| O-26 | `valuejs-outbound-2026-09-18-kfw6-bh-relay.md` | 25 (24 letter rows + R-11-RIDER-2) (`o26-disposition/LEDGER.md:946-975`) | 14 | 13 | 5 limbs across 4 rows | CURE-NEXT-MAJOR 2 (R-6-LIGHT (c) → 10-4; A-3-CLASS → 10-1) · KILL/ROUTE none | `ae17992c` `c1f266ad` `650297da` `7c3d5fa3` `c6251420` `6e5a35bc` | `glass-outbound-2026-09-18-valuejs-o26-reply.md` (489 lines) | CLOSED |
| O-23/O-32 | `fourier-to-glass-2026-09-17-nwo1-bh-relay.md` + `value-to-glassui-2026-09-DD-fw4-relay.md` (carried at `b249b586`) | 52 per `91c65f89`'s subject (`o23-o32-disposition/LEDGER.md:908-932`) | 21 rows or limbs, 4 BREAKING | 13 rows + the 21 strikes | 6 limbs | SPLIT 1 (A-2) · KILL/ROUTE/CURE-NEXT-MAJOR none | `fafc9737` `552b5d01` `9d8cd728` `e853b327` `71be2c0b` `7f9e417c` `dcb0f711` | `glass-outbound-2026-09-22-fourier-o23-o32-reply.md` (464 lines) | CLOSED |

Model split per the ⊕ records: Opus implements, challenges, cures; Fable adjudicates (⊕⁸³(b): 74 seats, 50 `claude-opus-5`, 24 `claude-fable-5-1`; ⊕⁸⁵(a); ⊕⁸⁶(e) seat census is the driver's count, unconfirmed by that seat).

## §9—Hard-gate evidence

- **(a) Gate receipt** (`node scripts/gate-register.mjs 2>&1 | grep -o "seats:[^|]*"`, run at HEAD `d856e136`):
  `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0`—byte-identical to ⊕⁸³, ⊕⁸⁴, ⊕⁸⁵ and ⊕⁸⁶.
- **(b) Registry** (`npm view @mkbabb/glass-ui version dist-tags.latest dist.unpackedSize`): `version = '10.0.0'` · `dist-tags.latest = '10.0.0'` · `dist.unpackedSize = 2915902`.
- **(c) Ratchet**: `git show dcb0f711:.bundle-ratchet` → `2915902` (= the registry figure); `cat .bundle-ratchet` at HEAD → `2916163` (the LIVE-bracket bytes, `d594aed1`).
- **(d) The close bank** (`ls -la docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/close/`): `pi-report-green.json` 10,663 B · `pi-report-planted.json` 26,813 B · `release-10.0.0.log` 98,581 B (435 lines).
- **(e) From `release-10.0.0.log`** (`grep -nE "PI aurora DEFAULT|coverage=|3 passed|failed|Created annotated tag"`):
  - `:191-192` `Test Files  239 passed (239)` · `Tests  2313 passed | 10 expected fail (2323)`
  - `:200` `"terminal":"CLEAN"` · `"version":"10.0.0"` · `"roster":{"status":"PRESENT","datum":289,"emitted":289}`
  - green arm: `:209` `PI aurora DEFAULT meanChannel=230.7 floor=8` · `:230,:234` `PI blob coverage=0.156 floor=0.1 · paintedShare=0.279/0.280 ceil=0.7` · `:237` `3 passed (34.7s)` · `:238` `pixel-floor gate: GREEN — 3 floors ran on the live paint path and passed.` (the log's own spaced dash)
  - planted black aurora: `:247` `PI aurora DEFAULT meanChannel=3.4 floor=8` · `:269,:274` `PI blob coverage=0.000` · `:390` `2 failed` · `:394` `GREEN (self-test, --plant=all) — 2 floors RED-ed on the planted defect`
  - planted blob flood: `:405` `PI blob coverage=0.580 floor=0.1 · paintedShare=0.997 ceil=0.7` · `:429` `1 failed` · `:431` `GREEN (self-test, --plant=blob-flood) — 1 floors RED-ed on the planted defect … the floors bite.`
  - `:432` `Created annotated tag v10.0.0.` · `:435` `RELEASE_EXIT 0`
- **(f) Release run**: `gh run view 35804200390` → `release`, `v10.0.0`, `dcb0f711`, attempt 1, `success`.

## §10—Close-honesty checklist

- [x] Every claim grounded in a commit hash, a command run at HEAD `d856e136`, or a `file:line` read there. Figures carried from a ⊕ block without re-running are cited to the block (seat censuses, sigstore 2880033507, battery legs).
- [x] No figure typed from memory. The commit counts, LOC, tags, run ids, registry fields, ratchet values, receipt and log lines were each measured by the command beside them.
- [x] Status words match git at authoring: three tags, all three published with slsa v1 provenance; HEAD moved from `7ee206df` to `d856e136` during authoring, and every count uses the latter.
- [x] No gate minted: `seats:60`, `drift:0`, `violations:0`, `rosterSha256:282d05cf`, unchanged.
- [x] No sibling tree written: every path in `git diff --name-only 99706211..HEAD` is in-repo; consumer effects travel as the seven letters in §6, per the consumer-updates ruling.
- [x] No row state re-adjudicated: §3 and §7 quote `CENSUS.md` and name the two Φ-table strikes.
- [x] No carry exits as a generic placeholder: every item in §7 names BL, the owner, or its row.
- [x] The two owner-only items are open and named (§7): Trusted Publisher on npmjs.com; `NPM_TOKEN` rotation after.
- [x] Unbanked lessons marked as such (§5 #5, #9) rather than cited to a record that does not carry them.
- [x] The tag commit's `ci.yml` is green on re-run (run 35804004183 attempt 2, §5 #12); the four post-tag `ci.yml` runs were in progress and are not measured.
- [x] FINAL.md commits after the tag, not before: `v10.0.0` = `dcb0f711`; this file lands as the sixth commit after it (five intervene, `dcb0f711..d856e136`).

## §11—Final disposition

**BK CLOSED at 10.0.0**, per the ruling at `PLAN.md:26-34` (`99e2f0ad`): three cuts (`v8.0.0` 2026-08-09, `v9.0.0` 2026-08-29 published 2026-09-17, `v10.0.0` 2026-09-22 at `dcb0f711`), the four CURE-NEXT-MAJOR cuts landed in 10.0.0 (A-3-CLASS `a08143ce`; `ringsAt`, `ColorResolver`, `defaultBlobColorResolver` `6875b1b3`), the 1.4.11 tone question resolved by the light-arm retune (lane T `9025efe2`), and the O-20, O-26 and O-23/O-32 dispositions closed end to end.

The successor is **BL**, formed as tranche-development from a fresh census of the register at this close. Nothing rides a band inside BK. The two owner-only acts in §7 are the only items with no tranche seat.

This file records what landed. It does not form BL.

## §12—Adjudication [2026-09-22]

Adjudicator: Fable, model id `claude-fable-5-1`, read-only at HEAD `d856e136`; ~230 figures re-measured (counts, dates, tags, runs, registry, ratchets, receipt, shortstats, every `file:line` cite in §1–§11). Verdict: **NOT CLEAN—5 CURE, 0 DRIVER**; form matches `AB+2/FINAL.md` (header block, §1–§11 names); §11 states the `PLAN.md` ruling (BK CLOSED at 10.0.0, successor BL) without re-adjudicating a row.

**CURE (line, before → after):**
1. `:14` `first-parent 339` → `first-parent 340` (`git rev-list --first-parent --count 99706211..d856e136` = 340).
2. `:9`, `:175`, `:238` `PLAN.md:27-36` → `PLAN.md:26-34` (the bracket opens at `:26` "[2026-09-22 · RULED" and closes at `:34` "re-measured at HEAD.]").
3. `:139` "`git show --numstat` reads 232" → "`git show --numstat e91b7b7e -- docs/tranches/BK/BURNDOWN.md` reads 232 (the commit whole: +260/−6)"; the bare command measures 260.
4. `:163` column header `addressee (header line 3)` → `addressee (letter header)`; the bbnf-lang addendum and the constellation relay carry no `To:` on line 3 (their line 3 is `From … date … spec/ledger of record`).
5. `:234` "this file lands five commits after it" → "this file lands as the sixth commit after it (five intervene, `dcb0f711..d856e136`)".

**DISMISS (measured, holds):** 351 total, 1 merge `533be01f`, the seven segment counts (278/7/2/10/2/7/45) and the tree counts (236/44/66/5) sum; span `2026-07-28 11:08:40` → `2026-09-22 21:13:05 −0400`; tags `v8.0.0`/`v9.0.0`/`v10.0.0` → `17a11bc5`/`d4f7b24f`/`dcb0f711`, objects `478aa462`/`6d71e663`/`a5b5fa13`; runs 31300577617 a1, 33273556530 a3, 35804200390 a1 all `success` on those SHAs; registry 2,633,353/2,549,378/2,915,902 B, gitHeads match, slsa v1 all three, `latest = 10.0.0`; all twelve ratchet values incl. `dcb0f711` 2915902 and HEAD 2916163; the receipt byte-identical (`seats:60 … drift:0 … rosterSha256:282d05cf violations:0`); shortstat 2430/+443,498/−44,151 and the eight directory rows sum to it; the 20 chain-commit shortstats; `CENSUS.md:5,7-18,123,221`; the three LEDGER tallies (24/5/8/4 · 14/13/5-limbs/2 · 21+4 BREAKING/13+21/6/SPLIT 1, 52 rows); all 28 MIGRATION cites; `release.yml:13-20,31,59-62,66`; all 18 log line cites; bank sizes 10,663/26,813/98,581 B, 435 lines; ci re-runs 35804004183/35804259424 a2 `success`, attempt-1 job ids 107001486523/107002312817; `gh secret list` `NPM_TOKEN 2026-09-17T20:26:20Z`; the Φ-table strike grep yields exactly `:6678` and `:6752`; every named commit sits in its stated segment; the seven letters' add commits and 489/464 line counts; §11's attributions (`a08143ce` A-3-CLASS, `6875b1b3` the three names, `9025efe2` lane T). Spaced dashes appear only inside the three quoted log lines. §5 #12 / §10 "in progress" for `d594aed1` was true at authoring; run 35805384414 et al. remain in progress, `d594aed1` (35804861735) has since completed `success`—no cure, the file dates its reading.
