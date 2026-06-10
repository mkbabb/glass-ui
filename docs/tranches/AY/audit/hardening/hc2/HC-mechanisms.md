# HC-mechanisms — the mechanism-execution BINARY audit (did the stopping mechanisms land?)

**Lane** HC-mechanisms · **Date** 2026-06-09 · **Branch** `at-dock-convergence` (tranche/AY, Batch-2 complete)
**Question** (NECESSITY-MATRIX §4/§5): not "what defers" (known) but "are the stopping mechanisms BUILT at HEAD".
**Verdict: 1 of 7 BUILT.** The slides cardinal-gate port landed and runs GREEN; the other six are
exactly where the trends lane left them — specced, pre-written, unbuilt. The §5 "freed capacity"
re-point has NOT happened yet on this half of the corpus.

## §0 — The binary table

| # | Mechanism | Verdict | One-line evidence |
|---|---|---|---|
| 1 | W-CARRY register (manifest JSON + completeness clause) | **UNBUILT** (all 3 pieces) | register = 3 items; manifest file absent; gate script has no clause (grep `MANIFEST\|uncovered` = 0 over 175 lines) |
| 2 | slides cardinal-gate port (`slides/scripts/`) | **BUILT** (functional; 3 riders) | `slides/scripts/proof-live-verified-ledger.mjs` (268 lines), wired, ran GREEN this audit |
| 3 | `proof-no-bespoke-constellation.mjs` | **UNBUILT** | not in `slides/scripts/`; no `package.json` entry; born-RED witness still on disk |
| 4 | W-GOD1 ratchet (per-violator baselines, RED-on-growth) | **UNBUILT** | gate is the flat AV.W13 500-cap; no baseline file; absent from `ci.yml`; violators grew 4→6 |
| 5 | R1 IHDR assert in `proof-live-verified-ledger.mjs` | **UNBUILT** (both copies) | grep `IHDR` = 0 in glass-ui's 316-line gate AND the slides port |
| 6 | R3 `user-hinge` register disposition | **UNBUILT** | register dispositions are book/archived only; script reads only those two |
| 7 | R6 GREEN-on-real-surface clause | **UNBUILT** (and the instance is RED) | no script encodes the clause; `.cache/gates/AX-dock-animation-live.json` is fresh but `status:"fail"` |

---

## §1 — W-CARRY register: UNBUILT (manifest + clause + onboarding, all three)

Verified at HEAD, piece by piece against `AY.W-CARRY.md` §3:

- **Register still 3 rows.** `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` `items` = exactly
  `native-drawer-as-asChild` (book), `panel-host-primitive` + `interruptible-reorder` (archived).
  Zero of the ~24 §1-D1 BOOK rows onboarded; zero of G-4/G-5/G-6
  (`grep -iE "directional-view-transition|drawer-content-spring|cartoon-quiet-preset"` → 0).
- **Manifest absent.** `docs/tranches/AY/audit/deferred-ledger-manifest.json` does not exist
  (`ls` → no such file). The 29-id `bookIds` block is pre-authored verbatim in `AY.W-CARRY.md:224-260`.
- **No completeness clause.** `scripts/proof-disposition-live.mjs` is 175 lines; no `MANIFEST` const,
  no `uncovered` computation. The sibling skip at `:100-119` `process.exit(0)`s BEFORE any coverage
  check — the D4 hole (the clause never fires on the CI runner, the only runner that gates the close)
  is fully open.
- **PROGRESS state honest:** `AY/PROGRESS.md:96` W-CARRY = `planned`.

**Exact landing sites** (all pre-written in `AY.W-CARRY.md §3` — copy-in execution):
1. `docs/tranches/AY/audit/deferred-ledger-manifest.json` — NEW file, the 29 `bookIds`.
2. `scripts/proof-disposition-live.mjs:26` — `MANIFEST` const beside `REGISTER`; the clause inserted
   after `reg` loads (`:90`) and BEFORE the `anySiblingPresent` skip (`:100`); reconciliation fields
   (`ledgerBookCount`/`registerBookRows`/`uncovered`) into BOTH `writeGateArtifact` calls (`:104`, `:157`).
3. `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` — `items` 3 → ~29 per the §6 reconciliation table.
   Born-RED witness available immediately (`uncovered ≥ 19`). CI wiring already exists
   (`ci.yml:222-223`, `package.json:699`) — no new gate id needed.

## §2 — Slides cardinal-gate port: BUILT, functional — with three riders

