# D5 · the engagement battery's self-test (H-1)

| field | value |
|---|---|
| seat | D5 pass 3, H3 (REGISTRY §P2-7 items 1-7; the account is `../pass-3/H3.md`). Pass 2's reading (H2, 174 runs, 2026-10-14/15) is superseded and kept in §2 below as its record; pass 1's is in `../pass-1/RH.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| harness | this directory (`HARNESS.md`): E-1..E-11, `fixtures.mjs` (the clean page and 88 `FAULTS`, 14 of them pass 3's), `fixtures/e7/`, `wktouch.mjs`, `capture.mjs` (self-tested as `CAP`) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| date | 2026-10-16. Chromium 15:53-16:47, re-runs E-5/E-9 17:02-17:05 and CAP 22:33; WebKit 17:35-19:45, CAP re-run 22:33. Logs `../pass-3/H3/logs/selftest-*.log`, JSON `../pass-3/H3/json/selftest/` |
| load | 7-31 (1-minute) across the pass-3 runs; other seats shared the machine. Every cell line carries its own load |
| verdict | **GREEN in both engines** (pass 3): 204 runs, 203 OK, 1 N/A (`e4-stripstop` in WebKit), 0 BROKEN, 0 UNREAD on each witness's last run on its final code |

## 0 · Pass 3's reading of record (H3)

`node ../pass-3/H3/tabulate.mjs` on `../pass-3/H3/logs/selftest-<engine>-<id>[-rN].log`: the last run of each witness on its final code stands; a superseded run is named beside it. `zsh ../pass-3/H3/run-h3.sh st-chromium st-webkit` produced the first reads, `rerun-<engine>-<id>` the re-runs.

| witness | engine | runs | OK | BROKEN/UNREAD | N/A | load 1-min (start) | log |
|---|---|---:|---:|---:|---:|---|---|
| E-1 | chromium | 18 | 18 | 0 | 0 | 21.3-25.3 (2026-10-16 15:53:17) | `logs/selftest-chromium-E-1.log` |
| E-2 | chromium | 20 | 20 | 0 | 0 | 21.3-22.9 (2026-10-16 16:02:07) | `logs/selftest-chromium-E-2.log` |
| E-3 | chromium | 12 | 12 | 0 | 0 | 22.9-29.3 (2026-10-16 16:27:10) | `logs/selftest-chromium-E-3.log` |
| E-4 | chromium | 11 | 11 | 0 | 0 | 26.3-29.3 (2026-10-16 16:31:35) | `logs/selftest-chromium-E-4.log` |
| E-5 | chromium | 4 | 4 | 0 | 0 | 16.7-20.2 (2026-10-16 17:02:28) | `logs/selftest-chromium-E-5-r1.log`; superseded: selftest-chromium-E-5.log: 3 OK, 1 BROKEN |
| E-6 | chromium | 8 | 8 | 0 | 0 | 22.5-25.5 (2026-10-16 16:38:46) | `logs/selftest-chromium-E-6.log` |
| E-7 | chromium | 6 | 6 | 0 | 0 | 20.3-22.5 (2026-10-16 16:40:35) | `logs/selftest-chromium-E-7.log` |
| E-8 | chromium | 5 | 5 | 0 | 0 | 15.8-20.3 (2026-10-16 16:40:59) | `logs/selftest-chromium-E-8.log` |
| E-9 | chromium | 5 | 5 | 0 | 0 | 20.2-31.4 (2026-10-16 17:03:22) | `logs/selftest-chromium-E-9-r1.log`; superseded: selftest-chromium-E-9.log: 4 OK, 1 BROKEN |
| E-10 | chromium | 7 | 7 | 0 | 0 | 15.2-25.6 (2026-10-16 16:44:41) | `logs/selftest-chromium-E-10.log` |
| E-11 | chromium | 4 | 4 | 0 | 0 | 23.0-25.6 (2026-10-16 16:46:09) | `logs/selftest-chromium-E-11.log` |
| CAP | chromium | 2 | 2 | 0 | 0 | 8.1-8.7 (2026-10-16 22:33:21) | `logs/selftest-chromium-CAP-r1.log`; superseded: selftest-chromium-CAP.log: 2 OK, 0 BROKEN |
| **all** | **chromium** | **102** | **102** | **0** | **0** | | |
| E-1 | webkit | 18 | 18 | 0 | 0 | 13.1-18.2 (2026-10-16 17:35:36) | `logs/selftest-webkit-E-1.log` |
| E-2 | webkit | 20 | 20 | 0 | 0 | 8.9-13.1 (2026-10-16 17:40:43) | `logs/selftest-webkit-E-2.log` |
| E-3 | webkit | 12 | 12 | 0 | 0 | 8.9-9.9 (2026-10-16 18:09:05) | `logs/selftest-webkit-E-3.log` |
| E-4 | webkit | 11 | 10 | 0 | 1 | 9.9-17.3 (2026-10-16 18:14:48) | `logs/selftest-webkit-E-4.log` |
| E-5 | webkit | 4 | 4 | 0 | 0 | 15.2-17.3 (2026-10-16 18:21:41) | `logs/selftest-webkit-E-5.log` |
| E-6 | webkit | 8 | 8 | 0 | 0 | 12.3-15.2 (2026-10-16 18:23:04) | `logs/selftest-webkit-E-6.log` |
| E-7 | webkit | 6 | 6 | 0 | 0 | 9.1-12.3 (2026-10-16 18:23:47) | `logs/selftest-webkit-E-7.log` |
| E-8 | webkit | 5 | 5 | 0 | 0 | 9.1-20.2 (2026-10-16 18:58:34) | `logs/selftest-webkit-E-8.log` |
| E-9 | webkit | 5 | 5 | 0 | 0 | 17.4-20.2 (2026-10-16 19:34:06) | `logs/selftest-webkit-E-9.log` |
| E-10 | webkit | 7 | 7 | 0 | 0 | 17.4-17.5 (2026-10-16 19:40:52) | `logs/selftest-webkit-E-10.log` |
| E-11 | webkit | 4 | 4 | 0 | 0 | 17.5-25.9 (2026-10-16 19:42:41) | `logs/selftest-webkit-E-11.log` |
| CAP | webkit | 2 | 2 | 0 | 0 | 7.0-8.7 (2026-10-16 22:33:39) | `logs/selftest-webkit-CAP-r1.log`; superseded: selftest-webkit-CAP.log: 2 OK, 0 BROKEN |
| **all** | **webkit** | **102** | **101** | **0** | **1** | | |

Two re-runs:

- **E-5 Chromium.** The clean fixture's `sustain(PRM)` light read NOT DRIVEN once (load 26). Two manual re-runs and r1 passed. It is NOT-REPRODUCED. No code changed.
- **E-9 Chromium.** The slider failed the new `commit-light`. This was a harness fault: the slider's key step is not a CK-02 commit, and its reduce light leg is E-3's. `commit-light` is now read only on scenes gated E-2, and the slider REPORTs. r1 ran on the cured code.

**CAP.** The CAP re-runs (r1) follow a late `capture.mjs` edit. `committed` is now graded on scenes gated E-2, read through their state including `null`, so a closed accordion is graded. Both engines re-ran on the final file.

Section 2 below is pass 2's record, kept as its record.

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
