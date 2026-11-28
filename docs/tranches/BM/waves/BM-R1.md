# BM-R1: BM's parts minor's candidate

| field | value |
|---|---|
| release | BM's parts minor, after the dock-redesign minor; its number is the next minor free when it cuts (IN O-429) |
| status | planned |
| rests on | the release rule (a changed default look goes in a minor; nothing a site calls is removed); D§11 |
| DESIGN | §11; §15.3 |
| gates | G-1, G-2, G-3 and G-5 re-read on the candidate; G-4's reading on every site's built entry |
| depends on | BM-3, BM-5, BM-6, BM-7 and BM-13 landed; BM-4 with BM-3's step 2 if keyframes.js's sampler has shipped; BM-14, BM-15 and the spectrum's thin line if their designs have converged and been built, each otherwise riding the next minor, named by its work; BL's slider removals (W-B.18) in the same candidate, and its carousel dip if BL has landed it |

## What it does

1. **The candidate.** A release branch from master with BM-3, BM-5, BM-6, BM-7 and BM-13, with BM-4 and BM-3's step 2, BM-14, BM-15 and the spectrum's thin line where each has landed, and with any of BL's rows booked to the old 11.3.0 that BL has built by then (BM.md §2); the CHANGELOG names each change by what a site sees, the thumbless default for a slider with a fill, the knob prop, the reduced-motion rule and the rim's removed custom property among them; MIGRATION carries nothing (no public name leaves in a minor, and `:draggable` keeps its drag until 12.0.0).
2. **The census.** Each site's imports at its newest ref: no name it imports is removed, and every stylesheet path it imports by `dist/` path (Home Assistant's about forty) still resolves and carries what it did.
3. **G-4's reading, per entry.** Each site's own budget check at the candidate, read once, against the bound it sent:
   - Home Assistant: the entry within its 0.2 kB margin, CSS and JS together, and every script within 0.8 kB. Its sum turns on which overlays the entry mounts (−221 B with a Dialog or side Sheet, +458 B with menus only, before the springs' −1,487 B), which its message asks.
   - daraksha: the reader route's eager script within 126 KB (125.3 KB today), with the settle player loading on the first `pointerdown` on a part that plays it, read by its `scripts/check-budget.mjs`.
   - gaggle: the first load within its 11,282 B margin, read by gaggle's own gate 29 (`dashboard/scripts/check/vendor-build.mjs`) and the vendor gate (`dashboard/scripts/check/vendor.mjs`), which gaggle runs and returns.
   - atlas: nothing new runs at mount on /sci, read by atlas's suites; no box moves on hover, open or fold.
   - value.js, fourier, keyframes and slides stated no bound; their entries are read and recorded.
   The ledger's verdicts are indicative (D§11). A built entry over its bound cuts back the wave that tipped it before the release (OPEN §3).
4. **daraksha's occasion mode.** daraksha runs its `e2e/veil-webkit.spec.ts`, which only it can run, on the candidate with its grown scrubbers (BM.md §10). Until it passes there, no part of the minor is called safe in the occasion mode, and `FINAL.md` records the reading.
5. **The engine checks** each wave owes (D§15.3), re-read on the candidate in headless Chromium and Playwright WebKit, through `guarded` (WebKit under `guarded --exclusive webkit`).
6. **The sites are told the number** when it is fixed, in one line to each, with what the minor carries for that site.

## Proof

The G-4 table in `FINAL.md` (site, entry, bound, reading, ref); the candidate's CHANGELOG; the strips each wave captured, re-shot on the candidate where its sheet changed after the wave landed.

## Sites it serves

Every site.