`/Users/mkbabb/Programming/slides/scripts/proof-live-verified-ledger.mjs` (268 lines) EXISTS and is the
genuine engine port, not a stub: tranche-param (`--tranche=`, default `L`, `:36`), the curated
visual-allowlist (`:39-51`), the own-surface filename match (`ownSurfaceVerdict`, `:106-122`), the
{light,dark} pair floor (`:114-119`), three self-tests (`:181-211`), and an inlined byte-stable artifact
write to `slides/.cache/gates/L-live-verified-ledger.json` (`:241-257` — slides has no `gate-output.mjs`).
Wired at slides `package.json:18`. **Ran live this audit:** 11 wave rows parsed from
`docs/tranches/L/PROGRESS.md`, `self-test (bite proof): OK — 3 synthetic rows flagged`, 0 violations,
exit 0. H-cardinal hole #3 (slides-absent) is substantially CLOSED.

**Riders (not blockers, but name them):**
- **Not in slides CI.** `slides/.github/workflows/ci.yml` runs typecheck + build only — the gate is
  local-only. Landing site: a step after Build in `slides/.github/workflows/ci.yml` (the glass-ui
  `ci.yml:218-219` shape).
- **No IHDR twin** — R1 (§5 below) applies to the port too (`:79-88` is the same 4-byte-magic-only check).
- **Allowlist unexercised:** `slides/docs/tranches/L/audit/visual/VISUAL-ALLOWLIST.json` = `[]` —
  the complete-on-allowlist arm has processed zero real rows so far (fine pre-L-close; flag at L.W5).

## §3 — `proof-no-bespoke-constellation.mjs`: UNBUILT

- Not on disk: `ls slides/scripts/` → no `proof-no-bespoke-constellation.mjs`.
- Not wired: `grep no-bespoke slides/package.json` → 0.
- Born-RED witness intact: `slides/src/decks/til-briefing/constellation.ts` EXISTS at slides HEAD
  (assertion 1 of the spec REDs the moment the script lands — exactly as designed).

