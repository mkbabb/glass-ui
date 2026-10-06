# W-L.7 · W-LANDING: the 11.0.0 packets, measured per consumer, and the relay · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b3d7fa28` in a scratch worktree; `src` identical to v10.1.0; `dist/` built and packed there (`npm pack` → `mkbabb-glass-ui-10.1.0.tgz`). Sibling repos read only |
| ships in | 11.0.0 (the packets are written against the 11.0.0 release commit, before the tag) |
| families | F-68 remainder (`audit/REGISTRY.md:1450-1465`): the 11.0.0 packets and relay. Members L15a-F4, L15a-F3, L15a-F5, L15a-F10, L15a-F12, L06-01, L06-07, L06-12, L06-13, L01b-76, L05b-13, L10-08, L11-11, R2-03-10, R2-03-11, R2-07-11. The 10.2.0 relay leg is W-0.7's |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| engines | none for the packets. Visual claims are the source waves' |

## 1 · What it closes

| id | defect |
|---|---|
| mechanism (REG:1452) | consumers install older majors, no consumer schedules the landing repin, so BL's cures do not reach the owner's surfaces; consumer gates read their stale install as producer state |
| L06-01, R2-07-11 | per-consumer migration packets measured from each consumer's import graph, hard breaks and silent no-op bindings named (E-11). R2-07-11 measured value.js 16 hard + 24 silent, keyframes.js 21+3 hard + 14 silent, fourier 0 + 6 silent against the 10.0.1-era tarball |
| L06-06, R2-07-11 | MIGRATION's successor column is not transitively closed |
| L06-07 | cures ship with no "cured-ask" notice; consumer interims are never retired |
| L06-11 | the consumer census of record is by memory or the wrong root |
| L06-12 | orphaned glass-ui copies (a 3.1.1 clone in words, a 5.0.0 worktree in value.js's `.claude`, vendored dists, 19 `~/Programming/glass-ui-consumer-*` residues) |
| L06-13 | fourier rebuilt IconTooltip as a wrapper; speedtest still imports `./icon-tooltip` |
| R2-03-10, R2-03-11 | value.js's dock changes on a plain repin; no docket row is pin-only, so the landing is 11.0.0 |
| REG:416 (C-2) | chicago's three temporary overrides, named for retirement in its landing letter |
| E-6, N-6 | consumers update, the API does not wait; changes at the root are communicated |

## 2 · The state at HEAD

**Pins** (read only):

| consumer | pin |
|---|---|
| value.js | `10.1.0` (`value.js/package.json:89`) |
| keyframes.js | `10.1.0` (`keyframes.js/package.json:78`) |
| fourier-analysis | `10.1.0` (`fourier-analysis/web/package.json:19`) |
| atlas | `^10.1.0` peer (`atlas/package.json:121`), `10.1.0` dev (`:144`) |
| chicago | `10.1.0` (`chicago/package.json:12`) |
| slides | `10.1.0` (`slides/package.json:30`) |
| speedtest | `10.1.0` (`speedtest/package.json:93`) |
| bbnf-buddy | `10.1.0` (`bbnf-buddy/package.json:21`) |
| sci-report | `7.0.0` (`sci-report/dashboards/package.json:17`) |
| scaena | `file:../../vendor/npm/mkbabb-glass-ui-8.0.3.tgz` (`scaena/apps/web/package.json:13`) |
| muster | `^3.1.0` (`muster/frontend/package.json:19`) |
| words | `^3.0.0` (`words/frontend/package.json:19`) |
| bbnf-lang | `^3.0.0` (`bbnf-lang/playground/package.json:13`) |

F-68's evidence line ("value.js `^7.0.0`", REG:1461) is stale again: value.js moved to 10.1.0 exact under the owner's all-on-10.1 ruling (CUR:58).

**The hard-break half of a packet, against HEAD's surface** (appendix A, `packet-breaks.mjs`: every runtime named import from `@mkbabb/glass-ui…` in each consumer, excluding docs, tests and `node_modules`, checked against the entries and names `dist/` exports):

| consumer | files importing glass | absent doors | absent names |
|---|---|---|---|
| value.js, keyframes.js, fourier, atlas, chicago, slides, speedtest, bbnf-buddy, scaena | 97, 93, 77, 46, 7, 15, 83, 34, 25 | 0 | 0 |
| sci-report | 20 | 2: `./completion-seal`, `./drawer` | 0 |
| muster | 34 | 9 (incl. `./api`, `./controls`, `./forms`, `./instrument-chassis`, `./metric-badge`) | 12 (e.g. `./sheet:Sheet`, `./sheet:SheetHeader`, `./sheet:SheetTitle`) |
| words | 87 | 5 (`./confirm-dialog`, `./controls`, `./dropdown-menu`, `./forms`, `./hover-card`) | 8 (e.g. `./carousel:CarouselNext`, `./dock:DockIconButton`) |
| bbnf-lang | 12 | 1 (`./controls`) | 1 (`./dock:DockIconButton`) |

The eight consumers on the 10.1.0 line read zero hard breaks against 10.1.0, as they should; the tool finds breaks where they exist (four consumers). The 11.0.0 packets are this tool run against the 11.0.0 release commit's pack, plus the silent half (§3.2).

**MIGRATION closure** (appendix B, `migration-closure.mjs`, the successor cell of every table row, struck names and dated notes ignored, cells that say removed or retired skipped): 2 failures.

- `MIGRATION.md:2534`: `./context-menu` → successor `@mkbabb/glass-ui/dropdown-menu`, an entry removed at 8.0.0 (row `:745` re-points it to `./menu`).
- `MIGRATION.md:2675`: the ConfirmDialog successor prescribes `<DialogContent … :show-close="false">`; `dialog/DialogContent.vue` declares no `showClose`.

**chicago's three overrides** (`chicago/src/style.css`): `:131` `--dock-cap-rest: 9999px`; `:137` `.dock-run { overflow: visible }`; `:140-141` the tier floors `max(var(--glass-veil-dock), 0.62)` and `max(var(--glass-veil-wash), 0.62)`.

**Outbox**: `ls docs/tranches/BL/outbox` → absent. The roster of record omits chicago, scaena and bbnf-buddy (W-L.6 §2).

## 3 · The cure

### 3.1 One generator, reading each consumer's import graph

`scripts/audit/landing-packets.mjs` takes the packed 11.0.0 release commit and the roster file (`scripts/audit/consumer-roster.json`, W-L.6 §3.1). For each consumer, read only, it writes one packet with these sections:

1. **Pin.** The pin at the working tree and at the default branch (`git -C <repo> show <default>:package.json`), both stated when they differ (L06-11).
2. **Hard breaks.** Absent doors and absent names, each with the consumer's `file:line` and the MIGRATION row that answers it (§3.3 closes every row it cites).
3. **Silent bindings.** For each SFC that imports a glass component, `@vue/compiler-sfc` parses the template. Every attribute, prop and `v-on` on that component is checked against the component's declared props and emits, read from the 11.0.0 artefact's runtime component options, and against the native attributes of the element that carries its root role (W-L.2's rule). A name that matches none is a silent no-op, listed with `file:line` (E-11). This is where retired props land. value.js's `start-collapsed` and `show-rail` (R2-03-10) are the class; L06-04's "retired-prop detection moves into the packets" is this section.
4. **Paint changes on repin.** From each BL wave's DELTA pairs (the source waves' π records), the surfaces this consumer mounts that change paint at 11.0.0. value.js's dock rows (R2-03-10) are carried here if still live at the release commit.
5. **Honest-RED rows it may turn green.** Each inbound row BL cured for this consumer, with its wave and the consumer's own gate name (the O-rows in W-B.2's reply letter).
6. **Interims to retire.** Consumer overrides that exist only because of a glass defect BL cured, each with `file:line` and the cure's wave (L06-07). Fixed entries: chicago's three overrides (§2), retiring with W-I.1's dock cap and run cures and W-0.1/W-H.1's veil; fourier's `--viz-amber` and `--section-color-*` re-points (`fourier-analysis/web/src/style.css:236-286` at this seat; L06-07 cited them at `:276-288`, and the capsule-track override it cited at `:306-312` is gone from that file); value.js's T-45 pane-card seat (`value.js/demo/styles/shell.css:300-345`, named at `:6` and `:128`), retiring with W-H.6's backdrop edge sample (T-45, H6-G1); scaena's vendored 8.0.3 and its README (W-L.4); fourier's Tooltip wrapper (`fourier-analysis/web/src/components/ui/tooltip/Tooltip.vue`) against W-L.1's `<Tooltip content>` (L06-13; speedtest's `./icon-tooltip` import is gone at HEAD, `rg icon-tooltip speedtest/src` → 0).
7. **The repin is yours.** One sentence: the consumer repins in its own tranche addendum (E-6); glass writes nothing into its tree.

### 3.2 The consumers and the relay

Packets go to all 13 roster consumers. The four on older majors (sci-report, muster, words, bbnf-lang) get the same packet; their hard-break section is long and is the whole point. Letters go through W-B.2's outbox as `docs/tranches/BL/outbox/glassui-outbound-<date>-11.0.0-<consumer>.md`. value.js's orchestrator relays for keyframes.js and fourier, as it did for 10.2.0 (W-0.7 §3 step 9), so those three letters are sent to value.js's inbox together. The relay is sent after the tag is live (W-L.8), with the packet contents fixed at the release commit.

L06-12's orphaned copies are named in the owner's close glance (W-L.8) as a hygiene list with paths. They are sibling or home-directory trees: glass does not delete them, and the owner rules each.

### 3.3 MIGRATION closes over itself

`MIGRATION.md:2534`'s successor becomes `@mkbabb/glass-ui/menu`; `:2675`'s successor drops `:show-close="false"` for the close control DialogContent declares at the release commit. `migration-closure.mjs` moves to `scripts/audit/` and runs in CI through `tests/gates/migration-closure.test.ts`, which `npm test` runs in W-D.2's `verify.yml` (it reads only this repo; no workflow line of its own, fix-8, FG-01), over every section including `## 11.0.0`, so W-L.6's removal rows and every break row of bands A-L are closed when written.

## 4 · Files it touches

New: `scripts/audit/landing-packets.mjs`, `scripts/audit/migration-closure.mjs` (appendix B), `tests/gates/migration-closure.test.ts` (runs it); the 13 letters under `docs/tranches/BL/outbox/`. Edited: `MIGRATION.md` (`:2534`, `:2675`, and the `## 11.0.0` table's successor cells).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L7-1 · a packet per consumer | `for c in value.js keyframes.js fourier atlas chicago slides speedtest bbnf-buddy sci-report scaena muster words bbnf-lang; do ls docs/tranches/BL/outbox/*-11.0.0-$c.md >/dev/null 2>&1 \|\| exit 1; done` | exit 0 | **exit 1**: no outbox |
| G-L7-2 · packets from the graph | `node scripts/audit/landing-packets.mjs --pack <11.0.0 tgz> --check`: re-derives every packet and diffs it against the letter on disk | exit 0, no diff | **fails**: the generator does not exist. Its hard-break half ran here as appendix A and bites (sci-report 2 absent doors, muster 9 and 12 names, words 5 and 8, bbnf-lang 1 and 1) |
| G-L7-3 · MIGRATION is closed | `node scripts/audit/migration-closure.mjs` | exit 0 | **exit 1**: 2 failures (`:2534`, `:2675`) |
| G-L7-4 · chicago's interims are named | `f=$(ls docs/tranches/BL/outbox/*-11.0.0-chicago.md) && grep -q -- '--dock-cap-rest' $f && grep -q 'overflow: visible' $f && grep -q '0.62' $f` | exit 0 | **exit 1**: no letter |
| G-L7-5 · the silent half bites | the generator's silent-binding section, run on a fixture SFC that binds `<Button variant="ghost">` and `<Dock start-collapsed>` and sets `--skeleton-glass-bg` (UIA-V-456) against the release pack | all three names listed as silent | **fails**: no generator. The fixture pins the section to the names 7.0.0 and 10.0.0 removed |
| G-L7-6 · no sibling write | `git diff --name-only <W-L.7 base>..<W-L.7 last> \| grep -v '^docs/tranches/BL/\|^scripts/\|^tests/\|^MIGRATION.md\|^\.github/'` | empty | not applicable before the wave; it holds if the wave writes only its own paths |

## 6 · π and DELTA obligations

No visual claim of its own. §3.1 item 4 cites the source waves' DELTA pairs by path and sha256; a paint change named in a packet without a pair on disk is a defect of the packet (the generator refuses to write a paint row that cites no pair).

## 7 · MIGRATION rows (11.0.0)

This wave writes no new break. It edits `:2534` and `:2675`, and G-L7-3 holds every break row written by bands A-L to the closure rule.

## 8 · Ledger rows

Closes F-68's remainder (every member above), census #66's re-pin gate and #76's adopt remainder (`census-register-b.md:56,62`), E-6 and N-6 (the relay half; N-6's intake half is W-B.2's), N-8b's consumer half, L06-06, L06-07, L06-11's census clause, L06-12 (named to the owner), L06-13 (the successor in fourier's packet; speedtest's half already cured on its side), C-2's chicago overrides. Each consumer's repin is recorded as that consumer's act, not as a BL row left open. The packet-riding rows close on the packets' gates: #18b (RT-18E, atlas and speedtest off the five deleted subpaths), #53e (the fourier adopt), #55b (RT-55A) and #59c (§11 LIB-SEAM) on G-L7-1 and G-L7-2, each named as a line of its consumer's packet; the O-55 R-3, O-65, O-66 and O-67 notices on G-L7-1 (the notice section of each packet) and G-L7-2 (re-derived from the graph).

## Appendix A · `packet-breaks.mjs` (the hard-break half)

For each roster repo, `rg -l @mkbabb/glass-ui` (types ts, vue, js; excluding `node_modules`, `dist`, `.worktrees`, `.claude`, `docs`), then every `import { … } from "@mkbabb/glass-ui…"` (type-only imports and `type`-prefixed names skipped; `*.css` and `/styles` specifiers skipped). A specifier with no `exports` entry is an absent door; a name the entry does not export is an absent name. The surface file is `surface.mjs`'s TSV (W-L.6 appendix A). Output at HEAD: the table in §2.

## Appendix B · `migration-closure.mjs`

```js
lines.forEach((l, i) => {
  if (!l.startsWith("|") || /^\|\s*:?-/.test(l)) return;
  const cells = l.split("|").slice(1, -1); if (cells.length < 2) return;
  const succ = cells.at(-1).replace(/~~[^~]*~~/g, "").replace(/\[20\d\d-\d\d-\d\d[^\]]*\]/g, "");
  if (/\b(removed|retired|cut|no successor|left with|gone)\b/i.test(succ)) return;
  for (const m of succ.matchAll(/@mkbabb\/glass-ui(\/)([a-z][\w-]*)(?=[`\s)/,;]|$)/g))
    if (!keys.has("./" + m[2])) bad.push(`MIGRATION.md:${i + 1} successor subpath ./${m[2]} is not exported`);
  if (succ.includes(":show-close") && !/showClose/.test(read("src/components/dialog/DialogContent.vue")))
    bad.push(`MIGRATION.md:${i + 1} successor prescribes :show-close, which DialogContent.vue does not declare`);
});
```

Output at HEAD: the two lines of §2, `closure failures: 2`, exit 1. A first, looser form (any backticked `./x` or `/x` in the last cell, no strike or date handling) reported 58 hits, most of them struck names, dated notes and demo route paths; it was narrowed to consumer-written specifiers so each hit is a successor a consumer would type. The prop arm names one prop; the wave generalises it to every `:prop` in a successor cell checked against the release commit's declared props.
