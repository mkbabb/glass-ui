# π BATTERY — BAND β (temp-path / dark-sync) · 2 CELLS · BOTH DRAINED

**Seat:** the singleton browser seat, **`claude-opus-5`** — asserted from this seat's OWN
subagent transcript
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_e9e29b07-16b/agent-a19842671089d4bf1.jsonl`,
whose first user message is this band's order (`ts 2026-08-28T17:08:01.414Z`, matched on
its `YOUR BAND: the β temp-path pair` line) and whose every assistant record carries
`model: claude-opus-5`. The assertion `&&`-gated every command in this band.
**Session:** 2026-08-28. **Repo HEAD at capture:** `207bf174`.
**Directory name kept** (`2026-08-25-pi-band/`) — it is the band's identity, cited in ⊕⁷⁹.
Dates live inside this record, not in the path.

---

## THE ORDER vs THE RECORDS — a divergence, stated

The order names *"the β temp-path pair — 2 cells"* with **two** sources of record:
`2026-08-10-lanebeta-unit1/` and `-unit2/`. The records were read before any capture, and
they disagree with the order's plural on one point:

| record | π content | what it enqueues |
|---|---|---|
| `2026-08-10-lanebeta-unit1/` (unit **β0**, the `darkModeSyncScript` commit seat) | `PI-QUEUE.md` in full + `RECORD.md` **ACT 4** + `§6 RT-β0-C` | the **two** cells drained below |
| `2026-08-10-lanebeta-unit2/` (unit **β1**, `#17 W-COMMENT-DIET`, the comment counter) | **NONE** — `grep -c "π" RECORD.md` → **0**, `grep -c "π" PASTE-BLOCKS.md` → **0** | **nothing** |

**The records win, as ordered.** The pair is unit β0's pair entire; unit β1 is a
comment-census unit with no paint surface and no π section, and it is drained by having
nothing to drain. That is the whole divergence — the cell **count** the order gives (2) is
right; only its attribution to two records is not.

The debt these two cells answer is **`RT-β0-C`** (`unit1/RECORD.md §6`: *"the π pair,
`PI-QUEUE.md` → the **singleton browser seat**. OPEN."*). Its captures are banked here;
**the disposition annotation is the driver's, not this seat's.**

---

## WALL RECOVERY — censused, and nothing owed to this band

The predecessor band died at a session wall on 2026-08-25 leaving 18 partial files under
`alpha-dock-search/`. They were **censused first**, and they are **α's subject** (dock +
search): each was dispositioned ADOPT-or-SUPERSEDE **per file, by the α seat in this same
session** — its table is at `alpha-dock-search/PI-BATTERY-alpha-dock-search.md`
§"WALL RECOVERY". **Not one of the 18 touches the dark-sync or temp-path surface**, so
**this band adopts nothing and supersedes nothing.** Nothing was deleted. β writes only
into its own `beta-temp-path/` directory, created at this session.

---

## ENVIRONMENT

**Browser.** Chromium **151.0.0.0**
(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) … Chrome/151.0.0.0 Safari/537.36`),
driven by the `chrome-devtools-mcp` daemon **1.2.0** (`pid 96306`,
`socket=/tmp/chrome-devtools-mcp-504.sock`, `start-date 2026-08-28T14:52:22.705Z`) through
the **`chrome-devtools-mcp:chrome-devtools-cli`** skill. The MCP tool schemas are **not
registered in this session** — `ToolSearch` returns no browser tool and no MCP server is
configured for this project (`.mcp.json` absent, `mcpServers` empty) — so the CLI is the
sanctioned path to the same server over its socket. **No hand-rolled browser script was
written.** The daemon was **already running and was reused, not started by this seat, and
was not stopped by it**. ONE browser context throughout; the one page this seat created was
**closed at band end**.

**Dev server.** A server on `localhost:5400` was present as page 1 for the whole band. **It
was not started by this seat, was not used by any cell in this band, and was not killed** —
these two cells run against a `file://` temp-path harness and touch no dev server. No port
was opened by this seat.

**Observation discipline.** Screenshot + `getComputedStyle` only. **`getContext()` was never
called** — the specimen contains no canvas at all, and the standing context-steal fence
(the V-A95 artifact class) was honoured regardless. Every colour figure below is read
either from `getComputedStyle` or from the **captured PNG in Node** (`pngjs`), never from a
live drawing context. `scripts/paint-arm.mjs` is **absent** at this HEAD (the colour math
lives at `scripts/lib/paint-arm.mjs`); it was not needed — the specimen's grounds are pure
sRGB `#ffffff` / `#000000` and `getComputedStyle` returned plain `rgb()`, not `oklab()`.