**Exact landing site** (the spec is copy-in-ready at `AY.W-CON3.md:392-429`):
`slides/scripts/proof-no-bespoke-constellation.mjs` + the slides `package.json` entry
`"proof:no-bespoke-constellation": "node scripts/proof-no-bespoke-constellation.mjs"`. Four
assertions (deletion-proof / no-`createConstellations`-survivor / lib-import-resolves /
freeze-seam-consumed) + the paired 3-slide both-mode capture. RED→GREEN is L.W-ADOPT's; **building
the script now is correct and costless** — a carry-closure gate that is itself deferred
(H-chronic-defer §4's own words) is the Class-C relapse in miniature.

## §4 — W-GOD1 ratchet: UNBUILT — and Class-D growth CONTINUED under the flat gate

`scripts/proof-no-god-module.mjs` at HEAD is the unmodified AV.W13 flat cap: `HARD_LIMIT = 500`
(`:20`), violations = `lines > HARD_LIMIT` (`:85`) — **no baseline file, no per-violator compare, no
growth detection**. Not in CI: `grep no-god-module .github/workflows/ci.yml` → 0 (wired local-only at
`package.json:638`). It is RED at HEAD, so it CANNOT be CI-promoted as-is — which is precisely why R4
prescribes the ratchet shape.

**The smoking gun for the ratchet's urgency:** the gate run this audit shows **6 violators, up from
the trends lane's 4-violator baseline** — `constellationField.ts` 959, `useMetaballRenderer.ts` 692,
`SegmentedTabs.vue` 689, `GlassDock.vue` 624, `Constellation.vue` 597, and a **NEW 6th**:
`src/components/custom/aurora/constants/shaders/mediums.glsl.ts` **528** (W-AUR-PAINTERLY content
growth under the carve-last pass — Class D operating in real time, this tranche, while the mechanism
sat unbuilt).

**Exact landing sites:**
1. A recorded baseline — e.g. `scripts/god-module-baseline.json` with the per-violator counts above
   (the carve lowers them as it lands).
2. `scripts/proof-no-god-module.mjs` — RED if any file EXCEEDS its baseline OR a new >500 file appears
   absent from the baseline (the violation predicate at `:85` forks on baseline membership).
3. `.github/workflows/ci.yml` — a step beside the other proofs (the `:218-223` block).
4. `docs/tranches/AY/waves/AY.W-GOD1.md` — re-grade the spec line-counts to the table above + the
   companion booking-updates-spec-counts rule (a wave booking into W-GOD1 updates the counts in the
   same change).

## §5 — R1 IHDR assert: UNBUILT in BOTH copies

- glass-ui: `grep -c IHDR scripts/proof-live-verified-ledger.mjs` → **0** (316 lines). `isRealPng`
  (`:104-113`) checks only the 4-byte PNG magic + >1024 bytes — a 1280×721 desktop shot named
  `-mobile-` still passes (the B2-con1 F2 fabrication remains mechanically uncatchable;
  `W-CON1-refit-mobile-light.png` is still 1280×721 on disk per HC-con.md:142).
- slides port: same — no IHDR parse (`:79-88`).

**Exact landing sites:** glass-ui `scripts/proof-live-verified-ledger.mjs` — parse IHDR width/height
(bytes 16–24) in/beside `isRealPng` (`:104-113`); assert in the own-surface path
(`ownSurfaceVerdict` `:132-148` / `deltaSatisfied` `:160-181`): a basename containing `-mobile-` has
width ≤ 500; a synthetic wrong-dimension row added to the `selfTests` array (`:238-256`). Mirror in
`slides/scripts/proof-live-verified-ledger.mjs` (`:79-122`; self-tests `:181-211`). ~Eight lines per copy.

## §6 — R3 `user-hinge` disposition: UNBUILT (the prose register is NOT the mechanism)

- `DISPOSITION-REGISTER.json` carries only `book`/`archived` dispositions (3 items, verified by parse).
- `scripts/proof-disposition-live.mjs:136-137` reads only `disposition === "book" || "archived"` —
  a `user-hinge` row would be silently ignored, not surfaced.
- The only `user-hinge` hits in the repo are the hand-challenge manifest itself
  (`scripts/wf-ay-handchallenge-2.js:3,8,49,66`). The HC-user-hinge lane authors
  `docs/tranches/AY/audit/USER-HINGE-REGISTER.md` — that is the **prose seed**; R3 is the **schema**
  extension that makes every close re-print the open questions mechanically. The prose doc alone does
  not satisfy R3.

**Exact landing sites:** `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` — disposition enum gains
`user-hinge`, the row carries `question:` instead of `trigger:`; `scripts/proof-disposition-live.mjs`
— the row loop (`:136-143`) treats `user-hinge` as coverage-satisfying / never trigger-evaluated, and
the artifact write (`:157-165`) prints each `question` verbatim. Seed data = the three §2 USER-HINGE
matrix items (dock magnification, blob `uBackdrop`, G-4/5/6 forks) + whatever HC-user-hinge collates.

## §7 — R6 GREEN-on-real-surface clause: UNBUILT — and the canonical instance is RED right now

Two halves, both checked:

- **The clause (generalized):** no script encodes "a born-RED gate's close requires the persisted PASS
  artifact on the real surface, named in the DELTA." `proof:ay-final` does not exist
  (`grep ay-final package.json` → 0; only `proof-au-final.mjs` from AU). The ledger gate verifies PNGs
  only — a DELTA can cite a gate artifact that says `fail` and still close.
- **The instance:** `.cache/gates/AX-dock-animation-live.json` is FRESH (Jun 9 16:02) and the gate DOES
  target the real route now (`proof-dock-animation-live.mjs:71-77` — `DOCK_ROUTE = "/dock/overview"`,
  the AY.W-DOCK2 re-point; the synthetic fixture is an explicit `file://` escape, `:571-575`). But the
  artifact reads **`status: "fail"`** with one violation: the last entering-child opacity onset (708 ms)
  trails the box-width onset (7.1 ms) by 700.9 ms > the 536.7 ms budget. So the B2-dock F2 gap is
  unchanged in substance: no persisted GREEN on the real dock exists at HEAD. (`AY/PROGRESS.md:71`
  honestly holds W-DOCK2 at `live-pending` — the ledger is not lying; the mechanism to make lying
  impossible is what's missing.)

**Exact landing sites:**
1. General clause — extend `scripts/proof-live-verified-ledger.mjs` `deltaSatisfied` (`:160-181`) to
   also resolve `.cache/gates/<id>.json` references in a DELTA and assert `status === "pass"` (with a
   synthetic fail-status self-test row at `:238-256`); and/or the W-CLOSE1 aggregate
   `scripts/proof-ay-final.mjs` (does not exist yet; W-CLOSE1 `planned`, `AY/PROGRESS.md:97`).
2. The instance — W-DOCK2's close (RG1/RG2, BLOCKING per matrix §2) requires a re-run PASS of
   `proof:dock-animation-live` against `/dock/overview` persisted at
   `.cache/gates/AX-dock-animation-live.json`, named in `W-DOCK2-DELTA.md`.

---

## §8 — Roll-up for the orchestrator

Score: **1/7 built.** The one BUILT mechanism (the slides cardinal port) proves the execution shape
works — a pre-specced gate, copy-adapted, wired, self-proving, GREEN same-day. The six UNBUILT ones
are all the same effort class (a JSON file + ≤40 lines of gate script + a CI line each; W-CARRY's
code is literally pre-written in its spec). Suggested landing order by leverage:

1. **W-CARRY (§1)** — born-RED witness immediate; unblocks W-CLOSE1's G-3; everything pre-authored.
2. **R4 ratchet (§4)** — the violator set GREW 4→6 this tranche under the unbuilt mechanism; every
   day un-landed is free growth.
3. **R1 IHDR (§5)** — eight lines × 2 copies; kills the live fabrication still on disk.
4. **R3 + R6 (§6, §7)** — both are small extensions of gates that already exist and are CI-wired.
5. **`proof-no-bespoke-constellation` (§3)** — slides-side, copy-in from W-CON3 §5; lands born-RED
   now, flips at L.W-ADOPT.
