# BL — formation fix, seat 10

| field | value |
|---|---|
| seat | formation fix seat 10, before audit pass 10. Answers `formation-audit/pass-9.md` (FI-01 to FI-04) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `31f3c5ea` for every probe and every before run. `git diff --stat 5a0db55e 31f3c5ea` touches `FORMATION-PROGRESS.md` and `formation-audit/pass-9.md` only, so the plan this seat started from is the one pass 9 read. `git diff --stat v10.1.0 31f3c5ea -- src` prints nothing |
| where probes ran | a worktree at `31f3c5ea` (`scratchpad/formation/fix-10/wt`, `node_modules` and `tests-visual/node_modules` symlinked). No library build was needed; the probe built its own Vite page against the worktree's `src`. Removed before return (`git worktree list \| grep -c fix-10` → 0) |
| engines | Chromium 149 headless and Playwright WebKit 26.5 headless, driven from the probe (the Playwright and chrome-devtools MCP servers failed to connect). Playwright WebKit is not Safari; real-Safari cells stay UNMEASURED (OW-3) |
| writes | `PLAN.md`; `LEDGER.md`; `waves/INDEX.md`; `waves/W-0.3.md`, `W-0.7.md`, `W-0.8.md` (re-scoped), `W-0.11.md` (new), `W-B.1.md`, `W-B.4.md`, `W-B.6.md`, `W-B.11.md`, `W-C.4.md`, `W-E.7.md`, `W-F.2.md`, `W-F.4.md`, `W-H.2.md`, `W-H.6.md` (new), `W-I.1.md`, `W-I.3.md`, `W-I.6.md`, `W-J.1.md`, `W-J.2.md`, `W-L.1.md`, `W-L.7.md`; under `formation-audit/sweeps/`: `inbound-fold.py`, `release-gates.py`, `chronic-decided.py`, `ledger-terminal.py` (new, each with its `.out`), `plan_dag.py` (a `BL_ROOT` override for before runs), `reshape-order.py` (two readings), and a `# ===== fix-10` section appended to the three older `.out` files; this file. The plan has no `MIGRATION.md`; W-0.8 §7 carries the new rows |
| fence notes | (1) Nothing under `design/` was read or written. (2) No `git checkout`, `restore` or `stash`: the one plant in the worktree (the lighting-census pass fixture) was undone by copying back three saved files, and `git status` there read clean after. (3) One slip: a sweep's output was redirected once to `/tmp/rg.out` instead of the scratchpad; it was deleted in the same command. (4) Every sweep ran with `PYTHONDONTWRITEBYTECODE=1`; `sweeps/` has no `__pycache__`. (5) `npm pack @mkbabb/glass-ui@10.1.0` was run in the scratchpad to read the published tarball. (6) The machine's load average was above 300 for the whole seat; no timing cell was read |

## Result

All four findings are cured by class. None is refuted.

| finding | class | sweep | before (HEAD plan) | after |
|---|---|---|---|---|
| FI-01 | an inbound or owner-ruled row the plan has not folded: no ledger row, no plan line, a ledger row at a wave whose spec does not name it, a row INBOUND lands in band 0 that the ledger holds elsewhere, a carry `FORMATION-PROGRESS.md` owes to formation | `inbound-fold.py` | **exit 1**, ids 37, open 16 | **exit 0**, open 0 |
| FI-02 | two records of what a wave or a release waits on: PLAN §5 against §3's loop labels, §4's loop table, INDEX's loop column, each spec's header, every sentence that says what gates 10.2.0, every "exception" claim, and the rulings in INBOUND and FORMATION-PROGRESS | `release-gates.py` | **exit 1**, 99 waves, band-0 loop gates {D3}, open 2 | **exit 0**, 101 waves, band-0 loop gates {D2, D3}, open 0 |
| FI-03 | a chronic or deferred item with no decided row: an F-13 member or a deferred/dropped/never-decided audit finding that no ledger row or spec names; a DISEASE row whose wave does not name it; a cure hung on "if W-x cures K" where W-x does not name K | `chronic-decided.py` | **exit 1**, members 51, open 10 | **exit 0**, open 0 |
| FI-04 | (a) a deferred or chronic row BANKED, or non-RETIRE with no wave (also `chronic-decided.py`); (b) the ledger and the spec table it cites as its source state different terminals, and §9's counts against the rows | `ledger-terminal.py` | **exit 1**, open 1 | **exit 0**, ledger rows 820, open 0 |

