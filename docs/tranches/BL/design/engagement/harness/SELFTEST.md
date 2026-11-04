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

## Pass 13, completion (H13-complete)

The completion seat ran H13's held list in both engines and changed `e8-clock.mjs` (the mirror reads each `--engage-*` token as its consumer computes it; H13's `calc(90ms * 2)` fixture default had read as drift on the clean fixture, never run clean by H13). Its reading is `../pass-13/H13-complete.md` §3 (logs `../pass-13/H13c/logs/`). **Green in Chromium** on every stage run: E-3 12/12, E-8 5/5, E-13 8/8, and E-1..E-13 clean (E-10 207/0, E-11 176/0/1 UNMEASURED, with H13's E-10 45/45 and E-11 12/12 standing). **Not green in WebKit on one family:** the clean fixture fails `scroll · anchor page|scroller · insert above` (3 cells, 3 of 3 reads, at load 7.5-16.5): its glide is read before WebKit's anchoring adjustment, which in the fixture's scene lands a frame after the record's callback (HEAD in the same scene anchors on the act's frame). Cause unfound; one cure was tried and reverted (§3 there). Every other WebKit stage is green: the new E-10 cells' other 113, every E-10 plant (5 + 7 runs), E-11's new cells 172/0 and its six plants, E-3, E-8 5/5, E-1..E-9, E-12, E-13 clean, CAP. The harness hash after the completion is `0dbb165e0e86…`.

## Pass 13 (H13)

H13 changed E-10 (`--part hg13`, `hg13still`), E-11 (`--part forms,tokens,census,reachin`), `lib.mjs` (`openPage({ init })`, `MO_TALLY`) and `fixtures.mjs` (the cured glide over every record kind with `OWN`; the loud reads through the consumer, `readTok`; the plate's paragraph; the math defaults; eight plants). Its self-test reading is `../pass-13/H13.md` §3 (logs `../pass-13/H13/logs/st-E-*.log`, `fx-E-11-*.log`, `c1.log`). **It is Chromium only and partial: guarded printed the kernel-zone ARMED warning at 20:33 and the flag stayed up to the seat's close, so the seat finished the E-11 stage it had started and started no further battery.** Chromium: E-10 whole, 45 of 45 OK (clean 207/207; harness `d2f8f5f3629c`), after one cure (the fixture's clock probe read under the reduce arm's `transition-duration: 0s !important`, so `e10-lensreducetravel` read BROKEN; the superseded run is `st-E-10-chromium-r0-superseded.log`). E-11 whole, 12 of 12 OK over three runs (`st-E-11-chromium.log` cut by guarded at its 90-minute cap after 5 runs, then `-a14540` and `-77093b`), after one cure (the new token and reach-input cells compared a held box to one clean read at 1 px, so the H2 controls `e11-unread` and `e11-noise` read BROKEN; the bound is now max(1 px, 1.5 %), and a refused input that names nothing and paints as clean is UNMEASURED). **Not run (open): E-13 and E-3 on the paths H13 changed, every witness on the clean fixture, CAP, and every WebKit cell.**

## Pass 12 (H12)

H12 changed E-10 (the `hostglide` and `reach` cells, `--part hostglide,reach`), E-11 (the travel's value family on the side, re-render and carry paths), and `fixtures.mjs` (the travel's clock read as a `<time>` and its easing by the parser, loud by name; the reach written by the library's rule over the frame; the host glide through the offset chain on `slider` and `clipstale`; the clipstale carry on the travel's clock; six plants, one narrowed). Its self-test of record is `../pass-12/H12.md` §2 (logs `../pass-12/H12/logs/st-E-*.log`, `fx-E-1*-webkit.log`, `clean-*.log`, `cap-*.log`; harness `734e19688120` on every run; the only later changes are comments and docs). Chromium, whole: E-10 40 runs, 39 OK, `e10-rectclip-film` BROKEN once at load ~8.5-10.3 and OK on both re-reads (the unchanged H8 plant H10 and H11 saw flake); E-11 9 of 9; E-13 8 of 8; E-3 12 of 12; every witness and CAP on the clean fixture. WebKit, in one acquisition: the clean fixture whole for E-10 (112/0) and E-11 (43/0, the census's standing UNMEASURED), every E-10 plant on a path H12 touched (7 of 7), the three travel plants (3 of 3), `e3-gutter`, every other witness and CAP on the clean fixture.

## Pass 11 (H11)

H11 changed E-10 (the zoom cards, the step over 16.7 ms of real time on one span, whole during the change, `loupe repress · moved`), E-13 (the zoom clock cells), E-11 (the travel cells, `--part travel|old`), `lib.mjs` (the lens's travel helpers, moved from E-10, samples stamped with the document timeline), `fixtures.mjs` (the lens inherits its card's zoom; the travel reads its row's tokens, loud by name; three plants). Its self-test of record is `../pass-11/H11.md` §2 (logs `../pass-11/H11/logs/st-E-*.log`, `fx1*-webkit.log`, `clean-*.log`; harness `50bee4444a65` on every run). Chromium, whole: E-10 36 runs, 35 OK, `e10-rectclip-film` BROKEN once at load ~12 and OK on both re-reads at load 4.9-6.5 (an unchanged H8 plant; H10 saw it flake in WebKit); E-13 8 of 8; E-11 7 of 7; every other witness and CAP on the clean fixture. WebKit, in the one acquisition: the clean fixture whole for E-10 (80/0), E-11 and E-13, every E-10 plant on a path H11 touched (8 of 8), E-13 8 of 8, `e11-travelthrow` OK, every other witness and CAP on the clean fixture.

## Pass 10 (H10)

H10 changed E-7 (it refuses a build with no `--wt`), E-10 (`loupe side`, `loupe wobble`, `lensfilm`, the pointer stale cells' inset), E-13 (`loupe clock`, `loupe exit scroll`), `fixtures.mjs` (the cured lens, nine plants), `selftest.mjs` (the refusal's check). Its self-test of record, both engines, is `../pass-10/H10.md` §2 (logs `../pass-10/H10/logs/st-E-*.log`, JSON `../pass-10/H10/json/selftest/`): E-7 7 of 7 per engine; E-13 7 of 7 per engine; E-10 35 runs, 34 plants OK in Chromium; 35 runs, 2 N/A in WebKit (`e10-traillate`, `e10-lenslate`, Chromium's by declaration). Every other witness and CAP re-read on the clean fixture in both engines (`../pass-10/H10/logs/clean-*.log`). The clean E-10 read in Chromium failed once in that self-test, on `hand-off rev` (0.0091 against 0.0073, load 11.9), a load-only scatter the harness before H10 shows too (§2.1 there): 75/75 at load 9.6.

## Pass 9 (H9)

H9 changed E-10 and E-13, `fixtures.mjs` (the presented plate's `&slider=1`, the clip row's glide, the loupe's transform and viewport fallback, seven plants) and the scene app (the presented Dialog's `&slider=1` Slider). Its self-test of record, both engines, is `../pass-9/H9.md` §2 (logs `../pass-9/H9/logs/st-E-10-*.log`, `st-E-13-*.log`, JSON `../pass-9/H9/json/selftest/`): E-10 28 runs, 28 OK in Chromium; 28 runs, 27 OK and 1 N/A (`e10-traillate`, Chromium's by declaration) in WebKit; E-13 5 of 5 OK per engine. Every other witness and CAP re-read on the clean fixture in both engines (`../pass-9/H9/logs/clean-*.log`).

## Pass 8 (H8)

H8 changed E-4, E-10, E-11, E-12 and E-13 (new), and `fixtures.mjs` and the scene app under every witness. Its self-test of record for those five, both engines, with loads and the superseded runs, is `../pass-8/H8.md` §2 (logs `../pass-8/H8/logs/st-*.log`, JSON `../pass-8/H8/json/selftest/`). The witnesses H8 did not change were re-read on the clean fixture in both engines (`clean` stage, CAP included). Pass 7's and pass 3's tables below stand for them.

## Pass 7 (H7)

H7 changed E-4, E-5, E-9, E-10 and E-12 (and `fixtures.mjs`, `lib.mjs`, the scene app). Its self-test of record for those five witnesses, both engines, with loads and the superseded runs, is `../pass-7/H7.md` §2 (logs `../pass-7/H7/logs/st-*.log`). The unchanged witnesses were re-read on the clean fixture in both engines; CAP is unchanged. The tables below are pass 3's and stand for the witnesses H7 did not change.

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