**dpr.** `devicePixelRatio` is **1** under the emulated `1024x768` viewport (the emulation
sets `deviceScaleFactor` 1; the same page reads `dpr 2` un-emulated). No crop was taken, so
no dpr scaling was applied to any box — the PNGs are 1024×768, exactly the CSS viewport.

---

## THE SPECIMEN — derived, not transcribed

`PI-QUEUE.md` §1 requires a temp-path harness because **`darkModeSyncScript()` has zero
injection sites in this repo** and the demo stamps its own class off `?mode=dark`
(`demo/main.ts:86-103`, re-read at this HEAD and still true) — so a π run against the demo
would measure `demo/main.ts`, not this module.

The harness at **`/tmp/bk-beta0-firstpaint.html`** (689 B) was materialised from the
module's own output, **derived at this seat** (`src/composables/dark/darkModeSyncScript.ts`
loaded through `jiti`; `darkModeSyncScript({queryOverride: true})`), never typed:

| emission | bytes | digest |
|---|---|---|
| `darkModeSyncScript({queryOverride:true})` — **the specimen** | **402** | `sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=` |
| `darkModeSyncScript()` — the DEFAULT, for provenance | **300** | `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=` |

The default line reproduces **⊕⁷⁶'s** figure exactly (*"BYTE-IDENTICAL to 8.0.0's 300 B /
`sha256-VTba…`"*), which is the CSP digest the module exists to keep stable; the specimen
differs from it by the query arm alone (+102 B).

**Byte-comparison against the queue's paste block: `MATCH: True`** — 402 B on both sides,
`sha256` head `4ff1d84bbcea87fc` on both. `PI-QUEUE.md` §1's *"regenerate rather than trust
the paste"* instruction was followed; the paste is confirmed correct and was **not** the
source of the file.

---

## THE VERDICT TABLE

| cell | verdict | one line |
|---|---|---|
| **π-β0-LIGHT** | **CAPTURED-GREEN** | `?light` beats a `"dark"` storage seed and a dark platform: no `dark` class, `colorScheme "light"`, ground painted `rgb(255,255,255)` across the whole frame |
| **π-β0-DARK** | **CAPTURED-GREEN** | `?dark` beats a `"light"` storage seed and a light platform: `dark` class present, `colorScheme "dark"`, ground painted `rgb(0,0,0)` across the whole frame |

`PI-QUEUE.md` §3 admits no partial credit: PASS is both cells stamping what the URL asked
for against a platform **and** a stored value that both say the opposite. **Both did.**

---

## π-β0-LIGHT — CAPTURED-GREEN

**URL** `file:///tmp/bk-beta0-firstpaint.html?light` · **viewport** `1024x768` · **dpr** `1`
· **emulated `prefers-color-scheme`** `dark` (observed live: `matchMedia("(prefers-color-scheme: dark)").matches === true`)
· **storage seed** `vueuse-color-scheme = "dark"`, read back **at capture time** as `"dark"`.

The three detectors named by `PI-QUEUE.md` §2, **verbatim**:

```
document.documentElement.classList.contains("dark")            →  false
document.documentElement.style.colorScheme                     →  "light"
getComputedStyle(document.documentElement).backgroundColor     →  "rgb(255, 255, 255)"
```

corroborating reads: `getComputedStyle(…).colorScheme → "light"` · `className → ""` (empty).

**Painted pixels** (`pi-b0-LIGHT-query-beats-storage-and-platform-1024x768.png`, 1024×768,
read in Node): top-left, centre and bottom-right all `[255,255,255]`; a 17 px grid over the
entire frame yields **one** distinct colour, `255,255,255`.

**Paired-π:** `pi-b0-LIGHT.json`.

## π-β0-DARK — CAPTURED-GREEN

**URL** `file:///tmp/bk-beta0-firstpaint.html?dark` · **viewport** `1024x768` · **dpr** `1`
· **emulated `prefers-color-scheme`** `light` (observed live: `matchMedia("(prefers-color-scheme: dark)").matches === false`)
· **storage seed** `vueuse-color-scheme = "light"`, read back **at capture time** as `"light"`.

```
document.documentElement.classList.contains("dark")            →  true
document.documentElement.style.colorScheme                     →  "dark"
getComputedStyle(document.documentElement).backgroundColor     →  "rgb(0, 0, 0)"
```