Both runs of each new sweep are in its `.out`. The before runs read the worktree's copy of the plan through `BL_ROOT`.

The older sweeps, after: `reshape-order.py` **exit 0** (rows 83, open 0, stale 0; two new rows read, below); `borrowed-red.py` **exit 0** (rows 1, open 0); `fl6-plate-reads.py` **exit 0** (reads 27, open 0). On the first after run `reshape-order` listed 2 open rows and `borrowed-red` 4 (W-I.1's W3 to W8 and self-test rows restating W-0.8's commands); those were cured, not adjudicated away, except the two readings named below.

The DAG, after (`plan_dag.py` with `graphlib`): 101 specs, 101 §5 rows, a full topological order of 101, 0 dangling ids, 0 edges into a later band, and no band-0 wave depends on a wave outside band 0. A column count over every table in the 26 edited plan files finds 0 mismatches.

## What the sweeps found that pass 9 did not name

| sweep row | what it is | cure |
|---|---|---|
| `BAND O-84`, `BAND O-84a` | INBOUND's own cells land both in band 0; the ledger held them at W-I.1 | folded with O-88 (below) |
| `NO-PLAN O-86` | PLAN.md never named O-86, though W-L.1 owns it | `PLAN.md` §3 W-L.1 row and §7 band L |
| `MEMBER L01a-37` | **#37, a second undecided chronic.** BK retired W-SLIDER-TRANSPORT unbuilt at 8.0.0 and booked its gap "owner-revivable in a later tranche" (`BK/EXECUTION-PROGRESS.md:6696`). The census left the two retired rows out (`ledger/CENSUS.md:14`), so no ledger row existed | LEDGER `#37`, RETIRE at W-L.1: the same ask returned as O-86 and is ruled in W-L.1 §3.20 (a composition recipe, G-L1-19). `waves/W-L.1.md:45` names it. The booking is struck with no re-trigger. It is not marked DISEASE: BK did decide it (RETIRED); what rode was a booked revival, which this row ends |
| `MEMBER L01b-51`, `L01b-67`, `L01b-78`, `L05a-15` | F-13 members decided by waves that named the BK row number, not the member | member ids added to the family cells of W-B.6, W-I.6 (with L04-F15) and W-B.11; L05a-15's list is decided row by row in LEDGER §8 F-3 |
| `NO-HOME #20` | the ledger says #20 is a DISEASE row decided in W-C.4 "(own … W-C.4 §1)"; W-C.4's spec never named #20 | `waves/W-C.4.md` §1, first row |
| `NO-WAVE BG-ONWARD-4` | the same row as FI-04, read by a second arm | below |

## FI-01 · O-87, O-88 and O-89 folded

**O-89** (`waves/W-0.3.md`). The same no-ellipsis class at two more sites, so it joins W-0.3: title, header, §1 row, §2 (a new table of readings), §3 (the cure line), §4, §5 gates G7 to G9, §6, §8. Readings at `31f3c5ea` with fix-10's probe (appendix V): the EasingPicker readout and the ConfiguratorRow `name` span each compute `text-overflow: ellipsis`, `white-space: nowrap`, scroll/client 271/258 and 352/300 at 390 px, 271/176 and 352/226 at 260 px: **4 of 4 FAIL in Chromium and 4 of 4 in Playwright WebKit**. G9 (static) exits **1**, each half alone. G8 (the copy glyph on line 1) is a labelled hold line: 4 of 4 PASS at HEAD (line centre and glyph centre within 0.4 px, one line). ConfiguratorRow's `label` and `sub` spans also truncate; O-89 names the `name` span only, and the spec says those two stay with W-E.7.

**O-87** (`waves/W-0.11.md`, new). The band-0 token wave the ruling asks for, as a D3 loop wave: values come from D3's converged spec under the ruling, and only values (no name leaves). Its gates read a static census, `lighting-census.mjs` (printed in the spec's appendix A). At `31f3c5ea` it prints `LIGHTING-CENSUS stacked=2 halo=2 blur=5 open=9`, **exit 1**: `--shadow-modal` is two layers in both arms (`shadow.css:17`, `dark-arm.css:230`), `--shadow-dock` and `--shadow-dock-collapsed` are zero-offset glows (`shadow.css:34-35`), and the five blur radii stand at their 10.1.0 values. With a planted fixture (radii lowered, one-layer modal, offset dock cast) it prints `open=0`, **exit 0**; the plant was removed and the census re-read `open=9`. The census does not count the cartoon stamp family; whether O-87 touches it is D3's to rule. O-87's loop parts are hand-off rows named in W-H.2 §1, W-0.8 §1, W-J.1 §1 and W-J.2 §1, and obligations on D2, D3, D4 and D5 in PLAN §4 (the 12 critical passes and frames per pass among them).

