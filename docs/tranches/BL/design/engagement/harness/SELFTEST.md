# D5 · the engagement battery's self-test (H-1)

| field | value |
|---|---|
| seat | D5 pass 2, H2 (the restated witnesses, REGISTRY §P1-6; the account is `../pass-2/H2.md`). Pass 1's reading (R-H, 98 runs, 2026-10-06) is superseded; its record stays in `logs/` and `../pass-1/RH.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| harness | this directory (`HARNESS.md`): E-1..E-11, `fixtures.mjs` (the clean page and 74 `FAULTS`, 36 of them pass 2's), `fixtures/e7/`, `wktouch.mjs`, `capture.mjs` |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| date | E-1..E-10: 2026-10-14 (rec3, one uninterrupted sequence); E-11: 2026-10-15 (rec4, on its final rule). Logs and JSON under `../pass-2/H2/logs/` (`rec3-selftest-*.log`, `rec4-selftest-e11.log`) and `../pass-2/H2/rec3/`, `../pass-2/H2/rec4/` |
| load | 13-185 (1-minute): D1-D4 seats' browsers shared the machine. Every cell line carries its own load |
| verdict | **GREEN in both engines**: 174 runs, 173 OK, 1 N/A (`e4-stripstop` in WebKit), 0 BROKEN, 0 UNREAD |

## 1 · What was run

```sh
H=docs/tranches/BL/design/engagement/harness
node $H/selftest.mjs --engines chromium --out <dir>      # every witness, one engine (87 runs)
node $H/selftest.mjs --engines webkit --out <dir>
node $H/selftest.mjs --only E-4 --out <dir>               # one witness, both engines
```

A run is OK when the clean fixture exits 0, each fault aimed at the witness exits 1 **with the planted cell among its FAIL lines**, each control exits 0, and each `expect: "unmeasured"` fault leaves its cell UNMEASURED with nothing failing. N/A: a fault whose input the engine lacks (`e4-stripstop` in WebKit: no touch scrolling). UNREAD: a fault whose planted cell failed only as an engine close (`ENGINE CLOSED`, `CELL TIMEOUT`) in three runs; it is not OK, because an engine close is no reading of the plant (`../pass-2/H2.md` §2.3).

## 2 · The reading of record

The harness changed as readings exposed faults (`../pass-2/H2.md` §2.1, §2.3). Each witness's record is its last run on its final code: E-1..E-10 rec3 (their files byte-identical to `../pass-2/H2/rec3-harness.sha1`), E-11 rec4. `tabulate.mjs selftest` on those logs:

| witness | engine | clean fixture (gating cells) | plants FAIL on the planted cell | controls PASS | UNMEASURED plants | N/A | BROKEN | load (1-min) |
|---|---|---|---|---|---|---|---|---|
| E-1 | chromium | 22 pass, 0 fail, 0 unmeasured of 22 | 13/13 | 1/1 | - | - | 0 | 30-36 |
| E-2 | chromium | 36 pass, 0 fail, 0 unmeasured of 36 | 11/11 | 1/1 | - | - | 0 | 35-52 |
| E-3 | chromium | 22 pass, 0 fail, 0 unmeasured of 22 | 10/10 | 1/1 | - | - | 0 | 86-163 |
| E-4 | chromium | 9 pass, 0 fail, 0 unmeasured of 9 | 8/8 | 1/1 | 1/1 | - | 0 | 69-185 |
| E-5 | chromium | 8 pass, 0 fail, 0 unmeasured of 8 | 3/3 | - | - | - | 0 | 94-105 |
| E-6 | chromium | 14 pass, 0 fail, 0 unmeasured of 14 | 7/7 | - | - | - | 0 | 99-124 |
| E-7 | chromium | 7 pass, 0 fail, 0 unmeasured of 7 | 5/5 | - | - | - | 0 | 98-102 |
| E-8 | chromium | 7 pass, 0 fail, 0 unmeasured of 7 | 3/3 | 1/1 | - | - | 0 | 102-117 |
| E-9 | chromium | 24 pass, 0 fail, 0 unmeasured of 24 | 3/3 | - | - | - | 0 | 86-114 |
| E-10 | chromium | 4 pass, 0 fail, 0 unmeasured of 4 | 4/4 | - | - | - | 0 | 68-80 |
| E-11 | chromium | 1 pass, 0 fail, 0 unmeasured of 1 | 1/1 | - | 2/2 | - | 0 | 15-15 |
| E-1 | webkit | 22 pass, 0 fail, 0 unmeasured of 22 | 13/13 | 1/1 | - | - | 0 | 35-69 |
| E-2 | webkit | 36 pass, 0 fail, 0 unmeasured of 36 | 11/11 | 1/1 | - | - | 0 | 35-80 |
| E-3 | webkit | 22 pass, 0 fail, 0 unmeasured of 22 | 10/10 | 1/1 | - | - | 0 | 42-72 |
| E-4 | webkit | 7 pass, 0 fail, 3 unmeasured of 10 | 7/7 | 1/1 | 1/1 | e4-stripstop | 0 | 31-70 |
| E-5 | webkit | 8 pass, 0 fail, 0 unmeasured of 8 | 3/3 | - | - | - | 0 | 50-58 |
| E-6 | webkit | 12 pass, 0 fail, 0 unmeasured of 12 | 7/7 | - | - | - | 0 | 66-85 |
| E-7 | webkit | 7 pass, 0 fail, 0 unmeasured of 7 | 5/5 | - | - | - | 0 | 87-91 |
| E-8 | webkit | 7 pass, 0 fail, 0 unmeasured of 7 | 3/3 | 1/1 | - | - | 0 | 93-102 |
| E-9 | webkit | 24 pass, 0 fail, 0 unmeasured of 24 | 3/3 | - | - | - | 0 | 103-114 |
| E-10 | webkit | 4 pass, 0 fail, 0 unmeasured of 4 | 4/4 | - | - | - | 0 | 104-124 |
| E-11 | webkit | 1 pass, 0 fail, 0 unmeasured of 1 | 1/1 | - | 2/2 | - | 0 | 13-13 |

total 174 runs: 173 OK, 1 N/A, 0 BROKEN, 0 UNREAD (E-1..E-10 rec3: 166 runs, 165 OK, 1 N/A; E-11 rec4: 8 runs, 8 OK)

## 3 · What the self-test does not prove

- Real Safari: no cell. UNMEASURED (owner's safaridriver checkbox).
- A touch drag in WebKit: macOS WebKit does not scroll on touch, so E-4's touch surfaces read UNMEASURED there.
- The fixture's scenes are the contract's shapes, not the library's components. Whether a library scene exercises a witness is shown by the HEAD run (`../pass-2/H2.md` §3).
- Platform flings (the fixture strip, the library Carousel) are Chromium's compositor's own. At loads above ~150 the platform's fling can land short of the still release (`../pass-2/H2.md` §2.1); the touch drive's moves are clocked, but the compositor's pacing is not the harness's to fix.
- An N/A run is not read for unrelated failures.
