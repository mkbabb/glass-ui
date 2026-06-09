# AY.W-NDA — native-drawer-as-asChild WATCH row (the founding chronic, carried with its trigger)

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** E (the AX close)
**Depends on:** none (pure documentation + gate-run work — no source risk; lands in the carry-closure band alongside AY.W-CARRY).
**Unblocks:** AY.W-CLOSE1 (the terminal close) — the FINAL's "zero chronic-defer carry" (GOLDEN G-3) is gate-true only when the founding chronic (the native-drawer trigger that was MET at AT and rode BOOK'd five tranches) re-evaluates UN-MET against the present constellation and stays booked, with the gate as the artefact.

---

## Goal criterion

The founding chronic of this entire surface — `native-drawer-as-asChild`, the row whose own gate-docstring names it as the disease's origin (`proof-disposition-live.mjs:8` "the native-drawer LATE-1: trigger met at AT, ignored") — is carried HONESTLY: it stays a **WATCH row** (a `book` disposition with a live, re-evaluable `min-consumers` trigger), NOT a silent unconditional defer. The trigger's `n:2` threshold re-evaluates UN-MET against the present consumer constellation (muster is absent from the constellation set; speedtest is present and does not import dialog-native; no present consumer references `dialog-native`/`GlassDialogNative`), so the row stays legitimately booked — its disposition is condition-checked every close, not asserted by prose. The two ARCHIVED rows that share the surface (`panel-host-primitive`, `interruptible-reorder`) stay archived with their own UN-MET triggers, untouched.

Success looks like: the row's trigger is the live condition, the gate re-runs it every close, and the moment a second consumer imports `dialog-native` the gate REDs and forces a re-evaluation — the inverse of the five-tranche silent ride that founded the chronic.

## Completion criterion

The single hard gate below verifies: `npm run proof:disposition-live` on a sibling-present checkout prints `register items: 3`, `self-test (bite proof): OK`, and `live violations: 0`, exiting ZERO — with the `native-drawer-as-asChild` row classified UN-MET (it is NOT in the `live violations` list). The gate artefact `GATE_DISPOSITION_LIVE_OUT` carries `violations: []` and `selfTestFlagged: true`. The trigger's UN-MET claim is corroborated by the empirical readout in §4 Leg 2: a constellation walk showing zero present consumers match `dialog-native|GlassDialogNative` (the SAME grep the gate's `min-consumers` evaluator runs), so the gate's green is the live truth, not a stale `resolved:false` flag. The two ARCHIVED rows are unchanged and also UN-MET (the gate's `0 violations` covers all three).

---

## §1 — The verified defect / disposition (file:line)

### D1 (THE FOUNDING CHRONIC) — native-drawer-as-asChild: trigger MET at AT, rode BOOK'd five tranches before the gate existed

The disease this entire carry-closure surface was built to kill is named, verbatim, in the gate's own docstring and the register's own `doc` string:

> `scripts/proof-disposition-live.mjs:8`
> ```
> // booked — so a deferral with a met condition cannot ride forward un-checked
> // (the native-drawer LATE-1: trigger met at AT, ignored; the AN ARCHIVED items
> // LATE-3: never re-checked).
> ```
> `docs/tranches/AX/audit/DISPOSITION-REGISTER.json:3`
> ```
> The chronic it kills: the native-drawer ≥2-consumer trigger was MET at AT and rode
> BOOK'd five tranches; the AN ARCHIVED-on-2-consumer-gate items were write-once-watch-never.
> ```

The native `<dialog>` drawer-mode polymorphic `as`/`asChild` host (`GlassDialogNative`) was deferred on a "muster + speedtest are the firm ≥2 consumers" justification that no machine ever re-checked. The ≥2-consumer condition was treated as MET in prose at AT, the feature was BOOK'd, and the BOOK rode forward un-re-evaluated for five tranches — the canonical chronic-defer relapse (a named trigger that is prose no machine reads). AX.W62 minted the register + `proof:disposition-live` SPECIFICALLY to catch this class. This wave formalizes that the founding row is now a WATCH row on the live gate, and proves its trigger re-evaluates UN-MET at HEAD.

### D2 (THE ROW AS IT STANDS) — present, booked, trigger UN-MET, gate green

`docs/tranches/AX/audit/DISPOSITION-REGISTER.json:11-22`:

