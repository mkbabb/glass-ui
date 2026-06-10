# AY.W-CARRY — Carry-closure register completeness (the register covers 3 of ~25 booked items; G-4/5/6 encoded)

**State:** LANDED · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** E (the AX close)
**Depends on:** none (pure documentation + gate-script work — no source risk; can land early, in parallel with the impl bands).

> **Landed (verified 2026-06-10, W-CARRY-LIVE1-FINISH):** the register is the ledger's machine mirror —
> `DISPOSITION-REGISTER.json` carries 31 rows (the 3 founding + the full AT W0-L4 BOOK backlog + G-4/5/6 +
> the 2 W-TRIAGE residual-defers); `deferred-ledger-manifest.json` carries the 31 bookIds; the
> register-COMPLETENESS clause is landed in `proof-disposition-live.mjs` (runs UNCONDITIONALLY before the
> sibling skip). G-4/G-5/G-6 are encoded as `directional-view-transition` / `drawer-content-spring` /
> `cartoon-quiet-preset` book-with-trigger rows. Gate GREEN: `uncovered (ledger→reg): 0`, `register
> book/arch/ret: 31`, `live violations: 0`, self-test bites. Born-RED witness confirmed (drop any covered id
> → `uncovered: 1`; the synthetic always-MET self-test row still flags).
**Unblocks:** AY.W-CLOSE1 (the terminal close) — W-CARRY MUST land BEFORE W-CLOSE1 so the FINAL's "zero chronic-defer carry" (GOLDEN G-3) is **gate-true, not prose-true**. Folds the slides-side gate obligation into **L.W7** (the slides arm authors its own `proof:disposition-live` equivalent; this wave authors that spec copy-in-ready).

---

## Goal criterion

The carry-closure gate's COVERAGE equals the deferral SET. Today `proof:disposition-live`
(`scripts/proof-disposition-live.mjs`) is a genuine, self-proving, load-bearing gate — but it re-evaluates
the triggers of exactly **3** rows while the authoritative AT W0-L4 ledger
(`docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md`) enumerates **~22 still-live BOOK rows**
the register never received. A gate that can only catch a relapse on 3 of ~25 booked items is NOT
"zero chronic-defer carry"; it is zero-carry on 12% of the booked surface (G-3 is GREEN by gate but
FALSE by coverage). After this wave: every BOOK row in the latest deferred-ledger has a machine-readable
register row with a re-evaluable trigger; the three AX-promised-but-never-written rows (G-4 directional
View-Transition helper, G-5 DrawerContent spring, G-6 cartoon×quiet preset — AX PROGRESS:282) are encoded
as register rows OR retired with a named successor; and a NEW register-COMPLETENESS clause fails the close
if the deferred-ledger names a BOOK row absent from the register — the closure mechanism's own closure check.

## Completion criterion

