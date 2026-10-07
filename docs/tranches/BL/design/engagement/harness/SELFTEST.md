# D5 · the engagement battery's self-test (H-1)

| field | value |
|---|---|
| seat | D5 pass 1, R-H (the harness rows H-1..H-9; the account is `../pass-1/RH.md`) |
| model | `claude-opus-5-5`, asserted from own system identity |
| harness | this directory (`HARNESS.md`): the witnesses E-1..E-9, `fixtures.mjs` (the clean page and `FAULTS`), `fixtures/e7/`, `wktouch.mjs` (WebKit touch, H-4) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| date | 2026-10-06. Full run 13:05:32-16:44:46 local (`logs/selftest.log:1,174`); the two load-broken runs re-run twice each, 16:53:05-17:09:53 (`logs/selftest-rerun.log`) |
| load | 34.45/45.98/37.24 at the start; the machine then climbed to 400-650 (1-minute) under other seats' runs (`logs/selftest.log:136` reads 436.8). Every cell line in `logs/selftest-cells.log` carries its own load |
| verdict | **GREEN.** 98 runs: 95 OK, 1 N/A, 2 BROKEN by load, both re-run twice and OK 2/2 (below) |

## 1 · What was run

```sh
H=docs/tranches/BL/design/engagement/harness
node $H/selftest.mjs --out <scratch>/out/selftest                           # every witness, both engines (98 runs)
node $H/selftest.mjs --only E-7 --engines webkit --out …                    # the re-runs, twice each
node $H/selftest.mjs --only E-8 --engines webkit --faults e8-units --out …
```

A run is OK when the clean fixture exits 0, each fault aimed at the witness exits 1 **with the planted cell among its FAIL lines**, and each control exits 0. `logs/selftest-cells.log` is every cell of every run (the per-run JSON flattened, one line per cell with its load).

## 2 · The table

| witness | clean fixture, both engines | plants (each FAILs its planted cell, both engines unless noted) | controls | log lines |
|---|---|---|---|---|
| E-1 | PASS 8/8 (adds `runtime … PRM press-light` per class) | `e1-undeclared`, `e1-norung`, `e1-dead`, **`e9-dark`** | `e1-stale` | `:2-21` |
| E-2 | PASS 36/36 | `e2-fade`, `e2-tabpop`, `e2-prog`, `e2-glide`, `e2-mountpop` (H-8), `e2-nocoarse` | `travel`, `rest` scenes | `:22-47` |
| E-3 | PASS 12/12 in **both** engines (the phone arm now reads in WebKit, H-4) | `e3-still`, `e3-kbd`, `e3-gutter` (**now WebKit too**), **`e3-prmgrow`** (`keyboard-focused PRM`: ×1.060) | — | `:48-65` |
| E-4 | Chromium PASS 6/6; WebKit PASS 4/6, 2 UNMEASURED (the strip: no touch scrolling) | `e4-drop`, `e4-hold`, **`e4-vdrop`**, **`e4-prmbounce`**, **`e4-stripstop`** (Chromium; N/A in WebKit, `:88`) | `e4-snap` | `:66-88` |
| E-5 | PASS 4/4 in **both** engines (H-4) | `e5-hover` (**now WebKit too**), **`e9-dark`** (`press-light(PRM)`) | — | `:89-98` |
| E-6 | Chromium PASS 14/14; WebKit PASS 12/12 (layouts/s REPORT) | `e6-absent`, `e6-dim`, `e6-layout`, `e6-prm`, `e6-fast`, **`e6-spin`** (`channel`: rotate), **`e6-saw`** (`shape`: seam 1 → 1.012, linear) | — | `:99-128` |
| E-7 | PASS 4/4 (Chromium `:129`; WebKit in the re-runs) | `e7-veil`, `e7-two`, **`e7-prm`** (`held PRM`: 0 nodes) | — | `:129-142` |
| E-8 | PASS 7/7 | `e8-drift`, `e8-literal`, **`e8-prmliteral`** (`literal pop PRM`: 100 ms) | `e8-units` (Chromium `:146`; WebKit in the re-runs) | `:143-158` |
| E-9 | PASS 24/24 | `e9-scale`, `e9-dark`, `e9-glide` | — | `:159-172` |

New in pass 1 in bold. The planted FAIL line for each is printed under its OK line in the log.

### 2.1 The two BROKEN runs

Both are harness errors under load, not verdicts: `E-7 webkit clean` exit 2, `page.waitForFunction: Timeout 20000ms exceeded` at load 436.8 (`:136`); `E-8 webkit control e8-units` exit 2 (`:154`). Neither is a witness reading the wrong way. Re-run twice each at load 233-285: OK 2/2 and OK 2/2 (`logs/selftest-rerun.log`). The rule (`HARNESS.md` §1.2): a failure seen only under load is NOT-REPRODUCED. The harness was hardened after this run: the page-ready wait is 60 s, and a ready or navigation timeout counts as an engine close (relaunch, re-run once), as does any raw-WebKit transport error.

## 3 · The plants that had to be rebuilt

Two first cuts of the new plants passed their witness. The witness was right both times (`../pass-1/rh/plants-first-cut.log`, `plants-second-cut.log`):

- `e4-vdrop` first picked the detent by position alone but still seeded the settle spring with the release velocity. The fling overshot the detent, which **is** velocity carried into the settle, so E-4 passed it correctly. The plant now drops the velocity entirely: FAIL, difference 0.00 px.
- `e4-stripstop` first tried to stop the platform fling by toggling `overflow-x` at touchend. Chromium's fling ran on anyway and landed one member on (`largest one-frame jump 540 px`). The plant now takes the gesture (`touch-action: none`), follows the finger itself and snaps to the nearest member at touchend: FAIL, both releases settle −120 px.

The E-4 PRM cell's first overshoot read counted a surface returning toward its start as an overshoot (the strip plant read 120 px). It now measures only how far the surface passes its rest in the direction it travelled.

## 4 · What the self-test does not prove

- Real Safari: no cell. UNMEASURED (owner's safaridriver checkbox).
- A touch drag in WebKit: macOS WebKit dispatches the touch events but does not scroll, so E-4's touch surfaces read UNMEASURED there (`../pass-1/rh/h4-probe.log`).
- The fixture's scenes are the contract's shapes, not the library's components. Whether a library scene exercises a witness is shown by the HEAD run (`../BASELINE.md`).
- The harness edits made after this run (bounded engine close, sub-millisecond instants in E-8, `--scenes` on every witness) were re-checked on the witnesses they touch, both engines: `--only E-5,E-8`, 16 runs, 15 OK at load 300-650; the one BROKEN run is `e8-units` in Chromium, `ENGINE CLOSED, REPRODUCED 2/2 (CELL TIMEOUT 60 s)` at load 393, re-run twice at load 228-242 and OK 2/2 (`logs/selftest-post.log`). The other witnesses were not re-run after these edits; the edits change no cell they read.