**O-88** (`waves/W-0.8.md`, re-scoped). W-0.8 was the O-83 cap wave, an owner-ratified exception that landed ahead of D2. It is now D2's band-0 loop wave for the collapse unit: O-88's four items, O-83, O-65 R-1, O-55 R-1 and R-2 (F-17), O-84 (per D2's Q-10), O-84a, and F-16's extent and morph rows. Its harness gates are W-I.1's W3, W4, W5, W6 and W8 gates with W-I.1's HEAD readings (`8536f2cc`), in Chromium and Playwright WebKit `+shim`, at the harness's `docs/` path. Static gates re-run at `31f3c5ea`: G4 exit 1, G10 exit 1 (13 lines), G15 exit 1, G16 exit 1 (5 `collapseOnScroll` lines, no `scroll` prop), G11 exit 1 (the witness spec is absent).
- **The split has one record**, `W-0.8.md` §3.2: a table from each item of D2's converged spec (as `W-I.1.md` §3 describes it) to the wave that lands it. W-I.1 keeps the description and cites the table.
- **W-I.1** (`waves/W-I.1.md`): families, §1 rows, §3 preface, §3.1 item 2, §3.4, §4, §5, §6, §7, §8. G16 and G27 to G30 moved out (they are W-0.8's G10 and G12 to G15). G3, G4, G5, G6 and G8 now read the unshimmed Playwright WebKit column only (0 of N at HEAD and at the wave's base), so no gate of W-I.1 restates a W-0.8 command; `borrowed-red.py` listed them as RESTATED before that edit.
- **Ledger.** 37 rows re-pointed from W-I.1 to W-0.8, each named in W-0.8 §1; O-83, O-84 and O-84a rewritten; rows added for O-87 (five), O-88, O-89, CUR:110, CUR:112, CUR:113.
- **Followers.** W-I.3 (the script half of floor row 3 closes in W-0.8), W-E.7:111, W-B.4, W-F.4:13, W-F.2 (its two dock items are re-read at its base on W-0.8's chart), W-0.7 (entry, CHANGELOG and MIGRATION lines, the owner's glance, four new G5 clauses that read 1, 8, 1 and 1 on the published 10.1.0 tarball).

## FI-02 · one record of what gates 10.2.0

- **§5 is the record.** `PLAN.md` §5: `W-0.8 | D2 gate, W-0.3, W-0.11`, `W-0.11 | D3 gate, W-0.1, W-0.3`, W-0.7 waits on W-0.11 too, with one note giving each new edge its reason.
- **The duplicates now cite it or agree with it.** §6 reads "D2 and D3 gate 10.2.0" and cites §5. §1's "the one exception" is struck: W-0.8 is a D2 loop wave, so nothing lands ahead of a loop and checklist row 6 needs no exception. §1 item 1, §2 (the band table and a "band 0 waits on two loops" bullet), §4 (W-0.8 in D2's row, W-0.11 and W-H.6 in D3's), INDEX's loop column and the shared-kit note ("band 0's only external edge stays the D3 gate") are re-written to the same set. `release-gates.py` fails any of them that drifts.
- **Checklist row 7's text.** The critic's fixed row says band 0 depends on nothing outside itself "except D3 for the veil rows". The owner's O-88 ruling adds D2 for W-0.8. The plan records that in §5 and §6; the checklist text is the loop driver's to amend (listed under open).

## FI-03 · T-45 decided, in a wave of its own

`waves/W-H.6.md` (new), loop D3, family F-13 split. Ruling: **BUILD**. Grounds are in the spec's §3. Born-RED reading with fix-10's probe, scene `edge`, Chromium, at `31f3c5ea`: a `.glass-resting` box whose edge sits on a 2 px bright line, against the same class oversampled by four radii and clipped back.

| theme | 6 px | 10 px | 16 px |
|---|---|---|---|
| light, ΔL (card − reference) | +0.0493 | +0.0408 | +0.0278 |
| dark | +0.0457 | +0.0370 | +0.0239 |

**6 of 6 FAIL** against |ΔL| ≤ 0.02. With `FIXTURE=1` (the card built as the reference is) the same rows read ΔL 0.0000, **0 FAIL of 6**, so the gate can pass. Playwright WebKit reads ΔL 0.0000 because it paints no `backdrop-filter` headless; those rows are recorded and not gated. Captures: `edge-chromium-light.png` `4259af5e0ece`, `-dark.png` `73991a2badb0` (sha256 prefixes; the files are in the scratchpad and are re-derivable from appendix V).

Other edits: LEDGER row `T-45` (DISEASE, own wave); `PLAN.md` §2, §3, §4, §5, §7; `waves/W-L.7.md:83`, where "if W-H.2 cures T-45" becomes "retiring with W-H.6's backdrop edge sample".

## FI-04 · BG-ONWARD-4 decided, and one record of the terminal

- `LEDGER.md`, row `BG-ONWARD-4`: BANKED with "Re-trigger: a consumer ask" becomes **RETIRE** (DECLINE), with the grounds and no re-trigger.
- `waves/W-B.1.md` §3 items 3 and 5: the `terminal` column of both tables is struck and replaced by the ledger row id. LEDGER §6.1 is the one record of those terminals; the spec tables say what each item is and why.
- LEDGER §9 is recounted (499 BUILD, 131 FOLD, 7 BANKED, 183 RETIRE, 820 rows; DISEASE 45; docket 20 lines, 15 pending), and `ledger-terminal.py` recounts it against the rows on every run.
- The seven NOT-REPRODUCED rows that read BANKED (pass 9's note) are not instances: none is a chronic or a deferred item, each has a wave and a named re-trigger, and the sweep's BANKED arm passes them.

## Gates touched, and their readings

| gate | change | reading at `31f3c5ea` |
|---|---|---|
| W-0.3 G7, G9 | new (O-89) | FAIL 4 of 4 per engine; exit 1 |
| W-0.3 G8 | new, hold line | PASS 4 of 4; bite stated |
| W-0.11 G1 to G4 | new (O-87) | 5, 2, 2; exit 1. Fixture: exit 0 |
| W-0.11 G5, G6 | G5 a hold line (W-0.1's G5); G6 reads M-1 and D3's O-87 witness | M-1 exit 1 at HEAD (W-0.1's reading, not re-run); the O-87 witness does not exist yet and is D3's convergence gate |
| W-0.8 G1, G5 to G9, G12, G13 | moved from the old W-0.8 and from W-I.1 with their readings | not re-run here (the harness is under `design/`): fix-2's and the W-I.1 seat's readings |
| W-0.8 G4, G10, G14 (first half), G15, G16, G11 | static, re-run | exit 1 each; G11 exit 1 by the absent spec |
| W-0.8 G18 | docket gate | exit 1 (`DOCKET-O-88` reads pending) |
| W-I.1 G3, G4, G5, G6, G8 | narrowed to the unshimmed column | 0 of N, every cell crashed (the W-I.1 seat's reading) |
| W-H.6 H6-G1 | new (T-45) | FAIL 6 of 6 Chromium |
| W-H.6 H6-G2, H6-G3 | the fixture row; a hold line | 0 FAIL of 6; exit 0 with its bite stated |

## Open

1. **DOCKET-O-88, an owner question.** The collapse unit replaces two published dock surfaces (`useDockSearch`'s scroll options; the summary's `aspect-ratio` under Q-10 (b)). The owner ruled "ALL OF IT IN 10.2.0", and the charter forbids a dual path, so the seat default lands them as clean breaks in the minor with MIGRATION rows (every consumer pins 10.1.0 exact). The alternative is to hold the unit, or those two rows, for 11.0.0. The owner confirms or overrules with the 10.2.0 publish go.
2. **Checklist row 7's fixed text** ("band 0 … except D3") now contradicts the owner's O-88 ruling. The plan records D2 and D3; the critic prompt needs the same words or pass 10 fails row 7 on the ruling itself.
3. **The family for O-87's token wave.** W-0.11 is placed as an F-31 split (the material's ladder and lighting). The registry has no family for "over-lit chrome"; if the registry seat mints one, W-0.11's family cell follows.
4. **W-0.8's harness readings are not this seat's.** They are fix-2's and the W-I.1 seat's, moved with their gates. `design/` is fenced, so the D2 harness was not run here.
5. **RUL R-7** (carried from fix-9 and pass 9): whether `design/structure/RULINGS.md` R-7 keeps `./styles.css`. Not read here either.
6. **W-J.2's header** still says D5 "does not exist yet" beside PLAN §6's "the act is done". It is a seat reading of loop state, not a gate record, and no sweep here reads it.
7. **Real-Safari cells** for every new gate: UNMEASURED (OW-3).

## Appendix V · fix-10's probe

Scratch source, reproduced so a seat can replay it after a scratch wipe. `build.mjs` is `W-0.1.md` appendix A's, unchanged (`node build.mjs <worktree> head`). Scenes `easing` and `row` (O-89) land in the band-0 probe with W-0.3; scene `edge` (T-45) lands in the band-H probe with W-H.6. At `31f3c5ea` it prints `VERDICT head: 14 FAIL of 24 gated rows`, exit 1: O89-LITERAL 4, O89-ROW-NAME 4, T45-EDGE 6 (Chromium); the 4 O89-GLYPH-LINE-1 rows and the 6 Playwright WebKit T45 rows pass. With `FIXTURE=1` it prints `8 FAIL of 24` (the O-89 rows; every T45 row passes).

`App.vue`:

```vue
<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { EasingPicker } from "@glass/components/easing";
import { ConfiguratorRow } from "@glass/components/configurator";
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "easing";
const w = q.get("w") ?? "390";
const fixture = q.get("fixture") === "1";
// T-45: a ground that is dark everywhere except a 2 px bright line just inside the card's inline-start edge.
// A true blur spreads the line's energy thinly; a backdrop sample that edge-clamps at the border box
// replicates the line outward and pulls a bright band inward.
onMounted(async () => { await nextTick(); (window as any).__ready = true; });
</script>
<template>
  <main :style="scene === 'edge' ? 'padding:0' : 'padding:24px'">
    <template v-if="scene === 'easing'">
      <div data-probe="easing" :style="`width:${w}px;max-width:100%`">
        <EasingPicker :initial="{ mode: 'bezier', points: [0.123456, 0.654321, 0.987654, 0.345678] }" />
      </div>
    </template>
    <template v-else-if="scene === 'row'">
      <div data-probe="row" :style="`width:${w}px;max-width:100%`">
        <ConfiguratorRow label="Easing" name="cubic-bezier(0.123456, 0.654321, 0.987654, 0.345678)"><div>ctl</div></ConfiguratorRow>
      </div>
    </template>
    <template v-else-if="scene === 'edge'">
      <div data-probe="ground" style="position:fixed;inset:0;background:#000">
        <div style="position:absolute;left:200px;top:0;bottom:0;width:2px;background:#fff"></div>
        <div style="position:absolute;left:700px;top:0;bottom:0;width:2px;background:#fff"></div>
      </div>
      <!-- the shipped rung: its own backdrop-filter, its border box starting ON the bright line -->
      <div v-if="!fixture" data-probe="card" class="glass-resting" style="position:absolute;left:200px;top:100px;width:300px;height:200px;border-radius:0"></div>
      <!-- PLANTED GATE FIXTURE (?fixture=1), not a design: the card built as the oversampled reference is -->
      <div v-else style="position:absolute;left:200px;top:100px;width:300px;height:200px;overflow:hidden">
        <div data-probe="card" class="glass-resting" style="position:absolute;inset:-64px;border-radius:0"></div>
      </div>
      <!-- the reference: the same rung oversampled by 2R and clipped back to the same box -->
      <div data-probe="ref-clip" style="position:absolute;left:700px;top:100px;width:300px;height:200px;overflow:hidden">
        <div data-probe="ref" class="glass-resting" style="position:absolute;inset:-64px;border-radius:0"></div>
      </div>
    </template>
  </main>
</template>
```

`measure.mjs <label>`:

```js
// measure.mjs <label> — fix-10's probe: O-89 (two no-ellipsis sites) and T-45 (the backdrop edge sample).
// exit 1 on any FAIL row; writes caps/<label>/rows.json and every PNG it read.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui";
const require = createRequire(`${CHECKOUT}/package.json`);
const { PNG } = require("pngjs");
const { chromium, webkit } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname);
const label = process.argv[2] ?? "head";
const dist = path.join(HERE, "builds", label, "dist");
const out = path.join(HERE, "caps", label); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}/`;
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const okL = ([r, g, b]) => { const [R, G, B] = [lin(r), lin(g), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s; };
const rows = []; const row = (o) => { rows.push(o); console.log(JSON.stringify(o)); };
async function open(bt, qs, vw = 1280) {
  const b = await bt.launch(bt === chromium ? { args: ["--force-color-profile=srgb"] } : {});
  const ctx = await b.newContext({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
  await page.goto(`${base}?${qs}${process.env.FIXTURE ? "&fixture=1" : ""}`); await page.waitForFunction(() => window.__ready === true); await page.waitForTimeout(500);
  return { b, page, errs };
}
const read = (root, sel) => { const el = root.querySelector(sel); if (!el) return null; const cs = getComputedStyle(el); return { textOverflow: cs.textOverflow, whiteSpace: cs.whiteSpace, scroll: el.scrollWidth, client: el.clientWidth, text: el.textContent.trim() }; };
for (const [eng, bt] of [["chromium", chromium], ["webkit", webkit]]) {
  // ── O-89 · the EasingPicker readout literal and the ConfiguratorRow name, at 390 and 260 ──
  for (const w of [390, 260]) {
    { const { b, page, errs } = await open(bt, `scene=easing&w=${w}`, 390);
      await page.screenshot({ path: path.join(out, `easing-${eng}-${w}.png`), fullPage: true });
      const m = await page.locator('[data-probe="easing"]').evaluate(read, "code");
      row({ gate: "W-0.3/O89-LITERAL", eng, w, ...m, pass: !!m && m.textOverflow !== "ellipsis" && m.scroll <= m.client, errs: errs.length });
      // the copy glyph against the literal's first line box (a hold line while the literal is one line)
      const g = await page.locator('[data-probe="easing"]').evaluate((root) => { const code = root.querySelector("code"); const btn = code.closest("button"); const svg = btn.querySelector("svg:last-of-type") ?? btn.querySelector("svg"); const rg = document.createRange(); rg.selectNodeContents(code); const first = rg.getClientRects()[0]; const s = svg.getBoundingClientRect(); return { lineMid: +(first.top + first.height / 2).toFixed(2), glyphMid: +(s.top + s.height / 2).toFixed(2), lines: new Set([...rg.getClientRects()].map((r) => Math.round(r.top))).size }; });
      row({ gate: "W-0.3/O89-GLYPH-LINE-1", eng, w, ...g, pass: Math.abs(g.lineMid - g.glyphMid) <= 1, errs: errs.length });
      await b.close(); }
    { const { b, page, errs } = await open(bt, `scene=row&w=${w}`, 390);
      await page.screenshot({ path: path.join(out, `row-${eng}-${w}.png`), fullPage: true });
      const m = await page.locator('[data-probe="row"]').evaluate(read, "span.font-mono");
      row({ gate: "W-0.3/O89-ROW-NAME", eng, w, ...m, pass: !!m && m.textOverflow !== "ellipsis" && m.scroll <= m.client, errs: errs.length });
      await b.close(); }
  }
  // ── T-45 · the shipped rung against the same rung oversampled by 2R, both themes ──
  for (const theme of ["light", "dark"]) {
    const { b, page, errs } = await open(bt, `scene=edge&theme=${theme}`);
    const shot = await page.screenshot({ path: path.join(out, `edge-${eng}-${theme}.png`) }); const img = PNG.sync.read(shot);
    const R = await page.locator('[data-probe="card"]').evaluate((el) => { const m = /blur\(([\d.]+)px\)/.exec(getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter || ""); return m ? +m[1] : null; });
    const L = (x) => { let s = 0, n = 0; for (let y = 180; y < 220; y++) { const i = (img.width * y + Math.round(x)) << 2; s += okL([img.data[i], img.data[i + 1], img.data[i + 2]]); n++; } return +(s / n).toFixed(4); };
    for (const d of [6, 10, 16]) { const card = L(200 + d), ref = L(700 + d); row({ gate: "W-H.6/T45-EDGE", eng, theme, blurPx: R, depthPx: d, card, ref, dL: +(card - ref).toFixed(4), pass: R !== null && Math.abs(card - ref) <= 0.02, errs: errs.length }); }
    await b.close();
  }
}
srv.close();
fs.writeFileSync(path.join(out, "rows.json"), JSON.stringify(rows, null, 1));
const fails = rows.filter((r) => r.pass === false).length; console.log(`VERDICT ${label}: ${fails} FAIL of ${rows.length} gated rows`); process.exit(fails ? 1 : 0);
```