The single hard gate below verifies: `proof:disposition-live` extended with a register-COMPLETENESS
clause that runs UNCONDITIONALLY (not behind the sibling-present skip) and asserts
`register-BOOK/ARCHIVED-row-count ≥ ledger-BOOK-count` against the machine-parseable ledger manifest —
born-RED today (3 register rows vs ~22 ledger BOOK rows → RED until reconciled), GREEN once the register
is the ledger's machine mirror; G-4/G-5/G-6 each present as a register row with a `min-consumers` trigger
OR carrying a `retired` disposition with a `successor` field naming the exact destination (not "future
tranche"); the gate's self-test (the synthetic always-MET row) still proves the detector is load-bearing;
and the gate's artefact (`GATE_DISPOSITION_LIVE_OUT`) prints the row-count reconciliation
(`registerBookRows` vs `ledgerBookRows`) so the close has the artefact, not a prose claim.

---

## §1 — The verified defect (file:line)

### D1 (COVERAGE HOLE) — the register is a 3-row SAMPLE of a ~22-row BOOK deferral set; ~19 booked items are gate-invisible

`docs/tranches/AX/audit/DISPOSITION-REGISTER.json:10-47` carries exactly THREE `items` rows:

> ```
> DISPOSITION-REGISTER.json:11  "native-drawer-as-asChild"   (book)
> DISPOSITION-REGISTER.json:23  "panel-host-primitive"       (archived)
> DISPOSITION-REGISTER.json:35  "interruptible-reorder"      (archived)
> ```

The authoritative deferral inventory is `docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md:103-151`
— a HEAD-verified 47-row table with the disposition vocabulary BOOK / KILL / USER-DOMAIN / AT-WAVE.
Of those, the rows still dispositioned **BOOK** at HEAD (AT-WAVE rows landed at AT; KILL/USER-DOMAIN rows
exit the register by rule — see §2) are:

| ledger # | Item | register id (to mint) | trigger grep |
|---|---|---|---|
| 6 | `/deck` subpath + `--deck-pager-active` token | `deck-subpath` | `@mkbabb/glass-ui/deck\|--deck-pager-active` |
| 12 | Button `size="icon-sm"` | `button-icon-sm` | `size=["']icon-sm["']\|icon-sm` |
| 13 | `DockSelectTrigger clampLabel` | `dock-select-clamp-label` | `clampLabel` |
| 14 | `TooltipContent variant="mono"` | `tooltip-mono-variant` | `variant=["']mono["']` |
| 15 | `Select size` prop | `select-size` | `<SelectTrigger[^>]*\bsize=` |
| 16 | `--spring-crisp` token (ζ≈0.80) | `spring-crisp-token` | `--spring-crisp\|spring-crisp` |
| 19 | MetricBadge icon slot | `metric-badge-icon` | `MetricBadge[\s\S]*icon\|#icon` (within metric-badge use) |
| 20 | CompletionSeal / GoldHeadline / CheckDraw | `completion-seal-family` | `CompletionSeal\|GoldHeadline\|CheckDraw` |
| 22 | LabeledField for/id binding | `labeled-field-for-id` | `LabeledField[\s\S]*\bfor=` |
| 23 | the "3 a11y asks" bundle | `speedtest-a11y-bundle` | (decompose; see §3 — a bundle is not a row) |
| 25 | `useRAFLoop` demandPark | `raf-loop-demand-park` | `demandPark` |
| 26 | `/styles` critical/deferred split | `styles-critical-split` | `critical.*deferred\|deferred.*critical` (CSS split) |
| 27 | G3 cross-document VT (`navigation:auto`) | `cross-document-vt` | `@view-transition\|navigation:\s*auto` |
| 28 | G5 `@scope` + `:state()` (retire `:deep()`) | `css-scope-state` | `@scope\|:state\(` |
| 29 | G6 CSS `@function` | `css-at-function` | `@function` |
| 30 | G8 `interestfor` action-previews | `interestfor-previews` | `interestfor\|interest-target` |
| 31 | `text-box-trim` | `css-text-box-trim` | `text-box-trim\|text-box:` |
| 32 | `interpolate-size` / `calc-size(auto)` | `css-interpolate-size` | `interpolate-size\|calc-size` |
| 33 | relative-color `oklch(from …)` | `css-relative-color` | `oklch\(\s*from\b` |
| 34 | GlassDialogNative pilot | `glass-dialog-native-pilot` | `GlassDialogNative\|dialog-native` |
| 36 | G7 `GlassNativeSelect` | `glass-native-select-pilot` | `GlassNativeSelect` |
| 37 | inline-edit primitive (3-divergent) | `inline-edit-primitive` | `InlineEdit\|inline-edit\|contenteditable` |
| 38 | dock panel-host variant | `dock-panel-host-variant` | `panel-host\|LeftToolsDock` |
| 39 | LabeledSlider numeric-readout | `labeled-slider-readout` | `LabeledSlider[\s\S]*readout\|numeric-readout` |

That is **24 BOOK rows** the register does not hold (some collapse on dedup against the existing 3 — e.g.
ledger #38 dock panel-host overlaps the existing `panel-host-primitive`; §3 reconciles). The register
holds 3; the ledger names ~22-24 live BOOK rows. **The gate cannot re-evaluate a trigger it was never
handed** (`proof-disposition-live.mjs:136-143` iterates `reg.items` only). This is exactly the
"deferral wearing a gate's clothing" the gate's own docstring warns against
(`proof-disposition-live.mjs:1-9`): a named trigger that no machine reads.

### D2 (UNFULFILLED CLOSE PROMISE) — G-4/G-5/G-6 were promised as register rows at AX W62 and never written

`docs/tranches/AX/PROGRESS.md:282`:

> ```
> Items 16/17/18 land as `proof:disposition-live` BOOK rows (W62 builds the gate; the close
> re-evaluates each named trigger un-MET). The §4 list IS the close checklist.
> ```

The §4 mapping (`AX/PROGRESS.md:269-271`) names the three:

> ```
> | 16 | G-4 directional View-Transition helper | W21 / book (`proof:disposition-live`) |
> | 17 | G-5 DrawerContent spring (LOW/book)     | book (`proof:disposition-live`) |
> | 18 | G-6 cartoon×quiet preset (LOW)          | book (`proof:disposition-live`) |
> ```

NONE of the three is in the register:
`grep -iE "view-transition|drawer.*spring|cartoon.*quiet" DISPOSITION-REGISTER.json` → **0**.
The close promise to encode them as machine-checked BOOK rows was never executed — the canonical
chronic-defer relapse, INSIDE the very wave (W62) that built the anti-relapse gate. HEAD state of each
(so the trigger greps are real, not speculative):

- **G-4 directional VT helper** — `src/styles/view-transition.css:38-61` ships the `--vt-*` opt-in vocab
  + `gl-vt-slide-in/out` keyframes, but there is NO directional-driving JS helper (a `useViewTransition`
  call that sets `--vt-direction`/`--vt-rise` per navigation). The CSS half exists; the helper does not.
  Trigger grep: `--vt-direction|directionalViewTransition`.
- **G-5 DrawerContent spring** — `grep -niE "drawer.*spring|--drawer-spring" src/styles/drawer.css` → **0**.
  vaul-vue owns the drag-release spring (CLAUDE.md drawer section); a glass-ui `--drawer-spring` token
  re-tuning the open/snap easing is absent. Trigger grep: `--drawer-spring|drawer-content-spring`.
- **G-6 cartoon×quiet preset** — `grep -niE "cartoon.*quiet|quiet.*cartoon" src/` → only PROSE
  (`cards.css:25` a `var(--glass-bg-cartoon, var(--glass-bg-quiet))` fallback comment; `Card.vue:34`
  a retired-component history note). No named `cartoon-quiet` preset/utility. Trigger grep:
  `cartoon-quiet|quiet-cartoon`.

### D3 (META-CHRONIC) — nothing audits register COMPLETENESS; the closure mechanism has no closure check

`proof-disposition-live.mjs` asserts only that each PRESENT row's trigger re-evaluates un-MET
(`:136-143`). No assertion says "every BOOK row in the latest deferred-ledger has a register entry." So
the register can silently shrink (or fail to grow) and the gate stays green — the second-order hole the
H-chronic-defer lane named the load-bearing finding (`H-chronic-defer.md:106-109`). The completeness
check is the missing closure-of-the-closure.

### D4 (SKIP MASKS THE COVERAGE CHECK) — the completeness clause must run even on a sibling-free runner

`proof-disposition-live.mjs:100-119` SKIPs the WHOLE gate (`process.exit(0)`) when no consumer sibling is
present (registry-default CI). That is correct for the TRIGGER re-evaluation (a `min-consumers` trigger
needs siblings to count). But the register-COMPLETENESS check is a PURE DOCUMENT cross-check (register
JSON vs ledger manifest) that needs NO siblings — it MUST run unconditionally, BEFORE the sibling skip,
or the coverage gate never fires on CI (the only runner that gates the close). This is the load-bearing
structural detail of the gate edit.

---

## §2 — Objective

Make the register the MACHINE MIRROR of the AT W0-L4 ledger's live BOOK set, encode (or retire) the three
AX-promised G-items, and add the completeness clause that fails the close on any uncovered BOOK row.

Three units:

- **W-CARRY.1 — onboard the full BOOK backlog.** Add one register row per still-live ledger BOOK item
  (§1 D1 table, deduped per §3), each with a `min-consumers` trigger (`n` + `grep`) and a `note` citing
  the ledger row. KILL rows do NOT enter the register (terminal, no lever — removed by rule with rationale
  in the wave doc); USER-DOMAIN rows do NOT enter (inv-16 — the owning arm's, recorded not absorbed);
  AT-WAVE rows that LANDED at AT do NOT enter (resolved — they shipped). The register's `items` grows from
  3 to the live-BOOK count.
- **W-CARRY.2 — encode or retire G-4/G-5/G-6.** Add `directional-view-transition`, `drawer-content-spring`,
  `cartoon-quiet-preset` rows with `min-consumers` triggers (the D2 greps), OR — for any of the three that
  has NO plausible ≥2-consumer future — a `retired` disposition carrying a `successor` field with the exact
  destination (a named wave or "permanent-out-of-scope: <rationale>", never "future tranche"). The AX
  PROGRESS:282 promise is discharged honestly either way.
- **W-CARRY.3 — the register-completeness clause + the ledger manifest.** Extend
  `scripts/proof-disposition-live.mjs` with an UNCONDITIONAL completeness check (runs before the sibling
  skip): parse a machine-readable ledger manifest, assert every ledger BOOK id has a register row, and
  print the row-count reconciliation in the gate artefact. The ledger manifest is the machine-parseable
  list of BOOK ids — authored as a small companion JSON the gate reads (the prose ledger table stays the
  human source; the manifest is its machine extract, kept in sync by the gate's own dedup assertion).

**Goal:** after this wave, the register's BOOK coverage = the ledger's BOOK set, the G-items are
machine-checked or formally retired, and the completeness clause is born-RED→GREEN — so W-CLOSE1's FINAL
can claim "zero chronic-defer carry" with the gate as the artefact.

---

## §3 — The exact edit-sites

### W-CARRY.1 + W-CARRY.2 — `docs/tranches/AX/audit/DISPOSITION-REGISTER.json`

Add one object per §1-D1 row + the three §1-D2 G-items to the `items` array. The row shape MIRRORS the
existing three (`proof-disposition-live.mjs:79-83` reads only `kind:"min-consumers"`, `n`, `grep`):

```json
{
    "id": "button-icon-sm",
    "disposition": "book",
    "summary": "Button size=\"icon-sm\" compact CVA size variant.",
    "trigger": {
        "kind": "min-consumers",
        "n": 2,
        "grep": "size=[\"']icon-sm[\"']",
        "note": "AT W0-L4 ledger #12 — 1 firm consumer (value.js compact dock controls); a 2nd icon-sm consumer (or a control-size-vocabulary fold with select-size #15) graduates it. Re-evaluates un-MET (value.js absent / not on this surface)."
    },
    "resolved": false
}
```

Encoding rules (applied per row):

1. **Dedup against the existing 3.** Ledger #38 (dock panel-host variant) OVERLAPS the existing
   `panel-host-primitive` (archived) — do NOT mint a duplicate; instead WIDEN the existing row's `note`
   to cite ledger #38 (the bbnf-buddy `LeftToolsDock` 1-consumer) and keep its grep. Ledger #34
   (GlassDialogNative pilot) is DISTINCT from the existing `native-drawer-as-asChild` (the native-`<dialog>`
   drawer `asChild` host) — `native-drawer-as-asChild` is the as/asChild polymorphism on the native dialog;
   `glass-dialog-native-pilot` (#34) is the demo-gated component's Baseline-Widely graduation — mint both,
   note the relationship.
2. **The "3 a11y asks" bundle (#23) is NOT a single row.** A bundle label is un-auditable
   (`W0-L4-ledger.md:224`). DECOMPOSE it against the H-A11Y-PERF sibling lane (AY.W-A11Y-PERF) into named
   rows OR fold each into a concrete a11y row already covered by W-A11Y-PERF and record the fold here. If
   the bundle cannot be decomposed in this wave's scope, mint it as a SINGLE row with `disposition:"book"`
   and a `note` that it is pending decomposition at W-A11Y-PERF — but it MUST be a register row, not prose.
3. **G-4/G-5/G-6 trigger choice.** Each gets a `min-consumers` `n:2` trigger with the D2 grep, UNLESS the
   wave determines a feature has no plausible ≥2-consumer path — then it carries
   `"disposition": "retired"` + `"successor": "<exact destination>"` and the gate treats a `retired` row as
   coverage-satisfying but NOT trigger-evaluated (see W-CARRY.3). The DEFAULT is `book` with a trigger —
   retirement requires a stated rationale in the wave doc.
4. **KILL / USER-DOMAIN / landed-AT-WAVE rows do NOT enter.** The wave doc (this file, §6) carries the
   explicit exclusion list with the rule each row exits by (KILL = terminal no-lever; USER-DOMAIN = inv-16;
   AT-WAVE = landed/resolved). The completeness manifest (W-CARRY.3) lists ONLY the live-BOOK ids, so an
   excluded row is not a coverage miss.

### W-CARRY.3 — the ledger manifest + the completeness clause

**New file — `docs/tranches/AY/audit/deferred-ledger-manifest.json`** (the machine extract of the AT W0-L4
ledger's live-BOOK set; the prose table stays the human source):

```json
{
    "$schema": "AY.W-CARRY — machine-readable BOOK-id manifest extracted from docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md §3. Every id here MUST have a row in DISPOSITION-REGISTER.json (book/archived/retired). proof:disposition-live's completeness clause cross-checks the two; a manifest id absent from the register REDs the close.",
    "source": "docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md",
    "bookIds": [
        "native-drawer-as-asChild",
        "panel-host-primitive",
        "interruptible-reorder",
        "deck-subpath",
        "button-icon-sm",
        "dock-select-clamp-label",
        "tooltip-mono-variant",
        "select-size",
        "spring-crisp-token",
        "metric-badge-icon",
        "labeled-field-for-id",
        "speedtest-a11y-bundle",
        "raf-loop-demand-park",
        "styles-critical-split",
        "cross-document-vt",
        "css-scope-state",
        "css-at-function",
        "interestfor-previews",
        "css-text-box-trim",
        "css-interpolate-size",
        "css-relative-color",
        "glass-dialog-native-pilot",
        "glass-native-select-pilot",
        "inline-edit-primitive",
        "labeled-slider-readout",
        "completion-seal-family",
        "directional-view-transition",
        "drawer-content-spring",
        "cartoon-quiet-preset"
    ]
}
```

(The exact id set is finalized in W-CARRY.1 dedup; the manifest is the single source the gate counts
against. A G-item RETIRED in W-CARRY.2 still appears in `bookIds` — the completeness clause is satisfied
by ANY register row, book/archived/retired, so a formal retirement counts as covered.)

**`scripts/proof-disposition-live.mjs`** — add the completeness clause, structured so it runs
UNCONDITIONALLY (D4):

1. Add a `MANIFEST` const next to `REGISTER` (`:26`):
   ```js
   const MANIFEST = join(ROOT, "docs/tranches/AY/audit/deferred-ledger-manifest.json");
   ```
2. AFTER loading `reg` (`:90`) and BEFORE the `anySiblingPresent` skip (`:100`), insert the completeness
   check:
   ```js
   // ── Register-COMPLETENESS clause (AY.W-CARRY) ───────────────────────────────
   // The closure mechanism's own closure check: every BOOK id in the deferred-
   // ledger manifest MUST have a register row (book/archived/retired). This is a
   // PURE document cross-check — no siblings, no greps — so it runs BEFORE the
   // sibling-present skip and fails the close on CI even with zero consumers on disk.
   if (!existsSync(MANIFEST)) {
       console.error(`[proof:disposition-live] ledger manifest not found: ${MANIFEST}`);
       process.exit(1);
   }
   const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
   const registerIds = new Set((reg.items ?? []).map((i) => i.id));
   const uncovered = (manifest.bookIds ?? []).filter((id) => !registerIds.has(id));
   const registerBookRows = (reg.items ?? []).filter(
       (i) => i.disposition === "book" || i.disposition === "archived" || i.disposition === "retired",
   ).length;
   console.log("proof:disposition-live — register-COMPLETENESS clause (AY.W-CARRY)");
   console.log(`  ledger BOOK ids       : ${(manifest.bookIds ?? []).length}`);
   console.log(`  register book/arch/ret: ${registerBookRows}`);
   console.log(`  uncovered (ledger→reg): ${uncovered.length}`);
   if (uncovered.length > 0) {
       for (const id of uncovered) {
           console.error(`  UNCOVERED   ${id} — named in the deferred-ledger manifest but absent from the register.`);
       }
       console.error(
           `\n[proof:disposition-live] ${uncovered.length} ledger BOOK id(s) have no register row — the register is not the ledger's mirror; onboard or retire each (AY.W-CARRY).`,
       );
       process.exit(1);
   }
   ```
3. Carry `registerBookRows`, `ledgerBookCount`, and `uncovered` into BOTH `writeGateArtifact` calls (the
   skip artefact `:104` AND the pass/fail artefact `:157`) so the artefact ALWAYS prints the row-count
   reconciliation — the evidence the close reads.

No `package.json` / `gates.mjs` / `ci.yml` edit is needed: the gate is ALREADY wired
(`package.json:685`, `gates.mjs:741`, `ci.yml:226`). The completeness clause is an extension of the
existing gate, not a new gate.

### W-CARRY.4 (fold into L.W7) — the slides-side gate spec is authored at AY.W-CON3 §5

The slides-side carry-closure gate (`proof:no-bespoke-constellation`, the first slides disposition row)
is ALREADY authored copy-in-ready in `AY.W-CON3.md §5`. W-CARRY does NOT re-author it; it RECORDS that the
slides arm's carry-closure obligation (a `proof:disposition-live` equivalent in `slides/scripts/` with the
constellation-consume row as its first entry) folds into **L.W7**, and that the AY FINAL's chronic-defer
section must NOTE the cross-repo handoff so the slides BOOK backlog does not ride prose-only. No glass-ui
source edit for this unit.

---

## §4 — The HARD GATE (evidence-backed)

A single binding condition with four artefact-verifiable legs. ALL must hold.

### Leg 1 — the completeness clause is born-RED→GREEN (the coverage truth)

`npm run proof:disposition-live` run TODAY (after the clause lands but BEFORE the register is filled)
prints `uncovered (ledger→reg): N` with `N ≥ 19` and exits NON-ZERO — the born-RED witness (3 register
rows vs ~22 ledger BOOK ids). After W-CARRY.1+W-CARRY.2 fill the register, the SAME command prints
`uncovered (ledger→reg): 0` and `register book/arch/ret ≥ ledger BOOK ids`, exiting ZERO. The artefact
`GATE_DISPOSITION_LIVE_OUT` carries `ledgerBookCount`, `registerBookRows`, and an empty `uncovered`
array. **Evidence:** the two gate runs (RED then GREEN) captured in `AY/PROGRESS.md` with the printed
row-count reconciliation — a build-diff, not a prose claim. This leg runs on a sibling-free runner (the
clause is unconditional, D4), so it gates the CI close.

### Leg 2 — the self-test still bites (the detector is still load-bearing)

The existing synthetic always-MET self-test row (`DISPOSITION-REGISTER.json:4-9`) is UNCHANGED and the
gate still REDs if its detector fails to flag it (`proof-disposition-live.mjs:123-132`). Verified by a
run on a sibling-present local checkout: `self-test (bite proof): OK`. The completeness clause does NOT
regress the trigger-re-evaluation half — both halves green together. **Evidence:** the local
(sibling-present) gate run showing `self-test (bite proof): OK` + `live violations: 0` + `uncovered: 0`.

### Leg 3 — G-4/G-5/G-6 are encoded-or-retired (the AX PROGRESS:282 promise discharged)

`grep -iE "directional-view-transition|drawer-content-spring|cartoon-quiet-preset" DISPOSITION-REGISTER.json`
returns THREE rows. Each is EITHER `disposition:"book"` with a `min-consumers` trigger whose grep matches
the D2 HEAD-feature pattern, OR `disposition:"retired"` with a `successor` field naming an exact
destination (a wave id or `permanent-out-of-scope: <rationale>`). NONE is "deferred to a future tranche."
**Evidence:** the three JSON rows + the wave-doc §6 retirement-rationale line for any retired row;
cross-checked against `AX/PROGRESS.md:269-271` (the §4 items 16/17/18) so the promise→register link is
explicit. The manifest's `bookIds` includes all three ids (a retired row is coverage-satisfying).

### Leg 4 — the register is the ledger's mirror (the dedup + exclusion proof)

The wave doc §6 carries the EXPLICIT reconciliation table: every AT W0-L4 ledger row (#1-#47) mapped to
exactly one of {register-row (id) · KILL-excluded (rationale) · USER-DOMAIN-excluded (inv-16) ·
AT-WAVE-landed (resolved at AT)}. No ledger row is unaccounted. The manifest `bookIds` count equals the
live-BOOK count in that table. **Evidence:** the §6 table (document reconciliation, the AT W0-L4 table's
own format) — every row dispositioned, no prose-only residue. A dedup assertion in the wave doc confirms
no register row maps to two ledger rows and no ledger BOOK row maps to zero register rows.

**The gate is the conjunction:** Leg 1 (completeness born-RED→GREEN, unconditional) ∧ Leg 2 (self-test
still bites) ∧ Leg 3 (G-items encoded-or-retired) ∧ Leg 4 (register = ledger mirror, document
reconciliation). Any leg RED blocks W-CLOSE1 — so the FINAL's "zero chronic-defer carry" is gate-true.

**The single headline gate condition (for the FINAL table):** `proof:disposition-live` extended —
`register book/archived/retired row-count` covers every id in `deferred-ledger-manifest.json`
(`uncovered = 0`), TODAY RED (3 register rows vs ~22 ledger BOOK ids → `uncovered ≥ 19`), GREEN once the
register is the ledger's machine mirror; G-4/G-5/G-6 encoded-as-book-with-trigger or retired-with-named-
successor; the self-test still REDs on a synthetic met-trigger row (the detector stays load-bearing).

---

## §5 — Non-goals (explicit, to bound the wave)

- **NO building any booked feature.** W-CARRY onboards the deferral SET into the machine register; it
  does NOT ship `icon-sm`, the drawer spring, the VT helper, etc. Those graduate when their `min-consumers`
  trigger re-evaluates MET (the gate's job), not in this wave. This is pure documentation + gate-script
  work, zero source-feature risk.
- **NO re-grounding the AY AUDIT-LEDGER here.** The stale-status re-verification (touch-scale / slider /
  access-modal mislabels, H-chronic-defer §3) is **AY.W0-REGROUND**'s scope, not W-CARRY's. W-CARRY
  mirrors the AT W0-L4 ledger (the HEAD-verified gold standard); W0-REGROUND fixes the AUDIT-LEDGER drift.
  They are disjoint; W-CARRY does not depend on W0-REGROUND (the AT ledger is already HEAD-verified).
- **NO slides source edit.** The slides carry-closure gate is L.W7's (its spec lives at W-CON3 §5);
  W-CARRY only records the cross-repo fold. glass-ui writes only glass-ui (inv-16).
- **NO change to the trigger-re-evaluation half.** The existing `min-consumers` evaluation
  (`proof-disposition-live.mjs:60-83,136-143`) + the sibling-skip (`:100-119`) are UNCHANGED. The
  completeness clause is ADDITIVE and runs before the skip; the trigger half stays sibling-gated as
  designed.
- **NO new gate id.** The completeness clause extends `proof:disposition-live` (one gate, two halves:
  coverage + trigger-re-eval). A second gate id would fragment the close checklist; the existing wiring
  (`package.json:685`, `gates.mjs:741`, `ci.yml:226`) is reused.

---

## §6 — The ledger→disposition reconciliation (the Leg-4 artefact — to be completed in-wave)

This table is AUTHORED in-wave (here) as the Leg-4 document-reconciliation proof. Every AT W0-L4 ledger
row (#1-#47, `W0-L4-ledger.md:103-151`) maps to exactly one disposition. The format mirrors the AT ledger.

| ledger # | Item | W-CARRY disposition | register id / exclusion rationale |
|---|---|---|---|
| 1, 2 | goo-blob / watercolor-dot lift | AT-WAVE-landed | shipped at AT (`/goo-blob`, `/watercolor-dot` subpaths) — resolved, not in register |
| 3, 4 | DataTable vueuse leak / `supportsPostTask` | AT-WAVE-landed | `proof:vueuse-free-root` + `proof:supportsPostTask-wired` shipped — resolved |
| 5 | P5 OUTER-ONLY rounding | KILL | user-ruled terminal (no lever) — excluded |
| 6 | `/deck` subpath | BOOK | `deck-subpath` |
| 7 | Fraunces `@font-face` | AT-WAVE-landed | shipped (`proof:font-canon`) — resolved |
| 8 | native-drawer / GlassNativeDrawer | BOOK | existing `native-drawer-as-asChild` (note widened to cite #8) |
| 9, 10 | `useGlobalDark({initialValue})` / `darkModeSyncScript()` | AT-WAVE-landed | shipped on `/dark` (CLAUDE.md) — resolved |
| 11 | GlassDock overflow/wrap docs | AT-WAVE-landed | docs/contract clarification shipped — resolved |
| 12 | Button `icon-sm` | BOOK | `button-icon-sm` |
| 13 | DockSelectTrigger `clampLabel` | BOOK | `dock-select-clamp-label` |
| 14 | TooltipContent `variant="mono"` | BOOK | `tooltip-mono-variant` |
| 15 | Select `size` | BOOK | `select-size` |
| 16 | `--spring-crisp` token | BOOK | `spring-crisp-token` |
| 17, 18, 21, 24 | DDR dark-rung / AnimatedDigit / timeline opt-out / 44px floor | KILL (already-shipped) | folded/done at AS or earlier — excluded |
| 19 | MetricBadge icon | BOOK | `metric-badge-icon` |
| 20 | CompletionSeal/GoldHeadline/CheckDraw | BOOK | `completion-seal-family` (token-layer; component stays demo-gated) |
| 22 | LabeledField for/id | BOOK | `labeled-field-for-id` |
| 23 | "3 a11y asks" bundle | BOOK (decompose) | `speedtest-a11y-bundle` (single row pending W-A11Y-PERF decomposition) |
| 25 | useRAFLoop demandPark | BOOK | `raf-loop-demand-park` |
| 26 | `/styles` critical/deferred split | BOOK | `styles-critical-split` |
| 27 | G3 cross-document VT | BOOK | `cross-document-vt` (library opt-in half; navigation:auto consumer-owned) |
| 28 | G5 `@scope`+`:state()` | BOOK | `css-scope-state` (paid-diff-only) |
| 29 | G6 CSS `@function` | BOOK | `css-at-function` |
| 30 | G8 `interestfor` | BOOK | `interestfor-previews` |
| 31 | `text-box-trim` | BOOK | `css-text-box-trim` |
| 32 | interpolate-size/calc-size | BOOK | `css-interpolate-size` (paid-diff-only) |
| 33 | relative-color | BOOK | `css-relative-color` (paid-diff-only) |
| 34 | GlassDialogNative pilot | BOOK | `glass-dialog-native-pilot` |
| 35 | HoverPopover `:native` | BOOK | folds into `interestfor-previews` (#30) — graduates with G8; note cites #35 |
| 36 | G7 GlassNativeSelect | BOOK | `glass-native-select-pilot` |
| 37 | inline-edit primitive | BOOK | `inline-edit-primitive` (convergence-gated) |
| 38 | dock panel-host variant | BOOK | existing `panel-host-primitive` (note widened to cite #38) |
| 39 | LabeledSlider readout | BOOK | `labeled-slider-readout` |
| 40 | shadcn parity | KILL (REJECT) | 0-consumer speculative — excluded |
| 41 | VAL-1 deriveAurora kill-gate | USER-DOMAIN | value.js-owned (inv-16) — excluded |
| 42, 43 | VAL-9 / P7 Mascot | KILL | terminal — excluded |
| 44-47 | precepts pin / playground alias / value.js K.W2.5 / M-spine | USER-DOMAIN | owning-arm's (inv-16) — excluded |
| — | G-4 directional VT helper | BOOK or RETIRED | `directional-view-transition` (AX PROGRESS:282 item 16) |
| — | G-5 DrawerContent spring | BOOK or RETIRED | `drawer-content-spring` (AX PROGRESS:282 item 17) |
| — | G-6 cartoon×quiet preset | BOOK or RETIRED | `cartoon-quiet-preset` (AX PROGRESS:282 item 18) |

**Dedup assertion:** no register row maps to two ledger rows (#8→`native-drawer-as-asChild` and
#38→`panel-host-primitive` are the two note-widenings, not duplicate rows; #35 folds into #30, not a new
row). No live-BOOK ledger row maps to zero register rows. The manifest `bookIds` = the BOOK-dispositioned
rows in this table (the live set).

---

## §7 — Dependency + sequencing notes

- **W-CARRY → W-CLOSE1 (hard ordering).** W-CARRY MUST land BEFORE W-CLOSE1. W-CLOSE1's `proof:ay-final`
  aggregates "no-open-live-pending" + the chronic-defer claim; the FINAL's "zero chronic-defer carry"
  (G-3) is gate-true ONLY if `proof:disposition-live`'s completeness clause is GREEN first. The AY plan
  (`AY.md:187-188`, `:219`) already orders `… → W-CARRY/W-CLOSE1` on the critical path.
- **W-CARRY ⊥ W0-REGROUND (no dependency).** W-CARRY mirrors the AT W0-L4 ledger (already HEAD-verified,
  the gold-standard table); W0-REGROUND re-grounds the SEPARATE AY AUDIT-LEDGER drift. Disjoint scopes,
  no ordering between them. W-CARRY can land early (no source risk) while the impl bands run.
- **W-CARRY → L.W7 (cross-repo fold).** The slides carry-closure gate spec is authored at W-CON3 §5; its
  RED→GREEN is L.W7 (slides arm). W-CARRY records the fold in the FINAL's chronic-defer section so the
  slides BOOK backlog is on a machine path, not prose.
- **No write-scope overlap with any impl wave.** W-CARRY touches `DISPOSITION-REGISTER.json` (docs),
  `deferred-ledger-manifest.json` (new docs file), `proof-disposition-live.mjs` (gate script), and this
  wave doc. No source, no other gate, no consumer.
