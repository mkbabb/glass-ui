# BL — formation fix, seat 8

| field | value |
|---|---|
| seat | formation fix seat 8, before audit pass 8. Answers `formation-audit/pass-7.md` (FG-01 to FG-03) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `e64da115` for every probe (the pass-7 commit; `src` is the published 10.1.0). A scratch worktree at `HEAD` (`scratchpad/formation/fix-8/wt`, `node_modules` and `tests-visual/node_modules` symlinked; `npm run build` exit 0, `npm run demo:dist:build` exit 0), removed before return (`git worktree list` shows no fix-8 entry). Load average 7.8-10 |
| engines | Chromium (Playwright's build) for the paint probe. No Playwright WebKit run. Real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`; `waves/W-A.3.md`, `W-A.5.md`, `W-B.14.md`, `W-C.1.md`, `W-C.2.md`, `W-C.3.md`, `W-D.2.md`, `W-E.1.md`, `W-E.11.md`, `W-G.1.md`, `W-H.1.md`, `W-H.3.md`, `W-I.4.md`, `W-K.1.md`, `W-L.2.md`, `W-L.3.md`, `W-L.7.md`, `W-L.8.md`; the new `formation-audit/sweeps/` (three sweeps, their shared reader, three outputs); this file. `LEDGER.md` needs no change: no terminal word moves, and no row cites a gate this seat struck or re-wrote (`grep` for `B14-G2`, `H3-G4`, `I4-G6`, `G-L8-3`, `G-L8-4`, `A3-G5`, `A5-G5`, `C1-G6`, `G-L3-8` in `LEDGER.md`: 0 lines). `waves/INDEX.md` has no edge column. The plan has no `MIGRATION.md`. No tracked source, no git write in the checkout |
| fence note | One table-shape check this seat wrote listed changed files with `git diff --name-only` over the whole plan folder and so opened the modified `design/**` files read-only, for a column count. Nothing under `design/` was written, and no reading from it is used here. The check was re-run over `PLAN.md`, `waves/` and `LEDGER.md` only (19 files, 0 column mismatches) |
| fixtures | in this seat's scratchpad, outside the checkout: the bite copies (`fix-8/bite/`, `git archive HEAD src`, `git init`ed), the H1-G23 reader and fix-7's perl block extracted from the spec (`probe/plate-reads.mjs`, `probe/g23-old.sh`), the paint probe and its 18 captures (`probe/fl6-extra.mjs`, appendix U; `caps/`; the four halo strips are not readings), the provenance probe (`probe/artefact-origin.mjs`, printed in `W-L.8.md` appendix B) and its output, the G-L3-8 fixture (`glfix/`), and the HEAD copy of the plan for the sweeps' before runs (`headplan/`) |

## Result

All three findings are cured in the plan folder, each by class. None is refuted.

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FG-01 | a wave deletes, moves or reshapes an artefact another wave builds on, and PLAN §5 leaves them unordered (FF-02's class; FE-01 and FF-01 are its shared-kit case) | `sweeps/reshape-order.py` | **exit 1**, 91 rows, 91 open | **exit 0**, 51 rows, each with a reading; 0 open |
| FG-02 | a state fill or dim reads a `--glass-plate-*` rung and no gate or spec line names it (FE-02, FF-03) | `sweeps/fl6-plate-reads.py` | **exit 1**, 27 reads, 17 open | **exit 0**, 27 reads: 19 flagged by H1-G23 and cited in item 8, 8 on the plate surfaces; 0 open |
| FG-03 | a gate whose RED is borrowed from another wave: it restates another wave's gate, or its HEAD reading is another wave's absent file, so it enters its own wave green (FA-01/FA-02's class) | `sweeps/borrowed-red.py` | **exit 1**, 11 rows, 11 open | **exit 0**, 0 rows |

Each sweep's two runs are in its `.out` file beside it. The before runs use `git archive HEAD` copies of `PLAN.md` and `waves/` (and of the worktree's `src` for FG-02) with `SWEEP_RAW=1`, which drops every recorded reading, so the before run is the bare enumeration. The after runs read the plan folder as this seat leaves it.

After the edits, a walk of PLAN §5 (`sweeps/plan_dag.py`, Python `graphlib`, W-L.6's "every wave of bands C to K" expanded) reads 99 rows, a full topological order (no cycles), 0 dangling ids, 0 edges into a later band, and no band-0 wave with a dependency outside band 0. A column count over every table in `PLAN.md` and the 18 edited specs finds 0 mismatches.

## Findings

### FG-01 · W-D.2 restructures the CI workflows, and three unordered waves write steps into the old shape

**Class.** A wave deletes, moves or reshapes an artefact (a file, an npm script, a workflow's job shape) that another wave builds on, reads or gates on, and §5 does not order them, or orders them and the later wave still reads the old shape. Fix-7 cured W-L.3 against W-L.4; pass 7 found the same class across the workflow files.

**The sweep.** `sweeps/reshape-order.py` reads every spec's §4 mechanically:
- **DELETE**: every path or npm script under `Deleted:`, or marked `(deleted)`;
- **MOVE**: every file under `Moved…:`, except W-D.1's and W-D.2's moves, which are the move ledger (PLAN §1);
- **WORKFLOW**: a wave whose §4 creates a `.github/workflows/*.yml` (W-A.3 and W-D.2), against every wave whose §3-§5 names a workflow file;
- **WFEDIT**: any two waves whose §4 edit the same workflow file (`.github/workflows/*.yml` in a §4 counts as all of them).

For each artefact it lists every other wave that names it as OPEN (unordered), AFTER (lands later and names it) or BEFORE (lands earlier and its §5 names it, so the release-commit re-run of W-L.8 step 1 would read it). An OPEN row clears only with a `CONVERGES` reading, meaning both orders give one tree. Every AFTER and BEFORE row needs a reading. The readings are in the script's `ADJUDICATED` table, one line each.

**What the sweep found at HEAD** (91 rows). Pass 7's three pairs (W-A.5, W-L.2, W-L.3 against W-D.2) and W-L.8's step 5, plus:
- **W-A.3**, the other reshaper, unordered against W-A.5, W-A.6, W-B.13, W-C.1, W-C.2 and W-C.3.
- **A3-G5** turns RED after W-D.2 lands. Its `needs:\s*\[?\s*visual` does not match W-D.2's `needs: [verify, visual]`. Run on a three-line fixture: exit 1.
- **W-C.1 §3 step 5** had a landing-order fork: "if either lands after this wave, this wave deletes the read" (W-A.2 and W-A.5 were unordered against it).
- **W-C.3 §3 item 8** edits `scripts/lib/subpath-policy.mjs`, which W-D.1 deletes, unordered.
- **W-F.1** edits `webgl/createCanvasLifecycle.ts`, and its time test imports it from there. W-G.1 moves that file into `webgpu/` and deletes `webgl/`, unordered.
- **W-E.11 §4** named `demo/index.html`, W-D.2's post-move path, not the HEAD path PLAN §1 requires.
- **W-L.7** wired its closure check into `ci.yml` and also into `npm test`: two paths, and the `ci.yml` one was in W-D.2's old shape.
- **W-C.2 §3 item 8** waited on W-B.13's header ("whatever header W-B.13 leaves is swept here"). W-B.13 waits on an owner act and is unordered against W-C.2.
- **Single writers of `release.yml` and `ci.yml`.** Pairs of them were unordered with no reading.
- **Band 0.** W-0.1 G5 (`verify-export-types.mjs`) and W-0.7's datum (`.bundle-ratchet`) read files W-L.3 and W-A.5 delete. W-L.8 step 1 re-ran "every band's gates".
- **Duplicate deletions.** W-C.1 deleted `tests-visual/docs/`, which W-A.1 already deletes. C1-G6 ran `scripts/import-dag.mjs`, which W-D.1 deletes.

**Cures.**

PLAN §5 has one workflow order, given in the note at `PLAN.md:394-398`. The new edges:

| wave | edges added | line |
|---|---|---|
| W-A.5 | W-A.3, W-A.4 | `PLAN.md:284` |
| W-A.6 | W-A.3, W-A.4, W-A.5 | `:285` |
| W-B.13 | W-A.3, W-A.4, W-A.5 | `:298` |
| W-C.1 | W-A.2, W-A.3, W-A.4, W-A.5 | `:301` |
| W-C.2 | W-A.3, W-A.4, W-A.5, W-C.1 | `:302` |
| W-C.3 | W-A.3 | `:303` |
| W-D.1 | W-C.3 | `:306` |
| W-D.2 | W-A.5 | `:307` |
| W-G.1 | W-F.1 | `:329` |
| W-K.1 | W-E.1 | `:350` |
| W-L.2 | W-D.2 | `:362` |
| W-L.3 | W-D.2 | `:363` |

Three waves stay unordered against W-D.2, each for a stated reason, and their steps converge:
- **W-A.6.** It waits on OW-3, and the cut must not.
- **W-E.1 and W-K.1.** Bands E to K must not wait on loop D1 (PLAN §2).

The owner-gated pair W-A.6 and W-B.13 stays unordered against W-C.1, W-C.2 and W-L.3. The pairs write disjoint lines, and no gate of one reads the other's. The notes at `PLAN.md:399-401` give the reasons for the C.1, D.1 and G.1 edges.

Spec edits:
- **W-D.2 §3 item 6** (`W-D.2.md:70-73`):
  - `verify.yml` checks out at depth 1;
  - it runs W-A.5's `payload.mjs --enforce` after the build;
  - only verify steps move, and every other step (the GPU and Safari receipt checks, the fixture-app builds, `visual`) stays in its job;
  - `regen-docs.mjs` regenerates the canon CI block in the same commit.
  
  Related edits:
  - §1's L14-11 row names the payload step.
  - §8 (`:112`) gives the release-workflow order.
- **W-A.5:**
  - item 3 (`W-A.5.md:38`) states the order;
  - **A5-G5** (`:58`) is now `grep -rq "payload.mjs --enforce" .github/workflows`. Run at `e64da115`: **exit 1**. It holds on `ci.yml` at the wave and on `verify.yml` after W-D.2.
- **A3-G5** (`W-A.3.md:64`) reads `visual` anywhere in a `needs` list. Run at `e64da115`: **exit 1**. On a three-line fixture, the new form reads `[verify, visual]` 0, `visual` 0, `[visual]` 0, `[verify]` 1, `[visual-ish]` 1. The old form reads 1, 0, 0, 1, **0**.
- **W-L.2:**
  - item 12 (`W-L.2.md:83`): `verify.yml` runs `check:consumer` after the build;
  - §4 (`:90`) edits `verify.yml`, not `ci.yml`.
- **W-L.3:**
  - item 8 (`W-L.3.md:69`): the matrix job has `needs: [verify]`, downloads `dist/` from the verify artifact and packs with `--ignore-scripts`. `publish` needs it. The `verify:package` step leaves `verify.yml`;
  - §4 (`:75`) adds `verify.yml`.
  - **G-L3-8** (`:88`)'s middle clause is `! grep -rq "verify:package" package.json .github/workflows`. Run at `e64da115`: **exit 1**. On a five-file fixture with the step left in `verify.yml`, the new form exits 1 and fix-7's exits **0**. With the step gone, the new form exits 0.
- **W-L.7** (`W-L.7.md:94,98`): the closure check runs through `npm test` only, and `ci.yml` leaves §4.
- **W-L.8:**
  - step 1 (`W-L.8.md:72`) re-runs the gates of bands A to L. Band 0's gates were read at `v10.2.0` by W-0.7 step 1;
  - step 5 (`:76`) names the jobs as W-D.2, W-A.5, W-L.2 and W-L.3 leave them.
- **W-C.1:**
  - step 1 and §4 drop `tests-visual/docs` (W-A.1's);
  - step 5 (`W-C.1.md:44`) has one path;
  - **C1-G6** (`:69`) loses its `import-dag.mjs` leg. Its RED reading is the Playwright half's, unchanged and not re-run here.
- **W-C.2 item 8** (`W-C.2.md:50`):
  - the `ci.yml:58,60` brackets sit in the `pixel-floor` job (`ci.yml:39` opens it, read here), which W-A.3 deletes first;
  - W-C.2 strikes `release.yml:13`'s bracket only, and W-B.13 deletes the paragraph. B13-G4 reads `TRUSTED PUBLISHING`, the paragraph's text, so either order converges.
- **W-C.3 item 8** (`W-C.3.md:53`) hands the `development` condition and its narration to W-D.2. W-D.2 §1 gains the L13-16 row (`W-D.2.md:26`). W-C.3 §4 drops `vitest.config.ts`. Two removers were one too many: with W-D.2 after W-C.3, D2-G1's DEAD-CONDITION arm would have entered W-D.2 green. This seat found it while curing, not by a sweep.
- **W-G.1 §4** (`W-G.1.md:81`) re-points the moved files' importers, W-F.1's `tests/motion/spring-one.test.ts` among them.
- **W-E.11 §4** (`W-E.11.md:56`) names the HEAD path `index.html`.
- **W-E.1 and W-K.1 §4** (`W-E.1.md:69`, `W-K.1.md:56`) name their `visual.yml` step as an edit.

### FG-02 · H1-G23 goes green while three more FL-6 plate reads stand

**Class.** A state fill or dim reads a plate rung, and the gate is a closed list of names, so each cure enumerated what the last critic found: FE-02 found one fallback, FF-03 the press and a second fallback, and FG-02 a selected fill set through a hook token, and a dim. The cure is to invert the gate, not to lengthen the list.

**The sweep.** `sweeps/fl6-plate-reads.py <checkout> [<spec>]` enumerates every `var(--glass-plate-…)` read in the checkout's tracked `src` CSS and SFCs (comments blanked). It extracts W-H.1 appendix C, the new H1-G23 reader, runs it on the checkout, and requires every line the reader flags to be cited in W-H.1 §3.2 item 8. Pass 7's scan covered only custom properties declared from a plate. This sweep reads direct property reads too, and so finds three rules beyond pass 7's three lines:
- the segmented track's wake;
- the capsule track;
- the sheet's graded halo.

The `.input-pill` invalid state is a fourth, which W-C.4 deletes.

| run | reads | open | exit |
|---|---:|---:|---:|
| HEAD spec | 27 | 17 | **1** |
| fix-8's spec | 27 | 0 | 0 |

At HEAD the 17 open reads are the 10 unnamed state and dim lines plus the 7 plate surfaces, which had no ruling. With fix-8's spec, 19 reads are flagged and cited, and 8 are on the surfaces.

**Cure.**

- **H1-G23 holds by exclusion** (`W-H.1.md:170`, appendix C at `:474`). `plate-reads.mjs` keys every plate read by file, rule selector and declaration property. It fails unless the rule is one of seven `SURFACES`, the plates that paint as plates at rest:
  - `--feedback-tone-rung`;
  - the avatar's identity disc;
  - the metric cell;
  - the `--color-glass-quiet` bridge;
  - `--control-surface-bg`;
  - `ghost-slot`;
  - `.input-bar`.

  A new surface joins only by an edit to the gate. Readings, run here:

  | tree | `plate-reads.mjs` | fix-7's perl H1-G23 |
  |---|---|---|
  | worktree at `e64da115` | **exit 1**, 19 lines (27 reads, 8 on surfaces) | exit 1, 9 lines |
  | bite A: fix-7's second bite state (the seven tokens re-pointed, both fallbacks dropped) | **exit 1**, 10 lines | **exit 0** (pass 7's hole) |
  | bite B: bite A plus the six new rules re-pointed and the `.input-pill` rule deleted (W-C.4) | exit 0 | — |
  | bite B plus `src/plant/plant.css` (`.x:hover { background: var(--glass-plate-quiet) }`, `.y { --foo-bg: var(--bar, var(--glass-plate-resting)) }`) | **exit 1**, both lines | exit 1, line 2 only |

- **The spec text.**
  - **Item 8** (`W-H.1.md:98`) states the exclusion and the seven surfaces. It names the six new rules with file and line: `configurator/styles.css:529`, `segmented.css:228`, `glass-capsule.css:80`, `glass.css:116` with `dark-arm.css:286`, `sheet/styles.css:365-368`, and `control-surfaces.css:121`, which is W-C.4's deletion before this wave's base.
  - **§4** (`:129`, `:134`) lists the new files and the reader.
  - **The prose under the table** (`:173`) replaces the perl block.
  - **PLAN §3's W-H.1 row** (`PLAN.md:188`) stops restating a count ("the six plate-reading state tokens", stale since fix-7). It cites item 8 and H1-G23 as the one list.

- **π.** `W-H.1.md:198` is a new §6 row for the new surfaces. Its HEAD readings were taken here by appendix U (`fl6-extra.mjs` over the worktree's `dist-demo`; Chromium, 1280×900, DPR 1, reduced motion; 18 PNGs in `fix-8/caps/`, four of them the halo strips that are not readings):

  | surface | rule | light ΔE_OK | dark ΔE_OK |
  |---|---|---:|---:|
  | preset chip, active vs inactive | `configurator/styles.css:529` | 0.0157 | 0.0317 |
  | segmented wake, on vs off | `segmented.css:228` | 0.0114 | 0.0208 |
  | capsule track vs the ground above it | `glass-capsule.css:80` | 0.1247 | 0.1794 |
  | focus veil dim, shown vs hidden, beside a grasped Slider | `glass.css:116`, `dark-arm.css:286` | 0.0300 | **0.0077** |
  | sheet graded halo | `sheet/styles.css:365-368` | not read | not read |

  - **Chip.** The demo fills the `#presets` slot, so the default chip renders on no route. The probe mounts two chips with `Configurator.vue:430`'s class list.
  - **Track.** The first strip read caught a tab glyph. The probe reads a 3 px strip at the track's inner end, viewed (`track-light-rest.png`, a clean fill).
  - **Halo.** In this Chromium the opened side and detented sheets, and the halo anchored to them, sit at `y = 900`, outside the viewport. Their bounding rects are `[0, 900, 384, 469]` for the right sheet. Its strip read 0 and is not a reading. The row says so, and the wave reads it at its base.
  - **Views.** `chip-dark-on.png` shows the chip; `veil-light-on.png` shows the page under the veil.

  "fix-8's probe" is registered in PLAN §1's fixture rule (`PLAN.md:33`).

### FG-03 · G-L8-4 is A5-G1 restated, and it enters W-L.8 green

**Class.** A gate whose RED is borrowed. Its command is another wave's gate, or its HEAD reading is the absence of a file an earlier wave lands, so at its own wave's base it is green, or red for a reason the wave does not cure.

**The sweep.** `sweeps/borrowed-red.py` extracts every §5 gate command and lists:
- **RESTATED**: identical normalised commands in two waves;
- **BORROWED**: a gate that runs a file an earlier wave's §4 lands as new, that its own §4 does not edit, with an absence for its HEAD reading.

At HEAD it lists 11 rows:
- G-L8-4 (both kinds);
- **B14-G2, W-H.3 G4 and W-I.4 G6.** Each runs W-B.3's `verify-recap.mjs` over the whole tranche, which W-B.3 lands with every RECAP terminal written. So each enters green, its RED was W-B.3's absent script, and it re-reads a ledger for a terminal word, which PLAN §1 rules out;
- **G-L8-7**, whose recorded RED was W-B.1's absent checker.

**Cure.**
- **G-L8-4 is struck** (`W-L.8.md:99`), with its reason in the row. Its evidence is A5-G1's command, `npm run build && node scripts/payload.mjs --enforce`. It is the same script G-L8-4 ran, and the release run (G-L8-5) runs it in `verify.yml`. Step 4 (`:75`) keeps the payload reading as a record, not a gate.
- **The F-12 law pass 7 says the old row stated** ("the datum is the shipped bytes") moves to **G-L8-3** (`:98`). G-L8-3 had read only the provenance predicate type, which any provenance passes. It now runs `scripts/tranche/artefact-origin.mjs @mkbabb/glass-ui 11.0.0 v11.0.0` (`W-L.8.md` appendix B, landed by W-L.8, §4 `:88`). The registry's SLSA provenance must name the tag's commit and `release.yml` at the tag, and its subject sha512 must equal the tarball the registry serves. Run here from the scratchpad (`probe/artefact-origin.out`):

  | version, tag | exit | rows |
  |---|---|---|
  | `11.0.0`, `v11.0.0` | **1** | `FAIL no tag v11.0.0`: W-L.8's own act |
  | `10.1.0`, `v10.1.0` | 0 | 3 PASS: source commit `d8bda2a99e06…`, workflow ref, subject sha512 `d027721107…` |
  | `10.1.0`, `v10.0.1` | **1** | source commit and workflow FAIL: a tarball from another tree |
  | `10.0.1`, `v10.0.1` | 0 | 3 PASS |

- **B14-G2, H3-G4 and I4-G6 are struck** (`W-B.14.md:38`, `W-H.3.md:72`, `W-I.4.md:80`), each with its reason. B3-G2 holds the carry. Each wave's enactment gate is its owner docket line, G1 (B14-G1 for W-B.14), with H.3's G3 and I.4's G3-G5 for the subjects they build. No spec, `LEDGER.md` line, `audit/` or `ledger/` file cites them (`grep`, 0 lines).
- **G-L8-7's HEAD reading** (`W-L.8.md:102`) is now the reading W-L.8 itself cures. `--close` exits 1 while a docket row reads `pending` (W-B.1 §3 item 2), and W-L.8 records each open owner act as its terminal. Read here, `grep -cE '^\| OW-[0-9a-z]+ \|.*\| pending \|' LEDGER.md` gives **11**. The sweep's BORROWED rule keys on the HEAD reading, so it no longer lists this gate.

## Appendix U · the FL-6 paint probe (`fl6-extra.mjs`)

Run: `node fl6-extra.mjs <worktree>/dist-demo <outdir>` after `npm run demo:dist:build` in the worktree. It uses fix-7's `press-fill.mjs` harness (appendix T: the server, the OKLab ΔE and the inset-box mean) with new cells. At `e64da115` it prints the rows of FG-02's π table. When W-H.1 lands, it moves into `scripts/probes/band-H/`. The `CHECKOUT` literal then becomes the repository root, resolved from the script's own path, and the output root becomes `.cache/evidence/W-H.1/` (PLAN §1).

```js
// fl6-extra.mjs <dist-demo> <outdir> — fix-8's paired π for the FL-6 plate reads fix-7 left unnamed (FG-02): the selected preset
// chip (active vs inactive), the segmented track's wake (attribute on vs off), the capsule track (track vs the ground beside it),
// the focus veil's dim and the sheet's graded halo (element shown vs hidden, the same frame). Chromium, 1280x900, DPR 1, reduced
// motion, light and dark. fix-7's press-fill.mjs harness (server, OKLab ΔE, inset-box mean). Prints rows; saves PNGs.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const require = createRequire(`${CHECKOUT}/package.json`);
const { PNG } = require("pngjs");
const { chromium } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const [dist, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}`;
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const oklab = ([r, g, b]) => { const [R, G, B] = [lin(r), lin(g), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (p, q) => { const [a, b] = [oklab(p), oklab(q)]; return +Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]).toFixed(4); };
const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const meanPng = (buf) => { const img = PNG.sync.read(buf); let s = [0, 0, 0], n = 0; for (let i = 0; i < img.data.length; i += 4) { s[0] += img.data[i]; s[1] += img.data[i + 1]; s[2] += img.data[i + 2]; n++; } return s.map((v) => v / n); };
const rows = []; const row = (o) => { rows.push(o); console.log(JSON.stringify(o)); };
const b = await chromium.launch({ args: ["--force-color-profile=srgb"] });
async function open(route, theme) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", colorScheme: theme });
  const page = await ctx.newPage(); await page.goto(base + route); await page.waitForTimeout(2500);
  await page.evaluate((t) => { document.documentElement.classList.toggle("dark", t === "dark"); }, theme); await page.waitForTimeout(600);
  return { ctx, page };
}
const shot = async (page, r, name) => meanPng(await page.screenshot({ clip: r, path: path.join(out, name) }));
const inset = (bb) => ({ x: bb.x + 2, y: bb.y + 2, width: Math.max(2, bb.width - 4), height: Math.max(2, bb.height - 4) });
const absent = (o) => row({ pi: "H1/STATE-FILL", ...o, absent: true });
for (const theme of ["light", "dark"]) {
  // the selected preset chip: `.configurator-preset-chip.is-active` (configurator/styles.css:529) against an inactive chip. The demo's
  // configurator story fills the `#presets` slot, so the default chip renders on no route at HEAD: two chips with Configurator.vue:430's
  // class list are mounted beside the story's own preset buttons, one with `is-active`
  { const { ctx, page } = await open("/containers/configurator", theme);
    const host = page.getByRole("button", { name: /^Quiet/ }).first();
    if (!(await host.count())) absent({ surface: "preset-chip", theme });
    else { await host.evaluate((el) => { const cls = "configurator-preset-chip glass-capsule glass-capsule-hover shadow-cartoon focus-ring shrink-0 px-3 py-1 text-micro font-medium text-foreground";
        for (const on of [true, false]) { const b = document.createElement("button"); b.type = "button"; b.className = cls + (on ? " is-active" : ""); b.dataset.probe = on ? "chip-on" : "chip-off"; b.textContent = "Preset chip"; el.parentElement.appendChild(b); } });
      await page.waitForTimeout(500); const on = page.locator("[data-probe=chip-on]"), off = page.locator("[data-probe=chip-off]");
      await on.scrollIntoViewIfNeeded(); await page.mouse.move(5, 5); await page.waitForTimeout(400);
      const a = await shot(page, inset(await on.boundingBox()), `chip-${theme}-on.png`), o = await shot(page, inset(await off.boundingBox()), `chip-${theme}-off.png`);
      row({ pi: "H1/STATE-FILL", surface: "preset-chip", rule: "configurator/styles.css:529", theme, state: hex(a), rest: hex(o), dE: dE(a, o) }); }
    await ctx.close(); }
  // the segmented track: its wake (`[data-eyeglass-wake]`, segmented.css:228) on against off, and the track (glass-capsule.css:80) against the ground beside it
  { const { ctx, page } = await open("/navigation/tabs", theme);
    const t = page.locator(".segmented-tabs.glass-capsule-track:not(.segmented-tabs--underline)").first();
    if (!(await t.count())) absent({ surface: "segmented-track", theme });
    else { await t.scrollIntoViewIfNeeded(); await page.mouse.move(5, 5); await page.waitForTimeout(400);
      const bb = await t.boundingBox(); const strip = { x: bb.x + bb.width - 7, y: bb.y + 6, width: 3, height: Math.max(2, bb.height - 12) };
      const rest = await shot(page, strip, `track-${theme}-rest.png`);
      const ground = await shot(page, { x: bb.x, y: Math.max(0, bb.y - 14), width: Math.max(2, bb.width), height: 10 }, `track-${theme}-ground.png`);
      await t.evaluate((el) => el.setAttribute("data-eyeglass-wake", "")); await page.waitForTimeout(900);
      const wake = await shot(page, strip, `track-${theme}-wake.png`);
      row({ pi: "H1/STATE-FILL", surface: "segmented-track", rule: "glass-capsule.css:80", theme, track: hex(rest), ground: hex(ground), dE_track_ground: dE(rest, ground) });
      row({ pi: "H1/STATE-FILL", surface: "segmented-wake", rule: "segmented.css:228", theme, wake: hex(wake), rest: hex(rest), dE: dE(wake, rest) }); }
    await ctx.close(); }
  // the focus veil's dim (glass.css:116, dark-arm.css:286): a Slider held grasped; a strip beside the slider with the veil shown against hidden
  { const { ctx, page } = await open("/forms/slider", theme);
    const th = page.locator('[role="slider"]').first();
    if (!(await th.count())) absent({ surface: "focus-veil", theme });
    else { await th.scrollIntoViewIfNeeded(); const bb = await th.boundingBox();
      await page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await page.mouse.down(); await page.waitForTimeout(900);
      const veil = page.locator(".glass-focus-veil").first();
      if (!(await veil.count()) || !(await veil.isVisible())) { absent({ surface: "focus-veil", theme, note: "no visible .glass-focus-veil while grasped" }); }
      else { const r = { x: Math.max(0, bb.x - 120), y: bb.y + bb.height + 40, width: 80, height: 40 };
        const on = await shot(page, r, `veil-${theme}-on.png`);
        await page.addStyleTag({ content: ".glass-focus-veil{visibility:hidden!important}" }); await page.waitForTimeout(300);
        const off = await shot(page, r, `veil-${theme}-off.png`);
        row({ pi: "H1/STATE-FILL", surface: "focus-veil-dim", rule: "glass.css:116 / dark-arm.css:286", theme, on: hex(on), off: hex(off), dE: dE(on, off) }); }
      await page.mouse.up(); }
    await ctx.close(); }
  // the sheet's graded halo (sheet/styles.css:365-368): the right sheet open; a strip inside the halo, shown against hidden
  { const { ctx, page } = await open("/containers/sheet", theme);
    const btn = page.getByRole("button", { name: /open right/i }).first();
    if (!(await btn.count())) absent({ surface: "sheet-halo", theme });
    else { await btn.click(); await page.waitForTimeout(1500);
      const halo = page.locator('[data-slot="glass-graded-halo"]').first();
      if (!(await halo.count())) absent({ surface: "sheet-halo", theme, note: "no halo element" });
      else { const hb = await halo.boundingBox(); const sheet = await page.locator('[role="dialog"]').first().boundingBox();
        const r = { x: Math.max(0, (sheet?.x ?? 900) - 60), y: 400, width: 40, height: 80 };
        const on = await shot(page, r, `halo-${theme}-on.png`);
        await page.addStyleTag({ content: '[data-slot="glass-graded-halo"]{visibility:hidden!important}' }); await page.waitForTimeout(300);
        const off = await shot(page, r, `halo-${theme}-off.png`);
        row({ pi: "H1/STATE-FILL", surface: "sheet-halo", rule: "sheet/styles.css:365-368", theme, halo_box: hb && [Math.round(hb.x), Math.round(hb.y), Math.round(hb.width), Math.round(hb.height)], on: hex(on), off: hex(off), dE: dE(on, off) }); } }
    await ctx.close(); }
}
fs.writeFileSync(path.join(out, "rows.json"), JSON.stringify(rows, null, 1));
await b.close(); srv.close();
```