> ```json
> {
>     "id": "native-drawer-as-asChild",
>     "disposition": "book",
>     "summary": "GlassDialogNative / native <dialog> drawer-mode polymorphic `as`/`asChild` host.",
>     "trigger": {
>         "kind": "min-consumers",
>         "n": 2,
>         "grep": "dialog-native|GlassDialogNative",
>         "note": "muster + speedtest were cited as the firm ≥2, but neither is in the present constellation set (muster absent; speedtest does not import dialog-native). Re-evaluates un-MET among present consumers — legitimately booked."
>     },
>     "resolved": false
> }
> ```

The row's SUBJECT is real and shipping (greenfield-no-meta — a WATCH row must reference a live artefact, not a ghost): `src/components/custom/dialog-native/GlassDialogNative.vue` + its `index.ts` package barrel exist at HEAD. The deferral is the polymorphic `as`/`asChild` host EXTENSION on it, gated on a second consumer.

The trigger re-evaluates UN-MET at HEAD, verified empirically (the SAME grep `dialog-native|GlassDialogNative` the gate's `consumersMatching` runs, `proof-disposition-live.mjs:60-77`):

| consumer (constellation set) | present on disk | matches `dialog-native\|GlassDialogNative` |
|---|---|---|
| keyframes.js | dev-only | 0 |
| value.js | dev-only | 0 |
| fourier-analysis/web | dev-only | 0 |
| words/frontend | dev-only | 0 |
| bbnf-lang/playground | dev-only | 0 |
| bbnf-buddy | dev-only | 0 |
| **speedtest** | **present** | **0** (the cited "firm consumer" does NOT import dialog-native) |
| muster | **NOT in the constellation set** (`constellation.mjs:50-104` does not list it) | n/a — not scanned; and even if added, `muster/frontend` has 0 `dialog-native` matches |

Present-consumer match count = **0** → trigger MET requires `≥ n (2)` → **UN-MET**. The gate run confirms it (`npm run proof:disposition-live`):

```
proof:disposition-live — the deferral-trigger re-evaluation gate (AX.W62)
  register items        : 3
  self-test (bite proof): OK — synthetic met-trigger row flagged
  live violations       : 0

[proof:disposition-live] every booked deferral's trigger re-evaluates un-MET against the present constellation.
```

The row is GREEN by gate AND TRUE by coverage — the trigger is the live condition, not stale prose. The remaining hazard this wave forecloses: nothing in the WAVE record formally ties the founding-chronic story to the live row's green, so a future planner could re-read the founding prose and re-scope a wave to BUILD the as/asChild host (re-land risk), or mark the row `resolved:true` to "tidy" the register (which would silently stop the watch — the chronic's exact relapse vector). This wave LOCKS the row as a watched, un-resolved BOOK row with a gate-true UN-MET trigger, recorded.

### D3 (THE TWO ARCHIVED SIBLINGS) — stay archived, untouched

`DISPOSITION-REGISTER.json:23-46` carries the two `archived` rows from the AN ARCHIVED-on-2-consumer-gate (the "write-once-watch-never" class the founding docstring also names):

- `panel-host-primitive` (`:24`, archived, grep `GlassPanelHost|panel-host`, UN-MET) — no present consumer references a panel-host primitive; the dock + sheet cover the shipped need.
- `interruptible-reorder` (`:36`, archived, grep `interruptibleReorder|reorderInterrupt`, UN-MET) — `useSortable` ships the committed-drop model; no present consumer asks for the interruptible variant.

