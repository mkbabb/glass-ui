# W-A.6 · W-SAFARI-BAND: step 0 the owner's checkbox and a machine check; then the owed Safari cells, re-derived at HEAD, in one serialized session · 11.0.0

| field | value |
|---|---|
| seat | band-A wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fabc95e2` in a scratch worktree. macOS 26.4.1 (`sw_vers`), Safari 26.4 (`safaridriver --version` → "Included with Safari 26.4 (21624.1.16.11.4)"). No Safari session was attempted at this seat; the operative pref was read with `plutil` |
| ships in | 11.0.0 |
| families | F-07 whole (`audit/REGISTRY.md:240-252`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L04-F02 | the Safari/Metal debt rode seven closes on a block basis the built dist falsifies |
| L04-F11 | four BLOCKED rows whose blocks are spent (here: #6) |
| L01a-06 | #6 blocked on a locked display; resolved nested `color-mix()` ungated |
| L10-22 | `@supports (contrast-color())` arms rewrite design tokens per engine; the Safari cell is owed |
| L08-18 | keyboard access to scroll regions rests on Chromium's implicit scroller focus; the Safari cell is owed |
| R2-01-01 | the Safari gate is an owner-held WebDriver pref, off since 2026-09-17, checked by nothing before dispatch |
| R2-01-02 | the owed-cell roster drifted from HEAD; the committed probe can bank none of the named cells |
| R2-01-09 | 9 scroll regions on 4 routes are focusable only through Chromium's heuristic (the Chromium half) |

## 2 · The defect at HEAD

- **The gate is one owner checkbox.** `plutil -extract AllowRemoteAutomation raw ~/Library/WebDriver/com.apple.Safari.plist` prints `false`; the file's mtime is `2026-09-17 18:51:49`. `safaridriver` reads this file (`ledger/CENSUS.md` §7 R-2). R2-01's session attempt at `85730eef` got `session not created … You must enable 'Allow remote automation'` (OB-1), and its iOS-simulator attempt timed out (OB-2) (`audit/round-2/R2-01.md`, OWNER-BLOCKED table).
- **The stated block basis is false.** The BK records hold every Safari cell behind "~249 build-emitted `@supports color-mix` guards" (`BK/execution/2026-08-10-lanealpha-unit5/PI-QUEUE.md:49-51`). `grep -rho "@supports[^{]*color-mix" dist | wc -l` on this seat's build gives **8**.
- **The battery is not tracked.** R2-01's 34-cell battery (`cells.mjs` 344 lines, `run-safari.mjs` 72, `run-chromium.mjs` 69) sits under `docs/tranches/BL/audit/captures/R2-01/battery/`, which `docs/tranches/BL/audit/captures/.gitignore:2` (`*`) ignores: `git ls-files docs/tranches/BL/audit/captures | wc -l` gives 2. A clean checkout does not have it.
- **The battery has drifted.** Its route literals checked against the manifest's routes: 21 cell definitions (some expand per route to 34 cells), 29 distinct routes, **2 not in the manifest**: `/forms/select` (the `field-font` set, `cells.mjs:205`) and `/foundations/paper-texture` (`paper-grain-blend`, `:268`, the #55 multiply subject R2-01-02 names as deleted).
- **The committed probe is inert.** `scripts/safari-probe.mjs` exists and nothing references it (`git grep -n safari-probe -- . ':!docs'` prints nothing).
- **A disclosure stands in for the Safari ruling.** `tests/styles/color-mix-endpoints.test.ts:13-20`: "KNOWN-LIVE, NOT GATED. RESOLVED nesting … ships repo-wide and is NOT gated here: 75 endpoint contexts across 23 files … It stands pending row-6's Safari π ruling".
- **The device arm has no device.** BI.W-DOCK-DEVICE's real-Metal device runs are OPEN with 0 landing commits (`BK/PORT.md:81`, via L04-F02).
- A simulator (iPhone 17 Pro, iOS 26.0) was booted on this machine at seat time by another session; this seat did not touch it.

## 3 · The cure

**Step 0, the gate before dispatch.** The owner row is OW-3: Safari ▸ Settings ▸ Developer ▸ Allow Remote Automation, and in the simulator, Settings ▸ Safari ▸ Advanced ▸ Remote Automation (`ledger/CENSUS.md` §4). The machine check is `node tests-visual/safari/preflight.mjs`: it reads the pref with `plutil` and exits 1 unless it is `true`; starts one `safaridriver` on a free port; creates a desktop session and deletes it; with `IOS=1`, creates and deletes a simulator session on the device the roster names. It prints each step and exits 1 on the first failure, quoting the WebDriver error. No band session starts unless preflight exits 0 in the same shell. If the owner act has not happened when W-L.8 runs, this wave's terminal state is recorded as "step 0 failed: OW-3 not done", with every cell UNMEASURED, and nothing is re-booked (PLAN §1).

**Step 1, the battery tracked.** `tests-visual/safari/` holds `cells.mjs`, `run-safari.mjs` (plain W3C WebDriver), `run-chromium.mjs`, `preflight.mjs` and `roster.json`. The cells take their routes through W-A.1's `_support/scene.ts` resolver, so a dead route fails at load. The same probe bytes run in both engines (R2-01's pairing contract); no cell calls `getContext()`.

**Step 2, the roster re-derived at HEAD.** `roster.json` lists every owed Safari cell with its source row, route, viewport, variants and engines (`safari-desktop`, `safari-ios-sim`, `chromium`). Its members are the census's OW-3 list (`ledger/CENSUS.md` §4): #6's paint pair; C-10's α cells (`/dock/layers`, `/dock/overflow` at 430×848); #10's device runs, re-pointed to Safari desktop and the simulator; #24 RT-24B; #28 RT-28C; #31 RT-31E; #33 cells 8-9; #38 P15; #39's pair; #41 π-41; #46's Safari and 390×844 coarse cells; #84's Safari column; #87's two Safari-mandatory cells; #88 π10; #90's Safari cells; R2-01's 34 cells; round 4's reversal and RTL cells; L08-18's 9 scroll regions; L10-22's muted-ink cell. Re-derivation rules: a cell whose subject is deleted leaves the roster with the deleting commit named (the #55 multiply cell); a cell whose route moved takes the new route; #87 P6 asserts the class of the value, not an engine-versioned literal (2^25 on Chromium 149, 2^24 on 150, R2-01-02); an iOS-only cell runs on the simulator arm.

**Step 3, one serialized session.** One browser-owning seat at a time (P-8): `node tests-visual/safari/run-safari.mjs` then `run-chromium.mjs` over the same roster. Each cell writes its Safari and Chromium halves (screenshot and probe JSON) under `.cache/visual/safari/<cell>/`, and `tests-visual/safari/receipt.json` (tracked, small) records per cell: both engines' readings, the verdict, the screenshots' sha256, the Safari and Chromium versions, and a sha256 over the source closure the cell reads.

**Step 4, what the readings decide.** Each cell's verdict routes to its family's wave as a born-RED or a hold line in the W-A.2 roster; no cell's result is written as prose in a test comment. Two decisions are this wave's:
- **Resolved color-mix nesting (G-16).** The target engine is Safari 26 (E-2: modern CSS on target engines). If `colormix-census` paints every one of the 75 resolved contexts in Safari 26.4 as Chromium does, nesting is ruled safe: `color-mix-endpoints.test.ts`'s `resolvedNested` fence and its "KNOWN-LIVE, NOT GATED" block are deleted, and G-16 retires with the cell cited. If any context drops, G-16 becomes a bound engine-lane invariant (no resolved nesting in emitted CSS), born RED at the measured count and owed to W-C.5 (one colour-resolution leaf).
- **The per-engine `contrast-color()` arm (L10-22).** If Safari resolves `--muted-foreground` to the same ink as Chromium, the arm stays and the cell is a hold line; if not, the arm is a per-engine design value (E-2), and its cure joins W-H.1's ink derivation, where R2-01-07 already places the mechanism.

**Step 5, retirements.** The device-Metal arm (BI.W-DOCK-DEVICE's real-device runs) is retired: the GPU paint cells run on W-A.4's Metal leg and the Safari cells here, and no owner-supplied device exists (L04-F02). `scripts/safari-probe.mjs` is deleted.

**Step 6, the release reads the receipt.** `release.yml` runs `node scripts/visual/verify-safari-receipt.mjs`: it fails if the receipt's source hashes do not match the tagged tree for any cell marked `bound`, or if any `bound` cell's verdict is red. Cells never measured are `owed`, listed by name in the release notes, and do not pass as measured.

## 4 · Files it touches

- New: `tests-visual/safari/{cells.mjs,run-safari.mjs,run-chromium.mjs,preflight.mjs,roster.json,receipt.json}` (the first three moved from the ignored captures directory and edited), `scripts/visual/verify-safari-receipt.mjs`.
- Deleted: `scripts/safari-probe.mjs`.
- Edited: `tests/styles/color-mix-endpoints.test.ts` (by step 4's outcome), `.github/workflows/release.yml`, `tests/gates/roster.json` (G-16, G-54).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| A6-G0 · step 0, the pref | `test "$(plutil -extract AllowRemoteAutomation raw ~/Library/WebDriver/com.apple.Safari.plist)" = true` | exit 0 | **exit 1**: `false`, mtime 2026-09-17 18:51:49 |
| A6-G1 · step 0, a session | `node tests-visual/safari/preflight.mjs && IOS=1 node tests-visual/safari/preflight.mjs` | exit 0 | the script is absent. R2-01 recorded OB-1 (`session not created … You must enable 'Allow remote automation'`) and OB-2 (simulator timeout) |
| A6-G2 · the battery is tracked | `test "$(git ls-files tests-visual/safari \| wc -l)" -ge 5` | exit 0 | **exit 1**: 0; the battery exists only under an ignored path |
| A6-G3 · every cell's route resolves | `node -e` over `tests-visual/safari/cells.mjs` through `_support/scene.ts` (the check of §2) | exit 0 | on the untracked battery: **2 dead routes** of 29 (`/forms/select`, `/foundations/paper-texture`) |
| A6-G4 · the receipt covers the roster | `node scripts/visual/verify-safari-receipt.mjs --coverage`: every roster cell has both halves or is `owed` with the reason "step 0 failed" | exit 0 | absent |
| A6-G5 · the inert probe is gone | `test ! -e scripts/safari-probe.mjs` | exit 0 | **exit 1** |
| A6-G6 · no deferral prose | `! grep -rqiE "KNOWN-LIVE, NOT GATED\|pending row-6's Safari" tests src` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 2 lines in 1 file, first `color-mix-endpoints.test.ts:13`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`color-mix-endpoints.test.ts:13-20`) |
| A6-G7 · the release reads the receipt | `grep -q verify-safari-receipt .github/workflows/release.yml`, and the verifier exits 1 on a receipt with one `bound` cell's hash edited | both | **exit 1** |

A6-G6 could pass by deleting the comment without the decision; step 4 requires the `colormix-census` cell in the receipt, and A6-G4 fails without it. A6-G4 could pass with every cell `owed`; it does, honestly, when step 0 has not passed, and W-L.8 records that terminal state rather than a pass.

## 6 · π and DELTA obligations

Every cell is a paired capture by construction: the same probe in Chromium and in real Safari, both halves under `.cache/visual/safari/<cell>/`, their sha256 in the receipt.

| surface | themes | engines | π |
|---|---|---|---|
| the 34 R2-01 cells, re-derived (sheet position and corners, dialog corners, pager neck per frame, route-cycle leak census, nested color-mix census, `contrast-color`, field type size and focus zoom, glass blur census, α narrow dock cells, #87 P6/P17, RT-28C, RT-31E, #41 drag, RT-84P, scroller focus) | light and dark per the cell's variants | Chromium (Playwright), real Safari 26.4 desktop, iOS simulator for the coarse and iOS-only cells | the cell's own probe readings in both engines, and the screenshot pair |
| the census's owed cells beyond R2-01 (#6, #24 RT-24B, #33 cells 8-9, #38 P15, #39 pair, #46, #84's column, #88 π10, #90, round 4's reversal and RTL cells) | as the source row states | the same | as the source row states |

Playwright WebKit is not Safari: no cell's Safari half is taken from Playwright WebKit (D-4).

## 7 · MIGRATION rows

None from this wave. A cell that turns up a Safari defect routes it to its family's wave, which writes any MIGRATION row its cure needs.

## 8 · Ledger rows

- Closed when step 0 passes and the receipt covers the roster: #6, #28 (RT-28C), #41 (π-41), #46 (its Safari and coarse cells), #87, #88 (π10), C-10, D-4, and the Safari items of #10, #24, #31, #33, #38, #39, #84 and #90 (`census-register-a.md:27,30,40,43,49,53`; `census-register-b.md:72,73`; `census-carries-recap.md:35,67`).
- OW-3 is the owner act this wave waits on. If it has not happened by W-L.8, the wave's terminal state names it and the rows above stay open under this wave, not re-booked.
- G-16 and G-54 in the W-A.2 roster close here, or turn `owed` to their named waves by step 4's measured outcome.