corroborating reads: `getComputedStyle(…).colorScheme → "dark"` · `className → "dark"`.

**Painted pixels** (`pi-b0-DARK-query-beats-storage-and-platform-1024x768.png`, 1024×768):
top-left, centre and bottom-right all `[0,0,0]`; the same 17 px grid yields **one** distinct
colour, `0,0,0`.

**Paired-π:** `pi-b0-DARK.json`.

---

## THREE THINGS THE PAIR IS HONEST ABOUT

**1 · The black frame is not a black-fallback artifact, and the pair is its own control.**
A stolen context or a dead-primary fallback makes frames black *regardless of the ask*. Here
the two cells differ **only** in the query, and they paint **opposite** grounds — white and
black — from the same specimen in the same context minutes apart. A fake-black artifact
cannot produce the white frame; the pair discriminates itself.

**2 · The platform adversary is MASKED by the storage adversary, by the module's own
precedence — and both were still set.** The emitted script reads
`d = m==="dark" || ((m===null || m==="auto") && matchMedia(...))`: with a **concrete**
stored mode (`"dark"` / `"light"`, which is what each cell seeds), the `prefers-color-scheme`
arm is **never evaluated**. So in both cells the adversary the stamp actually beats is
**storage**, and the emulated platform is a second adversary that the module's documented
contract holds off-path. The emulation was applied and **observed live** anyway
(`mq_prefers_dark` recorded per cell, opposite per cell) so the record states the condition
each capture ran under rather than implying a contest that did not occur. This is the
module's contract, not a defect, and it is **not** routed.

**3 · First-paint ordering was corroborated on an INSTRUMENTED TWIN, and the light arm's
paint entry is honestly absent.** The specimen is verbatim per §1 and was never edited. A
twin at `/tmp/bk-beta0-firstpaint-instrumented.html` (831 B) is the specimen plus **one**
appended probe `<script>` — the emitted script byte-unchanged in it (verified) — recording
`performance.now()` and the stamp immediately after the emitted IIFE:

| arm | stamp read right after the IIFE | `performance` paint entries |
|---|---|---|
| dark (`?dark`, storage `"light"`, platform light) | `t = 28.4 ms`, `class "dark"`, `colorScheme "dark"` | `first-paint @ 48 ms` — **stamp precedes first paint by 19.6 ms** |
| light (`?light`, storage `"dark"`, platform dark) | `t = 27.1 ms`, `class ""`, `colorScheme "light"` | **`[]` — no paint entry at all**, re-read after an 800 ms settle |

The light arm records **no** `first-paint` because its ground (`#ffffff`) is the browser's
own default canvas colour, so there is no paint for the entry to mark. That is the reading;
it is stated as an observation with its mechanism, **not** as a proof. Note what it also
rules out: a page that stamped dark first and corrected afterwards would have painted black
and then white, and that paint would have been recorded.

---

## FILES BANKED (all under `docs/tranches/BK/execution/2026-08-25-pi-band/beta-temp-path/`)

```
PI-BATTERY-beta-temp-path.md                                  this record
pi-b0-LIGHT.json                                              paired-π, cell 1
pi-b0-LIGHT-query-beats-storage-and-platform-1024x768.png     screenshot, cell 1
pi-b0-DARK.json                                               paired-π, cell 2
pi-b0-DARK-query-beats-storage-and-platform-1024x768.png      screenshot, cell 2
```

Each JSON carries its own capture conditions inside it — `url`, `viewport`, `dpr`, the
emulated and the *observed* colour scheme, the storage seed and its read-back, the three
detectors, the PNG's sampled pixels + `sha256` head, and the twin's ordering read — so a
later seat can verify adoption from content, which is the property the α wall-recovery
census showed to be the one that matters.

## REAL EXIT CODES

```
chrome-devtools list_pages          0
chrome-devtools navigate_page       0
chrome-devtools evaluate_script     0
chrome-devtools take_screenshot     0
node <pixel read, pngjs>            0
node <emission derive, jiti>        0
```

## FENCE

No source byte touched. No gate file touched. No repo file written outside this band's own
directory. Nothing staged, committed, stashed or checked out — `git status --porcelain` at
band end is the single untracked line `docs/tranches/BK/execution/2026-08-25-pi-band/`.
Both temp-path files (`/tmp/bk-beta0-firstpaint.html`, `…-instrumented.html`) live outside
the repo by the queue's own §4 and leave nothing to prune. **Both cells CAPTURED-GREEN; no
defect was found and nothing is routed.**