Both re-evaluate UN-MET (covered by the gate's `0 violations`). This wave does **not** edit either — the seed's instruction is explicit: "the 2 ARCHIVED rows stay archived." They are recorded here only so the §4 hard gate's `0 violations` is understood to cover all three rows, not just the native-drawer row.

---

## §2 — Objective

Carry `native-drawer-as-asChild` as a WATCH row with its live trigger, and PROVE the trigger re-evaluates UN-MET so the founding chronic stays HONESTLY booked (condition-checked, not prose-asserted). Keep the two ARCHIVED rows archived.

This is a SINGLE-UNIT wave (no sub-units). The work is:

1. **Confirm the WATCH row is present, booked, and un-resolved** in `DISPOSITION-REGISTER.json` — the row already exists at `:11-22`; this wave verifies it is `disposition:"book"`, `resolved:false`, and carries the `min-consumers` `n:2` / `grep:"dialog-native|GlassDialogNative"` trigger. If a sibling wave (W-CARRY) widens the row's `note` to cite the AT ledger #8 mapping, that note-widening is COMPATIBLE — this wave's gate keys only off the disposition + trigger, not the note text. No structural edit to the row is required by THIS wave; the row is already in the correct shape.
2. **Run the gate and capture the UN-MET green** — `npm run proof:disposition-live` on a sibling-present checkout, capturing the `register items: 3` / `self-test OK` / `live violations: 0` output as the wave artefact.
3. **Leave the two ARCHIVED rows untouched** — `panel-host-primitive` + `interruptible-reorder` stay archived; the gate's `0 violations` confirms both also re-evaluate UN-MET.

**Goal:** the founding chronic is a watched, gate-true, UN-MET BOOK row — the inverse of its five-tranche silent ride. The trigger fires the gate RED the instant a second consumer imports `dialog-native`, forcing a real re-evaluation (build it, or re-justify the book) — never another silent carry.

This wave is the NARROW founding-row formalization. The BROAD onboarding of the other ~22 BOOK rows + the register-completeness clause + the G-4/5/6 encoding is **AY.W-CARRY**'s scope (the §6 reconciliation table there maps ledger #8 → this row, note widened). The two waves are compatible and non-overlapping at the row level: W-CARRY keeps this exact row (it does not re-author or delete it); W-NDA proves THIS row's trigger UN-MET green. If both run, W-NDA's gate leg is a subset of W-CARRY's Leg 2 (self-test still bites) ∧ the trigger-re-eval half — they agree.

---

## §3 — The exact edit-sites

This wave is verification-dominant — the row already exists in the correct shape. The edit surface is minimal and bounded.

### S1 — `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (verify-or-no-op)

The `native-drawer-as-asChild` row (`:11-22`) MUST be:
- `"disposition": "book"` (a WATCH row, not `resolved`, not `archived`),
- `"resolved": false` (the watch stays live — setting `resolved:true` would silently stop the re-evaluation, the founding relapse vector; this wave FORBIDS resolving the row while the trigger is UN-MET),
- carrying the `min-consumers` `n:2` trigger with grep `dialog-native|GlassDialogNative`.

At HEAD the row already satisfies all three (verified §1-D2). **No edit is required by this wave** unless a future state drifts the row. If the row is found `resolved:true` while the trigger is UN-MET, this wave's edit is to restore `resolved:false` (the row must stay watched until the trigger MEETS and the feature is built, or the book is formally re-justified). The two ARCHIVED rows (`:23-46`) are NOT edited.

### S2 — `docs/tranches/AY/PROGRESS.md` (the artefact capture)

The gate-run output (the `register items: 3` / `self-test OK` / `live violations: 0` block) is captured in the PROGRESS entry as the wave's evidence — the build-output artefact, not a prose claim.

**No source edit. No gate-script edit. No `package.json` / `gates.mjs` / `ci.yml` edit** — the gate is already wired (`gates.mjs:741`, `ci.yml:226`) and the trigger-re-evaluation half is exactly the mechanism this wave exercises (no extension needed; the completeness-clause extension is W-CARRY's). No consumer edit (inv-16; root-not-consumer — the trigger watches consumers, it does not write them).

---

## §4 — The HARD GATE (evidence-backed)

A single binding condition with two artefact-verifiable legs. BOTH must hold.

### Leg 1 — the gate re-evaluates the WATCH row UN-MET and stays green (the trigger artefact)

`npm run proof:disposition-live` on a sibling-present checkout exits ZERO with:

```
register items        : 3
self-test (bite proof): OK — synthetic met-trigger row flagged
live violations       : 0
```

The `native-drawer-as-asChild` row is NOT in the `live violations` list (nor are the two ARCHIVED rows) — its `min-consumers` `n:2` trigger re-evaluates UN-MET against the present constellation, so it stays legitimately booked. **Evidence:** the captured gate stdout in `AY/PROGRESS.md` + the gate artefact `GATE_DISPOSITION_LIVE_OUT` (`scripts/proof-disposition-live.mjs:156-165`) carrying `status:"pass"`, `itemCount:3`, `selfTestFlagged:true`, `violations:[]`. This is the founding chronic carried as a watched-and-checked book row — the gate is the artefact, not the prose.

The bite is real and proven on the SAME run: the synthetic always-MET self-test row (`DISPOSITION-REGISTER.json:4-9`) is classified a violation by the detector, so the gate is demonstrated load-bearing (`self-test (bite proof): OK`). If the detector ever fails to flag the self-test, the gate REDs (`proof-disposition-live.mjs:127-132`) — the acceptance-is-the-RED-witness-inverse contract. So a `0 violations` for the real rows is a TRUE un-MET, not a dead detector.

### Leg 2 — the UN-MET is the LIVE truth, not a stale flag (the constellation-walk corroboration)

The gate's green is corroborated by an independent constellation walk running the SAME grep the gate's evaluator runs (`dialog-native|GlassDialogNative`, `proof-disposition-live.mjs:60-77`), confirming zero present consumers match — so the row's UN-MET is empirically true at HEAD, not an artefact of a stale `resolved` flag or an absent-sibling skip:

```
for d in fourier-analysis/src fourier-analysis/web/src words/frontend/src \
         bbnf-lang/playground/src bbnf-buddy/src speedtest/src; do
  echo "$d : $(grep -rIlE 'dialog-native|GlassDialogNative' "$d" 2>/dev/null | wc -l) match-files"
done
# every line → 0 match-files  (speedtest, the cited "firm consumer", included → 0)
```

Plus: `muster` is NOT in the constellation `CONSUMERS` set (`constellation.mjs:50-104`), so it is never scanned — and a direct check confirms it would not match anyway (`grep -rIlE 'dialog-native|GlassDialogNative' muster/frontend → 0`). Present-consumer match count = 0 < 2 → the trigger is robustly UN-MET; adding muster to the constellation would not flip it. **Evidence:** the constellation-walk output captured in `AY/PROGRESS.md`, paired with the gate's `live violations: 0` — the two agree, so the WATCH row's booked status is the live condition's verdict.

**The gate is the conjunction:** Leg 1 (gate green, the native-drawer row UN-MET, NOT in violations, self-test bites) ∧ Leg 2 (the UN-MET is the live grep truth across present consumers, not a stale flag). Either leg RED blocks the close — Leg 1 RED means a second consumer now imports `dialog-native` (the trigger MET; re-evaluate the disposition, build it or re-justify); Leg 2 RED means the gate's green was masking a stale flag (the row was `resolved` or skipped while a consumer actually references it).

**The single headline gate condition (for the FINAL table):** `proof:disposition-live` green — `native-drawer-as-asChild` re-evaluates UN-MET (0 present consumers match `dialog-native|GlassDialogNative`; the cited speedtest does not import it, muster is not in the constellation), so the founding chronic stays a watched BOOK row; the two ARCHIVED rows stay archived and also UN-MET (`live violations: 0`, `register items: 3`); the self-test still bites (`bite proof: OK`).

---

## §5 — Non-goals (explicit, to bound the wave)

- **NO building the as/asChild host.** The native `<dialog>` drawer polymorphic `as`/`asChild` extension graduates when its `min-consumers` trigger re-evaluates MET (a second consumer imports `dialog-native`) — the gate's job, not this wave's. W-NDA carries the row honestly; it does not ship the feature. Zero source-feature risk.
- **NO resolving the row.** Setting `resolved:true` while the trigger is UN-MET is FORBIDDEN — it silently stops the watch (the founding relapse vector). The row stays `book` + `resolved:false` until the trigger MEETS.
- **NO editing the two ARCHIVED rows.** `panel-host-primitive` + `interruptible-reorder` stay archived (the seed's explicit instruction). This wave touches neither.
- **NO register-completeness clause, NO onboarding the other ~22 BOOK rows, NO G-4/5/6 encoding.** Those are **AY.W-CARRY**'s scope. W-NDA is the narrow founding-row formalization; it does not extend the gate script or grow the register beyond the existing 3 rows.
- **NO constellation edit (do NOT add muster).** muster's absence from the `CONSUMERS` set is current state, not a defect this wave fixes — and adding it would not flip the trigger (muster does not import dialog-native). The registry-default world (inv-θ) is preserved; the gate skips absent siblings by design (`constellation.mjs:119-122`).
- **NO slides edit.** glass-ui writes only glass-ui (inv-16).

---

## §6 — Dependency + sequencing notes

- **W-NDA ⊥ W-CARRY (row-compatible, no hard ordering).** W-CARRY's §6 reconciliation table maps AT ledger #8 → this exact row (note widened to cite #8) and KEEPS it — it does not delete or re-author the row. W-NDA proves THIS row's trigger UN-MET green. If both run, their gate legs agree (W-NDA's Leg 1 is the trigger-re-eval half W-CARRY also exercises). They can run in either order; W-NDA's claim is a strict subset of the surface W-CARRY's completeness clause later gates.
- **W-NDA → W-CLOSE1 (the close consumes the green).** The FINAL's "zero chronic-defer carry" (GOLDEN G-3) cites the founding chronic by name; W-NDA's captured gate-green + constellation-walk is the artefact that makes that citation gate-true. W-NDA lands before W-CLOSE1.
- **No write-scope overlap with any impl wave.** W-NDA touches at most `DISPOSITION-REGISTER.json` (verify/no-op) + the PROGRESS artefact capture. No source, no gate script, no other gate, no consumer.
