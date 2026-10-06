# D5 · the engagement battery's self-test (H-1)

| field | value |
|---|---|
| seat | D5 round-0 battery seat |
| model | `claude-opus-5-5`, asserted from own system identity |
| harness | this directory (`HARNESS.md`); the witnesses E-1..E-9, `fixtures.mjs` (the clean page and `FAULTS`), `fixtures/e7/` (E-7's two source trees) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** |
| date | 2026-10-06, 11:50:01-12:06:00 local (the full run), 12:35-12:37 (E-4 after its fix) |
| load | 4.77/5.23/7.36 at the start, 15.8/10.2/8.9 at its peak (E-2 WebKit), 9.41/10.65/10.08 at the end (`logs/selftest.log:2,32,132`). The E-4 re-run: 27.9/22.6/15.7 at start (`logs/selftest-e4.log:3`). Other seats' browsers were running; every cell line in the logs carries its own load |
| verdict | **GREEN.** `selftest: 76 runs, 2 N/A; every witness passes its fixture, fails each planted violation on the planted cell, and passes each control, in every engine with an input for it`, exit 0 (`logs/selftest.log:129-130`). E-4 after its fix: `8 runs, 0 N/A`, exit 0 (`logs/selftest-e4.log:15`) |

## 1 · What was run

```sh
H=docs/tranches/BL/design/engagement/harness
node $H/selftest.mjs --out <scratch>/out/selftest            # every witness, both engines (76 runs)
node $H/selftest.mjs --only E-4 --out <scratch>/out/selftest-e4   # E-4 after the window fix (8 runs)
```

The fixture is served by the harness itself (no build, no worktree). A run is OK when the clean fixture exits 0, each fault aimed at the witness exits 1 **with the planted cell among its FAIL lines** (`selftest.mjs:42-48`), and each control exits 0. Logs: `logs/selftest.log`, `logs/selftest-e4.log`; per-run JSON in `logs/selftest-json/` (one file per witness, engine and fault).

## 2 · The table

PASS means the clean fixture passed every gating cell. A fault cell reads OK when the run failed on the planted cell. Each row's first planted FAIL line is in the log at the cited line.

| witness | engine | clean fixture (gating cells) | faults (must FAIL on the planted cell) | controls (must PASS) | log |
|---|---|---|---|---|---|
| E-1 census | Chromium | PASS 6/6 | `e1-undeclared` OK (denominator: 3 of 4 declared, `delta` undeclared) · `e1-norung` OK (class carries a rung: `static`, no rung and no reason) · `e1-dead` OK (runtime pressed: Δscale 0.000, press-only paint []) | `e1-stale` OK | `:3-10` |
| E-1 | WebKit | PASS 6/6 | the same three, OK | `e1-stale` OK | `:11-18` |
| E-2 commit bar | Chromium | PASS 36/36 | `e2-fade` OK (pop keyboard: peak 1.000, travel 0) · `e2-tabpop` OK (Tab-entry: scale range 0.095) · `e2-prog` OK (programmatic: peak 1.000) · `e2-glide` OK (travel keyboard: 78.00 px, overshoot 0.00) · `e2-mountpop` OK (mount: range 0.095) · `e2-nocoarse` OK (tap: peak 1.002) | `travel` and `rest` scenes in the clean run (the D4 `t6-body` / `t6-rest` controls) | `:19-31` |
| E-2 | WebKit | PASS 36/36 | the same six, OK (median frame 17.0 ms) | as above | `:32-44` |
| E-3 slider | Chromium | PASS 8/8 (desk ×2, phone ×2, light and dark) | `e3-still` OK (pointer-held ×1.000) · `e3-kbd` OK (keyboard-focused ×1.000) · `e3-gutter` OK (engaged box 5.3..384.7 px, bound 16..374) | — | `:45-51` |
| E-3 | WebKit | PASS 4/8, 4 UNMEASURED (phone arm: no held-touch input, H-4) | `e3-still` OK · `e3-kbd` OK · `e3-gutter` **N/A** (its cell has no input in Playwright WebKit) | — | `:52-57` |
| E-4 momentum | Chromium | PASS 1/1 | `e4-drop` OK (carry 0, settle 0) · **`e4-hold` OK** (both releases at rest at −24.00 px: difference 0) | `e4-snap` OK | `logs/selftest-e4.log:3-8` |
| E-4 | WebKit | PASS 1/1 | `e4-drop` OK · **`e4-hold` OK** | `e4-snap` OK | `logs/selftest-e4.log:9-14` |
| E-5 touch | Chromium | PASS 2/2 | `e5-hover` OK (pop press: Δscale 0.000, touch-changed = hover-changed = [background-color]) | — | `:66-68` |
| E-5 | WebKit | **N/A**: exit 3, 2/2 UNMEASURED (no held-touch input, H-4) | `e5-hover` **N/A** | — | `:69-70` |
| E-6 idle | Chromium | PASS 12/12 (incl. 0 layouts/s) | `e6-absent` OK (present: 0) · `e6-dim` OK (channel: opacity on the subject) · `e6-layout` OK (channel: width) · `e6-prm` OK (PRM: 1 spatial) · `e6-fast` OK (period 600 ms) | — | `:71-81` |
| E-6 | WebKit | PASS 10/10 (layouts/s REPORT n/a ×2) | the same five, OK | — | `:82-92` |
| E-7 one writer | Chromium | PASS 3/3 | `e7-veil` OK (modal: 1 `[data-engaged]` on the scrim) · `e7-two` OK (writers: 2, `ModalOverlay.vue` and the owner) | — | `:93-97` |
| E-7 | WebKit | PASS 3/3 | the same two, OK | — | `:98-102` |
| E-8 clock | Chromium | PASS 4/4 | `e8-drift` OK (mirror: 56ms ≠ 55ms) · `e8-literal` OK (minted: CSSTransition scale 230ms) | `e8-units` OK (`.18s` equals its 180 ms row) | `:103-108` |
| E-8 | WebKit | PASS 4/4 | the same two, OK | `e8-units` OK | `:109-114` |
| E-9 PRM | Chromium | PASS 24/24 | `e9-scale` OK (press-spatial: range 0.042) · `e9-dark` OK (press-light: []) · `e9-glide` OK (travel commit-spatial: 25 frames in flight) | — | `:115-121` |
| E-9 | WebKit | PASS 24/24 | the same three, OK | — | `:122-128` |

**Totals.** 76 runs: 18 clean (9 witnesses × 2 engines; 17 PASS, 1 N/A for E-5 WebKit) and 58 fault or control runs (29 per engine). The E-4 re-run adds `e4-hold` (8 runs). The summary's "2 N/A" counts the fault runs (`:57`, `:70`); the clean E-5 WebKit run (`:69`) is the third N/A line. All three are the H-4 gap: Playwright WebKit's touchscreen only taps, so E-5 and E-3's phone arm have no input there. They are printed N/A with that reason and never counted OK (`selftest.mjs:43-46`). No run was re-run for an engine close (the summary line prints none).

## 3 · The fix made at this seat, and its plant

E-4 read the settle at a fixed 700 ms after release. On HEAD's SegmentedTabs indicator that window ends inside a hold-then-jump (BASELINE.md §3 E-4). WebKit was credited `settle 160.40 px` because the still release had begun its snap and the fling had not (`../baseline/head/head.log:152` and `json/` before the re-run; `../baseline/head/tabsprobe.log`). The witness now samples 2000 ms and requires both releases at rest (the last 200 ms move < 0.5 px), and prints the largest one-frame jump (`e4-momentum.mjs` header).

The plant `e4-hold` reproduces the shape on the fixture slider. The release holds 750 ms after a fling and 600 ms after a still release, then springs to the same nearest detent. Counterfactual, run with a scratch copy of the witness at the old 700 ms window and with no rest gate: **PASS in both engines** (Chromium `still: settles -15.02 px … difference: settle 15.02 px`, WebKit 14.95 px, load 23.7/15.9/11.8). The old witness credited the plant. The fixed witness FAILs it in both engines (`both at rest at -24.00 px, difference 0.00`, `logs/selftest-e4.log:6,12`). Its controls still pass: `e4-snap` (velocity picks a further detent) and the clean fixture (a free spring carrying the release velocity).

## 4 · What the self-test does not prove

- Real Safari: no cell. UNMEASURED (owner's safaridriver checkbox).
- WebKit held touch (E-5, E-3 phone): N/A above; REGISTRY H-4 stays open.
- The fixture's scenes are the contract's shapes, not the library's components. Whether a library scene exercises a witness is shown by the HEAD run (`../BASELINE.md`), where every witness except the E-8 hold line reads RED.
